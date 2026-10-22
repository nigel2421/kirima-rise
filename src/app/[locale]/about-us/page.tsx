'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function AboutUsPage() {
  const tNav = useTranslations('nav');
  const tBecoming = useTranslations('becoming');
  const tHeritage = useTranslations('heritage');

  return (
    <div className="about-us-page">
      {/* 1. Header Hero Display */}
      <div
        className="elementor-element elementor-element-45370261 e-flex e-con-boxed e-con e-parent"
        data-id="45370261"
        data-element_type="container"
        style={{ padding: '60px 20px 20px', background: '#FFFFFF' }}
      >
        <div className="e-con-inner" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div className="elementor-element elementor-element-16c6622 elementor-widget elementor-widget-page-title">
            <div className="elementor-widget-container">
              <div className="hfe-page-title hfe-page-title-wrapper elementor-widget-heading">
                <h1
                  className="elementor-heading-title elementor-size-default"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: '48px',
                    fontWeight: 700,
                    color: '#00491E',
                    marginBottom: '16px',
                  }}
                >
                  {tNav('ourStory')}
                </h1>
              </div>
            </div>
          </div>

          <div className="elementor-element elementor-element-79ea9959 elementor-widget__width-initial elementor-widget elementor-widget-text-editor">
            <div className="elementor-widget-container">
              <p
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontSize: '22px',
                  lineHeight: '1.6',
                  color: '#333333',
                  maxWidth: '850px',
                }}
              >
                {tHeritage('founderStory')}
              </p>
            </div>
          </div>

          <div
            className="elementor-element elementor-element-f231136 elementor-widget"
            style={{ marginTop: '30px' }}
          >
            <div className="elementor-widget-container">
              <img
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={1024}
                height={845}
                src="/wp-content/uploads/2026/08/story-title-deed-e1787405742215.jpg"
                title="story-title-deed"
                alt="Our Story Title Deed"
                className="attachment-large size-large wp-image-462"
                style={{ borderRadius: '8px', width: '100%', maxHeight: '520px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. From Njiru to Kirima Rise Narrative */}
      <div
        className="elementor-element elementor-element-5bb054e8 e-flex e-con-boxed e-con e-parent"
        id="next"
        style={{ padding: '40px 20px', background: '#FAF7F2' }}
      >
        <div className="e-con-inner" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div className="elementor-element elementor-element-667cf98 e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-9af4cbd elementor-widget elementor-widget-text-editor">
              <div className="elementor-widget-container">
                <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '32px', color: '#B01F24', fontWeight: 800 }}>
                  <strong>From Njiru </strong>to Kirima Rise
                </h2>
              </div>
            </div>

            <div className="elementor-element elementor-element-b868a6b elementor-widget elementor-widget-text-editor" style={{ marginTop: '16px' }}>
              <div className="elementor-widget-container">
                <h4 style={{ fontFamily: '"EB Garamond", serif', fontSize: '20px', lineHeight: '1.7', color: '#1A1A1A' }}>
                  {tBecoming('paragraph1')}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Legacy & Pillars */}
      <div
        className="elementor-element elementor-element-ea5e670 e-flex e-con-boxed e-con e-parent"
        style={{ padding: '50px 20px', background: '#FFFFFF' }}
      >
        <div className="e-con-inner" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ background: '#FAF7F2', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #B01F24' }}>
              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>
                {tHeritage('pillar1Title')}
              </h3>
              <p style={{ fontFamily: '"EB Garamond", serif', fontSize: '17px', lineHeight: '1.6', color: '#555555' }}>
                {tHeritage('pillar1Desc')}
              </p>
            </div>

            <div style={{ background: '#FAF7F2', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #00491E' }}>
              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>
                {tHeritage('pillar2Title')}
              </h3>
              <p style={{ fontFamily: '"EB Garamond", serif', fontSize: '17px', lineHeight: '1.6', color: '#555555' }}>
                {tHeritage('pillar2Desc')}
              </p>
            </div>

            <div style={{ background: '#FAF7F2', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #B01F24' }}>
              <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>
                {tHeritage('pillar3Title')}
              </h3>
              <p style={{ fontFamily: '"EB Garamond", serif', fontSize: '17px', lineHeight: '1.6', color: '#555555' }}>
                {tHeritage('pillar3Desc')}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link
              href="/plots"
              className="elementor-button elementor-button-link"
              style={{
                display: 'inline-block',
                background: '#00491E',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '6px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {tNav('plots')} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
