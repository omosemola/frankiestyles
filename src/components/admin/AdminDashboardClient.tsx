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
}

type TabType = "overview" | "orders" | "consultations" | "products";

export default function AdminDashboardClient({
  initialProducts,
  initialOrders,
  initialConsultations,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [consultations, setConsultations] = useState<any[]>(initialConsultations);

  // Search & Filter States
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [productSearch, setProductSearch] = useState("");
  const [productFilter, setProductFilter] = useState<string>("all");

  // Selection states for detail modals
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Form states for Add/Edit Product Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    price: "",
    category: "KAFTAN",
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

  // Product Modal Controls
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      id: "",
      name: "",
      price: "",
      category: "KAFTAN",
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-black border-b md:border-b-0 md:border-r border-white/10 flex flex-col flex-shrink-0">
        {/* Brand header */}
        <div className="p-6 border-b border-white/10 text-center md:text-left">
          <h2 className="text-xl font-black tracking-widest uppercase text-white">
            FRANKIE <span className="text-[#c5a059]">STYLES</span>
          </h2>
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1 font-bold">
            Portal Control
          </p>
        </div>

        {/* Tab switcher */}
        <nav className="flex-1 p-4 space-y-1.5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 md:gap-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "overview" 
                ? "bg-[#c5a059] text-black" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "orders" 
                ? "bg-[#c5a059] text-black" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders</span>
            {orders.filter(o => o.status === "pending").length > 0 && (
              <span className={`ml-auto text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${activeTab === "orders" ? "bg-black text-[#c5a059]" : "bg-[#c5a059] text-black"}`}>
                {orders.filter(o => o.status === "pending").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("consultations")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "consultations" 
                ? "bg-[#c5a059] text-black" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings</span>
            {consultations.length > 0 && (
              <span className={`ml-auto text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${activeTab === "consultations" ? "bg-black text-[#c5a059]" : "bg-white/10 text-white"}`}>
                {consultations.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "products" 
                ? "bg-[#c5a059] text-black" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Products</span>
          </button>
        </nav>

        {/* Logout session */}
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
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
          <div className="space-y-8 animate-fade-in">
            {/* Topbar title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-wider">Dashboard Overview</h1>
                <p className="text-xs text-gray-400 mt-1">Realtime tailoring business analytics</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Revenue</h3>
                  <p className="text-xl font-extrabold mt-1 text-white">₦{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Orders Placed</h3>
                  <p className="text-xl font-extrabold mt-1 text-white">{orders.length}</p>
                </div>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Pending Bookings</h3>
                  <p className="text-xl font-extrabold mt-1 text-white">{pendingBookings}</p>
                </div>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Shirt className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Catalog</h3>
                  <p className="text-xl font-extrabold mt-1 text-white">{products.length} Items</p>
                </div>
              </div>
            </div>

            {/* Split layout: Recent Orders & Recent Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders List */}
              <div className="bg-[#111] border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-black uppercase tracking-wider">Recent Orders</h2>
                  <button onClick={() => setActiveTab("orders")} className="text-xs text-[#c5a059] hover:underline font-bold uppercase tracking-wider">View All</button>
                </div>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex justify-between items-center p-3.5 bg-black/40 border border-white/5 rounded-xl text-xs">
                      <div>
                        <p className="font-bold text-white">{o.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{new Date(o.createdAt).toLocaleDateString()} • {o.items.length} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-[#c5a059]">₦{o.totalAmount.toLocaleString()}</p>
                        <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full mt-1.5 ${
                          o.status === "paid" || o.status === "completed" ? "bg-green-950/50 text-green-400 border border-green-900/30" :
                          o.status === "processing" ? "bg-blue-950/50 text-blue-400 border border-blue-900/30" :
                          o.status === "cancelled" ? "bg-red-950/50 text-red-400 border border-red-900/30" :
                          "bg-yellow-950/50 text-yellow-400 border border-yellow-900/30"
                        }`}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-center text-xs text-gray-500 py-6">No orders placed yet.</p>
                  )}
                </div>
              </div>

              {/* Recent Bookings List */}
              <div className="bg-[#111] border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-black uppercase tracking-wider">Recent Consultations</h2>
                  <button onClick={() => setActiveTab("consultations")} className="text-xs text-[#c5a059] hover:underline font-bold uppercase tracking-wider">View All</button>
                </div>
                <div className="space-y-3">
                  {consultations.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex justify-between items-center p-3.5 bg-black/40 border border-white/5 rounded-xl text-xs">
                      <div>
                        <p className="font-bold text-white">{c.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{c.service} • Request Date: {c.date}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {consultations.length === 0 && (
                    <p className="text-center text-xs text-gray-500 py-6">No consultation bookings registered.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wider">Orders Management</h1>
              <p className="text-xs text-gray-400 mt-1">Review purchase logs, customer measurements, and Paystack transactions</p>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row gap-4 bg-[#111] border border-white/5 p-4 rounded-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search by customer, email, or reference..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="bg-black/50 border-white/10 text-white pl-10 focus:border-[#c5a059]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500 hidden sm:inline" />
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none focus:border-[#c5a059]"
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
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#111] uppercase tracking-wider text-gray-400 font-bold">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono text-gray-500">{o.id.slice(0, 8)}...</td>
                        <td className="p-4">
                          <p className="font-bold text-white">{o.name}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{o.email}</p>
                        </td>
                        <td className="p-4 text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-gray-300 font-medium">{o.items.length} items</td>
                        <td className="p-4 font-extrabold text-[#c5a059]">₦{o.totalAmount.toLocaleString()}</td>
                        <td className="p-4">
                          <select
                            value={o.status}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded-full outline-none border ${
                              o.status === "paid" || o.status === "completed" ? "bg-green-950/30 text-green-400 border-green-900/30" :
                              o.status === "processing" ? "bg-blue-950/30 text-blue-400 border-blue-900/30" :
                              o.status === "cancelled" ? "bg-red-950/30 text-red-400 border-red-900/30" :
                              "bg-yellow-950/30 text-yellow-400 border-yellow-900/30"
                            }`}
                          >
                            <option value="pending" className="bg-black text-white">Pending</option>
                            <option value="paid" className="bg-black text-white">Paid</option>
                            <option value="processing" className="bg-black text-white">Processing</option>
                            <option value="completed" className="bg-black text-white">Completed</option>
                            <option value="cancelled" className="bg-black text-white">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedOrder(o)}
                            className="bg-transparent border-white/10 text-white hover:bg-white/5 py-1 px-3"
                          >
                            Details
                          </Button>
                          <button 
                            onClick={() => handleDeleteOrder(o.id)}
                            className="text-red-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors inline-block align-middle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500">
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wider">Bookings & Consultations</h1>
              <p className="text-xs text-gray-400 mt-1">Review size profiles requests and scheduled booking sessions</p>
            </div>

            {/* Consultations Table Container */}
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#111] uppercase tracking-wider text-gray-400 font-bold">
                      <th className="p-4">Client</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Requested Date</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Notes</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {consultations.map((c) => (
                      <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-bold text-white">{c.name}</td>
                        <td className="p-4 text-gray-300 font-medium">{c.service}</td>
                        <td className="p-4 text-gray-400 font-mono">{c.date}</td>
                        <td className="p-4">
                          <p className="text-gray-300 font-medium">{c.phone}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{c.email}</p>
                        </td>
                        <td className="p-4 max-w-xs truncate text-gray-400" title={c.notes || "None"}>
                          {c.notes || <span className="italic text-gray-600">No notes provided</span>}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteConsultation(c.id)}
                            className="px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                          >
                            Mark Completed
                          </button>
                        </td>
                      </tr>
                    ))}
                    {consultations.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500">
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
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-wider">Product Catalog</h1>
                <p className="text-xs text-gray-400 mt-1">Manage shop collections, categories, sizing parameters, and prices</p>
              </div>
              <Button 
                onClick={openAddProductModal} 
                className="bg-[#c5a059] hover:bg-[#b08e4f] text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </Button>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row gap-4 bg-[#111] border border-white/5 p-4 rounded-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search by ID, Name, Category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="bg-black/50 border-white/10 text-white pl-10 focus:border-[#c5a059]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500 hidden sm:inline" />
                <select
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  className="bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none focus:border-[#c5a059]"
                >
                  <option value="all">All Categories</option>
                  <option value="KAFTAN">Kaftan</option>
                  <option value="AGBADA">Agbada</option>
                  <option value="ISI AGWU">Isi Agwu</option>
                  <option value="JALABIYA">Jalabiya</option>
                  <option value="TWO PIECES">Two Pieces</option>
                </select>
              </div>
            </div>

            {/* Products Table Container */}
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#111] uppercase tracking-wider text-gray-400 font-bold">
                      <th className="p-4">Image</th>
                      <th className="p-4">Product ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Sizes</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-10 h-10 object-cover rounded-lg border border-white/10 bg-zinc-950" 
                          />
                        </td>
                        <td className="p-4 font-mono text-gray-500">{p.id}</td>
                        <td className="p-4 font-bold text-white">{p.name}</td>
                        <td className="p-4 font-medium uppercase text-gray-400">{p.category}</td>
                        <td className="p-4 font-extrabold text-[#c5a059]">₦{p.price.toLocaleString()}</td>
                        <td className="p-4 font-mono text-gray-500">{p.sizes.join(", ")}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 bg-zinc-900 border border-white/5 hover:border-[#c5a059]/30 text-gray-400 hover:text-[#c5a059] rounded-lg transition-colors inline-block"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 bg-zinc-900 border border-white/5 hover:border-red-500/30 text-gray-400 hover:text-red-500/80 rounded-lg transition-colors inline-block"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500">
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
      </main>

      {/* Order Details Modal Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden smooth-shadow relative my-8">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">Order Details</h3>
                <p className="text-[10px] font-mono text-gray-500 mt-1">Ref ID: {selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
              {/* Customer Profile & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-extrabold uppercase tracking-wide text-gray-400 border-b border-white/5 pb-1">Client Profile</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-bold text-white">{selectedOrder.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{selectedOrder.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{selectedOrder.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-extrabold uppercase tracking-wide text-gray-400 border-b border-white/5 pb-1">Shipping & Checkout</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-300 leading-relaxed">
                        {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300 uppercase font-semibold">
                        {selectedOrder.paymentMethod} Checkout • Ref: <span className="font-mono text-gray-400">{selectedOrder.paymentReference || "N/A"}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sizing & Sizing Parameters reviews */}
              <div className="space-y-3">
                <h4 className="font-extrabold uppercase tracking-wide text-gray-400 border-b border-white/5 pb-1">Cart Items & Sizing Parameters</h4>
                <div className="space-y-2.5">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start bg-black/40 border border-white/5 p-3 rounded-xl">
                      <div>
                        <p className="font-bold text-white">{item.name}</p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          Size Selected: <span className="text-[#c5a059] font-extrabold">{item.size}</span> • Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-extrabold text-[#c5a059]">₦{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order pricing summaries */}
              <div className="bg-black/60 p-4 border border-white/5 rounded-xl space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase tracking-wider">Shipping Fee</span>
                  <span className="font-medium text-white">₦{selectedOrder.shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2.5 text-sm">
                  <span className="text-gray-400 font-extrabold uppercase tracking-wider">Total Paid</span>
                  <span className="font-black text-[#c5a059]">₦{selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-white/10 bg-black flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Order Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                  className={`text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full outline-none border bg-black/40 ${
                    selectedOrder.status === "paid" || selectedOrder.status === "completed" ? "bg-green-950/20 text-green-400 border-green-900/30" :
                    selectedOrder.status === "processing" ? "bg-blue-950/20 text-blue-400 border-blue-900/30" :
                    selectedOrder.status === "cancelled" ? "bg-red-950/20 text-red-400 border-red-900/30" :
                    "bg-yellow-950/20 text-yellow-400 border-yellow-900/30"
                  }`}
                >
                  <option value="pending" className="bg-black text-white">Pending</option>
                  <option value="paid" className="bg-black text-white">Paid</option>
                  <option value="processing" className="bg-black text-white">Processing</option>
                  <option value="completed" className="bg-black text-white">Completed</option>
                  <option value="cancelled" className="bg-black text-white">Cancelled</option>
                </select>
              </div>
              <div className="space-x-3">
                <Button 
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                  className="bg-red-950/30 hover:bg-red-950/50 border border-red-900/40 text-red-400 font-bold uppercase tracking-wider text-[10px] py-2 px-4"
                >
                  Delete Order
                </Button>
                <Button 
                  onClick={() => setSelectedOrder(null)}
                  className="bg-white hover:bg-gray-200 text-black font-bold uppercase tracking-wider text-[10px] py-2 px-4"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#111] border border-white/10 w-full max-w-xl rounded-2xl overflow-hidden smooth-shadow relative my-8">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                {editingProduct ? "Edit Product Properties" : "Register New Custom Wear"}
              </h3>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleProductFormSubmit}>
              <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
                {formError && (
                  <div className="bg-red-950/50 border border-red-500/30 text-red-200 text-[10px] font-bold p-3 rounded-lg text-center uppercase tracking-wider">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Product ID (Unique Key)</label>
                    <Input
                      placeholder="e.g. kaftan-signature-gold"
                      value={productForm.id}
                      onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                      disabled={!!editingProduct}
                      className="bg-black/50 border-white/10 text-white placeholder-gray-700 focus:border-[#c5a059] disabled:opacity-50"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Wear Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs outline-none focus:border-[#c5a059]"
                    >
                      <option value="KAFTAN">Kaftan</option>
                      <option value="AGBADA">Agbada</option>
                      <option value="ISI AGWU">Isi Agwu</option>
                      <option value="JALABIYA">Jalabiya</option>
                      <option value="TWO PIECES">Two Pieces</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Product Name</label>
                    <Input
                      placeholder="e.g. Signature Gold Kaftan"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="bg-black/50 border-white/10 text-white placeholder-gray-700 focus:border-[#c5a059]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Price in Naira (₦)</label>
                    <Input
                      type="number"
                      placeholder="e.g. 150000"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="bg-black/50 border-white/10 text-white placeholder-gray-700 focus:border-[#c5a059]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Thumbnail Image URL</label>
                  <Input
                    placeholder="e.g. /images/products/kaftan-1.jpg"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="bg-black/50 border-white/10 text-white placeholder-gray-700 focus:border-[#c5a059]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Product Description</label>
                  <textarea
                    placeholder="Provide a luxurious and rich overview description for the wear..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full h-20 bg-black/50 border border-white/10 text-white rounded-lg p-3 text-xs outline-none focus:border-[#c5a059] resize-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Sizing Options (Comma separated)</label>
                  <Input
                    placeholder="e.g. S, M, L, XL, XXL"
                    value={productForm.sizesInput}
                    onChange={(e) => setProductForm({ ...productForm, sizesInput: e.target.value })}
                    className="bg-black/50 border-white/10 text-white placeholder-gray-700 focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Key Features / Detail Bullet Points (One per line)</label>
                  <textarea
                    placeholder="e.g. Premium wool fabric&#10;Handcrafted gold stitching&#10;Includes matching trousers"
                    value={productForm.detailsInput}
                    onChange={(e) => setProductForm({ ...productForm, detailsInput: e.target.value })}
                    className="w-full h-20 bg-black/50 border border-white/10 text-white rounded-lg p-3 text-xs outline-none focus:border-[#c5a059] resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Additional Catalog Image URLs (One per line)</label>
                  <textarea
                    placeholder="e.g. /images/products/kaftan-detail-1.jpg&#10;/images/products/kaftan-detail-2.jpg"
                    value={productForm.imagesInput}
                    onChange={(e) => setProductForm({ ...productForm, imagesInput: e.target.value })}
                    className="w-full h-20 bg-black/50 border border-white/10 text-white rounded-lg p-3 text-xs outline-none focus:border-[#c5a059] resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                    className="rounded border-white/10 accent-[#c5a059] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="isNew" className="text-xs text-gray-300 font-bold uppercase tracking-wider cursor-pointer">Tag as New Arrival</label>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-white/10 bg-black flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProductModalOpen(false)}
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 font-bold uppercase tracking-wider text-[10px] py-2 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={formLoading}
                  className="bg-[#c5a059] hover:bg-[#b08e4f] text-black font-bold uppercase tracking-wider text-[10px] py-2 px-4"
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
