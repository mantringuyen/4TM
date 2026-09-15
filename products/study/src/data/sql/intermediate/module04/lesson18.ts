import { Lesson } from '../../../../types';

export const lesson18: Lesson = {
  id: 'sql_lesson_18',
  moduleId: 'sql_mod_4',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 18,
  topicId: 'sql_dml_operations',
  title: {
    en: 'DML Operations: INSERT, UPDATE, DELETE & TRUNCATE',
    vi: 'Thao Tác Dữ Liệu (DML): INSERT, UPDATE, DELETE & TRUNCATE'
  },
  summary: {
    en: 'Master Data Manipulation Language (DML): batch multi-row INSERTs, table-to-table INSERT INTO SELECT, precision UPDATEs with arithmetic expressions, targeted DELETEs, and high-speed TRUNCATE operations.',
    vi: 'Làm chủ Ngôn ngữ Thao tác Dữ liệu (DML): chèn nhiều dòng với INSERT, sao chép bảng bằng INSERT INTO SELECT, cập nhật chuẩn xác với UPDATE, xóa có chủ đích bằng DELETE và dọn dẹp siêu tốc bằng TRUNCATE.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'While SELECT queries retrieve state, Data Manipulation Language (DML) writes, modifies, and removes state within relational tables. Mastering DML statements—INSERT, UPDATE, DELETE, and TRUNCATE—along with mission-critical WHERE safety guards is essential for building reliable, production-grade applications.',
      vi: 'Trong khi các câu lệnh SELECT đọc dữ liệu, Ngôn ngữ Thao tác Dữ liệu (DML) chịu trách nhiệm ghi mới, chỉnh sửa và xóa dữ liệu trong các bảng quan hệ. Làm chủ các lệnh INSERT, UPDATE, DELETE và TRUNCATE cùng với các rào chắn điều kiện WHERE an toàn là nền tảng sống còn cho mọi hệ thống thực tế.'
    },
    conceptExplanation: {
      en: 'Core DML Mechanics & Safety Guidelines:\n1. INSERT INTO:\n   - Single/Multi-Row: "INSERT INTO table (c1, c2) VALUES (v1, v2), (v3, v4);"\n   - Bulk Copying: "INSERT INTO table_copy (c1, c2) SELECT c1, c2 FROM source WHERE ...;"\n2. UPDATE:\n   - Modifies existing row values: "UPDATE table SET col1 = val1, col2 = col2 * 1.10 WHERE condition;"\n   - CRITICAL: Omitting WHERE updates EVERY row in the entire table!\n3. DELETE:\n   - Removes rows matching a predicate: "DELETE FROM table WHERE condition;"\n   - Row-by-row removal that logs every deleted row in transaction logs.\n4. TRUNCATE TABLE:\n   - DDL operation that instantly wipes all rows by deallocating data pages.\n   - Far faster than DELETE, resets auto-increment sequences, but cannot use WHERE and cannot run if foreign keys reference the table.',
      vi: 'Cơ chế DML cốt lõi & Quy tắc an toàn:\n1. INSERT INTO:\n   - Chèn đơn/đa dòng: "INSERT INTO tên_bảng (c1, c2) VALUES (v1, v2), (v3, v4);"\n   - Sao chép hàng loạt: "INSERT INTO bảng_sao (c1, c2) SELECT c1, c2 FROM bảng_nguồn WHERE ...;"\n2. UPDATE:\n   - Chỉnh sửa giá trị các dòng hiện có: "UPDATE tên_bảng SET col1 = val1, col2 = col2 * 1.10 WHERE điều_kiện;"\n   - CỰC KỲ QUAN TRỌNG: Quên mệnh đề WHERE sẽ cập nhật TOÀN BỘ các dòng trong cả bảng!\n3. DELETE:\n   - Xóa các dòng thỏa mãn vị từ lọc: "DELETE FROM tên_bảng WHERE điều_kiện;"\n   - Xóa từng dòng và ghi log từng dòng vào nhật ký giao dịch.\n4. TRUNCATE TABLE:\n   - Lệnh DDL xóa trắng toàn bộ bảng tức thì bằng cách giải phóng các trang dữ liệu (data pages).\n   - Nhanh hơn DELETE rất nhiều, tự động reset bộ đếm auto-increment, nhưng không hỗ trợ WHERE và không thể chạy nếu có khóa ngoại tham chiếu đến.'
    },
    syntax: `-- Batch Multi-row INSERT
INSERT INTO departments (id, name, budget)
VALUES 
  (10, 'Engineering', 500000.00),
  (20, 'Marketing', 250000.00);

-- Targeted Conditional UPDATE
UPDATE employees
SET salary = salary * 1.10,
    title = 'Senior ' || title
WHERE department_id = 10 AND performance_rating >= 4.5;

-- Safe DELETE
DELETE FROM audit_logs
WHERE logged_at < '2025-01-01';`,
    examples: [
      {
        title: {
          en: '1. ETL Pipeline Ingestion with INSERT INTO ... SELECT',
          vi: '1. Nạp Dữ Liệu Đường Ống ETL Với INSERT INTO ... SELECT'
        },
        code: `INSERT INTO archive_orders (order_id, customer_id, total_amount, order_date)
SELECT id, customer_id, total, created_at
FROM orders
WHERE status = 'Completed' AND created_at < '2025-01-01';`,
        language: 'sql',
        explanation: {
          en: 'Extracts historical completed orders and loads them in bulk into an archive table in a single atomic operation.',
          vi: 'Trích xuất các đơn hàng đã hoàn tất trong lịch sử và nạp hàng loạt vào bảng lưu trữ chỉ trong một thao tác nguyên tử duy nhất.'
        }
      },
      {
        title: {
          en: '2. Precision Compensation Adjustment with Correlated Subquery UPDATE',
          vi: '2. Cập Nhật Lương Chuẩn Xác Bằng UPDATE Kết Hợp Truy Vấn Con'
        },
        code: `UPDATE employees
SET salary = salary * 1.05
WHERE department_id IN (
  SELECT id FROM departments WHERE budget >= 1000000
);`,
        language: 'sql',
        explanation: {
          en: 'Applies a 5% raise only to employees whose department possesses a budget exceeding 1 million dollars.',
          vi: 'Tăng 5% lương cho các nhân viên thuộc các phòng ban có ngân sách trên 1 triệu USD.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Running UPDATE or DELETE without an explicit WHERE clause in production.',
          vi: 'Thực thi lệnh UPDATE hoặc DELETE mà không có mệnh đề WHERE trong môi trường production.'
        },
        correction: {
          en: 'An UPDATE or DELETE without WHERE modifies or destroys EVERY row in the table. Always write a SELECT query with the WHERE clause first to verify affected rows, or wrap changes inside a test transaction (BEGIN TRANSACTION; ... ROLLBACK;).',
          vi: 'UPDATE hoặc DELETE không có WHERE sẽ làm hỏng hoặc xóa sạch toàn bộ dữ liệu trong bảng. Hãy luôn viết lệnh SELECT kiểm tra trước, hoặc bọc thao tác trong giao dịch an toàn (BEGIN TRANSACTION; ... ROLLBACK;).'
        }
      },
      {
        mistake: {
          en: 'Attempting to use a WHERE clause with TRUNCATE TABLE.',
          vi: 'Cố tình dùng mệnh đề WHERE với lệnh TRUNCATE TABLE.'
        },
        correction: {
          en: 'TRUNCATE TABLE is a DDL operation that drops storage pages for the whole table; it does not support WHERE. To delete a subset of rows, use DELETE FROM table WHERE condition.',
          vi: 'TRUNCATE TABLE là lệnh DDL giải phóng toàn bộ trang nhớ của bảng nên không hỗ trợ WHERE. Để xóa một phần dữ liệu, bắt buộc phải dùng DELETE FROM kèm WHERE.'
        }
      }
    ],
    tips: [
      {
        en: 'In PostgreSQL and SQLite 3.35+, INSERT, UPDATE, and DELETE support the "RETURNING *" clause to return modified rows immediately.',
        vi: 'Trong PostgreSQL và SQLite 3.35+, các lệnh INSERT, UPDATE và DELETE hỗ trợ mệnh đề "RETURNING *" để trả về ngay các dòng vừa được sửa đổi.'
      },
      {
        en: 'For deleting massive tables with millions of rows, TRUNCATE completes in milliseconds because it bypasses row-by-row transaction logging.',
        vi: 'Để xóa trắng các bảng hàng triệu dòng, TRUNCATE hoàn thành chỉ trong vài mili-giây vì bỏ qua việc ghi nhật ký chi tiết từng dòng.'
      }
    ],
    practiceStarterCode: `-- Insert a new record
INSERT INTO departments (id, name, budget) VALUES (99, 'Research', 150000);`
  },
  exercisePool: [
    {
      id: 'sql_ex_dml_1',
      type: 'complete_code',
      title: {
        en: 'Update Employee Salaries Conditionally',
        vi: 'Cập Nhật Lương Nhân Viên Có Điều Kiện'
      },
      instruction: {
        en: 'Increase the salary of employees in department 5 by 10% using the UPDATE statement.',
        vi: 'Tăng lương cho các nhân viên thuộc phòng ban 5 thêm 10% bằng câu lệnh UPDATE.'
      },
      starterCode: `UPDATE employees
SET salary = salary * ___
WHERE department_id = 5;`,
      solutionCode: `UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 5;`,
      hint: {
        en: 'Multiply by 1.10 for a 10% increase.',
        vi: 'Nhân với 1.10 để tăng 10%.'
      },
      explanation: {
        en: 'The SET clause evaluates the new arithmetic value for rows matching the WHERE filter.',
        vi: 'Mệnh đề SET tính toán giá trị số học mới cho các dòng thỏa mãn bộ lọc WHERE.'
      }
    },
    {
      id: 'sql_ex_dml_2',
      type: 'complete_code',
      title: {
        en: 'Safely Delete Inactive Users',
        vi: 'Xóa An Toàn Người Dùng Không Hoạt Động'
      },
      instruction: {
        en: 'Delete users from the users table who have is_active = 0.',
        vi: 'Xóa người dùng khỏi bảng users có trạng thái is_active = 0.'
      },
      starterCode: `DELETE FROM users
WHERE is_active = ___;`,
      solutionCode: `DELETE FROM users
WHERE is_active = 0;`,
      hint: {
        en: 'Filter by is_active = 0.',
        vi: 'Lọc theo is_active = 0.'
      },
      explanation: {
        en: 'DELETE with WHERE is_active = 0 targets only deactivated user records.',
        vi: 'Lệnh DELETE kèm WHERE is_active = 0 chỉ tác động đến các bản ghi người dùng đã vô hiệu hóa.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_dml_operations',
    title: {
      en: 'Lifecycle Data Migration & Archival Pipeline',
      vi: 'Đường Ống Chuyển Đổi & Lưu Trữ Vòng Đời Dữ Liệu'
    },
    description: {
      en: 'Perform a complete 3-step data lifecycle operation: 1. INSERT into archived_logs (log_id, message, log_date) all records from system_logs WHERE status = \'Resolved\' AND created_at < \'2025-01-01\'. 2. UPDATE system_logs SET priority = \'Low\' WHERE status = \'Pending\' AND created_at < \'2025-06-01\'. 3. DELETE from system_logs WHERE status = \'Resolved\' AND created_at < \'2025-01-01\'.',
      vi: 'Thực hiện toàn bộ quy trình vòng đời dữ liệu gồm 3 bước: 1. INSERT vào archived_logs (log_id, message, log_date) tất cả bản ghi từ system_logs WHERE status = \'Resolved\' AND created_at < \'2025-01-01\'. 2. UPDATE system_logs SET priority = \'Low\' WHERE status = \'Pending\' AND created_at < \'2025-06-01\'. 3. DELETE khỏi system_logs WHERE status = \'Resolved\' AND created_at < \'2025-01-01\'.'
    },
    requirements: [
      { en: '1. INSERT INTO archived_logs (log_id, message, log_date) SELECT id, message, created_at FROM system_logs WHERE status = \'Resolved\' AND created_at < \'2025-01-01\'', vi: '1. INSERT INTO archived_logs (log_id, message, log_date) SELECT id, message, created_at FROM system_logs WHERE status = \'Resolved\' AND created_at < \'2025-01-01\'' },
      { en: '2. UPDATE system_logs SET priority = \'Low\' WHERE status = \'Pending\' AND created_at < \'2025-06-01\'', vi: '2. UPDATE system_logs SET priority = \'Low\' WHERE status = \'Pending\' AND created_at < \'2025-06-01\'' },
      { en: '3. DELETE FROM system_logs WHERE status = \'Resolved\' AND created_at < \'2025-01-01\'', vi: '3. DELETE FROM system_logs WHERE status = \'Resolved\' AND created_at < \'2025-01-01\'' }
    ],
    starterCode: `-- Execute the 3-step lifecycle pipeline
INSERT INTO archived_logs (log_id, message, log_date)
SELECT id, message, created_at FROM system_logs;`,
    solutionCode: `INSERT INTO archived_logs (log_id, message, log_date)
SELECT id, message, created_at
FROM system_logs
WHERE status = 'Resolved' AND created_at < '2025-01-01';

UPDATE system_logs
SET priority = 'Low'
WHERE status = 'Pending' AND created_at < '2025-06-01';

DELETE FROM system_logs
WHERE status = 'Resolved' AND created_at < '2025-01-01';`,
    hints: [
      {
        en: 'Write each statement cleanly terminated with a semicolon, ensuring exact WHERE filter alignment between INSERT SELECT and DELETE.',
        vi: 'Viết từng câu lệnh kết thúc bằng dấu chấm phẩy, đảm bảo điều kiện WHERE khớp chính xác giữa lệnh INSERT SELECT và DELETE.'
      }
    ],
    solutionExplanation: {
      en: 'Safely migrates archival records before executing matching targeted deletions and priority updates.',
      vi: 'Di chuyển dữ liệu lưu trữ an toàn trước khi xóa bản ghi nguồn tương ứng và cập nhật mức độ ưu tiên.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_dml_1',
      type: 'single_choice',
      question: {
        en: 'What does DML stand for in SQL?',
        vi: 'DML là viết tắt của cụm từ gì trong SQL?'
      },
      options: [
        { en: 'Data Manipulation Language (INSERT, UPDATE, DELETE, MERGE)', vi: 'Data Manipulation Language - Ngôn ngữ Thao tác Dữ liệu (INSERT, UPDATE, DELETE, MERGE)' },
        { en: 'Database Model Layout', vi: 'Database Model Layout' },
        { en: 'Direct Memory Lookup', vi: 'Direct Memory Lookup' },
        { en: 'Data Management License', vi: 'Data Management License' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DML consists of SQL statements that manipulate stored data within database tables.',
        vi: 'DML bao gồm các câu lệnh SQL dùng để thao tác và biến đổi dữ liệu lưu trong các bảng CSDL.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_dml_2',
      type: 'single_choice',
      question: {
        en: 'What happens if you execute "UPDATE employees SET salary = 50000;" without a WHERE clause?',
        vi: 'Điều gì xảy ra nếu bạn thực thi câu lệnh "UPDATE employees SET salary = 50000;" mà không có mệnh đề WHERE?'
      },
      options: [
        { en: 'EVERY single employee row in the entire table will have their salary overwritten with 50000', vi: 'MỌI dòng nhân viên trong toàn bộ bảng sẽ bị ghi đè mức lương thành 50000' },
        { en: 'The database will prompt the user with a confirmation popup', vi: 'CSDL sẽ hiển thị hộp thoại xác nhận' },
        { en: 'Only the first row will be updated', vi: 'Chỉ có dòng đầu tiên được cập nhật' },
        { en: 'The command will fail with a syntax error', vi: 'Câu lệnh sẽ báo lỗi cú pháp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Without a WHERE predicate, UPDATE unconditionally applies modifications to every record in the table.',
        vi: 'Nếu không có vị từ WHERE, lệnh UPDATE sẽ áp dụng thay đổi lên toàn bộ các bản ghi trong bảng.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_dml_3',
      type: 'single_choice',
      question: {
        en: 'What is a major technical difference between DELETE FROM table and TRUNCATE TABLE?',
        vi: 'Điểm khác biệt kỹ thuật quan trọng nhất giữa DELETE FROM bảng và TRUNCATE TABLE là gì?'
      },
      options: [
        { en: 'DELETE logs each removed row individually and supports WHERE; TRUNCATE deallocates storage pages in bulk, is far faster, resets identity counters, but cannot use WHERE', vi: 'DELETE ghi log từng dòng bị xóa và hỗ trợ WHERE; TRUNCATE giải phóng các trang nhớ hàng loạt, nhanh hơn rất nhiều, reset bộ đếm id nhưng không hỗ trợ WHERE' },
        { en: 'DELETE drops the table schema; TRUNCATE creates a new table', vi: 'DELETE xóa bỏ cấu trúc bảng; TRUNCATE tạo bảng mới' },
        { en: 'TRUNCATE only works on temporary tables', vi: 'TRUNCATE chỉ hoạt động trên bảng tạm' },
        { en: 'DELETE cannot be rolled back inside a transaction', vi: 'DELETE không thể rollback bên trong transaction' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'TRUNCATE is a minimally logged DDL operation that resets page allocations, whereas DELETE is a row-by-row DML operation.',
        vi: 'TRUNCATE là lệnh DDL giải phóng trang nhớ với mức ghi log tối thiểu, trong khi DELETE là lệnh DML xóa từng dòng.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_dml_4',
      type: 'true_false',
      question: {
        en: 'You can insert multiple rows in a single INSERT INTO statement by separating value tuples with commas.',
        vi: 'Bạn có thể chèn nhiều dòng trong một câu lệnh INSERT INTO duy nhất bằng cách phân tách các bộ giá trị bằng dấu phẩy.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Multi-row batch inserts (VALUES (...), (...), (...)) are ANSI SQL compliant and much faster than separate single-row inserts.',
        vi: 'Đúng. Chèn đa dòng (VALUES (...), (...), (...)) là chuẩn ANSI SQL và nhanh hơn nhiều so với việc chèn từng dòng đơn lẻ.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_dml_5',
      type: 'single_choice',
      question: {
        en: 'Which statement syntax correctly copies data from one table to another existing table?',
        vi: 'Cú pháp câu lệnh nào sao chép dữ liệu từ một bảng sang một bảng hiện có khác một cách chính xác?'
      },
      options: [
        { en: 'INSERT INTO target_table (col1, col2) SELECT col1, col2 FROM source_table WHERE condition;', vi: 'INSERT INTO bảng_đích (col1, col2) SELECT col1, col2 FROM bảng_nguồn WHERE điều_kiện;' },
        { en: 'COPY target_table FROM source_table;', vi: 'COPY bảng_đích FROM bảng_nguồn;' },
        { en: 'SELECT INTO target_table FROM source_table;', vi: 'SELECT INTO bảng_đích FROM bảng_nguồn;' },
        { en: 'UPDATE target_table SET ALL = (SELECT * FROM source_table);', vi: 'UPDATE bảng_đích SET ALL = (SELECT * FROM bảng_nguồn);' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'INSERT INTO ... SELECT is the standard SQL construct for bulk ETL data migration between tables.',
        vi: 'INSERT INTO ... SELECT là cú pháp SQL chuẩn để chuyển đổi và sao chép dữ liệu hàng loạt giữa các bảng.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_dml_6',
      type: 'predict_output',
      question: {
        en: 'If a table has 5 rows and you run "DELETE FROM table WHERE 1 = 0;", how many rows are deleted?',
        vi: 'Nếu một bảng có 5 dòng và bạn chạy "DELETE FROM table WHERE 1 = 0;", có bao nhiêu dòng bị xóa?'
      },
      options: [
        { en: '0 rows (since 1 = 0 evaluates to FALSE for all rows)', vi: '0 dòng (vì 1 = 0 trả về FALSE cho tất cả các dòng)' },
        { en: '5 rows', vi: '5 dòng' },
        { en: '1 row', vi: '1 dòng' },
        { en: 'Error', vi: 'Báo lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because 1 = 0 is FALSE for every record, no rows match the WHERE filter.',
        vi: 'Vì 1 = 0 luôn là FALSE cho mọi bản ghi nên không có dòng nào bị xóa.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_dml_7',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the RETURNING clause (e.g. INSERT INTO ... RETURNING id)?',
        vi: 'Mục đích của mệnh đề RETURNING (ví dụ: INSERT INTO ... RETURNING id) là gì?'
      },
      options: [
        { en: 'It returns the newly generated auto-increment keys or modified column values directly to the calling client without requiring a second SELECT query', vi: 'Nó trả về trực tiếp các khóa auto-increment vừa sinh hoặc giá trị cột vừa sửa cho client mà không cần chạy thêm lệnh SELECT' },
        { en: 'It returns the database to a previous backup snapshot', vi: 'Nó khôi phục CSDL về bản sao lưu trước đó' },
        { en: 'It reboots the SQL server', vi: 'Nó khởi động lại máy chủ SQL' },
        { en: 'It converts integers to strings', vi: 'Nó chuyển đổi số nguyên thành chuỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RETURNING eliminates round-trips by projecting affected row data directly upon statement completion.',
        vi: 'RETURNING giúp tiết kiệm lượt gọi mạng bằng cách trả về ngay dữ liệu của các dòng bị tác động.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_dml_8',
      type: 'true_false',
      question: {
        en: 'TRUNCATE TABLE can be executed on a table even if another active table has a Foreign Key constraint referencing it.',
        vi: 'Lệnh TRUNCATE TABLE có thể thực thi trên một bảng ngay cả khi có bảng khác đang có Khóa ngoại (Foreign Key) tham chiếu đến nó.'
      },
      options: [
        { en: 'False (most relational databases block TRUNCATE on tables referenced by foreign keys to prevent orphan violations)', vi: 'Sai (hầu hết các CSDL quan hệ chặn TRUNCATE trên các bảng bị khóa ngoại tham chiếu để tránh vi phạm dữ liệu mồ côi)' },
        { en: 'True', vi: 'Đúng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'False. RDBMSs prevent TRUNCATE if active foreign key references exist (unless CASCADE is supported/specified).',
        vi: 'Sai. Hệ quản trị CSDL chặn TRUNCATE nếu có ràng buộc khóa ngoại đang tham chiếu đến bảng đó.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_dml_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following commands belong to the DML (Data Manipulation Language) family? (Select all that apply)',
        vi: 'Những câu lệnh nào sau đây thuộc nhóm DML (Ngôn ngữ Thao tác Dữ liệu)? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'INSERT', vi: 'INSERT' },
        { en: 'UPDATE', vi: 'UPDATE' },
        { en: 'DELETE', vi: 'DELETE' },
        { en: 'ALTER TABLE', vi: 'ALTER TABLE' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'INSERT, UPDATE, and DELETE are DML. ALTER TABLE is a DDL command.',
        vi: 'INSERT, UPDATE và DELETE là DML. ALTER TABLE là lệnh DDL.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_dml_10',
      type: 'single_choice',
      question: {
        en: 'What best practice should database engineers follow before executing a production DELETE with a complex WHERE clause?',
        vi: 'Thực hành tốt nhất nào mà kỹ sư CSDL nên làm trước khi chạy lệnh DELETE trên production với điều kiện WHERE phức tạp?'
      },
      options: [
        { en: 'Run a "SELECT COUNT(*)" or "SELECT *" with the exact same WHERE clause first to verify the matched rows, or test inside a transaction with ROLLBACK', vi: 'Chạy lệnh "SELECT COUNT(*)" hoặc "SELECT *" với chính xác mệnh đề WHERE đó trước để kiểm tra các dòng khớp, hoặc thử trong transaction kèm ROLLBACK' },
        { en: 'Turn off the database firewall', vi: 'Tắt tường lửa CSDL' },
        { en: 'Delete the indexes first', vi: 'Xóa các chỉ mục trước' },
        { en: 'Change all table column names', vi: 'Đổi tên tất cả các cột của bảng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Pre-flight SELECT validation or rollback testing guarantees that only intended target rows are affected.',
        vi: 'Kiểm tra trước bằng SELECT hoặc thử nghiệm rollback đảm bảo chỉ những dòng mục tiêu mới bị xóa.'
      },
      topicId: 'sql_dml_operations',
      difficulty: 'easy'
    }
  ]
};

export default lesson18;
