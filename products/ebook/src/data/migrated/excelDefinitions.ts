import { Book } from '../../types';

export const EXCEL_DEFINITIONS_BOOK: Book = {
  id: 'excel-definitions',
  slug: 'excel-definitions',
  title: 'Excel Terminology & Formula Glossary',
  subtitle: {
    en: 'Volatile Functions, Spilled Range Operator, Structured References & Data Model Definitions',
    vi: 'Thuật Ngữ Hàm Volatile, Toán Tử Vùng Tràn, Tham Chiếu Có Cấu Trúc & Mô Hình Dữ Liệu Excel',
  },
  bookType: 'Definitions',
  categoryId: 'excel',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-12',
  accentColor: 'from-emerald-500 to-green-700',
  tags: ['Definitions', 'Glossary', 'Excel Engine', 'Functions', 'Excel'],
  description: {
    en: 'Precision definitions and mental models for core Excel concepts: Volatile Functions, Spilled Range Operator (#), Structured References (Table[@Column]), and the Excel Data Model (xVelocity).',
    vi: 'Định nghĩa chuẩn xác và mô hình tư duy cho các khái niệm Excel cốt lõi: Hàm Volatile, Toán tử vùng tràn (#), Tham chiếu có cấu trúc (Table[@Column]) và Mô hình dữ liệu Excel Data Model (xVelocity).',
  },
  prerequisites: {
    en: [
      'Basic familiarity with Excel workbook navigation and formula writing',
    ],
    vi: [
      'Làm quen cơ bản với thao tác sử dụng bảng tính Excel và nhập công thức',
    ],
  },
  outcomes: {
    en: [
      'Identify and diagnose volatile functions (NOW, TODAY, OFFSET, INDIRECT) causing workbook calculation lag',
      'Leverage the spilled range operator (#) to reference dynamic array outputs cleanly',
      'Write robust structured table references that automatically scale with data ingestion',
    ],
    vi: [
      'Nhận biết và chẩn đoán các hàm volatile (NOW, TODAY, OFFSET, INDIRECT) làm chậm tốc độ tính toán của file',
      'Sử dụng thành thạo toán tử vùng tràn (#) để tham chiếu mảng động gọn gàng và an toàn',
      'Viết các tham chiếu bảng có cấu trúc tự động co giãn theo dữ liệu nạp vào',
    ],
  },
  chapters: [
    {
      id: 'xl-def-ch-1',
      number: 1,
      slug: 'volatile-functions-and-spill-terms',
      title: {
        en: 'Volatile Functions & Spilled Range Terms',
        vi: 'Khái Niệm Hàm Volatile & Thuật Ngữ Vùng Tràn',
      },
      summary: {
        en: 'Formal definitions for Volatile Functions, calculation triggers, and the Spilled Range Operator (`#`).',
        vi: 'Định nghĩa chuẩn cho các hàm Volatile, cơ chế kích hoạt tính toán và Toán tử vùng tràn (`#`).',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'xl-def-1-1',
          title: {
            en: 'Volatile Function',
            vi: 'Hàm Biến Đổi (Volatile Function)',
          },
          keyIdea: {
            en: 'Volatile functions force Excel to recalculate their formulas on EVERY user interaction anywhere in the workbook, bypassing the dependency tree dirty-cell optimization.',
            vi: 'Hàm Volatile ép Excel phải tính toán lại sau BẤT KỲ thao tác nào của người dùng trên toàn bộ file, bỏ qua cơ chế tối ưu chỉ tính ô dirty của cây phụ thuộc.',
          },
          content: {
            en: 'A **Volatile Function** is an Excel formula function that is recalculated whenever calculation occurs anywhere in the workbook, regardless of whether its input precedent cells have changed. Standard functions (like `SUM` or `XLOOKUP`) only recalculate when their input precedents change. In contrast, volatile functions (such as `NOW()`, `TODAY()`, `OFFSET()`, `INDIRECT()`, `RAND()`, `RANDBETWEEN()`, and `INFO()`) are automatically added to the calculation chain on every single workbook edit, formatting change, or sheet recalculation, causing noticeable typing and calculation lag in large workbooks.',
            vi: '**Hàm Volatile (Hàm Biến Đổi)** là hàm trong Excel luôn bị tính toán lại mỗi khi có bất kỳ sự kiện tính toán nào xảy ra trên toàn bộ file, bất kể các ô đầu vào của nó có thay đổi hay không. Các hàm thông thường (như `SUM` hay `XLOOKUP`) chỉ tính lại khi ô tiền nhiệm thay đổi. Ngược lại, các hàm volatile (như `NOW()`, `TODAY()`, `OFFSET()`, `INDIRECT()`, `RAND()`, `RANDBETWEEN()` và `INFO()`) luôn bị đưa vào hàng đợi tính toán sau mỗi lần gõ phím, định dạng ô hay mở trang tính, gây ra tình trạng đơ giật bảng tính trong các file lớn.',
          },
          definitionDetails: {
            term: {
              en: 'Volatile Function',
              vi: 'Hàm Biến Đổi (Volatile Function)',
            },
            formalDefinition: {
              en: 'A formula function flagged by the Excel calculation engine to recalculate unconditionally during every recalculation cycle, regardless of precedent cell mutation state.',
              vi: 'Một hàm công thức được engine tính toán của Excel đánh dấu sẽ luôn tính lại vô điều kiện trong mọi chu trình tính toán, bất kể trạng thái của các ô tiền nhiệm có thay đổi hay không.',
            },
            mentalModel: {
              en: 'A non-volatile function is a doorbell that only rings when someone presses the button. A volatile function is a continuous chime that rings every time anyone opens any door in the building.',
              vi: 'Hàm thông thường giống như chuông cửa chỉ reo khi có ai bấm nút. Hàm volatile giống như chiếc chuông báo liên hồi sẽ kêu mỗi khi có bất kỳ ai mở bất kỳ cánh cửa nào trong tòa nhà.',
            },
            whyItMatters: {
              en: 'Excessive use of volatile functions like OFFSET and INDIRECT in financial models is the primary cause of spinning wait cursors and slow Excel responsiveness.',
              vi: 'Lạm dụng các hàm volatile như OFFSET và INDIRECT trong các mô hình tài chính là nguyên nhân hàng đầu khiến Excel bị xoay con trỏ chờ và phản hồi chậm.',
            },
            commonMisconception: {
              en: 'Believing that hiding the sheet containing volatile functions stops them from recalculating. Excel recalculates volatile functions across all visible and hidden sheets equally.',
              vi: 'Nghĩ rằng ẩn sheet chứa hàm volatile sẽ làm nó ngừng tính toán. Excel tính toán các hàm volatile trên tất cả các sheet hiển thị lẫn sheet bị ẩn như nhau.',
            },
            quickReference: {
              en: [
                'Volatile Functions: NOW(), TODAY(), OFFSET(), INDIRECT(), RAND(), RANDBETWEEN()',
                'Non-Volatile Replacements: INDEX instead of OFFSET, XLOOKUP instead of INDIRECT, Power Query for transformations',
                'Performance Rule: Keep volatile functions under 10 instances per workbook',
              ],
              vi: [
                'Các hàm Volatile: NOW(), TODAY(), OFFSET(), INDIRECT(), RAND(), RANDBETWEEN()',
                'Hàm thay thế an toàn: Dùng INDEX thay OFFSET, XLOOKUP thay INDIRECT, dùng Power Query để biến đổi dữ liệu',
                'Quy tắc hiệu năng: Giới hạn dưới 10 hàm volatile trong một file Excel',
              ],
            },
            minimalExample: {
              language: 'excel',
              filename: 'non_volatile_replacement.txt',
              explanation: {
                en: 'Replacing volatile OFFSET with non-volatile INDEX reference syntax.',
                vi: 'Thay thế hàm OFFSET bị volatile bằng cú pháp tham chiếu INDEX không bị volatile.',
              },
              code: `// Risky Volatile Formula:
=OFFSET(A1, 5, 0)

// High-Performance Non-Volatile Replacement:
=INDEX(A:A, 6)`,
            },
          },
        },
        {
          id: 'xl-def-1-2',
          title: {
            en: 'Spilled Range & The Spilled Range Operator (`#`)',
            vi: 'Vùng Tràn & Toán Tử Vùng Tràn (`#`)',
          },
          keyIdea: {
            en: 'A Spilled Range is the dynamic grid footprint of an array formula; the hash (`#`) operator allows downstream formulas to reference this variable-sized area automatically without hardcoded coordinates.',
            vi: 'Vùng Tràn là diện tích lưới ô động của một công thức mảng; toán tử thăng (`#`) cho phép các công thức phía sau tự động tham chiếu toàn bộ diện tích này mà không cần viết cứng tọa độ.',
          },
          content: {
            en: 'In modern Microsoft Excel, when a formula evaluates to multiple values (a vector or a 2D matrix), it automatically populates neighboring empty cells—a process called **Spilling**. The rectangular collection of cells occupied by these results is termed the **Spilled Range**. To reference this entire dynamic range in another formula, you append the hash symbol (`#`) to the origin cell reference (e.g. `F2#`). If the spilled array expands from 5 rows to 500 rows upon source data refresh, all formulas referencing `F2#` automatically adapt without manual formula dragging.',
            vi: 'Trong Microsoft Excel hiện đại, khi một công thức trả về nhiều giá trị (một vector hoặc một ma trận 2 chiều), nó tự động trải đều kết quả sang các ô trống lân cận—quá trình này gọi là **Spilling (Tràn)**. Vùng hình chữ nhật chứa các ô kết quả này được gọi là **Vùng Tràn (Spilled Range)**. Để tham chiếu toàn bộ vùng động này trong một công thức khác, bạn chỉ cần thêm ký tự thăng (`#`) vào sau ô gốc (ví dụ `F2#`). Nếu mảng tràn mở rộng từ 5 dòng lên 500 dòng khi nạp thêm dữ liệu, tất cả các công thức đang trỏ tới `F2#` sẽ tự động co giãn theo mà không cần phải kéo công thức bằng tay.',
          },
          definitionDetails: {
            term: {
              en: 'Spilled Range Operator (`#`)',
              vi: 'Toán Tử Vùng Tràn (`#`)',
            },
            formalDefinition: {
              en: 'A postfix syntactic operator in Excel that designates a reference to the entire rectangular dynamic array range anchored at the specified origin cell coordinate.',
              vi: 'Toán tử hậu tố trong Excel chỉ định tham chiếu đến toàn bộ vùng mảng động hình chữ nhật có gốc neo tại tọa độ ô được chỉ định.',
            },
            mentalModel: {
              en: 'Think of the origin cell (F2) as the captain of an accordion. When you pull the accordion (F2#), the entire bellows opens up together.',
              vi: 'Hãy hình dung ô gốc (F2) như tay cầm của một chiếc đàn xếp accordion. Khi bạn kéo đàn (F2#), toàn bộ các nếp gấp âm thanh sẽ cùng bung ra theo.',
            },
            whyItMatters: {
              en: 'Eliminates the legacy requirement of pre-allocating exact cell ranges or writing complicated VBA scripts to dynamically calculate totals on variable-length lists.',
              vi: 'Loại bỏ hoàn toàn yêu cầu phải ước lượng trước số dòng ô hoặc viết macro VBA phức tạp để tính toán trên các danh sách có độ dài thay đổi.',
            },
            commonMisconception: {
              en: 'Trying to place the `#` operator on a secondary cell inside the spilled range (e.g. `F5#`). The `#` operator is only valid when applied to the top-left origin cell where the master formula resides.',
              vi: 'Cố gắng đặt dấu `#` vào các ô con bên trong vùng tràn (như `F5#`). Toán tử `#` chỉ hợp lệ khi áp dụng trực tiếp lên ô gốc trên cùng bên trái nơi chứa công thức chính.',
            },
            quickReference: {
              en: [
                'Syntax: CellReference# (e.g., A2#, K5#)',
                'Scope: Automatically encompasses all rows and columns of the spilled output array',
                'Error: Returns #REF! if applied to a cell that does not contain a dynamic array formula',
              ],
              vi: [
                'Cú Pháp: DiaChiOGoc# (ví dụ A2#, K5#)',
                'Phạm Vi: Tự động bao trùm toàn bộ các dòng và cột của mảng kết quả tràn',
                'Lỗi: Trả về #REF! nếu áp dụng lên một ô không chứa công thức mảng động',
              ],
            },
            minimalExample: {
              language: 'excel',
              filename: 'spill_operator_demo.txt',
              explanation: {
                en: 'Summing total sales for all departments generated by a dynamic spilled range.',
                vi: 'Tính tổng doanh thu cho toàn bộ các phòng ban được sinh ra từ một mảng tràn động.',
              },
              code: `// In cell A2: generates list of unique customer regions
=UNIQUE(Orders[Region])

// In cell B2: calculates total revenue dynamically for every item in A2#
=SUMIFS(Orders[Amount], Orders[Region], A2#)`,
            },
          },
        },
      ],
    },
    {
      id: 'xl-def-ch-2',
      number: 2,
      slug: 'excel-tables-structured-references',
      title: {
        en: 'Excel Tables, Structured References & Data Models',
        vi: 'Bảng Excel Table, Tham Chiếu Có Cấu Trúc & Data Model',
      },
      summary: {
        en: 'Formal definitions for Structured References (Table[@Column]), ListObjects, and the Power Pivot in-memory Data Model.',
        vi: 'Định nghĩa chuẩn cho Tham Chiếu Có Cấu Trúc (Table[@Column]), ListObject và Mô Hình Dữ Liệu Excel Data Model.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'xl-def-2-1',
          title: {
            en: 'Structured Reference (Table[@Column])',
            vi: 'Tham Chiếu Có Cấu Trúc (Structured Reference)',
          },
          keyIdea: {
            en: 'Structured References use explicit table and column names instead of cell coordinates, automatically expanding when new rows are appended and making formulas self-documenting.',
            vi: 'Tham Chiếu Có Cấu Trúc sử dụng trực tiếp tên bảng và tên cột thay vì tọa độ ô, tự động mở rộng khi có dòng mới thêm vào và giúp công thức dễ đọc, dễ hiểu.',
          },
          content: {
            en: 'When a range of cells is converted into an official **Excel Table** (via `Ctrl+T` or Insert > Table), Excel encapsulates the dataset into a `ListObject`. Formulas interacting with the table utilize **Structured Reference Syntax**. Instead of cryptic cell ranges like `C2:C500`, formulas use semantic identifiers such as `Sales[Revenue]`. The `@` operator (e.g. `[@Quantity]`) denotes the value from the *same row* in which the formula is currently executing, supporting readable and robust business calculations.',
            vi: 'Khi một vùng ô được chuyển thành một **Excel Table** chính thức (bằng phím tắt `Ctrl+T` hoặc Insert > Table), Excel sẽ đóng gói tập dữ liệu vào một đối tượng `ListObject`. Các công thức tương tác với bảng sẽ sử dụng **Cú Pháp Tham Chiếu Có Cấu Trúc (Structured Reference)**. Thay vì dùng các tọa độ khó nhớ như `C2:C500`, công thức sử dụng các định danh ngữ nghĩa như `Sales[Revenue]`. Ký tự `@` (ví dụ `[@Quantity]`) biểu thị giá trị của *cùng dòng hiện tại* nơi công thức đang chạy, giúp công thức rõ ràng và dễ bảo trì.',
          },
          definitionDetails: {
            term: {
              en: 'Structured Reference',
              vi: 'Tham Chiếu Có Cấu Trúc (Structured Reference)',
            },
            formalDefinition: {
              en: 'A declarative syntax in Excel formulas that replaces coordinate-based cell addressing (A1:B10) with semantic table and column tokens (TableName[ColumnName]).',
              vi: 'Cú pháp khai báo trong công thức Excel thay thế việc định địa chỉ ô theo tọa độ (A1:B10) bằng các token ngữ nghĩa theo tên bảng và tên cột (TenBang[TenCot]).',
            },
            mentalModel: {
              en: 'Coordinate addressing is giving someone GPS latitude/longitude coordinates to find a book. Structured referencing is giving them the library aisle name and book title.',
              vi: 'Định địa chỉ tọa độ giống như đưa tọa độ GPS vĩ độ/kinh độ để tìm một cuốn sách. Tham chiếu có cấu trúc là đưa tên khu vực thư viện và tựa đề cuốn sách.',
            },
            whyItMatters: {
              en: 'Formulas written with structured references never break when columns are reordered, inserted, or sorted, and automatically propagate across newly appended rows.',
              vi: 'Công thức viết bằng tham chiếu có cấu trúc không bao giờ bị lệch khi chèn thêm cột, đổi chỗ cột hoặc sắp xếp, và tự động áp dụng cho các dòng mới thêm vào.',
            },
            commonMisconception: {
              en: 'Assuming structured references slow down calculations. Modern Excel optimizes structured table lookups with internal column vectors.',
              vi: 'Nghĩ rằng tham chiếu có cấu trúc làm chậm tốc độ tính toán. Excel hiện đại tối ưu hóa các phép tra cứu bảng bằng các vector cột nội bộ.',
            },
            quickReference: {
              en: [
                'Same row value: TableName[@ColumnName] (e.g., Orders[@Amount])',
                'Entire column: TableName[ColumnName] (e.g., Orders[Amount])',
                'All table data without headers: TableName[#Data]',
                'Complete table with headers and totals: TableName[#All]',
              ],
              vi: [
                'Giá trị cùng dòng: TenBang[@TenCot] (ví dụ Orders[@Amount])',
                'Toàn bộ cột: TenBang[TenCot] (ví dụ Orders[Amount])',
                'Toàn bộ dữ liệu bảng không gồm tiêu đề: TenBang[#Data]',
                'Toàn bộ bảng gồm cả tiêu đề và dòng tổng: TenBang[#All]',
              ],
            },
            minimalExample: {
              language: 'excel',
              filename: 'structured_reference.txt',
              explanation: {
                en: 'Calculating net price in an Excel Table using the @ same-row structured reference.',
                vi: 'Tính giá ròng trong Excel Table sử dụng tham chiếu cùng dòng @.',
              },
              code: `// Calculated column formula inside Sales table:
=[@UnitPrice] * [@Quantity] * (1 - [@DiscountPct])`,
            },
          },
        },
        {
          id: 'xl-def-2-2',
          title: {
            en: 'Excel Data Model (Power Pivot / xVelocity Engine)',
            vi: 'Mô Hình Dữ Liệu Excel (Data Model / Engine xVelocity)',
          },
          keyIdea: {
            en: 'The Excel Data Model embeds an in-memory tabular relational database inside the workbook, enabling multi-table relationships and million-row analytics without worksheet grid limits.',
            vi: 'Mô Hình Dữ Liệu Excel tích hợp một cơ sở dữ liệu quan hệ dạng bảng trong RAM ngay bên trong file Excel, cho phép liên kết nhiều bảng và xử lý hàng triệu dòng vượt giới hạn của bảng tính.',
          },
          content: {
            en: 'The **Excel Data Model** (often referred to as Power Pivot) is an internal columnar analytical database powered by the xVelocity (VertiPaq) engine embedded directly inside modern Excel workbooks. Rather than being restricted to the traditional 1,048,576 row limit of a worksheet grid, tables loaded into the Data Model can contain tens of millions of rows. Tables in the Data Model connect via 1-to-many relationships, allowing users to build unified multi-table PivotTables and author sophisticated DAX measures directly inside Excel.',
            vi: '**Mô Hình Dữ Liệu Excel (Excel Data Model)** (thường gọi là Power Pivot) là một cơ sở dữ liệu phân tích dạng cột trong bộ nhớ do engine xVelocity (VertiPaq) cung cấp, tích hợp trực tiếp bên trong các file Excel hiện đại. Thay vì bị giới hạn ở con số 1.048.576 dòng của lưới bảng tính truyền thống, các bảng nạp vào Data Model có thể chứa hàng chục triệu dòng dữ liệu. Các bảng trong Data Model liên kết với nhau qua các mối quan hệ 1-nhiều, cho phép người dùng xây dựng các bảng PivotTable đa bảng thống nhất và viết các measure DAX phức tạp ngay trong Excel.',
          },
          definitionDetails: {
            term: {
              en: 'Excel Data Model',
              vi: 'Mô Hình Dữ Liệu Excel (Excel Data Model)',
            },
            formalDefinition: {
              en: 'An in-memory relational columnar database embedded within an Excel workbook (.xlsx/.xlsb) that stores multi-table schemas, relationships, and DAX calculations.',
              vi: 'Cơ sở dữ liệu quan hệ dạng cột trong bộ nhớ được nhúng bên trong file Excel (.xlsx/.xlsb), lưu trữ lược đồ nhiều bảng, mối quan hệ và các phép tính DAX.',
            },
            mentalModel: {
              en: 'A standard worksheet is a paper ledger with a maximum page size. The Data Model is a high-speed relational SQL server humming quietly inside your laptop\'s RAM.',
              vi: 'Bảng tính thông thường giống như cuốn sổ cái bằng giấy có giới hạn số trang. Data Model là một máy chủ CSDL quan hệ tốc độ cao chạy âm thầm ngay trong RAM máy tính của bạn.',
            },
            whyItMatters: {
              en: 'Enables business analysts to merge multiple ERP, CRM, and sales tables without writing fragile VLOOKUP formulas across worksheet tabs.',
              vi: 'Cho phép chuyên viên phân tích hợp nhất dữ liệu từ nhiều nguồn ERP, CRM và bán hàng mà không cần phải viết các hàm VLOOKUP dễ vỡ nối giữa các tab tính.',
            },
            commonMisconception: {
              en: 'Believing that loading 5 million rows into the Data Model will create a 500 MB file. VertiPaq columnar compression typically compresses 5 million rows into less than 25 MB.',
              vi: 'Nghĩ rằng nạp 5 triệu dòng vào Data Model sẽ làm file phình to 500 MB. Cơ chế nén cột VertiPaq thường nén 5 triệu dòng xuống chỉ còn chưa đầy 25 MB.',
            },
            quickReference: {
              en: [
                'Access: Data > Manage Data Model (or Power Pivot tab)',
                'Capacity: Millions of rows (bounded only by 64-bit RAM)',
                'Language: DAX (Data Analysis Expressions) for measures and calculated columns',
              ],
              vi: [
                'Truy cập: Data > Manage Data Model (hoặc tab Power Pivot)',
                'Dung lượng: Hàng chục triệu dòng (chỉ giới hạn bởi RAM 64-bit)',
                'Ngôn ngữ: DAX (Data Analysis Expressions) để viết measure và calculated column',
              ],
            },
            minimalExample: {
              language: 'dax',
              filename: 'excel_data_model_measure.dax',
              explanation: {
                en: 'An explicit DAX measure authored in the Excel Data Model for a multi-table PivotTable.',
                vi: 'Một explicit DAX measure được viết trong Excel Data Model dùng cho PivotTable đa bảng.',
              },
              code: `// Authored in Excel Power Pivot Data Model:
Total Margin % = 
DIVIDE(
    SUM(FactSales[ProfitAmount]),
    SUM(FactSales[SalesAmount])
)`,
            },
          },
        },
      ],
    },
  ],
};
