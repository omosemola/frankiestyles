"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShoppingBag, ArrowLeft, ShieldCheck, CreditCard, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { createOrderAction } from '@/actions/orders';

const NIGERIAN_STATES = [
  "Lagos", "Abuja (FCT)", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", 
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", 
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Nasarawa", 
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", 
  "Yobe", "Zamfara"
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Lagos');
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'whatsapp'>('paystack');

  useEffect(() => {
    setMounted(true);
    // Inject Paystack inline popup script dynamically to bypass server-rendering warnings
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace('/shop');
    }
  }, [mounted, items.length, router]);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 150000 ? 0 : 5000; // Free shipping over 150k Naira
  const total = subtotal + shipping;

  const handlePaystackSuccessAction = async (refCode: string) => {
    try {
      await createOrderAction({
        name,
        email,
        phone,
        address,
        city,
        state,
        paymentMethod: 'paystack',
        paymentReference: refCode,
        totalAmount: total,
        shippingFee: shipping,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          size: item.size,
          quantity: item.quantity
        }))
      });
    } catch (err) {
      console.error("Failed to save Paystack order details:", err);
    }
    clearCart();
    router.push(`/checkout/success?reference=${refCode}`);
  };

  const handlePaystackCloseAction = () => {
    alert("Transaction cancelled. If you experienced any issue, please contact support.");
  };

  const handleWhatsAppCheckout = async () => {
    const referenceCode = `WA-${Date.now()}`;
    try {
      await createOrderAction({
        name,
        email,
        phone,
        address,
        city,
        state,
        paymentMethod: 'whatsapp',
        paymentReference: referenceCode,
        totalAmount: total,
        shippingFee: shipping,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          size: item.size,
          quantity: item.quantity
        }))
      });
    } catch (err) {
      console.error("Failed to save WhatsApp order details:", err);
    }

    // Compile order message text
    const orderItemsText = items
      .map((item) => `• ${item.name} (Size: ${item.size}) x ${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}`)
      .join('\n');
      
    const message = `*FRANKIE STYLES - NEW ORDER*
---------------------------------------
*Client Details:*
• Name: ${name}
• Email: ${email}
• Phone: ${phone}
• Delivery: ${address}, ${city}, ${state} State

*Order Summary:*
${orderItemsText}

*Shipping:* ${shipping === 0 ? "FREE" : `₦${shipping.toLocaleString()}`}
*Total Amount:* ₦${total.toLocaleString()}
---------------------------------------
Please confirm my order and contact me regarding fabric/measurement details. Thank you!`;

    // Clear cart
    clearCart();
    
    // Open WhatsApp in a new window/tab
    const whatsappUrl = `https://wa.me/2348066913548?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Redirect to checkout success page
    router.push(`/checkout/success?reference=${referenceCode}`);
  };

  const handlePaystackCheckout = () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      alert("Paystack Public Key is missing. Check your environment settings.");
      return;
    }

    // Initialize Paystack popup directly and securely only when form is submitted
    const paystack = (window as any).PaystackPop;
    if (paystack) {
      const handler = paystack.setup({
        key: publicKey,
        email: email,
        amount: total * 100,
        ref: `FS-${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: name
            },
            {
              display_name: "Customer Phone",
              variable_name: "customer_phone",
              value: phone
            },
            {
              display_name: "Delivery Address",
              variable_name: "delivery_address",
              value: `${address}, ${city}, ${state} State`
            }
          ]
        },
        callback: function(response: any) {
          handlePaystackSuccessAction(response.reference);
        },
        onClose: function() {
          handlePaystackCloseAction();
        }
      });
      handler.openIframe();
    } else {
      alert("Paystack SDK failed to load. Please verify your internet connection.");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !city) {
      alert("Please fill in all shipping details.");
      return;
    }

    if (paymentMethod === 'whatsapp') {
      handleWhatsAppCheckout();
    } else {
      handlePaystackCheckout();
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center space-y-4 px-6">
        <ShoppingBag className="w-16 h-16 text-gray-300 animate-bounce" />
        <h1 className="text-3xl font-bold uppercase tracking-widest font-bodoni">Your Cart is Empty</h1>
        <p className="text-gray-500 max-w-sm text-sm">Add some custom native wears to your cart before proceeding to checkout.</p>
        <Link 
          href="/shop"
          className="mt-4 px-6 py-3 bg-[#0a0a0a] text-white hover:bg-black/90 rounded-lg uppercase tracking-wider font-semibold text-xs inline-block transition-colors duration-300"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* Shipping Form Panel */}
      <div className="lg:col-span-7 bg-white p-8 rounded-2xl smooth-shadow">
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 font-bodoni border-b border-gray-100 pb-4">Checkout Details</h2>
        
        {/* Payment Method Selector */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setPaymentMethod('paystack')}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-3",
              paymentMethod === 'paystack'
                ? "border-black bg-gray-50 text-black shadow-sm"
                : "border-gray-150 bg-white text-gray-500 hover:border-gray-300 hover:text-black"
            )}
          >
            <CreditCard className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Pay Online</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Card / Transfer (Paystack)</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('whatsapp')}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-3",
              paymentMethod === 'whatsapp'
                ? "border-black bg-gray-50 text-black shadow-sm"
                : "border-gray-150 bg-white text-gray-500 hover:border-gray-300 hover:text-black"
            )}
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Order on WhatsApp</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Chat with Tailoring Team</p>
            </div>
          </button>
        </div>

        <h3 className="text-base font-bold uppercase tracking-wider mb-6 font-bodoni">Delivery & Fitting Address</h3>

        <form onSubmit={handleCheckoutSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
            <Input 
              type="text" 
              required 
              placeholder="E.g., Omosemola Frankie" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-[#f8f8f8] border-transparent focus:border-black h-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
              <Input 
                type="email" 
                required 
                placeholder="E.g., frankie@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-[#f8f8f8] border-transparent focus:border-black h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number (WhatsApp Active)</label>
              <Input 
                type="tel" 
                required 
                placeholder="E.g., 08066913548" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="bg-[#f8f8f8] border-transparent focus:border-black h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Street Address</label>
            <Input 
              type="text" 
              required 
              placeholder="E.g., 12b Admiralty Way, Apartment 3" 
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="bg-[#f8f8f8] border-transparent focus:border-black h-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">City / Area</label>
              <Input 
                type="text" 
                required 
                placeholder="E.g., Lekki Phase 1" 
                value={city}
                onChange={e => setCity(e.target.value)}
                className="bg-[#f8f8f8] border-transparent focus:border-black h-12"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">State</label>
              <select 
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-transparent bg-[#f8f8f8] text-sm font-semibold uppercase tracking-wider hover:border-black focus:outline-none focus:border-black transition-colors"
              >
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {paymentMethod === 'paystack' ? (
            <Button type="submit" className="w-full py-4 text-sm font-semibold uppercase tracking-widest h-14 rounded-xl flex items-center justify-center gap-2 mt-4">
              <CreditCard className="w-4 h-4" /> Secure Payment with Paystack
            </Button>
          ) : (
            <Button type="submit" className="w-full py-4 text-sm font-semibold uppercase tracking-widest h-14 rounded-xl flex items-center justify-center gap-2 mt-4 bg-green-600 hover:bg-green-700 border-none text-white transition-colors duration-300">
              <MessageCircle className="w-4 h-4 fill-white" /> Place Order via WhatsApp
            </Button>
          )}
        </form>

        <div className="flex items-center gap-2 justify-center mt-6 text-xs text-gray-400">
          {paymentMethod === 'paystack' ? (
            <>
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Payments are processed securely via Paystack. Your details are safe.</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Your order will be compiled and sent to our tailoring team on WhatsApp.</span>
            </>
          )}
        </div>
      </div>

      {/* Cart Summary Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-8 rounded-2xl smooth-shadow space-y-6">
          <h3 className="text-lg font-bold uppercase tracking-wider font-bodoni border-b border-gray-100 pb-4">Order Summary</h3>
          
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between items-center gap-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide max-w-[180px] truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-xs font-bold">₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3 text-sm font-medium">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₦${shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-dashed border-gray-100">
              <span>Total Amount</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
