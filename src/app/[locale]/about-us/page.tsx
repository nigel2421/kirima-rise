'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function AboutUsPage() {
  const t = useTranslations('story');

  return (
    <div className="about-us-page-wrapper">
      {/* 1. HERO SECTION (100% Matching about/index.html) */}
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
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={1024}
                height={845}
                src="/wp-content/uploads/2026/08/story-title-deed-e1787405742215.jpg"
                alt="Kirima Rise Title Deed Handover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. FROM NJIRU TO KIRIMA RISE NARRATIVE */}
      <div id="next" className="kr-story-narrative-section">
        <div className="kr-story-narrative-inner">
          <h2 className="kr-narrative-heading">
            <strong>{t('fromNjiruTitle')} </strong>
            {t('fromNjiruTitleSuffix')}
          </h2>
          <div className="kr-narrative-red-line" />
          <p className="kr-narrative-lead">{t('fromNjiruBody')}</p>

          <div className="kr-story-cards-grid">
            {/* Card 1: Why the Name Is Kirima Rise */}
            <div className="kr-story-card">
              <h3 className="kr-story-card-title">{t('whyNameTitle')}</h3>
              <div className="kr-story-card-body">
                <p>{t('whyNameP1')}</p>
                <p>{t('whyNameP2')}</p>
                <p>{t('whyNameP3')}</p>
              </div>
            </div>

            {/* Card 2: The Name Begins with Kirima */}
            <div className="kr-story-card">
              <h3 className="kr-story-card-title">{t('nameBeginsTitle')}</h3>
              <div className="kr-story-card-body">
                <p>{t('nameBeginsP1')}</p>
                <p>{t('nameBeginsP2')}</p>
              </div>
            </div>

            {/* Card 3: What Kirima Rise Is Becoming */}
            <div className="kr-story-card">
              <h3 className="kr-story-card-title">{t('becomingTitle')}</h3>
              <div className="kr-story-card-body">
                <p>{t('becomingP1')}</p>
                <p>{t('becomingP2')}</p>
                <p>{t('becomingP3')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BRAND CREST & TAGLINE */}
      <div className="kr-story-bottom-crest-section">
        <div className="kr-story-bottom-crest-inner">
          <div className="kr-brand-crest-box">
            <img
              decoding="async"
              src="/wp-content/uploads/2026/07/white-brand-mark.png"
              alt="Kirima Rise Crest"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="kr-brand-crest-text">
              <strong>{t('crestTitle')}</strong>
              <br />
              <span>{t('crestSubtitle')}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
