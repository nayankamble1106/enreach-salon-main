import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils';

interface ImageSlotProps {
  slotNumber: number; // 1 to 9
  slotTitle?: string;
  imageSrc: string; // Image path
  onClick: () => void;
  isMainSlot?: boolean;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  slotNumber,
  slotTitle,
  imageSrc,
  onClick,
  isMainSlot = false,
}) => {
  // Candidate fallback paths in sequence to guarantee loading on GitHub Pages or local
  const baseCandidates = [
    imageSrc ? (imageSrc.startsWith('http') || imageSrc.startsWith('data:') ? imageSrc : getAssetUrl(imageSrc)) : '',
    getAssetUrl(`image${slotNumber}.jpg.jpeg`),
    `./image${slotNumber}.jpg.jpeg`,
    getAssetUrl(`image${slotNumber}.jpg`),
    `./image${slotNumber}.jpg`,
  ].filter(Boolean) as string[];

  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  useEffect(() => {
    setCandidateIndex(0);
    setHasFailed(false);
  }, [imageSrc, slotNumber]);

  const currentSrc = baseCandidates[candidateIndex] || getAssetUrl(`image${slotNumber}.jpg.jpeg`);

  // Gracefully try standard fallbacks on error without breaking app execution
  const handleImageError = () => {
    if (candidateIndex < baseCandidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasFailed(true);
    }
  };

  return (
    <div
      id={`menu-card-slot-${slotNumber}`}
      onClick={onClick}
      className={`group relative w-full rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer select-none bg-[#181818] ${
        isMainSlot
          ? 'border-white/15 hover:border-[#F0EAE1]/50 shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(240,234,225,0.06)]'
          : 'border-white/10 hover:border-[#F0EAE1]/40 shadow-[0_8px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(240,234,225,0.04)]'
      }`}
    >
      {/* Aspect Ratio 1080/1520 Menu Card Frame */}
      <div className="relative aspect-[1080/1520] w-full bg-[#141414] overflow-hidden flex items-center justify-center">
        {hasFailed ? (
          <div className="p-6 text-center flex flex-col items-center justify-center text-zinc-400">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-3 bg-[#181818]">
              <i className="fa-solid fa-scissors text-[#D4AF37] text-lg" />
            </div>
            <p className="text-sm font-semibold text-[#E5D2A0]">{slotTitle || `Card ${slotNumber}`}</p>
            <p className="text-xs text-zinc-500 mt-1">Enreach Unisex Salon</p>
          </div>
        ) : (
          <img
            src={currentSrc}
            alt={slotTitle || `Enreach Unisex Salon Menu Card ${slotNumber}`}
            loading={isMainSlot ? 'eager' : 'lazy'}
            onError={handleImageError}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          />
        )}
      </div>
    </div>
  );
};
