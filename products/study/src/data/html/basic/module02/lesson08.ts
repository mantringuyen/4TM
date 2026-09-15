import { Lesson } from '../../../../types';

export const lesson08: Lesson = {
  id: 'html_lesson_8',
  moduleId: 'html_mod_2',
  levelId: 'basic',
  courseId: 'html',
  order: 8,
  topicId: 'html_landmarks',
  title: {
    en: 'Semantic Layout: header, nav, main, article, section, aside & footer',
    vi: 'Bố Cục Ngữ Nghĩa: header, nav, main, article, section, aside & footer'
  },
  summary: {
    en: 'Master modern semantic landmark architecture: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, and <address> to eliminate generic <div> soups and provide pristine accessibility landmark navigation.',
    vi: 'Làm chủ kiến trúc vùng mốc ngữ nghĩa hiện đại: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, và <address> để loại bỏ hoàn toàn bẫy thẻ <div> vô nghĩa và tối ưu hóa điều hướng phím tắt cho trình đọc màn hình.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Semantic layout elements transform unstructured web documents into an organized, machine-understandable architectural blueprint. Assistive technologies (screen readers) rely on semantic landmarks to allow blind and motor-impaired users to instantly jump to specific sections of a web page.',
      vi: 'Các thẻ bố cục ngữ nghĩa biến tài liệu web vô định hình thành một bản thiết kế kiến trúc rõ ràng mà máy móc có thể hiểu được. Công nghệ trợ thính (trình đọc màn hình) dựa vào các vùng mốc này để cho phép người dùng khiếm thị nhảy ngay đến các khu vực mong muốn.'
    },
    conceptExplanation: {
      en: '1. **`<header>`**: Introductory banner content, logos, search bars, and primary navigation.\n2. **`<nav>`**: Major navigation blocks (site menus, table of contents, breadcrumbs, pagination). Not every group of links needs a `<nav>`.\n3. **`<main>`**: The unique central topic of the document. There MUST be only one visible `<main>` element per page, and it must never be nested inside `<article>`, `<aside>`, `<header>`, or `<footer>`.\n4. **`<article>`**: A self-contained, independently distributable composition (e.g. blog post, news story, forum message, product card, interactive widget).\n5. **`<section>`**: A generic thematic grouping of content, typically accompanied by a heading (e.g. Features section, Testimonials section).\n6. **`<aside>`**: Content tangentially related to the surrounding content (e.g. sidebars, callout boxes, related articles, author biographies).\n7. **`<footer>`**: Metadata about the containing section or page (copyright notices, legal links, author contact info).\n8. **`<address>`**: Contact information for the author or organization of the document or article.',
      vi: '1. **`<header>`**: Phần đầu trang hoặc đầu bài viết chứa logo, thanh tìm kiếm và thanh điều hướng chính.\n2. **`<nav>`**: Khối điều hướng quan trọng (menu trang web, mục lục bài viết, breadcrumb, phân trang). Không phải mọi nhóm link đều cần thẻ `<nav>`.\n3. **`<main>`**: Nội dung cốt lõi độc nhất của trang. BẮT BUỘC chỉ có MỘT thẻ `<main>` nhìn thấy được trên mỗi trang và không bao giờ lồng trong `<article>`, `<aside>`, `<header>` hay `<footer>`.\n4. **`<article>`**: Khối nội dung độc lập, hoàn chỉnh có thể tái xuất bản ở nơi khác (vd: bài blog, tin tức, bình luận, thẻ sản phẩm).\n5. **`<section>`**: Nhóm nội dung theo chủ đề cụ thể, thường đi kèm một tiêu đề (vd: phần Tính năng, Đánh giá khách hàng).\n6. **`<aside>`**: Nội dung liên quan phụ trợ (thanh bên sidebar, hộp ghi chú chú giải, bài viết liên quan).\n7. **`<footer>`**: Chân trang hoặc chân khối bài viết chứa bản quyền, liên kết pháp lý, tác giả.\n8. **`<address>`**: Thông tin liên hệ của tác giả hoặc tổ chức chịu trách nhiệm về tài liệu.'
    },
    syntax: `<header>
  <a href="/" class="logo">Acme Corp</a>
  <nav aria-label="Main"><a href="/docs">Docs</a></nav>
</header>
<main>
  <article>
    <h1>Modern Semantic Architecture</h1>
    <section><h2>Introduction</h2><p>Content...</p></section>
  </article>
  <aside><h3>Related Links</h3></aside>
</main>
<footer><p>&copy; 2026 Acme Corp.</p></footer>`,
    examples: [
      {
        title: {
          en: 'Full Semantic Blog Post Architecture',
          vi: 'Kiến Trúc Toàn Diện Cho Bài Viết Blog Ngữ Nghĩa'
        },
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Engineering Blog</title>
</head>
<body>
  <header>
    <h1>Tech Insights</h1>
    <nav aria-label="Site Navigation">
      <ul><li><a href="/">Home</a></li><li><a href="/archive">Archive</a></li></ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>Mastering Semantic HTML5</h2>
        <p>Published by <address class="author-inline"><a href="mailto:alex@4tm.dev">Alex Rivers</a></address></p>
      </header>
      <section>
        <h3>Why Semantics Matter</h3>
        <p>Semantic elements improve SEO, accessibility, and maintenance.</p>
      </section>
      <footer>
        <p>Tagged in: HTML5, Accessibility, Web Standards</p>
      </footer>
    </article>

    <aside aria-label="Author Bio">
      <h3>About the Author</h3>
      <p>Alex is a Principal Web Architect at 4TM.</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 4TM Platform. All rights reserved.</p>
  </footer>
</body>
</html>`,
        language: 'html',
        explanation: {
          en: 'Shows proper hierarchical relationships: header with nav, main with nested article and aside, and distinct footers.',
          vi: 'Minh họa mối quan hệ phân cấp chuẩn: header chứa nav, main chứa article và aside, cùng các footer chuyên biệt.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Having multiple visible <main> elements on the same page',
          vi: 'Đặt nhiều thẻ <main> hiển thị trên cùng một trang'
        },
        correction: {
          en: 'Each HTML document must have only one visible <main> element representing the primary topic.',
          vi: 'Mỗi tài liệu HTML chỉ được có duy nhất một thẻ <main> hiển thị đại diện cho nội dung chính.'
        },
        code: '<!-- Correct: Exactly one <main> per document -->'
      },
      {
        mistake: {
          en: 'Using <section> purely as a styling container instead of <div>',
          vi: 'Dùng thẻ <section> thay cho <div> chỉ để phục vụ CSS chia layout'
        },
        correction: {
          en: 'Use <div> for generic layout/styling wrappers with no semantic meaning. Reserve <section> for thematic groupings that each have a heading.',
          vi: 'Dùng <div> cho các khung bao bọc CSS trang trí không mang ngữ nghĩa. Dành <section> cho các nhóm chủ đề có tiêu đề heading.'
        },
        code: '<!-- Correct: <section><h2>Section Title</h2>...</section> -->'
      }
    ],
    tips: [
      {
        en: 'Screen reader users can press landmark navigation keys to jump directly between <main>, <nav>, <header>, and <footer>.',
        vi: 'Người dùng trình đọc màn hình có thể bấm phím tắt vùng mốc để nhảy thẳng giữa <main>, <nav>, <header> và <footer>.'
      }
    ],
    practice: {
      task: {
        en: 'Construct a Semantic Landmark Page Skeleton',
        vi: 'Xây Dựng Khung Trang Vùng Mốc Ngữ Nghĩa'
      },
      instruction: {
        en: 'Create a semantic layout containing: a <header> with a top <h1>, a <nav> with an anchor link, a <main> enclosing an <article> with an <h2> heading and <p> text, and a <footer> with a copyright paragraph.',
        vi: 'Tạo bố cục ngữ nghĩa gồm: <header> có <h1>, <nav> có liên kết a, <main> chứa <article> có <h2> và <p>, và <footer> có đoạn văn bản bản quyền.'
      },
      starterCode: '<!-- Build semantic skeleton -->\n',
      solutionCode: `<header>
  <h1>Platform News</h1>
  <nav>
    <a href="/topics">Browse Topics</a>
  </nav>
</header>
<main>
  <article>
    <h2>Semantic Web 2026</h2>
    <p>Semantic markup is the backbone of accessible design.</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 Platform News.</p>
</footer>`,
      requiredPatterns: [
        '<header>',
        '<nav>',
        '<main>',
        '<article>',
        '</article>',
        '</main>',
        '<footer>',
        '</footer>'
      ],
      hint: {
        en: 'Structure with <header>, <main> (containing <article>), and <footer> in sequence.',
        vi: 'Cấu trúc tuần tự theo thứ tự <header>, <main> (chứa <article>) và <footer>.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Build an Editorial Layout with Sidebar Aside and Author Address',
        vi: 'Xây Dựng Bố Cục Bài Viết Kèm Thanh Bên Aside Và Địa Chỉ Tác Giả'
      },
      instruction: {
        en: 'Construct a <main> landmark containing an <article> with an <address> author link, and an <aside> landmark containing related links.',
        vi: 'Tạo vùng <main> chứa bài viết <article> có thẻ <address> liên hệ tác giả và thanh bên <aside> chứa liên kết liên quan.'
      },
      starterCode: '<!-- Build main with article, address and aside -->\n',
      solutionCode: `<main>
  <article>
    <h2>Understanding ARIA vs Semantic HTML</h2>
    <p>Prefer native HTML elements over custom ARIA widgets whenever possible.</p>
    <address>
      Written by <a href="mailto:editor@4tm.dev">Editorial Staff</a>
    </address>
  </article>
  <aside>
    <h3>Related Guidelines</h3>
    <ul>
      <li><a href="/wcag">WCAG 2.2 Principles</a></li>
    </ul>
  </aside>
</main>`,
      requiredPatterns: [
        '<main>',
        '<article>',
        '<address>',
        '</address>',
        '</article>',
        '<aside>',
        '</aside>',
        '</main>'
      ],
      hint: {
        en: 'Place both <article> and <aside> inside <main>, and nest <address> inside <article>.',
        vi: 'Đặt cả <article> và <aside> trong <main>, và lồng thẻ <address> bên trong <article>.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_7_1',
      type: 'complete_code',
      title: {
        en: 'Replace Generic Divs with Semantic Landmarks',
        vi: 'Thay Thế Thẻ Div Chung Bằng Thẻ Vùng Mốc Ngữ Nghĩa'
      },
      instruction: {
        en: 'Replace the outer generic <div id="main-content"> with a semantic <main> tag and <div id="site-footer"> with <footer>.',
        vi: 'Thay thế thẻ <div id="main-content"> bằng <main> và <div id="site-footer"> bằng <footer>.'
      },
      starterCode: `<div id="main-content">
  <h1>Welcome to 4TM</h1>
</div>
<div id="site-footer">
  <p>&copy; 2026 4TM</p>
</div>`,
      solutionCode: `<main>
  <h1>Welcome to 4TM</h1>
</main>
<footer>
  <p>&copy; 2026 4TM</p>
</footer>`,
      hint: {
        en: 'Use <main> for primary content and <footer> for bottom footer.',
        vi: 'Dùng <main> cho nội dung chính và <footer> cho chân trang.'
      },
      explanation: {
        en: '<main> and <footer> are native landmark elements that screen readers can instantly locate.',
        vi: '<main> và <footer> là các vùng mốc gốc giúp trình đọc màn hình định vị tức thì.'
      }
    },
    {
      id: 'html_ex_7_2',
      type: 'fix_code',
      title: {
        en: 'Fix Misplaced Main Landmark Tag',
        vi: 'Sửa Lỗi Đặt Sai Vị Trí Thẻ Main'
      },
      instruction: {
        en: 'Remove <main> from inside the <header> and place it as a top-level child of <body> below <header>.',
        vi: 'Đưa thẻ <main> ra khỏi thẻ <header> và đặt nó thành con trực tiếp của <body> nằm dưới <header>.'
      },
      starterCode: `<header>
  <h1>App Title</h1>
  <main>
    <p>This is the main content.</p>
  </main>
</header>`,
      solutionCode: `<header>
  <h1>App Title</h1>
</header>
<main>
  <p>This is the main content.</p>
</main>`,
      hint: {
        en: '<main> must never be nested inside <header>, <footer>, <nav>, or <article>.',
        vi: '<main> không bao giờ được lồng trong <header>, <footer>, <nav> hay <article>.'
      },
      explanation: {
        en: 'The HTML5 specification forbids nesting <main> inside other landmark containers.',
        vi: 'Đặc tả HTML5 cấm lồng thẻ <main> vào trong các vùng mốc khác.'
      }
    },
    {
      id: 'html_ex_7_3',
      type: 'write_code',
      title: {
        en: 'Write Article with Header, Section, and Footer Sub-landmarks',
        vi: 'Tạo Thẻ Article Gồm Header, Section Và Footer Con'
      },
      instruction: {
        en: 'Write a self-contained <article> containing a child <header> with an <h2> title, a <section> with a <p>, and a child <footer> with author credits.',
        vi: 'Viết thẻ <article> độc lập gồm <header> con chứa <h2>, <section> chứa <p> và <footer> con chứa tác giả.'
      },
      starterCode: '<!-- Write structured article -->\n',
      solutionCode: `<article>
  <header>
    <h2>Deep Dive into CSS Grid</h2>
  </header>
  <section>
    <p>Grid layouts provide bidirectional two-dimensional alignment.</p>
  </section>
  <footer>
    <p>Written by Senior Frontend Engineer.</p>
  </footer>
</article>`,
      hint: {
        en: 'An <article> can have its own private <header>, <section>, and <footer>.',
        vi: 'Thẻ <article> có thể chứa các thẻ <header>, <section> và <footer> riêng biệt bên trong.'
      },
      explanation: {
        en: 'Sectioning elements like <article> can have scoped headers and footers.',
        vi: 'Các thẻ phân vùng như <article> có thể chứa header và footer cục bộ cho riêng nó.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_7',
    title: {
      en: 'Complete Semantic Portal Layout',
      vi: 'Bố Cục Cổng Thông Tin Ngữ Nghĩa Toàn Diện'
    },
    description: {
      en: 'Build a comprehensive semantic web portal featuring a top <header> with brand and <nav>, a central <main> landmark housing two self-contained <article> entries and an <aside> sidebar, and a root <footer> with an <address> contact landmark.',
      vi: 'Xây dựng cổng thông tin web ngữ nghĩa toàn diện gồm <header> có thương hiệu và <nav>, vùng <main> chứa 2 bài viết <article> và thanh bên <aside>, và <footer> có khối liên hệ <address>.'
    },
    requirements: [
      {
        en: '<header> containing brand title and <nav>',
        vi: '<header> chứa tiêu đề thương hiệu và <nav>'
      },
      {
        en: 'Exactly one <main> element as primary document body',
        vi: 'Chính xác một thẻ <main> làm nội dung cốt lõi của tài liệu'
      },
      {
        en: 'At least two independent <article> elements inside <main>',
        vi: 'Ít nhất 2 phần tử <article> độc lập bên trong <main>'
      },
      {
        en: '<aside> landmark containing supplementary resource links',
        vi: 'Vùng <aside> chứa các liên kết tài nguyên bổ trợ'
      },
      {
        en: '<footer> containing <address> with email link',
        vi: '<footer> chứa <address> có liên kết email'
      }
    ],
    starterCode: '<!-- Build complete semantic portal layout -->\n',
    solutionCode: `<header>
  <h1>Global Tech Dispatch</h1>
  <nav aria-label="Portal Navigation">
    <ul>
      <li><a href="/news">News</a></li>
      <li><a href="/research">Research</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Quantum Computing Breakthrough</h2>
    <p>Researchers achieve room-temperature quantum coherence.</p>
  </article>

  <article>
    <h2>Next-Generation Web Semantics</h2>
    <p>HTML5 landmarks streamline screen reader navigation.</p>
  </article>

  <aside aria-label="Trending Topics">
    <h3>Trending Tags</h3>
    <p>#HTML5 #Accessibility #WebStandards</p>
  </aside>
</main>

<footer>
  <address>
    Contact us at <a href="mailto:info@techdispatch.org">info@techdispatch.org</a>
  </address>
  <p>&copy; 2026 Global Tech Dispatch.</p>
</footer>`,
    hints: [
      {
        en: 'Ensure <header>, <main>, and <footer> are siblings at the root of <body>.',
        vi: 'Đảm bảo <header>, <main> và <footer> là các phần tử ngang hàng ở cấp cao nhất của <body>.'
      }
    ],
    solutionExplanation: {
      en: 'Creates a gold-standard W3C landmark layout ready for search crawlers and assistive accessibility technology.',
      vi: 'Tạo nên bố cục vùng mốc W3C chuẩn mực sẵn sàng cho bot tìm kiếm và công nghệ trợ thính.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_7_1',
      type: 'single_choice',
      question: {
        en: 'How many visible <main> elements are permitted in a valid HTML5 document?',
        vi: 'Có tối đa bao nhiêu phần tử <main> hiển thị được phép có trong một tài liệu HTML5 hợp lệ?'
      },
      options: [
        {
          en: 'Exactly one',
          vi: 'Chính xác một'
        },
        {
          en: 'Up to three per section',
          vi: 'Tối đa ba trên mỗi section'
        },
        {
          en: 'As many as there are articles',
          vi: 'Bao nhiêu cũng được tùy số lượng bài viết'
        },
        {
          en: 'Zero (it is deprecated)',
          vi: 'Không có (đã bị khai tử)'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A valid document must have only one visible <main> element to represent the central content.',
        vi: 'Tài liệu hợp lệ chỉ được phép có duy nhất một thẻ <main> hiển thị đại diện cho chủ đề chính.'
      },
      topicId: 'html_landmarks',
      difficulty: 'easy'
    },
    {
      id: 'html_q_7_2',
      type: 'single_choice',
      question: {
        en: 'When should you choose <article> over <section>?',
        vi: 'Khi nào bạn nên chọn thẻ <article> thay vì thẻ <section>?'
      },
      options: [
        {
          en: 'When the content represents a self-contained, independent composition that makes complete sense on its own (e.g. a blog post or news story)',
          vi: 'Khi nội dung đại diện cho một khối hoàn chỉnh, độc lập có ý nghĩa trọn vẹn khi tách riêng (vd: bài blog, mẩu tin tức)'
        },
        {
          en: 'When the text is longer than 500 words',
          vi: 'Khi đoạn văn dài hơn 500 từ'
        },
        {
          en: 'When adding background color gradients',
          vi: 'Khi muốn tạo màu nền chuyển sắc'
        },
        {
          en: 'When displaying tabular spreadsheets',
          vi: 'Khi hiển thị bảng tính'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<article> is for standalone, redistributable content, while <section> is for thematic groupings with a heading.',
        vi: '<article> dùng cho nội dung độc lập có thể phân phối lại, trong khi <section> là nhóm chủ đề có tiêu đề.'
      },
      topicId: 'html_landmarks',
      difficulty: 'medium'
    },
    {
      id: 'html_q_7_3',
      type: 'single_choice',
      question: {
        en: 'What is the primary role of the <aside> element?',
        vi: 'Vai trò cốt lõi của thẻ <aside> là gì?'
      },
      options: [
        {
          en: 'Represents tangentially related content such as sidebars, callout boxes, glossaries, or author bios',
          vi: 'Đại diện cho nội dung phụ trợ liên quan gián tiếp như thanh bên sidebar, hộp chú giải hoặc tiểu sử tác giả'
        },
        {
          en: 'Moves text to the right side of the screen using CSS float',
          vi: 'Đẩy văn bản sang lề phải màn hình bằng CSS float'
        },
        {
          en: 'Hides content from mobile screens',
          vi: 'Ẩn nội dung trên màn hình di động'
        },
        {
          en: 'Creates a pop-up modal dialog',
          vi: 'Tạo hộp thoại popup modal'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<aside> marks content that is indirectly related or supplementary to the main content.',
        vi: '<aside> đánh dấu nội dung phụ trợ hoặc có liên quan gián tiếp đến nội dung chính.'
      },
      topicId: 'html_landmarks',
      difficulty: 'easy'
    },
    {
      id: 'html_q_7_4',
      type: 'single_choice',
      question: {
        en: 'What type of information is the <address> element specifically designed to contain?',
        vi: 'Thẻ <address> được thiết kế chuyên biệt để chứa loại thông tin nào?'
      },
      options: [
        {
          en: 'Contact information (email, phone, physical location, URL) for the author or owning organization of the document or article',
          vi: 'Thông tin liên hệ (email, số điện thoại, địa chỉ trụ sở, liên kết) của tác giả hoặc tổ chức sở hữu tài liệu'
        },
        {
          en: 'Any arbitrary mailing address mentioned in a story',
          vi: 'Bất kỳ địa chỉ gửi thư nào được nhắc đến trong câu chuyện'
        },
        {
          en: 'IP addresses of web servers',
          vi: 'Địa chỉ IP của máy chủ web'
        },
        {
          en: 'Memory addresses in WebAssembly',
          vi: 'Địa chỉ ô nhớ trong WebAssembly'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<address> provides contact info for the nearest <article> or document author.',
        vi: '<address> cung cấp thông tin liên lạc của tác giả bài viết hoặc cơ quan chủ quản website.'
      },
      topicId: 'html_landmarks',
      difficulty: 'medium'
    },
    {
      id: 'html_q_7_5',
      type: 'single_choice',
      question: {
        en: 'Can an <article> element have its own <header> and <footer> elements inside it?',
        vi: 'Một phần tử <article> có thể chứa các thẻ <header> và <footer> riêng bên trong nó không?'
      },
      options: [
        {
          en: 'Yes; sectioning elements like <article> and <section> can each possess scoped <header> and <footer> children',
          vi: 'Có; các thẻ phân vùng như <article> và <section> đều có thể sở hữu thẻ con <header> và <footer> cục bộ của riêng mình'
        },
        {
          en: 'No; <header> and <footer> can only be used once at the root of the <body>',
          vi: 'Không; <header> và <footer> chỉ được dùng một lần duy nhất ở cấp cao nhất của <body>'
        },
        {
          en: 'Only if declared in XHTML mode',
          vi: 'Chỉ khi khai báo ở chế độ XHTML'
        },
        {
          en: 'Only if styled with display: block in CSS',
          vi: 'Chỉ khi được định kiểu display: block trong CSS'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<header> and <footer> represent introductory and summary metadata for their nearest ancestor sectioning container.',
        vi: '<header> và <footer> đại diện cho phần mở đầu và kết luận của khối phân vùng cha gần nhất.'
      },
      topicId: 'html_landmarks',
      difficulty: 'easy'
    },
    {
      id: 'html_q_7_6',
      type: 'single_choice',
      question: {
        en: 'Which of the following is considered an anti-pattern when using the <nav> element?',
        vi: 'Điều nào sau đây bị coi là một thói quen xấu (anti-pattern) khi sử dụng thẻ <nav>?'
      },
      options: [
        {
          en: 'Wrapping every single group of anchor links on a page (like 2 utility footer links) inside separate <nav> tags',
          vi: 'Bọc tất cả mọi nhóm liên kết nhỏ trên trang (như 2 link điều khoản ở chân trang) trong các thẻ <nav> riêng biệt'
        },
        {
          en: 'Using <nav> for the primary site navigation bar',
          vi: 'Dùng <nav> cho thanh điều hướng chính của website'
        },
        {
          en: 'Using <nav> for a table of contents within an article',
          vi: 'Dùng <nav> cho mục lục bài viết'
        },
        {
          en: 'Adding an aria-label to distinguish multiple navigation landmarks',
          vi: 'Thêm aria-label để phân biệt các vùng điều hướng khác nhau'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<nav> is reserved for major navigational blocks. Overusing <nav> clutters screen reader landmark menus.',
        vi: '<nav> chỉ dành cho các khối điều hướng quan trọng. Lạm dụng <nav> sẽ làm rối danh sách vùng mốc của trình đọc màn hình.'
      },
      topicId: 'html_landmarks',
      difficulty: 'medium'
    },
    {
      id: 'html_q_7_7',
      type: 'single_choice',
      question: {
        en: 'What distinguishes a generic <div> from a semantic <section>?',
        vi: 'Điều gì phân biệt một thẻ <div> thông thường với một thẻ <section> ngữ nghĩa?'
      },
      options: [
        {
          en: '<section> defines a thematic grouping of content, typically introduced by a heading, whereas <div> has zero semantic meaning and is purely for styling/scripting hooks',
          vi: '<section> định nghĩa một nhóm nội dung theo chủ đề và thường có tiêu đề, trong khi <div> hoàn toàn không có ý nghĩa ngữ nghĩa và chỉ dùng để bọc CSS/JS'
        },
        {
          en: '<div> elements are inline, while <section> elements are flex containers',
          vi: '<div> là thẻ nội dòng, còn <section> là container flex'
        },
        {
          en: '<section> elements cannot have class names',
          vi: '<section> không thể đặt thuộc tính class'
        },
        {
          en: '<section> is deprecated in HTML5',
          vi: '<section> đã bị loại bỏ trong HTML5'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<section> has semantic meaning in the document outline; <div> is purely presentational.',
        vi: '<section> mang ý nghĩa ngữ nghĩa trong cấu trúc tài liệu; <div> chỉ mang tính trang trí.'
      },
      topicId: 'html_landmarks',
      difficulty: 'easy'
    },
    {
      id: 'html_q_7_8',
      type: 'single_choice',
      question: {
        en: 'Why should multiple <nav> landmarks on the same page include aria-label attributes?',
        vi: 'Tại sao khi có nhiều vùng <nav> trên cùng một trang nên khai báo thuộc tính aria-label?'
      },
      options: [
        {
          en: 'To allow screen reader users to distinguish between different menus (e.g. "Main Menu" vs "Footer Navigation")',
          vi: 'Để giúp người dùng trình đọc màn hình phân biệt rõ các menu khác nhau (vd: "Menu chính" và "Điều hướng chân trang")'
        },
        {
          en: 'To trigger smooth scrolling animations',
          vi: 'Để kích hoạt hoạt ảnh cuộn mượt'
        },
        {
          en: 'To translate the menu into different languages',
          vi: 'Để dịch menu sang các ngôn ngữ khác'
        },
        {
          en: 'It is required by CSS grid layouts',
          vi: 'Nó là bắt buộc cho bố cục CSS grid'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'aria-label gives accessible names to landmarks, enabling users to jump directly to the intended menu.',
        vi: 'aria-label đặt tên cho vùng mốc, giúp người dùng chọn đúng menu cần đến một cách nhanh chóng.'
      },
      topicId: 'html_landmarks',
      difficulty: 'easy'
    },
    {
      id: 'html_q_7_9',
      type: 'single_choice',
      question: {
        en: 'Where should the copyright notice and privacy policy links typically reside?',
        vi: 'Thông báo bản quyền và liên kết chính sách bảo mật thường nằm ở đâu?'
      },
      options: [
        {
          en: 'In the root <footer> element of the web page',
          vi: 'Trong phần tử <footer> ở cuối trang web'
        },
        {
          en: 'Inside <meta copyright>',
          vi: 'Bên trong <meta copyright>'
        },
        {
          en: 'In the first <h1> tag',
          vi: 'Trong thẻ <h1> đầu tiên'
        },
        {
          en: 'Inside the <head> element',
          vi: 'Bên trong phần tử <head>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The page <footer> is the standard semantic home for copyright, legal notices, and disclaimers.',
        vi: 'Chân trang <footer> là vị trí ngữ nghĩa chuẩn cho bản quyền và các điều khoản pháp lý.'
      },
      topicId: 'html_landmarks',
      difficulty: 'easy'
    },
    {
      id: 'html_q_7_10',
      type: 'single_choice',
      question: {
        en: 'Can a `<main>` element be nested directly inside an `<article>` tag?',
        vi: 'Phần tử `<main>` có thể được lồng trực tiếp bên trong thẻ `<article>` không?'
      },
      options: [
        {
          en: 'No; `<main>` must not be a descendant of `<article>`, `<aside>`, `<footer>`, `<header>`, or `<nav>`',
          vi: 'Không; `<main>` không được phép là con của `<article>`, `<aside>`, `<footer>`, `<header>` hoặc `<nav>`'
        },
        {
          en: 'Yes, as long as it has a class attribute',
          vi: 'Có, miễn là có thuộc tính class'
        },
        {
          en: 'Yes, if the article is longer than 1000 pixels',
          vi: 'Có, nếu article dài hơn 1000 pixel'
        },
        {
          en: 'Only in responsive mobile mode',
          vi: 'Chỉ trong chế độ xem trên di động'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The W3C HTML5 specification explicitly prohibits nesting <main> within any sectioning or landmark elements.',
        vi: 'Đặc tả W3C HTML5 nghiêm cấm việc lồng <main> vào trong bất kỳ thẻ phân vùng hoặc vùng mốc nào.'
      },
      topicId: 'html_landmarks',
      difficulty: 'easy'
    }
  ]
};

export default lesson08;
