import { Lesson } from '../../../../types';

export const lesson15: Lesson = {
  id: 'html_lesson_15',
  moduleId: 'html_mod_4',
  levelId: 'intermediate',
  courseId: 'html',
  order: 15,
  topicId: 'html_svg_graphics',
  title: {
    en: 'SVG in HTML: Inline SVG, Semantics, Accessibility & Responsive Graphics',
    vi: 'SVG Trong HTML: Inline SVG, Ngữ Nghĩa, Trợ Năng & Đồ Họa Đáp Ứng'
  },
  summary: {
    en: 'Master Scalable Vector Graphics (SVG) integration in HTML5: inline XML vector embedding, coordinate systems with viewBox and preserveAspectRatio, vector primitives (<rect>, <circle>, <path>, <polygon>), accessible SVG architectures (role="img", <title>, <desc>, aria-hidden="true" for decorative icons), CSS manipulation (currentColor, fill, stroke), and modern responsive iconography.',
    vi: 'Làm chủ tích hợp Đồ họa Vector Co giãn (SVG) trong HTML5: nhúng vector XML nội dòng, hệ tọa độ với viewBox và preserveAspectRatio, các hình học cơ bản (<rect>, <circle>, <path>, <polygon>), kiến trúc SVG chuẩn trợ năng (role="img", <title>, <desc>, aria-hidden="true" cho icon trang trí), tùy biến bằng CSS (currentColor, fill, stroke) và hệ thống biểu tượng đáp ứng hiện đại.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'SVG is the web standard for resolution-independent 2D vector illustrations, UI icons, and interactive data visualizations. Inlining SVG directly inside HTML DOM enables instant CSS styling, dynamic scripting, and precise accessibility control.',
      vi: 'SVG là chuẩn web cho đồ họa vector 2D sắc nét ở mọi độ phân giải, hệ thống biểu tượng UI và trực quan hóa dữ liệu tương tác. Nhúng trực tiếp SVG vào DOM HTML cho phép định kiểu CSS tức thì, lập trình linh hoạt và kiểm soát trợ năng chính xác.'
    },
    conceptExplanation: {
      en: '1. **Inline SVG vs External Image**:\n   - `<img src="icon.svg" alt="...">`: Treated as an external raster-like image; cannot be styled via CSS or scripted via DOM.\n   - Inline `<svg viewBox="0 0 24 24">...</svg>`: Full DOM node access, CSS styling (`fill: currentColor`), hover transitions, and JavaScript manipulation.\n\n2. **The `viewBox` Coordinate System**:\n   - `viewBox="minX minY width height"` defines the virtual canvas bounds (e.g. `viewBox="0 0 100 100"`).\n   - `preserveAspectRatio="xMidYMid meet"` ensures uniform scaling without distortion across responsive container sizes.\n\n3. **Core Vector Primitives**:\n   - `<rect x="10" y="10" width="80" height="40" rx="4"/>`: Rectangles with optional corner radii.\n   - `<circle cx="50" cy="50" r="40"/>`: Circles defined by center coordinates and radius.\n   - `<path d="M10 10 L50 90 Z"/>`: Complex bezier curves and lines.\n\n4. **Accessible SVG Patterns**:\n   - **Meaningful / Informative SVG**: `<svg role="img" aria-labelledby="svg-title svg-desc"><title id="svg-title">Growth Chart</title><desc id="svg-desc">Bar graph showing 45% revenue increase</desc>...</svg>`\n   - **Decorative SVG / Icons**: `<svg aria-hidden="true" focusable="false">...</svg>` paired with adjacent text or `<span class="sr-only">`.',
      vi: '1. **Inline SVG vs Ảnh Bên Ngoài**:\n   - `<img src="icon.svg" alt="...">`: Được coi như ảnh ngoài; không thể đổi màu bằng CSS hay tương tác DOM.\n   - Inline `<svg viewBox="0 0 24 24">...</svg>`: Là một phần của DOM, cho phép đổi màu CSS (`fill: currentColor`), hiệu ứng hover và điều khiển bằng JS.\n\n2. **Hệ tọa độ `viewBox`**:\n   - `viewBox="minX minY width height"` định nghĩa khung vẽ ảo (vd: `viewBox="0 0 100 100"`).\n   - `preserveAspectRatio="xMidYMid meet"` đảm bảo co giãn đồng dạng không bị méo hình trên các màn hình khác nhau.\n\n3. **Các hình học vector cơ bản**:\n   - `<rect x="10" y="10" width="80" height="40" rx="4"/>`: Hình chữ nhật kèm bo góc `rx`.\n   - `<circle cx="50" cy="50" r="40"/>`: Hình tròn với tọa độ tâm và bán kính `r`.\n   - `<path d="M10 10 L50 90 Z"/>`: Đường cong bezier và đa giác phức tạp.\n\n4. **Kỹ thuật SVG Chuẩn Trợ Năng**:\n   - **SVG Chứa Thông Tin Quan Trọng**: `<svg role="img" aria-labelledby="svg-title svg-desc"><title id="svg-title">Biểu đồ</title><desc id="svg-desc">Mô tả chi tiết</desc>...</svg>`\n   - **SVG Trang Trí / Biểu Tượng**: `<svg aria-hidden="true" focusable="false">...</svg>` đi kèm văn bản kế bên hoặc thẻ ẩn màn hình `<span class="sr-only">`.'
    },
    syntax: `<!-- Meaningful Accessible SVG -->
<svg role="img" aria-labelledby="chart-title chart-desc" viewBox="0 0 200 100" class="metric-chart">
  <title id="chart-title">Sales Revenue Milestone</title>
  <desc id="chart-desc">Horizontal bar showing 85% completion of Q4 sales quota</desc>
  <rect x="0" y="20" width="200" height="30" rx="6" fill="#e2e8f0"/>
  <rect x="0" y="20" width="170" height="30" rx="6" fill="#2563eb"/>
</svg>

<!-- Decorative UI Icon -->
<button type="button">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="16" height="16">
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
  <span>Add New Record</span>
</button>`,
    examples: [
      {
        title: {
          en: 'Responsive Vector Badge with Dynamic currentColor',
          vi: 'Huy Hiệu Vector Đáp Ứng Kèm currentColor Động'
        },
        code: `<svg viewBox="0 0 32 32" width="32" height="32" role="img" aria-label="Verified Shield">
  <path d="M16 2L4 7v10c0 7.5 5.1 14.5 12 16 6.9-1.5 12-8.5 12-16V7L16 2z" fill="#059669"/>
  <path d="M14 19.5l-4-4 1.4-1.4 2.6 2.6 6.6-6.6 1.4 1.4-8 8z" fill="#ffffff"/>
</svg>`,
        language: 'html',
        explanation: {
          en: 'Demonstrates multi-path vector shapes with precise coordinates and accessibility labeling.',
          vi: 'Minh họa hình vector nhiều đường path với tọa độ chính xác và nhãn trợ năng đầy đủ.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Omitting the viewBox attribute on inline <svg> elements',
          vi: 'Quên không khai báo thuộc tính viewBox trên thẻ <svg> nội dòng'
        },
        correction: {
          en: 'Without viewBox, the SVG cannot scale responsively when sized with CSS width and height, causing cropping or clipping.',
          vi: 'Không có viewBox, SVG không thể co giãn tự động theo kích thước CSS width và height, dẫn đến việc bị cắt xén hình.'
        },
        code: '<!-- Correct: <svg viewBox="0 0 24 24" width="24" height="24"> -->'
      },
      {
        mistake: {
          en: 'Leaving decorative UI icons unhidden from screen readers',
          vi: 'Để các biểu tượng trang trí không được ẩn đi trước trình đọc màn hình'
        },
        correction: {
          en: 'Decorative icons should always include aria-hidden="true" and focusable="false" to prevent screen readers from reading meaningless SVG code.',
          vi: 'Các icon trang trí luôn cần có aria-hidden="true" và focusable="false" để tránh làm phiền người dùng trình đọc màn hình.'
        },
        code: '<!-- Correct: <svg aria-hidden="true" focusable="false"> -->'
      }
    ],
    tips: [
      {
        en: 'Use fill="currentColor" or stroke="currentColor" inside SVG paths so their colors automatically inherit from the surrounding CSS text color.',
        vi: 'Dùng fill="currentColor" hoặc stroke="currentColor" để màu sắc vector tự động thừa kế từ màu chữ CSS của phần tử cha.'
      }
    ],
    practice: {
      task: {
        en: 'Create an Accessible Vector Icon Button',
        vi: 'Tạo Nút Bấm Chứa Icon Vector Chuẩn Trợ Năng'
      },
      instruction: {
        en: 'Create a <button type="button"> containing a decorative <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg> followed by <span>Download Assets</span>.',
        vi: 'Tạo <button type="button"> chứa <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg> theo sau là <span>Download Assets</span>.'
      },
      starterCode: '<!-- Build SVG button -->\n',
      solutionCode: `<button type="button">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="24" height="24">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
  </svg>
  <span>Download Assets</span>
</button>`,
      requiredPatterns: [
        '<button type="button">',
        '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"',
        '<circle cx="12" cy="12" r="10" fill="currentColor"/>',
        '<span>Download Assets</span>',
        '</button>'
      ],
      hint: {
        en: 'Use aria-hidden="true" on the svg and place the visible text inside span.',
        vi: 'Dùng aria-hidden="true" trên thẻ svg và đặt chữ hiển thị trong span.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Build an Informative Graphic with Title and Desc',
        vi: 'Xây Dựng Đồ Họa Vector Cung Cấp Thông Tin Có Title Và Desc'
      },
      instruction: {
        en: 'Construct an <svg role="img" aria-labelledby="status-title status-desc" viewBox="0 0 100 100"> with a <title id="status-title">Server Online</title>, <desc id="status-desc">Green indicator circle showing normal operation</desc>, and a <circle cx="50" cy="50" r="40" fill="#10b981"/>.',
        vi: 'Xây dựng <svg role="img" aria-labelledby="status-title status-desc" viewBox="0 0 100 100"> gồm <title id="status-title">Server Online</title>, <desc id="status-desc">Green indicator circle showing normal operation</desc> và <circle cx="50" cy="50" r="40" fill="#10b981"/>.'
      },
      starterCode: '<!-- Build informative SVG -->\n',
      solutionCode: `<svg role="img" aria-labelledby="status-title status-desc" viewBox="0 0 100 100">
  <title id="status-title">Server Online</title>
  <desc id="status-desc">Green indicator circle showing normal operation</desc>
  <circle cx="50" cy="50" r="40" fill="#10b981"/>
</svg>`,
      requiredPatterns: [
        '<svg role="img" aria-labelledby="status-title status-desc" viewBox="0 0 100 100">',
        '<title id="status-title">Server Online</title>',
        '<desc id="status-desc">Green indicator circle showing normal operation</desc>',
        '<circle cx="50" cy="50" r="40" fill="#10b981"/>',
        '</svg>'
      ],
      hint: {
        en: 'Link the title and desc IDs in the aria-labelledby attribute.',
        vi: 'Liên kết các ID của title và desc vào thuộc tính aria-labelledby.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_13_1',
      type: 'complete_code',
      title: {
        en: 'Add ViewBox and Role Img to SVG',
        vi: 'Thêm ViewBox Và Role Img Vào SVG'
      },
      instruction: {
        en: 'Add viewBox="0 0 100 50" and role="img" to the <svg> element.',
        vi: 'Thêm viewBox="0 0 100 50" và role="img" vào thẻ <svg>.'
      },
      starterCode: '<svg width="100" height="50">\n  <rect width="100" height="50" fill="#3b82f6"/>\n</svg>',
      solutionCode: '<svg viewBox="0 0 100 50" role="img" width="100" height="50">\n  <rect width="100" height="50" fill="#3b82f6"/>\n</svg>',
      hint: {
        en: 'Insert viewBox="0 0 100 50" and role="img".',
        vi: 'Thêm viewBox="0 0 100 50" và role="img".'
      },
      explanation: {
        en: 'viewBox establishes the relative coordinate canvas, and role="img" clarifies element purpose in the accessibility tree.',
        vi: 'viewBox xác lập khung tọa độ ảo, còn role="img" làm rõ vai trò phần tử trong cây trợ năng.'
      }
    },
    {
      id: 'html_ex_13_2',
      type: 'fix_code',
      title: {
        en: 'Fix Decorative Icon Accessibility Leak',
        vi: 'Sửa Lỗi Rò Rỉ Trợ Năng Của Icon Trang Trí'
      },
      instruction: {
        en: 'Add aria-hidden="true" and focusable="false" to the decorative icon SVG so it is ignored by screen readers.',
        vi: 'Thêm aria-hidden="true" và focusable="false" vào thẻ SVG icon trang trí để trình đọc màn hình bỏ qua.'
      },
      starterCode: `<button type="button">
  <svg viewBox="0 0 24 24">
    <path d="M5 12h14"/>
  </svg>
  <span>Remove Item</span>
</button>`,
      solutionCode: `<button type="button">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 12h14"/>
  </svg>
  <span>Remove Item</span>
</button>`,
      hint: {
        en: 'Add aria-hidden="true" and focusable="false" to <svg>.',
        vi: 'Thêm aria-hidden="true" và focusable="false" vào <svg>.'
      },
      explanation: {
        en: 'Decorative vector icons accompanying visible text should be hidden from assistive tools to avoid redundant clutter.',
        vi: 'Các biểu tượng trang trí đi kèm chữ nhìn thấy được cần ẩn khỏi công cụ trợ năng để tránh đọc lặp rườm rà.'
      }
    },
    {
      id: 'html_ex_13_3',
      type: 'write_code',
      title: {
        en: 'Write Inline Vector Rectangle with Fill CurrentColor',
        vi: 'Tạo Hình Chữ Nhật Vector Nhúng Kèm Fill CurrentColor'
      },
      instruction: {
        en: 'Write an <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="4" fill="currentColor"/></svg>.',
        vi: 'Viết thẻ <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="4" fill="currentColor"/></svg>.'
      },
      starterCode: '<!-- Write SVG rectangle -->\n',
      solutionCode: `<svg viewBox="0 0 50 50">
  <rect x="5" y="5" width="40" height="40" rx="4" fill="currentColor"/>
</svg>`,
      hint: {
        en: 'Use <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="4" fill="currentColor"/></svg>.',
        vi: 'Dùng cú pháp <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="4" fill="currentColor"/></svg>.'
      },
      explanation: {
        en: 'fill="currentColor" enables seamless dynamic theming driven by CSS color properties.',
        vi: 'fill="currentColor" cho phép đổi màu động mượt mà theo thuộc tính color trong CSS.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_13',
    title: {
      en: 'Enterprise Scalable Vector Telemetry Dashboard Widget',
      vi: 'Khối Widget Vector Giám Sát Đo Lường Doanh Nghiệp Co Giãn'
    },
    description: {
      en: 'Construct a responsive, accessible multi-layer vector telemetry diagram featuring viewBox scaling coordinates, semantic role="img" accessibility metadata with title and desc linkages, and precision vector shapes (<rect>, <circle>, <path>).',
      vi: 'Xây dựng sơ đồ đo lường vector đa lớp co giãn chuẩn trợ năng gồm tọa độ viewBox, metadata trợ năng role="img" liên kết title và desc, cùng các hình vector chính xác (<rect>, <circle>, <path>).'
    },
    requirements: [
      {
        en: '<svg viewBox="0 0 400 200" role="img" aria-labelledby="telemetry-title telemetry-desc">',
        vi: '<svg viewBox="0 0 400 200" role="img" aria-labelledby="telemetry-title telemetry-desc">'
      },
      {
        en: '<title id="telemetry-title"> and <desc id="telemetry-desc"> child nodes',
        vi: 'Các thẻ con <title id="telemetry-title"> và <desc id="telemetry-desc">'
      },
      {
        en: '<rect> background grid element',
        vi: 'Thẻ <rect> làm lưới nền'
      },
      {
        en: '<path> vector line chart series with stroke="currentColor"',
        vi: 'Chuỗi đường biểu đồ vector <path> có stroke="currentColor"'
      },
      {
        en: '<circle> peak data point markers with fill and r attributes',
        vi: 'Điểm đánh dấu đỉnh <circle> có thuộc tính fill và r'
      }
    ],
    starterCode: '<!-- Build scalable vector widget -->\n',
    solutionCode: `<svg viewBox="0 0 400 200" role="img" aria-labelledby="telemetry-title telemetry-desc" class="vector-telemetry-chart">
  <title id="telemetry-title">System Request Throughput</title>
  <desc id="telemetry-desc">Time-series graph showing network requests peaking at 12,000 requests per second at 14:00 UTC</desc>

  <!-- Background Canvas Grid -->
  <rect x="0" y="0" width="400" height="200" fill="#0f172a" rx="8"/>

  <!-- Trend Path -->
  <path d="M 20 160 Q 100 120 180 140 T 340 40" fill="none" stroke="#38bdf8" stroke-width="4"/>

  <!-- Peak Data Point -->
  <circle cx="340" cy="40" r="6" fill="#f43f5e"/>
</svg>`,
    hints: [
      {
        en: 'Ensure aria-labelledby references both title and desc IDs.',
        vi: 'Đảm bảo aria-labelledby trỏ đến cả 2 ID của title và desc.'
      }
    ],
    solutionExplanation: {
      en: 'Creates an accessible, high-performance vector visualization perfectly adaptable to high-DPI displays.',
      vi: 'Tạo nên biểu đồ vector hiệu năng cao, chuẩn trợ năng và hiển thị sắc nét tuyệt đối trên màn hình độ phân giải cao.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_13_1',
      type: 'single_choice',
      question: {
        en: 'What is the function of the viewBox attribute (e.g., viewBox="0 0 100 100") on an <svg> element?',
        vi: 'Chức năng của thuộc tính viewBox (vd: viewBox="0 0 100 100") trên thẻ <svg> là gì?'
      },
      options: [
        {
          en: 'It defines the internal virtual coordinate system (minX, minY, width, height) to which all child vector coordinates are mapped, enabling responsive scaling',
          vi: 'Nó định nghĩa hệ tọa độ ảo nội bộ (minX, minY, width, height) làm chuẩn cho mọi tọa độ con, cho phép đồ họa co giãn theo kích thước đáp ứng'
        },
        {
          en: 'It limits the maximum file size of the SVG image in kilobytes',
          vi: 'Nó giới hạn dung lượng tệp SVG tối đa tính bằng kilobyte'
        },
        {
          en: 'It sets the opacity of the SVG background',
          vi: 'Nó đặt độ mờ đục của hình nền SVG'
        },
        {
          en: 'It disables JavaScript execution inside the SVG',
          vi: 'Nó vô hiệu hóa mã JavaScript bên trong SVG'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'viewBox establishes the aspect ratio and coordinate space for resolution-independent vector rendering.',
        vi: 'viewBox xác lập tỉ lệ khung hình và không gian tọa độ cho việc hiển thị vector độc lập với độ phân giải.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_13_2',
      type: 'single_choice',
      question: {
        en: 'How should you make a standalone, meaningful SVG graphic fully accessible to screen reader users?',
        vi: 'Làm thế nào để một đồ họa SVG độc lập mang nhiều ý nghĩa trở nên tiếp cận hoàn toàn với người dùng trình đọc màn hình?'
      },
      options: [
        {
          en: 'Add role="img" and aria-labelledby="title-id desc-id" to the <svg>, and include <title id="title-id"> and <desc id="desc-id"> inside the SVG',
          vi: 'Thêm role="img" và aria-labelledby="title-id desc-id" vào thẻ <svg>, đồng thời khai báo các thẻ con <title id="title-id"> và <desc id="desc-id">'
        },
        {
          en: 'Add alt="..." attribute directly to the <svg> tag',
          vi: 'Thêm thuộc tính alt="..." trực tiếp vào thẻ <svg>'
        },
        {
          en: 'Wrap the SVG in a <marquee> tag',
          vi: 'Bọc thẻ SVG trong thẻ <marquee>'
        },
        {
          en: 'Set display="none" on the SVG',
          vi: 'Đặt display="none" trên thẻ SVG'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SVG elements do not support alt attributes; role="img" with <title>, <desc>, and aria-labelledby provides accessible names and descriptions.',
        vi: 'Thẻ SVG không hỗ trợ thuộc tính alt; việc dùng role="img" kèm <title>, <desc> và aria-labelledby là chuẩn trợ năng chính xác.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_13_3',
      type: 'single_choice',
      question: {
        en: 'How should purely decorative SVG icons (accompanying visible text) be marked for accessibility?',
        vi: 'Các biểu tượng icon SVG thuần túy trang trí (đi kèm chữ hiển thị) nên được đánh dấu trợ năng như thế nào?'
      },
      options: [
        {
          en: 'Add aria-hidden="true" and focusable="false" to the <svg> element',
          vi: 'Thêm aria-hidden="true" và focusable="false" vào thẻ <svg>'
        },
        {
          en: 'Leave them without any attributes',
          vi: 'Để nguyên không thêm thuộc tính nào'
        },
        {
          en: 'Add title="decorative icon"',
          vi: 'Thêm title="decorative icon"'
        },
        {
          en: 'Add role="button"',
          vi: 'Thêm role="button"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'aria-hidden="true" hides decorative noise from screen readers, and focusable="false" prevents legacy IE focus bugs.',
        vi: 'aria-hidden="true" ẩn bớt icon trang trí khỏi trình đọc màn hình, focusable="false" ngăn lỗi bắt focus trên trình duyệt cũ.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_13_4',
      type: 'single_choice',
      question: {
        en: 'What is the primary benefit of using fill="currentColor" or stroke="currentColor" inside inline SVG elements?',
        vi: 'Lợi ích chính của việc dùng fill="currentColor" hoặc stroke="currentColor" bên trong thẻ SVG nội dòng là gì?'
      },
      options: [
        {
          en: 'The vector paths automatically adopt whatever CSS color property is applied to the parent container, enabling effortless theme switching and hover states',
          vi: 'Đường vẽ vector tự động đổi màu theo thuộc tính CSS color của phần tử cha, giúp dễ dàng đổi theme và tạo hiệu ứng hover'
        },
        {
          en: 'It reduces the file size to 0 bytes',
          vi: 'Nó giảm dung lượng tệp về 0 byte'
        },
        {
          en: 'It converts the vector to a PNG automatically',
          vi: 'Nó tự động chuyển vector thành ảnh PNG'
        },
        {
          en: 'It makes the vector 3D',
          vi: 'Nó biến vector thành đồ họa 3D'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'currentColor dynamically binds vector colors to CSS typography colors.',
        vi: 'currentColor liên kết màu sắc vector với màu chữ trong CSS một cách linh hoạt.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_13_5',
      type: 'single_choice',
      question: {
        en: 'Which SVG element is used to draw complex multi-segment curves, arc lines, and custom geometry using path commands (M, L, C, Z)?',
        vi: 'Phần tử SVG nào được dùng để vẽ các đường cong nhiều phân đoạn, đường cung và hình học tùy biến bằng các lệnh tọa độ (M, L, C, Z)?'
      },
      options: [
        {
          en: '<path>',
          vi: '<path>'
        },
        {
          en: '<line>',
          vi: '<line>'
        },
        {
          en: '<curve>',
          vi: '<curve>'
        },
        {
          en: '<draw>',
          vi: '<draw>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<path d="..."> is the most versatile SVG primitive capable of creating arbitrary curves and shapes.',
        vi: '<path d="..."> là phần tử đa năng nhất trong SVG có khả năng vẽ mọi đường cong và hình học tùy ý.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_13_6',
      type: 'single_choice',
      question: {
        en: 'What is the key advantage of inline <svg> in HTML compared to loading an SVG via <img src="icon.svg">?',
        vi: 'Ưu điểm then chốt của việc nhúng <svg> nội dòng trong HTML so với nạp qua thẻ <img src="icon.svg"> là gì?'
      },
      options: [
        {
          en: 'Inline SVG elements become live DOM nodes that can be styled with CSS (e.g. hover color changes) and manipulated directly with JavaScript',
          vi: 'Thẻ SVG nội dòng trở thành một phần của cây DOM, có thể đổi màu bằng CSS khi hover và tương tác trực tiếp bằng JavaScript'
        },
        {
          en: 'Inline SVG runs faster on the GPU by default',
          vi: 'Inline SVG mặc định chạy nhanh hơn trên GPU'
        },
        {
          en: 'External <img> tags do not support vector scaling',
          vi: 'Thẻ <img> bên ngoài không hỗ trợ co giãn vector'
        },
        {
          en: 'Inline SVG works without CSS enabled',
          vi: 'Inline SVG hoạt động mà không cần bật CSS'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Inline SVG provides complete DOM access for CSS styling, animations, and JS event handling.',
        vi: 'Inline SVG cung cấp toàn quyền truy cập DOM để định kiểu CSS, tạo hoạt ảnh và bắt sự kiện JS.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_13_7',
      type: 'single_choice',
      question: {
        en: 'What attribute allows you to round the corners of an SVG `<rect>` element?',
        vi: 'Thuộc tính nào cho phép bạn bo tròn góc của phần tử `<rect>` trong SVG?'
      },
      options: [
        {
          en: 'rx and ry',
          vi: 'rx và ry'
        },
        {
          en: 'border-radius',
          vi: 'border-radius'
        },
        {
          en: 'round',
          vi: 'round'
        },
        {
          en: 'corner',
          vi: 'corner'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'rx and ry define the horizontal and vertical corner radii of an SVG rectangle.',
        vi: 'rx và ry định nghĩa bán kính bo góc ngang và dọc của hình chữ nhật SVG.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_13_8',
      type: 'single_choice',
      question: {
        en: 'What SVG element is used to group related shapes and apply shared transforms or styles to all children?',
        vi: 'Phần tử SVG nào được dùng để gom nhóm các hình có liên quan và áp dụng chung các phép biến đổi transform hoặc style cho toàn bộ thẻ con?'
      },
      options: [
        {
          en: '<g>',
          vi: '<g>'
        },
        {
          en: '<group>',
          vi: '<group>'
        },
        {
          en: '<container>',
          vi: '<container>'
        },
        {
          en: '<set>',
          vi: '<set>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The <g> (group) element organizes shapes and applies inheritance for attributes and transformations.',
        vi: 'Thẻ <g> (group) gom nhóm các hình và áp dụng tính kế thừa thuộc tính và phép biến đổi.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_13_9',
      type: 'single_choice',
      question: {
        en: 'What is the command letter in SVG path data (d="...") that closes the current subpath back to the starting point?',
        vi: 'Ký tự lệnh nào trong dữ liệu đường vẽ SVG path (d="...") dùng để đóng đường vẽ hiện tại quay về điểm xuất phát?'
      },
      options: [
        {
          en: 'Z (or z)',
          vi: 'Z (hoặc z)'
        },
        {
          en: 'C',
          vi: 'C'
        },
        {
          en: 'E',
          vi: 'E'
        },
        {
          en: 'X',
          vi: 'X'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Z (closepath) draws a straight line from current position back to the beginning of the active subpath.',
        vi: 'Lệnh Z nối một đường thẳng từ vị trí hiện tại quay về điểm đầu của đoạn vẽ.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_13_10',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the <defs> element inside an SVG?',
        vi: 'Mục đích của thẻ <defs> bên trong SVG là gì?'
      },
      options: [
        {
          en: 'Stores reusable graphical assets (such as gradients, clip-paths, masks, and symbols) that are not rendered directly until referenced by id elsewhere in the document',
          vi: 'Lưu trữ các tài nguyên đồ họa tái sử dụng (như dải màu gradient, clip-path, mask và symbol) không hiển thị trực tiếp cho đến khi được gọi bằng id ở nơi khác'
        },
        {
          en: 'Defines CSS styles exclusively for mobile phones',
          vi: 'Định nghĩa style CSS dành riêng cho điện thoại'
        },
        {
          en: 'Compiles SVG into WebGL shaders',
          vi: 'Biên dịch SVG thành WebGL shader'
        },
        {
          en: 'Translates SVG text into French',
          vi: 'Dịch văn bản SVG sang tiếng Pháp'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<defs> holds definitions of reusable elements referenced via url(#id) or <use href="#id">.',
        vi: '<defs> chứa định nghĩa các phần tử tái sử dụng được tham chiếu qua url(#id) hoặc <use href="#id">.'
      },
      topicId: 'html_svg_graphics',
      difficulty: 'medium'
    }
  ]
};

export default lesson15;
