'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function OurHeritagePage() {
  const t = useTranslations('heritage');

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

      {/* 2. THE MAN BEHIND THE NAME (PORTRAIT & NARRATIVE) */}
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

      {/* 3. HERITAGE CHAPTERS */}
      <div className="kr-story-narrative-section" style={{ background: '#FFFFFF', paddingTop: '10px' }}>
        <div className="kr-story-narrative-inner">
          <div className="kr-story-cards-grid">
            {/* Chapter 1: Opening Doors That Had Been Closed */}
            <div className="kr-story-card">
              <h3 className="kr-story-card-title">
                <strong>{t('openingDoorsTitle')} </strong>
                {t('openingDoorsTitleSuffix')}
              </h3>
              <div className="kr-story-card-body">
                <p>{t('openingDoorsP1')}</p>
                <p>{t('openingDoorsP2')}</p>
              </div>
            </div>

            {/* Chapter 2: The Land That Fed Nairobi */}
            <div className="kr-story-card">
              <h3 className="kr-story-card-title">{t('landFedTitle')}</h3>
              <div className="kr-story-card-body">
                <p>{t('landFedP')}</p>
              </div>
            </div>

            {/* Chapter 3: A Life of Service */}
            <div className="kr-story-card">
              <h3 className="kr-story-card-title">{t('lifeServiceTitle')}</h3>
              <div className="kr-story-card-body">
                <p>{t('lifeServiceP')}</p>
              </div>
            </div>

            {/* Chapter 4: A Life of Faith */}
            <div className="kr-story-card">
              <h3 className="kr-story-card-title">{t('lifeFaithTitle')}</h3>
              <div className="kr-story-card-body">
                <p>{t('lifeFaithP1')}</p>
                <p>{t('lifeFaithP2')}</p>
              </div>
            </div>

            {/* Chapter 5: The Measure of the Man */}
            <div className="kr-story-card">
              <h3 className="kr-story-card-title">{t('measureManTitle')}</h3>
              <div className="kr-story-card-body">
                <p>{t('measureManP1')}</p>
                <p>{t('measureManP2')}</p>
              </div>
              <div className="kr-heritage-quote-box">
                {t('quote')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
