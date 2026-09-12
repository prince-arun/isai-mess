'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Disc, X } from 'lucide-react';
import { BillData } from '../types/bill';
import { getRandomJoke } from '../data/jokes';

interface SpotifyAlbumSearchResult {
  id: string;
  name: string;
  artist: string;
  releaseDate: string;
  totalTracks: number;
  imageUrl: string;
}

interface SpotifySearchProps {
  onAutoFillBill: (spotifyBillData: Partial<BillData>) => void;
  onStartCooking?: (albumTitle: string) => void;
}

export const SpotifySearch: React.FC<SpotifySearchProps> = ({
  onAutoFillBill,
  onStartCooking,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyAlbumSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.albums) {
          setResults(data.albums);
        }
      } catch (err) {
        console.error('Spotify Search Error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Album Selection
  const handleSelectAlbum = async (album: SpotifyAlbumSearchResult) => {
    setIsOpen(false);
    if (onStartCooking) {
      onStartCooking(album.name);
    }

    try {
      const res = await fetch(`/api/spotify/album?id=${album.id}`);
      const data = await res.json();

      if (data && !data.error) {
        onAutoFillBill({
          movieTitle: data.movieTitle,
          tamilTitle: data.movieTitle,
          musicDirector: data.musicDirector,
          label: data.label,
          hotelName: `HOTEL ${data.movieTitle.toUpperCase()}`,
          hotelSubtitle: `${data.musicDirector} Special Audio Feast`,
          bgImage: data.bgImage,
          posterOpacity: 0.14,
          tracks: data.tracks,
          closingJoke: getRandomJoke(),
          billNo: `BILL-${Math.floor(Math.random() * 900 + 100)}`,
        });
        setQuery('');
      } else {
        alert(data.error || 'Could not load album details.');
      }
    } catch (err) {
      console.error('Failed to fetch album details', err);
      alert('Failed to connect to album service.');
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      
      {/* Centered Search Bar Input */}
      <div className="relative flex items-center">
        <div className="absolute left-4 flex items-center pointer-events-none text-amber-400">
          <Search className="w-5 h-5 opacity-90" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="🎵 Search for a movie or album (e.g., Vaaranam Aayiram, Roja, 96)..."
          className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-stone-900/90 border-2 border-stone-700 hover:border-amber-500/80 focus:border-amber-500 rounded-2xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-medium"
        />

        {/* Clear or Loading Icon */}
        <div className="absolute right-4 flex items-center">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
          ) : query ? (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                setIsOpen(false);
              }}
              className="text-stone-400 hover:text-stone-200 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Search Results Dropdown Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-stone-900/98 border border-stone-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto backdrop-blur-xl animate-in fade-in duration-150">
          {isLoading ? (
            <div className="p-6 text-center space-y-2">
              <Loader2 className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs text-stone-400 font-mono">Finding albums...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-5 text-center text-xs text-stone-400 space-y-1">
              <p className="font-semibold text-stone-300">No albums found</p>
              <p className="text-[11px] text-stone-500">Try typing a movie name like "Vaaranam Aayiram", "96", or "Roja"</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-800/80">
              {results.map((album) => (
                <button
                  key={album.id}
                  onClick={() => handleSelectAlbum(album)}
                  className="w-full p-3 text-left hover:bg-amber-950/30 transition-colors flex items-center gap-3 group border-l-4 border-transparent hover:border-amber-500"
                >
                  {/* Album Artwork Thumbnail */}
                  <div className="w-11 h-11 rounded-lg bg-stone-950 overflow-hidden shrink-0 shadow border border-stone-800 group-hover:scale-105 transition-transform">
                    {album.imageUrl ? (
                      <img
                        src={album.imageUrl}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-600">
                        <Disc className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Album Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-100 truncate group-hover:text-amber-300 transition-colors">
                      {album.name}
                    </h4>
                    <p className="text-xs text-stone-400 truncate flex items-center gap-1.5 mt-0.5">
                      <span className="text-amber-400 font-medium">{album.artist}</span>
                      <span>•</span>
                      <span>{album.releaseDate.split('-')[0] || ''}</span>
                      <span>•</span>
                      <span>{album.totalTracks} Tracks</span>
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                    Get Bill →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
