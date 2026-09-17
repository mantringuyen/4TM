import { Book } from '../types';

export const HTML_EBOOKS: Book[] = [
  // 1. HTML Handbook
  {
    id: 'html-handbook',
    slug: 'html-handbook',
    title: 'HTML Handbook',
    subtitle: {
      en: 'Semantic Web Structure, Document Object Model & HTML5 Standards',
      vi: 'Cấu Trúc Web Ngữ Nghĩa, Mô Hình DOM & Tiêu Chuẩn HTML5',
    },
    bookType: 'Handbook',
    categoryId: 'html',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-10',
    accentColor: 'from-orange-500 to-amber-700',
    tags: ['HTML5', 'Semantics', 'DOM', 'Web Standards'],
    description: {
      en: 'Comprehensive HTML manual covering semantic tags (<main>, <article>, <section>), document parsing, forms, and multimedia integration.',
      vi: 'Cẩm nang HTML toàn diện về thẻ ngữ nghĩa (<main>, <article>, <section>), cơ chế parse document, form và tích hợp đa phương tiện.',
    },
    prerequisites: {
      en: ['Basic web browser familiarity'],
      vi: ['Sử dụng trình duyệt web cơ bản'],
    },
    outcomes: {
      en: ['Structure web pages with clean semantic markup', 'Master HTML5 form controls and client-side validation'],
      vi: ['Xây dựng cấu trúc trang web với thẻ ngữ nghĩa chuẩn', 'Làm chủ các control form HTML5 và kiểm tra dữ liệu đầu vào'],
    },
    chapters: [
      {
        id: 'html-hb-ch-1',
        number: 1,
        slug: 'semantic-html5-structure',
        title: {
          en: 'Semantic HTML5 Architecture',
          vi: 'Kiến Trúc Ngữ Nghĩa Trong HTML5',
        },
        summary: {
          en: 'Replacing div soup with <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>.',
          vi: 'Thay thế "div soup" bằng các thẻ ngữ nghĩa <header>, <nav>, <main>, <article>, <section>, <aside> và <footer>.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'html-hb-1-1',
            title: {
              en: 'Why Semantics Matter for Accessibility and SEO',
              vi: 'Tầm Quan Trọng Của Ngữ Nghĩa Cho SEO & Accessiblity',
            },
            content: {
              en: 'Semantic HTML tags communicate structural purpose directly to screen readers, search engine crawlers, and browser reader modes.',
              vi: 'Các thẻ ngữ nghĩa truyền tải mục đích cấu trúc trực tiếp tới trình đọc màn hình, con bọ tìm kiếm và chế độ đọc của trình duyệt.',
            },
            codeBlock: {
              language: 'html',
              filename: 'semantic.html',
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>4TM Publication</title>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li></ul></nav>
  </header>
  <main>
    <article>
      <h1>Semantic Web Manual</h1>
      <p>Content goes here...</p>
    </article>
  </main>
</body>
</html>`,
            },
          },
        ],
      },
      {
        id: 'html-hb-ch-2',
        number: 2,
        slug: 'forms-and-input-types',
        title: {
          en: 'Modern HTML5 Forms & Inputs',
          vi: 'Form HTML5 Hiện Đại & Các Kiểu Input',
        },
        summary: {
          en: 'Form validation, input types, labels, fieldsets, and datalists.',
          vi: 'Kiểm tra dữ liệu form, các loại input, label, fieldset và datalist.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'html-hb-2-1',
            title: {
              en: 'Client-Side Native Form Validation',
              vi: 'Kiểm Tra Dữ Liệu Native Của Form Trên Client',
            },
            content: {
              en: 'Leverage native HTML attributes like `required`, `pattern`, `minlength`, `maxlength`, `min`, and `max` without extra JavaScript dependencies.',
              vi: 'Tận dụng các thuộc tính native như `required`, `pattern`, `minlength`, `maxlength` mà không cần thư viện JavaScript ngoài.',
            },
          },
        ],
      },
    ],
  },

  // 2. HTML Definitions
  {
    id: 'html-definitions',
    slug: 'html-definitions',
    title: 'HTML Definitions & DOM Concepts',
    subtitle: {
      en: 'Web Terminology, Document Model & Element Hierarchy Definitions',
      vi: 'Thuật Ngữ Web, Mô Hình DOM & Tra Cứu Khái Niệm Thẻ HTML',
    },
    bookType: 'Definitions',
    categoryId: 'html',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '20 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-amber-500 to-orange-700',
    tags: ['Definitions', 'DOM', 'A11y', 'Glossary'],
    description: {
      en: 'Clear definitions for HTML and Web DOM terminology: DOM Tree, Shadow DOM, ARIA Roles, Void Elements, and Inline vs Block formatting.',
      vi: 'Từ điển định nghĩa các thuật ngữ HTML & DOM: Cây DOM, Shadow DOM, Vai trò ARIA, Thẻ rỗng (Void Element) và Khối Block vs Inline.',
    },
    prerequisites: {
      en: ['Basic HTML tags understanding'],
      vi: ['Hiểu biết cơ bản về thẻ HTML'],
    },
    outcomes: {
      en: ['Understand core DOM tree rendering and ARIA standards'],
      vi: ['Hiểu rõ cơ chế dựng cây DOM và tiêu chuẩn ARIA'],
    },
    chapters: [
      {
        id: 'html-def-ch-1',
        number: 1,
        slug: 'dom-tree-and-elements',
        title: {
          en: 'DOM Tree & Element Types',
          vi: 'Cây DOM & Các Loại Element',
        },
        summary: {
          en: 'DOM Nodes, Void Elements, Block-level vs Inline-level elements.',
          vi: 'DOM Node, Thẻ rỗng (Void), Element cấp Block vs Inline.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'html-def-1-1',
            title: {
              en: 'Block vs Inline vs Inline-Block Elements',
              vi: 'Khái Niệm Element Block vs Inline vs Inline-Block',
            },
            content: {
              en: 'Block elements take up full container width and start on a new line (div, p, h1). Inline elements only take required width (span, a, strong).',
              vi: 'Element Block chiếm trọn chiều rộng và nằm trên dòng mới (div, p, h1). Element Inline chỉ chiếm vừa đủ kích thước nội dung (span, a, strong).',
            },
          },
        ],
      },
      {
        id: 'html-def-ch-2',
        number: 2,
        slug: 'accessibility-aria-definitions',
        title: {
          en: 'Accessibility & ARIA Terminology',
          vi: 'Thuật Ngữ Khả Năng Truy Cập (A11y) & ARIA',
        },
        summary: {
          en: 'ARIA roles, aria-label, aria-expanded, and Screen Reader landmarks.',
          vi: 'Vai trò ARIA, aria-label, aria-expanded và landmark cho trình đọc màn hình.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'html-def-2-1',
            title: {
              en: 'ARIA Roles and Attributes',
              vi: 'Định Nghĩa ARIA Roles Và Thuộc Tính ARIA',
            },
            content: {
              en: 'ARIA (Accessible Rich Internet Applications) attributes complement native HTML elements when semantic elements are insufficient for custom widgets.',
              vi: 'Thuộc tính ARIA hỗ trợ bổ sung cho các phần tử HTML khi thẻ native không đủ thể hiện chức năng giao diện phức tạp.',
            },
          },
        ],
      },
    ],
  },

  // 3. HTML Practical Guide
  {
    id: 'html-practical-guide',
    slug: 'html-practical-guide',
    title: 'Building Accessible Semantic Forms',
    subtitle: {
      en: 'Step-by-Step Practical Guide to Designing Accessible HTML Forms',
      vi: 'Hướng Dẫn Thực Hành Từng Bước Thiết Kế Form HTML Chuẩn Accessibility',
    },
    bookType: 'Practical Guides',
    categoryId: 'html',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-orange-600 to-amber-800',
    tags: ['Forms', 'Accessibility', 'WCAG', 'Guide'],
    description: {
      en: 'A practical, hands-on guide to crafting accessible, keyboard-navigable HTML forms compliant with WCAG 2.1 AA standards.',
      vi: 'Hướng dẫn thực hành xây dựng form HTML tiếp cận tốt (accessibility), điều hướng bàn phím hoàn hảo tuân thủ chuẩn WCAG 2.1 AA.',
    },
    prerequisites: {
      en: ['Basic HTML markup skills'],
      vi: ['Kỹ năng viết mã HTML cơ bản'],
    },
    outcomes: {
      en: ['Build fully accessible forms with fieldset, legend, and explicit label associations'],
      vi: ['Xây dựng form tiếp cận hoàn hảo với fieldset, legend và liên kết label tường minh'],
    },
    chapters: [
      {
        id: 'hpg-ch-1',
        number: 1,
        slug: 'explicit-labels-and-groups',
        title: {
          en: 'Explicit Labels, Fieldsets & Legends',
          vi: 'Gắn Label Tường Minh, Fieldset & Legend',
        },
        summary: {
          en: 'Associating <label for="id"> and grouping controls with <fieldset>.',
          vi: 'Gắn liên kết <label for="id"> và nhóm control với <fieldset>.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'hpg-1-1',
            title: {
              en: 'Pairing Inputs with Labels',
              vi: 'Liên Kết Thuộc Tính for Của Label Với Input ID',
            },
            content: {
              en: 'Never rely on placeholder text as a substitute for explicit `<label>` elements. Placeholders disappear upon typing and fail screen readers.',
              vi: 'Không bao giờ dùng chữ placeholder để thay thế thẻ `<label>`. Placeholder sẽ biến mất khi gõ và làm hỏng trải nghiệm người dùng yếu thị lực.',
            },
          },
        ],
      },
      {
        id: 'hpg-ch-2',
        number: 2,
        slug: 'keyboard-navigation-and-focus',
        title: {
          en: 'Keyboard Navigation & Focus Management',
          vi: 'Điều Hướng Bàn Phím & Quản Lý Focus State',
        },
        summary: {
          en: 'Tabindex usage, focus visible indicators, and error message associations.',
          vi: 'Sử dụng tabindex, chỉ báo focus-visible và liên kết thông báo lỗi với aria-describedby.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'hpg-2-1',
            title: {
              en: 'Linking Error Messages with aria-describedby',
              vi: 'Liên Kết Lỗi Bằng Thuộc Tính aria-describedby',
            },
            content: {
              en: 'When validation fails, connect the error message element ID to the input using `aria-describedby` so screen readers announce errors immediately upon focusing.',
              vi: 'Khi lỗi validation xuất hiện, hãy liên kết ID chứa câu lỗi vào input qua `aria-describedby` để trình đọc đọc câu lỗi ngay lập tức.',
            },
          },
        ],
      },
    ],
  },

  // 4. HTML Common Errors
  {
    id: 'html-common-errors',
    slug: 'html-common-errors',
    title: 'HTML Common Errors & Markup Bugs',
    subtitle: {
      en: 'Unclosed Tags, Invalid Nesting & Accessibility Anti-Patterns',
      vi: 'Thẻ Quên Đóng, Lồng Thẻ Sai Quy Tắc & Lỗi Accessibility Thường Gặp',
    },
    bookType: 'Common Errors',
    categoryId: 'html',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-01-25',
    accentColor: 'from-amber-600 to-red-700',
    tags: ['Invalid Markup', 'Nesting Bugs', 'Accessibility Errors', 'Debugging'],
    description: {
      en: 'Troubleshooting common HTML pitfalls: invalid block-inside-inline nesting, missing alt attributes, click handler div anti-patterns, and duplicate IDs.',
      vi: 'Sửa các lỗi HTML phổ biến: lồng thẻ block vào thẻ inline sai quy tắc, thiếu thuộc tính alt, lạm dụng thẻ div bắt sự kiện click và trùng lặp ID.',
    },
    prerequisites: {
      en: ['Basic HTML understanding'],
      vi: ['Hiểu biết HTML cơ bản'],
    },
    outcomes: {
      en: ['Eliminate invalid HTML nesting errors', 'Replace div buttons with accessible native <button> elements'],
      vi: ['Loại bỏ lỗi lồng thẻ HTML không hợp lệ', 'Thay thế "div button" bằng thẻ native <button> chuẩn mực'],
    },
    chapters: [
      {
        id: 'hce-ch-1',
        number: 1,
        slug: 'invalid-nesting-and-structure',
        title: {
          en: 'Invalid Element Nesting & Document Parsing Bugs',
          vi: 'Lỗi Lồng Thẻ Không Hợp Lệ & Sai Lầm Trình Parse Document',
        },
        summary: {
          en: 'Nesting <div> inside <p> or <a> tags, unclosed void tags, and duplicate IDs.',
          vi: 'Lồng <div> vào thẻ <p> hoặc <a>, thẻ rỗng không đóng và trùng lặp thuộc tính id.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'hce-1-1',
            title: {
              en: 'The Block-Inside-Inline Nesting Pitfall',
              vi: 'Bẫy Lồng Thẻ Block Bên Trong Thẻ Paragraph (<p>)',
            },
            content: {
              en: 'Browsers automatically auto-close `<p>` elements when encountering block elements like `<div>` or `<table>`, silently breaking DOM tree layout.',
              vi: 'Trình duyệt sẽ tự động đóng thẻ `<p>` khi gặp thẻ block như `<div>` hay `<table>`, làm gãy cấu trúc cây DOM một cách âm thầm.',
            },
          },
        ],
      },
      {
        id: 'hce-ch-2',
        number: 2,
        slug: 'div-button-accessibility-trap',
        title: {
          en: 'The "Div as Button" Anti-Pattern',
          vi: 'Sai Lầm Lớn: Dùng Thẻ Div Lập Lập Làm Button',
        },
        summary: {
          en: 'Why <div onclick="..."> fails keyboard focus and screen readers.',
          vi: 'Tại sao <div onclick="..."> làm hỏng khả năng focus bằng bàn phím và trình đọc màn hình.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'hce-2-1',
            title: {
              en: 'Replacing Div Buttons with Native <button>',
              vi: 'Thay Thế Div Button Bằng Thẻ Native <button>',
            },
            content: {
              en: 'Native `<button>` handles Space/Enter key execution, focus rings, and screen reader announcements automatically. Divs require manual tabindex, keydown listeners, and ARIA attributes.',
              vi: 'Thẻ `<button>` native tự xử lý phím Space/Enter, hiệu ứng focus và đọc màn hình. Thẻ div sẽ đòi hỏi tabindex, keydown listener và ARIA thủ công.',
            },
          },
        ],
      },
    ],
  },

  // 5. HTML Best Practices
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
