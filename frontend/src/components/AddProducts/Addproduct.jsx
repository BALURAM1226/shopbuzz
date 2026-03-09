import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';
import toast from 'react-hot-toast';

const categories = [
  { value: 'Men', label: 'Men' },
  { value: 'Women', label: 'Women' },
  { value: 'Children', label: 'Children' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Footwear', label: 'Footwear' },
];

const subCategories = [
  { value: 'Traditional', label: 'Traditional' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Formal', label: 'Formal' },
  { value: 'Premium', label: 'Premium' },
];

const Addproduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    productType: 'popular',
    productImage: '',
    color: 'Standard',
    seller: 'ShopBuzz Official',
    sellerId: 'SB' + Math.floor(Math.random() * 1000),
    isVirtualTryOnEnabled: false
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/register-products`, formData);
      toast.success('Product published successfully! ✨ Inventory synchronized.');
      setFormData({
        productName: '',
        brand: '',
        description: '',
        price: '',
        category: '',
        subCategory: '',
        productType: 'popular',
        productImage: '',
        color: 'Standard',
        seller: 'ShopBuzz Official',
        sellerId: 'SB' + Math.floor(Math.random() * 1000),
        isVirtualTryOnEnabled: false
      });
    } catch (error) {
      console.error('Error publishing product:', error);
      const errorMessage = error.response?.data?.error || 'Failed to publish product. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-[1024px] mx-auto px-4 md:px-8 py-20 bg-white min-h-screen">
      <header className="mb-16 space-y-4">
        <div className="flex items-center gap-4">
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Merchant Portal</span>
          <span className="w-12 h-px bg-slate-100"></span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Register <br /><span className="text-indigo-600">New Product</span></h1>
        <p className="text-sm font-bold text-gray-400 tracking-widest italic uppercase">Expand your digital storefront with premium inventory</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12 bg-white/50 backdrop-blur-xl rounded-[3.5rem] border border-slate-100 p-10 md:p-16 shadow-2xl relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 -mr-32 -mt-32 rounded-full"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Section 1: Basic Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Product Foundation</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Full Product Name</label>
                <input
                  type="text"
                  name="productName"
                  required
                  placeholder="e.g. Midnight Silk Smoking Jacket"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 placeholder-gray-300 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Designer / Brand</label>
                <input
                  type="text"
                  name="brand"
                  required
                  placeholder="e.g. Gucci, Armani, ShopBuzz"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 placeholder-gray-300 transition-all outline-none"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Editorial Narrative (Description)</label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  placeholder="Describe the aesthetic, craftsmanship, and fit..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2.5rem] text-sm font-bold text-slate-800 placeholder-gray-300 transition-all outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Classification */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Valuation</h3>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] ml-4">Listing Price (INR)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-8 flex items-center text-slate-400 font-black">₹</span>
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-8 py-5 bg-gray-50 border-2 border-emerald-50 focus:border-emerald-600 focus:bg-white rounded-[2rem] text-sm font-black text-slate-800 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Curation</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <select
                name="productType"
                required
                value={formData.productType}
                onChange={handleInputChange}
                className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 transition-all outline-none cursor-pointer appearance-none"
              >
                <option value="popular">Popular Selection</option>
                <option value="bestseller">Best Sellers Club</option>
                <option value="new">Fresh New Arrival</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 transition-all outline-none cursor-pointer appearance-none"
                >
                  <option value="">Main Entity</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value.toLowerCase()}>{c.label}</option>
                  ))}
                </select>
                <select
                  name="subCategory"
                  required
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  className="px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 transition-all outline-none cursor-pointer appearance-none"
                >
                  <option value="">Sub Domain</option>
                  {subCategories.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI Toggle Section */}
            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors ${formData.isVirtualTryOnEnabled ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-200 text-slate-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Enable AI Try-On</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Allow users to try this virtually</p>
                </div>
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

          {/* Section 3: Media */}
          <div className="md:col-span-2 space-y-8 pt-8 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Product Image</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Direct Image URL</label>
                <input
                  type="url"
                  name="productImage"
                  required
                  placeholder="https://cdn.boutique.com/item-01.webp"
                  value={formData.productImage}
                  onChange={handleInputChange}
                  className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 transition-all outline-none"
                />
              </div>

              {formData.productImage && (
                <div className="relative group w-full max-w-sm mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center p-4">
                    <img
                      src={formData.productImage}
                      alt="Visual Preview"
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/20">PREVIEW RENDER</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-indigo-600 transition-all shadow-2xl shadow-gray-200 active:scale-95 disabled:opacity-50 tracking-widest uppercase text-sm flex items-center justify-center gap-3 group/btn"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <>
                  ADD TO STORE
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            <p className="text-center mt-6 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] italic">Standard verification protocol will apply after publication</p>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Addproduct;
