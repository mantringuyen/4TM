import { Lesson } from '../../../../types';

export const lesson14: Lesson = {
  "id": "excel_lesson_14",
  "order": 14,
  "moduleId": "excel_mod_4",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_dynamic_arrays",
  "title": {
    "en": "Dynamic Array Formulas & Spill Engine: FILTER, UNIQUE, SORT, SORTBY & SEQUENCE",
    "vi": "Công Thức Mảng Động & Cơ Chế Tràn: FILTER, UNIQUE, SORT, SORTBY & SEQUENCE"
  },
  "summary": {
    "en": "Master Microsoft 365's Dynamic Array engine: single formulas returning multi-cell ranges, the Spill Range operator (#), live dataset extraction with FILTER, deduplication with UNIQUE, multi-key ordering with SORTBY, and programmatic grid generation with SEQUENCE.",
    "vi": "Làm chủ cơ chế Mảng Động của Microsoft 365: một công thức duy nhất tự động trả về dải ô nhiều dòng cột, toán tử vùng tràn Spill (#), lọc dữ liệu trực tiếp với FILTER, loại bỏ trùng lặp với UNIQUE, sắp xếp đa cấp với SORTBY và tạo chuỗi số tự động với SEQUENCE."
  },
  "learn": {
    "introduction": {
      "en": "In legacy Excel, a formula in one cell could only return one value unless entered with complex Ctrl+Shift+Enter array gymnastics. The modern Dynamic Array Calculation Engine changes everything: a single formula automatically \"spills\" an entire matrix of results into neighboring cells, resizing dynamically as underlying records grow.",
      "vi": "Trong các phiên bản Excel cũ, một công thức trong một ô chỉ có thể trả về một giá trị duy nhất trừ khi dùng tổ hợp phím phức tạp Ctrl+Shift+Enter. Cơ chế Tính toán Mảng Động hiện đại thay đổi hoàn toàn: một công thức duy nhất tự động \"tràn\" (spill) toàn bộ ma trận kết quả sang các ô lân cận và tự động co giãn khi dữ liệu gốc thay đổi."
    },
    "conceptExplanation": {
      "en": "### 1. The Dynamic Array Revolution & The Spill Operator (#)\nWhen a formula returns multiple values, Excel automatically spills them into surrounding blank cells.\n- **The Spill Range Operator (`#`)**: To reference the entire dynamic spill results starting at cell `F2`, simply write `=F2#`. If the spill range grows from 5 rows to 500 rows, `=SUM(F2#)` automatically adjusts without editing the formula!\n\n### 2. The Core Dynamic Array Functions\n- **`=FILTER(array, include, [if_empty])`**: Returns all rows from `array` that meet the boolean condition in `include`.\n  - Multi-Criteria AND: `=FILTER(A2:D100, (B2:B100=\"West\") * (C2:C100>5000))`\n  - Multi-Criteria OR: `=FILTER(A2:D100, (B2:B100=\"West\") + (B2:B100=\"East\"))`\n- **`=UNIQUE(array, [by_col], [exactly_once])`**: Returns distinct unique values from a column or table.\n- **`=SORT(array, [sort_index], [sort_order], [by_col])`**: Sorts range by column index (1 for Ascending, -1 for Descending).\n- **`=SORTBY(array, by_array1, [order1], ...)`**: Sorts a range based on another independent vector without that vector being inside the returned array.\n- **`=SEQUENCE(rows, [columns], [start], [step])`**: Generates a matrix grid of sequential numbers (e.g. `=SEQUENCE(12, 1, 1, 1)` creates numbers 1 through 12).",
      "vi": "### 1. Cách Mạng Mảng Động & Toán Tử Vùng Tràn (#)\nKhi một công thức trả về nhiều giá trị, Excel tự động tràn chúng sang các ô trống liền kề.\n- **Toán tử vùng tràn (`#`)**: Để tham chiếu toàn bộ kết quả mảng động bắt đầu từ ô `F2`, chỉ cần viết `=F2#`. Nếu vùng tràn mở rộng từ 5 dòng lên 500 dòng, `=SUM(F2#)` sẽ tự động cập nhật mà không cần sửa công thức!\n\n### 2. Các Hàm Mảng Động Cốt Lõi\n- **`=FILTER(mang, dieu_kien_loc, [neu_rong])`**: Trích xuất tất cả các dòng từ `mang` thỏa mãn điều kiện logic trong `dieu_kien_loc`.\n  - Đa điều kiện VÀ: `=FILTER(A2:D100, (B2:B100=\"West\") * (C2:C100>5000))`\n  - Đa điều kiện HOẶC: `=FILTER(A2:D100, (B2:B100=\"West\") + (B2:B100=\"East\"))`\n- **`=UNIQUE(mang, [theo_cot], [chi_xuat_hien_1_lan])`**: Trả về danh sách các giá trị duy nhất không trùng lặp từ một cột hoặc bảng.\n- **`=SORT(mang, [cot_sap_xep], [chieu_sap_xep], [theo_cot])`**: Sắp xếp dải ô theo số thứ tự cột (1 là Tăng dần, -1 là Giảm dần).\n- **`=SORTBY(mang, mang_tieu_chi1, [chieu1], ...)`**: Sắp xếp dải ô dựa trên một cột tiêu chí độc lập khác.\n- **`=SEQUENCE(so_hang, [so_cot], [bat_dau], [buoc_nhay])`**: Tạo ma trận các số thứ tự liên tiếp (ví dụ: `=SEQUENCE(12, 1, 1, 1)` tạo các số từ 1 đến 12)."
    },
    "syntax": "# Dynamic Array Formulas:\n=FILTER(A2:D100, B2:B100 = \"North\", \"No records\")\n=UNIQUE(A2:A500)\n=SORT(UNIQUE(A2:A500))\n=SORTBY(A2:C100, D2:D100, -1)\n=SEQUENCE(10, 1, 100, 10)\n\n# Spill Range Reference:\n=COUNTA(F2#)\n=SUM(G2#)",
    "examples": [
      {
        "title": {
          "en": "Live Sorted Unique Dropdown Source",
          "vi": "Tạo Nguồn Danh Sách Duy Nhất Đã Sắp Xếp Tự Động"
        },
        "code": "Raw Customer Names in A2:A500 with many duplicates\n\nFormula in F2: =SORT(UNIQUE(A2:A500))\nResult: Automatically generates an alphabetical list of unique customer names.",
        "description": {
          "en": "Combining SORT and UNIQUE creates a dynamic dimension table that updates whenever new names are typed.",
          "vi": "Kết hợp SORT và UNIQUE tạo ra danh mục khách hàng duy nhất tự động cập nhật khi có tên mới."
        }
      },
      {
        "title": {
          "en": "Multi-Condition FILTER for VIP High-Value Deals",
          "vi": "Lọc Đa Điều Kiện Khách Hàng VIP Giao Dịch Lớn Bằng FILTER"
        },
        "code": "Orders Table in A2:E1000 (Col B: Status, Col D: Revenue)\n\nFormula in G2: =FILTER(A2:E1000, (B2:B1000=\"VIP\") * (D2:D1000>=50000), \"No VIP Deals\")",
        "description": {
          "en": "Multiplying boolean conditions with (*) enforces AND logic inside dynamic array formulas.",
          "vi": "Nhân các điều kiện logic bằng dấu sao (*) áp dụng logic VÀ trong các công thức mảng động."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Encountering a #SPILL! error because a typed note or merged cell is occupying space in the formula's expansion path.",
          "vi": "Gặp lỗi #SPILL! do có ghi chú chữ hoặc ô bị gộp nằm chắn trên đường mở rộng kết quả của công thức."
        },
        "correction": {
          "en": "Delete blocking cell content or unmerge cells below and to the right of the dynamic formula.",
          "vi": "Xóa nội dung ô gây cản trở hoặc bỏ gộp ô ở phía dưới và bên phải của công thức mảng."
        }
      },
      {
        "mistake": {
          "en": "Using AND() or OR() inside FILTER() instead of math operators (* for AND, + for OR).",
          "vi": "Sử dụng hàm AND() hoặc OR() bên trong FILTER() thay vì toán tử số học (* cho VÀ, + cho HOẶC)."
        },
        "correction": {
          "en": "AND/OR aggregate arrays to single values. Use boolean multiplication (*) for AND, and addition (+) for OR.",
          "vi": "AND/OR gộp mảng thành một giá trị đơn. Dùng phép nhân (*) cho điều kiện VÀ, và phép cộng (+) cho HOẶC."
        }
      }
    ],
    "tips": [
      {
        "en": "Spill Range Operator: Typing F2# references the entire dynamic array result block, regardless of its size.",
        "vi": "Toán tử vùng tràn: Gõ F2# sẽ tự động trỏ đến toàn bộ khối kết quả của mảng động dù độ dài là bao nhiêu dòng."
      },
      {
        "en": "Dynamic Month Headers: Use =TEXT(DATE(2026, SEQUENCE(1, 12, 1, 1), 1), \"mmm\") to generate 12 monthly column headers across a row in a single cell!",
        "vi": "Tạo tiêu đề 12 tháng tự động: Dùng =TEXT(DATE(2026, SEQUENCE(1, 12, 1, 1), 1), \"mmm\") để tạo tiêu đề 12 tháng chỉ trong 1 ô!"
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l14_ex1",
      "type": "complete_code",
      "title": {
        "en": "Extract Unique Sorted Region Names",
        "vi": "Trích Xuất Danh Sách Vùng Duy Nhất Đã Sắp Xếp"
      },
      "instruction": {
        "en": "Write a formula combining SORT and UNIQUE to generate an alphabetized list of unique regions from A2:A100.",
        "vi": "Viết công thức kết hợp SORT và UNIQUE để tạo danh sách các vùng duy nhất đã sắp xếp theo bảng chữ cái từ A2:A100."
      },
      "starterCode": "=SORT(UNIQUE(",
      "solutionCode": "=SORT(UNIQUE(A2:A100))",
      "expectedOutput": "=SORT(UNIQUE(A2:A100))",
      "hint": {
        "en": "Pass range A2:A100 inside UNIQUE and wrap with SORT.",
        "vi": "Truyền dải ô A2:A100 vào trong UNIQUE và bọc bằng SORT."
      },
      "explanation": {
        "en": "=SORT(UNIQUE(A2:A100)) deduplicates region names and sorts them alphabetically.",
        "vi": "=SORT(UNIQUE(A2:A100)) loại bỏ trùng lặp và sắp xếp tên vùng theo thứ tự chữ cái."
      }
    },
    {
      "id": "excel_l14_ex2",
      "type": "complete_code",
      "title": {
        "en": "Filter Active Status Records",
        "vi": "Lọc Các Bản Ghi Trạng Thái Active"
      },
      "instruction": {
        "en": "Write a FILTER formula to extract all rows from data table A2:D50 where Status in column C (C2:C50) equals \"Active\". Return \"No Active\" if empty.",
        "vi": "Viết công thức FILTER trích xuất tất cả các dòng từ bảng A2:D50 có Trạng thái ở cột C (C2:C50) là \"Active\". Trả về \"No Active\" nếu rỗng."
      },
      "starterCode": "=FILTER(A2:D50, ",
      "solutionCode": "=FILTER(A2:D50, C2:C50=\"Active\", \"No Active\")",
      "expectedOutput": "=FILTER(A2:D50, C2:C50=\"Active\", \"No Active\")",
      "hint": {
        "en": "Pass array A2:D50, include C2:C50=\"Active\", and if_empty \"No Active\".",
        "vi": "Truyền mảng A2:D50, điều kiện C2:C50=\"Active\", và nếu rỗng là \"No Active\"."
      },
      "explanation": {
        "en": "FILTER extracts all matching rows dynamically and spills the result.",
        "vi": "FILTER trích xuất động tất cả các dòng khớp và tràn kết quả ra trang tính."
      }
    }
  ],
  "challenge": {
    "id": "excel_l14_challenge",
    "title": {
      "en": "Build Multi-Criteria Filter and Sort Pipeline",
      "vi": "Xây Dựng Quy Trình Lọc Và Sắp Xếp Đa Tiêu Chí"
    },
    "description": {
      "en": "Construct a formula to filter table A2:D200 for rows where Region in B2:B200 is \"West\" AND Sales in D2:D200 >= 10000, and sort the resulting filtered array descending by the Sales column (column index 4).",
      "vi": "Xây dựng công thức lọc bảng A2:D200 lấy các dòng có Khu vực ở B2:B200 là \"West\" VÀ Doanh số ở D2:D200 >= 10000, sau đó sắp xếp mảng kết quả giảm dần theo cột Doanh số (cột thứ 4)."
    },
    "requirements": [
      {
        "en": "Use FILTER with boolean multiplication (*) for the AND condition",
        "vi": "Sử dụng FILTER với phép nhân logic (*) cho điều kiện VÀ"
      },
      {
        "en": "Wrap the FILTER result inside SORT by column index 4 descending (-1)",
        "vi": "Bọc kết quả FILTER bên trong SORT theo cột 4 giảm dần (-1)"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=SORT(FILTER(A2:D200, (B2:B200=\"West\")*(D2:D200>=10000), \"None\"), 4, -1)",
    "hints": [
      {
        "en": "Syntax: =SORT(FILTER(A2:D200, (B2:B200=\"West\")*(D2:D200>=10000), \"None\"), 4, -1)",
        "vi": "Cú pháp: =SORT(FILTER(A2:D200, (B2:B200=\"West\")*(D2:D200>=10000), \"None\"), 4, -1)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l14_q1",
      "type": "single_choice",
      "question": {
        "en": "What symbol is used in Excel to reference the entire dynamic spill range originating at cell F2?",
        "vi": "Ký hiệu nào được dùng trong Excel để tham chiếu toàn bộ vùng tràn động bắt đầu từ ô F2?"
      },
      "options": [
        {
          "en": "`F2#` (The Spill Range Operator)",
          "vi": "`F2#` (Toán tử vùng tràn Spill)"
        },
        {
          "en": "`F2*`",
          "vi": "`F2*`"
        },
        {
          "en": "`F2:ALL`",
          "vi": "`F2:ALL`"
        },
        {
          "en": "`$F$2:SPILL`",
          "vi": "`$F$2:SPILL`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The hashtag (#) appended to the top-left cell reference dynamically refers to the full array spill footprint.",
        "vi": "Dấu thăng (#) đặt sau ô gốc phía trên bên trái sẽ tự động trỏ đến toàn bộ kích thước của vùng tràn mảng động."
      },
      "difficulty": "easy",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q2",
      "type": "single_choice",
      "question": {
        "en": "How do you express an `AND` condition between two ranges inside the `FILTER` function?",
        "vi": "Làm thế nào để biểu thị điều kiện `VÀ` (AND) giữa hai dải ô bên trong hàm `FILTER`?"
      },
      "options": [
        {
          "en": "Multiply the boolean expressions: `(Range1 = \"Val1\") * (Range2 > 100)`",
          "vi": "Nhân các biểu thức logic: `(Vung1 = \"Val1\") * (Vung2 > 100)`"
        },
        {
          "en": "Use the `AND()` function: `AND(Range1 = \"Val1\", Range2 > 100)`",
          "vi": "Dùng hàm `AND()`: `AND(Vung1 = \"Val1\", Vung2 > 100)`"
        },
        {
          "en": "Use the ampersand `&` operator",
          "vi": "Dùng toán tử và `&`"
        },
        {
          "en": "Separate them with commas inside include",
          "vi": "Phân cách bằng dấu phẩy trong đối số include"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In array formulas, boolean multiplication (*) performs element-by-element AND logic (TRUE * TRUE = 1, TRUE * FALSE = 0).",
        "vi": "Trong công thức mảng, phép nhân logic (*) thực hiện logic VÀ theo từng phần tử (TRUE * TRUE = 1, TRUE * FALSE = 0)."
      },
      "difficulty": "medium",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q3",
      "type": "single_choice",
      "question": {
        "en": "What does `=SEQUENCE(5, 1, 10, 2)` generate in Excel?",
        "vi": "Công thức `=SEQUENCE(5, 1, 10, 2)` tạo ra chuỗi giá trị nào trong Excel?"
      },
      "options": [
        {
          "en": "A column of 5 numbers starting at 10 incrementing by 2: `10, 12, 14, 16, 18`",
          "vi": "Một cột gồm 5 số bắt đầu từ 10 với bước nhảy 2: `10, 12, 14, 16, 18`"
        },
        {
          "en": "A 5x5 grid of numbers",
          "vi": "Một bảng số kích thước 5x5"
        },
        {
          "en": "The numbers 5, 10, 15, 20, 25",
          "vi": "Các số 5, 10, 15, 20, 25"
        },
        {
          "en": "A list of 10 numbers",
          "vi": "Danh sách gồm 10 số"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "SEQUENCE(rows, columns, start, step) creates 5 rows, 1 column, starting at 10 with step 2 (10, 12, 14, 16, 18).",
        "vi": "SEQUENCE(so_hang, so_cot, bat_dau, buoc_nhay) tạo 5 hàng, 1 cột, bắt đầu từ 10 với bước nhảy 2 (10, 12, 14, 16, 18)."
      },
      "difficulty": "medium",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q4",
      "type": "single_choice",
      "question": {
        "en": "What does the function `=UNIQUE(A2:A20)` do?",
        "vi": "Hàm `=UNIQUE(A2:A20)` làm nhiệm vụ gì?"
      },
      "options": [
        {
          "en": "Extracts a deduplicated list containing only distinct items from range A2:A20",
          "vi": "Trích xuất danh sách không trùng lặp chỉ gồm các phần tử riêng biệt từ vùng A2:A20"
        },
        {
          "en": "Checks if all numbers are prime",
          "vi": "Kiểm tra xem tất cả các số có phải số nguyên tố không"
        },
        {
          "en": "Counts total unique items",
          "vi": "Đếm tổng số phần tử duy nhất"
        },
        {
          "en": "Deletes duplicate rows permanently from the sheet",
          "vi": "Xóa vĩnh viễn các dòng trùng lặp khỏi trang tính"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "UNIQUE evaluates the input vector and outputs a spilled dynamic array of unique items.",
        "vi": "Hàm UNIQUE đánh giá mảng đầu vào và xuất ra mảng tràn động các phần tử duy nhất."
      },
      "difficulty": "easy",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q5",
      "type": "single_choice",
      "question": {
        "en": "How do you express an `OR` condition between criteria inside `FILTER`?",
        "vi": "Làm thế nào để biểu thị điều kiện `HOẶC` (OR) giữa các tiêu chí bên trong hàm `FILTER`?"
      },
      "options": [
        {
          "en": "Add the boolean expressions together using the plus operator: `(Range1=\"A\") + (Range1=\"B\")`",
          "vi": "Cộng các biểu thức logic lại với nhau bằng toán tử cộng: `(Vung1=\"A\") + (Vung1=\"B\")`"
        },
        {
          "en": "Use `OR(Range1=\"A\", Range1=\"B\")`",
          "vi": "Dùng `OR(Vung1=\"A\", Vung1=\"B\")`"
        },
        {
          "en": "Use the `||` symbol",
          "vi": "Dùng ký hiệu `||`"
        },
        {
          "en": "Nest two FILTER functions",
          "vi": "Lồng hai hàm FILTER"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Boolean addition (+) produces values >= 1 for any row where at least one condition evaluates to TRUE, acting as OR.",
        "vi": "Phép cộng logic (+) tạo ra giá trị >= 1 cho bất kỳ dòng nào có ít nhất một điều kiện là TRUE, đóng vai trò là logic HOẶC."
      },
      "difficulty": "medium",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q6",
      "type": "single_choice",
      "question": {
        "en": "What parameter in `SORT` determines descending order?",
        "vi": "Tham số nào trong `SORT` quy định sắp xếp theo thứ tự giảm dần?"
      },
      "options": [
        {
          "en": "`sort_order` set to `-1`",
          "vi": "`sort_order` đặt là `-1`"
        },
        {
          "en": "`sort_order` set to `1`",
          "vi": "`sort_order` đặt là `1`"
        },
        {
          "en": "`\"DESC\"`",
          "vi": "`\"DESC\"`"
        },
        {
          "en": "`FALSE`",
          "vi": "`FALSE`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "1 represents Ascending order (A-Z, 0-9); -1 represents Descending order (Z-A, 9-0).",
        "vi": "1 biểu thị thứ tự Tăng dần (A-Z, 0-9); -1 biểu thị thứ tự Giảm dần (Z-A, 9-0)."
      },
      "difficulty": "easy",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q7",
      "type": "true_false",
      "question": {
        "en": "True or False: A single dynamic array formula is entered into one cell, but automatically populates multiple surrounding cells without dragging.",
        "vi": "Đúng hay Sai: Một công thức mảng động chỉ được nhập vào một ô duy nhất nhưng tự động điền kết quả vào nhiều ô xung quanh mà không cần kéo sao chép."
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
        "en": "True. Dynamic arrays automatically spill down rows and across columns from the single formula origin cell.",
        "vi": "Đúng. Mảng động tự động tràn xuống các hàng và qua các cột từ một ô gốc chứa công thức duy nhất."
      },
      "difficulty": "easy",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q8",
      "type": "single_choice",
      "question": {
        "en": "What is the main difference between `SORT` and `SORTBY` in Excel?",
        "vi": "Sự khác biệt chính giữa `SORT` và `SORTBY` trong Excel là gì?"
      },
      "options": [
        {
          "en": "SORT sorts by a column index inside the array; SORTBY sorts based on external/independent arrays or multiple custom vectors",
          "vi": "SORT sắp xếp theo số thứ tự cột bên trong mảng; SORTBY sắp xếp dựa trên các mảng tiêu chí độc lập bên ngoài hoặc nhiều vector tùy chỉnh"
        },
        {
          "en": "SORT is for numbers; SORTBY is for text",
          "vi": "SORT dành cho số; SORTBY dành cho văn bản"
        },
        {
          "en": "SORTBY only sorts alphabetically",
          "vi": "SORTBY chỉ sắp xếp theo bảng chữ cái"
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
        "en": "SORT uses internal column index numbers (e.g. 2). SORTBY allows passing external range vectors to control sort hierarchy.",
        "vi": "SORT sử dụng số thứ tự cột nội bộ (ví dụ 2). SORTBY cho phép truyền các vector vùng bên ngoài để kiểm soát thứ tự phân cấp sắp xếp."
      },
      "difficulty": "medium",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q9",
      "type": "single_choice",
      "question": {
        "en": "If cell J2 contains `=FILTER(A2:B100, C2:C100=\"VIP\")`, how would you count how many VIP rows were returned?",
        "vi": "Nếu ô J2 chứa công thức `=FILTER(A2:B100, C2:C100=\"VIP\")`, bạn sẽ đếm xem có bao nhiêu dòng VIP được trả về như thế nào?"
      },
      "options": [
        {
          "en": "`=ROWS(J2#)`",
          "vi": "`=ROWS(J2#)`"
        },
        {
          "en": "`=COUNT(J2)`",
          "vi": "`=COUNT(J2)`"
        },
        {
          "en": "`=SUM(J2)`",
          "vi": "`=SUM(J2)`"
        },
        {
          "en": "`=FILTERCOUNT(J2)`",
          "vi": "`=FILTERCOUNT(J2)`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Using ROWS(J2#) measures the vertical row dimension of the dynamic spill footprint.",
        "vi": "Dùng ROWS(J2#) sẽ đo lường chính xác số lượng hàng theo chiều dọc của toàn bộ vùng tràn động."
      },
      "difficulty": "medium",
      "topicId": "excel_dynamic_arrays"
    },
    {
      "id": "excel_l14_q10",
      "type": "single_choice",
      "question": {
        "en": "What happens if the `[if_empty]` argument in the `FILTER` function is omitted and no matching records are found?",
        "vi": "Điều gì xảy ra nếu đối số `[if_empty]` trong hàm `FILTER` bị bỏ qua và không tìm thấy bản ghi nào khớp?"
      },
      "options": [
        {
          "en": "Excel returns the `#CALC!` error",
          "vi": "Excel trả về lỗi `#CALC!`"
        },
        {
          "en": "Excel returns a blank cell",
          "vi": "Excel trả về ô trống"
        },
        {
          "en": "Excel returns 0",
          "vi": "Excel trả về 0"
        },
        {
          "en": "Excel crashes",
          "vi": "Excel bị sập"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "If FILTER encounters an empty result set without an [if_empty] handler, it raises the #CALC! (Calculation error) warning.",
        "vi": "Nếu FILTER gặp tập kết quả rỗng mà không có tham số [if_empty], nó sẽ phát sinh cảnh báo lỗi #CALC! (Lỗi tính toán)."
      },
      "difficulty": "hard",
      "topicId": "excel_dynamic_arrays"
    }
  ]
};
export default lesson14;
