'use client';

import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Download, Share2, Copy, Check } from 'lucide-react';

interface ExportControlsProps {
  receiptRef: React.RefObject<HTMLDivElement | null>;
  movieTitle: string;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  receiptRef,
  movieTitle,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger high-res PNG export using html-to-image
  const handleDownloadPng = async () => {
    if (!receiptRef.current) return;
    setIsExporting(true);

    try {
      // Trigger festive paper celebration confetti
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#f59e0b', '#d97706', '#92400e', '#ffffff']
      });

      const dataUrl = await toPng(receiptRef.current, {
        pixelRatio: 3, // 3x scale for crisp 4K retina export
        quality: 0.95,
        cacheBust: true,
      });

      const link = document.createElement('a');
      const cleanTitle = movieTitle.toUpperCase().replace(/[^A-Z0-9]/g, '-');
      link.download = `BILLISAI-${cleanTitle}-BILL.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export high-res PNG receipt', err);
      alert('Could not download image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Web Share API trigger
  const handleShare = async () => {
    if (!receiptRef.current) return;
    setIsExporting(true);

    try {
      const dataUrl = await toPng(receiptRef.current, { pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${movieTitle}-bill.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${movieTitle} - Billisai Audio Bill`,
          text: `Check out my hotel bill for ${movieTitle} cooked at Billisai! 🎵🧾`,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        alert('Image copied to clipboard! You can now paste it directly into WhatsApp or Instagram.');
      }
    } catch (err) {
      console.error('Sharing failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto space-y-2.5 pt-2">
      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDownloadPng}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black rounded-2xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Cooking PNG...' : 'Download Bill'}</span>
        </button>

        <button
          onClick={handleShare}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-amber-200 font-bold rounded-2xl border border-stone-700/80 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
          <span>{copied ? 'Copied Image!' : 'Share Bill'}</span>
        </button>
      </div>
    </div>
  );
};
