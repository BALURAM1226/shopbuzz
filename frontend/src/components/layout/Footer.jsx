import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white pt-32 pb-20 relative overflow-hidden mt-32">
            {/* Artistic Mesh Background */}
            <div className="absolute inset-0 bg-mesh opacity-20"></div>

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="space-y-8 reveal">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-2xl shadow-indigo-500/10">
                                <span className="text-slate-950 font-black text-2xl font-serif italic">S</span>
                            </div>
                            <div className="flex flex-col -gap-1 text-white">
                                <span className="text-2xl font-black tracking-tighter uppercase leading-none">Shop<span className="text-indigo-500">Buzz</span></span>
                                <span className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">Couture Elite</span>
                            </div>
                        </Link>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-xs italic">
                            Redefining the digital shopping experience through neural search and bespoke curator collections.
                        </p>
                        <div className="flex gap-4">
                            {['Instagram', 'Twitter', 'Vogue'].map(social => (
                                <button key={social} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-all group">
                                    <span className="text-[8px] font-black tracking-widest uppercase opacity-60 group-hover:opacity-100">{social[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="space-y-10 reveal" style={{ transitionDelay: '100ms' }}>
                        <h4 className="text-xs font-black tracking-[0.4em] text-indigo-500 uppercase">Categories</h4>
                        <ul className="space-y-4">
                            {['Men', 'Women', 'Kids', 'Footwear', 'Accessories'].map(item => (
                                <li key={item}>
                                    <Link to={`/category/${item.toLowerCase().split(' ')[0]}`} className="text-sm font-bold text-slate-300 hover:text-white transition-colors tracking-tight">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-10 reveal" style={{ transitionDelay: '200ms' }}>
                        <h4 className="text-xs font-black tracking-[0.4em] text-indigo-500 uppercase">Store Info</h4>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Shipping Policy', 'Terms of Service', 'Support'].map(item => (
                                <li key={item} className="text-sm font-bold text-slate-400 group cursor-pointer hover:text-white transition-all">
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-indigo-600 inline-block transition-all mr-0 group-hover:mr-2"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-10 reveal" style={{ transitionDelay: '300ms' }}>
                        <h4 className="text-xs font-black tracking-[0.4em] text-indigo-500 uppercase">Newsletter</h4>
                        <p className="text-sm text-slate-400 font-medium">Join the elite circle for early drops and neural curations.</p>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="YOUR EMAIL"
                                className="w-full bg-white/5 border-b-2 border-slate-800 py-4 px-2 text-white text-xs font-black tracking-widest focus:border-indigo-600 outline-none transition-all placeholder-slate-700"
                            />
                            <button className="absolute right-0 bottom-4 text-indigo-600 font-black text-xs tracking-widest hover:text-white transition-all">JOIN</button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© 2025 SHOPBUZZ COUTURE. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-10">
                        <span className="text-[10px] font-black text-slate-700 tracking-tighter italic">NEURAL ENGINE v4.2</span>
                        <span className="text-[10px] font-black text-slate-700 tracking-tighter italic">GLOBAL RELEASE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
