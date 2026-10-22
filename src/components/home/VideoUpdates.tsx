'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function VideoUpdates() {
  const t = useTranslations('videoUpdates');

  return (
    <div
      className="elementor-element elementor-element-1a4cf43 e-flex e-con-boxed e-con e-parent"
      data-id="1a4cf43"
      data-element_type="container"
      data-settings='{"background_background":"classic"}'
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-7ffdfba e-con-full e-flex e-con e-child kr-news-container"
          data-id="7ffdfba"
          data-element_type="container"
          data-e-type="container"
        >
          <div className="kr-news-header">
            <div className="kr-news-header-left">
              <span className="kr-news-eyebrow">{t('eyebrow')}</span>
              <h2 className="kr-news-title">{t('title')}</h2>
              <p className="kr-news-subtitle">{t('subtitle')}</p>
            </div>
            <div className="kr-news-header-right">
              <a
                href="https://youtu.be/uN245DBYPt8?si=6bHmHNyZl6zcH2Y9"
                target="_blank"
                rel="noopener noreferrer"
                className="kr-yt-follow-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                {t('watchOnYouTube')}
              </a>
            </div>
          </div>

          <div className="kr-news-grid">
            {/* Video 1: Title Deeds */}
            <article className="kr-news-card">
              <div className="kr-news-video-wrap">
                <iframe
                  className="kr-news-iframe"
                  src="https://www.youtube-nocookie.com/embed/uN245DBYPt8?rel=0"
                  title="First Batch of Title Deeds Issued to Njiru Residents - Kirima Rise"
                  loading="lazy"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <span className="kr-news-badge">{t('badgeTitleDeeds')}</span>
                <span className="kr-news-media-pill">YouTube Video</span>
              </div>
              <div className="kr-news-body">
                <div className="kr-news-meta">
                  <span className="kr-news-category">{t('officialRelease')}</span>
                  <span className="kr-news-dot">•</span>
                  <span className="kr-news-source">Kirima Rise</span>
                </div>
                <h3 className="kr-news-heading">{t('video1Title')}</h3>
                <p className="kr-news-desc">{t('video1Desc')}</p>
              </div>
            </article>

            {/* Video 2: Engagement */}
            <article className="kr-news-card">
              <div className="kr-news-video-wrap">
                <iframe
                  className="kr-news-iframe"
                  src="https://www.youtube-nocookie.com/embed/g2T5B1p53mE?rel=0"
                  title="Stakeholder, Financial & Resident Engagement - Kirima Rise"
                  loading="lazy"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <span className="kr-news-badge">{t('badgeCommunity')}</span>
                <span className="kr-news-media-pill">YouTube Video</span>
              </div>
              <div className="kr-news-body">
                <div className="kr-news-meta">
                  <span className="kr-news-category">{t('engagement')}</span>
                  <span className="kr-news-dot">•</span>
                  <span className="kr-news-source">Kirima Rise</span>
                </div>
                <h3 className="kr-news-heading">{t('video2Title')}</h3>
                <p className="kr-news-desc">{t('video2Desc')}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
