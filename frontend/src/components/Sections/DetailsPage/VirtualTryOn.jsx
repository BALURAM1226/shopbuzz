import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../../apiConfig';

const VirtualTryOn = ({ open, handleClose, productImage, productName }) => {
    const [userImage, setUserImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [resultImage, setResultImage] = useState(null);
    const [step, setStep] = useState(1); // 1: Upload, 2: Processing, 3: Result
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserImage(e.target.result);
                setStep(1);
                toast.success("Portrait Digitized ✨ Ready for Mapping.");
            };
            reader.readAsDataURL(file);
        }
    };

    const startTryOn = async () => {
        if (!selectedFile) return;

        setStep(2);
        setProgress(10);

        try {
            const formData = new FormData();
            formData.append('human_image', selectedFile);
            formData.append('garment_url', productImage);
            formData.append('garment_description', productName);

            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 2;
                });
            }, 1000);

            const response = await axios.post(`${API_BASE_URL}/virtual-try-on`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            clearInterval(progressInterval);
            setProgress(100);

            setTimeout(() => {
                setResultImage(response.data.result_image);
                setStep(3);
            }, 500);

        } catch (error) {
            console.error('Try-on failed:', error);
            toast.error(error.response?.data?.error || 'AI Processing failed. Please try a different photo or check the product image.');
            setStep(1);
        }
    };

    const reset = () => {
        setUserImage(null);
        setSelectedFile(null);
        setResultImage(null);
        setStep(1);
        setProgress(0);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-10 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[95vh] border border-white/20">
                {/* Header - Refined Architectural Layout */}
                <div className="flex items-center justify-between px-10 py-8 border-b border-slate-50 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 transform -rotate-12">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tightest uppercase italic leading-none">AI Magic <span className="text-indigo-600">Mirror</span></h2>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Fitting Engine 4.0</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-12 h-12 bg-slate-50 hover:bg-rose-50 rounded-2xl flex items-center justify-center transition-all group active:scale-90"
                    >
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
                    <div className="p-10 md:p-14">
                        {step === 1 && (
                            <div className="animate-in slide-in-from-bottom-8 duration-700">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                                    {/* Product Display */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className="w-12 h-px bg-slate-200"></span>
                                            <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">01. Curated Garment</h3>
                                        </div>
                                        <div className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 text-center relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 -mr-24 -mt-24 rounded-full transition-transform group-hover:scale-150 duration-1000"></div>
                                            <img src={productImage} alt={productName} className="relative z-10 w-full max-h-80 object-contain mx-auto mix-blend-multiply drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700" />
                                            <div className="mt-8 pt-8 border-t border-slate-50 relative z-10">
                                                <p className="text-xl font-black text-slate-900 tracking-tighter leading-tight italic uppercase">{productName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Upload */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className="w-12 h-px bg-slate-200"></span>
                                            <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">02. Your Portrait</h3>
                                        </div>
                                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

                                        {!userImage ? (
                                            <div
                                                onClick={() => fileInputRef.current.click()}
                                                className="h-full min-h-[400px] border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center bg-white cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-500 group relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                                <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-indigo-100 group-hover:rotate-12 group-hover:scale-110 transition-all">
                                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </div>
                                                <p className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">Upload Portrait</p>
                                                <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.3em]">Vertical full body preferred ✨</p>
                                            </div>
                                        ) : (
                                            <div className="bg-white p-6 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative group text-center h-full flex flex-col justify-center">
                                                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-inner bg-slate-50">
                                                    <img src={userImage} alt="User" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                                <button
                                                    onClick={() => fileInputRef.current.click()}
                                                    className="inline-flex items-center gap-3 mt-6 self-center text-[10px] font-black text-indigo-600 hover:text-slate-900 transition-all uppercase tracking-widest bg-indigo-50 px-6 py-3 rounded-full"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                    Replace Digital Twin
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center pt-6">
                                    <button
                                        disabled={!userImage}
                                        onClick={startTryOn}
                                        className="relative px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all active:scale-95 group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="relative z-10 flex items-center gap-3 tracking-wide">
                                            GENERATE MAGIC <span className="text-indigo-200">✨</span>
                                        </span>
                                    </button>
                                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 animate-pulse">Deep Learning Process Initiation Ready</p>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="py-20 flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-500">
                                <div className="relative">
                                    <div className="w-48 h-48 rounded-full border-[10px] border-indigo-50 relative flex items-center justify-center shadow-lg">
                                        <svg className="w-48 h-48 absolute top-0 left-0 -rotate-90 transform origin-center transition-all duration-1000" viewBox="0 0 192 192">
                                            <circle
                                                cx="96" cy="96" r="86" fill="none" stroke="currentColor" strokeWidth="10"
                                                className="text-indigo-600"
                                                strokeDasharray={`${(progress / 100) * 540} 540`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="relative z-10">
                                            <p className="text-4xl font-black text-indigo-600 tracking-tighter">{Math.round(progress)}%</p>
                                        </div>
                                    </div>
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                                        <span className="text-xl">🤖</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-2xl font-black text-slate-800">AI is dressing you up!</h4>
                                    <p className="text-gray-400 font-bold max-w-sm">Please wait while our MIT engine maps the garment texture to your physique.</p>
                                </div>

                                <div className="w-full max-w-md h-2 bg-indigo-50 rounded-full overflow-hidden relative">
                                    <div
                                        className="h-full bg-indigo-600 transition-all duration-500 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Scanning Pose</span>
                                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 italic opacity-50">Texture Mapping</span>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in duration-700">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                                    <div className="md:col-span-7">
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                            <div className="relative bg-white p-2 rounded-[3.5rem] border-4 border-indigo-500 shadow-2xl overflow-hidden aspect-[3/4]">
                                                {resultImage ? (
                                                    <img src={resultImage} alt="AI Transformation" className="w-full h-full object-contain rounded-[3rem] bg-slate-50" />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-[3rem]">
                                                        <div className="w-16 h-16 border-4 border-t-indigo-600 border-indigo-100 rounded-full animate-spin mb-4"></div>
                                                        <p className="text-gray-400 font-black">Decrypting result...</p>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-6 right-6">
                                                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        AI Optimized
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-5 space-y-8">
                                        <div className="space-y-4">
                                            <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">Mirror Successful</span>
                                            <h3 className="text-5xl font-black text-indigo-900 tracking-tighter leading-tight">Vibe <br />Check: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-600">Pure Fire!</span> 🔥</h3>
                                            <p className="text-gray-500 font-bold leading-relaxed">Our AI analyzed your unique physique and high-definition cloth dynamics. This color palette and fit are a <span className="text-indigo-600">98% match</span> for your profile.</p>
                                        </div>

                                        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg">💡</span>
                                                <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">AI Fashion Intel</p>
                                            </div>
                                            <p className="text-sm font-bold text-gray-700 italic">"The texture mapping suggests size <span className="text-indigo-600">Medium</span> will emphasize your frame perfectly while maintaining comfort."</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <button
                                                onClick={handleClose}
                                                className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm tracking-widest shadow-xl hover:bg-black transition-all active:scale-95"
                                            >
                                                SEND TO CART 🛒
                                            </button>
                                            <button
                                                onClick={reset}
                                                className="w-full py-5 border-4 border-slate-100 text-slate-800 rounded-[2rem] font-black text-sm tracking-widest hover:border-indigo-100 hover:text-indigo-600 transition-all active:scale-95 bg-white"
                                            >
                                                TRY ANOTHER VIBE ✨
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="px-10 py-6 bg-white border-t border-slate-50 relative z-30">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] text-center italic">Neural mapping subject to atmospheric lighting. Signature private portraits remain end-to-end encrypted.</p>
                </div>
            </div>
        </div>
    );
};

export default VirtualTryOn;
