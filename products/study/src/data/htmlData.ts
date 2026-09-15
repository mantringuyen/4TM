import { Course } from '../types';
import { module01Lessons as basicMod01Lessons } from './html/basic/module01';
import { module02Lessons as basicMod02Lessons } from './html/basic/module02';
import { module03Lessons as intMod03Lessons } from './html/intermediate/module01';
import { module04Lessons as intMod04Lessons } from './html/intermediate/module02';
import { module05Lessons as advMod05Lessons } from './html/advanced/module01';
import { module06Lessons as advMod06Lessons } from './html/advanced/module02';

export const htmlCourse: Course = {
  id: 'html',
  title: {
    en: 'HTML5 & Modern Web Semantics',
    vi: 'HTML5 & Cấu Trúc Web Ngữ Nghĩa'
  },
  tagline: {
    en: 'Master semantic web architecture, accessible forms, multimedia, Web Components, SEO metadata, and Core Web Vitals performance',
    vi: 'Làm chủ kiến trúc web ngữ nghĩa, biểu mẫu chuẩn trợ năng, đa phương tiện, Web Components, siêu dữ liệu SEO và tối ưu Core Web Vitals'
  },
  description: {
    en: 'Comprehensive 22-lesson enterprise HTML5 engineering curriculum spanning document skeleton and typography, semantic layout, responsive media and tables, high-conversion forms and constraint validation, native dialogs, iframe sandboxing, inline SVG, 2D Canvas graphics, head metadata, JSON-LD Schema.org, resource hints, Web Storage, Drag & Drop, Web Workers, Core Web Vitals performance, and native Web Components.',
    vi: 'Chương trình kỹ thuật HTML5 chuẩn doanh nghiệp 22 bài học toàn diện: khung tài liệu và phân cấp văn bản, bố cục ngữ nghĩa, đa phương tiện đáp ứng và bảng trợ năng, biểu mẫu tối ưu chuyển đổi và xác thực constraint, hộp thoại dialog gốc, bảo mật iframe sandbox, vector SVG nội dòng, đồ họa Canvas 2D, siêu dữ liệu SEO, JSON-LD Schema.org, gợi ý nạp tài nguyên, Web Storage, Kéo Thả Drag & Drop, Web Workers, tối ưu Core Web Vitals và Web Components gốc.'
  },
  iconName: 'Code',
  color: 'from-orange-500 via-amber-600 to-red-600',
  accentBg: 'bg-orange-500/15 border-orange-500/35 text-orange-400',
  levels: {
    basic: {
      id: 'basic',
      courseId: 'html',
      title: {
        en: 'HTML Fundamentals & Semantics',
        vi: 'HTML Cơ Bản & Thẻ Ngữ Nghĩa'
      },
      description: {
        en: 'Web platform foundations, document skeleton, typography hierarchy, lists, hyperlinks, semantic landmark layout, responsive pictures, and accessible tabular data structures.',
        vi: 'Nền tảng nền tảng web, khung tài liệu, phân cấp văn bản, danh sách, liên kết siêu văn bản, bố cục ngữ nghĩa theo mốc chuẩn, hình ảnh đáp ứng và cấu trúc bảng dữ liệu trợ năng.'
      },
      order: 1,
      modules: [
        {
          id: 'html_mod_1',
          levelId: 'basic',
          courseId: 'html',
          order: 1,
          title: {
            en: 'Module 01: Web Platform, Document Skeleton & Typography (Lessons 1–4)',
            vi: 'Chương 01: Nền Tảng Web, Khung Tài Liệu & Phân Cấp Văn Bản (Bài 1–4)'
          },
          description: {
            en: 'Web platform architecture, DOM parsing, DOCTYPE and UTF-8 encoding, typography hierarchy, inline semantics, lists, and HTML entities.',
            vi: 'Kiến trúc nền tảng web, phân tích DOM, khai báo DOCTYPE và bảng mã UTF-8, phân cấp văn bản, ngữ nghĩa nội dòng, danh sách và thực thể HTML.'
          },
          lessons: basicMod01Lessons
        },
        {
          id: 'html_mod_2',
          levelId: 'basic',
          courseId: 'html',
          order: 2,
          title: {
            en: 'Module 02: Navigation, Layout, Media & Tables (Lessons 5–8)',
            vi: 'Chương 02: Điều Hướng, Bố Cục Ngữ Nghĩa, Đa Phương Tiện & Bảng (Bài 5–8)'
          },
          description: {
            en: 'Hyperlinks and routing, semantic landmark structure (header, nav, main, article, section, footer), responsive image art direction (<picture>, srcset), and accessible data tables (thead, tbody, colgroup, th scope).',
            vi: 'Liên kết và điều hướng, bố cục ngữ nghĩa theo mốc chuẩn (header, nav, main, article, section, footer), chỉ đạo nghệ thuật ảnh đáp ứng (<picture>, srcset) và bảng dữ liệu trợ năng.'
          },
          lessons: basicMod02Lessons
        }
      ]
    },
    intermediate: {
      id: 'intermediate',
      courseId: 'html',
      title: {
        en: 'Forms, Validation, Interactive Elements & Canvas',
        vi: 'Biểu Mẫu, Xác Thực, Phần Tử Tương Tác & Canvas'
      },
      description: {
        en: 'Audio/video media with WebVTT subtitles, form architectures and specialized inputs, native constraint validation, interactive <details> and <dialog> modals, iframe sandboxing, inline SVG vector graphics, and 2D Canvas rendering.',
        vi: 'Đa phương tiện audio/video kèm phụ đề WebVTT, kiến trúc biểu mẫu và ô nhập chuyên dụng, xác thực ràng buộc native, phần tử tương tác <details> và hộp thoại <dialog>, iframe sandbox an toàn, đồ họa vector SVG nội dòng và kết xuất Canvas 2D.'
      },
      order: 2,
      modules: [
        {
          id: 'html_mod_3',
          levelId: 'intermediate',
          courseId: 'html',
          order: 3,
          title: {
            en: 'Module 03: Forms, Input Validation & User Interaction (Lessons 9–12)',
            vi: 'Chương 03: Biểu Mẫu, Xác Thực Nhập Liệu & Tương Tác Người Dùng (Bài 9–12)'
          },
          description: {
            en: 'HTML5 media with WebVTT subtitles, high-conversion form architecture, advanced controls (select, datalist, fieldset), and native Constraint Validation API mechanics.',
            vi: 'Đa phương tiện HTML5 kèm phụ đề WebVTT, kiến trúc form tối ưu chuyển đổi, điều khiển nâng cao (select, datalist, fieldset) và cơ chế Constraint Validation API gốc.'
          },
          lessons: intMod03Lessons
        },
        {
          id: 'html_mod_4',
          levelId: 'intermediate',
          courseId: 'html',
          order: 4,
          title: {
            en: 'Module 04: Modern Interactive Elements & Embedded Media (Lessons 13–16)',
            vi: 'Chương 04: Phần Tử Tương Tác Hiện Đại & Đa Phương Tiện Nhúng (Bài 13–16)'
          },
          description: {
            en: 'Native interactive widgets (<details>, <summary>, <dialog>), iframe sandboxing security, inline SVG vector graphics, and HTML5 2D Canvas rendering.',
            vi: 'Các widget tương tác gốc (<details>, <summary>, <dialog>), bảo mật phân vùng iframe sandbox, đồ họa vector SVG nội dòng và kết xuất đồ họa Canvas 2D.'
          },
          lessons: intMod04Lessons
        }
      ]
    },
    advanced: {
      id: 'advanced',
      courseId: 'html',
      title: {
        en: 'SEO Metadata, Web Platform APIs, Core Web Vitals & Web Components',
        vi: 'Siêu Dữ Liệu SEO, Web Platform APIs, Core Web Vitals & Web Components'
      },
      description: {
        en: 'Document head architecture, Open Graph, JSON-LD structured data, resource loading optimization, Web Storage, Drag and Drop, Web Workers, Core Web Vitals performance, and native Web Components.',
        vi: 'Kiến trúc thẻ head, Open Graph, dữ liệu cấu trúc JSON-LD, tối ưu nạp tài nguyên, Web Storage, Kéo Thả Drag & Drop, Web Workers, tối ưu Core Web Vitals và Web Components gốc.'
      },
      order: 3,
      modules: [
        {
          id: 'html_mod_5',
          levelId: 'advanced',
          courseId: 'html',
          order: 5,
          title: {
            en: 'Module 05: Modern Architecture, Head & Metadata Mastery (Lessons 17–19)',
            vi: 'Chương 05: Kiến Trúc Hiện Đại, Thẻ Head & Làm Chủ Siêu Dữ Liệu (Bài 17–19)'
          },
          description: {
            en: 'Document head structure and viewport configuration, Open Graph Twitter cards, Schema.org JSON-LD microdata, and resource hints (preload, prefetch, preconnect, defer, async).',
            vi: 'Cấu trúc thẻ head và cấu hình viewport di động, thẻ chia sẻ Open Graph, dữ liệu cấu trúc Schema.org JSON-LD và gợi ý nạp tài nguyên tăng tốc tải trang.'
          },
          lessons: advMod05Lessons
        },
        {
          id: 'html_mod_6',
          levelId: 'advanced',
          courseId: 'html',
          order: 6,
          title: {
            en: 'Module 06: Modern Web Platform, Performance & Extensibility (Lessons 20–22)',
            vi: 'Chương 06: Nền Tảng Web Hiện Đại, Hiệu Năng & Khả Năng Mở Rộng (Bài 20–22)'
          },
          description: {
            en: 'Client-side Web Storage, Drag & Drop API, multi-threaded Web Workers, Core Web Vitals performance engineering (content-visibility, CLS, LCP), and native Web Components (Custom Elements, Shadow DOM, <template>, <slot>).',
            vi: 'Lưu trữ client Web Storage, API Kéo Thả Drag & Drop, xử lý đa luồng Web Workers, kỹ thuật tối ưu Core Web Vitals (content-visibility, CLS, LCP) và Web Components gốc.'
          },
          lessons: advMod06Lessons
        }
      ]
    }
  }
};
