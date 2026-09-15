import { Lesson } from '../../../../types';

export const lesson06: Lesson = {
  id: 'html_lesson_6',
  moduleId: 'html_mod_2',
  levelId: 'basic',
  courseId: 'html',
  order: 6,
  topicId: 'html_images_responsive',
  title: {
    en: 'Images: alt, Responsive Images, srcset, sizes & <picture>',
    vi: 'Hình Ảnh: alt, Hình Ảnh Đáp Ứng, srcset, sizes & <picture>'
  },
  summary: {
    en: 'Master accessible web graphics and modern responsive image delivery: mandatory alt text strategies, width/height aspect ratios to prevent Cumulative Layout Shift (CLS), loading="lazy", decoding="async", resolution switching with srcset & sizes, and art direction with <picture>.',
    vi: 'Làm chủ hình ảnh web chuẩn trợ năng và phân phối ảnh đáp ứng hiện đại: chiến lược văn bản alt bắt buộc, tỷ lệ width/height chống vỡ layout (CLS), loading="lazy", decoding="async", chuyển đổi độ phân giải bằng srcset & sizes, và kỹ thuật art direction với <picture>.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Images account for over 50% of the total network payload on the modern web. Building high-performance, accessible web applications requires mastering intrinsic dimensioning, assistive alt text, lazy loading, and modern responsive delivery across diverse device displays.',
      vi: 'Hình ảnh chiếm hơn 50% dung lượng mạng tải về trên web hiện đại. Xây dựng ứng dụng web hiệu năng cao chuẩn trợ năng đòi hỏi làm chủ kích thước gốc, văn bản alt, tải lười (lazy loading) và phân phối ảnh đáp ứng cho đa dạng kích cỡ màn hình.'
    },
    conceptExplanation: {
      en: '1. **Core `<img>` Attributes**:\n   - `src` & `alt`: `alt` is mandatory for accessibility. For informative images, provide concise descriptions. For decorative graphics, use empty `alt=""` (or `aria-hidden="true"`) so screen readers skip them.\n   - `width` & `height`: Always declare intrinsic pixel dimensions. Modern browsers calculate aspect ratio (`width / height`) before download, preventing Cumulative Layout Shift (CLS).\n   - `loading="lazy"`: Defers fetching off-screen images until scrolled near viewport.\n   - `decoding="async"`: Decodes image off the main rendering thread to prevent scrolling jank.\n\n2. **Editorial Figures**:\n   - `<figure>` bundles visual content with an accessible `<figcaption>` subtitle.\n\n3. **Resolution Switching (`srcset` & `sizes`)**:\n   - `srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"`\n   - `sizes="(max-width: 600px) 100vw, 50vw"`\n   - Browser downloads optimal resolution based on viewport width and screen device pixel ratio (DPI).\n\n4. **Art Direction & Format Negotiation (`<picture>`)**:\n   - Serves modern formats (AVIF, WebP) with fallback to PNG/JPEG.\n   - Delivers different aspect ratio crops for mobile vs desktop with media queries.',
      vi: '1. **Các thuộc tính `<img>` cốt lõi**:\n   - `src` & `alt`: `alt` là bắt buộc cho trợ năng. Cung cấp mô tả súc tích cho ảnh mang thông tin, hoặc để rỗng `alt=""` cho ảnh trang trí thuần túy.\n   - `width` & `height`: Luôn khai báo kích thước pixel gốc. Trình duyệt tính toán tỷ lệ khung hình trước khi tải ảnh, loại bỏ hiện tượng nhảy layout (CLS).\n   - `loading="lazy"`: Trì hoãn nạp ảnh nằm ngoài màn hình đến khi người dùng cuộn tới gần.\n   - `decoding="async"`: Giải mã ảnh trên luồng riêng để cuộn trang mượt mà.\n\n2. **Khung chú thích `<figure>`**:\n   - `<figure>` đóng gói hình ảnh kèm chú thích `<figcaption>` chuẩn ngữ nghĩa.\n\n3. **Chuyển đổi độ phân giải (`srcset` & `sizes`)**:\n   - `srcset="photo-400.jpg 400w, photo-800.jpg 800w"` kết hợp `sizes="(max-width: 600px) 100vw, 50vw"`.\n   - Trình duyệt tự chọn ảnh tối ưu dựa theo kích thước màn hình và mật độ điểm ảnh (DPI).\n\n4. **Art Direction & Đa định dạng (`<picture>`)**:\n   - Phân phối định dạng nén thế hệ mới (AVIF, WebP) với cơ chế fallback về JPEG/PNG.\n   - Phục vụ ảnh cắt theo tỷ lệ khác nhau cho di động và máy tính.'
    },
    syntax: `<!-- High-performance responsive image -->
<picture>
  <source type="image/avif" srcset="/images/hero-1200.avif 1200w, /images/hero-600.avif 600w" sizes="(max-width: 768px) 100vw, 1200px">
  <source type="image/webp" srcset="/images/hero-1200.webp 1200w, /images/hero-600.webp 600w" sizes="(max-width: 768px) 100vw, 1200px">
  <img src="/images/hero-1200.jpg" alt="Developer coding in modern IDE workspace" width="1200" height="675" loading="lazy" decoding="async">
</picture>`,
    examples: [
      {
        title: {
          en: 'Accessible Figure with Caption and Dimensions',
          vi: 'Hình Ảnh Đóng Gói Figure Có Chú Thích Và Kích Thước'
        },
        code: `<figure>
  <img src="/assets/data-architecture.png" 
       alt="Diagram showing client requests routed through load balancer to microservices cluster" 
       width="800" 
       height="450" 
       loading="lazy">
  <figcaption>Figure 1.2: Cloud microservice architecture overview.</figcaption>
</figure>`,
        language: 'html',
        explanation: {
          en: 'Demonstrates proper pairing of figure and figcaption with descriptive alt text and intrinsic dimensions.',
          vi: 'Minh họa cách kết hợp figure và figcaption kèm văn bản alt mô tả chi tiết và kích thước pixel gốc.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Omitting width and height attributes on <img> tags',
          vi: 'Không khai báo thuộc tính width và height trên thẻ <img>'
        },
        correction: {
          en: 'Always declare intrinsic width and height so the browser reserves layout space before download, preventing Cumulative Layout Shift (CLS).',
          vi: 'Luôn khai báo width và height gốc để trình duyệt giữ chỗ trên giao diện trước khi tải xong ảnh, tránh hiện tượng giật vỡ layout.'
        },
        code: '<!-- Correct: <img src="logo.png" alt="Company Logo" width="200" height="50"> -->'
      },
      {
        mistake: {
          en: 'Adding redundant phrases like "image of" or "photo of" inside alt text',
          vi: 'Thêm các từ thừa như "ảnh chụp của" hoặc "hình ảnh của" vào văn bản alt'
        },
        correction: {
          en: 'Screen readers already announce the element as an image (e.g. "Graphic"). State the specific subject or function directly.',
          vi: 'Trình đọc màn hình đã tự động phát âm đây là hình ảnh. Hãy đi thẳng vào nội dung hoặc chức năng của ảnh.'
        },
        code: '<!-- Correct: alt="Sarah Jenkins delivering keynote speech" -->'
      }
    ],
    tips: [
      {
        en: 'Never add loading="lazy" to above-the-fold Largest Contentful Paint (LCP) hero images—doing so delays critical rendering.',
        vi: 'Không bao giờ gắn loading="lazy" cho ảnh bìa banner chính (LCP) ở đầu trang—việc này sẽ làm chậm thời gian tải trang ban đầu.'
      }
    ],
    practice: {
      task: {
        en: 'Implement an Accessible Responsive Figure',
        vi: 'Triển Khai Khung Ảnh Đáp Ứng Chuẩn Trợ Năng'
      },
      instruction: {
        en: 'Create a <figure> containing an <img> with src="/team.jpg", alt="Design team collaborating around whiteboard", width="600", height="400", loading="lazy", and a <figcaption> with text "Our product team at the annual hackathon.".',
        vi: 'Tạo thẻ <figure> chứa <img> có src="/team.jpg", alt="Design team collaborating around whiteboard", width="600", height="400", loading="lazy", và <figcaption> có chữ "Our product team at the annual hackathon.".'
      },
      starterCode: '<!-- Build figure with img and figcaption -->\n',
      solutionCode: `<figure>
  <img src="/team.jpg" alt="Design team collaborating around whiteboard" width="600" height="400" loading="lazy">
  <figcaption>Our product team at the annual hackathon.</figcaption>
</figure>`,
      requiredPatterns: [
        '<figure>',
        '<img src="/team.jpg"',
        'alt="Design team collaborating around whiteboard"',
        'width="600"',
        'height="400"',
        'loading="lazy"',
        '<figcaption>Our product team at the annual hackathon.</figcaption>',
        '</figure>'
      ],
      hint: {
        en: 'Wrap the <img> and <figcaption> inside <figure>. Include width, height, loading, and alt attributes.',
        vi: 'Bọc <img> và <figcaption> trong <figure>. Khai báo đầy đủ width, height, loading và alt.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Create a Picture Element with Modern Format Negotiation',
        vi: 'Tạo Thẻ Picture Chuyển Đổi Định Dạng Ảnh Hiện Đại'
      },
      instruction: {
        en: 'Construct a <picture> element offering an AVIF format with <source type="image/avif" srcset="/hero.avif">, a WebP format with <source type="image/webp" srcset="/hero.webp">, and a fallback <img> with src="/hero.jpg", alt="Mountain summit at sunrise", width="800", height="500".',
        vi: 'Xây dựng thẻ <picture> gồm định dạng AVIF với <source type="image/avif" srcset="/hero.avif">, định dạng WebP với <source type="image/webp" srcset="/hero.webp"> và thẻ <img> dự phòng có src="/hero.jpg", alt="Mountain summit at sunrise", width="800", height="500".'
      },
      starterCode: '<!-- Build picture with avif, webp, and fallback img -->\n',
      solutionCode: `<picture>
  <source type="image/avif" srcset="/hero.avif">
  <source type="image/webp" srcset="/hero.webp">
  <img src="/hero.jpg" alt="Mountain summit at sunrise" width="800" height="500">
</picture>`,
      requiredPatterns: [
        '<picture>',
        '<source type="image/avif" srcset="/hero.avif">',
        '<source type="image/webp" srcset="/hero.webp">',
        '<img src="/hero.jpg"',
        'alt="Mountain summit at sunrise"',
        'width="800"',
        'height="500"',
        '</picture>'
      ],
      hint: {
        en: 'Place source elements in priority order (AVIF, then WebP) followed by the standard img fallback.',
        vi: 'Đặt các thẻ source theo thứ tự ưu tiên (AVIF, rồi đến WebP) và kết thúc bằng thẻ img dự phòng.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_4_1',
      type: 'complete_code',
      title: {
        en: 'Add Proper Alt and Intrinsic Dimensions to Image',
        vi: 'Thêm Thuộc Tính Alt Và Kích Thước Gốc Cho Ảnh'
      },
      instruction: {
        en: 'Add alt="Analytics dashboard graph showing 45% growth", width="800", height="400", and loading="lazy" to the image tag.',
        vi: 'Thêm alt="Analytics dashboard graph showing 45% growth", width="800", height="400" và loading="lazy" vào thẻ img.'
      },
      starterCode: '<img src="/charts/growth.png">',
      solutionCode: '<img src="/charts/growth.png" alt="Analytics dashboard graph showing 45% growth" width="800" height="400" loading="lazy">',
      hint: {
        en: 'Insert alt, width, height, and loading attributes into the <img> tag.',
        vi: 'Thêm các thuộc tính alt, width, height và loading vào thẻ <img>.'
      },
      explanation: {
        en: 'Width and height ensure zero layout shifting, while alt guarantees screen reader accessibility.',
        vi: 'Width và height đảm bảo không vỡ layout, trong khi alt đảm bảo tính trợ năng cho trình đọc màn hình.'
      }
    },
    {
      id: 'html_ex_4_2',
      type: 'fix_code',
      title: {
        en: 'Fix Inaccessible Decorative Image Markup',
        vi: 'Sửa Thẻ Ảnh Trang Trí Không Chuẩn Trợ Năng'
      },
      instruction: {
        en: 'Change the alt text on this purely decorative background divider icon from "icon image" to an empty string alt="" so screen readers ignore it.',
        vi: 'Sửa văn bản alt của biểu tượng trang trí từ "icon image" thành chuỗi rỗng alt="" để trình đọc màn hình bỏ qua.'
      },
      starterCode: '<img src="/divider-leaf.svg" alt="icon image" width="24" height="24">',
      solutionCode: '<img src="/divider-leaf.svg" alt="" width="24" height="24">',
      hint: {
        en: 'Set alt="" for purely decorative elements.',
        vi: 'Đặt alt="" cho các phần tử trang trí thuần túy.'
      },
      explanation: {
        en: 'Empty alt="" informs screen readers that the graphic is decorative and safe to omit.',
        vi: 'alt="" rỗng thông báo cho trình đọc màn hình rằng hình ảnh chỉ mang tính trang trí.'
      }
    },
    {
      id: 'html_ex_4_3',
      type: 'write_code',
      title: {
        en: 'Write Responsive Image with srcset and sizes',
        vi: 'Tạo Ảnh Đáp Ứng Với srcset Và sizes'
      },
      instruction: {
        en: 'Write an <img> tag with src="/photo-800.jpg", srcset="/photo-400.jpg 400w, /photo-800.jpg 800w", sizes="(max-width: 600px) 100vw, 50vw", alt="Sunset over Pacific Ocean", width="800", height="450".',
        vi: 'Viết thẻ <img> có src="/photo-800.jpg", srcset="/photo-400.jpg 400w, /photo-800.jpg 800w", sizes="(max-width: 600px) 100vw, 50vw", alt="Sunset over Pacific Ocean", width="800", height="450".'
      },
      starterCode: '<!-- Write responsive img tag -->\n',
      solutionCode: '<img src="/photo-800.jpg" srcset="/photo-400.jpg 400w, /photo-800.jpg 800w" sizes="(max-width: 600px) 100vw, 50vw" alt="Sunset over Pacific Ocean" width="800" height="450">',
      hint: {
        en: 'Combine src, srcset, sizes, alt, width, and height in the <img> tag.',
        vi: 'Kết hợp src, srcset, sizes, alt, width và height trong thẻ <img>.'
      },
      explanation: {
        en: 'The browser matches the sizes condition to select the smallest sufficient image from srcset.',
        vi: 'Trình duyệt đối chiếu điều kiện sizes để tải ảnh nhỏ nhất đủ sắc nét từ srcset.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_4',
    title: {
      en: 'Next-Gen Responsive Media Art Direction Pipeline',
      vi: 'Hệ Thống Đồ Họa Đáp Ứng Định Dạng Thế Hệ Mới'
    },
    description: {
      en: 'Construct a multi-format, art-directed hero banner using <picture>, delivering modern AVIF and WebP formats, desktop and mobile layout crops, responsive sizes, and accessible captions inside a <figure>.',
      vi: 'Xây dựng banner chính đa định dạng dùng thẻ <picture>, hỗ trợ AVIF và WebP, cắt ảnh riêng cho di động và máy tính, sizes đáp ứng và chú thích trợ năng trong <figure>.'
    },
    requirements: [
      {
        en: '<figure> wrapper with child <figcaption>',
        vi: 'Khung <figure> bọc ngoài kèm <figcaption>'
      },
      {
        en: '<picture> element containing at least two <source> tags and one <img>',
        vi: 'Thẻ <picture> chứa ít nhất 2 thẻ <source> và 1 thẻ <img>'
      },
      {
        en: '<source> with type="image/avif" and srcset',
        vi: 'Thẻ <source> có type="image/avif" và srcset'
      },
      {
        en: '<source> with type="image/webp" and srcset',
        vi: 'Thẻ <source> có type="image/webp" và srcset'
      },
      {
        en: 'Fallback <img> with src, alt, width, height, loading="lazy", and decoding="async"',
        vi: 'Thẻ <img> dự phòng đầy đủ src, alt, width, height, loading="lazy" và decoding="async"'
      }
    ],
    starterCode: '<!-- Build responsive media component -->\n',
    solutionCode: `<figure>
  <picture>
    <source type="image/avif" srcset="/media/banner-800.avif 800w, /media/banner-1600.avif 1600w" sizes="(max-width: 768px) 100vw, 1200px">
    <source type="image/webp" srcset="/media/banner-800.webp 800w, /media/banner-1600.webp 1600w" sizes="(max-width: 768px) 100vw, 1200px">
    <img src="/media/banner-1600.jpg" alt="Autonomous vehicle sensor suite navigating city street" width="1600" height="900" loading="lazy" decoding="async">
  </picture>
  <figcaption>Figure 2.1: Real-time LiDAR and optical sensor telemetry in urban environment.</figcaption>
</figure>`,
    hints: [
      {
        en: 'Ensure the <picture> element is inside the <figure>, followed by the <figcaption>.',
        vi: 'Đảm bảo thẻ <picture> nằm trong <figure>, theo sau bởi <figcaption>.'
      }
    ],
    solutionExplanation: {
      en: 'Provides the fastest possible load times by offering AVIF/WebP next-gen formats while maintaining bulletproof fallback and zero CLS.',
      vi: 'Tối ưu tốc độ tải trang cao nhất với AVIF/WebP trong khi đảm bảo khả năng tương thích ngược và không giật vỡ khung hình.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_4_1',
      type: 'single_choice',
      question: {
        en: 'Why must every <img> tag include explicit width and height attributes in modern HTML5?',
        vi: 'Tại sao mọi thẻ <img> trong HTML5 hiện đại cần khai báo tường minh thuộc tính width và height?'
      },
      options: [
        {
          en: 'It enables the browser layout engine to compute aspect ratio and reserve display space before the image is downloaded, preventing Cumulative Layout Shift (CLS)',
          vi: 'Nó giúp trình duyệt tính toán tỷ lệ khung hình và giữ chỗ hiển thị trước khi tải xong ảnh, ngăn ngừa hiện tượng giật vỡ layout (CLS)'
        },
        {
          en: 'It compresses the image file on the client computer',
          vi: 'Nó nén dung lượng tệp ảnh trên máy client'
        },
        {
          en: 'It prevents right-click saving of the image',
          vi: 'Nó ngăn chặn hành vi nhấp chuột phải để lưu ảnh'
        },
        {
          en: 'It is required to make the image appear in search results',
          vi: 'Nó là bắt buộc để ảnh xuất hiện trên công cụ tìm kiếm'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Declaring intrinsic width and height allows the browser to calculate aspect-ratio immediately, eliminating layout shifts.',
        vi: 'Khai báo width và height gốc giúp trình duyệt xác định trước tỷ lệ aspect-ratio, loại bỏ hiện tượng giật trang khi ảnh tải xong.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'medium'
    },
    {
      id: 'html_q_4_2',
      type: 'single_choice',
      question: {
        en: 'How should you treat purely decorative images (like background flourishes) for screen reader users?',
        vi: 'Bạn nên xử lý hình ảnh trang trí thuần túy (như hoa văn nền) như thế nào đối với người dùng trình đọc màn hình?'
      },
      options: [
        {
          en: 'Provide an empty alt attribute (alt="") so screen readers cleanly ignore it',
          vi: 'Cung cấp thuộc tính alt rỗng (alt="") để trình đọc màn hình bỏ qua không đọc'
        },
        {
          en: 'Omit the alt attribute entirely',
          vi: 'Bỏ hoàn toàn thuộc tính alt'
        },
        {
          en: 'Set alt="Decorative image"',
          vi: 'Đặt alt="Decorative image"'
        },
        {
          en: 'Set alt="None"',
          vi: 'Đặt alt="None"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'alt="" marks the graphic as decorative; omitting the attribute causes screen readers to redundantly read the raw image URL.',
        vi: 'alt="" đánh dấu ảnh là trang trí; nếu bỏ quên thuộc tính alt, trình đọc màn hình sẽ đọc to đường dẫn tệp ảnh gây khó chịu cho người dùng.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'easy'
    },
    {
      id: 'html_q_4_3',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the <picture> element in HTML5?',
        vi: 'Mục đích của thẻ <picture> trong HTML5 là gì?'
      },
      options: [
        {
          en: 'Enables art direction (different image crops per breakpoint) and format negotiation (AVIF/WebP with JPEG fallback)',
          vi: 'Cho phép xử lý art direction (cắt ảnh khác nhau theo kích thước màn hình) và chuyển đổi định dạng (AVIF/WebP kèm fallback JPEG)'
        },
        {
          en: 'Applies Instagram-style CSS filters natively',
          vi: 'Áp dụng bộ lọc màu CSS kiểu Instagram'
        },
        {
          en: 'Renders vector SVG graphics procedurally',
          vi: 'Vẽ đồ họa vector SVG tự động'
        },
        {
          en: 'Encrypts image files before transmission',
          vi: 'Mã hóa tệp hình ảnh trước khi truyền tải'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<picture> wraps multiple <source> elements to deliver format choices and media query-based art direction.',
        vi: '<picture> bao bọc nhiều thẻ <source> để cung cấp nhiều định dạng nén và các tỷ lệ khung hình khác nhau theo media query.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'medium'
    },
    {
      id: 'html_q_4_4',
      type: 'single_choice',
      question: {
        en: 'What does the "w" descriptor mean in srcset="img-400.jpg 400w, img-800.jpg 800w"?',
        vi: 'Ký tự mô tả "w" có ý nghĩa gì trong srcset="img-400.jpg 400w, img-800.jpg 800w"?'
      },
      options: [
        {
          en: 'Specifies the real physical width of the image file in pixels',
          vi: 'Chỉ định chiều rộng thực tế của tệp ảnh tính bằng pixel'
        },
        {
          en: 'Specifies the download weight in kilobytes',
          vi: 'Chỉ định dung lượng tải tính bằng kilobyte'
        },
        {
          en: 'Specifies the viewport width threshold in CSS rem units',
          vi: 'Chỉ định ngưỡng độ rộng màn hình theo đơn vị CSS rem'
        },
        {
          en: 'Specifies the loading delay in milliseconds',
          vi: 'Chỉ định độ trễ tải tính bằng mili-giây'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The w descriptor informs the browser of the image\'s intrinsic pixel width before it downloads.',
        vi: 'Ký tự w thông báo cho trình duyệt biết chiều rộng pixel gốc của tệp ảnh trước khi quyết định tải về.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'easy'
    },
    {
      id: 'html_q_4_5',
      type: 'single_choice',
      question: {
        en: 'When should loading="lazy" NOT be applied to an image?',
        vi: 'Khi nào KHÔNG nên gắn loading="lazy" vào thẻ ảnh?'
      },
      options: [
        {
          en: 'On the main above-the-fold hero image that constitutes the Largest Contentful Paint (LCP)',
          vi: 'Trên ảnh bìa hero chính ở đầu trang đại diện cho chỉ số Largest Contentful Paint (LCP)'
        },
        {
          en: 'On footer copyright logos',
          vi: 'Trên logo bản quyền ở chân trang'
        },
        {
          en: 'On user profile avatars inside long comment lists',
          vi: 'Trên avatar người dùng trong danh sách bình luận dài'
        },
        {
          en: 'On sidebar advertisements below the fold',
          vi: 'Trên quảng cáo thanh bên dưới màn hình đầu'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Lazy loading the primary LCP image delays its discovery and download, degrading Core Web Vitals.',
        vi: 'Gắn lazy loading cho ảnh chính LCP sẽ làm trì hoãn quá trình nạp ảnh quan trọng, ảnh hưởng xấu đến điểm Core Web Vitals.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'medium'
    },
    {
      id: 'html_q_4_6',
      type: 'single_choice',
      question: {
        en: 'Which element is semantically designated to provide a visible caption for a <figure>?',
        vi: 'Thẻ nào được chỉ định để cung cấp chú thích nhìn thấy được cho thẻ <figure>?'
      },
      options: [
        {
          en: '<figcaption>',
          vi: '<figcaption>'
        },
        {
          en: '<caption>',
          vi: '<caption>'
        },
        {
          en: '<label>',
          vi: '<label>'
        },
        {
          en: '<summary>',
          vi: '<summary>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<figcaption> provides a programmatic caption for parent <figure> elements. <caption> is strictly for <table>.',
        vi: '<figcaption> cung cấp chú thích cho <figure>. Thẻ <caption> dùng riêng cho bảng <table>.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'easy'
    },
    {
      id: 'html_q_4_7',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of decoding="async" on an <img> element?',
        vi: 'Mục đích của decoding="async" trên thẻ <img> là gì?'
      },
      options: [
        {
          en: 'Instructs the browser engine to decode the image raster off the main UI thread to prevent page scrolling stutter',
          vi: 'Chỉ thị cho trình duyệt giải mã dữ liệu ảnh trên luồng nền để tránh giật lag khi cuộn trang'
        },
        {
          en: 'Decodes encrypted image files using SSL keys',
          vi: 'Giải mã các tệp ảnh được mã hóa bằng khóa SSL'
        },
        {
          en: 'Converts JPEG files to PNG in browser memory',
          vi: 'Chuyển đổi tệp JPEG sang PNG trong bộ nhớ trình duyệt'
        },
        {
          en: 'Makes the image transparent while loading',
          vi: 'Làm ảnh trong suốt trong khi tải'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'decoding="async" offloads image rasterization to background threads, maintaining smooth 60fps UI performance.',
        vi: 'decoding="async" chuyển tác vụ giải mã ảnh sang luồng phụ, duy trì khung hình 60fps mượt mà cho giao diện.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'medium'
    },
    {
      id: 'html_q_4_8',
      type: 'single_choice',
      question: {
        en: 'Which modern image format generally provides the highest compression efficiency for photographic content?',
        vi: 'Định dạng hình ảnh hiện đại nào thường mang lại hiệu quả nén cao nhất cho hình ảnh chụp thực tế?'
      },
      options: [
        {
          en: 'AVIF',
          vi: 'AVIF'
        },
        {
          en: 'GIF',
          vi: 'GIF'
        },
        {
          en: 'BMP',
          vi: 'BMP'
        },
        {
          en: 'TIFF',
          vi: 'TIFF'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'AVIF (AV1 Image File Format) offers up to 50% smaller file sizes compared to JPEG with superior perceptual quality.',
        vi: 'AVIF mang lại dung lượng nhỏ hơn tới 50% so với JPEG trong khi vẫn giữ nguyên chất lượng hình ảnh sắc nét.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'easy'
    },
    {
      id: 'html_q_4_9',
      type: 'single_choice',
      question: {
        en: 'In a <picture> element, which element MUST be present as the final child fallback?',
        vi: 'Trong thẻ <picture>, phần tử nào BẮT BUỘC phải hiện diện ở vị trí con cuối cùng để hiển thị dự phòng?'
      },
      options: [
        {
          en: '<img>',
          vi: '<img>'
        },
        {
          en: '<fallback>',
          vi: '<fallback>'
        },
        {
          en: '<canvas>',
          vi: '<canvas>'
        },
        {
          en: '<noscript>',
          vi: '<noscript>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<picture> acts as a wrapper offering source alternatives, but the <img> element is what actually renders in the DOM.',
        vi: '<picture> chỉ là thẻ bao bọc gợi ý nguồn ảnh, còn thẻ <img> con bên trong mới là phần tử thực sự hiển thị trên DOM.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'easy'
    },
    {
      id: 'html_q_4_10',
      type: 'single_choice',
      question: {
        en: 'What does sizes="(max-width: 768px) 100vw, 50vw" tell the browser?',
        vi: 'Cú pháp sizes="(max-width: 768px) 100vw, 50vw" thông báo điều gì cho trình duyệt?'
      },
      options: [
        {
          en: 'The image will display at 100% of viewport width on screens up to 768px wide, and 50% of viewport width on larger screens',
          vi: 'Ảnh sẽ chiếm 100% chiều rộng màn hình trên thiết bị rộng tới 768px, và chiếm 50% chiều rộng màn hình trên các màn hình lớn hơn'
        },
        {
          en: 'The maximum allowed file size is 768 kilobytes',
          vi: 'Kích thước tệp tối đa cho phép là 768 kilobyte'
        },
        {
          en: 'The browser must resize the image using CSS transform: scale(0.5)',
          vi: 'Trình duyệt phải co giãn ảnh bằng CSS transform: scale(0.5)'
        },
        {
          en: 'The image will only display if the browser window is larger than 768px',
          vi: 'Ảnh sẽ chỉ hiển thị nếu cửa sổ trình duyệt lớn hơn 768px'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The sizes attribute informs the browser of the intended rendered slot width before CSS styles are downloaded.',
        vi: 'Thuộc tính sizes báo cho trình duyệt biết chiều rộng hiển thị dự kiến của ảnh trước khi tải xong các tệp CSS.'
      },
      topicId: 'html_images_responsive',
      difficulty: 'medium'
    }
  ]
};

export default lesson06;
