"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/products";
import { logoutAdminAction } from "@/actions/admin";
import { 
  updateOrderStatusAction, 
  deleteOrderAction 
} from "@/actions/orders";
import { deleteConsultationAction } from "@/actions/consultation";
import { 
  createProductAction, 
  updateProductAction, 
  deleteProductAction 
} from "@/actions/products";
import { deleteSubscriberAction } from "@/actions/newsletter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  Shirt, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  X, 
  Check, 
  ChevronRight, 
  Clock, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Info 
} from "lucide-react";

interface AdminDashboardClientProps {
  initialProducts: Product[];
  initialOrders: any[];
  initialConsultations: any[];
  initialSubscribers: any[];
}

type TabType = "overview" | "orders" | "consultations" | "products" | "subscribers";

export default function AdminDashboardClient({
  initialProducts,
  initialOrders,
  initialConsultations,
  initialSubscribers,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [consultations, setConsultations] = useState<any[]>(initialConsultations);
  const [subscribers, setSubscribers] = useState<any[]>(initialSubscribers);

  // Search & Filter States
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [productSearch, setProductSearch] = useState("");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [subscriberSearch, setSubscriberSearch] = useState("");

  // Selection states for detail modals
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Form states for Add/Edit Product Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    price: "",
    category: "Kaftans",
    image: "",
    isNew: false,
    description: "",
    detailsInput: "",
    imagesInput: "",
    sizesInput: "S, M, L, XL, XXL",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Global Actions
  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  };

  // Order Actions
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const res = await updateOrderStatusAction(orderId, status);
    if (res.success && res.order) {
      setOrders(orders.map(o => o.id === orderId ? res.order : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(res.order);
      }
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order record permanently?")) {
      const res = await deleteOrderAction(orderId);
      if (res.success) {
        setOrders(orders.filter(o => o.id !== orderId));
        setSelectedOrder(null);
      }
    }
  };

  // Consultation Actions
  const handleDeleteConsultation = async (consultationId: string) => {
    if (confirm("Are you sure you want to delete this consultation request?")) {
      const res = await deleteConsultationAction(consultationId);
      if (res.success) {
        setConsultations(consultations.filter(c => c.id !== consultationId));
      }
    }
  };

  // Subscriber Actions
  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (confirm("Are you sure you want to delete this subscriber from the mailing list?")) {
      const res = await deleteSubscriberAction(subscriberId);
      if (res.success) {
        setSubscribers(subscribers.filter(s => s.id !== subscriberId));
      }
    }
  };

  // Product Modal Controls
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      id: "",
      name: "",
      price: "",
      category: "Kaftans",
      image: "",
      isNew: true,
      description: "",
      detailsInput: "",
      imagesInput: "",
      sizesInput: "S, M, L, XL, XXL",
    });
    setFormError(null);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      isNew: product.isNew || false,
      description: product.description,
      detailsInput: product.details ? product.details.join("\n") : "",
      imagesInput: product.images ? product.images.join("\n") : "",
      sizesInput: product.sizes ? product.sizes.join(", ") : "S, M, L, XL, XXL",
    });
    setFormError(null);
    setIsProductModalOpen(true);
  };

  const handleProductFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const priceNum = parseFloat(productForm.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError("Please enter a valid price.");
      setFormLoading(false);
      return;
    }

    if (!productForm.id.trim() || !productForm.name.trim()) {
      setFormError("Product ID and Name are required.");
      setFormLoading(false);
      return;
    }

    const payload = {
      id: productForm.id.trim(),
      name: productForm.name.trim(),
      price: priceNum,
      category: productForm.category,
      image: productForm.image.trim() || "/images/products/placeholder.jpg",
      isNew: productForm.isNew,
      description: productForm.description.trim(),
      details: productForm.detailsInput.split("\n").map(d => d.trim()).filter(Boolean),
      images: productForm.imagesInput.split("\n").map(i => i.trim()).filter(Boolean),
      sizes: productForm.sizesInput.split(",").map(s => s.trim()).filter(Boolean),
    };

    try {
      if (editingProduct) {
        const res = await updateProductAction(editingProduct.id, payload);
        if (res.success && res.product) {
          setProducts(products.map(p => p.id === editingProduct.id ? (res.product as Product) : p));
          setIsProductModalOpen(false);
        } else {
          setFormError(res.error || "Failed to update product.");
        }
      } else {
        // Check for duplicate ID
        if (products.some(p => p.id === payload.id)) {
          setFormError("A product with this ID already exists.");
          setFormLoading(false);
          return;
        }
        const res = await createProductAction(payload);
        if (res.success && res.product) {
          setProducts([...products, res.product as Product]);
          setIsProductModalOpen(false);
        } else {
          setFormError(res.error || "Failed to create product.");
        }
      }
    } catch (err) {
      setFormError("An unexpected error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product? This will remove it from the catalog.")) {
      const res = await deleteProductAction(productId);
      if (res.success) {
        setProducts(products.filter(p => p.id !== productId));
      }
    }
  };

  // Calculations for Overview Tab
  const paidOrders = orders.filter(o => o.status === "paid" || o.status === "completed" || o.status === "processing");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingBookings = consultations.length;

  // Filter systems
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.name.toLowerCase().includes(orderSearch.toLowerCase()) || 
                          o.email.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          (o.paymentReference && o.paymentReference.toLowerCase().includes(orderSearch.toLowerCase()));
    const matchesStatus = orderFilter === "all" || o.status === orderFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.id.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.description.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productFilter === "all" || p.category === productFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-black flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Brand header */}
        <div className="p-6 border-b border-gray-200 text-center md:text-left">
          <h2 className="text-xl font-black tracking-widest uppercase text-black">
            FRANKIE <span className="text-gray-500 font-medium">STYLES</span>
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 font-bold">
            Portal Control
          </p>
        </div>

        {/* Tab switcher */}
        <nav className="flex-1 p-4 space-y-1 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1 md:gap-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "overview" 
                ? "bg-black text-white" 
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "orders" 
                ? "bg-black text-white" 
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders</span>
            {orders.filter(o => o.status === "pending").length > 0 && (
              <span className={`ml-auto text-[10px] font-extrabold px-2 py-0.5 rounded ${activeTab === "orders" ? "bg-white text-black" : "bg-black text-white"}`}>
                {orders.filter(o => o.status === "pending").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("consultations")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "consultations" 
                ? "bg-black text-white" 
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings</span>
            {consultations.length > 0 && (
              <span className={`ml-auto text-[10px] font-extrabold px-2 py-0.5 rounded ${activeTab === "consultations" ? "bg-white text-black" : "bg-gray-100 text-gray-700"}`}>
                {consultations.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "products" 
                ? "bg-black text-white" 
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Products</span>
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "subscribers" 
                ? "bg-black text-white" 
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Subscribers</span>
            {subscribers.length > 0 && (
              <span className={`ml-auto text-[10px] font-extrabold px-2 py-0.5 rounded ${activeTab === "subscribers" ? "bg-white text-black" : "bg-gray-100 text-gray-700"}`}>
                {subscribers.length}
              </span>
            )}
          </button>
        </nav>

        {/* Logout session */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Topbar title */}
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wider">Dashboard Overview</h1>
              <p className="text-xs text-gray-400 mt-1">Realtime tailoring business analytics</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center gap-4 smooth-shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Revenue</h3>
                  <p className="text-xl font-black mt-1 text-black">₦{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center gap-4 smooth-shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Orders Placed</h3>
                  <p className="text-xl font-black mt-1 text-black">{orders.length}</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center gap-4 smooth-shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Pending Bookings</h3>
                  <p className="text-xl font-black mt-1 text-black">{pendingBookings}</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center gap-4 smooth-shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                  <Shirt className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Catalog</h3>
                  <p className="text-xl font-black mt-1 text-black">{products.length} Items</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center gap-4 smooth-shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Newsletter</h3>
                  <p className="text-xl font-black mt-1 text-black">{subscribers.length} Emails</p>
                </div>
              </div>
            </div>

            {/* Split layout: Recent Orders & Recent Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders List */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 smooth-shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h2 className="text-xs font-black uppercase tracking-wider text-gray-800">Recent Orders</h2>
                  <button onClick={() => setActiveTab("orders")} className="text-xs text-gray-500 hover:text-black font-bold uppercase tracking-wider">View All</button>
                </div>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex justify-between items-center p-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs">
                      <div>
                        <p className="font-bold text-black">{o.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{new Date(o.createdAt).toLocaleDateString()} • {o.items.length} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black">₦{o.totalAmount.toLocaleString()}</p>
                        <span className={`inline-block text-[9px] font-bold uppercase px-2 py-0.5 rounded border mt-1 ${
                          o.status === "paid" || o.status === "completed" ? "bg-green-50 text-green-700 border-green-200" :
                          o.status === "processing" ? "bg-blue-50 text-blue-700 border-blue-200" :
                          o.status === "cancelled" ? "bg-red-50 text-red-700 border-red-200" :
                          "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-center text-xs text-gray-400 py-6">No orders placed yet.</p>
                  )}
                </div>
              </div>

              {/* Recent Bookings List */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4 smooth-shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <h2 className="text-xs font-black uppercase tracking-wider text-gray-800">Recent Consultations</h2>
                  <button onClick={() => setActiveTab("consultations")} className="text-xs text-gray-500 hover:text-black font-bold uppercase tracking-wider">View All</button>
                </div>
                <div className="space-y-3">
                  {consultations.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex justify-between items-center p-3.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs">
                      <div>
                        <p className="font-bold text-black">{c.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{c.service} • Date: {c.date}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {consultations.length === 0 && (
                    <p className="text-center text-xs text-gray-400 py-6">No consultation bookings registered.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wider">Orders Management</h1>
              <p className="text-xs text-gray-400 mt-1">Review purchase logs, customer measurements, and Paystack transactions</p>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 p-4 rounded-xl smooth-shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by customer, email, or reference..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="bg-gray-50 border-gray-200 text-black pl-10 focus:border-black focus:bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400 hidden sm:inline" />
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-black rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none focus:border-black focus:bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table Container */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden smooth-shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 uppercase tracking-wider text-gray-500 font-bold">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-mono text-gray-400">{o.id.slice(0, 8)}...</td>
                        <td className="p-4">
                          <p className="font-bold text-black">{o.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{o.email}</p>
                        </td>
                        <td className="p-4 text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-gray-600 font-medium">{o.items.length} items</td>
                        <td className="p-4 font-bold text-black">₦{o.totalAmount.toLocaleString()}</td>
                        <td className="p-4">
                          <select
                            value={o.status}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            className={`text-[10px] font-bold uppercase px-2 py-1 rounded outline-none border bg-white ${
                              o.status === "paid" || o.status === "completed" ? "text-green-700 border-green-200" :
                              o.status === "processing" ? "text-blue-700 border-blue-200" :
                              o.status === "cancelled" ? "text-red-700 border-red-200" :
                              "text-yellow-700 border-yellow-200"
                            }`}
                          >
                            <option value="pending" className="text-black">Pending</option>
                            <option value="paid" className="text-black">Paid</option>
                            <option value="processing" className="text-black">Processing</option>
                            <option value="completed" className="text-black">Completed</option>
                            <option value="cancelled" className="text-black">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedOrder(o)}
                            className="bg-transparent border-gray-200 text-black hover:bg-gray-50 py-1 px-3"
                          >
                            Details
                          </Button>
                          <button 
                            onClick={() => handleDeleteOrder(o.id)}
                            className="text-red-600 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors inline-block align-middle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-400">
                          No matching orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === "consultations" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wider">Bookings & Consultations</h1>
              <p className="text-xs text-gray-400 mt-1">Review size profiles requests and scheduled booking sessions</p>
            </div>

            {/* Consultations Table Container */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden smooth-shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 uppercase tracking-wider text-gray-500 font-bold">
                      <th className="p-4">Client</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Requested Date</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Notes</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {consultations.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-bold text-black">{c.name}</td>
                        <td className="p-4 text-gray-700 font-medium">{c.service}</td>
                        <td className="p-4 text-gray-500 font-mono">{c.date}</td>
                        <td className="p-4">
                          <p className="text-gray-700 font-medium">{c.phone}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{c.email}</p>
                        </td>
                        <td className="p-4 max-w-xs truncate text-gray-500" title={c.notes || "None"}>
                          {c.notes || <span className="italic text-gray-300">No notes provided</span>}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteConsultation(c.id)}
                            className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                          >
                            Mark Completed
                          </button>
                        </td>
                      </tr>
                    ))}
                    {consultations.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-400">
                          No pending consultations bookings.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-wider">Product Catalog</h1>
                <p className="text-xs text-gray-400 mt-1">Manage shop collections, categories, sizing parameters, and prices</p>
              </div>
              <Button 
                onClick={openAddProductModal} 
                className="bg-black hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </Button>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 p-4 rounded-xl smooth-shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by ID, Name, Category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="bg-gray-50 border-gray-200 text-black pl-10 focus:border-black focus:bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400 hidden sm:inline" />
                <select
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-black rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none focus:border-black focus:bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="Kaftans">Kaftans</option>
                  <option value="DRY LACE">Dry Lace</option>
                  <option value="Agbadas">Agbadas</option>
                  <option value="ISI AGU">Isi Agu</option>
                  <option value="Jalabiya">Jalabiya</option>
                  <option value="READY TO WEAR">Ready To Wear</option>
                </select>
              </div>
            </div>

            {/* Products Table Container */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden smooth-shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 uppercase tracking-wider text-gray-500 font-bold">
                      <th className="p-4">Image</th>
                      <th className="p-4">Product ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Sizes</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-10 h-10 object-cover rounded-lg border border-gray-200 bg-gray-50" 
                          />
                        </td>
                        <td className="p-4 font-mono text-gray-400">{p.id}</td>
                        <td className="p-4 font-bold text-black">{p.name}</td>
                        <td className="p-4 font-medium uppercase text-gray-500">{p.category}</td>
                        <td className="p-4 font-bold text-black">₦{p.price.toLocaleString()}</td>
                        <td className="p-4 font-mono text-gray-400">{p.sizes.join(", ")}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 bg-white border border-gray-200 hover:border-black text-gray-400 hover:text-black rounded-lg transition-colors inline-block"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 bg-white border border-gray-200 hover:border-red-500 text-gray-400 hover:text-red-600 rounded-lg transition-colors inline-block"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-400">
                          No matching products found in database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wider">Newsletter Subscribers</h1>
              <p className="text-xs text-gray-400 mt-1">Review registered client emails and download newsletter subscriber lists</p>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 p-4 rounded-xl smooth-shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search subscribers by email..."
                  value={subscriberSearch}
                  onChange={(e) => setSubscriberSearch(e.target.value)}
                  className="bg-gray-50 border-gray-200 text-black pl-10 focus:border-black focus:bg-white"
                />
              </div>
            </div>

            {/* Subscribers Table Container */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden smooth-shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 uppercase tracking-wider text-gray-500 font-bold">
                      <th className="p-4">Email Address</th>
                      <th className="p-4">Subscribed Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {subscribers
                      .filter(s => s.email.toLowerCase().includes(subscriberSearch.toLowerCase()))
                      .map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-bold text-black">{s.email}</td>
                          <td className="p-4 text-gray-500">
                            {new Date(s.createdAt).toLocaleDateString()} at {new Date(s.createdAt).toLocaleTimeString()}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteSubscriber(s.id)}
                              className="p-1.5 bg-white border border-gray-200 hover:border-red-500 text-gray-400 hover:text-red-600 rounded-lg transition-colors inline-block"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    {subscribers.filter(s => s.email.toLowerCase().includes(subscriberSearch.toLowerCase())).length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-400">
                          No matching subscribers found in database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Order Details Modal Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 w-full max-w-2xl rounded-2xl overflow-hidden smooth-shadow relative my-8 text-black">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-black">Order Details</h3>
                <p className="text-[10px] font-mono text-gray-400 mt-1">Ref ID: {selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
              {/* Customer Profile & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">Client Profile</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-bold text-black">{selectedOrder.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{selectedOrder.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{selectedOrder.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">Shipping & Checkout</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="text-gray-600 leading-relaxed">
                        {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 uppercase font-semibold">
                        {selectedOrder.paymentMethod} Checkout • Ref: <span className="font-mono text-gray-500">{selectedOrder.paymentReference || "N/A"}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sizing & Sizing Parameters reviews */}
              <div className="space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1">Cart Items & Sizing Parameters</h4>
                <div className="space-y-2.5">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start bg-gray-50 border border-gray-100 p-3 rounded-xl">
                      <div>
                        <p className="font-bold text-black">{item.name}</p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          Size Selected: <span className="text-black font-extrabold">{item.size}</span> • Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-black">₦{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order pricing summaries */}
              <div className="bg-gray-50 p-4 border border-gray-100 rounded-xl space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Shipping Fee</span>
                  <span className="font-medium text-black">₦{selectedOrder.shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2.5 text-sm">
                  <span className="text-gray-400 font-extrabold uppercase tracking-wider">Total Paid</span>
                  <span className="font-black text-black">₦{selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Order Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                  className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded outline-none border bg-white ${
                    selectedOrder.status === "paid" || selectedOrder.status === "completed" ? "text-green-700 border-green-200" :
                    selectedOrder.status === "processing" ? "text-blue-700 border-blue-200" :
                    selectedOrder.status === "cancelled" ? "text-red-700 border-red-200" :
                    "text-yellow-700 border-yellow-200"
                  }`}
                >
                  <option value="pending" className="text-black">Pending</option>
                  <option value="paid" className="text-black">Paid</option>
                  <option value="processing" className="text-black">Processing</option>
                  <option value="completed" className="text-black">Completed</option>
                  <option value="cancelled" className="text-black">Cancelled</option>
                </select>
              </div>
              <div className="space-x-3">
                <Button 
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                  className="bg-transparent border border-red-200 hover:bg-red-50 text-red-600 font-bold uppercase tracking-wider text-[10px] py-2 px-4"
                >
                  Delete Order
                </Button>
                <Button 
                  onClick={() => setSelectedOrder(null)}
                  className="bg-black hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-[10px] py-2 px-4"
                >
                  Close Window
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal Overlay */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 w-full max-w-xl rounded-2xl overflow-hidden smooth-shadow relative my-8 text-black">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-sm font-black uppercase tracking-wider text-black">
                {editingProduct ? "Edit Product Properties" : "Register New Custom Wear"}
              </h3>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleProductFormSubmit}>
              <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-[10px] font-bold p-3 rounded-lg text-center uppercase tracking-wider">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Product ID (Unique Key)</label>
                    <Input
                      placeholder="e.g. kaftan-signature-gold"
                      value={productForm.id}
                      onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                      disabled={!!editingProduct}
                      className="bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white disabled:opacity-50"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Wear Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 text-black rounded-lg px-4 py-2.5 text-xs outline-none focus:border-black"
                    >
                      <option value="Kaftans">Kaftans</option>
                      <option value="DRY LACE">Dry Lace</option>
                      <option value="Agbadas">Agbadas</option>
                      <option value="ISI AGU">Isi Agu</option>
                      <option value="Jalabiya">Jalabiya</option>
                      <option value="READY TO WEAR">Ready To Wear</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Product Name</label>
                    <Input
                      placeholder="e.g. Signature Gold Kaftan"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Price in Naira (₦)</label>
                    <Input
                      type="number"
                      placeholder="e.g. 150000"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Thumbnail Image URL</label>
                  <Input
                    placeholder="e.g. /images/products/kaftan-1.jpg"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Product Description</label>
                  <textarea
                    placeholder="Provide a luxurious and rich overview description for the wear..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full h-20 bg-gray-50 border border-gray-200 text-black rounded-lg p-3 text-xs outline-none focus:border-black focus:bg-white resize-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Sizing Options (Comma separated)</label>
                  <Input
                    placeholder="e.g. S, M, L, XL, XXL"
                    value={productForm.sizesInput}
                    onChange={(e) => setProductForm({ ...productForm, sizesInput: e.target.value })}
                    className="bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Key Features / Detail Bullet Points (One per line)</label>
                  <textarea
                    placeholder="e.g. Premium wool fabric&#10;Handcrafted gold stitching&#10;Includes matching trousers"
                    value={productForm.detailsInput}
                    onChange={(e) => setProductForm({ ...productForm, detailsInput: e.target.value })}
                    className="w-full h-20 bg-gray-50 border border-gray-200 text-black rounded-lg p-3 text-xs outline-none focus:border-black focus:bg-white resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Additional Catalog Image URLs (One per line)</label>
                  <textarea
                    placeholder="e.g. /images/products/kaftan-detail-1.jpg&#10;/images/products/kaftan-detail-2.jpg"
                    value={productForm.imagesInput}
                    onChange={(e) => setProductForm({ ...productForm, imagesInput: e.target.value })}
                    className="w-full h-20 bg-gray-50 border border-gray-200 text-black rounded-lg p-3 text-xs outline-none focus:border-black focus:bg-white resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                    className="rounded border-gray-300 accent-black w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="isNew" className="text-xs text-gray-700 font-bold uppercase tracking-wider cursor-pointer">Tag as New Arrival</label>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProductModalOpen(false)}
                  className="bg-transparent border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold uppercase tracking-wider text-[10px] py-2 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={formLoading}
                  className="bg-black hover:bg-zinc-800 text-white font-bold uppercase tracking-wider text-[10px] py-2 px-4"
                >
                  {formLoading ? "Saving wear data..." : (editingProduct ? "Save Changes" : "Register Product")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
