import fs from 'fs';
import path from 'path';

// Helper to write lesson files with correct types import path
function saveLesson(filePath: string, varName: string, lessonObj: any) {
  // relative path to types.ts:
  // e.g. src/data/css/basic/module01/lesson01.ts -> ../../../../types
  const depth = filePath.split(path.sep).length - 1;
  const relTypes = '../'.repeat(depth - 1) + 'types';
  const content = `import { Lesson } from '${relTypes}';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessonObj, null, 2)};\n`;
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved: ${filePath}`);
}

// -------------------------------------------------------------
// BASIC LEVEL (8 Lessons)
// -------------------------------------------------------------

// LESSON 01: CSS Syntax, Inclusion Methods & The Cascade
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
      en: "A CSS rule consists of a selector and a declaration block containing property-value pairs. There are three inclusion methods: external `<link>`, internal `<style>`, and inline `style='...'`. When multiple rules target the same element, the Cascade resolves conflicts based on: 1. Origin & Importance (!important), 2. Specificity (Inline > ID > Class > Element), and 3. Source Order (last declared wins). CSS properties also support inheritance from ancestor elements, with explicit controls via `inherit`, `initial`, and `unset`.",
      vi: "Một quy tắc CSS gồm bộ chọn (selector) và khối khai báo chứa các cặp thuộc tính-giá trị. Có 3 cách nhúng: liên kết ngoài `<link>`, trong tài liệu `<style>`, và nội dòng inline `style='...'`. Khi nhiều quy tắc cùng tác động, Cascade giải quyết xung đột dựa trên: 1. Nguồn gốc & Độ quan trọng (!important), 2. Độ ưu tiên Specificity (Inline > ID > Class > Thẻ), và 3. Thứ tự xuất hiện (khai báo sau cùng sẽ thắng). Các thuộc tính cũng có tính kế thừa từ thẻ cha, điều khiển bằng `inherit`, `initial` và `unset`."
    },
    syntax: `/* External Stylesheet Link */
<link rel="stylesheet" href="styles.css">

/* Standard CSS Rule */
selector {
  property: value;
  color: inherit;
}`,
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
        code: `/* Base class rule */
.card-banner {
  background-color: #1e293b;
  color: #f8fafc;
  padding: 16px;
  border-radius: 8px;
}

/* Later class rule overrides previous property due to source order */
.card-banner {
  background-color: #0284c7; /* This color wins */
}`
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
      starterCode: `.hero-text {
  /* Add color and background-color */
}`,
      solutionCode: `.hero-text {
  color: #f8fafc;
  background-color: #0f172a;
}`,
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
      starterCode: `button.custom-btn {
  border: 2px solid red;
  color: red;
}`,
      solutionCode: `button.custom-btn {
  border: none;
  color: inherit;
}`,
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
    starterCode: `.alert-box {
  /* Write CSS declarations */
}`,
    solutionCode: `.alert-box {
  background: #0f172a;
  color: #e2e8f0;
  padding: 16px;
  border-left: 4px solid #38bdf8;
}`,
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

console.log('Lesson 01 defined.');
