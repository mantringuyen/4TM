import { Lesson } from '../../../../types';

export const lesson16: Lesson = {
  "id": "excel_lesson_16",
  "order": 16,
  "moduleId": "excel_mod_4",
  "courseId": "excel",
  "levelId": "intermediate",
  "topicId": "excel_data_validation",
  "title": {
    "en": "Data Validation, Defensive Input Constraints & Cascading Dependent Dropdowns",
    "vi": "Xác Thực Dữ Liệu, Ràng Buộc Nhập Liệu & Menu Thả Xuống Phụ Thuộc Đa Tầng"
  },
  "summary": {
    "en": "Build defensive data intake interfaces: List validation, numeric range boundaries, custom regex-style formula rules, Input Messages, Stop vs Warning error alerts, dynamic spill list sources (=G2#), and cascading dependent dropdowns powered by INDIRECT.",
    "vi": "Xây dựng giao diện thu thập dữ liệu phòng thủ: xác thực danh sách List, giới hạn khoảng số, quy tắc công thức tùy chỉnh, thông báo hướng dẫn Input Message, hộp thoại cảnh báo Stop vs Warning, nguồn danh sách tràn động (=G2#) và menu thả xuống phụ thuộc đa tầng bằng INDIRECT."
  },
  "learn": {
    "introduction": {
      "en": "Garbage in, garbage out: the primary cause of spreadsheet calculation errors is invalid user input (e.g. typing \"Ten\" into a numeric discount field, or entering \"Califorina\" with a typo). Data Validation enforces strict integrity rules at the point of data entry, guiding users with dropdown selections and polite error dialogs.",
      "vi": "Dữ liệu rác đầu vào sẽ tạo ra kết quả rác đầu ra: nguyên nhân hàng đầu gây lỗi tính toán trong bảng tính là do người dùng nhập dữ liệu sai (ví dụ gõ chữ \"Mười\" vào ô chiết khấu số, hoặc gõ sai chính tả tên tỉnh thành). Tính năng Data Validation áp dụng các ràng buộc toàn vẹn dữ liệu nghiêm ngặt ngay tại thời điểm nhập liệu, hướng dẫn người dùng bằng danh sách chọn thả xuống và thông báo lỗi rõ ràng."
    },
    "conceptExplanation": {
      "en": "### 1. Data Validation Criteria Types (Data Tab)\n- **List**: Creates in-cell dropdown lists. Source can be comma-separated (`\"High, Medium, Low\"`), a fixed range (`=$K$2:$K$10`), or a dynamic array spill reference (`=$G$2#`).\n- **Whole Number / Decimal**: Restricts inputs between minimum and maximum bounds (e.g. Discount between 0.0 and 0.5).\n- **Date / Time**: Restricts dates (e.g. `>=TODAY()`).\n- **Text Length**: Restricts character lengths (e.g. exactly 10 digits for phone numbers).\n- **Custom (Formula-Based)**: Accepts any boolean formula (e.g. `=ISNUMBER(B2)` or `=COUNTIF($A$2:$A$100, A2)=1` to enforce uniqueness!).\n\n### 2. Error Alert Severities\n1. **Stop (Red X)**: Completely blocks invalid entry; user cannot proceed without correcting data.\n2. **Warning (Yellow Triangle)**: Alerts user with \"Yes/No\" to allow overriding the rule.\n3. **Information (Blue i)**: Informs user and accepts the invalid data automatically.\n\n### 3. Cascading Dependent Dropdown Menus (with INDIRECT)\nTo make dropdown 2 depend on the selection of dropdown 1:\n1. Name ranges matching each primary category (e.g. Name range for Asian countries `Asia`, European countries `Europe`).\n2. Set secondary cell Validation Source to: `=INDIRECT(A2)` (where A2 holds the region selection).",
      "vi": "### 1. Các Loại Tiêu Chí Xác Thực Dữ Liệu (Thẻ Data)\n- **List**: Tạo danh sách thả xuống trong ô. Nguồn có thể là danh sách phân tách bằng dấu phẩy (`\"Cao, Trung bình, Thấp\"`), vùng cố định (`=$K$2:$K$10`), hoặc tham chiếu vùng tràn mảng động (`=$G$2#`).\n- **Whole Number / Decimal**: Giới hạn số nguyên hoặc số thập phân trong khoảng (ví dụ: Chiết khấu từ 0.0 đến 0.5).\n- **Date / Time**: Giới hạn ngày tháng (ví dụ: `>=TODAY()`).\n- **Text Length**: Giới hạn độ dài ký tự (ví dụ: đúng 10 chữ số cho số điện thoại).\n- **Custom (Bằng Công Thức)**: Chấp nhận mọi công thức logic (ví dụ: `=ISNUMBER(B2)` hoặc `=COUNTIF($A$2:$A$100, A2)=1` để ngăn trùng lặp dữ liệu!).\n\n### 2. Ba Mức Độ Cảnh Báo Lỗi (Error Alert)\n1. **Stop (Dấu X Đỏ)**: Chặn hoàn toàn việc nhập sai; người dùng bắt buộc phải sửa đúng mới được tiếp tục.\n2. **Warning (Tam Giác Vàng)**: Cảnh báo với lựa chọn \"Yes/No\" cho phép ghi đè chấp nhận ngoại lệ.\n3. **Information (Chữ i Xanh)**: Thông báo cho người dùng biết và tự động chấp nhận dữ liệu.\n\n### 3. Menu Thả Xuống Phụ Thuộc Đa Tầng (Cascading Dropdowns với INDIRECT)\nĐể danh mục ở menu 2 tự động thay đổi theo lựa chọn ở menu 1:\n1. Đặt tên vùng (Named Range) trùng khớp với từng danh mục chính (ví dụ đặt tên vùng các nước Châu Á là `Asia`, Châu Âu là `Europe`).\n2. Đặt nguồn xác thực Validation của ô thứ 2 là: `=INDIRECT(A2)` (trong đó A2 là ô chứa lựa chọn khu vực)."
    },
    "syntax": "# Validation List Sources:\n\"Active, Pending, Suspended\"    -> Static comma list\n=$K$2:$K$20                     -> Range list\n=$G$2#                          -> Dynamic array spill source\n\n# Cascading Dependent List:\n=INDIRECT(A2)\n\n# Custom Uniqueness Rule:\n=COUNTIF($A$2:$A$500, A2) = 1",
    "examples": [
      {
        "title": {
          "en": "Enforcing Unique Employee IDs with Custom Validation",
          "vi": "Ngăn Trùng Lặp Mã Nhân Viên Bằng Custom Validation"
        },
        "code": "Applied to Range: A2:A500\nAllow: Custom\nFormula: =COUNTIF($A$2:$A$500, A2) = 1\nError Alert: Stop -> \"Duplicate ID! This Employee ID is already registered.\"",
        "description": {
          "en": "Prevents duplicate IDs from ever being entered into the column at the point of data entry.",
          "vi": "Ngăn chặn hoàn toàn việc nhập trùng mã ID vào cột ngay tại thời điểm gõ phím."
        }
      },
      {
        "title": {
          "en": "Dynamic Dropdown from Unique Spill Range",
          "vi": "Tạo Menu Thả Xuống Động Từ Vùng Tràn Unique"
        },
        "code": "In Cell G2: =SORT(UNIQUE(OrdersTable[Department]))\n\nValidation Source for Cell B2:\nAllow: List\nSource: =$G$2#",
        "description": {
          "en": "The dropdown automatically grows and alphabetizes as new departments appear in the database.",
          "vi": "Danh sách thả xuống tự động mở rộng và sắp xếp chữ cái khi có phòng ban mới xuất hiện trong cơ sở dữ liệu."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Pasting data into validated cells with standard Ctrl + V, which wipes out the Data Validation rules on those cells.",
          "vi": "Dán dữ liệu vào ô đã cài đặt xác thực bằng Ctrl + V thông thường, làm xóa mất quy tắc Data Validation trên các ô đó."
        },
        "correction": {
          "en": "Always use Paste Values (Ctrl + Shift + V or Alt + E + S + V) to preserve underlying cell validation rules.",
          "vi": "Luôn sử dụng Paste Values (Ctrl + Shift + V hoặc Alt + E + S + V) để giữ nguyên các quy tắc xác thực ô."
        }
      }
    ],
    "tips": [
      {
        "en": "Circle Invalid Data: On the Data Validation dropdown, click \"Circle Invalid Data\" to draw red visual audit rings around any pre-existing invalid entries.",
        "vi": "Khoanh tròn dữ liệu không hợp lệ: Chọn \"Circle Invalid Data\" để Excel vẽ vòng tròn đỏ trực quan quanh các ô vi phạm đã nhập trước đó."
      },
      {
        "en": "Input Message Tooltips: Use the \"Input Message\" tab to create hover tooltips showing format examples (e.g. \"Enter date as YYYY-MM-DD\").",
        "vi": "Mẹo hướng dẫn Input Message: Dùng thẻ \"Input Message\" để tạo ghi chú bật lên khi nhấp chuột hướng dẫn người dùng định dạng đúng."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l16_ex1",
      "type": "complete_code",
      "title": {
        "en": "Configure Custom Validation Formula for Positive Numbers",
        "vi": "Cấu Hình Công Thức Xác Thực Tùy Chỉnh Cho Số Dương"
      },
      "instruction": {
        "en": "Write the custom validation formula for cell B2 to ensure that entered values are numbers greater than zero.",
        "vi": "Viết công thức xác thực tùy chỉnh cho ô B2 để đảm bảo giá trị nhập vào là số lớn hơn 0."
      },
      "starterCode": "=AND(ISNUMBER(B2), ",
      "solutionCode": "=AND(ISNUMBER(B2), B2>0)",
      "expectedOutput": "=AND(ISNUMBER(B2), B2>0)",
      "hint": {
        "en": "Combine ISNUMBER(B2) and B2>0 inside AND().",
        "vi": "Kết hợp ISNUMBER(B2) và B2>0 bên trong hàm AND()."
      },
      "explanation": {
        "en": "=AND(ISNUMBER(B2), B2>0) restricts inputs strictly to positive numeric values.",
        "vi": "=AND(ISNUMBER(B2), B2>0) giới hạn dữ liệu nhập vào nghiêm ngặt là các số dương."
      }
    },
    {
      "id": "excel_l16_ex2",
      "type": "complete_code",
      "title": {
        "en": "Set Dynamic Spill List Source",
        "vi": "Thiết Lập Nguồn Danh Sách Tràn Động"
      },
      "instruction": {
        "en": "Specify the Data Validation List source formula referencing the entire dynamic spill range originating at cell $K$2.",
        "vi": "Chỉ định công thức nguồn List trong Data Validation tham chiếu toàn bộ vùng tràn mảng động bắt đầu từ ô $K$2."
      },
      "starterCode": "=$K$2",
      "solutionCode": "=$K$2#",
      "expectedOutput": "=$K$2#",
      "hint": {
        "en": "Append the hashtag spill operator (#) to $K$2.",
        "vi": "Thêm toán tử vùng tràn dấu thăng (#) vào sau $K$2."
      },
      "explanation": {
        "en": "=$K$2# instructs the dropdown to populate from the dynamic array output.",
        "vi": "=$K$2# hướng dẫn menu thả xuống lấy dữ liệu từ kết quả mảng động."
      }
    }
  ],
  "challenge": {
    "id": "excel_l16_challenge",
    "title": {
      "en": "Construct Cascading Dependent Dropdown Formula",
      "vi": "Xây Dựng Công Thức Menu Thả Xuống Phụ Thuộc Đa Tầng"
    },
    "description": {
      "en": "Construct the Data Validation List source formula for cell C2 so that its dropdown items dynamically evaluate the Named Range matching the category text selected in cell B2.",
      "vi": "Xây dựng công thức nguồn List Data Validation cho ô C2 để các mục trong danh sách thả xuống tự động lấy theo Tên Vùng (Named Range) khớp với danh mục được chọn ở ô B2."
    },
    "requirements": [
      {
        "en": "Use the INDIRECT function",
        "vi": "Sử dụng hàm INDIRECT"
      },
      {
        "en": "Pass relative cell reference B2",
        "vi": "Truyền tham chiếu ô tương đối B2"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=INDIRECT(B2)",
    "hints": [
      {
        "en": "Syntax: =INDIRECT(B2)",
        "vi": "Cú pháp: =INDIRECT(B2)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l16_q1",
      "type": "single_choice",
      "question": {
        "en": "Which Data Validation Error Alert style strictly prevents a user from submitting invalid data?",
        "vi": "Kiểu cảnh báo lỗi (Error Alert) nào trong Data Validation ngăn chặn hoàn toàn không cho người dùng lưu dữ liệu sai?"
      },
      "options": [
        {
          "en": "Stop (Red X icon)",
          "vi": "Stop (Biểu tượng dấu X đỏ)"
        },
        {
          "en": "Warning (Yellow triangle)",
          "vi": "Warning (Biểu tượng tam giác vàng)"
        },
        {
          "en": "Information (Blue i icon)",
          "vi": "Information (Biểu tượng chữ i xanh)"
        },
        {
          "en": "None of the above",
          "vi": "Không có kiểu nào ở trên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Stop is the only severity level that strictly halts execution and rejects invalid entries completely.",
        "vi": "Stop là mức độ duy nhất chặn đứng việc thực thi và từ chối hoàn toàn các mục nhập không hợp lệ."
      },
      "difficulty": "easy",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q2",
      "type": "single_choice",
      "question": {
        "en": "What function is used to create cascading dependent dropdown lists in Excel?",
        "vi": "Hàm nào được sử dụng để tạo danh sách thả xuống phụ thuộc đa tầng trong Excel?"
      },
      "options": [
        {
          "en": "`INDIRECT` (e.g. `=INDIRECT(A2)`)",
          "vi": "`INDIRECT` (ví dụ `=INDIRECT(A2)`)"
        },
        {
          "en": "`DEPENDENT()`",
          "vi": "`DEPENDENT()`"
        },
        {
          "en": "`LOOKUP()`",
          "vi": "`LOOKUP()`"
        },
        {
          "en": "`CASCADE()`",
          "vi": "`CASCADE()`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "INDIRECT converts a text string into a live range reference pointing to a Named Range of matching name.",
        "vi": "Hàm INDIRECT chuyển đổi chuỗi văn bản thành một tham chiếu dải ô thực tế trỏ đến Tên Vùng (Named Range) trùng tên."
      },
      "difficulty": "medium",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q3",
      "type": "single_choice",
      "question": {
        "en": "How can you enforce that all values entered in column A must be unique using Data Validation?",
        "vi": "Làm thế nào để bắt buộc tất cả các giá trị nhập vào cột A phải là duy nhất bằng Data Validation?"
      },
      "options": [
        {
          "en": "Allow: Custom -> Formula: `=COUNTIF($A$2:$A$100, A2) = 1`",
          "vi": "Allow: Custom -> Công thức: `=COUNTIF($A$2:$A$100, A2) = 1`"
        },
        {
          "en": "Select \"Unique\" from the Allow dropdown",
          "vi": "Chọn \"Unique\" từ menu Allow"
        },
        {
          "en": "Use `=UNIQUE(A2)`",
          "vi": "Dùng `=UNIQUE(A2)`"
        },
        {
          "en": "Data validation cannot enforce uniqueness",
          "vi": "Data validation không thể bắt buộc tính duy nhất"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The custom formula `=COUNTIF($A$2:$A$100, A2) = 1` checks that the count of that value in the column is exactly 1.",
        "vi": "Công thức tùy chỉnh `=COUNTIF($A$2:$A$100, A2) = 1` kiểm tra số lần xuất hiện của giá trị đó trong cột đúng bằng 1."
      },
      "difficulty": "medium",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q4",
      "type": "single_choice",
      "question": {
        "en": "What feature visually circles cells that contain invalid data according to current validation rules?",
        "vi": "Tính năng nào vẽ vòng tròn trực quan quanh các ô chứa dữ liệu không hợp lệ theo quy tắc xác thực hiện tại?"
      },
      "options": [
        {
          "en": "Data -> Data Validation -> Circle Invalid Data",
          "vi": "Data -> Data Validation -> Circle Invalid Data"
        },
        {
          "en": "Conditional Formatting -> Red Rings",
          "vi": "Conditional Formatting -> Red Rings"
        },
        {
          "en": "Spell Check",
          "vi": "Spell Check"
        },
        {
          "en": "Review -> Audit Circles",
          "vi": "Review -> Audit Circles"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Circle Invalid Data scans the worksheet and highlights non-compliant pre-existing data with red oval rings.",
        "vi": "Circle Invalid Data quét trang tính và khoanh vùng các dữ liệu không hợp lệ có từ trước bằng vòng tròn đỏ."
      },
      "difficulty": "easy",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q5",
      "type": "single_choice",
      "question": {
        "en": "How do you link a Data Validation dropdown to a dynamic array formula spilling from cell G2?",
        "vi": "Làm thế nào để liên kết một menu thả xuống Data Validation với công thức mảng động tràn từ ô G2?"
      },
      "options": [
        {
          "en": "Set Source to `=$G$2#`",
          "vi": "Đặt Source thành `=$G$2#`"
        },
        {
          "en": "Set Source to `=$G$2:SPILL`",
          "vi": "Đặt Source thành `=$G$2:SPILL`"
        },
        {
          "en": "Set Source to `=G2:G100`",
          "vi": "Đặt Source thành `=G2:G100`"
        },
        {
          "en": "Type `=ARRAY(G2)`",
          "vi": "Gõ `=ARRAY(G2)`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Using the spill operator (=$G$2#) ensures the dropdown dynamically resizes as the spill range expands.",
        "vi": "Sử dụng toán tử vùng tràn (=$G$2#) đảm bảo menu thả xuống tự động co giãn khi vùng tràn mảng mở rộng."
      },
      "difficulty": "easy",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q6",
      "type": "true_false",
      "question": {
        "en": "True or False: Standard copy-and-paste (Ctrl + V) from another application can overwrite and destroy Data Validation rules on target cells.",
        "vi": "Đúng hay Sai: Thao tác sao chép và dán thông thường (Ctrl + V) từ ứng dụng khác có thể ghi đè và phá hủy các quy tắc Data Validation trên các ô đích."
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
        "en": "True. Standard pasting pastes formats and cell metadata, replacing existing data validation rules. Use Paste Values instead.",
        "vi": "Đúng. Dán thông thường sẽ dán cả định dạng và siêu dữ liệu ô, xóa mất quy tắc xác thực có sẵn. Hãy dùng Paste Values thay thế."
      },
      "difficulty": "medium",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q7",
      "type": "single_choice",
      "question": {
        "en": "What tab in the Data Validation dialog is used to display helpful instructions when a user selects a cell?",
        "vi": "Thẻ nào trong hộp thoại Data Validation được dùng để hiển thị hướng dẫn hữu ích khi người dùng chọn ô?"
      },
      "options": [
        {
          "en": "Input Message",
          "vi": "Input Message"
        },
        {
          "en": "Settings",
          "vi": "Settings"
        },
        {
          "en": "Error Alert",
          "vi": "Error Alert"
        },
        {
          "en": "Help Tooltip",
          "vi": "Help Tooltip"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The Input Message tab configures an in-place tooltip that pops up whenever the cell receives focus.",
        "vi": "Thẻ Input Message cấu hình ghi chú hướng dẫn bật lên tại chỗ bất cứ khi nào ô được nhấp chọn."
      },
      "difficulty": "easy",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q8",
      "type": "single_choice",
      "question": {
        "en": "Which setting in the Data Validation dialog allows leaving the cell empty without triggering an error alert?",
        "vi": "Tùy chọn nào trong hộp thoại Data Validation cho phép để trống ô mà không bị báo lỗi?"
      },
      "options": [
        {
          "en": "Ignore blank checkbox checked",
          "vi": "Tích chọn vào ô Ignore blank"
        },
        {
          "en": "Allow: Any Value",
          "vi": "Allow: Any Value"
        },
        {
          "en": "Clear All",
          "vi": "Clear All"
        },
        {
          "en": "Stop on Error",
          "vi": "Stop on Error"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Checking \"Ignore blank\" ensures that empty cells are considered valid and do not trigger validation warnings.",
        "vi": "Tích chọn \"Ignore blank\" đảm bảo các ô trống được coi là hợp lệ và không kích hoạt cảnh báo."
      },
      "difficulty": "easy",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q9",
      "type": "single_choice",
      "question": {
        "en": "What custom formula restricts user input in cell A1 to valid email addresses containing an \"@\" sign and a \".\" period?",
        "vi": "Công thức tùy chỉnh nào giới hạn người dùng nhập vào ô A1 phải là địa chỉ email hợp lệ có chứa ký tự \"@\" và dấu chấm \".\"?"
      },
      "options": [
        {
          "en": "`=AND(ISNUMBER(FIND(\"@\", A1)), ISNUMBER(FIND(\".\", A1)))`",
          "vi": "`=AND(ISNUMBER(FIND(\"@\", A1)), ISNUMBER(FIND(\".\", A1)))`"
        },
        {
          "en": "`=EMAIL(A1)`",
          "vi": "`=EMAIL(A1)`"
        },
        {
          "en": "`=CHECK(A1, \"@.\")`",
          "vi": "`=CHECK(A1, \"@.\")`"
        },
        {
          "en": "`=ISMAIL(A1)`",
          "vi": "`=ISMAIL(A1)`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "FIND returns a number if the character exists, and ISNUMBER converts that to a boolean validation check.",
        "vi": "Hàm FIND trả về một số nếu ký tự tồn tại và ISNUMBER chuyển đổi kết quả đó thành giá trị logic để kiểm tra xác thực."
      },
      "difficulty": "hard",
      "topicId": "excel_data_validation"
    },
    {
      "id": "excel_l16_q10",
      "type": "single_choice",
      "question": {
        "en": "Can a Data Validation List source be entered directly as comma-separated values like `\"Red, Green, Blue\"`?",
        "vi": "Nguồn danh sách Data Validation List có thể được nhập trực tiếp dưới dạng các giá trị phân tách bằng dấu phẩy như `\"Red, Green, Blue\"` không?"
      },
      "options": [
        {
          "en": "Yes, directly typed into the Source input field",
          "vi": "Có, gõ trực tiếp vào ô nhập Source"
        },
        {
          "en": "No, it must always reference worksheet cells",
          "vi": "Không, bắt buộc luôn phải tham chiếu đến các ô trang tính"
        },
        {
          "en": "Only numbers can be entered directly",
          "vi": "Chỉ có số mới được nhập trực tiếp"
        },
        {
          "en": "Only if enclosed in curly brackets {}",
          "vi": "Chỉ khi đặt trong ngoặc nhọn {}"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Data Validation allows typing static comma-delimited strings directly into the Source box for simple dropdowns.",
        "vi": "Data Validation cho phép gõ trực tiếp các chuỗi phân tách bằng dấu phẩy vào ô Source cho các menu thả xuống đơn giản."
      },
      "difficulty": "easy",
      "topicId": "excel_data_validation"
    }
  ]
};
export default lesson16;
