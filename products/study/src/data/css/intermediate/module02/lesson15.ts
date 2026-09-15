import { Lesson } from '../../../../types';

export const lesson15: Lesson = {
  "id": "css_lesson_15",
  "moduleId": "css_mod_4",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 15,
  "topicId": "css_variables",
  "title": {
    "en": "CSS Custom Properties & Dynamic Theming",
    "vi": "Biến CSS Custom Properties & Hệ Thống Đổi Giao Diện Động"
  },
  "summary": {
    "en": "Master CSS variables (--var), var() with fallbacks, DOM scoping, dynamic theming (Dark/Light mode via data-theme), and real-time JavaScript variable manipulation.",
    "vi": "Làm chủ biến CSS (--var), hàm var() có giá trị dự phòng, phạm vi kế thừa DOM, chuyển đổi chế độ Sáng/Tối và điều khiển biến qua JavaScript."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS Custom Properties (commonly called CSS Variables) are live, dynamic values declared with `--` that cascade down the DOM tree. Unlike static SASS/SCSS variables, CSS variables update instantly at runtime across all matching elements.",
      "vi": "CSS Custom Properties (thường gọi là Biến CSS) là các giá trị động bắt đầu bằng tiền tố `--` có khả năng kế thừa theo cấu trúc DOM. Khác với biến SASS/SCSS tĩnh lúc biên dịch, biến CSS cập nhật tức thời theo thời gian thực trên toàn bộ giao diện."
    },
    "conceptExplanation": {
      "en": "Declare global variables on `:root` (the root `<html>` element). Retrieve them using `var(--name, fallback)`. Variables inherit down the DOM, allowing local component overrides. By redefining variable tokens inside `[data-theme=\"dark\"]` or media queries, switching an entire application's color scheme requires changing just a single HTML attribute. JavaScript can read and write custom properties using `element.style.setProperty('--accent', '#38bdf8')` and `getComputedStyle()`.",
      "vi": "Khai báo biến toàn cục trên `:root` (thẻ `<html>` gốc). Sử dụng lại bằng hàm `var(--name, giá-trị-dự-phòng)`. Biến kế thừa theo cây DOM nên bạn có thể ghi đè riêng cho từng component. Bằng cách định nghĩa lại các biến màu trong selector `[data-theme=\"dark\"]`, việc chuyển đổi toàn bộ giao diện chỉ mất đúng một thao tác đổi thuộc tính HTML. JavaScript có thể đọc và ghi biến CSS qua `element.style.setProperty('--accent', '#38bdf8')`."
    },
    "syntax": "/* Global Design System Tokens */\n:root {\n  --primary: #3b82f6;\n  --surface: #ffffff;\n  --text: #0f172a;\n  --radius: 8px;\n}\n\n/* Dark Theme Token Overrides */\n[data-theme=\"dark\"] {\n  --surface: #0f172a;\n  --text: #f8fafc;\n}\n\n.card {\n  background-color: var(--surface);\n  color: var(--text);\n  border-radius: var(--radius);\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Scoped Component Variable Customization",
          "vi": "Ghi Đè Biến CSS Trong Phạm Vi Cục Bộ Component"
        },
        "description": {
          "en": "Changes the button color token for a specific danger variant without writing extra classes.",
          "vi": "Đổi màu nút bấm cho biến thể nguy hiểm (danger) bằng cách ghi đè biến trực tiếp."
        },
        "code": ".btn {\n  --btn-bg: #3b82f6;\n  background: var(--btn-bg);\n  color: #ffffff;\n  padding: 10px 20px;\n  border-radius: 6px;\n}\n\n.btn-danger {\n  --btn-bg: #ef4444; /* Local variable override! */\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using uppercase or missing the leading double hyphens (--), making the declaration invalid.",
          "vi": "Viết hoa sai quy tắc hoặc quên 2 dấu gạch ngang (--) khiến biến không hợp lệ."
        },
        "correction": {
          "en": "Custom properties MUST always start with two hyphens (e.g. --brand-color).",
          "vi": "Tên biến CSS BẮT BUỘC phải luôn bắt đầu bằng 2 dấu gạch ngang (ví dụ --brand-color)."
        }
      }
    ],
    "tips": [
      {
        "en": "Provide a fallback in var(): var(--brand, #3b82f6) to ensure UI resiliency if the variable is undefined.",
        "vi": "Luôn đặt giá trị dự phòng trong var(): var(--brand, #3b82f6) để đảm bảo giao diện không bị mất màu nếu biến chưa được khai báo."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_15_1",
      "type": "complete_code",
      "title": {
        "en": "Declare and Consume a CSS Variable",
        "vi": "Khai Báo và Sử Dụng Biến CSS"
      },
      "instruction": {
        "en": "Declare --accent-color: #38bdf8 on :root and consume it as color on .highlight-text.",
        "vi": "Khai báo --accent-color: #38bdf8 trên :root và sử dụng làm color cho .highlight-text."
      },
      "starterCode": ":root {\n  /* Declare --accent-color */\n}\n\n.highlight-text {\n  /* Set color to var(--accent-color) */\n}",
      "solutionCode": ":root {\n  --accent-color: #38bdf8;\n}\n\n.highlight-text {\n  color: var(--accent-color);\n}",
      "hint": {
        "en": "Declare --accent-color: #38bdf8; and use color: var(--accent-color);",
        "vi": "Khai báo --accent-color: #38bdf8; và dùng color: var(--accent-color);"
      },
      "explanation": {
        "en": ":root variables are globally accessible across all DOM elements via var().",
        "vi": "Biến trên :root có thể được truy cập và tái sử dụng ở mọi nơi thông qua hàm var()."
      }
    },
    {
      "id": "css_ex_15_2",
      "type": "fix_code",
      "title": {
        "en": "Implement Dark Theme Override",
        "vi": "Thiết Lập Ghi Đè Biến Giao Diện Tối"
      },
      "instruction": {
        "en": "In [data-theme=\"dark\"], override --bg-card to #1e293b and --text-primary to #f8fafc.",
        "vi": "Trong [data-theme=\"dark\"], ghi đè --bg-card thành #1e293b và --text-primary thành #f8fafc."
      },
      "starterCode": ":root {\n  --bg-card: #ffffff;\n  --text-primary: #0f172a;\n}\n\n[data-theme=\"dark\"] {\n  /* Override tokens */\n}",
      "solutionCode": ":root {\n  --bg-card: #ffffff;\n  --text-primary: #0f172a;\n}\n\n[data-theme=\"dark\"] {\n  --bg-card: #1e293b;\n  --text-primary: #f8fafc;\n}",
      "hint": {
        "en": "Set --bg-card: #1e293b; --text-primary: #f8fafc; inside [data-theme=\"dark\"].",
        "vi": "Đặt --bg-card: #1e293b; --text-primary: #f8fafc; bên trong [data-theme=\"dark\"]."
      },
      "explanation": {
        "en": "Attribute-based variable switching enables seamless dark/light theme toggling.",
        "vi": "Ghi đè biến theo thuộc tính cho phép chuyển đổi giao diện sáng/tối cực kỳ mượt mà."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_15",
    "title": {
      "en": "Build a Scalable Design Token System",
      "vi": "Xây Dựng Hệ Thống Design Token Bằng Biến CSS"
    },
    "description": {
      "en": "Declare :root with --space-base: 8px, --radius-md: 12px, and --brand-color: #3b82f6. Style .token-card with padding: calc(var(--space-base) * 3), border-radius: var(--radius-md), and border: 2px solid var(--brand-color).",
      "vi": "Khai báo :root với --space-base: 8px, --radius-md: 12px và --brand-color: #3b82f6. Tạo kiểu cho .token-card với padding: calc(var(--space-base) * 3), border-radius: var(--radius-md) và border: 2px solid var(--brand-color)."
    },
    "requirements": [
      {
        "en": "--space-base: 8px",
        "vi": "--space-base: 8px"
      },
      {
        "en": "--radius-md: 12px",
        "vi": "--radius-md: 12px"
      },
      {
        "en": "--brand-color: #3b82f6",
        "vi": "--brand-color: #3b82f6"
      },
      {
        "en": "padding: calc(var(--space-base) * 3)",
        "vi": "padding: calc(var(--space-base) * 3)"
      },
      {
        "en": "border-radius: var(--radius-md)",
        "vi": "border-radius: var(--radius-md)"
      }
    ],
    "starterCode": ":root {\n}\n\n.token-card {\n}",
    "solutionCode": ":root {\n  --space-base: 8px;\n  --radius-md: 12px;\n  --brand-color: #3b82f6;\n}\n\n.token-card {\n  padding: calc(var(--space-base) * 3);\n  border-radius: var(--radius-md);\n  border: 2px solid var(--brand-color);\n}",
    "hints": [
      {
        "en": "Declare variables inside :root, then use calc() and var() inside .token-card.",
        "vi": "Khai báo biến trong :root, sau đó dùng calc() và var() trong .token-card."
      }
    ],
    "solutionExplanation": {
      "en": "Combining CSS variables with calc() creates a mathematically harmonized design system.",
      "vi": "Kết hợp biến CSS với hàm calc() tạo nên một hệ thống thiết kế cân bằng toán học chuẩn mực."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_15_1",
      "type": "single_choice",
      "question": {
        "en": "What prefix is required for all CSS Custom Property declarations?",
        "vi": "Tiền tố bắt buộc cho tất cả các khai báo Biến CSS (Custom Property) là gì?"
      },
      "options": [
        {
          "en": "Two hyphens (e.g. `--theme-color`)",
          "vi": "Hai dấu gạch ngang (ví dụ `--theme-color`)"
        },
        {
          "en": "Dollar sign (`$theme-color`)",
          "vi": "Dấu đô la (`$theme-color`)"
        },
        {
          "en": "At sign (`@theme-color`)",
          "vi": "Dấu a còng (`@theme-color`)"
        },
        {
          "en": "Hash sign (`#theme-color`)",
          "vi": "Dấu thăng (`#theme-color`)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CSS Custom Properties must always be prefixed with two dashes (`--`).",
        "vi": "Biến CSS bắt buộc phải có tiền tố là hai dấu gạch ngang liên tiếp (`--`)."
      },
      "topicId": "css_variables",
      "difficulty": "easy"
    },
    {
      "id": "css_q_15_2",
      "type": "single_choice",
      "question": {
        "en": "What is the primary difference between CSS Custom Properties and preprocessor variables (like SASS `$variable`)?",
        "vi": "Sự khác biệt cốt lõi giữa CSS Custom Properties và biến tiền xử lý (như biến SASS `$variable`) là gì?"
      },
      "options": [
        {
          "en": "CSS variables are dynamic at runtime, inherit through the DOM cascade, and can be modified live by JavaScript",
          "vi": "Biến CSS hoạt động động ngay lúc chạy, kế thừa theo cây DOM và có thể thay đổi trực tiếp bằng JavaScript"
        },
        {
          "en": "SASS variables work in all browsers natively",
          "vi": "Biến SASS chạy được trực tiếp trên trình duyệt"
        },
        {
          "en": "CSS variables are compiled into static strings during build time",
          "vi": "Biến CSS bị chuyển thành chuỗi tĩnh khi build"
        },
        {
          "en": "CSS variables cannot store colors",
          "vi": "Biến CSS không lưu được màu sắc"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "SASS variables are static build-time constants. CSS Custom Properties live in the browser engine and re-compute dynamically in real-time.",
        "vi": "Biến SASS chỉ tồn tại lúc build file. Biến CSS sống trong trình duyệt, tự động tính toán lại tức thì khi có thay đổi."
      },
      "topicId": "css_variables",
      "difficulty": "medium"
    },
    {
      "id": "css_q_15_3",
      "type": "single_choice",
      "question": {
        "en": "What does the second parameter in `var(--primary, #3b82f6)` do?",
        "vi": "Tham số thứ hai trong `var(--primary, #3b82f6)` có ý nghĩa gì?"
      },
      "options": [
        {
          "en": "It provides a fallback value used if `--primary` is undefined",
          "vi": "Nó là giá trị dự phòng được dùng nếu biến `--primary` chưa được khai báo"
        },
        {
          "en": "It animates to that color over time",
          "vi": "Nó tạo hiệu ứng đổi sang màu đó sau một khoảng thời gian"
        },
        {
          "en": "It acts as the dark mode color",
          "vi": "Nó đóng vai trò là màu cho chế độ tối"
        },
        {
          "en": "It triggers an error alert",
          "vi": "Nó kích hoạt cảnh báo lỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The fallback parameter provides resilience in case a custom property is missing or invalid.",
        "vi": "Tham số dự phòng giúp bảo vệ giao diện nếu biến CSS bị thiếu hoặc không hợp lệ."
      },
      "topicId": "css_variables",
      "difficulty": "easy"
    },
    {
      "id": "css_q_15_4",
      "type": "true_false",
      "question": {
        "en": "True or False: CSS Custom Property names are case-sensitive (`--header-color` is different from `--Header-Color`).",
        "vi": "Đúng hay Sai: Tên biến CSS có phân biệt chữ hoa và chữ thường (`--header-color` khác hoàn toàn với `--Header-Color`)."
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
        "en": "Unlike standard CSS property names, custom properties are strictly case-sensitive.",
        "vi": "Khác với các thuộc tính CSS thông thường, tên biến CSS phân biệt chữ hoa chữ thường một cách tuyệt đối."
      },
      "topicId": "css_variables",
      "difficulty": "medium"
    },
    {
      "id": "css_q_15_5",
      "type": "single_choice",
      "question": {
        "en": "How can JavaScript dynamically update a CSS variable `--theme-accent` on the root document element?",
        "vi": "Làm thế nào để JavaScript cập nhật động giá trị của biến CSS `--theme-accent` trên thẻ gốc document?"
      },
      "options": [
        {
          "en": "document.documentElement.style.setProperty('--theme-accent', '#10b981')",
          "vi": "document.documentElement.style.setProperty('--theme-accent', '#10b981')"
        },
        {
          "en": "document.setCSSVar('--theme-accent', '#10b981')",
          "vi": "document.setCSSVar('--theme-accent', '#10b981')"
        },
        {
          "en": "window.css.themeAccent = '#10b981'",
          "vi": "window.css.themeAccent = '#10b981'"
        },
        {
          "en": "document.variables['--theme-accent'] = '#10b981'",
          "vi": "document.variables['--theme-accent'] = '#10b981'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`element.style.setProperty('--prop', value)` is the standard Web API for setting CSS custom properties via JS.",
        "vi": "`element.style.setProperty('--prop', value)` là API tiêu chuẩn để gán biến CSS thông qua JavaScript."
      },
      "topicId": "css_variables",
      "difficulty": "medium"
    },
    {
      "id": "css_q_15_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The pseudo-class matching the highest-level element in the document tree where global CSS variables are declared is :________",
        "vi": "Điền vào chỗ trống: Pseudo-class đại diện cho phần tử cao nhất trong cây tài liệu nơi khai báo các biến toàn cục là :________"
      },
      "fillBlankAnswers": [
        "root"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": ":root matches <html> with higher specificity and is the standard location for global tokens.",
        "vi": ":root khớp với thẻ <html> và là vị trí tiêu chuẩn để khai báo các token thiết kế toàn cục."
      },
      "topicId": "css_variables",
      "difficulty": "easy"
    },
    {
      "id": "css_q_15_7",
      "type": "multiple_choice",
      "question": {
        "en": "What types of values can be stored inside a CSS Custom Property? (Select all that apply)",
        "vi": "Những kiểu giá trị nào sau đây có thể lưu trữ bên trong một biến CSS? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "Colors (e.g. #3b82f6, oklch(...))",
          "vi": "Màu sắc (ví dụ #3b82f6, oklch(...))"
        },
        {
          "en": "Lengths and units (e.g. 16px, 2rem, 50%)",
          "vi": "Độ dài và đơn vị (ví dụ 16px, 2rem, 50%)"
        },
        {
          "en": "String tokens (e.g. 'Helvetica', sans-serif)",
          "vi": "Chuỗi ký tự tên font (ví dụ 'Helvetica', sans-serif)"
        },
        {
          "en": "Time durations (e.g. 300ms, 0.5s)",
          "vi": "Thời lượng (ví dụ 300ms, 0.5s)"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2,
        3
      ],
      "explanation": {
        "en": "CSS Custom Properties can store virtually any valid CSS token including colors, dimensions, font stacks, and durations.",
        "vi": "Biến CSS có thể chứa hầu như bất kỳ giá trị CSS hợp lệ nào từ màu sắc, kích thước, font chữ đến thời gian chuyển động."
      },
      "topicId": "css_variables",
      "difficulty": "easy"
    },
    {
      "id": "css_q_15_8",
      "type": "single_choice",
      "question": {
        "en": "What happens if a CSS variable is evaluated in a context where its value is invalid for that property (e.g. `color: var(--my-width)` where `--my-width: 20px`)?",
        "vi": "Điều gì xảy ra nếu biến CSS có giá trị không hợp lệ cho thuộc tính đó (ví dụ `color: var(--my-width)` với `--my-width: 20px`)?"
      },
      "options": [
        {
          "en": "The property resets to its inherited value or initial value (as if unset)",
          "vi": "Thuộc tính sẽ tự hoàn tác về giá trị kế thừa từ cha hoặc giá trị khởi tạo mặc định (như unset)"
        },
        {
          "en": "The browser stops parsing the rest of the stylesheet",
          "vi": "Trình duyệt dừng đọc toàn bộ file CSS"
        },
        {
          "en": "The text turns bright red",
          "vi": "Chữ tự động chuyển sang màu đỏ"
        },
        {
          "en": "JavaScript throws an uncaught error",
          "vi": "JavaScript ném ra lỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Invalid at computed-value time causes the property to fall back to `inherit` (if inherited) or `initial`.",
        "vi": "Khi giá trị tính toán không hợp lệ, thuộc tính sẽ tự động khôi phục về giá trị kế thừa `inherit` hoặc mặc định `initial`."
      },
      "topicId": "css_variables",
      "difficulty": "hard"
    },
    {
      "id": "css_q_15_9",
      "type": "true_false",
      "question": {
        "en": "True or False: CSS Custom Properties can be defined locally inside a specific component selector to scope their availability.",
        "vi": "Đúng hay Sai: Biến CSS có thể được khai báo cục bộ bên trong một class component cụ thể để giới hạn phạm vi tác dụng."
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
        "en": "Scoping variables to specific classes allows modular component design without polluting the global scope.",
        "vi": "Giới hạn phạm vi biến vào từng class giúp thiết kế component mang tính đóng gói cao mà không làm ô nhiễm biến toàn cục."
      },
      "topicId": "css_variables",
      "difficulty": "easy"
    },
    {
      "id": "css_q_15_10",
      "type": "single_choice",
      "question": {
        "en": "What does the `@property` rule in modern CSS (CSS Houdini) bring to custom properties?",
        "vi": "Cú pháp `@property` trong CSS hiện đại (CSS Houdini) mang lại tính năng gì cho biến CSS?"
      },
      "options": [
        {
          "en": "Type checking, initial fallback values, inheritance rules, and smooth interpolation/animation of variables",
          "vi": "Kiểm tra kiểu dữ liệu, đặt giá trị khởi tạo, quy định kế thừa và cho phép tạo hiệu ứng chuyển động mượt cho biến"
        },
        {
          "en": "Converts CSS to JavaScript",
          "vi": "Biến mã CSS thành JavaScript"
        },
        {
          "en": "Enables database connections in CSS",
          "vi": "Cho phép kết nối cơ sở dữ liệu trong CSS"
        },
        {
          "en": "Disables browser caching",
          "vi": "Tắt bộ nhớ đệm trình duyệt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`@property` registers custom properties with a syntax type (`<color>`, `<length>`, `<angle>`), enabling smooth gradient animations.",
        "vi": "`@property` đăng ký biến với kiểu dữ liệu xác định (`<color>`, `<length>`, `<angle>`), cho phép tạo animation chuyển màu gradient trực tiếp."
      },
      "topicId": "css_variables",
      "difficulty": "hard"
    }
  ]
};
