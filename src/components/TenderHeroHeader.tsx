import React from 'react';

interface TenderHeroHeaderProps {
  onExploreMenu?: () => void;
  onBookAppointment?: () => void;
}

export const TenderHeroHeader: React.FC<TenderHeroHeaderProps> = ({
  onExploreMenu,
}) => {
  const metrics = [
    {
      value: '8+ YEARS',
      label: 'Industry Experience',
    },
    {
      value: '4 YEARS',
      label: 'Main Salon Operational',
    },
    {
      value: '2 YEARS',
      label: 'Wani Branch Expansion',
    },
    {
      value: '10,000+',
      label: 'Satisfied Clients Served',
    },
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
      aria-label="Enreach Executive Introduction & Key Metrics"
      className="w-full min-h-[calc(100svh-64px)] min-h-[calc(100vh-64px)] bg-[#0F0F0F] text-white border-b border-zinc-800/80 flex flex-col justify-between items-center px-4 py-8 sm:py-12 md:py-14"
    >
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center items-center text-center my-auto">
        {/* 
          1. SIMPLE INTRO PARAGRAPH (Top Position):
          Larger, bolder, highly legible on mobile screens for maximum visibility.
        */}
        <div className="mb-8 sm:mb-10 md:mb-12 max-w-3xl px-2 sm:px-4">
          <p className="text-base sm:text-xl md:text-2xl text-white font-medium sm:font-semibold leading-relaxed sm:leading-relaxed md:leading-relaxed text-balance">
            Welcome to <span className="text-white font-bold">Enreach Unisex Salon</span>! I am <span className="text-white font-bold">Vishal Phulguje</span>, bringing over <span className="text-white font-extrabold">8+ years</span> of expertise in professional styling and beauty care. We operate 2 successful branches—our <span className="text-white font-bold">Main Salon</span> (running for 4 years) and <span className="text-white font-bold">Wani Branch</span> (running for 2 years)—having proudly served over <span className="text-white font-extrabold">10,000+ happy clients</span> with premium hygiene and styling standards.
          </p>
        </div>

        {/* 
          2. 4 KEY METRICS CARDS (Positioned Directly Below Paragraph):
          Significantly enlarged numbers: "8+ YEARS", "4 YEARS", "2 YEARS", and "10,000+".
          Compact 2x2 grid on mobile view (and 4 columns on desktop/tablet).
        */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center py-5 px-3 sm:py-7 sm:px-4 rounded-xl bg-zinc-900/70 border border-zinc-800/90 shadow-lg backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/90"
            >
              <div className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black font-mono tabular-nums tracking-tight text-white leading-none mb-2">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-wider leading-snug">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        Scroll cue for seamless user journey to the digital menu posters
      */}
      <div className="pt-6 sm:pt-8 flex flex-col items-center">
        <button
          type="button"
          onClick={handleScrollToMenu}
          className="group flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer select-none"
          aria-label="Scroll down for Hair Services & Tariff Card"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-zinc-400 group-hover:text-zinc-200">
            Scroll down for Hair Services &amp; Tariff Card
          </span>
          <i className="fa-solid fa-chevron-down text-xs text-zinc-400 group-hover:text-white animate-bounce" />
        </button>
      </div>
    </section>
  );
};
