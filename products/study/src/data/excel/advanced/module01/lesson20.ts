import { Lesson } from '../../../../types';

export const lesson20: Lesson = {
  "id": "excel_lesson_20",
  "order": 20,
  "moduleId": "excel_mod_5",
  "courseId": "excel",
  "levelId": "advanced",
  "topicId": "excel_what_if",
  "title": {
    "en": "What-If Analysis, Scenario Planning, Sensitivity Tables & The Solver Engine",
    "vi": "Phân Tích What-If, Lập Kế Hoạch Kịch Bản, Bảng Độ Nhạy & Công Cụ Tối Ưu Hóa Solver"
  },
  "summary": {
    "en": "Make confident strategic decisions under uncertainty: reverse-engineering targets with Goal Seek, multi-variable sensitivity modeling with One-Way and Two-Way Data Tables, Scenario Manager comparison summaries, and multi-constraint optimization using Solver (Simplex LP & GRG Nonlinear).",
    "vi": "Đưa ra các quyết định chiến lược tự tin trước sự không chắc chắn: tính toán ngược mục tiêu với Goal Seek, mô hình hóa độ nhạy đa biến với Bảng dữ liệu 1 chiều & 2 chiều Data Tables, so sánh các kịch bản với Scenario Manager và tối ưu hóa đa ràng buộc bằng công cụ Solver."
  },
  "learn": {
    "introduction": {
      "en": "Financial models are never static forecasts—they are dynamic decision engines. Executives need to know: \"What price must we charge to break even?\", \"How sensitive is net profit if interest rates rise 2% while demand falls 10%?\", and \"What product manufacturing mix maximizes factory profit subject to labor and material constraints?\" What-If Analysis and Solver answer these critical questions.",
      "vi": "Mô hình tài chính không phải là những dự báo tĩnh—chúng là các công cụ hỗ trợ ra quyết định động. Ban lãnh đạo luôn cần biết: \"Cần định giá bao nhiêu để hòa vốn?\", \"Lợi nhuận ròng sẽ biến động thế nào nếu lãi suất tăng 2% trong khi sức mua giảm 10%?\", và \"Cơ cấu sản xuất nào tối đa hóa lợi nhuận nhà máy dưới các ràng buộc về nhân công và nguyên vật liệu?\" What-If Analysis và Solver chính là câu trả lời cho các bài toán chiến lược này."
    },
    "conceptExplanation": {
      "en": "### 1. Goal Seek (Single-Variable Reverse Engineering)\n- **Concept**: If you know the desired output of a formula, Goal Seek determines the exact single input value needed to achieve that target.\n- **Dialog Inputs**:\n  - *Set cell*: The formula cell (e.g. Net Profit $0).\n  - *To value*: The target number (e.g. 0 for break-even).\n  - *By changing cell*: The single input parameter to adjust (e.g. Unit Price).\n\n### 2. Sensitivity Data Tables (What-If Analysis)\nEvaluates how varying 1 or 2 key assumptions impacts the bottom line across an entire matrix:\n- **One-Variable Data Table**: Tests multiple values of a single input (e.g. varying interest rate from 4% to 10% on monthly loan payments).\n- **Two-Variable Data Table**: Tests combinations of two inputs simultaneously (e.g. Unit Sales on the top row vs Unit Price on the left column).\n  - *Formula Reference*: Place output formula at the top-left corner of the matrix.\n\n### 3. The Solver Optimization Engine (Add-in)\nHandles complex multi-variable linear and non-linear optimization problems:\n- **Objective Cell**: Target to **Maximize**, **Minimize**, or set to a **Specific Value** (e.g. Maximize Total Profit).\n- **Variable Cells**: Changing input cells (e.g. Production quantities of 5 different product lines).\n- **Constraints**: Operational boundary conditions (e.g. `LaborHoursUsed <= 1000`, `UnitsProduced >= 0`, `UnitsProduced = integer`).\n- **Solving Methods**:\n  - **Simplex LP**: For linear programming models (super fast and guaranteed global optimum).\n  - **GRG Nonlinear**: For smooth non-linear models (e.g. diminishing returns curves).\n  - **Evolutionary**: For complex, discontinuous, or genetic algorithm problems.",
      "vi": "### 1. Goal Seek (Tính Toán Ngược Đơn Biến)\n- **Khái niệm**: Khi bạn đã biết kết quả đầu ra mong muốn của một công thức, Goal Seek sẽ tìm ra chính xác giá trị đầu vào cần thiết để đạt được mục tiêu đó.\n- **Các thông số thiết lập**:\n  - *Set cell*: Ô chứa công thức mục tiêu (ví dụ Lợi nhuận ròng = 0$).\n  - *To value*: Giá trị đích cần đạt (ví dụ 0 để tìm điểm hòa vốn).\n  - *By changing cell*: Ô đầu vào duy nhất cần điều chỉnh (ví dụ Đơn giá bán).\n\n### 2. Bảng Phân Tích Độ Nhạy Data Tables\nĐánh giá sự biến động của kết quả khi thay đổi 1 hoặc 2 giả định chính trên một ma trận:\n- **Bảng dữ liệu 1 biến (One-Variable Data Table)**: Thử nghiệm nhiều giá trị của 1 biến đầu vào (ví dụ thay đổi lãi suất từ 4% đến 10% xem tiền trả nợ hàng tháng).\n- **Bảng dữ liệu 2 biến (Two-Variable Data Table)**: Thử nghiệm đồng thời các kịch bản kết hợp của 2 biến đầu vào (ví dụ Số lượng bán ở hàng trên cùng vs Đơn giá ở cột bên trái).\n  - *Tham chiếu công thức*: Đặt công thức kết quả tại góc trên cùng bên trái của ma trận.\n\n### 3. Bộ Công Cụ Tối Ưu Hóa Solver\nGiải quyết các bài toán tối ưu hóa đa biến phức tạp với nhiều điều kiện ràng buộc:\n- **Objective Cell (Ô mục tiêu)**: Giá trị cần **Tối đa hóa (Max)**, **Tối thiểu hóa (Min)** hoặc đạt **Giá trị cụ thể** (ví dụ Tối đa hóa Tổng lợi nhuận).\n- **Variable Cells (Các ô biến số)**: Các ô đầu vào có thể thay đổi (ví dụ Số lượng sản xuất của 5 dòng sản phẩm).\n- **Constraints (Các ràng buộc)**: Các điều kiện giới hạn thực tế (ví dụ: `GioCong <= 1000`, `SoLuong >= 0`, `SoLuong = so_nguyen`).\n- **Phương pháp giải (Solving Methods)**:\n  - **Simplex LP**: Dành cho mô hình quy hoạch tuyến tính (cực nhanh và đảm bảo tìm thấy nghiệm tối ưu toàn cục).\n  - **GRG Nonlinear**: Dành cho mô hình phi tuyến tính mượt mà (ví dụ đường cong hiệu suất giảm dần).\n  - **Evolutionary**: Dành cho các bài toán phi tuyến phức tạp hoặc thuật toán di truyền."
    },
    "syntax": "# Access What-If Tools:\nData Tab -> Forecast Group -> What-If Analysis -> Goal Seek / Data Table / Scenario Manager\n\n# Enable Solver Add-in:\nFile -> Options -> Add-ins -> Manage: Excel Add-ins -> Go -> Check \"Solver Add-in\" -> Appears on Data Tab",
    "examples": [
      {
        "title": {
          "en": "Two-Way Sensitivity Table: Revenue across Price vs Unit Volume",
          "vi": "Bảng Độ Nhạy 2 Chiều: Doanh Thu Theo Đơn Giá vs Sản Lượng"
        },
        "code": "Matrix Layout:\nCorner Cell C4: =B1 * B2  (Base Formula: Price * Volume)\nRow Headers (D4:H4): 1000, 2000, 3000, 4000, 5000 (Unit Volumes)\nColumn Headers (C5:C9): $10, $15, $20, $25, $30 (Unit Prices)\n\nAction: Select C4:H9 -> Data -> What-If Analysis -> Data Table\nRow input cell: B2 (Volume)\nColumn input cell: B1 (Price)\n\nResult: Fills all 25 cross-scenario financial outcomes instantly!",
        "description": {
          "en": "Generates a multi-scenario sensitivity matrix for investment committee presentations.",
          "vi": "Tạo ma trận phân tích độ nhạy đa kịch bản phục vụ báo cáo hội đồng đầu tư."
        }
      },
      {
        "title": {
          "en": "Product Mix Optimization with Solver (Simplex LP)",
          "vi": "Tối Ưu Hóa Cơ Cấu Sản Phẩm Bằng Solver (Simplex LP)"
        },
        "code": "Objective: Maximize Total Profit in cell D10\nBy Changing Variable Cells: B2:B4 (Units of Product A, B, C)\nSubject to Constraints:\n- B2:B4 >= 0 (Non-negative production)\n- B2:B4 = integer (Whole units only)\n- TotalLaborHours in D6 <= 400 (Labor capacity)\n- TotalRawMaterial in D7 <= 1500 (Material stock)\n\nSolving Method: Simplex LP\nOutcome: Finds the exact optimal manufacturing schedule that yields maximum possible profit.",
        "description": {
          "en": "Solver solves mathematical linear programming models to guarantee maximum operational efficiency.",
          "vi": "Solver giải bài toán quy hoạch tuyến tính để đảm bảo hiệu quả vận hành tối đa."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Confusing Row Input Cell and Column Input Cell in Two-Way Data Tables, causing transposed sensitivity calculations.",
          "vi": "Nhầm lẫn giữa Row Input Cell và Column Input Cell trong Bảng dữ liệu 2 biến, khiến kết quả phân tích độ nhạy bị đảo ngược."
        },
        "correction": {
          "en": "Row Input Cell corresponds to values arrayed horizontally across the top row; Column Input Cell corresponds to values listed down the left column.",
          "vi": "Row Input Cell tương ứng với các giá trị trải ngang ở hàng trên cùng; Column Input Cell tương ứng với các giá trị xếp dọc ở cột bên trái."
        }
      }
    ],
    "tips": [
      {
        "en": "Automatic Table Recalculation Performance: On huge models, go to Formulas -> Calculation Options -> \"Automatic Except for Data Tables\" to stop Data Tables from slowing down workbook calculations.",
        "vi": "Tối ưu hiệu năng tính toán: Với các file lớn, vào Formulas -> Calculation Options -> \"Automatic Except for Data Tables\" để ngăn Data Tables làm chậm file."
      },
      {
        "en": "Save Scenario Reports: Scenario Manager lets you save named sets of assumptions (e.g. Best Case, Base Case, Worst Case) and generate an executive comparison summary sheet in one click.",
        "vi": "Xuất báo cáo kịch bản: Scenario Manager cho phép lưu các bộ giả định (Kịch bản Tốt nhất, Cơ sở, Xấu nhất) và xuất báo cáo so sánh tự động."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l20_ex1",
      "type": "complete_code",
      "title": {
        "en": "Identify Tool for Single Target Reverse Engineering",
        "vi": "Xác Định Công Cụ Tính Toán Ngược Mục Tiêu Đơn Biến"
      },
      "instruction": {
        "en": "Type the exact name of the built-in Excel feature used to find the specific input value needed to achieve a target formula result (format: Goal Seek).",
        "vi": "Gõ tên chính xác của tính năng có sẵn trong Excel dùng để tìm giá trị đầu vào cần thiết nhằm đạt được một kết quả công thức mục tiêu (định dạng: Goal Seek)."
      },
      "starterCode": "Goal",
      "solutionCode": "Goal Seek",
      "expectedOutput": "Goal Seek",
      "hint": {
        "en": "Goal Seek.",
        "vi": "Goal Seek."
      },
      "explanation": {
        "en": "Goal Seek backsolves for an unknown input variable to meet a specific goal.",
        "vi": "Goal Seek giải ngược tìm biến đầu vào chưa biết để đạt được mục tiêu cụ thể."
      }
    },
    {
      "id": "excel_l20_ex2",
      "type": "complete_code",
      "title": {
        "en": "Identify Linear Optimization Algorithm in Solver",
        "vi": "Xác Định Thuật Toán Tối Ưu Tuyến Tính Trong Solver"
      },
      "instruction": {
        "en": "Type the name of the standard linear programming engine method used in Solver for linear models (format: Simplex LP).",
        "vi": "Gõ tên phương pháp thuật toán quy hoạch tuyến tính chuẩn được sử dụng trong Solver cho các mô hình tuyến tính (định dạng: Simplex LP)."
      },
      "starterCode": "Simplex",
      "solutionCode": "Simplex LP",
      "expectedOutput": "Simplex LP",
      "hint": {
        "en": "Simplex LP.",
        "vi": "Simplex LP."
      },
      "explanation": {
        "en": "Simplex LP optimizes linear programming models with mathematical certainty.",
        "vi": "Simplex LP tối ưu hóa các mô hình quy hoạch tuyến tính với độ chính xác toán học tuyệt đối."
      }
    }
  ],
  "challenge": {
    "id": "excel_l20_challenge",
    "title": {
      "en": "Configure Solver Optimization Model Components",
      "vi": "Cấu Hình Các Thành Phần Mô Hình Tối Ưu Hóa Solver"
    },
    "description": {
      "en": "State the three primary components required to configure a Solver problem: Objective, Variable Cells, and Constraints (type \"Objective, Variable Cells, Constraints\").",
      "vi": "Nêu ba thành phần chính bắt buộc phải cấu hình cho một bài toán Solver: Objective, Variable Cells, and Constraints (gõ \"Objective, Variable Cells, Constraints\")."
    },
    "requirements": [
      {
        "en": "Type exact string \"Objective, Variable Cells, Constraints\"",
        "vi": "Gõ chính xác chuỗi \"Objective, Variable Cells, Constraints\""
      }
    ],
    "starterCode": "Objective, Variable Cells, ",
    "solutionCode": "Objective, Variable Cells, Constraints",
    "hints": [
      {
        "en": "Objective, Variable Cells, Constraints",
        "vi": "Objective, Variable Cells, Constraints"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l20_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the primary operational difference between `Goal Seek` and `Solver`?",
        "vi": "Sự khác biệt cốt lõi trong vận hành giữa `Goal Seek` và `Solver` là gì?"
      },
      "options": [
        {
          "en": "Goal Seek can only adjust ONE changing variable cell to reach a target value; Solver can adjust MULTIPLE changing cells subject to multiple CONSTRAINTS",
          "vi": "Goal Seek chỉ có thể điều chỉnh MỘT ô biến đầu vào duy nhất để đạt mục tiêu; Solver có thể điều chỉnh NHIỀU ô biến đồng thời với nhiều ĐIỀU KIỆN RÀNG BUỘC"
        },
        {
          "en": "Goal Seek is for text only",
          "vi": "Goal Seek chỉ dùng cho văn bản"
        },
        {
          "en": "Solver cannot maximize profit",
          "vi": "Solver không thể tối đa hóa lợi nhuận"
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
        "en": "Goal Seek solves single-variable equalities. Solver handles multi-variable constrained optimization (linear, non-linear, integer).",
        "vi": "Goal Seek giải phương trình đơn biến. Solver xử lý bài toán tối ưu hóa đa biến có ràng buộc (tuyến tính, phi tuyến, số nguyên)."
      },
      "difficulty": "easy",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q2",
      "type": "single_choice",
      "question": {
        "en": "In a Two-Variable Sensitivity Data Table, where must the primary output formula be referenced?",
        "vi": "Trong Bảng phân tích độ nhạy 2 biến (Two-Variable Data Table), công thức kết quả chính bắt buộc phải được tham chiếu ở đâu?"
      },
      "options": [
        {
          "en": "At the top-left corner cell of the table matrix (the intersection of row and column headers)",
          "vi": "Tại ô góc trên cùng bên trái của ma trận bảng (giao điểm giữa tiêu đề hàng và tiêu đề cột)"
        },
        {
          "en": "At the bottom-right cell",
          "vi": "Tại ô dưới cùng bên phải"
        },
        {
          "en": "In the middle of the table",
          "vi": "Ở chính giữa bảng"
        },
        {
          "en": "Anywhere on the worksheet",
          "vi": "Bất kỳ đâu trên trang tính"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Two-Way Data Tables require the target formula in the top-left corner cell of the selection grid.",
        "vi": "Bảng dữ liệu 2 biến yêu cầu công thức mục tiêu phải nằm ở ô góc trên cùng bên trái của vùng chọn."
      },
      "difficulty": "medium",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q3",
      "type": "single_choice",
      "question": {
        "en": "Which Solver solving method is appropriate for smooth non-linear problems, such as pricing models where demand is an exponential function of price?",
        "vi": "Phương pháp giải nào trong Solver phù hợp cho các bài toán phi tuyến tính mượt mà, như mô hình định giá trong đó nhu cầu là hàm mũ của giá bán?"
      },
      "options": [
        {
          "en": "GRG Nonlinear",
          "vi": "GRG Nonlinear"
        },
        {
          "en": "Simplex LP",
          "vi": "Simplex LP"
        },
        {
          "en": "Goal Seek Mode",
          "vi": "Chế độ Goal Seek"
        },
        {
          "en": "Linear Pivot",
          "vi": "Linear Pivot"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "GRG (Generalized Reduced Gradient) Nonlinear is engineered for smooth nonlinear optimization problems.",
        "vi": "GRG (Generalized Reduced Gradient) Nonlinear được thiết kế chuyên biệt cho các bài toán tối ưu hóa phi tuyến mượt mà."
      },
      "difficulty": "medium",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q4",
      "type": "single_choice",
      "question": {
        "en": "How do you install or activate the Solver tool in Microsoft Excel if it is not visible on the Data tab?",
        "vi": "Làm thế nào để cài đặt hoặc kích hoạt công cụ Solver trong Microsoft Excel nếu chưa thấy trên thẻ Data?"
      },
      "options": [
        {
          "en": "File -> Options -> Add-ins -> Manage: Excel Add-ins -> Check \"Solver Add-in\"",
          "vi": "File -> Options -> Add-ins -> Manage: Excel Add-ins -> Tích chọn \"Solver Add-in\""
        },
        {
          "en": "Download an external .exe file from the internet",
          "vi": "Tải tệp .exe ngoài từ internet"
        },
        {
          "en": "Reinstall Windows",
          "vi": "Cài đặt lại Windows"
        },
        {
          "en": "Upgrade to Excel Enterprise Cloud only",
          "vi": "Chỉ nâng cấp lên Excel Enterprise Cloud"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Solver is a native built-in Excel add-in that just needs to be enabled in Excel Options.",
        "vi": "Solver là tiện ích bổ sung có sẵn của Excel, chỉ cần bật kích hoạt trong Excel Options."
      },
      "difficulty": "easy",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q5",
      "type": "single_choice",
      "question": {
        "en": "What feature allows financial analysts to save and switch between named sets of input assumptions (e.g. \"Base Case\", \"Recession Case\", \"Growth Case\")?",
        "vi": "Tính năng nào cho phép các chuyên gia tài chính lưu và chuyển đổi qua lại giữa các bộ giả định đầu vào (ví dụ \"Kịch bản Cơ sở\", \"Kịch bản Suy thoái\", \"Kịch bản Tăng trưởng\")?"
      },
      "options": [
        {
          "en": "Scenario Manager (What-If Analysis)",
          "vi": "Scenario Manager (What-If Analysis)"
        },
        {
          "en": "Track Changes",
          "vi": "Track Changes"
        },
        {
          "en": "Version History",
          "vi": "Version History"
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
        "en": "Scenario Manager stores named sets of input variables and can produce an automated executive summary comparison table.",
        "vi": "Scenario Manager lưu trữ các bộ biến số đầu vào đã đặt tên và có thể tự động xuất bảng tóm tắt so sánh kịch bản."
      },
      "difficulty": "medium",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q6",
      "type": "single_choice",
      "question": {
        "en": "What constraint type in Solver ensures that a factory model does not produce partial fractions of physical goods (e.g. 14.7 cars)?",
        "vi": "Loại ràng buộc nào trong Solver đảm bảo rằng mô hình nhà máy không sản xuất số lượng lẻ của sản phẩm vật lý (ví dụ 14.7 chiếc xe hơi)?"
      },
      "options": [
        {
          "en": "`int` (Integer constraint)",
          "vi": "`int` (Ràng buộc số nguyên Integer)"
        },
        {
          "en": "`bin` (Binary)",
          "vi": "`bin` (Nhị phân)"
        },
        {
          "en": "`dif` (AllDifferent)",
          "vi": "`dif` (Tất cả khác nhau)"
        },
        {
          "en": "`<= 100`",
          "vi": "`<= 100`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Setting the constraint to `int` restricts the decision variables strictly to whole integer values.",
        "vi": "Thiết lập ràng buộc là `int` sẽ giới hạn các biến số ra quyết định nghiêm ngặt là các số nguyên."
      },
      "difficulty": "medium",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q7",
      "type": "true_false",
      "question": {
        "en": "True or False: In Goal Seek, the \"Set cell\" MUST contain a formula, not a hardcoded static value.",
        "vi": "Đúng hay Sai: Trong Goal Seek, ô \"Set cell\" BẮT BUỘC phải chứa một công thức, không được là giá trị gõ cứng."
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
        "en": "True. Goal Seek requires an underlying formula to establish the mathematical relationship between the target cell and the changing cell.",
        "vi": "Đúng. Goal Seek bắt buộc ô mục tiêu phải có công thức để xác lập mối quan hệ toán học với ô biến đầu vào."
      },
      "difficulty": "easy",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q8",
      "type": "single_choice",
      "question": {
        "en": "What calculation setting stops massive What-If Data Tables from continually recalculating and freezing large financial models?",
        "vi": "Cài đặt tính toán nào ngăn không cho các Bảng dữ liệu What-If Data Tables khổng lồ liên tục tính toán lại gây đơ các mô hình tài chính lớn?"
      },
      "options": [
        {
          "en": "Formulas -> Calculation Options -> \"Automatic Except for Data Tables\"",
          "vi": "Formulas -> Calculation Options -> \"Automatic Except for Data Tables\""
        },
        {
          "en": "Manual mode for the whole computer",
          "vi": "Chế độ Manual cho toàn bộ máy tính"
        },
        {
          "en": "Turn off Wi-Fi",
          "vi": "Tắt Wi-Fi"
        },
        {
          "en": "Delete the table",
          "vi": "Xóa bảng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "\"Automatic Except for Data Tables\" preserves live formula updates while deferring heavy table matrix recalculations until F9 is pressed.",
        "vi": "\"Automatic Except for Data Tables\" duy trì cập nhật công thức trực tiếp trong khi hoãn việc tính toán lại bảng ma trận nặng cho đến khi nhấn F9."
      },
      "difficulty": "medium",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q9",
      "type": "single_choice",
      "question": {
        "en": "What does the `bin` constraint in Solver enforce on a changing cell?",
        "vi": "Ràng buộc `bin` trong Solver bắt buộc ô biến thay đổi phải mang giá trị gì?"
      },
      "options": [
        {
          "en": "Binary value: strictly `0` (No/Off) or `1` (Yes/On) (used for Go/No-Go capital allocation decisions)",
          "vi": "Giá trị nhị phân: nghiêm ngặt là `0` (Không/Tắt) hoặc `1` (Có/Bật) (dùng cho các quyết định đầu tư Có/Không)"
        },
        {
          "en": "Any positive number",
          "vi": "Bất kỳ số dương nào"
        },
        {
          "en": "A text string",
          "vi": "Một chuỗi văn bản"
        },
        {
          "en": "A date in 2026",
          "vi": "Một ngày trong năm 2026"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Binary constraints (0 or 1) model boolean logic decisions such as whether to launch a project or open a new facility.",
        "vi": "Ràng buộc nhị phân (0 hoặc 1) mô hình hóa các quyết định logic như có nên triển khai dự án hay mở thêm chi nhánh mới hay không."
      },
      "difficulty": "hard",
      "topicId": "excel_what_if"
    },
    {
      "id": "excel_l20_q10",
      "type": "single_choice",
      "question": {
        "en": "Which What-If tool is best suited for generating a loan amortization repayment matrix showing monthly payments across 10 different interest rates and 5 different loan terms?",
        "vi": "Công cụ What-If nào phù hợp nhất để tạo ma trận trả nợ khoản vay hiển thị số tiền trả hàng tháng qua 10 mức lãi suất khác nhau và 5 kỳ hạn vay khác nhau?"
      },
      "options": [
        {
          "en": "Two-Variable Data Table",
          "vi": "Bảng dữ liệu 2 biến (Two-Variable Data Table)"
        },
        {
          "en": "Goal Seek",
          "vi": "Goal Seek"
        },
        {
          "en": "Solver",
          "vi": "Solver"
        },
        {
          "en": "Flash Fill",
          "vi": "Flash Fill"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "A Two-Variable Data Table effortlessly evaluates the 2D matrix of 10 rates by 5 terms simultaneously.",
        "vi": "Bảng dữ liệu 2 biến tính toán ma trận 2 chiều gồm 10 mức lãi suất kết hợp với 5 kỳ hạn vay một cách nhanh chóng."
      },
      "difficulty": "easy",
      "topicId": "excel_what_if"
    }
  ]
};
export default lesson20;
