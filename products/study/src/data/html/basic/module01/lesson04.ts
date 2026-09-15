import { Lesson } from '../../../../types';

export const lesson04: Lesson = {
  id: 'html_lesson_4',
  moduleId: 'html_mod_1',
  levelId: 'basic',
  courseId: 'html',
  order: 4,
  topicId: 'html_links',
  title: {
    en: 'Hyperlinks: Relative/Absolute URLs, Fragments, Targets & Downloads',
    vi: 'Siêu Liên Kết: URL Tương Đối/Tuyệt Đối, Neo Trang, Targets & Tải Xuống'
  },
  summary: {
    en: 'Master hyperlinks with <a>, href destinations (absolute, relative, protocol-relative), target attributes with rel="noopener noreferrer" security, mailto/tel protocols, same-page fragment hash navigation, and the download attribute.',
    vi: 'Làm chủ siêu liên kết với <a>, đích đến href (tuyệt đối, tương đối, protocol-relative), thuộc tính target kèm bảo mật rel="noopener noreferrer", giao thức mailto/tel, điều hướng neo cùng trang với hash id và thuộc tính download.'
  },
  estimatedMinutes: 16,
  learn: {
    introduction: {
      en: 'Hyperlinks are the defining innovation that turned isolated electronic documents into the interconnected World Wide Web. Understanding how to structure URLs, manage navigation targets, trigger direct downloads, and enforce security policies is fundamental to web engineering.',
      vi: 'Siêu liên kết là sáng kiến cốt lõi biến các tài liệu điện tử riêng lẻ thành mạng lưới World Wide Web kết nối toàn cầu. Hiểu cách cấu trúc URL, điều hướng tab, kích hoạt tải tệp và áp dụng chính sách bảo mật là nền tảng của kỹ nghệ web.'
    },
    conceptExplanation: {
      en: 'The `<a>` (anchor) element creates hyperlinks using the `href` attribute:\n\n1. **URL Types**:\n   - **Absolute URLs**: Point to external websites including the protocol (e.g. `href="https://example.com/docs"`).\n   - **Relative URLs**: Resolve relative to current document (e.g. `href="about.html"`, `href="/products/item"`, `href="../index.html"`).\n2. **Security & New Tabs**:\n   - Opening in new tabs (`target="_blank"`) creates a reverse tabnabbing vulnerability where the opened page can manipulate the original window via `window.opener`. Always pair `target="_blank"` with `rel="noopener noreferrer"`.\n3. **Protocols**:\n   - `mailto:support@example.com` opens user email client.\n   - `tel:+1234567890` opens telephone dialer on mobile devices.\n   - `sms:+1234567890` opens text messaging on mobile.\n4. **Page Fragment Navigation**:\n   - Link to `href="#faq"` navigates directly to the element with `id="faq"` on the same page.\n5. **File Downloads**:\n   - `<a href="/files/report.pdf" download="Q3-Report.pdf">Download</a>` instructs the browser to download the file directly instead of opening it in the viewport.',
      vi: 'Thẻ `<a>` (anchor) tạo siêu liên kết qua thuộc tính `href`:\n\n1. **Các loại URL**:\n   - **URL Tuyệt đối**: Trỏ đến trang web bên ngoài kèm giao thức (vd: `href="https://example.com/docs"`).\n   - **URL Tương đối**: Định vị tương đối với tài liệu hiện tại (vd: `href="about.html"`, `href="/products/item"`, `href="../index.html"`).\n2. **Bảo mật & Tab mới**:\n   - Mở tab mới (`target="_blank"`) có nguy cơ bị tấn công reverse tabnabbing khi trang đích có thể chiếm quyền trang gốc qua `window.opener`. Luôn đi kèm `rel="noopener noreferrer"` khi dùng `target="_blank"`.\n3. **Các giao thức liên lạc**:\n   - `mailto:support@example.com` mở trình gửi email.\n   - `tel:+1234567890` kích hoạt ứng dụng gọi điện trên di động.\n   - `sms:+1234567890` mở ứng dụng nhắn tin.\n4. **Điều hướng neo trang**:\n   - `href="#faq"` cuộn mượt đến phần tử có `id="faq"` trên cùng trang.\n5. **Tải tệp xuống**:\n   - `<a href="/files/report.pdf" download="Q3-Report.pdf">Tải về</a>` yêu cầu trình duyệt tải tệp về máy thay vì mở xem trực tiếp.'
    },
    syntax: `<!-- External link with security attributes -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>

<!-- Internal fragment link -->
<a href="#contact-section">Jump to Contact</a>

<!-- Direct file download -->
<a href="/downloads/guide.pdf" download="Developer-Guide.pdf">Download PDF</a>`,
    examples: [
      {
        title: {
          en: 'Comprehensive Navigation Header with Multiple Link Types',
          vi: 'Thanh Điều Hướng Toàn Diện Với Nhiều Loại Liên Kết'
        },
        code: `<nav aria-label="Main Navigation">
  <ul class="nav-list">
    <li><a href="/home">Home</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="https://github.com/4tm-code" target="_blank" rel="noopener noreferrer">GitHub</a></li>
    <li><a href="mailto:contact@4tm.dev">Email Us</a></li>
    <li><a href="/assets/cheat-sheet.pdf" download="HTML5-CheatSheet.pdf">Download PDF</a></li>
  </ul>
</nav>`,
        language: 'html',
        explanation: {
          en: 'Shows relative site navigation, in-page fragment jump, secure external tab link, mailto action, and file download.',
          vi: 'Minh họa liên kết nội bộ, nhảy neo trang, tab ngoài có bảo mật, gửi mail và tải tệp tin.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using target="_blank" without rel="noopener noreferrer"',
          vi: 'Dùng target="_blank" mà không có rel="noopener noreferrer"'
        },
        correction: {
          en: 'Always include rel="noopener noreferrer" on target="_blank" links to prevent security vulnerabilities and performance issues.',
          vi: 'Luôn thêm rel="noopener noreferrer" vào các liên kết target="_blank" để ngăn ngừa lỗ hổng bảo mật tabnabbing.'
        },
        code: '<!-- Correct: <a href="https://external.com" target="_blank" rel="noopener noreferrer">Link</a> -->'
      },
      {
        mistake: {
          en: 'Using anchor tags as buttons with href="#" or href="javascript:void(0)"',
          vi: 'Dùng thẻ a thay cho button với href="#" hoặc href="javascript:void(0)"'
        },
        correction: {
          en: 'Use <button type="button"> for script actions (like opening modals) and reserve <a> strictly for navigation to URLs.',
          vi: 'Dùng thẻ <button type="button"> cho các hành động tương tác và chỉ dùng <a> khi chuyển hướng trang hoặc liên kết URL.'
        },
        code: '<!-- Correct: <button type="button" onclick="openModal()">Open</button> -->'
      }
    ],
    tips: [
      {
        en: 'Write meaningful link text instead of "Click here" or "Read more". Screen reader users often browse a list of all links on a page out of context.',
        vi: 'Viết nội dung liên kết có ý nghĩa thay vì "Bấm vào đây" hay "Xem thêm". Người dùng trình đọc màn hình thường duyệt danh sách liên kết độc lập với ngữ cảnh.'
      }
    ],
    practice: {
      task: {
        en: 'Build a Secure External Link and In-Page Hash Anchor',
        vi: 'Xây Dựng Liên Kết Ngoài An Toàn Và Neo Chuyển Trang'
      },
      instruction: {
        en: 'Create a navigation section with an internal fragment link to "#pricing" and an external link to "https://w3.org" that opens in a new tab securely with rel="noopener noreferrer".',
        vi: 'Tạo phần điều hướng chứa liên kết nhảy tới "#pricing" và một liên kết ngoài tới "https://w3.org" mở ở tab mới an toàn với rel="noopener noreferrer".'
      },
      starterCode: '<nav>\n  <!-- Add links here -->\n</nav>',
      solutionCode: '<nav>\n  <a href="#pricing">Pricing Plans</a>\n  <a href="https://w3.org" target="_blank" rel="noopener noreferrer">W3C Standards</a>\n</nav>',
      requiredPatterns: [
        '<a href="#pricing">',
        'target="_blank"',
        'rel="noopener noreferrer"',
        'href="https://w3.org"'
      ],
      hint: {
        en: 'Use href="#pricing" for the internal link and target="_blank" rel="noopener noreferrer" for the external URL.',
        vi: 'Dùng href="#pricing" cho liên kết nội bộ và target="_blank" rel="noopener noreferrer" cho URL bên ngoài.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Create Action Links for Email, Phone and Direct Download',
        vi: 'Tạo Các Liên Kết Hành Động Cho Email, Điện Thoại Và Tải Xuống'
      },
      instruction: {
        en: 'Construct a contact footer with a mailto link to "hello@4tm.dev", a telephone link to "+18005550199", and a download link to "/brochure.pdf" with download="Company-Brochure.pdf".',
        vi: 'Tạo phần chân trang liên hệ với liên kết mailto tới "hello@4tm.dev", liên kết điện thoại tới "+18005550199" và liên kết tải tới "/brochure.pdf" kèm download="Company-Brochure.pdf".'
      },
      starterCode: '<footer>\n  <!-- Add action links -->\n</footer>',
      solutionCode: '<footer>\n  <a href="mailto:hello@4tm.dev">Email Support</a>\n  <a href="tel:+18005550199">Call Helpline</a>\n  <a href="/brochure.pdf" download="Company-Brochure.pdf">Download Brochure</a>\n</footer>',
      requiredPatterns: [
        'href="mailto:hello@4tm.dev"',
        'href="tel:+18005550199"',
        'download="Company-Brochure.pdf"'
      ],
      hint: {
        en: 'Use mailto: and tel: URI schemes, and add the download attribute with the desired filename.',
        vi: 'Sử dụng tiền tố mailto: và tel:, thêm thuộc tính download kèm tên tệp mong muốn.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_3_1',
      type: 'complete_code',
      title: {
        en: 'Add Secure Target Blank Attributes',
        vi: 'Thêm Thuộc Tính Mở Tab Mới An Toàn'
      },
      instruction: {
        en: 'Update the external link to open in a new tab with target="_blank" and add rel="noopener noreferrer".',
        vi: 'Cập nhật liên kết ngoài để mở ở tab mới với target="_blank" và thêm rel="noopener noreferrer".'
      },
      starterCode: '<a href="https://developer.mozilla.org">Visit MDN Web Docs</a>',
      solutionCode: '<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">Visit MDN Web Docs</a>',
      hint: {
        en: 'Add target="_blank" rel="noopener noreferrer" to the anchor tag.',
        vi: 'Thêm target="_blank" rel="noopener noreferrer" vào thẻ a.'
      },
      explanation: {
        en: 'rel="noopener noreferrer" protects the parent page from tabnabbing attacks and clears the HTTP referer header.',
        vi: 'rel="noopener noreferrer" bảo vệ trang nguồn khỏi bị tấn công tabnabbing và xóa thông tin HTTP referer.'
      }
    },
    {
      id: 'html_ex_3_2',
      type: 'fix_code',
      title: {
        en: 'Fix In-Page Hash Anchor Navigation',
        vi: 'Sửa Lỗi Điều Hướng Neo Trong Trang'
      },
      instruction: {
        en: 'Fix the anchor link so clicking "Go to FAQ" navigates to the section with id="faq-section".',
        vi: 'Sửa liên kết neo để khi nhấn "Go to FAQ" sẽ chuyển tới phần tử có id="faq-section".'
      },
      starterCode: '<a href="faq-section">Go to FAQ</a>\n<section id="faq-section"><h2>Frequently Asked Questions</h2></section>',
      solutionCode: '<a href="#faq-section">Go to FAQ</a>\n<section id="faq-section"><h2>Frequently Asked Questions</h2></section>',
      hint: {
        en: 'Internal fragment identifiers must start with a hash symbol: href="#faq-section".',
        vi: 'Định danh neo nội bộ phải bắt đầu bằng ký tự thăng: href="#faq-section".'
      },
      explanation: {
        en: 'Prepend # to match the target element\'s id attribute.',
        vi: 'Thêm tiền tố # để khớp với thuộc tính id của phần tử đích.'
      }
    },
    {
      id: 'html_ex_3_3',
      type: 'write_code',
      title: {
        en: 'Create Direct File Download Link',
        vi: 'Tạo Liên Kết Tải Tệp Trực Tiếp'
      },
      instruction: {
        en: 'Write an anchor tag that links to "/assets/spec.pdf" and prompts a download named "Product-Specification.pdf" with text "Download Specs".',
        vi: 'Viết thẻ a liên kết tới "/assets/spec.pdf" và kích hoạt tải về tệp có tên "Product-Specification.pdf" với nội dung "Download Specs".'
      },
      starterCode: '<!-- Write download anchor link -->\n',
      solutionCode: '<a href="/assets/spec.pdf" download="Product-Specification.pdf">Download Specs</a>',
      hint: {
        en: 'Use <a href="..." download="...">Text</a>.',
        vi: 'Dùng cú pháp <a href="..." download="...">Văn bản</a>.'
      },
      explanation: {
        en: 'The download attribute tells the browser to trigger a save dialog with the specified filename.',
        vi: 'Thuộc tính download báo cho trình duyệt lưu tệp với tên chỉ định.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_3',
    title: {
      en: 'Multi-Channel Contact and Navigation Portal',
      vi: 'Cổng Điều Hướng Và Liên Hệ Đa Kênh'
    },
    description: {
      en: 'Construct a fully accessible navigation and contact hub containing internal section links, secure external partner links, click-to-call mobile integration, email dispatch, and direct downloadable resource kits.',
      vi: 'Xây dựng trung tâm điều hướng và liên hệ chuẩn trợ năng gồm liên kết mục trong trang, liên kết đối tác ngoài an toàn, gọi điện di động một chạm, gửi email và tải bộ tài liệu trực tiếp.'
    },
    requirements: [
      {
        en: '<nav> element enclosing an unordered list <ul>',
        vi: 'Thẻ <nav> bao bọc danh sách <ul>'
      },
      {
        en: 'Internal fragment link to href="#team"',
        vi: 'Liên kết neo nội bộ href="#team"'
      },
      {
        en: 'External partner link with target="_blank" and rel="noopener noreferrer"',
        vi: 'Liên kết đối tác ngoài có target="_blank" và rel="noopener noreferrer"'
      },
      {
        en: 'Telephone link with href="tel:+18004862273"',
        vi: 'Liên kết gọi điện với href="tel:+18004862273"'
      },
      {
        en: 'Email link with href="mailto:press@company.com"',
        vi: 'Liên kết email với href="mailto:press@company.com"'
      },
      {
        en: 'Download link with href="/media/presskit.zip" and download="Media-PressKit-2026.zip"',
        vi: 'Liên kết tải về với href="/media/presskit.zip" và download="Media-PressKit-2026.zip"'
      }
    ],
    starterCode: '<!-- Build your navigation and contact hub -->\n',
    solutionCode: `<nav aria-label="Quick Connect Hub">
  <ul>
    <li><a href="#team">Our Team</a></li>
    <li><a href="https://partner.org" target="_blank" rel="noopener noreferrer">Global Partner</a></li>
    <li><a href="tel:+18004862273">Call Toll Free</a></li>
    <li><a href="mailto:press@company.com">Press Inquiries</a></li>
    <li><a href="/media/presskit.zip" download="Media-PressKit-2026.zip">Download Press Kit</a></li>
  </ul>
</nav>`,
    hints: [
      {
        en: 'Ensure all 5 links are contained within <li> items inside the <ul> inside <nav>.',
        vi: 'Đảm bảo cả 5 liên kết đều nằm trong các thẻ <li> của danh sách <ul> bên trong <nav>.'
      }
    ],
    solutionExplanation: {
      en: 'Combines all primary HTML hyperlink paradigms into an accessible, semantic navigation component.',
      vi: 'Kết hợp toàn bộ các kỹ thuật siêu liên kết HTML chính vào một thành phần điều hướng chuẩn trợ năng.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_3_1',
      type: 'single_choice',
      question: {
        en: 'Why is rel="noopener noreferrer" essential when using target="_blank"?',
        vi: 'Tại sao rel="noopener noreferrer" lại tối quan trọng khi sử dụng target="_blank"?'
      },
      options: [
        {
          en: 'It prevents the opened page from accessing window.opener to maliciously hijack or redirect the parent page (reverse tabnabbing)',
          vi: 'Nó ngăn trang đích truy cập đối tượng window.opener để chiếm quyền điều khiển hoặc chuyển hướng trang gốc (reverse tabnabbing)'
        },
        {
          en: 'It accelerates file downloads by 50%',
          vi: 'Nó tăng tốc độ tải tệp lên 50%'
        },
        {
          en: 'It forces the browser to disable JavaScript on the destination page',
          vi: 'Nó bắt buộc trình duyệt vô hiệu hóa JavaScript trên trang đích'
        },
        {
          en: 'It automatically translates the destination page into English',
          vi: 'Nó tự động dịch trang đích sang tiếng Anh'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Without noopener, window.opener on the destination page retains a reference to your window object, allowing malicious redirects.',
        vi: 'Nếu không có noopener, trang đích có thể dùng window.opener.location để chuyển hướng trang của bạn sang trang lừa đảo.'
      },
      topicId: 'html_links',
      difficulty: 'medium'
    },
    {
      id: 'html_q_3_2',
      type: 'single_choice',
      question: {
        en: 'How do you create an in-page anchor link that smoothly jumps to <section id="testimonials">?',
        vi: 'Làm thế nào để tạo liên kết neo nhảy đến <section id="testimonials"> trên cùng trang?'
      },
      options: [
        {
          en: '<a href="#testimonials">Read Testimonials</a>',
          vi: '<a href="#testimonials">Read Testimonials</a>'
        },
        {
          en: '<a href="testimonials">Read Testimonials</a>',
          vi: '<a href="testimonials">Read Testimonials</a>'
        },
        {
          en: '<a to="testimonials">Read Testimonials</a>',
          vi: '<a to="testimonials">Read Testimonials</a>'
        },
        {
          en: '<a target="testimonials">Read Testimonials</a>',
          vi: '<a target="testimonials">Read Testimonials</a>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Fragment identifier URLs begin with a hash character (#) followed by the target element\'s id.',
        vi: 'URL định danh neo bắt đầu bằng dấu thăng (#) đi kèm giá trị thuộc tính id của phần tử đích.'
      },
      topicId: 'html_links',
      difficulty: 'easy'
    },
    {
      id: 'html_q_3_3',
      type: 'single_choice',
      question: {
        en: 'Which URI protocol opens the device phone dialer when clicked on mobile browsers?',
        vi: 'Giao thức URI nào mở trình quay số điện thoại khi nhấp vào trên trình duyệt di động?'
      },
      options: [
        {
          en: 'tel:',
          vi: 'tel:'
        },
        {
          en: 'call:',
          vi: 'call:'
        },
        {
          en: 'phone:',
          vi: 'phone:'
        },
        {
          en: 'dial:',
          vi: 'dial:'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The tel: protocol (e.g. href="tel:+1234567890") prompts mobile devices to initiate a phone call.',
        vi: 'Giao thức tel: (vd: href="tel:+1234567890") yêu cầu thiết bị di động mở ứng dụng quay số.'
      },
      topicId: 'html_links',
      difficulty: 'easy'
    },
    {
      id: 'html_q_3_4',
      type: 'single_choice',
      question: {
        en: 'What is the function of the download attribute on an <a> element?',
        vi: 'Chức năng của thuộc tính download trên thẻ <a> là gì?'
      },
      options: [
        {
          en: 'Instructs the browser to download the linked resource as a local file rather than navigating to or previewing it',
          vi: 'Yêu cầu trình duyệt tải tài nguyên về thành tệp cục bộ thay vì điều hướng mở xem trực tiếp'
        },
        {
          en: 'Compresses image files into ZIP format on the fly',
          vi: 'Tự động nén hình ảnh thành tệp ZIP khi tải'
        },
        {
          en: 'Restricts the file to only download when connected to Wi-Fi',
          vi: 'Chỉ cho phép tải tệp khi có kết nối Wi-Fi'
        },
        {
          en: 'Scans the file for malware before opening',
          vi: 'Quét virus trước khi mở tệp'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The download attribute prompts the browser to trigger a save dialog, optionally with a prefilled filename.',
        vi: 'Thuộc tính download kích hoạt hộp thoại lưu tệp của trình duyệt với tên tệp tùy chọn.'
      },
      topicId: 'html_links',
      difficulty: 'easy'
    },
    {
      id: 'html_q_3_5',
      type: 'single_choice',
      question: {
        en: 'Which of the following is a protocol-relative (network-path reference) URL?',
        vi: 'Đâu là một URL tương đối theo giao thức (network-path reference)?'
      },
      options: [
        {
          en: '//cdn.example.com/lib.js',
          vi: '//cdn.example.com/lib.js'
        },
        {
          en: '/cdn/lib.js',
          vi: '/cdn/lib.js'
        },
        {
          en: 'https://cdn.example.com/lib.js',
          vi: 'https://cdn.example.com/lib.js'
        },
        {
          en: '../lib.js',
          vi: '../lib.js'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Starting with // inherits the current page protocol (http or https) without explicitly hardcoding it.',
        vi: 'Bắt đầu bằng // sẽ kế thừa giao thức hiện tại của trang (http hoặc https) mà không cần viết cố định.'
      },
      topicId: 'html_links',
      difficulty: 'medium'
    },
    {
      id: 'html_q_3_6',
      type: 'single_choice',
      question: {
        en: 'What does href="../index.html" mean in a relative URL path?',
        vi: 'href="../index.html" có ý nghĩa gì trong đường dẫn URL tương đối?'
      },
      options: [
        {
          en: 'Navigate up one directory level from the current folder, then locate index.html',
          vi: 'Di chuyển lên thư mục cha một cấp so với thư mục hiện tại, sau đó tìm tệp index.html'
        },
        {
          en: 'Search for index.html in the root folder regardless of depth',
          vi: 'Tìm index.html ở thư mục gốc bất kể cấp thư mục'
        },
        {
          en: 'Reload the current page twice',
          vi: 'Tải lại trang hiện tại hai lần'
        },
        {
          en: 'Open index.html in an incognito window',
          vi: 'Mở index.html trong cửa sổ ẩn danh'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '.. represents the parent directory in Unix and Web path conventions.',
        vi: '.. đại diện cho thư mục cha trong quy ước đường dẫn Unix và Web.'
      },
      topicId: 'html_links',
      difficulty: 'easy'
    },
    {
      id: 'html_q_3_7',
      type: 'single_choice',
      question: {
        en: 'Why is generic anchor text like "click here" considered bad practice?',
        vi: 'Tại sao việc đặt chữ liên kết chung chung như "bấm vào đây" lại là thói quen xấu?'
      },
      options: [
        {
          en: 'It degrades accessibility because screen reader users navigating by link lists receive zero context regarding the destination',
          vi: 'Nó làm giảm khả năng tiếp cận vì người dùng trình đọc màn hình duyệt danh sách link sẽ không hiểu điểm đến của liên kết'
        },
        {
          en: 'It causes HTML validators to fail completely',
          vi: 'Nó làm trình kiểm tra cú pháp HTML báo lỗi'
        },
        {
          en: 'It disables mouse hover styling in all modern browsers',
          vi: 'Nó làm vô hiệu hóa hiệu ứng rê chuột trong trình duyệt'
        },
        {
          en: 'It blocks CSS flexbox layouts',
          vi: 'Nó gây lỗi bố cục CSS flexbox'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Descriptive anchor text provides essential accessibility context and improves search engine ranking (SEO).',
        vi: 'Văn bản liên kết mang tính mô tả giúp người dùng trợ năng hiểu ngữ cảnh và cải thiện chỉ số SEO.'
      },
      topicId: 'html_links',
      difficulty: 'easy'
    },
    {
      id: 'html_q_3_8',
      type: 'single_choice',
      question: {
        en: 'What is the default value of the target attribute when omitted from an <a> element?',
        vi: 'Giá trị mặc định của thuộc tính target khi không được khai báo trên thẻ <a> là gì?'
      },
      options: [
        {
          en: '_self',
          vi: '_self'
        },
        {
          en: '_blank',
          vi: '_blank'
        },
        {
          en: '_parent',
          vi: '_parent'
        },
        {
          en: '_top',
          vi: '_top'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'By default, target="_self" loads the linked document in the current browsing context.',
        vi: 'Mặc định target="_self" sẽ tải trang liên kết ngay trong tab/cửa sổ duyệt web hiện tại.'
      },
      topicId: 'html_links',
      difficulty: 'easy'
    },
    {
      id: 'html_q_3_9',
      type: 'single_choice',
      question: {
        en: 'How can you include a prefilled subject line in a mailto: link?',
        vi: 'Làm thế nào để thêm tiêu đề thư soạn sẵn vào liên kết mailto:?'
      },
      options: [
        {
          en: 'href="mailto:user@example.com?subject=Support%20Request"',
          vi: 'href="mailto:user@example.com?subject=Support%20Request"'
        },
        {
          en: 'href="mailto:user@example.com#subject=Support"',
          vi: 'href="mailto:user@example.com#subject=Support"'
        },
        {
          en: 'href="mailto:user@example.com;subject=Support"',
          vi: 'href="mailto:user@example.com;subject=Support"'
        },
        {
          en: 'subject="Support Request" href="mailto:user@example.com"',
          vi: 'subject="Support Request" href="mailto:user@example.com"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Query parameters (?subject=...&body=...) can be appended to the mailto: scheme.',
        vi: 'Các tham số truy vấn (?subject=...&body=...) có thể được nối vào sau giao thức mailto:.'
      },
      topicId: 'html_links',
      difficulty: 'medium'
    },
    {
      id: 'html_q_3_10',
      type: 'single_choice',
      question: {
        en: 'Which attribute value for target opens the linked document in the full body of the current window, escaping any nested iframes?',
        vi: 'Giá trị nào của thuộc tính target mở tài liệu trong toàn bộ cửa sổ hiện tại, thoát khỏi mọi iframe lồng nhau?'
      },
      options: [
        {
          en: '_top',
          vi: '_top'
        },
        {
          en: '_parent',
          vi: '_parent'
        },
        {
          en: '_blank',
          vi: '_blank'
        },
        {
          en: '_root',
          vi: '_root'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'target="_top" breaks out of all nested iframe frames and loads the link in the topmost browsing context.',
        vi: 'target="_top" thoát khỏi tất cả các tầng iframe lồng nhau và mở trang trong khung cửa sổ cao nhất.'
      },
      topicId: 'html_links',
      difficulty: 'medium'
    }
  ]
};

export default lesson04;
