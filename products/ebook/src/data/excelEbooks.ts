import { Book } from '../types';
import {
  EXCEL_HANDBOOK_BOOK,
  EXCEL_DEFINITIONS_BOOK,
  EXCEL_FORMULAS_RECIPES_BOOK,
} from './migrated';

export const EXCEL_EBOOKS: Book[] = [
  // 1. Excel Handbook (Migrated)
  EXCEL_HANDBOOK_BOOK,

  // 2. Excel Definitions (Migrated)
  EXCEL_DEFINITIONS_BOOK,

  // 3. Excel Formulas Recipes (Migrated - Batch 6)
  EXCEL_FORMULAS_RECIPES_BOOK,

  // 4. Excel Common Errors (Legacy)
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

  // 5. Excel Best Practices (Legacy)
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

  // 6. Excel Practical Guide (Legacy)
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
