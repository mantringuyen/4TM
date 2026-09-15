import * as fs from 'fs';
import * as path from 'path';
import { Lesson } from '../src/types';
import { tier2Lessons as lessons6and7 } from './generateTier2';

export const remainingTier2Lessons: Lesson[] = [
  // LESSON 8: Inner & Cross Joins: Relational Algebra & Cartesian Product
  {
    id: 'sql_lesson_8',
    moduleId: 'sql_mod_2',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 8,
    topicId: 'sql_inner_cross_join',
    title: {
      en: 'Inner & Cross Joins: Relational Algebra & Cartesian Product',
      vi: 'Kết Nối INNER & CROSS JOIN: Đại Số Quan Hệ & Tích Descartes'
    },
    summary: {
      en: 'Master relational equi-joins, multi-table joins, table aliasing, join condition predicate placement, and avoiding accidental Cartesian products with CROSS JOIN.',
      vi: 'Làm chủ phép nối bằng equi-join, kết nối nhiều bảng, đặt bí danh bảng, vị trí điều kiện nối và tránh bẫy bùng nổ tích Descartes với CROSS JOIN.'
    },
    estimatedMinutes: 22,
    learn: {
      introduction: {
        en: 'Relational databases divide data into distinct normalized entities to reduce redundancy. JOIN operators combine rows from two or more tables based on a related column (typically Primary Key to Foreign Key).',
        vi: 'Cơ sở dữ liệu quan hệ chia dữ liệu thành các thực thể chuẩn hóa riêng biệt để tránh dư thừa. Phép toán JOIN kết hợp các dòng từ hai hay nhiều bảng dựa trên cột liên kết (thường là Khóa chính sang Khóa ngoại).'
      },
      conceptExplanation: {
        en: 'An INNER JOIN produces rows only when there is a match in both tables based on the join predicate (ON clause). If a row in the left table has no matching foreign key in the right table, it is completely excluded from the result. A CROSS JOIN produces a Cartesian Product—every row in table A matched with every row in table B (yielding N * M rows). Inadvertently omitting the ON clause in older comma-separated joins results in an accidental Cartesian explosion.',
        vi: 'INNER JOIN chỉ tạo ra các dòng khi có sự trùng khớp ở cả hai bảng dựa trên vị từ nối (mệnh đề ON). Nếu một dòng ở bảng trái không có khóa ngoại khớp ở bảng phải, nó sẽ bị loại bỏ hoàn toàn. CROSS JOIN tạo ra tích Descartes—mỗi dòng ở bảng A kết hợp với mọi dòng ở bảng B (tạo ra N * M dòng). Quên điều kiện ON trong cú pháp nối bằng dấu phẩy kiểu cũ sẽ dẫn đến bùng nổ tích Descartes ngoài ý muốn.'
      },
      syntax: `SELECT a.col1, b.col2, c.col3
FROM table_a a
INNER JOIN table_b b ON a.foreign_key = b.primary_key
INNER JOIN table_c c ON b.other_key = c.id
WHERE a.status = 'active';`,
      examples: [
        {
          title: {
            en: '1. Joining Students and Orders on Customer Name',
            vi: '1. Kết Nối Bảng Học Viên và Đơn Hàng Qua Tên Khách Hàng'
          },
          code: `SELECT s.id AS student_id,
       s.name,
       s.course,
       o.id AS order_id,
       o.product,
       o.amount
FROM students s
INNER JOIN orders o ON s.name = o.customer_name
WHERE o.amount > 50.0
ORDER BY o.amount DESC;`,
          language: 'sql',
          explanation: {
            en: 'Retrieves all order records matched with registered students where the transaction amount is greater than $50.',
            vi: 'Trích xuất toàn bộ đơn hàng khớp với học viên đã đăng ký có giá trị giao dịch lớn hơn 50 USD.'
          }
        },
        {
          title: {
            en: '2. Multi-Table Join with Aggregation',
            vi: '2. Kết Nối Nhiều Bảng Kết Hợp Với Gom Nhóm Tổng Hợp'
          },
          code: `SELECT s.name,
       s.course,
       COUNT(o.id) AS total_orders,
       SUM(o.amount) AS total_spent
FROM students s
JOIN orders o ON s.name = o.customer_name
GROUP BY s.name, s.course
ORDER BY total_spent DESC;`,
          language: 'sql',
          explanation: {
            en: 'Calculates the order volume and total lifetime spend for each student who has placed at least one order.',
            vi: 'Tính toán tổng số đơn và tổng chi tiêu trọn đời cho mỗi học viên đã từng có ít nhất một đơn hàng.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Omitting the ON condition or writing legacy comma-joins',
            vi: 'Quên mệnh đề ON hoặc dùng cú pháp nối dấu phẩy kiểu cũ'
          },
          correction: {
            en: 'Always use explicit explicit ANSI JOIN syntax with an ON condition (e.g. FROM a JOIN b ON a.id = b.a_id). Comma-joins (FROM a, b) easily lead to catastrophic cartesian explosion if the WHERE clause is missed.',
            vi: 'Luôn sử dụng cú pháp ANSI JOIN rõ ràng với mệnh đề ON. Cú pháp dấu phẩy cũ (FROM a, b) rất dễ gây ra tích Descartes thảm họa nếu vô tình thiếu WHERE.'
          },
          code: `-- DANGEROUS LEGACY: SELECT * FROM students, orders; -- Returns N * M rows!
-- SAFE & IDIOMATIC:
SELECT s.name, o.product FROM students s JOIN orders o ON s.name = o.customer_name;`
        },
        {
          mistake: {
            en: 'Ambiguous column name references in SELECT without table prefixes',
            vi: 'Tham chiếu tên cột mơ hồ trong SELECT mà không có tiền tố bảng'
          },
          correction: {
            en: 'When both tables share a column name (such as id or created_at), you must prefix the column with its table alias (e.g. s.id, o.id).',
            vi: 'Khi cả hai bảng có cùng tên cột (như id hoặc created_at), bạn bắt buộc phải chỉ rõ tiền tố bí danh bảng (ví dụ: s.id, o.id).'
          },
          code: `-- BAD (Ambiguous Error): SELECT id, name, product FROM students s JOIN orders o ON s.name = o.customer_name;
-- GOOD:
SELECT s.id AS student_id, s.name, o.id AS order_id, o.product FROM students s JOIN orders o ON s.name = o.customer_name;`
        }
      ],
      tips: [
        {
          en: 'In standard SQL, INNER JOIN and JOIN are completely identical keywords.',
          vi: 'Trong chuẩn SQL, từ khóa INNER JOIN và JOIN hoàn toàn đồng nghĩa và tương đương nhau.'
        },
        {
          en: 'Table aliases (e.g. employees e) make complex multi-table queries concise and prevent name collisions.',
          vi: 'Bí danh bảng (ví dụ: employees e) giúp câu lệnh nối nhiều bảng ngắn gọn và tránh xung đột tên cột.'
        }
      ],
      practiceStarterCode: `-- Join students and orders to see purchases
SELECT s.name, s.course, o.product, o.amount
FROM students s
INNER JOIN orders o ON s.name = o.customer_name;`,
      practice: {
        task: {
          en: 'Write an INNER JOIN query between students and orders to find all orders for students enrolled in the "SQL" course.',
          vi: 'Viết truy vấn INNER JOIN giữa students và orders để tìm tất cả đơn hàng của các học viên đang học khóa "SQL".'
        },
        starterCode: `-- Join students and orders filtered by course = 'SQL'
SELECT s.name, o.product, o.amount
FROM students s
JOIN orders o ON s.name = o.customer_name;`,
        solutionCode: `SELECT s.name, o.product, o.amount FROM students s JOIN orders o ON s.name = o.customer_name WHERE s.course = 'SQL';`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_8_1',
        type: 'fix_code',
        title: { en: 'Fix Ambiguous Column Error in JOIN', vi: 'Sửa Lỗi Tên Cột Mơ Hồ Khi JOIN' },
        instruction: {
          en: 'Fix the query by qualifying the ambiguous column "id" with the table alias "s.id".',
          vi: 'Sửa truy vấn bằng cách bổ sung tiền tố bí danh bảng "s.id" cho cột id đang bị mơ hồ.'
        },
        starterCode: 'SELECT id, s.name, o.product FROM students s JOIN orders o ON s.name = o.customer_name;',
        solutionCode: 'SELECT s.id, s.name, o.product FROM students s JOIN orders o ON s.name = o.customer_name;',
        hint: { en: 'Change "id" to "s.id".', vi: 'Đổi "id" thành "s.id".' },
        explanation: {
          en: 'When multiple tables in a join share the same column name, qualifying with table aliases resolves ambiguity.',
          vi: 'Khi nhiều bảng trong phép join có cùng tên cột, tiền tố bí danh bảng giúp giải quyết sự mơ hồ.'
        }
      },
      {
        id: 'sql_ex_8_2',
        type: 'complete_code',
        title: { en: 'Complete Multi-Table Equi-Join ON Clause', vi: 'Hoàn Thiện Mệnh Đề ON Trong Equi-Join' },
        instruction: {
          en: 'Complete the ON condition matching students.name to orders.customer_name.',
          vi: 'Hoàn thiện điều kiện ON so khớp students.name với orders.customer_name.'
        },
        starterCode: 'SELECT s.name, o.product, o.amount FROM students s INNER JOIN orders o ON  = o.customer_name;',
        solutionCode: 'SELECT s.name, o.product, o.amount FROM students s INNER JOIN orders o ON s.name = o.customer_name;',
        hint: { en: 'Add s.name before the equals sign.', vi: 'Thêm s.name vào trước dấu bằng.' },
        explanation: {
          en: 'The ON clause explicitly specifies the matching keys between tables.',
          vi: 'Mệnh đề ON chỉ định chính xác các cột khóa liên kết giữa các bảng.'
        }
      },
      {
        id: 'sql_ex_8_3',
        type: 'write_code',
        title: { en: 'Aggregate Spending Across Inner Joined Tables', vi: 'Tính Tổng Chi Tiêu Qua Các Bảng Đã Kết Nối' },
        instruction: {
          en: 'Write a query selecting s.name and SUM(o.amount) AS total_spent FROM students s JOIN orders o ON s.name = o.customer_name GROUP BY s.name.',
          vi: 'Viết truy vấn chọn s.name và SUM(o.amount) AS total_spent TỪ students s JOIN orders o ON s.name = o.customer_name GOM THEO s.name.'
        },
        starterCode: '-- Select student name and total spent\n',
        solutionCode: 'SELECT s.name, SUM(o.amount) AS total_spent FROM students s JOIN orders o ON s.name = o.customer_name GROUP BY s.name;',
        hint: { en: 'Use GROUP BY s.name;', vi: 'Dùng GROUP BY s.name;' },
        explanation: {
          en: 'Combines relational join matching with aggregate reduction.',
          vi: 'Kết hợp phép nối quan hệ với việc gom nhóm tính tổng dữ liệu.'
        }
      },
      {
        id: 'sql_ex_8_4',
        type: 'modify_example',
        title: { en: 'Filter Joined Records with WHERE Condition', vi: 'Lọc Dữ Liệu Đã Nối Bằng Điều Kiện WHERE' },
        instruction: {
          en: 'Modify the join query to only return orders where amount is greater than 100.0.',
          vi: 'Sửa câu lệnh join để chỉ lấy các đơn hàng có giá trị amount lớn hơn 100.0.'
        },
        starterCode: 'SELECT s.name, o.product, o.amount FROM students s JOIN orders o ON s.name = o.customer_name;',
        solutionCode: 'SELECT s.name, o.product, o.amount FROM students s JOIN orders o ON s.name = o.customer_name WHERE o.amount > 100.0;',
        hint: { en: 'Add WHERE o.amount > 100.0 at the end.', vi: 'Thêm WHERE o.amount > 100.0 vào cuối câu lệnh.' },
        explanation: {
          en: 'WHERE filters the joined result set after the relation is constructed.',
          vi: 'WHERE lọc tập kết quả sau khi phép nối quan hệ đã được tạo.'
        }
      },
      {
        id: 'sql_ex_8_5',
        type: 'predict_output',
        title: { en: 'Predict Cartesian Product Row Count', vi: 'Dự Đoán Số Dòng Của Tích Descartes' },
        instruction: {
          en: 'If Table A has 5 rows and Table B has 10 rows, how many rows are returned by a CROSS JOIN (or comma-join without WHERE)?',
          vi: 'Nếu Bảng A có 5 dòng và Bảng B có 10 dòng, phép CROSS JOIN (hoặc nối dấu phẩy không WHERE) trả về bao nhiêu dòng?'
        },
        starterCode: '-- Calculate Cartesian product\n',
        solutionCode: 'SELECT 5 * 10 AS total_rows;',
        options: ['50 rows (5 * 10)', '15 rows (5 + 10)', '10 rows', '5 rows'],
        correctOptionIndex: 0,
        hint: { en: 'Cross join computes the Cartesian product (N * M).', vi: 'Phép cross join tính tích Descartes (N * M).' },
        explanation: {
          en: 'A Cartesian product pairs every row in A with every row in B, resulting in 5 * 10 = 50 rows.',
          vi: 'Tích Descartes kết hợp mỗi dòng của A với mọi dòng của B, tạo ra 5 * 10 = 50 dòng.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_8',
      title: { en: 'Student E-Commerce Order Analysis Report', vi: 'Báo Cáo Phân Tích Đơn Hàng Thương Mại Điện Tử Của Học Viên' },
      description: {
        en: 'Write a SQL query that joins the students and orders tables. For each student who has placed orders, retrieve their name, their enrolled course, the total number of orders placed as order_count, the total money spent as total_spent, and their highest single order amount as max_order. Filter the results to only include students who have spent a total of at least 80.0. Order the result by total_spent DESC.',
        vi: 'Viết truy vấn SQL kết nối bảng students và orders. Với mỗi học viên có phát sinh đơn hàng, lấy tên name, khóa học course, tổng số đơn đã mua order_count, tổng tiền đã tiêu total_spent và giá trị đơn lớn nhất max_order. Chỉ lấy những học viên có tổng chi tiêu từ 80.0 trở lên. Sắp xếp kết quả theo total_spent DESC.'
      },
      requirements: [
        { en: 'Select s.name, s.course, COUNT(o.id) AS order_count', vi: 'Chọn s.name, s.course, COUNT(o.id) AS order_count' },
        { en: 'Calculate SUM(o.amount) AS total_spent, MAX(o.amount) AS max_order', vi: 'Tính SUM(o.amount) AS total_spent, MAX(o.amount) AS max_order' },
        { en: 'INNER JOIN orders o ON s.name = o.customer_name', vi: 'INNER JOIN orders o ON s.name = o.customer_name' },
        { en: 'GROUP BY s.name, s.course HAVING SUM(o.amount) >= 80.0 ORDER BY total_spent DESC', vi: 'GROUP BY s.name, s.course HAVING SUM(o.amount) >= 80.0 ORDER BY total_spent DESC' }
      ],
      starterCode: `-- Write your SQL query below
SELECT s.name, s.course
FROM students s
JOIN orders o ON 
GROUP BY 
HAVING ;`,
      solutionCode: `SELECT s.name, s.course, COUNT(o.id) AS order_count, SUM(o.amount) AS total_spent, MAX(o.amount) AS max_order FROM students s JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course HAVING SUM(o.amount) >= 80.0 ORDER BY total_spent DESC;`,
      hints: [{ en: 'Join on s.name = o.customer_name and use HAVING SUM(o.amount) >= 80.0', vi: 'Nối theo s.name = o.customer_name và dùng HAVING SUM(o.amount) >= 80.0' }],
      solutionExplanation: {
        en: 'Connects entities via equi-join, reduces records with multi-dimensional grouping, and filters high-value accounts with HAVING.',
        vi: 'Kết nối các thực thể qua phép nối bằng, gom nhóm đa chiều và lọc tài khoản chi tiêu cao bằng HAVING.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_8_v1',
        title: { en: 'Student E-Commerce Order Analysis Report', vi: 'Báo Cáo Phân Tích Đơn Hàng Thương Mại Điện Tử Của Học Viên' },
        description: {
          en: 'Retrieve s.name, s.course, COUNT(o.id) AS order_count, SUM(o.amount) AS total_spent, MAX(o.amount) AS max_order from students s JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course HAVING SUM(o.amount) >= 80.0 ORDER BY total_spent DESC.',
          vi: 'Lấy s.name, s.course, COUNT(o.id) AS order_count, SUM(o.amount) AS total_spent, MAX(o.amount) AS max_order từ students s JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course HAVING SUM(o.amount) >= 80.0 ORDER BY total_spent DESC.'
        },
        requirements: [{ en: 'HAVING SUM(o.amount) >= 80.0 ORDER BY total_spent DESC', vi: 'HAVING SUM(o.amount) >= 80.0 ORDER BY total_spent DESC' }],
        starterCode: `SELECT s.name, s.course FROM students s JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course HAVING ;`,
        solutionCode: `SELECT s.name, s.course, COUNT(o.id) AS order_count, SUM(o.amount) AS total_spent, MAX(o.amount) AS max_order FROM students s JOIN orders o ON s.name = o.customer_name GROUP BY s.name, s.course HAVING SUM(o.amount) >= 80.0 ORDER BY total_spent DESC;`,
        hints: [{ en: 'Add aggregate functions and HAVING clause.', vi: 'Thêm các hàm tổng hợp và mệnh đề HAVING.' }],
        solutionExplanation: { en: 'Aggregates student purchase histories.', vi: 'Tổng hợp lịch sử mua sắm của học viên.' }
      },
      {
        id: 'sql_ch_8_v2',
        title: { en: 'High-Value Product Sales Report', vi: 'Báo Cáo Bán Hàng Sản Phẩm Giá Trị Cao' },
        description: {
          en: 'Select o.product, COUNT(o.id) AS units_sold, SUM(o.amount) AS total_revenue, AVG(s.score) AS avg_buyer_score FROM orders o JOIN students s ON o.customer_name = s.name GROUP BY o.product HAVING SUM(o.amount) >= 50.0 ORDER BY total_revenue DESC.',
          vi: 'Chọn o.product, COUNT(o.id) AS units_sold, SUM(o.amount) AS total_revenue, AVG(s.score) AS avg_buyer_score TỪ orders o JOIN students s ON o.customer_name = s.name GOM THEO o.product CÓ SUM(o.amount) >= 50.0 XẾP THEO total_revenue DESC.'
        },
        requirements: [
          { en: 'Select o.product, COUNT(o.id), SUM(o.amount), AVG(s.score)', vi: 'Chọn o.product, COUNT(o.id), SUM(o.amount), AVG(s.score)' },
          { en: 'JOIN students s ON o.customer_name = s.name GROUP BY o.product HAVING SUM(o.amount) >= 50.0', vi: 'JOIN students s ON o.customer_name = s.name GROUP BY o.product HAVING SUM(o.amount) >= 50.0' }
        ],
        starterCode: `SELECT o.product FROM orders o JOIN students s ON o.customer_name = s.name GROUP BY o.product HAVING ;`,
        solutionCode: `SELECT o.product, COUNT(o.id) AS units_sold, SUM(o.amount) AS total_revenue, AVG(s.score) AS avg_buyer_score FROM orders o JOIN students s ON o.customer_name = s.name GROUP BY o.product HAVING SUM(o.amount) >= 50.0 ORDER BY total_revenue DESC;`,
        hints: [{ en: 'Group by o.product and check SUM(o.amount) >= 50.0', vi: 'Gom theo o.product và kiểm tra SUM(o.amount) >= 50.0' }],
        solutionExplanation: { en: 'Product revenue and buyer demographic rollup.', vi: 'Tổng hợp doanh thu sản phẩm và điểm học tập của người mua.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_8_1',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'easy',
        question: { en: 'What rows are returned by an INNER JOIN between Table A and Table B?', vi: 'Những dòng nào được trả về bởi phép INNER JOIN giữa Bảng A và Bảng B?' },
        options: [
          { en: 'Only rows where the join condition evaluates to TRUE in both tables', vi: 'Chỉ các dòng mà điều kiện nối trả về TRUE ở cả hai bảng' },
          { en: 'All rows from Table A and only matching rows from Table B', vi: 'Tất cả các dòng từ Bảng A và chỉ các dòng khớp từ Bảng B' },
          { en: 'All rows from both tables combined unconditionally', vi: 'Tất cả các dòng từ cả hai bảng kết hợp vô điều kiện' },
          { en: 'Only rows that have NULL keys', vi: 'Chỉ các dòng có khóa là NULL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'INNER JOIN strictly keeps matched records existing on both sides of the relation.', vi: 'INNER JOIN chỉ giữ lại các bản ghi khớp nhau ở cả hai phía của quan hệ.' }
      },
      {
        id: 'sql_q_8_2',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'easy',
        question: { en: 'Is there any functional difference between "JOIN" and "INNER JOIN" in standard SQL?', vi: 'Có sự khác biệt chức năng nào giữa "JOIN" và "INNER JOIN" trong chuẩn SQL không?' },
        options: [
          { en: 'No, "JOIN" is just shorthand syntax for "INNER JOIN"', vi: 'Không, "JOIN" chỉ là cú pháp viết tắt của "INNER JOIN"' },
          { en: 'Yes, JOIN is a LEFT JOIN by default', vi: 'Có, JOIN mặc định là LEFT JOIN' },
          { en: 'Yes, INNER JOIN only works on integer IDs', vi: 'Có, INNER JOIN chỉ hoạt động trên ID số nguyên' },
          { en: 'JOIN ignores duplicate rows whereas INNER JOIN keeps them', vi: 'JOIN loại bỏ dòng trùng còn INNER JOIN thì giữ lại' }
        ],
        correctAnswers: [0],
        explanation: { en: 'INNER is the default join type in SQL; omitting INNER yields an identical query plan.', vi: 'INNER là kiểu join mặc định trong SQL; không viết chữ INNER câu lệnh vẫn thực thi y hệt.' }
      },
      {
        id: 'sql_q_8_3',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'medium',
        question: { en: 'What happens if you execute a CROSS JOIN on two tables with 20 rows and 30 rows respectively?', vi: 'Điều gì xảy ra khi bạn thực thi CROSS JOIN trên hai bảng có lần lượt 20 dòng và 30 dòng?' },
        options: [
          { en: 'It produces 600 rows (Cartesian product: 20 * 30)', vi: 'Tạo ra 600 dòng (tích Descartes: 20 * 30)' },
          { en: 'It produces 50 rows (20 + 30)', vi: 'Tạo ra 50 dòng (20 + 30)' },
          { en: 'It produces 0 rows because there is no ON clause', vi: 'Tạo ra 0 dòng vì không có mệnh đề ON' },
          { en: 'It throws a syntax error', vi: 'Báo lỗi cú pháp' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CROSS JOIN pairs every left row with every right row: 20 * 30 = 600.', vi: 'CROSS JOIN ghép từng dòng bên trái với mọi dòng bên phải: 20 * 30 = 600.' }
      },
      {
        id: 'sql_q_8_4',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'easy',
        question: { en: 'Why are table aliases (e.g. "FROM customers c JOIN orders o") recommended in SQL?', vi: 'Tại sao việc dùng bí danh bảng (ví dụ: "FROM customers c JOIN orders o") được khuyến khích trong SQL?' },
        options: [
          { en: 'They make queries concise and clearly resolve ambiguous column references', vi: 'Giúp câu truy vấn ngắn gọn và giải quyết rõ ràng các tham chiếu cột bị trùng tên' },
          { en: 'They are required by the compiler to run faster', vi: 'Bắt buộc phải có để trình biên dịch chạy nhanh hơn' },
          { en: 'They automatically create temporary tables on disk', vi: 'Tự động tạo bảng tạm trên ổ đĩa' },
          { en: 'They encrypt the column names', vi: 'Mã hóa tên các cột' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Aliases enhance readability and disambiguate shared column names like id.', vi: 'Bí danh tăng tính dễ đọc và giải quyết xung đột khi các bảng có cùng tên cột như id.' }
      },
      {
        id: 'sql_q_8_5',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'hard',
        question: { en: 'What is the danger of writing legacy join syntax like "SELECT * FROM table_a, table_b;"?', vi: 'Mối nguy hiểm của cú pháp nối kiểu cũ như "SELECT * FROM table_a, table_b;" là gì?' },
        options: [
          { en: 'Forgetting the WHERE join condition results in an unintended Cartesian explosion (millions of rows)', vi: 'Nếu quên điều kiện WHERE sẽ vô tình gây bùng nổ tích Descartes (hàng triệu dòng)' },
          { en: 'It corrupts database indexes', vi: 'Làm hỏng chỉ mục của CSDL' },
          { en: 'It deletes data from table_b', vi: 'Xóa dữ liệu trong table_b' },
          { en: 'Comma syntax is not recognized by any modern SQL database', vi: 'Cú pháp dấu phẩy không được CSDL hiện đại nào hỗ trợ' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Missing WHERE in a comma-join creates a full Cartesian product, which can exhaust memory and crash database servers.', vi: 'Thiếu WHERE trong cú pháp nối dấu phẩy sẽ tạo ra tích Descartes đầy đủ, có thể tràn RAM và làm sập máy chủ CSDL.' }
      },
      {
        id: 'sql_q_8_6',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'medium',
        question: { en: 'Can an INNER JOIN connect more than two tables in a single SQL statement?', vi: 'Một câu lệnh SQL có thể thực hiện INNER JOIN trên nhiều hơn 2 bảng không?' },
        options: [
          { en: 'Yes, by chaining consecutive JOIN ... ON clauses (e.g. A JOIN B ON ... JOIN C ON ...)', vi: 'Có, bằng cách nối chuỗi các mệnh đề JOIN ... ON liên tiếp (ví dụ: A JOIN B ON ... JOIN C ON ...)' },
          { en: 'No, SQL only permits joining exactly two tables per query', vi: 'Không, SQL chỉ cho phép nối tối đa đúng 2 bảng trong một truy vấn' },
          { en: 'Only if UNION is also used', vi: 'Chỉ khi có dùng thêm UNION' },
          { en: 'Only in Oracle', vi: 'Chỉ hỗ trợ trong Oracle' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Any number of tables can be joined in sequence by appending JOIN ... ON clauses.', vi: 'Có thể nối bao nhiêu bảng tùy ý bằng cách thêm các mệnh đề JOIN ... ON nối tiếp nhau.' }
      },
      {
        id: 'sql_q_8_7',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'medium',
        question: { en: 'What is a "Non-Equi Join"?', vi: '"Non-Equi Join" là gì?' },
        options: [
          { en: 'A join condition that uses comparison operators other than equals (e.g. ON a.date BETWEEN b.start AND b.end)', vi: 'Một phép nối sử dụng toán tử so sánh khác dấu bằng (ví dụ: ON a.date BETWEEN b.start AND b.end)' },
          { en: 'A join between tables with different column counts', vi: 'Phép nối giữa các bảng có số lượng cột khác nhau' },
          { en: 'A broken join that returns an error', vi: 'Một phép nối bị lỗi cú pháp' },
          { en: 'A join on string columns', vi: 'Phép nối trên các cột chuỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Non-equi joins use operators like <, >, <=, >=, or BETWEEN in the ON clause instead of =.', vi: 'Non-equi join sử dụng các toán tử như <, >, <=, >= hoặc BETWEEN trong mệnh đề ON thay vì dấu =.' }
      },
      {
        id: 'sql_q_8_8',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'easy',
        question: { en: 'In a query "SELECT * FROM a JOIN b ON a.id = b.a_id WHERE b.status = \'active\';", what role does the ON clause play?', vi: 'Trong truy vấn "SELECT * FROM a JOIN b ON a.id = b.a_id WHERE b.status = \'active\';", mệnh đề ON đóng vai trò gì?' },
        options: [
          { en: 'It establishes the relational link defining how rows from table a and table b correspond', vi: 'Thiết lập mối liên kết quan hệ định nghĩa cách các dòng từ bảng a tương ứng với bảng b' },
          { en: 'It limits the number of rows returned', vi: 'Giới hạn số lượng dòng trả về' },
          { en: 'It sorts the resulting table', vi: 'Sắp xếp bảng kết quả' },
          { en: 'It creates a primary key constraint', vi: 'Tạo ràng buộc khóa chính' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The ON clause defines the logical criteria for matching records across joined tables.', vi: 'Mệnh đề ON xác định tiêu chí logic để so khớp các bản ghi giữa các bảng tham gia nối.' }
      },
      {
        id: 'sql_q_8_9',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'hard',
        question: { en: 'What is the result of joining on a NULL key (e.g. ON a.manager_id = b.id where a.manager_id IS NULL)?', vi: 'Kết quả khi nối trên khóa có giá trị NULL là gì (ví dụ: ON a.manager_id = b.id khi a.manager_id IS NULL)?' },
        options: [
          { en: 'The condition evaluates to UNKNOWN, so the row is excluded from the INNER JOIN result', vi: 'Điều kiện trả về UNKNOWN nên dòng đó bị loại bỏ khỏi kết quả INNER JOIN' },
          { en: 'It matches all rows where b.id IS NULL', vi: 'Nó sẽ khớp với tất cả các dòng có b.id IS NULL' },
          { en: 'It raises a foreign key violation exception', vi: 'Báo lỗi vi phạm khóa ngoại' },
          { en: 'It matches the first row of table b', vi: 'Nó khớp với dòng đầu tiên của bảng b' }
        ],
        correctAnswers: [0],
        explanation: { en: 'In Three-Valued Logic, NULL = value evaluates to UNKNOWN (not TRUE), so the row is excluded.', vi: 'Theo logic 3 giá trị, NULL = giá_trị cho ra UNKNOWN (không phải TRUE), nên dòng bị loại bỏ khỏi INNER JOIN.' }
      },
      {
        id: 'sql_q_8_10',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'easy',
        question: { en: 'Which SQL keyword joins every row of a calendar table with every store location to generate all date-store combinations?', vi: 'Từ khóa SQL nào nối mọi dòng của bảng lịch với mọi chi nhánh cửa hàng để tạo ra tất cả tổ hợp ngày-cửa hàng?' },
        options: [
          { en: 'CROSS JOIN', vi: 'CROSS JOIN' },
          { en: 'INNER JOIN', vi: 'INNER JOIN' },
          { en: 'UNION', vi: 'UNION' },
          { en: 'EXCEPT', vi: 'EXCEPT' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CROSS JOIN computes the Cartesian product, ideal for generating exhaustive combinatorial grids.', vi: 'CROSS JOIN tính tích Descartes, rất lý tưởng để tạo bảng lưới tổ hợp đầy đủ các chiều.' }
      },
      {
        id: 'sql_q_8_11',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'medium',
        question: { en: 'What does the SQL standard NATURAL JOIN do?', vi: 'Phép NATURAL JOIN trong chuẩn SQL thực hiện điều gì?' },
        options: [
          { en: 'Automatically joins tables on all columns that share identical names in both schemas', vi: 'Tự động nối các bảng trên tất cả các cột có tên trùng khớp nhau ở cả hai lược đồ' },
          { en: 'Joins only natural numbers', vi: 'Chỉ nối các số tự nhiên' },
          { en: 'Sorts data naturally before joining', vi: 'Sắp xếp dữ liệu tự nhiên trước khi nối' },
          { en: 'Creates an index on the join keys', vi: 'Tạo chỉ mục trên các khóa nối' }
        ],
        correctAnswers: [0],
        explanation: { en: 'NATURAL JOIN implicitly creates an equi-join on all identically named columns (often discouraged in production due to fragility when schemas change).', vi: 'NATURAL JOIN ngầm định nối trên tất cả các cột cùng tên (thường tránh dùng trong dự án thực tế vì dễ lỗi khi cấu trúc bảng thay đổi).' }
      },
      {
        id: 'sql_q_8_12',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'hard',
        question: { en: 'If Table A has 3 matching rows for a key and Table B has 4 matching rows for that same key, how many joined rows are generated for that key in an INNER JOIN?', vi: 'Nếu Bảng A có 3 dòng khớp khóa và Bảng B có 4 dòng khớp cùng khóa đó, có bao nhiêu dòng được tạo ra cho khóa đó trong INNER JOIN?' },
        options: [
          { en: '12 rows (3 * 4)', vi: '12 dòng (3 * 4)' },
          { en: '7 rows (3 + 4)', vi: '7 dòng (3 + 4)' },
          { en: '4 rows', vi: '4 dòng' },
          { en: '3 rows', vi: '3 dòng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'When keys are not unique on either side (many-to-many match), JOIN multiplies matching rows (3 * 4 = 12).', vi: 'Khi khóa không duy nhất ở cả hai bên (quan hệ nhiều-nhiều), phép JOIN sẽ nhân số dòng khớp nhau (3 * 4 = 12).' }
      },
      {
        id: 'sql_q_8_13',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'easy',
        question: { en: 'Which clause is MANDATORY when writing an explicit ANSI INNER JOIN?', vi: 'Mệnh đề nào là BẮT BUỘC khi viết câu lệnh ANSI INNER JOIN tường minh?' },
        options: [
          { en: 'ON (or USING)', vi: 'ON (hoặc USING)' },
          { en: 'GROUP BY', vi: 'GROUP BY' },
          { en: 'HAVING', vi: 'HAVING' },
          { en: 'LIMIT', vi: 'LIMIT' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ANSI SQL requires ON (or USING) to specify the join predicate.', vi: 'ANSI SQL bắt buộc phải có ON (hoặc USING) để chỉ định điều kiện nối.' }
      },
      {
        id: 'sql_q_8_14',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'medium',
        question: { en: 'What does "JOIN table_b USING (customer_id)" do compared to "ON table_a.customer_id = table_b.customer_id"?', vi: '"JOIN table_b USING (customer_id)" hoạt động như thế nào so với "ON table_a.customer_id = table_b.customer_id"?' },
        options: [
          { en: 'It is a concise shorthand when both tables have the exact same column name, and it produces a single coalesced column in SELECT *', vi: 'Là cú pháp viết tắt tiện lợi khi cả hai bảng có cột trùng tên, và chỉ giữ lại một cột duy nhất khi SELECT *' },
          { en: 'USING is only for temporary tables', vi: 'USING chỉ dùng cho bảng tạm' },
          { en: 'USING is deprecated and throws an error', vi: 'USING đã bị loại bỏ và báo lỗi' },
          { en: 'USING creates a foreign key constraint', vi: 'USING tạo ràng buộc khóa ngoại' }
        ],
        correctAnswers: [0],
        explanation: { en: 'USING (col) is cleaner syntax when column names are identical in both tables.', vi: 'USING (cột) là cú pháp gọn hơn khi tên cột ở hai bảng hoàn toàn giống hệt nhau.' }
      },
      {
        id: 'sql_q_8_15',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'hard',
        question: { en: 'Why should developers avoid joining on unindexed text columns in large enterprise databases?', vi: 'Tại sao lập trình viên nên tránh join trên các cột văn bản không có chỉ mục trong các CSDL lớn?' },
        options: [
          { en: 'It forces the database engine to perform costly full table scans and Nested Loop joins with high CPU and I/O latency', vi: 'Bắt CSDL phải quét toàn bộ bảng (Full Table Scan) và chạy thuật toán Nested Loop Join tốn nhiều CPU và độ trễ I/O' },
          { en: 'Text columns cannot be joined in SQL', vi: 'Không thể join trên cột kiểu văn bản trong SQL' },
          { en: 'It deletes data from the buffer cache', vi: 'Nó xóa dữ liệu khỏi bộ đệm cache' },
          { en: 'Text joins are limited to 10 rows', vi: 'Join trên văn bản bị giới hạn tối đa 10 dòng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Joining unindexed columns prevents Hash/Merge joins or Index Seeks, causing severe performance degradation.', vi: 'Join trên cột không có Index ngăn cản việc dùng Index Seek, dẫn đến suy giảm hiệu năng nghiêm trọng.' }
      },
      {
        id: 'sql_q_8_16',
        type: 'single_choice',
        topicId: 'sql_inner_cross_join',
        difficulty: 'easy',
        question: { en: 'Which type of relational model key uniquely identifies a row in its own table?', vi: 'Loại khóa mô hình quan hệ nào xác định duy nhất một dòng trong chính bảng của nó?' },
        options: [
          { en: 'Primary Key', vi: 'Khóa Chính (Primary Key)' },
          { en: 'Foreign Key', vi: 'Khóa Ngoại (Foreign Key)' },
          { en: 'Composite Index', vi: 'Chỉ mục phức hợp' },
          { en: 'View', vi: 'View' }
        ],
        correctAnswers: [0],
        explanation: { en: 'A Primary Key uniquely identifies each record in a table, referenced by Foreign Keys in other tables.', vi: 'Khóa chính xác định duy nhất từng bản ghi trong bảng và được tham chiếu bởi Khóa ngoại từ bảng khác.' }
      }
    ]
  }
];
