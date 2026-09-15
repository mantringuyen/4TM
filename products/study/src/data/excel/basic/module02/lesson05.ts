import { Lesson } from '../../../../types';

export const lesson05: Lesson = {
  "id": "excel_lesson_5",
  "order": 5,
  "moduleId": "excel_mod_2",
  "courseId": "excel",
  "levelId": "basic",
  "topicId": "excel_text",
  "title": {
    "en": "Text Transformation & Data Sanitization: TRIM, CLEAN, PROPER, UPPER & LOWER",
    "vi": "Chuyển Đổi Văn Bản & Làm Sạch Dữ Liệu: TRIM, CLEAN, PROPER, UPPER & LOWER"
  },
  "summary": {
    "en": "Master automated data cleaning pipelines in Excel: strip invisible non-printable characters with CLEAN, eradicate irregular whitespace with TRIM, and enforce uniform typography casing with PROPER, UPPER, and LOWER.",
    "vi": "Làm chủ quy trình làm sạch dữ liệu tự động trong Excel: loại bỏ ký tự không in được bằng CLEAN, xóa khoảng trắng thừa bằng TRIM và chuẩn hóa kiểu chữ bằng PROPER, UPPER và LOWER."
  },
  "learn": {
    "introduction": {
      "en": "Real-world data imported from web scraping, CRM databases, or legacy ERP systems is notoriously messy: names have erratic capitalization (\"jOHN smITH\"), addresses contain invisible non-breaking spaces, and lookups fail due to accidental leading/trailing spaces. Text transformation functions sanitize raw imports into pristine analysis-ready datasets.",
      "vi": "Dữ liệu thực tế được nhập từ web, cơ sở dữ liệu CRM hoặc hệ thống ERP thường rất lộn xộn: tên bị viết hoa lộn xộn (\"jOHN smITH\"), địa chỉ chứa khoảng trắng không ngắt vô hình và các hàm tra cứu bị lỗi do khoảng trắng thừa ở đầu/cuối. Các hàm chuyển đổi văn bản giúp chuẩn hóa dữ liệu thô thành tập dữ liệu sạch sẵn sàng để phân tích."
    },
    "conceptExplanation": {
      "en": "### 1. The Core Text Sanitization Functions\n- **`=TRIM(text)`**: Removes all leading and trailing spaces from a text string, and replaces multiple internal spaces with a single space. Note: Does NOT remove non-breaking space character `CHAR(160)`.\n- **`=CLEAN(text)`**: Removes the first 32 non-printable ASCII characters (values 0 through 31, including line breaks `CHAR(10)` and tabs `CHAR(9)`) imported from external systems.\n- **`=PROPER(text)`**: Capitalizes the first letter of each word and converts all other letters to lowercase (Title Case), perfect for customer names.\n- **`=UPPER(text)`**: Converts all characters in a text string to uppercase (useful for standardizing state codes or SKU codes).\n- **`=LOWER(text)`**: Converts all characters in a text string to lowercase (ideal for standardizing email addresses).\n\n### 2. Enterprise Sanitization Pipeline\nCombine text functions by nesting them in a single formula:\n`=PROPER(TRIM(CLEAN(A2)))`\nThis single formula strips non-printable characters, cleans all erratic whitespace, and formats the name in proper Title Case!",
      "vi": "### 1. Các Hàm Làm Sạch Văn Bản Cốt Lõi\n- **`=TRIM(van_ban)`**: Xóa tất cả các khoảng trắng ở đầu và cuối chuỗi, đồng thời thay thế nhiều khoảng trắng liên tiếp ở giữa thành một khoảng trắng duy nhất. Lưu ý: Không xóa ký tự khoảng trắng không ngắt `CHAR(160)`.\n- **`=CLEAN(van_ban)`**: Xóa 32 ký tự ASCII không in được đầu tiên (từ 0 đến 31, bao gồm dấu xuống dòng `CHAR(10)` và dấu tab `CHAR(9)`) khi import từ hệ thống bên ngoài.\n- **`=PROPER(van_ban)`**: Viết hoa chữ cái đầu tiên của mỗi từ và chuyển các chữ cái khác thành chữ thường (Title Case), hoàn hảo để chuẩn hóa họ tên khách hàng.\n- **`=UPPER(van_ban)`**: Chuyển toàn bộ các ký tự trong chuỗi thành chữ in hoa (hữu ích cho mã vùng, mã SKU).\n- **`=LOWER(van_ban)`**: Chuyển toàn bộ các ký tự trong chuỗi thành chữ in thường (lý tưởng để chuẩn hóa địa chỉ email).\n\n### 2. Quy Trình Làm Sạch Dữ Liệu Doanh Nghiệp\nKết hợp các hàm văn bản bằng cách lồng ghép trong một công thức duy nhất:\n`=PROPER(TRIM(CLEAN(A2)))`\nCông thức duy nhất này loại bỏ các ký tự vô hình không in được, dọn sạch mọi khoảng trắng thừa và chuẩn hóa họ tên về dạng viết hoa đầu từ!"
    },
    "syntax": "# Syntax:\n=TRIM(text)\n=CLEAN(text)\n=PROPER(text)\n=UPPER(text)\n=LOWER(text)\n\n# Combined Enterprise Pipeline:\n=PROPER(TRIM(CLEAN(A2)))",
    "examples": [
      {
        "title": {
          "en": "Cleaning Customer Names Imported from CRM",
          "vi": "Làm Sạch Họ Tên Khách Hàng Từ CRM"
        },
        "code": "Raw Input in A2: \"   mARy   jAnE   \"\n\n=TRIM(A2)           -> \"mARy jAnE\"\n=PROPER(A2)         -> \"   Mary   Jane   \"\n=PROPER(TRIM(A2))   -> \"Mary Jane\" (Pristine Result)",
        "description": {
          "en": "Nesting PROPER inside TRIM removes both extra spaces and bad capitalization in a single step.",
          "vi": "Lồng PROPER bên trong TRIM loại bỏ cả khoảng trắng thừa lẫn lỗi viết hoa chỉ trong một bước."
        }
      },
      {
        "title": {
          "en": "Standardizing SKU and Email Columns",
          "vi": "Chuẩn Hóa Cột Mã SKU và Email"
        },
        "code": "SKU in A2: \"us-west-402a\"    -> Formula in B2: =UPPER(TRIM(A2)) -> \"US-WEST-402A\"\nEmail in A3: \"John.Doe@ACME.COM\" -> Formula in B3: =LOWER(TRIM(A3)) -> \"john.doe@acme.com\"",
        "description": {
          "en": "Standardizes database identifiers to ensure exact-match lookups and database merges succeed.",
          "vi": "Chuẩn hóa định danh cơ sở dữ liệu để đảm bảo các phép tra cứu chính xác và gộp bảng thành công."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Expecting TRIM to remove non-breaking spaces (ASCII 160) commonly copied from HTML web pages.",
          "vi": "Nghĩ rằng TRIM sẽ xóa được khoảng trắng không ngắt (ASCII 160) thường gặp khi copy từ trang web HTML."
        },
        "correction": {
          "en": "Replace non-breaking spaces first using =TRIM(SUBSTITUTE(A2, CHAR(160), \" \")).",
          "vi": "Thay thế khoảng trắng không ngắt trước bằng =TRIM(SUBSTITUTE(A2, CHAR(160), \" \"))."
        }
      },
      {
        "mistake": {
          "en": "Applying PROPER to acronyms or state codes (e.g. converting \"USA\" or \"IBM\" to \"Usa\" or \"Ibm\").",
          "vi": "Áp dụng PROPER cho từ viết tắt hoặc mã bang (ví dụ biến \"USA\" hoặc \"IBM\" thành \"Usa\" hoặc \"Ibm\")."
        },
        "correction": {
          "en": "Use UPPER for acronyms, ISO codes, and airport/state abbreviations.",
          "vi": "Sử dụng UPPER cho các từ viết tắt, mã ISO và mã sân bay/tiểu bang."
        }
      }
    ],
    "tips": [
      {
        "en": "Paste Values Shortcut: After cleaning a column with formulas, press Ctrl + C, then Alt + E + S + V (or Ctrl + Shift + V in modern Excel) to replace formulas with permanent cleaned static values.",
        "vi": "Phím tắt Paste Values: Sau khi làm sạch dữ liệu bằng công thức, nhấn Ctrl + C rồi Alt + E + S + V (hoặc Ctrl + Shift + V) để dán đè giá trị tĩnh vĩnh viễn."
      },
      {
        "en": "Flash Fill Alternative: Press Ctrl + E in an adjacent column to let Excel automatically detect and replicate text cleaning patterns.",
        "vi": "Tính năng Flash Fill: Nhấn Ctrl + E ở cột bên cạnh để Excel tự động nhận diện và sao chép mẫu làm sạch dữ liệu."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l5_ex1",
      "type": "complete_code",
      "title": {
        "en": "Sanitize Employee Full Name",
        "vi": "Chuẩn Hóa Họ Tên Nhân Viên"
      },
      "instruction": {
        "en": "Write a nested formula to clean extra spaces and convert the name in cell A2 to Title Case (Proper Case).",
        "vi": "Viết công thức lồng nhau để xóa khoảng trắng thừa và chuyển đổi họ tên ở ô A2 thành kiểu chữ in hoa đầu từ (Proper Case)."
      },
      "starterCode": "=PROPER(",
      "solutionCode": "=PROPER(TRIM(A2))",
      "expectedOutput": "=PROPER(TRIM(A2))",
      "hint": {
        "en": "Nest TRIM(A2) inside PROPER().",
        "vi": "Lồng hàm TRIM(A2) vào bên trong PROPER()."
      },
      "explanation": {
        "en": "=PROPER(TRIM(A2)) removes surplus spaces and capitalizes the first letter of each name.",
        "vi": "=PROPER(TRIM(A2)) loại bỏ khoảng trắng thừa và viết hoa chữ cái đầu tiên của mỗi từ."
      }
    },
    {
      "id": "excel_l5_ex2",
      "type": "complete_code",
      "title": {
        "en": "Standardize Customer Email to Lowercase",
        "vi": "Chuẩn Hóa Email Khách Hàng Thành Chữ Thường"
      },
      "instruction": {
        "en": "Write the formula to convert the email in cell C2 into clean, trimmed lowercase text.",
        "vi": "Viết công thức chuyển đổi email ở ô C2 thành văn bản chữ in thường đã xóa khoảng trắng thừa."
      },
      "starterCode": "=",
      "solutionCode": "=LOWER(TRIM(C2))",
      "expectedOutput": "=LOWER(TRIM(C2))",
      "hint": {
        "en": "Use LOWER and TRIM together on cell C2.",
        "vi": "Dùng hàm LOWER kết hợp TRIM cho ô C2."
      },
      "explanation": {
        "en": "Combining LOWER and TRIM guarantees standard lowercase email addresses without rogue spaces.",
        "vi": "Kết hợp LOWER và TRIM đảm bảo địa chỉ email chuẩn chữ thường không bị dính khoảng trắng lạ."
      }
    }
  ],
  "challenge": {
    "id": "excel_l5_challenge",
    "title": {
      "en": "Build Triple-Layer Text Cleaning Pipeline",
      "vi": "Xây Dựng Quy Trình Làm Sạch Văn Bản 3 Lớp"
    },
    "description": {
      "en": "Construct the enterprise formula for cell B2 that applies CLEAN to strip non-printable characters, TRIM to eliminate irregular spacing, and UPPER to standardize product SKU codes from cell A2.",
      "vi": "Xây dựng công thức doanh nghiệp cho ô B2 áp dụng CLEAN để xóa ký tự không in được, TRIM để loại bỏ khoảng trắng bất thường và UPPER để chuẩn hóa mã SKU sản phẩm từ ô A2."
    },
    "requirements": [
      {
        "en": "Apply CLEAN to cell A2",
        "vi": "Áp dụng CLEAN cho ô A2"
      },
      {
        "en": "Wrap with TRIM",
        "vi": "Bọc ngoài bằng TRIM"
      },
      {
        "en": "Wrap with UPPER",
        "vi": "Bọc ngoài cùng bằng UPPER"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=UPPER(TRIM(CLEAN(A2)))",
    "hints": [
      {
        "en": "Nest the functions: =UPPER(TRIM(CLEAN(A2)))",
        "vi": "Lồng các hàm: =UPPER(TRIM(CLEAN(A2)))"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l5_q1",
      "type": "single_choice",
      "question": {
        "en": "What does the `TRIM` function in Microsoft Excel do?",
        "vi": "Hàm `TRIM` trong Microsoft Excel làm nhiệm vụ gì?"
      },
      "options": [
        {
          "en": "Removes leading, trailing, and duplicate internal spaces, leaving single spaces between words",
          "vi": "Xóa khoảng trắng ở đầu, cuối và khoảng trắng trùng lặp ở giữa, chỉ để lại một khoảng trắng giữa các từ"
        },
        {
          "en": "Deletes all vowels from a string",
          "vi": "Xóa tất cả các nguyên âm trong chuỗi"
        },
        {
          "en": "Shortens a text string to 10 characters",
          "vi": "Rút ngắn chuỗi văn bản xuống 10 ký tự"
        },
        {
          "en": "Removes all punctuation marks",
          "vi": "Xóa tất cả các dấu câu"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "TRIM strips extra spaces at both ends and reduces any multiple consecutive spaces in the middle to a single space.",
        "vi": "TRIM loại bỏ khoảng trắng thừa ở cả hai đầu và rút gọn nhiều khoảng trắng liên tiếp ở giữa thành một khoảng trắng duy nhất."
      },
      "difficulty": "easy",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q2",
      "type": "single_choice",
      "question": {
        "en": "What is the output of `=PROPER(\"nGUYEN vAN aNH\")`?",
        "vi": "Kết quả của `=PROPER(\"nGUYEN vAN aNH\")` là gì?"
      },
      "options": [
        {
          "en": "\"Nguyen Van Anh\"",
          "vi": "\"Nguyen Van Anh\""
        },
        {
          "en": "\"NGUYEN VAN ANH\"",
          "vi": "\"NGUYEN VAN ANH\""
        },
        {
          "en": "\"nguyen van anh\"",
          "vi": "\"nguyen van anh\""
        },
        {
          "en": "\"Nguyen van anh\"",
          "vi": "\"Nguyen van anh\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "PROPER capitalizes the first letter of every word and turns all remaining letters into lowercase.",
        "vi": "PROPER viết hoa chữ cái đầu tiên của mọi từ và chuyển tất cả các chữ cái còn lại thành chữ thường."
      },
      "difficulty": "easy",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q3",
      "type": "single_choice",
      "question": {
        "en": "What type of characters does the `CLEAN` function remove from text?",
        "vi": "Hàm `CLEAN` loại bỏ loại ký tự nào khỏi văn bản?"
      },
      "options": [
        {
          "en": "The first 32 non-printable ASCII control characters (values 0-31)",
          "vi": "32 ký tự điều khiển ASCII không in được đầu tiên (giá trị 0-31)"
        },
        {
          "en": "All numbers and punctuation",
          "vi": "Tất cả các số và dấu câu"
        },
        {
          "en": "All spaces",
          "vi": "Tất cả các khoảng trắng"
        },
        {
          "en": "HTML tags only",
          "vi": "Chỉ các thẻ HTML"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CLEAN removes low-level ASCII control characters (0-31) such as line feeds (CHAR 10) and tabs (CHAR 9).",
        "vi": "CLEAN loại bỏ các ký tự điều khiển ASCII cấp thấp (0-31) như dấu xuống dòng (CHAR 10) và dấu tab (CHAR 9)."
      },
      "difficulty": "medium",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q4",
      "type": "single_choice",
      "question": {
        "en": "Why might a VLOOKUP formula return `#N/A` even when two cells appear visually identical to the naked eye?",
        "vi": "Tại sao công thức VLOOKUP lại trả về `#N/A` ngay cả khi hai ô nhìn bằng mắt thường có vẻ hoàn toàn giống hệt nhau?"
      },
      "options": [
        {
          "en": "One cell has hidden leading or trailing whitespace characters",
          "vi": "Một ô có chứa ký tự khoảng trắng ẩn ở đầu hoặc cuối"
        },
        {
          "en": "The font colors are different",
          "vi": "Màu phông chữ khác nhau"
        },
        {
          "en": "One cell is formatted in bold",
          "vi": "Một ô được định dạng in đậm"
        },
        {
          "en": "The sheet is saved in Excel 2016",
          "vi": "Trang tính được lưu trong Excel 2016"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Invisible spaces (e.g. \"Apple \" vs \"Apple\") prevent exact-match lookups from matching. Using TRIM fixes this issue.",
        "vi": "Các khoảng trắng vô hình (ví dụ \"Apple \" vs \"Apple\") ngăn không cho phép tra cứu khớp chính xác. Dùng TRIM sẽ khắc phục được lỗi này."
      },
      "difficulty": "medium",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q5",
      "type": "single_choice",
      "question": {
        "en": "What function converts the string \"united states\" into \"UNITED STATES\"?",
        "vi": "Hàm nào chuyển đổi chuỗi \"united states\" thành \"UNITED STATES\"?"
      },
      "options": [
        {
          "en": "UPPER",
          "vi": "UPPER"
        },
        {
          "en": "CAPITALIZE",
          "vi": "CAPITALIZE"
        },
        {
          "en": "BIG",
          "vi": "BIG"
        },
        {
          "en": "PROPER",
          "vi": "PROPER"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "UPPER converts all lowercase letters in a text string to uppercase.",
        "vi": "Hàm UPPER chuyển đổi tất cả các chữ cái thường trong chuỗi thành chữ hoa."
      },
      "difficulty": "easy",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q6",
      "type": "single_choice",
      "question": {
        "en": "What is the Excel shortcut for Flash Fill, which automatically applies recognized text transformations?",
        "vi": "Phím tắt trong Excel cho tính năng Flash Fill (tự động áp dụng các mẫu chuyển đổi văn bản nhận diện được) là gì?"
      },
      "options": [
        {
          "en": "Ctrl + E",
          "vi": "Ctrl + E"
        },
        {
          "en": "Ctrl + F",
          "vi": "Ctrl + F"
        },
        {
          "en": "Ctrl + Shift + F",
          "vi": "Ctrl + Shift + F"
        },
        {
          "en": "Alt + F8",
          "vi": "Alt + F8"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Ctrl + E triggers Flash Fill, instantly filling down data based on pattern examples you type.",
        "vi": "Ctrl + E kích hoạt Flash Fill, tự động điền dữ liệu dựa trên mẫu ví dụ bạn vừa gõ."
      },
      "difficulty": "medium",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q7",
      "type": "single_choice",
      "question": {
        "en": "What does `=LOWER(\"Sales-Dept-2026\")` return?",
        "vi": "Công thức `=LOWER(\"Sales-Dept-2026\")` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "\"sales-dept-2026\"",
          "vi": "\"sales-dept-2026\""
        },
        {
          "en": "\"sales dept 2026\"",
          "vi": "\"sales dept 2026\""
        },
        {
          "en": "\"Sales-dept-2026\"",
          "vi": "\"Sales-dept-2026\""
        },
        {
          "en": "#VALUE!",
          "vi": "#VALUE!"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "LOWER converts uppercase alphabetic characters to lowercase, while leaving hyphens and numbers unchanged.",
        "vi": "LOWER chuyển các chữ cái hoa thành chữ thường, giữ nguyên dấu gạch nối và các con số."
      },
      "difficulty": "easy",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q8",
      "type": "true_false",
      "question": {
        "en": "True or False: The `TRIM` function in Excel removes ALL spaces between words, joining them into a single continuous word.",
        "vi": "Đúng hay Sai: Hàm `TRIM` trong Excel xóa TẤT CẢ các khoảng trắng giữa các từ, ghép chúng lại thành một từ liền mạch duy nhất."
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
        1
      ],
      "explanation": {
        "en": "False. TRIM preserves a single standard space between words; it only removes extra/duplicate spaces.",
        "vi": "Sai. Hàm TRIM giữ lại đúng một khoảng trắng chuẩn giữa các từ; nó chỉ loại bỏ khoảng trắng thừa/trùng lặp."
      },
      "difficulty": "easy",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q9",
      "type": "single_choice",
      "question": {
        "en": "What function can be combined with TRIM to eliminate non-breaking space characters (`CHAR(160)`) imported from web pages?",
        "vi": "Hàm nào có thể kết hợp với TRIM để loại bỏ các ký tự khoảng trắng không ngắt (`CHAR(160)`) được import từ trang web?"
      },
      "options": [
        {
          "en": "SUBSTITUTE",
          "vi": "SUBSTITUTE"
        },
        {
          "en": "REPLACE",
          "vi": "REPLACE"
        },
        {
          "en": "FIND",
          "vi": "FIND"
        },
        {
          "en": "EXACT",
          "vi": "EXACT"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "=TRIM(SUBSTITUTE(A1, CHAR(160), \" \")) replaces non-breaking web spaces with regular spaces so TRIM can clean them.",
        "vi": "=TRIM(SUBSTITUTE(A1, CHAR(160), \" \")) thay thế khoảng trắng web không ngắt thành khoảng trắng thường để TRIM dọn sạch."
      },
      "difficulty": "hard",
      "topicId": "excel_text"
    },
    {
      "id": "excel_l5_q10",
      "type": "single_choice",
      "question": {
        "en": "Which formula converts the company name in A2 to proper title casing while stripping both line breaks and leading spaces?",
        "vi": "Công thức nào chuyển đổi tên công ty ở A2 sang kiểu viết hoa đầu từ đồng thời xóa cả dấu xuống dòng và khoảng trắng ở đầu?"
      },
      "options": [
        {
          "en": "=PROPER(TRIM(CLEAN(A2)))",
          "vi": "=PROPER(TRIM(CLEAN(A2)))"
        },
        {
          "en": "=CLEAN(PROPER(A2))",
          "vi": "=CLEAN(PROPER(A2))"
        },
        {
          "en": "=UPPER(LOWER(A2))",
          "vi": "=UPPER(LOWER(A2))"
        },
        {
          "en": "=TRIM(TEXT(A2))",
          "vi": "=TRIM(TEXT(A2))"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "=PROPER(TRIM(CLEAN(A2))) executes CLEAN first (removes line breaks), TRIM second (removes spaces), and PROPER last (capitalizes words).",
        "vi": "=PROPER(TRIM(CLEAN(A2))) thực hiện CLEAN trước (xóa xuống dòng), TRIM thứ hai (xóa khoảng trắng) và PROPER cuối cùng (viết hoa chữ cái đầu)."
      },
      "difficulty": "medium",
      "topicId": "excel_text"
    }
  ]
};
export default lesson05;
