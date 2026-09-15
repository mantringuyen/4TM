import { Lesson } from '../../../../types';

export const lesson18: Lesson = {
  "id": "html_lesson_18",
  "moduleId": "html_mod_5",
  "levelId": "advanced",
  "courseId": "html",
  "order": 18,
  "topicId": "html_open_graph_social",
  "title": {
    "en": "Open Graph Protocol, Twitter Cards & JSON-LD Structured Data",
    "vi": "Giao Thức Open Graph, Thẻ Twitter Cards & Dữ Liệu Có Cấu Trúc JSON-LD"
  },
  "summary": {
    "en": "Master viral social sharing previews and rich search snippets: Open Graph protocol tags (og:title, og:image 1200x630, og:description, og:url, og:type), Twitter Card metadata (summary_large_image), and Schema.org JSON-LD structured data for Google Knowledge Graphs.",
    "vi": "Làm chủ hình ảnh xem trước khi chia sẻ mạng xã hội và đoạn trích tìm kiếm phong phú: các thẻ giao thức Open Graph (og:title, og:image 1200x630, og:description, og:url, og:type), siêu dữ liệu Twitter Cards (summary_large_image) và dữ liệu có cấu trúc JSON-LD Schema.org cho sơ đồ tri thức Google."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "When links are shared on Facebook, LinkedIn, Discord, Telegram, or X (Twitter), social crawlers parse Open Graph and Twitter Card tags to generate rich visual card previews with high-converting imagery and titles.",
      "vi": "Khi liên kết được chia sẻ trên Facebook, LinkedIn, Discord, Telegram hoặc X (Twitter), bot mạng xã hội sẽ quét các thẻ Open Graph và Twitter Card để dựng nên các thẻ xem trước trực quan bắt mắt thu hút người dùng nhấp chuột."
    },
    "conceptExplanation": {
      "en": "Open Graph uses <meta property=\"og:*\" content=\"...\"> tags. The og:image should strictly be at least 1200x630px (1.91:1 aspect ratio) with an absolute HTTPS URL. Include og:image:width and og:image:height so platforms can render the preview card on the very first crawl without waiting to download the image file. Combine with <meta name=\"twitter:card\" content=\"summary_large_image\">. For rich Google search results (star ratings, prices, author bio), embed Schema.org JSON-LD inside a <script type=\"application/ld+json\"> element.",
      "vi": "Open Graph sử dụng các thẻ <meta property=\"og:*\" content=\"...\">. Ảnh og:image bắt buộc phải có kích thước tối thiểu 1200x630px (tỷ lệ 1.91:1) và là đường dẫn tuyệt đối HTTPS. Khai báo thêm og:image:width và og:image:height để nền tảng dựng thẻ xem trước ngay lần quét đầu tiên. Kết hợp với <meta name=\"twitter:card\" content=\"summary_large_image\">. Để hiển thị đoạn trích phong phú trên Google (đánh giá sao, giá tiền), hãy nhúng JSON-LD Schema.org bên trong thẻ <script type=\"application/ld+json\">."
    },
    "syntax": "<!-- Open Graph / Facebook / LinkedIn / Discord -->\n<meta property=\"og:type\" content=\"article\">\n<meta property=\"og:title\" content=\"The Definitive Guide to HTML5 Architecture\">\n<meta property=\"og:description\" content=\"Master modern web standards, semantic landmarks, and a11y.\">\n<meta property=\"og:url\" content=\"https://4tm.io/blog/html5-guide\">\n<meta property=\"og:image\" content=\"https://4tm.io/img/og-cover.jpg\">\n<meta property=\"og:image:width\" content=\"1200\">\n<meta property=\"og:image:height\" content=\"630\">\n\n<!-- Twitter / X -->\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:site\" content=\"@4tmPlatform\">\n\n<!-- JSON-LD Structured Data -->\n<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Article\",\n  \"headline\": \"The Definitive Guide to HTML5 Architecture\",\n  \"author\": {\n    \"@type\": \"Organization\",\n    \"name\": \"4TM Technologies\"\n  }\n}\n</script>",
    "examples": [
      {
        "title": {
          "en": "Production Social Preview Tags with 1200x630 Image Specifications",
          "vi": "Thẻ Xem Trước Mạng Xã Hội Chuẩn Kích Thước Ảnh 1200x630"
        },
        "code": "<head>\n  <meta charset=\"utf-8\">\n  <title>Enterprise Cloud Kubernetes Platform | 4TM</title>\n  \n  <!-- Open Graph Protocol -->\n  <meta property=\"og:site_name\" content=\"4TM Cloud Platform\">\n  <meta property=\"og:type\" content=\"website\">\n  <meta property=\"og:title\" content=\"Enterprise Cloud Kubernetes Platform | 4TM\">\n  <meta property=\"og:description\" content=\"Deploy mission-critical cloud clusters with automated scaling, 99.999% SLA, and zero-downtime rollouts.\">\n  <meta property=\"og:url\" content=\"https://4tm.io/cloud\">\n  <meta property=\"og:image\" content=\"https://4tm.io/assets/og-kubernetes-1200x630.jpg\">\n  <meta property=\"og:image:width\" content=\"1200\">\n  <meta property=\"og:image:height\" content=\"630\">\n  <meta property=\"og:image:alt\" content=\"4TM Kubernetes Cloud Cluster Architecture Dashboard\">\n\n  <!-- Twitter Card -->\n  <meta name=\"twitter:card\" content=\"summary_large_image\">\n  <meta name=\"twitter:site\" content=\"@4tmCloud\">\n  <meta name=\"twitter:creator\" content=\"@4tmEngineering\">\n</head>",
        "language": "html",
        "explanation": {
          "en": "Includes complete Open Graph properties, absolute image URLs, explicit width/height dimensions, and Twitter Card declarations.",
          "vi": "Bao gồm đầy đủ thuộc tính Open Graph, đường dẫn ảnh tuyệt đối, kích thước width/height rõ ràng và khai báo Twitter Card."
        }
      },
      {
        "title": {
          "en": "Course & Article Schema.org JSON-LD Structured Data",
          "vi": "Dữ Liệu Có Cấu Trúc JSON-LD Cho Khóa Học & Bài Viết Schema.org"
        },
        "code": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Course\",\n  \"name\": \"Production HTML5 Engineering Masterclass\",\n  \"description\": \"Comprehensive curriculum covering semantic markup, web forms, responsive multimedia, and WCAG AA accessibility.\",\n  \"provider\": {\n    \"@type\": \"Organization\",\n    \"name\": \"4TM Academy\",\n    \"sameAs\": \"https://4tm.io\"\n  },\n  \"educationalLevel\": \"Intermediate\",\n  \"inLanguage\": [\"en\", \"vi\"]\n}\n</script>",
        "language": "html",
        "explanation": {
          "en": "Embeds machine-readable JSON-LD Schema.org metadata to qualify for Google rich search results.",
          "vi": "Nhúng siêu dữ liệu có cấu trúc JSON-LD giúp website hiển thị kết quả mở rộng đẹp mắt trên Google tìm kiếm."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using a relative image path in og:image (e.g. og:image content=\"/images/share.jpg\")",
          "vi": "Dùng đường dẫn ảnh tương đối trong og:image (như content=\"/images/share.jpg\")"
        },
        "correction": {
          "en": "Social bots (Facebook, Twitter, Discord) require a complete absolute HTTPS URL (e.g. content=\"https://example.com/images/share.jpg\") to fetch the image.",
          "vi": "Bot mạng xã hội bắt buộc phải có URL tuyệt đối đầy đủ dạng HTTPS để có thể tải ảnh về hiển thị."
        },
        "code": "<!-- Correct usage demonstrated in lesson examples -->"
      },
      {
        "mistake": {
          "en": "Using property=\"twitter:card\" instead of name=\"twitter:card\"",
          "vi": "Dùng property=\"twitter:card\" thay vì name=\"twitter:card\""
        },
        "correction": {
          "en": "Open Graph tags use property=\"og:*\", whereas standard Twitter tags use name=\"twitter:*\".",
          "vi": "Thẻ Open Graph dùng property=\"og:*\", trong khi thẻ của Twitter dùng name=\"twitter:*\"."
        },
        "code": "<!-- Follow W3C semantic guidelines -->"
      }
    ],
    "tips": [
      {
        "en": "Facebook, LinkedIn, and Telegram cache your Open Graph metadata for up to 30 days—use their respective web debuggers (e.g., Facebook Sharing Debugger) to invalidate cache and refresh live preview cards.",
        "vi": "Facebook, LinkedIn và Telegram lưu cache thẻ xem trước tới 30 ngày—hãy dùng công cụ Facebook Sharing Debugger để xóa cache và cập nhật ảnh xem trước mới nhất."
      }
    ],
    "practice": {
      "task": {
        "en": "Write Complete Open Graph and Twitter Card Tags",
        "vi": "Viết đầy đủ các thẻ Open Graph và Twitter Card"
      },
      "instruction": {
        "en": "Create <meta> tags for og:title, og:description, og:image (\"https://4tm.io/img/share.jpg\"), og:url, og:type=\"website\", and twitter:card=\"summary_large_image\".",
        "vi": "Tạo các thẻ <meta> cho og:title, og:description, og:image (\"https://4tm.io/img/share.jpg\"), og:url, og:type=\"website\", và twitter:card=\"summary_large_image\"."
      },
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <meta property=\"og:type\" content=\"website\">\n  <meta property=\"og:title\" content=\"4TM Cloud\">\n  <meta property=\"og:description\" content=\"High performance cloud.\">\n  <meta property=\"og:url\" content=\"https://4tm.io\">\n  <meta property=\"og:image\" content=\"https://4tm.io/img/share.jpg\">\n  <meta name=\"twitter:card\" content=\"summary_large_image\">\n</head>",
      "requiredPatterns": [
        "property=\"og:type\"",
        "property=\"og:title\"",
        "property=\"og:description\"",
        "property=\"og:url\"",
        "property=\"og:image\"",
        "content=\"https://4tm.io/img/share.jpg\"",
        "name=\"twitter:card\"",
        "content=\"summary_large_image\""
      ],
      "hint": {
        "en": "Use property=\"og:*\" for Open Graph and name=\"twitter:card\" for Twitter.",
        "vi": "Dùng property=\"og:*\" cho Open Graph và name=\"twitter:card\" cho Twitter."
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Write Complete Open Graph and Twitter Card Tags (Consolidation)",
        "vi": "Viết đầy đủ các thẻ Open Graph và Twitter Card (Củng cố)"
      },
      "instruction": {
        "en": "Create <meta> tags for og:title, og:description, og:image (\"https://4tm.io/img/share.jpg\"), og:url, og:type=\"website\", and twitter:card=\"summary_large_image\".",
        "vi": "Tạo các thẻ <meta> cho og:title, og:description, og:image (\"https://4tm.io/img/share.jpg\"), og:url, og:type=\"website\", và twitter:card=\"summary_large_image\"."
      },
      "starterCode": "<head>\n  \n</head>",
      "solutionCode": "<head>\n  <meta property=\"og:type\" content=\"website\">\n  <meta property=\"og:title\" content=\"4TM Cloud\">\n  <meta property=\"og:description\" content=\"High performance cloud.\">\n  <meta property=\"og:url\" content=\"https://4tm.io\">\n  <meta property=\"og:image\" content=\"https://4tm.io/img/share.jpg\">\n  <meta name=\"twitter:card\" content=\"summary_large_image\">\n</head>",
      "requiredPatterns": [
        "property=\"og:type\"",
        "property=\"og:title\"",
        "property=\"og:description\"",
        "property=\"og:url\"",
        "property=\"og:image\"",
        "content=\"https://4tm.io/img/share.jpg\"",
        "name=\"twitter:card\"",
        "content=\"summary_large_image\""
      ],
      "hint": {
        "en": "Use property=\"og:*\" for Open Graph and name=\"twitter:card\" for Twitter.",
        "vi": "Dùng property=\"og:*\" cho Open Graph và name=\"twitter:card\" cho Twitter."
      }
    }
  },
  "exercisePool": [
    {
      "id": "html_ex_16_1",
      "type": "complete_code",
      "title": {
        "en": "Add Open Graph Image Dimensions",
        "vi": "Thêm kích thước chiều rộng và cao cho ảnh Open Graph"
      },
      "instruction": {
        "en": "Add og:image:width=\"1200\" and og:image:height=\"630\" meta tags.",
        "vi": "Thêm các thẻ meta og:image:width=\"1200\" và og:image:height=\"630\"."
      },
      "starterCode": "<meta property=\"og:image\" content=\"https://4tm.io/cover.jpg\">\n",
      "solutionCode": "<meta property=\"og:image\" content=\"https://4tm.io/cover.jpg\">\n<meta property=\"og:image:width\" content=\"1200\">\n<meta property=\"og:image:height\" content=\"630\">",
      "hint": {
        "en": "Use property=\"og:image:width\" and property=\"og:image:height\".",
        "vi": "Dùng property=\"og:image:width\" và property=\"og:image:height\"."
      },
      "explanation": {
        "en": "Explicit image dimensions allow social networks to render cards asynchronously on the first share attempt.",
        "vi": "Khai báo kích thước ảnh giúp mạng xã hội vẽ ngay thẻ xem trước trong lần chia sẻ đầu tiên."
      }
    },
    {
      "id": "html_ex_16_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Relative URL in og:image to Absolute HTTPS",
        "vi": "Sửa đường dẫn tương đối trong og:image thành URL tuyệt đối"
      },
      "instruction": {
        "en": "Fix the og:image content from relative \"/img/banner.png\" to absolute \"https://4tm.io/img/banner.png\".",
        "vi": "Sửa nội dung og:image từ tương đối \"/img/banner.png\" thành tuyệt đối \"https://4tm.io/img/banner.png\"."
      },
      "starterCode": "<meta property=\"og:image\" content=\"/img/banner.png\">",
      "solutionCode": "<meta property=\"og:image\" content=\"https://4tm.io/img/banner.png\">",
      "hint": {
        "en": "Use the full absolute HTTPS URL.",
        "vi": "Dùng đường dẫn tuyệt đối đầy đủ HTTPS."
      },
      "explanation": {
        "en": "Social scrapers cannot resolve relative URLs; absolute URLs are strictly required.",
        "vi": "Bot mạng xã hội không tự phân giải được URL tương đối; bắt buộc phải có URL tuyệt đối."
      }
    },
    {
      "id": "html_ex_16_3",
      "type": "write_code",
      "title": {
        "en": "Create Twitter Summary Large Image Card",
        "vi": "Tạo thẻ Twitter Card kiểu hình ảnh lớn"
      },
      "instruction": {
        "en": "Write <meta name=\"twitter:card\" content=\"summary_large_image\"> and <meta name=\"twitter:site\" content=\"@4tmEdu\">.",
        "vi": "Viết <meta name=\"twitter:card\" content=\"summary_large_image\"> và <meta name=\"twitter:site\" content=\"@4tmEdu\">."
      },
      "starterCode": "",
      "solutionCode": "<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:site\" content=\"@4tmEdu\">",
      "hint": {
        "en": "Use name=\"twitter:card\" and name=\"twitter:site\".",
        "vi": "Dùng name=\"twitter:card\" và name=\"twitter:site\"."
      },
      "explanation": {
        "en": "summary_large_image displays an expansive, eye-catching visual card on X/Twitter feeds.",
        "vi": "summary_large_image hiển thị khung ảnh xem trước khổ lớn bắt mắt trên bảng tin X/Twitter."
      }
    },
    {
      "id": "html_ex_16_4",
      "type": "modify_example",
      "title": {
        "en": "Add Schema.org JSON-LD Script Tag",
        "vi": "Thêm thẻ script JSON-LD Schema.org"
      },
      "instruction": {
        "en": "Wrap the provided JSON object inside a valid <script type=\"application/ld+json\"> tag.",
        "vi": "Bọc đối tượng JSON đã cho bên trong thẻ <script type=\"application/ld+json\"> hợp lệ."
      },
      "starterCode": "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Product\",\n  \"name\": \"Pro Wireless Mouse\"\n}",
      "solutionCode": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Product\",\n  \"name\": \"Pro Wireless Mouse\"\n}\n</script>",
      "hint": {
        "en": "Wrap with <script type=\"application/ld+json\"> and </script>.",
        "vi": "Bọc bằng thẻ <script type=\"application/ld+json\"> và </script>."
      },
      "explanation": {
        "en": "application/ld+json is the standard MIME type recognized by Google search crawlers for structured data.",
        "vi": "application/ld+json là kiểu MIME chuẩn được Google công nhận cho dữ liệu có cấu trúc."
      }
    },
    {
      "id": "html_ex_16_5",
      "type": "predict_output",
      "title": {
        "en": "Predict Optimal Aspect Ratio for Open Graph Social Share Images",
        "vi": "Dự đoán tỷ lệ khung hình chuẩn cho ảnh chia sẻ Open Graph"
      },
      "instruction": {
        "en": "What is the standard pixel dimension ratio for og:image (1200x630 or 100x100)?",
        "vi": "Kích thước chuẩn cho ảnh og:image là bao nhiêu (1200x630 hay 100x100)?"
      },
      "starterCode": "<!-- Type 1200x630 or 100x100 -->\n<p>Dimension: </p>",
      "solutionCode": "<p>Dimension: 1200x630</p>",
      "hint": {
        "en": "1200x630 represents the 1.91:1 standard aspect ratio for social cards.",
        "vi": "1200x630 là kích thước chuẩn tỷ lệ 1.91:1 cho các thẻ mạng xã hội."
      }
    }
  ],
  "challenge": {
    "id": "html_ch_16",
    "title": {
      "en": "Viral Tech Blog Article Open Graph & JSON-LD Structured Data Engine",
      "vi": "Bộ máy siêu dữ liệu Open Graph & JSON-LD cho bài viết công nghệ lan truyền"
    },
    "description": {
      "en": "Construct a complete viral sharing and search indexing metadata package for an engineering blog post including Open Graph, Twitter Card, and Schema.org BlogPosting JSON-LD.",
      "vi": "Xây dựng gói siêu dữ liệu chia sẻ mạng xã hội và lập chỉ mục tìm kiếm hoàn chỉnh cho bài viết blog kỹ thuật gồm Open Graph, Twitter Card và JSON-LD BlogPosting Schema.org."
    },
    "requirements": [
      {
        "en": "og:type=\"article\", og:site_name, og:title, og:description, og:url",
        "vi": "og:type=\"article\", og:site_name, og:title, og:description, og:url"
      },
      {
        "en": "og:image=\"https://4tm.io/img/blog-html5-1200x630.jpg\" with width=\"1200\", height=\"630\", and alt text",
        "vi": "og:image=\"https://4tm.io/img/blog-html5-1200x630.jpg\" kèm width=\"1200\", height=\"630\" và alt"
      },
      {
        "en": "twitter:card=\"summary_large_image\" with twitter:site=\"@4tmTech\"",
        "vi": "twitter:card=\"summary_large_image\" với twitter:site=\"@4tmTech\""
      },
      {
        "en": "<script type=\"application/ld+json\"> containing @context=\"https://schema.org\", @type=\"BlogPosting\", headline, author name, and publisher",
        "vi": "<script type=\"application/ld+json\"> chứa Schema.org BlogPosting"
      }
    ],
    "starterCode": "<head>\n  <!-- Build Open Graph, Twitter & JSON-LD here -->\n</head>",
    "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>Architecting High-Performance HTML5 Applications | 4TM Tech</title>\n  \n  <!-- Open Graph Metadata -->\n  <meta property=\"og:site_name\" content=\"4TM Engineering Blog\">\n  <meta property=\"og:type\" content=\"article\">\n  <meta property=\"og:title\" content=\"Architecting High-Performance HTML5 Applications\">\n  <meta property=\"og:description\" content=\"In-depth guide to modern HTML5 semantics, resource hints, accessible forms, and responsive visual pipelines.\">\n  <meta property=\"og:url\" content=\"https://4tm.io/blog/html5-performance\">\n  <meta property=\"og:image\" content=\"https://4tm.io/img/blog-html5-1200x630.jpg\">\n  <meta property=\"og:image:width\" content=\"1200\">\n  <meta property=\"og:image:height\" content=\"630\">\n  <meta property=\"og:image:alt\" content=\"HTML5 Performance Architecture Diagram\">\n\n  <!-- Twitter Card Metadata -->\n  <meta name=\"twitter:card\" content=\"summary_large_image\">\n  <meta name=\"twitter:site\" content=\"@4tmTech\">\n  <meta name=\"twitter:creator\" content=\"@4tmLeadArchitect\">\n\n  <!-- JSON-LD Structured Data -->\n  <script type=\"application/ld+json\">\n  {\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"BlogPosting\",\n    \"headline\": \"Architecting High-Performance HTML5 Applications\",\n    \"description\": \"In-depth guide to modern HTML5 semantics, resource hints, accessible forms, and responsive visual pipelines.\",\n    \"image\": \"https://4tm.io/img/blog-html5-1200x630.jpg\",\n    \"author\": {\n      \"@type\": \"Person\",\n      \"name\": \"Alex Nguyen\"\n    },\n    \"publisher\": {\n      \"@type\": \"Organization\",\n      \"name\": \"4TM Technologies\",\n      \"logo\": {\n        \"@type\": \"ImageObject\",\n        \"url\": \"https://4tm.io/logo.png\"\n      }\n    }\n  }\n  </script>\n</head>",
    "hints": [
      {
        "en": "Ensure property=\"og:*\" is used for Open Graph and name=\"twitter:*\" for Twitter",
        "vi": "Đảm bảo dùng property=\"og:*\" cho Open Graph và name=\"twitter:*\" cho Twitter"
      },
      {
        "en": "Validate that JSON-LD is valid JSON format inside script type=\"application/ld+json\"",
        "vi": "Kiểm tra cú pháp JSON hợp lệ bên trong thẻ script"
      }
    ],
    "solutionExplanation": {
      "en": "Enterprise social distribution and rich Google SERP snippet integration.",
      "vi": "Tích hợp toàn diện phân phối mạng xã hội và đoạn trích hiển thị mở rộng trên Google."
    },
    "variants": [
      {
        "id": "html_ch_16_v1",
        "title": {
          "en": "Variant 1: E-Commerce Product Schema.org with Price & InStock Availability",
          "vi": "Biến thể 1: Dữ liệu sản phẩm Schema.org kèm giá tiền và tình trạng còn hàng"
        },
        "description": {
          "en": "Build a Product JSON-LD structured data block with price, currency, and ItemAvailability.",
          "vi": "Xây dựng khối dữ liệu có cấu trúc Product JSON-LD có giá bán, loại tiền và tình trạng hàng."
        },
        "requirements": [
          {
            "en": "\"@type\": \"Product\", \"name\": \"Mechanical Keyboard\"",
            "vi": "\"@type\": \"Product\", \"name\": \"Mechanical Keyboard\""
          },
          {
            "en": "\"offers\": { \"@type\": \"Offer\", \"price\": \"149.00\", \"priceCurrency\": \"USD\", \"availability\": \"https://schema.org/InStock\" }",
            "vi": "\"offers\": { \"@type\": \"Offer\", \"price\": \"149.00\", \"priceCurrency\": \"USD\", \"availability\": \"https://schema.org/InStock\" }"
          }
        ],
        "starterCode": "<script type=\"application/ld+json\">\n  \n</script>",
        "solutionCode": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Product\",\n  \"name\": \"Mechanical Keyboard Pro\",\n  \"image\": \"https://4tm.io/img/keyboard.jpg\",\n  \"description\": \"Ergonomic mechanical keyboard with hot-swappable switches.\",\n  \"offers\": {\n    \"@type\": \"Offer\",\n    \"price\": \"149.00\",\n    \"priceCurrency\": \"USD\",\n    \"availability\": \"https://schema.org/InStock\",\n    \"url\": \"https://4tm.io/store/keyboard\"\n  }\n}\n</script>",
        "hints": [
          {
            "en": "Review the challenge requirements carefully.",
            "vi": "Đọc kỹ các yêu cầu của thử thách."
          }
        ],
        "solutionExplanation": {
          "en": "Product structured data unlocks rich pricing badges and in-stock badges directly in Google search.",
          "vi": "Dữ liệu sản phẩm hiển thị giá tiền và huy hiệu còn hàng trực tiếp trên kết quả tìm kiếm Google."
        }
      },
      {
        "id": "html_ch_16_v2",
        "title": {
          "en": "Variant 2: VideoObject Schema.org for Video Search Carousel",
          "vi": "Biến thể 2: Dữ liệu VideoObject Schema.org cho danh sách video Google"
        },
        "description": {
          "en": "Build a VideoObject JSON-LD block with name, description, thumbnailUrl, uploadDate, and contentUrl.",
          "vi": "Xây dựng khối VideoObject JSON-LD có tên, mô tả, ảnh thu nhỏ, ngày đăng và đường dẫn xem video."
        },
        "requirements": [
          {
            "en": "\"@type\": \"VideoObject\"",
            "vi": "\"@type\": \"VideoObject\""
          },
          {
            "en": "thumbnailUrl, uploadDate (ISO 8601), and contentUrl",
            "vi": "thumbnailUrl, uploadDate (ISO 8601), và contentUrl"
          }
        ],
        "starterCode": "<script type=\"application/ld+json\">\n  \n</script>",
        "solutionCode": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"VideoObject\",\n  \"name\": \"HTML5 Canvas Masterclass\",\n  \"description\": \"Learn 2D graphics programming in modern HTML5.\",\n  \"thumbnailUrl\": \"https://4tm.io/thumb.jpg\",\n  \"uploadDate\": \"2026-08-28T08:00:00+00:00\",\n  \"contentUrl\": \"https://4tm.io/video/canvas.mp4\"\n}\n</script>",
        "hints": [
          {
            "en": "Review the challenge requirements carefully.",
            "vi": "Đọc kỹ các yêu cầu của thử thách."
          }
        ],
        "solutionExplanation": {
          "en": "VideoObject metadata enables Google to index video key moments and visual video carousels.",
          "vi": "Dữ liệu VideoObject cho phép Google lập chỉ mục các phân đoạn chính và băng chuyền video."
        }
      }
    ]
  },
  "challengePool": [
    {
      "id": "html_ch_16",
      "title": {
        "en": "Viral Tech Blog Article Open Graph & JSON-LD Structured Data Engine",
        "vi": "Bộ máy siêu dữ liệu Open Graph & JSON-LD cho bài viết công nghệ lan truyền"
      },
      "description": {
        "en": "Construct a complete viral sharing and search indexing metadata package for an engineering blog post including Open Graph, Twitter Card, and Schema.org BlogPosting JSON-LD.",
        "vi": "Xây dựng gói siêu dữ liệu chia sẻ mạng xã hội và lập chỉ mục tìm kiếm hoàn chỉnh cho bài viết blog kỹ thuật gồm Open Graph, Twitter Card và JSON-LD BlogPosting Schema.org."
      },
      "requirements": [
        {
          "en": "og:type=\"article\", og:site_name, og:title, og:description, og:url",
          "vi": "og:type=\"article\", og:site_name, og:title, og:description, og:url"
        },
        {
          "en": "og:image=\"https://4tm.io/img/blog-html5-1200x630.jpg\" with width=\"1200\", height=\"630\", and alt text",
          "vi": "og:image=\"https://4tm.io/img/blog-html5-1200x630.jpg\" kèm width=\"1200\", height=\"630\" và alt"
        },
        {
          "en": "twitter:card=\"summary_large_image\" with twitter:site=\"@4tmTech\"",
          "vi": "twitter:card=\"summary_large_image\" với twitter:site=\"@4tmTech\""
        },
        {
          "en": "<script type=\"application/ld+json\"> containing @context=\"https://schema.org\", @type=\"BlogPosting\", headline, author name, and publisher",
          "vi": "<script type=\"application/ld+json\"> chứa Schema.org BlogPosting"
        }
      ],
      "starterCode": "<head>\n  <!-- Build Open Graph, Twitter & JSON-LD here -->\n</head>",
      "solutionCode": "<head>\n  <meta charset=\"utf-8\">\n  <title>Architecting High-Performance HTML5 Applications | 4TM Tech</title>\n  \n  <!-- Open Graph Metadata -->\n  <meta property=\"og:site_name\" content=\"4TM Engineering Blog\">\n  <meta property=\"og:type\" content=\"article\">\n  <meta property=\"og:title\" content=\"Architecting High-Performance HTML5 Applications\">\n  <meta property=\"og:description\" content=\"In-depth guide to modern HTML5 semantics, resource hints, accessible forms, and responsive visual pipelines.\">\n  <meta property=\"og:url\" content=\"https://4tm.io/blog/html5-performance\">\n  <meta property=\"og:image\" content=\"https://4tm.io/img/blog-html5-1200x630.jpg\">\n  <meta property=\"og:image:width\" content=\"1200\">\n  <meta property=\"og:image:height\" content=\"630\">\n  <meta property=\"og:image:alt\" content=\"HTML5 Performance Architecture Diagram\">\n\n  <!-- Twitter Card Metadata -->\n  <meta name=\"twitter:card\" content=\"summary_large_image\">\n  <meta name=\"twitter:site\" content=\"@4tmTech\">\n  <meta name=\"twitter:creator\" content=\"@4tmLeadArchitect\">\n\n  <!-- JSON-LD Structured Data -->\n  <script type=\"application/ld+json\">\n  {\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"BlogPosting\",\n    \"headline\": \"Architecting High-Performance HTML5 Applications\",\n    \"description\": \"In-depth guide to modern HTML5 semantics, resource hints, accessible forms, and responsive visual pipelines.\",\n    \"image\": \"https://4tm.io/img/blog-html5-1200x630.jpg\",\n    \"author\": {\n      \"@type\": \"Person\",\n      \"name\": \"Alex Nguyen\"\n    },\n    \"publisher\": {\n      \"@type\": \"Organization\",\n      \"name\": \"4TM Technologies\",\n      \"logo\": {\n        \"@type\": \"ImageObject\",\n        \"url\": \"https://4tm.io/logo.png\"\n      }\n    }\n  }\n  </script>\n</head>",
      "hints": [
        {
          "en": "Ensure property=\"og:*\" is used for Open Graph and name=\"twitter:*\" for Twitter",
          "vi": "Đảm bảo dùng property=\"og:*\" cho Open Graph và name=\"twitter:*\" cho Twitter"
        },
        {
          "en": "Validate that JSON-LD is valid JSON format inside script type=\"application/ld+json\"",
          "vi": "Kiểm tra cú pháp JSON hợp lệ bên trong thẻ script"
        }
      ],
      "solutionExplanation": {
        "en": "Enterprise social distribution and rich Google SERP snippet integration.",
        "vi": "Tích hợp toàn diện phân phối mạng xã hội và đoạn trích hiển thị mở rộng trên Google."
      },
      "variants": [
        {
          "id": "html_ch_16_v1",
          "title": {
            "en": "Variant 1: E-Commerce Product Schema.org with Price & InStock Availability",
            "vi": "Biến thể 1: Dữ liệu sản phẩm Schema.org kèm giá tiền và tình trạng còn hàng"
          },
          "description": {
            "en": "Build a Product JSON-LD structured data block with price, currency, and ItemAvailability.",
            "vi": "Xây dựng khối dữ liệu có cấu trúc Product JSON-LD có giá bán, loại tiền và tình trạng hàng."
          },
          "requirements": [
            {
              "en": "\"@type\": \"Product\", \"name\": \"Mechanical Keyboard\"",
              "vi": "\"@type\": \"Product\", \"name\": \"Mechanical Keyboard\""
            },
            {
              "en": "\"offers\": { \"@type\": \"Offer\", \"price\": \"149.00\", \"priceCurrency\": \"USD\", \"availability\": \"https://schema.org/InStock\" }",
              "vi": "\"offers\": { \"@type\": \"Offer\", \"price\": \"149.00\", \"priceCurrency\": \"USD\", \"availability\": \"https://schema.org/InStock\" }"
            }
          ],
          "starterCode": "<script type=\"application/ld+json\">\n  \n</script>",
          "solutionCode": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Product\",\n  \"name\": \"Mechanical Keyboard Pro\",\n  \"image\": \"https://4tm.io/img/keyboard.jpg\",\n  \"description\": \"Ergonomic mechanical keyboard with hot-swappable switches.\",\n  \"offers\": {\n    \"@type\": \"Offer\",\n    \"price\": \"149.00\",\n    \"priceCurrency\": \"USD\",\n    \"availability\": \"https://schema.org/InStock\",\n    \"url\": \"https://4tm.io/store/keyboard\"\n  }\n}\n</script>",
          "hints": [
            {
              "en": "Review the challenge requirements carefully.",
              "vi": "Đọc kỹ các yêu cầu của thử thách."
            }
          ],
          "solutionExplanation": {
            "en": "Product structured data unlocks rich pricing badges and in-stock badges directly in Google search.",
            "vi": "Dữ liệu sản phẩm hiển thị giá tiền và huy hiệu còn hàng trực tiếp trên kết quả tìm kiếm Google."
          }
        },
        {
          "id": "html_ch_16_v2",
          "title": {
            "en": "Variant 2: VideoObject Schema.org for Video Search Carousel",
            "vi": "Biến thể 2: Dữ liệu VideoObject Schema.org cho danh sách video Google"
          },
          "description": {
            "en": "Build a VideoObject JSON-LD block with name, description, thumbnailUrl, uploadDate, and contentUrl.",
            "vi": "Xây dựng khối VideoObject JSON-LD có tên, mô tả, ảnh thu nhỏ, ngày đăng và đường dẫn xem video."
          },
          "requirements": [
            {
              "en": "\"@type\": \"VideoObject\"",
              "vi": "\"@type\": \"VideoObject\""
            },
            {
              "en": "thumbnailUrl, uploadDate (ISO 8601), and contentUrl",
              "vi": "thumbnailUrl, uploadDate (ISO 8601), và contentUrl"
            }
          ],
          "starterCode": "<script type=\"application/ld+json\">\n  \n</script>",
          "solutionCode": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"VideoObject\",\n  \"name\": \"HTML5 Canvas Masterclass\",\n  \"description\": \"Learn 2D graphics programming in modern HTML5.\",\n  \"thumbnailUrl\": \"https://4tm.io/thumb.jpg\",\n  \"uploadDate\": \"2026-08-28T08:00:00+00:00\",\n  \"contentUrl\": \"https://4tm.io/video/canvas.mp4\"\n}\n</script>",
          "hints": [
            {
              "en": "Review the challenge requirements carefully.",
              "vi": "Đọc kỹ các yêu cầu của thử thách."
            }
          ],
          "solutionExplanation": {
            "en": "VideoObject metadata enables Google to index video key moments and visual video carousels.",
            "vi": "Dữ liệu VideoObject cho phép Google lập chỉ mục các phân đoạn chính và băng chuyền video."
          }
        }
      ]
    },
    {
      "id": "html_ch_16_v1",
      "title": {
        "en": "Variant 1: E-Commerce Product Schema.org with Price & InStock Availability",
        "vi": "Biến thể 1: Dữ liệu sản phẩm Schema.org kèm giá tiền và tình trạng còn hàng"
      },
      "description": {
        "en": "Build a Product JSON-LD structured data block with price, currency, and ItemAvailability.",
        "vi": "Xây dựng khối dữ liệu có cấu trúc Product JSON-LD có giá bán, loại tiền và tình trạng hàng."
      },
      "requirements": [
        {
          "en": "\"@type\": \"Product\", \"name\": \"Mechanical Keyboard\"",
          "vi": "\"@type\": \"Product\", \"name\": \"Mechanical Keyboard\""
        },
        {
          "en": "\"offers\": { \"@type\": \"Offer\", \"price\": \"149.00\", \"priceCurrency\": \"USD\", \"availability\": \"https://schema.org/InStock\" }",
          "vi": "\"offers\": { \"@type\": \"Offer\", \"price\": \"149.00\", \"priceCurrency\": \"USD\", \"availability\": \"https://schema.org/InStock\" }"
        }
      ],
      "starterCode": "<script type=\"application/ld+json\">\n  \n</script>",
      "solutionCode": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Product\",\n  \"name\": \"Mechanical Keyboard Pro\",\n  \"image\": \"https://4tm.io/img/keyboard.jpg\",\n  \"description\": \"Ergonomic mechanical keyboard with hot-swappable switches.\",\n  \"offers\": {\n    \"@type\": \"Offer\",\n    \"price\": \"149.00\",\n    \"priceCurrency\": \"USD\",\n    \"availability\": \"https://schema.org/InStock\",\n    \"url\": \"https://4tm.io/store/keyboard\"\n  }\n}\n</script>",
      "hints": [
        {
          "en": "Review the challenge requirements carefully.",
          "vi": "Đọc kỹ các yêu cầu của thử thách."
        }
      ],
      "solutionExplanation": {
        "en": "Product structured data unlocks rich pricing badges and in-stock badges directly in Google search.",
        "vi": "Dữ liệu sản phẩm hiển thị giá tiền và huy hiệu còn hàng trực tiếp trên kết quả tìm kiếm Google."
      }
    },
    {
      "id": "html_ch_16_v2",
      "title": {
        "en": "Variant 2: VideoObject Schema.org for Video Search Carousel",
        "vi": "Biến thể 2: Dữ liệu VideoObject Schema.org cho danh sách video Google"
      },
      "description": {
        "en": "Build a VideoObject JSON-LD block with name, description, thumbnailUrl, uploadDate, and contentUrl.",
        "vi": "Xây dựng khối VideoObject JSON-LD có tên, mô tả, ảnh thu nhỏ, ngày đăng và đường dẫn xem video."
      },
      "requirements": [
        {
          "en": "\"@type\": \"VideoObject\"",
          "vi": "\"@type\": \"VideoObject\""
        },
        {
          "en": "thumbnailUrl, uploadDate (ISO 8601), and contentUrl",
          "vi": "thumbnailUrl, uploadDate (ISO 8601), và contentUrl"
        }
      ],
      "starterCode": "<script type=\"application/ld+json\">\n  \n</script>",
      "solutionCode": "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"VideoObject\",\n  \"name\": \"HTML5 Canvas Masterclass\",\n  \"description\": \"Learn 2D graphics programming in modern HTML5.\",\n  \"thumbnailUrl\": \"https://4tm.io/thumb.jpg\",\n  \"uploadDate\": \"2026-08-28T08:00:00+00:00\",\n  \"contentUrl\": \"https://4tm.io/video/canvas.mp4\"\n}\n</script>",
      "hints": [
        {
          "en": "Review the challenge requirements carefully.",
          "vi": "Đọc kỹ các yêu cầu của thử thách."
        }
      ],
      "solutionExplanation": {
        "en": "VideoObject metadata enables Google to index video key moments and visual video carousels.",
        "vi": "Dữ liệu VideoObject cho phép Google lập chỉ mục các phân đoạn chính và băng chuyền video."
      }
    }
  ],
  "quizQuestionPool": [
    {
      "id": "html_q_16_1",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of the Open Graph Protocol (OGP)?",
        "vi": "Mục đích của Giao thức Open Graph (OGP) là gì?"
      },
      "options": [
        {
          "en": "Enables any web page to become a rich graph object in social networks (Facebook, LinkedIn, Discord, Telegram), controlling preview titles, descriptions, and images",
          "vi": "Cho phép mọi trang web trở thành đối tượng phong phú trên mạng xã hội (Facebook, LinkedIn, Discord, Telegram), kiểm soát tiêu đề, mô tả và ảnh xem trước"
        },
        {
          "en": "Draws 3D bar graphs on a web canvas",
          "vi": "Vẽ biểu đồ cột 3D trên canvas"
        },
        {
          "en": "Opens the operating system file manager",
          "vi": "Mở trình quản lý tệp tin của máy tính"
        },
        {
          "en": "Converts HTML into graphic design files",
          "vi": "Chuyển mã HTML thành file đồ họa"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Open Graph standardizes rich preview metadata across major social communication platforms.",
        "vi": "Open Graph chuẩn hóa siêu dữ liệu xem trước trên các nền tảng mạng xã hội và ứng dụng chat."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_2",
      "type": "single_choice",
      "question": {
        "en": "What HTML attribute distinguishes Open Graph meta tags from standard meta tags?",
        "vi": "Thuộc tính HTML nào phân biệt thẻ meta Open Graph với thẻ meta thông thường?"
      },
      "options": [
        {
          "en": "property=\"og:*\" (e.g. property=\"og:title\")",
          "vi": "property=\"og:*\" (như property=\"og:title\")"
        },
        {
          "en": "name=\"og:*\"",
          "vi": "name=\"og:*\""
        },
        {
          "en": "type=\"og:*\"",
          "vi": "type=\"og:*\""
        },
        {
          "en": "graph=\"og:*\"",
          "vi": "graph=\"og:*\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Open Graph specification mandates the RDFa property attribute (property=\"og:*\").",
        "vi": "Đặc tả Open Graph quy định sử dụng thuộc tính RDFa property (property=\"og:*\")."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_3",
      "type": "single_choice",
      "question": {
        "en": "Why must the og:image content URL always be an absolute HTTPS URL instead of a relative path?",
        "vi": "Tại sao URL trong og:image bắt buộc phải là đường dẫn tuyệt đối HTTPS thay vì đường dẫn tương đối?"
      },
      "options": [
        {
          "en": "External social crawlers (Facebook bot, Twitterbot) cannot resolve relative paths against host origins when scraping your page from external servers",
          "vi": "Bot quét mạng xã hội ngoài (Facebook, Twitter) không thể tự ghép đường dẫn tương đối khi cào dữ liệu từ máy chủ độc lập của họ"
        },
        {
          "en": "Relative paths are illegal in HTML5",
          "vi": "Đường dẫn tương đối bị cấm trong HTML5"
        },
        {
          "en": "HTTPS images load 100x faster",
          "vi": "Ảnh HTTPS tải nhanh gấp 100 lần"
        },
        {
          "en": "To prevent users from right-clicking the image",
          "vi": "Để ngăn người dùng nhấp chuột phải lưu ảnh"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Social scrapers run on remote servers and require fully qualified absolute URLs.",
        "vi": "Bot cào dữ liệu mạng xã hội chạy trên máy chủ từ xa và bắt buộc cần URL tuyệt đối đầy đủ."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_4",
      "type": "single_choice",
      "question": {
        "en": "What is the recommended standard resolution and aspect ratio for og:image?",
        "vi": "Độ phân giải và tỷ lệ khung hình tiêu chuẩn khuyến nghị cho ảnh og:image là gì?"
      },
      "options": [
        {
          "en": "1200 x 630 pixels (1.91:1 aspect ratio)",
          "vi": "1200 x 630 pixel (tỷ lệ khung hình 1.91:1)"
        },
        {
          "en": "100 x 100 pixels (1:1 square)",
          "vi": "100 x 100 pixel (hình vuông 1:1)"
        },
        {
          "en": "1920 x 1080 pixels (16:9 widescreen)",
          "vi": "1920 x 1080 pixel (màn ảnh rộng 16:9)"
        },
        {
          "en": "500 x 1000 pixels (vertical banner)",
          "vi": "500 x 1000 pixel (banner dọc)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "1200x630px provides high-DPI clarity on Retina devices across Facebook, LinkedIn, Discord, and X.",
        "vi": "1200x630px mang lại độ sắc nét cao trên màn hình Retina trên Facebook, LinkedIn, Discord và X."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_5",
      "type": "single_choice",
      "question": {
        "en": "What value of <meta name=\"twitter:card\"> displays a prominent, full-width hero image preview on X (Twitter)?",
        "vi": "Giá trị nào của <meta name=\"twitter:card\"> hiển thị khung ảnh xem trước toàn khổ lớn nổi bật trên X (Twitter)?"
      },
      "options": [
        {
          "en": "content=\"summary_large_image\"",
          "vi": "content=\"summary_large_image\""
        },
        {
          "en": "content=\"summary\"",
          "vi": "content=\"summary\""
        },
        {
          "en": "content=\"photo_big\"",
          "vi": "content=\"photo_big\""
        },
        {
          "en": "content=\"player_fullscreen\"",
          "vi": "content=\"player_fullscreen\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "summary_large_image creates full-width visual hero cards on Twitter/X.",
        "vi": "summary_large_image tạo thẻ xem trước toàn chiều rộng nổi bật trên Twitter/X."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_6",
      "type": "single_choice",
      "question": {
        "en": "What is JSON-LD (JavaScript Object Notation for Linked Data)?",
        "vi": "JSON-LD (Ký hiệu đối tượng JavaScript cho dữ liệu liên kết) là gì?"
      },
      "options": [
        {
          "en": "A lightweight Linked Data format embedded inside <script type=\"application/ld+json\"> to describe structured Schema.org entities to search engines",
          "vi": "Định dạng dữ liệu liên kết gọn nhẹ nhúng trong <script type=\"application/ld+json\"> để mô tả các thực thể Schema.org cho công cụ tìm kiếm"
        },
        {
          "en": "A JavaScript library that replaces React",
          "vi": "Một thư viện JavaScript thay thế React"
        },
        {
          "en": "A database query language for MongoDB",
          "vi": "Một ngôn ngữ truy vấn cho MongoDB"
        },
        {
          "en": "An encryption algorithm for JSON files",
          "vi": "Một thuật toán mã hóa cho file JSON"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "JSON-LD is Google's officially recommended format for Schema.org structured data.",
        "vi": "JSON-LD là định dạng được Google chính thức khuyến nghị cho dữ liệu có cấu trúc Schema.org."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_7",
      "type": "single_choice",
      "question": {
        "en": "What Google search feature is enabled by adding valid Schema.org structured data?",
        "vi": "Tính năng tìm kiếm nào của Google được kích hoạt khi thêm dữ liệu có cấu trúc Schema.org hợp lệ?"
      },
      "options": [
        {
          "en": "Rich Results (Rich Snippets: star ratings, recipe cooking times, product prices, breadcrumb trails, FAQ accordions)",
          "vi": "Kết quả tìm kiếm mở rộng (Rich Snippets: đánh giá sao, thời gian nấu ăn, giá sản phẩm, breadcrumb, câu hỏi thường gặp)"
        },
        {
          "en": "Guaranteed #1 organic ranking on Google for all keywords",
          "vi": "Cam kết đứng top 1 Google cho mọi từ khóa"
        },
        {
          "en": "Free Google Ads advertising credits",
          "vi": "Tặng tiền chạy quảng cáo Google Ads miễn phí"
        },
        {
          "en": "Automatic translation into 100 languages",
          "vi": "Tự động dịch sang 100 thứ tiếng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Structured data enables rich visual enhancements on Google Search Results Pages (SERPs).",
        "vi": "Dữ liệu có cấu trúc kích hoạt các tiện ích bổ sung trực quan phong phú trên trang kết quả tìm kiếm Google."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_8",
      "type": "single_choice",
      "question": {
        "en": "Why should you include og:image:width and og:image:height meta tags?",
        "vi": "Tại sao bạn nên khai báo thêm các thẻ meta og:image:width và og:image:height?"
      },
      "options": [
        {
          "en": "It allows social crawlers to immediately render the preview card on the very first share without waiting to download and inspect the image file dimensions",
          "vi": "Giúp bot mạng xã hội vẽ ngay thẻ xem trước trong lần chia sẻ đầu tiên mà không phải đợi tải và đọc kích thước tệp ảnh"
        },
        {
          "en": "It crops the image automatically using CSS",
          "vi": "Nó tự cắt ảnh bằng CSS"
        },
        {
          "en": "It compresses the image file size",
          "vi": "Nó nén dung lượng file ảnh"
        },
        {
          "en": "It is required to change image brightness",
          "vi": "Bắt buộc để chỉnh độ sáng của ảnh"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Explicit image dimensions eliminate crawler pre-download delays on initial link sharing.",
        "vi": "Khai báo kích thước rõ ràng giúp loại bỏ độ trễ tải ảnh của bot khi chia sẻ link lần đầu."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_9",
      "type": "single_choice",
      "question": {
        "en": "What property specifies the social card preview title in Open Graph?",
        "vi": "Thuộc tính nào chỉ định tiêu đề xem trước trên thẻ mạng xã hội trong Open Graph?"
      },
      "options": [
        {
          "en": "property=\"og:title\"",
          "vi": "property=\"og:title\""
        },
        {
          "en": "name=\"social-title\"",
          "vi": "name=\"social-title\""
        },
        {
          "en": "property=\"card:headline\"",
          "vi": "property=\"card:headline\""
        },
        {
          "en": "meta=\"graph-name\"",
          "vi": "meta=\"graph-name\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "og:title defines the title presented in social cards.",
        "vi": "og:title định nghĩa tiêu đề hiển thị trên các thẻ chia sẻ mạng xã hội."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_10",
      "type": "single_choice",
      "question": {
        "en": "What is the root property required in every Schema.org JSON-LD object to define vocabulary context?",
        "vi": "Thuộc tính gốc bắt buộc phải có trong mọi đối tượng JSON-LD Schema.org để xác định ngữ cảnh từ điển là gì?"
      },
      "options": [
        {
          "en": "\"@context\": \"https://schema.org\"",
          "vi": "\"@context\": \"https://schema.org\""
        },
        {
          "en": "\"schema\": \"standard\"",
          "vi": "\"schema\": \"standard\""
        },
        {
          "en": "\"vocabulary\": \"google\"",
          "vi": "\"vocabulary\": \"google\""
        },
        {
          "en": "\"type\": \"ld-json\"",
          "vi": "\"type\": \"ld-json\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "@context links the JSON keys to the official Schema.org semantic vocabulary.",
        "vi": "@context liên kết các khóa JSON với từ điển ngữ nghĩa chính thức của Schema.org."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_11",
      "type": "single_choice",
      "question": {
        "en": "Can Open Graph metadata differ from the visible on-page <title> and <h1> text?",
        "vi": "Siêu dữ liệu Open Graph có thể khác với nội dung <title> và thẻ <h1> hiển thị trên trang không?"
      },
      "options": [
        {
          "en": "Yes, og:title can be optimized specifically for social media engagement and click-throughs, while <title> is optimized for search SEO keywords",
          "vi": "Có, og:title có thể được tối ưu riêng để tăng tương tác trên mạng xã hội, trong khi <title> tối ưu từ khóa cho công cụ tìm kiếm"
        },
        {
          "en": "No, having different titles results in a severe HTML syntax error",
          "vi": "Không, nếu khác nhau sẽ bị báo lỗi cú pháp HTML"
        },
        {
          "en": "Only if authorized by Facebook support",
          "vi": "Chỉ khi được sự cho phép của Facebook"
        },
        {
          "en": "Only on WordPress websites",
          "vi": "Chỉ trên các website WordPress"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Tailoring social titles separately from search titles is a common high-performance growth strategy.",
        "vi": "Tối ưu tiêu đề mạng xã hội riêng biệt với tiêu đề tìm kiếm là chiến lược tăng trưởng hiệu quả."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_12",
      "type": "single_choice",
      "question": {
        "en": "What does og:type=\"article\" signal to social platforms?",
        "vi": "Thuộc tính og:type=\"article\" báo hiệu điều gì cho các nền tảng mạng xã hội?"
      },
      "options": [
        {
          "en": "Indicates the content is an editorial blog post, news story, or article (enabling author and publication date metadata)",
          "vi": "Cho biết nội dung là một bài viết blog, tin tức hoặc bài báo (cho phép gắn tên tác giả và ngày xuất bản)"
        },
        {
          "en": "Converts the webpage into a downloadable PDF",
          "vi": "Chuyển trang web thành tệp PDF"
        },
        {
          "en": "Translates the article into French",
          "vi": "Dịch bài viết sang tiếng Pháp"
        },
        {
          "en": "Charges users $1 to read the article",
          "vi": "Thu phí người đọc 1 đô la"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "og:type=\"article\" denotes episodic content and unlocks article:published_time and article:author tags.",
        "vi": "og:type=\"article\" đại diện cho bài viết và mở khóa các thẻ thời gian đăng và tác giả."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_13",
      "type": "single_choice",
      "question": {
        "en": "What tool can developers use to inspect and validate their Open Graph social previews before sharing publicly?",
        "vi": "Lập trình viên có thể dùng công cụ nào để kiểm tra và xác thực thẻ xem trước Open Graph trước khi chia sẻ công khai?"
      },
      "options": [
        {
          "en": "Facebook Sharing Debugger, Twitter Card Validator, and LinkedIn Post Inspector",
          "vi": "Facebook Sharing Debugger, Twitter Card Validator, và LinkedIn Post Inspector"
        },
        {
          "en": "Photoshop Crop Tool",
          "vi": "Công cụ cắt ảnh Photoshop"
        },
        {
          "en": "Windows Notepad",
          "vi": "Trình soạn thảo Windows Notepad"
        },
        {
          "en": "Google Chrome Bookmark Manager",
          "vi": "Trình quản lý Bookmark của Google Chrome"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Social debuggers parse live URLs, report metadata errors, and clear remote CDN caches.",
        "vi": "Các công cụ gỡ lỗi mạng xã hội phân tích URL, báo lỗi thẻ meta và xóa bộ nhớ đệm CDN."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_14",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of <meta property=\"og:image:alt\" content=\"...\">?",
        "vi": "Mục đích của thẻ <meta property=\"og:image:alt\" content=\"...\"> là gì?"
      },
      "options": [
        {
          "en": "Provides accessible alternative text describing the social share image for visually impaired users on social media platforms",
          "vi": "Cung cấp văn bản thay thế mô tả ảnh chia sẻ mạng xã hội cho người khiếm thị sử dụng trình đọc màn hình"
        },
        {
          "en": "Draws a border around the preview image",
          "vi": "Vẽ khung viền quanh ảnh xem trước"
        },
        {
          "en": "Loads an alternate image if the first image fails",
          "vi": "Tải ảnh thay thế nếu ảnh đầu bị lỗi"
        },
        {
          "en": "Forces the image to be black and white",
          "vi": "Ép ảnh sang màu đen trắng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "og:image:alt improves accessibility for social feed image attachments.",
        "vi": "og:image:alt nâng cao tính trợ năng cho các ảnh đính kèm trên bảng tin mạng xã hội."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_15",
      "type": "single_choice",
      "question": {
        "en": "Can multiple Schema.org JSON-LD scripts exist on the same webpage?",
        "vi": "Nhiều khối thẻ script Schema.org JSON-LD có thể cùng tồn tại trên một trang web không?"
      },
      "options": [
        {
          "en": "Yes, you can have multiple JSON-LD scripts (or an array in @graph) describing the Organization, Breadcrumbs, and Article simultaneously",
          "vi": "Có, bạn có thể đặt nhiều thẻ JSON-LD (hoặc một mảng trong @graph) cùng lúc mô tả Tổ chức, Breadcrumb và Bài viết"
        },
        {
          "en": "No, only one script is permitted per domain",
          "vi": "Không, mỗi tên miền chỉ được phép có 1 thẻ script"
        },
        {
          "en": "Only on websites with HTTPS",
          "vi": "Chỉ trên website có HTTPS"
        },
        {
          "en": "Only if written in TypeScript",
          "vi": "Chỉ khi viết bằng TypeScript"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Google parses multiple JSON-LD scripts on a single page or consolidated via @graph structures.",
        "vi": "Google phân tích cú pháp nhiều khối JSON-LD trên cùng một trang hoặc gom lại qua cấu trúc @graph."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    },
    {
      "id": "html_q_16_16",
      "type": "single_choice",
      "question": {
        "en": "What official Google tool tests structured data for syntax correctness and rich snippet eligibility?",
        "vi": "Công cụ chính thức nào của Google dùng để kiểm tra tính đúng đắn và đủ điều kiện hiển thị rich snippet của dữ liệu có cấu trúc?"
      },
      "options": [
        {
          "en": "Google Rich Results Test (and Schema Markup Validator)",
          "vi": "Công cụ Kiểm tra kết quả nhiều định dạng của Google (Rich Results Test)"
        },
        {
          "en": "Google Chrome Dinosaur Game",
          "vi": "Trò chơi khủng long Google Dinosaur"
        },
        {
          "en": "Google Maps Street View",
          "vi": "Google Maps Street View"
        },
        {
          "en": "Google Drive File Uploader",
          "vi": "Trình tải tệp Google Drive"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Google Rich Results Test validates Schema.org JSON-LD against Google search feature guidelines.",
        "vi": "Google Rich Results Test kiểm tra tính hợp lệ của JSON-LD đối chiếu với quy chuẩn của Google Tìm kiếm."
      },
      "topicId": "html_open_graph_social",
      "difficulty": "medium"
    }
  ]
};

export default lesson18;
