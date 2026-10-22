'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('header');
  const tNav = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutSubOpen, setMobileAboutSubOpen] = useState(false);

  return (
    <>
      {/* ======================================================== */}
      {/* KIRIMA RISE CUSTOM BRAND HEADER                            */}
      {/* Fully mirrored from brand guidelines (Pantone 2357 C & 3537 C) */}
      {/* ======================================================== */}
      <header
        className={`kr-brand-header ${mobileMenuOpen ? 'kr-mobile-menu-active' : ''}`}
        id="kr-site-header"
      >
        {/* Top Fraud Alert Banner */}
        <div
          className="kr-brand-topbar"
          style={{ backgroundColor: '#B01F24', color: '#FFFFFF' }}
        >
          <div className="kr-brand-topbar-inner">
            <span className="kr-topbar-icon" aria-hidden="true">
              <svg viewBox="0 0 512 512">
                <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
              </svg>
            </span>
            <p className="kr-topbar-text">
              <strong>IMPORTANT</strong> &mdash; {t('fraudWarning')}
            </p>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="kr-brand-navbar" aria-label="Main Navigation">
          <div className="kr-brand-navbar-inner">
            {/* Left: Navigation Links */}
            <div className="kr-nav-left">
              <ul className="kr-nav-list">
                <li className="kr-nav-item">
                  <Link href="/" className="kr-nav-link kr-active">
                    {tNav('home').toUpperCase()}
                  </Link>
                </li>
                <li className="kr-nav-item kr-has-dropdown">
                  <a
                    href="#"
                    className="kr-nav-link kr-dropdown-toggle"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>{tNav('about').toUpperCase()}</span>
                    <svg
                      className="kr-chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </a>
                  <ul className="kr-dropdown-menu">
                    <li>
                      <Link href="/about-us" className="kr-dropdown-link">
                        {tNav('ourStory')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/our-heritage" className="kr-dropdown-link">
                        {tNav('ourHeritage')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="kr-nav-item">
                  <Link href="/plots" className="kr-nav-link">
                    {tNav('plots').toUpperCase()}
                  </Link>
                </li>
                <li className="kr-nav-item">
                  <Link href="/contact" className="kr-nav-link">
                    {tNav('contact').toUpperCase()}
                  </Link>
                </li>
                {/* Desktop Language Switcher */}
                <li className="kr-nav-item" style={{ marginLeft: '6px' }}>
                  <LanguageSwitcher />
                </li>
              </ul>
            </div>

            {/* Center: Brand Logo */}
            <div className="kr-nav-center">
              <Link href="/" className="kr-brand-logo-link" aria-label="Kirima Rise Home">
                <img
                  src="/wp-content/uploads/2026/07/cropped-Kirima-Rise-Logo-01-scaled-1-1024x637.png"
                  alt="Kirima Rise Logo"
                  className="kr-brand-logo-img"
                />
              </Link>
            </div>

            {/* Right: Action CTA & Mobile Toggle */}
            <div className="kr-nav-right">
              <Link href="/contact" className="kr-btn-enquire">
                <span>{tNav('enquire').toUpperCase()}</span>
                <svg
                  className="kr-btn-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                className="kr-mobile-toggle"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="kr-hamburger-bar" />
                <span className="kr-hamburger-bar" />
                <span className="kr-hamburger-bar" />
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          <div className="kr-mobile-drawer" id="kr-mobile-drawer">
            <ul className="kr-mobile-nav-list">
              <li>
                <Link
                  href="/"
                  className="kr-mobile-nav-link kr-active"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tNav('home').toUpperCase()}
                </Link>
              </li>
              <li
                className={`kr-mobile-has-sub ${
                  mobileAboutSubOpen ? 'kr-sub-expanded' : ''
                }`}
              >
                <div className="kr-mobile-sub-toggle">
                  <Link
                    href="/about-us"
                    className="kr-mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tNav('about').toUpperCase()}
                  </Link>
                  <button
                    type="button"
                    className="kr-mobile-sub-btn"
                    aria-label="Toggle About submenu"
                    onClick={() => setMobileAboutSubOpen(!mobileAboutSubOpen)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
                <ul className="kr-mobile-sub-list">
                  <li>
                    <Link
                      href="/about-us"
                      className="kr-mobile-sub-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {tNav('ourStory')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/our-heritage"
                      className="kr-mobile-sub-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {tNav('ourHeritage')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href="/plots"
                  className="kr-mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tNav('plots').toUpperCase()}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="kr-mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tNav('contact').toUpperCase()}
                </Link>
              </li>
            </ul>

            {/* Mobile Language Switcher */}
            <div
              style={{
                padding: '16px 0 12px 0',
                borderBottom: '1px solid rgba(0, 73, 30, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--kr-font-sans)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#555555',
                  textTransform: 'uppercase',
                }}
              >
                Language / Lugha:
              </span>
              <LanguageSwitcher isMobile={true} />
            </div>

            <div className="kr-mobile-drawer-cta">
              <Link
                href="/contact"
                className="kr-btn-enquire kr-btn-enquire-mobile"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '12px',
                  padding: '12px 24px',
                }}
              >
                <span>{tNav('enquire').toUpperCase()}</span>
                <svg
                  className="kr-btn-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* ======================================================== */}
      {/* 1ST BATCH RELEASED PLOTS NOTICE BANNER / HOMEPAGE CTA    */}
      {/* ======================================================== */}
      <div className="kr-home-banner-wrapper">
        <div className="kr-home-notice-bar">
          <div className="kr-notice-left">
            <span className="kr-notice-tag">{t('noticeTag')}</span>
            <div className="kr-notice-content">
              <strong>{t('noticeTitle')}</strong> &mdash; {t('noticeBody')}
            </div>
          </div>
          <div className="kr-notice-actions">
            <Link href="/plots" className="kr-notice-btn-search">
              <svg viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 14z" />
              </svg>
              <span>{t('viewPlotsBtn')}</span>
            </Link>
            <Link href="/contact" className="kr-notice-btn-enquire">
              <span>{t('inquiryFormBtn')} &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
