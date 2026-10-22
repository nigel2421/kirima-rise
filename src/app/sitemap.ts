import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kirimarise.co.ke';
  const lastModified = new Date();

  return [
    // Home
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          sw: `${baseUrl}/sw`,
        },
      },
    },
    {
      url: `${baseUrl}/sw`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          sw: `${baseUrl}/sw`,
        },
      },
    },

    // About Us / Kuhusu Sisi
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about-us`,
          sw: `${baseUrl}/sw/kuhusu-sisi`,
        },
      },
    },
    {
      url: `${baseUrl}/sw/kuhusu-sisi`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about-us`,
          sw: `${baseUrl}/sw/kuhusu-sisi`,
        },
      },
    },

    // Our Heritage / Urithi Wetu
    {
      url: `${baseUrl}/our-heritage`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/our-heritage`,
          sw: `${baseUrl}/sw/urithi-wetu`,
        },
      },
    },
    {
      url: `${baseUrl}/sw/urithi-wetu`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/our-heritage`,
          sw: `${baseUrl}/sw/urithi-wetu`,
        },
      },
    },

    // Plots / Viwanja
    {
      url: `${baseUrl}/plots`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/plots`,
          sw: `${baseUrl}/sw/viwanja`,
        },
      },
    },
    {
      url: `${baseUrl}/sw/viwanja`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/plots`,
          sw: `${baseUrl}/sw/viwanja`,
        },
      },
    },

    // Contact / Mawasiliano
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          sw: `${baseUrl}/sw/mawasiliano`,
        },
      },
    },
    {
      url: `${baseUrl}/sw/mawasiliano`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          sw: `${baseUrl}/sw/mawasiliano`,
        },
      },
    },

    // Notice / Tahadhari ya Utapeli
    {
      url: `${baseUrl}/notice`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/notice`,
          sw: `${baseUrl}/sw/tahadhari-ya-utapeli`,
        },
      },
    },
    {
      url: `${baseUrl}/sw/tahadhari-ya-utapeli`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/notice`,
          sw: `${baseUrl}/sw/tahadhari-ya-utapeli`,
        },
      },
    },
  ];
}
