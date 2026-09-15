import * as fs from 'fs';
import * as path from 'path';
import { RawLessonSource } from './rawLessonType';

export const lesson5: RawLessonSource = {
  order: 5,
  id: 'html_lesson_5',
  moduleId: 'html_mod_2',
  levelId: 'basic',
  topicId: 'html_lists_menus',
  titleEn: 'Lists (ul, ol, dl) & Semantic Navigation Menus',
  titleVi: 'Danh Sách (ul, ol, dl) & Menu Điều Hướng Ngữ Nghĩa',
  summaryEn: 'Master unordered lists (<ul>), ordered lists (<ol>), description lists (<dl>, <dt>, <dd>), and multi-level semantic navigation structures.',
  summaryVi: 'Làm chủ danh sách không thứ tự (<ul>), có thứ tự (<ol>), danh sách mô tả thuật ngữ (<dl>, <dt>, <dd>) và menu điều hướng đa cấp ngữ nghĩa.',
  estimatedMinutes: 15,
  introEn: 'Lists are foundational for organizing grouped items, navigation bars, breadcrumbs, term dictionaries, and step-by-step guides.',
  introVi: 'Danh sách là cấu trúc nền tảng để tổ chức nhóm mục tin, thanh điều hướng, thanh đường dẫn breadcrumbs, từ điển thuật ngữ và hướng dẫn từng bước.',
  conceptEn: 'HTML provides three list archetypes: <ul> for unordered collections, <ol> for sequential numbered steps (with type, start, reversed attributes), and <dl> with <dt> (definition term) and <dd> (definition description) for key-value pairings and metadata. For navigation, wrap <ul> inside <nav> with clean <a> links.',
  conceptVi: 'HTML cung cấp 3 loại danh sách: <ul> cho tập hợp không thứ tự, <ol> cho các bước tuần tự (có các thuộc tính type, start, reversed), và <dl> cùng <dt> (thuật ngữ) và <dd> (mô tả) cho cặp khóa-giá trị và từ điển. Đối với điều hướng menu, luôn lồng <ul> trong thẻ <nav> cùng các thẻ liên kết <a>.',
  syntax: '<!-- Unordered List -->\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n\n<!-- Ordered List -->\n<ol start="1">\n  <li>Step 1</li>\n  <li>Step 2</li>\n</ol>\n\n<!-- Description List -->\n<dl>\n  <dt>Term</dt>\n  <dd>Description definition</dd>\n</dl>',
  ex1TitleEn: 'Semantic Header Navigation with Unordered List',
  ex1TitleVi: 'Menu Điều Hướng Đầu Trang Chuẩn Ngữ Nghĩa',
  ex1Code: '<nav aria-label="Main Navigation">\n  <ul style="list-style:none; display:flex; gap:16px; padding:0; margin:0;">\n    <li><a href="/" style="text-decoration:none; color:#2563eb; font-weight:600;">Home</a></li>\n    <li><a href="/courses" style="text-decoration:none; color:#475569;">Courses</a></li>\n    <li><a href="/contact" style="text-decoration:none; color:#475569;">Contact</a></li>\n  </ul>\n</nav>',
  ex1ExpEn: 'Uses <nav> with aria-label wrapping an unordered list <ul> to communicate a clean navigational hierarchy to screen readers.',
  ex1ExpVi: 'Sử dụng thẻ <nav> có aria-label bao bọc danh sách <ul> giúp trình đọc màn hình nhận diện rõ ràng cấu trúc phân cấp điều hướng.',
  ex2TitleEn: 'Description List for Product Technical Specifications',
  ex2TitleVi: 'Danh Sách Mô Tả Thông Số Kỹ Thuật Sản Phẩm',
  ex2Code: '<dl style="display:grid; grid-template-columns:140px 1fr; gap:8px 16px; background:#f8fafc; padding:16px; border-radius:8px;">\n  <dt style="font-weight:700; color:#1e293b;">Processor</dt>\n  <dd style="margin:0; color:#475569;">Apple M3 Max 16-Core</dd>\n  <dt style="font-weight:700; color:#1e293b;">Unified Memory</dt>\n  <dd style="margin:0; color:#475569;">64 GB LPDDR5X</dd>\n  <dt style="font-weight:700; color:#1e293b;">Storage</dt>\n  <dd style="margin:0; color:#475569;">2 TB PCIe NVMe SSD</dd>\n</dl>',
  ex2ExpEn: '<dl> is the semantically correct element for key-value pairs, metadata specs, glossaries, and settings lists.',
  ex2ExpVi: '<dl> là thẻ ngữ nghĩa chuẩn nhất cho cặp khóa-giá trị, bảng thông số kỹ thuật, từ điển thuật ngữ và danh sách cài đặt.',
  mistake1En: 'Placing direct children inside <ul> or <ol> that are not <li> elements (e.g. <div> or <a> directly inside <ul>)',
  mistake1Vi: 'Đặt phần tử con trực tiếp bên trong <ul> hoặc <ol> không phải là thẻ <li> (ví dụ đặt <div> hoặc <a> trực tiếp trong <ul>)',
  correction1En: 'The only valid direct children of <ul> and <ol> are <li> elements. Place links and text inside the <li>.',
  correction1Vi: 'Phần tử con trực tiếp duy nhất hợp lệ của <ul> và <ol> là thẻ <li>. Hãy đặt thẻ <a> và chữ bên trong thẻ <li>.',
  mistake2En: 'Using <p> or <br> to format key-value pairs instead of semantic <dl>, <dt>, <dd>',
  mistake2Vi: 'Dùng thẻ <p> hoặc <br> để format cặp dữ liệu thay vì dùng <dl>, <dt>, <dd>',
  correction2En: 'Use <dl> with <dt> (term) and <dd> (description) for structured key-value data.',
  correction2Vi: 'Dùng <dl> cùng <dt> (thuật ngữ) và <dd> (mô tả) cho dữ liệu dạng cặp khóa-giá trị có cấu trúc.',
  tipEn: 'You can associate multiple <dt> terms with a single <dd> description, or multiple <dd> descriptions with a single <dt> term in a <dl>.',
  tipVi: 'Bạn có thể liên kết nhiều <dt> với cùng 1 <dd>, hoặc nhiều <dd> cho cùng 1 <dt> trong thẻ <dl>.',
  practiceTaskEn: 'Build a Semantic Breadcrumb Navigation List',
  practiceTaskVi: 'Xây dựng danh sách điều hướng breadcrumb ngữ nghĩa',
  practiceInstEn: 'Create a <nav aria-label="Breadcrumb"> containing an <ol> with 3 <li> items: Home (linked to "/"), Courses (linked to "/courses"), and HTML5 (plain text current page).',
  practiceInstVi: 'Tạo thẻ <nav aria-label="Breadcrumb"> chứa danh sách <ol> gồm 3 thẻ <li>: Home (liên kết đến "/"), Courses (liên kết đến "/courses"), và HTML5 (văn bản trang hiện tại).',
  practiceStarter: '<nav aria-label="Breadcrumb">\n  \n</nav>',
  practiceSolution: '<nav aria-label="Breadcrumb">\n  <ol>\n    <li><a href="/">Home</a></li>\n    <li><a href="/courses">Courses</a></li>\n    <li>HTML5</li>\n  </ol>\n</nav>',
  practicePatterns: ['<nav', 'aria-label="Breadcrumb"', '<ol>', '<li><a href="/">Home</a></li>', '<li><a href="/courses">Courses</a></li>', '<li>HTML5</li>', '</ol>', '</nav>'],
  practiceHintEn: 'Wrap an <ol> inside <nav> with 3 <li> items.',
  practiceHintVi: 'Bao bọc danh sách <ol> trong thẻ <nav> với 3 mục <li>.',

  exercises: [
    {
      id: 'html_ex_5_1',
      type: 'complete_code',
      titleEn: 'Create an Ordered Recipe List with Reversed Attribute',
      titleVi: 'Tạo danh sách công thức nấu ăn đếm ngược',
      instEn: 'Create an <ol reversed start="3"> with 3 countdown steps: <li>Blast Off</li>, <li>Ignition</li>, <li>Standby</li>.',
      instVi: 'Tạo thẻ <ol reversed start="3"> với 3 bước đếm ngược: <li>Blast Off</li>, <li>Ignition</li>, <li>Standby</li>.',
      starter: '<ol>\n  \n</ol>',
      solution: '<ol reversed start="3">\n  <li>Blast Off</li>\n  <li>Ignition</li>\n  <li>Standby</li>\n</ol>',
      hintEn: 'Add reversed and start="3" to <ol>.',
      hintVi: 'Thêm thuộc tính reversed và start="3" vào thẻ <ol>.',
      expEn: 'The reversed attribute numbers items in descending order without changing DOM order.',
      expVi: 'Thuộc tính reversed đánh số thứ tự giảm dần mà không làm thay đổi thứ tự DOM.'
    },
    {
      id: 'html_ex_5_2',
      type: 'fix_code',
      titleEn: 'Fix Invalid Direct Children in <ul>',
      titleVi: 'Sửa lỗi phần tử con trực tiếp không hợp lệ trong <ul>',
      instEn: 'Fix the markup by moving the direct <a> elements inside <li> wrappers inside the <ul>.',
      instVi: 'Sửa đoạn mã bằng cách chuyển các thẻ <a> trực tiếp vào bên trong các thẻ <li> nằm trong <ul>.',
      starter: '<ul>\n  <a href="/about">About</a>\n  <a href="/contact">Contact</a>\n</ul>',
      solution: '<ul>\n  <li><a href="/about">About</a></li>\n  <li><a href="/contact">Contact</a></li>\n</ul>',
      hintEn: 'Wrap each <a> tag inside <li>...</li>.',
      hintVi: 'Bao bọc từng thẻ <a> bên trong <li>...</li>.',
      expEn: 'Only <li> (or <template>/<script>) can be direct children of <ul> and <ol>.',
      expVi: 'Chỉ có thẻ <li> mới được phép làm con trực tiếp của thẻ <ul> và <ol>.'
    },
    {
      id: 'html_ex_5_3',
      type: 'write_code',
      titleEn: 'Create a Glossary with Description List',
      titleVi: 'Tạo từ điển thuật ngữ với thẻ danh sách mô tả <dl>',
      instEn: 'Write a <dl> containing two terms: <dt>HTML</dt> with <dd>HyperText Markup Language</dd>, and <dt>CSS</dt> with <dd>Cascading Style Sheets</dd>.',
      instVi: 'Viết thẻ <dl> chứa 2 thuật ngữ: <dt>HTML</dt> kèm <dd>HyperText Markup Language</dd>, và <dt>CSS</dt> kèm <dd>Cascading Style Sheets</dd>.',
      starter: '',
      solution: '<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language</dd>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets</dd>\n</dl>',
      hintEn: 'Use <dl> with alternating <dt> and <dd> elements.',
      hintVi: 'Dùng thẻ <dl> với các cặp thẻ <dt> và <dd> xen kẽ.',
      expEn: '<dl>, <dt>, and <dd> define accessible key-value glossary pairs.',
      expVi: '<dl>, <dt>, và <dd> định nghĩa các cặp thuật ngữ và giải thích chuẩn SEO & trợ năng.'
    },
    {
      id: 'html_ex_5_4',
      type: 'modify_example',
      titleEn: 'Add Nested Sub-List to Navigation',
      titleVi: 'Thêm danh sách con lồng nhau vào menu',
      instEn: 'Nest a <ul> containing <li><a href="/html">HTML</a></li> and <li><a href="/css">CSS</a></li> inside the Courses <li> item.',
      instVi: 'Lồng một danh sách <ul> chứa <li><a href="/html">HTML</a></li> và <li><a href="/css">CSS</a></li> vào bên trong thẻ <li> Courses.',
      starter: '<ul>\n  <li><a href="/">Home</a></li>\n  <li>\n    <a href="/courses">Courses</a>\n  </li>\n</ul>',
      solution: '<ul>\n  <li><a href="/">Home</a></li>\n  <li>\n    <a href="/courses">Courses</a>\n    <ul>\n      <li><a href="/html">HTML</a></li>\n      <li><a href="/css">CSS</a></li>\n    </ul>\n  </li>\n</ul>',
      hintEn: 'Place the child <ul> directly inside the parent <li> after the <a> link.',
      hintVi: 'Đặt thẻ <ul> con bên trong thẻ <li> cha ngay sau thẻ <a>.',
      expEn: 'Nested lists must be placed inside the parent <li> element, never directly between <li> siblings.',
      expVi: 'Danh sách lồng nhau bắt buộc phải nằm bên trong thẻ <li> cha, không được đặt ngang hàng giữa các <li>.'
    },
    {
      id: 'html_ex_5_5',
      type: 'predict_output',
      titleEn: 'Analyze Type and Start on Ordered List',
      titleVi: 'Phân tích thuộc tính type và start trên danh sách có thứ tự',
      instEn: 'Write the starting letter of an <ol type="A" start="3"> element.',
      instVi: 'Ghi chữ cái bắt đầu của phần tử <ol type="A" start="3">.',
      starter: '<!-- What is the first item marker of <ol type="A" start="3">? -->\n<p>Marker: </p>',
      solution: '<p>Marker: C</p>',
      hintEn: 'The 3rd letter of the alphabet in uppercase is C.',
      hintVi: 'Chữ cái thứ 3 trong bảng chữ cái viết hoa là C.',
      expEn: 'start="3" with type="A" begins the sequence at the 3rd alphabetic letter ("C").',
      expVi: 'start="3" kèm type="A" bắt đầu chuỗi đếm từ chữ cái thứ 3 ("C").'
    }
  ],

  challenge: {
    id: 'html_ch_5',
    titleEn: 'Multi-Level Accessible Header Navigation & Meta Specs',
    titleVi: 'Thanh điều hướng phân cấp chuẩn trợ năng & Bảng thông số',
    descEn: 'Build an enterprise navigation bar with primary links and a nested submenu, followed by a product specification section using <dl>.',
    descVi: 'Xây dựng thanh điều hướng đa cấp chuẩn trợ năng có menu con, kèm theo khu vực bảng thông số kỹ thuật sản phẩm bằng <dl>.',
    requirements: [
      { en: 'Wrap main navigation in <nav aria-label="Site Navigation">', vi: 'Bao bọc menu chính trong <nav aria-label="Site Navigation">' },
      { en: 'Use an outer <ul> with links: Home, Products (with nested sub-list for Laptops and Phones), and Support', vi: 'Dùng thẻ <ul> ngoài cùng với các liên kết: Home, Products (kèm danh sách con cho Laptops và Phones), và Support' },
      { en: 'Create a <section> with <h2>Tech Specs</h2> and a <dl> containing Brand (Apple), Model (MacBook Pro), and Warranty (2 Years)', vi: 'Tạo <section> có <h2>Tech Specs</h2> và <dl> chứa Brand (Apple), Model (MacBook Pro), và Warranty (2 Years)' }
    ],
    starter: '<!-- Build multi-level navigation and spec list here -->\n',
    solution: '<nav aria-label="Site Navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li>\n      <a href="/products">Products</a>\n      <ul>\n        <li><a href="/products/laptops">Laptops</a></li>\n        <li><a href="/products/phones">Phones</a></li>\n      </ul>\n    </li>\n    <li><a href="/support">Support</a></li>\n  </ul>\n</nav>\n<section>\n  <h2>Tech Specs</h2>\n  <dl>\n    <dt>Brand</dt>\n    <dd>Apple</dd>\n    <dt>Model</dt>\n    <dd>MacBook Pro</dd>\n    <dt>Warranty</dt>\n    <dd>2 Years</dd>\n  </dl>\n</section>',
    hints: [
      { en: 'Remember to place the nested <ul> inside the Products <li>', vi: 'Nhớ đặt thẻ <ul> con bên trong thẻ <li> của Products' },
      { en: 'Use alternating <dt> and <dd> tags inside <dl>', vi: 'Dùng các cặp thẻ <dt> và <dd> xen kẽ trong <dl>' }
    ],
    expEn: 'Demonstrates hierarchical navigation structuring and semantic key-value specification pairing.',
    expVi: 'Minh họa cách xây dựng cấu trúc điều hướng phân cấp và cặp thông số kỹ thuật chuẩn ngữ nghĩa.'
  },

  challengeVariants: [
    {
      id: 'html_ch_5_v1',
      titleEn: 'Variant 1: Documentation Table of Contents',
      titleVi: 'Biến thể 1: Mục lục tài liệu kỹ thuật',
      descEn: 'Build a numbered table of contents using <ol> with nested sub-chapters and anchor links.',
      descVi: 'Xây dựng mục lục đánh số thứ tự bằng <ol> có các chương con lồng nhau và liên kết neo.',
      requirements: [
        { en: 'Use <nav aria-label="Table of Contents">', vi: 'Dùng thẻ <nav aria-label="Table of Contents">' },
        { en: 'Create an <ol> with Chapter 1, Chapter 2 (with sub-list: 2.1 Setup, 2.2 Config), and Chapter 3', vi: 'Tạo <ol> gồm Chapter 1, Chapter 2 (kèm danh sách con: 2.1 Setup, 2.2 Config), và Chapter 3' }
      ],
      starter: '<nav aria-label="Table of Contents">\n  \n</nav>',
      solution: '<nav aria-label="Table of Contents">\n  <ol>\n    <li><a href="#ch1">Chapter 1: Intro</a></li>\n    <li>\n      <a href="#ch2">Chapter 2: Installation</a>\n      <ol>\n        <li><a href="#ch2-1">2.1 Setup</a></li>\n        <li><a href="#ch2-2">2.2 Config</a></li>\n      </ol>\n    </li>\n    <li><a href="#ch3">Chapter 3: Summary</a></li>\n  </ol>\n</nav>',
      expEn: 'Nested <ol> inside <li> provides ordered document hierarchy for screen readers.',
      expVi: '<ol> lồng bên trong <li> cung cấp phân cấp tài liệu có thứ tự chuẩn cho trình đọc màn hình.'
    },
    {
      id: 'html_ch_5_v2',
      titleEn: 'Variant 2: Multi-Term Glossary with Synonyms',
      titleVi: 'Biến thể 2: Từ điển thuật ngữ kèm từ đồng nghĩa',
      descEn: 'Build a <dl> where one description is shared by multiple <dt> terms (e.g. JavaScript, JS, ECMAScript).',
      descVi: 'Xây dựng <dl> trong đó 1 mô tả <dd> được dùng chung cho nhiều thuật ngữ <dt> (như JavaScript, JS, ECMAScript).',
      requirements: [
        { en: 'Define <dl> with three consecutive <dt> tags (JavaScript, JS, ECMAScript) pointing to one <dd>', vi: 'Định nghĩa <dl> với 3 thẻ <dt> liên tiếp (JavaScript, JS, ECMAScript) cùng trỏ về 1 thẻ <dd>' },
        { en: 'Add a second term <dt>TypeScript</dt> with its own <dd>', vi: 'Thêm thuật ngữ thứ hai <dt>TypeScript</dt> với phần mô tả <dd> riêng' }
      ],
      starter: '<dl>\n  \n</dl>',
      solution: '<dl>\n  <dt>JavaScript</dt>\n  <dt>JS</dt>\n  <dt>ECMAScript</dt>\n  <dd>A dynamic programming language that conforms to the ECMAScript specification.</dd>\n  <dt>TypeScript</dt>\n  <dd>A strongly typed superset of JavaScript developed by Microsoft.</dd>\n</dl>',
      expEn: 'HTML permits multiple <dt> elements mapped to a single <dd> for aliases and synonyms.',
      expVi: 'HTML cho phép nhiều thẻ <dt> ánh xạ tới 1 thẻ <dd> duy nhất cho các từ đồng nghĩa.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_5_1',
      type: 'single_choice',
      qEn: 'Which HTML element represents an unordered list with bullet points by default?',
      qVi: 'Phần tử HTML nào đại diện cho danh sách không có thứ tự với dấu đầu dòng mặc định?',
      options: [
        { en: '<ul>', vi: '<ul>' },
        { en: '<ol>', vi: '<ol>' },
        { en: '<dl>', vi: '<dl>' },
        { en: '<list>', vi: '<list>' }
      ],
      ans: 0,
      expEn: '<ul> stands for Unordered List.',
      expVi: '<ul> là viết tắt của Unordered List (danh sách không thứ tự).'
    },
    {
      id: 'html_q_5_2',
      type: 'single_choice',
      qEn: 'What are the only permitted direct child elements inside <ul> and <ol>?',
      qVi: 'Các phần tử con trực tiếp hợp lệ duy nhất bên trong <ul> và <ol> là gì?',
      options: [
        { en: '<li> elements (and <template> / <script>)', vi: 'Các thẻ <li> (cùng <template> / <script>)' },
        { en: '<a> and <button> elements', vi: 'Các thẻ <a> và <button>' },
        { en: '<div> containers', vi: 'Các thẻ <div>' },
        { en: '<p> paragraphs', vi: 'Các đoạn văn <p>' }
      ],
      ans: 0,
      expEn: 'According to W3C HTML specifications, <ul> and <ol> can only directly contain <li> items.',
      expVi: 'Theo chuẩn W3C, <ul> và <ol> chỉ được chứa trực tiếp các thẻ <li>.'
    },
    {
      id: 'html_q_5_3',
      type: 'single_choice',
      qEn: 'What does the <dl> element represent in HTML5?',
      qVi: 'Thẻ <dl> đại diện cho nội dung gì trong HTML5?',
      options: [
        { en: 'A description list consisting of term (<dt>) and description (<dd>) pairs', vi: 'Danh sách mô tả bao gồm các cặp thuật ngữ (<dt>) và diễn giải (<dd>)' },
        { en: 'A downloadable file list', vi: 'Danh sách tệp tin tải xuống' },
        { en: 'A disabled list', vi: 'Danh sách bị vô hiệu hóa' },
        { en: 'A divider line', vi: 'Đường phân cách chia trang' }
      ],
      ans: 0,
      expEn: '<dl> represents a Description List containing <dt> (Definition Term) and <dd> (Definition Description).',
      expVi: '<dl> đại diện cho Description List chứa <dt> (thuật ngữ) và <dd> (mô tả).'
    },
    {
      id: 'html_q_5_4',
      type: 'single_choice',
      qEn: 'Where should a nested sub-list (such as a dropdown menu) be placed in HTML structure?',
      qVi: 'Một danh sách con lồng nhau (như menu thả xuống) nên được đặt ở vị trí nào trong cấu trúc HTML?',
      options: [
        { en: 'Directly inside the parent <li> element', vi: 'Nằm trực tiếp bên trong thẻ <li> cha' },
        { en: 'Directly between two sibling <li> tags inside <ul>', vi: 'Nằm xen giữa hai thẻ <li> ngang hàng trong <ul>' },
        { en: 'Outside the <ul> completely with an id link', vi: 'Nằm bên ngoài hoàn toàn thẻ <ul> và nối qua id' },
        { en: 'Inside a <header> tag above the <ul>', vi: 'Nằm trong thẻ <header> phía trên <ul>' }
      ],
      ans: 0,
      expEn: 'Nested lists MUST be placed inside the parent <li> element.',
      expVi: 'Danh sách lồng nhau BẮT BUỘC phải nằm bên trong thẻ <li> cha.'
    },
    {
      id: 'html_q_5_5',
      type: 'single_choice',
      qEn: 'What does the "reversed" attribute on an <ol> element do?',
      qVi: 'Thuộc tính "reversed" trên thẻ <ol> có tác dụng gì?',
      options: [
        { en: 'Numbers the items in descending order without reversing the DOM source order', vi: 'Đánh số thứ tự các mục theo chiều giảm dần mà không đảo ngược thứ tự mã nguồn DOM' },
        { en: 'Reverses the text direction of each list item from right to left', vi: 'Đảo ngược chiều văn bản từ phải sang trái' },
        { en: 'Hides all list item numbers', vi: 'Ẩn toàn bộ số thứ tự của danh sách' },
        { en: 'Rotates the list upside down on the screen', vi: 'Xoay ngược danh sách 180 độ trên màn hình' }
      ],
      ans: 0,
      expEn: 'reversed counts down sequentially (e.g. 3, 2, 1) while preserving HTML source order.',
      expVi: 'reversed đếm lùi số thứ tự (ví dụ: 3, 2, 1) trong khi vẫn giữ nguyên thứ tự mã HTML.'
    },
    {
      id: 'html_q_5_6',
      type: 'single_choice',
      qEn: 'What attribute allows an <ol> to start numbering at 10 instead of 1?',
      qVi: 'Thuộc tính nào cho phép thẻ <ol> bắt đầu đánh số từ 10 thay vì 1?',
      options: [
        { en: 'start="10"', vi: 'start="10"' },
        { en: 'begin="10"', vi: 'begin="10"' },
        { en: 'index="10"', vi: 'index="10"' },
        { en: 'value="10"', vi: 'value="10"' }
      ],
      ans: 0,
      expEn: 'The start attribute sets the starting number for an ordered list.',
      expVi: 'Thuộc tính start thiết lập giá trị bắt đầu đánh số cho danh sách có thứ tự.'
    },
    {
      id: 'html_q_5_7',
      type: 'single_choice',
      qEn: 'Can an individual <li> in an <ol> override its number using the "value" attribute?',
      qVi: 'Một thẻ <li> riêng lẻ trong <ol> có thể ghi đè số thứ tự bằng thuộc tính "value" không?',
      options: [
        { en: 'Yes, <li value="50"> will set that item number to 50 and continue sequentially from there', vi: 'Có, <li value="50"> sẽ đặt số thứ tự của mục đó thành 50 và tiếp tục đếm tăng dần từ đó' },
        { en: 'No, list numbers can never be changed individually', vi: 'Không, số thứ tự không thể đổi riêng lẻ' },
        { en: 'Only in unordered <ul> lists', vi: 'Chỉ áp dụng trong danh sách không thứ tự <ul>' },
        { en: 'Only if CSS counter-reset is disabled', vi: 'Chỉ khi tắt CSS counter-reset' }
      ],
      ans: 0,
      expEn: 'The value attribute on <li> explicitly sets the ordinal value of that item in an <ol>.',
      expVi: 'Thuộc tính value trên <li> thiết lập trực tiếp giá trị số thứ tự cho mục đó trong thẻ <ol>.'
    },
    {
      id: 'html_q_5_8',
      type: 'single_choice',
      qEn: 'Can a single <dt> term in a <dl> be followed by multiple <dd> descriptions?',
      qVi: 'Một thẻ <dt> trong <dl> có thể đi kèm nhiều thẻ diễn giải <dd> không?',
      options: [
        { en: 'Yes, multiple <dd> tags can describe multiple definitions or nuances of a single <dt>', vi: 'Có, nhiều thẻ <dd> có thể diễn giải nhiều định nghĩa hoặc khía cạnh khác nhau cho cùng 1 <dt>' },
        { en: 'No, exactly one <dd> per <dt> is strictly required', vi: 'Không, bắt buộc 1 <dt> chỉ đi với đúng 1 <dd>' },
        { en: 'Only if wrapped in a <div>', vi: 'Chỉ khi được bọc trong thẻ <div>' },
        { en: 'Only in XML mode', vi: 'Chỉ trong chế độ XML' }
      ],
      ans: 0,
      expEn: 'A single term <dt> can have multiple <dd> definitions (e.g. noun vs verb definitions of a word).',
      expVi: 'Một thuật ngữ <dt> có thể có nhiều định nghĩa <dd> (ví dụ nghĩa danh từ và động từ của một từ).'
    },
    {
      id: 'html_q_5_9',
      type: 'single_choice',
      qEn: 'Can multiple <dt> terms share a single <dd> description?',
      qVi: 'Nhiều thuật ngữ <dt> có thể cùng chia sẻ một thẻ mô tả <dd> duy nhất không?',
      options: [
        { en: 'Yes, this is valid for synonyms and alternate names', vi: 'Có, đây là cú pháp hợp lệ cho các từ đồng nghĩa và tên gọi khác nhau' },
        { en: 'No, every <dt> must immediately have its own unique <dd>', vi: 'Không, mỗi <dt> bắt buộc phải có <dd> riêng ngay sau nó' },
        { en: 'Only with JavaScript polyfills', vi: 'Chỉ khi có thư viện JavaScript polyfill' },
        { en: 'Only if the <dl> has class="multi"', vi: 'Chỉ khi <dl> có class="multi"' }
      ],
      ans: 0,
      expEn: 'Consecutive <dt> tags before a <dd> represent synonyms mapped to that definition.',
      expVi: 'Các thẻ <dt> liên tiếp trước 1 thẻ <dd> biểu thị các từ đồng nghĩa cùng chung định nghĩa.'
    },
    {
      id: 'html_q_5_10',
      type: 'single_choice',
      qEn: 'Is it valid HTML5 to wrap pairs of <dt> and <dd> inside <div> tags directly within a <dl>?',
      qVi: 'Trong HTML5, việc nhóm các cặp <dt> và <dd> bên trong thẻ <div> trực tiếp trong <dl> có hợp lệ không?',
      options: [
        { en: 'Yes, HTML5 explicitly permits <div> containers inside <dl> to group <dt>/<dd> pairs for styling', vi: 'Có, HTML5 cho phép dùng <div> trong <dl> để nhóm các cặp <dt>/<dd> phục vụ định kiểu CSS' },
        { en: 'No, <div> is strictly forbidden inside <dl>', vi: 'Không, <div> tuyệt đối bị cấm trong <dl>' },
        { en: 'Only if the <div> has role="group"', vi: 'Chỉ khi <div> có role="group"' },
        { en: 'Only in HTML4 transitional doctypes', vi: 'Chỉ trong HTML4 transitional' }
      ],
      ans: 0,
      expEn: 'HTML5 specifically allows <div> children directly inside <dl> to facilitate CSS grid and flexbox styling.',
      expVi: 'HTML5 đặc biệt cho phép thẻ <div> trực tiếp trong <dl> để thuận tiện tạo layout CSS Flexbox/Grid.'
    },
    {
      id: 'html_q_5_11',
      type: 'single_choice',
      qEn: 'Which attribute value for <ol type="..."> produces lowercase roman numerals (i, ii, iii)?',
      qVi: 'Giá trị thuộc tính type nào trên <ol type="..."> tạo số La Mã viết thường (i, ii, iii)?',
      options: [
        { en: 'type="i"', vi: 'type="i"' },
        { en: 'type="I"', vi: 'type="I"' },
        { en: 'type="roman"', vi: 'type="roman"' },
        { en: 'type="r"', vi: 'type="r"' }
      ],
      ans: 0,
      expEn: 'type="i" generates lowercase Roman numerals.',
      expVi: 'type="i" tạo ra chuỗi số La Mã viết thường.'
    },
    {
      id: 'html_q_5_12',
      type: 'single_choice',
      qEn: 'Why should navigation links usually be structured as a <ul> inside <nav>?',
      qVi: 'Tại sao các liên kết điều hướng thường nên được cấu trúc dưới dạng <ul> bên trong <nav>?',
      options: [
        { en: 'Screen readers inform visually impaired users of the exact total number of links in the list', vi: 'Trình đọc màn hình thông báo cho người khiếm thị biết chính xác tổng số liên kết có trong danh sách' },
        { en: 'Browsers render them 10x faster than plain <a> tags', vi: 'Trình duyệt hiển thị nhanh hơn 10 lần so với thẻ <a> rời rạc' },
        { en: 'It prevents search engines from indexing the links', vi: 'Nó ngăn máy tìm kiếm thu thập liên kết' },
        { en: 'It automatically adds CSS hover animations', vi: 'Nó tự động thêm hiệu ứng chuyển động CSS khi rê chuột' }
      ],
      ans: 0,
      expEn: 'Assistive tech announces "List, 4 items", helping blind users quickly understand navigation scope.',
      expVi: 'Công nghệ trợ thính sẽ đọc "Danh sách gồm 4 mục", giúp người dùng khiếm thị nắm nhanh cấu trúc menu.'
    },
    {
      id: 'html_q_5_13',
      type: 'single_choice',
      qEn: 'What CSS property removes the default bullet points from a <ul> without altering its semantic accessibility?',
      qVi: 'Thuộc tính CSS nào xóa dấu chấm tròn mặc định của <ul> mà không làm mất tính ngữ nghĩa trợ năng?',
      options: [
        { en: 'list-style: none;', vi: 'list-style: none;' },
        { en: 'bullet: false;', vi: 'bullet: false;' },
        { en: 'display: unlist;', vi: 'display: unlist;' },
        { en: 'text-decoration: none;', vi: 'text-decoration: none;' }
      ],
      ans: 0,
      expEn: 'list-style: none removes bullets visually while preserving semantic list markup in the DOM.',
      expVi: 'list-style: none loại bỏ hình ảnh dấu chấm mà vẫn giữ nguyên cấu trúc danh sách trong DOM.'
    },
    {
      id: 'html_q_5_14',
      type: 'single_choice',
      qEn: 'What is the correct semantic element for a breadcrumb trail?',
      qVi: 'Phần tử ngữ nghĩa chuẩn xác cho thanh điều hướng đường dẫn breadcrumb là gì?',
      options: [
        { en: '<nav aria-label="Breadcrumb"><ol>...</ol></nav>', vi: '<nav aria-label="Breadcrumb"><ol>...</ol></nav>' },
        { en: '<div class="breadcrumb"><p>...</p></div>', vi: '<div class="breadcrumb"><p>...</p></div>' },
        { en: '<footer role="breadcrumb">...</footer>', vi: '<footer role="breadcrumb">...</footer>' },
        { en: '<section id="trail">...</section>', vi: '<section id="trail">...</section>' }
      ],
      ans: 0,
      expEn: 'Breadcrumbs represent a sequential ordered path, best modeled with <nav aria-label="Breadcrumb"> wrapping an <ol>.',
      expVi: 'Breadcrumb biểu thị đường dẫn tuần tự từng bước, chuẩn nhất là dùng <nav aria-label="Breadcrumb"> bao bọc <ol>.'
    },
    {
      id: 'html_q_5_15',
      type: 'single_choice',
      qEn: 'Can an <li> contain complex block elements like <h3>, <p>, <img>, and <form>?',
      qVi: 'Một thẻ <li> có thể chứa các phần tử khối phức tạp như <h3>, <p>, <img>, và <form> không?',
      options: [
        { en: 'Yes, <li> has flow content model and can contain almost any valid HTML body elements', vi: 'Có, <li> có mô hình flow content và có thể chứa hầu hết các thẻ HTML hợp lệ khác' },
        { en: 'No, <li> can only contain plain text strings', vi: 'Không, <li> chỉ được phép chứa văn bản thuần' },
        { en: 'Only inline elements like <span> and <a> are permitted', vi: 'Chỉ các phần tử nội dòng như <span> và <a> mới được phép' },
        { en: 'Only if the parent list is an <ol>', vi: 'Chỉ khi danh sách cha là <ol>' }
      ],
      ans: 0,
      expEn: '<li> accepts flow content, allowing full card layouts, images, and buttons inside each list item.',
      expVi: '<li> chấp nhận flow content, cho phép đặt trọn vẹn thẻ bài viết card, hình ảnh và nút bấm bên trong.'
    },
    {
      id: 'html_q_5_16',
      type: 'single_choice',
      qEn: 'What is the semantic difference between <ul> and <ol>?',
      qVi: 'Sự khác biệt về mặt ngữ nghĩa giữa <ul> và <ol> là gì?',
      options: [
        { en: '<ol> indicates that the sequence order is meaningful and important, while in <ul> the order does not change the meaning', vi: '<ol> thể hiện thứ tự các mục mang ý nghĩa quan trọng, còn trong <ul> thứ tự không làm thay đổi bản chất nội dung' },
        { en: '<ul> is only for text, <ol> is only for numbers', vi: '<ul> chỉ dành cho chữ, <ol> chỉ dành cho số' },
        { en: '<ol> requires JavaScript to render in browsers', vi: '<ol> cần JavaScript mới chạy được trên trình duyệt' },
        { en: '<ul> is deprecated in HTML5', vi: '<ul> đã bị xóa bỏ trong HTML5' }
      ],
      ans: 0,
      expEn: 'Use <ol> when changing the order would change the meaning (e.g. recipe steps, leaderboards).',
      expVi: 'Dùng <ol> khi việc thay đổi thứ tự sẽ làm đổi ý nghĩa (như các bước nấu ăn, bảng xếp hạng).'
    }
  ]
};

console.log('Lesson 5 defined.');
