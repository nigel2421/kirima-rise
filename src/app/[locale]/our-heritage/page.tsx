'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function OurHeritagePage() {
  const tNav = useTranslations('nav');
  const tHeritage = useTranslations('heritage');

  return (
    <div className="our-heritage-page">
      {/* 1. Header Hero Display */}
      <div
        className="elementor-element elementor-element-64a64148 e-flex e-con-boxed e-con e-parent"
        data-id="64a64148"
        data-element_type="container"
        style={{ padding: '60px 20px 20px', background: '#FFFFFF' }}
      >
        <div className="e-con-inner" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div className="elementor-element elementor-element-1346f21b elementor-widget elementor-widget-page-title">
            <div className="elementor-widget-container">
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
                {tNav('ourHeritage')}
              </h1>
            </div>
          </div>

          <div className="elementor-element elementor-element-5e860c2d elementor-widget-text-editor">
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
                {tHeritage('heroSubtitle')}
              </p>
            </div>
          </div>

          <div className="elementor-element elementor-element-574195f8 elementor-widget" style={{ marginTop: '30px' }}>
            <div className="elementor-widget-container">
              <img
                loading="lazy"
                decoding="async"
                width={513}
                height={438}
                src="/wp-content/uploads/2026/09/Asset-1@2x-100.jpg"
                alt="Kirima Rise Heritage"
                className="attachment-large size-large wp-image-801"
                style={{ borderRadius: '8px', maxHeight: '440px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. The Man Behind the Name */}
      <div
        className="elementor-element elementor-element-1de1882 e-flex e-con-boxed e-con e-parent"
        id="next"
        style={{ padding: '60px 20px', background: '#FAF7F2' }}
      >
        <div className="e-con-inner" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <img
                decoding="async"
                width={307}
                height={581}
                src="/wp-content/uploads/2026/09/kirima-e1790581018303.jpg"
                alt="Gerishon Kamau Kirima"
                className="attachment-large size-large wp-image-721"
                style={{ borderRadius: '8px', width: '100%', maxWidth: '340px', objectFit: 'cover', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              />
            </div>

            <div className="elementor-element elementor-element-6a09741 e-con-full e-flex e-con e-child">
              <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '32px', color: '#B01F24', fontWeight: 800, marginBottom: '16px' }}>
                {tHeritage('founderTitle')}
              </h2>
              <div style={{ fontFamily: '"EB Garamond", serif', fontSize: '18px', lineHeight: '1.8', color: '#222222' }}>
                <p style={{ marginBottom: '16px' }}>{tHeritage('historyBody1')}</p>
                <p style={{ marginBottom: '16px' }}>{tHeritage('historyBody2')}</p>
                <p>{tHeritage('historyBody3')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Land That Fed Nairobi & Modern Regularisation */}
      <div
        className="elementor-element elementor-element-4cb7687 e-flex e-con-boxed e-con e-parent"
        style={{ padding: '60px 20px', background: '#FFFFFF' }}
      >
        <div className="e-con-inner" style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '30px', color: '#00491E', fontWeight: 700, marginBottom: '16px' }}>
              The Land That Fed Nairobi — Now Secure Property Ownership
            </h2>
            <p style={{ fontFamily: '"EB Garamond", serif', fontSize: '19px', lineHeight: '1.7', color: '#555555', marginBottom: '32px' }}>
              The land at Njiru was never idle. Today, through official court and county frameworks, the Estate of G.K. Kirima is proud to facilitate verified freehold title issuance for residents and aspiring property owners.
            </p>
            <Link
              href="/plots"
              className="elementor-button elementor-button-link"
              style={{
                display: 'inline-block',
                background: '#B01F24',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '6px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Explore Verified Parcels &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
