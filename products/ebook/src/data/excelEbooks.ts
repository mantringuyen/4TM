import { Book } from '../types';

export const EXCEL_EBOOKS: Book[] = [
  // 1. Excel Handbook
  {
    id: 'excel-handbook',
    slug: 'excel-handbook',
    title: 'Excel Handbook',
    subtitle: {
      en: 'Grid Architecture, Dynamic Arrays & Modern Calculation Engine',
      vi: 'Kiến Trúc Grid, Mảng Động & Engine Tính Toán Trong Excel Hiện Đại',
    },
    bookType: 'Handbook',
    categoryId: 'excel',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '35 mins',
    chaptersCount: 3,
    publishedDate: '2025-02-10',
    accentColor: 'from-emerald-600 to-green-800',
    tags: ['Excel', 'Spreadsheet', 'Dynamic Arrays', 'Data Analysis'],
    description: {
      en: 'Comprehensive reference manual for Microsoft Excel: workbook structure, calculation grid, absolute vs relative references, Dynamic Array engine, and Pivot Tables.',
      vi: 'Cẩm nang tra cứu Microsoft Excel toàn diện: cấu trúc workbook, lưới tính toán, tham chiếu tuyệt đối vs tương đối, engine mảng động và Bảng Pivot Table.',
    },
    prerequisites: {
      en: ['Basic computer operational skills'],
      vi: ['Kỹ năng tin học văn phòng cơ bản'],
    },
    outcomes: {
      en: ['Master relative ($A1), absolute ($A$1), and mixed reference locks', 'Leverage modern Dynamic Array formulas (XLOOKUP, FILTER, UNIQUE)'],
      vi: ['Làm chủ khóa ô tham chiếu tuyệt đối ($A$1) và hỗn hợp', 'Sử dụng thành thạo các hàm mảng động hiện đại (XLOOKUP, FILTER, UNIQUE)'],
    },
    chapters: [
      {
        id: 'xl-hb-ch-1',
        number: 1,
        slug: 'cell-references-and-calculation-grid',
        title: {
          en: 'Cell References & Calculation Grid Mechanics',
          vi: 'Tham Chiếu Ô & Cơ Chế Lưới Tính Toán trong Excel',
        },
        summary: {
          en: 'Relative vs Absolute ($) vs Mixed locks; dependency tree evaluation.',
          vi: 'Tham chiếu tương đối vs Tuyệt đối ($) vs Hỗn hợp; cây phụ thuộc công thức.',
        },
        readTimeMinutes: 11,
        sections: [
          {
            id: 'xl-hb-1-1',
            title: {
              en: 'Locking Dimensions with Dollar ($) Sign',
              vi: 'Khóa Tọa Độ Ô Bằng Dấu Đô-la ($)',
            },
            content: {
              en: 'Locking column `$A1` preserves column A when dragging across rows. Locking row `A$1` preserves row 1 when dragging down. Locking `$A$1` freezes both.',
              vi: 'Khóa cột `$A1` giữ cố định cột A khi kéo công thức ngang. Khóa dòng `A$1` giữ cố định dòng 1 khi kéo xuống. Khóa `$A$1` cố định hoàn toàn vị trí ô.',
            },
          },
        ],
      },
      {
        id: 'xl-hb-ch-2',
        number: 2,
        slug: 'dynamic-array-engine-spilling',
        title: {
          en: 'The Dynamic Array Calculation Engine',
          vi: 'Engine Tính Toán Mảng Động & Hiệu Ứng Tràn Spill (#SPILL!)',
        },
        summary: {
          en: 'Spill ranges, hash (#) syntax operator, FILTER, UNIQUE, SORT, and SEQUENCE.',
          vi: 'Vùng spilled range, toán tử băm (#), hàm FILTER, UNIQUE, SORT và SEQUENCE.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'xl-hb-2-1',
            title: {
              en: 'Modern XLOOKUP vs Legacy VLOOKUP',
              vi: 'Ưu Thế Của XLOOKUP So Với VLOOKUP Cổ Điển',
            },
            content: {
              en: '`XLOOKUP` performs exact matches by default, searches left or right, and handles missing values natively without requiring `IFERROR`.',
              vi: 'Hàm `XLOOKUP` mặc định tìm chính xác, hỗ trợ dò tìm sang trái/phải và tự xử lý khi không tìm thấy mà không cần bọc `IFERROR`.',
            },
            codeBlock: {
              language: 'excel',
              filename: 'formulas.txt',
              code: `=XLOOKUP(A2, Employees[ID], Employees[Salary], "Not Found")`,
            },
          },
        ],
      },
      {
        id: 'xl-hb-ch-3',
        number: 3,
        slug: 'pivot-tables-data-summarization',
        title: {
          en: 'Pivot Tables & Dynamic Summarization',
          vi: 'Bảng Pivot Table & Tổng Hợp Dữ Liệu Động',
        },
        summary: {
          en: 'PivotCache memory, slicers, calculated fields, and group aggregations.',
          vi: 'Bộ nhớ PivotCache, thanh lọc Slicer, trường tính toán Calculated Field.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'xl-hb-3-1',
            title: {
              en: 'PivotCache Memory Execution',
              vi: 'Cơ Chế Bộ Nhớ PivotCache Trong Excel',
            },
            content: {
              en: 'Pivot Tables operate on an in-memory snapshot called a PivotCache. Remember to click "Refresh Data" when source table rows change.',
              vi: 'Bảng Pivot Table vận hành trên bản chụp bộ nhớ gọi là PivotCache. Cần nhấn "Refresh" khi nguồn dữ liệu có sự thay đổi.',
            },
          },
        ],
      },
    ],
  },

  // 2. Excel Definitions
  {
    id: 'excel-definitions',
    slug: 'excel-definitions',
    title: 'Excel Terminology & Formula Glossary',
    subtitle: {
      en: 'Spreadsheet Terminology, Data Types & Functions Glossary',
      vi: 'Thuật Ngữ Bảng Tính, Kiểu Dữ Liệu & Tra Cứu Khái Niệm Excel',
    },
    bookType: 'Definitions',
    categoryId: 'excel',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '20 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-emerald-500 to-green-700',
    tags: ['Definitions', 'Glossary', 'Excel Engine', 'Functions'],
    description: {
      en: 'Definitions for core Excel concepts: Spilled Ranges, Volatile Functions, Structured References, Power Query M Code, and Data Models.',
      vi: 'Từ điển định nghĩa các khái niệm Excel: Vùng tràn (Spilled Range), Hàm biến đổi (Volatile Function), Structured Reference và Power Query.',
    },
    prerequisites: {
      en: ['Basic Excel grid familiarity'],
      vi: ['Làm quen bảng tính Excel cơ bản'],
    },
    outcomes: {
      en: ['Identify volatile functions (NOW, TODAY, OFFSET, INDIRECT) and their impact'],
      vi: ['Nhận biết các hàm volatile (NOW, TODAY, OFFSET, INDIRECT) và tác động của chúng'],
    },
    chapters: [
      {
        id: 'xl-def-ch-1',
        number: 1,
        slug: 'volatile-functions-and-spill-terms',
        title: {
          en: 'Volatile Functions & Spilled Range Terms',
          vi: 'Hàm Volatile & Khái Niệm Spilled Range',
        },
        summary: {
          en: 'Volatile calculation engine triggers, #SPILL! errors, and spilled operator (#).',
          vi: 'Cơ chế tính lại của hàm Volatile, lỗi #SPILL! và toán tử vùng tràn (#).',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'xl-def-1-1',
            title: {
              en: 'Volatile Function Definition',
              vi: 'Định Nghĩa Hàm Volatile Trong Excel',
            },
            content: {
              en: 'Volatile functions (e.g. `NOW()`, `TODAY()`, `OFFSET()`, `INDIRECT()`) force Excel to recalculate their formula on EVERY user action anywhere in the workbook.',
              vi: 'Các hàm volatile (như `NOW()`, `TODAY()`, `OFFSET()`, `INDIRECT()`) ép Excel phải tính toán lại công thức sau BẤT KỲ thao tác nào trên file.',
            },
          },
        ],
      },
      {
        id: 'xl-def-ch-2',
        number: 2,
        slug: 'excel-tables-structured-references',
        title: {
          en: 'Excel Tables & Structured References',
          vi: 'Thẻ Bảng Excel Table & Tham Chiếu Có Cấu Trúc',
        },
        summary: {
          en: 'ListObjects, Table syntax Table1[ColumnName], and automatic formula propagation.',
          vi: 'ListObjects, cú pháp Bảng Table1[TênCột] và tự động nối dài công thức.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'xl-def-2-1',
            title: {
              en: 'Structured Reference Syntax',
              vi: 'Cú Pháp Tham Chiếu Cột Theo Tên Trong Excel Table',
            },
            content: {
              en: 'Converting raw ranges to Excel Tables (Ctrl+T) allows using clear header names like `Sales[Revenue]` instead of cryptic cell ranges like `C2:C500`.',
              vi: 'Chuyển vùng ô thô sang Excel Table (Ctrl+T) cho phép dùng tên cột như `Sales[Revenue]` thay vì tọa độ mờ mịt như `C2:C500`.',
            },
          },
        ],
      },
    ],
  },

  // 3. Excel Formulas Recipes
  {
    id: 'excel-formulas-recipes',
    slug: 'excel-formulas-recipes',
    title: 'Excel Advanced Formulas & Recipes',
    subtitle: {
      en: 'Multi-Condition Lookups, Dynamic Arrays & Report Formulas',
      vi: 'Công Thức Tra Cứu Nâng Cao, Mảng Động & Công Thức Báo Cáo Tự Động',
    },
    bookType: 'Patterns / Recipes',
    categoryId: 'excel',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-emerald-600 to-green-900',
    tags: ['Formulas', 'Recipes', 'XLOOKUP', 'SUMIFS', 'Dynamic Array'],
    description: {
      en: 'Reusable Excel formula blueprints: multi-criteria XLOOKUP, dynamic cascading dropdowns, SUMIFS with wildcards, and LET function optimization.',
      vi: 'Bộ công thức Excel tái sử dụng: XLOOKUP nhiều điều kiện, menu thả xuống phân cấp động, SUMIFS dùng ký tự đại diện và tối ưu bằng hàm LET.',
    },
    prerequisites: {
      en: ['Understanding of basic IF, SUM, and VLOOKUP functions'],
      vi: ['Hiểu biết các hàm IF, SUM và VLOOKUP cơ bản'],
    },
    outcomes: {
      en: ['Streamline complex formulas using LET() variable assignments', 'Perform multi-criteria lookups with Boolean array math'],
      vi: ['Tối ưu công thức phức tạp bằng khai báo biến với LET()', 'Tra cứu dữ liệu nhiều điều kiện bằng phép toán mảng Boolean'],
    },
    chapters: [
      {
        id: 'xfr-ch-1',
        number: 1,
        slug: 'multi-criteria-lookups-let-function',
        title: {
          en: 'Multi-Criteria Lookups & The LET() Function',
          vi: 'Tra Cứu Nhiều Điều Kiện & Tối Ưu Với Hàm LET()',
        },
        summary: {
          en: 'Combining boolean array conditions inside XLOOKUP and assigning variables with LET().',
          vi: 'Kết hợp mảng điều kiện Boolean trong XLOOKUP và gán biến với LET().',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'xfr-1-1',
            title: {
              en: 'Variable Assignment with LET()',
              vi: 'Khai Báo Biến Tinh Gọn Với Hàm LET()',
            },
            content: {
              en: '`LET()` assigns names to calculation results, preventing repetitive nested calculations and speeding up workbook calculation execution.',
              vi: 'Hàm `LET()` cho phép gán tên cho kết quả trung gian, tránh phải tính đi tính lại một biểu thức phức tạp, giúp file chạy mượt hơn.',
            },
            codeBlock: {
              language: 'excel',
              filename: 'let_formula.txt',
              code: `=LET(
    subtotal, SUM(Sales[Amount]),
    tax, subtotal * 0.1,
    subtotal + tax
)`,
            },
          },
        ],
      },
      {
        id: 'xfr-ch-2',
        number: 2,
        slug: 'dynamic-array-reporting-recipes',
        title: {
          en: 'Dynamic Array Reporting Recipes',
          vi: 'Công Thức Báo Cáo Động Với Hàm Mảng',
        },
        summary: {
          en: 'Combining FILTER, SORT, and UNIQUE to auto-generate dashboard tables.',
          vi: 'Kết hợp FILTER, SORT và UNIQUE để tự động tạo bảng dữ liệu dashboard.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'xfr-2-1',
            title: {
              en: 'Nested FILTER + SORT + UNIQUE Recipe',
              vi: 'Công Thức Lồng FILTER + SORT + UNIQUE',
            },
            content: {
              en: 'Extract unique items, filter by active region, and sort alphabetically in a single self-updating formula spill.',
              vi: 'Trích xuất danh sách duy nhất, lọc theo khu vực và sắp xếp theo bảng chữ cái chỉ bằng một công thức tự động tràn vùng.',
            },
          },
        ],
      },
    ],
  },

  // 4. Excel Common Errors
  {
    id: 'excel-common-errors',
    slug: 'excel-common-errors',
    title: 'Excel Common Errors & Debugging',
    subtitle: {
      en: 'Troubleshooting #N/A, #REF!, #VALUE!, #SPILL! & Calculation Errors',
      vi: 'Sửa Lỗi #N/A, #REF!, #VALUE!, #SPILL! & Lỗi Sai Số Bảng Tính',
    },
    bookType: 'Common Errors',
    categoryId: 'excel',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-01-22',
    accentColor: 'from-amber-600 to-rose-800',
    tags: ['Excel Errors', '#SPILL!', '#N/A', 'Debugging', 'Common Errors'],
    description: {
      en: 'Deconstructing common Excel spreadsheet errors: #SPILL! blocking elements, #REF! deleted cell references, numbers stored as text formatting bugs, and circular references.',
      vi: 'Khắc phục các lỗi Excel thường gặp: #SPILL! do vướng ô dữ liệu, #REF! do xóa ô tham chiếu, số lưu dưới dạng text và lỗi tham chiếu vòng (Circular Reference).',
    },
    prerequisites: {
      en: ['Basic formula editing skills'],
      vi: ['Kỹ năng sửa công thức Excel cơ bản'],
    },
    outcomes: {
      en: ['Diagnose and clear #SPILL! range blockages', 'Convert numbers stored as text back to numeric values safely'],
      vi: ['Phát hiện và dọn dẹp vật cản gây lỗi #SPILL!', 'Chuyển đổi số lưu dạng text về đúng định dạng số tính toán'],
    },
    chapters: [
      {
        id: 'xce-ch-1',
        number: 1,
        slug: 'spill-and-ref-errors',
        title: {
          en: 'Fixing #SPILL! & #REF! Errors',
          vi: 'Sửa Lỗi #SPILL! & #REF! Trong Công Thức',
        },
        summary: {
          en: 'Identifying blocking non-empty cells in spilled ranges and missing worksheet targets.',
          vi: 'Xác định các ô có dữ liệu cản trở vùng tràn và tham chiếu bị mất.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'xce-1-1',
            title: {
              en: 'Unblocking #SPILL! Error Traps',
              vi: 'Cách Xử Lý Lỗi #SPILL! Khi Bị Vướng Ô Dữ Liệu',
            },
            content: {
              en: 'Clicking the float indicator of a `#SPILL!` error highlights the exact target range. Clear all content or formatted cells inside that highlighted boundary.',
              vi: 'Bấm vào biểu tượng báo lỗi `#SPILL!` sẽ hiển thị viền nhấp nháy của vùng tràn. Hãy xóa sạch dữ liệu hoặc định dạng rác trong khung đó.',
            },
          },
        ],
      },
      {
        id: 'xce-ch-2',
        number: 2,
        slug: 'numbers-as-text-and-circular-refs',
        title: {
          en: 'Numbers Stored as Text & Circular References',
          vi: 'Số Lưu Dạng Text & Lỗi Tham Chiếu Vòng Circular',
        },
        summary: {
          en: 'Why SUM() returns 0 on text numbers and resolving infinite formula loops.',
          vi: 'Tại sao SUM() trả về 0 khi gặp số dạng text và cách gỡ lặp công thức.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'xce-2-1',
            title: {
              en: 'Fixing SUM() Returning 0 on Text Numbers',
              vi: 'Khắc Phục Lỗi Hàm SUM() Trả Về 0 Do Số Dạng Text',
            },
            content: {
              en: 'The `SUM()` function ignores text strings completely. Use `VALUE()` or multiply range by 1 (`Range * 1`) to force numerical conversion.',
              vi: 'Hàm `SUM()` bỏ qua hoàn toàn ô text. Dùng hàm `VALUE()` hoặc nhân vùng dữ liệu với 1 (`Range * 1`) để ép về dạng số.',
            },
          },
        ],
      },
    ],
  },

  // 5. Excel Best Practices
  {
    id: 'excel-best-practices',
    slug: 'excel-best-practices',
    title: 'Financial Modeling & Excel Best Practices',
    subtitle: {
      en: 'Workbook Formatting, Audit Trail Rules & Calculation Speed',
      vi: 'Chuẩn Thiết Kế File Tài Chính, Kiểm Xuất Audit & Tối Ưu Tốc Độ',
    },
    bookType: 'Best Practices',
    categoryId: 'excel',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-01',
    accentColor: 'from-emerald-700 to-green-900',
    tags: ['Financial Modeling', 'Audit', 'Best Practices', 'Performance'],
    description: {
      en: 'Engineering best practices for professional spreadsheets: color coding standards (Blue inputs, Black formulas), separating Inputs/Calculations/Outputs, and optimizing calculation speed.',
      vi: 'Quy chuẩn xây dựng file Excel chuyên nghiệp: quy tắc phối màu chuẩn (Xanh lá nhập liệu, Đen công thức), tách biệt Input/Calculation/Output và tối ưu tốc độ tính toán.',
    },
    prerequisites: {
      en: ['Experience creating multi-sheet Excel workbooks'],
      vi: ['Kinh nghiệm tạo workbook Excel nhiều sheet'],
    },
    outcomes: {
      en: ['Apply standard financial modeling color-coding conventions', 'Structure modular workbooks with clean audit trails'],
      vi: ['Áp dụng quy ước màu sắc chuẩn trong mô hình tài chính', 'Cấu trúc file mô-đun hóa dễ kiểm tra đối chiếu'],
    },
    chapters: [
      {
        id: 'xbp-ch-1',
        number: 1,
        slug: 'color-coding-and-sheet-structure',
        title: {
          en: 'Color-Coding Conventions & Workbook Architecture',
          vi: 'Quy Ước Phối Màu & Kiến Trúc Workbook Chuyên Nghiệp',
        },
        summary: {
          en: 'Blue text for hardcoded inputs, Black for formulas, Green for inter-sheet links.',
          vi: 'Chữ xanh lá/xương lam cho dữ liệu thô, Chữ đen cho công thức, Xanh lá cho link sheet.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'xbp-1-1',
            title: {
              en: 'Standard Financial Modeling Palette',
              vi: 'Bảng Màu Chuẩn Trong Mô Hình Tài Chính',
            },
            content: {
              en: 'Always use Blue font for manual assumptions, Black font for formulas, and Green font for links pulling from external sheets/files.',
              vi: 'Luôn dùng chữ màu Xanh Dương cho ô nhập tay, chữ màu Đen cho công thức và chữ màu Xanh Lá cho dữ liệu liên kết từ sheet khác.',
            },
          },
        ],
      },
      {
        id: 'xbp-ch-2',
        number: 2,
        slug: 'calculating-speed-optimization',
        title: {
          en: 'Optimizing Workbook Calculation Speed',
          vi: 'Tối Ưu Tốc Độ Tính Toán Của Workbook',
        },
        summary: {
          en: 'Replacing full-column references (A:A) with structured table references.',
          vi: 'Thay thế tham chiếu nguyên cột (A:A) bằng tham chiếu tên bảng Excel Table.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'xbp-2-1',
            title: {
              en: 'Avoid Full-Column References (A:A)',
              vi: 'Tránh Tham Chiếu Cả Cột Full-Column (A:A)',
            },
            content: {
              en: 'Using `SUM(A:A)` forces Excel to evaluate 1,048,576 rows. Use structured table references like `SUM(Sales[Amount])` to constrain calculation scope.',
              vi: 'Truy vấn `SUM(A:A)` ép Excel phải kiểm tra 1.048.576 dòng. Dùng tham chiếu bảng `SUM(Sales[Amount])` để giới hạn đúng phạm vi.',
            },
          },
        ],
      },
    ],
  },

  // 6. Excel Practical Guide
  {
    id: 'excel-practical-guide',
    slug: 'excel-practical-guide',
    title: 'Automated Financial Dashboard Guide',
    subtitle: {
      en: 'Step-by-Step Practical Guide to Dynamic Excel Dashboard Creation',
      vi: 'Hướng Dẫn Thực Hành Từng Bước Dựng Báo Cáo Tài Chính Tự Động Trong Excel',
    },
    bookType: 'Practical Guides',
    categoryId: 'excel',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-18',
    accentColor: 'from-emerald-600 to-teal-800',
    tags: ['Dashboard', 'Power Query', 'Pivot Tables', 'Guide'],
    description: {
      en: 'A step-by-step practical guide to transforming raw CSV data exports into an interactive executive dashboard using Power Query, Pivot Tables, and Slicers.',
      vi: 'Hướng dẫn thực hành từng bước biến dữ liệu file CSV thô thành bảng điều khiển (Dashboard) tương tác tự động cập nhật bằng Power Query và Slicer.',
    },
    prerequisites: {
      en: ['Excel formulas and Pivot Table understanding'],
      vi: ['Hiểu biết công thức Excel và Pivot Table'],
    },
    outcomes: {
      en: ['Automate raw CSV data cleaning using Power Query', 'Connect interactive Slicers across multiple Pivot Charts'],
      vi: ['Tự động hóa dọn dẹp dữ liệu CSV thô với Power Query', 'Kết nối bộ lọc Slicer tương tác qua nhiều biểu đồ Pivot Chart'],
    },
    chapters: [
      {
        id: 'xpg-ch-1',
        number: 1,
        slug: 'power-query-data-transformation',
        title: {
          en: 'Power Query Data Ingestion & Transformation',
          vi: 'Nhập & Biến Đổi Dữ Liệu Tự Động Với Power Query',
        },
        summary: {
          en: 'Unpivoting columns, removing nulls, changing datatypes, and refreshing queries.',
          vi: 'Xoay cột unpivot, xóa dòng null, đổi kiểu dữ liệu và tự động refresh.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'xpg-1-1',
            title: {
              en: 'Unpivoting Columns in Power Query',
              vi: 'Kỹ Thuật Unpivot Cột Ngang Thành Dòng Dọc',
            },
            content: {
              en: 'Unpivoting monthly columns (Jan, Feb, Mar) converts wide messy data into tall normalized tables ideal for Pivot Table analysis.',
              vi: 'Unpivot các cột tháng ngang (Jan, Feb, Mar) chuyển dữ liệu dạng rộng thành dạng dọc chuẩn hóa, rất thích hợp cho Pivot Table.',
            },
          },
        ],
      },
      {
        id: 'xpg-ch-2',
        number: 2,
        slug: 'interactive-slicers-dashboard-layout',
        title: {
          en: 'Connecting Interactive Slicers & Pivot Charts',
          vi: 'Kết Nối Slicer Tương Tác & Bố Cục Bảng Điều Khiển',
        },
        summary: {
          en: 'Report connections linking multiple Pivot Charts to a unified timeline slicer.',
          vi: 'Kết nối Report Connections đồng bộ nhiều Pivot Chart với một thanh thời gian.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'xpg-2-1',
            title: {
              en: 'Slicer Report Connections Linkage',
              vi: 'Đồng Bộ Slicer Với Tất Cả Pivot Table Trong File',
            },
            content: {
              en: 'Right-click a Slicer, select "Report Connections", and check all Pivot Tables to filter the entire dashboard simultaneously upon user clicks.',
              vi: 'Rclick vào Slicer, chọn "Report Connections" và tích chọn tất cả Pivot Table để lọc đồng bộ toàn bộ dashboard khi click chuột.',
            },
          },
        ],
      },
    ],
  },
];
