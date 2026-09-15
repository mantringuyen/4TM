import { Lesson } from '../../../../types';

export const lesson19: Lesson = {
  "id": "excel_lesson_19",
  "order": 19,
  "moduleId": "excel_mod_5",
  "courseId": "excel",
  "levelId": "advanced",
  "topicId": "excel_power_query",
  "title": {
    "en": "Power Query & Modern Data Transformation: Extract, Transform & Load (ETL)",
    "vi": "Power Query & Chuyển Đổi Dữ Liệu Hiện Đại: Trích Xuất, Biến Đổi & Nạp Dữ Liệu (ETL)"
  },
  "summary": {
    "en": "Automate tedious data cleaning pipelines forever: connecting to external CSVs, folders, and SQL databases, the Power Query Editor interface, Applied Steps audit log, unpivoting cross-tabulated reports, merging relational tables (Joins), appending files, and one-click data refreshes.",
    "vi": "Tự động hóa vĩnh viễn các quy trình làm sạch dữ liệu thủ công: kết nối với CSV, thư mục tệp và cơ sở dữ liệu SQL, giao diện Power Query Editor, nhật ký bước thực hiện Applied Steps, chuyển đổi Unpivot báo cáo ma trận về dạng bảng chuẩn, hợp nhất bảng (Joins), nối dữ liệu Append và làm mới chỉ với một cú nhấp chuột."
  },
  "learn": {
    "introduction": {
      "en": "Data professionals spend up to 80% of their working hours manually cleaning, copying, and reshaping messy spreadsheets. Power Query (Get & Transform Data) is Excel's built-in, industrial-grade ETL engine. Every transformation step you perform is recorded as a reusable script in the M language, transforming hours of repetitive manual data prep into a single click of the \"Refresh\" button.",
      "vi": "Các chuyên gia phân tích dữ liệu thường mất tới 80% thời gian chỉ để làm sạch, sao chép và định dạng lại các bảng tính lộn xộn. Power Query (Get & Transform Data) là công cụ ETL chuẩn công nghiệp được tích hợp sẵn trong Excel. Mọi bước xử lý bạn thực hiện đều được lưu lại thành quy trình tự động hóa bằng ngôn ngữ M, biến hàng giờ dọn dẹp dữ liệu thủ công thành một cú bấm nút \"Refresh\" duy nhất."
    },
    "conceptExplanation": {
      "en": "### 1. The Core ETL Paradigm (Extract -> Transform -> Load)\n- **Extract (Get Data)**: Connect to external data sources without opening them (Excel files, CSVs, entire folders of monthly files, SharePoint, Web pages, SQL databases).\n- **Transform**: Clean and shape data inside the dedicated Power Query Editor window without altering raw source files.\n- **Load (Close & Load To)**: Output clean data into an Excel Table, a PivotTable cache, or straight into the Data Model.\n\n### 2. Essential Power Query Transformations\n- **Applied Steps (Audit Log)**: Every action (removing columns, changing types, filtering rows) is recorded in order. You can delete, reorder, or modify any historical step!\n- **Data Type Casting**: Explicitly set Text, Whole Number, Currency, Date, or Percentage to eliminate formula mismatches.\n- **Unpivot Columns**: Converts human-readable wide matrix reports (e.g. 12 month columns) into database-ready tall tabular formats (Attribute + Value pairs) in two clicks!\n- **Merge Queries (Relational Joins)**: Joins two tables on a shared key (Left Outer Join, Inner Join, Full Outer Join) without writing a single VLOOKUP.\n- **Append Queries (Stacking)**: Combines multiple identically structured tables vertically (e.g. Jan + Feb + Mar into a single Year table).",
      "vi": "### 1. Mô Hình ETL Cốt Lõi (Trích Xuất -> Biến Đổi -> Nạp Dữ Liệu)\n- **Extract (Get Data)**: Kết nối với các nguồn dữ liệu bên ngoài mà không cần mở trực tiếp (tệp Excel, CSV, toàn bộ thư mục chứa tệp báo cáo tháng, SharePoint, trang web, cơ sở dữ liệu SQL).\n- **Transform**: Làm sạch và định hình dữ liệu bên trong cửa sổ Power Query Editor chuyên biệt mà không làm ảnh hưởng đến tệp dữ liệu gốc.\n- **Load (Close & Load To)**: Xuất dữ liệu sạch ra Bảng Excel, bộ nhớ PivotTable hoặc nạp thẳng vào Data Model.\n\n### 2. Các Phép Biến Đổi Cốt Lõi Trong Power Query\n- **Applied Steps (Nhật Ký Các Bước)**: Mọi thao tác (xóa cột, đổi kiểu dữ liệu, lọc dòng) đều được ghi lại theo thứ tự. Bạn có thể xóa, đổi thứ tự hoặc chỉnh sửa bất kỳ bước nào trong quá khứ!\n- **Chuyển Đổi Kiểu Dữ Liệu (Data Type Casting)**: Thiết lập rõ ràng kiểu Text, Whole Number, Currency, Date để tránh lỗi tính toán.\n- **Unpivot Columns (Xoay Cột Thành Dòng)**: Chuyển đổi báo cáo ma trận dạng ngang (12 cột tháng) thành bảng dữ liệu dọc chuẩn cơ sở dữ liệu (cặp cột Thuộc tính + Giá trị) chỉ trong 2 cú nhấp chuột!\n- **Merge Queries (Nối Bảng Theo Quan Hệ - Joins)**: Kết hợp hai bảng dựa trên khóa chung (Left Outer Join, Inner Join) mà không cần viết hàm VLOOKUP.\n- **Append Queries (Ghép Chồng Dữ Liệu)**: Xếp chồng nhiều bảng có cùng cấu trúc theo chiều dọc (ví dụ ghép Tháng 1 + Tháng 2 + Tháng 3 thành 1 bảng tổng hợp)."
    },
    "syntax": "# Access Power Query in Excel:\nData Tab -> Get Data -> From File / From Database / From Other Sources\n\n# In Power Query Editor:\n- Unpivot: Select static ID columns -> Transform tab -> Unpivot Other Columns\n- Combine: Home tab -> Merge Queries (Joins) / Append Queries (Stacking)\n- Output: Home tab -> Close & Load To -> Table / Data Model",
    "examples": [
      {
        "title": {
          "en": "Unpivoting 12 Monthly Budget Columns into a Clean Tabular Dataset",
          "vi": "Unpivot 12 Cột Ngân Sách Tháng Thành Bảng Dữ Liệu Chuẩn"
        },
        "code": "Raw Data Shape: Department, ExpenseCode, Jan, Feb, Mar, Apr, ..., Dec (14 columns)\nProblem: Cannot build PivotTables easily from wide horizontal columns.\n\nPower Query Transformation:\n1. Select 'Department' and 'ExpenseCode'.\n2. Right-click -> \"Unpivot Other Columns\".\n3. Rename 'Attribute' -> 'Month', Rename 'Value' -> 'BudgetValue'.\n\nResult: A clean 4-column database ready for immediate PivotTable aggregation!",
        "description": {
          "en": "Transforms human-formatted matrix tables into normalized 3NF database records automatically.",
          "vi": "Tự động biến đổi bảng ma trận định dạng cho người xem thành bản ghi chuẩn hóa cơ sở dữ liệu."
        }
      },
      {
        "title": {
          "en": "Consolidating an Entire Folder of 50 Monthly CSV Files",
          "vi": "Tự Động Gộp Toàn Bộ Thư Mục Gồm 50 Tệp CSV Tháng"
        },
        "code": "Data Source: Data Tab -> Get Data -> From File -> From Folder\nAction: Select Folder Path -> Click \"Combine & Transform Data\".\nPower Query automatically iterates through every CSV, cleans headers, and stacks all 50 files into one unified 500,000-row master table!",
        "description": {
          "en": "Dropping a new month's CSV into the folder and pressing Data -> Refresh All pulls the new data into the master model instantly.",
          "vi": "Chỉ cần thả tệp CSV tháng mới vào thư mục và nhấn Refresh All, dữ liệu mới sẽ tự động nạp vào mô hình tổng."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Renaming or moving the raw source file path on your local drive, causing Power Query to fail with a \"Data Source Not Found\" error upon refresh.",
          "vi": "Đổi tên hoặc di chuyển đường dẫn tệp nguồn trên ổ đĩa, khiến Power Query báo lỗi \"Data Source Not Found\" khi Refresh."
        },
        "correction": {
          "en": "Keep source file paths consistent or use Data Source Settings to repoint the query to the new directory.",
          "vi": "Giữ nguyên đường dẫn tệp nguồn hoặc dùng Data Source Settings để trỏ lại truy vấn đến thư mục mới."
        }
      }
    ],
    "tips": [
      {
        "en": "Close & Load To... Options: Use \"Only Create Connection\" and check \"Add this data to the Data Model\" for multi-million row datasets to bypass the 1,048,576 worksheet row limit.",
        "vi": "Tùy chọn Close & Load To: Chọn \"Only Create Connection\" và tích \"Add this data to the Data Model\" cho tập dữ liệu hàng triệu dòng để vượt qua giới hạn 1.048.576 dòng của trang tính."
      },
      {
        "en": "View M Code in Advanced Editor: Click Home -> Advanced Editor in Power Query to inspect and edit the underlying M transformation code directly.",
        "vi": "Xem mã M trong Advanced Editor: Bấm Home -> Advanced Editor trong Power Query để xem và chỉnh sửa trực tiếp mã lệnh M."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l19_ex1",
      "type": "complete_code",
      "title": {
        "en": "Identify Power Query Underlying Language",
        "vi": "Xác Định Ngôn Ngữ Nền Tảng Của Power Query"
      },
      "instruction": {
        "en": "Type the single-letter official name of the functional, case-sensitive programming language used by Power Query under the hood (format: M).",
        "vi": "Gõ tên chính thức gồm 1 chữ cái của ngôn ngữ lập trình hàm phân biệt hoa thường được Power Query sử dụng bên dưới (định dạng: M)."
      },
      "starterCode": "",
      "solutionCode": "M",
      "expectedOutput": "M",
      "hint": {
        "en": "The M language.",
        "vi": "Ngôn ngữ M."
      },
      "explanation": {
        "en": "Power Query generates code in the M functional formula language (Power Query M Formula Language).",
        "vi": "Power Query tạo ra mã lệnh bằng ngôn ngữ công thức hàm M."
      }
    },
    {
      "id": "excel_l19_ex2",
      "type": "complete_code",
      "title": {
        "en": "Identify Transformation to Convert Columns to Rows",
        "vi": "Xác Định Phép Biến Đổi Chuyển Cột Thành Hàng"
      },
      "instruction": {
        "en": "Type the exact name of the Power Query transformation feature used to convert wide multi-column cross-tabulated reports into tall normalized rows (format: Unpivot).",
        "vi": "Gõ tên chính xác của tính năng biến đổi trong Power Query dùng để chuyển báo cáo ma trận nhiều cột thành dạng hàng chuẩn hóa dọc (định dạng: Unpivot)."
      },
      "starterCode": "Un",
      "solutionCode": "Unpivot",
      "expectedOutput": "Unpivot",
      "hint": {
        "en": "Unpivot (or Unpivot Columns).",
        "vi": "Unpivot (hoặc Unpivot Columns)."
      },
      "explanation": {
        "en": "Unpivot transforms attribute columns into key-value attribute pairs.",
        "vi": "Unpivot chuyển các cột thuộc tính thành các cặp giá trị - thuộc tính dạng dòng."
      }
    }
  ],
  "challenge": {
    "id": "excel_l19_challenge",
    "title": {
      "en": "Design an Automated Multi-File Folder ETL Workflow",
      "vi": "Thiết Kế Quy Trình ETL Tự Động Hóa Thư Mục Đa Tệp"
    },
    "description": {
      "en": "State the primary Power Query operation used to combine and stack multiple monthly transaction CSV files located in a shared directory: type \"Combine & Transform Data\".",
      "vi": "Nêu thao tác Power Query chính dùng để kết hợp và ghép chồng nhiều tệp CSV giao dịch tháng trong cùng một thư mục: gõ \"Combine & Transform Data\"."
    },
    "requirements": [
      {
        "en": "Type exact string \"Combine & Transform Data\"",
        "vi": "Gõ chính xác chuỗi \"Combine & Transform Data\""
      }
    ],
    "starterCode": "Combine",
    "solutionCode": "Combine & Transform Data",
    "hints": [
      {
        "en": "Combine & Transform Data",
        "vi": "Combine & Transform Data"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l19_q1",
      "type": "single_choice",
      "question": {
        "en": "What does the acronym \"ETL\" stand for in modern data analytics?",
        "vi": "Từ viết tắt \"ETL\" đại diện cho cụm từ nào trong phân tích dữ liệu hiện đại?"
      },
      "options": [
        {
          "en": "Extract, Transform, Load",
          "vi": "Extract, Transform, Load (Trích xuất, Biến đổi, Nạp dữ liệu)"
        },
        {
          "en": "Enter, Test, Lock",
          "vi": "Enter, Test, Lock"
        },
        {
          "en": "Evaluate, Transpose, Link",
          "vi": "Evaluate, Transpose, Link"
        },
        {
          "en": "Excel Table Language",
          "vi": "Excel Table Language"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "ETL stands for Extracting data from sources, Transforming/cleaning it, and Loading it into downstream destination models.",
        "vi": "ETL là viết tắt của Trích xuất (Extract) dữ liệu từ nguồn, Biến đổi/làm sạch (Transform) và Nạp (Load) vào mô hình đích."
      },
      "difficulty": "easy",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q2",
      "type": "single_choice",
      "question": {
        "en": "What language does Power Query use behind the scenes to record every transformation step?",
        "vi": "Power Query sử dụng ngôn ngữ nào bên dưới để ghi lại từng bước chuyển đổi dữ liệu?"
      },
      "options": [
        {
          "en": "M Language (Power Query M Formula Language)",
          "vi": "Ngôn ngữ M (Power Query M Formula Language)"
        },
        {
          "en": "VBA",
          "vi": "VBA"
        },
        {
          "en": "Python",
          "vi": "Python"
        },
        {
          "en": "SQL only",
          "vi": "Chỉ có SQL"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Power Query is powered by M, a functional, case-sensitive data transformation language.",
        "vi": "Power Query được vận hành bởi M, một ngôn ngữ chuyển đổi dữ liệu dạng hàm và phân biệt chữ hoa chữ thường."
      },
      "difficulty": "easy",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q3",
      "type": "single_choice",
      "question": {
        "en": "What is the purpose of the \"Unpivot Columns\" transformation in Power Query?",
        "vi": "Mục đích của phép biến đổi \"Unpivot Columns\" trong Power Query là gì?"
      },
      "options": [
        {
          "en": "Converts wide cross-tabulated matrix columns into tall normalized key-value attribute rows",
          "vi": "Chuyển đổi các cột báo cáo ma trận dạng ngang thành các hàng thuộc tính giá trị chuẩn hóa dạng dọc"
        },
        {
          "en": "Deletes all PivotTables from the sheet",
          "vi": "Xóa toàn bộ PivotTable khỏi trang tính"
        },
        {
          "en": "Rotates chart axes",
          "vi": "Xoay trục biểu đồ"
        },
        {
          "en": "Transposes headers into footnotes",
          "vi": "Chuyển tiêu đề thành chú thích chân trang"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Unpivoting reshapes human-readable matrix columns into flat database-ready records for PivotTable and Power BI modeling.",
        "vi": "Unpivot biến đổi các cột ma trận định dạng ngang thành các bản ghi cơ sở dữ liệu phẳng phục vụ mô hình hóa PivotTable và Power BI."
      },
      "difficulty": "medium",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q4",
      "type": "single_choice",
      "question": {
        "en": "What is the difference between \"Merge Queries\" and \"Append Queries\" in Power Query?",
        "vi": "Sự khác biệt giữa \"Merge Queries\" và \"Append Queries\" trong Power Query là gì?"
      },
      "options": [
        {
          "en": "Merge joins two tables horizontally based on matching key columns (like a SQL Join / VLOOKUP); Append stacks tables vertically on top of each other (like SQL UNION)",
          "vi": "Merge nối hai bảng theo chiều ngang dựa trên cột khóa khớp (như SQL Join / VLOOKUP); Append xếp chồng các bảng theo chiều dọc (như SQL UNION)"
        },
        {
          "en": "Merge is for text; Append is for numbers",
          "vi": "Merge dành cho chữ; Append dành cho số"
        },
        {
          "en": "Append deletes the original query",
          "vi": "Append xóa truy vấn gốc"
        },
        {
          "en": "They perform the exact same function",
          "vi": "Chúng thực hiện chức năng hoàn toàn giống nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Merge combines columns based on relationships (joins). Append combines rows by stacking datasets vertically.",
        "vi": "Merge kết hợp các cột dựa trên mối quan hệ khóa (joins). Append kết hợp các hàng bằng cách ghép chồng các tập dữ liệu theo chiều dọc."
      },
      "difficulty": "medium",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q5",
      "type": "single_choice",
      "question": {
        "en": "Where can you view, delete, reorder, or edit individual transformation actions inside Power Query Editor?",
        "vi": "Nơi nào cho phép bạn xem, xóa, đổi thứ tự hoặc chỉnh sửa từng thao tác biến đổi bên trong Power Query Editor?"
      },
      "options": [
        {
          "en": "The \"Applied Steps\" pane on the right-side Query Settings panel",
          "vi": "Khung \"Applied Steps\" trên bảng Query Settings ở phía bên phải"
        },
        {
          "en": "The Windows Event Viewer",
          "vi": "Trình xem sự kiện Windows Event Viewer"
        },
        {
          "en": "The Formula Bar only",
          "vi": "Chỉ trên thanh công thức Formula Bar"
        },
        {
          "en": "Macro Security Settings",
          "vi": "Cài đặt Macro Security"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Applied Steps logs every transformation step sequentially, allowing non-destructive auditing and modifications.",
        "vi": "Applied Steps ghi lại tuần tự từng bước biến đổi, cho phép kiểm tra và chỉnh sửa quy trình mà không làm mất dữ liệu gốc."
      },
      "difficulty": "easy",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q6",
      "type": "true_false",
      "question": {
        "en": "True or False: Power Query alters and overwrites the original source CSV or database file when cleaning data.",
        "vi": "Đúng hay Sai: Power Query sẽ trực tiếp thay đổi và ghi đè lên tệp CSV hoặc cơ sở dữ liệu nguồn gốc khi làm sạch dữ liệu."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False (Power Query connects read-only and transforms data in-memory)",
          "vi": "Sai (Power Query chỉ kết nối đọc dữ liệu và biến đổi trên bộ nhớ tạm)"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "False. Power Query reads data non-destructively; source files are never modified or overwritten.",
        "vi": "Sai. Power Query đọc dữ liệu ở chế độ chỉ đọc; tệp dữ liệu nguồn không bao giờ bị chỉnh sửa hoặc ghi đè."
      },
      "difficulty": "easy",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q7",
      "type": "single_choice",
      "question": {
        "en": "How do you load a 5-million row dataset into Excel using Power Query without hitting the 1,048,576 worksheet row limit?",
        "vi": "Làm thế nào để nạp tập dữ liệu 5 triệu dòng vào Excel bằng Power Query mà không bị vượt quá giới hạn 1.048.576 dòng của trang tính?"
      },
      "options": [
        {
          "en": "Close & Load To... -> Select \"Only Create Connection\" and check \"Add this data to the Data Model\"",
          "vi": "Close & Load To... -> Chọn \"Only Create Connection\" và tích chọn \"Add this data to the Data Model\""
        },
        {
          "en": "Split into 5 different Excel files",
          "vi": "Chia thành 5 tệp Excel khác nhau"
        },
        {
          "en": "Delete 4 million rows",
          "vi": "Xóa bớt 4 triệu dòng"
        },
        {
          "en": "Excel cannot handle more than 1 million rows under any circumstances",
          "vi": "Excel không thể xử lý quá 1 triệu dòng trong bất kỳ trường hợp nào"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The Excel Data Model (Power Pivot engine) can store hundreds of millions of compressed rows in memory without populating worksheet grid cells.",
        "vi": "Excel Data Model (bộ xử lý Power Pivot) có thể lưu trữ hàng trăm triệu dòng nén trong bộ nhớ RAM mà không cần đổ dữ liệu ra các ô trang tính."
      },
      "difficulty": "hard",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q8",
      "type": "single_choice",
      "question": {
        "en": "What join kind in Power Query returns all rows from the primary first table and only matching records from the secondary table?",
        "vi": "Kiểu kết nối Join nào trong Power Query trả về tất cả các dòng từ bảng chính đầu tiên và chỉ những bản ghi khớp từ bảng thứ hai?"
      },
      "options": [
        {
          "en": "Left Outer Join",
          "vi": "Left Outer Join"
        },
        {
          "en": "Right Outer Join",
          "vi": "Right Outer Join"
        },
        {
          "en": "Full Outer Join",
          "vi": "Full Outer Join"
        },
        {
          "en": "Inner Join",
          "vi": "Inner Join"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Left Outer preserves all primary records from Table 1 and pulls attributes from Table 2 where keys match.",
        "vi": "Left Outer giữ lại toàn bộ các dòng từ Bảng 1 và lấy thêm các thuộc tính từ Bảng 2 tại các vị trí khớp khóa."
      },
      "difficulty": "medium",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q9",
      "type": "single_choice",
      "question": {
        "en": "What is the \"Advanced Editor\" in Power Query used for?",
        "vi": "\"Advanced Editor\" trong Power Query được sử dụng để làm gì?"
      },
      "options": [
        {
          "en": "Viewing, debugging, and directly editing the complete M code query script",
          "vi": "Xem, gỡ lỗi và chỉnh sửa trực tiếp toàn bộ tập lệnh mã M của truy vấn"
        },
        {
          "en": "Editing VBA macros",
          "vi": "Chỉnh sửa macro VBA"
        },
        {
          "en": "Designing 3D charts",
          "vi": "Thiết kế biểu đồ 3D"
        },
        {
          "en": "Managing Excel add-ins",
          "vi": "Quản lý các tiện ích bổ sung của Excel"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The Advanced Editor exposes the entire programmatic M script representing the query's transformation pipeline.",
        "vi": "Advanced Editor hiển thị toàn bộ mã lệnh M đại diện cho quy trình chuyển đổi dữ liệu của truy vấn."
      },
      "difficulty": "medium",
      "topicId": "excel_power_query"
    },
    {
      "id": "excel_l19_q10",
      "type": "single_choice",
      "question": {
        "en": "How do you refresh all Power Query connections in an active workbook?",
        "vi": "Làm thế nào để làm mới (Refresh) tất cả các kết nối Power Query trong sổ làm việc hiện tại?"
      },
      "options": [
        {
          "en": "Data tab -> Click \"Refresh All\" (or press Ctrl + Alt + F5)",
          "vi": "Thẻ Data -> Bấm \"Refresh All\" (hoặc nhấn Ctrl + Alt + F5)"
        },
        {
          "en": "Close and reopen Excel 5 times",
          "vi": "Đóng và mở lại Excel 5 lần"
        },
        {
          "en": "Press Shift + F9",
          "vi": "Nhấn Shift + F9"
        },
        {
          "en": "Rebuild the query from scratch",
          "vi": "Tạo lại truy vấn từ đầu"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Refresh All re-executes all M transformation scripts against external data sources and repopulates destination tables.",
        "vi": "Refresh All thực thi lại tất cả các tập lệnh M đối với nguồn dữ liệu ngoài và nạp lại dữ liệu mới vào các bảng đích."
      },
      "difficulty": "easy",
      "topicId": "excel_power_query"
    }
  ]
};
export default lesson19;
