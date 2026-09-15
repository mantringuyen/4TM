import { Lesson } from '../../../../types';

export const lesson04: Lesson = {
  "id": "css_lesson_4",
  "moduleId": "css_mod_1",
  "levelId": "basic",
  "courseId": "css",
  "order": 4,
  "topicId": "css_units",
  "title": {
    "en": "CSS Units of Measurement",
    "vi": "Các Đơn Vị Đo Lường Trong CSS"
  },
  "summary": {
    "en": "Master absolute units (px) vs relative font units (rem, em, ch) and dynamic viewport units (vw, vh, dvh, svh).",
    "vi": "Làm chủ đơn vị tuyệt đối (px) so với đơn vị tương đối theo font (rem, em, ch) và đơn vị viewport hiện đại (vw, vh, dvh, svh)."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Choosing the correct CSS unit determines whether an interface scales gracefully across device screens, zoom levels, and user accessibility font settings. Units are divided into Absolute (px, pt) and Relative (rem, em, %, vw, vh, dvh, ch).",
      "vi": "Lựa chọn đơn vị CSS chuẩn xác quyết định giao diện có co giãn mượt mà trên các màn hình, tỷ lệ zoom và cài đặt font chữ trợ năng của người dùng hay không. Đơn vị chia thành Tuyệt đối (px) và Tương đối (rem, em, %, vw, vh, dvh, ch)."
    },
    "conceptExplanation": {
      "en": "Absolute units like `px` are fixed screen pixels. Relative font units: `rem` is relative to the root (`<html>`) font size (typically 16px = 1rem), guaranteeing consistent scaling when users change browser font settings. `em` is relative to its current/parent font size (useful for component padding scaling proportionally with font size). `ch` equals the width of the '0' character (ideal for reading line lengths: 65-75ch). Viewport units: `1vw` = 1% of viewport width; `1vh` = 1% of viewport height. Modern mobile units: `dvh` (dynamic viewport height adjusting for mobile browser address bars), `svh` (small viewport height), and `lvh` (large viewport height).",
      "vi": "Đơn vị tuyệt đối `px` là điểm ảnh cố định. Đơn vị tương đối: `rem` tính theo kích thước font của thẻ gốc `<html>` (mặc định 16px = 1rem), đảm bảo khả năng trợ năng khi người dùng tăng font máy tính. `em` tính theo font của chính phần tử hoặc thẻ cha (thích hợp cho padding co giãn theo chữ). `ch` bằng chiều rộng ký tự '0' (lý tưởng giới hạn độ dài dòng đọc: 65-75ch). Đơn vị viewport: `1vw` = 1% chiều rộng màn hình, `1vh` = 1% chiều cao màn hình. Các đơn vị di động hiện đại: `dvh` (chiều cao tự động thích ứng thanh địa chỉ mobile), `svh` và `lvh`."
    },
    "syntax": "/* Accessible typography with rem and ch */\nbody {\n  font-size: 1rem; /* 16px */\n}\n\narticle {\n  max-width: 68ch; /* Optimal reading line width */\n}\n\n/* Full-screen hero section adapting to mobile address bars */\n.hero-fullscreen {\n  min-height: 100dvh;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Proportional Component Sizing with rem and em",
          "vi": "Kích Thước Component Tỷ Lệ Chuẩn Bằng rem và em"
        },
        "description": {
          "en": "Button padding in em scales automatically if button font size changes, while border radius in rem stays consistent.",
          "vi": "Padding dùng em giúp nút tự động nở rộng tương xứng khi tăng font chữ, trong khi border-radius dùng rem giữ bo góc đồng nhất."
        },
        "code": ".btn {\n  font-size: 1rem;\n  padding: 0.75em 1.5em; /* Scales with font-size */\n  border-radius: 0.5rem;\n}\n\n.btn-lg {\n  font-size: 1.25rem; /* Padding automatically expands! */\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Setting body font-size in fixed pixels (px), overriding user browser accessibility zoom settings.",
          "vi": "Đặt font-size của body bằng pixel (px) cố định, làm mất cài đặt kích thước font trợ năng của người dùng."
        },
        "correction": {
          "en": "Use rem for typography and layout spacing so font scales with user preferences.",
          "vi": "Dùng rem cho chữ và khoảng cách bố cục để giao diện phóng to thu nhỏ chuẩn theo cài đặt người dùng."
        }
      }
    ],
    "tips": [
      {
        "en": "Use max-width: 65ch to 75ch on text paragraphs for optimal reading comfort and legibility.",
        "vi": "Dùng max-width từ 65ch đến 75ch cho đoạn văn để có độ dài dòng đọc thoải mái và dễ tiếp thu nhất."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_4_1",
      "type": "complete_code",
      "title": {
        "en": "Set Accessible Typography Units",
        "vi": "Thiết Lập Đơn Vị Chữ Tiếp Cận Chuẩn"
      },
      "instruction": {
        "en": "Set font-size to 1.5rem and max-width to 70ch on the .article-content selector.",
        "vi": "Đặt font-size thành 1.5rem và max-width thành 70ch cho bộ chọn .article-content."
      },
      "starterCode": ".article-content {\n  /* Add font-size and max-width */\n}",
      "solutionCode": ".article-content {\n  font-size: 1.5rem;\n  max-width: 70ch;\n}",
      "hint": {
        "en": "Use font-size: 1.5rem; max-width: 70ch;",
        "vi": "Dùng font-size: 1.5rem; max-width: 70ch;"
      },
      "explanation": {
        "en": "1.5rem scales relative to root font (24px default) and 70ch limits line width.",
        "vi": "1.5rem tương đương 24px theo font gốc và 70ch giới hạn độ rộng dòng đọc hoàn hảo."
      }
    },
    {
      "id": "css_ex_4_2",
      "type": "fix_code",
      "title": {
        "en": "Upgrade Mobile Viewport Height to dvh",
        "vi": "Nâng Cấp Chiều Cao Màn Hình Di Động Lên dvh"
      },
      "instruction": {
        "en": "Replace 100vh with 100dvh to prevent mobile address bar clipping on .hero-section.",
        "vi": "Thay thế 100vh bằng 100dvh để tránh bị thanh địa chỉ trình duyệt mobile che khuất trên .hero-section."
      },
      "starterCode": ".hero-section {\n  min-height: 100vh;\n}",
      "solutionCode": ".hero-section {\n  min-height: 100dvh;\n}",
      "hint": {
        "en": "Change 100vh to 100dvh",
        "vi": "Đổi 100vh thành 100dvh"
      },
      "explanation": {
        "en": "dvh (dynamic viewport height) dynamically adapts as browser chrome expands/retracts.",
        "vi": "dvh (dynamic viewport height) tự động co giãn theo sự xuất hiện/ẩn đi của thanh địa chỉ trình duyệt."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_4",
    "title": {
      "en": "Build a Fluid Hero Container with Modern Units",
      "vi": "Xây Dựng Khối Hero Co Giãn Với Đơn Vị Hiện Đại"
    },
    "description": {
      "en": "Create a .hero-container class with min-height: 100dvh, padding: 2rem 1.5rem, max-width: 80ch, and margin: 0 auto.",
      "vi": "Tạo class .hero-container với min-height: 100dvh, padding: 2rem 1.5rem, max-width: 80ch và margin: 0 auto."
    },
    "requirements": [
      {
        "en": "min-height: 100dvh",
        "vi": "min-height: 100dvh"
      },
      {
        "en": "padding: 2rem 1.5rem",
        "vi": "padding: 2rem 1.5rem"
      },
      {
        "en": "max-width: 80ch",
        "vi": "max-width: 80ch"
      },
      {
        "en": "margin: 0 auto",
        "vi": "margin: 0 auto"
      }
    ],
    "starterCode": ".hero-container {\n  /* Write CSS unit declarations */\n}",
    "solutionCode": ".hero-container {\n  min-height: 100dvh;\n  padding: 2rem 1.5rem;\n  max-width: 80ch;\n  margin: 0 auto;\n}",
    "hints": [
      {
        "en": "Set min-height, padding, max-width, and margin using rem, ch, and dvh units.",
        "vi": "Thiết lập min-height, padding, max-width và margin sử dụng các đơn vị rem, ch và dvh."
      }
    ],
    "solutionExplanation": {
      "en": "Using dvh, rem, and ch provides a fully responsive layout that honors mobile viewports and typography ergonomics.",
      "vi": "Sử dụng dvh, rem và ch mang đến bố cục phản hồi mượt mà, tối ưu cho trình duyệt mobile và công thái học đọc chữ."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_4_1",
      "type": "single_choice",
      "question": {
        "en": "What is `1rem` equal to if the browser's default root font size is 16px?",
        "vi": "`1rem` bằng bao nhiêu nếu cỡ chữ gốc (root) mặc định của trình duyệt là 16px?"
      },
      "options": [
        {
          "en": "16px",
          "vi": "16px"
        },
        {
          "en": "32px",
          "vi": "32px"
        },
        {
          "en": "10px",
          "vi": "10px"
        },
        {
          "en": "8px",
          "vi": "8px"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "1rem is equal to 100% of the root element (<html>) font size, which defaults to 16px.",
        "vi": "1rem tương đương 100% cỡ chữ của thẻ gốc (<html>), mặc định là 16px."
      },
      "topicId": "css_units",
      "difficulty": "easy"
    },
    {
      "id": "css_q_4_2",
      "type": "single_choice",
      "question": {
        "en": "What is the primary difference between `rem` and `em` units?",
        "vi": "Sự khác biệt cốt lõi giữa đơn vị `rem` và `em` là gì?"
      },
      "options": [
        {
          "en": "rem is relative to the root (<html>) font size, whereas em is relative to the immediate or parent element's font size",
          "vi": "rem tính theo font thẻ gốc (<html>), còn em tính theo font của chính phần tử hoặc thẻ cha"
        },
        {
          "en": "rem only works on mobile devices",
          "vi": "rem chỉ hoạt động trên thiết bị di động"
        },
        {
          "en": "em is an absolute unit like pixels",
          "vi": "em là đơn vị tuyệt đối như pixel"
        },
        {
          "en": "rem cannot be used for margins or padding",
          "vi": "rem không dùng được cho margin hay padding"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "rem = Root EM (always refers to <html>), while em refers to the current/inherited font-size (which can compound).",
        "vi": "rem = Root EM (luôn tham chiếu đến <html>), còn em tham chiếu theo font-size hiện tại hoặc kế thừa."
      },
      "topicId": "css_units",
      "difficulty": "easy"
    },
    {
      "id": "css_q_4_3",
      "type": "single_choice",
      "question": {
        "en": "What character width does the `ch` unit represent?",
        "vi": "Đơn vị `ch` đại diện cho chiều rộng của ký tự nào trong font chữ hiện tại?"
      },
      "options": [
        {
          "en": "The width of the glyph '0' (zero)",
          "vi": "Chiều rộng của ký tự số '0' (zero)"
        },
        {
          "en": "The width of the letter 'C'",
          "vi": "Chiều rộng của chữ cái 'C'"
        },
        {
          "en": "The width of the letter 'M'",
          "vi": "Chiều rộng của chữ cái 'M'"
        },
        {
          "en": "The width of a blank space",
          "vi": "Chiều rộng của dấu cách trắng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "1ch equals the advance measure (width) of the zero ('0') character in the element's font.",
        "vi": "1ch bằng chiều rộng của chữ số '0' trong font chữ đang áp dụng cho phần tử."
      },
      "topicId": "css_units",
      "difficulty": "medium"
    },
    {
      "id": "css_q_4_4",
      "type": "single_choice",
      "question": {
        "en": "Why was `100dvh` introduced alongside traditional `100vh`?",
        "vi": "Tại sao đơn vị `100dvh` được ra đời bên cạnh đơn vị truyền thống `100vh`?"
      },
      "options": [
        {
          "en": "To prevent content from being obscured when mobile browser navigation and address bars expand/collapse",
          "vi": "Để ngăn nội dung bị che khuất khi thanh địa chỉ trên trình duyệt di động co giãn"
        },
        {
          "en": "To increase 3D rendering speed",
          "vi": "Để tăng tốc độ render 3D"
        },
        {
          "en": "To disable scrolling on desktop monitors",
          "vi": "Để tắt thanh cuộn trên màn hình máy tính"
        },
        {
          "en": "To replace percentages in CSS Grid",
          "vi": "Để thay thế phần trăm trong CSS Grid"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "dvh (dynamic viewport height) dynamically recalculates as mobile browser toolbars appear and disappear during scrolling.",
        "vi": "dvh tự động tính toán lại chiều cao khi thanh công cụ trên di động trượt ra hoặc thu gọn lại."
      },
      "topicId": "css_units",
      "difficulty": "medium"
    },
    {
      "id": "css_q_4_5",
      "type": "true_false",
      "question": {
        "en": "True or False: Using `em` for font-size inside nested lists can cause compounding multiplication (e.g. 1.2em of 1.2em of 1.2em).",
        "vi": "Đúng hay Sai: Dùng đơn vị `em` cho font-size trong các danh sách lồng nhau có thể gây hiệu ứng nhân dồn kích thước (ví dụ 1.2em của 1.2em của 1.2em)."
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
        "en": "Because em is relative to parent font-size, nested elements compound their font sizes exponentially.",
        "vi": "Vì em tính theo thẻ cha, nên các phần tử lồng nhau sẽ nhân dồn kích thước qua từng cấp."
      },
      "topicId": "css_units",
      "difficulty": "easy"
    },
    {
      "id": "css_q_4_6",
      "type": "single_choice",
      "question": {
        "en": "If a container is 800px wide, what is the computed width of a child element with `width: 50%`?",
        "vi": "Nếu thẻ cha rộng 800px, chiều rộng tính toán của thẻ con có `width: 50%` là bao nhiêu?"
      },
      "options": [
        {
          "en": "400px",
          "vi": "400px"
        },
        {
          "en": "800px",
          "vi": "800px"
        },
        {
          "en": "50px",
          "vi": "50px"
        },
        {
          "en": "200px",
          "vi": "200px"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Percentage widths are calculated relative to the containing block's content-box width: 50% of 800px = 400px.",
        "vi": "Phần trăm chiều rộng tính theo vùng chứa cha: 50% của 800px = 400px."
      },
      "topicId": "css_units",
      "difficulty": "easy"
    },
    {
      "id": "css_q_4_7",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The viewport unit representing 1% of the smaller dimension (width or height) is ________",
        "vi": "Điền vào chỗ trống: Đơn vị viewport đại diện cho 1% của cạnh nhỏ hơn (chiều rộng hoặc chiều cao) là ________"
      },
      "fillBlankAnswers": [
        "vmin"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "vmin evaluates to 1% of the smaller dimension between viewport width and height.",
        "vi": "vmin nhận giá trị bằng 1% của cạnh nhỏ hơn giữa chiều ngang và chiều dọc màn hình."
      },
      "topicId": "css_units",
      "difficulty": "medium"
    },
    {
      "id": "css_q_4_8",
      "type": "multiple_choice",
      "question": {
        "en": "Which units are relative to the viewport? (Select all that apply)",
        "vi": "Những đơn vị nào sau đây có giá trị tương đối theo màn hình (viewport)? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "vw",
          "vi": "vw"
        },
        {
          "en": "vh",
          "vi": "vh"
        },
        {
          "en": "svh",
          "vi": "svh"
        },
        {
          "en": "pt",
          "vi": "pt"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "vw, vh, and svh are viewport units. pt (points) is an absolute print unit (1pt = 1/72 inch).",
        "vi": "vw, vh và svh là đơn vị viewport. Còn pt (point) là đơn vị in ấn tuyệt đối (1pt = 1/72 inch)."
      },
      "topicId": "css_units",
      "difficulty": "easy"
    },
    {
      "id": "css_q_4_9",
      "type": "single_choice",
      "question": {
        "en": "What is the recommended range of `ch` units for body text line lengths to ensure optimal readability?",
        "vi": "Độ dài dòng văn bản đọc tốt nhất được khuyến nghị nằm trong khoảng bao nhiêu đơn vị `ch`?"
      },
      "options": [
        {
          "en": "45ch to 75ch",
          "vi": "45ch đến 75ch"
        },
        {
          "en": "10ch to 20ch",
          "vi": "10ch đến 20ch"
        },
        {
          "en": "150ch to 200ch",
          "vi": "150ch đến 200ch"
        },
        {
          "en": "5ch to 15ch",
          "vi": "5ch đến 15ch"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Typography research indicates lines between 45 and 75 characters (ch) provide the most comfortable reading experience.",
        "vi": "Nghiên cứu Typography chứng minh độ dài dòng từ 45 đến 75 ký tự (ch) mang lại trải nghiệm đọc thoải mái nhất."
      },
      "topicId": "css_units",
      "difficulty": "medium"
    },
    {
      "id": "css_q_4_10",
      "type": "true_false",
      "question": {
        "en": "True or False: Using `px` for font-size is strictly forbidden by CSS specifications.",
        "vi": "Đúng hay Sai: Chuẩn đặc tả CSS nghiêm cấm hoàn toàn việc dùng `px` cho font-size."
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
        "en": "Using px is valid CSS syntax, though rem is strongly recommended for accessibility and responsive scaling.",
        "vi": "Dùng px vẫn là cú pháp CSS hợp lệ, dù rem được khuyến khích mạnh mẽ hơn vì tính tiếp cận và co giãn."
      },
      "topicId": "css_units",
      "difficulty": "easy"
    }
  ]
};
