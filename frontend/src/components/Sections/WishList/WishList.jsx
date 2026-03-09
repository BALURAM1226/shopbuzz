import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from "../../features/ProductCard";
import WishlistContext from "../../../context/addtoWishlist/wishlistContext";
import CartContext from "../../../context/addToCart/cartContext";

export default function WishList() {
  const { wishlistItems } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-[85vh] flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-56 h-56 bg-rose-50 rounded-full flex items-center justify-center mb-10 shadow-inner group">
          <svg className="w-28 h-28 text-rose-200 group-hover:text-rose-400 group-hover:scale-110 transition-all duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 italic">Wishlist <span className="opacity-40 italic font-light">Empty</span></h2>
        <p className="text-gray-400 font-bold max-w-sm text-center uppercase tracking-widest text-[10px] mb-10 leading-relaxed italic">
          Save your favorite items here so you can easily find them later. Start exploring our collection and tap the heart icon to add items!
        </p>
        <Link
          to="/"
          className="px-12 py-5 bg-slate-900 hover:bg-rose-500 text-white font-black rounded-[2.5rem] transition-all shadow-2xl shadow-gray-200 active:scale-95 tracking-widest uppercase text-sm"
        >
          EXPLORE SHOP
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-[1536px] mx-auto px-4 md:px-10 py-20 bg-white min-h-screen space-y-20">
      <header className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-rose-500 font-black tracking-[0.5em] text-[10px] uppercase block">Saved Styles</span>
          <span className="w-12 h-px bg-rose-100"></span>
        </div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">My <br /><span className="text-rose-500">Wishlist</span></h1>
        <p className="text-sm font-bold text-gray-400 tracking-widest italic uppercase">You have <span className="text-rose-500 font-black">{wishlistItems.length}</span> signature pieces saved for later.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {wishlistItems.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
            onAddToCart={(id) => addToCart(id, 'M')}
          />
        ))}
      </div>
    </main>
  );
}
