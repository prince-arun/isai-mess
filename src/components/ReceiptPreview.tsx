'use client';

import React, { forwardRef } from 'react';
import { BillData, ThemeStyle } from '../types/bill';

interface ReceiptPreviewProps {
  bill: BillData;
  scale?: number;
  className?: string;
}

export const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
  ({ bill, className = '' }, ref) => {

    // Helper to calculate totals from track durations (e.g. "05:15" -> 5 min 15 sec)
    const trackStats = React.useMemo(() => {
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
      const formattedTotalTime = `${totalMins}M ${remSecs < 10 ? '0' : ''}${remSecs}S`;

      // Duration mapped to price (e.g. 05:15 = 5.15)
      const subtotal = bill.tracks.reduce((acc, track) => {
        const priceNum = parseFloat(track.price || track.duration.replace(':', '.')) || 0;
        return acc + priceNum;
      }, 0);

      const tax = (subtotal * (bill.taxPercent || 0)) / 100;
      const grandTotal = subtotal + tax + (bill.tipAmount || 0);

      return {
        formattedTotalTime,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
        itemCount: bill.tracks.length
      };
    }, [bill.tracks, bill.taxPercent, bill.tipAmount]);

    // Theme style mapping for the 5 distinct styles
    const getThemeStyles = (theme: ThemeStyle) => {
      switch (theme) {
        case 'madurai-mess':
          return {
            paperBg: 'bg-[#f0f4f8]',
            textColor: 'text-[#1e3a8a]',
            monoColor: 'font-mono text-[#1e40af]',
            stampBg: 'bg-blue-900/10 text-blue-800 border-blue-700',
            fillColor: '#f0f4f8',
          };
        case 'tea-kadai':
          return {
            paperBg: 'bg-[#fef9c3]',
            textColor: 'text-[#713f12]',
            monoColor: 'font-mono text-[#854d0e]',
            stampBg: 'bg-yellow-200/60 text-yellow-900 border-yellow-700',
            fillColor: '#fef9c3',
          };
        case 'five-star':
          return {
            paperBg: 'bg-[#ffffff]',
            textColor: 'text-stone-900',
            monoColor: 'font-mono text-stone-900',
            stampBg: 'bg-stone-100 text-stone-800 border-stone-700',
            fillColor: '#ffffff',
          };
        case 'night-biryani':
          return {
            paperBg: 'bg-[#1c1917]',
            textColor: 'text-amber-100',
            monoColor: 'font-mono text-amber-300',
            stampBg: 'bg-amber-950/80 text-amber-300 border-amber-500',
            fillColor: '#1c1917',
          };
        case 'classic-hotel':
        default:
          return {
            paperBg: 'bg-[#faf6e9]',
            textColor: 'text-[#2b261f]',
            monoColor: 'font-mono text-[#241e17]',
            stampBg: 'bg-[#f5ebd6] text-[#6e2b00] border-[#92400e]',
            fillColor: '#faf6e9',
          };
      }
    };

    const styles = getThemeStyles(bill.themeStyle);

    return (
      <div
        ref={ref}
        id="receipt-print-node"
        className={`relative w-full max-w-[420px] mx-auto ${styles.paperBg} ${styles.textColor} shadow-2xl transition-all duration-300 select-none p-6 sm:p-7 ${className}`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Top Jagged Cutout SVG */}
        <div className="absolute -top-3 left-0 right-0 h-3 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 12" preserveAspectRatio="none">
            <polygon
              points="0,12 10,0 20,12 30,0 40,12 50,0 60,12 70,0 80,12 90,0 100,12 110,0 120,12 130,0 140,12 150,0 160,12 170,0 180,12 190,0 200,12 210,0 220,12 230,0 240,12 250,0 260,12 270,0 280,12 290,0 300,12 310,0 320,12 330,0 340,12 350,0 360,12 370,0 380,12 390,0 400,12"
              fill={styles.fillColor}
            />
          </svg>
        </div>

        {/* Watermarked Movie Poster Background */}
        {bill.bgImage && (
          <div
            className="absolute inset-0 pointer-events-none bg-center bg-cover bg-no-repeat transition-opacity duration-300 mix-blend-multiply rounded-sm overflow-hidden"
            style={{
              backgroundImage: `url(${bill.bgImage})`,
              opacity: bill.posterOpacity ?? 0.12,
              filter: bill.themeStyle === 'night-biryani' ? 'invert(1) contrast(1.2)' : 'contrast(1.1) grayscale(0.25)',
            }}
          />
        )}

        {/* 1. RECEIPT HEADER */}
        <div className="relative z-10 text-center space-y-1.5 pb-3 border-b-2 border-dashed border-current">
          
          {/* Brand Logo Banner: ONLY BILLISAI */}
          <div className="text-[11px] font-mono tracking-widest font-bold opacity-80 flex items-center justify-center gap-1.5">
            <span>★</span>
            <span className="uppercase px-2.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono tracking-widest font-extrabold text-xs">
              BILLISAI
            </span>
            <span>★</span>
          </div>

          {/* Hotel & Movie Name: e.g. HOTEL ENTHIRAN */}
          <div className="pt-1">
            <h2 className="text-lg sm:text-xl font-black font-mono uppercase tracking-wider leading-tight">
              HOTEL {bill.movieTitle.toUpperCase()}
            </h2>
          </div>

          {/* Subtitle / Joke */}
          <p className="text-[11px] font-mono italic opacity-85 pt-0.5">
            "{bill.hotelSubtitle || `${bill.musicDirector} Special Audio Feast`}"
          </p>

        </div>

        {/* 2. METADATA SECTION */}
        <div className="relative z-10 py-2.5 text-xs font-mono space-y-1 border-b border-dashed border-current/70">
          <div className="flex justify-between items-center text-[11px]">
            <span>BILL NO: <strong className="font-bold">{bill.billNo || 'BILL-101'}</strong></span>
            <span>TABLE: <strong className="font-bold">{bill.tableNo || 'AUD-7.1'}</strong></span>
          </div>
          
          <div className="flex justify-between items-center text-[11px] opacity-90">
            <span>DATE: {bill.releaseDate || '15-AUG-1992'}</span>
            <span>TIME: 08:30 AM</span>
          </div>

          <div className="pt-1 space-y-0.5 text-[11px]">
            <div className="flex justify-between">
              <span className="opacity-80">HEAD CHEF:</span>
              <span className="font-bold truncate max-w-[190px] text-right">{bill.musicDirector}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">COOKED AT:</span>
              <span className="font-bold truncate max-w-[190px] text-right">{bill.studio}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">SERVED BY:</span>
              <span className="font-bold truncate max-w-[190px] text-right">{bill.label}</span>
            </div>
          </div>
        </div>

        {/* 3. ITEM / TRACK LIST TABLE */}
        <div className="relative z-10 py-3 font-mono text-xs">
          {/* Header */}
          <div className="grid grid-cols-12 gap-1 pb-1.5 mb-2 font-bold border-b border-current uppercase text-[10px] sm:text-[11px]">
            <div className="col-span-1">#</div>
            <div className="col-span-6">ITEM / TRACK</div>
            <div className="col-span-2 text-center">TIME</div>
            <div className="col-span-3 text-right">AMT ({bill.currencySymbol || '₹'})</div>
          </div>

          {/* Tracks */}
          <div className="space-y-2">
            {bill.tracks.map((track, idx) => {
              const itemPrice = track.price || track.duration.replace(':', '.');
              return (
                <div key={track.id || idx} className="grid grid-cols-12 gap-1 items-start text-[11px] leading-tight">
                  <div className="col-span-1 font-bold opacity-70">{idx + 1}.</div>
                  <div className="col-span-6 pr-1">
                    <div className="font-bold uppercase tracking-tight truncate">{track.name}</div>
                    {track.singers && (
                      <div className="text-[10px] opacity-70 truncate italic">
                        {track.singers}
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 text-center font-semibold opacity-90">{track.duration}</div>
                  <div className="col-span-3 text-right font-bold">{bill.currencySymbol || '₹'}{itemPrice}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. TOTALS & GRAND AMOUNT */}
        <div className="relative z-10 pt-2 pb-3 font-mono text-xs space-y-1.5 border-t border-dashed border-current">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-80">SUBTOTAL ({trackStats.itemCount} TRACKS):</span>
            <span className="font-bold">{bill.currencySymbol || '₹'}{trackStats.subtotal}</span>
          </div>

          {bill.taxPercent > 0 && (
            <div className="flex justify-between items-center text-[11px]">
              <span className="opacity-80">SWARA GST ({bill.taxPercent}%):</span>
              <span className="font-bold">{bill.currencySymbol || '₹'}{trackStats.tax}</span>
            </div>
          )}

          {bill.tipAmount > 0 && (
            <div className="flex justify-between items-center text-[11px]">
              <span className="opacity-80">MELODY TIP / CHEF CHARGE:</span>
              <span className="font-bold">{bill.currencySymbol || '₹'}{bill.tipAmount.toFixed(2)}</span>
            </div>
          )}

          {/* PROMINENT NET AMOUNT BOX */}
          <div className="my-2 p-3 border-2 border-current rounded text-center flex flex-col justify-center items-center bg-black/5 dark:bg-white/5">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-85">
              TOTAL ALBUM DURATION: {trackStats.formattedTotalTime}
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight mt-1">
              NET AMOUNT: {bill.currencySymbol || '₹'}{trackStats.grandTotal}
            </div>
          </div>
        </div>

        {/* 5. CLOSING MESSAGE & BARCODE */}
        <div className="relative z-10 pt-2 text-center space-y-2 font-mono">
          <p className="text-xs font-bold italic">
            "{bill.closingJoke || 'Payment accepted in feelings.'}"
          </p>

          {/* Vector Barcode */}
          <div className="flex flex-col items-center justify-center pt-1">
            <div className="h-8 w-4/5 max-w-[220px] flex items-stretch justify-center gap-[2px] opacity-90">
              {[3,1,2,4,1,3,2,1,4,2,1,3,1,2,4,1,2,3,1,4,2,1,3,2,1,4,2,1,3].map((w, i) => (
                <div
                  key={i}
                  className="bg-current h-full"
                  style={{ width: `${w * 2}px` }}
                />
              ))}
            </div>
            <div className="text-[9px] tracking-widest mt-1 opacity-70">
              *BILLISAI-{bill.movieTitle.toUpperCase().replace(/[^A-Z0-9]/g, '')}*
            </div>
          </div>

          <div className="text-[9px] opacity-60 pt-0.5 uppercase tracking-wide font-bold">
            COOKED WITH PASSION AT BILLISAI
          </div>
        </div>

        {/* Bottom Jagged Cutout SVG */}
        <div className="absolute -bottom-3 left-0 right-0 h-3 overflow-hidden pointer-events-none transform rotate-180">
          <svg className="w-full h-full" viewBox="0 0 400 12" preserveAspectRatio="none">
            <polygon
              points="0,12 10,0 20,12 30,0 40,12 50,0 60,12 70,0 80,12 90,0 100,12 110,0 120,12 130,0 140,12 150,0 160,12 170,0 180,12 190,0 200,12 210,0 220,12 230,0 240,12 250,0 260,12 270,0 280,12 290,0 300,12 310,0 320,12 330,0 340,12 350,0 360,12 370,0 380,12 390,0 400,12"
              fill={styles.fillColor}
            />
          </svg>
        </div>

      </div>
    );
  }
);

ReceiptPreview.displayName = 'ReceiptPreview';
