/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { TenderHeroHeader } from './components/TenderHeroHeader';
import { MainMenu } from './components/MainMenu';
import { ActionButtons } from './components/ActionButtons';
import { MenuGallery } from './components/MenuGallery';
import { LightboxModal } from './components/LightboxModal';
import { BookingForm } from './components/BookingForm';
import { LocationAndFooter } from './components/LocationAndFooter';
import { getAssetUrl } from './utils';

// Official Salon Service Category Menu Image Mapping (Cards 1 to 9)
// 1. image1.jpg.jpeg -> Slot 1: Primary Hair Services & Salon Tariff Card (Main Front Menu)
// 2. image2.jpg.jpeg -> Slot 2: Hair Cutting & Precision Styling
// 3. image3.jpg.jpeg -> Slot 3: Luxury Hair Spa & Detox Therapy
// 4. image4.jpg.jpeg -> Slot 4: Hair Color, Highlights & Balayage
// 5. image5.jpg.jpeg -> Slot 5: Skin Rituals & Hydra Facials
// 6. image6.jpg.jpeg -> Slot 6: Beard Sculpting & Men's Spa
// 7. image7.jpg.jpeg -> Slot 7: Hands & Feet Care / Nails
// 8. image8.jpg.jpeg -> Slot 8: Detan, Waxing & Body Glow
// 9. image9.jpg.jpeg -> Slot 9: Bridal & Occasion Packages
export const DEFAULT_IMAGES: string[] = [
  getAssetUrl('image1.jpg.jpeg'),
  getAssetUrl('image2.jpg.jpeg'),
  getAssetUrl('image3.jpg.jpeg'),
  getAssetUrl('image4.jpg.jpeg'),
  getAssetUrl('image5.jpg.jpeg'),
  getAssetUrl('image6.jpg.jpeg'),
  getAssetUrl('image7.jpg.jpeg'),
  getAssetUrl('image8.jpg.jpeg'),
  getAssetUrl('image9.jpg.jpeg'),
];

export default function App() {
  // Maps and displays official menu images directly with no stale cache
  const images = DEFAULT_IMAGES;

  // Gallery hidden by default as requested
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Lightbox active index: 0 to 8, or null when closed
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Preselected service for appointment booking
  const [preselectedService, setPreselectedService] = useState<string>('');

  const handleToggleGallery = () => {
    setIsGalleryOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => {
          const galleryElement = document.getElementById('menu-gallery-section');
          if (galleryElement) {
            galleryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
      return nextState;
    });
  };

  const handleScrollToBooking = () => {
    const bookingElement = document.getElementById('appointment-booking-section');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleBookFromLightbox = (serviceName: string) => {
    setPreselectedService(serviceName);
    setTimeout(() => {
      handleScrollToBooking();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F7] flex flex-col font-sans selection:bg-[#F0EAE1]/20 selection:text-white">
      {/* 
        Clean Header in Pure Deep Matte Black (#0D0D0D)
        - Left: Salon Logo & Name "Enreach Unisex Salon" with subtle Soft Cream badge
        - Right: 3-line hamburger menu icon
      */}
      <Header
        onBookClick={handleScrollToBooking}
        onExploreClick={() => {
          setIsGalleryOpen(true);
          setTimeout(() => {
            document.getElementById('menu-gallery-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onTenderClick={() => {
          document.getElementById('tender-proposal-hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* 
          EXECUTIVE TENDER PROPOSAL HERO HEADER
          Positioned directly ABOVE the Hair Services digital menu
        */}
        <TenderHeroHeader
          onExploreMenu={() => {
            const menuElement = document.getElementById('main-menu-section');
            if (menuElement) {
              menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          onBookAppointment={handleScrollToBooking}
        />

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* 
            1st Main Front Image: Shown prominently on top (Slot 1)
            - 100% clear & bright image with no overlays, + icons, delete buttons, or tags
            - Clicking opens fullscreen Lightbox
          */}
          <MainMenu
            imageSrc={images[0] || getAssetUrl('image1.jpg.jpeg')}
            onImageClick={() => handleOpenLightbox(0)}
          />

        {/* 
          Core Action Buttons (Directly below Main Image)
          - Button 1: "Explore More Services" (Dark Charcoal #181818 with Pearl White/Soft Cream border)
          - Button 2: "Book Appointment" (Soft Cream #F0EAE1 with Matte Black #0D0D0D text)
        */}
        <ActionButtons
          isGalleryOpen={isGalleryOpen}
          onToggleGallery={handleToggleGallery}
          onBookAppointment={handleScrollToBooking}
        />

        {/* 
          Extended Menu Gallery (Images 2 to 9)
          - Revealed together when "Explore More Services" is clicked
          - 100% clear and bright menu cards with no dark hover overlays, + icons, delete buttons, or tags
        */}
        <MenuGallery
          isOpen={isGalleryOpen}
          images={images}
          onImageClick={handleOpenLightbox}
        />

        {/* 
          Appointment Booking Form
          - Fields: Customer Name, Mobile Number, Service Selection dropdown, Preferred Date & Time
          - Primary CTA Button: "Send Request on WhatsApp"
        */}
        <BookingForm preselectedService={preselectedService} />
        </div>

        {/* 
          Maps & Minimal Footer
          - Embedded Google Maps iframe container in Dark Charcoal Black with Pearl White border
          - Pure Deep Matte Black (#0D0D0D) footer featuring Salon Address, Phone Number, and Social links
        */}
        <LocationAndFooter />
      </main>

      {/* Lightbox Modal for any clicked menu card (Images 1 through 9) */}
      <LightboxModal
        currentIndex={activeLightboxIndex}
        images={images}
        onClose={handleCloseLightbox}
        onSelectIndex={setActiveLightboxIndex}
        onBookService={handleBookFromLightbox}
      />
    </div>
  );
}
