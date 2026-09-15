import { Lesson } from '../../../../types';

export const lesson09: Lesson = {
  "id": "excel_lesson_9",
  "order": 9,
  "moduleId": "excel_mod_3",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_logic",
  "title": {
    "en": "Advanced Logical Decision Making: IF, AND, OR, NOT, IFS & SWITCH",
    "vi": "Ra Quyết Định Logic Nâng Cao: IF, AND, OR, NOT, IFS & SWITCH"
  },
  "summary": {
    "en": "Master boolean logic pipelines in Excel: single and nested IF statements, compound multi-criteria evaluations with AND/OR, multi-condition workflows with modern IFS, and structured exact-value routing with SWITCH.",
    "vi": "Làm chủ quy trình logic boolean trong Excel: câu lệnh IF đơn và lồng nhau, đánh giá đa điều kiện kết hợp với AND/OR, xử lý nhiều nhánh điều kiện bằng hàm IFS hiện đại và định tuyến giá trị chính xác bằng SWITCH."
  },
  "learn": {
    "introduction": {
      "en": "Business decisions are inherently conditional: commission tiers depend on exceeding sales quotas, credit approvals require high scores AND zero late payments, and regional tax brackets vary by jurisdiction. Logical functions allow spreadsheet models to dynamically evaluate rules and output automated decisions at scale.",
      "vi": "Các quyết định kinh doanh luôn gắn liền với điều kiện: bậc hoa hồng phụ thuộc vào việc vượt hạn mức bán hàng, phê duyệt tín dụng yêu cầu điểm số cao VÀ không nợ hạn, và thuế suất vùng thay đổi theo từng khu vực. Các hàm logic giúp bảng tính tự động đánh giá quy tắc và đưa ra quyết định tự động trên quy mô lớn."
    },
    "conceptExplanation": {
      "en": "### 1. The Core Logical Toolkit\n- **`=IF(logical_test, value_if_true, [value_if_false])`**: Evaluates condition; returns one value if TRUE, another if FALSE.\n- **`=AND(cond1, cond2, ...)`**: Returns TRUE only if **all** arguments evaluate to TRUE.\n- **`=OR(cond1, cond2, ...)`**: Returns TRUE if **at least one** argument is TRUE.\n- **`=NOT(logical)`**: Inverts TRUE to FALSE, and FALSE to TRUE.\n- **`=IFS(cond1, val1, cond2, val2, ...)`**: Evaluates conditions sequentially without cumbersome nested IF parentheses.\n- **`=SWITCH(expression, val1, result1, val2, result2, ..., [default])`**: Tests an expression against a list of exact matches and returns the corresponding result.\n\n### 2. Compound Multi-Criteria Logic\nNest `AND` or `OR` directly inside the `logical_test` argument:\n`=IF(AND(B2>=10000, C2=\"High\"), \"Eligible\", \"Ineligible\")`",
      "vi": "### 1. Bộ Công Cụ Hàm Logic Cốt Lõi\n- **`=IF(dieu_kien, gia_tri_khi_dung, [gia_tri_khi_sai])`**: Kiểm tra điều kiện; trả về một giá trị nếu TRUE, giá trị khác nếu FALSE.\n- **`=AND(dk1, dk2, ...)`**: Trả về TRUE chỉ khi **tất cả** các điều kiện đều TRUE.\n- **`=OR(dk1, dk2, ...)`**: Trả về TRUE nếu có **ít nhất một** điều kiện là TRUE.\n- **`=NOT(logic)`**: Đảo ngược TRUE thành FALSE và ngược lại.\n- **`=IFS(dk1, kq1, dk2, kq2, ...)`**: Đánh giá tuần tự nhiều điều kiện mà không cần lồng nhiều dấu ngoặc đơn IF phức tạp.\n- **`=SWITCH(bieu_thuc, gt1, kq1, gt2, kq2, ..., [mac_dinh])`**: So khớp biểu thức với danh sách các giá trị chính xác và trả về kết quả tương ứng.\n\n### 2. Logic Đa Điều Kiện Phức Hợp\nLồng trực tiếp `AND` hoặc `OR` vào bên trong đối số `dieu_kien` của IF:\n`=IF(AND(B2>=10000, C2=\"High\"), \"Eligible\", \"Ineligible\")`"
    },
    "syntax": "# Basic IF:\n=IF(logical_test, value_if_true, value_if_false)\n\n# Compound AND/OR:\n=IF(AND(A2>50, B2<100), \"Pass\", \"Fail\")\n=IF(OR(A2=\"VIP\", B2>100000), 0.15, 0.05)\n\n# Modern Multi-Condition:\n=IFS(Score>=90, \"A\", Score>=80, \"B\", Score>=70, \"C\", TRUE, \"F\")\n=SWITCH(RegionCode, 1, \"North\", 2, \"South\", 3, \"East\", 4, \"West\", \"Unknown\")",
    "examples": [
      {
        "title": {
          "en": "Sales Performance Tiering with IFS",
          "vi": "Phân Hạng Doanh Số Bằng Hàm IFS"
        },
        "code": "Sales in cell B2\n\n=IFS(B2 >= 100000, \"Platinum Tier\",\n     B2 >= 50000,  \"Gold Tier\",\n     B2 >= 20000,  \"Silver Tier\",\n     TRUE,         \"Bronze Tier\")",
        "description": {
          "en": "Using TRUE as the final condition creates a universal fallback (catch-all) default result.",
          "vi": "Dùng TRUE làm điều kiện cuối cùng tạo ra một giá trị mặc định cho tất cả các trường hợp còn lại."
        }
      },
      {
        "title": {
          "en": "Country Code Mapping with SWITCH",
          "vi": "Chuyển Đổi Mã Quốc Gia Bằng SWITCH"
        },
        "code": "Country Code in cell A2: \"VN\"\n\n=SWITCH(A2, \"VN\", \"Vietnam\", \"US\", \"United States\", \"JP\", \"Japan\", \"Other\")",
        "description": {
          "en": "SWITCH cleanly evaluates exact string matches without repetitive logical operators.",
          "vi": "SWITCH so khớp chính xác chuỗi văn bản một cách gọn gàng không cần lặp lại các toán tử so sánh."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Writing =IF(A1 > 50 AND B1 > 50) using English syntax instead of Excel prefix syntax =IF(AND(A1>50, B1>50)).",
          "vi": "Viết =IF(A1 > 50 AND B1 > 50) theo ngữ pháp tiếng Anh thay vì cú pháp tiền tố Excel =IF(AND(A1>50, B1>50))."
        },
        "correction": {
          "en": "In Excel, logical operators are functions that wrap their arguments: =AND(A1>50, B1>50).",
          "vi": "Trong Excel, các toán tử logic là hàm bao bọc các đối số bên trong: =AND(A1>50, B1>50)."
        }
      },
      {
        "mistake": {
          "en": "Arranging conditions in ascending order in IFS (=IFS(B2>=20000, \"Silver\", B2>=100000, \"Platinum\")), which prematurely triggers Silver for a 150000 score.",
          "vi": "Sắp xếp điều kiện tăng dần trong IFS (=IFS(B2>=20000, \"Silver\", B2>=100000, \"Platinum\")), khiến mức 150000 bị dừng sớm ở Silver."
        },
        "correction": {
          "en": "When checking greater-than boundaries (>=), always order conditions descending from highest to lowest threshold.",
          "vi": "Khi kiểm tra điều kiện lớn hơn hoặc bằng (>=), luôn sắp xếp các ngưỡng theo thứ tự giảm dần từ cao xuống thấp."
        }
      }
    ],
    "tips": [
      {
        "en": "Catch-all Default in IFS: Always put TRUE, \"Default Value\" as the final condition-value pair in IFS to prevent #N/A errors when no condition matches.",
        "vi": "Giá trị mặc định trong IFS: Luôn đặt TRUE, \"Giá trị mặc định\" ở cặp điều kiện cuối cùng trong IFS để tránh lỗi #N/A khi không có điều kiện nào thỏa mãn."
      },
      {
        "en": "Comparison Operators: Excel supports = (equal), <> (not equal), > (greater), < (less), >= (greater or equal), <= (less or equal).",
        "vi": "Toán tử so sánh: Excel hỗ trợ = (bằng), <> (khác), > (lớn hơn), < (nhỏ hơn), >= (lớn hơn hoặc bằng), <= (nhỏ hơn hoặc bằng)."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l9_ex1",
      "type": "complete_code",
      "title": {
        "en": "Multi-Condition Discount Eligibility",
        "vi": "Xét Điều Kiện Đủ Tiêu Chuẩn Chiết Khấu"
      },
      "instruction": {
        "en": "Write an IF formula with AND to output \"Qualified\" if Sales in B2 >= 5000 AND Rating in C2 >= 4, otherwise output \"Standard\".",
        "vi": "Viết công thức IF kết hợp AND để xuất \"Qualified\" nếu Doanh số ở B2 >= 5000 VÀ Đánh giá ở C2 >= 4, ngược lại xuất \"Standard\"."
      },
      "starterCode": "=IF(AND(",
      "solutionCode": "=IF(AND(B2>=5000, C2>=4), \"Qualified\", \"Standard\")",
      "expectedOutput": "=IF(AND(B2>=5000, C2>=4), \"Qualified\", \"Standard\")",
      "hint": {
        "en": "Combine B2>=5000 and C2>=4 inside AND().",
        "vi": "Kết hợp B2>=5000 và C2>=4 bên trong hàm AND()."
      },
      "explanation": {
        "en": "AND requires both conditions to be TRUE before IF returns \"Qualified\".",
        "vi": "AND yêu cầu cả hai điều kiện đều phải TRUE thì IF mới trả về \"Qualified\"."
      }
    },
    {
      "id": "excel_l9_ex2",
      "type": "complete_code",
      "title": {
        "en": "Grade Determination with IFS",
        "vi": "Xếp Loại Điểm Số Bằng IFS"
      },
      "instruction": {
        "en": "Write an IFS formula for score in A2: if >=90 return \"A\", if >=80 return \"B\", otherwise (TRUE) return \"Pass\".",
        "vi": "Viết công thức IFS cho điểm ở A2: nếu >=90 trả về \"A\", nếu >=80 trả về \"B\", ngược lại (TRUE) trả về \"Pass\"."
      },
      "starterCode": "=IFS(",
      "solutionCode": "=IFS(A2>=90, \"A\", A2>=80, \"B\", TRUE, \"Pass\")",
      "expectedOutput": "=IFS(A2>=90, \"A\", A2>=80, \"B\", TRUE, \"Pass\")",
      "hint": {
        "en": "Order from highest to lowest and end with TRUE, \"Pass\".",
        "vi": "Sắp xếp từ cao xuống thấp và kết thúc bằng TRUE, \"Pass\"."
      },
      "explanation": {
        "en": "IFS evaluates pairs in sequence and stops on the first matched condition.",
        "vi": "Hàm IFS đánh giá các cặp theo thứ tự và dừng lại ở điều kiện khớp đầu tiên."
      }
    }
  ],
  "challenge": {
    "id": "excel_l9_challenge",
    "title": {
      "en": "Construct Executive Commission Matrix",
      "vi": "Xây Dựng Ma Trận Tính Thưởng Hoa Hồng"
    },
    "description": {
      "en": "Construct a formula for commission rate in cell D2: If Sales in B2 > 100000 OR Department in C2 equals \"Enterprise\", grant 0.15 (15%), otherwise grant 0.05 (5%).",
      "vi": "Xây dựng công thức tính tỷ lệ hoa hồng ở ô D2: Nếu Doanh số ở B2 > 100000 HOẶC Phòng ban ở C2 bằng \"Enterprise\", thưởng 0.15 (15%), ngược lại thưởng 0.05 (5%)."
    },
    "requirements": [
      {
        "en": "Use IF with OR",
        "vi": "Sử dụng hàm IF kết hợp OR"
      },
      {
        "en": "Return numeric rates 0.15 and 0.05",
        "vi": "Trả về tỷ lệ số 0.15 và 0.05"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=IF(OR(B2>100000, C2=\"Enterprise\"), 0.15, 0.05)",
    "hints": [
      {
        "en": "Syntax: =IF(OR(B2>100000, C2=\"Enterprise\"), 0.15, 0.05)",
        "vi": "Cú pháp: =IF(OR(B2>100000, C2=\"Enterprise\"), 0.15, 0.05)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l9_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the output of `=AND(5 > 2, 10 < 20, 3 = 4)`?",
        "vi": "Kết quả của công thức `=AND(5 > 2, 10 < 20, 3 = 4)` là gì?"
      },
      "options": [
        {
          "en": "FALSE (because 3 = 4 is false)",
          "vi": "FALSE (vì 3 = 4 là sai)"
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
          "en": "2",
          "vi": "2"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "AND requires every single condition to be true. Since 3 = 4 is false, AND returns FALSE.",
        "vi": "Hàm AND yêu cầu mọi điều kiện đều phải đúng. Vì 3 = 4 là sai nên AND trả về FALSE."
      },
      "difficulty": "easy",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q2",
      "type": "single_choice",
      "question": {
        "en": "What is the advantage of the `IFS` function over nested `IF` statements?",
        "vi": "Ưu điểm của hàm `IFS` so với nhiều câu lệnh `IF` lồng nhau là gì?"
      },
      "options": [
        {
          "en": "Eliminates deeply nested closing parentheses by testing sequential condition-value pairs in a single function",
          "vi": "Loại bỏ các dấu ngoặc đóng lồng nhau phức tạp bằng cách kiểm tra tuần tự các cặp điều kiện-giá trị trong một hàm duy nhất"
        },
        {
          "en": "IFS only works with numbers",
          "vi": "IFS chỉ hoạt động với số"
        },
        {
          "en": "IFS runs 100x faster than any other function",
          "vi": "IFS chạy nhanh hơn 100 lần so với bất kỳ hàm nào khác"
        },
        {
          "en": "IFS converts text to dates automatically",
          "vi": "IFS tự động chuyển văn bản thành ngày tháng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "IFS allows testing up to 127 condition-result pairs in a clean, flat list without nesting multiple IF() statements.",
        "vi": "IFS cho phép kiểm tra tối đa 127 cặp điều kiện-kết quả trong một danh sách phẳng rõ ràng mà không cần lồng nhiều lệnh IF()."
      },
      "difficulty": "easy",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q3",
      "type": "single_choice",
      "question": {
        "en": "What operator in Excel represents \"not equal to\"?",
        "vi": "Toán tử nào trong Excel biểu thị phép so sánh \"không bằng\" (khác)?"
      },
      "options": [
        {
          "en": "<>",
          "vi": "<>"
        },
        {
          "en": "!=",
          "vi": "!="
        },
        {
          "en": "!==",
          "vi": "!=="
        },
        {
          "en": "NOT =",
          "vi": "NOT ="
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Excel uses the <> (less than followed by greater than) symbol for the not-equal comparison operator.",
        "vi": "Excel sử dụng ký hiệu <> (dấu nhỏ hơn đứng trước dấu lớn hơn) cho toán tử so sánh khác."
      },
      "difficulty": "easy",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q4",
      "type": "single_choice",
      "question": {
        "en": "What does the function `=SWITCH(A1, 1, \"Bronze\", 2, \"Silver\", 3, \"Gold\", \"Standard\")` return if cell A1 contains `2`?",
        "vi": "Hàm `=SWITCH(A1, 1, \"Bronze\", 2, \"Silver\", 3, \"Gold\", \"Standard\")` trả về kết quả gì nếu ô A1 chứa số `2`?"
      },
      "options": [
        {
          "en": "\"Silver\"",
          "vi": "\"Silver\""
        },
        {
          "en": "\"Bronze\"",
          "vi": "\"Bronze\""
        },
        {
          "en": "\"Gold\"",
          "vi": "\"Gold\""
        },
        {
          "en": "\"Standard\"",
          "vi": "\"Standard\""
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "SWITCH matches A1 against value 2 and returns the associated result \"Silver\".",
        "vi": "Hàm SWITCH so khớp A1 với giá trị 2 và trả về kết quả tương ứng là \"Silver\"."
      },
      "difficulty": "easy",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q5",
      "type": "single_choice",
      "question": {
        "en": "What does `=OR(2 > 5, 10 = 10, 4 < 1)` return?",
        "vi": "Công thức `=OR(2 > 5, 10 = 10, 4 < 1)` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "TRUE (because 10 = 10 is true)",
          "vi": "TRUE (vì 10 = 10 là đúng)"
        },
        {
          "en": "FALSE",
          "vi": "FALSE"
        },
        {
          "en": "10",
          "vi": "10"
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
        "en": "OR returns TRUE if at least one argument evaluates to TRUE.",
        "vi": "Hàm OR trả về TRUE nếu có ít nhất một đối số cho kết quả TRUE."
      },
      "difficulty": "easy",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q6",
      "type": "single_choice",
      "question": {
        "en": "In an `IFS` formula testing numerical score brackets (>=90, >=80, >=70), why must tests be written in descending order?",
        "vi": "Trong công thức `IFS` kiểm tra các khung điểm số (>=90, >=80, >=70), tại sao các phép kiểm tra phải được viết theo thứ tự giảm dần?"
      },
      "options": [
        {
          "en": "Because IFS evaluates from left to right and stops on the FIRST true condition",
          "vi": "Vì IFS đánh giá từ trái sang phải và dừng lại ở điều kiện đúng ĐẦU TIÊN"
        },
        {
          "en": "Because Excel cannot sort numbers",
          "vi": "Vì Excel không thể sắp xếp số"
        },
        {
          "en": "Descending order uses less memory",
          "vi": "Thứ tự giảm dần tốn ít bộ nhớ hơn"
        },
        {
          "en": "There is no requirement to order conditions",
          "vi": "Không có yêu cầu bắt buộc nào về thứ tự điều kiện"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "If >=70 came first, a score of 95 would match >=70 immediately and return the lower grade before ever reaching >=90.",
        "vi": "Nếu >=70 đứng trước, điểm 95 sẽ thỏa mãn >=70 ngay lập tức và trả về loại thấp hơn trước khi kịp xét đến >=90."
      },
      "difficulty": "medium",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q7",
      "type": "single_choice",
      "question": {
        "en": "What does `=NOT(5 > 10)` return?",
        "vi": "Công thức `=NOT(5 > 10)` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "TRUE (5 > 10 is false, and NOT inverts it to TRUE)",
          "vi": "TRUE (5 > 10 là sai, và NOT đảo ngược nó thành TRUE)"
        },
        {
          "en": "FALSE",
          "vi": "FALSE"
        },
        {
          "en": "-5",
          "vi": "-5"
        },
        {
          "en": "#N/A",
          "vi": "#N/A"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "5 > 10 evaluates to FALSE. The NOT function reverses FALSE into TRUE.",
        "vi": "5 > 10 cho kết quả FALSE. Hàm NOT đảo ngược FALSE thành TRUE."
      },
      "difficulty": "easy",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q8",
      "type": "true_false",
      "question": {
        "en": "True or False: If no conditions in an `IFS` formula evaluate to TRUE, and no default TRUE fallback is supplied, Excel returns the `#N/A` error.",
        "vi": "Đúng hay Sai: Nếu không có điều kiện nào trong công thức `IFS` cho kết quả TRUE và không có nhánh mặc định TRUE cuối cùng, Excel sẽ trả về lỗi `#N/A`."
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
        "en": "True. When all IFS conditions are false without a catch-all, Excel raises #N/A.",
        "vi": "Đúng. Khi tất cả các điều kiện trong IFS đều sai mà không có điều kiện bao quát, Excel sẽ báo lỗi #N/A."
      },
      "difficulty": "medium",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q9",
      "type": "single_choice",
      "question": {
        "en": "How do you test if cell A1 contains either \"Manager\" or \"Director\" AND has bonus > 1000 in a single IF statement?",
        "vi": "Làm thế nào để kiểm tra xem ô A1 có chứa \"Manager\" hoặc \"Director\" VÀ có tiền thưởng > 1000 trong một câu lệnh IF duy nhất?"
      },
      "options": [
        {
          "en": "=IF(AND(OR(A1=\"Manager\", A1=\"Director\"), B1>1000), \"Approved\", \"Denied\")",
          "vi": "=IF(AND(OR(A1=\"Manager\", A1=\"Director\"), B1>1000), \"Approved\", \"Denied\")"
        },
        {
          "en": "=IF(OR(A1=\"Manager\", A1=\"Director\" AND B1>1000), \"Approved\", \"Denied\")",
          "vi": "=IF(OR(A1=\"Manager\", A1=\"Director\" AND B1>1000), \"Approved\", \"Denied\")"
        },
        {
          "en": "=IF(A1=\"Manager\" OR \"Director\" AND B1>1000, \"Approved\", \"Denied\")",
          "vi": "=IF(A1=\"Manager\" OR \"Director\" AND B1>1000, \"Approved\", \"Denied\")"
        },
        {
          "en": "=IF(AND(A1=\"Manager\", A1=\"Director\", B1>1000), \"Approved\", \"Denied\")",
          "vi": "=IF(AND(A1=\"Manager\", A1=\"Director\", B1>1000), \"Approved\", \"Denied\")"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Nesting the OR function inside AND correctly groups the title check while requiring bonus B1 > 1000.",
        "vi": "Lồng hàm OR bên trong AND sẽ nhóm điều kiện chức vụ một cách chính xác trong khi vẫn bắt buộc tiền thưởng B1 > 1000."
      },
      "difficulty": "hard",
      "topicId": "excel_logic"
    },
    {
      "id": "excel_l9_q10",
      "type": "single_choice",
      "question": {
        "en": "What is the result of `=IF(10 > 5, \"Yes\")` when the condition is TRUE and value_if_false is omitted?",
        "vi": "Kết quả của `=IF(10 > 5, \"Yes\")` là gì khi điều kiện là TRUE và đối số value_if_false bị bỏ qua?"
      },
      "options": [
        {
          "en": "\"Yes\"",
          "vi": "\"Yes\""
        },
        {
          "en": "TRUE",
          "vi": "TRUE"
        },
        {
          "en": "0",
          "vi": "0"
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
        "en": "Since the condition 10 > 5 is TRUE, the formula returns the value_if_true argument, which is \"Yes\".",
        "vi": "Vì điều kiện 10 > 5 là TRUE, công thức trả về đối số khi đúng là \"Yes\"."
      },
      "difficulty": "easy",
      "topicId": "excel_logic"
    }
  ]
};
export default lesson09;
