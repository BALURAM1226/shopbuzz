import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Profile({ handleLogout }) {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-gray-50 transition-all border-2 border-transparent active:scale-95 group"
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
          U
        </div>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full right-0 mt-4 w-60 bg-white rounded-[2rem] shadow-2xl border border-slate-50 z-[1002] p-3 animate-in fade-in zoom-in-95 duration-300 origin-top-right max-h-[480px] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="p-3 flex items-center gap-3 border-b border-slate-50 mb-1.5">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg">U</div>
            <div>
              <h4 className="text-xs font-black text-slate-900 tracking-tight">User Account</h4>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-nowrap">Premium Member ✨</p>
            </div>
          </div>

          <div className="space-y-0.5">
            <button className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-all text-slate-600 group">
              <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-tight">My Profile</span>
            </button>

            <Link to="/order-history" onClick={() => setOpen(false)} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-all text-slate-600 group">
              <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-tight">Order History</span>
            </Link>

            <Link to="/wishlists" className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-all text-slate-600 group">
              <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-tight">Wishlist</span>
            </Link>

            <div className="h-px bg-slate-50 my-1.5"></div>

            <Link to="/manage-products" onClick={() => setOpen(false)} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-all text-slate-600 group">
              <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Admin Panel</span>
                <span className="text-[7px] font-bold text-slate-400 uppercase italic leading-none">Product Dashboard</span>
              </div>
            </Link>

            <Link to="/addProduct" onClick={() => setOpen(false)} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 transition-all text-slate-600 group">
              <div className="p-1.5 bg-emerald-50 rounded-lg border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Add Product</span>
                <span className="text-[7px] font-bold text-slate-400 uppercase italic leading-none">Sell on ShopBuzz</span>
              </div>
            </Link>

            <button className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50 transition-all text-slate-600 group">
              <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-tight">Settings</span>
            </button>

            <div className="h-px bg-slate-50 my-1.5"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50 transition-all text-rose-500 group"
            >
              <div className="p-1.5 bg-rose-100 rounded-lg group-hover:bg-rose-500 group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-tight uppercase tracking-[0.1em]">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
