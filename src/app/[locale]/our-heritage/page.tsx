'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function OurHeritagePage() {
  const t = useTranslations('heritage');

  const timelineItems = [
    { badge: t('m1Badge'), desc: t('m1Desc') },
    { badge: t('m2Badge'), desc: t('m2Desc') },
    { badge: t('m3Badge'), desc: t('m3Desc') },
    { badge: t('m4Badge'), desc: t('m4Desc') },
    { badge: t('m5Badge'), desc: t('m5Desc') },
    { badge: t('m6Badge'), desc: t('m6Desc') },
    { badge: t('m7Badge'), desc: t('m7Desc') },
    { badge: t('m8Badge'), desc: t('m8Desc') },
    { badge: t('m9Badge'), desc: t('m9Desc') },
  ];

  return (
    <div className="our-heritage-page-wrapper">
      {/* 1. HERO SECTION (100% Matching our-heritage/index.html) */}
      <div className="kr-inner-hero">
        <div className="kr-inner-hero-inner">
          <div className="kr-inner-hero-content">
            <div className="kr-hero-left">
              <h1 className="kr-page-title-heading">{t('title')}</h1>
              <p className="kr-page-subtitle-text">{t('subtitle')}</p>
              <div className="kr-hero-divider" />
              <a href="#next" className="kr-explore-btn">
                <svg aria-hidden="true" viewBox="0 0 256 512">
                  <path d="M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z" />
                </svg>
                <span>{t('explore')}</span>
              </a>
            </div>
            <div className="kr-hero-image-wrap">
              <img
                loading="eager"
                decoding="async"
                width={513}
                height={438}
                src="/wp-content/uploads/2026/09/Asset-1@2x-100.jpg"
                alt="Kirima Rise Heritage"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE MAN BEHIND THE NAME (PORTRAIT & BIOGRAPHY) */}
      <div id="next" className="kr-heritage-profile-section">
        <div className="kr-heritage-profile-inner">
          <div className="kr-heritage-portrait-col">
            <img
              decoding="async"
              width={307}
              height={581}
              src="/wp-content/uploads/2026/09/kirima-e1790581018303.jpg"
              alt="Gerishon Kamau Kirima"
            />
          </div>
          <div className="kr-heritage-narrative-col">
            <h2 className="kr-narrative-heading" style={{ textAlign: 'left' }}>
              <strong>{t('manBehindTitle')} </strong>
              {t('manBehindTitleSuffix')}
            </h2>
            <div className="kr-narrative-red-line" style={{ margin: '0 0 24px 0' }} />
            <div className="kr-story-card-body" style={{ fontSize: '19px', lineHeight: '1.8' }}>
              <p>{t('manBehindP1')}</p>
              <p>{t('manBehindP2')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. OPENING DOORS THAT HAD BEEN CLOSED & THE 5 RED-BORDERED HERITAGE CARDS */}
      <div className="kr-story-narrative-section" style={{ background: '#FFFFFF', padding: '60px 20px 40px 20px' }}>
        <div className="kr-story-narrative-inner" style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Chapter: Opening Doors That Had Been Closed */}
          <div style={{ marginBottom: '40px' }}>
            <h2 className="kr-narrative-heading" style={{ textAlign: 'left', marginBottom: '14px' }}>
              <strong>{t('openingDoorsTitle')} </strong>
              {t('openingDoorsTitleSuffix')}
            </h2>
            <div className="kr-narrative-red-line" style={{ margin: '0 0 24px 0' }} />
            <div className="kr-story-card-body" style={{ fontSize: '19px', lineHeight: '1.8' }}>
              <p>{t('openingDoorsP1')}</p>
              <p>{t('openingDoorsP2')}</p>
            </div>
          </div>

          {/* 5 Prominent Red-Bordered Heritage Cards (Strict Mirror of our-heritage/index.html) */}
          <div className="kr-heritage-cards-container">
            {/* Card 1: The Land That Fed Nairobi */}
            <div className="kr-heritage-card">
              <p className="kr-heritage-card-title">
                <strong>{t('landFedTitle')}</strong>
              </p>
              <div className="kr-heritage-card-body">
                <p>{t('landFedP')}</p>
              </div>
            </div>

            {/* Card 2: A Life of Service */}
            <div className="kr-heritage-card">
              <p className="kr-heritage-card-title">
                <strong>{t('lifeServiceTitle')}</strong>
              </p>
              <div className="kr-heritage-card-body">
                <p>{t('lifeServiceP')}</p>
              </div>
            </div>

            {/* Card 3: A Life of Faith */}
            <div className="kr-heritage-card">
              <p className="kr-heritage-card-title">
                <strong>{t('lifeFaithTitle')}</strong>
              </p>
              <div className="kr-heritage-card-body">
                <p>{t('lifeFaithP1')}</p>
                <p>{t('lifeFaithP2')}</p>
              </div>
            </div>

            {/* Card 4: The Measure of the Man */}
            <div className="kr-heritage-card">
              <p className="kr-heritage-card-title">
                <strong>{t('measureManTitle')}</strong>
              </p>
              <div className="kr-heritage-card-body">
                <p>{t('measureManP1')}</p>
                <p>{t('measureManP2')}</p>
              </div>
              <div className="kr-heritage-card-quote">
                {t('quote')}
              </div>
            </div>

            {/* Card 5: Investing in the Next Generation */}
            <div className="kr-heritage-card">
              <p className="kr-heritage-card-title">
                <strong>{t('investingTitle')}</strong>
              </p>
              <div className="kr-heritage-card-body">
                <p>{t('investingP1')}</p>
                <p>{t('investingP2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TIMELINE: A LIFE IN BRIEF */}
      <div className="kr-timeline-section">
        <div className="kr-timeline-inner">
          <div className="kr-timeline-header">
            <h2 className="kr-timeline-title">
              <strong>{t('timelineTitle')}</strong>
            </h2>
          </div>

          <div className="kr-timeline-list">
            {timelineItems.map((item, idx) => (
              <div key={idx} className="kr-timeline-item">
                <div className="kr-timeline-divider-icon" aria-hidden="true">
                  <svg viewBox="0 0 512 512">
                    <path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z" />
                  </svg>
                </div>
                <div className="kr-timeline-box">
                  <span className="kr-timeline-badge">{item.badge}</span>
                  <p className="kr-timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
