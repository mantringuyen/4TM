import fs from 'fs';
import path from 'path';

function saveLesson(filePath: string, varName: string, lessonObj: any) {
  const content = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessonObj, null, 2)};\n`;
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved: ${filePath}`);
}

// Lesson 14: Responsive Web Design & Mobile-First Media Queries
const lesson14 = {
  id: "css_lesson_14",
  moduleId: "css_mod_int_2",
  levelId: "intermediate",
  courseId: "css",
  order: 6,
  topicId: "css_responsive_design",
  title: {
    en: "Responsive Web Design & Mobile-First Media Queries",
    vi: "Thiết Kế Web Đáp Ứng & Media Queries Mobile-First"
  },
  summary: {
    en: "Master mobile-first development, viewport meta tag, modern media query range syntax (@media (width >= 768px)), prefers-color-scheme, and fluid layouts.",
    vi: "Làm chủ tư duy mobile-first, thẻ viewport, cú pháp khoảng hiện đại (@media (width >= 768px)), prefers-color-scheme và bố cục co giãn."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Responsive Web Design (RWD) ensures web applications deliver an optimal user experience across any device size, from watches and smartphones to 4K monitors. Modern CSS simplifies responsive logic with mathematical range media queries.",
      vi: "Thiết kế web đáp ứng (Responsive Web Design - RWD) đảm bảo ứng dụng hiển thị hoàn hảo trên mọi kích cỡ màn hình, từ đồng hồ thông minh, điện thoại tới màn hình 4K. CSS hiện đại tinh gọn các câu lệnh với cú pháp so sánh toán học trực quan."
    },
    conceptExplanation: {
      en: "The foundation of RWD starts in HTML with `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`. The 'Mobile-First' methodology writes default CSS for small screens first, layering progressive enhancements inside `@media (min-width: ...)` queries. Modern CSS Media Queries Level 4 introduces mathematical range comparisons like `@media (width >= 768px)` (equivalent to `min-width: 768px`) and range spans like `@media (768px <= width <= 1024px)`. System preference queries like `@media (prefers-color-scheme: dark)` and `@media (prefers-reduced-motion: reduce)` empower adaptive accessible experiences.",
      vi: "Nền tảng của RWD bắt đầu từ thẻ HTML `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`. Phương pháp 'Mobile-First' viết CSS mặc định cho màn hình nhỏ trước, sau đó bổ sung nâng cấp dần cho màn hình lớn bên trong các câu lệnh `@media (min-width: ...)`. Chuẩn Media Queries Level 4 mang tới cú pháp toán học trực quan như `@media (width >= 768px)` (thay thế cho `min-width: 768px`) và khoảng kẹp `@media (768px <= width <= 1024px)`. Các truy vấn hệ thống như `@media (prefers-color-scheme: dark)` và `@media (prefers-reduced-motion: reduce)` mang lại trải nghiệm tối ưu theo sở thích của người dùng."
    },
    syntax: `/* Mobile-first base styles (Default on small screens) */\n.sidebar-layout {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n/* Tablet & Desktop enhancement (Modern Range Syntax) */\n@media (width >= 768px) {\n  .sidebar-layout {\n    flex-direction: row;\n  }\n}\n\n/* Dark Mode OS Preference */\n@media (prefers-color-scheme: dark) {\n  body {\n    background-color: #0f172a;\n    color: #f8fafc;\n  }\n}`,
    examples: [
      {
        title: {
          en: "Mobile-First Responsive Grid",
          vi: "Lưới Đáp Ứng Theo Triết Lý Mobile-First"
        },
        description: {
          en: "1 column on mobile, 2 columns on tablet, 4 columns on widescreen.",
          vi: "1 cột trên điện thoại, 2 cột trên máy tính bảng, 4 cột trên màn hình máy tính."
        },
        code: `.feature-grid {\n  display: grid;\n  grid-template-columns: 1fr; /* Mobile */\n  gap: 16px;\n}\n\n@media (width >= 640px) {\n  .feature-grid {\n    grid-template-columns: repeat(2, 1fr); /* Tablet */\n  }\n}\n\n@media (width >= 1024px) {\n  .feature-grid {\n    grid-template-columns: repeat(4, 1fr); /* Desktop */\n  }\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Forgetting the viewport meta tag in index.html, causing mobile browsers to render the page as a tiny zoomed-out 980px desktop view.",
          vi: "Quên thẻ meta viewport trong index.html, khiến trình duyệt di động thu nhỏ trang thành chế độ xem máy tính 980px tí hon."
        },
        correction: {
          en: "Always include <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> in the HTML <head>.",
          vi: "Luôn đặt <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> trong thẻ <head> của HTML."
        }
      }
    ],
    tips: [
      {
        en: "Prefer (width >= 768px) range syntax over older min-width: 768px for cleaner, more readable stylesheets.",
        vi: "Ưu tiên dùng cú pháp so sánh (width >= 768px) thay vì min-width: 768px để mã nguồn ngắn gọn và dễ đọc hơn."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_14_1",
      type: "complete_code",
      title: {
        en: "Write a Mobile-First Media Query",
        vi: "Viết Media Query Theo Phong Cách Mobile-First"
      },
      instruction: {
        en: "Write a media query for width >= 768px that changes .content-flow to flex-direction: row.",
        vi: "Viết media query cho width >= 768px để đổi .content-flow sang flex-direction: row."
      },
      starterCode: `.content-flow {\n  display: flex;\n  flex-direction: column;\n}\n\n/* Add media query for width >= 768px */`,
      solutionCode: `.content-flow {\n  display: flex;\n  flex-direction: column;\n}\n\n@media (width >= 768px) {\n  .content-flow {\n    flex-direction: row;\n  }\n}`,
      hint: {
        en: "Use @media (width >= 768px) { .content-flow { flex-direction: row; } }",
        vi: "Dùng @media (width >= 768px) { .content-flow { flex-direction: row; } }"
      },
      explanation: {
        en: "Mobile-first sets column flow by default and upgrades to row flow at the 768px breakpoint.",
        vi: "Mobile-first đặt hướng xếp dọc mặc định và nâng cấp thành hàng ngang khi màn hình rộng từ 768px."
      }
    },
    {
      id: "css_ex_14_2",
      type: "fix_code",
      title: {
        en: "Support System Dark Mode Preference",
        vi: "Hỗ Trợ Chế Độ Tối Tự Động Của Hệ Thống"
      },
      instruction: {
        en: "Add a media query @media (prefers-color-scheme: dark) setting background: #0f172a and color: #f8fafc on .theme-card.",
        vi: "Thêm media query @media (prefers-color-scheme: dark) đặt background: #0f172a và color: #f8fafc cho .theme-card."
      },
      starterCode: `.theme-card {\n  background: #ffffff;\n  color: #0f172a;\n}`,
      solutionCode: `.theme-card {\n  background: #ffffff;\n  color: #0f172a;\n}\n\n@media (prefers-color-scheme: dark) {\n  .theme-card {\n    background: #0f172a;\n    color: #f8fafc;\n  }\n}`,
      hint: {
        en: "Add @media (prefers-color-scheme: dark) { .theme-card { background: #0f172a; color: #f8fafc; } }",
        vi: "Thêm @media (prefers-color-scheme: dark) { .theme-card { background: #0f172a; color: #f8fafc; } }"
      },
      explanation: {
        en: "prefers-color-scheme respects the user's operating system dark/light mode preference.",
        vi: "prefers-color-scheme tự động điều chỉnh giao diện theo chế độ sáng/tối của hệ điều hành người dùng."
      }
    }
  ],
  challenge: {
    id: "css_ch_14",
    title: {
      en: "Build a Full Responsive Navigation Bar",
      vi: "Xây Dựng Thanh Điều Hướng Đa Nền Tảng Hoàn Chỉnh"
    },
    description: {
      en: "Style .nav-menu with display: none by default. At @media (width >= 768px), set .nav-menu to display: flex, flex-direction: row, and gap: 24px.",
      vi: "Tạo kiểu cho .nav-menu với display: none mặc định. Tại @media (width >= 768px), đổi .nav-menu thành display: flex, flex-direction: row và gap: 24px."
    },
    requirements: [
      { en: ".nav-menu { display: none }", vi: ".nav-menu { display: none }" },
      { en: "@media (width >= 768px)", vi: "@media (width >= 768px)" },
      { en: "display: flex", vi: "display: flex" },
      { en: "flex-direction: row", vi: "flex-direction: row" },
      { en: "gap: 24px", vi: "gap: 24px" }
    ],
    starterCode: `/* Mobile default */\n.nav-menu {\n}\n\n/* Desktop enhancement */`,
    solutionCode: `.nav-menu {\n  display: none;\n}\n\n@media (width >= 768px) {\n  .nav-menu {\n    display: flex;\n    flex-direction: row;\n    gap: 24px;\n  }\n}`,
    hints: [
      {
        en: "Declare display: none in base styles, then use @media (width >= 768px) with display: flex.",
        vi: "Khai báo display: none ở CSS gốc, sau đó dùng @media (width >= 768px) với display: flex."
      }
    ],
    solutionExplanation: {
      en: "Hiding menu links on mobile behind a hamburger trigger and revealing them on desktop is a core RWD pattern.",
      vi: "Ẩn danh sách liên kết trên di động và tự bung thành thanh ngang trên máy tính là mẫu thiết kế đáp ứng tiêu chuẩn."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_14_1",
      type: "single_choice",
      question: {
        en: "Why is a 'Mobile-First' development workflow superior to 'Desktop-First'?",
        vi: "Tại sao quy trình phát triển 'Mobile-First' lại vượt trội hơn so với 'Desktop-First'?"
      },
      options: [
        { en: "It forces clean minimal base styles first and progressively enhances for larger screens using min-width queries, reducing CSS overrides", vi: "Nó bắt đầu từ CSS tối giản gọn nhẹ cho thiết bị yếu và nâng cấp dần lên màn hình lớn bằng min-width, giảm thiểu việc ghi đè code thừa" },
        { en: "Mobile phones cannot download large CSS files", vi: "Điện thoại không tải được file CSS lớn" },
        { en: "Desktop screens do not support CSS Grid", vi: "Màn hình máy tính không hỗ trợ CSS Grid" },
        { en: "Google bans desktop-first websites", vi: "Google cấm các website desktop-first" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Mobile-first avoids heavy CSS resets on mobile and naturally produces cleaner, more performant stylesheets.",
        vi: "Mobile-first tránh việc phải viết các lệnh hủy bỏ hiệu ứng phức tạp trên di động và tạo ra mã nguồn tinh gọn, hiệu năng cao."
      },
      topicId: "css_responsive_design",
      difficulty: "easy"
    },
    {
      id: "css_q_14_2",
      type: "single_choice",
      question: {
        en: "In modern CSS Media Queries Level 4, what is the modern equivalent of `@media (min-width: 1024px)`?",
        vi: "Trong chuẩn Media Queries Level 4 hiện đại, cú pháp nào tương đương với `@media (min-width: 1024px)`?"
      },
      options: [
        { en: "@media (width >= 1024px)", vi: "@media (width >= 1024px)" },
        { en: "@media (screen: 1024px+)", vi: "@media (screen: 1024px+)" },
        { en: "@media (from-width: 1024px)", vi: "@media (from-width: 1024px)" },
        { en: "@media (viewport: desktop)", vi: "@media (viewport: desktop)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The range syntax `@media (width >= 1024px)` replaces traditional `min-width` queries with intuitive mathematical operators.",
        vi: "Cú pháp so sánh `@media (width >= 1024px)` thay thế `min-width` bằng các toán tử toán học trực quan và dễ hiểu."
      },
      topicId: "css_responsive_design",
      difficulty: "easy"
    },
    {
      id: "css_q_14_3",
      type: "single_choice",
      question: {
        en: "What does the media query `@media (prefers-reduced-motion: reduce)` allow developers to do?",
        vi: "Media query `@media (prefers-reduced-motion: reduce)` cho phép lập trình viên làm gì?"
      },
      options: [
        { en: "Disable or minimize intense animations for users who experience motion sickness or vestibular disorders", vi: "Tắt hoặc giảm bớt các hiệu ứng chuyển động mạnh cho người dùng dễ bị say xe hoặc rối loạn tiền đình" },
        { en: "Slow down internet connection speed", vi: "Làm chậm tốc độ mạng" },
        { en: "Reduce screen brightness", vi: "Giảm độ sáng màn hình" },
        { en: "Compress video files", vi: "Nén dung lượng file video" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "prefers-reduced-motion is an essential web accessibility feature that respects user OS accessibility settings to avoid motion triggers.",
        vi: "prefers-reduced-motion là tính năng tiếp cận web quan trọng nhằm tôn trọng thiết lập của hệ điều hành, bảo vệ sức khỏe người dùng."
      },
      topicId: "css_responsive_design",
      difficulty: "medium"
    },
    {
      id: "css_q_14_4",
      type: "true_false",
      question: {
        en: "True or False: Without `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`, mobile devices assume a virtual 980px viewport.",
        vi: "Đúng hay Sai: Nếu thiếu thẻ `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`, các thiết bị di động sẽ tự giả lập màn hình máy tính 980px và thu nhỏ giao diện."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Mobile browsers default to a 980px desktop viewport to render legacy non-responsive web pages unless the viewport meta tag is declared.",
        vi: "Trình duyệt di động mặc định đặt viewport 980px để hiển thị các web cũ chưa hỗ trợ di động, trừ khi có khai báo viewport meta tag."
      },
      topicId: "css_responsive_design",
      difficulty: "easy"
    },
    {
      id: "css_q_14_5",
      type: "single_choice",
      question: {
        en: "How do you write a media query that applies ONLY to screen widths between 600px and 900px inclusive using modern range syntax?",
        vi: "Làm thế nào để viết media query chỉ áp dụng cho độ rộng màn hình từ 600px đến 900px bằng cú pháp khoảng hiện đại?"
      },
      options: [
        { en: "@media (600px <= width <= 900px)", vi: "@media (600px <= width <= 900px)" },
        { en: "@media (between: 600px and 900px)", vi: "@media (between: 600px and 900px)" },
        { en: "@media (range: 600px..900px)", vi: "@media (range: 600px..900px)" },
        { en: "@media [600px - 900px]", vi: "@media [600px - 900px]" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Modern CSS range syntax allows chaining comparisons: `@media (600px <= width <= 900px)`.",
        vi: "Cú pháp khoảng trong CSS hiện đại cho phép nối chuỗi so sánh: `@media (600px <= width <= 900px)`."
      },
      topicId: "css_responsive_design",
      difficulty: "medium"
    },
    {
      id: "css_q_14_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The CSS media feature used to detect touch vs mouse hover capabilities is (hover: ________)",
        vi: "Điền vào chỗ trống: Tính năng media query dùng để phát hiện thiết bị hỗ trợ rê chuột (hover) thay vì cảm ứng là (hover: ________)"
      },
      fillBlankAnswers: ["hover", "none"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "@media (hover: hover) tests whether the user's primary input device can hover over elements.",
        vi: "@media (hover: hover) kiểm tra xem thiết bị của người dùng có con trỏ chuột rê được hay không."
      },
      topicId: "css_responsive_design",
      difficulty: "hard"
    },
    {
      id: "css_q_14_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following are common standard responsive breakpoints in modern web development? (Select all that apply)",
        vi: "Những mốc điểm gãy (responsive breakpoints) nào sau đây là tiêu chuẩn phổ biến trong phát triển web hiện đại? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "640px (sm / large phones & small tablets)", vi: "640px (sm / điện thoại lớn & máy tính bảng nhỏ)" },
        { en: "768px (md / standard tablets)", vi: "768px (md / máy tính bảng tiêu chuẩn)" },
        { en: "1024px (lg / laptops & desktops)", vi: "1024px (lg / máy tính xách tay & màn hình máy tính)" },
        { en: "1280px (xl / widescreen monitors)", vi: "1280px (xl / màn hình rộng)" }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: "640px, 768px, 1024px, and 1280px form the standard responsive scale (mirrored by Tailwind and Bootstrap).",
        vi: "640px, 768px, 1024px và 1280px là hệ thống breakpoint tiêu chuẩn công nghiệp (được Tailwind và Bootstrap áp dụng)."
      },
      topicId: "css_responsive_design",
      difficulty: "easy"
    },
    {
      id: "css_q_14_8",
      type: "single_choice",
      question: {
        en: "What does `@media print` target in CSS?",
        vi: "`@media print` trong CSS được dùng để nhắm tới mục đích nào?"
      },
      options: [
        { en: "Styles applied specifically when the user prints the page or exports to PDF", vi: "Các quy tắc kiểu dáng áp dụng khi người dùng in trang ra giấy hoặc xuất file PDF" },
        { en: "Text formatted in italic font", vi: "Đoạn văn bản in nghiêng" },
        { en: "Debugging logs in console", vi: "In log kiểm tra trong console" },
        { en: "High-resolution Retina displays", vi: "Màn hình hiển thị độ nét cao Retina" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`@media print` styles document layout for physical paper printers and PDF export dialogs (e.g. hiding navbars, dark backgrounds).",
        vi: "`@media print` tối ưu hóa trang khi in ra giấy hoặc lưu PDF (ví dụ ẩn thanh menu, bỏ nền tối để tiết kiệm mực)."
      },
      topicId: "css_responsive_design",
      difficulty: "easy"
    },
    {
      id: "css_q_14_9",
      type: "true_false",
      question: {
        en: "True or False: Media query breakpoints should be chosen based on specific phone model screen sizes (e.g. iPhone 14) rather than content needs.",
        vi: "Đúng hay Sai: Điểm ngắt Media query nên được chọn theo từng dòng máy điện thoại cụ thể (như iPhone 14) thay vì dựa theo nhu cầu của nội dung giao diện."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Breakpoints should always be chosen where the content naturally breaks or feels cramped, never tied to specific hardware devices.",
        vi: "Breakpoints luôn phải được đặt tại điểm mà nội dung bị chật chội hoặc gãy đổ, tuyệt đối không phụ thuộc vào kích thước của một thiết bị phần cứng cụ thể."
      },
      topicId: "css_responsive_design",
      difficulty: "easy"
    },
    {
      id: "css_q_14_10",
      type: "single_choice",
      question: {
        en: "Which HTML element allows serving completely different responsive image files based on media conditions?",
        vi: "Thẻ HTML nào cho phép tải các file ảnh có kích cỡ và tỷ lệ khác nhau tùy theo điều kiện màn hình của người dùng?"
      },
      options: [
        { en: "<picture> containing multiple <source> tags and a fallback <img>", vi: "Thẻ <picture> chứa nhiều thẻ <source> kèm thẻ dự phòng <img>" },
        { en: "<responsive-img>", vi: "<responsive-img>" },
        { en: "<figure-switch>", vi: "<figure-switch>" },
        { en: "<img type=\"responsive\">", vi: "<img type=\"responsive\">" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The `<picture>` element pairs with `<source media=\"(min-width: ...)\">` to perform art direction and deliver optimized responsive images.",
        vi: "Thẻ `<picture>` kết hợp cùng `<source media=\"(min-width: ...)\">` giúp phục vụ hình ảnh tối ưu theo từng kích thước màn hình."
      },
      topicId: "css_responsive_design",
      difficulty: "medium"
    }
  ]
};

// Lesson 15: CSS Custom Properties & Dynamic Theming
const lesson15 = {
  id: "css_lesson_15",
  moduleId: "css_mod_int_2",
  levelId: "intermediate",
  courseId: "css",
  order: 7,
  topicId: "css_variables",
  title: {
    en: "CSS Custom Properties & Dynamic Theming",
    vi: "Biến CSS Custom Properties & Hệ Thống Đổi Giao Diện Động"
  },
  summary: {
    en: "Master CSS variables (--var), var() with fallbacks, DOM scoping, dynamic theming (Dark/Light mode via data-theme), and real-time JavaScript variable manipulation.",
    vi: "Làm chủ biến CSS (--var), hàm var() có giá trị dự phòng, phạm vi kế thừa DOM, chuyển đổi chế độ Sáng/Tối và điều khiển biến qua JavaScript."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS Custom Properties (commonly called CSS Variables) are live, dynamic values declared with `--` that cascade down the DOM tree. Unlike static SASS/SCSS variables, CSS variables update instantly at runtime across all matching elements.",
      vi: "CSS Custom Properties (thường gọi là Biến CSS) là các giá trị động bắt đầu bằng tiền tố `--` có khả năng kế thừa theo cấu trúc DOM. Khác với biến SASS/SCSS tĩnh lúc biên dịch, biến CSS cập nhật tức thời theo thời gian thực trên toàn bộ giao diện."
    },
    conceptExplanation: {
      en: "Declare global variables on `:root` (the root `<html>` element). Retrieve them using `var(--name, fallback)`. Variables inherit down the DOM, allowing local component overrides. By redefining variable tokens inside `[data-theme=\"dark\"]` or media queries, switching an entire application's color scheme requires changing just a single HTML attribute. JavaScript can read and write custom properties using `element.style.setProperty('--accent', '#38bdf8')` and `getComputedStyle()`.",
      vi: "Khai báo biến toàn cục trên `:root` (thẻ `<html>` gốc). Sử dụng lại bằng hàm `var(--name, giá-trị-dự-phòng)`. Biến kế thừa theo cây DOM nên bạn có thể ghi đè riêng cho từng component. Bằng cách định nghĩa lại các biến màu trong selector `[data-theme=\"dark\"]`, việc chuyển đổi toàn bộ giao diện chỉ mất đúng một thao tác đổi thuộc tính HTML. JavaScript có thể đọc và ghi biến CSS qua `element.style.setProperty('--accent', '#38bdf8')`."
    },
    syntax: `/* Global Design System Tokens */\n:root {\n  --primary: #3b82f6;\n  --surface: #ffffff;\n  --text: #0f172a;\n  --radius: 8px;\n}\n\n/* Dark Theme Token Overrides */\n[data-theme="dark"] {\n  --surface: #0f172a;\n  --text: #f8fafc;\n}\n\n.card {\n  background-color: var(--surface);\n  color: var(--text);\n  border-radius: var(--radius);\n}`,
    examples: [
      {
        title: {
          en: "Scoped Component Variable Customization",
          vi: "Ghi Đè Biến CSS Trong Phạm Vi Cục Bộ Component"
        },
        description: {
          en: "Changes the button color token for a specific danger variant without writing extra classes.",
          vi: "Đổi màu nút bấm cho biến thể nguy hiểm (danger) bằng cách ghi đè biến trực tiếp."
        },
        code: `.btn {\n  --btn-bg: #3b82f6;\n  background: var(--btn-bg);\n  color: #ffffff;\n  padding: 10px 20px;\n  border-radius: 6px;\n}\n\n.btn-danger {\n  --btn-bg: #ef4444; /* Local variable override! */\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using uppercase or missing the leading double hyphens (--), making the declaration invalid.",
          vi: "Viết hoa sai quy tắc hoặc quên 2 dấu gạch ngang (--) khiến biến không hợp lệ."
        },
        correction: {
          en: "Custom properties MUST always start with two hyphens (e.g. --brand-color).",
          vi: "Tên biến CSS BẮT BUỘC phải luôn bắt đầu bằng 2 dấu gạch ngang (ví dụ --brand-color)."
        }
      }
    ],
    tips: [
      {
        en: "Provide a fallback in var(): var(--brand, #3b82f6) to ensure UI resiliency if the variable is undefined.",
        vi: "Luôn đặt giá trị dự phòng trong var(): var(--brand, #3b82f6) để đảm bảo giao diện không bị mất màu nếu biến chưa được khai báo."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_15_1",
      type: "complete_code",
      title: {
        en: "Declare and Consume a CSS Variable",
        vi: "Khai Báo và Sử Dụng Biến CSS"
      },
      instruction: {
        en: "Declare --accent-color: #38bdf8 on :root and consume it as color on .highlight-text.",
        vi: "Khai báo --accent-color: #38bdf8 trên :root và sử dụng làm color cho .highlight-text."
      },
      starterCode: `:root {\n  /* Declare --accent-color */\n}\n\n.highlight-text {\n  /* Set color to var(--accent-color) */\n}`,
      solutionCode: `:root {\n  --accent-color: #38bdf8;\n}\n\n.highlight-text {\n  color: var(--accent-color);\n}`,
      hint: {
        en: "Declare --accent-color: #38bdf8; and use color: var(--accent-color);",
        vi: "Khai báo --accent-color: #38bdf8; và dùng color: var(--accent-color);"
      },
      explanation: {
        en: ":root variables are globally accessible across all DOM elements via var().",
        vi: "Biến trên :root có thể được truy cập và tái sử dụng ở mọi nơi thông qua hàm var()."
      }
    },
    {
      id: "css_ex_15_2",
      type: "fix_code",
      title: {
        en: "Implement Dark Theme Override",
        vi: "Thiết Lập Ghi Đè Biến Giao Diện Tối"
      },
      instruction: {
        en: "In [data-theme=\"dark\"], override --bg-card to #1e293b and --text-primary to #f8fafc.",
        vi: "Trong [data-theme=\"dark\"], ghi đè --bg-card thành #1e293b và --text-primary thành #f8fafc."
      },
      starterCode: `:root {\n  --bg-card: #ffffff;\n  --text-primary: #0f172a;\n}\n\n[data-theme="dark"] {\n  /* Override tokens */\n}`,
      solutionCode: `:root {\n  --bg-card: #ffffff;\n  --text-primary: #0f172a;\n}\n\n[data-theme="dark"] {\n  --bg-card: #1e293b;\n  --text-primary: #f8fafc;\n}`,
      hint: {
        en: "Set --bg-card: #1e293b; --text-primary: #f8fafc; inside [data-theme=\"dark\"].",
        vi: "Đặt --bg-card: #1e293b; --text-primary: #f8fafc; bên trong [data-theme=\"dark\"]."
      },
      explanation: {
        en: "Attribute-based variable switching enables seamless dark/light theme toggling.",
        vi: "Ghi đè biến theo thuộc tính cho phép chuyển đổi giao diện sáng/tối cực kỳ mượt mà."
      }
    }
  ],
  challenge: {
    id: "css_ch_15",
    title: {
      en: "Build a Scalable Design Token System",
      vi: "Xây Dựng Hệ Thống Design Token Bằng Biến CSS"
    },
    description: {
      en: "Declare :root with --space-base: 8px, --radius-md: 12px, and --brand-color: #3b82f6. Style .token-card with padding: calc(var(--space-base) * 3), border-radius: var(--radius-md), and border: 2px solid var(--brand-color).",
      vi: "Khai báo :root với --space-base: 8px, --radius-md: 12px và --brand-color: #3b82f6. Tạo kiểu cho .token-card với padding: calc(var(--space-base) * 3), border-radius: var(--radius-md) và border: 2px solid var(--brand-color)."
    },
    requirements: [
      { en: "--space-base: 8px", vi: "--space-base: 8px" },
      { en: "--radius-md: 12px", vi: "--radius-md: 12px" },
      { en: "--brand-color: #3b82f6", vi: "--brand-color: #3b82f6" },
      { en: "padding: calc(var(--space-base) * 3)", vi: "padding: calc(var(--space-base) * 3)" },
      { en: "border-radius: var(--radius-md)", vi: "border-radius: var(--radius-md)" }
    ],
    starterCode: `:root {\n}\n\n.token-card {\n}`,
    solutionCode: `:root {\n  --space-base: 8px;\n  --radius-md: 12px;\n  --brand-color: #3b82f6;\n}\n\n.token-card {\n  padding: calc(var(--space-base) * 3);\n  border-radius: var(--radius-md);\n  border: 2px solid var(--brand-color);\n}`,
    hints: [
      {
        en: "Declare variables inside :root, then use calc() and var() inside .token-card.",
        vi: "Khai báo biến trong :root, sau đó dùng calc() và var() trong .token-card."
      }
    ],
    solutionExplanation: {
      en: "Combining CSS variables with calc() creates a mathematically harmonized design system.",
      vi: "Kết hợp biến CSS với hàm calc() tạo nên một hệ thống thiết kế cân bằng toán học chuẩn mực."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_15_1",
      type: "single_choice",
      question: {
        en: "What prefix is required for all CSS Custom Property declarations?",
        vi: "Tiền tố bắt buộc cho tất cả các khai báo Biến CSS (Custom Property) là gì?"
      },
      options: [
        { en: "Two hyphens (e.g. `--theme-color`)", vi: "Hai dấu gạch ngang (ví dụ `--theme-color`)" },
        { en: "Dollar sign (`$theme-color`)", vi: "Dấu đô la (`$theme-color`)" },
        { en: "At sign (`@theme-color`)", vi: "Dấu a còng (`@theme-color`)" },
        { en: "Hash sign (`#theme-color`)", vi: "Dấu thăng (`#theme-color`)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "CSS Custom Properties must always be prefixed with two dashes (`--`).",
        vi: "Biến CSS bắt buộc phải có tiền tố là hai dấu gạch ngang liên tiếp (`--`)."
      },
      topicId: "css_variables",
      difficulty: "easy"
    },
    {
      id: "css_q_15_2",
      type: "single_choice",
      question: {
        en: "What is the primary difference between CSS Custom Properties and preprocessor variables (like SASS `$variable`)?",
        vi: "Sự khác biệt cốt lõi giữa CSS Custom Properties và biến tiền xử lý (như biến SASS `$variable`) là gì?"
      },
      options: [
        { en: "CSS variables are dynamic at runtime, inherit through the DOM cascade, and can be modified live by JavaScript", vi: "Biến CSS hoạt động động ngay lúc chạy, kế thừa theo cây DOM và có thể thay đổi trực tiếp bằng JavaScript" },
        { en: "SASS variables work in all browsers natively", vi: "Biến SASS chạy được trực tiếp trên trình duyệt" },
        { en: "CSS variables are compiled into static strings during build time", vi: "Biến CSS bị chuyển thành chuỗi tĩnh khi build" },
        { en: "CSS variables cannot store colors", vi: "Biến CSS không lưu được màu sắc" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "SASS variables are static build-time constants. CSS Custom Properties live in the browser engine and re-compute dynamically in real-time.",
        vi: "Biến SASS chỉ tồn tại lúc build file. Biến CSS sống trong trình duyệt, tự động tính toán lại tức thì khi có thay đổi."
      },
      topicId: "css_variables",
      difficulty: "medium"
    },
    {
      id: "css_q_15_3",
      type: "single_choice",
      question: {
        en: "What does the second parameter in `var(--primary, #3b82f6)` do?",
        vi: "Tham số thứ hai trong `var(--primary, #3b82f6)` có ý nghĩa gì?"
      },
      options: [
        { en: "It provides a fallback value used if `--primary` is undefined", vi: "Nó là giá trị dự phòng được dùng nếu biến `--primary` chưa được khai báo" },
        { en: "It animates to that color over time", vi: "Nó tạo hiệu ứng đổi sang màu đó sau một khoảng thời gian" },
        { en: "It acts as the dark mode color", vi: "Nó đóng vai trò là màu cho chế độ tối" },
        { en: "It triggers an error alert", vi: "Nó kích hoạt cảnh báo lỗi" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The fallback parameter provides resilience in case a custom property is missing or invalid.",
        vi: "Tham số dự phòng giúp bảo vệ giao diện nếu biến CSS bị thiếu hoặc không hợp lệ."
      },
      topicId: "css_variables",
      difficulty: "easy"
    },
    {
      id: "css_q_15_4",
      type: "true_false",
      question: {
        en: "True or False: CSS Custom Property names are case-sensitive (`--header-color` is different from `--Header-Color`).",
        vi: "Đúng hay Sai: Tên biến CSS có phân biệt chữ hoa và chữ thường (`--header-color` khác hoàn toàn với `--Header-Color`)."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Unlike standard CSS property names, custom properties are strictly case-sensitive.",
        vi: "Khác với các thuộc tính CSS thông thường, tên biến CSS phân biệt chữ hoa chữ thường một cách tuyệt đối."
      },
      topicId: "css_variables",
      difficulty: "medium"
    },
    {
      id: "css_q_15_5",
      type: "single_choice",
      question: {
        en: "How can JavaScript dynamically update a CSS variable `--theme-accent` on the root document element?",
        vi: "Làm thế nào để JavaScript cập nhật động giá trị của biến CSS `--theme-accent` trên thẻ gốc document?"
      },
      options: [
        { en: "document.documentElement.style.setProperty('--theme-accent', '#10b981')", vi: "document.documentElement.style.setProperty('--theme-accent', '#10b981')" },
        { en: "document.setCSSVar('--theme-accent', '#10b981')", vi: "document.setCSSVar('--theme-accent', '#10b981')" },
        { en: "window.css.themeAccent = '#10b981'", vi: "window.css.themeAccent = '#10b981'" },
        { en: "document.variables['--theme-accent'] = '#10b981'", vi: "document.variables['--theme-accent'] = '#10b981'" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`element.style.setProperty('--prop', value)` is the standard Web API for setting CSS custom properties via JS.",
        vi: "`element.style.setProperty('--prop', value)` là API tiêu chuẩn để gán biến CSS thông qua JavaScript."
      },
      topicId: "css_variables",
      difficulty: "medium"
    },
    {
      id: "css_q_15_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The pseudo-class matching the highest-level element in the document tree where global CSS variables are declared is :________",
        vi: "Điền vào chỗ trống: Pseudo-class đại diện cho phần tử cao nhất trong cây tài liệu nơi khai báo các biến toàn cục là :________"
      },
      fillBlankAnswers: ["root"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: ":root matches <html> with higher specificity and is the standard location for global tokens.",
        vi: ":root khớp với thẻ <html> và là vị trí tiêu chuẩn để khai báo các token thiết kế toàn cục."
      },
      topicId: "css_variables",
      difficulty: "easy"
    },
    {
      id: "css_q_15_7",
      type: "multiple_choice",
      question: {
        en: "What types of values can be stored inside a CSS Custom Property? (Select all that apply)",
        vi: "Những kiểu giá trị nào sau đây có thể lưu trữ bên trong một biến CSS? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "Colors (e.g. #3b82f6, oklch(...))", vi: "Màu sắc (ví dụ #3b82f6, oklch(...))" },
        { en: "Lengths and units (e.g. 16px, 2rem, 50%)", vi: "Độ dài và đơn vị (ví dụ 16px, 2rem, 50%)" },
        { en: "String tokens (e.g. 'Helvetica', sans-serif)", vi: "Chuỗi ký tự tên font (ví dụ 'Helvetica', sans-serif)" },
        { en: "Time durations (e.g. 300ms, 0.5s)", vi: "Thời lượng (ví dụ 300ms, 0.5s)" }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: "CSS Custom Properties can store virtually any valid CSS token including colors, dimensions, font stacks, and durations.",
        vi: "Biến CSS có thể chứa hầu như bất kỳ giá trị CSS hợp lệ nào từ màu sắc, kích thước, font chữ đến thời gian chuyển động."
      },
      topicId: "css_variables",
      difficulty: "easy"
    },
    {
      id: "css_q_15_8",
      type: "single_choice",
      question: {
        en: "What happens if a CSS variable is evaluated in a context where its value is invalid for that property (e.g. `color: var(--my-width)` where `--my-width: 20px`)?",
        vi: "Điều gì xảy ra nếu biến CSS có giá trị không hợp lệ cho thuộc tính đó (ví dụ `color: var(--my-width)` với `--my-width: 20px`)?"
      },
      options: [
        { en: "The property resets to its inherited value or initial value (as if unset)", vi: "Thuộc tính sẽ tự hoàn tác về giá trị kế thừa từ cha hoặc giá trị khởi tạo mặc định (như unset)" },
        { en: "The browser stops parsing the rest of the stylesheet", vi: "Trình duyệt dừng đọc toàn bộ file CSS" },
        { en: "The text turns bright red", vi: "Chữ tự động chuyển sang màu đỏ" },
        { en: "JavaScript throws an uncaught error", vi: "JavaScript ném ra lỗi" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Invalid at computed-value time causes the property to fall back to `inherit` (if inherited) or `initial`.",
        vi: "Khi giá trị tính toán không hợp lệ, thuộc tính sẽ tự động khôi phục về giá trị kế thừa `inherit` hoặc mặc định `initial`."
      },
      topicId: "css_variables",
      difficulty: "hard"
    },
    {
      id: "css_q_15_9",
      type: "true_false",
      question: {
        en: "True or False: CSS Custom Properties can be defined locally inside a specific component selector to scope their availability.",
        vi: "Đúng hay Sai: Biến CSS có thể được khai báo cục bộ bên trong một class component cụ thể để giới hạn phạm vi tác dụng."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Scoping variables to specific classes allows modular component design without polluting the global scope.",
        vi: "Giới hạn phạm vi biến vào từng class giúp thiết kế component mang tính đóng gói cao mà không làm ô nhiễm biến toàn cục."
      },
      topicId: "css_variables",
      difficulty: "easy"
    },
    {
      id: "css_q_15_10",
      type: "single_choice",
      question: {
        en: "What does the `@property` rule in modern CSS (CSS Houdini) bring to custom properties?",
        vi: "Cú pháp `@property` trong CSS hiện đại (CSS Houdini) mang lại tính năng gì cho biến CSS?"
      },
      options: [
        { en: "Type checking, initial fallback values, inheritance rules, and smooth interpolation/animation of variables", vi: "Kiểm tra kiểu dữ liệu, đặt giá trị khởi tạo, quy định kế thừa và cho phép tạo hiệu ứng chuyển động mượt cho biến" },
        { en: "Converts CSS to JavaScript", vi: "Biến mã CSS thành JavaScript" },
        { en: "Enables database connections in CSS", vi: "Cho phép kết nối cơ sở dữ liệu trong CSS" },
        { en: "Disables browser caching", vi: "Tắt bộ nhớ đệm trình duyệt" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`@property` registers custom properties with a syntax type (`<color>`, `<length>`, `<angle>`), enabling smooth gradient animations.",
        vi: "`@property` đăng ký biến với kiểu dữ liệu xác định (`<color>`, `<length>`, `<angle>`), cho phép tạo animation chuyển màu gradient trực tiếp."
      },
      topicId: "css_variables",
      difficulty: "hard"
    }
  ]
};

// Lesson 16: CSS Transitions & Timing Functions
const lesson16 = {
  id: "css_lesson_16",
  moduleId: "css_mod_int_2",
  levelId: "intermediate",
  courseId: "css",
  order: 8,
  topicId: "css_transitions",
  title: {
    en: "CSS Transitions & Timing Functions",
    vi: "Hiệu Ứng Chuyển Động CSS Transitions & Hàm Định Thời"
  },
  summary: {
    en: "Master transition-property, duration, delay, cubic-bezier timing functions, and smooth state changes on hover/focus.",
    vi: "Làm chủ transition-property, thời lượng duration, độ trễ delay, hàm gia tốc cubic-bezier và chuyển đổi trạng thái hover/focus mượt mà."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS Transitions provide smooth state changes when an element changes property values (such as on hover, focus, or active states). Mastering timing functions and hardware-accelerated properties creates silky, responsive UI micro-interactions.",
      vi: "CSS Transitions mang lại sự chuyển đổi mượt mà giữa các trạng thái của phần tử (như khi rê chuột hover, nhấn phím focus hoặc click active). Làm chủ các hàm gia tốc và các thuộc tính tăng tốc phần cứng giúp tạo nên vi tương tác mượt mà và tinh tế."
    },
    conceptExplanation: {
      en: "The four transition properties are `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`. The shorthand is `transition: <property> <duration> <timing-function> <delay>`. Timing functions govern acceleration: `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, or custom `cubic-bezier(x1, y1, x2, y2)`. For optimal 60fps performance, transition composite-only properties (`transform` and `opacity`) rather than layout-triggering properties (`width`, `height`, `margin`, `top`).",
      vi: "Bốn thuộc tính của transition gồm `transition-property`, `transition-duration`, `transition-timing-function` và `transition-delay`. Cú pháp viết tắt: `transition: <thuộc-tính> <thời-lượng> <hàm-gia-tốc> <độ-trễ>`. Hàm gia tốc điều khiển tốc độ: `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, hoặc `cubic-bezier(x1, y1, x2, y2)`. Để đạt hiệu năng 60fps mượt mà, luôn ưu tiên transition các thuộc tính xử lý trên GPU (`transform` và `opacity`) thay vì các thuộc tính gây tính toán lại bố cục (`width`, `height`, `margin`, `top`)."
    },
    syntax: `/* Smooth button hover interaction */\n.btn {\n  background-color: #3b82f6;\n  transform: translateY(0);\n  transition:\n    background-color 200ms ease,\n    transform 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.btn:hover {\n  background-color: #2563eb;\n  transform: translateY(-2px);\n}`,
    examples: [
      {
        title: {
          en: "Interactive Card Elevation Transition",
          vi: "Hiệu Ứng Nâng Thẻ Mượt Khi Rê Chuột"
        },
        description: {
          en: "Lifts card upwards and casts a soft shadow using high-performance GPU transitions.",
          vi: "Nâng nhẹ thẻ lên và đổ bóng mềm mại bằng transition hiệu năng cao."
        },
        code: `.interactive-card {\n  background: #1e293b;\n  transform: translateY(0);\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transition: transform 250ms ease, box-shadow 250ms ease;\n}\n\n.interactive-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using transition: all on elements with many properties, causing unintended sluggish transitions on layout resize.",
          vi: "Dùng transition: all bừa bãi khiến mọi thuộc tính đều bị trễ, làm lag giao diện khi thay đổi kích thước cửa sổ."
        },
        correction: {
          en: "Always explicitly specify the exact properties being transitioned (e.g. transition: opacity 200ms, transform 200ms).",
          vi: "Luôn chỉ đích danh các thuộc tính cần chuyển động (ví dụ transition: opacity 200ms, transform 200ms)."
        }
      }
    ],
    tips: [
      {
        en: "Always declare the transition property on the base element, not inside the :hover selector, so the transition animates smoothly both on enter AND exit.",
        vi: "Luôn khai báo transition trên class gốc của phần tử, không đặt trong selector :hover, để hiệu ứng mượt mà cả lúc đưa chuột vào LẪN lúc rút chuột ra."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_16_1",
      type: "complete_code",
      title: {
        en: "Add a Smooth Opacity Transition",
        vi: "Thêm Chuyển Động Opacity Mượt Mà"
      },
      instruction: {
        en: "Add transition: opacity 300ms ease to .fade-box so opacity changes animate smoothly.",
        vi: "Thêm transition: opacity 300ms ease vào .fade-box để sự thay đổi độ mờ diễn ra êm ái."
      },
      starterCode: `.fade-box {\n  opacity: 0.5;\n  /* Add transition */\n}\n\n.fade-box:hover {\n  opacity: 1;\n}`,
      solutionCode: `.fade-box {\n  opacity: 0.5;\n  transition: opacity 300ms ease;\n}\n\n.fade-box:hover {\n  opacity: 1;\n}`,
      hint: {
        en: "Add transition: opacity 300ms ease;",
        vi: "Thêm transition: opacity 300ms ease;"
      },
      explanation: {
        en: "transition on the base class creates smooth fading on both hover in and hover out.",
        vi: "transition đặt ở class gốc tạo hiệu ứng mờ dần mượt mà cả khi rê chuột vào lẫn khi rời ra."
      }
    },
    {
      id: "css_ex_16_2",
      type: "fix_code",
      title: {
        en: "Specify Exact Properties instead of All",
        vi: "Chỉ Định Chính Xác Thuộc Tính Chuyển Động"
      },
      instruction: {
        en: "Replace transition: all 200ms with transition: transform 200ms ease, background-color 200ms ease on .nav-tab.",
        vi: "Thay thế transition: all 200ms bằng transition: transform 200ms ease, background-color 200ms ease cho .nav-tab."
      },
      starterCode: `.nav-tab {\n  transition: all 200ms;\n}`,
      solutionCode: `.nav-tab {\n  transition: transform 200ms ease, background-color 200ms ease;\n}`,
      hint: {
        en: "Use transition: transform 200ms ease, background-color 200ms ease;",
        vi: "Dùng transition: transform 200ms ease, background-color 200ms ease;"
      },
      explanation: {
        en: "Explicit property transitions prevent unexpected layout recalculations.",
        vi: "Chỉ định rõ ràng thuộc tính giúp ngăn chặn các tính toán bố cục không mong muốn."
      }
    }
  ],
  challenge: {
    id: "css_ch_16",
    title: {
      en: "Build a Micro-Interactive Action Button",
      vi: "Xây Dựng Nút Bấm Vi Tương Tác Chuẩn UX"
    },
    description: {
      en: "Style .action-pill with background: #3b82f6, transform: scale(1), and transition: transform 150ms ease, background-color 150ms ease. On .action-pill:hover, set background: #2563eb and transform: scale(1.05). On .action-pill:active, set transform: scale(0.95).",
      vi: "Tạo kiểu .action-pill với background: #3b82f6, transform: scale(1) và transition: transform 150ms ease, background-color 150ms ease. Khi :hover, set background: #2563eb và transform: scale(1.05). Khi :active, set transform: scale(0.95)."
    },
    requirements: [
      { en: "transition: transform 150ms ease, background-color 150ms ease", vi: "transition: transform 150ms ease, background-color 150ms ease" },
      { en: ".action-pill:hover { transform: scale(1.05) }", vi: ".action-pill:hover { transform: scale(1.05) }" },
      { en: ".action-pill:active { transform: scale(0.95) }", vi: ".action-pill:active { transform: scale(0.95) }" }
    ],
    starterCode: `.action-pill {\n}\n\n.action-pill:hover {\n}\n\n.action-pill:active {\n}`,
    solutionCode: `.action-pill {\n  background: #3b82f6;\n  transform: scale(1);\n  transition: transform 150ms ease, background-color 150ms ease;\n}\n\n.action-pill:hover {\n  background: #2563eb;\n  transform: scale(1.05);\n}\n\n.action-pill:active {\n  transform: scale(0.95);\n}`,
    hints: [
      {
        en: "Declare base transition on .action-pill, scale up on hover, and scale down on active.",
        vi: "Khai báo transition gốc trên .action-pill, phóng to khi hover và thu nhỏ khi nhấn active."
      }
    ],
    solutionExplanation: {
      en: "Pairing hover enlargement with active compression creates physical tactile button feedback.",
      vi: "Kết hợp phóng to khi hover và nhấn lún khi active tạo cảm giác xúc giác đàn hồi sống động cho nút bấm."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_16_1",
      type: "single_choice",
      question: {
        en: "Where should the `transition` property be declared for smooth animations on both hover and un-hover?",
        vi: "Thuộc tính `transition` nên được khai báo ở đâu để hiệu ứng mượt mà cả lúc đưa chuột vào và lúc rời chuột ra?"
      },
      options: [
        { en: "On the base element class/rule (not inside `:hover`)", vi: "Trên selector class gốc của phần tử (không đặt bên trong `:hover`)" },
        { en: "Exclusively inside the `:hover` pseudo-class", vi: "Chỉ đặt duy nhất trong pseudo-class `:hover`" },
        { en: "Inside the HTML `<head>` tag", vi: "Trong thẻ HTML `<head>`" },
        { en: "Inside a JavaScript click event", vi: "Trong sự kiện click của JavaScript" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Declaring transition on the base element ensures the transition runs in both directions (forward on hover, reverse on un-hover).",
        vi: "Đặt transition ở class gốc đảm bảo hiệu ứng chạy mượt cả 2 chiều (tiến lên khi hover và lùi về khi bỏ chuột)."
      },
      topicId: "css_transitions",
      difficulty: "easy"
    },
    {
      id: "css_q_16_2",
      type: "single_choice",
      question: {
        en: "Which pair of CSS properties deliver the highest 60fps animation performance on modern browser GPUs?",
        vi: "Cặp thuộc tính CSS nào mang lại hiệu năng chuyển động 60fps mượt nhất nhờ xử lý trực tiếp trên GPU của trình duyệt?"
      },
      options: [
        { en: "`transform` and `opacity`", vi: "`transform` và `opacity`" },
        { en: "`width` and `height`", vi: "`width` và `height`" },
        { en: "`top` and `left`", vi: "`top` và `left`" },
        { en: "`margin` and `padding`", vi: "`margin` và `padding`" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Transform and Opacity are handled directly in the GPU compositor layer without triggering expensive layout recalculations or paint reflows.",
        vi: "Transform và Opacity được xử lý trực tiếp ở tầng GPU compositor mà không kích hoạt tính toán lại bố cục hay vẽ lại trang."
      },
      topicId: "css_transitions",
      difficulty: "medium"
    },
    {
      id: "css_q_16_3",
      type: "single_choice",
      question: {
        en: "What does the `ease-out` timing function do?",
        vi: "Hàm định thời `ease-out` tạo ra kiểu chuyển động như thế nào?"
      },
      options: [
        { en: "Starts quickly and decelerates smoothly toward the end", vi: "Bắt đầu nhanh và giảm tốc êm ái khi về đích" },
        { en: "Maintains a constant static speed throughout", vi: "Duy trì một tốc độ đều chằn chặn từ đầu đến cuối" },
        { en: "Starts slowly and accelerates rapidly at the end", vi: "Bắt đầu chậm và tăng tốc đột ngột ở đoạn cuối" },
        { en: "Repeats infinitely", vi: "Lặp lại vô tận" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`ease-out` decelerates toward the conclusion, which feels natural for incoming UI elements.",
        vi: "`ease-out` giảm tốc từ từ về cuối, tạo cảm giác tự nhiên như vật thể dừng lại trong thực tế."
      },
      topicId: "css_transitions",
      difficulty: "easy"
    },
    {
      id: "css_q_16_4",
      type: "true_false",
      question: {
        en: "True or False: Using `transition: all 0.3s;` on everything is an industry best practice.",
        vi: "Đúng hay Sai: Lạm dụng `transition: all 0.3s;` cho tất cả mọi thứ là chuẩn mực tốt nhất."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "transition: all incurs performance penalties and can cause unintended transitions on resize or font loading. Explicit property lists are required.",
        vi: "transition: all làm giảm hiệu năng và gây ra các hiệu ứng trễ không mong muốn khi đổi kích cỡ cửa sổ. Cần chỉ rõ từng thuộc tính."
      },
      topicId: "css_transitions",
      difficulty: "easy"
    },
    {
      id: "css_q_16_5",
      type: "single_choice",
      question: {
        en: "In the shorthand `transition: transform 300ms ease 100ms;`, what does `100ms` represent?",
        vi: "Trong cú pháp viết tắt `transition: transform 300ms ease 100ms;`, giá trị `100ms` đại diện cho điều gì?"
      },
      options: [
        { en: "transition-delay (the waiting period before the transition starts)", vi: "transition-delay (thời gian chờ trước khi hiệu ứng bắt đầu chạy)" },
        { en: "transition-duration", vi: "transition-duration" },
        { en: "frame rate", vi: "tốc độ khung hình" },
        { en: "repeat count", vi: "số lần lặp" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "In CSS transition shorthand, the second time value is always parsed as `transition-delay`.",
        vi: "Trong cú pháp viết tắt transition, giá trị thời gian thứ hai luôn được hiểu là `transition-delay`."
      },
      topicId: "css_transitions",
      difficulty: "medium"
    },
    {
      id: "css_q_16_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The CSS function that allows defining custom 4-point Bézier acceleration curves is cubic-________(x1, y1, x2, y2)",
        vi: "Điền vào chỗ trống: Hàm CSS cho phép tùy chỉnh đường cong gia tốc Bézier 4 điểm là cubic-________(x1, y1, x2, y2)"
      },
      fillBlankAnswers: ["bezier"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "cubic-bezier() creates tailored physics-based spring and easing curves.",
        vi: "cubic-bezier() tạo các đường cong gia tốc đàn hồi tinh tế theo ý muốn."
      },
      topicId: "css_transitions",
      difficulty: "easy"
    },
    {
      id: "css_q_16_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following are animatable/transitionable CSS properties? (Select all that apply)",
        vi: "Những thuộc tính CSS nào sau đây có thể tạo hiệu ứng transition chuyển đổi mượt mà? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "opacity", vi: "opacity" },
        { en: "transform", vi: "transform" },
        { en: "background-color", vi: "background-color" },
        { en: "display (e.g. none to block)", vi: "display (ví dụ none sang block)" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "opacity, transform, and background-color interpolate smoothly. `display` is discrete (cannot interpolate intermediate states).",
        vi: "opacity, transform và background-color chuyển đổi liên tục. `display` là thuộc tính rời rạc (không thể tính toán trạng thái trung gian)."
      },
      topicId: "css_transitions",
      difficulty: "medium"
    },
    {
      id: "css_q_16_8",
      type: "single_choice",
      question: {
        en: "How can you transition an element from hidden to visible smoothly using modern CSS?",
        vi: "Làm thế nào để chuyển đổi một phần tử từ ẩn sang hiện mượt mà bằng CSS hiện đại?"
      },
      options: [
        { en: "Transition `opacity` and `visibility: hidden/visible` (or `transition: opacity, display` with `@starting-style` in modern CSS)", vi: "Transition kết hợp `opacity` và `visibility: hidden/visible` (hoặc dùng `@starting-style` trong CSS mới)" },
        { en: "Set display: block with transition: display 1s", vi: "Đặt display: block với transition: display 1s" },
        { en: "Transitions cannot make elements visible", vi: "Transition không thể làm hiện phần tử" },
        { en: "Use z-index: -9999 to 9999", vi: "Dùng z-index từ -9999 sang 9999" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Combining opacity with visibility (or modern `@starting-style`) prevents keyboard focus on hidden elements while allowing smooth fades.",
        vi: "Kết hợp opacity với visibility giúp ẩn hoàn toàn phần tử khỏi bàn phím tab trong khi vẫn giữ hiệu ứng mờ dần đẹp mắt."
      },
      topicId: "css_transitions",
      difficulty: "hard"
    },
    {
      id: "css_q_16_9",
      type: "true_false",
      question: {
        en: "True or False: Multiple property transitions can be comma-separated inside a single `transition` declaration.",
        vi: "Đúng hay Sai: Có thể khai báo nhiều hiệu ứng chuyển động cho các thuộc tính khác nhau ngăn cách bởi dấu phẩy trong cùng một dòng `transition`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Comma-separated transitions (e.g. `transition: opacity 200ms, transform 300ms ease`) are fully supported.",
        vi: "Khai báo ngăn cách bằng dấu phẩy (như `transition: opacity 200ms, transform 300ms ease`) hoàn toàn hợp lệ."
      },
      topicId: "css_transitions",
      difficulty: "easy"
    },
    {
      id: "css_q_16_10",
      type: "single_choice",
      question: {
        en: "What happens if `transition-duration` is set to `0s` (or omitted)?",
        vi: "Điều gì xảy ra nếu `transition-duration` được đặt là `0s` (hoặc bị bỏ qua)?"
      },
      options: [
        { en: "The property change happens instantaneously with no transition animation", vi: "Thuộc tính thay đổi tức thì ngay lập tức mà không có bất kỳ hiệu ứng chuyển động nào" },
        { en: "The transition lasts forever", vi: "Hiệu ứng chạy mãi mãi không dừng" },
        { en: "The element disappears", vi: "Phần tử biến mất" },
        { en: "The browser freezes", vi: "Trình duyệt bị treo" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "A duration of 0s executes property updates instantly.",
        vi: "Thời lượng 0s khiến các thay đổi thuộc tính có hiệu lực ngay lập tức."
      },
      topicId: "css_transitions",
      difficulty: "easy"
    }
  ]
};

// Lesson 17: 2D & 3D Transforms
const lesson17 = {
  id: "css_lesson_17",
  moduleId: "css_mod_int_2",
  levelId: "intermediate",
  courseId: "css",
  order: 9,
  topicId: "css_transforms",
  title: {
    en: "2D and 3D Transforms & Perspective",
    vi: "Biến Đổi Không Gian 2D, 3D & Hiệu Ứng Phối Cảnh Perspective"
  },
  summary: {
    en: "Master translate(), rotate(), scale(), skew(), individual transform properties, transform-origin, perspective, and 3D card flips.",
    vi: "Làm chủ translate(), rotate(), scale(), skew(), các thuộc tính transform độc lập mới, transform-origin, perspective và hiệu ứng lật thẻ 3D."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS Transforms allow elements to be translated, rotated, scaled, and skewed in 2D and 3D coordinate space without disturbing surrounding document flow. Executed entirely on the GPU, transforms deliver unmatched rendering performance.",
      vi: "CSS Transforms cho phép dịch chuyển, xoay, phóng to thu nhỏ và kéo nghiêng phần tử trong không gian 2D và 3D mà không làm xáo trộn luồng bố cục xung quanh. Được thực thi trực tiếp trên GPU, transform mang lại hiệu năng render tối đa."
    },
    conceptExplanation: {
      en: "The `transform` property supports functions like `translate(x, y)`, `translateX()`, `translateY()`, `scale(factor)`, `rotate(deg)`, and `skew(deg)`. Modern CSS also supports **Individual Transform Properties** (`translate: 10px 20px;`, `rotate: 45deg;`, `scale: 1.1;`) preventing property collisions during animations. In 3D space, `perspective` defines the distance between the viewer and the z-plane, `transform-style: preserve-3d` allows child 3D elements to retain their depth, and `backface-visibility: hidden` hides the rear face of rotating cards.",
      vi: "Thuộc tính `transform` hỗ trợ các hàm `translate(x, y)`, `translateX()`, `translateY()`, `scale(hệ-số)`, `rotate(độ)`, và `skew(độ)`. CSS hiện đại bổ sung các **Thuộc Tính Transform Độc Lập** (`translate: 10px 20px;`, `rotate: 45deg;`, `scale: 1.1;`) giúp việc tạo animation không bị ghi đè lẫn nhau. Trong không gian 3D, `perspective` xác định khoảng cách phối cảnh mắt nhìn, `transform-style: preserve-3d` giữ nguyên không gian chiều sâu cho các thẻ con, và `backface-visibility: hidden` ẩn mặt sau khi lật thẻ."
    },
    syntax: `/* Modern Independent Transform Properties */\n.interactive-icon {\n  scale: 1;\n  rotate: 0deg;\n  transition: scale 200ms ease, rotate 200ms ease;\n}\n\n.interactive-icon:hover {\n  scale: 1.15;\n  rotate: 15deg;\n}\n\n/* 3D Perspective Card Container */\n.perspective-scene {\n  perspective: 1000px;\n}`,
    examples: [
      {
        title: {
          en: "3D Flipping Business Card",
          vi: "Hiệu Ứng Lật Danh Thiếp 3D Đỉnh Cao"
        },
        description: {
          en: "Flips card 180 degrees around Y-axis revealing the backside.",
          vi: "Lật thẻ 180 độ quanh trục Y để lộ mặt sau danh thiếp sống động."
        },
        code: `.flip-card {\n  perspective: 1000px;\n}\n\n.flip-inner {\n  transform-style: preserve-3d;\n  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.flip-card:hover .flip-inner {\n  transform: rotateY(180deg);\n}\n\n.flip-front,\n.flip-back {\n  backface-visibility: hidden;\n}\n\n.flip-back {\n  transform: rotateY(180deg);\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Overwriting earlier transform functions when applying hover effects (e.g. hover setting rotate(15deg) accidentally wiping out an existing translateY(-50%)).",
          vi: "Ghi đè mất các hàm transform trước đó khi hover (ví dụ đặt rotate(15deg) làm mất luôn translateY(-50%) căn giữa)."
        },
        correction: {
          en: "Use modern independent transform properties (translate, rotate, scale) or re-declare the full transform chain.",
          vi: "Dùng các thuộc tính transform độc lập mới (translate, rotate, scale) hoặc viết lại đầy đủ chuỗi hàm."
        }
      }
    ],
    tips: [
      {
        en: "Use transform-origin to change the pivot point of rotations and scales (e.g. transform-origin: top left).",
        vi: "Dùng transform-origin để đổi tâm điểm xoay hoặc phóng to của phần tử (ví dụ transform-origin: top left)."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_17_1",
      type: "complete_code",
      title: {
        en: "Apply 2D Translate and Scale",
        vi: "Áp Dụng Dịch Chuyển Translate và Phóng To Scale"
      },
      instruction: {
        en: "Add transform: translateY(-8px) scale(1.02) to .card-lift:hover.",
        vi: "Thêm transform: translateY(-8px) scale(1.02) cho .card-lift:hover."
      },
      starterCode: `.card-lift:hover {\n  /* Apply transform */\n}`,
      solutionCode: `.card-lift:hover {\n  transform: translateY(-8px) scale(1.02);\n}`,
      hint: {
        en: "Use transform: translateY(-8px) scale(1.02);",
        vi: "Dùng transform: translateY(-8px) scale(1.02);"
      },
      explanation: {
        en: "Combining translate and scale creates an elevated floating card effect.",
        vi: "Kết hợp translate và scale tạo hiệu ứng thẻ nổi bồng bềnh lên không trung."
      }
    },
    {
      id: "css_ex_17_2",
      type: "fix_code",
      title: {
        en: "Enable 3D Perspective Preservation",
        vi: "Kích Hoạt Bảo Lưu Không Gian 3D"
      },
      instruction: {
        en: "Add transform-style: preserve-3d to .flip-card-inner.",
        vi: "Thêm transform-style: preserve-3d vào .flip-card-inner."
      },
      starterCode: `.flip-card-inner {\n  transition: transform 500ms;\n}`,
      solutionCode: `.flip-card-inner {\n  transform-style: preserve-3d;\n  transition: transform 500ms;\n}`,
      hint: {
        en: "Add transform-style: preserve-3d;",
        vi: "Thêm transform-style: preserve-3d;"
      },
      explanation: {
        en: "preserve-3d ensures nested children exist in 3D coordinate space.",
        vi: "preserve-3d đảm bảo các phần tử con được duy trì trong không gian tọa độ 3D thực."
      }
    }
  ],
  challenge: {
    id: "css_ch_17",
    title: {
      en: "Build a 3D Tilt Badge Component",
      vi: "Xây Dựng Huy Hiệu Nghiêng 3D Perspective"
    },
    description: {
      en: "Style .badge-stage with perspective: 800px. Style .badge-3d with transform: rotateX(10deg) rotateY(-15deg), transform-origin: center, and transition: transform 300ms ease. On .badge-3d:hover, set transform: rotateX(0deg) rotateY(0deg) scale(1.1).",
      vi: "Tạo kiểu cho .badge-stage với perspective: 800px. Tạo kiểu cho .badge-3d với transform: rotateX(10deg) rotateY(-15deg), transform-origin: center và transition: transform 300ms ease. Khi :hover, set transform: rotateX(0deg) rotateY(0deg) scale(1.1)."
    },
    requirements: [
      { en: "perspective: 800px", vi: "perspective: 800px" },
      { en: "rotateX(10deg) rotateY(-15deg)", vi: "rotateX(10deg) rotateY(-15deg)" },
      { en: "transform-origin: center", vi: "transform-origin: center" },
      { en: "rotateX(0deg) rotateY(0deg) scale(1.1)", vi: "rotateX(0deg) rotateY(0deg) scale(1.1)" }
    ],
    starterCode: `.badge-stage {\n}\n\n.badge-3d {\n}\n\n.badge-3d:hover {\n}`,
    solutionCode: `.badge-stage {\n  perspective: 800px;\n}\n\n.badge-3d {\n  transform: rotateX(10deg) rotateY(-15deg);\n  transform-origin: center;\n  transition: transform 300ms ease;\n}\n\n.badge-3d:hover {\n  transform: rotateX(0deg) rotateY(0deg) scale(1.1);\n}`,
    hints: [
      {
        en: "Set perspective on the container and 3D rotate transforms on the child badge.",
        vi: "Đặt perspective trên khung cha và transform rotate 3D trên huy hiệu con."
      }
    ],
    solutionExplanation: {
      en: "Perspective provides real visual depth that reacts dynamically to hover interactions.",
      vi: "Perspective tạo chiều sâu thực tế sống động khi tương tác rê chuột."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_17_1",
      type: "single_choice",
      question: {
        en: "How does applying `transform: translate(20px, 30px);` affect surrounding document flow?",
        vi: "Việc áp dụng `transform: translate(20px, 30px);` ảnh hưởng như thế nào đến luồng bố cục của các phần tử xung quanh?"
      },
      options: [
        { en: "It does NOT affect surrounding flow; adjacent elements remain in their original positions", vi: "Nó HOÀN TOÀN KHÔNG làm xáo trộn luồng bố cục; các phần tử xung quanh vẫn đứng nguyên vị trí ban đầu" },
        { en: "It pushes all neighboring elements down by 30px", vi: "Nó đẩy tất cả phần tử bên cạnh dịch xuống 30px" },
        { en: "It removes the element from the DOM", vi: "Nó xóa phần tử khỏi cây DOM" },
        { en: "It causes an immediate reflow repaint", vi: "Nó gây ra tính toán lại bố cục toàn trang" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "CSS Transforms alter visual presentation purely on the compositor without impacting surrounding layout geometry.",
        vi: "CSS Transform chỉ thay đổi vị trí thị giác trên GPU mà không làm dịch chuyển các phần tử xung quanh."
      },
      topicId: "css_transforms",
      difficulty: "easy"
    },
    {
      id: "css_q_17_2",
      type: "single_choice",
      question: {
        en: "What does the `perspective` property define in 3D CSS?",
        vi: "Thuộc tính `perspective` xác định điều gì trong không gian 3D CSS?"
      },
      options: [
        { en: "The distance between the viewer's eye and the z=0 plane, governing the intensity of 3D depth perception", vi: "Khoảng cách từ mắt người xem tới mặt phẳng z=0, quyết định độ sâu chân thực của hiệu ứng 3D" },
        { en: "The transparency level of 3D objects", vi: "Độ trong suốt của vật thể 3D" },
        { en: "The color of the 3D lighting shadow", vi: "Màu của ánh sáng bóng đổ 3D" },
        { en: "The animation speed of 3D objects", vi: "Tốc độ xoay của vật thể 3D" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Lower perspective values (e.g. 400px) create dramatic, extreme 3D foreshortening; higher values (e.g. 1200px) create subtle, gentle depth.",
        vi: "Giá trị perspective càng nhỏ (như 400px) thì hiệu ứng 3D càng gắt; giá trị lớn (như 1200px) tạo chiều sâu nhẹ nhàng tự nhiên."
      },
      topicId: "css_transforms",
      difficulty: "medium"
    },
    {
      id: "css_q_17_3",
      type: "single_choice",
      question: {
        en: "What does `backface-visibility: hidden;` accomplish in 3D card flips?",
        vi: "`backface-visibility: hidden;` có tác dụng gì trong hiệu ứng lật thẻ 3D?"
      },
      options: [
        { en: "Hides the element when it is rotated to face away from the user", vi: "Ẩn phần tử đi khi nó bị xoay quay lưng lại với mắt người xem" },
        { en: "Removes the background image", vi: "Xóa hình nền" },
        { en: "Hides the card border", vi: "Ẩn viền của thẻ" },
        { en: "Disables mouse clicking on the back", vi: "Tắt click chuột ở mặt sau" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "When backface-visibility is hidden, the rear side of the layer is transparent when rotated 180 degrees.",
        vi: "Khi đặt backface-visibility: hidden, mặt sau của thẻ sẽ trong suốt tàng hình khi bị xoay 180 độ."
      },
      topicId: "css_transforms",
      difficulty: "easy"
    },
    {
      id: "css_q_17_4",
      type: "true_false",
      question: {
        en: "True or False: Modern CSS allows declaring `rotate: 45deg;` directly as an independent property without using the `transform` shorthand.",
        vi: "Đúng hay Sai: CSS hiện đại cho phép khai báo trực tiếp `rotate: 45deg;` như một thuộc tính độc lập mà không cần qua cú pháp `transform: rotate(45deg)`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Modern browsers natively support independent `translate`, `rotate`, and `scale` properties.",
        vi: "Các trình duyệt hiện đại hỗ trợ đầy đủ các thuộc tính độc lập `translate`, `rotate` và `scale`."
      },
      topicId: "css_transforms",
      difficulty: "easy"
    },
    {
      id: "css_q_17_5",
      type: "single_choice",
      question: {
        en: "What is the default value of `transform-origin` on all HTML elements?",
        vi: "Giá trị mặc định của `transform-origin` trên tất cả các phần tử HTML là gì?"
      },
      options: [
        { en: "50% 50% (or `center center`)", vi: "50% 50% (hoặc `center center` - chính giữa tâm phần tử)" },
        { en: "0 0 (top-left corner)", vi: "0 0 (góc trên bên trái)" },
        { en: "100% 100% (bottom-right corner)", vi: "100% 100% (góc dưới bên phải)" },
        { en: "0 50%", vi: "0 50%" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "By default, elements rotate and scale from their exact geometric center (50% 50% 0).",
        vi: "Mặc định mọi phần tử xoay và phóng to từ chính giữa tâm hình học của nó (50% 50% 0)."
      },
      topicId: "css_transforms",
      difficulty: "easy"
    },
    {
      id: "css_q_17_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To preserve 3D perspective depth across nested children inside a rotated parent, declare transform-style: preserve-________",
        vi: "Điền vào chỗ trống: Để bảo lưu không gian 3D cho các thẻ con bên trong thẻ cha bị xoay, khai báo transform-style: preserve-________"
      },
      fillBlankAnswers: ["3d", "3D"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "transform-style: preserve-3d retains child 3D planes.",
        vi: "transform-style: preserve-3d duy trì không gian 3 chiều cho các thẻ con."
      },
      topicId: "css_transforms",
      difficulty: "medium"
    },
    {
      id: "css_q_17_7",
      type: "multiple_choice",
      question: {
        en: "Which functions are valid 2D/3D transform functions in CSS? (Select all that apply)",
        vi: "Những hàm nào sau đây là hàm transform 2D/3D hợp lệ trong CSS? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "translate3d(x, y, z)", vi: "translate3d(x, y, z)" },
        { en: "rotateY(angle)", vi: "rotateY(angle)" },
        { en: "scale(x, y)", vi: "scale(x, y)" },
        { en: "morph(shape)", vi: "morph(shape)" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "translate3d, rotateY, and scale are standard transform functions. morph() is not a CSS transform function.",
        vi: "translate3d, rotateY và scale là hàm transform chuẩn. morph() không tồn tại trong CSS transform."
      },
      topicId: "css_transforms",
      difficulty: "easy"
    },
    {
      id: "css_q_17_8",
      type: "single_choice",
      question: {
        en: "How do you horizontally and vertically center an absolutely positioned element with unknown dimensions using transforms?",
        vi: "Làm thế nào để căn giữa tuyệt đối một phần tử absolute có kích thước chưa biết trước bằng transform?"
      },
      options: [
        { en: "top: 50%; left: 50%; transform: translate(-50%, -50%);", vi: "top: 50%; left: 50%; transform: translate(-50%, -50%);" },
        { en: "margin: auto 50%;", vi: "margin: auto 50%;" },
        { en: "center: true; transform: center();", vi: "center: true; transform: center();" },
        { en: "top: calc(50% - 100px);", vi: "top: calc(50% - 100px);" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "top/left: 50% positions the top-left corner at the center; `translate(-50%, -50%)` shifts the element back by half its own width and height.",
        vi: "top/left: 50% đưa góc trên-trái vào giữa; `translate(-50%, -50%)` kéo ngược lại 50% kích thước của chính phần tử để tâm trùng khớp."
      },
      topicId: "css_transforms",
      difficulty: "medium"
    },
    {
      id: "css_q_17_9",
      type: "true_false",
      question: {
        en: "True or False: Any element with a CSS `transform` applied creates a new containing block for absolutely positioned descendants and a new Stacking Context.",
        vi: "Đúng hay Sai: Bất kỳ phần tử nào có áp dụng `transform` đều tự động trở thành một containing block mới cho các con absolute và tạo một Stacking Context mới."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "According to CSS specs, any transform other than `none` establishes a new local coordinate system, containing block, and stacking context.",
        vi: "Theo đặc tả CSS, mọi giá trị transform khác `none` đều tạo ra hệ tọa độ mới, containing block mới và stacking context mới."
      },
      topicId: "css_transforms",
      difficulty: "hard"
    },
    {
      id: "css_q_17_10",
      type: "single_choice",
      question: {
        en: "What does `transform: skewX(15deg);` do to an element?",
        vi: "`transform: skewX(15deg);` tác động như thế nào lên phần tử?"
      },
      options: [
        { en: "Distorts the element along the X-axis by shearing it by 15 degrees", vi: "Kéo xiên/nghiêng méo phần tử dọc theo trục X một góc 15 độ (tạo hình bình hành)" },
        { en: "Rotates the element 15 degrees clockwise", vi: "Xoay phần tử 15 độ theo chiều kim đồng hồ" },
        { en: "Scales the element width by 15%", vi: "Tăng chiều rộng 15%" },
        { en: "Adds a 15px border radius", vi: "Bo góc 15px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`skewX` slants the vertical edges of an element along the horizontal axis.",
        vi: "`skewX` kéo nghiêng các cạnh thẳng đứng dọc theo trục hoành tạo hiệu ứng chữ hoặc khung nghiêng phong cách thể thao."
      },
      topicId: "css_transforms",
      difficulty: "easy"
    }
  ]
};

// Lesson 18: Keyframe Animations & GPU Optimization
const lesson18 = {
  id: "css_lesson_18",
  moduleId: "css_mod_int_2",
  levelId: "intermediate",
  courseId: "css",
  order: 10,
  topicId: "css_animations",
  title: {
    en: "Keyframe Animations & GPU Optimization",
    vi: "Hiệu Ứng Hoạt Họa @keyframes & Tối Ưu Hóa GPU"
  },
  summary: {
    en: "Master @keyframes, animation-fill-mode, iteration-count, will-change property, reduced-motion accessibility, and infinite spinners.",
    vi: "Làm chủ @keyframes, animation-fill-mode, iteration-count, thuộc tính will-change, tối ưu khả năng tiếp cận và tạo vòng xoay spinner vô tận."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS Keyframe Animations (`@keyframes`) enable complex, multi-stage, recurring UI motion sequences without JavaScript runtime overhead. Leveraging GPU compositing properties guarantees fluid 60fps performance on all devices.",
      vi: "Hiệu ứng hoạt họa CSS Keyframe (`@keyframes`) cho phép xây dựng các chuỗi chuyển động đa bước phức tạp lặp đi lặp lại mà không tốn tài nguyên chạy JavaScript. Tận dụng xử lý trên GPU đảm bảo hoạt họa luôn đạt 60fps mượt mà trên mọi thiết bị."
    },
    conceptExplanation: {
      en: "Define animation sequences using `@keyframes <name> { from / to / 0% / 50% / 100% }`. Bind to elements using `animation: <name> <duration> <timing-function> <delay> <iteration-count> <direction> <fill-mode>`. Key properties include: `animation-iteration-count: infinite`, `animation-fill-mode: forwards` (retains the final keyframe styles after animation ends), and `animation-play-state: paused | running`. To prevent jank, use `will-change: transform` sparingly on active animating layers.",
      vi: "Định nghĩa chuỗi hoạt họa bằng cú pháp `@keyframes <tên> { 0% { ... } 50% { ... } 100% { ... } }`. Gán vào phần tử bằng `animation: <tên> <thời-lượng> <hàm-gia-tốc> <độ-trễ> <số-lần-lặp> <hướng> <fill-mode>`. Các thuộc tính cốt lõi gồm: `animation-iteration-count: infinite` (lặp vô tận), `animation-fill-mode: forwards` (giữ nguyên kiểu dáng của khung hình cuối khi kết thúc) và `animation-play-state: paused`. Để tránh giật lag, dùng `will-change: transform` một cách hợp lý trên các layer chuyển động."
    },
    syntax: `/* Infinite Loading Spinner */\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(255, 255, 255, 0.2);\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 800ms linear infinite;\n}`,
    examples: [
      {
        title: {
          en: "Pulse Radar Ping Animation",
          vi: "Hiệu Ứng Sóng Radar Lan Tỏa Vô Tận"
        },
        description: {
          en: "Creates a radiating sonar pulse expanding outward and fading.",
          vi: "Tạo vòng sóng sonar mở rộng ra ngoài và mờ dần liên tục."
        },
        code: `@keyframes pulse-ring {\n  0% {\n    transform: scale(0.95);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(1.5);\n    opacity: 0;\n  }\n}\n\n.ping-dot {\n  position: relative;\n}\n\n.ping-dot::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background: #22c55e;\n  animation: pulse-ring 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Overusing will-change: all across many elements, exhausting device GPU memory.",
          vi: "Lạm dụng will-change: all trên quá nhiều phần tử gây tràn bộ nhớ GPU của thiết bị."
        },
        correction: {
          en: "Apply will-change only to specific animating properties (e.g. will-change: transform) and only on elements with active animations.",
          vi: "Chỉ đặt will-change cho đúng thuộc tính chuyển động (will-change: transform) trên các phần tử đang chạy animation."
        }
      }
    ],
    tips: [
      {
        en: "Always respect prefers-reduced-motion by setting animation-duration: 0.01ms or animation: none for accessibility compliance.",
        vi: "Luôn hỗ trợ prefers-reduced-motion bằng cách đặt animation: none hoặc giảm thời lượng về 0 để đảm bảo chuẩn tiếp cận."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_18_1",
      type: "complete_code",
      title: {
        en: "Create an Infinite Rotate Spinner",
        vi: "Tạo Vòng Xoay Spinner Lặp Vô Tận"
      },
      instruction: {
        en: "Define @keyframes spin from rotate(0deg) to rotate(360deg) and apply animation: spin 1s linear infinite to .loader.",
        vi: "Định nghĩa @keyframes spin từ rotate(0deg) tới rotate(360deg) và gán animation: spin 1s linear infinite cho .loader."
      },
      starterCode: `/* Define keyframes spin and apply to .loader */\n.loader {\n}`,
      solutionCode: `@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loader {\n  animation: spin 1s linear infinite;\n}`,
      hint: {
        en: "Write @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } and animation: spin 1s linear infinite;",
        vi: "Viết @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } và animation: spin 1s linear infinite;"
      },
      explanation: {
        en: "linear infinite guarantees smooth unbroken rotation around the center axis.",
        vi: "linear infinite đảm bảo chuyển động quay tròn đều không bị giật khựng."
      }
    },
    {
      id: "css_ex_18_2",
      type: "fix_code",
      title: {
        en: "Retain Final Animation Frame",
        vi: "Giữ Nguyên Trạng Thái Khung Hình Cuối"
      },
      instruction: {
        en: "Add animation-fill-mode: forwards to .slide-entry so it does not snap back to its initial position when finished.",
        vi: "Thêm animation-fill-mode: forwards vào .slide-entry để phần tử không bị nhảy ngược về vị trí ban đầu khi chạy xong."
      },
      starterCode: `.slide-entry {\n  animation: slideIn 500ms ease-out;\n}`,
      solutionCode: `.slide-entry {\n  animation: slideIn 500ms ease-out forwards;\n}`,
      hint: {
        en: "Add forwards to the animation shorthand or set animation-fill-mode: forwards;",
        vi: "Thêm forwards vào cuối dòng animation hoặc đặt animation-fill-mode: forwards;"
      },
      explanation: {
        en: "forwards freezes the element at its final 100% keyframe state upon completion.",
        vi: "forwards giữ phần tử đứng yên ở trạng thái 100% cuối cùng sau khi hoàn tất hoạt họa."
      }
    }
  ],
  challenge: {
    id: "css_ch_18",
    title: {
      en: "Build a Smooth Slide-In Notification Banner",
      vi: "Xây Dựng Thông Báo Trượt Xuống Mượt Mà"
    },
    description: {
      en: "Define @keyframes slideDown from translateY(-100%) opacity 0 to translateY(0) opacity 1. Style .toast-banner with animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards.",
      vi: "Định nghĩa @keyframes slideDown từ translateY(-100%) opacity 0 tới translateY(0) opacity 1. Tạo kiểu cho .toast-banner với animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards."
    },
    requirements: [
      { en: "@keyframes slideDown", vi: "@keyframes slideDown" },
      { en: "translateY(-100%)", vi: "translateY(-100%)" },
      { en: "translateY(0)", vi: "translateY(0)" },
      { en: "animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards", vi: "animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards" }
    ],
    starterCode: `/* Keyframes and toast notification styles */`,
    solutionCode: `@keyframes slideDown {\n  from {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.toast-banner {\n  animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}`,
    hints: [
      {
        en: "Define slideDown from translateY(-100%) opacity: 0 to translateY(0) opacity: 1 and apply to .toast-banner.",
        vi: "Định nghĩa slideDown từ translateY(-100%) opacity: 0 tới translateY(0) opacity: 1 và gán cho .toast-banner."
      }
    ],
    solutionExplanation: {
      en: "Using cubic-bezier with forwards creates snappy native app toast entries that stay locked in place.",
      vi: "Dùng cubic-bezier kết hợp forwards tạo hiệu ứng thông báo trượt xuất hiện dứt khoát như ứng dụng di động."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_18_1",
      type: "single_choice",
      question: {
        en: "What does `animation-fill-mode: forwards;` do?",
        vi: "`animation-fill-mode: forwards;` có tác dụng gì đối với một animation?"
      },
      options: [
        { en: "The element retains the styles calculated in the final keyframe (100% or to) after the animation ends", vi: "Phần tử sẽ giữ nguyên các giá trị kiểu dáng của khung hình cuối cùng (100% hoặc to) sau khi animation kết thúc" },
        { en: "The animation plays forward and backward repeatedly", vi: "Animation chạy tiến rồi chạy lùi liên tục" },
        { en: "The animation only plays on forward page scroll", vi: "Animation chỉ chạy khi cuộn trang xuống dưới" },
        { en: "The element resets to its original CSS styles before the animation started", vi: "Phần tử tự nhảy ngược về kiểu dáng ban đầu trước khi animation chạy" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Without `forwards` (default `none`), elements snap back to their pre-animation styles the moment the animation completes.",
        vi: "Nếu không có `forwards` (mặc định là `none`), phần tử sẽ lập tức bị giật ngược về trạng thái gốc ngay khi animation kết thúc."
      },
      topicId: "css_animations",
      difficulty: "easy"
    },
    {
      id: "css_q_18_2",
      type: "single_choice",
      question: {
        en: "What does `animation-direction: alternate;` do?",
        vi: "Thuộc tính `animation-direction: alternate;` có tác dụng gì?"
      },
      options: [
        { en: "Plays forward on odd iterations (1, 3, 5) and in reverse on even iterations (2, 4, 6)", vi: "Chạy xuôi ở các lần lặp lẻ (1, 3, 5) và chạy ngược chiều ở các lần lặp chẵn (2, 4, 6)" },
        { en: "Alternates background colors randomly", vi: "Đổi màu nền ngẫu nhiên" },
        { en: "Skips every second animation frame", vi: "Bỏ qua các khung hình chẵn" },
        { en: "Plays in a diagonal direction", vi: "Chạy theo đường chéo" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`alternate` cycles back and forth smoothly, popular for breathing, pulsing, or floating animations.",
        vi: "`alternate` tạo chuyển động đảo chiều qua lại nhịp nhàng như nhịp thở hoặc bóng bập bênh."
      },
      topicId: "css_animations",
      difficulty: "medium"
    },
    {
      id: "css_q_18_3",
      type: "single_choice",
      question: {
        en: "What is the primary purpose of the CSS `will-change` property?",
        vi: "Mục đích chính của thuộc tính `will-change` trong CSS là gì?"
      },
      options: [
        { en: "Hints to the browser that an element will undergo specific changes, allowing ahead-of-time GPU layer promotion", vi: "Báo trước cho trình duyệt biết phần tử sắp thay đổi thuộc tính nào để chuẩn bị sẵn sàng layer trên GPU, tránh giật lag" },
        { en: "Forces JavaScript to re-render the page", vi: "Ép JavaScript phải render lại trang" },
        { en: "Automatically translates text into other languages", vi: "Tự động dịch văn bản sang ngôn ngữ khác" },
        { en: "Disables user hover states", vi: "Tắt trạng thái hover của người dùng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`will-change: transform` prepares graphics memory in advance for demanding animations.",
        vi: "`will-change: transform` chuẩn bị sẵn bộ nhớ đồ họa trước khi animation bắt đầu để đạt độ mượt tối đa."
      },
      topicId: "css_animations",
      difficulty: "hard"
    },
    {
      id: "css_q_18_4",
      type: "true_false",
      question: {
        en: "True or False: `animation-play-state: paused;` can temporarily freeze an in-flight keyframe animation.",
        vi: "Đúng hay Sai: Thuộc tính `animation-play-state: paused;` có thể tạm dừng một animation đang chạy ở đúng khung hình hiện tại."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Setting animation-play-state to paused freezes animations at their exact current progress and resumes seamlessly when set back to running.",
        vi: "Đặt animation-play-state: paused sẽ đóng băng animation ở đúng thời điểm đó và tiếp tục chạy mượt mà khi đổi lại thành running."
      },
      topicId: "css_animations",
      difficulty: "easy"
    },
    {
      id: "css_q_18_5",
      type: "single_choice",
      question: {
        en: "How do you pause an animation when the user hovers over a marquee or ticker banner?",
        vi: "Làm thế nào để tạm dừng animation khi người dùng rê chuột lên thanh chữ chạy (marquee)?"
      },
      options: [
        { en: ".marquee:hover { animation-play-state: paused; }", vi: ".marquee:hover { animation-play-state: paused; }" },
        { en: ".marquee:hover { animation: stop; }", vi: ".marquee:hover { animation: stop; }" },
        { en: ".marquee:hover { animation-duration: 0s; }", vi: ".marquee:hover { animation-duration: 0s; }" },
        { en: ".marquee:hover { transform: none; }", vi: ".marquee:hover { transform: none; }" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`animation-play-state: paused` on hover pauses tickers so users can read content or click links comfortably.",
        vi: "`animation-play-state: paused` khi hover giúp người dùng dễ dàng dừng chữ lại để đọc hoặc click liên kết."
      },
      topicId: "css_animations",
      difficulty: "easy"
    },
    {
      id: "css_q_18_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The value used to make a keyframe animation loop continuously without ever stopping is animation-iteration-count: ________",
        vi: "Điền vào chỗ trống: Giá trị dùng để làm animation lặp đi lặp lại liên tục không bao giờ dừng là animation-iteration-count: ________"
      },
      fillBlankAnswers: ["infinite"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "infinite causes the animation to loop indefinitely.",
        vi: "infinite giúp animation lặp lại vô hạn."
      },
      topicId: "css_animations",
      difficulty: "easy"
    },
    {
      id: "css_q_18_7",
      type: "multiple_choice",
      question: {
        en: "Which properties can be set inside individual @keyframes steps? (Select all that apply)",
        vi: "Những thuộc tính nào sau đây có thể định nghĩa bên trong các bước của @keyframes? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "transform", vi: "transform" },
        { en: "opacity", vi: "opacity" },
        { en: "background-color", vi: "background-color" },
        { en: "filter", vi: "filter" }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: "Transforms, opacity, colors, and filters are all fully valid inside keyframe rules.",
        vi: "Transform, opacity, màu sắc và bộ lọc filter đều có thể tạo hoạt họa bên trong @keyframes."
      },
      topicId: "css_animations",
      difficulty: "easy"
    },
    {
      id: "css_q_18_8",
      type: "single_choice",
      question: {
        en: "What is the recommended accessible fallback when a user has enabled reduced motion in their OS?",
        vi: "Giải pháp tiếp cận web chuẩn mực khi người dùng bật chế độ giảm chuyển động trong hệ điều hành là gì?"
      },
      options: [
        { en: "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }", vi: "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }" },
        { en: "Disable all images on the website", vi: "Tắt toàn bộ hình ảnh trên trang web" },
        { en: "Redirect the user to an error page", vi: "Chuyển hướng người dùng sang trang báo lỗi" },
        { en: "Delete the stylesheet", vi: "Xóa file CSS" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Reducing animation and transition durations to near-zero provides instant state changes while honoring accessibility needs.",
        vi: "Giảm thời lượng animation về gần 0 giúp chuyển trạng thái tức thì mà không gây choáng ngợp cho người dùng nhạy cảm."
      },
      topicId: "css_animations",
      difficulty: "medium"
    },
    {
      id: "css_q_18_9",
      type: "true_false",
      question: {
        en: "True or False: In `@keyframes`, you can use percentage milestones like `0%`, `25%`, `50%`, `75%`, `100%` to orchestrate multi-step animations.",
        vi: "Đúng hay Sai: Trong `@keyframes`, bạn có thể dùng các mốc phần trăm như `0%`, `25%`, `50%`, `75%`, `100%` để điều phối hoạt họa nhiều giai đoạn."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Percentage milestones allow granular choreography across the animation timeline.",
        vi: "Các mốc phần trăm cho phép biên đạo tỉ mỉ từng bước chuyển động trên dòng thời gian."
      },
      topicId: "css_animations",
      difficulty: "easy"
    },
    {
      id: "css_q_18_10",
      type: "single_choice",
      question: {
        en: "What does `animation-timing-function: steps(4);` do?",
        vi: "`animation-timing-function: steps(4);` tạo ra chuyển động như thế nào?"
      },
      options: [
        { en: "Divides the animation into 4 discrete abrupt jumps rather than smooth continuous interpolation (ideal for sprite sheet animations)", vi: "Chia chuyển động thành 4 bước nhảy giật dứt khoát thay vì chuyển đổi mượt (lý tưởng cho hoạt họa sprite sheet 2D)" },
        { en: "Repeats the animation 4 times", vi: "Lặp lại animation 4 lần" },
        { en: "Slows the animation down by 4 seconds", vi: "Làm chậm animation 4 giây" },
        { en: "Creates 4 copies of the element", vi: "Nhân bản phần tử thành 4 bản sao" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`steps(N)` splits playback into N distinct intervals, essential for retro pixel art and frame-by-frame sprite sheets.",
        vi: "`steps(N)` chia dòng thời gian thành N bước nhảy rời rạc, là bí quyết tạo hoạt họa hoạt hình frame-by-frame và game pixel 2D."
      },
      topicId: "css_animations",
      difficulty: "hard"
    }
  ]
};

// Save lessons
saveLesson('src/data/css/intermediate/module02/lesson14.ts', 'lesson14', lesson14);
saveLesson('src/data/css/intermediate/module02/lesson15.ts', 'lesson15', lesson15);
saveLesson('src/data/css/intermediate/module02/lesson16.ts', 'lesson16', lesson16);
saveLesson('src/data/css/intermediate/module02/lesson17.ts', 'lesson17', lesson17);
saveLesson('src/data/css/intermediate/module02/lesson18.ts', 'lesson18', lesson18);

// Module 2 index
const mod2Index = `export { lesson14 } from './lesson14';\nexport { lesson15 } from './lesson15';\nexport { lesson16 } from './lesson16';\nexport { lesson17 } from './lesson17';\nexport { lesson18 } from './lesson18';\n`;
fs.writeFileSync('src/data/css/intermediate/module02/index.ts', mod2Index, 'utf8');
console.log('Saved: src/data/css/intermediate/module02/index.ts');

// Intermediate Level index
const intIndex = `export * from './module01';\nexport * from './module02';\n`;
fs.writeFileSync('src/data/css/intermediate/index.ts', intIndex, 'utf8');
console.log('Saved: src/data/css/intermediate/index.ts');
