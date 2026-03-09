import React from 'react';
import { Link } from 'react-router-dom';
import WishlistContext from '../../context/addtoWishlist/wishlistContext';

const ProductCard = ({ product, onAddToCart }) => {
    const { _id, productName, price, productImage, category, isVirtualTryOnEnabled } = product;
    const { addToWishlist, isInWishlist } = React.useContext(WishlistContext);
    const isSaved = isInWishlist(_id);

    return (
        <div className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all duration-700 hover:-translate-y-2 flex flex-col h-full reveal">
            {/* Wishlist Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    addToWishlist(product);
                }}
                className={`absolute top-4 right-4 z-20 p-2.5 backdrop-blur-md rounded-2xl transition-all shadow-sm active:scale-95 ${isSaved ? 'bg-rose-500 text-white' : 'bg-white/80 text-gray-400 hover:text-rose-500'}`}
            >
                <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            {/* Image Container */}
            <Link to={`/productDetails/${_id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* AI Try-On Badge (Top Left - Minimalist) */}
                {isVirtualTryOnEnabled && (
                    <div className="absolute top-3 left-3 z-20">
                        <div className="flex items-center gap-1 px-2 py-1 bg-indigo-600/90 backdrop-blur-md rounded-lg border border-indigo-400/20 shadow-lg shadow-indigo-600/10">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-[7px] font-black text-white uppercase tracking-[0.1em]">AI Try-On</span>
                        </div>
                    </div>
                )}

                {/* Sale Badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                        Limited Edition
                    </span>
                </div>

                {/* Add to Cart Overlay (Desktop) */}
                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart(_id);
                        }}
                        className="w-full py-3 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to Bag
                    </button>
                </div>
            </Link>

            {/* Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">{category}</p>
                        <Link to={`/productDetails/${_id}`}>
                            <h3 className="text-sm font-black text-slate-800 leading-tight tracking-tight line-clamp-2 hover:text-indigo-600 transition-colors">
                                {productName}
                            </h3>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-2 mt-auto">
                    <span className="text-lg font-black text-slate-900 tracking-tighter italic">₹{price}</span>
                    <span className="text-xs font-bold text-gray-300 line-through">₹{Math.floor(price * 1.3)}</span>
                    <span className="ml-auto text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-tighter">Save 25%</span>
                </div>
            </div>

            {/* Quick Add (Mobile) */}
            <div className="p-4 md:hidden border-t border-gray-50 bg-gray-50/50">
                <button
                    onClick={() => onAddToCart(_id)}
                    className="w-full py-3 bg-white border border-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm active:scale-95"
                >
                    Quick Add
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
