import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import CartContext from '../../context/addToCart/cartContext';
import TrailRoomContext from '../../context/trailRoom/trailRoomContext';
import WishlistContext from '../../context/addtoWishlist/wishlistContext';
import Profile from '../Profile/Profile';
import ProductSearch from '../features/ProductSearch';
import toast from 'react-hot-toast';

const Navbar = () => {
    const user = auth.currentUser;
    const { trailRoomItems } = useContext(TrailRoomContext);
    const { cart } = useContext(CartContext);
    const { wishlistItems } = useContext(WishlistContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [counts, setCounts] = useState({ trail: 0, cart: 0, wish: 0 });

    useEffect(() => {
        setCounts({
            trail: trailRoomItems ? trailRoomItems.length : 0,
            cart: cart ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0,
            wish: wishlistItems ? wishlistItems.length : 0
        });
    }, [trailRoomItems, cart, wishlistItems]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Signed out successfully. Until next time ✨");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-3xl border-b border-white/40 shadow-sm h-20 flex items-center px-10 reveal">
            <div className="w-full flex justify-between items-center max-w-[1600px] mx-auto">
                {/* Logo - Refined Architectural Font */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center transform group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 shadow-xl shadow-slate-950/20">
                        <span className="text-white font-black text-2xl font-serif italic">S</span>
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-xl font-black tracking-tighter text-slate-950 uppercase leading-none">Shop<span className="text-indigo-600">Buzz</span></span>
                        <span className="text-[8px] font-black tracking-[0.4em] text-slate-400 uppercase">Couture Elite</span>
                    </div>
                </Link>

                {/* Search - Desktop Refined */}
                <div className="hidden lg:flex flex-1 max-w-xl mx-16">
                    <div className="w-full relative group">
                        <ProductSearch />
                    </div>
                </div>

                {/* Navigation Links - Unexpected Premium Hover */}
                <div className="hidden xl:flex items-center gap-10 mr-10 relative">
                    {['men', 'women', 'children', 'footwear', 'accessories'].map((cat) => (
                        <Link
                            key={cat}
                            to={`/category/${cat}`}
                            className="relative text-[10px] font-black text-slate-500 hover:text-indigo-600 transition-all uppercase tracking-[0.3em] group"
                        >
                            {cat === 'children' ? 'Kids' : cat === 'footwear' ? 'Shoes' : cat === 'accessories' ? 'Lux' : cat}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-600 transition-all duration-500 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* Actions - Glass Accents */}
                <div className="flex items-center gap-4">

                    <Link to="/virtual-trail-room" className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all relative group shadow-sm border border-indigo-100 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-widest hidden xl:block">Virtual Room</span>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                            {counts.trail}
                        </span>
                    </Link>

                    <Link to="/wishlists" className="p-3 bg-slate-50 rounded-2xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-all relative group shadow-sm border border-slate-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                            {counts.wish}
                        </span>
                    </Link>

                    <Link to="/addToCart" className="p-3 bg-slate-950 rounded-2xl text-white hover:bg-indigo-600 transition-all relative group shadow-xl shadow-slate-950/20 active:scale-95">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-950">
                            {counts.cart}
                        </span>
                    </Link>

                    {/* Profile/Auth */}
                    <div className="hidden sm:flex pl-4 items-center">
                        {!user ? (
                            <Link
                                to="/login"
                                className="px-8 py-3 bg-indigo-600 text-white text-[10px] font-black rounded-2xl hover:bg-slate-950 transition-all shadow-xl shadow-indigo-200 uppercase tracking-widest active:scale-95"
                            >
                                LOG IN
                            </Link>
                        ) : (
                            <Profile handleLogout={handleLogout} />
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="xl:hidden p-3 bg-slate-50 rounded-2xl text-slate-500 hover:bg-indigo-50 border border-slate-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Elevated Glass */}
            {mobileMenuOpen && (
                <div className="xl:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-3xl border-b border-white/40 p-10 space-y-10 shadow-2xl animate-in slide-in-from-top-4 duration-500">
                    <ProductSearch />
                    <div className="grid grid-cols-2 gap-6">
                        {['men', 'women', 'children', 'footwear', 'accessories'].map(cat => (
                            <Link
                                key={cat}
                                to={`/category/${cat}`}
                                className="py-6 text-center bg-slate-50 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-slate-700 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                            >
                                {cat === 'children' ? 'Kids' : cat === 'footwear' ? 'Shoes' : cat === 'accessories' ? 'Lux' : cat}
                            </Link>
                        ))}
                        <Link
                            to="/virtual-trail-room"
                            className="py-6 text-center bg-indigo-50 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        >
                            Trail Room ({counts.trail})
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
