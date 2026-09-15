import { Lesson } from '../../../../types';

export const lesson12: Lesson = {
  "id": "excel_lesson_12",
  "order": 12,
  "moduleId": "excel_mod_3",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_xlookup",
  "title": {
    "en": "Modern Dynamic Lookup Engine: The Complete Power of XLOOKUP",
    "vi": "Bộ Công Cụ Tra Cứu Động Hiện Đại: Sức Mạnh Toàn Diện Của XLOOKUP"
  },
  "summary": {
    "en": "Master Microsoft 365's modern lookup successor: XLOOKUP. Default exact matching, native left-lookups, built-in [if_not_found] error handling, reverse bottom-to-top searches, binary search algorithms, and multi-column array returns.",
    "vi": "Làm chủ công cụ tra cứu kế thừa hiện đại trên Microsoft 365: XLOOKUP. Mặc định khớp chính xác, hỗ trợ tra cứu sang trái nguyên bản, tích hợp sẵn xử lý lỗi [if_not_found], tìm kiếm ngược từ dưới lên, thuật toán tìm nhị phân và trả về mảng nhiều cột đồng thời."
  },
  "learn": {
    "introduction": {
      "en": "Introduced to replace VLOOKUP, HLOOKUP, and INDEX/MATCH, XLOOKUP is the ultimate unified lookup function in modern Excel. It defaults to exact match, requires separate lookup and return arrays (making it completely immune to column insertions), features built-in error handling, and can search bottom-to-top to retrieve the latest transaction record.",
      "vi": "Được ra mắt để thay thế hoàn toàn VLOOKUP, HLOOKUP và INDEX/MATCH, XLOOKUP là hàm tra cứu hợp nhất tối thượng trong Excel hiện đại. Hàm mặc định khớp chính xác, tách biệt mảng tra cứu và mảng trả về (hoàn toàn không bị ảnh hưởng khi chèn cột), tích hợp sẵn xử lý lỗi và có thể tìm kiếm ngược từ dưới lên để lấy giao dịch mới nhất."
    },
    "conceptExplanation": {
      "en": "### 1. The XLOOKUP Signature\n`=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])`\n\n### 2. Key Advantages Over VLOOKUP\n1. **Defaults to Exact Match**: No more typing `, FALSE`!\n2. **Native Left-Lookup**: `lookup_array` and `return_array` can be in any position.\n3. **Built-in Error Handling**: Pass `[if_not_found]` (e.g. `\"Not Found\"`) to eliminate clumsy `IFERROR()` wrapping.\n4. **Search Bottom-to-Top**: Set `search_mode = -1` to search from the last row up (great for finding the most recent price or invoice).\n5. **Return Multiple Columns**: Pass a multi-column return array (`C2:E100`) to spill Name, City, and Salary simultaneously into adjacent cells!\n\n### 3. Match & Search Modes\n- **`match_mode`**: `0` (Exact - Default), `-1` (Exact or next smaller), `1` (Exact or next larger), `2` (Wildcard).\n- **`search_mode`**: `1` (First-to-last - Default), `-1` (Last-to-first / Reverse), `2` (Binary Ascending), `-2` (Binary Descending).",
      "vi": "### 1. Cấu Trúc Toàn Diện Của XLOOKUP\n`=XLOOKUP(gia_tri_tim, mang_tra_cuu, mang_tra_ve, [neu_khong_thay], [che_do_khop], [che_do_tim])`\n\n### 2. Các Ưu Điểm Vượt Trội So Với VLOOKUP\n1. **Mặc định Khớp Chính Xác**: Không cần phải nhớ gõ `, FALSE`!\n2. **Tra cứu sang trái nguyên bản**: `mang_tra_cuu` và `mang_tra_ve` có thể ở bất kỳ vị trí nào.\n3. **Tích hợp sẵn Xử lý lỗi**: Truyền đối số `[neu_khong_thay]` (ví dụ `\"Không tìm thấy\"`) giúp loại bỏ việc lồng hàm `IFERROR()`.\n4. **Tìm kiếm ngược từ dưới lên**: Đặt `che_do_tim = -1` để quét từ dòng cuối cùng lên trên (tuyệt vời để tìm giá hoặc hóa đơn mới nhất).\n5. **Trả về nhiều cột đồng thời**: Truyền dải ô trả về gồm nhiều cột (`C2:E100`) để tự động tràn (spill) Tên, Thành phố và Lương ra các ô liền kề!"
    },
    "syntax": "# Basic Exact XLOOKUP:\n=XLOOKUP(lookup_value, lookup_array, return_array)\n\n# Built-in Error Fallback:\n=XLOOKUP(A2, Products!$A$2:$A$100, Products!$C$2:$C$100, \"Product Not Found\")\n\n# Reverse Bottom-to-Top Lookup (Find Latest):\n=XLOOKUP(A2, Log!$A$2:$A$1000, Log!$B$2:$B$1000, \"No History\", 0, -1)",
    "examples": [
      {
        "title": {
          "en": "Look Up Most Recent Customer Purchase (Reverse Search)",
          "vi": "Tra Cứu Giao Dịch Mới Nhất Của Khách Hàng (Tìm Ngược)"
        },
        "code": "Sales Log in Sheet 'Log' with CustomerID in A2:A5000 and OrderTotal in D2:D5000\nTarget: Find the latest transaction total for Customer ID \"C902\"\n\nFormula: =XLOOKUP(\"C902\", Log!$A$2:$A$5000, Log!$D$2:$D$5000, \"No Orders\", 0, -1)",
        "description": {
          "en": "search_mode = -1 starts scanning from row 5000 upwards, instantly returning the latest transaction.",
          "vi": "search_mode = -1 bắt đầu quét từ dòng 5000 ngược lên trên, ngay lập tức trả về giao dịch gần nhất."
        }
      },
      {
        "title": {
          "en": "Multi-Column Spilling XLOOKUP",
          "vi": "XLOOKUP Tràn Dữ Liệu Nhiều Cột Cùng Lúc"
        },
        "code": "Employee Master in A2:D100 (Col A: ID, Col B: Name, Col C: Dept, Col D: Salary)\nTarget: Enter ID in F2 and return Name, Dept, and Salary in G2:I2 with one formula!\n\nFormula in G2: =XLOOKUP(F2, $A$2:$A$100, $B$2:$D$100, \"Missing\")",
        "description": {
          "en": "Passing B2:D100 as the return array spills all 3 columns across G2, H2, and I2 automatically.",
          "vi": "Truyền B2:D100 làm mảng trả về sẽ tự động tràn cả 3 cột qua các ô G2, H2 và I2."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Supplying unequal range sizes for lookup_array and return_array (e.g. A2:A100 vs B2:B50), resulting in a #VALUE! error.",
          "vi": "Cung cấp dải ô không cùng kích thước giữa mảng tìm kiếm và mảng trả về (ví dụ A2:A100 vs B2:B50), dẫn đến lỗi #VALUE!."
        },
        "correction": {
          "en": "Both arrays must span identical row counts.",
          "vi": "Cả hai mảng phải có cùng số lượng hàng chính xác."
        }
      }
    ],
    "tips": [
      {
        "en": "Wildcard Lookups: Set match_mode = 2 to allow asterisks (*) and question marks (?) in XLOOKUP queries.",
        "vi": "Tra cứu bằng ký tự đại diện: Đặt match_mode = 2 để sử dụng dấu sao (*) và dấu chấm hỏi (?) trong các truy vấn XLOOKUP."
      },
      {
        "en": "Horizontal Replacement: XLOOKUP works horizontally just as easily as vertically—just pass row vectors instead of column vectors.",
        "vi": "Thay thế HLOOKUP: XLOOKUP hoạt động theo chiều ngang dễ dàng như chiều dọc—chỉ cần truyền các mảng hàng thay vì mảng cột."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l12_ex1",
      "type": "complete_code",
      "title": {
        "en": "Standard Clean XLOOKUP with Fallback",
        "vi": "Tra Cứu Chuẩn XLOOKUP Kèm Thông Báo Lỗi"
      },
      "instruction": {
        "en": "Write an XLOOKUP formula to look up ProductID in cell F2 against $A$2:$A$100 and return Price from $D$2:$D$100. If not found, return \"Item Not Found\".",
        "vi": "Viết công thức XLOOKUP tra cứu ProductID ở ô F2 trong $A$2:$A$100 và trả về Đơn giá từ $D$2:$D$100. Nếu không thấy, trả về \"Item Not Found\"."
      },
      "starterCode": "=XLOOKUP(F2, $A$2:$A$100, $D$2:$D$100, ",
      "solutionCode": "=XLOOKUP(F2, $A$2:$A$100, $D$2:$D$100, \"Item Not Found\")",
      "expectedOutput": "=XLOOKUP(F2, $A$2:$A$100, $D$2:$D$100, \"Item Not Found\")",
      "hint": {
        "en": "Pass \"Item Not Found\" as the 4th argument.",
        "vi": "Truyền \"Item Not Found\" vào đối số thứ 4."
      },
      "explanation": {
        "en": "XLOOKUP handles missing values directly via the 4th if_not_found parameter.",
        "vi": "XLOOKUP xử lý các giá trị không tìm thấy trực tiếp qua tham số thứ 4 if_not_found."
      }
    },
    {
      "id": "excel_l12_ex2",
      "type": "complete_code",
      "title": {
        "en": "Reverse Search for Most Recent Status",
        "vi": "Tìm Kiếm Ngược Lấy Trạng Thái Mới Nhất"
      },
      "instruction": {
        "en": "Write an XLOOKUP formula to find Account ID in cell A2 within Log!$A$2:$A$1000 and return Status from Log!$C$2:$C$1000 searching bottom-to-top (search_mode = -1).",
        "vi": "Viết công thức XLOOKUP tìm Mã tài khoản ở ô A2 trong Log!$A$2:$A$1000 và trả về Trạng thái từ Log!$C$2:$C$1000 theo chiều từ dưới lên (search_mode = -1)."
      },
      "starterCode": "=XLOOKUP(A2, Log!$A$2:$A$1000, Log!$C$2:$C$1000, \"None\", 0, ",
      "solutionCode": "=XLOOKUP(A2, Log!$A$2:$A$1000, Log!$C$2:$C$1000, \"None\", 0, -1)",
      "expectedOutput": "=XLOOKUP(A2, Log!$A$2:$A$1000, Log!$C$2:$C$1000, \"None\", 0, -1)",
      "hint": {
        "en": "Use -1 for search_mode.",
        "vi": "Dùng -1 cho tham số search_mode."
      },
      "explanation": {
        "en": "Setting search_mode to -1 searches from the last item to the first.",
        "vi": "Đặt search_mode thành -1 sẽ tìm kiếm từ bản ghi cuối cùng lên bản ghi đầu tiên."
      }
    }
  ],
  "challenge": {
    "id": "excel_l12_challenge",
    "title": {
      "en": "Implement Two-Way Dynamic Matrix XLOOKUP",
      "vi": "Triển Khai XLOOKUP Ma Trận Động Hai Chiều"
    },
    "description": {
      "en": "Construct a two-way nested XLOOKUP formula for cell D2 that looks up the row employee in cell A2 against $A$5:$A$20 and the column quarter in cell B2 against $B$4:$E$4 across matrix grid $B$5:$E$20.",
      "vi": "Xây dựng công thức XLOOKUP lồng 2 chiều cho ô D2 tra cứu nhân viên ở ô A2 trong $A$5:$A$20 và quý ở ô B2 trong $B$4:$E$4 trên bảng ma trận $B$5:$E$20."
    },
    "requirements": [
      {
        "en": "Use outer XLOOKUP to match column quarter",
        "vi": "Dùng XLOOKUP bên ngoài để khớp quý ở cột"
      },
      {
        "en": "Nest inner XLOOKUP to match row employee",
        "vi": "Lồng XLOOKUP bên trong để khớp nhân viên ở hàng"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=XLOOKUP(B2, $B$4:$E$4, XLOOKUP(A2, $A$5:$A$20, $B$5:$E$20))",
    "hints": [
      {
        "en": "Syntax: =XLOOKUP(Quarter, QuarterHeaders, XLOOKUP(Employee, EmployeeList, DataGrid))",
        "vi": "Cú pháp: =XLOOKUP(Quy, DanhSachQuy, XLOOKUP(NhanVien, DanhSachNhanVien, BangMaTran))"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l12_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the default match mode of `XLOOKUP` if the match_mode argument is omitted?",
        "vi": "Chế độ so khớp mặc định của `XLOOKUP` nếu bỏ qua đối số match_mode là gì?"
      },
      "options": [
        {
          "en": "Exact Match (0)",
          "vi": "Khớp chính xác (0)"
        },
        {
          "en": "Approximate Match (1)",
          "vi": "Khớp xấp xỉ (1)"
        },
        {
          "en": "Wildcard Match (2)",
          "vi": "Khớp ký tự đại diện (2)"
        },
        {
          "en": "Binary Search",
          "vi": "Tìm kiếm nhị phân"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Unlike VLOOKUP which defaults to approximate, XLOOKUP defaults to Exact Match (0).",
        "vi": "Khác với VLOOKUP mặc định là xấp xỉ, XLOOKUP mặc định là Khớp chính xác (0)."
      },
      "difficulty": "easy",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q2",
      "type": "single_choice",
      "question": {
        "en": "How do you perform a reverse lookup (search from bottom to top) in `XLOOKUP`?",
        "vi": "Làm thế nào để thực hiện tra cứu ngược (tìm từ dưới lên trên) trong hàm `XLOOKUP`?"
      },
      "options": [
        {
          "en": "Set `search_mode` to `-1`",
          "vi": "Đặt `search_mode` thành `-1`"
        },
        {
          "en": "Set `match_mode` to `-1`",
          "vi": "Đặt `match_mode` thành `-1`"
        },
        {
          "en": "Wrap with REVERSE()",
          "vi": "Bọc ngoài bằng REVERSE()"
        },
        {
          "en": "Sort the table first",
          "vi": "Sắp xếp lại bảng trước"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "search_mode = -1 instructs XLOOKUP to scan from the last item to the first item in the lookup array.",
        "vi": "search_mode = -1 hướng dẫn XLOOKUP quét từ phần tử cuối cùng lên phần tử đầu tiên trong mảng tra cứu."
      },
      "difficulty": "medium",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q3",
      "type": "single_choice",
      "question": {
        "en": "What argument in `XLOOKUP` replaces the need for an external `IFERROR()` function?",
        "vi": "Đối số nào trong `XLOOKUP` thay thế nhu cầu sử dụng hàm `IFERROR()` bọc bên ngoài?"
      },
      "options": [
        {
          "en": "`[if_not_found]` (the 4th argument)",
          "vi": "`[if_not_found]` (đối số thứ 4)"
        },
        {
          "en": "`[error_handler]`",
          "vi": "`[error_handler]`"
        },
        {
          "en": "`[default_value]`",
          "vi": "`[default_value]`"
        },
        {
          "en": "`[fallback]`",
          "vi": "`[fallback]`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The 4th argument [if_not_found] returns a custom text or fallback value if no match is discovered.",
        "vi": "Đối số thứ 4 [if_not_found] trả về văn bản tùy chỉnh hoặc giá trị dự phòng nếu không tìm thấy bản ghi khớp."
      },
      "difficulty": "easy",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q4",
      "type": "single_choice",
      "question": {
        "en": "Can `XLOOKUP` return values from a column located to the left of the lookup column?",
        "vi": "Hàm `XLOOKUP` có thể trả về các giá trị từ một cột nằm ở bên trái cột tra cứu không?"
      },
      "options": [
        {
          "en": "Yes, natively without any workarounds",
          "vi": "Có, hỗ trợ trực tiếp nguyên bản không cần đường vòng"
        },
        {
          "en": "No, only VLOOKUP can look left",
          "vi": "Không, chỉ có VLOOKUP mới tra cứu sang trái được"
        },
        {
          "en": "Only if cells are formatted as text",
          "vi": "Chỉ khi các ô được định dạng là văn bản"
        },
        {
          "en": "Only on Mac Excel",
          "vi": "Chỉ trên Excel dành cho Mac"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because lookup_array and return_array are completely separate arguments, XLOOKUP can look in any direction (left, right, up, down).",
        "vi": "Vì mảng tra cứu và mảng trả về là hai đối số hoàn toàn độc lập, XLOOKUP có thể tra cứu theo bất kỳ hướng nào (trái, phải, lên, xuống)."
      },
      "difficulty": "easy",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q5",
      "type": "single_choice",
      "question": {
        "en": "What happens when `return_array` is specified as a multi-column range like `B2:D100`?",
        "vi": "Điều gì xảy ra khi `return_array` được chỉ định là dải ô gồm nhiều cột như `B2:D100`?"
      },
      "options": [
        {
          "en": "XLOOKUP automatically spills all three columns into adjacent cells on the worksheet",
          "vi": "XLOOKUP tự động tràn dữ liệu cả ba cột ra các ô liền kề trên trang tính"
        },
        {
          "en": "Excel returns a #SPILL! error immediately",
          "vi": "Excel báo lỗi #SPILL! ngay lập tức"
        },
        {
          "en": "It only returns the first column",
          "vi": "Nó chỉ trả về cột đầu tiên"
        },
        {
          "en": "It combines the columns into one string",
          "vi": "Nó gộp các cột thành một chuỗi duy nhất"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Modern Excel dynamic arrays spill multi-column return vectors into neighboring columns automatically.",
        "vi": "Mảng động trong Excel hiện đại tự động tràn các vector kết quả nhiều cột sang các cột bên cạnh một cách tự động."
      },
      "difficulty": "medium",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q6",
      "type": "single_choice",
      "question": {
        "en": "What match_mode setting enables wildcard characters (`*`, `?`) in XLOOKUP?",
        "vi": "Cài đặt match_mode nào kích hoạt các ký tự đại diện (`*`, `?`) trong hàm XLOOKUP?"
      },
      "options": [
        {
          "en": "`2` (Wildcard match)",
          "vi": "`2` (Khớp ký tự đại diện)"
        },
        {
          "en": "`0` (Exact match)",
          "vi": "`0` (Khớp chính xác)"
        },
        {
          "en": "`-1`",
          "vi": "`-1`"
        },
        {
          "en": "`1`",
          "vi": "`1`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "match_mode = 2 activates wildcard evaluation for special pattern matching in XLOOKUP.",
        "vi": "match_mode = 2 kích hoạt việc đánh giá ký tự đại diện để so khớp mẫu đặc biệt trong XLOOKUP."
      },
      "difficulty": "medium",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q7",
      "type": "true_false",
      "question": {
        "en": "True or False: Inserting or deleting columns between the lookup array and the return array will break an XLOOKUP formula.",
        "vi": "Đúng hay Sai: Việc chèn thêm hoặc xóa các cột nằm giữa mảng tra cứu và mảng trả về sẽ làm hỏng công thức XLOOKUP."
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
        1
      ],
      "explanation": {
        "en": "False. XLOOKUP uses direct range references which adjust dynamically when columns are added or removed.",
        "vi": "Sai. XLOOKUP sử dụng các tham chiếu dải ô trực tiếp, tự động điều chỉnh linh hoạt khi các cột được thêm hoặc xóa."
      },
      "difficulty": "easy",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q8",
      "type": "single_choice",
      "question": {
        "en": "What does `match_mode` value `-1` do in `XLOOKUP`?",
        "vi": "Giá trị `match_mode` bằng `-1` làm nhiệm vụ gì trong hàm `XLOOKUP`?"
      },
      "options": [
        {
          "en": "Exact match, or if not found, returns the next smaller item",
          "vi": "Khớp chính xác, hoặc nếu không tìm thấy sẽ trả về phần tử nhỏ hơn tiếp theo"
        },
        {
          "en": "Exact match or next larger item",
          "vi": "Khớp chính xác hoặc phần tử lớn hơn tiếp theo"
        },
        {
          "en": "Searches backwards",
          "vi": "Tìm kiếm ngược"
        },
        {
          "en": "Returns the negative value",
          "vi": "Trả về giá trị âm"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "match_mode = -1 finds the exact value or falls back to the next smaller value (ideal for tax brackets).",
        "vi": "match_mode = -1 tìm giá trị chính xác hoặc lùi về giá trị nhỏ hơn liền kề (lý tưởng cho khung thuế)."
      },
      "difficulty": "medium",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q9",
      "type": "single_choice",
      "question": {
        "en": "Which Excel version first introduced native support for `XLOOKUP`?",
        "vi": "Phiên bản Excel nào lần đầu tiên ra mắt hỗ trợ nguyên bản cho hàm `XLOOKUP`?"
      },
      "options": [
        {
          "en": "Microsoft 365 and Excel 2021",
          "vi": "Microsoft 365 và Excel 2021"
        },
        {
          "en": "Excel 2010",
          "vi": "Excel 2010"
        },
        {
          "en": "Excel 2013",
          "vi": "Excel 2013"
        },
        {
          "en": "Excel 97",
          "vi": "Excel 97"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "XLOOKUP was introduced in Microsoft 365 (late 2019) and perpetual release Excel 2021.",
        "vi": "XLOOKUP được giới thiệu trong Microsoft 365 (cuối 2019) và bản vĩnh viễn Excel 2021."
      },
      "difficulty": "easy",
      "topicId": "excel_xlookup"
    },
    {
      "id": "excel_l12_q10",
      "type": "single_choice",
      "question": {
        "en": "How does XLOOKUP perform horizontal lookups across rows?",
        "vi": "Hàm XLOOKUP thực hiện tra cứu theo chiều ngang qua các hàng như thế nào?"
      },
      "options": [
        {
          "en": "By passing row vectors (e.g. A1:Z1 and A2:Z2) instead of column vectors",
          "vi": "Bằng cách truyền các mảng hàng (ví dụ A1:Z1 và A2:Z2) thay vì các mảng cột"
        },
        {
          "en": "By switching to HLOOKUP mode with a special flag",
          "vi": "Bằng cách chuyển sang chế độ HLOOKUP với cờ đặc biệt"
        },
        {
          "en": "It cannot perform horizontal lookups",
          "vi": "Nó không thể thực hiện tra cứu ngang"
        },
        {
          "en": "By rotating the screen",
          "vi": "Bằng cách xoay màn hình"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "XLOOKUP seamlessly adapts to horizontal orientations whenever row ranges are passed to lookup_array and return_array.",
        "vi": "XLOOKUP tự động thích ứng với chiều ngang bất cứ khi nào các dải ô hàng được truyền vào mảng tra cứu và mảng trả về."
      },
      "difficulty": "easy",
      "topicId": "excel_xlookup"
    }
  ]
};
export default lesson12;
