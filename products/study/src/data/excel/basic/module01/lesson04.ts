import { Lesson } from '../../../../types';

export const lesson04: Lesson = {
  "id": "excel_lesson_4",
  "order": 4,
  "moduleId": "excel_mod_1",
  "courseId": "excel",
  "levelId": "basic",
  "topicId": "excel_functions",
  "title": {
    "en": "Foundational Statistical Functions: SUM, AVERAGE, MIN, MAX, COUNT & COUNTA",
    "vi": "Các Hàm Thống Kê Cơ Bản: SUM, AVERAGE, MIN, MAX, COUNT & COUNTA"
  },
  "summary": {
    "en": "Master Excel baseline aggregation functions: SUM for totaling numeric sets, AVERAGE for arithmetic means, MIN/MAX for range boundaries, and the critical distinction between COUNT (numeric-only) and COUNTA (non-empty cells).",
    "vi": "Làm chủ các hàm tổng hợp nền tảng của Excel: SUM để tính tổng các tập số, AVERAGE để tính trung bình cộng, MIN/MAX để tìm giá trị biên và phân biệt cốt lõi giữa COUNT (chỉ đếm số) và COUNTA (đếm ô không rỗng)."
  },
  "learn": {
    "introduction": {
      "en": "Statistical summary functions are the workhorses of business reporting. Rather than manually chaining additions (=A1+A2+A3+A4), aggregation functions accept entire continuous ranges (A1:A100) or disjoint lists, automatically optimizing memory execution and handling empty cells cleanly.",
      "vi": "Các hàm thống kê tóm tắt là công cụ chủ lực của báo cáo kinh doanh. Thay vì nối các phép cộng thủ công (=A1+A2+A3+A4), các hàm tổng hợp nhận toàn bộ dải ô liên tục (A1:A100) hoặc danh sách rời rạc, tự động tối ưu bộ nhớ xử lý và xử lý sạch sẽ các ô trống."
    },
    "conceptExplanation": {
      "en": "### 1. The Core Aggregation Functions\n- **`=SUM(range1, [range2], ...)`**: Adds all numbers in the specified ranges. Ignores text and blank cells.\n- **`=AVERAGE(range1, [range2], ...)`**: Calculates the arithmetic mean (Sum / Count of numbers). Crucially, ignores blank cells and text (they do not count toward the divisor).\n- **`=MIN(range1, [range2], ...)`**: Returns the smallest numeric value in a dataset.\n- **`=MAX(range1, [range2], ...)`**: Returns the largest numeric value in a dataset.\n- **`=COUNT(range1, [range2], ...)`**: Counts cells containing **numeric values only** (including dates and numbers). Ignores text and empty cells.\n- **`=COUNTA(range1, [range2], ...)`**: Counts all **non-empty cells** regardless of data type (text, numbers, booleans, errors, spaces).\n- **`=COUNTBLANK(range)`**: Counts completely empty cells in a range.\n\n### 2. Range Syntax Rules\n- **Continuous Column Range**: `A2:A50`\n- **Continuous 2D Grid**: `B2:F20`\n- **Disjoint / Non-contiguous Ranges**: `=SUM(B2:B10, D2:D10, F2:F10)`\n- **Entire Column / Row**: `=SUM(A:A)` or `=SUM(2:2)`",
      "vi": "### 1. Các Hàm Tổng Hợp Cốt Lõi\n- **`=SUM(vung1, [vung2], ...)`**: Cộng tất cả các số trong các vùng được chỉ định. Bỏ qua văn bản và ô trống.\n- **`=AVERAGE(vung1, [vung2], ...)`**: Tính trung bình cộng số học (Tổng / Số lượng các số). Lưu ý quan trọng: hàm bỏ qua ô trống và văn bản (không tính vào mẫu số chia).\n- **`=MIN(vung1, [vung2], ...)`**: Trả về giá trị số nhỏ nhất trong tập dữ liệu.\n- **`=MAX(vung1, [vung2], ...)`**: Trả về giá trị số lớn nhất trong tập dữ liệu.\n- **`=COUNT(vung1, [vung2], ...)`**: Chỉ đếm các ô chứa **giá trị số** (bao gồm cả ngày tháng và số). Bỏ qua văn bản và ô trống.\n- **`=COUNTA(vung1, [vung2], ...)`**: Đếm tất cả các **ô không rỗng** bất kể kiểu dữ liệu (chữ, số, logic, lỗi, dấu cách).\n- **`=COUNTBLANK(vung)`**: Đếm các ô hoàn toàn trống trong một vùng.\n\n### 2. Quy Tắc Cú Pháp Tham Chiếu Vùng\n- **Vùng cột liên tục**: `A2:A50`\n- **Lưới ô 2 chiều liên tục**: `B2:F20`\n- **Vùng không liền kề / Rời rạc**: `=SUM(B2:B10, D2:D10, F2:F10)`\n- **Toàn bộ cột / hàng**: `=SUM(A:A)` hoặc `=SUM(2:2)`"
    },
    "syntax": "# Syntax:\n=SUM(number1, [number2], ...)\n=AVERAGE(number1, [number2], ...)\n=MIN(number1, [number2], ...)\n=MAX(number1, [number2], ...)\n=COUNT(value1, [value2], ...)\n=COUNTA(value1, [value2], ...)\n=COUNTBLANK(range)",
    "examples": [
      {
        "title": {
          "en": "Executive Sales Summary Metrics",
          "vi": "Chỉ Số Tóm Tắt Doanh Thu Điều Hành"
        },
        "code": "Sales Data in B2:B20\n\nTotal Revenue:       =SUM(B2:B20)\nAverage Ticket Size: =AVERAGE(B2:B20)\nTop Sale:            =MAX(B2:B20)\nLowest Sale:         =MIN(B2:B20)\nTransactions Made:   =COUNT(B2:B20)",
        "description": {
          "en": "Demonstrates combining foundational statistical functions to generate an instant analytical summary.",
          "vi": "Minh họa việc kết hợp các hàm thống kê nền tảng để tạo báo cáo tổng hợp phân tích tức thì."
        }
      },
      {
        "title": {
          "en": "COUNT vs COUNTA on Employee Attendance Roster",
          "vi": "COUNT vs COUNTA Trên Bảng Điểm Danh Nhân Viên"
        },
        "code": "Column A has Employee Names (Text)\nColumn B has Hours Worked (Numbers, with \"Sick\" or blank for absentees)\nCells in B2:B6 contain: [8, 8, \"Sick\", 0, (blank)]\n\n=COUNT(B2:B6)   -> Returns: 3 (counts 8, 8, 0 - only numeric cells)\n=COUNTA(B2:B6)  -> Returns: 4 (counts 8, 8, \"Sick\", 0 - all non-blank cells)",
        "description": {
          "en": "Shows how COUNT ignores text strings like \"Sick\", while COUNTA counts any populated cell.",
          "vi": "Cho thấy cách COUNT bỏ qua chuỗi văn bản như \"Sick\", trong khi COUNTA đếm mọi ô có chứa dữ liệu."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Entering 0 into a cell instead of leaving it blank when computing AVERAGE, distorting the arithmetic mean downward.",
          "vi": "Nhập số 0 vào ô thay vì để trống khi tính AVERAGE, làm giảm sai lệch giá trị trung bình cộng."
        },
        "correction": {
          "en": "AVERAGE ignores true blank cells, but includes cells with value 0 in both the numerator and denominator.",
          "vi": "Hàm AVERAGE bỏ qua ô thực sự trống, nhưng sẽ tính ô có giá trị bằng 0 vào cả tử số và mẫu số."
        }
      },
      {
        "mistake": {
          "en": "Using COUNT instead of COUNTA to count total customers or product names, resulting in a count of 0.",
          "vi": "Dùng COUNT thay vì COUNTA để đếm tổng số khách hàng hoặc tên sản phẩm, dẫn đến kết quả trả về bằng 0."
        },
        "correction": {
          "en": "Use COUNTA for text columns and COUNT for numeric columns.",
          "vi": "Sử dụng COUNTA cho các cột chứa văn bản và COUNT cho các cột chứa số liệu."
        }
      }
    ],
    "tips": [
      {
        "en": "AutoSum Shortcut: Press Alt + = (Alt + Equals) on Windows (Option + Cmd + T on Mac) to automatically insert a SUM formula covering adjacent cells.",
        "vi": "Phím tắt AutoSum: Nhấn Alt + = trên Windows (Option + Cmd + T trên Mac) để tự động chèn công thức SUM bao quát các ô liền kề."
      },
      {
        "en": "Status Bar Quick Summary: Highlight any range of cells to immediately view their Sum, Average, and Count in the Excel status bar at the bottom right.",
        "vi": "Xem nhanh thanh trạng thái: Bôi đen bất kỳ vùng ô nào để xem ngay Tổng, Trung bình và Số lượng trên thanh trạng thái phía dưới góc phải."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l4_ex1",
      "type": "complete_code",
      "title": {
        "en": "Sum Quarterly Departmental Budget",
        "vi": "Tính Tổng Ngân Sách Bộ Phận Hàng Quý"
      },
      "instruction": {
        "en": "Write the formula to calculate the total budget across cells B2 through B15.",
        "vi": "Viết công thức tính tổng ngân sách từ ô B2 đến ô B15."
      },
      "starterCode": "=",
      "solutionCode": "=SUM(B2:B15)",
      "expectedOutput": "=SUM(B2:B15)",
      "hint": {
        "en": "Use the SUM function with range B2:B15.",
        "vi": "Sử dụng hàm SUM với dải ô B2:B15."
      },
      "explanation": {
        "en": "=SUM(B2:B15) computes the sum of all numeric values in that range.",
        "vi": "=SUM(B2:B15) tính tổng tất cả các giá trị số trong vùng đó."
      }
    },
    {
      "id": "excel_l4_ex2",
      "type": "complete_code",
      "title": {
        "en": "Count Active Registered Clients",
        "vi": "Đếm Số Lượng Khách Hàng Đã Đăng Ký"
      },
      "instruction": {
        "en": "Write the formula to count the number of non-empty client names in range A2:A50.",
        "vi": "Viết công thức đếm số lượng tên khách hàng không rỗng trong vùng A2:A50."
      },
      "starterCode": "=",
      "solutionCode": "=COUNTA(A2:A50)",
      "expectedOutput": "=COUNTA(A2:A50)",
      "hint": {
        "en": "Use COUNTA for text entries.",
        "vi": "Dùng COUNTA cho dữ liệu dạng văn bản."
      },
      "explanation": {
        "en": "COUNTA counts all cells that are not empty in the range A2:A50.",
        "vi": "COUNTA đếm tất cả các ô không trống trong phạm vi A2:A50."
      }
    }
  ],
  "challenge": {
    "id": "excel_l4_challenge",
    "title": {
      "en": "Comprehensive Sales Performance Dashboard Summary",
      "vi": "Bảng Tóm Tắt Hiệu Suất Bán Hàng Toàn Diện"
    },
    "description": {
      "en": "Write the formula to compute the average deal size in cell C22 across the transaction values in range C2:C20.",
      "vi": "Viết công thức tính quy mô giao dịch trung bình tại ô C22 dựa trên giá trị giao dịch trong vùng C2:C20."
    },
    "requirements": [
      {
        "en": "Use the AVERAGE function",
        "vi": "Sử dụng hàm AVERAGE"
      },
      {
        "en": "Pass the continuous range C2:C20",
        "vi": "Truyền vào dải ô liên tục C2:C20"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=AVERAGE(C2:C20)",
    "hints": [
      {
        "en": "Use =AVERAGE(C2:C20)",
        "vi": "Dùng =AVERAGE(C2:C20)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l4_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the primary difference between the `COUNT` and `COUNTA` functions?",
        "vi": "Sự khác biệt chính giữa hàm `COUNT` và `COUNTA` là gì?"
      },
      "options": [
        {
          "en": "COUNT counts only numbers; COUNTA counts all non-empty cells (numbers, text, booleans, errors)",
          "vi": "COUNT chỉ đếm số; COUNTA đếm tất cả các ô không rỗng (số, chữ, boolean, lỗi)"
        },
        {
          "en": "COUNT counts text; COUNTA counts numbers",
          "vi": "COUNT đếm chữ; COUNTA đếm số"
        },
        {
          "en": "COUNT counts rows; COUNTA counts columns",
          "vi": "COUNT đếm dòng; COUNTA đếm cột"
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
        "en": "COUNT specifically tallies numeric values only. COUNTA counts any cell that is not blank.",
        "vi": "COUNT chỉ kiểm đếm các giá trị số. COUNTA đếm bất kỳ ô nào có chứa dữ liệu."
      },
      "difficulty": "easy",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q2",
      "type": "single_choice",
      "question": {
        "en": "If range A1:A4 contains values `10`, `20`, `\"\" (blank)`, and `\"Text\"`, what does `=AVERAGE(A1:A4)` return?",
        "vi": "Nếu vùng A1:A4 chứa các giá trị `10`, `20`, `\"\" (trống)` và `\"Text\"`, công thức `=AVERAGE(A1:A4)` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "15 (sums 10+20 and divides by 2 numeric cells)",
          "vi": "15 (tổng 10+20 chia cho 2 ô chứa số)"
        },
        {
          "en": "7.5 (sums 30 and divides by 4)",
          "vi": "7.5 (tổng 30 chia cho 4)"
        },
        {
          "en": "10",
          "vi": "10"
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
        "en": "AVERAGE ignores both text and empty cells, calculating (10 + 20) / 2 = 15.",
        "vi": "Hàm AVERAGE bỏ qua cả văn bản và ô trống, tính toán (10 + 20) / 2 = 15."
      },
      "difficulty": "medium",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q3",
      "type": "single_choice",
      "question": {
        "en": "Which keyboard shortcut automatically inserts the `SUM` function for adjacent cells?",
        "vi": "Phím tắt nào tự động chèn hàm `SUM` cho các ô liền kề?"
      },
      "options": [
        {
          "en": "Alt + =",
          "vi": "Alt + ="
        },
        {
          "en": "Ctrl + S",
          "vi": "Ctrl + S"
        },
        {
          "en": "Shift + S",
          "vi": "Shift + S"
        },
        {
          "en": "Ctrl + Alt + S",
          "vi": "Ctrl + Alt + S"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Alt + = (AutoSum) immediately creates a SUM formula targeting adjacent rows or columns.",
        "vi": "Alt + = (AutoSum) ngay lập tức tạo công thức SUM hướng đến các hàng hoặc cột liền kề."
      },
      "difficulty": "easy",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q4",
      "type": "single_choice",
      "question": {
        "en": "What function returns the highest number in a specified range of cells?",
        "vi": "Hàm nào trả về số lớn nhất trong một phạm vi ô được chỉ định?"
      },
      "options": [
        {
          "en": "MAX",
          "vi": "MAX"
        },
        {
          "en": "TOP",
          "vi": "TOP"
        },
        {
          "en": "HIGH",
          "vi": "HIGH"
        },
        {
          "en": "UPPER",
          "vi": "UPPER"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "MAX(range) evaluates a dataset and returns the highest numeric value.",
        "vi": "MAX(vùng) đánh giá tập dữ liệu và trả về giá trị số cao nhất."
      },
      "difficulty": "easy",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q5",
      "type": "single_choice",
      "question": {
        "en": "How can you sum two non-contiguous ranges A1:A5 and C1:C5 in a single formula?",
        "vi": "Làm thế nào bạn có thể tính tổng hai vùng không liền kề A1:A5 và C1:C5 trong một công thức duy nhất?"
      },
      "options": [
        {
          "en": "=SUM(A1:A5, C1:C5)",
          "vi": "=SUM(A1:A5, C1:C5)"
        },
        {
          "en": "=SUM(A1:A5:C1:C5)",
          "vi": "=SUM(A1:A5:C1:C5)"
        },
        {
          "en": "=SUM(A1:A5 & C1:C5)",
          "vi": "=SUM(A1:A5 & C1:C5)"
        },
        {
          "en": "=SUM(A1:C5 - B1:B5)",
          "vi": "=SUM(A1:C5 - B1:B5)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Separate non-contiguous ranges using commas as distinct arguments inside the SUM function: `=SUM(A1:A5, C1:C5)`.",
        "vi": "Phân tách các vùng không liền kề bằng dấu phẩy như các đối số riêng biệt trong hàm SUM: `=SUM(A1:A5, C1:C5)`."
      },
      "difficulty": "easy",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q6",
      "type": "single_choice",
      "question": {
        "en": "What does `=COUNTBLANK(B1:B10)` return if 3 cells in the range are empty?",
        "vi": "Công thức `=COUNTBLANK(B1:B10)` trả về kết quả gì nếu có 3 ô trong vùng bị trống?"
      },
      "options": [
        {
          "en": "3",
          "vi": "3"
        },
        {
          "en": "7",
          "vi": "7"
        },
        {
          "en": "10",
          "vi": "10"
        },
        {
          "en": "0",
          "vi": "0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "COUNTBLANK counts the number of empty cells in a range, returning 3.",
        "vi": "COUNTBLANK đếm số lượng ô trống trong vùng, trả về 3."
      },
      "difficulty": "easy",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q7",
      "type": "single_choice",
      "question": {
        "en": "If cells A1:A3 contain `5`, `0`, and `10`, what is the result of `=AVERAGE(A1:A3)`?",
        "vi": "Nếu các ô A1:A3 chứa `5`, `0` và `10`, kết quả của `=AVERAGE(A1:A3)` là bao nhiêu?"
      },
      "options": [
        {
          "en": "5 (sum 15 divided by 3)",
          "vi": "5 (tổng 15 chia cho 3)"
        },
        {
          "en": "7.5 (sum 15 divided by 2)",
          "vi": "7.5 (tổng 15 chia cho 2)"
        },
        {
          "en": "15",
          "vi": "15"
        },
        {
          "en": "0",
          "vi": "0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Zero is a valid numeric value, so it is included in the count of cells: (5 + 0 + 10) / 3 = 5.",
        "vi": "Số 0 là một giá trị số hợp lệ, nên nó được tính vào số lượng ô: (5 + 0 + 10) / 3 = 5."
      },
      "difficulty": "medium",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q8",
      "type": "single_choice",
      "question": {
        "en": "Which function should you use to find the lowest price in a catalog range E2:E100?",
        "vi": "Hàm nào bạn nên sử dụng để tìm giá thấp nhất trong danh mục sản phẩm từ E2:E100?"
      },
      "options": [
        {
          "en": "=MIN(E2:E100)",
          "vi": "=MIN(E2:E100)"
        },
        {
          "en": "=LOW(E2:E100)",
          "vi": "=LOW(E2:E100)"
        },
        {
          "en": "=BOTTOM(E2:E100)",
          "vi": "=BOTTOM(E2:E100)"
        },
        {
          "en": "=SMALLEST(E2:E100)",
          "vi": "=SMALLEST(E2:E100)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "MIN returns the minimum numeric value in the specified range.",
        "vi": "Hàm MIN trả về giá trị số nhỏ nhất trong vùng được chỉ định."
      },
      "difficulty": "easy",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q9",
      "type": "true_false",
      "question": {
        "en": "True or False: The `SUM` function will return an error if one of the cells in the range contains text.",
        "vi": "Đúng hay Sai: Hàm `SUM` sẽ trả về lỗi nếu một trong các ô trong vùng chứa văn bản."
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
        "en": "False. SUM naturally ignores text cells and continues summing the valid numeric cells without error.",
        "vi": "Sai. Hàm SUM tự động bỏ qua các ô chứa văn bản và tiếp tục cộng các ô chứa số hợp lệ mà không báo lỗi."
      },
      "difficulty": "medium",
      "topicId": "excel_functions"
    },
    {
      "id": "excel_l4_q10",
      "type": "single_choice",
      "question": {
        "en": "What does `=COUNT(A1:A5)` return if cells contain: `100`, `\"Approved\"`, `2026-08-29 (Date)`, `TRUE (Boolean)`, and `\"\" (blank)`?",
        "vi": "Công thức `=COUNT(A1:A5)` trả về kết quả gì nếu các ô chứa: `100`, `\"Approved\"`, `2026-08-29 (Ngày)`, `TRUE (Boolean)` và `\"\" (trống)`?"
      },
      "options": [
        {
          "en": "2 (the number 100 and the date, which is stored internally as a serial number)",
          "vi": "2 (số 100 và ngày tháng, vốn được lưu nội bộ dưới dạng số sê-ri)"
        },
        {
          "en": "1 (only the number 100)",
          "vi": "1 (chỉ duy nhất số 100)"
        },
        {
          "en": "3 (including TRUE)",
          "vi": "3 (bao gồm cả TRUE)"
        },
        {
          "en": "4 (all non-empty cells)",
          "vi": "4 (tất cả các ô không trống)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Dates in Excel are stored as serial numbers, so COUNT recognizes both 100 and the date as numbers (Total = 2). Booleans and text in ranges are ignored by COUNT.",
        "vi": "Ngày tháng trong Excel được lưu dưới dạng số sê-ri, do đó COUNT nhận diện cả 100 và ngày tháng là số (Tổng = 2). Kiểu logic và văn bản trong vùng tham chiếu bị COUNT bỏ qua."
      },
      "difficulty": "hard",
      "topicId": "excel_functions"
    }
  ]
};
export default lesson04;
