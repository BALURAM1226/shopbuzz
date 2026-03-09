import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        toast.success("Welcome to the Club! ✨ Your account has been activated.");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-20 px-4">
      <div className="w-full max-w-xl">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100 group-hover:rotate-12 transition-transform">S</div>
            <span className="text-3xl font-black tracking-tighter text-slate-900 italic">Shop<span className="text-indigo-600">Buzz</span></span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] border border-white shadow-2xl p-10 md:p-16 relative overflow-hidden">
          {/* Abstract Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 -mr-16 -mt-16 rounded-full"></div>

          <div className="relative z-10 space-y-8">
            <header className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Join the <span className="italic font-light opacity-40 uppercase tracking-widest text-2xl">Club</span></h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest italic">Create your ShopBuzz account</p>
            </header>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-5">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-indigo-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Alexander McQueen"
                      className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 placeholder-gray-300 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-indigo-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="alex@boutique.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 placeholder-gray-300 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-4">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-indigo-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-16 pr-16 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] text-sm font-bold text-slate-800 placeholder-gray-300 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-6 flex items-center text-gray-300 hover:text-indigo-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        ) : (
                          <>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded-lg border-2 border-gray-200 text-indigo-600 focus:ring-transparent transition-all cursor-pointer" />
                  <span className="text-xs font-bold text-gray-400 italic">I accept the terms of the <span className="text-indigo-600">ShopBuzz Store</span>.</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 mt-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-indigo-600 transition-all shadow-2xl shadow-gray-200 active:scale-95 disabled:opacity-50 tracking-widest uppercase text-sm flex items-center justify-center gap-3 group/btn"
              >
                {loading ? 'Processing...' : 'Complete Registration'}
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </form>

            <div className="text-center pt-8 border-t border-slate-50">
              <p className="text-xs font-bold text-gray-400">
                Already have an account?
                <Link to="/login" className="ml-2 text-indigo-600 font-black hover:underline decoration-indigo-200 tracking-tighter">Sign In</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className="text-center mt-10 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Secure SSL Encrypted Connection Active</p>
      </div>
    </main>
  );
}