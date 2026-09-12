'use client';

import React, { forwardRef } from 'react';
import { BillData, amountInWords } from '../types/bill';

interface ReceiptPreviewProps {
  bill: BillData;
  className?: string;
  isExporting?: boolean;
}

export const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
  ({ bill, className = '' }, ref) => {

    // Calculate totals from track durations
    const stats = React.useMemo(() => {
      let totalSeconds = 0;
      bill.tracks.forEach((track) => {
        const parts = track.duration.split(':');
        if (parts.length === 2) {
          const m = parseInt(parts[0], 10) || 0;
          const s = parseInt(parts[1], 10) || 0;
          totalSeconds += m * 60 + s;
        }
      });

      const totalMins = Math.floor(totalSeconds / 60);
      const remSecs = totalSeconds % 60;
      const formattedTotalTime = `${totalMins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
      const totalTimeWords = `${totalMins}M ${remSecs < 10 ? '0' : ''}${remSecs}S`;

      // Price mapping from duration (e.g. 05:15 = 5.15)
      const subtotal = bill.tracks.reduce((acc, track) => {
        const priceNum = parseFloat(track.price || track.duration.replace(':', '.')) || 0;
        return acc + priceNum;
      }, 0);

      const tax = (subtotal * (bill.taxPercent || 0)) / 100;
      const grandTotal = subtotal + tax + (bill.tipAmount || 0);
      const grandTotalStr = grandTotal.toFixed(2);

      return {
        formattedTotalTime,
        totalTimeWords,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        grandTotal: grandTotalStr,
        wordsTotal: amountInWords(grandTotalStr),
        itemCount: bill.tracks.length,
      };
    }, [bill.tracks, bill.taxPercent, bill.tipAmount]);

    const currency = bill.currencySymbol || '₹';

    // CSS Zig-Zag mask polygon points for guaranteed internal jagged edges without clipping
    const jaggedClipPath = `polygon(
      0% 8px, 2.5% 0px, 5% 8px, 7.5% 0px, 10% 8px, 12.5% 0px, 15% 8px, 17.5% 0px, 20% 8px, 22.5% 0px, 25% 8px, 27.5% 0px, 30% 8px, 32.5% 0px, 35% 8px, 37.5% 0px, 40% 8px, 42.5% 0px, 45% 8px, 47.5% 0px, 50% 8px, 52.5% 0px, 55% 8px, 57.5% 0px, 60% 8px, 62.5% 0px, 65% 8px, 67.5% 0px, 70% 8px, 72.5% 0px, 75% 8px, 77.5% 0px, 80% 8px, 82.5% 0px, 85% 8px, 87.5% 0px, 90% 8px, 92.5% 0px, 95% 8px, 97.5% 0px, 100% 8px,
      100% calc(100% - 8px), 97.5% 100%, 95% calc(100% - 8px), 92.5% 100%, 90% calc(100% - 8px), 87.5% 100%, 85% calc(100% - 8px), 82.5% 100%, 80% calc(100% - 8px), 77.5% 100%, 75% calc(100% - 8px), 72.5% 100%, 70% calc(100% - 8px), 67.5% 100%, 65% calc(100% - 8px), 62.5% 100%, 60% calc(100% - 8px), 57.5% 100%, 55% calc(100% - 8px), 52.5% 100%, 50% calc(100% - 8px), 47.5% 100%, 45% calc(100% - 8px), 42.5% 100%, 40% calc(100% - 8px), 37.5% 100%, 35% calc(100% - 8px), 32.5% 100%, 30% calc(100% - 8px), 27.5% 100%, 25% calc(100% - 8px), 22.5% 100%, 20% calc(100% - 8px), 17.5% 100%, 15% calc(100% - 8px), 12.5% 100%, 10% calc(100% - 8px), 7.5% 100%, 5% calc(100% - 8px), 2.5% 100%, 0% calc(100% - 8px)
    )`;

    // --------------------------------------------------------------------------
    // STYLE 1: MINIMAL MODERN (Clean & Simple)
    // --------------------------------------------------------------------------
    if (bill.themeStyle === 'minimal-modern') {
      return (
        <div
          ref={ref}
          id="receipt-print-node"
          className={`relative w-full max-w-[480px] mx-auto bg-[#fafafa] text-[#171717] shadow-2xl p-7 sm:p-8 font-mono select-none border border-stone-200 transition-all ${className}`}
          style={{
            clipPath: jaggedClipPath,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          }}
        >
          {/* Watermark Poster */}
          {bill.bgImage && (
            <div className="absolute inset-0 pointer-events-none bg-center bg-cover bg-no-repeat opacity-[0.10] mix-blend-multiply" style={{ backgroundImage: `url(${bill.bgImage})` }} />
          )}

          {/* Header */}
          <div className="relative z-10 pb-3 border-b-2 border-stone-900">
            <div className="flex justify-between items-start text-[10px] uppercase tracking-wider text-stone-500 font-sans font-bold">
              <div className="text-left leading-tight">GOOD MUSIC<br />ALWAYS PAYS OFF</div>
              <div className="text-right leading-tight">ORDER MUSIC<br />REPEAT :)</div>
            </div>

            <div className="text-center pt-2 space-y-0.5">
              <div className="inline-flex items-center justify-center gap-1">
                <span className="text-2xl font-black tracking-widest font-mono">BILLISAI</span>
                <span className="text-xs font-bold font-sans">TM</span>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-semibold text-stone-600">SONGS SERVED FRESH</div>
            </div>

            <div className="text-center pt-3 space-y-0.5">
              <h2 className="text-lg sm:text-xl font-black tracking-wider uppercase font-mono">
                HOTEL {bill.movieTitle.toUpperCase()}
              </h2>
              <p className="text-[11px] font-bold text-stone-600 tracking-wide uppercase">
                "A {bill.musicDirector.toUpperCase()} SPECIAL"
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="relative z-10 py-3 text-[11px] space-y-1 border-b border-stone-400">
            <div className="flex justify-between">
              <span className="text-stone-500 uppercase font-semibold">COMPOSER</span>
              <span className="font-bold text-stone-900">: {bill.musicDirector}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 uppercase font-semibold">STUDIO</span>
              <span className="font-bold text-stone-900 truncate max-w-[270px] text-right">: {bill.studio}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 uppercase font-semibold">LABEL</span>
              <span className="font-bold text-stone-900 truncate max-w-[270px] text-right">: {bill.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 uppercase font-semibold">RELEASED</span>
              <span className="font-bold text-stone-900">: {bill.releaseDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 uppercase font-semibold">CUISINE</span>
              <span className="font-bold text-stone-900 truncate max-w-[270px] text-right">: Feel Good • Romantic • Youth Special</span>
            </div>
          </div>

          {/* Item Table */}
          <div className="relative z-10 py-3 text-xs">
            <div className="flex justify-between pb-1 font-bold border-b border-stone-900 uppercase text-[11px]">
              <div className="w-8">#</div>
              <div className="flex-1 px-1">SONG NAME</div>
              <div className="w-16 text-center">DUR</div>
              <div className="w-20 text-right">AMOUNT ({currency})</div>
            </div>

            <div className="space-y-1.5 pt-2">
              {bill.tracks.map((t, idx) => (
                <div key={t.id || idx} className="flex justify-between items-center text-[11px] leading-tight">
                  <div className="w-8 opacity-70 font-semibold">{idx + 1}</div>
                  <div className="flex-1 px-1 font-bold uppercase truncate">{t.name}</div>
                  <div className="w-16 text-center font-semibold text-stone-700">{t.duration}</div>
                  <div className="w-20 text-right font-bold">{t.price || t.duration.replace(':', '.')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="relative z-10 pt-2 pb-3 text-xs space-y-1 border-t-2 border-dashed border-stone-800">
            <div className="flex justify-between items-center text-[11px] font-bold text-stone-700">
              <span>TOTAL SONGS: {stats.itemCount}</span>
              <span>TOTAL DURATION: {stats.formattedTotalTime}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] pt-1">
              <span className="text-stone-600 uppercase">SUBTOTAL</span>
              <span className="font-bold">{currency}{stats.subtotal}</span>
            </div>
            {bill.taxPercent > 0 && (
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-stone-600 uppercase">SWARA GST ({bill.taxPercent}%)</span>
                <span className="font-bold">{currency}{stats.tax}</span>
              </div>
            )}

            <div className="pt-2">
              <div className="p-3 border-2 border-stone-900 flex justify-between items-center bg-stone-100">
                <span className="text-sm font-black uppercase tracking-wider">TOTAL AMOUNT</span>
                <span className="text-2xl font-black">{currency}{stats.grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 pt-3 text-center space-y-2">
            <p className="text-[10px] tracking-wider uppercase font-bold text-stone-600">
              *** THANK YOU FOR LISTENING ***
            </p>
            <p className="text-[11px] italic font-serif text-stone-700">
              "{bill.closingJoke || 'Some songs stay forever.'}"
            </p>

            {/* Barcode */}
            <div className="flex flex-col items-center justify-center pt-1">
              <div className="h-8 w-4/5 max-w-[220px] flex items-stretch justify-center gap-[2px] opacity-90">
                {[3,1,2,4,1,3,2,1,4,2,1,3,1,2,4,1,2,3,1,4,2,1,3,2,1,4,2,1,3].map((w, i) => (
                  <div key={i} className="bg-stone-900 h-full" style={{ width: `${w * 2}px` }} />
                ))}
              </div>
              <div className="text-[9px] tracking-widest mt-1 opacity-70">
                * {bill.movieTitle.toUpperCase()} - {bill.releaseDate.split('-').pop() || '2008'} *
              </div>
            </div>
          </div>
        </div>
      );
    }

    // --------------------------------------------------------------------------
    // STYLE 2: AUTHENTIC HOTEL THERMAL (Realistic & Nostalgic)
    // --------------------------------------------------------------------------
    if (bill.themeStyle === 'authentic-thermal') {
      return (
        <div
          ref={ref}
          id="receipt-print-node"
          className={`relative w-full max-w-[480px] mx-auto bg-[#eef1f4] text-[#1a202c] shadow-2xl p-7 sm:p-8 font-mono select-none border border-stone-300 transition-all ${className}`}
          style={{
            clipPath: jaggedClipPath,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Watermark Poster */}
          {bill.bgImage && (
            <div className="absolute inset-0 pointer-events-none bg-center bg-cover bg-no-repeat opacity-[0.10] mix-blend-multiply" style={{ backgroundImage: `url(${bill.bgImage})` }} />
          )}

          {/* Top Restaurant Header with Classic Double Oval Logo */}
          <div className="relative z-10 text-center pb-3 border-b border-dashed border-stone-600">
            <div className="flex justify-between items-center text-[10px] text-stone-600 font-bold tracking-wider">
              <span>ESTD 2008</span>
              <span>MUSIC MEALS MEMORIES</span>
            </div>

            {/* Oval Mess Badge */}
            <div className="my-2 inline-block px-8 py-2 border-2 border-stone-800 rounded-[50px] text-center">
              <div className="text-xl font-black tracking-widest uppercase font-mono">BILLISAI</div>
              <div className="text-[10px] font-bold tracking-wider">MUSIC RESTAURANT</div>
            </div>

            <div className="text-[10px] text-stone-600 space-y-0.5">
              <div>No.7, Melody Street, Chennai - 600 028</div>
              <div>Phone: 044-ISAI-2008 • GSTIN: 33ISAI9988Z1</div>
            </div>
          </div>

          {/* Order Details */}
          <div className="relative z-10 py-2.5 text-[11px] space-y-1 border-b border-dashed border-stone-600">
            <div className="flex justify-between">
              <span>BILL NO : <strong>{bill.billNo || '000762'}</strong></span>
              <span className="font-bold">DINE-IN</span>
            </div>
            <div className="flex justify-between">
              <span>DATE : {bill.releaseDate}</span>
              <span>TIME: 08:30</span>
            </div>
            <div className="flex justify-between">
              <span>WAITER : ISAI KUMAR</span>
              <span>TABLE: AUD-7</span>
            </div>
          </div>

          {/* Hotel & Album Title */}
          <div className="relative z-10 py-2 text-center border-b border-dashed border-stone-600">
            <h2 className="text-base sm:text-lg font-black tracking-wider uppercase">
              HOTEL {bill.movieTitle.toUpperCase()}
            </h2>
            <p className="text-[11px] font-bold text-stone-700 uppercase">
              {bill.musicDirector.toUpperCase()} SPL. MEALS
            </p>
          </div>

          {/* Items Table */}
          <div className="relative z-10 py-2 text-xs">
            <div className="flex justify-between pb-1 font-bold border-b border-stone-800 text-[11px]">
              <div className="w-8">QTY</div>
              <div className="flex-1 px-1">ITEM</div>
              <div className="w-16 text-center">TIME</div>
              <div className="w-20 text-right">AMT({currency})</div>
            </div>

            <div className="space-y-1.5 pt-1.5 text-[11px]">
              {bill.tracks.map((t, idx) => (
                <div key={t.id || idx} className="flex justify-between items-center">
                  <div className="w-8 text-stone-600 font-semibold">1</div>
                  <div className="flex-1 px-1 font-bold uppercase truncate">{t.name}</div>
                  <div className="w-16 text-center text-stone-700">{t.duration}</div>
                  <div className="w-20 text-right font-bold">{t.price || t.duration.replace(':', '.')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="relative z-10 pt-2 pb-2 text-xs space-y-1 border-t border-dashed border-stone-600">
            <div className="flex justify-between text-[11px] font-bold">
              <span>ITEMS : {stats.itemCount}</span>
              <span>DURATION: {stats.formattedTotalTime}</span>
            </div>
            <div className="flex justify-between text-[11px] pt-1">
              <span>SUBTOTAL</span>
              <span className="font-bold">{stats.subtotal}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>SWARA GST 5%</span>
              <span className="font-bold">{stats.tax}</span>
            </div>

            <div className="pt-2 border-t-2 border-stone-900 flex justify-between items-center">
              <span className="text-base font-black uppercase">TOTAL</span>
              <span className="text-2xl font-black">{currency}{stats.grandTotal}</span>
            </div>
            <div className="text-[10px] text-stone-600 italic text-center pt-0.5 font-bold">
              {stats.wordsTotal}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 pt-3 text-center space-y-1 text-[11px]">
            <p className="font-bold italic">
              "{bill.closingJoke || 'Songs are served hot. Memories are free!'}"
            </p>
            <p className="text-[10px] text-stone-600 font-bold uppercase pt-1">
              Visit Again for More Melodies!
            </p>
          </div>
        </div>
      );
    }

    // --------------------------------------------------------------------------
    // STYLE 3: 90s TEA-KADAI STYLE (Fun & Playful)
    // --------------------------------------------------------------------------
    if (bill.themeStyle === 'tea-kadai') {
      return (
        <div
          ref={ref}
          id="receipt-print-node"
          className={`relative w-full max-w-[480px] mx-auto bg-[#fef3c7] text-[#14532d] shadow-2xl p-7 sm:p-8 font-mono select-none border-2 border-[#b91c1c]/40 transition-all ${className}`}
          style={{
            clipPath: jaggedClipPath,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
            backgroundImage: 'radial-gradient(#d97706 0.5px, transparent 0.5px)',
            backgroundSize: '12px 12px'
          }}
        >
          {/* Watermark Poster */}
          {bill.bgImage && (
            <div className="absolute inset-0 pointer-events-none bg-center bg-cover bg-no-repeat opacity-[0.12] mix-blend-multiply" style={{ backgroundImage: `url(${bill.bgImage})` }} />
          )}

          {/* Top Tea Glass Illustration & Quote */}
          <div className="relative z-10 text-center pb-2">
            <div className="text-xl">☕</div>
            <p className="text-[11px] font-bold text-[#b91c1c] italic">
              "Tea with a song is all you need!"
            </p>

            {/* Red Rubber Stamp Box Logo */}
            <div className="my-2 p-2 border-2 border-[#b91c1c] rounded-lg inline-block bg-[#fee2e2]/60 transform -rotate-1 shadow-sm">
              <div className="text-xl font-black tracking-widest text-[#b91c1c] uppercase">
                ♫ BILLISAI TEA KADAI ♬
              </div>
              <div className="text-[10px] font-bold text-[#15803d]">SONGS & SNACKS SERVED FRESH</div>
            </div>
          </div>

          {/* Movie Header */}
          <div className="relative z-10 py-2 text-center border-y-2 border-dashed border-[#b91c1c]/50">
            <h2 className="text-lg sm:text-xl font-black text-[#15803d] tracking-wider uppercase">
              HOTEL {bill.movieTitle.toUpperCase()}
            </h2>
            <p className="text-xs font-bold text-[#b91c1c]">
              {bill.musicDirector} Special
            </p>
          </div>

          {/* Metadata */}
          <div className="relative z-10 py-2 text-[11px] text-[#15803d] font-semibold space-y-0.5">
            <div className="flex justify-between">
              <span>Bill No : {bill.billNo || '2008'}</span>
              <span>Table : Tea Kadai - 1</span>
            </div>
            <div className="flex justify-between">
              <span>Date : {bill.releaseDate}</span>
              <span>Time : 08:30 AM</span>
            </div>
            <div className="flex justify-between text-[#b91c1c]">
              <span>Served By : Master (Music)</span>
              <span>Good Friends :)</span>
            </div>
          </div>

          {/* Table */}
          <div className="relative z-10 py-2 text-xs">
            <div className="flex justify-between pb-1 font-bold text-[#b91c1c] border-b border-[#b91c1c] text-[11px]">
              <div className="w-8">#</div>
              <div className="flex-1 px-1">Song Name</div>
              <div className="w-16 text-center">Time</div>
              <div className="w-20 text-right">Amt({currency})</div>
            </div>

            <div className="space-y-1.5 pt-1.5 text-[11px] font-semibold">
              {bill.tracks.map((t, idx) => (
                <div key={t.id || idx} className="flex justify-between items-center">
                  <div className="w-8 text-[#b91c1c]">{idx + 1}</div>
                  <div className="flex-1 px-1 text-[#15803d] font-bold uppercase truncate">{t.name}</div>
                  <div className="w-16 text-center text-[#b91c1c]">{t.duration}</div>
                  <div className="w-20 text-right text-[#15803d] font-bold">{t.price || t.duration.replace(':', '.')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals with Red Stamp Box */}
          <div className="relative z-10 pt-2 pb-2 text-xs space-y-1 border-t border-dashed border-[#b91c1c]/50">
            <div className="flex justify-between text-[11px] font-bold text-[#b91c1c]">
              <span>Songs: {stats.itemCount}</span>
              <span>Total Time: {stats.formattedTotalTime}</span>
            </div>
            <div className="flex justify-between text-[11px] text-[#15803d]">
              <span>Subtotal</span>
              <span className="font-bold">{stats.subtotal}</span>
            </div>
            <div className="flex justify-between text-[11px] text-[#15803d]">
              <span>Swara GST (5%)</span>
              <span className="font-bold">{stats.tax}</span>
            </div>

            {/* Red Rubber Stamp Box Total */}
            <div className="my-2 p-2.5 border-4 border-[#b91c1c] rounded-xl flex justify-between items-center bg-[#fee2e2]/70 transform rotate-1 shadow">
              <span className="text-base font-black text-[#b91c1c] uppercase tracking-wider">TOTAL</span>
              <span className="text-2xl font-black text-[#b91c1c]">{currency}{stats.grandTotal}</span>
            </div>
          </div>

          {/* Footer with Circular Stamp & Nandri Note */}
          <div className="relative z-10 pt-2 flex items-center justify-between">
            {/* Rubber Stamp Badge */}
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#b91c1c] text-[#b91c1c] flex flex-col items-center justify-center text-center p-1 text-[8px] font-bold transform -rotate-12">
              <span>★</span>
              <span>MUSIC MAKES LIFE BETTER</span>
              <span>★</span>
            </div>

            {/* Nandri handwritten script */}
            <div className="text-right">
              <div className="text-sm font-serif italic font-black text-[#15803d]">Nandri!</div>
              <div className="text-[11px] font-serif italic text-[#b91c1c]">Keep Listening! ❤️</div>
            </div>
          </div>
        </div>
      );
    }

    // --------------------------------------------------------------------------
    // STYLE 4: PREMIUM CINEMATIC (Elegant & Rich / Vinyl Black)
    // --------------------------------------------------------------------------
    return (
      <div
        ref={ref}
        id="receipt-print-node"
        className={`relative w-full max-w-[480px] mx-auto bg-[#141416] text-[#e2e8f0] shadow-2xl p-7 sm:p-8 font-mono select-none border border-amber-500/30 transition-all ${className}`}
        style={{
          clipPath: jaggedClipPath,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(245, 158, 11, 0.1)',
        }}
      >
        {/* Watermark Poster */}
        {bill.bgImage && (
          <div className="absolute inset-0 pointer-events-none bg-center bg-cover bg-no-repeat opacity-[0.14] mix-blend-screen" style={{ backgroundImage: `url(${bill.bgImage})` }} />
        )}

        {/* Header */}
        <div className="relative z-10 pb-3 border-b border-amber-500/40">
          <div className="flex justify-between items-start text-[9px] uppercase tracking-widest text-amber-400/80 font-bold">
            <div className="text-left leading-tight">FINE MUSIC<br />FINE COMPANY</div>
            <div className="text-right leading-tight">TIME SPENT IN SONGS<br />IS NEVER WASTED</div>
          </div>

          <div className="text-center pt-2 space-y-1">
            <div className="text-xl font-serif font-bold text-amber-300 tracking-wider">BILLISAI</div>
            <div className="text-[10px] tracking-widest uppercase text-amber-500 font-medium">A MUSICAL DINING EXPERIENCE</div>
          </div>

          <div className="text-center pt-3 space-y-0.5">
            <div className="text-[10px] tracking-widest uppercase text-amber-400 font-bold">PRESENTS</div>
            <h2 className="text-lg sm:text-xl font-black font-serif text-amber-200 tracking-wider uppercase">
              HOTEL {bill.movieTitle.toUpperCase()}
            </h2>
            <p className="text-[11px] text-amber-400/90 font-medium tracking-wide uppercase">
              A {bill.musicDirector.toUpperCase()} FEAST
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="relative z-10 py-3 text-[11px] space-y-1 border-b border-amber-500/20 text-stone-300">
          <div className="flex justify-between">
            <span className="text-amber-400 uppercase font-semibold">COMPOSER</span>
            <span className="font-bold text-stone-100">: {bill.musicDirector}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-amber-400 uppercase font-semibold">STUDIO</span>
            <span className="font-bold text-stone-100 truncate max-w-[270px] text-right">: {bill.studio}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-amber-400 uppercase font-semibold">LABEL</span>
            <span className="font-bold text-stone-100 truncate max-w-[270px] text-right">: {bill.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-amber-400 uppercase font-semibold">RELEASED</span>
            <span className="font-bold text-stone-100">: {bill.releaseDate}</span>
          </div>
        </div>

        {/* Items Table */}
        <div className="relative z-10 py-3 text-xs">
          <div className="flex justify-between pb-1 font-bold border-b border-amber-500/40 uppercase text-[10px] sm:text-[11px] text-amber-300">
            <div className="w-8">#</div>
            <div className="flex-1 px-1">SONG NAME</div>
            <div className="w-16 text-center">DURATION</div>
            <div className="w-20 text-right">AMOUNT ({currency})</div>
          </div>

          <div className="space-y-1.5 pt-2">
            {bill.tracks.map((t, idx) => (
              <div key={t.id || idx} className="flex justify-between items-center text-[11px] leading-tight">
                <div className="w-8 text-amber-400 font-semibold">{idx + 1}</div>
                <div className="flex-1 px-1 font-bold uppercase truncate text-stone-100">{t.name}</div>
                <div className="w-16 text-center text-stone-300 font-semibold">{t.duration}</div>
                <div className="w-20 text-right font-bold text-amber-200">{t.price || t.duration.replace(':', '.')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="relative z-10 pt-2 pb-3 text-xs space-y-1 border-t-2 border-dashed border-amber-500/40">
          <div className="flex justify-between items-center text-[11px] font-bold text-amber-300">
            <span>TOTAL TRACKS: {stats.itemCount}</span>
            <span>TOTAL DURATION: {stats.totalTimeWords}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] pt-1">
            <span className="text-stone-400 uppercase">SUBTOTAL</span>
            <span className="font-bold">{currency}{stats.subtotal}</span>
          </div>
          {bill.taxPercent > 0 && (
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-stone-400 uppercase">SWARA GST ({bill.taxPercent}%)</span>
              <span className="font-bold">{currency}{stats.tax}</span>
            </div>
          )}

          {/* Gold Framed Box */}
          <div className="pt-2">
            <div className="p-3 border-2 border-amber-400 rounded-xl flex justify-between items-center bg-amber-950/30">
              <span className="text-sm font-black text-amber-300 uppercase tracking-wider">TOTAL AMOUNT</span>
              <span className="text-2xl font-black text-amber-200">{currency}{stats.grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-3 text-center space-y-2">
          <p className="text-[11px] italic font-serif text-amber-200">
            "{bill.closingJoke || 'Some albums are not just heard, they are lived.'}"
          </p>

          {/* Audio Waveform Graphic */}
          <div className="flex items-center justify-center gap-1 py-1">
            {[4,8,14,20,10,16,24,18,12,6,15,22,18,10,5,12,20,14,6,10,18,12,6].map((h, i) => (
              <div key={i} className="w-[3px] bg-amber-400/80 rounded-full" style={{ height: `${h}px` }} />
            ))}
          </div>

          <p className="text-[9px] tracking-widest uppercase font-bold text-amber-500/80">
            THANK YOU FOR BEING A PART OF THE MUSIC
          </p>
        </div>
      </div>
    );
  }
);

ReceiptPreview.displayName = 'ReceiptPreview';
