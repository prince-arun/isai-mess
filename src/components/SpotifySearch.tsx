'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Disc, Sparkles, X, Music2 } from 'lucide-react';
import { BillData } from '../types/bill';

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
}

export const SpotifySearch: React.FC<SpotifySearchProps> = ({ onAutoFillBill }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyAlbumSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAlbumName, setSelectedAlbumName] = useState<string | null>(null);
  
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
    }, 350);

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
    setIsFetchingDetail(true);
    setSelectedAlbumName(album.name);

    try {
      const res = await fetch(`/api/spotify/album?id=${album.id}`);
      const data = await res.json();

      if (data && !data.error) {
        onAutoFillBill({
          movieTitle: data.movieTitle,
          musicDirector: data.musicDirector,
          label: data.label,
          releaseDate: data.releaseDate,
          audioSpecs: data.audioSpecs,
          hotelName: `${data.movieTitle.toUpperCase()} இசை உணவகம்`,
          hotelSubtitle: `${data.musicDirector} Special Audio Feast`,
          bgImage: data.bgImage,
          posterOpacity: 0.15,
          tracks: data.tracks,
          billNo: `SPOTIFY-${Math.floor(Math.random() * 900 + 100)}`,
        });
        setIsOpen(false);
        setQuery('');
      } else {
        alert(data.error || 'Could not load album details from Spotify.');
      }
    } catch (err) {
      console.error('Failed to fetch album details', err);
      alert('Failed to connect to Spotify API.');
    } finally {
      setIsFetchingDetail(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      
      {/* Search Bar Input Container */}
      <div className="relative flex items-center">
        {/* Spotify Green Icon Indicator */}
        <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-[#1DB954]">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.68.471-1.037.253-2.839-1.735-6.413-2.128-10.627-1.165-.403.093-.811-.161-.904-.564-.092-.403.161-.811.564-.904 4.619-1.056 8.563-.612 11.751 1.343.357.217.47.68.253 1.037zm1.475-3.275c-.273.444-.853.585-1.296.312-3.249-1.996-8.204-2.577-12.047-1.411-.5.152-1.026-.134-1.178-.633-.152-.5.134-1.026.633-1.178 4.394-1.334 9.855-.694 13.576 1.602.443.273.584.853.312 1.296zm.126-3.414C15.228 8.441 8.8 8.235 5.121 9.35c-.615.187-1.263-.166-1.45-.781-.188-.614.167-1.263.781-1.45 4.228-1.284 11.316-1.047 15.867 1.655.553.328.736 1.044.408 1.597-.328.552-1.044.736-1.597.408z"/>
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search Spotify Albums (e.g., Roja, Leo, Vaaranam Aayiram)..."
          className="w-full pl-10 pr-10 py-3 bg-stone-950/95 border-2 border-[#1DB954]/50 focus:border-[#1DB954] rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]/30 transition-all font-medium"
        />

        {/* Clear or Loading Icon */}
        <div className="absolute right-3.5 flex items-center gap-1">
          {isLoading || isFetchingDetail ? (
            <Loader2 className="w-4 h-4 text-[#1DB954] animate-spin" />
          ) : query ? (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                setIsOpen(false);
              }}
              className="text-stone-400 hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Search className="w-4 h-4 text-stone-500" />
          )}
        </div>
      </div>

      {/* Loading overlay indicator */}
      {isFetchingDetail && (
        <div className="absolute inset-x-0 -bottom-8 flex items-center justify-center gap-1.5 text-xs text-[#1DB954] font-semibold bg-stone-950/90 py-1 rounded-lg border border-[#1DB954]/40 animate-pulse">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Cooking album bill from Spotify for "{selectedAlbumName}"...</span>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-stone-900 border-2 border-[#1DB954]/60 rounded-2xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto backdrop-blur-xl animate-in fade-in duration-150">
          
          <div className="px-3.5 py-2.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#1DB954] uppercase tracking-wider flex items-center gap-1.5">
              <span>🟢 SPOTIFY SEARCH RESULTS</span>
            </span>
            <span className="text-[10px] text-stone-400">
              {results.length} albums found
            </span>
          </div>

          {isLoading ? (
            <div className="p-8 text-center space-y-2">
              <Loader2 className="w-6 h-6 text-[#1DB954] animate-spin mx-auto" />
              <p className="text-xs text-stone-400">Searching Spotify Catalog...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-xs text-stone-400 space-y-1">
              <p className="font-semibold text-stone-300">No Spotify albums found</p>
              <p className="text-[11px] text-stone-500">Try typing a movie name like "Roja Tamil", "Vaaranam Aayiram", or "Leo"</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-800/80">
              {results.map((album) => (
                <button
                  key={album.id}
                  onClick={() => handleSelectAlbum(album)}
                  disabled={isFetchingDetail}
                  className="w-full p-3 text-left hover:bg-stone-800/90 transition-colors flex items-center gap-3 group border-l-4 border-transparent hover:border-[#1DB954]"
                >
                  {/* Album Thumbnail */}
                  <div className="w-12 h-12 rounded-lg bg-stone-950 overflow-hidden shrink-0 shadow border border-stone-800 group-hover:scale-105 transition-transform">
                    {album.imageUrl ? (
                      <img
                        src={album.imageUrl}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-600">
                        <Disc className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Album Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-100 truncate group-hover:text-[#1DB954] transition-colors">
                      {album.name}
                    </h4>
                    <p className="text-xs text-stone-400 truncate flex items-center gap-1.5 mt-0.5">
                      <span className="text-amber-400 font-semibold">{album.artist}</span>
                      <span>•</span>
                      <span>{album.releaseDate.split('-')[0] || ''}</span>
                      <span>•</span>
                      <span>{album.totalTracks} Tracks</span>
                    </p>
                  </div>

                  {/* Action Pill */}
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/40 group-hover:bg-[#1DB954] group-hover:text-stone-950 transition-all shrink-0">
                    Auto-Fill Bill →
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
