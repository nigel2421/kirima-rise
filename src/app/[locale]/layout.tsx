import React from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/app/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSw = locale === 'sw';

  return {
    title: isSw
      ? 'Kirima Rise | Tovuti Rasmi ya Shirika la Urithi wa G.K. Kirima - Viwanja na Hatimiliki Njiru'
      : 'Kirima Rise | Official Estate of G.K. Kirima - Njiru Plots & Title Deeds',
    description: isSw
      ? 'Uhalalishaji wa ardhi na ununuzi wa viwanja halali vilivyo na hatimiliki chini ya usimamizi wa Shirika la Urithi wa G.K. Kirima, Njiru, Nairobi.'
      : 'Official property regularisation, verified freehold plot purchase, and individual title deed issuance under the Estate of G.K. Kirima in Njiru, Nairobi.',
    alternates: {
      canonical: isSw ? 'https://kirimarise.co.ke/sw' : 'https://kirimarise.co.ke/',
      languages: {
        en: 'https://kirimarise.co.ke/',
        sw: 'https://kirimarise.co.ke/sw',
        'x-default': 'https://kirimarise.co.ke/',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === 'sw' ? 'sw' : 'en-US'} className="no-js">
      <head>
        {/* Core Original Stylesheets for 100% UI Preservation */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/brand-design.css" />
        <link
          rel="stylesheet"
          id="hfe-widgets-style-css"
          href="/wp-content/plugins/header-footer-elementor/inc/widgets-css/frontend76ed.css?ver=2.9.5"
          media="all"
        />
        <link
          rel="stylesheet"
          id="contact-form-7-css"
          href="/wp-content/plugins/contact-form-7/includes/css/styles36b6.css?ver=6.1.7"
          media="all"
        />
        <link
          rel="stylesheet"
          id="hfe-style-css"
          href="/wp-content/plugins/header-footer-elementor/assets/css/header-footer-elementor76ed.css?ver=2.9.5"
          media="all"
        />
        <link
          rel="stylesheet"
          id="elementor-frontend-css"
          href="/wp-content/plugins/elementor/assets/css/frontend.min7035.css?ver=4.3.4"
          media="all"
        />

        {/* Global Elementor inline tokens */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .elementor-kit-7 {
                --e-global-color-primary: #B01F24;
                --e-global-color-secondary: #00491E;
                --e-global-color-text: #1A1A1A;
                --e-global-color-accent: #00491E;
                --e-global-typography-primary-font-family: "Plus Jakarta Sans";
                --e-global-typography-primary-font-size: 96px;
                --e-global-typography-primary-font-weight: 700;
                --e-global-typography-secondary-font-family: "Plus Jakarta Sans";
                --e-global-typography-secondary-font-size: 48px;
                --e-global-typography-text-font-family: "EB Garamond";
              }
              .elementor-section.elementor-section-boxed > .elementor-container {
                max-width: 1140px;
              }
              .e-con {
                --container-max-width: 1140px;
              }
              @media(max-width:1024px) {
                .elementor-section.elementor-section-boxed > .elementor-container,
                .e-con {
                  max-width: 1024px;
                }
              }
              @media(max-width:767px) {
                .elementor-section.elementor-section-boxed > .elementor-container,
                .e-con {
                  max-width: 767px;
                }
              }
            `,
          }}
        />
      </head>
      <body className="home wp-singular page-template page-template-elementor_header_footer elementor-default elementor-template-full-width elementor-kit-7 elementor-page elementor-page-36">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: '1 0 auto' }}>{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
