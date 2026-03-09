import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CartContext from "../../../context/addToCart/cartContext";
import ProductCard from "../../features/ProductCard";
import API_BASE_URL from "../../../apiConfig";

const PopularProducts = ({ title }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { addToCart } = useContext(CartContext);

	useEffect(() => {
		async function fetchProducts() {
			setLoading(true);
			try {
				const typeParam = title === "Featured Creations" ? "?type=featured" : title === "Latest Arrivals" ? "?type=latest" : "";
				const res = await axios.get(`${API_BASE_URL}/products${typeParam}`);
				setProducts(res.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchProducts();
	}, [title]);

	return (
		<div className="py-16 space-y-16">
			{/* Section Header */}
			<div className="flex items-end justify-between border-b border-slate-100 pb-12 reveal">
				<div className="space-y-4">
					<span className="text-indigo-600 font-black tracking-[0.6em] text-[10px] uppercase block">Featured Products</span>
					<h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tightest uppercase italic leading-none">
						{title.split(" ")[0]} <span className="font-light opacity-30 text-rose-500">{title.split(" ")[1] || "Now"}</span>
					</h2>
				</div>
				<div className="hidden md:block">
					<span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Explore our latest products</span>
				</div>
			</div>

			{/* Product Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 reveal">
				{loading
					? Array.from(new Array(5)).map((_, index) => (
						<div key={index} className="space-y-4 animate-pulse">
							<div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem]"></div>
							<div className="h-4 bg-slate-100 rounded-full w-2/3 mx-auto"></div>
							<div className="h-3 bg-slate-50 rounded-full w-1/2 mx-auto"></div>
						</div>
					))
					: products.map((product) => (
						<ProductCard key={product._id} product={product} onAddToCart={addToCart} />
					))}
			</div>

			{/* Bottom Action */}
			<div className="mt-20 flex justify-center reveal">
				<button className="btn-elite">
					VIEW ALL PRODUCTS
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</button>
			</div>
		</div>
	);
}

export default PopularProducts;
