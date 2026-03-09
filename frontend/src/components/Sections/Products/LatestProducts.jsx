import React from "react";
import { Link } from "react-router-dom";

function LatestProducts() {
    return (
        <section className="py-16 space-y-16 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-16 reveal">
                <div className="space-y-4">
                    <span className="text-indigo-600 font-black tracking-[0.6em] text-[10px] uppercase block">New Collections</span>
                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tightest leading-none">
                        Season <span className="italic font-light opacity-30 text-rose-500">Favorites</span>
                    </h2>
                </div>
                <div className="max-w-[280px] text-right mt-8 md:mt-0">
                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                        "Elegance is not standing out, but being remembered." — Curated for you.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Women Card - Premium Glass */}
                <div className="relative group overflow-hidden rounded-[4rem] h-[600px] md:h-[800px] bg-slate-50 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] reveal">
                    <img
                        src="/assets/editorial/women_favorites.png"
                        alt="Women Collection"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out grayscale-[0.2] group-hover:grayscale-0"
                    />

                    {/* Elite Floating Card */}
                    <div className="absolute top-10 left-10 right-10 lg:right-auto">
                        <div className="glass-premium p-10 rounded-[3rem] lg:max-w-[360px] translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 backdrop-blur-3xl shadow-2xl">
                            <span className="text-[10px] font-black text-indigo-600 tracking-[0.4em] uppercase mb-4 block">Editorial / 01</span>
                            <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">The Aura <br /><span className="font-light opacity-50">Femme</span></h3>
                            <p className="text-xs font-bold text-slate-500 leading-relaxed mb-8 italic">Meticulous silhouettes crafted for the modern visionary. Experience the future of feminine elegance.</p>
                            <Link to="/category/women" className="btn-elite py-4 px-8 text-[10px] group-hover:bg-rose-500 group-hover:scale-100 shadow-none">
                                EXPLORE LOOKS
                            </Link>
                        </div>
                    </div>

                    {/* Unexpected Floating Detail */}
                    <div className="absolute bottom-12 right-12 w-24 h-24 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rotate-12 group-hover:rotate-0">
                        <span className="text-[8px] font-black text-white uppercase tracking-widest text-center">PREMIUM <br />QUALITY</span>
                    </div>
                </div>

                {/* Men Card - Architectural Dark Glass */}
                <div className="relative group overflow-hidden rounded-[4rem] h-[600px] md:h-[800px] bg-slate-950 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] reveal" style={{ transitionDelay: '200ms' }}>
                    <img
                        src="/assets/editorial/men_favorites.png"
                        alt="Men Collection"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out opacity-80"
                    />

                    {/* Dark Elite Card */}
                    <div className="absolute bottom-10 left-10 right-10 lg:left-auto">
                        <div className="glass-dark p-10 rounded-[3rem] lg:max-w-[360px] translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 border-white/5">
                            <span className="text-[10px] font-black text-indigo-400 tracking-[0.4em] uppercase mb-4 block">Editorial / 02</span>
                            <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">Urban <br /><span className="font-light opacity-30">Vanguard</span></h3>
                            <p className="text-xs font-bold text-slate-400 leading-relaxed mb-8 italic">Sharp lines, industrial textures, and the silence of luxury. Tailored for the urban pioneer.</p>
                            <Link to="/category/men" className="btn-elite py-4 px-8 text-[10px] bg-white text-slate-950 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-100 shadow-none">
                                VIEW CATALOG
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Full Width Kids Section - Cinematic Wide */}
                <div className="md:col-span-2 relative h-[500px] md:h-[650px] rounded-[4rem] overflow-hidden group shadow-2xl mt-12 reveal" style={{ transitionDelay: '400ms' }}>
                    <img
                        src="/assets/editorial/kids_favorites.png"
                        alt="Kids Collection"
                        className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent flex items-center p-12 md:p-24">
                        <div className="max-w-xl space-y-8">
                            <div className="inline-flex items-center gap-4 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl rounded-full">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.4em]">Next Gen Staples</span>
                            </div>
                            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tightest leading-[0.8]">
                                LITTLE <br /><span className="italic font-light opacity-40 text-rose-500 uppercase">Icons</span>
                            </h2>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-sm italic">Designed for comfort and effortless style. The best start young.</p>
                            <Link to="/category/children" className="btn-elite bg-white text-slate-950 px-12 py-6 text-sm hover:bg-rose-500 hover:text-white">
                                SHOP THE COLLECTION
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LatestProducts;