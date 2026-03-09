import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from '../../features/ProductCard';
import ProductFilter from '../Filter/Filter';
import API_BASE_URL from '../../../apiConfig';
import CartContext from '../../../context/addToCart/cartContext';

const categoryConfigs = {
    men: {
        title: "Men's Store",
        accent: "indigo",
        sidebar: [
            { title: "Trending Now", sub: ["Summer 24", "Winter Essentials", "Work Wear"] },
            { title: "Apparel Types", sub: ["Traditional", "Casual", "Formal", "Premium"] },
            { title: "Accessories", sub: ["Watches", "Belts", "Wallets"] }
        ]
    },
    women: {
        title: "Women's Store",
        accent: "rose",
        sidebar: [
            { title: "Trending Now", sub: ["Summer Florals", "Elegant Silks", "Festive Glow"] },
            { title: "Apparel Types", sub: ["Sarees", "Kurtas", "Western Wear", "Loungewear"] },
            { title: "Accessories", sub: ["Bags", "Jewelry", "Scarves"] }
        ]
    },
    children: {
        title: "Kids' Corner",
        accent: "amber",
        sidebar: [
            { title: "Playful Vibes", sub: ["Newborn", "Toddlers", "School Year"] },
            { title: "Apparel Types", sub: ["Party Wear", "Daily Wear", "Sportswear"] }
        ]
    },
    footwear: {
        title: "Premium Shoes",
        accent: "indigo",
        sidebar: [
            { title: "Performance", sub: ["Running", "Training", "Lifestyle"] },
            { title: "Occasion", sub: ["Formal Shoes", "Casual Boots", "Sneakers"] }
        ]
    },
    accessories: {
        title: "Accessories Store",
        accent: "rose",
        sidebar: [
            { title: "Timepieces", sub: ["Luxury Watches", "Smart Gear", "Vintage"] },
            { title: "Leather Goods", sub: ["Handbags", "Wallets", "Briefcases"] }
        ]
    }
};

function CategoryPage() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    const config = categoryConfigs[categoryName.toLowerCase()] || {
        title: `${categoryName} Collection`,
        accent: "slate",
        sidebar: []
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        async function fetchProducts() {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE_URL}/products?category=${categoryName}`);
                setProducts(res.data);
            } catch (error) {
                console.error(`Error fetching ${categoryName} wear:`, error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [categoryName]);

    const accentColor = {
        indigo: "text-indigo-600",
        rose: "text-rose-500",
        amber: "text-amber-500",
        slate: "text-slate-900"
    }[config.accent];

    const accentBg = {
        indigo: "bg-indigo-600",
        rose: "bg-rose-500",
        amber: "bg-amber-500",
        slate: "bg-slate-900"
    }[config.accent];

    const accentHover = {
        indigo: "hover:bg-indigo-50 hover:text-indigo-600",
        rose: "hover:bg-rose-50 hover:text-rose-500",
        amber: "hover:bg-amber-50 hover:text-amber-500",
        slate: "hover:bg-slate-50 hover:text-slate-900"
    }[config.accent];

    return (
        <main className="max-w-[1536px] mx-auto px-4 md:px-8 py-12 bg-white min-h-screen">
            <div className="flex flex-col md:flex-row gap-12">

                {/* Dynamic Sidebar */}
                <aside className="w-full md:w-72 flex-shrink-0">
                    <div className="sticky top-28 space-y-10">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
                                {config.title.split(' ')[0]} <br />
                                <span className={accentColor}>{config.title.split(' ')[1]}</span>
                            </h1>
                            <div className={`w-12 h-1.5 ${accentBg} rounded-full`}></div>
                        </div>

                        {config.sidebar.map((group, i) => (
                            <div key={i} className="space-y-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{group.title}</h4>
                                <ul className="space-y-1">
                                    {group.sub.map((item, j) => (
                                        <li key={j}>
                                            <button className={`w-full text-left py-2 px-4 rounded-xl text-sm font-bold text-slate-600 ${accentHover} transition-all flex items-center justify-between group`}>
                                                {item}
                                                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 space-y-12">
                    <header className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b-2 border-slate-50 pb-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none uppercase tracking-tighter">
                                {categoryName} <span className="text-slate-300 italic">Essential</span>
                            </h2>
                            <p className="max-w-md text-sm font-bold text-gray-400 tracking-wider mt-2 italic">
                                Refining the standard for {categoryName}'s fashion. <span className={accentColor}>{products.length}</span> pieces available.
                            </p>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {loading
                            ? Array.from(new Array(8)).map((_, index) => (
                                <div key={index} className="space-y-4 animate-pulse">
                                    <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem]"></div>
                                    <div className="h-4 bg-slate-100 rounded-full w-2/3"></div>
                                    <div className="h-4 bg-slate-50 rounded-full w-1/3"></div>
                                </div>
                            ))
                            : products.map((product) => (
                                <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
                            ))}
                    </div>

                    {/* Empty State */}
                    {!loading && products.length === 0 && (
                        <div className="py-32 text-center space-y-6">
                            <div className={`w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner`}>📦</div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Inventory Update</h3>
                            <p className="text-gray-400 font-bold max-w-xs mx-auto uppercase tracking-tighter text-[11px]">Preparing new products for this category. Stay tuned.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default CategoryPage;
