import { Lesson } from '../../../../types';

export const lesson01: Lesson = {
  "id": "excel_lesson_1",
  "order": 1,
  "moduleId": "excel_mod_1",
  "courseId": "excel",
  "levelId": "basic",
  "topicId": "excel_fundamentals",
  "title": {
    "en": "Excel Grid Architecture, Cell Coordinates, Data Types & Formatting",
    "vi": "Cấu Trúc Lưới Excel, Tọa Độ Ô, Kiểu Dữ Liệu & Định Dạng"
  },
  "summary": {
    "en": "Master workbook anatomy, cell coordinate systems, data type distinctions (Text, Number, Date, Boolean), and essential number formatting (Currency, Accounting, Percentages, Custom format codes).",
    "vi": "Làm chủ cấu trúc bảng tính, hệ tọa độ ô, phân biệt các kiểu dữ liệu (Văn bản, Số, Ngày tháng, Logic) và định dạng số thiết yếu (Tiền tệ, Kế toán, Tỷ lệ phần trăm, Mã định dạng tùy chỉnh)."
  },
  "learn": {
    "introduction": {
      "en": "Microsoft Excel is the global standard for business modeling and analytical calculations. Every workbook is built on a two-dimensional grid of 16,384 columns (A to XFD) and 1,048,576 rows. Understanding how Excel stores data types and displays them through formatting is the foundational cornerstone of all accurate spreadsheet modeling.",
      "vi": "Microsoft Excel là tiêu chuẩn toàn cầu cho việc lập mô hình kinh doanh và tính toán phân tích. Mỗi bảng tính được xây dựng trên một lưới hai chiều gồm 16.384 cột (A đến XFD) và 1.048.576 hàng. Hiểu cách Excel lưu trữ các kiểu dữ liệu và hiển thị chúng qua định dạng là nền tảng cốt lõi cho mọi mô hình bảng tính chính xác."
    },
    "conceptExplanation": {
      "en": "### 1. The Excel Coordinate System & Anatomy\n- **Worksheet Dimensions**: Exactly 1,048,576 rows by 16,384 columns.\n- **Cell Address**: Intersection of column letter and row number (e.g., `B4`, `AA12`, `XFD1048576`).\n- **Range Reference**: A rectangular block of cells denoted by top-left and bottom-right coordinates separated by a colon (e.g., `A1:D10`).\n\n### 2. Fundamental Excel Data Types\nExcel handles 5 fundamental data types, each with default alignment and behavior:\n1. **Numbers**: Numeric values (integers, decimals, scientific notation). Aligned **RIGHT** by default.\n2. **Text / Strings**: Alphanumeric characters, words, or numbers stored as text (prefixed with apostrophe `'123`). Aligned **LEFT** by default.\n3. **Dates & Times**: Stored internally as serial numbers (Day 1 = Jan 1, 1900). Aligned **RIGHT** by default.\n4. **Booleans (Logical)**: `TRUE` or `FALSE`. Centered by default in uppercase.\n5. **Errors**: Special values indicating calculation failures (`#DIV/0!`, `#N/A`, `#VALUE!`, `#REF!`, `#NUM!`, `#NAME?`).\n\n### 3. Number Formatting vs Underlying Value\nFormatting changes **how a value looks**, NOT what value is stored in memory:\n- **General**: Default unformatted number.\n- **Currency**: Displays currency symbol adjacent to the number (e.g., `$1,250.50`).\n- **Accounting**: Aligns currency symbols at the left edge and encloses negative numbers in parentheses `($1,250.50)`. Zero is displayed as a dash `-`.\n- **Percentage**: Multiplies internal decimal by 100 and appends `%` (e.g., internal `0.085` displays as `8.50%`).\n- **Custom Format Codes**: Syntax `Positive;Negative;Zero;Text` (e.g., `$#,##0.00;($#,##0.00);\"-\";@`).",
      "vi": "### 1. Hệ Tọa Độ & Cấu Trúc Bảng Tính Excel\n- **Kích thước Worksheet**: Đúng 1.048.576 dòng và 16.384 cột.\n- **Địa chỉ ô (Cell Address)**: Giao điểm giữa chữ cái cột và số thứ tự hàng (ví dụ: `B4`, `AA12`, `XFD1048576`).\n- **Tham chiếu vùng (Range)**: Khối ô hình chữ nhật được xác định bởi ô góc trên bên trái và góc dưới bên phải ngăn cách bằng dấu hai chấm (ví dụ: `A1:D10`).\n\n### 2. Các Kiểu Dữ Liệu Cơ Bản Trong Excel\nExcel xử lý 5 kiểu dữ liệu cốt lõi với quy tắc căn lề mặc định:\n1. **Số (Numbers)**: Giá trị số (nguyên, thập phân, ký hiệu khoa học). Mặc định căn lề **PHẢI**.\n2. **Văn bản (Text / Strings)**: Ký tự chữ, từ hoặc số được lưu dưới dạng chuỗi (tiền tố dấu nháy đơn `'123`). Mặc định căn lề **TRÁI**.\n3. **Ngày & Giờ (Dates & Times)**: Được lưu nội bộ dưới dạng số sê-ri (Ngày 1 = 01/01/1900). Mặc định căn lề **PHẢI**.\n4. **Giá trị Logic (Booleans)**: `TRUE` hoặc `FALSE`. Mặc định căn **GIỮA** và viết hoa.\n5. **Lỗi (Errors)**: Giá trị đặc biệt báo hiệu lỗi tính toán (`#DIV/0!`, `#N/A`, `#VALUE!`, `#REF!`, `#NUM!`, `#NAME?`).\n\n### 3. Định Dạng Số So Với Giá Trị Gốc\nĐịnh dạng chỉ thay đổi **cách hiển thị**, KHÔNG thay đổi giá trị thực tế trong bộ nhớ:\n- **General**: Hiển thị số mặc định không định dạng.\n- **Currency (Tiền tệ)**: Hiển thị ký hiệu tiền tệ sát cạnh con số (ví dụ: `$1,250.50`).\n- **Accounting (Kế toán)**: Canh ký hiệu tiền tệ sang tận cùng bên trái và để số âm trong ngoặc đơn `($1,250.50)`. Số 0 hiển thị thành dấu gạch ngang `-`.\n- **Percentage (Phần trăm)**: Nhân số thập phân nội bộ với 100 và thêm ký hiệu `%` (ví dụ: `0.085` hiển thị là `8.50%`).\n- **Mã Định Dạng Tùy Chỉnh (Custom Format)**: Cú pháp `Dương;Âm;Không;Văn bản` (ví dụ: `$#,##0.00;($#,##0.00);\"-\";@`)."
    },
    "syntax": "# Custom Number Format Syntax\nPositive_Format;Negative_Format;Zero_Format;Text_Format\n\n# Common Custom Codes:\n#,##0.00                -> 1,234.56\n$#,##0;($#,##0);\"-\"     -> Standard Accounting display\n0.00%                   -> 8.50%\nyyyy-mm-dd              -> 2026-08-29",
    "examples": [
      {
        "title": {
          "en": "Distinguishing Text vs Numeric Storage",
          "vi": "Phân Biệt Lưu Trữ Chuỗi vs Số"
        },
        "code": "Cell A1: 1500        (Stored as Number -> Right-aligned -> Sum works)\nCell A2: '1500       (Stored as Text with apostrophe -> Left-aligned -> SUM ignores it)\nFormula in A3: =SUM(A1:A2)  -> Result: 1500 (A2 is treated as 0 in SUM)",
        "description": {
          "en": "When numbers are accidentally stored as text, aggregation functions like SUM and AVERAGE ignore them or produce incorrect totals.",
          "vi": "Khi số bị vô tình lưu dưới dạng văn bản, các hàm tổng hợp như SUM và AVERAGE sẽ bỏ qua chúng hoặc tính sai tổng."
        }
      },
      {
        "title": {
          "en": "Custom Format for Millions & Thousands",
          "vi": "Định Dạng Tùy Chỉnh Cho Triệu & Nghìn"
        },
        "code": "Format Code: $#,##0.0,, \"M\"\nInput: 25400000 -> Displays: $25.4 M (stored value remains 25400000)\n\nFormat Code: $#,##0, \"K\"\nInput: 150000   -> Displays: $150 K (stored value remains 150000)",
        "description": {
          "en": "Double commas divide the display by 1,000,000 without altering the precision of mathematical formulas referencing that cell.",
          "vi": "Hai dấu phẩy liên tiếp chia số hiển thị cho 1.000.000 mà không làm mất độ chính xác của các công thức tính toán tham chiếu ô đó."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Typing currency symbols or commas directly into cells (e.g. typing \"$1,000\" into unformatted cell).",
          "vi": "Gõ trực tiếp ký hiệu tiền tệ hoặc dấu phân cách hàng nghìn vào ô chưa định dạng."
        },
        "correction": {
          "en": "Enter pure numeric digits (1000) and apply Currency or Accounting formatting via the Ribbon or Format Cells dialog.",
          "vi": "Nhập số nguyên chất (1000) rồi áp dụng định dạng Currency hoặc Accounting thông qua Ribbon hoặc hộp thoại Format Cells."
        }
      },
      {
        "mistake": {
          "en": "Assuming rounded cell display means the underlying calculation is rounded.",
          "vi": "Nghĩ rằng số hiển thị được làm tròn nghĩa là phép tính đã được làm tròn."
        },
        "correction": {
          "en": "Formatting only changes visual appearance. If you need true mathematical rounding, use the ROUND() function.",
          "vi": "Định dạng chỉ thay đổi giao diện hiển thị. Nếu cần làm tròn toán học thực sự, hãy sử dụng hàm ROUND()."
        }
      }
    ],
    "tips": [
      {
        "en": "Format Cells Shortcut: Press Ctrl + 1 (Cmd + 1 on Mac) to open the comprehensive Format Cells dialog.",
        "vi": "Phím tắt Format Cells: Nhấn Ctrl + 1 (Cmd + 1 trên Mac) để mở hộp thoại định dạng ô toàn diện."
      },
      {
        "en": "Quick Number Formats: Ctrl + Shift + 4 applies Currency ($), Ctrl + Shift + 5 applies Percentage (%).",
        "vi": "Định dạng nhanh: Ctrl + Shift + 4 áp dụng Tiền tệ ($), Ctrl + Shift + 5 áp dụng Phần trăm (%)."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l1_ex1",
      "type": "complete_code",
      "title": {
        "en": "Target Cell Address Selection",
        "vi": "Xác Định Địa Chỉ Ô Mục Tiêu"
      },
      "instruction": {
        "en": "Write the Excel coordinate reference for a cell located at column D and row 15.",
        "vi": "Viết địa chỉ tọa độ Excel cho ô nằm ở cột D và hàng 15."
      },
      "starterCode": "",
      "solutionCode": "D15",
      "expectedOutput": "D15",
      "hint": {
        "en": "Column letter first, followed by row number without spaces.",
        "vi": "Chữ cái cột trước, sau đó là số hàng không có dấu cách."
      },
      "explanation": {
        "en": "Cell coordinates in Excel always place the column letter first (D) followed by the row index (15).",
        "vi": "Tọa độ ô trong Excel luôn đặt chữ cái cột trước (D) tiếp theo là chỉ số hàng (15)."
      }
    },
    {
      "id": "excel_l1_ex2",
      "type": "complete_code",
      "title": {
        "en": "Accounting Custom Format Definition",
        "vi": "Định Dạng Tùy Chỉnh Kế Toán"
      },
      "instruction": {
        "en": "Specify the custom number format code to display positive numbers as $#,##0, negative numbers in parentheses ($#,##0), and zeroes as a hyphen \"-\".",
        "vi": "Chỉ định mã định dạng số tùy chỉnh để hiển thị số dương là $#,##0, số âm trong ngoặc ($#,##0) và số 0 là dấu gạch ngang \"-\"."
      },
      "starterCode": "$#,##0;($#,##0);",
      "solutionCode": "$#,##0;($#,##0);\"-\"",
      "expectedOutput": "$#,##0;($#,##0);\"-\"",
      "hint": {
        "en": "The third section represents zero format.",
        "vi": "Phần thứ ba đại diện cho định dạng số 0."
      },
      "explanation": {
        "en": "Custom format codes use semicolons to divide positive, negative, zero, and text rules.",
        "vi": "Mã định dạng tùy chỉnh sử dụng dấu chấm phẩy để phân tách quy tắc số dương, số âm, số không và văn bản."
      }
    }
  ],
  "challenge": {
    "id": "excel_l1_challenge",
    "title": {
      "en": "Financial Statement Grid Setup & Formats",
      "vi": "Thiết Lập Lưới & Định Dạng Báo Cáo Tài Chính"
    },
    "description": {
      "en": "Construct the cell range reference that encompasses an entire quarterly revenue table from Revenue in B2 through Q4 Profit in E12.",
      "vi": "Xây dựng tham chiếu vùng ô bao quát toàn bộ bảng doanh thu quý từ Doanh thu ở B2 đến Lợi nhuận Q4 ở E12."
    },
    "requirements": [
      {
        "en": "Identify the top-left cell B2 and bottom-right cell E12.",
        "vi": "Xác định ô trên cùng bên trái B2 và dưới cùng bên phải E12."
      },
      {
        "en": "Use colon notation to represent the continuous range.",
        "vi": "Sử dụng ký hiệu dấu hai chấm để đại diện cho vùng liên tục."
      }
    ],
    "starterCode": "",
    "solutionCode": "B2:E12",
    "hints": [
      {
        "en": "Use the format [TopLeft]:[BottomRight]",
        "vi": "Sử dụng định dạng [ÔĐầu]:[ÔCuối]"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l1_q1",
      "type": "single_choice",
      "question": {
        "en": "By default, how does Excel horizontally align numeric values versus text strings in a cell?",
        "vi": "Theo mặc định, Excel căn lề ngang các giá trị số và chuỗi văn bản trong ô như thế nào?"
      },
      "options": [
        {
          "en": "Numbers align right; text aligns left",
          "vi": "Số căn phải; văn bản căn trái"
        },
        {
          "en": "Numbers align left; text aligns right",
          "vi": "Số căn trái; văn bản căn phải"
        },
        {
          "en": "Both numbers and text align center",
          "vi": "Cả số và văn bản đều căn giữa"
        },
        {
          "en": "Both numbers and text align left",
          "vi": "Cả số và văn bản đều căn trái"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In standard unformatted cells, numbers, dates, and times align to the right, while text aligns to the left.",
        "vi": "Trong các ô chưa định dạng, số, ngày và giờ căn sang bên phải, trong khi văn bản căn sang bên trái."
      },
      "difficulty": "easy",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q2",
      "type": "single_choice",
      "question": {
        "en": "What is the maximum number of rows available in a modern Excel (.xlsx) worksheet?",
        "vi": "Số lượng hàng tối đa có sẵn trong một bảng tính Excel hiện đại (.xlsx) là bao nhiêu?"
      },
      "options": [
        {
          "en": "65,536",
          "vi": "65.536"
        },
        {
          "en": "1,048,576",
          "vi": "1.048.576"
        },
        {
          "en": "16,384",
          "vi": "16.384"
        },
        {
          "en": "500,000",
          "vi": "500.000"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "Since Excel 2007 (OpenXML format), worksheets support exactly 1,048,576 rows and 16,384 columns (A to XFD).",
        "vi": "Kể từ Excel 2007, bảng tính hỗ trợ chính xác 1.048.576 hàng và 16.384 cột (A đến XFD)."
      },
      "difficulty": "easy",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q3",
      "type": "single_choice",
      "question": {
        "en": "If cell A1 contains the number 0.1275, what does it display when formatted as Percentage with 1 decimal place?",
        "vi": "Nếu ô A1 chứa số 0.1275, nó sẽ hiển thị gì khi được định dạng Percentage với 1 chữ số thập phân?"
      },
      "options": [
        {
          "en": "12.8%",
          "vi": "12.8%"
        },
        {
          "en": "12.7%",
          "vi": "12.7%"
        },
        {
          "en": "0.1%",
          "vi": "0.1%"
        },
        {
          "en": "13%",
          "vi": "13%"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "0.1275 * 100 = 12.75%, which rounds visually to 12.8% when displayed with 1 decimal place.",
        "vi": "0.1275 * 100 = 12.75%, được làm tròn hiển thị thành 12.8% với 1 chữ số thập phân."
      },
      "difficulty": "medium",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q4",
      "type": "single_choice",
      "question": {
        "en": "What character can be typed at the very start of an input to force Excel to treat numbers (such as phone numbers or postal codes) as text?",
        "vi": "Ký tự nào có thể được gõ ở đầu ô nhập liệu để buộc Excel coi các con số (như số điện thoại hoặc mã bưu chính) là văn bản?"
      },
      "options": [
        {
          "en": "Single quotation mark / apostrophe (')",
          "vi": "Dấu nháy đơn (')"
        },
        {
          "en": "Equal sign (=)",
          "vi": "Dấu bằng (=)"
        },
        {
          "en": "Hashtag (#)",
          "vi": "Dấu thăng (#)"
        },
        {
          "en": "Ampersand (&)",
          "vi": "Dấu và (&)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "A leading apostrophe (e.g., '0901234567) tells Excel to treat the entry strictly as text, preserving leading zeros.",
        "vi": "Dấu nháy đơn ở đầu (ví dụ: '0901234567) yêu cầu Excel xử lý dữ liệu nhập hoàn toàn dưới dạng chuỗi, giữ nguyên số 0 ở đầu."
      },
      "difficulty": "easy",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q5",
      "type": "single_choice",
      "question": {
        "en": "In a 4-section custom number format code, what does the 2nd section control?",
        "vi": "Trong mã định dạng số tùy chỉnh gồm 4 phần, phần thứ 2 điều khiển điều gì?"
      },
      "options": [
        {
          "en": "Negative numbers format",
          "vi": "Định dạng số âm"
        },
        {
          "en": "Positive numbers format",
          "vi": "Định dạng số dương"
        },
        {
          "en": "Zero values format",
          "vi": "Định dạng giá trị bằng 0"
        },
        {
          "en": "Text format",
          "vi": "Định dạng văn bản"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The 4 sections of custom number formatting are always ordered as: Positive; Negative; Zero; Text.",
        "vi": "4 phần của định dạng số tùy chỉnh luôn theo thứ tự: Số dương; Số âm; Số không; Văn bản."
      },
      "difficulty": "medium",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q6",
      "type": "true_false",
      "question": {
        "en": "True or False: Applying currency formatting changes the internal precision of the number stored in memory.",
        "vi": "Đúng hay Sai: Áp dụng định dạng tiền tệ làm thay đổi độ chính xác số học bên trong của con số được lưu trong bộ nhớ."
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
        "en": "False. Formatting alters only the visual representation in the cell grid, while the full precision floating-point value is retained in calculations.",
        "vi": "Sai. Định dạng chỉ thay đổi hiển thị trực quan trong ô lưới, trong khi giá trị số học nguyên vẹn vẫn được giữ lại trong các phép tính."
      },
      "difficulty": "easy",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q7",
      "type": "single_choice",
      "question": {
        "en": "What key shortcut opens the Format Cells dialog box in Microsoft Excel for Windows?",
        "vi": "Phím tắt nào mở hộp thoại Format Cells trong Microsoft Excel trên Windows?"
      },
      "options": [
        {
          "en": "Ctrl + 1",
          "vi": "Ctrl + 1"
        },
        {
          "en": "Ctrl + F",
          "vi": "Ctrl + F"
        },
        {
          "en": "Alt + F4",
          "vi": "Alt + F4"
        },
        {
          "en": "Ctrl + Shift + F",
          "vi": "Ctrl + Shift + F"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Ctrl + 1 (Cmd + 1 on Mac) immediately launches the Format Cells dialog window with all Number, Alignment, Font, and Border tabs.",
        "vi": "Ctrl + 1 (Cmd + 1 trên Mac) ngay lập tức mở hộp thoại Format Cells với đầy đủ các tab Number, Alignment, Font và Border."
      },
      "difficulty": "easy",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q8",
      "type": "single_choice",
      "question": {
        "en": "Which formatting style aligns currency symbols to the far left of the cell, places negative numbers in parentheses, and displays 0 as a dash (-)?",
        "vi": "Kiểu định dạng nào canh ký hiệu tiền tệ sang tận cùng bên trái của ô, đặt số âm trong ngoặc đơn và hiển thị 0 thành dấu gạch ngang (-)?"
      },
      "options": [
        {
          "en": "Accounting format",
          "vi": "Định dạng Accounting (Kế toán)"
        },
        {
          "en": "Currency format",
          "vi": "Định dạng Currency (Tiền tệ)"
        },
        {
          "en": "Fraction format",
          "vi": "Định dạng Phân số"
        },
        {
          "en": "Scientific format",
          "vi": "Định dạng Khoa học"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Accounting format aligns currency symbols at the left margin, formats zeroes as dashes, and encloses negatives in parentheses for clean financial columns.",
        "vi": "Định dạng Accounting căn chỉnh ký hiệu tiền tệ sang lề trái, hiển thị số 0 thành dấu gạch ngang và để số âm trong ngoặc đơn giúp cột báo cáo tài chính gọn gàng."
      },
      "difficulty": "medium",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q9",
      "type": "single_choice",
      "question": {
        "en": "How does Excel interpret a cell containing the text \"TRUE\" entered without quotation marks?",
        "vi": "Excel diễn giải một ô chứa chữ \"TRUE\" được nhập không có dấu ngoặc kép như thế nào?"
      },
      "options": [
        {
          "en": "As a Boolean (Logical) data type",
          "vi": "Như một kiểu dữ liệu Boolean (Logic)"
        },
        {
          "en": "As a Text / String data type",
          "vi": "Như một kiểu dữ liệu Văn bản / Chuỗi"
        },
        {
          "en": "As an Error value",
          "vi": "Như một giá trị Lỗi"
        },
        {
          "en": "As the numeric value 0",
          "vi": "Như giá trị số 0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Excel recognizes TRUE and FALSE as native Boolean values and auto-formats them centered and capitalized.",
        "vi": "Excel tự động nhận diện TRUE và FALSE là các giá trị Boolean nguyên bản và tự động căn giữa, viết hoa."
      },
      "difficulty": "easy",
      "topicId": "excel_fundamentals"
    },
    {
      "id": "excel_l1_q10",
      "type": "single_choice",
      "question": {
        "en": "What does the custom format code `$#,##0,, \"M\"` do to the number 45000000?",
        "vi": "Mã định dạng tùy chỉnh `$#,##0,, \"M\"` làm gì với con số 45000000?"
      },
      "options": [
        {
          "en": "Displays as $45 M",
          "vi": "Hiển thị thành $45 M"
        },
        {
          "en": "Displays as $45,000,000 M",
          "vi": "Hiển thị thành $45,000,000 M"
        },
        {
          "en": "Displays as $45,000 K",
          "vi": "Hiển thị thành $45,000 K"
        },
        {
          "en": "Generates a #VALUE! error",
          "vi": "Tạo ra lỗi #VALUE!"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Each trailing comma scales the display value down by a factor of 1,000. Two commas scale by 1,000,000, converting 45,000,000 to \"$45 M\".",
        "vi": "Mỗi dấu phẩy ở cuối thu nhỏ giá trị hiển thị đi 1.000 lần. Hai dấu phẩy thu nhỏ 1.000.000 lần, biến 45.000.000 thành \"$45 M\"."
      },
      "difficulty": "hard",
      "topicId": "excel_fundamentals"
    }
  ]
};
export default lesson01;
