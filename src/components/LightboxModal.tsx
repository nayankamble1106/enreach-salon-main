import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getAssetUrl } from '../utils';

interface LightboxModalProps {
  currentIndex: number | null;
  images: string[];
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  onBookService?: (serviceName: string) => void;
}

const TOTAL_CARDS = 9;

const CARD_NAMES = [
  'Main Salon Menu',
  'Hair Cutting & Precision Styling',
  'Luxury Hair Spa & Detox Therapy',
  'Hair Color, Highlights & Balayage',
  'Skin Rituals & Hydra Facials',
  'Beard Sculpting & Men\'s Spa',
  'Hands & Feet Care / Nails',
  'Detan, Waxing & Body Glow',
  'Bridal & Occasion Packages',
];

export const LightboxModal: React.FC<LightboxModalProps> = ({
  currentIndex,
  images,
  onClose,
  onSelectIndex,
  onBookService,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const currentSlotNumber = currentIndex !== null ? currentIndex + 1 : 1;

  const candidatePaths = useMemo(() => {
    const rawPassed = currentIndex !== null ? images[currentIndex] : '';
    return [
      rawPassed ? (rawPassed.startsWith('http') || rawPassed.startsWith('data:') ? rawPassed : getAssetUrl(rawPassed)) : '',
      getAssetUrl(`image${currentSlotNumber}.jpg.jpeg`),
      `./image${currentSlotNumber}.jpg.jpeg`,
      `/image${currentSlotNumber}.jpg.jpeg`,
    ].filter(Boolean) as string[];
  }, [currentIndex, currentSlotNumber, images]);

  const [candidateIndex, setCandidateIndex] = useState<number>(0);

  // Reset zoom and candidate index when card changes
  useEffect(() => {
    setZoomLevel(1);
    setCandidateIndex(0);
  }, [currentIndex, currentSlotNumber]);

  const activeSrc = candidatePaths[candidateIndex] || getAssetUrl(`image${currentSlotNumber}.jpg.jpeg`);

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const newIdx = currentIndex === 0 ? TOTAL_CARDS - 1 : currentIndex - 1;
    onSelectIndex(newIdx);
  }, [currentIndex, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const newIdx = currentIndex === TOTAL_CARDS - 1 ? 0 : currentIndex + 1;
    onSelectIndex(newIdx);
  }, [currentIndex, onSelectIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, handlePrev, handleNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentIndex]);

  if (currentIndex === null) return null;

  const cardTitle = CARD_NAMES[currentIndex] || `Menu Card ${currentSlotNumber}`;

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 2 : prev === 2 ? 2.8 : 1));
  };

  const handleImageError = () => {
    if (candidateIndex < candidatePaths.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      id="lightbox-modal"
      className="fixed inset-0 z-50 bg-[#0D0D0D]/98 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="w-full px-4 py-3 bg-[#181818]/95 border-b border-white/10 flex items-center justify-between z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Counter and Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F0EAE1] font-mono tracking-widest uppercase">
              CARD 0{currentSlotNumber} / 0{TOTAL_CARDS}
            </span>
            <span className="text-zinc-600 text-xs">•</span>
            <span className="text-xs text-[#F5F5F7] font-medium truncate max-w-[180px] sm:max-w-xs">
              {cardTitle}
            </span>
          </div>
          <span className="text-[10px] text-[#F0EAE1]/50 font-mono tracking-wider mt-0.5">
            ENREACH UNISEX SALON
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Zoom Level Indicator & Toggle */}
          <button
            id="lightbox-zoom-btn"
            type="button"
            onClick={toggleZoom}
            className="px-3 py-1.5 rounded-lg bg-[#252525] hover:bg-[#303030] border border-white/10 text-xs font-medium text-[#F5F5F7] flex items-center gap-1.5 transition-colors"
            title="Click or tap image to zoom"
          >
            <i className="fa-solid fa-magnifying-glass-plus text-[#F0EAE1] text-xs" />
            <span className="font-mono text-[11px]">{zoomLevel.toFixed(1)}x</span>
          </button>

          {/* Quick Book Button */}
          {onBookService && (
            <button
              id="lightbox-quick-book-btn"
              type="button"
              onClick={() => {
                onBookService(cardTitle);
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#F0EAE1] hover:bg-white text-[#0D0D0D] text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <i className="fa-brands fa-whatsapp text-green-700 text-xs" />
              <span>Book</span>
            </button>
          )}

          {/* Close Modal Button */}
          <button
            id="lightbox-close-btn"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#252525] hover:bg-[#303030] text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
            aria-label="Close Lightbox"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 w-full overflow-auto flex items-center justify-center p-2 sm:p-4 touch-pan-x touch-pan-y"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
        >
          <img
            id="lightbox-active-image"
            src={activeSrc}
            alt={cardTitle}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="max-w-[92vw] max-h-[78vh] object-contain rounded-xl shadow-2xl border border-white/15 cursor-zoom-in bg-[#141414]"
          />
        </div>

        {/* Previous Button */}
        <button
          id="lightbox-prev-btn"
          type="button"
          aria-label="Previous Menu Card"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#181818]/90 hover:bg-[#252525] text-[#F5F5F7] border border-white/15 flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
        >
          <i className="fa-solid fa-chevron-left text-sm" />
        </button>

        {/* Next Button */}
        <button
          id="lightbox-next-btn"
          type="button"
          aria-label="Next Menu Card"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#181818]/90 hover:bg-[#252525] text-[#F5F5F7] border border-white/15 flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
        >
          <i className="fa-solid fa-chevron-right text-sm" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div
        className="w-full px-4 py-3 bg-[#181818]/95 border-t border-white/10 z-10 overflow-x-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center gap-2 min-w-max mx-auto">
          {Array.from({ length: TOTAL_CARDS }).map((_, i) => {
            const cardNum = i + 1;
            const thumbSrc = images[i] ? getAssetUrl(images[i]) : getAssetUrl(`image${cardNum}.jpg.jpeg`);
            const isSelected = i === currentIndex;

            return (
              <button
                key={cardNum}
                type="button"
                onClick={() => onSelectIndex(i)}
                className={`group relative w-10 sm:w-12 aspect-[1080/1520] rounded-md overflow-hidden border transition-all ${
                  isSelected
                    ? 'border-[#F0EAE1] ring-2 ring-[#F0EAE1]/30 scale-105 shadow-md'
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
                title={`Card ${cardNum}: ${CARD_NAMES[i]}`}
              >
                <img
                  src={thumbSrc}
                  alt={`Thumbnail ${cardNum}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-center text-[#F0EAE1] font-mono py-0.5">
                  0{cardNum}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
