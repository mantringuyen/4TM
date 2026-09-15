import { Lesson } from '../../../../types';

export const lesson07: Lesson = {
  "id": "css_lesson_7",
  "moduleId": "css_mod_2",
  "levelId": "basic",
  "courseId": "css",
  "order": 7,
  "topicId": "css_typography",
  "title": {
    "en": "Web Typography & Text Layout",
    "vi": "Nghệ Thuật Chữ Web Typography & Bố Cục Văn Bản"
  },
  "summary": {
    "en": "Master font stacks, @font-face, unitless line-height, letter-spacing, text-overflow truncation, and web font loading strategies.",
    "vi": "Làm chủ font stacks, @font-face, line-height không đơn vị, letter-spacing, cắt ngắn văn bản text-overflow và tối ưu tải web font."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Typography constitutes over 90% of web content consumption. Proper font pairing, unitless line-height ratios, and truncation rules ensure professional hierarchy and effortless readability.",
      "vi": "Văn bản chiếm hơn 90% trải nghiệm tiếp nhận thông tin trên web. Phối hợp font chữ chuẩn, tỷ lệ line-height không đơn vị và xử lý tràn chữ giúp tạo nên thứ bậc thị giác chuyên nghiệp và dễ đọc."
    },
    "conceptExplanation": {
      "en": "A robust font stack starts with primary custom fonts, followed by system fallbacks (`system-ui, -apple-system, sans-serif`). `@font-face` loads external web fonts with `font-display: swap` to prevent Flash of Invisible Text (FOIT). Best practice for `line-height` is unitless (e.g. `1.5` to `1.7` for body, `1.2` for headings) so it scales proportionally across all child font sizes. Single-line truncation requires: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`.",
      "vi": "Một danh sách font stack an toàn bắt đầu bằng font tùy chỉnh, nối tiếp bởi font hệ thống (`system-ui, -apple-system, sans-serif`). Cú pháp `@font-face` tải font ngoài với `font-display: swap` để tránh hiện tượng chữ bị tàng hình khi tải (FOIT). Chuẩn mực vàng cho `line-height` là dùng số không kèm đơn vị (ví dụ `1.5` đến `1.7` cho đoạn văn, `1.2` cho tiêu đề) để tỷ lệ giãn dòng tự động nhân theo cỡ font. Cắt ngắn chữ thành dấu 3 chấm đòi hỏi: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`."
    },
    "syntax": "/* Web Font Declaration with Swap Display */\n@font-face {\n  font-family: 'Inter';\n  src: url('/fonts/Inter.woff2') format('woff2');\n  font-weight: 400 700;\n  font-display: swap;\n}\n\n/* Single line text ellipsis */\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Editorial Typography Styling",
          "vi": "Thiết Lập Khối Văn Bản Báo Chí Chuẩn Mực"
        },
        "description": {
          "en": "Applies high-legibility proportional line-height, letter-spacing, and responsive text width.",
          "vi": "Áp dụng tỷ lệ giãn dòng, khoảng cách chữ và độ rộng đoạn văn tối ưu cho mắt đọc."
        },
        "code": "body {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  font-size: 1rem;\n  line-height: 1.6; /* Unitless! */\n  color: #334155;\n}\n\nh1 {\n  font-size: 2.25rem;\n  line-height: 1.2;\n  letter-spacing: -0.025em;\n  color: #0f172a;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Setting fixed pixel units on line-height (e.g. line-height: 20px) which clips large headings.",
          "vi": "Đặt đơn vị pixel cố định cho line-height (ví dụ line-height: 20px) khiến các tiêu đề chữ to bị đè chữ hoặc cắt cụt."
        },
        "correction": {
          "en": "Always use unitless numbers for line-height (e.g. 1.5) so it scales with font size.",
          "vi": "Luôn dùng số không đơn vị cho line-height (ví dụ 1.5) để chiều cao dòng tự co giãn theo kích thước chữ."
        }
      }
    ],
    "tips": [
      {
        "en": "Always specify font-display: swap in @font-face to render fallback text immediately while web fonts download.",
        "vi": "Luôn đặt font-display: swap trong @font-face để hiện chữ bằng font hệ thống ngay lập tức trong khi chờ tải font ngoài."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_7_1",
      "type": "complete_code",
      "title": {
        "en": "Implement Single-Line Text Truncation",
        "vi": "Thực Hiện Cắt Ngắn Chữ 1 Dòng Với Dấu Ba Chấm"
      },
      "instruction": {
        "en": "Add white-space: nowrap, overflow: hidden, and text-overflow: ellipsis to .title-ellipsis.",
        "vi": "Thêm white-space: nowrap, overflow: hidden và text-overflow: ellipsis vào .title-ellipsis."
      },
      "starterCode": ".title-ellipsis {\n  /* Truncate overflow text */\n}",
      "solutionCode": ".title-ellipsis {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
      "hint": {
        "en": "Use white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",
        "vi": "Dùng white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
      },
      "explanation": {
        "en": "All three properties must be present together for single-line ellipsis truncation to activate.",
        "vi": "Cả 3 thuộc tính này bắt buộc phải đi cùng nhau thì hiệu ứng dấu 3 chấm mới hoạt động."
      }
    },
    {
      "id": "css_ex_7_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Heading Line Height",
        "vi": "Sửa Tỷ Lệ Giãn Dòng Cho Tiêu Đề"
      },
      "instruction": {
        "en": "Change line-height from 16px to unitless 1.25 on h1.headline.",
        "vi": "Đổi line-height từ 16px thành số không đơn vị 1.25 cho h1.headline."
      },
      "starterCode": "h1.headline {\n  font-size: 2.5rem;\n  line-height: 16px;\n}",
      "solutionCode": "h1.headline {\n  font-size: 2.5rem;\n  line-height: 1.25;\n}",
      "hint": {
        "en": "Change line-height: 16px to line-height: 1.25;",
        "vi": "Đổi line-height: 16px thành line-height: 1.25;"
      },
      "explanation": {
        "en": "Unitless line-height multiplies by the computed font-size (2.5rem * 1.25 = 3.125rem).",
        "vi": "Line-height không đơn vị sẽ tự nhân với cỡ chữ (2.5rem * 1.25 = 3.125rem) giúp dòng chữ thoáng đẹp."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_7",
    "title": {
      "en": "Build an Accessible Article Typography Header",
      "vi": "Xây Dựng Khối Tiêu Đề Bài Báo Chuẩn Nghệ Thuật Chữ"
    },
    "description": {
      "en": "Style .article-title with font-size: 2rem, line-height: 1.2, letter-spacing: -0.02em, font-weight: 700, and color: #0f172a.",
      "vi": "Tạo kiểu cho .article-title với font-size: 2rem, line-height: 1.2, letter-spacing: -0.02em, font-weight: 700 và color: #0f172a."
    },
    "requirements": [
      {
        "en": "font-size: 2rem",
        "vi": "font-size: 2rem"
      },
      {
        "en": "line-height: 1.2",
        "vi": "line-height: 1.2"
      },
      {
        "en": "letter-spacing: -0.02em",
        "vi": "letter-spacing: -0.02em"
      },
      {
        "en": "font-weight: 700",
        "vi": "font-weight: 700"
      },
      {
        "en": "color: #0f172a",
        "vi": "color: #0f172a"
      }
    ],
    "starterCode": ".article-title {\n  /* Add typography properties */\n}",
    "solutionCode": ".article-title {\n  font-size: 2rem;\n  line-height: 1.2;\n  letter-spacing: -0.02em;\n  font-weight: 700;\n  color: #0f172a;\n}",
    "hints": [
      {
        "en": "Declare font-size, line-height, letter-spacing, font-weight, and color inside .article-title.",
        "vi": "Khai báo font-size, line-height, letter-spacing, font-weight và color trong .article-title."
      }
    ],
    "solutionExplanation": {
      "en": "Tight letter-spacing and compact unitless line-height produce refined editorial display headings.",
      "vi": "Khoảng cách chữ co nhẹ và giãn dòng gọn gàng tạo nên tiêu đề chuẩn phong cách tạp chí cao cấp."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_7_1",
      "type": "single_choice",
      "question": {
        "en": "Why is a unitless value (e.g. `line-height: 1.5;`) strongly recommended over fixed units?",
        "vi": "Tại sao giá trị không đơn vị (ví dụ `line-height: 1.5;`) được khuyến nghị mạnh mẽ hơn giá trị có đơn vị?"
      },
      "options": [
        {
          "en": "Child elements inherit the ratio and dynamically multiply it against their own computed font-size",
          "vi": "Các phần tử con sẽ kế thừa tỷ lệ này và tự nhân với cỡ chữ riêng của chúng"
        },
        {
          "en": "It prevents browsers from loading fonts",
          "vi": "Nó ngăn trình duyệt tải font"
        },
        {
          "en": "It enables 3D text rotation",
          "vi": "Nó kích hoạt xoay chữ 3D"
        },
        {
          "en": "Unitless values are required by HTML5",
          "vi": "HTML5 bắt buộc phải dùng số không đơn vị"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "With unitless line-height, inherited elements calculate their line-height as `ratio * current-font-size`, preventing overlap bugs.",
        "vi": "Với line-height không đơn vị, các thẻ con kế thừa sẽ tính chiều cao dòng bằng `tỷ lệ * cỡ chữ hiện tại`, tránh lỗi chữ đè nhau."
      },
      "topicId": "css_typography",
      "difficulty": "medium"
    },
    {
      "id": "css_q_7_2",
      "type": "single_choice",
      "question": {
        "en": "What does `font-display: swap;` inside `@font-face` accomplish?",
        "vi": "`font-display: swap;` trong `@font-face` có tác dụng gì?"
      },
      "options": [
        {
          "en": "Instructs the browser to render fallback text immediately and swap in the custom font once downloaded",
          "vi": "Yêu cầu trình duyệt hiện chữ bằng font dự phòng ngay lập tức và tự thế font tùy chỉnh khi tải xong"
        },
        {
          "en": "Swaps uppercase letters to lowercase",
          "vi": "Đổi chữ hoa thành chữ thường"
        },
        {
          "en": "Rotates fonts 180 degrees",
          "vi": "Xoay ngược font chữ 180 độ"
        },
        {
          "en": "Disables bold text formatting",
          "vi": "Tắt định dạng chữ in đậm"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`font-display: swap` eliminates Flash of Invisible Text (FOIT) by displaying system fallback fonts until web fonts finish loading.",
        "vi": "`font-display: swap` loại bỏ hiện tượng chữ tàng hình (FOIT) bằng cách hiển thị font hệ thống dự phòng trong lúc chờ tải font."
      },
      "topicId": "css_typography",
      "difficulty": "easy"
    },
    {
      "id": "css_q_7_3",
      "type": "multiple_choice",
      "question": {
        "en": "Which three CSS properties are required together to create single-line text ellipsis truncation? (Select 3)",
        "vi": "Ba thuộc tính CSS nào bắt buộc phải kết hợp cùng nhau để tạo hiệu ứng cắt chữ dấu 3 chấm trên 1 dòng? (Chọn 3)"
      },
      "options": [
        {
          "en": "white-space: nowrap;",
          "vi": "white-space: nowrap;"
        },
        {
          "en": "overflow: hidden;",
          "vi": "overflow: hidden;"
        },
        {
          "en": "text-overflow: ellipsis;",
          "vi": "text-overflow: ellipsis;"
        },
        {
          "en": "display: flex;",
          "vi": "display: flex;"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "You need `white-space: nowrap` (prevent wrapping), `overflow: hidden` (clip excess), and `text-overflow: ellipsis` (render dots).",
        "vi": "Bạn cần `white-space: nowrap` (không xuống dòng), `overflow: hidden` (ẩn phần tràn), và `text-overflow: ellipsis` (hiện dấu 3 chấm)."
      },
      "topicId": "css_typography",
      "difficulty": "medium"
    },
    {
      "id": "css_q_7_4",
      "type": "single_choice",
      "question": {
        "en": "Which modern font file format offers the highest compression and performance for web browsers?",
        "vi": "Định dạng file font chữ hiện đại nào mang lại tỷ lệ nén và hiệu năng tốt nhất cho trình duyệt web?"
      },
      "options": [
        {
          "en": "WOFF2 (.woff2)",
          "vi": "WOFF2 (.woff2)"
        },
        {
          "en": "TTF (.ttf)",
          "vi": "TTF (.ttf)"
        },
        {
          "en": "EOT (.eot)",
          "vi": "EOT (.eot)"
        },
        {
          "en": "SVG Font (.svg)",
          "vi": "SVG Font (.svg)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "WOFF2 uses Brotli compression, providing roughly 30% smaller file sizes than WOFF and widely supported across all modern browsers.",
        "vi": "WOFF2 sử dụng thuật toán nén Brotli, giúp file nhỏ hơn khoảng 30% so với WOFF1 và được hỗ trợ trên tất cả trình duyệt hiện đại."
      },
      "topicId": "css_typography",
      "difficulty": "easy"
    },
    {
      "id": "css_q_7_5",
      "type": "true_false",
      "question": {
        "en": "True or False: `letter-spacing` can accept negative values to tighten headline tracking.",
        "vi": "Đúng hay Sai: `letter-spacing` có thể nhận giá trị âm để kéo các chữ cái trong tiêu đề lại gần nhau hơn."
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
        "en": "Negative letter-spacing (e.g. -0.025em) is standard in modern web design for large headings.",
        "vi": "Giá trị letter-spacing âm (ví dụ -0.025em) là tiêu chuẩn thiết kế hiện đại giúp các tiêu đề lớn nhìn chắc chắn và đẹp mắt hơn."
      },
      "topicId": "css_typography",
      "difficulty": "easy"
    },
    {
      "id": "css_q_7_6",
      "type": "single_choice",
      "question": {
        "en": "What does the property `text-transform: capitalize;` do?",
        "vi": "Thuộc tính `text-transform: capitalize;` có tác dụng gì?"
      },
      "options": [
        {
          "en": "Transforms the first letter of each word to uppercase",
          "vi": "Chuyển chữ cái đầu tiên của mỗi từ thành chữ in hoa"
        },
        {
          "en": "Transforms all characters in the text to uppercase",
          "vi": "Chuyển toàn bộ tất cả các ký tự thành chữ in hoa"
        },
        {
          "en": "Converts text to bold",
          "vi": "In đậm đoạn văn bản"
        },
        {
          "en": "Underlines capital letters",
          "vi": "Gạch chân các chữ in hoa"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "capitalize turns the first character of every word into uppercase (Title Case).",
        "vi": "capitalize viết hoa chữ cái đầu tiên của từng từ trong câu (dạng Title Case)."
      },
      "topicId": "css_typography",
      "difficulty": "easy"
    },
    {
      "id": "css_q_7_7",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To force long unbroken words or URLs to break onto a new line and prevent container overflow, use word-break: break-________",
        "vi": "Điền vào chỗ trống: Để buộc các từ quá dài hoặc link URL bẻ dòng tránh tràn khung, dùng word-break: break-________"
      },
      "fillBlankAnswers": [
        "all",
        "word"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "word-break: break-all or overflow-wrap: break-word splits long words across lines.",
        "vi": "word-break: break-all hoặc overflow-wrap: break-word giúp ngắt từ dài xuống dòng linh hoạt."
      },
      "topicId": "css_typography",
      "difficulty": "medium"
    },
    {
      "id": "css_q_7_8",
      "type": "single_choice",
      "question": {
        "en": "Which font family keyword uses the operating system's native modern UI font?",
        "vi": "Từ khóa font-family nào sẽ kích hoạt font chữ giao diện mặc định của hệ điều hành người dùng?"
      },
      "options": [
        {
          "en": "system-ui",
          "vi": "system-ui"
        },
        {
          "en": "os-font",
          "vi": "os-font"
        },
        {
          "en": "native-sans",
          "vi": "native-sans"
        },
        {
          "en": "default-device",
          "vi": "default-device"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`system-ui` tells the browser to use the default UI font of the host operating system (San Francisco on macOS/iOS, Segoe UI on Windows, Roboto on Android).",
        "vi": "`system-ui` chỉ định trình duyệt dùng font mặc định của hệ điều hành (San Francisco trên Apple, Segoe UI trên Windows, Roboto trên Android)."
      },
      "topicId": "css_typography",
      "difficulty": "medium"
    },
    {
      "id": "css_q_7_9",
      "type": "true_false",
      "question": {
        "en": "True or False: `font-weight: 700;` is equivalent to the keyword `font-weight: bold;`.",
        "vi": "Đúng hay Sai: `font-weight: 700;` tương đương với từ khóa `font-weight: bold;`."
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
        "en": "In CSS font specifications, 400 maps to 'normal' and 700 maps to 'bold'.",
        "vi": "Trong chuẩn CSS, giá trị số 400 tương ứng với 'normal' và 700 tương ứng với 'bold'."
      },
      "topicId": "css_typography",
      "difficulty": "easy"
    },
    {
      "id": "css_q_7_10",
      "type": "single_choice",
      "question": {
        "en": "How do you clamp a paragraph to a maximum of 3 lines with an ellipsis at the end?",
        "vi": "Làm thế nào để giới hạn một đoạn văn tối đa 3 dòng và hiện dấu 3 chấm ở cuối?"
      },
      "options": [
        {
          "en": "display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;",
          "vi": "display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;"
        },
        {
          "en": "max-lines: 3; text-overflow: ellipsis;",
          "vi": "max-lines: 3; text-overflow: ellipsis;"
        },
        {
          "en": "line-limit: 3;",
          "vi": "line-limit: 3;"
        },
        {
          "en": "overflow-lines: 3; clip: true;",
          "vi": "overflow-lines: 3; clip: true;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The standard multi-line truncation pattern uses `-webkit-line-clamp: 3` with `-webkit-box-orient: vertical` and `overflow: hidden`.",
        "vi": "Chuẩn cắt chữ nhiều dòng trên trình duyệt sử dụng `-webkit-line-clamp: 3` kết hợp với `-webkit-box-orient: vertical` và `overflow: hidden`."
      },
      "topicId": "css_typography",
      "difficulty": "hard"
    }
  ]
};
