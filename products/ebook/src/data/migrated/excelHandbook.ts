import { Book } from '../../types';

export const EXCEL_HANDBOOK_BOOK: Book = {
  id: 'excel-handbook',
  slug: 'excel-handbook',
  title: 'Excel Handbook',
  subtitle: {
    en: 'Calculation Grid Mechanics, Dynamic Arrays & Memory Architectures',
    vi: 'Cơ Chế Lưới Tính Toán, Mảng Động & Kiến Trúc Bộ Nhớ Trong Excel Hiện Đại',
  },
  bookType: 'Handbook',
  categoryId: 'excel',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Comprehensive',
  estimatedReadTime: '45 mins',
  chaptersCount: 3,
  publishedDate: '2025-02-10',
  accentColor: 'from-emerald-600 to-green-800',
  tags: ['Excel', 'Spreadsheet', 'Dynamic Arrays', 'Data Analysis', 'Handbook'],
  description: {
    en: 'Authoritative engineering reference for Microsoft Excel: the spreadsheet calculation grid, dependency tree evaluation, reference lock mechanics ($), modern Dynamic Array spill engine (#), and in-memory PivotCache optimization.',
    vi: 'Cẩm nang kỹ thuật chuẩn xác về Microsoft Excel: cơ chế lưới tính toán, cây phụ thuộc công thức, tham chiếu ô ($), engine mảng động tràn tự động (#) và tối ưu hóa bộ nhớ PivotCache.',
  },
  prerequisites: {
    en: [
      'Basic spreadsheet operational literacy and formula editing skills',
      'Familiarity with business data tables and tabular data layouts',
    ],
    vi: [
      'Kỹ năng tin học văn phòng cơ bản và thao tác nhập công thức bảng tính',
      'Làm quen với các bảng dữ liệu kinh doanh và bố cục dữ liệu dạng bảng',
    ],
  },
  outcomes: {
    en: [
      'Master absolute ($A$1), relative ($A1/A$1), and 3D reference systems alongside Excel dependency tree evaluation',
      'Architect resilient Dynamic Array formulas (XLOOKUP, FILTER, UNIQUE, SEQUENCE) with spill operator (#) syntax',
      'Optimize workbook calculation speed by eliminating volatile cascades and managing in-memory PivotCache refreshes',
    ],
    vi: [
      'Làm chủ hệ thống tham chiếu tuyệt đối ($A$1), tương đối, hỗn hợp và cơ chế tính toán cây phụ thuộc của Excel',
      'Xây dựng công thức mảng động bền vững (XLOOKUP, FILTER, UNIQUE, SEQUENCE) với toán tử tràn (#)',
      'Tối ưu tốc độ tính toán file Excel bằng cách triệt tiêu chuỗi hàm volatile và quản lý bộ nhớ PivotCache',
    ],
  },
  parts: [
    {
      partNumber: 1,
      romanNumeral: 'I',
      title: {
        en: 'Grid Architecture & Formula Dependency Trees',
        vi: 'Kiến Trúc Lưới Tính & Cây Phụ Thuộc Công Thức',
      },
      description: {
        en: 'Spreadsheet coordinate systems, absolute vs relative reference locks ($), and calculation dependency evaluation.',
        vi: 'Hệ tọa độ ô bảng tính, các kiểu khóa tham chiếu ($) và cơ chế đánh giá cây phụ thuộc tính toán.',
      },
    },
    {
      partNumber: 2,
      romanNumeral: 'II',
      title: {
        en: 'Dynamic Array Engine & Modern Vector Lookups',
        vi: 'Engine Mảng Động & Các Hàm Tra Cứu Vector Hiện Đại',
      },
      description: {
        en: 'The dynamic array calculation engine, spilled range operator (#), and vector lookups (XLOOKUP vs VLOOKUP).',
        vi: 'Động cơ tính toán mảng động, toán tử vùng tràn (#) và kỹ thuật tra cứu vector (XLOOKUP vs VLOOKUP).',
      },
    },
    {
      partNumber: 3,
      romanNumeral: 'III',
      title: {
        en: 'In-Memory Aggregation & PivotCache Architecture',
        vi: 'Tổng Hợp Dữ Liệu Bộ Nhớ & Kiến Trúc PivotCache',
      },
      description: {
        en: 'PivotTable internal architecture, in-memory PivotCache indexing, and high-speed aggregation workflows.',
        vi: 'Kiến trúc nội bộ của PivotTable, chỉ mục bộ nhớ PivotCache và quy trình tổng hợp dữ liệu tốc độ cao.',
      },
    },
  ],
  chapters: [
    {
      id: 'xl-hb-ch-1',
      number: 1,
      slug: 'cell-references-and-calculation-grid',
      title: {
        en: 'Cell References & Calculation Grid Mechanics',
        vi: 'Tham Chiếu Ô & Cơ Chế Lưới Tính Toán',
      },
      summary: {
        en: 'Grid coordinates, Relative vs Absolute ($) vs Mixed locks, dependency trees, dirty cell tracking, and calculation phases.',
        vi: 'Tọa độ lưới ô, khóa tham chiếu Tương đối vs Tuyệt đối ($) vs Hỗn hợp, cây phụ thuộc, đánh dấu dirty cell và các pha tính toán.',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'xl-hb-1-1',
          title: {
            en: 'Reference Systems ($A$1 vs $A1 vs A$1) & Dependency Tree Topology',
            vi: 'Hệ Thống Tham Chiếu ($A$1 vs $A1 vs A$1) & Cây Phụ Thuộc Tính Toán',
          },
          keyIdea: {
            en: 'The dollar ($) sign freezes specific coordinate dimensions during copy/drag operations. Excel calculates cells along an internal directed acyclic dependency tree, recalculating only marked dirty cells.',
            vi: 'Dấu đô-la ($) cố định tọa độ cụ thể khi sao chép công thức. Excel tính toán các ô dựa trên cây phụ thuộc có hướng không chu trình và chỉ tính lại những ô bị đánh dấu "dirty".',
          },
          content: {
            en: 'The Microsoft Excel calculation engine operates on a 2D coordinate plane comprising 1,048,576 rows by 16,384 columns. Cell referencing defines how formulas link across the grid:\n\n1. **Relative Reference (`A1`)**: Shifts dynamically relative to the target cell when dragged horizontally or vertically.\n2. **Absolute Reference (`$A$1`)**: Both column A and row 1 are locked completely; copying the formula anywhere always targets cell A1.\n3. **Mixed Reference (`$A1` or `A$1`)**: Locks only the column (`$A1`, useful for matrix row headers) or only the row (`A$1`, useful for table column headers).\n\nUnder the hood, Excel constructs an internal **Dependency Tree** mapping which cells depend on which precedents. When a cell\'s value changes, Excel flags all dependent descendants as "dirty" and queues them for recalculation during the next calculation pass, ensuring unchanged cells are not redundantly computed.',
            vi: 'Engine tính toán của Microsoft Excel vận hành trên mặt phẳng tọa độ 2 chiều gồm 1.048.576 dòng và 16.384 cột. Hệ thống tham chiếu ô xác định cách các công thức liên kết dữ liệu trên bảng tính:\n\n1. **Tham Chiếu Tương Đối (`A1`)**: Tự động dịch chuyển tương đối theo vị trí ô đích khi kéo công thức theo chiều ngang hoặc chiều dọc.\n2. **Tham Chiếu Tuyệt Đối (`$A$1`)**: Cố định hoàn toàn cả cột A và dòng 1; sao chép công thức tới bất kỳ vị trí nào cũng luôn trỏ về đúng ô A1.\n3. **Tham Chiếu Hỗn Hợp (`$A1` hoặc `A$1`)**: Chỉ cố định cột (`$A1`, ứng dụng khi cố định tiêu đề dòng trong ma trận) hoặc chỉ cố định dòng (`A$1`, ứng dụng khi cố định tiêu đề cột).\n\nBên dưới hệ thống, Excel xây dựng một **Cây Phụ Thuộc (Dependency Tree)** nội bộ để theo dõi ô nào phụ thuộc vào ô tiền nhiệm nào. Khi giá trị của một ô thay đổi, Excel đánh dấu tất cả các ô hậu duệ liên quan là "dirty" (cần tính lại) và đưa vào hàng đợi tính toán ở lượt tiếp theo, đảm bảo không tính lại các ô không bị ảnh hưởng.',
          },
          codeBlock: {
            language: 'excel',
            filename: 'matrix_lookup_references.txt',
            explanation: {
              en: 'Demonstrating mixed reference locks in a 2-way pricing matrix where price equals Units ($A2) times Tier Rate (B$1).',
              vi: 'Minh họa khóa tham chiếu hỗn hợp trong bảng ma trận tính giá 2 chiều: Giá = Số lượng ($A2) nhân Tỷ giá bậc thang (B$1).',
            },
            code: `// Multiplied across rows and columns in a 2D matrix table:
// $A2 locks the quantity column while allowing row expansion
// B$1 locks the rate header row while allowing column expansion
=$A2 * B$1`,
          },
          comparisonTable: {
            headers: {
              en: ['Reference Type', 'Syntax', 'Drag Horizontal (Right)', 'Drag Vertical (Down)', 'Common Use Case'],
              vi: ['Kiểu Tham Chiếu', 'Cú Pháp', 'Kéo Ngang (Sang Phải)', 'Kéo Dọc (Xuống Dưới)', 'Trường Hợp Sử Dụng Phổ Biến'],
            },
            rows: [
              {
                en: ['Relative', 'A1', 'Col shifts (B1, C1...)', 'Row shifts (A2, A3...)', 'Standard row-by-row line item math'],
                vi: ['Tương đối', 'A1', 'Cột dịch chuyển (B1, C1...)', 'Dòng dịch chuyển (A2, A3...)', 'Phép tính từng dòng đơn hàng tiêu chuẩn'],
              },
              {
                en: ['Absolute', '$A$1', 'Locked at $A$1', 'Locked at $A$1', 'Global tax rates, lookup tables, static config'],
                vi: ['Tuyệt đối', '$A$1', 'Cố định tại $A$1', 'Cố định tại $A$1', 'Tỷ giá thuế chung, bảng tra cứu, cấu hình tĩnh'],
              },
              {
                en: ['Mixed (Column Lock)', '$A1', 'Locked at Column $A', 'Row shifts ($A2, $A3...)', 'Referencing row labels across multi-column models'],
                vi: ['Hỗn hợp (Khóa cột)', '$A1', 'Cố định tại Cột $A', 'Dòng dịch chuyển ($A2, $A3...)', 'Tham chiếu nhãn dòng trong bảng nhiều cột'],
              },
              {
                en: ['Mixed (Row Lock)', 'A$1', 'Col shifts (B$1, C$1...)', 'Locked at Row $1', 'Referencing column header values down rows'],
                vi: ['Hỗn hợp (Khóa dòng)', 'A$1', 'Cột dịch chuyển (B$1, C$1...)', 'Cố định tại Dòng $1', 'Tham chiếu giá trị tiêu đề cột xuống các dòng'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Excel Dependency Tree Calculation Cycle',
              vi: 'Chu Trình Tính Toán Cây Phụ Thuộc Của Excel',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'User Value Mutation',
                  vi: 'Thay Đổi Giá Trị Đầu Vào',
                },
                description: {
                  en: 'Cell A1 is edited. Excel identifies all dependent nodes referencing A1 across active sheets.',
                  vi: 'Ô A1 được chỉnh sửa. Excel quét toàn bộ các node công thức đang tham chiếu tới A1.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Dirty State Marking',
                  vi: 'Đánh Dấu Trạng Thái Cần Tính Lại (Dirty)',
                },
                description: {
                  en: 'Only direct and indirect downstream dependent cells are flagged dirty; independent cells remain untouched.',
                  vi: 'Chỉ các ô phụ thuộc trực tiếp và gián tiếp mới bị đánh dấu dirty; các ô độc lập khác giữ nguyên.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Topological Tree Recalculation',
                  vi: 'Tính Toán Lại Theo Thứ Tự Cây Phụ Thuộc',
                },
                description: {
                  en: 'Excel recalculates dirty cells in strict topological order, preventing circular reference locks.',
                  vi: 'Excel tính lại các ô dirty theo đúng thứ tự topo, ngăn chặn lỗi vòng lặp công thức.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Pressing Enter on a relative reference formula and copying it down without locking lookup table ranges',
                vi: 'Nhập công thức tham chiếu tương đối rồi kéo xuống mà quên không khóa vùng bảng tra cứu',
              },
              why: {
                en: 'The lookup table range shifts down row-by-row (e.g., from $F$2:$G$50 to F3:G51, F4:G52), returning #N/A errors on bottom records.',
                vi: 'Vùng bảng tra cứu bị trôi xuống từng dòng (từ $F$2:$G$50 thành F3:G51, F4:G52), làm phát sinh lỗi #N/A ở các dòng bên dưới.',
              },
              solution: {
                en: 'Press F4 to lock lookup array ranges as absolute ($F$2:$G$50) or convert the range to an Excel Table.',
                vi: 'Nhấn phím F4 để khóa tuyệt đối vùng mảng tra cứu ($F$2:$G$50) hoặc chuyển vùng ô thành Excel Table.',
              },
            },
          ],
          bestPractices: {
            en: [
              'Use the F4 shortcut key while typing formula references to cycle through A1 -> $A$1 -> A$1 -> $A1 -> A1',
              'Convert tabular raw ranges into structured Excel Tables (Ctrl+T) to eliminate fragile coordinate indexing',
              'Avoid chaining volatile functions (INDIRECT, OFFSET) inside dependency trees to prevent full-workbook recalculation lag',
            ],
            vi: [
              'Dùng phím tắt F4 khi gõ công thức để chuyển nhanh qua lại giữa A1 -> $A$1 -> A$1 -> $A1 -> A1',
              'Chuyển các vùng dữ liệu bảng thô sang thẻ Excel Table (Ctrl+T) để không phải quản lý tọa độ thủ công',
              'Tránh nối chuỗi các hàm volatile (INDIRECT, OFFSET) trong cây phụ thuộc để ngăn tình trạng file bị đơ do tính lại toàn bộ',
            ],
          },
          practicalScenario: {
            title: {
              en: 'Building a Dynamic Sensitivity Table for Financial Projections',
              vi: 'Xây Dựng Bảng Độ Nhạy Tài Chính Bằng Tham Chiếu Hỗn Hợp',
            },
            description: {
              en: 'A financial analyst constructed a 10x10 loan repayment matrix testing 10 interest rates (columns B1:K1) across 10 principal amounts (rows A2:A11). By applying the mixed formula `=-PMT(B$1/12, 360, $A2)`, a single formula copied across all 100 cells generated the entire sensitivity grid without a single coordinate error.',
              vi: 'Một chuyên viên tài chính xây dựng ma trận trả nợ vay 10x10 kiểm tra 10 mức lãi suất (cột B1:K1) với 10 mức vốn gốc vay (dòng A2:A11). Bằng cách áp dụng công thức hỗn hợp `=-PMT(B$1/12, 360, $A2)`, chỉ với một công thức duy nhất kéo cho toàn bộ 100 ô đã tạo ra toàn bộ bảng độ nhạy mà không hề bị lệch tọa độ.',
            },
          },
          keyTakeaways: {
            en: [
              'The dollar ($) sign explicitly fixes rows, columns, or both during formula replication',
              'Excel evaluates formulas along an optimized topological dependency tree, recalculating only dirty cells',
              'Mixed references ($A1 and A$1) are the secret to building high-density 2D matrix models with a single formula',
            ],
            vi: [
              'Dấu đô-la ($) cố định chính xác dòng, cột hoặc cả hai khi sao chép công thức',
              'Excel đánh giá công thức theo cây phụ thuộc tối ưu và chỉ tính lại các ô bị đánh dấu dirty',
              'Tham chiếu hỗn hợp ($A1 và A$1) là bí quyết để tạo các mô hình ma trận 2 chiều phức tạp bằng một công thức duy nhất',
            ],
          },
        },
      ],
    },
    {
      id: 'xl-hb-ch-2',
      number: 2,
      slug: 'dynamic-array-engine-spilling',
      title: {
        en: 'Dynamic Arrays, Spilled Ranges (#) & Vector Calculations',
        vi: 'Mảng Động, Vùng Tràn (#) & Các Phép Tính Vector',
      },
      summary: {
        en: 'The dynamic array calculation engine, automatic spilling, the `#` spilled range operator, #SPILL! resolution, and vector lookups (XLOOKUP vs VLOOKUP).',
        vi: 'Động cơ tính toán mảng động, tự động tràn dữ liệu, toán tử vùng tràn `#`, xử lý lỗi #SPILL! và tra cứu vector (XLOOKUP vs VLOOKUP).',
      },
      readTimeMinutes: 16,
      sections: [
        {
          id: 'xl-hb-2-1',
          title: {
            en: 'Spilled Range Topology, the `#` Operator & Modern Vector Lookups (XLOOKUP vs VLOOKUP)',
            vi: 'Cấu Trúc Vùng Tràn, Toán Tử `#` & Hàm Tra Cứu Vector (XLOOKUP vs VLOOKUP)',
          },
          keyIdea: {
            en: 'Modern Excel formulas can return arrays that automatically spill into neighboring blank cells. The `#` operator dynamically references the entire spilled range, eliminating legacy Ctrl+Shift+Enter array formulas.',
            vi: 'Công thức Excel hiện đại có thể trả về mảng dữ liệu tự động tràn (spill) sang các ô trống liền kề. Toán tử `#` tham chiếu động toàn bộ vùng tràn mà không cần bấm tổ hợp Ctrl+Shift+Enter cổ điển.',
          },
          content: {
            en: 'The introduction of the Dynamic Array engine fundamentally modernized spreadsheet computing in Excel. Rather than requiring users to enter legacy CSE (`Ctrl+Shift+Enter`) formulas into pre-selected bounding ranges, modern Excel functions (e.g. `FILTER`, `UNIQUE`, `SORT`, `SEQUENCE`, `XLOOKUP`) natively output array structures that automatically "spill" into adjacent rows and columns.\n\nKey features of the Dynamic Array engine:\n1. **Spill Border**: The bounding perimeter of the array is indicated by a thin blue border. The formula exists only in the top-left cell; downstream cells display ghost values that update reactively.\n2. **The Spilled Range Operator (`#`)**: Placing a hash symbol after the top-left cell reference (e.g. `A2#`) references the entire dynamic array, automatically scaling if the source data grows or shrinks.\n3. **Modern Vector Lookups (`XLOOKUP`)**: Unlike legacy `VLOOKUP`, `XLOOKUP` looks up values to the left or right, defaults to exact match, supports native 2-way lookups, and provides built-in fallback values without needing `IFERROR`.',
            vi: 'Sự ra đời của engine Mảng Động (Dynamic Array) đã hiện đại hóa hoàn toàn nền tảng tính toán bảng tính của Excel. Thay vì bắt người dùng phải bôi đen trước vùng ô rồi nhấn tổ hợp phím CSE (`Ctrl+Shift+Enter`) phức tạp, các hàm Excel hiện đại (như `FILTER`, `UNIQUE`, `SORT`, `SEQUENCE`, `XLOOKUP`) trả về cấu trúc mảng và tự động "tràn" (spill) xuống các dòng và cột liền kề.\n\nCác đặc tính cốt lõi của Engine Mảng Động:\n1. **Khung Viền Vùng Tràn (Spill Border)**: Ranh giới của mảng được hiển thị bằng viền xanh mảnh. Công thức chỉ nằm ở ô gốc trên cùng bên trái; các ô bên dưới hiển thị giá trị bóng mờ và tự cập nhật phản ứng theo ô gốc.\n2. **Toán Tử Vùng Tràn (`#`)**: Đặt ký tự thăng phía sau ô gốc (ví dụ `A2#`) sẽ tham chiếu đến toàn bộ mảng động, tự động co giãn kích thước khi dữ liệu nguồn thêm hoặc bớt dòng.\n3. **Tra Cứu Vector Hiện Đại (`XLOOKUP`)**: Khác với `VLOOKUP` cổ điển, `XLOOKUP` có thể tra cứu sang trái hoặc sang phải, mặc định tìm kiếm chính xác tuyệt đối, hỗ trợ tra cứu 2 chiều và tự xử lý giá trị khi không tìm thấy mà không cần bọc `IFERROR`.',
          },
          codeBlock: {
            language: 'excel',
            filename: 'dynamic_array_formulas.txt',
            explanation: {
              en: 'Combining FILTER, UNIQUE, and SORT with XLOOKUP and the # spilled range reference.',
              vi: 'Kết hợp các hàm FILTER, UNIQUE, SORT với XLOOKUP và toán tử tham chiếu vùng tràn #.',
            },
            code: `// 1. In cell D2: Filter and sort active departments dynamically (Spills downward)
=SORT(UNIQUE(Employees[Department]))

// 2. In cell E2: Sum salary for each spilled department using the # operator
// Automatically calculates for every department in the spilled range D2#
=SUMIFS(Employees[Salary], Employees[Department], D2#)

// 3. Modern XLOOKUP looking left to fetch Employee ID from Name:
=XLOOKUP(G2, Employees[FullName], Employees[ID], "Not Found", 0)`,
          },
          comparisonTable: {
            headers: {
              en: ['Capability', 'XLOOKUP (Modern)', 'VLOOKUP (Legacy)', 'INDEX / MATCH (Classic)'],
              vi: ['Tính Năng', 'XLOOKUP (Hiện Đại)', 'VLOOKUP (Cổ Điển)', 'INDEX / MATCH (Kinh Điển)'],
            },
            rows: [
              {
                en: ['Lookup Direction', 'Left, Right, Up, Down (Omnidirectional)', 'Right-only from first column', 'Omnidirectional (Separate col/row arrays)'],
                vi: ['Hướng Tra Cứu', 'Mọi hướng: Trái, Phải, Trên, Dưới', 'Chỉ sang phải từ cột đầu tiên', 'Mọi hướng (Tách riêng mảng dòng/cột)'],
              },
              {
                en: ['Default Match Mode', 'Exact Match (0)', 'Approximate Match (TRUE)', 'Exact Match (0)'],
                vi: ['Chế Độ Khớp Mặc Định', 'Khớp chính xác tuyệt đối (0)', 'Khớp tương đối (TRUE)', 'Khớp chính xác tuyệt đối (0)'],
              },
              {
                en: ['Column Insertion Safety', 'Resilient (Range reference)', 'Fragile (Hardcoded col index breaks)', 'Resilient (Range reference)'],
                vi: ['An Toàn Khi Chèn Cột', 'Bền vững (Tham chiếu mảng cột)', 'Dễ vỡ (Chỉ số cột bị lệch khi chèn)', 'Bền vững (Tham chiếu mảng cột)'],
              },
              {
                en: ['Missing Value Handling', 'Built-in `[if_not_found]` argument', 'Requires wrapping in `IFERROR()`', 'Requires wrapping in `IFERROR()`'],
                vi: ['Xử Lý Không Tìm Thấy', 'Có sẵn tham số `[if_not_found]`', 'Bắt buộc bọc ngoài bằng `IFERROR()`', 'Bắt buộc bọc ngoài bằng `IFERROR()`'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Dynamic Array Spill Allocation & Reference Flow',
              vi: 'Cơ Chế Phân Bổ Vùng Tràn & Dòng Chảy Tham Chiếu Mảng Động',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Master Formula Execution',
                  vi: 'Thực Thi Công Thức Ô Gốc',
                },
                description: {
                  en: 'Cell D2 evaluates `=UNIQUE(Table[Dept])`, producing an N-element vector in memory.',
                  vi: 'Ô D2 thực thi `=UNIQUE(Table[Dept])`, tạo ra một vector N phần tử trong bộ nhớ.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Spill Range Allocation',
                  vi: 'Phân Bổ Vùng Tràn Tự Động',
                },
                description: {
                  en: 'Engine verifies cells D3:D10 are empty and projects the vector across the range.',
                  vi: 'Engine kiểm tra các ô D3:D10 trống và tự động trải vector ra toàn bộ vùng ô.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Downstream Hash (#) Consumption',
                  vi: 'Tiếp Nhận Dữ Liệu Bằng Toán Tử (#)',
                },
                description: {
                  en: 'Formula in E2 uses `D2#` to instantly process all N spilled elements in a single vectorized pass.',
                  vi: 'Công thức tại E2 gọi `D2#` để xử lý toàn bộ N phần tử trong một lượt tính toán vector.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Encountering the `#SPILL!` error because existing data or merged cells obstruct the spill path',
                vi: 'Gặp lỗi `#SPILL!` do có dữ liệu cũ hoặc ô bị gộp (Merge) chắn đường tràn của công thức',
              },
              why: {
                en: 'Dynamic Array formulas require completely vacant cells within their projected output rectangle.',
                vi: 'Công thức mảng động bắt buộc tất cả các ô trong hình chữ nhật đầu ra dự kiến phải hoàn toàn trống.',
              },
              solution: {
                en: 'Clear the blocking cells indicated by the dotted spill outline and unmerge any formatted cells.',
                vi: 'Xóa các ô có dữ liệu đang chắn đường theo đường viền nét đứt và bỏ gộp (Unmerge) các ô.',
              },
            },
          ],
          bestPractices: {
            en: [
              'Replace legacy VLOOKUP formulas with XLOOKUP across all new models to eliminate column index breakage',
              'Use the `#` operator to consume spilled ranges dynamically rather than guessing static row heights',
              'Combine FILTER() with SORT() and UNIQUE() to create automated dashboard reporting tables without macros',
            ],
            vi: [
              'Thay thế toàn bộ công thức VLOOKUP cũ bằng XLOOKUP trên các file mới để không bị lỗi khi chèn cột',
              'Dùng toán tử `#` để tham chiếu mảng động thay vì ước lượng số dòng cứng',
              'Kết hợp FILTER() với SORT() và UNIQUE() để tạo các bảng báo cáo dashboard tự động mà không cần macro',
            ],
          },
          practicalScenario: {
            title: {
              en: 'Building an Automated Cascading Dropdown Filter in Excel',
              vi: 'Xây Dựng Menu Thả Xuống Phân Cấp Tự Động Trong Excel',
            },
            description: {
              en: 'To populate a cascading dropdown showing only products available in the selected category `J1`, write `=FILTER(Products[Name], Products[Category] = J1)` into cell `K2`. In Data Validation for the product dropdown cell, set Source to `=K2#`. The dropdown menu automatically shrinks or expands based on the selected category without VBA.',
              vi: 'Để tạo menu chọn sản phẩm chỉ hiển thị danh mục đã chọn tại ô `J1`, nhập công thức `=FILTER(Products[Name], Products[Category] = J1)` vào ô `K2`. Trong phần Data Validation của ô chọn sản phẩm, đặt nguồn là `=K2#`. Danh sách thả xuống sẽ tự động co giãn theo danh mục được chọn mà không cần dùng VBA.',
            },
          },
          keyTakeaways: {
            en: [
              'Dynamic Arrays eliminate the complexity of legacy CSE formulas and pre-allocated grid ranges',
              'The `#` operator creates resilient downstream formula links that automatically scale with array size',
              'XLOOKUP is the modern, omnidirectional replacement for VLOOKUP and INDEX/MATCH',
            ],
            vi: [
              'Mảng động xóa bỏ hoàn toàn sự phức tạp của công thức CSE cũ và việc phải bôi đen trước vùng ô',
              'Toán tử `#` tạo liên kết công thức bền vững tự động co giãn theo độ lớn của mảng',
              'XLOOKUP là giải pháp hiện đại đa hướng thay thế toàn diện cho VLOOKUP và INDEX/MATCH',
            ],
          },
        },
      ],
    },
    {
      id: 'xl-hb-ch-3',
      number: 3,
      slug: 'pivot-tables-data-summarization',
      title: {
        en: 'PivotTable Architecture, PivotCache & Dimensional Summarization',
        vi: 'Kiến Trúc PivotTable, Bộ Nhớ PivotCache & Tổng Hợp Dữ Liệu Chiều',
      },
      summary: {
        en: 'In-memory PivotCache architecture, memory deduplication across multiple PivotTables, Slicers, Calculated Fields, and refresh pipelines.',
        vi: 'Kiến trúc bộ nhớ PivotCache, tái sử dụng cache giữa nhiều PivotTable, thanh lọc Slicer, trường tính toán và quy trình làm mới dữ liệu.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'xl-hb-3-1',
          title: {
            en: 'PivotCache Memory Engine, Slicers & Calculated Field Execution',
            vi: 'Cơ Chế Bộ Nhớ PivotCache, Slicer & Thực Thi Calculated Field',
          },
          keyIdea: {
            en: 'PivotTables do not query worksheet cells directly; they operate over an optimized in-memory cache called the PivotCache. Sharing one PivotCache across multiple PivotTables dramatically reduces file size.',
            vi: 'PivotTable không đọc trực tiếp từ các ô bảng tính; nó vận hành trên một bộ nhớ đệm tối ưu gọi là PivotCache. Dùng chung một PivotCache cho nhiều PivotTable giúp giảm dung lượng file đáng kể.',
          },
          content: {
            en: 'When you create a PivotTable, Excel reads the source dataset once, builds a compressed in-memory columnar database called the **PivotCache**, and connects the PivotTable UI to that cache. Key operational mechanics include:\n\n1. **Disconnected Execution**: Because the PivotTable queries the PivotCache rather than worksheet cells, edits made to source table cells do **not** reflect in the PivotTable until an explicit "Refresh Data" action occurs.\n2. **Shared PivotCaches**: Creating 10 PivotTables from the exact same source range reuses the single PivotCache instance in memory. Grouping dates or numbers in one PivotTable will automatically group them across all connected PivotTables sharing that cache.\n3. **Calculated Fields vs Calculated Items**: A Calculated Field performs math on the *sum* of the underlying fields (`=Sales * 0.1`), whereas a Calculated Item inserts a new calculated virtual row into an existing dimension.',
            vi: 'Khi bạn tạo một PivotTable, Excel sẽ đọc tập dữ liệu nguồn một lần, xây dựng một cơ sở dữ liệu dạng cột nén trong bộ nhớ gọi là **PivotCache**, rồi kết nối giao diện PivotTable vào bộ nhớ cache đó. Các cơ chế vận hành chính gồm:\n\n1. **Thực Thi Tách Rời (Disconnected Execution)**: Do PivotTable truy vấn từ PivotCache chứ không đọc trực tiếp từng ô bảng tính, các chỉnh sửa ở bảng nguồn sẽ **không** tự cập nhật lên PivotTable cho đến khi người dùng bấm "Refresh Data".\n2. **Dùng Chung PivotCache (Shared PivotCaches)**: Tạo 10 PivotTable từ cùng một nguồn dữ liệu sẽ tái sử dụng chung một đối tượng PivotCache trong RAM. Nhóm ngày tháng hoặc số liệu ở một PivotTable sẽ tự động áp dụng cho tất cả các PivotTable dùng chung cache đó.\n3. **Calculated Field vs Calculated Item**: Calculated Field thực hiện phép tính trên *tổng* của các trường nguồn (`=Sales * 0.1`), trong khi Calculated Item chèn thêm một dòng ảo tính toán vào một chiều dữ liệu có sẵn.',
          },
          codeBlock: {
            language: 'excel',
            filename: 'pivot_table_source.txt',
            explanation: {
              en: 'Best practice structured table reference used as the clean dynamic source for an enterprise PivotCache.',
              vi: 'Thực hành chuẩn dùng tham chiếu bảng có cấu trúc làm nguồn dữ liệu động sạch cho PivotCache doanh nghiệp.',
            },
            code: `// Set PivotTable Data Source to structured table name rather than static cells:
// Source: SalesTransactions (automatically expands as new transactions are appended)
// Calculated Field: [BonusAmount] = [GrossRevenue] * 0.05`,
          },
          comparisonTable: {
            headers: {
              en: ['Component', 'Primary Role', 'Storage Location', 'Refresh Behavior', 'Performance Impact'],
              vi: ['Thành Phần', 'Vai Trò Chính', 'Nơi Lưu Trữ', 'Cơ Chế Refresh', 'Tác Động Hiệu Năng'],
            },
            rows: [
              {
                en: ['Source Data Table', 'Raw transactional records', 'Worksheet grid / Data Model', 'Immediate edit reflection', 'Standard worksheet memory'],
                vi: ['Bảng Dữ Liệu Nguồn', 'Lưu trữ bản ghi giao dịch thô', 'Lưới ô bảng tính / Data Model', 'Cập nhật ngay khi gõ phím', 'Bộ nhớ bảng tính thông thường'],
              },
              {
                en: ['PivotCache', 'Compressed in-memory index of source data', 'RAM memory cache', 'Requires explicit Refresh command', 'Instant sub-second multidimensional aggregation'],
                vi: ['PivotCache', 'Chỉ mục nén trong RAM của dữ liệu nguồn', 'Bộ nhớ đệm RAM', 'Bắt buộc nhấn lệnh Refresh', 'Tính toán tổng hợp đa chiều tức thời dưới 1 giây'],
              },
              {
                en: ['PivotTable Visual', 'Layout canvas (Rows, Columns, Values, Filters)', 'Worksheet view presentation', 'Renders from PivotCache slice', 'Lightweight rendering layer'],
                vi: ['Giao Diện PivotTable', 'Bố cục hiển thị (Dòng, Cột, Giá trị, Bộ lọc)', 'Lớp hiển thị trên bảng tính', 'Render trực tiếp từ lát cắt PivotCache', 'Lớp hiển thị rất nhẹ'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'PivotTable Data & PivotCache Ingestion Pipeline',
              vi: 'Quy Trình Nạp Dữ Liệu Của PivotCache & PivotTable',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Raw Source Ingestion',
                  vi: 'Nạp Dữ Liệu Nguồn Thô',
                },
                description: {
                  en: 'Excel scans the structured table `SalesData` and extracts distinct values per column.',
                  vi: 'Excel đọc bảng dữ liệu `SalesData` và trích xuất các giá trị phân biệt cho từng cột.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'PivotCache Index Construction',
                  vi: 'Xây Dựng Chỉ Mục PivotCache',
                },
                description: {
                  en: 'A high-speed columnar indexing structure is generated in RAM, decoupling calculations from grid cells.',
                  vi: 'Một cấu trúc chỉ mục dạng cột tốc độ cao được tạo trong RAM, tách rời hoàn toàn phép tính khỏi các ô bảng tính.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Multi-Pivot Slicing & Visual Rendering',
                  vi: 'Lọc Đa Chiều & Hiển Thị PivotTable',
                },
                description: {
                  en: 'Multiple independent PivotTables and Slicers read the shared cache without re-scanning raw rows.',
                  vi: 'Nhiều PivotTable và Slicer độc lập cùng đọc từ cache dùng chung mà không phải quét lại bảng dữ liệu thô.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Creating PivotTables from static range addresses (e.g. `Sheet1!$A$1:$Z$5000`) instead of structured Excel Tables',
                vi: 'Tạo PivotTable từ tọa độ vùng ô tĩnh (như `Sheet1!$A$1:$Z$5000`) thay vì dùng Excel Table',
              },
              why: {
                en: 'When new transactions are pasted below row 5000, the PivotCache does not include them even after clicking Refresh.',
                vi: 'Khi có thêm dữ liệu mới dán vào dưới dòng 5000, PivotCache sẽ không nhận diện được ngay cả khi đã bấm Refresh.',
              },
              solution: {
                en: 'Convert the source range to an Excel Table (Ctrl+T) first, and build the PivotTable pointing to the Table name.',
                vi: 'Chuyển vùng nguồn thành Excel Table (Ctrl+T) trước, rồi tạo PivotTable trỏ vào tên Bảng đó.',
              },
            },
          ],
          bestPractices: {
            en: [
              'Always use structured Excel Tables as PivotTable sources so new data rows are included automatically upon Refresh',
              'Share a single PivotCache across dashboard PivotTables to minimize file size and enable shared Slicers',
              'Turn off "Save source data with file" in PivotTable Options if distributing models with heavy Data Model backends to save disk space',
            ],
            vi: [
              'Luôn dùng Excel Table làm nguồn dữ liệu cho PivotTable để các dòng mới tự động được cập nhật khi bấm Refresh',
              'Dùng chung một PivotCache cho các PivotTable trên dashboard để giảm dung lượng file và đồng bộ thanh Slicer',
              'Tắt tùy chọn "Save source data with file" trong PivotTable Options khi gửi file có dung lượng lớn để tiết kiệm bộ nhớ đĩa',
            ],
          },
          practicalScenario: {
            title: {
              en: 'Constructing an Interactive Financial Performance Dashboard with Shared Slicers',
              vi: 'Xây Dựng Bảng Dashboard Tài Chính Tương Tác Với Thanh Lọc Slicer Dùng Chung',
            },
            description: {
              en: 'An operations manager built 4 distinct PivotTables analyzing Revenue by Region, Expense by Department, Headcount by Office, and Quarterly Margins. Because all 4 PivotTables were spawned from the shared `_GLData` PivotCache, connecting a single Year and Region Slicer instantly synchronized all 4 report tables simultaneously in under 50ms.',
              vi: 'Một trưởng phòng vận hành tạo 4 PivotTable độc lập phân tích Doanh thu theo Vùng, Chi phí theo Phòng ban, Nhân sự theo Chi nhánh và Biên lợi nhuận Quý. Do cả 4 PivotTable đều dùng chung một PivotCache `_GLData`, việc kết nối một thanh lọc Slicer Năm và Vùng đã giúp đồng bộ tức thời cả 4 bảng báo cáo chỉ trong chưa đầy 50ms.',
            },
          },
          keyTakeaways: {
            en: [
              'PivotTables query the in-memory PivotCache rather than direct grid cells, requiring explicit Refresh actions',
              'Sharing a single PivotCache minimizes workbook RAM usage and enables unified Slicer cross-filtering',
              'Always base PivotTables on structured Excel Tables to ensure automatic boundary expansion',
            ],
            vi: [
              'PivotTable truy vấn từ bộ nhớ đệm PivotCache chứ không đọc trực tiếp từ ô tính, do đó cần nhấn Refresh khi sửa nguồn',
              'Dùng chung một PivotCache giúp tiết kiệm tối đa dung lượng RAM và cho phép dùng chung thanh lọc Slicer',
              'Luôn tạo PivotTable từ các bảng có cấu trúc Excel Table để đảm bảo tự động nhận dữ liệu mới thêm',
            ],
          },
        },
      ],
    },
  ],
  glossary: [
    {
      term: 'Dependency Tree',
      definition: {
        en: 'The internal directed acyclic graph constructed by Excel to track parent-child calculation relationships between cells.',
        vi: 'Đồ thị có hướng không chu trình nội bộ của Excel để theo dõi mối quan hệ phụ thuộc tính toán giữa các ô.',
      },
    },
    {
      term: 'Dirty Cell',
      definition: {
        en: 'A cell whose precedent values have mutated, flagging it for recalculation in the next calculation cycle.',
        vi: 'Ô có giá trị ô tiền nhiệm bị thay đổi, được gắn cờ để tính toán lại trong chu trình tiếp theo.',
      },
    },
    {
      term: 'Dynamic Array',
      definition: {
        en: 'A formula engine capability where formulas returning multiple values automatically populate neighboring vacant cells.',
        vi: 'Tính năng engine cho phép công thức trả về nhiều giá trị tự động trải đều sang các ô trống liền kề.',
      },
    },
    {
      term: 'Spill Range',
      definition: {
        en: 'The dynamic rectangular area on a worksheet occupied by an array formula\'s output values.',
        vi: 'Vùng hình chữ nhật trên bảng tính chứa các giá trị kết quả được sinh ra từ công thức mảng.',
      },
    },
    {
      term: 'Spilled Range Operator (#)',
      definition: {
        en: 'The hash symbol placed after a cell reference (e.g., A2#) to target the entire dynamic spill range dynamically.',
        vi: 'Ký tự thăng đặt sau địa chỉ ô (ví dụ: A2#) để tham chiếu động toàn bộ vùng mảng tràn.',
      },
    },
    {
      term: 'PivotCache',
      definition: {
        en: 'The compressed in-memory columnar snapshot of source data used to power one or more PivotTables.',
        vi: 'Bản chụp dữ liệu dạng cột được nén trong RAM dùng để cung cấp dữ liệu cho một hoặc nhiều PivotTable.',
      },
    },
    {
      term: 'Volatile Function',
      definition: {
        en: 'A function (e.g., NOW, OFFSET) that forces recalculation on every user change anywhere in the workbook.',
        vi: 'Hàm (như NOW, OFFSET) ép Excel phải tính toán lại sau bất kỳ thao tác nào trên toàn bộ bảng tính.',
      },
    },
    {
      term: 'Structured Reference',
      definition: {
        en: 'Syntax using table and column names (e.g., Table1[Amount]) instead of static cell coordinates (C2:C100).',
        vi: 'Cú pháp dùng tên bảng và tên cột (như Table1[Amount]) thay vì tọa độ ô tĩnh (C2:C100).',
      },
    },
  ],
  furtherReading: [
    {
      title: 'Microsoft Excel Formula & Function Architecture Reference',
      author: 'Microsoft Excel Product Team',
      year: 2023,
      description: {
        en: 'Comprehensive technical specification of the Excel calculation engine, multi-threaded recalculation, and dynamic arrays.',
        vi: 'Tài liệu đặc tả kỹ thuật toàn diện về engine tính toán của Excel, xử lý đa luồng và mảng động.',
      },
    },
    {
      title: 'Excel 365 Power Programming with VBA & Dynamic Arrays',
      author: 'Michael Alexander & Dick Kusleika',
      year: 2022,
      description: {
        en: 'In-depth guide covering spreadsheet modeling patterns, vector lookup functions, and memory optimization.',
        vi: 'Hướng dẫn chuyên sâu về các mẫu mô hình bảng tính, các hàm tra cứu vector và tối ưu hóa bộ nhớ.',
      },
    },
    {
      title: 'Ctrl+Shift+Enter: Mastering Excel Array Formulas (2nd Edition)',
      author: 'Mike Girvin',
      year: 2021,
      description: {
        en: 'Definitive guide bridging classic array formulas and the modern Dynamic Array spill engine.',
        vi: 'Cẩm nang kinh điển kết nối giữa công thức mảng truyền thống và engine tràn mảng động hiện đại.',
      },
    },
    {
      title: 'Financial Modeling in Excel For Dummies',
      author: 'Danielle Stein Fairhurst',
      year: 2022,
      description: {
        en: 'Practical handbook on designing auditable, robust spreadsheet financial models with mixed reference locks.',
        vi: 'Cẩm nang thực hành xây dựng các mô hình tài chính bảng tính chuẩn mực, dễ kiểm toán với tham chiếu hỗn hợp.',
      },
    },
  ],
};
