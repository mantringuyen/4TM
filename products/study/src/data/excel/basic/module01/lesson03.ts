import { Lesson } from '../../../../types';

export const lesson03: Lesson = {
  "id": "excel_lesson_3",
  "order": 3,
  "moduleId": "excel_mod_1",
  "courseId": "excel",
  "levelId": "basic",
  "topicId": "excel_references",
  "title": {
    "en": "Absolute, Relative & Mixed Cell References (A1, $A$1, A$1, $A1)",
    "vi": "Tham Chiếu Tương Đối, Tuyệt Đối & Hỗn Hợp (A1, $A$1, A$1, $A1)"
  },
  "summary": {
    "en": "Master Excel cell reference modes (Relative A1, Absolute $A$1, Mixed Row-Locked A$1, Column-Locked $A1), the F4 cycle shortcut, cross-worksheet references, and two-dimensional multiplication matrix tables.",
    "vi": "Làm chủ các chế độ tham chiếu ô trong Excel (Tương đối A1, Tuyệt đối $A$1, Hỗn hợp khóa dòng A$1, khóa cột $A1), phím tắt F4, tham chiếu liên trang tính và xây dựng bảng ma trận nhân hai chiều."
  },
  "learn": {
    "introduction": {
      "en": "Cell referencing is the single most powerful feature of spreadsheet calculation engines. By understanding how the dollar sign ($) locks column letters and row numbers during AutoFill dragging, you can write a single formula that accurately populates thousands of cells across financial projections and tax models.",
      "vi": "Tham chiếu ô là tính năng mạnh mẽ nhất của các công cụ bảng tính. Bằng cách hiểu cách ký hiệu đô la ($) khóa cố định cột và dòng khi kéo sao chép công thức (AutoFill), bạn có thể viết một công thức duy nhất áp dụng chính xác cho hàng nghìn ô trong các mô hình tài chính và bảng thuế."
    },
    "conceptExplanation": {
      "en": "### 1. The Four Cell Reference Types\n1. **Relative Reference (`A1`)**: Both column and row adjust dynamically when copied or dragged. Dragging down increments row (`A2`, `A3`); dragging right shifts column (`B1`, `C1`).\n2. **Absolute Reference (`$A$1`)**: Both column and row are strictly locked with dollar signs. Copying anywhere always refers to cell `A1` (e.g. referencing a fixed tax rate or currency exchange rate in `$G$1`).\n3. **Mixed Row-Locked (`A$1`)**: Column changes freely when dragging horizontally, but row 1 is firmly locked when dragging vertically. Perfect for table column header benchmarks.\n4. **Mixed Column-Locked (`$A1`)**: Column A is firmly locked when dragging horizontally, but row number increments when dragging vertically. Perfect for row item identifiers.\n\n### 2. The F4 Toggle Shortcut\nWhen your cursor is on a cell reference in the formula bar, pressing **F4** cycles through all four modes:\n`A1` -> `$A$1` -> `A$1` -> `$A1` -> `A1`\n\n### 3. Cross-Worksheet & Cross-Workbook Referencing\n- **Another Sheet in Same Workbook**: `=SheetName!Cell` (e.g., `='Q1 Sales'!B4`). Note: Use single quotes if sheet names contain spaces or special characters.\n- **External Workbook**: `=[Budget2026.xlsx]Summary!$B$12`",
      "vi": "### 1. Bốn Loại Tham Chiếu Ô Trong Excel\n1. **Tham chiếu tương đối (`A1`)**: Cả cột và dòng đều tự động thay đổi khi sao chép hoặc kéo công thức. Kéo xuống dòng tăng (`A2`, `A3`); kéo sang phải cột tăng (`B1`, `C1`).\n2. **Tham chiếu tuyệt đối (`$A$1`)**: Cả cột và dòng đều bị khóa chặt bởi ký hiệu đô la ($). Sao chép đến bất kỳ đâu công thức vẫn luôn trỏ về đúng ô `A1` (ví dụ: tham chiếu thuế suất hoặc tỷ giá cố định ở `$G$1`).\n3. **Tham chiếu hỗn hợp khóa dòng (`A$1`)**: Cột tự do thay đổi khi kéo ngang, nhưng dòng 1 bị khóa cố định khi kéo dọc. Thích hợp cho tiêu đề cột.\n4. **Tham chiếu hỗn hợp khóa cột (`$A1`)**: Cột A bị khóa cố định khi kéo ngang, nhưng dòng tự do tăng giảm khi kéo dọc. Thích hợp cho cột danh mục sản phẩm bên trái.\n\n### 2. Phím Tắt F4 Chuyển Đổi Nhanh\nKhi con trỏ đặt tại địa chỉ ô trên thanh công thức, nhấn phím **F4** sẽ chuyển đổi tuần tự:\n`A1` -> `$A$1` -> `A$1` -> `$A1` -> `A1`\n\n### 3. Tham Chiếu Liên Trang Tính & Liên File\n- **Trang tính khác cùng File**: `=TenSheet!DiaChiO` (ví dụ: `='Q1 Sales'!B4`). Chú ý: Dùng dấu nháy đơn bao bọc nếu tên Sheet có khoảng trắng hoặc ký tự đặc biệt.\n- **Bảng tính từ File khác**: `=[Budget2026.xlsx]Summary!$B$12`"
    },
    "syntax": "# Reference Types:\nA1     -> Relative (both shift)\n$A$1   -> Absolute (both locked)\nA$1    -> Mixed (row 1 locked, column adjusts)\n$A1    -> Mixed (column A locked, row adjusts)\n\n# Sheet reference:\n='Quarterly Data'!$B$5 * (1 + $C$1)",
    "examples": [
      {
        "title": {
          "en": "Applying Fixed Tax Rate from Cell $C$1",
          "vi": "Áp Dụng Thuế Suất Cố Định Từ Ô $C$1"
        },
        "code": "Tax Rate stored in cell C1: 0.08 (8%)\nSales Item Amounts in B4:B8\n\nFormula in C4: =B4 * $C$1\nWhen dragged down to C5: =B5 * $C$1\nWhen dragged down to C6: =B6 * $C$1",
        "description": {
          "en": "B4 shifts relatively to B5 and B6, while $C$1 stays firmly anchored to the tax rate cell.",
          "vi": "B4 thay đổi tương đối thành B5 và B6, trong khi $C$1 luôn được giữ cố định vào ô chứa thuế suất."
        }
      },
      {
        "title": {
          "en": "Two-Dimensional Multiplication Matrix (2D Grid)",
          "vi": "Bảng Ma Trận Nhân 2 Chiều"
        },
        "code": "Row Headers in B1:E1 (Quantities: 10, 20, 30, 40)\nColumn Headers in A2:A5 (Unit Prices: $5, $10, $15, $20)\n\nSingle Universal Formula in B2: =$A2 * B$1\nWhen copied across the entire B2:E5 grid, every cell correctly multiplies its row price by its column quantity!",
        "description": {
          "en": "Locking column A ($A2) and locking row 1 (B$1) allows a single formula to populate the entire 2D matrix.",
          "vi": "Khóa cột A ($A2) và khóa dòng 1 (B$1) cho phép một công thức duy nhất phủ kín toàn bộ bảng ma trận 2 chiều."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using relative reference =B4*C1 when dragging down, resulting in multiplying by empty cells below C1 (=B5*C2, =B6*C3) producing zeroes.",
          "vi": "Dùng tham chiếu tương đối =B4*C1 khi kéo công thức xuống, dẫn đến nhân với các ô trống bên dưới C1 (=B5*C2, =B6*C3) cho kết quả bằng 0."
        },
        "correction": {
          "en": "Press F4 to lock the constant rate cell to =$C$1 before dragging.",
          "vi": "Nhấn F4 để khóa cố định ô chứa tham số thành =$C$1 trước khi kéo sao chép."
        }
      },
      {
        "mistake": {
          "en": "Locking both row and column ($A$2 * $B$1) in a 2D matrix calculation, making every cell output identical values.",
          "vi": "Khóa cả dòng và cột ($A$2 * $B$1) trong bảng ma trận 2 chiều khiến mọi ô đều tính ra cùng một kết quả giống nhau."
        },
        "correction": {
          "en": "Use mixed references: lock only the column for row headers ($A2) and only the row for column headers (B$1).",
          "vi": "Sử dụng tham chiếu hỗn hợp: chỉ khóa cột cho tiêu đề hàng ($A2) và chỉ khóa dòng cho tiêu đề cột (B$1)."
        }
      }
    ],
    "tips": [
      {
        "en": "Press F4 repeatedly while editing a formula in the formula bar to cycle through all 4 reference locking combinations instantly.",
        "vi": "Nhấn F4 liên tục khi đang chỉnh sửa công thức để chuyển đổi nhanh qua lại giữa 4 kiểu tham chiếu."
      },
      {
        "en": "Always wrap sheet names with spaces in single quotes when creating manual cross-sheet formulas, e.g. ='Annual Budget'!A1.",
        "vi": "Luôn đặt tên trang tính có dấu cách trong dấu nháy đơn khi viết công thức liên trang tính, ví dụ: ='Annual Budget'!A1."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l3_ex1",
      "type": "complete_code",
      "title": {
        "en": "Lock Constant Commission Rate",
        "vi": "Khóa Tỷ Lệ Hoa Hồng Cố Định"
      },
      "instruction": {
        "en": "Write the formula for cell C4 to calculate sales commission by multiplying sales amount in B4 by the fixed commission rate in cell $E$1.",
        "vi": "Viết công thức cho ô C4 để tính hoa hồng bán hàng bằng cách nhân doanh số ở B4 với tỷ lệ hoa hồng cố định ở ô $E$1."
      },
      "starterCode": "=B4*",
      "solutionCode": "=B4*$E$1",
      "expectedOutput": "=B4*$E$1",
      "hint": {
        "en": "Keep B4 relative and lock E1 with dollar signs ($E$1).",
        "vi": "Giữ B4 tương đối và khóa E1 bằng ký hiệu đô la ($E$1)."
      },
      "explanation": {
        "en": "B4 will adjust as you drag down rows, while $E$1 remains anchored to the commission rate.",
        "vi": "B4 sẽ tự động thay đổi khi kéo xuống các dòng, trong khi $E$1 luôn cố định tại ô hoa hồng."
      }
    },
    {
      "id": "excel_l3_ex2",
      "type": "complete_code",
      "title": {
        "en": "Cross-Sheet Reference with Locked Range",
        "vi": "Tham Chiếu Liên Sheet Với Vùng Khóa Cố Định"
      },
      "instruction": {
        "en": "Write a formula that sums the revenue range B2:B10 located on the sheet named \"Sales2026\".",
        "vi": "Viết công thức tính tổng vùng doanh thu B2:B10 nằm trên trang tính có tên \"Sales2026\"."
      },
      "starterCode": "=SUM(",
      "solutionCode": "=SUM(Sales2026!B2:B10)",
      "expectedOutput": "=SUM(Sales2026!B2:B10)",
      "hint": {
        "en": "Use SheetName!Range inside the SUM function.",
        "vi": "Dùng cú pháp TenSheet!VungThamChieu bên trong hàm SUM."
      },
      "explanation": {
        "en": "Excel accesses ranges on other sheets using an exclamation mark: Sales2026!B2:B10.",
        "vi": "Excel truy cập các vùng trên sheet khác bằng dấu chấm than: Sales2026!B2:B10."
      }
    }
  ],
  "challenge": {
    "id": "excel_l3_challenge",
    "title": {
      "en": "Build Universal 2D Matrix Pricing Table",
      "vi": "Xây Dựng Bảng Định Giá Ma Trận 2 Chiều Phổ Quát"
    },
    "description": {
      "en": "Construct the universal 2D matrix multiplication formula for cell B2 that multiplies the base cost in column A (cell A2) by the markup percentage header in row 1 (cell B1). The formula must work across all rows and columns when copied.",
      "vi": "Xây dựng công thức nhân ma trận 2 chiều cho ô B2 nhân chi phí cơ sở ở cột A (ô A2) với tỷ lệ phần trăm đội giá ở dòng 1 (ô B1). Công thức phải áp dụng đúng cho tất cả các hàng và cột khi sao chép."
    },
    "requirements": [
      {
        "en": "Lock column A with $A2 so column A is fixed when dragged right",
        "vi": "Khóa cột A bằng $A2 để cột A cố định khi kéo sang phải"
      },
      {
        "en": "Lock row 1 with B$1 so row 1 is fixed when dragged down",
        "vi": "Khóa dòng 1 bằng B$1 để dòng 1 cố định khi kéo xuống dưới"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=$A2*B$1",
    "hints": [
      {
        "en": "Combine mixed reference $A2 with mixed reference B$1.",
        "vi": "Kết hợp tham chiếu hỗn hợp $A2 với tham chiếu hỗn hợp B$1."
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l3_q1",
      "type": "single_choice",
      "question": {
        "en": "When the relative formula `=A1 + B1` in cell C1 is copied down to cell C2, what does the formula become?",
        "vi": "Khi công thức tương đối `=A1 + B1` trong ô C1 được sao chép xuống ô C2, công thức sẽ chuyển thành gì?"
      },
      "options": [
        {
          "en": "=A2 + B2",
          "vi": "=A2 + B2"
        },
        {
          "en": "=A1 + B1",
          "vi": "=A1 + B1"
        },
        {
          "en": "=B1 + C1",
          "vi": "=B1 + C1"
        },
        {
          "en": "=$A$2 + $B$2",
          "vi": "=$A$2 + $B$2"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Relative references automatically adjust row numbers by +1 when dragged down one row, becoming `=A2 + B2`.",
        "vi": "Tham chiếu tương đối tự động tăng số dòng thêm 1 khi kéo xuống dưới một hàng, trở thành `=A2 + B2`."
      },
      "difficulty": "easy",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q2",
      "type": "single_choice",
      "question": {
        "en": "Which reference type is represented by `$C$10`?",
        "vi": "Kiểu tham chiếu nào được biểu diễn bởi `$C$10`?"
      },
      "options": [
        {
          "en": "Absolute reference (both column and row locked)",
          "vi": "Tham chiếu tuyệt đối (khóa cả cột và dòng)"
        },
        {
          "en": "Relative reference",
          "vi": "Tham chiếu tương đối"
        },
        {
          "en": "Mixed reference with column locked only",
          "vi": "Tham chiếu hỗn hợp chỉ khóa cột"
        },
        {
          "en": "Mixed reference with row locked only",
          "vi": "Tham chiếu hỗn hợp chỉ khóa dòng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "$C$10 has dollar signs before both the column letter and row number, completely locking both.",
        "vi": "$C$10 có dấu đô la trước cả chữ cái cột và số hàng, khóa cố định hoàn toàn cả hai."
      },
      "difficulty": "easy",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q3",
      "type": "single_choice",
      "question": {
        "en": "If cell reference `$D5` is copied two columns to the right, what will it become?",
        "vi": "Nếu tham chiếu ô `$D5` được sao chép sang phải hai cột, nó sẽ chuyển thành gì?"
      },
      "options": [
        {
          "en": "$D5 (column is locked)",
          "vi": "$D5 (cột đã bị khóa)"
        },
        {
          "en": "$F5",
          "vi": "$F5"
        },
        {
          "en": "D7",
          "vi": "D7"
        },
        {
          "en": "$F7",
          "vi": "$F7"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The $ in front of D locks the column, so moving horizontally across columns will not change column D.",
        "vi": "Dấu $ đứng trước D đã khóa cột, vì vậy di chuyển ngang qua các cột sẽ không làm thay đổi cột D."
      },
      "difficulty": "medium",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q4",
      "type": "single_choice",
      "question": {
        "en": "What happens when you press the F4 key when editing the reference `B5` in the formula bar?",
        "vi": "Điều gì xảy ra khi bạn nhấn phím F4 trong lúc chỉnh sửa tham chiếu `B5` trên thanh công thức?"
      },
      "options": [
        {
          "en": "It converts `B5` to `$B$5`",
          "vi": "Nó chuyển `B5` thành `$B$5`"
        },
        {
          "en": "It deletes the formula",
          "vi": "Nó xóa công thức"
        },
        {
          "en": "It evaluates the formula to a static value",
          "vi": "Nó tính toán công thức thành một giá trị tĩnh"
        },
        {
          "en": "It copies the formula down",
          "vi": "Nó sao chép công thức xuống dưới"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Pressing F4 once changes a relative reference to absolute ($B$5). Pressing again cycles to B$5, then $B5, then back to B5.",
        "vi": "Nhấn F4 lần đầu chuyển tham chiếu tương đối thành tuyệt đối ($B$5). Nhấn tiếp sẽ chuyển thành B$5, sau đó $B5 và quay lại B5."
      },
      "difficulty": "easy",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q5",
      "type": "single_choice",
      "question": {
        "en": "In a 2D multiplication table, why is the formula `=$A2*B$1` used in cell B2?",
        "vi": "Trong bảng cửu chương ma trận 2D, tại sao công thức `=$A2*B$1` được dùng trong ô B2?"
      },
      "options": [
        {
          "en": "It locks column A for row labels and locks row 1 for column headers",
          "vi": "Nó khóa cột A cho nhãn hàng và khóa dòng 1 cho tiêu đề cột"
        },
        {
          "en": "It locks both A and B completely",
          "vi": "Nó khóa cố định cả A và B hoàn toàn"
        },
        {
          "en": "It prevents formulas from recalculating",
          "vi": "Nó ngăn công thức tính toán lại"
        },
        {
          "en": "It converts numbers into text strings",
          "vi": "Nó chuyển đổi số thành chuỗi văn bản"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Locking column A ($A2) ensures price is always read from column A, while locking row 1 (B$1) ensures quantity is always read from row 1.",
        "vi": "Khóa cột A ($A2) đảm bảo giá luôn được đọc từ cột A, trong khi khóa dòng 1 (B$1) đảm bảo số lượng luôn được đọc từ dòng 1."
      },
      "difficulty": "medium",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q6",
      "type": "single_choice",
      "question": {
        "en": "How should you reference cell B10 on a worksheet named \"Monthly Expenses\" (which has a space in its name)?",
        "vi": "Bạn nên tham chiếu ô B10 trên một worksheet có tên là \"Monthly Expenses\" (có khoảng trắng) như thế nào?"
      },
      "options": [
        {
          "en": "='Monthly Expenses'!B10",
          "vi": "='Monthly Expenses'!B10"
        },
        {
          "en": "=Monthly Expenses!B10",
          "vi": "=Monthly Expenses!B10"
        },
        {
          "en": "=[Monthly Expenses]!B10",
          "vi": "=[Monthly Expenses]!B10"
        },
        {
          "en": "=\"Monthly Expenses\".B10",
          "vi": "=\"Monthly Expenses\".B10"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "When a sheet name contains spaces or special symbols, Excel requires enclosing it in single quotes followed by an exclamation mark: 'Monthly Expenses'!B10.",
        "vi": "Khi tên trang tính chứa khoảng trắng hoặc ký tự đặc biệt, Excel yêu cầu bao bọc tên đó trong dấu nháy đơn kèm dấu chấm than: 'Monthly Expenses'!B10."
      },
      "difficulty": "medium",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q7",
      "type": "single_choice",
      "question": {
        "en": "If you drag the formula `=D$4` down three rows, what does it become?",
        "vi": "Nếu bạn kéo công thức `=D$4` xuống dưới 3 hàng, nó sẽ chuyển thành gì?"
      },
      "options": [
        {
          "en": "=D$4 (row 4 is locked)",
          "vi": "=D$4 (dòng 4 đã bị khóa)"
        },
        {
          "en": "=D$7",
          "vi": "=D$7"
        },
        {
          "en": "=G$4",
          "vi": "=G$4"
        },
        {
          "en": "=D4",
          "vi": "=D4"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The dollar sign before the row number ($4) locks row 4, preventing it from changing when dragged vertically.",
        "vi": "Dấu đô la đứng trước số dòng ($4) đã khóa dòng 4, ngăn không cho số dòng thay đổi khi kéo theo chiều dọc."
      },
      "difficulty": "easy",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q8",
      "type": "true_false",
      "question": {
        "en": "True or False: Deleting a referenced row or column causes dependent formulas to display the `#REF!` error.",
        "vi": "Đúng hay Sai: Xóa một hàng hoặc cột đang được tham chiếu sẽ khiến các công thức phụ thuộc hiển thị lỗi `#REF!`."
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
        "en": "True. Deleting the physical cells referenced by a formula destroys the coordinate pointer, creating a #REF! (invalid cell reference) error.",
        "vi": "Đúng. Việc xóa các ô vật lý đang được công thức tham chiếu sẽ phá hủy con trỏ tọa độ, tạo ra lỗi #REF! (tham chiếu ô không hợp lệ)."
      },
      "difficulty": "easy",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q9",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of AutoFill in Excel?",
        "vi": "Mục đích của tính năng AutoFill trong Excel là gì?"
      },
      "options": [
        {
          "en": "Automatically copying formulas, patterns, or series across adjacent cells via the fill handle",
          "vi": "Tự động sao chép công thức, mẫu hoặc chuỗi dữ liệu qua các ô liền kề bằng tay cầm fill handle"
        },
        {
          "en": "Automatically formatting fonts to bold",
          "vi": "Tự động định dạng phông chữ sang in đậm"
        },
        {
          "en": "Automatically spelling check worksheet names",
          "vi": "Tự động kiểm tra chính tả tên trang tính"
        },
        {
          "en": "Encrypting workbook passwords",
          "vi": "Mã hóa mật khẩu bảng tính"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "AutoFill uses the small square in the lower right corner of the active cell to quickly propagate formulas or series down columns or across rows.",
        "vi": "AutoFill sử dụng ô vuông nhỏ ở góc dưới bên phải ô đang chọn để nhanh chóng truyền tải công thức hoặc chuỗi dữ liệu xuống cột hoặc qua hàng."
      },
      "difficulty": "easy",
      "topicId": "excel_references"
    },
    {
      "id": "excel_l3_q10",
      "type": "single_choice",
      "question": {
        "en": "Which reference allows a formula to copy across columns while always taking values from Column B, and copy across rows while taking values from Row 10?",
        "vi": "Tham chiếu nào cho phép công thức sao chép qua các cột mà luôn lấy giá trị từ Cột B, và sao chép qua các hàng mà luôn lấy giá trị từ Hàng 10?"
      },
      "options": [
        {
          "en": "$B10 and B$10 mixed references",
          "vi": "Tham chiếu hỗn hợp $B10 và B$10"
        },
        {
          "en": "B10 relative reference",
          "vi": "Tham chiếu tương đối B10"
        },
        {
          "en": "$B$10 absolute reference",
          "vi": "Tham chiếu tuyệt đối $B$10"
        },
        {
          "en": "#REF!",
          "vi": "#REF!"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "$B10 locks column B while allowing rows to change; B$10 locks row 10 while allowing columns to change.",
        "vi": "$B10 khóa cột B trong khi cho phép dòng thay đổi; B$10 khóa dòng 10 trong khi cho phép cột thay đổi."
      },
      "difficulty": "medium",
      "topicId": "excel_references"
    }
  ]
};
export default lesson03;
