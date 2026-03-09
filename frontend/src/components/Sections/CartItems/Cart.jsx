import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartContext from '../../../context/addToCart/cartContext';
import API_BASE_URL from "../../../apiConfig";
import toast from "react-hot-toast";

const Cart = () => {
  const { setCart, cart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = useCallback(async () => {
    if (cart.length === 0) {
      setCartItems([]);
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/getCartItems`, {
        body: cart.map(item => item.id)
      });

      const detailedItems = cart.map(cartItem => {
        const product = response.data.find(p => p._id === cartItem.id);
        if (!product) return null;
        return {
          ...product,
          cartId: `${cartItem.id}-${cartItem.size}`, // unique key for UI
          selectedSize: cartItem.size,
          quantity: cartItem.quantity
        };
      }).filter(Boolean);

      setCartItems(detailedItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, [cart]);

  const removeFromCart = (productId, size) => {
    const updatedCart = cart.filter(item => !(item.id === productId && item.size === size));
    localStorage.setItem('Products_id', JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast.success("Item removed from bag.");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  if (cart.length === 0) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-48 h-48 bg-gray-50 rounded-full flex items-center justify-center mb-10 shadow-inner">
          <svg className="w-24 h-24 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Your Bag is Empty</h2>
        <p className="text-gray-400 font-bold max-w-sm text-center uppercase tracking-widest text-xs mb-10 leading-relaxed italic">
          Looks like you haven't added any items to your bag yet. Start exploring our premium products.
        </p>
        <Link
          to="/"
          className="px-12 py-5 bg-slate-900 text-white font-black rounded-[2.5rem] hover:bg-indigo-600 transition-all shadow-2xl shadow-gray-200 active:scale-95 tracking-widest uppercase text-sm"
        >
          START EXPLORING
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-[1536px] mx-auto px-4 md:px-8 py-16 bg-white min-h-screen">
      <header className="mb-16 space-y-2">
        <span className="text-indigo-600 font-black tracking-[0.4em] text-[10px] uppercase block">Shopping Bag</span>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Your <span className="opacity-40 italic">Items</span></h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left - Cart Items */}
        <div className="lg:col-span-8 space-y-6">
          {cartItems.map((item) => (
            <div key={item.cartId} className="group relative flex flex-col sm:flex-row gap-8 bg-white p-6 rounded-[3rem] border border-gray-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500">
              {/* Product Image */}
              <Link to={`/productDetails/${item._id}`} className="w-full sm:w-48 h-64 bg-gray-50 rounded-[2.5rem] overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </Link>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{item.category}</p>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{item.productName}</h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id, item.selectedSize)}
                      className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all active:scale-90 shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-400">Size: <span className="text-slate-900 font-black">{item.selectedSize}</span></span>
                    <span className="w-1.5 h-1.5 bg-slate-100 rounded-full"></span>
                    <span className="text-sm font-bold text-slate-400">Qty: <span className="text-slate-900 font-black">{item.quantity}</span></span>
                  </div>
                </div>

                <div className="flex items-baseline gap-3 mt-6">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter italic">₹{item.price}</span>
                  <span className="text-sm font-bold text-slate-200 line-through">₹{Math.floor(item.price * 1.3)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Order Summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
          <div className="p-10 bg-slate-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform"></div>

            <h2 className="text-3xl font-black tracking-tighter italic mb-8">Order <span className="opacity-40 italic">Summary</span></h2>

            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                <span>Bag Subtotal</span>
                <span className="text-white">₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                <span>Priority Shipping</span>
                <span className="text-emerald-400 uppercase tracking-widest text-xs">Complimentary</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                <span>Estimated Taxes</span>
                <span className="text-white">₹0.00</span>
              </div>

              <div className="w-full h-px bg-white/10 my-6"></div>

              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Grand Total</p>
                  <p className="text-5xl font-black tracking-tighter italic">₹{getTotalPrice()}</p>
                </div>
              </div>

              <Link to="/checkout" className="w-full py-6 mt-10 bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-black rounded-3xl transition-all shadow-xl active:scale-95 tracking-widest uppercase text-sm flex items-center justify-center gap-3">
                CHECKOUT SECURELY
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-center pt-4 italic">Encrypted Checkout • 100% Assurance</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
