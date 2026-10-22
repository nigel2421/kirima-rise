'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ShieldAlert, CheckCircle2, Building2, PhoneCall, AlertTriangle, MessageCircle, Mail } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function NoticePage() {
  const t = useTranslations('notice');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const handleReportWhatsApp = () => {
    const message = locale === 'sw'
      ? 'Habari Shirika la Urithi wa GK Kirima, ningependa kuripoti shughuli ya kutiliwa shaka au akaunti inayodai kuuza viwanja vya Njiru.'
      : 'Hello Estate of GK Kirima, I would like to report suspicious activity or an unauthorized party claiming to represent Kirima Rise Njiru plots.';
    window.open(`https://wa.me/254716953637?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="notice-page" style={{ padding: '60px 20px', background: '#FAF7F2' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#B01F24',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '6px 14px',
              borderRadius: '4px',
              marginBottom: '14px',
            }}
          >
            <ShieldAlert size={14} />
            <span>{t('badge')}</span>
          </span>
          <h1
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '38px',
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
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.5',
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* High Priority Fraud Alert Callout */}
        <div
          style={{
            background: '#FEF2F2',
            border: '2px solid #EF4444',
            borderRadius: '12px',
            padding: '28px',
            marginBottom: '40px',
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            boxShadow: '0 4px 20px rgba(239,68,68,0.08)',
          }}
        >
          <div
            style={{
              background: '#B01F24',
              color: '#FFFFFF',
              padding: '10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={28} />
          </div>
          <div>
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                color: '#991B1B',
                marginBottom: '8px',
              }}
            >
              {t('warningTitle')}
            </h2>
            <p
              style={{
                fontFamily: '"EB Garamond", serif',
                fontSize: '18px',
                color: '#450A0A',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              {t('warningBody')}
            </p>
          </div>
        </div>

        {/* 3 Pillars of Official Verification */}
        <div style={{ marginBottom: '40px' }}>
          <h3
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              color: '#00491E',
              marginBottom: '20px',
            }}
          >
            {t('officialTitle')}
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Card 1: Office */}
            <div
              style={{
                background: '#FFFFFF',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#ECFDF5',
                  color: '#00491E',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Building2 size={22} />
              </div>
              <h4
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: '8px',
                }}
              >
                {t('channel1Title')}
              </h4>
              <p
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '16px',
                  color: '#555555',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {t('channel1Desc')}
              </p>
            </div>

            {/* Card 2: Contact */}
            <div
              style={{
                background: '#FFFFFF',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#EFF6FF',
                  color: '#2563EB',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <PhoneCall size={22} />
              </div>
              <h4
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: '8px',
                }}
              >
                {t('channel2Title')}
              </h4>
              <p
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '16px',
                  color: '#555555',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {t('channel2Desc')}
              </p>
            </div>

            {/* Card 3: Banking */}
            <div
              style={{
                background: '#FFFFFF',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#FEF3C7',
                  color: '#D97706',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CheckCircle2 size={22} />
              </div>
              <h4
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: '8px',
                }}
              >
                {t('channel3Title')}
              </h4>
              <p
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '16px',
                  color: '#555555',
                  lineHeight: '1.5',
                  margin: 0,
                }}
              >
                {t('channel3Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Reporting Section */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '36px',
            border: '1px solid #E5E7EB',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              color: '#1A1A1A',
              marginBottom: '10px',
            }}
          >
            {t('reportTitle')}
          </h3>
          <p
            style={{
              fontFamily: '"EB Garamond", serif',
              fontSize: '18px',
              color: '#555555',
              maxWidth: '650px',
              margin: '0 auto 24px',
              lineHeight: '1.5',
            }}
          >
            {t('reportDesc')}
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleReportWhatsApp}
              style={{
                background: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(37,211,102,0.25)',
              }}
            >
              <MessageCircle size={18} />
              <span>{t('reportCta')} (WhatsApp)</span>
            </button>
            <a
              href="mailto:info@kirimarise.co.ke?subject=Fraud%20Report%20-%20Kirima%20Rise"
              style={{
                background: '#B01F24',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(176,31,36,0.25)',
              }}
            >
              <Mail size={18} />
              <span>{tCommon('emailUs')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
