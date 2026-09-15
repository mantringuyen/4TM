import { Lesson } from '../../../../types';

export const lesson23: Lesson = {
  "id": "excel_lesson_23",
  "order": 23,
  "moduleId": "excel_mod_6",
  "courseId": "excel",
  "levelId": "advanced",
  "topicId": "excel_functional",
  "title": {
    "en": "Modern Functional Excel: LET, LAMBDA, Higher-Order Helpers & Custom Functions",
    "vi": "Lập Trình Hàm Hiện Đại Trong Excel: LET, LAMBDA, Các Hàm Bậc Cao & Hàm Tự Định Nghĩa"
  },
  "summary": {
    "en": "Transform Excel into a modern functional programming environment: eliminate redundant recalculations with local LET variables, author reusable parameter-driven custom functions with LAMBDA, register custom business logic in Name Manager, and apply higher-order array iterators (MAP, REDUCE, SCAN, BYROW, BYCOL).",
    "vi": "Biến Excel thành môi trường lập trình hàm hiện đại: triệt tiêu các phép tính toán lặp lại thừa thãi bằng biến cục bộ LET, tự viết các hàm tùy biến có tham số tái sử dụng bằng LAMBDA, đăng ký hàm nghiệp vụ vào Name Manager và ứng dụng các hàm duyệt mảng bậc cao (MAP, REDUCE, SCAN, BYROW, BYCOL)."
  },
  "learn": {
    "introduction": {
      "en": "For decades, writing complex Excel formulas meant either copy-pasting the exact same massive expression multiple times within a single cell (causing terrible recalculation lag) or writing legacy VBA macros. The modern `LET` and `LAMBDA` functions bring true computer science abstractions—local scoped variables and pure functional programming—directly to the formula bar without macros.",
      "vi": "Trong nhiều thập kỷ, viết công thức Excel phức tạp đồng nghĩa với việc phải sao chép lặp lại cùng một biểu thức dài nhiều lần trong 1 ô (gây đơ giật tính toán) hoặc phải viết macro VBA. Các hàm hiện đại `LET` và `LAMBDA` mang các nguyên lý khoa học máy tính chuẩn mực—khai báo biến cục bộ và lập trình hàm thuần khiết—vào thẳng thanh công thức mà không cần đến macro."
    },
    "conceptExplanation": {
      "en": "### 1. The `LET` Function (Local Variable Scoping & Speed)\n- **Problem**: In `=IF(VLOOKUP(A1, Table, 2, 0) > 100, VLOOKUP(A1, Table, 2, 0) * 0.9, VLOOKUP(A1, Table, 2, 0))`, Excel executes the slow VLOOKUP **three separate times**!\n- **Solution with LET**: Assign the lookup result to a local variable once:\n  `=LET(price, VLOOKUP(A1, Table, 2, 0), IF(price > 100, price * 0.9, price))`\n  - Runs **up to 100x faster** by caching intermediate calculations in memory.\n  - Dramatically improves formula readability and maintainability.\n\n### 2. The `LAMBDA` Function (Custom Reusable Functions)\n- **Syntax**: `=LAMBDA([parameter1, parameter2, ...], calculation)`\n- **Testing in a cell**: Append invocation arguments at the end:\n  `=LAMBDA(x, y, (x * y) * 1.1)(10, 5)` -> returns `55`\n- **Creating a True Named Custom Function**:\n  1. Open *Formulas* tab -> **Name Manager** -> New.\n  2. Name: `CALCTAX`.\n  3. Refers to: `=LAMBDA(amount, rate, amount * (1 + rate))`.\n  4. Now anywhere in your workbook, simply type: `=CALCTAX(B2, 0.08)`!\n\n### 3. Higher-Order Array Helper Functions\n- **`=MAP(array1, lambda_function)`**: Applies a custom LAMBDA to every element of an array and returns a matching array of results.\n- **`=BYROW(array, lambda_function)`**: Computes row-by-row summaries (e.g. `=BYROW(A1:D10, LAMBDA(r, MAX(r)))`).\n- **`=BYCOL(array, lambda_function)`**: Computes column-by-column summaries.\n- **`=REDUCE(initial_value, array, lambda_accumulator)`**: Accumulates an array down to a single scalar value.\n- **`=SCAN(initial_value, array, lambda_accumulator)`**: Emits running intermediate accumulation steps as a spilled dynamic array (great for running balances!).",
      "vi": "### 1. Hàm `LET` (Khai Báo Biến Cục Bộ & Tăng Tốc)\n- **Vấn đề**: Trong công thức `=IF(VLOOKUP(A1, Table, 2, 0) > 100, VLOOKUP(A1, Table, 2, 0) * 0.9, VLOOKUP(A1, Table, 2, 0))`, Excel phải thực thi hàm VLOOKUP chậm chạp **ba lần độc lập**!\n- **Giải pháp với LET**: Gán kết quả tra cứu vào một biến cục bộ một lần duy nhất:\n  `=LET(gia, VLOOKUP(A1, Table, 2, 0), IF(gia > 100, gia * 0.9, gia))`\n  - Chạy **nhanh hơn tới 100 lần** nhờ lưu kết quả trung gian vào bộ nhớ.\n  - Làm công thức trở nên cực kỳ trong sáng, dễ đọc và bảo trì.\n\n### 2. Hàm `LAMBDA` (Tự Tạo Hàm Tái Sử Dụng Không Cần Macro)\n- **Cú pháp**: `=LAMBDA([tham_so1, tham_so2, ...], bieu_thuc_tinh_toan)`\n- **Chạy thử trong ô**: Thêm các đối số thực thi ở cuối:\n  `=LAMBDA(x, y, (x * y) * 1.1)(10, 5)` -> trả về `55`\n- **Đăng ký thành Hàm Đặt Tên Chính Thức**:\n  1. Mở thẻ *Formulas* -> **Name Manager** -> New.\n  2. Tên hàm: `TINHTHUE`.\n  3. Refers to: `=LAMBDA(so_tien, thue_suat, so_tien * (1 + thue_suat))`.\n  4. Giờ đây ở bất cứ ô nào, bạn chỉ cần gõ: `=TINHTHUE(B2, 0.08)`!\n\n### 3. Các Hàm Duyệt Mảng Bậc Cao (Higher-Order Helpers)\n- **`=MAP(mang, ham_lambda)`**: Áp dụng hàm LAMBDA lên từng phần tử của mảng và trả về mảng kết quả tương ứng.\n- **`=BYROW(mang, ham_lambda)`**: Tính toán tóm tắt theo từng hàng (ví dụ: `=BYROW(A1:D10, LAMBDA(r, MAX(r)))`).\n- **`=BYCOL(mang, ham_lambda)`**: Tính toán tóm tắt theo từng cột.\n- **`=REDUCE(gia_tri_dau, mang, lambda_tich_luy)`**: Gộp mảng thành một giá trị đơn lẻ duy nhất.\n- **`=SCAN(gia_tri_dau, mang, lambda_tich_luy)`**: Xuất ra từng bước cộng dồn tích lũy dưới dạng mảng tràn động (tuyệt vời để tạo cột số dư lũy kế!)."
    },
    "syntax": "# LET Scoping:\n=LET(\n  x, A1 * 2,\n  y, B1 * 3,\n  x + y\n)\n\n# LAMBDA Definition:\n=LAMBDA(revenue, tax_rate, revenue * (1 - tax_rate))\n\n# BYROW Row-Level Max Calculation:\n=BYROW(B2:E50, LAMBDA(row, MAX(row)))\n\n# SCAN Running Cumulative Total:\n=SCAN(0, B2:B100, LAMBDA(total, current, total + current))",
    "examples": [
      {
        "title": {
          "en": "High-Performance Clean Margin Calculation with LET",
          "vi": "Tính Biên Lợi Nhuận Hiệu Năng Cao Bằng LET"
        },
        "code": "=LET(\n  rev, SalesTable[Revenue],\n  cogs, SalesTable[COGS],\n  profit, rev - cogs,\n  margin, profit / rev,\n  IF(margin > 0.20, \"High Margin\", \"Standard\")\n)",
        "description": {
          "en": "Variables rev, cogs, profit, and margin are evaluated once, making complex conditional logic fast and legible.",
          "vi": "Các biến rev, cogs, profit và margin chỉ tính một lần, giúp logic điều kiện phức tạp chạy nhanh và sáng rõ."
        }
      },
      {
        "title": {
          "en": "Generating a Running Cumulative Balance with SCAN",
          "vi": "Tạo Cột Số Dư Lũy Kế Tự Động Bằng Hàm SCAN"
        },
        "code": "Cash Inflows in B2:B20\nTarget: Compute dynamic running account balance starting at $10,000\n\nFormula in C2: =SCAN(10000, B2:B20, LAMBDA(acc, val, acc + val))",
        "description": {
          "en": "SCAN emits a spilled array containing the rolling cumulative balance at each transaction step.",
          "vi": "SCAN trả về mảng tràn động chứa số dư tài khoản lũy kế tại từng bước giao dịch."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Entering a LAMBDA formula into a cell without trailing test parameters (=LAMBDA(x, x*2)), causing a #CALC! error.",
          "vi": "Gõ công thức LAMBDA vào ô mà không có tham số chạy thử ở cuối (=LAMBDA(x, x*2)), gây lỗi #CALC!."
        },
        "correction": {
          "en": "To test a LAMBDA in-cell, pass arguments immediately after: =LAMBDA(x, x*2)(50) -> returns 100.",
          "vi": "Để kiểm tra LAMBDA trong ô, truyền đối số ngay phía sau: =LAMBDA(x, x*2)(50) -> trả về 100."
        }
      }
    ],
    "tips": [
      {
        "en": "Format LET with Line Breaks: Press Alt + Enter inside the formula bar to put each variable assignment on its own indented line for crystal clear code structure.",
        "vi": "Xuống dòng trong LET: Nhấn Alt + Enter trên thanh công thức để đưa từng biến vào một dòng riêng biệt giúp cấu trúc mã cực kỳ rõ ràng."
      },
      {
        "en": "Store LAMBDAs in Name Manager: Once tested, save your LAMBDA formulas into the Name Manager so your entire organization can call custom business functions by name.",
        "vi": "Lưu LAMBDA vào Name Manager: Sau khi thử nghiệm, hãy lưu các công thức LAMBDA vào Name Manager để toàn công ty có thể gọi hàm nghiệp vụ theo tên."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l23_ex1",
      "type": "complete_code",
      "title": {
        "en": "Write a Clean Local Variable Calculation with LET",
        "vi": "Viết Phép Tính Biến Cục Bộ Bằng LET"
      },
      "instruction": {
        "en": "Write a LET formula that defines variable \"subtotal\" as A2 * B2 and returns subtotal * 1.1.",
        "vi": "Viết công thức LET định nghĩa biến \"subtotal\" là A2 * B2 và trả về subtotal * 1.1."
      },
      "starterCode": "=LET(subtotal, A2 * B2, ",
      "solutionCode": "=LET(subtotal, A2 * B2, subtotal * 1.1)",
      "expectedOutput": "=LET(subtotal, A2 * B2, subtotal * 1.1)",
      "hint": {
        "en": "Pass subtotal * 1.1 as the final expression.",
        "vi": "Truyền subtotal * 1.1 làm biểu thức kết quả cuối cùng."
      },
      "explanation": {
        "en": "LET evaluates intermediate expressions once and binds them to named variables.",
        "vi": "LET tính toán các biểu thức trung gian một lần và gán vào các biến đã đặt tên."
      }
    },
    {
      "id": "excel_l23_ex2",
      "type": "complete_code",
      "title": {
        "en": "Construct Row-by-Row Sum using BYROW and LAMBDA",
        "vi": "Tính Tổng Từng Hàng Bằng BYROW và LAMBDA"
      },
      "instruction": {
        "en": "Write a formula using BYROW on range A1:D10 with a LAMBDA that calculates the SUM of each row.",
        "vi": "Viết công thức sử dụng BYROW trên dải A1:D10 với hàm LAMBDA tính tổng SUM của từng hàng."
      },
      "starterCode": "=BYROW(A1:D10, LAMBDA(r, ",
      "solutionCode": "=BYROW(A1:D10, LAMBDA(r, SUM(r)))",
      "expectedOutput": "=BYROW(A1:D10, LAMBDA(r, SUM(r)))",
      "hint": {
        "en": "LAMBDA(r, SUM(r))",
        "vi": "LAMBDA(r, SUM(r))"
      },
      "explanation": {
        "en": "BYROW iterates down each row vector and evaluates the inner LAMBDA function.",
        "vi": "BYROW duyệt qua từng vector hàng và thực thi hàm LAMBDA bên trong."
      }
    }
  ],
  "challenge": {
    "id": "excel_l23_challenge",
    "title": {
      "en": "Construct Cumulative Running Balance with SCAN",
      "vi": "Tạo Chuỗi Số Dư Lũy Kế Bằng SCAN"
    },
    "description": {
      "en": "Construct a dynamic SCAN formula that begins with an initial opening balance of 5000 and accumulates sequential transaction inflows from range B2:B20.",
      "vi": "Xây dựng công thức SCAN động bắt đầu với số dư đầu kỳ là 5000 và tích lũy các dòng tiền giao dịch liên tiếp từ dải B2:B20."
    },
    "requirements": [
      {
        "en": "Use the SCAN function",
        "vi": "Sử dụng hàm SCAN"
      },
      {
        "en": "Initial value 5000",
        "vi": "Giá trị khởi tạo 5000"
      },
      {
        "en": "Accumulator LAMBDA(acc, val, acc + val)",
        "vi": "Hàm tích lũy LAMBDA(acc, val, acc + val)"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=SCAN(5000, B2:B20, LAMBDA(acc, val, acc + val))",
    "hints": [
      {
        "en": "Syntax: =SCAN(5000, B2:B20, LAMBDA(acc, val, acc + val))",
        "vi": "Cú pháp: =SCAN(5000, B2:B20, LAMBDA(acc, val, acc + val))"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l23_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the primary operational advantage of using the `LET` function in complex Excel formulas?",
        "vi": "Lợi thế vận hành cốt lõi của việc sử dụng hàm `LET` trong các công thức Excel phức tạp là gì?"
      },
      "options": [
        {
          "en": "It assigns names to calculation results, preventing repetitive redundant sub-evaluations and significantly boosting calculation performance",
          "vi": "Nó gán tên cho kết quả tính toán trung gian, loại bỏ các phép tính lặp lại dư thừa và tăng tốc hiệu năng tính toán đáng kể"
        },
        {
          "en": "It converts formulas to Python",
          "vi": "Nó chuyển đổi công thức sang Python"
        },
        {
          "en": "It translates the sheet into Spanish",
          "vi": "Nó dịch bảng tính sang tiếng Tây Ban Nha"
        },
        {
          "en": "It locks the cells against editing",
          "vi": "Nó khóa không cho chỉnh sửa ô"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "LET stores intermediate values in memory once, eliminating the need to recalculate identical sub-expressions multiple times in one formula.",
        "vi": "LET lưu các giá trị trung gian vào bộ nhớ một lần duy nhất, tránh việc phải tính toán lại cùng một biểu thức con nhiều lần trong một công thức."
      },
      "difficulty": "easy",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q2",
      "type": "single_choice",
      "question": {
        "en": "How do you turn a `LAMBDA` formula into a permanent, reusable custom function across your workbook?",
        "vi": "Làm thế nào để biến một công thức `LAMBDA` thành một hàm tùy chỉnh vĩnh viễn, có thể tái sử dụng trong toàn bộ file?"
      },
      "options": [
        {
          "en": "Define it in the Name Manager (Formulas tab -> Name Manager -> New -> assign name and paste LAMBDA formula)",
          "vi": "Định nghĩa nó trong Name Manager (Thẻ Formulas -> Name Manager -> New -> đặt tên hàm và dán công thức LAMBDA)"
        },
        {
          "en": "Export as a .DLL file",
          "vi": "Xuất ra tệp .DLL"
        },
        {
          "en": "Save the workbook as a PDF",
          "vi": "Lưu bảng tính dạng PDF"
        },
        {
          "en": "Write it in uppercase letters only",
          "vi": "Chỉ viết bằng chữ in hoa"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Naming a LAMBDA formula in the Name Manager registers it as a native first-class function callable from any cell.",
        "vi": "Đặt tên cho công thức LAMBDA trong Name Manager sẽ đăng ký nó thành một hàm chính thức có thể gọi từ bất kỳ ô nào."
      },
      "difficulty": "medium",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q3",
      "type": "single_choice",
      "question": {
        "en": "What does the higher-order helper function `=BYROW(A1:D10, LAMBDA(r, AVERAGE(r)))` return?",
        "vi": "Hàm hỗ trợ bậc cao `=BYROW(A1:D10, LAMBDA(r, AVERAGE(r)))` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "A spilled column of 10 values representing the mathematical average of each of the 10 rows",
          "vi": "Một mảng cột gồm 10 giá trị đại diện cho trung bình cộng của từng hàng trong 10 hàng"
        },
        {
          "en": "The overall average of all 40 cells",
          "vi": "Trung bình cộng chung của toàn bộ 40 ô"
        },
        {
          "en": "A 10x4 grid of numbers",
          "vi": "Một bảng 10x4 số"
        },
        {
          "en": "An error",
          "vi": "Một thông báo lỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "BYROW applies the LAMBDA function to each row vector independently, outputting a 1D column vector of row averages.",
        "vi": "BYROW áp dụng hàm LAMBDA cho từng vector hàng độc lập, xuất ra một cột gồm giá trị trung bình của từng hàng."
      },
      "difficulty": "medium",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q4",
      "type": "single_choice",
      "question": {
        "en": "What is the difference between `REDUCE` and `SCAN` in Excel's functional array suite?",
        "vi": "Sự khác biệt giữa hàm `REDUCE` và `SCAN` trong bộ hàm xử lý mảng của Excel là gì?"
      },
      "options": [
        {
          "en": "REDUCE returns only the single final accumulated scalar value; SCAN returns all intermediate accumulation steps as a spilled dynamic array",
          "vi": "REDUCE chỉ trả về một giá trị tích lũy cuối cùng duy nhất; SCAN trả về tất cả các bước tích lũy trung gian dưới dạng mảng tràn động"
        },
        {
          "en": "REDUCE is for text; SCAN is for numbers",
          "vi": "REDUCE dùng cho chữ; SCAN dùng cho số"
        },
        {
          "en": "SCAN scans barcodes with the camera",
          "vi": "SCAN quét mã vạch bằng camera"
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
        "en": "REDUCE condenses an array into a single final aggregate; SCAN emits the step-by-step rolling progression (ideal for running totals).",
        "vi": "REDUCE thu gọn mảng thành một giá trị tổng hợp duy nhất; SCAN xuất ra quá trình cộng dồn từng bước (lý tưởng cho số dư lũy kế)."
      },
      "difficulty": "hard",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q5",
      "type": "single_choice",
      "question": {
        "en": "How do you test a LAMBDA formula in an active worksheet cell before storing it in the Name Manager?",
        "vi": "Làm thế nào để thử nghiệm một công thức LAMBDA trong ô trang tính trước khi lưu vào Name Manager?"
      },
      "options": [
        {
          "en": "Append the arguments in parentheses at the end of the formula: `=LAMBDA(x, x*2)(25)`",
          "vi": "Thêm các đối số trong ngoặc đơn ở cuối công thức: `=LAMBDA(x, x*2)(25)`"
        },
        {
          "en": "Press Ctrl + Shift + Enter",
          "vi": "Nhấn Ctrl + Shift + Enter"
        },
        {
          "en": "Wrap with TEST()",
          "vi": "Bọc ngoài bằng TEST()"
        },
        {
          "en": "LAMBDAs cannot be tested in cells",
          "vi": "LAMBDA không thể chạy thử trong ô"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In-cell testing uses immediate invocation syntax, passing arguments in parentheses right after the LAMBDA definition.",
        "vi": "Chạy thử trong ô sử dụng cú pháp gọi thực thi ngay, truyền các đối số trong dấu ngoặc đơn ngay sau định nghĩa LAMBDA."
      },
      "difficulty": "medium",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q6",
      "type": "true_false",
      "question": {
        "en": "True or False: Using `LET` variables requires macro-enabled workbook formats (.xlsm).",
        "vi": "Đúng hay Sai: Việc sử dụng các biến `LET` yêu cầu định dạng sổ làm việc có hỗ trợ macro (.xlsm)."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False (LET and LAMBDA are native formulas supported in standard .xlsx files)",
          "vi": "Sai (LET và LAMBDA là các hàm chuẩn có sẵn trong tệp .xlsx thông thường)"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "False. LET and LAMBDA are native Microsoft 365 calculation engine functions that work in standard .xlsx workbooks without macros.",
        "vi": "Sai. LET và LAMBDA là các hàm gốc của bộ tính toán Microsoft 365 hoạt động trên tệp .xlsx tiêu chuẩn không cần macro."
      },
      "difficulty": "easy",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q7",
      "type": "single_choice",
      "question": {
        "en": "What does the function `=MAP(A1:A10, LAMBDA(val, val * 1.05))` accomplish?",
        "vi": "Hàm `=MAP(A1:A10, LAMBDA(val, val * 1.05))` thực hiện điều gì?"
      },
      "options": [
        {
          "en": "Multiplies every individual cell in A1:A10 by 1.05 and spills the resulting 10-element array",
          "vi": "Nhân từng ô đơn lẻ trong dải A1:A10 với 1.05 và tràn mảng kết quả gồm 10 phần tử ra bảng tính"
        },
        {
          "en": "Draws a geographic map of region A1:A10",
          "vi": "Vẽ bản đồ địa lý cho khu vực A1:A10"
        },
        {
          "en": "Sorts the cells in ascending order",
          "vi": "Sắp xếp các ô theo thứ tự tăng dần"
        },
        {
          "en": "Finds the maximum value",
          "vi": "Tìm giá trị lớn nhất"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "MAP applies the specified LAMBDA transformation to each element of the input array and returns the transformed array.",
        "vi": "Hàm MAP áp dụng phép biến đổi LAMBDA chỉ định cho từng phần tử của mảng đầu vào và trả về mảng kết quả."
      },
      "difficulty": "medium",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q8",
      "type": "single_choice",
      "question": {
        "en": "Can a custom function created with `LAMBDA` call itself recursively to solve iterative problems like calculating factorials?",
        "vi": "Một hàm tùy chỉnh tạo bằng `LAMBDA` có thể tự gọi lại chính nó theo kiểu đệ quy (recursive) để giải các bài toán lặp như tính giai thừa không?"
      },
      "options": [
        {
          "en": "Yes, LAMBDA fully supports recursive function calls when defined in the Name Manager",
          "vi": "Có, LAMBDA hỗ trợ hoàn toàn việc gọi hàm đệ quy khi được định nghĩa trong Name Manager"
        },
        {
          "en": "No, recursion is strictly impossible in Excel formulas",
          "vi": "Không, đệ quy hoàn toàn không thể thực hiện trong công thức Excel"
        },
        {
          "en": "Only on 64-bit Windows Excel",
          "vi": "Chỉ trên Excel Windows 64-bit"
        },
        {
          "en": "Only if VBA is enabled",
          "vi": "Chỉ khi bật VBA"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "LAMBDA functions stored in the Name Manager can call themselves recursively, unlocking Turing-complete computation.",
        "vi": "Hàm LAMBDA lưu trong Name Manager có thể tự gọi đệ quy chính nó, mở ra khả năng tính toán Turing-complete trong Excel."
      },
      "difficulty": "hard",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q9",
      "type": "single_choice",
      "question": {
        "en": "In the formula `=LET(a, 10, b, 20, a * b)`, what is the output displayed in the cell?",
        "vi": "Trong công thức `=LET(a, 10, b, 20, a * b)`, kết quả nào được hiển thị trong ô?"
      },
      "options": [
        {
          "en": "200",
          "vi": "200"
        },
        {
          "en": "30",
          "vi": "30"
        },
        {
          "en": "\"a * b\"",
          "vi": "\"a * b\""
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
        "en": "The variable `a` is 10, `b` is 20, and the calculation expression `a * b` computes 10 * 20 = 200.",
        "vi": "Biến `a` là 10, `b` là 20, và biểu thức tính toán `a * b` cho kết quả 10 * 20 = 200."
      },
      "difficulty": "easy",
      "topicId": "excel_functional"
    },
    {
      "id": "excel_l23_q10",
      "type": "single_choice",
      "question": {
        "en": "What function generates a 2D matrix of values evaluated from row and column coordinate indexes using a custom LAMBDA?",
        "vi": "Hàm nào tạo ra ma trận 2 chiều các giá trị được tính toán từ chỉ số tọa độ hàng và cột bằng hàm LAMBDA tùy chỉnh?"
      },
      "options": [
        {
          "en": "`MAKEARRAY(rows, cols, lambda_function)`",
          "vi": "`MAKEARRAY(rows, cols, lambda_function)`"
        },
        {
          "en": "`CREATEGRID()`",
          "vi": "`CREATEGRID()`"
        },
        {
          "en": "`NEW_MATRIX()`",
          "vi": "`NEW_MATRIX()`"
        },
        {
          "en": "`GRID()`",
          "vi": "`GRID()`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "MAKEARRAY creates a grid of dimensions (rows, cols) where each element is computed via LAMBDA(row_index, col_index, expression).",
        "vi": "MAKEARRAY tạo bảng số kích thước (hàng, cột) trong đó mỗi phần tử được tính qua LAMBDA(chi_so_hang, chi_so_cot, bieu_thuc)."
      },
      "difficulty": "hard",
      "topicId": "excel_functional"
    }
  ]
};
export default lesson23;
