import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'sw'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about-us': {
      en: '/about-us',
      sw: '/kuhusu-sisi',
    },
    '/our-heritage': {
      en: '/our-heritage',
      sw: '/urithi-wetu',
    },
    '/plots': {
      en: '/plots',
      sw: '/viwanja',
    },
    '/contact': {
      en: '/contact',
      sw: '/mawasiliano',
    },
    '/notice': {
      en: '/notice',
      sw: '/tahadhari-ya-utapeli',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
