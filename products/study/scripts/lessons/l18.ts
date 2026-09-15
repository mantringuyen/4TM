import { RawLessonSource } from './rawLessonType';

export const lesson18: RawLessonSource = {
  order: 18,
  id: 'html_lesson_18',
  moduleId: 'html_mod_6',
  levelId: 'advanced',
  topicId: 'html_wai_aria_semantics',
  titleEn: 'WAI-ARIA Roles, States, Properties & Accessible Widget Semantics',
  titleVi: 'Vai Trò WAI-ARIA, Trạng Thái, Thuộc Tính & Ngữ Nghĩa Widget Trợ Năng',
  summaryEn: 'Master Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA): the First Rule of ARIA, essential landmark and widget roles (role="dialog", role="tablist", role="alert"), live regions (aria-live="polite|assertive"), relationship mappings (aria-labelledby, aria-describedby, aria-controls), and accessibility tree inspection.',
  summaryVi: 'Làm chủ WAI-ARIA chuẩn trợ năng quốc tế: Quy tắc vàng số 1 của ARIA, các vai trò widget quan trọng (role="dialog", role="tablist", role="alert"), vùng thông báo động (aria-live="polite|assertive"), ánh xạ liên kết (aria-labelledby, aria-describedby, aria-controls) và kiểm tra cây trợ năng Accessibility Tree.',
  estimatedMinutes: 15,
  introEn: 'Building for the web means building for everyone. Over 1.3 billion people worldwide rely on assistive technologies such as screen readers (NVDA, JAWS, VoiceOver), braille displays, and switch controllers to navigate digital products.',
  introVi: 'Xây dựng web là xây dựng cho mọi người. Hơn 1,3 tỷ người trên thế giới phụ thuộc vào các công nghệ trợ thính/trợ thị như trình đọc màn hình (NVDA, VoiceOver), bàn phím chữ nổi và thiết bị điều khiển để tiếp cận các sản phẩm số.',
  conceptEn: 'The First Rule of ARIA: If you can use a native HTML5 element or attribute with the semantics you need (e.g. <button>, <dialog>, <nav>), DO NOT use ARIA. When custom complex components require ARIA, use roles (e.g. role="tablist", role="tab", role="tabpanel"), states (aria-selected="true", aria-expanded="false"), and dynamic live regions (aria-live="polite" for status updates, aria-live="assertive" for critical alerts). Link elements semantically with aria-labelledby and aria-describedby.',
  conceptVi: 'Quy tắc vàng số 1 của ARIA: Nếu bạn có thể dùng một phần tử HTML5 gốc có sẵn ngữ nghĩa (như <button>, <dialog>, <nav>), TUYỆT ĐỐI KHÔNG dùng ARIA thay thế. Khi xây dựng các widget phức tạp cần ARIA, hãy dùng roles (role="tablist", role="tab", role="tabpanel"), states (aria-selected="true", aria-expanded="false") và các vùng live region (aria-live="polite" cho cập nhật trạng thái, aria-live="assertive" cho cảnh báo khẩn cấp). Liên kết ngữ nghĩa bằng aria-labelledby và aria-describedby.',
  syntax: '<!-- Accessible Custom Tab Component Structure -->\n<div role="tablist" aria-label="Account Settings Tabs">\n  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">Profile</button>\n  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">Security</button>\n</div>\n\n<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">\n  <h3>Profile Information</h3>\n</div>\n<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>\n  <h3>Security Credentials</h3>\n</div>\n\n<!-- Dynamic Notification Live Region -->\n<div id="status-toast" role="status" aria-live="polite" aria-atomic="true"></div>',
  ex1TitleEn: 'Accessible Tabs Interface with Complete ARIA Relationship Attributes',
  ex1TitleVi: 'Giao Diện Tabs Trợ Năng Với Đầy Đủ Thuộc Tính Liên Kết ARIA',
  ex1Code: '<div class="tabs-container" style="max-width:550px; border:1px solid #cbd5e1; border-radius:8px; padding:16px;">\n  <div role="tablist" aria-label="Cloud Configuration Tabs" style="display:flex; gap:8px; border-bottom:1px solid #cbd5e1; padding-bottom:8px;">\n    <button role="tab" id="tab-cpu" aria-selected="true" aria-controls="panel-cpu" style="padding:6px 12px; font-weight:bold;">Compute</button>\n    <button role="tab" id="tab-ram" aria-selected="false" aria-controls="panel-ram" tabindex="-1" style="padding:6px 12px;">Memory</button>\n  </div>\n\n  <div role="tabpanel" id="panel-cpu" aria-labelledby="tab-cpu" style="padding-top:12px;">\n    <h4 style="margin:0 0 8px 0;">Compute Specifications</h4>\n    <p style="margin:0; color:#475569;">16 vCPUs AMD EPYC 9654 clocked at 3.7GHz.</p>\n  </div>\n\n  <div role="tabpanel" id="panel-ram" aria-labelledby="tab-ram" hidden style="padding-top:12px;">\n    <h4 style="margin:0 0 8px 0;">Memory Allocation</h4>\n    <p style="margin:0; color:#475569;">64 GB ECC DDR5 5600MHz RAM.</p>\n  </div>\n</div>',
  ex1ExpEn: 'Combines role="tablist", role="tab", role="tabpanel", aria-selected, aria-controls, and aria-labelledby.',
  ex1ExpVi: 'Kết hợp hoàn hảo vai trò tablist, tab, tabpanel cùng các trạng thái aria-selected, aria-controls và aria-labelledby.',
  ex2TitleEn: 'Screen Reader Live Region Announcements for Dynamic Async UI Updates',
  ex2TitleVi: 'Vùng Live Region Đọc Thông Báo Tự Động Cho Trình Đọc Màn Hình',
  ex2Code: '<!-- Polite: waits until the user finishes typing/speaking -->\n<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">\n  Profile updated successfully.\n</div>\n\n<!-- Assertive: interrupts immediately for critical errors/sessions -->\n<div role="alert" aria-live="assertive" aria-atomic="true" class="alert-box">\n  Warning: Your authentication session will expire in 60 seconds.\n</div>',
  ex2ExpEn: 'aria-live="polite" notifies assistive tech at the next natural pause; aria-live="assertive" interrupts immediately.',
  ex2ExpVi: 'aria-live="polite" đọc khi người dùng dừng thao tác; aria-live="assertive" ngắt lời ngay lập tức khi có cảnh báo khẩn cấp.',
  mistake1En: 'Replacing a native <button> with <div onclick="..."> and attempting to patch it with role="button"',
  mistake1Vi: 'Thay thế thẻ <button> gốc bằng thẻ <div onclick="..."> rồi cố sửa chắp vá bằng role="button"',
  correction1En: 'The First Rule of ARIA states: Always use native HTML elements first. A <div> requires manual keyboard handlers (Enter/Space), tabindex, focus styling, and disabled states which <button> provides automatically.',
  correction1Vi: 'Quy tắc vàng số 1 của ARIA: Luôn ưu tiên dùng thẻ HTML5 gốc. Một thẻ <div> đòi hỏi phải tự viết thủ công phím Enter/Space, tabindex, trạng thái focus mà thẻ <button> đã có sẵn.',
  mistake2En: 'Using aria-hidden="true" on an element that contains focused or interactive child inputs',
  mistake2Vi: 'Đặt aria-hidden="true" lên phần tử chứa các ô nhập liệu hoặc nút bấm tương tác bên trong',
  correction2En: 'Hiding an interactive element from the accessibility tree while it remains keyboard-focusable creates a severe "ghost focus" bug where screen reader users get stuck.',
  correction2Vi: 'Ẩn phần tử khỏi cây trợ năng nhưng vẫn để phím Tab focus vào được sẽ tạo ra lỗi "tiêu điểm ma", khiến người dùng bị kẹt.',
  tipEn: 'Use aria-describedby to link input fields to their respective help text and validation error message containers so screen readers announce both the label and instructions automatically.',
  tipVi: 'Dùng aria-describedby để liên kết ô nhập liệu với hướng dẫn hoặc thông báo lỗi bên dưới, giúp trình đọc màn hình tự động đọc cả nhãn và lời giải thích khi focus.',
  practiceTaskEn: 'Build an Accessible Live Status Alert Box',
  practiceTaskVi: 'Xây dựng hộp thông báo trạng thái trợ năng dạng live region',
  practiceInstEn: 'Create a <div role="status" aria-live="polite" aria-atomic="true"> containing <p>Saving changes...</p>.',
  practiceInstVi: 'Tạo thẻ <div role="status" aria-live="polite" aria-atomic="true"> chứa <p>Saving changes...</p>.',
  practiceStarter: '<div>\n  \n</div>',
  practiceSolution: '<div role="status" aria-live="polite" aria-atomic="true">\n  <p>Saving changes...</p>\n</div>',
  practicePatterns: ['role="status"', 'aria-live="polite"', 'aria-atomic="true"', '<p>Saving changes...</p>'],
  practiceHintEn: 'Include role="status", aria-live="polite", and aria-atomic="true".',
  practiceHintVi: 'Bao gồm role="status", aria-live="polite", và aria-atomic="true".',

  exercises: [
    {
      id: 'html_ex_18_1',
      type: 'complete_code',
      titleEn: 'Connect Input to Help Instructions with aria-describedby',
      titleVi: 'Liên kết ô nhập liệu với hướng dẫn bằng aria-describedby',
      instEn: 'Add aria-describedby="pwd-hint" to the password <input>.',
      instVi: 'Thêm aria-describedby="pwd-hint" vào thẻ <input> mật khẩu.',
      starter: '<label for="pwd">Password:</label>\n<input type="password" id="pwd">\n<small id="pwd-hint">Must be at least 12 characters with one number.</small>',
      solution: '<label for="pwd">Password:</label>\n<input type="password" id="pwd" aria-describedby="pwd-hint">\n<small id="pwd-hint">Must be at least 12 characters with one number.</small>',
      hintEn: 'Add aria-describedby="pwd-hint" to the input.',
      hintVi: 'Thêm aria-describedby="pwd-hint" vào input.',
      expEn: 'aria-describedby announces explanatory hint text immediately when the user focuses the field.',
      expVi: 'aria-describedby đọc to văn bản hướng dẫn giải thích ngay khi người dùng đưa con trỏ vào ô nhập liệu.'
    },
    {
      id: 'html_ex_18_2',
      type: 'fix_code',
      titleEn: 'Fix Inaccessible DIV Button by Replacing with Native Button',
      titleVi: 'Sửa nút div không trợ năng bằng cách thay bằng thẻ button gốc',
      instEn: 'Replace <div class="btn" role="button">Submit</div> with a native <button type="submit">Submit</button>.',
      instVi: 'Thay <div class="btn" role="button">Submit</div> bằng thẻ <button type="submit">Submit</button> gốc.',
      starter: '<div class="btn" role="button">Submit</div>',
      solution: '<button type="submit">Submit</button>',
      hintEn: 'Use native <button type="submit">.',
      hintVi: 'Dùng thẻ <button type="submit"> gốc.',
      expEn: 'Following the First Rule of ARIA, native HTML controls are always superior to simulated ARIA divs.',
      expVi: 'Tuân thủ quy tắc vàng số 1 của ARIA, thẻ gốc luôn vượt trội hơn các thẻ div giả lập bằng ARIA.'
    },
    {
      id: 'html_ex_18_3',
      type: 'write_code',
      titleEn: 'Create High-Priority Critical Alert Region',
      titleVi: 'Tạo vùng thông báo cảnh báo khẩn cấp ưu tiên cao',
      instEn: 'Write a <div role="alert" aria-live="assertive" aria-atomic="true">Payment Failed</div> container.',
      instVi: 'Viết thẻ <div role="alert" aria-live="assertive" aria-atomic="true">Payment Failed</div>.',
      starter: '',
      solution: '<div role="alert" aria-live="assertive" aria-atomic="true">Payment Failed</div>',
      hintEn: 'Use role="alert", aria-live="assertive", and aria-atomic="true".',
      hintVi: 'Dùng role="alert", aria-live="assertive", và aria-atomic="true".',
      expEn: 'role="alert" with aria-live="assertive" immediately alerts assistive technology users of critical events.',
      expVi: 'role="alert" kết hợp aria-live="assertive" lập tức thông báo sự cố khẩn cấp cho người dùng trợ thính/trợ thị.'
    },
    {
      id: 'html_ex_18_4',
      type: 'modify_example',
      titleEn: 'Add aria-expanded State to Accordion Button',
      titleVi: 'Thêm trạng thái aria-expanded vào nút accordion',
      instEn: 'Add aria-expanded="false" and aria-controls="faq-ans" to the accordion toggle <button>.',
      instVi: 'Thêm aria-expanded="false" và aria-controls="faq-ans" vào thẻ <button> đóng mở.',
      starter: '<button id="faq-btn">How does billing work?</button>\n<div id="faq-ans" hidden>Billing is monthly.</div>',
      solution: '<button id="faq-btn" aria-expanded="false" aria-controls="faq-ans">How does billing work?</button>\n<div id="faq-ans" hidden>Billing is monthly.</div>',
      hintEn: 'Add aria-expanded="false" and aria-controls="faq-ans".',
      hintVi: 'Thêm aria-expanded="false" và aria-controls="faq-ans".',
      expEn: 'aria-expanded communicates to screen readers whether a collapsible panel is currently open or closed.',
      expVi: 'aria-expanded thông báo cho trình đọc màn hình biết khối nội dung đang mở hay đóng.'
    },
    {
      id: 'html_ex_18_5',
      type: 'predict_output',
      titleEn: 'Predict Screen Reader Announcement from aria-label Override',
      titleVi: 'Dự đoán nội dung đọc từ thuộc tính ghi đè aria-label',
      instEn: 'If a button is written as <button aria-label="Close modal dialog">X</button>, what will a screen reader announce: "X" or "Close modal dialog"?',
      instVi: 'Nếu nút được viết là <button aria-label="Close modal dialog">X</button>, trình đọc màn hình sẽ đọc từ nào: "X" hay "Close modal dialog"?',
      starter: '<!-- Type X or Close modal dialog -->\n<p>Announcement: </p>',
      solution: '<p>Announcement: Close modal dialog</p>',
      hintEn: 'aria-label completely overrides the visible text node inside the element in the accessibility tree.',
      hintVi: 'aria-label ghi đè hoàn toàn chữ hiển thị bên trong phần tử trong cây trợ năng.'
    }
  ],

  challenge: {
    id: 'html_ch_18',
    titleEn: 'Enterprise Fully Accessible Multi-Panel Tabbed Dashboard Architecture',
    titleVi: 'Kiến trúc bảng điều khiển Tabs đa khung chuẩn trợ năng toàn diện doanh nghiệp',
    descEn: 'Build a production-standard accessible tab component adhering strictly to WAI-ARIA Authoring Practices Guide (APG) design patterns.',
    descVi: 'Xây dựng thành phần tabs trợ năng chuẩn sản xuất tuân thủ nghiêm ngặt cẩm nang WAI-ARIA APG của hiệp hội W3C.',
    requirements: [
      { en: 'Tablist container: <div role="tablist" aria-label="Server Operations">', vi: 'Khung chứa tablist: <div role="tablist" aria-label="Server Operations">' },
      { en: 'Active tab: <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">Metrics</button>', vi: 'Tab kích hoạt: <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">Metrics</button>' },
      { en: 'Inactive tab: <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">Logs</button>', vi: 'Tab không kích hoạt: <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">Logs</button>' },
      { en: 'Active tabpanel: <div role="tabpanel" id="panel-1" aria-labelledby="tab-1"> with content', vi: 'Tabpanel kích hoạt: <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">' },
      { en: 'Inactive tabpanel: <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden> with content', vi: 'Tabpanel ẩn: <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>' },
      { en: 'Live region for status changes: <div id="live-region" role="status" aria-live="polite" aria-atomic="true"></div>', vi: 'Vùng live region: <div id="live-region" role="status" aria-live="polite" aria-atomic="true"></div>' }
    ],
    starter: '<!-- Build enterprise accessible tab widget here -->\n',
    solution: '<div class="dashboard-widget">\n  <div role="tablist" aria-label="Server Operations">\n    <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">\n      Metrics\n    </button>\n    <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">\n      Logs\n    </button>\n  </div>\n\n  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">\n    <h3>Real-Time Metrics</h3>\n    <p>Server load average is 0.42 across 64 cores.</p>\n  </div>\n\n  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>\n    <h3>System Logs</h3>\n    <p>All ingress services healthy. Zero 5xx errors recorded.</p>\n  </div>\n\n  <div id="live-region" role="status" aria-live="polite" aria-atomic="true" class="sr-only">\n    Metrics tab active. Data refreshed.\n  </div>\n</div>',
    hints: [
      { en: 'Link tabs to panels bi-directionally using aria-controls on the tab and aria-labelledby on the tabpanel', vi: 'Liên kết 2 chiều giữa tab và panel bằng aria-controls trên tab và aria-labelledby trên tabpanel' },
      { en: 'Inactive tabs must have tabindex="-1" so arrow keys control tab navigation instead of Tab key', vi: 'Tab chưa chọn phải có tabindex="-1" để phím mũi tên điều hướng tab thay vì phím Tab' }
    ],
    expEn: 'Flawless implementation of the official W3C WAI-ARIA APG Tabs Design Pattern.',
    expVi: 'Hiện thực hóa chuẩn mực mẫu thiết kế Tabs chính thức từ cẩm nang W3C WAI-ARIA APG.'
  },

  challengeVariants: [
    {
      id: 'html_ch_18_v1',
      titleEn: 'Variant 1: Accessible Custom Toggle Switch with role="switch"',
      titleVi: 'Biến thể 1: Công tắc bật tắt tùy chỉnh trợ năng với role="switch"',
      descEn: 'Build an accessible binary toggle switch component using role="switch", aria-checked, and aria-labelledby.',
      descVi: 'Xây dựng nút công tắc trợ năng với role="switch", aria-checked và aria-labelledby.',
      requirements: [
        { en: '<span id="toggle-label">Automatic Night Mode</span>', vi: '<span id="toggle-label">Automatic Night Mode</span>' },
        { en: '<button role="switch" aria-checked="true" aria-labelledby="toggle-label" class="switch-btn">', vi: '<button role="switch" aria-checked="true" aria-labelledby="toggle-label" class="switch-btn">' }
      ],
      starter: '<div class="switch-wrapper">\n  \n</div>',
      solution: '<div class="switch-wrapper">\n  <span id="toggle-label">Automatic Night Mode</span>\n  <button\n    type="button"\n    role="switch"\n    aria-checked="true"\n    aria-labelledby="toggle-label"\n    class="switch-btn">\n    <span class="switch-handle" aria-hidden="true"></span>\n  </button>\n</div>',
      expEn: 'role="switch" informs assistive tech that the button represents an on/off state toggle.',
      expVi: 'role="switch" báo hiệu cho công nghệ trợ năng biết nút bấm này đại diện cho công tắc bật/tắt.'
    },
    {
      id: 'html_ch_18_v2',
      titleEn: 'Variant 2: Screen-Reader Only Accessible Text Utility (.sr-only)',
      titleVi: 'Biến thể 2: Tiện ích văn bản chỉ dành cho trình đọc màn hình (.sr-only)',
      descEn: 'Build an icon-only shopping cart button with hidden descriptive text for screen readers.',
      descVi: 'Xây dựng nút giỏ hàng dạng icon kèm văn bản ẩn mô tả cho trình đọc màn hình.',
      requirements: [
        { en: '<button class="icon-btn" aria-label="Shopping Cart (3 items)">', vi: '<button class="icon-btn" aria-label="Shopping Cart (3 items)">' },
        { en: '<svg aria-hidden="true">...</svg> to prevent duplicate screen reader clutter', vi: '<svg aria-hidden="true">...</svg> để tránh đọc trùng lặp icon' }
      ],
      starter: '<button>\n  \n</button>',
      solution: '<button type="button" class="icon-btn" aria-label="Shopping Cart (3 items)">\n  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n    <circle cx="9" cy="21" r="1"></circle>\n    <circle cx="20" cy="21" r="1"></circle>\n    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>\n  </svg>\n  <span class="badge" aria-hidden="true">3</span>\n</button>',
      expEn: 'Hides purely visual decorative SVG graphics with aria-hidden="true" while providing clear context via aria-label.',
      expVi: 'Ẩn icon SVG trang trí bằng aria-hidden="true" đồng thời cung cấp ngữ cảnh rõ ràng qua aria-label.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_18_1',
      type: 'single_choice',
      qEn: 'What is the "First Rule of ARIA"?',
      qVi: '"Quy tắc vàng số 1 của ARIA" là gì?',
      options: [
        { en: 'If you can use a native HTML5 element or attribute with the semantics and behavior you require, do so instead of re-purposing an element and adding ARIA', vi: 'Nếu bạn có thể dùng một phần tử hoặc thuộc tính HTML5 gốc đã có sẵn ngữ nghĩa và hành vi, hãy dùng nó thay vì chế lại thẻ khác rồi gắn thêm ARIA' },
        { en: 'Every HTML tag must have at least 3 ARIA attributes', vi: 'Mọi thẻ HTML bắt buộc phải có ít nhất 3 thuộc tính ARIA' },
        { en: 'ARIA attributes must only be written in uppercase', vi: 'Thuộc tính ARIA chỉ được viết chữ in hoa' },
        { en: 'ARIA is only supported on mobile devices', vi: 'ARIA chỉ chạy trên thiết bị di động' }
      ],
      ans: 0,
      expEn: 'Native HTML elements have built-in keyboard behavior, accessibility mapping, and mobile OS support.',
      expVi: 'Các phần tử HTML gốc tích hợp sẵn hành vi bàn phím, ánh xạ trợ năng và hỗ trợ trên mọi hệ điều hành.'
    },
    {
      id: 'html_q_18_2',
      type: 'single_choice',
      qEn: 'What is the difference between aria-label and aria-labelledby?',
      qVi: 'Sự khác biệt giữa aria-label và aria-labelledby là gì?',
      options: [
        { en: 'aria-label takes a direct string of text; aria-labelledby takes the ID (or IDs) of existing visible DOM elements on the page that serve as the label', vi: 'aria-label nhận trực tiếp một chuỗi văn bản; aria-labelledby nhận ID (hoặc danh sách ID) của phần tử hiển thị có sẵn trên trang làm nhãn' },
        { en: 'aria-label only works on images', vi: 'aria-label chỉ hoạt động trên hình ảnh' },
        { en: 'aria-labelledby is deprecated in modern HTML', vi: 'aria-labelledby đã bị loại bỏ' },
        { en: 'aria-label is for English only', vi: 'aria-label chỉ dùng cho tiếng Anh' }
      ],
      ans: 0,
      expEn: 'aria-labelledby references visible DOM text nodes by their element IDs.',
      expVi: 'aria-labelledby tham chiếu tới các phần tử văn bản hiển thị trên trang qua ID của chúng.'
    },
    {
      id: 'html_q_18_3',
      type: 'single_choice',
      qEn: 'What does aria-hidden="true" do to an element?',
      qVi: 'Thuộc tính aria-hidden="true" làm gì đối với một phần tử?',
      options: [
        { en: 'Hides the element and all of its descendants completely from the screen reader Accessibility Tree while leaving it visible visually on screen', vi: 'Ẩn hoàn toàn phần tử và mọi con cháu của nó khỏi Cây Trợ Năng của trình đọc màn hình trong khi mắt thường vẫn nhìn thấy trên màn hình' },
        { en: 'Hides the element with display:none in CSS', vi: 'Ẩn phần tử bằng display:none trong CSS' },
        { en: 'Deletes the element from the DOM', vi: 'Xóa phần tử khỏi cây DOM' },
        { en: 'Translates text into invisible ink', vi: 'Chuyển văn bản thành mực vô hình' }
      ],
      ans: 0,
      expEn: 'aria-hidden="true" is ideal for decorative icons, ambient background graphics, and duplicated visuals.',
      expVi: 'aria-hidden="true" rất lý tưởng cho các icon trang trí, hình nền họa tiết không cần đọc to.'
    },
    {
      id: 'html_q_18_4',
      type: 'single_choice',
      qEn: 'What is the purpose of an ARIA "Live Region" (e.g. aria-live="polite")?',
      qVi: 'Mục đích của vùng "Live Region" trong ARIA (như aria-live="polite") là gì?',
      options: [
        { en: 'Notifies screen readers to automatically speak out dynamic text updates (chat messages, toasts, cart updates) without requiring the user to move keyboard focus', vi: 'Báo cho trình đọc màn hình tự động đọc các cập nhật nội dung động (tin nhắn chat, thông báo toast, giỏ hàng) mà không bắt người dùng phải di chuyển con trỏ phím' },
        { en: 'Streams live video broadcasts using WebRTC', vi: 'Phát video trực tiếp bằng WebRTC' },
        { en: 'Calculates the user\'s real-time GPS coordinates', vi: 'Tính tọa độ GPS thời gian thực của người dùng' },
        { en: 'Reboots the web server', vi: 'Khởi động lại máy chủ web' }
      ],
      ans: 0,
      expEn: 'Live regions bridge the gap between asynchronous UI updates and non-visual user interaction.',
      expVi: 'Vùng live region kết nối các cập nhật giao diện bất đồng bộ với trải nghiệm của người khiếm thị.'
    },
    {
      id: 'html_q_18_5',
      type: 'single_choice',
      qEn: 'What is the difference between aria-live="polite" and aria-live="assertive"?',
      qVi: 'Sự khác biệt giữa aria-live="polite" và aria-live="assertive" là gì?',
      options: [
        { en: 'polite waits until the user pauses or finishes current speech; assertive interrupts the screen reader immediately with highest priority', vi: 'polite đợi đến khi người dùng dừng thao tác hoặc đọc xong câu hiện tại; assertive ngắt lời trình đọc màn hình ngay lập tức ở mức ưu tiên cao nhất' },
        { en: 'polite speaks in a whispering voice', vi: 'polite đọc bằng giọng thì thầm' },
        { en: 'assertive causes the computer to beep loudly', vi: 'assertive làm máy tính kêu bíp to' },
        { en: 'polite only updates once per day', vi: 'polite chỉ cập nhật một lần mỗi ngày' }
      ],
      ans: 0,
      expEn: 'Use polite for normal background updates and assertive exclusively for critical time-sensitive warnings.',
      expVi: 'Dùng polite cho cập nhật thông thường và dùng assertive riêng cho các cảnh báo khẩn cấp tức thời.'
    },
    {
      id: 'html_q_18_6',
      type: 'single_choice',
      qEn: 'What does aria-atomic="true" ensure when a live region updates?',
      qVi: 'Thuộc tính aria-atomic="true" đảm bảo điều gì khi vùng live region có cập nhật mới?',
      options: [
        { en: 'Screen readers announce the entire contents of the live region container as a coherent whole, rather than speaking only the fragmented changed text node', vi: 'Trình đọc màn hình sẽ đọc lại toàn bộ nội dung của khung thông báo thành một câu trọn vẹn, thay vì chỉ đọc mẩu chữ vụn vừa thay đổi' },
        { en: 'Splits the text into nuclear atoms', vi: 'Tách chữ thành các nguyên tử' },
        { en: 'Enforces atomic CSS styling', vi: 'Áp dụng định dạng atomic CSS' },
        { en: 'Locks the database transaction', vi: 'Khóa giao dịch cơ sở dữ liệu' }
      ],
      ans: 0,
      expEn: 'aria-atomic="true" guarantees that notifications are read with full contextual clarity.',
      expVi: 'aria-atomic="true" đảm bảo thông báo được đọc lên trọn vẹn kèm ngữ cảnh đầy đủ.'
    },
    {
      id: 'html_q_18_7',
      type: 'single_choice',
      qEn: 'What is the role of aria-describedby?',
      qVi: 'Vai trò của thuộc tính aria-describedby là gì?',
      options: [
        { en: 'Associates an element with secondary descriptive text or error messages (referenced by element ID) that is read after the primary label', vi: 'Liên kết một phần tử với văn bản mô tả phụ hoặc thông báo lỗi (qua ID phần tử) được đọc ngay sau nhãn chính' },
        { en: 'Replaces the CSS color palette', vi: 'Thay thế bảng màu CSS' },
        { en: 'Translates the description into German', vi: 'Dịch mô tả sang tiếng Đức' },
        { en: 'Changes the font size of paragraphs', vi: 'Đổi cỡ chữ của đoạn văn' }
      ],
      ans: 0,
      expEn: 'aria-describedby provides accessible supplementary guidance and validation error explanations.',
      expVi: 'aria-describedby cung cấp hướng dẫn bổ trợ và giải thích nguyên nhân lỗi nhập liệu cho người dùng.'
    },
    {
      id: 'html_q_18_8',
      type: 'single_choice',
      qEn: 'In a tabbed interface, what attribute connects a tab to its corresponding tabpanel?',
      qVi: 'Trong giao diện tab, thuộc tính nào kết nối một thẻ tab với khung nội dung tabpanel tương ứng của nó?',
      options: [
        { en: 'aria-controls="panel-id" on the tab button', vi: 'aria-controls="panel-id" trên nút tab' },
        { en: 'aria-link="panel-id"', vi: 'aria-link="panel-id"' },
        { en: 'href="#panel-id"', vi: 'href="#panel-id"' },
        { en: 'target="panel-id"', vi: 'target="panel-id"' }
      ],
      ans: 0,
      expEn: 'aria-controls establishes the programmatic relationship between an interactive trigger and the controlled content region.',
      expVi: 'aria-controls thiết lập mối quan hệ lập trình giữa nút kích hoạt và vùng nội dung do nó điều khiển.'
    },
    {
      id: 'html_q_18_9',
      type: 'single_choice',
      qEn: 'What attribute indicates whether a tab is currently active and selected?',
      qVi: 'Thuộc tính nào cho biết một thẻ tab hiện có đang được chọn và kích hoạt hay không?',
      options: [
        { en: 'aria-selected="true" (or "false")', vi: 'aria-selected="true" (hoặc "false")' },
        { en: 'aria-active="true"', vi: 'aria-active="true"' },
        { en: 'aria-current="tab"', vi: 'aria-current="tab"' },
        { en: 'selected="true"', vi: 'selected="true"' }
      ],
      ans: 0,
      expEn: 'aria-selected is the standardized WAI-ARIA state attribute for tab widgets.',
      expVi: 'aria-selected là thuộc tính trạng thái chuẩn WAI-ARIA cho các thành phần tab.'
    },
    {
      id: 'html_q_18_10',
      type: 'single_choice',
      qEn: 'Why do inactive tabs in a tablist have tabindex="-1"?',
      qVi: 'Tại sao các tab không kích hoạt trong danh sách tab lại được đặt tabindex="-1"?',
      options: [
        { en: 'To remove inactive tabs from the sequential Tab key order, allowing users to navigate between tabs using Left/Right arrow keys according to APG patterns', vi: 'Để đưa các tab chưa chọn ra khỏi thứ tự phím Tab, cho phép người dùng chuyển qua lại giữa các tab bằng phím mũi tên Trái/Phải theo chuẩn APG' },
        { en: 'To disable the tab permanently', vi: 'Để vô hiệu hóa vĩnh viễn tab đó' },
        { en: 'To make the tab invisible on screen', vi: 'Để làm tab tàng hình trên màn hình' },
        { en: 'To delete the tab from HTML', vi: 'Để xóa tab khỏi HTML' }
      ],
      ans: 0,
      expEn: 'The roving tabindex pattern (tabindex="0" on active, "-1" on inactive) enables arrow key navigation in composite widgets.',
      expVi: 'Mẫu thiết kế roving tabindex (tabindex="0" cho tab đang chọn, "-1" cho tab còn lại) kích hoạt điều hướng bằng phím mũi tên.'
    },
    {
      id: 'html_q_18_11',
      type: 'single_choice',
      qEn: 'What does role="alert" implicitly map to in terms of live region properties?',
      qVi: 'Vai trò role="alert" tự động ánh xạ ngầm định tới thuộc tính live region nào?',
      options: [
        { en: 'aria-live="assertive" and aria-atomic="true"', vi: 'aria-live="assertive" và aria-atomic="true"' },
        { en: 'aria-live="off"', vi: 'aria-live="off"' },
        { en: 'aria-live="polite"', vi: 'aria-live="polite"' },
        { en: 'aria-hidden="true"', vi: 'aria-hidden="true"' }
      ],
      ans: 0,
      expEn: 'role="alert" is an assertive live region that notifies the user of urgent system warnings.',
      expVi: 'role="alert" là một live region khẩn cấp thông báo ngay lập tức các cảnh báo hệ thống quan trọng.'
    },
    {
      id: 'html_q_18_12',
      type: 'single_choice',
      qEn: 'What is the purpose of role="status"?',
      qVi: 'Mục đích của vai trò role="status" là gì?',
      options: [
        { en: 'An advisory live region (implicitly aria-live="polite") used for non-urgent feedback messages like "Saved", "5 items found", or "Uploading..."', vi: 'Một live region thông báo (ngầm định aria-live="polite") dùng cho các tin nhắn phản hồi không khẩn cấp như "Đã lưu", "Tìm thấy 5 mục", hoặc "Đang tải..."' },
        { en: 'Checks if the internet connection is active', vi: 'Kiểm tra xem mạng internet có hoạt động không' },
        { en: 'Changes the user\'s profile status to away', vi: 'Đổi trạng thái hồ sơ người dùng thành vắng mặt' },
        { en: 'Runs server health checks', vi: 'Chạy kiểm tra tình trạng máy chủ' }
      ],
      ans: 0,
      expEn: 'role="status" provides gentle non-disruptive feedback on state changes.',
      expVi: 'role="status" mang lại thông báo phản hồi nhẹ nhàng không ngắt lời khi trạng thái thay đổi.'
    },
    {
      id: 'html_q_18_13',
      type: 'single_choice',
      qEn: 'Can you use ARIA attributes to change the visual styling or layout of an element on screen?',
      qVi: 'Bạn có thể dùng các thuộc tính ARIA để thay đổi trực tiếp kiểu dáng hiển thị hoặc bố cục màn hình không?',
      options: [
        { en: 'ARIA attributes convey semantics exclusively to accessibility APIs with zero built-in CSS visual styling (though you can target them via CSS attribute selectors)', vi: 'Thuộc tính ARIA chỉ truyền tải ngữ nghĩa cho các API trợ năng mà không có bất kỳ định dạng CSS hiển thị sẵn nào (dù bạn có thể dùng CSS selector bắt theo thuộc tính)' },
        { en: 'Yes, ARIA automatically adds 3D shadows and animation', vi: 'Có, ARIA tự động thêm bóng đổ 3D và hoạt ảnh' },
        { en: 'ARIA changes all text fonts to Helvetica', vi: 'ARIA đổi phông chữ thành Helvetica' },
        { en: 'ARIA forces high-contrast black and white mode', vi: 'ARIA ép chế độ tương phản cao đen trắng' }
      ],
      ans: 0,
      expEn: 'ARIA modifies the Accessibility Tree, not the visual layout engine directly.',
      expVi: 'ARIA thay đổi Cây Trợ Năng (Accessibility Tree), không tác động trực tiếp tới engine vẽ giao diện.'
    },
    {
      id: 'html_q_18_14',
      type: 'single_choice',
      qEn: 'What does aria-current="page" communicate to a screen reader user on a navigation link?',
      qVi: 'Thuộc tính aria-current="page" thông báo điều gì cho người dùng trình đọc màn hình trên một link điều hướng?',
      options: [
        { en: 'Identifies this specific link as representing the currently active, viewed page in the navigation hierarchy', vi: 'Xác định liên kết cụ thể này đại diện cho chính trang hiện tại đang được xem trong hệ thống điều hướng' },
        { en: 'Opens the page in a new window', vi: 'Mở trang trong cửa sổ mới' },
        { en: 'Reloads the current page from cache', vi: 'Tải lại trang hiện tại từ cache' },
        { en: 'Prints the webpage on a laser printer', vi: 'In trang web ra máy in laser' }
      ],
      ans: 0,
      expEn: 'aria-current="page" conveys the active navigation state clearly to assistive technologies.',
      expVi: 'aria-current="page" truyền đạt trạng thái menu đang kích hoạt cho công nghệ trợ năng.'
    },
    {
      id: 'html_q_18_15',
      type: 'single_choice',
      qEn: 'What does aria-invalid="true" on an <input> field signal?',
      qVi: 'Thuộc tính aria-invalid="true" trên ô nhập liệu <input> báo hiệu điều gì?',
      options: [
        { en: 'Informs assistive technologies that the entered value fails validation rules and requires correction by the user', vi: 'Thông báo cho công nghệ trợ năng biết giá trị vừa nhập không hợp lệ và cần được người dùng sửa lại' },
        { en: 'Deletes the user\'s input immediately', vi: 'Xóa ngay lập tức dữ liệu người dùng vừa gõ' },
        { en: 'Locks the keyboard permanently', vi: 'Khóa bàn phím vĩnh viễn' },
        { en: 'Submits the form to the server error log', vi: 'Gửi form vào nhật ký lỗi của máy chủ' }
      ],
      ans: 0,
      expEn: 'aria-invalid="true" flags fields with validation failures in the accessibility tree.',
      expVi: 'aria-invalid="true" đánh dấu các trường có lỗi xác thực trong cây trợ năng.'
    },
    {
      id: 'html_q_18_16',
      type: 'single_choice',
      qEn: 'What tool inside modern browser DevTools allows engineers to inspect the Accessibility Tree, roles, computed names, and ARIA attributes?',
      qVi: 'Công cụ nào bên trong DevTools của trình duyệt cho phép kỹ sư kiểm tra Cây Trợ Năng, vai trò role, tên tính toán và thuộc tính ARIA?',
      options: [
        { en: 'The Accessibility Inspector tab (Elements > Accessibility Pane in Chrome/Firefox/Safari)', vi: 'Thẻ Kiểm tra Trợ Năng (Elements > Accessibility Pane trong Chrome/Firefox/Safari)' },
        { en: 'Network tab', vi: 'Thẻ Network' },
        { en: 'Memory tab', vi: 'Thẻ Memory' },
        { en: 'Application Storage tab', vi: 'Thẻ Application Storage' }
      ],
      ans: 0,
      expEn: 'The Accessibility panel reveals the exact computed name, role, and properties parsed by the browser.',
      expVi: 'Bảng Accessibility hiển thị chính xác tên tính toán, vai trò và thuộc tính được trình duyệt biên dịch.'
    }
  ]
};

console.log('Lesson 18 defined.');
