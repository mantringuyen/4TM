import { RawLessonSource } from './rawLessonType';

export const lesson2: RawLessonSource = {
  order: 2,
  id: 'html_lesson_2',
  moduleId: 'html_mod_1',
  levelId: 'basic',
  topicId: 'html_text',
  titleEn: 'Text Hierarchy: Headings (h1-h6), Paragraphs & Semantic Text Formatting',
  titleVi: 'Phân Cấp Văn Bản: Tiêu Đề (h1-h6), Đoạn Văn & Định Dạng Ngữ Nghĩa',
  summaryEn: 'Learn proper heading hierarchy (h1 through h6), paragraph semantics (<p>), line breaks (<br>), thematic breaks (<hr>), and semantic text formatting (<strong>, <em>, <mark>, <small>, <code>, <kbd>, <sub>, <sup>).',
  summaryVi: 'Học phân cấp tiêu đề chuẩn (h1 đến h6), ngữ nghĩa đoạn văn (<p>), ngắt dòng (<br>), vạch ngăn (<hr>) và định dạng văn bản ngữ nghĩa (<strong>, <em>, <mark>, <small>, <code>, <kbd>, <sub>, <sup>).',
  estimatedMinutes: 15,
  introEn: 'Text is the core communicative medium of the World Wide Web. Structuring text with meaningful headings and semantic formatting ensures both human readers and search engines can effortlessly parse your content.',
  introVi: 'Văn bản là phương tiện truyền tải thông tin cốt lõi của Web. Việc tổ chức văn bản với các tiêu đề phân cấp và định dạng ngữ nghĩa giúp người đọc và máy tìm kiếm dễ dàng tiếp nhận nội dung.',
  conceptEn: 'Heading levels range from <h1> (highest importance, page topic) to <h6> (lowest importance). Never skip heading levels (e.g. from <h1> directly to <h3>). For text emphasis, use <strong> (serious importance/urgency) and <em> (stress emphasis) rather than visual-only tags like <b> and <i>. Use <code> for inline code snippets, <kbd> for keyboard inputs, <mark> for highlighted search terms, <small> for copyright disclaimers, and <sub>/<sup> for chemical formulas and math exponents.',
  conceptVi: 'Thứ bậc tiêu đề từ <h1> (quan trọng nhất, chủ đề trang) đến <h6> (chi tiết nhất). Không nên nhảy cóc thứ bậc tiêu đề (từ <h1> nhảy xuống <h3>). Để nhấn mạnh ngữ nghĩa, dùng <strong> (mức độ quan trọng cao) và <em> (nhấn giọng) thay vì thẻ thuần hình ảnh <b> và <i>. Dùng <code> cho mã nguồn ngắn, <kbd> cho phím bấm, <mark> cho bôi sáng từ khóa, <small> cho điều khoản nhỏ và <sub>/<sup> cho công thức hóa học, số mũ.',
  syntax: '<h1>Primary Page Headline</h1>\n<section>\n  <h2>Section Heading</h2>\n  <p>Standard paragraph with <strong>bold importance</strong> and <em>italic stress</em>.</p>\n  <p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save or run <code>npm run build</code>.</p>\n  <hr>\n  <small>&copy; 2026 4TM Academy</small>\n</section>',
  ex1TitleEn: 'Semantic Tech Article with Formatting',
  ex1TitleVi: 'Bài Viết Kỹ Thuật Với Định Dạng Ngữ Nghĩa',
  ex1Code: '<article>\n  <h1>JavaScript Runtime Fundamentals</h1>\n  <p>The JavaScript engine executes code on a <strong>single thread</strong> using the <em>event loop</em> model.</p>\n  <h2>Common Commands</h2>\n  <p>To start development, execute <code>npm run dev</code> in your terminal.</p>\n  <p>Shortcuts: Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to terminate.</p>\n  <p>Water formula is H<sub>2</sub>O and area is calculated as r<sup>2</sup>.</p>\n</article>',
  ex1ExpEn: 'Combines headings hierarchy, strong/em semantic emphasis, code/kbd technical tags, and sub/sup notations.',
  ex1ExpVi: 'Kết hợp tiêu đề phân cấp, thẻ nhấn mạnh strong/em, thẻ kỹ thuật code/kbd và chỉ số trên/dưới sub/sup.',
  ex2TitleEn: 'Editorial Note with Highlighting and Disclaimers',
  ex2TitleVi: 'Ghi Chú Biên Tập Với Bôi Sáng & Điều Khoản Phụ',
  ex2Code: '<section>\n  <h2>System Security Notice</h2>\n  <p>Always verify the <mark>SSL Certificate</mark> before entering sensitive credentials.</p>\n  <hr>\n  <p><small>Disclaimer: 4TM will never ask for your private encryption keys.</small></p>\n</section>',
  ex2ExpEn: 'Demonstrates <mark> for relevance highlighting and <small> for legal/security disclaimers.',
  ex2ExpVi: 'Minh họa dùng <mark> để làm nổi bật từ khóa quan trọng và <small> cho phần cảnh báo bản quyền.',
  mistake1En: 'Using <h1> purely to make text look larger on the screen',
  mistake1Vi: 'Dùng thẻ <h1> chỉ để làm chữ to hơn trên màn hình',
  correction1En: 'Use CSS font-size for visual presentation; reserve <h1> for the single structural title of the page.',
  correction1Vi: 'Hãy dùng thuộc tính CSS font-size để chỉnh kích thước; giữ <h1> cho tiêu đề cấu trúc duy nhất của trang.',
  mistake2En: 'Using <br> multiple times to create vertical layout spacing',
  mistake2Vi: 'Dùng thẻ <br> nhiều lần liên tiếp để tạo khoảng cách lề',
  correction2En: 'Use CSS margin or padding for visual layout spacing; reserve <br> solely for natural line breaks within text like postal addresses.',
  correction2Vi: 'Dùng margin/padding trong CSS để tạo khoảng cách; chỉ dùng <br> khi bắt buộc phải ngắt dòng như địa chỉ bưu điện.',
  tipEn: 'HTML heading elements provide an automatic document outline that screen reader users navigate using single-key shortcuts.',
  tipVi: 'Các thẻ tiêu đề tạo mục lục ngầm định giúp người dùng khiếm thị nhảy nhanh qua các phần chỉ bằng một phím tắt.',
  practiceTaskEn: 'Format a Software Release Note',
  practiceTaskVi: 'Định dạng thông báo phiên bản phần mềm',
  practiceInstEn: 'Create a structure with <h1>Release v2.0</h1>, <h2>Key Highlights</h2>, a paragraph with <strong>Zero-downtime</strong> and <em>fast compilation</em>, and a command <code>npm install 4tm-core</code>.',
  practiceInstVi: 'Tạo cấu trúc với <h1>Release v2.0</h1>, <h2>Key Highlights</h2>, đoạn văn có <strong>Zero-downtime</strong> và <em>fast compilation</em>, cùng lệnh <code>npm install 4tm-core</code>.',
  practiceStarter: '<h1>Release v2.0</h1>\n<!-- Add h2, paragraph with formatting, and code element -->',
  practiceSolution: '<h1>Release v2.0</h1>\n<h2>Key Highlights</h2>\n<p>Enjoy <strong>Zero-downtime</strong> deploys and <em>fast compilation</em>.</p>\n<p>Run <code>npm install 4tm-core</code> to update.</p>',
  practicePatterns: ['<h1>Release v2.0</h1>', '<h2>Key Highlights</h2>', '<strong>Zero-downtime</strong>', '<em>fast compilation</em>', '<code>npm install 4tm-core</code>'],
  practiceHintEn: 'Include <h2>Key Highlights</h2>, <strong>, <em>, and <code>npm install 4tm-core</code>.',
  practiceHintVi: 'Bao gồm <h2>Key Highlights</h2>, <strong>, <em> và <code>npm install 4tm-core</code>.',

  exercises: [
    {
      id: 'html_ex_2_1',
      type: 'complete_code',
      titleEn: 'Create Sequential Headings Hierarchy',
      titleVi: 'Tạo Thứ Bậc Tiêu Đề Tuần Tự',
      instEn: 'Add an <h1> title "Cloud Infrastructure", followed by an <h2> "Serverless Architecture", and an <h3> "Edge Functions".',
      instVi: 'Thêm tiêu đề <h1> "Cloud Infrastructure", theo sau là <h2> "Serverless Architecture" và <h3> "Edge Functions".',
      starter: '<!-- Add h1, h2, and h3 elements -->\n',
      solution: '<h1>Cloud Infrastructure</h1>\n<h2>Serverless Architecture</h2>\n<h3>Edge Functions</h3>',
      hintEn: 'Use <h1>, <h2>, and <h3> in sequential descending order.',
      hintVi: 'Sử dụng lần lượt các thẻ <h1>, <h2> và <h3> theo thứ tự tuần tự.',
      expEn: 'Sequential heading hierarchies ensure accessible page navigation.',
      expVi: 'Thứ bậc tiêu đề tuần tự giúp các công nghệ đọc hỗ trợ định hướng nội dung.'
    },
    {
      id: 'html_ex_2_2',
      type: 'fix_code',
      titleEn: 'Apply Strong and Emphasized Text',
      titleVi: 'Áp Dụng Nhấn Mạnh Strong Và Emphasize',
      instEn: 'Wrap the word "Critical" in <strong> and the word "immediately" in <em> inside the paragraph.',
      instVi: 'Bọc từ "Critical" trong <strong> và từ "immediately" trong <em> bên trong đoạn văn.',
      starter: '<p>Critical: Please update your dependencies immediately.</p>',
      solution: '<p><strong>Critical</strong>: Please update your dependencies <em>immediately</em>.</p>',
      hintEn: 'Use <strong>Critical</strong> and <em>immediately</em>.',
      hintVi: 'Dùng <strong>Critical</strong> và <em>immediately</em>.',
      expEn: '<strong> conveys semantic importance, while <em> adds stress emphasis.',
      expVi: '<strong> mang ý nghĩa quan trọng cao, còn <em> dùng để nhấn giọng.'
    },
    {
      id: 'html_ex_2_3',
      type: 'write_code',
      titleEn: 'Format Keyboard Shortcuts and Code Snippets',
      titleVi: 'Định Dạng Phím Tắt Và Đoạn Mã Nguồn',
      instEn: 'Wrap "git commit" in <code> and "Enter" in <kbd>.',
      instVi: 'Bọc "git commit" trong <code> và "Enter" trong <kbd>.',
      starter: '<p>Type git commit and press Enter to complete.</p>',
      solution: '<p>Type <code>git commit</code> and press <kbd>Enter</kbd> to complete.</p>',
      hintEn: 'Use <code>git commit</code> and <kbd>Enter</kbd>.',
      hintVi: 'Dùng <code>git commit</code> và <kbd>Enter</kbd>.',
      expEn: '<code> represents computer code, and <kbd> represents user keyboard input.',
      expVi: '<code> biểu diễn mã máy tính, còn <kbd> biểu thị phím bấm của người dùng.'
    },
    {
      id: 'html_ex_2_4',
      type: 'modify_example',
      titleEn: 'Render Chemical Formulas and Mathematical Exponents',
      titleVi: 'Biểu Diễn Công Thức Hóa Học Và Số Mũ Toán Học',
      instEn: 'Render Carbon Dioxide as CO<sub>2</sub> and Einstein equation as E = mc<sup>2</sup>.',
      instVi: 'Hiển thị khí CO2 là CO<sub>2</sub> và phương trình Einstein là E = mc<sup>2</sup>.',
      starter: '<p>Carbon dioxide: CO2</p>\n<p>Energy formula: E = mc2</p>',
      solution: '<p>Carbon dioxide: CO<sub>2</sub></p>\n<p>Energy formula: E = mc<sup>2</sup></p>',
      hintEn: 'Use <sub>2</sub> for subscript and <sup>2</sup> for superscript.',
      hintVi: 'Dùng <sub>2</sub> cho chỉ số dưới và <sup>2</sup> cho số mũ trên.',
      expEn: '<sub> creates subscript and <sup> creates superscript with mathematical precision.',
      expVi: '<sub> tạo chỉ số chân dưới và <sup> tạo số mũ trên đúng quy chuẩn.'
    },
    {
      id: 'html_ex_2_5',
      type: 'predict_output',
      titleEn: 'Add Thematic Break and Small Print',
      titleVi: 'Thêm Vạch Phân Cách Và Điều Khoản Nhỏ',
      instEn: 'Add an <hr> thematic break below the article and a <small> tag containing "&copy; 2026 4TM Inc.".',
      instVi: 'Thêm vạch phân cách <hr> bên dưới bài viết và thẻ <small> chứa "&copy; 2026 4TM Inc.".',
      starter: '<article>\n  <h2>Terms of Service</h2>\n  <p>By using this service, you agree to our policies.</p>\n</article>\n<!-- Add hr and small here -->',
      solution: '<article>\n  <h2>Terms of Service</h2>\n  <p>By using this service, you agree to our policies.</p>\n</article>\n<hr>\n<small>&copy; 2026 4TM Inc.</small>',
      hintEn: 'Add <hr> and <small>&copy; 2026 4TM Inc.</small>.',
      hintVi: 'Thêm <hr> và <small>&copy; 2026 4TM Inc.</small>.',
      expEn: '<hr> represents a semantic topic shift and <small> represents fine print or disclaimers.',
      expVi: '<hr> biểu thị sự chuyển đổi chủ đề và <small> biểu thị điều khoản nhỏ.'
    }
  ],

  challenge: {
    id: 'html_ch_2',
    titleEn: 'Technical Documentation Article Layout',
    titleVi: 'Bố Cục Bài Viết Tài Liệu Kỹ Thuật',
    descEn: 'Build a comprehensive technical article featuring an <h1> title, an <h2> section with paragraphs, <strong>, <em>, <code> snippets, a <kbd> shortcut tip, a <mark> highlighted note, and a <small> copyright notice separated by <hr>.',
    descVi: 'Xây dựng bài viết kỹ thuật toàn diện gồm tiêu đề <h1>, phần <h2> có các đoạn văn, nhấn mạnh <strong>, <em>, đoạn mã <code>, phím tắt <kbd>, ghi chú bôi sáng <mark> và bản quyền <small> ngăn cách bởi <hr>.',
    requirements: [
      { en: '<h1> element for the article title', vi: 'Thẻ <h1> làm tiêu đề bài viết' },
      { en: '<h2> element for section title', vi: 'Thẻ <h2> làm tiêu đề phần' },
      { en: '<p> with <strong> and <em> text formatting', vi: 'Thẻ <p> có định dạng <strong> và <em>' },
      { en: '<code> snippet and <kbd> shortcut tag', vi: 'Đoạn mã <code> và phím tắt <kbd>' },
      { en: '<mark> element for key emphasis', vi: 'Thẻ <mark> để làm nổi bật từ khóa' },
      { en: '<hr> divider and <small> copyright notice', vi: 'Vạch <hr> và thông báo bản quyền <small>' }
    ],
    starter: '<!-- Build the complete technical article below -->\n',
    solution: '<article>\n  <h1>Modern Web APIs & Asynchronous Patterns</h1>\n  <section>\n    <h2>The Fetch API</h2>\n    <p>The <strong>Fetch API</strong> provides an <em>asynchronous</em> interface for fetching resources across the network.</p>\n    <p>Invoke <code>fetch(\'/api/data\')</code> to return a Promise.</p>\n    <p>Shortcut: Press <kbd>F12</kbd> to inspect network requests in DevTools.</p>\n    <p><mark>Important:</mark> Always handle network rejection errors with catch blocks.</p>\n  </section>\n  <hr>\n  <footer>\n    <small>&copy; 2026 4TM Engineering. All rights reserved.</small>\n  </footer>\n</article>',
    hints: [
      { en: 'Structure with <article>, <section>, <h2>, paragraphs, formatting tags, <hr>, and <footer>.', vi: 'Cấu trúc gồm <article>, <section>, <h2>, đoạn văn, các thẻ định dạng, <hr> và <footer>.' }
    ],
    expEn: 'This article demonstrates rich semantic text formatting and complete typographic hierarchy.',
    expVi: 'Bài viết minh họa đầy đủ kỹ thuật định dạng văn bản ngữ nghĩa và phân cấp kiểu chữ chuẩn.'
  },

  challengeVariants: [
    {
      id: 'html_ch_2_v1',
      titleEn: 'Variant 1: Scientific Journal Paper Excerpt',
      titleVi: 'Biến Thể 1: Đoạn Trích Bài Báo Khoa Học',
      descEn: 'Create a scientific excerpt with <h1>Quantum Chemistry</h1>, <h2>Molecular Formula</h2>, chemical formula H<sub>2</sub>SO<sub>4</sub>, equation E = hv<sup>2</sup>, and <small>Peer reviewed</small>.',
      descVi: 'Tạo đoạn trích khoa học với <h1>Quantum Chemistry</h1>, <h2>Molecular Formula</h2>, công thức hóa học H<sub>2</sub>SO<sub>4</sub>, phương trình E = hv<sup>2</sup> và <small>Peer reviewed</small>.',
      requirements: [
        { en: '<h1>Quantum Chemistry</h1>', vi: '<h1>Quantum Chemistry</h1>' },
        { en: '<h2>Molecular Formula</h2>', vi: '<h2>Molecular Formula</h2>' },
        { en: 'Chemical formula with <sub> (e.g. H<sub>2</sub>SO<sub>4</sub>)', vi: 'Công thức hóa học với <sub> (như H<sub>2</sub>SO<sub>4</sub>)' },
        { en: 'Mathematical exponent with <sup> (e.g. E = hv<sup>2</sup>)', vi: 'Số mũ toán học với <sup> (như E = hv<sup>2</sup>)' },
        { en: '<small> peer-reviewed citation', vi: 'Trích dẫn bình duyệt với <small>' }
      ],
      starter: '<!-- Build scientific excerpt layout -->\n',
      solution: '<article>\n  <h1>Quantum Chemistry</h1>\n  <section>\n    <h2>Molecular Formula</h2>\n    <p>Sulfuric acid is denoted as H<sub>2</sub>SO<sub>4</sub> in standard chemistry.</p>\n    <p>Frequency energy is described by E = hv<sup>2</sup>.</p>\n  </section>\n  <hr>\n  <small>Peer reviewed article &copy; 2026 Science Lab</small>\n</article>',
      expEn: 'Accurately displays chemical subscripts and mathematical superscripts.',
      expVi: 'Hiển thị chính xác các chỉ số hóa học và số mũ toán học.'
    },
    {
      id: 'html_ch_2_v2',
      titleEn: 'Variant 2: Command Line CLI Quickstart Guide',
      titleVi: 'Biến Thể 2: Hướng Dẫn Nhanh Dòng Lệnh CLI',
      descEn: 'Create a CLI guide with <h1>Git Command Guide</h1>, <h2>Staging Changes</h2>, <code>git add .</code>, shortcut <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>, and a <mark>Caution</mark> badge.',
      descVi: 'Tạo hướng dẫn CLI với <h1>Git Command Guide</h1>, <h2>Staging Changes</h2>, <code>git add .</code>, phím tắt <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> và nhãn <mark>Caution</mark>.',
      requirements: [
        { en: '<h1>Git Command Guide</h1>', vi: '<h1>Git Command Guide</h1>' },
        { en: '<h2>Staging Changes</h2>', vi: '<h2>Staging Changes</h2>' },
        { en: '<code>git add .</code> code snippet', vi: 'Đoạn mã <code>git add .</code>' },
        { en: '<kbd> keys for shortcut', vi: 'Thẻ <kbd> cho tổ hợp phím tắt' },
        { en: '<mark>Caution</mark> label', vi: 'Nhãn cảnh báo <mark>Caution</mark>' }
      ],
      starter: '<!-- Build CLI quickstart guide -->\n',
      solution: '<article>\n  <h1>Git Command Guide</h1>\n  <section>\n    <h2>Staging Changes</h2>\n    <p>Execute <code>git add .</code> to stage all modified files.</p>\n    <p>Open command palette via <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>.</p>\n    <p><mark>Caution:</mark> Never commit unencrypted secrets.</p>\n  </section>\n</article>',
      expEn: 'Effective technical documentation utilizing code, kbd, and mark tags.',
      expVi: 'Tài liệu kỹ thuật rõ ràng sử dụng các thẻ code, kbd và mark.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_2_1',
      type: 'single_choice',
      qEn: 'How many <h1> heading elements should generally exist per individual web page?',
      qVi: 'Thông thường nên có bao nhiêu thẻ tiêu đề <h1> trên một trang web duy nhất?',
      options: [
        { en: 'Exactly one primary <h1> describing the main subject of the page', vi: 'Duy nhất một thẻ <h1> chính mô tả chủ đề của trang' },
        { en: 'One <h1> per paragraph', vi: 'Mỗi đoạn văn một thẻ <h1>' },
        { en: 'As many as needed to make text look big', vi: 'Bao nhiêu cũng được miễn là chữ to' },
        { en: 'None, <h1> is deprecated in HTML5', vi: 'Không có, <h1> đã bị loại bỏ trong HTML5' }
      ],
      ans: 0,
      expEn: 'A single <h1> establishes the document core topic for accessibility outlines and search engine indexing.',
      expVi: 'Một thẻ <h1> duy nhất xác định chủ đề trọng tâm của trang cho cấu trúc trợ năng và SEO.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_2',
      type: 'single_choice',
      qEn: 'What is the semantic difference between <strong> and <b> in HTML5?',
      qVi: 'Sự khác biệt về mặt ngữ nghĩa giữa thẻ <strong> và <b> trong HTML5 là gì?',
      options: [
        { en: '<strong> indicates strong importance/urgency for screen readers, while <b> is purely visual bold styling without semantic weight', vi: '<strong> thể hiện mức độ quan trọng/khẩn cấp cho trình đọc màn hình, còn <b> chỉ in đậm trực quan không mang nghĩa' },
        { en: '<b> is modern HTML5 while <strong> is obsolete', vi: '<b> là chuẩn HTML5 mới còn <strong> đã lỗi thời' },
        { en: '<strong> is only used for numerical values', vi: '<strong> chỉ dùng cho các giá trị số' },
        { en: '<b> renders red color while <strong> renders black', vi: '<b> hiển thị màu đỏ còn <strong> hiển thị màu đen' }
      ],
      ans: 0,
      expEn: '<strong> represents high semantic importance, whereas <b> is purely typographic presentation.',
      expVi: '<strong> biểu thị tầm quan trọng ngữ nghĩa, trong khi <b> thuần túy là định dạng hiển thị.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_3',
      type: 'single_choice',
      qEn: 'What is the semantic purpose of the <em> element?',
      qVi: 'Mục đích ngữ nghĩa của thẻ <em> là gì?',
      options: [
        { en: 'Represents stress emphasis that alters the spoken tone and verbal meaning of a sentence', vi: 'Biểu thị nhấn mạnh ngữ điệu (stress emphasis) làm thay đổi giọng đọc và sắc thái câu' },
        { en: 'Creates an email hyperlink automatically', vi: 'Tự động tạo liên kết gửi email' },
        { en: 'Embeds an external multimedia player', vi: 'Nhúng trình phát đa phương tiện bên ngoài' },
        { en: 'Calculates the root em typography unit', vi: 'Tính toán đơn vị kiểu chữ em' }
      ],
      ans: 0,
      expEn: '<em> alters screen reader verbal inflection to stress a specific word.',
      expVi: '<em> làm thay đổi ngữ điệu đọc của phần mềm trợ thính để nhấn mạnh từ ngữ.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_4',
      type: 'single_choice',
      qEn: 'Which HTML element is specifically designed for inline code snippets like function names or variables?',
      qVi: 'Thẻ HTML nào được thiết kế riêng để hiển thị các đoạn mã nguồn ngắn như tên hàm hoặc biến?',
      options: [
        { en: '<code>', vi: '<code>' },
        { en: '<script>', vi: '<script>' },
        { en: '<syntax>', vi: '<syntax>' },
        { en: '<program>', vi: '<program>' }
      ],
      ans: 0,
      expEn: '<code> semantically marks computer code fragments inside running text.',
      expVi: '<code> đánh dấu các đoạn mã máy tính lồng trong văn bản.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_5',
      type: 'single_choice',
      qEn: 'Which HTML element represents user keyboard input, keystrokes, or voice commands?',
      qVi: 'Thẻ HTML nào đại diện cho phím bấm bàn phím, tổ hợp phím hoặc lệnh thoại từ người dùng?',
      options: [
        { en: '<kbd>', vi: '<kbd>' },
        { en: '<key>', vi: '<key>' },
        { en: '<button>', vi: '<button>' },
        { en: '<input>', vi: '<input>' }
      ],
      ans: 0,
      expEn: '<kbd> represents user keyboard input such as <kbd>Ctrl</kbd> + <kbd>C</kbd>.',
      expVi: '<kbd> biểu thị phím bấm của người dùng như <kbd>Ctrl</kbd> + <kbd>C</kbd>.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_6',
      type: 'single_choice',
      qEn: 'What is the correct HTML element for highlighted or referenced text (e.g. search keyword match)?',
      qVi: 'Thẻ HTML nào dùng để làm nổi bật hoặc đánh dấu từ khóa tìm kiếm trong văn bản?',
      options: [
        { en: '<mark>', vi: '<mark>' },
        { en: '<highlight>', vi: '<highlight>' },
        { en: '<yellow>', vi: '<yellow>' },
        { en: '<glow>', vi: '<glow>' }
      ],
      ans: 0,
      expEn: '<mark> indicates text highlighted for relevance or reference in another context.',
      expVi: '<mark> làm nổi bật văn bản do có sự liên quan hoặc khớp từ khóa tìm kiếm.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_7',
      type: 'single_choice',
      qEn: 'What does the <hr> element represent in HTML5?',
      qVi: 'Thẻ <hr> đại diện cho điều gì trong chuẩn HTML5?',
      options: [
        { en: 'A thematic break or topic transition between paragraphs of a section', vi: 'Một vạch phân cách chuyển đổi chủ đề ngữ nghĩa giữa các đoạn văn trong một phần' },
        { en: 'A hard reboot of the browser window', vi: 'Khởi động lại cửa sổ trình duyệt' },
        { en: 'An hourly timestamp log', vi: 'Ghi nhật ký mốc thời gian theo giờ' },
        { en: 'A high-resolution image banner', vi: 'Hình ảnh biểu ngữ độ phân giải cao' }
      ],
      ans: 0,
      expEn: 'In HTML5, <hr> is a semantic thematic break between paragraph-level topics.',
      expVi: 'Trong HTML5, <hr> là điểm ngắt chuyển tiếp chủ đề giữa các đoạn văn.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_8',
      type: 'single_choice',
      qEn: 'Which element is used for chemical formulas like CO₂ where the number 2 is positioned below baseline?',
      qVi: 'Thẻ nào dùng cho công thức hóa học như CO₂ với số 2 nằm thấp hơn dòng chữ?',
      options: [
        { en: '<sub>', vi: '<sub>' },
        { en: '<sup>', vi: '<sup>' },
        { en: '<down>', vi: '<down>' },
        { en: '<foot>', vi: '<foot>' }
      ],
      ans: 0,
      expEn: '<sub> produces subscript characters positioned below normal text baseline.',
      expVi: '<sub> tạo ký tự chỉ số chân nằm phía dưới đường cơ sở văn bản.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_9',
      type: 'single_choice',
      qEn: 'Which element is used for mathematical exponents like x² where the number 2 is positioned above baseline?',
      qVi: 'Thẻ nào dùng cho số mũ toán học như x² với số 2 nằm cao hơn dòng chữ?',
      options: [
        { en: '<sup>', vi: '<sup>' },
        { en: '<sub>', vi: '<sub>' },
        { en: '<top>', vi: '<top>' },
        { en: '<power>', vi: '<power>' }
      ],
      ans: 0,
      expEn: '<sup> produces superscript characters positioned above normal text baseline.',
      expVi: '<sup> tạo ký tự số mũ nằm phía trên đường cơ sở văn bản.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_10',
      type: 'single_choice',
      qEn: 'What is the semantic purpose of the <small> element in modern HTML5?',
      qVi: 'Mục đích ngữ nghĩa của thẻ <small> trong chuẩn HTML5 hiện đại là gì?',
      options: [
        { en: 'Side comments, copyright notices, and legal disclaimers (fine print)', vi: 'Ghi chú phụ, thông báo bản quyền và các điều khoản pháp lý nhỏ' },
        { en: 'Only to reduce font size to 10px in CSS', vi: 'Chỉ để giảm cỡ chữ xuống 10px trong CSS' },
        { en: 'Renders text on mobile watches only', vi: 'Chỉ hiển thị trên màn hình đồng hồ thông minh' },
        { en: 'Compresses payload size of the text node', vi: 'Nén dung lượng truyền tải của chuỗi ký tự' }
      ],
      ans: 0,
      expEn: '<small> represents small print, legal conditions, and copyright declarations.',
      expVi: '<small> đại diện cho văn bản điều khoản pháp lý và thông báo bản quyền.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_11',
      type: 'single_choice',
      qEn: 'Why should you avoid skipping heading levels (e.g. jumping from <h1> directly to <h4>)?',
      qVi: 'Tại sao không nên nhảy cóc thứ bậc tiêu đề (ví dụ từ <h1> nhảy thẳng xuống <h4>)?',
      options: [
        { en: 'It breaks document outline navigation for screen reader users and impairs SEO indexing', vi: 'Nó làm vỡ cấu trúc mục lục trang cho người dùng trình đọc màn hình và giảm điểm SEO' },
        { en: 'The browser parser will throw a fatal JavaScript runtime error', vi: 'Trình duyệt sẽ báo lỗi JavaScript nghiêm trọng' },
        { en: 'The text will fail to render entirely', vi: 'Văn bản sẽ không thể hiển thị trên màn hình' },
        { en: 'It triggers Quirks Mode in the layout engine', vi: 'Nó kích hoạt chế độ Quirks Mode trong trình duyệt' }
      ],
      ans: 0,
      expEn: 'Headings create an accessible hierarchical document tree that assistive technologies rely on for jumping through sections.',
      expVi: 'Tiêu đề tạo nên cây mục lục phân cấp giúp công nghệ trợ thính điều hướng qua các phần.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_12',
      type: 'single_choice',
      qEn: 'What does the <br> tag do, and when should it be used?',
      qVi: 'Thẻ <br> có tác dụng gì và nên được sử dụng trong trường hợp nào?',
      options: [
        { en: 'Produces a line break within text (e.g. poems, physical addresses); should NOT be used to create empty spacing margins', vi: 'Tạo ngắt dòng trong văn bản (như thơ, địa chỉ nhà); KHÔNG nên dùng để tạo khoảng cách lề' },
        { en: 'Creates a full page break before printing', vi: 'Tạo ngắt trang trước khi in' },
        { en: 'Renders a solid black horizontal line', vi: 'Vẽ một đường kẻ ngang màu đen' },
        { en: 'Clears floated layout containers', vi: 'Xóa các phần tử float bố cục' }
      ],
      ans: 0,
      expEn: '<br> inserts a line break only where the division of lines is significant (like addresses or poetry).',
      expVi: '<br> chỉ dùng để ngắt dòng ở những nơi việc xuống dòng mang ý nghĩa thực sự như địa chỉ hoặc thơ.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_13',
      type: 'single_choice',
      qEn: 'Which HTML element represents preformatted text preserving exact spaces and line breaks?',
      qVi: 'Thẻ HTML nào dùng để hiển thị văn bản giữ nguyên chính xác từng khoảng trắng và ngắt dòng?',
      options: [
        { en: '<pre>', vi: '<pre>' },
        { en: '<code>', vi: '<code>' },
        { en: '<raw>', vi: '<raw>' },
        { en: '<space>', vi: '<space>' }
      ],
      ans: 0,
      expEn: '<pre> preserves whitespace, tab stops, and newline characters exactly as authored.',
      expVi: '<pre> giữ nguyên toàn bộ khoảng trắng, tab và dấu xuống dòng như trong mã nguồn.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_14',
      type: 'single_choice',
      qEn: 'What is the semantic difference between <i> and <em>?',
      qVi: 'Sự khác biệt ngữ nghĩa giữa thẻ <i> và <em> là gì?',
      options: [
        { en: '<em> conveys stress emphasis affecting tone of voice; <i> represents text in an alternate voice or mood (e.g. taxonomic names, foreign terms) without extra emphasis', vi: '<em> nhấn mạnh ngữ điệu giọng đọc; <i> đại diện cho thuật ngữ chuyên ngành, tiếng nước ngoài hoặc tâm trạng khác mà không thêm nhấn mạnh' },
        { en: '<i> is italic and <em> is underline', vi: '<i> là in nghiêng còn <em> là gạch chân' },
        { en: '<i> is for icons only and <em> is for text', vi: '<i> chỉ dùng cho icon còn <em> dùng cho chữ' },
        { en: 'They are 100% identical in every specification', vi: 'Chúng hoàn toàn giống nhau 100%' }
      ],
      ans: 0,
      expEn: '<em> implies verbal stress emphasis, whereas <i> marks alternate voice or taxonomic terms.',
      expVi: '<em> mang ý nhấn giọng, còn <i> dùng cho tên khoa học hoặc từ mượn tiếng nước ngoài.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_15',
      type: 'single_choice',
      qEn: 'Which element is used to indicate text that has been inserted into a document during edits?',
      qVi: 'Thẻ nào dùng để biểu thị đoạn văn bản mới được chèn thêm vào tài liệu khi chỉnh sửa?',
      options: [
        { en: '<ins>', vi: '<ins>' },
        { en: '<add>', vi: '<add>' },
        { en: '<new>', vi: '<new>' },
        { en: '<plus>', vi: '<plus>' }
      ],
      ans: 0,
      expEn: '<ins> represents inserted text and <del> represents deleted text for change tracking.',
      expVi: '<ins> biểu diễn phần văn bản được thêm vào và <del> biểu diễn phần bị xóa khi theo dõi thay đổi.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_2_16',
      type: 'single_choice',
      qEn: 'Which element is used to mark text that has been deleted or strikethrough for revision history?',
      qVi: 'Thẻ nào dùng để biểu thị đoạn văn bản đã bị gạch bỏ (xóa) trong lịch sử chỉnh sửa tài liệu?',
      options: [
        { en: '<del>', vi: '<del>' },
        { en: '<strike>', vi: '<strike>' },
        { en: '<remove>', vi: '<remove>' },
        { en: '<cut>', vi: '<cut>' }
      ],
      ans: 0,
      expEn: '<del> represents removed or deleted content in revision workflows.',
      expVi: '<del> đại diện cho nội dung đã bị lược bỏ trong quá trình sửa đổi tài liệu.',
      difficulty: 'easy'
    }
  ]
};
