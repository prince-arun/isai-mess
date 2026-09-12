'use client';

import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Download, Share2, Copy, Sparkles, Check, Image as ImageIcon, Frame } from 'lucide-react';

interface ExportControlsProps {
  receiptRef: React.RefObject<HTMLDivElement | null>;
  movieTitle: string;
  showDeskFrame: boolean;
  onToggleDeskFrame: (show: boolean) => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  receiptRef,
  movieTitle,
  showDeskFrame,
  onToggleDeskFrame,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger high-res PNG export using html-to-image
  const handleDownloadPng = async () => {
    if (!receiptRef.current) return;
    setIsExporting(true);

    try {
      // Trigger festive paper-tear celebration confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#d97706', '#92400e', '#ffffff']
      });

      const dataUrl = await toPng(receiptRef.current, {
        pixelRatio: 3, // 3x scale for crisp 4K retina export
        quality: 0.95,
        cacheBust: true,
      });

      const link = document.createElement('a');
      const filename = `ISAI-MESS-${movieTitle.toUpperCase().replace(/\s+/g, '-')}-RECEIPT.png`;
      link.download = filename;
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
          title: `${movieTitle} - Isai Mess Audio Bill`,
          text: `Check out my hot music album bill for ${movieTitle} cooked at Isai Mess! 🎵🔥`,
        });
      } else {
        alert('Web Share is not supported on this browser. Try Downloading the image!');
      }
    } catch (err) {
      console.error('Sharing failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy PNG to Clipboard
  const handleCopyClipboard = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, { pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
      alert('Could not copy image directly. Try Downloading instead.');
    }
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl backdrop-blur-md space-y-3 text-stone-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Thermal Printer & Export Desk
          </h3>
        </div>

        {/* Toggle Desk Frame Button */}
        <button
          onClick={() => onToggleDeskFrame(!showDeskFrame)}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all ${
            showDeskFrame
              ? 'bg-amber-950/70 border-amber-500 text-amber-300 font-semibold'
              : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
          title="Toggle kitchen desk background context"
        >
          <Frame className="w-3.5 h-3.5" />
          <span>{showDeskFrame ? 'Wood Desk Frame: ON' : 'Desk Frame: OFF'}</span>
        </button>
      </div>

      {/* Main Download Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
        <button
          onClick={handleDownloadPng}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Printing PNG...' : 'Print & Download PNG (4K)'}</span>
        </button>

        <button
          onClick={handleCopyClipboard}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-800 hover:bg-stone-700 text-amber-100 font-semibold rounded-xl border border-stone-700 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Receipt Image'}</span>
        </button>

        <button
          onClick={handleShare}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-800 hover:bg-stone-700 text-amber-100 font-semibold rounded-xl border border-stone-700 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Share2 className="w-4 h-4 text-amber-400" />
          <span>Share Story</span>
        </button>
      </div>

      <p className="text-[11px] text-stone-400 text-center pt-1 font-mono">
        💡 Tip: PNG output is generated at 3x scale (Ultra-HD). Perfect for Instagram Stories, WhatsApp Status & Twitter!
      </p>
    </div>
  );
};
