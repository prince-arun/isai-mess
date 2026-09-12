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

    // Helper to calculate totals from track durations (e.g. "04:55" -> 4 min 55 sec = 295 sec)
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
      const formattedTotalTime = `${totalMins}m ${remSecs < 10 ? '0' : ''}${remSecs}s`;

      // Price calculation: duration converted to rupees (e.g. 04:55 = 4.55)
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

    // Theme configuration mappings
    const getThemeStyles = (theme: ThemeStyle) => {
      switch (theme) {
        case 'blue-ink':
          return {
            paperBg: 'bg-[#f0f4f8]',
            paperBorder: 'border-blue-200',
            textColor: 'text-[#1e3a8a]',
            monoColor: 'font-mono text-[#1e40af]',
            accentColor: 'text-blue-600',
            borderColor: 'border-blue-300/80',
            divider: 'border-dashed border-blue-400/60',
            stampBg: 'bg-blue-900/10 text-blue-800 border-blue-700',
          };
        case 'modern':
          return {
            paperBg: 'bg-[#ffffff]',
            paperBorder: 'border-stone-200',
            textColor: 'text-stone-900',
            monoColor: 'font-mono text-stone-900',
            accentColor: 'text-stone-700',
            borderColor: 'border-stone-400',
            divider: 'border-dashed border-stone-300',
            stampBg: 'bg-stone-100 text-stone-800 border-stone-700',
          };
        case 'dark-kitchen':
          return {
            paperBg: 'bg-[#18181b]',
            paperBorder: 'border-stone-700',
            textColor: 'text-amber-100',
            monoColor: 'font-mono text-amber-300',
            accentColor: 'text-amber-400',
            borderColor: 'border-amber-700/60',
            divider: 'border-dashed border-amber-600/40',
            stampBg: 'bg-amber-950/80 text-amber-300 border-amber-500',
          };
        case 'golden-curry':
          return {
            paperBg: 'bg-[#fefce8]',
            paperBorder: 'border-amber-200',
            textColor: 'text-[#78350f]',
            monoColor: 'font-mono text-[#92400e]',
            accentColor: 'text-amber-700',
            borderColor: 'border-amber-400/60',
            divider: 'border-dashed border-amber-400/70',
            stampBg: 'bg-amber-100 text-amber-900 border-amber-600',
          };
        case 'vintage':
        default:
          return {
            paperBg: 'bg-[#faf6e9]',
            paperBorder: 'border-[#e6dec3]',
            textColor: 'text-[#2b261f]',
            monoColor: 'font-mono text-[#241e17]',
            accentColor: 'text-[#854d0e]',
            borderColor: 'border-[#362e26]',
            divider: 'border-dashed border-[#4a3f35]',
            stampBg: 'bg-[#f5ebd6] text-[#6e2b00] border-[#92400e]',
          };
      }
    };

    const styles = getThemeStyles(bill.themeStyle);

    return (
      <div
        ref={ref}
        id="receipt-print-node"
        className={`relative w-full max-w-[440px] mx-auto ${styles.paperBg} ${styles.textColor} shadow-2xl transition-all duration-300 select-none p-6 sm:p-7 ${className}`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Top Jagged Receipt Cut SVG */}
        <div className="absolute -top-3 left-0 right-0 h-3 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 12" preserveAspectRatio="none">
            <polygon
              points="0,12 10,0 20,12 30,0 40,12 50,0 60,12 70,0 80,12 90,0 100,12 110,0 120,12 130,0 140,12 150,0 160,12 170,0 180,12 190,0 200,12 210,0 220,12 230,0 240,12 250,0 260,12 270,0 280,12 290,0 300,12 310,0 320,12 330,0 340,12 350,0 360,12 370,0 380,12 390,0 400,12"
              fill={bill.themeStyle === 'dark-kitchen' ? '#18181b' : bill.themeStyle === 'blue-ink' ? '#f0f4f8' : bill.themeStyle === 'golden-curry' ? '#fefce8' : bill.themeStyle === 'modern' ? '#ffffff' : '#faf6e9'}
            />
          </svg>
        </div>

        {/* Background Movie Poster Watermark */}
        {bill.bgImage && (
          <div
            className="absolute inset-0 pointer-events-none bg-center bg-cover bg-no-repeat transition-opacity duration-300 mix-blend-multiply rounded-sm overflow-hidden"
            style={{
              backgroundImage: `url(${bill.bgImage})`,
              opacity: bill.posterOpacity ?? 0.12,
              filter: bill.themeStyle === 'dark-kitchen' ? 'invert(1) contrast(1.2)' : 'contrast(1.1) grayscale(0.2)',
            }}
          />
        )}

        {/* RECEIPT HEADER */}
        <div className="relative z-10 text-center space-y-1.5 pb-4 border-b-2 border-dashed border-current">
          
          {/* Stars decoration */}
          <div className="text-[11px] font-mono tracking-widest font-bold opacity-80 flex items-center justify-center gap-1">
            <span>★</span> <span>★</span> <span>★</span>
            <span className="uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-sans tracking-normal font-semibold">
              ISAI HOTEL & MESS
            </span>
            <span>★</span> <span>★</span> <span>★</span>
          </div>

          {/* Main Hotel / Restaurant Name */}
          <h2 className="text-xl sm:text-2xl font-black tracking-tight font-mono uppercase leading-tight pt-1">
            {bill.hotelName || 'இசை உணவகம்'}
          </h2>

          {/* Subtitle / Punchline */}
          <p className="text-xs font-mono italic opacity-85">
            "{bill.hotelSubtitle || 'Hot & Spicy Music Since 1992'}"
          </p>

          {/* Movie Title Banner */}
          <div className="pt-2">
            <div className="inline-block px-3 py-1 border-2 border-current rounded font-mono font-bold text-sm uppercase tracking-wider">
              🎬 {bill.movieTitle || 'MOVIE ALBUM'} ({bill.releaseDate.split('-').pop() || '1992'})
            </div>
          </div>

        </div>

        {/* METADATA / BILL DETAILS SECTION */}
        <div className="relative z-10 py-3 text-xs font-mono space-y-1.5 border-b border-dashed border-current/60">
          <div className="flex justify-between items-center">
            <span>BILL NO: <strong className="font-bold">{bill.billNo || 'BILL-001'}</strong></span>
            <span>TABLE: <strong className="font-bold">{bill.tableNo || 'AUD-7.1'}</strong></span>
          </div>
          
          <div className="flex justify-between items-center text-[11px] opacity-90">
            <span>DATE: {bill.releaseDate || '15-AUG-1992'}</span>
            <span>TIME: 08:30 AM</span>
          </div>

          <div className="pt-1 space-y-0.5 text-[11px]">
            <div className="flex justify-between">
              <span className="opacity-80">HEAD CHEF (COMPOSER):</span>
              <span className="font-bold truncate max-w-[170px] text-right">{bill.musicDirector || 'A.R. Rahman'}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">COOKED AT (STUDIO):</span>
              <span className="font-bold truncate max-w-[170px] text-right">{bill.studio || 'Panchathan Studio'}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">SERVED BY (LABEL):</span>
              <span className="font-bold truncate max-w-[170px] text-right">{bill.label || 'Audio Label'}</span>
            </div>
          </div>
        </div>

        {/* TABLE OF TRACKS / DISHES */}
        <div className="relative z-10 py-3 font-mono text-xs">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-1 pb-1.5 mb-2 font-bold border-b border-current uppercase text-[11px]">
            <div className="col-span-1">#</div>
            <div className="col-span-6">ITEM / TRACK NAME</div>
            <div className="col-span-2 text-center">TIME</div>
            <div className="col-span-3 text-right">AMT ({bill.currencySymbol || '₹'})</div>
          </div>

          {/* Track Items */}
          <div className="space-y-2">
            {bill.tracks.map((track, idx) => {
              const itemPrice = track.price || track.duration.replace(':', '.');
              return (
                <div key={track.id || idx} className="grid grid-cols-12 gap-1 items-start text-[11px] leading-tight">
                  <div className="col-span-1 font-bold opacity-75">{idx + 1}.</div>
                  <div className="col-span-6 pr-1">
                    <div className="font-bold uppercase tracking-tight">{track.name}</div>
                    {track.singers && (
                      <div className="text-[10px] opacity-75 truncate italic">
                        Ingr: {track.singers}
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

        {/* BILL TOTALS & TAX CALCULATIONS */}
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

          {/* GRAND TOTAL BOX */}
          <div className="my-2 p-2.5 border-2 border-current rounded text-center flex flex-col justify-center items-center bg-black/5 dark:bg-white/5">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              TOTAL ALBUM DURATION: {trackStats.formattedTotalTime}
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono tracking-tight mt-0.5">
              NET AMOUNT: {bill.currencySymbol || '₹'}{trackStats.grandTotal}
            </div>
          </div>
        </div>

        {/* CHEF STAMP & AUDIO SPECS */}
        <div className="relative z-10 py-2 font-mono flex items-center justify-between gap-2 text-[10px] border-b border-dashed border-current/60">
          <div className="space-y-0.5">
            <div>SPECS: <span className="font-bold">{bill.audioSpecs || 'Stereo FLAC 24-Bit'}</span></div>
            <div>CHEF TITLE: <span className="font-bold">{bill.chefTitle || 'Isai Pudhalvan'}</span></div>
          </div>
          
          {/* Stamp Badge */}
          <div className={`px-2 py-1 rounded border-2 font-bold uppercase tracking-wider text-[9px] transform -rotate-3 ${styles.stampBg}`}>
            ✓ CHEF APPROVED
          </div>
        </div>

        {/* FOOTER MESSAGE & BARCODE */}
        <div className="relative z-10 pt-4 text-center space-y-2 font-mono">
          <p className="text-[11px] font-semibold italic">
            "{bill.customFooterNote || 'Melody served hot & spicy! Visit again!'}"
          </p>

          {/* Vector Barcode */}
          <div className="flex flex-col items-center justify-center pt-1">
            <div className="h-9 w-4/5 max-w-[240px] flex items-stretch justify-center gap-[2px] opacity-90">
              {[3,1,2,4,1,3,2,1,4,2,1,3,1,2,4,1,2,3,1,4,2,1,3,2,1,4,2,1,3].map((w, i) => (
                <div
                  key={i}
                  className="bg-current h-full"
                  style={{ width: `${w * 2}px` }}
                />
              ))}
            </div>
            <div className="text-[9px] tracking-widest mt-1 opacity-70">
              *ISAI-MESS-{bill.movieTitle.toUpperCase().replace(/\s+/g, '')}-2026*
            </div>
          </div>

          <div className="text-[9px] opacity-60 pt-1">
            COOKED WITH PASSION AT ISAI MESS • MADURAI / CHENNAI
          </div>
        </div>

        {/* Bottom Jagged Receipt Cut SVG */}
        <div className="absolute -bottom-3 left-0 right-0 h-3 overflow-hidden pointer-events-none transform rotate-180">
          <svg className="w-full h-full" viewBox="0 0 400 12" preserveAspectRatio="none">
            <polygon
              points="0,12 10,0 20,12 30,0 40,12 50,0 60,12 70,0 80,12 90,0 100,12 110,0 120,12 130,0 140,12 150,0 160,12 170,0 180,12 190,0 200,12 210,0 220,12 230,0 240,12 250,0 260,12 270,0 280,12 290,0 300,12 310,0 320,12 330,0 340,12 350,0 360,12 370,0 380,12 390,0 400,12"
              fill={bill.themeStyle === 'dark-kitchen' ? '#18181b' : bill.themeStyle === 'blue-ink' ? '#f0f4f8' : bill.themeStyle === 'golden-curry' ? '#fefce8' : bill.themeStyle === 'modern' ? '#ffffff' : '#faf6e9'}
            />
          </svg>
        </div>

      </div>
    );
  }
);

ReceiptPreview.displayName = 'ReceiptPreview';
