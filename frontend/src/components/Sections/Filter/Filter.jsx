import React, { useState } from 'react';

const brands = ['Zara', 'FabIndia', 'Levi\'s', 'Raymond', 'Lee', 'Puma', 'Adidas'];
const categories = ['T-Shirts', 'Shirts', 'Jeans', 'Kurtas', 'Dresses', 'Accesories'];

function Filter() {
    const [priceRange, setPriceRange] = useState(5000);

    return (
        <aside className="w-full bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-100/50 space-y-10 sticky top-28 h-fit">
            <header className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">Curation Engine</h3>
                </div>
                <button className="text-[10px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-widest transition-colors active:scale-95">Reset</button>
            </header>

            <div className="space-y-10 px-2">
                {/* Price Range */}
                <div className="space-y-6">
                    <div className="flex justify-between items-baseline">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Max Valuation</h4>
                        <span className="text-lg font-black text-indigo-600 tracking-tighter italic">₹{priceRange}</span>
                    </div>
                    <div className="relative group">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 group-hover:bg-slate-200 transition-colors"
                        />
                        <div className="flex justify-between mt-4">
                            <span className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">FREE</span>
                            <span className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">₹10K+</span>
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-50"></div>

                {/* Categories */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Domain</h4>
                    <div className="grid grid-cols-1 gap-2">
                        {categories.slice(0, 4).map((cat) => (
                            <label key={cat} className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-all">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" className="peer w-6 h-6 rounded-lg border-2 border-slate-100 text-indigo-600 focus:ring-transparent transition-all cursor-pointer appearance-none" />
                                    <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div className="absolute inset-0 bg-indigo-600 rounded-lg scale-0 peer-checked:scale-100 transition-transform -z-10"></div>
                                </div>
                                <span className="text-sm font-black text-slate-500 group-hover:text-slate-900 transition-colors tracking-tight italic">{cat}</span>
                            </label>
                        ))}
                        <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-[0.2em] pt-4 pl-2 inline-flex items-center gap-2 group">
                            VIEW ALL COLLECTIONS
                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-50"></div>

                {/* Rating */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quality Verified</h4>
                    <div className="flex flex-col gap-3">
                        {[4, 3, 2].map((star) => (
                            <label key={star} className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                                <input type="radio" name="rating" className="w-5 h-5 rounded-full border-2 border-slate-100 text-indigo-600 focus:ring-transparent transition-all cursor-pointer" />
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className={`text-lg ${i < star ? 'text-indigo-600' : 'text-slate-100'}`}>★</span>
                                    ))}
                                    <span className="text-[10px] font-black text-slate-400 uppercase ml-2">& Expert Verified</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Apply Button */}
                <button className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl active:scale-95 tracking-[0.2em] uppercase text-[11px] flex items-center justify-center gap-3">
                    REFINE SELECTION
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </aside>
    );
}

export default Filter;