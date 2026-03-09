import React from "react";
import Brand from "../Banners/Brands/Brand";
import Hero from "../layout/Hero";
import Category from "../Sections/Catogories/Category";
import PopularProducts from "../Sections/Products/PopularProducts";
import LatestProducts from "../Sections/Products/LatestProducts";

function HomePage() {
    return (
        <main className="space-y-20 md:space-y-32 bg-white min-h-screen">
            <Hero />

            {/* Categories Section */}
            <div className="max-w-[1536px] mx-auto px-4 md:px-8">
                <Category />
            </div>

            {/* Trending Section */}
            <div className="section-container">
                <PopularProducts title="Trending Now" />
            </div>

            {/* Featured Masterpiece Section - Elite Refined */}
            <div className="section-container reveal">
                <div className="relative overflow-hidden rounded-[4rem] bg-slate-950 h-[500px] md:h-[700px] flex items-center shadow-2xl group border border-white/5">
                    <img
                        src="/assets/luxury_watch_feature.png"
                        alt="Masterpiece"
                        className="absolute right-0 top-0 w-2/3 h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[15s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="relative z-10 px-10 md:px-24 space-y-10 max-w-3xl">
                        <div className="inline-flex items-center gap-4 px-6 py-2 bg-amber-500/10 border border-amber-500/20 backdrop-blur-xl rounded-full">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Featured Product</span>
                        </div>
                        <h2 className="text-6xl md:text-9xl font-black text-white tracking-tightest leading-[0.8]">
                            THE <span className="text-amber-500 italic font-light opacity-60">VINTAGE</span> <br />
                            AURA
                        </h2>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-md italic">
                            A limited-run collaboration of heritage craftsmanship and future design. Precision engineered for the distinguished.
                        </p>
                        <button className="btn-elite bg-white text-slate-950 hover:bg-amber-600 hover:text-white px-12 py-6 text-sm">
                            PRE-ORDER EXCLUSIVE
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Brands Section */}
            <div className="bg-slate-50/30">
                <Brand />
            </div>

            {/* Best Sellers Section */}
            <div className="section-container">
                <PopularProducts title="Best Sellers" />
            </div>

            {/* Innovation Spotlight - Unexpected Premium Section */}
            <div className="bg-slate-950 py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh opacity-30"></div>
                <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 reveal">
                        <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Shop in AR</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tightest leading-[0.85]">
                            THE <span className="italic font-light opacity-40 text-rose-500">VIRTUAL</span> <br />
                            MIRROR
                        </h2>
                        <p className="text-xl text-slate-400 max-w-md leading-relaxed font-medium">
                            Experience the collection in your own space. Our AI-driven technology renders products with high precision.
                        </p>
                        <button className="btn-elite bg-white text-slate-950 hover:bg-rose-500 hover:text-white">
                            LAUNCH TRY-ON
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative group perspective-[2000px]">
                        <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-rose-500/20 rounded-[4rem] backdrop-blur-3xl border border-white/10 overflow-hidden transform group-hover:rotate-y-12 transition-transform duration-1000 group-hover:shadow-indigo-500/20 shadow-2xl">
                            <img
                                src="/assets/featured/luxury_perfume.png"
                                alt="Innovation"
                                className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-110 transition-transform duration-[5s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                        </div>
                        {/* Decorative floating ring */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-indigo-500/20 rounded-full animate-spin-slow"></div>
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 border border-rose-500/10 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Last Arrivals Section */}
            <div className="section-container pb-32">
                <LatestProducts />
            </div>
        </main>
    );
}

export default HomePage;