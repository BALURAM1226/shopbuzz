import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';
import toast from 'react-hot-toast';

const categories = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'children', label: 'Children' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'footwear', label: 'Footwear' },
];

const subCategories = [
    { value: 'Traditional', label: 'Traditional' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Formal', label: 'Formal' },
    { value: 'Premium', label: 'Premium' },
];

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [formData, setFormData] = useState({
        productName: '',
        brand: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        productType: 'popular',
        color: 'Standard',
        isVirtualTryOnEnabled: false,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/products`);
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setFormData({
            productName: product.productName,
            brand: product.brand,
            description: product.description,
            price: product.price,
            category: product.category,
            subCategory: product.subCategory,
            productType: product.productType || 'popular',
            productImage: product.productImage,
            color: product.color || 'Standard',
            isVirtualTryOnEnabled: product.isVirtualTryOnEnabled !== undefined ? product.isVirtualTryOnEnabled : true,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_BASE_URL}/update-product/${editingId}`, formData);
            toast.success("Masterpiece synchronized successfully! ✨");
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            toast.error("Error updating masterpiece: " + err.message);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-16 h-16 border-4 border-t-indigo-600 border-indigo-100 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <main className="max-w-[1440px] mx-auto px-6 py-20 bg-[#F8FAFC] min-h-screen">
            <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8 reveal">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="px-5 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Master Panel</span>
                        <span className="w-12 h-px bg-slate-200"></span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tightest leading-none uppercase italic">Inventory <br /><span className="text-indigo-600">Commander</span></h1>
                    <p className="text-sm font-bold text-gray-400 tracking-widest italic uppercase">Refine, curate, and evolve your global digital collection.</p>
                </div>
                <div className="text-right">
                    <span className="text-4xl font-black text-slate-200 italic">{categoryFilter === 'all' ? products.length : products.filter(p => p.category === categoryFilter).length} Items</span>
                </div>
            </header>

            {/* Edit Form (appears at top when editing) */}
            {editingId && (
                <section className="mb-24 bg-white rounded-[3.5rem] border border-indigo-100 p-10 md:p-16 shadow-2xl reveal relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 -mr-32 -mt-32 rounded-full"></div>
                    <div className="flex justify-between items-center mb-12 relative z-10">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Updating <span className="text-indigo-600">Masterpiece</span></h2>
                        <button onClick={() => setEditingId(null)} className="text-xs font-black text-rose-500 uppercase tracking-widest hover:underline">Discard Changes</button>
                    </div>

                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Product Identity</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Designer / Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Valuation (INR)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-black text-slate-800 transition-all outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select name="category" value={formData.category} onChange={handleChange} className="px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 outline-none appearance-none cursor-pointer">
                                    {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                                <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 outline-none appearance-none cursor-pointer">
                                    {subCategories.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                            </div>
                            {/* AI Toggle for Editing */}
                            <div className="flex items-center justify-between p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl transition-colors ${formData.isVirtualTryOnEnabled ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-200 text-slate-500'}`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">AI Fitting Active</h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, isVirtualTryOnEnabled: !prev.isVirtualTryOnEnabled }))}
                                    className={`w-14 h-8 rounded-full relative transition-all duration-300 ${formData.isVirtualTryOnEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${formData.isVirtualTryOnEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Visual Narrative (Image URL)</label>
                                <input
                                    type="text"
                                    name="productImage"
                                    value={formData.productImage}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Editorial Commentary</label>
                                <textarea
                                    name="description"
                                    rows="5"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2.5rem] text-sm font-bold text-slate-800 outline-none resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-6 bg-indigo-600 text-white font-black rounded-3xl hover:bg-slate-950 transition-all shadow-2xl shadow-indigo-100 uppercase tracking-widest text-sm"
                            >
                                COMMIT UPDATES
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {/* Category Filter Controls */}
            <div className="mb-12 flex flex-wrap items-center gap-4 reveal">
                <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${categoryFilter === 'all' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
                >
                    All Collections
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => setCategoryFilter(cat.value)}
                        className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${categoryFilter === cat.value ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 gap-6 reveal">
                {products
                    .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
                    .map((product) => (
                        <div key={product._id} className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-8 group hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-700">
                            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-50">
                                <img src={product.productImage} alt={product.productName} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                            </div>

                            <div className="flex-1 space-y-2 text-center md:text-left">
                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em]">{product.category}</span>
                                    <span className="text-slate-200">/</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{product.brand}</span>
                                    {product.isVirtualTryOnEnabled !== false && (
                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[8px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-1">
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 4a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zM15 4a1 1 0 112 0 1 1 0 01-2 0zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM16 10a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4 15a1 1 0 112 0 1 1 0 01-2 0zM14 15a1 1 0 112 0 1 1 0 01-2 0z" />
                                            </svg>
                                            AI Enabled
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">{product.productName}</h3>
                                <p className="text-xs text-slate-400 font-medium line-clamp-1 italic">{product.description}</p>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-3 px-6 md:border-l border-slate-100">
                                <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{product.price.toLocaleString()}</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="px-8 py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                    >
                                        Edit masterpiece
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </main>
    );
};

export default ProductManagement;
