'use client';

import React, { useState } from 'react';
import { BillData, ThemeStyle, TrackItem } from '../types/bill';
import { CLOSING_JOKES } from '../data/jokes';
import {
  Settings2,
  ChevronDown,
  ChevronUp,
  Palette,
  Image as ImageIcon,
  Utensils,
  Music,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface CustomizeDrawerProps {
  bill: BillData;
  onChange: (updatedBill: BillData) => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({ bill, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'style' | 'meta' | 'tracks'>('style');

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
      singers: 'Singers',
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

  const stylesList: { id: ThemeStyle; label: string; desc: string }[] = [
    { id: 'classic-hotel', label: '🍽️ Classic Hotel', desc: 'Traditional South Indian aged thermal' },
    { id: 'madurai-mess', label: '🥘 Madurai Mess', desc: 'Rustic street mess thermal ink' },
    { id: 'tea-kadai', label: '☕ Tea Kadai', desc: '1990s yellow tea-shop receipt' },
    { id: 'five-star', label: '⭐ 5-Star Hotel', desc: 'Overly serious & clean white' },
    { id: 'night-biryani', label: '🛵 Night Biryani', desc: 'Dark street food style' },
  ];

  return (
    <div className="w-full max-w-[420px] mx-auto pt-2">
      
      {/* Collapsible Toggle Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2.5 px-4 bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-amber-300 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer shadow"
      >
        <div className="flex items-center gap-2">
          <Settings2 className="w-3.5 h-3.5 text-amber-400" />
          <span>⚙ Customize Bill Details</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Expanded Customizer Panel */}
      {isOpen && (
        <div className="mt-3 p-4 sm:p-5 bg-stone-900/95 border border-stone-800 rounded-2xl shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Subtabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => setActiveTab('style')}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all ${
                activeTab === 'style' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Styles
            </button>
            <button
              onClick={() => setActiveTab('meta')}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all ${
                activeTab === 'meta' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('tracks')}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all ${
                activeTab === 'tracks' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Tracks ({bill.tracks.length})
            </button>
          </div>

          {/* TAB 1: BILL STYLES */}
          {activeTab === 'style' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1.5">
                  Select Bill Style (§23)
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {stylesList.map((styleItem) => (
                    <button
                      key={styleItem.id}
                      onClick={() => handleTextChange('themeStyle', styleItem.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        bill.themeStyle === styleItem.id
                          ? 'border-amber-500 bg-amber-950/40 text-amber-200 font-bold ring-1 ring-amber-500'
                          : 'border-stone-800 bg-stone-950/80 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-xs">{styleItem.label}</div>
                      <div className="text-[10px] text-stone-500">{styleItem.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Watermark Poster Upload */}
              <div className="pt-2 border-t border-stone-800 space-y-2">
                <label className="block text-[11px] font-semibold text-stone-300">
                  Custom Poster Artwork
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 bg-stone-950 border border-dashed border-stone-700 rounded-xl hover:border-amber-500 transition-colors text-xs text-stone-300">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upload Image</span>
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
                      className="px-2.5 py-2 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-xs font-semibold hover:bg-red-900/80"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {bill.bgImage && (
                  <div className="pt-1">
                    <div className="flex justify-between text-[11px] font-semibold text-stone-300 mb-1">
                      <span>Watermark Opacity:</span>
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
            </div>
          )}

          {/* TAB 2: METADATA & CLOSING JOKE */}
          {activeTab === 'meta' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-300 mb-1">Restaurant Name</label>
                <input
                  type="text"
                  value={bill.hotelName}
                  onChange={(e) => handleTextChange('hotelName', e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-300 mb-1">Head Chef (Composer)</label>
                <input
                  type="text"
                  value={bill.musicDirector}
                  onChange={(e) => handleTextChange('musicDirector', e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-300 mb-1">Closing Joke / Slogan</label>
                <select
                  value={bill.closingJoke}
                  onChange={(e) => handleTextChange('closingJoke', e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  {CLOSING_JOKES.map((joke, i) => (
                    <option key={i} value={joke}>{joke}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Swara GST (%)</label>
                  <input
                    type="number"
                    value={bill.taxPercent}
                    onChange={(e) => handleTextChange('taxPercent', parseFloat(e.target.value) || 0)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Melody Tip (₹)</label>
                  <input
                    type="number"
                    value={bill.tipAmount}
                    onChange={(e) => handleTextChange('tipAmount', parseFloat(e.target.value) || 0)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRACKLIST */}
          {activeTab === 'tracks' && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center pb-1">
                <span className="text-xs text-stone-400">Song duration determines price</span>
                <button
                  onClick={handleAddTrack}
                  className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-bold"
                >
                  <Plus className="w-3 h-3" /> Add Song
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {bill.tracks.map((track, idx) => (
                  <div key={track.id || idx} className="p-2.5 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-amber-400 w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={track.name}
                        onChange={(e) => handleTrackChange(idx, 'name', e.target.value)}
                        className="flex-1 bg-stone-900 border border-stone-800 rounded px-2 py-1 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="text"
                        value={track.duration}
                        onChange={(e) => handleTrackChange(idx, 'duration', e.target.value)}
                        className="w-14 bg-stone-900 border border-stone-800 rounded px-1.5 py-1 text-xs font-mono text-center text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={() => handleRemoveTrack(idx)}
                        disabled={bill.tracks.length <= 1}
                        className="text-stone-500 hover:text-red-400 disabled:opacity-30 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
