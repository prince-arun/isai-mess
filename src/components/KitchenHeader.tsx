'use client';

import React from 'react';
import { ChefHat, Music, Flame, Sparkles, Receipt, Disc3 } from 'lucide-react';
import { PRESETS } from '../data/presets';
import { BillData, Preset } from '../types/bill';
import { SpotifySearch } from './SpotifySearch';

interface KitchenHeaderProps {
  onSelectPreset: (preset: Preset) => void;
  onAutoFillBill: (spotifyBillData: Partial<BillData>) => void;
  activePresetId?: string;
}

export const KitchenHeader: React.FC<KitchenHeaderProps> = ({
  onSelectPreset,
  onAutoFillBill,
  activePresetId,
}) => {
  return (
    <header className="relative bg-stone-900 border-b border-amber-900/40 text-amber-50 shadow-2xl overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-orange-950/50 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  <Disc3 className="w-7 h-7 text-amber-400 animate-[spin_8s_linear_infinite]" />
                  <ChefHat className="w-4 h-4 text-amber-200 absolute inset-0 m-auto" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                  இசை மெஸ் <span className="text-amber-500 font-mono text-xl sm:text-2xl font-light">| ISAI MESS</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-800/50">
                  <Flame className="w-3 h-3 text-orange-400 mr-1" /> Hot Melodies
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 flex items-center gap-1.5 mt-0.5">
                <span>The Musical Kitchen</span>
                <span>•</span>
                <span className="text-amber-400 font-serif italic">Turn Audio Albums into Hotel Bills</span>
              </p>
            </div>
          </div>

          {/* Spotify Search Bar in Header */}
          <div className="w-full lg:w-96">
            <SpotifySearch onAutoFillBill={onAutoFillBill} />
          </div>

        </div>

        {/* Quick Presets Bar */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <span className="text-xs font-semibold uppercase text-amber-400/80 whitespace-nowrap flex items-center gap-1">
            <Music className="w-3.5 h-3.5" /> Iconic Specials:
          </span>
          <div className="flex items-center gap-1.5">
            {PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700 hover:text-amber-200 border border-stone-700/50'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
};
