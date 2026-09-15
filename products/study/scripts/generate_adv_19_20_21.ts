import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const advMod01Dir = path.join(process.cwd(), 'src/data/excel/advanced/module01');
fs.mkdirSync(advMod01Dir, { recursive: true });

function saveLesson(filename: string, varName: string, lesson: Lesson) {
  const code = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lesson, null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(path.join(advMod01Dir, filename), code, 'utf8');
  console.log(`Saved ${filename} (${lesson.id})`);
}

// =========================================================================
// LESSON 19: Power Query Fundamentals (ETL Architecture)
// New ID: excel_lesson_power_query
// =========================================================================
export const lesson19: Lesson = {
  id: 'excel_lesson_power_query',
  order: 19,
  courseId: 'excel',
  levelId: 'advanced',
  topicId: 'excel_power_query',
  title: {
    en: 'Power Query & Modern Data Transformation: Extract, Transform & Load (ETL)',
    vi: 'Power Query & Chuyển Đổi Dữ Liệu Hiện Đại: Trích Xuất, Biến Đổi & Nạp Dữ Liệu (ETL)'
  },
  summary: {
    en: 'Automate tedious data cleaning pipelines forever: connecting to external CSVs, folders, and SQL databases, the Power Query Editor interface, Applied Steps audit log, unpivoting cross-tabulated reports, merging relational tables (Joins), appending files, and one-click data refreshes.',
    vi: 'Tự động hóa vĩnh viễn các quy trình làm sạch dữ liệu thủ công: kết nối với CSV, thư mục tệp và cơ sở dữ liệu SQL, giao diện Power Query Editor, nhật ký bước thực hiện Applied Steps, chuyển đổi Unpivot báo cáo ma trận về dạng bảng chuẩn, hợp nhất bảng (Joins), nối dữ liệu Append và làm mới chỉ với một cú nhấp chuột.'
  },
  learn: {
    introduction: {
      en: 'Data professionals spend up to 80% of their working hours manually cleaning, copying, and reshaping messy spreadsheets. Power Query (Get & Transform Data) is Excel\'s built-in, industrial-grade ETL engine. Every transformation step you perform is recorded as a reusable script in the M language, transforming hours of repetitive manual data prep into a single click of the "Refresh" button.',
      vi: 'Các chuyên gia phân tích dữ liệu thường mất tới 80% thời gian chỉ để làm sạch, sao chép và định dạng lại các bảng tính lộn xộn. Power Query (Get & Transform Data) là công cụ ETL chuẩn công nghiệp được tích hợp sẵn trong Excel. Mọi bước xử lý bạn thực hiện đều được lưu lại thành quy trình tự động hóa bằng ngôn ngữ M, biến hàng giờ dọn dẹp dữ liệu thủ công thành một cú bấm nút "Refresh" duy nhất.'
    },
    conceptExplanation: {
      en: `### 1. The Core ETL Paradigm (Extract -> Transform -> Load)
- **Extract (Get Data)**: Connect to external data sources without opening them (Excel files, CSVs, entire folders of monthly files, SharePoint, Web pages, SQL databases).
- **Transform**: Clean and shape data inside the dedicated Power Query Editor window without altering raw source files.
- **Load (Close & Load To)**: Output clean data into an Excel Table, a PivotTable cache, or straight into the Data Model.

### 2. Essential Power Query Transformations
- **Applied Steps (Audit Log)**: Every action (removing columns, changing types, filtering rows) is recorded in order. You can delete, reorder, or modify any historical step!
- **Data Type Casting**: Explicitly set Text, Whole Number, Currency, Date, or Percentage to eliminate formula mismatches.
- **Unpivot Columns**: Converts human-readable wide matrix reports (e.g. 12 month columns) into database-ready tall tabular formats (Attribute + Value pairs) in two clicks!
- **Merge Queries (Relational Joins)**: Joins two tables on a shared key (Left Outer Join, Inner Join, Full Outer Join) without writing a single VLOOKUP.
- **Append Queries (Stacking)**: Combines multiple identically structured tables vertically (e.g. Jan + Feb + Mar into a single Year table).`,
      vi: `### 1. Mô Hình ETL Cốt Lõi (Trích Xuất -> Biến Đổi -> Nạp Dữ Liệu)
- **Extract (Get Data)**: Kết nối với các nguồn dữ liệu bên ngoài mà không cần mở trực tiếp (tệp Excel, CSV, toàn bộ thư mục chứa tệp báo cáo tháng, SharePoint, trang web, cơ sở dữ liệu SQL).
- **Transform**: Làm sạch và định hình dữ liệu bên trong cửa sổ Power Query Editor chuyên biệt mà không làm ảnh hưởng đến tệp dữ liệu gốc.
- **Load (Close & Load To)**: Xuất dữ liệu sạch ra Bảng Excel, bộ nhớ PivotTable hoặc nạp thẳng vào Data Model.

### 2. Các Phép Biến Đổi Cốt Lõi Trong Power Query
- **Applied Steps (Nhật Ký Các Bước)**: Mọi thao tác (xóa cột, đổi kiểu dữ liệu, lọc dòng) đều được ghi lại theo thứ tự. Bạn có thể xóa, đổi thứ tự hoặc chỉnh sửa bất kỳ bước nào trong quá khứ!
- **Chuyển Đổi Kiểu Dữ Liệu (Data Type Casting)**: Thiết lập rõ ràng kiểu Text, Whole Number, Currency, Date để tránh lỗi tính toán.
- **Unpivot Columns (Xoay Cột Thành Dòng)**: Chuyển đổi báo cáo ma trận dạng ngang (12 cột tháng) thành bảng dữ liệu dọc chuẩn cơ sở dữ liệu (cặp cột Thuộc tính + Giá trị) chỉ trong 2 cú nhấp chuột!
- **Merge Queries (Nối Bảng Theo Quan Hệ - Joins)**: Kết hợp hai bảng dựa trên khóa chung (Left Outer Join, Inner Join) mà không cần viết hàm VLOOKUP.
- **Append Queries (Ghép Chồng Dữ Liệu)**: Xếp chồng nhiều bảng có cùng cấu trúc theo chiều dọc (ví dụ ghép Tháng 1 + Tháng 2 + Tháng 3 thành 1 bảng tổng hợp).`
    },
    syntax: `# Access Power Query in Excel:
Data Tab -> Get Data -> From File / From Database / From Other Sources

# In Power Query Editor:
- Unpivot: Select static ID columns -> Transform tab -> Unpivot Other Columns
- Combine: Home tab -> Merge Queries (Joins) / Append Queries (Stacking)
- Output: Home tab -> Close & Load To -> Table / Data Model`,
    examples: [
      {
        title: { en: 'Unpivoting 12 Monthly Budget Columns into a Clean Tabular Dataset', vi: 'Unpivot 12 Cột Ngân Sách Tháng Thành Bảng Dữ Liệu Chuẩn' },
        code: `Raw Data Shape: Department, ExpenseCode, Jan, Feb, Mar, Apr, ..., Dec (14 columns)
Problem: Cannot build PivotTables easily from wide horizontal columns.

Power Query Transformation:
1. Select 'Department' and 'ExpenseCode'.
2. Right-click -> "Unpivot Other Columns".
3. Rename 'Attribute' -> 'Month', Rename 'Value' -> 'BudgetValue'.

Result: A clean 4-column database ready for immediate PivotTable aggregation!`,
        description: {
          en: 'Transforms human-formatted matrix tables into normalized 3NF database records automatically.',
          vi: 'Tự động biến đổi bảng ma trận định dạng cho người xem thành bản ghi chuẩn hóa cơ sở dữ liệu.'
        }
      },
      {
        title: { en: 'Consolidating an Entire Folder of 50 Monthly CSV Files', vi: 'Tự Động Gộp Toàn Bộ Thư Mục Gồm 50 Tệp CSV Tháng' },
        code: `Data Source: Data Tab -> Get Data -> From File -> From Folder
Action: Select Folder Path -> Click "Combine & Transform Data".
Power Query automatically iterates through every CSV, cleans headers, and stacks all 50 files into one unified 500,000-row master table!`,
        description: {
          en: 'Dropping a new month\'s CSV into the folder and pressing Data -> Refresh All pulls the new data into the master model instantly.',
          vi: 'Chỉ cần thả tệp CSV tháng mới vào thư mục và nhấn Refresh All, dữ liệu mới sẽ tự động nạp vào mô hình tổng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Renaming or moving the raw source file path on your local drive, causing Power Query to fail with a "Data Source Not Found" error upon refresh.',
          vi: 'Đổi tên hoặc di chuyển đường dẫn tệp nguồn trên ổ đĩa, khiến Power Query báo lỗi "Data Source Not Found" khi Refresh.'
        },
        correction: {
          en: 'Keep source file paths consistent or use Data Source Settings to repoint the query to the new directory.',
          vi: 'Giữ nguyên đường dẫn tệp nguồn hoặc dùng Data Source Settings để trỏ lại truy vấn đến thư mục mới.'
        }
      }
    ],
    tips: [
      { en: 'Close & Load To... Options: Use "Only Create Connection" and check "Add this data to the Data Model" for multi-million row datasets to bypass the 1,048,576 worksheet row limit.', vi: 'Tùy chọn Close & Load To: Chọn "Only Create Connection" và tích "Add this data to the Data Model" cho tập dữ liệu hàng triệu dòng để vượt qua giới hạn 1.048.576 dòng của trang tính.' },
      { en: 'View M Code in Advanced Editor: Click Home -> Advanced Editor in Power Query to inspect and edit the underlying M transformation code directly.', vi: 'Xem mã M trong Advanced Editor: Bấm Home -> Advanced Editor trong Power Query để xem và chỉnh sửa trực tiếp mã lệnh M.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l19_ex1',
      type: 'complete_code',
      title: { en: 'Identify Power Query Underlying Language', vi: 'Xác Định Ngôn Ngữ Nền Tảng Của Power Query' },
      instruction: {
        en: 'Type the single-letter official name of the functional, case-sensitive programming language used by Power Query under the hood (format: M).',
        vi: 'Gõ tên chính thức gồm 1 chữ cái của ngôn ngữ lập trình hàm phân biệt hoa thường được Power Query sử dụng bên dưới (định dạng: M).'
      },
      starterCode: '',
      solutionCode: 'M',
      expectedOutput: 'M',
      hint: { en: 'The M language.', vi: 'Ngôn ngữ M.' },
      explanation: { en: 'Power Query generates code in the M functional formula language (Power Query M Formula Language).', vi: 'Power Query tạo ra mã lệnh bằng ngôn ngữ công thức hàm M.' }
    },
    {
      id: 'excel_l19_ex2',
      type: 'complete_code',
      title: { en: 'Identify Transformation to Convert Columns to Rows', vi: 'Xác Định Phép Biến Đổi Chuyển Cột Thành Hàng' },
      instruction: {
        en: 'Type the exact name of the Power Query transformation feature used to convert wide multi-column cross-tabulated reports into tall normalized rows (format: Unpivot).',
        vi: 'Gõ tên chính xác của tính năng biến đổi trong Power Query dùng để chuyển báo cáo ma trận nhiều cột thành dạng hàng chuẩn hóa dọc (định dạng: Unpivot).'
      },
      starterCode: 'Un',
      solutionCode: 'Unpivot',
      expectedOutput: 'Unpivot',
      hint: { en: 'Unpivot (or Unpivot Columns).', vi: 'Unpivot (hoặc Unpivot Columns).' },
      explanation: { en: 'Unpivot transforms attribute columns into key-value attribute pairs.', vi: 'Unpivot chuyển các cột thuộc tính thành các cặp giá trị - thuộc tính dạng dòng.' }
    }
  ],
  challenge: {
    id: 'excel_l19_challenge',
    title: { en: 'Design an Automated Multi-File Folder ETL Workflow', vi: 'Thiết Kế Quy Trình ETL Tự Động Hóa Thư Mục Đa Tệp' },
    description: {
      en: 'State the primary Power Query operation used to combine and stack multiple monthly transaction CSV files located in a shared directory: type "Combine & Transform Data".',
      vi: 'Nêu thao tác Power Query chính dùng để kết hợp và ghép chồng nhiều tệp CSV giao dịch tháng trong cùng một thư mục: gõ "Combine & Transform Data".'
    },
    requirements: [
      { en: 'Type exact string "Combine & Transform Data"', vi: 'Gõ chính xác chuỗi "Combine & Transform Data"' }
    ],
    starterCode: 'Combine',
    solutionCode: 'Combine & Transform Data',
    hints: [
      { en: 'Combine & Transform Data', vi: 'Combine & Transform Data' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l19_q1',
      type: 'single_choice',
      question: {
        en: 'What does the acronym "ETL" stand for in modern data analytics?',
        vi: 'Từ viết tắt "ETL" đại diện cho cụm từ nào trong phân tích dữ liệu hiện đại?'
      },
      options: [
        { en: 'Extract, Transform, Load', vi: 'Extract, Transform, Load (Trích xuất, Biến đổi, Nạp dữ liệu)' },
        { en: 'Enter, Test, Lock', vi: 'Enter, Test, Lock' },
        { en: 'Evaluate, Transpose, Link', vi: 'Evaluate, Transpose, Link' },
        { en: 'Excel Table Language', vi: 'Excel Table Language' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ETL stands for Extracting data from sources, Transforming/cleaning it, and Loading it into downstream destination models.',
        vi: 'ETL là viết tắt của Trích xuất (Extract) dữ liệu từ nguồn, Biến đổi/làm sạch (Transform) và Nạp (Load) vào mô hình đích.'
      },
      difficulty: 'easy',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q2',
      type: 'single_choice',
      question: {
        en: 'What language does Power Query use behind the scenes to record every transformation step?',
        vi: 'Power Query sử dụng ngôn ngữ nào bên dưới để ghi lại từng bước chuyển đổi dữ liệu?'
      },
      options: [
        { en: 'M Language (Power Query M Formula Language)', vi: 'Ngôn ngữ M (Power Query M Formula Language)' },
        { en: 'VBA', vi: 'VBA' },
        { en: 'Python', vi: 'Python' },
        { en: 'SQL only', vi: 'Chỉ có SQL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Power Query is powered by M, a functional, case-sensitive data transformation language.',
        vi: 'Power Query được vận hành bởi M, một ngôn ngữ chuyển đổi dữ liệu dạng hàm và phân biệt chữ hoa chữ thường.'
      },
      difficulty: 'easy',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q3',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the "Unpivot Columns" transformation in Power Query?',
        vi: 'Mục đích của phép biến đổi "Unpivot Columns" trong Power Query là gì?'
      },
      options: [
        { en: 'Converts wide cross-tabulated matrix columns into tall normalized key-value attribute rows', vi: 'Chuyển đổi các cột báo cáo ma trận dạng ngang thành các hàng thuộc tính giá trị chuẩn hóa dạng dọc' },
        { en: 'Deletes all PivotTables from the sheet', vi: 'Xóa toàn bộ PivotTable khỏi trang tính' },
        { en: 'Rotates chart axes', vi: 'Xoay trục biểu đồ' },
        { en: 'Transposes headers into footnotes', vi: 'Chuyển tiêu đề thành chú thích chân trang' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Unpivoting reshapes human-readable matrix columns into flat database-ready records for PivotTable and Power BI modeling.',
        vi: 'Unpivot biến đổi các cột ma trận định dạng ngang thành các bản ghi cơ sở dữ liệu phẳng phục vụ mô hình hóa PivotTable và Power BI.'
      },
      difficulty: 'medium',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q4',
      type: 'single_choice',
      question: {
        en: 'What is the difference between "Merge Queries" and "Append Queries" in Power Query?',
        vi: 'Sự khác biệt giữa "Merge Queries" và "Append Queries" trong Power Query là gì?'
      },
      options: [
        { en: 'Merge joins two tables horizontally based on matching key columns (like a SQL Join / VLOOKUP); Append stacks tables vertically on top of each other (like SQL UNION)', vi: 'Merge nối hai bảng theo chiều ngang dựa trên cột khóa khớp (như SQL Join / VLOOKUP); Append xếp chồng các bảng theo chiều dọc (như SQL UNION)' },
        { en: 'Merge is for text; Append is for numbers', vi: 'Merge dành cho chữ; Append dành cho số' },
        { en: 'Append deletes the original query', vi: 'Append xóa truy vấn gốc' },
        { en: 'They perform the exact same function', vi: 'Chúng thực hiện chức năng hoàn toàn giống nhau' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Merge combines columns based on relationships (joins). Append combines rows by stacking datasets vertically.',
        vi: 'Merge kết hợp các cột dựa trên mối quan hệ khóa (joins). Append kết hợp các hàng bằng cách ghép chồng các tập dữ liệu theo chiều dọc.'
      },
      difficulty: 'medium',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q5',
      type: 'single_choice',
      question: {
        en: 'Where can you view, delete, reorder, or edit individual transformation actions inside Power Query Editor?',
        vi: 'Nơi nào cho phép bạn xem, xóa, đổi thứ tự hoặc chỉnh sửa từng thao tác biến đổi bên trong Power Query Editor?'
      },
      options: [
        { en: 'The "Applied Steps" pane on the right-side Query Settings panel', vi: 'Khung "Applied Steps" trên bảng Query Settings ở phía bên phải' },
        { en: 'The Windows Event Viewer', vi: 'Trình xem sự kiện Windows Event Viewer' },
        { en: 'The Formula Bar only', vi: 'Chỉ trên thanh công thức Formula Bar' },
        { en: 'Macro Security Settings', vi: 'Cài đặt Macro Security' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Applied Steps logs every transformation step sequentially, allowing non-destructive auditing and modifications.',
        vi: 'Applied Steps ghi lại tuần tự từng bước biến đổi, cho phép kiểm tra và chỉnh sửa quy trình mà không làm mất dữ liệu gốc.'
      },
      difficulty: 'easy',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q6',
      type: 'true_false',
      question: {
        en: 'True or False: Power Query alters and overwrites the original source CSV or database file when cleaning data.',
        vi: 'Đúng hay Sai: Power Query sẽ trực tiếp thay đổi và ghi đè lên tệp CSV hoặc cơ sở dữ liệu nguồn gốc khi làm sạch dữ liệu.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False (Power Query connects read-only and transforms data in-memory)', vi: 'Sai (Power Query chỉ kết nối đọc dữ liệu và biến đổi trên bộ nhớ tạm)' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Power Query reads data non-destructively; source files are never modified or overwritten.',
        vi: 'Sai. Power Query đọc dữ liệu ở chế độ chỉ đọc; tệp dữ liệu nguồn không bao giờ bị chỉnh sửa hoặc ghi đè.'
      },
      difficulty: 'easy',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q7',
      type: 'single_choice',
      question: {
        en: 'How do you load a 5-million row dataset into Excel using Power Query without hitting the 1,048,576 worksheet row limit?',
        vi: 'Làm thế nào để nạp tập dữ liệu 5 triệu dòng vào Excel bằng Power Query mà không bị vượt quá giới hạn 1.048.576 dòng của trang tính?'
      },
      options: [
        { en: 'Close & Load To... -> Select "Only Create Connection" and check "Add this data to the Data Model"', vi: 'Close & Load To... -> Chọn "Only Create Connection" và tích chọn "Add this data to the Data Model"' },
        { en: 'Split into 5 different Excel files', vi: 'Chia thành 5 tệp Excel khác nhau' },
        { en: 'Delete 4 million rows', vi: 'Xóa bớt 4 triệu dòng' },
        { en: 'Excel cannot handle more than 1 million rows under any circumstances', vi: 'Excel không thể xử lý quá 1 triệu dòng trong bất kỳ trường hợp nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Excel Data Model (Power Pivot engine) can store hundreds of millions of compressed rows in memory without populating worksheet grid cells.',
        vi: 'Excel Data Model (bộ xử lý Power Pivot) có thể lưu trữ hàng trăm triệu dòng nén trong bộ nhớ RAM mà không cần đổ dữ liệu ra các ô trang tính.'
      },
      difficulty: 'hard',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q8',
      type: 'single_choice',
      question: {
        en: 'What join kind in Power Query returns all rows from the primary first table and only matching records from the secondary table?',
        vi: 'Kiểu kết nối Join nào trong Power Query trả về tất cả các dòng từ bảng chính đầu tiên và chỉ những bản ghi khớp từ bảng thứ hai?'
      },
      options: [
        { en: 'Left Outer Join', vi: 'Left Outer Join' },
        { en: 'Right Outer Join', vi: 'Right Outer Join' },
        { en: 'Full Outer Join', vi: 'Full Outer Join' },
        { en: 'Inner Join', vi: 'Inner Join' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Left Outer preserves all primary records from Table 1 and pulls attributes from Table 2 where keys match.',
        vi: 'Left Outer giữ lại toàn bộ các dòng từ Bảng 1 và lấy thêm các thuộc tính từ Bảng 2 tại các vị trí khớp khóa.'
      },
      difficulty: 'medium',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q9',
      type: 'single_choice',
      question: {
        en: 'What is the "Advanced Editor" in Power Query used for?',
        vi: '"Advanced Editor" trong Power Query được sử dụng để làm gì?'
      },
      options: [
        { en: 'Viewing, debugging, and directly editing the complete M code query script', vi: 'Xem, gỡ lỗi và chỉnh sửa trực tiếp toàn bộ tập lệnh mã M của truy vấn' },
        { en: 'Editing VBA macros', vi: 'Chỉnh sửa macro VBA' },
        { en: 'Designing 3D charts', vi: 'Thiết kế biểu đồ 3D' },
        { en: 'Managing Excel add-ins', vi: 'Quản lý các tiện ích bổ sung của Excel' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Advanced Editor exposes the entire programmatic M script representing the query\'s transformation pipeline.',
        vi: 'Advanced Editor hiển thị toàn bộ mã lệnh M đại diện cho quy trình chuyển đổi dữ liệu của truy vấn.'
      },
      difficulty: 'medium',
      topicId: 'excel_power_query'
    },
    {
      id: 'excel_l19_q10',
      type: 'single_choice',
      question: {
        en: 'How do you refresh all Power Query connections in an active workbook?',
        vi: 'Làm thế nào để làm mới (Refresh) tất cả các kết nối Power Query trong sổ làm việc hiện tại?'
      },
      options: [
        { en: 'Data tab -> Click "Refresh All" (or press Ctrl + Alt + F5)', vi: 'Thẻ Data -> Bấm "Refresh All" (hoặc nhấn Ctrl + Alt + F5)' },
        { en: 'Close and reopen Excel 5 times', vi: 'Đóng và mở lại Excel 5 lần' },
        { en: 'Press Shift + F9', vi: 'Nhấn Shift + F9' },
        { en: 'Rebuild the query from scratch', vi: 'Tạo lại truy vấn từ đầu' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Refresh All re-executes all M transformation scripts against external data sources and repopulates destination tables.',
        vi: 'Refresh All thực thi lại tất cả các tập lệnh M đối với nguồn dữ liệu ngoài và nạp lại dữ liệu mới vào các bảng đích.'
      },
      difficulty: 'easy',
      topicId: 'excel_power_query'
    }
  ]
};

saveLesson('lesson19.ts', 'lesson19', lesson19);

// =========================================================================
// LESSON 20: What-If Analysis & Financial Modeling (Goal Seek, Data Tables, Solver)
// New ID: excel_lesson_what_if
// =========================================================================
export const lesson20: Lesson = {
  id: 'excel_lesson_what_if',
  order: 20,
  courseId: 'excel',
  levelId: 'advanced',
  topicId: 'excel_what_if',
  title: {
    en: 'What-If Analysis, Scenario Planning, Sensitivity Tables & The Solver Engine',
    vi: 'Phân Tích What-If, Lập Kế Hoạch Kịch Bản, Bảng Độ Nhạy & Công Cụ Tối Ưu Hóa Solver'
  },
  summary: {
    en: 'Make confident strategic decisions under uncertainty: reverse-engineering targets with Goal Seek, multi-variable sensitivity modeling with One-Way and Two-Way Data Tables, Scenario Manager comparison summaries, and multi-constraint optimization using Solver (Simplex LP & GRG Nonlinear).',
    vi: 'Đưa ra các quyết định chiến lược tự tin trước sự không chắc chắn: tính toán ngược mục tiêu với Goal Seek, mô hình hóa độ nhạy đa biến với Bảng dữ liệu 1 chiều & 2 chiều Data Tables, so sánh các kịch bản với Scenario Manager và tối ưu hóa đa ràng buộc bằng công cụ Solver.'
  },
  learn: {
    introduction: {
      en: 'Financial models are never static forecasts—they are dynamic decision engines. Executives need to know: "What price must we charge to break even?", "How sensitive is net profit if interest rates rise 2% while demand falls 10%?", and "What product manufacturing mix maximizes factory profit subject to labor and material constraints?" What-If Analysis and Solver answer these critical questions.',
      vi: 'Mô hình tài chính không phải là những dự báo tĩnh—chúng là các công cụ hỗ trợ ra quyết định động. Ban lãnh đạo luôn cần biết: "Cần định giá bao nhiêu để hòa vốn?", "Lợi nhuận ròng sẽ biến động thế nào nếu lãi suất tăng 2% trong khi sức mua giảm 10%?", và "Cơ cấu sản xuất nào tối đa hóa lợi nhuận nhà máy dưới các ràng buộc về nhân công và nguyên vật liệu?" What-If Analysis và Solver chính là câu trả lời cho các bài toán chiến lược này.'
    },
    conceptExplanation: {
      en: `### 1. Goal Seek (Single-Variable Reverse Engineering)
- **Concept**: If you know the desired output of a formula, Goal Seek determines the exact single input value needed to achieve that target.
- **Dialog Inputs**:
  - *Set cell*: The formula cell (e.g. Net Profit $0).
  - *To value*: The target number (e.g. 0 for break-even).
  - *By changing cell*: The single input parameter to adjust (e.g. Unit Price).

### 2. Sensitivity Data Tables (What-If Analysis)
Evaluates how varying 1 or 2 key assumptions impacts the bottom line across an entire matrix:
- **One-Variable Data Table**: Tests multiple values of a single input (e.g. varying interest rate from 4% to 10% on monthly loan payments).
- **Two-Variable Data Table**: Tests combinations of two inputs simultaneously (e.g. Unit Sales on the top row vs Unit Price on the left column).
  - *Formula Reference*: Place output formula at the top-left corner of the matrix.

### 3. The Solver Optimization Engine (Add-in)
Handles complex multi-variable linear and non-linear optimization problems:
- **Objective Cell**: Target to **Maximize**, **Minimize**, or set to a **Specific Value** (e.g. Maximize Total Profit).
- **Variable Cells**: Changing input cells (e.g. Production quantities of 5 different product lines).
- **Constraints**: Operational boundary conditions (e.g. \`LaborHoursUsed <= 1000\`, \`UnitsProduced >= 0\`, \`UnitsProduced = integer\`).
- **Solving Methods**:
  - **Simplex LP**: For linear programming models (super fast and guaranteed global optimum).
  - **GRG Nonlinear**: For smooth non-linear models (e.g. diminishing returns curves).
  - **Evolutionary**: For complex, discontinuous, or genetic algorithm problems.`,
      vi: `### 1. Goal Seek (Tính Toán Ngược Đơn Biến)
- **Khái niệm**: Khi bạn đã biết kết quả đầu ra mong muốn của một công thức, Goal Seek sẽ tìm ra chính xác giá trị đầu vào cần thiết để đạt được mục tiêu đó.
- **Các thông số thiết lập**:
  - *Set cell*: Ô chứa công thức mục tiêu (ví dụ Lợi nhuận ròng = 0$).
  - *To value*: Giá trị đích cần đạt (ví dụ 0 để tìm điểm hòa vốn).
  - *By changing cell*: Ô đầu vào duy nhất cần điều chỉnh (ví dụ Đơn giá bán).

### 2. Bảng Phân Tích Độ Nhạy Data Tables
Đánh giá sự biến động của kết quả khi thay đổi 1 hoặc 2 giả định chính trên một ma trận:
- **Bảng dữ liệu 1 biến (One-Variable Data Table)**: Thử nghiệm nhiều giá trị của 1 biến đầu vào (ví dụ thay đổi lãi suất từ 4% đến 10% xem tiền trả nợ hàng tháng).
- **Bảng dữ liệu 2 biến (Two-Variable Data Table)**: Thử nghiệm đồng thời các kịch bản kết hợp của 2 biến đầu vào (ví dụ Số lượng bán ở hàng trên cùng vs Đơn giá ở cột bên trái).
  - *Tham chiếu công thức*: Đặt công thức kết quả tại góc trên cùng bên trái của ma trận.

### 3. Bộ Công Cụ Tối Ưu Hóa Solver
Giải quyết các bài toán tối ưu hóa đa biến phức tạp với nhiều điều kiện ràng buộc:
- **Objective Cell (Ô mục tiêu)**: Giá trị cần **Tối đa hóa (Max)**, **Tối thiểu hóa (Min)** hoặc đạt **Giá trị cụ thể** (ví dụ Tối đa hóa Tổng lợi nhuận).
- **Variable Cells (Các ô biến số)**: Các ô đầu vào có thể thay đổi (ví dụ Số lượng sản xuất của 5 dòng sản phẩm).
- **Constraints (Các ràng buộc)**: Các điều kiện giới hạn thực tế (ví dụ: \`GioCong <= 1000\`, \`SoLuong >= 0\`, \`SoLuong = so_nguyen\`).
- **Phương pháp giải (Solving Methods)**:
  - **Simplex LP**: Dành cho mô hình quy hoạch tuyến tính (cực nhanh và đảm bảo tìm thấy nghiệm tối ưu toàn cục).
  - **GRG Nonlinear**: Dành cho mô hình phi tuyến tính mượt mà (ví dụ đường cong hiệu suất giảm dần).
  - **Evolutionary**: Dành cho các bài toán phi tuyến phức tạp hoặc thuật toán di truyền.`
    },
    syntax: `# Access What-If Tools:
Data Tab -> Forecast Group -> What-If Analysis -> Goal Seek / Data Table / Scenario Manager

# Enable Solver Add-in:
File -> Options -> Add-ins -> Manage: Excel Add-ins -> Go -> Check "Solver Add-in" -> Appears on Data Tab`,
    examples: [
      {
        title: { en: 'Two-Way Sensitivity Table: Revenue across Price vs Unit Volume', vi: 'Bảng Độ Nhạy 2 Chiều: Doanh Thu Theo Đơn Giá vs Sản Lượng' },
        code: `Matrix Layout:
Corner Cell C4: =B1 * B2  (Base Formula: Price * Volume)
Row Headers (D4:H4): 1000, 2000, 3000, 4000, 5000 (Unit Volumes)
Column Headers (C5:C9): $10, $15, $20, $25, $30 (Unit Prices)

Action: Select C4:H9 -> Data -> What-If Analysis -> Data Table
Row input cell: B2 (Volume)
Column input cell: B1 (Price)

Result: Fills all 25 cross-scenario financial outcomes instantly!`,
        description: {
          en: 'Generates a multi-scenario sensitivity matrix for investment committee presentations.',
          vi: 'Tạo ma trận phân tích độ nhạy đa kịch bản phục vụ báo cáo hội đồng đầu tư.'
        }
      },
      {
        title: { en: 'Product Mix Optimization with Solver (Simplex LP)', vi: 'Tối Ưu Hóa Cơ Cấu Sản Phẩm Bằng Solver (Simplex LP)' },
        code: `Objective: Maximize Total Profit in cell D10
By Changing Variable Cells: B2:B4 (Units of Product A, B, C)
Subject to Constraints:
- B2:B4 >= 0 (Non-negative production)
- B2:B4 = integer (Whole units only)
- TotalLaborHours in D6 <= 400 (Labor capacity)
- TotalRawMaterial in D7 <= 1500 (Material stock)

Solving Method: Simplex LP
Outcome: Finds the exact optimal manufacturing schedule that yields maximum possible profit.`,
        description: {
          en: 'Solver solves mathematical linear programming models to guarantee maximum operational efficiency.',
          vi: 'Solver giải bài toán quy hoạch tuyến tính để đảm bảo hiệu quả vận hành tối đa.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Confusing Row Input Cell and Column Input Cell in Two-Way Data Tables, causing transposed sensitivity calculations.',
          vi: 'Nhầm lẫn giữa Row Input Cell và Column Input Cell trong Bảng dữ liệu 2 biến, khiến kết quả phân tích độ nhạy bị đảo ngược.'
        },
        correction: {
          en: 'Row Input Cell corresponds to values arrayed horizontally across the top row; Column Input Cell corresponds to values listed down the left column.',
          vi: 'Row Input Cell tương ứng với các giá trị trải ngang ở hàng trên cùng; Column Input Cell tương ứng với các giá trị xếp dọc ở cột bên trái.'
        }
      }
    ],
    tips: [
      { en: 'Automatic Table Recalculation Performance: On huge models, go to Formulas -> Calculation Options -> "Automatic Except for Data Tables" to stop Data Tables from slowing down workbook calculations.', vi: 'Tối ưu hiệu năng tính toán: Với các file lớn, vào Formulas -> Calculation Options -> "Automatic Except for Data Tables" để ngăn Data Tables làm chậm file.' },
      { en: 'Save Scenario Reports: Scenario Manager lets you save named sets of assumptions (e.g. Best Case, Base Case, Worst Case) and generate an executive comparison summary sheet in one click.', vi: 'Xuất báo cáo kịch bản: Scenario Manager cho phép lưu các bộ giả định (Kịch bản Tốt nhất, Cơ sở, Xấu nhất) và xuất báo cáo so sánh tự động.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l20_ex1',
      type: 'complete_code',
      title: { en: 'Identify Tool for Single Target Reverse Engineering', vi: 'Xác Định Công Cụ Tính Toán Ngược Mục Tiêu Đơn Biến' },
      instruction: {
        en: 'Type the exact name of the built-in Excel feature used to find the specific input value needed to achieve a target formula result (format: Goal Seek).',
        vi: 'Gõ tên chính xác của tính năng có sẵn trong Excel dùng để tìm giá trị đầu vào cần thiết nhằm đạt được một kết quả công thức mục tiêu (định dạng: Goal Seek).'
      },
      starterCode: 'Goal',
      solutionCode: 'Goal Seek',
      expectedOutput: 'Goal Seek',
      hint: { en: 'Goal Seek.', vi: 'Goal Seek.' },
      explanation: { en: 'Goal Seek backsolves for an unknown input variable to meet a specific goal.', vi: 'Goal Seek giải ngược tìm biến đầu vào chưa biết để đạt được mục tiêu cụ thể.' }
    },
    {
      id: 'excel_l20_ex2',
      type: 'complete_code',
      title: { en: 'Identify Linear Optimization Algorithm in Solver', vi: 'Xác Định Thuật Toán Tối Ưu Tuyến Tính Trong Solver' },
      instruction: {
        en: 'Type the name of the standard linear programming engine method used in Solver for linear models (format: Simplex LP).',
        vi: 'Gõ tên phương pháp thuật toán quy hoạch tuyến tính chuẩn được sử dụng trong Solver cho các mô hình tuyến tính (định dạng: Simplex LP).'
      },
      starterCode: 'Simplex',
      solutionCode: 'Simplex LP',
      expectedOutput: 'Simplex LP',
      hint: { en: 'Simplex LP.', vi: 'Simplex LP.' },
      explanation: { en: 'Simplex LP optimizes linear programming models with mathematical certainty.', vi: 'Simplex LP tối ưu hóa các mô hình quy hoạch tuyến tính với độ chính xác toán học tuyệt đối.' }
    }
  ],
  challenge: {
    id: 'excel_l20_challenge',
    title: { en: 'Configure Solver Optimization Model Components', vi: 'Cấu Hình Các Thành Phần Mô Hình Tối Ưu Hóa Solver' },
    description: {
      en: 'State the three primary components required to configure a Solver problem: Objective, Variable Cells, and Constraints (type "Objective, Variable Cells, Constraints").',
      vi: 'Nêu ba thành phần chính bắt buộc phải cấu hình cho một bài toán Solver: Objective, Variable Cells, and Constraints (gõ "Objective, Variable Cells, Constraints").'
    },
    requirements: [
      { en: 'Type exact string "Objective, Variable Cells, Constraints"', vi: 'Gõ chính xác chuỗi "Objective, Variable Cells, Constraints"' }
    ],
    starterCode: 'Objective, Variable Cells, ',
    solutionCode: 'Objective, Variable Cells, Constraints',
    hints: [
      { en: 'Objective, Variable Cells, Constraints', vi: 'Objective, Variable Cells, Constraints' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l20_q1',
      type: 'single_choice',
      question: {
        en: 'What is the primary operational difference between `Goal Seek` and `Solver`?',
        vi: 'Sự khác biệt cốt lõi trong vận hành giữa `Goal Seek` và `Solver` là gì?'
      },
      options: [
        { en: 'Goal Seek can only adjust ONE changing variable cell to reach a target value; Solver can adjust MULTIPLE changing cells subject to multiple CONSTRAINTS', vi: 'Goal Seek chỉ có thể điều chỉnh MỘT ô biến đầu vào duy nhất để đạt mục tiêu; Solver có thể điều chỉnh NHIỀU ô biến đồng thời với nhiều ĐIỀU KIỆN RÀNG BUỘC' },
        { en: 'Goal Seek is for text only', vi: 'Goal Seek chỉ dùng cho văn bản' },
        { en: 'Solver cannot maximize profit', vi: 'Solver không thể tối đa hóa lợi nhuận' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Goal Seek solves single-variable equalities. Solver handles multi-variable constrained optimization (linear, non-linear, integer).',
        vi: 'Goal Seek giải phương trình đơn biến. Solver xử lý bài toán tối ưu hóa đa biến có ràng buộc (tuyến tính, phi tuyến, số nguyên).'
      },
      difficulty: 'easy',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q2',
      type: 'single_choice',
      question: {
        en: 'In a Two-Variable Sensitivity Data Table, where must the primary output formula be referenced?',
        vi: 'Trong Bảng phân tích độ nhạy 2 biến (Two-Variable Data Table), công thức kết quả chính bắt buộc phải được tham chiếu ở đâu?'
      },
      options: [
        { en: 'At the top-left corner cell of the table matrix (the intersection of row and column headers)', vi: 'Tại ô góc trên cùng bên trái của ma trận bảng (giao điểm giữa tiêu đề hàng và tiêu đề cột)' },
        { en: 'At the bottom-right cell', vi: 'Tại ô dưới cùng bên phải' },
        { en: 'In the middle of the table', vi: 'Ở chính giữa bảng' },
        { en: 'Anywhere on the worksheet', vi: 'Bất kỳ đâu trên trang tính' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Two-Way Data Tables require the target formula in the top-left corner cell of the selection grid.',
        vi: 'Bảng dữ liệu 2 biến yêu cầu công thức mục tiêu phải nằm ở ô góc trên cùng bên trái của vùng chọn.'
      },
      difficulty: 'medium',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q3',
      type: 'single_choice',
      question: {
        en: 'Which Solver solving method is appropriate for smooth non-linear problems, such as pricing models where demand is an exponential function of price?',
        vi: 'Phương pháp giải nào trong Solver phù hợp cho các bài toán phi tuyến tính mượt mà, như mô hình định giá trong đó nhu cầu là hàm mũ của giá bán?'
      },
      options: [
        { en: 'GRG Nonlinear', vi: 'GRG Nonlinear' },
        { en: 'Simplex LP', vi: 'Simplex LP' },
        { en: 'Goal Seek Mode', vi: 'Chế độ Goal Seek' },
        { en: 'Linear Pivot', vi: 'Linear Pivot' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'GRG (Generalized Reduced Gradient) Nonlinear is engineered for smooth nonlinear optimization problems.',
        vi: 'GRG (Generalized Reduced Gradient) Nonlinear được thiết kế chuyên biệt cho các bài toán tối ưu hóa phi tuyến mượt mà.'
      },
      difficulty: 'medium',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q4',
      type: 'single_choice',
      question: {
        en: 'How do you install or activate the Solver tool in Microsoft Excel if it is not visible on the Data tab?',
        vi: 'Làm thế nào để cài đặt hoặc kích hoạt công cụ Solver trong Microsoft Excel nếu chưa thấy trên thẻ Data?'
      },
      options: [
        { en: 'File -> Options -> Add-ins -> Manage: Excel Add-ins -> Check "Solver Add-in"', vi: 'File -> Options -> Add-ins -> Manage: Excel Add-ins -> Tích chọn "Solver Add-in"' },
        { en: 'Download an external .exe file from the internet', vi: 'Tải tệp .exe ngoài từ internet' },
        { en: 'Reinstall Windows', vi: 'Cài đặt lại Windows' },
        { en: 'Upgrade to Excel Enterprise Cloud only', vi: 'Chỉ nâng cấp lên Excel Enterprise Cloud' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Solver is a native built-in Excel add-in that just needs to be enabled in Excel Options.',
        vi: 'Solver là tiện ích bổ sung có sẵn của Excel, chỉ cần bật kích hoạt trong Excel Options.'
      },
      difficulty: 'easy',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q5',
      type: 'single_choice',
      question: {
        en: 'What feature allows financial analysts to save and switch between named sets of input assumptions (e.g. "Base Case", "Recession Case", "Growth Case")?',
        vi: 'Tính năng nào cho phép các chuyên gia tài chính lưu và chuyển đổi qua lại giữa các bộ giả định đầu vào (ví dụ "Kịch bản Cơ sở", "Kịch bản Suy thoái", "Kịch bản Tăng trưởng")?'
      },
      options: [
        { en: 'Scenario Manager (What-If Analysis)', vi: 'Scenario Manager (What-If Analysis)' },
        { en: 'Track Changes', vi: 'Track Changes' },
        { en: 'Version History', vi: 'Version History' },
        { en: 'Conditional Formatting', vi: 'Conditional Formatting' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Scenario Manager stores named sets of input variables and can produce an automated executive summary comparison table.',
        vi: 'Scenario Manager lưu trữ các bộ biến số đầu vào đã đặt tên và có thể tự động xuất bảng tóm tắt so sánh kịch bản.'
      },
      difficulty: 'medium',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q6',
      type: 'single_choice',
      question: {
        en: 'What constraint type in Solver ensures that a factory model does not produce partial fractions of physical goods (e.g. 14.7 cars)?',
        vi: 'Loại ràng buộc nào trong Solver đảm bảo rằng mô hình nhà máy không sản xuất số lượng lẻ của sản phẩm vật lý (ví dụ 14.7 chiếc xe hơi)?'
      },
      options: [
        { en: '`int` (Integer constraint)', vi: '`int` (Ràng buộc số nguyên Integer)' },
        { en: '`bin` (Binary)', vi: '`bin` (Nhị phân)' },
        { en: '`dif` (AllDifferent)', vi: '`dif` (Tất cả khác nhau)' },
        { en: '`<= 100`', vi: '`<= 100`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Setting the constraint to `int` restricts the decision variables strictly to whole integer values.',
        vi: 'Thiết lập ràng buộc là `int` sẽ giới hạn các biến số ra quyết định nghiêm ngặt là các số nguyên.'
      },
      difficulty: 'medium',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q7',
      type: 'true_false',
      question: {
        en: 'True or False: In Goal Seek, the "Set cell" MUST contain a formula, not a hardcoded static value.',
        vi: 'Đúng hay Sai: Trong Goal Seek, ô "Set cell" BẮT BUỘC phải chứa một công thức, không được là giá trị gõ cứng.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Goal Seek requires an underlying formula to establish the mathematical relationship between the target cell and the changing cell.',
        vi: 'Đúng. Goal Seek bắt buộc ô mục tiêu phải có công thức để xác lập mối quan hệ toán học với ô biến đầu vào.'
      },
      difficulty: 'easy',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q8',
      type: 'single_choice',
      question: {
        en: 'What calculation setting stops massive What-If Data Tables from continually recalculating and freezing large financial models?',
        vi: 'Cài đặt tính toán nào ngăn không cho các Bảng dữ liệu What-If Data Tables khổng lồ liên tục tính toán lại gây đơ các mô hình tài chính lớn?'
      },
      options: [
        { en: 'Formulas -> Calculation Options -> "Automatic Except for Data Tables"', vi: 'Formulas -> Calculation Options -> "Automatic Except for Data Tables"' },
        { en: 'Manual mode for the whole computer', vi: 'Chế độ Manual cho toàn bộ máy tính' },
        { en: 'Turn off Wi-Fi', vi: 'Tắt Wi-Fi' },
        { en: 'Delete the table', vi: 'Xóa bảng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '"Automatic Except for Data Tables" preserves live formula updates while deferring heavy table matrix recalculations until F9 is pressed.',
        vi: '"Automatic Except for Data Tables" duy trì cập nhật công thức trực tiếp trong khi hoãn việc tính toán lại bảng ma trận nặng cho đến khi nhấn F9.'
      },
      difficulty: 'medium',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q9',
      type: 'single_choice',
      question: {
        en: 'What does the `bin` constraint in Solver enforce on a changing cell?',
        vi: 'Ràng buộc `bin` trong Solver bắt buộc ô biến thay đổi phải mang giá trị gì?'
      },
      options: [
        { en: 'Binary value: strictly `0` (No/Off) or `1` (Yes/On) (used for Go/No-Go capital allocation decisions)', vi: 'Giá trị nhị phân: nghiêm ngặt là `0` (Không/Tắt) hoặc `1` (Có/Bật) (dùng cho các quyết định đầu tư Có/Không)' },
        { en: 'Any positive number', vi: 'Bất kỳ số dương nào' },
        { en: 'A text string', vi: 'Một chuỗi văn bản' },
        { en: 'A date in 2026', vi: 'Một ngày trong năm 2026' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Binary constraints (0 or 1) model boolean logic decisions such as whether to launch a project or open a new facility.',
        vi: 'Ràng buộc nhị phân (0 hoặc 1) mô hình hóa các quyết định logic như có nên triển khai dự án hay mở thêm chi nhánh mới hay không.'
      },
      difficulty: 'hard',
      topicId: 'excel_what_if'
    },
    {
      id: 'excel_l20_q10',
      type: 'single_choice',
      question: {
        en: 'Which What-If tool is best suited for generating a loan amortization repayment matrix showing monthly payments across 10 different interest rates and 5 different loan terms?',
        vi: 'Công cụ What-If nào phù hợp nhất để tạo ma trận trả nợ khoản vay hiển thị số tiền trả hàng tháng qua 10 mức lãi suất khác nhau và 5 kỳ hạn vay khác nhau?'
      },
      options: [
        { en: 'Two-Variable Data Table', vi: 'Bảng dữ liệu 2 biến (Two-Variable Data Table)' },
        { en: 'Goal Seek', vi: 'Goal Seek' },
        { en: 'Solver', vi: 'Solver' },
        { en: 'Flash Fill', vi: 'Flash Fill' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A Two-Variable Data Table effortlessly evaluates the 2D matrix of 10 rates by 5 terms simultaneously.',
        vi: 'Bảng dữ liệu 2 biến tính toán ma trận 2 chiều gồm 10 mức lãi suất kết hợp với 5 kỳ hạn vay một cách nhanh chóng.'
      },
      difficulty: 'easy',
      topicId: 'excel_what_if'
    }
  ]
};

saveLesson('lesson20.ts', 'lesson20', lesson20);

// =========================================================================
// LESSON 21: Financial Mathematics & Capital Budgeting (NPV, XNPV, IRR, XIRR, PMT)
// Preserved ID: excel_lesson_financial_math
// =========================================================================
export const lesson21: Lesson = {
  id: 'excel_lesson_financial_math',
  order: 21,
  courseId: 'excel',
  levelId: 'advanced',
  topicId: 'excel_financial_math',
  title: {
    en: 'Financial Mathematics, Valuation & Capital Budgeting: NPV, XNPV, IRR, XIRR & PMT',
    vi: 'Toán Tài Chính, Định Giá & Thẩm Định Dự Án Đầu Tư: NPV, XNPV, IRR, XIRR & PMT'
  },
  summary: {
    en: 'Master enterprise valuation and investment appraisal: Time Value of Money (TVM), loan amortization modeling with PMT, PPMT, and IPMT, Net Present Value with NPV vs date-specific XNPV, and Internal Rate of Return with IRR vs irregular cash flow XIRR.',
    vi: 'Làm chủ định giá doanh nghiệp và thẩm định dự án đầu tư: Giá trị thời gian của tiền tệ (TVM), xây dựng lịch trả nợ vay với PMT, PPMT và IPMT, Giá trị hiện tại thuần với NPV vs XNPV theo ngày chính xác, và Tỷ suất hoàn vốn nội bộ với IRR vs XIRR cho dòng tiền bất thường.'
  },
  learn: {
    introduction: {
      en: 'A dollar today is worth more than a dollar tomorrow. Capital budgeting is the discipline of discounting future expected cash flows back to the present day to determine whether an acquisition, factory expansion, or startup investment creates real economic value above the hurdle rate. Excel is the global industry standard platform for discounted cash flow (DCF) modeling.',
      vi: 'Một đồng ngày hôm nay luôn có giá trị hơn một đồng trong tương lai. Thẩm định dự án đầu tư là bộ môn chiết khấu dòng tiền kỳ vọng trong tương lai về hiện tại để xác định xem một thương vụ mua lại, mở rộng nhà máy hay đầu tư khởi nghiệp có tạo ra giá trị kinh tế thực sự vượt qua tỷ suất sinh lời tối thiểu hay không. Excel là nền tảng tiêu chuẩn toàn cầu cho việc lập mô hình chiết khấu dòng tiền (DCF).'
    },
    conceptExplanation: {
      en: `### 1. Loan Amortization Functions
- **\`=PMT(rate, nper, pv, [fv], [type])\`**: Computes total periodic payment (Principal + Interest).
  - *Monthly adjustment*: Pass \`AnnualRate / 12\` and \`Years * 12\`.
- **\`=IPMT()\`**: Extracts the **Interest component** of a specific payment period.
- **\`=PPMT()\`**: Extracts the **Principal component** of a specific payment period (\`PMT = IPMT + PPMT\`).

### 2. Net Present Value: NPV vs XNPV
- **The Fatal Flaw of \`NPV()\`**: Excel\'s \`=NPV(rate, value1, value2, ...)\` assumes *all cash flows occur at the END of equal annual periods*. You must add the initial investment (Time 0) *outside* the function:
  \`=InitialInvestment + NPV(DiscountRate, FutureCashFlows)\`
- **The Gold Standard \`XNPV()\`**: Takes exact calendar dates for each transaction, delivering mathematically perfect fractional-year discounting:
  \`=XNPV(rate, values, dates)\`

### 3. Internal Rate of Return: IRR vs XIRR
- **\`=IRR(values, [guess])\`**: Returns the discount rate at which NPV equals exactly $0 for periodic cash flows.
- **\`=XIRR(values, dates, [guess])\`**: Computes the exact annualized IRR for irregular, real-world transaction dates.`,
      vi: `### 1. Các Hàm Lập Lịch Trả Nợ Vay
- **\`=PMT(lai_suat, so_ky, gia_tri_hien_tai, [fv], [type])\`**: Tính tổng số tiền phải trả định kỳ (Gốc + Lãi).
  - *Quy đổi theo tháng*: Truyền \`LaiSuatNam / 12\` và \`SoNam * 12\`.
- **\`=IPMT()\`**: Trích xuất phần **Tiền Lãi** phải trả trong một kỳ cụ thể.
- **\`=PPMT()\`**: Trích xuất phần **Tiền Gốc** phải trả trong một kỳ cụ thể (\`PMT = IPMT + PPMT\`).

### 2. Giá Trị Hiện Tại Thuần: NPV vs XNPV
- **Điểm yếu chí mạng của hàm \`NPV()\`**: Hàm \`=NPV(lai_suat, value1, ...)\` của Excel mặc định *mọi dòng tiền đều xảy ra vào CUỐI các kỳ đều đặn*. Bạn phải cộng chi phí đầu tư ban đầu (Thời điểm 0) *ở bên ngoài* hàm:
  \`=ChiPhiBanDau + NPV(TySuatChietKhau, DongTienTuongLai)\`
- **Chuẩn Mực Vàng \`XNPV()\`**: Nhận ngày tháng lịch cụ thể cho từng giao dịch, mang lại kết quả chiết khấu dòng tiền theo ngày lẻ chuẩn xác:
  \`=XNPV(lai_suat, mang_dong_tien, mang_ngay_thang)\`

### 3. Tỷ Suất Hoàn Vốn Nội Bộ: IRR vs XIRR
- **\`=IRR(mang_dong_tien, [du_doan])\`**: Trả về tỷ suất chiết khấu mà tại đó NPV đúng bằng 0$ cho các dòng tiền định kỳ.
- **\`=XIRR(mang_dong_tien, mang_ngay_thang, [du_doan])\`**: Tính toán tỷ suất hoàn vốn nội bộ hàng năm hóa chính xác cho các dòng tiền thực tế không đều đặn theo ngày.`
    },
    syntax: `# Loan Payment (Monthly):
=PMT(7%/12, 30*12, -500000)

# Net Present Value (Periodic vs Irregular):
=InitialOutlay + NPV(WACC, CashFlowsYear1to5)
=XNPV(WACC, CashFlows, DateSchedule)

# Internal Rate of Return (Irregular Dates):
=XIRR(CashFlows, DateSchedule)`,
    examples: [
      {
        title: { en: 'Mortgage Loan Monthly Payment Calculation', vi: 'Tính Khoản Tiền Trả Góp Mua Nhà Hàng Tháng' },
        code: `Loan Amount: $400,000 in B1
Annual Interest Rate: 6.5% in B2
Loan Term: 30 Years in B3

Monthly Payment Formula in B4:
=PMT(B2/12, B3*12, -B1)
Result: $2,528.27 per month`,
        description: {
          en: 'Entering loan amount as negative returns a positive monthly payment value.',
          vi: 'Nhập số tiền vay là số âm sẽ trả về giá trị số tiền thanh toán hàng tháng là số dương.'
        }
      },
      {
        title: { en: 'Appraising Private Equity Deal with XNPV and XIRR', vi: 'Thẩm Định Đầu Tư Quỹ Tư Nhân Bằng XNPV và XIRR' },
        code: `Dates in A2:A6: 2024-01-15, 2024-06-30, 2025-03-31, 2025-12-31, 2026-11-15
Cash Flows in B2:B6: -1,000,000, 200,000, 350,000, 400,000, 600,000
Hurdle Rate: 12% in D1

XNPV in D2: =XNPV(D1, B2:B6, A2:A6)  -> $221,845 (Positive -> Invest!)
XIRR in D3: =XIRR(B2:B6, A2:A6)       -> 21.4% (Exceeds 12% Hurdle Rate -> Strong Buy)`,
        description: {
          en: 'XNPV and XIRR handle exact irregular deal closing and exit dates for institutional private equity modeling.',
          vi: 'XNPV và XIRR xử lý chính xác các ngày giải ngân và thoái vốn thực tế cho các mô hình quỹ đầu tư tổ chức.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Including the initial negative cash outlay (Year 0) INSIDE the =NPV() function arguments (=NPV(10%, A1:A5 where A1 is Year 0)), which incorrectly discounts Year 0 by a full year.',
          vi: 'Đưa khoản chi đầu tư ban đầu âm (Năm 0) vào BÊN TRONG hàm =NPV() (=NPV(10%, A1:A5 trong đó A1 là Năm 0)), khiến Năm 0 bị chiết khấu sai mất 1 năm.'
        },
        correction: {
          en: 'Initial Year 0 investment must be added outside NPV: =A1 + NPV(Rate, A2:A5), OR use =XNPV() which handles Year 0 natively.',
          vi: 'Khoản đầu tư Năm 0 phải được cộng ở ngoài: =A1 + NPV(LaiSuat, A2:A5), HOẶC dùng hàm =XNPV() vốn đã hỗ trợ Năm 0 nguyên bản.'
        }
      }
    ],
    tips: [
      { en: 'Always Prefer XIRR and XNPV: Institutional financial analysts almost exclusively use XNPV and XIRR over legacy NPV/IRR due to date precision.', vi: 'Luôn ưu tiên XIRR và XNPV: Các chuyên gia tài chính định chế gần như luôn dùng XNPV và XIRR thay cho NPV/IRR cổ điển nhờ độ chính xác theo ngày.' },
      { en: 'Rule of Decision: If NPV > 0 (or IRR > Cost of Capital / WACC), the project creates shareholder value and should be accepted.', vi: 'Quy tắc ra quyết định: Nếu NPV > 0 (hoặc IRR > Chi phí sử dụng vốn WACC), dự án tạo ra giá trị gia tăng và nên được phê duyệt đầu tư.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l21_ex1',
      type: 'complete_code',
      title: { en: 'Calculate Monthly Mortgage Payment', vi: 'Tính Khoản Trả Nợ Vay Mua Nhà Hàng Tháng' },
      instruction: {
        en: 'Write the PMT formula to calculate monthly payment for an 8% annual rate (8%/12), 20 years (20*12), and loan amount $250,000 (-250000).',
        vi: 'Viết công thức PMT để tính số tiền trả hàng tháng với lãi suất năm 8% (8%/12), thời hạn 20 năm (20*12), và khoản vay 250.000$ (-250000).'
      },
      starterCode: '=PMT(8%/12, ',
      solutionCode: '=PMT(8%/12, 20*12, -250000)',
      expectedOutput: '=PMT(8%/12, 20*12, -250000)',
      hint: { en: 'Pass 8%/12, 20*12, -250000.', vi: 'Truyền 8%/12, 20*12, -250000.' },
      explanation: { en: 'PMT calculates periodic fixed payments based on constant interest rates.', vi: 'PMT tính toán khoản thanh toán định kỳ cố định dựa trên lãi suất không đổi.' }
    },
    {
      id: 'excel_l21_ex2',
      type: 'complete_code',
      title: { en: 'Date-Precise Net Present Value with XNPV', vi: 'Tính Giá Trị Hiện Tại Thuần Chính Xác Theo Ngày Bằng XNPV' },
      instruction: {
        en: 'Write the XNPV formula for discount rate in cell D1, cash flow values in B2:B10, and dates in A2:A10.',
        vi: 'Viết công thức XNPV cho tỷ suất chiết khấu ở ô D1, các giá trị dòng tiền ở B2:B10, và ngày tháng ở A2:A10.'
      },
      starterCode: '=XNPV(',
      solutionCode: '=XNPV(D1, B2:B10, A2:A10)',
      expectedOutput: '=XNPV(D1, B2:B10, A2:A10)',
      hint: { en: '=XNPV(D1, B2:B10, A2:A10)', vi: '=XNPV(D1, B2:B10, A2:A10)' },
      explanation: { en: 'XNPV calculates net present value using fractional calendar year discounting.', vi: 'XNPV tính giá trị hiện tại thuần dựa trên số ngày thực tế trong năm.' }
    }
  ],
  challenge: {
    id: 'excel_l21_challenge',
    title: { en: 'Compute Exact Annualized Internal Rate of Return', vi: 'Tính Tỷ Suất Hoàn Vốn Nội Bộ Hàng Năm Chính Xác' },
    description: {
      en: 'Construct the XIRR formula to determine the annualized internal rate of return for project cash flows in range B2:B12 mapped against exact milestone dates in A2:A12.',
      vi: 'Xây dựng công thức XIRR để xác định tỷ suất hoàn vốn nội bộ hàng năm cho các dòng tiền dự án trong dải B2:B12 tương ứng với các ngày mốc chính xác tại A2:A12.'
    },
    requirements: [
      { en: 'Use the XIRR function', vi: 'Sử dụng hàm XIRR' },
      { en: 'Pass values range B2:B12 first', vi: 'Truyền dải giá trị B2:B12 trước' },
      { en: 'Pass dates range A2:A12 second', vi: 'Truyền dải ngày tháng A2:A12 thứ hai' }
    ],
    starterCode: '=',
    solutionCode: '=XIRR(B2:B12, A2:A12)',
    hints: [
      { en: 'Syntax: =XIRR(Values, Dates)', vi: 'Cú pháp: =XIRR(GiaTri, NgayThang)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l21_q1',
      type: 'single_choice',
      question: {
        en: 'Why is `XNPV` considered superior to standard `NPV` in financial modeling?',
        vi: 'Tại sao `XNPV` lại được coi là vượt trội hơn `NPV` tiêu chuẩn trong mô hình tài chính?'
      },
      options: [
        { en: 'XNPV discounts cash flows based on exact specific calendar dates rather than assuming equal periodic annual intervals', vi: 'XNPV chiết khấu dòng tiền dựa trên các ngày lịch cụ thể chính xác thay vì giả định các khoảng thời gian năm đều đặn' },
        { en: 'XNPV runs without an internet connection', vi: 'XNPV chạy không cần kết nối internet' },
        { en: 'NPV is deprecated', vi: 'NPV đã bị loại bỏ' },
        { en: 'XNPV only works on tax returns', vi: 'XNPV chỉ dùng cho tờ khai thuế' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Real transactions rarely occur on exact 365-day intervals; XNPV accurately accounts for exact calendar cash flow timing.',
        vi: 'Các giao dịch thực tế hiếm khi diễn ra đúng chu kỳ 365 ngày; XNPV tính toán chính xác theo thời điểm thực tế của dòng tiền.'
      },
      difficulty: 'easy',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q2',
      type: 'single_choice',
      question: {
        en: 'What is the mathematical definition of the Internal Rate of Return (IRR)?',
        vi: 'Định nghĩa toán học của Tỷ suất hoàn vốn nội bộ (IRR) là gì?'
      },
      options: [
        { en: 'The discount rate at which the Net Present Value (NPV) of all cash flows equals exactly zero ($0)', vi: 'Tỷ suất chiết khấu mà tại đó Giá trị hiện tại thuần (NPV) của tất cả các dòng tiền bằng đúng số không ($0)' },
        { en: 'The prime bank lending interest rate', vi: 'Lãi suất cho vay cơ bản của ngân hàng' },
        { en: 'Total revenue divided by total cost', vi: 'Tổng doanh thu chia cho tổng chi phí' },
        { en: 'The rate of inflation', vi: 'Tỷ lệ lạm phát' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'IRR is the breakeven discount rate that equates the present value of expected cash inflows with initial cash outflows.',
        vi: 'IRR là tỷ suất chiết khấu hòa vốn làm cho giá trị hiện tại của các dòng tiền thu về bằng đúng với vốn đầu tư ban đầu.'
      },
      difficulty: 'medium',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q3',
      type: 'single_choice',
      question: {
        en: 'In loan amortization modeling, what is the mathematical relationship between `PMT`, `IPMT`, and `PPMT` for any given period?',
        vi: 'Trong mô hình trả nợ vay, mối quan hệ toán học giữa `PMT`, `IPMT` và `PPMT` trong bất kỳ kỳ nào là gì?'
      },
      options: [
        { en: '`PMT = IPMT + PPMT` (Total Payment = Interest Payment + Principal Payment)', vi: '`PMT = IPMT + PPMT` (Tổng tiền trả = Tiền lãi + Tiền gốc)' },
        { en: '`PMT = IPMT * PPMT`', vi: '`PMT = IPMT * PPMT`' },
        { en: '`IPMT = PMT + PPMT`', vi: '`IPMT = PMT + PPMT`' },
        { en: 'There is no relationship', vi: 'Không có mối liên hệ nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Every installment payment (PMT) is split cleanly into an interest component (IPMT) and a principal amortization component (PPMT).',
        vi: 'Mỗi khoản thanh toán định kỳ (PMT) được chia rành mạch thành phần trả lãi (IPMT) và phần trả nợ gốc (PPMT).'
      },
      difficulty: 'easy',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q4',
      type: 'single_choice',
      question: {
        en: 'When calculating monthly mortgage payments using `=PMT()`, how must an annual interest rate of 6% and a 30-year term be entered?',
        vi: 'Khi tính tiền trả nợ mua nhà hàng tháng bằng `=PMT()`, mức lãi suất năm 6% và kỳ hạn 30 năm phải được nhập như thế nào?'
      },
      options: [
        { en: 'Rate: `6%/12`, Nper: `30*12`', vi: 'Lãi suất Rate: `6%/12`, Số kỳ Nper: `30*12`' },
        { en: 'Rate: `6%`, Nper: `30`', vi: 'Rate: `6%`, Nper: `30`' },
        { en: 'Rate: `0.06*12`, Nper: `30/12`', vi: 'Rate: `0.06*12`, Nper: `30/12`' },
        { en: 'Rate: `6`, Nper: `360/30`', vi: 'Rate: `6`, Nper: `360/30`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'All arguments must be calibrated to the payment period: divide annual rate by 12 months, and multiply years by 12 periods.',
        vi: 'Tất cả đối số phải được quy về cùng đơn vị chu kỳ trả nợ: chia lãi suất năm cho 12 tháng, và nhân số năm với 12 kỳ.'
      },
      difficulty: 'easy',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q5',
      type: 'single_choice',
      question: {
        en: 'What is the classic mistake analysts make when using standard `=NPV()` for project valuation?',
        vi: 'Sai lầm kinh điển mà các chuyên gia phân tích thường mắc phải khi dùng hàm `=NPV()` tiêu chuẩn để định giá dự án là gì?'
      },
      options: [
        { en: 'Including the initial investment (Time 0) inside the NPV value range, which discounts Time 0 cash flow by a full year', vi: 'Bao gồm cả vốn đầu tư ban đầu (Thời điểm 0) vào dải giá trị bên trong hàm NPV, khiến dòng tiền Năm 0 bị chiết khấu sai mất 1 năm' },
        { en: 'Entering interest rates as decimals', vi: 'Nhập lãi suất dạng số thập phân' },
        { en: 'Using negative numbers for expenses', vi: 'Dùng số âm cho chi phí' },
        { en: 'Calculating NPV on computers', vi: 'Tính NPV trên máy tính' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Excel\'s NPV assumes the first item occurs at the end of Period 1. Time 0 initial investments must be added outside the formula: =Outlay0 + NPV(Rate, CashFlows1_to_N).',
        vi: 'Hàm NPV của Excel mặc định khoản tiền đầu tiên xảy ra ở cuối Kỳ 1. Khoản đầu tư Năm 0 bắt buộc phải cộng bên ngoài: =VonDauTu0 + NPV(LaiSuat, DongTien1_den_N).'
      },
      difficulty: 'medium',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q6',
      type: 'single_choice',
      question: {
        en: 'What does a positive Net Present Value (`NPV > 0`) indicate about an investment opportunity?',
        vi: 'Chỉ số Giá trị hiện tại thuần dương (`NPV > 0`) cho biết điều gì về một cơ hội đầu tư?'
      },
      options: [
        { en: 'The project generates returns exceeding the required hurdle rate / cost of capital, creating net shareholder wealth', vi: 'Dự án tạo ra lợi nhuận vượt qua tỷ suất sinh lời tối thiểu / chi phí sử dụng vốn, gia tăng tài sản ròng cho cổ đông' },
        { en: 'The project is losing money', vi: 'Dự án đang bị lỗ' },
        { en: 'The loan is fully paid off', vi: 'Khoản vay đã được thanh toán hết' },
        { en: 'The investment is risk-free', vi: 'Khoản đầu tư không có rủi ro' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'NPV > 0 confirms that the present value of all future cash inflows exceeds the cost of investment discounted at the cost of capital.',
        vi: 'NPV > 0 xác nhận rằng giá trị hiện tại của các dòng tiền thu về trong tương lai lớn hơn chi phí đầu tư ban đầu khi chiết khấu theo chi phí vốn.'
      },
      difficulty: 'easy',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q7',
      type: 'true_false',
      question: {
        en: 'True or False: In cash flow arrays passed to `IRR` or `XIRR`, there MUST be at least one negative value (representing capital outlay) and at least one positive value (representing cash inflow).',
        vi: 'Đúng hay Sai: Trong mảng dòng tiền truyền vào hàm `IRR` hoặc `XIRR`, BẮT BUỘC phải có ít nhất một giá trị âm (chi vốn đầu tư) và ít nhất một giá trị dương (dòng tiền thu về).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. If all cash flows are positive or all negative, no internal rate of return exists and Excel returns #NUM!.',
        vi: 'Đúng. Nếu mọi dòng tiền đều dương hoặc đều âm, không tồn tại tỷ suất hoàn vốn nội bộ và Excel sẽ báo lỗi #NUM!.'
      },
      difficulty: 'easy',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q8',
      type: 'single_choice',
      question: {
        en: 'What optional argument in `IRR` and `XIRR` helps Excel converge on a solution if the formula returns `#NUM!` on complex cash flows?',
        vi: 'Đối số tùy chọn nào trong hàm `IRR` và `XIRR` giúp Excel hội tụ tìm ra nghiệm nếu công thức báo lỗi `#NUM!` trên các dòng tiền phức tạp?'
      },
      options: [
        { en: '`[guess]` (an initial estimate of the rate, e.g. 0.1)', vi: '`[guess]` (ước tính ban đầu của tỷ suất, ví dụ 0.1)' },
        { en: '`[force]`', vi: '`[force]`' },
        { en: '`[retry]`', vi: '`[retry]`' },
        { en: '`[accuracy]`', vi: '`[accuracy]`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'IRR uses an iterative algorithm; providing an initial `[guess]` provides a starting point for non-standard cash flow patterns.',
        vi: 'IRR sử dụng thuật toán lặp; cung cấp tham số `[guess]` ban đầu giúp Excel có điểm xuất phát cho các mẫu dòng tiền phức tạp.'
      },
      difficulty: 'hard',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q9',
      type: 'single_choice',
      question: {
        en: 'What does the `PV()` function compute in Excel?',
        vi: 'Hàm `PV()` trong Excel tính toán giá trị nào?'
      },
      options: [
        { en: 'The current Present Value of an annuity series of future fixed periodic payments', vi: 'Giá trị hiện tại Present Value của một chuỗi các khoản thanh toán định kỳ cố định trong tương lai' },
        { en: 'The Peak Value of a stock', vi: 'Giá đỉnh của một cổ phiếu' },
        { en: 'The Page View analytics', vi: 'Lượt xem trang web' },
        { en: 'The Project Velocity', vi: 'Tốc độ dự án' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PV calculates the lump-sum current worth of a series of future constant cash payments discounted at a constant interest rate.',
        vi: 'Hàm PV tính giá trị hiện tại tương đương một lần của một chuỗi các khoản tiền trả định kỳ cố định trong tương lai theo lãi suất nhất định.'
      },
      difficulty: 'easy',
      topicId: 'excel_financial_math'
    },
    {
      id: 'excel_l21_q10',
      type: 'single_choice',
      question: {
        en: 'In loan amortization schedules, why does the interest payment (`IPMT`) decrease each month while the principal payment (`PPMT`) increases?',
        vi: 'Trong lịch trả nợ vay, tại sao số tiền lãi (`IPMT`) giảm dần mỗi tháng trong khi số tiền gốc (`PPMT`) lại tăng dần?'
      },
      options: [
        { en: 'Because interest is calculated on the remaining outstanding loan balance, which shrinks as principal is paid down', vi: 'Bởi vì tiền lãi được tính trên dư nợ gốc thực tế còn lại, và dư nợ này giảm dần theo từng kỳ trả gốc' },
        { en: 'The bank changes the interest rate monthly', vi: 'Ngân hàng thay đổi lãi suất hàng tháng' },
        { en: 'Due to inflation fluctuations', vi: 'Do biến động lạm phát' },
        { en: 'It is a visual formatting illusion', vi: 'Đó chỉ là ảo giác định dạng hiển thị' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'As each monthly installment reduces outstanding principal, the subsequent month\'s interest charge diminishes, shifting more of the fixed payment toward principal.',
        vi: 'Khi mỗi kỳ trả góp làm giảm dần dư nợ gốc, tiền lãi phát sinh ở kỳ sau sẽ giảm đi, nhường chỗ cho phần trả gốc nhiều hơn trong khoản tiền trả cố định.'
      },
      difficulty: 'medium',
      topicId: 'excel_financial_math'
    }
  ]
};

saveLesson('lesson21.ts', 'lesson21', lesson21);

// Create Advanced Module 01 index
const advMod01IndexCode = `import { Lesson } from '../../../../types';
import { lesson19 } from './lesson19';
import { lesson20 } from './lesson20';
import { lesson21 } from './lesson21';

export { lesson19 } from './lesson19';
export { lesson20 } from './lesson20';
export { lesson21 } from './lesson21';

export const module01Lessons: Lesson[] = [
  lesson19,
  lesson20,
  lesson21,
];

export default module01Lessons;
`;

fs.writeFileSync(path.join(advMod01Dir, 'index.ts'), advMod01IndexCode, 'utf8');
console.log('Advanced Module 01 completed (Lessons 19, 20, 21).');
