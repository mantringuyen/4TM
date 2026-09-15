import { Lesson } from '../../../../types';

export const lesson11: Lesson = {
  "id": "excel_lesson_11",
  "order": 11,
  "moduleId": "excel_mod_3",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_lookups",
  "title": {
    "en": "Classic Lookup & Reference: VLOOKUP, HLOOKUP, INDEX & MATCH",
    "vi": "Tra Cứu & Tham Chiếu Cổ Điển: VLOOKUP, HLOOKUP, INDEX & MATCH"
  },
  "summary": {
    "en": "Master foundational table relational lookups: exact vs approximate VLOOKUP, horizontal HLOOKUP, and the indestructible INDEX/MATCH duo that overcomes left-lookup limitations and column insertion fragility.",
    "vi": "Làm chủ các phép tra cứu quan hệ bảng nền tảng: VLOOKUP chính xác vs xấp xỉ, HLOOKUP theo chiều ngang và bộ đôi bất khả chiến bại INDEX/MATCH khắc phục giới hạn tra cứu sang trái và lỗi khi chèn thêm cột."
  },
  "learn": {
    "introduction": {
      "en": "Relational data lookup is the cornerstone of spreadsheet architecture. When an order ID or employee number is entered, lookup formulas search master dimension tables to retrieve product descriptions, unit prices, or manager email addresses without manual copy-pasting.",
      "vi": "Tra cứu dữ liệu quan hệ là nền tảng của kiến trúc bảng tính. Khi nhập mã đơn hàng hoặc mã nhân viên, các hàm tra cứu sẽ tìm kiếm trên các bảng danh mục chính để lấy mô tả sản phẩm, đơn giá hoặc địa chỉ email quản lý mà không cần sao chép thủ công."
    },
    "conceptExplanation": {
      "en": "### 1. VLOOKUP Mechanics & Limitations\n- **Syntax**: `=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`\n- **Exact Match**: Always pass `FALSE` (or `0`) as the 4th argument.\n- **VLOOKUP Limitations**:\n  1. Lookup value MUST be in the far-left column (cannot look left).\n  2. Fragile: Inserting a new column between columns 1 and 3 breaks hardcoded `col_index_num`.\n  3. Slow on large workbooks because it indexes unnecessary columns.\n\n### 2. The INDEX & MATCH Power Couple\n- **`=MATCH(lookup_value, lookup_array, [match_type])`**: Searches a 1D vector and returns the numeric position index (1-based). Use `0` for exact match.\n- **`=INDEX(array, row_num, [col_num])`**: Returns the value at the intersection of specified row and column coordinates.\n- **Combined Pattern**:\n  `=INDEX(Return_Range, MATCH(lookup_value, Lookup_Range, 0))`\n  - Can look left, right, up, or down.\n  - Immune to column insertions and deletions!\n  - 2D Matrix Lookups: `=INDEX(Grid, MATCH(RowVal, RowHdr, 0), MATCH(ColVal, ColHdr, 0))`",
      "vi": "### 1. Cơ Chế & Giới Hạn Của VLOOKUP\n- **Cú pháp**: `=VLOOKUP(gia_tri_tim, bang_du_lieu, so_thu_tu_cot, [kieu_tim])`\n- **Khớp chính xác**: Luôn truyền `FALSE` (hoặc `0`) vào đối số thứ 4.\n- **Các giới hạn của VLOOKUP**:\n  1. Cột chứa giá trị tìm kiếm PHẢI nằm ở cột tận cùng bên trái (không thể tra cứu sang bên trái).\n  2. Dễ bị hỏng: Khi chèn thêm cột mới vào giữa bảng làm sai lệch số thứ tự cột `so_thu_tu_cot` đã gõ cứng.\n  3. Chậm trên file lớn vì phải đọc cả các cột không cần thiết.\n\n### 2. Cặp Đôi Sức Mạnh INDEX & MATCH\n- **`=MATCH(gia_tri_tim, vung_tim, [kieu_khop])`**: Tìm kiếm trong mảng 1 chiều và trả về vị trí số thứ tự (bắt đầu từ 1). Dùng `0` để khớp chính xác.\n- **`=INDEX(vung_ket_qua, vi_tri_hang, [vi_tri_cot])`**: Trả về giá trị tại giao điểm tọa độ hàng và cột.\n- **Mô hình kết hợp chuẩn**:\n  `=INDEX(Vung_Can_Lay, MATCH(Gia_Tri_Tim, Vung_Tra_Cuu, 0))`\n  - Có thể tra cứu sang trái, phải, lên trên hoặc xuống dưới.\n  - Bền bỉ, không bị ảnh hưởng khi chèn thêm hay xóa cột!\n  - Tra cứu ma trận 2 chiều: `=INDEX(Bang_So, MATCH(Hang, Cot_Tieu_De, 0), MATCH(Cot, Hang_Tieu_De, 0))`"
    },
    "syntax": "# VLOOKUP (Exact Match):\n=VLOOKUP(lookup_value, table_array, col_index_num, FALSE)\n\n# INDEX / MATCH (Left-Lookup & Insertion Proof):\n=INDEX(Return_Column, MATCH(lookup_value, Lookup_Column, 0))\n\n# 2D Matrix Dual-Lookup:\n=INDEX(Data_Grid, MATCH(row_val, Row_Header_Col, 0), MATCH(col_val, Col_Header_Row, 0))",
    "examples": [
      {
        "title": {
          "en": "Exact Match Price Retrieval with VLOOKUP",
          "vi": "Lấy Đơn Giá Khớp Chính Xác Bằng VLOOKUP"
        },
        "code": "Product Master Table in A2:C50 (Col A: ProductID, Col B: Name, Col C: Price)\nTarget: Look up price for ProductID in cell F2\n\nFormula in G2: =VLOOKUP(F2, $A$2:$C$50, 3, FALSE)",
        "description": {
          "en": "Col index 3 retrieves the Price column. FALSE ensures exact alphanumeric code matching.",
          "vi": "Chỉ số cột 3 lấy cột Đơn giá. FALSE đảm bảo tìm khớp chính xác mã sản phẩm."
        }
      },
      {
        "title": {
          "en": "Left-Lookup Customer Name with INDEX / MATCH",
          "vi": "Tra Cứu Tên Khách Hàng Sang Bên Trái Bằng INDEX / MATCH"
        },
        "code": "Customer Master in A2:C100 (Col A: FullName, Col B: City, Col C: CustomerID)\nTarget: Look up FullName in Col A using CustomerID from Col C (Left-Lookup!)\n\nFormula: =INDEX($A$2:$A$100, MATCH(F2, $C$2:$C$100, 0))",
        "description": {
          "en": "MATCH finds row number in Col C, and INDEX extracts corresponding name from Col A (impossible with VLOOKUP).",
          "vi": "MATCH tìm số thứ tự dòng ở Cột C và INDEX trích xuất tên tương ứng ở Cột A (điều mà VLOOKUP không thể làm được)."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Omitting the 4th argument in VLOOKUP (=VLOOKUP(A1, Table, 2)), which defaults to TRUE (Approximate Match) and returns incorrect data.",
          "vi": "Bỏ quên đối số thứ 4 trong VLOOKUP (=VLOOKUP(A1, Table, 2)), khiến Excel mặc định là TRUE (Khớp xấp xỉ) và trả về dữ liệu sai."
        },
        "correction": {
          "en": "Always explicitly provide FALSE (or 0) for exact lookups.",
          "vi": "Luôn luôn cung cấp rõ ràng FALSE (hoặc 0) cho các phép tra cứu chính xác."
        }
      },
      {
        "mistake": {
          "en": "Providing different height ranges in INDEX and MATCH (e.g. INDEX(A2:A100) with MATCH(F1, C1:C100, 0)), causing an offset row error.",
          "vi": "Cung cấp độ dài hàng khác nhau giữa INDEX và MATCH (ví dụ INDEX(A2:A100) nhưng MATCH(F1, C1:C100, 0)), gây lệch hàng."
        },
        "correction": {
          "en": "Ensure both INDEX return range and MATCH lookup range start and end on the exact same row numbers.",
          "vi": "Đảm bảo cả vùng trả về của INDEX và vùng tra cứu của MATCH đều bắt đầu và kết thúc ở cùng một số hàng."
        }
      }
    ],
    "tips": [
      {
        "en": "Immunity to Column Shifting: When building enterprise models, prefer INDEX/MATCH over VLOOKUP to prevent broken formulas when coworkers insert new columns.",
        "vi": "Tính bất biến khi chèn cột: Khi xây dựng mô hình doanh nghiệp, hãy ưu tiên INDEX/MATCH hơn VLOOKUP để tránh lỗi khi đồng nghiệp chèn thêm cột mới."
      },
      {
        "en": "Approximate Match Usage: Use TRUE in VLOOKUP only when looking up tax brackets or tiered bonus percentages where the first column is sorted in ascending order.",
        "vi": "Sử dụng khớp xấp xỉ: Chỉ dùng TRUE trong VLOOKUP khi tra cứu bậc thuế hoặc tỷ lệ thưởng theo khung điểm đã được sắp xếp tăng dần."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l11_ex1",
      "type": "complete_code",
      "title": {
        "en": "Exact VLOOKUP for Product Category",
        "vi": "Tra Cứu Chính Xác Danh Mục Sản Phẩm Bằng VLOOKUP"
      },
      "instruction": {
        "en": "Write a VLOOKUP formula to retrieve the category in Column 2 from master table $A$2:$C$100 for ProductID in cell F2 using exact match.",
        "vi": "Viết công thức VLOOKUP để lấy danh mục ở Cột 2 từ bảng danh mục $A$2:$C$100 cho ProductID ở ô F2 với kiểu khớp chính xác."
      },
      "starterCode": "=VLOOKUP(F2, $A$2:$C$100, ",
      "solutionCode": "=VLOOKUP(F2, $A$2:$C$100, 2, FALSE)",
      "expectedOutput": "=VLOOKUP(F2, $A$2:$C$100, 2, FALSE)",
      "hint": {
        "en": "Column index is 2 and range_lookup is FALSE.",
        "vi": "Chỉ số cột là 2 và kiểu tìm kiếm là FALSE."
      },
      "explanation": {
        "en": "VLOOKUP searches column A for F2 and returns the value from column 2 on the matching row.",
        "vi": "VLOOKUP tìm F2 trong cột A và trả về giá trị từ cột thứ 2 trên hàng khớp."
      }
    },
    {
      "id": "excel_l11_ex2",
      "type": "complete_code",
      "title": {
        "en": "Left-Lookup Employee Name with INDEX & MATCH",
        "vi": "Tra Cứu Tên Nhân Viên Sang Trái Bằng INDEX & MATCH"
      },
      "instruction": {
        "en": "Write an INDEX/MATCH formula to look up Employee Name in $A$2:$A$50 based on Employee ID in cell E2 matched against $B$2:$B$50.",
        "vi": "Viết công thức INDEX/MATCH để tra cứu Tên nhân viên ở $A$2:$A$50 dựa trên Mã nhân viên ở ô E2 khớp với vùng $B$2:$B$50."
      },
      "starterCode": "=INDEX($A$2:$A$50, MATCH(",
      "solutionCode": "=INDEX($A$2:$A$50, MATCH(E2, $B$2:$B$50, 0))",
      "expectedOutput": "=INDEX($A$2:$A$50, MATCH(E2, $B$2:$B$50, 0))",
      "hint": {
        "en": "Nest MATCH(E2, $B$2:$B$50, 0) inside INDEX($A$2:$A$50, ...).",
        "vi": "Lồng MATCH(E2, $B$2:$B$50, 0) vào bên trong INDEX($A$2:$A$50, ...)."
      },
      "explanation": {
        "en": "INDEX/MATCH effortlessly performs a left-lookup from column B to column A.",
        "vi": "INDEX/MATCH thực hiện tra cứu sang trái từ cột B sang cột A một cách nhẹ nhàng."
      }
    }
  ],
  "challenge": {
    "id": "excel_l11_challenge",
    "title": {
      "en": "Two-Dimensional Matrix Grid Lookup",
      "vi": "Tra Cứu Lưới Ma Trận Hai Chiều"
    },
    "description": {
      "en": "Construct a 2D lookup formula for cell D15 that extracts the shipping rate from matrix data grid $B$2:$E$10, where origin city in cell A15 is matched against row headers in $A$2:$A$10 and destination code in cell B15 is matched against column headers in $B$1:$E$1.",
      "vi": "Xây dựng công thức tra cứu 2D cho ô D15 lấy cước vận chuyển từ ma trận $B$2:$E$10, trong đó thành phố gửi ở ô A15 khớp với tiêu đề hàng tại $A$2:$A$10 và mã đích đến ở ô B15 khớp với tiêu đề cột tại $B$1:$E$1."
    },
    "requirements": [
      {
        "en": "Use INDEX on grid $B$2:$E$10",
        "vi": "Sử dụng hàm INDEX trên lưới $B$2:$E$10"
      },
      {
        "en": "Use first MATCH for row header in $A$2:$A$10",
        "vi": "Dùng MATCH thứ nhất cho tiêu đề hàng tại $A$2:$A$10"
      },
      {
        "en": "Use second MATCH for column header in $B$1:$E$1",
        "vi": "Dùng MATCH thứ hai cho tiêu đề cột tại $B$1:$E$1"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=INDEX($B$2:$E$10, MATCH(A15, $A$2:$A$10, 0), MATCH(B15, $B$1:$E$1, 0))",
    "hints": [
      {
        "en": "Syntax: =INDEX(DataGrid, MATCH(RowVal, RowHeaders, 0), MATCH(ColVal, ColHeaders, 0))",
        "vi": "Cú pháp: =INDEX(BangSo, MATCH(GiaTriHang, TieuDeHang, 0), MATCH(GiaTriCot, TieuDeCot, 0))"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l11_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the primary architectural limitation of the `VLOOKUP` function?",
        "vi": "Hạn chế kiến trúc cốt lõi của hàm `VLOOKUP` là gì?"
      },
      "options": [
        {
          "en": "It cannot look to the left of the lookup column; the lookup key must be in the first column",
          "vi": "Nó không thể tra cứu sang bên trái cột tìm kiếm; khóa tìm kiếm bắt buộc phải nằm ở cột đầu tiên"
        },
        {
          "en": "It cannot search numbers",
          "vi": "Nó không thể tìm số"
        },
        {
          "en": "It only works on Mondays",
          "vi": "Nó chỉ hoạt động vào Thứ Hai"
        },
        {
          "en": "It requires macros to run",
          "vi": "Nó yêu cầu macro để chạy"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "VLOOKUP can only return data from columns to the right of the lookup column.",
        "vi": "VLOOKUP chỉ có thể trả về dữ liệu từ các cột nằm ở bên phải của cột tra cứu."
      },
      "difficulty": "easy",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q2",
      "type": "single_choice",
      "question": {
        "en": "What value must be entered for the 4th argument of VLOOKUP (`[range_lookup]`) to guarantee an exact match?",
        "vi": "Giá trị nào phải được nhập cho đối số thứ 4 của VLOOKUP (`[range_lookup]`) để đảm bảo khớp chính xác?"
      },
      "options": [
        {
          "en": "FALSE (or 0)",
          "vi": "FALSE (hoặc 0)"
        },
        {
          "en": "TRUE (or 1)",
          "vi": "TRUE (hoặc 1)"
        },
        {
          "en": "\"EXACT\"",
          "vi": "\"EXACT\""
        },
        {
          "en": "NULL",
          "vi": "NULL"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Passing FALSE (or 0) instructs Excel to seek an exact match and return #N/A if not found.",
        "vi": "Truyền FALSE (hoặc 0) yêu cầu Excel tìm kiếm khớp chính xác và báo lỗi #N/A nếu không tìm thấy."
      },
      "difficulty": "easy",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q3",
      "type": "single_choice",
      "question": {
        "en": "What does the `MATCH` function return in Excel?",
        "vi": "Hàm `MATCH` trong Excel trả về giá trị gì?"
      },
      "options": [
        {
          "en": "The relative numeric position (1-based index) of the item within the array",
          "vi": "Vị trí số thứ tự tương đối (chỉ số bắt đầu từ 1) của phần tử trong mảng"
        },
        {
          "en": "The actual text inside the matching cell",
          "vi": "Văn bản thực tế bên trong ô khớp"
        },
        {
          "en": "TRUE or FALSE",
          "vi": "TRUE hoặc FALSE"
        },
        {
          "en": "The total sum of matching cells",
          "vi": "Tổng giá trị các ô khớp"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "MATCH returns a numeric index indicating which row or column position the lookup value occupies.",
        "vi": "Hàm MATCH trả về chỉ số dạng số cho biết giá trị cần tìm nằm ở vị trí hàng hoặc cột thứ mấy."
      },
      "difficulty": "easy",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q4",
      "type": "single_choice",
      "question": {
        "en": "Why is `INDEX/MATCH` considered superior to `VLOOKUP` for financial modeling?",
        "vi": "Tại sao `INDEX/MATCH` được coi là vượt trội hơn `VLOOKUP` trong mô hình hóa tài chính?"
      },
      "options": [
        {
          "en": "It is resilient to inserted/deleted columns and can look left, right, vertically, and horizontally",
          "vi": "Nó không bị ảnh hưởng khi chèn/xóa cột và có thể tra cứu sang trái, phải, dọc và ngang"
        },
        {
          "en": "It automatically formats cells to currency",
          "vi": "Nó tự động định dạng ô sang tiền tệ"
        },
        {
          "en": "It uses 50% less RAM",
          "vi": "Nó sử dụng ít hơn 50% RAM"
        },
        {
          "en": "It is shorter to type",
          "vi": "Nó ngắn hơn khi gõ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because INDEX/MATCH references specific ranges directly rather than hardcoded column numbers (e.g. 3), inserting columns never breaks formulas.",
        "vi": "Vì INDEX/MATCH tham chiếu trực tiếp các dải ô thay vì số thứ tự cột cố định (ví dụ 3), việc chèn thêm cột không bao giờ làm hỏng công thức."
      },
      "difficulty": "medium",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q5",
      "type": "single_choice",
      "question": {
        "en": "What does the function `=HLOOKUP` do compared to `=VLOOKUP`?",
        "vi": "Hàm `=HLOOKUP` làm gì so với hàm `=VLOOKUP`?"
      },
      "options": [
        {
          "en": "Searches horizontally across the first ROW of a table and retrieves a value from a specified row below it",
          "vi": "Tìm kiếm theo chiều ngang trên HÀNG đầu tiên của bảng và lấy giá trị từ một hàng chỉ định bên dưới"
        },
        {
          "en": "Searches vertically down columns",
          "vi": "Tìm kiếm theo chiều dọc xuống các cột"
        },
        {
          "en": "Looks up hyperlinks",
          "vi": "Tra cứu các liên kết siêu văn bản"
        },
        {
          "en": "Sorts rows alphabetically",
          "vi": "Sắp xếp các hàng theo bảng chữ cái"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "HLOOKUP is horizontal: it searches across top row headers and extracts from a row index.",
        "vi": "HLOOKUP tìm kiếm theo chiều ngang: nó duyệt qua các tiêu đề hàng trên cùng và trích xuất từ chỉ số hàng."
      },
      "difficulty": "easy",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q6",
      "type": "single_choice",
      "question": {
        "en": "What does `=MATCH(\"Laptop\", {\"Phone\", \"Tablet\", \"Laptop\", \"Monitor\"}, 0)` return?",
        "vi": "Công thức `=MATCH(\"Laptop\", {\"Phone\", \"Tablet\", \"Laptop\", \"Monitor\"}, 0)` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "3",
          "vi": "3"
        },
        {
          "en": "2",
          "vi": "2"
        },
        {
          "en": "\"Laptop\"",
          "vi": "\"Laptop\""
        },
        {
          "en": "TRUE",
          "vi": "TRUE"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "\"Laptop\" is the 3rd item in the array list, so MATCH returns 3.",
        "vi": "\"Laptop\" là phần tử thứ 3 trong danh sách mảng, vì vậy MATCH trả về 3."
      },
      "difficulty": "easy",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q7",
      "type": "single_choice",
      "question": {
        "en": "What error appears if `VLOOKUP` fails to find the lookup value in exact match mode (`FALSE`)?",
        "vi": "Lỗi nào xuất hiện nếu `VLOOKUP` không tìm thấy giá trị cần tìm ở chế độ khớp chính xác (`FALSE`)?"
      },
      "options": [
        {
          "en": "#N/A",
          "vi": "#N/A"
        },
        {
          "en": "#VALUE!",
          "vi": "#VALUE!"
        },
        {
          "en": "#REF!",
          "vi": "#REF!"
        },
        {
          "en": "#NULL!",
          "vi": "#NULL!"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "#N/A (\"Not Available\") is returned by lookup functions when a key does not exist in the target dataset.",
        "vi": "Lỗi #N/A (\"Không tìm thấy\") được trả về bởi các hàm tra cứu khi khóa tìm kiếm không tồn tại trong tập dữ liệu đích."
      },
      "difficulty": "easy",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q8",
      "type": "true_false",
      "question": {
        "en": "True or False: If duplicate matches exist in a dataset, `VLOOKUP` returns the FIRST matching row encountered from the top.",
        "vi": "Đúng hay Sai: Nếu có nhiều bản ghi trùng lặp trong tập dữ liệu, `VLOOKUP` sẽ trả về kết quả của dòng khớp ĐẦU TIÊN gặp phải từ trên xuống."
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
        "en": "True. VLOOKUP always stops at the very first match it finds scanning from top to bottom.",
        "vi": "Đúng. VLOOKUP luôn dừng lại ở bản ghi khớp đầu tiên mà nó tìm thấy khi quét từ trên xuống dưới."
      },
      "difficulty": "medium",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q9",
      "type": "single_choice",
      "question": {
        "en": "What does `match_type` value `0` represent in the `MATCH` function?",
        "vi": "Giá trị `match_type` bằng `0` biểu thị điều gì trong hàm `MATCH`?"
      },
      "options": [
        {
          "en": "Exact match (lookup array does not need to be sorted)",
          "vi": "Khớp chính xác (mảng tra cứu không cần sắp xếp)"
        },
        {
          "en": "Less than match (requires ascending sort)",
          "vi": "Khớp nhỏ hơn (yêu cầu sắp xếp tăng dần)"
        },
        {
          "en": "Greater than match (requires descending sort)",
          "vi": "Khớp lớn hơn (yêu cầu sắp xếp giảm dần)"
        },
        {
          "en": "Case-sensitive match",
          "vi": "Khớp phân biệt hoa thường"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "0 designates an exact match where elements can appear in any unsorted order.",
        "vi": "Số 0 chỉ định kiểu khớp chính xác trong đó các phần tử có thể xuất hiện theo thứ tự bất kỳ không cần sắp xếp."
      },
      "difficulty": "easy",
      "topicId": "excel_lookups"
    },
    {
      "id": "excel_l11_q10",
      "type": "single_choice",
      "question": {
        "en": "In `=INDEX(A1:D10, 4, 2)`, which cell in the worksheet is returned?",
        "vi": "Trong công thức `=INDEX(A1:D10, 4, 2)`, ô nào trong bảng tính được trả về?"
      },
      "options": [
        {
          "en": "B4 (Row 4, Column 2 of range A1:D10)",
          "vi": "B4 (Hàng 4, Cột 2 của vùng A1:D10)"
        },
        {
          "en": "D2",
          "vi": "D2"
        },
        {
          "en": "A4",
          "vi": "A4"
        },
        {
          "en": "B2",
          "vi": "B2"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Row 4 of range A1:D10 is row 4, and Column 2 is column B, pointing to cell B4.",
        "vi": "Hàng 4 của vùng A1:D10 là hàng 4, và Cột 2 là cột B, trỏ chính xác đến ô B4."
      },
      "difficulty": "easy",
      "topicId": "excel_lookups"
    }
  ]
};
export default lesson11;
