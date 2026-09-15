import { RawLessonSource } from './rawLessonType';

export const lesson19: RawLessonSource = {
  order: 19,
  id: 'html_lesson_19',
  moduleId: 'html_mod_6',
  levelId: 'advanced',
  topicId: 'html_keyboard_focus_management',
  titleEn: 'Keyboard Navigation, Focus Trapping, Skip Links & The inert Attribute',
  titleVi: 'Điều Hướng Bàn Phím, Bẫy Tiêu Điểm, Liên Kết Nhảy & Thuộc Tính inert',
  summaryEn: 'Master mission-critical keyboard navigation: tabindex mechanics (0, -1, anti-pattern positive tabindex), skip-to-main-content landmark links, visible focus indicators (:focus-visible), modal focus trapping, and the revolutionary HTML5 inert boolean attribute for background content isolation.',
  summaryVi: 'Làm chủ điều hướng bàn phím tối quan trọng: cơ chế tabindex (0, -1, chống lỗi tabindex dương), liên kết nhảy tới nội dung chính (skip link), chỉ báo tiêu điểm rõ ràng (:focus-visible), bẫy focus trong modal và thuộc tính boolean inert hiện đại để cô lập nội dung nền.',
  estimatedMinutes: 15,
  introEn: 'Millions of users navigate the web exclusively using hardware keyboards, switch devices, head pointers, or eye-tracking interfaces without a mouse.',
  introVi: 'Hàng triệu người dùng điều hướng web hoàn toàn bằng bàn phím phần cứng, thiết bị chuyển mạch cơ học hoặc cảm biến theo dõi ánh mắt mà không hề dùng chuột.',
  conceptEn: 'HTML elements fall into three focus categories: (1) Naturally interactive (<a>, <button>, <input>, <select>) are focusable in source order. (2) tabindex="0" adds non-interactive elements (custom controls) into sequential keyboard tab navigation in DOM order. (3) tabindex="-1" makes an element programmatically focusable via element.focus() without placing it in the Tab key sequence. NEVER use positive tabindex (e.g. tabindex="3") as it destroys natural document flow. The inert boolean attribute removes entire DOM subtrees from focus, selection, and accessibility trees.',
  conceptVi: 'Các phần tử HTML chia làm 3 nhóm focus: (1) Phần tử tương tác tự nhiên (<a>, <button>, <input>, <select>) tự động nhận phím Tab theo thứ tự mã nguồn. (2) tabindex="0" đưa phần tử tùy chỉnh vào luồng phím Tab theo thứ tự DOM. (3) tabindex="-1" cho phép đặt tiêu điểm bằng lệnh element.focus() trong JS mà không lọt vào chu kỳ phím Tab thông thường. TUYỆT ĐỐI KHÔNG dùng tabindex dương (như tabindex="3") vì làm đảo lộn luồng đọc. Thuộc tính boolean inert cô lập hoàn toàn nhánh DOM khỏi bàn phím, con trỏ và trình đọc màn hình.',
  syntax: '<!-- 1. Skip to Main Content Link (First focusable element in <body>) -->\n<a href="#main-content" class="skip-link">Skip to Main Content</a>\n\n<!-- 2. Main Content Target with tabindex="-1" -->\n<main id="main-content" tabindex="-1">\n  <h1>Dashboard Overview</h1>\n</main>\n\n<!-- 3. Isolating Background Content with inert -->\n<div id="app-container" inert>\n  <!-- All inputs, buttons and text here are completely unreachable while modal is active -->\n</div>',
  ex1TitleEn: 'Accessible Skip-to-Content Link Architecture',
  ex1TitleVi: 'Kiến Trúc Liên Kết Bỏ Qua Điều Hướng (Skip Link) Chuẩn Trợ Năng',
  ex1Code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Skip Link Pattern</title>\n  <style>\n    /* Hidden off-screen until focused via Tab key */\n    .skip-link {\n      position: absolute;\n      top: -100px;\n      left: 16px;\n      background: #0f172a;\n      color: #38bdf8;\n      padding: 12px 20px;\n      font-weight: bold;\n      text-decoration: none;\n      border-radius: 6px;\n      z-index: 9999;\n      transition: top 0.2s ease;\n    }\n    .skip-link:focus {\n      top: 16px;\n    }\n  </style>\n</head>\n<body>\n  <!-- Very first element inside <body> -->\n  <a href="#main-content" class="skip-link">Skip to Main Content</a>\n\n  <header>\n    <nav aria-label="Main Navigation">\n      <a href="/">Home</a>\n      <a href="/products">Products</a>\n      <a href="/pricing">Pricing</a>\n      <a href="/contact">Contact</a>\n    </nav>\n  </header>\n\n  <main id="main-content" tabindex="-1">\n    <h1>Production Cloud Dashboard</h1>\n    <p>Welcome to your mission-critical management interface.</p>\n  </main>\n</body>\n</html>',
  ex1ExpEn: 'Allows keyboard and screen reader users to bypass repetitive navigation bars and jump directly to page content.',
  ex1ExpVi: 'Cho phép người dùng bàn phím và trợ thính bỏ qua thanh menu dài dòng để nhảy thẳng tới nội dung chính của trang.',
  ex2TitleEn: 'Isolating Inactive Background Layers using the Native HTML "inert" Attribute',
  ex2TitleVi: 'Cô Lập Lớp Giao Diện Nền Không Hoạt Động Bằng Thuộc Tính Gốc inert',
  ex2Code: '<!-- When the modal overlay is active, mark the rest of the application as inert -->\n<div id="main-app-content" inert>\n  <header>\n    <button>Search</button>\n    <a href="/profile">Profile</a>\n  </header>\n  <main>\n    <input type="text" placeholder="Search data...">\n    <button>Export CSV</button>\n  </main>\n</div>\n\n<!-- Active modal dialog remains fully interactive -->\n<div role="dialog" aria-modal="true" aria-labelledby="dialog-title" class="modal-box">\n  <h3 id="dialog-title">Confirm Database Purge</h3>\n  <p>This action cannot be undone.</p>\n  <button type="button">Cancel</button>\n  <button type="button" class="btn-danger">Confirm Purge</button>\n</div>',
  ex2ExpEn: 'inert natively prevents clicks, text selection, keyboard tab stops, and screen reader traversal inside the container.',
  ex2ExpVi: 'inert chặn hoàn toàn click chuột, bôi đen chữ, điểm dừng phím Tab và không cho trình đọc màn hình đọc nội dung bên trong.',
  mistake1En: 'Using positive tabindex values like tabindex="1", tabindex="2", or tabindex="5"',
  mistake1Vi: 'Dùng các giá trị tabindex dương như tabindex="1", tabindex="2", hoặc tabindex="5"',
  correction1En: 'Positive tabindex forces artificial focus order before any natural elements, breaking the expected reading sequence. Use only tabindex="0" (to add to flow) or tabindex="-1" (for programmatic JS focus).',
  correction1Vi: 'tabindex dương làm nhảy thứ tự phím Tab bất thường phá vỡ luồng đọc tự nhiên. Chỉ dùng tabindex="0" (thêm vào luồng) hoặc tabindex="-1" (nhận focus bằng JS).',
  mistake2En: 'Removing CSS focus outlines with outline:none or outline:0 without providing a high-contrast replacement',
  mistake2Vi: 'Tắt viền focus bằng outline:none hoặc outline:0 trong CSS mà không làm viền thay thế rõ nét',
  correction2En: 'Stripping focus indicators blinds keyboard users, making it impossible to know which element is currently active. Always maintain visible :focus-visible rings.',
  correction2Vi: 'Tắt viền focus làm người dùng bàn phím bị "mù", không biết mình đang ở nút bấm nào. Luôn giữ viền :focus-visible nổi bật.',
  tipEn: 'When opening custom non-native modal overlays, place the inert attribute on the surrounding #root / main container to create an impenetrable focus trap with 1 line of HTML/JS.',
  tipVi: 'Khi mở modal tùy chỉnh, hãy gán thuộc tính inert lên khung #root hoặc main bao quanh để tạo bẫy focus hoàn hảo chỉ với 1 dòng HTML/JS.',
  practiceTaskEn: 'Implement an Accessible Skip Link & Main Landmark Target',
  practiceTaskVi: 'Xây dựng liên kết nhảy bỏ qua menu và vùng đích main landmark',
  practiceInstEn: 'Create an <a href="#main-content" class="skip-link">Skip to Main Content</a> followed by a <main id="main-content" tabindex="-1"><h1>Main Title</h1></main>.',
  practiceInstVi: 'Tạo thẻ <a href="#main-content" class="skip-link">Skip to Main Content</a> theo sau bởi thẻ <main id="main-content" tabindex="-1"><h1>Main Title</h1></main>.',
  practiceStarter: '<body>\n  \n</body>',
  practiceSolution: '<body>\n  <a href="#main-content" class="skip-link">Skip to Main Content</a>\n  <main id="main-content" tabindex="-1">\n    <h1>Main Title</h1>\n  </main>\n</body>',
  practicePatterns: ['<a href="#main-content" class="skip-link">Skip to Main Content</a>', '<main id="main-content" tabindex="-1">', '<h1>Main Title</h1>', '</main>'],
  practiceHintEn: 'Link the skip link href to the main element id and add tabindex="-1" to main.',
  practiceHintVi: 'Liên kết href của skip link với id của thẻ main và thêm tabindex="-1" vào main.',

  exercises: [
    {
      id: 'html_ex_19_1',
      type: 'complete_code',
      titleEn: 'Add tabindex="0" to Custom Interactive Badge',
      titleVi: 'Thêm tabindex="0" vào huy hiệu tương tác tùy chỉnh',
      instEn: 'Add tabindex="0" and role="button" to the clickable tag <span>.',
      instVi: 'Thêm tabindex="0" và role="button" vào thẻ <span> có thể click.',
      starter: '<span class="filter-tag">Technology</span>',
      solution: '<span class="filter-tag" role="button" tabindex="0">Technology</span>',
      hintEn: 'Add role="button" and tabindex="0".',
      hintVi: 'Thêm role="button" và tabindex="0".',
      expEn: 'tabindex="0" allows non-interactive elements to receive sequential keyboard focus in DOM order.',
      expVi: 'tabindex="0" cho phép phần tử tùy biến nhận phím Tab theo thứ tự tự nhiên của cây DOM.'
    },
    {
      id: 'html_ex_19_2',
      type: 'fix_code',
      titleEn: 'Eliminate Harmful Positive tabindex Anti-Pattern',
      titleVi: 'Loại bỏ lỗi nguy hại dùng tabindex dương',
      instEn: 'Fix the search input by removing harmful positive tabindex="4" and using standard tabindex="0" (or omitting it).',
      instVi: 'Sửa ô tìm kiếm bằng cách bỏ thuộc tính tabindex="4" độc hại và thay bằng tabindex="0".',
      starter: '<input type="search" placeholder="Search..." tabindex="4">',
      solution: '<input type="search" placeholder="Search..." tabindex="0">',
      hintEn: 'Replace tabindex="4" with tabindex="0".',
      hintVi: 'Thay tabindex="4" bằng tabindex="0".',
      expEn: 'Positive tabindex values distort standard keyboard navigation order and are strictly banned in WCAG AA.',
      expVi: 'tabindex dương làm méo mó thứ tự điều hướng bàn phím và bị nghiêm cấm trong tiêu chuẩn WCAG AA.'
    },
    {
      id: 'html_ex_19_3',
      type: 'write_code',
      titleEn: 'Isolate Inactive Page Subtree with inert Attribute',
      titleVi: 'Cô lập nhánh trang không hoạt động bằng thuộc tính inert',
      instEn: 'Write a <div id="page-wrapper" inert> containing a <button>Background Action</button>.',
      instVi: 'Viết thẻ <div id="page-wrapper" inert> chứa <button>Background Action</button>.',
      starter: '',
      solution: '<div id="page-wrapper" inert>\n  <button>Background Action</button>\n</div>',
      hintEn: 'Add the boolean inert attribute to the div container.',
      hintVi: 'Thêm thuộc tính boolean inert vào thẻ div bao bọc.'
    },
    {
      id: 'html_ex_19_4',
      type: 'modify_example',
      titleEn: 'Make Main Content Landmark Programmatically Focusable',
      titleVi: 'Giúp vùng nội dung chính main nhận focus qua JavaScript',
      instEn: 'Add tabindex="-1" to the <main id="content"> tag.',
      instVi: 'Thêm tabindex="-1" vào thẻ <main id="content">.',
      starter: '<main id="content">\n  <h1>Documentation</h1>\n</main>',
      solution: '<main id="content" tabindex="-1">\n  <h1>Documentation</h1>\n</main>',
      hintEn: 'Add tabindex="-1" to the main element.',
      hintVi: 'Thêm tabindex="-1" vào phần tử main.',
      expEn: 'tabindex="-1" allows elements to receive focus via skip links or JavaScript element.focus() without Tab stop clutter.',
      expVi: 'tabindex="-1" cho phép phần tử nhận tiêu điểm qua skip link hoặc JS mà không làm rối phím Tab.'
    },
    {
      id: 'html_ex_19_5',
      type: 'predict_output',
      titleEn: 'Predict Focusability of Elements Inside an "inert" Container',
      titleVi: 'Dự đoán khả năng nhận focus của các phần tử trong khung inert',
      instEn: 'If a <button> is inside a <div inert>, can a user focus it using the Tab key (yes/no)?',
      instVi: 'Nếu một thẻ <button> nằm bên trong <div inert>, người dùng có thể dùng phím Tab để nhảy vào nó không (yes/no)?',
      starter: '<!-- Type yes or no -->\n<p>Focusable: </p>',
      solution: '<p>Focusable: no</p>',
      hintEn: 'inert completely removes all descendant elements from keyboard focus and accessibility trees.',
      hintVi: 'inert vô hiệu hóa hoàn toàn mọi phần tử con bên trong khỏi bàn phím và cây trợ năng.'
    }
  ],

  challenge: {
    id: 'html_ch_19',
    titleEn: 'Enterprise Complete Keyboard-First Application Architecture',
    titleVi: 'Kiến trúc ứng dụng doanh nghiệp định hướng bàn phím toàn diện',
    descEn: 'Build a production-grade keyboard-accessible enterprise page featuring a skip link, main landmark target, and background isolation with inert.',
    descVi: 'Xây dựng trang ứng dụng doanh nghiệp đạt chuẩn điều hướng bàn phím tuyệt đối gồm skip link, đích đến main landmark và cô lập nền bằng inert.',
    requirements: [
      { en: 'Skip Link: <a href="#main-content" class="skip-link">Skip to main content</a> as the very first body child', vi: 'Skip link là phần tử đầu tiên của body' },
      { en: 'Application wrapper <div id="app-root" inert> containing header, navigation, and sidebar buttons', vi: 'Khung ứng dụng <div id="app-root" inert> chứa menu và các nút' },
      { en: 'Main landmark: <main id="main-content" tabindex="-1">', vi: 'Thẻ main có id="main-content" và tabindex="-1"' },
      { en: 'Active Modal Dialog: <div role="dialog" aria-modal="true" aria-labelledby="dialog-title"> with action buttons', vi: 'Hộp thoại modal kích hoạt có role="dialog", aria-modal="true"' }
    ],
    starter: '<body>\n  <!-- Build keyboard-accessible page architecture here -->\n</body>',
    solution: '<body>\n  <!-- 1. Accessible Skip Link -->\n  <a href="#main-content" class="skip-link">Skip to main content</a>\n\n  <!-- 2. Application Root (Marked inert during modal activity) -->\n  <div id="app-root" inert>\n    <header>\n      <nav aria-label="Global Navigation">\n        <a href="/">Dashboard</a>\n        <a href="/deployments">Deployments</a>\n        <a href="/billing">Billing</a>\n      </nav>\n    </header>\n    \n    <main id="main-content" tabindex="-1">\n      <h1>Cluster Operations Console</h1>\n      <p>Manage distributed Kubernetes cluster workloads.</p>\n      <button type="button">Deploy New Node</button>\n    </main>\n  </div>\n\n  <!-- 3. Active Isolated Modal Dialog -->\n  <div role="dialog" aria-modal="true" aria-labelledby="dialog-title" class="modal-overlay">\n    <div class="modal-card">\n      <h2 id="dialog-title">Confirm Cluster Decommission</h2>\n      <p>Are you sure you want to terminate 16 active worker nodes?</p>\n      <div class="actions">\n        <button type="button">Cancel</button>\n        <button type="button" class="btn-danger">Terminate Nodes</button>\n      </div>\n    </div>\n  </div>\n</body>',
    hints: [
      { en: 'Place the skip link as the very first focusable element inside <body>', vi: 'Đặt skip link là phần tử nhận focus đầu tiên trong <body>' },
      { en: 'Add tabindex="-1" to <main id="main-content"> so keyboard focus moves properly upon skip link click', vi: 'Thêm tabindex="-1" vào <main id="main-content"> để chuyển tiêu điểm khi click skip link' }
    ],
    expEn: 'State-of-the-art keyboard accessibility and modal focus containment using modern W3C standards.',
    expVi: 'Hiện thực hóa chuẩn mực điều hướng bàn phím tối tân và cô lập bẫy focus modal theo tiêu chuẩn W3C.'
  },

  challengeVariants: [
    {
      id: 'html_ch_19_v1',
      titleEn: 'Variant 1: Roving Tabindex Data Table Toolbar Widget',
      titleVi: 'Biến thể 1: Thanh công cụ bảng dữ liệu sử dụng Roving Tabindex',
      descEn: 'Build a toolbar with role="toolbar" where the primary button has tabindex="0" and secondary buttons have tabindex="-1".',
      descVi: 'Xây dựng thanh công cụ role="toolbar" có nút chính mang tabindex="0" và các nút phụ mang tabindex="-1".',
      requirements: [
        { en: '<div role="toolbar" aria-label="Editor Formatting">', vi: '<div role="toolbar" aria-label="Editor Formatting">' },
        { en: '<button type="button" tabindex="0">Bold</button>', vi: '<button type="button" tabindex="0">Bold</button>' },
        { en: '<button type="button" tabindex="-1">Italic</button>', vi: '<button type="button" tabindex="-1">Italic</button>' }
      ],
      starter: '<div role="toolbar">\n  \n</div>',
      solution: '<div role="toolbar" aria-label="Editor Formatting" class="toolbar-box">\n  <button type="button" tabindex="0" aria-label="Bold text">Bold</button>\n  <button type="button" tabindex="-1" aria-label="Italicize text">Italic</button>\n  <button type="button" tabindex="-1" aria-label="Underline text">Underline</button>\n</div>',
      expEn: 'The roving tabindex pattern enables users to tab past the entire toolbar in 1 keystroke and use arrow keys to browse tools.',
      expVi: 'Mẫu roving tabindex giúp người dùng chỉ cần 1 phím Tab để nhảy qua toàn bộ thanh công cụ và dùng phím mũi tên để chọn công cụ con.'
    },
    {
      id: 'html_ch_19_v2',
      titleEn: 'Variant 2: Dual Skip Links for Main Content and Secondary Navigation',
      titleVi: 'Biến thể 2: Cặp đôi Skip Links cho nội dung chính và menu phụ',
      descEn: 'Build a top utility bar with two skip links: one to #main-content and one to #sub-navigation.',
      descVi: 'Xây dựng thanh tiện ích đầu trang với 2 skip link: một tới #main-content và một tới #sub-navigation.',
      requirements: [
        { en: '<a href="#main-content" class="skip-link">Skip to main content</a>', vi: '<a href="#main-content" class="skip-link">Skip to main content</a>' },
        { en: '<a href="#sub-nav" class="skip-link">Skip to sidebar navigation</a>', vi: '<a href="#sub-nav" class="skip-link">Skip to sidebar navigation</a>' }
      ],
      starter: '<nav class="skip-links">\n  \n</nav>',
      solution: '<nav class="skip-links" aria-label="Accessibility Navigation Shortcuts">\n  <a href="#main-content" class="skip-link">Skip to main content</a>\n  <a href="#sub-nav" class="skip-link">Skip to sidebar navigation</a>\n</nav>',
      expEn: 'Dual skip links empower power users to jump directly to both main editorial content and contextual documentation sidebars.',
      expVi: 'Cặp skip link giúp người dùng chuyển nhanh đến cả bài viết chính lẫn thanh menu tài liệu bên cạnh.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_19_1',
      type: 'single_choice',
      qEn: 'What is the purpose of a "Skip to Main Content" link in web architecture?',
      qVi: 'Mục đích của liên kết "Skip to Main Content" (Nhảy tới nội dung chính) là gì?',
      options: [
        { en: 'Allows keyboard and screen reader users to bypass repetitive header navigation links and jump directly to the primary page content with 1 keystroke', vi: 'Cho phép người dùng bàn phím và trợ thính bỏ qua các thanh menu đầu trang lặp lại để nhảy thẳng vào nội dung chính chỉ bằng 1 lần nhấn phím' },
        { en: 'Skips video advertisements automatically', vi: 'Tự động bỏ qua quảng cáo video' },
        { en: 'Fast-forwards audio tracks', vi: 'Tua nhanh bài nhạc' },
        { en: 'Deletes the header from the server', vi: 'Xóa phần đầu trang khỏi máy chủ' }
      ],
      ans: 0,
      expEn: 'Skip links are a mandatory WCAG 2.1 Level A requirement (Bypass Blocks - Success Criterion 2.4.1).',
      expVi: 'Skip link là yêu cầu bắt buộc theo tiêu chuẩn WCAG 2.1 Cấp độ A (Tiêu chí 2.4.1 Bỏ qua các khối lặp lại).'
    },
    {
      id: 'html_q_19_2',
      type: 'single_choice',
      qEn: 'Where should the Skip Link be placed in the HTML document structure?',
      qVi: 'Liên kết Skip Link nên được đặt ở vị trí nào trong cấu trúc tài liệu HTML?',
      options: [
        { en: 'As the very first focusable element immediately inside the opening <body> tag', vi: 'Là phần tử nhận focus đầu tiên ngay sau thẻ mở <body>' },
        { en: 'At the bottom of the <footer>', vi: 'Ở dưới cùng của thẻ <footer>' },
        { en: 'Inside the <head> tag', vi: 'Bên trong thẻ <head>' },
        { en: 'Inside an iframe', vi: 'Bên trong một thẻ iframe' }
      ],
      ans: 0,
      expEn: 'Placing the skip link first ensures it is the immediate first Tab stop for keyboard users.',
      expVi: 'Đặt skip link ở đầu tiên đảm bảo nó là điểm dừng phím Tab đầu tiên ngay khi tải trang.'
    },
    {
      id: 'html_q_19_3',
      type: 'single_choice',
      qEn: 'What does tabindex="0" do on an HTML element?',
      qVi: 'Thuộc tính tabindex="0" làm gì trên một phần tử HTML?',
      options: [
        { en: 'Inserts the element into the natural sequential keyboard Tab navigation order according to its relative position in the DOM', vi: 'Đưa phần tử vào luồng điều hướng phím Tab tuần tự tự nhiên dựa theo vị trí của nó trong cây DOM' },
        { en: 'Removes the element from keyboard focus entirely', vi: 'Xóa hoàn toàn phần tử khỏi bàn phím' },
        { en: 'Forces the element to be focused first before all other elements', vi: 'Ép phần tử phải nhận focus đầu tiên trước mọi thẻ khác' },
        { en: 'Sets the font size to 0px', vi: 'Đặt cỡ chữ thành 0px' }
      ],
      ans: 0,
      expEn: 'tabindex="0" makes non-interactive elements (custom widgets) keyboard accessible in natural order.',
      expVi: 'tabindex="0" giúp các thành phần tùy biến nhận tiêu điểm bàn phím theo đúng thứ tự DOM.'
    },
    {
      id: 'html_q_19_4',
      type: 'single_choice',
      qEn: 'What does tabindex="-1" do on an HTML element?',
      qVi: 'Thuộc tính tabindex="-1" làm gì trên một phần tử HTML?',
      options: [
        { en: 'Removes the element from sequential Tab key order, but allows it to be focused programmatically via JavaScript (element.focus()) or anchor links', vi: 'Đưa phần tử ra khỏi chu trình phím Tab thông thường, nhưng cho phép nhận tiêu điểm qua JavaScript (element.focus()) hoặc liên kết thẻ a' },
        { en: 'Deletes the element from the DOM tree', vi: 'Xóa phần tử khỏi cây DOM' },
        { en: 'Makes text backwards', vi: 'Làm chữ bị viết ngược' },
        { en: 'Disables the user\'s mouse', vi: 'Vô hiệu hóa chuột của người dùng' }
      ],
      ans: 0,
      expEn: 'tabindex="-1" is essential for programmatic focus targets like modals, dropdowns, and skip targets.',
      expVi: 'tabindex="-1" rất quan trọng cho các đích đến focus bằng lập trình như modal, menu xổ xuống và skip link.'
    },
    {
      id: 'html_q_19_5',
      type: 'single_choice',
      qEn: 'Why are positive tabindex values (e.g. tabindex="1", tabindex="3") considered a severe anti-pattern?',
      qVi: 'Tại sao các giá trị tabindex dương (như tabindex="1", tabindex="3") lại bị coi là lỗi lập trình nghiêm trọng (anti-pattern)?',
      options: [
        { en: 'They override and scramble the natural document reading flow, creating unpredictable jumping behavior for keyboard and screen reader users', vi: 'Chúng ghi đè và làm đảo lộn luồng đọc tự nhiên của tài liệu, gây ra hiện tượng nhảy cóc mất kiểm soát cho người dùng bàn phím' },
        { en: 'They cause the web server to crash', vi: 'Chúng làm sập máy chủ web' },
        { en: 'They are only supported on Windows 95', vi: 'Chúng chỉ chạy được trên Windows 95' },
        { en: 'They turn all text into numbers', vi: 'Chúng biến toàn bộ chữ thành số' }
      ],
      ans: 0,
      expEn: 'Positive tabindex values are explicitly prohibited in enterprise accessibility guidelines.',
      expVi: 'tabindex dương bị nghiêm cấm trong các quy chuẩn trợ năng doanh nghiệp WCAG.'
    },
    {
      id: 'html_q_19_6',
      type: 'single_choice',
      qEn: 'What does the native HTML5 boolean attribute "inert" do when placed on a container element (<div inert>)?',
      qVi: 'Thuộc tính boolean "inert" trong HTML5 làm gì khi được gắn lên thẻ khung (<div inert>)?',
      options: [
        { en: 'Completely disables all user interaction (clicks, focus, text selection) and hides all descendant elements from assistive technology accessibility trees', vi: 'Vô hiệu hóa hoàn toàn mọi tương tác (click, focus, bôi đen) và ẩn toàn bộ các phần tử con bên trong khỏi cây trợ năng' },
        { en: 'Applies a black and white filter in CSS', vi: 'Áp dụng bộ lọc màu đen trắng trong CSS' },
        { en: 'Reloads the webpage every 5 seconds', vi: 'Tải lại trang web mỗi 5 giây' },
        { en: 'Converts HTML into XML', vi: 'Chuyển HTML thành XML' }
      ],
      ans: 0,
      expEn: 'inert is the standardized native solution for modal background isolation and focus containment.',
      expVi: 'inert là giải pháp chuẩn gốc giúp cô lập giao diện nền và khóa tiêu điểm trong modal.'
    },
    {
      id: 'html_q_19_7',
      type: 'single_choice',
      qEn: 'Why should developers NEVER remove focus outlines with "outline: none" without providing a clear visual alternative?',
      qVi: 'Tại sao lập trình viên TUYỆT ĐỐI KHÔNG NÊN xóa viền focus bằng "outline: none" mà không tạo viền thay thế rõ ràng?',
      options: [
        { en: 'It makes it completely impossible for keyboard-only users to see which button, link, or input currently has focus', vi: 'Nó làm cho người dùng điều hướng bằng bàn phím hoàn toàn không thể nhìn thấy nút, liên kết hoặc ô nhập nào đang nhận tiêu điểm' },
        { en: 'It is a syntax error in CSS', vi: 'Đó là lỗi cú pháp trong CSS' },
        { en: 'It makes text unreadable in dark mode', vi: 'Nó làm chữ không đọc được trong dark mode' },
        { en: 'It deletes the element on click', vi: 'Nó xóa phần tử khi click' }
      ],
      ans: 0,
      expEn: 'Visible focus indicators are required by WCAG 2.4.7 (Focus Visible - Level AA).',
      expVi: 'Chỉ báo tiêu điểm nhìn thấy được là bắt buộc theo WCAG 2.4.7 (Cấp độ AA).'
    },
    {
      id: 'html_q_19_8',
      type: 'single_choice',
      qEn: 'What modern CSS pseudo-class displays a focus ring ONLY when an element is focused via keyboard (Tab key) and NOT via mouse click?',
      qVi: 'CSS pseudo-class hiện đại nào CHỈ hiển thị viền focus khi phần tử được chọn qua bàn phím (phím Tab) và KHÔNG hiện khi click chuột?',
      options: [
        { en: ':focus-visible', vi: ':focus-visible' },
        { en: ':focus-within', vi: ':focus-within' },
        { en: ':focus-keyboard', vi: ':focus-keyboard' },
        { en: ':active-ring', vi: ':active-ring' }
      ],
      ans: 0,
      expEn: ':focus-visible satisfies accessibility requirements without annoying mouse users with unwanted focus outlines.',
      expVi: ':focus-visible đáp ứng chuẩn trợ năng mà không gây khó chịu cho người dùng chuột bằng các đường viền thừa.'
    },
    {
      id: 'html_q_19_9',
      type: 'single_choice',
      qEn: 'What is "Focus Trapping" in the context of modal dialog accessibility?',
      qVi: '"Bẫy Tiêu Điểm" (Focus Trapping) có ý nghĩa gì trong trợ năng của hộp thoại modal?',
      options: [
        { en: 'Confining Tab and Shift+Tab keyboard focus strictly inside the open modal window so the user cannot accidentally tab into hidden background controls', vi: 'Giới hạn phím Tab và Shift+Tab chỉ di chuyển bên trong cửa sổ modal đang mở để người dùng không vô tình nhảy ra các nút ở trang nền phía sau' },
        { en: 'A security exploit that steals user passwords', vi: 'Một mã độc tấn công đánh cắp mật khẩu' },
        { en: 'A game where users trap bouncing balls', vi: 'Một trò chơi bẫy bóng nảy' },
        { en: 'A CSS property that locks the scrollbar', vi: 'Một thuộc tính CSS khóa thanh cuộn' }
      ],
      ans: 0,
      expEn: 'Focus trapping prevents keyboard users from getting lost in background layers behind active modals.',
      expVi: 'Bẫy tiêu điểm ngăn người dùng bàn phím bị lạc vào các lớp nền phía sau modal.'
    },
    {
      id: 'html_q_19_10',
      type: 'single_choice',
      qEn: 'Why should you add tabindex="-1" to <main id="main-content"> when targeting it with a Skip Link?',
      qVi: 'Tại sao bạn nên thêm tabindex="-1" vào thẻ <main id="main-content"> khi làm đích đến cho Skip Link?',
      options: [
        { en: 'To ensure older browsers and screen readers actually move programmatic keyboard focus to the landmark container upon link click', vi: 'Để đảm bảo các trình duyệt và trình đọc màn hình thực sự chuyển tiêu điểm bàn phím tới khung nội dung khi click link' },
        { en: 'To hide the main content', vi: 'Để ẩn nội dung chính' },
        { en: 'To change the background color to grey', vi: 'Để đổi màu nền sang xám' },
        { en: 'To disable scrolling on main', vi: 'Để tắt tính năng cuộn trên thẻ main' }
      ],
      ans: 0,
      expEn: 'tabindex="-1" guarantees reliable programmatic focus transfer across all browser engines.',
      expVi: 'tabindex="-1" đảm bảo việc chuyển tiêu điểm bằng liên kết diễn ra mượt mà và chuẩn xác trên mọi trình duyệt.'
    },
    {
      id: 'html_q_19_11',
      type: 'single_choice',
      qEn: 'What keyboard shortcut natively moves focus BACKWARDS to the previous focusable element?',
      qVi: 'Phím tắt nào trên bàn phím di chuyển tiêu điểm NGƯỢC LẠI về phần tử focus liền trước?',
      options: [
        { en: 'Shift + Tab', vi: 'Shift + Tab' },
        { en: 'Ctrl + Backspace', vi: 'Ctrl + Backspace' },
        { en: 'Alt + Arrow Left', vi: 'Alt + Mũi tên Trái' },
        { en: 'Escape + Tab', vi: 'Escape + Tab' }
      ],
      ans: 0,
      expEn: 'Shift+Tab is the universal shortcut for reverse sequential keyboard navigation.',
      expVi: 'Shift+Tab là phím tắt phổ quát để lùi lại phần tử trước trong điều hướng bàn phím.'
    },
    {
      id: 'html_q_19_12',
      type: 'single_choice',
      qEn: 'When a modal dialog is closed, where should keyboard focus be restored?',
      qVi: 'Khi một hộp thoại modal bị đóng lại, tiêu điểm bàn phím nên được trả về vị trí nào?',
      options: [
        { en: 'Back to the original button or element that initially triggered and opened the modal', vi: 'Trả về đúng nút bấm ban đầu đã kích hoạt và mở modal đó' },
        { en: 'To the top of the <body> tag', vi: 'Lên đầu thẻ <body>' },
        { en: 'To the search bar in the footer', vi: 'Về ô tìm kiếm ở chân trang' },
        { en: 'To the browser URL address bar', vi: 'Về thanh địa chỉ trình duyệt' }
      ],
      ans: 0,
      expEn: 'Focus restoration preserves the user\'s mental model and spatial orientation in the application.',
      expVi: 'Khôi phục tiêu điểm giúp duy trì định hướng không gian và dòng suy nghĩ của người dùng trong ứng dụng.'
    },
    {
      id: 'html_q_19_13',
      type: 'single_choice',
      qEn: 'What does the CSS selector ":focus-within" match?',
      qVi: 'Bộ chọn CSS ":focus-within" sẽ khớp với phần tử nào?',
      options: [
        { en: 'Matches a container element if ANY of its child descendants currently has keyboard or click focus (ideal for styling active form fieldsets or nav dropdowns)', vi: 'Khớp với phần tử cha nếu BẤT KỲ phần tử con nào bên trong nó đang nhận tiêu điểm (rất lý tưởng để định kiểu cho khung form hoặc menu xổ xuống đang mở)' },
        { en: 'Only matches the browser address bar', vi: 'Chỉ khớp với thanh địa chỉ trình duyệt' },
        { en: 'Matches elements outside the screen', vi: 'Khớp với các thẻ nằm ngoài màn hình' },
        { en: 'Matches elements after 5 seconds', vi: 'Khớp sau 5 giây' }
      ],
      ans: 0,
      expEn: ':focus-within enables parent containers to react visually when child elements gain focus.',
      expVi: ':focus-within cho phép khung chứa cha tự động đổi giao diện khi các nút con bên trong nhận focus.'
    },
    {
      id: 'html_q_19_14',
      type: 'single_choice',
      qEn: 'What HTML attribute can automatically give focus to an input field when a page or dialog loads?',
      qVi: 'Thuộc tính HTML nào có thể tự động gán tiêu điểm vào một ô nhập khi trang hoặc modal vừa mở ra?',
      options: [
        { en: 'autofocus', vi: 'autofocus' },
        { en: 'initial-focus="true"', vi: 'initial-focus="true"' },
        { en: 'focused', vi: 'focused' },
        { en: 'select-first', vi: 'select-first' }
      ],
      ans: 0,
      expEn: 'autofocus places initial focus onto the designated element on render.',
      expVi: 'autofocus tự động đặt tiêu điểm vào ô nhập liệu được chỉ định khi vừa hiển thị.'
    },
    {
      id: 'html_q_19_15',
      type: 'single_choice',
      qEn: 'What is the "Roving Tabindex" pattern used for in complex widgets like grids, treeviews, and menu bars?',
      qVi: 'Mẫu thiết kế "Roving Tabindex" được dùng để làm gì trong các widget phức tạp như bảng lưới, cây thư mục và thanh menu?',
      options: [
        { en: 'Sets tabindex="0" on the currently active item and tabindex="-1" on all other items, allowing arrow keys to move focus within the widget and Tab key to exit', vi: 'Đặt tabindex="0" cho mục đang chọn và tabindex="-1" cho tất cả mục khác, cho phép dùng phím mũi tên điều hướng nội bộ và phím Tab để nhảy ra ngoài' },
        { en: 'Rotates elements 360 degrees in CSS', vi: 'Xoay phần tử 360 độ trong CSS' },
        { en: 'Sorts table rows alphabetically', vi: 'Sắp xếp hàng theo bảng chữ cái' },
        { en: 'Calculates the user\'s typing speed', vi: 'Tính tốc độ gõ phím của người dùng' }
      ],
      ans: 0,
      expEn: 'Roving tabindex treats a composite multi-item widget as a single Tab stop with internal arrow navigation.',
      expVi: 'Roving tabindex coi một cụm điều khiển phức tạp như 1 điểm dừng phím Tab duy nhất với phím mũi tên bên trong.'
    },
    {
      id: 'html_q_19_16',
      type: 'single_choice',
      qEn: 'What happens to a link styled with position:absolute; top:-1000px when it receives keyboard focus (:focus)?',
      qVi: 'Điều gì xảy ra với một liên kết được định dạng position:absolute; top:-1000px khi nó nhận tiêu điểm bàn phím (:focus)?',
      options: [
        { en: 'It slides into visible view on screen (e.g. top:16px), revealing the Skip Link clearly to the keyboard user', vi: 'Nó sẽ trượt vào vùng nhìn thấy trên màn hình (như top:16px), hiển thị rõ ràng liên kết Skip Link cho người dùng bàn phím' },
        { en: 'It remains permanently invisible', vi: 'Nó vẫn tàng hình vĩnh viễn' },
        { en: 'The browser closes automatically', vi: 'Trình duyệt tự động đóng lại' },
        { en: 'The link text is erased', vi: 'Chữ trong link bị xóa' }
      ],
      ans: 0,
      expEn: 'The off-screen focusable technique hides skip links visually from mouse users until summoned by keyboard Tab.',
      expVi: 'Kỹ thuật ẩn ngoài màn hình giúp giấu skip link với người dùng chuột và chỉ hiện ra khi nhấn phím Tab.'
    }
  ]
};

console.log('Lesson 19 defined.');
