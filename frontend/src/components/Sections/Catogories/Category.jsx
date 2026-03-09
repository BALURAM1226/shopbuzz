import React from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Men's Collection",
        image: "/assets/categories/men_category.png",
        link: "/category/men",
        span: "col-span-1 md:col-span-4"
    },
    {
        title: "Women's Collection",
        image: "/assets/categories/women_category.png",
        link: "/category/women",
        span: "col-span-1 md:col-span-4"
    },
    {
        title: "Kids' Corner",
        image: "/assets/categories/kids_category.png",
        link: "/category/children",
        span: "col-span-1 md:col-span-4"
    },
    {
        title: "Premium Footwear",
        image: "/assets/categories/footwear_category.png",
        link: "/category/footwear",
        span: "col-span-1 md:col-span-6"
    },
    {
        title: "Accessories Store",
        image: "/assets/categories/accessories_category.png",
        link: "/category/accessories",
        span: "col-span-1 md:col-span-6"
    }
];

function Category() {
    return (
        <section className="py-16 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-12">
                <div className="space-y-4">
                    <span className="text-indigo-600 font-black tracking-[0.6em] text-[10px] uppercase block">New Collections</span>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter italic leading-none">
                        Browse <span className="text-indigo-600">The</span> <br />
                        <span className="opacity-30 not-italic">Collections</span>
                    </h2>
                </div>
                <p className="max-w-xs text-slate-500 font-medium leading-relaxed">
                    Explore our meticulously crafted segments, each defining a unique chapter of modern luxury.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        to={cat.link}
                        className={`${cat.span} group relative overflow-hidden rounded-[3.5rem] ${index % 2 === 0 ? 'h-[500px]' : 'h-[600px]'} shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-indigo-200 transition-all duration-1000 block bg-slate-100`}
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out grayscale-[0.2] group-hover:grayscale-0"
                        />

                        {/* Elite Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="glass-premium p-8 rounded-[2.5rem] translate-y-4 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100 backdrop-blur-3xl">
                                <span className="text-[10px] font-black text-indigo-600 tracking-[0.4em] uppercase mb-2 block">0{index + 1} / Collection</span>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-4 italic">{cat.title.split(" ")[0]} <span className="font-light opacity-50">{cat.title.split(" ")[1]}</span></h3>
                                <div className="flex items-center gap-3 text-indigo-600 font-black text-[10px] tracking-[0.2em] uppercase group-hover:gap-5 transition-all">
                                    VIEW COLLECTION
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge (Unexpected) */}
                        <div className="absolute top-8 right-8 flex flex-col items-end gap-2 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 transform rotate-12 -translate-y-20 group-hover:translate-y-0 transition-transform duration-1000 delay-300">
                            <span className="text-[8px] font-black text-white uppercase tracking-widest">CURATED</span>
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Category;