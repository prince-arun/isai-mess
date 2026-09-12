'use client';

import React, { useState, useRef } from 'react';
import { Header } from '../components/Header';
import { SpotifySearch } from '../components/SpotifySearch';
import { ReceiptPreview } from '../components/ReceiptPreview';
import { ExportControls } from '../components/ExportControls';
import { CustomizeDrawer } from '../components/CustomizeDrawer';
import { PRESETS } from '../data/presets';
import { BillData, Preset, ThemeStyle } from '../types/bill';
import { Flame, Loader2 } from 'lucide-react';

export default function HomePage() {
  // Initialize with Vaaranam Aayiram
  const defaultPreset = PRESETS[0];

  const [bill, setBill] = useState<BillData>({
    movieTitle: defaultPreset.movieTitle,
    tamilTitle: defaultPreset.tamilTitle,
    musicDirector: defaultPreset.musicDirector,
    director: defaultPreset.director,
    studio: defaultPreset.studio,
    label: defaultPreset.label,
    releaseDate: defaultPreset.releaseDate,
    hotelName: defaultPreset.hotelName,
    hotelSubtitle: defaultPreset.hotelSubtitle,
    billNo: 'SPOTIFY-762',
    tableNo: 'TABLE AUD-7.1',
    chefTitle: 'Head Chef',
    tracks: defaultPreset.tracks,
    taxPercent: 5,
    tipAmount: 0,
    closingJoke: defaultPreset.closingJoke,
    bgImage: defaultPreset.bgImage,
    posterOpacity: defaultPreset.posterOpacity || 0.14,
    themeStyle: 'minimal-modern',
    showTamilText: true,
    currencySymbol: '₹',
  });

  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);
  const [isCooking, setIsCooking] = useState<boolean>(false);
  const [cookingTitle, setCookingTitle] = useState<string>('');

  const receiptRef = useRef<HTMLDivElement | null>(null);

  // Trigger cooking micro-reveal animation
  const triggerCookingAnimation = (title: string, callback: () => void) => {
    setCookingTitle(title);
    setIsCooking(true);
    setTimeout(() => {
      callback();
      setIsCooking(false);
    }, 400);
  };

  // Handle Preset Selection (Popular Orders)
  const handleSelectPreset = (preset: Preset) => {
    setActivePresetId(preset.id);
    triggerCookingAnimation(preset.movieTitle, () => {
      setBill((prev) => ({
        ...prev,
        movieTitle: preset.movieTitle,
        tamilTitle: preset.tamilTitle,
        musicDirector: preset.musicDirector,
        director: preset.director,
        studio: preset.studio,
        label: preset.label,
        releaseDate: preset.releaseDate,
        hotelName: preset.hotelName,
        hotelSubtitle: preset.hotelSubtitle,
        bgImage: preset.bgImage,
        posterOpacity: preset.posterOpacity || 0.14,
        tracks: preset.tracks,
        closingJoke: preset.closingJoke,
        billNo: `BILL-${Math.floor(Math.random() * 900 + 100)}`,
      }));
    });
  };

  // Handle Spotify Search Auto-Fill
  const handleAutoFillBill = (spotifyBillData: Partial<BillData>) => {
    setActivePresetId('');
    triggerCookingAnimation(spotifyBillData.movieTitle || 'Album', () => {
      setBill((prev) => ({
        ...prev,
        ...spotifyBillData,
      }));
    });
  };

  // Style templates list for instant switching
  const styleTemplates: { id: ThemeStyle; label: string; icon: string }[] = [
    { id: 'minimal-modern', label: '1. Minimal Modern', icon: '⚪' },
    { id: 'authentic-thermal', label: '2. Hotel Thermal', icon: '🧾' },
    { id: 'tea-kadai', label: '3. 90s Tea Kadai', icon: '☕' },
    { id: 'premium-cinematic', label: '4. Premium Gold', icon: '👑' },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* 1. BRAND HEADER */}
      <Header />

      {/* 2. HERO SEARCH & POPULAR ORDERS */}
      <section className="w-full max-w-2xl mx-auto px-4 pt-2 pb-5 space-y-3">
        
        {/* Search Bar */}
        <SpotifySearch
          onAutoFillBill={handleAutoFillBill}
          onStartCooking={(title) => {
            setCookingTitle(title);
            setIsCooking(true);
          }}
        />

        {/* Popular Orders Chips */}
        <div className="flex flex-col items-center space-y-2 pt-1">
          <span className="text-xs font-semibold text-stone-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Popular orders</span>
          </span>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20 scale-105 ring-2 ring-amber-400'
                      : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 hover:text-amber-200 border border-stone-800'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

      </section>

      {/* 3. MAIN BILL SHOWCASE */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 pb-12 space-y-3">
        
        {/* Top Bill Style Switcher Pills */}
        <div className="w-full max-w-[460px] mx-auto flex items-center justify-between gap-1 p-1 bg-stone-900/90 rounded-2xl border border-stone-800 shadow">
          {styleTemplates.map((item) => (
            <button
              key={item.id}
              onClick={() => setBill((prev) => ({ ...prev, themeStyle: item.id }))}
              className={`flex-1 py-2 px-1 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                bill.themeStyle === item.id
                  ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split('.')[1]}</span>
            </button>
          ))}
        </div>

        {/* Cooking Transition Overlay */}
        {isCooking ? (
          <div className="w-full max-w-[460px] mx-auto py-20 px-6 bg-stone-900/90 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col items-center justify-center space-y-3 animate-in fade-in duration-200 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
            </div>
            <h3 className="text-base font-bold text-amber-200">
              🍳 Cooking your bill...
            </h3>
            <p className="text-xs text-stone-400">
              Calculating dish prices from track durations for "{cookingTitle}"
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300 space-y-3">
            
            {/* Live Thermal Receipt */}
            <div className="flex justify-center items-center">
              <ReceiptPreview
                ref={receiptRef}
                bill={bill}
              />
            </div>

            {/* Download & Share Actions */}
            <ExportControls
              receiptRef={receiptRef}
              movieTitle={bill.movieTitle}
            />

            {/* Secondary Customize Drawer */}
            <CustomizeDrawer
              bill={bill}
              onChange={setBill}
            />

          </div>
        )}

      </main>

      {/* 4. HOW DOES IT WORK? SECTION */}
      <section className="border-t border-stone-900 bg-stone-950/60 py-10 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
            How does it work?
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 bg-stone-900/40 border border-stone-900 rounded-2xl space-y-1">
              <div className="text-2xl">🎵</div>
              <div className="text-xs font-bold text-stone-200">1. Pick an album</div>
              <div className="text-[10px] text-stone-500">Search any movie soundtrack</div>
            </div>

            <div className="p-3.5 bg-stone-900/40 border border-stone-900 rounded-2xl space-y-1">
              <div className="text-2xl">🍽️</div>
              <div className="text-xs font-bold text-stone-200">2. We cook bill</div>
              <div className="text-[10px] text-stone-500">Track times become dish prices</div>
            </div>

            <div className="p-3.5 bg-stone-900/40 border border-stone-900 rounded-2xl space-y-1">
              <div className="text-2xl">🧾</div>
              <div className="text-xs font-bold text-stone-200">3. Get receipt</div>
              <div className="text-[10px] text-stone-500">Download 4K & share to friends</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLEAN MINIMAL FOOTER */}
      <footer className="border-t border-stone-900/80 bg-stone-950 py-6 text-center text-xs text-stone-500 space-y-1 px-4">
        <div className="font-bold text-stone-400 font-mono tracking-wide text-sm">
          BILLISAI
        </div>
        <div>
          Made with ❤️ for Tamil & Indian music lovers.
        </div>
        <div className="text-[11px] text-stone-600 pt-1">
          Album data powered by Spotify.
        </div>
      </footer>

    </div>
  );
}
