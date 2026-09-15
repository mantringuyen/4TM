import { Lesson } from '../../../../types';

export const lesson10: Lesson = {
  "id": "excel_lesson_10",
  "order": 10,
  "moduleId": "excel_mod_3",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_conditional_math",
  "title": {
    "en": "Conditional Math & Multi-Criteria Aggregation: COUNTIF(S), SUMIF(S) & AVERAGEIF(S)",
    "vi": "Toán Có Điều Kiện & Tổng Hợp Đa Tiêu Chí: COUNTIF(S), SUMIF(S) & AVERAGEIF(S)"
  },
  "summary": {
    "en": "Master multi-dimensional business slicing: single-condition COUNTIF/SUMIF/AVERAGEIF, multi-criteria plural functions (COUNTIFS, SUMIFS, AVERAGEIFS), wildcard pattern filtering (*, ?), and dynamic text operator concatenation (\">=\" & Cell).",
    "vi": "Làm chủ kỹ thuật phân tích lát cắt kinh doanh đa chiều: các hàm điều kiện đơn COUNTIF/SUMIF/AVERAGEIF, các hàm số nhiều đa tiêu chí (COUNTIFS, SUMIFS, AVERAGEIFS), lọc theo mẫu ký tự đại diện (*, ?) và ghép toán tử động (\">=\" & Ô)."
  },
  "learn": {
    "introduction": {
      "en": "Raw aggregation answers basic questions (\"What is total revenue?\"), but strategic business management demands targeted answers (\"What was revenue for Enterprise software in the Western region during Q3?\"). Conditional aggregation functions enable high-speed dimensional slicing across massive operational datasets.",
      "vi": "Các hàm tổng hợp thô trả lời các câu hỏi cơ bản (\"Tổng doanh thu là bao nhiêu?\"), nhưng quản trị kinh doanh chiến lược đòi hỏi câu trả lời có mục tiêu (\"Doanh thu phần mềm Doanh nghiệp tại khu vực Miền Tây trong Quý 3 là bao nhiêu?\"). Các hàm tổng hợp có điều kiện cho phép phân tích lát cắt dữ liệu đa chiều tốc độ cao trên các tập dữ liệu vận hành lớn."
    },
    "conceptExplanation": {
      "en": "### 1. Single vs Multi-Criteria Function Architecture\nPay strict attention to argument positioning:\n- **Single Criterion**:\n  - `=COUNTIF(range, criteria)`\n  - `=SUMIF(range, criteria, [sum_range])`  *(sum_range is LAST)*\n  - `=AVERAGEIF(range, criteria, [average_range])`\n- **Plural Multi-Criteria (The Modern Best Practice)**:\n  - `=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)`\n  - `=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)`  *(sum_range is FIRST!)*\n  - `=AVERAGEIFS(avg_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)`\n\n### 2. Operator & Reference Concatenation Syntax\nWhen criteria rely on cell references rather than static numbers, concatenate the comparison operator with an ampersand:\n- Static: `\">=1000\"`\n- Dynamic Cell Reference: `\">=\" & E1`\n- Wildcards: `\"*East*\"` (contains \"East\"), `\"A??\"` (starts with A and exactly 3 letters).",
      "vi": "### 1. Kiến Trúc Hàm Đơn vs Đa Tiêu Chí\nHãy đặc biệt chú ý đến thứ tự vị trí các đối số:\n- **Hàm đơn điều kiện**:\n  - `=COUNTIF(vung_dieu_kien, tieu_chi)`\n  - `=SUMIF(vung_dieu_kien, tieu_chi, [vung_tinh_tong])`  *(vùng tính tổng ở CUỐI)*\n  - `=AVERAGEIF(vung_dieu_kien, tieu_chi, [vung_tinh_tb])`\n- **Hàm đa điều kiện số nhiều (Tiêu chuẩn thực hành hiện đại)**:\n  - `=COUNTIFS(vung_dk1, tieu_chi1, vung_dk2, tieu_chi2, ...)`\n  - `=SUMIFS(vung_tinh_tong, vung_dk1, tieu_chi1, vung_dk2, tieu_chi2, ...)`  *(vùng tính tổng ở ĐẦU TIÊN!)*\n  - `=AVERAGEIFS(vung_tinh_tb, vung_dk1, tieu_chi1, vung_dk2, tieu_chi2, ...)`\n\n### 2. Cú Pháp Nối Toán Tử & Tham Chiếu Ô\nKhi tiêu chí phụ thuộc vào ô tham chiếu động thay vì số tĩnh, hãy nối toán tử so sánh bằng dấu và (&):\n- Số tĩnh: `\">=1000\"`\n- Tham chiếu ô động: `\">=\" & E1`\n- Ký tự đại diện: `\"*East*\"` (chứa \"East\"), `\"A??\"` (bắt đầu bằng A và đúng 3 ký tự)."
    },
    "syntax": "# Plural Multi-Criteria Syntax:\n=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)\n=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)\n=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)\n\n# Dynamic Cell Criteria:\n=SUMIFS(D2:D100, A2:A100, \"West\", B2:B100, \">=\" & G1)",
    "examples": [
      {
        "title": {
          "en": "Multi-Criteria Regional Product Revenue with SUMIFS",
          "vi": "Tính Doanh Thu Sản Phẩm Theo Vùng Bằng SUMIFS"
        },
        "code": "Revenue in D2:D100, Region in A2:A100, Product in B2:B100\n\nTarget: Calculate total revenue for \"Laptops\" in the \"North\" region\nFormula: =SUMIFS(D2:D100, A2:A100, \"North\", B2:B100, \"Laptops\")",
        "description": {
          "en": "SUMIFS evaluates both conditions simultaneously using AND logic across the rows.",
          "vi": "SUMIFS đồng thời kiểm tra cả hai điều kiện theo logic VÀ trên tất cả các dòng."
        }
      },
      {
        "title": {
          "en": "Counting Orders within a Date Range with COUNTIFS",
          "vi": "Đếm Số Đơn Hàng Trong Khoảng Ngày Bằng COUNTIFS"
        },
        "code": "Order Dates in A2:A500\n\nTarget: Count orders placed between 2026-01-01 and 2026-03-31 (Q1)\nFormula: =COUNTIFS(A2:A500, \">=2026-01-01\", A2:A500, \"<=2026-03-31\")",
        "description": {
          "en": "Passing the same range twice with boundary operators creates an inclusive date bracket filter.",
          "vi": "Truyền cùng một vùng hai lần với các toán tử biên tạo thành bộ lọc khoảng ngày trọn gói."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Confusing argument order between SUMIF (sum_range is LAST) and SUMIFS (sum_range is FIRST), causing formula calculation failure.",
          "vi": "Nhầm lẫn thứ tự đối số giữa SUMIF (vùng tính tổng ở CUỐI) và SUMIFS (vùng tính tổng ở ĐẦU), làm công thức tính sai."
        },
        "correction": {
          "en": "Always use SUMIFS/AVERAGEIFS exclusively; they place the calculation range first and handle both 1 and multiple criteria seamlessly.",
          "vi": "Luôn ưu tiên dùng các hàm số nhiều SUMIFS/AVERAGEIFS; chúng luôn đặt vùng tính toán lên đầu và xử lý mượt mà từ 1 đến nhiều điều kiện."
        }
      },
      {
        "mistake": {
          "en": "Writing =SUMIF(A2:A10, \">=B1\", C2:C10) where \">=B1\" is treated as literal text instead of referencing cell B1.",
          "vi": "Viết =SUMIF(A2:A10, \">=B1\", C2:C10) trong đó \">=B1\" bị coi là chuỗi văn bản cố định thay vì tham chiếu ô B1."
        },
        "correction": {
          "en": "Concatenate the operator with the cell reference using an ampersand: \">=\" & B1.",
          "vi": "Nối toán tử với ô tham chiếu bằng dấu và (&): \">=\" & B1."
        }
      }
    ],
    "tips": [
      {
        "en": "Wildcard * matching: Use criteria like \"*Service*\" in SUMIFS to sum all items containing the word Service anywhere in their description.",
        "vi": "Ký tự đại diện *: Dùng tiêu chí như \"*Service*\" trong SUMIFS để tính tổng tất cả các mục có chứa từ Service ở bất kỳ vị trí nào."
      },
      {
        "en": "Always lock ranges ($A$2:$A$100) when copying summary tables across multiple report rows.",
        "vi": "Luôn khóa các dải ô ($A$2:$A$100) khi sao chép bảng tóm tắt qua nhiều dòng báo cáo."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l10_ex1",
      "type": "complete_code",
      "title": {
        "en": "Sum Sales for Specific Department",
        "vi": "Tính Tổng Doanh Số Cho Một Phòng Ban Cụ Thể"
      },
      "instruction": {
        "en": "Write a SUMIFS formula to sum Revenue in C2:C50 where Department in A2:A50 equals \"Marketing\".",
        "vi": "Viết công thức SUMIFS để tính tổng Doanh thu ở C2:C50 với điều kiện Phòng ban ở A2:A50 là \"Marketing\"."
      },
      "starterCode": "=SUMIFS(C2:C50, ",
      "solutionCode": "=SUMIFS(C2:C50, A2:A50, \"Marketing\")",
      "expectedOutput": "=SUMIFS(C2:C50, A2:A50, \"Marketing\")",
      "hint": {
        "en": "Pass sum_range C2:C50 first, followed by A2:A50 and \"Marketing\".",
        "vi": "Truyền vùng tính tổng C2:C50 đầu tiên, tiếp theo là A2:A50 và \"Marketing\"."
      },
      "explanation": {
        "en": "=SUMIFS(C2:C50, A2:A50, \"Marketing\") sums only cells where the department matches.",
        "vi": "=SUMIFS(C2:C50, A2:A50, \"Marketing\") chỉ cộng các ô thỏa mãn phòng ban tương ứng."
      }
    },
    {
      "id": "excel_l10_ex2",
      "type": "complete_code",
      "title": {
        "en": "Count Completed Orders with Amount > 500",
        "vi": "Đếm Số Đơn Hàng Hoàn Thành Có Giá Trị > 500"
      },
      "instruction": {
        "en": "Write a COUNTIFS formula to count rows where Status in B2:B100 is \"Completed\" AND Amount in C2:C100 > 500.",
        "vi": "Viết công thức COUNTIFS để đếm các dòng có Trạng thái ở B2:B100 là \"Completed\" VÀ Giá trị ở C2:C100 > 500."
      },
      "starterCode": "=COUNTIFS(",
      "solutionCode": "=COUNTIFS(B2:B100, \"Completed\", C2:C100, \">500\")",
      "expectedOutput": "=COUNTIFS(B2:B100, \"Completed\", C2:C100, \">500\")",
      "hint": {
        "en": "Provide criteria pairs: B2:B100, \"Completed\", C2:C100, \">500\".",
        "vi": "Cung cấp các cặp tiêu chí: B2:B100, \"Completed\", C2:C100, \">500\"."
      },
      "explanation": {
        "en": "COUNTIFS checks both criteria ranges and counts only rows satisfying both conditions.",
        "vi": "COUNTIFS kiểm tra cả 2 vùng tiêu chí và chỉ đếm các hàng thỏa mãn cả 2 điều kiện."
      }
    }
  ],
  "challenge": {
    "id": "excel_l10_challenge",
    "title": {
      "en": "Build Dynamic Dual-Criteria Average Margin Formula",
      "vi": "Xây Dựng Công Thức Tính Biên Lợi Nhuận Trung Bình Đa Tiêu Chí Động"
    },
    "description": {
      "en": "Construct an AVERAGEIFS formula to calculate average profit margin in D2:D200 for region in A2:A200 matching cell G1 AND sales amount in C2:C200 greater than or equal to threshold in cell H1.",
      "vi": "Xây dựng công thức AVERAGEIFS tính biên lợi nhuận trung bình ở D2:D200 cho khu vực ở A2:A200 khớp với ô G1 VÀ doanh số ở C2:C200 lớn hơn hoặc bằng ngưỡng tại ô H1."
    },
    "requirements": [
      {
        "en": "Use AVERAGEIFS with average range D2:D200",
        "vi": "Sử dụng AVERAGEIFS với vùng tính trung bình D2:D200"
      },
      {
        "en": "Match region against cell G1",
        "vi": "Khớp vùng khu vực với ô G1"
      },
      {
        "en": "Concatenate operator \">=\" & H1 for the sales threshold",
        "vi": "Nối toán tử \">=\" & H1 cho ngưỡng doanh số"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=AVERAGEIFS(D2:D200, A2:A200, G1, C2:C200, \">=\" & H1)",
    "hints": [
      {
        "en": "Use: =AVERAGEIFS(D2:D200, A2:A200, G1, C2:C200, \">=\" & H1)",
        "vi": "Sử dụng: =AVERAGEIFS(D2:D200, A2:A200, G1, C2:C200, \">=\" & H1)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l10_q1",
      "type": "single_choice",
      "question": {
        "en": "Where does the `sum_range` argument go in the `SUMIFS` function compared to the older `SUMIF` function?",
        "vi": "Vị trí của đối số `sum_range` (vùng tính tổng) nằm ở đâu trong hàm `SUMIFS` so với hàm cũ `SUMIF`?"
      },
      "options": [
        {
          "en": "In SUMIFS, sum_range is the FIRST argument; in SUMIF, sum_range is the LAST argument",
          "vi": "Trong SUMIFS, sum_range là đối số ĐẦU TIÊN; trong SUMIF, sum_range là đối số CUỐI CÙNG"
        },
        {
          "en": "In SUMIFS, sum_range is last; in SUMIF, it is first",
          "vi": "Trong SUMIFS, sum_range ở cuối; trong SUMIF, nó ở đầu"
        },
        {
          "en": "They both have sum_range in the middle",
          "vi": "Cả hai đều có sum_range ở giữa"
        },
        {
          "en": "SUMIFS does not use a sum_range",
          "vi": "SUMIFS không sử dụng sum_range"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "SUMIFS requires sum_range as its first argument (=SUMIFS(sum_range, criteria_range1, criteria1, ...)), whereas SUMIF places it at the very end.",
        "vi": "SUMIFS bắt buộc sum_range là đối số đầu tiên (=SUMIFS(vung_tong, vung_dk1, dk1, ...)), trong khi SUMIF đặt nó ở tận cùng."
      },
      "difficulty": "medium",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q2",
      "type": "single_choice",
      "question": {
        "en": "How do you dynamically reference the value in cell E2 inside a criteria argument checking for values greater than or equal to E2?",
        "vi": "Làm thế nào để tham chiếu động giá trị trong ô E2 bên trong một đối số tiêu chí kiểm tra các giá trị lớn hơn hoặc bằng E2?"
      },
      "options": [
        {
          "en": "\">=\" & E2",
          "vi": "\">=\" & E2"
        },
        {
          "en": "\">=E2\"",
          "vi": "\">=E2\""
        },
        {
          "en": ">=E2",
          "vi": ">=E2"
        },
        {
          "en": "\">{E2}\"",
          "vi": "\">{E2}\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The comparison operator must be enclosed in quotation marks and concatenated with the cell reference using the ampersand: \">=\" & E2.",
        "vi": "Toán tử so sánh phải được đặt trong dấu ngoặc kép và nối với ô tham chiếu bằng dấu và (&): \">=\" & E2."
      },
      "difficulty": "medium",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q3",
      "type": "single_choice",
      "question": {
        "en": "What wildcard character matches ANY sequence of zero or more characters in Excel criteria functions?",
        "vi": "Ký tự đại diện nào khớp với BẤT KỲ chuỗi gồm không hoặc nhiều ký tự trong các hàm tiêu chí của Excel?"
      },
      "options": [
        {
          "en": "* (Asterisk)",
          "vi": "* (Dấu hoa thị)"
        },
        {
          "en": "? (Question mark)",
          "vi": "? (Dấu chấm hỏi)"
        },
        {
          "en": "% (Percent)",
          "vi": "% (Dấu phần trăm)"
        },
        {
          "en": "# (Pound)",
          "vi": "# (Dấu thăng)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The asterisk (*) represents any number of characters (e.g. \"*North*\" matches any text containing \"North\").",
        "vi": "Dấu hoa thị (*) đại diện cho số lượng ký tự bất kỳ (ví dụ \"*North*\" khớp với mọi chuỗi chứa từ \"North\")."
      },
      "difficulty": "easy",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q4",
      "type": "single_choice",
      "question": {
        "en": "What wildcard character matches exactly ONE single character?",
        "vi": "Ký tự đại diện nào khớp với chính xác DUY NHẤT MỘT ký tự đơn?"
      },
      "options": [
        {
          "en": "? (Question mark)",
          "vi": "? (Dấu chấm hỏi)"
        },
        {
          "en": "* (Asterisk)",
          "vi": "* (Dấu hoa thị)"
        },
        {
          "en": "_ (Underscore)",
          "vi": "_ (Dấu gạch dưới)"
        },
        {
          "en": ". (Dot)",
          "vi": ". (Dấu chấm)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The question mark (?) represents exactly one single character (e.g. \"B?ll\" matches \"Ball\", \"Bell\", \"Bill\", \"Bull\").",
        "vi": "Dấu chấm hỏi (?) đại diện cho chính xác một ký tự đơn (ví dụ \"B?ll\" khớp với \"Ball\", \"Bell\", \"Bill\", \"Bull\")."
      },
      "difficulty": "easy",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q5",
      "type": "single_choice",
      "question": {
        "en": "What does `=COUNTIFS(A2:A100, \"Red\", B2:B100, \">50\")` calculate?",
        "vi": "Công thức `=COUNTIFS(A2:A100, \"Red\", B2:B100, \">50\")` tính toán điều gì?"
      },
      "options": [
        {
          "en": "The number of rows where Column A is \"Red\" AND Column B is greater than 50",
          "vi": "Số lượng dòng có Cột A là \"Red\" VÀ Cột B lớn hơn 50"
        },
        {
          "en": "The sum of numbers in Column B where Column A is \"Red\"",
          "vi": "Tổng các số ở Cột B có Cột A là \"Red\""
        },
        {
          "en": "The average of Column B",
          "vi": "Trung bình cộng của Cột B"
        },
        {
          "en": "The total rows in the sheet",
          "vi": "Tổng số dòng trong trang tính"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "COUNTIFS tallies the count of rows that satisfy all provided criteria pairs simultaneously.",
        "vi": "COUNTIFS đếm số lượng dòng đồng thời thỏa mãn tất cả các cặp tiêu chí được cung cấp."
      },
      "difficulty": "easy",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q6",
      "type": "single_choice",
      "question": {
        "en": "What happens if the ranges in a `SUMIFS` formula are different sizes (e.g. sum_range is `C2:C100` but criteria_range1 is `A2:A50`)?",
        "vi": "Điều gì xảy ra nếu các dải ô trong công thức `SUMIFS` có kích thước khác nhau (ví dụ sum_range là `C2:C100` nhưng criteria_range1 là `A2:A50`)?"
      },
      "options": [
        {
          "en": "Excel returns the `#VALUE!` error",
          "vi": "Excel trả về lỗi `#VALUE!`"
        },
        {
          "en": "Excel calculates up to row 50 and ignores the rest",
          "vi": "Excel tính đến hàng 50 và bỏ qua phần còn lại"
        },
        {
          "en": "Excel automatically resizes the range",
          "vi": "Excel tự động thay đổi kích thước dải ô"
        },
        {
          "en": "It returns 0",
          "vi": "Nó trả về 0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "SUMIFS/COUNTIFS require all criteria ranges and the sum range to have identical dimensions, otherwise raising #VALUE!.",
        "vi": "SUMIFS/COUNTIFS yêu cầu tất cả các vùng tiêu chí và vùng tính tổng phải có cùng kích thước hàng cột, nếu không sẽ báo lỗi #VALUE!."
      },
      "difficulty": "medium",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q7",
      "type": "single_choice",
      "question": {
        "en": "Which formula calculates the average sales amount in column D for transactions occurring in the \"East\" region (column B)?",
        "vi": "Công thức nào tính doanh số trung bình ở cột D cho các giao dịch diễn ra tại khu vực \"East\" (cột B)?"
      },
      "options": [
        {
          "en": "=AVERAGEIFS(D2:D100, B2:B100, \"East\")",
          "vi": "=AVERAGEIFS(D2:D100, B2:B100, \"East\")"
        },
        {
          "en": "=AVERAGEIF(D2:D100, \"East\", B2:B100)",
          "vi": "=AVERAGEIF(D2:D100, \"East\", B2:B100)"
        },
        {
          "en": "=AVERAGE(D2:D100, \"East\")",
          "vi": "=AVERAGE(D2:D100, \"East\")"
        },
        {
          "en": "=SUMIFS(D2:D100, B2:B100, \"East\") / COUNT(D2:D100)",
          "vi": "=SUMIFS(D2:D100, B2:B100, \"East\") / COUNT(D2:D100)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "=AVERAGEIFS(average_range, criteria_range, criteria) correctly averages column D where column B equals \"East\".",
        "vi": "=AVERAGEIFS(vung_tb, vung_dk, tieu_chi) tính trung bình cột D chính xác cho các ô có cột B là \"East\"."
      },
      "difficulty": "easy",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q8",
      "type": "true_false",
      "question": {
        "en": "True or False: Criteria text matching in `COUNTIF` and `SUMIF` is case-insensitive (e.g. \"apple\" matches \"APPLE\" and \"Apple\").",
        "vi": "Đúng hay Sai: Việc so khớp tiêu chí văn bản trong các hàm `COUNTIF` và `SUMIF` không phân biệt chữ hoa chữ thường (ví dụ \"apple\" khớp với \"APPLE\" và \"Apple\")."
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
        "en": "True. Standard Excel conditional math functions do not differentiate between uppercase and lowercase text.",
        "vi": "Đúng. Các hàm toán có điều kiện tiêu chuẩn trong Excel không phân biệt chữ hoa và chữ thường."
      },
      "difficulty": "easy",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q9",
      "type": "single_choice",
      "question": {
        "en": "How would you count how many cells in range A1:A50 contain the exact text containing the literal character \"?\" (question mark)?",
        "vi": "Làm thế nào để đếm số ô trong vùng A1:A50 có chứa chính xác ký tự \"?\" (dấu chấm hỏi)?"
      },
      "options": [
        {
          "en": "=COUNTIF(A1:A50, \"*~?*\")",
          "vi": "=COUNTIF(A1:A50, \"*~?*\")"
        },
        {
          "en": "=COUNTIF(A1:A50, \"*?*\")",
          "vi": "=COUNTIF(A1:A50, \"*?*\")"
        },
        {
          "en": "=COUNTIF(A1:A50, \"\\?\")",
          "vi": "=COUNTIF(A1:A50, \"\\?\")"
        },
        {
          "en": "=COUNTIF(A1:A50, \"[?]\")",
          "vi": "=COUNTIF(A1:A50, \"[?]\")"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The tilde (~) escapes wildcard characters (*, ?, ~) so Excel treats them as literal characters.",
        "vi": "Dấu ngã (~) dùng để thoát các ký tự đại diện (*, ?, ~) để Excel coi chúng là ký tự chữ thông thường."
      },
      "difficulty": "hard",
      "topicId": "excel_conditional_math"
    },
    {
      "id": "excel_l10_q10",
      "type": "single_choice",
      "question": {
        "en": "Which formula sums sales in column E for records where the date in column B is in year 2026 (from 2026-01-01 to 2026-12-31)?",
        "vi": "Công thức nào tính tổng doanh số ở cột E cho các bản ghi có ngày ở cột B trong năm 2026 (từ 01/01/2026 đến 31/12/2026)?"
      },
      "options": [
        {
          "en": "=SUMIFS(E2:E100, B2:B100, \">=2026-01-01\", B2:B100, \"<=2026-12-31\")",
          "vi": "=SUMIFS(E2:E100, B2:B100, \">=2026-01-01\", B2:B100, \"<=2026-12-31\")"
        },
        {
          "en": "=SUMIFS(E2:E100, B2:B100, \"2026\")",
          "vi": "=SUMIFS(E2:E100, B2:B100, \"2026\")"
        },
        {
          "en": "=SUMIF(B2:B100, 2026, E2:E100)",
          "vi": "=SUMIF(B2:B100, 2026, E2:E100)"
        },
        {
          "en": "=SUM(E2:E100, YEAR(B2:B100)=2026)",
          "vi": "=SUM(E2:E100, YEAR(B2:B100)=2026)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "SUMIFS applies two boundary conditions on the date column to capture the full calendar year.",
        "vi": "SUMIFS áp dụng hai điều kiện chặn đầu cuối trên cột ngày tháng để bao trọn toàn bộ năm dương lịch."
      },
      "difficulty": "medium",
      "topicId": "excel_conditional_math"
    }
  ]
};
export default lesson10;
