import fs from 'fs';
import path from 'path';

function saveLesson(filePath: string, varName: string, lessonObj: any) {
  const content = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessonObj, null, 2)};\n`;
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved: ${filePath}`);
}

// Lesson 1: CSS Syntax, Inclusion Methods & The Cascade
const lesson01 = {
  id: "css_lesson_1",
  moduleId: "css_mod_basic_1",
  levelId: "basic",
  courseId: "css",
  order: 1,
  topicId: "css_syntax_cascade",
  title: {
    en: "CSS Syntax, Inclusion Methods & The Cascade",
    vi: "Cú Pháp CSS, Phương Pháp Nhúng & Cơ Chế Cascade"
  },
  summary: {
    en: "Master CSS rule anatomy, external/internal/inline methods, and understand how the Cascade resolves conflicting styles.",
    vi: "Làm chủ cấu trúc quy tắc CSS, các cách nhúng external/internal/inline và hiểu cách thuật toán Cascade giải quyết xung đột kiểu dáng."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS (Cascading Style Sheets) controls the visual presentation of HTML documents. The term 'Cascading' refers to the deterministic algorithm browsers use to resolve conflicting style declarations across stylesheets, specificity scores, and source order.",
      vi: "CSS (Cascading Style Sheets) định hình giao diện trực quan cho tài liệu HTML. Thuật ngữ 'Cascading' (xếp tầng) chỉ thuật toán xác định mà trình duyệt sử dụng để giải quyết xung đột khi có nhiều quy tắc cùng áp dụng lên một phần tử."
    },
    conceptExplanation: {
      en: "A CSS rule consists of a selector and a declaration block containing property-value pairs. There are three inclusion methods: external <link>, internal <style>, and inline style='...'. When multiple rules target the same element, the Cascade resolves conflicts based on: 1. Origin & Importance (!important), 2. Specificity (Inline > ID > Class > Element), and 3. Source Order (last declared wins). CSS properties also support inheritance from ancestor elements, with explicit controls via inherit, initial, and unset.",
      vi: "Một quy tắc CSS gồm bộ chọn (selector) và khối khai báo chứa các cặp thuộc tính-giá trị. Có 3 cách nhúng: liên kết ngoài <link>, trong tài liệu <style>, và nội dòng inline style='...'. Khi nhiều quy tắc cùng tác động, Cascade giải quyết xung đột dựa trên: 1. Nguồn gốc & Độ quan trọng (!important), 2. Độ ưu tiên Specificity (Inline > ID > Class > Thẻ), và 3. Thứ tự xuất hiện (khai báo sau cùng sẽ thắng). Các thuộc tính cũng có tính kế thừa từ thẻ cha, điều khiển bằng inherit, initial và unset."
    },
    syntax: `/* External Stylesheet Link */\n<link rel="stylesheet" href="styles.css">\n\n/* Standard CSS Rule */\nselector {\n  property: value;\n  color: inherit;\n}`,
    examples: [
      {
        title: {
          en: "CSS Rule Anatomy and Cascade in Action",
          vi: "Cấu Trúc Quy Tắc CSS và Cơ Chế Cascade Thực Tế"
        },
        description: {
          en: "Demonstrates how source order determines winning styles when specificity is identical.",
          vi: "Minh họa cách thứ tự dòng code quyết định style thắng cuộc khi độ ưu tiên ngang nhau."
        },
        code: `/* Base class rule */\n.card-banner {\n  background-color: #1e293b;\n  color: #f8fafc;\n  padding: 16px;\n  border-radius: 8px;\n}\n\n/* Later class rule overrides previous property due to source order */\n.card-banner {\n  background-color: #0284c7; /* This color wins */\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Overusing inline styles or !important to force overrides, breaking maintainability.",
          vi: "Lạm dụng style inline hoặc !important để ghi đè, làm phá vỡ khả năng bảo trì mã nguồn."
        },
        correction: {
          en: "Organize selectors with clean class-based specificity instead of relying on !important.",
          vi: "Tổ chức các bộ chọn bằng class với độ ưu tiên rõ ràng thay vì phụ thuộc vào !important."
        }
      }
    ],
    tips: [
      {
        en: "Always prefer external stylesheets (<link>) for caching performance and clean separation of concerns.",
        vi: "Luôn ưu tiên dùng file CSS rời (<link>) để tận dụng bộ nhớ cache trình duyệt và phân tách cấu trúc rõ ràng."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_1_1",
      type: "complete_code",
      title: {
        en: "Define Base Element Styles",
        vi: "Thiết Lập Kiểu Dáng Cơ Bản Cho Phần Tử"
      },
      instruction: {
        en: "Set the .hero-text color to #f8fafc and background-color to #0f172a.",
        vi: "Đặt màu chữ (color) của .hero-text thành #f8fafc và background-color thành #0f172a."
      },
      starterCode: `.hero-text {\n  /* Add color and background-color */\n}`,
      solutionCode: `.hero-text {\n  color: #f8fafc;\n  background-color: #0f172a;\n}`,
      hint: {
        en: "Use color: #f8fafc; and background-color: #0f172a;",
        vi: "Sử dụng color: #f8fafc; và background-color: #0f172a;"
      },
      explanation: {
        en: "Color applies to text foreground while background-color sets container backdrop.",
        vi: "Thuộc tính color đổi màu chữ còn background-color đổi màu nền vùng chứa."
      }
    },
    {
      id: "css_ex_1_2",
      type: "fix_code",
      title: {
        en: "Fix Inheritance with Unset",
        vi: "Sửa Lỗi Kế Thừa Bằng Unset"
      },
      instruction: {
        en: "Reset the button border to 'none' and set color to 'inherit' from its parent.",
        vi: "Đặt border của button thành 'none' và đặt color thành 'inherit' từ phần tử cha."
      },
      starterCode: `button.custom-btn {\n  border: 2px solid red;\n  color: red;\n}`,
      solutionCode: `button.custom-btn {\n  border: none;\n  color: inherit;\n}`,
      hint: {
        en: "Change border to none and color to inherit.",
        vi: "Đổi border thành none và color thành inherit."
      },
      explanation: {
        en: "Setting color: inherit makes the element take its parent font color.",
        vi: "Đặt color: inherit giúp phần tử kế thừa trực tiếp màu chữ từ thẻ cha."
      }
    }
  ],
  challenge: {
    id: "css_ch_1",
    title: {
      en: "Build a Modern CSS Notification Card",
      vi: "Xây Dựng Thẻ Thông Báo CSS Chuẩn Cascade"
    },
    description: {
      en: "Style a notification card (.alert-box) with background #0f172a, text color #e2e8f0, padding 16px, and a left border of 4px solid #38bdf8.",
      vi: "Tạo kiểu cho thẻ thông báo (.alert-box) với background #0f172a, text color #e2e8f0, padding 16px và viền trái border-left 4px solid #38bdf8."
    },
    requirements: [
      { en: "background: #0f172a", vi: "background: #0f172a" },
      { en: "color: #e2e8f0", vi: "color: #e2e8f0" },
      { en: "padding: 16px", vi: "padding: 16px" },
      { en: "border-left: 4px solid #38bdf8", vi: "border-left: 4px solid #38bdf8" }
    ],
    starterCode: `.alert-box {\n  /* Write CSS declarations */\n}`,
    solutionCode: `.alert-box {\n  background: #0f172a;\n  color: #e2e8f0;\n  padding: 16px;\n  border-left: 4px solid #38bdf8;\n}`,
    hints: [
      {
        en: "Declare background, color, padding, and border-left properties inside .alert-box.",
        vi: "Khai báo các thuộc tính background, color, padding và border-left trong .alert-box."
      }
    ],
    solutionExplanation: {
      en: "A distinct left border accent creates an accessible, scannable alert container.",
      vi: "Đường viền nhấn bên trái giúp thông báo trực quan, nổi bật và dễ nhận diện."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_1_1",
      type: "single_choice",
      question: {
        en: "What is the primary purpose of the 'Cascading' algorithm in CSS?",
        vi: "Mục đích chính của thuật toán 'Cascading' trong CSS là gì?"
      },
      options: [
        { en: "To resolve conflicts between multiple style rules applying to the same element", vi: "Để giải quyết xung đột giữa nhiều quy tắc style cùng áp dụng lên một phần tử" },
        { en: "To convert CSS into machine assembly code", vi: "Để biên dịch CSS thành mã máy" },
        { en: "To automatically download fonts from Google Fonts", vi: "Để tự động tải font từ Google Fonts" },
        { en: "To animate HTML elements on page load", vi: "Để tạo hiệu ứng chuyển động khi tải trang" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The Cascade algorithm deterministically resolves style conflicts based on origin, specificity, and source order.",
        vi: "Thuật toán Cascade giải quyết xung đột kiểu dáng dựa trên nguồn gốc, độ ưu tiên và thứ tự khai báo."
      },
      topicId: "css_syntax_cascade",
      difficulty: "easy"
    },
    {
      id: "css_q_1_2",
      type: "single_choice",
      question: {
        en: "Which method of including CSS has the highest specificity by default?",
        vi: "Cách nhúng CSS nào có độ ưu tiên (specificity) cao nhất theo mặc định?"
      },
      options: [
        { en: "Inline styles via the style='' HTML attribute", vi: "Style nội dòng thông qua thuộc tính HTML style=''" },
        { en: "External stylesheet via <link>", vi: "File CSS ngoài liên kết bằng <link>" },
        { en: "Internal stylesheet via <style> tags", vi: "Thẻ <style> trong phần <head>" },
        { en: "Imported stylesheet via @import", vi: "CSS được import qua cú pháp @import" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Inline styles (style attribute) have a specificity weight of (1,0,0,0), beating IDs, classes, and tag selectors.",
        vi: "Style inline có trọng số ưu tiên là (1,0,0,0), cao hơn ID, class và thẻ HTML."
      },
      topicId: "css_syntax_cascade",
      difficulty: "easy"
    },
    {
      id: "css_q_1_3",
      type: "true_false",
      question: {
        en: "True or False: If two class selectors targeting the same element have equal specificity, the rule written later in the CSS stylesheet wins.",
        vi: "Đúng hay Sai: Nếu hai bộ chọn class có độ ưu tiên bằng nhau cùng tác động lên một phần tử, quy tắc được viết sau trong file CSS sẽ thắng."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "When origin and specificity are equal, source order breaks the tie (last declared rule wins).",
        vi: "Khi nguồn gốc và độ ưu tiên ngang nhau, thứ tự dòng code sẽ quyết định (quy tắc viết sau sẽ thắng)."
      },
      topicId: "css_syntax_cascade",
      difficulty: "easy"
    },
    {
      id: "css_q_1_4",
      type: "single_choice",
      question: {
        en: "What does the CSS property value `color: inherit;` do?",
        vi: "Giá trị thuộc tính `color: inherit;` có tác dụng gì?"
      },
      options: [
        { en: "Explicitly forces the element to adopt its parent's computed color value", vi: "Buộc phần tử phải nhận trực tiếp giá trị màu được tính toán từ thẻ cha" },
        { en: "Resets the color to the browser default (black)", vi: "Đặt lại màu về mặc định của trình duyệt (đen)" },
        { en: "Removes color entirely, rendering the text invisible", vi: "Xóa màu hoàn toàn làm chữ tàng hình" },
        { en: "Inverts the current background color", vi: "Đảo ngược màu nền hiện tại" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The inherit keyword specifies that a property should take the value of its parent element.",
        vi: "Từ khóa inherit chỉ định thuộc tính sẽ nhận giá trị của phần tử cha trực tiếp."
      },
      topicId: "css_syntax_cascade",
      difficulty: "medium"
    },
    {
      id: "css_q_1_5",
      type: "single_choice",
      question: {
        en: "What does the keyword `initial` do in CSS?",
        vi: "Từ khóa `initial` có tác dụng gì trong CSS?"
      },
      options: [
        { en: "Sets the property to its official CSS specification default value", vi: "Đặt thuộc tính về giá trị mặc định theo chuẩn đặc tả W3C" },
        { en: "Inherits the value from the parent", vi: "Kế thừa giá trị từ thẻ cha" },
        { en: "Clears the cache", vi: "Xóa bộ nhớ đệm cache" },
        { en: "Applies the author stylesheet value", vi: "Áp dụng giá trị của tác giả stylesheet" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The `initial` keyword sets a property to its official default value as defined in the CSS specification.",
        vi: "Từ khóa `initial` đưa thuộc tính về giá trị khởi tạo ban đầu được định nghĩa trong chuẩn CSS."
      },
      topicId: "css_syntax_cascade",
      difficulty: "medium"
    },
    {
      id: "css_q_1_6",
      type: "multiple_choice",
      question: {
        en: "Which factors are evaluated by the CSS Cascade algorithm to determine the winning declaration? (Select all that apply)",
        vi: "Những yếu tố nào được thuật toán CSS Cascade đánh giá để chọn ra khai báo thắng cuộc? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "Importance & Origin (!important, author vs user agent)", vi: "Độ quan trọng & Nguồn gốc (!important, tác giả vs trình duyệt)" },
        { en: "Specificity score of the selector", vi: "Điểm số độ ưu tiên (Specificity) của bộ chọn" },
        { en: "Source order (position in stylesheets)", vi: "Thứ tự xuất hiện trong stylesheet" },
        { en: "File size of the HTML document", vi: "Kích thước dung lượng file HTML" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "The Cascade evaluates Importance/Origin, Specificity, and Source Order. Document file size is irrelevant.",
        vi: "Cascade đánh giá Nguồn gốc/Tầm quan trọng, Độ ưu tiên và Thứ tự xuất hiện. Dung lượng file không liên quan."
      },
      topicId: "css_syntax_cascade",
      difficulty: "medium"
    },
    {
      id: "css_q_1_7",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The keyword used in CSS declarations to override normal cascade order with maximum priority is !________",
        vi: "Điền vào chỗ trống: Từ khóa dùng để ghi đè thứ tự xếp tầng thông thường với độ ưu tiên cao nhất là !________"
      },
      fillBlankAnswers: ["important"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "!important gives a declaration top priority within the author stylesheet cascade level.",
        vi: "!important trao độ ưu tiên cao nhất cho khai báo trong tầng stylesheet tác giả."
      },
      topicId: "css_syntax_cascade",
      difficulty: "easy"
    },
    {
      id: "css_q_1_8",
      type: "predict_output",
      question: {
        en: "Given `<p class='text info'>Hello</p>` and CSS:\n`.info { color: blue; }`\n`.text { color: red; }`\nWhat is the color of the text?",
        vi: "Cho thẻ `<p class='text info'>Hello</p>` và CSS:\n`.info { color: blue; }`\n`.text { color: red; }`\nMàu chữ hiển thị là màu gì?"
      },
      options: [
        { en: "red", vi: "red (đỏ)" },
        { en: "blue", vi: "blue (xanh dương)" },
        { en: "black", vi: "black (đen)" },
        { en: "transparent", vi: "transparent (trong suốt)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Both selectors have identical specificity (0,0,1,0). The later rule in the stylesheet (.text { color: red; }) wins regardless of class order in HTML.",
        vi: "Cả hai bộ chọn đều có độ ưu tiên bằng nhau (0,0,1,0). Quy tắc viết sau (.text { color: red; }) sẽ thắng, không phụ thuộc thứ tự class trong HTML."
      },
      topicId: "css_syntax_cascade",
      difficulty: "medium"
    },
    {
      id: "css_q_1_9",
      type: "true_false",
      question: {
        en: "True or False: The order of classes written inside the HTML class attribute (e.g. `class='a b'` vs `class='b a'`) affects CSS specificity.",
        vi: "Đúng hay Sai: Thứ tự các class viết trong thuộc tính HTML class (ví dụ `class='a b'` vs `class='b a'`) có làm thay đổi độ ưu tiên CSS."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Specificity and source order in the CSS stylesheet determine precedence, not the order in the HTML class attribute.",
        vi: "Thứ tự trong file CSS mới quyết định độ ưu tiên, thứ tự class trong HTML hoàn toàn không ảnh hưởng."
      },
      topicId: "css_syntax_cascade",
      difficulty: "easy"
    },
    {
      id: "css_q_1_10",
      type: "single_choice",
      question: {
        en: "Which property resets an element's inherited property to inherit and non-inherited property to initial?",
        vi: "Thuộc tính nào đặt giá trị kế thừa thành inherit và giá trị không kế thừa thành initial?"
      },
      options: [
        { en: "unset", vi: "unset" },
        { en: "revert", vi: "revert" },
        { en: "none", vi: "none" },
        { en: "default", vi: "default" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The `unset` keyword acts as `inherit` for inherited properties and `initial` for non-inherited properties.",
        vi: "Từ khóa `unset` hoạt động như `inherit` với thuộc tính kế thừa và như `initial` với thuộc tính không kế thừa."
      },
      topicId: "css_syntax_cascade",
      difficulty: "hard"
    }
  ]
};

// Lesson 2: CSS Selectors & Specificity Calculation
const lesson02 = {
  id: "css_lesson_2",
  moduleId: "css_mod_basic_1",
  levelId: "basic",
  courseId: "css",
  order: 2,
  topicId: "css_selectors",
  title: {
    en: "CSS Selectors & Specificity Calculation",
    vi: "Bộ Chọn CSS & Tính Toán Độ Ưu Tiên Specificity"
  },
  summary: {
    en: "Master type, class, ID, combinators (child, descendant, siblings), attribute selectors, and calculate exact specificity tuples.",
    vi: "Làm chủ bộ chọn thẻ, class, ID, tổ hợp (con, cháu, anh em), bộ chọn thuộc tính và tính toán chính xác trọng số Specificity."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Selectors target HTML elements to apply styles. Specificity is calculated as a 4-part tuple (Inline, ID, Class/Attribute/Pseudo-class, Type/Pseudo-element). Understanding combinators and attribute matching enables clean, surgical styling without bloated class names.",
      vi: "Bộ chọn (selectors) dùng để nhắm trúng các phần tử HTML cần áp dụng kiểu dáng. Độ ưu tiên (Specificity) được tính theo bộ 4 số (Inline, ID, Class/Thuộc tính/Pseudo-class, Thẻ/Pseudo-element). Nắm vững các tổ hợp combinators giúp viết CSS mạch lạc, chính xác mà không cần đặt class rườm rà."
    },
    conceptExplanation: {
      en: "Combinators define structural relationships: Descendant (`A B`), Direct Child (`A > B`), Adjacent Sibling (`A + B`), and General Sibling (`A ~ B`). Attribute selectors match presence (`[disabled]`), exact value (`[type='email']`), prefix (`[href^='https']`), suffix (`[src$='.png']`), or substring (`[class*='btn-']`). Specificity is evaluated column-by-column: 1 ID (0,1,0,0) beats 100 Classes (0,0,100,0).",
      vi: "Các bộ kết hợp (combinators) định nghĩa quan hệ cấu trúc: Hậu duệ (`A B`), Con trực tiếp (`A > B`), Liền kề (`A + B`), và Anh em chung (`A ~ B`). Bộ chọn thuộc tính khớp theo sự tồn tại (`[disabled]`), giá trị chính xác (`[type='email']`), tiền tố (`[href^='https']`), hậu tố (`[src$='.png']`) hoặc chuỗi con (`[class*='btn-']`). Specificity được so sánh theo từng cột từ trái sang phải."
    },
    syntax: `/* Direct Child & Attribute Selector */\n.nav-list > li > a[target="_blank"] {\n  color: #38bdf8;\n}\n\n/* Adjacent Sibling (Immediately following) */\nh2 + p {\n  margin-top: 8px;\n}`,
    examples: [
      {
        title: {
          en: "Targeting Form Inputs and Siblings",
          vi: "Nhắm Chọn Ô Nhập Liệu và Thẻ Anh Em"
        },
        description: {
          en: "Styles required inputs and error messages immediately following an input.",
          vi: "Tạo kiểu cho ô input bắt buộc và đoạn văn bản báo lỗi nằm liền kề phía sau."
        },
        code: `/* Attribute match on required text inputs */\ninput[type="text"][required] {\n  border: 2px solid #f59e0b;\n}\n\n/* Adjacent sibling paragraph showing error */\ninput:invalid + .error-msg {\n  display: block;\n  color: #ef4444;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Confusing direct child selector (>) with descendant selector (space).",
          vi: "Nhầm lẫn giữa bộ chọn con trực tiếp (>) và bộ chọn hậu duệ (khoảng trắng)."
        },
        correction: {
          en: "Use > when styling only the immediate children, and space when styling nested descendants at any depth.",
          vi: "Dùng > khi chỉ muốn tác động lên con cấp 1 trực tiếp, dùng khoảng trắng khi muốn chọn mọi cấp cháu chắt."
        }
      }
    ],
    tips: [
      {
        en: "Avoid ID selectors (#id) for regular component styling because their high specificity makes them difficult to override.",
        vi: "Tránh dùng bộ chọn ID (#id) cho component thông thường vì độ ưu tiên quá cao gây khó khăn khi tái sử dụng và ghi đè."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_2_1",
      type: "complete_code",
      title: {
        en: "Target External Links with Attribute Selector",
        vi: "Chọn Các Liên Kết Ngoài Bằng Bộ Chọn Thuộc Tính"
      },
      instruction: {
        en: "Style all anchor tags whose href starts with 'https://' with color #38bdf8 and text-decoration 'underline'.",
        vi: "Tạo kiểu cho tất cả thẻ a có href bắt đầu bằng 'https://' với color #38bdf8 và text-decoration 'underline'."
      },
      starterCode: `/* Write attribute selector */\na {\n  color: #38bdf8;\n  text-decoration: underline;\n}`,
      solutionCode: `a[href^="https://"] {\n  color: #38bdf8;\n  text-decoration: underline;\n}`,
      hint: {
        en: "Use a[href^=\"https://\"]",
        vi: "Sử dụng cú pháp a[href^=\"https://\"]"
      },
      explanation: {
        en: "The ^= operator matches the beginning of an attribute string value.",
        vi: "Toán tử ^= khớp với phần bắt đầu của chuỗi giá trị thuộc tính."
      }
    },
    {
      id: "css_ex_2_2",
      type: "fix_code",
      title: {
        en: "Use Direct Child Combinator",
        vi: "Sử Dụng Bộ Kết Hợp Con Trực Tiếp (>)"
      },
      instruction: {
        en: "Update the selector so only direct <li> children of .menu receive a border-bottom of 1px solid #334155.",
        vi: "Chỉnh sửa bộ chọn để chỉ các thẻ <li> là con trực tiếp của .menu nhận border-bottom 1px solid #334155."
      },
      starterCode: `.menu li {\n  border-bottom: 1px solid #334155;\n}`,
      solutionCode: `.menu > li {\n  border-bottom: 1px solid #334155;\n}`,
      hint: {
        en: "Change .menu li to .menu > li",
        vi: "Đổi .menu li thành .menu > li"
      },
      explanation: {
        en: "The > combinator restricts selection to immediate children, avoiding nested submenus.",
        vi: "Ký hiệu > giới hạn phạm vi trong các thẻ con cấp 1, không làm ảnh hưởng đến menu con lồng bên trong."
      }
    }
  ],
  challenge: {
    id: "css_ch_2",
    title: {
      en: "Build a Styled Form Field System",
      vi: "Xây Dựng Hệ Thống Bộ Chọn Trường Biểu Mẫu"
    },
    description: {
      en: "Create a selector targeting disabled buttons (.btn[disabled]) with background #475569, cursor 'not-allowed', and opacity 0.6.",
      vi: "Viết bộ chọn nhắm vào nút bị vô hiệu hóa (.btn[disabled]) với background #475569, cursor 'not-allowed' và opacity 0.6."
    },
    requirements: [
      { en: ".btn[disabled]", vi: ".btn[disabled]" },
      { en: "background: #475569", vi: "background: #475569" },
      { en: "cursor: not-allowed", vi: "cursor: not-allowed" },
      { en: "opacity: 0.6", vi: "opacity: 0.6" }
    ],
    starterCode: `/* Target disabled button class */\n.btn {\n  /* Add disabled states */\n}`,
    solutionCode: `.btn[disabled] {\n  background: #475569;\n  cursor: not-allowed;\n  opacity: 0.6;\n}`,
    hints: [
      {
        en: "Combine class and attribute selector: .btn[disabled] { ... }",
        vi: "Kết hợp class và attribute selector: .btn[disabled] { ... }"
      }
    ],
    solutionExplanation: {
      en: "Attribute selector .btn[disabled] provides clear, semantic visual feedback for inactive UI controls.",
      vi: "Bộ chọn thuộc tính .btn[disabled] mang lại phản hồi trực quan rõ ràng, đúng ngữ nghĩa cho các nút đang bị khóa."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_2_1",
      type: "single_choice",
      question: {
        en: "Which selector has the highest specificity score?",
        vi: "Bộ chọn nào sau đây có điểm độ ưu tiên (Specificity) cao nhất?"
      },
      options: [
        { en: "#main-header", vi: "#main-header" },
        { en: "header.site-header.sticky", vi: "header.site-header.sticky" },
        { en: "body div.container > ul.menu > li.item > a", vi: "body div.container > ul.menu > li.item > a" },
        { en: "div[data-role='header']", vi: "div[data-role='header']" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "#main-header has specificity (0,1,0,0), which beats any number of classes and element tags.",
        vi: "#main-header có trọng số (0,1,0,0) thuộc cột ID, luôn vượt trội so với class và thẻ HTML."
      },
      topicId: "css_selectors",
      difficulty: "easy"
    },
    {
      id: "css_q_2_2",
      type: "single_choice",
      question: {
        en: "What does the adjacent sibling combinator `h2 + p` select?",
        vi: "Bộ kết hợp anh em liền kề `h2 + p` sẽ chọn phần tử nào?"
      },
      options: [
        { en: "The first <p> element placed immediately after an <h2> element", vi: "Thẻ <p> đầu tiên nằm ngay liền kề phía sau thẻ <h2>" },
        { en: "All <p> elements inside an <h2> element", vi: "Tất cả các thẻ <p> nằm bên trong <h2>" },
        { en: "All <p> siblings that appear anywhere after <h2>", vi: "Mọi thẻ <p> anh em nằm ở bất kỳ đâu phía sau <h2>" },
        { en: "Both the <h2> and <p> elements together", vi: "Cả hai thẻ <h2> và <p> cùng một lúc" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The `+` combinator selects the element that directly and immediately follows the preceding element.",
        vi: "Ký hiệu `+` chỉ chọn đúng 1 phần tử nằm ngay liền kề sát phía sau phần tử đứng trước."
      },
      topicId: "css_selectors",
      difficulty: "medium"
    },
    {
      id: "css_q_2_3",
      type: "single_choice",
      question: {
        en: "Which attribute selector matches an element whose `class` attribute contains the substring 'card'?",
        vi: "Bộ chọn thuộc tính nào khớp với phần tử có thuộc tính `class` chứa chuỗi con 'card'?"
      },
      options: [
        { en: "[class*='card']", vi: "[class*='card']" },
        { en: "[class^='card']", vi: "[class^='card']" },
        { en: "[class$='card']", vi: "[class$='card']" },
        { en: "[class='card']", vi: "[class='card']" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The `*=` operator matches any occurrence of the substring anywhere within the attribute value.",
        vi: "Toán tử `*=` khớp với sự xuất hiện của chuỗi con ở bất kỳ vị trí nào trong giá trị thuộc tính."
      },
      topicId: "css_selectors",
      difficulty: "medium"
    },
    {
      id: "css_q_2_4",
      type: "single_choice",
      question: {
        en: "What is the calculated specificity score of `nav.main-nav > ul > li.active a`?",
        vi: "Điểm độ ưu tiên Specificity của `nav.main-nav > ul > li.active a` là bao nhiêu?"
      },
      options: [
        { en: "(0, 0, 2, 4)", vi: "(0, 0, 2, 4)" },
        { en: "(0, 1, 2, 3)", vi: "(0, 1, 2, 3)" },
        { en: "(0, 0, 6, 0)", vi: "(0, 0, 6, 0)" },
        { en: "(0, 2, 0, 4)", vi: "(0, 2, 0, 4)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "0 IDs, 2 Classes (.main-nav, .active), 4 Elements (nav, ul, li, a) = (0, 0, 2, 4).",
        vi: "0 ID, 2 Class (.main-nav, .active), 4 Thẻ (nav, ul, li, a) cho kết quả là (0, 0, 2, 4)."
      },
      topicId: "css_selectors",
      difficulty: "hard"
    },
    {
      id: "css_q_2_5",
      type: "true_false",
      question: {
        en: "True or False: The universal selector `*` contributes (0, 0, 0, 1) to the specificity score.",
        vi: "Đúng hay Sai: Bộ chọn toàn cục `*` đóng góp (0, 0, 0, 1) vào điểm Specificity."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The universal selector (*) and combinators (+, >, ~) have exactly 0 specificity (0, 0, 0, 0).",
        vi: "Bộ chọn toàn cục (*) và các ký hiệu combinators (+, >, ~) có điểm Specificity bằng 0 (0, 0, 0, 0)."
      },
      topicId: "css_selectors",
      difficulty: "easy"
    },
    {
      id: "css_q_2_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To select all elements that are general siblings following an <h1> element, use the combinator symbol h1 ________ p",
        vi: "Điền vào chỗ trống: Để chọn tất cả thẻ p là anh em đi sau h1, dùng ký hiệu combinator h1 ________ p"
      },
      fillBlankAnswers: ["~"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "The tilde (~) represents the general sibling combinator.",
        vi: "Dấu ngã (~) đại diện cho bộ chọn anh em chung (general sibling)."
      },
      topicId: "css_selectors",
      difficulty: "medium"
    },
    {
      id: "css_q_2_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following attribute selectors match `<img src='banner.jpg'>`? (Select all that apply)",
        vi: "Bộ chọn thuộc tính nào sau đây khớp với thẻ `<img src='banner.jpg'>`? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "img[src$='.jpg']", vi: "img[src$='.jpg']" },
        { en: "img[src*='banner']", vi: "img[src*='banner']" },
        { en: "img[src^='ban']", vi: "img[src^='ban']" },
        { en: "img[src^='.jpg']", vi: "img[src^='.jpg']" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "$= matches end (.jpg), *= matches substring (banner), ^= matches start (ban). img[src^='.jpg'] does not match.",
        vi: "$= khớp đuôi (.jpg), *= khớp chuỗi con (banner), ^= khớp đầu (ban). img[src^='.jpg'] sai vì không bắt đầu bằng .jpg."
      },
      topicId: "css_selectors",
      difficulty: "medium"
    },
    {
      id: "css_q_2_8",
      type: "single_choice",
      question: {
        en: "What does `button:not(.primary)` target?",
        vi: "Bộ chọn `button:not(.primary)` sẽ tác động lên những phần tử nào?"
      },
      options: [
        { en: "All button elements that do not have the class 'primary'", vi: "Tất cả các thẻ button không có class 'primary'" },
        { en: "Only buttons with the class 'primary'", vi: "Chỉ các button có class 'primary'" },
        { en: "All non-button elements with class 'primary'", vi: "Mọi phần tử không phải button có class 'primary'" },
        { en: "Disabled buttons", vi: "Các button đang bị disabled" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The :not() negation pseudo-class filters out elements matching its parameter.",
        vi: "Pseudo-class phủ định :not() loại bỏ các phần tử trùng khớp với tham số truyền vào."
      },
      topicId: "css_selectors",
      difficulty: "easy"
    },
    {
      id: "css_q_2_9",
      type: "single_choice",
      question: {
        en: "How does the specificity of `input[type='text']` compare to `input.text-input`?",
        vi: "Độ ưu tiên của `input[type='text']` so với `input.text-input` như thế nào?"
      },
      options: [
        { en: "They have identical specificity (0, 0, 1, 1)", vi: "Chúng có độ ưu tiên hoàn toàn bằng nhau (0, 0, 1, 1)" },
        { en: "The attribute selector has higher specificity", vi: "Bộ chọn thuộc tính có độ ưu tiên cao hơn" },
        { en: "The class selector has higher specificity", vi: "Bộ chọn class có độ ưu tiên cao hơn" },
        { en: "The type selector cancels the class", vi: "Bộ chọn thẻ làm triệt tiêu class" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Attribute selectors and class selectors share the same specificity column weight (0, 0, 1, 0). With element (0,0,0,1), both equal (0,0,1,1).",
        vi: "Bộ chọn thuộc tính và class có cùng trọng số ở cột thứ ba (0, 0, 1, 0). Cùng với thẻ (0,0,0,1) thì cả hai đều bằng (0, 0, 1, 1)."
      },
      topicId: "css_selectors",
      difficulty: "hard"
    },
    {
      id: "css_q_2_10",
      type: "true_false",
      question: {
        en: "True or False: Specificity can roll over to the next column if you have 10 or more classes (e.g. 10 classes = 1 ID).",
        vi: "Đúng hay Sai: Độ ưu tiên có thể tràn sang cột tiếp theo nếu có từ 10 class trở lên (ví dụ 10 class = 1 ID)."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "In modern CSS standards, specificity is strictly positional across columns and never rolls over.",
        vi: "Trong chuẩn CSS hiện đại, các cột độ ưu tiên được so sánh tuyệt đối theo vị trí và không bao giờ xảy ra hiện tượng tràn cột."
      },
      topicId: "css_selectors",
      difficulty: "medium"
    }
  ]
};

// Lesson 3: Pseudo-classes & Pseudo-elements
const lesson03 = {
  id: "css_lesson_3",
  moduleId: "css_mod_basic_1",
  levelId: "basic",
  courseId: "css",
  order: 3,
  topicId: "css_pseudo",
  title: {
    en: "Pseudo-classes & Pseudo-elements",
    vi: "Pseudo-classes & Pseudo-elements"
  },
  summary: {
    en: "Differentiate state-based pseudo-classes (:hover, :focus-visible, :nth-child) and structural pseudo-elements (::before, ::after, ::placeholder).",
    vi: "Phân biệt pseudo-classes biểu thị trạng thái (:hover, :focus-visible, :nth-child) và pseudo-elements tạo cấu trúc ảo (::before, ::after, ::placeholder)."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Pseudo-classes (single colon ':') select elements based on state, interaction, or document position. Pseudo-elements (double colon '::') create and style virtual sub-elements that do not exist explicitly in the HTML DOM.",
      vi: "Pseudo-classes (dấu 2 chấm đơn ':') nhắm vào trạng thái, tương tác người dùng hoặc vị trí trong DOM. Pseudo-elements (dấu 2 chấm kép '::') tạo và tạo kiểu cho các phần tử con ảo không tồn tại sẵn trong mã HTML."
    },
    conceptExplanation: {
      en: "Common dynamic pseudo-classes include `:hover`, `:active`, `:focus`, and `:focus-visible` (best for keyboard accessibility). Structural pseudo-classes include `:first-child`, `:last-child`, `:nth-child(An+B)` (e.g. `:nth-child(2n)` for alternating rows), and `:nth-of-type()`. Pseudo-elements `::before` and `::after` require `content: ''` to render and are commonly used for decorative icons, badges, and accents. `::placeholder` styles input hints, and `::selection` customizes text highlighting.",
      vi: "Các pseudo-classes động phổ biến gồm `:hover`, `:active`, `:focus`, và `:focus-visible` (tối ưu khả năng truy cập qua bàn phím). Các pseudo-class vị trí gồm `:first-child`, `:last-child`, `:nth-child(An+B)` và `:nth-of-type()`. Pseudo-elements `::before` và `::after` bắt buộc phải có thuộc tính `content: ''` để hiển thị, chuyên dùng tạo icon trang trí, huy hiệu và viền nhấn. `::placeholder` chỉnh kiểu chữ gợi ý, còn `::selection` đổi màu vùng bôi đen."
    },
    syntax: `/* Dynamic & Accessibility pseudo-class */\nbutton:focus-visible {\n  outline: 2px solid #38bdf8;\n  outline-offset: 2px;\n}\n\n/* Pseudo-element decorative badge */\n.badge::before {\n  content: "★ ";\n  color: #f59e0b;\n}`,
    examples: [
      {
        title: {
          en: "Zebra Striping and Custom Tooltip Accent",
          vi: "Kẻ Bảng So Le (Zebra Striping) và Điểm Nhấn Tooltip"
        },
        description: {
          en: "Uses :nth-child(even) for alternating table rows and ::after for an indicator dot.",
          vi: "Dùng :nth-child(even) tạo màu so le cho hàng bảng và ::after tạo chấm chỉ báo trạng thái."
        },
        code: `/* Alternate row background */\ntr:nth-child(even) {\n  background-color: #1e293b;\n}\n\n/* Status indicator dot using ::after */\n.status-online::after {\n  content: "";\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #22c55e;\n  margin-left: 6px;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Forgetting to declare content: '' on ::before or ::after, preventing the element from rendering.",
          vi: "Quên khai báo content: '' cho ::before hoặc ::after khiến phần tử ảo không thể hiển thị."
        },
        correction: {
          en: "Always supply content: '' (even if empty string) when initializing ::before and ::after.",
          vi: "Luôn luôn khai báo content: '' (dù là chuỗi rỗng) khi sử dụng ::before và ::after."
        }
      }
    ],
    tips: [
      {
        en: "Use :focus-visible instead of :focus to avoid distracting focus rings on mouse clicks while preserving keyboard tab navigation.",
        vi: "Dùng :focus-visible thay vì :focus để không hiện viền xanh khi nhấp chuột mà vẫn giữ điều hướng chuẩn qua phím Tab."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_3_1",
      type: "complete_code",
      title: {
        en: "Style Keyboard Focus Indicator",
        vi: "Tạo Hiệu Ứng Tiêu Điểm Bàn Phím"
      },
      instruction: {
        en: "Add a :focus-visible rule for .action-link with outline: 2px solid #38bdf8 and outline-offset: 4px.",
        vi: "Thêm quy tắc :focus-visible cho .action-link với outline: 2px solid #38bdf8 và outline-offset: 4px."
      },
      starterCode: `.action-link {\n  color: #38bdf8;\n}\n\n/* Add :focus-visible */\n.action-link {\n}`,
      solutionCode: `.action-link {\n  color: #38bdf8;\n}\n\n.action-link:focus-visible {\n  outline: 2px solid #38bdf8;\n  outline-offset: 4px;\n}`,
      hint: {
        en: "Use .action-link:focus-visible { outline: 2px solid #38bdf8; outline-offset: 4px; }",
        vi: "Dùng .action-link:focus-visible { outline: 2px solid #38bdf8; outline-offset: 4px; }"
      },
      explanation: {
        en: ":focus-visible ensures accessible navigation for keyboard users.",
        vi: ":focus-visible đảm bảo trải nghiệm tiếp cận chuẩn mực cho người dùng bàn phím."
      }
    },
    {
      id: "css_ex_3_2",
      type: "fix_code",
      title: {
        en: "Fix ::before Missing Content Property",
        vi: "Sửa Lỗi Thiếu Content Trong ::before"
      },
      instruction: {
        en: "Add content: '' and background-color: #3b82f6 to the .pill::before pseudo-element.",
        vi: "Thêm content: '' và background-color: #3b82f6 vào pseudo-element .pill::before."
      },
      starterCode: `.pill::before {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n}`,
      solutionCode: `.pill::before {\n  content: "";\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background-color: #3b82f6;\n}`,
      hint: {
        en: "Add content: \"\"; and background-color: #3b82f6;",
        vi: "Thêm content: \"\"; và background-color: #3b82f6;"
      },
      explanation: {
        en: "Without content property, ::before generates no box in the rendering tree.",
        vi: "Nếu thiếu thuộc tính content, ::before sẽ không tạo ra khối hiển thị trên màn hình."
      }
    }
  ],
  challenge: {
    id: "css_ch_3",
    title: {
      en: "Build an Interactive Card Badge with Pseudo Elements",
      vi: "Xây Dựng Thẻ Tương Tác Với Huy Hiệu Bằng Pseudo Elements"
    },
    description: {
      en: "Style .card:hover with border-color: #38bdf8, and style .card::after with content: 'NEW', display: inline-block, background: #0284c7, color: #fff, and padding: 2px 8px.",
      vi: "Thiết lập .card:hover với border-color: #38bdf8, và .card::after với content: 'NEW', display: inline-block, background: #0284c7, color: #fff, padding: 2px 8px."
    },
    requirements: [
      { en: ".card:hover { border-color: #38bdf8 }", vi: ".card:hover { border-color: #38bdf8 }" },
      { en: "content: 'NEW'", vi: "content: 'NEW'" },
      { en: "background: #0284c7", vi: "background: #0284c7" },
      { en: "color: #fff", vi: "color: #fff" }
    ],
    starterCode: `.card {\n  border: 1px solid #334155;\n  padding: 16px;\n}\n\n/* Add hover and ::after styles */`,
    solutionCode: `.card {\n  border: 1px solid #334155;\n  padding: 16px;\n}\n\n.card:hover {\n  border-color: #38bdf8;\n}\n\n.card::after {\n  content: "NEW";\n  display: inline-block;\n  background: #0284c7;\n  color: #fff;\n  padding: 2px 8px;\n}`,
    hints: [
      {
        en: "Define .card:hover and .card::after blocks separately.",
        vi: "Định nghĩa riêng biệt khối .card:hover và .card::after."
      }
    ],
    solutionExplanation: {
      en: "Combining hover pseudo-classes and ::after badges enriches cards without cluttering HTML markup.",
      vi: "Kết hợp pseudo-class hover và huy hiệu ::after làm phong phú giao diện mà không làm bẩn mã HTML."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_3_1",
      type: "single_choice",
      question: {
        en: "What is the key syntactical difference between pseudo-classes and pseudo-elements in CSS3?",
        vi: "Sự khác biệt chính về cú pháp giữa pseudo-classes và pseudo-elements trong chuẩn CSS3 là gì?"
      },
      options: [
        { en: "Pseudo-classes use a single colon (:), while pseudo-elements use a double colon (::)", vi: "Pseudo-classes dùng một dấu hai chấm (:), còn pseudo-elements dùng hai dấu hai chấm (::)" },
        { en: "Pseudo-classes only apply to links", vi: "Pseudo-classes chỉ dùng cho thẻ liên kết" },
        { en: "Pseudo-elements require JavaScript to activate", vi: "Pseudo-elements cần JavaScript để kích hoạt" },
        { en: "There is no difference; they are completely interchangeable", vi: "Không có khác biệt nào, chúng hoàn toàn thay thế được cho nhau" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "CSS3 introduced the double-colon notation (::) to explicitly distinguish pseudo-elements from pseudo-classes (:).",
        vi: "CSS3 quy định dấu :: cho pseudo-elements để phân biệt rõ ràng với pseudo-classes (:)."
      },
      topicId: "css_pseudo",
      difficulty: "easy"
    },
    {
      id: "css_q_3_2",
      type: "single_choice",
      question: {
        en: "Which property is mandatory for `::before` and `::after` to render on the page?",
        vi: "Thuộc tính nào là bắt buộc phải có để `::before` và `::after` hiển thị được trên trang?"
      },
      options: [
        { en: "content", vi: "content" },
        { en: "display", vi: "display" },
        { en: "width", vi: "width" },
        { en: "position", vi: "position" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Without the `content` property (even an empty string `content: ''`), the browser generates no box for ::before or ::after.",
        vi: "Nếu không có thuộc tính `content` (kể cả chuỗi rỗng `content: ''`), trình duyệt sẽ không render ra phần tử."
      },
      topicId: "css_pseudo",
      difficulty: "easy"
    },
    {
      id: "css_q_3_3",
      type: "single_choice",
      question: {
        en: "Which formula matches all odd-numbered child elements (1, 3, 5, 7...)?",
        vi: "Công thức nào sau đây nhắm chọn tất cả các phần tử con ở vị trí lẻ (1, 3, 5, 7...)?"
      },
      options: [
        { en: ":nth-child(2n + 1) or :nth-child(odd)", vi: ":nth-child(2n + 1) hoặc :nth-child(odd)" },
        { en: ":nth-child(2n)", vi: ":nth-child(2n)" },
        { en: ":nth-child(even)", vi: ":nth-child(even)" },
        { en: ":nth-child(n + 2)", vi: ":nth-child(n + 2)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: ":nth-child(odd) or :nth-child(2n+1) calculates odd indices starting at n=0 (1, 3, 5...).",
        vi: ":nth-child(odd) hoặc :nth-child(2n+1) tính ra các chỉ số lẻ bắt đầu từ n=0 (1, 3, 5...)."
      },
      topicId: "css_pseudo",
      difficulty: "medium"
    },
    {
      id: "css_q_3_4",
      type: "single_choice",
      question: {
        en: "Why is `:focus-visible` preferred over `:focus` for interactive button styling?",
        vi: "Tại sao `:focus-visible` được khuyên dùng hơn `:focus` khi tạo kiểu cho nút bấm tương tác?"
      },
      options: [
        { en: "It displays outline rings only during keyboard navigation, suppressing them on mouse clicks", vi: "Nó chỉ hiển thị viền focus khi dùng phím Tab, ẩn đi khi người dùng click chuột" },
        { en: "It increases button font size", vi: "Nó tự động tăng kích thước chữ" },
        { en: "It works without CSS enabled", vi: "Nó hoạt động mà không cần bật CSS" },
        { en: "It loads faster than :focus", vi: "Nó tải nhanh hơn :focus" }
      ],
      correctAnswers: [0],
      explanation: {
        en: ":focus-visible provides accessibility for keyboard users without displaying unwanted outline rings upon mouse clicks.",
        vi: ":focus-visible đảm bảo tính tiếp cận cho người dùng bàn phím mà không gây khó chịu khi nhấp chuột."
      },
      topicId: "css_pseudo",
      difficulty: "medium"
    },
    {
      id: "css_q_3_5",
      type: "true_false",
      question: {
        en: "True or False: The `:nth-of-type(n)` selector only counts sibling elements that share the exact same HTML tag type.",
        vi: "Đúng hay Sai: Bộ chọn `:nth-of-type(n)` chỉ đếm các phần tử anh em có cùng đúng loại thẻ HTML."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: ":nth-of-type filters by element tag name before counting, unlike :nth-child which counts all child elements regardless of tag.",
        vi: ":nth-of-type lọc theo đúng tên thẻ trước khi đếm, khác với :nth-child đếm tất cả phần tử con bất kể thẻ gì."
      },
      topicId: "css_pseudo",
      difficulty: "medium"
    },
    {
      id: "css_q_3_6",
      type: "single_choice",
      question: {
        en: "Which pseudo-element is used to style the selected/highlighted text on a webpage?",
        vi: "Pseudo-element nào dùng để tạo kiểu cho đoạn văn bản được người dùng bôi đen lựa chọn?"
      },
      options: [
        { en: "::selection", vi: "::selection" },
        { en: "::highlight", vi: "::highlight" },
        { en: "::active-text", vi: "::active-text" },
        { en: "::focus-text", vi: "::focus-text" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The `::selection` pseudo-element customizes the background and text color of user-highlighted text.",
        vi: "Pseudo-element `::selection` tùy biến màu nền và màu chữ khi người dùng kéo chuột bôi đen văn bản."
      },
      topicId: "css_pseudo",
      difficulty: "easy"
    },
    {
      id: "css_q_3_7",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To style the placeholder text inside an `<input>` element, use the pseudo-element ::________",
        vi: "Điền vào chỗ trống: Để tạo kiểu cho văn bản gợi ý trong ô `<input>`, dùng pseudo-element ::________"
      },
      fillBlankAnswers: ["placeholder"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "::placeholder targets the placeholder text of input and textarea elements.",
        vi: "::placeholder tác động lên phần chữ hướng dẫn mờ trong input và textarea."
      },
      topicId: "css_pseudo",
      difficulty: "easy"
    },
    {
      id: "css_q_3_8",
      type: "multiple_choice",
      question: {
        en: "Which of the following are valid CSS pseudo-elements? (Select all that apply)",
        vi: "Những mục nào sau đây là pseudo-elements hợp lệ trong CSS? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "::before", vi: "::before" },
        { en: "::after", vi: "::after" },
        { en: "::first-letter", vi: "::first-letter" },
        { en: ":hover", vi: ":hover" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "::before, ::after, and ::first-letter are pseudo-elements. :hover is a pseudo-class representing a dynamic user state.",
        vi: "::before, ::after và ::first-letter là pseudo-elements. Còn :hover là pseudo-class chỉ trạng thái tương tác."
      },
      topicId: "css_pseudo",
      difficulty: "medium"
    },
    {
      id: "css_q_3_9",
      type: "predict_output",
      question: {
        en: "In a container with `<h1>Title</h1><p>Para 1</p><p>Para 2</p>`, which element is matched by `p:first-child`?",
        vi: "Trong container có `<h1>Title</h1><p>Para 1</p><p>Para 2</p>`, phần tử nào khớp với `p:first-child`?"
      },
      options: [
        { en: "None (because the first child is an <h1>, not a <p>)", vi: "Không có phần tử nào (vì con đầu tiên là <h1>, không phải <p>)" },
        { en: "<p>Para 1</p>", vi: "<p>Para 1</p>" },
        { en: "<p>Para 2</p>", vi: "<p>Para 2</p>" },
        { en: "<h1>Title</h1>", vi: "<h1>Title</h1>" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "p:first-child checks if the element is both the very first child of its parent and a <p>. Since <h1> is child #1, no <p> matches.",
        vi: "p:first-child kiểm tra xem phần tử có vừa là con đầu tiên vừa là thẻ p không. Vì con đầu tiên là h1 nên không có thẻ p nào khớp."
      },
      topicId: "css_pseudo",
      difficulty: "hard"
    },
    {
      id: "css_q_3_10",
      type: "true_false",
      question: {
        en: "True or False: A single element can have both a `::before` and an `::after` pseudo-element attached simultaneously.",
        vi: "Đúng hay Sai: Một phần tử HTML có thể cùng lúc sở hữu cả hai pseudo-elements `::before` và `::after`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "An element can render both ::before (prepended) and ::after (appended) child boxes.",
        vi: "Một phần tử có thể chứa đồng thời cả ::before (chèn vào đầu) và ::after (chèn vào cuối)."
      },
      topicId: "css_pseudo",
      difficulty: "easy"
    }
  ]
};

// Lesson 4: CSS Units of Measurement
const lesson04 = {
  id: "css_lesson_4",
  moduleId: "css_mod_basic_1",
  levelId: "basic",
  courseId: "css",
  order: 4,
  topicId: "css_units",
  title: {
    en: "CSS Units of Measurement",
    vi: "Các Đơn Vị Đo Lường Trong CSS"
  },
  summary: {
    en: "Master absolute units (px) vs relative font units (rem, em, ch) and dynamic viewport units (vw, vh, dvh, svh).",
    vi: "Làm chủ đơn vị tuyệt đối (px) so với đơn vị tương đối theo font (rem, em, ch) và đơn vị viewport hiện đại (vw, vh, dvh, svh)."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Choosing the correct CSS unit determines whether an interface scales gracefully across device screens, zoom levels, and user accessibility font settings. Units are divided into Absolute (px, pt) and Relative (rem, em, %, vw, vh, dvh, ch).",
      vi: "Lựa chọn đơn vị CSS chuẩn xác quyết định giao diện có co giãn mượt mà trên các màn hình, tỷ lệ zoom và cài đặt font chữ trợ năng của người dùng hay không. Đơn vị chia thành Tuyệt đối (px) và Tương đối (rem, em, %, vw, vh, dvh, ch)."
    },
    conceptExplanation: {
      en: "Absolute units like `px` are fixed screen pixels. Relative font units: `rem` is relative to the root (`<html>`) font size (typically 16px = 1rem), guaranteeing consistent scaling when users change browser font settings. `em` is relative to its current/parent font size (useful for component padding scaling proportionally with font size). `ch` equals the width of the '0' character (ideal for reading line lengths: 65-75ch). Viewport units: `1vw` = 1% of viewport width; `1vh` = 1% of viewport height. Modern mobile units: `dvh` (dynamic viewport height adjusting for mobile browser address bars), `svh` (small viewport height), and `lvh` (large viewport height).",
      vi: "Đơn vị tuyệt đối `px` là điểm ảnh cố định. Đơn vị tương đối: `rem` tính theo kích thước font của thẻ gốc `<html>` (mặc định 16px = 1rem), đảm bảo khả năng trợ năng khi người dùng tăng font máy tính. `em` tính theo font của chính phần tử hoặc thẻ cha (thích hợp cho padding co giãn theo chữ). `ch` bằng chiều rộng ký tự '0' (lý tưởng giới hạn độ dài dòng đọc: 65-75ch). Đơn vị viewport: `1vw` = 1% chiều rộng màn hình, `1vh` = 1% chiều cao màn hình. Các đơn vị di động hiện đại: `dvh` (chiều cao tự động thích ứng thanh địa chỉ mobile), `svh` và `lvh`."
    },
    syntax: `/* Accessible typography with rem and ch */\nbody {\n  font-size: 1rem; /* 16px */\n}\n\narticle {\n  max-width: 68ch; /* Optimal reading line width */\n}\n\n/* Full-screen hero section adapting to mobile address bars */\n.hero-fullscreen {\n  min-height: 100dvh;\n}`,
    examples: [
      {
        title: {
          en: "Proportional Component Sizing with rem and em",
          vi: "Kích Thước Component Tỷ Lệ Chuẩn Bằng rem và em"
        },
        description: {
          en: "Button padding in em scales automatically if button font size changes, while border radius in rem stays consistent.",
          vi: "Padding dùng em giúp nút tự động nở rộng tương xứng khi tăng font chữ, trong khi border-radius dùng rem giữ bo góc đồng nhất."
        },
        code: `.btn {\n  font-size: 1rem;\n  padding: 0.75em 1.5em; /* Scales with font-size */\n  border-radius: 0.5rem;\n}\n\n.btn-lg {\n  font-size: 1.25rem; /* Padding automatically expands! */\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Setting body font-size in fixed pixels (px), overriding user browser accessibility zoom settings.",
          vi: "Đặt font-size của body bằng pixel (px) cố định, làm mất cài đặt kích thước font trợ năng của người dùng."
        },
        correction: {
          en: "Use rem for typography and layout spacing so font scales with user preferences.",
          vi: "Dùng rem cho chữ và khoảng cách bố cục để giao diện phóng to thu nhỏ chuẩn theo cài đặt người dùng."
        }
      }
    ],
    tips: [
      {
        en: "Use max-width: 65ch to 75ch on text paragraphs for optimal reading comfort and legibility.",
        vi: "Dùng max-width từ 65ch đến 75ch cho đoạn văn để có độ dài dòng đọc thoải mái và dễ tiếp thu nhất."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_4_1",
      type: "complete_code",
      title: {
        en: "Set Accessible Typography Units",
        vi: "Thiết Lập Đơn Vị Chữ Tiếp Cận Chuẩn"
      },
      instruction: {
        en: "Set font-size to 1.5rem and max-width to 70ch on the .article-content selector.",
        vi: "Đặt font-size thành 1.5rem và max-width thành 70ch cho bộ chọn .article-content."
      },
      starterCode: `.article-content {\n  /* Add font-size and max-width */\n}`,
      solutionCode: `.article-content {\n  font-size: 1.5rem;\n  max-width: 70ch;\n}`,
      hint: {
        en: "Use font-size: 1.5rem; max-width: 70ch;",
        vi: "Dùng font-size: 1.5rem; max-width: 70ch;"
      },
      explanation: {
        en: "1.5rem scales relative to root font (24px default) and 70ch limits line width.",
        vi: "1.5rem tương đương 24px theo font gốc và 70ch giới hạn độ rộng dòng đọc hoàn hảo."
      }
    },
    {
      id: "css_ex_4_2",
      type: "fix_code",
      title: {
        en: "Upgrade Mobile Viewport Height to dvh",
        vi: "Nâng Cấp Chiều Cao Màn Hình Di Động Lên dvh"
      },
      instruction: {
        en: "Replace 100vh with 100dvh to prevent mobile address bar clipping on .hero-section.",
        vi: "Thay thế 100vh bằng 100dvh để tránh bị thanh địa chỉ trình duyệt mobile che khuất trên .hero-section."
      },
      starterCode: `.hero-section {\n  min-height: 100vh;\n}`,
      solutionCode: `.hero-section {\n  min-height: 100dvh;\n}`,
      hint: {
        en: "Change 100vh to 100dvh",
        vi: "Đổi 100vh thành 100dvh"
      },
      explanation: {
        en: "dvh (dynamic viewport height) dynamically adapts as browser chrome expands/retracts.",
        vi: "dvh (dynamic viewport height) tự động co giãn theo sự xuất hiện/ẩn đi của thanh địa chỉ trình duyệt."
      }
    }
  ],
  challenge: {
    id: "css_ch_4",
    title: {
      en: "Build a Fluid Hero Container with Modern Units",
      vi: "Xây Dựng Khối Hero Co Giãn Với Đơn Vị Hiện Đại"
    },
    description: {
      en: "Create a .hero-container class with min-height: 100dvh, padding: 2rem 1.5rem, max-width: 80ch, and margin: 0 auto.",
      vi: "Tạo class .hero-container với min-height: 100dvh, padding: 2rem 1.5rem, max-width: 80ch và margin: 0 auto."
    },
    requirements: [
      { en: "min-height: 100dvh", vi: "min-height: 100dvh" },
      { en: "padding: 2rem 1.5rem", vi: "padding: 2rem 1.5rem" },
      { en: "max-width: 80ch", vi: "max-width: 80ch" },
      { en: "margin: 0 auto", vi: "margin: 0 auto" }
    ],
    starterCode: `.hero-container {\n  /* Write CSS unit declarations */\n}`,
    solutionCode: `.hero-container {\n  min-height: 100dvh;\n  padding: 2rem 1.5rem;\n  max-width: 80ch;\n  margin: 0 auto;\n}`,
    hints: [
      {
        en: "Set min-height, padding, max-width, and margin using rem, ch, and dvh units.",
        vi: "Thiết lập min-height, padding, max-width và margin sử dụng các đơn vị rem, ch và dvh."
      }
    ],
    solutionExplanation: {
      en: "Using dvh, rem, and ch provides a fully responsive layout that honors mobile viewports and typography ergonomics.",
      vi: "Sử dụng dvh, rem và ch mang đến bố cục phản hồi mượt mà, tối ưu cho trình duyệt mobile và công thái học đọc chữ."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_4_1",
      type: "single_choice",
      question: {
        en: "What is `1rem` equal to if the browser's default root font size is 16px?",
        vi: "`1rem` bằng bao nhiêu nếu cỡ chữ gốc (root) mặc định của trình duyệt là 16px?"
      },
      options: [
        { en: "16px", vi: "16px" },
        { en: "32px", vi: "32px" },
        { en: "10px", vi: "10px" },
        { en: "8px", vi: "8px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "1rem is equal to 100% of the root element (<html>) font size, which defaults to 16px.",
        vi: "1rem tương đương 100% cỡ chữ của thẻ gốc (<html>), mặc định là 16px."
      },
      topicId: "css_units",
      difficulty: "easy"
    },
    {
      id: "css_q_4_2",
      type: "single_choice",
      question: {
        en: "What is the primary difference between `rem` and `em` units?",
        vi: "Sự khác biệt cốt lõi giữa đơn vị `rem` và `em` là gì?"
      },
      options: [
        { en: "rem is relative to the root (<html>) font size, whereas em is relative to the immediate or parent element's font size", vi: "rem tính theo font thẻ gốc (<html>), còn em tính theo font của chính phần tử hoặc thẻ cha" },
        { en: "rem only works on mobile devices", vi: "rem chỉ hoạt động trên thiết bị di động" },
        { en: "em is an absolute unit like pixels", vi: "em là đơn vị tuyệt đối như pixel" },
        { en: "rem cannot be used for margins or padding", vi: "rem không dùng được cho margin hay padding" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "rem = Root EM (always refers to <html>), while em refers to the current/inherited font-size (which can compound).",
        vi: "rem = Root EM (luôn tham chiếu đến <html>), còn em tham chiếu theo font-size hiện tại hoặc kế thừa."
      },
      topicId: "css_units",
      difficulty: "easy"
    },
    {
      id: "css_q_4_3",
      type: "single_choice",
      question: {
        en: "What character width does the `ch` unit represent?",
        vi: "Đơn vị `ch` đại diện cho chiều rộng của ký tự nào trong font chữ hiện tại?"
      },
      options: [
        { en: "The width of the glyph '0' (zero)", vi: "Chiều rộng của ký tự số '0' (zero)" },
        { en: "The width of the letter 'C'", vi: "Chiều rộng của chữ cái 'C'" },
        { en: "The width of the letter 'M'", vi: "Chiều rộng của chữ cái 'M'" },
        { en: "The width of a blank space", vi: "Chiều rộng của dấu cách trắng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "1ch equals the advance measure (width) of the zero ('0') character in the element's font.",
        vi: "1ch bằng chiều rộng của chữ số '0' trong font chữ đang áp dụng cho phần tử."
      },
      topicId: "css_units",
      difficulty: "medium"
    },
    {
      id: "css_q_4_4",
      type: "single_choice",
      question: {
        en: "Why was `100dvh` introduced alongside traditional `100vh`?",
        vi: "Tại sao đơn vị `100dvh` được ra đời bên cạnh đơn vị truyền thống `100vh`?"
      },
      options: [
        { en: "To prevent content from being obscured when mobile browser navigation and address bars expand/collapse", vi: "Để ngăn nội dung bị che khuất khi thanh địa chỉ trên trình duyệt di động co giãn" },
        { en: "To increase 3D rendering speed", vi: "Để tăng tốc độ render 3D" },
        { en: "To disable scrolling on desktop monitors", vi: "Để tắt thanh cuộn trên màn hình máy tính" },
        { en: "To replace percentages in CSS Grid", vi: "Để thay thế phần trăm trong CSS Grid" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "dvh (dynamic viewport height) dynamically recalculates as mobile browser toolbars appear and disappear during scrolling.",
        vi: "dvh tự động tính toán lại chiều cao khi thanh công cụ trên di động trượt ra hoặc thu gọn lại."
      },
      topicId: "css_units",
      difficulty: "medium"
    },
    {
      id: "css_q_4_5",
      type: "true_false",
      question: {
        en: "True or False: Using `em` for font-size inside nested lists can cause compounding multiplication (e.g. 1.2em of 1.2em of 1.2em).",
        vi: "Đúng hay Sai: Dùng đơn vị `em` cho font-size trong các danh sách lồng nhau có thể gây hiệu ứng nhân dồn kích thước (ví dụ 1.2em của 1.2em của 1.2em)."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Because em is relative to parent font-size, nested elements compound their font sizes exponentially.",
        vi: "Vì em tính theo thẻ cha, nên các phần tử lồng nhau sẽ nhân dồn kích thước qua từng cấp."
      },
      topicId: "css_units",
      difficulty: "easy"
    },
    {
      id: "css_q_4_6",
      type: "single_choice",
      question: {
        en: "If a container is 800px wide, what is the computed width of a child element with `width: 50%`?",
        vi: "Nếu thẻ cha rộng 800px, chiều rộng tính toán của thẻ con có `width: 50%` là bao nhiêu?"
      },
      options: [
        { en: "400px", vi: "400px" },
        { en: "800px", vi: "800px" },
        { en: "50px", vi: "50px" },
        { en: "200px", vi: "200px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Percentage widths are calculated relative to the containing block's content-box width: 50% of 800px = 400px.",
        vi: "Phần trăm chiều rộng tính theo vùng chứa cha: 50% của 800px = 400px."
      },
      topicId: "css_units",
      difficulty: "easy"
    },
    {
      id: "css_q_4_7",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The viewport unit representing 1% of the smaller dimension (width or height) is ________",
        vi: "Điền vào chỗ trống: Đơn vị viewport đại diện cho 1% của cạnh nhỏ hơn (chiều rộng hoặc chiều cao) là ________"
      },
      fillBlankAnswers: ["vmin"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "vmin evaluates to 1% of the smaller dimension between viewport width and height.",
        vi: "vmin nhận giá trị bằng 1% của cạnh nhỏ hơn giữa chiều ngang và chiều dọc màn hình."
      },
      topicId: "css_units",
      difficulty: "medium"
    },
    {
      id: "css_q_4_8",
      type: "multiple_choice",
      question: {
        en: "Which units are relative to the viewport? (Select all that apply)",
        vi: "Những đơn vị nào sau đây có giá trị tương đối theo màn hình (viewport)? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "vw", vi: "vw" },
        { en: "vh", vi: "vh" },
        { en: "svh", vi: "svh" },
        { en: "pt", vi: "pt" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "vw, vh, and svh are viewport units. pt (points) is an absolute print unit (1pt = 1/72 inch).",
        vi: "vw, vh và svh là đơn vị viewport. Còn pt (point) là đơn vị in ấn tuyệt đối (1pt = 1/72 inch)."
      },
      topicId: "css_units",
      difficulty: "easy"
    },
    {
      id: "css_q_4_9",
      type: "single_choice",
      question: {
        en: "What is the recommended range of `ch` units for body text line lengths to ensure optimal readability?",
        vi: "Độ dài dòng văn bản đọc tốt nhất được khuyến nghị nằm trong khoảng bao nhiêu đơn vị `ch`?"
      },
      options: [
        { en: "45ch to 75ch", vi: "45ch đến 75ch" },
        { en: "10ch to 20ch", vi: "10ch đến 20ch" },
        { en: "150ch to 200ch", vi: "150ch đến 200ch" },
        { en: "5ch to 15ch", vi: "5ch đến 15ch" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Typography research indicates lines between 45 and 75 characters (ch) provide the most comfortable reading experience.",
        vi: "Nghiên cứu Typography chứng minh độ dài dòng từ 45 đến 75 ký tự (ch) mang lại trải nghiệm đọc thoải mái nhất."
      },
      topicId: "css_units",
      difficulty: "medium"
    },
    {
      id: "css_q_4_10",
      type: "true_false",
      question: {
        en: "True or False: Using `px` for font-size is strictly forbidden by CSS specifications.",
        vi: "Đúng hay Sai: Chuẩn đặc tả CSS nghiêm cấm hoàn toàn việc dùng `px` cho font-size."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Using px is valid CSS syntax, though rem is strongly recommended for accessibility and responsive scaling.",
        vi: "Dùng px vẫn là cú pháp CSS hợp lệ, dù rem được khuyến khích mạnh mẽ hơn vì tính tiếp cận và co giãn."
      },
      topicId: "css_units",
      difficulty: "easy"
    }
  ]
};

// Save lessons
saveLesson('src/data/css/basic/module01/lesson01.ts', 'lesson01', lesson01);
saveLesson('src/data/css/basic/module01/lesson02.ts', 'lesson02', lesson02);
saveLesson('src/data/css/basic/module01/lesson03.ts', 'lesson03', lesson03);
saveLesson('src/data/css/basic/module01/lesson04.ts', 'lesson04', lesson04);

// Module 1 index
const mod1Index = `export { lesson01 } from './lesson01';\nexport { lesson02 } from './lesson02';\nexport { lesson03 } from './lesson03';\nexport { lesson04 } from './lesson04';\n`;
fs.writeFileSync('src/data/css/basic/module01/index.ts', mod1Index, 'utf8');
console.log('Saved: src/data/css/basic/module01/index.ts');
