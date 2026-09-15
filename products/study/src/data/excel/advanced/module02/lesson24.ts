import { Lesson } from '../../../../types';

export const lesson24: Lesson = {
  "id": "excel_lesson_24",
  "order": 24,
  "moduleId": "excel_mod_6",
  "courseId": "excel",
  "levelId": "advanced",
  "topicId": "excel_automation",
  "title": {
    "en": "Workbook Automation, Macros & Modern Extensibility: Legacy VBA vs Cloud Office Scripts",
    "vi": "Tự Động Hóa Bảng Tính, Macros & Mở Rộng Hiện Đại: VBA Cổ Điển vs Office Scripts Điện Toán Đám Mây"
  },
  "summary": {
    "en": "Navigate the complete spreadsheet automation landscape: comparing desktop-bound legacy VBA macros with modern cross-platform cloud Office Scripts (TypeScript), recording macros, understanding the Excel Object Model, debugging script execution, and integrating automated workflows with Power Automate.",
    "vi": "Bao quát toàn diện bức tranh tự động hóa bảng tính: so sánh macro VBA cổ điển trên máy tính bàn với Office Scripts hiện đại đa nền tảng (TypeScript), ghi macro tự động, làm chủ Mô hình Đối tượng Excel Object Model, gỡ lỗi tập lệnh và tích hợp quy trình tự động hóa với Power Automate."
  },
  "learn": {
    "introduction": {
      "en": "Repetitive daily tasks—formatting weekly reports, exporting PDFs, emailing summaries, and applying data cleansers—should never be performed manually. Excel provides two distinct automation pathways: legacy Visual Basic for Applications (VBA) for traditional desktop power users, and modern cloud-native Office Scripts (powered by TypeScript) that run across Web, Mac, Windows, and automated Power Automate cloud triggers.",
      "vi": "Các công việc lặp đi lặp lại hàng ngày—định dạng báo cáo tuần, xuất file PDF, gửi email tóm tắt và làm sạch dữ liệu—không bao giờ nên làm thủ công. Excel cung cấp hai con đường tự động hóa riêng biệt: Visual Basic for Applications (VBA) cổ điển dành cho người dùng máy tính để bàn truyền thống và Office Scripts hiện đại trên nền tảng đám mây (sử dụng TypeScript) chạy mượt mà trên Web, Mac, Windows và tích hợp với Power Automate."
    },
    "conceptExplanation": {
      "en": "### 1. Automation Comparison: VBA vs Modern Office Scripts\n| Feature | Legacy VBA Macros | Modern Office Scripts |\n| :--- | :--- | :--- |\n| **Language** | Visual Basic for Applications (VBA) | **TypeScript / JavaScript** |\n| **Platform** | Windows & Mac Desktop only | **Cross-Platform** (Excel Web, Windows, Mac, iPad) |\n| **File Format** | Macro-enabled (`.xlsm`, `.xlsb`) | Standard clean files (`.xlsx`)! |\n| **Cloud / Power Automate** | No native cloud execution | **Full Power Automate Cloud Flow Integration** |\n| **Security** | Blocked by corporate IT firewalls | **Secure Cloud Sandbox** managed by Microsoft 365 |\n\n### 2. The Excel Object Model Hierarchy\nBoth VBA and TypeScript interact with Excel through structured hierarchical object models:\n- **Application** -> **Workbooks** -> **Worksheets** -> **Range / Tables** -> **Cells / Formats**\n\n### 3. Writing Modern Office Scripts (Automate Tab)\nOffice Scripts uses TypeScript with clean async/sync APIs:\n```typescript\nfunction main(workbook: ExcelScript.Workbook) {\n  const sheet = workbook.getActiveWorksheet();\n  const table = sheet.getTable(\"SalesTable\");\n  \n  // Apply formatting and add a summary row\n  table.setShowTotals(true);\n  const revenueCol = table.getColumnByName(\"Revenue\");\n  revenueCol.getRangeBetweenHeaderAndTotal().setNumberFormat(\"$#,##0.00\");\n}\n```\n\n### 4. Power Automate Cloud Integration\nWith Office Scripts, you can trigger Excel scripts automatically:\n- Every night at 12:00 AM (Scheduled Flow).\n- When a new customer order email arrives in Outlook.\n- When a Microsoft Form survey is submitted.",
      "vi": "### 1. So Sánh Hai Nền Tảng Tự Động Hóa: VBA vs Office Scripts\n| Đặc Tính | Macro VBA Cổ Điển | Office Scripts Hiện Đại |\n| :--- | :--- | :--- |\n| **Ngôn ngữ** | Visual Basic for Applications (VBA) | **TypeScript / JavaScript** |\n| **Nền tảng** | Chỉ Windows & Mac Desktop | **Đa nền tảng** (Excel Web, Windows, Mac, iPad) |\n| **Định dạng file** | Bắt buộc tệp chứa macro (`.xlsm`) | Tệp tiêu chuẩn sạch sẽ (`.xlsx`)! |\n| **Điện toán đám mây** | Không chạy được trên đám mây | **Tích hợp sâu với Power Automate Cloud** |\n| **Bảo mật** | Thường bị tường lửa IT doanh nghiệp chặn | **Môi trường Sandbox bảo mật** của Microsoft 365 |\n\n### 2. Phân Cấp Mô Hình Đối Tượng (Excel Object Model)\nCả VBA và TypeScript đều tương tác với Excel qua mô hình đối tượng có cấu trúc phân cấp:\n- **Application** (Ứng dụng) -> **Workbooks** (Sổ làm việc) -> **Worksheets** (Trang tính) -> **Range / Tables** (Dải ô / Bảng) -> **Cells / Formats** (Ô / Định dạng)\n\n### 3. Viết Mã Office Scripts Hiện Đại (Thẻ Automate)\nOffice Scripts sử dụng TypeScript với các API rõ ràng, an toàn kiểu:\n```typescript\nfunction main(workbook: ExcelScript.Workbook) {\n  const sheet = workbook.getActiveWorksheet();\n  const table = sheet.getTable(\"SalesTable\");\n  \n  // Bật dòng tổng kết và định dạng tiền tệ\n  table.setShowTotals(true);\n  const revenueCol = table.getColumnByName(\"Revenue\");\n  revenueCol.getRangeBetweenHeaderAndTotal().setNumberFormat(\"$#,##0.00\");\n}\n```\n\n### 4. Tự Động Hóa Không Chạm Với Power Automate Cloud\nVới Office Scripts, bạn có thể kích hoạt chạy script Excel hoàn toàn tự động:\n- Vào 0h mỗi đêm theo lịch định kỳ (Scheduled Flow).\n- Khi có email đơn hàng mới gửi đến hộp thư Outlook.\n- Khi có biểu mẫu Microsoft Forms mới được gửi lên."
    },
    "syntax": "# VBA Macro Subroutine (Legacy):\nSub FormatReport()\n  Dim ws As Worksheet\n  Set ws = ActiveSheet\n  ws.Range(\"A1:E1\").Font.Bold = True\n  ws.Range(\"A1:E1\").Interior.Color = RGB(220, 230, 242)\nEnd Sub\n\n# Modern Office Script (TypeScript):\nfunction main(workbook: ExcelScript.Workbook) {\n  const sheet = workbook.getActiveWorksheet();\n  const headerRange = sheet.getRange(\"A1:E1\");\n  headerRange.getFormat().getFont().setBold(true);\n  headerRange.getFormat().getFill().setColor(\"#DCE6F2\");\n}",
    "examples": [
      {
        "title": {
          "en": "Automated Daily Table Formatting Office Script",
          "vi": "Tập Lệnh Office Script Tự Động Định Dạng Bảng Hàng Ngày"
        },
        "code": "function main(workbook: ExcelScript.Workbook) {\n  const selectedSheet = workbook.getActiveWorksheet();\n  const dataRange = selectedSheet.getUsedRange();\n  \n  // Auto-fit all column widths for professional presentation\n  dataRange.getFormat().autofitColumns();\n  \n  // Apply alternating zebra stripe formatting\n  selectedSheet.addTable(dataRange.getAddress(), true).setPredefinedTableStyle(\"TableStyleMedium9\");\n}",
        "description": {
          "en": "A cloud-ready TypeScript script that can be triggered directly in Excel on the web or via Power Automate.",
          "vi": "Tập lệnh TypeScript sẵn sàng trên đám mây chạy trực tiếp trên Excel web hoặc qua luồng Power Automate."
        }
      },
      {
        "title": {
          "en": "End-to-End Enterprise Cloud Workflow with Power Automate",
          "vi": "Quy Trình Tự Động Hóa Đám Mây Doanh Nghiệp Với Power Automate"
        },
        "code": "Workflow Architecture:\n1. Trigger: Scheduled daily at 6:00 AM\n2. Step 1: Power Automate retrieves raw invoice CSV from SharePoint\n3. Step 2: Power Automate executes Office Script 'CleanAndSummarize' inside Excel on the Web\n4. Step 3: Office Script outputs top KPI metrics (TotalRevenue, NewClients)\n5. Step 4: Power Automate posts executive summary card to Microsoft Teams!",
        "description": {
          "en": "Demonstrates zero-touch cloud automation combining Office Scripts, Excel on the Web, and Power Automate.",
          "vi": "Minh họa quy trình tự động hóa không chạm kết hợp Office Scripts, Excel Online và Power Automate."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Saving a VBA macro in a standard .xlsx workbook, which permanently deletes all VBA code upon saving.",
          "vi": "Lưu macro VBA vào tệp .xlsx thông thường, khiến toàn bộ mã VBA bị xóa sạch vĩnh viễn khi lưu."
        },
        "correction": {
          "en": "Workbooks containing legacy VBA macros MUST be saved as Excel Macro-Enabled Workbook (*.xlsm). Office Scripts, by contrast, work in clean standard .xlsx files.",
          "vi": "Sổ làm việc chứa macro VBA BẮT BUỘC phải lưu ở định dạng (*.xlsm). Ngược lại, Office Scripts hoạt động trên tệp .xlsx tiêu chuẩn."
        }
      }
    ],
    "tips": [
      {
        "en": "The Automate Tab Action Recorder: In Excel on the Web or modern Desktop, go to the Automate tab and click \"Record Actions\" to automatically generate clean TypeScript code as you click!",
        "vi": "Trình ghi Action Recorder trên thẻ Automate: Trên thẻ Automate, bấm \"Record Actions\" để Excel tự động tạo mã TypeScript sạch khi bạn thao tác chuột!"
      },
      {
        "en": "Button Assignment: In Office Scripts, click \"Add Button in Workbook\" to place a clickable execution button directly onto the sheet grid for colleagues.",
        "vi": "Tạo nút bấm chạy script: Trong Office Scripts, bấm \"Add Button in Workbook\" để đặt nút bấm thực thi trực tiếp trên trang tính cho đồng nghiệp sử dụng."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l24_ex1",
      "type": "complete_code",
      "title": {
        "en": "Identify File Extension for VBA Macro Workbooks",
        "vi": "Xác Định Đuôi Tệp Cho Sổ Làm Việc Chứa Macro VBA"
      },
      "instruction": {
        "en": "Type the standard file extension required to save Excel workbooks containing legacy VBA macros (format: .xlsm).",
        "vi": "Gõ đuôi tệp mở rộng chuẩn bắt buộc để lưu sổ làm việc Excel có chứa macro VBA cổ điển (định dạng: .xlsm)."
      },
      "starterCode": ".",
      "solutionCode": ".xlsm",
      "expectedOutput": ".xlsm",
      "hint": {
        "en": ".xlsm (Excel Macro-Enabled Workbook)",
        "vi": ".xlsm (Excel Macro-Enabled Workbook)"
      },
      "explanation": {
        "en": ".xlsm is required for legacy VBA macros to prevent code loss upon saving.",
        "vi": ".xlsm là định dạng bắt buộc cho macro VBA để không bị mất mã khi lưu."
      }
    },
    {
      "id": "excel_l24_ex2",
      "type": "complete_code",
      "title": {
        "en": "Identify Programming Language Powering Office Scripts",
        "vi": "Xác Định Ngôn Ngữ Lập Trình Vận Hành Office Scripts"
      },
      "instruction": {
        "en": "Type the name of the modern typed programming language used to author Microsoft 365 Office Scripts (format: TypeScript).",
        "vi": "Gõ tên của ngôn ngữ lập trình định kiểu hiện đại được dùng để viết Microsoft 365 Office Scripts (định dạng: TypeScript)."
      },
      "starterCode": "Type",
      "solutionCode": "TypeScript",
      "expectedOutput": "TypeScript",
      "hint": {
        "en": "TypeScript.",
        "vi": "TypeScript."
      },
      "explanation": {
        "en": "Office Scripts is built on TypeScript / JavaScript.",
        "vi": "Office Scripts được xây dựng trên nền tảng TypeScript / JavaScript."
      }
    }
  ],
  "challenge": {
    "id": "excel_l24_challenge",
    "title": {
      "en": "Specify Office Script Entry Function Signature",
      "vi": "Chỉ Định Chữ Ký Hàm Khởi Chạy Của Office Script"
    },
    "description": {
      "en": "Write the standard entry-point function declaration for a Microsoft 365 Office Script that accepts the workbook parameter of type ExcelScript.Workbook (type \"function main(workbook: ExcelScript.Workbook)\").",
      "vi": "Viết khai báo hàm khởi chạy tiêu chuẩn cho một tập lệnh Microsoft 365 Office Script nhận tham số workbook có kiểu ExcelScript.Workbook (gõ \"function main(workbook: ExcelScript.Workbook)\")."
    },
    "requirements": [
      {
        "en": "Type exact string \"function main(workbook: ExcelScript.Workbook)\"",
        "vi": "Gõ chính xác chuỗi \"function main(workbook: ExcelScript.Workbook)\""
      }
    ],
    "starterCode": "function main(",
    "solutionCode": "function main(workbook: ExcelScript.Workbook)",
    "hints": [
      {
        "en": "function main(workbook: ExcelScript.Workbook)",
        "vi": "function main(workbook: ExcelScript.Workbook)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l24_q1",
      "type": "single_choice",
      "question": {
        "en": "What is the primary architectural advantage of modern `Office Scripts` over legacy `VBA Macros`?",
        "vi": "Ưu thế kiến trúc cốt lõi của `Office Scripts` hiện đại so với `Macro VBA` cổ điển là gì?"
      },
      "options": [
        {
          "en": "Office Scripts are cloud-native and written in TypeScript, running seamlessly across Excel Web, Mac, Windows, and Power Automate cloud flows without requiring macro-enabled file extensions",
          "vi": "Office Scripts chạy trên nền tảng đám mây và được viết bằng TypeScript, hoạt động mượt mà trên Excel Web, Mac, Windows và Power Automate mà không cần đổi đuôi tệp macro"
        },
        {
          "en": "VBA is faster",
          "vi": "VBA chạy nhanh hơn"
        },
        {
          "en": "Office Scripts only work on Commodore 64",
          "vi": "Office Scripts chỉ chạy trên Commodore 64"
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
        "en": "Office Scripts enable cross-platform, cloud-first automation and Power Automate integration using modern TypeScript.",
        "vi": "Office Scripts mang lại khả năng tự động hóa đa nền tảng, ưu tiên đám mây và tích hợp Power Automate bằng TypeScript hiện đại."
      },
      "difficulty": "easy",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q2",
      "type": "single_choice",
      "question": {
        "en": "What happens if you save an Excel workbook containing VBA macros as a standard `.xlsx` file?",
        "vi": "Điều gì xảy ra nếu bạn lưu một sổ làm việc Excel chứa macro VBA dưới dạng tệp `.xlsx` tiêu chuẩn?"
      },
      "options": [
        {
          "en": "Excel permanently removes and deletes all VBA macros and code modules upon saving",
          "vi": "Excel sẽ gỡ bỏ và xóa sạch vĩnh viễn tất cả các macro VBA và module mã khi lưu"
        },
        {
          "en": "The file converts to TypeScript automatically",
          "vi": "Tệp tự động chuyển đổi sang TypeScript"
        },
        {
          "en": "The computer restarts",
          "vi": "Máy tính khởi động lại"
        },
        {
          "en": "Nothing, macros are preserved",
          "vi": "Không có gì, macro vẫn được giữ nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The standard .xlsx format cannot store macros; saving to .xlsx strips all VBA projects. Macro workbooks must use .xlsm.",
        "vi": "Định dạng .xlsx tiêu chuẩn không thể lưu macro; lưu sang .xlsx sẽ xóa sạch toàn bộ dự án VBA. Phải dùng định dạng .xlsm."
      },
      "difficulty": "easy",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q3",
      "type": "single_choice",
      "question": {
        "en": "Which programming language powers Microsoft 365 Office Scripts?",
        "vi": "Ngôn ngữ lập trình nào vận hành Microsoft 365 Office Scripts?"
      },
      "options": [
        {
          "en": "TypeScript (and JavaScript)",
          "vi": "TypeScript (và JavaScript)"
        },
        {
          "en": "Visual Basic for Applications (VBA)",
          "vi": "Visual Basic for Applications (VBA)"
        },
        {
          "en": "C++",
          "vi": "C++"
        },
        {
          "en": "PHP",
          "vi": "PHP"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Office Scripts is built on TypeScript, offering strong type safety and modern JavaScript language features.",
        "vi": "Office Scripts được xây dựng trên nền tảng TypeScript, mang lại tính an toàn kiểu dữ liệu và các tính năng JavaScript hiện đại."
      },
      "difficulty": "easy",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q4",
      "type": "single_choice",
      "question": {
        "en": "How can you trigger an Office Script to run automatically without opening Excel manually?",
        "vi": "Làm thế nào để kích hoạt chạy một Office Script hoàn toàn tự động mà không cần mở Excel thủ công?"
      },
      "options": [
        {
          "en": "By integrating the script into a scheduled or event-driven Microsoft Power Automate cloud flow",
          "vi": "Bằng cách tích hợp tập lệnh vào một luồng đám mây Microsoft Power Automate chạy theo lịch hoặc sự kiện"
        },
        {
          "en": "By leaving the computer on all night",
          "vi": "Bằng cách bật máy tính cả đêm"
        },
        {
          "en": "By setting an alarm on a smartphone",
          "vi": "Bằng cách đặt báo thức trên điện thoại"
        },
        {
          "en": "Office Scripts cannot run without human clicks",
          "vi": "Office Scripts không thể chạy nếu không có người nhấp chuột"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Power Automate contains native connectors to execute Office Scripts in the cloud automatically on schedules or webhooks.",
        "vi": "Power Automate có sẵn các cổng kết nối để thực thi Office Scripts trên đám mây tự động theo lịch trình hoặc sự kiện."
      },
      "difficulty": "medium",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q5",
      "type": "single_choice",
      "question": {
        "en": "What is the top-level root object in the Excel Object Model hierarchy?",
        "vi": "Đối tượng gốc cao nhất trong hệ thống phân cấp Mô hình Đối tượng Excel (Object Model) là gì?"
      },
      "options": [
        {
          "en": "`Application` (the Excel program itself)",
          "vi": "`Application` (chính ứng dụng chương trình Excel)"
        },
        {
          "en": "`Range`",
          "vi": "`Range`"
        },
        {
          "en": "`Cell`",
          "vi": "`Cell`"
        },
        {
          "en": "`Font`",
          "vi": "`Font`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Application is the root container containing Workbooks, which contain Worksheets, which contain Ranges.",
        "vi": "Application là vùng chứa gốc chứa các Workbook, trong Workbook chứa các Worksheet, và trong Worksheet chứa các Range."
      },
      "difficulty": "easy",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q6",
      "type": "true_false",
      "question": {
        "en": "True or False: Modern Office Scripts can run seamlessly in Excel for the Web inside any modern browser.",
        "vi": "Đúng hay Sai: Office Scripts hiện đại có thể chạy mượt mà trên Excel for the Web bên trong bất kỳ trình duyệt nào."
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
        "en": "True. Office Scripts was designed web-first, enabling full browser automation unlike desktop-locked legacy VBA.",
        "vi": "Đúng. Office Scripts được thiết kế ưu tiên web, cho phép tự động hóa hoàn toàn trên trình duyệt khác với VBA chỉ chạy trên máy tính bàn."
      },
      "difficulty": "easy",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q7",
      "type": "single_choice",
      "question": {
        "en": "What feature on the Automate tab records your live spreadsheet actions and writes TypeScript code automatically?",
        "vi": "Tính năng nào trên thẻ Automate ghi lại trực tiếp các thao tác bảng tính của bạn và tự động sinh mã TypeScript?"
      },
      "options": [
        {
          "en": "Record Actions",
          "vi": "Record Actions"
        },
        {
          "en": "Screen Capture",
          "vi": "Screen Capture"
        },
        {
          "en": "Code Snippets",
          "vi": "Code Snippets"
        },
        {
          "en": "AutoType",
          "vi": "AutoType"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Record Actions watches user clicks and formatting choices, instantly generating TypeScript Office Script code.",
        "vi": "Record Actions theo dõi các thao tác nhấp chuột và định dạng của người dùng, ngay lập tức tạo ra mã TypeScript Office Script."
      },
      "difficulty": "easy",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q8",
      "type": "single_choice",
      "question": {
        "en": "How do you create an interactive button on the spreadsheet grid that coworkers can click to run an Office Script?",
        "vi": "Làm thế nào để tạo một nút bấm tương tác trên lưới bảng tính để đồng nghiệp có thể nhấp vào chạy Office Script?"
      },
      "options": [
        {
          "en": "Open Script details -> Click \"Add Button in Workbook\"",
          "vi": "Mở chi tiết Script -> Bấm \"Add Button in Workbook\""
        },
        {
          "en": "Insert a 3D Shape and write a letter",
          "vi": "Chèn một hình vẽ 3D và viết một lá thư"
        },
        {
          "en": "Buttons are not supported in Excel",
          "vi": "Nút bấm không được hỗ trợ trong Excel"
        },
        {
          "en": "Draw a circle in Paint",
          "vi": "Vẽ hình tròn trong Paint"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Office Scripts features an \"Add Button in Workbook\" command that embeds an intuitive execution trigger directly on the active sheet.",
        "vi": "Office Scripts có tính năng \"Add Button in Workbook\" gắn trực tiếp nút bấm thực thi trực quan lên trang tính đang mở."
      },
      "difficulty": "easy",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q9",
      "type": "single_choice",
      "question": {
        "en": "Why do modern enterprise security teams frequently disable legacy VBA macros while allowing Office Scripts?",
        "vi": "Tại sao các đội ngũ bảo mật doanh nghiệp hiện đại thường chặn macro VBA cổ điển nhưng lại cho phép Office Scripts?"
      },
      "options": [
        {
          "en": "VBA macros have unrestricted access to local operating system files and Windows APIs (making them a major malware vector), whereas Office Scripts run in a secure, sandboxed cloud environment",
          "vi": "Macro VBA có toàn quyền truy cập tệp hệ điều hành cục bộ và Windows API (khiến chúng là nguồn lây mã độc lớn), trong khi Office Scripts chạy trong môi trường sandbox đám mây an toàn"
        },
        {
          "en": "VBA is written in Japanese",
          "vi": "VBA được viết bằng tiếng Nhật"
        },
        {
          "en": "Office Scripts cost $1,000 per click",
          "vi": "Office Scripts tốn 1.000$ cho mỗi lượt bấm"
        },
        {
          "en": "There is no security difference",
          "vi": "Không có sự khác biệt về bảo mật"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "VBA's deep local OS access makes it vulnerable to macro viruses. Office Scripts operate within safe Microsoft 365 tenant sandboxes.",
        "vi": "Khả năng can thiệp sâu vào hệ điều hành của VBA khiến nó dễ bị lợi dụng làm virus macro. Office Scripts hoạt động an toàn trong sandbox của Microsoft 365."
      },
      "difficulty": "hard",
      "topicId": "excel_automation"
    },
    {
      "id": "excel_l24_q10",
      "type": "single_choice",
      "question": {
        "en": "What is the standard entry function signature in an Office Script?",
        "vi": "Chữ ký hàm khởi chạy tiêu chuẩn trong một tập lệnh Office Script là gì?"
      },
      "options": [
        {
          "en": "`function main(workbook: ExcelScript.Workbook)`",
          "vi": "`function main(workbook: ExcelScript.Workbook)`"
        },
        {
          "en": "`Sub Start()`",
          "vi": "`Sub Start()`"
        },
        {
          "en": "`void RunScript()`",
          "vi": "`void RunScript()`"
        },
        {
          "en": "`export default run`",
          "vi": "`export default run`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Every Office Script executes from the `main` function, receiving the root `workbook` parameter to manipulate the active document.",
        "vi": "Mọi Office Script đều khởi chạy từ hàm `main`, nhận tham số gốc `workbook` để tương tác với tài liệu đang mở."
      },
      "difficulty": "easy",
      "topicId": "excel_automation"
    }
  ]
};
export default lesson24;
