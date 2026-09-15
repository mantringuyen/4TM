import { Lesson } from '../../../../types';

export const lesson02: Lesson = {
  "id": "css_lesson_2",
  "moduleId": "css_mod_1",
  "levelId": "basic",
  "courseId": "css",
  "order": 2,
  "topicId": "css_selectors",
  "title": {
    "en": "CSS Selectors & Specificity Calculation",
    "vi": "Bộ Chọn CSS & Tính Toán Độ Ưu Tiên Specificity"
  },
  "summary": {
    "en": "Master type, class, ID, combinators (child, descendant, siblings), attribute selectors, and calculate exact specificity tuples.",
    "vi": "Làm chủ bộ chọn thẻ, class, ID, tổ hợp (con, cháu, anh em), bộ chọn thuộc tính và tính toán chính xác trọng số Specificity."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Selectors target HTML elements to apply styles. Specificity is calculated as a 4-part tuple (Inline, ID, Class/Attribute/Pseudo-class, Type/Pseudo-element). Understanding combinators and attribute matching enables clean, surgical styling without bloated class names.",
      "vi": "Bộ chọn (selectors) dùng để nhắm trúng các phần tử HTML cần áp dụng kiểu dáng. Độ ưu tiên (Specificity) được tính theo bộ 4 số (Inline, ID, Class/Thuộc tính/Pseudo-class, Thẻ/Pseudo-element). Nắm vững các tổ hợp combinators giúp viết CSS mạch lạc, chính xác mà không cần đặt class rườm rà."
    },
    "conceptExplanation": {
      "en": "Combinators define structural relationships: Descendant (`A B`), Direct Child (`A > B`), Adjacent Sibling (`A + B`), and General Sibling (`A ~ B`). Attribute selectors match presence (`[disabled]`), exact value (`[type='email']`), prefix (`[href^='https']`), suffix (`[src$='.png']`), or substring (`[class*='btn-']`). Specificity is evaluated column-by-column: 1 ID (0,1,0,0) beats 100 Classes (0,0,100,0).",
      "vi": "Các bộ kết hợp (combinators) định nghĩa quan hệ cấu trúc: Hậu duệ (`A B`), Con trực tiếp (`A > B`), Liền kề (`A + B`), và Anh em chung (`A ~ B`). Bộ chọn thuộc tính khớp theo sự tồn tại (`[disabled]`), giá trị chính xác (`[type='email']`), tiền tố (`[href^='https']`), hậu tố (`[src$='.png']`) hoặc chuỗi con (`[class*='btn-']`). Specificity được so sánh theo từng cột từ trái sang phải."
    },
    "syntax": "/* Direct Child & Attribute Selector */\n.nav-list > li > a[target=\"_blank\"] {\n  color: #38bdf8;\n}\n\n/* Adjacent Sibling (Immediately following) */\nh2 + p {\n  margin-top: 8px;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Targeting Form Inputs and Siblings",
          "vi": "Nhắm Chọn Ô Nhập Liệu và Thẻ Anh Em"
        },
        "description": {
          "en": "Styles required inputs and error messages immediately following an input.",
          "vi": "Tạo kiểu cho ô input bắt buộc và đoạn văn bản báo lỗi nằm liền kề phía sau."
        },
        "code": "/* Attribute match on required text inputs */\ninput[type=\"text\"][required] {\n  border: 2px solid #f59e0b;\n}\n\n/* Adjacent sibling paragraph showing error */\ninput:invalid + .error-msg {\n  display: block;\n  color: #ef4444;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Confusing direct child selector (>) with descendant selector (space).",
          "vi": "Nhầm lẫn giữa bộ chọn con trực tiếp (>) và bộ chọn hậu duệ (khoảng trắng)."
        },
        "correction": {
          "en": "Use > when styling only the immediate children, and space when styling nested descendants at any depth.",
          "vi": "Dùng > khi chỉ muốn tác động lên con cấp 1 trực tiếp, dùng khoảng trắng khi muốn chọn mọi cấp cháu chắt."
        }
      }
    ],
    "tips": [
      {
        "en": "Avoid ID selectors (#id) for regular component styling because their high specificity makes them difficult to override.",
        "vi": "Tránh dùng bộ chọn ID (#id) cho component thông thường vì độ ưu tiên quá cao gây khó khăn khi tái sử dụng và ghi đè."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_2_1",
      "type": "complete_code",
      "title": {
        "en": "Target External Links with Attribute Selector",
        "vi": "Chọn Các Liên Kết Ngoài Bằng Bộ Chọn Thuộc Tính"
      },
      "instruction": {
        "en": "Style all anchor tags whose href starts with 'https://' with color #38bdf8 and text-decoration 'underline'.",
        "vi": "Tạo kiểu cho tất cả thẻ a có href bắt đầu bằng 'https://' với color #38bdf8 và text-decoration 'underline'."
      },
      "starterCode": "/* Write attribute selector */\na {\n  color: #38bdf8;\n  text-decoration: underline;\n}",
      "solutionCode": "a[href^=\"https://\"] {\n  color: #38bdf8;\n  text-decoration: underline;\n}",
      "hint": {
        "en": "Use a[href^=\"https://\"]",
        "vi": "Sử dụng cú pháp a[href^=\"https://\"]"
      },
      "explanation": {
        "en": "The ^= operator matches the beginning of an attribute string value.",
        "vi": "Toán tử ^= khớp với phần bắt đầu của chuỗi giá trị thuộc tính."
      }
    },
    {
      "id": "css_ex_2_2",
      "type": "fix_code",
      "title": {
        "en": "Use Direct Child Combinator",
        "vi": "Sử Dụng Bộ Kết Hợp Con Trực Tiếp (>)"
      },
      "instruction": {
        "en": "Update the selector so only direct <li> children of .menu receive a border-bottom of 1px solid #334155.",
        "vi": "Chỉnh sửa bộ chọn để chỉ các thẻ <li> là con trực tiếp của .menu nhận border-bottom 1px solid #334155."
      },
      "starterCode": ".menu li {\n  border-bottom: 1px solid #334155;\n}",
      "solutionCode": ".menu > li {\n  border-bottom: 1px solid #334155;\n}",
      "hint": {
        "en": "Change .menu li to .menu > li",
        "vi": "Đổi .menu li thành .menu > li"
      },
      "explanation": {
        "en": "The > combinator restricts selection to immediate children, avoiding nested submenus.",
        "vi": "Ký hiệu > giới hạn phạm vi trong các thẻ con cấp 1, không làm ảnh hưởng đến menu con lồng bên trong."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_2",
    "title": {
      "en": "Build a Styled Form Field System",
      "vi": "Xây Dựng Hệ Thống Bộ Chọn Trường Biểu Mẫu"
    },
    "description": {
      "en": "Create a selector targeting disabled buttons (.btn[disabled]) with background #475569, cursor 'not-allowed', and opacity 0.6.",
      "vi": "Viết bộ chọn nhắm vào nút bị vô hiệu hóa (.btn[disabled]) với background #475569, cursor 'not-allowed' và opacity 0.6."
    },
    "requirements": [
      {
        "en": ".btn[disabled]",
        "vi": ".btn[disabled]"
      },
      {
        "en": "background: #475569",
        "vi": "background: #475569"
      },
      {
        "en": "cursor: not-allowed",
        "vi": "cursor: not-allowed"
      },
      {
        "en": "opacity: 0.6",
        "vi": "opacity: 0.6"
      }
    ],
    "starterCode": "/* Target disabled button class */\n.btn {\n  /* Add disabled states */\n}",
    "solutionCode": ".btn[disabled] {\n  background: #475569;\n  cursor: not-allowed;\n  opacity: 0.6;\n}",
    "hints": [
      {
        "en": "Combine class and attribute selector: .btn[disabled] { ... }",
        "vi": "Kết hợp class và attribute selector: .btn[disabled] { ... }"
      }
    ],
    "solutionExplanation": {
      "en": "Attribute selector .btn[disabled] provides clear, semantic visual feedback for inactive UI controls.",
      "vi": "Bộ chọn thuộc tính .btn[disabled] mang lại phản hồi trực quan rõ ràng, đúng ngữ nghĩa cho các nút đang bị khóa."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_2_1",
      "type": "single_choice",
      "question": {
        "en": "Which selector has the highest specificity score?",
        "vi": "Bộ chọn nào sau đây có điểm độ ưu tiên (Specificity) cao nhất?"
      },
      "options": [
        {
          "en": "#main-header",
          "vi": "#main-header"
        },
        {
          "en": "header.site-header.sticky",
          "vi": "header.site-header.sticky"
        },
        {
          "en": "body div.container > ul.menu > li.item > a",
          "vi": "body div.container > ul.menu > li.item > a"
        },
        {
          "en": "div[data-role='header']",
          "vi": "div[data-role='header']"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "#main-header has specificity (0,1,0,0), which beats any number of classes and element tags.",
        "vi": "#main-header có trọng số (0,1,0,0) thuộc cột ID, luôn vượt trội so với class và thẻ HTML."
      },
      "topicId": "css_selectors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_2_2",
      "type": "single_choice",
      "question": {
        "en": "What does the adjacent sibling combinator `h2 + p` select?",
        "vi": "Bộ kết hợp anh em liền kề `h2 + p` sẽ chọn phần tử nào?"
      },
      "options": [
        {
          "en": "The first <p> element placed immediately after an <h2> element",
          "vi": "Thẻ <p> đầu tiên nằm ngay liền kề phía sau thẻ <h2>"
        },
        {
          "en": "All <p> elements inside an <h2> element",
          "vi": "Tất cả các thẻ <p> nằm bên trong <h2>"
        },
        {
          "en": "All <p> siblings that appear anywhere after <h2>",
          "vi": "Mọi thẻ <p> anh em nằm ở bất kỳ đâu phía sau <h2>"
        },
        {
          "en": "Both the <h2> and <p> elements together",
          "vi": "Cả hai thẻ <h2> và <p> cùng một lúc"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `+` combinator selects the element that directly and immediately follows the preceding element.",
        "vi": "Ký hiệu `+` chỉ chọn đúng 1 phần tử nằm ngay liền kề sát phía sau phần tử đứng trước."
      },
      "topicId": "css_selectors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_2_3",
      "type": "single_choice",
      "question": {
        "en": "Which attribute selector matches an element whose `class` attribute contains the substring 'card'?",
        "vi": "Bộ chọn thuộc tính nào khớp với phần tử có thuộc tính `class` chứa chuỗi con 'card'?"
      },
      "options": [
        {
          "en": "[class*='card']",
          "vi": "[class*='card']"
        },
        {
          "en": "[class^='card']",
          "vi": "[class^='card']"
        },
        {
          "en": "[class$='card']",
          "vi": "[class$='card']"
        },
        {
          "en": "[class='card']",
          "vi": "[class='card']"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `*=` operator matches any occurrence of the substring anywhere within the attribute value.",
        "vi": "Toán tử `*=` khớp với sự xuất hiện của chuỗi con ở bất kỳ vị trí nào trong giá trị thuộc tính."
      },
      "topicId": "css_selectors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_2_4",
      "type": "single_choice",
      "question": {
        "en": "What is the calculated specificity score of `nav.main-nav > ul > li.active a`?",
        "vi": "Điểm độ ưu tiên Specificity của `nav.main-nav > ul > li.active a` là bao nhiêu?"
      },
      "options": [
        {
          "en": "(0, 0, 2, 4)",
          "vi": "(0, 0, 2, 4)"
        },
        {
          "en": "(0, 1, 2, 3)",
          "vi": "(0, 1, 2, 3)"
        },
        {
          "en": "(0, 0, 6, 0)",
          "vi": "(0, 0, 6, 0)"
        },
        {
          "en": "(0, 2, 0, 4)",
          "vi": "(0, 2, 0, 4)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "0 IDs, 2 Classes (.main-nav, .active), 4 Elements (nav, ul, li, a) = (0, 0, 2, 4).",
        "vi": "0 ID, 2 Class (.main-nav, .active), 4 Thẻ (nav, ul, li, a) cho kết quả là (0, 0, 2, 4)."
      },
      "topicId": "css_selectors",
      "difficulty": "hard"
    },
    {
      "id": "css_q_2_5",
      "type": "true_false",
      "question": {
        "en": "True or False: The universal selector `*` contributes (0, 0, 0, 1) to the specificity score.",
        "vi": "Đúng hay Sai: Bộ chọn toàn cục `*` đóng góp (0, 0, 0, 1) vào điểm Specificity."
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
        "en": "The universal selector (*) and combinators (+, >, ~) have exactly 0 specificity (0, 0, 0, 0).",
        "vi": "Bộ chọn toàn cục (*) và các ký hiệu combinators (+, >, ~) có điểm Specificity bằng 0 (0, 0, 0, 0)."
      },
      "topicId": "css_selectors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_2_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To select all elements that are general siblings following an <h1> element, use the combinator symbol h1 ________ p",
        "vi": "Điền vào chỗ trống: Để chọn tất cả thẻ p là anh em đi sau h1, dùng ký hiệu combinator h1 ________ p"
      },
      "fillBlankAnswers": [
        "~"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The tilde (~) represents the general sibling combinator.",
        "vi": "Dấu ngã (~) đại diện cho bộ chọn anh em chung (general sibling)."
      },
      "topicId": "css_selectors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_2_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following attribute selectors match `<img src='banner.jpg'>`? (Select all that apply)",
        "vi": "Bộ chọn thuộc tính nào sau đây khớp với thẻ `<img src='banner.jpg'>`? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "img[src$='.jpg']",
          "vi": "img[src$='.jpg']"
        },
        {
          "en": "img[src*='banner']",
          "vi": "img[src*='banner']"
        },
        {
          "en": "img[src^='ban']",
          "vi": "img[src^='ban']"
        },
        {
          "en": "img[src^='.jpg']",
          "vi": "img[src^='.jpg']"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "$= matches end (.jpg), *= matches substring (banner), ^= matches start (ban). img[src^='.jpg'] does not match.",
        "vi": "$= khớp đuôi (.jpg), *= khớp chuỗi con (banner), ^= khớp đầu (ban). img[src^='.jpg'] sai vì không bắt đầu bằng .jpg."
      },
      "topicId": "css_selectors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_2_8",
      "type": "single_choice",
      "question": {
        "en": "What does `button:not(.primary)` target?",
        "vi": "Bộ chọn `button:not(.primary)` sẽ tác động lên những phần tử nào?"
      },
      "options": [
        {
          "en": "All button elements that do not have the class 'primary'",
          "vi": "Tất cả các thẻ button không có class 'primary'"
        },
        {
          "en": "Only buttons with the class 'primary'",
          "vi": "Chỉ các button có class 'primary'"
        },
        {
          "en": "All non-button elements with class 'primary'",
          "vi": "Mọi phần tử không phải button có class 'primary'"
        },
        {
          "en": "Disabled buttons",
          "vi": "Các button đang bị disabled"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The :not() negation pseudo-class filters out elements matching its parameter.",
        "vi": "Pseudo-class phủ định :not() loại bỏ các phần tử trùng khớp với tham số truyền vào."
      },
      "topicId": "css_selectors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_2_9",
      "type": "single_choice",
      "question": {
        "en": "How does the specificity of `input[type='text']` compare to `input.text-input`?",
        "vi": "Độ ưu tiên của `input[type='text']` so với `input.text-input` như thế nào?"
      },
      "options": [
        {
          "en": "They have identical specificity (0, 0, 1, 1)",
          "vi": "Chúng có độ ưu tiên hoàn toàn bằng nhau (0, 0, 1, 1)"
        },
        {
          "en": "The attribute selector has higher specificity",
          "vi": "Bộ chọn thuộc tính có độ ưu tiên cao hơn"
        },
        {
          "en": "The class selector has higher specificity",
          "vi": "Bộ chọn class có độ ưu tiên cao hơn"
        },
        {
          "en": "The type selector cancels the class",
          "vi": "Bộ chọn thẻ làm triệt tiêu class"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Attribute selectors and class selectors share the same specificity column weight (0, 0, 1, 0). With element (0,0,0,1), both equal (0,0,1,1).",
        "vi": "Bộ chọn thuộc tính và class có cùng trọng số ở cột thứ ba (0, 0, 1, 0). Cùng với thẻ (0,0,0,1) thì cả hai đều bằng (0, 0, 1, 1)."
      },
      "topicId": "css_selectors",
      "difficulty": "hard"
    },
    {
      "id": "css_q_2_10",
      "type": "true_false",
      "question": {
        "en": "True or False: Specificity can roll over to the next column if you have 10 or more classes (e.g. 10 classes = 1 ID).",
        "vi": "Đúng hay Sai: Độ ưu tiên có thể tràn sang cột tiếp theo nếu có từ 10 class trở lên (ví dụ 10 class = 1 ID)."
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
        "en": "In modern CSS standards, specificity is strictly positional across columns and never rolls over.",
        "vi": "Trong chuẩn CSS hiện đại, các cột độ ưu tiên được so sánh tuyệt đối theo vị trí và không bao giờ xảy ra hiện tượng tràn cột."
      },
      "topicId": "css_selectors",
      "difficulty": "medium"
    }
  ]
};
