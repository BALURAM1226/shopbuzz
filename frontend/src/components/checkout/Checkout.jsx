import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../services/firebase";
import API_BASE_URL from "../../apiConfig";
import CartContext from "../../context/addToCart/cartContext";
import toast from "react-hot-toast";

const Checkout = () => {
    const user = auth.currentUser;
    const { cart, setCart } = useContext(CartContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        address: "",
        city: "",
        zip: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.error("Security Checkpoint: Please log in to complete your architectural order.", {
                icon: '🔒',
                style: { borderRadius: '1rem', background: '#333', color: '#fff' }
            });
            navigate("/login");
            return;
        }
        if (cart.length === 0) {
            navigate("/addToCart");
            return;
        }
        fetchCartDetails();
    }, [user, cart]);

    const fetchCartDetails = async () => {
        try {
            const uniqueIds = [...new Set(cart.map(item => item.id))];
            const response = await axios.post(`${API_BASE_URL}/getCartItems`, {
                body: uniqueIds
            });

            const detailedItems = cart.map(cartItem => {
                const product = response.data.find(p => p._id === cartItem.id);
                return {
                    ...product,
                    selectedSize: cartItem.size,
                    quantity: cartItem.quantity
                };
            }).filter(item => item != null);
            setCartItems(detailedItems);
        } catch (err) {
            console.error("Error fetching checkout details:", err);
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare items for backend
        const orderItems = cartItems.map(item => ({
            productId: item._id,
            productName: item.productName,
            productImage: item.productImage,
            size: item.selectedSize,
            quantity: item.quantity,
            price: item.price
        }));

        const orderData = {
            ...formData,
            userId: user.uid,
            totalAmount,
            items: orderItems
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/place-order`, orderData);
            // On success, clear cart and redirect
            localStorage.removeItem("Products_id");
            setCart([]);
            toast.success("Order Placed Successfully! ✨ Your collection is on its way.");
            navigate(`/order-success/${response.data.orderId}`);
        } catch (err) {
            toast.error("Checkout failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-[1440px] mx-auto px-6 py-20 bg-white min-h-screen">
            <header className="mb-16 space-y-4 reveal">
                <div className="flex items-center gap-4">
                    <span className="px-5 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
                    <span className="w-12 h-px bg-slate-100"></span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tightest leading-none uppercase italic">Complete <br /><span className="text-indigo-600">Your Order</span></h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                {/* Information Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-12 reveal">
                    <section className="space-y-8">
                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">01</span>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Shipping Destination</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                <input required type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl outline-none font-bold transition-all" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Contact Email</label>
                                <input required type="email" placeholder="john@boutique.com" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl outline-none font-bold transition-all" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Street Address</label>
                                <input required type="text" placeholder="123 Luxury Lane, Elite Plaza" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl outline-none font-bold transition-all" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">City</label>
                                <input required type="text" placeholder="New York" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl outline-none font-bold transition-all" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Postal Code</label>
                                <input required type="text" placeholder="10001" className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl outline-none font-bold transition-all" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black">02</span>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Payment Method (Mock)</h3>
                        </div>
                        <div className="p-8 bg-slate-900 rounded-[3rem] text-white flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white/10 rounded-2xl">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-black tracking-widest">SECURE CARD PAYMENT</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Safe, Instant, & Verified • No Actual Charge Applied</p>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-4 border-indigo-600 bg-white"></div>
                        </div>
                    </section>

                    <button disabled={loading} type="submit" className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black tracking-[0.3em] uppercase text-sm shadow-2xl shadow-indigo-200 hover:bg-slate-950 transition-all active:scale-95 disabled:opacity-50">
                        {loading ? "PROCESSING ORDER..." : "PLACE ORDER"}
                    </button>
                </form>

                {/* Bag Preview */}
                <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit reveal" style={{ transitionDelay: '200ms' }}>
                    <div className="bg-slate-50 rounded-[4rem] p-10 border border-slate-100 space-y-10">
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Bag Review <span className="text-slate-200 ml-2">/ {cartItems.length} Pieces</span></h4>

                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                            {cartItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="w-20 h-24 bg-white rounded-2xl overflow-hidden border border-slate-200 p-2">
                                        <img src={item.productImage} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h5 className="text-xs font-black text-slate-900 uppercase leading-none">{item.productName}</h5>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.selectedSize} / qty: {item.quantity}</p>
                                        <p className="text-sm font-black text-indigo-600 italic">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-slate-200 space-y-4">
                            <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                                <span>Collection Total</span>
                                <span className="text-slate-900">₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest text-emerald-600">
                                <span>Priority Shipping</span>
                                <span>Complimentary</span>
                            </div>
                            <div className="pt-6 flex justify-between items-end">
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Final Amount</span>
                                <span className="text-4xl font-black text-slate-900 tracking-tightest italic leading-none">₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
