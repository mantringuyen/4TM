import { Lesson } from '../../../../types';

export const lesson19: Lesson = {
  "id": "html_lesson_19",
  "moduleId": "html_mod_5",
  "levelId": "advanced",
  "courseId": "html",
  "order": 19,
  "topicId": "html_resource_hints_perf",
  "title": {
    "en": "Resource Hints, Critical Loading & Performance Optimization",
    "vi": "Gợi Ý Tài Nguyên, Tải Tài Nguyên Quan Trọng & Tối Ưu Hiệu Năng"
  },
  "summary": {
    "en": "Master high-performance asset pipelines: resource hints (preload, prefetch, preconnect, dns-prefetch, modulepreload), script execution paradigms (async, defer, type=\"module\"), font loading with crossorigin, and fetchpriority for sub-second page loads.",
    "vi": "Làm chủ quy trình tải tài nguyên hiệu năng cao: các gợi ý tài nguyên (preload, prefetch, preconnect, dns-prefetch, modulepreload), cơ chế thực thi mã script (async, defer, type=\"module\"), nạp phông chữ crossorigin và fetchpriority để đạt tốc độ tải trang dưới 1 giây."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Browser network schedulers are smart, but developers have domain knowledge about what resources are critical. Modern HTML resource hints give you direct control over network prioritization to eliminate render-blocking latency.",
      "vi": "Trình quản lý mạng của trình duyệt rất thông minh, nhưng lập trình viên mới là người hiểu rõ tài nguyên nào quan trọng nhất. Các thẻ gợi ý tài nguyên HTML hiện đại cho phép bạn điều hướng mức độ ưu tiên mạng để xóa bỏ hoàn toàn độ trễ chặn dựng hình."
    },
    "conceptExplanation": {
      "en": "Use <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"> to execute early DNS/TCP/TLS handshakes before requests happen. Use <link rel=\"preload\" href=\"/fonts/inter.woff2\" as=\"font\" type=\"font/woff2\" crossorigin> for critical above-the-fold assets discovered late by the CSS parser. Use rel=\"prefetch\" to speculatively download assets needed on the next user navigation in the background. For JavaScript: defer preserves document order and runs after HTML parsing; async executes immediately upon download; type=\"module\" is deferred by default.",
      "vi": "Dùng <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"> để thực hiện sớm bắt tay DNS/TCP/TLS trước khi có yêu cầu tải. Dùng <link rel=\"preload\" href=\"/fonts/inter.woff2\" as=\"font\" type=\"font/woff2\" crossorigin> cho các tài nguyên quan trọng đầu trang bị phát hiện muộn bởi CSS. Dùng rel=\"prefetch\" để tải ngầm trước các trang người dùng sắp bấm tới. Với JavaScript: defer giữ đúng thứ tự chạy sau khi đọc xong HTML; async chạy ngay lập tức khi tải xong; type=\"module\" tự động hoãn (defer) theo mặc định."
    },
    "syntax": "<!-- 1. Early Handshake to 3rd-party Origins -->\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n\n<!-- 2. Preload Critical Above-the-Fold Resources -->\n<link rel=\"preload\" href=\"/fonts/inter-var.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n<link rel=\"preload\" href=\"/hero.webp\" as=\"image\" type=\"image/webp\">\n\n<!-- 3. Preload JS Modules & Prefetch Next Page Assets -->\n<link rel=\"modulepreload\" href=\"/src/app.js\">\n<link rel=\"prefetch\" href=\"/pricing.html\">\n\n<!-- 4. Non-Blocking Script Execution -->\n<script src=\"/analytics.js\" async></script>\n<script src=\"/bundle.js\" defer></script>",
    "examples": [
      {
        "title": {
          "en": "Optimal Critical Web Font Loading Pipeline with Preconnect & Preload",
          "vi": "Quy Trình Tải Phông Chữ Web Trọng Yếu Tối Ưu Với Preconnect & Preload"
        },
        "code": "<head>\n  <meta charset=\"utf-8\">\n  <title>High Performance App | 4TM</title>\n  \n  <!-- Step 1: Preconnect to Font CDN and Origin -->\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  \n  <!-- Step 2: Preload Critical Variable Font (crossorigin is required for fonts) -->\n  <link\n    rel=\"preload\"\n    href=\"/assets/fonts/Inter-VariableFont.woff2\"\n    as=\"font\"\n    type=\"font/woff2\"\n    crossorigin>\n    \n  <!-- Step 3: Load CSS Stylesheet -->\n  <link rel=\"stylesheet\" href=\"/css/styles.css\">\n</head>",
        "language": "html",
        "explanation": {
          "en": "Eliminates Flash of Unstyled Text (FOUT) and font download waterfall delays.",
          "vi": "Loại bỏ hiện tượng nhấp nháy đổi phông chữ (FOUT) và xóa bỏ độ trễ thác đổ khi tải phông."
        }
      },
      {
        "title": {
          "en": "Non-Blocking JavaScript Strategy: defer vs async vs module",
          "vi": "Chiến Lược Tải JavaScript Không Chặn Dựng Hình: defer vs async vs module"
        },
        "code": "<head>\n  <!-- async: Independent analytics/ads script (executes as soon as downloaded) -->\n  <script src=\"https://cdn.telemetry.io/tracker.js\" async></script>\n  \n  <!-- defer: Order-dependent application scripts (run after DOM is built) -->\n  <script src=\"/js/vendor.js\" defer></script>\n  <script src=\"/js/main.js\" defer></script>\n  \n  <!-- type=\"module\": Automatically deferred and scoped to ES module graph -->\n  <script type=\"module\" src=\"/src/index.js\"></script>\n</head>",
        "language": "html",
        "explanation": {
          "en": "Keeps the main parsing thread completely unblocked during initial HTML DOM construction.",
          "vi": "Giữ luồng phân tích cú pháp HTML hoàn toàn thông suốt trong quá trình dựng cây DOM ban đầu."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Preloading fonts without the mandatory \"crossorigin\" attribute",
          "vi": "Dùng preload cho phông chữ nhưng quên thuộc tính bắt buộc \"crossorigin\""
        },
        "correction": {
          "en": "Web fonts are always fetched using anonymous CORS mode by browser engines. Omitting crossorigin causes the browser to download the font twice.",
          "vi": "Phông chữ web luôn được tải theo chế độ CORS ẩn danh. Nếu thiếu crossorigin, trình duyệt sẽ tải tệp phông chữ 2 lần liên tiếp."
        },
        "code": "<!-- Correct usage demonstrated in lesson examples -->"
      },
      {
        "mistake": {
          "en": "Preloading every asset on the page (overusing preload)",
          "vi": "Lạm dụng preload cho mọi tài nguyên trên trang"
        },
        "correction": {
          "en": "preload forces highest network priority; preloading too many non-critical assets starves genuine render-critical CSS and HTML streams of bandwidth.",
          "vi": "preload ép ưu tiên mạng cao nhất; lạm dụng preload cho quá nhiều file sẽ làm nghẽn băng thông của CSS và HTML quan trọng."
        },
        "code": "<!-- Follow W3C semantic guidelines -->"
      }
    ],
    "tips": [
      {
        "en": "Use rel=\"modulepreload\" instead of standard rel=\"preload\" when loading ES modules to instruct the browser to fetch, parse, and compile module dependency trees ahead of execution.",
        "vi": "Dùng rel=\"modulepreload\" thay vì preload thông thường khi tải JavaScript ES module để trình duyệt tải, phân tích và biên dịch sẵn cây phụ thuộc trước khi chạy."
      }
    ],
    "practice": {
      "task": {
        "en": "Write Optimized Resource Hints for Fonts and Scripts",
        "vi": "Viết gợi ý tài nguyên tối ưu cho phông chữ và script"
      },
      "instruction": {
        "en": "Create a <head> with <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>, <link rel=\"preload\" href=\"/font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>, and <script src=\"/app.js\" defer></script>.",
        "vi": "Tạo thẻ <head> chứa <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>, <link rel=\"preload\" href=\"/font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>, và <script src=\"/app.js\" defer></script>."
      },
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link rel=\"preload\" href=\"/font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n  <script src=\"/app.js\" defer></script>\n</head>",
      "requiredPatterns": [
        "rel=\"preconnect\"",
        "href=\"https://fonts.gstatic.com\"",
        "rel=\"preload\"",
        "href=\"/font.woff2\"",
        "as=\"font\"",
        "crossorigin",
        "<script src=\"/app.js\" defer>"
      ],
      "hint": {
        "en": "Include preconnect, preload as font with crossorigin, and deferred script.",
        "vi": "Bao gồm preconnect, preload dạng font có crossorigin, và script defer."
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Write Optimized Resource Hints for Fonts and Scripts (Consolidation)",
        "vi": "Viết gợi ý tài nguyên tối ưu cho phông chữ và script (Củng cố)"
      },
      "instruction": {
        "en": "Create a <head> with <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>, <link rel=\"preload\" href=\"/font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>, and <script src=\"/app.js\" defer></script>.",
        "vi": "Tạo thẻ <head> chứa <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>, <link rel=\"preload\" href=\"/font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>, và <script src=\"/app.js\" defer></script>."
      },
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link rel=\"preload\" href=\"/font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n  <script src=\"/app.js\" defer></script>\n</head>",
      "requiredPatterns": [
        "rel=\"preconnect\"",
        "href=\"https://fonts.gstatic.com\"",
        "rel=\"preload\"",
        "href=\"/font.woff2\"",
        "as=\"font\"",
        "crossorigin",
        "<script src=\"/app.js\" defer>"
      ],
      "hint": {
        "en": "Include preconnect, preload as font with crossorigin, and deferred script.",
        "vi": "Bao gồm preconnect, preload dạng font có crossorigin, và script defer."
      }
    }
  },
  "exercisePool": [
    {
      "id": "html_ex_17_1",
      "type": "complete_code",
      "title": {
        "en": "Add dns-prefetch Fallback for Legacy Browsers",
        "vi": "Thêm gợi ý dns-prefetch dự phòng cho trình duyệt cũ"
      },
      "instruction": {
        "en": "Add <link rel=\"dns-prefetch\" href=\"https://api.analytics.com\"> to the <head>.",
        "vi": "Thêm <link rel=\"dns-prefetch\" href=\"https://api.analytics.com\"> vào trong <head>."
      },
      "starterCode": "<head>\n  <link rel=\"preconnect\" href=\"https://api.analytics.com\">\n</head>",
      "solutionCode": "<head>\n  <link rel=\"preconnect\" href=\"https://api.analytics.com\">\n  <link rel=\"dns-prefetch\" href=\"https://api.analytics.com\">\n</head>",
      "hint": {
        "en": "Add link rel=\"dns-prefetch\".",
        "vi": "Thêm link rel=\"dns-prefetch\"."
      },
      "explanation": {
        "en": "dns-prefetch acts as a lightweight DNS resolution fallback for browsers without full preconnect support.",
        "vi": "dns-prefetch đóng vai trò dự phòng phân giải tên miền DNS cho các trình duyệt chưa hỗ trợ preconnect."
      }
    },
    {
      "id": "html_ex_17_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Missing \"as\" Attribute in Preload Link Tag",
        "vi": "Sửa lỗi thiếu thuộc tính \"as\" trong thẻ link preload"
      },
      "instruction": {
        "en": "Fix the preload tag by adding as=\"style\" for the stylesheet link.",
        "vi": "Sửa thẻ preload bằng cách thêm thuộc tính as=\"style\" cho file stylesheet."
      },
      "starterCode": "<link rel=\"preload\" href=\"/css/critical.css\">",
      "solutionCode": "<link rel=\"preload\" href=\"/css/critical.css\" as=\"style\">",
      "hint": {
        "en": "Add as=\"style\" to the link preload element.",
        "vi": "Thêm as=\"style\" vào phần tử link preload."
      },
      "explanation": {
        "en": "The as attribute is mandatory for preload so the browser assigns the correct Content-Security-Policy and network priority.",
        "vi": "Thuộc tính as là bắt buộc cho preload để trình duyệt gán đúng chính sách bảo mật CSP và thứ tự ưu tiên mạng."
      }
    },
    {
      "id": "html_ex_17_3",
      "type": "write_code",
      "title": {
        "en": "Write Prefetch Link for Future Page Navigation",
        "vi": "Viết thẻ prefetch cho trang điều hướng tiếp theo"
      },
      "instruction": {
        "en": "Write a <link rel=\"prefetch\" href=\"/checkout.html\" as=\"document\"> tag.",
        "vi": "Viết thẻ <link rel=\"prefetch\" href=\"/checkout.html\" as=\"document\">."
      },
      "starterCode": "",
      "solutionCode": "<link rel=\"prefetch\" href=\"/checkout.html\" as=\"document\">",
      "hint": {
        "en": "Use rel=\"prefetch\" with href and as=\"document\".",
        "vi": "Dùng rel=\"prefetch\" với href và as=\"document\"."
      },
      "explanation": {
        "en": "prefetch downloads resources during idle time for instant subsequent page transitions.",
        "vi": "prefetch tải tài nguyên trong thời gian rỗi của CPU giúp chuyển trang tiếp theo tức thì."
      }
    },
    {
      "id": "html_ex_17_4",
      "type": "modify_example",
      "title": {
        "en": "Convert Blocking Script to Defer Execution",
        "vi": "Chuyển script chặn dựng hình thành thực thi defer"
      },
      "instruction": {
        "en": "Add the defer attribute to the <script src=\"/app.js\"></script> tag.",
        "vi": "Thêm thuộc tính defer vào thẻ <script src=\"/app.js\"></script>."
      },
      "starterCode": "<script src=\"/app.js\"></script>",
      "solutionCode": "<script src=\"/app.js\" defer></script>",
      "hint": {
        "en": "Add defer inside the opening script tag.",
        "vi": "Thêm defer vào trong thẻ mở script."
      },
      "explanation": {
        "en": "defer downloads the script in parallel with HTML parsing and executes it in order after DOM parsing completes.",
        "vi": "defer tải file song song với quá trình đọc HTML và thực thi theo thứ tự sau khi cây DOM đọc xong."
      }
    },
    {
      "id": "html_ex_17_5",
      "type": "predict_output",
      "title": {
        "en": "Predict Execution Order Between Async and Defer Scripts",
        "vi": "Dự đoán thứ tự thực thi giữa script async và defer"
      },
      "instruction": {
        "en": "Which script attribute guarantees that scripts will execute in the exact order they are declared in HTML: async or defer?",
        "vi": "Thuộc tính script nào đảm bảo các file mã sẽ chạy đúng thứ tự xuất hiện trong tài liệu HTML: async hay defer?"
      },
      "starterCode": "<!-- Type async or defer -->\n<p>Guaranteed order: </p>",
      "solutionCode": "<p>Guaranteed order: defer</p>",
      "hint": {
        "en": "defer maintains deterministic execution order while async executes whenever download finishes.",
        "vi": "defer duy trì thứ tự thực thi tuần tự trong khi async tải xong file nào chạy ngay file đó."
      }
    }
  ],
  "challenge": {
    "id": "html_ch_17",
    "title": {
      "en": "Sub-Second Core Web Vitals Critical Asset Orchestration Architecture",
      "vi": "Kiến trúc điều phối tài nguyên trọng yếu tối ưu Core Web Vitals dưới 1 giây"
    },
    "description": {
      "en": "Architect an enterprise-grade high-performance document head optimizing Largest Contentful Paint (LCP), First Input Delay / INP, and Cumulative Layout Shift (CLS).",
      "vi": "Xây dựng khối document head tối ưu hiệu năng doanh nghiệp đạt điểm tối đa cho các chỉ số LCP, INP và CLS."
    },
    "requirements": [
      {
        "en": "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>",
        "vi": "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>"
      },
      {
        "en": "<link rel=\"preload\" href=\"/fonts/CabinetGrotesk.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>",
        "vi": "<link rel=\"preload\" href=\"/fonts/CabinetGrotesk.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>"
      },
      {
        "en": "<link rel=\"preload\" href=\"/img/hero.avif\" as=\"image\" type=\"image/avif\" fetchpriority=\"high\">",
        "vi": "<link rel=\"preload\" href=\"/img/hero.avif\" as=\"image\" type=\"image/avif\" fetchpriority=\"high\">"
      },
      {
        "en": "<link rel=\"modulepreload\" href=\"/src/core/main.js\">",
        "vi": "<link rel=\"modulepreload\" href=\"/src/core/main.js\">"
      },
      {
        "en": "<link rel=\"prefetch\" href=\"/dashboard.html\" as=\"document\">",
        "vi": "<link rel=\"prefetch\" href=\"/dashboard.html\" as=\"document\">"
      },
      {
        "en": "Deferred script <script type=\"module\" src=\"/src/core/main.js\"></script>",
        "vi": "Script dạng module <script type=\"module\" src=\"/src/core/main.js\"></script>"
      }
    ],
    "starterCode": "<head>\n  <!-- Build high-performance resource orchestration head here -->\n</head>",
    "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Ultra High-Performance Dashboard | 4TM Enterprise</title>\n  \n  <!-- 1. Preconnect to Remote Origins -->\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  \n  <!-- 2. Preload Critical Above-the-Fold Typography and Hero Graphic -->\n  <link rel=\"preload\" href=\"/fonts/CabinetGrotesk.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n  <link rel=\"preload\" href=\"/img/hero.avif\" as=\"image\" type=\"image/avif\" fetchpriority=\"high\">\n  \n  <!-- 3. Preload ES Module Graph Dependencies -->\n  <link rel=\"modulepreload\" href=\"/src/core/main.js\">\n  \n  <!-- 4. Speculative Prefetch for Next Probable Route -->\n  <link rel=\"prefetch\" href=\"/dashboard.html\" as=\"document\">\n  \n  <!-- 5. Stylesheet and Non-blocking Application Module -->\n  <link rel=\"stylesheet\" href=\"/css/critical.css\">\n  <script type=\"module\" src=\"/src/core/main.js\"></script>\n</head>",
    "hints": [
      {
        "en": "Remember crossorigin is mandatory on all font preloads",
        "vi": "Ghi nhớ crossorigin là bắt buộc trên mọi preload font"
      },
      {
        "en": "Use fetchpriority=\"high\" on the critical LCP image preload",
        "vi": "Dùng fetchpriority=\"high\" trên preload ảnh LCP quan trọng"
      }
    ],
    "solutionExplanation": {
      "en": "Gold-standard resource scheduling achieving sub-second Largest Contentful Paint (LCP) and 100/100 Lighthouse performance scores.",
      "vi": "Chuẩn mực vàng trong điều phối tài nguyên đạt chỉ số LCP dưới 1 giây và điểm 100/100 tuyệt đối trên Google Lighthouse."
    },
    "variants": [
      {
        "id": "html_ch_17_v1",
        "title": {
          "en": "Variant 1: Critical Inline CSS with Asynchronous Non-Critical Stylesheet",
          "vi": "Biến thể 1: CSS nội dòng quan trọng kèm file CSS phụ tải bất đồng bộ"
        },
        "description": {
          "en": "Build a head containing critical inline <style> with non-critical stylesheet loaded via media=\"print\" onload=\"this.media='all'\".",
          "vi": "Xây dựng khối head có thẻ <style> nội dòng kèm file CSS ngoài tải bất đồng bộ bằng mẹo media print."
        },
        "requirements": [
          {
            "en": "Inline <style> with body { margin: 0; font-family: sans-serif; }</style>",
            "vi": "Thẻ <style> nội dòng chứa định kiểu cơ bản"
          },
          {
            "en": "<link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">",
            "vi": "<link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">"
          }
        ],
        "starterCode": "<head>\n  \n</head>",
        "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>Instant Render Page</title>\n  <style>\n    body { margin: 0; font-family: sans-serif; background: #0f172a; color: #fff; }\n  </style>\n  <link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">\n  <link rel=\"stylesheet\" href=\"/css/non-critical.css\" media=\"print\" onload=\"this.media='all'\">\n</head>",
        "hints": [
          {
            "en": "Review the challenge requirements carefully.",
            "vi": "Đọc kỹ các yêu cầu của thử thách."
          }
        ],
        "solutionExplanation": {
          "en": "Inline critical CSS renders page layout immediately without waiting for network CSS downloads.",
          "vi": "CSS nội dòng quan trọng giúp hiển thị trang ngay lập tức mà không phải chờ tải tệp CSS từ mạng."
        }
      },
      {
        "id": "html_ch_17_v2",
        "title": {
          "en": "Variant 2: CDN Edge Preconnect and DNS Prefetch Pairings",
          "vi": "Biến thể 2: Cặp đôi kết nối sớm CDN Edge với Preconnect và DNS Prefetch"
        },
        "description": {
          "en": "Build a head connecting to dynamic API and media CDN origins with dual preconnect and dns-prefetch.",
          "vi": "Xây dựng khối head kết nối tới máy chủ API và CDN đa phương tiện với cả preconnect và dns-prefetch."
        },
        "requirements": [
          {
            "en": "Preconnect & dns-prefetch to \"https://api.4tm.io\"",
            "vi": "Preconnect & dns-prefetch tới \"https://api.4tm.io\""
          },
          {
            "en": "Preconnect & dns-prefetch to \"https://cdn.4tm.io\"",
            "vi": "Preconnect & dns-prefetch tới \"https://cdn.4tm.io\""
          }
        ],
        "starterCode": "<head>\n  \n</head>",
        "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>Edge API Optimized</title>\n  <link rel=\"preconnect\" href=\"https://api.4tm.io\">\n  <link rel=\"dns-prefetch\" href=\"https://api.4tm.io\">\n  <link rel=\"preconnect\" href=\"https://cdn.4tm.io\">\n  <link rel=\"dns-prefetch\" href=\"https://cdn.4tm.io\">\n</head>",
        "hints": [
          {
            "en": "Review the challenge requirements carefully.",
            "vi": "Đọc kỹ các yêu cầu của thử thách."
          }
        ],
        "solutionExplanation": {
          "en": "Dual preconnect and dns-prefetch guarantees cross-browser connection pre-warming across all browser versions.",
          "vi": "Kết hợp preconnect và dns-prefetch đảm bảo kích hoạt kết nối sớm trên mọi thế hệ trình duyệt."
        }
      }
    ]
  },
  "challengePool": [
    {
      "id": "html_ch_17",
      "title": {
        "en": "Sub-Second Core Web Vitals Critical Asset Orchestration Architecture",
        "vi": "Kiến trúc điều phối tài nguyên trọng yếu tối ưu Core Web Vitals dưới 1 giây"
      },
      "description": {
        "en": "Architect an enterprise-grade high-performance document head optimizing Largest Contentful Paint (LCP), First Input Delay / INP, and Cumulative Layout Shift (CLS).",
        "vi": "Xây dựng khối document head tối ưu hiệu năng doanh nghiệp đạt điểm tối đa cho các chỉ số LCP, INP và CLS."
      },
      "requirements": [
        {
          "en": "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>",
          "vi": "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>"
        },
        {
          "en": "<link rel=\"preload\" href=\"/fonts/CabinetGrotesk.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>",
          "vi": "<link rel=\"preload\" href=\"/fonts/CabinetGrotesk.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>"
        },
        {
          "en": "<link rel=\"preload\" href=\"/img/hero.avif\" as=\"image\" type=\"image/avif\" fetchpriority=\"high\">",
          "vi": "<link rel=\"preload\" href=\"/img/hero.avif\" as=\"image\" type=\"image/avif\" fetchpriority=\"high\">"
        },
        {
          "en": "<link rel=\"modulepreload\" href=\"/src/core/main.js\">",
          "vi": "<link rel=\"modulepreload\" href=\"/src/core/main.js\">"
        },
        {
          "en": "<link rel=\"prefetch\" href=\"/dashboard.html\" as=\"document\">",
          "vi": "<link rel=\"prefetch\" href=\"/dashboard.html\" as=\"document\">"
        },
        {
          "en": "Deferred script <script type=\"module\" src=\"/src/core/main.js\"></script>",
          "vi": "Script dạng module <script type=\"module\" src=\"/src/core/main.js\"></script>"
        }
      ],
      "starterCode": "<head>\n  <!-- Build high-performance resource orchestration head here -->\n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Ultra High-Performance Dashboard | 4TM Enterprise</title>\n  \n  <!-- 1. Preconnect to Remote Origins -->\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  \n  <!-- 2. Preload Critical Above-the-Fold Typography and Hero Graphic -->\n  <link rel=\"preload\" href=\"/fonts/CabinetGrotesk.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n  <link rel=\"preload\" href=\"/img/hero.avif\" as=\"image\" type=\"image/avif\" fetchpriority=\"high\">\n  \n  <!-- 3. Preload ES Module Graph Dependencies -->\n  <link rel=\"modulepreload\" href=\"/src/core/main.js\">\n  \n  <!-- 4. Speculative Prefetch for Next Probable Route -->\n  <link rel=\"prefetch\" href=\"/dashboard.html\" as=\"document\">\n  \n  <!-- 5. Stylesheet and Non-blocking Application Module -->\n  <link rel=\"stylesheet\" href=\"/css/critical.css\">\n  <script type=\"module\" src=\"/src/core/main.js\"></script>\n</head>",
      "hints": [
        {
          "en": "Remember crossorigin is mandatory on all font preloads",
          "vi": "Ghi nhớ crossorigin là bắt buộc trên mọi preload font"
        },
        {
          "en": "Use fetchpriority=\"high\" on the critical LCP image preload",
          "vi": "Dùng fetchpriority=\"high\" trên preload ảnh LCP quan trọng"
        }
      ],
      "solutionExplanation": {
        "en": "Gold-standard resource scheduling achieving sub-second Largest Contentful Paint (LCP) and 100/100 Lighthouse performance scores.",
        "vi": "Chuẩn mực vàng trong điều phối tài nguyên đạt chỉ số LCP dưới 1 giây và điểm 100/100 tuyệt đối trên Google Lighthouse."
      },
      "variants": [
        {
          "id": "html_ch_17_v1",
          "title": {
            "en": "Variant 1: Critical Inline CSS with Asynchronous Non-Critical Stylesheet",
            "vi": "Biến thể 1: CSS nội dòng quan trọng kèm file CSS phụ tải bất đồng bộ"
          },
          "description": {
            "en": "Build a head containing critical inline <style> with non-critical stylesheet loaded via media=\"print\" onload=\"this.media='all'\".",
            "vi": "Xây dựng khối head có thẻ <style> nội dòng kèm file CSS ngoài tải bất đồng bộ bằng mẹo media print."
          },
          "requirements": [
            {
              "en": "Inline <style> with body { margin: 0; font-family: sans-serif; }</style>",
              "vi": "Thẻ <style> nội dòng chứa định kiểu cơ bản"
            },
            {
              "en": "<link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">",
              "vi": "<link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">"
            }
          ],
          "starterCode": "<head>\n  \n</head>",
          "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>Instant Render Page</title>\n  <style>\n    body { margin: 0; font-family: sans-serif; background: #0f172a; color: #fff; }\n  </style>\n  <link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">\n  <link rel=\"stylesheet\" href=\"/css/non-critical.css\" media=\"print\" onload=\"this.media='all'\">\n</head>",
          "hints": [
            {
              "en": "Review the challenge requirements carefully.",
              "vi": "Đọc kỹ các yêu cầu của thử thách."
            }
          ],
          "solutionExplanation": {
            "en": "Inline critical CSS renders page layout immediately without waiting for network CSS downloads.",
            "vi": "CSS nội dòng quan trọng giúp hiển thị trang ngay lập tức mà không phải chờ tải tệp CSS từ mạng."
          }
        },
        {
          "id": "html_ch_17_v2",
          "title": {
            "en": "Variant 2: CDN Edge Preconnect and DNS Prefetch Pairings",
            "vi": "Biến thể 2: Cặp đôi kết nối sớm CDN Edge với Preconnect và DNS Prefetch"
          },
          "description": {
            "en": "Build a head connecting to dynamic API and media CDN origins with dual preconnect and dns-prefetch.",
            "vi": "Xây dựng khối head kết nối tới máy chủ API và CDN đa phương tiện với cả preconnect và dns-prefetch."
          },
          "requirements": [
            {
              "en": "Preconnect & dns-prefetch to \"https://api.4tm.io\"",
              "vi": "Preconnect & dns-prefetch tới \"https://api.4tm.io\""
            },
            {
              "en": "Preconnect & dns-prefetch to \"https://cdn.4tm.io\"",
              "vi": "Preconnect & dns-prefetch tới \"https://cdn.4tm.io\""
            }
          ],
          "starterCode": "<head>\n  \n</head>",
          "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>Edge API Optimized</title>\n  <link rel=\"preconnect\" href=\"https://api.4tm.io\">\n  <link rel=\"dns-prefetch\" href=\"https://api.4tm.io\">\n  <link rel=\"preconnect\" href=\"https://cdn.4tm.io\">\n  <link rel=\"dns-prefetch\" href=\"https://cdn.4tm.io\">\n</head>",
          "hints": [
            {
              "en": "Review the challenge requirements carefully.",
              "vi": "Đọc kỹ các yêu cầu của thử thách."
            }
          ],
          "solutionExplanation": {
            "en": "Dual preconnect and dns-prefetch guarantees cross-browser connection pre-warming across all browser versions.",
            "vi": "Kết hợp preconnect và dns-prefetch đảm bảo kích hoạt kết nối sớm trên mọi thế hệ trình duyệt."
          }
        }
      ]
    },
    {
      "id": "html_ch_17_v1",
      "title": {
        "en": "Variant 1: Critical Inline CSS with Asynchronous Non-Critical Stylesheet",
        "vi": "Biến thể 1: CSS nội dòng quan trọng kèm file CSS phụ tải bất đồng bộ"
      },
      "description": {
        "en": "Build a head containing critical inline <style> with non-critical stylesheet loaded via media=\"print\" onload=\"this.media='all'\".",
        "vi": "Xây dựng khối head có thẻ <style> nội dòng kèm file CSS ngoài tải bất đồng bộ bằng mẹo media print."
      },
      "requirements": [
        {
          "en": "Inline <style> with body { margin: 0; font-family: sans-serif; }</style>",
          "vi": "Thẻ <style> nội dòng chứa định kiểu cơ bản"
        },
        {
          "en": "<link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">",
          "vi": "<link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">"
        }
      ],
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>Instant Render Page</title>\n  <style>\n    body { margin: 0; font-family: sans-serif; background: #0f172a; color: #fff; }\n  </style>\n  <link rel=\"preload\" href=\"/css/non-critical.css\" as=\"style\">\n  <link rel=\"stylesheet\" href=\"/css/non-critical.css\" media=\"print\" onload=\"this.media='all'\">\n</head>",
      "hints": [
        {
          "en": "Review the challenge requirements carefully.",
          "vi": "Đọc kỹ các yêu cầu của thử thách."
        }
      ],
      "solutionExplanation": {
        "en": "Inline critical CSS renders page layout immediately without waiting for network CSS downloads.",
        "vi": "CSS nội dòng quan trọng giúp hiển thị trang ngay lập tức mà không phải chờ tải tệp CSS từ mạng."
      }
    },
    {
      "id": "html_ch_17_v2",
      "title": {
        "en": "Variant 2: CDN Edge Preconnect and DNS Prefetch Pairings",
        "vi": "Biến thể 2: Cặp đôi kết nối sớm CDN Edge với Preconnect và DNS Prefetch"
      },
      "description": {
        "en": "Build a head connecting to dynamic API and media CDN origins with dual preconnect and dns-prefetch.",
        "vi": "Xây dựng khối head kết nối tới máy chủ API và CDN đa phương tiện với cả preconnect và dns-prefetch."
      },
      "requirements": [
        {
          "en": "Preconnect & dns-prefetch to \"https://api.4tm.io\"",
          "vi": "Preconnect & dns-prefetch tới \"https://api.4tm.io\""
        },
        {
          "en": "Preconnect & dns-prefetch to \"https://cdn.4tm.io\"",
          "vi": "Preconnect & dns-prefetch tới \"https://cdn.4tm.io\""
        }
      ],
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>Edge API Optimized</title>\n  <link rel=\"preconnect\" href=\"https://api.4tm.io\">\n  <link rel=\"dns-prefetch\" href=\"https://api.4tm.io\">\n  <link rel=\"preconnect\" href=\"https://cdn.4tm.io\">\n  <link rel=\"dns-prefetch\" href=\"https://cdn.4tm.io\">\n</head>",
      "hints": [
        {
          "en": "Review the challenge requirements carefully.",
          "vi": "Đọc kỹ các yêu cầu của thử thách."
        }
      ],
      "solutionExplanation": {
        "en": "Dual preconnect and dns-prefetch guarantees cross-browser connection pre-warming across all browser versions.",
        "vi": "Kết hợp preconnect và dns-prefetch đảm bảo kích hoạt kết nối sớm trên mọi thế hệ trình duyệt."
      }
    }
  ],
  "quizQuestionPool": [
    {
      "id": "html_q_17_1",
      "type": "single_choice",
      "question": {
        "en": "What does <link rel=\"preload\" ...> do in the browser network pipeline?",
        "vi": "Thẻ <link rel=\"preload\" ...> làm gì trong luồng xử lý mạng của trình duyệt?"
      },
      "options": [
        {
          "en": "Forces the browser to fetch a critical resource immediately with high priority before it is discovered naturally in HTML/CSS parsing",
          "vi": "Ép trình duyệt tải ngay một tài nguyên quan trọng với mức ưu tiên cao trước khi nó được phát hiện một cách tự nhiên trong mã HTML/CSS"
        },
        {
          "en": "Saves the entire webpage to the local hard drive permanently",
          "vi": "Lưu vĩnh viễn toàn bộ trang web vào ổ cứng"
        },
        {
          "en": "Renders the element on screen invisibly",
          "vi": "Vẽ phần tử ra màn hình ở dạng vô hình"
        },
        {
          "en": "Compresses all JavaScript files using ZIP",
          "vi": "Nén toàn bộ file JavaScript bằng ZIP"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "preload pulls forward late-discovered critical resources (like fonts or hero images) in the network queue.",
        "vi": "preload kéo sớm các tài nguyên quan trọng bị ẩn sâu (như phông chữ hay ảnh hero) lên đầu hàng đợi mạng."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_2",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of <link rel=\"prefetch\" ...>?",
        "vi": "Mục đích của thẻ <link rel=\"prefetch\" ...> là gì?"
      },
      "options": [
        {
          "en": "Instructs the browser to download a resource in the background during idle time because it is likely needed for the user's NEXT page navigation",
          "vi": "Chỉ thị cho trình duyệt tải ngầm tài nguyên trong thời gian rỗi vì người dùng có khả năng cao sẽ chuyển tới trang tiếp theo đó"
        },
        {
          "en": "Blocks the current page until the resource finishes loading",
          "vi": "Chặn đứng trang hiện tại cho đến khi tài nguyên tải xong"
        },
        {
          "en": "Fetches deleted files from Google cache",
          "vi": "Tải các file đã bị xóa từ bộ nhớ cache của Google"
        },
        {
          "en": "Pre-installs software on the user's computer",
          "vi": "Cài đặt sẵn phần mềm lên máy tính người dùng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "prefetch speculatively caches future assets with low priority during idle network cycles.",
        "vi": "prefetch lưu cache đón đầu tài nguyên tương lai ở mức ưu tiên thấp khi đường truyền mạng rảnh rỗi."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_3",
      "type": "single_choice",
      "question": {
        "en": "What is the difference between <link rel=\"preconnect\"> and <link rel=\"dns-prefetch\">?",
        "vi": "Sự khác biệt giữa <link rel=\"preconnect\"> và <link rel=\"dns-prefetch\"> là gì?"
      },
      "options": [
        {
          "en": "preconnect performs DNS lookup, TCP handshake, and TLS negotiation; dns-prefetch ONLY performs DNS resolution",
          "vi": "preconnect thực hiện đầy đủ tra cứu DNS, bắt tay TCP và thương lượng bảo mật TLS; dns-prefetch CHỈ tra cứu DNS"
        },
        {
          "en": "dns-prefetch requires a paid license",
          "vi": "dns-prefetch yêu cầu bản quyền trả phí"
        },
        {
          "en": "preconnect only works on localhost",
          "vi": "preconnect chỉ chạy được trên localhost"
        },
        {
          "en": "There is zero difference between them",
          "vi": "Không có bất kỳ sự khác biệt nào"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "preconnect establishes a full active socket connection, eliminating 100-300ms of round-trip handshakes.",
        "vi": "preconnect thiết lập xong toàn bộ socket kết nối, tiết kiệm 100-300ms thời gian bắt tay mạng."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_4",
      "type": "single_choice",
      "question": {
        "en": "Why MUST you include the \"crossorigin\" attribute when preloading fonts (<link rel=\"preload\" as=\"font\" crossorigin>)?",
        "vi": "Tại sao BẮT BUỘC phải có thuộc tính \"crossorigin\" khi preload phông chữ (<link rel=\"preload\" as=\"font\" crossorigin>)?"
      },
      "options": [
        {
          "en": "Browser engines always fetch web fonts via anonymous CORS; without crossorigin, the browser treats it as a different request and downloads the font TWICE",
          "vi": "Trình duyệt luôn tải font theo chế độ CORS ẩn danh; nếu thiếu crossorigin, trình duyệt sẽ coi đó là yêu cầu khác và tải font 2 LẦN"
        },
        {
          "en": "Without crossorigin, fonts turn into Wingdings symbols",
          "vi": "Nếu thiếu crossorigin, chữ sẽ biến thành ký tự lạ"
        },
        {
          "en": "To allow hackers to steal the font file",
          "vi": "Để cho phép hacker lấy file font"
        },
        {
          "en": "It is a deprecated rule from HTML4",
          "vi": "Đó là quy tắc cũ bị bỏ từ HTML4"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Omitting crossorigin on font preload triggers double network downloads and wastes bandwidth.",
        "vi": "Quên khai báo crossorigin khi preload font sẽ khiến trình duyệt tải tệp 2 lần gây lãng phí mạng."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_5",
      "type": "single_choice",
      "question": {
        "en": "How does the \"defer\" attribute alter <script src=\"...\"> execution behavior?",
        "vi": "Thuộc tính \"defer\" làm thay đổi hành vi thực thi của thẻ <script src=\"...\"> như thế nào?"
      },
      "options": [
        {
          "en": "Downloads the script asynchronously in parallel without blocking HTML parsing, and executes scripts in exact document order after the DOM is fully constructed",
          "vi": "Tải file bất đồng bộ song song không chặn đọc HTML, và thực thi đúng thứ tự sau khi cây DOM đã được dựng xong hoàn toàn"
        },
        {
          "en": "Stops script execution forever",
          "vi": "Dừng chạy script vĩnh viễn"
        },
        {
          "en": "Runs the script before the <html> tag opens",
          "vi": "Chạy script trước khi mở thẻ <html>"
        },
        {
          "en": "Deletes the script after 10 seconds",
          "vi": "Xóa script sau 10 giây"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "defer prevents parser-blocking while maintaining sequential script dependency order.",
        "vi": "defer ngăn chặn hiện tượng tắc nghẽn phân tích DOM mà vẫn giữ nguyên thứ tự phụ thuộc giữa các file."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_6",
      "type": "single_choice",
      "question": {
        "en": "How does the \"async\" attribute differ from \"defer\" on <script> tags?",
        "vi": "Thuộc tính \"async\" khác biệt như thế nào so với \"defer\" trên thẻ <script>?"
      },
      "options": [
        {
          "en": "async downloads in parallel but pauses HTML parsing to execute the script IMMEDIATELY as soon as download finishes, with NO guaranteed execution order",
          "vi": "async tải song song nhưng sẽ tạm dừng đọc HTML để chạy script NGAY LẬP TỨC khi vừa tải xong, KHÔNG đảm bảo thứ tự thực thi"
        },
        {
          "en": "async only works on Internet Explorer",
          "vi": "async chỉ chạy trên Internet Explorer"
        },
        {
          "en": "async requires CSS to function",
          "vi": "async cần có CSS mới hoạt động"
        },
        {
          "en": "async converts JavaScript into WebAssembly",
          "vi": "async chuyển JavaScript thành WebAssembly"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "async is ideal for independent third-party scripts (analytics, ads) that don't depend on DOM or other scripts.",
        "vi": "async rất lý tưởng cho các script độc lập (Google Analytics, quảng cáo) không phụ thuộc vào DOM hay file khác."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_7",
      "type": "single_choice",
      "question": {
        "en": "What is the default loading behavior of <script type=\"module\" src=\"...\"> in modern browsers?",
        "vi": "Hành vi tải mặc định của <script type=\"module\" src=\"...\"> trong trình duyệt hiện đại là gì?"
      },
      "options": [
        {
          "en": "Module scripts are automatically deferred by default—they download in parallel and execute after DOM parsing completes",
          "vi": "Script dạng module tự động được hoãn (deferred) theo mặc định—tải song song và chỉ chạy sau khi dựng xong cây DOM"
        },
        {
          "en": "They block the entire browser window completely",
          "vi": "Chúng chặn đứng toàn bộ cửa sổ trình duyệt"
        },
        {
          "en": "They require synchronous compilation",
          "vi": "Chúng yêu cầu biên dịch đồng bộ"
        },
        {
          "en": "They only execute on mouse click",
          "vi": "Chúng chỉ chạy khi người dùng click chuột"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "type=\"module\" scripts are inherently deferred without needing an explicit defer attribute.",
        "vi": "Script có type=\"module\" vốn dĩ đã tự động có tính chất defer mà không cần ghi rõ chữ defer."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_8",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of <link rel=\"modulepreload\" href=\"...\">?",
        "vi": "Mục đích của thẻ <link rel=\"modulepreload\" href=\"...\"> là gì?"
      },
      "options": [
        {
          "en": "Instructs the browser to fetch, parse, and pre-compile an ES module and its dependency tree ahead of time",
          "vi": "Chỉ thị cho trình duyệt tải, phân tích cú pháp và biên dịch sẵn một ES module cùng toàn bộ cây phụ thuộc của nó trước khi dùng"
        },
        {
          "en": "Converts ES modules into CommonJS",
          "vi": "Chuyển ES module thành CommonJS"
        },
        {
          "en": "Deletes old modules from the server",
          "vi": "Xóa các module cũ trên máy chủ"
        },
        {
          "en": "Changes the script language to Python",
          "vi": "Đổi ngôn ngữ script sang Python"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "modulepreload eliminates waterfall compilation bottlenecks for modular JavaScript architectures.",
        "vi": "modulepreload xóa bỏ độ trễ thác đổ khi phân tích cây module JavaScript nhiều tầng."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_9",
      "type": "single_choice",
      "question": {
        "en": "What does the attribute fetchpriority=\"high\" on an <img> or <link rel=\"preload\"> do?",
        "vi": "Thuộc tính fetchpriority=\"high\" trên thẻ <img> hoặc <link rel=\"preload\"> có tác dụng gì?"
      },
      "options": [
        {
          "en": "Elevates the network request priority above all other assets in the browser's internal download queue (crucial for LCP hero images)",
          "vi": "Nâng mức độ ưu tiên của yêu cầu mạng lên cao nhất vượt trên các tài nguyên khác trong hàng đợi tải của trình duyệt (rất quan trọng cho ảnh Hero LCP)"
        },
        {
          "en": "Increases the download speed of the Wi-Fi router",
          "vi": "Tăng tốc độ phát sóng của cục phát Wi-Fi"
        },
        {
          "en": "Increases the contrast ratio of the image",
          "vi": "Tăng độ tương phản của hình ảnh"
        },
        {
          "en": "Turns the image into an animation",
          "vi": "Biến hình ảnh thành hoạt ảnh chuyển động"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "fetchpriority gives developers precise control over browser network resource scheduling.",
        "vi": "fetchpriority trao cho lập trình viên quyền điều khiển thứ tự ưu tiên trong hàng đợi mạng của trình duyệt."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_10",
      "type": "single_choice",
      "question": {
        "en": "What happens if a developer places a plain <script src=\"huge-bundle.js\"></script> without async or defer inside the <head>?",
        "vi": "Điều gì xảy ra nếu lập trình viên đặt thẻ <script src=\"huge-bundle.js\"></script> không có async hoặc defer bên trong thẻ <head>?"
      },
      "options": [
        {
          "en": "HTML parsing stops completely; the browser screen remains completely blank white while downloading and executing the script (Parser-Blocking)",
          "vi": "Quá trình đọc HTML bị dừng hoàn toàn; màn hình trình duyệt trắng tinh không hiển thị gì trong lúc tải và chạy script (Parser-Blocking)"
        },
        {
          "en": "The script runs in the background smoothly",
          "vi": "Script tự chạy ngầm mượt mà"
        },
        {
          "en": "The browser automatically fixes the issue",
          "vi": "Trình duyệt tự động sửa lỗi này"
        },
        {
          "en": "The page loads twice as fast",
          "vi": "Trang tải nhanh gấp 2 lần"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Synchronous head scripts are parser-blocking and directly damage First Contentful Paint (FCP).",
        "vi": "Script đồng bộ trong head làm nghẽn tiến trình đọc HTML và trực tiếp hủy hoại điểm số FCP."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_11",
      "type": "single_choice",
      "question": {
        "en": "What is the required \"as\" attribute value when preloading a CSS stylesheet?",
        "vi": "Giá trị của thuộc tính \"as\" bắt buộc là gì khi preload một tệp CSS stylesheet?"
      },
      "options": [
        {
          "en": "as=\"style\"",
          "vi": "as=\"style\""
        },
        {
          "en": "as=\"css\"",
          "vi": "as=\"css\""
        },
        {
          "en": "as=\"stylesheet\"",
          "vi": "as=\"stylesheet\""
        },
        {
          "en": "as=\"text\"",
          "vi": "as=\"text\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Preloading stylesheets requires as=\"style\".",
        "vi": "Preload file định kiểu CSS bắt buộc dùng as=\"style\"."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_12",
      "type": "single_choice",
      "question": {
        "en": "What is the required \"as\" attribute value when preloading a Web Worker script?",
        "vi": "Giá trị thuộc tính \"as\" bắt buộc là gì khi preload một tệp Web Worker script?"
      },
      "options": [
        {
          "en": "as=\"worker\"",
          "vi": "as=\"worker\""
        },
        {
          "en": "as=\"thread\"",
          "vi": "as=\"thread\""
        },
        {
          "en": "as=\"background\"",
          "vi": "as=\"background\""
        },
        {
          "en": "as=\"service\"",
          "vi": "as=\"service\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Web Workers use as=\"worker\" when preloaded.",
        "vi": "Web Worker sử dụng as=\"worker\" khi được tải trước bằng preload."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_13",
      "type": "single_choice",
      "question": {
        "en": "What is the impact of \"font-display: swap\" in CSS when paired with font preloading in HTML?",
        "vi": "Tác động của \"font-display: swap\" trong CSS khi kết hợp với preload phông chữ trong HTML là gì?"
      },
      "options": [
        {
          "en": "Renders fallback text instantly and swaps to the custom font once downloaded, eliminating invisible text latency (FOIT)",
          "vi": "Hiển thị ngay văn bản bằng phông dự phòng và lập tức đổi sang phông tùy chỉnh khi tải xong, loại bỏ hiện tượng chữ bị vô hình (FOIT)"
        },
        {
          "en": "Disables all custom fonts",
          "vi": "Tắt toàn bộ phông chữ tùy chỉnh"
        },
        {
          "en": "Swaps uppercase and lowercase letters",
          "vi": "Đổi chữ hoa thành chữ thường"
        },
        {
          "en": "Causes letters to dance on screen",
          "vi": "Làm chữ nhảy múa trên màn hình"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "font-display: swap eliminates the Flash of Invisible Text (FOIT) on slower connections.",
        "vi": "font-display: swap loại bỏ hiện tượng mất chữ vô hình (FOIT) trên các đường truyền mạng chậm."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_14",
      "type": "single_choice",
      "question": {
        "en": "How does modern HTTP/2 and HTTP/3 multiplexing benefit HTML resource loading?",
        "vi": "Giao thức truyền tải HTTP/2 và HTTP/3 đa ghép kênh (multiplexing) mang lại lợi ích gì cho việc tải tài nguyên HTML?"
      },
      "options": [
        {
          "en": "Allows hundreds of assets (CSS, JS, images, fonts) to be downloaded concurrently over a single TCP/QUIC connection without head-of-line blocking",
          "vi": "Cho phép hàng trăm tệp tài nguyên (CSS, JS, ảnh, font) được tải đồng thời trên 1 kết nối TCP/QUIC duy nhất mà không bị nghẽn đầu hàng"
        },
        {
          "en": "Renders web pages in 3D glasses",
          "vi": "Hiển thị trang web bằng kính 3D"
        },
        {
          "en": "Requires users to enter passwords for every image",
          "vi": "Bắt người dùng nhập mật khẩu cho từng bức ảnh"
        },
        {
          "en": "Limits download speed to 10kbps",
          "vi": "Giới hạn tốc độ tải còn 10kbps"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Multiplexing over a single connection makes granular resource hints dramatically more efficient.",
        "vi": "Đa ghép kênh trên 1 kết nối duy nhất giúp các gợi ý tài nguyên phát huy hiệu quả tối đa."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_15",
      "type": "single_choice",
      "question": {
        "en": "What is the downside of preloading an asset that is NOT actually used on the current page within 3 seconds?",
        "vi": "Nhược điểm của việc preload một tài nguyên nhưng KHÔNG thực sự dùng trên trang hiện tại trong vòng 3 giây là gì?"
      },
      "options": [
        {
          "en": "The browser logs a console warning about unused preloaded resources, and bandwidth is wasted competing with critical assets",
          "vi": "Trình duyệt ghi cảnh báo ra console về tài nguyên preload không dùng, và làm lãng phí băng thông cạnh tranh với các file quan trọng khác"
        },
        {
          "en": "The server automatically shuts down",
          "vi": "Máy chủ tự động tắt nguồn"
        },
        {
          "en": "The user is logged out",
          "vi": "Người dùng bị đăng xuất"
        },
        {
          "en": "The screen turns blue",
          "vi": "Màn hình chuyển sang màu xanh"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Preloads must only be used for assets guaranteed to be consumed immediately on page load.",
        "vi": "Preload chỉ nên dùng cho các tài nguyên chắc chắn được sử dụng ngay lập tức khi mở trang."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    },
    {
      "id": "html_q_17_16",
      "type": "single_choice",
      "question": {
        "en": "Which Core Web Vitals metric is most directly optimized by preloading the primary hero banner image with fetchpriority=\"high\"?",
        "vi": "Chỉ số Core Web Vitals nào được tối ưu trực tiếp nhất bằng cách preload ảnh banner hero chính kèm fetchpriority=\"high\"?"
      },
      "options": [
        {
          "en": "Largest Contentful Paint (LCP)",
          "vi": "Largest Contentful Paint (LCP)"
        },
        {
          "en": "Cumulative Layout Shift (CLS)",
          "vi": "Cumulative Layout Shift (CLS)"
        },
        {
          "en": "First Input Delay (FID)",
          "vi": "First Input Delay (FID)"
        },
        {
          "en": "Interaction to Next Paint (INP)",
          "vi": "Interaction to Next Paint (INP)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The hero image is almost always the LCP element; prioritizing its download directly accelerates LCP.",
        "vi": "Ảnh hero hầu như luôn là phần tử LCP; ưu tiên tải nó sẽ trực tiếp cải thiện tốc độ LCP."
      },
      "topicId": "html_resource_hints_perf",
      "difficulty": "medium"
    }
  ]
};

export default lesson19;
