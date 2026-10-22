'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import PlotDirectory from '@/components/plots/PlotDirectory';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { Plot } from '@/lib/plots';

export default function PlotsPage() {
  const t = useTranslations('plots');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const handleSelectPlot = (plot: Plot) => {
    setSelectedPlot(plot);
    const formElement = document.getElementById('kr-enquiry-form-wrapper');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="plots-directory-page" style={{ padding: '60px 20px', background: '#FAF7F2' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              display: 'inline-block',
              background: '#00491E',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '4px',
              marginBottom: '12px',
            }}
          >
            {t('badgeVerified')}
          </span>
          <h1
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '40px',
              fontWeight: 700,
              color: '#1A1A1A',
              marginBottom: '12px',
            }}
          >
            {t('title')}
          </h1>
          <p
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: '20px',
              color: '#555555',
              maxWidth: '750px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            {t('description')}
          </p>
        </div>

        {/* Interactive Directory */}
        <div style={{ marginBottom: '60px' }}>
          <PlotDirectory
            onSelectPlot={handleSelectPlot}
            selectedPlotId={selectedPlot?.fullCode}
          />
        </div>

        {/* Selected Plot Notification & Enquiry Form Section */}
        <div
          id="kr-enquiry-form-wrapper"
          style={{
            background: '#FFFFFF',
            padding: '40px 32px',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {selectedPlot && (
            <div
              style={{
                background: '#F0FDF4',
                border: '1px solid #86EFAC',
                borderRadius: '8px',
                padding: '16px 20px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <strong style={{ color: '#166534', fontSize: '15px' }}>
                  {t('autoFillNotice')}
                </strong>
                <p style={{ margin: '4px 0 0', color: '#15803D', fontSize: '13px' }}>
                  {selectedPlot.fullCode} &bull; {selectedPlot.size} &bull; {selectedPlot.status === 'available' ? t('statusAvailable') : t('statusSold')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlot(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#15803D',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Clear
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '28px',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '8px',
              }}
            >
              {selectedPlot
                ? `${t('ctaEnquire')} - ${selectedPlot.fullCode}`
                : t('ctaEnquire')}
            </h2>
            <p
              style={{
                fontFamily: '"EB Garamond", serif',
                fontSize: '17px',
                color: '#666666',
              }}
            >
              {t('noResultsDesc')}
            </p>
          </div>

          <EnquiryForm
            key={selectedPlot ? selectedPlot.fullCode : 'general'}
            parcelNo={selectedPlot?.parcelNo}
            block={selectedPlot?.block}
            initialSubject={selectedPlot ? `Plot Verification: ${selectedPlot.fullCode}` : ''}
          />
        </div>
      </div>
    </div>
  );
}
