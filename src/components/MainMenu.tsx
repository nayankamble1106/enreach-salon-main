import React from 'react';
import { ImageSlot } from './ImageSlot';

interface MainMenuProps {
  imageSrc?: string;
  onImageClick: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  imageSrc = './image1.jpg.jpeg',
  onImageClick,
}) => {
  const primarySrc = imageSrc || './image1.jpg.jpeg';

  return (
    <section id="main-menu-section" className="w-full px-3 pt-8 pb-3 sm:px-6 sm:pt-10 flex flex-col items-center scroll-mt-16">
      {/* Hair Services Digital Menu Title */}
      <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
        <span className="w-2.5 h-[1px] bg-zinc-600" />
        <span className="text-[11px] sm:text-xs uppercase font-sans tracking-[0.22em] text-zinc-300 font-semibold">
          Hair Services &amp; Salon Tariff Card
        </span>
        <span className="w-2.5 h-[1px] bg-zinc-600" />
      </div>

      <div className="w-full max-w-md">
        <ImageSlot
          slotNumber={1}
          slotTitle="Primary Hair Services &amp; Salon Tariff Card"
          imageSrc={primarySrc}
          onClick={onImageClick}
          isMainSlot={true}
        />
      </div>
    </section>
  );
};
