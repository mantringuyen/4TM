import { Lesson } from '../../../../types';

export const lesson17: Lesson = {
  "id": "excel_lesson_17",
  "order": 17,
  "moduleId": "excel_mod_4",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_pivottables",
  "title": {
    "en": "PivotTables, Multi-Dimensional Summaries, Grouping, Slicers & Timelines",
    "vi": "PivotTable, Tóm Tắt Đa Chiều, Gom Nhóm, Slicers & Dòng Thời Gian Timelines"
  },
  "summary": {
    "en": "Transform hundreds of thousands of raw transactional rows into executive multidimensional summaries in seconds: PivotTable field list configuration, automatic date grouping (Years/Quarters/Months), numeric binning, Show Values As percentage rollups, and interactive cross-filtering Slicers & Timelines.",
    "vi": "Biến hàng trăm nghìn dòng giao dịch thô thành báo cáo quản trị đa chiều chỉ trong vài giây: cấu hình danh sách trường PivotTable, tự động gom nhóm ngày tháng (Năm/Quý/Tháng), chia nhóm số, hiển thị giá trị dạng phần trăm Show Values As và các bộ lọc tương tác Slicers & Timelines."
  },
  "learn": {
    "introduction": {
      "en": "PivotTables are the single most powerful analytical feature in Microsoft Excel. Instead of writing dozens of complex multi-criteria SUMIFS formulas, a PivotTable aggregates, sorts, groups, and pivots massive datasets dynamically through an intuitive drag-and-drop interface.",
      "vi": "PivotTable là công cụ phân tích mạnh mẽ hàng đầu trong Microsoft Excel. Thay vì phải viết hàng chục công thức SUMIFS đa điều kiện phức tạp, PivotTable tự động tổng hợp, sắp xếp, gom nhóm và xoay chiều các tập dữ liệu khổng lồ thông qua giao diện kéo thả trực quan."
    },
    "conceptExplanation": {
      "en": "### 1. The Four PivotTable Drop Zones\n1. **Filters**: Page-level top filters to isolate subsets of data.\n2. **Columns**: Dimension fields that generate horizontal matrix column headers.\n3. **Rows**: Dimension fields that generate vertical row headers.\n4. **Values**: Numeric metric fields to aggregate (defaults to `SUM` for numbers, `COUNT` for text).\n\n### 2. Temporal & Numeric Grouping\n- **Date Grouping**: Right-click any date in a PivotTable -> Group -> Select **Years, Quarters, and Months**. Excel instantly creates hierarchical date rollups!\n- **Numeric Binning**: Right-click a number field (e.g. Age or Order Amount) -> Group -> Set Starting, Ending, and Increment Interval (e.g. groups of $1,000).\n\n### 3. \"Show Values As\" Calculations\nRight-click any value cell -> **Show Values As**:\n- **% of Grand Total**: Displays each cell's share of overall revenue.\n- **% of Column / Row Total**: Relative contribution within specific segments.\n- **% Difference From**: Compares month-over-month growth against a baseline.\n- **Running Total In**: Cumulative progression across time.\n\n### 4. Interactive Dashboard Controls\n- **Slicers**: One-click visual category filter tiles.\n- **Timelines**: Dedicated chronological date slider bars.\n- **Report Connections**: Connect a single Slicer to multiple PivotTables across the entire workbook!",
      "vi": "### 1. Bốn Vùng Thả Trường Của PivotTable\n1. **Filters**: Bộ lọc cấp cao nhất để lọc tách tập dữ liệu.\n2. **Columns**: Các trường danh mục tạo nên tiêu đề cột ngang của ma trận.\n3. **Rows**: Các trường danh mục tạo nên tiêu đề dòng dọc.\n4. **Values**: Các trường chỉ số số học để tổng hợp (mặc định là `SUM` cho số, `COUNT` cho chữ).\n\n### 2. Gom Nhóm Theo Thời Gian & Theo Khoảng Số\n- **Gom nhóm Ngày tháng**: Nhấp chuột phải vào ô ngày bất kỳ -> Group -> Chọn **Years, Quarters, Months**. Excel sẽ tự động tạo phân cấp thời gian!\n- **Chia nhóm Số (Binning)**: Nhấp chuột phải vào trường số (ví dụ Tuổi hoặc Doanh thu) -> Group -> Thiết lập điểm bắt đầu, kết thúc và bước nhảy (ví dụ từng khoảng 1.000$).\n\n### 3. Các Phép Tính \"Show Values As\"\nNhấp chuột phải vào ô giá trị -> **Show Values As**:\n- **% of Grand Total**: Hiển thị tỷ trọng phần trăm trên tổng số toàn bộ.\n- **% of Column / Row Total**: Tỷ trọng đóng góp trong từng phân khúc.\n- **% Difference From**: So sánh tăng trưởng so với mốc cơ sở (ví dụ tháng trước).\n- **Running Total In**: Cộng dồn tích lũy theo thời gian.\n\n### 4. Các Bộ Điều Khiển Bảng Điều Khiển Tương Tác\n- **Slicers**: Các nút bấm lọc danh mục trực quan.\n- **Timelines**: Thanh trượt niên đại chuyên dụng cho ngày tháng.\n- **Report Connections**: Kết nối một nút Slicer với nhiều PivotTable cùng lúc!"
    },
    "syntax": "# Recommended Practice:\n1. Always base PivotTables on an official Excel Table (ListObject) so refreshing (Alt + F5) pulls in newly added rows automatically.\n2. Slicer Report Connections: Right-click Slicer -> Report Connections -> Check all target PivotTables.",
    "examples": [
      {
        "title": {
          "en": "Creating a Year-over-Year Sales Pivot Summary",
          "vi": "Tạo Báo Cáo Doanh Số Theo Năm Bằng PivotTable"
        },
        "code": "Source Data: SalesTable (50,000 rows)\nRows Zone: Region, SalesRep\nColumns Zone: OrderDate (Grouped by Years)\nValues Zone: Revenue (Formatted as Currency)\n\nResult: Instant cross-tabulated regional matrix comparing 2024, 2025, and 2026.",
        "description": {
          "en": "Generates an executive regional performance matrix in seconds without writing a single line of formula.",
          "vi": "Tạo ma trận hiệu suất khu vực cấp quản trị trong vài giây mà không cần viết một dòng công thức nào."
        }
      },
      {
        "title": {
          "en": "Connecting Slicers Across Multiple PivotTables",
          "vi": "Kết Nối Slicers Với Nhiều PivotTable Cùng Lúc"
        },
        "code": "Dashboard Architecture:\n- PivotTable 1: Sales by Product Category\n- PivotTable 2: Sales by Region\n- PivotTable 3: Top 10 Sales Representatives\n\nAction: Insert Slicer for \"Quarter\" -> Report Connections -> Check PivotTable 1, 2, and 3.\nOutcome: Clicking \"Q3\" updates all three summary tables and linked charts simultaneously!",
        "description": {
          "en": "Report Connections enable multi-chart synchronous filtering for interactive executive reporting.",
          "vi": "Tính năng Report Connections cho phép lọc đồng bộ nhiều biểu đồ phục vụ báo cáo quản trị tương tác."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Expecting a PivotTable to update automatically when source cells change without manually triggering a Refresh (Alt + F5).",
          "vi": "Kỳ vọng PivotTable tự động cập nhật khi dữ liệu nguồn thay đổi mà không nhấn nút Refresh (Alt + F5)."
        },
        "correction": {
          "en": "PivotTables cache their data; always press Alt + F5 or click Data -> Refresh All to update Pivot summaries.",
          "vi": "PivotTable lưu bộ nhớ đệm; luôn nhấn Alt + F5 hoặc chọn Data -> Refresh All để cập nhật báo cáo."
        }
      }
    ],
    "tips": [
      {
        "en": "Refresh All Data Shortcut: Press Ctrl + Alt + F5 to instantly refresh every PivotTable and data query in the entire workbook.",
        "vi": "Phím tắt làm mới tất cả dữ liệu: Nhấn Ctrl + Alt + F5 để làm mới toàn bộ PivotTable và truy vấn dữ liệu trong toàn bộ file."
      },
      {
        "en": "Disable AutoFit on Update: In PivotTable Options -> Layout & Format, uncheck \"Autofit column widths on update\" to keep customized column widths intact when refreshing.",
        "vi": "Khóa độ rộng cột khi làm mới: Trong PivotTable Options, bỏ tích \"Autofit column widths on update\" để giữ nguyên độ rộng cột khi Refresh."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l17_ex1",
      "type": "complete_code",
      "title": {
        "en": "Identify Recommended Data Source for PivotTables",
        "vi": "Xác Định Nguồn Dữ Liệu Tốt Nhất Cho PivotTable"
      },
      "instruction": {
        "en": "Type the recommended source reference name for creating a dynamic PivotTable based on table \"TransactionsTable\".",
        "vi": "Gõ tên tham chiếu nguồn được khuyến nghị để tạo PivotTable động dựa trên bảng \"TransactionsTable\"."
      },
      "starterCode": "Transactions",
      "solutionCode": "TransactionsTable",
      "expectedOutput": "TransactionsTable",
      "hint": {
        "en": "Use the exact Table Name: TransactionsTable.",
        "vi": "Dùng chính xác Tên Bảng: TransactionsTable."
      },
      "explanation": {
        "en": "Basing PivotTables on Excel Tables ensures newly appended records are included upon refresh.",
        "vi": "Tạo PivotTable từ Bảng Excel đảm bảo các dòng mới thêm vào sẽ tự động được cập nhật khi refresh."
      }
    },
    {
      "id": "excel_l17_ex2",
      "type": "complete_code",
      "title": {
        "en": "Specify Refresh All Keyboard Shortcut",
        "vi": "Chỉ Định Phím Tắt Làm Mới Tất Cả Dữ Liệu"
      },
      "instruction": {
        "en": "Type the standard Excel keyboard shortcut used to refresh ALL PivotTables and connections in a workbook (format: Ctrl+Alt+F5).",
        "vi": "Gõ phím tắt chuẩn của Excel dùng để làm mới TẤT CẢ các PivotTable và kết nối trong sổ làm việc (định dạng: Ctrl+Alt+F5)."
      },
      "starterCode": "Ctrl+",
      "solutionCode": "Ctrl+Alt+F5",
      "expectedOutput": "Ctrl+Alt+F5",
      "hint": {
        "en": "Ctrl + Alt + F5.",
        "vi": "Ctrl + Alt + F5."
      },
      "explanation": {
        "en": "Ctrl + Alt + F5 triggers Refresh All across the entire workbook.",
        "vi": "Ctrl + Alt + F5 kích hoạt làm mới tất cả các nguồn trong toàn bộ file."
      }
    }
  ],
  "challenge": {
    "id": "excel_l17_challenge",
    "title": {
      "en": "Configure Multi-Dimensional Regional Sales Matrix Structure",
      "vi": "Cấu Hình Cấu Trúc Ma Trận Doanh Số Khu Vực Đa Chiều"
    },
    "description": {
      "en": "Specify the optimal PivotTable field placement strategy to build a cross-tabulated matrix showing total Revenue by Region (rows) and Year (columns), filtered by Department: state the drop zones.",
      "vi": "Chỉ định chiến lược sắp xếp trường PivotTable tối ưu để xây dựng ma trận doanh số Revenue theo Khu vực Region (hàng) và Năm Year (cột), được lọc theo Phòng ban Department."
    },
    "requirements": [
      {
        "en": "Rows: Region",
        "vi": "Rows: Region"
      },
      {
        "en": "Columns: Year",
        "vi": "Columns: Year"
      },
      {
        "en": "Values: SUM of Revenue",
        "vi": "Values: SUM of Revenue"
      },
      {
        "en": "Filters: Department",
        "vi": "Filters: Department"
      }
    ],
    "starterCode": "Rows: Region, Columns: Year, Values: SUM of Revenue, Filters: ",
    "solutionCode": "Rows: Region, Columns: Year, Values: SUM of Revenue, Filters: Department",
    "hints": [
      {
        "en": "Complete with \"Department\".",
        "vi": "Hoàn thành với \"Department\"."
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l17_q1",
      "type": "single_choice",
      "question": {
        "en": "What happens to a PivotTable when underlying source data changes in the worksheet?",
        "vi": "Điều gì xảy ra với PivotTable khi dữ liệu nguồn bên dưới bị thay đổi trong trang tính?"
      },
      "options": [
        {
          "en": "It does NOT update automatically; you must manually Refresh it (Alt + F5 or Ctrl + Alt + F5)",
          "vi": "Nó KHÔNG tự động cập nhật ngay; bạn phải làm mới Refresh thủ công (Alt + F5 hoặc Ctrl + Alt + F5)"
        },
        {
          "en": "It updates instantly in real time like a cell formula",
          "vi": "Nó cập nhật ngay lập tức theo thời gian thực như một công thức ô"
        },
        {
          "en": "It crashes the workbook",
          "vi": "Nó làm sập file bảng tính"
        },
        {
          "en": "It deletes the modified rows",
          "vi": "Nó xóa các dòng đã chỉnh sửa"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "PivotTables store a snapshot of data in the Pivot Cache and require a Refresh operation to reload source updates.",
        "vi": "PivotTable lưu một bản sao dữ liệu trong bộ nhớ đệm Pivot Cache và yêu cầu lệnh Refresh để tải lại dữ liệu mới."
      },
      "difficulty": "easy",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q2",
      "type": "single_choice",
      "question": {
        "en": "How can you group daily transaction dates into Months, Quarters, and Years in a PivotTable?",
        "vi": "Làm thế nào để gom nhóm các ngày giao dịch thành Tháng, Quý và Năm trong PivotTable?"
      },
      "options": [
        {
          "en": "Right-click any date cell in the PivotTable -> Group -> Select Months, Quarters, Years",
          "vi": "Nhấp chuột phải vào ô ngày bất kỳ trong PivotTable -> Group -> Chọn Months, Quarters, Years"
        },
        {
          "en": "Write a custom VBA macro",
          "vi": "Viết một macro VBA tùy chỉnh"
        },
        {
          "en": "Add three new formula columns to the source data manually",
          "vi": "Thêm thủ công 3 cột công thức mới vào bảng nguồn"
        },
        {
          "en": "Sort the column ascending",
          "vi": "Sắp xếp cột tăng dần"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The native Group feature in PivotTables creates virtual hierarchical calendar grouping buckets automatically.",
        "vi": "Tính năng Group có sẵn trong PivotTable tự động tạo các nhóm phân cấp lịch một cách tự động."
      },
      "difficulty": "easy",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q3",
      "type": "single_choice",
      "question": {
        "en": "What feature allows a single Slicer to simultaneously filter multiple different PivotTables across a dashboard?",
        "vi": "Tính năng nào cho phép một nút Slicer duy nhất lọc đồng thời nhiều PivotTable khác nhau trên trang tổng hợp?"
      },
      "options": [
        {
          "en": "Report Connections (Slicer Settings)",
          "vi": "Report Connections (Cài đặt Slicer)"
        },
        {
          "en": "Multi-Select mode",
          "vi": "Chế độ Multi-Select"
        },
        {
          "en": "Power Pivot Link",
          "vi": "Power Pivot Link"
        },
        {
          "en": "AutoFilter Sync",
          "vi": "AutoFilter Sync"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Right-clicking a Slicer and selecting \"Report Connections\" lets you connect the control to multiple PivotTables sharing the same cache.",
        "vi": "Nhấp chuột phải vào Slicer và chọn \"Report Connections\" cho phép bạn kết nối bộ điều khiển với nhiều PivotTable cùng nguồn."
      },
      "difficulty": "medium",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q4",
      "type": "single_choice",
      "question": {
        "en": "Which \"Show Values As\" calculation displays each line item as a percentage of the total category revenue?",
        "vi": "Tùy chọn \"Show Values As\" nào hiển thị từng mục dữ liệu dưới dạng tỷ lệ phần trăm trên tổng doanh thu danh mục?"
      },
      "options": [
        {
          "en": "% of Column Total (or % of Parent Row Total)",
          "vi": "% of Column Total (hoặc % of Parent Row Total)"
        },
        {
          "en": "Difference From",
          "vi": "Difference From"
        },
        {
          "en": "Running Total",
          "vi": "Running Total"
        },
        {
          "en": "Rank Smallest to Largest",
          "vi": "Rank Smallest to Largest"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "% of Column Total computes the ratio of each cell against the column aggregate total.",
        "vi": "% of Column Total tính toán tỷ lệ của từng ô so với số tổng cộng của cả cột."
      },
      "difficulty": "easy",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q5",
      "type": "single_choice",
      "question": {
        "en": "What is a PivotTable Timeline in Excel?",
        "vi": "PivotTable Timeline trong Excel là gì?"
      },
      "options": [
        {
          "en": "A dedicated visual slider filter designed specifically for chronological date fields",
          "vi": "Một thanh trượt lọc trực quan chuyên dụng được thiết kế riêng cho các trường ngày tháng theo niên đại"
        },
        {
          "en": "A Gantt chart generator",
          "vi": "Một trình tạo biểu đồ Gantt"
        },
        {
          "en": "A history log of workbook revisions",
          "vi": "Một nhật ký lịch sử chỉnh sửa file"
        },
        {
          "en": "An animation tool",
          "vi": "Một công cụ tạo chuyển động"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Timelines provide an interactive visual control for zooming and filtering date ranges by Days, Months, Quarters, or Years.",
        "vi": "Timelines cung cấp bộ điều khiển trực quan giúp phóng to và lọc khoảng ngày tháng theo Ngày, Tháng, Quý hoặc Năm."
      },
      "difficulty": "easy",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q6",
      "type": "single_choice",
      "question": {
        "en": "What is the \"Pivot Cache\"?",
        "vi": "\"Pivot Cache\" trong Excel là gì?"
      },
      "options": [
        {
          "en": "An optimized in-memory copy of the source data created when a PivotTable is built",
          "vi": "Một bản sao dữ liệu nguồn được tối ưu hóa lưu trong bộ nhớ RAM khi PivotTable được tạo"
        },
        {
          "en": "A hidden worksheet where deleted rows go",
          "vi": "Một trang tính ẩn nơi chứa các dòng đã xóa"
        },
        {
          "en": "The browser cache",
          "vi": "Bộ nhớ đệm của trình duyệt"
        },
        {
          "en": "A password vault",
          "vi": "Một két sắt lưu mật khẩu"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The Pivot Cache holds an indexed memory representation of the data, allowing blazing fast aggregation queries without constantly rescanning the worksheet.",
        "vi": "Pivot Cache lưu trữ cấu trúc dữ liệu được lập chỉ mục trong bộ nhớ, cho phép tính toán tổng hợp siêu nhanh mà không cần quét lại toàn bộ trang tính."
      },
      "difficulty": "medium",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q7",
      "type": "true_false",
      "question": {
        "en": "True or False: Double-clicking any numeric summary cell in a PivotTable creates a brand new worksheet containing the exact drill-down source records behind that number.",
        "vi": "Đúng hay Sai: Nhấp đúp chuột vào bất kỳ ô số tổng kết nào trong PivotTable sẽ tự động tạo một trang tính mới chứa chi tiết các dòng dữ liệu gốc tạo nên con số đó."
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
        "en": "True. Double-clicking a Pivot value cell triggers the \"Show Details\" drill-down feature, outputting matching rows to a new tab.",
        "vi": "Đúng. Nhấp đúp vào ô giá trị trong Pivot sẽ kích hoạt tính năng \"Show Details\", trích xuất toàn bộ các dòng liên quan ra một tab mới."
      },
      "difficulty": "easy",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q8",
      "type": "single_choice",
      "question": {
        "en": "Why is it best practice to build PivotTables from an official Excel Table rather than a standard range like `A1:F1000`?",
        "vi": "Tại sao việc tạo PivotTable từ một Bảng Excel (Table) lại là phương pháp tối ưu hơn so với dải ô thông thường như `A1:F1000`?"
      },
      "options": [
        {
          "en": "New rows added to the Table are automatically included in the PivotTable range upon refreshing without modifying the data source coordinates",
          "vi": "Các dòng mới thêm vào Bảng sẽ tự động được bao gồm trong PivotTable khi refresh mà không cần sửa lại tọa độ nguồn dữ liệu"
        },
        {
          "en": "It makes the file 90% smaller",
          "vi": "Nó làm file nhỏ hơn 90%"
        },
        {
          "en": "It translates the headers into French",
          "vi": "Nó dịch tiêu đề sang tiếng Pháp"
        },
        {
          "en": "PivotTables do not work on normal ranges",
          "vi": "PivotTable không hoạt động được trên dải ô thông thường"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Excel Tables dynamically expand, so the PivotTable source range never needs manual row expansion.",
        "vi": "Bảng Excel tự động mở rộng, do đó dải nguồn của PivotTable không bao giờ cần điều chỉnh số dòng thủ công."
      },
      "difficulty": "easy",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q9",
      "type": "single_choice",
      "question": {
        "en": "How do you prevent column widths from resizing every time you refresh a PivotTable?",
        "vi": "Làm thế nào để ngăn các cột tự động co giãn kích thước mỗi khi bạn làm mới (Refresh) PivotTable?"
      },
      "options": [
        {
          "en": "Right-click PivotTable -> PivotTable Options -> Uncheck \"Autofit column widths on update\"",
          "vi": "Nhấp chuột phải vào PivotTable -> PivotTable Options -> Bỏ chọn \"Autofit column widths on update\""
        },
        {
          "en": "Lock the entire worksheet with a password",
          "vi": "Khóa toàn bộ trang tính bằng mật khẩu"
        },
        {
          "en": "Set columns to width 100",
          "vi": "Đặt độ rộng cột thành 100"
        },
        {
          "en": "Delete all blank cells",
          "vi": "Xóa tất cả các ô trống"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Disabling \"Autofit column widths on update\" prevents Excel from snapping column sizes back to default upon refresh.",
        "vi": "Bỏ chọn \"Autofit column widths on update\" giúp giữ nguyên độ rộng cột bạn đã căn chỉnh khi refresh."
      },
      "difficulty": "medium",
      "topicId": "excel_pivottables"
    },
    {
      "id": "excel_l17_q10",
      "type": "single_choice",
      "question": {
        "en": "What aggregation function does Excel assign by default when a text field is dragged into the Values area?",
        "vi": "Hàm tổng hợp nào được Excel gán mặc định khi kéo một trường chứa văn bản vào khu vực Values?"
      },
      "options": [
        {
          "en": "COUNT",
          "vi": "COUNT"
        },
        {
          "en": "SUM",
          "vi": "SUM"
        },
        {
          "en": "AVERAGE",
          "vi": "AVERAGE"
        },
        {
          "en": "CONCATENATE",
          "vi": "CONCATENATE"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Numeric fields default to SUM, but non-numeric/text fields automatically default to COUNT.",
        "vi": "Các trường dạng số mặc định là hàm SUM, nhưng các trường chứa chữ/văn bản sẽ tự động mặc định là hàm COUNT."
      },
      "difficulty": "easy",
      "topicId": "excel_pivottables"
    }
  ]
};
export default lesson17;
