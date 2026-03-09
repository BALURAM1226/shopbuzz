import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";
import axios from "axios";

const OrderSuccess = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/order/${id}`);
                setOrder(response.data);
            } catch (err) {
                console.error("Error fetching order:", err);
            }
        };
        fetchOrder();
    }, [id]);

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pb-32">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden reveal relative">
                    {/* Top Decorative bar */}
                    <div className="h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

                    <div className="p-12 md:p-20 text-center space-y-10">
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping"></div>
                            <div className="absolute inset-4 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-200">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tightest uppercase italic leading-none">
                                Order <br /> <span className="text-indigo-600">Confirmed</span>
                            </h1>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Your order has been successfully placed and is being processed.</p>
                        </div>

                        {order && (
                            <div className="bg-slate-50 rounded-[2.5rem] p-10 space-y-6 text-left border border-slate-100">
                                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Protocol</span>
                                    <span className="text-xs font-black text-slate-900 uppercase tracking-tighter">#{order._id.slice(-8).toUpperCase()}</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Courier Destination</span>
                                        <span className="text-xs font-bold text-slate-900">{order.city}, India</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Valuation</span>
                                        <span className="text-xl font-black text-indigo-600 italic">₹{order.totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link to="/" className="py-6 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
                                CONTINUE SHOPPING
                            </Link>
                            <button className="py-6 bg-white border-2 border-slate-900 text-slate-900 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-50 transition-all active:scale-95">
                                DOWNLOAD INVOICE
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-4 pt-4">
                            <span className="w-12 h-px bg-slate-100"></span>
                            <span className="text-[9px] font-black text-slate-200 uppercase tracking-[0.6em]">ShopBuzz Elite / Couture Edition</span>
                            <span className="w-12 h-px bg-slate-100"></span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderSuccess;
