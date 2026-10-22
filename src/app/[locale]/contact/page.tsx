'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import EnquiryForm from '@/components/forms/EnquiryForm';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="contact-page" style={{ padding: '60px 20px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
              padding: '4px 10px',
              borderRadius: '4px',
              marginBottom: '10px',
            }}
          >
            {t('badge')}
          </span>
          <h1
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '40px',
              fontWeight: 700,
              color: '#1A1A1A',
              marginBottom: '10px',
            }}
          >
            {t('heroTitle')}
          </h1>
          <p
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: '20px',
              color: '#555555',
              maxWidth: '650px',
              margin: '0 auto',
            }}
          >
            {t('heroSubtitle')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          <div style={{ background: '#FAF7F2', padding: '28px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '18px', fontWeight: 700, color: '#B01F24', marginBottom: '8px' }}>
              {t('officeTitle')}
            </h3>
            <p style={{ fontFamily: '"EB Garamond", serif', fontSize: '16px', color: '#333333', lineHeight: '1.6' }}>
              {t('officeAddress')}<br />
              {t('officeHours')}
            </p>
          </div>

          <div style={{ background: '#FAF7F2', padding: '28px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '18px', fontWeight: 700, color: '#00491E', marginBottom: '8px' }}>
              {t('directLinesTitle')}
            </h3>
            <p style={{ fontFamily: '"EB Garamond", serif', fontSize: '16px', color: '#333333', lineHeight: '1.6' }}>
              <strong>Phone:</strong> <a href="tel:+254723261973" style={{ color: '#00491E', textDecoration: 'none' }}>0723 261 973</a><br />
              <strong>WhatsApp:</strong> <a href="https://wa.me/254716953637" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>0716 953 637</a><br />
              <strong>Email:</strong> <a href="mailto:info@kirimarise.co.ke" style={{ color: '#B01F24', textDecoration: 'none' }}>info@kirimarise.co.ke</a>
            </p>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '36px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB' }}>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
