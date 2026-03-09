import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';
import { useNavigate } from 'react-router-dom';

const ProductSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim().length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/search?q=${query}`);
                setResults(response.data);
                setOpen(true);
            } catch (err) {
                console.error('Search error:', err);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchResults, 400);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSelectProduct = (id) => {
        setOpen(false);
        setQuery('');
        navigate(`/productDetails/${id}`);
    };

    return (
        <div className="relative w-full group" ref={dropdownRef}>
            {/* Elite Input Wrapper */}
            <div className={`relative flex items-center bg-slate-100/50 backdrop-blur-md border border-slate-200/50 p-3 rounded-[2rem] transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 group-focus-within:bg-white group-focus-within:border-indigo-600/30 group-focus-within:shadow-2xl group-focus-within:shadow-indigo-500/10 ${open && results.length > 0 ? 'rounded-b-none' : ''}`}>
                <div className="flex items-center justify-center pl-3 pr-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    placeholder="Search the Elite Collection..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => query.length > 0 && setOpen(true)}
                    className="w-full bg-transparent border-none focus:ring-0 outline-none appearance-none text-xs font-black text-slate-950 placeholder-slate-400 uppercase tracking-widest py-1 h-8"
                />

                {loading && (
                    <div className="absolute right-6 flex items-center gap-2">
                        <span className="w-1 h-1 bg-indigo-600 rounded-full animate-ping"></span>
                        <span className="text-[8px] font-black text-indigo-600 tracking-tighter">AI SCANNING</span>
                    </div>
                )}
            </div>

            {/* Premium Solid White Dropdown Results */}
            {open && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 border-t-0 rounded-b-[2.5rem] z-[1001] max-h-[550px] overflow-hidden reveal shadow-2xl shadow-indigo-500/10 scale-in-center">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Matches Found ({results.length})</span>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black rounded-lg uppercase tracking-widest">Neural Sorting</span>
                    </div>

                    <div className="divide-y divide-slate-100 overflow-y-auto max-h-[400px] custom-scrollbar">
                        {results.map((product, index) => (
                            <button
                                key={product._id}
                                onClick={() => handleSelectProduct(product._id)}
                                className="w-full group/item flex items-center p-5 hover:bg-slate-50 transition-all text-left relative overflow-hidden"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <div className="h-20 w-20 relative flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 group-hover/item:border-indigo-100 transition-all">
                                    <img
                                        src={product.productImage}
                                        alt={product.productName}
                                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="ml-6 flex-1">
                                    <p className="text-[8px] font-black text-indigo-500 tracking-[0.3em] uppercase mb-1 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                                        {product.category} / {product.brand}
                                    </p>
                                    <h4 className="text-sm font-black text-slate-900 tracking-tight leading-none group-hover/item:text-indigo-600 transition-colors uppercase italic">{product.productName}</h4>
                                    <p className="text-[10px] text-slate-400 font-medium mt-2 line-clamp-1 italic">Exclusive Edition Craftsmanship</p>
                                </div>
                                <div className="text-right pl-4">
                                    <span className="text-xs font-black text-slate-950 tracking-tighter block mb-1">₹{product.price.toLocaleString()}</span>
                                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Stock: Elite</span>
                                </div>
                                {/* Hover Indicator */}
                                <div className="absolute left-0 top-0 bottom-0 w-0 bg-indigo-600 group-hover/item:w-1 transition-all duration-300"></div>
                            </button>
                        ))}
                    </div>

                    <div className="p-5 bg-slate-950 text-center flex items-center justify-center gap-4 group/all">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover/all:text-white transition-colors cursor-pointer">View All Detailed Matches</span>
                        <svg className="w-4 h-4 text-indigo-500 group-hover/all:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Solid White Empty State */}
            {open && query.trim().length >= 2 && results.length === 0 && !loading && (
                <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 border-t-0 rounded-b-[2.5rem] z-[1001] p-16 text-center animate-in slide-in-from-top-4 duration-700">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <div className="absolute inset-0 bg-indigo-500/5 rounded-full animate-ping"></div>
                        <div className="absolute inset-4 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center">
                            <span className="text-3xl grayscale opacity-50">✨</span>
                        </div>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tightest leading-none uppercase italic">The Aura found <span className="text-indigo-600">No Match</span></h4>
                    <p className="max-w-[200px] mx-auto text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[0.2em] leading-relaxed">Refine your inquiry for the Neural Engine. Search for garments or high-fashion lux items.</p>
                </div>
            )}
        </div>
    );
};

export default ProductSearch;
