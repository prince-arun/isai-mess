'use client';

import React, { useState } from 'react';
import { BillData, ThemeStyle, TrackItem } from '../types/bill';
import { SpotifySearch } from './SpotifySearch';
import {
  Utensils,
  Music,
  Plus,
  Trash2,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

interface BillFormProps {
  bill: BillData;
  onChange: (updatedBill: BillData) => void;
  onAutoFillBill: (spotifyBillData: Partial<BillData>) => void;
}

export const BillForm: React.FC<BillFormProps> = ({ bill, onChange, onAutoFillBill }) => {
  const [activeTab, setActiveTab] = useState<'dish' | 'tracks' | 'style'>('dish');

  // Input helper
  const handleTextChange = (field: keyof BillData, value: any) => {
    onChange({ ...bill, [field]: value });
  };

  // Track modification helpers
  const handleTrackChange = (index: number, field: keyof TrackItem, value: string) => {
    const newTracks = [...bill.tracks];
    newTracks[index] = { ...newTracks[index], [field]: value };
    onChange({ ...bill, tracks: newTracks });
  };

  const handleAddTrack = () => {
    const newTrack: TrackItem = {
      id: `track-${Date.now()}`,
      name: `Track ${bill.tracks.length + 1}`,
      singers: 'Singer Name',
      duration: '04:00',
      price: '4.00'
    };
    onChange({ ...bill, tracks: [...bill.tracks, newTrack] });
  };

  const handleRemoveTrack = (index: number) => {
    if (bill.tracks.length <= 1) return;
    const newTracks = bill.tracks.filter((_, i) => i !== index);
    onChange({ ...bill, tracks: newTracks });
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...bill, bgImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-4 sm:p-6 shadow-xl backdrop-blur-md text-stone-200 space-y-6">
      
      {/* SPOTIFY SEARCH BOX AT TOP OF FORM */}
      <div className="bg-stone-950/90 border border-[#1DB954]/40 rounded-xl p-3.5 space-y-2 shadow-lg">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#1DB954] uppercase tracking-wider flex items-center gap-1.5">
            <svg className="w-4 h-4 fill-current text-[#1DB954]" viewBox="0 0 24 24">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.68.471-1.037.253-2.839-1.735-6.413-2.128-10.627-1.165-.403.093-.811-.161-.904-.564-.092-.403.161-.811.564-.904 4.619-1.056 8.563-.612 11.751 1.343.357.217.47.68.253 1.037zm1.475-3.275c-.273.444-.853.585-1.296.312-3.249-1.996-8.204-2.577-12.047-1.411-.5.152-1.026-.134-1.178-.633-.152-.5.134-1.026.633-1.178 4.394-1.334 9.855-.694 13.576 1.602.443.273.584.853.312 1.296zm.126-3.414C15.228 8.441 8.8 8.235 5.121 9.35c-.615.187-1.263-.166-1.45-.781-.188-.614.167-1.263.781-1.45 4.228-1.284 11.316-1.047 15.867 1.655.553.328.736 1.044.408 1.597-.328.552-1.044.736-1.597.408z"/>
            </svg>
            <span>Search Spotify Album & Auto-Fill</span>
          </label>
          <span className="text-[10px] text-stone-400 bg-[#1DB954]/10 text-[#1DB954] px-2 py-0.5 rounded font-mono border border-[#1DB954]/30">
            Official Spotify API Connected
          </span>
        </div>
        <SpotifySearch onAutoFillBill={onAutoFillBill} />
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800/80">
        <button
          onClick={() => setActiveTab('dish')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'dish'
              ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>1. Dish & Movie</span>
        </button>

        <button
          onClick={() => setActiveTab('tracks')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'tracks'
              ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>2. Tracks ({bill.tracks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('style')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'style'
              ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>3. Bill Style</span>
        </button>
      </div>

      {/* TAB 1: DISH & MOVIE METADATA */}
      {activeTab === 'dish' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="border-b border-stone-800 pb-2 mb-3">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-4 h-4" /> Hotel & Album Details
            </h3>
            <p className="text-xs text-stone-400">Map movie details to your musical restaurant bill</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Hotel / Mess Name (Tamil or English)
              </label>
              <input
                type="text"
                value={bill.hotelName}
                onChange={(e) => handleTextChange('hotelName', e.target.value)}
                placeholder="ரோஜா இசை உணவகம்"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Hotel Subtitle / Tagline
              </label>
              <input
                type="text"
                value={bill.hotelSubtitle}
                onChange={(e) => handleTextChange('hotelSubtitle', e.target.value)}
                placeholder="Hot & Spicy Melodies Since 1992"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Movie / Album Title
              </label>
              <input
                type="text"
                value={bill.movieTitle}
                onChange={(e) => handleTextChange('movieTitle', e.target.value)}
                placeholder="Roja"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Head Chef (Music Director)
              </label>
              <input
                type="text"
                value={bill.musicDirector}
                onChange={(e) => handleTextChange('musicDirector', e.target.value)}
                placeholder="A.R. Rahman"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Cooked At (Studio)
              </label>
              <input
                type="text"
                value={bill.studio}
                onChange={(e) => handleTextChange('studio', e.target.value)}
                placeholder="Panchathan Record Inn"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Served By (Audio Label)
              </label>
              <input
                type="text"
                value={bill.label}
                onChange={(e) => handleTextChange('label', e.target.value)}
                placeholder="Lahari Music"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Cooking Date (Release Date)
              </label>
              <input
                type="text"
                value={bill.releaseDate}
                onChange={(e) => handleTextChange('releaseDate', e.target.value)}
                placeholder="15-AUG-1992"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Bill Number
              </label>
              <input
                type="text"
                value={bill.billNo}
                onChange={(e) => handleTextChange('billNo', e.target.value)}
                placeholder="BILL-001"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Table No / Audio Specs
              </label>
              <input
                type="text"
                value={bill.tableNo}
                onChange={(e) => handleTextChange('tableNo', e.target.value)}
                placeholder="TABLE AUD-7.1"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Chef Title Badge
              </label>
              <input
                type="text"
                value={bill.chefTitle}
                onChange={(e) => handleTextChange('chefTitle', e.target.value)}
                placeholder="Isai Pudhalvan"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MENU ITEMS / TRACKLIST */}
      {activeTab === 'tracks' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4" /> Menu Items (Songs & Duration)
              </h3>
              <p className="text-xs text-stone-400">Duration will be mapped as dish prices on the receipt</p>
            </div>
            <button
              onClick={handleAddTrack}
              className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-bold transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" /> Add Song
            </button>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {bill.tracks.map((track, idx) => (
              <div
                key={track.id || idx}
                className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl space-y-2 relative group hover:border-stone-700 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-950 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-800/60 shrink-0">
                    {idx + 1}
                  </span>

                  <input
                    type="text"
                    value={track.name}
                    onChange={(e) => handleTrackChange(idx, 'name', e.target.value)}
                    placeholder="Song Title (e.g. Chinna Chinna Aasai)"
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-semibold"
                  />

                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="text"
                      value={track.duration}
                      onChange={(e) => handleTrackChange(idx, 'duration', e.target.value)}
                      placeholder="04:55"
                      className="w-16 bg-stone-900 border border-stone-800 rounded-lg px-2 py-1.5 text-xs text-stone-100 font-mono text-center focus:outline-none focus:border-amber-500"
                    />

                    <button
                      onClick={() => handleRemoveTrack(idx)}
                      disabled={bill.tracks.length <= 1}
                      className="p-1.5 text-stone-500 hover:text-red-400 rounded-lg hover:bg-red-950/50 transition-colors disabled:opacity-30"
                      title="Delete Track"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pl-8">
                  <input
                    type="text"
                    value={track.singers}
                    onChange={(e) => handleTrackChange(idx, 'singers', e.target.value)}
                    placeholder="Singers / Lyricists (e.g. Minmini, Vairamuthu)"
                    className="w-full bg-stone-900/60 border border-stone-800/80 rounded-lg px-2.5 py-1 text-[11px] text-stone-400 focus:outline-none focus:border-amber-500/70"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RECEIPT STYLING & THEMING */}
      {activeTab === 'style' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="border-b border-stone-800 pb-2 mb-3">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-4 h-4" /> Receipt Paper & Branding Style
            </h3>
            <p className="text-xs text-stone-400">Select thermal paper color theme and upload poster overlay</p>
          </div>

          {/* Theme Selector Grid */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2">
              Thermal Paper Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'vintage', label: '📜 Aged Parchment', desc: 'Classic yellow thermal' },
                { id: 'blue-ink', label: '💙 Blue Thermal Ink', desc: 'Modern blue receipt' },
                { id: 'modern', label: '⚪ Minimal White', desc: 'Stark monochrome' },
                { id: 'dark-kitchen', label: '🌙 Dark Cyber Kitchen', desc: 'Neon on dark stone' },
                { id: 'golden-curry', label: '🍛 Golden Brass', desc: 'Warm curry glow' },
              ].map((themeItem) => (
                <button
                  key={themeItem.id}
                  onClick={() => handleTextChange('themeStyle', themeItem.id as ThemeStyle)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    bill.themeStyle === themeItem.id
                      ? 'border-amber-500 bg-amber-950/40 text-amber-200 font-bold ring-1 ring-amber-500'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="text-xs">{themeItem.label}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{themeItem.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Poster Image Uploader */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-stone-300">
              Movie Poster Watermark
            </label>

            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-stone-950 border border-dashed border-stone-700 rounded-xl hover:border-amber-500 transition-colors text-xs text-stone-300">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Upload Custom Poster Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {bill.bgImage && (
                <button
                  onClick={() => handleTextChange('bgImage', null)}
                  className="px-3 py-3 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-xs font-semibold hover:bg-red-900/80 transition-colors"
                >
                  Clear Poster
                </button>
              )}
            </div>

            {/* Poster Opacity Slider */}
            {bill.bgImage && (
              <div className="pt-2">
                <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
                  <span>Poster Watermark Opacity:</span>
                  <span className="text-amber-400 font-mono">{Math.round(bill.posterOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.01"
                  value={bill.posterOpacity}
                  onChange={(e) => handleTextChange('posterOpacity', parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-950 rounded-lg cursor-pointer h-2"
                />
              </div>
            )}
          </div>

          {/* Currency & Tax Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Currency Symbol
              </label>
              <select
                value={bill.currencySymbol}
                onChange={(e) => handleTextChange('currencySymbol', e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value="₹">₹ (Rupee Symbol)</option>
                <option value="ரூ.">ரூ. (Tamil Rupee)</option>
                <option value="$">$ (Dollar)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Swara GST Tax %
              </label>
              <input
                type="number"
                min="0"
                max="28"
                value={bill.taxPercent}
                onChange={(e) => handleTextChange('taxPercent', parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Melody Tip Amount
              </label>
              <input
                type="number"
                min="0"
                value={bill.tipAmount}
                onChange={(e) => handleTextChange('tipAmount', parseFloat(e.target.value) || 0)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Custom Footer Message */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Custom Receipt Footer Message
            </label>
            <input
              type="text"
              value={bill.customFooterNote}
              onChange={(e) => handleTextChange('customFooterNote', e.target.value)}
              placeholder="Melody served hot & spicy! Visit again!"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      )}

    </div>
  );
};
