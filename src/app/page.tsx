'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { SpotifySearch } from '../components/SpotifySearch';
import { ReceiptPreview } from '../components/ReceiptPreview';
import { ExportControls } from '../components/ExportControls';
import { CustomizeDrawer } from '../components/CustomizeDrawer';
import { PRESETS } from '../data/presets';
import { BillData, Preset, ThemeStyle } from '../types/bill';
import { getRandomJoke } from '../data/jokes';
import { Flame, Loader2, Sparkles } from 'lucide-react';

interface TrendingAlbum {
  id: string;
  name: string;
  artist: string;
  releaseDate: string;
  totalTracks: number;
  imageUrl: string;
}

export default function HomePage() {
  // Initialize with Vaaranam Aayiram and Authentic Hotel Thermal style by default
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
    themeStyle: 'authentic-thermal', // Hotel Thermal as default
    showTamilText: true,
    currencySymbol: '₹',
    maxVisibleTracks: 20,
  });

  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);
  const [isCooking, setIsCooking] = useState<boolean>(false);
  const [cookingTitle, setCookingTitle] = useState<string>('');
  const [trendingAlbums, setTrendingAlbums] = useState<TrendingAlbum[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState<boolean>(false);

  const receiptRef = useRef<HTMLDivElement | null>(null);

  // Fetch daily refreshed trending Tamil albums from Spotify API
  useEffect(() => {
    async function loadTrending() {
      try {
        setIsLoadingTrending(true);
        const res = await fetch('/api/spotify/trending');
        const data = await res.json();
        if (data.albums && data.albums.length > 0) {
          setTrendingAlbums(data.albums);
        }
      } catch (err) {
        console.error('Failed to load trending Tamil albums', err);
      } finally {
        setIsLoadingTrending(false);
      }
    }
    loadTrending();
  }, []);

  // Trigger cooking micro-reveal animation
  const triggerCookingAnimation = (title: string, callback: () => void) => {
    setCookingTitle(title);
    setIsCooking(true);
    setTimeout(() => {
      callback();
      setIsCooking(false);
    }, 400);
  };

  // Handle Preset Selection (Classic Favorites)
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

  // Handle Dynamic Trending Album Click
  const handleSelectTrendingAlbum = async (album: TrendingAlbum) => {
    setActivePresetId(album.id);
    setCookingTitle(album.name);
    setIsCooking(true);

    try {
      const res = await fetch(`/api/spotify/album?id=${album.id}`);
      const data = await res.json();

      if (data && !data.error) {
        setBill((prev) => ({
          ...prev,
          movieTitle: data.movieTitle,
          tamilTitle: data.movieTitle,
          musicDirector: data.musicDirector,
          label: data.label,
          releaseDate: data.releaseDate || '01-JAN-2024',
          hotelName: `HOTEL ${data.movieTitle.toUpperCase()}`,
          hotelSubtitle: `${data.musicDirector} Special Audio Feast`,
          bgImage: data.bgImage,
          posterOpacity: 0.14,
          tracks: data.tracks,
          closingJoke: getRandomJoke(),
          billNo: `BILL-${Math.floor(Math.random() * 900 + 100)}`,
          spotifyUrl: `https://open.spotify.com/album/${album.id}`,
        }));
      }
    } catch (err) {
      console.error('Failed to load trending album details', err);
    } finally {
      setIsCooking(false);
    }
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

  // Style templates list in re-ordered priority: Hotel Thermal is #1
  const styleTemplates: { id: ThemeStyle; label: string; icon: string }[] = [
    { id: 'authentic-thermal', label: '1. Hotel Thermal', icon: '🧾' },
    { id: 'minimal-modern', label: '2. Minimal Modern', icon: '⚪' },
    { id: 'tea-kadai', label: '3. 90s Tea Kadai', icon: '☕' },
    { id: 'premium-cinematic', label: '4. Premium Gold', icon: '👑' },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* 1. BRAND HEADER (Ultra Compact on Mobile) */}
      <Header />

      {/* 2. HERO SEARCH & TRENDING ORDERS */}
      <section className="w-full max-w-2xl mx-auto px-4 pt-1 pb-3 space-y-2.5">
        
        {/* Search Bar */}
        <SpotifySearch
          onAutoFillBill={handleAutoFillBill}
          onStartCooking={(title) => {
            setCookingTitle(title);
            setIsCooking(true);
          }}
        />

        {/* Swipeable Single-Row Trending Orders Rail */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Trending Soundtracks</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded-full font-bold border border-amber-500/30">
              Daily Refreshed
            </span>
          </div>

          {/* Horizontal scroll on mobile, wrap on desktop/tablet */}
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1.5 py-0.5 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible scroll-smooth">
            {trendingAlbums.length > 0 ? (
              trendingAlbums.map((alb) => {
                const isActive = activePresetId === alb.id;
                return (
                  <button
                    key={alb.id}
                    onClick={() => handleSelectTrendingAlbum(alb)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20 scale-105 ring-2 ring-amber-400'
                        : 'bg-stone-900/90 text-amber-200 hover:bg-stone-800 hover:text-amber-100 border border-amber-500/30'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{alb.name}</span>
                  </button>
                );
              })
            ) : (
              PRESETS.map((preset) => {
                const isActive = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20 scale-105 ring-2 ring-amber-400'
                        : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 hover:text-amber-200 border border-stone-800'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })
            )}
          </div>
        </div>

      </section>

      {/* 3. MAIN BILL SHOWCASE */}
      <main className="flex-1 max-w-xl w-full mx-auto px-3 sm:px-4 pb-12 space-y-2.5">
        
        {/* Top Bill Style Switcher Pills */}
        <div className="w-full max-w-[460px] mx-auto flex items-center justify-between gap-1 p-1 bg-stone-900/90 rounded-2xl border border-stone-800 shadow">
          {styleTemplates.map((item) => (
            <button
              key={item.id}
              onClick={() => setBill((prev) => ({ ...prev, themeStyle: item.id }))}
              className={`flex-1 py-1.5 sm:py-2 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
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
          <div className="w-full max-w-[460px] mx-auto py-16 px-6 bg-stone-900/90 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col items-center justify-center space-y-3 animate-in fade-in duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-amber-200">
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
      <section className="border-t border-stone-900 bg-stone-950/60 py-8 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
            How does it work?
          </h3>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
            <div className="p-3 bg-stone-900/40 border border-stone-900 rounded-2xl space-y-1">
              <div className="text-xl sm:text-2xl">🎵</div>
              <div className="text-[11px] sm:text-xs font-bold text-stone-200">1. Pick album</div>
              <div className="text-[9px] sm:text-[10px] text-stone-500">Search soundtrack</div>
            </div>

            <div className="p-3 bg-stone-900/40 border border-stone-900 rounded-2xl space-y-1">
              <div className="text-xl sm:text-2xl">🍽️</div>
              <div className="text-[11px] sm:text-xs font-bold text-stone-200">2. We cook</div>
              <div className="text-[9px] sm:text-[10px] text-stone-500">Track times = prices</div>
            </div>

            <div className="p-3 bg-stone-900/40 border border-stone-900 rounded-2xl space-y-1">
              <div className="text-xl sm:text-2xl">🧾</div>
              <div className="text-[11px] sm:text-xs font-bold text-stone-200">3. Download</div>
              <div className="text-[9px] sm:text-[10px] text-stone-500">Share to friends</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLEAN MINIMAL FOOTER */}
      <footer className="border-t border-stone-900/80 bg-stone-950 py-5 text-center text-xs text-stone-500 space-y-1 px-4">
        <div className="font-bold text-stone-400 font-mono tracking-wide text-sm">
          BILLISAI
        </div>
        <div>
          Made with ❤️ for Tamil & Indian music lovers.
        </div>
        <div className="text-[11px] text-stone-600 pt-0.5">
          Album data powered by Spotify.
        </div>
      </footer>

    </div>
  );
}
