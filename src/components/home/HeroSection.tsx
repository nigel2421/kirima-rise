'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');

  return (
    <section className="kr-hero-section">
      <div className="kr-hero-container">
        {/* Top Display Heading */}
        <div className="kr-hero-headline-wrap">
          <h1 className="kr-hero-display-title">
            {t('title')}<br />
            <span className="kr-hero-display-subtitle">{t('subtitle')}</span>
          </h1>
        </div>

        {/* Asymmetrical 2-Column Grid */}
        <div className="kr-hero-grid">
          {/* Left Column: Story, Accent & Button */}
          <div className="kr-hero-story-col">
            <h2 className="kr-hero-subhead">{t('becomingTitle')}</h2>
            <p className="kr-hero-body-text">{t('becomingBody')}</p>

            {/* Vertical Accent Indicator */}
            <div className="kr-hero-accent-line" aria-hidden="true" />

            {/* Call to Action */}
            <div className="kr-hero-cta-wrap">
              <Link href="/about-us" className="kr-hero-learn-btn">
                <span>{tCommon('learnMore')}</span>
                <svg
                  className="kr-hero-arrow-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Layered Family Portrait */}
          <div className="kr-hero-visual-col">
            <div className="kr-hero-layered-frame">
              <div className="kr-hero-plate-backing" aria-hidden="true" />
              <div className="kr-hero-image-card">
                <img
                  src="/wp-content/uploads/2026/08/hero-family-e1787416401279.jpg"
                  alt="The Kirima Family at Kirima Rise"
                  className="kr-hero-family-photo"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
