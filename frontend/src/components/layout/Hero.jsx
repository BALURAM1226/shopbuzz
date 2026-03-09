import React, { useState, useEffect } from 'react';

const slides = [
    {
        image: "/assets/banners/luxury_mens_collection.png",
        title: "The Elite Collection",
        subtitle: "Redefining Men's Fashion.",
        desc: "Step into the world of pure sophistication. Curated tailored luxury for the modern gentleman.",
        tag: "BIG SPRING SALE"
    },
    {
        image: "/assets/banners/luxury_womens_collection.png",
        title: "Ethereal Couture",
        subtitle: "Luxury Without Limits.",
        desc: "Discover the collection that defines timeless elegance. Handcrafted silk and bespoke designs.",
        tag: "NEW SEASON DROP"
    },
    {
        image: "/assets/banners/premium_streetwear.png",
        title: "Streetwear Royalty",
        subtitle: "Urban Luxury Reimagined.",
        desc: "Exclusive designer footwear and urban essentials. Limited edition craftsmanship for the bold.",
        tag: "LIMITED EDITION"
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full min-h-[600px] md:min-h-[800px] bg-slate-950 overflow-hidden md:rounded-[4rem] group mx-auto max-w-[1536px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
            {/* Immersive Backgrounds */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-[2s] cubic-bezier(0.4, 0, 0.2, 1) ${index === currentSlide ? 'opacity-50 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-1'}`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Artistic Mesh Overlay */}
                    <div className="absolute inset-0 bg-mesh opacity-60 mix-blend-multiply"></div>
                </div>
            ))}

            {/* Cinematic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/20 to-transparent"></div>

            {/* Floating Editorial Card */}
            <div className="relative h-full flex items-center px-6 md:px-24 py-32">
                <div className="glass-premium p-10 md:p-16 rounded-[3rem] max-w-3xl space-y-8 reveal backdrop-blur-3xl shadow-amber-500/5">
                    <div className="flex items-center gap-4">
                        <span className="w-12 h-[2px] bg-indigo-600"></span>
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em]">{slides[currentSlide].tag}</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                        {slides[currentSlide].title.split(" ")[0]} <br />
                        <span className="italic font-light opacity-60 font-serif lowercase text-6xl md:text-7xl">
                            {slides[currentSlide].title.split(" ").slice(1).join(" ")}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 font-medium max-w-md leading-relaxed">
                        {slides[currentSlide].desc}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                        <button className="btn-elite">
                            SHOP THE LOOK
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    {/* Progress dots at the base of the card */}
                    <div className="flex items-center gap-6 pt-10">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`group h-1 transition-all duration-700 ${i === currentSlide ? 'w-16 bg-indigo-600' : 'w-6 bg-slate-200 hover:bg-indigo-300'}`}
                            >
                                <span className={`absolute -mt-6 text-[10px] font-black tracking-widest transition-opacity duration-500 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>0{i + 1}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Unexpected Decorative Floating Elements */}
            <div className="absolute top-[10%] right-[10%] hidden xl:block animate-pulse duration-[5000ms]">
                <div className="glass-premium p-8 rounded-[2.5rem] rotate-12 shadow-2xl border-white/60">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-black text-indigo-600 tracking-widest">AUTHENTIC</span>
                        <div className="w-16 h-16 rounded-full bg-indigo-50 border-4 border-white flex items-center justify-center">
                            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[10%] right-[30%] hidden lg:block animate-bounce duration-[8000ms]">
                <div className="glass-dark p-6 rounded-full -rotate-6">
                    <span className="text-3xl">✨</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
