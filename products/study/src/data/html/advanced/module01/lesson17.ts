import { Lesson } from '../../../../types';

export const lesson17: Lesson = {
  "id": "html_lesson_17",
  "moduleId": "html_mod_5",
  "levelId": "advanced",
  "courseId": "html",
  "order": 17,
  "topicId": "html_head_architecture",
  "title": {
    "en": "Document <head> Architecture, Charset & SEO Metadata Engine",
    "vi": "Kiến Trúc <head> Tài Liệu, Bảng Mã Charset & Bộ Máy Siêu Dữ Liệu SEO"
  },
  "summary": {
    "en": "Master the mission-critical <head> structure: early charset declaration, responsive mobile viewport meta tags, high-converting title tags, SEO meta descriptions, canonical URLs, robots indexing directives, and favicon asset hierarchies.",
    "vi": "Làm chủ cấu trúc <head> tối quan trọng: khai báo charset sớm, thẻ meta viewport cho di động, tiêu đề title thu hút click, mô tả SEO meta description, URL canonical, chỉ thị robots và hệ thống favicon đa nền tảng."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "The <head> element is the unseen operational cockpit of your website—instructing search engine web crawlers, social share bots, and browser layout engines on how to interpret, index, and render your application.",
      "vi": "Phần tử <head> là buồng lái vận hành vô hình của website—chỉ dẫn các bọ tìm kiếm, bot mạng xã hội và engine trình duyệt cách phân tích cú pháp, lập chỉ mục và hiển thị ứng dụng của bạn."
    },
    "conceptExplanation": {
      "en": "<meta charset=\"utf-8\"> MUST be placed within the first 1024 bytes of the HTML stream to prevent encoding sniff security vulnerabilities. Always include <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> for responsive mobile rendering. Ensure <title> is unique, concise (under 60 chars), and front-loads primary keywords. Write compelling <meta name=\"description\"> (150-160 chars) to maximize SERP Click-Through Rates (CTR). Use <link rel=\"canonical\" href=\"...\"> to consolidate link equity and eliminate duplicate content penalties.",
      "vi": "<meta charset=\"utf-8\"> BẮT BUỘC phải nằm trong 1024 byte đầu tiên của luồng HTML để ngăn chặn lỗ hổng bảo mật suy đoán bảng mã. Luôn thêm <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> để hiển thị đáp ứng trên di động. Tiêu đề <title> phải độc nhất, súc tích (dưới 60 ký tự) và đưa từ khóa chính lên đầu. Viết <meta name=\"description\"> hấp dẫn (150-160 ký tự) để tăng tỷ lệ nhấp (CTR) từ Google. Dùng <link rel=\"canonical\" href=\"...\"> để gom sức mạnh SEO và loại bỏ phạt trùng lặp nội dung."
    },
    "syntax": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Master HTML5 Semantics & Web Standards | 4TM Platform</title>\n  <meta name=\"description\" content=\"Comprehensive, production-ready curriculum covering HTML5 semantic architecture, forms, accessibility, and performance.\">\n  <link rel=\"canonical\" href=\"https://4tm.io/courses/html\">\n  <meta name=\"robots\" content=\"index, follow\">\n  <link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\">\n  <link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">\n  <link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">\n</head>",
    "examples": [
      {
        "title": {
          "en": "Production Enterprise Document <head> Blueprint",
          "vi": "Bản Thiết Kế <head> Tài Liệu Doanh Nghiệp Chuẩn Sản Xuất"
        },
        "code": "<!DOCTYPE html>\n<html lang=\"en\" dir=\"ltr\">\n<head>\n  <!-- 1. Character Encoding (Within first 1024 bytes) -->\n  <meta charset=\"utf-8\">\n  <!-- 2. Responsive Mobile Viewport -->\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <!-- 3. Primary Page Title & Search Metadata -->\n  <title>Enterprise Cloud Infrastructure | 4TM Technologies</title>\n  <meta name=\"description\" content=\"Scale mission-critical workloads globally with 99.999% uptime, automated Kubernetes orchestration, and multi-region failover.\">\n  <!-- 4. Canonical URL & Search Bot Directives -->\n  <link rel=\"canonical\" href=\"https://4tm.io/products/cloud\">\n  <meta name=\"robots\" content=\"index, follow, max-snippet:-1, max-image-preview:large\">\n  <!-- 5. Modern Multi-Platform Favicons -->\n  <link rel=\"icon\" href=\"/favicon.ico\" sizes=\"32x32\">\n  <link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">\n  <link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">\n</head>\n<body>\n  <h1>Enterprise Cloud Infrastructure</h1>\n</body>\n</html>",
        "language": "html",
        "explanation": {
          "en": "Ordered according to Google and W3C best practices for maximum parsing efficiency and complete SEO coverage.",
          "vi": "Sắp xếp theo thứ tự tối ưu của Google và W3C giúp trình duyệt đọc nhanh nhất và chuẩn SEO tuyệt đối."
        }
      },
      {
        "title": {
          "en": "Preventing Search Indexing on Internal Staging and Admin Dashboards",
          "vi": "Ngăn Chặn Google Lập Chỉ Mục Cho Trang Quản Trị Và Thử Nghiệm"
        },
        "code": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Internal Staging Dashboard | 4TM DevOps</title>\n  <!-- Block all search engines from indexing or following links -->\n  <meta name=\"robots\" content=\"noindex, nofollow\">\n</head>",
        "language": "html",
        "explanation": {
          "en": "Instructs search crawlers to never index sensitive internal staging pages or follow outbound links.",
          "vi": "Chỉ thị cho bot tìm kiếm không lập chỉ mục trang nội bộ và không đi theo các đường link ra ngoài."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Placing <meta charset=\"utf-8\"> deep down in the <head> after large scripts or CSS styles",
          "vi": "Đặt <meta charset=\"utf-8\"> quá sâu trong <head> phía sau các đoạn script hoặc CSS dài"
        },
        "correction": {
          "en": "The charset meta tag must be within the first 1024 bytes of the HTML document so the browser establishes encoding before reading text nodes.",
          "vi": "Thẻ charset phải nằm trong 1024 byte đầu tiên để trình duyệt xác định bảng mã trước khi đọc các ký tự nội dung."
        },
        "code": "<!-- Correct usage demonstrated in lesson examples -->"
      },
      {
        "mistake": {
          "en": "Using identical duplicate <title> and <meta name=\"description\"> tags across different pages",
          "vi": "Dùng tiêu đề <title> và mô tả <meta description> trùng lặp giống hệt nhau trên nhiều trang khác nhau"
        },
        "correction": {
          "en": "Every single page on your website must have unique, context-specific titles and descriptions to prevent cannibalization penalties in search ranking.",
          "vi": "Mỗi trang trên website bắt buộc phải có tiêu đề và mô tả độc nhất để tránh bị phạt nuốt từ khóa (cannibalization) trong xếp hạng Google."
        },
        "code": "<!-- Follow W3C semantic guidelines -->"
      }
    ],
    "tips": [
      {
        "en": "The SVG favicon (<link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">) allows CSS media queries like prefers-color-scheme directly inside the SVG code, automatically adapting your tab icon for dark mode.",
        "vi": "Favicon bằng tệp SVG (<link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">) hỗ trợ CSS prefers-color-scheme trực tiếp bên trong mã SVG, giúp tự đổi màu icon trên tab trình duyệt theo Dark Mode."
      }
    ],
    "practice": {
      "task": {
        "en": "Construct a Complete SEO <head> Element",
        "vi": "Xây dựng phần tử <head> chuẩn SEO hoàn chỉnh"
      },
      "instruction": {
        "en": "Create a <head> containing charset UTF-8, responsive mobile viewport, <title>Cloud Hosting Services | 4TM</title>, <meta name=\"description\" content=\"High performance cloud VPS.\">, and <link rel=\"canonical\" href=\"https://4tm.io/hosting\">.",
        "vi": "Tạo thẻ <head> chứa charset UTF-8, viewport di động, <title>Cloud Hosting Services | 4TM</title>, <meta name=\"description\" content=\"High performance cloud VPS.\">, và <link rel=\"canonical\" href=\"https://4tm.io/hosting\">."
      },
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Cloud Hosting Services | 4TM</title>\n  <meta name=\"description\" content=\"High performance cloud VPS.\">\n  <link rel=\"canonical\" href=\"https://4tm.io/hosting\">\n</head>",
      "requiredPatterns": [
        "<head>",
        "<meta charset=\"utf-8\">",
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        "<title>Cloud Hosting Services | 4TM</title>",
        "<meta name=\"description\" content=\"High performance cloud VPS.\">",
        "<link rel=\"canonical\" href=\"https://4tm.io/hosting\">",
        "</head>"
      ],
      "hint": {
        "en": "Include charset, viewport, title, description meta, and canonical link.",
        "vi": "Bao gồm charset, viewport, title, meta description, và link canonical."
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Construct a Complete SEO <head> Element (Consolidation)",
        "vi": "Xây dựng phần tử <head> chuẩn SEO hoàn chỉnh (Củng cố)"
      },
      "instruction": {
        "en": "Create a <head> containing charset UTF-8, responsive mobile viewport, <title>Cloud Hosting Services | 4TM</title>, <meta name=\"description\" content=\"High performance cloud VPS.\">, and <link rel=\"canonical\" href=\"https://4tm.io/hosting\">.",
        "vi": "Tạo thẻ <head> chứa charset UTF-8, viewport di động, <title>Cloud Hosting Services | 4TM</title>, <meta name=\"description\" content=\"High performance cloud VPS.\">, và <link rel=\"canonical\" href=\"https://4tm.io/hosting\">."
      },
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Cloud Hosting Services | 4TM</title>\n  <meta name=\"description\" content=\"High performance cloud VPS.\">\n  <link rel=\"canonical\" href=\"https://4tm.io/hosting\">\n</head>",
      "requiredPatterns": [
        "<head>",
        "<meta charset=\"utf-8\">",
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        "<title>Cloud Hosting Services | 4TM</title>",
        "<meta name=\"description\" content=\"High performance cloud VPS.\">",
        "<link rel=\"canonical\" href=\"https://4tm.io/hosting\">",
        "</head>"
      ],
      "hint": {
        "en": "Include charset, viewport, title, description meta, and canonical link.",
        "vi": "Bao gồm charset, viewport, title, meta description, và link canonical."
      }
    }
  },
  "exercisePool": [
    {
      "id": "html_ex_15_1",
      "type": "complete_code",
      "title": {
        "en": "Add Standard Responsive Viewport Meta Tag",
        "vi": "Thêm thẻ meta viewport chuẩn đáp ứng di động"
      },
      "instruction": {
        "en": "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> to the <head>.",
        "vi": "Thêm <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> vào trong <head>."
      },
      "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>My Website</title>\n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Website</title>\n</head>",
      "hint": {
        "en": "Add the viewport meta tag with width=device-width and initial-scale=1.0.",
        "vi": "Thêm thẻ meta viewport với width=device-width và initial-scale=1.0."
      },
      "explanation": {
        "en": "The viewport meta tag disables mobile browser default 980px desktop zooming and enables responsive CSS media queries.",
        "vi": "Thẻ meta viewport tắt chế độ tự thu nhỏ 980px trên di động và bật media query cho giao diện đáp ứng."
      }
    },
    {
      "id": "html_ex_15_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Canonical Link Tag Syntax",
        "vi": "Sửa lỗi cú pháp thẻ link canonical"
      },
      "instruction": {
        "en": "Fix the canonical tag by using <link rel=\"canonical\" href=\"https://4tm.io/about\"> instead of invalid <meta canonical=\"https://4tm.io/about\">.",
        "vi": "Sửa thẻ canonical bằng cách dùng <link rel=\"canonical\" href=\"https://4tm.io/about\"> thay cho thẻ meta sai cú pháp."
      },
      "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>About Us | 4TM</title>\n  <meta canonical=\"https://4tm.io/about\">\n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>About Us | 4TM</title>\n  <link rel=\"canonical\" href=\"https://4tm.io/about\">\n</head>",
      "hint": {
        "en": "Use <link rel=\"canonical\" href=\"...\">.",
        "vi": "Dùng <link rel=\"canonical\" href=\"...\">."
      },
      "explanation": {
        "en": "Canonical URLs are specified via <link rel=\"canonical\" href=\"...\">, not <meta>.",
        "vi": "Địa chỉ Canonical bắt buộc khai báo bằng thẻ <link rel=\"canonical\" href=\"...\">, không dùng thẻ <meta>."
      }
    },
    {
      "id": "html_ex_15_3",
      "type": "write_code",
      "title": {
        "en": "Write Robots Noindex Directives for Private Page",
        "vi": "Viết chỉ thị robots noindex cho trang bảo mật riêng tư"
      },
      "instruction": {
        "en": "Write a <meta name=\"robots\" content=\"noindex, nofollow\"> tag to block search crawlers.",
        "vi": "Viết thẻ <meta name=\"robots\" content=\"noindex, nofollow\"> để chặn bọ tìm kiếm."
      },
      "starterCode": "",
      "solutionCode": "<meta name=\"robots\" content=\"noindex, nofollow\">",
      "hint": {
        "en": "Use name=\"robots\" and content=\"noindex, nofollow\".",
        "vi": "Dùng name=\"robots\" và content=\"noindex, nofollow\"."
      },
      "explanation": {
        "en": "noindex prevents the page from appearing in search engine results pages.",
        "vi": "noindex ngăn trang web xuất hiện trong kết quả tìm kiếm của Google và Bing."
      }
    },
    {
      "id": "html_ex_15_4",
      "type": "modify_example",
      "title": {
        "en": "Add Multi-Platform Modern SVG and Apple Touch Icons",
        "vi": "Thêm icon SVG hiện đại và Apple Touch Icon"
      },
      "instruction": {
        "en": "Add <link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\"> and <link rel=\"apple-touch-icon\" href=\"/apple-icon.png\"> to the <head>.",
        "vi": "Thêm <link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\"> và <link rel=\"apple-touch-icon\" href=\"/apple-icon.png\"> vào <head>."
      },
      "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>App Home</title>\n  <link rel=\"icon\" href=\"/favicon.ico\">\n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>App Home</title>\n  <link rel=\"icon\" href=\"/favicon.ico\">\n  <link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">\n  <link rel=\"apple-touch-icon\" href=\"/apple-icon.png\">\n</head>",
      "hint": {
        "en": "Add the SVG favicon and apple-touch-icon link tags.",
        "vi": "Thêm các thẻ link favicon SVG và apple-touch-icon."
      },
      "explanation": {
        "en": "Modern browsers prefer scalable SVG favicons while iOS devices require apple-touch-icon.",
        "vi": "Trình duyệt hiện đại chuộng favicon vector SVG còn thiết bị iOS yêu cầu apple-touch-icon."
      }
    },
    {
      "id": "html_ex_15_5",
      "type": "predict_output",
      "title": {
        "en": "Predict Character Limit for SEO Meta Descriptions",
        "vi": "Dự đoán giới hạn ký tự tối ưu cho thẻ SEO Meta Description"
      },
      "instruction": {
        "en": "What is the recommended maximum character length for a <meta name=\"description\"> before Google truncates it in search results (around 160 or 500)?",
        "vi": "Độ dài ký tự tối đa khuyến nghị cho <meta name=\"description\"> trước khi bị Google cắt bớt dấu ba chấm là bao nhiêu (khoảng 160 hay 500)?"
      },
      "starterCode": "<!-- Type 160 or 500 -->\n<p>Length: </p>",
      "solutionCode": "<p>Length: 160</p>",
      "hint": {
        "en": "Search engines display approximately 150-160 characters on desktop/mobile snippets.",
        "vi": "Công cụ tìm kiếm hiển thị khoảng 150-160 ký tự trên đoạn trích kết quả."
      }
    }
  ],
  "challenge": {
    "id": "html_ch_15",
    "title": {
      "en": "Enterprise E-Commerce Product Page SEO <head> Architecture",
      "vi": "Kiến trúc <head> chuẩn SEO trang sản phẩm thương mại điện tử doanh nghiệp"
    },
    "description": {
      "en": "Build a production-ready, fully compliant document <head> for a high-converting product details page with complete SEO, canonical, and favicon hierarchies.",
      "vi": "Xây dựng phần tử <head> chuẩn sản xuất cho trang chi tiết sản phẩm tối ưu chuyển đổi với đầy đủ cấu trúc SEO, canonical và favicon."
    },
    "requirements": [
      {
        "en": "<meta charset=\"utf-8\"> as the very first child of <head>",
        "vi": "<meta charset=\"utf-8\"> là phần tử con đầu tiên của <head>"
      },
      {
        "en": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        "vi": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
      },
      {
        "en": "<title>Wireless Noise-Canceling Headphones Pro | 4TM Store</title>",
        "vi": "<title>Wireless Noise-Canceling Headphones Pro | 4TM Store</title>"
      },
      {
        "en": "<meta name=\"description\" content=\"Experience studio-grade active noise cancellation with 40-hour battery life and lossless Bluetooth 5.4 streaming. Free worldwide shipping.\">",
        "vi": "<meta name=\"description\" content=\"Experience studio-grade active noise cancellation with 40-hour battery life and lossless Bluetooth 5.4 streaming. Free worldwide shipping.\">"
      },
      {
        "en": "<link rel=\"canonical\" href=\"https://store.4tm.io/products/headphones-pro\">",
        "vi": "<link rel=\"canonical\" href=\"https://store.4tm.io/products/headphones-pro\">"
      },
      {
        "en": "Multi-tiered favicon links (favicon.ico, icon.svg, apple-touch-icon.png)",
        "vi": "Hệ thống favicon đa tầng (favicon.ico, icon.svg, apple-touch-icon.png)"
      }
    ],
    "starterCode": "<head>\n  \n</head>",
    "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Wireless Noise-Canceling Headphones Pro | 4TM Store</title>\n  <meta name=\"description\" content=\"Experience studio-grade active noise cancellation with 40-hour battery life and lossless Bluetooth 5.4 streaming. Free worldwide shipping.\">\n  <link rel=\"canonical\" href=\"https://store.4tm.io/products/headphones-pro\">\n  <meta name=\"robots\" content=\"index, follow, max-image-preview:large\">\n  <link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\">\n  <link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">\n  <link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">\n</head>",
    "hints": [
      {
        "en": "Keep meta charset as the first element inside <head>",
        "vi": "Giữ meta charset là phần tử đầu tiên trong <head>"
      },
      {
        "en": "Ensure the canonical link uses href and rel=\"canonical\"",
        "vi": "Đảm bảo link canonical dùng href và rel=\"canonical\""
      }
    ],
    "solutionExplanation": {
      "en": "Production-tested <head> architecture maximizing organic search visibility and mobile user experience.",
      "vi": "Kiến trúc <head> chuẩn sản xuất tối đa hóa khả năng hiển thị trên tìm kiếm tự nhiên và trải nghiệm di động."
    },
    "variants": [
      {
        "id": "html_ch_15_v1",
        "title": {
          "en": "Variant 1: Multilingual Global Subdirectory hreflang Architecture",
          "vi": "Biến thể 1: Kiến trúc đa ngôn ngữ toàn cầu bằng thẻ hreflang"
        },
        "description": {
          "en": "Build a head section linking localized versions for English, Vietnamese, and x-default fallback using <link rel=\"alternate\" hreflang=\"...\">.",
          "vi": "Xây dựng khối head liên kết các phiên bản ngôn ngữ tiếng Anh, tiếng Việt và x-default bằng <link rel=\"alternate\" hreflang=\"...\">."
        },
        "requirements": [
          {
            "en": "<link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">",
            "vi": "<link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">"
          },
          {
            "en": "<link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">",
            "vi": "<link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">"
          },
          {
            "en": "<link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">",
            "vi": "<link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">"
          }
        ],
        "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>API Documentation</title>\n</head>",
        "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>API Documentation | 4TM Platform</title>\n  <link rel=\"canonical\" href=\"https://4tm.io/en/docs\">\n  <link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">\n  <link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">\n  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">\n</head>",
        "hints": [
          {
            "en": "Review the challenge requirements carefully.",
            "vi": "Đọc kỹ các yêu cầu của thử thách."
          }
        ],
        "solutionExplanation": {
          "en": "hreflang signals regional and language variations directly to Google search indexers.",
          "vi": "hreflang báo hiệu các phiên bản ngôn ngữ và khu vực trực tiếp cho bộ máy chỉ mục Google."
        }
      },
      {
        "id": "html_ch_15_v2",
        "title": {
          "en": "Variant 2: Web App Manifest & Theme Color for Progressive Web Apps (PWA)",
          "vi": "Biến thể 2: Tích hợp Web App Manifest và Theme Color cho PWA"
        },
        "description": {
          "en": "Build a PWA head section featuring theme-color and manifest.json for mobile home-screen installability.",
          "vi": "Xây dựng khối head cho PWA có theme-color và manifest.json để cài đặt ra màn hình chính điện thoại."
        },
        "requirements": [
          {
            "en": "<meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">",
            "vi": "<meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">"
          },
          {
            "en": "<meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">",
            "vi": "<meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">"
          },
          {
            "en": "<link rel=\"manifest\" href=\"/manifest.webmanifest\">",
            "vi": "<link rel=\"manifest\" href=\"/manifest.webmanifest\">"
          }
        ],
        "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>4TM App</title>\n</head>",
        "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>4TM App</title>\n  <meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">\n  <meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">\n  <link rel=\"manifest\" href=\"/manifest.webmanifest\">\n</head>",
        "hints": [
          {
            "en": "Review the challenge requirements carefully.",
            "vi": "Đọc kỹ các yêu cầu của thử thách."
          }
        ],
        "solutionExplanation": {
          "en": "theme-color customizes the mobile browser address bar chrome dynamically per user color scheme.",
          "vi": "theme-color đổi màu thanh tiêu đề trình duyệt di động theo chế độ sáng tối của người dùng."
        }
      }
    ]
  },
  "challengePool": [
    {
      "id": "html_ch_15",
      "title": {
        "en": "Enterprise E-Commerce Product Page SEO <head> Architecture",
        "vi": "Kiến trúc <head> chuẩn SEO trang sản phẩm thương mại điện tử doanh nghiệp"
      },
      "description": {
        "en": "Build a production-ready, fully compliant document <head> for a high-converting product details page with complete SEO, canonical, and favicon hierarchies.",
        "vi": "Xây dựng phần tử <head> chuẩn sản xuất cho trang chi tiết sản phẩm tối ưu chuyển đổi với đầy đủ cấu trúc SEO, canonical và favicon."
      },
      "requirements": [
        {
          "en": "<meta charset=\"utf-8\"> as the very first child of <head>",
          "vi": "<meta charset=\"utf-8\"> là phần tử con đầu tiên của <head>"
        },
        {
          "en": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
          "vi": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        },
        {
          "en": "<title>Wireless Noise-Canceling Headphones Pro | 4TM Store</title>",
          "vi": "<title>Wireless Noise-Canceling Headphones Pro | 4TM Store</title>"
        },
        {
          "en": "<meta name=\"description\" content=\"Experience studio-grade active noise cancellation with 40-hour battery life and lossless Bluetooth 5.4 streaming. Free worldwide shipping.\">",
          "vi": "<meta name=\"description\" content=\"Experience studio-grade active noise cancellation with 40-hour battery life and lossless Bluetooth 5.4 streaming. Free worldwide shipping.\">"
        },
        {
          "en": "<link rel=\"canonical\" href=\"https://store.4tm.io/products/headphones-pro\">",
          "vi": "<link rel=\"canonical\" href=\"https://store.4tm.io/products/headphones-pro\">"
        },
        {
          "en": "Multi-tiered favicon links (favicon.ico, icon.svg, apple-touch-icon.png)",
          "vi": "Hệ thống favicon đa tầng (favicon.ico, icon.svg, apple-touch-icon.png)"
        }
      ],
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Wireless Noise-Canceling Headphones Pro | 4TM Store</title>\n  <meta name=\"description\" content=\"Experience studio-grade active noise cancellation with 40-hour battery life and lossless Bluetooth 5.4 streaming. Free worldwide shipping.\">\n  <link rel=\"canonical\" href=\"https://store.4tm.io/products/headphones-pro\">\n  <meta name=\"robots\" content=\"index, follow, max-image-preview:large\">\n  <link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\">\n  <link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">\n  <link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">\n</head>",
      "hints": [
        {
          "en": "Keep meta charset as the first element inside <head>",
          "vi": "Giữ meta charset là phần tử đầu tiên trong <head>"
        },
        {
          "en": "Ensure the canonical link uses href and rel=\"canonical\"",
          "vi": "Đảm bảo link canonical dùng href và rel=\"canonical\""
        }
      ],
      "solutionExplanation": {
        "en": "Production-tested <head> architecture maximizing organic search visibility and mobile user experience.",
        "vi": "Kiến trúc <head> chuẩn sản xuất tối đa hóa khả năng hiển thị trên tìm kiếm tự nhiên và trải nghiệm di động."
      },
      "variants": [
        {
          "id": "html_ch_15_v1",
          "title": {
            "en": "Variant 1: Multilingual Global Subdirectory hreflang Architecture",
            "vi": "Biến thể 1: Kiến trúc đa ngôn ngữ toàn cầu bằng thẻ hreflang"
          },
          "description": {
            "en": "Build a head section linking localized versions for English, Vietnamese, and x-default fallback using <link rel=\"alternate\" hreflang=\"...\">.",
            "vi": "Xây dựng khối head liên kết các phiên bản ngôn ngữ tiếng Anh, tiếng Việt và x-default bằng <link rel=\"alternate\" hreflang=\"...\">."
          },
          "requirements": [
            {
              "en": "<link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">",
              "vi": "<link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">"
            },
            {
              "en": "<link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">",
              "vi": "<link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">"
            },
            {
              "en": "<link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">",
              "vi": "<link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">"
            }
          ],
          "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>API Documentation</title>\n</head>",
          "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>API Documentation | 4TM Platform</title>\n  <link rel=\"canonical\" href=\"https://4tm.io/en/docs\">\n  <link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">\n  <link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">\n  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">\n</head>",
          "hints": [
            {
              "en": "Review the challenge requirements carefully.",
              "vi": "Đọc kỹ các yêu cầu của thử thách."
            }
          ],
          "solutionExplanation": {
            "en": "hreflang signals regional and language variations directly to Google search indexers.",
            "vi": "hreflang báo hiệu các phiên bản ngôn ngữ và khu vực trực tiếp cho bộ máy chỉ mục Google."
          }
        },
        {
          "id": "html_ch_15_v2",
          "title": {
            "en": "Variant 2: Web App Manifest & Theme Color for Progressive Web Apps (PWA)",
            "vi": "Biến thể 2: Tích hợp Web App Manifest và Theme Color cho PWA"
          },
          "description": {
            "en": "Build a PWA head section featuring theme-color and manifest.json for mobile home-screen installability.",
            "vi": "Xây dựng khối head cho PWA có theme-color và manifest.json để cài đặt ra màn hình chính điện thoại."
          },
          "requirements": [
            {
              "en": "<meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">",
              "vi": "<meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">"
            },
            {
              "en": "<meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">",
              "vi": "<meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">"
            },
            {
              "en": "<link rel=\"manifest\" href=\"/manifest.webmanifest\">",
              "vi": "<link rel=\"manifest\" href=\"/manifest.webmanifest\">"
            }
          ],
          "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>4TM App</title>\n</head>",
          "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>4TM App</title>\n  <meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">\n  <meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">\n  <link rel=\"manifest\" href=\"/manifest.webmanifest\">\n</head>",
          "hints": [
            {
              "en": "Review the challenge requirements carefully.",
              "vi": "Đọc kỹ các yêu cầu của thử thách."
            }
          ],
          "solutionExplanation": {
            "en": "theme-color customizes the mobile browser address bar chrome dynamically per user color scheme.",
            "vi": "theme-color đổi màu thanh tiêu đề trình duyệt di động theo chế độ sáng tối của người dùng."
          }
        }
      ]
    },
    {
      "id": "html_ch_15_v1",
      "title": {
        "en": "Variant 1: Multilingual Global Subdirectory hreflang Architecture",
        "vi": "Biến thể 1: Kiến trúc đa ngôn ngữ toàn cầu bằng thẻ hreflang"
      },
      "description": {
        "en": "Build a head section linking localized versions for English, Vietnamese, and x-default fallback using <link rel=\"alternate\" hreflang=\"...\">.",
        "vi": "Xây dựng khối head liên kết các phiên bản ngôn ngữ tiếng Anh, tiếng Việt và x-default bằng <link rel=\"alternate\" hreflang=\"...\">."
      },
      "requirements": [
        {
          "en": "<link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">",
          "vi": "<link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">"
        },
        {
          "en": "<link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">",
          "vi": "<link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">"
        },
        {
          "en": "<link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">",
          "vi": "<link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">"
        }
      ],
      "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>API Documentation</title>\n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>API Documentation | 4TM Platform</title>\n  <link rel=\"canonical\" href=\"https://4tm.io/en/docs\">\n  <link rel=\"alternate\" hreflang=\"en\" href=\"https://4tm.io/en/docs\">\n  <link rel=\"alternate\" hreflang=\"vi\" href=\"https://4tm.io/vi/docs\">\n  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://4tm.io/en/docs\">\n</head>",
      "hints": [
        {
          "en": "Review the challenge requirements carefully.",
          "vi": "Đọc kỹ các yêu cầu của thử thách."
        }
      ],
      "solutionExplanation": {
        "en": "hreflang signals regional and language variations directly to Google search indexers.",
        "vi": "hreflang báo hiệu các phiên bản ngôn ngữ và khu vực trực tiếp cho bộ máy chỉ mục Google."
      }
    },
    {
      "id": "html_ch_15_v2",
      "title": {
        "en": "Variant 2: Web App Manifest & Theme Color for Progressive Web Apps (PWA)",
        "vi": "Biến thể 2: Tích hợp Web App Manifest và Theme Color cho PWA"
      },
      "description": {
        "en": "Build a PWA head section featuring theme-color and manifest.json for mobile home-screen installability.",
        "vi": "Xây dựng khối head cho PWA có theme-color và manifest.json để cài đặt ra màn hình chính điện thoại."
      },
      "requirements": [
        {
          "en": "<meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">",
          "vi": "<meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">"
        },
        {
          "en": "<meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">",
          "vi": "<meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">"
        },
        {
          "en": "<link rel=\"manifest\" href=\"/manifest.webmanifest\">",
          "vi": "<link rel=\"manifest\" href=\"/manifest.webmanifest\">"
        }
      ],
      "starterCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>4TM App</title>\n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>4TM App</title>\n  <meta name=\"theme-color\" content=\"#2563eb\" media=\"(prefers-color-scheme: light)\">\n  <meta name=\"theme-color\" content=\"#0f172a\" media=\"(prefers-color-scheme: dark)\">\n  <link rel=\"manifest\" href=\"/manifest.webmanifest\">\n</head>",
      "hints": [
        {
          "en": "Review the challenge requirements carefully.",
          "vi": "Đọc kỹ các yêu cầu của thử thách."
        }
      ],
      "solutionExplanation": {
        "en": "theme-color customizes the mobile browser address bar chrome dynamically per user color scheme.",
        "vi": "theme-color đổi màu thanh tiêu đề trình duyệt di động theo chế độ sáng tối của người dùng."
      }
    }
  ],
  "quizQuestionPool": [
    {
      "id": "html_q_15_1",
      "type": "single_choice",
      "question": {
        "en": "Why must <meta charset=\"utf-8\"> appear within the first 1024 bytes of an HTML document?",
        "vi": "Tại sao thẻ <meta charset=\"utf-8\"> bắt buộc phải xuất hiện trong 1024 byte đầu tiên của tài liệu HTML?"
      },
      "options": [
        {
          "en": "To ensure the browser identifies the character encoding immediately before reading content, preventing security vulnerabilities and character corruption",
          "vi": "Để đảm bảo trình duyệt nhận diện ngay bảng mã ký tự trước khi đọc nội dung, ngăn chặn các lỗ hổng bảo mật và lỗi vỡ font chữ"
        },
        {
          "en": "Because files larger than 1024 bytes are deleted by web servers",
          "vi": "Vì các file lớn hơn 1024 byte sẽ bị máy chủ xóa"
        },
        {
          "en": "To compress the HTML file with gzip",
          "vi": "Để nén file HTML bằng gzip"
        },
        {
          "en": "To enable dark mode automatically",
          "vi": "Để tự động bật giao diện tối"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Early charset declaration prevents encoding sniffing attacks and garbled character display.",
        "vi": "Khai báo charset sớm ngăn chặn tấn công suy đoán bảng mã và hiện tượng lỗi hiển thị ký tự (mojibake)."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_2",
      "type": "single_choice",
      "question": {
        "en": "What does <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> do?",
        "vi": "Thẻ <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> có vai trò gì?"
      },
      "options": [
        {
          "en": "Sets the viewport width to match the physical device width and sets the initial zoom scale to 1:1, enabling responsive design",
          "vi": "Đặt bề rộng khung nhìn khớp với bề rộng thực của thiết bị và đặt tỷ lệ thu phóng ban đầu là 1:1, kích hoạt thiết kế đáp ứng"
        },
        {
          "en": "Takes a photo of the user's face using the webcam",
          "vi": "Chụp ảnh khuôn mặt người dùng bằng webcam"
        },
        {
          "en": "Forces the webpage to render at 4K resolution",
          "vi": "Ép trang web hiển thị ở độ phân giải 4K"
        },
        {
          "en": "Disables all CSS media queries",
          "vi": "Vô hiệu hóa toàn bộ CSS media queries"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The viewport meta tag instructs mobile browsers to render CSS layouts to the actual screen width.",
        "vi": "Thẻ viewport chỉ thị trình duyệt di động hiển thị layout CSS theo đúng kích thước màn hình thực."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_3",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of <link rel=\"canonical\" href=\"...\">?",
        "vi": "Mục đích của thẻ <link rel=\"canonical\" href=\"...\"> là gì?"
      },
      "options": [
        {
          "en": "Informs search engines of the single authoritative \"master\" URL for a page, consolidating SEO rank and preventing duplicate content issues",
          "vi": "Báo cho công cụ tìm kiếm biết địa chỉ URL gốc chính thức duy nhất của trang, gom sức mạnh thứ hạng SEO và ngăn phạt trùng lặp nội dung"
        },
        {
          "en": "Redirects the user to a new website with JavaScript",
          "vi": "Chuyển hướng người dùng sang website mới bằng JavaScript"
        },
        {
          "en": "Downloads canonical Bible scriptures",
          "vi": "Tải văn bản kinh thánh"
        },
        {
          "en": "Disables HTTP caching",
          "vi": "Tắt bộ nhớ đệm HTTP"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "rel=\"canonical\" prevents URL variations (with tracking params, UTM tags) from splitting SEO authority.",
        "vi": "rel=\"canonical\" ngăn các biến thể URL (kèm mã tracking, UTM) làm phân tán sức mạnh SEO."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_4",
      "type": "single_choice",
      "question": {
        "en": "Where does the text inside the <title> element appear?",
        "vi": "Văn bản nằm trong phần tử <title> sẽ hiển thị ở đâu?"
      },
      "options": [
        {
          "en": "In the browser's tab bar, window title, bookmarks, and as the clickable blue headline in Google search results",
          "vi": "Trên thanh tab trình duyệt, tiêu đề cửa sổ, danh sách bookmark và là dòng tiêu đề xanh có thể nhấp được trong kết quả tìm kiếm Google"
        },
        {
          "en": "As a huge <h1> heading at the very top of the page body",
          "vi": "Làm một thẻ tiêu đề <h1> khổng lồ ở đầu trang"
        },
        {
          "en": "In the bottom footer next to the copyright notice",
          "vi": "Ở chân trang cạnh thông báo bản quyền"
        },
        {
          "en": "Inside the browser address bar instead of the URL",
          "vi": "Bên trong thanh địa chỉ thay thế cho đường link URL"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The <title> defines the document title displayed in the browser tab and search engine SERP snippets.",
        "vi": "<title> định nghĩa tiêu đề tài liệu hiển thị trên tab trình duyệt và tiêu đề kết quả tìm kiếm Google."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_5",
      "type": "single_choice",
      "question": {
        "en": "What is the role of <meta name=\"description\" content=\"...\">?",
        "vi": "Vai trò của thẻ <meta name=\"description\" content=\"...\"> là gì?"
      },
      "options": [
        {
          "en": "Provides a concise summary snippet displayed beneath the title in search engine results to entice users to click",
          "vi": "Cung cấp đoạn tóm tắt súc tích hiển thị bên dưới tiêu đề trong kết quả tìm kiếm để thu hút người dùng nhấp vào xem"
        },
        {
          "en": "Generates automatic voice narration for the entire page",
          "vi": "Tự động đọc bài viết bằng giọng nói"
        },
        {
          "en": "Acts as a secret password for site administrators",
          "vi": "Đóng vai trò là mật khẩu bí mật cho quản trị viên"
        },
        {
          "en": "Speeds up JavaScript execution by 50%",
          "vi": "Tăng tốc độ chạy JavaScript thêm 50%"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Meta descriptions serve as organic search sales pitches to boost Click-Through Rates (CTR).",
        "vi": "Meta description đóng vai trò là lời mời chào hấp dẫn giúp tăng tỷ lệ nhấp chuột (CTR) từ Google."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_6",
      "type": "single_choice",
      "question": {
        "en": "What does <meta name=\"robots\" content=\"noindex, follow\"> instruct search crawlers to do?",
        "vi": "Thẻ <meta name=\"robots\" content=\"noindex, follow\"> chỉ thị cho bọ tìm kiếm làm gì?"
      },
      "options": [
        {
          "en": "Do not include this page in search results, but DO follow links on this page to discover and crawl other pages",
          "vi": "Không đưa trang này vào kết quả tìm kiếm, nhưng VẪN duyệt theo các liên kết trong trang để tìm các trang khác"
        },
        {
          "en": "Delete all links on the page",
          "vi": "Xóa toàn bộ liên kết trên trang"
        },
        {
          "en": "Index the page but ignore all outbound links",
          "vi": "Lập chỉ mục trang nhưng bỏ qua các link ra ngoài"
        },
        {
          "en": "Block robots from visiting the website server",
          "vi": "Chặn robot truy cập vào máy chủ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "noindex removes the page from SERPs; follow allows PageRank link equity to flow to linked pages.",
        "vi": "noindex loại trang khỏi kết quả tìm kiếm; follow cho phép dòng chảy sức mạnh link truyền sang các trang khác."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_7",
      "type": "single_choice",
      "question": {
        "en": "What is the modern standard format for vector favicons that scale crisply across all display resolutions?",
        "vi": "Định dạng tiêu chuẩn hiện đại cho favicon vector hiển thị sắc nét ở mọi độ phân giải là gì?"
      },
      "options": [
        {
          "en": "<link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">",
          "vi": "<link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\">"
        },
        {
          "en": "<link rel=\"icon\" href=\"/icon.bmp\">",
          "vi": "<link rel=\"icon\" href=\"/icon.bmp\">"
        },
        {
          "en": "<link rel=\"icon\" href=\"/icon.tiff\">",
          "vi": "<link rel=\"icon\" href=\"/icon.tiff\">"
        },
        {
          "en": "<link rel=\"icon\" href=\"/icon.gif\">",
          "vi": "<link rel=\"icon\" href=\"/icon.gif\">"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "SVG favicons provide lossless scaling and support dark/light mode CSS media queries inside the SVG.",
        "vi": "Favicon SVG co giãn không mất chất lượng và hỗ trợ tự đổi màu theo Dark Mode ngay trong mã SVG."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_8",
      "type": "single_choice",
      "question": {
        "en": "What favicon link is specifically required for iOS Safari when adding a website to the iPhone home screen?",
        "vi": "Thẻ link favicon nào là bắt buộc riêng cho Safari iOS khi người dùng lưu website ra màn hình chính iPhone?"
      },
      "options": [
        {
          "en": "<link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">",
          "vi": "<link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">"
        },
        {
          "en": "<link rel=\"ios-icon\" href=\"/ios.png\">",
          "vi": "<link rel=\"ios-icon\" href=\"/ios.png\">"
        },
        {
          "en": "<link rel=\"iphone-app\" href=\"/app.png\">",
          "vi": "<link rel=\"iphone-app\" href=\"/app.png\">"
        },
        {
          "en": "<link rel=\"touch\" href=\"/touch.png\">",
          "vi": "<link rel=\"touch\" href=\"/touch.png\">"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "apple-touch-icon specifies the high-resolution app icon for iOS devices.",
        "vi": "apple-touch-icon chỉ định biểu tượng ứng dụng độ phân giải cao cho các thiết bị iOS."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_9",
      "type": "single_choice",
      "question": {
        "en": "What does the <meta name=\"theme-color\" content=\"#2563eb\"> tag do on mobile browsers?",
        "vi": "Thẻ <meta name=\"theme-color\" content=\"#2563eb\"> làm gì trên trình duyệt di động?"
      },
      "options": [
        {
          "en": "Colors the mobile browser's address bar and status chrome to match your brand's primary color scheme",
          "vi": "Đổi màu thanh địa chỉ và thanh trạng thái của trình duyệt di động theo đúng tông màu thương hiệu"
        },
        {
          "en": "Changes the user's phone wallpaper",
          "vi": "Đổi hình nền điện thoại của người dùng"
        },
        {
          "en": "Forces the whole page text to be blue",
          "vi": "Ép toàn bộ chữ trong trang sang màu xanh"
        },
        {
          "en": "Dims the screen brightness by 50%",
          "vi": "Giảm 50% độ sáng màn hình"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "theme-color tints the mobile operating system browser UI for a seamless app-like experience.",
        "vi": "theme-color nhuộm màu giao diện khung trình duyệt tạo cảm giác trải nghiệm như ứng dụng native."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_10",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of <link rel=\"alternate\" hreflang=\"vi\" href=\"...\">?",
        "vi": "Mục đích của thẻ <link rel=\"alternate\" hreflang=\"vi\" href=\"...\"> là gì?"
      },
      "options": [
        {
          "en": "Directs search engines to the Vietnamese translation of the current page for users searching in Vietnam or in Vietnamese",
          "vi": "Chỉ dẫn công cụ tìm kiếm tới phiên bản tiếng Việt của trang hiện tại cho người dùng tìm kiếm tại Việt Nam hoặc bằng tiếng Việt"
        },
        {
          "en": "Translates the page instantly using Google Translate API",
          "vi": "Dịch trang ngay lập tức bằng Google Translate API"
        },
        {
          "en": "Changes the keyboard language to Vietnamese Telex",
          "vi": "Đổi bàn phím gõ sang kiểu Telex"
        },
        {
          "en": "Downloads Vietnamese fonts to the operating system",
          "vi": "Tải phông chữ tiếng Việt về máy tính"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "hreflang informs search engines which localized URL to display in international search results.",
        "vi": "hreflang báo cho công cụ tìm kiếm URL bản địa hóa nào nên hiển thị trong kết quả tìm kiếm quốc tế."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_11",
      "type": "single_choice",
      "question": {
        "en": "What does hreflang=\"x-default\" specify?",
        "vi": "Thuộc tính hreflang=\"x-default\" chỉ định điều gì?"
      },
      "options": [
        {
          "en": "The fallback landing page URL for international users when no matching language or regional version is available",
          "vi": "Địa chỉ URL hạ cấp mặc định cho người dùng quốc tế khi không có phiên bản ngôn ngữ/khu vực nào phù hợp"
        },
        {
          "en": "A secret debug page for developers",
          "vi": "Trang gỡ lỗi bí mật cho lập trình viên"
        },
        {
          "en": "The XML sitemap location",
          "vi": "Vị trí của tệp sơ đồ trang web sitemap.xml"
        },
        {
          "en": "The 404 page not found URL",
          "vi": "Đường dẫn tới trang lỗi 404"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "x-default is the fallback URL for unmatched locales and language selector landing pages.",
        "vi": "x-default là URL dự phòng cho các ngôn ngữ chưa được hỗ trợ và trang chọn ngôn ngữ chung."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_12",
      "type": "single_choice",
      "question": {
        "en": "Can visible content elements (like <h1>, <p>, or <button>) be placed inside the <head> element?",
        "vi": "Các phần tử nội dung hiển thị (như <h1>, <p>, hoặc <button>) có được phép đặt trong phần tử <head> không?"
      },
      "options": [
        {
          "en": "No, <head> is strictly reserved for machine-readable metadata and resource links; placing body tags in head breaks DOM validation",
          "vi": "Không, <head> chỉ dành riêng cho siêu dữ liệu máy đọc và liên kết tài nguyên; đặt thẻ hiển thị trong head sẽ làm vỡ chuẩn DOM"
        },
        {
          "en": "Yes, any HTML element can go inside head",
          "vi": "Có, bất kỳ thẻ HTML nào cũng đặt được trong head"
        },
        {
          "en": "Only <h1> is allowed in head",
          "vi": "Chỉ có thẻ <h1> được phép trong head"
        },
        {
          "en": "Only on mobile websites",
          "vi": "Chỉ trên các website di động"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The <head> must contain only metadata elements (title, meta, link, script, style, base, noscript).",
        "vi": "Thẻ <head> chỉ được phép chứa các phần tử siêu dữ liệu (title, meta, link, script, style, base, noscript)."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_13",
      "type": "single_choice",
      "question": {
        "en": "What does the <base href=\"https://example.com/subfolder/\"> element do when placed in <head>?",
        "vi": "Thẻ <base href=\"https://example.com/subfolder/\"> làm gì khi được đặt trong <head>?"
      },
      "options": [
        {
          "en": "Defines the base URL used to resolve all relative URLs (links, images, stylesheets) across the entire document",
          "vi": "Xác định đường dẫn URL gốc dùng để phân giải toàn bộ các URL tương đối (link, ảnh, file CSS) trong toàn bộ tài liệu"
        },
        {
          "en": "Connects to a SQL database named \"base\"",
          "vi": "Kết nối tới cơ sở dữ liệu SQL có tên \"base\""
        },
        {
          "en": "Sets the font size to 16px",
          "vi": "Đặt cỡ chữ thành 16px"
        },
        {
          "en": "Encrypts the website with base64",
          "vi": "Mã hóa website bằng base64"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "<base> provides the document base URL for relative URL resolution.",
        "vi": "<base> cung cấp URL cơ sở cho việc phân giải tất cả các đường dẫn tương đối trong trang."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_14",
      "type": "single_choice",
      "question": {
        "en": "What is the recommended structure for an effective SEO page <title>?",
        "vi": "Cấu trúc khuyến nghị cho một tiêu đề <title> chuẩn SEO hiệu quả là gì?"
      },
      "options": [
        {
          "en": "Primary Keyword - Secondary Benefit | Brand Name (Under 60 characters)",
          "vi": "Từ khóa chính - Lợi ích phụ | Tên thương hiệu (Dưới 60 ký tự)"
        },
        {
          "en": "Home - Page 1 - Welcome to our website please click here to buy items now",
          "vi": "Trang chủ - Trang 1 - Chào mừng bạn đến website hãy bấm vào đây để mua hàng ngay"
        },
        {
          "en": "Only the company name with no keywords",
          "vi": "Chỉ ghi mỗi tên công ty không có từ khóa"
        },
        {
          "en": "A 200-word paragraph describing the entire company history",
          "vi": "Một đoạn văn 200 từ kể lịch sử hình thành công ty"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Front-loading primary keywords within 60 characters maximizes CTR and prevents SERP truncation.",
        "vi": "Đưa từ khóa chính lên đầu trong giới hạn 60 ký tự giúp tối đa hóa CTR và tránh bị Google cắt ngắn."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_15",
      "type": "single_choice",
      "question": {
        "en": "What does <meta name=\"robots\" content=\"max-image-preview:large\"> do for Google Discover and Google Search?",
        "vi": "Thẻ <meta name=\"robots\" content=\"max-image-preview:large\"> có tác dụng gì đối với Google Discover và Google Tìm kiếm?"
      },
      "options": [
        {
          "en": "Grants Google permission to display large rich image preview cards in search snippets and Google Discover feeds, significantly boosting traffic",
          "vi": "Cấp quyền cho Google hiển thị thẻ xem trước hình ảnh lớn trong kết quả tìm kiếm và bảng tin Google Discover, giúp tăng mạnh lượng truy cập"
        },
        {
          "en": "Compresses all photos to 10kb",
          "vi": "Nén toàn bộ ảnh xuống còn 10kb"
        },
        {
          "en": "Enables 3D holograms on smartphones",
          "vi": "Bật ảnh 3D nổi trên điện thoại"
        },
        {
          "en": "Blocks Google from looking at images",
          "vi": "Chặn Google xem ảnh"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "max-image-preview:large enables rich full-width image cards in Google Discover and SERP results.",
        "vi": "max-image-preview:large kích hoạt hiển thị ảnh thẻ khổ lớn trên Google Discover và kết quả tìm kiếm."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    },
    {
      "id": "html_q_15_16",
      "type": "single_choice",
      "question": {
        "en": "What happens if a webpage is completely missing a <title> tag in its <head>?",
        "vi": "Điều gì xảy ra nếu một trang web hoàn toàn thiếu thẻ <title> trong <head>?"
      },
      "options": [
        {
          "en": "The browser tab displays the raw URL or filename, and search engines invent an unoptimized title extracted from body text, hurting SEO rankings",
          "vi": "Tab trình duyệt hiển thị đường link URL thô hoặc tên file, và công cụ tìm kiếm tự bịa ra tiêu đề từ nội dung trang làm tụt hạng SEO"
        },
        {
          "en": "The computer crashes",
          "vi": "Máy tính bị treo"
        },
        {
          "en": "The page cannot be viewed over Wi-Fi",
          "vi": "Trang không thể xem qua mạng Wi-Fi"
        },
        {
          "en": "The browser automatically writes a title in JavaScript",
          "vi": "Trình duyệt tự viết code JavaScript tạo title"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The <title> tag is mandatory in HTML5 and forms the cornerstone of search indexing.",
        "vi": "Thẻ <title> là bắt buộc trong HTML5 và là nền tảng cốt lõi của việc lập chỉ mục tìm kiếm."
      },
      "topicId": "html_head_architecture",
      "difficulty": "medium"
    }
  ]
};

export default lesson17;
