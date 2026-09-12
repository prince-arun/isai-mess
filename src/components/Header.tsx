'use client';

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative text-center pt-3 sm:pt-6 pb-2 sm:pb-4 px-4 overflow-hidden">
      {/* Subtle ambient warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Minimalist Receipt Logo: ₹ + ♪ with thermal torn bottom */}
        <div className="mb-1.5 sm:mb-2 relative group cursor-pointer transition-transform duration-300 hover:scale-105">
          <div className="w-10 h-12 sm:w-12 sm:h-14 bg-gradient-to-b from-amber-100 to-amber-200 text-stone-900 rounded-t-md shadow-lg shadow-amber-500/10 flex flex-col items-center justify-center relative overflow-hidden border border-amber-300/40">
            {/* Rupee + Musical Note Logo */}
            <div className="flex items-center justify-center gap-0.5 font-bold">
              <span className="text-sm sm:text-base font-serif font-black text-amber-900 leading-none">₹</span>
              <span className="text-xs sm:text-sm font-sans text-amber-800 leading-none">♪</span>
            </div>
            {/* Micro receipt lines */}
            <div className="w-5 sm:w-6 h-[1.5px] bg-stone-700/30 rounded mt-1 sm:mt-1.5" />
            <div className="w-3.5 sm:w-4 h-[1.5px] bg-stone-700/30 rounded mt-0.5" />
            
            {/* Jagged bottom edge cutout */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 24 6" preserveAspectRatio="none">
                <polygon points="0,6 4,0 8,6 12,0 16,6 20,0 24,6" fill="#0c0a09" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand Name in English */}
        <div className="space-y-0.5">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-amber-100 via-amber-200 to-orange-300 bg-clip-text text-transparent uppercase font-mono leading-none">
            BILLISAI
          </h1>
          <p className="text-[11px] sm:text-xs text-stone-400 max-w-md mx-auto pt-0.5 font-medium">
            Turn your favourite albums into ridiculous hotel bills.
          </p>
        </div>

      </div>
    </header>
  );
};
