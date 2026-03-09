import React from "react";

const logos = [
    { name: "Zara", url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Zara_Logo.svg" },
    { name: "Adidas", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "Levi's", url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Levi%27s_logo.svg" },
    { name: "Fabindia", url: "https://www.vectorlogo.zone/logos/fabindia/fabindia-ar21.svg" },
    { name: "Raymond", url: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Raymond_logo.svg" },
    { name: "Puma", url: "https://upload.wikimedia.org/wikipedia/commons/d/de/Puma.svg" }
];

function Brand() {
    return (
        <section className="py-20 space-y-16 section-container">
            <div className="flex flex-col items-center text-center space-y-6 reveal">
                <div className="inline-flex items-center gap-4 px-6 py-2 bg-slate-50 border border-slate-100 rounded-full">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">Global Alliance</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tightest leading-none uppercase italic">
                    The <span className="text-indigo-600 font-light opacity-40">Featured</span> <br />
                    Network
                </h2>
                <div className="max-w-md mx-auto">
                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic uppercase tracking-tighter">
                        Collaborating with the world's most distinguished fashion houses to bring you unparalleled craft.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                {logos.map((brand, index) => (
                    <div
                        key={index}
                        className="h-40 bg-white rounded-[3rem] border border-slate-50 flex items-center justify-center p-10 transition-all duration-700 grayscale hover:grayscale-0 hover:-translate-y-4 hover:shadow-2xl hover:shadow-indigo-100 group relative overflow-hidden reveal"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        {/* Elite Accent */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <img
                            src={brand.url}
                            alt={brand.name}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                            className="relative z-10 max-w-full max-h-full object-contain filter group-hover:brightness-0 group-hover:invert-0 transition-all duration-700"
                        />
                        <span className="hidden text-xl font-black text-slate-300 uppercase tracking-widest relative z-10">{brand.name}</span>

                        {/* Subtle Glass Tag */}
                        <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 pt-12 border-t border-slate-50 text-center reveal" style={{ transitionDelay: '800ms' }}>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.8em]">Worldwide Delivery / Verified Brands</p>
            </div>
        </section>
    );
}

export default Brand;