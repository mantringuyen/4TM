import { Lesson } from '../../../../types';

export const lesson14: Lesson = {
  "id": "css_lesson_14",
  "moduleId": "css_mod_4",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 14,
  "topicId": "css_responsive_design",
  "title": {
    "en": "Responsive Web Design & Mobile-First Media Queries",
    "vi": "Thiết Kế Web Đáp Ứng & Media Queries Mobile-First"
  },
  "summary": {
    "en": "Master mobile-first development, viewport meta tag, modern media query range syntax (@media (width >= 768px)), prefers-color-scheme, and fluid layouts.",
    "vi": "Làm chủ tư duy mobile-first, thẻ viewport, cú pháp khoảng hiện đại (@media (width >= 768px)), prefers-color-scheme và bố cục co giãn."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Responsive Web Design (RWD) ensures web applications deliver an optimal user experience across any device size, from watches and smartphones to 4K monitors. Modern CSS simplifies responsive logic with mathematical range media queries.",
      "vi": "Thiết kế web đáp ứng (Responsive Web Design - RWD) đảm bảo ứng dụng hiển thị hoàn hảo trên mọi kích cỡ màn hình, từ đồng hồ thông minh, điện thoại tới màn hình 4K. CSS hiện đại tinh gọn các câu lệnh với cú pháp so sánh toán học trực quan."
    },
    "conceptExplanation": {
      "en": "The foundation of RWD starts in HTML with `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`. The 'Mobile-First' methodology writes default CSS for small screens first, layering progressive enhancements inside `@media (min-width: ...)` queries. Modern CSS Media Queries Level 4 introduces mathematical range comparisons like `@media (width >= 768px)` (equivalent to `min-width: 768px`) and range spans like `@media (768px <= width <= 1024px)`. System preference queries like `@media (prefers-color-scheme: dark)` and `@media (prefers-reduced-motion: reduce)` empower adaptive accessible experiences.",
      "vi": "Nền tảng của RWD bắt đầu từ thẻ HTML `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`. Phương pháp 'Mobile-First' viết CSS mặc định cho màn hình nhỏ trước, sau đó bổ sung nâng cấp dần cho màn hình lớn bên trong các câu lệnh `@media (min-width: ...)`. Chuẩn Media Queries Level 4 mang tới cú pháp toán học trực quan như `@media (width >= 768px)` (thay thế cho `min-width: 768px`) và khoảng kẹp `@media (768px <= width <= 1024px)`. Các truy vấn hệ thống như `@media (prefers-color-scheme: dark)` và `@media (prefers-reduced-motion: reduce)` mang lại trải nghiệm tối ưu theo sở thích của người dùng."
    },
    "syntax": "/* Mobile-first base styles (Default on small screens) */\n.sidebar-layout {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n/* Tablet & Desktop enhancement (Modern Range Syntax) */\n@media (width >= 768px) {\n  .sidebar-layout {\n    flex-direction: row;\n  }\n}\n\n/* Dark Mode OS Preference */\n@media (prefers-color-scheme: dark) {\n  body {\n    background-color: #0f172a;\n    color: #f8fafc;\n  }\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Mobile-First Responsive Grid",
          "vi": "Lưới Đáp Ứng Theo Triết Lý Mobile-First"
        },
        "description": {
          "en": "1 column on mobile, 2 columns on tablet, 4 columns on widescreen.",
          "vi": "1 cột trên điện thoại, 2 cột trên máy tính bảng, 4 cột trên màn hình máy tính."
        },
        "code": ".feature-grid {\n  display: grid;\n  grid-template-columns: 1fr; /* Mobile */\n  gap: 16px;\n}\n\n@media (width >= 640px) {\n  .feature-grid {\n    grid-template-columns: repeat(2, 1fr); /* Tablet */\n  }\n}\n\n@media (width >= 1024px) {\n  .feature-grid {\n    grid-template-columns: repeat(4, 1fr); /* Desktop */\n  }\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forgetting the viewport meta tag in index.html, causing mobile browsers to render the page as a tiny zoomed-out 980px desktop view.",
          "vi": "Quên thẻ meta viewport trong index.html, khiến trình duyệt di động thu nhỏ trang thành chế độ xem máy tính 980px tí hon."
        },
        "correction": {
          "en": "Always include <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> in the HTML <head>.",
          "vi": "Luôn đặt <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> trong thẻ <head> của HTML."
        }
      }
    ],
    "tips": [
      {
        "en": "Prefer (width >= 768px) range syntax over older min-width: 768px for cleaner, more readable stylesheets.",
        "vi": "Ưu tiên dùng cú pháp so sánh (width >= 768px) thay vì min-width: 768px để mã nguồn ngắn gọn và dễ đọc hơn."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_14_1",
      "type": "complete_code",
      "title": {
        "en": "Write a Mobile-First Media Query",
        "vi": "Viết Media Query Theo Phong Cách Mobile-First"
      },
      "instruction": {
        "en": "Write a media query for width >= 768px that changes .content-flow to flex-direction: row.",
        "vi": "Viết media query cho width >= 768px để đổi .content-flow sang flex-direction: row."
      },
      "starterCode": ".content-flow {\n  display: flex;\n  flex-direction: column;\n}\n\n/* Add media query for width >= 768px */",
      "solutionCode": ".content-flow {\n  display: flex;\n  flex-direction: column;\n}\n\n@media (width >= 768px) {\n  .content-flow {\n    flex-direction: row;\n  }\n}",
      "hint": {
        "en": "Use @media (width >= 768px) { .content-flow { flex-direction: row; } }",
        "vi": "Dùng @media (width >= 768px) { .content-flow { flex-direction: row; } }"
      },
      "explanation": {
        "en": "Mobile-first sets column flow by default and upgrades to row flow at the 768px breakpoint.",
        "vi": "Mobile-first đặt hướng xếp dọc mặc định và nâng cấp thành hàng ngang khi màn hình rộng từ 768px."
      }
    },
    {
      "id": "css_ex_14_2",
      "type": "fix_code",
      "title": {
        "en": "Support System Dark Mode Preference",
        "vi": "Hỗ Trợ Chế Độ Tối Tự Động Của Hệ Thống"
      },
      "instruction": {
        "en": "Add a media query @media (prefers-color-scheme: dark) setting background: #0f172a and color: #f8fafc on .theme-card.",
        "vi": "Thêm media query @media (prefers-color-scheme: dark) đặt background: #0f172a và color: #f8fafc cho .theme-card."
      },
      "starterCode": ".theme-card {\n  background: #ffffff;\n  color: #0f172a;\n}",
      "solutionCode": ".theme-card {\n  background: #ffffff;\n  color: #0f172a;\n}\n\n@media (prefers-color-scheme: dark) {\n  .theme-card {\n    background: #0f172a;\n    color: #f8fafc;\n  }\n}",
      "hint": {
        "en": "Add @media (prefers-color-scheme: dark) { .theme-card { background: #0f172a; color: #f8fafc; } }",
        "vi": "Thêm @media (prefers-color-scheme: dark) { .theme-card { background: #0f172a; color: #f8fafc; } }"
      },
      "explanation": {
        "en": "prefers-color-scheme respects the user's operating system dark/light mode preference.",
        "vi": "prefers-color-scheme tự động điều chỉnh giao diện theo chế độ sáng/tối của hệ điều hành người dùng."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_14",
    "title": {
      "en": "Build a Full Responsive Navigation Bar",
      "vi": "Xây Dựng Thanh Điều Hướng Đa Nền Tảng Hoàn Chỉnh"
    },
    "description": {
      "en": "Style .nav-menu with display: none by default. At @media (width >= 768px), set .nav-menu to display: flex, flex-direction: row, and gap: 24px.",
      "vi": "Tạo kiểu cho .nav-menu với display: none mặc định. Tại @media (width >= 768px), đổi .nav-menu thành display: flex, flex-direction: row và gap: 24px."
    },
    "requirements": [
      {
        "en": ".nav-menu { display: none }",
        "vi": ".nav-menu { display: none }"
      },
      {
        "en": "@media (width >= 768px)",
        "vi": "@media (width >= 768px)"
      },
      {
        "en": "display: flex",
        "vi": "display: flex"
      },
      {
        "en": "flex-direction: row",
        "vi": "flex-direction: row"
      },
      {
        "en": "gap: 24px",
        "vi": "gap: 24px"
      }
    ],
    "starterCode": "/* Mobile default */\n.nav-menu {\n}\n\n/* Desktop enhancement */",
    "solutionCode": ".nav-menu {\n  display: none;\n}\n\n@media (width >= 768px) {\n  .nav-menu {\n    display: flex;\n    flex-direction: row;\n    gap: 24px;\n  }\n}",
    "hints": [
      {
        "en": "Declare display: none in base styles, then use @media (width >= 768px) with display: flex.",
        "vi": "Khai báo display: none ở CSS gốc, sau đó dùng @media (width >= 768px) với display: flex."
      }
    ],
    "solutionExplanation": {
      "en": "Hiding menu links on mobile behind a hamburger trigger and revealing them on desktop is a core RWD pattern.",
      "vi": "Ẩn danh sách liên kết trên di động và tự bung thành thanh ngang trên máy tính là mẫu thiết kế đáp ứng tiêu chuẩn."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_14_1",
      "type": "single_choice",
      "question": {
        "en": "Why is a 'Mobile-First' development workflow superior to 'Desktop-First'?",
        "vi": "Tại sao quy trình phát triển 'Mobile-First' lại vượt trội hơn so với 'Desktop-First'?"
      },
      "options": [
        {
          "en": "It forces clean minimal base styles first and progressively enhances for larger screens using min-width queries, reducing CSS overrides",
          "vi": "Nó bắt đầu từ CSS tối giản gọn nhẹ cho thiết bị yếu và nâng cấp dần lên màn hình lớn bằng min-width, giảm thiểu việc ghi đè code thừa"
        },
        {
          "en": "Mobile phones cannot download large CSS files",
          "vi": "Điện thoại không tải được file CSS lớn"
        },
        {
          "en": "Desktop screens do not support CSS Grid",
          "vi": "Màn hình máy tính không hỗ trợ CSS Grid"
        },
        {
          "en": "Google bans desktop-first websites",
          "vi": "Google cấm các website desktop-first"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Mobile-first avoids heavy CSS resets on mobile and naturally produces cleaner, more performant stylesheets.",
        "vi": "Mobile-first tránh việc phải viết các lệnh hủy bỏ hiệu ứng phức tạp trên di động và tạo ra mã nguồn tinh gọn, hiệu năng cao."
      },
      "topicId": "css_responsive_design",
      "difficulty": "easy"
    },
    {
      "id": "css_q_14_2",
      "type": "single_choice",
      "question": {
        "en": "In modern CSS Media Queries Level 4, what is the modern equivalent of `@media (min-width: 1024px)`?",
        "vi": "Trong chuẩn Media Queries Level 4 hiện đại, cú pháp nào tương đương với `@media (min-width: 1024px)`?"
      },
      "options": [
        {
          "en": "@media (width >= 1024px)",
          "vi": "@media (width >= 1024px)"
        },
        {
          "en": "@media (screen: 1024px+)",
          "vi": "@media (screen: 1024px+)"
        },
        {
          "en": "@media (from-width: 1024px)",
          "vi": "@media (from-width: 1024px)"
        },
        {
          "en": "@media (viewport: desktop)",
          "vi": "@media (viewport: desktop)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The range syntax `@media (width >= 1024px)` replaces traditional `min-width` queries with intuitive mathematical operators.",
        "vi": "Cú pháp so sánh `@media (width >= 1024px)` thay thế `min-width` bằng các toán tử toán học trực quan và dễ hiểu."
      },
      "topicId": "css_responsive_design",
      "difficulty": "easy"
    },
    {
      "id": "css_q_14_3",
      "type": "single_choice",
      "question": {
        "en": "What does the media query `@media (prefers-reduced-motion: reduce)` allow developers to do?",
        "vi": "Media query `@media (prefers-reduced-motion: reduce)` cho phép lập trình viên làm gì?"
      },
      "options": [
        {
          "en": "Disable or minimize intense animations for users who experience motion sickness or vestibular disorders",
          "vi": "Tắt hoặc giảm bớt các hiệu ứng chuyển động mạnh cho người dùng dễ bị say xe hoặc rối loạn tiền đình"
        },
        {
          "en": "Slow down internet connection speed",
          "vi": "Làm chậm tốc độ mạng"
        },
        {
          "en": "Reduce screen brightness",
          "vi": "Giảm độ sáng màn hình"
        },
        {
          "en": "Compress video files",
          "vi": "Nén dung lượng file video"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "prefers-reduced-motion is an essential web accessibility feature that respects user OS accessibility settings to avoid motion triggers.",
        "vi": "prefers-reduced-motion là tính năng tiếp cận web quan trọng nhằm tôn trọng thiết lập của hệ điều hành, bảo vệ sức khỏe người dùng."
      },
      "topicId": "css_responsive_design",
      "difficulty": "medium"
    },
    {
      "id": "css_q_14_4",
      "type": "true_false",
      "question": {
        "en": "True or False: Without `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`, mobile devices assume a virtual 980px viewport.",
        "vi": "Đúng hay Sai: Nếu thiếu thẻ `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`, các thiết bị di động sẽ tự giả lập màn hình máy tính 980px và thu nhỏ giao diện."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False",
          "vi": "Sai"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Mobile browsers default to a 980px desktop viewport to render legacy non-responsive web pages unless the viewport meta tag is declared.",
        "vi": "Trình duyệt di động mặc định đặt viewport 980px để hiển thị các web cũ chưa hỗ trợ di động, trừ khi có khai báo viewport meta tag."
      },
      "topicId": "css_responsive_design",
      "difficulty": "easy"
    },
    {
      "id": "css_q_14_5",
      "type": "single_choice",
      "question": {
        "en": "How do you write a media query that applies ONLY to screen widths between 600px and 900px inclusive using modern range syntax?",
        "vi": "Làm thế nào để viết media query chỉ áp dụng cho độ rộng màn hình từ 600px đến 900px bằng cú pháp khoảng hiện đại?"
      },
      "options": [
        {
          "en": "@media (600px <= width <= 900px)",
          "vi": "@media (600px <= width <= 900px)"
        },
        {
          "en": "@media (between: 600px and 900px)",
          "vi": "@media (between: 600px and 900px)"
        },
        {
          "en": "@media (range: 600px..900px)",
          "vi": "@media (range: 600px..900px)"
        },
        {
          "en": "@media [600px - 900px]",
          "vi": "@media [600px - 900px]"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Modern CSS range syntax allows chaining comparisons: `@media (600px <= width <= 900px)`.",
        "vi": "Cú pháp khoảng trong CSS hiện đại cho phép nối chuỗi so sánh: `@media (600px <= width <= 900px)`."
      },
      "topicId": "css_responsive_design",
      "difficulty": "medium"
    },
    {
      "id": "css_q_14_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The CSS media feature used to detect touch vs mouse hover capabilities is (hover: ________)",
        "vi": "Điền vào chỗ trống: Tính năng media query dùng để phát hiện thiết bị hỗ trợ rê chuột (hover) thay vì cảm ứng là (hover: ________)"
      },
      "fillBlankAnswers": [
        "hover",
        "none"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "@media (hover: hover) tests whether the user's primary input device can hover over elements.",
        "vi": "@media (hover: hover) kiểm tra xem thiết bị của người dùng có con trỏ chuột rê được hay không."
      },
      "topicId": "css_responsive_design",
      "difficulty": "hard"
    },
    {
      "id": "css_q_14_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following are common standard responsive breakpoints in modern web development? (Select all that apply)",
        "vi": "Những mốc điểm gãy (responsive breakpoints) nào sau đây là tiêu chuẩn phổ biến trong phát triển web hiện đại? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "640px (sm / large phones & small tablets)",
          "vi": "640px (sm / điện thoại lớn & máy tính bảng nhỏ)"
        },
        {
          "en": "768px (md / standard tablets)",
          "vi": "768px (md / máy tính bảng tiêu chuẩn)"
        },
        {
          "en": "1024px (lg / laptops & desktops)",
          "vi": "1024px (lg / máy tính xách tay & màn hình máy tính)"
        },
        {
          "en": "1280px (xl / widescreen monitors)",
          "vi": "1280px (xl / màn hình rộng)"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2,
        3
      ],
      "explanation": {
        "en": "640px, 768px, 1024px, and 1280px form the standard responsive scale (mirrored by Tailwind and Bootstrap).",
        "vi": "640px, 768px, 1024px và 1280px là hệ thống breakpoint tiêu chuẩn công nghiệp (được Tailwind và Bootstrap áp dụng)."
      },
      "topicId": "css_responsive_design",
      "difficulty": "easy"
    },
    {
      "id": "css_q_14_8",
      "type": "single_choice",
      "question": {
        "en": "What does `@media print` target in CSS?",
        "vi": "`@media print` trong CSS được dùng để nhắm tới mục đích nào?"
      },
      "options": [
        {
          "en": "Styles applied specifically when the user prints the page or exports to PDF",
          "vi": "Các quy tắc kiểu dáng áp dụng khi người dùng in trang ra giấy hoặc xuất file PDF"
        },
        {
          "en": "Text formatted in italic font",
          "vi": "Đoạn văn bản in nghiêng"
        },
        {
          "en": "Debugging logs in console",
          "vi": "In log kiểm tra trong console"
        },
        {
          "en": "High-resolution Retina displays",
          "vi": "Màn hình hiển thị độ nét cao Retina"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`@media print` styles document layout for physical paper printers and PDF export dialogs (e.g. hiding navbars, dark backgrounds).",
        "vi": "`@media print` tối ưu hóa trang khi in ra giấy hoặc lưu PDF (ví dụ ẩn thanh menu, bỏ nền tối để tiết kiệm mực)."
      },
      "topicId": "css_responsive_design",
      "difficulty": "easy"
    },
    {
      "id": "css_q_14_9",
      "type": "true_false",
      "question": {
        "en": "True or False: Media query breakpoints should be chosen based on specific phone model screen sizes (e.g. iPhone 14) rather than content needs.",
        "vi": "Đúng hay Sai: Điểm ngắt Media query nên được chọn theo từng dòng máy điện thoại cụ thể (như iPhone 14) thay vì dựa theo nhu cầu của nội dung giao diện."
      },
      "options": [
        {
          "en": "False",
          "vi": "Sai"
        },
        {
          "en": "True",
          "vi": "Đúng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Breakpoints should always be chosen where the content naturally breaks or feels cramped, never tied to specific hardware devices.",
        "vi": "Breakpoints luôn phải được đặt tại điểm mà nội dung bị chật chội hoặc gãy đổ, tuyệt đối không phụ thuộc vào kích thước của một thiết bị phần cứng cụ thể."
      },
      "topicId": "css_responsive_design",
      "difficulty": "easy"
    },
    {
      "id": "css_q_14_10",
      "type": "single_choice",
      "question": {
        "en": "Which HTML element allows serving completely different responsive image files based on media conditions?",
        "vi": "Thẻ HTML nào cho phép tải các file ảnh có kích cỡ và tỷ lệ khác nhau tùy theo điều kiện màn hình của người dùng?"
      },
      "options": [
        {
          "en": "<picture> containing multiple <source> tags and a fallback <img>",
          "vi": "Thẻ <picture> chứa nhiều thẻ <source> kèm thẻ dự phòng <img>"
        },
        {
          "en": "<responsive-img>",
          "vi": "<responsive-img>"
        },
        {
          "en": "<figure-switch>",
          "vi": "<figure-switch>"
        },
        {
          "en": "<img type=\"responsive\">",
          "vi": "<img type=\"responsive\">"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `<picture>` element pairs with `<source media=\"(min-width: ...)\">` to perform art direction and deliver optimized responsive images.",
        "vi": "Thẻ `<picture>` kết hợp cùng `<source media=\"(min-width: ...)\">` giúp phục vụ hình ảnh tối ưu theo từng kích thước màn hình."
      },
      "topicId": "css_responsive_design",
      "difficulty": "medium"
    }
  ]
};
