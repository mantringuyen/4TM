import { Course, Module, Lesson } from '../types';
import { sqlLessonMetadataList } from './sql/sqlLessonMetadata';

// Helper to filter lessons by module ID from metadata list
const getLessonsForModule = (modId: string): Lesson[] =>
  sqlLessonMetadataList.filter(l => l.moduleId === modId);

export const sqlCourse: Course = {
  id: 'sql',
  title: {
    en: 'SQL & Relational Databases',
    vi: 'SQL & Cơ Sở Dữ Liệu Quan Hệ'
  },
  tagline: {
    en: 'Master relational modeling, multi-table joins, subqueries, CTEs, DDL/DML, ACID transactions, window functions, indexing, and JSON operations',
    vi: 'Làm chủ mô hình hóa quan hệ, kết nối nhiều bảng, truy vấn con, CTE, DDL/DML, giao dịch ACID, hàm cửa sổ, chỉ mục và thao tác JSON'
  },
  description: {
    en: 'Comprehensive 28-lesson enterprise SQL curriculum spanning query fundamentals, aggregation and joins, subqueries and CTEs, declarative DDL/DML schema design, ACID transaction isolation, window frames, index optimization, JSON operations, and stored procedures with live in-browser SQLite execution.',
    vi: 'Chương trình học SQL doanh nghiệp toàn diện 28 bài học bao gồm nền tảng truy vấn, gom nhóm & liên kết bảng, truy vấn con & CTE, thiết kế lược đồ DDL/DML, cấp độ cô lập giao dịch ACID, hàm cửa sổ, tối ưu hóa chỉ mục, thao tác JSON và thủ tục lưu trữ chạy trực tiếp trên SQLite trong trình duyệt.'
  },
  iconName: 'Database',
  color: 'from-sky-500 via-cyan-600 to-blue-700',
  accentBg: 'bg-sky-500/15 border-sky-500/35 text-sky-400',
  levels: {
    basic: {
      id: 'basic',
      courseId: 'sql',
      title: {
        en: 'Relational Foundations, Aggregations & Joins',
        vi: 'Nền Tảng Quan Hệ, Hàm Tổng Hợp & Kết Nối Bảng'
      },
      description: {
        en: 'Relational model, SELECT projections, filtering (WHERE, LIKE, IN, BETWEEN), 3-Valued Logic & NULL mechanics, sorting, pagination, string/date functions, GROUP BY, HAVING, and comprehensive multi-table joins.',
        vi: 'Mô hình quan hệ, phép chiếu SELECT, bộ lọc (WHERE, LIKE, IN, BETWEEN), Logic 3 giá trị & NULL, sắp xếp, phân trang, hàm chuỗi/thời gian, GROUP BY, HAVING và kết nối nhiều bảng toàn diện.'
      },
      order: 1,
      modules: [
        {
          id: 'sql_mod_1',
          levelId: 'basic',
          courseId: 'sql',
          order: 1,
          title: {
            en: 'Module 01: Relational Foundations & Data Retrieval (Lessons 1–6)',
            vi: 'Chương 01: Nền Tảng Quan Hệ & Trích Xuất Dữ Liệu (Bài 1–6)'
          },
          description: {
            en: 'Relational architecture, SELECT projections, row filtering with WHERE, IN/BETWEEN/LIKE pattern matching, 3-Valued Logic & NULL mechanics, and deterministic ORDER BY sorting with LIMIT pagination.',
            vi: 'Kiến trúc quan hệ, phép chiếu SELECT, lọc bản ghi với WHERE, tìm kiếm mẫu IN/BETWEEN/LIKE, logic 3 giá trị & bản chất NULL, và sắp xếp ORDER BY kèm phân trang LIMIT.'
          },
          lessons: getLessonsForModule('sql_mod_1')
        },
        {
          id: 'sql_mod_2',
          levelId: 'basic',
          courseId: 'sql',
          order: 2,
          title: {
            en: 'Module 02: Aggregate Analytics, Grouping & Multi-Table Joins (Lessons 7–12)',
            vi: 'Chương 02: Phân Tích Tổng Hợp, Gom Nhóm & Kết Nối Đa Bảng (Bài 7–12)'
          },
          description: {
            en: 'String & DateTime scalar transformations, aggregation functions (COUNT, SUM, AVG, MIN, MAX), GROUP BY grouping rules, post-group filtering with HAVING vs WHERE, INNER JOINs, and comprehensive OUTER/CROSS/Anti-Joins.',
            vi: 'Biến đổi chuỗi & ngày tháng, hàm tổng hợp (COUNT, SUM, AVG, MIN, MAX), quy tắc gom nhóm GROUP BY, lọc nhóm HAVING vs WHERE, INNER JOIN và toàn diện OUTER/CROSS/Anti-Join.'
          },
          lessons: getLessonsForModule('sql_mod_2')
        }
      ]
    },
    intermediate: {
      id: 'intermediate',
      courseId: 'sql',
      title: {
        en: 'Advanced Querying, DDL Schemas & ACID Transactions',
        vi: 'Truy Vấn Nâng Cao, Lược Đồ DDL & Giao Dịch ACID'
      },
      description: {
        en: 'Scalar & multi-row subqueries, correlated subqueries with EXISTS, set operations, conditional CASE/COALESCE/NULLIF, declarative DDL & constraints, atomic DML & UPSERT, Views & Materialized Views, and ACID transaction isolation.',
        vi: 'Truy vấn con vô hướng & đa dòng, truy vấn tương quan với EXISTS, phép toán tập hợp, logic điều kiện CASE/COALESCE/NULLIF, DDL & ràng buộc toàn vẹn, DML nguyên tử & UPSERT, View & Materialized View, và cấp độ cô lập giao dịch ACID.'
      },
      order: 2,
      modules: [
        {
          id: 'sql_mod_3',
          levelId: 'intermediate',
          courseId: 'sql',
          order: 3,
          title: {
            en: 'Module 03: Subqueries, Set Operations & Schema DDL (Lessons 13–17)',
            vi: 'Chương 03: Truy Vấn Con, Phép Toán Tập Hợp & Lược Đồ DDL (Bài 13–17)'
          },
          description: {
            en: 'Scalar and multi-row subqueries (IN, ALL, ANY), correlated subqueries with EXISTS, set operations (UNION, INTERSECT, EXCEPT), conditional CASE expressions with COALESCE/NULLIF, and schema design with CREATE/ALTER TABLE and constraints.',
            vi: 'Truy vấn con vô hướng & đa dòng (IN, ALL, ANY), truy vấn tương quan với EXISTS, phép toán tập hợp (UNION, INTERSECT, EXCEPT), biểu thức CASE kèm COALESCE/NULLIF và thiết kế lược đồ bảng với CREATE/ALTER TABLE cùng ràng buộc.'
          },
          lessons: getLessonsForModule('sql_mod_3')
        },
        {
          id: 'sql_mod_4',
          levelId: 'intermediate',
          courseId: 'sql',
          order: 4,
          title: {
            en: 'Module 04: DML Mutations, Views & ACID Transactions (Lessons 18–22)',
            vi: 'Chương 04: Thao Tác DML, Khung Nhìn Views & Giao Dịch ACID (Bài 18–22)'
          },
          description: {
            en: 'Data Manipulation Language (INSERT, UPDATE, DELETE, TRUNCATE), idempotent UPSERT with ON CONFLICT DO UPDATE / MERGE, virtual Views & Materialized Views, ACID transaction guarantees, and isolation levels with concurrency anomalies.',
            vi: 'Ngôn ngữ thao tác dữ liệu DML (INSERT, UPDATE, DELETE, TRUNCATE), UPSERT lũy suy với ON CONFLICT DO UPDATE / MERGE, khung nhìn ảo Views & Materialized Views, nguyên tắc giao dịch ACID và các cấp độ cô lập giải quyết tương tranh.'
          },
          lessons: getLessonsForModule('sql_mod_4')
        }
      ]
    },
    advanced: {
      id: 'advanced',
      courseId: 'sql',
      title: {
        en: 'Analytical Windows, Query Optimization & Programmable SQL',
        vi: 'Hàm Cửa Sổ Phân Tích, Tối Ưu Hóa Truy Vấn & Lập Trình SQL'
      },
      description: {
        en: 'Ranking window functions, sliding window frames with LAG/LEAD, B-Tree index strategies & covering indexes, EXPLAIN execution plan optimization & SARGability, JSON/JSONB semi-structured operations, and Stored Procedures, Triggers & UDFs.',
        vi: 'Hàm xếp hạng cửa sổ, khung cửa sổ trượt với LAG/LEAD, chiến lược chỉ mục B-Tree & chỉ mục bao phủ, tối ưu hóa kế hoạch thực thi EXPLAIN & tính SARGable, thao tác JSON/JSONB bán cấu trúc, và Stored Procedures, Triggers & UDF.'
      },
      order: 3,
      modules: [
        {
          id: 'sql_mod_5',
          levelId: 'advanced',
          courseId: 'sql',
          order: 5,
          title: {
            en: 'Module 05: Window Functions, Indexing & Programmable SQL (Lessons 23–28)',
            vi: 'Chương 05: Hàm Cửa Sổ, Chỉ Mục & Lập Trình Thủ Tục SQL (Bài 23–28)'
          },
          description: {
            en: 'Ranking window functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE), sliding window frames with LAG/LEAD/FIRST_VALUE, B-Tree indexing rules & covering indexes, query plan diagnostics with EXPLAIN & SARGable predicates, semi-structured JSON querying & manipulation, and server-side Stored Procedures, Triggers & UDFs.',
            vi: 'Hàm xếp hạng cửa sổ (ROW_NUMBER, RANK, DENSE_RANK, NTILE), khung cửa sổ trượt với LAG/LEAD/FIRST_VALUE, quy tắc chỉ mục B-Tree & chỉ mục bao phủ, chẩn đoán kế hoạch thực thi EXPLAIN & điều kiện SARGable, truy vấn & thao tác JSON bán cấu trúc, và Stored Procedures, Triggers & UDF phía máy chủ.'
          },
          lessons: getLessonsForModule('sql_mod_5')
        }
      ]
    }
  }
};

export default sqlCourse;
