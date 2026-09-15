import { RawLessonSource } from './rawLessonType';

export const lesson7: RawLessonSource = {
  order: 7,
  id: 'html_lesson_7',
  moduleId: 'html_mod_2',
  levelId: 'basic',
  topicId: 'html_landmarks',
  titleEn: 'HTML5 Semantic Landmarks: header, nav, main, article, section, aside & footer',
  titleVi: 'Các Vùng Mốc Ngữ Nghĩa HTML5: header, nav, main, article, section, aside & footer',
  summaryEn: 'Master HTML5 landmark architecture: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, and <address> for pristine SEO and screen reader navigation.',
  summaryVi: 'Làm chủ kiến trúc vùng mốc HTML5: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, và <address> để tối ưu SEO và hỗ trợ phím tắt điều hướng cho trình đọc màn hình.',
  estimatedMinutes: 15,
  introEn: 'Semantic landmarks transform a chaotic sea of generic <div> tags into an organized, navigable blueprint for search engines, web crawlers, and assistive technologies.',
  introVi: 'Các vùng mốc ngữ nghĩa biến trang web từ một mớ hỗn độn các thẻ <div> chung chung thành một bản thiết kế rõ ràng, dễ điều hướng cho máy tìm kiếm và công nghệ trợ thính.',
  conceptEn: 'HTML5 provides dedicated structural landmarks: <header> for introductory branding and banner content, <nav> for major navigation menus, <main> for the central unique topic of the document (only one visible per page), <article> for self-contained redistributable content (e.g. blog posts, forum replies, product cards), <section> for thematic groupings with a heading, <aside> for tangentially related sidebars/callouts, <footer> for author, copyright and legal links, and <address> for contact details.',
  conceptVi: 'HTML5 cung cấp các thẻ vùng mốc chuyên dụng: <header> cho tiêu đề và banner, <nav> cho menu điều hướng chính, <main> cho nội dung trọng tâm duy nhất của trang (chỉ có 1 trên 1 trang), <article> cho bài viết độc lập có thể phân phối lại (như bài blog, bình luận, thẻ sản phẩm), <section> cho cụm nội dung theo chủ đề có tiêu đề h2-h6, <aside> cho thanh bên bổ trợ, <footer> cho bản quyền và liên kết chân trang, cùng <address> cho thông tin liên hệ tác giả.',
  syntax: '<header>\n  <h1>Brand Name</h1>\n  <nav><a href="/">Home</a></nav>\n</header>\n<main>\n  <article>\n    <h2>Article Title</h2>\n    <section>\n      <h3>Subtopic</h3>\n      <p>Content...</p>\n    </section>\n  </article>\n  <aside>\n    <h3>Related Topics</h3>\n  </aside>\n</main>\n<footer>\n  <p>&copy; 2026 4TM Academy</p>\n</footer>',
  ex1TitleEn: 'Semantic Blog Post Page Architecture',
  ex1TitleVi: 'Kiến Trúc Trang Bài Viết Chuẩn Ngữ Nghĩa',
  ex1Code: '<header style="border-bottom:1px solid #e2e8f0; padding:16px;">\n  <h1 style="margin:0; font-size:24px;">Tech Insights</h1>\n  <nav aria-label="Primary"><a href="/">Home</a> | <a href="/blog">Blog</a></nav>\n</header>\n<main style="display:grid; grid-template-columns:3fr 1fr; gap:24px; padding:16px;">\n  <article>\n    <header>\n      <h2>Understanding Web Semantics</h2>\n      <p>Published on <time datetime="2026-08-28">August 28, 2026</time></p>\n    </header>\n    <p>Semantic tags improve accessibility and indexing.</p>\n  </article>\n  <aside style="background:#f8fafc; padding:16px; border-radius:8px;">\n    <h3>Author Bio</h3>\n    <p>Senior Web Architect at 4TM.</p>\n  </aside>\n</main>\n<footer style="border-top:1px solid #e2e8f0; padding:16px; text-align:center;">\n  <p>&copy; 2026 4TM. All rights reserved.</p>\n</footer>',
  ex1ExpEn: 'Combines page-level <header>/<footer> with inner <article>, <section>, and <aside> for clear structural hierarchy.',
  ex1ExpVi: 'Kết hợp <header>/<footer> cấp trang với <article>, <section>, và <aside> tạo nên phân cấp cấu trúc mạch lạc.',
  ex2TitleEn: 'Nested Article Headers and Contact Address',
  ex2TitleVi: 'Header Lồng Trong Article Và Khối Liên Hệ Address',
  ex2Code: '<article style="border:1px solid #cbd5e1; padding:16px; border-radius:8px;">\n  <header>\n    <h2>Security Advisory 2026</h2>\n    <p>Severity: Critical</p>\n  </header>\n  <p>Update your packages immediately.</p>\n  <footer>\n    <address>\n      Contact security team at <a href="mailto:sec@4tm.io">sec@4tm.io</a>\n    </address>\n  </footer>\n</article>',
  ex2ExpEn: '<article> can contain its own private <header> and <footer>. <address> provides contact info for the nearest article or body.',
  ex2ExpVi: '<article> có thể chứa <header> và <footer> riêng của nó. Thẻ <address> cung cấp thông tin liên hệ cho bài viết hoặc toàn trang.',
  mistake1En: 'Having more than one non-hidden <main> element on a page',
  mistake1Vi: 'Đặt nhiều hơn một thẻ <main> hiển thị trên cùng một trang web',
  correction1En: 'An HTML document must have only one visible <main> element representing the primary topic of the document.',
  correction1Vi: 'Một tài liệu HTML chỉ được phép có duy nhất một phần tử <main> hiển thị đại diện cho nội dung chính của trang.',
  mistake2En: 'Using <section> as a generic container purely for CSS styling instead of <div>',
  mistake2Vi: 'Dùng <section> làm khung chứa chỉ để chỉnh CSS thay vì dùng thẻ <div>',
  correction2En: 'Use <div> for generic styling wrappers; use <section> only for thematic content blocks that include a heading (h2–h6).',
  correction2Vi: 'Dùng <div> làm khung chứa thuần CSS; chỉ dùng <section> cho các cụm nội dung theo chủ đề có tiêu đề (h2–h6).',
  tipEn: 'Screen reader users can press the "D" or "Landmark" shortcut key to instantly jump between <header>, <nav>, <main>, <aside>, and <footer>.',
  tipVi: 'Người dùng trình đọc màn hình có thể nhấn phím tắt "D" để nhảy ngay lập tức qua lại giữa các vùng <header>, <nav>, <main>, <aside>, và <footer>.',
  practiceTaskEn: 'Construct a Landmark-Compliant Web Page Layout',
  practiceTaskVi: 'Xây dựng bố cục trang web chuẩn mốc ngữ nghĩa',
  practiceInstEn: 'Construct a layout with a <header> (with <h1>Logo</h1> and <nav><a href="/">Home</a></nav>), a <main> containing an <article> (with <h2>Title</h2> and <p>Text</p>) and an <aside> (with <h3>Sidebar</h3>), and a <footer>.',
  practiceInstVi: 'Xây dựng giao diện gồm thẻ <header> (chứa <h1>Logo</h1> và <nav><a href="/">Home</a></nav>), thẻ <main> chứa <article> (với <h2>Title</h2> và <p>Text</p>) cùng <aside> (với <h3>Sidebar</h3>), và thẻ <footer>.',
  practiceStarter: '<div>\n  \n</div>',
  practiceSolution: '<header>\n  <h1>Logo</h1>\n  <nav><a href="/">Home</a></nav>\n</header>\n<main>\n  <article>\n    <h2>Title</h2>\n    <p>Text</p>\n  </article>\n  <aside>\n    <h3>Sidebar</h3>\n  </aside>\n</main>\n<footer>\n  <p>&copy; 2026</p>\n</footer>',
  practicePatterns: ['<header>', '<h1>Logo</h1>', '<nav><a href="/">Home</a></nav>', '</header>', '<main>', '<article>', '<h2>Title</h2>', '<aside>', '<h3>Sidebar</h3>', '</main>', '<footer>', '</footer>'],
  practiceHintEn: 'Replace the wrapper with <header>, <main>, and <footer> top-level landmarks.',
  practiceHintVi: 'Thay thế khung bằng các vùng mốc cấp cao nhất <header>, <main>, và <footer>.',

  exercises: [
    {
      id: 'html_ex_7_1',
      type: 'complete_code',
      titleEn: 'Add Semantic Aside for Related Articles',
      titleVi: 'Thêm thẻ aside ngữ nghĩa cho bài viết liên quan',
      instEn: 'Add an <aside> inside <main> after the <article> containing <h3>Related Links</h3> and a <ul>.',
      instVi: 'Thêm thẻ <aside> bên trong <main> sau <article> chứa <h3>Related Links</h3> và danh sách <ul>.',
      starter: '<main>\n  <article>\n    <h2>Main Article</h2>\n    <p>Body copy...</p>\n  </article>\n</main>',
      solution: '<main>\n  <article>\n    <h2>Main Article</h2>\n    <p>Body copy...</p>\n  </article>\n  <aside>\n    <h3>Related Links</h3>\n    <ul>\n      <li><a href="/post-2">Post 2</a></li>\n    </ul>\n  </aside>\n</main>',
      hintEn: 'Add <aside> containing <h3> and <ul> after the </article> tag.',
      hintVi: 'Thêm <aside> chứa <h3> và <ul> sau thẻ đóng </article>.',
      expEn: '<aside> represents content tangentially related to the main content (like sidebars and related posts).',
      expVi: '<aside> đại diện cho nội dung liên quan gián tiếp đến nội dung chính (như thanh bên và bài liên quan).'
    },
    {
      id: 'html_ex_7_2',
      type: 'fix_code',
      titleEn: 'Fix Multiple Main Elements Violation',
      titleVi: 'Sửa lỗi vi phạm có nhiều thẻ main trên một trang',
      instEn: 'Fix the page by turning the second invalid <main> element into an <aside>.',
      instVi: 'Sửa trang web bằng cách chuyển phần tử <main> thứ hai không hợp lệ thành thẻ <aside>.',
      starter: '<main>\n  <h1>Welcome</h1>\n</main>\n<main>\n  <h3>Sidebar</h3>\n</main>',
      solution: '<main>\n  <h1>Welcome</h1>\n</main>\n<aside>\n  <h3>Sidebar</h3>\n</aside>',
      hintEn: 'Change the second <main>...</main> into <aside>...</aside>.',
      hintVi: 'Đổi thẻ <main>...</main> thứ hai thành <aside>...</aside>.',
      expEn: 'HTML documents must not have more than one visible <main> element.',
      expVi: 'Tài liệu HTML không được phép có nhiều hơn một thẻ <main> hiển thị.'
    },
    {
      id: 'html_ex_7_3',
      type: 'write_code',
      titleEn: 'Write Author Contact with <address>',
      titleVi: 'Viết thông tin liên hệ tác giả bằng thẻ <address>',
      instEn: 'Write a <footer> containing an <address> element with an author name "Sarah Connor" and an email link <a href="mailto:sarah@4tm.io">sarah@4tm.io</a>.',
      instVi: 'Viết thẻ <footer> chứa phần tử <address> có tên tác giả "Sarah Connor" và liên kết email <a href="mailto:sarah@4tm.io">sarah@4tm.io</a>.',
      starter: '',
      solution: '<footer>\n  <address>\n    Written by Sarah Connor<br>\n    Email: <a href="mailto:sarah@4tm.io">sarah@4tm.io</a>\n  </address>\n</footer>',
      hintEn: 'Wrap <address> inside <footer>.',
      hintVi: 'Bọc <address> bên trong thẻ <footer>.',
      expEn: '<address> provides contact information for its nearest <article> or the document <body>.',
      expVi: '<address> cung cấp thông tin liên hệ cho thẻ <article> gần nhất hoặc toàn bộ <body>.'
    },
    {
      id: 'html_ex_7_4',
      type: 'modify_example',
      titleEn: 'Add Publishing Date with Semantic <time>',
      titleVi: 'Thêm ngày xuất bản với thẻ thời gian <time>',
      instEn: 'Add <p>Published on <time datetime="2026-08-28">August 28, 2026</time></p> inside the article <header>.',
      instVi: 'Thêm <p>Published on <time datetime="2026-08-28">August 28, 2026</time></p> bên trong <header> của bài viết.',
      starter: '<article>\n  <header>\n    <h2>Modern Web Standards</h2>\n  </header>\n  <p>Article body.</p>\n</article>',
      solution: '<article>\n  <header>\n    <h2>Modern Web Standards</h2>\n    <p>Published on <time datetime="2026-08-28">August 28, 2026</time></p>\n  </header>\n  <p>Article body.</p>\n</article>',
      hintEn: 'Add the <p> with <time datetime="..."> inside <header>.',
      hintVi: 'Thêm thẻ <p> có <time datetime="..."> bên trong <header>.',
      expEn: '<time datetime="YYYY-MM-DD"> makes dates machine-readable for search engines and calendar apps.',
      expVi: '<time datetime="YYYY-MM-DD"> giúp máy tính và công cụ tìm kiếm đọc chính xác ngày giờ chuẩn.'
    },
    {
      id: 'html_ex_7_5',
      type: 'predict_output',
      titleEn: 'Identify Semantic Differences Between Article and Section',
      titleVi: 'Nhận diện khác biệt ngữ nghĩa giữa Article và Section',
      instEn: 'Which element (<article> or <section>) is meant for content that could be distributed in an RSS feed or syndicated on another site independently?',
      instVi: 'Phần tử nào (<article> hay <section>) dùng cho nội dung độc lập có thể phân phối qua RSS hoặc đăng lại trên trang khác?',
      starter: '<!-- Type article or section -->\n<p>Answer: </p>',
      solution: '<p>Answer: article</p>',
      hintEn: 'Articles represent independent, self-contained units of information.',
      hintVi: 'Article đại diện cho đơn vị thông tin độc lập, trọn vẹn.',
      expEn: '<article> is self-contained and independently distributable; <section> is a thematic group.',
      expVi: '<article> là nội dung trọn vẹn có thể tái phân phối độc lập; <section> là nhóm theo chủ đề.'
    }
  ],

  challenge: {
    id: 'html_ch_7',
    titleEn: 'Enterprise Newspaper Homepage Semantic Architecture',
    titleVi: 'Kiến trúc trang báo điện tử doanh nghiệp chuẩn mốc ngữ nghĩa',
    descEn: 'Build a multi-section digital news portal architecture utilizing all HTML5 structural landmark elements.',
    descVi: 'Xây dựng kiến trúc cổng thông tin tin tức điện tử đa chuyên mục sử dụng đầy đủ các thẻ vùng mốc HTML5.',
    requirements: [
      { en: 'Top-level <header> containing site <h1>The Daily Chronicle</h1> and <nav aria-label="Main"> with 3 links', vi: 'Thẻ <header> cấp cao nhất chứa <h1>The Daily Chronicle</h1> và <nav aria-label="Main"> với 3 liên kết' },
      { en: 'Single <main> element with a featured <article> (having its own <header> with title and <time>, body paragraphs, and <footer> with author <address>)', vi: 'Một thẻ <main> duy nhất chứa <article> nổi bật (có <header> riêng gồm tiêu đề và <time>, đoạn văn nội dung và <footer> chứa <address> tác giả)' },
      { en: 'An <aside> containing <h3>Trending Stories</h3> and an <ol> list of 2 items', vi: 'Thẻ <aside> chứa <h3>Trending Stories</h3> và danh sách <ol> gồm 2 mục' },
      { en: 'A page <footer> with copyright and contact information', vi: 'Thẻ <footer> chân trang chứa bản quyền và thông tin liên hệ' }
    ],
    starter: '<!-- Construct complete digital newspaper landmark layout here -->\n',
    solution: '<header>\n  <h1>The Daily Chronicle</h1>\n  <nav aria-label="Main">\n    <ul>\n      <li><a href="/world">World</a></li>\n      <li><a href="/tech">Tech</a></li>\n      <li><a href="/science">Science</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <header>\n      <h2>Breakthrough in Quantum Computing</h2>\n      <p>Reported on <time datetime="2026-08-28">August 28, 2026</time></p>\n    </header>\n    <p>Scientists have achieved room-temperature coherence in scalable qubits.</p>\n    <footer>\n      <address>By Elena Rostova (<a href="mailto:elena@chronicle.com">elena@chronicle.com</a>)</address>\n    </footer>\n  </article>\n  <aside>\n    <h3>Trending Stories</h3>\n    <ol>\n      <li><a href="/story-1">Space Probe Lands on Europa</a></li>\n      <li><a href="/story-2">Green Energy Crosses 50% Milestone</a></li>\n    </ol>\n  </aside>\n</main>\n<footer>\n  <p>&copy; 2026 The Daily Chronicle. All rights reserved.</p>\n</footer>',
    hints: [
      { en: 'Ensure only one <main> element exists', vi: 'Đảm bảo chỉ có duy nhất 1 thẻ <main>' },
      { en: 'Use <time datetime="..."> inside article header and <address> in article footer', vi: 'Dùng <time datetime="..."> trong header bài viết và <address> trong footer bài viết' }
    ],
    expEn: 'State-of-the-art semantic landmark composition optimizing screen reader navigation and SEO crawlers.',
    expVi: 'Bố cục vùng mốc ngữ nghĩa tối tân giúp tối ưu công cụ tìm kiếm và trình đọc màn hình.'
  },

  challengeVariants: [
    {
      id: 'html_ch_7_v1',
      titleEn: 'Variant 1: E-Commerce Product Details Page',
      titleVi: 'Biến thể 1: Trang chi tiết sản phẩm thương mại điện tử',
      descEn: 'Build an e-commerce product page with <main> containing product <article>, user reviews <section>, and recommended items <aside>.',
      descVi: 'Xây dựng trang sản phẩm với <main> chứa <article> sản phẩm, <section> đánh giá người dùng và <aside> gợi ý mua kèm.',
      requirements: [
        { en: '<main> with product <article>', vi: '<main> chứa <article> sản phẩm' },
        { en: '<section> with <h2>Customer Reviews</h2> and 2 review <article> cards', vi: '<section> có <h2>Customer Reviews</h2> và 2 thẻ bài viết <article> đánh giá' },
        { en: '<aside> with <h2>Frequently Bought Together</h2>', vi: '<aside> có <h2>Frequently Bought Together</h2>' }
      ],
      starter: '<main>\n  \n</main>',
      solution: '<main>\n  <article>\n    <h1>Professional Noise-Cancelling Headphones</h1>\n    <p>Price: $299.99</p>\n    <p>High-fidelity audio with 40-hour battery life.</p>\n  </article>\n  <section aria-labelledby="reviews-heading">\n    <h2 id="reviews-heading">Customer Reviews</h2>\n    <article>\n      <h3>Outstanding Clarity</h3>\n      <p>Best purchase of the year.</p>\n    </article>\n    <article>\n      <h3>Comfortable Fit</h3>\n      <p>Wore them on a 14-hour flight with zero fatigue.</p>\n    </article>\n  </section>\n  <aside>\n    <h2>Frequently Bought Together</h2>\n    <p><a href="/case">Hard Shell Travel Case</a></p>\n  </aside>\n</main>',
      expEn: 'Nested <article> tags inside review <section> model modular customer feedback components.',
      expVi: 'Các thẻ <article> đánh giá lồng trong <section> mô hình hóa chuẩn xác từng phản hồi khách hàng.'
    },
    {
      id: 'html_ch_7_v2',
      titleEn: 'Variant 2: Technical Documentation Portal Layout',
      titleVi: 'Biến thể 2: Trang tài liệu kỹ thuật chuẩn cấu trúc',
      descEn: 'Build a documentation page with sticky sidebar navigation <aside>, content <main>, and right-hand table of contents <nav>.',
      descVi: 'Xây dựng trang tài liệu có thanh điều hướng bên trái <aside>, nội dung <main> và mục lục bài viết bên phải <nav>.',
      requirements: [
        { en: 'Sidebar <aside aria-label="API Directory"> with links', vi: 'Thanh bên <aside aria-label="API Directory"> chứa liên kết' },
        { en: '<main> with 3 topic <section> blocks (Setup, Auth, Endpoints)', vi: '<main> chứa 3 khối <section> (Setup, Auth, Endpoints)' },
        { en: '<nav aria-label="On this page"> with anchor links to the sections', vi: '<nav aria-label="On this page"> chứa liên kết neo tới các section' }
      ],
      starter: '<div class="doc-layout">\n  \n</div>',
      solution: '<div class="doc-layout">\n  <aside aria-label="API Directory">\n    <nav>\n      <ul>\n        <li><a href="/api/v1">API v1</a></li>\n        <li><a href="/api/v2">API v2</a></li>\n      </ul>\n    </nav>\n  </aside>\n  <main>\n    <h1>Authentication API</h1>\n    <section id="setup">\n      <h2>Setup</h2>\n      <p>Install the SDK.</p>\n    </section>\n    <section id="auth">\n      <h2>Auth Tokens</h2>\n      <p>Generate JWT credentials.</p>\n    </section>\n  </main>\n  <nav aria-label="On this page">\n    <ul>\n      <li><a href="#setup">Setup</a></li>\n      <li><a href="#auth">Auth Tokens</a></li>\n    </ul>\n  </nav>\n</div>',
      expEn: 'Multiple <nav> elements differentiated by aria-label clarify purpose for screen reader users.',
      expVi: 'Nhiều thẻ <nav> được phân biệt bằng aria-label giúp người dùng trình đọc màn hình định hướng chuẩn xác.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_7_1',
      type: 'single_choice',
      qEn: 'How many visible <main> elements are permitted in a single HTML5 document?',
      qVi: 'Được phép có bao nhiêu phần tử <main> hiển thị trong một tài liệu HTML5?',
      options: [
        { en: 'Exactly one visible <main> element per document', vi: 'Chính xác duy nhất một phần tử <main> hiển thị trên mỗi tài liệu' },
        { en: 'Up to three (one for desktop, tablet, mobile)', vi: 'Tối đa 3 cái (cho desktop, tablet, mobile)' },
        { en: 'Unlimited, as long as they have unique classes', vi: 'Không giới hạn, miễn là có class khác nhau' },
        { en: 'Zero, <main> is optional and deprecated', vi: 'Không cái nào, <main> đã bị xóa bỏ' }
      ],
      ans: 0,
      expEn: 'W3C specification allows only one visible <main> element per HTML document.',
      expVi: 'Chuẩn W3C chỉ cho phép duy nhất một phần tử <main> hiển thị trên một trang tài liệu HTML.'
    },
    {
      id: 'html_q_7_2',
      type: 'single_choice',
      qEn: 'What is the semantic purpose of the <article> element?',
      qVi: 'Mục đích ngữ nghĩa của phần tử <article> là gì?',
      options: [
        { en: 'Represents a self-contained composition in a document that is independently distributable or reusable (e.g. blog post, product card, forum post)', vi: 'Đại diện cho một nội dung độc lập, trọn vẹn có thể tái phân phối hoặc tái sử dụng ở nơi khác (như bài blog, thẻ sản phẩm, bài diễn đàn)' },
        { en: 'A container for holding newspaper text only', vi: 'Khung chỉ dùng để chứa văn bản báo chí' },
        { en: 'A replacement for the <p> paragraph tag', vi: 'Thẻ thay thế cho đoạn văn <p>' },
        { en: 'A tag used to import external JavaScript libraries', vi: 'Thẻ dùng để nhập thư viện JavaScript ngoài' }
      ],
      ans: 0,
      expEn: '<article> is intended for self-contained, syndicateable items.',
      expVi: '<article> dành cho các đơn vị nội dung trọn vẹn, có thể trích xuất đăng độc lập.'
    },
    {
      id: 'html_q_7_3',
      type: 'single_choice',
      qEn: 'When should you use <section> instead of a generic <div>?',
      qVi: 'Khi nào bạn nên dùng <section> thay vì dùng thẻ <div> chung chung?',
      options: [
        { en: 'When grouping thematic content that logically has its own heading (h2–h6)', vi: 'Khi nhóm các nội dung cùng một chủ đề mà theo logic cần có tiêu đề riêng (h2–h6)' },
        { en: 'Whenever you need to apply a CSS background color', vi: 'Bất cứ khi nào cần chỉnh màu nền CSS' },
        { en: 'To center text horizontally on the screen', vi: 'Để căn giữa chữ ra giữa màn hình' },
        { en: 'Only when displaying tabular numbers', vi: 'Chỉ khi hiển thị các con số dạng bảng' }
      ],
      ans: 0,
      expEn: '<section> is a thematic grouping of content, typically with a heading.',
      expVi: '<section> là nhóm nội dung theo chủ đề, thông thường luôn có 1 tiêu đề đi kèm.'
    },
    {
      id: 'html_q_7_4',
      type: 'single_choice',
      qEn: 'What content belongs inside an <aside> element?',
      qVi: 'Nội dung nào thuộc về phần tử <aside>?',
      options: [
        { en: 'Content tangentially related to the content around it, such as sidebars, related links, callout quotes, or author bios', vi: 'Nội dung liên quan gián tiếp hoặc bổ trợ cho nội dung xung quanh, như thanh bên, liên kết liên quan, trích dẫn nổi bật hoặc tiểu sử tác giả' },
        { en: 'The primary search input of the website', vi: 'Ô tìm kiếm chính của trang web' },
        { en: 'The main legal copyright notice of the entire website', vi: 'Thông báo bản quyền chính của toàn bộ trang web' },
        { en: 'The main H1 headline of the page', vi: 'Tiêu đề H1 chính của trang' }
      ],
      ans: 0,
      expEn: '<aside> defines tangentially related content like sidebars and callout boxes.',
      expVi: '<aside> định nghĩa các nội dung phụ, thanh bên hoặc hộp thông tin bổ trợ.'
    },
    {
      id: 'html_q_7_5',
      type: 'single_choice',
      qEn: 'Can an <article> element have its own <header> and <footer>?',
      qVi: 'Một phần tử <article> có thể chứa thẻ <header> và <footer> riêng của nó không?',
      options: [
        { en: 'Yes, <header> and <footer> can be scoped to individual <article> or <section> elements', vi: 'Có, <header> và <footer> có thể áp dụng cho từng <article> hoặc <section> riêng lẻ' },
        { en: 'No, <header> and <footer> can only appear once directly inside <body>', vi: 'Không, <header> và <footer> chỉ được xuất hiện đúng 1 lần trực tiếp trong <body>' },
        { en: 'Only if the article has an id attribute', vi: 'Chỉ khi bài viết có thuộc tính id' },
        { en: 'Only in XML documents', vi: 'Chỉ trong tài liệu XML' }
      ],
      ans: 0,
      expEn: 'HTML5 allows multiple <header> and <footer> tags scoped to specific sectioning roots.',
      expVi: 'HTML5 cho phép nhiều thẻ <header> và <footer> gắn liền với từng khối nội dung riêng biệt.'
    },
    {
      id: 'html_q_7_6',
      type: 'single_choice',
      qEn: 'What is the correct semantic element for author or organization contact information?',
      qVi: 'Phần tử ngữ nghĩa chuẩn xác cho thông tin liên hệ của tác giả hoặc tổ chức là gì?',
      options: [
        { en: '<address>', vi: '<address>' },
        { en: '<contact>', vi: '<contact>' },
        { en: '<email>', vi: '<email>' },
        { en: '<author>', vi: '<author>' }
      ],
      ans: 0,
      expEn: '<address> provides contact information for its nearest container.',
      expVi: '<address> cung cấp thông tin liên hệ cho khối nội dung gần nó nhất.'
    },
    {
      id: 'html_q_7_7',
      type: 'single_choice',
      qEn: 'Should physical street addresses of random businesses (like restaurants in a list) use <address>?',
      qVi: 'Địa chỉ đường phố của các doanh nghiệp ngẫu nhiên (như danh sách quán ăn) có nên dùng thẻ <address> không?',
      options: [
        { en: 'No, <address> is reserved strictly for the contact info of the AUTHOR/OWNER of the article or document', vi: 'Không, <address> chỉ dùng riêng cho thông tin liên hệ của TÁC GIẢ/CHỦ SỞ HỮU bài viết hoặc trang web' },
        { en: 'Yes, every street address in the world must use <address>', vi: 'Có, mọi địa chỉ nhà trên thế giới đều phải dùng <address>' },
        { en: 'Only if it includes a postal code', vi: 'Chỉ khi có mã bưu chính' },
        { en: 'Only in Google Maps iframes', vi: 'Chỉ trong iframe Google Maps' }
      ],
      ans: 0,
      expEn: '<address> represents contact details for the document/article author, not arbitrary postal addresses.',
      expVi: '<address> đại diện cho thông tin liên hệ của người viết/chủ trang, không phải địa chỉ bưu chính tùy tiện.'
    },
    {
      id: 'html_q_7_8',
      type: 'single_choice',
      qEn: 'What does the <time datetime="2026-08-28T14:30:00Z"> element provide?',
      qVi: 'Thẻ <time datetime="2026-08-28T14:30:00Z"> mang lại lợi ích gì?',
      options: [
        { en: 'A machine-readable standard ISO 8601 timestamp paired with human-readable text inside the element', vi: 'Dấu thời gian chuẩn ISO 8601 giúp máy tính đọc được, đi kèm văn bản hiển thị cho người đọc' },
        { en: 'An automatic digital clock animation', vi: 'Hiệu ứng đồng hồ số chạy tự động' },
        { en: 'A countdown timer to that date', vi: 'Bộ đếm ngược thời gian đến ngày đó' },
        { en: 'A calendar popup selector', vi: 'Cửa sổ lịch bật lên cho người dùng chọn' }
      ],
      ans: 0,
      expEn: '<time datetime="..."> gives search engines and algorithms unambiguous calendar dates.',
      expVi: '<time datetime="..."> cung cấp ngày giờ theo định dạng chuẩn quốc tế cho máy tìm kiếm.'
    },
    {
      id: 'html_q_7_9',
      type: 'single_choice',
      qEn: 'How should you distinguish multiple <nav> elements on the same page (e.g. main header nav vs footer nav)?',
      qVi: 'Bạn nên phân biệt nhiều thẻ <nav> trên cùng một trang (như menu chính ở header vs menu ở footer) bằng cách nào?',
      options: [
        { en: 'Use aria-label attributes, such as <nav aria-label="Main Navigation"> and <nav aria-label="Footer Links">', vi: 'Dùng thuộc tính aria-label, như <nav aria-label="Main Navigation"> và <nav aria-label="Footer Links">' },
        { en: 'Change one <nav> to <div nav>', vi: 'Đổi 1 thẻ <nav> thành <div nav>' },
        { en: 'Only one <nav> is ever allowed per website', vi: 'Chỉ được phép có duy nhất 1 thẻ <nav> trên toàn website' },
        { en: 'Wrap one in a <span>', vi: 'Bọc 1 cái vào thẻ <span>' }
      ],
      ans: 0,
      expEn: 'aria-label gives each <nav> an accessible name that screen readers announce when listing landmarks.',
      expVi: 'aria-label gán tên mô tả riêng cho từng <nav> để trình đọc màn hình đọc to cho người dùng khi chọn mốc.'
    },
    {
      id: 'html_q_7_10',
      type: 'single_choice',
      qEn: 'Can <header> contain a <nav> element?',
      qVi: 'Thẻ <header> có thể chứa thẻ <nav> bên trong không?',
      options: [
        { en: 'Yes, placing primary site navigation (<nav>) inside the top-level <header> is standard industry practice', vi: 'Có, đặt menu điều hướng chính (<nav>) bên trong <header> là tiêu chuẩn phổ biến trong ngành' },
        { en: 'No, <nav> must always be a sibling of <header>', vi: 'Không, <nav> luôn phải đứng ngang hàng với <header>' },
        { en: 'Only if the header has no <h1>', vi: 'Chỉ khi header không có thẻ <h1>' },
        { en: 'Only on mobile responsive breakpoints', vi: 'Chỉ trên giao diện điện thoại' }
      ],
      ans: 0,
      expEn: 'Placing navigation inside the top-level banner <header> is standard semantic HTML5 structure.',
      expVi: 'Đặt thanh điều hướng trong <header> đầu trang là cấu trúc chuẩn ngữ nghĩa HTML5.'
    },
    {
      id: 'html_q_7_11',
      type: 'single_choice',
      qEn: 'What is the difference between <main> and <body>?',
      qVi: 'Sự khác biệt giữa <main> và <body> là gì?',
      options: [
        { en: '<body> holds ALL visible page content (including headers, footers, sidebars), while <main> wraps ONLY the central, non-repeating primary topic', vi: '<body> chứa TOÀN BỘ nội dung hiển thị (gồm cả header, footer, thanh bên), còn <main> CHỈ bao bọc nội dung trọng tâm độc nhất' },
        { en: '<main> replaces <body> in HTML5', vi: '<main> thay thế hoàn toàn thẻ <body> trong HTML5' },
        { en: '<body> is for CSS and <main> is for JavaScript', vi: '<body> dành cho CSS còn <main> dành cho JavaScript' },
        { en: 'There is no difference, they are synonyms', vi: 'Không có khác biệt, hai thẻ là từ đồng nghĩa' }
      ],
      ans: 0,
      expEn: '<main> encapsulates unique content, excluding recurring headers, navigation bars, and footers.',
      expVi: '<main> đóng gói phần nội dung chính yếu không lặp lại, tách biệt với header/footer chung.'
    },
    {
      id: 'html_q_7_12',
      type: 'single_choice',
      qEn: 'Which HTML5 element represents an independent piece of quote text taken from an external source?',
      qVi: 'Phần tử HTML5 nào đại diện cho một đoạn trích dẫn độc lập lấy từ nguồn bên ngoài?',
      options: [
        { en: '<blockquote cite="...">', vi: '<blockquote cite="..."> (kèm thẻ <cite>)' },
        { en: '<quote>', vi: '<quote>' },
        { en: '<talk>', vi: '<talk>' },
        { en: '<aside-quote>', vi: '<aside-quote>' }
      ],
      ans: 0,
      expEn: '<blockquote> represents an extended external quotation, with cite attribute specifying the URL.',
      expVi: '<blockquote> đại diện cho đoạn trích dẫn dài, có thuộc tính cite trỏ tới đường link nguồn.'
    },
    {
      id: 'html_q_7_13',
      type: 'single_choice',
      qEn: 'Is a list of product cards on an e-commerce catalog page better structured as <article> or <div>?',
      qVi: 'Danh sách các thẻ sản phẩm trên trang thương mại điện tử nên được cấu trúc bằng thẻ <article> hay thẻ <div>?',
      options: [
        { en: '<article>, because each product item is a self-contained, independent unit of commerce with its own image, title, price, and CTA', vi: '<article>, vì mỗi sản phẩm là một đơn vị thương mại độc lập, trọn vẹn có ảnh, tiêu đề, giá và nút mua riêng' },
        { en: '<div>, because product cards are purely visual', vi: '<div>, vì thẻ sản phẩm chỉ mang tính trang trí' },
        { en: '<nav>, because clicking a product takes you to a new page', vi: '<nav>, vì nhấp vào sản phẩm sẽ chuyển sang trang mới' },
        { en: '<header>, because it has a price header', vi: '<header>, vì có tiêu đề giá tiền' }
      ],
      ans: 0,
      expEn: 'Product cards are standalone entities that can be syndicated elsewhere, making <article> the ideal element.',
      expVi: 'Thẻ sản phẩm là các thực thể độc lập có thể phân phối ở nhiều nơi, nên <article> là lựa chọn hoàn hảo.'
    },
    {
      id: 'html_q_7_14',
      type: 'single_choice',
      qEn: 'What ARIA landmark role does the <header> element implicitly map to when placed at the top level of <body>?',
      qVi: 'Thẻ <header> ở cấp cao nhất trong <body> tự động mang vai trò mốc ARIA ngầm định nào?',
      options: [
        { en: 'role="banner"', vi: 'role="banner"' },
        { en: 'role="navigation"', vi: 'role="navigation"' },
        { en: 'role="complementary"', vi: 'role="complementary"' },
        { en: 'role="region"', vi: 'role="region"' }
      ],
      ans: 0,
      expEn: 'Top-level <header> has the implicit ARIA role of "banner".',
      expVi: 'Thẻ <header> cấp ngoài cùng tự động có vai trò ARIA là "banner".'
    },
    {
      id: 'html_q_7_15',
      type: 'single_choice',
      qEn: 'What ARIA landmark role does <footer> implicitly map to when placed at the root of <body>?',
      qVi: 'Thẻ <footer> ở cấp ngoài cùng trong <body> tự động mang vai trò mốc ARIA ngầm định nào?',
      options: [
        { en: 'role="contentinfo"', vi: 'role="contentinfo"' },
        { en: 'role="banner"', vi: 'role="banner"' },
        { en: 'role="main"', vi: 'role="main"' },
        { en: 'role="complementary"', vi: 'role="complementary"' }
      ],
      ans: 0,
      expEn: 'Root <footer> maps to the ARIA landmark role "contentinfo".',
      expVi: 'Thẻ <footer> cấp gốc tự động mang vai trò mốc ARIA "contentinfo".'
    },
    {
      id: 'html_q_7_16',
      type: 'single_choice',
      qEn: 'What ARIA landmark role does <aside> implicitly map to?',
      qVi: 'Thẻ <aside> tự động mang vai trò mốc ARIA ngầm định nào?',
      options: [
        { en: 'role="complementary"', vi: 'role="complementary"' },
        { en: 'role="search"', vi: 'role="search"' },
        { en: 'role="banner"', vi: 'role="banner"' },
        { en: 'role="status"', vi: 'role="status"' }
      ],
      ans: 0,
      expEn: '<aside> maps to the ARIA role "complementary", signifying auxiliary content.',
      expVi: '<aside> tương ứng với vai trò ARIA "complementary", biểu thị nội dung bổ trợ.'
    }
  ]
};

console.log('Lesson 7 defined.');
