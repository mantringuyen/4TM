import { Lesson } from '../../../../types';

export const lesson01: Lesson = {
  "id": "html_lesson_1",
  "moduleId": "html_mod_1",
  "levelId": "basic",
  "courseId": "html",
  "order": 1,
  "topicId": "html_structure",
  "title": {
    "en": "HTML5 Document Structure, DOCTYPE & Page Skeleton",
    "vi": "Cấu Trúc Tài Liệu HTML5, Khai Báo DOCTYPE & Khung Trang"
  },
  "summary": {
    "en": "Master standard HTML5 document anatomy: <!DOCTYPE html>, <html> with lang, <head> metadata with viewport and charset, and the visible <body> skeleton.",
    "vi": "Làm chủ cấu trúc giải phẫu tài liệu HTML5: <!DOCTYPE html>, <html> kèm lang, siêu dữ liệu <head> với viewport, charset và khung hiển thị <body>."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "HTML (HyperText Markup Language) is the universal structural backbone of every website on the internet. HTML5 introduces a clean, standardized document structure that ensures cross-browser compatibility and accessible rendering.",
      "vi": "HTML (HyperText Markup Language) là ngôn ngữ đánh dấu tiêu chuẩn để xây dựng trang web. HTML5 mang đến cấu trúc tài liệu gọn gàng, tương thích cao trên mọi trình duyệt và tối ưu cho các công nghệ trợ năng."
    },
    "conceptExplanation": {
      "en": "Every compliant HTML5 document starts with <!DOCTYPE html> to trigger standard standards-compliant rendering mode (avoiding Quirks Mode). The root <html> element requires a valid lang attribute (e.g. lang=\"en\" or lang=\"vi\") for screen readers and search engines. Inside <head>, you define essential metadata: <meta charset=\"UTF-8\"> for Unicode character encoding, <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> for responsive mobile rendering, and a descriptive <title>. The <body> contains all visible web content.",
      "vi": "Mọi tài liệu HTML5 chuẩn đều bắt đầu bằng <!DOCTYPE html> để kích hoạt chế độ dựng chuẩn của trình duyệt (tránh Quirks Mode). Thẻ gốc <html> cần có thuộc tính lang (như lang=\"vi\" hoặc lang=\"en\") để hỗ trợ trình đọc màn hình và SEO. Thẻ <head> chứa siêu dữ liệu: <meta charset=\"UTF-8\"> cho bảng mã ký tự, thẻ viewport cho giao diện responsive trên di động và tiêu đề <title>. Thẻ <body> chứa toàn bộ nội dung nhìn thấy trên trang."
    },
    "syntax": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Document Title</title>\n</head>\n<body>\n  <h1>Main Heading</h1>\n  <p>Page content goes here.</p>\n</body>\n</html>",
    "examples": [
      {
        "title": {
          "en": "Standard HTML5 Starter Skeleton",
          "vi": "Khung Tài Liệu HTML5 Tiêu Chuẩn"
        },
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>4TM Web Academy</title>\n</head>\n<body>\n  <h1>Welcome to Web Engineering</h1>\n  <p>Building semantic and accessible applications.</p>\n</body>\n</html>",
        "language": "html",
        "explanation": {
          "en": "Complete valid HTML5 document containing all mandatory structural tags, character encoding, and viewport configuration.",
          "vi": "Tài liệu HTML5 hoàn chỉnh bao gồm đầy đủ các thẻ cấu trúc bắt buộc, bảng mã ký tự và cấu hình viewport."
        }
      },
      {
        "title": {
          "en": "Localized Bilingual Document with Meta Description",
          "vi": "Tài Liệu Đa Ngữ Kèm Thẻ Mô Tả Meta"
        },
        "code": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"Học lập trình HTML5 chuẩn công nghiệp tại 4TM\">\n  <title>Học HTML5 Chuyên Nghiệp - 4TM</title>\n</head>\n<body>\n  <h1>Lập Trình Web Hiện Đại</h1>\n  <p>Nền tảng vững chắc cho mọi lập trình viên web.</p>\n</body>\n</html>",
        "language": "html",
        "explanation": {
          "en": "Demonstrates Vietnamese localization with lang=\"vi\" and a meta description tag for search engine indexing.",
          "vi": "Minh họa tài liệu tiếng Việt với lang=\"vi\" cùng thẻ mô tả meta description hỗ trợ máy tìm kiếm."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Omitting <!DOCTYPE html> or placing tags before it",
          "vi": "Bỏ sót <!DOCTYPE html> hoặc đặt các thẻ khác phía trước"
        },
        "correction": {
          "en": "Always place <!DOCTYPE html> on the very first line of the document to prevent Quirks Mode rendering.",
          "vi": "Luôn đặt <!DOCTYPE html> ở dòng đầu tiên của tài liệu để ngăn trình duyệt chuyển sang chế độ Quirks Mode."
        },
        "code": "<!-- Correct usage demonstrated in lesson examples -->"
      },
      {
        "mistake": {
          "en": "Omitting the lang attribute on the <html> tag",
          "vi": "Không khai báo thuộc tính lang trên thẻ <html>"
        },
        "correction": {
          "en": "Always declare lang (e.g. lang=\"en\" or lang=\"vi\") so screen readers pronounce text with the correct speech synthesizer.",
          "vi": "Luôn khai báo thuộc tính lang để trình đọc màn hình sử dụng đúng bộ phát âm ngôn ngữ."
        },
        "code": "<!-- Follow W3C semantic guidelines -->"
      }
    ],
    "tips": [
      {
        "en": "The viewport meta tag is essential for mobile responsiveness: without it, mobile browsers will render pages as if on a desktop screen and scale them down.",
        "vi": "Thẻ meta viewport là bắt buộc cho giao diện di động: nếu thiếu, trình duyệt điện thoại sẽ hiển thị trang web như màn hình máy tính và thu nhỏ lại."
      }
    ],
    "practice": {
      "task": {
        "en": "Construct a Valid HTML5 Skeleton",
        "vi": "Xây dựng khung tài liệu HTML5 chuẩn"
      },
      "instruction": {
        "en": "Complete the HTML5 document skeleton with <!DOCTYPE html>, <html lang=\"en\">, a <head> containing <meta charset=\"UTF-8\"> and <title>My Portfolio</title>, and a <body> with <h1>Developer Portfolio</h1>.",
        "vi": "Hoàn thiện khung tài liệu HTML5 với <!DOCTYPE html>, <html lang=\"en\">, thẻ <head> chứa <meta charset=\"UTF-8\"> và <title>My Portfolio</title>, cùng thẻ <body> chứa <h1>Developer Portfolio</h1>."
      },
      "starterCode": "<html lang=\"en\">\n<head>\n  <title>My Portfolio</title>\n</head>\n<body>\n  <p>Content</p>\n</body>\n</html>",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My Portfolio</title>\n</head>\n<body>\n  <h1>Developer Portfolio</h1>\n</body>\n</html>",
      "requiredPatterns": [
        "<!DOCTYPE html>",
        "<html lang=\"en\">",
        "<meta charset=\"UTF-8\">",
        "<title>My Portfolio</title>",
        "<h1>Developer Portfolio</h1>"
      ],
      "hint": {
        "en": "Add <!DOCTYPE html> at the top and include <meta charset=\"UTF-8\"> in <head>.",
        "vi": "Thêm <!DOCTYPE html> ở đầu và đặt <meta charset=\"UTF-8\"> trong <head>."
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Construct a Valid HTML5 Skeleton (Consolidation)",
        "vi": "Xây dựng khung tài liệu HTML5 chuẩn (Củng cố)"
      },
      "instruction": {
        "en": "Complete the HTML5 document skeleton with <!DOCTYPE html>, <html lang=\"en\">, a <head> containing <meta charset=\"UTF-8\"> and <title>My Portfolio</title>, and a <body> with <h1>Developer Portfolio</h1>.",
        "vi": "Hoàn thiện khung tài liệu HTML5 với <!DOCTYPE html>, <html lang=\"en\">, thẻ <head> chứa <meta charset=\"UTF-8\"> và <title>My Portfolio</title>, cùng thẻ <body> chứa <h1>Developer Portfolio</h1>."
      },
      "starterCode": "<html lang=\"en\">\n<head>\n  <title>My Portfolio</title>\n</head>\n<body>\n  <p>Content</p>\n</body>\n</html>",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My Portfolio</title>\n</head>\n<body>\n  <h1>Developer Portfolio</h1>\n</body>\n</html>",
      "requiredPatterns": [
        "<!DOCTYPE html>",
        "<html lang=\"en\">",
        "<meta charset=\"UTF-8\">",
        "<title>My Portfolio</title>",
        "<h1>Developer Portfolio</h1>"
      ],
      "hint": {
        "en": "Add <!DOCTYPE html> at the top and include <meta charset=\"UTF-8\"> in <head>.",
        "vi": "Thêm <!DOCTYPE html> ở đầu và đặt <meta charset=\"UTF-8\"> trong <head>."
      }
    }
  },
  "exercisePool": [
    {
      "id": "html_ex_1_1",
      "type": "complete_code",
      "title": {
        "en": "Add Mandatory HTML5 DOCTYPE & Encoding",
        "vi": "Thêm Khai Báo DOCTYPE & Bảng Mã Ký Tự"
      },
      "instruction": {
        "en": "Add <!DOCTYPE html> at line 1 and <meta charset=\"UTF-8\"> inside the <head> element.",
        "vi": "Thêm <!DOCTYPE html> ở dòng 1 và <meta charset=\"UTF-8\"> bên trong thẻ <head>."
      },
      "starterCode": "<html lang=\"en\">\n<head>\n  <title>4TM App</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>4TM App</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>",
      "hint": {
        "en": "Place <!DOCTYPE html> before <html> and <meta charset=\"UTF-8\"> in <head>.",
        "vi": "Đặt <!DOCTYPE html> trước <html> và <meta charset=\"UTF-8\"> trong <head>."
      },
      "explanation": {
        "en": "DOCTYPE triggers standards mode and UTF-8 supports global character sets.",
        "vi": "DOCTYPE kích hoạt chế độ dựng chuẩn và UTF-8 hiển thị đầy đủ ký tự quốc tế."
      }
    },
    {
      "id": "html_ex_1_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Misplaced Head Elements in Body",
        "vi": "Sửa Lỗi Đặt Thẻ Head Sai Vị Trí"
      },
      "instruction": {
        "en": "Move the <title> and <meta> tags inside the <head> container, and ensure <h1> is inside <body>.",
        "vi": "Di chuyển thẻ <title> và <meta> vào trong <head>, đảm bảo <h1> nằm trong <body>."
      },
      "starterCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<body>\n  <title>My Web Page</title>\n  <meta charset=\"UTF-8\">\n  <h1>Correct Layout</h1>\n</body>\n</html>",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My Web Page</title>\n</head>\n<body>\n  <h1>Correct Layout</h1>\n</body>\n</html>",
      "hint": {
        "en": "Wrap <meta> and <title> in <head> and keep <h1> in <body>.",
        "vi": "Bọc <meta> và <title> trong <head> và giữ <h1> trong <body>."
      },
      "explanation": {
        "en": "Head tags describe document metadata while body tags contain visible content.",
        "vi": "Thẻ head chứa cấu hình tài liệu, trong khi thẻ body chứa nội dung người dùng thấy."
      }
    },
    {
      "id": "html_ex_1_3",
      "type": "write_code",
      "title": {
        "en": "Build Vietnamese Localized HTML Document",
        "vi": "Viết Tài Liệu HTML Tiếng Việt Hoàn Chỉnh"
      },
      "instruction": {
        "en": "Write a full HTML document with <!DOCTYPE html>, <html lang=\"vi\">, <head> with <meta charset=\"UTF-8\"> and <title>Trang Chủ 4TM</title>, and <body> containing <h1>Xin Chào Thế Giới</h1>.",
        "vi": "Viết tài liệu HTML hoàn chỉnh với <!DOCTYPE html>, <html lang=\"vi\">, <head> có <meta charset=\"UTF-8\"> và <title>Trang Chủ 4TM</title>, và <body> chứa <h1>Xin Chào Thế Giới</h1>."
      },
      "starterCode": "<!-- Write your complete HTML5 document here -->\n",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Trang Chủ 4TM</title>\n</head>\n<body>\n  <h1>Xin Chào Thế Giới</h1>\n</body>\n</html>",
      "hint": {
        "en": "Declare <!DOCTYPE html>, <html lang=\"vi\">, <head> with charset/title, and <body>.",
        "vi": "Khai báo <!DOCTYPE html>, <html lang=\"vi\">, <head> với charset/title và <body>."
      },
      "explanation": {
        "en": "Proper lang=\"vi\" and UTF-8 encoding allow web engines to process Vietnamese text flawlessly.",
        "vi": "Khai báo lang=\"vi\" và UTF-8 giúp máy tìm kiếm và trình đọc xử lý tiếng Việt chính xác."
      }
    },
    {
      "id": "html_ex_1_4",
      "type": "modify_example",
      "title": {
        "en": "Add Mobile Viewport Configuration",
        "vi": "Thêm Thẻ Cấu Hình Mobile Viewport"
      },
      "instruction": {
        "en": "Add the mobile viewport meta tag <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> into the <head>.",
        "vi": "Thêm thẻ meta viewport <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> vào trong <head>."
      },
      "starterCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Responsive Site</title>\n</head>\n<body>\n  <h1>Mobile First</h1>\n</body>\n</html>",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Responsive Site</title>\n</head>\n<body>\n  <h1>Mobile First</h1>\n</body>\n</html>",
      "hint": {
        "en": "Insert <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> in <head>.",
        "vi": "Chèn <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> vào <head>."
      },
      "explanation": {
        "en": "The viewport tag ensures the page scales correctly to device physical screen widths.",
        "vi": "Thẻ viewport đảm bảo trang web co giãn đúng theo kích thước thiết bị."
      }
    },
    {
      "id": "html_ex_1_5",
      "type": "predict_output",
      "title": {
        "en": "Verify Valid HTML Headings and Paragraphs",
        "vi": "Kiểm Tra Tiêu Đề Và Đoạn Văn Trong HTML"
      },
      "instruction": {
        "en": "Ensure the document contains an <h1> tag with \"Web Architecture\" and a <p> tag with \"Built with HTML5 standards.\" inside <body>.",
        "vi": "Đảm bảo tài liệu chứa thẻ <h1> với \"Web Architecture\" và thẻ <p> với \"Built with HTML5 standards.\" bên trong <body>."
      },
      "starterCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Architecture</title>\n</head>\n<body>\n  <!-- Add h1 and p elements here -->\n</body>\n</html>",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Architecture</title>\n</head>\n<body>\n  <h1>Web Architecture</h1>\n  <p>Built with HTML5 standards.</p>\n</body>\n</html>",
      "hint": {
        "en": "Add <h1>Web Architecture</h1> and <p>Built with HTML5 standards.</p>.",
        "vi": "Thêm <h1>Web Architecture</h1> và <p>Built with HTML5 standards.</p>."
      },
      "explanation": {
        "en": "<h1> is the primary page headline, and <p> represents body text paragraphs.",
        "vi": "<h1> là tiêu đề chính và <p> biểu diễn đoạn văn bản."
      }
    }
  ],
  "challenge": {
    "id": "html_ch_1",
    "title": {
      "en": "Production Ready HTML5 Document Skeleton",
      "vi": "Khung Tài Liệu HTML5 Tiêu Chuẩn Sản Xuất"
    },
    "description": {
      "en": "Build a production-compliant HTML5 web document featuring DOCTYPE, language declaration, charset, viewport meta, SEO description, title, and a body with main title and description paragraph.",
      "vi": "Xây dựng tài liệu HTML5 chuẩn doanh nghiệp gồm khai báo DOCTYPE, ngôn ngữ, charset, meta viewport, meta description SEO, tiêu đề title và thân trang có tiêu đề h1 cùng đoạn mô tả."
    },
    "requirements": [
      {
        "en": "<!DOCTYPE html> at the very top of the file",
        "vi": "<!DOCTYPE html> ở dòng đầu tiên của tệp"
      },
      {
        "en": "<html lang=\"en\"> root element",
        "vi": "Thẻ gốc <html lang=\"en\">"
      },
      {
        "en": "<head> containing <meta charset=\"UTF-8\">",
        "vi": "Thẻ <head> chứa <meta charset=\"UTF-8\">"
      },
      {
        "en": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> in head",
        "vi": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> trong thẻ head"
      },
      {
        "en": "<title>4TM Enterprise Web</title> in head",
        "vi": "<title>4TM Enterprise Web</title> trong thẻ head"
      },
      {
        "en": "<body> with <h1>Enterprise Web Development</h1> and a <p>",
        "vi": "Thẻ <body> chứa <h1>Enterprise Web Development</h1> và thẻ <p>"
      }
    ],
    "starterCode": "<!-- Build your complete HTML5 production skeleton below -->\n",
    "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"Production-ready web development curriculum\">\n  <title>4TM Enterprise Web</title>\n</head>\n<body>\n  <h1>Enterprise Web Development</h1>\n  <p>High performance, accessible, and semantic web engineering.</p>\n</body>\n</html>",
    "hints": [
      {
        "en": "Make sure all tags are closed properly and meta tags are inside <head>.",
        "vi": "Đảm bảo đóng tất cả các thẻ đúng cách và đặt các thẻ meta trong <head>."
      }
    ],
    "solutionExplanation": {
      "en": "This document conforms to modern W3C standards with proper document structure, mobile viewport responsiveness, and SEO tags.",
      "vi": "Tài liệu tuân thủ đầy đủ chuẩn W3C với cấu trúc hoàn chỉnh, hỗ trợ hiển thị di động và tối ưu máy tìm kiếm."
    },
    "variants": [
      {
        "id": "html_ch_1_v1",
        "title": {
          "en": "Variant 1: Developer Portfolio Document Skeleton",
          "vi": "Biến Thể 1: Khung Trang Portfolio Lập Trình Viên"
        },
        "description": {
          "en": "Create a full HTML5 document skeleton for a developer portfolio with title \"Alex Rivera - Frontend Engineer\" and <h1>Alex Rivera</h1> in <body>.",
          "vi": "Tạo khung tài liệu HTML5 hoàn chỉnh cho trang portfolio với title \"Alex Rivera - Frontend Engineer\" và <h1>Alex Rivera</h1> trong <body>."
        },
        "requirements": [
          {
            "en": "<!DOCTYPE html> and <html lang=\"en\">",
            "vi": "<!DOCTYPE html> và <html lang=\"en\">"
          },
          {
            "en": "<head> with UTF-8 charset and viewport meta",
            "vi": "<head> có charset UTF-8 và meta viewport"
          },
          {
            "en": "<title>Alex Rivera - Frontend Engineer</title>",
            "vi": "<title>Alex Rivera - Frontend Engineer</title>"
          },
          {
            "en": "<body> with <h1>Alex Rivera</h1>",
            "vi": "<body> có <h1>Alex Rivera</h1>"
          }
        ],
        "starterCode": "<!-- Build the portfolio document skeleton -->\n",
        "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Alex Rivera - Frontend Engineer</title>\n</head>\n<body>\n  <h1>Alex Rivera</h1>\n  <p>Frontend engineer specializing in semantic web and accessibility.</p>\n</body>\n</html>",
        "hints": [
          {
            "en": "Review the challenge requirements carefully.",
            "vi": "Đọc kỹ các yêu cầu của thử thách."
          }
        ],
        "solutionExplanation": {
          "en": "Creates a clean, accessible portfolio shell ready for content expansion.",
          "vi": "Tạo khung trang portfolio gọn gàng, chuẩn trợ năng sẵn sàng phát triển nội dung."
        }
      },
      {
        "id": "html_ch_1_v2",
        "title": {
          "en": "Variant 2: Vietnamese Tech News Skeleton",
          "vi": "Biến Thể 2: Khung Trang Tin Tức Công Nghệ"
        },
        "description": {
          "en": "Create a full HTML5 document for a Vietnamese tech portal with <html lang=\"vi\">, <title>Tin Tức Công Nghệ 4TM</title>, and <h1>Cổng Thông Tin Công Nghệ</h1>.",
          "vi": "Tạo tài liệu HTML5 hoàn chỉnh cho cổng tin tức công nghệ với <html lang=\"vi\">, <title>Tin Tức Công Nghệ 4TM</title> và <h1>Cổng Thông Tin Công Nghệ</h1>."
        },
        "requirements": [
          {
            "en": "<!DOCTYPE html> and <html lang=\"vi\">",
            "vi": "<!DOCTYPE html> và <html lang=\"vi\">"
          },
          {
            "en": "<meta charset=\"UTF-8\"> and viewport in <head>",
            "vi": "<meta charset=\"UTF-8\"> và viewport trong <head>"
          },
          {
            "en": "<title>Tin Tức Công Nghệ 4TM</title>",
            "vi": "<title>Tin Tức Công Nghệ 4TM</title>"
          },
          {
            "en": "<body> containing <h1>Cổng Thông Tin Công Nghệ</h1>",
            "vi": "<body> chứa <h1>Cổng Thông Tin Công Nghệ</h1>"
          }
        ],
        "starterCode": "<!-- Build the Vietnamese news portal skeleton -->\n",
        "solutionCode": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Tin Tức Công Nghệ 4TM</title>\n</head>\n<body>\n  <h1>Cổng Thông Tin Công Nghệ</h1>\n  <p>Cập nhật tin tức công nghệ mới nhất trong ngày.</p>\n</body>\n</html>",
        "hints": [
          {
            "en": "Review the challenge requirements carefully.",
            "vi": "Đọc kỹ các yêu cầu của thử thách."
          }
        ],
        "solutionExplanation": {
          "en": "Bilingual document configured for Vietnamese language indexing and speech synthesis.",
          "vi": "Tài liệu được cấu hình tối ưu cho lập chỉ mục tiếng Việt và hỗ trợ tổng hợp giọng đọc."
        }
      }
    ]
  },
  "challengePool": [
    {
      "id": "html_ch_1",
      "title": {
        "en": "Production Ready HTML5 Document Skeleton",
        "vi": "Khung Tài Liệu HTML5 Tiêu Chuẩn Sản Xuất"
      },
      "description": {
        "en": "Build a production-compliant HTML5 web document featuring DOCTYPE, language declaration, charset, viewport meta, SEO description, title, and a body with main title and description paragraph.",
        "vi": "Xây dựng tài liệu HTML5 chuẩn doanh nghiệp gồm khai báo DOCTYPE, ngôn ngữ, charset, meta viewport, meta description SEO, tiêu đề title và thân trang có tiêu đề h1 cùng đoạn mô tả."
      },
      "requirements": [
        {
          "en": "<!DOCTYPE html> at the very top of the file",
          "vi": "<!DOCTYPE html> ở dòng đầu tiên của tệp"
        },
        {
          "en": "<html lang=\"en\"> root element",
          "vi": "Thẻ gốc <html lang=\"en\">"
        },
        {
          "en": "<head> containing <meta charset=\"UTF-8\">",
          "vi": "Thẻ <head> chứa <meta charset=\"UTF-8\">"
        },
        {
          "en": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> in head",
          "vi": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> trong thẻ head"
        },
        {
          "en": "<title>4TM Enterprise Web</title> in head",
          "vi": "<title>4TM Enterprise Web</title> trong thẻ head"
        },
        {
          "en": "<body> with <h1>Enterprise Web Development</h1> and a <p>",
          "vi": "Thẻ <body> chứa <h1>Enterprise Web Development</h1> và thẻ <p>"
        }
      ],
      "starterCode": "<!-- Build your complete HTML5 production skeleton below -->\n",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"Production-ready web development curriculum\">\n  <title>4TM Enterprise Web</title>\n</head>\n<body>\n  <h1>Enterprise Web Development</h1>\n  <p>High performance, accessible, and semantic web engineering.</p>\n</body>\n</html>",
      "hints": [
        {
          "en": "Make sure all tags are closed properly and meta tags are inside <head>.",
          "vi": "Đảm bảo đóng tất cả các thẻ đúng cách và đặt các thẻ meta trong <head>."
        }
      ],
      "solutionExplanation": {
        "en": "This document conforms to modern W3C standards with proper document structure, mobile viewport responsiveness, and SEO tags.",
        "vi": "Tài liệu tuân thủ đầy đủ chuẩn W3C với cấu trúc hoàn chỉnh, hỗ trợ hiển thị di động và tối ưu máy tìm kiếm."
      },
      "variants": [
        {
          "id": "html_ch_1_v1",
          "title": {
            "en": "Variant 1: Developer Portfolio Document Skeleton",
            "vi": "Biến Thể 1: Khung Trang Portfolio Lập Trình Viên"
          },
          "description": {
            "en": "Create a full HTML5 document skeleton for a developer portfolio with title \"Alex Rivera - Frontend Engineer\" and <h1>Alex Rivera</h1> in <body>.",
            "vi": "Tạo khung tài liệu HTML5 hoàn chỉnh cho trang portfolio với title \"Alex Rivera - Frontend Engineer\" và <h1>Alex Rivera</h1> trong <body>."
          },
          "requirements": [
            {
              "en": "<!DOCTYPE html> and <html lang=\"en\">",
              "vi": "<!DOCTYPE html> và <html lang=\"en\">"
            },
            {
              "en": "<head> with UTF-8 charset and viewport meta",
              "vi": "<head> có charset UTF-8 và meta viewport"
            },
            {
              "en": "<title>Alex Rivera - Frontend Engineer</title>",
              "vi": "<title>Alex Rivera - Frontend Engineer</title>"
            },
            {
              "en": "<body> with <h1>Alex Rivera</h1>",
              "vi": "<body> có <h1>Alex Rivera</h1>"
            }
          ],
          "starterCode": "<!-- Build the portfolio document skeleton -->\n",
          "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Alex Rivera - Frontend Engineer</title>\n</head>\n<body>\n  <h1>Alex Rivera</h1>\n  <p>Frontend engineer specializing in semantic web and accessibility.</p>\n</body>\n</html>",
          "hints": [
            {
              "en": "Review the challenge requirements carefully.",
              "vi": "Đọc kỹ các yêu cầu của thử thách."
            }
          ],
          "solutionExplanation": {
            "en": "Creates a clean, accessible portfolio shell ready for content expansion.",
            "vi": "Tạo khung trang portfolio gọn gàng, chuẩn trợ năng sẵn sàng phát triển nội dung."
          }
        },
        {
          "id": "html_ch_1_v2",
          "title": {
            "en": "Variant 2: Vietnamese Tech News Skeleton",
            "vi": "Biến Thể 2: Khung Trang Tin Tức Công Nghệ"
          },
          "description": {
            "en": "Create a full HTML5 document for a Vietnamese tech portal with <html lang=\"vi\">, <title>Tin Tức Công Nghệ 4TM</title>, and <h1>Cổng Thông Tin Công Nghệ</h1>.",
            "vi": "Tạo tài liệu HTML5 hoàn chỉnh cho cổng tin tức công nghệ với <html lang=\"vi\">, <title>Tin Tức Công Nghệ 4TM</title> và <h1>Cổng Thông Tin Công Nghệ</h1>."
          },
          "requirements": [
            {
              "en": "<!DOCTYPE html> and <html lang=\"vi\">",
              "vi": "<!DOCTYPE html> và <html lang=\"vi\">"
            },
            {
              "en": "<meta charset=\"UTF-8\"> and viewport in <head>",
              "vi": "<meta charset=\"UTF-8\"> và viewport trong <head>"
            },
            {
              "en": "<title>Tin Tức Công Nghệ 4TM</title>",
              "vi": "<title>Tin Tức Công Nghệ 4TM</title>"
            },
            {
              "en": "<body> containing <h1>Cổng Thông Tin Công Nghệ</h1>",
              "vi": "<body> chứa <h1>Cổng Thông Tin Công Nghệ</h1>"
            }
          ],
          "starterCode": "<!-- Build the Vietnamese news portal skeleton -->\n",
          "solutionCode": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Tin Tức Công Nghệ 4TM</title>\n</head>\n<body>\n  <h1>Cổng Thông Tin Công Nghệ</h1>\n  <p>Cập nhật tin tức công nghệ mới nhất trong ngày.</p>\n</body>\n</html>",
          "hints": [
            {
              "en": "Review the challenge requirements carefully.",
              "vi": "Đọc kỹ các yêu cầu của thử thách."
            }
          ],
          "solutionExplanation": {
            "en": "Bilingual document configured for Vietnamese language indexing and speech synthesis.",
            "vi": "Tài liệu được cấu hình tối ưu cho lập chỉ mục tiếng Việt và hỗ trợ tổng hợp giọng đọc."
          }
        }
      ]
    },
    {
      "id": "html_ch_1_v1",
      "title": {
        "en": "Variant 1: Developer Portfolio Document Skeleton",
        "vi": "Biến Thể 1: Khung Trang Portfolio Lập Trình Viên"
      },
      "description": {
        "en": "Create a full HTML5 document skeleton for a developer portfolio with title \"Alex Rivera - Frontend Engineer\" and <h1>Alex Rivera</h1> in <body>.",
        "vi": "Tạo khung tài liệu HTML5 hoàn chỉnh cho trang portfolio với title \"Alex Rivera - Frontend Engineer\" và <h1>Alex Rivera</h1> trong <body>."
      },
      "requirements": [
        {
          "en": "<!DOCTYPE html> and <html lang=\"en\">",
          "vi": "<!DOCTYPE html> và <html lang=\"en\">"
        },
        {
          "en": "<head> with UTF-8 charset and viewport meta",
          "vi": "<head> có charset UTF-8 và meta viewport"
        },
        {
          "en": "<title>Alex Rivera - Frontend Engineer</title>",
          "vi": "<title>Alex Rivera - Frontend Engineer</title>"
        },
        {
          "en": "<body> with <h1>Alex Rivera</h1>",
          "vi": "<body> có <h1>Alex Rivera</h1>"
        }
      ],
      "starterCode": "<!-- Build the portfolio document skeleton -->\n",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Alex Rivera - Frontend Engineer</title>\n</head>\n<body>\n  <h1>Alex Rivera</h1>\n  <p>Frontend engineer specializing in semantic web and accessibility.</p>\n</body>\n</html>",
      "hints": [
        {
          "en": "Review the challenge requirements carefully.",
          "vi": "Đọc kỹ các yêu cầu của thử thách."
        }
      ],
      "solutionExplanation": {
        "en": "Creates a clean, accessible portfolio shell ready for content expansion.",
        "vi": "Tạo khung trang portfolio gọn gàng, chuẩn trợ năng sẵn sàng phát triển nội dung."
      }
    },
    {
      "id": "html_ch_1_v2",
      "title": {
        "en": "Variant 2: Vietnamese Tech News Skeleton",
        "vi": "Biến Thể 2: Khung Trang Tin Tức Công Nghệ"
      },
      "description": {
        "en": "Create a full HTML5 document for a Vietnamese tech portal with <html lang=\"vi\">, <title>Tin Tức Công Nghệ 4TM</title>, and <h1>Cổng Thông Tin Công Nghệ</h1>.",
        "vi": "Tạo tài liệu HTML5 hoàn chỉnh cho cổng tin tức công nghệ với <html lang=\"vi\">, <title>Tin Tức Công Nghệ 4TM</title> và <h1>Cổng Thông Tin Công Nghệ</h1>."
      },
      "requirements": [
        {
          "en": "<!DOCTYPE html> and <html lang=\"vi\">",
          "vi": "<!DOCTYPE html> và <html lang=\"vi\">"
        },
        {
          "en": "<meta charset=\"UTF-8\"> and viewport in <head>",
          "vi": "<meta charset=\"UTF-8\"> và viewport trong <head>"
        },
        {
          "en": "<title>Tin Tức Công Nghệ 4TM</title>",
          "vi": "<title>Tin Tức Công Nghệ 4TM</title>"
        },
        {
          "en": "<body> containing <h1>Cổng Thông Tin Công Nghệ</h1>",
          "vi": "<body> chứa <h1>Cổng Thông Tin Công Nghệ</h1>"
        }
      ],
      "starterCode": "<!-- Build the Vietnamese news portal skeleton -->\n",
      "solutionCode": "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Tin Tức Công Nghệ 4TM</title>\n</head>\n<body>\n  <h1>Cổng Thông Tin Công Nghệ</h1>\n  <p>Cập nhật tin tức công nghệ mới nhất trong ngày.</p>\n</body>\n</html>",
      "hints": [
        {
          "en": "Review the challenge requirements carefully.",
          "vi": "Đọc kỹ các yêu cầu của thử thách."
        }
      ],
      "solutionExplanation": {
        "en": "Bilingual document configured for Vietnamese language indexing and speech synthesis.",
        "vi": "Tài liệu được cấu hình tối ưu cho lập chỉ mục tiếng Việt và hỗ trợ tổng hợp giọng đọc."
      }
    }
  ],
  "quizQuestionPool": [
    {
      "id": "html_q_1_1",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of the <!DOCTYPE html> declaration at the very top of an HTML file?",
        "vi": "Mục đích của khai báo <!DOCTYPE html> ở dòng đầu tiên của tệp HTML là gì?"
      },
      "options": [
        {
          "en": "Tells the browser to render the page in standard HTML5 mode and prevents Quirks Mode",
          "vi": "Báo cho trình duyệt dựng trang theo chuẩn HTML5 hiện đại và ngăn Quirks Mode"
        },
        {
          "en": "Imports the default CSS stylesheet from W3C servers",
          "vi": "Tải tệp định kiểu CSS mặc định từ máy chủ W3C"
        },
        {
          "en": "Enables JavaScript runtime execution in the browser",
          "vi": "Bật môi trường thực thi JavaScript trong trình duyệt"
        },
        {
          "en": "Encodes the file into binary format for faster transport",
          "vi": "Mã hóa tệp sang dạng nhị phân để truyền tải nhanh hơn"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "<!DOCTYPE html> is a required document type declaration that ensures modern standards compliance.",
        "vi": "<!DOCTYPE html> là khai báo kiểu tài liệu bắt buộc giúp kích hoạt chế độ dựng chuẩn W3C."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_2",
      "type": "single_choice",
      "question": {
        "en": "Why is the lang attribute on the <html> element critical for accessibility?",
        "vi": "Tại sao thuộc tính lang trên thẻ <html> lại quan trọng đối với khả năng tiếp cận (accessibility)?"
      },
      "options": [
        {
          "en": "It informs screen readers which voice synthesizer and pronunciation rules to use",
          "vi": "Nó báo cho trình đọc màn hình biết cần dùng bộ phát âm và quy tắc đọc ngôn ngữ nào"
        },
        {
          "en": "It automatically translates the page into the user browser language",
          "vi": "Nó tự động dịch toàn bộ trang sang ngôn ngữ của trình duyệt người dùng"
        },
        {
          "en": "It specifies the font family downloaded from Google Fonts",
          "vi": "Nó xác định bộ font chữ cần tải về từ Google Fonts"
        },
        {
          "en": "It encrypts form submissions based on regional standards",
          "vi": "Nó mã hóa dữ liệu biểu mẫu theo tiêu chuẩn từng khu vực"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The lang attribute tells assistive technology and search engines the natural language of the document content.",
        "vi": "Thuộc tính lang giúp công nghệ trợ năng và máy tìm kiếm nhận diện ngôn ngữ tự nhiên của nội dung."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_3",
      "type": "single_choice",
      "question": {
        "en": "What does <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> accomplish?",
        "vi": "Thẻ <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> có tác dụng gì?"
      },
      "options": [
        {
          "en": "Sets viewport width to match physical device width and prevents 1:1 mobile downscaling",
          "vi": "Thiết lập chiều rộng viewport bằng chiều rộng vật lý của thiết bị và chống thu nhỏ giao diện"
        },
        {
          "en": "Enables dark mode theme automatically on mobile devices",
          "vi": "Tự động kích hoạt giao diện nền tối trên thiết bị di động"
        },
        {
          "en": "Restricts users from zooming into image assets",
          "vi": "Ngăn không cho người dùng phóng to hình ảnh"
        },
        {
          "en": "Forces desktop landscape orientation on mobile phones",
          "vi": "Bắt buộc màn hình điện thoại xoay ngang kiểu máy tính"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The viewport meta tag instructs mobile browsers to render content matching the device screen width rather than assuming a 980px desktop view.",
        "vi": "Thẻ meta viewport yêu cầu trình duyệt di động hiển thị theo đúng kích thước màn hình thiết bị."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_4",
      "type": "single_choice",
      "question": {
        "en": "Where should <meta charset=\"UTF-8\"> be placed inside an HTML document?",
        "vi": "Thẻ <meta charset=\"UTF-8\"> nên được đặt ở vị trí nào trong tài liệu HTML?"
      },
      "options": [
        {
          "en": "As one of the very first children of the <head> element",
          "vi": "Là một trong những thẻ con đầu tiên bên trong thẻ <head>"
        },
        {
          "en": "At the bottom of the <body> element",
          "vi": "Ở cuối cùng của thẻ <body>"
        },
        {
          "en": "Outside the <html> tag after DOCTYPE",
          "vi": "Bên ngoài thẻ <html> phía sau DOCTYPE"
        },
        {
          "en": "Inside a <footer> element",
          "vi": "Bên trong thẻ <footer>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Placing charset at the beginning of <head> ensures the browser decodes all subsequent characters including page title correctly.",
        "vi": "Đặt charset ở đầu <head> giúp trình duyệt giải mã chính xác tất cả ký tự tiếp theo kể cả tiêu đề trang."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_5",
      "type": "single_choice",
      "question": {
        "en": "Which element contains the actual visible content displayed inside the browser viewport?",
        "vi": "Thẻ nào chứa toàn bộ nội dung hiển thị trực tiếp cho người dùng trong khung nhìn trình duyệt?"
      },
      "options": [
        {
          "en": "<body>",
          "vi": "<body>"
        },
        {
          "en": "<head>",
          "vi": "<head>"
        },
        {
          "en": "<title>",
          "vi": "<title>"
        },
        {
          "en": "<meta>",
          "vi": "<meta>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "<body> holds all renderable DOM elements, whereas <head> holds document metadata and links.",
        "vi": "<body> chứa toàn bộ phần tử DOM hiển thị, trong khi <head> chứa siêu dữ liệu và liên kết tệp."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_6",
      "type": "single_choice",
      "question": {
        "en": "What is the role of the <title> tag in the <head>?",
        "vi": "Vai trò của thẻ <title> trong <head> là gì?"
      },
      "options": [
        {
          "en": "Defines the tab title in browser UI, search engine SERP snippet title, and bookmark name",
          "vi": "Xác định tên tab trên trình duyệt, tiêu đề kết quả tìm kiếm Google và tên bookmark"
        },
        {
          "en": "Renders the top large headline on the web page body",
          "vi": "Hiển thị tiêu đề lớn nhất ở đầu trang web"
        },
        {
          "en": "Configures the domain name registration on DNS",
          "vi": "Cấu hình đăng ký tên miền trên máy chủ DNS"
        },
        {
          "en": "Sets the tooltip text when hovering over links",
          "vi": "Tạo văn bản gợi ý khi rê chuột qua các liên kết"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "<title> sets the browser window/tab text and primary search engine listing headline.",
        "vi": "<title> đặt tên tab trình duyệt và tiêu đề hiển thị trên kết quả tìm kiếm của Google."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_7",
      "type": "single_choice",
      "question": {
        "en": "Is HTML case-sensitive for element tag names in HTML5?",
        "vi": "Trong chuẩn HTML5, tên thẻ phần tử có phân biệt chữ hoa chữ thường không?"
      },
      "options": [
        {
          "en": "HTML5 is case-insensitive, but lowercase tags (e.g. <div>) are the strict industry best practice",
          "vi": "HTML5 không phân biệt hoa thường, nhưng viết thường (như <div>) là chuẩn bắt buộc trong thực tế"
        },
        {
          "en": "HTML5 requires all tags to be written in UPPERCASE",
          "vi": "HTML5 bắt buộc tất cả thẻ phải viết HOA"
        },
        {
          "en": "Tags are case-sensitive only inside the <head> element",
          "vi": "Thẻ chỉ phân biệt hoa thường khi nằm trong <head>"
        },
        {
          "en": "Uppercase is required for semantic elements like <MAIN>",
          "vi": "Chữ hoa là bắt buộc đối với thẻ ngữ nghĩa như <MAIN>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "HTML5 parses <DIV>, <div>, and <Div> identically, but lowercase is the universal standard for consistency and XHTML/XML compatibility.",
        "vi": "HTML5 xử lý hoa thường như nhau, nhưng quy ước viết thường là chuẩn quốc tế để duy trì tính nhất quán."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_8",
      "type": "single_choice",
      "question": {
        "en": "Which tag is an empty (void) self-closing element in HTML5?",
        "vi": "Thẻ nào sau đây là thẻ rỗng (void element) tự đóng trong HTML5?"
      },
      "options": [
        {
          "en": "<meta>",
          "vi": "<meta>"
        },
        {
          "en": "<title>",
          "vi": "<title>"
        },
        {
          "en": "<p>",
          "vi": "<p>"
        },
        {
          "en": "<h1>",
          "vi": "<h1>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "<meta>, <img>, <br>, <hr>, and <input> are void elements and cannot have closing tags or child nodes.",
        "vi": "<meta>, <img>, <br>, <hr> và <input> là các void element không có thẻ đóng và không chứa thẻ con."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_9",
      "type": "single_choice",
      "question": {
        "en": "What happens if <!DOCTYPE html> is missing from an HTML document?",
        "vi": "Điều gì xảy ra nếu tài liệu HTML thiếu khai báo <!DOCTYPE html>?"
      },
      "options": [
        {
          "en": "The browser renders in Quirks Mode, potentially breaking layout and box sizing behavior",
          "vi": "Trình duyệt chuyển sang chế độ Quirks Mode, dễ làm vỡ bố cục và sai lệch box model"
        },
        {
          "en": "The browser refuses to load any images or text",
          "vi": "Trình duyệt từ chối tải tất cả hình ảnh và văn bản"
        },
        {
          "en": "The server returns a 500 Internal Server Error",
          "vi": "Máy chủ phản hồi mã lỗi 500 Internal Server Error"
        },
        {
          "en": "JavaScript files are blocked by the firewall",
          "vi": "Tệp JavaScript bị chặn bởi tường lửa"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Without a doctype, browsers emulate bugs in 1990s legacy browsers via Quirks Mode.",
        "vi": "Nếu thiếu doctype, trình duyệt sẽ mô phỏng lại các lỗi của trình duyệt thập niên 1990 qua chế độ Quirks Mode."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_10",
      "type": "single_choice",
      "question": {
        "en": "Which HTML comment syntax is valid and ignored by the browser renderer?",
        "vi": "Cú pháp ghi chú (comment) nào sau đây là chuẩn và được trình duyệt bỏ qua không hiển thị?"
      },
      "options": [
        {
          "en": "<!-- This is a comment -->",
          "vi": "<!-- This is a comment -->"
        },
        {
          "en": "// This is a comment",
          "vi": "// This is a comment"
        },
        {
          "en": "/* This is a comment */",
          "vi": "/* This is a comment */"
        },
        {
          "en": "# This is a comment",
          "vi": "# This is a comment"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "HTML comments use <!-- and --> delimiters.",
        "vi": "Ghi chú trong HTML bắt đầu bằng <!-- và kết thúc bằng -->."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_11",
      "type": "single_choice",
      "question": {
        "en": "What is the correct attribute to specify character encoding in HTML5?",
        "vi": "Thuộc tính chuẩn để chỉ định bảng mã ký tự trong HTML5 là gì?"
      },
      "options": [
        {
          "en": "<meta charset=\"UTF-8\">",
          "vi": "<meta charset=\"UTF-8\">"
        },
        {
          "en": "<meta encoding=\"UTF-8\">",
          "vi": "<meta encoding=\"UTF-8\">"
        },
        {
          "en": "<html charset=\"UTF-8\">",
          "vi": "<html charset=\"UTF-8\">"
        },
        {
          "en": "<charset value=\"UTF-8\">",
          "vi": "<charset value=\"UTF-8\">"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "HTML5 simplified the older verbose http-equiv syntax to concise <meta charset=\"UTF-8\">.",
        "vi": "HTML5 rút gọn cú pháp dài dòng cũ thành thẻ ngắn gọn <meta charset=\"UTF-8\">."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_12",
      "type": "single_choice",
      "question": {
        "en": "What is the root container of an HTML document hierarchy called in the DOM?",
        "vi": "Thẻ gốc bao bọc toàn bộ cây phân cấp của tài liệu HTML trong DOM tên là gì?"
      },
      "options": [
        {
          "en": "<html>",
          "vi": "<html>"
        },
        {
          "en": "<root>",
          "vi": "<root>"
        },
        {
          "en": "<document>",
          "vi": "<document>"
        },
        {
          "en": "<main>",
          "vi": "<main>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "<html> wraps all head and body content and is the top-level element of any HTML document.",
        "vi": "Thẻ <html> bao bọc toàn bộ nội dung head và body, là phần tử cấp cao nhất của tài liệu HTML."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_13",
      "type": "single_choice",
      "question": {
        "en": "Which meta tag provides a short summary displayed under search engine results?",
        "vi": "Thẻ meta nào cung cấp đoạn tóm tắt ngắn hiển thị bên dưới tiêu đề trên Google Tìm kiếm?"
      },
      "options": [
        {
          "en": "<meta name=\"description\" content=\"...\">",
          "vi": "<meta name=\"description\" content=\"...\">"
        },
        {
          "en": "<meta name=\"summary\" content=\"...\">",
          "vi": "<meta name=\"summary\" content=\"...\">"
        },
        {
          "en": "<meta name=\"keywords\" content=\"...\">",
          "vi": "<meta name=\"keywords\" content=\"...\">"
        },
        {
          "en": "<meta name=\"snippet\" content=\"...\">",
          "vi": "<meta name=\"snippet\" content=\"...\">"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "meta name=\"description\" gives search engines the summary snippet for search result listings.",
        "vi": "meta name=\"description\" cung cấp đoạn trích mô tả cho các công cụ tìm kiếm hiển thị kết quả."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_14",
      "type": "single_choice",
      "question": {
        "en": "Can multiple <head> elements exist inside a single valid HTML document?",
        "vi": "Có thể có nhiều thẻ <head> bên trong một tài liệu HTML hợp lệ không?"
      },
      "options": [
        {
          "en": "No, an HTML document can only contain exactly one <head> element",
          "vi": "Không, một tài liệu HTML chỉ được phép có duy nhất một thẻ <head>"
        },
        {
          "en": "Yes, one for metadata and one for script tags",
          "vi": "Có, một cho siêu dữ liệu và một cho thẻ script"
        },
        {
          "en": "Yes, if one is placed inside the <body>",
          "vi": "Có, nếu đặt một thẻ bên trong <body>"
        },
        {
          "en": "Yes, in responsive multi-column layouts",
          "vi": "Có, trong bố cục nhiều cột responsive"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "W3C HTML specification requires exactly one <head> directly inside <html>.",
        "vi": "Quy chuẩn W3C quy định chỉ có duy nhất một thẻ <head> là con trực tiếp của <html>."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_15",
      "type": "single_choice",
      "question": {
        "en": "Why is standard indentation and formatting recommended in HTML source code?",
        "vi": "Tại sao nên thụt lề và định dạng chuẩn trong mã nguồn HTML?"
      },
      "options": [
        {
          "en": "Improves maintainability, readability, and clarifies parent-child DOM nesting",
          "vi": "Tăng tính dễ đọc, dễ bảo trì và làm rõ quan hệ cha-con lồng nhau trong cây DOM"
        },
        {
          "en": "Indentation is strictly required by the HTML5 parser like Python",
          "vi": "Thụt lề là bắt buộc như ngôn ngữ Python nếu không sẽ báo lỗi"
        },
        {
          "en": "Reduces the memory usage of the browser parser",
          "vi": "Giúp tiết kiệm bộ nhớ RAM khi trình duyệt đọc mã"
        },
        {
          "en": "Automatically minifies the file during transmission",
          "vi": "Tự động nén dung lượng tệp khi truyền tải qua mạng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Whitespace is collapsed by HTML engines, but structured indentation is essential for engineering team collaboration.",
        "vi": "Khoảng trắng được trình duyệt gom nhóm lại, nhưng thụt dòng chuẩn là tối quan trọng cho làm việc nhóm."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    },
    {
      "id": "html_q_1_16",
      "type": "single_choice",
      "question": {
        "en": "What is the standard file extension for HTML documents served over the web?",
        "vi": "Đuôi tệp (phần mở rộng) tiêu chuẩn cho các tài liệu HTML trên web là gì?"
      },
      "options": [
        {
          "en": ".html or .htm",
          "vi": ".html hoặc .htm"
        },
        {
          "en": ".web",
          "vi": ".web"
        },
        {
          "en": ".markup",
          "vi": ".markup"
        },
        {
          "en": ".dom",
          "vi": ".dom"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": ".html is the universal file extension served with text/html MIME type.",
        "vi": ".html là phần mở rộng phổ biến nhất tương ứng với kiểu MIME text/html."
      },
      "topicId": "html_structure",
      "difficulty": "easy"
    }
  ]
};

export default lesson01;
