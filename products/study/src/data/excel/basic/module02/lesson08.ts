import { Lesson } from '../../../../types';

export const lesson08: Lesson = {
  "id": "excel_lesson_8",
  "order": 8,
  "moduleId": "excel_mod_2",
  "courseId": "excel",
  "levelId": "basic",
  "topicId": "excel_formatting",
  "title": {
    "en": "Conditional Formatting: Highlight Rules, Data Bars, Color Scales & Custom Formulas",
    "vi": "Định Dạng Có Điều Kiện: Quy Tắc Đánh Dấu, Data Bars, Color Scales & Công Thức Tùy Chỉnh"
  },
  "summary": {
    "en": "Transform raw data grids into intuitive visual management dashboards using preset highlight rules, gradient Data Bars, Heatmap Color Scales, Icon Sets, and advanced formula-based formatting with mixed cell locking ($C2>1000).",
    "vi": "Biến đổi bảng số liệu thô thành báo cáo quản trị trực quan sinh động bằng các quy tắc đánh dấu có sẵn, thanh Data Bars, bản đồ nhiệt Color Scales, Icon Sets và kỹ thuật định dạng bằng công thức nâng cao có khóa cột ($C2>1000)."
  },
  "learn": {
    "introduction": {
      "en": "Conditional formatting automatically changes the fill color, font style, or border of cells when specific data conditions are met. Rather than manually scanning 10,000 rows to find overdue accounts or negative profit margins, conditional formatting visually surfaces anomalies, trends, and top performers in real time.",
      "vi": "Định dạng có điều kiện (Conditional Formatting) tự động thay đổi màu nền, kiểu chữ hoặc đường viền của ô khi dữ liệu thỏa mãn điều kiện nhất định. Thay vì phải rà soát thủ công 10.000 dòng để tìm hóa đơn quá hạn hoặc biên lợi nhuận âm, tính năng này làm nổi bật ngay lập tức các điểm dị biệt, xu hướng và thành tích nổi bật theo thời gian thực."
    },
    "conceptExplanation": {
      "en": "### 1. Built-in Preset Formatting Rules\n- **Highlight Cells Rules**: Greater Than, Less Than, Between, Equal To, Text that Contains, A Date Occurring, Duplicate Values.\n- **Top/Bottom Rules**: Top 10 Items, Top 10%, Bottom 10 Items, Above Average, Below Average.\n- **Data Bars**: Mini horizontal bar charts directly inside cell backgrounds showing relative magnitudes.\n- **Color Scales (Heatmaps)**: 2-color or 3-color gradients (e.g. Green-Yellow-Red) highlighting low-to-high performance ranges.\n- **Icon Sets**: Traffic lights, arrows, flags, or checkmarks categorizing metrics into 3 to 5 statistical tiers.\n\n### 2. Formula-Based Conditional Formatting\nTo highlight an **entire table row** based on the value in a single column:\n1. Select the entire table data range: `A2:E100`\n2. New Rule -> \"Use a formula to determine which cells to format\"\n3. Enter formula with **Column-Locked Mixed Reference**:\n   `=$E2=\"Overdue\"` or `=$D2<0`\n4. Choose Format fill (e.g. soft red fill) and click OK.\n\nWhy the `$` sign matters: `$E2` locks evaluation strictly to column E while allowing the row index to evaluate row-by-row for every row in the table!",
      "vi": "### 1. Các Quy Tắc Định Dạng Có Sẵn\n- **Highlight Cells Rules**: Lớn hơn, Nhỏ hơn, Ở giữa, Bằng, Văn bản chứa, Ngày xuất hiện, Giá trị trùng lặp (Duplicate Values).\n- **Top/Bottom Rules**: Top 10 giá trị, Top 10%, 10 giá trị thấp nhất, Trên trung bình, Dưới trung bình.\n- **Data Bars**: Biểu đồ thanh mini trực tiếp trong nền ô thể hiện độ lớn tương đối.\n- **Color Scales (Heatmap)**: Dải màu chuyển tiếp 2 hoặc 3 màu (ví dụ Xanh-Vàng-Đỏ) thể hiện mức độ từ thấp đến cao.\n- **Icon Sets**: Đèn giao thông, mũi tên xu hướng, cờ hoặc dấu tích phân loại chỉ số thành 3 đến 5 nhóm.\n\n### 2. Định Dạng Có Điều Kiện Bằng Công Thức Tùy Chỉnh\nĐể tô màu **toàn bộ hàng** dựa trên giá trị của một cột duy nhất:\n1. Chọn toàn bộ vùng dữ liệu bảng: `A2:E100`\n2. Chọn New Rule -> \"Use a formula to determine which cells to format\"\n3. Nhập công thức với **Tham chiếu hỗn hợp khóa cột**:\n   `=$E2=\"Overdue\"` hoặc `=$D2<0`\n4. Chọn định dạng màu nền (ví dụ đỏ nhạt) và nhấn OK.\n\nÝ nghĩa dấu `$`: `$E2` khóa chặt việc kiểm tra điều kiện vào cột E trong khi cho phép chỉ số dòng tự động thay đổi từng hàng theo toàn bộ bảng!"
    },
    "syntax": "# Entire Row Highlight Formula (locked column):\n=$C2 > 1000000          -> Highlight rows with Revenue > $1M\n=$E2 = \"Critical\"       -> Highlight critical status rows\n=$D2 < TODAY()          -> Highlight past due milestone dates",
    "examples": [
      {
        "title": {
          "en": "Highlighting Overdue Invoices across Entire Rows",
          "vi": "Tô Màu Toàn Bộ Dòng Các Hóa Đơn Quá Hạn"
        },
        "code": "Data in A2:E50 (Col E has Status: \"Paid\", \"Pending\", \"Overdue\")\n\nApplies to: =$A$2:$E$50\nFormula: =$E2=\"Overdue\"\nFormat: Light Red Fill with Dark Red Text",
        "description": {
          "en": "Because column E is locked ($E2), every cell in columns A through E on that row checks column E and gets highlighted.",
          "vi": "Vì cột E được khóa ($E2), mọi ô từ cột A đến E trên hàng đó đều kiểm tra giá trị ở cột E và được tô màu."
        }
      },
      {
        "title": {
          "en": "Spotting Duplicate Account Numbers",
          "vi": "Phát Hiện Trùng Lặp Số Tài Khoản"
        },
        "code": "Account Numbers in A2:A500\nRule: Highlight Cells Rules -> Duplicate Values -> Red Fill",
        "description": {
          "en": "Instantly identifies data entry duplicates before saving or migrating customer databases.",
          "vi": "Phát hiện tức thì các bản ghi trùng lặp trước khi lưu hoặc chuyển đổi dữ liệu khách hàng."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forgetting the dollar sign in whole-row formatting (=E2=\"Overdue\" instead of =$E2=\"Overdue\"), causing only column E or shifted cells to highlight.",
          "vi": "Quên dấu đô la khi tô màu cả hàng (=E2=\"Overdue\" thay vì =$E2=\"Overdue\"), khiến chỉ có cột E hoặc các ô lệch vị trí được tô màu."
        },
        "correction": {
          "en": "Always lock the criteria column with a dollar sign: =$E2.",
          "vi": "Luôn khóa cột điều kiện bằng dấu đô la: =$E2."
        }
      },
      {
        "mistake": {
          "en": "Accumulating dozens of fragmented conditional formatting rules when copying and pasting cells repeatedly.",
          "vi": "Bị tích tụ hàng chục quy tắc định dạng trùng lặp phân mảnh khi sao chép và dán ô nhiều lần."
        },
        "correction": {
          "en": "Open Conditional Formatting -> Manage Rules regularly to audit and consolidate the \"Applies to\" ranges.",
          "vi": "Mở Conditional Formatting -> Manage Rules thường xuyên để kiểm tra và gộp gọn các vùng \"Applies to\"."
        }
      }
    ],
    "tips": [
      {
        "en": "Stop If True: In the Manage Rules dialog, check \"Stop If True\" to prevent subsequent lower-priority rules from overriding an already matched format.",
        "vi": "Tính năng Stop If True: Trong hộp thoại Manage Rules, tích vào \"Stop If True\" để ngăn các quy tắc ưu tiên thấp hơn ghi đè lên định dạng đã thỏa mãn."
      },
      {
        "en": "Data Bars Values Only: Check \"Show Bar Only\" in Data Bar rules to hide the numbers and show only pure visual progress bars inside cells.",
        "vi": "Chỉ hiện thanh Data Bars: Tích chọn \"Show Bar Only\" trong cài đặt Data Bar để ẩn các con số và chỉ hiển thị thanh tiến độ trực quan đẹp mắt."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l8_ex1",
      "type": "complete_code",
      "title": {
        "en": "Construct Whole-Row Highlight Formula for Low Stock",
        "vi": "Xây Dựng Công Thức Tô Màu Cả Hàng Cho Hàng Tồn Thấp"
      },
      "instruction": {
        "en": "Write the formula for a custom conditional formatting rule to highlight table rows where stock quantity in column D (starting row 2) is less than 10.",
        "vi": "Viết công thức cho quy tắc định dạng có điều kiện để tô màu các hàng trong bảng có số lượng tồn kho ở cột D (bắt đầu từ hàng 2) nhỏ hơn 10."
      },
      "starterCode": "=$D2",
      "solutionCode": "=$D2<10",
      "expectedOutput": "=$D2<10",
      "hint": {
        "en": "Lock column D with $ and check < 10.",
        "vi": "Khóa cột D bằng dấu $ và kiểm tra điều kiện < 10."
      },
      "explanation": {
        "en": "The formula =$D2<10 locks column D while testing each row independently.",
        "vi": "Công thức =$D2<10 khóa cột D trong khi kiểm tra từng hàng một cách độc lập."
      }
    },
    {
      "id": "excel_l8_ex2",
      "type": "complete_code",
      "title": {
        "en": "Highlight Past Due Invoice Dates",
        "vi": "Tô Màu Hạn Hóa Đơn Đã Quá Hạn"
      },
      "instruction": {
        "en": "Write the conditional formatting formula to identify if the due date in cell C2 is earlier than today's date (=TODAY()).",
        "vi": "Viết công thức định dạng có điều kiện để xác định xem ngày hạn ở ô C2 có sớm hơn ngày hôm nay (=TODAY()) hay không."
      },
      "starterCode": "=C2<",
      "solutionCode": "=C2<TODAY()",
      "expectedOutput": "=C2<TODAY()",
      "hint": {
        "en": "Compare C2 with TODAY().",
        "vi": "So sánh C2 với TODAY()."
      },
      "explanation": {
        "en": "=C2<TODAY() returns TRUE for any date strictly prior to today, triggering the alert format.",
        "vi": "=C2<TODAY() trả về TRUE cho bất kỳ ngày nào trước ngày hôm nay, kích hoạt định dạng cảnh báo."
      }
    }
  ],
  "challenge": {
    "id": "excel_l8_challenge",
    "title": {
      "en": "Highlight VIP Enterprise Clients Across Data Grid",
      "vi": "Tô Màu Khách Hàng Doanh Nghiệp VIP Trên Toàn Bộ Lưới Dữ Liệu"
    },
    "description": {
      "en": "Construct the conditional formatting formula to highlight all columns in a table row if the customer tier in column B (row 2) equals \"VIP\" AND annual spend in column C exceeds 50000.",
      "vi": "Xây dựng công thức định dạng có điều kiện để tô màu toàn bộ các cột trong một hàng nếu phân hạng khách hàng ở cột B (hàng 2) là \"VIP\" VÀ chi tiêu hàng năm ở cột C vượt quá 50000."
    },
    "requirements": [
      {
        "en": "Use the AND function",
        "vi": "Sử dụng hàm AND"
      },
      {
        "en": "Lock columns B and C with dollar signs: $B2 and $C2",
        "vi": "Khóa cột B và C bằng dấu đô la: $B2 và $C2"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=AND($B2=\"VIP\", $C2>50000)",
    "hints": [
      {
        "en": "Combine conditions using: =AND($B2=\"VIP\", $C2>50000)",
        "vi": "Kết hợp các điều kiện: =AND($B2=\"VIP\", $C2>50000)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l8_q1",
      "type": "single_choice",
      "question": {
        "en": "When creating a custom formula rule to highlight an entire table row, why must the column letter be preceded by a dollar sign (e.g. `=$C2>100`)?",
        "vi": "Khi tạo quy tắc công thức tùy chỉnh để tô màu toàn bộ hàng trong bảng, tại sao chữ cái cột phải có dấu đô la đứng trước (ví dụ `=$C2>100`)?"
      },
      "options": [
        {
          "en": "To lock the evaluation to Column C for all columns in that row",
          "vi": "Để khóa việc kiểm tra điều kiện vào Cột C cho tất cả các cột trên hàng đó"
        },
        {
          "en": "Because conditional formatting only accepts currency values",
          "vi": "Vì định dạng có điều kiện chỉ chấp nhận các giá trị tiền tệ"
        },
        {
          "en": "To convert numbers to uppercase",
          "vi": "Để chuyển số thành chữ hoa"
        },
        {
          "en": "To protect the worksheet from editing",
          "vi": "Để bảo vệ trang tính không bị chỉnh sửa"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The $ locks column C so that cells in columns A, B, C, D, and E all check the value in column C of their respective row.",
        "vi": "Dấu $ khóa cột C để các ô ở cột A, B, C, D và E đều kiểm tra giá trị ở cột C trên hàng tương ứng của chúng."
      },
      "difficulty": "medium",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q2",
      "type": "single_choice",
      "question": {
        "en": "Which conditional formatting feature places mini horizontal bar graphs inside cells to visualize numeric proportions?",
        "vi": "Tính năng định dạng có điều kiện nào đặt biểu đồ thanh ngang mini bên trong các ô để trực quan hóa tỷ lệ số?"
      },
      "options": [
        {
          "en": "Data Bars",
          "vi": "Data Bars"
        },
        {
          "en": "Color Scales",
          "vi": "Color Scales"
        },
        {
          "en": "Icon Sets",
          "vi": "Icon Sets"
        },
        {
          "en": "Sparklines",
          "vi": "Sparklines"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Data Bars fill the cell background with a proportional colored bar corresponding to the cell's value relative to the range.",
        "vi": "Data Bars tô nền ô bằng một thanh màu tỷ lệ tương ứng với giá trị của ô so với toàn bộ vùng."
      },
      "difficulty": "easy",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q3",
      "type": "single_choice",
      "question": {
        "en": "Which rule type creates a continuous 3-color heatmap (e.g. Green for top, Yellow for middle, Red for bottom)?",
        "vi": "Loại quy tắc nào tạo bản đồ nhiệt chuyển sắc 3 màu liên tục (ví dụ Xanh lá cho cao nhất, Vàng cho trung bình, Đỏ cho thấp nhất)?"
      },
      "options": [
        {
          "en": "Color Scales",
          "vi": "Color Scales"
        },
        {
          "en": "Data Bars",
          "vi": "Data Bars"
        },
        {
          "en": "Top/Bottom Rules",
          "vi": "Top/Bottom Rules"
        },
        {
          "en": "Highlight Cells Rules",
          "vi": "Highlight Cells Rules"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Color Scales generate a smooth gradient heatmap across a dataset based on minimum, midpoint (50th percentile), and maximum values.",
        "vi": "Color Scales tạo một bản đồ nhiệt dải màu mượt mà trên tập dữ liệu dựa trên giá trị nhỏ nhất, điểm giữa (phân vị 50) và giá trị lớn nhất."
      },
      "difficulty": "easy",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q4",
      "type": "single_choice",
      "question": {
        "en": "Where in Microsoft Excel can you view, edit, reorder, or delete all active formatting rules on a sheet?",
        "vi": "Ở đâu trong Microsoft Excel bạn có thể xem, chỉnh sửa, sắp xếp lại hoặc xóa tất cả các quy tắc định dạng đang hoạt động trên một trang tính?"
      },
      "options": [
        {
          "en": "Conditional Formatting -> Manage Rules",
          "vi": "Conditional Formatting -> Manage Rules"
        },
        {
          "en": "Page Layout -> Page Setup",
          "vi": "Page Layout -> Page Setup"
        },
        {
          "en": "Data -> Data Validation",
          "vi": "Data -> Data Validation"
        },
        {
          "en": "Review -> Protect Sheet",
          "vi": "Review -> Protect Sheet"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Manage Rules opens the Rules Manager dialog where all rules can be inspected, prioritized, and edited.",
        "vi": "Manage Rules mở hộp thoại Quản lý Quy tắc nơi tất cả các quy tắc có thể được kiểm tra, đặt thứ tự ưu tiên và chỉnh sửa."
      },
      "difficulty": "easy",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q5",
      "type": "single_choice",
      "question": {
        "en": "What does checking the \"Stop If True\" option in the Conditional Formatting Rules Manager do?",
        "vi": "Tùy chọn \"Stop If True\" trong Trình quản lý quy tắc định dạng có điều kiện có tác dụng gì?"
      },
      "options": [
        {
          "en": "Prevents any subsequent lower-priority rules from executing on a cell that matched the current rule",
          "vi": "Ngăn không cho bất kỳ quy tắc ưu tiên thấp hơn nào tiếp tục thực thi trên ô đã thỏa mãn quy tắc hiện tại"
        },
        {
          "en": "Stops Excel from recalculating formulas",
          "vi": "Dừng không cho Excel tính toán lại công thức"
        },
        {
          "en": "Deletes the cell if the condition is TRUE",
          "vi": "Xóa ô nếu điều kiện là TRUE"
        },
        {
          "en": "Displays a popup error message",
          "vi": "Hiển thị thông báo lỗi bật lên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "\"Stop If True\" halts rule processing for that specific cell as soon as a condition is satisfied, preventing conflicting formats.",
        "vi": "\"Stop If True\" dừng xử lý các quy tắc tiếp theo cho ô đó ngay khi điều kiện được thỏa mãn, tránh xung đột định dạng."
      },
      "difficulty": "medium",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q6",
      "type": "single_choice",
      "question": {
        "en": "Which preset rule is used to quickly spot repeated customer IDs in a column?",
        "vi": "Quy tắc có sẵn nào được dùng để phát hiện nhanh mã khách hàng bị lặp lại trong một cột?"
      },
      "options": [
        {
          "en": "Highlight Cells Rules -> Duplicate Values",
          "vi": "Highlight Cells Rules -> Duplicate Values"
        },
        {
          "en": "Top/Bottom Rules -> Bottom 10",
          "vi": "Top/Bottom Rules -> Bottom 10"
        },
        {
          "en": "Data Bars -> Solid Fill",
          "vi": "Data Bars -> Solid Fill"
        },
        {
          "en": "Icon Sets -> 3 Flags",
          "vi": "Icon Sets -> 3 Flags"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Duplicate Values automatically searches the selected range and flags any value that occurs more than once.",
        "vi": "Duplicate Values tự động quét vùng đã chọn và đánh dấu bất kỳ giá trị nào xuất hiện nhiều hơn một lần."
      },
      "difficulty": "easy",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q7",
      "type": "true_false",
      "question": {
        "en": "True or False: Conditional formatting rules will automatically update their visual display if a user edits cell values.",
        "vi": "Đúng hay Sai: Các quy tắc định dạng có điều kiện sẽ tự động cập nhật hiển thị trực quan nếu người dùng chỉnh sửa giá trị của ô."
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
        "en": "True. Conditional formatting is dynamic and re-evaluates automatically whenever underlying spreadsheet data changes.",
        "vi": "Đúng. Định dạng có điều kiện có tính động và tự động tính toán lại bất cứ khi nào dữ liệu bảng tính thay đổi."
      },
      "difficulty": "easy",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q8",
      "type": "single_choice",
      "question": {
        "en": "What icon set style is commonly used to show upward, horizontal, and downward performance trends?",
        "vi": "Kiểu Icon Set nào thường được dùng để thể hiện xu hướng hiệu suất tăng lên, đi ngang và giảm xuống?"
      },
      "options": [
        {
          "en": "Directional Arrows (Green Up, Yellow Side, Red Down)",
          "vi": "Mũi tên chỉ hướng (Xanh lên, Vàng ngang, Đỏ xuống)"
        },
        {
          "en": "Ratings Stars",
          "vi": "Ngôi sao đánh giá"
        },
        {
          "en": "Quarters Pies",
          "vi": "Biểu đồ tròn 4 phần"
        },
        {
          "en": "Checkmarks Only",
          "vi": "Chỉ dấu tích"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "3 Directional Arrows visually signal growth, steady-state, and decline across financial and operational KPI metrics.",
        "vi": "Bộ 3 Mũi tên chỉ hướng thể hiện trực quan sự tăng trưởng, ổn định và suy giảm trên các chỉ số KPI tài chính và vận hành."
      },
      "difficulty": "easy",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q9",
      "type": "single_choice",
      "question": {
        "en": "What happens if two conditional formatting rules apply to the same cell and both evaluate to TRUE?",
        "vi": "Điều gì xảy ra nếu hai quy tắc định dạng có điều kiện cùng áp dụng cho một ô và cả hai đều cho kết quả TRUE?"
      },
      "options": [
        {
          "en": "The rule positioned higher in the Rules Manager list takes visual priority for conflicting properties (such as fill color)",
          "vi": "Quy tắc nằm ở vị trí cao hơn trong danh sách Quản lý Quy tắc sẽ được ưu tiên hiển thị đối với các thuộc tính xung đột (như màu nền)"
        },
        {
          "en": "Excel crashes with a fatal error",
          "vi": "Excel bị sập do lỗi nghiêm trọng"
        },
        {
          "en": "The cell turns black",
          "vi": "Ô chuyển sang màu đen"
        },
        {
          "en": "The lowest rule always wins",
          "vi": "Quy tắc thấp nhất luôn chiến thắng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Rules are evaluated in top-to-bottom order in the Rules Manager dialog; the higher rule takes precedence for any conflicting formatting attributes.",
        "vi": "Các quy tắc được đánh giá theo thứ tự từ trên xuống dưới trong hộp thoại Rules Manager; quy tắc cao hơn sẽ chiếm ưu thế đối với các thuộc tính định dạng xung đột."
      },
      "difficulty": "medium",
      "topicId": "excel_formatting"
    },
    {
      "id": "excel_l8_q10",
      "type": "single_choice",
      "question": {
        "en": "Which formula highlights cells in column B if the value is strictly above the average of range B2:B50?",
        "vi": "Công thức nào tô màu các ô trong cột B nếu giá trị lớn hơn trung bình cộng của vùng B2:B50?"
      },
      "options": [
        {
          "en": "=B2 > AVERAGE($B$2:$B$50)",
          "vi": "=B2 > AVERAGE($B$2:$B$50)"
        },
        {
          "en": "=B2 > AVERAGE(B2:B50)",
          "vi": "=B2 > AVERAGE(B2:B50)"
        },
        {
          "en": "=$B$2 > AVERAGE(B2)",
          "vi": "=$B$2 > AVERAGE(B2)"
        },
        {
          "en": "=AVERAGE($B$2:$B$50)",
          "vi": "=AVERAGE($B$2:$B$50)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "=B2 > AVERAGE($B$2:$B$50) keeps the benchmark average range locked with absolute references ($B$2:$B$50) while comparing each cell B2 relatively.",
        "vi": "=B2 > AVERAGE($B$2:$B$50) giữ cố định vùng tính trung bình chuẩn bằng tham chiếu tuyệt đối ($B$2:$B$50) trong khi so sánh tương đối từng ô B2."
      },
      "difficulty": "medium",
      "topicId": "excel_formatting"
    }
  ]
};
export default lesson08;
