import { Lesson } from '../src/types';
import * as fs from 'fs';
import * as path from 'path';
import { tier4Part1Lessons } from './generateTier4Part1';

export const tier4Part2Lessons: Lesson[] = [
  // LESSON 19: Indexes, SARGability & Query Optimization
  {
    id: 'sql_lesson_19',
    moduleId: 'sql_mod_4',
    levelId: 'advanced',
    courseId: 'sql',
    order: 19,
    topicId: 'sql_indexes_sargability',
    title: {
      en: 'Indexes, SARGability & Query Optimization',
      vi: 'Chỉ Mục (Index), Tính SARGable & Tối Ưu Hóa Truy Vấn'
    },
    summary: {
      en: 'Master B-Tree index structures, composite multi-column indexing rules (Leftmost Prefix), writing SARGable search predicates, avoiding function-wrapping index suppression, and optimizing query throughput.',
      vi: 'Làm chủ cấu trúc chỉ mục B-Tree, quy tắc chỉ mục đa cột phức hợp (tiền tố ngoài cùng bên trái - Leftmost Prefix), viết điều kiện lọc SARGable, tránh bọc hàm làm mất chỉ mục và tối ưu hóa thông lượng truy vấn.'
    },
    estimatedMinutes: 25,
    learn: {
      introduction: {
        en: 'A Database Index is a specialized auxiliary data structure (usually a balanced B-Tree) that allows the database engine to find specific records in logarithmic time O(log N) rather than performing an expensive Full Table Scan O(N).',
        vi: 'Chỉ mục CSDL (Index) là một cấu trúc dữ liệu bổ trợ chuyên dụng (thường là cây cân bằng B-Tree) cho phép hệ quản trị CSDL tìm kiếm các bản ghi với độ phức tạp logarit O(log N) thay vì phải quét toàn bộ bảng O(N) vô cùng tốn kém.'
      },
      conceptExplanation: {
        en: '1) B-Tree Indexes: Organize sorted keys and row pointers into balanced tree nodes for fast point lookups and range scans. 2) Composite Indexes: Indexing multiple columns (col_a, col_b) requires queries to filter by col_a first to leverage the index (The Leftmost Prefix Rule). 3) SARGability (Search Argument Able): A predicate is SARGable if the query planner can utilize index seeks. Wrapping indexed columns in functions (e.g. WHERE UPPER(name) = \'ALICE\' or WHERE YEAR(order_date) = 2024) destroys SARGability, forcing full table scans! 4) Covering Indexes: An index containing all projected columns satisfies the query purely from index memory without touching table pages (Index-Only Scan).',
        vi: '1) Chỉ mục B-Tree: Tổ chức các khóa đã sắp xếp và con trỏ dòng vào các nút cây cân bằng để tra cứu điểm và quét dải siêu nhanh. 2) Chỉ mục phức hợp (Composite Index): Đánh chỉ mục nhiều cột (col_a, col_b) đòi hỏi truy vấn phải lọc theo col_a trước thì mới tận dụng được chỉ mục (Quy tắc tiền tố bên trái). 3) Tính SARGable: Một vị từ là SARGable nếu trình tối ưu có thể dùng tìm kiếm chỉ mục (Index Seek). Việc bọc cột chỉ mục trong các hàm (như WHERE UPPER(name) = \'ALICE\' hay WHERE YEAR(order_date) = 2024) sẽ phá hủy tính SARGable, ép CSDL phải quét toàn bộ bảng! 4) Covering Index: Chỉ mục chứa toàn bộ các cột được chọn giúp đáp ứng truy vấn trực tiếp từ RAM của chỉ mục mà không cần chạm vào các trang dữ liệu của bảng (Index-Only Scan).'
      },
      syntax: `-- 1. Creating Single & Composite Indexes:
CREATE INDEX idx_students_course ON students(course);
CREATE INDEX idx_emp_dept_salary ON employees(dept_id, salary DESC);

-- 2. Creating a Unique Index:
CREATE UNIQUE INDEX idx_students_email ON students(email);

-- 3. Non-SARGable vs SARGable Comparisons:
-- NON-SARGABLE (Destroys index lookup):
-- SELECT * FROM orders WHERE SUBSTR(customer_name, 1, 1) = 'A';
-- SARGABLE (Uses index seek):
SELECT * FROM orders WHERE customer_name >= 'A' AND customer_name < 'B';

-- NON-SARGABLE (Calculated column):
-- SELECT * FROM employees WHERE salary * 1.10 > 80000;
-- SARGABLE (Isolates raw column):
SELECT * FROM employees WHERE salary > 80000 / 1.10;`,
      examples: [
        {
          title: {
            en: '1. Transforming Non-SARGable Date Searches into SARGable Range Queries',
            vi: '1. Chuyển Đổi Tìm Kiếm Ngày Không SARGable Thành Truy Vấn Dải SARGable'
          },
          code: `-- BAD (Non-SARGable: applies strftime to every row, forcing full table scan):
-- SELECT * FROM orders WHERE strftime('%Y', order_date) = '2024';

-- GOOD (SARGable: clean range search enables fast B-Tree index seek):
SELECT order_id, customer_name, order_date, amount
FROM orders
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'
ORDER BY order_date;`,
          language: 'sql',
          explanation: {
            en: 'Keeping the indexed column raw on the left-hand side of comparison operators allows the B-Tree index to perform direct binary range seeking.',
            vi: 'Giữ nguyên cột có chỉ mục ở vế trái của toán tử so sánh cho phép cây B-Tree thực hiện tìm kiếm dải nhị phân trực tiếp.'
          }
        },
        {
          title: {
            en: '2. Composite Index & Leftmost Prefix Rule in Action',
            vi: '2. Chỉ Mục Phức Hợp & Quy Tắc Tiền Tố Bên Trái Trong Thực Tế'
          },
          code: `CREATE INDEX idx_students_course_score ON students(course, score DESC);

-- Utilizes index efficiently (filters by course, then scans score in order):
SELECT name, course, score
FROM students
WHERE course = 'SQL' AND score >= 85
ORDER BY score DESC;`,
          language: 'sql',
          explanation: {
            en: 'The query satisfies both the WHERE filter and the ORDER BY clause directly from the composite index without requiring a secondary sorting pass.',
            vi: 'Truy vấn thỏa mãn cả bộ lọc WHERE lẫn mệnh đề ORDER BY trực tiếp từ chỉ mục phức hợp mà không cần thêm bước sắp xếp phụ.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Leading wildcard in LIKE searches (e.g. LIKE \'%alice\')',
            vi: 'Dùng ký tự đại diện ở đầu trong tìm kiếm LIKE (ví dụ: LIKE \'%alice\')'
          },
          correction: {
            en: 'A leading wildcard (\'%pattern\') makes it impossible for a B-Tree index to navigate alphabetically, forcing a full table scan. Only trailing wildcards (\'alice%\') are SARGable.',
            vi: 'Ký tự đại diện đứng đầu (\'%pattern\') khiến cây B-Tree không thể định hướng theo thứ tự chữ cái, bắt buộc phải quét toàn bộ bảng. Chỉ ký tự đại diện ở cuối (\'alice%\') mới có tính SARGable.'
          },
          code: `-- SLOW (Full Table Scan): WHERE email LIKE '%@gmail.com'
-- FAST & SARGABLE: WHERE email LIKE 'alice%'`
        },
        {
          mistake: {
            en: 'Over-indexing every single column in a table',
            vi: 'Đánh chỉ mục tràn lan trên mọi cột trong bảng'
          },
          correction: {
            en: 'Every index incurs physical storage overhead and significantly slows down INSERT, UPDATE, and DELETE operations (as the engine must maintain every B-Tree structure on every write). Only index high-cardinality filter and join columns.',
            vi: 'Mỗi chỉ mục đều chiếm dung lượng đĩa và làm chậm đáng kể các thao tác INSERT, UPDATE, DELETE (vì hệ thống phải cập nhật mọi cây B-Tree sau mỗi lần ghi). Chỉ nên đánh chỉ mục cho các cột lọc và join có độ phân biệt cao.'
          },
          code: `-- Balance read acceleration against write maintenance cost.`
        }
      ],
      tips: [
        {
          en: 'Cardinality refers to the uniqueness of data values in a column. Columns with high cardinality (e.g. email, UUID) benefit massively from indexes; low cardinality columns (e.g. gender, boolean status) often result in table scans.',
          vi: 'Độ phân biệt (Cardinality) là mức độ độc nhất của các giá trị trong một cột. Cột có độ phân biệt cao (email, UUID) tận dụng chỉ mục cực tốt; cột có độ phân biệt thấp (giới tính, trạng thái boolean) thường bị chuyển sang quét bảng.'
        },
        {
          en: 'A Covering Index contains all columns requested by a SELECT query, allowing the database to execute an Index-Only Scan without reading the physical table pages from disk.',
          vi: 'Covering Index chứa tất cả các cột được yêu cầu trong câu SELECT, cho phép CSDL thực thi Index-Only Scan mà không cần đọc các trang bảng vật lý từ ổ đĩa.'
        }
      ],
      practiceStarterCode: `-- Create an index to optimize student course lookups
CREATE INDEX idx_students_course ON students(course);
SELECT name, score FROM students WHERE course = 'SQL';`,
      practice: {
        task: {
          en: 'Write a DDL statement to create an index named idx_emp_salary on the employees table for the salary column: CREATE INDEX idx_emp_salary ON employees(salary);',
          vi: 'Viết câu lệnh DDL tạo một chỉ mục tên idx_emp_salary trên bảng employees cho cột salary: CREATE INDEX idx_emp_salary ON employees(salary);'
        },
        starterCode: `-- Create index on employees salary column
CREATE INDEX idx_emp_salary ON employees();`,
        solutionCode: `CREATE INDEX idx_emp_salary ON employees(salary);`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_19_1',
        type: 'fix_code',
        title: { en: 'Transform Non-SARGable Expression to SARGable', vi: 'Chuyển Đổi Biểu Thức Không SARGable Thành SARGable' },
        instruction: {
          en: 'Rewrite "WHERE salary * 2 > 100000" to isolate the raw column: "WHERE salary > 50000".',
          vi: 'Viết lại "WHERE salary * 2 > 100000" để giữ nguyên cột gốc: "WHERE salary > 50000".'
        },
        starterCode: 'SELECT name, salary FROM employees WHERE salary * 2 > 100000;',
        solutionCode: 'SELECT name, salary FROM employees WHERE salary > 50000;',
        hint: { en: 'Divide both sides by 2 to isolate salary.', vi: 'Chia cả 2 vế cho 2 để giữ nguyên salary.' },
        explanation: {
          en: 'Isolating the indexed column enables B-Tree index seek operations.',
          vi: 'Giữ nguyên cột có chỉ mục cho phép thực hiện tìm kiếm chỉ mục B-Tree.'
        }
      },
      {
        id: 'sql_ex_19_2',
        type: 'complete_code',
        title: { en: 'Complete Composite Index Creation', vi: 'Hoàn Thiện Tạo Chỉ Mục Phức Hợp' },
        instruction: {
          en: 'Complete the composite index on (dept_id, salary DESC): "CREATE INDEX idx_dept_sal ON employees(dept_id, salary DESC);".',
          vi: 'Hoàn thiện chỉ mục phức hợp trên (dept_id, salary DESC): "CREATE INDEX idx_dept_sal ON employees(dept_id, salary DESC);".'
        },
        starterCode: 'CREATE INDEX idx_dept_sal ON employees(dept_id, );',
        solutionCode: 'CREATE INDEX idx_dept_sal ON employees(dept_id, salary DESC);',
        hint: { en: 'Add "salary DESC".', vi: 'Thêm "salary DESC".' },
        explanation: {
          en: 'Composite indexes optimize multi-column filtering and ordering.',
          vi: 'Chỉ mục phức hợp tối ưu hóa việc lọc và sắp xếp trên nhiều cột.'
        }
      },
      {
        id: 'sql_ex_19_3',
        type: 'write_code',
        title: { en: 'Create Unique Index for Data Integrity', vi: 'Tạo Chỉ Mục Duy Nhất Để Bảo Vệ Dữ Liệu' },
        instruction: {
          en: 'Write a DDL statement to create a unique index named idx_unique_email on the students table for the email column: CREATE UNIQUE INDEX idx_unique_email ON students(email);',
          vi: 'Viết câu lệnh DDL tạo chỉ mục duy nhất tên idx_unique_email trên bảng students cho cột email: CREATE UNIQUE INDEX idx_unique_email ON students(email);'
        },
        starterCode: '-- Create unique index on students email\n',
        solutionCode: 'CREATE UNIQUE INDEX idx_unique_email ON students(email);',
        hint: { en: 'CREATE UNIQUE INDEX idx_unique_email ON students(email);', vi: 'CREATE UNIQUE INDEX idx_unique_email ON students(email);' },
        explanation: {
          en: 'Unique indexes enforce data uniqueness while providing fast lookup capabilities.',
          vi: 'Chỉ mục duy nhất vừa thực thi tính độc nhất dữ liệu vừa tăng tốc độ tra cứu.'
        }
      },
      {
        id: 'sql_ex_19_4',
        type: 'modify_example',
        title: { en: 'Make Prefix LIKE Pattern SARGable', vi: 'Biến Mẫu LIKE Thành SARGable' },
        instruction: {
          en: 'Change the wildcard from leading "%A" to trailing "A%" so the query can use a B-Tree index seek.',
          vi: 'Đổi ký tự đại diện từ đầu "%A" thành cuối "A%" để truy vấn có thể dùng tìm kiếm chỉ mục B-Tree.'
        },
        starterCode: "SELECT name FROM students WHERE name LIKE '%A';",
        solutionCode: "SELECT name FROM students WHERE name LIKE 'A%';",
        hint: { en: "Change '%A' to 'A%'.", vi: "Đổi '%A' thành 'A%'." },
        explanation: {
          en: 'Trailing wildcards allow B-Tree prefix traversal.',
          vi: 'Ký tự đại diện ở cuối cho phép duyệt tiền tố trên cây B-Tree.'
        }
      },
      {
        id: 'sql_ex_19_5',
        type: 'predict_output',
        title: { en: 'Predict Impact of Function Wrapping on Index Usage', vi: 'Dự Đoán Tác Động Của Việc Bọc Hàm Lên Chỉ Mục' },
        instruction: {
          en: 'When querying "WHERE LOWER(email) = \'test@example.com\'" on a standard index on email, will the database engine perform an Index Seek or a Full Table Scan?',
          vi: 'Khi truy vấn "WHERE LOWER(email) = \'test@example.com\'" trên chỉ mục chuẩn của cột email, CSDL sẽ dùng Index Seek hay Full Table Scan?'
        },
        starterCode: '-- Predict access path\n',
        solutionCode: "SELECT 'Full Table Scan' AS access_method;",
        options: [
          'Full Table Scan (function wrapping suppresses the standard B-Tree index)',
          'Index Seek',
          'Index-Only Scan',
          'Immediate Cache Hit'
        ],
        correctOptionIndex: 0,
        hint: { en: 'Function-wrapping columns prevents standard B-Tree index seek operations unless an expression index is created.', vi: 'Bọc hàm quanh cột sẽ vô hiệu hóa tìm kiếm chỉ mục B-Tree trừ khi tạo Expression Index.' },
        explanation: {
          en: 'The database must evaluate LOWER() on every row, forcing a full table scan.',
          vi: 'CSDL phải tính toán LOWER() trên từng dòng nên bắt buộc phải quét toàn bộ bảng.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_19',
      title: { en: 'High-Throughput Composite Index Architecture & SARGable Optimization', vi: 'Kiến Trúc Chỉ Mục Phức Hợp Hiệu Năng Cao & Tối Ưu SARGable' },
      description: {
        en: 'Write a SQL script that creates a high-performance indexing architecture and executes an optimized SARGable query: 1) Create a composite index named idx_students_course_score on students(course, score DESC). 2) Write an optimized SARGable SELECT query that fetches name, course, score, city from students WHERE course = \'SQL\' AND score >= 80.0 ORDER BY course ASC, score DESC;',
        vi: 'Viết tập lệnh SQL tạo kiến trúc chỉ mục hiệu năng cao và thực thi truy vấn SARGable tối ưu: 1) Tạo chỉ mục phức hợp tên idx_students_course_score trên students(course, score DESC). 2) Viết truy vấn SELECT SARGable tối ưu lấy name, course, score, city từ students CÓ course = \'SQL\' VÀ score >= 80.0 SẮP XẾP THEO course ASC, score DESC;'
      },
      requirements: [
        { en: 'CREATE INDEX idx_students_course_score ON students(course, score DESC);', vi: 'CREATE INDEX idx_students_course_score ON students(course, score DESC);' },
        { en: "SELECT name, course, score, city FROM students WHERE course = 'SQL' AND score >= 80.0 ORDER BY course ASC, score DESC;", vi: "SELECT name, course, score, city FROM students WHERE course = 'SQL' AND score >= 80.0 ORDER BY course ASC, score DESC;" }
      ],
      starterCode: `-- Write index creation and SARGable query below
CREATE INDEX idx_students_course_score ON students(course, score DESC);

SELECT name, course, score, city
FROM students
WHERE course = 'SQL' AND score >= 80.0
ORDER BY course ASC, score DESC;`,
      solutionCode: `CREATE INDEX idx_students_course_score ON students(course, score DESC); SELECT name, course, score, city FROM students WHERE course = 'SQL' AND score >= 80.0 ORDER BY course ASC, score DESC;`,
      hints: [{ en: 'Define CREATE INDEX followed by the SARGable SELECT statement.', vi: 'Định nghĩa CREATE INDEX sau đó là câu lệnh SELECT SARGable.' }],
      solutionExplanation: {
        en: 'Aligns composite index column ordering perfectly with both WHERE filtering and ORDER BY sorting.',
        vi: 'Căn chỉnh thứ tự cột chỉ mục phức hợp ăn khớp hoàn hảo với cả bộ lọc WHERE lẫn sắp xếp ORDER BY.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_19_v1',
        title: { en: 'High-Throughput Composite Index Architecture & SARGable Optimization', vi: 'Kiến Trúc Chỉ Mục Phức Hợp Hiệu Năng Cao & Tối Ưu SARGable' },
        description: {
          en: 'Create composite index on students(course, score DESC) and query SQL students score >= 80.',
          vi: 'Tạo chỉ mục phức hợp trên students(course, score DESC) và truy vấn học viên SQL có score >= 80.'
        },
        requirements: [{ en: 'CREATE INDEX and SELECT statements', vi: 'Câu lệnh CREATE INDEX và SELECT' }],
        starterCode: `CREATE INDEX ...; SELECT ...;`,
        solutionCode: `CREATE INDEX idx_students_course_score ON students(course, score DESC); SELECT name, course, score, city FROM students WHERE course = 'SQL' AND score >= 80.0 ORDER BY course ASC, score DESC;`,
        hints: [{ en: 'Write both index creation and query.', vi: 'Viết cả lệnh tạo chỉ mục và truy vấn.' }],
        solutionExplanation: { en: 'Composite index and SARGable filter.', vi: 'Chỉ mục phức hợp và bộ lọc SARGable.' }
      },
      {
        id: 'sql_ch_19_v2',
        title: { en: 'Employee Department Compensation Indexing', vi: 'Chỉ Mục Lương Nhân Sự Phòng Ban' },
        description: {
          en: 'CREATE INDEX idx_emp_dept_sal ON employees(dept_id, salary DESC); SELECT name, dept_id, salary FROM employees WHERE dept_id = 1 AND salary >= 60000 ORDER BY dept_id ASC, salary DESC;',
          vi: 'CREATE INDEX idx_emp_dept_sal ON employees(dept_id, salary DESC); SELECT name, dept_id, salary FROM employees WHERE dept_id = 1 AND salary >= 60000 ORDER BY dept_id ASC, salary DESC;'
        },
        requirements: [
          { en: 'CREATE INDEX idx_emp_dept_sal ON employees(dept_id, salary DESC)', vi: 'CREATE INDEX idx_emp_dept_sal ON employees(dept_id, salary DESC)' }
        ],
        starterCode: `CREATE INDEX idx_emp_dept_sal ON employees(dept_id, salary DESC); SELECT * FROM employees;`,
        solutionCode: `CREATE INDEX idx_emp_dept_sal ON employees(dept_id, salary DESC); SELECT name, dept_id, salary FROM employees WHERE dept_id = 1 AND salary >= 60000 ORDER BY dept_id ASC, salary DESC;`,
        hints: [{ en: 'Filter dept_id = 1 AND salary >= 60000.', vi: 'Lọc dept_id = 1 AND salary >= 60000.' }],
        solutionExplanation: { en: 'Multi-column index optimization.', vi: 'Tối ưu hóa chỉ mục đa cột.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_19_1',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'easy',
        question: { en: 'What does "SARGable" stand for in SQL query optimization?', vi: '"SARGable" viết tắt của cụm từ nào trong tối ưu hóa truy vấn SQL?' },
        options: [
          { en: 'Search Argument Able (predicates written in a way that allows the query engine to utilize index seeks)', vi: 'Search Argument Able (các điều kiện lọc được viết theo cách cho phép hệ thống tận dụng tìm kiếm chỉ mục)' },
          { en: 'System Array Resource Group', vi: 'System Array Resource Group' },
          { en: 'Structured Asynchronous Request Gateway', vi: 'Structured Asynchronous Request Gateway' },
          { en: 'Schema Auto Repair Guarantee', vi: 'Schema Auto Repair Guarantee' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SARGable predicates enable direct index lookups without scanning every row.', vi: 'Vị từ SARGable cho phép tra cứu chỉ mục trực tiếp mà không cần quét từng dòng.' }
      },
      {
        id: 'sql_q_19_2',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'medium',
        question: { en: 'What data structure is most widely used for relational database indexes (PostgreSQL, MySQL, SQLite, Oracle)?', vi: 'Cấu trúc dữ liệu nào được sử dụng phổ biến nhất cho các chỉ mục CSDL quan hệ (PostgreSQL, MySQL, SQLite, Oracle)?' },
        options: [
          { en: 'B-Tree (Balanced Tree)', vi: 'Cây B-Tree (Cây cân bằng)' },
          { en: 'Linked List', vi: 'Danh sách liên kết (Linked List)' },
          { en: 'Binary Heap', vi: 'Binary Heap' },
          { en: 'Stack', vi: 'Ngăn xếp (Stack)' }
        ],
        correctAnswers: [0],
        explanation: { en: 'B-Trees provide O(log N) point searches, range scans, and ordered sequential traversals.', vi: 'B-Tree cung cấp khả năng tìm kiếm điểm O(log N), quét dải và duyệt tuần tự có thứ tự.' }
      },
      {
        id: 'sql_q_19_3',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'medium',
        question: { en: 'Given a composite index on (country, city), which query CANNOT use this index?', vi: 'Với một chỉ mục phức hợp trên (country, city), truy vấn nào KHÔNG THỂ tận dụng chỉ mục này?' },
        options: [
          { en: 'WHERE city = \'Hanoi\' (violates the Leftmost Prefix rule by skipping the leading column country)', vi: 'WHERE city = \'Hanoi\' (vi phạm quy tắc Tiền tố bên trái vì bỏ qua cột đứng đầu country)' },
          { en: 'WHERE country = \'Vietnam\' AND city = \'Hanoi\'', vi: 'WHERE country = \'Vietnam\' AND city = \'Hanoi\'' },
          { en: 'WHERE country = \'Vietnam\'', vi: 'WHERE country = \'Vietnam\'' },
          { en: 'WHERE country = \'Vietnam\' ORDER BY city', vi: 'WHERE country = \'Vietnam\' ORDER BY city' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Composite B-Tree indexes are sorted primarily by the first column; skipping the first column prevents index traversal.', vi: 'Chỉ mục phức hợp B-Tree được sắp xếp ưu tiên theo cột đầu tiên; bỏ qua cột đầu sẽ không thể duyệt chỉ mục.' }
      },
      {
        id: 'sql_q_19_4',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'hard',
        question: { en: 'Why does "WHERE YEAR(created_at) = 2024" perform poorly on an indexed created_at column?', vi: 'Tại sao "WHERE YEAR(created_at) = 2024" chạy rất kém trên cột created_at đã được đánh chỉ mục?' },
        options: [
          { en: 'Because wrapping created_at in the YEAR() function prevents the optimizer from doing a B-Tree index seek, forcing a Full Table Scan', vi: 'Vì việc bọc created_at trong hàm YEAR() ngăn trình tối ưu hóa tìm kiếm chỉ mục B-Tree, bắt buộc phải quét toàn bộ bảng' },
          { en: 'Because YEAR() is deprecated in SQL', vi: 'Vì hàm YEAR() đã bị lỗi thời trong SQL' },
          { en: 'Because 2024 is an integer', vi: 'Vì 2024 là số nguyên' },
          { en: 'Because dates cannot be indexed', vi: 'Vì ngày tháng không thể đánh chỉ mục' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Function calls on indexed columns destroy SARGability. Rewrite as: created_at >= \'2024-01-01\' AND created_at < \'2025-01-01\'.', vi: 'Gọi hàm trên cột chỉ mục làm mất tính SARGable. Hãy viết lại thành: created_at >= \'2024-01-01\' AND created_at < \'2025-01-01\'.' }
      },
      {
        id: 'sql_q_19_5',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'medium',
        question: { en: 'What is a "Covering Index"?', vi: '"Covering Index" là gì?' },
        options: [
          { en: 'An index that contains all the columns needed by a query, allowing the database to satisfy the query entirely from index memory without reading table data pages', vi: 'Một chỉ mục chứa toàn bộ các cột cần thiết của truy vấn, cho phép CSDL đáp ứng truy vấn hoàn toàn từ bộ nhớ chỉ mục mà không cần đọc các trang dữ liệu bảng' },
          { en: 'An index that covers the entire hard drive', vi: 'Một chỉ mục bao phủ toàn bộ ổ đĩa' },
          { en: 'An encrypted index', vi: 'Một chỉ mục được mã hóa' },
          { en: 'An index on a view', vi: 'Một chỉ mục trên view' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Covering indexes eliminate table page lookups, achieving ultra-fast Index-Only Scans.', vi: 'Covering index loại bỏ việc đọc trang bảng vật lý, đạt được tốc độ Index-Only Scan siêu nhanh.' }
      },
      {
        id: 'sql_q_19_6',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'easy',
        question: { en: 'Which LIKE search pattern is SARGable on a B-Tree indexed text column?', vi: 'Mẫu tìm kiếm LIKE nào sau đây có tính SARGable trên một cột văn bản có chỉ mục B-Tree?' },
        options: [
          { en: 'name LIKE \'David%\' (trailing wildcard)', vi: 'name LIKE \'David%\' (ký tự đại diện ở cuối)' },
          { en: 'name LIKE \'%David%\' (middle wildcard)', vi: 'name LIKE \'%David%\' (ký tự đại diện ở giữa)' },
          { en: 'name LIKE \'%David\' (leading wildcard)', vi: 'name LIKE \'%David\' (ký tự đại diện ở đầu)' },
          { en: 'name LIKE \'%_David%\'', vi: 'name LIKE \'%_David%\'' }
        ],
        correctAnswers: [0],
        explanation: { en: 'B-Trees are sorted alphabetically; only known prefixes allow binary tree navigation.', vi: 'Cây B-Tree được sắp theo bảng chữ cái; chỉ có tiền tố cố định mới cho phép điều hướng cây nhị phân.' }
      },
      {
        id: 'sql_q_19_7',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'hard',
        question: { en: 'What is the trade-off of adding too many indexes to a table?', vi: 'Sự đánh đổi khi thêm quá nhiều chỉ mục vào một bảng là gì?' },
        options: [
          { en: 'It increases disk storage consumption and slows down all INSERT, UPDATE, and DELETE operations because every index must be modified on every write', vi: 'Làm tăng dung lượng lưu trữ đĩa và làm chậm tất cả các thao tác INSERT, UPDATE, DELETE vì mọi chỉ mục đều phải cập nhật lại sau mỗi lần ghi' },
          { en: 'It causes database crashes', vi: 'Làm sập CSDL' },
          { en: 'It limits the table to 1,000 rows', vi: 'Giới hạn bảng chỉ còn 1.000 dòng' },
          { en: 'It deletes foreign keys', vi: 'Nó xóa các khóa ngoại' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Indexes accelerate reads but impose write amplification overhead on all DML operations.', vi: 'Chỉ mục tăng tốc độ đọc nhưng gây chi phí ghi đè lên tất cả các thao tác DML.' }
      },
      {
        id: 'sql_q_19_8',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'medium',
        question: { en: 'What is "Index Selectivity"?', vi: '"Độ chọn lọc của chỉ mục" (Index Selectivity) là gì?' },
        options: [
          { en: 'The ratio of distinct key values to total row count (higher selectivity = more effective index)', vi: 'Tỷ lệ giữa số giá trị khóa phân biệt trên tổng số dòng (độ chọn lọc càng cao = chỉ mục càng hiệu quả)' },
          { en: 'The physical size of the index file', vi: 'Kích thước file vật lý của chỉ mục' },
          { en: 'The number of database users', vi: 'Số lượng người dùng CSDL' },
          { en: 'The speed of the network', vi: 'Tốc độ mạng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'High selectivity columns (e.g. primary keys, emails) return very few rows per key, maximizing index benefit.', vi: 'Cột có độ chọn lọc cao (khóa chính, email) trả về rất ít dòng cho mỗi khóa, tối đa hóa lợi ích chỉ mục.' }
      },
      {
        id: 'sql_q_19_9',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'hard',
        question: { en: 'What is an "Expression Index" (or Functional Index)?', vi: '"Expression Index" (hay Functional Index) là gì?' },
        options: [
          { en: 'An index created on the computed result of an expression or function (e.g. CREATE INDEX idx_lower_email ON users(LOWER(email))) to support function-wrapped queries', vi: 'Một chỉ mục được tạo trên kết quả tính toán của biểu thức/hàm (ví dụ: CREATE INDEX idx_lower_email ON users(LOWER(email))) để phục vụ truy vấn có bọc hàm' },
          { en: 'An index on mathematical formulas only', vi: 'Chỉ mục chỉ trên công thức toán học' },
          { en: 'An index that changes every hour', vi: 'Chỉ mục tự đổi mỗi giờ' },
          { en: 'An index without a table', vi: 'Chỉ mục không có bảng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Expression indexes precalculate function values in the B-Tree for fast evaluation.', vi: 'Expression index tính toán trước các giá trị hàm trong cây B-Tree để đánh giá nhanh.' }
      },
      {
        id: 'sql_q_19_10',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'easy',
        question: { en: 'Are PRIMARY KEY and UNIQUE constraints automatically indexed by relational databases?', vi: 'Các ràng buộc PRIMARY KEY và UNIQUE có tự động được đánh chỉ mục bởi các hệ CSDL quan hệ không?' },
        options: [
          { en: 'Yes, database engines automatically generate unique B-Tree indexes to enforce PRIMARY KEY and UNIQUE constraints', vi: 'Có, các hệ quản trị CSDL tự động tạo các chỉ mục B-Tree duy nhất để thực thi ràng buộc PRIMARY KEY và UNIQUE' },
          { en: 'No, developers must always create indexes manually for them', vi: 'Không, lập trình viên luôn phải tự tạo chỉ mục thủ công' },
          { en: 'Only in SQLite', vi: 'Chỉ trong SQLite' },
          { en: 'Only for integer columns', vi: 'Chỉ dành cho các cột kiểu số' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Relational engines automatically create unique indexes underneath primary and unique constraints.', vi: 'Hệ quản trị quan hệ tự động tạo các chỉ mục unique bên dưới các ràng buộc primary và unique.' }
      },
      {
        id: 'sql_q_19_11',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'medium',
        question: { en: 'What is a "Partial Index" (or Filtered Index)?', vi: '"Chỉ Mục Một Phần" (Partial Index / Filtered Index) là gì?' },
        options: [
          { en: 'An index built only over a subset of table rows satisfying a WHERE clause (e.g. CREATE INDEX idx_active ON users(id) WHERE is_active = true)', vi: 'Một chỉ mục chỉ được xây dựng trên một tập con các dòng thỏa mãn mệnh đề WHERE (ví dụ: CREATE INDEX idx_active ON users(id) WHERE is_active = true)' },
          { en: 'An incomplete corrupted index', vi: 'Một chỉ mục bị hỏng chưa hoàn thành' },
          { en: 'An index indexing half of a column\'s characters', vi: 'Chỉ mục chỉ đánh một nửa ký tự của cột' },
          { en: 'An index stored on two different servers', vi: 'Chỉ mục lưu trên 2 máy chủ khác nhau' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Partial indexes save disk space and write overhead by indexing only relevant subsets of data.', vi: 'Partial index tiết kiệm đĩa và giảm chi phí ghi bằng cách chỉ đánh chỉ mục tập dữ liệu quan trọng.' }
      },
      {
        id: 'sql_q_19_12',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'hard',
        question: { en: 'What is the "Leftmost Prefix Rule" for composite indexes?', vi: '"Quy Tắc Tiền Tố Bên Trái" (Leftmost Prefix Rule) cho chỉ mục phức hợp là gì?' },
        options: [
          { en: 'A composite index on (A, B, C) can be used to satisfy queries filtering on (A), (A, B), or (A, B, C), but CANNOT be used efficiently for (B) or (C) alone', vi: 'Chỉ mục phức hợp trên (A, B, C) dùng tốt cho truy vấn lọc trên (A), (A, B) hoặc (A, B, C), nhưng KHÔNG THỂ dùng hiệu quả cho (B) hoặc (C) đứng một mình' },
          { en: 'The leftmost column must always be a string', vi: 'Cột ngoài cùng bên trái luôn phải là chuỗi' },
          { en: 'Indexes can only be read from right to left', vi: 'Chỉ mục chỉ đọc được từ phải qua trái' },
          { en: 'All column names must start with "A"', vi: 'Mọi tên cột phải bắt đầu bằng chữ "A"' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Composite B-Tree navigation requires matching prefixes starting from the leftmost column.', vi: 'Duyệt cây B-Tree phức hợp đòi hỏi các tiền tố khớp bắt đầu từ cột ngoài cùng bên trái.' }
      },
      {
        id: 'sql_q_19_13',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'easy',
        question: { en: 'Which SQL command is used to remove an index from the database schema?', vi: 'Câu lệnh SQL nào được dùng để xóa một chỉ mục khỏi lược đồ CSDL?' },
        options: [
          { en: 'DROP INDEX index_name;', vi: 'DROP INDEX ten_chi_muc;' },
          { en: 'DELETE INDEX index_name;', vi: 'DELETE INDEX ten_chi_muc;' },
          { en: 'REMOVE INDEX index_name;', vi: 'REMOVE INDEX ten_chi_muc;' },
          { en: 'CLEAR INDEX index_name;', vi: 'CLEAR INDEX ten_chi_muc;' }
        ],
        correctAnswers: [0],
        explanation: { en: 'DROP INDEX drops index metadata and deallocates index storage pages.', vi: 'DROP INDEX xóa metadata của chỉ mục và giải phóng các trang lưu trữ chỉ mục.' }
      },
      {
        id: 'sql_q_19_14',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'medium',
        question: { en: 'Why should Foreign Key columns almost always be indexed in relational databases?', vi: 'Tại sao các cột Khóa Ngoại hầu như luôn cần được đánh chỉ mục trong CSDL quan hệ?' },
        options: [
          { en: 'To prevent full table scans during JOIN operations and avoid table-level locks during parent table DELETE/UPDATE actions with CASCADE', vi: 'Để tránh quét toàn bộ bảng trong các phép JOIN và tránh khóa toàn bảng khi xóa/sửa bảng cha có CASCADE' },
          { en: 'Because foreign keys fail to compile without indexes', vi: 'Vì khóa ngoại không thể biên dịch nếu thiếu chỉ mục' },
          { en: 'To encrypt relational data', vi: 'Để mã hóa dữ liệu quan hệ' },
          { en: 'To allow duplicate foreign keys', vi: 'Để cho phép khóa ngoại trùng lặp' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Indexing foreign keys prevents full table scans on parent-child joins and cascading deletes.', vi: 'Đánh chỉ mục khóa ngoại ngăn quét toàn bảng khi join cha-con và khi xóa dây chuyền cascade.' }
      },
      {
        id: 'sql_q_19_15',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'hard',
        question: { en: 'What is a "Clustered Index" in SQL Server and MySQL InnoDB?', vi: '"Chỉ Mục Gom Cụm" (Clustered Index) trong SQL Server và MySQL InnoDB là gì?' },
        options: [
          { en: 'An index that determines the physical on-disk storage order of the actual table rows (each table can have only 1 clustered index, usually the PRIMARY KEY)', vi: 'Chỉ mục quyết định thứ tự lưu trữ vật lý trên đĩa của các dòng thực tế trong bảng (mỗi bảng chỉ có 1 clustered index duy nhất, thường là PRIMARY KEY)' },
          { en: 'An index distributed across 10 servers', vi: 'Chỉ mục phân tán trên 10 máy chủ' },
          { en: 'An index containing only numbers', vi: 'Chỉ mục chỉ chứa số' },
          { en: 'A temporary index stored in RAM', vi: 'Chỉ mục tạm lưu trong RAM' }
        ],
        correctAnswers: [0],
        explanation: { en: 'A clustered index physically sorts table leaf data pages by the clustered key.', vi: 'Chỉ mục gom cụm sắp xếp vật lý các trang dữ liệu lá của bảng theo khóa gom cụm.' }
      },
      {
        id: 'sql_q_19_16',
        type: 'single_choice',
        topicId: 'sql_indexes_sargability',
        difficulty: 'easy',
        question: { en: 'Does adding an index change the SQL query results returned by a SELECT statement?', vi: 'Việc thêm một chỉ mục có làm thay đổi kết quả dữ liệu trả về của câu lệnh SELECT không?' },
        options: [
          { en: 'No, indexes only affect query execution performance, never the functional data results', vi: 'Không, chỉ mục chỉ tác động đến hiệu năng thực thi của truy vấn chứ không bao giờ làm thay đổi kết quả dữ liệu' },
          { en: 'Yes, it reverses the order of rows', vi: 'Có, nó đảo ngược thứ tự các dòng' },
          { en: 'Yes, it removes NULL rows automatically', vi: 'Có, nó tự động xóa các dòng NULL' },
          { en: 'Yes, it rounds all numbers', vi: 'Có, nó làm tròn mọi số' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Indexes are purely physical performance optimizations transparent to logical query results.', vi: 'Chỉ mục hoàn toàn là tối ưu hiệu năng vật lý trong suốt với kết quả logic của truy vấn.' }
      }
    ]
  },

  // LESSON 20: EXPLAIN QUERY PLAN, Execution Internals & SQL Security
  {
    id: 'sql_lesson_20',
    moduleId: 'sql_mod_4',
    levelId: 'advanced',
    courseId: 'sql',
    order: 20,
    topicId: 'sql_explain_security',
    title: {
      en: 'EXPLAIN QUERY PLAN, Execution Internals & SQL Security',
      vi: 'EXPLAIN QUERY PLAN, Nội Bộ Thực Thi & Bảo Mật SQL'
    },
    summary: {
      en: 'Master reading EXPLAIN and EXPLAIN QUERY PLAN execution diagnostics, identifying Scan vs Seek bottlenecks, understanding Cost-Based Optimizers, and defending against SQL Injection vulnerabilities using Parameterized Statements.',
      vi: 'Làm chủ đọc nhật ký thực thi EXPLAIN và EXPLAIN QUERY PLAN, nhận diện nút thắt cổ chai Quét (Scan) vs Tìm kiếm (Seek), hiểu trình tối ưu hóa dựa trên chi phí (CBO) và phòng chống tấn công SQL Injection bằng tham số hóa câu truy vấn.'
    },
    estimatedMinutes: 25,
    learn: {
      introduction: {
        en: 'Query execution diagnostics and application security are the twin pillars of senior database engineering. EXPLAIN QUERY PLAN reveals the exact physical algorithms chosen by the query planner, while secure parameterization prevents catastrophic SQL Injection attacks.',
        vi: 'Chẩn đoán thực thi truy vấn và bảo mật ứng dụng là hai trụ cột song hành của kỹ sư CSDL cao cấp. EXPLAIN QUERY PLAN vạch trần các thuật toán vật lý do trình lập kế hoạch lựa chọn, trong khi tham số hóa an toàn ngăn chặn các cuộc tấn công SQL Injection thảm khốc.'
      },
      conceptExplanation: {
        en: '1) EXPLAIN QUERY PLAN: Prepending this command outputs the query execution graph. Key operators: "SCAN TABLE" (O(N) full table scan - slow), "SEARCH TABLE ... USING INDEX" (O(log N) B-Tree seek - fast), "USE TEMP B-TREE FOR ORDER BY" (spilling sort to memory/disk). 2) Cost-Based Optimizer (CBO): Uses table statistics (ANALYZE) to calculate algorithmic costs before choosing Nested Loops, Hash Joins, or Merge Joins. 3) SQL Injection (SQLi): Occurs when untrusted user input is dynamically concatenated into SQL strings (e.g. \' OR 1=1 --). 4) Defense: NEVER concatenate raw strings; ALWAYS use Parameterized Queries (Prepared Statements with ? or $1 placeholders) which separate executable SQL code from user data arguments at the protocol level.',
        vi: '1) EXPLAIN QUERY PLAN: Thêm tiền tố này sẽ xuất ra sơ đồ thực thi truy vấn. Các toán tử chính: "SCAN TABLE" (quét toàn bảng O(N) - chậm), "SEARCH TABLE ... USING INDEX" (tìm kiếm chỉ mục O(log N) - nhanh), "USE TEMP B-TREE FOR ORDER BY" (sắp xếp trên bộ nhớ/đĩa tạm). 2) Trình tối ưu hóa dựa trên chi phí (CBO): Dùng thống kê bảng (ANALYZE) để tính toán chi phí trước khi chọn Nested Loop, Hash Join hay Merge Join. 3) Tấn công SQL Injection (SQLi): Xảy ra khi dữ liệu người dùng không tin cậy được nối chuỗi trực tiếp vào câu lệnh SQL (như \' OR 1=1 --). 4) Phòng thủ: TUYỆT ĐỐI KHÔNG nối chuỗi thô; LUÔN DÙNG Tham số hóa truy vấn (Prepared Statements với các biến giữ chỗ ? hoặc $1) giúp tách biệt hoàn toàn mã SQL thực thi và dữ liệu ở tầng giao thức.'
      },
      syntax: `-- 1. Inspecting Execution Plans in SQLite / PostgreSQL:
EXPLAIN QUERY PLAN
SELECT name, score
FROM students
WHERE course = 'SQL' AND score >= 90;

-- 2. Dangerous SQL Injection Vulnerability (String Concatenation in App Code):
-- const sql = "SELECT * FROM users WHERE user = '" + input + "' AND pass = '" + pass + "'";
-- If input = "admin' --", authentication is completely bypassed!

-- 3. Secure Parameterized Query (Node.js / Python / Java Prepared Statement):
-- db.query('SELECT * FROM users WHERE username = ? AND password_hash = ?', [user, hash]);`,
      examples: [
        {
          title: {
            en: '1. Diagnosing Full Table Scan vs Index Search with EXPLAIN QUERY PLAN',
            vi: '1. Chẩn Đoán Quét Toàn Bảng vs Tìm Kiếm Chỉ Mục Bằng EXPLAIN QUERY PLAN'
          },
          code: `EXPLAIN QUERY PLAN
SELECT s.name, s.course, s.score
FROM students s
WHERE s.course = 'SQL';`,
          language: 'sql',
          explanation: {
            en: 'Outputs the execution plan showing whether the engine uses SCAN TABLE students or SEARCH TABLE students USING INDEX.',
            vi: 'Xuất ra kế hoạch thực thi cho thấy hệ thống đang dùng SCAN TABLE students hay SEARCH TABLE students USING INDEX.'
          }
        },
        {
          title: {
            en: '2. Multi-Table Join Diagnostics with EXPLAIN QUERY PLAN',
            vi: '2. Chẩn Đoán Nối Đa Bảng Bằng EXPLAIN QUERY PLAN'
          },
          code: `EXPLAIN QUERY PLAN
SELECT s.name, o.amount
FROM students s
JOIN orders o ON s.name = o.customer_name
WHERE o.amount >= 50.0;`,
          language: 'sql',
          explanation: {
            en: 'Reveals join algorithms, table access ordering, and whether indexes are utilized for foreign key lookups.',
            vi: 'Hiển thị thuật toán join, thứ tự duyệt các bảng và việc các chỉ mục có được tận dụng cho khóa ngoại hay không.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Concatenating user input directly into SQL strings in backend code',
            vi: 'Nối chuỗi trực tiếp dữ liệu người dùng nhập vào câu SQL ở backend'
          },
          correction: {
            en: 'String concatenation is the root cause of SQL Injection vulnerabilities (OWASP Top 10). Always use parameterized placeholders (? or $1) provided by database drivers.',
            vi: 'Nối chuỗi là nguyên nhân gốc rễ của lỗ hổng SQL Injection (Top 10 OWASP). Luôn sử dụng các biến giữ chỗ tham số (? hoặc $1) do driver CSDL cung cấp.'
          },
          code: `-- VULNERABLE: "SELECT * FROM users WHERE name = '" + name + "'"
-- SECURE: "SELECT * FROM users WHERE name = ?", [name]`
        },
        {
          mistake: {
            en: 'Interpreting EXPLAIN without running ANALYZE to update stale table statistics',
            vi: 'Đọc kế hoạch EXPLAIN mà không chạy ANALYZE để cập nhật số liệu thống kê'
          },
          correction: {
            en: 'Cost-Based Optimizers rely on data distribution statistics. Outdated statistics cause the planner to choose inefficient full table scans over valid indexes. Run ANALYZE periodically.',
            vi: 'Trình tối ưu hóa dựa trên chi phí phụ thuộc vào thống kê phân phối dữ liệu. Số liệu thống kê lỗi thời khiến hệ thống chọn quét bảng thay vì dùng chỉ mục. Hãy chạy ANALYZE định kỳ.'
          },
          code: `-- Refresh table statistics:
ANALYZE students;`
        }
      ],
      tips: [
        {
          en: 'In PostgreSQL, "EXPLAIN ANALYZE" actually executes the query and provides real execution runtimes alongside estimated planner costs.',
          vi: 'Trong PostgreSQL, "EXPLAIN ANALYZE" sẽ thực thi truy vấn thực tế và cung cấp thời gian chạy thực bên cạnh chi phí ước tính của planner.'
        },
        {
          en: 'Parameterized queries not only prevent SQL Injection but also improve database performance via query plan caching.',
          vi: 'Truy vấn tham số hóa không chỉ ngăn chặn SQL Injection mà còn tăng hiệu năng CSDL nhờ khả năng lưu đệm kế hoạch truy vấn (plan caching).'
        }
      ],
      practiceStarterCode: `-- Inspect query plan for student lookup
EXPLAIN QUERY PLAN
SELECT name, score
FROM students
WHERE score >= 90;`,
      practice: {
        task: {
          en: 'Write an EXPLAIN QUERY PLAN statement to inspect the execution plan of selecting all orders with amount >= 100.0: EXPLAIN QUERY PLAN SELECT * FROM orders WHERE amount >= 100.0;',
          vi: 'Viết câu lệnh EXPLAIN QUERY PLAN để kiểm tra kế hoạch thực thi của việc chọn tất cả đơn hàng có amount >= 100.0: EXPLAIN QUERY PLAN SELECT * FROM orders WHERE amount >= 100.0;'
        },
        starterCode: `-- Inspect execution plan for orders
EXPLAIN QUERY PLAN
SELECT * FROM orders
WHERE ;`,
        solutionCode: `EXPLAIN QUERY PLAN SELECT * FROM orders WHERE amount >= 100.0;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_20_1',
        type: 'fix_code',
        title: { en: 'Fix Missing EXPLAIN QUERY PLAN Keywords', vi: 'Sửa Lỗi Thiếu Từ Khóa EXPLAIN QUERY PLAN' },
        instruction: {
          en: 'Prepend "EXPLAIN QUERY PLAN" before the SELECT statement.',
          vi: 'Thêm "EXPLAIN QUERY PLAN" vào trước câu lệnh SELECT.'
        },
        starterCode: 'SELECT name, salary FROM employees WHERE dept_id = 1;',
        solutionCode: 'EXPLAIN QUERY PLAN SELECT name, salary FROM employees WHERE dept_id = 1;',
        hint: { en: 'Prepend EXPLAIN QUERY PLAN.', vi: 'Thêm EXPLAIN QUERY PLAN vào đầu.' },
        explanation: {
          en: 'EXPLAIN QUERY PLAN reveals the physical operator execution tree.',
          vi: 'EXPLAIN QUERY PLAN vạch trần cây thực thi toán tử vật lý.'
        }
      },
      {
        id: 'sql_ex_20_2',
        type: 'complete_code',
        title: { en: 'Complete ANALYZE Statistics Command', vi: 'Hoàn Thiện Lệnh Cập Nhật Thống Kê ANALYZE' },
        instruction: {
          en: 'Complete the statistics collection statement: "ANALYZE students;".',
          vi: 'Hoàn thiện câu lệnh thu thập thống kê: "ANALYZE students;".'
        },
        starterCode: 'ANALYZE ;',
        solutionCode: 'ANALYZE students;',
        hint: { en: 'Add "students;".', vi: 'Thêm "students;".' },
        explanation: {
          en: 'The ANALYZE command gathers distribution statistics for the query planner.',
          vi: 'Lệnh ANALYZE thu thập số liệu phân phối thống kê cho trình tối ưu hóa.'
        }
      },
      {
        id: 'sql_ex_20_3',
        type: 'write_code',
        title: { en: 'Inspect Department Join Execution Plan', vi: 'Kiểm Tra Kế Hoạch Thực Thi Nối Phòng Ban' },
        instruction: {
          en: 'Write an EXPLAIN QUERY PLAN query for joining employees with orders on customer_name: EXPLAIN QUERY PLAN SELECT e.name, o.amount FROM employees e JOIN orders o ON e.name = o.customer_name;',
          vi: 'Viết truy vấn EXPLAIN QUERY PLAN để join employees với orders theo customer_name: EXPLAIN QUERY PLAN SELECT e.name, o.amount FROM employees e JOIN orders o ON e.name = o.customer_name;'
        },
        starterCode: '-- Inspect join query plan\n',
        solutionCode: 'EXPLAIN QUERY PLAN SELECT e.name, o.amount FROM employees e JOIN orders o ON e.name = o.customer_name;',
        hint: { en: 'EXPLAIN QUERY PLAN SELECT e.name, o.amount FROM employees e JOIN orders o ON e.name = o.customer_name;', vi: 'EXPLAIN QUERY PLAN SELECT e.name, o.amount FROM employees e JOIN orders o ON e.name = o.customer_name;' },
        explanation: {
          en: 'Evaluates join ordering and intermediate table access paths.',
          vi: 'Đánh giá thứ tự join và các đường dẫn truy cập bảng trung gian.'
        }
      },
      {
        id: 'sql_ex_20_4',
        type: 'modify_example',
        title: { en: 'Inspect Filter with EXPLAIN QUERY PLAN', vi: 'Kiểm Tra Bộ Lọc Bằng EXPLAIN QUERY PLAN' },
        instruction: {
          en: 'Add a WHERE clause "WHERE score >= 85" to the inspected student query.',
          vi: 'Thêm mệnh đề WHERE "WHERE score >= 85" vào truy vấn kiểm tra học viên.'
        },
        starterCode: 'EXPLAIN QUERY PLAN SELECT name, score FROM students;',
        solutionCode: 'EXPLAIN QUERY PLAN SELECT name, score FROM students WHERE score >= 85;',
        hint: { en: 'Add WHERE score >= 85 at the end.', vi: 'Thêm WHERE score >= 85 vào cuối.' },
        explanation: {
          en: 'Shows how filter predicates alter table scan and search operators.',
          vi: 'Hiển thị cách các vị từ lọc thay đổi toán tử quét và tìm kiếm bảng.'
        }
      },
      {
        id: 'sql_ex_20_5',
        type: 'predict_output',
        title: { en: 'Predict Security Defense Against SQL Injection', vi: 'Dự Đoán Biện Pháp Phòng Thủ Chống SQL Injection' },
        instruction: {
          en: 'What is the primary, gold-standard defense against SQL Injection vulnerabilities in backend applications?',
          vi: 'Biện pháp phòng thủ tiêu chuẩn vàng hàng đầu chống lại lỗ hổng SQL Injection trong ứng dụng backend là gì?'
        },
        starterCode: '-- Predict primary defense\n',
        solutionCode: "SELECT 'Parameterized Queries / Prepared Statements' AS defense;",
        options: [
          'Parameterized Queries / Prepared Statements (separating code from data at the protocol level)',
          'Escaping quotes with regular expressions manually',
          'Filtering out the word SELECT',
          'Running database servers without internet'
        ],
        correctOptionIndex: 0,
        hint: { en: 'Parameterized queries eliminate injection by treating user input strictly as data literals.', vi: 'Truy vấn tham số hóa triệt tiêu injection bằng cách xử lý dữ liệu nhập hoàn toàn là hằng số dữ liệu.' },
        explanation: {
          en: 'Parameterized statements guarantee that user input can never alter query AST syntax structure.',
          vi: 'Truy vấn tham số hóa đảm bảo dữ liệu người dùng không bao giờ làm biến đổi cấu trúc cú pháp AST của câu lệnh.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_20',
      title: { en: 'Comprehensive Database Performance Audit & Security Hardening', vi: 'Kiểm Toán Hiệu Năng & Gia Cố Bảo Mật CSDL Toàn Diện' },
      description: {
        en: 'Write an EXPLAIN QUERY PLAN diagnostic statement that inspects a multi-tier analytical query: Prepend EXPLAIN QUERY PLAN to a query that joins students s with orders o on s.name = o.customer_name, filtering WHERE s.score >= 80.0 AND o.amount >= 50.0, selecting s.name, s.course, s.score, o.order_id, o.amount, and ordering by s.score DESC, o.amount DESC.',
        vi: 'Viết câu lệnh chẩn đoán EXPLAIN QUERY PLAN kiểm tra truy vấn phân tích đa tầng: Thêm tiền tố EXPLAIN QUERY PLAN vào truy vấn join students s với orders o theo s.name = o.customer_name, lọc CÓ s.score >= 80.0 VÀ o.amount >= 50.0, chọn s.name, s.course, s.score, o.order_id, o.amount và sắp xếp theo s.score DESC, o.amount DESC.'
      },
      requirements: [
        { en: 'EXPLAIN QUERY PLAN prefix', vi: 'Tiền tố EXPLAIN QUERY PLAN' },
        { en: 'JOIN students s with orders o ON s.name = o.customer_name', vi: 'JOIN students s với orders o THEO s.name = o.customer_name' },
        { en: 'WHERE s.score >= 80.0 AND o.amount >= 50.0', vi: 'WHERE s.score >= 80.0 AND o.amount >= 50.0' },
        { en: 'ORDER BY s.score DESC, o.amount DESC', vi: 'ORDER BY s.score DESC, o.amount DESC' }
      ],
      starterCode: `-- Write your EXPLAIN QUERY PLAN diagnostic query below
EXPLAIN QUERY PLAN
SELECT s.name, s.course, s.score, o.order_id, o.amount
FROM students s
JOIN orders o ON s.name = o.customer_name
WHERE s.score >= 80.0 AND o.amount >= 50.0
ORDER BY ;`,
      solutionCode: `EXPLAIN QUERY PLAN SELECT s.name, s.course, s.score, o.order_id, o.amount FROM students s JOIN orders o ON s.name = o.customer_name WHERE s.score >= 80.0 AND o.amount >= 50.0 ORDER BY s.score DESC, o.amount DESC;`,
      hints: [{ en: 'Complete with ORDER BY s.score DESC, o.amount DESC.', vi: 'Hoàn thiện với ORDER BY s.score DESC, o.amount DESC.' }],
      solutionExplanation: {
        en: 'Generates the execution plan for a complex filtered and sorted join query.',
        vi: 'Tạo kế hoạch thực thi cho một truy vấn join phức tạp có lọc và sắp xếp.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_20_v1',
        title: { en: 'Comprehensive Database Performance Audit & Security Hardening', vi: 'Kiểm Toán Hiệu Năng & Gia Cố Bảo Mật CSDL Toàn Diện' },
        description: {
          en: 'Inspect execution plan of filtered join between students and orders ordered by score DESC, amount DESC.',
          vi: 'Kiểm tra kế hoạch thực thi của phép join có lọc giữa students và orders xếp theo score DESC, amount DESC.'
        },
        requirements: [{ en: 'EXPLAIN QUERY PLAN ...', vi: 'EXPLAIN QUERY PLAN ...' }],
        starterCode: `EXPLAIN QUERY PLAN SELECT ...;`,
        solutionCode: `EXPLAIN QUERY PLAN SELECT s.name, s.course, s.score, o.order_id, o.amount FROM students s JOIN orders o ON s.name = o.customer_name WHERE s.score >= 80.0 AND o.amount >= 50.0 ORDER BY s.score DESC, o.amount DESC;`,
        hints: [{ en: 'Include EXPLAIN QUERY PLAN prefix.', vi: 'Bao gồm tiền tố EXPLAIN QUERY PLAN.' }],
        solutionExplanation: { en: 'Full plan execution diagnostic.', vi: 'Chẩn đoán kế hoạch thực thi hoàn chỉnh.' }
      },
      {
        id: 'sql_ch_20_v2',
        title: { en: 'Inspect Department Compensation Aggregation Plan', vi: 'Kiểm Tra Kế Hoạch Gom Nhóm Lương Phòng Ban' },
        description: {
          en: 'EXPLAIN QUERY PLAN SELECT dept_id, COUNT(*) AS staff_count, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id HAVING AVG(salary) >= 60000;',
          vi: 'EXPLAIN QUERY PLAN SELECT dept_id, COUNT(*) AS staff_count, AVG(salary) AS avg_sal TỪ employees GOM NHÓM THEO dept_id CÓ AVG(salary) >= 60000;'
        },
        requirements: [
          { en: 'EXPLAIN QUERY PLAN SELECT dept_id, COUNT(*)... GROUP BY dept_id HAVING...', vi: 'EXPLAIN QUERY PLAN SELECT dept_id, COUNT(*)... GROUP BY dept_id HAVING...' }
        ],
        starterCode: `EXPLAIN QUERY PLAN SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id;`,
        solutionCode: `EXPLAIN QUERY PLAN SELECT dept_id, COUNT(*) AS staff_count, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id HAVING AVG(salary) >= 60000;`,
        hints: [{ en: 'Add HAVING AVG(salary) >= 60000.', vi: 'Thêm HAVING AVG(salary) >= 60000.' }],
        solutionExplanation: { en: 'Diagnostics for group aggregation plans.', vi: 'Chẩn đoán kế hoạch gom nhóm tổng hợp.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_20_1',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'easy',
        question: { en: 'What does the "EXPLAIN QUERY PLAN" command output in SQLite and other relational databases?', vi: 'Lệnh "EXPLAIN QUERY PLAN" xuất ra thông tin gì trong SQLite và các CSDL quan hệ khác?' },
        options: [
          { en: 'A high-level description of the strategy and physical operators (scans, index searches, temporary sorts) chosen by the query planner', vi: 'Một bản mô tả cấp cao về chiến lược và các toán tử vật lý (quét bảng, tìm kiếm chỉ mục, sắp xếp tạm) do trình lập kế hoạch lựa chọn' },
          { en: 'The execution time in nanoseconds', vi: 'Thời gian thực thi tính bằng nano giây' },
          { en: 'The list of database users', vi: 'Danh sách người dùng CSDL' },
          { en: 'The hard drive serial number', vi: 'Số seri ổ đĩa cứng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'EXPLAIN QUERY PLAN reveals the physical query strategy without formatting table data.', vi: 'EXPLAIN QUERY PLAN vạch trần chiến lược truy vấn vật lý mà không cần định dạng dữ liệu bảng.' }
      },
      {
        id: 'sql_q_20_2',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'easy',
        question: { en: 'What does "SCAN TABLE" in an EXPLAIN output signify?', vi: '"SCAN TABLE" trong kết quả EXPLAIN biểu thị điều gì?' },
        options: [
          { en: 'A Full Table Scan where every single row in the physical table is read sequentially (O(N) complexity)', vi: 'Quét toàn bộ bảng trong đó mọi dòng trong bảng vật lý đều được đọc tuần tự (độ phức tạp O(N))' },
          { en: 'A fast index seek', vi: 'Tìm kiếm chỉ mục nhanh' },
          { en: 'An error in the query', vi: 'Lỗi trong câu truy vấn' },
          { en: 'The table is empty', vi: 'Bảng bị rỗng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SCAN TABLE indicates sequential page scanning without index acceleration.', vi: 'SCAN TABLE chỉ ra việc quét tuần tự các trang dữ liệu mà không có sự hỗ trợ của chỉ mục.' }
      },
      {
        id: 'sql_q_20_3',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'medium',
        question: { en: 'What does "SEARCH TABLE ... USING INDEX" signify in an EXPLAIN output?', vi: '"SEARCH TABLE ... USING INDEX" biểu thị điều gì trong kết quả EXPLAIN?' },
        options: [
          { en: 'The engine is using a B-Tree index to seek directly to matching candidate rows in O(log N) time', vi: 'Hệ thống đang dùng cây chỉ mục B-Tree để tìm kiếm trực tiếp đến các dòng ứng viên khớp với thời gian O(log N)' },
          { en: 'A full table scan', vi: 'Quét toàn bộ bảng' },
          { en: 'A network timeout', vi: 'Hết thời gian chờ mạng' },
          { en: 'A disk error', vi: 'Lỗi ổ đĩa' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SEARCH TABLE USING INDEX indicates efficient index seek navigation.', vi: 'SEARCH TABLE USING INDEX biểu thị việc điều hướng tìm kiếm chỉ mục hiệu quả.' }
      },
      {
        id: 'sql_q_20_4',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'hard',
        question: { en: 'What causes SQL Injection vulnerabilities in software applications?', vi: 'Điều gì gây ra các lỗ hổng SQL Injection trong các ứng dụng phần mềm?' },
        options: [
          { en: 'Constructing dynamic SQL queries by concatenating raw, unescaped user input directly into executable SQL command strings', vi: 'Xây dựng câu truy vấn SQL động bằng cách nối trực tiếp dữ liệu thô chưa kiểm duyệt của người dùng vào chuỗi lệnh SQL thực thi' },
          { en: 'Using PostgreSQL instead of MySQL', vi: 'Dùng PostgreSQL thay vì MySQL' },
          { en: 'Having too many indexes', vi: 'Có quá nhiều chỉ mục' },
          { en: 'Using foreign keys', vi: 'Dùng khóa ngoại' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Concatenating untrusted strings allows attackers to manipulate the abstract syntax tree of SQL statements.', vi: 'Nối chuỗi không tin cậy cho phép kẻ tấn công can thiệp vào cây cú pháp trừu tượng của câu lệnh SQL.' }
      },
      {
        id: 'sql_q_20_5',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'easy',
        question: { en: 'How do Parameterized Queries (Prepared Statements) prevent SQL Injection attacks?', vi: 'Truy vấn tham số hóa (Prepared Statements) ngăn chặn các cuộc tấn công SQL Injection như thế nào?' },
        options: [
          { en: 'The SQL code structure is pre-compiled on the server, and parameters are transmitted separately as pure data literals that can NEVER be interpreted as executable SQL code', vi: 'Cấu trúc mã SQL được biên dịch trước trên máy chủ, và các tham số được truyền riêng biệt dưới dạng hằng số dữ liệu thuần túy KHÔNG BAO GIỜ bị thông dịch thành mã lệnh SQL' },
          { en: 'They encrypt the database hard drive', vi: 'Chúng mã hóa ổ đĩa CSDL' },
          { en: 'They automatically block IP addresses', vi: 'Chúng tự động chặn các địa chỉ IP' },
          { en: 'They convert all strings to lowercase', vi: 'Chúng chuyển mọi chuỗi thành chữ thường' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Prepared statements enforce strict separation of code instructions and data values.', vi: 'Prepared statement thực thi sự phân tách nghiêm ngặt giữa chỉ thị mã lệnh và giá trị dữ liệu.' }
      },
      {
        id: 'sql_q_20_6',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'medium',
        question: { en: 'What does the ANALYZE command do in SQLite, PostgreSQL, and other SQL engines?', vi: 'Lệnh ANALYZE làm nhiệm vụ gì trong SQLite, PostgreSQL và các hệ CSDL khác?' },
        options: [
          { en: 'It scans tables and indexes to collect statistical histograms about value distributions, saving them into catalog tables to help the Cost-Based Optimizer make accurate plan choices', vi: 'Nó quét các bảng và chỉ mục để thu thập biểu đồ thống kê về phân phối giá trị, lưu vào danh mục hệ thống giúp Trình tối ưu hóa chi phí đưa ra kế hoạch chính xác' },
          { en: 'It checks source code for syntax errors', vi: 'Nó kiểm tra lỗi cú pháp trong mã nguồn' },
          { en: 'It deletes corrupted rows', vi: 'Nó xóa các dòng bị lỗi' },
          { en: 'It restarts the database daemon', vi: 'Nó khởi động lại dịch vụ CSDL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ANALYZE updates statistical metadata crucial for cost-based optimization.', vi: 'ANALYZE cập nhật metadata thống kê tối quan trọng cho trình tối ưu hóa dựa trên chi phí.' }
      },
      {
        id: 'sql_q_20_7',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'hard',
        question: { en: 'What is the classic SQL injection payload "\' OR \'1\'=\'1" designed to accomplish in an authentication query like "WHERE username = \'$u\' AND password = \'$p\'"?', vi: 'Mã độc SQL injection kinh điển "\' OR \'1\'=\'1" được thiết kế để làm gì trong truy vấn xác thực như "WHERE username = \'$u\' AND password = \'$p\'"?' },
        options: [
          { en: 'It forces the WHERE boolean condition to evaluate to TRUE for every record, bypassing password verification and logging in as the first user (often admin)', vi: 'Nó ép điều kiện logic WHERE luôn thành TRUE cho mọi bản ghi, vượt qua bước kiểm tra mật khẩu và đăng nhập với tư cách người dùng đầu tiên (thường là admin)' },
          { en: 'It deletes all user accounts', vi: 'Nó xóa toàn bộ tài khoản người dùng' },
          { en: 'It crashes the web browser', vi: 'Nó làm sập trình duyệt web' },
          { en: 'It sends passwords via email', vi: 'Nó gửi mật khẩu qua email' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Tautology injection forces WHERE conditions to evaluate to TRUE unconditionally.', vi: 'Tautology injection ép điều kiện WHERE luôn đúng vô điều kiện.' }
      },
      {
        id: 'sql_q_20_8',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'medium',
        question: { en: 'What does "USE TEMP B-TREE FOR ORDER BY" signify in an EXPLAIN plan?', vi: '"USE TEMP B-TREE FOR ORDER BY" biểu thị điều gì trong kế hoạch EXPLAIN?' },
        options: [
          { en: 'The database engine had to allocate a temporary sorting structure in memory/disk because no supporting index was available to satisfy the requested ORDER BY sequence directly', vi: 'Hệ quản trị CSDL phải cấp phát cấu trúc sắp xếp tạm thời trong RAM/đĩa vì không có chỉ mục nào hỗ trợ để đáp ứng trực tiếp thứ tự ORDER BY yêu cầu' },
          { en: 'An error occurred during query compilation', vi: 'Đã xảy ra lỗi trong quá trình biên dịch truy vấn' },
          { en: 'The query executed in zero milliseconds', vi: 'Truy vấn chạy trong 0 mili-giây' },
          { en: 'The table was dropped', vi: 'Bảng đã bị xóa' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Indicates an explicit sort pass was required because the data was not pre-ordered by an index.', vi: 'Chỉ ra rằng cần một bước sắp xếp riêng biệt do dữ liệu chưa được sắp xếp sẵn bởi chỉ mục.' }
      },
      {
        id: 'sql_q_20_9',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'hard',
        question: { en: 'What is a "Blind SQL Injection" vulnerability?', vi: 'Lỗ hổng "Blind SQL Injection" (SQL Injection Mù) là gì?' },
        options: [
          { en: 'An injection vulnerability where the application displays no error messages or database output directly on screen, requiring attackers to infer data character-by-character using boolean true/false responses or time delays (e.g. pg_sleep)', vi: 'Lỗ hổng injection mà ứng dụng không hiển thị thông báo lỗi hay kết quả CSDL ra màn hình, buộc kẻ tấn công phải suy luận từng ký tự dữ liệu dựa trên phản hồi đúng/sai hoặc độ trễ thời gian (như pg_sleep)' },
          { en: 'An attack that blinds the monitor screen', vi: 'Cuộc tấn công làm tối màn hình máy tính' },
          { en: 'An attack that deletes all index files', vi: 'Cuộc tấn công xóa sạch các file chỉ mục' },
          { en: 'A bug in dark mode styling', vi: 'Lỗi giao diện chế độ tối' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Blind SQLi extracts data via boolean inference or temporal side channels.', vi: 'Blind SQLi trích xuất dữ liệu qua suy luận logic boolean hoặc kênh trễ thời gian.' }
      },
      {
        id: 'sql_q_20_10',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'easy',
        question: { en: 'What is the Principle of Least Privilege in database security?', vi: 'Nguyên tắc Đặc Quyền Tối Thiểu (Principle of Least Privilege) trong bảo mật CSDL là gì?' },
        options: [
          { en: 'Database user accounts used by applications should only be granted the absolute minimum permissions (e.g. SELECT, INSERT on specific tables) needed to function, never administrative superuser access', vi: 'Tài khoản CSDL do ứng dụng sử dụng chỉ nên được cấp quyền tối thiểu tuyệt đối (như SELECT, INSERT trên bảng cụ thể) cần để hoạt động, không bao giờ cấp quyền quản trị superuser' },
          { en: 'Only 1 user can connect to the database at a time', vi: 'Chỉ 1 người dùng được kết nối CSDL tại một thời điểm' },
          { en: 'All queries must be under 10 words', vi: 'Mọi truy vấn phải dưới 10 từ' },
          { en: 'Passwords must change every 5 minutes', vi: 'Mật khẩu phải đổi mỗi 5 phút' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Least privilege minimizes the blast radius if an application layer is compromised.', vi: 'Đặc quyền tối thiểu giúp giảm thiểu phạm vi thiệt hại nếu tầng ứng dụng bị tấn công.' }
      },
      {
        id: 'sql_q_20_11',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'medium',
        question: { en: 'What is the three major physical join algorithms used by modern Cost-Based Optimizers?', vi: 'Ba thuật toán join vật lý chính được các Trình tối ưu hóa chi phí hiện đại sử dụng là gì?' },
        options: [
          { en: 'Nested Loop Join, Hash Join, and Merge Join (Sort-Merge Join)', vi: 'Nested Loop Join, Hash Join và Merge Join (Sort-Merge Join)' },
          { en: 'Inner, Outer, and Cross Join', vi: 'Inner, Outer và Cross Join' },
          { en: 'Quick Join, Bubble Join, and Insert Join', vi: 'Quick Join, Bubble Join và Insert Join' },
          { en: 'TCP, UDP, and SSL Join', vi: 'TCP, UDP và SSL Join' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The optimizer selects among Nested Loop, Hash, and Sort-Merge based on table size and index availability.', vi: 'Trình tối ưu hóa chọn giữa Nested Loop, Hash và Sort-Merge dựa trên kích thước bảng và chỉ mục sẵn có.' }
      },
      {
        id: 'sql_q_20_12',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'hard',
        question: { en: 'Why is client-side input validation insufficient as a defense against SQL Injection?', vi: 'Tại sao việc kiểm tra tính hợp lệ dữ liệu ở phía client (trình duyệt) là không đủ để phòng chống SQL Injection?' },
        options: [
          { en: 'Because attackers can completely bypass client-side browser validation by sending HTTP requests directly via cURL, Postman, or custom scripts', vi: 'Vì kẻ tấn công có thể bỏ qua hoàn toàn kiểm tra phía client bằng cách gửi trực tiếp các yêu cầu HTTP qua cURL, Postman hoặc script tùy biến' },
          { en: 'Because JavaScript cannot validate strings', vi: 'Vì JavaScript không thể kiểm tra chuỗi' },
          { en: 'Because SQL does not run in browsers', vi: 'Vì SQL không chạy trong trình duyệt' },
          { en: 'Because HTML forms cannot send numbers', vi: 'Vì form HTML không thể gửi số' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Client-side checks provide UX benefits only; all security enforcement must occur on the server via parameterized queries.', vi: 'Kiểm tra phía client chỉ mang lại trải nghiệm người dùng; bảo mật bắt buộc phải thực thi tại máy chủ bằng truy vấn tham số hóa.' }
      },
      {
        id: 'sql_q_20_13',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'easy',
        question: { en: 'Which placeholder syntax is standard for parameterized queries in PostgreSQL?', vi: 'Cú pháp biến giữ chỗ nào là chuẩn cho truy vấn tham số hóa trong PostgreSQL?' },
        options: [
          { en: '$1, $2, $3', vi: '$1, $2, $3' },
          { en: '?, ?, ?', vi: '?, ?, ?' },
          { en: ':1, :2, :3', vi: ':1, :2, :3' },
          { en: '%s, %s, %s', vi: '%s, %s, %s' }
        ],
        correctAnswers: [0],
        explanation: { en: 'PostgreSQL uses positional numbered placeholders `$1`, `$2`, `$3`.', vi: 'PostgreSQL sử dụng các biến giữ chỗ theo vị trí được đánh số `$1`, `$2`, `$3`.' }
      },
      {
        id: 'sql_q_20_14',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'medium',
        question: { en: 'What is the danger of dynamic ORDER BY clauses in web applications (e.g. ORDER BY ${user_col})?', vi: 'Mối nguy hiểm của mệnh đề ORDER BY động trong ứng dụng web (ví dụ: ORDER BY ${user_col}) là gì?' },
        options: [
          { en: 'Most SQL drivers cannot parameterize identifier column names in ORDER BY; unvalidated concatenation exposes an SQL injection vulnerability (use whitelist validation instead)', vi: 'Hầu hết driver SQL không thể tham số hóa tên cột định danh trong ORDER BY; việc nối chuỗi không kiểm soát tạo ra lỗ hổng SQL injection (hãy dùng whitelist kiểm duyệt thay thế)' },
          { en: 'It makes the sort reverse', vi: 'Làm đảo ngược thứ tự sắp xếp' },
          { en: 'It deletes the sorted column', vi: 'Xóa cột được sắp xếp' },
          { en: 'It limits results to 10 rows', vi: 'Giới hạn kết quả còn 10 dòng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Identifiers cannot be parameterized with placeholders; they must be strictly validated against an explicit server-side whitelist.', vi: 'Tên định danh không thể truyền qua biến giữ chỗ; bắt buộc phải kiểm duyệt nghiêm ngặt theo danh sách trắng (whitelist) ở server.' }
      },
      {
        id: 'sql_q_20_15',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'hard',
        question: { en: 'What is a "Second-Order SQL Injection"?', vi: '"Second-Order SQL Injection" (SQL Injection Bậc 2) là gì?' },
        options: [
          { en: 'Malicious payload is safely stored in the database during Step 1, but later retrieved and dynamically concatenated into an unsafe query in Step 2 by a background process', vi: 'Mã độc được lưu an toàn vào CSDL ở Bước 1, nhưng sau đó được lấy ra và nối chuỗi không an toàn vào một truy vấn khác ở Bước 2 bởi tiến trình chạy ngầm' },
          { en: 'An injection executed two times in a row', vi: 'Cuộc tấn công thực thi 2 lần liên tiếp' },
          { en: 'An attack that targets secondary backup servers only', vi: 'Cuộc tấn công chỉ nhắm vào máy chủ sao lưu phụ' },
          { en: 'An attack on 2 tables at once', vi: 'Cuộc tấn công trên 2 bảng cùng lúc' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Second-order injection strikes when previously stored untrusted data is unsafely interpolated into secondary queries.', vi: 'Injection bậc 2 bùng phát khi dữ liệu không tin cậy đã lưu trước đó bị nối chuỗi không an toàn vào các truy vấn phụ sau này.' }
      },
      {
        id: 'sql_q_20_16',
        type: 'single_choice',
        topicId: 'sql_explain_security',
        difficulty: 'easy',
        question: { en: 'Does running EXPLAIN or EXPLAIN QUERY PLAN modify any data on disk?', vi: 'Việc chạy EXPLAIN hoặc EXPLAIN QUERY PLAN có làm sửa đổi bất kỳ dữ liệu nào trên đĩa không?' },
        options: [
          { en: 'No, EXPLAIN only analyzes and reports the planned execution path without mutating any data', vi: 'Không, EXPLAIN chỉ phân tích và báo cáo đường dẫn thực thi dự kiến mà không sửa đổi bất kỳ dữ liệu nào' },
          { en: 'Yes, it deletes slow rows', vi: 'Có, nó xóa các dòng chạy chậm' },
          { en: 'Yes, it commits open transactions automatically', vi: 'Có, nó tự động commit các giao dịch đang mở' },
          { en: 'Yes, it resets auto-increment IDs', vi: 'Có, nó đặt lại các ID tự tăng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'EXPLAIN is a strictly read-only diagnostic metadata analysis tool.', vi: 'EXPLAIN là công cụ chẩn đoán phân tích metadata hoàn toàn chỉ đọc.' }
      }
    ]
  }
];

// Combine Part 1 and Part 2 into Tier 4
const allTier4Lessons: Lesson[] = [
  ...tier4Part1Lessons,
  ...tier4Part2Lessons
];

const outputPath = path.join(process.cwd(), 'src', 'data', 'sql', 'sqlLessonsTier4.ts');
const fileContent = `import { Lesson } from '../../types';\n\nexport const sqlLessonsTier4: Lesson[] = ${JSON.stringify(allTier4Lessons, null, 2)};\n`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated Tier 4 lessons: ${allTier4Lessons.length} lessons written to ${outputPath}`);
