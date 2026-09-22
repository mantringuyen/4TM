import { Book } from '../../types';

export const HTML_BEST_PRACTICES_BOOK: Book = {
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
  tags: ['SEO', 'OpenGraph', 'Headings', 'Best Practices', 'Web Vitals'],
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
          practiceDetails: {
            context: {
              en: 'When URLs are shared on platforms like Slack, Discord, Twitter/X, Facebook, and LinkedIn, crawler scrapers (like `facebookexternalhit` or `Twitterbot`) parse the HTML `<head>` for OpenGraph protocol and Twitter Card meta elements. Missing tags result in broken cards with fallback favicon images or unformatted text snippets.',
              vi: 'Khi đường link được chia sẻ qua Slack, Discord, Twitter/X, Facebook hay LinkedIn, các bot cào dữ liệu (như `facebookexternalhit` hoặc `Twitterbot`) sẽ phân tích thẻ `<head>` để lấy metadata OpenGraph và Twitter Card. Thiếu các thẻ này sẽ khiến link hiển thị vỡ khung, chỉ hiện favicon hoặc trích đoạn văn bản cụt ngủn.',
            },
            recommendedPractice: {
              en: 'Declare standard UTF-8 charset, responsive mobile viewport, canonical URL, complete OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:image:width`, `og:image:height`), and corresponding `twitter:card` tags with absolute HTTPS image URLs.',
              vi: 'Luôn khai báo charset UTF-8, viewport di động đáp ứng, canonical URL, bộ thẻ OpenGraph chuẩn (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:image:width`, `og:image:height`) và thẻ `twitter:card` tương ứng với đường dẫn ảnh HTTPS tuyệt đối.',
            },
            whyItMatters: {
              en: 'Rich link unfurling increases click-through rates (CTR) by over 40% across social and workplace chat channels. Explicit width and height dimensions prevent card rendering latency and image cropping on mobile messengers.',
              vi: 'Card xem trước hoàn chỉnh giúp tăng tỉ lệ click (CTR) hơn 40% trên mạng xã hội và kênh chat công việc. Khai báo rõ kích thước width/height giúp bot tải và hiển thị khung preview ngay tức khắc mà không bị méo ảnh.',
            },
            goodExample: {
              language: 'html',
              filename: 'index.html',
              explanation: {
                en: 'Comprehensive, valid production head metadata template with OpenGraph and Twitter cards.',
                vi: 'Mẫu cấu hình metadata chuẩn sản xuất hoàn chỉnh trong thẻ head với OpenGraph và Twitter card.',
              },
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Modern HTML Architecture | 4TM Platform</title>
  <meta name="description" content="Production guide to scalable HTML markup, OpenGraph social cards, and Core Web Vitals optimization." />
  <link rel="canonical" href="https://4tm.io.vn/products/ebook/html-best-practices" />

  <!-- Open Graph Protocol -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Modern HTML Architecture | 4TM Platform" />
  <meta property="og:description" content="Production guide to scalable HTML markup and OpenGraph optimization." />
  <meta property="og:url" content="https://4tm.io.vn/products/ebook/html-best-practices" />
  <meta property="og:image" content="https://4tm.io.vn/assets/og-cover-1200x630.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="4TM Ebook" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Modern HTML Architecture | 4TM Platform" />
  <meta name="twitter:description" content="Production guide to scalable HTML markup and OpenGraph optimization." />
  <meta name="twitter:image" content="https://4tm.io.vn/assets/og-cover-1200x630.png" />
</head>`,
            },
            riskyExample: {
              language: 'html',
              filename: 'broken_meta.html',
              explanation: {
                en: 'Relative image paths and missing viewport/canonical tags that fail across social crawlers.',
                vi: 'Đường dẫn ảnh tương đối và thiếu thẻ viewport/canonical khiến bot mạng xã hội không trích xuất được.',
              },
              code: `<!-- RISKY: Missing viewport, relative image path fails on external scrapers -->
<head>
  <title>My Page</title>
  <meta property="og:title" content="My Page" />
  <!-- Scraper cannot resolve relative paths without protocol/domain -->
  <meta property="og:image" content="/images/preview.png" />
</head>`,
            },
            tradeOffs: {
              en: [
                'Maintaining OpenGraph images requires dedicated asset generation at 1200x630px ratio.',
                'Dynamic server-side rendering or edge prerendering is required for Single-Page Applications (SPAs) because scrapers do not execute client-side JavaScript.',
              ],
              vi: [
                'Cần duy trì kho ảnh OpenGraph tỉ lệ chuẩn 1200x630px cho từng trang nội dung.',
                'Cần áp dụng SSR (Server-Side Rendering) hoặc prerendering tại Edge cho các ứng dụng SPA vì bot scraper không thực thi JavaScript của client.',
              ],
            },
            checklist: {
              en: [
                'Image URLs in og:image and twitter:image must be absolute HTTPS paths.',
                'Include og:image:width (1200) and og:image:height (630) for instant preview rendering.',
                'Verify single canonical URL tag matching the primary route.',
                'Ensure og:title is under 60 characters and og:description is under 155 characters.',
              ],
              vi: [
                'Đường dẫn trong og:image và twitter:image phải là URL HTTPS tuyệt đối.',
                'Khai báo og:image:width (1200) và og:image:height (630) để bot vẽ khung tức thì.',
                'Xác nhận duy nhất 1 thẻ canonical URL trỏ đúng route chính danh.',
                'Đảm bảo og:title dưới 60 ký tự và og:description dưới 155 ký tự.',
              ],
            },
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
          practiceDetails: {
            context: {
              en: 'Cumulative Layout Shift (CLS) measures unexpected layout shifts during page load. When an image without dimensions finishes downloading, the browser recalculates geometry and pushes down all subsequent text content, frustrating users and incurring severe SEO ranking penalties under Google Core Web Vitals.',
              vi: 'Cumulative Layout Shift (CLS) đo lường độ giật cục và thay đổi bố cục bất ngờ khi tải trang. Khi một hình ảnh không có kích thước tải xong, trình duyệt buộc phải tính toán lại kích thước và đẩy dồn toàn bộ văn bản phía dưới xuống, gây ức chế cho người dùng và bị Google phạt điểm SEO Core Web Vitals.',
            },
            recommendedPractice: {
              en: 'Always define intrinsic `width` and `height` integer attributes on the `<img>` HTML element, pair with CSS `max-width: 100%; height: auto;` or `aspect-ratio`, and selectively assign `loading="lazy"` for below-the-fold assets while keeping `loading="eager"` (or `fetchpriority="high"`) on the hero Largest Contentful Paint (LCP) image.',
              vi: 'Luôn khai báo thuộc tính số nguyên `width` và `height` gốc trên thẻ `<img>`, kết hợp với CSS `max-width: 100%; height: auto;` hoặc `aspect-ratio`. Đặt `loading="lazy"` cho các ảnh nằm dưới màn hình đầu tiên (below-the-fold) và giữ `loading="eager"` (hoặc `fetchpriority="high"`) cho ảnh bìa LCP phía trên.',
            },
            whyItMatters: {
              en: 'Modern browsers automatically derive an intrinsic aspect ratio from HTML `width` and `height` attributes (`aspect-ratio: width / height`), reserving the exact vertical pixel space before any image byte is transmitted over the network.',
              vi: 'Các trình duyệt hiện đại tự động tính toán tỉ lệ khung hình từ thuộc tính HTML `width` và `height` (`aspect-ratio: width / height`), giữ sẵn đúng khoảng không gian theo chiều dọc trước khi một byte ảnh nào được tải về từ mạng.',
            },
            goodExample: {
              language: 'html',
              filename: 'responsive_images.html',
              explanation: {
                en: 'Intrinsic dimensions combined with modern responsive srcset and lazy loading attributes.',
                vi: 'Khai báo kích thước gốc kết hợp thuộc tính srcset đáp ứng và lazy loading.',
              },
              code: `<!-- 1. Hero LCP Image (Above the fold): Eager load with fetchpriority -->
<img 
  src="/assets/hero-800.webp" 
  srcset="/assets/hero-400.webp 400w, /assets/hero-800.webp 800w, /assets/hero-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, 800px"
  width="1200" 
  height="630" 
  alt="Engineering Architecture Diagram" 
  fetchpriority="high"
  decoding="async"
  style="max-width: 100%; height: auto;"
/>

<!-- 2. Content Images (Below the fold): Lazy loaded with reserved aspect box -->
<img 
  src="/assets/chart-600.webp" 
  width="600" 
  height="400" 
  loading="lazy" 
  decoding="async" 
  alt="Data flow pipeline breakdown"
  style="max-width: 100%; height: auto;"
/>`,
            },
            riskyExample: {
              language: 'html',
              filename: 'layout_shift_bug.html',
              explanation: {
                en: 'Omission of width/height and applying lazy loading blindly to above-the-fold hero image.',
                vi: 'Bỏ qua width/height và lạm dụng lazy loading cho cả ảnh tiêu đề chính.',
              },
              code: `<!-- RISKY: Zero reserved space causes massive CLS; lazy loading hero ruins LCP -->
<img src="/assets/hero.jpg" loading="lazy" alt="Hero banner" />`,
            },
            tradeOffs: {
              en: [
                'Responsive art-direction requires using the `<picture>` element with multiple `<source media="...">` tags.',
                'Applying `loading="lazy"` to hero images degrades LCP by delaying critical image discovery until layout completes.',
              ],
              vi: [
                'Khi cần đổi tỉ lệ ảnh theo thiết bị (art-direction), phải dùng thẻ `<picture>` kèm nhiều thẻ `<source media="...">`.',
                'Gắn nhầm `loading="lazy"` cho ảnh bìa đầu trang làm giảm chỉ số LCP do trình duyệt trì hoãn tải ảnh tới khi render xong layout.',
              ],
            },
            checklist: {
              en: [
                'Every <img> must have explicit width and height numeric attributes.',
                'Use loading="lazy" ONLY for below-the-fold images.',
                'Use fetchpriority="high" for the single above-the-fold LCP hero image.',
                'Add decoding="async" to prevent main-thread decoding freezes on large bitmaps.',
              ],
              vi: [
                'Mọi thẻ <img> phải có thuộc tính số width và height tường minh.',
                'CHỈ dùng loading="lazy" cho các ảnh nằm phía dưới màn hình cuộn đầu tiên.',
                'Dùng fetchpriority="high" cho duy nhất một ảnh bìa LCP chính trên cùng.',
                'Thêm decoding="async" để giải mã hình ảnh không khóa luồng JavaScript chính.',
              ],
            },
          },
        },
      ],
    },
  ],
};
