import { Lesson } from '../../../../types';

export const lesson06: Lesson = {
  "id": "excel_lesson_6",
  "order": 6,
  "moduleId": "excel_mod_2",
  "courseId": "excel",
  "levelId": "basic",
  "topicId": "excel_text_extract",
  "title": {
    "en": "Text Extraction & Concatenation: LEFT, RIGHT, MID, LEN, CONCAT & TEXTJOIN",
    "vi": "Trích Xuất & Nối Chuỗi Văn Bản: LEFT, RIGHT, MID, LEN, CONCAT & TEXTJOIN"
  },
  "summary": {
    "en": "Master character-level string dissection with LEFT, RIGHT, MID, and dynamic delimiter locating with LEN and FIND. Merge text seamlessly using the modern TEXTJOIN and CONCAT functions with custom delimiters.",
    "vi": "Làm chủ kỹ thuật bóc tách chuỗi ở cấp độ ký tự với LEFT, RIGHT, MID và định vị dấu phân cách động với LEN và FIND. Ghép nối chuỗi liền mạch bằng các hàm hiện đại TEXTJOIN và CONCAT kèm dấu phân cách tùy chỉnh."
  },
  "learn": {
    "introduction": {
      "en": "Real-world business data frequently bundles multiple pieces of information into a single code string (e.g. SKU \"US-CHI-9842-EXP\"). Text extraction formulas allow analysts to isolate country codes, warehouse regions, and numeric serials effortlessly, while concatenation builds clean composite keys and standardized labels.",
      "vi": "Dữ liệu kinh doanh thực tế thường gộp nhiều phần thông tin vào một chuỗi mã duy nhất (ví dụ mã SKU \"US-CHI-9842-EXP\"). Các công thức trích xuất văn bản cho phép nhà phân tích tách biệt mã quốc gia, khu vực kho bãi và số sê-ri một cách dễ dàng, trong khi phép nối chuỗi giúp tạo khóa kết hợp và nhãn chuẩn hóa."
    },
    "conceptExplanation": {
      "en": "### 1. Substring Extraction Functions\n- **`=LEFT(text, [num_chars])`**: Extracts characters from the far left of a string. Default is 1 character if omitted.\n- **`=RIGHT(text, [num_chars])`**: Extracts characters from the far right end of a string.\n- **`=MID(text, start_num, num_chars)`**: Extracts a substring starting from position `start_num` for `num_chars` length.\n- **`=LEN(text)`**: Returns the total character count (including spaces and punctuation).\n- **`=FIND(find_text, within_text, [start_num])`**: Returns the 1-based character position of a delimiter (Case-sensitive).\n- **`=SEARCH(find_text, within_text, [start_num])`**: Case-insensitive version of FIND, supports wildcards (*, ?).\n\n### 2. Modern Concatenation Functions\n- **`=TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)`**: The modern gold standard for merging cells or entire ranges (e.g. `A2:E2`) separated by a specified delimiter (e.g. `\", \"`), with automatic skipping of blank cells.\n- **`=CONCAT(text1, [text2], ...)`**: Merges text arguments or continuous cell ranges without delimiters. Replaces legacy `CONCATENATE`.\n- **Ampersand Operator (`&`)**: Fast formula shorthand: `=A2 & \" \" & B2`.",
      "vi": "### 1. Các Hàm Trích Xuất Chuỗi Con\n- **`=LEFT(van_ban, [so_ky_tu])`**: Trích xuất các ký tự từ phía tận cùng bên trái của chuỗi. Mặc định là 1 ký tự nếu bỏ qua.\n- **`=RIGHT(van_ban, [so_ky_tu])`**: Trích xuất các ký tự từ phía tận cùng bên phải của chuỗi.\n- **`=MID(van_ban, vi_tri_bat_dau, so_ky_tu)`**: Trích xuất chuỗi con bắt đầu từ vị trí `vi_tri_bat_dau` với độ dài `so_ky_tu`.\n- **`=LEN(van_ban)`**: Trả về tổng số lượng ký tự (bao gồm cả khoảng trắng và dấu câu).\n- **`=FIND(ky_tu_tim, trong_chuoi, [vi_tri_dau])`**: Trả về vị trí xuất hiện đầu tiên của ký tự tìm kiếm (Phân biệt chữ hoa/chữ thường).\n- **`=SEARCH(ky_tu_tim, trong_chuoi, [vi_tri_dau])`**: Tương tự FIND nhưng không phân biệt chữ hoa/thường và hỗ trợ ký tự đại diện (*, ?).\n\n### 2. Các Hàm Ghép Nối Chuỗi Hiện Đại\n- **`=TEXTJOIN(dau_phan_cach, bo_qua_o_trong, van_ban1, [van_ban2], ...)`**: Tiêu chuẩn vàng hiện đại để nối các ô hoặc toàn bộ dải ô (ví dụ `A2:E2`) ngăn cách bởi dấu phân cách tùy chọn (ví dụ `\", \"`), tự động bỏ qua các ô trống.\n- **`=CONCAT(van_ban1, [van_ban2], ...)`**: Ghép các đối số văn bản hoặc toàn bộ vùng ô liên tục mà không cần dấu phân cách. Thay thế hàm cũ `CONCATENATE`.\n- **Toán tử Và (`&`)**: Cú pháp nối nhanh: `=A2 & \" \" & B2`."
    },
    "syntax": "# Extraction:\n=LEFT(text, num_chars)\n=RIGHT(text, num_chars)\n=MID(text, start_num, num_chars)\n=LEN(text)\n=FIND(find_text, within_text)\n\n# Merging:\n=TEXTJOIN(delimiter, ignore_empty, text1, ...)\n=CONCAT(text1, ...)\n=A2 & \" - \" & B2",
    "examples": [
      {
        "title": {
          "en": "Dynamic First & Last Name Splitting",
          "vi": "Tách Động Họ & Tên Riêng"
        },
        "code": "Full Name in A2: \"Alexander Hamilton\"\n\nFormula for First Name: =LEFT(A2, FIND(\" \", A2) - 1)  -> \"Alexander\"\nFormula for Last Name:  =RIGHT(A2, LEN(A2) - FIND(\" \", A2)) -> \"Hamilton\"",
        "description": {
          "en": "Using FIND to locate the space allows dynamic splitting regardless of how long the first name is.",
          "vi": "Dùng FIND để xác định vị trí dấu cách cho phép tách tên động bất kể họ tên dài bao nhiêu ký tự."
        }
      },
      {
        "title": {
          "en": "Combining Address Columns with TEXTJOIN",
          "vi": "Gộp Các Cột Địa Chỉ Bằng TEXTJOIN"
        },
        "code": "Street in A2: \"123 Main St\"\nSuite in B2: (blank)\nCity in C2: \"Chicago\"\nState in D2: \"IL\"\n\nFormula in E2: =TEXTJOIN(\", \", TRUE, A2:D2)\nResult: \"123 Main St, Chicago, IL\" (Automatically ignores empty Suite cell!)",
        "description": {
          "en": "TEXTJOIN with TRUE cleanly skips blank cells, preventing awkward double commas like \", ,\".",
          "vi": "TEXTJOIN với tham số TRUE tự động bỏ qua các ô rỗng, ngăn ngừa việc bị dính dấu phẩy kép thừa như \", ,\"."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forgetting that MID requires a 1-based starting position index (1 is the first character).",
          "vi": "Quên rằng MID yêu cầu vị trí bắt đầu tính từ 1 (1 là ký tự đầu tiên)."
        },
        "correction": {
          "en": "Pass start_num as 1 (not 0) when extracting from the beginning.",
          "vi": "Truyền vi_tri_bat_dau là 1 (không phải 0) khi trích xuất từ đầu chuỗi."
        }
      },
      {
        "mistake": {
          "en": "Using legacy CONCATENATE(A2:E2) which fails to accept ranges as arguments.",
          "vi": "Dùng hàm cũ CONCATENATE(A2:E2) vốn không hỗ trợ truyền dải ô làm tham số."
        },
        "correction": {
          "en": "Use modern TEXTJOIN or CONCAT which accept full array ranges natively.",
          "vi": "Sử dụng TEXTJOIN hoặc CONCAT hiện đại vốn hỗ trợ trực tiếp dải ô nguyên bản."
        }
      }
    ],
    "tips": [
      {
        "en": "TEXTJOIN Range Superpower: You can pass an entire row range like =TEXTJOIN(\"; \", TRUE, B2:G2) to combine multiple tags into a single cell.",
        "vi": "Sức mạnh dải ô của TEXTJOIN: Bạn có thể truyền toàn bộ dải ô hàng như =TEXTJOIN(\"; \", TRUE, B2:G2) để gộp nhiều nhãn thẻ vào một ô duy nhất."
      },
      {
        "en": "Extract Number from Text: Use VALUE(MID(...)) if you need the extracted substring converted into a real calculable number.",
        "vi": "Chuyển chuỗi trích xuất thành số: Dùng VALUE(MID(...)) nếu cần chuỗi con vừa trích xuất trở thành một con số thực sự có thể tính toán."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l6_ex1",
      "type": "complete_code",
      "title": {
        "en": "Extract Country Prefix from SKU",
        "vi": "Trích Xuất Mã Quốc Gia Từ SKU"
      },
      "instruction": {
        "en": "Write the formula to extract the first 2 characters from the SKU code in cell A2 (e.g. \"US-9821\").",
        "vi": "Viết công thức trích xuất 2 ký tự đầu tiên từ mã SKU ở ô A2 (ví dụ \"US-9821\")."
      },
      "starterCode": "=LEFT(",
      "solutionCode": "=LEFT(A2, 2)",
      "expectedOutput": "=LEFT(A2, 2)",
      "hint": {
        "en": "Use LEFT with cell A2 and length 2.",
        "vi": "Dùng hàm LEFT với ô A2 và độ dài là 2."
      },
      "explanation": {
        "en": "=LEFT(A2, 2) extracts the two leftmost characters from cell A2.",
        "vi": "=LEFT(A2, 2) trích xuất 2 ký tự ngoài cùng bên trái từ ô A2."
      }
    },
    {
      "id": "excel_l6_ex2",
      "type": "complete_code",
      "title": {
        "en": "Join Full Address with Hyphen Separator",
        "vi": "Nối Địa Chỉ Đầy Đủ Bằng Dấu Gạch Nối"
      },
      "instruction": {
        "en": "Write a formula using TEXTJOIN to merge cells A2, B2, and C2 separated by \" - \", skipping empty cells.",
        "vi": "Viết công thức dùng TEXTJOIN để gộp các ô A2, B2 và C2 ngăn cách bằng \" - \", bỏ qua các ô trống."
      },
      "starterCode": "=TEXTJOIN(\" - \", TRUE, ",
      "solutionCode": "=TEXTJOIN(\" - \", TRUE, A2:C2)",
      "expectedOutput": "=TEXTJOIN(\" - \", TRUE, A2:C2)",
      "hint": {
        "en": "Pass range A2:C2 as the text argument.",
        "vi": "Truyền dải ô A2:C2 vào làm đối số văn bản."
      },
      "explanation": {
        "en": "=TEXTJOIN(\" - \", TRUE, A2:C2) joins all non-empty values in range A2:C2 with a hyphen separator.",
        "vi": "=TEXTJOIN(\" - \", TRUE, A2:C2) nối tất cả các giá trị không trống trong vùng A2:C2 bằng dấu gạch nối."
      }
    }
  ],
  "challenge": {
    "id": "excel_l6_challenge",
    "title": {
      "en": "Parse Warehouse Code from Composite Serial String",
      "vi": "Tách Mã Nhà Kho Từ Chuỗi Sê-ri Kết Hợp"
    },
    "description": {
      "en": "In serial code \"INV-W42-9908\" in cell A2, extract the 3-character warehouse code (\"W42\") starting at character position 5.",
      "vi": "Từ mã sê-ri \"INV-W42-9908\" ở ô A2, hãy trích xuất mã nhà kho gồm 3 ký tự (\"W42\") bắt đầu từ vị trí ký tự thứ 5."
    },
    "requirements": [
      {
        "en": "Use the MID function",
        "vi": "Sử dụng hàm MID"
      },
      {
        "en": "Specify starting position 5 and length 3",
        "vi": "Chỉ định vị trí bắt đầu là 5 và độ dài là 3"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=MID(A2, 5, 3)",
    "hints": [
      {
        "en": "Formula syntax: =MID(A2, 5, 3)",
        "vi": "Cú pháp công thức: =MID(A2, 5, 3)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l6_q1",
      "type": "single_choice",
      "question": {
        "en": "What does `=RIGHT(\"EXCEL2026\", 4)` return?",
        "vi": "Công thức `=RIGHT(\"EXCEL2026\", 4)` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "\"2026\"",
          "vi": "\"2026\""
        },
        {
          "en": "\"EXCE\"",
          "vi": "\"EXCE\""
        },
        {
          "en": "\"L202\"",
          "vi": "\"L202\""
        },
        {
          "en": "2026 (numeric)",
          "vi": "2026 (số)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "RIGHT extracts the 4 rightmost characters, returning the text string \"2026\".",
        "vi": "Hàm RIGHT trích xuất 4 ký tự ngoài cùng bên phải, trả về chuỗi văn bản \"2026\"."
      },
      "difficulty": "easy",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q2",
      "type": "single_choice",
      "question": {
        "en": "In the formula `=MID(\"PRODUCT-994\", 9, 3)`, what is the returned string?",
        "vi": "Trong công thức `=MID(\"PRODUCT-994\", 9, 3)`, chuỗi được trả về là gì?"
      },
      "options": [
        {
          "en": "\"994\"",
          "vi": "\"994\""
        },
        {
          "en": "\"-99\"",
          "vi": "\"-99\""
        },
        {
          "en": "\"PRODUCT\"",
          "vi": "\"PRODUCT\""
        },
        {
          "en": "\"T-9\"",
          "vi": "\"T-9\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Character 9 is \"9\", and taking 3 characters returns \"994\".",
        "vi": "Ký tự thứ 9 là \"9\", và lấy 3 ký tự sẽ trả về \"994\"."
      },
      "difficulty": "medium",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q3",
      "type": "single_choice",
      "question": {
        "en": "What is the key advantage of `TEXTJOIN` over `CONCAT` or the `&` operator?",
        "vi": "Ưu điểm chính của `TEXTJOIN` so với `CONCAT` hoặc toán tử `&` là gì?"
      },
      "options": [
        {
          "en": "It automatically inserts a delimiter and can ignore empty cells across ranges",
          "vi": "Nó tự động chèn dấu phân cách và có thể bỏ qua các ô trống trên toàn bộ dải ô"
        },
        {
          "en": "It only works with numbers",
          "vi": "Nó chỉ hoạt động với các số"
        },
        {
          "en": "It converts text to uppercase",
          "vi": "Nó chuyển văn bản thành chữ hoa"
        },
        {
          "en": "It encrypts the output text",
          "vi": "Nó mã hóa văn bản đầu ra"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "TEXTJOIN allows specifying a universal delimiter and setting ignore_empty to TRUE to skip blank cells effortlessly.",
        "vi": "TEXTJOIN cho phép chỉ định dấu phân cách chung và đặt ignore_empty thành TRUE để bỏ qua các ô trống dễ dàng."
      },
      "difficulty": "easy",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q4",
      "type": "single_choice",
      "question": {
        "en": "What does `=LEN(\"Data Analysis\")` return?",
        "vi": "Công thức `=LEN(\"Data Analysis\")` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "13 (including the space character)",
          "vi": "13 (bao gồm cả ký tự khoảng trắng)"
        },
        {
          "en": "12 (letters only)",
          "vi": "12 (chỉ tính chữ cái)"
        },
        {
          "en": "2 (word count)",
          "vi": "2 (số lượng từ)"
        },
        {
          "en": "14",
          "vi": "14"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "\"Data\" (4) + space (1) + \"Analysis\" (8) = 13 total characters.",
        "vi": "\"Data\" (4) + khoảng trắng (1) + \"Analysis\" (8) = tổng cộng 13 ký tự."
      },
      "difficulty": "easy",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q5",
      "type": "single_choice",
      "question": {
        "en": "What is the main difference between `FIND` and `SEARCH` in Excel?",
        "vi": "Sự khác biệt chính giữa hàm `FIND` và `SEARCH` trong Excel là gì?"
      },
      "options": [
        {
          "en": "FIND is case-sensitive; SEARCH is case-insensitive and supports wildcards",
          "vi": "FIND phân biệt chữ hoa/thường; SEARCH không phân biệt chữ hoa/thường và hỗ trợ ký tự đại diện"
        },
        {
          "en": "FIND searches from right to left; SEARCH searches left to right",
          "vi": "FIND tìm từ phải sang trái; SEARCH tìm từ trái sang phải"
        },
        {
          "en": "FIND only searches numbers; SEARCH searches text",
          "vi": "FIND chỉ tìm số; SEARCH tìm văn bản"
        },
        {
          "en": "There is no difference",
          "vi": "Không có sự khác biệt nào"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "FIND is strictly case-sensitive, whereas SEARCH ignores casing and allows wildcard matching (* and ?).",
        "vi": "FIND phân biệt nghiêm ngặt chữ hoa/chữ thường, trong khi SEARCH bỏ qua chữ hoa/thường và cho phép dùng ký tự đại diện (* và ?)."
      },
      "difficulty": "medium",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q6",
      "type": "single_choice",
      "question": {
        "en": "What does the formula `=\"Item: \" & A1 & \" (\" & B1 & \")\"` do?",
        "vi": "Công thức `=\"Item: \" & A1 & \" (\" & B1 & \")\"` làm nhiệm vụ gì?"
      },
      "options": [
        {
          "en": "Concatenates literal strings with the contents of cells A1 and B1",
          "vi": "Ghép các chuỗi ký tự cố định với nội dung của các ô A1 và B1"
        },
        {
          "en": "Calculates the sum of A1 and B1",
          "vi": "Tính tổng của A1 và B1"
        },
        {
          "en": "Formats cell A1 as a date",
          "vi": "Định dạng ô A1 thành ngày tháng"
        },
        {
          "en": "Checks if A1 equals B1",
          "vi": "Kiểm tra xem A1 có bằng B1 không"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The ampersand (&) operator chains text strings and cell references together.",
        "vi": "Toán tử và (&) liên kết các chuỗi văn bản và các ô tham chiếu lại với nhau."
      },
      "difficulty": "easy",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q7",
      "type": "single_choice",
      "question": {
        "en": "What is the output of `=LEFT(\"Report\", 1)`?",
        "vi": "Kết quả của `=LEFT(\"Report\", 1)` là gì?"
      },
      "options": [
        {
          "en": "\"R\"",
          "vi": "\"R\""
        },
        {
          "en": "\"Report\"",
          "vi": "\"Report\""
        },
        {
          "en": "\"t\"",
          "vi": "\"t\""
        },
        {
          "en": "1",
          "vi": "1"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "LEFT with num_chars = 1 extracts the very first character on the left, \"R\".",
        "vi": "Hàm LEFT với số ký tự là 1 sẽ trích xuất đúng ký tự đầu tiên bên trái là \"R\"."
      },
      "difficulty": "easy",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q8",
      "type": "single_choice",
      "question": {
        "en": "What does `=TEXTJOIN(\"/\", TRUE, \"2026\", \"\", \"08\", \"29\")` produce?",
        "vi": "Công thức `=TEXTJOIN(\"/\", TRUE, \"2026\", \"\", \"08\", \"29\")` tạo ra kết quả gì?"
      },
      "options": [
        {
          "en": "\"2026/08/29\"",
          "vi": "\"2026/08/29\""
        },
        {
          "en": "\"2026//08/29\"",
          "vi": "\"2026//08/29\""
        },
        {
          "en": "\"2026 08 29\"",
          "vi": "\"2026 08 29\""
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
        "en": "Because ignore_empty is TRUE, the blank second argument is skipped, resulting in \"2026/08/29\".",
        "vi": "Vì tham số ignore_empty là TRUE, đối số thứ hai rỗng bị bỏ qua, tạo ra kết quả \"2026/08/29\"."
      },
      "difficulty": "medium",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q9",
      "type": "true_false",
      "question": {
        "en": "True or False: Results extracted with `LEFT`, `RIGHT`, or `MID` are always returned as text data types, even if the characters extracted are all digits.",
        "vi": "Đúng hay Sai: Kết quả được trích xuất bằng các hàm `LEFT`, `RIGHT` hoặc `MID` luôn được trả về dưới dạng kiểu dữ liệu văn bản (Text), ngay cả khi các ký tự trích xuất toàn là chữ số."
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
        "en": "True. Text functions return text strings. To use the extracted digits in math, wrap them with VALUE() or perform arithmetic (*1 or +0).",
        "vi": "Đúng. Các hàm văn bản luôn trả về chuỗi. Để sử dụng các chữ số trích xuất trong toán học, hãy bọc chúng bằng VALUE() hoặc thực hiện phép tính số học (*1 hoặc +0)."
      },
      "difficulty": "medium",
      "topicId": "excel_text_extract"
    },
    {
      "id": "excel_l6_q10",
      "type": "single_choice",
      "question": {
        "en": "If cell A1 contains \"Department_Sales\", what does `=FIND(\"_\", A1)` return?",
        "vi": "Nếu ô A1 chứa chuỗi \"Department_Sales\", công thức `=FIND(\"_\", A1)` trả về giá trị nào?"
      },
      "options": [
        {
          "en": "11",
          "vi": "11"
        },
        {
          "en": "10",
          "vi": "10"
        },
        {
          "en": "1",
          "vi": "1"
        },
        {
          "en": "\"_\"",
          "vi": "\"_\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "\"Department\" has 10 characters, so the underscore \"_\" is located at position 11.",
        "vi": "\"Department\" có 10 ký tự, do đó dấu gạch dưới \"_\" nằm ở vị trí số 11."
      },
      "difficulty": "easy",
      "topicId": "excel_text_extract"
    }
  ]
};
export default lesson06;
