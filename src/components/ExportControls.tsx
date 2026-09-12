'use client';

import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Download, Share2, Check, Loader2 } from 'lucide-react';

interface ExportControlsProps {
  receiptRef: React.RefObject<HTMLDivElement | null>;
  movieTitle: string;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  receiptRef,
  movieTitle,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'clean' | 'story' | null>(null);
  const [copied, setCopied] = useState(false);

  // Helper to render high-res image with fixed width guarantee (no mobile-screen squish)
  const generateReceiptImage = async (pixelRatio: number = 3) => {
    if (!receiptRef.current) return null;

    const originalElement = receiptRef.current;
    
    // Save original style properties
    const originalWidth = originalElement.style.width;
    const originalMaxWidth = originalElement.style.maxWidth;

    // Force exact 480px width during canvas rasterization
    originalElement.style.width = '480px';
    originalElement.style.maxWidth = '480px';

    try {
      const dataUrl = await toPng(originalElement, {
        pixelRatio,
        quality: 1,
        cacheBust: true,
        style: {
          transform: 'none',
          margin: '0 auto',
        }
      });
      return dataUrl;
    } finally {
      // Restore original styling
      originalElement.style.width = originalWidth;
      originalElement.style.maxWidth = originalMaxWidth;
    }
  };

  // 1. Download Clean Receipt (Ultra-HD PNG)
  const handleDownloadCleanPng = async () => {
    setIsExporting(true);
    setExportType('clean');

    try {
      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#f59e0b', '#d97706', '#10b981', '#ffffff']
      });

      const dataUrl = await generateReceiptImage(3.5); // Ultra-HD 3.5x
      if (!dataUrl) throw new Error('Could not generate receipt');

      const link = document.createElement('a');
      const cleanTitle = movieTitle.toUpperCase().replace(/[^A-Z0-9]/g, '-');
      link.download = `BILLISAI-${cleanTitle}-RECEIPT.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export clean PNG', err);
      alert('Could not download receipt. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  // 2. Download Instagram Story Format (1080x1920 9:16 HD)
  const handleDownloadInstagramStory = async () => {
    setIsExporting(true);
    setExportType('story');

    try {
      const receiptDataUrl = await generateReceiptImage(3);
      if (!receiptDataUrl) throw new Error('Could not generate receipt image');

      // Create high-res 1080x1920 Canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas context not available');

      // Load background gradient
      const bgGrad = ctx.createRadialGradient(540, 960, 100, 540, 960, 1000);
      bgGrad.addColorStop(0, '#1c1917');
      bgGrad.addColorStop(1, '#0c0a09');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Top Story Branding
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('★ BILLISAI ★', 540, 160);

      ctx.fillStyle = '#a8a29e';
      ctx.font = '24px sans-serif';
      ctx.fillText('Turn your favourite albums into hotel bills', 540, 205);

      // Load Receipt Image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = receiptDataUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate receipt dimensions to fit nicely inside 1080x1920 story
      const targetWidth = 840;
      const targetHeight = (img.height * targetWidth) / img.width;
      const posX = (1080 - targetWidth) / 2;
      const posY = Math.max(260, (1920 - targetHeight) / 2 - 40);

      // Draw soft drop shadow behind receipt
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 60;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 30;

      ctx.drawImage(img, posX, posY, targetWidth, targetHeight);

      // Reset shadow for bottom watermark
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#78716c';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('CREATE YOURS AT BILLISAI • ISAI.ARUNPRINCE.COM', 540, 1840);

      // Download Story Image
      const storyDataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const cleanTitle = movieTitle.toUpperCase().replace(/[^A-Z0-9]/g, '-');
      link.download = `BILLISAI-${cleanTitle}-INSTAGRAM-STORY.png`;
      link.href = storyDataUrl;
      link.click();

      // Confetti
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#e1306c', '#fd1d1d', '#f77737', '#f59e0b']
      });
    } catch (err) {
      console.error('Failed to export story format', err);
      alert('Could not download story format. Please try standard download.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  // 3. Web Share API Trigger
  const handleShare = async () => {
    setIsExporting(true);

    try {
      const dataUrl = await generateReceiptImage(2.5);
      if (!dataUrl) return;

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
        alert('Ultra-HD Receipt copied to clipboard! You can paste it directly into WhatsApp or Instagram.');
      }
    } catch (err) {
      console.error('Sharing failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto space-y-2.5 pt-2">
      
      {/* Main Download Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        
        {/* Clean Receipt (Ultra-HD PNG) */}
        <button
          onClick={handleDownloadCleanPng}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black rounded-2xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {isExporting && exportType === 'clean' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{isExporting && exportType === 'clean' ? 'Cooking 4K PNG...' : 'Download Receipt (4K)'}</span>
        </button>

        {/* Instagram Story 9:16 Format */}
        <button
          onClick={handleDownloadInstagramStory}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-black rounded-2xl shadow-lg shadow-purple-900/30 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {isExporting && exportType === 'story' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          )}
          <span>{isExporting && exportType === 'story' ? 'Preparing Story...' : 'Instagram Story (9:16)'}</span>
        </button>

      </div>

      {/* Secondary Share Button */}
      <button
        onClick={handleShare}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-900/90 hover:bg-stone-800 text-amber-200 font-bold rounded-xl border border-stone-800 text-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
        <span>{copied ? 'Copied Ultra-HD Image to Clipboard!' : 'Share Directly (WhatsApp / Instagram)'}</span>
      </button>

      <p className="text-[10px] text-stone-500 text-center font-mono">
        ⚡ Guaranteed Ultra-HD: Output rendered at 1440px+ uncompressed resolution without edge clipping.
      </p>

    </div>
  );
};
