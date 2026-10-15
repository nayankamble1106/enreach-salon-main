import React from 'react';

interface TenderHeroHeaderProps {
  onExploreMenu?: () => void;
  onBookAppointment?: () => void;
}

export const TenderHeroHeader: React.FC<TenderHeroHeaderProps> = ({
  onExploreMenu,
}) => {
  const metrics = [
    { value: '8+ YEARS', label: 'Industry Exp.' },
    { value: '4 YEARS', label: 'Main Salon' },
    { value: '2 YEARS', label: 'Wani Branch' },
    { value: '10,000+', label: 'Happy Clients' },
  ];

  const handleScrollToMenu = () => {
    if (onExploreMenu) {
      onExploreMenu();
    } else {
      const menuEl = document.getElementById('main-menu-section');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="tender-proposal-hero"
      aria-label="Enreach Official Tender Presentation"
      className="w-full min-h-[calc(100svh-64px)] min-h-[calc(100vh-64px)] bg-[#09090B] text-white border-b border-white/10 flex flex-col justify-between items-center px-4 py-8 sm:py-12 md:py-16 relative overflow-hidden"
    >
      {/* Subtle ambient lighting / vignette for Apple-grade finish */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#09090B] to-[#050505] pointer-events-none" />

      <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center items-center my-auto relative z-10">
        {/* SINGLE EXECUTIVE PRESENTATION CARD (Ultra-Sleek) */}
        <div className="w-full rounded-2xl bg-[#121214]/90 border border-white/15 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col items-center text-center">
          
          {/* Founder Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase">
              OFFICIAL TENDER PRESENTATION • FOUNDER VISHAL FULBHOGE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-white mb-4">
            Enreach Unisex Salon
          </h1>

          {/* Brief 2-line statement */}
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-xl mb-8">
            Delivering 8+ years of master styling excellence, operating 2 flagship branches, and serving 10,000+ satisfied clients.
          </p>

          {/* COMPACT INTEGRATED 2x2 STATS GRID (Inside Card) */}
          <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 pt-6 border-t border-white/10 mb-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center transition-colors hover:border-white/25"
              >
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1 font-mono">
                  {metric.value}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-zinc-400 uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <button
            type="button"
            onClick={handleScrollToMenu}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>View Digital Menu</span>
            <i className="fa-solid fa-arrow-down text-xs text-black group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Subtle bottom scroll cue */}
      <div className="pt-4 sm:pt-6 flex flex-col items-center relative z-10">
        <button
          type="button"
          onClick={handleScrollToMenu}
          className="group flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer select-none"
          aria-label="Digital Tariff Card Below"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-zinc-400 group-hover:text-white">
            DIGITAL TARIFF CARD BELOW ↓
          </span>
        </button>
      </div>
    </section>
  );
};



