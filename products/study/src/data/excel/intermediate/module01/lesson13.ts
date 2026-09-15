import { Lesson } from '../../../../types';

export const lesson13: Lesson = {
  "id": "excel_lesson_13",
  "order": 13,
  "moduleId": "excel_mod_3",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_error_handling",
  "title": {
    "en": "Formula Auditing, Diagnostic Inspections & Error Handling: IFERROR, IFNA & IS Functions",
    "vi": "Kiểm Tra Công Thức, Chẩn Đoán & Xử Lý Lỗi: IFERROR, IFNA & Các Hàm IS"
  },
  "summary": {
    "en": "Master Excel error taxonomy (#N/A, #DIV/0!, #VALUE!, #REF!, #NAME?, #NUM!, #SPILL!), clean downstream workflows with IFERROR and IFNA, validate data types with ISNUMBER/ISBLANK, and audit complex models with Trace Precedents and Evaluate Formula.",
    "vi": "Làm chủ phân loại các mã lỗi Excel (#N/A, #DIV/0!, #VALUE!, #REF!, #NAME?, #NUM!, #SPILL!), làm sạch luồng tính toán với IFERROR và IFNA, kiểm tra kiểu dữ liệu với ISNUMBER/ISBLANK và kiểm toán mô hình phức tạp bằng Trace Precedents và Evaluate Formula."
  },
  "learn": {
    "introduction": {
      "en": "Uncaught errors in financial spreadsheets are catastrophic: a single #DIV/0! in a sub-schedule cascades upward, corrupting totals across executive summary dashboards. Professional financial engineers build defensive formulas using targeted error handlers and employ visual audit tools to trace calculation lineages.",
      "vi": "Các lỗi không được xử lý trong bảng tính tài chính có thể gây hậu quả nghiêm trọng: một lỗi #DIV/0! đơn lẻ trong bảng phụ sẽ lan truyền lên trên, làm hỏng toàn bộ số tổng trên báo cáo quản trị cấp cao. Các chuyên gia tài chính luôn xây dựng công thức phòng thủ bằng các hàm xử lý lỗi có mục tiêu và sử dụng công cụ kiểm toán trực quan để truy vết dòng tính toán."
    },
    "conceptExplanation": {
      "en": "### 1. Excel Error Taxonomy\n- **`#N/A`**: Value not available (lookup key does not exist).\n- **`#DIV/0!`**: Division by zero or an empty cell.\n- **`#VALUE!`**: Wrong data type (e.g. attempting to multiply text by a number).\n- **`#REF!`**: Invalid cell reference (referenced row or column was physically deleted).\n- **`#NAME?`**: Misspelled function name (e.g. `=SUMM(A1:A5)`) or unquoted text.\n- **`#NUM!`**: Invalid numeric calculation (e.g. square root of a negative number).\n- **`#SPILL!`**: Dynamic array formula blocked by populated cells in the spill range.\n\n### 2. Error Trapping Functions\n- **`=IFERROR(value, value_if_error)`**: Traps **all** error types and replaces them with a fallback.\n- **`=IFNA(value, value_if_na)`**: Traps **only** #N/A errors, allowing true mathematical defects (#REF!, #DIV/0!) to surface for debugging.\n- **`IS` Type Checkers**: `ISBLANK()`, `ISNUMBER()`, `ISTEXT()`, `ISERROR()`.\n\n### 3. Visual Formula Auditing Tools (Formulas Tab)\n- **Trace Precedents (Ctrl + [)**: Draws blue arrows to cells that supply data to the active formula.\n- **Trace Dependents (Ctrl + ])**: Draws arrows to cells that rely on the active formula.\n- **Evaluate Formula (Alt + M + V)**: Steps through nested calculations piece by piece like a software debugger!\n- **Show Formulas (Ctrl + `)**: Toggles whole worksheet between formula results and raw formula code.",
      "vi": "### 1. Phân Loại Các Mã Lỗi Phổ Biến Trong Excel\n- **`#N/A`**: Giá trị không tồn tại (khóa tra cứu không có trong bảng đích).\n- **`#DIV/0!`**: Chia cho số 0 hoặc chia cho ô trống.\n- **`#VALUE!`**: Sai kiểu dữ liệu (ví dụ cố nhân văn bản với một số).\n- **`#REF!`**: Tham chiếu không hợp lệ (hàng hoặc cột đang được tham chiếu đã bị xóa).\n- **`#NAME?`**: Gõ sai tên hàm (ví dụ `=SUMM(A1:A5)`) hoặc chuỗi không có dấu ngoặc kép.\n- **`#NUM!`**: Lỗi tính toán số học (ví dụ căn bậc hai của số âm).\n- **`#SPILL!`**: Công thức mảng động bị cản trở bởi các ô có dữ liệu trong vùng tràn.\n\n### 2. Các Hàm Bắt Và Xử Lý Lỗi\n- **`=IFERROR(gia_tri, gia_tri_khi_loi)`**: Bắt **tất cả** các loại lỗi và thay thế bằng giá trị dự phòng.\n- **`=IFNA(gia_tri, gia_tri_khi_na)`**: **Chỉ bắt duy nhất** lỗi #N/A, cho phép các lỗi toán học thực sự (#REF!, #DIV/0!) hiển thị để kiểm tra sửa lỗi.\n- **Các hàm kiểm tra kiểu `IS`**: `ISBLANK()`, `ISNUMBER()`, `ISTEXT()`, `ISERROR()`.\n\n### 3. Công Cụ Kiểm Toán Công Thức Trực Quan (Thẻ Formulas)\n- **Trace Precedents (Ctrl + [)**: Vẽ mũi tên xanh trỏ đến các ô cung cấp dữ liệu cho công thức đang chọn.\n- **Trace Dependents (Ctrl + ])**: Vẽ mũi tên trỏ đến các ô đang phụ thuộc vào công thức đang chọn.\n- **Evaluate Formula (Alt + M + V)**: Chạy từng bước tính toán lồng nhau như một trình gỡ lỗi (debugger) chuyên nghiệp!\n- **Show Formulas (Ctrl + `)**: Bật/tắt toàn bộ trang tính giữa hiển thị kết quả và hiển thị mã công thức gốc."
    },
    "syntax": "# Clean Error Handlers:\n=IFERROR(Revenue / Units, 0)\n=IFNA(VLOOKUP(A2, Table, 2, FALSE), \"Not in Catalog\")\n\n# Type Checking:\n=IF(ISBLANK(A2), \"Missing Input\", A2 * 1.1)\n=IF(ISNUMBER(B2), B2 * Rate, \"Invalid Number\")",
    "examples": [
      {
        "title": {
          "en": "Defensive Division with IFERROR",
          "vi": "Phép Chia Phòng Thủ Bằng IFERROR"
        },
        "code": "Profit in A2: 5000, Units in B2: 0\n\nUnsafe Formula: =A2 / B2          -> Returns: #DIV/0!\nDefensive Formula: =IFERROR(A2 / B2, 0) -> Returns: 0",
        "description": {
          "en": "Trapping division by zero prevents cascading errors throughout annual summary rollups.",
          "vi": "Bắt lỗi chia cho số 0 ngăn chặn lỗi lan truyền trên toàn bộ báo cáo tổng hợp năm."
        }
      },
      {
        "title": {
          "en": "Selective #N/A Trapping with IFNA",
          "vi": "Bắt Lỗi Chọn Lọc #N/A Bằng IFNA"
        },
        "code": "Lookup Formula: =IFNA(XLOOKUP(A2, Catalog!A:A, Catalog!C:C), \"Unlisted Item\")",
        "description": {
          "en": "IFNA handles missing catalog items cleanly while allowing real syntax or reference errors to remain visible.",
          "vi": "IFNA xử lý sạch sẽ các mặt hàng chưa có trong danh mục trong khi vẫn để lộ các lỗi cú pháp hoặc tham chiếu thực sự để sửa."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Overusing =IFERROR(formula, \"\") indiscriminately, which masks fatal typos (#NAME?) and broken references (#REF!), creating silent calculation corruptions.",
          "vi": "Lạm dụng =IFERROR(cong_thuc, \"\") bừa bãi, che giấu các lỗi gõ sai tên hàm (#NAME?) và lỗi xóa mất ô tham chiếu (#REF!), tạo ra sai lệch số liệu ngầm."
        },
        "correction": {
          "en": "Use targeted IFNA() for lookups, and test specific boundary conditions like =IF(B2=0, 0, A2/B2).",
          "vi": "Sử dụng IFNA() có mục tiêu cho các phép tra cứu và kiểm tra điều kiện biên cụ thể như =IF(B2=0, 0, A2/B2)."
        }
      }
    ],
    "tips": [
      {
        "en": "Evaluate Formula Step-by-Step: Press Alt + M + V to inspect sub-evaluations inside complex nested formulas to see exactly which sub-clause produces an error.",
        "vi": "Tính toán từng bước Evaluate Formula: Nhấn Alt + M + V để kiểm tra từng phép tính con bên trong công thức lồng phức tạp để xem chính xác vế nào gây ra lỗi."
      },
      {
        "en": "Toggle Formula View: Press Ctrl + ` (backtick) to instantly view all formula code across the entire spreadsheet grid at once.",
        "vi": "Xem nhanh mã công thức: Nhấn Ctrl + ` (dấu huyền) để xem ngay toàn bộ mã công thức trên toàn bộ lưới bảng tính."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l13_ex1",
      "type": "complete_code",
      "title": {
        "en": "Trap Division by Zero Error",
        "vi": "Bắt Lỗi Chia Cho Số 0"
      },
      "instruction": {
        "en": "Wrap the division formula A2 / B2 with IFERROR to return 0 if an error occurs.",
        "vi": "Bọc công thức chia A2 / B2 bằng hàm IFERROR để trả về 0 nếu xảy ra lỗi."
      },
      "starterCode": "=IFERROR(A2 / B2, ",
      "solutionCode": "=IFERROR(A2 / B2, 0)",
      "expectedOutput": "=IFERROR(A2 / B2, 0)",
      "hint": {
        "en": "Pass 0 as value_if_error.",
        "vi": "Truyền 0 làm giá trị khi có lỗi."
      },
      "explanation": {
        "en": "=IFERROR(A2 / B2, 0) replaces #DIV/0! or other errors with 0.",
        "vi": "=IFERROR(A2 / B2, 0) thay thế lỗi #DIV/0! hoặc các lỗi khác bằng 0."
      }
    },
    {
      "id": "excel_l13_ex2",
      "type": "complete_code",
      "title": {
        "en": "Validate Numeric Input before Multiplication",
        "vi": "Kiểm Tra Dữ Liệu Số Trước Khi Nhân"
      },
      "instruction": {
        "en": "Write an IF statement with ISNUMBER: If cell C2 is a number, return C2 * 1.1, otherwise return \"Invalid\".",
        "vi": "Viết câu lệnh IF với ISNUMBER: Nếu ô C2 là một số, trả về C2 * 1.1, ngược lại trả về \"Invalid\"."
      },
      "starterCode": "=IF(ISNUMBER(C2), ",
      "solutionCode": "=IF(ISNUMBER(C2), C2 * 1.1, \"Invalid\")",
      "expectedOutput": "=IF(ISNUMBER(C2), C2 * 1.1, \"Invalid\")",
      "hint": {
        "en": "Pass C2 * 1.1 for true, and \"Invalid\" for false.",
        "vi": "Truyền C2 * 1.1 khi đúng và \"Invalid\" khi sai."
      },
      "explanation": {
        "en": "ISNUMBER ensures calculations only run on valid numeric data types.",
        "vi": "ISNUMBER đảm bảo các phép tính chỉ được thực hiện trên kiểu dữ liệu số hợp lệ."
      }
    }
  ],
  "challenge": {
    "id": "excel_l13_challenge",
    "title": {
      "en": "Construct Robust Diagnostic Pipeline with IFNA",
      "vi": "Xây Dựng Quy Trình Chẩn Đoán Lỗi Bền Vững Bằng IFNA"
    },
    "description": {
      "en": "Construct a formula for cell C2 that retrieves the price from VLOOKUP(A2, Catalog!$A$2:$B$100, 2, FALSE). If the item is not found (#N/A), output \"Uncataloged Item\".",
      "vi": "Xây dựng công thức cho ô C2 lấy đơn giá từ VLOOKUP(A2, Catalog!$A$2:$B$100, 2, FALSE). Nếu không tìm thấy sản phẩm (#N/A), xuất \"Uncataloged Item\"."
    },
    "requirements": [
      {
        "en": "Use IFNA instead of generic IFERROR",
        "vi": "Sử dụng IFNA thay vì IFERROR chung chung"
      },
      {
        "en": "Provide exact fallback string \"Uncataloged Item\"",
        "vi": "Cung cấp chuỗi dự phòng chính xác \"Uncataloged Item\""
      }
    ],
    "starterCode": "=",
    "solutionCode": "=IFNA(VLOOKUP(A2, Catalog!$A$2:$B$100, 2, FALSE), \"Uncataloged Item\")",
    "hints": [
      {
        "en": "Wrap with: =IFNA(VLOOKUP(...), \"Uncataloged Item\")",
        "vi": "Bọc ngoài bằng: =IFNA(VLOOKUP(...), \"Uncataloged Item\")"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l13_q1",
      "type": "single_choice",
      "question": {
        "en": "What causes the `#REF!` error in Excel formulas?",
        "vi": "Nguyên nhân nào gây ra lỗi `#REF!` trong công thức Excel?"
      },
      "options": [
        {
          "en": "A cell, row, or column referenced by the formula was physically deleted",
          "vi": "Một ô, hàng hoặc cột đang được công thức tham chiếu đã bị xóa khỏi bảng tính"
        },
        {
          "en": "A function name was misspelled",
          "vi": "Tên hàm bị gõ sai chính tả"
        },
        {
          "en": "A number was divided by zero",
          "vi": "Một số bị chia cho số 0"
        },
        {
          "en": "The formula is too long",
          "vi": "Công thức quá dài"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "#REF! occurs when a formula refers to a cell coordinate that no longer exists because it was deleted.",
        "vi": "Lỗi #REF! xảy ra khi công thức trỏ đến một tọa độ ô không còn tồn tại do đã bị xóa."
      },
      "difficulty": "easy",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q2",
      "type": "single_choice",
      "question": {
        "en": "Why is `IFNA()` preferred over `IFERROR()` for lookup formulas?",
        "vi": "Tại sao `IFNA()` lại được ưu tiên hơn `IFERROR()` đối với các công thức tra cứu?"
      },
      "options": [
        {
          "en": "It only catches lookup misses (#N/A), allowing real bugs like #REF! or #NAME? to remain visible for debugging",
          "vi": "Nó chỉ bắt lỗi không tìm thấy (#N/A), cho phép các lỗi thực sự như #REF! hoặc #NAME? hiển thị để gỡ lỗi"
        },
        {
          "en": "IFNA runs 10x faster",
          "vi": "IFNA chạy nhanh hơn 10 lần"
        },
        {
          "en": "IFNA works on text only",
          "vi": "IFNA chỉ hoạt động trên văn bản"
        },
        {
          "en": "IFERROR is deprecated",
          "vi": "IFERROR đã bị loại bỏ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "IFERROR masks all errors (including formula typos and deleted references). IFNA specifically isolates missing lookup keys without hiding structural bugs.",
        "vi": "IFERROR che giấu mọi lỗi (bao gồm cả lỗi gõ sai và tham chiếu bị xóa). IFNA khoanh vùng cụ thể lỗi thiếu khóa tra cứu mà không che lấp các lỗi cấu trúc."
      },
      "difficulty": "medium",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q3",
      "type": "single_choice",
      "question": {
        "en": "What causes the `#NAME?` error in Microsoft Excel?",
        "vi": "Nguyên nhân nào dẫn đến lỗi `#NAME?` trong Microsoft Excel?"
      },
      "options": [
        {
          "en": "Excel does not recognize text in a formula, usually due to a misspelled function name or missing quotes around a text string",
          "vi": "Excel không nhận diện được văn bản trong công thức, thường do gõ sai tên hàm hoặc thiếu dấu ngoặc kép quanh chuỗi văn bản"
        },
        {
          "en": "The worksheet name is too long",
          "vi": "Tên trang tính quá dài"
        },
        {
          "en": "A negative number was entered",
          "vi": "Nhập số âm"
        },
        {
          "en": "A column is too narrow",
          "vi": "Cột quá hẹp"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "#NAME? indicates an unrecognized token, such as =VLOKUP instead of =VLOOKUP or typing text without double quotes.",
        "vi": "#NAME? biểu thị một từ khóa không xác định, như =VLOKUP thay vì =VLOOKUP hoặc gõ văn bản mà không có dấu ngoặc kép."
      },
      "difficulty": "easy",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q4",
      "type": "single_choice",
      "question": {
        "en": "What feature visually draws blue tracer arrows from cells that provide input values to the currently selected formula cell?",
        "vi": "Tính năng nào vẽ các mũi tên chỉ vết màu xanh từ các ô cung cấp giá trị đầu vào đến ô công thức đang được chọn?"
      },
      "options": [
        {
          "en": "Trace Precedents",
          "vi": "Trace Precedents"
        },
        {
          "en": "Trace Dependents",
          "vi": "Trace Dependents"
        },
        {
          "en": "Show Formulas",
          "vi": "Show Formulas"
        },
        {
          "en": "Error Checking",
          "vi": "Error Checking"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Trace Precedents illustrates the upstream cells feeding data directly into the active cell formula.",
        "vi": "Trace Precedents thể hiện trực quan các ô nguồn cấp dữ liệu trực tiếp vào công thức của ô đang chọn."
      },
      "difficulty": "easy",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q5",
      "type": "single_choice",
      "question": {
        "en": "What causes the `#SPILL!` error in modern dynamic array formulas?",
        "vi": "Nguyên nhân nào gây ra lỗi `#SPILL!` trong các công thức mảng động hiện đại?"
      },
      "options": [
        {
          "en": "One or more populated cells or merged cells are blocking the range where the array results need to expand",
          "vi": "Một hoặc nhiều ô có dữ liệu hoặc ô bị gộp đang cản trở vùng mà kết quả mảng cần mở rộng ra"
        },
        {
          "en": "The computer ran out of memory",
          "vi": "Máy tính bị hết bộ nhớ"
        },
        {
          "en": "The formula has a circular reference",
          "vi": "Công thức bị tham chiếu vòng lặp"
        },
        {
          "en": "The workbook is locked with a password",
          "vi": "Bảng tính bị khóa mật khẩu"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "#SPILL! occurs when an array formula attempts to return multiple values but non-empty cells obstruct the spill boundary.",
        "vi": "Lỗi #SPILL! xảy ra khi một công thức mảng muốn trả về nhiều giá trị nhưng các ô không trống cản đường biên tràn dữ liệu."
      },
      "difficulty": "medium",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q6",
      "type": "single_choice",
      "question": {
        "en": "Which tool allows you to step through and debug each nested calculation inside a formula piece by piece?",
        "vi": "Công cụ nào cho phép bạn chạy từng bước và gỡ lỗi từng phép tính con lồng nhau bên trong công thức?"
      },
      "options": [
        {
          "en": "Evaluate Formula (Formulas tab)",
          "vi": "Evaluate Formula (thẻ Formulas)"
        },
        {
          "en": "Goal Seek",
          "vi": "Goal Seek"
        },
        {
          "en": "Data Validation",
          "vi": "Data Validation"
        },
        {
          "en": "Conditional Formatting",
          "vi": "Conditional Formatting"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Evaluate Formula steps through underlined expressions sequentially to reveal intermediate calculation results.",
        "vi": "Evaluate Formula chạy tuần tự qua từng biểu thức được gạch chân để hiển thị kết quả tính toán trung gian."
      },
      "difficulty": "easy",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q7",
      "type": "single_choice",
      "question": {
        "en": "What does `=ISBLANK(A1)` return if cell A1 contains an empty text string `\"\"` produced by a formula?",
        "vi": "Công thức `=ISBLANK(A1)` trả về kết quả gì nếu ô A1 chứa một chuỗi văn bản rỗng `\"\"` được tạo ra bởi một công thức?"
      },
      "options": [
        {
          "en": "FALSE (the cell contains a formula returning a zero-length string, so it is not truly blank)",
          "vi": "FALSE (ô có chứa công thức trả về chuỗi độ dài bằng 0 nên không phải là ô thực sự trống)"
        },
        {
          "en": "TRUE",
          "vi": "TRUE"
        },
        {
          "en": "#VALUE!",
          "vi": "#VALUE!"
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
        "en": "ISBLANK returns TRUE only for completely empty, unpopulated cells with no content and no formula.",
        "vi": "ISBLANK chỉ trả về TRUE cho các ô hoàn toàn trống rỗng, không có dữ liệu và không chứa công thức nào."
      },
      "difficulty": "hard",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q8",
      "type": "single_choice",
      "question": {
        "en": "What keyboard shortcut toggles between displaying calculated values and showing formula text in all cells?",
        "vi": "Phím tắt nào chuyển đổi qua lại giữa hiển thị giá trị tính toán và hiển thị mã công thức trong tất cả các ô?"
      },
      "options": [
        {
          "en": "Ctrl + ` (grave accent / backtick)",
          "vi": "Ctrl + ` (dấu huyền / backtick)"
        },
        {
          "en": "Ctrl + F",
          "vi": "Ctrl + F"
        },
        {
          "en": "Alt + F4",
          "vi": "Alt + F4"
        },
        {
          "en": "Ctrl + Shift + F",
          "vi": "Ctrl + Shift + F"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Ctrl + ` toggles Show Formulas mode across the active worksheet.",
        "vi": "Ctrl + ` bật/tắt chế độ Show Formulas trên toàn bộ trang tính đang hoạt động."
      },
      "difficulty": "easy",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q9",
      "type": "true_false",
      "question": {
        "en": "True or False: A circular reference warning occurs when a formula refers directly or indirectly to its own cell coordinate.",
        "vi": "Đúng hay Sai: Cảnh báo tham chiếu vòng (Circular Reference) xuất hiện khi một công thức tham chiếu trực tiếp hoặc gián tiếp đến chính tọa độ ô của nó."
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
        "en": "True. If cell A1 contains =A1 + 1, it creates an infinite feedback loop called a circular reference.",
        "vi": "Đúng. Nếu ô A1 chứa công thức =A1 + 1, nó tạo ra vòng lặp vô hạn gọi là tham chiếu vòng."
      },
      "difficulty": "easy",
      "topicId": "excel_error_handling"
    },
    {
      "id": "excel_l13_q10",
      "type": "single_choice",
      "question": {
        "en": "What does the `ISERROR()` function check for?",
        "vi": "Hàm `ISERROR()` kiểm tra điều gì?"
      },
      "options": [
        {
          "en": "Returns TRUE if the cell contains ANY error value (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!)",
          "vi": "Trả về TRUE nếu ô chứa BẤT KỲ giá trị lỗi nào (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!)"
        },
        {
          "en": "Returns TRUE only for spelling errors",
          "vi": "Chỉ trả về TRUE cho lỗi chính tả"
        },
        {
          "en": "Returns TRUE only for #N/A",
          "vi": "Chỉ trả về TRUE cho lỗi #N/A"
        },
        {
          "en": "Fixes the error automatically",
          "vi": "Tự động sửa lỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "ISERROR tests for all possible Excel error types and returns a boolean TRUE or FALSE.",
        "vi": "ISERROR kiểm tra tất cả các kiểu lỗi có thể có trong Excel và trả về giá trị logic TRUE hoặc FALSE."
      },
      "difficulty": "easy",
      "topicId": "excel_error_handling"
    }
  ]
};
export default lesson13;
