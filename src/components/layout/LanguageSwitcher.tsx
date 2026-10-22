'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'en' | 'sw') => {
    if (newLocale === locale) return;

    // Persist choice for at least 30 days in cookie and localStorage
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
    try {
      localStorage.setItem('user_locale', newLocale);
    } catch (e) {
      // Ignore if localStorage unavailable
    }

    // Navigate to the current page in the new locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className={`kr-language-switcher ${isMobile ? 'kr-lang-mobile' : 'kr-lang-desktop'
        }`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: isMobile ? '12px 19px' : '0 10px',
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '13px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        userSelect: 'none',
      }}
    >
      <button
        type="button"
        onClick={() => switchLocale('en')}
        aria-label="Switch to English"
        style={{
          background: 'none',
          border: 'none',
          padding: '4px 6px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: locale === 'en' ? '#bo1f24' : '#00491E',
          textDecoration: locale === 'en' ? 'underline' : 'none',
          textUnderlineOffset: '4px',
          transition: 'color 0.2s ease',
        }}
      >
        EN
      </button>

      <span style={{ color: '#929090', fontSize: '11px', margin: '0 2px' }}>|</span>

      <button
        type="button"
        onClick={() => switchLocale('sw')}
        aria-label="Badili hadi Kiswahili"
        style={{
          background: 'none',
          border: 'none',
          padding: '4px 6px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: locale === 'sw' ? '#bo1f24' : '#00491E',
          textDecoration: locale === 'sw' ? 'underline' : 'none',
          textUnderlineOffset: '4px',
          transition: 'color 0.2s ease',
        }}
      >
        SW
      </button>
    </div>
  );
}
