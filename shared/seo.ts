/**
 * 4TM Ecosystem Unified SEO & Structured Data Utilities
 * High-performance, zero-dependency client-side SEO and Schema.org JSON-LD manager.
 */

import { useEffect } from 'react';

export interface SEOConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article' | 'book';
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  language?: 'en' | 'vi';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Updates document head metadata, canonical links, OpenGraph, Twitter tags,
 * HTML lang attribute, and Schema.org JSON-LD scripts.
 */
export function updateDocumentSEO(config: SEOConfig): void {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  if (config.title) {
    document.title = config.title;
  }

  // 2. HTML lang attribute
  if (config.language) {
    document.documentElement.lang = config.language;
  }

  // 3. Meta Description
  updateMetaTag('name', 'description', config.description);

  // 4. Canonical Link (strip fragment identifier per RFC 6596 / Google Search guidelines)
  if (config.canonicalUrl) {
    const cleanCanonical = config.canonicalUrl.split('#')[0] || config.canonicalUrl;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = cleanCanonical;
  }

  // 5. Robots Meta (index/noindex)
  if (config.noindex) {
    updateMetaTag('name', 'robots', 'noindex, nofollow');
  } else {
    updateMetaTag('name', 'robots', 'index, follow');
  }

  // 6. OpenGraph Metadata
  updateMetaTag('property', 'og:title', config.title);
  updateMetaTag('property', 'og:description', config.description);
  updateMetaTag('property', 'og:type', config.ogType || 'website');
  if (config.canonicalUrl) {
    updateMetaTag('property', 'og:url', config.canonicalUrl);
  }
  updateMetaTag('property', 'og:site_name', '4TM Ecosystem');
  updateMetaTag('property', 'og:locale', config.language === 'vi' ? 'vi_VN' : 'en_US');
  updateMetaTag('property', 'og:locale:alternate', config.language === 'vi' ? 'en_US' : 'vi_VN');

  const defaultOgImage = 'https://4tm.io.vn/og-cover.png';
  updateMetaTag('property', 'og:image', config.ogImage || defaultOgImage);

  // 7. Twitter / X Cards
  updateMetaTag('name', 'twitter:card', config.twitterCard || 'summary_large_image');
  updateMetaTag('name', 'twitter:title', config.title);
  updateMetaTag('name', 'twitter:description', config.description);
  updateMetaTag('name', 'twitter:image', config.ogImage || defaultOgImage);

  // 8. Structured Data (JSON-LD)
  if (config.jsonLd) {
    let scriptTag = document.querySelector<HTMLScriptElement>('#schema-jsonld-4tm');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-jsonld-4tm';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    const payload = Array.isArray(config.jsonLd)
      ? { '@context': 'https://schema.org', '@graph': config.jsonLd }
      : { '@context': 'https://schema.org', ...config.jsonLd };
    scriptTag.textContent = JSON.stringify(payload, null, 2);
  }
}

function updateMetaTag(keyType: 'name' | 'property', keyName: string, content?: string): void {
  if (!content) return;
  let element = document.querySelector<HTMLMetaElement>(`meta[${keyType}="${keyName}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(keyType, keyName);
    document.head.appendChild(element);
  }
  element.content = content;
}

/**
 * React Hook for declarative SEO synchronization.
 */
export function useSEO(config: SEOConfig, deps: readonly unknown[] = []): void {
  useEffect(() => {
    updateDocumentSEO(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config.title,
    config.description,
    config.canonicalUrl,
    config.language,
    config.noindex,
    config.ogType,
    config.ogImage,
    ...deps,
  ]);
}

/**
 * Schema.org Generators
 */
export const SchemaGenerators = {
  organization: () => ({
    '@type': 'Organization',
    '@id': 'https://4tm.io.vn/#organization',
    name: '4TM Ecosystem',
    url: 'https://4tm.io.vn',
    logo: 'https://4tm.io.vn/favicon.svg',
    description:
      'Autonomous digital ecosystem connecting Interactive Programming LMS, Engineering Ebooks, Technical Utilities, Web Applications, and Computer Science Games.',
    sameAs: [
      'https://study.4tm.io.vn',
      'https://ebook.4tm.io.vn',
      'https://tools.4tm.io.vn',
      'https://games.4tm.io.vn',
      'https://apps.4tm.io.vn',
    ],
  }),

  website: (url: string, name: string, description: string) => ({
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url,
    name,
    description,
    publisher: {
      '@type': 'Organization',
      name: '4TM Ecosystem',
      url: 'https://4tm.io.vn',
    },
    inLanguage: ['en', 'vi'],
  }),

  course: (data: {
    id: string;
    name: string;
    description: string;
    provider?: string;
    educationalLevel?: string;
    teaches?: string[];
    url: string;
  }) => ({
    '@type': 'Course',
    '@id': `${data.url}#course`,
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: data.provider || '4TM Study',
      sameAs: 'https://study.4tm.io.vn',
    },
    educationalLevel: data.educationalLevel || 'Beginner to Advanced',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT20H',
    },
    ...(data.teaches && data.teaches.length > 0 ? { teaches: data.teaches.join(', ') } : {}),
    isAccessibleForFree: true,
    inLanguage: ['en', 'vi'],
  }),

  book: (data: {
    id: string;
    title: string;
    description: string;
    author?: string;
    inLanguage?: string;
    genre?: string;
    url: string;
  }) => ({
    '@type': 'Book',
    '@id': `${data.url}#book`,
    name: data.title,
    headline: data.title,
    description: data.description,
    author: {
      '@type': 'Organization',
      name: data.author || '4TM Engineering Publications',
      url: 'https://ebook.4tm.io.vn',
    },
    publisher: {
      '@type': 'Organization',
      name: '4TM Ecosystem',
      url: 'https://4tm.io.vn',
    },
    genre: data.genre || 'Computer Science & Software Engineering',
    inLanguage: data.inLanguage || 'en',
    isAccessibleForFree: true,
    url: data.url,
  }),

  softwareApplication: (data: {
    id: string;
    name: string;
    description: string;
    category?: string;
    operatingSystem?: string;
    url: string;
  }) => ({
    '@type': 'SoftwareApplication',
    '@id': `${data.url}#app`,
    name: data.name,
    description: data.description,
    applicationCategory: data.category || 'DeveloperApplication',
    operatingSystem: data.operatingSystem || 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: data.url,
  }),

  videoGame: (data: {
    id: string;
    name: string;
    description: string;
    genre?: string;
    url: string;
  }) => ({
    '@type': 'VideoGame',
    '@id': `${data.url}#game`,
    name: data.name,
    description: data.description,
    genre: data.genre || ['Puzzle', 'Logic', 'Algorithm', 'Educational'],
    gamePlatform: ['Web Browser'],
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: data.url,
  }),
};
