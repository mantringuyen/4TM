import { RawLessonSource } from './rawLessonType';

export const lesson14: RawLessonSource = {
  order: 14,
  id: 'html_lesson_14',
  moduleId: 'html_mod_4',
  levelId: 'intermediate',
  topicId: 'html_interactive_elements',
  titleEn: 'Native Interactive Elements: <details>, <summary>, <dialog> Modal, <meter> & <progress>',
  titleVi: 'Phần Tử Tương Tác Gốc: <details>, <summary>, Modal <dialog>, <meter> & <progress>',
  summaryEn: 'Master native interactive widgets with zero JavaScript overhead: collapsible disclosure widgets (<details> & <summary>), accessible native modal and non-modal popups (<dialog>), gauge metrics (<meter>), and task completion indicators (<progress>).',
  summaryVi: 'Làm chủ các widget tương tác gốc không cần JavaScript: khối đóng mở thu gọn (<details> & <summary>), hộp thoại popup chuẩn trợ năng (<dialog>), thước đo định lượng (<meter>) và thanh tiến độ hoàn thành (<progress>).',
  estimatedMinutes: 15,
  introEn: 'HTML5 introduces declarative, accessible interactive components natively into the browser engine, replacing hundreds of lines of fragile JavaScript accordion and modal plugin code.',
  introVi: 'HTML5 tích hợp sẵn các thành phần tương tác chuẩn trợ năng trực tiếp vào nhân trình duyệt, thay thế hoàn toàn hàng trăm dòng mã plugin JavaScript đóng mở accordion và popup modal phức tạp.',
  conceptEn: 'Create zero-JS collapsible accordions with <details><summary>Heading</summary>Hidden Content</details>; the browser handles keyboard navigation (Enter/Space) and ARIA expanded state automatically. The native <dialog> element provides modal dialogs with native backdrop styling (::backdrop), automatic focus trapping, and Esc key dismissal when opened with dialog.showModal(). Use <progress> for task completion percentages and <meter> for scalar gauge measurements within known ranges.',
  conceptVi: 'Tạo khối accordion đóng mở không cần JS bằng <details><summary>Tiêu đề</summary>Nội dung ẩn</details>; trình duyệt tự động xử lý bàn phím (Enter/Space) và trạng thái ARIA expanded. Thẻ <dialog> cung cấp hộp thoại modal với lớp nền mờ (::backdrop), tự động bẫy con trỏ phím Tab và hỗ trợ phím Esc khi mở bằng dialog.showModal(). Dùng <progress> cho tiến độ hoàn thành công việc và <meter> cho thước đo đo lường định mức.',
  syntax: '<details>\n  <summary>Frequently Asked Question</summary>\n  <p>Detailed answer appears here when toggled open.</p>\n</details>\n\n<dialog id="modal-box">\n  <form method="dialog">\n    <h3>Account Security Notice</h3>\n    <p>Please review your updated security settings.</p>\n    <button type="submit">Acknowledge</button>\n  </form>\n</dialog>',
  ex1TitleEn: 'Accessible FAQ Accordion with Name-Grouped Exclusive Open',
  ex1TitleVi: 'Khối Câu Hỏi Thường Gặp Accordion Tự Đóng Mục Khác Bằng name',
  ex1Code: '<div style="max-width:500px; display:flex; flex-direction:column; gap:12px;">\n  <details name="faq-group" open style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">\n    <summary style="font-weight:bold; cursor:pointer;">What is the refund policy?</summary>\n    <p style="margin-top:8px; color:#475569;">We offer a 30-day money-back guarantee with zero questions asked.</p>\n  </details>\n  <details name="faq-group" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px;">\n    <summary style="font-weight:bold; cursor:pointer;">How do I upgrade my cloud tier?</summary>\n    <p style="margin-top:8px; color:#475569;">Navigate to Settings > Billing and select your desired enterprise plan.</p>\n  </details>\n</div>',
  ex1ExpEn: 'Using the modern name attribute groups <details> into an exclusive accordion where opening one closes the others automatically.',
  ex1ExpVi: 'Sử dụng thuộc tính name nhóm các thẻ <details> lại thành accordion độc quyền, tự động đóng các mục khác khi mở 1 mục.',
  ex2TitleEn: 'Comparing <progress> Task Completion and <meter> Storage Gauge',
  ex2TitleVi: 'So Sánh Tiến Độ <progress> Và Thước Đo Dung Lượng <meter>',
  ex2Code: '<div style="max-width:400px; display:flex; flex-direction:column; gap:16px;">\n  <div>\n    <label for="upload-task" style="display:block; font-weight:600; margin-bottom:4px;">File Upload Progress (75%):</label>\n    <progress id="upload-task" value="75" max="100" style="width:100%;">75%</progress>\n  </div>\n  <div>\n    <label for="disk-gauge" style="display:block; font-weight:600; margin-bottom:4px;">SSD Storage Usage (85GB of 100GB):</label>\n    <meter id="disk-gauge" value="85" min="0" max="100" low="30" high="80" optimum="20" style="width:100%;">85 GB</meter>\n  </div>\n</div>',
  ex2ExpEn: '<progress> tracks ongoing completion status; <meter> measures a scalar quantity within a fixed scale with thresholds.',
  ex2ExpVi: '<progress> theo dõi tiến trình công việc; <meter> đo lường giá trị số học trong một khoảng giới hạn kèm ngưỡng an toàn/nguy hiểm.',
  mistake1En: 'Using <progress> to display a static metric like disk space or battery level',
  mistake1Vi: 'Dùng <progress> để hiển thị số đo tĩnh như dung lượng ổ cứng hoặc mức pin',
  correction1En: '<progress> is strictly for task completion progress towards a goal. Use <meter> for scalar measurements and static quantities.',
  correction1Vi: '<progress> chỉ dùng cho tiến độ hoàn thành công việc. Hãy dùng <meter> cho các thước đo định lượng và tỷ lệ tài nguyên.',
  mistake2En: 'Opening a <dialog> with dialog.show() instead of dialog.showModal() when a true modal backdrop is required',
  mistake2Vi: 'Mở <dialog> bằng dialog.show() thay vì dialog.showModal() khi cần hiển thị popup modal chặn thao tác',
  correction2En: 'show() opens a non-modal popup that does not trap focus or dim the background. showModal() enforces true modal isolation and activates the ::backdrop pseudo-element.',
  correction2Vi: 'show() mở hộp thoại thường không khóa thao tác trang. showModal() tạo modal thực sự, khóa focus và kích hoạt lớp nền mờ ::backdrop.',
  tipEn: 'Forms inside <dialog method="dialog"> automatically close the dialog on submit without refreshing the page or triggering a server POST request, returning the submit button\'s value as dialog.returnValue.',
  tipVi: 'Form có method="dialog" bên trong thẻ <dialog> sẽ tự động đóng hộp thoại khi submit mà không tải lại trang, đồng thời lưu giá trị của nút bấm vào dialog.returnValue.',
  practiceTaskEn: 'Build an Interactive FAQ with <details> and <summary>',
  practiceTaskVi: 'Xây dựng câu hỏi thường gặp tương tác với details và summary',
  practiceInstEn: 'Create a <details open> with <summary>System Requirements</summary> and a paragraph <p>Requires modern browser with HTML5 support.</p>.',
  practiceInstVi: 'Tạo thẻ <details open> chứa <summary>System Requirements</summary> và đoạn văn <p>Requires modern browser with HTML5 support.</p>.',
  practiceStarter: '<details>\n  \n</details>',
  practiceSolution: '<details open>\n  <summary>System Requirements</summary>\n  <p>Requires modern browser with HTML5 support.</p>\n</details>',
  practicePatterns: ['<details open>', '<summary>System Requirements</summary>', '<p>Requires modern browser with HTML5 support.</p>', '</details>'],
  practiceHintEn: 'Include the open attribute on <details> and define the <summary> title.',
  practiceHintVi: 'Thêm thuộc tính open trên thẻ <details> và định nghĩa tiêu đề trong <summary>.',

  exercises: [
    {
      id: 'html_ex_14_1',
      type: 'complete_code',
      titleEn: 'Create Native Confirmation Dialog with method="dialog"',
      titleVi: 'Tạo hộp thoại xác nhận gốc với method="dialog"',
      instEn: 'Add method="dialog" to the <form> inside the <dialog id="confirm-box">.',
      instVi: 'Thêm method="dialog" vào thẻ <form> bên trong <dialog id="confirm-box">.',
      starter: '<dialog id="confirm-box">\n  <form>\n    <p>Are you sure you want to delete this file?</p>\n    <button value="cancel">Cancel</button>\n    <button value="confirm">Confirm</button>\n  </form>\n</dialog>',
      solution: '<dialog id="confirm-box">\n  <form method="dialog">\n    <p>Are you sure you want to delete this file?</p>\n    <button value="cancel">Cancel</button>\n    <button value="confirm">Confirm</button>\n  </form>\n</dialog>',
      hintEn: 'Add method="dialog" to the <form>.',
      hintVi: 'Thêm method="dialog" vào thẻ <form>.',
      expEn: 'method="dialog" closes the dialog natively upon button click without network requests.',
      expVi: 'method="dialog" tự động đóng hộp thoại khi nhấn nút mà không gửi request lên mạng.'
    },
    {
      id: 'html_ex_14_2',
      type: 'fix_code',
      titleEn: 'Fix Incorrect Usage of <progress> for Battery Level',
      titleVi: 'Sửa lỗi dùng sai thẻ progress cho mức pin',
      instEn: 'Change the <progress> element to <meter id="battery-lvl" value="0.2" min="0" max="1" low="0.25" high="0.8" optimum="0.9">20%</meter>.',
      instVi: 'Đổi thẻ <progress> thành <meter id="battery-lvl" value="0.2" min="0" max="1" low="0.25" high="0.8" optimum="0.9">20%</meter>.',
      starter: '<label for="battery-lvl">Battery Level:</label>\n<progress id="battery-lvl" value="20" max="100">20%</progress>',
      solution: '<label for="battery-lvl">Battery Level:</label>\n<meter id="battery-lvl" value="0.2" min="0" max="1" low="0.25" high="0.8" optimum="0.9">20%</meter>',
      hintEn: 'Replace <progress> with <meter> and provide min/max/low/high/optimum.',
      hintVi: 'Thay <progress> bằng <meter> và khai báo min/max/low/high/optimum.',
      expEn: '<meter> represents a measurement within a known range with warning thresholds.',
      expVi: '<meter> biểu diễn phép đo trong khoảng thang đo xác định kèm các ngưỡng cảnh báo.'
    },
    {
      id: 'html_ex_14_3',
      type: 'write_code',
      titleEn: 'Create Indeterminate and Determinate Progress Bars',
      titleVi: 'Tạo thanh tiến độ không xác định và xác định',
      instEn: 'Write two labeled <progress> bars: one indeterminate (<progress id="loading-bar"></progress>) and one at 50% (<progress id="sync-bar" value="50" max="100">50%</progress>).',
      instVi: 'Viết 2 thanh <progress> có label: một thanh không xác định (<progress id="loading-bar"></progress>) và một thanh 50% (<progress id="sync-bar" value="50" max="100">50%</progress>).',
      starter: '',
      solution: '<div>\n  <label for="loading-bar">Searching files...</label>\n  <progress id="loading-bar"></progress>\n</div>\n<div>\n  <label for="sync-bar">Syncing data (50%):</label>\n  <progress id="sync-bar" value="50" max="100">50%</progress>\n</div>',
      hintEn: 'An indeterminate progress bar omits the value attribute.',
      hintVi: 'Thanh tiến độ không xác định chỉ cần bỏ thuộc tính value.'
    },
    {
      id: 'html_ex_14_4',
      type: 'modify_example',
      titleEn: 'Group Details into Single-Open Accordion',
      titleVi: 'Gom nhóm details thành accordion chỉ mở 1 mục',
      instEn: 'Add name="help-accordion" to both <details> elements so opening one closes the other.',
      instVi: 'Thêm name="help-accordion" vào cả 2 thẻ <details> để khi mở một mục thì mục kia tự đóng.',
      starter: '<details>\n  <summary>Section 1</summary>\n  <p>Content 1</p>\n</details>\n<details>\n  <summary>Section 2</summary>\n  <p>Content 2</p>\n</details>',
      solution: '<details name="help-accordion">\n  <summary>Section 1</summary>\n  <p>Content 1</p>\n</details>\n<details name="help-accordion">\n  <summary>Section 2</summary>\n  <p>Content 2</p>\n</details>',
      hintEn: 'Add name="help-accordion" to both <details> tags.',
      hintVi: 'Thêm name="help-accordion" vào cả 2 thẻ <details>.',
      expEn: 'The name attribute natively groups <details> into exclusive accordions in HTML5.',
      expVi: 'Thuộc tính name tự động nhóm các thẻ <details> thành accordion loại trừ lẫn nhau trong HTML5.'
    },
    {
      id: 'html_ex_14_5',
      type: 'predict_output',
      titleEn: 'Predict Method to Open Modal Dialog with Backdrop',
      titleVi: 'Dự đoán phương thức mở hộp thoại modal có lớp nền mờ',
      instEn: 'Which JavaScript method should you call on a <dialog> element to open it as a modal with keyboard focus trapping and backdrop: show() or showModal()?',
      instVi: 'Phương thức JavaScript nào nên gọi trên thẻ <dialog> để mở nó dưới dạng modal có bẫy con trỏ phím và nền mờ: show() hay showModal()?',
      starter: '<!-- Type show or showModal -->\n<p>Method: </p>',
      solution: '<p>Method: showModal</p>',
      hintEn: 'showModal() opens the dialog as top-layer modal.',
      hintVi: 'showModal() mở hộp thoại ở lớp cao nhất (top-layer) dạng modal.'
    }
  ],

  challenge: {
    id: 'html_ch_14',
    titleEn: 'Enterprise System Diagnostics & Interactive Support Center',
    titleVi: 'Trung tâm hỗ trợ tương tác & chẩn đoán hệ thống doanh nghiệp',
    descEn: 'Build an interactive operations center dashboard combining exclusive FAQ accordions, metric gauges, progress bars, and a native settings modal dialog.',
    descVi: 'Xây dựng bảng điều khiển vận hành tương tác kết hợp accordion câu hỏi thường gặp, thước đo tài nguyên, tiến trình và hộp thoại cài đặt modal gốc.',
    requirements: [
      { en: '<section> with <h2>System Diagnostics</h2>', vi: '<section> có <h2>System Diagnostics</h2>' },
      { en: 'Two grouped <details name="troubleshoot"> accordions for "Database Health" and "Network Latency"', vi: 'Hai khối <details name="troubleshoot"> có cùng name cho "Database Health" và "Network Latency"' },
      { en: '<meter id="cpu-usage" value="45" min="0" max="100" low="50" high="80" optimum="20"> with <label for="cpu-usage">', vi: '<meter id="cpu-usage" value="45" min="0" max="100" low="50" high="80" optimum="20"> kèm label' },
      { en: '<progress id="backup-sync" value="80" max="100"> with <label for="backup-sync">', vi: '<progress id="backup-sync" value="80" max="100"> kèm label' },
      { en: '<dialog id="settings-dialog"> containing <form method="dialog"> with Save and Cancel buttons', vi: '<dialog id="settings-dialog"> chứa <form method="dialog"> có nút Save và Cancel' }
    ],
    starter: '<!-- Build enterprise interactive dashboard here -->\n',
    solution: '<section>\n  <h2>System Diagnostics</h2>\n\n  <div class="metrics-panel">\n    <div>\n      <label for="cpu-usage">CPU Utilization (45%):</label>\n      <meter id="cpu-usage" value="45" min="0" max="100" low="50" high="80" optimum="20">45%</meter>\n    </div>\n    <div>\n      <label for="backup-sync">Cloud Backup Status (80%):</label>\n      <progress id="backup-sync" value="80" max="100">80%</progress>\n    </div>\n  </div>\n\n  <div class="accordion-panel">\n    <h3>Troubleshooting Guides</h3>\n    <details name="troubleshoot" open>\n      <summary>Database Health Diagnostics</summary>\n      <p>All database clusters are operating with replica latency under 2ms.</p>\n    </details>\n    <details name="troubleshoot">\n      <summary>Network Latency Diagnostics</summary>\n      <p>Average global Edge ping is 14ms across 12 regional points of presence.</p>\n    </details>\n  </div>\n\n  <dialog id="settings-dialog">\n    <form method="dialog">\n      <h3>Diagnostics Preferences</h3>\n      <p>Adjust alerting thresholds and telemetry logging levels.</p>\n      <button type="submit" value="save">Save Preferences</button>\n      <button type="submit" value="cancel">Cancel</button>\n    </form>\n  </dialog>\n</section>',
    hints: [
      { en: 'Ensure all inputs and progress/meter controls have linked <label for="..."> associations', vi: 'Đảm bảo tất cả các điều khiển progress/meter đều có liên kết label for' },
      { en: 'Use method="dialog" on the dialog form', vi: 'Dùng method="dialog" trên form của dialog' }
    ],
    expEn: 'Leverages HTML5 native interactive elements to construct sophisticated dashboards without third-party JS dependencies.',
    expVi: 'Tận dụng toàn bộ sức mạnh tương tác gốc của HTML5 để tạo giao diện phức tạp không cần phụ thuộc thư viện JS ngoài.'
  },

  challengeVariants: [
    {
      id: 'html_ch_14_v1',
      titleEn: 'Variant 1: E-Commerce Terms Modal with Confirmation Form',
      titleVi: 'Biến thể 1: Modal điều khoản mua hàng kèm form xác nhận',
      descEn: 'Build a checkout terms agreement modal using <dialog> with scrollable agreement text and agree/decline action buttons.',
      descVi: 'Xây dựng modal điều khoản thanh toán bằng <dialog> có văn bản cuộn và nút đồng ý/từ chối.',
      requirements: [
        { en: '<dialog id="terms-modal">', vi: '<dialog id="terms-modal">' },
        { en: '<form method="dialog"> with <button value="agree">I Agree</button> and <button value="decline">Decline</button>', vi: '<form method="dialog"> có 2 nút I Agree và Decline' }
      ],
      starter: '<dialog>\n  \n</dialog>',
      solution: '<dialog id="terms-modal">\n  <form method="dialog">\n    <h3>Terms of Purchase & Privacy Policy</h3>\n    <div style="max-height:180px; overflow-y:auto;">\n      <p>By proceeding, you authorize recurring monthly billing until canceled. All sales are subject to local tax regulations.</p>\n    </div>\n    <menu>\n      <button type="submit" value="decline">Decline</button>\n      <button type="submit" value="agree" autofocus>I Agree</button>\n    </menu>\n  </form>\n</dialog>',
      expEn: 'Forms with method="dialog" automatically close the dialog and assign the clicked button\'s value to dialog.returnValue.',
      expVi: 'Form có method="dialog" tự động đóng modal và gán giá trị của nút được bấm vào dialog.returnValue.'
    },
    {
      id: 'html_ch_14_v2',
      titleEn: 'Variant 2: Storage Quota Visualizer Matrix with Multiple Meters',
      titleVi: 'Biến thể 2: Trình trực quan hóa dung lượng lưu trữ với nhiều thẻ meter',
      descEn: 'Build a multi-meter storage dashboard displaying Used RAM, Disk Quota, and Bandwidth with warning thresholds.',
      descVi: 'Xây dựng bảng điều khiển dung lượng hiển thị RAM, Dung lượng ổ đĩa và Băng thông với các ngưỡng cảnh báo.',
      requirements: [
        { en: 'RAM Meter: value="14" min="0" max="16" high="14" optimum="8"', vi: 'RAM Meter: value="14" min="0" max="16" high="14" optimum="8"' },
        { en: 'Disk Meter: value="450" min="0" max="500" high="400" optimum="100"', vi: 'Disk Meter: value="450" min="0" max="500" high="400" optimum="100"' }
      ],
      starter: '<div class="storage-matrix">\n  \n</div>',
      solution: '<div class="storage-matrix">\n  <div>\n    <label for="ram-meter">RAM Usage (14GB / 16GB):</label>\n    <meter id="ram-meter" value="14" min="0" max="16" low="4" high="14" optimum="8">14 GB</meter>\n  </div>\n  <div>\n    <label for="disk-meter">NVMe Disk Quota (450GB / 500GB):</label>\n    <meter id="disk-meter" value="450" min="0" max="500" low="100" high="400" optimum="100">450 GB</meter>\n  </div>\n</div>',
      expEn: 'low, high, and optimum attributes enable browsers to render green, yellow, and red indicator colors automatically.',
      expVi: 'Các thuộc tính low, high và optimum giúp trình duyệt tự đổi màu xanh, vàng và đỏ cảnh báo tự động.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_14_1',
      type: 'single_choice',
      qEn: 'What is the purpose of the <details> and <summary> elements in HTML5?',
      qVi: 'Mục đích của hai phần tử <details> và <summary> trong HTML5 là gì?',
      options: [
        { en: 'To create a native, accessible collapsible disclosure widget (accordion) that expands and collapses without any JavaScript', vi: 'Tạo một khối thông tin đóng mở thu gọn (accordion) gốc chuẩn trợ năng mà không cần bất kỳ đoạn mã JavaScript nào' },
        { en: 'To summarize text with AI automatically', vi: 'Tự động tóm tắt văn bản bằng AI' },
        { en: 'To convert paragraphs into bullet points', vi: 'Chuyển đoạn văn thành danh sách gạch đầu dòng' },
        { en: 'To encrypt secret text with passwords', vi: 'Mã hóa văn bản bí mật bằng mật khẩu' }
      ],
      ans: 0,
      expEn: '<details> and <summary> provide declarative accordion behavior with full keyboard and screen reader accessibility.',
      expVi: '<details> và <summary> mang lại tính năng accordion khai báo có hỗ trợ đầy đủ bàn phím và trợ thính.'
    },
    {
      id: 'html_q_14_2',
      type: 'single_choice',
      qEn: 'What boolean attribute makes a <details> element open by default on page load?',
      qVi: 'Thuộc tính boolean nào làm cho thẻ <details> mở sẵn theo mặc định khi tải trang?',
      options: [
        { en: 'open', vi: 'open' },
        { en: 'expanded', vi: 'expanded' },
        { en: 'visible', vi: 'visible' },
        { en: 'active', vi: 'active' }
      ],
      ans: 0,
      expEn: 'The open boolean attribute determines whether the disclosure is currently expanded.',
      expVi: 'Thuộc tính boolean open quyết định xem khối nội dung có đang mở hay không.'
    },
    {
      id: 'html_q_14_3',
      type: 'single_choice',
      qEn: 'What recent HTML5 attribute allows multiple <details> elements to act as an exclusive accordion (opening one automatically closes the others)?',
      qVi: 'Thuộc tính HTML5 nào cho phép nhiều thẻ <details> hoạt động như accordion độc quyền (mở mục này tự động đóng mục kia)?',
      options: [
        { en: 'name="shared-group-name"', vi: 'name="shared-group-name"' },
        { en: 'group="accordion"', vi: 'group="accordion"' },
        { en: 'mutex="true"', vi: 'mutex="true"' },
        { en: 'exclusive="all"', vi: 'exclusive="all"' }
      ],
      ans: 0,
      expEn: 'The name attribute groups details elements into a mutually exclusive accordion.',
      expVi: 'Thuộc tính name gom nhóm các thẻ details thành accordion loại trừ lẫn nhau.'
    },
    {
      id: 'html_q_14_4',
      type: 'single_choice',
      qEn: 'What is the native HTML5 element for creating accessible dialogs, popups, and modal windows?',
      qVi: 'Phần tử HTML5 gốc nào được dùng để tạo các hộp thoại, popup và cửa sổ modal chuẩn trợ năng?',
      options: [
        { en: '<dialog>', vi: '<dialog>' },
        { en: '<modal>', vi: '<modal>' },
        { en: '<popup>', vi: '<popup>' },
        { en: '<window>', vi: '<window>' }
      ],
      ans: 0,
      expEn: '<dialog> is the standardized element for modal and non-modal dialog boxes.',
      expVi: '<dialog> là phần tử tiêu chuẩn hóa cho các hộp thoại modal và non-modal.'
    },
    {
      id: 'html_q_14_5',
      type: 'single_choice',
      qEn: 'What is the difference between dialog.show() and dialog.showModal()?',
      qVi: 'Sự khác biệt giữa dialog.show() và dialog.showModal() là gì?',
      options: [
        { en: 'showModal() opens the dialog as a top-layer modal, trapping keyboard focus inside, blocking background interaction, and rendering ::backdrop; show() opens a non-modal popup', vi: 'showModal() mở hộp thoại ở lớp cao nhất dạng modal, khóa con trỏ phím bên trong, chặn thao tác nền và hiển thị lớp mờ ::backdrop; show() mở popup thường' },
        { en: 'show() only works on smartphones', vi: 'show() chỉ chạy trên điện thoại' },
        { en: 'showModal() requires a CSS animation library', vi: 'showModal() bắt buộc phải có thư viện hoạt hình CSS' },
        { en: 'show() deletes the dialog after 5 seconds', vi: 'show() tự xóa hộp thoại sau 5 giây' }
      ],
      ans: 0,
      expEn: 'showModal() enforces true modal semantics and top-layer browser stacking.',
      expVi: 'showModal() áp dụng đúng ngữ nghĩa modal và đưa hộp thoại lên top-layer của trình duyệt.'
    },
    {
      id: 'html_q_14_6',
      type: 'single_choice',
      qEn: 'What CSS pseudo-element is used to style the dark/blurred background backdrop behind an open <dialog>?',
      qVi: 'CSS pseudo-element nào được dùng để định kiểu lớp nền tối/mờ phía sau thẻ <dialog> đang mở?',
      options: [
        { en: 'dialog::backdrop', vi: 'dialog::backdrop' },
        { en: 'dialog::overlay', vi: 'dialog::overlay' },
        { en: 'dialog::shadow', vi: 'dialog::shadow' },
        { en: 'dialog::curtain', vi: 'dialog::curtain' }
      ],
      ans: 0,
      expEn: '::backdrop targets the full-viewport layer rendered behind top-layer dialogs.',
      expVi: '::backdrop định kiểu cho lớp phủ toàn màn hình nằm phía sau hộp thoại top-layer.'
    },
    {
      id: 'html_q_14_7',
      type: 'single_choice',
      qEn: 'What key automatically dismisses and closes an open modal dialog by default in browsers?',
      qVi: 'Phím nào trên bàn phím sẽ tự động đóng hộp thoại modal đang mở theo mặc định của trình duyệt?',
      options: [
        { en: 'The Escape (Esc) key', vi: 'Phím Escape (Esc)' },
        { en: 'The Backspace key', vi: 'Phím Backspace' },
        { en: 'The Spacebar key', vi: 'Phím Cách (Spacebar)' },
        { en: 'The Tab key', vi: 'Phím Tab' }
      ],
      ans: 0,
      expEn: 'Pressing Escape triggers the cancel event and closes modal dialogs natively.',
      expVi: 'Nhấn phím Escape kích hoạt sự kiện cancel và tự động đóng modal gốc.'
    },
    {
      id: 'html_q_14_8',
      type: 'single_choice',
      qEn: 'What does a <form method="dialog"> inside a <dialog> element do when submitted?',
      qVi: 'Thẻ <form method="dialog"> bên trong thẻ <dialog> làm gì khi được submit?',
      options: [
        { en: 'It automatically closes the dialog and sets dialog.returnValue to the value of the clicked submit button', vi: 'Nó tự động đóng hộp thoại và gán giá trị của nút submit vừa bấm vào dialog.returnValue' },
        { en: 'It sends an AJAX request to /dialog', vi: 'Nó gửi một request AJAX tới /dialog' },
        { en: 'It refreshes the entire web page', vi: 'Nó tải lại toàn bộ trang web' },
        { en: 'It opens another dialog on top', vi: 'Nó mở thêm một dialog khác đè lên' }
      ],
      ans: 0,
      expEn: 'method="dialog" provides native form-driven dialog dismissal without network I/O.',
      expVi: 'method="dialog" cung cấp cơ chế đóng dialog bằng form mà không gửi request qua mạng.'
    },
    {
      id: 'html_q_14_9',
      type: 'single_choice',
      qEn: 'What is the fundamental difference in purpose between <progress> and <meter>?',
      qVi: 'Sự khác biệt cốt lõi về mục đích giữa hai thẻ <progress> và <meter> là gì?',
      options: [
        { en: '<progress> is for tracking the progress of an ongoing task towards completion (e.g. file upload); <meter> is for measuring a scalar value within a known fixed range (e.g. disk usage, CPU temp)', vi: '<progress> dùng để theo dõi tiến trình hoàn thành của một công việc (như tải file); <meter> dùng để đo lường giá trị số học trong một thang đo cố định (như dung lượng ổ đĩa, nhiệt độ CPU)' },
        { en: '<progress> is only for numbers; <meter> is only for words', vi: '<progress> chỉ cho số; <meter> chỉ cho chữ' },
        { en: '<meter> is deprecated in HTML5', vi: '<meter> đã bị loại bỏ trong HTML5' },
        { en: '<progress> requires a Wi-Fi connection', vi: '<progress> yêu cầu kết nối Wi-Fi' }
      ],
      ans: 0,
      expEn: 'progress = task progression over time; meter = gauge measurement at a point in time.',
      expVi: 'progress = tiến độ công việc theo thời gian; meter = thước đo giá trị tại một thời điểm.'
    },
    {
      id: 'html_q_14_10',
      type: 'single_choice',
      qEn: 'How do you create an "indeterminate" progress bar (a moving candy-stripe animation indicating work in progress of unknown duration)?',
      qVi: 'Bạn tạo thanh tiến độ "không xác định" (thanh chạy liên tục báo hiệu đang xử lý chưa rõ thời gian) bằng cách nào?',
      options: [
        { en: 'Omit the "value" attribute from the <progress> tag (<progress></progress>)', vi: 'Bỏ thuộc tính "value" khỏi thẻ <progress> (<progress></progress>)' },
        { en: 'Set value="unknown"', vi: 'Đặt value="unknown"' },
        { en: 'Set value="-1"', vi: 'Đặt value="-1"' },
        { en: 'Set type="loading"', vi: 'Đặt type="loading"' }
      ],
      ans: 0,
      expEn: 'A progress element without a value attribute represents an indeterminate state.',
      expVi: 'Thẻ progress không có thuộc tính value đại diện cho trạng thái không xác định thời lượng.'
    },
    {
      id: 'html_q_14_11',
      type: 'single_choice',
      qEn: 'What attributes on <meter> define the warning and danger threshold boundaries?',
      qVi: 'Những thuộc tính nào trên <meter> định nghĩa các ranh giới ngưỡng cảnh báo và nguy hiểm?',
      options: [
        { en: 'min, max, low, high, and optimum', vi: 'min, max, low, high, và optimum' },
        { en: 'danger, warn, safe, and alert', vi: 'danger, warn, safe, và alert' },
        { en: 'red, yellow, green, and blue', vi: 'red, yellow, green, và blue' },
        { en: 'start, middle, and finish', vi: 'start, middle, và finish' }
      ],
      ans: 0,
      expEn: 'low, high, and optimum segment the meter into good, warning, and critical ranges.',
      expVi: 'low, high, và optimum phân chia thước đo thành các vùng an toàn, cảnh báo và nguy cấp.'
    },
    {
      id: 'html_q_14_12',
      type: 'single_choice',
      qEn: 'What happens if a user presses Enter or Space while focused on a <summary> element?',
      qVi: 'Điều gì xảy ra nếu người dùng nhấn Enter hoặc Phím Cách khi đang focus vào thẻ <summary>?',
      options: [
        { en: 'The browser toggles the parent <details> open or closed automatically', vi: 'Trình duyệt tự động bật mở hoặc đóng lại thẻ <details> cha' },
        { en: 'The entire web page scrolls to the top', vi: 'Toàn bộ trang web cuộn lên trên cùng' },
        { en: 'A popup alert is displayed', vi: 'Hiện popup cảnh báo' },
        { en: 'The text inside summary is deleted', vi: 'Chữ trong summary bị xóa' }
      ],
      ans: 0,
      expEn: '<summary> has built-in native keyboard event listeners for Space and Enter.',
      expVi: '<summary> có sẵn bộ xử lý sự kiện bàn phím gốc cho phím Space và Enter.'
    },
    {
      id: 'html_q_14_13',
      type: 'single_choice',
      qEn: 'Can you nest child elements (like headings, images, or code blocks) inside a <details> element?',
      qVi: 'Bạn có thể lồng các phần tử con (như tiêu đề, ảnh hoặc khối mã code) bên trong thẻ <details> không?',
      options: [
        { en: 'Yes, <details> can contain any standard HTML elements beneath the <summary>', vi: 'Có, <details> có thể chứa bất kỳ phần tử HTML tiêu chuẩn nào bên dưới thẻ <summary>' },
        { en: 'No, details can only contain raw unformatted plain text', vi: 'Không, details chỉ chứa được chữ thô không định dạng' },
        { en: 'Only <p> tags are allowed', vi: 'Chỉ cho phép thẻ <p>' },
        { en: 'Only if using JavaScript templates', vi: 'Chỉ khi dùng template JavaScript' }
      ],
      ans: 0,
      expEn: '<details> accepts flow content, allowing complex accordions with lists, forms, and tables.',
      expVi: '<details> chấp nhận flow content, cho phép chứa danh sách, form và bảng biểu bên trong.'
    },
    {
      id: 'html_q_14_14',
      type: 'single_choice',
      qEn: 'Why should you include text inside <progress>80%</progress> between the tags?',
      qVi: 'Tại sao bạn nên ghi chữ bên trong thẻ <progress>80%</progress>?',
      options: [
        { en: 'As accessible fallback text for older browsers that do not render the visual graphical bar', vi: 'Làm văn bản hiển thị dự phòng cho các trình duyệt cũ không vẽ được thanh đồ họa' },
        { en: 'To make the bar blue', vi: 'Để làm thanh màu xanh' },
        { en: 'To speed up the progress animation', vi: 'Để tăng tốc hoạt ảnh của thanh' },
        { en: 'It is required by CSS syntax', vi: 'Bắt buộc bởi cú pháp CSS' }
      ],
      ans: 0,
      expEn: 'Text between <progress> and </progress> provides legacy fallback representation.',
      expVi: 'Chữ giữa thẻ mở và đóng <progress> cung cấp nội dung hiển thị dự phòng cho trình duyệt cũ.'
    },
    {
      id: 'html_q_14_15',
      type: 'single_choice',
      qEn: 'What happens when a <dialog> modal is opened with dialog.showModal() regarding background elements?',
      qVi: 'Điều gì xảy ra với các phần tử ở trang nền khi mở modal bằng dialog.showModal()?',
      options: [
        { en: 'The browser inertly isolates all other elements on the page, preventing clicks, tab navigation, and screen reader access to background content (focus trapping)', vi: 'Trình duyệt cô lập toàn bộ phần tử nền, ngăn click chuột, chặn phím Tab và ngăn trình đọc màn hình đọc nội dung nền (bẫy focus)' },
        { en: 'The background elements are deleted from memory', vi: 'Các phần tử nền bị xóa khỏi bộ nhớ' },
        { en: 'The background turns into a video game', vi: 'Nền biến thành trò chơi điện tử' },
        { en: 'The page disconnects from the internet', vi: 'Trang bị ngắt kết nối internet' }
      ],
      ans: 0,
      expEn: 'showModal() automatically enforces inert behavior on background DOM trees.',
      expVi: 'showModal() tự động áp dụng cơ chế inert ngăn tương tác với toàn bộ cây DOM phía sau.'
    },
    {
      id: 'html_q_14_16',
      type: 'single_choice',
      qEn: 'What event fires on the <details> element whenever it is opened or closed?',
      qVi: 'Sự kiện nào được kích hoạt trên thẻ <details> mỗi khi nó được bật mở hoặc đóng lại?',
      options: [
        { en: 'The "toggle" event', vi: 'Sự kiện "toggle"' },
        { en: 'The "accordion" event', vi: 'Sự kiện "accordion"' },
        { en: 'The "expand" event', vi: 'Sự kiện "expand"' },
        { en: 'The "slide" event', vi: 'Sự kiện "slide"' }
      ],
      ans: 0,
      expEn: 'details dispatches a "toggle" event whenever its open attribute changes state.',
      expVi: 'details phát ra sự kiện "toggle" mỗi khi trạng thái thuộc tính open bị thay đổi.'
    }
  ]
};

console.log('Lesson 14 defined.');
