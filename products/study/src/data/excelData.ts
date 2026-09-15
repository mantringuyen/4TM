import { Course } from '../types';
import { module01Lessons as basicMod01Lessons } from './excel/basic/module01';
import { module02Lessons as basicMod02Lessons } from './excel/basic/module02';
import { module01Lessons as intMod01Lessons } from './excel/intermediate/module01';
import { module02Lessons as intMod02Lessons } from './excel/intermediate/module02';
import { module01Lessons as advMod01Lessons } from './excel/advanced/module01';
import { module02Lessons as advMod02Lessons } from './excel/advanced/module02';

export const excelCourse: Course = {
  id: 'excel',
  title: {
    en: 'Microsoft Excel & Data Analysis',
    vi: 'Microsoft Excel & Phân Tích Dữ Liệu'
  },
  tagline: {
    en: 'Master spreadsheet modeling, dynamic array formulas, XLOOKUP, data cleaning, financial valuation, and PivotTable dashboards',
    vi: 'Làm chủ lập mô hình bảng tính, công thức mảng động, XLOOKUP, làm sạch dữ liệu, thẩm định tài chính và báo cáo PivotTable'
  },
  description: {
    en: 'Comprehensive Microsoft Excel curriculum spanning cell referencing mechanics, statistical functions, multi-condition logic (IFS, SUMIFS), modern lookups (XLOOKUP, INDEX/MATCH), dynamic array formulas (FILTER, UNIQUE, SORT), financial modeling (NPV, IRR, PMT), Power Query ETL, and executive PivotTable dashboards with live in-browser formula execution.',
    vi: 'Chương trình Microsoft Excel toàn diện bao gồm cơ chế tham chiếu ô, các hàm thống kê, logic đa điều kiện (IFS, SUMIFS), tra cứu hiện đại (XLOOKUP, INDEX/MATCH), công thức mảng động (FILTER, UNIQUE, SORT), mô hình tài chính (NPV, IRR, PMT), Power Query ETL và báo cáo quản trị PivotTable chạy trực tiếp trong trình duyệt.'
  },
  iconName: 'FileSpreadsheet',
  color: 'from-emerald-500 via-teal-600 to-green-700',
  accentBg: 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400',
  levels: {
    basic: {
      id: 'basic',
      courseId: 'excel',
      title: {
        en: 'Excel Fundamentals, Referencing & Basic Formulas',
        vi: 'Excel Cơ Bản, Tham Chiếu Ô & Công Thức Nền Tảng'
      },
      description: {
        en: 'Grid coordinates, data types, relative/absolute referencing ($A$1), foundational statistical aggregations, text transformation, and simple logical tests.',
        vi: 'Tọa độ bảng tính, kiểu dữ liệu, tham chiếu tương đối/tuyệt đối ($A$1), các hàm thống kê cơ bản, xử lý chuỗi và hàm logic đơn giản.'
      },
      order: 1,
      modules: [
        {
          id: 'excel_mod_1',
          levelId: 'basic',
          courseId: 'excel',
          order: 1,
          title: {
            en: 'Module 01: Workbook Navigation & Cell Referencing (Lessons 1–4)',
            vi: 'Chương 01: Cấu Trúc Bảng Tính & Tham Chiếu Ô (Bài 1–4)'
          },
          description: {
            en: 'Understand workbook anatomy, cell coordinates, data formatting, arithmetic operators, absolute references ($A$1), and statistical aggregations.',
            vi: 'Nắm vững cấu trúc bảng tính, tọa độ ô, định dạng dữ liệu, toán tử số học, tham chiếu tuyệt đối ($A$1) và các hàm tổng hợp thống kê.'
          },
          lessons: basicMod01Lessons
        },
        {
          id: 'excel_mod_2',
          levelId: 'basic',
          courseId: 'excel',
          order: 2,
          title: {
            en: 'Module 02: Mathematical Operations, Text Transformation & Formatting (Lessons 5–8)',
            vi: 'Chương 02: Phép Tính Toán Học, Xử Lý Chuỗi & Định Dạng (Bài 5–8)'
          },
          description: {
            en: 'Text cleaning & extraction (TRIM, LEFT, RIGHT, MID, TEXTJOIN), date/time functions, and conditional formatting rules.',
            vi: 'Làm sạch & trích xuất chuỗi (TRIM, LEFT, RIGHT, MID, TEXTJOIN), các hàm ngày giờ và quy tắc định dạng có điều kiện.'
          },
          lessons: basicMod02Lessons
        }
      ]
    },
    intermediate: {
      id: 'intermediate',
      courseId: 'excel',
      title: {
        en: 'Logical Decision Trees, Advanced Lookups & Analytics',
        vi: 'Hàm Logic Nâng Cao, Tra Cứu Dữ Liệu & Phân Tích'
      },
      description: {
        en: 'Multi-criteria business logic, modern XLOOKUP & INDEX/MATCH, dynamic array formulas, data validation, and interactive PivotTables with Slicers.',
        vi: 'Logic nghiệp vụ đa điều kiện, tra cứu hiện đại XLOOKUP & INDEX/MATCH, công thức mảng động, xác thực dữ liệu và báo cáo PivotTable tương tác.'
      },
      order: 2,
      modules: [
        {
          id: 'excel_mod_3',
          levelId: 'intermediate',
          courseId: 'excel',
          order: 3,
          title: {
            en: 'Module 03: Logic Trees, Multi-Criteria Math & Modern Lookups (Lessons 9–13)',
            vi: 'Chương 03: Logic Rẽ Nhánh, Toán Đa Điều Kiện & Tra Cứu Hiện Đại (Bài 9–13)'
          },
          description: {
            en: 'Multi-criteria IFS/AND/OR, COUNTIFS/SUMIFS, classic VLOOKUP/INDEX-MATCH, modern XLOOKUP, and error handling with IFERROR.',
            vi: 'Logic đa điều kiện IFS/AND/OR, COUNTIFS/SUMIFS, VLOOKUP/INDEX-MATCH cổ điển, tra cứu hiện đại XLOOKUP và bẫy lỗi với IFERROR.'
          },
          lessons: intMod01Lessons
        },
        {
          id: 'excel_mod_4',
          levelId: 'intermediate',
          courseId: 'excel',
          order: 4,
          title: {
            en: 'Module 04: Dynamic Arrays, Tables, Validation & Pivot Dashboards (Lessons 14–18)',
            vi: 'Chương 04: Mảng Động, Bảng Table, Xác Thực & Báo Cáo Pivot (Bài 14–18)'
          },
          description: {
            en: 'Spill ranges with FILTER/UNIQUE/SORT, Excel Tables with structured references, Data Validation, PivotTables, and interactive Pivot Charts.',
            vi: 'Vùng tràn mảng FILTER/UNIQUE/SORT, Bảng Excel Table với tham chiếu có cấu trúc, Data Validation, PivotTable và biểu đồ tương tác Pivot Charts.'
          },
          lessons: intMod02Lessons
        }
      ]
    },
    advanced: {
      id: 'advanced',
      courseId: 'excel',
      title: {
        en: 'Power Query ETL, Financial Modeling & Automation',
        vi: 'Power Query ETL, Mô Hình Tài Chính & Tự Động Hóa'
      },
      description: {
        en: 'Enterprise ETL data pipelines, sensitivity analysis & Solver optimization, capital budgeting (NPV/IRR), Power Pivot DAX modeling, functional LET/LAMBDA, and TypeScript Office Scripts.',
        vi: 'Quy trình ETL dữ liệu doanh nghiệp, phân tích độ nhạy & Solver, thẩm định tài chính (NPV/IRR), mô hình hóa Power Pivot DAX, lập trình hàm LET/LAMBDA và Office Scripts TypeScript.'
      },
      order: 3,
      modules: [
        {
          id: 'excel_mod_5',
          levelId: 'advanced',
          courseId: 'excel',
          order: 5,
          title: {
            en: 'Module 05: Power Query ETL, What-If Analysis & Financial Modeling (Lessons 19–21)',
            vi: 'Chương 05: Power Query ETL, Phân Tích What-If & Mô Hình Tài Chính (Bài 19–21)'
          },
          description: {
            en: 'Automated data cleaning pipelines with Power Query, sensitivity modeling with Goal Seek & Solver, and date-precise valuation with XNPV, XIRR & PMT.',
            vi: 'Tự động hóa làm sạch dữ liệu với Power Query, mô hình độ nhạy với Goal Seek & Solver và định giá chính xác theo ngày với XNPV, XIRR & PMT.'
          },
          lessons: advMod01Lessons
        },
        {
          id: 'excel_mod_6',
          levelId: 'advanced',
          courseId: 'excel',
          order: 6,
          title: {
            en: 'Module 06: Power Pivot Data Modeling, LET/LAMBDA & Automation (Lessons 22–24)',
            vi: 'Chương 06: Mô Hình Hóa Power Pivot, LET/LAMBDA & Tự Động Hóa (Bài 22–24)'
          },
          description: {
            en: '100M+ row Star Schema data models with DAX measures, modern functional Excel with LET/LAMBDA/SCAN, and cloud automation with TypeScript Office Scripts.',
            vi: 'Mô hình dữ liệu Sơ đồ sao hơn 100 triệu dòng với thước đo DAX, lập trình hàm với LET/LAMBDA/SCAN và tự động hóa đám mây với Office Scripts TypeScript.'
          },
          lessons: advMod02Lessons
        }
      ]
    }
  }
};

export default excelCourse;
