'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import FraudBanner from './FraudBanner';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('header');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  return (
    <header className="site-header">
      {/* 1. Official Fraud Prevention Banner */}
      <FraudBanner />

      {/* 2. Main Navigation Bar with Exact Elementor Structure */}
      <div
        className="elementor-element elementor-element-3d9331fe e-flex e-con-boxed e-con e-parent"
        data-id="3d9331fe"
        data-element_type="container"
        data-e-type="container"
        data-settings='{"background_background":"classic"}'
        style={{ position: 'relative', zIndex: 50, background: '#FFFFFF' }}
      >
        <div className="e-con-inner">
          <div
            className="elementor-element elementor-element-2e6560ab e-con-full e-flex e-con e-child"
            data-id="2e6560ab"
            data-element_type="container"
            data-e-type="container"
            data-settings='{"background_background":"classic"}'
          >
            <div
              className="elementor-element elementor-element-1a7374ab e-con-full e-flex e-con e-child"
              data-id="1a7374ab"
              data-element_type="container"
              data-e-type="container"
              data-settings='{"background_background":"classic"}'
            >
              <div
                className="elementor-element elementor-element-389ef415 elementor-widget__width-inherit hfe-nav-menu__align-left hfe-submenu-icon-arrow hfe-submenu-animation-none hfe-link-redirect-child hfe-nav-menu__breakpoint-tablet elementor-widget elementor-widget-navigation-menu"
                data-id="389ef415"
                data-element_type="widget"
                data-e-type="widget"
                data-widget_type="navigation-menu.default"
              >
                <div className="elementor-widget-container">
                  <div
                    className="hfe-nav-menu hfe-layout-horizontal hfe-nav-menu-layout horizontal hfe-pointer__none"
                    data-layout="horizontal"
                  >
                    {/* Mobile Hamburger Toggle Button */}
                    <div
                      role="button"
                      className="hfe-nav-menu__toggle elementor-clickable"
                      tabIndex={0}
                      aria-label="Menu Toggle"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      <span className="screen-reader-text">Menu</span>
                      <div className="hfe-nav-menu-icon">
                        <svg
                          aria-hidden="true"
                          className="e-font-icon-svg e-fas-bars"
                          viewBox="0 0 448 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                        </svg>
                      </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hfe-nav-menu__layout-horizontal hfe-nav-menu__submenu-arrow">
                      <ul id="menu-1-389ef415" className="hfe-nav-menu" style={{ alignItems: 'center' }}>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu">
                          <Link href="/" className="hfe-menu-item">
                            {tNav('home')}
                          </Link>
                        </li>

                        {/* About Us dropdown with hover/click */}
                        <li
                          className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children parent hfe-has-submenu hfe-creative-menu"
                          onMouseEnter={() => setAboutDropdownOpen(true)}
                          onMouseLeave={() => setAboutDropdownOpen(false)}
                          style={{ position: 'relative' }}
                        >
                          <div
                            className="hfe-has-submenu-container"
                            tabIndex={0}
                            role="button"
                            aria-haspopup="true"
                            aria-expanded={aboutDropdownOpen}
                            onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                          >
                            <span className="hfe-menu-item" style={{ cursor: 'pointer' }}>
                              {tNav('about')}
                              <span className="hfe-menu-toggle sub-arrow hfe-menu-child-0" style={{ marginLeft: '4px' }}>
                                <i className="fa" style={{ fontSize: '10px' }}>▼</i>
                              </span>
                            </span>
                          </div>
                          {aboutDropdownOpen && (
                            <ul
                              className="sub-menu"
                              style={{
                                display: 'block',
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                background: '#FFFFFF',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                minWidth: '220px',
                                padding: '8px 0',
                                zIndex: 100,
                                borderRadius: '4px',
                                border: '1px solid #E5E7EB',
                              }}
                            >
                              <li className="menu-item menu-item-type-post_type menu-item-object-page hfe-creative-menu">
                                <Link
                                  href="/about-us"
                                  className="hfe-sub-menu-item"
                                  onClick={() => setAboutDropdownOpen(false)}
                                >
                                  {tNav('ourStory')}
                                </Link>
                              </li>
                              <li className="menu-item menu-item-type-post_type menu-item-object-page hfe-creative-menu">
                                <Link
                                  href="/our-heritage"
                                  className="hfe-sub-menu-item"
                                  onClick={() => setAboutDropdownOpen(false)}
                                >
                                  {tNav('ourHeritage')}
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>

                        {/* Plots Directory Link */}
                        <li className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu">
                          <Link href="/plots" className="hfe-menu-item">
                            {tNav('plots')}
                          </Link>
                        </li>

                        {/* Contact Link */}
                        <li className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu">
                          <Link href="/contact" className="hfe-menu-item">
                            {tNav('contact')}
                          </Link>
                        </li>

                        {/* Seamless Language Switcher integrated right into the navigation */}
                        <li className="menu-item parent hfe-creative-menu kr-lang-menu-item" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <LanguageSwitcher />
                        </li>
                      </ul>
                    </nav>

                    {/* Mobile Drawer Navigation */}
                    {mobileMenuOpen && (
                      <div
                        className="kr-mobile-drawer"
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0,0,0,0.5)',
                          zIndex: 9999,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div
                          style={{
                            width: '280px',
                            background: '#FFFFFF',
                            height: '100%',
                            padding: '24px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            boxShadow: '4px 0 20px rgba(0,0,0,0.2)',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <span style={{ fontWeight: 800, color: '#00491E', fontSize: '16px' }}>KIRIMA RISE</span>
                            <button
                              type="button"
                              onClick={() => setMobileMenuOpen(false)}
                              style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#1A1A1A' }}
                            >
                              ✕
                            </button>
                          </div>

                          <Link
                            href="/"
                            style={{ padding: '10px 0', fontSize: '15px', fontWeight: 700, color: '#00491E', textDecoration: 'none' }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {tNav('home')}
                          </Link>
                          <Link
                            href="/about-us"
                            style={{ padding: '10px 0', fontSize: '15px', fontWeight: 700, color: '#00491E', textDecoration: 'none' }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {tNav('ourStory')}
                          </Link>
                          <Link
                            href="/our-heritage"
                            style={{ padding: '10px 0', fontSize: '15px', fontWeight: 700, color: '#00491E', textDecoration: 'none' }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {tNav('ourHeritage')}
                          </Link>
                          <Link
                            href="/plots"
                            style={{ padding: '10px 0', fontSize: '15px', fontWeight: 700, color: '#00491E', textDecoration: 'none' }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {tNav('plots')}
                          </Link>
                          <Link
                            href="/contact"
                            style={{ padding: '10px 0', fontSize: '15px', fontWeight: 700, color: '#00491E', textDecoration: 'none' }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {tNav('contact')}
                          </Link>

                          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#555555', marginBottom: '8px', textTransform: 'uppercase' }}>
                              Language / Lugha:
                            </div>
                            <LanguageSwitcher isMobile={true} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Brand Logo */}
            <div
              className="elementor-element elementor-element-3f63660e e-con-full e-flex e-con e-child"
              data-id="3f63660e"
              data-element_type="container"
              data-e-type="container"
              data-settings='{"background_background":"classic"}'
            >
              <div
                className="elementor-element elementor-element-4e8f28e2 elementor-widget-mobile__width-initial elementor-widget elementor-widget-image"
                data-id="4e8f28e2"
                data-element_type="widget"
                data-e-type="widget"
                data-widget_type="image.default"
              >
                <div className="elementor-widget-container">
                  <Link href="/">
                    <img
                      fetchPriority="high"
                      decoding="async"
                      width={800}
                      height={498}
                      src="/wp-content/uploads/2026/07/cropped-Kirima-Rise-Logo-01-scaled-1-1024x637.png"
                      className="attachment-large size-large wp-image-90"
                      alt="Kirima Rise Logo"
                      sizes="(max-width: 800px) 100vw, 800px"
                      style={{ maxHeight: '68px', width: 'auto', objectFit: 'contain' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Enquire Button */}
          <div
            className="elementor-element elementor-element-609ad2b6 e-con-full e-flex e-con e-child"
            data-id="609ad2b6"
            data-element_type="container"
            data-e-type="container"
          >
            <div
              className="elementor-element elementor-element-778b8d3 elementor-align-right animated-slow elementor-mobile-align-justify elementor-widget-mobile__width-initial elementor-widget elementor-widget-button"
              data-id="778b8d3"
              data-element_type="widget"
              data-e-type="widget"
              data-settings='{"_animation":"none"}'
              data-widget_type="button.default"
            >
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <Link
                    className="elementor-button elementor-button-link elementor-size-sm elementor-animation-float"
                    href="/contact"
                  >
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          id="Layer_1"
                          viewBox="0 0 88.4 89.1"
                          style={{ width: '14px', height: '14px' }}
                        >
                          <polygon
                            fill="#FFFFFF"
                            points="81.3 77.5 72.3 77.5 72.3 15.4 10.1 15.4 10.1 6.4 81.3 6.4 81.3 77.5"
                          />
                          <rect
                            fill="#FFFFFF"
                            x="-3.7"
                            y="39.7"
                            width="94.3"
                            height="9"
                            transform="translate(-18.5 43.7) rotate(-45)"
                          />
                        </svg>
                      </span>
                      <span className="elementor-button-text">{tNav('enquire')}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 1st Batch Released Plots Notice Banner / Interactive Directory Notice */}
      <div
        className="kr-home-banner-wrapper"
        style={{
          width: '100%',
          background: '#FFFFFF',
          borderBottom: '2px solid #E5E7EB',
          boxShadow: '0 4px 20px -2px rgba(151,11,16,0.06)',
          position: 'relative',
          zIndex: 9,
        }}
      >
        <div className="kr-home-notice-bar">
          <div className="kr-notice-left">
            <span className="kr-notice-tag">{t('noticeTag')}</span>
            <div className="kr-notice-content">
              <strong>{t('noticeTitle')}</strong> — {t('noticeBody')}
            </div>
          </div>
          <div className="kr-notice-actions">
            <Link href="/plots" className="kr-notice-btn-search">
              <svg viewBox="0 0 24 24" style={{ width: '15px', height: '15px', fill: '#FFFFFF' }}>
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
    </header>
  );
}
