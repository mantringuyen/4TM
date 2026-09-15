import { Lesson } from '../../../../types';

export const lesson22: Lesson = {
  "id": "excel_lesson_22",
  "order": 22,
  "moduleId": "excel_mod_6",
  "courseId": "excel",
  "levelId": "advanced",
  "topicId": "excel_power_pivot",
  "title": {
    "en": "Power Pivot, The Excel Data Model, Star Schema Design & DAX Measures",
    "vi": "Power Pivot, Mô Hình Dữ Liệu Data Model, Thiết Kế Sơ Đồ Sao & Các Thước Đo DAX"
  },
  "summary": {
    "en": "Handle 100M+ rows and build enterprise BI models inside Excel: xVelocity in-memory columnar database, 1-to-many relationship modeling (eliminating VLOOKUP helper columns), Star Schema design (Fact vs Dimension tables), and DAX measures (CALCULATE, SUMX, RELATED, DIVIDE, Time Intelligence).",
    "vi": "Xử lý hơn 100 triệu dòng và xây dựng mô hình BI doanh nghiệp ngay trong Excel: cơ sở dữ liệu dạng cột xVelocity lưu trong RAM, mô hình hóa quan hệ 1-nhiều (xóa bỏ cột phụ VLOOKUP), thiết kế Sơ đồ sao Star Schema (Bảng Fact vs Dimension) và viết thước đo DAX (CALCULATE, SUMX, RELATED, DIVIDE, Time Intelligence)."
  },
  "learn": {
    "introduction": {
      "en": "Traditional spreadsheets break down when joining multi-million row tables: writing millions of VLOOKUP formulas balloons file sizes to gigabytes and causes Excel to crash. Power Pivot introduces Microsoft's tabular database engine (the same engine powering Power BI) directly inside Excel, enabling instant relational modeling and ultra-fast DAX analytical calculations.",
      "vi": "Bảng tính truyền thống sẽ bị tê liệt khi liên kết các bảng hàng triệu dòng: viết hàng triệu công thức VLOOKUP làm dung lượng tệp phình to hàng Gigabyte và khiến Excel bị treo. Power Pivot mang bộ xử lý cơ sở dữ liệu dạng bảng của Microsoft (cùng bộ xử lý vận hành Power BI) vào trực tiếp trong Excel, cho phép mô hình hóa quan hệ tức thì và tính toán thước đo DAX siêu tốc."
    },
    "conceptExplanation": {
      "en": "### 1. The Power Pivot Data Model Architecture\n- **In-Memory Columnar Storage**: Uses the xVelocity engine to compress multi-million row tables by up to 90%, storing data in RAM.\n- **Relational Diagram View**: Connect tables by dragging primary keys to foreign keys (e.g. `DimCustomer[CustomerID]` -> `FactSales[CustomerID]`).\n- **Eliminating VLOOKUP**: Relationships resolve data attributes instantly without adding redundant helper columns to fact tables!\n\n### 2. Star Schema Modeling Principles\n- **Fact Tables (Center)**: Contain numeric transaction metrics (e.g. Sales, Orders, GL Entries) with foreign keys and quantities/revenue.\n- **Dimension Tables (Points)**: Contain descriptive entity attributes (e.g. Customer Name, Product Category, Date Calendar, Store Location) with unique primary keys.\n\n### 3. DAX (Data Analysis Expressions) Basics\n- **Calculated Columns**: Row-by-row static columns (use sparingly to save RAM).\n  `Margin = FactSales[Revenue] - FactSales[Cost]`\n- **Explicit DAX Measures**: Dynamic formulas evaluated on the fly based on PivotTable filter context!\n  - **`DIVIDE()`**: Safe division with built-in zero protection:\n    `Margin% = DIVIDE([Total Profit], [Total Revenue], 0)`\n  - **`CALCULATE()`**: The \"God Function\" of DAX—evaluates an expression under a modified filter context:\n    `West Sales = CALCULATE([Total Sales], DimRegion[Region] = \"West\")`\n  - **Iterator `SUMX()`**: Evaluates an expression row-by-row over a table and sums the result:\n    `Total Revenue = SUMX(FactSales, FactSales[Quantity] * RELATED(DimProduct[Price]))`",
      "vi": "### 1. Kiến Trúc Mô Hình Dữ Liệu Power Pivot\n- **Lưu trữ dạng cột trong RAM**: Sử dụng bộ xử lý xVelocity nén các bảng hàng triệu dòng tới 90%, lưu trữ trực tiếp trong bộ nhớ RAM.\n- **Sơ đồ quan hệ Diagram View**: Kết nối các bảng bằng cách kéo thả từ khóa chính sang khóa ngoại (ví dụ: `DimCustomer[CustomerID]` -> `FactSales[CustomerID]`).\n- **Xóa bỏ hoàn toàn VLOOKUP**: Các mối quan hệ giúp tra cứu thuộc tính tức thì mà không cần chèn thêm cột phụ làm nặng bảng giao dịch!\n\n### 2. Nguyên Lý Thiết Kế Sơ Đồ Sao (Star Schema)\n- **Bảng Fact (Bảng Sự Kiện - Trung tâm)**: Chứa các giao dịch và chỉ số đo lường số học (Doanh số, Đơn hàng, Nhật ký kế toán) kèm các khóa ngoại.\n- **Bảng Dimension (Bảng Danh Mục - Các cánh sao)**: Chứa các thuộc tính mô tả thực thể (Tên khách hàng, Danh mục sản phẩm, Lịch ngày tháng, Địa điểm chi nhánh) với khóa chính duy nhất.\n\n### 3. Nền Tảng Ngôn Ngữ DAX (Data Analysis Expressions)\n- **Calculated Columns (Cột tính toán)**: Tính toán tĩnh theo từng dòng (hạn chế dùng để tiết kiệm RAM).\n- **Explicit DAX Measures (Thước đo DAX tường minh)**: Công thức động được tính toán tức thì theo bối cảnh bộ lọc (Filter Context) của PivotTable!\n  - **`DIVIDE()`**: Phép chia an toàn tự động tránh lỗi chia cho 0:\n    `Margin% = DIVIDE([Total Profit], [Total Revenue], 0)`\n  - **`CALCULATE()`**: Hàm quyền năng nhất của DAX—tính toán biểu thức dưới một bối cảnh bộ lọc đã được điều chỉnh:\n    `West Sales = CALCULATE([Total Sales], DimRegion[Region] = \"West\")`\n  - **Hàm lặp `SUMX()`**: Duyệt tính toán từng dòng trên một bảng rồi lấy tổng:\n    `Total Revenue = SUMX(FactSales, FactSales[Quantity] * RELATED(DimProduct[Price]))`"
    },
    "syntax": "# Basic DAX Measure:\nTotal Sales := SUM(FactSales[Revenue])\n\n# Safe Division:\nGross Margin % := DIVIDE([Total Sales] - [Total Cost], [Total Sales], 0)\n\n# CALCULATE with Filter Context Overwrite:\nOnline Sales := CALCULATE([Total Sales], DimChannel[ChannelName] = \"Online\")\n\n# Time Intelligence (Year-to-Date):\nYTD Sales := TOTALYTD([Total Sales], DimDate[Date])",
    "examples": [
      {
        "title": {
          "en": "Creating a Dynamic DAX Measure with CALCULATE",
          "vi": "Tạo Thước Đo DAX Động Bằng Hàm CALCULATE"
        },
        "code": "Measure Name: EuropeanSales\nFormula: =CALCULATE([TotalSales], DimGeography[Continent] = \"Europe\")\n\nOutcome: Evaluates total sales for the European territory regardless of external row filter context.",
        "description": {
          "en": "CALCULATE modifies the active filter context to enforce specific analytical boundaries.",
          "vi": "CALCULATE điều chỉnh bối cảnh bộ lọc đang hoạt động để áp dụng các ràng buộc phân tích cụ thể."
        }
      },
      {
        "title": {
          "en": "Cross-Table Row-Level Calculation with SUMX and RELATED",
          "vi": "Tính Toán Đa Bảng Từng Dòng Bằng SUMX và RELATED"
        },
        "code": "Measure Name: TotalGrossRevenue\nFormula: =SUMX(FactSales, FactSales[UnitsSold] * RELATED(DimProduct[UnitPrice]))",
        "description": {
          "en": "RELATED traverses the active 1-to-many relationship to fetch the product price for each sale row on the fly.",
          "vi": "RELATED đi theo mối quan hệ 1-nhiều đang hoạt động để lấy giá sản phẩm cho từng dòng bán hàng tức thì."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Creating dozens of Calculated Columns instead of DAX Measures, resulting in massive RAM consumption and sluggish model performance.",
          "vi": "Tạo hàng tá Cột tính toán Calculated Columns thay vì viết Thước đo DAX Measures, làm tốn dung lượng RAM và khiến mô hình chạy chậm."
        },
        "correction": {
          "en": "Use Calculated Columns ONLY when the field is needed as a Slicer or Row/Column header; use DAX Measures for all aggregations and metrics.",
          "vi": "CHỈ dùng Calculated Column khi cần đưa trường đó vào Slicer hoặc tiêu đề Hàng/Cột; hãy dùng DAX Measures cho tất cả các chỉ số tổng hợp."
        }
      }
    ],
    "tips": [
      {
        "en": "Always Create a Dedicated Date Table: Power Pivot time intelligence functions (TOTALYTD, SAMEPERIODLASTYEAR) require a continuous, gap-free Date Dimension table.",
        "vi": "Luôn tạo bảng ngày chuyên dụng: Các hàm thời gian trong DAX (TOTALYTD, SAMEPERIODLASTYEAR) bắt buộc phải có một bảng DimDate liên tục không bị đứt quãng."
      },
      {
        "en": "Safe Division with DIVIDE: Never use the forward slash (/) for division in DAX; always use =DIVIDE(Num, Denom, 0) to avoid #DIV/0! errors.",
        "vi": "Phép chia an toàn với DIVIDE: Không bao giờ dùng dấu gạch chéo (/) trong DAX; luôn dùng =DIVIDE(TuSo, MauSo, 0) để triệt tiêu lỗi #DIV/0!."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l22_ex1",
      "type": "complete_code",
      "title": {
        "en": "Write Safe Division DAX Measure",
        "vi": "Viết Thước Đo DAX Phép Chia An Toàn"
      },
      "instruction": {
        "en": "Write the DAX measure formula using DIVIDE to calculate Margin % by dividing [Total Profit] by [Total Revenue], with fallback 0.",
        "vi": "Viết công thức thước đo DAX sử dụng hàm DIVIDE để tính Margin % bằng cách chia [Total Profit] cho [Total Revenue], dự phòng là 0."
      },
      "starterCode": "=DIVIDE([Total Profit], ",
      "solutionCode": "=DIVIDE([Total Profit], [Total Revenue], 0)",
      "expectedOutput": "=DIVIDE([Total Profit], [Total Revenue], 0)",
      "hint": {
        "en": "=DIVIDE([Total Profit], [Total Revenue], 0)",
        "vi": "=DIVIDE([Total Profit], [Total Revenue], 0)"
      },
      "explanation": {
        "en": "DIVIDE safely handles zero denominators without erroring.",
        "vi": "DIVIDE xử lý an toàn mẫu số bằng 0 mà không phát sinh lỗi."
      }
    },
    {
      "id": "excel_l22_ex2",
      "type": "complete_code",
      "title": {
        "en": "Write Filtered DAX Measure with CALCULATE",
        "vi": "Viết Thước Đo DAX Có Bộ Lọc Bằng CALCULATE"
      },
      "instruction": {
        "en": "Write the DAX formula for measure \"HighValueSales\" that calculates [Total Sales] filtered for FactSales[Amount] > 10000.",
        "vi": "Viết công thức DAX cho thước đo \"HighValueSales\" tính [Total Sales] được lọc theo FactSales[Amount] > 10000."
      },
      "starterCode": "=CALCULATE([Total Sales], ",
      "solutionCode": "=CALCULATE([Total Sales], FactSales[Amount] > 10000)",
      "expectedOutput": "=CALCULATE([Total Sales], FactSales[Amount] > 10000)",
      "hint": {
        "en": "=CALCULATE([Total Sales], FactSales[Amount] > 10000)",
        "vi": "=CALCULATE([Total Sales], FactSales[Amount] > 10000)"
      },
      "explanation": {
        "en": "CALCULATE modifies the calculation context using specified boolean filters.",
        "vi": "CALCULATE điều chỉnh bối cảnh tính toán bằng các bộ lọc logic chỉ định."
      }
    }
  ],
  "challenge": {
    "id": "excel_l22_challenge",
    "title": {
      "en": "Construct Multi-Table Cross-Entity DAX Expression",
      "vi": "Xây Dựng Biểu Thức DAX Đa Bảng Liên Bảng"
    },
    "description": {
      "en": "Construct the DAX measure formula for [TotalRevenue] that iterates over table FactSales and calculates UnitsSold times the UnitPrice fetched from related table DimProduct using RELATED.",
      "vi": "Xây dựng công thức thước đo DAX cho [TotalRevenue] duyệt qua bảng FactSales và tính UnitsSold nhân với UnitPrice lấy từ bảng liên kết DimProduct bằng hàm RELATED."
    },
    "requirements": [
      {
        "en": "Use the SUMX iterator function",
        "vi": "Sử dụng hàm lặp SUMX"
      },
      {
        "en": "Iterate over table FactSales",
        "vi": "Lặp qua bảng FactSales"
      },
      {
        "en": "Use RELATED(DimProduct[UnitPrice])",
        "vi": "Dùng RELATED(DimProduct[UnitPrice])"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=SUMX(FactSales, FactSales[UnitsSold] * RELATED(DimProduct[UnitPrice]))",
    "hints": [
      {
        "en": "Syntax: =SUMX(FactSales, FactSales[UnitsSold] * RELATED(DimProduct[UnitPrice]))",
        "vi": "Cú pháp: =SUMX(FactSales, FactSales[UnitsSold] * RELATED(DimProduct[UnitPrice]))"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l22_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the primary function in DAX used to evaluate expressions under a modified filter context?",
        "vi": "Hàm chính trong DAX được sử dụng để đánh giá biểu thức dưới một bối cảnh bộ lọc đã được điều chỉnh là gì?"
      },
      "options": [
        {
          "en": "`CALCULATE()`",
          "vi": "`CALCULATE()`"
        },
        {
          "en": "`FILTER()`",
          "vi": "`FILTER()`"
        },
        {
          "en": "`SUM()`",
          "vi": "`SUM()`"
        },
        {
          "en": "`EVALUATE()`",
          "vi": "`EVALUATE()`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CALCULATE is the single most important function in DAX, enabling explicit filter context manipulation.",
        "vi": "CALCULATE là hàm quan trọng nhất trong DAX, cho phép can thiệp và biến đổi trực tiếp bối cảnh bộ lọc."
      },
      "difficulty": "easy",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q2",
      "type": "single_choice",
      "question": {
        "en": "What is the architectural difference between a Fact Table and a Dimension Table in a Star Schema?",
        "vi": "Sự khác biệt về mặt kiến trúc giữa Bảng Fact và Bảng Dimension trong Sơ đồ hình sao (Star Schema) là gì?"
      },
      "options": [
        {
          "en": "Fact tables contain quantitative numerical transaction metrics and foreign keys; Dimension tables contain qualitative entity attributes (customers, dates, stores) and primary keys",
          "vi": "Bảng Fact chứa các số liệu định lượng giao dịch và khóa ngoại; Bảng Dimension chứa các thuộc tính định tính của thực thể (khách hàng, ngày tháng, chi nhánh) và khóa chính"
        },
        {
          "en": "Fact tables are small; Dimension tables are massive",
          "vi": "Bảng Fact nhỏ; Bảng Dimension rất lớn"
        },
        {
          "en": "Fact tables only store dates",
          "vi": "Bảng Fact chỉ lưu ngày tháng"
        },
        {
          "en": "There is no difference",
          "vi": "Không có sự khác biệt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Fact tables hold transactional records (numbers/keys); dimension tables provide context and slicing axes (lookup entities).",
        "vi": "Bảng Fact lưu các bản ghi giao dịch (số liệu/khóa); bảng dimension cung cấp bối cảnh và các trục phân tích lọc dữ liệu."
      },
      "difficulty": "medium",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q3",
      "type": "single_choice",
      "question": {
        "en": "Why is `DIVIDE(Numerator, Denominator, 0)` preferred over standard `/` division in DAX?",
        "vi": "Tại sao `DIVIDE(TuSo, MauSo, 0)` lại được ưu tiên hơn phép chia `/` thông thường trong DAX?"
      },
      "options": [
        {
          "en": "It automatically intercepts division-by-zero errors and returns a designated fallback value without crashing the PivotTable",
          "vi": "Nó tự động bắt lỗi chia cho 0 và trả về giá trị dự phòng chỉ định mà không làm phát sinh lỗi trên PivotTable"
        },
        {
          "en": "DIVIDE multiplies by 100",
          "vi": "DIVIDE nhân với 100"
        },
        {
          "en": "Standard division is forbidden in DAX",
          "vi": "Phép chia thông thường bị cấm trong DAX"
        },
        {
          "en": "DIVIDE runs on the GPU",
          "vi": "DIVIDE chạy trên GPU"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "DIVIDE provides graceful zero-handling, preventing #DIV/0! errors from propagating across summary matrices.",
        "vi": "DIVIDE xử lý mẫu số bằng 0 một cách mượt mà, ngăn lỗi #DIV/0! lan rộng trên các ma trận báo cáo."
      },
      "difficulty": "easy",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q4",
      "type": "single_choice",
      "question": {
        "en": "What function allows an iterator like `SUMX` running on a Fact Table to fetch matching attribute values from a related Dimension Table?",
        "vi": "Hàm nào cho phép một hàm lặp như `SUMX` đang chạy trên Bảng Fact lấy các giá trị thuộc tính tương ứng từ Bảng Dimension có liên kết?"
      },
      "options": [
        {
          "en": "`RELATED()`",
          "vi": "`RELATED()`"
        },
        {
          "en": "`VLOOKUP()`",
          "vi": "`VLOOKUP()`"
        },
        {
          "en": "`FETCH()`",
          "vi": "`FETCH()`"
        },
        {
          "en": "`LOOKUPVALUE()`",
          "vi": "`LOOKUPVALUE()`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "RELATED follows active 1-to-many relationships from the \"many\" side table to extract values from the \"one\" side table.",
        "vi": "RELATED đi theo mối quan hệ 1-nhiều đang hoạt động từ bảng phía \"nhiều\" để trích xuất giá trị từ bảng phía \"một\"."
      },
      "difficulty": "medium",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q5",
      "type": "single_choice",
      "question": {
        "en": "What is the primary benefit of defining Explicit DAX Measures over Calculated Columns?",
        "vi": "Lợi ích chính của việc tạo Thước đo DAX tường minh (Explicit Measures) so với Cột tính toán (Calculated Columns) là gì?"
      },
      "options": [
        {
          "en": "Measures do not consume RAM storage; they are computed dynamically at query time based on active filter context",
          "vi": "Measures không tiêu tốn dung lượng bộ nhớ RAM; chúng được tính toán động tại thời điểm truy vấn theo bối cảnh bộ lọc"
        },
        {
          "en": "Measures can only calculate text",
          "vi": "Measures chỉ tính được chữ"
        },
        {
          "en": "Measures require no formulas",
          "vi": "Measures không cần công thức"
        },
        {
          "en": "Calculated columns are faster",
          "vi": "Calculated columns chạy nhanh hơn"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Calculated Columns are stored in RAM for every row; Measures calculate on the fly, keeping models lightweight and fast.",
        "vi": "Calculated Columns chiếm dung lượng RAM cho từng dòng; Measures tính toán tức thời theo yêu cầu, giúp mô hình nhẹ và nhanh."
      },
      "difficulty": "medium",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q6",
      "type": "true_false",
      "question": {
        "en": "True or False: Power Pivot data models are limited to the 1,048,576 row maximum of standard Excel worksheets.",
        "vi": "Đúng hay Sai: Mô hình dữ liệu Power Pivot bị giới hạn ở mức tối đa 1.048.576 dòng như các trang tính Excel thông thường."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False (Power Pivot can hold hundreds of millions of compressed rows in memory)",
          "vi": "Sai (Power Pivot có thể chứa hàng trăm triệu dòng nén trong bộ nhớ RAM)"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "False. Power Pivot bypasses the worksheet grid row limitation, easily handling datasets exceeding 50 to 100+ million rows.",
        "vi": "Sai. Power Pivot vượt qua giới hạn dòng của bảng tính, xử lý nhẹ nhàng các tập dữ liệu từ 50 đến hơn 100 triệu dòng."
      },
      "difficulty": "easy",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q7",
      "type": "single_choice",
      "question": {
        "en": "What is \"Filter Context\" in DAX and Power Pivot?",
        "vi": "\"Filter Context\" (Bối cảnh bộ lọc) trong DAX và Power Pivot là gì?"
      },
      "options": [
        {
          "en": "The set of active filters applied to the data model from PivotTable row/column headers, page filters, and connected Slicers that determine which rows are evaluated",
          "vi": "Tập hợp các bộ lọc đang tác động lên mô hình từ tiêu đề hàng/cột của PivotTable, bộ lọc trang và các Slicer liên kết quyết định dòng dữ liệu nào được tính toán"
        },
        {
          "en": "The color scheme of the worksheet",
          "vi": "Bảng màu của trang tính"
        },
        {
          "en": "The SQL database password",
          "vi": "Mật khẩu cơ sở dữ liệu SQL"
        },
        {
          "en": "The font size of the table",
          "vi": "Cỡ chữ của bảng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Filter Context defines the dynamic subset of data visible to an aggregation calculation in any given Pivot cell coordinate.",
        "vi": "Filter Context xác định tập con dữ liệu thực tế được đưa vào phép tính tổng hợp tại bất kỳ tọa độ ô Pivot nào."
      },
      "difficulty": "hard",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q8",
      "type": "single_choice",
      "question": {
        "en": "What DAX function computes year-to-date running totals over a continuous calendar date column?",
        "vi": "Hàm DAX nào tính tổng lũy kế từ đầu năm đến hiện tại (Year-to-Date) trên một cột ngày tháng lịch liên tục?"
      },
      "options": [
        {
          "en": "`TOTALYTD([TotalSales], DimDate[Date])`",
          "vi": "`TOTALYTD([TotalSales], DimDate[Date])`"
        },
        {
          "en": "`YTD_SUM()`",
          "vi": "`YTD_SUM()`"
        },
        {
          "en": "`YEAR_RUNNING()`",
          "vi": "`YEAR_RUNNING()`"
        },
        {
          "en": "`CUMULATIVE_YEAR()`",
          "vi": "`CUMULATIVE_YEAR()`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "TOTALYTD is a native DAX Time Intelligence function that aggregates metrics from the start of the year through the current evaluation date.",
        "vi": "TOTALYTD là hàm Time Intelligence tích hợp sẵn của DAX tổng hợp số liệu từ đầu năm đến ngày đang được tính toán."
      },
      "difficulty": "medium",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q9",
      "type": "single_choice",
      "question": {
        "en": "Which symbol in DAX syntax explicitly denotes an instantiated Measure rather than a column reference?",
        "vi": "Ký hiệu nào trong cú pháp DAX biểu thị rõ ràng một Thước đo (Measure) thay vì một tham chiếu cột?"
      },
      "options": [
        {
          "en": "Square brackets without a table prefix (e.g. `[Total Revenue]`)",
          "vi": "Dấu ngoặc vuông không có tiền tố tên bảng (ví dụ `[Total Revenue]`)"
        },
        {
          "en": "Curly brackets `{}`",
          "vi": "Dấu ngoặc nhọn `{}`"
        },
        {
          "en": "A hashtag `#`",
          "vi": "Dấu thăng `#`"
        },
        {
          "en": "An exclamation point `!`",
          "vi": "Dấu chấm than `!`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Best practice DAX syntax requires column references to include table names (`FactSales[Qty]`) and measures to omit table names (`[Total Revenue]`).",
        "vi": "Quy chuẩn cú pháp DAX yêu cầu tham chiếu cột phải kèm tên bảng (`FactSales[Qty]`) và thước đo thì không kèm tên bảng (`[Total Revenue]`)."
      },
      "difficulty": "hard",
      "topicId": "excel_power_pivot"
    },
    {
      "id": "excel_l22_q10",
      "type": "single_choice",
      "question": {
        "en": "How do relationships in Power Pivot eliminate the need for millions of VLOOKUP helper formulas?",
        "vi": "Mối quan hệ trong Power Pivot giúp loại bỏ nhu cầu sử dụng hàng triệu công thức phụ VLOOKUP như thế nào?"
      },
      "options": [
        {
          "en": "Relationships allow PivotTables to aggregate fact records by dimension attributes on the fly across in-memory relationship pointers",
          "vi": "Mối quan hệ cho phép PivotTable tổng hợp các bản ghi fact theo thuộc tính dimension tức thì thông qua con trỏ quan hệ trong RAM"
        },
        {
          "en": "They automatically convert Excel to Google Sheets",
          "vi": "Chúng tự động chuyển Excel sang Google Sheets"
        },
        {
          "en": "They delete unused columns",
          "vi": "Chúng xóa các cột không dùng"
        },
        {
          "en": "They hide the formulas",
          "vi": "Chúng ẩn các công thức đi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Relational pointers bridge Fact and Dimension tables in memory, enabling multi-table queries without data duplication.",
        "vi": "Con trỏ quan hệ liên kết các bảng Fact và Dimension trong bộ nhớ, cho phép truy vấn đa bảng mà không cần nhân bản dữ liệu."
      },
      "difficulty": "medium",
      "topicId": "excel_power_pivot"
    }
  ]
};
export default lesson22;
