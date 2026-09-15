import { Lesson } from '../../../../types';

export const lesson15: Lesson = {
  "id": "excel_lesson_15",
  "order": 15,
  "moduleId": "excel_mod_4",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_tables",
  "title": {
    "en": "Excel Tables (ListObjects), Structured Referencing & Interactive Slicers",
    "vi": "Bảng Excel (ListObjects), Tham Chiếu Cấu Trúc & Slicers Tương Tác"
  },
  "summary": {
    "en": "Elevate flat spreadsheet grids into robust database ListObjects: Ctrl + T conversion, human-readable structured reference syntax (TableName[@Column]), automatic formula expansion, dynamic chart auto-updating, Total Row aggregations, and visual Slicer dashboards.",
    "vi": "Nâng cấp lưới bảng tính phẳng thành cấu trúc cơ sở dữ liệu ListObjects mạnh mẽ: chuyển đổi bằng Ctrl + T, cú pháp tham chiếu cấu trúc trực quan (TenBang[@TenCot]), tự động mở rộng công thức, biểu đồ tự cập nhật theo dữ liệu mới, dòng Total Row và bảng điều khiển Slicer trực quan."
  },
  "learn": {
    "introduction": {
      "en": "Standard cell ranges (A2:F100) are static and error-prone: when new rows are appended at the bottom, existing formulas, PivotTables, and charts do not automatically expand to include them. Converting a range into an official Excel Table (ListObject) transforms data into a self-expanding database container with intelligent structured referencing.",
      "vi": "Dải ô tiêu chuẩn (A2:F100) có tính tĩnh và dễ gây lỗi: khi các hàng mới được thêm vào cuối bảng, các công thức, PivotTable và biểu đồ hiện có không tự động mở rộng để bao gồm chúng. Chuyển đổi dải ô thành Bảng Excel chính thức (ListObject) biến dữ liệu thành vùng cơ sở dữ liệu tự động mở rộng kèm cú pháp tham chiếu cấu trúc thông minh."
    },
    "conceptExplanation": {
      "en": "### 1. Creating and Configuring an Excel Table\n- **Keyboard Shortcut**: Select any cell inside your data and press **Ctrl + T** (or Cmd + T on Mac).\n- **Naming Tables**: Always give your table a clean, descriptive name on the *Table Design* tab (e.g. `OrdersTable`, `EmployeeRoster`).\n\n### 2. Structured Reference Syntax\nInstead of cryptic cell coordinates like `=B2 * $C$1`, Tables use self-documenting syntax:\n- **Same-row value**: `=[@Quantity] * [@UnitPrice]` (The `@` symbol represents \"this current row\").\n- **Entire column across the sheet**: `=SUM(OrdersTable[Revenue])`\n- **Multiple columns**: `OrdersTable[[#Data], [Quantity]:[Revenue]]`\n- **Headers Row**: `OrdersTable[#Headers]`\n- **Total Row**: `OrdersTable[#Totals]`\n- **All Data & Headers & Totals**: `OrdersTable[#All]`\n\n### 3. Key Benefits of Official Tables\n1. **Auto-Calculated Columns**: Enter a formula in one cell, and it automatically propagates to every row in the column.\n2. **Self-Expanding Boundaries**: Adding new rows or columns automatically expands formatting, formulas, and chart series.\n3. **Interactive Slicers**: Visual graphic filtering buttons on the Table Design tab (Insert Slicer).",
      "vi": "### 1. Tạo & Cấu Hình Bảng Excel (Table)\n- **Phím tắt tạo bảng**: Chọn bất kỳ ô nào trong vùng dữ liệu và nhấn **Ctrl + T** (hoặc Cmd + T trên Mac).\n- **Đặt tên bảng**: Luôn đặt tên gợi nhớ cho bảng trên thẻ *Table Design* (ví dụ: `OrdersTable`, `EmployeeRoster`).\n\n### 2. Cú Pháp Tham Chiếu Có Cấu Trúc (Structured References)\nThay vì các tọa độ ô khó hiểu như `=B2 * $C$1`, Bảng sử dụng cú pháp tự ghi chú tài liệu:\n- **Giá trị trên cùng hàng**: `=[@Quantity] * [@UnitPrice]` (Ký tự `@` đại diện cho \"dòng hiện tại này\").\n- **Toàn bộ cột từ bất kỳ đâu**: `=SUM(OrdersTable[Revenue])`\n- **Nhiều cột liên tiếp**: `OrdersTable[[#Data], [Quantity]:[Revenue]]`\n- **Dòng tiêu đề**: `OrdersTable[#Headers]`\n- **Dòng tổng kết**: `OrdersTable[#Totals]`\n- **Toàn bộ bảng gồm cả tiêu đề & dòng tổng**: `OrdersTable[#All]`\n\n### 3. Các Lợi Ích Vượt Trội Của Excel Table\n1. **Tự động điền cột tính toán**: Nhập công thức vào một ô, công thức sẽ tự động nhân bản xuống tất cả các hàng trong cột.\n2. **Tự động mở rộng biên**: Thêm dòng mới hoặc cột mới sẽ tự động kéo theo định dạng, công thức và dữ liệu biểu đồ.\n3. **Bộ lọc Slicers Trực Quan**: Các nút bấm lọc đồ họa tương tác trên thẻ Table Design (Insert Slicer)."
    },
    "syntax": "# Structured Formula Inside Table:\n=[@Sales] * (1 - [@Discount])\n\n# Formula Outside Table Referencing Table:\n=SUM(SalesTable[Revenue])\n=AVERAGE(SalesTable[ProfitMargin])\n=XLOOKUP(A2, ProductsTable[SKU], ProductsTable[Price])",
    "examples": [
      {
        "title": {
          "en": "Calculating Net Profit Column with Structured References",
          "vi": "Tính Cột Lợi Nhuận Ròng Bằng Tham Chiếu Cấu Trúc"
        },
        "code": "Table Named: 'Financials'\nColumns: Revenue, COGS, Tax\n\nFormula entered in new column 'NetProfit':\n=[@Revenue] - [@COGS] - [@Tax]\n\nResult: Instantly calculates across all 50,000 rows automatically!",
        "description": {
          "en": "Structured references make business logic crystal clear without tracking row coordinate numbers.",
          "vi": "Tham chiếu cấu trúc làm cho logic nghiệp vụ cực kỳ rõ ràng mà không cần bận tâm đến số thứ tự dòng."
        }
      },
      {
        "title": {
          "en": "Dynamic Summary Metric Outside the Table",
          "vi": "Chỉ Số Tóm Tắt Động Bên Ngoài Bảng"
        },
        "code": "Total Revenue in KPI Card: =SUM(Financials[Revenue])\nAverage Deal Size:        =AVERAGE(Financials[Revenue])\nTotal Order Count:        =COUNTA(Financials[OrderID])",
        "description": {
          "en": "When new invoices are added to Financials, these summary metrics automatically recalculate to include the new rows.",
          "vi": "Khi hóa đơn mới được thêm vào bảng Financials, các chỉ số tóm tắt này tự động tính toán lại bao gồm các dòng mới."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Leaving default table names like Table1, Table2, Table3, making complex formulas incomprehensible.",
          "vi": "Để nguyên tên bảng mặc định như Table1, Table2, Table3 khiến các công thức phức tạp trở nên khó hiểu."
        },
        "correction": {
          "en": "Immediately rename every table under Table Design -> Table Name to a descriptive PascalCase identifier (e.g. Sales2026).",
          "vi": "Đổi tên bảng ngay lập tức trong Table Design -> Table Name thành tên có nghĩa (ví dụ Sales2026)."
        }
      }
    ],
    "tips": [
      {
        "en": "Toggle Total Row: Press Ctrl + Shift + T while inside an Excel Table to instantly toggle the summary Total Row on and off.",
        "vi": "Bật/tắt dòng Total Row: Nhấn Ctrl + Shift + T khi đang ở trong Bảng để bật/tắt nhanh dòng tổng kết."
      },
      {
        "en": "Quick Table Slicers: Add Slicers to filter table records with single clicks, creating dashboard-style visual controls.",
        "vi": "Slicers cho Bảng: Thêm Slicers để lọc các dòng trong bảng chỉ bằng một cú nhấp chuột, tạo bảng điều khiển tương tác."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l15_ex1",
      "type": "complete_code",
      "title": {
        "en": "Structured Reference Same-Row Revenue Calculation",
        "vi": "Tính Doanh Thu Cùng Hàng Bằng Tham Chiếu Cấu Trúc"
      },
      "instruction": {
        "en": "Write the structured formula for a new table column to calculate Total by multiplying [@Quantity] by [@UnitPrice].",
        "vi": "Viết công thức có cấu trúc cho cột mới trong bảng để tính Total bằng cách nhân [@Quantity] với [@UnitPrice]."
      },
      "starterCode": "=[@Quantity] * ",
      "solutionCode": "=[@Quantity] * [@UnitPrice]",
      "expectedOutput": "=[@Quantity] * [@UnitPrice]",
      "hint": {
        "en": "Multiply [@Quantity] with [@UnitPrice].",
        "vi": "Nhân [@Quantity] với [@UnitPrice]."
      },
      "explanation": {
        "en": "The @ symbol denotes values located on the current evaluated row of the table.",
        "vi": "Ký tự @ biểu thị giá trị nằm trên chính hàng hiện tại đang được tính toán của bảng."
      }
    },
    {
      "id": "excel_l15_ex2",
      "type": "complete_code",
      "title": {
        "en": "Sum Entire Column of Named Table",
        "vi": "Tính Tổng Toàn Bộ Cột Của Bảng Đã Đặt Tên"
      },
      "instruction": {
        "en": "Write a formula outside the table to calculate the total sum of the \"Amount\" column from table named \"OrdersTable\".",
        "vi": "Viết công thức bên ngoài bảng để tính tổng toàn bộ cột \"Amount\" từ bảng có tên \"OrdersTable\"."
      },
      "starterCode": "=SUM(",
      "solutionCode": "=SUM(OrdersTable[Amount])",
      "expectedOutput": "=SUM(OrdersTable[Amount])",
      "hint": {
        "en": "Use TableName[ColumnName] inside SUM().",
        "vi": "Dùng cú pháp TenBang[TenCot] bên trong hàm SUM()."
      },
      "explanation": {
        "en": "=SUM(OrdersTable[Amount]) computes the total across the entire named table column dynamically.",
        "vi": "=SUM(OrdersTable[Amount]) tính tổng toàn bộ cột bảng đã đặt tên một cách tự động."
      }
    }
  ],
  "challenge": {
    "id": "excel_l15_challenge",
    "title": {
      "en": "Lookup Product Price Using Structured Table References",
      "vi": "Tra Cứu Giá Sản Phẩm Dùng Tham Chiếu Bảng Có Cấu Trúc"
    },
    "description": {
      "en": "Construct an XLOOKUP formula to find ProductID in cell A2 within the SKU column of table \"InventoryTable\" and return the corresponding Price from the UnitPrice column of \"InventoryTable\".",
      "vi": "Xây dựng công thức XLOOKUP để tìm ProductID ở ô A2 trong cột SKU của bảng \"InventoryTable\" và trả về Đơn giá tương ứng từ cột UnitPrice của bảng \"InventoryTable\"."
    },
    "requirements": [
      {
        "en": "Use XLOOKUP with cell A2",
        "vi": "Sử dụng XLOOKUP với ô A2"
      },
      {
        "en": "Reference lookup array as InventoryTable[SKU]",
        "vi": "Tham chiếu mảng tìm kiếm là InventoryTable[SKU]"
      },
      {
        "en": "Reference return array as InventoryTable[UnitPrice]",
        "vi": "Tham chiếu mảng trả về là InventoryTable[UnitPrice]"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=XLOOKUP(A2, InventoryTable[SKU], InventoryTable[UnitPrice])",
    "hints": [
      {
        "en": "Syntax: =XLOOKUP(A2, InventoryTable[SKU], InventoryTable[UnitPrice])",
        "vi": "Cú pháp: =XLOOKUP(A2, InventoryTable[SKU], InventoryTable[UnitPrice])"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l15_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the keyboard shortcut to convert an ordinary cell range into an official Excel Table?",
        "vi": "Phím tắt nào chuyển đổi một dải ô thông thường thành một Bảng Excel (Table) chính thức?"
      },
      "options": [
        {
          "en": "Ctrl + T (or Ctrl + L)",
          "vi": "Ctrl + T (hoặc Ctrl + L)"
        },
        {
          "en": "Ctrl + Shift + B",
          "vi": "Ctrl + Shift + B"
        },
        {
          "en": "Alt + T + R",
          "vi": "Alt + T + R"
        },
        {
          "en": "Ctrl + Enter",
          "vi": "Ctrl + Enter"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Ctrl + T opens the Create Table dialog, converting the active range into a ListObject Table.",
        "vi": "Ctrl + T mở hộp thoại Create Table, chuyển đổi dải ô hiện tại thành một Bảng ListObject."
      },
      "difficulty": "easy",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q2",
      "type": "single_choice",
      "question": {
        "en": "In structured reference syntax, what does the `@` symbol represent (e.g. `=[@Price]`)?",
        "vi": "Trong cú pháp tham chiếu có cấu trúc, ký tự `@` đại diện cho điều gì (ví dụ `=[@Price]`)?"
      },
      "options": [
        {
          "en": "The value in the specified column on the current active row",
          "vi": "Giá trị trong cột được chỉ định trên chính hàng đang hoạt động hiện tại"
        },
        {
          "en": "An email address",
          "vi": "Một địa chỉ email"
        },
        {
          "en": "An absolute lock on the cell",
          "vi": "Một khóa tuyệt đối trên ô"
        },
        {
          "en": "An error flag",
          "vi": "Một cờ báo lỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The @ (implicit intersection operator) specifies that the calculation should evaluate the cell on the current row.",
        "vi": "Ký tự @ chỉ định rằng phép tính sẽ lấy giá trị của ô nằm trên cùng hàng hiện tại."
      },
      "difficulty": "easy",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q3",
      "type": "single_choice",
      "question": {
        "en": "What happens to external formulas referencing `SalesTable[Revenue]` when you add 50 new rows to `SalesTable`?",
        "vi": "Điều gì xảy ra với các công thức bên ngoài tham chiếu `SalesTable[Revenue]` khi bạn thêm 50 dòng mới vào `SalesTable`?"
      },
      "options": [
        {
          "en": "They automatically expand to include all 50 new rows without needing any formula adjustments",
          "vi": "Chúng tự động mở rộng để bao gồm cả 50 dòng mới mà không cần chỉnh sửa công thức"
        },
        {
          "en": "They break and return #REF!",
          "vi": "Chúng bị lỗi và trả về #REF!"
        },
        {
          "en": "You must manually re-drag the formula range",
          "vi": "Bạn phải kéo lại dải ô công thức thủ công"
        },
        {
          "en": "They only calculate the first 10 rows",
          "vi": "Chúng chỉ tính toán 10 dòng đầu"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Excel Tables are dynamic containers; column references automatically encompass newly appended rows.",
        "vi": "Bảng Excel là các vùng chứa động; các tham chiếu cột tự động bao quát toàn bộ các hàng mới được thêm vào."
      },
      "difficulty": "easy",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q4",
      "type": "single_choice",
      "question": {
        "en": "What shortcut toggles the Total Row at the bottom of an Excel Table on and off?",
        "vi": "Phím tắt nào bật/tắt dòng Total Row ở dưới đáy của một Bảng Excel?"
      },
      "options": [
        {
          "en": "Ctrl + Shift + T",
          "vi": "Ctrl + Shift + T"
        },
        {
          "en": "Alt + T",
          "vi": "Alt + T"
        },
        {
          "en": "Ctrl + Alt + S",
          "vi": "Ctrl + Alt + S"
        },
        {
          "en": "Shift + F11",
          "vi": "Shift + F11"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Ctrl + Shift + T toggles the summary Total Row on the active Excel Table.",
        "vi": "Ctrl + Shift + T bật/tắt dòng tổng kết Total Row trên Bảng Excel đang chọn."
      },
      "difficulty": "medium",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q5",
      "type": "single_choice",
      "question": {
        "en": "What is a Table Slicer in Microsoft Excel?",
        "vi": "Table Slicer trong Microsoft Excel là gì?"
      },
      "options": [
        {
          "en": "A visual interactive graphic button panel that filters table data with single clicks",
          "vi": "Một bảng nút bấm đồ họa tương tác trực quan giúp lọc dữ liệu bảng chỉ bằng các cú nhấp chuột"
        },
        {
          "en": "A tool that cuts rows permanently",
          "vi": "Một công cụ cắt các hàng vĩnh viễn"
        },
        {
          "en": "A chart type for pie charts",
          "vi": "Một loại biểu đồ tròn"
        },
        {
          "en": "A macro recorder",
          "vi": "Một trình ghi macro"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Slicers are visual filtering controls attached to Tables or PivotTables that allow users to filter categories interactively.",
        "vi": "Slicers là các bộ điều khiển lọc trực quan gắn liền với Bảng hoặc PivotTable cho phép người dùng lọc danh mục tương tác."
      },
      "difficulty": "easy",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q6",
      "type": "single_choice",
      "question": {
        "en": "How do you refer to only the header cells of a table named `Clients` in a formula?",
        "vi": "Làm thế nào để chỉ tham chiếu đến các ô tiêu đề của bảng có tên `Clients` trong công thức?"
      },
      "options": [
        {
          "en": "`Clients[#Headers]`",
          "vi": "`Clients[#Headers]`"
        },
        {
          "en": "`Clients[@Headers]`",
          "vi": "`Clients[@Headers]`"
        },
        {
          "en": "`Clients.Headers`",
          "vi": "`Clients.Headers`"
        },
        {
          "en": "`#Headers!Clients`",
          "vi": "`#Headers!Clients`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Clients[#Headers] targets exclusively the top header row of the table.",
        "vi": "Clients[#Headers] trỏ riêng biệt đến dòng tiêu đề trên cùng của bảng."
      },
      "difficulty": "medium",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q7",
      "type": "true_false",
      "question": {
        "en": "True or False: Typing a formula into a single cell of an empty Table column automatically populates the entire column via calculated columns.",
        "vi": "Đúng hay Sai: Gõ một công thức vào một ô đơn lẻ của một cột Bảng đang trống sẽ tự động điền công thức cho toàn bộ cột đó."
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
        "en": "True. Excel Tables feature auto-calculated columns that propagate formulas instantly to all existing and future rows.",
        "vi": "Đúng. Bảng Excel có tính năng cột tự động tính toán giúp truyền công thức ngay lập tức cho mọi dòng hiện tại và tương lai."
      },
      "difficulty": "easy",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q8",
      "type": "single_choice",
      "question": {
        "en": "How do you convert an Excel Table back into a standard ordinary range if needed?",
        "vi": "Làm thế nào để chuyển đổi một Bảng Excel trở lại thành một dải ô thông thường nếu cần?"
      },
      "options": [
        {
          "en": "Table Design tab -> Tools -> Convert to Range",
          "vi": "Thẻ Table Design -> Tools -> Convert to Range"
        },
        {
          "en": "Press Delete",
          "vi": "Nhấn phím Delete"
        },
        {
          "en": "Clear all formatting",
          "vi": "Xóa toàn bộ định dạng"
        },
        {
          "en": "Cut and paste as text",
          "vi": "Cắt và dán dưới dạng văn bản"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Convert to Range strips the ListObject wrapper while preserving all cell data and visual formatting.",
        "vi": "Convert to Range gỡ bỏ vỏ bọc ListObject trong khi vẫn giữ nguyên tất cả dữ liệu ô và định dạng trực quan."
      },
      "difficulty": "medium",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q9",
      "type": "single_choice",
      "question": {
        "en": "Which function is automatically used by the Total Row in an Excel Table to ensure hidden/filtered rows are ignored in totals?",
        "vi": "Hàm nào được tự động sử dụng bởi dòng Total Row trong Bảng Excel để đảm bảo các dòng bị ẩn/bị lọc không bị tính vào tổng?"
      },
      "options": [
        {
          "en": "SUBTOTAL (e.g. function number 109)",
          "vi": "SUBTOTAL (ví dụ số hàm 109)"
        },
        {
          "en": "SUM",
          "vi": "SUM"
        },
        {
          "en": "AGGREGATE_ONLY",
          "vi": "AGGREGATE_ONLY"
        },
        {
          "en": "HIDDENSUM",
          "vi": "HIDDENSUM"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The Total Row uses SUBTOTAL so that filtering the table recalculates the totals to reflect only currently visible rows.",
        "vi": "Dòng Total Row sử dụng hàm SUBTOTAL để khi lọc bảng, số tổng sẽ tự tính lại chỉ phản ánh các dòng đang hiển thị."
      },
      "difficulty": "medium",
      "topicId": "excel_tables"
    },
    {
      "id": "excel_l15_q10",
      "type": "single_choice",
      "question": {
        "en": "What structured reference denotes the data body cells across two columns, \"Price\" and \"Tax\", in table `Sales`?",
        "vi": "Cú pháp tham chiếu có cấu trúc nào biểu thị các ô thân dữ liệu qua hai cột \"Price\" và \"Tax\" trong bảng `Sales`?"
      },
      "options": [
        {
          "en": "`Sales[[Price]:[Tax]]`",
          "vi": "`Sales[[Price]:[Tax]]`"
        },
        {
          "en": "`Sales[Price, Tax]`",
          "vi": "`Sales[Price, Tax]`"
        },
        {
          "en": "`Sales(Price:Tax)`",
          "vi": "`Sales(Price:Tax)`"
        },
        {
          "en": "`Sales.Price-Tax`",
          "vi": "`Sales.Price-Tax`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Double square brackets with a colon between column names denotes a contiguous multi-column table range.",
        "vi": "Cặp ngoặc vuông kép với dấu hai chấm giữa tên các cột biểu thị một vùng dải nhiều cột liên tiếp trong bảng."
      },
      "difficulty": "hard",
      "topicId": "excel_tables"
    }
  ]
};
export default lesson15;
