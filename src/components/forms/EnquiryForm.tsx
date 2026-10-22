'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface EnquiryFormProps {
  initialSubject?: string;
  parcelNo?: string;
  block?: string;
}

export default function EnquiryForm({ initialSubject = '', parcelNo, block }: EnquiryFormProps) {
  const t = useTranslations('contact');
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject || (parcelNo ? `Plot Verification: ${parcelNo} (${block || ''})` : ''),
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Simulate/post to enquiry endpoint
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(locale, parcelNo ? { parcelNo, block } : undefined);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="kr-enquiry-form-container" id="kr-enquiry-form-wrapper">
      {submitted ? (
        <div
          style={{
            background: '#F0FDF4',
            border: '2px solid #22C55E',
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#15803D',
          }}
        >
          <h4 style={{ fontWeight: 800, fontSize: '20px', marginBottom: '8px' }}>
            {t('successTitle')}
          </h4>
          <p style={{ fontSize: '15px', color: '#166534' }}>{t('successMessage')}</p>
        </div>
      ) : (
        <form
          id="kirima-enquiry-form"
          onSubmit={handleSubmit}
          className="kr-custom-enquiry-form"
          aria-label="Contact form"
        >
          <p>
            <label>
              {t('nameLabel')}<br />
              <span className="wpcf7-form-control-wrap" data-name="name">
                <input
                  size={40}
                  maxLength={400}
                  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  type="text"
                  name="name"
                  required
                />
              </span>
            </label>
          </p>

          <p>
            <label>
              {t('emailLabel')}<br />
              <span className="wpcf7-form-control-wrap" data-name="email">
                <input
                  size={40}
                  maxLength={400}
                  className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  name="email"
                  required
                />
              </span>
            </label>
          </p>

          <p>
            <label>
              {t('phoneLabel')}<br />
              <span className="wpcf7-form-control-wrap" data-name="phone">
                <input
                  size={40}
                  maxLength={50}
                  className="wpcf7-form-control wpcf7-text"
                  autoComplete="tel"
                  placeholder="e.g. 0722 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  type="tel"
                  name="phone"
                />
              </span>
            </label>
          </p>

          <p>
            <label>
              {t('subjectLabel')}<br />
              <span className="wpcf7-form-control-wrap" data-name="subject">
                <input
                  size={40}
                  maxLength={400}
                  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  type="text"
                  name="subject"
                  required
                />
              </span>
            </label>
          </p>

          <p>
            <label>
              {t('messageLabel')}<br />
              <span className="wpcf7-form-control-wrap" data-name="message">
                <textarea
                  cols={40}
                  rows={6}
                  maxLength={2000}
                  className="wpcf7-form-control wpcf7-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  name="message"
                />
              </span>
            </label>
          </p>

          {/* Dual Submission Buttons: Email & WhatsApp */}
          <div
            className="kr-form-actions-wrap"
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px' }}
          >
            <button
              type="submit"
              id="kirima-submit-btn"
              className="kr-form-btn-email"
              disabled={submitting}
              style={{
                flex: '1 1 200px',
                background: '#bo1f24',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 22px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 3px 10px rgba(151,11,16,0.25)',
              }}
            >
              <svg style={{ width: '18px', height: '18px', fill: '#FFFFFF' }} viewBox="0 0 512 512">
                <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
              </svg>
              <span>{submitting ? '...' : t('submitEmail')}</span>
            </button>

            <button
              type="button"
              id="kr-whatsapp-submit-btn"
              className="kr-form-btn-whatsapp"
              onClick={handleWhatsApp}
              style={{
                flex: '1 1 200px',
                background: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 22px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 3px 10px rgba(37,211,102,0.25)',
              }}
            >
              <svg style={{ width: '18px', height: '18px', fill: '#FFFFFF' }} viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              <span>{t('submitWhatsApp')}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
