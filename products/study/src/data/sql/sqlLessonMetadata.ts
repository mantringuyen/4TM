import { Lesson } from '../../types';

// Lightweight SQL lesson headers for fast course indexing without heavy content
export const sqlLessonMetadataList: Lesson[] = [
  // Module 01: Relational Foundations & Data Retrieval (Lessons 1–6)
  {
    id: "sql_lesson_1",
    moduleId: "sql_mod_1",
    levelId: 'basic',
    courseId: 'sql',
    order: 1,
    topicId: 'sql_relational_model',
    title: {
      en: 'Relational Model, Tables, Primary Keys & SQL Dialects',
      vi: 'Mô Hình Quan Hệ, Bảng, Khóa Chính & Các Biến Thể SQL'
    },
    summary: {
      en: 'Understand RDBMS table structures, primary keys, relational data integrity, and SQL standards vs engine-specific dialects.',
      vi: 'Hiểu cấu trúc bảng RDBMS, khóa chính, tính toàn vẹn dữ liệu quan hệ và chuẩn SQL so với các biến thể dialect.'
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_2",
    moduleId: "sql_mod_1",
    levelId: 'basic',
    courseId: 'sql',
    order: 2,
    topicId: 'sql_select_aliases',
    title: {
      en: 'SELECT, Column Aliases (AS) & Computed Projections',
      vi: 'SELECT, Đặt Bí Danh Cột (AS) & Biểu Thức Tính Toán'
    },
    summary: {
      en: 'Master column projections, arithmetic expressions, constant literals, alias naming with AS, and deduplication with DISTINCT.',
      vi: 'Làm chủ phép chiếu cột, biểu thức toán học, hằng số cố định, đặt tên bí danh với AS và loại trừ trùng lặp bằng DISTINCT.'
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_3",
    moduleId: "sql_mod_1",
    levelId: 'basic',
    courseId: 'sql',
    order: 3,
    topicId: 'sql_where_operators',
    title: {
      en: 'Filtering Rows with WHERE, Comparison & Logical Operators',
      vi: 'Lọc Bản Ghi Với WHERE, Toán Tử So Sánh & Toán Tử Logic'
    },
    summary: {
      en: 'Filter records with comparison operators (=, !=, <, >), logical precedence (AND, OR, NOT), and parentheses evaluation rules.',
      vi: 'Lọc bản ghi với toán tử so sánh (=, !=, <, >), thứ tự ưu tiên logic (AND, OR, NOT) và quy tắc định nhóm bằng dấu ngoặc.'
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_4",
    moduleId: "sql_mod_1",
    levelId: 'basic',
    courseId: 'sql',
    order: 4,
    topicId: 'sql_pattern_matching',
    title: {
      en: 'Advanced Filtering: IN, BETWEEN, LIKE & Wildcards',
      vi: 'Bộ Lọc Nâng Cao: IN, BETWEEN, LIKE & Ký Tự Đại Diện'
    },
    summary: {
      en: 'Master list membership testing with IN/NOT IN, continuous ranges with BETWEEN, and fuzzy wildcard pattern matching with LIKE (% and _).',
      vi: 'Làm chủ kiểm tra danh sách với IN/NOT IN, khoảng giá trị liên tục với BETWEEN và tìm kiếm mẫu gần đúng bằng LIKE (% và _).'
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_5",
    moduleId: "sql_mod_1",
    levelId: 'basic',
    courseId: 'sql',
    order: 5,
    topicId: 'sql_null_logic',
    title: {
      en: 'Three-Valued Logic, NULL Mechanics, IS NULL & IS NOT NULL',
      vi: 'Logic Tam Trị, Bản Chất NULL, IS NULL & IS NOT NULL'
    },
    summary: {
      en: 'Master SQL Three-Valued Logic (TRUE, FALSE, UNKNOWN), IS NULL predicates, fallback defaults with COALESCE, and the dangerous NOT IN NULL trap.',
      vi: 'Làm chủ Logic Tam Trị (TRUE, FALSE, UNKNOWN), vị từ IS NULL, giá trị mặc định với COALESCE và bẫy NOT IN chứa giá trị NULL.'
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_6",
    moduleId: "sql_mod_1",
    levelId: 'basic',
    courseId: 'sql',
    order: 6,
    topicId: 'sql_order_limit',
    title: {
      en: 'Sorting with ORDER BY, NULLS Order & Pagination with LIMIT / OFFSET',
      vi: 'Sắp Xếp Với ORDER BY, Vị Trí NULL & Phân Trang Với LIMIT / OFFSET'
    },
    summary: {
      en: 'Order datasets with ASC/DESC, deterministic tie-breaking, NULLS FIRST / LAST placement, and page pagination with LIMIT and OFFSET.',
      vi: 'Sắp xếp tập dữ liệu với ASC/DESC, xử lý hòa điểm, vị trí NULLS FIRST/LAST và phân trang dữ liệu với LIMIT cùng OFFSET.'
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },

  // Module 02: Aggregate Analytics, Grouping & Multi-Table Joins (Lessons 7–12)
  {
    id: "sql_lesson_7",
    moduleId: "sql_mod_2",
    levelId: 'basic',
    courseId: 'sql',
    order: 7,
    topicId: 'sql_string_functions',
    title: {
      en: 'Scalar String Functions: UPPER, LOWER, LENGTH, SUBSTR, TRIM & CONCAT',
      vi: 'Hàm Xử Lý Chuỗi Vô Hướng: UPPER, LOWER, LENGTH, SUBSTR, TRIM & CONCAT'
    },
    summary: {
      en: 'Transform text data with standard string functions, casing normalization, substring slicing, trimming whitespace, and string concatenation.',
      vi: 'Biến đổi dữ liệu văn bản với các hàm chuỗi tiêu chuẩn, chuẩn hóa chữ hoa/thường, cắt chuỗi con, xóa khoảng trắng và nối chuỗi.'
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_8",
    moduleId: "sql_mod_2",
    levelId: 'basic',
    courseId: 'sql',
    order: 8,
    topicId: 'sql_datetime_functions',
    title: {
      en: 'Date & Time Manipulation: DATE, TIME, DATETIME, STRFTIME & Intervals',
      vi: 'Xử Lý Ngày & Giờ: DATE, TIME, DATETIME, STRFTIME & Khoảng Thời Gian'
    },
    summary: {
      en: 'Master date parsing, time arithmetic, timestamp intervals, formatting with STRFTIME, and ISO-8601 date comparisons in SQL.',
      vi: 'Làm chủ phân tích ngày tháng, tính toán thời gian, khoảng thời gian timestamp, định dạng với STRFTIME và so sánh ngày ISO-8601 trong SQL.'
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_9",
    moduleId: "sql_mod_2",
    levelId: 'basic',
    courseId: 'sql',
    order: 9,
    topicId: 'sql_aggregate_functions',
    title: {
      en: 'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX & Handling NULLs',
      vi: 'Hàm Tổng Hợp: COUNT, SUM, AVG, MIN, MAX & Cách Xử Lý NULL'
    },
    summary: {
      en: 'Calculate summary metrics with aggregate reduction functions, understand COUNT(*) vs COUNT(column), and master NULL handling in calculations.',
      vi: 'Tính toán chỉ số tổng hợp với các hàm thu gọn, hiểu sự khác biệt COUNT(*) vs COUNT(cột) và làm chủ cách xử lý NULL khi tính toán.'
    },
    estimatedMinutes: 18,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_10",
    moduleId: "sql_mod_2",
    levelId: 'basic',
    courseId: 'sql',
    order: 10,
    topicId: 'sql_group_by_having',
    title: {
      en: 'Grouping Data with GROUP BY & Column Projection Rules',
      vi: 'Gom Nhóm Dữ Liệu Với GROUP BY & Quy Tắc Chiếu Cột'
    },
    summary: {
      en: 'Group rows into aggregated summary buckets across single and multiple dimension columns while avoiding non-aggregated projection syntax errors.',
      vi: 'Gom nhóm các bản ghi thành các khối tổng hợp theo một hoặc nhiều chiều dữ liệu, tránh lỗi cú pháp chiếu cột chưa được gom nhóm.'
    },
    estimatedMinutes: 18,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_11",
    moduleId: "sql_mod_2",
    levelId: 'basic',
    courseId: 'sql',
    order: 11,
    topicId: 'sql_inner_left_joins',
    title: {
      en: 'Inner Joins (INNER JOIN), Aliases & Multi-Table Joins',
      vi: 'Kết Nối INNER JOIN, Đặt Bí Danh & Kết Nối Đa Bảng'
    },
    summary: {
      en: 'Perform relational equi-joins between primary and foreign keys, assign table aliases, and link three or more tables seamlessly.',
      vi: 'Thực hiện kết nối bằng equi-join giữa khóa chính và khóa ngoại, gán bí danh bảng và liên kết mượt mà từ 3 bảng trở lên.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_12",
    moduleId: "sql_mod_2",
    levelId: 'basic',
    courseId: 'sql',
    order: 12,
    topicId: 'sql_outer_cross_joins',
    title: {
      en: 'Outer Joins: LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN & Anti-Joins',
      vi: 'Outer Joins: LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN & Phép Nối Anti-Join'
    },
    summary: {
      en: 'Preserve unmatched primary entity rows with LEFT/RIGHT/FULL OUTER JOINs, handle NULL padding, and isolate orphaned records using Anti-Joins.',
      vi: 'Bảo toàn bản ghi thực thể chính không khớp với LEFT/RIGHT/FULL OUTER JOIN, xử lý giá trị bù NULL và cô lập dữ liệu mồ côi bằng Anti-Join.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },

  // Module 03: Subqueries, Set Operations & Schema DDL (Lessons 13–17)
  {
    id: "sql_lesson_13",
    moduleId: "sql_mod_3",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 13,
    topicId: 'sql_subqueries',
    title: {
      en: 'Scalar, Column & Row Subqueries (IN, ANY, ALL)',
      vi: 'Truy Vấn Con Vô Hướng, Cột & Dòng (IN, ANY, ALL)'
    },
    summary: {
      en: 'Nest queries in SELECT, WHERE, and FROM clauses, distinguish scalar vs multi-row subqueries, and compare result sets using IN, ANY, and ALL.',
      vi: 'Lồng truy vấn con trong mệnh đề SELECT, WHERE và FROM, phân biệt truy vấn vô hướng vs đa dòng và so sánh tập kết quả với IN, ANY, ALL.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_14",
    moduleId: "sql_mod_3",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 14,
    topicId: 'sql_ctes_recursive',
    title: {
      en: 'Common Table Expressions (CTEs) & Correlated Subqueries',
      vi: 'Biểu Thức Bảng Chung (CTE) & Truy Vấn Con Tương Quan'
    },
    summary: {
      en: 'Structure readable multi-step query pipelines using WITH CTEs, traverse hierarchies with Recursive CTEs, and write correlated EXISTS subqueries.',
      vi: 'Cấu trúc quy trình xử lý dữ liệu nhiều bước rõ ràng với WITH CTE, duyệt cây phân cấp bằng CTE đệ quy và viết truy vấn con tương quan EXISTS.'
    },
    estimatedMinutes: 22,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_15",
    moduleId: "sql_mod_3",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 15,
    topicId: 'sql_set_operations',
    title: {
      en: 'Set Operations: UNION, UNION ALL, INTERSECT & EXCEPT',
      vi: 'Phép Toán Tập Hợp: UNION, UNION ALL, INTERSECT & EXCEPT'
    },
    summary: {
      en: 'Combine query result sets using relational set operations (UNION, INTERSECT, EXCEPT), enforce column compatibility, and leverage UNION ALL for performance.',
      vi: 'Kết hợp các tập kết quả truy vấn bằng phép toán tập hợp (UNION, INTERSECT, EXCEPT), đảm bảo tương thích cột và tận dụng UNION ALL để tối ưu hiệu năng.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_16",
    moduleId: "sql_mod_3",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 16,
    topicId: 'sql_conditional_case',
    title: {
      en: 'Conditional Logic with CASE WHEN, COALESCE & NULLIF',
      vi: 'Logic Điều Kiện Với CASE WHEN, COALESCE & NULLIF'
    },
    summary: {
      en: 'Build dynamic conditional branching in SELECT/ORDER BY using Searched CASE, provide safe fallback values with COALESCE, and prevent division-by-zero with NULLIF.',
      vi: 'Xây dựng nhánh điều kiện động trong SELECT/ORDER BY bằng Searched CASE, cung cấp giá trị dự phòng an toàn với COALESCE và chống lỗi chia cho 0 với NULLIF.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_17",
    moduleId: "sql_mod_3",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 17,
    topicId: 'sql_ddl_constraints',
    title: {
      en: 'DDL & Constraints: CREATE, ALTER, DROP & Table Integrity',
      vi: 'Định Nghĩa Dữ Liệu (DDL) & Ràng Buộc Toàn Vẹn Bảng'
    },
    summary: {
      en: 'Master Data Definition Language: create relational schemas with CREATE TABLE, enforce referential integrity with constraints, and evolve schemas with ALTER TABLE.',
      vi: 'Làm chủ DDL: tạo lược đồ bảng với CREATE TABLE, thực thi toàn vẹn tham chiếu với các ràng buộc và nâng cấp cấu trúc bảng với ALTER TABLE.'
    },
    estimatedMinutes: 22,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },

  // Module 04: DML Mutations, Views & ACID Transactions (Lessons 18–22)
  {
    id: "sql_lesson_18",
    moduleId: "sql_mod_4",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 18,
    topicId: 'sql_dml_operations',
    title: {
      en: 'DML Operations: INSERT, UPDATE, DELETE & TRUNCATE',
      vi: 'Thao Tác DML: INSERT, UPDATE, DELETE & TRUNCATE'
    },
    summary: {
      en: 'Execute data mutations with multi-row INSERT, safe guarded UPDATE/DELETE with WHERE filters, RETURNING clauses, and TRUNCATE performance.',
      vi: 'Thực thi thao tác dữ liệu với INSERT đa dòng, UPDATE/DELETE an toàn có rào chắn WHERE, mệnh đề RETURNING và tối ưu hiệu năng TRUNCATE.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_19",
    moduleId: "sql_mod_4",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 19,
    topicId: 'sql_merge_upsert',
    title: {
      en: 'Upserting & Merging: ON CONFLICT DO UPDATE / MERGE',
      vi: 'Kỹ Thuật Upsert & Gộp Dữ Liệu: ON CONFLICT DO UPDATE / MERGE'
    },
    summary: {
      en: 'Achieve idempotent data ingestion pipelines using SQLite/PostgreSQL ON CONFLICT DO UPDATE (UPSERT) and SQL standard MERGE statements.',
      vi: 'Xây dựng đường ống nạp dữ liệu lũy suy an toàn bằng ON CONFLICT DO UPDATE (UPSERT) trong SQLite/PostgreSQL và lệnh MERGE chuẩn SQL.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_20",
    moduleId: "sql_mod_4",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 20,
    topicId: 'sql_views_materialized',
    title: {
      en: 'Views & Materialized Views: Abstraction & Query Acceleration',
      vi: 'Khung Nhìn Views & Materialized Views: Trừu Tượng Hóa & Tăng Tốc Truy Vấn'
    },
    summary: {
      en: 'Encapsulate complex joins and security policies with CREATE VIEW, and accelerate heavy analytical queries with Materialized Views.',
      vi: 'Đóng gói các phép join phức tạp và chính sách bảo mật với CREATE VIEW, đồng thời tăng tốc các truy vấn phân tích nặng với Materialized Views.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_21",
    moduleId: "sql_mod_4",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 21,
    topicId: 'sql_transactions_acid',
    title: {
      en: 'Transactions & ACID Properties: COMMIT, ROLLBACK & SAVEPOINT',
      vi: 'Giao Dịch & Tính Chất ACID: COMMIT, ROLLBACK & SAVEPOINT'
    },
    summary: {
      en: 'Orchestrate atomic multi-statement operations with BEGIN, COMMIT, ROLLBACK, SAVEPOINT, and master the core ACID database guarantees.',
      vi: 'Điều phối các thao tác nguyên tử nhiều câu lệnh với BEGIN, COMMIT, ROLLBACK, SAVEPOINT và làm chủ các nguyên tắc đảm bảo ACID của CSDL.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_22",
    moduleId: "sql_mod_4",
    levelId: 'intermediate',
    courseId: 'sql',
    order: 22,
    topicId: 'sql_isolation_levels',
    title: {
      en: 'Transaction Isolation Levels & Concurrency Anomalies',
      vi: 'Cấp Độ Cô Lập Giao Dịch & Các Hiện Tượng Tương Tranh'
    },
    summary: {
      en: 'Master the 4 ANSI SQL isolation levels (Read Uncommitted to Serializable), understand Dirty Reads, Non-Repeatable Reads, Phantom Reads, and prevent Deadlocks.',
      vi: 'Làm chủ 4 cấp độ cô lập ANSI SQL (Read Uncommitted đến Serializable), hiểu các lỗi Dirty Read, Non-Repeatable Read, Phantom Read và chống Deadlock.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },

  // Module 05: Window Functions, Indexing & Programmable SQL (Lessons 23–28)
  {
    id: "sql_lesson_23",
    moduleId: "sql_mod_5",
    levelId: 'advanced',
    courseId: 'sql',
    order: 23,
    topicId: 'sql_window_ranking',
    title: {
      en: 'Window Functions: OVER, PARTITION BY & Ranking',
      vi: 'Hàm Cửa Sổ: OVER, PARTITION BY & Xếp Thứ Hạng'
    },
    summary: {
      en: 'Compute analytical aggregations and row rankings across data partitions using ROW_NUMBER, RANK, DENSE_RANK, and NTILE without collapsing detail rows.',
      vi: 'Tính toán tổng hợp phân tích và xếp thứ hạng trên các phân vùng dữ liệu bằng ROW_NUMBER, RANK, DENSE_RANK, NTILE mà không làm gộp các dòng chi tiết.'
    },
    estimatedMinutes: 22,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_24",
    moduleId: "sql_mod_5",
    levelId: 'advanced',
    courseId: 'sql',
    order: 24,
    topicId: 'sql_window_offset_frames',
    title: {
      en: 'Value & Offset Window Functions: LAG, LEAD & Window Frames',
      vi: 'Hàm Cửa Sổ Độ Lệch: LAG, LEAD & Khung Cửa Sổ Trượt'
    },
    summary: {
      en: 'Calculate period-over-period growth and deltas using LAG/LEAD/FIRST_VALUE, and control sliding window calculation ranges with ROWS BETWEEN frame specifications.',
      vi: 'Tính toán tăng trưởng theo kỳ và độ biến thiên bằng LAG/LEAD/FIRST_VALUE, kiểm soát phạm vi tính toán cửa sổ trượt với mệnh đề ROWS BETWEEN.'
    },
    estimatedMinutes: 22,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_25",
    moduleId: "sql_mod_5",
    levelId: 'advanced',
    courseId: 'sql',
    order: 25,
    topicId: 'sql_indexes_sargability',
    title: {
      en: 'B-Tree Indexes, Composite Indexes & Covering Indexes',
      vi: 'Chỉ Mục B-Tree, Chỉ Mục Phức Hợp & Chỉ Mục Bao Phủ'
    },
    summary: {
      en: 'Master B-Tree search mechanics, composite index ordering (Leftmost Prefix Rule), Covering Indexes for Index-Only Scans, and partial filtered indexes.',
      vi: 'Làm chủ cơ chế tìm kiếm B-Tree, thứ tự chỉ mục phức hợp (quy tắc tiền tố ngoài cùng bên trái), chỉ mục bao phủ Index-Only Scan và chỉ mục có điều kiện.'
    },
    estimatedMinutes: 22,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_26",
    moduleId: "sql_mod_5",
    levelId: 'advanced',
    courseId: 'sql',
    order: 26,
    topicId: 'sql_query_plans_optimization',
    title: {
      en: 'Query Plans & Performance: EXPLAIN & SARGability',
      vi: 'Kế Hoạch Truy Vấn & Tối Ưu Hiệu Năng: EXPLAIN & Tính SARGable'
    },
    summary: {
      en: 'Diagnose query bottlenecks with EXPLAIN and EXPLAIN QUERY PLAN, distinguish Full Scans vs Index Seeks, and write SARGable predicates.',
      vi: 'Chẩn đoán nút thắt cổ chai bằng EXPLAIN và EXPLAIN QUERY PLAN, phân biệt Quét toàn bảng vs Tìm kiếm chỉ mục và viết điều kiện lọc chuẩn SARGable.'
    },
    estimatedMinutes: 22,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_27",
    moduleId: "sql_mod_5",
    levelId: 'advanced',
    courseId: 'sql',
    order: 27,
    topicId: 'sql_json_operations',
    title: {
      en: 'JSON Operations & Semi-Structured Data in SQL',
      vi: 'Thao Tác JSON & Dữ Liệu Bán Cấu Trúc Trong SQL'
    },
    summary: {
      en: 'Master relational-document hybrid data architectures: parsing JSON with json_extract and ->>, updating with json_set, unnesting arrays with json_each, and indexing semi-structured JSONB.',
      vi: 'Làm chủ kiến trúc kết hợp quan hệ - tài liệu: trích xuất JSON bằng json_extract và ->>, cập nhật bằng json_set, trải phẳng mảng bằng json_each và đánh chỉ mục JSONB.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "sql_lesson_28",
    moduleId: "sql_mod_5",
    levelId: 'advanced',
    courseId: 'sql',
    order: 28,
    topicId: 'sql_stored_procs_triggers',
    title: {
      en: 'Stored Procedures, Triggers & User-Defined Functions (UDFs)',
      vi: 'Thủ Tục Lưu Trữ (Stored Procedures), Trigger & Hàm Tự Định Nghĩa (UDF)'
    },
    summary: {
      en: 'Master server-side procedural programming: building parameterized Stored Procedures with transaction control, automated audit Triggers with NEW/OLD row states, and reusable UDFs.',
      vi: 'Làm chủ lập trình thủ tục phía máy chủ: xây dựng Stored Procedure có tham số kết hợp giao dịch, Trigger kiểm toán tự động với trạng thái NEW/OLD và hàm UDF tái sử dụng.'
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  }
];

export default sqlLessonMetadataList;
