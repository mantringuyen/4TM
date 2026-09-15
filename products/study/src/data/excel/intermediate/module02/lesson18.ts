import { Lesson } from '../../../../types';

export const lesson18: Lesson = {
  "id": "excel_lesson_18",
  "order": 18,
  "moduleId": "excel_mod_4",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_pivot_charts",
  "title": {
    "en": "Calculated Fields, Calculated Items & Interactive Executive Pivot Charts",
    "vi": "Trường Tính Toán Calculated Fields, Calculated Items & Biểu Đồ Pivot Chart"
  },
  "summary": {
    "en": "Take Pivot analytical reporting to the executive level: create custom mathematical calculations inside the Pivot engine using Calculated Fields, resolve order-of-operation aggregation nuances, build synchronized Pivot Charts, and construct polished KPI interactive dashboards.",
    "vi": "Nâng tầm báo cáo phân tích Pivot lên cấp độ quản trị: tạo các phép tính toán tùy chỉnh bên trong công cụ Pivot bằng Calculated Fields, xử lý thứ tự ưu tiên tính toán, xây dựng biểu đồ Pivot Chart đồng bộ và thiết kế bảng điều khiển KPI tương tác chuyên nghiệp."
  },
  "learn": {
    "introduction": {
      "en": "Standard PivotTables can only summarize fields that already exist in the source table. Calculated Fields empower you to write custom formulas (e.g. Profit Margin = Profit / Revenue or Commission = Revenue * 0.05) directly inside the Pivot engine without bloating source worksheets with redundant calculated columns.",
      "vi": "PivotTable tiêu chuẩn chỉ có thể tổng hợp các trường đã có sẵn trong bảng nguồn. Tính năng Calculated Fields cho phép bạn viết các công thức toán học tùy chỉnh (ví dụ: Biên lợi nhuận = Lợi nhuận / Doanh thu hoặc Hoa hồng = Doanh thu * 0.05) trực tiếp bên trong bộ xử lý Pivot mà không làm phình to bảng dữ liệu gốc bằng các cột tính toán dư thừa."
    },
    "conceptExplanation": {
      "en": "### 1. Calculated Fields Mechanics\n- **Location**: Select PivotTable -> *PivotTable Analyze* tab -> *Fields, Items & Sets* -> **Calculated Field**.\n- **Formula Syntax**: `= Revenue * 0.10` or `= (Sales - Cost) / Sales`.\n- **Crucial Aggregation Rule**: Calculated Fields *always* evaluate the **SUM** of components first before performing mathematical operations.\n  - `Margin = Profit / Revenue` becomes `SUM(Profit) / SUM(Revenue)` (mathematically correct weighted margin!).\n\n### 2. Calculated Items vs Calculated Fields\n- **Calculated Field**: Creates a brand new **column metric** calculated from other fields (e.g. Bonus Amount).\n- **Calculated Item**: Creates a new **row/category member** inside an existing field (e.g. `\"East Coast\" = \"New York\" + \"Boston\"`).\n\n### 3. Synchronized Pivot Charts\n- Built directly on top of PivotTables.\n- Automatically reflect PivotTable filtering, grouping, and Slicer clicks.\n- Filter buttons directly on the chart canvas allow instant visual slicing without touching worksheet grids.\n\n### 4. Executive Dashboard Best Practices\n1. Hide redundant field buttons on Pivot Charts for a clean aesthetic.\n2. Group KPI summary cards with linked Slicers.\n3. Use consistent color palettes across all dashboard charts.",
      "vi": "### 1. Cơ Chế Hoạt Động Của Calculated Fields\n- **Vị trí**: Chọn PivotTable -> Thẻ *PivotTable Analyze* -> *Fields, Items & Sets* -> **Calculated Field**.\n- **Cú pháp công thức**: `= Revenue * 0.10` hoặc `= (Sales - Cost) / Sales`.\n- **Quy tắc tổng hợp cốt lõi**: Calculated Field *luôn luôn* tính **TỔNG (SUM)** của các thành phần trước rồi mới thực hiện phép toán số học.\n  - `Margin = Profit / Revenue` sẽ được tính là `SUM(Profit) / SUM(Revenue)` (biên lợi nhuận bình quân gia quyền chuẩn xác về mặt toán học!).\n\n### 2. So Sánh Calculated Items và Calculated Fields\n- **Calculated Field**: Tạo ra một **chỉ số cột số liệu** mới toanh từ các trường khác (ví dụ: Số tiền thưởng).\n- **Calculated Item**: Tạo ra một **phần tử danh mục dòng** mới bên trong một trường có sẵn (ví dụ: `\"Miền Đông\" = \"Hà Nội\" + \"Hải Phòng\"`).\n\n### 3. Biểu Đồ Pivot Chart Đồng Bộ Tương Tác\n- Được xây dựng trực tiếp trên nền tảng của PivotTable.\n- Tự động phản ánh các thao tác lọc, gom nhóm và nhấp chuột Slicer từ PivotTable.\n- Nút lọc trực tiếp trên mặt biểu đồ cho phép lọc dữ liệu tức thì mà không cần chạm vào trang tính.\n\n### 4. Quy Chuẩn Thiết Kế Bảng Điều Khiển Quản Trị\n1. Ẩn các nút trường thừa trên Pivot Chart để tạo giao diện tinh gọn, thoáng đãng.\n2. Gom nhóm các thẻ KPI tổng quan với Slicer liên kết.\n3. Đồng bộ bảng màu thương hiệu trên tất cả biểu đồ."
    },
    "syntax": "# Calculated Field Formulas:\n= Revenue - COGS                     (Gross Profit)\n= (Revenue - COGS) / Revenue         (Gross Margin %)\n= IF(Revenue > 100000, Revenue * 0.05, Revenue * 0.02) (Tiered Bonus)",
    "examples": [
      {
        "title": {
          "en": "Creating a Dynamic Weighted Profit Margin Calculated Field",
          "vi": "Tạo Trường Tính Toán Biên Lợi Nhuận Bình Quân Gia Quyền"
        },
        "code": "In Calculated Field Dialog:\nName: MarginPercent\nFormula: = (Revenue - Expenses) / Revenue\n\nFormat Field as: Percentage with 1 decimal place (e.g. 24.5%)",
        "description": {
          "en": "Accurately computes weighted profit margin at every hierarchical subtotal and grand total level.",
          "vi": "Tính toán chính xác biên lợi nhuận bình quân gia quyền ở mọi cấp tổng phụ và tổng cộng toàn bộ."
        }
      },
      {
        "title": {
          "en": "Building an Interactive Dynamic Sales Dashboard",
          "vi": "Xây Dựng Bảng Điều Khiển Doanh Số Tương Tác Động"
        },
        "code": "Components:\n1. PivotTable: Sales by Product Line with Calculated Field \"NetMargin\"\n2. Linked Pivot Chart: Clustered Column + Line combo chart\n3. Slicers: Region & Sales Channel\n4. Action: Connected Slicer to both chart and table via Report Connections",
        "description": {
          "en": "Delivers a responsive executive dashboard where selecting \"Online Channel\" updates metrics and graphs synchronously.",
          "vi": "Mang đến bảng điều khiển quản trị linh hoạt: nhấp chọn \"Kênh Online\" sẽ đồng bộ cập nhật cả số liệu và biểu đồ."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Attempting to use functions like COUNTIF, SUMIFS, or VLOOKUP inside a Calculated Field formula.",
          "vi": "Cố gắng sử dụng các hàm như COUNTIF, SUMIFS hoặc VLOOKUP bên trong công thức của Calculated Field."
        },
        "correction": {
          "en": "Calculated Fields only support basic arithmetic operators (+, -, *, /) and simple functions like IF(), AND(), OR(), NOT().",
          "vi": "Calculated Fields chỉ hỗ trợ các toán tử số học cơ bản (+, -, *, /) và các hàm đơn giản như IF(), AND(), OR(), NOT()."
        }
      }
    ],
    "tips": [
      {
        "en": "Hide Pivot Chart Buttons: Select the Pivot Chart -> PivotChart Analyze tab -> click \"Field Buttons\" dropdown -> \"Hide All\" for a polished look.",
        "vi": "Ẩn nút trường trên biểu đồ: Chọn Pivot Chart -> Thẻ PivotChart Analyze -> bấm nút \"Field Buttons\" -> \"Hide All\" để biểu đồ chuyên nghiệp."
      },
      {
        "en": "List Formulas Utility: Go to Fields, Items & Sets -> \"List Formulas\" to generate an audit sheet documenting every Calculated Field formula in the workbook!",
        "vi": "Xuất danh sách công thức: Chọn Fields, Items & Sets -> \"List Formulas\" để tự động tạo một trang tài liệu ghi lại mọi công thức Calculated Field!"
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l18_ex1",
      "type": "complete_code",
      "title": {
        "en": "Write Commission Calculated Field Formula",
        "vi": "Viết Công Thức Calculated Field Tính Tiền Hoa Hồng"
      },
      "instruction": {
        "en": "Write the formula for a Calculated Field named \"Commission\" that pays 8% (0.08) on Revenue.",
        "vi": "Viết công thức cho trường tính toán Calculated Field có tên \"Commission\" trả 8% (0.08) trên Doanh thu Revenue."
      },
      "starterCode": "= Revenue * ",
      "solutionCode": "= Revenue * 0.08",
      "expectedOutput": "= Revenue * 0.08",
      "hint": {
        "en": "= Revenue * 0.08",
        "vi": "= Revenue * 0.08"
      },
      "explanation": {
        "en": "Calculated Fields perform arithmetic on underlying field sums.",
        "vi": "Calculated Fields thực hiện phép toán trên tổng của trường dữ liệu."
      }
    },
    {
      "id": "excel_l18_ex2",
      "type": "complete_code",
      "title": {
        "en": "Write Conditional Bonus Calculated Field",
        "vi": "Viết Công Thức Thưởng Có Điều Kiện Bằng Calculated Field"
      },
      "instruction": {
        "en": "Write a Calculated Field formula with IF: If Revenue > 50000, award Revenue * 0.05, otherwise 0.",
        "vi": "Viết công thức Calculated Field với hàm IF: Nếu Revenue > 50000, thưởng Revenue * 0.05, ngược lại là 0."
      },
      "starterCode": "=IF(Revenue > 50000, ",
      "solutionCode": "=IF(Revenue > 50000, Revenue * 0.05, 0)",
      "expectedOutput": "=IF(Revenue > 50000, Revenue * 0.05, 0)",
      "hint": {
        "en": "Pass Revenue * 0.05 for true, 0 for false.",
        "vi": "Truyền Revenue * 0.05 khi đúng, 0 khi sai."
      },
      "explanation": {
        "en": "IF statements are supported inside Pivot Calculated Fields.",
        "vi": "Câu lệnh IF được hỗ trợ bên trong Pivot Calculated Fields."
      }
    }
  ],
  "challenge": {
    "id": "excel_l18_challenge",
    "title": {
      "en": "Construct Weighted Gross Margin Ratio Calculated Field",
      "vi": "Xây Dựng Calculated Field Tỷ Lệ Biên Lợi Nhuận Gộp"
    },
    "description": {
      "en": "Construct the exact formula expression for a PivotTable Calculated Field named \"GrossMargin\" that computes profit percentage by taking Revenue minus Cost, divided by Revenue.",
      "vi": "Xây dựng biểu thức công thức chính xác cho trường Calculated Field có tên \"GrossMargin\" tính tỷ lệ phần trăm lợi nhuận bằng Doanh thu Revenue trừ Chi phí Cost, chia cho Doanh thu Revenue."
    },
    "requirements": [
      {
        "en": "Subtract Cost from Revenue in parentheses",
        "vi": "Lấy Revenue trừ Cost đặt trong dấu ngoặc đơn"
      },
      {
        "en": "Divide the result by Revenue",
        "vi": "Chia kết quả cho Revenue"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=(Revenue - Cost) / Revenue",
    "hints": [
      {
        "en": "=(Revenue - Cost) / Revenue",
        "vi": "=(Revenue - Cost) / Revenue"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l18_q1",
      "type": "single_choice",
      "question": {
        "en": "How do PivotTable Calculated Fields evaluate mathematical formulas across summarized groups?",
        "vi": "Tính năng PivotTable Calculated Fields đánh giá các công thức toán học qua các nhóm tổng hợp như thế nào?"
      },
      "options": [
        {
          "en": "It performs the operation on the SUM of each individual field (e.g. SUM(Profit) / SUM(Revenue))",
          "vi": "Nó thực hiện phép toán trên TỔNG (SUM) của từng trường riêng biệt (ví dụ SUM(Lợi nhuận) / SUM(Doanh thu))"
        },
        {
          "en": "It calculates row-by-row on the source table and averages them",
          "vi": "Nó tính từng dòng trên bảng nguồn rồi lấy trung bình cộng"
        },
        {
          "en": "It uses random sampling",
          "vi": "Nó lấy mẫu ngẫu nhiên"
        },
        {
          "en": "It evaluates text only",
          "vi": "Nó chỉ đánh giá văn bản"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Calculated Fields always sum the components first, guaranteeing mathematically weighted ratio calculations.",
        "vi": "Calculated Fields luôn tính tổng các thành phần trước, đảm bảo các tỷ lệ tính toán có trọng số chính xác."
      },
      "difficulty": "medium",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q2",
      "type": "single_choice",
      "question": {
        "en": "Which of the following functions is VALID inside a Calculated Field formula?",
        "vi": "Hàm nào sau đây là HỢP LỆ bên trong công thức của một Calculated Field?"
      },
      "options": [
        {
          "en": "`IF()`",
          "vi": "`IF()`"
        },
        {
          "en": "`VLOOKUP()`",
          "vi": "`VLOOKUP()`"
        },
        {
          "en": "`COUNTIF()`",
          "vi": "`COUNTIF()`"
        },
        {
          "en": "`SUMIFS()`",
          "vi": "`SUMIFS()`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Calculated Fields only support basic logic (IF, AND, OR, NOT) and basic math operations; lookup and conditional aggregation functions cannot be used.",
        "vi": "Calculated Fields chỉ hỗ trợ logic cơ bản (IF, AND, OR, NOT) và các phép toán số học; các hàm tra cứu và tổng hợp có điều kiện không được hỗ trợ."
      },
      "difficulty": "medium",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q3",
      "type": "single_choice",
      "question": {
        "en": "What is the key difference between a \"Calculated Field\" and a \"Calculated Item\"?",
        "vi": "Sự khác biệt cốt lõi giữa \"Calculated Field\" và \"Calculated Item\" là gì?"
      },
      "options": [
        {
          "en": "A Calculated Field creates a new metric column; a Calculated Item creates a new custom category row member inside an existing field",
          "vi": "Calculated Field tạo ra một cột chỉ số mới; Calculated Item tạo ra một hàng danh mục tùy chỉnh mới bên trong một trường có sẵn"
        },
        {
          "en": "Calculated Fields are for dates only",
          "vi": "Calculated Fields chỉ dùng cho ngày tháng"
        },
        {
          "en": "Calculated Items run 100x slower",
          "vi": "Calculated Items chạy chậm hơn 100 lần"
        },
        {
          "en": "They are identical",
          "vi": "Chúng hoàn toàn giống nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Calculated Fields create new value metrics (columns), whereas Calculated Items create calculated categorical members within a specific row dimension.",
        "vi": "Calculated Field tạo thêm các trường chỉ số giá trị (cột), trong khi Calculated Item tạo thêm các mục danh mục tính toán bên trong một trường hàng cụ thể."
      },
      "difficulty": "hard",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q4",
      "type": "single_choice",
      "question": {
        "en": "How do you create a clear, uncluttered look for Pivot Charts intended for executive presentations?",
        "vi": "Làm thế nào để tạo giao diện trực quan tinh gọn, chuyên nghiệp cho Pivot Chart khi báo cáo cấp quản trị?"
      },
      "options": [
        {
          "en": "PivotChart Analyze -> Field Buttons -> Hide All",
          "vi": "PivotChart Analyze -> Field Buttons -> Hide All"
        },
        {
          "en": "Delete the chart title",
          "vi": "Xóa tiêu đề biểu đồ"
        },
        {
          "en": "Make all bars gray",
          "vi": "Chuyển tất cả cột sang màu xám"
        },
        {
          "en": "Remove the gridlines only",
          "vi": "Chỉ xóa các đường lưới"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Hiding field buttons removes the grey dropdown tags from the chart surface, giving it a clean, professional aesthetic.",
        "vi": "Ẩn các nút trường sẽ gỡ bỏ các thẻ xám thả xuống trên mặt biểu đồ, mang lại giao diện tinh gọn và chuyên nghiệp."
      },
      "difficulty": "easy",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q5",
      "type": "single_choice",
      "question": {
        "en": "Which utility generates a dedicated audit worksheet documenting all Calculated Fields and formulas defined in the workbook?",
        "vi": "Công cụ nào tự động tạo một trang tính kiểm toán liệt kê tất cả các Calculated Fields và công thức đã thiết lập trong file?"
      },
      "options": [
        {
          "en": "PivotTable Analyze -> Fields, Items & Sets -> List Formulas",
          "vi": "PivotTable Analyze -> Fields, Items & Sets -> List Formulas"
        },
        {
          "en": "Formulas -> Show Formulas",
          "vi": "Formulas -> Show Formulas"
        },
        {
          "en": "File -> Export Formulas",
          "vi": "File -> Export Formulas"
        },
        {
          "en": "View -> Macro Audit",
          "vi": "View -> Macro Audit"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "List Formulas instantly generates a new tab containing an indexed catalog of all Calculated Field formulas for auditing.",
        "vi": "List Formulas ngay lập tức tạo một tab mới chứa danh mục các công thức Calculated Field phục vụ kiểm tra đối chiếu."
      },
      "difficulty": "hard",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q6",
      "type": "true_false",
      "question": {
        "en": "True or False: Filtering a PivotTable with a Slicer automatically updates any Pivot Chart linked to that PivotTable.",
        "vi": "Đúng hay Sai: Khi lọc PivotTable bằng một nút Slicer, mọi biểu đồ Pivot Chart được liên kết với PivotTable đó sẽ tự động cập nhật theo."
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
        "en": "True. Pivot Charts are dynamically bound to their source PivotTable, reflecting all filtering and slicing in real time.",
        "vi": "Đúng. Pivot Chart được liên kết động trực tiếp với PivotTable nguồn, phản ánh mọi thao tác lọc tức thì theo thời gian thực."
      },
      "difficulty": "easy",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q7",
      "type": "single_choice",
      "question": {
        "en": "What chart type is best suited for displaying total revenue on columns and profit margin percentage as a line on a secondary axis?",
        "vi": "Loại biểu đồ nào phù hợp nhất để hiển thị tổng doanh thu dạng cột và tỷ lệ biên lợi nhuận dạng đường trên trục phụ thứ hai?"
      },
      "options": [
        {
          "en": "Combo Chart (Clustered Column + Line on Secondary Axis)",
          "vi": "Combo Chart (Cột nhóm Clustered Column + Đường Line trên trục phụ Secondary Axis)"
        },
        {
          "en": "Pie Chart",
          "vi": "Biểu đồ tròn Pie Chart"
        },
        {
          "en": "Treemap",
          "vi": "Biểu đồ phân nhánh Treemap"
        },
        {
          "en": "Radar Chart",
          "vi": "Biểu đồ Radar"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Combo charts accommodate disparate numeric scales (e.g. millions of dollars vs 15% margin) using dual axes.",
        "vi": "Biểu đồ kết hợp Combo Chart xử lý hoàn hảo hai thang đo khác biệt (hàng triệu đô la vs 15% biên lợi nhuận) bằng hai trục tọa độ."
      },
      "difficulty": "medium",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q8",
      "type": "single_choice",
      "question": {
        "en": "Can you use cell references (such as `$A$1`) inside a PivotTable Calculated Field formula?",
        "vi": "Bạn có thể sử dụng các tham chiếu ô (như `$A$1`) bên trong công thức Calculated Field của PivotTable không?"
      },
      "options": [
        {
          "en": "No, Calculated Fields can ONLY reference field names from the dataset",
          "vi": "Không, Calculated Fields CHỈ có thể tham chiếu tên các trường từ tập dữ liệu"
        },
        {
          "en": "Yes, any cell coordinate can be referenced",
          "vi": "Có, bất kỳ tọa độ ô nào cũng tham chiếu được"
        },
        {
          "en": "Only if cell A1 is locked",
          "vi": "Chỉ khi ô A1 được khóa"
        },
        {
          "en": "Only in Microsoft 365",
          "vi": "Chỉ trong Microsoft 365"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Calculated Fields operate on the dataset schema level, so individual worksheet cell coordinates cannot be referenced.",
        "vi": "Calculated Fields hoạt động ở cấp độ cấu trúc tập dữ liệu nên không thể tham chiếu đến từng tọa độ ô trang tính đơn lẻ."
      },
      "difficulty": "medium",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q9",
      "type": "single_choice",
      "question": {
        "en": "What happens to a Calculated Field if you rename a column header in the underlying source table?",
        "vi": "Điều gì xảy ra với một Calculated Field nếu bạn đổi tên tiêu đề cột trong bảng dữ liệu nguồn bên dưới?"
      },
      "options": [
        {
          "en": "The Calculated Field formula must be updated to reflect the new field name",
          "vi": "Công thức Calculated Field phải được cập nhật lại để phản ánh tên trường mới"
        },
        {
          "en": "Excel deletes the workbook",
          "vi": "Excel xóa bảng tính"
        },
        {
          "en": "It automatically renames itself in VBA",
          "vi": "Nó tự động đổi tên trong VBA"
        },
        {
          "en": "Nothing, names are ignored",
          "vi": "Không có gì, tên bị bỏ qua"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Renaming source headers can break Calculated Fields referencing the old header name until reconfigured.",
        "vi": "Đổi tên tiêu đề nguồn có thể làm mất kết nối công thức Calculated Field đang tham chiếu tên cũ cho đến khi cấu hình lại."
      },
      "difficulty": "medium",
      "topicId": "excel_pivot_charts"
    },
    {
      "id": "excel_l18_q10",
      "type": "single_choice",
      "question": {
        "en": "What feature allows you to filter multiple fields at once in a Pivot Chart using dynamic visual buttons?",
        "vi": "Tính năng nào cho phép bạn lọc nhiều trường cùng lúc trong Pivot Chart bằng các nút bấm trực quan động?"
      },
      "options": [
        {
          "en": "Slicers",
          "vi": "Slicers"
        },
        {
          "en": "Data Bars",
          "vi": "Data Bars"
        },
        {
          "en": "Sparklines",
          "vi": "Sparklines"
        },
        {
          "en": "Goal Seek",
          "vi": "Goal Seek"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Slicers provide tactile, graphic interactive buttons that filter charts and tables synchronously.",
        "vi": "Slicers cung cấp các nút bấm đồ họa tương tác giúp lọc đồng bộ cả biểu đồ và bảng dữ liệu."
      },
      "difficulty": "easy",
      "topicId": "excel_pivot_charts"
    }
  ]
};
export default lesson18;
