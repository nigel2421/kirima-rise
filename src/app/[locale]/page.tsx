'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import HeroSection from '@/components/home/HeroSection';
import BecomingSection from '@/components/home/BecomingSection';
import VideoUpdates from '@/components/home/VideoUpdates';
import PlotDirectory from '@/components/plots/PlotDirectory';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { Plot } from '@/lib/plots';

export default function HomePage() {
  const tPlots = useTranslations('plots');
  const tContact = useTranslations('contact');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const handleSelectPlot = (plot: Plot) => {
    setSelectedPlot(plot);
    const formElement = document.getElementById('kr-enquiry-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page-content">
      {/* 1. Official Hero Section */}
      <HeroSection />

      {/* 2. What Kirima Rise Is Becoming */}
      <BecomingSection />

      {/* 3. Interactive Plot Directory Section */}
      <section className="py-16 bg-[#FAF7F2] border-t border-b border-[#E5E7EB]" id="plots-directory">
        <div className="elementor-container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#E10600',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              {tPlots('badgeVerified')}
            </span>
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '32px',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '8px',
              }}
            >
              {tPlots('title')}
            </h2>
            <p
              style={{
                fontFamily: '"EB Garamond", Georgia, serif',
                fontSize: '18px',
                color: '#555555',
                maxWidth: '680px',
                margin: '0 auto',
              }}
            >
              {tPlots('description')}
            </p>
          </div>

          <PlotDirectory
            onSelectPlot={handleSelectPlot}
            selectedPlotId={selectedPlot?.id}
          />
        </div>
      </section>

      {/* 4. Official Video Updates & Stakeholder Engagements */}
      <VideoUpdates />

      {/* 5. Verification & Enquiry Form */}
      <section
        id="kr-enquiry-section"
        className="py-16 bg-white border-t border-[#E5E7EB]"
        style={{ padding: '60px 20px' }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '30px',
                fontWeight: 700,
                color: '#00491E',
                marginBottom: '8px',
              }}
            >
              {tContact('heroTitle')}
            </h2>
            <p
              style={{
                fontFamily: '"EB Garamond", Georgia, serif',
                fontSize: '18px',
                color: '#555555',
              }}
            >
              {selectedPlot
                ? `${tPlots('tableParcel')}: ${selectedPlot.parcelNo} (${selectedPlot.block})`
                : tContact('heroSubtitle')}
            </p>
          </div>

          <EnquiryForm
            parcelNo={selectedPlot?.parcelNo}
            block={selectedPlot?.block}
            initialSubject={selectedPlot ? `Inquiry for Plot ${selectedPlot.parcelNo} (${selectedPlot.block})` : ''}
          />
        </div>
      </section>
    </div>
  );
}
