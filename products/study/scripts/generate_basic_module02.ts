import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const basicMod02Dir = path.join(process.cwd(), 'src/data/excel/basic/module02');
fs.mkdirSync(basicMod02Dir, { recursive: true });

function saveLesson(dir: string, filename: string, varName: string, lesson: Lesson) {
  const code = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lesson, null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(path.join(dir, filename), code, 'utf8');
  console.log(`Saved ${filename} (${lesson.id})`);
}

// =========================================================================
// LESSON 05: Text Transformation (TRIM, CLEAN, PROPER, UPPER, LOWER)
// Preserved ID: excel_lesson_7
// =========================================================================
export const lesson05: Lesson = {
  id: 'excel_lesson_7',
  order: 5,
  courseId: 'excel',
  levelId: 'basic',
  topicId: 'excel_text',
  title: {
    en: 'Text Transformation & Data Sanitization: TRIM, CLEAN, PROPER, UPPER & LOWER',
    vi: 'Chuyển Đổi Văn Bản & Làm Sạch Dữ Liệu: TRIM, CLEAN, PROPER, UPPER & LOWER'
  },
  summary: {
    en: 'Master automated data cleaning pipelines in Excel: strip invisible non-printable characters with CLEAN, eradicate irregular whitespace with TRIM, and enforce uniform typography casing with PROPER, UPPER, and LOWER.',
    vi: 'Làm chủ quy trình làm sạch dữ liệu tự động trong Excel: loại bỏ ký tự không in được bằng CLEAN, xóa khoảng trắng thừa bằng TRIM và chuẩn hóa kiểu chữ bằng PROPER, UPPER và LOWER.'
  },
  learn: {
    introduction: {
      en: 'Real-world data imported from web scraping, CRM databases, or legacy ERP systems is notoriously messy: names have erratic capitalization ("jOHN smITH"), addresses contain invisible non-breaking spaces, and lookups fail due to accidental leading/trailing spaces. Text transformation functions sanitize raw imports into pristine analysis-ready datasets.',
      vi: 'Dữ liệu thực tế được nhập từ web, cơ sở dữ liệu CRM hoặc hệ thống ERP thường rất lộn xộn: tên bị viết hoa lộn xộn ("jOHN smITH"), địa chỉ chứa khoảng trắng không ngắt vô hình và các hàm tra cứu bị lỗi do khoảng trắng thừa ở đầu/cuối. Các hàm chuyển đổi văn bản giúp chuẩn hóa dữ liệu thô thành tập dữ liệu sạch sẵn sàng để phân tích.'
    },
    conceptExplanation: {
      en: `### 1. The Core Text Sanitization Functions
- **\`=TRIM(text)\`**: Removes all leading and trailing spaces from a text string, and replaces multiple internal spaces with a single space. Note: Does NOT remove non-breaking space character \`CHAR(160)\`.
- **\`=CLEAN(text)\`**: Removes the first 32 non-printable ASCII characters (values 0 through 31, including line breaks \`CHAR(10)\` and tabs \`CHAR(9)\`) imported from external systems.
- **\`=PROPER(text)\`**: Capitalizes the first letter of each word and converts all other letters to lowercase (Title Case), perfect for customer names.
- **\`=UPPER(text)\`**: Converts all characters in a text string to uppercase (useful for standardizing state codes or SKU codes).
- **\`=LOWER(text)\`**: Converts all characters in a text string to lowercase (ideal for standardizing email addresses).

### 2. Enterprise Sanitization Pipeline
Combine text functions by nesting them in a single formula:
\`=PROPER(TRIM(CLEAN(A2)))\`
This single formula strips non-printable characters, cleans all erratic whitespace, and formats the name in proper Title Case!`,
      vi: `### 1. Các Hàm Làm Sạch Văn Bản Cốt Lõi
- **\`=TRIM(van_ban)\`**: Xóa tất cả các khoảng trắng ở đầu và cuối chuỗi, đồng thời thay thế nhiều khoảng trắng liên tiếp ở giữa thành một khoảng trắng duy nhất. Lưu ý: Không xóa ký tự khoảng trắng không ngắt \`CHAR(160)\`.
- **\`=CLEAN(van_ban)\`**: Xóa 32 ký tự ASCII không in được đầu tiên (từ 0 đến 31, bao gồm dấu xuống dòng \`CHAR(10)\` và dấu tab \`CHAR(9)\`) khi import từ hệ thống bên ngoài.
- **\`=PROPER(van_ban)\`**: Viết hoa chữ cái đầu tiên của mỗi từ và chuyển các chữ cái khác thành chữ thường (Title Case), hoàn hảo để chuẩn hóa họ tên khách hàng.
- **\`=UPPER(van_ban)\`**: Chuyển toàn bộ các ký tự trong chuỗi thành chữ in hoa (hữu ích cho mã vùng, mã SKU).
- **\`=LOWER(van_ban)\`**: Chuyển toàn bộ các ký tự trong chuỗi thành chữ in thường (lý tưởng để chuẩn hóa địa chỉ email).

### 2. Quy Trình Làm Sạch Dữ Liệu Doanh Nghiệp
Kết hợp các hàm văn bản bằng cách lồng ghép trong một công thức duy nhất:
\`=PROPER(TRIM(CLEAN(A2)))\`
Công thức duy nhất này loại bỏ các ký tự vô hình không in được, dọn sạch mọi khoảng trắng thừa và chuẩn hóa họ tên về dạng viết hoa đầu từ!`
    },
    syntax: `# Syntax:
=TRIM(text)
=CLEAN(text)
=PROPER(text)
=UPPER(text)
=LOWER(text)

# Combined Enterprise Pipeline:
=PROPER(TRIM(CLEAN(A2)))`,
    examples: [
      {
        title: { en: 'Cleaning Customer Names Imported from CRM', vi: 'Làm Sạch Họ Tên Khách Hàng Từ CRM' },
        code: `Raw Input in A2: "   mARy   jAnE   "

=TRIM(A2)           -> "mARy jAnE"
=PROPER(A2)         -> "   Mary   Jane   "
=PROPER(TRIM(A2))   -> "Mary Jane" (Pristine Result)`,
        description: {
          en: 'Nesting PROPER inside TRIM removes both extra spaces and bad capitalization in a single step.',
          vi: 'Lồng PROPER bên trong TRIM loại bỏ cả khoảng trắng thừa lẫn lỗi viết hoa chỉ trong một bước.'
        }
      },
      {
        title: { en: 'Standardizing SKU and Email Columns', vi: 'Chuẩn Hóa Cột Mã SKU và Email' },
        code: `SKU in A2: "us-west-402a"    -> Formula in B2: =UPPER(TRIM(A2)) -> "US-WEST-402A"
Email in A3: "John.Doe@ACME.COM" -> Formula in B3: =LOWER(TRIM(A3)) -> "john.doe@acme.com"`,
        description: {
          en: 'Standardizes database identifiers to ensure exact-match lookups and database merges succeed.',
          vi: 'Chuẩn hóa định danh cơ sở dữ liệu để đảm bảo các phép tra cứu chính xác và gộp bảng thành công.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Expecting TRIM to remove non-breaking spaces (ASCII 160) commonly copied from HTML web pages.',
          vi: 'Nghĩ rằng TRIM sẽ xóa được khoảng trắng không ngắt (ASCII 160) thường gặp khi copy từ trang web HTML.'
        },
        correction: {
          en: 'Replace non-breaking spaces first using =TRIM(SUBSTITUTE(A2, CHAR(160), " ")).',
          vi: 'Thay thế khoảng trắng không ngắt trước bằng =TRIM(SUBSTITUTE(A2, CHAR(160), " ")).'
        }
      },
      {
        mistake: {
          en: 'Applying PROPER to acronyms or state codes (e.g. converting "USA" or "IBM" to "Usa" or "Ibm").',
          vi: 'Áp dụng PROPER cho từ viết tắt hoặc mã bang (ví dụ biến "USA" hoặc "IBM" thành "Usa" hoặc "Ibm").'
        },
        correction: {
          en: 'Use UPPER for acronyms, ISO codes, and airport/state abbreviations.',
          vi: 'Sử dụng UPPER cho các từ viết tắt, mã ISO và mã sân bay/tiểu bang.'
        }
      }
    ],
    tips: [
      { en: 'Paste Values Shortcut: After cleaning a column with formulas, press Ctrl + C, then Alt + E + S + V (or Ctrl + Shift + V in modern Excel) to replace formulas with permanent cleaned static values.', vi: 'Phím tắt Paste Values: Sau khi làm sạch dữ liệu bằng công thức, nhấn Ctrl + C rồi Alt + E + S + V (hoặc Ctrl + Shift + V) để dán đè giá trị tĩnh vĩnh viễn.' },
      { en: 'Flash Fill Alternative: Press Ctrl + E in an adjacent column to let Excel automatically detect and replicate text cleaning patterns.', vi: 'Tính năng Flash Fill: Nhấn Ctrl + E ở cột bên cạnh để Excel tự động nhận diện và sao chép mẫu làm sạch dữ liệu.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l5_ex1',
      type: 'complete_code',
      title: { en: 'Sanitize Employee Full Name', vi: 'Chuẩn Hóa Họ Tên Nhân Viên' },
      instruction: {
        en: 'Write a nested formula to clean extra spaces and convert the name in cell A2 to Title Case (Proper Case).',
        vi: 'Viết công thức lồng nhau để xóa khoảng trắng thừa và chuyển đổi họ tên ở ô A2 thành kiểu chữ in hoa đầu từ (Proper Case).'
      },
      starterCode: '=PROPER(',
      solutionCode: '=PROPER(TRIM(A2))',
      expectedOutput: '=PROPER(TRIM(A2))',
      hint: { en: 'Nest TRIM(A2) inside PROPER().', vi: 'Lồng hàm TRIM(A2) vào bên trong PROPER().' },
      explanation: { en: '=PROPER(TRIM(A2)) removes surplus spaces and capitalizes the first letter of each name.', vi: '=PROPER(TRIM(A2)) loại bỏ khoảng trắng thừa và viết hoa chữ cái đầu tiên của mỗi từ.' }
    },
    {
      id: 'excel_l5_ex2',
      type: 'complete_code',
      title: { en: 'Standardize Customer Email to Lowercase', vi: 'Chuẩn Hóa Email Khách Hàng Thành Chữ Thường' },
      instruction: {
        en: 'Write the formula to convert the email in cell C2 into clean, trimmed lowercase text.',
        vi: 'Viết công thức chuyển đổi email ở ô C2 thành văn bản chữ in thường đã xóa khoảng trắng thừa.'
      },
      starterCode: '=',
      solutionCode: '=LOWER(TRIM(C2))',
      expectedOutput: '=LOWER(TRIM(C2))',
      hint: { en: 'Use LOWER and TRIM together on cell C2.', vi: 'Dùng hàm LOWER kết hợp TRIM cho ô C2.' },
      explanation: { en: 'Combining LOWER and TRIM guarantees standard lowercase email addresses without rogue spaces.', vi: 'Kết hợp LOWER và TRIM đảm bảo địa chỉ email chuẩn chữ thường không bị dính khoảng trắng lạ.' }
    }
  ],
  challenge: {
    id: 'excel_l5_challenge',
    title: { en: 'Build Triple-Layer Text Cleaning Pipeline', vi: 'Xây Dựng Quy Trình Làm Sạch Văn Bản 3 Lớp' },
    description: {
      en: 'Construct the enterprise formula for cell B2 that applies CLEAN to strip non-printable characters, TRIM to eliminate irregular spacing, and UPPER to standardize product SKU codes from cell A2.',
      vi: 'Xây dựng công thức doanh nghiệp cho ô B2 áp dụng CLEAN để xóa ký tự không in được, TRIM để loại bỏ khoảng trắng bất thường và UPPER để chuẩn hóa mã SKU sản phẩm từ ô A2.'
    },
    requirements: [
      { en: 'Apply CLEAN to cell A2', vi: 'Áp dụng CLEAN cho ô A2' },
      { en: 'Wrap with TRIM', vi: 'Bọc ngoài bằng TRIM' },
      { en: 'Wrap with UPPER', vi: 'Bọc ngoài cùng bằng UPPER' }
    ],
    starterCode: '=',
    solutionCode: '=UPPER(TRIM(CLEAN(A2)))',
    hints: [
      { en: 'Nest the functions: =UPPER(TRIM(CLEAN(A2)))', vi: 'Lồng các hàm: =UPPER(TRIM(CLEAN(A2)))' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l5_q1',
      type: 'single_choice',
      question: {
        en: 'What does the `TRIM` function in Microsoft Excel do?',
        vi: 'Hàm `TRIM` trong Microsoft Excel làm nhiệm vụ gì?'
      },
      options: [
        { en: 'Removes leading, trailing, and duplicate internal spaces, leaving single spaces between words', vi: 'Xóa khoảng trắng ở đầu, cuối và khoảng trắng trùng lặp ở giữa, chỉ để lại một khoảng trắng giữa các từ' },
        { en: 'Deletes all vowels from a string', vi: 'Xóa tất cả các nguyên âm trong chuỗi' },
        { en: 'Shortens a text string to 10 characters', vi: 'Rút ngắn chuỗi văn bản xuống 10 ký tự' },
        { en: 'Removes all punctuation marks', vi: 'Xóa tất cả các dấu câu' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'TRIM strips extra spaces at both ends and reduces any multiple consecutive spaces in the middle to a single space.',
        vi: 'TRIM loại bỏ khoảng trắng thừa ở cả hai đầu và rút gọn nhiều khoảng trắng liên tiếp ở giữa thành một khoảng trắng duy nhất.'
      },
      difficulty: 'easy',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q2',
      type: 'single_choice',
      question: {
        en: 'What is the output of `=PROPER("nGUYEN vAN aNH")`?',
        vi: 'Kết quả của `=PROPER("nGUYEN vAN aNH")` là gì?'
      },
      options: [
        { en: '"Nguyen Van Anh"', vi: '"Nguyen Van Anh"' },
        { en: '"NGUYEN VAN ANH"', vi: '"NGUYEN VAN ANH"' },
        { en: '"nguyen van anh"', vi: '"nguyen van anh"' },
        { en: '"Nguyen van anh"', vi: '"Nguyen van anh"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PROPER capitalizes the first letter of every word and turns all remaining letters into lowercase.',
        vi: 'PROPER viết hoa chữ cái đầu tiên của mọi từ và chuyển tất cả các chữ cái còn lại thành chữ thường.'
      },
      difficulty: 'easy',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q3',
      type: 'single_choice',
      question: {
        en: 'What type of characters does the `CLEAN` function remove from text?',
        vi: 'Hàm `CLEAN` loại bỏ loại ký tự nào khỏi văn bản?'
      },
      options: [
        { en: 'The first 32 non-printable ASCII control characters (values 0-31)', vi: '32 ký tự điều khiển ASCII không in được đầu tiên (giá trị 0-31)' },
        { en: 'All numbers and punctuation', vi: 'Tất cả các số và dấu câu' },
        { en: 'All spaces', vi: 'Tất cả các khoảng trắng' },
        { en: 'HTML tags only', vi: 'Chỉ các thẻ HTML' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CLEAN removes low-level ASCII control characters (0-31) such as line feeds (CHAR 10) and tabs (CHAR 9).',
        vi: 'CLEAN loại bỏ các ký tự điều khiển ASCII cấp thấp (0-31) như dấu xuống dòng (CHAR 10) và dấu tab (CHAR 9).'
      },
      difficulty: 'medium',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q4',
      type: 'single_choice',
      question: {
        en: 'Why might a VLOOKUP formula return `#N/A` even when two cells appear visually identical to the naked eye?',
        vi: 'Tại sao công thức VLOOKUP lại trả về `#N/A` ngay cả khi hai ô nhìn bằng mắt thường có vẻ hoàn toàn giống hệt nhau?'
      },
      options: [
        { en: 'One cell has hidden leading or trailing whitespace characters', vi: 'Một ô có chứa ký tự khoảng trắng ẩn ở đầu hoặc cuối' },
        { en: 'The font colors are different', vi: 'Màu phông chữ khác nhau' },
        { en: 'One cell is formatted in bold', vi: 'Một ô được định dạng in đậm' },
        { en: 'The sheet is saved in Excel 2016', vi: 'Trang tính được lưu trong Excel 2016' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Invisible spaces (e.g. "Apple " vs "Apple") prevent exact-match lookups from matching. Using TRIM fixes this issue.',
        vi: 'Các khoảng trắng vô hình (ví dụ "Apple " vs "Apple") ngăn không cho phép tra cứu khớp chính xác. Dùng TRIM sẽ khắc phục được lỗi này.'
      },
      difficulty: 'medium',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q5',
      type: 'single_choice',
      question: {
        en: 'What function converts the string "united states" into "UNITED STATES"?',
        vi: 'Hàm nào chuyển đổi chuỗi "united states" thành "UNITED STATES"?'
      },
      options: [
        { en: 'UPPER', vi: 'UPPER' },
        { en: 'CAPITALIZE', vi: 'CAPITALIZE' },
        { en: 'BIG', vi: 'BIG' },
        { en: 'PROPER', vi: 'PROPER' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'UPPER converts all lowercase letters in a text string to uppercase.',
        vi: 'Hàm UPPER chuyển đổi tất cả các chữ cái thường trong chuỗi thành chữ hoa.'
      },
      difficulty: 'easy',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q6',
      type: 'single_choice',
      question: {
        en: 'What is the Excel shortcut for Flash Fill, which automatically applies recognized text transformations?',
        vi: 'Phím tắt trong Excel cho tính năng Flash Fill (tự động áp dụng các mẫu chuyển đổi văn bản nhận diện được) là gì?'
      },
      options: [
        { en: 'Ctrl + E', vi: 'Ctrl + E' },
        { en: 'Ctrl + F', vi: 'Ctrl + F' },
        { en: 'Ctrl + Shift + F', vi: 'Ctrl + Shift + F' },
        { en: 'Alt + F8', vi: 'Alt + F8' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Ctrl + E triggers Flash Fill, instantly filling down data based on pattern examples you type.',
        vi: 'Ctrl + E kích hoạt Flash Fill, tự động điền dữ liệu dựa trên mẫu ví dụ bạn vừa gõ.'
      },
      difficulty: 'medium',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q7',
      type: 'single_choice',
      question: {
        en: 'What does `=LOWER("Sales-Dept-2026")` return?',
        vi: 'Công thức `=LOWER("Sales-Dept-2026")` trả về kết quả gì?'
      },
      options: [
        { en: '"sales-dept-2026"', vi: '"sales-dept-2026"' },
        { en: '"sales dept 2026"', vi: '"sales dept 2026"' },
        { en: '"Sales-dept-2026"', vi: '"Sales-dept-2026"' },
        { en: '#VALUE!', vi: '#VALUE!' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LOWER converts uppercase alphabetic characters to lowercase, while leaving hyphens and numbers unchanged.',
        vi: 'LOWER chuyển các chữ cái hoa thành chữ thường, giữ nguyên dấu gạch nối và các con số.'
      },
      difficulty: 'easy',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q8',
      type: 'true_false',
      question: {
        en: 'True or False: The `TRIM` function in Excel removes ALL spaces between words, joining them into a single continuous word.',
        vi: 'Đúng hay Sai: Hàm `TRIM` trong Excel xóa TẤT CẢ các khoảng trắng giữa các từ, ghép chúng lại thành một từ liền mạch duy nhất.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. TRIM preserves a single standard space between words; it only removes extra/duplicate spaces.',
        vi: 'Sai. Hàm TRIM giữ lại đúng một khoảng trắng chuẩn giữa các từ; nó chỉ loại bỏ khoảng trắng thừa/trùng lặp.'
      },
      difficulty: 'easy',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q9',
      type: 'single_choice',
      question: {
        en: 'What function can be combined with TRIM to eliminate non-breaking space characters (`CHAR(160)`) imported from web pages?',
        vi: 'Hàm nào có thể kết hợp với TRIM để loại bỏ các ký tự khoảng trắng không ngắt (`CHAR(160)`) được import từ trang web?'
      },
      options: [
        { en: 'SUBSTITUTE', vi: 'SUBSTITUTE' },
        { en: 'REPLACE', vi: 'REPLACE' },
        { en: 'FIND', vi: 'FIND' },
        { en: 'EXACT', vi: 'EXACT' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '=TRIM(SUBSTITUTE(A1, CHAR(160), " ")) replaces non-breaking web spaces with regular spaces so TRIM can clean them.',
        vi: '=TRIM(SUBSTITUTE(A1, CHAR(160), " ")) thay thế khoảng trắng web không ngắt thành khoảng trắng thường để TRIM dọn sạch.'
      },
      difficulty: 'hard',
      topicId: 'excel_text'
    },
    {
      id: 'excel_l5_q10',
      type: 'single_choice',
      question: {
        en: 'Which formula converts the company name in A2 to proper title casing while stripping both line breaks and leading spaces?',
        vi: 'Công thức nào chuyển đổi tên công ty ở A2 sang kiểu viết hoa đầu từ đồng thời xóa cả dấu xuống dòng và khoảng trắng ở đầu?'
      },
      options: [
        { en: '=PROPER(TRIM(CLEAN(A2)))', vi: '=PROPER(TRIM(CLEAN(A2)))' },
        { en: '=CLEAN(PROPER(A2))', vi: '=CLEAN(PROPER(A2))' },
        { en: '=UPPER(LOWER(A2))', vi: '=UPPER(LOWER(A2))' },
        { en: '=TRIM(TEXT(A2))', vi: '=TRIM(TEXT(A2))' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '=PROPER(TRIM(CLEAN(A2))) executes CLEAN first (removes line breaks), TRIM second (removes spaces), and PROPER last (capitalizes words).',
        vi: '=PROPER(TRIM(CLEAN(A2))) thực hiện CLEAN trước (xóa xuống dòng), TRIM thứ hai (xóa khoảng trắng) và PROPER cuối cùng (viết hoa chữ cái đầu).'
      },
      difficulty: 'medium',
      topicId: 'excel_text'
    }
  ]
};

saveLesson(basicMod02Dir, 'lesson05.ts', 'lesson05', lesson05);

// =========================================================================
// LESSON 06: Text Extraction & Concatenation (LEFT, RIGHT, MID, CONCAT, TEXTJOIN)
// New ID: excel_lesson_text_extract
// =========================================================================
export const lesson06: Lesson = {
  id: 'excel_lesson_text_extract',
  order: 6,
  courseId: 'excel',
  levelId: 'basic',
  topicId: 'excel_text_extract',
  title: {
    en: 'Text Extraction & Concatenation: LEFT, RIGHT, MID, LEN, CONCAT & TEXTJOIN',
    vi: 'Trích Xuất & Nối Chuỗi Văn Bản: LEFT, RIGHT, MID, LEN, CONCAT & TEXTJOIN'
  },
  summary: {
    en: 'Master character-level string dissection with LEFT, RIGHT, MID, and dynamic delimiter locating with LEN and FIND. Merge text seamlessly using the modern TEXTJOIN and CONCAT functions with custom delimiters.',
    vi: 'Làm chủ kỹ thuật bóc tách chuỗi ở cấp độ ký tự với LEFT, RIGHT, MID và định vị dấu phân cách động với LEN và FIND. Ghép nối chuỗi liền mạch bằng các hàm hiện đại TEXTJOIN và CONCAT kèm dấu phân cách tùy chỉnh.'
  },
  learn: {
    introduction: {
      en: 'Real-world business data frequently bundles multiple pieces of information into a single code string (e.g. SKU "US-CHI-9842-EXP"). Text extraction formulas allow analysts to isolate country codes, warehouse regions, and numeric serials effortlessly, while concatenation builds clean composite keys and standardized labels.',
      vi: 'Dữ liệu kinh doanh thực tế thường gộp nhiều phần thông tin vào một chuỗi mã duy nhất (ví dụ mã SKU "US-CHI-9842-EXP"). Các công thức trích xuất văn bản cho phép nhà phân tích tách biệt mã quốc gia, khu vực kho bãi và số sê-ri một cách dễ dàng, trong khi phép nối chuỗi giúp tạo khóa kết hợp và nhãn chuẩn hóa.'
    },
    conceptExplanation: {
      en: `### 1. Substring Extraction Functions
- **\`=LEFT(text, [num_chars])\`**: Extracts characters from the far left of a string. Default is 1 character if omitted.
- **\`=RIGHT(text, [num_chars])\`**: Extracts characters from the far right end of a string.
- **\`=MID(text, start_num, num_chars)\`**: Extracts a substring starting from position \`start_num\` for \`num_chars\` length.
- **\`=LEN(text)\`**: Returns the total character count (including spaces and punctuation).
- **\`=FIND(find_text, within_text, [start_num])\`**: Returns the 1-based character position of a delimiter (Case-sensitive).
- **\`=SEARCH(find_text, within_text, [start_num])\`**: Case-insensitive version of FIND, supports wildcards (*, ?).

### 2. Modern Concatenation Functions
- **\`=TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)\`**: The modern gold standard for merging cells or entire ranges (e.g. \`A2:E2\`) separated by a specified delimiter (e.g. \`", "\`), with automatic skipping of blank cells.
- **\`=CONCAT(text1, [text2], ...)\`**: Merges text arguments or continuous cell ranges without delimiters. Replaces legacy \`CONCATENATE\`.
- **Ampersand Operator (\`&\`)**: Fast formula shorthand: \`=A2 & " " & B2\`.`,
      vi: `### 1. Các Hàm Trích Xuất Chuỗi Con
- **\`=LEFT(van_ban, [so_ky_tu])\`**: Trích xuất các ký tự từ phía tận cùng bên trái của chuỗi. Mặc định là 1 ký tự nếu bỏ qua.
- **\`=RIGHT(van_ban, [so_ky_tu])\`**: Trích xuất các ký tự từ phía tận cùng bên phải của chuỗi.
- **\`=MID(van_ban, vi_tri_bat_dau, so_ky_tu)\`**: Trích xuất chuỗi con bắt đầu từ vị trí \`vi_tri_bat_dau\` với độ dài \`so_ky_tu\`.
- **\`=LEN(van_ban)\`**: Trả về tổng số lượng ký tự (bao gồm cả khoảng trắng và dấu câu).
- **\`=FIND(ky_tu_tim, trong_chuoi, [vi_tri_dau])\`**: Trả về vị trí xuất hiện đầu tiên của ký tự tìm kiếm (Phân biệt chữ hoa/chữ thường).
- **\`=SEARCH(ky_tu_tim, trong_chuoi, [vi_tri_dau])\`**: Tương tự FIND nhưng không phân biệt chữ hoa/thường và hỗ trợ ký tự đại diện (*, ?).

### 2. Các Hàm Ghép Nối Chuỗi Hiện Đại
- **\`=TEXTJOIN(dau_phan_cach, bo_qua_o_trong, van_ban1, [van_ban2], ...)\`**: Tiêu chuẩn vàng hiện đại để nối các ô hoặc toàn bộ dải ô (ví dụ \`A2:E2\`) ngăn cách bởi dấu phân cách tùy chọn (ví dụ \`", "\`), tự động bỏ qua các ô trống.
- **\`=CONCAT(van_ban1, [van_ban2], ...)\`**: Ghép các đối số văn bản hoặc toàn bộ vùng ô liên tục mà không cần dấu phân cách. Thay thế hàm cũ \`CONCATENATE\`.
- **Toán tử Và (\`&\`)**: Cú pháp nối nhanh: \`=A2 & " " & B2\`.`
    },
    syntax: `# Extraction:
=LEFT(text, num_chars)
=RIGHT(text, num_chars)
=MID(text, start_num, num_chars)
=LEN(text)
=FIND(find_text, within_text)

# Merging:
=TEXTJOIN(delimiter, ignore_empty, text1, ...)
=CONCAT(text1, ...)
=A2 & " - " & B2`,
    examples: [
      {
        title: { en: 'Dynamic First & Last Name Splitting', vi: 'Tách Động Họ & Tên Riêng' },
        code: `Full Name in A2: "Alexander Hamilton"

Formula for First Name: =LEFT(A2, FIND(" ", A2) - 1)  -> "Alexander"
Formula for Last Name:  =RIGHT(A2, LEN(A2) - FIND(" ", A2)) -> "Hamilton"`,
        description: {
          en: 'Using FIND to locate the space allows dynamic splitting regardless of how long the first name is.',
          vi: 'Dùng FIND để xác định vị trí dấu cách cho phép tách tên động bất kể họ tên dài bao nhiêu ký tự.'
        }
      },
      {
        title: { en: 'Combining Address Columns with TEXTJOIN', vi: 'Gộp Các Cột Địa Chỉ Bằng TEXTJOIN' },
        code: `Street in A2: "123 Main St"
Suite in B2: (blank)
City in C2: "Chicago"
State in D2: "IL"

Formula in E2: =TEXTJOIN(", ", TRUE, A2:D2)
Result: "123 Main St, Chicago, IL" (Automatically ignores empty Suite cell!)`,
        description: {
          en: 'TEXTJOIN with TRUE cleanly skips blank cells, preventing awkward double commas like ", ,".',
          vi: 'TEXTJOIN với tham số TRUE tự động bỏ qua các ô rỗng, ngăn ngừa việc bị dính dấu phẩy kép thừa như ", ,".'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Forgetting that MID requires a 1-based starting position index (1 is the first character).',
          vi: 'Quên rằng MID yêu cầu vị trí bắt đầu tính từ 1 (1 là ký tự đầu tiên).'
        },
        correction: {
          en: 'Pass start_num as 1 (not 0) when extracting from the beginning.',
          vi: 'Truyền vi_tri_bat_dau là 1 (không phải 0) khi trích xuất từ đầu chuỗi.'
        }
      },
      {
        mistake: {
          en: 'Using legacy CONCATENATE(A2:E2) which fails to accept ranges as arguments.',
          vi: 'Dùng hàm cũ CONCATENATE(A2:E2) vốn không hỗ trợ truyền dải ô làm tham số.'
        },
        correction: {
          en: 'Use modern TEXTJOIN or CONCAT which accept full array ranges natively.',
          vi: 'Sử dụng TEXTJOIN hoặc CONCAT hiện đại vốn hỗ trợ trực tiếp dải ô nguyên bản.'
        }
      }
    ],
    tips: [
      { en: 'TEXTJOIN Range Superpower: You can pass an entire row range like =TEXTJOIN("; ", TRUE, B2:G2) to combine multiple tags into a single cell.', vi: 'Sức mạnh dải ô của TEXTJOIN: Bạn có thể truyền toàn bộ dải ô hàng như =TEXTJOIN("; ", TRUE, B2:G2) để gộp nhiều nhãn thẻ vào một ô duy nhất.' },
      { en: 'Extract Number from Text: Use VALUE(MID(...)) if you need the extracted substring converted into a real calculable number.', vi: 'Chuyển chuỗi trích xuất thành số: Dùng VALUE(MID(...)) nếu cần chuỗi con vừa trích xuất trở thành một con số thực sự có thể tính toán.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l6_ex1',
      type: 'complete_code',
      title: { en: 'Extract Country Prefix from SKU', vi: 'Trích Xuất Mã Quốc Gia Từ SKU' },
      instruction: {
        en: 'Write the formula to extract the first 2 characters from the SKU code in cell A2 (e.g. "US-9821").',
        vi: 'Viết công thức trích xuất 2 ký tự đầu tiên từ mã SKU ở ô A2 (ví dụ "US-9821").'
      },
      starterCode: '=LEFT(',
      solutionCode: '=LEFT(A2, 2)',
      expectedOutput: '=LEFT(A2, 2)',
      hint: { en: 'Use LEFT with cell A2 and length 2.', vi: 'Dùng hàm LEFT với ô A2 và độ dài là 2.' },
      explanation: { en: '=LEFT(A2, 2) extracts the two leftmost characters from cell A2.', vi: '=LEFT(A2, 2) trích xuất 2 ký tự ngoài cùng bên trái từ ô A2.' }
    },
    {
      id: 'excel_l6_ex2',
      type: 'complete_code',
      title: { en: 'Join Full Address with Hyphen Separator', vi: 'Nối Địa Chỉ Đầy Đủ Bằng Dấu Gạch Nối' },
      instruction: {
        en: 'Write a formula using TEXTJOIN to merge cells A2, B2, and C2 separated by " - ", skipping empty cells.',
        vi: 'Viết công thức dùng TEXTJOIN để gộp các ô A2, B2 và C2 ngăn cách bằng " - ", bỏ qua các ô trống.'
      },
      starterCode: '=TEXTJOIN(" - ", TRUE, ',
      solutionCode: '=TEXTJOIN(" - ", TRUE, A2:C2)',
      expectedOutput: '=TEXTJOIN(" - ", TRUE, A2:C2)',
      hint: { en: 'Pass range A2:C2 as the text argument.', vi: 'Truyền dải ô A2:C2 vào làm đối số văn bản.' },
      explanation: { en: '=TEXTJOIN(" - ", TRUE, A2:C2) joins all non-empty values in range A2:C2 with a hyphen separator.', vi: '=TEXTJOIN(" - ", TRUE, A2:C2) nối tất cả các giá trị không trống trong vùng A2:C2 bằng dấu gạch nối.' }
    }
  ],
  challenge: {
    id: 'excel_l6_challenge',
    title: { en: 'Parse Warehouse Code from Composite Serial String', vi: 'Tách Mã Nhà Kho Từ Chuỗi Sê-ri Kết Hợp' },
    description: {
      en: 'In serial code "INV-W42-9908" in cell A2, extract the 3-character warehouse code ("W42") starting at character position 5.',
      vi: 'Từ mã sê-ri "INV-W42-9908" ở ô A2, hãy trích xuất mã nhà kho gồm 3 ký tự ("W42") bắt đầu từ vị trí ký tự thứ 5.'
    },
    requirements: [
      { en: 'Use the MID function', vi: 'Sử dụng hàm MID' },
      { en: 'Specify starting position 5 and length 3', vi: 'Chỉ định vị trí bắt đầu là 5 và độ dài là 3' }
    ],
    starterCode: '=',
    solutionCode: '=MID(A2, 5, 3)',
    hints: [
      { en: 'Formula syntax: =MID(A2, 5, 3)', vi: 'Cú pháp công thức: =MID(A2, 5, 3)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l6_q1',
      type: 'single_choice',
      question: {
        en: 'What does `=RIGHT("EXCEL2026", 4)` return?',
        vi: 'Công thức `=RIGHT("EXCEL2026", 4)` trả về kết quả gì?'
      },
      options: [
        { en: '"2026"', vi: '"2026"' },
        { en: '"EXCE"', vi: '"EXCE"' },
        { en: '"L202"', vi: '"L202"' },
        { en: '2026 (numeric)', vi: '2026 (số)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RIGHT extracts the 4 rightmost characters, returning the text string "2026".',
        vi: 'Hàm RIGHT trích xuất 4 ký tự ngoài cùng bên phải, trả về chuỗi văn bản "2026".'
      },
      difficulty: 'easy',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q2',
      type: 'single_choice',
      question: {
        en: 'In the formula `=MID("PRODUCT-994", 9, 3)`, what is the returned string?',
        vi: 'Trong công thức `=MID("PRODUCT-994", 9, 3)`, chuỗi được trả về là gì?'
      },
      options: [
        { en: '"994"', vi: '"994"' },
        { en: '"-99"', vi: '"-99"' },
        { en: '"PRODUCT"', vi: '"PRODUCT"' },
        { en: '"T-9"', vi: '"T-9"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Character 9 is "9", and taking 3 characters returns "994".',
        vi: 'Ký tự thứ 9 là "9", và lấy 3 ký tự sẽ trả về "994".'
      },
      difficulty: 'medium',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q3',
      type: 'single_choice',
      question: {
        en: 'What is the key advantage of `TEXTJOIN` over `CONCAT` or the `&` operator?',
        vi: 'Ưu điểm chính của `TEXTJOIN` so với `CONCAT` hoặc toán tử `&` là gì?'
      },
      options: [
        { en: 'It automatically inserts a delimiter and can ignore empty cells across ranges', vi: 'Nó tự động chèn dấu phân cách và có thể bỏ qua các ô trống trên toàn bộ dải ô' },
        { en: 'It only works with numbers', vi: 'Nó chỉ hoạt động với các số' },
        { en: 'It converts text to uppercase', vi: 'Nó chuyển văn bản thành chữ hoa' },
        { en: 'It encrypts the output text', vi: 'Nó mã hóa văn bản đầu ra' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'TEXTJOIN allows specifying a universal delimiter and setting ignore_empty to TRUE to skip blank cells effortlessly.',
        vi: 'TEXTJOIN cho phép chỉ định dấu phân cách chung và đặt ignore_empty thành TRUE để bỏ qua các ô trống dễ dàng.'
      },
      difficulty: 'easy',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q4',
      type: 'single_choice',
      question: {
        en: 'What does `=LEN("Data Analysis")` return?',
        vi: 'Công thức `=LEN("Data Analysis")` trả về kết quả gì?'
      },
      options: [
        { en: '13 (including the space character)', vi: '13 (bao gồm cả ký tự khoảng trắng)' },
        { en: '12 (letters only)', vi: '12 (chỉ tính chữ cái)' },
        { en: '2 (word count)', vi: '2 (số lượng từ)' },
        { en: '14', vi: '14' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '"Data" (4) + space (1) + "Analysis" (8) = 13 total characters.',
        vi: '"Data" (4) + khoảng trắng (1) + "Analysis" (8) = tổng cộng 13 ký tự.'
      },
      difficulty: 'easy',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q5',
      type: 'single_choice',
      question: {
        en: 'What is the main difference between `FIND` and `SEARCH` in Excel?',
        vi: 'Sự khác biệt chính giữa hàm `FIND` và `SEARCH` trong Excel là gì?'
      },
      options: [
        { en: 'FIND is case-sensitive; SEARCH is case-insensitive and supports wildcards', vi: 'FIND phân biệt chữ hoa/thường; SEARCH không phân biệt chữ hoa/thường và hỗ trợ ký tự đại diện' },
        { en: 'FIND searches from right to left; SEARCH searches left to right', vi: 'FIND tìm từ phải sang trái; SEARCH tìm từ trái sang phải' },
        { en: 'FIND only searches numbers; SEARCH searches text', vi: 'FIND chỉ tìm số; SEARCH tìm văn bản' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'FIND is strictly case-sensitive, whereas SEARCH ignores casing and allows wildcard matching (* and ?).',
        vi: 'FIND phân biệt nghiêm ngặt chữ hoa/chữ thường, trong khi SEARCH bỏ qua chữ hoa/thường và cho phép dùng ký tự đại diện (* và ?).'
      },
      difficulty: 'medium',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q6',
      type: 'single_choice',
      question: {
        en: 'What does the formula `="Item: " & A1 & " (" & B1 & ")"` do?',
        vi: 'Công thức `="Item: " & A1 & " (" & B1 & ")"` làm nhiệm vụ gì?'
      },
      options: [
        { en: 'Concatenates literal strings with the contents of cells A1 and B1', vi: 'Ghép các chuỗi ký tự cố định với nội dung của các ô A1 và B1' },
        { en: 'Calculates the sum of A1 and B1', vi: 'Tính tổng của A1 và B1' },
        { en: 'Formats cell A1 as a date', vi: 'Định dạng ô A1 thành ngày tháng' },
        { en: 'Checks if A1 equals B1', vi: 'Kiểm tra xem A1 có bằng B1 không' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The ampersand (&) operator chains text strings and cell references together.',
        vi: 'Toán tử và (&) liên kết các chuỗi văn bản và các ô tham chiếu lại với nhau.'
      },
      difficulty: 'easy',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q7',
      type: 'single_choice',
      question: {
        en: 'What is the output of `=LEFT("Report", 1)`?',
        vi: 'Kết quả của `=LEFT("Report", 1)` là gì?'
      },
      options: [
        { en: '"R"', vi: '"R"' },
        { en: '"Report"', vi: '"Report"' },
        { en: '"t"', vi: '"t"' },
        { en: '1', vi: '1' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LEFT with num_chars = 1 extracts the very first character on the left, "R".',
        vi: 'Hàm LEFT với số ký tự là 1 sẽ trích xuất đúng ký tự đầu tiên bên trái là "R".'
      },
      difficulty: 'easy',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q8',
      type: 'single_choice',
      question: {
        en: 'What does `=TEXTJOIN("/", TRUE, "2026", "", "08", "29")` produce?',
        vi: 'Công thức `=TEXTJOIN("/", TRUE, "2026", "", "08", "29")` tạo ra kết quả gì?'
      },
      options: [
        { en: '"2026/08/29"', vi: '"2026/08/29"' },
        { en: '"2026//08/29"', vi: '"2026//08/29"' },
        { en: '"2026 08 29"', vi: '"2026 08 29"' },
        { en: '#VALUE!', vi: '#VALUE!' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because ignore_empty is TRUE, the blank second argument is skipped, resulting in "2026/08/29".',
        vi: 'Vì tham số ignore_empty là TRUE, đối số thứ hai rỗng bị bỏ qua, tạo ra kết quả "2026/08/29".'
      },
      difficulty: 'medium',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q9',
      type: 'true_false',
      question: {
        en: 'True or False: Results extracted with `LEFT`, `RIGHT`, or `MID` are always returned as text data types, even if the characters extracted are all digits.',
        vi: 'Đúng hay Sai: Kết quả được trích xuất bằng các hàm `LEFT`, `RIGHT` hoặc `MID` luôn được trả về dưới dạng kiểu dữ liệu văn bản (Text), ngay cả khi các ký tự trích xuất toàn là chữ số.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Text functions return text strings. To use the extracted digits in math, wrap them with VALUE() or perform arithmetic (*1 or +0).',
        vi: 'Đúng. Các hàm văn bản luôn trả về chuỗi. Để sử dụng các chữ số trích xuất trong toán học, hãy bọc chúng bằng VALUE() hoặc thực hiện phép tính số học (*1 hoặc +0).'
      },
      difficulty: 'medium',
      topicId: 'excel_text_extract'
    },
    {
      id: 'excel_l6_q10',
      type: 'single_choice',
      question: {
        en: 'If cell A1 contains "Department_Sales", what does `=FIND("_", A1)` return?',
        vi: 'Nếu ô A1 chứa chuỗi "Department_Sales", công thức `=FIND("_", A1)` trả về giá trị nào?'
      },
      options: [
        { en: '11', vi: '11' },
        { en: '10', vi: '10' },
        { en: '1', vi: '1' },
        { en: '"_"', vi: '"_"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '"Department" has 10 characters, so the underscore "_" is located at position 11.',
        vi: '"Department" có 10 ký tự, do đó dấu gạch dưới "_" nằm ở vị trí số 11.'
      },
      difficulty: 'easy',
      topicId: 'excel_text_extract'
    }
  ]
};

saveLesson(basicMod02Dir, 'lesson06.ts', 'lesson06', lesson06);

// =========================================================================
// LESSON 07: Date & Time Fundamentals
// Preserved ID: excel_lesson_9
// =========================================================================
export const lesson07: Lesson = {
  id: 'excel_lesson_9',
  order: 7,
  courseId: 'excel',
  levelId: 'basic',
  topicId: 'excel_dates',
  title: {
    en: 'Date & Time Fundamentals: TODAY, NOW, DATE, YEAR, MONTH, DAY & NETWORKDAYS',
    vi: 'Cốt Lõi Ngày & Giờ: TODAY, NOW, DATE, YEAR, MONTH, DAY & NETWORKDAYS'
  },
  summary: {
    en: 'Master Excel serial date numbering architecture (Day 1 = Jan 1, 1900), dynamic clock functions (TODAY, NOW), component extractions (YEAR, MONTH, DAY), and working business day modeling with NETWORKDAYS and WORKDAY.',
    vi: 'Làm chủ kiến trúc số sê-ri ngày tháng của Excel (Ngày 1 = 01/01/1900), các hàm đồng hồ động (TODAY, NOW), bóc tách thành phần (YEAR, MONTH, DAY) và tính toán ngày làm việc thực tế với NETWORKDAYS và WORKDAY.'
  },
  learn: {
    introduction: {
      en: 'Dates in Excel are not static text—they are continuous sequential integers starting from 1 on January 1, 1900 (e.g. August 29, 2026 is stored as serial integer 46263). Fractional decimals represent time of day (0.5 = 12:00 PM noon). Understanding this serial architecture allows you to perform seamless date math, compute project durations, and track invoice aging.',
      vi: 'Ngày tháng trong Excel không phải là văn bản tĩnh—chúng là các số nguyên tuần tự liên tục bắt đầu từ 1 vào ngày 01/01/1900 (ví dụ ngày 29/08/2026 được lưu dưới dạng số nguyên sê-ri 46263). Phần số thập phân đại diện cho thời gian trong ngày (0.5 = 12:00 trưa). Hiểu kiến trúc này giúp bạn thực hiện các phép cộng trừ ngày tháng, tính thời lượng dự án và theo dõi tuổi nợ hóa đơn.'
    },
    conceptExplanation: {
      en: `### 1. The Excel Serial Date & Time System
- **Serial Integer**: Represents whole days since Jan 1, 1900.
- **Serial Fraction**: Represents time of day (\`0.25\` = 6:00 AM, \`0.50\` = 12:00 PM, \`0.75\` = 6:00 PM).
- **Date Math**: \`=EndDate - StartDate\` computes exact calendar days elapsed.

### 2. Core Date Functions
- **\`=TODAY()\`**: Volatile function returning the current system date at midnight (e.g. \`2026-08-29\`).
- **\`=NOW()\`**: Volatile function returning current date AND exact time (e.g. \`2026-08-29 15:30\`).
- **\`=DATE(year, month, day)\`**: Assembles a valid serial date from numeric components safely avoiding regional \`mm/dd\` vs \`dd/mm\` confusion.
- **\`=YEAR(date)\` / \`=MONTH(date)\` / \`=DAY(date)\`**: Extracts individual numerical date components.

### 3. Business Calendar Functions
- **\`=NETWORKDAYS(start_date, end_date, [holidays])\`**: Calculates total working business days between two dates, automatically excluding Saturdays, Sundays, and optional holiday dates.
- **\`=WORKDAY(start_date, days, [holidays])\`**: Returns the completion date that is a specific number of working days ahead of the start date.
- **\`=EOMONTH(start_date, months)\`**: Returns the last day of the month after a specified number of months (e.g. \`=EOMONTH(TODAY(), 0)\` returns end of current month).`,
      vi: `### 1. Hệ Thống Số Sê-ri Ngày & Giờ Trong Excel
- **Số nguyên sê-ri**: Đại diện cho số ngày kể từ ngày 01/01/1900.
- **Số thập phân**: Đại diện cho thời gian trong ngày (\`0.25\` = 6:00 sáng, \`0.50\` = 12:00 trưa, \`0.75\` = 6:00 chiều).
- **Phép toán ngày**: \`=NgayKetThuc - NgayBatDau\` tính chính xác số ngày theo lịch đã trôi qua.

### 2. Các Hàm Ngày Tháng Cốt Lõi
- **\`=TODAY()\`**: Hàm biến đổi trả về ngày hệ thống hiện tại tại mốc 00:00 (ví dụ: \`2026-08-29\`).
- **\`=NOW()\`**: Hàm biến đổi trả về cả ngày hiện tại VÀ thời gian chính xác (ví dụ: \`2026-08-29 15:30\`).
- **\`=DATE(nam, thang, ngay)\`**: Ghép nối các thành phần số thành một ngày sê-ri chuẩn xác, tránh nhầm lẫn giữa định dạng \`mm/dd\` và \`dd/mm\`.
- **\`=YEAR(ngay)\` / \`=MONTH(ngay)\` / \`=DAY(ngay)\`**: Bóc tách từng thành phần số năm, tháng, ngày.

### 3. Các Hàm Tính Toán Ngày Làm Việc Doanh Nghiệp
- **\`=NETWORKDAYS(ngay_bat_dau, ngay_ket_thuc, [ngay_le])\`**: Tính tổng số ngày làm việc thực tế giữa 2 mốc thời gian, tự động trừ các ngày Thứ Bảy, Chủ Nhật và danh sách ngày nghỉ lễ tùy chọn.
- **\`=WORKDAY(ngay_bat_dau, so_ngay_lam_viec, [ngay_le])\`**: Trả về ngày hoàn thành sau đúng số ngày làm việc quy định.
- **\`=EOMONTH(ngay_bat_dau, so_thang)\`**: Trả về ngày cuối cùng của tháng sau một số tháng nhất định (ví dụ \`=EOMONTH(TODAY(), 0)\` trả về ngày cuối cùng của tháng hiện tại).`
    },
    syntax: `# Basic Date Functions:
=TODAY()
=NOW()
=DATE(2026, 8, 29)
=YEAR(A2)
=MONTH(A2)
=DAY(A2)

# Business Days:
=NETWORKDAYS(start_date, end_date, [holidays])
=WORKDAY(start_date, days, [holidays])
=EOMONTH(start_date, months)`,
    examples: [
      {
        title: { en: 'Calculating Invoice Aging in Days', vi: 'Tính Tuổi Nợ Hóa Đơn Theo Số Ngày' },
        code: `Invoice Date in B2: 2026-07-15

Aging in Days Formula in C2: =TODAY() - B2
(Format C2 as General/Number to view elapsed integer days, e.g. 45 days overdue)`,
        description: {
          en: 'Subtracting the invoice date from TODAY() dynamically updates overdue days every time the workbook opens.',
          vi: 'Trừ ngày hóa đơn cho TODAY() sẽ tự động cập nhật số ngày quá hạn mỗi khi mở bảng tính.'
        }
      },
      {
        title: { en: 'Project Working Days Schedule', vi: 'Lịch Trình Ngày Làm Việc Dự Án' },
        code: `Project Start Date in B2: 2026-09-01
Project Duration: 20 Working Days
Company Holidays Range in H2:H5

Formula for Completion Date in B3: =WORKDAY(B2, 20, H2:H5)`,
        description: {
          en: 'WORKDAY automatically skips all weekends and specified company holidays to pinpoint the exact delivery date.',
          vi: 'WORKDAY tự động bỏ qua tất cả các ngày cuối tuần và ngày lễ công ty để xác định chính xác ngày bàn giao.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Entering dates as text strings "08/29/2026" inside formulas without DATE(), leading to #VALUE! errors when switching regional machine settings.',
          vi: 'Nhập ngày tháng dưới dạng chuỗi văn bản "08/29/2026" trong công thức thay vì dùng DATE(), gây lỗi #VALUE! khi đổi ngôn ngữ máy tính.'
        },
        correction: {
          en: 'Always use =DATE(year, month, day) to ensure universal compatibility regardless of regional settings.',
          vi: 'Luôn sử dụng =DATE(năm, tháng, ngày) để đảm bảo tính tương thích toàn cầu bất kể cài đặt vùng máy tính.'
        }
      },
      {
        mistake: {
          en: 'Seeing a date displayed as a random 5-digit number (e.g. 46263) and assuming the cell is broken.',
          vi: 'Thấy ngày tháng hiển thị thành con số 5 chữ số (ví dụ 46263) và tưởng rằng ô bị hỏng.'
        },
        correction: {
          en: 'Press Ctrl + Shift + 3 (Short Date format) to switch the raw serial integer display back to a formatted calendar date.',
          vi: 'Nhấn Ctrl + Shift + 3 (Định dạng ngày ngắn) để chuyển số nguyên sê-ri thô về định dạng ngày tháng lịch quen thuộc.'
        }
      }
    ],
    tips: [
      { en: 'Insert Static Timestamp: Press Ctrl + ; (semi-colon) to insert the current static date, or Ctrl + Shift + ; to insert the current static time (these will not update when recalculated).', vi: 'Chèn ngày giờ tĩnh: Nhấn Ctrl + ; để chèn ngày tĩnh hiện tại, hoặc Ctrl + Shift + ; để chèn giờ tĩnh (các giá trị này sẽ không bị thay đổi khi tính toán lại).' },
      { en: 'EOMONTH for Due Dates: Use =EOMONTH(A2, 1) to find the end of next month, a standard convention for supplier payment terms.', vi: 'EOMONTH cho hạn thanh toán: Dùng =EOMONTH(A2, 1) để tìm ngày cuối cùng của tháng sau, quy chuẩn kế toán phổ biến cho hạn thanh toán nhà cung cấp.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l7_ex1',
      type: 'complete_code',
      title: { en: 'Calculate Working Days Between Project Milestones', vi: 'Tính Số Ngày Làm Việc Giữa Hai Mốc Dự Án' },
      instruction: {
        en: 'Write the formula using NETWORKDAYS to compute working days between Start Date in A2 and End Date in B2.',
        vi: 'Viết công thức dùng NETWORKDAYS để tính số ngày làm việc giữa Ngày bắt đầu ở A2 và Ngày kết thúc ở B2.'
      },
      starterCode: '=NETWORKDAYS(',
      solutionCode: '=NETWORKDAYS(A2, B2)',
      expectedOutput: '=NETWORKDAYS(A2, B2)',
      hint: { en: 'Pass A2 as start_date and B2 as end_date.', vi: 'Truyền A2 làm ngày bắt đầu và B2 làm ngày kết thúc.' },
      explanation: { en: '=NETWORKDAYS(A2, B2) calculates net working business days excluding Saturdays and Sundays.', vi: '=NETWORKDAYS(A2, B2) tính số ngày làm việc thực tế không tính Thứ Bảy và Chủ Nhật.' }
    },
    {
      id: 'excel_l7_ex2',
      type: 'complete_code',
      title: { en: 'Extract Birth Year from Date of Birth', vi: 'Trích Xuất Năm Sinh Từ Ngày Sinh' },
      instruction: {
        en: 'Write the formula to extract the 4-digit year from the birth date in cell C2.',
        vi: 'Viết công thức trích xuất 4 chữ số năm từ ngày sinh trong ô C2.'
      },
      starterCode: '=',
      solutionCode: '=YEAR(C2)',
      expectedOutput: '=YEAR(C2)',
      hint: { en: 'Use the YEAR function.', vi: 'Sử dụng hàm YEAR.' },
      explanation: { en: '=YEAR(C2) returns the 4-digit year integer from the serial date.', vi: '=YEAR(C2) trả về số nguyên năm 4 chữ số từ ngày sê-ri.' }
    }
  ],
  challenge: {
    id: 'excel_l7_challenge',
    title: { en: 'Calculate Due Date at End of Billing Month', vi: 'Tính Hạn Thanh Toán Vào Ngày Cuối Tháng' },
    description: {
      en: 'Write the formula for cell D2 to calculate the payment due date, defined as the last day of the same month as the invoice date in B2.',
      vi: 'Viết công thức cho ô D2 tính ngày hạn thanh toán, được quy định là ngày cuối cùng của chính tháng xuất hóa đơn ở B2.'
    },
    requirements: [
      { en: 'Use the EOMONTH function', vi: 'Sử dụng hàm EOMONTH' },
      { en: 'Pass 0 as the month offset for the current month', vi: 'Truyền 0 làm số tháng bù cho tháng hiện tại' }
    ],
    starterCode: '=',
    solutionCode: '=EOMONTH(B2, 0)',
    hints: [
      { en: 'Syntax: =EOMONTH(B2, 0)', vi: 'Cú pháp: =EOMONTH(B2, 0)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l7_q1',
      type: 'single_choice',
      question: {
        en: 'How does Microsoft Excel internally store dates in its calculation engine?',
        vi: 'Microsoft Excel lưu trữ ngày tháng bên trong bộ tính toán của mình như thế nào?'
      },
      options: [
        { en: 'As sequential serial numbers representing days elapsed since January 1, 1900', vi: 'Dưới dạng các số sê-ri tuần tự đại diện cho số ngày đã trôi qua kể từ ngày 01/01/1900' },
        { en: 'As text strings formatted as YYYY-MM-DD', vi: 'Dưới dạng chuỗi văn bản định dạng YYYY-MM-DD' },
        { en: 'As Unix timestamps in milliseconds', vi: 'Dưới dạng dấu thời gian Unix theo mili-giây' },
        { en: 'As binary byte arrays', vi: 'Dưới dạng mảng byte nhị phân' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Excel stores dates as integer serial numbers where Day 1 corresponds to January 1, 1900.',
        vi: 'Excel lưu ngày tháng dưới dạng số sê-ri nguyên trong đó Ngày 1 tương ứng với ngày 01/01/1900.'
      },
      difficulty: 'easy',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q2',
      type: 'single_choice',
      question: {
        en: 'What is the main difference between `TODAY()` and `NOW()` in Excel?',
        vi: 'Sự khác biệt chính giữa `TODAY()` và `NOW()` trong Excel là gì?'
      },
      options: [
        { en: 'TODAY returns only the current date; NOW returns both current date and current time', vi: 'TODAY chỉ trả về ngày hiện tại; NOW trả về cả ngày hiện tại và giờ hiện tại' },
        { en: 'TODAY is static; NOW updates', vi: 'TODAY là tĩnh; NOW tự cập nhật' },
        { en: 'TODAY returns UTC time; NOW returns local time', vi: 'TODAY trả về giờ UTC; NOW trả về giờ địa phương' },
        { en: 'TODAY returns year only; NOW returns full date', vi: 'TODAY chỉ trả về năm; NOW trả về toàn bộ ngày' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'TODAY() returns the serial integer for the current date. NOW() includes decimal fractions representing current hours, minutes, and seconds.',
        vi: 'TODAY() trả về số nguyên sê-ri cho ngày hiện tại. NOW() bao gồm cả phần thập phân đại diện cho giờ, phút và giây hiện tại.'
      },
      difficulty: 'easy',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q3',
      type: 'single_choice',
      question: {
        en: 'What does the function `=NETWORKDAYS(A1, B1)` automatically exclude from its calculation?',
        vi: 'Hàm `=NETWORKDAYS(A1, B1)` tự động loại trừ những ngày nào khỏi phép tính của nó?'
      },
      options: [
        { en: 'Saturdays and Sundays (weekends)', vi: 'Thứ Bảy và Chủ Nhật (các ngày cuối tuần)' },
        { en: 'Only Sundays', vi: 'Chỉ ngày Chủ Nhật' },
        { en: 'Mondays and Fridays', vi: 'Thứ Hai và Thứ Sáu' },
        { en: 'All days in December', vi: 'Tất cả các ngày trong tháng 12' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'NETWORKDAYS automatically excludes standard weekend days (Saturday and Sunday), plus any optional dates specified in the holiday argument.',
        vi: 'NETWORKDAYS tự động loại trừ các ngày cuối tuần tiêu chuẩn (Thứ Bảy và Chủ Nhật), cộng với bất kỳ ngày nghỉ lễ nào được chỉ định.'
      },
      difficulty: 'medium',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q4',
      type: 'single_choice',
      question: {
        en: 'What does the function `=EOMONTH(DATE(2026, 2, 10), 0)` return?',
        vi: 'Hàm `=EOMONTH(DATE(2026, 2, 10), 0)` trả về ngày nào?'
      },
      options: [
        { en: 'February 28, 2026', vi: '28/02/2026' },
        { en: 'February 10, 2026', vi: '10/02/2026' },
        { en: 'March 31, 2026', vi: '31/03/2026' },
        { en: 'January 31, 2026', vi: '31/01/2026' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'EOMONTH with offset 0 returns the final day of the same month. 2026 is not a leap year, so February ends on Feb 28.',
        vi: 'EOMONTH với tham số bù 0 trả về ngày cuối cùng của chính tháng đó. Năm 2026 không phải năm nhuận nên tháng 2 kết thúc vào ngày 28/02.'
      },
      difficulty: 'medium',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q5',
      type: 'single_choice',
      question: {
        en: 'Which keyboard shortcut inserts the current static date into a cell?',
        vi: 'Phím tắt nào chèn ngày tĩnh hiện tại vào một ô?'
      },
      options: [
        { en: 'Ctrl + ; (semi-colon)', vi: 'Ctrl + ; (dấu chấm phẩy)' },
        { en: 'Ctrl + Shift + ;', vi: 'Ctrl + Shift + ;' },
        { en: 'Ctrl + D', vi: 'Ctrl + D' },
        { en: 'Alt + D', vi: 'Alt + D' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Ctrl + ; inserts the current date as a static value that does not recalculate.',
        vi: 'Ctrl + ; chèn ngày hiện tại dưới dạng giá trị tĩnh không bị tính toán lại.'
      },
      difficulty: 'easy',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q6',
      type: 'single_choice',
      question: {
        en: 'Why is `=DATE(2026, 8, 29)` preferred over entering text `"08/29/2026"` in formulas?',
        vi: 'Tại sao `=DATE(2026, 8, 29)` lại được ưu tiên hơn việc nhập văn bản `"08/29/2026"` trong công thức?'
      },
      options: [
        { en: 'It eliminates ambiguity between US (MM/DD/YYYY) and International (DD/MM/YYYY) date settings', vi: 'Nó loại bỏ sự mơ hồ giữa định dạng ngày tháng kiểu Mỹ (MM/DD) và Quốc tế (DD/MM)' },
        { en: 'It makes the formula run 10x faster', vi: 'Nó làm công thức chạy nhanh hơn 10 lần' },
        { en: 'It locks the cell against editing', vi: 'Nó khóa ô ngăn không cho chỉnh sửa' },
        { en: 'It applies bold styling automatically', vi: 'Nó tự động áp dụng kiểu in đậm' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DATE explicitly provides year, month, and day as numeric arguments, preventing misinterpretation across international computers.',
        vi: 'DATE cung cấp rõ ràng năm, tháng và ngày dưới dạng số, tránh diễn giải sai trên các máy tính có cài đặt quốc tế khác nhau.'
      },
      difficulty: 'medium',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q7',
      type: 'single_choice',
      question: {
        en: 'What does `=MONTH(DATE(2026, 12, 25))` return?',
        vi: 'Công thức `=MONTH(DATE(2026, 12, 25))` trả về kết quả gì?'
      },
      options: [
        { en: '12', vi: '12' },
        { en: '"December"', vi: '"December"' },
        { en: '25', vi: '25' },
        { en: '2026', vi: '2026' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MONTH returns an integer from 1 to 12 representing the month of the date (12 for December).',
        vi: 'MONTH trả về một số nguyên từ 1 đến 12 đại diện cho tháng trong năm (12 cho tháng Mười Hai).'
      },
      difficulty: 'easy',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q8',
      type: 'true_false',
      question: {
        en: 'True or False: In Excel, the decimal number `0.5` represents 12:00 PM (noon) in serial time format.',
        vi: 'Đúng hay Sai: Trong Excel, số thập phân `0.5` đại diện cho 12:00 trưa theo định dạng thời gian sê-ri.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. 24 hours equals 1.0, so 12 hours (half a day) is stored as 0.5.',
        vi: 'Đúng. 24 giờ tương ứng với 1.0, vì vậy 12 giờ (nửa ngày) được lưu trữ là 0.5.'
      },
      difficulty: 'easy',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q9',
      type: 'single_choice',
      question: {
        en: 'If a project starts on Monday (Sept 1) and requires 5 working days, what completion date does `=WORKDAY("2026-09-01", 5)` return (assuming no holidays)?',
        vi: 'Nếu dự án bắt đầu vào Thứ Hai (01/09) và cần 5 ngày làm việc, ngày hoàn thành mà `=WORKDAY("2026-09-01", 5)` trả về là ngày nào (không có ngày lễ)?'
      },
      options: [
        { en: 'The following Tuesday (Sept 8)', vi: 'Thứ Ba tuần kế tiếp (08/09)' },
        { en: 'Saturday (Sept 6)', vi: 'Thứ Bảy (06/09)' },
        { en: 'Friday (Sept 5)', vi: 'Thứ Sáu (05/09)' },
        { en: 'Sunday (Sept 7)', vi: 'Chủ Nhật (07/09)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'WORKDAY counts 5 business days: Tue (1), Wed (2), Thu (3), Fri (4), skips weekend (Sat/Sun), and lands on Tue Sept 8 (5th work day after start).',
        vi: 'WORKDAY đếm 5 ngày làm việc: Thứ Ba (1), Thứ Tư (2), Thứ Năm (3), Thứ Sáu (4), bỏ qua Thứ Bảy/Chủ Nhật và đến Thứ Ba 08/09 (ngày làm việc thứ 5 sau khi bắt đầu).'
      },
      difficulty: 'hard',
      topicId: 'excel_dates'
    },
    {
      id: 'excel_l7_q10',
      type: 'single_choice',
      question: {
        en: 'What function returns the day of the week as an integer (e.g. 1 for Sunday or 2 for Monday)?',
        vi: 'Hàm nào trả về thứ trong tuần dưới dạng số nguyên (ví dụ 1 cho Chủ Nhật hoặc 2 cho Thứ Hai)?'
      },
      options: [
        { en: 'WEEKDAY', vi: 'WEEKDAY' },
        { en: 'DAYNAME', vi: 'DAYNAME' },
        { en: 'DAYS', vi: 'DAYS' },
        { en: 'DOW', vi: 'DOW' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'WEEKDAY(serial_number, [return_type]) returns a number from 1 to 7 corresponding to the day of the week.',
        vi: 'WEEKDAY(so_se_ri, [kieu_tra_ve]) trả về một số từ 1 đến 7 tương ứng với thứ trong tuần.'
      },
      difficulty: 'easy',
      topicId: 'excel_dates'
    }
  ]
};

saveLesson(basicMod02Dir, 'lesson07.ts', 'lesson07', lesson07);

// =========================================================================
// LESSON 08: Conditional Formatting
// New ID: excel_lesson_conditional_formatting
// =========================================================================
export const lesson08: Lesson = {
  id: 'excel_lesson_conditional_formatting',
  order: 8,
  courseId: 'excel',
  levelId: 'basic',
  topicId: 'excel_formatting',
  title: {
    en: 'Conditional Formatting: Highlight Rules, Data Bars, Color Scales & Custom Formulas',
    vi: 'Định Dạng Có Điều Kiện: Quy Tắc Đánh Dấu, Data Bars, Color Scales & Công Thức Tùy Chỉnh'
  },
  summary: {
    en: 'Transform raw data grids into intuitive visual management dashboards using preset highlight rules, gradient Data Bars, Heatmap Color Scales, Icon Sets, and advanced formula-based formatting with mixed cell locking ($C2>1000).',
    vi: 'Biến đổi bảng số liệu thô thành báo cáo quản trị trực quan sinh động bằng các quy tắc đánh dấu có sẵn, thanh Data Bars, bản đồ nhiệt Color Scales, Icon Sets và kỹ thuật định dạng bằng công thức nâng cao có khóa cột ($C2>1000).'
  },
  learn: {
    introduction: {
      en: 'Conditional formatting automatically changes the fill color, font style, or border of cells when specific data conditions are met. Rather than manually scanning 10,000 rows to find overdue accounts or negative profit margins, conditional formatting visually surfaces anomalies, trends, and top performers in real time.',
      vi: 'Định dạng có điều kiện (Conditional Formatting) tự động thay đổi màu nền, kiểu chữ hoặc đường viền của ô khi dữ liệu thỏa mãn điều kiện nhất định. Thay vì phải rà soát thủ công 10.000 dòng để tìm hóa đơn quá hạn hoặc biên lợi nhuận âm, tính năng này làm nổi bật ngay lập tức các điểm dị biệt, xu hướng và thành tích nổi bật theo thời gian thực.'
    },
    conceptExplanation: {
      en: `### 1. Built-in Preset Formatting Rules
- **Highlight Cells Rules**: Greater Than, Less Than, Between, Equal To, Text that Contains, A Date Occurring, Duplicate Values.
- **Top/Bottom Rules**: Top 10 Items, Top 10%, Bottom 10 Items, Above Average, Below Average.
- **Data Bars**: Mini horizontal bar charts directly inside cell backgrounds showing relative magnitudes.
- **Color Scales (Heatmaps)**: 2-color or 3-color gradients (e.g. Green-Yellow-Red) highlighting low-to-high performance ranges.
- **Icon Sets**: Traffic lights, arrows, flags, or checkmarks categorizing metrics into 3 to 5 statistical tiers.

### 2. Formula-Based Conditional Formatting
To highlight an **entire table row** based on the value in a single column:
1. Select the entire table data range: \`A2:E100\`
2. New Rule -> "Use a formula to determine which cells to format"
3. Enter formula with **Column-Locked Mixed Reference**:
   \`=$E2="Overdue"\` or \`=$D2<0\`
4. Choose Format fill (e.g. soft red fill) and click OK.

Why the \`$\` sign matters: \`$E2\` locks evaluation strictly to column E while allowing the row index to evaluate row-by-row for every row in the table!`,
      vi: `### 1. Các Quy Tắc Định Dạng Có Sẵn
- **Highlight Cells Rules**: Lớn hơn, Nhỏ hơn, Ở giữa, Bằng, Văn bản chứa, Ngày xuất hiện, Giá trị trùng lặp (Duplicate Values).
- **Top/Bottom Rules**: Top 10 giá trị, Top 10%, 10 giá trị thấp nhất, Trên trung bình, Dưới trung bình.
- **Data Bars**: Biểu đồ thanh mini trực tiếp trong nền ô thể hiện độ lớn tương đối.
- **Color Scales (Heatmap)**: Dải màu chuyển tiếp 2 hoặc 3 màu (ví dụ Xanh-Vàng-Đỏ) thể hiện mức độ từ thấp đến cao.
- **Icon Sets**: Đèn giao thông, mũi tên xu hướng, cờ hoặc dấu tích phân loại chỉ số thành 3 đến 5 nhóm.

### 2. Định Dạng Có Điều Kiện Bằng Công Thức Tùy Chỉnh
Để tô màu **toàn bộ hàng** dựa trên giá trị của một cột duy nhất:
1. Chọn toàn bộ vùng dữ liệu bảng: \`A2:E100\`
2. Chọn New Rule -> "Use a formula to determine which cells to format"
3. Nhập công thức với **Tham chiếu hỗn hợp khóa cột**:
   \`=$E2="Overdue"\` hoặc \`=$D2<0\`
4. Chọn định dạng màu nền (ví dụ đỏ nhạt) và nhấn OK.

Ý nghĩa dấu \`$\`: \`$E2\` khóa chặt việc kiểm tra điều kiện vào cột E trong khi cho phép chỉ số dòng tự động thay đổi từng hàng theo toàn bộ bảng!`
    },
    syntax: `# Entire Row Highlight Formula (locked column):
=$C2 > 1000000          -> Highlight rows with Revenue > $1M
=$E2 = "Critical"       -> Highlight critical status rows
=$D2 < TODAY()          -> Highlight past due milestone dates`,
    examples: [
      {
        title: { en: 'Highlighting Overdue Invoices across Entire Rows', vi: 'Tô Màu Toàn Bộ Dòng Các Hóa Đơn Quá Hạn' },
        code: `Data in A2:E50 (Col E has Status: "Paid", "Pending", "Overdue")

Applies to: =$A$2:$E$50
Formula: =$E2="Overdue"
Format: Light Red Fill with Dark Red Text`,
        description: {
          en: 'Because column E is locked ($E2), every cell in columns A through E on that row checks column E and gets highlighted.',
          vi: 'Vì cột E được khóa ($E2), mọi ô từ cột A đến E trên hàng đó đều kiểm tra giá trị ở cột E và được tô màu.'
        }
      },
      {
        title: { en: 'Spotting Duplicate Account Numbers', vi: 'Phát Hiện Trùng Lặp Số Tài Khoản' },
        code: `Account Numbers in A2:A500
Rule: Highlight Cells Rules -> Duplicate Values -> Red Fill`,
        description: {
          en: 'Instantly identifies data entry duplicates before saving or migrating customer databases.',
          vi: 'Phát hiện tức thì các bản ghi trùng lặp trước khi lưu hoặc chuyển đổi dữ liệu khách hàng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Forgetting the dollar sign in whole-row formatting (=E2="Overdue" instead of =$E2="Overdue"), causing only column E or shifted cells to highlight.',
          vi: 'Quên dấu đô la khi tô màu cả hàng (=E2="Overdue" thay vì =$E2="Overdue"), khiến chỉ có cột E hoặc các ô lệch vị trí được tô màu.'
        },
        correction: {
          en: 'Always lock the criteria column with a dollar sign: =$E2.',
          vi: 'Luôn khóa cột điều kiện bằng dấu đô la: =$E2.'
        }
      },
      {
        mistake: {
          en: 'Accumulating dozens of fragmented conditional formatting rules when copying and pasting cells repeatedly.',
          vi: 'Bị tích tụ hàng chục quy tắc định dạng trùng lặp phân mảnh khi sao chép và dán ô nhiều lần.'
        },
        correction: {
          en: 'Open Conditional Formatting -> Manage Rules regularly to audit and consolidate the "Applies to" ranges.',
          vi: 'Mở Conditional Formatting -> Manage Rules thường xuyên để kiểm tra và gộp gọn các vùng "Applies to".'
        }
      }
    ],
    tips: [
      { en: 'Stop If True: In the Manage Rules dialog, check "Stop If True" to prevent subsequent lower-priority rules from overriding an already matched format.', vi: 'Tính năng Stop If True: Trong hộp thoại Manage Rules, tích vào "Stop If True" để ngăn các quy tắc ưu tiên thấp hơn ghi đè lên định dạng đã thỏa mãn.' },
      { en: 'Data Bars Values Only: Check "Show Bar Only" in Data Bar rules to hide the numbers and show only pure visual progress bars inside cells.', vi: 'Chỉ hiện thanh Data Bars: Tích chọn "Show Bar Only" trong cài đặt Data Bar để ẩn các con số và chỉ hiển thị thanh tiến độ trực quan đẹp mắt.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l8_ex1',
      type: 'complete_code',
      title: { en: 'Construct Whole-Row Highlight Formula for Low Stock', vi: 'Xây Dựng Công Thức Tô Màu Cả Hàng Cho Hàng Tồn Thấp' },
      instruction: {
        en: 'Write the formula for a custom conditional formatting rule to highlight table rows where stock quantity in column D (starting row 2) is less than 10.',
        vi: 'Viết công thức cho quy tắc định dạng có điều kiện để tô màu các hàng trong bảng có số lượng tồn kho ở cột D (bắt đầu từ hàng 2) nhỏ hơn 10.'
      },
      starterCode: '=$D2',
      solutionCode: '=$D2<10',
      expectedOutput: '=$D2<10',
      hint: { en: 'Lock column D with $ and check < 10.', vi: 'Khóa cột D bằng dấu $ và kiểm tra điều kiện < 10.' },
      explanation: { en: 'The formula =$D2<10 locks column D while testing each row independently.', vi: 'Công thức =$D2<10 khóa cột D trong khi kiểm tra từng hàng một cách độc lập.' }
    },
    {
      id: 'excel_l8_ex2',
      type: 'complete_code',
      title: { en: 'Highlight Past Due Invoice Dates', vi: 'Tô Màu Hạn Hóa Đơn Đã Quá Hạn' },
      instruction: {
        en: 'Write the conditional formatting formula to identify if the due date in cell C2 is earlier than today\'s date (=TODAY()).',
        vi: 'Viết công thức định dạng có điều kiện để xác định xem ngày hạn ở ô C2 có sớm hơn ngày hôm nay (=TODAY()) hay không.'
      },
      starterCode: '=C2<',
      solutionCode: '=C2<TODAY()',
      expectedOutput: '=C2<TODAY()',
      hint: { en: 'Compare C2 with TODAY().', vi: 'So sánh C2 với TODAY().' },
      explanation: { en: '=C2<TODAY() returns TRUE for any date strictly prior to today, triggering the alert format.', vi: '=C2<TODAY() trả về TRUE cho bất kỳ ngày nào trước ngày hôm nay, kích hoạt định dạng cảnh báo.' }
    }
  ],
  challenge: {
    id: 'excel_l8_challenge',
    title: { en: 'Highlight VIP Enterprise Clients Across Data Grid', vi: 'Tô Màu Khách Hàng Doanh Nghiệp VIP Trên Toàn Bộ Lưới Dữ Liệu' },
    description: {
      en: 'Construct the conditional formatting formula to highlight all columns in a table row if the customer tier in column B (row 2) equals "VIP" AND annual spend in column C exceeds 50000.',
      vi: 'Xây dựng công thức định dạng có điều kiện để tô màu toàn bộ các cột trong một hàng nếu phân hạng khách hàng ở cột B (hàng 2) là "VIP" VÀ chi tiêu hàng năm ở cột C vượt quá 50000.'
    },
    requirements: [
      { en: 'Use the AND function', vi: 'Sử dụng hàm AND' },
      { en: 'Lock columns B and C with dollar signs: $B2 and $C2', vi: 'Khóa cột B và C bằng dấu đô la: $B2 và $C2' }
    ],
    starterCode: '=',
    solutionCode: '=AND($B2="VIP", $C2>50000)',
    hints: [
      { en: 'Combine conditions using: =AND($B2="VIP", $C2>50000)', vi: 'Kết hợp các điều kiện: =AND($B2="VIP", $C2>50000)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l8_q1',
      type: 'single_choice',
      question: {
        en: 'When creating a custom formula rule to highlight an entire table row, why must the column letter be preceded by a dollar sign (e.g. `=$C2>100`)?',
        vi: 'Khi tạo quy tắc công thức tùy chỉnh để tô màu toàn bộ hàng trong bảng, tại sao chữ cái cột phải có dấu đô la đứng trước (ví dụ `=$C2>100`)?'
      },
      options: [
        { en: 'To lock the evaluation to Column C for all columns in that row', vi: 'Để khóa việc kiểm tra điều kiện vào Cột C cho tất cả các cột trên hàng đó' },
        { en: 'Because conditional formatting only accepts currency values', vi: 'Vì định dạng có điều kiện chỉ chấp nhận các giá trị tiền tệ' },
        { en: 'To convert numbers to uppercase', vi: 'Để chuyển số thành chữ hoa' },
        { en: 'To protect the worksheet from editing', vi: 'Để bảo vệ trang tính không bị chỉnh sửa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The $ locks column C so that cells in columns A, B, C, D, and E all check the value in column C of their respective row.',
        vi: 'Dấu $ khóa cột C để các ô ở cột A, B, C, D và E đều kiểm tra giá trị ở cột C trên hàng tương ứng của chúng.'
      },
      difficulty: 'medium',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q2',
      type: 'single_choice',
      question: {
        en: 'Which conditional formatting feature places mini horizontal bar graphs inside cells to visualize numeric proportions?',
        vi: 'Tính năng định dạng có điều kiện nào đặt biểu đồ thanh ngang mini bên trong các ô để trực quan hóa tỷ lệ số?'
      },
      options: [
        { en: 'Data Bars', vi: 'Data Bars' },
        { en: 'Color Scales', vi: 'Color Scales' },
        { en: 'Icon Sets', vi: 'Icon Sets' },
        { en: 'Sparklines', vi: 'Sparklines' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Data Bars fill the cell background with a proportional colored bar corresponding to the cell\'s value relative to the range.',
        vi: 'Data Bars tô nền ô bằng một thanh màu tỷ lệ tương ứng với giá trị của ô so với toàn bộ vùng.'
      },
      difficulty: 'easy',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q3',
      type: 'single_choice',
      question: {
        en: 'Which rule type creates a continuous 3-color heatmap (e.g. Green for top, Yellow for middle, Red for bottom)?',
        vi: 'Loại quy tắc nào tạo bản đồ nhiệt chuyển sắc 3 màu liên tục (ví dụ Xanh lá cho cao nhất, Vàng cho trung bình, Đỏ cho thấp nhất)?'
      },
      options: [
        { en: 'Color Scales', vi: 'Color Scales' },
        { en: 'Data Bars', vi: 'Data Bars' },
        { en: 'Top/Bottom Rules', vi: 'Top/Bottom Rules' },
        { en: 'Highlight Cells Rules', vi: 'Highlight Cells Rules' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Color Scales generate a smooth gradient heatmap across a dataset based on minimum, midpoint (50th percentile), and maximum values.',
        vi: 'Color Scales tạo một bản đồ nhiệt dải màu mượt mà trên tập dữ liệu dựa trên giá trị nhỏ nhất, điểm giữa (phân vị 50) và giá trị lớn nhất.'
      },
      difficulty: 'easy',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q4',
      type: 'single_choice',
      question: {
        en: 'Where in Microsoft Excel can you view, edit, reorder, or delete all active formatting rules on a sheet?',
        vi: 'Ở đâu trong Microsoft Excel bạn có thể xem, chỉnh sửa, sắp xếp lại hoặc xóa tất cả các quy tắc định dạng đang hoạt động trên một trang tính?'
      },
      options: [
        { en: 'Conditional Formatting -> Manage Rules', vi: 'Conditional Formatting -> Manage Rules' },
        { en: 'Page Layout -> Page Setup', vi: 'Page Layout -> Page Setup' },
        { en: 'Data -> Data Validation', vi: 'Data -> Data Validation' },
        { en: 'Review -> Protect Sheet', vi: 'Review -> Protect Sheet' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Manage Rules opens the Rules Manager dialog where all rules can be inspected, prioritized, and edited.',
        vi: 'Manage Rules mở hộp thoại Quản lý Quy tắc nơi tất cả các quy tắc có thể được kiểm tra, đặt thứ tự ưu tiên và chỉnh sửa.'
      },
      difficulty: 'easy',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q5',
      type: 'single_choice',
      question: {
        en: 'What does checking the "Stop If True" option in the Conditional Formatting Rules Manager do?',
        vi: 'Tùy chọn "Stop If True" trong Trình quản lý quy tắc định dạng có điều kiện có tác dụng gì?'
      },
      options: [
        { en: 'Prevents any subsequent lower-priority rules from executing on a cell that matched the current rule', vi: 'Ngăn không cho bất kỳ quy tắc ưu tiên thấp hơn nào tiếp tục thực thi trên ô đã thỏa mãn quy tắc hiện tại' },
        { en: 'Stops Excel from recalculating formulas', vi: 'Dừng không cho Excel tính toán lại công thức' },
        { en: 'Deletes the cell if the condition is TRUE', vi: 'Xóa ô nếu điều kiện là TRUE' },
        { en: 'Displays a popup error message', vi: 'Hiển thị thông báo lỗi bật lên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '"Stop If True" halts rule processing for that specific cell as soon as a condition is satisfied, preventing conflicting formats.',
        vi: '"Stop If True" dừng xử lý các quy tắc tiếp theo cho ô đó ngay khi điều kiện được thỏa mãn, tránh xung đột định dạng.'
      },
      difficulty: 'medium',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q6',
      type: 'single_choice',
      question: {
        en: 'Which preset rule is used to quickly spot repeated customer IDs in a column?',
        vi: 'Quy tắc có sẵn nào được dùng để phát hiện nhanh mã khách hàng bị lặp lại trong một cột?'
      },
      options: [
        { en: 'Highlight Cells Rules -> Duplicate Values', vi: 'Highlight Cells Rules -> Duplicate Values' },
        { en: 'Top/Bottom Rules -> Bottom 10', vi: 'Top/Bottom Rules -> Bottom 10' },
        { en: 'Data Bars -> Solid Fill', vi: 'Data Bars -> Solid Fill' },
        { en: 'Icon Sets -> 3 Flags', vi: 'Icon Sets -> 3 Flags' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Duplicate Values automatically searches the selected range and flags any value that occurs more than once.',
        vi: 'Duplicate Values tự động quét vùng đã chọn và đánh dấu bất kỳ giá trị nào xuất hiện nhiều hơn một lần.'
      },
      difficulty: 'easy',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q7',
      type: 'true_false',
      question: {
        en: 'True or False: Conditional formatting rules will automatically update their visual display if a user edits cell values.',
        vi: 'Đúng hay Sai: Các quy tắc định dạng có điều kiện sẽ tự động cập nhật hiển thị trực quan nếu người dùng chỉnh sửa giá trị của ô.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Conditional formatting is dynamic and re-evaluates automatically whenever underlying spreadsheet data changes.',
        vi: 'Đúng. Định dạng có điều kiện có tính động và tự động tính toán lại bất cứ khi nào dữ liệu bảng tính thay đổi.'
      },
      difficulty: 'easy',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q8',
      type: 'single_choice',
      question: {
        en: 'What icon set style is commonly used to show upward, horizontal, and downward performance trends?',
        vi: 'Kiểu Icon Set nào thường được dùng để thể hiện xu hướng hiệu suất tăng lên, đi ngang và giảm xuống?'
      },
      options: [
        { en: 'Directional Arrows (Green Up, Yellow Side, Red Down)', vi: 'Mũi tên chỉ hướng (Xanh lên, Vàng ngang, Đỏ xuống)' },
        { en: 'Ratings Stars', vi: 'Ngôi sao đánh giá' },
        { en: 'Quarters Pies', vi: 'Biểu đồ tròn 4 phần' },
        { en: 'Checkmarks Only', vi: 'Chỉ dấu tích' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '3 Directional Arrows visually signal growth, steady-state, and decline across financial and operational KPI metrics.',
        vi: 'Bộ 3 Mũi tên chỉ hướng thể hiện trực quan sự tăng trưởng, ổn định và suy giảm trên các chỉ số KPI tài chính và vận hành.'
      },
      difficulty: 'easy',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q9',
      type: 'single_choice',
      question: {
        en: 'What happens if two conditional formatting rules apply to the same cell and both evaluate to TRUE?',
        vi: 'Điều gì xảy ra nếu hai quy tắc định dạng có điều kiện cùng áp dụng cho một ô và cả hai đều cho kết quả TRUE?'
      },
      options: [
        { en: 'The rule positioned higher in the Rules Manager list takes visual priority for conflicting properties (such as fill color)', vi: 'Quy tắc nằm ở vị trí cao hơn trong danh sách Quản lý Quy tắc sẽ được ưu tiên hiển thị đối với các thuộc tính xung đột (như màu nền)' },
        { en: 'Excel crashes with a fatal error', vi: 'Excel bị sập do lỗi nghiêm trọng' },
        { en: 'The cell turns black', vi: 'Ô chuyển sang màu đen' },
        { en: 'The lowest rule always wins', vi: 'Quy tắc thấp nhất luôn chiến thắng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Rules are evaluated in top-to-bottom order in the Rules Manager dialog; the higher rule takes precedence for any conflicting formatting attributes.',
        vi: 'Các quy tắc được đánh giá theo thứ tự từ trên xuống dưới trong hộp thoại Rules Manager; quy tắc cao hơn sẽ chiếm ưu thế đối với các thuộc tính định dạng xung đột.'
      },
      difficulty: 'medium',
      topicId: 'excel_formatting'
    },
    {
      id: 'excel_l8_q10',
      type: 'single_choice',
      question: {
        en: 'Which formula highlights cells in column B if the value is strictly above the average of range B2:B50?',
        vi: 'Công thức nào tô màu các ô trong cột B nếu giá trị lớn hơn trung bình cộng của vùng B2:B50?'
      },
      options: [
        { en: '=B2 > AVERAGE($B$2:$B$50)', vi: '=B2 > AVERAGE($B$2:$B$50)' },
        { en: '=B2 > AVERAGE(B2:B50)', vi: '=B2 > AVERAGE(B2:B50)' },
        { en: '=$B$2 > AVERAGE(B2)', vi: '=$B$2 > AVERAGE(B2)' },
        { en: '=AVERAGE($B$2:$B$50)', vi: '=AVERAGE($B$2:$B$50)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '=B2 > AVERAGE($B$2:$B$50) keeps the benchmark average range locked with absolute references ($B$2:$B$50) while comparing each cell B2 relatively.',
        vi: '=B2 > AVERAGE($B$2:$B$50) giữ cố định vùng tính trung bình chuẩn bằng tham chiếu tuyệt đối ($B$2:$B$50) trong khi so sánh tương đối từng ô B2.'
      },
      difficulty: 'medium',
      topicId: 'excel_formatting'
    }
  ]
};

saveLesson(basicMod02Dir, 'lesson08.ts', 'lesson08', lesson08);

// Create module index
const mod02IndexCode = `import { Lesson } from '../../../../types';
import { lesson05 } from './lesson05';
import { lesson06 } from './lesson06';
import { lesson07 } from './lesson07';
import { lesson08 } from './lesson08';

export { lesson05 } from './lesson05';
export { lesson06 } from './lesson06';
export { lesson07 } from './lesson07';
export { lesson08 } from './lesson08';

export const module02Lessons: Lesson[] = [
  lesson05,
  lesson06,
  lesson07,
  lesson08,
];

export default module02Lessons;
`;

fs.writeFileSync(path.join(basicMod02Dir, 'index.ts'), mod02IndexCode, 'utf8');

// Create Basic Level index
const basicLevelIndexCode = `import { Lesson } from '../../../types';
import { module01Lessons } from './module01';
import { module02Lessons } from './module02';

export * from './module01';
export * from './module02';

export const basicLessons: Lesson[] = [
  ...module01Lessons,
  ...module02Lessons,
];

export default basicLessons;
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/excel/basic/index.ts'), basicLevelIndexCode, 'utf8');
console.log('Basic Level generation completed (8 lessons).');
