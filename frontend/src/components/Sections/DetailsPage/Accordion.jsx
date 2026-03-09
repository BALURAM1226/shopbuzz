import React, { useState } from 'react';

export default function SimpleAccordion({ description, saveExtra, returnPolicy }) {
  const [isOpen, setIsOpen] = useState(false);

  const Title = () => {
    if (description) return "PRODUCT DESCRIPTION";
    if (saveExtra) return "SAVE EXTRA WITH 3 OFFERS";
    if (returnPolicy) return "10 DAYS RETURN & EXCHANGE";
    return "";
  };

  return (
    <div className="border-b border-slate-100 overflow-hidden group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group-hover:bg-slate-50/50 px-4 rounded-2xl transition-all"
      >
        <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">{Title()}</span>
        <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 space-y-4">
          {description && (
            <p className="text-sm font-bold text-gray-500 leading-relaxed italic border-l-4 border-indigo-100 pl-4 py-1">
              {description}
            </p>
          )}

          {saveExtra && (
            <div className="space-y-3">
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1">
                <p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Welcome Offer</p>
                <p className="text-xs font-bold text-slate-700">Get ₹100 instant discount. Code: <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-md text-[10px]">NEW100</span></p>
              </div>
              <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-1">
                <p className="text-[11px] font-black text-rose-600 uppercase tracking-widest">Prepaid Special</p>
                <p className="text-xs font-bold text-slate-700">Extra 20% Cashback. Code: <span className="px-2 py-0.5 bg-rose-600 text-white rounded-md text-[10px]">NEW20</span></p>
              </div>
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1">
                <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">Mega Launch</p>
                <p className="text-xs font-bold text-slate-700">Get ₹200 instant discount. Code: <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-md text-[10px]">NEW200</span></p>
              </div>
            </div>
          )}

          {returnPolicy && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-600 italic">Easy 10-day luxury assurance swap. Exchange available on verified pincodes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}