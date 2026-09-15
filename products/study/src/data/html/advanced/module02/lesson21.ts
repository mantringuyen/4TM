import { Lesson } from '../../../../types';

export const lesson21: Lesson = {
  id: 'html_lesson_21',
  moduleId: 'html_mod_6',
  levelId: 'advanced',
  courseId: 'html',
  order: 21,
  topicId: 'html_core_web_vitals_perf',
  title: {
    en: 'HTML Performance: Core Web Vitals, Content-Visibility & Rendering Optimization',
    vi: 'Hiệu Năng HTML: Core Web Vitals, Content-Visibility & Tối Ưu Render'
  },
  summary: {
    en: 'Master enterprise HTML rendering optimization and Core Web Vitals: Largest Contentful Paint (LCP) engineering with fetchpriority="high", eliminating Cumulative Layout Shift (CLS) with explicit aspect ratios and dimension attributes, Interaction to Next Paint (INP) responsiveness, skipped rendering with content-visibility: auto and contain-intrinsic-size, minimizing DOM node depth, and preventing layout thrashing.',
    vi: 'Làm chủ tối ưu hóa kết xuất HTML cấp doanh nghiệp và bộ chỉ số Core Web Vitals: kỹ thuật tối ưu LCP với fetchpriority="high", triệt tiêu dịch chuyển bố cục CLS bằng tỉ lệ aspect-ratio và kích thước tường minh, độ phản hồi tương tác INP, bỏ qua kết xuất ngoài màn hình với content-visibility: auto và contain-intrinsic-size, thu gọn độ sâu cây DOM và chống layout thrashing.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Modern web users demand instantaneous page loads and stutter-free interactions. Architecting HTML with Core Web Vitals and cutting-edge rendering primitives allows browser layout engines to bypass offscreen calculations and deliver lightning-fast 60fps experiences.',
      vi: 'Người dùng web hiện đại đòi hỏi tốc độ tải trang tức thì và trải nghiệm tương tác không giật lag. Thiết kế cấu trúc HTML đáp ứng Core Web Vitals và các công nghệ kết xuất tiên tiến cho phép nhân trình duyệt bỏ qua tính toán ngoài màn hình, mang lại tốc độ mượt mà 60fps.'
    },
    conceptExplanation: {
      en: '1. **The Core Web Vitals Triad**:\n   - **LCP (Largest Contentful Paint < 2.5s)**: Measures perceived load speed. Optimize the hero image with `<link rel="preload">`, `fetchpriority="high"`, and `loading="eager"`.\n   - **CLS (Cumulative Layout Shift < 0.1)**: Measures visual stability. Always provide explicit `width` and `height` on images, iframes, and reserve space for dynamic ads with CSS `aspect-ratio` or `min-height`.\n   - **INP (Interaction to Next Paint < 200ms)**: Measures page interactivity. Break up long script tasks and avoid deeply nested DOM subtrees.\n\n2. **Skipping Off-Screen Rendering with `content-visibility: auto`**:\n   - Elements with `content-visibility: auto` skip rendering and layout calculations until they approach the viewport!\n   - Pair with `contain-intrinsic-size: auto 500px` to prevent scrollbar jumping by reserving placeholder layout space.\n\n3. **DOM Tree Efficiency & Layout Thrashing**:\n   - Keep total DOM nodes under 1,400 with a maximum depth under 32 levels to prevent excessive recalculate-style costs.\n   - Avoid mixing DOM reads (e.g. `offsetHeight`) and writes (`element.style.top`) in loops to prevent forced synchronous layouts.',
      vi: '1. **Bộ 3 Chỉ Số Core Web Vitals**:\n   - **LCP (Largest Contentful Paint < 2.5s)**: Đo tốc độ tải nội dung chính. Tối ưu ảnh hero bằng `<link rel="preload">`, `fetchpriority="high"` và `loading="eager"`.\n   - **CLS (Cumulative Layout Shift < 0.1)**: Đo độ ổn định thị giác. Luôn khai báo `width` và `height` rõ ràng trên ảnh, iframe và chừa sẵn không gian bằng `aspect-ratio` hoặc `min-height`.\n   - **INP (Interaction to Next Paint < 200ms)**: Đo độ phản hồi tương tác. Tách nhỏ các tác vụ script dài và tránh cây DOM quá sâu.\n\n2. **Bỏ qua Render Ngoài Màn Hình với `content-visibility: auto`**:\n   - Các phần tử có `content-visibility: auto` sẽ được trình duyệt bỏ qua tính toán layout và render cho đến khi cuộn tới gần!\n   - Kết hợp với `contain-intrinsic-size: auto 500px` để giữ kích thước ảo, tránh giật thanh cuộn.\n\n3. **Tối Ưu Cây DOM & Chống Layout Thrashing**:\n   - Giữ tổng số node DOM dưới 1.400 và độ sâu dưới 32 tầng để giảm chi phí tính toán style.\n   - Tránh xen kẽ đọc DOM (`offsetHeight`) và ghi DOM (`style.top`) trong vòng lặp để ngăn chặn layout đồng bộ cưỡng bức.'
    },
    syntax: `<!-- LCP Image Optimization -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
<img src="/hero.webp" 
     alt="Flagship Innovation Center" 
     width="1200" 
     height="600" 
     fetchpriority="high" 
     loading="eager">

<!-- Content-Visibility for Long Page Sections -->
<section class="deep-article-section" style="content-visibility: auto; contain-intrinsic-size: auto 800px;">
  <h2>In-Depth Technical Specifications</h2>
  <p>Detailed performance benchmarks...</p>
</section>`,
    examples: [
      {
        title: {
          en: 'Preventing Cumulative Layout Shift (CLS) on Dynamic Media Containers',
          vi: 'Triệt Tiêu Dịch Chuyển Bố Cục (CLS) Trên Khung Đa Phương Tiện Động'
        },
        code: `<div class="ad-slot-wrapper" style="aspect-ratio: 16 / 9; min-height: 250px;">
  <iframe src="https://ads.partner.com/slot/77" 
          title="Sponsor Advertisement" 
          width="100%" 
          height="100%" 
          loading="lazy">
  </iframe>
</div>`,
        language: 'html',
        explanation: {
          en: 'Using aspect-ratio reserves exact layout space before the external iframe loads, ensuring zero layout shift.',
          vi: 'Sử dụng aspect-ratio giữ chỗ không gian chính xác trước khi iframe nạp xong, đảm bảo không có bất kỳ hiện tượng nhảy bố cục nào.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Adding loading="lazy" to the hero or above-the-fold LCP image',
          vi: 'Gắn loading="lazy" vào bức ảnh hero hoặc ảnh LCP nằm trên nếp gấp màn hình'
        },
        correction: {
          en: 'Lazy-loading the hero image delays its download until after JavaScript executes, severely degrading your LCP score. Use loading="eager" and fetchpriority="high" on LCP images.',
          vi: 'Lazy load ảnh hero làm trì hoãn tải ảnh cho đến khi JS chạy xong, phá hủy điểm LCP của bạn. Hãy dùng loading="eager" và fetchpriority="high" cho ảnh LCP.'
        },
        code: '<!-- Correct for Hero: <img src="/hero.jpg" fetchpriority="high" loading="eager"> -->'
      },
      {
        mistake: {
          en: 'Applying content-visibility: auto without contain-intrinsic-size',
          vi: 'Dùng content-visibility: auto mà không có contain-intrinsic-size'
        },
        correction: {
          en: 'Without contain-intrinsic-size, the unrendered element collapses to 0px height, causing the browser scrollbar to violently jump and stutter as the user scrolls down.',
          vi: 'Không có contain-intrinsic-size, phần tử chưa render sẽ xẹp xuống 0px, làm thanh cuộn nhảy loạn xạ khi người dùng cuộn trang.'
        },
        code: '<!-- Correct: style="content-visibility: auto; contain-intrinsic-size: auto 600px;" -->'
      }
    ],
    tips: [
      {
        en: 'Audit your DOM size using Chrome DevTools Lighthouse to ensure total DOM nodes stay below 1,400 and tree depth remains under 32 levels.',
        vi: 'Kiểm tra dung lượng DOM qua Chrome DevTools Lighthouse để đảm bảo tổng số node dưới 1.400 và độ sâu cây DOM không quá 32 tầng.'
      }
    ],
    practice: {
      task: {
        en: 'Configure High-Priority LCP Hero Image Markup',
        vi: 'Cấu Hình Thẻ Ảnh Hero LCP Ưu Tiên Cao'
      },
      instruction: {
        en: 'Create an <img> tag for src="/hero.webp", alt="Cloud Platform", width="1200", height="600", fetchpriority="high", and loading="eager".',
        vi: 'Tạo thẻ <img> cho src="/hero.webp", alt="Cloud Platform", width="1200", height="600", fetchpriority="high" và loading="eager".'
      },
      starterCode: '<!-- Build LCP hero image -->\n',
      solutionCode: `<img src="/hero.webp" 
     alt="Cloud Platform" 
     width="1200" 
     height="600" 
     fetchpriority="high" 
     loading="eager">`,
      requiredPatterns: [
        '<img',
        'src="/hero.webp"',
        'alt="Cloud Platform"',
        'width="1200"',
        'height="600"',
        'fetchpriority="high"',
        'loading="eager"'
      ],
      hint: {
        en: 'Include width, height, fetchpriority="high", and loading="eager".',
        vi: 'Kèm theo width, height, fetchpriority="high" và loading="eager".'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Implement Offscreen Content Visibility Optimization',
        vi: 'Triển Khai Tối Ưu Render Ngoài Màn Hình Bằng Content-Visibility'
      },
      instruction: {
        en: 'Create a <section class="footer-data" style="content-visibility: auto; contain-intrinsic-size: auto 400px;"><h2>System Logs</h2><p>Telemetry stream...</p></section>.',
        vi: 'Tạo thẻ <section class="footer-data" style="content-visibility: auto; contain-intrinsic-size: auto 400px;"><h2>System Logs</h2><p>Telemetry stream...</p></section>.'
      },
      starterCode: '<!-- Build content-visibility section -->\n',
      solutionCode: `<section class="footer-data" style="content-visibility: auto; contain-intrinsic-size: auto 400px;">
  <h2>System Logs</h2>
  <p>Telemetry stream...</p>
</section>`,
      requiredPatterns: [
        'content-visibility: auto;',
        'contain-intrinsic-size: auto 400px;',
        '<h2>System Logs</h2>'
      ],
      hint: {
        en: 'Apply content-visibility: auto and contain-intrinsic-size in style.',
        vi: 'Áp dụng content-visibility: auto và contain-intrinsic-size trong thuộc tính style.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_19_1',
      type: 'complete_code',
      title: {
        en: 'Add Fetchpriority High to Critical Hero Image',
        vi: 'Thêm Fetchpriority High Cho Ảnh Hero Quan Trọng'
      },
      instruction: {
        en: 'Add fetchpriority="high" to the hero image to boost LCP discovery.',
        vi: 'Thêm fetchpriority="high" vào ảnh hero để tăng tốc độ phát hiện LCP.'
      },
      starterCode: '<img src="banner.webp" alt="Product Launch" width="1600" height="800">',
      solutionCode: '<img src="banner.webp" alt="Product Launch" width="1600" height="800" fetchpriority="high">',
      hint: {
        en: 'Add fetchpriority="high" attribute.',
        vi: 'Thêm thuộc tính fetchpriority="high".'
      },
      explanation: {
        en: 'fetchpriority="high" signals the browser preload scanner to download the asset ahead of other images.',
        vi: 'fetchpriority="high" báo hiệu cho bộ quét nạp trước của trình duyệt tải tài nguyên trước các ảnh khác.'
      }
    },
    {
      id: 'html_ex_19_2',
      type: 'fix_code',
      title: {
        en: 'Fix LCP Performance Regression on Hero Banner',
        vi: 'Sửa Lỗi Suy Giảm Hiệu Năng LCP Trên Banner Hero'
      },
      instruction: {
        en: 'Change loading="lazy" to loading="eager" on the primary hero image to eliminate rendering delay.',
        vi: 'Đổi loading="lazy" thành loading="eager" trên ảnh hero chính để loại bỏ độ trễ kết xuất.'
      },
      starterCode: '<img src="hero.jpg" alt="Company Headquarters" width="1200" height="600" loading="lazy">',
      solutionCode: '<img src="hero.jpg" alt="Company Headquarters" width="1200" height="600" loading="eager">',
      hint: {
        en: 'Change loading="lazy" to loading="eager".',
        vi: 'Đổi loading="lazy" thành loading="eager".'
      },
      explanation: {
        en: 'Images in the initial viewport should never be lazy loaded.',
        vi: 'Ảnh xuất hiện ngay trong khung nhìn đầu tiên không bao giờ được lazy load.'
      }
    },
    {
      id: 'html_ex_19_3',
      type: 'write_code',
      title: {
        en: 'Write Aspect-Ratio Container to Prevent CLS',
        vi: 'Tạo Khung Chứa Aspect-Ratio Ngăn Chặn Lỗi CLS'
      },
      instruction: {
        en: 'Write a <div class="video-holder" style="aspect-ratio: 16 / 9;"><iframe src="video.html" title="Keynote" width="100%" height="100%"></iframe></div>.',
        vi: 'Viết thẻ <div class="video-holder" style="aspect-ratio: 16 / 9;"><iframe src="video.html" title="Keynote" width="100%" height="100%"></iframe></div>.'
      },
      starterCode: '<!-- Write CLS safe container -->\n',
      solutionCode: `<div class="video-holder" style="aspect-ratio: 16 / 9;">
  <iframe src="video.html" title="Keynote" width="100%" height="100%"></iframe>
</div>`,
      hint: {
        en: 'Use style="aspect-ratio: 16 / 9;".',
        vi: 'Dùng style="aspect-ratio: 16 / 9;".'
      },
      explanation: {
        en: 'Reserving aspect ratio prevents visual layout shifts while remote video players load.',
        vi: 'Giữ sẵn tỉ lệ khung hình ngăn chặn giật bố cục khi trình phát video đang tải.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_19',
    title: {
      en: 'Enterprise Sub-Second Performance Architecture Page',
      vi: 'Kiến Trúc Trang Web Doanh Nghiệp Tối Ưu Tốc Độ Dưới 1 Giây'
    },
    description: {
      en: 'Construct a production-ready HTML document architecture engineered for 100/100 Lighthouse performance metrics, featuring high-priority LCP preloading, strict zero-CLS media containers, and offscreen content-visibility rendering optimizations.',
      vi: 'Xây dựng cấu trúc tài liệu HTML chuẩn sản xuất đạt điểm Lighthouse 100/100, gồm nạp trước LCP ưu tiên cao, khung đa phương tiện triệt tiêu CLS và tối ưu render ngoài màn hình với content-visibility.'
    },
    requirements: [
      {
        en: '<link rel="preload" as="image" href="..." fetchpriority="high"> in document head',
        vi: '<link rel="preload" as="image" href="..." fetchpriority="high"> trong thẻ head'
      },
      {
        en: 'Hero <img> element with explicit width, height, fetchpriority="high", and loading="eager"',
        vi: 'Thẻ <img> hero có width, height, fetchpriority="high" và loading="eager"'
      },
      {
        en: 'Aspect-ratio container for dynamic embedded widgets to achieve CLS = 0',
        vi: 'Khung chứa aspect-ratio cho widget nhúng động để đạt CLS = 0'
      },
      {
        en: 'Long-scroll content section using content-visibility: auto and contain-intrinsic-size',
        vi: 'Khối nội dung cuộn dài sử dụng content-visibility: auto và contain-intrinsic-size'
      }
    ],
    starterCode: '<!-- Build enterprise high-performance page -->\n',
    solutionCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enterprise Cloud Platform Performance</title>
  <link rel="preload" as="image" href="/assets/hero-banner.webp" fetchpriority="high">
</head>
<body>
  <header>
    <h1>Global Cloud Fabric</h1>
    <img src="/assets/hero-banner.webp" 
         alt="Global Data Center Network" 
         width="1440" 
         height="720" 
         fetchpriority="high" 
         loading="eager">
  </header>

  <main>
    <div class="video-container" style="aspect-ratio: 16 / 9; min-height: 400px;">
      <iframe src="https://player.example.com/demo" title="Platform Demo" width="100%" height="100%" loading="lazy"></iframe>
    </div>

    <section class="performance-metrics" style="content-visibility: auto; contain-intrinsic-size: auto 900px;">
      <h2>Global Telemetry Benchmarks</h2>
      <p>Sub-millisecond latency distribution across 45 worldwide regions.</p>
    </section>
  </main>
</body>
</html>`,
    hints: [
      {
        en: 'Include the preload link in head and explicit dimensions on all media tags.',
        vi: 'Kèm theo thẻ link preload trong head và kích thước tường minh trên tất cả các thẻ media.'
      }
    ],
    solutionExplanation: {
      en: 'Eliminates all major web performance bottlenecks, achieving near-instant LCP, zero CLS, and minimal layout compute overhead.',
      vi: 'Loại bỏ toàn bộ các điểm nghẽn hiệu năng web chính, đạt LCP tức thì, CLS bằng 0 và giảm thiểu chi phí tính toán layout.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_19_1',
      type: 'single_choice',
      question: {
        en: 'What does the fetchpriority="high" attribute on an <img> or <link rel="preload"> instruct the browser network engine to do?',
        vi: 'Thuộc tính fetchpriority="high" trên thẻ <img> hoặc <link rel="preload"> chỉ dẫn engine mạng của trình duyệt làm gì?'
      },
      options: [
        {
          en: 'Increases the resource download priority above standard images so critical Largest Contentful Paint (LCP) assets load significantly faster',
          vi: 'Tăng mức ưu tiên tải xuống tài nguyên cao hơn các ảnh thông thường để tài sản LCP quan trọng tải nhanh hơn đáng kể'
        },
        {
          en: 'Compresses the image using server-side zip algorithms',
          vi: 'Nén bức ảnh bằng thuật toán zip trên máy chủ'
        },
        {
          en: 'Disables browser cache for that specific image',
          vi: 'Tắt bộ nhớ đệm trình duyệt cho bức ảnh đó'
        },
        {
          en: 'Forces the image to display in HDR color',
          vi: 'Ép bức ảnh hiển thị ở dải màu HDR'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'fetchpriority provides explicit hints to the browser scheduler to prioritize critical LCP resources.',
        vi: 'fetchpriority cung cấp gợi ý trực tiếp cho bộ điều phối mạng của trình duyệt để ưu tiên tài nguyên LCP tối quan trọng.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'easy'
    },
    {
      id: 'html_q_19_2',
      type: 'single_choice',
      question: {
        en: 'Why does omitting width and height attributes on <img> elements cause severe Cumulative Layout Shift (CLS)?',
        vi: 'Tại sao việc thiếu thuộc tính width và height trên thẻ <img> lại gây ra hiện tượng dịch chuyển bố cục (CLS) nghiêm trọng?'
      },
      options: [
        {
          en: 'Before the image bytes finish downloading, the browser reserves 0px height, then suddenly pushes all surrounding content downwards once image dimensions are parsed',
          vi: 'Trước khi tệp ảnh tải xong, trình duyệt chỉ chừa 0px chiều cao, sau đó đột ngột đẩy toàn bộ nội dung xung quanh xuống dưới khi kích thước ảnh được đọc'
        },
        {
          en: 'Because CSS becomes disabled without image dimensions',
          vi: 'Vì CSS bị vô hiệu hóa nếu thiếu kích thước ảnh'
        },
        {
          en: 'Because images cannot display without width and height',
          vi: 'Vì ảnh không thể hiển thị nếu không có width và height'
        },
        {
          en: 'Because it causes JavaScript runtime errors',
          vi: 'Vì nó gây lỗi thực thi JavaScript'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Explicit width and height allow modern browsers to compute aspect ratio and reserve layout space prior to download completion.',
        vi: 'Khai báo width và height rõ ràng cho phép trình duyệt tính toán aspect ratio và giữ sẵn vị trí trước khi tải xong ảnh.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'easy'
    },
    {
      id: 'html_q_19_3',
      type: 'single_choice',
      question: {
        en: 'What dramatic performance advantage does the CSS property content-visibility: auto provide for long-scrolling web pages?',
        vi: 'Thuộc tính CSS content-visibility: auto mang lại lợi thế hiệu năng vượt bậc nào cho các trang web có nội dung cuộn dài?'
      },
      options: [
        {
          en: 'It completely skips rendering, style calculation, and layout painting for offscreen content until the user scrolls near the viewport, drastically reducing initial load times',
          vi: 'Nó bỏ qua hoàn toàn việc render, tính toán style và vẽ layout cho các nội dung nằm ngoài màn hình cho đến khi người dùng cuộn tới gần, giúp giảm mạnh thời gian tải trang ban đầu'
        },
        {
          en: 'It converts HTML into WebAssembly',
          vi: 'Nó chuyển HTML thành WebAssembly'
        },
        {
          en: 'It increases network bandwidth by 40%',
          vi: 'Nó tăng băng thông mạng lên 40%'
        },
        {
          en: 'It removes all CSS from the page',
          vi: 'Nó xóa toàn bộ CSS khỏi trang'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'content-visibility: auto enables user-agent rendering skipping for offscreen subtrees.',
        vi: 'content-visibility: auto cho phép trình duyệt bỏ qua việc render các cây con nằm ngoài màn hình.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'medium'
    },
    {
      id: 'html_q_19_4',
      type: 'single_choice',
      question: {
        en: 'Why MUST you pair content-visibility: auto with contain-intrinsic-size?',
        vi: 'Tại sao bạn BẮT BUỘC phải kết hợp content-visibility: auto với contain-intrinsic-size?'
      },
      options: [
        {
          en: 'To provide an estimated placeholder dimension for the unrendered element, preventing the browser scrollbar and page height from violently jumping during scrolling',
          vi: 'Để cung cấp kích thước ảo ước lượng cho phần tử chưa render, ngăn thanh cuộn trình duyệt và chiều cao trang bị giật nhảy khi cuộn'
        },
        {
          en: 'To enable font ligatures in CSS',
          vi: 'Để bật tính năng nối chữ font trong CSS'
        },
        {
          en: 'To allow images to rotate 360 degrees',
          vi: 'Để cho phép ảnh xoay 360 độ'
        },
        {
          en: 'To encrypt DOM tree nodes',
          vi: 'Để mã hóa các node trên cây DOM'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'contain-intrinsic-size reserves placeholder box dimensions so layout height remains stable while offscreen rendering is skipped.',
        vi: 'contain-intrinsic-size giữ chỗ kích thước hộp ảo để chiều cao trang ổn định khi bỏ qua render ngoài màn hình.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'medium'
    },
    {
      id: 'html_q_19_5',
      type: 'single_choice',
      question: {
        en: 'What is the recommended maximum threshold for total DOM node count according to Google Lighthouse performance guidelines?',
        vi: 'Ngưỡng tối đa khuyến nghị cho tổng số lượng node DOM theo tiêu chuẩn hiệu năng Google Lighthouse là bao nhiêu?'
      },
      options: [
        {
          en: 'Fewer than 1,400 total DOM nodes (with maximum depth under 32)',
          vi: 'Dưới 1.400 tổng số node DOM (với độ sâu tối đa dưới 32 tầng)'
        },
        {
          en: 'Exactly 100,000 nodes',
          vi: 'Chính xác 100.000 node'
        },
        {
          en: 'Unlimited nodes with no impact',
          vi: 'Vô hạn node không ảnh hưởng gì'
        },
        {
          en: 'Maximum 10 nodes',
          vi: 'Tối đa 10 node'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Excessive DOM size (>1,400 nodes) severely degrades style recalculation and memory efficiency.',
        vi: 'Số lượng DOM quá lớn (>1.400 node) làm chậm nghiêm trọng việc tính toán style và ngốn bộ nhớ.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'easy'
    },
    {
      id: 'html_q_19_6',
      type: 'single_choice',
      question: {
        en: 'Which metric in Core Web Vitals measures page interactivity and responsiveness to user clicks, taps, and keypresses?',
        vi: 'Chỉ số nào trong Core Web Vitals đo lường độ phản hồi và tính tương tác của trang trước các thao tác click, chạm và gõ phím của người dùng?'
      },
      options: [
        {
          en: 'INP (Interaction to Next Paint)',
          vi: 'INP (Interaction to Next Paint)'
        },
        {
          en: 'FCP (First Contentful Paint)',
          vi: 'FCP (First Contentful Paint)'
        },
        {
          en: 'TTFB (Time to First Byte)',
          vi: 'TTFB (Time to First Byte)'
        },
        {
          en: 'DCL (DOMContentLoaded)',
          vi: 'DCL (DOMContentLoaded)'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'INP tracks the latency of all user interactions throughout the page lifecycle.',
        vi: 'INP theo dõi độ trễ của tất cả các tương tác người dùng trong suốt vòng đời trang web.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'easy'
    },
    {
      id: 'html_q_19_7',
      type: 'single_choice',
      question: {
        en: 'Why is adding loading="lazy" to the primary Largest Contentful Paint (LCP) hero banner an anti-pattern?',
        vi: 'Tại sao việc gắn loading="lazy" vào banner hero LCP chính lại là một sai lầm nghiêm trọng (anti-pattern)?'
      },
      options: [
        {
          en: 'Because lazy loading forces the browser to wait until JavaScript and layout engines compute visibility before requesting the image, delaying LCP by up to multiple seconds',
          vi: 'Vì lazy loading buộc trình duyệt phải đợi JS và engine layout tính toán vị trí hiển thị xong mới gửi yêu cầu tải ảnh, làm trễ LCP lên đến vài giây'
        },
        {
          en: 'Because lazy images are always rendered in black and white',
          vi: 'Vì ảnh lazy load luôn bị hiển thị màu đen trắng'
        },
        {
          en: 'Because search engines do not index lazy images',
          vi: 'Vì công cụ tìm kiếm không lập chỉ mục ảnh lazy load'
        },
        {
          en: 'Because lazy loading crashes iOS devices',
          vi: 'Vì lazy load làm treo thiết bị iOS'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Hero LCP images should always load with high priority (loading="eager" and fetchpriority="high").',
        vi: 'Ảnh hero LCP luôn phải được tải với mức ưu tiên cao (loading="eager" và fetchpriority="high").'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'medium'
    },
    {
      id: 'html_q_19_8',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of using CSS aspect-ratio on ad slots and dynamic media containers?',
        vi: 'Mục đích của việc sử dụng CSS aspect-ratio trên các khung quảng cáo và container đa phương tiện động là gì?'
      },
      options: [
        {
          en: 'Reserves proportional layout height before asynchronous scripts inject dynamic banner payloads, preventing Cumulative Layout Shift (CLS)',
          vi: 'Giữ sẵn chiều cao bố cục theo tỉ lệ trước khi script bất đồng bộ chèn nội dung quảng cáo vào, ngăn chặn hoàn toàn hiện tượng nhảy bố cục (CLS)'
        },
        {
          en: 'Forces ads to display in 4K resolution',
          vi: 'Ép quảng cáo hiển thị ở độ phân giải 4K'
        },
        {
          en: 'Disables user ad blockers automatically',
          vi: 'Tự động vô hiệu hóa trình chặn quảng cáo'
        },
        {
          en: 'Encrypts the video stream with DRM',
          vi: 'Mã hóa luồng video bằng DRM'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'aspect-ratio stabilizes the layout geometry before external payloads arrive.',
        vi: 'aspect-ratio ổn định kích thước hình học bố cục trước khi dữ liệu bên ngoài nạp về.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'easy'
    },
    {
      id: 'html_q_19_9',
      type: 'single_choice',
      question: {
        en: 'What is "Layout Thrashing" and how can it be avoided in JavaScript DOM manipulation?',
        vi: '"Layout Thrashing" là gì và làm thế nào để tránh nó khi thao tác DOM trong JavaScript?'
      },
      options: [
        {
          en: 'It occurs when JavaScript repeatedly alternates between reading geometric layout properties (e.g. offsetWidth) and writing DOM styles, forcing the browser to synchronously recalculate layout on every step; batching reads first and writes second eliminates it',
          vi: 'Xảy ra khi JS liên tục xen kẽ giữa đọc thuộc tính layout (vd: offsetWidth) và ghi style DOM, ép trình duyệt phải tính toán lại layout đồng bộ liên tục; gom nhóm đọc trước và ghi sau sẽ loại bỏ được hiện tượng này'
        },
        {
          en: 'It occurs when HTML files exceed 10 megabytes',
          vi: 'Xảy ra khi tệp HTML vượt quá 10 megabyte'
        },
        {
          en: 'It is a virus that deletes stylesheets',
          vi: 'Là một loại virus tự xóa bảng kiểu'
        },
        {
          en: 'It happens when HTML tags are not capitalized',
          vi: 'Xảy ra khi thẻ HTML không được viết hoa'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Batching DOM reads and writes prevents expensive forced synchronous reflows.',
        vi: 'Gom nhóm thao tác đọc và ghi DOM ngăn chặn hiện tượng ép tính toán lại layout đồng bộ tốn kém.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'hard'
    },
    {
      id: 'html_q_19_10',
      type: 'single_choice',
      question: {
        en: 'What Core Web Vitals metric score is considered "Good" for Largest Contentful Paint (LCP)?',
        vi: 'Điểm số Core Web Vitals nào được coi là "Tốt" (Good) đối với Largest Contentful Paint (LCP)?'
      },
      options: [
        {
          en: '2.5 seconds or faster',
          vi: '2.5 giây hoặc nhanh hơn'
        },
        {
          en: '10 seconds',
          vi: '10 giây'
        },
        {
          en: '0.001 milliseconds',
          vi: '0.001 mili-giây'
        },
        {
          en: 'Under 1 minute',
          vi: 'Dưới 1 phút'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LCP under 2.5 seconds at the 75th percentile of page loads is categorized as Good.',
        vi: 'LCP dưới 2.5 giây ở phân vị thứ 75 của các lượt tải trang được xếp loại Tốt.'
      },
      topicId: 'html_core_web_vitals_perf',
      difficulty: 'easy'
    }
  ]
};

export default lesson21;
