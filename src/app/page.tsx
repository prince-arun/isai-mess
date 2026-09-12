'use client';

import React, { useState, useRef } from 'react';
import { KitchenHeader } from '../components/KitchenHeader';
import { BillForm } from '../components/BillForm';
import { ReceiptPreview } from '../components/ReceiptPreview';
import { ExportControls } from '../components/ExportControls';
import { PRESETS } from '../data/presets';
import { BillData, Preset } from '../types/bill';
import { Utensils, Receipt, Sparkles, Disc3, Flame, Music, Share2, HelpCircle } from 'lucide-react';

export default function HomePage() {
  // Initialize with Roja 1992 preset as default
  const defaultPreset = PRESETS[0];

  const [bill, setBill] = useState<BillData>({
    movieTitle: defaultPreset.movieTitle,
    musicDirector: defaultPreset.musicDirector,
    director: defaultPreset.director,
    studio: defaultPreset.studio,
    label: defaultPreset.label,
    releaseDate: defaultPreset.releaseDate,
    audioSpecs: defaultPreset.audioSpecs,
    hotelName: defaultPreset.hotelName,
    hotelSubtitle: defaultPreset.hotelSubtitle,
    billNo: 'ARR-1992',
    tableNo: 'TABLE AUD-7.1',
    chefTitle: 'Isai Pudhalvan',
    tracks: defaultPreset.tracks,
    taxPercent: 5,
    tipAmount: 0,
    customFooterNote: 'Melody served hot & spicy! Visit again!',
    bgImage: defaultPreset.bgImage,
    posterOpacity: defaultPreset.posterOpacity || 0.12,
    themeStyle: 'vintage',
    showTamilText: true,
    currencySymbol: '₹',
  });

  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('preview');
  const [showDeskFrame, setShowDeskFrame] = useState<boolean>(true);

  const receiptRef = useRef<HTMLDivElement | null>(null);

  // Handle Preset selection
  const handleSelectPreset = (preset: Preset) => {
    setActivePresetId(preset.id);
    setBill((prev) => ({
      ...prev,
      movieTitle: preset.movieTitle,
      musicDirector: preset.musicDirector,
      director: preset.director,
      studio: preset.studio,
      label: preset.label,
      releaseDate: preset.releaseDate,
      audioSpecs: preset.audioSpecs,
      hotelName: preset.hotelName,
      hotelSubtitle: preset.hotelSubtitle,
      bgImage: preset.bgImage,
      posterOpacity: preset.posterOpacity || 0.12,
      tracks: preset.tracks,
      billNo: `BILL-${Math.floor(Math.random() * 900 + 100)}`,
    }));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* Header with Preset Pills */}
      <KitchenHeader
        onSelectPreset={handleSelectPreset}
        activePresetId={activePresetId}
      />

      {/* Mobile Tab Toggle Bar (Visible on mobile only) */}
      <div className="lg:hidden sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 p-2 flex gap-2">
        <button
          onClick={() => setMobileView('form')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            mobileView === 'form'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'bg-stone-950 text-stone-400 border border-stone-800'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>1. Edit Bill Details</span>
        </button>

        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            mobileView === 'preview'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'bg-stone-950 text-stone-400 border border-stone-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>2. View Thermal Bill</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Intro Tagline */}
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-amber-100 flex items-center justify-center gap-2">
            <span>இசை உணவு தயாரிப்பு மையம்</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Create ultra-authentic hotel bills for movie soundtracks. Track durations become dish prices!
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORM CONTROLS */}
          <div className={`lg:col-span-6 space-y-6 ${mobileView === 'form' ? 'block' : 'hidden lg:block'}`}>
            <BillForm bill={bill} onChange={setBill} />
          </div>

          {/* RIGHT COLUMN: LIVE THERMAL BILL PREVIEW & EXPORT */}
          <div className={`lg:col-span-6 space-y-6 ${mobileView === 'preview' ? 'block' : 'hidden lg:block'}`}>
            
            {/* Thermal Printer Slot Simulation Header */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
              
              {/* Thermal Printer Machine Head Top */}
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-3 mb-6 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>EPSON ISAI-900 THERMAL PRINTER</span>
                </div>
                <div className="text-[11px] font-mono text-amber-400/90 font-bold uppercase">
                  READY • 203 DPI
                </div>
              </div>

              {/* Receipt Canvas Container with Optional Wood Desk Framing */}
              <div className="flex justify-center items-center py-4">
                <div
                  className={`transition-all duration-300 rounded-2xl p-4 sm:p-8 ${
                    showDeskFrame
                      ? 'bg-stone-900 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] border-2 border-stone-800 shadow-2xl'
                      : 'bg-transparent'
                  }`}
                >
                  <ReceiptPreview
                    ref={receiptRef}
                    bill={bill}
                  />
                </div>
              </div>

            </div>

            {/* Export Controls Toolbar */}
            <ExportControls
              receiptRef={receiptRef}
              movieTitle={bill.movieTitle}
              showDeskFrame={showDeskFrame}
              onToggleDeskFrame={setShowDeskFrame}
            />

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-900 bg-stone-950 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Disc3 className="w-4 h-4 text-amber-500 animate-[spin_10s_linear_infinite]" />
            <span>இசை மெஸ் • Crafted with Next.js for Tamil Music Lovers</span>
          </div>
          <div>
            Built with 🔥 for high-resolution thermal receipt creation & export.
          </div>
        </div>
      </footer>

    </div>
  );
}
