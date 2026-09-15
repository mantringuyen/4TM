import { Lesson } from '../src/types';

export const tier4Part1Lessons: Lesson[] = [
  // LESSON 16: DML & UPSERT: INSERT, UPDATE, DELETE & ON CONFLICT DO UPDATE
  {
    id: 'sql_lesson_16',
    moduleId: 'sql_mod_4',
    levelId: 'advanced',
    courseId: 'sql',
    order: 16,
    topicId: 'sql_dml_upsert',
    title: {
      en: 'DML & UPSERT: INSERT, UPDATE, DELETE & ON CONFLICT DO UPDATE',
      vi: 'DML & UPSERT: INSERT, UPDATE, DELETE & ON CONFLICT DO UPDATE'
    },
    summary: {
      en: 'Master Data Manipulation Language (DML), multi-row mutations, safe atomic UPDATE/DELETE with WHERE guards, and idempotent UPSERT using ON CONFLICT DO UPDATE.',
      vi: 'Làm chủ Ngôn ngữ thao tác dữ liệu (DML), sửa đổi dữ liệu đa dòng, UPDATE/DELETE an toàn với rào chắn WHERE và kỹ thuật UPSERT lũy kế bằng ON CONFLICT DO UPDATE.'
    },
    estimatedMinutes: 24,
    learn: {
      introduction: {
        en: 'Data Manipulation Language (DML) consists of statements that modify database records: INSERT (adding new rows), UPDATE (modifying existing rows), and DELETE (removing rows). Modern SQL also provides UPSERT (INSERT ... ON CONFLICT) for idempotent write operations.',
        vi: 'Ngôn ngữ thao tác dữ liệu (DML) bao gồm các câu lệnh sửa đổi bản ghi CSDL: INSERT (thêm dòng mới), UPDATE (sửa đổi dòng hiện có) và DELETE (xóa dòng). SQL hiện đại còn cung cấp UPSERT (INSERT ... ON CONFLICT) cho các thao tác ghi có tính lũy suy (idempotent).'
      },
      conceptExplanation: {
        en: '1) INSERT INTO table (cols) VALUES (...), (...): Supports multi-row atomic insertion. 2) UPDATE table SET col = val WHERE cond: Modifies matching rows; omitting WHERE mutates ALL rows in the table! 3) DELETE FROM table WHERE cond: Removes matching rows. 4) UPSERT (ON CONFLICT (key) DO UPDATE SET ...): Atomically attempts insertion, but if a unique key conflict occurs, it updates the existing record instead of throwing a duplicate key constraint violation.',
        vi: '1) INSERT INTO table (cols) VALUES (...), (...): Hỗ trợ chèn nhiều dòng nguyên tử. 2) UPDATE table SET col = val WHERE cond: Sửa các dòng khớp; nếu quên WHERE sẽ sửa TẤT CẢ các dòng trong bảng! 3) DELETE FROM table WHERE cond: Xóa các dòng khớp. 4) UPSERT (ON CONFLICT (key) DO UPDATE SET ...): Thử chèn một cách nguyên tử, nhưng nếu gặp xung đột khóa duy nhất (unique key), nó sẽ cập nhật bản ghi hiện có thay vì văng lỗi vi phạm ràng buộc.'
      },
      syntax: `-- 1. Multi-Row INSERT:
INSERT INTO students (name, course, score, email, city)
VALUES 
  ('David', 'SQL', 88, 'david@example.com', 'Da Nang'),
  ('Eva', 'Python', 92, 'eva@example.com', 'Hanoi');

-- 2. Guarded UPDATE:
UPDATE employees
SET salary = salary * 1.10, bonus = COALESCE(bonus, 0) + 500
WHERE dept_id = 1 AND salary < 70000;

-- 3. Guarded DELETE:
DELETE FROM orders
WHERE amount < 10.0 AND order_date < '2023-01-01';

-- 4. Idempotent UPSERT (PostgreSQL & SQLite 3.24+):
INSERT INTO students (id, name, course, score, email, city)
VALUES (1, 'Alice Updated', 'SQL', 98, 'alice@example.com', 'Hanoi')
ON CONFLICT(id) DO UPDATE SET
  score = excluded.score,
  name = excluded.name;`,
      examples: [
        {
          title: {
            en: '1. Safe Conditional UPDATE with Arithmetic & WHERE Guard',
            vi: '1. Cập Nhật Dữ Liệu An Toàn Có Điều Kiện Kèm Rào Chắn WHERE'
          },
          code: `UPDATE employees
SET salary = ROUND(salary * 1.08, 2),
    bonus = COALESCE(bonus, 0.0) + 1000.0
WHERE dept_id = (SELECT dept_id FROM employees WHERE name = 'Alice' LIMIT 1)
  AND salary < 80000.0;`,
          language: 'sql',
          explanation: {
            en: 'Gives an 8% raise and $1,000 bonus only to qualifying employees in Alice\'s department earning under $80,000.',
            vi: 'Tăng lương 8% và thưởng thêm 1.000 USD chỉ cho các nhân viên đủ điều kiện cùng phòng ban với Alice có mức lương dưới 80.000 USD.'
          }
        },
        {
          title: {
            en: '2. Idempotent UPSERT with excluded Pseudo-Table',
            vi: '2. Kỹ Thuật UPSERT Lũy Kế Với Bảng Ảo excluded'
          },
          code: `INSERT INTO students (id, name, course, score, email, city)
VALUES (1, 'Alice', 'SQL Pro', 99, 'alice@example.com', 'Hanoi')
ON CONFLICT(id) DO UPDATE SET
  course = excluded.course,
  score = MAX(students.score, excluded.score);`,
          language: 'sql',
          explanation: {
            en: 'If student ID 1 exists, updates the course and updates score to the highest of the existing or incoming value.',
            vi: 'Nếu học viên ID 1 đã tồn tại, cập nhật khóa học và nâng điểm số lên mức cao hơn giữa điểm hiện tại và điểm mới nạp.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Accidentally executing UPDATE or DELETE without a WHERE clause',
            vi: 'Vô tình chạy UPDATE hoặc DELETE mà không có mệnh đề WHERE'
          },
          correction: {
            en: 'In SQL, UPDATE or DELETE without a WHERE clause operates unconditionally on every single row in the table, destroying production data.',
            vi: 'Trong SQL, lệnh UPDATE hoặc DELETE thiếu mệnh đề WHERE sẽ tác động lên toàn bộ 100% số dòng trong bảng, phá hủy toàn bộ dữ liệu.'
          },
          code: `-- CATASTROPHIC ERROR (Wipes entire table):
-- DELETE FROM employees;
-- SAFE (Precise row targeting):
DELETE FROM employees WHERE id = 105;`
        },
        {
          mistake: {
            en: 'Using ON CONFLICT without a UNIQUE or PRIMARY KEY constraint',
            vi: 'Dùng ON CONFLICT trên cột không có ràng buộc UNIQUE hoặc PRIMARY KEY'
          },
          correction: {
            en: 'ON CONFLICT requires the target column(s) to be backed by a UNIQUE or PRIMARY KEY constraint so the database can detect conflicts deterministically.',
            vi: 'ON CONFLICT bắt buộc cột đích phải có ràng buộc UNIQUE hoặc PRIMARY KEY để CSDL có thể phát hiện xung đột một cách chắc chắn.'
          },
          code: `-- ON CONFLICT target must match a unique index/constraint:
INSERT INTO users (email, name) VALUES ('test@a.com', 'A')
ON CONFLICT(email) DO UPDATE SET name = excluded.name;`
        }
      ],
      tips: [
        {
          en: 'Use "ON CONFLICT DO NOTHING" to silently ignore duplicate insertions without raising exceptions.',
          vi: 'Dùng "ON CONFLICT DO NOTHING" để âm thầm bỏ qua các bản ghi chèn trùng lặp mà không văng lỗi ngoại lệ.'
        },
        {
          en: 'PostgreSQL and SQLite support the "RETURNING *" clause on INSERT, UPDATE, and DELETE to return the mutated rows immediately.',
          vi: 'PostgreSQL và SQLite hỗ trợ mệnh đề "RETURNING *" trên INSERT, UPDATE, DELETE để trả về các dòng vừa được sửa đổi ngay lập tức.'
        }
      ],
      practiceStarterCode: `-- Insert new student record
INSERT INTO students (name, course, score, email, city)
VALUES ('Zoe', 'SQL', 95, 'zoe@example.com', 'Hue');`,
      practice: {
        task: {
          en: 'Write an UPDATE query to increase the salary of all employees in department 1 by 500: UPDATE employees SET salary = salary + 500 WHERE dept_id = 1;',
          vi: 'Viết truy vấn UPDATE để tăng lương cho tất cả nhân viên ở phòng ban 1 thêm 500: UPDATE employees SET salary = salary + 500 WHERE dept_id = 1;'
        },
        starterCode: `-- Update salaries for dept_id = 1
UPDATE employees
SET salary = 
WHERE ;`,
        solutionCode: `UPDATE employees SET salary = salary + 500 WHERE dept_id = 1;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_16_1',
        type: 'fix_code',
        title: { en: 'Fix Dangerous Unbounded UPDATE', vi: 'Sửa Lỗi Câu Lệnh UPDATE Nguy Hiểm Thiếu WHERE' },
        instruction: {
          en: 'Add "WHERE name = \'Bob\'" to the UPDATE statement to prevent overwriting all students.',
          vi: 'Thêm "WHERE name = \'Bob\'" vào câu lệnh UPDATE để tránh ghi đè toàn bộ học viên.'
        },
        starterCode: "UPDATE students SET score = 95;",
        solutionCode: "UPDATE students SET score = 95 WHERE name = 'Bob';",
        hint: { en: "Add WHERE name = 'Bob' at the end.", vi: "Thêm WHERE name = 'Bob' vào cuối." },
        explanation: {
          en: 'A WHERE guard ensures the update only targets the intended row.',
          vi: 'Rào chắn WHERE đảm bảo việc cập nhật chỉ tác động đúng dòng dự kiến.'
        }
      },
      {
        id: 'sql_ex_16_2',
        type: 'complete_code',
        title: { en: 'Complete ON CONFLICT DO UPDATE Syntax', vi: 'Hoàn Thiện Cú Pháp ON CONFLICT DO UPDATE' },
        instruction: {
          en: 'Complete the UPSERT conflict action: "ON CONFLICT(id) DO UPDATE SET score = excluded.score;".',
          vi: 'Hoàn thiện hành động xung đột UPSERT: "ON CONFLICT(id) DO UPDATE SET score = excluded.score;".'
        },
        starterCode: "INSERT INTO students (id, name, course, score, email, city) VALUES (1, 'Alice', 'SQL', 99, 'alice@example.com', 'Hanoi') ON CONFLICT(id) DO UPDATE SET score = ;",
        solutionCode: "INSERT INTO students (id, name, course, score, email, city) VALUES (1, 'Alice', 'SQL', 99, 'alice@example.com', 'Hanoi') ON CONFLICT(id) DO UPDATE SET score = excluded.score;",
        hint: { en: 'Add "excluded.score".', vi: 'Thêm "excluded.score".' },
        explanation: {
          en: 'The excluded pseudo-table holds the proposed values from the rejected INSERT statement.',
          vi: 'Bảng ảo excluded lưu giữ các giá trị dự kiến nạp từ câu lệnh INSERT bị từ chối.'
        }
      },
      {
        id: 'sql_ex_16_3',
        type: 'write_code',
        title: { en: 'Delete Low Value Stale Orders', vi: 'Xóa Đơn Hàng Cũ Giá Trị Thấp' },
        instruction: {
          en: 'Write a query to delete all orders where amount < 30.0: DELETE FROM orders WHERE amount < 30.0;',
          vi: 'Viết truy vấn xóa tất cả các đơn hàng có amount < 30.0: DELETE FROM orders WHERE amount < 30.0;'
        },
        starterCode: '-- Delete orders under 30.0\n',
        solutionCode: 'DELETE FROM orders WHERE amount < 30.0;',
        hint: { en: 'DELETE FROM orders WHERE amount < 30.0;', vi: 'DELETE FROM orders WHERE amount < 30.0;' },
        explanation: {
          en: 'DELETE removes matching rows safely based on the filter predicate.',
          vi: 'DELETE xóa các dòng khớp một cách an toàn dựa trên vị từ lọc.'
        }
      },
      {
        id: 'sql_ex_16_4',
        type: 'modify_example',
        title: { en: 'Multi-Column UPDATE with COALESCE', vi: 'Cập Nhật Đa Cột Kết Hợp COALESCE' },
        instruction: {
          en: 'Modify the UPDATE statement to also set city = \'Da Nang\' alongside score = 90 for student with id = 2.',
          vi: 'Sửa câu lệnh UPDATE để thiết lập cả city = \'Da Nang\' cùng với score = 90 cho học viên có id = 2.'
        },
        starterCode: "UPDATE students SET score = 90 WHERE id = 2;",
        solutionCode: "UPDATE students SET score = 90, city = 'Da Nang' WHERE id = 2;",
        hint: { en: "Set score = 90, city = 'Da Nang'.", vi: "Gán score = 90, city = 'Da Nang'." },
        explanation: {
          en: 'Multiple columns can be updated simultaneously separated by commas in the SET clause.',
          vi: 'Nhiều cột có thể được cập nhật đồng thời bằng cách phân tách bằng dấu phẩy trong mệnh đề SET.'
        }
      },
      {
        id: 'sql_ex_16_5',
        type: 'predict_output',
        title: { en: 'Predict Result of ON CONFLICT DO NOTHING', vi: 'Dự Đoán Kết Quả Của ON CONFLICT DO NOTHING' },
        instruction: {
          en: 'When executing "INSERT INTO users (id, name) VALUES (1, \'New\') ON CONFLICT(id) DO NOTHING;" where ID 1 already exists, what happens?',
          vi: 'Khi thực thi "INSERT INTO users (id, name) VALUES (1, \'New\') ON CONFLICT(id) DO NOTHING;" khi ID 1 đã tồn tại, điều gì sẽ xảy ra?'
        },
        starterCode: '-- Predict DO NOTHING behavior\n',
        solutionCode: "SELECT 'No error thrown, table remains unchanged' AS result;",
        options: [
          'The insertion is silently skipped without throwing a duplicate key error',
          'The existing row is deleted',
          'The ID is changed to 2',
          'The database crashes'
        ],
        correctOptionIndex: 0,
        hint: { en: 'DO NOTHING suppresses uniqueness errors and skips the insert.', vi: 'DO NOTHING triệt tiêu lỗi trùng lặp và bỏ qua lệnh chèn.' },
        explanation: {
          en: 'DO NOTHING ensures idempotency by bypassing duplicate key violations gracefully.',
          vi: 'DO NOTHING đảm bảo tính lũy suy bằng cách bỏ qua vi phạm khóa trùng lặp một cách êm đẹp.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_16',
      title: { en: 'Idempotent Student Catalog Upsert & Bonus Redistribution', vi: 'Upsert Danh Mục Học Viên & Tái Phân Phối Thưởng Nhân Sự' },
      description: {
        en: 'Execute an idempotent UPSERT statement on the students table that inserts a student with id = 1, name = \'Alice\', course = \'SQL Mastery\', score = 95, email = \'alice@example.com\', and city = \'Hanoi\'. If a conflict on id occurs, UPDATE the existing record to set course = excluded.course, score = MAX(students.score, excluded.score), and email = excluded.email.',
        vi: 'Thực thi câu lệnh UPSERT lũy suy trên bảng students để chèn học viên có id = 1, name = \'Alice\', course = \'SQL Mastery\', score = 95, email = \'alice@example.com\' và city = \'Hanoi\'. Nếu xảy ra xung đột trên id, hãy UPDATE bản ghi hiện có để gán course = excluded.course, score = MAX(students.score, excluded.score) và email = excluded.email.'
      },
      requirements: [
        { en: "INSERT INTO students (id, name, course, score, email, city) VALUES (1, 'Alice', 'SQL Mastery', 95, 'alice@example.com', 'Hanoi')", vi: "INSERT INTO students (id, name, course, score, email, city) VALUES (1, 'Alice', 'SQL Mastery', 95, 'alice@example.com', 'Hanoi')" },
        { en: "ON CONFLICT(id) DO UPDATE SET course = excluded.course, score = MAX(students.score, excluded.score), email = excluded.email", vi: "ON CONFLICT(id) DO UPDATE SET course = excluded.course, score = MAX(students.score, excluded.score), email = excluded.email" }
      ],
      starterCode: `-- Write your idempotent UPSERT statement below
INSERT INTO students (id, name, course, score, email, city)
VALUES (1, 'Alice', 'SQL Mastery', 95, 'alice@example.com', 'Hanoi')
ON CONFLICT(id) DO UPDATE SET
  course = excluded.course,
  score = MAX(students.score, excluded.score),
  email = excluded.email;`,
      solutionCode: `INSERT INTO students (id, name, course, score, email, city) VALUES (1, 'Alice', 'SQL Mastery', 95, 'alice@example.com', 'Hanoi') ON CONFLICT(id) DO UPDATE SET course = excluded.course, score = MAX(students.score, excluded.score), email = excluded.email;`,
      hints: [{ en: 'Use excluded pseudo-table in the DO UPDATE SET clause.', vi: 'Dùng bảng ảo excluded trong mệnh đề DO UPDATE SET.' }],
      solutionExplanation: {
        en: 'Performs a robust, production-grade idempotent upsert with conditional scalar max assignment.',
        vi: 'Thực thi lệnh upsert lũy suy chuẩn sản xuất kết hợp điều kiện lấy điểm tối đa scalar.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_16_v1',
        title: { en: 'Idempotent Student Catalog Upsert & Bonus Redistribution', vi: 'Upsert Danh Mục Học Viên & Tái Phân Phối Thưởng Nhân Sự' },
        description: {
          en: 'Execute idempotent UPSERT on students (id=1, name=\'Alice\', course=\'SQL Mastery\', score=95, email=\'alice@example.com\', city=\'Hanoi\') with conflict resolution on id.',
          vi: 'Thực thi UPSERT trên students (id=1, name=\'Alice\', course=\'SQL Mastery\', score=95, email=\'alice@example.com\', city=\'Hanoi\') xử lý xung đột trên id.'
        },
        requirements: [{ en: 'ON CONFLICT(id) DO UPDATE...', vi: 'ON CONFLICT(id) DO UPDATE...' }],
        starterCode: `INSERT INTO students (id, name, course, score, email, city) VALUES (1, 'Alice', 'SQL Mastery', 95, 'alice@example.com', 'Hanoi');`,
        solutionCode: `INSERT INTO students (id, name, course, score, email, city) VALUES (1, 'Alice', 'SQL Mastery', 95, 'alice@example.com', 'Hanoi') ON CONFLICT(id) DO UPDATE SET course = excluded.course, score = MAX(students.score, excluded.score), email = excluded.email;`,
        hints: [{ en: 'Add ON CONFLICT(id) DO UPDATE SET clause.', vi: 'Thêm mệnh đề ON CONFLICT(id) DO UPDATE SET.' }],
        solutionExplanation: { en: 'Idempotent UPSERT with conditional update.', vi: 'UPSERT lũy suy kèm cập nhật có điều kiện.' }
      },
      {
        id: 'sql_ch_16_v2',
        title: { en: 'Safe Annual Employee Compensation Adjustment', vi: 'Điều Chỉnh Lương Thưởng Nhân Sự Thường Niên An Toàn' },
        description: {
          en: 'UPDATE employees SET salary = ROUND(salary * 1.05, 2), bonus = COALESCE(bonus, 0.0) + 200.0 WHERE dept_id = 2;',
          vi: 'UPDATE employees SET salary = ROUND(salary * 1.05, 2), bonus = COALESCE(bonus, 0.0) + 200.0 WHERE dept_id = 2;'
        },
        requirements: [
          { en: 'SET salary = ROUND(salary * 1.05, 2), bonus = COALESCE(bonus, 0.0) + 200.0', vi: 'SET salary = ROUND(salary * 1.05, 2), bonus = COALESCE(bonus, 0.0) + 200.0' },
          { en: 'WHERE dept_id = 2', vi: 'WHERE dept_id = 2' }
        ],
        starterCode: `UPDATE employees SET salary = salary * 1.05 WHERE dept_id = 2;`,
        solutionCode: `UPDATE employees SET salary = ROUND(salary * 1.05, 2), bonus = COALESCE(bonus, 0.0) + 200.0 WHERE dept_id = 2;`,
        hints: [{ en: 'Include both salary and bonus in SET clause.', vi: 'Bao gồm cả salary và bonus trong mệnh đề SET.' }],
        solutionExplanation: { en: 'Applies multi-column arithmetic update with NULL safety.', vi: 'Áp dụng cập nhật số học đa cột đảm bảo an toàn với NULL.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_16_1',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'easy',
        question: { en: 'What does "DML" stand for in SQL database terminology?', vi: '"DML" viết tắt của cụm từ nào trong thuật ngữ CSDL SQL?' },
        options: [
          { en: 'Data Manipulation Language (INSERT, UPDATE, DELETE)', vi: 'Data Manipulation Language - Ngôn ngữ thao tác dữ liệu (INSERT, UPDATE, DELETE)' },
          { en: 'Data Migration Layer', vi: 'Data Migration Layer' },
          { en: 'Dynamic Memory Lookup', vi: 'Dynamic Memory Lookup' },
          { en: 'Database Model Layout', vi: 'Database Model Layout' }
        ],
        correctAnswers: [0],
        explanation: { en: 'DML includes the CRUD data modification statements.', vi: 'DML bao gồm các câu lệnh sửa đổi dữ liệu CRUD.' }
      },
      {
        id: 'sql_q_16_2',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'easy',
        question: { en: 'What happens if you run "UPDATE employees SET salary = 50000;" without a WHERE clause?', vi: 'Điều gì xảy ra nếu bạn chạy lệnh "UPDATE employees SET salary = 50000;" mà không có mệnh đề WHERE?' },
        options: [
          { en: 'Every single employee in the entire table will have their salary overwritten to 50000', vi: 'Tất cả 100% nhân viên trong toàn bộ bảng sẽ bị ghi đè mức lương thành 50000' },
          { en: 'Only the first employee is updated', vi: 'Chỉ nhân viên đầu tiên được cập nhật' },
          { en: 'The database rejects the query with a syntax error', vi: 'CSDL từ chối truy vấn và báo lỗi cú pháp' },
          { en: 'Nothing happens', vi: 'Không có gì xảy ra' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Without a WHERE predicate, UPDATE mutates all rows unconditionally.', vi: 'Nếu thiếu vị từ WHERE, UPDATE sẽ tác động lên toàn bộ các dòng vô điều kiện.' }
      },
      {
        id: 'sql_q_16_3',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'medium',
        question: { en: 'What is the purpose of the "excluded" pseudo-table in PostgreSQL/SQLite "ON CONFLICT DO UPDATE"?', vi: 'Mục đích của bảng ảo "excluded" trong cú pháp "ON CONFLICT DO UPDATE" là gì?' },
        options: [
          { en: 'It references the new column values that were passed into the conflicting INSERT statement', vi: 'Nó tham chiếu đến các giá trị cột mới được truyền vào trong câu lệnh INSERT bị xung đột' },
          { en: 'It stores deleted records', vi: 'Nó lưu các bản ghi đã bị xóa' },
          { en: 'It tracks excluded database users', vi: 'Nó theo dõi các người dùng bị loại trừ' },
          { en: 'It is a temporary table created on the hard drive', vi: 'Nó là bảng tạm tạo trên đĩa cứng' }
        ],
        correctAnswers: [0],
        explanation: { en: '`excluded.col` contains the incoming candidate value that caused the uniqueness conflict.', vi: '`excluded.col` chứa giá trị ứng viên mới nạp vào gây ra xung đột trùng lặp khóa.' }
      },
      {
        id: 'sql_q_16_4',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'easy',
        question: { en: 'What does "INSERT INTO table ... ON CONFLICT DO NOTHING" do when a unique constraint violation occurs?', vi: 'Câu lệnh "INSERT INTO table ... ON CONFLICT DO NOTHING" làm gì khi xảy ra vi phạm ràng buộc duy nhất?' },
        options: [
          { en: 'It silently skips inserting the conflicting row without throwing an error exception', vi: 'Nó âm thầm bỏ qua việc chèn dòng bị xung đột mà không ném ra ngoại lệ lỗi' },
          { en: 'It deletes the existing record', vi: 'Nó xóa bản ghi hiện có' },
          { en: 'It rolls back the entire database server', vi: 'Nó rollback toàn bộ máy chủ CSDL' },
          { en: 'It converts the conflict into a NULL value', vi: 'Nó chuyển đổi xung đột thành giá trị NULL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'DO NOTHING guarantees idempotent ingestion by skipping duplicates silently.', vi: 'DO NOTHING đảm bảo việc nạp dữ liệu lũy suy bằng cách âm thầm bỏ qua các bản ghi trùng.' }
      },
      {
        id: 'sql_q_16_5',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'medium',
        question: { en: 'What does the "RETURNING *" clause do when appended to an INSERT, UPDATE, or DELETE statement in PostgreSQL/SQLite?', vi: 'Mệnh đề "RETURNING *" làm nhiệm vụ gì khi gắn vào câu lệnh INSERT, UPDATE hoặc DELETE trong PostgreSQL/SQLite?' },
        options: [
          { en: 'It returns the modified/inserted/deleted rows as a standard result set immediately to the client', vi: 'Nó trả về các dòng vừa được sửa đổi/chèn/xóa dưới dạng tập kết quả chuẩn ngay lập tức cho client' },
          { en: 'It undoes the transaction', vi: 'Nó hoàn tác giao dịch' },
          { en: 'It prints debugging logs to the terminal', vi: 'Nó in log gỡ lỗi ra terminal' },
          { en: 'It creates a backup table copy', vi: 'Nó tạo một bản sao lưu bảng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'RETURNING yields the mutated records directly, eliminating the need for a follow-up SELECT query.', vi: 'RETURNING trả về trực tiếp các bản ghi vừa biến đổi, loại bỏ nhu cầu phải chạy thêm một câu SELECT phụ.' }
      },
      {
        id: 'sql_q_16_6',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'hard',
        question: { en: 'What is the key difference between DELETE FROM table and TRUNCATE TABLE in relational databases?', vi: 'Sự khác biệt then chốt giữa DELETE FROM table và TRUNCATE TABLE trong các hệ CSDL quan hệ là gì?' },
        options: [
          { en: 'DELETE is a DML statement that removes rows one-by-one logging individual row deletions and firing triggers; TRUNCATE is a DDL statement that deallocates data pages instantly, is faster, and resets auto-increment sequences', vi: 'DELETE là câu lệnh DML xóa từng dòng, ghi log từng dòng và kích hoạt trigger; TRUNCATE là câu lệnh DDL giải phóng trực tiếp các trang dữ liệu, nhanh hơn và đặt lại chuỗi tự tăng' },
          { en: 'TRUNCATE only deletes columns, not rows', vi: 'TRUNCATE chỉ xóa cột chứ không xóa dòng' },
          { en: 'DELETE can never be rolled back', vi: 'DELETE không bao giờ rollback được' },
          { en: 'They are exact synonyms', vi: 'Chúng hoàn toàn đồng nghĩa' }
        ],
        correctAnswers: [0],
        explanation: { en: 'TRUNCATE deallocates storage pages at the DDL metadata level, while DELETE scans and logs row-by-row.', vi: 'TRUNCATE giải phóng các trang lưu trữ ở tầng metadata DDL, trong khi DELETE quét và ghi log từng dòng.' }
      },
      {
        id: 'sql_q_16_7',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'medium',
        question: { en: 'How can you insert data into a table directly from another table\'s query results?', vi: 'Làm thế nào để chèn dữ liệu vào một bảng trực tiếp từ kết quả truy vấn của bảng khác?' },
        options: [
          { en: 'INSERT INTO target_table (cols) SELECT cols FROM source_table WHERE cond;', vi: 'INSERT INTO target_table (cols) SELECT cols FROM source_table WHERE cond;' },
          { en: 'INSERT INTO target_table VALUES (SELECT * FROM source_table);', vi: 'INSERT INTO target_table VALUES (SELECT * FROM source_table);' },
          { en: 'COPY target_table FROM source_table;', vi: 'COPY target_table FROM source_table;' },
          { en: 'MERGE target_table WITH source_table;', vi: 'MERGE target_table WITH source_table;' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The `INSERT INTO ... SELECT ...` construct populates tables from query results directly.', vi: 'Cú pháp `INSERT INTO ... SELECT ...` nạp dữ liệu vào bảng trực tiếp từ kết quả truy vấn.' }
      },
      {
        id: 'sql_q_16_8',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'hard',
        question: { en: 'In MySQL, what is the equivalent dialect feature to "ON CONFLICT DO UPDATE"?', vi: 'Trong MySQL, tính năng tương đương với "ON CONFLICT DO UPDATE" là gì?' },
        options: [
          { en: 'ON DUPLICATE KEY UPDATE col = VALUES(col)', vi: 'ON DUPLICATE KEY UPDATE col = VALUES(col)' },
          { en: 'UPSERT INTO table', vi: 'UPSERT INTO table' },
          { en: 'MERGE WHEN MATCHED', vi: 'MERGE WHEN MATCHED' },
          { en: 'TRY INSERT CATCH UPDATE', vi: 'TRY INSERT CATCH UPDATE' }
        ],
        correctAnswers: [0],
        explanation: { en: 'MySQL uses the proprietary `INSERT ... ON DUPLICATE KEY UPDATE` syntax.', vi: 'MySQL sử dụng cú pháp đặc thù `INSERT ... ON DUPLICATE KEY UPDATE`.' }
      },
      {
        id: 'sql_q_16_9',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'easy',
        question: { en: 'Can multiple rows be inserted into a table in a single atomic INSERT statement?', vi: 'Nhiều dòng có thể được chèn vào một bảng trong một câu lệnh INSERT nguyên tử duy nhất không?' },
        options: [
          { en: 'Yes, by providing comma-separated value tuples: VALUES (row1), (row2), (row3)', vi: 'Có, bằng cách cung cấp các bộ giá trị phân tách bằng dấu phẩy: VALUES (dong1), (dong2), (dong3)' },
          { en: 'No, SQL strictly limits INSERT to 1 row per statement', vi: 'Không, SQL giới hạn nghiêm ngặt mỗi lệnh INSERT chỉ được 1 dòng' },
          { en: 'Only in Oracle', vi: 'Chỉ trong Oracle' },
          { en: 'Only if all columns are strings', vi: 'Chỉ khi tất cả các cột là kiểu chuỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Multi-row value lists are standard in ANSI SQL and highly optimized.', vi: 'Danh sách giá trị đa dòng là chuẩn trong ANSI SQL và có hiệu năng rất cao.' }
      },
      {
        id: 'sql_q_16_10',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'medium',
        question: { en: 'What happens when an UPDATE statement includes "SET salary = salary + 100" for a row where salary is NULL?', vi: 'Điều gì xảy ra khi câu lệnh UPDATE có "SET salary = salary + 100" trên một dòng có salary đang là NULL?' },
        options: [
          { en: 'salary remains NULL because NULL + 100 evaluates to NULL (use COALESCE(salary, 0) + 100 instead)', vi: 'salary vẫn là NULL vì NULL + 100 trả về NULL (hãy dùng COALESCE(salary, 0) + 100 thay thế)' },
          { en: 'salary becomes 100', vi: 'salary trở thành 100' },
          { en: 'An error is thrown', vi: 'Báo lỗi' },
          { en: 'salary becomes 0', vi: 'salary trở thành 0' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Any arithmetic operation involving NULL yields NULL under Three-Valued Logic.', vi: 'Mọi phép toán số học với NULL đều cho kết quả là NULL trong logic 3 giá trị.' }
      },
      {
        id: 'sql_q_16_11',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'hard',
        question: { en: 'What is the ANSI standard SQL statement that merges INSERT, UPDATE, and DELETE operations based on join conditions?', vi: 'Câu lệnh chuẩn ANSI SQL nào kết hợp cả các thao tác INSERT, UPDATE và DELETE dựa trên điều kiện join?' },
        options: [
          { en: 'MERGE INTO target USING source ON (condition) WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...', vi: 'MERGE INTO target USING source ON (condition) WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...' },
          { en: 'COMBINE INTO target WITH source', vi: 'COMBINE INTO target WITH source' },
          { en: 'UNION DML target WITH source', vi: 'UNION DML target WITH source' },
          { en: 'PATCH INTO target FROM source', vi: 'PATCH INTO target FROM source' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The MERGE statement (SQL:2003) standardizes conditional multi-action mutations.', vi: 'Câu lệnh MERGE (chuẩn SQL:2003) chuẩn hóa các thao tác sửa đổi dữ liệu đa hành động có điều kiện.' }
      },
      {
        id: 'sql_q_16_12',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'easy',
        question: { en: 'Which SQL keyword is used to specify which table rows should be modified in an UPDATE statement?', vi: 'Từ khóa SQL nào được dùng để chỉ định những dòng nào trong bảng cần được sửa đổi trong câu lệnh UPDATE?' },
        options: [
          { en: 'WHERE', vi: 'WHERE' },
          { en: 'HAVING', vi: 'HAVING' },
          { en: 'FILTER', vi: 'FILTER' },
          { en: 'MATCH', vi: 'MATCH' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The WHERE clause restricts the target rows of the UPDATE operation.', vi: 'Mệnh đề WHERE giới hạn các dòng mục tiêu của thao tác UPDATE.' }
      },
      {
        id: 'sql_q_16_13',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'medium',
        question: { en: 'Can you use a subquery inside the SET clause of an UPDATE statement to pull values from another table?', vi: 'Bạn có thể dùng một subquery bên trong mệnh đề SET của câu lệnh UPDATE để lấy giá trị từ bảng khác không?' },
        options: [
          { en: 'Yes, correlated scalar subqueries can dynamically compute values for the SET clause', vi: 'Có, các subquery vô hướng tương quan có thể tính toán động các giá trị cho mệnh đề SET' },
          { en: 'No, only static literal values are permitted in SET', vi: 'Không, chỉ cho phép các giá trị hằng số tĩnh trong SET' },
          { en: 'Only for integer columns', vi: 'Chỉ dành cho các cột kiểu số nguyên' },
          { en: 'Only in Microsoft Access', vi: 'Chỉ trong Microsoft Access' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Scalar subqueries are fully valid in UPDATE SET assignments.', vi: 'Subquery vô hướng hoàn toàn hợp lệ trong các phép gán của UPDATE SET.' }
      },
      {
        id: 'sql_q_16_14',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'hard',
        question: { en: 'Why is an atomic UPSERT statement superior to writing separate "SELECT check then INSERT / UPDATE" queries in application code?', vi: 'Tại sao câu lệnh UPSERT nguyên tử lại vượt trội hơn hẳn việc viết 2 câu lệnh "SELECT kiểm tra rồi mới INSERT / UPDATE" trong code ứng dụng?' },
        options: [
          { en: 'Because separate application queries suffer from race conditions (Time-of-Check to Time-of-Use) in concurrent multi-threaded environments, whereas UPSERT executes atomically with internal row locking', vi: 'Vì việc tách thành các truy vấn riêng trong ứng dụng dễ bị xung đột tranh chấp (race condition / TOCTOU) trong môi trường đa luồng đồng thời, trong khi UPSERT thực thi nguyên tử với khóa dòng nội bộ' },
          { en: 'Because UPSERT disables logging completely', vi: 'Vì UPSERT tắt hoàn toàn việc ghi log' },
          { en: 'Because SELECT cannot find primary keys', vi: 'Vì SELECT không thể tìm khóa chính' },
          { en: 'Because application code cannot run UPDATE', vi: 'Vì code ứng dụng không thể chạy UPDATE' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Atomic UPSERT eliminates race conditions between checking existence and inserting.', vi: 'UPSERT nguyên tử loại bỏ hoàn toàn hiện tượng race condition giữa bước kiểm tra tồn tại và chèn dữ liệu.' }
      },
      {
        id: 'sql_q_16_15',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'easy',
        question: { en: 'What happens if an INSERT statement omits a column that has a DEFAULT constraint defined in the schema?', vi: 'Điều gì xảy ra nếu câu lệnh INSERT bỏ qua một cột đã được định nghĩa ràng buộc DEFAULT trong lược đồ bảng?' },
        options: [
          { en: 'The database engine automatically populates that column with its configured default value', vi: 'Hệ quản trị CSDL tự động điền giá trị mặc định đã được cấu hình cho cột đó' },
          { en: 'The insert fails with an error', vi: 'Lệnh chèn thất bại và báo lỗi' },
          { en: 'The column is set to 0', vi: 'Cột được gán bằng 0' },
          { en: 'The table is locked', vi: 'Bảng bị khóa' }
        ],
        correctAnswers: [0],
        explanation: { en: 'DEFAULT constraints supply automatic fallback values when omitted from INSERT lists.', vi: 'Ràng buộc DEFAULT tự động cung cấp giá trị mặc định khi cột bị bỏ qua trong danh sách INSERT.' }
      },
      {
        id: 'sql_q_16_16',
        type: 'single_choice',
        topicId: 'sql_dml_upsert',
        difficulty: 'medium',
        question: { en: 'How do you delete all rows from a table while keeping the table structure and column definitions intact?', vi: 'Làm thế nào để xóa toàn bộ các dòng khỏi một bảng trong khi vẫn giữ nguyên cấu trúc bảng và các định nghĩa cột?' },
        options: [
          { en: 'DELETE FROM table_name; (or TRUNCATE TABLE table_name;)', vi: 'DELETE FROM ten_bang; (hoặc TRUNCATE TABLE ten_bang;)' },
          { en: 'DROP TABLE table_name;', vi: 'DROP TABLE ten_bang;' },
          { en: 'ALTER TABLE table_name DROP ALL;', vi: 'ALTER TABLE ten_bang DROP ALL;' },
          { en: 'REMOVE table_name;', vi: 'REMOVE ten_bang;' }
        ],
        correctAnswers: [0],
        explanation: { en: 'DELETE without WHERE or TRUNCATE removes all row records while preserving the table schema.', vi: 'DELETE không có WHERE hoặc TRUNCATE sẽ xóa sạch toàn bộ bản ghi nhưng giữ nguyên lược đồ bảng.' }
      }
    ]
  },

  // LESSON 17: DDL, Constraints & Normalization (1NF–3NF, Keys, CHECK, Views)
  {
    id: 'sql_lesson_17',
    moduleId: 'sql_mod_4',
    levelId: 'advanced',
    courseId: 'sql',
    order: 17,
    topicId: 'sql_ddl_normalization',
    title: {
      en: 'DDL, Constraints & Normalization: 1NF–3NF, Keys, CHECK & Views',
      vi: 'DDL, Ràng Buộc & Chuẩn Hóa Dữ Liệu: 1NF–3NF, Khóa, CHECK & Views'
    },
    summary: {
      en: 'Master Data Definition Language (CREATE, ALTER, DROP), enforce data integrity with PRIMARY KEY, FOREIGN KEY, and CHECK constraints, apply normalization rules (1NF, 2NF, 3NF), and create reusable Views.',
      vi: 'Làm chủ Ngôn ngữ định nghĩa dữ liệu (CREATE, ALTER, DROP), thực thi toàn vẹn dữ liệu với PRIMARY KEY, FOREIGN KEY, CHECK, áp dụng các quy tắc chuẩn hóa (1NF, 2NF, 3NF) và tạo View tái sử dụng.'
    },
    estimatedMinutes: 25,
    learn: {
      introduction: {
        en: 'Data Definition Language (DDL) governs database schema structure. Robust schema design requires declarative constraints to enforce business invariants at the database level and database normalization to eliminate redundant anomalies.',
        vi: 'Ngôn ngữ định nghĩa dữ liệu (DDL) quản lý cấu trúc lược đồ CSDL. Thiết kế lược đồ chuẩn mực đòi hỏi các ràng buộc khai báo để thực thi quy tắc nghiệp vụ ở tầng CSDL và chuẩn hóa dữ liệu để triệt tiêu các bất thường dư thừa.'
      },
      conceptExplanation: {
        en: '1) Constraints: PRIMARY KEY (unique + NOT NULL), FOREIGN KEY (referential integrity with ON DELETE CASCADE/SET NULL), UNIQUE, NOT NULL, and CHECK (e.g. CHECK (score >= 0 AND score <= 100)). 2) Normalization: 1NF (atomic values, no repeating groups), 2NF (1NF + no partial dependency on composite primary keys), 3NF (2NF + no transitive dependencies; non-key attributes depend only on the primary key). 3) Views: Saved named SELECT queries that encapsulate complex logic without storing redundant physical data (CREATE VIEW name AS SELECT ...).',
        vi: '1) Ràng buộc: PRIMARY KEY (duy nhất + NOT NULL), FOREIGN KEY (toàn vẹn tham chiếu với ON DELETE CASCADE/SET NULL), UNIQUE, NOT NULL và CHECK (như CHECK (score >= 0 AND score <= 100)). 2) Chuẩn hóa: 1NF (giá trị nguyên tử, không lặp nhóm), 2NF (1NF + không phụ thuộc một phần vào khóa chính phức hợp), 3NF (2NF + không phụ thuộc bắc cầu; thuộc tính không khóa chỉ phụ thuộc duy nhất vào khóa chính). 3) View: Các câu truy vấn SELECT có tên được lưu lại giúp đóng gói logic phức tạp mà không tốn dung lượng lưu dữ liệu vật lý trùng thừa.'
      },
      syntax: `-- 1. DDL Table Creation with Constraints:
CREATE TABLE students_normalized (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  score REAL CHECK (score >= 0.0 AND score <= 100.0),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Foreign Key with Referential Actions:
CREATE TABLE student_enrollments (
  enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  course_code TEXT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students_normalized(student_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- 3. Creating a Reusable View:
CREATE VIEW v_active_students AS
SELECT student_id, full_name, email, score
FROM students_normalized
WHERE score >= 60.0;`,
      examples: [
        {
          title: {
            en: '1. Designing Normalized Tables with Constraints',
            vi: '1. Thiết Kế Các Bảng Đã Chuẩn Hóa Kèm Ràng Buộc'
          },
          code: `CREATE TABLE courses (
  course_id INTEGER PRIMARY KEY,
  course_name TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL
);

CREATE TABLE course_grades (
  student_name TEXT NOT NULL,
  course_id INTEGER NOT NULL,
  grade_score REAL CHECK (grade_score BETWEEN 0 AND 100),
  PRIMARY KEY (student_name, course_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);`,
          language: 'sql',
          explanation: {
            en: 'Splits courses into a normalized entity (3NF) and enforces composite primary key uniqueness and score validity.',
            vi: 'Tách khóa học thành thực thể chuẩn hóa (3NF), thực thi tính duy nhất của khóa chính phức hợp và tính hợp lệ của điểm số.'
          }
        },
        {
          title: {
            en: '2. Creating and Querying a Business Intelligence View',
            vi: '2. Tạo & Truy Vấn View Báo Cáo Thông Minh'
          },
          code: `CREATE VIEW v_department_summary AS
SELECT dept_id,
       COUNT(*) AS employee_count,
       ROUND(AVG(salary), 2) AS avg_salary,
       MAX(salary) AS top_salary
FROM employees
GROUP BY dept_id;

-- Query the view just like a regular table:
SELECT * FROM v_department_summary WHERE avg_salary >= 70000;`,
          language: 'sql',
          explanation: {
            en: 'Encapsulates complex group aggregation into an abstraction that can be queried like a virtual table.',
            vi: 'Đóng gói các phép gom nhóm phức tạp thành một tầng trừu tượng có thể truy vấn như một bảng ảo.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Violating 1NF by storing comma-separated lists in a single string column',
            vi: 'Vi phạm chuẩn 1NF khi lưu danh sách phân tách bằng dấu phẩy trong một cột chuỗi duy nhất'
          },
          correction: {
            en: '1NF mandates atomic (indivisible) scalar values. Storing "tag1,tag2,tag3" in a single column makes JOINs, indexing, and aggregate calculations inefficient and error-prone. Use a normalized bridge table instead.',
            vi: '1NF bắt buộc các giá trị phải mang tính nguyên tử (không thể phân chia). Lưu "tag1,tag2,tag3" trong 1 cột khiến việc JOIN, đánh chỉ mục và tính toán tổng hợp cực kỳ kém hiệu quả. Hãy dùng bảng trung gian chuẩn hóa.'
          },
          code: `-- BAD (Violates 1NF):
-- CREATE TABLE users (id INT, phone_numbers TEXT); -- e.g. '09123,09456'
-- GOOD (1NF Normalized):
CREATE TABLE user_phones (user_id INT, phone_number TEXT, PRIMARY KEY (user_id, phone_number));`
        },
        {
          mistake: {
            en: 'Transitive dependency violating 3NF (e.g. storing department_name in employees table)',
            vi: 'Phụ thuộc bắc cầu vi phạm chuẩn 3NF (ví dụ: lưu department_name trong bảng employees)'
          },
          correction: {
            en: 'In 3NF, non-key columns must depend ONLY on the primary key. If department_name depends on dept_id, updating a department name requires updating thousands of employee rows (update anomaly). Move departments into their own table.',
            vi: 'Trong 3NF, các cột không khóa CHỈ được phép phụ thuộc vào khóa chính. Nếu department_name phụ thuộc vào dept_id, khi đổi tên phòng ban sẽ phải sửa hàng nghìn dòng nhân viên. Hãy tách phòng ban ra bảng riêng.'
          },
          code: `-- Normalize into departments(dept_id, dept_name) and employees(emp_id, dept_id).`
        }
      ],
      tips: [
        {
          en: 'In SQLite, foreign key constraint enforcement is DISABLED by default for backwards compatibility; execute "PRAGMA foreign_keys = ON;" to enable it.',
          vi: 'Trong SQLite, việc thực thi ràng buộc khóa ngoại bị TẮT theo mặc định để tương thích ngược; hãy chạy "PRAGMA foreign_keys = ON;" để bật nó.'
        },
        {
          en: 'Views do not store physical copies of data by default; each query on a standard view executes the underlying SELECT statement on the fly.',
          vi: 'View tiêu chuẩn không lưu bản sao vật lý của dữ liệu; mỗi khi truy vấn view, CSDL sẽ thực thi câu SELECT gốc ngầm bên dưới.'
        }
      ],
      practiceStarterCode: `-- Create a normalized view for honors students
CREATE VIEW v_honors_students AS
SELECT student_id, name, course, score
FROM students
WHERE score >= 90.0;`,
      practice: {
        task: {
          en: 'Write a DDL statement to create a view named v_high_earners selecting name, dept_id, salary from employees WHERE salary >= 70000.0;: CREATE VIEW v_high_earners AS SELECT name, dept_id, salary FROM employees WHERE salary >= 70000.0;',
          vi: 'Viết câu lệnh DDL tạo một view tên v_high_earners chọn name, dept_id, salary từ employees CÓ salary >= 70000.0;: CREATE VIEW v_high_earners AS SELECT name, dept_id, salary FROM employees WHERE salary >= 70000.0;'
        },
        starterCode: `-- Create view for high earning employees
CREATE VIEW v_high_earners AS
SELECT name, dept_id, salary
FROM employees
WHERE ;`,
        solutionCode: `CREATE VIEW v_high_earners AS SELECT name, dept_id, salary FROM employees WHERE salary >= 70000.0;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_17_1',
        type: 'fix_code',
        title: { en: 'Fix Missing CHECK Constraint Parentheses', vi: 'Sửa Lỗi Thiếu Dấu Ngoặc Ràng Buộc CHECK' },
        instruction: {
          en: 'Enclose the CHECK condition "score >= 0 AND score <= 100" in parentheses.',
          vi: 'Bao bọc điều kiện CHECK "score >= 0 AND score <= 100" trong cặp dấu ngoặc đơn.'
        },
        starterCode: 'CREATE TABLE exams (id INT PRIMARY KEY, score REAL CHECK score >= 0 AND score <= 100);',
        solutionCode: 'CREATE TABLE exams (id INT PRIMARY KEY, score REAL CHECK (score >= 0 AND score <= 100));',
        hint: { en: 'Write CHECK (score >= 0 AND score <= 100).', vi: 'Viết CHECK (score >= 0 AND score <= 100).' },
        explanation: {
          en: 'CHECK constraints require their boolean predicates to be enclosed in parentheses.',
          vi: 'Ràng buộc CHECK bắt buộc các vị từ logic phải nằm trong cặp dấu ngoặc đơn.'
        }
      },
      {
        id: 'sql_ex_17_2',
        type: 'complete_code',
        title: { en: 'Complete FOREIGN KEY Constraint Definition', vi: 'Hoàn Thiện Định Nghĩa Ràng Buộc Khóa Ngoại' },
        instruction: {
          en: 'Complete the FOREIGN KEY clause: "FOREIGN KEY (dept_id) REFERENCES departments(dept_id)".',
          vi: 'Hoàn thiện mệnh đề FOREIGN KEY: "FOREIGN KEY (dept_id) REFERENCES departments(dept_id)".'
        },
        starterCode: 'CREATE TABLE staff (id INT PRIMARY KEY, name TEXT, dept_id INT, FOREIGN KEY (dept_id) REFERENCES (dept_id));',
        solutionCode: 'CREATE TABLE staff (id INT PRIMARY KEY, name TEXT, dept_id INT, FOREIGN KEY (dept_id) REFERENCES departments(dept_id));',
        hint: { en: 'Insert "departments" before "(dept_id)".', vi: 'Chèn "departments" vào trước "(dept_id)".' },
        explanation: {
          en: 'The REFERENCES clause must name the parent target table.',
          vi: 'Mệnh đề REFERENCES bắt buộc phải chỉ định rõ tên bảng cha.'
        }
      },
      {
        id: 'sql_ex_17_3',
        type: 'write_code',
        title: { en: 'Create Reusable View for Active Orders', vi: 'Tạo View Tái Sử Dụng Cho Đơn Hàng Hoạt Động' },
        instruction: {
          en: 'Write a DDL statement to create a view named v_active_orders selecting order_id, customer_name, amount from orders WHERE amount >= 50.0: CREATE VIEW v_active_orders AS SELECT order_id, customer_name, amount FROM orders WHERE amount >= 50.0;',
          vi: 'Viết câu lệnh DDL tạo view tên v_active_orders chọn order_id, customer_name, amount từ orders CÓ amount >= 50.0: CREATE VIEW v_active_orders AS SELECT order_id, customer_name, amount FROM orders WHERE amount >= 50.0;'
        },
        starterCode: '-- Create view v_active_orders\n',
        solutionCode: 'CREATE VIEW v_active_orders AS SELECT order_id, customer_name, amount FROM orders WHERE amount >= 50.0;',
        hint: { en: 'CREATE VIEW v_active_orders AS SELECT ...', vi: 'CREATE VIEW v_active_orders AS SELECT ...' },
        explanation: {
          en: 'Views encapsulate complex or repetitive filter logic cleanly.',
          vi: 'View đóng gói các bộ lọc logic phức tạp hoặc lặp lại một cách gọn gàng.'
        }
      },
      {
        id: 'sql_ex_17_4',
        type: 'modify_example',
        title: { en: 'Add ON DELETE CASCADE to Foreign Key', vi: 'Thêm ON DELETE CASCADE Vào Khóa Ngoại' },
        instruction: {
          en: 'Modify the foreign key declaration to append "ON DELETE CASCADE".',
          vi: 'Sửa khai báo khóa ngoại để bổ sung thêm "ON DELETE CASCADE".'
        },
        starterCode: 'CREATE TABLE items (id INT, order_id INT, FOREIGN KEY (order_id) REFERENCES orders(order_id));',
        solutionCode: 'CREATE TABLE items (id INT, order_id INT, FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE);',
        hint: { en: 'Append ON DELETE CASCADE at the end of the FOREIGN KEY clause.', vi: 'Thêm ON DELETE CASCADE vào cuối mệnh đề FOREIGN KEY.' },
        explanation: {
          en: 'ON DELETE CASCADE automatically removes child records when the parent is deleted.',
          vi: 'ON DELETE CASCADE tự động xóa các bản ghi con khi bản ghi cha bị xóa.'
        }
      },
      {
        id: 'sql_ex_17_5',
        type: 'predict_output',
        title: { en: 'Predict Result of CHECK Constraint Violation', vi: 'Dự Đoán Kết Quả Khi Vi Phạm Ràng Buộc CHECK' },
        instruction: {
          en: 'If a table has "score REAL CHECK (score >= 0)", what happens when inserting score = -5?',
          vi: 'Nếu một bảng có ràng buộc "score REAL CHECK (score >= 0)", điều gì xảy ra khi chèn score = -5?'
        },
        starterCode: '-- Predict CHECK constraint behavior\n',
        solutionCode: 'SELECT 0 AS insert_rejected;',
        options: [
          'The transaction is aborted and a CHECK constraint violation error is thrown',
          'The value is automatically converted to 0',
          'The value is stored as NULL',
          'The table is dropped'
        ],
        correctOptionIndex: 0,
        hint: { en: 'Databases enforce CHECK constraints strictly by rejecting violating writes.', vi: 'CSDL thực thi nghiêm ngặt ràng buộc CHECK bằng cách từ chối các thao tác ghi vi phạm.' },
        explanation: {
          en: 'Violating a CHECK constraint causes the engine to throw an integrity violation error.',
          vi: 'Vi phạm ràng buộc CHECK khiến hệ thống ném ra lỗi vi phạm toàn vẹn dữ liệu.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_17',
      title: { en: 'Enterprise Schema Design: Normalized Tables, Referential Integrity & Analytic Views', vi: 'Thiết Kế Lược Đồ Doanh Nghiệp: Chuẩn Hóa, Khóa Ngoại & View Phân Tích' },
      description: {
        en: 'Write the complete SQL DDL schema script that accomplishes two tasks: 1) Create a table named courses_catalog with columns: course_code TEXT PRIMARY KEY, course_title TEXT NOT NULL, credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6). 2) Create a view named v_top_students that selects s.name, s.course, s.score, s.city FROM students s WHERE s.score >= 85.0;',
        vi: 'Viết tập lệnh DDL SQL hoàn chỉnh thực hiện hai nhiệm vụ: 1) Tạo bảng tên courses_catalog gồm các cột: course_code TEXT PRIMARY KEY, course_title TEXT NOT NULL, credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6). 2) Tạo view tên v_top_students chọn s.name, s.course, s.score, s.city TỪ students s CÓ s.score >= 85.0;'
      },
      requirements: [
        { en: 'CREATE TABLE courses_catalog (course_code TEXT PRIMARY KEY, course_title TEXT NOT NULL, credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6))', vi: 'CREATE TABLE courses_catalog (course_code TEXT PRIMARY KEY, course_title TEXT NOT NULL, credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6))' },
        { en: 'CREATE VIEW v_top_students AS SELECT s.name, s.course, s.score, s.city FROM students s WHERE s.score >= 85.0', vi: 'CREATE VIEW v_top_students AS SELECT s.name, s.course, s.score, s.city FROM students s WHERE s.score >= 85.0' }
      ],
      starterCode: `-- Write your DDL schema definition below
CREATE TABLE courses_catalog (
  course_code TEXT PRIMARY KEY,
  course_title TEXT NOT NULL,
  credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6)
);

CREATE VIEW v_top_students AS
SELECT s.name, s.course, s.score, s.city
FROM students s
WHERE s.score >= 85.0;`,
      solutionCode: `CREATE TABLE courses_catalog (course_code TEXT PRIMARY KEY, course_title TEXT NOT NULL, credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6)); CREATE VIEW v_top_students AS SELECT s.name, s.course, s.score, s.city FROM students s WHERE s.score >= 85.0;`,
      hints: [{ en: 'Define both CREATE TABLE and CREATE VIEW statements.', vi: 'Định nghĩa cả câu lệnh CREATE TABLE và CREATE VIEW.' }],
      solutionExplanation: {
        en: 'Defines declarative schema constraints and an analytical view for modular encapsulation.',
        vi: 'Định nghĩa các ràng buộc lược đồ khai báo và view phân tích để đóng gói mô-đun.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_17_v1',
        title: { en: 'Enterprise Schema Design: Normalized Tables, Referential Integrity & Analytic Views', vi: 'Thiết Kế Lược Đồ Doanh Nghiệp: Chuẩn Hóa, Khóa Ngoại & View Phân Tích' },
        description: {
          en: 'Create table courses_catalog (course_code, course_title, credits) and view v_top_students.',
          vi: 'Tạo bảng courses_catalog (course_code, course_title, credits) và view v_top_students.'
        },
        requirements: [{ en: 'CREATE TABLE and CREATE VIEW statements', vi: 'Câu lệnh CREATE TABLE và CREATE VIEW' }],
        starterCode: `CREATE TABLE courses_catalog (...); CREATE VIEW v_top_students AS ...;`,
        solutionCode: `CREATE TABLE courses_catalog (course_code TEXT PRIMARY KEY, course_title TEXT NOT NULL, credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6)); CREATE VIEW v_top_students AS SELECT s.name, s.course, s.score, s.city FROM students s WHERE s.score >= 85.0;`,
        hints: [{ en: 'Write both DDL statements.', vi: 'Viết cả 2 câu lệnh DDL.' }],
        solutionExplanation: { en: 'Complete DDL specification.', vi: 'Đặc tả DDL hoàn chỉnh.' }
      },
      {
        id: 'sql_ch_17_v2',
        title: { en: 'Department Analytic View Definition', vi: 'Định Nghĩa View Phân Tích Phòng Ban' },
        description: {
          en: 'Create a view named v_dept_metrics selecting dept_id, COUNT(*) AS total_staff, ROUND(AVG(salary), 2) AS avg_sal FROM employees GROUP BY dept_id;',
          vi: 'Tạo view tên v_dept_metrics chọn dept_id, COUNT(*) AS total_staff, ROUND(AVG(salary), 2) AS avg_sal TỪ employees GOM NHÓM THEO dept_id;'
        },
        requirements: [
          { en: 'CREATE VIEW v_dept_metrics AS SELECT dept_id, COUNT(*) AS total_staff, ROUND(AVG(salary), 2) AS avg_sal FROM employees GROUP BY dept_id', vi: 'CREATE VIEW v_dept_metrics AS SELECT dept_id, COUNT(*) AS total_staff, ROUND(AVG(salary), 2) AS avg_sal FROM employees GROUP BY dept_id' }
        ],
        starterCode: `CREATE VIEW v_dept_metrics AS SELECT dept_id, COUNT(*) AS total_staff FROM employees GROUP BY dept_id;`,
        solutionCode: `CREATE VIEW v_dept_metrics AS SELECT dept_id, COUNT(*) AS total_staff, ROUND(AVG(salary), 2) AS avg_sal FROM employees GROUP BY dept_id;`,
        hints: [{ en: 'Include ROUND(AVG(salary), 2) AS avg_sal.', vi: 'Bao gồm ROUND(AVG(salary), 2) AS avg_sal.' }],
        solutionExplanation: { en: 'Aggregated view definition.', vi: 'Định nghĩa view tổng hợp.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_17_1',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'easy',
        question: { en: 'What does First Normal Form (1NF) require in relational database design?', vi: 'Chuẩn 1 (1NF) đòi hỏi điều gì trong thiết kế CSDL quan hệ?' },
        options: [
          { en: 'Every column must hold atomic (indivisible) scalar values, and each record must have a unique identifier with no repeating groups', vi: 'Mỗi cột phải chứa các giá trị nguyên tử (không thể chia nhỏ), và mỗi bản ghi phải có định danh duy nhất không có nhóm lặp' },
          { en: 'All tables must have foreign keys', vi: 'Tất cả các bảng phải có khóa ngoại' },
          { en: 'No numbers can exceed 100', vi: 'Không có số nào được vượt quá 100' },
          { en: 'All column names must be lowercase', vi: 'Tất cả tên cột phải viết chữ thường' }
        ],
        correctAnswers: [0],
        explanation: { en: '1NF eliminates non-atomic attributes (like comma-separated lists) and repeating multi-valued columns.', vi: '1NF loại bỏ các thuộc tính không nguyên tử (như danh sách ngăn cách bởi dấu phẩy) và các nhóm cột lặp lại.' }
      },
      {
        id: 'sql_q_17_2',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'medium',
        question: { en: 'What does Second Normal Form (2NF) require?', vi: 'Chuẩn 2 (2NF) đòi hỏi điều gì?' },
        options: [
          { en: 'The table must be in 1NF and have NO partial dependencies (every non-key column must depend on the FULL composite primary key, not just a part of it)', vi: 'Bảng phải đạt 1NF và KHÔNG CÓ phụ thuộc một phần (mọi cột không khóa phải phụ thuộc vào TOÀN BỘ khóa chính phức hợp, không được phụ thuộc vào một phần của khóa)' },
          { en: 'The table must have at least 2 rows', vi: 'Bảng phải có ít nhất 2 dòng' },
          { en: 'Every table must have two primary keys', vi: 'Mỗi bảng phải có hai khóa chính' },
          { en: 'All columns must be integers', vi: 'Tất cả các cột phải là số nguyên' }
        ],
        correctAnswers: [0],
        explanation: { en: '2NF prevents partial key dependency when composite primary keys are used.', vi: '2NF ngăn chặn sự phụ thuộc một phần vào khóa chính khi sử dụng khóa chính phức hợp.' }
      },
      {
        id: 'sql_q_17_3',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'medium',
        question: { en: 'What does Third Normal Form (3NF) require?', vi: 'Chuẩn 3 (3NF) đòi hỏi điều gì?' },
        options: [
          { en: 'The table must be in 2NF and have NO transitive dependencies (non-key columns must depend strictly on the primary key, and nothing else)', vi: 'Bảng phải đạt 2NF và KHÔNG CÓ phụ thuộc bắc cầu (các cột không khóa chỉ được phép phụ thuộc duy nhất vào khóa chính, không phụ thuộc vào cột không khóa khác)' },
          { en: 'The table must have exactly 3 columns', vi: 'Bảng phải có đúng 3 cột' },
          { en: 'The database must store 3 copies of all data', vi: 'CSDL phải lưu 3 bản sao của mọi dữ liệu' },
          { en: 'All queries must run in under 3 milliseconds', vi: 'Mọi truy vấn phải chạy dưới 3 mili-giây' }
        ],
        correctAnswers: [0],
        explanation: { en: '3NF dictates: "Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key."', vi: '3NF quy định: "Mọi thuộc tính không khóa phải cung cấp thông tin về khóa, toàn bộ khóa và chỉ duy nhất khóa chính."' }
      },
      {
        id: 'sql_q_17_4',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'easy',
        question: { en: 'What is a SQL "View"?', vi: '"View" trong SQL là gì?' },
        options: [
          { en: 'A stored named virtual query result that can be queried like a table without duplicating physical storage', vi: 'Một kết quả truy vấn ảo có tên được lưu lại có thể truy vấn như bảng mà không làm tốn dung lượng lưu trữ vật lý' },
          { en: 'A physical image file on disk', vi: 'Một file hình ảnh vật lý trên đĩa' },
          { en: 'A CSS stylesheet', vi: 'Một file định kiểu CSS' },
          { en: 'A hardware monitor display setting', vi: 'Cài đặt hiển thị màn hình phần cứng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'A view is a virtual table defined by an underlying SQL query.', vi: 'View là một bảng ảo được định nghĩa bởi một câu truy vấn SQL bên dưới.' }
      },
      {
        id: 'sql_q_17_5',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'medium',
        question: { en: 'What does the "ON DELETE CASCADE" referential action do in a FOREIGN KEY constraint?', vi: 'Hành động tham chiếu "ON DELETE CASCADE" trong ràng buộc FOREIGN KEY làm gì?' },
        options: [
          { en: 'When a row in the parent table is deleted, all corresponding child rows in the referencing table are automatically deleted as well', vi: 'Khi một dòng ở bảng cha bị xóa, tất cả các dòng con tương ứng ở bảng tham chiếu cũng tự động bị xóa theo' },
          { en: 'It prevents the parent row from ever being deleted', vi: 'Nó ngăn không cho dòng cha bị xóa' },
          { en: 'It converts the foreign key to NULL', vi: 'Nó chuyển khóa ngoại thành NULL' },
          { en: 'It deletes the entire database schema', vi: 'Nó xóa toàn bộ lược đồ CSDL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CASCADE automatically propagates parent deletions to all referencing child rows.', vi: 'CASCADE tự động lan truyền thao tác xóa từ cha sang tất cả các dòng con tham chiếu.' }
      },
      {
        id: 'sql_q_17_6',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'hard',
        question: { en: 'What is the purpose of a CHECK constraint in SQL DDL?', vi: 'Mục đích của ràng buộc CHECK trong DDL SQL là gì?' },
        options: [
          { en: 'To enforce domain integrity by validating that all inserted or updated column values satisfy a custom boolean predicate', vi: 'Để thực thi tính toàn vẹn miền giá trị bằng cách kiểm tra mọi giá trị chèn hoặc cập nhật phải thỏa mãn biểu thức logic tùy biến' },
          { en: 'To check database disk free space', vi: 'Để kiểm tra dung lượng đĩa trống của CSDL' },
          { en: 'To spell check text columns', vi: 'Để kiểm tra chính tả các cột văn bản' },
          { en: 'To verify network connectivity', vi: 'Để kiểm tra kết nối mạng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CHECK constraints reject any row mutation where the predicate evaluates to FALSE.', vi: 'Ràng buộc CHECK từ chối mọi thao tác sửa đổi dòng khi biểu thức điều kiện trả về FALSE.' }
      },
      {
        id: 'sql_q_17_7',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'easy',
        question: { en: 'Can a table have multiple UNIQUE constraints in addition to its PRIMARY KEY?', vi: 'Một bảng có thể có nhiều ràng buộc UNIQUE bên cạnh PRIMARY KEY của nó không?' },
        options: [
          { en: 'Yes, a table can only have 1 PRIMARY KEY, but can define unlimited UNIQUE constraints (e.g. email, username)', vi: 'Có, một bảng chỉ có 1 PRIMARY KEY duy nhất nhưng có thể định nghĩa không giới hạn ràng buộc UNIQUE (như email, username)' },
          { en: 'No, only 1 unique constraint total is permitted', vi: 'Không, chỉ cho phép tối đa 1 ràng buộc duy nhất' },
          { en: 'Only in PostgreSQL', vi: 'Chỉ trong PostgreSQL' },
          { en: 'Only for integer columns', vi: 'Chỉ dành cho cột kiểu số nguyên' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Tables support multiple candidate keys enforced via UNIQUE constraints.', vi: 'Bảng hỗ trợ nhiều khóa ứng viên thông qua các ràng buộc UNIQUE.' }
      },
      {
        id: 'sql_q_17_8',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'hard',
        question: { en: 'What is a "Materialized View" compared to a standard View?', vi: '"Materialized View" khác gì so với một View thông thường?' },
        options: [
          { en: 'A Materialized View physically persists the query results on disk and can be indexed, requiring explicit REFRESH commands; a standard View recomputes on every query', vi: 'Materialized View lưu kết quả truy vấn thực tế lên đĩa và có thể đánh chỉ mục, đòi hỏi lệnh REFRESH để cập nhật; View chuẩn tính toán lại mỗi khi truy vấn' },
          { en: 'Materialized Views are only for 3D graphics', vi: 'Materialized View chỉ dành cho đồ họa 3D' },
          { en: 'Standard views cannot be queried with SELECT', vi: 'View chuẩn không thể truy vấn bằng SELECT' },
          { en: 'There is no difference', vi: 'Không có sự khác biệt' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Materialized Views trade storage and freshness for blazing query performance on heavy aggregations.', vi: 'Materialized View đánh đổi dung lượng lưu trữ và tính tức thời để lấy hiệu năng truy vấn siêu tốc trên các phép tính nặng.' }
      },
      {
        id: 'sql_q_17_9',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'medium',
        question: { en: 'What are the three major anomalies eliminated by database normalization?', vi: 'Ba hiện tượng bất thường (anomalies) lớn bị triệt tiêu bởi quá trình chuẩn hóa CSDL là gì?' },
        options: [
          { en: 'Insertion Anomaly, Update Anomaly, and Deletion Anomaly', vi: 'Bất thường khi Thêm (Insertion), Cập nhật (Update) và Xóa (Deletion)' },
          { en: 'CPU, RAM, and Disk failures', vi: 'Lỗi CPU, RAM và Ổ đĩa' },
          { en: 'Syntax, Type, and Compile errors', vi: 'Lỗi cú pháp, kiểu và biên dịch' },
          { en: 'TCP, UDP, and IP anomalies', vi: 'Bất thường TCP, UDP và IP' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Normalization prevents redundant data inconsistencies during insert, update, and delete actions.', vi: 'Chuẩn hóa ngăn ngừa sự không nhất quán dữ liệu dư thừa trong quá trình thêm, sửa và xóa.' }
      },
      {
        id: 'sql_q_17_10',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'easy',
        question: { en: 'Which DDL statement is used to remove an existing table and all its data permanently from the database schema?', vi: 'Câu lệnh DDL nào được dùng để xóa vĩnh viễn một bảng hiện có và toàn bộ dữ liệu của nó khỏi lược đồ CSDL?' },
        options: [
          { en: 'DROP TABLE table_name;', vi: 'DROP TABLE ten_bang;' },
          { en: 'DELETE TABLE table_name;', vi: 'DELETE TABLE ten_bang;' },
          { en: 'REMOVE table_name;', vi: 'REMOVE ten_bang;' },
          { en: 'CLEAR table_name;', vi: 'CLEAR ten_bang;' }
        ],
        correctAnswers: [0],
        explanation: { en: 'DROP TABLE permanently removes both the schema metadata and all stored records.', vi: 'DROP TABLE xóa vĩnh viễn cả cấu trúc lược đồ lẫn toàn bộ các bản ghi lưu trữ.' }
      },
      {
        id: 'sql_q_17_11',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'medium',
        question: { en: 'How do you add a new column to an existing table without recreating it?', vi: 'Làm thế nào để thêm một cột mới vào bảng hiện có mà không cần tạo lại bảng từ đầu?' },
        options: [
          { en: 'ALTER TABLE table_name ADD COLUMN column_name data_type;', vi: 'ALTER TABLE ten_bang ADD COLUMN ten_cot kieu_du_lieu;' },
          { en: 'INSERT COLUMN column_name INTO table_name;', vi: 'INSERT COLUMN ten_cot INTO ten_bang;' },
          { en: 'UPDATE TABLE table_name SET COLUMN column_name;', vi: 'UPDATE TABLE ten_bang SET COLUMN ten_cot;' },
          { en: 'CREATE COLUMN column_name IN table_name;', vi: 'CREATE COLUMN ten_cot IN ten_bang;' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The `ALTER TABLE ... ADD COLUMN` statement modifies existing table schemas in place.', vi: 'Câu lệnh `ALTER TABLE ... ADD COLUMN` sửa đổi trực tiếp lược đồ bảng đang có.' }
      },
      {
        id: 'sql_q_17_12',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'hard',
        question: { en: 'What is "Boyce-Codd Normal Form" (BCNF)?', vi: '"Chuẩn Boyce-Codd" (BCNF) là gì?' },
        options: [
          { en: 'A stricter version of 3NF where every determinant (left side of functional dependency X -> Y) MUST be a candidate key', vi: 'Một phiên bản nghiêm ngặt hơn của 3NF trong đó mọi vế xác định (vế trái của phụ thuộc hàm X -> Y) BẮT BUỘC phải là một khóa ứng viên' },
          { en: 'A standard for binary data', vi: 'Chuẩn dành cho dữ liệu nhị phân' },
          { en: 'A table format with 4 columns', vi: 'Định dạng bảng có 4 cột' },
          { en: 'An encryption method', vi: 'Một phương thức mã hóa' }
        ],
        correctAnswers: [0],
        explanation: { en: 'BCNF resolves edge-case anomalies in 3NF when tables have multiple overlapping candidate keys.', vi: 'BCNF giải quyết các bất thường biên của 3NF khi bảng có nhiều khóa ứng viên chồng chéo nhau.' }
      },
      {
        id: 'sql_q_17_13',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'easy',
        question: { en: 'What does the NOT NULL constraint enforce on a column?', vi: 'Ràng buộc NOT NULL thực thi điều gì trên một cột?' },
        options: [
          { en: 'It prevents any row from containing a NULL value in that column, rejecting invalid inserts and updates', vi: 'Nó ngăn không cho bất kỳ dòng nào chứa giá trị NULL ở cột đó, từ chối các lệnh chèn/sửa không hợp lệ' },
          { en: 'It makes the column uppercase', vi: 'Nó biến cột thành chữ hoa' },
          { en: 'It converts numbers to positive', vi: 'Nó chuyển số thành số dương' },
          { en: 'It encrypts the column values', vi: 'Nó mã hóa các giá trị của cột' }
        ],
        correctAnswers: [0],
        explanation: { en: 'NOT NULL guarantees that a value is always provided for that column.', vi: 'NOT NULL đảm bảo cột đó luôn luôn phải có giá trị.' }
      },
      {
        id: 'sql_q_17_14',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'medium',
        question: { en: 'What is a "Composite Primary Key"?', vi: '"Khóa Chính Phức Hợp" (Composite Primary Key) là gì?' },
        options: [
          { en: 'A primary key made up of a combination of two or more columns to establish row uniqueness', vi: 'Một khóa chính được tạo thành từ sự kết hợp của hai hoặc nhiều cột để thiết lập tính duy nhất của dòng' },
          { en: 'Two separate primary keys on the same table', vi: 'Hai khóa chính riêng biệt trên cùng một bảng' },
          { en: 'A key made of strings only', vi: 'Khóa chỉ làm từ chuỗi' },
          { en: 'A foreign key pointing to itself', vi: 'Khóa ngoại tự trỏ đến chính nó' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Composite keys use multi-column combinations (e.g. order_id + line_item_id) for uniqueness.', vi: 'Khóa phức hợp dùng tổ hợp nhiều cột (như order_id + line_item_id) để đảm bảo tính duy nhất.' }
      },
      {
        id: 'sql_q_17_15',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'hard',
        question: { en: 'When is "Denormalization" intentionally applied in production architectures?', vi: 'Khi nào kỹ thuật "Phi Chuẩn Hóa" (Denormalization) được chủ động áp dụng trong các kiến trúc sản xuất?' },
        options: [
          { en: 'In read-heavy Data Warehouses / OLAP systems to reduce expensive multi-table JOINs at query time by pre-aggregating data', vi: 'Trong các hệ thống Kho dữ liệu / OLAP đọc nhiều để giảm bớt các phép JOIN đa bảng tốn kém tại thời điểm truy vấn bằng cách tính toán gom dữ liệu sẵn' },
          { en: 'To save hard drive space', vi: 'Để tiết kiệm dung lượng ổ đĩa' },
          { en: 'Because normalization is deprecated', vi: 'Vì chuẩn hóa đã bị lỗi thời' },
          { en: 'To delete old records automatically', vi: 'Để tự động xóa bản ghi cũ' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Denormalization trades storage redundancy and write overhead for faster analytical read throughput.', vi: 'Phi chuẩn hóa đánh đổi sự dư thừa lưu trữ và chi phí ghi để đổi lấy thông lượng đọc phân tích nhanh hơn.' }
      },
      {
        id: 'sql_q_17_16',
        type: 'single_choice',
        topicId: 'sql_ddl_normalization',
        difficulty: 'easy',
        question: { en: 'Can you query a SQL View using WHERE, GROUP BY, and ORDER BY just like a regular physical table?', vi: 'Bạn có thể truy vấn một SQL View bằng WHERE, GROUP BY và ORDER BY giống hệt một bảng vật lý thông thường không?' },
        options: [
          { en: 'Yes, a view behaves as a standard queryable tabular relation in SQL', vi: 'Có, một view hoạt động như một quan hệ bảng có thể truy vấn chuẩn trong SQL' },
          { en: 'No, views cannot be filtered with WHERE', vi: 'Không, view không thể lọc bằng WHERE' },
          { en: 'Only if the view has less than 10 columns', vi: 'Chỉ khi view có ít hơn 10 cột' },
          { en: 'Only in Oracle', vi: 'Chỉ trong Oracle' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Views provide full relational composability in SQL queries.', vi: 'View cung cấp đầy đủ khả năng kết hợp quan hệ trong các truy vấn SQL.' }
      }
    ]
  },

  // LESSON 18: Transactions & ACID: COMMIT, ROLLBACK, Isolation Levels & Deadlocks
  {
    id: 'sql_lesson_18',
    moduleId: 'sql_mod_4',
    levelId: 'advanced',
    courseId: 'sql',
    order: 18,
    topicId: 'sql_transactions_acid',
    title: {
      en: 'Transactions & ACID: COMMIT, ROLLBACK, Isolation Levels & Deadlocks',
      vi: 'Giao Dịch & ACID: COMMIT, ROLLBACK, Cấp Độ Cô Lập & Deadlock'
    },
    summary: {
      en: 'Master transaction control (BEGIN, COMMIT, ROLLBACK, SAVEPOINT), the ACID guarantees, transaction isolation levels (Read Committed to Serializable), concurrency phenomena, and deadlock prevention.',
      vi: 'Làm chủ kiểm soát giao dịch (BEGIN, COMMIT, ROLLBACK, SAVEPOINT), các nguyên lý ACID, các cấp độ cô lập (Read Committed đến Serializable), hiện tượng tương tranh và phòng chống Deadlock.'
    },
    estimatedMinutes: 25,
    learn: {
      introduction: {
        en: 'A database Transaction is a logical unit of work consisting of one or more SQL statements that must execute with complete integrity. The ACID properties guarantee that database transactions are processed reliably even in the event of server crashes, power outages, or concurrent conflicts.',
        vi: 'Giao dịch CSDL (Transaction) là một đơn vị công việc logic bao gồm một hoặc nhiều câu lệnh SQL bắt buộc phải thực thi với tính toàn vẹn tuyệt đối. Các thuộc tính ACID đảm bảo rằng các giao dịch CSDL được xử lý tin cậy ngay cả khi máy chủ bị sập, mất điện hay xung đột đồng thời.'
      },
      conceptExplanation: {
        en: 'ACID Guarantees: 1) Atomicity: All-or-nothing execution; if any statement fails, the entire transaction is rolled back. 2) Consistency: Data moves from one valid state to another, satisfying all constraints. 3) Isolation: Concurrent transactions execute without interfering with one another. 4) Durability: Once committed, changes survive server crashes permanently. Isolation Levels: Read Uncommitted (allows Dirty Reads), Read Committed (prevents Dirty Reads), Repeatable Read (prevents Non-Repeatable Reads), and Serializable (strict serial execution order; prevents Phantom Reads and serialization anomalies). Deadlocks occur when two transactions mutually hold locks the other needs; database engines detect deadlocks and abort one victim transaction.',
        vi: 'Các bảo đảm của ACID: 1) Tính Nguyên tử (Atomicity): Hoặc thành công tất cả hoặc không có gì; nếu một lệnh thất bại, toàn bộ giao dịch được hoàn tác (rollback). 2) Tính Nhất quán (Consistency): Dữ liệu chuyển từ trạng thái hợp lệ này sang trạng thái hợp lệ khác, thỏa mãn mọi ràng buộc. 3) Tính Cô lập (Isolation): Các giao dịch chạy đồng thời mà không can thiệp lẫn nhau. 4) Tính Bền vững (Durability): Khi đã commit, dữ liệu được lưu vĩnh viễn ngay cả khi sập máy chủ. Cấp độ cô lập: Read Uncommitted (dính đọc bẩn Dirty Read), Read Committed (ngăn đọc bẩn), Repeatable Read (ngăn đọc không lặp lại Non-Repeatable Read), và Serializable (tuần tự hóa nghiêm ngặt; ngăn bóng ma Phantom Read). Deadlock xảy ra khi 2 giao dịch giữ khóa mà bên kia đang cần; CSDL sẽ tự phát hiện deadlock và hủy một giao dịch nạn nhân.'
      },
      syntax: `-- 1. Basic Transaction Lifecycle:
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 200.0 WHERE account_id = 'ACC_A';
UPDATE accounts SET balance = balance + 200.0 WHERE account_id = 'ACC_B';

-- If all operations succeed:
COMMIT;
-- If any error occurs:
-- ROLLBACK;

-- 2. Transaction with Savepoints:
BEGIN TRANSACTION;
INSERT INTO audit_log (action) VALUES ('Batch Started');
SAVEPOINT stage_one;

UPDATE inventory SET qty = qty - 5 WHERE item_id = 42;
-- Partially undo back to stage_one:
-- ROLLBACK TO stage_one;

COMMIT;`,
      examples: [
        {
          title: {
            en: '1. Bank Fund Transfer with Atomic Rollback Guard',
            vi: '1. Chuyển Khoản Ngân Hàng Kèm Rào Chắn Hoàn Tác Nguyên Tử'
          },
          code: `BEGIN TRANSACTION;

-- Deduct funds from Alice
UPDATE employees
SET salary = salary - 500
WHERE name = 'Alice' AND salary >= 500;

-- Credit funds to Bob
UPDATE employees
SET salary = salary + 500
WHERE name = 'Bob';

-- Atomic completion
COMMIT;`,
          language: 'sql',
          explanation: {
            en: 'Guarantees that money cannot disappear mid-transfer: either both debit and credit occur, or neither occurs.',
            vi: 'Đảm bảo tiền không thể biến mất giữa chừng: hoặc cả trừ và cộng đều thành công, hoặc không có thay đổi nào xảy ra.'
          }
        },
        {
          title: {
            en: '2. Savepoint Checkpointing for Partial Error Recovery',
            vi: '2. Điểm Lưu Savepoint Để Phục Hồi Lỗi Một Phần'
          },
          code: `BEGIN TRANSACTION;

INSERT INTO orders (customer_name, amount) VALUES ('Alice', 120.0);
SAVEPOINT order_saved;

-- Attempt optional discount processing
UPDATE orders SET amount = amount * 0.9 WHERE customer_name = 'Alice';

-- If discount is revoked, rollback only to checkpoint:
ROLLBACK TO order_saved;

-- Commit original order safely
COMMIT;`,
          language: 'sql',
          explanation: {
            en: 'Uses SAVEPOINT to undo tentative promotional adjustments while preserving the underlying order insertion.',
            vi: 'Dùng SAVEPOINT để hoàn tác các điều chỉnh khuyến mãi thử nghiệm mà vẫn giữ nguyên bản ghi đơn hàng gốc.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Leaving transactions uncommitted in long-running application connections',
            vi: 'Mở giao dịch nhưng quên commit trong các kết nối ứng dụng chạy dài'
          },
          correction: {
            en: 'An uncommitted open transaction holds active row/table locks, blocking other concurrent queries, filling up Write-Ahead Logs (WAL), and eventually causing severe database connection pool starvation.',
            vi: 'Giao dịch mở chưa commit sẽ giữ các khóa dòng/bảng, chặn các truy vấn đồng thời khác, làm tràn log WAL và gây cạn kiệt connection pool.'
          },
          code: `-- ALWAYS pair BEGIN with COMMIT or ROLLBACK in try/finally blocks.`
        },
        {
          mistake: {
            en: 'Relying on default Read Committed when performing multi-query inventory reservations',
            vi: 'Phụ thuộc vào mức Read Committed mặc định khi làm tác vụ giữ chỗ tồn kho qua nhiều truy vấn'
          },
          correction: {
            en: 'Under Read Committed, two concurrent users can read available stock = 1 and both proceed to purchase, causing overselling. Use "SELECT ... FOR UPDATE" or Serializable isolation level for pessimistic concurrency locking.',
            vi: 'Ở mức Read Committed, 2 người dùng có thể cùng đọc thấy tồn kho = 1 và cùng bấm mua, gây bán khống (overselling). Hãy dùng "SELECT ... FOR UPDATE" hoặc mức Serializable.'
          },
          code: `-- Use explicit row locks for inventory checks:
-- SELECT qty FROM inventory WHERE item_id = 1 FOR UPDATE;`
        }
      ],
      tips: [
        {
          en: 'Keep transactions as short as possible in time and row volume to minimize lock contention and deadlock probabilities.',
          vi: 'Giữ cho giao dịch càng ngắn càng tốt về thời gian và số lượng dòng để giảm thiểu tranh chấp khóa và nguy cơ deadlock.'
        },
        {
          en: 'Always access database tables and rows in a consistent global order across all application endpoints to prevent Deadlocks.',
          vi: 'Luôn truy cập các bảng và dòng theo một thứ tự toàn cục nhất quán trên mọi API ứng dụng để triệt tiêu Deadlock.'
        }
      ],
      practiceStarterCode: `-- Execute an atomic balance transfer transaction
BEGIN TRANSACTION;
UPDATE employees SET bonus = COALESCE(bonus, 0) + 100 WHERE dept_id = 1;
COMMIT;`,
      practice: {
        task: {
          en: 'Write a transaction script that begins a transaction, updates the score of student with name \'Alice\' to 95, and commits the transaction: BEGIN TRANSACTION; UPDATE students SET score = 95 WHERE name = \'Alice\'; COMMIT;',
          vi: 'Viết tập lệnh giao dịch bắt đầu transaction, cập nhật điểm của học viên tên \'Alice\' thành 95 và commit giao dịch: BEGIN TRANSACTION; UPDATE students SET score = 95 WHERE name = \'Alice\'; COMMIT;'
        },
        starterCode: `-- Begin transaction, update score, and commit
BEGIN TRANSACTION;
UPDATE students SET 
WHERE ;
COMMIT;`,
        solutionCode: `BEGIN TRANSACTION; UPDATE students SET score = 95 WHERE name = 'Alice'; COMMIT;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_18_1',
        type: 'fix_code',
        title: { en: 'Fix Missing COMMIT Statement', vi: 'Sửa Lỗi Thiếu Câu Lệnh COMMIT' },
        instruction: {
          en: 'Add "COMMIT;" at the end of the transaction script to persist the changes.',
          vi: 'Thêm "COMMIT;" vào cuối tập lệnh giao dịch để lưu vĩnh viễn các thay đổi.'
        },
        starterCode: "BEGIN TRANSACTION; UPDATE students SET score = 92 WHERE name = 'Alice';",
        solutionCode: "BEGIN TRANSACTION; UPDATE students SET score = 92 WHERE name = 'Alice'; COMMIT;",
        hint: { en: 'Add "COMMIT;" at the end.', vi: 'Thêm "COMMIT;" vào cuối.' },
        explanation: {
          en: 'Transactions must be explicitly committed to permanently persist on disk.',
          vi: 'Giao dịch bắt buộc phải được commit rõ ràng để lưu vĩnh viễn lên đĩa.'
        }
      },
      {
        id: 'sql_ex_18_2',
        type: 'complete_code',
        title: { en: 'Complete ROLLBACK TO Savepoint Syntax', vi: 'Hoàn Thiện Cú Pháp ROLLBACK TO Savepoint' },
        instruction: {
          en: 'Complete the rollback statement: "ROLLBACK TO sp1;".',
          vi: 'Hoàn thiện câu lệnh hoàn tác: "ROLLBACK TO sp1;".'
        },
        starterCode: 'BEGIN TRANSACTION; SAVEPOINT sp1; UPDATE employees SET salary = salary + 100; ROLLBACK TO ; COMMIT;',
        solutionCode: 'BEGIN TRANSACTION; SAVEPOINT sp1; UPDATE employees SET salary = salary + 100; ROLLBACK TO sp1; COMMIT;',
        hint: { en: 'Add "sp1".', vi: 'Thêm "sp1".' },
        explanation: {
          en: 'ROLLBACK TO requires the specific target savepoint identifier.',
          vi: 'ROLLBACK TO bắt buộc phải chỉ định tên savepoint đích.'
        }
      },
      {
        id: 'sql_ex_18_3',
        type: 'write_code',
        title: { en: 'Write Atomic Department Bonus Allocation', vi: 'Viết Giao Dịch Phân Bổ Thưởng Phòng Ban Nguyên Tử' },
        instruction: {
          en: 'Write a transaction that updates bonus for dept_id = 2 by adding 300: BEGIN TRANSACTION; UPDATE employees SET bonus = COALESCE(bonus, 0) + 300 WHERE dept_id = 2; COMMIT;',
          vi: 'Viết giao dịch cập nhật bonus cho dept_id = 2 thêm 300: BEGIN TRANSACTION; UPDATE employees SET bonus = COALESCE(bonus, 0) + 300 WHERE dept_id = 2; COMMIT;'
        },
        starterCode: '-- Write bonus allocation transaction\n',
        solutionCode: 'BEGIN TRANSACTION; UPDATE employees SET bonus = COALESCE(bonus, 0) + 300 WHERE dept_id = 2; COMMIT;',
        hint: { en: 'BEGIN TRANSACTION; ... COMMIT;', vi: 'BEGIN TRANSACTION; ... COMMIT;' },
        explanation: {
          en: 'Atomic transactions wrap multi-row mutations safely.',
          vi: 'Giao dịch nguyên tử bao bọc các thao tác sửa đổi đa dòng an toàn.'
        }
      },
      {
        id: 'sql_ex_18_4',
        type: 'modify_example',
        title: { en: 'Switch COMMIT to Full ROLLBACK', vi: 'Chuyển COMMIT Sang Hoàn Tác Toàn Phần ROLLBACK' },
        instruction: {
          en: 'Change COMMIT to ROLLBACK to discard all tentative modifications.',
          vi: 'Đổi COMMIT thành ROLLBACK để hủy bỏ toàn bộ các sửa đổi thử nghiệm.'
        },
        starterCode: 'BEGIN TRANSACTION; DELETE FROM orders WHERE amount < 50; COMMIT;',
        solutionCode: 'BEGIN TRANSACTION; DELETE FROM orders WHERE amount < 50; ROLLBACK;',
        hint: { en: 'Replace COMMIT with ROLLBACK.', vi: 'Thay COMMIT bằng ROLLBACK.' },
        explanation: {
          en: 'ROLLBACK reverses all operations made within the active transaction scope.',
          vi: 'ROLLBACK đảo ngược toàn bộ các thao tác đã thực hiện trong phạm vi giao dịch.'
        }
      },
      {
        id: 'sql_ex_18_5',
        type: 'predict_output',
        title: { en: 'Predict Outcome of Crashed Uncommitted Transaction', vi: 'Dự Đoán Kết Quả Giao Dịch Bị Sập Trước Khi Commit' },
        instruction: {
          en: 'If a database server loses power during a transaction before COMMIT is issued, what state is the data in upon restart?',
          vi: 'Nếu máy chủ CSDL bị mất điện trong khi đang chạy transaction trước khi có lệnh COMMIT, dữ liệu sẽ ở trạng thái nào khi khởi động lại?'
        },
        starterCode: '-- Predict recovery outcome\n',
        solutionCode: 'SELECT 0 AS changes_persisted;',
        options: [
          'All changes from the incomplete transaction are automatically rolled back during crash recovery (Atomicity)',
          'Half the changes are saved',
          'All changes are saved',
          'The entire database is deleted'
        ],
        correctOptionIndex: 0,
        hint: { en: 'Atomicity and Write-Ahead Logging guarantee that uncommitted transactions are rolled back.', vi: 'Tính nguyên tử và log WAL đảm bảo các giao dịch chưa commit sẽ bị rollback khi khôi phục.' },
        explanation: {
          en: 'ACID atomicity and crash recovery engines guarantee that uncommitted data is never persisted.',
          vi: 'Tính nguyên tử ACID và cơ chế khôi phục sau sự cố đảm bảo dữ liệu chưa commit không bao giờ được lưu.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_18',
      title: { en: 'Mission-Critical Atomic Financial Reconciliation Engine', vi: 'Bộ Đối Soát Tài Chính Nguyên Tử Chuẩn Doanh Nghiệp' },
      description: {
        en: 'Write an atomic SQL transaction script that performs a dual-step ledger settlement: 1) Begin a transaction. 2) Update employees by increasing the bonus of employee with name = \'Alice\' by 500.0 (using COALESCE(bonus, 0.0) + 500.0). 3) Insert a new order into the orders table for customer_name = \'Alice\', amount = 500.0. 4) Commit the transaction to disk permanently.',
        vi: 'Viết tập lệnh giao dịch SQL nguyên tử thực hiện quyết toán sổ cái 2 bước: 1) Bắt đầu giao dịch. 2) Cập nhật employees bằng cách tăng bonus của nhân viên tên \'Alice\' thêm 500.0 (dùng COALESCE(bonus, 0.0) + 500.0). 3) Chèn đơn hàng mới vào bảng orders cho customer_name = \'Alice\', amount = 500.0. 4) Commit giao dịch vĩnh viễn lên đĩa.'
      },
      requirements: [
        { en: 'BEGIN TRANSACTION;', vi: 'BEGIN TRANSACTION;' },
        { en: "UPDATE employees SET bonus = COALESCE(bonus, 0.0) + 500.0 WHERE name = 'Alice';", vi: "UPDATE employees SET bonus = COALESCE(bonus, 0.0) + 500.0 WHERE name = 'Alice';" },
        { en: "INSERT INTO orders (customer_name, amount) VALUES ('Alice', 500.0);", vi: "INSERT INTO orders (customer_name, amount) VALUES ('Alice', 500.0);" },
        { en: 'COMMIT;', vi: 'COMMIT;' }
      ],
      starterCode: `-- Write your atomic reconciliation transaction below
BEGIN TRANSACTION;
UPDATE employees
SET bonus = COALESCE(bonus, 0.0) + 500.0
WHERE name = 'Alice';

INSERT INTO orders (customer_name, amount)
VALUES ('Alice', 500.0);

COMMIT;`,
      solutionCode: `BEGIN TRANSACTION; UPDATE employees SET bonus = COALESCE(bonus, 0.0) + 500.0 WHERE name = 'Alice'; INSERT INTO orders (customer_name, amount) VALUES ('Alice', 500.0); COMMIT;`,
      hints: [{ en: 'Combine BEGIN TRANSACTION, UPDATE, INSERT, and COMMIT.', vi: 'Kết hợp BEGIN TRANSACTION, UPDATE, INSERT và COMMIT.' }],
      solutionExplanation: {
        en: 'Guarantees atomicity across disparate entities in a single atomic transaction boundary.',
        vi: 'Đảm bảo tính nguyên tử giữa các thực thể khác nhau trong một ranh giới giao dịch duy nhất.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_18_v1',
        title: { en: 'Mission-Critical Atomic Financial Reconciliation Engine', vi: 'Bộ Đối Soát Tài Chính Nguyên Tử Chuẩn Doanh Nghiệp' },
        description: {
          en: 'Perform atomic transaction updating Alice bonus and inserting order with commit.',
          vi: 'Thực thi giao dịch nguyên tử cập nhật bonus của Alice và chèn order kèm commit.'
        },
        requirements: [{ en: 'BEGIN TRANSACTION; ... COMMIT;', vi: 'BEGIN TRANSACTION; ... COMMIT;' }],
        starterCode: `BEGIN TRANSACTION; UPDATE ...; INSERT ...; COMMIT;`,
        solutionCode: `BEGIN TRANSACTION; UPDATE employees SET bonus = COALESCE(bonus, 0.0) + 500.0 WHERE name = 'Alice'; INSERT INTO orders (customer_name, amount) VALUES ('Alice', 500.0); COMMIT;`,
        hints: [{ en: 'Include all four statements.', vi: 'Bao gồm cả 4 câu lệnh.' }],
        solutionExplanation: { en: 'Multi-table atomic transaction.', vi: 'Giao dịch nguyên tử đa bảng.' }
      },
      {
        id: 'sql_ch_18_v2',
        title: { en: 'Transactional Salary Adjustment with Rollback Protection', vi: 'Điều Chỉnh Lương Có Bảo Vệ Hoàn Tác' },
        description: {
          en: 'BEGIN TRANSACTION; UPDATE employees SET salary = salary * 1.05 WHERE dept_id = 1; COMMIT;',
          vi: 'BEGIN TRANSACTION; UPDATE employees SET salary = salary * 1.05 WHERE dept_id = 1; COMMIT;'
        },
        requirements: [
          { en: 'UPDATE employees SET salary = salary * 1.05 WHERE dept_id = 1', vi: 'UPDATE employees SET salary = salary * 1.05 WHERE dept_id = 1' }
        ],
        starterCode: `BEGIN TRANSACTION; UPDATE employees SET salary = salary * 1.05; COMMIT;`,
        solutionCode: `BEGIN TRANSACTION; UPDATE employees SET salary = salary * 1.05 WHERE dept_id = 1; COMMIT;`,
        hints: [{ en: 'Add WHERE dept_id = 1.', vi: 'Thêm WHERE dept_id = 1.' }],
        solutionExplanation: { en: 'Guarded department salary revision.', vi: 'Điều chỉnh lương phòng ban an toàn.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_18_1',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'easy',
        question: { en: 'What does the "A" in ACID stand for and guarantee?', vi: 'Chữ "A" trong ACID viết tắt của từ gì và bảo đảm điều gì?' },
        options: [
          { en: 'Atomicity: all operations in the transaction succeed together, or all are rolled back with zero partial changes (All-or-Nothing)', vi: 'Tính Nguyên tử (Atomicity): tất cả thao tác cùng thành công, hoặc cùng bị hoàn tác không để lại bất kỳ thay đổi dở dang nào (Hoặc tất cả hoặc không có gì)' },
          { en: 'Automatic backup creation', vi: 'Tự động tạo sao lưu' },
          { en: 'Array processing speed', vi: 'Tốc độ xử lý mảng' },
          { en: 'Alphabetical sorting guarantee', vi: 'Bảo đảm sắp xếp theo bảng chữ cái' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Atomicity ensures transactions are indivisible units of work.', vi: 'Tính nguyên tử đảm bảo giao dịch là một đơn vị công việc không thể chia tách.' }
      },
      {
        id: 'sql_q_18_2',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'easy',
        question: { en: 'What does the "D" in ACID stand for and guarantee?', vi: 'Chữ "D" trong ACID viết tắt của từ gì và bảo đảm điều gì?' },
        options: [
          { en: 'Durability: once a transaction is committed, its changes survive crashes and power outages permanently', vi: 'Tính Bền vững (Durability): khi transaction đã commit, các thay đổi sẽ tồn tại vĩnh viễn bất chấp sự cố sập nguồn hay tắt máy' },
          { en: 'Dynamic typing', vi: 'Kiểu dữ liệu động' },
          { en: 'Duplicate prevention', vi: 'Chống trùng lặp' },
          { en: 'Direct memory access', vi: 'Truy cập bộ nhớ trực tiếp' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Durability guarantees committed transactions are logged to non-volatile storage.', vi: 'Tính bền vững đảm bảo các giao dịch đã commit được ghi nhận vào bộ nhớ vĩnh viễn.' }
      },
      {
        id: 'sql_q_18_3',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'medium',
        question: { en: 'What is a "Dirty Read" concurrency anomaly?', vi: 'Hiện tượng tương tranh "Đọc Bẩn" (Dirty Read) là gì?' },
        options: [
          { en: 'A transaction reads uncommitted data modified by another concurrent transaction that is subsequently rolled back', vi: 'Một giao dịch đọc dữ liệu chưa được commit của một giao dịch khác mà sau đó giao dịch kia lại bị rollback hủy bỏ' },
          { en: 'Reading corrupt bytes from a damaged disk', vi: 'Đọc các byte bị hỏng từ đĩa bị lỗi' },
          { en: 'Reading passwords in plain text', vi: 'Đọc mật khẩu dưới dạng văn bản thô' },
          { en: 'Reading NULL values', vi: 'Đọc các giá trị NULL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Dirty reads occur when isolation is at Read Uncommitted level.', vi: 'Đọc bẩn xảy ra khi mức cô lập ở mức Read Uncommitted.' }
      },
      {
        id: 'sql_q_18_4',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'hard',
        question: { en: 'Which transaction isolation level provides the strongest safety guarantee, preventing all concurrency anomalies?', vi: 'Cấp độ cô lập giao dịch nào cung cấp mức độ an toàn cao nhất, ngăn chặn mọi hiện tượng bất thường tương tranh?' },
        options: [
          { en: 'Serializable', vi: 'Serializable (Tuần tự hóa)' },
          { en: 'Repeatable Read', vi: 'Repeatable Read' },
          { en: 'Read Committed', vi: 'Read Committed' },
          { en: 'Read Uncommitted', vi: 'Read Uncommitted' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Serializable simulates strict serial one-by-one execution, eliminating phantom reads and write skews.', vi: 'Serializable mô phỏng thực thi tuần tự từng giao dịch một, loại bỏ bóng ma phantom read và write skew.' }
      },
      {
        id: 'sql_q_18_5',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'medium',
        question: { en: 'What is a "Deadlock" in a relational database?', vi: '"Deadlock" trong CSDL quan hệ là gì?' },
        options: [
          { en: 'A circular dependency where Transaction A waits for a lock held by Transaction B, while Transaction B waits for a lock held by Transaction A', vi: 'Một sự phụ thuộc vòng tròn khi Giao dịch A chờ khóa do Giao dịch B giữ, trong khi Giao dịch B lại chờ khóa do Giao dịch A giữ' },
          { en: 'A broken database hard drive', vi: 'Một ổ cứng CSDL bị hỏng' },
          { en: 'An expired user password', vi: 'Mật khẩu người dùng hết hạn' },
          { en: 'A table with 0 rows', vi: 'Một bảng có 0 dòng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Deadlocks occur when two concurrent processes hold mutually needed exclusive locks.', vi: 'Deadlock xảy ra khi hai tiến trình đồng thời giữ các khóa độc quyền mà bên kia cần.' }
      },
      {
        id: 'sql_q_18_6',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'hard',
        question: { en: 'How do relational database engines automatically resolve detected deadlocks?', vi: 'Hệ quản trị CSDL quan hệ tự động xử lý khi phát hiện deadlock như thế nào?' },
        options: [
          { en: 'The engine uses a lock-wait graph to detect the cycle, automatically chooses one transaction as a "victim", and aborts/rolls it back', vi: 'Hệ thống dùng đồ thị chờ khóa để phát hiện chu trình, tự động chọn một giao dịch làm "nạn nhân" và hủy/rollback giao dịch đó' },
          { en: 'The server shuts down immediately', vi: 'Máy chủ tắt ngay lập tức' },
          { en: 'It deletes the locked table from disk', vi: 'Xóa bảng bị khóa khỏi đĩa' },
          { en: 'It ignores the deadlock forever', vi: 'Bỏ qua deadlock mãi mãi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Deadlock detectors abort the cheapest victim transaction with a retry error.', vi: 'Bộ dò deadlock sẽ hủy giao dịch nạn nhân ít tốn kém nhất kèm thông báo lỗi để ứng dụng thử lại.' }
      },
      {
        id: 'sql_q_18_7',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'easy',
        question: { en: 'What does the "SAVEPOINT" command allow you to do inside a transaction?', vi: 'Lệnh "SAVEPOINT" cho phép bạn làm gì bên trong một transaction?' },
        options: [
          { en: 'Create a named checkpoint allowing partial rollback without aborting the entire transaction', vi: 'Tạo một điểm mốc có tên cho phép hoàn tác một phần mà không cần hủy toàn bộ giao dịch' },
          { en: 'Save a screenshot of the database', vi: 'Lưu ảnh chụp màn hình CSDL' },
          { en: 'Commit the transaction to a file', vi: 'Commit transaction vào một file' },
          { en: 'Restart the computer', vi: 'Khởi động lại máy tính' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Savepoints provide fine-grained nested rollback points within an open transaction.', vi: 'Savepoint cung cấp các mốc rollback cục bộ mịn bên trong một giao dịch đang mở.' }
      },
      {
        id: 'sql_q_18_8',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'medium',
        question: { en: 'What is a "Non-Repeatable Read" anomaly?', vi: 'Hiện tượng bất thường "Đọc Không Lặp Lại" (Non-Repeatable Read) là gì?' },
        options: [
          { en: 'A transaction reads a row, another transaction modifies and commits that row, and the first transaction reads the same row again obtaining different values', vi: 'Một transaction đọc 1 dòng, transaction khác sửa và commit dòng đó, khiến lần đọc lại thứ 2 của transaction đầu thấy giá trị bị thay đổi' },
          { en: 'A query that cannot be executed twice', vi: 'Truy vấn không thể chạy 2 lần' },
          { en: 'A primary key conflict', vi: 'Xung đột khóa chính' },
          { en: 'A lost network packet', vi: 'Mất gói tin mạng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Non-repeatable reads are prevented at Repeatable Read and Serializable isolation levels.', vi: 'Đọc không lặp lại được khắc phục từ mức Repeatable Read và Serializable.' }
      },
      {
        id: 'sql_q_18_9',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'hard',
        question: { en: 'What is a "Phantom Read" anomaly?', vi: 'Hiện tượng bất thường "Đọc Bóng Ma" (Phantom Read) là gì?' },
        options: [
          { en: 'A transaction queries a range of rows (e.g. score > 80), another transaction inserts and commits a new matching row, and re-executing the range query returns newly appeared phantom rows', vi: 'Một transaction truy vấn một dải dòng (như score > 80), transaction khác chèn và commit dòng mới thỏa điều kiện, khiến lần chạy lại thấy xuất hiện thêm các dòng "bóng ma" mới' },
          { en: 'Reading data that was deleted 10 years ago', vi: 'Đọc dữ liệu đã bị xóa 10 năm trước' },
          { en: 'A query running without user credentials', vi: 'Truy vấn chạy không có tài khoản' },
          { en: 'A corrupted index pointer', vi: 'Con trỏ chỉ mục bị lỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Phantom reads involve new rows appearing in predicate ranges; prevented by Serializable range locks/MVCC.', vi: 'Bóng ma liên quan đến các dòng mới xuất hiện trong dải điều kiện; được ngăn chặn bởi Serializable/MVCC.' }
      },
      {
        id: 'sql_q_18_10',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'easy',
        question: { en: 'What is the default transaction isolation level in PostgreSQL and Oracle?', vi: 'Cấp độ cô lập giao dịch mặc định trong PostgreSQL và Oracle là gì?' },
        options: [
          { en: 'Read Committed', vi: 'Read Committed' },
          { en: 'Serializable', vi: 'Serializable' },
          { en: 'Read Uncommitted', vi: 'Read Uncommitted' },
          { en: 'Repeatable Read', vi: 'Repeatable Read' }
        ],
        correctAnswers: [0],
        explanation: { en: 'PostgreSQL, Oracle, and SQL Server default to Read Committed for optimal balance of concurrency and safety.', vi: 'PostgreSQL, Oracle và SQL Server mặc định dùng Read Committed để cân bằng tối ưu giữa tính đồng thời và an toàn.' }
      },
      {
        id: 'sql_q_18_11',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'medium',
        question: { en: 'What is the primary mechanism modern databases use to implement Durability and Crash Recovery?', vi: 'Cơ chế cốt lõi mà các CSDL hiện đại sử dụng để thực thi Tính Bền Vững (Durability) và Khôi Phục Sau Sự Cố là gì?' },
        options: [
          { en: 'Write-Ahead Logging (WAL) / Redo Logs written synchronously to non-volatile storage before committing', vi: 'Ghi nhật ký trước (Write-Ahead Logging - WAL) / Redo Logs được ghi đồng bộ vào bộ nhớ vĩnh viễn trước khi commit' },
          { en: 'Printing queries to paper', vi: 'In truy vấn ra giấy' },
          { en: 'Sending email backups to admins', vi: 'Gửi email sao lưu cho admin' },
          { en: 'Storing everything in RAM only', vi: 'Chỉ lưu toàn bộ trong RAM' }
        ],
        correctAnswers: [0],
        explanation: { en: 'WAL ensures that all modifications are securely logged to disk before a transaction is acknowledged as committed.', vi: 'WAL đảm bảo mọi sửa đổi được ghi an toàn vào đĩa trước khi giao dịch được xác nhận commit.' }
      },
      {
        id: 'sql_q_18_12',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'hard',
        question: { en: 'What is "Write Skew" anomaly in Snapshot Isolation / Repeatable Read?', vi: 'Hiện tượng bất thường "Write Skew" trong Snapshot Isolation / Repeatable Read là gì?' },
        options: [
          { en: 'Two concurrent transactions read overlapping data, make mutually inconsistent updates to disjoint rows based on what they read, and both commit successfully violating global business constraints', vi: 'Hai transaction cùng đọc dữ liệu chồng lấn, thực hiện các cập nhật không nhất quán lên các dòng rời rạc dựa trên dữ liệu đã đọc, và cùng commit thành công gây vi phạm quy tắc toàn cục' },
          { en: 'Writing text backwards', vi: 'Ghi văn bản ngược' },
          { en: 'Hard drive sector alignment error', vi: 'Lỗi căn chỉnh sector ổ cứng' },
          { en: 'Writing NULL into an auto-increment column', vi: 'Ghi NULL vào cột tự tăng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Write Skew (e.g. two doctors concurrently taking on-call leave) requires full Serializable isolation to prevent.', vi: 'Write Skew (như 2 bác sĩ cùng xin nghỉ trực đồng thời) đòi hỏi mức Serializable để ngăn ngừa.' }
      },
      {
        id: 'sql_q_18_13',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'easy',
        question: { en: 'What happens to uncommitted transactions when a client connection abruptly disconnects?', vi: 'Điều gì xảy ra với các giao dịch chưa commit khi kết nối của client đột ngột bị ngắt?' },
        options: [
          { en: 'The database server detects the disconnect and automatically issues a ROLLBACK to protect data integrity', vi: 'Máy chủ CSDL phát hiện ngắt kết nối và tự động phát lệnh ROLLBACK để bảo vệ toàn vẹn dữ liệu' },
          { en: 'The transaction is automatically committed', vi: 'Transaction được tự động commit' },
          { en: 'The database server crashes', vi: 'Máy chủ CSDL bị sập' },
          { en: 'The tables are locked forever', vi: 'Các bảng bị khóa vĩnh viễn' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Disconnections trigger automatic abort and rollback cleanup by database connection managers.', vi: 'Mất kết nối sẽ kích hoạt cơ chế tự động hủy và dọn dẹp rollback của CSDL.' }
      },
      {
        id: 'sql_q_18_14',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'medium',
        question: { en: 'What does "MVCC" stand for in modern database engines (PostgreSQL, MySQL InnoDB, SQLite)?', vi: '"MVCC" là viết tắt của cụm từ nào trong các hệ CSDL hiện đại (PostgreSQL, MySQL InnoDB, SQLite)?' },
        options: [
          { en: 'Multi-Version Concurrency Control (allowing readers not to block writers, and writers not to block readers)', vi: 'Multi-Version Concurrency Control - Kiểm soát tương tranh đa phiên bản (giúp người đọc không chặn người ghi và người ghi không chặn người đọc)' },
          { en: 'Maximum Virtual Column Count', vi: 'Maximum Virtual Column Count' },
          { en: 'Modular Verification Constraint Code', vi: 'Modular Verification Constraint Code' },
          { en: 'Managed View Calculation Cache', vi: 'Managed View Calculation Cache' }
        ],
        correctAnswers: [0],
        explanation: { en: 'MVCC maintains snapshot versions of rows so read queries never lock out write transactions.', vi: 'MVCC duy trì các phiên bản snapshot của dòng giúp các truy vấn đọc không bao giờ khóa cứng giao dịch ghi.' }
      },
      {
        id: 'sql_q_18_15',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'hard',
        question: { en: 'What is the standard best practice for application code to prevent deadlocks when updating multiple resources?', vi: 'Quy tắc thực hành chuẩn tốt nhất để code ứng dụng phòng chống deadlock khi cập nhật nhiều tài nguyên là gì?' },
        options: [
          { en: 'Acquire locks / update resources in the exact same deterministic sorted order (e.g. always sorted by ID ASC) across all application transactions', vi: 'Chiếm khóa / cập nhật các tài nguyên theo đúng một thứ tự sắp xếp xác định thống nhất (như luôn sắp xếp theo ID ASC) trên mọi giao dịch của ứng dụng' },
          { en: 'Use randomized sleep delays before every query', vi: 'Dùng lệnh sleep ngẫu nhiên trước mỗi truy vấn' },
          { en: 'Disable all primary keys', vi: 'Tắt toàn bộ khóa chính' },
          { en: 'Limit transactions to 1 second', vi: 'Giới hạn giao dịch trong 1 giây' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Locking resources in a consistent global order mathematically eliminates circular dependency cycles (deadlocks).', vi: 'Khóa tài nguyên theo thứ tự toàn cục nhất quán triệt tiêu về mặt toán học các chu trình phụ thuộc vòng tròn (deadlock).' }
      },
      {
        id: 'sql_q_18_16',
        type: 'single_choice',
        topicId: 'sql_transactions_acid',
        difficulty: 'easy',
        question: { en: 'Can a database transaction span multiple different tables in a single atomic block?', vi: 'Một giao dịch CSDL có thể bao gồm nhiều bảng khác nhau trong một khối nguyên tử duy nhất không?' },
        options: [
          { en: 'Yes, a transaction can encompass mutations across any number of tables atomically', vi: 'Có, một giao dịch có thể bao gồm các thao tác sửa đổi trên bao nhiêu bảng tùy ý một cách nguyên tử' },
          { en: 'No, transactions are strictly limited to 1 table only', vi: 'Không, giao dịch bị giới hạn nghiêm ngặt chỉ trên 1 bảng duy nhất' },
          { en: 'Only if tables share the same number of columns', vi: 'Chỉ khi các bảng có cùng số lượng cột' },
          { en: 'Only in MySQL', vi: 'Chỉ trong MySQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Transactions provide multi-table atomicity across the entire relational database.', vi: 'Giao dịch cung cấp tính nguyên tử đa bảng trên toàn bộ CSDL quan hệ.' }
      }
    ]
  }
];
