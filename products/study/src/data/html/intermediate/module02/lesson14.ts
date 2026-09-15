import { Lesson } from '../../../../types';

export const lesson14: Lesson = {
  id: 'html_lesson_14',
  moduleId: 'html_mod_4',
  levelId: 'intermediate',
  courseId: 'html',
  order: 14,
  topicId: 'html_iframes_embeds',
  title: {
    en: 'Embedded Content: iframe, sandbox, loading, embed & object',
    vi: 'Nội Dung Nhúng: iframe, sandbox, loading, embed & object'
  },
  summary: {
    en: 'Master secure embedding and third-party isolation: <iframe> architecture, mandatory title attributes for accessibility, fine-grained security policies with the sandbox attribute (allow-scripts, allow-same-origin), permission policies with allow, performance tuning via loading="lazy", and legacy embedding with <embed> and <object>.',
    vi: 'Làm chủ kỹ thuật nhúng an toàn và cô lập nội dung bên thứ 3: kiến trúc <iframe>, thuộc tính title bắt buộc cho trợ năng, chính sách bảo mật sandbox phân quyền chi tiết (allow-scripts, allow-same-origin), chính sách phân quyền allow, tối ưu hiệu năng với loading="lazy" và các thẻ nhúng <embed>, <object>.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Modern web applications frequently embed third-party widgets, interactive maps, payment gateways, video players, and cross-origin documents. Implementing robust sandbox boundaries and accessibility titles is essential to protect user security and guarantee screen reader accessibility.',
      vi: 'Các ứng dụng web hiện đại thường xuyên phải nhúng widget bên thứ ba, bản đồ tương tác, cổng thanh toán, trình phát video và tài liệu từ nguồn khác. Thiết lập ranh giới sandbox bảo mật và thuộc tính title trợ năng là điều kiện bắt buộc để bảo vệ an toàn cho người dùng.'
    },
    conceptExplanation: {
      en: '1. **`<iframe>` Fundamentals**:\n   - `<iframe src="https://..." title="Descriptive Title" width="800" height="450" loading="lazy"></iframe>`\n   - `title`: MANDATORY for accessibility. Screen readers vocalize the title to help users understand what the frame contains.\n   - `loading="lazy"`: Defers iframe network fetching until the user scrolls near the viewport.\n\n2. **The `sandbox` Security Boundary**:\n   - When `sandbox` is present with no value, it applies maximum restrictions (blocks scripts, forms, popups, cookies, same-origin access).\n   - Granular tokens: `allow-scripts`, `allow-forms`, `allow-same-origin`, `allow-popups`, `allow-modals`.\n   - SECURITY WARNING: Never combine `allow-scripts` and `allow-same-origin` on untrusted user-uploaded content, as the iframe can remove its own sandbox restrictions!\n\n3. **Feature Permissions (`allow` attribute)**:\n   - Controls device APIs: `allow="camera; microphone; geolocation; fullscreen"`.\n\n4. **`<embed>` & `<object>`**:\n   - `<object data="doc.pdf" type="application/pdf">`: Versatile container with fallback HTML children.\n   - `<embed src="media.swf">`: Void element for legacy media plugins.',
      vi: '1. **Kiến thức cốt lõi về `<iframe>`**:\n   - `<iframe src="https://..." title="Tiêu đề mô tả" width="800" height="450" loading="lazy"></iframe>`\n   - `title`: BẮT BUỘC cho trợ năng. Trình đọc màn hình phát âm tiêu đề này để người dùng biết khung nhúng chứa nội dung gì.\n   - `loading="lazy"`: Trì hoãn tải iframe cho đến khi người dùng cuộn đến gần.\n\n2. **Ranh giới bảo mật `sandbox`**:\n   - Khi có thuộc tính `sandbox` rỗng, nó áp dụng mức bảo mật tối đa (chặn script, chặn submit form, chặn popup, chặn cookie).\n   - Các cờ cấp quyền chi tiết: `allow-scripts`, `allow-forms`, `allow-same-origin`, `allow-popups`.\n   - CẢNH BÁO BẢO MẬT: Tuyệt đối không kết hợp `allow-scripts` và `allow-same-origin` cho nội dung không đáng tin cậy do người dùng tải lên, vì mã trong iframe có thể tự gỡ bỏ hạn chế sandbox!\n\n3. **Cấp quyền tính năng (thuộc tính `allow`)**:\n   - Kiểm soát quyền truy cập API thiết bị: `allow="camera; microphone; geolocation; fullscreen"`.\n\n4. **Thẻ `<embed>` & `<object>`**:\n   - `<object data="doc.pdf" type="application/pdf">`: Thẻ nhúng đa năng kèm nội dung HTML dự phòng bên trong.\n   - `<embed src="...">`: Thẻ rỗng (void element) nhúng tệp ngoài.'
    },
    syntax: `<iframe 
  src="https://maps.example.com/embed" 
  title="Corporate Headquarters Map Location" 
  width="600" 
  height="400" 
  loading="lazy" 
  sandbox="allow-scripts allow-popups" 
  allow="fullscreen" 
  referrerpolicy="no-referrer">
</iframe>`,
    examples: [
      {
        title: {
          en: 'Secure Sandboxed Video Player Iframe',
          vi: 'Iframe Trình Phát Video Nhúng Được Bảo Mật Sandbox'
        },
        code: `<iframe 
  src="https://player.example.com/video/98765" 
  title="Product Keynote Launch Presentation" 
  width="854" 
  height="480" 
  sandbox="allow-scripts allow-same-origin" 
  allow="autoplay; fullscreen; picture-in-picture" 
  loading="lazy">
</iframe>`,
        language: 'html',
        explanation: {
          en: 'Demonstrates sandboxed restrictions combined with allow capabilities for hardware-accelerated playback.',
          vi: 'Minh họa các hạn chế sandbox kết hợp với cấp quyền allow cho phép phát video tăng tốc phần cứng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Omitting the title attribute on <iframe> tags',
          vi: 'Không khai báo thuộc tính title trên thẻ <iframe>'
        },
        correction: {
          en: 'WCAG guidelines mandate a descriptive title on every iframe so screen reader users can identify the embedded frame without navigating into it.',
          vi: 'Tiêu chuẩn WCAG bắt buộc phải có thuộc tính title trên mọi thẻ iframe để người dùng trình đọc màn hình biết nội dung nhúng là gì.'
        },
        code: '<!-- Correct: <iframe src="..." title="Interactive Payment Form"> -->'
      },
      {
        mistake: {
          en: 'Combining allow-scripts and allow-same-origin on untrusted user-generated content',
          vi: 'Kết hợp cả allow-scripts và allow-same-origin cho nội dung do người dùng tải lên'
        },
        correction: {
          en: 'If an iframe has both allow-scripts and allow-same-origin, JavaScript inside the frame can dynamically remove the sandbox attribute entirely.',
          vi: 'Nếu iframe có cả allow-scripts và allow-same-origin, mã JS bên trong có thể tự động gỡ bỏ hoàn toàn thuộc tính sandbox.'
        },
        code: '<!-- Security Best Practice: Never combine allow-scripts + allow-same-origin on untrusted origin -->'
      }
    ],
    tips: [
      {
        en: 'Add referrerpolicy="no-referrer" or referrerpolicy="strict-origin-when-cross-origin" to iframes to protect internal URLs from leaking in HTTP referer headers.',
        vi: 'Thêm referrerpolicy="no-referrer" vào iframe để bảo vệ không làm lộ đường dẫn URL nội bộ trong header HTTP referer.'
      }
    ],
    practice: {
      task: {
        en: 'Construct a Secure Sandboxed Iframe with Title',
        vi: 'Xây Dựng Thẻ Iframe Được Sandbox An Toàn Kèm Title'
      },
      instruction: {
        en: 'Create an <iframe> with src="https://charts.example.com", title="Quarterly Analytics Interactive Graph", width="800", height="500", loading="lazy", and sandbox="allow-scripts allow-forms".',
        vi: 'Tạo thẻ <iframe> có src="https://charts.example.com", title="Quarterly Analytics Interactive Graph", width="800", height="500", loading="lazy" và sandbox="allow-scripts allow-forms".'
      },
      starterCode: '<!-- Build secure iframe -->\n',
      solutionCode: `<iframe src="https://charts.example.com" 
        title="Quarterly Analytics Interactive Graph" 
        width="800" 
        height="500" 
        loading="lazy" 
        sandbox="allow-scripts allow-forms">
</iframe>`,
      requiredPatterns: [
        '<iframe',
        'src="https://charts.example.com"',
        'title="Quarterly Analytics Interactive Graph"',
        'width="800"',
        'height="500"',
        'loading="lazy"',
        'sandbox="allow-scripts allow-forms"',
        '</iframe>'
      ],
      hint: {
        en: 'Include src, title, width, height, loading, and sandbox attributes on the iframe.',
        vi: 'Khai báo các thuộc tính src, title, width, height, loading và sandbox trên iframe.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Implement PDF Document Embedding with Object Fallback',
        vi: 'Triển Khai Nhúng Tài Liệu PDF Bằng Thẻ Object Có Dự Phòng'
      },
      instruction: {
        en: 'Construct an <object data="/docs/annual-report.pdf" type="application/pdf" width="100%" height="600"> with a fallback paragraph containing a download anchor link.',
        vi: 'Xây dựng thẻ <object data="/docs/annual-report.pdf" type="application/pdf" width="100%" height="600"> có đoạn văn bản fallback chứa liên kết tải tệp.'
      },
      starterCode: '<!-- Build object with fallback -->\n',
      solutionCode: `<object data="/docs/annual-report.pdf" type="application/pdf" width="100%" height="600">
  <p>Your browser does not support embedded PDFs. <a href="/docs/annual-report.pdf">Download Annual Report (PDF)</a>.</p>
</object>`,
      requiredPatterns: [
        '<object data="/docs/annual-report.pdf" type="application/pdf"',
        'width="100%"',
        'height="600">',
        '<a href="/docs/annual-report.pdf">',
        '</object>'
      ],
      hint: {
        en: 'Place the fallback message and download link inside the <object> element.',
        vi: 'Đặt thông báo dự phòng và liên kết tải về bên trong thẻ <object>.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_8_1',
      type: 'complete_code',
      title: {
        en: 'Add Accessible Title and Lazy Loading to Iframe',
        vi: 'Thêm Thuộc Tính Title Và Lazy Loading Cho Iframe'
      },
      instruction: {
        en: 'Add title="Customer Support Chatbot Interface" and loading="lazy" to the <iframe> tag.',
        vi: 'Thêm title="Customer Support Chatbot Interface" và loading="lazy" vào thẻ <iframe>.'
      },
      starterCode: '<iframe src="https://chat.example.com" width="400" height="600"></iframe>',
      solutionCode: '<iframe src="https://chat.example.com" title="Customer Support Chatbot Interface" width="400" height="600" loading="lazy"></iframe>',
      hint: {
        en: 'Insert title and loading="lazy" attributes.',
        vi: 'Thêm các thuộc tính title và loading="lazy".'
      },
      explanation: {
        en: 'The title attribute gives screen reader users necessary context, while loading="lazy" conserves network resources.',
        vi: 'Thuộc tính title cung cấp ngữ cảnh cho người dùng khiếm thị, còn loading="lazy" giúp tiết kiệm tài nguyên mạng.'
      }
    },
    {
      id: 'html_ex_8_2',
      type: 'fix_code',
      title: {
        en: 'Fix Insecure Iframe Sandbox Permissions',
        vi: 'Sửa Quyền Sandbox Không An Toàn Trong Iframe'
      },
      instruction: {
        en: 'Add the sandbox="allow-scripts allow-same-origin" attribute to sandbox the untrusted third-party widget.',
        vi: 'Thêm thuộc tính sandbox="allow-scripts allow-same-origin" để cô lập widget bên thứ 3 không đáng tin cậy.'
      },
      starterCode: '<iframe src="https://untrusted-widget.com/view" title="Live Stock Ticker" width="300" height="200"></iframe>',
      solutionCode: '<iframe src="https://untrusted-widget.com/view" title="Live Stock Ticker" width="300" height="200" sandbox="allow-scripts allow-same-origin"></iframe>',
      hint: {
        en: 'Add sandbox="allow-scripts allow-same-origin".',
        vi: 'Thêm sandbox="allow-scripts allow-same-origin".'
      },
      explanation: {
        en: 'The sandbox attribute establishes a strict security perimeter around third-party embedded content.',
        vi: 'Thuộc tính sandbox thiết lập ranh giới bảo mật nghiêm ngặt xung quanh nội dung nhúng của bên thứ 3.'
      }
    },
    {
      id: 'html_ex_8_3',
      type: 'write_code',
      title: {
        en: 'Write PDF Object Embed with Fallback Link',
        vi: 'Tạo Thẻ Object Nhúng PDF Kèm Link Dự Phòng'
      },
      instruction: {
        en: 'Write an <object data="whitepaper.pdf" type="application/pdf" width="600" height="400"><p>Download <a href="whitepaper.pdf">PDF</a></p></object>.',
        vi: 'Viết thẻ <object data="whitepaper.pdf" type="application/pdf" width="600" height="400"><p>Download <a href="whitepaper.pdf">PDF</a></p></object>.'
      },
      starterCode: '<!-- Write object element -->\n',
      solutionCode: `<object data="whitepaper.pdf" type="application/pdf" width="600" height="400">
  <p>Download <a href="whitepaper.pdf">PDF</a></p>
</object>`,
      hint: {
        en: 'Use <object data="whitepaper.pdf" type="application/pdf"> with internal fallback.',
        vi: 'Dùng <object data="whitepaper.pdf" type="application/pdf"> kèm fallback bên trong.'
      },
      explanation: {
        en: '<object> seamlessly embeds documents with graceful HTML degradation.',
        vi: '<object> nhúng tài liệu mượt mà kèm cơ chế thoái lui HTML an toàn.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_8',
    title: {
      en: 'Enterprise Third-Party Micro-Frontend Security Sandbox',
      vi: 'Khung Nhúng Micro-Frontend Bảo Mật Sandbox Doanh Nghiệp'
    },
    description: {
      en: 'Construct a secure third-party micro-frontend embedding pipeline with strict sandbox token isolation, feature policy permission controls, responsive dimensions, lazy loading, and accessible title labeling.',
      vi: 'Xây dựng hệ thống nhúng micro-frontend bảo mật với cơ chế cô lập thẻ sandbox nghiêm ngặt, kiểm soát chính sách quyền allow, kích thước đáp ứng, lazy loading và nhãn title trợ năng.'
    },
    requirements: [
      {
        en: '<iframe> with descriptive title',
        vi: 'Thẻ <iframe> có title mô tả'
      },
      {
        en: 'Explicit width="100%" and height="650"',
        vi: 'Khai báo width="100%" và height="650"'
      },
      {
        en: 'sandbox attribute with specific allow-scripts and allow-forms tokens',
        vi: 'Thuộc tính sandbox có các cờ allow-scripts và allow-forms'
      },
      {
        en: 'allow attribute granting fullscreen and clipboard-write permissions',
        vi: 'Thuộc tính allow cấp quyền fullscreen và clipboard-write'
      },
      {
        en: 'loading="lazy" and referrerpolicy="strict-origin-when-cross-origin"',
        vi: 'loading="lazy" và referrerpolicy="strict-origin-when-cross-origin"'
      }
    ],
    starterCode: '<!-- Build enterprise sandbox micro-frontend -->\n',
    solutionCode: `<iframe 
  src="https://payments.partner-gateway.com/checkout/v3" 
  title="Secure Payment and Card Processing Terminal" 
  width="100%" 
  height="650" 
  loading="lazy" 
  sandbox="allow-scripts allow-forms allow-popups" 
  allow="fullscreen; clipboard-write" 
  referrerpolicy="strict-origin-when-cross-origin">
</iframe>`,
    hints: [
      {
        en: 'Ensure all attributes (title, sandbox, allow, loading, referrerpolicy) are present on the <iframe>.',
        vi: 'Đảm bảo có đầy đủ các thuộc tính (title, sandbox, allow, loading, referrerpolicy) trên thẻ <iframe>.'
      }
    ],
    solutionExplanation: {
      en: 'Provides maximum enterprise security isolation, preventing malicious iframe scripts from compromising the host window context.',
      vi: 'Mang lại khả năng cô lập bảo mật cấp doanh nghiệp tối đa, ngăn ngừa mã độc trong iframe làm tổn hại đến ngữ cảnh cửa sổ chính.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_8_1',
      type: 'single_choice',
      question: {
        en: 'Why is the title attribute mandatory on every <iframe> according to WCAG 2.2 accessibility standards?',
        vi: 'Tại sao thuộc tính title là bắt buộc trên mọi thẻ <iframe> theo tiêu chuẩn trợ năng WCAG 2.2?'
      },
      options: [
        {
          en: 'Screen readers vocalize the title so visually impaired users can identify the purpose of the embedded frame without having to navigate into it',
          vi: 'Trình đọc màn hình sẽ đọc to title để người dùng khiếm thị biết mục đích của khung nhúng mà không cần phải duyệt vào bên trong nó'
        },
        {
          en: 'It is required to change the iframe border color in CSS',
          vi: 'Bắt buộc phải có để đổi màu viền iframe trong CSS'
        },
        {
          en: 'It speeds up DNS resolution by 50%',
          vi: 'Nó tăng tốc phân giải DNS thêm 50%'
        },
        {
          en: 'It enables audio playback inside the iframe',
          vi: 'Nó cho phép phát âm thanh bên trong iframe'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The title attribute provides the accessible name for the frame in the accessibility tree.',
        vi: 'Thuộc tính title cung cấp tên trợ năng cho khung nhúng trong cây tiếp cận.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'easy'
    },
    {
      id: 'html_q_8_2',
      type: 'single_choice',
      question: {
        en: 'What occurs when you apply an empty sandbox attribute (<iframe sandbox ...>) to an iframe?',
        vi: 'Điều gì xảy ra khi bạn gắn thuộc tính sandbox rỗng (<iframe sandbox ...>) vào một iframe?'
      },
      options: [
        {
          en: 'It enforces maximum restrictions: disabling scripts, form submissions, popups, modals, plugins, and treating the content as from a unique origin',
          vi: 'Nó áp đặt hạn chế tối đa: vô hiệu hóa script, chặn submit form, chặn popup, modal, plugin và coi nội dung thuộc một nguồn độc lập duy nhất'
        },
        {
          en: 'It allows all permissions unrestricted',
          vi: 'Nó cho phép tất cả các quyền mà không bị hạn chế'
        },
        {
          en: 'It hides the iframe completely from the display',
          vi: 'Nó ẩn hoàn toàn iframe khỏi màn hình'
        },
        {
          en: 'It deletes the source file from the server',
          vi: 'Nó xóa tệp nguồn khỏi máy chủ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'An empty sandbox attribute enforces the strictest possible isolation mode.',
        vi: 'Thuộc tính sandbox rỗng kích hoạt chế độ cô lập an toàn nghiêm ngặt nhất.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'easy'
    },
    {
      id: 'html_q_8_3',
      type: 'single_choice',
      question: {
        en: 'Why is combining sandbox="allow-scripts allow-same-origin" considered a severe security vulnerability when embedding untrusted content from the same domain?',
        vi: 'Tại sao kết hợp sandbox="allow-scripts allow-same-origin" bị coi là lỗ hổng bảo mật nghiêm trọng khi nhúng nội dung không đáng tin cậy từ cùng domain?'
      },
      options: [
        {
          en: 'Because an embedded script running in the same origin can programmatically access the parent DOM and remove its own sandbox attribute entirely',
          vi: 'Vì một đoạn script độc hại chạy trong cùng nguồn có thể truy cập cây DOM của trang cha và tự động gỡ bỏ thuộc tính sandbox của chính nó'
        },
        {
          en: 'Because it disables HTTPS encryption',
          vi: 'Vì nó vô hiệu hóa mã hóa HTTPS'
        },
        {
          en: 'Because it causes memory leaks in the browser',
          vi: 'Vì nó gây rò rỉ bộ nhớ trong trình duyệt'
        },
        {
          en: 'Because it blocks search engine crawlers',
          vi: 'Vì nó chặn các bot tìm kiếm'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Having both allow-scripts and allow-same-origin allows the frame to manipulate its own container in the parent document.',
        vi: 'Có cả 2 quyền này cho phép frame thao túng container của chính nó trên tài liệu cha.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'hard'
    },
    {
      id: 'html_q_8_4',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the allow attribute on an <iframe> element?',
        vi: 'Mục đích của thuộc tính allow trên thẻ <iframe> là gì?'
      },
      options: [
        {
          en: 'Defines the Feature Policy / Permissions Policy granting or restricting access to browser APIs (such as camera, microphone, geolocation, fullscreen)',
          vi: 'Định nghĩa chính sách quyền hạn (Permissions Policy) cho phép hoặc hạn chế quyền truy cập vào các API trình duyệt (như camera, microphone, vị trí, toàn màn hình)'
        },
        {
          en: 'Lists the IP addresses permitted to view the iframe',
          vi: 'Liệt kê các địa chỉ IP được phép xem iframe'
        },
        {
          en: 'Sets the maximum download file size',
          vi: 'Đặt dung lượng tệp tải về tối đa'
        },
        {
          en: 'Specifies which CSS stylesheets may be loaded',
          vi: 'Chỉ định các tệp CSS được phép nạp'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The allow attribute controls browser feature policy delegations for embedded contexts.',
        vi: 'Thuộc tính allow kiểm soát việc phân quyền các tính năng thiết bị cho ngữ cảnh nhúng.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'medium'
    },
    {
      id: 'html_q_8_5',
      type: 'single_choice',
      question: {
        en: 'What benefit does loading="lazy" provide when applied to an <iframe>?',
        vi: 'Lợi ích của loading="lazy" khi áp dụng trên thẻ <iframe> là gì?'
      },
      options: [
        {
          en: 'Defers loading the iframe content and network requests until the user scrolls within proximity of the iframe\'s position in the viewport',
          vi: 'Trì hoãn tải nội dung và các yêu cầu mạng của iframe cho đến khi người dùng cuộn tới gần vị trí của iframe trong màn hình'
        },
        {
          en: 'Renders the iframe in black and white until clicked',
          vi: 'Hiển thị iframe ở chế độ đen trắng cho đến khi bấm vào'
        },
        {
          en: 'Reduces the frame rate of embedded videos to 10fps',
          vi: 'Giảm tốc độ khung hình của video nhúng xuống 10fps'
        },
        {
          en: 'Compresses HTML code on the fly',
          vi: 'Nén mã HTML tự động'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Lazy loading iframes dramatically improves initial page load times and saves mobile bandwidth.',
        vi: 'Lazy loading iframe giúp tăng tốc đáng kể thời gian tải trang đầu và tiết kiệm băng thông di động.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'easy'
    },
    {
      id: 'html_q_8_6',
      type: 'single_choice',
      question: {
        en: 'What is the key structural advantage of using <object> over <iframe> for embedding PDF documents?',
        vi: 'Ưu điểm cấu trúc then chốt của việc dùng thẻ <object> so với <iframe> khi nhúng tài liệu PDF là gì?'
      },
      options: [
        {
          en: '<object> allows putting standard HTML fallback content inside its opening and closing tags that renders seamlessly if PDF viewing is unsupported',
          vi: '<object> cho phép đặt nội dung HTML dự phòng bên trong cặp thẻ mở và đóng để hiển thị mượt mà nếu trình duyệt không hỗ trợ đọc PDF'
        },
        {
          en: '<object> automatically translates PDFs into audiobooks',
          vi: '<object> tự động chuyển PDF thành sách nói'
        },
        {
          en: '<object> encrypts the PDF with AES-256',
          vi: '<object> mã hóa PDF bằng AES-256'
        },
        {
          en: '<object> works without a browser engine',
          vi: '<object> hoạt động mà không cần nhân trình duyệt'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<object> supports graceful degradation by rendering internal children if the external asset fails to load.',
        vi: '<object> hỗ trợ cơ chế thoái lui an toàn bằng cách hiển thị các thẻ con bên trong nếu tệp ngoài không nạp được.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'medium'
    },
    {
      id: 'html_q_8_7',
      type: 'single_choice',
      question: {
        en: 'Which sandbox token must be included if an embedded iframe needs to submit an HTML form?',
        vi: 'Cờ sandbox nào bắt buộc phải có nếu một iframe nhúng cần gửi dữ liệu qua một biểu mẫu HTML?'
      },
      options: [
        {
          en: 'allow-forms',
          vi: 'allow-forms'
        },
        {
          en: 'allow-inputs',
          vi: 'allow-inputs'
        },
        {
          en: 'allow-post',
          vi: 'allow-post'
        },
        {
          en: 'allow-submit',
          vi: 'allow-submit'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'allow-forms re-enables form submission inside a sandboxed iframe.',
        vi: 'allow-forms mở lại quyền gửi biểu mẫu bên trong một iframe đã bật sandbox.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'easy'
    },
    {
      id: 'html_q_8_8',
      type: 'single_choice',
      question: {
        en: 'What sandbox token is required to allow an iframe to open new browser tabs or windows using target="_blank"?',
        vi: 'Cờ sandbox nào là cần thiết để cho phép iframe mở các tab hoặc cửa sổ trình duyệt mới bằng target="_blank"?'
      },
      options: [
        {
          en: 'allow-popups',
          vi: 'allow-popups'
        },
        {
          en: 'allow-new-tab',
          vi: 'allow-new-tab'
        },
        {
          en: 'allow-navigation',
          vi: 'allow-navigation'
        },
        {
          en: 'allow-windows',
          vi: 'allow-windows'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'allow-popups permits window.open() and target="_blank" links within the sandboxed frame.',
        vi: 'allow-popups cho phép gọi window.open() và nhấp liên kết target="_blank" trong khung sandbox.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'medium'
    },
    {
      id: 'html_q_8_9',
      type: 'single_choice',
      question: {
        en: 'Which attribute prevents an embedded iframe from sending the full referrer URL in HTTP requests when fetching cross-origin resources?',
        vi: 'Thuộc tính nào ngăn iframe nhúng gửi đầy đủ URL nguồn trong các yêu cầu HTTP khi tải tài nguyên từ nguồn khác?'
      },
      options: [
        {
          en: 'referrerpolicy="no-referrer" or referrerpolicy="strict-origin-when-cross-origin"',
          vi: 'referrerpolicy="no-referrer" hoặc referrerpolicy="strict-origin-when-cross-origin"'
        },
        {
          en: 'privacy="high"',
          vi: 'privacy="high"'
        },
        {
          en: 'secure="true"',
          vi: 'secure="true"'
        },
        {
          en: 'no-track="enabled"',
          vi: 'no-track="enabled"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'referrerpolicy controls how much referrer information is transmitted during external fetches.',
        vi: 'referrerpolicy kiểm soát lượng thông tin URL giới thiệu được truyền đi khi thực hiện fetch ra ngoài.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'easy'
    },
    {
      id: 'html_q_8_10',
      type: 'single_choice',
      question: {
        en: 'Is the <embed> element a container element with a closing </embed> tag or a void element?',
        vi: 'Phần tử <embed> là phần tử container có thẻ đóng </embed> hay là một thẻ rỗng (void element)?'
      },
      options: [
        {
          en: 'It is a void element with no closing tag and cannot contain child fallback content',
          vi: 'Nó là một thẻ rỗng (void element) không có thẻ đóng và không thể chứa nội dung dự phòng con bên trong'
        },
        {
          en: 'It is a full container requiring </embed>',
          vi: 'Nó là thẻ container hoàn chỉnh bắt buộc phải có </embed>'
        },
        {
          en: 'It can only be used inside <head>',
          vi: 'Nó chỉ có thể được dùng bên trong <head>'
        },
        {
          en: 'It has been completely removed from HTML5',
          vi: 'Nó đã bị xóa hoàn toàn khỏi HTML5'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<embed> is a void element; use <object> if you need fallback child markup.',
        vi: '<embed> là thẻ rỗng; hãy dùng <object> nếu bạn cần nội dung HTML dự phòng.'
      },
      topicId: 'html_iframes_embeds',
      difficulty: 'medium'
    }
  ]
};

export default lesson14;
