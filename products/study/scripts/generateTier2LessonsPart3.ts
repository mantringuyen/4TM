import * as fs from 'fs';
import * as path from 'path';
import { Lesson } from '../src/types';
import { tier2Lessons as lessons6and7 } from './generateTier2';
import { remainingTier2Lessons as lesson8 } from './generateTier2LessonsPart2';

export const lessons9and10: Lesson[] = [
  // LESSON 9: Outer Joins: LEFT, RIGHT, FULL OUTER & Anti-Joins
  {
    id: 'sql_lesson_9',
    moduleId: 'sql_mod_2',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 9,
    topicId: 'sql_outer_anti_joins',
    title: {
      en: 'Outer Joins: LEFT, RIGHT, FULL OUTER & Anti-Joins',
      vi: 'Outer Joins: LEFT, RIGHT, FULL OUTER & Phép Nối Anti-Join'
    },
    summary: {
      en: 'Master preserving master entity records with LEFT JOIN, handling missing related columns as NULL, finding orphaned/inactive records with Anti-Joins (WHERE IS NULL), and full outer joins.',
      vi: 'Làm chủ việc bảo toàn bản ghi thực thể chính với LEFT JOIN, xử lý các cột liên kết thiếu dưới dạng NULL, tìm bản ghi mồ côi/chưa phát sinh quan hệ bằng Anti-Join (WHERE IS NULL) và full outer join.'
    },
    estimatedMinutes: 22,
    learn: {
      introduction: {
        en: 'Unlike INNER JOIN which discards unmatched records, OUTER JOINs preserve rows from one or both tables even when no corresponding relationship exists in the foreign table, populating missing attributes with NULL.',
        vi: 'Khác với INNER JOIN loại bỏ các bản ghi không khớp, OUTER JOIN bảo toàn các dòng từ một hoặc cả hai bảng ngay cả khi không có quan hệ tương ứng ở bảng liên kết, tự động điền giá trị NULL cho các cột bị thiếu.'
      },
      conceptExplanation: {
        en: 'A LEFT OUTER JOIN (or simply LEFT JOIN) guarantees that every row from the left table appears in the output. When a left row has no match in the right table, all right-table columns evaluate to NULL. An Anti-Join leverages this exact behavior: by adding "WHERE right_table.key IS NULL", you instantly extract rows in the left table that have ZERO associations in the right table (e.g. students who have never placed an order).',
        vi: 'LEFT OUTER JOIN (hoặc viết gọn là LEFT JOIN) đảm bảo mọi dòng từ bảng bên trái đều xuất hiện ở kết quả. Khi một dòng bên trái không có dòng khớp ở bảng phải, toàn bộ các cột của bảng phải sẽ có giá trị NULL. Phép Anti-Join tận dụng chính cơ chế này: bằng cách thêm "WHERE bang_phai.khoa IS NULL", bạn sẽ lọc ra các dòng ở bảng trái CHƯA TỪNG có bất kỳ quan hệ nào ở bảng phải (ví dụ: học viên chưa bao giờ mua đơn hàng nào).'
      },
      syntax: `SELECT a.id, a.name, b.order_id, b.amount
FROM master_table a
LEFT JOIN detail_table b ON a.id = b.master_id
-- Optional Anti-Join Filter:
WHERE b.master_id IS NULL;`,
      examples: [
        {
          title: {
            en: '1. Preserving All Students and Their Orders with LEFT JOIN',
            vi: '1. Giữ Lại Toàn Bộ Học Viên và Đơn Hàng Tương Ứng Với LEFT JOIN'
          },
          code: `SELECT s.id,
       s.name,
       s.course,
       o.product,
       COALESCE(o.amount, 0.0) AS order_amount
FROM students s
LEFT JOIN orders o ON s.name = o.customer_name
ORDER BY s.id;`,
          language: 'sql',
          explanation: {
            en: 'Lists every single student. Students without any purchases still appear with product as NULL and order_amount defaulted to 0.0 via COALESCE.',
            vi: 'Liệt kê đầy đủ mọi học viên. Học viên chưa mua hàng vẫn xuất hiện với product là NULL và order_amount mặc định là 0.0 nhờ COALESCE.'
          }
        },
        {
          title: {
            en: '2. Finding Inactive Students (Anti-Join Pattern)',
            vi: '2. Tìm Học Viên Chưa Từng Mua Hàng (Mẫu Anti-Join)'
          },
          code: `SELECT s.id, s.name, s.course, s.city
FROM students s
LEFT JOIN orders o ON s.name = o.customer_name
WHERE o.id IS NULL;`,
          language: 'sql',
          explanation: {
            en: 'Extracts students who have placed 0 orders by filtering for NULL primary keys on the right-hand table.',
            vi: 'Trích xuất các học viên có 0 đơn hàng bằng cách lọc các khóa chính NULL ở bảng bên phải.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Accidentally converting a LEFT JOIN into an INNER JOIN with a right-table WHERE filter',
            vi: 'Vô tình biến LEFT JOIN thành INNER JOIN do bộ lọc WHERE trên bảng bên phải'
          },
          correction: {
            en: 'Placing a condition like "WHERE o.amount > 50" discards all rows where o.amount IS NULL, silently turning the LEFT JOIN into an INNER JOIN. Put right-table conditions inside the ON clause instead: "LEFT JOIN orders o ON s.name = o.customer_name AND o.amount > 50".',
            vi: 'Đặt điều kiện như "WHERE o.amount > 50" sẽ loại bỏ tất cả các dòng có o.amount IS NULL, âm thầm biến LEFT JOIN thành INNER JOIN. Hãy đặt điều kiện bảng phải vào mệnh đề ON: "LEFT JOIN orders o ON s.name = o.customer_name AND o.amount > 50".'
          },
          code: `-- BAD (Accidental INNER JOIN):
SELECT s.name, o.amount FROM students s LEFT JOIN orders o ON s.name = o.customer_name WHERE o.amount > 50;
-- GOOD (Preserves all students):
SELECT s.name, o.amount FROM students s LEFT JOIN orders o ON s.name = o.customer_name AND o.amount > 50;`
        },
        {
          mistake: {
            en: 'Using COUNT(*) instead of COUNT(right_table.id) on a LEFT JOIN',
            vi: 'Dùng COUNT(*) thay vì COUNT(bang_phai.id) khi thực hiện LEFT JOIN'
          },
          correction: {
            en: 'COUNT(*) counts the preserved master row (returning 1 even for 0 orders). Always use COUNT(o.id) to accurately count non-null child records.',
            vi: 'COUNT(*) sẽ đếm luôn dòng thực thể chính được giữ lại (trả về 1 dù có 0 đơn hàng). Luôn dùng COUNT(o.id) để đếm chính xác số bản ghi con khác null.'
          },
          code: `-- BAD: SELECT s.name, COUNT(*) AS order_count FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name; -- Returns 1 for 0 orders!
-- GOOD:
SELECT s.name, COUNT(o.id) AS order_count FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name;`
        }
      ],
      tips: [
        {
          en: 'SQLite natively supports LEFT JOIN. RIGHT JOIN and FULL OUTER JOIN can be expressed by flipping table order or using UNION of two LEFT JOIN queries.',
          vi: 'SQLite hỗ trợ sẵn LEFT JOIN. RIGHT JOIN và FULL OUTER JOIN có thể biểu diễn bằng cách đảo vị trí bảng hoặc dùng UNION hai câu lệnh LEFT JOIN.'
        },
        {
          en: 'Anti-Joins (LEFT JOIN ... WHERE right.id IS NULL) are often more performant than NOT IN (which fails on NULLs) and comparable to NOT EXISTS.',
          vi: 'Anti-Join (LEFT JOIN ... WHERE right.id IS NULL) thường có hiệu năng vượt trội hơn NOT IN (vốn bị lỗi khi có NULL) và tương đương với NOT EXISTS.'
        }
      ],
      practiceStarterCode: `-- Find all students and their order count (including 0 orders)
SELECT s.name, COUNT(o.id) AS order_count
FROM students s
LEFT JOIN orders o ON s.name = o.customer_name
GROUP BY s.name;`,
      practice: {
        task: {
          en: 'Write an Anti-Join query to find all students in the students table who have never placed an order in the orders table.',
          vi: 'Viết truy vấn Anti-Join để tìm tất cả học viên trong bảng students chưa từng phát sinh đơn hàng nào trong bảng orders.'
        },
        starterCode: `-- Find students with no orders
SELECT s.name, s.course
FROM students s
LEFT JOIN orders o ON s.name = o.customer_name;`,
        solutionCode: `SELECT s.name, s.course FROM students s LEFT JOIN orders o ON s.name = o.customer_name WHERE o.id IS NULL;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_9_1',
        type: 'fix_code',
        title: { en: 'Fix Accidental INNER JOIN in LEFT JOIN Query', vi: 'Sửa Lỗi LEFT JOIN Bị Biến Thành INNER JOIN' },
        instruction: {
          en: 'Move the condition "o.amount > 50" from the WHERE clause into the LEFT JOIN ON clause so students without large orders are still preserved.',
          vi: 'Chuyển điều kiện "o.amount > 50" từ mệnh đề WHERE sang mệnh đề ON của LEFT JOIN để vẫn giữ lại học viên không có đơn hàng lớn.'
        },
        starterCode: 'SELECT s.name, o.product FROM students s LEFT JOIN orders o ON s.name = o.customer_name WHERE o.amount > 50;',
        solutionCode: 'SELECT s.name, o.product FROM students s LEFT JOIN orders o ON s.name = o.customer_name AND o.amount > 50;',
        hint: { en: 'Change "WHERE o.amount > 50" to "AND o.amount > 50" in the JOIN clause.', vi: 'Đổi "WHERE o.amount > 50" thành "AND o.amount > 50" trong mệnh đề JOIN.' },
        explanation: {
          en: 'Filtering the right-hand table in WHERE filters out the NULLs generated by the LEFT JOIN, converting it into an INNER JOIN.',
          vi: 'Lọc bảng bên phải trong WHERE sẽ loại bỏ các dòng NULL do LEFT JOIN sinh ra, biến nó thành INNER JOIN.'
        }
      },
      {
        id: 'sql_ex_9_2',
        type: 'complete_code',
        title: { en: 'Complete Anti-Join with IS NULL Filter', vi: 'Hoàn Thiện Phép Nối Anti-Join Với IS NULL' },
        instruction: {
          en: 'Complete the Anti-Join query by checking that o.id IS NULL.',
          vi: 'Hoàn thiện truy vấn Anti-Join bằng cách kiểm tra điều kiện o.id IS NULL.'
        },
        starterCode: 'SELECT s.name FROM students s LEFT JOIN orders o ON s.name = o.customer_name WHERE o.id ;',
        solutionCode: 'SELECT s.name FROM students s LEFT JOIN orders o ON s.name = o.customer_name WHERE o.id IS NULL;',
        hint: { en: 'Add "IS NULL" after o.id.', vi: 'Thêm "IS NULL" vào sau o.id.' },
        explanation: {
          en: 'Checking IS NULL on the foreign primary key isolates rows that failed to find a match.',
          vi: 'Kiểm tra IS NULL trên khóa chính của bảng bên phải giúp lọc ra các dòng không có bản ghi khớp.'
        }
      },
      {
        id: 'sql_ex_9_3',
        type: 'write_code',
        title: { en: 'Calculate Order Counts Including Zero Orders', vi: 'Tính Số Đơn Hàng Kể Cả Những Người Chưa Mua' },
        instruction: {
          en: 'Write a query selecting s.name, s.course, and COUNT(o.id) AS total_orders FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course.',
          vi: 'Viết truy vấn chọn s.name, s.course và COUNT(o.id) AS total_orders TỪ students s LEFT JOIN orders o ON s.name = o.customer_name GOM THEO s.name, s.course.'
        },
        starterCode: '-- Select student name, course, and count of orders\n',
        solutionCode: 'SELECT s.name, s.course, COUNT(o.id) AS total_orders FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course;',
        hint: { en: 'Use COUNT(o.id) AS total_orders with LEFT JOIN and GROUP BY.', vi: 'Dùng COUNT(o.id) AS total_orders với LEFT JOIN và GROUP BY.' },
        explanation: {
          en: 'COUNT(o.id) correctly evaluates to 0 when o.id is NULL for students with no orders.',
          vi: 'COUNT(o.id) trả về chính xác 0 khi o.id là NULL đối với những sinh viên chưa mua hàng.'
        }
      },
      {
        id: 'sql_ex_9_4',
        type: 'modify_example',
        title: { en: 'Default Missing Amounts to Zero with COALESCE', vi: 'Gán Giá Trị 0 Cho Tiền Thiếu Bằng COALESCE' },
        instruction: {
          en: 'Modify the query to wrap SUM(o.amount) in COALESCE(..., 0.0) aliased as total_spend.',
          vi: 'Sửa truy vấn để bọc SUM(o.amount) trong hàm COALESCE(..., 0.0) với bí danh total_spend.'
        },
        starterCode: 'SELECT s.name, SUM(o.amount) AS total_spend FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name;',
        solutionCode: 'SELECT s.name, COALESCE(SUM(o.amount), 0.0) AS total_spend FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name;',
        hint: { en: 'Change SUM(o.amount) to COALESCE(SUM(o.amount), 0.0).', vi: 'Đổi SUM(o.amount) thành COALESCE(SUM(o.amount), 0.0).' },
        explanation: {
          en: 'COALESCE ensures non-buyers display 0.0 instead of NULL in financial rollup reports.',
          vi: 'COALESCE đảm bảo người chưa mua hàng hiển thị 0.0 thay vì NULL trong báo cáo tài chính.'
        }
      },
      {
        id: 'sql_ex_9_5',
        type: 'predict_output',
        title: { en: 'Predict Outcome of COUNT(*) vs COUNT(child_col) in LEFT JOIN', vi: 'Dự Đoán Kết Quả COUNT(*) vs COUNT(cột_con) Trong LEFT JOIN' },
        instruction: {
          en: 'If student "Alice" has 0 orders, what does COUNT(*) return vs COUNT(o.id) in a LEFT JOIN grouped by student?',
          vi: 'Nếu học viên "Alice" có 0 đơn hàng, COUNT(*) trả về giá trị gì so với COUNT(o.id) khi LEFT JOIN gom nhóm theo học viên?'
        },
        starterCode: '-- Predict COUNT in LEFT JOIN\n',
        solutionCode: 'SELECT 1 AS count_star, 0 AS count_col;',
        options: [
          'COUNT(*) returns 1 (counting the NULL row), while COUNT(o.id) correctly returns 0',
          'Both return 0',
          'Both return 1',
          'COUNT(o.id) throws a null pointer error'
        ],
        correctOptionIndex: 0,
        hint: { en: 'COUNT(*) counts table rows; COUNT(column) ignores NULL values.', vi: 'COUNT(*) đếm số dòng; COUNT(cột) bỏ qua giá trị NULL.' },
        explanation: {
          en: 'COUNT(*) sees the single preserved master row and counts 1. COUNT(o.id) sees NULL and ignores it, returning 0.',
          vi: 'COUNT(*) thấy dòng thực thể chính được giữ lại nên đếm là 1. COUNT(o.id) thấy giá trị NULL nên bỏ qua, trả về 0.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_9',
      title: { en: 'Comprehensive Customer Lifetime Value & Zero-Activity Audit', vi: 'Kiểm Toán Giá Trị Trọn Đời Khách Hàng & Tài Khoản Chưa Hoạt Động' },
      description: {
        en: 'Write a SQL query that performs a LEFT JOIN from students to orders on s.name = o.customer_name. For every student in the database, calculate: their name, course, city, the total count of orders placed as order_count, and total amount spent as total_spent (defaulted to 0.0 via COALESCE if no orders exist). Order the results by total_spent DESC, then s.name ASC.',
        vi: 'Viết truy vấn SQL thực hiện LEFT JOIN từ bảng students sang orders theo s.name = o.customer_name. Với mọi học viên trong CSDL, tính: tên name, khóa học course, thành phố city, tổng số đơn hàng order_count và tổng tiền đã chi tiêu total_spent (mặc định 0.0 qua COALESCE nếu chưa có đơn). Sắp xếp kết quả theo total_spent DESC, sau đó s.name ASC.'
      },
      requirements: [
        { en: 'Select s.name, s.course, s.city', vi: 'Chọn s.name, s.course, s.city' },
        { en: 'Calculate COUNT(o.id) AS order_count', vi: 'Tính COUNT(o.id) AS order_count' },
        { en: 'Calculate COALESCE(SUM(o.amount), 0.0) AS total_spent', vi: 'Tính COALESCE(SUM(o.amount), 0.0) AS total_spent' },
        { en: 'LEFT JOIN orders o ON s.name = o.customer_name', vi: 'LEFT JOIN orders o ON s.name = o.customer_name' },
        { en: 'GROUP BY s.name, s.course, s.city ORDER BY total_spent DESC, s.name ASC', vi: 'GROUP BY s.name, s.course, s.city ORDER BY total_spent DESC, s.name ASC' }
      ],
      starterCode: `-- Write your SQL query below
SELECT s.name, s.course, s.city
FROM students s
LEFT JOIN orders o ON 
GROUP BY 
ORDER BY ;`,
      solutionCode: `SELECT s.name, s.course, s.city, COUNT(o.id) AS order_count, COALESCE(SUM(o.amount), 0.0) AS total_spent FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course, s.city ORDER BY total_spent DESC, s.name ASC;`,
      hints: [{ en: 'Use COUNT(o.id) AS order_count and COALESCE(SUM(o.amount), 0.0) AS total_spent.', vi: 'Dùng COUNT(o.id) AS order_count và COALESCE(SUM(o.amount), 0.0) AS total_spent.' }],
      solutionExplanation: {
        en: 'Preserves the entire customer base in financial reporting while accounting for inactive customers without losing records.',
        vi: 'Bảo toàn toàn bộ danh sách khách hàng trong báo cáo tài chính đồng thời xử lý các tài khoản chưa hoạt động mà không làm mất dữ liệu.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_9_v1',
        title: { en: 'Comprehensive Customer Lifetime Value & Zero-Activity Audit', vi: 'Kiểm Toán Giá Trị Trọn Đời Khách Hàng & Tài Khoản Chưa Hoạt Động' },
        description: {
          en: 'Perform LEFT JOIN from students to orders: select s.name, s.course, s.city, COUNT(o.id) AS order_count, COALESCE(SUM(o.amount), 0.0) AS total_spent group by s.name, s.course, s.city order by total_spent DESC, s.name ASC.',
          vi: 'Thực hiện LEFT JOIN từ students sang orders: chọn s.name, s.course, s.city, COUNT(o.id) AS order_count, COALESCE(SUM(o.amount), 0.0) AS total_spent gom theo s.name, s.course, s.city xếp theo total_spent DESC, s.name ASC.'
        },
        requirements: [{ en: 'COALESCE(SUM(o.amount), 0.0) AS total_spent', vi: 'COALESCE(SUM(o.amount), 0.0) AS total_spent' }],
        starterCode: `SELECT s.name, s.course, s.city FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course, s.city;`,
        solutionCode: `SELECT s.name, s.course, s.city, COUNT(o.id) AS order_count, COALESCE(SUM(o.amount), 0.0) AS total_spent FROM students s LEFT JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course, s.city ORDER BY total_spent DESC, s.name ASC;`,
        hints: [{ en: 'Add COUNT(o.id) and COALESCE around SUM.', vi: 'Thêm COUNT(o.id) và COALESCE bọc quanh SUM.' }],
        solutionExplanation: { en: 'Full lifetime customer value matrix.', vi: 'Ma trận giá trị khách hàng trọn đời toàn diện.' }
      },
      {
        id: 'sql_ch_9_v2',
        title: { en: 'Unenrolled or Inactive Department Audit', vi: 'Kiểm Toán Phòng Ban Chưa Có Nhân Sự Hoặc Không Hoạt Động' },
        description: {
          en: 'Select e.dept_id, e.name, COALESCE(e.salary, 0.0) AS salary, COALESCE(e.bonus, 0.0) AS bonus FROM employees e LEFT JOIN orders o ON e.name = o.customer_name WHERE o.id IS NULL ORDER BY e.salary DESC.',
          vi: 'Chọn e.dept_id, e.name, COALESCE(e.salary, 0.0) AS salary, COALESCE(e.bonus, 0.0) AS bonus TỪ employees e LEFT JOIN orders o ON e.name = o.customer_name CÓ o.id IS NULL XẾP THEO e.salary DESC.'
        },
        requirements: [
          { en: 'Anti-join with WHERE o.id IS NULL', vi: 'Anti-join với WHERE o.id IS NULL' },
          { en: 'COALESCE salary and bonus to 0.0', vi: 'COALESCE salary và bonus về 0.0' }
        ],
        starterCode: `SELECT e.dept_id, e.name FROM employees e LEFT JOIN orders o ON e.name = o.customer_name WHERE o.id IS NULL;`,
        solutionCode: `SELECT e.dept_id, e.name, COALESCE(e.salary, 0.0) AS salary, COALESCE(e.bonus, 0.0) AS bonus FROM employees e LEFT JOIN orders o ON e.name = o.customer_name WHERE o.id IS NULL ORDER BY e.salary DESC;`,
        hints: [{ en: 'Select dept_id, name, COALESCE(salary, 0.0), COALESCE(bonus, 0.0)', vi: 'Chọn dept_id, name, COALESCE(salary, 0.0), COALESCE(bonus, 0.0)' }],
        solutionExplanation: { en: 'Identifies employees without registered purchases.', vi: 'Xác định nhân viên chưa từng có giao dịch mua hàng.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_9_1',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'easy',
        question: { en: 'What is the primary feature of a LEFT OUTER JOIN?', vi: 'Đặc điểm chính của phép LEFT OUTER JOIN là gì?' },
        options: [
          { en: 'It preserves all rows from the left table, filling missing right-side attributes with NULL', vi: 'Bảo toàn toàn bộ các dòng từ bảng bên trái, điền NULL cho các thuộc tính bị thiếu ở bảng phải' },
          { en: 'It discards all rows that do not match in both tables', vi: 'Loại bỏ tất cả các dòng không khớp ở cả hai bảng' },
          { en: 'It reverses the primary key order', vi: 'Đảo ngược thứ tự khóa chính' },
          { en: 'It only keeps right-side records', vi: 'Chỉ giữ lại các bản ghi ở bảng bên phải' }
        ],
        correctAnswers: [0],
        explanation: { en: 'LEFT JOIN keeps every record from the left table regardless of matching records on the right.', vi: 'LEFT JOIN giữ lại mọi bản ghi từ bảng trái bất kể có bản ghi khớp ở bảng phải hay không.' }
      },
      {
        id: 'sql_q_9_2',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'medium',
        question: { en: 'How does an "Anti-Join" identify rows in Table A that have NO match in Table B?', vi: 'Phép "Anti-Join" xác định các dòng trong Bảng A KHÔNG CÓ bản ghi khớp trong Bảng B bằng cách nào?' },
        options: [
          { en: 'By performing a LEFT JOIN from A to B and adding "WHERE B.primary_key IS NULL"', vi: 'Bằng cách thực hiện LEFT JOIN từ A sang B và thêm điều kiện "WHERE B.primary_key IS NULL"' },
          { en: 'By using INNER JOIN with WHERE A.id != B.id', vi: 'Dùng INNER JOIN với WHERE A.id != B.id' },
          { en: 'By running CROSS JOIN and dropping duplicate values', vi: 'Chạy CROSS JOIN rồi xóa các giá trị trùng lặp' },
          { en: 'By using HAVING COUNT(*) = 1', vi: 'Dùng HAVING COUNT(*) = 1' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Unmatched rows in a LEFT JOIN produce NULLs for all right-table columns; checking IS NULL isolates them.', vi: 'Các dòng không khớp trong LEFT JOIN sẽ tạo ra NULL ở bảng phải; kiểm tra IS NULL sẽ trích xuất chính xác chúng.' }
      },
      {
        id: 'sql_q_9_3',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'medium',
        question: { en: 'What happens if you write "SELECT * FROM a LEFT JOIN b ON a.id = b.a_id WHERE b.status = \'active\';"?', vi: 'Điều gì xảy ra nếu bạn viết "SELECT * FROM a LEFT JOIN b ON a.id = b.a_id WHERE b.status = \'active\';"?' },
        options: [
          { en: 'It accidentally behaves as an INNER JOIN, because rows with no match have b.status = NULL, which fails "status = \'active\'"', vi: 'Nó vô tình hoạt động như INNER JOIN vì các dòng không khớp có b.status = NULL sẽ không thỏa mãn điều kiện "status = \'active\'"' },
          { en: 'It preserves all rows from table a with status active', vi: 'Nó giữ lại toàn bộ dòng từ bảng a có status active' },
          { en: 'It causes a database deadlock', vi: 'Gây ra deadlock CSDL' },
          { en: 'It throws a syntax error', vi: 'Báo lỗi cú pháp' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Filtering the right table in WHERE eliminates NULL rows, negating the outer join.', vi: 'Lọc bảng bên phải trong WHERE sẽ loại bỏ các dòng NULL, làm mất tác dụng của outer join.' }
      },
      {
        id: 'sql_q_9_4',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'easy',
        question: { en: 'How can you preserve all left-table rows while filtering right-table attributes (e.g. only active orders)?', vi: 'Làm thế nào để vừa giữ lại toàn bộ bảng trái vừa lọc điều kiện ở bảng phải (ví dụ: chỉ lấy đơn hàng active)?' },
        options: [
          { en: 'Place the right-table condition in the ON clause (e.g. ON a.id = b.a_id AND b.status = \'active\')', vi: 'Đặt điều kiện bảng phải vào mệnh đề ON (ví dụ: ON a.id = b.a_id AND b.status = \'active\')' },
          { en: 'Use HAVING b.status = \'active\'', vi: 'Dùng HAVING b.status = \'active\'' },
          { en: 'Use ORDER BY b.status', vi: 'Dùng ORDER BY b.status' },
          { en: 'It is impossible in SQL', vi: 'Không thể thực hiện được trong SQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Conditions in ON filter right-side rows before the outer join preservation step takes place.', vi: 'Điều kiện trong ON lọc các dòng bên phải trước khi bước bảo toàn của outer join diễn ra.' }
      },
      {
        id: 'sql_q_9_5',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'hard',
        question: { en: 'What is a FULL OUTER JOIN?', vi: 'FULL OUTER JOIN là gì?' },
        options: [
          { en: 'A join that preserves all rows from BOTH the left and right tables, filling missing data with NULL on either side', vi: 'Phép nối bảo toàn toàn bộ các dòng từ CẢ HAI bảng trái và phải, điền NULL cho các trường thiếu ở bất kỳ bên nào' },
          { en: 'A join that multiplies all columns by 2', vi: 'Phép nối nhân đôi số lượng cột' },
          { en: 'Another name for CROSS JOIN', vi: 'Tên gọi khác của CROSS JOIN' },
          { en: 'An INNER JOIN with a full table scan', vi: 'Phép INNER JOIN quét toàn bộ bảng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'FULL OUTER JOIN retains all records from both sides, matching where possible and inserting NULLs otherwise.', vi: 'FULL OUTER JOIN giữ lại toàn bộ bản ghi từ cả 2 phía, ghép dòng nếu khớp và chèn NULL nếu không.' }
      },
      {
        id: 'sql_q_9_6',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'medium',
        question: { en: 'How do you emulate a FULL OUTER JOIN in SQLite, which does not have native FULL OUTER JOIN syntax?', vi: 'Làm thế nào để giả lập FULL OUTER JOIN trong SQLite (vốn không hỗ trợ sẵn cú pháp FULL OUTER JOIN)?', },
        options: [
          { en: 'Combine a LEFT JOIN and a RIGHT-emulating LEFT JOIN with the UNION operator', vi: 'Kết hợp một câu lệnh LEFT JOIN và một câu lệnh LEFT JOIN đảo bảng (giả lập RIGHT JOIN) bằng toán tử UNION' },
          { en: 'Use CROSS JOIN with WHERE id IS NOT NULL', vi: 'Dùng CROSS JOIN với WHERE id IS NOT NULL' },
          { en: 'Use INNER JOIN with GROUP BY', vi: 'Dùng INNER JOIN với GROUP BY' },
          { en: 'FULL OUTER JOIN cannot be emulated', vi: 'Không thể giả lập được FULL OUTER JOIN' }
        ],
        correctAnswers: [0],
        explanation: { en: 'A LEFT JOIN UNIONed with a reversed LEFT JOIN where the other key IS NULL produces a true FULL OUTER JOIN in SQLite.', vi: 'LEFT JOIN kết hợp UNION với một câu LEFT JOIN đảo bảng sẽ tạo ra kết quả FULL OUTER JOIN chuẩn xác trong SQLite.' }
      },
      {
        id: 'sql_q_9_7',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'easy',
        question: { en: 'What does "RIGHT JOIN" do compared to "LEFT JOIN"?', vi: '"RIGHT JOIN" làm gì so với "LEFT JOIN"?' },
        options: [
          { en: 'It preserves all rows from the right table instead of the left table', vi: 'Bảo toàn toàn bộ các dòng từ bảng bên phải thay vì bảng bên trái' },
          { en: 'It sorts data from right to left', vi: 'Sắp xếp dữ liệu từ phải sang trái' },
          { en: 'It deletes data on the right', vi: 'Xóa dữ liệu ở bảng phải' },
          { en: 'It is identical to CROSS JOIN', vi: 'Giống hệt CROSS JOIN' }
        ],
        correctAnswers: [0],
        explanation: { en: 'RIGHT JOIN is the mirror of LEFT JOIN, preserving right-hand records.', vi: 'RIGHT JOIN là ảnh gương của LEFT JOIN, bảo toàn các bản ghi ở bảng bên phải.' }
      },
      {
        id: 'sql_q_9_8',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'medium',
        question: { en: 'When aggregating over a LEFT JOIN, why should you write "COUNT(o.id)" instead of "COUNT(*)" to count orders?', vi: 'Khi tính tổng hợp trên LEFT JOIN, tại sao bạn nên viết "COUNT(o.id)" thay vì "COUNT(*)" để đếm số đơn hàng?' },
        options: [
          { en: 'COUNT(*) counts the preserved master row (returning 1 for 0 orders), whereas COUNT(o.id) correctly returns 0 for NULLs', vi: 'COUNT(*) đếm luôn dòng thực thể chính (trả về 1 dù có 0 đơn hàng), trong khi COUNT(o.id) trả về 0 chính xác khi có NULL' },
          { en: 'COUNT(o.id) is faster on all databases', vi: 'COUNT(o.id) chạy nhanh hơn trên mọi CSDL' },
          { en: 'COUNT(*) is not allowed after LEFT JOIN', vi: 'COUNT(*) không được phép dùng sau LEFT JOIN' },
          { en: 'There is no difference in the result', vi: 'Không có sự khác biệt nào về kết quả' }
        ],
        correctAnswers: [0],
        explanation: { en: 'COUNT(column) ignores NULLs, correctly tallying 0 for unmatched outer join rows.', vi: 'COUNT(cột) bỏ qua NULL nên đếm đúng 0 cho các dòng không khớp trong outer join.' }
      },
      {
        id: 'sql_q_9_9',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'hard',
        question: { en: 'Why is an Anti-Join (LEFT JOIN ... WHERE right.id IS NULL) safer than "WHERE id NOT IN (SELECT foreign_id FROM table_b)"?', vi: 'Tại sao Anti-Join (LEFT JOIN ... WHERE right.id IS NULL) an toàn hơn "WHERE id NOT IN (SELECT foreign_id FROM table_b)"?' },
        options: [
          { en: 'If the subquery in NOT IN contains a single NULL value, the entire NOT IN evaluates to UNKNOWN and returns 0 rows', vi: 'Nếu truy vấn con trong NOT IN chứa dù chỉ một giá trị NULL, toàn bộ biểu thức NOT IN sẽ trả về UNKNOWN và làm mất sạch kết quả (trả về 0 dòng)' },
          { en: 'NOT IN is deprecated in ANSI SQL', vi: 'NOT IN đã bị loại bỏ trong chuẩn ANSI SQL' },
          { en: 'Anti-joins use more memory', vi: 'Anti-join tốn nhiều bộ nhớ hơn' },
          { en: 'NOT IN only works on strings', vi: 'NOT IN chỉ hoạt động trên chuỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Under Three-Valued Logic, `val NOT IN (1, 2, NULL)` evaluates to UNKNOWN, wiping out all query results.', vi: 'Theo logic 3 giá trị, `val NOT IN (1, 2, NULL)` trả về UNKNOWN khiến toàn bộ kết quả bị rỗng.' }
      },
      {
        id: 'sql_q_9_10',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'easy',
        question: { en: 'Which SQL function is commonly used to replace NULLs from outer joins with friendly defaults like 0 or "N/A"?', vi: 'Hàm SQL nào thường được dùng để thay thế giá trị NULL từ outer join bằng giá trị mặc định như 0 hoặc "N/A"?' },
        options: [
          { en: 'COALESCE() / IFNULL()', vi: 'COALESCE() / IFNULL()' },
          { en: 'REPLACE()', vi: 'REPLACE()' },
          { en: 'TRIM()', vi: 'TRIM()' },
          { en: 'DEFAULT()', vi: 'DEFAULT()' }
        ],
        correctAnswers: [0],
        explanation: { en: 'COALESCE(val, fallback) returns fallback if val is NULL.', vi: 'COALESCE(val, fallback) trả về giá trị fallback nếu val là NULL.' }
      },
      {
        id: 'sql_q_9_11',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'medium',
        question: { en: 'What will be returned for a customer with 0 orders when calculating "COALESCE(SUM(amount), 0.0)" with LEFT JOIN?', vi: 'Giá trị trả về cho khách hàng có 0 đơn hàng khi tính "COALESCE(SUM(amount), 0.0)" với LEFT JOIN là gì?' },
        options: [
          { en: '0.0', vi: '0.0' },
          { en: 'NULL', vi: 'NULL' },
          { en: 'NaN', vi: 'NaN' },
          { en: 'Error', vi: 'Báo lỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SUM over NULL values produces NULL, which COALESCE converts cleanly into 0.0.', vi: 'SUM trên các giá trị NULL trả về NULL, sau đó COALESCE chuyển đổi mượt mà thành 0.0.' }
      },
      {
        id: 'sql_q_9_12',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'hard',
        question: { en: 'In a LEFT JOIN of 100 users and 500 orders, if 10 users have never placed an order, how many user groups are formed by "GROUP BY user_id"?', vi: 'Trong phép LEFT JOIN giữa 100 người dùng và 500 đơn hàng, nếu 10 người dùng chưa từng đặt hàng, có bao nhiêu nhóm người dùng được tạo ra bởi "GROUP BY user_id"?' },
        options: [
          { en: '100 groups (all 100 users are preserved)', vi: '100 nhóm (toàn bộ 100 người dùng đều được giữ lại)' },
          { en: '90 groups (only users with orders)', vi: '90 nhóm (chỉ những người dùng có đơn hàng)' },
          { en: '500 groups', vi: '500 nhóm' },
          { en: '10 groups', vi: '10 nhóm' }
        ],
        correctAnswers: [0],
        explanation: { en: 'LEFT JOIN retains all 100 distinct users, so GROUP BY user_id outputs 100 summary rows.', vi: 'LEFT JOIN giữ lại toàn bộ 100 người dùng nên GROUP BY user_id sẽ tạo ra đúng 100 dòng tóm tắt.' }
      },
      {
        id: 'sql_q_9_13',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'easy',
        question: { en: 'Which keyword can be omitted from "LEFT OUTER JOIN" without changing its meaning in standard SQL?', vi: 'Từ khóa nào có thể lược bỏ khỏi "LEFT OUTER JOIN" mà không làm thay đổi ý nghĩa trong chuẩn SQL?' },
        options: [
          { en: 'OUTER', vi: 'OUTER' },
          { en: 'LEFT', vi: 'LEFT' },
          { en: 'JOIN', vi: 'JOIN' },
          { en: 'None can be omitted', vi: 'Không từ nào được phép bỏ' }
        ],
        correctAnswers: [0],
        explanation: { en: '"LEFT JOIN" and "LEFT OUTER JOIN" are syntactically identical.', vi: '"LEFT JOIN" và "LEFT OUTER JOIN" hoàn toàn tương đương nhau về mặt cú pháp.' }
      },
      {
        id: 'sql_q_9_14',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'hard',
        question: { en: 'What is a "Semi-Join" in relational algebra and how does it differ from an INNER JOIN?', vi: '"Semi-Join" trong đại số quan hệ là gì và khác gì so với INNER JOIN?' },
        options: [
          { en: 'A Semi-Join returns rows from Table A that match Table B without duplicating rows from A when multiple matches exist in B (e.g. using EXISTS)', vi: 'Semi-Join trả về các dòng từ Bảng A có khớp với Bảng B nhưng không làm nhân đôi số dòng của A khi có nhiều bản ghi khớp ở B (ví dụ: dùng EXISTS)' },
          { en: 'A Semi-Join only joins half of the table', vi: 'Semi-Join chỉ nối một nửa bảng' },
          { en: 'A Semi-Join is a join without primary keys', vi: 'Semi-Join là phép nối không có khóa chính' },
          { en: 'A Semi-Join is another term for FULL JOIN', vi: 'Semi-Join là tên gọi khác của FULL JOIN' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Semi-joins test for existence without creating row multiplication duplicates in the projection.', vi: 'Semi-join kiểm tra sự tồn tại mà không làm nhân đôi số dòng trong tập kết quả.' }
      },
      {
        id: 'sql_q_9_15',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'medium',
        question: { en: 'When should you choose a LEFT JOIN over an INNER JOIN in reporting queries?', vi: 'Khi nào bạn nên chọn LEFT JOIN thay vì INNER JOIN trong các truy vấn báo cáo?' },
        options: [
          { en: 'Whenever you want to ensure master entities (e.g. products, customers, students) appear even if they have zero associated events', vi: 'Bất cứ khi nào bạn muốn đảm bảo các thực thể chính (như sản phẩm, khách hàng, sinh viên) vẫn xuất hiện dù có 0 sự kiện phát sinh' },
          { en: 'Only when sorting by date', vi: 'Chỉ khi sắp xếp theo ngày' },
          { en: 'Whenever the database has an index on the table', vi: 'Bất cứ khi nào CSDL có chỉ mục trên bảng' },
          { en: 'Only for single-row queries', vi: 'Chỉ dùng cho truy vấn 1 dòng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'LEFT JOIN prevents zero-activity master records from being silently dropped from analytical reports.', vi: 'LEFT JOIN ngăn không cho các bản ghi chính chưa có hoạt động bị âm thầm biến mất khỏi báo cáo phân tích.' }
      },
      {
        id: 'sql_q_9_16',
        type: 'single_choice',
        topicId: 'sql_outer_anti_joins',
        difficulty: 'easy',
        question: { en: 'What will be the value of right-table columns for unmatched rows in a LEFT JOIN?', vi: 'Giá trị của các cột thuộc bảng bên phải đối với các dòng không khớp trong LEFT JOIN là gì?' },
        options: [
          { en: 'NULL', vi: 'NULL' },
          { en: '0', vi: '0' },
          { en: 'Empty string ""', vi: 'Chuỗi rỗng ""' },
          { en: 'Undefined error', vi: 'Lỗi không xác định' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Unmatched right-table columns are always populated with NULL.', vi: 'Các cột bảng phải không có bản ghi khớp luôn được điền giá trị NULL.' }
      }
    ]
  },

  // LESSON 10: Self Joins & Set Operations: UNION, UNION ALL, INTERSECT, EXCEPT
  {
    id: 'sql_lesson_10',
    moduleId: 'sql_mod_2',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 10,
    topicId: 'sql_self_join_set_operations',
    title: {
      en: 'Self Joins & Set Operations: UNION, UNION ALL, INTERSECT, EXCEPT',
      vi: 'Self Joins & Phép Toán Tập Hợp: UNION, UNION ALL, INTERSECT, EXCEPT'
    },
    summary: {
      en: 'Master joining a table to itself for hierarchical and comparative queries, understand mathematical set theory operations (UNION, INTERSECT, EXCEPT), and recognize the huge performance advantage of UNION ALL.',
      vi: 'Làm chủ phép tự kết nối self-join cho dữ liệu phân cấp và so sánh nội bộ, hiểu các phép toán tập hợp toán học (UNION, INTERSECT, EXCEPT) và ưu thế hiệu năng vượt trội của UNION ALL.'
    },
    estimatedMinutes: 24,
    learn: {
      introduction: {
        en: 'Self Joins enable comparing rows within the same physical table (e.g. employee-to-manager hierarchies or finding peers). Set Operations (UNION, UNION ALL, INTERSECT, EXCEPT) combine the results of two or more independent queries into a unified result set.',
        vi: 'Self Join cho phép so sánh các dòng trong cùng một bảng vật lý (ví dụ: cây phân cấp nhân viên - quản lý hoặc tìm đồng nghiệp). Các phép toán tập hợp (UNION, UNION ALL, INTERSECT, EXCEPT) kết hợp kết quả từ hai hay nhiều truy vấn độc lập thành một tập kết quả hợp nhất.'
      },
      conceptExplanation: {
        en: 'A Self Join is simply an INNER or LEFT JOIN where the same table is referenced on both sides with distinct aliases (e.g. employees e JOIN employees m ON e.dept_id = m.dept_id). Set operations operate on entire result sets: UNION combines queries and removes duplicates (requiring a costly sort/hash deduplication pass). UNION ALL simply appends result sets without deduplication, making it significantly faster and the default production choice. INTERSECT returns rows present in both queries. EXCEPT (or MINUS) returns rows in query 1 that are absent from query 2. Rules: All queries in set operations MUST have the exact same number of columns with compatible data types.',
        vi: 'Self Join đơn giản là phép INNER hoặc LEFT JOIN mà cùng một bảng được tham chiếu ở cả hai phía với các bí danh khác nhau. Các phép toán tập hợp thao tác trên toàn bộ tập kết quả: UNION gộp các truy vấn và loại bỏ phần tử trùng lặp (đòi hỏi bước sắp xếp/băm khử trùng tốn kém). UNION ALL chỉ đơn giản là nối đuôi các tập kết quả mà không khử trùng, giúp tốc độ nhanh hơn vượt trội và là lựa chọn mặc định trong môi trường thực tế. INTERSECT trả về các dòng xuất hiện ở cả 2 truy vấn. EXCEPT trả về các dòng có ở truy vấn 1 nhưng không có ở truy vấn 2. Quy tắc: Mọi truy vấn trong phép toán tập hợp BẮT BUỘC phải có cùng số lượng cột và kiểu dữ liệu tương thích.'
      },
      syntax: `-- 1. Self Join Syntax:
SELECT e.name AS employee, m.name AS peer
FROM employees e
JOIN employees m ON e.dept_id = m.dept_id AND e.id != m.id;

-- 2. Set Operations Syntax:
SELECT city FROM students
UNION ALL
SELECT city FROM employees;`,
      examples: [
        {
          title: {
            en: '1. Self Join: Finding Department Co-Workers',
            vi: '1. Self Join: Tìm Các Đồng Nghiệp Cùng Phòng Ban'
          },
          code: `SELECT e1.name AS employee_1,
       e2.name AS employee_2,
       e1.dept_id
FROM employees e1
JOIN employees e2 ON e1.dept_id = e2.dept_id AND e1.id < e2.id
ORDER BY e1.dept_id, e1.name;`,
          language: 'sql',
          explanation: {
            en: 'Pairs distinct employees sharing the same dept_id. Using e1.id < e2.id prevents self-matching (e.id = e.id) and avoids duplicate inverse pairings (A with B and B with A).',
            vi: 'Ghép cặp các nhân viên khác nhau có cùng dept_id. Sử dụng e1.id < e2.id để tránh tự ghép với chính mình và tránh cặp hoán vị trùng lặp (A với B và B với A).'
          }
        },
        {
          title: {
            en: '2. Set Operations: UNION ALL vs INTERSECT vs EXCEPT on Cities',
            vi: '2. Phép Toán Tập Hợp: UNION ALL vs INTERSECT vs EXCEPT Trên Cột Thành Phố'
          },
          code: `-- All cities with occurrences preserved:
SELECT city, 'student' AS source FROM students
UNION ALL
SELECT city, 'employee' AS source FROM employees;

-- Cities that have BOTH students AND employees:
SELECT city FROM students
INTERSECT
SELECT city FROM employees;

-- Cities with students but NO employees:
SELECT city FROM students
EXCEPT
SELECT city FROM employees;`,
          language: 'sql',
          explanation: {
            en: 'Demonstrates set union concatenation with tracking tags, intersection (common elements), and difference subtraction (exclusive elements).',
            vi: 'Minh họa phép hợp nối đuôi kèm nhãn nguồn, phép giao (phần tử chung) và phép hiệu (phần tử độc quyền).'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Defaulting to UNION instead of UNION ALL without needing deduplication',
            vi: 'Lạm dụng UNION thay vì UNION ALL khi không cần khử trùng lặp'
          },
          correction: {
            en: 'UNION performs a costly sorting and deduplication pass over memory/disk. If datasets are disjoint or duplicates are acceptable/desired, ALWAYS use UNION ALL for maximum performance.',
            vi: 'UNION thực hiện bước sắp xếp và khử trùng lặp rất tốn kém trên RAM/ổ đĩa. Nếu hai tập dữ liệu không giao nhau hoặc chấp nhận dữ liệu trùng, LUÔN LUÔN dùng UNION ALL để đạt hiệu năng cao nhất.'
          },
          code: `-- SLOW (Unnecessary deduplication pass):
SELECT id, name FROM archived_logs UNION SELECT id, name FROM active_logs;
-- FAST (High-throughput streaming):
SELECT id, name FROM archived_logs UNION ALL SELECT id, name FROM active_logs;`
        },
        {
          mistake: {
            en: 'Mismatched column counts or types in set operations',
            vi: 'Lệch số lượng cột hoặc không tương thích kiểu dữ liệu trong phép toán tập hợp'
          },
          correction: {
            en: 'All SELECT statements connected by UNION/INTERSECT/EXCEPT must have identical column counts. Column names are determined by the FIRST query.',
            vi: 'Tất cả các câu lệnh SELECT được nối bằng UNION/INTERSECT/EXCEPT bắt buộc phải có cùng số lượng cột. Tên cột kết quả được quyết định bởi câu lệnh SELECT ĐẦU TIÊN.'
          },
          code: `-- ERROR: SELECT id, name FROM students UNION SELECT name FROM employees; -- Column count mismatch!
-- CORRECT:
SELECT id, name FROM students UNION SELECT id, name FROM employees;`
        }
      ],
      tips: [
        {
          en: 'ORDER BY in set operations can only appear ONCE at the very end of the entire compound statement, referencing column names or positions from the first query.',
          vi: 'Mệnh đề ORDER BY trong phép toán tập hợp chỉ được xuất hiện DUY NHẤT MỘT LẦN ở cuối cùng của toàn bộ câu lệnh, tham chiếu theo tên cột của câu lệnh đầu tiên.'
        },
        {
          en: 'Using e1.id < e2.id in self-join matching creates unique undirected pairs without self-loops or symmetry redundancy.',
          vi: 'Sử dụng e1.id < e2.id trong self-join giúp tạo ra các cặp duy nhất không hướng, không bị lặp chính mình và không bị đảo chiều trùng lặp.'
        }
      ],
      practiceStarterCode: `-- Find all unique cities from both students and employees
SELECT city FROM students
UNION
SELECT city FROM employees;`,
      practice: {
        task: {
          en: 'Write a query to find all cities where students exist but NO employees live, using the EXCEPT set operator.',
          vi: 'Viết truy vấn tìm tất cả các thành phố có học viên nhưng KHÔNG CÓ nhân viên nào sinh sống, sử dụng toán tử tập hợp EXCEPT.'
        },
        starterCode: `-- Find student cities with no employees
SELECT city FROM students;`,
        solutionCode: `SELECT city FROM students EXCEPT SELECT city FROM employees;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_10_1',
        type: 'fix_code',
        title: { en: 'Fix Column Count Mismatch in UNION', vi: 'Sửa Lỗi Lệch Số Cột Trong Phép UNION' },
        instruction: {
          en: 'Fix the second query in the UNION by adding "NULL AS score" so both queries have exactly 2 columns.',
          vi: 'Sửa câu lệnh thứ hai trong UNION bằng cách thêm "NULL AS score" để cả hai câu truy vấn có đúng 2 cột.'
        },
        starterCode: 'SELECT name, score FROM students UNION ALL SELECT name FROM employees;',
        solutionCode: 'SELECT name, score FROM students UNION ALL SELECT name, NULL AS score FROM employees;',
        hint: { en: 'Add ", NULL AS score" to the second SELECT statement.', vi: 'Thêm ", NULL AS score" vào câu SELECT thứ hai.' },
        explanation: {
          en: 'All component queries in a set operation must project the exact same number of columns.',
          vi: 'Mọi câu truy vấn thành phần trong phép toán tập hợp bắt buộc phải có cùng số lượng cột.'
        }
      },
      {
        id: 'sql_ex_10_2',
        type: 'complete_code',
        title: { en: 'Complete Self-Join for Co-Workers in Same City', vi: 'Hoàn Thiện Self-Join Cho Đồng Nghiệp Cùng Thành Phố' },
        instruction: {
          en: 'Complete the self-join condition so employees are matched on city with e1.id < e2.id.',
          vi: 'Hoàn thiện điều kiện self-join để nhân viên được ghép cặp theo city với e1.id < e2.id.'
        },
        starterCode: 'SELECT e1.name, e2.name, e1.city FROM employees e1 JOIN employees e2 ON e1.city = e2.city AND e1.id < ;',
        solutionCode: 'SELECT e1.name, e2.name, e1.city FROM employees e1 JOIN employees e2 ON e1.city = e2.city AND e1.id < e2.id;',
        hint: { en: 'Add "e2.id" at the end.', vi: 'Thêm "e2.id" vào cuối.' },
        explanation: {
          en: 'e1.id < e2.id ensures each pair is generated exactly once without self-pairing.',
          vi: 'e1.id < e2.id đảm bảo mỗi cặp chỉ xuất hiện đúng 1 lần và không tự ghép với chính mình.'
        }
      },
      {
        id: 'sql_ex_10_3',
        type: 'write_code',
        title: { en: 'Find Overlapping Cities with INTERSECT', vi: 'Tìm Thành Phố Chung Bằng INTERSECT' },
        instruction: {
          en: 'Write a query using INTERSECT to find all cities present in both the students table and the employees table.',
          vi: 'Viết truy vấn dùng INTERSECT để tìm tất cả các thành phố cùng xuất hiện ở cả bảng students và bảng employees.'
        },
        starterCode: '-- Find common cities using INTERSECT\n',
        solutionCode: 'SELECT city FROM students INTERSECT SELECT city FROM employees;',
        hint: { en: 'SELECT city FROM students INTERSECT SELECT city FROM employees;', vi: 'SELECT city FROM students INTERSECT SELECT city FROM employees;' },
        explanation: {
          en: 'INTERSECT evaluates mathematical set intersection, keeping only rows that exist in both queries.',
          vi: 'INTERSECT tính toán phép giao tập hợp, chỉ giữ lại các dòng tồn tại ở cả 2 câu truy vấn.'
        }
      },
      {
        id: 'sql_ex_10_4',
        type: 'modify_example',
        title: { en: 'Upgrade UNION to High-Performance UNION ALL', vi: 'Nâng Cấp UNION Lên UNION ALL Hiệu Năng Cao' },
        instruction: {
          en: 'Modify the query to use UNION ALL and tag the source with a literal column "type".',
          vi: 'Sửa truy vấn để dùng UNION ALL và gắn nhãn nguồn dữ liệu bằng cột "type".'
        },
        starterCode: 'SELECT name FROM students UNION SELECT name FROM employees;',
        solutionCode: "SELECT name, 'student' AS type FROM students UNION ALL SELECT name, 'employee' AS type FROM employees;",
        hint: { en: "Add 'student' AS type and 'employee' AS type, and use UNION ALL.", vi: "Thêm 'student' AS type và 'employee' AS type, và dùng UNION ALL." },
        explanation: {
          en: 'UNION ALL streams results directly without sorting for uniqueness, maximizing throughput.',
          vi: 'UNION ALL truyền dữ liệu trực tiếp mà không cần sắp xếp khử trùng lặp, tối đa hóa thông lượng.'
        }
      },
      {
        id: 'sql_ex_10_5',
        type: 'predict_output',
        title: { en: 'Predict UNION vs UNION ALL Row Counts', vi: 'Dự Đoán Số Dòng Của UNION vs UNION ALL' },
        instruction: {
          en: 'If Query 1 returns [A, B, C] and Query 2 returns [B, C, D], how many rows are returned by UNION vs UNION ALL?',
          vi: 'Nếu Truy vấn 1 trả về [A, B, C] và Truy vấn 2 trả về [B, C, D], số dòng trả về của UNION vs UNION ALL lần lượt là bao nhiêu?'
        },
        starterCode: '-- Predict set row counts\n',
        solutionCode: 'SELECT 4 AS union_count, 6 AS union_all_count;',
        options: [
          'UNION returns 4 rows [A, B, C, D]; UNION ALL returns 6 rows [A, B, C, B, C, D]',
          'Both return 6 rows',
          'Both return 4 rows',
          'UNION returns 2 rows [B, C]'
        ],
        correctOptionIndex: 0,
        hint: { en: 'UNION deduplicates (4 distinct); UNION ALL simply concatenates (3 + 3 = 6).', vi: 'UNION khử trùng lặp (4 giá trị duy nhất); UNION ALL nối đuôi trực tiếp (3 + 3 = 6).' },
        explanation: {
          en: 'UNION deduplicates the shared B and C items leaving 4 items; UNION ALL preserves all 6 items.',
          vi: 'UNION khử trùng các phần tử chung B và C nên còn 4 phần tử; UNION ALL giữ nguyên cả 6 phần tử.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_10',
      title: { en: 'Unified Personnel Directory & Demographic Set Analysis', vi: 'Danh Bạ Nhân Sự Hợp Nhất & Phân Tích Tập Hợp Nhân Khẩu Học' },
      description: {
        en: 'Write a unified SQL query using UNION ALL that combines students and employees into a single organization-wide directory. For each person, project: their name, their primary affiliation as category (\'Student\' for students, \'Employee\' for employees), their city, and their primary status attribute as details (course name for students, CAST(dept_id AS TEXT) for employees). Exclude any records where city is NULL. Order the combined directory alphabetically by city ASC, then name ASC.',
        vi: 'Viết truy vấn SQL hợp nhất sử dụng UNION ALL kết hợp học viên và nhân viên thành một danh bạ toàn tổ chức duy nhất. Với mỗi người, lấy: tên name, vai trò chính category (\'Student\' cho học viên, \'Employee\' cho nhân viên), thành phố city và thuộc tính trạng thái details (tên khóa học course cho sinh viên, CAST(dept_id AS TEXT) cho nhân viên). Loại bỏ các bản ghi có city là NULL. Sắp xếp danh bạ kết hợp theo thứ tự bảng chữ cái city ASC, sau đó name ASC.'
      },
      requirements: [
        { en: "Select name, 'Student' AS category, city, course AS details FROM students WHERE city IS NOT NULL", vi: "Chọn name, 'Student' AS category, city, course AS details TỪ students CÓ city IS NOT NULL" },
        { en: "Select name, 'Employee' AS category, city, CAST(dept_id AS TEXT) AS details FROM employees WHERE city IS NOT NULL", vi: "Chọn name, 'Employee' AS category, city, CAST(dept_id AS TEXT) AS details TỪ employees CÓ city IS NOT NULL" },
        { en: 'Combine with UNION ALL', vi: 'Kết hợp bằng UNION ALL' },
        { en: 'ORDER BY city ASC, name ASC at the end of the query', vi: 'ORDER BY city ASC, name ASC ở cuối cùng của truy vấn' }
      ],
      starterCode: `-- Write your unified UNION ALL query below
SELECT name, 'Student' AS category, city, course AS details
FROM students
WHERE city IS NOT NULL
UNION ALL
SELECT name, 'Employee' AS category, city, CAST(dept_id AS TEXT) AS details
FROM employees
WHERE city IS NOT NULL
ORDER BY ;`,
      solutionCode: `SELECT name, 'Student' AS category, city, course AS details FROM students WHERE city IS NOT NULL UNION ALL SELECT name, 'Employee' AS category, city, CAST(dept_id AS TEXT) AS details FROM employees WHERE city IS NOT NULL ORDER BY city ASC, name ASC;`,
      hints: [{ en: 'End with ORDER BY city ASC, name ASC.', vi: 'Kết thúc bằng ORDER BY city ASC, name ASC.' }],
      solutionExplanation: {
        en: 'Creates a unified polymorphic directory across heterogeneous schemas with streaming set union and multi-column ordering.',
        vi: 'Tạo danh bạ đa hình hợp nhất trên các lược đồ khác nhau bằng phép hợp tập hợp luồng và sắp xếp đa cột.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_10_v1',
        title: { en: 'Unified Personnel Directory & Demographic Set Analysis', vi: 'Danh Bạ Nhân Sự Hợp Nhất & Phân Tích Tập Hợp Nhân Khẩu Học' },
        description: {
          en: "Combine students and employees using UNION ALL: name, 'Student'/'Employee' AS category, city, details (course / CAST(dept_id AS TEXT)) where city IS NOT NULL, ordered by city ASC, name ASC.",
          vi: "Gộp students và employees dùng UNION ALL: name, 'Student'/'Employee' AS category, city, details (course / CAST(dept_id AS TEXT)) khi city IS NOT NULL, xếp theo city ASC, name ASC."
        },
        requirements: [{ en: 'ORDER BY city ASC, name ASC', vi: 'ORDER BY city ASC, name ASC' }],
        starterCode: `SELECT name, 'Student' AS category, city, course AS details FROM students WHERE city IS NOT NULL UNION ALL SELECT name, 'Employee' AS category, city, CAST(dept_id AS TEXT) AS details FROM employees WHERE city IS NOT NULL;`,
        solutionCode: `SELECT name, 'Student' AS category, city, course AS details FROM students WHERE city IS NOT NULL UNION ALL SELECT name, 'Employee' AS category, city, CAST(dept_id AS TEXT) AS details FROM employees WHERE city IS NOT NULL ORDER BY city ASC, name ASC;`,
        hints: [{ en: 'Add ORDER BY city ASC, name ASC', vi: 'Thêm ORDER BY city ASC, name ASC' }],
        solutionExplanation: { en: 'Unified personnel list across tables.', vi: 'Danh sách nhân sự hợp nhất giữa các bảng.' }
      },
      {
        id: 'sql_ch_10_v2',
        title: { en: 'City Overlap and Disjoint Analysis', vi: 'Phân Tích Giao Thoa & Phân Tách Địa Bàn Thành Phố' },
        description: {
          en: 'Write a query using EXCEPT to find all cities in the students table that have NO matching record in the employees table, ordered by city ASC.',
          vi: 'Viết truy vấn dùng EXCEPT để tìm tất cả các thành phố trong bảng students KHÔNG CÓ bản ghi nào ở bảng employees, sắp xếp city ASC.'
        },
        requirements: [
          { en: 'SELECT city FROM students WHERE city IS NOT NULL', vi: 'SELECT city FROM students WHERE city IS NOT NULL' },
          { en: 'EXCEPT SELECT city FROM employees WHERE city IS NOT NULL ORDER BY city ASC', vi: 'EXCEPT SELECT city FROM employees WHERE city IS NOT NULL ORDER BY city ASC' }
        ],
        starterCode: `SELECT city FROM students WHERE city IS NOT NULL EXCEPT SELECT city FROM employees WHERE city IS NOT NULL;`,
        solutionCode: `SELECT city FROM students WHERE city IS NOT NULL EXCEPT SELECT city FROM employees WHERE city IS NOT NULL ORDER BY city ASC;`,
        hints: [{ en: 'Add ORDER BY city ASC at the end.', vi: 'Thêm ORDER BY city ASC ở cuối.' }],
        solutionExplanation: { en: 'Extracts exclusive student geographic markets.', vi: 'Trích xuất các thị trường địa lý học viên độc quyền.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_10_1',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'easy',
        question: { en: 'What is a "Self Join" in SQL?', vi: '"Self Join" trong SQL là gì?' },
        options: [
          { en: 'Joining a table to itself using distinct table aliases', vi: 'Kết nối một bảng với chính nó bằng cách sử dụng các bí danh bảng khác nhau' },
          { en: 'Joining a table without an ON condition', vi: 'Kết nối một bảng mà không cần điều kiện ON' },
          { en: 'A join that executes inside a loop', vi: 'Một phép nối thực thi bên trong vòng lặp' },
          { en: 'A join between two temporary tables', vi: 'Phép nối giữa hai bảng tạm' }
        ],
        correctAnswers: [0],
        explanation: { en: 'A Self Join treats the same table as two virtual entities by assigning distinct aliases (e.g. e1 and e2).', vi: 'Self Join xem cùng một bảng như 2 thực thể ảo bằng cách đặt các bí danh khác nhau (ví dụ: e1 và e2).' }
      },
      {
        id: 'sql_q_10_2',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'medium',
        question: { en: 'Why is e1.id < e2.id commonly used in self-joins when finding peer pairs?', vi: 'Tại sao điều kiện e1.id < e2.id thường được dùng trong self-join khi tìm các cặp đồng nghiệp?' },
        options: [
          { en: 'It prevents an entity from pairing with itself and prevents redundant duplicate reverse pairs (A,B and B,A)', vi: 'Nó ngăn một thực thể tự ghép cặp với chính mình và tránh các cặp hoán vị trùng lặp (A,B và B,A)' },
          { en: 'It forces the query to use an index seek', vi: 'Bắt truy vấn phải dùng tìm kiếm chỉ mục Index Seek' },
          { en: 'It is required by the SQL compiler syntax', vi: 'Bắt buộc bởi cú pháp trình biên dịch SQL' },
          { en: 'It sorts the table in descending order', vi: 'Sắp xếp bảng theo thứ tự giảm dần' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The strict inequality `<` ensures each distinct unordered pair is emitted exactly once.', vi: 'Bất đẳng thức ngặt `<` đảm bảo mỗi cặp phân biệt không thứ tự chỉ xuất hiện đúng 1 lần duy nhất.' }
      },
      {
        id: 'sql_q_10_3',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'easy',
        question: { en: 'What is the critical performance difference between UNION and UNION ALL?', vi: 'Khác biệt hiệu năng cốt lõi giữa UNION và UNION ALL là gì?' },
        options: [
          { en: 'UNION performs a costly sorting and deduplication pass, whereas UNION ALL simply concatenates rows with maximum speed', vi: 'UNION thực hiện bước sắp xếp và khử trùng lặp tốn kém, trong khi UNION ALL chỉ nối đuôi các dòng với tốc độ tối đa' },
          { en: 'UNION ALL is slower because it counts rows twice', vi: 'UNION ALL chậm hơn vì nó đếm dòng hai lần' },
          { en: 'UNION ALL deletes data from memory', vi: 'UNION ALL xóa dữ liệu khỏi bộ nhớ' },
          { en: 'There is no performance difference', vi: 'Không có sự khác biệt nào về hiệu năng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'UNION ALL streams directly without sorting or building hash sets for deduplication, making it significantly faster.', vi: 'UNION ALL truyền dữ liệu trực tiếp mà không cần sắp xếp hay tạo bảng băm để khử trùng, giúp nó nhanh hơn rõ rệt.' }
      },
      {
        id: 'sql_q_10_4',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'easy',
        question: { en: 'What requirement MUST be met by all queries participating in a set operation (UNION, INTERSECT, EXCEPT)?', vi: 'Yêu cầu nào BẮT BUỘC phải thỏa mãn đối với tất cả các câu truy vấn tham gia phép toán tập hợp (UNION, INTERSECT, EXCEPT)?' },
        options: [
          { en: 'They must have the exact same number of columns with compatible data types in corresponding positions', vi: 'Phải có cùng chính xác số lượng cột với các kiểu dữ liệu tương thích ở các vị trí tương ứng' },
          { en: 'They must have identical table names', vi: 'Phải có cùng tên bảng' },
          { en: 'They must have the same number of rows', vi: 'Phải có cùng số lượng dòng' },
          { en: 'They must all have WHERE clauses', vi: 'Tất cả đều phải có mệnh đề WHERE' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Set theory rules require positional parity in column count and type compatibility.', vi: 'Quy tắc lý thuyết tập hợp đòi hỏi sự đồng nhất theo vị trí về số lượng cột và tương thích kiểu dữ liệu.' }
      },
      {
        id: 'sql_q_10_5',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'medium',
        question: { en: 'What does the INTERSECT operator do in SQL?', vi: 'Toán tử INTERSECT làm gì trong SQL?' },
        options: [
          { en: 'Returns only rows that are returned by BOTH the first and second queries', vi: 'Chỉ trả về các dòng xuất hiện ở CẢ HAI câu truy vấn thứ nhất và thứ hai' },
          { en: 'Combines all rows with duplicates', vi: 'Kết hợp tất cả các dòng kèm dữ liệu trùng' },
          { en: 'Deletes matching rows', vi: 'Xóa các dòng khớp nhau' },
          { en: 'Performs a Cartesian product', vi: 'Thực hiện phép tích Descartes' }
        ],
        correctAnswers: [0],
        explanation: { en: 'INTERSECT computes the mathematical intersection between two query results.', vi: 'INTERSECT tính toán phép giao toán học giữa kết quả của hai truy vấn.' }
      },
      {
        id: 'sql_q_10_6',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'medium',
        question: { en: 'What does the EXCEPT (or MINUS in Oracle) operator do in SQL?', vi: 'Toán tử EXCEPT (hoặc MINUS trong Oracle) làm gì trong SQL?' },
        options: [
          { en: 'Returns rows present in the first query that are ABSENT from the second query', vi: 'Trả về các dòng có trong câu truy vấn thứ nhất nhưng VẮNG MẶT ở câu truy vấn thứ hai' },
          { en: 'Returns all rows except the first row', vi: 'Trả về tất cả các dòng trừ dòng đầu tiên' },
          { en: 'Catches SQL execution exceptions', vi: 'Bắt các ngoại lệ thực thi SQL' },
          { en: 'Returns only duplicates', vi: 'Chỉ trả về các phần tử trùng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'EXCEPT computes set difference (A - B).', vi: 'EXCEPT tính toán phép hiệu tập hợp (A - B).' }
      },
      {
        id: 'sql_q_10_7',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'easy',
        question: { en: 'Where can the ORDER BY clause be placed when using set operators like UNION or EXCEPT?', vi: 'Mệnh đề ORDER BY được phép đặt ở đâu khi sử dụng các toán tử tập hợp như UNION hoặc EXCEPT?' },
        options: [
          { en: 'Only ONCE at the very end of the compound query, sorting the entire final result', vi: 'Chỉ DUY NHẤT MỘT LẦN ở cuối cùng của câu truy vấn phức hợp, sắp xếp toàn bộ kết quả cuối' },
          { en: 'After each individual SELECT statement', vi: 'Sau mỗi câu lệnh SELECT đơn lẻ' },
          { en: 'Inside the FROM clause', vi: 'Bên trong mệnh đề FROM' },
          { en: 'ORDER BY cannot be used with set operations', vi: 'ORDER BY không được dùng trong phép toán tập hợp' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ANSI SQL restricts ORDER BY to the final statement of a compound query.', vi: 'ANSI SQL quy định ORDER BY chỉ đứng ở câu lệnh cuối cùng của truy vấn phức hợp.' }
      },
      {
        id: 'sql_q_10_8',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'medium',
        question: { en: 'Which column names are used in the final result set when two queries with different aliases are combined with UNION?', vi: 'Tên cột nào được sử dụng trong tập kết quả cuối khi hai truy vấn có bí danh khác nhau được gộp bằng UNION?' },
        options: [
          { en: 'The column names / aliases defined in the FIRST query', vi: 'Tên cột / bí danh được định nghĩa trong câu truy vấn ĐẦU TIÊN' },
          { en: 'The column names defined in the second query', vi: 'Tên cột được định nghĩa trong câu truy vấn thứ hai' },
          { en: 'A concatenation of both names (col1_col2)', vi: 'Nối tên của cả hai (col1_col2)' },
          { en: 'Default names like col_1, col_2', vi: 'Tên mặc định như col_1, col_2' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The schema headers of a set operation are strictly established by the first SELECT statement.', vi: 'Tiêu đề cột của phép toán tập hợp được thiết lập cố định bởi câu lệnh SELECT đầu tiên.' }
      },
      {
        id: 'sql_q_10_9',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'hard',
        question: { en: 'In standard SQL set operations (UNION, INTERSECT, EXCEPT), how are NULL values compared during deduplication?', vi: 'Trong các phép toán tập hợp chuẩn SQL (UNION, INTERSECT, EXCEPT), các giá trị NULL được so sánh như thế nào khi khử trùng lặp?' },
        options: [
          { en: 'Two NULL values are treated as EQUAL and distinct duplicates of NULL are eliminated', vi: 'Hai giá trị NULL được coi là BẰNG NHAU và các bản sao trùng lặp của NULL sẽ bị loại bỏ' },
          { en: 'NULL values are never matched and cause an infinite loop', vi: 'Giá trị NULL không bao giờ khớp và gây ra vòng lặp vô tận' },
          { en: 'NULL values trigger an exception in UNION', vi: 'Giá trị NULL gây ra ngoại lệ trong UNION' },
          { en: 'Every NULL creates a new unique row in UNION', vi: 'Mỗi NULL tạo thành một dòng mới duy nhất trong UNION' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Set operators treat NULLs as equal for deduplication and intersection purposes.', vi: 'Các toán tử tập hợp coi NULL là tương đương nhau phục vụ cho mục đích khử trùng lặp và phép giao.' }
      },
      {
        id: 'sql_q_10_10',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'medium',
        question: { en: 'How can you identify employees who earn more than their direct manager using a self-join?', vi: 'Làm thế nào để xác định các nhân viên có mức lương cao hơn người quản lý trực tiếp của họ bằng self-join?' },
        options: [
          { en: 'FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary', vi: 'FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary' },
          { en: 'FROM employees e WHERE salary > AVG(salary)', vi: 'FROM employees e WHERE salary > AVG(salary)' },
          { en: 'FROM employees e JOIN employees m ON e.id = m.id', vi: 'FROM employees e JOIN employees m ON e.id = m.id' },
          { en: 'UNION ALL on salary', vi: 'UNION ALL trên salary' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Joining worker record (e) to manager record (m) on e.manager_id = m.id allows direct salary comparison in WHERE.', vi: 'Nối bản ghi nhân viên (e) với quản lý (m) qua e.manager_id = m.id cho phép so sánh trực tiếp lương trong WHERE.' }
      },
      {
        id: 'sql_q_10_11',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'easy',
        question: { en: 'What is the mathematical set operation corresponding to "Query A EXCEPT Query B"?', vi: 'Phép toán tập hợp toán học tương ứng với "Query A EXCEPT Query B" là gì?' },
        options: [
          { en: 'Set Difference (A \\ B)', vi: 'Phép hiệu tập hợp (A \\ B)' },
          { en: 'Set Union (A U B)', vi: 'Phép hợp tập hợp (A U B)' },
          { en: 'Set Intersection (A ∩ B)', vi: 'Phép giao tập hợp (A ∩ B)' },
          { en: 'Cartesian Product (A x B)', vi: 'Tích Descartes (A x B)' }
        ],
        correctAnswers: [0],
        explanation: { en: 'EXCEPT subtracts set B from set A.', vi: 'EXCEPT lấy tập hợp A trừ đi tập hợp B.' }
      },
      {
        id: 'sql_q_10_12',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'hard',
        question: { en: 'What is the precedence among set operators in standard SQL when parentheses are not used (e.g. A UNION B INTERSECT C)?', vi: 'Thứ tự ưu tiên giữa các toán tử tập hợp trong chuẩn SQL khi không dùng dấu ngoặc là gì (ví dụ: A UNION B INTERSECT C)?' },
        options: [
          { en: 'INTERSECT has higher precedence than UNION and EXCEPT', vi: 'INTERSECT có độ ưu tiên cao hơn UNION và EXCEPT' },
          { en: 'UNION has higher precedence than INTERSECT', vi: 'UNION có độ ưu tiên cao hơn INTERSECT' },
          { en: 'They all have equal precedence and evaluate strictly left-to-right', vi: 'Tất cả có cùng độ ưu tiên và đánh giá từ trái sang phải' },
          { en: 'EXCEPT has the highest precedence', vi: 'EXCEPT có độ ưu tiên cao nhất' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Just as multiplication precedes addition, INTERSECT has higher precedence than UNION/EXCEPT in ANSI SQL.', vi: 'Tương tự phép nhân ưu tiên hơn phép cộng, INTERSECT có độ ưu tiên cao hơn UNION/EXCEPT trong chuẩn ANSI SQL.' }
      },
      {
        id: 'sql_q_10_13',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'medium',
        question: { en: 'Can you use UNION ALL to combine data from tables located on different databases or servers?', vi: 'Bạn có thể dùng UNION ALL để gộp dữ liệu từ các bảng nằm trên các CSDL hoặc máy chủ khác nhau không?' },
        options: [
          { en: 'Yes, as long as the application or database link (federated query) can query both sources with matching column types', vi: 'Có, miễn là ứng dụng hoặc liên kết CSDL (federated query) có thể truy vấn cả 2 nguồn với kiểu cột tương thích' },
          { en: 'No, UNION ALL only works within a single table', vi: 'Không, UNION ALL chỉ hoạt động trong một bảng duy nhất' },
          { en: 'Only if both databases are PostgreSQL', vi: 'Chỉ khi cả 2 CSDL đều là PostgreSQL' },
          { en: 'Only for views', vi: 'Chỉ dùng cho views' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Set operations combine queries, regardless of how the underlying tables are stored.', vi: 'Các phép toán tập hợp kết hợp kết quả truy vấn, bất kể bảng nguồn được lưu trữ ở đâu.' }
      },
      {
        id: 'sql_q_10_14',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'easy',
        question: { en: 'How many rows will "SELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 1" return?', vi: '"SELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 1" sẽ trả về bao nhiêu dòng?' },
        options: [
          { en: '3 rows', vi: '3 dòng' },
          { en: '1 row', vi: '1 dòng' },
          { en: '0 rows', vi: '0 dòng' },
          { en: 'Error', vi: 'Báo lỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'UNION ALL preserves all duplicates without filtering, returning all 3 rows.', vi: 'UNION ALL giữ lại toàn bộ các bản ghi trùng lặp, trả về đủ 3 dòng.' }
      },
      {
        id: 'sql_q_10_15',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'hard',
        question: { en: 'What happens when you self-join a table on a non-unique column (e.g. ON e1.dept_id = e2.dept_id) without any other filter?', vi: 'Điều gì xảy ra khi bạn self-join một bảng trên một cột không duy nhất mà không có bộ lọc nào khác?' },
        options: [
          { en: 'It generates N_k^2 rows for each department with N_k employees, including self-matches (e1.id = e2.id) and reciprocal pairs', vi: 'Tạo ra N_k^2 dòng cho mỗi phòng ban có N_k nhân viên, bao gồm cả tự ghép chính mình và các cặp đảo ngược' },
          { en: 'It only pairs the first two employees', vi: 'Chỉ ghép cặp hai nhân viên đầu tiên' },
          { en: 'It throws a foreign key exception', vi: 'Báo lỗi khóa ngoại' },
          { en: 'It deletes duplicate employees', vi: 'Xóa các nhân viên trùng lặp' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Without inequality filters (id < id), it creates a full quadratic combination for each group.', vi: 'Nếu thiếu điều kiện bất đẳng thức (id < id), nó sẽ tạo ra tổ hợp bậc hai đầy đủ cho từng nhóm.' }
      },
      {
        id: 'sql_q_10_16',
        type: 'single_choice',
        topicId: 'sql_self_join_set_operations',
        difficulty: 'easy',
        question: { en: 'Which set operator would you use to find customers who made purchases in 2023 AND also made purchases in 2024?', vi: 'Toán tử tập hợp nào bạn sẽ dùng để tìm các khách hàng đã mua hàng năm 2023 VÀ ĐỒNG THỜI cũng mua hàng năm 2024?' },
        options: [
          { en: 'INTERSECT', vi: 'INTERSECT' },
          { en: 'UNION ALL', vi: 'UNION ALL' },
          { en: 'EXCEPT', vi: 'EXCEPT' },
          { en: 'CROSS JOIN', vi: 'CROSS JOIN' }
        ],
        correctAnswers: [0],
        explanation: { en: 'INTERSECT finds elements common to both yearly customer subsets.', vi: 'INTERSECT tìm các phần tử chung của cả hai tập khách hàng theo năm.' }
      }
    ]
  }
];

// Now compile all Tier 2 lessons (Lessons 6 to 10)
const allTier2: Lesson[] = [...lessons6and7, ...lesson8, ...lessons9and10];

const targetDir = path.resolve(process.cwd(), 'src/data/sql');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetFile = path.join(targetDir, 'sqlLessonsTier2.ts');
const fileContent = `import { Lesson } from '../../types';

export const sqlLessonsTier2: Lesson[] = ${JSON.stringify(allTier2, null, 2)};
`;

fs.writeFileSync(targetFile, fileContent, 'utf-8');
console.log(`Successfully generated Tier 2 lessons: ${allTier2.length} lessons written to ${targetFile}`);
