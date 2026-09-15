import { RawLessonSource } from './rawLessonType';

export const lesson8: RawLessonSource = {
  order: 8,
  id: 'html_lesson_8',
  moduleId: 'html_mod_2',
  levelId: 'basic',
  topicId: 'html_embeds_iframes',
  titleEn: 'Embedded Content: iframes, Security Sandboxing & Permission Policies',
  titleVi: 'Nội Dung Nhúng: iframe, Cơ Chế Sandbox Bảo Mật & Chính Sách Quyền Hạn',
  summaryEn: 'Master embedded external documents: <iframe>, <embed>, <object>, essential accessibility title attributes, loading="lazy", sandbox restrictions, and allow permissions.',
  summaryVi: 'Làm chủ nhúng tài liệu ngoài: <iframe>, <embed>, <object>, thuộc tính title trợ năng bắt buộc, loading="lazy", giới hạn bảo mật sandbox và chính sách quyền hạn allow.',
  estimatedMinutes: 15,
  introEn: 'Iframes allow embedding independent external browsing contexts—such as YouTube players, interactive maps, payment gateways, and third-party widgets—seamlessly inside a web page.',
  introVi: 'Iframe cho phép nhúng một ngữ cảnh duyệt web độc lập từ bên ngoài—như trình phát video YouTube, bản đồ tương tác, cổng thanh toán hoặc widget bên thứ 3—vào trong trang web một cách mượt mà.',
  conceptEn: 'An <iframe> embeds another HTML document. Every iframe MUST have a descriptive title attribute for screen readers. For security against clickjacking, XSS, and unauthorized access, use the sandbox attribute (e.g. sandbox="allow-scripts allow-same-origin") to apply least-privilege permissions. Use loading="lazy" to defer downloading off-screen embeds until needed. Use allow (Permissions Policy) to control camera, microphone, geolocation, and fullscreen access.',
  conceptVi: 'Thẻ <iframe> nhúng một tài liệu HTML khác. Mọi iframe BẮT BUỘC phải có thuộc tính title mô tả rõ nội dung để hỗ trợ trình đọc màn hình. Để ngăn chặn các cuộc tấn công clickjacking và XSS, hãy dùng thuộc tính sandbox (ví dụ sandbox="allow-scripts allow-same-origin") tuân theo nguyên tắc phân quyền tối thiểu. Dùng loading="lazy" để hoãn tải iframe khi chưa cuộn tới. Dùng allow để cấp quyền truy cập camera, mic, vị trí và toàn màn hình.',
  syntax: '<iframe\n  src="https://example.com/embed"\n  title="Interactive Data Visualization"\n  width="800"\n  height="450"\n  loading="lazy"\n  sandbox="allow-scripts allow-same-origin"\n  allow="fullscreen">\n</iframe>',
  ex1TitleEn: 'Secure Sandboxed YouTube Video Embed',
  ex1TitleVi: 'Nhúng Video YouTube Bảo Mật Với Sandbox',
  ex1Code: '<iframe\n  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"\n  title="HTML5 Semantic Architecture Masterclass"\n  width="560"\n  height="315"\n  style="border:0; border-radius:8px;"\n  loading="lazy"\n  sandbox="allow-scripts allow-same-origin allow-presentation"\n  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n  allowfullscreen>\n</iframe>',
  ex1ExpEn: 'Includes a mandatory descriptive title, lazy loading, secure sandboxing tokens, and explicit hardware permissions.',
  ex1ExpVi: 'Bao gồm tiêu đề title bắt buộc cho trợ năng, lazy loading, các mã phân quyền sandbox bảo mật và quyền truy cập phần cứng rõ ràng.',
  ex2TitleEn: 'Interactive Map Embed with Dimensions and Title',
  ex2TitleVi: 'Nhúng Bản Đồ Tương Tác Kèm Kích Thước Và Title',
  ex2Code: '<iframe\n  src="https://maps.google.com/maps?q=Hanoi&output=embed"\n  title="4TM Technology Campus Location Map"\n  width="600"\n  height="400"\n  style="border:1px solid #cbd5e1; border-radius:8px;"\n  loading="lazy"\n  referrerpolicy="no-referrer-when-downgrade">\n</iframe>',
  ex2ExpEn: 'Uses referrerpolicy and title to ensure privacy and screen reader context for interactive map widgets.',
  ex2ExpVi: 'Sử dụng referrerpolicy và title để bảo vệ quyền riêng tư và cung cấp ngữ cảnh cho người dùng khiếm thị.',
  mistake1En: 'Omitting the title attribute on <iframe>',
  mistake1Vi: 'Quên thêm thuộc tính title trên thẻ <iframe>',
  correction1En: 'Always provide a meaningful, descriptive title attribute so screen readers announce what the frame contains.',
  correction1Vi: 'Luôn cung cấp thuộc tính title có ý nghĩa để trình đọc màn hình thông báo rõ nội dung của khung nhúng.',
  mistake2En: 'Using bare sandbox="" without tokens and wondering why scripts fail to execute',
  mistake2Vi: 'Dùng sandbox="" rỗng không kèm token rồi thắc mắc tại sao mã script không chạy',
  correction2En: 'An empty sandbox attribute enforces maximum security (blocking all scripts, forms, popups, and same-origin cookies). Add allow-scripts if script execution is intended.',
  correction2Vi: 'sandbox rỗng áp dụng mức bảo mật tối đa (chặn toàn bộ script, form, popup và cookie). Hãy thêm allow-scripts nếu cần chạy script.',
  tipEn: 'Combining allow-scripts and allow-same-origin in the same sandbox allows the framed page to remove its own sandbox attribute if served from the exact same origin—use a separate subdomain for untrusted user uploads.',
  tipVi: 'Kết hợp allow-scripts và allow-same-origin cho phép trang được nhúng tự gỡ bỏ sandbox nếu cùng domain gốc—hãy dùng subdomain riêng cho nội dung người dùng tải lên.',
  practiceTaskEn: 'Embed a Protected Interactive Widget',
  practiceTaskVi: 'Nhúng một widget tương tác được bảo vệ an toàn',
  practiceInstEn: 'Create an <iframe> with src="https://widget.4tm.io", title="Live Stock Ticker", width="400", height="250", loading="lazy", and sandbox="allow-scripts".',
  practiceInstVi: 'Tạo thẻ <iframe> với src="https://widget.4tm.io", title="Live Stock Ticker", width="400", height="250", loading="lazy", và sandbox="allow-scripts".',
  practiceStarter: '<iframe src="https://widget.4tm.io">\n</iframe>',
  practiceSolution: '<iframe\n  src="https://widget.4tm.io"\n  title="Live Stock Ticker"\n  width="400"\n  height="250"\n  loading="lazy"\n  sandbox="allow-scripts">\n</iframe>',
  practicePatterns: ['<iframe', 'src="https://widget.4tm.io"', 'title="Live Stock Ticker"', 'width="400"', 'height="250"', 'loading="lazy"', 'sandbox="allow-scripts"', '</iframe>'],
  practiceHintEn: 'Add title, width, height, loading="lazy", and sandbox="allow-scripts".',
  practiceHintVi: 'Thêm title, width, height, loading="lazy", và sandbox="allow-scripts".',

  exercises: [
    {
      id: 'html_ex_8_1',
      type: 'complete_code',
      titleEn: 'Add Required Accessibility Title to iframe',
      titleVi: 'Thêm thuộc tính title trợ năng bắt buộc vào iframe',
      instEn: 'Add title="Customer Feedback Survey Form" to the <iframe>.',
      instVi: 'Thêm title="Customer Feedback Survey Form" vào thẻ <iframe>.',
      starter: '<iframe src="https://forms.4tm.io/survey" width="600" height="800">\n</iframe>',
      solution: '<iframe src="https://forms.4tm.io/survey" title="Customer Feedback Survey Form" width="600" height="800">\n</iframe>',
      hintEn: 'Add the title attribute with the specified survey description.',
      hintVi: 'Thêm thuộc tính title với mô tả khảo sát được chỉ định.',
      expEn: 'WCAG 2.1 requires all iframes to have descriptive title attributes.',
      expVi: 'Chuẩn WCAG 2.1 yêu cầu mọi iframe phải có thuộc tính title mô tả rõ ràng.'
    },
    {
      id: 'html_ex_8_2',
      type: 'fix_code',
      titleEn: 'Enable JavaScript in Sandboxed iframe',
      titleVi: 'Bật quyền thực thi JavaScript trong iframe có sandbox',
      instEn: 'Fix the sandbox attribute so the embedded analytics chart can execute scripts.',
      instVi: 'Sửa thuộc tính sandbox để biểu đồ phân tích được nhúng có thể chạy script.',
      starter: '<iframe src="https://charts.4tm.io" title="Traffic Chart" sandbox=""></iframe>',
      solution: '<iframe src="https://charts.4tm.io" title="Traffic Chart" sandbox="allow-scripts"></iframe>',
      hintEn: 'Add "allow-scripts" inside the sandbox attribute value.',
      hintVi: 'Thêm "allow-scripts" vào bên trong giá trị thuộc tính sandbox.',
      expEn: 'sandbox="allow-scripts" grants the iframe execution rights for JavaScript.',
      expVi: 'sandbox="allow-scripts" cấp quyền thực thi JavaScript cho nội dung bên trong iframe.'
    },
    {
      id: 'html_ex_8_3',
      type: 'write_code',
      titleEn: 'Create Lazy-Loaded Fullscreen Video Embed',
      titleVi: 'Tạo iframe video tải trễ cho phép toàn màn hình',
      instEn: 'Write an <iframe> with src="https://player.4tm.io/v/1", title="Product Demo", loading="lazy", and allowfullscreen.',
      instVi: 'Viết thẻ <iframe> có src="https://player.4tm.io/v/1", title="Product Demo", loading="lazy", và allowfullscreen.',
      starter: '',
      solution: '<iframe src="https://player.4tm.io/v/1" title="Product Demo" loading="lazy" allowfullscreen></iframe>',
      hintEn: 'Include src, title, loading="lazy", and allowfullscreen attributes.',
      hintVi: 'Bao gồm các thuộc tính src, title, loading="lazy", và allowfullscreen.',
      expEn: 'allowfullscreen allows the embedded player to enter full-screen video playback mode.',
      expVi: 'allowfullscreen cho phép trình phát video bên trong phóng to toàn màn hình.'
    },
    {
      id: 'html_ex_8_4',
      type: 'modify_example',
      titleEn: 'Add Permissions Policy Allow Attribute',
      titleVi: 'Thêm chính sách quyền hạn qua thuộc tính allow',
      instEn: 'Add allow="camera; microphone" to allow the embedded video consultation tool access to media devices.',
      instVi: 'Thêm allow="camera; microphone" để cấp quyền truy cập thiết bị ghi hình/thu âm cho công cụ gọi video.',
      starter: '<iframe src="https://meet.4tm.io/room/101" title="Video Meeting" width="800" height="600"></iframe>',
      solution: '<iframe src="https://meet.4tm.io/room/101" title="Video Meeting" width="800" height="600" allow="camera; microphone"></iframe>',
      hintEn: 'Add allow="camera; microphone" attribute to the <iframe>.',
      hintVi: 'Thêm thuộc tính allow="camera; microphone" vào thẻ <iframe>.',
      expEn: 'The allow attribute controls Permissions Policy features inside the browsing context.',
      expVi: 'Thuộc tính allow quản lý chính sách cấp quyền cho các API thiết bị trong ngữ cảnh duyệt nhúng.'
    },
    {
      id: 'html_ex_8_5',
      type: 'predict_output',
      titleEn: 'Identify Default Security State of Empty Sandbox',
      titleVi: 'Nhận biết trạng thái bảo mật mặc định của sandbox rỗng',
      instEn: 'If sandbox="" is declared with no tokens, are form submissions inside the iframe allowed (yes/no)?',
      instVi: 'Nếu khai báo sandbox="" rỗng, việc gửi biểu mẫu form trong iframe có được phép không (yes/no)?',
      starter: '<!-- Type yes or no -->\n<p>Allowed: </p>',
      solution: '<p>Allowed: no</p>',
      hintEn: 'An empty sandbox blocks forms, popups, scripts, and cookies.',
      hintVi: 'sandbox rỗng sẽ chặn toàn bộ form, popup, script và cookie.',
      expEn: 'sandbox="" applies the most restrictive security constraints, blocking form submissions unless allow-forms is specified.',
      expVi: 'sandbox="" áp dụng mức hạn chế bảo mật cao nhất, chặn gửi form trừ khi có allow-forms.'
    }
  ],

  challenge: {
    id: 'html_ch_8',
    titleEn: 'Secure Multi-Provider Dashboard Embed Section',
    titleVi: 'Khu vực nhúng bảng điều khiển đa nhà cung cấp an toàn cao',
    descEn: 'Build an enterprise analytics integration container with a secure sandboxed chart iframe and an accessible contact form embed.',
    descVi: 'Xây dựng khu vực tích hợp bảng điều khiển doanh nghiệp gồm iframe biểu đồ có sandbox bảo mật và iframe form liên hệ chuẩn trợ năng.',
    requirements: [
      { en: 'Create a <section> with <h2>External Integrations</h2>', vi: 'Tạo một <section> có <h2>External Integrations</h2>' },
      { en: 'Add an <iframe> for "Live Telemetry Chart" with src="https://analytics.4tm.io", width="600", height="350", loading="lazy", and sandbox="allow-scripts allow-same-origin"', vi: 'Thêm <iframe> cho "Live Telemetry Chart" có src="https://analytics.4tm.io", width="600", height="350", loading="lazy", và sandbox="allow-scripts allow-same-origin"' },
      { en: 'Add a second <iframe> for "Support Feedback" with src="https://support.4tm.io/form", width="600", height="400", loading="lazy", and sandbox="allow-forms allow-scripts"', vi: 'Thêm <iframe> thứ 2 cho "Support Feedback" có src="https://support.4tm.io/form", width="600", height="400", loading="lazy", và sandbox="allow-forms allow-scripts"' }
    ],
    starter: '<!-- Build multi-provider integration section here -->\n',
    solution: '<section>\n  <h2>External Integrations</h2>\n  <iframe\n    src="https://analytics.4tm.io"\n    title="Live Telemetry Chart"\n    width="600"\n    height="350"\n    loading="lazy"\n    sandbox="allow-scripts allow-same-origin">\n  </iframe>\n  <iframe\n    src="https://support.4tm.io/form"\n    title="Support Feedback"\n    width="600"\n    height="400"\n    loading="lazy"\n    sandbox="allow-forms allow-scripts">\n  </iframe>\n</section>',
    hints: [
      { en: 'Both iframes require unique descriptive titles', vi: 'Cả hai iframe đều bắt buộc có title mô tả độc nhất' },
      { en: 'Use sandbox tokens tailored to each widget\'s functionality', vi: 'Dùng token sandbox phù hợp đúng với tính năng của từng widget' }
    ],
    expEn: 'Production-ready embed architecture with strict least-privilege sandboxing and complete accessibility.',
    expVi: 'Kiến trúc nhúng chuẩn sản xuất với phân quyền tối thiểu và bảo đảm trợ năng tuyệt đối.'
  },

  challengeVariants: [
    {
      id: 'html_ch_8_v1',
      titleEn: 'Variant 1: Embedded PDF Document Viewer with <object>',
      titleVi: 'Biến thể 1: Trình xem tài liệu PDF nhúng bằng thẻ <object>',
      descEn: 'Embed a downloadable PDF document using <object> with fallback text link for unsupported devices.',
      descVi: 'Nhúng tệp tài liệu PDF bằng thẻ <object> có liên kết dự phòng cho thiết bị không hỗ trợ xem trực tiếp.',
      requirements: [
        { en: 'Use <object data="/docs/annual-report.pdf" type="application/pdf" width="800" height="600">', vi: 'Dùng <object data="/docs/annual-report.pdf" type="application/pdf" width="800" height="600">' },
        { en: 'Include fallback link <p>Unable to display PDF. <a href="/docs/annual-report.pdf">Download PDF</a>.</p> inside <object>', vi: 'Bao gồm liên kết dự phòng <p>Unable to display PDF. <a href="/docs/annual-report.pdf">Download PDF</a>.</p> bên trong <object>' }
      ],
      starter: '<div class="pdf-container">\n  \n</div>',
      solution: '<div class="pdf-container">\n  <object data="/docs/annual-report.pdf" type="application/pdf" width="800" height="600">\n    <p>Unable to display PDF. <a href="/docs/annual-report.pdf">Download PDF</a>.</p>\n  </object>\n</div>',
      expEn: '<object> provides clean native fallback markup when the browser cannot render the plugin/MIME type.',
      expVi: '<object> cung cấp nội dung dự phòng gọn gàng khi trình duyệt không hỗ trợ trực tiếp tệp tin đó.'
    },
    {
      id: 'html_ch_8_v2',
      titleEn: 'Variant 2: Payment Gateway Hosted Field Frame',
      titleVi: 'Biến thể 2: Khung nhúng thanh toán an toàn cách ly',
      descEn: 'Build a PCI-DSS compliant payment card field iframe isolated with sandbox and restricted permissions.',
      descVi: 'Xây dựng iframe nhập thẻ thanh toán chuẩn PCI-DSS được cách ly bảo mật với sandbox.',
      requirements: [
        { en: 'src="https://secure-pay.4tm.io/checkout"', vi: 'src="https://secure-pay.4tm.io/checkout"' },
        { en: 'sandbox="allow-scripts allow-forms"', vi: 'sandbox="allow-scripts allow-forms"' },
        { en: 'allow="payment"', vi: 'allow="payment"' },
        { en: 'referrerpolicy="strict-origin-when-cross-origin"', vi: 'referrerpolicy="strict-origin-when-cross-origin"' }
      ],
      starter: '<div class="checkout-frame">\n  \n</div>',
      solution: '<div class="checkout-frame">\n  <iframe\n    src="https://secure-pay.4tm.io/checkout"\n    title="Secure Payment Card Entry"\n    width="100%"\n    height="300"\n    sandbox="allow-scripts allow-forms"\n    allow="payment"\n    referrerpolicy="strict-origin-when-cross-origin">\n  </iframe>\n</div>',
      expEn: 'Limits payment fields from accessing host DOM while enabling payment request API and secure checkout submissions.',
      expVi: 'Ngăn khung thanh toán truy cập DOM trang chủ nhưng vẫn cho phép gửi form và gọi API thanh toán an toàn.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_8_1',
      type: 'single_choice',
      qEn: 'Why is the "title" attribute strictly required on every <iframe> for accessibility?',
      qVi: 'Tại sao thuộc tính "title" là bắt buộc trên mọi thẻ <iframe> đối với tính trợ năng?',
      options: [
        { en: 'Screen readers read the title aloud so blind users understand the purpose and content of the embedded frame before deciding to enter it', vi: 'Trình đọc màn hình đọc to title giúp người khiếm thị hiểu rõ mục đích của khung nhúng trước khi quyết định duyệt vào' },
        { en: 'It sets the browser tab title for the entire parent website', vi: 'Nó đặt tiêu đề tab trình duyệt cho toàn bộ website cha' },
        { en: 'It prevents the iframe from loading ads', vi: 'Nó ngăn iframe tải quảng cáo' },
        { en: 'It makes the iframe responsive on mobile', vi: 'Nó làm cho iframe tự động co giãn trên điện thoại' }
      ],
      ans: 0,
      expEn: 'The title attribute provides an accessible name for the browsing context.',
      expVi: 'Thuộc tính title cung cấp tên trợ năng cho ngữ cảnh duyệt web được nhúng.'
    },
    {
      id: 'html_q_8_2',
      type: 'single_choice',
      qEn: 'What does the "sandbox" attribute on an <iframe> do when used without any tokens (sandbox="")?',
      qVi: 'Thuộc tính "sandbox" trên <iframe> làm gì khi được khai báo rỗng không kèm token nào (sandbox="")?',
      options: [
        { en: 'Enforces maximum security restrictions: disables JavaScript execution, form submissions, popups, and treats the frame as coming from a unique origin', vi: 'Áp dụng mức giới hạn bảo mật tối đa: tắt hoàn toàn JavaScript, chặn gửi form, chặn popup và cách ly hoàn toàn như một origin lạ' },
        { en: 'Deletes the iframe from the DOM', vi: 'Xóa iframe khỏi cây DOM' },
        { en: 'Turns the iframe into a sandbox video game', vi: 'Biến iframe thành trò chơi video sandbox' },
        { en: 'Allows full unrestricted access to the host window', vi: 'Cho phép truy cập toàn quyền không giới hạn vào cửa sổ cha' }
      ],
      ans: 0,
      expEn: 'An empty sandbox activates all security restrictions by default.',
      expVi: 'sandbox rỗng kích hoạt tất cả các rào chắn bảo mật theo mặc định.'
    },
    {
      id: 'html_q_8_3',
      type: 'single_choice',
      qEn: 'Which sandbox token allows JavaScript to run inside an <iframe>?',
      qVi: 'Token sandbox nào cho phép JavaScript thực thi bên trong thẻ <iframe>?',
      options: [
        { en: 'allow-scripts', vi: 'allow-scripts' },
        { en: 'allow-javascript', vi: 'allow-javascript' },
        { en: 'enable-js', vi: 'enable-js' },
        { en: 'allow-code', vi: 'allow-code' }
      ],
      ans: 0,
      expEn: 'allow-scripts permits the embedded document to run its scripts.',
      expVi: 'allow-scripts cho phép tài liệu được nhúng chạy các đoạn mã script.'
    },
    {
      id: 'html_q_8_4',
      type: 'single_choice',
      qEn: 'Which sandbox token allows form submissions inside an <iframe>?',
      qVi: 'Token sandbox nào cho phép gửi dữ liệu biểu mẫu bên trong <iframe>?',
      options: [
        { en: 'allow-forms', vi: 'allow-forms' },
        { en: 'allow-submits', vi: 'allow-submits' },
        { en: 'allow-post', vi: 'allow-post' },
        { en: 'form-enabled', vi: 'form-enabled' }
      ],
      ans: 0,
      expEn: 'allow-forms enables form submission within the frame.',
      expVi: 'allow-forms bật tính năng gửi dữ liệu form bên trong khung nhúng.'
    },
    {
      id: 'html_q_8_5',
      type: 'single_choice',
      qEn: 'What does loading="lazy" on an <iframe> achieve?',
      qVi: 'Thuộc tính loading="lazy" trên thẻ <iframe> mang lại lợi ích gì?',
      options: [
        { en: 'Defers loading the iframe until it is scrolled near the user\'s viewport, drastically reducing initial page load time and bandwidth', vi: 'Hoãn tải iframe cho đến khi người dùng cuộn tới gần nó, giúp giảm mạnh thời gian tải trang ban đầu và tiết kiệm băng thông' },
        { en: 'Runs the iframe at 50% CPU speed', vi: 'Chạy iframe với 50% công suất CPU' },
        { en: 'Delays iframe loading by exactly 10 seconds after page load', vi: 'Trì hoãn tải iframe đúng 10 giây sau khi mở trang' },
        { en: 'Displays a spinning loading wheel inside the frame forever', vi: 'Hiển thị vòng xoay đang tải mãi mãi' }
      ],
      ans: 0,
      expEn: 'loading="lazy" optimizes performance by postponing network requests for offscreen frames.',
      expVi: 'loading="lazy" tối ưu hiệu năng bằng cách hoãn gửi yêu cầu mạng cho các iframe nằm ngoài màn hình.'
    },
    {
      id: 'html_q_8_6',
      type: 'single_choice',
      qEn: 'Which attribute replaces older iframe attributes like frameborder, scrolling, and marginwidth in modern HTML5?',
      qVi: 'Thuộc tính/công cụ nào thay thế các thuộc tính cũ như frameborder, scrolling, marginwidth trong HTML5 hiện đại?',
      options: [
        { en: 'CSS styling (e.g. style="border:0;", overflow, margin)', vi: 'Định kiểu CSS (như style="border:0;", overflow, margin)' },
        { en: 'frame-config=""', vi: 'frame-config=""' },
        { en: 'layout="none"', vi: 'layout="none"' },
        { en: 'modern-frame="true"', vi: 'modern-frame="true"' }
      ],
      ans: 0,
      expEn: 'Presentational iframe attributes (frameborder, scrolling) are obsolete; use CSS.',
      expVi: 'Các thuộc tính giao diện cũ của iframe đã lỗi thời; hãy dùng CSS.'
    },
    {
      id: 'html_q_8_7',
      type: 'single_choice',
      qEn: 'What does the "allow" attribute (Permissions Policy) on an <iframe> do?',
      qVi: 'Thuộc tính "allow" (Chính sách quyền hạn) trên <iframe> có chức năng gì?',
      options: [
        { en: 'Explicitly grants or restricts access to powerful browser features like camera, microphone, geolocation, and payment request', vi: 'Chỉ định cấp hoặc chặn quyền truy cập vào các tính năng mạnh mẽ như camera, micro, vị trí địa lý và API thanh toán' },
        { en: 'Controls CSS font permissions', vi: 'Quản lý quyền sử dụng font chữ CSS' },
        { en: 'Grants administrator access to the web server', vi: 'Cấp quyền quản trị viên cho máy chủ web' },
        { en: 'Enables downloading ZIP files without user consent', vi: 'Cho phép tải file ZIP mà không cần hỏi người dùng' }
      ],
      ans: 0,
      expEn: 'allow defines the feature policy for the embedded document context.',
      expVi: 'allow xác định chính sách tính năng cho ngữ cảnh tài liệu được nhúng.'
    },
    {
      id: 'html_q_8_8',
      type: 'single_choice',
      qEn: 'What HTTP header can a website send to prevent other websites from embedding it in an <iframe> (protecting against clickjacking)?',
      qVi: 'Header HTTP nào được trang web dùng để ngăn trang web khác nhúng nó vào <iframe> (chống clickjacking)?',
      options: [
        { en: 'X-Frame-Options: DENY (or CSP frame-ancestors \'none\')', vi: 'X-Frame-Options: DENY (hoặc CSP frame-ancestors \'none\')' },
        { en: 'Allow-Iframe: false', vi: 'Allow-Iframe: false' },
        { en: 'No-Embed: true', vi: 'No-Embed: true' },
        { en: 'Block-Parent-Window: 1', vi: 'Block-Parent-Window: 1' }
      ],
      ans: 0,
      expEn: 'X-Frame-Options and Content-Security-Policy (frame-ancestors) protect sites from being framed maliciously.',
      expVi: 'X-Frame-Options và CSP frame-ancestors bảo vệ trang web khỏi bị tấn công nhúng frame lừa đảo.'
    },
    {
      id: 'html_q_8_9',
      type: 'single_choice',
      qEn: 'What is the purpose of the <object> element in modern HTML5?',
      qVi: 'Mục đích của phần tử <object> trong HTML5 hiện đại là gì?',
      options: [
        { en: 'To embed external multimedia resources like PDF documents, SVG graphics, or media plugins with fallback HTML content', vi: 'Nhúng các tài nguyên đa phương tiện ngoài như tệp PDF, đồ họa SVG hoặc plugin kèm nội dung dự phòng' },
        { en: 'To instantiate JavaScript object literals', vi: 'Khởi tạo đối tượng JavaScript literal' },
        { en: 'To create 3D WebGL physics engines', vi: 'Tạo engine vật lý 3D WebGL' },
        { en: 'To replace the <body> tag', vi: 'Thay thế thẻ <body>' }
      ],
      ans: 0,
      expEn: '<object> embeds external files and renders child elements if the file cannot be displayed.',
      expVi: '<object> nhúng tệp tin ngoài và hiển thị phần tử con bên trong nếu tệp đó không đọc được.'
    },
    {
      id: 'html_q_8_10',
      type: 'single_choice',
      qEn: 'What is the primary difference between <embed> and <object>?',
      qVi: 'Sự khác biệt chính giữa <embed> và <object> là gì?',
      options: [
        { en: '<embed> is a void self-closing tag with no fallback content, while <object> is a container that supports rich fallback HTML between its tags', vi: '<embed> là thẻ tự đóng không có nội dung dự phòng, trong khi <object> là thẻ đóng/mở có hỗ trợ nội dung dự phòng bên trong' },
        { en: '<embed> is only for audio, <object> is only for text', vi: '<embed> chỉ cho âm thanh, <object> chỉ cho chữ' },
        { en: '<object> was deleted in HTML5', vi: '<object> đã bị xóa trong HTML5' },
        { en: '<embed> requires Flash Player', vi: '<embed> bắt buộc phải có Flash Player' }
      ],
      ans: 0,
      expEn: '<embed> is an empty element; <object> allows fallback markup if resource loading fails.',
      expVi: '<embed> là phần tử rỗng; <object> cho phép chứa khối HTML dự phòng khi tải thất bại.'
    },
    {
      id: 'html_q_8_11',
      type: 'single_choice',
      qEn: 'What does sandbox="allow-same-origin" do?',
      qVi: 'sandbox="allow-same-origin" có tác dụng gì?',
      options: [
        { en: 'Allows the embedded document to retain its real origin, enabling access to its own cookies, localStorage, and session storage', vi: 'Cho phép tài liệu được nhúng giữ nguyên domain gốc thực tế, truy cập cookie, localStorage và session của chính nó' },
        { en: 'Allows the iframe to read the user\'s local hard drive files', vi: 'Cho phép iframe đọc tệp tin trên ổ cứng máy người dùng' },
        { en: 'Forces the parent window to redirect to the iframe\'s URL', vi: 'Ép cửa sổ cha chuyển hướng sang URL của iframe' },
        { en: 'Removes all CSS stylesheets', vi: 'Xóa toàn bộ file CSS' }
      ],
      ans: 0,
      expEn: 'Without allow-same-origin, a sandboxed frame is assigned an opaque unique origin.',
      expVi: 'Nếu thiếu allow-same-origin, iframe có sandbox sẽ bị gán một origin ẩn danh cô lập hoàn toàn.'
    },
    {
      id: 'html_q_8_12',
      type: 'single_choice',
      qEn: 'What happens if a sandboxed iframe attempts to open a popup window (via window.open) without "allow-popups"?',
      qVi: 'Điều gì xảy ra nếu iframe có sandbox cố gắng mở cửa sổ popup (qua window.open) mà không có token "allow-popups"?',
      options: [
        { en: 'The browser silently blocks the popup window', vi: 'Trình duyệt sẽ tự động chặn cửa sổ popup đó' },
        { en: 'The parent page immediately closes', vi: 'Trang cha sẽ bị đóng lập tức' },
        { en: 'The browser displays a blue screen', vi: 'Trình duyệt hiện màn hình xanh' },
        { en: 'The user is logged out of the computer', vi: 'Người dùng bị đăng xuất khỏi máy tính' }
      ],
      ans: 0,
      expEn: 'Popups originating from sandboxed frames fail silently unless allow-popups is declared.',
      expVi: 'Popup từ iframe có sandbox sẽ bị chặn hoàn toàn trừ khi có khai báo allow-popups.'
    },
    {
      id: 'html_q_8_13',
      type: 'single_choice',
      qEn: 'What does the "srcdoc" attribute on an <iframe> do?',
      qVi: 'Thuộc tính "srcdoc" trên thẻ <iframe> làm gì?',
      options: [
        { en: 'Allows embedding raw inline HTML markup directly inside the attribute to render in the frame without an external URL request', vi: 'Cho phép nhúng trực tiếp chuỗi mã HTML nội tuyến vào thuộc tính để hiển thị mà không cần gửi request tới URL ngoài' },
        { en: 'Points to a Microsoft Word .docx file', vi: 'Trỏ tới tệp tin Microsoft Word .docx' },
        { en: 'Downloads a documentation manual', vi: 'Tải sách hướng dẫn sử dụng' },
        { en: 'Validates HTML syntax with W3C', vi: 'Kiểm tra cú pháp HTML với W3C' }
      ],
      ans: 0,
      expEn: 'srcdoc overrides src with inline HTML code, ideal for sandboxed code runners and preview editors.',
      expVi: 'srcdoc ghi đè src bằng mã HTML trực tiếp, cực kỳ lý tưởng cho các trình chạy code và xem trước bài học.'
    },
    {
      id: 'html_q_8_14',
      type: 'single_choice',
      qEn: 'Why should you include width and height attributes directly on the <iframe> tag?',
      qVi: 'Tại sao bạn nên khai báo trực tiếp thuộc tính width và height trên thẻ <iframe>?',
      options: [
        { en: 'It allows the browser to calculate the aspect ratio before the iframe content loads, preventing Cumulative Layout Shift (CLS)', vi: 'Giúp trình duyệt tính toán tỷ lệ khung hình trước khi tải xong nội dung, ngăn chặn hiện tượng giật vỡ layout (CLS)' },
        { en: 'Without width and height, the iframe cannot load any images', vi: 'Nếu không có width và height thì iframe không thể tải ảnh' },
        { en: 'It is required by Google search algorithms to rank in page 1', vi: 'Bắt buộc để thuật toán Google xếp hạng trang 1' },
        { en: 'It makes text inside the iframe bold', vi: 'Nó làm cho chữ trong iframe in đậm' }
      ],
      ans: 0,
      expEn: 'Explicit aspect ratio / dimensions prevent jarring content layout shifts during page rendering.',
      expVi: 'Kích thước rõ ràng giúp trình duyệt giữ sẵn chỗ trống, chống nhảy giao diện khi trang đang tải.'
    },
    {
      id: 'html_q_8_15',
      type: 'single_choice',
      qEn: 'Can JavaScript in a parent window access the DOM of an <iframe> from a different domain (e.g. google.com framed inside 4tm.io)?',
      qVi: 'JavaScript ở trang cha có thể truy cập cây DOM của một <iframe> thuộc domain khác (ví dụ google.com nhúng trong 4tm.io) không?',
      options: [
        { en: 'No, the Same-Origin Policy strictly blocks cross-origin DOM access to prevent data theft and privacy invasion', vi: 'Không, chính sách Same-Origin Policy nghiêm cấm việc truy cập DOM khác domain để chống đánh cắp dữ liệu riêng tư' },
        { en: 'Yes, any parent window can read everything inside any iframe', vi: 'Có, trang cha luôn đọc được mọi thứ trong mọi iframe' },
        { en: 'Only if using jQuery', vi: 'Chỉ khi dùng thư viện jQuery' },
        { en: 'Only on Windows operating systems', vi: 'Chỉ trên hệ điều hành Windows' }
      ],
      ans: 0,
      expEn: 'The browser Same-Origin Policy (SOP) strictly isolates DOM contexts across different domains.',
      expVi: 'Chính sách Same-Origin Policy cách ly an toàn cây DOM giữa các tên miền khác nhau.'
    },
    {
      id: 'html_q_8_16',
      type: 'single_choice',
      qEn: 'What standard Web API allows safe, cross-origin communication between a parent window and an embedded <iframe>?',
      qVi: 'API tiêu chuẩn nào của Web cho phép giao tiếp an toàn giữa trang cha và iframe khác domain?',
      options: [
        { en: 'window.postMessage() and the "message" event listener', vi: 'window.postMessage() và bộ lắng nghe sự kiện "message"' },
        { en: 'document.shareSecrets()', vi: 'document.shareSecrets()' },
        { en: 'window.openBridge()', vi: 'window.openBridge()' },
        { en: 'localStorage.syncAll()', vi: 'localStorage.syncAll()' }
      ],
      ans: 0,
      expEn: 'window.postMessage enables secure cross-origin messaging with targetOrigin verification.',
      expVi: 'window.postMessage cho phép gửi tin nhắn an toàn giữa các domain kèm kiểm tra targetOrigin.'
    }
  ]
};

console.log('Lesson 8 defined.');
