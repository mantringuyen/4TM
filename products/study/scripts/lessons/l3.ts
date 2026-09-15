import { RawLessonSource } from './rawLessonType';

export const lesson3: RawLessonSource = {
  order: 3,
  id: 'html_lesson_3',
  moduleId: 'html_mod_1',
  levelId: 'basic',
  topicId: 'html_links',
  titleEn: 'Hyperlinks, Anchor Navigation & Document Relationships',
  titleVi: 'Siêu Liên Kết, Điều Hướng Thẻ Anchor & Quan Hệ Tài Liệu',
  summaryEn: 'Master hyperlinks with <a>, href destinations (absolute, relative, protocol-relative), target attributes with rel="noopener noreferrer" security, mailto/tel protocols, and same-page fragment hash navigation.',
  summaryVi: 'Làm chủ siêu liên kết với <a>, đích đến href (tuyệt đối, tương đối, protocol-relative), thuộc tính target kèm bảo mật rel="noopener noreferrer", giao thức mailto/tel và điều hướng neo cùng trang với hash id.',
  estimatedMinutes: 15,
  introEn: 'Hyperlinks are the defining innovation that turned isolated electronic documents into the interconnected World Wide Web. Understanding how to structure URLs, manage navigation targets, and enforce security policies is fundamental to web development.',
  introVi: 'Siêu liên kết là sáng kiến cốt lõi biến các tài liệu điện tử riêng lẻ thành mạng lưới World Wide Web kết nối toàn cầu. Hiểu cách cấu trúc URL, điều hướng tab và bảo mật liên kết là nền tảng tối quan trọng của lập trình web.',
  conceptEn: 'The <a> element requires an href attribute. Absolute URLs point to external domains (e.g. href="https://example.com"), while relative URLs resolve within the current site (e.g. href="/about" or href="../docs"). When opening new browser tabs with target="_blank", you MUST include rel="noopener noreferrer" to prevent Tabnabbing security vulnerabilities and browser performance degradation. For direct contact actions, use mailto: (e.g. href="mailto:support@4tm.dev") and tel: (e.g. href="tel:+1234567890"). Internal page navigation links point to fragment identifiers (e.g. href="#pricing") matching an element id (id="pricing").',
  conceptVi: 'Thẻ <a> bắt buộc có thuộc tính href. Đường dẫn tuyệt đối trỏ tới tên miền ngoài, trong khi đường dẫn tương đối trỏ tới các trang trong website. Khi mở tab mới bằng target="_blank", bạn BẮT BUỘC phải kèm rel="noopener noreferrer" để chặn lỗ hổng bảo mật Tabnabbing và tránh nghẽn luồng xử lý của trình duyệt. Dùng giao thức mailto: để mở ứng dụng email và tel: để gọi điện thoại trực tiếp. Điều hướng nội bộ trang dùng dấu thăng hash (ví dụ href="#pricing") tương ứng với thuộc tính id của phần tử đích.',
  syntax: '<nav>\n  <a href="/courses">All Courses</a>\n  <a href="https://google.com" target="_blank" rel="noopener noreferrer">External Search</a>\n  <a href="mailto:contact@4tm.dev">Email Us</a>\n  <a href="tel:+18005550199">Call Support</a>\n  <a href="#faq">Jump to FAQ</a>\n</nav>',
  ex1TitleEn: 'Multi-target Navigation Header with Security',
  ex1TitleVi: 'Khung Điều Hướng Đa Dạng Kèm Bảo Mật',
  ex1Code: '<header>\n  <nav aria-label="Main Navigation">\n    <a href="/">Home</a> | \n    <a href="/docs/guide.html">Documentation</a> | \n    <a href="https://github.com/4tm-academy" target="_blank" rel="noopener noreferrer">GitHub Profile</a> | \n    <a href="#contact-section">Jump to Contact</a>\n  </nav>\n</header>',
  ex1ExpEn: 'Combines internal site routes, secure external links with target="_blank" and rel="noopener noreferrer", and fragment hash jumps.',
  ex1ExpVi: 'Kết hợp liên kết nội bộ, liên kết ngoài an toàn với rel="noopener noreferrer" và liên kết neo chuyển mục trên cùng một trang.',
  ex2TitleEn: 'Direct Communication Contact Triggers',
  ex2TitleVi: 'Thao Tác Kích Hoạt Liên Lạc Trực Tiếp',
  ex2Code: '<section id="contact-section">\n  <h2>Get In Touch</h2>\n  <p>Need support? <a href="mailto:support@4tm.dev?subject=Course%20Inquiry">Email Support Team</a></p>\n  <p>Urgent hotline: <a href="tel:+18005550199">1-800-555-0199</a></p>\n</section>',
  ex2ExpEn: 'Demonstrates mailto with prefilled subject lines and tel links formatted for mobile phone dialing.',
  ex2ExpVi: 'Minh họa liên kết gửi email có sẵn tiêu đề subject và liên kết gọi điện tự động mở trình quay số trên điện thoại.',
  mistake1En: 'Using target="_blank" without rel="noopener noreferrer"',
  mistake1Vi: 'Dùng target="_blank" mà không kèm rel="noopener noreferrer"',
  correction1En: 'Always add rel="noopener noreferrer" when opening external links to block window.opener reverse-tab hijacking attacks.',
  correction1Vi: 'Luôn thêm rel="noopener noreferrer" khi mở liên kết ngoài để ngăn chặn tấn công chiếm quyền điều khiển tab gốc qua window.opener.',
  mistake2En: 'Using empty href="#" for interactive JavaScript buttons',
  mistake2Vi: 'Dùng thẻ <a href="#"> cho các nút bấm xử lý bằng JavaScript',
  correction2En: 'Use semantic <button type="button"> for UI actions; reserve <a> strictly for actual navigation destinations.',
  correction2Vi: 'Dùng thẻ <button type="button"> cho các nút bấm hành động; chỉ dùng thẻ <a> khi thực sự chuyển trang hoặc nhảy vị trí.',
  tipEn: 'The download attribute (e.g. <a href="guide.pdf" download="Guide_2026.pdf">) prompts the browser to save the linked file locally rather than navigating to it.',
  tipVi: 'Thuộc tính download (ví dụ <a href="guide.pdf" download>) yêu cầu trình duyệt tải tệp về máy thay vì mở trực tiếp trên tab.',
  practiceTaskEn: 'Build an Accessible Navigation Bar',
  practiceTaskVi: 'Xây dựng thanh điều hướng chuẩn trợ năng',
  practiceInstEn: 'Create a <nav> containing an internal link to "/dashboard", an external secure link to "https://w3.org" with target="_blank" and rel="noopener noreferrer", and a mailto link to "help@4tm.dev".',
  practiceInstVi: 'Tạo thẻ <nav> chứa liên kết nội bộ tới "/dashboard", liên kết ngoài an toàn tới "https://w3.org" có target="_blank" và rel="noopener noreferrer", cùng liên kết mailto tới "help@4tm.dev".',
  practiceStarter: '<nav>\n  <!-- Add links here -->\n</nav>',
  practiceSolution: '<nav>\n  <a href="/dashboard">Dashboard</a>\n  <a href="https://w3.org" target="_blank" rel="noopener noreferrer">W3C Standards</a>\n  <a href="mailto:help@4tm.dev">Help</a>\n</nav>',
  practicePatterns: ['<nav>', 'href="/dashboard"', 'href="https://w3.org"', 'target="_blank"', 'rel="noopener noreferrer"', 'href="mailto:help@4tm.dev"'],
  practiceHintEn: 'Include href="/dashboard", external target="_blank" with rel="noopener noreferrer", and href="mailto:help@4tm.dev".',
  practiceHintVi: 'Bao gồm href="/dashboard", liên kết ngoài target="_blank" kèm rel="noopener noreferrer" và href="mailto:help@4tm.dev".',

  exercises: [
    {
      id: 'html_ex_3_1',
      type: 'complete_code',
      titleEn: 'Create a Secure External Link',
      titleVi: 'Tạo Liên Kết Ngoài An Toàn',
      instEn: 'Add an <a> tag pointing to "https://developer.mozilla.org" that opens in a new tab with rel="noopener noreferrer".',
      instVi: 'Thêm thẻ <a> trỏ tới "https://developer.mozilla.org" mở ở tab mới với thuộc tính rel="noopener noreferrer".',
      starter: '<p>Learn more at <!-- Add link here -->.</p>',
      solution: '<p>Learn more at <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Web Docs</a>.</p>',
      hintEn: '<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Web Docs</a>',
      hintVi: '<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Web Docs</a>',
      expEn: 'target="_blank" combined with rel="noopener noreferrer" isolates the new browsing context securely.',
      expVi: 'target="_blank" kết hợp rel="noopener noreferrer" cô lập ngữ cảnh duyệt web an toàn tuyệt đối.'
    },
    {
      id: 'html_ex_3_2',
      type: 'fix_code',
      titleEn: 'Fix Insecure Blank Target Vulnerability',
      titleVi: 'Sửa Lỗ Hổng Bảo Mật Mở Tab Mới',
      instEn: 'Add the missing security attribute rel="noopener noreferrer" to the external link.',
      instVi: 'Thêm thuộc tính bảo mật còn thiếu rel="noopener noreferrer" vào thẻ liên kết ngoài.',
      starter: '<a href="https://partner-portal.com" target="_blank">Partner Portal</a>',
      solution: '<a href="https://partner-portal.com" target="_blank" rel="noopener noreferrer">Partner Portal</a>',
      hintEn: 'Add rel="noopener noreferrer" inside the <a> tag.',
      hintVi: 'Thêm rel="noopener noreferrer" vào trong thẻ <a>.',
      expEn: 'rel="noopener noreferrer" mitigates reverse tabjacking attacks.',
      expVi: 'rel="noopener noreferrer" chống tấn công chiếm đoạt tab gốc của website.'
    },
    {
      id: 'html_ex_3_3',
      type: 'write_code',
      titleEn: 'Create Mailto and Phone Triggers',
      titleVi: 'Tạo Thao Tác Gửi Mail Và Gọi Điện',
      instEn: 'Create a contact list with an email link to "admissions@4tm.edu" and a telephone link to "+842812345678".',
      instVi: 'Tạo danh sách liên hệ với liên kết email tới "admissions@4tm.edu" và liên kết gọi điện tới "+842812345678".',
      starter: '<!-- Add contact email and phone links -->\n',
      solution: '<p>Email: <a href="mailto:admissions@4tm.edu">admissions@4tm.edu</a></p>\n<p>Phone: <a href="tel:+842812345678">+84 28 1234 5678</a></p>',
      hintEn: 'Use href="mailto:..." and href="tel:...".',
      hintVi: 'Sử dụng href="mailto:..." và href="tel:...".',
      expEn: 'mailto and tel schemas activate native email clients and phone dialers.',
      expVi: 'Giao thức mailto và tel tự động mở ứng dụng gửi thư và trình quay số trên thiết bị.'
    },
    {
      id: 'html_ex_3_4',
      type: 'modify_example',
      titleEn: 'Implement Same-page Hash Anchor Jump',
      titleVi: 'Triển Khai Điều Hướng Neo Cùng Trang Bằng Hash',
      instEn: 'Add a jump link at the top pointing to #faq-section, and assign id="faq-section" to the target <h2> element.',
      instVi: 'Thêm liên kết nhảy ở đầu trang trỏ tới #faq-section và gán id="faq-section" cho thẻ <h2> đích.',
      starter: '<nav>\n  <!-- Add anchor jump link here -->\n</nav>\n<main style="margin-top:500px;">\n  <h2>Frequently Asked Questions</h2>\n  <p>Answers to common questions.</p>\n</main>',
      solution: '<nav>\n  <a href="#faq-section">Jump to FAQ</a>\n</nav>\n<main style="margin-top:500px;">\n  <h2 id="faq-section">Frequently Asked Questions</h2>\n  <p>Answers to common questions.</p>\n</main>',
      hintEn: 'Set href="#faq-section" on <a> and id="faq-section" on <h2>.',
      hintVi: 'Đặt href="#faq-section" trên <a> và id="faq-section" trên <h2>.',
      expEn: 'Hash fragment navigation scrolls the browser viewport directly to the element with matching ID.',
      expVi: 'Liên kết hash tự động cuộn màn hình đến đúng phần tử có ID tương ứng.'
    },
    {
      id: 'html_ex_3_5',
      type: 'predict_output',
      titleEn: 'Configure File Download Trigger Attribute',
      titleVi: 'Cấu Hình Thuộc Tính Tải Tệp Download',
      instEn: 'Add the download attribute to prompt the browser to save "curriculum.pdf" with filename "4TM_Full_Curriculum.pdf".',
      instVi: 'Thêm thuộc tính download để trình duyệt lưu tệp "curriculum.pdf" với tên "4TM_Full_Curriculum.pdf".',
      starter: '<a href="/assets/curriculum.pdf">Download Syllabus</a>',
      solution: '<a href="/assets/curriculum.pdf" download="4TM_Full_Curriculum.pdf">Download Syllabus</a>',
      hintEn: 'Add download="4TM_Full_Curriculum.pdf" to <a>.',
      hintVi: 'Thêm download="4TM_Full_Curriculum.pdf" vào thẻ <a>.',
      expEn: 'The download attribute forces file saving rather than in-browser navigation.',
      expVi: 'Thuộc tính download kích hoạt lưu tệp về máy thay vì mở trực tiếp trên trình duyệt.'
    }
  ],

  challenge: {
    id: 'html_ch_3',
    titleEn: 'Comprehensive Multi-Type Navigation System',
    titleVi: 'Hệ Thống Điều Hướng Đa Dạng Chuẩn Doanh Nghiệp',
    descEn: 'Construct a complete web navigation bar featuring relative internal links, a secure external link with target="_blank" and rel="noopener noreferrer", a direct email trigger with mailto:, a telephone call trigger with tel:, and an in-page anchor jump linking to a bottom footer with an id.',
    descVi: 'Xây dựng thanh điều hướng hoàn chỉnh gồm các liên kết nội bộ, một liên kết ngoài an toàn mở tab mới có rel="noopener noreferrer", liên kết email mailto:, liên kết gọi điện tel: và liên kết neo nhảy xuống chân trang footer có gắn id.',
    requirements: [
      { en: '<nav> wrapping all primary header links', vi: 'Thẻ <nav> bao bọc toàn bộ liên kết điều hướng' },
      { en: 'Relative internal link <a href="/courses">Courses</a>', vi: 'Liên kết tương đối nội bộ <a href="/courses">Courses</a>' },
      { en: 'Secure external link with target="_blank" and rel="noopener noreferrer"', vi: 'Liên kết ngoài an toàn có target="_blank" và rel="noopener noreferrer"' },
      { en: 'Direct email trigger with href="mailto:support@4tm.dev"', vi: 'Liên kết email trực tiếp với href="mailto:support@4tm.dev"' },
      { en: 'Telephone trigger with href="tel:+18005550199"', vi: 'Liên kết gọi điện thoại với href="tel:+18005550199"' },
      { en: 'Hash anchor link jumping to a footer with id="page-footer"', vi: 'Liên kết hash nhảy xuống chân trang có id="page-footer"' }
    ],
    starter: '<!-- Build comprehensive navigation system below -->\n',
    solution: '<header>\n  <nav aria-label="Main Navigation">\n    <a href="/courses">Courses</a>\n    <a href="https://github.com/4tm" target="_blank" rel="noopener noreferrer">GitHub</a>\n    <a href="mailto:support@4tm.dev">Email Us</a>\n    <a href="tel:+18005550199">Call Support</a>\n    <a href="#page-footer">Jump to Footer</a>\n  </nav>\n</header>\n<main>\n  <h1>Welcome to 4TM Academy</h1>\n  <p>Learn professional full-stack web engineering.</p>\n</main>\n<footer id="page-footer">\n  <p>&copy; 2026 4TM Academy. All rights reserved.</p>\n</footer>',
    hints: [
      { en: 'Make sure the footer has id="page-footer" and your jump link has href="#page-footer".', vi: 'Đảm bảo thẻ footer có id="page-footer" và liên kết neo có href="#page-footer".' }
    ],
    expEn: 'Demonstrates all essential hyperlink protocols, target modes, security attributes, and anchor behaviors.',
    expVi: 'Minh họa đầy đủ các giao thức siêu liên kết, chế độ mở tab, thuộc tính bảo mật và hành vi điều hướng neo.'
  },

  challengeVariants: [
    {
      id: 'html_ch_3_v1',
      titleEn: 'Variant 1: E-Commerce Product Navigation and Support',
      titleVi: 'Biến Thể 1: Điều Hướng Sản Phẩm & Hỗ Trợ Thương Mại Điện Tử',
      descEn: 'Build an e-commerce nav with links to "/cart", external reviews on "https://trustpilot.com" (secure _blank), hotline tel:"+18885550100", and jump link to "#reviews".',
      descVi: 'Tạo thanh điều hướng bán hàng với liên kết "/cart", đánh giá ngoài trên "https://trustpilot.com" (mở tab mới an toàn), hotline tel:"+18885550100" và neo nhảy đến "#reviews".',
      requirements: [
        { en: 'Internal link to /cart', vi: 'Liên kết nội bộ /cart' },
        { en: 'Secure external link to Trustpilot', vi: 'Liên kết ngoài an toàn tới Trustpilot' },
        { en: 'Hotline link with tel protocol', vi: 'Liên kết hotline với giao thức tel' },
        { en: 'Anchor jump to section with id="reviews"', vi: 'Liên kết neo tới phần có id="reviews"' }
      ],
      starter: '<!-- Build e-commerce navigation -->\n',
      solution: '<header>\n  <nav>\n    <a href="/cart">Shopping Cart</a>\n    <a href="https://trustpilot.com" target="_blank" rel="noopener noreferrer">Customer Reviews</a>\n    <a href="tel:+18885550100">Hotline: 1-888-555-0100</a>\n    <a href="#reviews">Jump to Reviews</a>\n  </nav>\n</header>\n<main>\n  <section id="reviews">\n    <h2>Verified Customer Reviews</h2>\n    <p>5-star rated platform.</p>\n  </section>\n</main>',
      expEn: 'E-commerce navigation with secure external links and in-page customer review jump.',
      expVi: 'Thanh điều hướng thương mại điện tử với liên kết ngoài an toàn và neo chuyển mục đánh giá.'
    },
    {
      id: 'html_ch_3_v2',
      titleEn: 'Variant 2: University Portal Helpdesk Links',
      titleVi: 'Biến Thể 2: Cổng Thông Tin Trợ Giúp Đại Học',
      descEn: 'Create university portal nav with "/library", download link for "handbook.pdf", mailto to "advising@univ.edu", and jump to "#office-hours".',
      descVi: 'Tạo điều hướng cổng trường đại học với "/library", liên kết tải tệp "handbook.pdf", mailto tới "advising@univ.edu" và neo nhảy tới "#office-hours".',
      requirements: [
        { en: 'Internal link to /library', vi: 'Liên kết nội bộ /library' },
        { en: 'Download link for student handbook with download attribute', vi: 'Liên kết tải sổ tay sinh viên với thuộc tính download' },
        { en: 'Email link with mailto protocol', vi: 'Liên kết email với giao thức mailto' },
        { en: 'Hash jump to section with id="office-hours"', vi: 'Liên kết neo hash tới phần có id="office-hours"' }
      ],
      starter: '<!-- Build university portal navigation -->\n',
      solution: '<header>\n  <nav>\n    <a href="/library">Digital Library</a>\n    <a href="/files/handbook.pdf" download="Student_Handbook.pdf">Download Handbook</a>\n    <a href="mailto:advising@univ.edu">Academic Advising</a>\n    <a href="#office-hours">Office Hours</a>\n  </nav>\n</header>\n<main>\n  <section id="office-hours">\n    <h2>Professor Office Hours</h2>\n    <p>Monday & Wednesday 2:00 PM - 4:00 PM</p>\n  </section>\n</main>',
      expEn: 'Academic helpdesk navigation featuring direct file downloads and advising mail triggers.',
      expVi: 'Thanh điều hướng học thuật tích hợp tải tệp trực tiếp và liên lạc cố vấn học tập.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_3_1',
      type: 'single_choice',
      qEn: 'Which attribute is required for the <a> tag to function as a clickable hyperlink?',
      qVi: 'Thuộc tính nào là bắt buộc để thẻ <a> hoạt động như một siêu liên kết có thể nhấp vào?',
      options: [
        { en: 'href', vi: 'href' },
        { en: 'src', vi: 'src' },
        { en: 'link', vi: 'link' },
        { en: 'url', vi: 'url' }
      ],
      ans: 0,
      expEn: 'href (Hypertext REFerence) specifies the target URL or destination identifier.',
      expVi: 'href (Hypertext REFerence) xác định URL đích hoặc định danh neo cần chuyển đến.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_3_2',
      type: 'single_choice',
      qEn: 'Why MUST you pair rel="noopener noreferrer" with target="_blank" on external hyperlinks?',
      qVi: 'Tại sao BẮT BUỘC phải kèm rel="noopener noreferrer" khi dùng target="_blank" cho liên kết ngoài?',
      options: [
        { en: 'It prevents the opened page from accessing window.opener to maliciously hijack or redirect the parent tab', vi: 'Nó ngăn trang đích truy cập window.opener để chiếm quyền hoặc chuyển hướng độc hại tab gốc' },
        { en: 'It forces the page to download as a zip archive', vi: 'Nó bắt buộc trang tải về dưới dạng tệp nén zip' },
        { en: 'It automatically encrypts cookies sent across the domain', vi: 'Nó tự động mã hóa cookie gửi qua tên miền' },
        { en: 'It compresses the bandwidth usage of the target page', vi: 'Nó nén băng thông của trang web đích' }
      ],
      ans: 0,
      expEn: 'rel="noopener" prevents the new window from accessing window.opener, and "noreferrer" prevents passing the HTTP Referer header.',
      expVi: 'rel="noopener" ngăn tab mới truy cập window.opener của trang gốc và "noreferrer" không truyền header Referer.'
    },
    {
      id: 'html_q_3_3',
      type: 'single_choice',
      qEn: 'Which URI scheme is used to trigger the user default email client with a recipient address?',
      qVi: 'Giao thức URI nào dùng để tự động mở ứng dụng gửi email với địa chỉ người nhận có sẵn?',
      options: [
        { en: 'mailto:', vi: 'mailto:' },
        { en: 'email:', vi: 'email:' },
        { en: 'sendmail:', vi: 'sendmail:' },
        { en: 'smtp:', vi: 'smtp:' }
      ],
      ans: 0,
      expEn: 'href="mailto:user@example.com" opens the native operating system email client.',
      expVi: 'href="mailto:user@example.com" kích hoạt ứng dụng email mặc định trên hệ điều hành.'
    },
    {
      id: 'html_q_3_4',
      type: 'single_choice',
      qEn: 'Which URI scheme is used to initiate a phone call on mobile devices and VoIP softphones?',
      qVi: 'Giao thức URI nào dùng để kích hoạt cuộc gọi điện thoại trên thiết bị di động hoặc phần mềm VoIP?',
      options: [
        { en: 'tel:', vi: 'tel:' },
        { en: 'call:', vi: 'call:' },
        { en: 'phone:', vi: 'phone:' },
        { en: 'dial:', vi: 'dial:' }
      ],
      ans: 0,
      expEn: 'href="tel:+1234567890" instructs smartphones and softphones to dial the specified number.',
      expVi: 'href="tel:+1234567890" yêu cầu điện thoại hoặc phần mềm gọi điện quay số đã chỉ định.'
    },
    {
      id: 'html_q_3_5',
      type: 'single_choice',
      qEn: 'How do you create an in-page anchor link that jumps to a section with id="pricing"?',
      qVi: 'Làm thế nào để tạo liên kết neo trong trang nhảy tới phần có thuộc tính id="pricing"?',
      options: [
        { en: '<a href="#pricing">View Pricing</a>', vi: '<a href="#pricing">View Pricing</a>' },
        { en: '<a href="pricing">View Pricing</a>', vi: '<a href="pricing">View Pricing</a>' },
        { en: '<a href=".pricing">View Pricing</a>', vi: '<a href=".pricing">View Pricing</a>' },
        { en: '<a target="pricing">View Pricing</a>', vi: '<a target="pricing">View Pricing</a>' }
      ],
      ans: 0,
      expEn: 'The hash (#) symbol prefix denotes a fragment identifier linking to an element ID in the current page.',
      expVi: 'Ký tự thăng (#) biểu thị định danh phân đoạn trỏ tới một thuộc tính ID trong trang hiện tại.'
    },
    {
      id: 'html_q_3_6',
      type: 'single_choice',
      qEn: 'What does the download attribute on an <a> element instruct the browser to do?',
      qVi: 'Thuộc tính download trên thẻ <a> yêu cầu trình duyệt thực hiện hành động gì?',
      options: [
        { en: 'Prompts the user to save the linked URL as a local file instead of navigating to it', vi: 'Yêu cầu người dùng lưu tệp liên kết về máy tính thay vì mở trang đó' },
        { en: 'Decompresses the linked executable file in memory', vi: 'Giải nén tệp thực thi vào bộ nhớ RAM' },
        { en: 'Uploads the user cookies to the remote server', vi: 'Tải cookie người dùng lên máy chủ từ xa' },
        { en: 'Converts an HTML file into a PDF dynamically', vi: 'Tự động chuyển tệp HTML sang PDF' }
      ],
      ans: 0,
      expEn: 'download informs the browser that the author intends for the hyperlink to be downloaded rather than displayed.',
      expVi: 'download báo cho trình duyệt biết liên kết này dùng để tải về máy thay vì xem trực tiếp.'
    },
    {
      id: 'html_q_3_7',
      type: 'single_choice',
      qEn: 'What is the difference between an absolute URL and a relative URL in an href attribute?',
      qVi: 'Sự khác biệt giữa URL tuyệt đối và URL tương đối trong thuộc tính href là gì?',
      options: [
        { en: 'Absolute URLs include the full protocol and domain (https://example.com/page), whereas relative URLs resolve path relative to the current document or root domain (/page)', vi: 'URL tuyệt đối chứa đầy đủ giao thức và tên miền, còn URL tương đối trỏ đường dẫn dựa trên vị trí hiện tại hoặc thư mục gốc' },
        { en: 'Absolute URLs only work in Firefox', vi: 'URL tuyệt đối chỉ hoạt động trên Firefox' },
        { en: 'Relative URLs cannot be styled with CSS', vi: 'URL tương đối không thể định dạng CSS' },
        { en: 'Absolute URLs are strictly for image files', vi: 'URL tuyệt đối chỉ dùng cho tệp hình ảnh' }
      ],
      ans: 0,
      expEn: 'Absolute URLs provide full domain routing while relative URLs maintain portability across environments.',
      expVi: 'URL tuyệt đối chỉ rõ tên miền đầy đủ trong khi URL tương đối giúp website linh hoạt khi đổi môi trường lưu trữ.'
    },
    {
      id: 'html_q_3_8',
      type: 'single_choice',
      qEn: 'What target attribute value causes a link to open in the parent frame if nested inside an iframe?',
      qVi: 'Giá trị target nào làm cho liên kết mở trong khung cha (parent frame) nếu đang nằm trong một iframe?',
      options: [
        { en: 'target="_parent"', vi: 'target="_parent"' },
        { en: 'target="_top"', vi: 'target="_top"' },
        { en: 'target="_self"', vi: 'target="_self"' },
        { en: 'target="_blank"', vi: 'target="_blank"' }
      ],
      ans: 0,
      expEn: 'target="_parent" opens the linked document in the parent browsing context frame.',
      expVi: 'target="_parent" mở tài liệu trong khung duyệt web cha cấp liền kề.'
    },
    {
      id: 'html_q_3_9',
      type: 'single_choice',
      qEn: 'What target attribute value breaks out of all nested iframes and opens in the top-level window?',
      qVi: 'Giá trị target nào thoát khỏi toàn bộ các iframe lồng nhau để mở ở cửa sổ cao nhất (toàn màn hình)?',
      options: [
        { en: 'target="_top"', vi: 'target="_top"' },
        { en: 'target="_root"', vi: 'target="_root"' },
        { en: 'target="_parent"', vi: 'target="_parent"' },
        { en: 'target="_window"', vi: 'target="_window"' }
      ],
      ans: 0,
      expEn: 'target="_top" targets the topmost browsing context without any enclosing iframes.',
      expVi: 'target="_top" mở trang ở khung duyệt web cao nhất, thoát khỏi mọi iframe.'
    },
    {
      id: 'html_q_3_10',
      type: 'single_choice',
      qEn: 'What is the default value of the target attribute on an <a> element when omitted?',
      qVi: 'Giá trị mặc định của thuộc tính target trên thẻ <a> khi không được khai báo là gì?',
      options: [
        { en: '_self (opens in the same tab/window)', vi: '_self (mở trong chính tab/cửa sổ hiện tại)' },
        { en: '_blank', vi: '_blank' },
        { en: '_parent', vi: '_parent' },
        { en: '_top', vi: '_top' }
      ],
      ans: 0,
      expEn: 'By default, hyperlinks navigate within the same browsing context (_self).',
      expVi: 'Mặc định, các siêu liên kết luôn mở trong cùng tab hiện tại (_self).'
    },
    {
      id: 'html_q_3_11',
      type: 'single_choice',
      qEn: 'How can you specify a subject line in a mailto: link?',
      qVi: 'Làm thế nào để chỉ định sẵn tiêu đề thư (subject) trong một liên kết mailto:?',
      options: [
        { en: 'href="mailto:team@4tm.dev?subject=Inquiry"', vi: 'href="mailto:team@4tm.dev?subject=Inquiry"' },
        { en: 'href="mailto:team@4tm.dev#subject=Inquiry"', vi: 'href="mailto:team@4tm.dev#subject=Inquiry"' },
        { en: 'href="mailto:team@4tm.dev;title=Inquiry"', vi: 'href="mailto:team@4tm.dev;title=Inquiry"' },
        { en: 'href="mailto:team@4tm.dev&subject=Inquiry"', vi: 'href="mailto:team@4tm.dev&subject=Inquiry"' }
      ],
      ans: 0,
      expEn: 'URL query parameter syntax (?subject=...) appends subject, body, cc, or bcc parameters to mailto URLs.',
      expVi: 'Cú pháp tham số truy vấn (?subject=...) cho phép truyền sẵn tiêu đề, nội dung body hoặc cc vào mailto.'
    },
    {
      id: 'html_q_3_12',
      type: 'single_choice',
      qEn: 'Why should you avoid using generic link text like "Click Here" or "Read More"?',
      qVi: 'Tại sao nên tránh dùng các cụm từ chung chung như "Click Here" hay "Xem Thêm" cho liên kết?',
      options: [
        { en: 'Screen reader users often navigate via links list; descriptive text provides context without surrounding content', vi: 'Người dùng trình đọc màn hình thường duyệt danh sách liên kết riêng; văn bản mô tả rõ ràng giúp họ hiểu ngay đích đến' },
        { en: 'The browser ignores clicks on phrases with fewer than 10 characters', vi: 'Trình duyệt bỏ qua các cú nhấp chuột có ít hơn 10 ký tự' },
        { en: 'It triggers immediate spam filter flags in Google Chrome', vi: 'Nó kích hoạt bộ lọc spam ngay lập tức trên Chrome' },
        { en: 'HTML5 prohibits phrases containing the word "Click"', vi: 'Chuẩn HTML5 cấm dùng từ "Click"' }
      ],
      ans: 0,
      expEn: 'Descriptive anchor text improves accessibility for assistive device users and boosts SEO anchor relevancy.',
      expVi: 'Văn bản liên kết mô tả chi tiết giúp người khiếm thị hiểu ngữ cảnh và tăng điểm chất lượng liên kết SEO.'
    },
    {
      id: 'html_q_3_13',
      type: 'single_choice',
      qEn: 'What does the rel="nofollow" attribute inform search engine web crawlers?',
      qVi: 'Thuộc tính rel="nofollow" báo cho robot thu thập dữ liệu của máy tìm kiếm điều gì?',
      options: [
        { en: 'Informs search engines not to endorse or pass page rank/SEO credit to the linked target URL', vi: 'Báo cho máy tìm kiếm không bảo chứng hoặc không chuyển điểm uy tín SEO (PageRank) tới URL đích' },
        { en: 'Blocks users from clicking the link', vi: 'Ngăn không cho người dùng bấm vào liên kết' },
        { en: 'Deletes the target page from the web server', vi: 'Xóa trang web đích khỏi máy chủ' },
        { en: 'Hides the hyperlink visually using CSS', vi: 'Ẩn liên kết trực quan bằng CSS' }
      ],
      ans: 0,
      expEn: 'rel="nofollow" tells search spiders that the link is not an endorsed endorsement (common for user comments and paid ads).',
      expVi: 'rel="nofollow" báo máy tìm kiếm rằng liên kết này không được trang chủ bảo chứng (thường dùng cho bình luận hoặc quảng cáo).'
    },
    {
      id: 'html_q_3_14',
      type: 'single_choice',
      qEn: 'Can an <a> tag wrap complex block elements like <div>, <h2>, and <p> in HTML5?',
      qVi: 'Trong HTML5, thẻ <a> có thể bao bọc các khối phần tử phức tạp như <div>, <h2> và <p> không?',
      options: [
        { en: 'Yes, HTML5 explicitly permits <a> to wrap entire block-level cards or components', vi: 'Có, HTML5 cho phép thẻ <a> bao bọc toàn bộ khối giao diện thẻ card hoặc component' },
        { en: 'No, <a> can only ever contain inline text nodes', vi: 'Không, <a> chỉ được chứa văn bản dòng' },
        { en: 'Only if the wrapped elements have display: inline in CSS', vi: 'Chỉ khi các thẻ con có thuộc tính display: inline' },
        { en: 'Only inside the <footer> element', vi: 'Chỉ được phép trong thẻ <footer>' }
      ],
      ans: 0,
      expEn: 'HTML5 updated the content model allowing <a> to wrap entire cards and complex interactive blocks.',
      expVi: 'HTML5 mở rộng mô hình nội dung cho phép thẻ <a> bao trọn toàn bộ thẻ card hoặc khối đa phần tử.'
    },
    {
      id: 'html_q_3_15',
      type: 'single_choice',
      qEn: 'What does href="#top" or href="#" typically do in modern web browsers?',
      qVi: 'Đường dẫn href="#top" hoặc href="#" thường có tác dụng gì trong trình duyệt hiện đại?',
      options: [
        { en: 'Scrolls the page smoothly back to the top of the viewport', vi: 'Cuộn trang web trở về vị trí đầu tiên trên cùng của màn hình' },
        { en: 'Refreshes the entire web application', vi: 'Tải lại toàn bộ ứng dụng web' },
        { en: 'Navigates to the browser home page', vi: 'Chuyển về trang chủ của trình duyệt' },
        { en: 'Closes the current browser tab', vi: 'Đóng tab trình duyệt hiện tại' }
      ],
      ans: 0,
      expEn: 'An empty fragment (#) or #top scrolls the viewport to the top of the HTML document.',
      expVi: 'Định danh phân đoạn rỗng (#) hoặc #top sẽ cuộn màn hình về đầu tài liệu HTML.'
    },
    {
      id: 'html_q_3_16',
      type: 'single_choice',
      qEn: 'Which attribute provides accessible text for non-descriptive icon-only links?',
      qVi: 'Thuộc tính nào cung cấp văn bản trợ năng cho các liên kết chỉ chứa biểu tượng icon?',
      options: [
        { en: 'aria-label="Description of destination"', vi: 'aria-label="Mô tả nơi cần đến"' },
        { en: 'alt="Link"', vi: 'alt="Link"' },
        { en: 'name="link-name"', vi: 'name="link-name"' },
        { en: 'tooltip="Destination"', vi: 'tooltip="Destination"' }
      ],
      ans: 0,
      expEn: 'aria-label supplies an accessible name for screen readers when an <a> contains no visible text.',
      expVi: 'aria-label cung cấp tên trợ năng cho trình đọc màn hình khi liên kết <a> chỉ có biểu tượng icon.',
      difficulty: 'easy'
    }
  ]
};
