import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../services/firebase";
import API_BASE_URL from '../../apiConfig';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user-orders/${user.uid}`);
                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                toast.error("Failed to retrieve your order archives.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-t-indigo-600 border-indigo-100 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="max-w-[1440px] mx-auto px-6 py-20 bg-white min-h-screen">
            <header className="mb-16 space-y-4 reveal">
                <div className="flex items-center gap-4">
                    <span className="px-5 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Personal Archives</span>
                    <span className="w-12 h-px bg-slate-100"></span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tightest leading-none uppercase italic">Order <br /><span className="text-indigo-600">History</span></h1>
                <p className="text-sm font-bold text-gray-400 tracking-widest italic uppercase">A curated timeline of your signature acquisitions.</p>
            </header>

            {orders.length === 0 ? (
                <div className="py-32 text-center space-y-8 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-100 reveal">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl text-4xl">🛍️</div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Archives are empty</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">You haven't added any masterpieces to your collection yet.</p>
                    </div>
                    <Link to="/" className="inline-block px-10 py-5 bg-indigo-600 text-white font-black rounded-full uppercase tracking-widest text-xs shadow-2xl shadow-indigo-100 hover:bg-slate-950 transition-all active:scale-95">
                        Start Your Collection
                    </Link>
                </div>
            ) : (
                <div className="space-y-12">
                    {orders.map((order) => (
                        <section key={order._id} className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-700 reveal group">
                            {/* Order Header */}
                            <div className="p-8 md:p-12 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Order Identifier</span>
                                        <span className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold rounded uppercase">{order._id.slice(-8)}</span>
                                    </div>
                                    <p className="text-sm font-black text-slate-900 uppercase">Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-6 py-3 bg-white rounded-2xl border border-slate-200">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                                        <p className="text-xs font-black text-indigo-600 uppercase italic">{order.orderStatus}</p>
                                    </div>
                                    <div className="px-6 py-3 bg-white rounded-2xl border border-slate-200">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Valuation</p>
                                        <p className="text-xs font-black text-slate-900 uppercase italic tracking-tighter">₹{order.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-8 md:p-12 space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-6 group/item">
                                            <div className="w-24 h-32 bg-slate-50 rounded-2xl overflow-hidden p-3 border border-slate-100 group-hover/item:border-indigo-100 transition-colors flex-shrink-0">
                                                <img
                                                    src={item.productImage || "https://placehold.co/400x500?text=Archived+Piece"}
                                                    alt={item.productName}
                                                    className="w-full h-full object-contain mix-blend-multiply group-hover/item:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="space-y-2 flex-1">
                                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight">{item.productName}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-[9px] font-black text-slate-500 rounded uppercase">Size {item.size}</span>
                                                    <span className="text-slate-200">/</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty {item.quantity}</span>
                                                </div>
                                                <p className="text-lg font-black text-slate-900 tracking-tighter italic">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Shipping Footer */}
                                <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-end gap-6">
                                    <div className="space-y-3 max-w-sm">
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Delivery Signature</h5>
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <p className="text-xs font-black text-slate-800 uppercase italic leading-relaxed">
                                                {order.customerName}<br />
                                                {order.address}, {order.city}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-100 flex items-center gap-3">
                                        DOWNLOAD INVOICE
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </main>
    );
};

export default OrderHistory;
