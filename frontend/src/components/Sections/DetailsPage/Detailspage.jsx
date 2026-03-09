import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SimpleAccordion from "./Accordion";
import PopularProducts from "../Products/PopularProducts";
import CartContext from "../../../context/addToCart/cartContext";
import TrailRoomContext from "../../../context/trailRoom/trailRoomContext";
import WishlistContext from "../../../context/addtoWishlist/wishlistContext";
import VirtualTryOn from "./VirtualTryOn";
import API_BASE_URL from "../../../apiConfig";
import toast from "react-hot-toast";

const Detailspage = () => {
	const { id } = useParams();
	const [details, setDetails] = useState(null);
	const [size, setSize] = useState('M');
	const [tryOnOpen, setTryOnOpen] = useState(false);
	const { addToCart } = useContext(CartContext);
	const { addToTrailRoom } = useContext(TrailRoomContext);
	const { addToWishlist, isInWishlist } = useContext(WishlistContext);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		async function getdetails() {
			try {
				const res = await axios.get(`${API_BASE_URL}/productDetails/${id}`);
				setDetails(res.data);
			} catch (error) {
				console.error("Error fetching product details:", error);
			}
		}
		getdetails();
	}, [id]);

	if (!details) return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="w-16 h-16 border-4 border-t-indigo-600 border-indigo-100 rounded-full animate-spin"></div>
		</div>
	);

	const handleAddToTrailRoom = () => {
		const success = addToTrailRoom(details._id);
		if (success) {
			navigate("/virtual-trail-room");
		}
	};

	return (
		<div className="bg-white min-h-screen">
			<div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10">
				<div className="flex flex-col lg:flex-row gap-16">

					{/* Left Side - Image Gallery Placeholder */}
					<div className="lg:w-[40%] flex-shrink-0">
						<div className="sticky top-28 space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
							<div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 border-2 border-white shadow-xl relative group">
								<img
									src={details.productImage}
									alt={details.productName}
									className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000"
								/>
								<div className="absolute top-8 left-8">
									<span className="px-4 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg border border-white/20">Designer Piece</span>
								</div>

								{/* Quick Actions */}
								<div className="absolute bottom-8 right-8 flex flex-col gap-3">
									<button className="p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl text-slate-800 hover:bg-white transition-all active:scale-95">
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
										</svg>
									</button>
									<button
										onClick={() => addToWishlist(details)}
										className={`p-4 backdrop-blur-md rounded-2xl shadow-xl transition-all active:scale-95 ${isInWishlist(details._id) ? 'bg-rose-500 text-white' : 'bg-white/80 text-gray-400 hover:text-rose-500'}`}
									>
										<svg className="w-6 h-6" fill={isInWishlist(details._id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - Info */}
					<div className="flex-1 space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
						<header className="space-y-4">
							<div className="flex items-center gap-4">
								<span className="text-indigo-600 font-black tracking-[0.4em] text-[10px] uppercase block">{details.category}</span>
								<span className="w-8 h-px bg-indigo-100"></span>
								<div className="flex items-center gap-1">
									<span className="text-yellow-400 text-sm">★</span>
									<span className="text-yellow-400 text-sm">★</span>
									<span className="text-yellow-400 text-sm">★</span>
									<span className="text-yellow-400 text-sm">★</span>
									<span className="text-slate-300 text-sm">★</span>
									<span className="text-slate-400 text-xs font-black ml-2 mt-0.5">(1,234)</span>
								</div>
							</div>
							<h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
								{details.productName}
							</h1>
							<div className="flex items-center gap-4">
								<span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100 italic">Authentic Premium</span>
								<span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">In Stock</span>
							</div>
						</header>

						<div className="space-y-2 group">
							<div className="flex items-baseline gap-4">
								<span className="text-4xl font-black text-indigo-600 tracking-tighter italic">₹{details.price}</span>
								<span className="text-xl font-bold text-slate-200 line-through">₹{Math.floor(details.price * 1.3)}</span>
								<span className="text-xs font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-tighter">Save 25% Today</span>
							</div>
							<p className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">Price inclusive of all global taxes and luxury assurance</p>
						</div>

						<div className="w-full h-px bg-slate-50"></div>

						{/* Size Selection */}
						<div className="space-y-6">
							<div className="flex justify-between items-center">
								<h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Select Fit Profile</h4>
								<button className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 transition-colors underline decoration-indigo-200 uppercase tracking-widest">Find Your Size</button>
							</div>
							<div className="flex flex-wrap gap-3">
								{['S', 'M', 'L', 'XL', '2XL', '3XL'].map((s) => (
									<button
										key={s}
										onClick={() => setSize(s)}
										className={`w-14 h-14 rounded-2xl font-black text-sm transition-all flex items-center justify-center border-2 uppercase tracking-tighter ${size === s
											? 'bg-slate-900 text-white border-slate-900 shadow-xl'
											: 'bg-white text-slate-400 border-slate-100 hover:border-indigo-100 hover:text-slate-600'
											}`}
									>
										{s}
									</button>
								))}
							</div>
						</div>

						{/* AI Fitting Room Trigger - Conditional */}
						{(details.isVirtualTryOnEnabled !== false) && (
							<div className="space-y-4 animate-in fade-in zoom-in-95 duration-700">
								<div className="relative group">
									<div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
									<button
										onClick={() => setTryOnOpen(true)}
										className="relative w-full py-6 bg-white border-2 border-indigo-600 rounded-[2.5rem] flex items-center justify-center gap-4 overflow-hidden group/btn transition-all active:scale-95 shadow-2xl shadow-indigo-100"
									>
										<div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
										<span className="relative z-10 flex items-center gap-3">
											<svg className="w-6 h-6 text-indigo-600 group-hover/btn:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
											<span className="text-indigo-600 group-hover/btn:text-white font-black uppercase tracking-widest text-sm transition-colors">Try on me 🪄</span>
										</span>
									</button>
								</div>

								<button
									onClick={handleAddToTrailRoom}
									className="w-full py-6 bg-slate-950 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3"
								>
									<svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
									AI Virtual Trail Room
								</button>
							</div>
						)}

						{/* Standard Buttons */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<button
								onClick={() => {
									addToCart(details._id, size);
									toast.success(`${details.productName} (Size ${size}) indexed for checkout ✨`);
									navigate("/checkout");
								}}
								className="py-5 bg-slate-900 text-white rounded-3xl font-black text-sm tracking-widest shadow-xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
								SECURE CHECKOUT
							</button>
							<button
								onClick={() => {
									addToCart(details._id, size);
									toast.success(`${details.productName} added to bag ✨`, {
										icon: '🛍️',
										style: { borderRadius: '1rem', background: '#333', color: '#fff' }
									});
								}}
								className="py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-3xl font-black text-sm tracking-widest hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
								</svg>
								ADD TO BAG
							</button>
						</div>

						{/* Shipping Info */}
						<div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-inner overflow-hidden relative">
							<div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 -mr-16 -mt-16 rounded-full"></div>
							<div className="p-4 bg-white rounded-2xl shadow-sm">
								<svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
								</svg>
							</div>
							<div className="flex-1 space-y-1">
								<h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Premium Express Delivery</h4>
								<p className="text-xs font-bold text-gray-400">Sold & certified by <span className="text-indigo-600 font-black">{details.seller || 'ShopBuzz Official'}</span>. Express 2-day priority handling included.</p>
							</div>
						</div>

						{/* Accordions */}
						<div className="space-y-4 pt-10">
							<SimpleAccordion saveExtra={true} />
							<SimpleAccordion description={details.description} />
							<SimpleAccordion returnPolicy={true} />
						</div>
					</div>
				</div>
			</div>

			{/* Similar Products */}
			<div className="max-w-[1536px] mx-auto px-4 md:px-10 py-24 border-t border-slate-50 mt-20">
				<div className="flex items-end justify-between mb-12">
					<div className="space-y-1">
						<span className="text-indigo-600 font-black tracking-[0.4em] text-[10px] uppercase block">Recommended for You</span>
						<h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Similar <span className="opacity-40 italic">Products</span></h2>
					</div>
				</div>
				<PopularProducts title="Similar Products" />
			</div>

			<VirtualTryOn
				open={tryOnOpen}
				handleClose={() => setTryOnOpen(false)}
				productImage={details.productImage}
				productName={details.productName}
			/>
		</div>
	);
};

export default Detailspage;
