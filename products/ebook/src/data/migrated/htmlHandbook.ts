import { Book } from '../../types';

export const HTML_HANDBOOK_BOOK: Book = {
  id: 'html-handbook',
  slug: 'html-handbook',
  title: 'HTML Handbook',
  subtitle: {
    en: 'Semantic Web Architecture, DOM Mechanics, Accessible Forms & Modern HTML5 Standards',
    vi: 'Kiến Trúc Web Ngữ Nghĩa, Cơ Chế DOM, Form Tiếp Cận Chuẩn WCAG & Tiêu Chuẩn HTML5',
  },
  bookType: 'Handbook',
  categoryId: 'html',
  subjectId: 'web',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational',
  estimatedReadTime: '40 mins',
  chaptersCount: 3,
  publishedDate: '2025-02-10',
  accentColor: 'from-orange-500 to-amber-700',
  tags: ['HTML5', 'Semantics', 'DOM', 'Accessibility', 'Web Standards', 'Forms'],
  description: {
    en: 'Authoritative engineering reference manual for HTML: semantic document architecture, parsing algorithms, accessible forms, responsive media, and DOM tree relationships.',
    vi: 'Cẩm nang tra cứu kỹ thuật chuẩn mực cho HTML: kiến trúc tài liệu ngữ nghĩa, thuật toán phân tích DOM, thiết kế form chuẩn accessibility, đa phương tiện đáp ứng và quan hệ cây DOM.',
  },
  prerequisites: {
    en: [
      'Basic familiarity with web browser operation and text editors',
    ],
    vi: [
      'Làm quen cơ bản với thao tác trình duyệt web và trình soạn thảo văn bản',
    ],
  },
  outcomes: {
    en: [
      'Architect robust, accessible web document structures using native HTML5 landmarks (<header>, <main>, <nav>, <article>, <aside>, <footer>)',
      'Construct keyboard-navigable, accessible forms utilizing fieldsets, legends, explicit labels, and native constraint validation',
      'Optimize media assets with responsive <picture>, srcset, loading="lazy", and decoding="async" attributes to protect Web Vitals',
    ],
    vi: [
      'Xây dựng cấu trúc tài liệu web vững chắc và tiếp cận tốt bằng các landmark HTML5 (<header>, <main>, <nav>, <article>, <aside>, <footer>)',
      'Thiết kế form điều hướng bàn phím hoàn chỉnh với fieldset, legend, nhãn label tường minh và kiểm tra hợp lệ native',
      'Tối ưu tài nguyên đa phương tiện bằng thẻ <picture>, srcset, loading="lazy" và decoding="async" để bảo vệ chỉ số Web Vitals',
    ],
  },
  parts: [
    {
      partNumber: 1,
      title: {
        en: 'Document Foundations & Semantic Hierarchy',
        vi: 'Nền Tảng Tài Liệu & Cấu Trúc Ngữ Nghĩa',
      },
      description: {
        en: 'HTML5 DOCTYPE, document metadata, DOM tree construction, and landmark elements.',
        vi: 'Chuẩn DOCTYPE HTML5, metadata tài liệu, cơ chế tạo cây DOM và các thẻ mốc landmark.',
      },
      chapterIds: ['html-hb-ch-1'],
    },
    {
      partNumber: 2,
      title: {
        en: 'Interactive Controls & Constraint Validation Forms',
        vi: 'Điều Khiển Tương Tác & Form Xác Thực Dữ Liệu Native',
      },
      description: {
        en: 'Form controls, explicit labeling, grouping with fieldsets, and native browser validation.',
        vi: 'Các điều khiển form, gắn nhãn tường minh, nhóm bằng fieldset và xác thực native của trình duyệt.',
      },
      chapterIds: ['html-hb-ch-2'],
    },
    {
      partNumber: 3,
      title: {
        en: 'Tabular Data, Responsive Media & Accessibility Standards',
        vi: 'Dữ Liệu Bảng, Đa Phương Tiện Đáp Ứng & Tiêu Chuẩn Accessibility',
      },
      description: {
        en: 'Accessible data tables, responsive picture art direction, lazy loading, and ARIA integration.',
        vi: 'Bảng dữ liệu tiếp cận, chỉ đạo nghệ thuật thẻ picture đáp ứng, lazy loading và tích hợp ARIA.',
      },
      chapterIds: ['html-hb-ch-3'],
    },
  ],
  glossary: [
    {
      term: 'Semantic Element',
      vietnameseTerm: 'Phần Tử Ngữ Nghĩa',
      category: 'Architecture',
      definition: {
        en: 'An HTML element that conveys structural and contextual meaning to browsers, assistive technologies, and developers (e.g., <article>, <nav>, <main>) rather than purely visual formatting.',
        vi: 'Phần tử HTML truyền tải ý nghĩa cấu trúc và ngữ cảnh tới trình duyệt, công nghệ hỗ trợ và lập trình viên (như <article>, <nav>, <main>) thay vì chỉ định dạng thuần thị giác.',
      },
      relatedChapter: 1,
    },
    {
      term: 'DOM (Document Object Model)',
      vietnameseTerm: 'Mô Hình Đối Tượng Tài Liệu (DOM)',
      category: 'Engine',
      definition: {
        en: 'The tree-structured in-memory object representation constructed by the browser engine upon parsing raw HTML tokens, accessible via JavaScript.',
        vi: 'Mô hình cấu trúc cây đối tượng trong bộ nhớ được engine trình duyệt tạo ra sau khi phân tích mã HTML thô, có thể thao tác qua JavaScript.',
      },
      relatedChapter: 1,
    },
    {
      term: 'Accessible Name',
      vietnameseTerm: 'Tên Tiếp Cận (Accessible Name)',
      category: 'Accessibility',
      definition: {
        en: 'The computed text string exposed by assistive technology to identify a specific user interface control, derived from associated <label>, aria-label, or element text content.',
        vi: 'Chuỗi văn bản được tính toán mà công nghệ hỗ trợ sử dụng để nhận dạng điều khiển giao diện người dùng, lấy từ thẻ <label>, aria-label hoặc nội dung văn bản.',
      },
      relatedChapter: 2,
    },
    {
      term: 'Void Element',
      vietnameseTerm: 'Phần Tử Rỗng (Void Element)',
      category: 'Syntax',
      definition: {
        en: 'An HTML element that cannot have any child nodes (neither text nor nested elements) and never has a closing tag (e.g., <input>, <img>, <br>, <meta>).',
        vi: 'Phần tử HTML không thể chứa các nút con (cả văn bản lẫn thẻ lồng) và không bao giờ có thẻ đóng (như <input>, <img>, <br>, <meta>).',
      },
      relatedChapter: 1,
    },
    {
      term: 'Constraint Validation API',
      vietnameseTerm: 'API Xác Thực Ràng Buộc',
      category: 'Forms',
      definition: {
        en: 'Native browser mechanisms checking form control states (such as required, pattern, minlength) before submission and triggering standard validation UI bubbles.',
        vi: 'Cơ chế native của trình duyệt kiểm tra trạng thái điều khiển form (như required, pattern, minlength) trước khi gửi và kích hoạt bong bóng thông báo lỗi chuẩn.',
      },
      relatedChapter: 2,
    },
    {
      term: 'Art Direction',
      vietnameseTerm: 'Chỉ Đạo Nghệ Thuật Hình Ảnh',
      category: 'Media',
      definition: {
        en: 'Serving distinctly cropped or composed image variants depending on viewport width or display pixel density using the <picture> and <source> elements.',
        vi: 'Phục vụ các biến thể hình ảnh được cắt cúp hoặc bố cục khác biệt tùy theo chiều rộng viewport hoặc mật độ điểm ảnh bằng thẻ <picture> và <source>.',
      },
      relatedChapter: 3,
    },
    {
      term: 'Cumulative Layout Shift (CLS)',
      vietnameseTerm: 'Độ Dịch Chuyển Bố Cục Tích Lũy (CLS)',
      category: 'Performance',
      definition: {
        en: 'A Core Web Vital measuring unexpected visual layout shifts during page render, prevented by reserving image aspect-ratio space via width and height attributes.',
        vi: 'Chỉ số Core Web Vital đo lường sự dịch chuyển vị trí bất ngờ của các phần tử khi trang đang tải, được ngăn ngừa bằng cách khai báo width và height để giữ chỗ.',
      },
      relatedChapter: 3,
    },
    {
      term: 'ARIA (Accessible Rich Internet Applications)',
      vietnameseTerm: 'Tiêu Chuẩn ARIA',
      category: 'Accessibility',
      definition: {
        en: 'A W3C specification providing semantic attributes (roles, states, properties) to enhance accessibility for complex dynamic widgets when native HTML elements do not exist.',
        vi: 'Đặc tả của W3C cung cấp các thuộc tính ngữ nghĩa (roles, states, properties) để nâng cao khả năng tiếp cận cho các widget động khi không có thẻ HTML native phù hợp.',
      },
      relatedChapter: 3,
    },
  ],
  furtherReading: [
    {
      title: 'HTML Living Standard',
      author: 'WHATWG (Web Hypertext Application Technology Working Group)',
      year: '2025',
      description: {
        en: 'The definitive canonical specification governing HTML parsing, DOM interfaces, and web platform standards.',
        vi: 'Đặc tả chuẩn mực duy nhất quy định cơ chế phân tích cú pháp HTML, giao diện DOM và các tiêu chuẩn nền tảng web.',
      },
    },
    {
      title: 'Web Content Accessibility Guidelines (WCAG) 2.2',
      author: 'W3C Accessibility Guidelines Working Group',
      year: '2023',
      description: {
        en: 'Authoritative international guidelines for building perceivable, operable, understandable, and robust web experiences.',
        vi: 'Hướng dẫn tiêu chuẩn quốc tế để xây dựng trang web có thể cảm nhận, vận hành, hiểu và tương thích vững chắc.',
      },
    },
    {
      title: 'High Performance Browser Networking',
      author: 'Ilya Grigorik',
      year: '2013',
      description: {
        en: 'Comprehensive guide to resource loading, HTTP pipelines, image optimization, and document rendering pipelines.',
        vi: 'Cẩm nang toàn diện về nạp tài nguyên, đường ống HTTP, tối ưu hình ảnh và chu trình dựng hình tài liệu.',
      },
    },
    {
      title: 'Inclusive Design Patterns: Coding Accessibility Into Web Applications',
      author: 'Heydon Pickering',
      year: '2016',
      description: {
        en: 'Practical architectural blueprints for keyboard interactions, semantic forms, and accessible design systems.',
        vi: 'Các mẫu thiết kế kiến trúc thực tế cho tương tác bàn phím, biểu mẫu ngữ nghĩa và hệ thống thiết kế tiếp cận.',
      },
    },
  ],
  chapters: [
    {
      id: 'html-hb-ch-1',
      number: 1,
      slug: 'semantic-html5-structure',
      title: {
        en: 'Semantic HTML5 Architecture & Document Tree',
        vi: 'Kiến Trúc HTML5 Ngữ Nghĩa & Cây Tài Liệu',
      },
      summary: {
        en: 'Document structure, DOM parsing lifecycle, semantic landmarks (<header>, <nav>, <main>, <article>, <aside>, <footer>), and heading hierarchy.',
        vi: 'Cấu trúc tài liệu, chu trình parse DOM, các thẻ landmark ngữ nghĩa (<header>, <nav>, <main>, <article>, <aside>, <footer>) và thứ bậc tiêu đề.',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'html-hb-1-1',
          title: {
            en: 'The HTML5 Document Skeleton & Parsing Flow',
            vi: 'Khung Tài Liệu HTML5 & Luồng Phân Tích Cú Pháp DOM',
          },
          keyIdea: {
            en: 'HTML is not merely visual styling code; it is a serialized tree of nodes that the browser parses into an active Document Object Model (DOM) and Accessibility Tree.',
            vi: 'HTML không phải mã định dạng thị giác đơn thuần; nó là cấu trúc cây tuần tự hóa mà trình duyệt phân tích thành Cây DOM và Cây Tiếp Cận (Accessibility Tree).',
          },
          content: {
            en: 'Every modern HTML document begins with the `<!DOCTYPE html>` preamble, which signals standards mode and disables quirks mode rendering. The root `<html>` element contains exactly two direct children: `<head>` (containing metadata, document titles, character encodings, and stylesheets) and `<body>` (containing the renderable document tree). During parsing, raw HTML byte streams are decoded into characters, tokenized into tags, and assembled into hierarchical DOM nodes. Concurrently, assistive technologies construct an Accessibility Tree derived from these semantic nodes to empower screen readers.',
            vi: 'Mọi tài liệu HTML hiện đại bắt đầu với khai báo `<!DOCTYPE html>`, chỉ định trình duyệt render ở chế độ tiêu chuẩn (standards mode) và vô hiệu hóa chế độ tương thích cũ (quirks mode). Phần tử gốc `<html>` chứa đúng hai nút con trực tiếp: `<head>` (chứa metadata, tiêu đề trang, bảng mã ký tự và liên kết CSS) và `<body>` (chứa toàn bộ cây tài liệu hiển thị). Trong quá trình phân tích (parsing), luồng byte HTML thô được giải mã thành ký tự, tách thành các token thẻ và ráp thành các nút DOM phân cấp. Đồng thời, trình duyệt tự động tạo Cây Tiếp Cận (Accessibility Tree) từ các nút ngữ nghĩa này để hỗ trợ trình đọc màn hình.',
          },
          codeBlock: {
            language: 'html',
            filename: 'document_skeleton.html',
            explanation: {
              en: 'Standard modern HTML5 document boilerplate with complete metadata declarations.',
              vi: 'Bộ khung tài liệu HTML5 hiện đại chuẩn mực với đầy đủ khai báo metadata.',
            },
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Production-grade engineering reference for modern web architectures.">
  <title>Semantic Document Architecture | 4TM Platform</title>
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
  <header>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <nav aria-label="Main Navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/catalog">Catalog</a></li>
      </ul>
    </nav>
  </header>
  <main id="main-content">
    <h1>Engineering Standards Manual</h1>
    <p>Document body content...</p>
  </main>
  <footer>
    <p>&copy; 2025 4TM Engineering. All rights reserved.</p>
  </footer>
</body>
</html>`,
          },
          diagram: {
            title: {
              en: 'HTML Tokenization to Render Pipeline',
              vi: 'Quy Trình Phân Tích HTML Sang Cây Render & Cây Accessibility',
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Raw HTML Bytes', vi: 'Byte HTML Thô' },
                description: {
                  en: 'Browser streams network packets and decodes bytes into character strings based on charset UTF-8.',
                  vi: 'Trình duyệt nhận các gói mạng và giải mã byte thành chuỗi ký tự theo bảng mã charset UTF-8.',
                },
              },
              {
                stepNumber: 2,
                title: { en: 'Tokenization', vi: 'Tách Token Thẻ' },
                description: {
                  en: 'State machine converts characters into distinct StartTag, EndTag, and Text tokens.',
                  vi: 'Máy trạng thái chuyển đổi ký tự thành các token StartTag, EndTag và Text riêng biệt.',
                },
              },
              {
                stepNumber: 3,
                title: { en: 'DOM Tree Construction', vi: 'Tạo Cây Đối Tượng DOM' },
                description: {
                  en: 'Tokens are converted into Node objects establishing parent-child-sibling relationships.',
                  vi: 'Các token được chuyển thành đối tượng Node thiết lập quan hệ cha-con-anh em.',
                },
              },
              {
                stepNumber: 4,
                title: { en: 'Accessibility Tree Synthesis', vi: 'Tổng Hợp Cây Accessibility' },
                description: {
                  en: 'The accessibility API filters the DOM tree into semantic roles, states, and accessible names.',
                  vi: 'API accessibility lọc cây DOM thành các role, state và accessible name để phục vụ screen reader.',
                },
              },
            ],
          },
          comparisonTable: {
            headers: [
              { en: 'Feature / Tag', vi: 'Đặc Điểm / Thẻ' },
              { en: 'Semantic HTML5 Landmark', vi: 'Thẻ Landmark Ngữ Nghĩa HTML5' },
              { en: 'Generic Container (<div id="...">)', vi: 'Khối Div Chung (<div id="...">)' },
            ],
            rows: [
              {
                en: [
                  'Screen Reader Navigation',
                  'Exposed as native landmark; user can jump directly via shortcut keys',
                  'Ignored by landmark menus unless custom ARIA role is manually appended',
                ],
                vi: [
                  'Điều Hướng Screen Reader',
                  'Hiển thị thành landmark chuẩn; người khiếm thị có thể nhảy tới bằng phím tắt',
                  'Bị bỏ qua hoàn toàn trừ khi gắn thêm thuộc tính role ARIA thủ công',
                ],
              },
              {
                en: [
                  'SEO / Crawler Indexing',
                  'Search engines prioritize text in <main> and <article> over sidebars and footers',
                  'Treated as ambiguous raw text with equal weight across all containers',
                ],
                vi: [
                  'Đánh Chỉ Mục SEO',
                  'Công cụ tìm kiếm ưu tiên văn bản trong <main> và <article> hơn sidebar và footer',
                  'Bị coi là văn bản thô mập mờ với trọng số ngang bằng nhau',
                ],
              },
              {
                en: [
                  'Browser Reader Mode',
                  'Extracts clean article typography automatically by parsing <article> and <h1>',
                  'Often fails to isolate core narrative, rendering navigation clutter',
                ],
                vi: [
                  'Chế Độ Đọc Reader Mode',
                  'Tự động trích xuất bài viết nhờ nhận diện đúng thẻ <article> và <h1>',
                  'Thường thất bại trong việc lọc bài viết chính, bị dính menu rác',
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'html-hb-ch-2',
      number: 2,
      slug: 'forms-and-input-types',
      title: {
        en: 'Accessible Forms & Constraint Validation',
        vi: 'Biểu Mẫu Tiếp Cận & Xác Thực Ràng Buộc',
      },
      summary: {
        en: 'Semantic form controls, explicit label binding (<label for="...">), fieldset groups, and native browser constraint validation.',
        vi: 'Các điều khiển form ngữ nghĩa, liên kết nhãn tường minh (<label for="...">), nhóm fieldset và cơ chế xác thực ràng buộc native.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'html-hb-2-1',
          title: {
            en: 'Form Architecture & Native Validation Rules',
            vi: 'Kiến Trúc Form & Các Quy Tắc Xác Thực Native',
          },
          keyIdea: {
            en: 'Native HTML5 form validation attributes provide accessible, JavaScript-free validation out of the box while enforcing strict programmatic label associations.',
            vi: 'Các thuộc tính xác thực form HTML5 native cung cấp khả năng kiểm tra hợp lệ tiếp cận ngay lập tức mà không cần JS, đồng thời đảm bảo liên kết nhãn chặt chẽ.',
          },
          content: {
            en: 'An accessible form requires every interactive control (`<input>`, `<select>`, `<textarea>`) to possess a programmatically determined accessible name. This is achieved using an explicit `<label>` whose `for` attribute matches the input element\'s unique `id`. Placeholders are visual hints and must never substitute for labels. Logical groups of related options (such as radio buttons or shipping address fields) must be encapsulated in a `<fieldset>` accompanied by a descriptive `<legend>`. Furthermore, HTML5 native attributes (`required`, `type="email"`, `pattern="[0-9]{5}"`, `min`, `max`, `step`) trigger the browser\'s Constraint Validation API automatically prior to form submission.',
            vi: 'Một form chuẩn tiếp cận đòi hỏi mọi điều khiển tương tác (`<input>`, `<select>`, `<textarea>`) phải có một tên tiếp cận được xác định rõ ràng qua mã. Điều này đạt được nhờ thẻ `<label>` tường minh có thuộc tính `for` khớp với `id` duy nhất của ô input. Placeholder chỉ là gợi ý thị giác tạm thời và tuyệt đối không thể thay thế thẻ label. Các nhóm lựa chọn liên quan (như radio button hoặc địa chỉ giao hàng) bắt buộc phải được đóng gói trong `<fieldset>` kèm theo tiêu đề `<legend>`. Thêm vào đó, các thuộc tính native của HTML5 (`required`, `type="email"`, `pattern="[0-9]{5}"`, `min`, `max`, `step`) tự động kích hoạt API Xác thực Ràng buộc của trình duyệt trước khi submit form.',
          },
          codeBlock: {
            language: 'html',
            filename: 'accessible_form.html',
            explanation: {
              en: 'Accessible registration form featuring fieldsets, explicit label associations, and native validation rules.',
              vi: 'Form đăng ký chuẩn tiếp cận gồm fieldset, liên kết label tường minh và quy tắc xác thực native.',
            },
            code: `<form action="/api/checkout" method="POST" novalidate>
  <fieldset>
    <legend>Account Credentials</legend>

    <div class="form-group">
      <label for="user-email">Work Email Address <span aria-hidden="true">*</span></label>
      <input 
        type="email" 
        id="user-email" 
        name="email" 
        required 
        autocomplete="email"
        aria-describedby="email-hint"
      >
      <p id="email-hint" class="hint-text">We will send your verification token to this address.</p>
    </div>

    <div class="form-group">
      <label for="user-pass">Password (8+ chars, 1 number) <span aria-hidden="true">*</span></label>
      <input 
        type="password" 
        id="user-pass" 
        name="password" 
        required 
        minlength="8" 
        pattern="(?=.*\\d).{8,}"
        autocomplete="new-password"
      >
    </div>
  </fieldset>

  <fieldset>
    <legend>Billing Frequency</legend>
    <div class="radio-group">
      <input type="radio" id="billing-monthly" name="billing" value="monthly" checked>
      <label for="billing-monthly">Monthly Billing ($29/mo)</label>
    </div>
    <div class="radio-group">
      <input type="radio" id="billing-annual" name="billing" value="annual">
      <label for="billing-annual">Annual Billing ($290/yr - Save 17%)</label>
    </div>
  </fieldset>

  <button type="submit">Complete Subscription</button>
</form>`,
          },
          comparisonTable: {
            headers: [
              { en: 'Attribute / Pattern', vi: 'Thuộc Tính / Mẫu Thiết Kế' },
              { en: 'WCAG Accessible Standard', vi: 'Chuẩn Tiếp Cận WCAG' },
              { en: 'Accessibility Anti-Pattern', vi: 'Sai Lầm Thường Gặp' },
            ],
            rows: [
              {
                en: [
                  'Field Identification',
                  '<label for="email">Email</label> bound to <input id="email">',
                  '<input placeholder="Email"> without any <label> element',
                ],
                vi: [
                  'Nhận Diện Ô Nhập Liệu',
                  '<label for="email">Email</label> liên kết với <input id="email">',
                  '<input placeholder="Email"> không hề có thẻ <label>',
                ],
              },
              {
                en: [
                  'Grouping Controls',
                  '<fieldset><legend>Payment Method</legend> ... </fieldset>',
                  '<div><h3>Payment Method</h3> ... </div> without group context',
                ],
                vi: [
                  'Nhóm Các Điều Khiển',
                  '<fieldset><legend>Phương thức thanh toán</legend> ... </fieldset>',
                  '<div><h3>Phương thức thanh toán</h3> ... </div> thiếu ngữ cảnh nhóm',
                ],
              },
              {
                en: [
                  'Error Association',
                  'aria-describedby="error-msg" on input reading live feedback',
                  'Colored text floating near input without programmatic link',
                ],
                vi: [
                  'Liên Kết Lỗi',
                  'aria-describedby="error-msg" trên input để screen reader đọc lỗi',
                  'Dòng chữ đỏ trôi nổi cạnh ô nhập không có liên kết mã',
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'html-hb-ch-3',
      number: 3,
      slug: 'media-tables-and-accessibility',
      title: {
        en: 'Accessible Tables & Responsive Media Optimization',
        vi: 'Bảng Dữ Liệu Tiếp Cận & Tối Ưu Đa Phương Tiện Đáp Ứng',
      },
      summary: {
        en: 'Data table structures with <th> scope attributes, responsive <picture> art direction, WebP/AVIF formats, and loading="lazy".',
        vi: 'Cấu trúc bảng dữ liệu với thuộc tính scope trên <th>, chỉ đạo nghệ thuật <picture>, định dạng WebP/AVIF và loading="lazy".',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'html-hb-3-1',
          title: {
            en: 'Responsive Images (<picture>) & Tabular Semantics',
            vi: 'Hình Ảnh Đáp Ứng (<picture>) & Ngữ Nghĩa Bảng Dữ Liệu',
          },
          keyIdea: {
            en: 'Modern HTML leverages <picture> and srcset to serve modern image formats and resolution-tailored assets while maintaining explicit width/height dimensions to eliminate Cumulative Layout Shift (CLS).',
            vi: 'HTML hiện đại sử dụng thẻ <picture> và srcset để phân phối định dạng ảnh thế hệ mới theo độ phân giải, đồng thời khai báo kích thước width/height để triệt tiêu lỗi giật trang CLS.',
          },
          content: {
            en: 'Serving raw, unoptimized images is the leading cause of poor Largest Contentful Paint (LCP) and high bandwidth consumption. The `<picture>` element allows developers to deliver AVIF and WebP formats with fallback to standard JPEG/PNG via child `<source>` elements. Adding `loading="lazy"` defers off-screen image fetching until the user scrolls near the viewport, while `decoding="async"` prevents main-thread decoding bottlenecks. For structured data, HTML tables must utilize `<caption>`, `<thead>`, `<tbody>`, and `<th scope="col">` or `<th scope="row">` headers to enable screen readers to read row and column coordinates accurately during table cell navigation.',
            vi: 'Việc tải hình ảnh thô chưa tối ưu là nguyên nhân hàng đầu làm suy giảm chỉ số LCP (Largest Contentful Paint) và tiêu tốn băng thông. Thẻ `<picture>` cho phép phân phối định dạng AVIF và WebP hiện đại với cơ chế fallback về JPEG/PNG thông qua các thẻ con `<source>`. Thêm thuộc tính `loading="lazy"` giúp trì hoãn nạp ảnh ngoài màn hình cho tới khi người dùng cuộn tới gần, trong khi `decoding="async"` ngăn chặn tắc nghẽn giải mã ảnh trên main thread. Đối với dữ liệu bảng, thẻ `<table>` bắt buộc phải có `<caption>`, `<thead>`, `<tbody>` và thuộc tính `<th scope="col">` hoặc `<th scope="row">` để trình đọc màn hình đọc rõ tọa độ dòng/cột khi người dùng điều hướng ô.',
          },
          codeBlock: {
            language: 'html',
            filename: 'media_and_tables.html',
            explanation: {
              en: 'Responsive picture art direction with format fallback and accessible tabular markup.',
              vi: 'Chỉ đạo nghệ thuật ảnh đáp ứng với fallback định dạng và cấu trúc bảng tiếp cận chuẩn mực.',
            },
            code: `<!-- 1. Modern Responsive Picture with Format Negotiation -->
<picture>
  <source srcset="/images/hero-large.avif" type="image/avif" media="(min-width: 1024px)">
  <source srcset="/images/hero-large.webp" type="image/webp" media="(min-width: 1024px)">
  <source srcset="/images/hero-small.webp" type="image/webp">
  <img 
    src="/images/hero-fallback.jpg" 
    alt="Architectural diagram of the 4TM distributed edge network"
    width="1200" 
    height="630" 
    loading="lazy" 
    decoding="async"
  >
</picture>

<!-- 2. Accessible Data Table with Explicit Header Scopes -->
<table>
  <caption>Quarterly Operating Margins by Geographic Territory (2024-2025)</caption>
  <thead>
    <tr>
      <th scope="col">Territory</th>
      <th scope="col">Q1 Revenue ($M)</th>
      <th scope="col">Q2 Revenue ($M)</th>
      <th scope="col">Operating Margin (%)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North America</th>
      <td>$142.5</td>
      <td>$158.2</td>
      <td>31.4%</td>
    </tr>
    <tr>
      <th scope="row">Asia-Pacific</th>
      <td>$98.4</td>
      <td>$112.0</td>
      <td>28.9%</td>
    </tr>
  </tbody>
</table>`,
          },
        },
      ],
    },
  ],
};
