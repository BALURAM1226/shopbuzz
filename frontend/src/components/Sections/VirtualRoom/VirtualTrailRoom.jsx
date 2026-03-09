import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import axios from 'axios';
import TrailRoomContext from '../../../context/trailRoom/trailRoomContext';
import API_BASE_URL from "../../../apiConfig";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CartContext from '../../../context/addToCart/cartContext';

const VirtualTrailRoom = () => {
    const { trailRoomItems, removeFromTrailRoom } = useContext(TrailRoomContext);
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [userImage, setUserImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [layeredMode, setLayeredMode] = useState(false);
    const [results, setResults] = useState([]); // [{id, resultImage}]
    const [showModal, setShowModal] = useState(false);
    const [activeResultIndex, setActiveResultIndex] = useState(0);
    const fileInputRef = useRef(null);

    // Helper functions for garment classification
    const isTop = (product) => {
        const name = product.productName.toLowerCase();
        return name.includes('shirt') || name.includes('tee') || name.includes('hoodie') ||
            name.includes('vest') || name.includes('top') || name.includes('kurta') ||
            name.includes('blazer') || name.includes('jacket');
    };

    const isBottom = (product) => {
        const name = product.productName.toLowerCase();
        return name.includes('pants') || name.includes('jeans') || name.includes('shorts') ||
            name.includes('trouser') || name.includes('cargo') || name.includes('skirt') ||
            name.includes('leggings') || name.includes('pyjama');
    };

    const getTrailRoomProducts = useCallback(async () => {
        if (trailRoomItems.length === 0) {
            setProducts([]);
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/getCartItems`, {
                body: trailRoomItems
            });
            const validProducts = response.data.filter(p => p.isVirtualTryOnEnabled !== false);
            setProducts(validProducts);
        } catch (error) {
            console.error("Error fetching trail room products:", error);
            toast.error("Failed to load your Virtual Suite. Please refresh.");
        }
    }, [trailRoomItems]);

    useEffect(() => {
        getTrailRoomProducts();
    }, [getTrailRoomProducts]);

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            if (selectedIds.length >= 3) {
                toast.error("Maximum selections reached: You can select up to 3 garments.", {
                    icon: '🔒',
                    style: { borderRadius: '1rem', background: '#333', color: '#fff' }
                });
                return;
            }
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserImage(e.target.result);
                toast.success("Portrait Uploaded ✨", { duration: 2000 });
            };
            reader.readAsDataURL(file);
        }
    };

    const startTryOnItems = async () => {
        if (!selectedFile || selectedIds.length === 0) return;

        setProcessing(true);
        setResults([]);
        const newResults = [];
        let clusterSuccess = 0;

        try {
            if (layeredMode) {
                toast.loading("Building Virtual Ensembles...", { id: "ensemble" });

                const selectedProducts = products.filter(p => selectedIds.includes(p._id));
                const tops = selectedProducts.filter(isTop);
                const bottoms = selectedProducts.filter(isBottom);

                // Enforcement: Must have both to combine
                if (tops.length === 0 || bottoms.length === 0) {
                    toast.error("Incomplete Outfit for Ensemble Mode");
                    setProcessing(false);
                    return;
                }

                // Enforcement: At least one side must be singular to generate pairwise outfits
                if (tops.length > 1 && bottoms.length > 1) {
                    toast.error("Complex Conflict: For multiple outfits, please select 1 Top + Many Bottoms OR 1 Bottom + Many Tops.");
                    setProcessing(false);
                    return;
                }

                // CASE 3 & 4 Combined: Determine the foundation and the variants
                const isSingleBottom = bottoms.length === 1;
                const foundation = isSingleBottom ? bottoms[0] : tops[0];
                const variants = isSingleBottom ? tops : bottoms;

                // Step 1: Map the Foundation
                const foundationData = new FormData();
                foundationData.append('human_image', selectedFile);
                foundationData.append('garment_url', foundation.productImage);
                foundationData.append('garment_description', foundation.productName);
                foundationData.append('category', isBottom(foundation) ? 'lower_body' : 'upper_body');

                const foundRes = await axios.post(`${API_BASE_URL}/virtual-try-on`, foundationData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                const foundationImageURL = foundRes.data.result_image;
                const blobRes = await fetch(foundationImageURL);
                const blob = await blobRes.blob();
                const foundationFile = new File([blob], 'foundation.png', { type: 'image/png' });

                // Step 2: Map each variant onto the foundation
                for (const variant of variants) {
                    const variantData = new FormData();
                    variantData.append('human_image', foundationFile);
                    variantData.append('garment_url', variant.productImage);
                    variantData.append('garment_description', variant.productName);
                    variantData.append('category', isBottom(variant) ? 'lower_body' : 'upper_body');

                    try {
                        const variantRes = await axios.post(`${API_BASE_URL}/virtual-try-on`, variantData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                        newResults.push({
                            id: `ensemble-${variant._id}`,
                            resultImage: variantRes.data.result_image,
                            name: isSingleBottom ? `${variant.productName} + ${foundation.productName}` : `${foundation.productName} + ${variant.productName}`,
                            involvedProducts: [foundation, variant]
                        });
                        clusterSuccess++;
                    } catch (err) {
                        toast.error(`Neural fail on: ${variant.productName}`);
                    }
                }
                toast.dismiss("ensemble");
            } else {
                // CASE 1 & 2: Individual Try-on
                for (const id of selectedIds) {
                    const product = products.find(p => p._id === id);
                    if (!product) continue;

                    const formData = new FormData();
                    formData.append('human_image', selectedFile);
                    formData.append('garment_url', product.productImage);
                    formData.append('garment_description', product.productName);
                    formData.append('category', isBottom(product) ? 'lower_body' : 'upper_body');

                    try {
                        const response = await axios.post(`${API_BASE_URL}/virtual-try-on`, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                        newResults.push({
                            id,
                            resultImage: response.data.result_image,
                            name: product.productName,
                            involvedProducts: [product]
                        });
                        clusterSuccess++;
                    } catch (err) {
                        toast.error(`AI Mapping failed: ${product.productName}`);
                    }
                }
            }

            setResults(newResults);
            if (clusterSuccess > 0) {
                setShowModal(true);
                setActiveResultIndex(0);
                toast.success(layeredMode ? "Ensembles materialised ✨" : `Trials complete ✨`);
            }
        } catch (error) {
            console.error("Mapping Error:", error);
            toast.error("Anatomical Mapping Conflict.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <main className="max-w-[1536px] mx-auto px-4 md:px-8 py-12 bg-white min-h-screen">
            <header className="mb-12 space-y-4">
                <div className="inline-flex items-center gap-4 px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">AI Fitting Studio</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Virtual <span className="opacity-30 italic">Trail Room</span></h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-7 space-y-10">
                    {products.length === 0 ? (
                        <div className="py-20 border-4 border-dashed border-gray-100 rounded-[3rem] text-center space-y-6">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">🧥</div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Room is empty</h3>
                            <p className="text-gray-400 font-bold max-w-xs mx-auto text-xs uppercase tracking-widest">Add products from your wishlist or the gallery to try them on virtually.</p>
                            <Link to="/" className="inline-block px-10 py-4 bg-slate-900 text-white font-black rounded-full hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-gray-200 uppercase tracking-widest text-xs">Explore Shop</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {products.map((item) => (
                                <div
                                    key={item._id}
                                    className={`relative group p-6 rounded-[3rem] border-2 transition-all duration-500 cursor-pointer overflow-hidden ${selectedIds.includes(item._id)
                                        ? 'border-indigo-600 bg-indigo-50/30'
                                        : 'border-slate-100 bg-white hover:border-indigo-200'
                                        }`}
                                    onClick={() => toggleSelect(item._id)}
                                >
                                    <div className={`absolute top-6 right-6 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedIds.includes(item._id)
                                        ? 'bg-indigo-600 border-indigo-600 text-white scale-110'
                                        : 'bg-white border-slate-200 scale-100'
                                        }`}>
                                        {selectedIds.includes(item._id) && (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="aspect-[4/5] rounded-[2rem] bg-white border border-slate-50 overflow-hidden mb-6 shadow-sm">
                                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{item.category}</p>
                                            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight line-clamp-1">{item.productName}</h3>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-black text-slate-900 tracking-tighter">₹{item.price}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(item._id);
                                                        toast.success("Added to Bag ✨");
                                                    }}
                                                    className="p-3 bg-slate-950 text-white rounded-2xl hover:bg-emerald-500 transition-all active:scale-90"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromTrailRoom(item._id);
                                                        toast.success("Removed from suite.");
                                                    }}
                                                    className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28 h-fit">
                    <div className="p-10 bg-slate-950 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 -mr-24 -mt-24 rounded-full group-hover:scale-110 transition-transform"></div>
                        <h2 className="text-3xl font-black tracking-tighter italic mb-8">AI Virtual <span className="opacity-40 italic">Fitting</span></h2>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Step 01 / Portrait Upload</h4>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                                {!userImage ? (
                                    <div
                                        onClick={() => fileInputRef.current.click()}
                                        className="h-64 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center bg-white/5 cursor-pointer hover:border-indigo-400 hover:bg-white/10 transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-black text-white px-6 text-center italic tracking-widest">UPLOAD YOUR PHOTO</p>
                                    </div>
                                ) : (
                                    <div className="relative group rounded-[2.5rem] overflow-hidden border-2 border-indigo-600 shadow-2xl">
                                        <img src={userImage} alt="User" className="w-full h-80 object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => fileInputRef.current.click()}
                                                className="px-6 py-3 bg-white text-slate-950 font-black rounded-full text-xs uppercase tracking-widest shadow-xl active:scale-95"
                                            >
                                                Change Photo
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Step 02 / Style Selection</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                                <span className="text-xl font-black text-emerald-400">{selectedIds.length}/3</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 leading-tight uppercase">ITEMS SELECTED</p>
                                        </div>
                                    </div>

                                    {selectedIds.length > 1 && (
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => {
                                                    const selectedItems = products.filter(p => selectedIds.includes(p._id));
                                                    const tops = selectedItems.filter(isTop);
                                                    const bottoms = selectedItems.filter(isBottom);

                                                    if (tops.length === 0 || bottoms.length === 0) {
                                                        toast.error("Combined Mode requires at least one Top and one Bottom.", { icon: '👔' });
                                                        return;
                                                    }

                                                    if (tops.length > 1 && bottoms.length > 1) {
                                                        toast.error("Select 1 Top + Multiple Bottoms OR 1 Bottom + Multiple Tops.", { icon: '⚠️' });
                                                        return;
                                                    }

                                                    setLayeredMode(!layeredMode);
                                                }}
                                                className={`w-full p-6 flex items-center justify-between rounded-3xl border transition-all duration-300 ${layeredMode ? 'bg-indigo-600/20 border-indigo-600/50 shadow-lg shadow-indigo-600/5' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                            >
                                                <div className="flex items-center gap-4 text-left">
                                                    <div className={`p-2.5 rounded-xl ${layeredMode ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-400'}`}>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 text-white">Combine Ensemble</p>
                                                        <p className="text-[8px] font-bold text-slate-500 uppercase italic">Create layered looks</p>
                                                    </div>
                                                </div>
                                                <div className={`w-10 h-6 rounded-full relative transition-colors ${layeredMode ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${layeredMode ? 'translate-x-4' : ''}`}></div>
                                                </div>
                                            </button>

                                            {(() => {
                                                const selectedItems = products.filter(p => selectedIds.includes(p._id));
                                                const tops = selectedItems.filter(isTop);
                                                const bottoms = selectedItems.filter(isBottom);

                                                if (tops.length === 0 || bottoms.length === 0) {
                                                    return <p className="px-6 text-[8px] font-black text-rose-400 uppercase tracking-tighter italic animate-pulse">Select both a top and a bottom to combine</p>;
                                                }
                                                if (tops.length > 1 && bottoms.length > 1) {
                                                    return <p className="px-6 text-[8px] font-black text-rose-400 uppercase tracking-tighter italic">Only 1 item allowed on one side for combining</p>;
                                                }
                                                return null;
                                            })()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={startTryOnItems}
                                disabled={!userImage || selectedIds.length === 0 || processing}
                                className={`w-full py-6 mt-10 rounded-[2.5rem] text-sm font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 relative overflow-hidden ${!userImage || selectedIds.length === 0 || processing
                                    ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] active:scale-95'
                                    }`}
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
                                        {layeredMode ? "CONSTRUCTING OUTFITS..." : "AI MAPPING..."}
                                    </>
                                ) : (
                                    <>
                                        START VIRTUAL TRIAL ✨
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {results.length > 0 && (
                        <div className="mt-8">
                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full py-4 bg-indigo-50 text-indigo-600 font-black rounded-3xl border border-indigo-100 uppercase tracking-widest text-[10px] hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                View Trial History ({results.length})
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showModal && results.length > 0 && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setShowModal(false)}></div>
                    <div className="relative w-full max-w-4xl bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
                        <div className="md:w-3/5 aspect-[3/4] md:aspect-auto bg-slate-50 relative">
                            <img src={results[activeResultIndex].resultImage} alt="Result" className="w-full h-full object-contain" />
                            {results.length > 1 && (
                                <div className="absolute inset-x-0 bottom-8 flex justify-center gap-4">
                                    {results.map((_, idx) => (
                                        <button key={idx} onClick={() => setActiveResultIndex(idx)} className={`w-3 h-3 rounded-full transition-all ${idx === activeResultIndex ? 'bg-indigo-600 w-8' : 'bg-slate-300'}`}></button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="md:w-2/5 p-10 flex flex-col">
                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Result</span>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">{layeredMode ? "Ensemble" : "Individual"}</h2>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-rose-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <h3 className="text-sm font-black text-slate-800 tracking-tight italic mb-2 italic">{results[activeResultIndex].name}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Anatomically Mapped • Couture Elite Engine</p>
                                </div>

                                {/* Products Involved with Add to Bag */}
                                <div className="space-y-4 pt-4">
                                    <p className="text-[10px] font-black text-slate-950 uppercase tracking-widest italic px-2">Masterpieces in this look:</p>
                                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                                        {results[activeResultIndex].involvedProducts?.map((product) => (
                                            <div key={product._id} className="group/item flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-3xl hover:border-indigo-100 transition-all">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 p-1">
                                                    <img src={product.productImage} alt={product.productName} className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-[10px] font-black text-slate-800 tracking-tight truncate uppercase leading-tight">{product.productName}</h4>
                                                    <p className="text-xs font-black text-indigo-600 tracking-tighter italic">₹{product.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        addToCart(product._id);
                                                        toast.success("Added to Bag ✨");
                                                    }}
                                                    className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-all active:scale-90"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-8">
                                    <button
                                        onClick={() => window.open(results[activeResultIndex].resultImage, '_blank')}
                                        className="w-full py-6 bg-slate-950 text-white font-black rounded-[2rem] hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-100 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Masterpiece
                                    </button>

                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="w-full py-5 bg-white text-slate-400 font-bold border-2 border-slate-100 rounded-[2rem] hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px]"
                                    >
                                        Return to Suite
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default VirtualTrailRoom;
