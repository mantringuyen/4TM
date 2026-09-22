import { Book } from '../types';
import {
  HTML_HANDBOOK_BOOK,
  HTML_DEFINITIONS_BOOK,
  HTML_PRACTICAL_GUIDE_BOOK,
  HTML_COMMON_ERRORS_BOOK,
} from './migrated';

export const HTML_EBOOKS: Book[] = [
  // 1. HTML Handbook (Migrated - Batch 5)
  HTML_HANDBOOK_BOOK,

  // 2. HTML Definitions (Migrated - Batch 5)
  HTML_DEFINITIONS_BOOK,

  // 3. HTML Practical Guide (Migrated - Batch 5)
  HTML_PRACTICAL_GUIDE_BOOK,

  // 4. HTML Common Errors (Migrated - Batch 5)
  HTML_COMMON_ERRORS_BOOK,

  // 5. HTML Best Practices (Legacy)
  {
    id: 'html-best-practices',
    slug: 'html-best-practices',
    title: 'Modern HTML Best Practices & SEO',
    subtitle: {
      en: 'Meta Tags, OpenGraph Cards, Structured Headings & Web Vitals',
      vi: 'Thẻ Meta SEO, Card OpenGraph, Cấu Trúc Tiêu Đề & Chỉ Số Web Vitals',
    },
    bookType: 'Best Practices',
    categoryId: 'html',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-01',
    accentColor: 'from-orange-600 to-amber-900',
    tags: ['SEO', 'OpenGraph', 'Headings', 'Best Practices'],
    description: {
      en: 'Production rules for modern HTML: strict heading hierarchy (single <h1>), OpenGraph social cards, viewport meta configuration, and image lazy loading.',
      vi: 'Quy chuẩn HTML sản xuất: thứ tự tiêu đề nghiêm ngặt (duy nhất một <h1>), OpenGraph social card, cấu hình viewport và lazy loading hình ảnh.',
    },
    prerequisites: {
      en: ['Basic HTML page setup'],
      vi: ['Kỹ năng tạo trang HTML cơ bản'],
    },
    outcomes: {
      en: ['Configure OpenGraph social preview metadata correctly', 'Optimize LCP and CLS with explicit img width/height dimensions'],
      vi: ['Cấu hình thẻ OpenGraph preview mạng xã hội chuẩn xác', 'Tối ưu chỉ số LCP và CLS với thuộc tính width/height hình ảnh'],
    },
    chapters: [
      {
        id: 'hbp-ch-1',
        number: 1,
        slug: 'head-metadata-and-seo',
        title: {
          en: '<head> Metadata, Viewport & OpenGraph Cards',
          vi: 'Cấu Hình <head> Metadata, Viewport & OpenGraph Cards',
        },
        summary: {
          en: 'Essential meta tags, charset, responsive viewport, og:image, and Twitter cards.',
          vi: 'Các thẻ meta quan trọng, charset, viewport đáp ứng, og:image và Twitter cards.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'hbp-1-1',
            title: {
              en: 'Standard OpenGraph Meta Template',
              vi: 'Mẫu Cấu Hình OpenGraph Metadata Chuẩn Mực',
            },
            content: {
              en: 'Include `og:title`, `og:description`, `og:image`, `og:url`, and `og:type` in the `<head>` to ensure rich social previews when links are shared.',
              vi: 'Khai báo các thẻ `og:title`, `og:description`, `og:image`, `og:url` trong `<head>` để hiển thị preview đẹp mắt khi chia sẻ link.',
            },
          },
        ],
      },
      {
        id: 'hbp-ch-2',
        number: 2,
        slug: 'performance-image-attributes',
        title: {
          en: 'Image Performance Attributes (loading, decoding, srcset)',
          vi: 'Thuộc Tính Tối Ưu Hình Ảnh (loading, decoding, srcset)',
        },
        summary: {
          en: 'Prevent Layout Shift (CLS) by setting explicit width/height and loading="lazy".',
          vi: 'Chống giật trang (CLS) bằng thuộc tính width/height tường minh và loading="lazy".',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'hbp-2-1',
            title: {
              en: 'Preventing Cumulative Layout Shift (CLS)',
              vi: 'Chống Nhảy Bố Cục Trang Với Width & Height Tường Minh',
            },
            content: {
              en: 'Always provide explicit `width` and `height` attributes on `<img>` elements so browsers compute aspect-ratio boxes before images download.',
              vi: 'Luôn cung cấp thuộc tính `width` và `height` trên thẻ `<img>` để trình duyệt giữ chỗ khung ảnh trước khi tải xong, tránh nhảy trang.',
            },
          },
        ],
      },
    ],
  },
];
