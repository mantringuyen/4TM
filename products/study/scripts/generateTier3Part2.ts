import { Lesson } from '../src/types';

export const tier3Part2Lessons: Lesson[] = [
  // LESSON 12: Correlated Subqueries & Existence: EXISTS vs NOT EXISTS
  {
    id: 'sql_lesson_12',
    moduleId: 'sql_mod_3',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 12,
    topicId: 'sql_correlated_subqueries_exists',
    title: {
      en: 'Correlated Subqueries & Existence: EXISTS vs NOT EXISTS',
      vi: 'Truy Vấn Con Tương Quan & Sự Tồn Tại: EXISTS vs NOT EXISTS'
    },
    summary: {
      en: 'Master correlated subqueries that reference outer row variables, short-circuit boolean evaluation with EXISTS, and the NULL-safety advantages of NOT EXISTS over NOT IN.',
      vi: 'Làm chủ truy vấn con tương quan tham chiếu biến dòng ngoài, cơ chế đánh giá ngắt mạch (short-circuit) với EXISTS và sự an toàn tuyệt đối với NULL của NOT EXISTS so với NOT IN.'
    },
    estimatedMinutes: 22,
    learn: {
      introduction: {
        en: 'A correlated subquery is an inner query that depends on column values from the current row of the outer query. The subquery executes repeatedly—once for every candidate row evaluated by the outer query.',
        vi: 'Truy vấn con tương quan (correlated subquery) là một truy vấn con phụ thuộc vào giá trị cột của dòng hiện tại ở truy vấn ngoài. Truy vấn con này sẽ thực thi lặp lại—mỗi dòng ứng viên ở truy vấn ngoài được đánh giá một lần.'
      },
      conceptExplanation: {
        en: 'While uncorrelated subqueries execute once upfront, correlated subqueries maintain a stateful bridge to the outer row (e.g. WHERE inner.course = outer.course). The EXISTS operator tests whether a subquery returns ANY rows, yielding TRUE as soon as a single matching record is found (short-circuit optimization). Crucially, NOT EXISTS is completely immune to the NULL trap that breaks NOT IN under Three-Valued Logic.',
        vi: 'Trong khi truy vấn con độc lập thực thi 1 lần từ đầu, truy vấn con tương quan duy trì cầu nối trạng thái với dòng ngoài (ví dụ: WHERE inner.course = outer.course). Toán tử EXISTS kiểm tra xem subquery có trả về BẤT KỲ dòng nào không, trả về TRUE ngay khi tìm thấy dòng khớp đầu tiên (tối ưu ngắt mạch short-circuit). Đặc biệt, NOT EXISTS hoàn toàn miễn nhiễm với bẫy NULL từng làm hỏng NOT IN trong logic 3 giá trị.'
      },
      syntax: `-- 1. Correlated Subquery with Comparison:
SELECT s.name, s.course, s.score
FROM students s
WHERE s.score > (
  SELECT AVG(inner_s.score)
  FROM students inner_s
  WHERE inner_s.course = s.course
);

-- 2. EXISTS Predicate:
SELECT s.name, s.city
FROM students s
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_name = s.name AND o.amount >= 50.0
);

-- 3. NOT EXISTS Predicate (Safe Anti-Semi-Join):
SELECT s.name, s.city
FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_name = s.name
);`,
      examples: [
        {
          title: {
            en: '1. Finding Students Scoring Above Their Own Course Average',
            vi: '1. Tìm Học Viên Có Điểm Cao Hơn Mức Trung Bình Của Chính Khóa Học Đó'
          },
          code: `SELECT s.name, s.course, s.score,
       ROUND((SELECT AVG(c.score) FROM students c WHERE c.course = s.course), 2) AS course_avg
FROM students s
WHERE s.score > (
  SELECT AVG(c.score)
  FROM students c
  WHERE c.course = s.course
)
ORDER BY s.course, s.score DESC;`,
          language: 'sql',
          explanation: {
            en: 'For each student row, the inner subquery dynamically calculates the average score for that student\'s specific course, filtering out below-course-average performers.',
            vi: 'Với mỗi dòng học viên, subquery bên trong tính toán điểm trung bình riêng cho khóa học của học viên đó và lọc ra các bạn có điểm vượt mức trung bình môn.'
          }
        },
        {
          title: {
            en: '2. High-Performance Existence Check with EXISTS',
            vi: '2. Kiểm Tra Sự Tồn Tại Hiệu Năng Cao Bằng EXISTS'
          },
          code: `SELECT e.name, e.dept_id, e.salary
FROM employees e
WHERE EXISTS (
  SELECT 1
  FROM employees peer
  WHERE peer.dept_id = e.dept_id
    AND peer.salary > e.salary
);`,
          language: 'sql',
          explanation: {
            en: 'Finds all employees who have at least one co-worker in their same department earning a strictly higher salary.',
            vi: 'Tìm tất cả nhân viên có ít nhất một đồng nghiệp cùng phòng ban đang nhận mức lương cao hơn.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Using "SELECT * " or heavy column lists inside EXISTS instead of "SELECT 1"',
            vi: 'Dùng "SELECT * " hoặc nhiều cột bên trong EXISTS thay vì "SELECT 1"'
          },
          correction: {
            en: 'EXISTS only tests for row existence, completely ignoring the projected column list. Conventionally write "SELECT 1" to signal that the column projection is irrelevant.',
            vi: 'EXISTS chỉ kiểm tra sự tồn tại của dòng mà hoàn toàn không quan tâm đến danh sách cột được chọn. Theo quy ước, hãy viết "SELECT 1" để thể hiện rõ điều này.'
          },
          code: `-- ACCEPTABLE BUT CLUTTERED: SELECT name FROM students WHERE EXISTS (SELECT * FROM orders WHERE ...);
-- CLEAN & IDIOMATIC:
SELECT name FROM students WHERE EXISTS (SELECT 1 FROM orders WHERE ...);`
        },
        {
          mistake: {
            en: 'Forgetting the correlation condition, creating an unintended constant evaluation',
            vi: 'Quên điều kiện tương quan, vô tình tạo ra đánh giá hằng số'
          },
          correction: {
            en: 'If the subquery inside EXISTS lacks a WHERE condition linking it to the outer row (e.g. inner.name = outer.name), it returns TRUE or FALSE for the entire table unconditionally.',
            vi: 'Nếu subquery trong EXISTS thiếu điều kiện nối với dòng ngoài (như inner.name = outer.name), nó sẽ trả về TRUE hoặc FALSE cho toàn bộ bảng mà không phân biệt từng dòng.'
          },
          code: `-- WRONG (Returns all students if ANY order exists in the DB):
SELECT * FROM students s WHERE EXISTS (SELECT 1 FROM orders o);
-- CORRECT (Evaluates per student):
SELECT * FROM students s WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name);`
        }
      ],
      tips: [
        {
          en: 'Database query engines optimize EXISTS using Semi-Join algorithms with early short-circuit termination as soon as the first match is located.',
          vi: 'Trình tối ưu hóa CSDL thực thi EXISTS bằng thuật toán Semi-Join với khả năng ngắt mạch sớm ngay khi tìm thấy bản ghi khớp đầu tiên.'
        },
        {
          en: 'NOT EXISTS is 100% safe with NULL values in the target table, whereas NOT IN will return 0 rows if a single NULL exists in the subquery.',
          vi: 'NOT EXISTS an toàn 100% với các giá trị NULL trong bảng đích, trong khi NOT IN sẽ trả về 0 dòng nếu xuất hiện dù chỉ 1 giá trị NULL trong subquery.'
        }
      ],
      practiceStarterCode: `-- Find students who have at least one purchase using EXISTS
SELECT s.name, s.course
FROM students s
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_name = s.name
);`,
      practice: {
        task: {
          en: 'Write a query using NOT EXISTS to find all students in the students table who have NO orders recorded in the orders table.',
          vi: 'Viết truy vấn dùng NOT EXISTS để tìm tất cả học viên trong bảng students KHÔNG CÓ bất kỳ đơn hàng nào trong bảng orders.'
        },
        starterCode: `-- Find students with no orders using NOT EXISTS
SELECT s.name, s.course
FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE 
);`,
        solutionCode: `SELECT s.name, s.course FROM students s WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name);`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_12_1',
        type: 'fix_code',
        title: { en: 'Fix Missing Correlation Link in EXISTS', vi: 'Sửa Lỗi Thiếu Liên Kết Tương Quan Trong EXISTS' },
        instruction: {
          en: 'Add the missing correlation condition "o.customer_name = s.name" inside the subquery WHERE clause.',
          vi: 'Bổ sung điều kiện tương quan "o.customer_name = s.name" vào mệnh đề WHERE của subquery.'
        },
        starterCode: 'SELECT s.name FROM students s WHERE EXISTS (SELECT 1 FROM orders o);',
        solutionCode: 'SELECT s.name FROM students s WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name);',
        hint: { en: 'Add "WHERE o.customer_name = s.name" inside the subquery.', vi: 'Thêm "WHERE o.customer_name = s.name" vào bên trong subquery.' },
        explanation: {
          en: 'Without the correlation clause, the subquery does not bind to the specific student on each row.',
          vi: 'Nếu không có điều kiện tương quan, subquery sẽ không liên kết với từng học viên cụ thể trên mỗi dòng.'
        }
      },
      {
        id: 'sql_ex_12_2',
        type: 'complete_code',
        title: { en: 'Complete Correlated Department Salary Comparison', vi: 'Hoàn Thiện So Sánh Lương Phòng Ban Tương Quan' },
        instruction: {
          en: 'Complete the correlated subquery comparing salary to department average (inner_e.dept_id = e.dept_id).',
          vi: 'Hoàn thiện subquery tương quan so sánh lương với mức trung bình của phòng ban (inner_e.dept_id = e.dept_id).'
        },
        starterCode: 'SELECT e.name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(inner_e.salary) FROM employees inner_e WHERE inner_e.dept_id = );',
        solutionCode: 'SELECT e.name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(inner_e.salary) FROM employees inner_e WHERE inner_e.dept_id = e.dept_id);',
        hint: { en: 'Add "e.dept_id" at the end.', vi: 'Thêm "e.dept_id" vào cuối.' },
        explanation: {
          en: 'The correlation matches the department ID of the inner query to the outer employee row.',
          vi: 'Điều kiện tương quan so khớp dept_id của subquery với dòng nhân viên ở truy vấn ngoài.'
        }
      },
      {
        id: 'sql_ex_12_3',
        type: 'write_code',
        title: { en: 'Find Active Buyers with High Ticket Items', vi: 'Tìm Người Mua Hàng Có Đơn Giá Trị Cao' },
        instruction: {
          en: 'Write a query using EXISTS to find students who placed an order of amount >= 100.0: SELECT s.name, s.city FROM students s WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name AND o.amount >= 100.0).',
          vi: 'Viết truy vấn dùng EXISTS tìm học viên có đơn hàng amount >= 100.0: SELECT s.name, s.city FROM students s WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name AND o.amount >= 100.0).'
        },
        starterCode: '-- Select students with high ticket orders using EXISTS\n',
        solutionCode: 'SELECT s.name, s.city FROM students s WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name AND o.amount >= 100.0);',
        hint: { en: 'Use EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name AND o.amount >= 100.0);', vi: 'Dùng EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name AND o.amount >= 100.0);' },
        explanation: {
          en: 'EXISTS short-circuits as soon as one order >= 100 is found for that student.',
          vi: 'EXISTS ngắt mạch ngay khi tìm thấy một đơn hàng >= 100 của học viên đó.'
        }
      },
      {
        id: 'sql_ex_12_4',
        type: 'modify_example',
        title: { en: 'Invert Existence with NOT EXISTS', vi: 'Đảo Ngược Điều Kiện Bằng NOT EXISTS' },
        instruction: {
          en: 'Change EXISTS to NOT EXISTS to find employees who have NO co-workers earning more than them in their department.',
          vi: 'Đổi EXISTS thành NOT EXISTS để tìm nhân viên KHÔNG CÓ đồng nghiệp nào trong cùng phòng ban hưởng lương cao hơn họ.'
        },
        starterCode: 'SELECT e.name, e.salary FROM employees e WHERE EXISTS (SELECT 1 FROM employees p WHERE p.dept_id = e.dept_id AND p.salary > e.salary);',
        solutionCode: 'SELECT e.name, e.salary FROM employees e WHERE NOT EXISTS (SELECT 1 FROM employees p WHERE p.dept_id = e.dept_id AND p.salary > e.salary);',
        hint: { en: 'Change EXISTS to NOT EXISTS.', vi: 'Đổi EXISTS thành NOT EXISTS.' },
        explanation: {
          en: 'NOT EXISTS returns TRUE when the subquery finds 0 rows (identifying the top earner in each department).',
          vi: 'NOT EXISTS trả về TRUE khi subquery không tìm thấy dòng nào (xác định người có lương cao nhất trong từng phòng ban).'
        }
      },
      {
        id: 'sql_ex_12_5',
        type: 'predict_output',
        title: { en: 'Predict Short-Circuit Behavior of EXISTS', vi: 'Dự Đoán Cơ Chế Ngắt Mạch Của EXISTS' },
        instruction: {
          en: 'If student "Bob" has 10,000 orders in the database, how many rows of "Bob" does the database engine need to inspect to satisfy "EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name)"?',
          vi: 'Nếu học viên "Bob" có 10.000 đơn hàng trong CSDL, trình tối ưu cần duyệt bao nhiêu dòng của "Bob" để thỏa mãn "EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name)"?'
        },
        starterCode: '-- Predict EXISTS inspection count\n',
        solutionCode: 'SELECT 1 AS rows_inspected;',
        options: [
          'Only 1 row (it stops immediately upon finding the first match)',
          'All 10,000 rows',
          '5,000 rows (the median)',
          '0 rows'
        ],
        correctOptionIndex: 0,
        hint: { en: 'EXISTS short-circuits on the very first match.', vi: 'EXISTS ngắt mạch ngay ở bản ghi khớp đầu tiên.' },
        explanation: {
          en: 'EXISTS is a boolean existence test; as soon as a single matching row is located, execution short-circuits.',
          vi: 'EXISTS là phép thử tồn tại logic; ngay khi tìm thấy 1 bản ghi khớp đầu tiên, quá trình duyệt dòng dừng lại ngay lập tức.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_12',
      title: { en: 'Department Compensation Benchmark & High-Value Customer Identification', vi: 'Đối Sánh Lương Phòng Ban & Nhận Diện Khách Hàng Giá Trị Cao' },
      description: {
        en: 'Write a SQL query that retrieves employees who earn more than their departmental average salary AND who also exist as active customers with at least one order of $50 or more in the orders table (using EXISTS). Select e.name, e.dept_id, e.salary, and the department average salary rounded to 2 decimal places as dept_avg. Order by e.salary DESC.',
        vi: 'Viết truy vấn SQL trích xuất các nhân viên có mức lương cao hơn mức lương trung bình của chính phòng ban họ VÀ ĐỒNG THỜI tồn tại với tư cách là khách hàng có ít nhất một đơn hàng từ 50 USD trở lên trong bảng orders (sử dụng EXISTS). Chọn e.name, e.dept_id, e.salary và lương trung bình của phòng ban làm tròn 2 chữ số thập phân dept_avg. Sắp xếp theo e.salary DESC.'
      },
      requirements: [
        { en: 'Select e.name, e.dept_id, e.salary', vi: 'Chọn e.name, e.dept_id, e.salary' },
        { en: 'Calculate ROUND((SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id), 2) AS dept_avg', vi: 'Tính ROUND((SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id), 2) AS dept_avg' },
        { en: 'WHERE e.salary > (SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id)', vi: 'WHERE e.salary > (SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id)' },
        { en: 'AND EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = e.name AND o.amount >= 50.0)', vi: 'AND EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = e.name AND o.amount >= 50.0)' },
        { en: 'ORDER BY e.salary DESC', vi: 'ORDER BY e.salary DESC' }
      ],
      starterCode: `-- Write your SQL query below
SELECT e.name, e.dept_id, e.salary,
       ROUND((SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id), 2) AS dept_avg
FROM employees e
WHERE e.salary > 
  AND EXISTS (
    SELECT 1 FROM orders o WHERE 
  )
ORDER BY ;`,
      solutionCode: `SELECT e.name, e.dept_id, e.salary, ROUND((SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id), 2) AS dept_avg FROM employees e WHERE e.salary > (SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id) AND EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = e.name AND o.amount >= 50.0) ORDER BY e.salary DESC;`,
      hints: [{ en: 'Combine correlated salary average with correlated EXISTS on customer_name = e.name.', vi: 'Kết hợp subquery tính lương trung bình tương quan với EXISTS tương quan theo customer_name = e.name.' }],
      solutionExplanation: {
        en: 'Combines multiple correlated subqueries across different schemas for dynamic intra-group benchmarking and existence verification.',
        vi: 'Kết hợp nhiều subquery tương quan trên các lược đồ khác nhau để đối chuẩn nội bộ nhóm và kiểm tra sự tồn tại.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_12_v1',
        title: { en: 'Department Compensation Benchmark & High-Value Customer Identification', vi: 'Đối Sánh Lương Phòng Ban & Nhận Diện Khách Hàng Giá Trị Cao' },
        description: {
          en: 'Retrieve employees earning > dept avg AND existing in orders with amount >= 50: name, dept_id, salary, dept_avg ordered by salary DESC.',
          vi: 'Lấy nhân viên có lương > lương TB phòng VÀ có trong orders với amount >= 50: name, dept_id, salary, dept_avg xếp theo salary DESC.'
        },
        requirements: [{ en: 'ORDER BY e.salary DESC', vi: 'ORDER BY e.salary DESC' }],
        starterCode: `SELECT e.name, e.dept_id, e.salary FROM employees e WHERE e.salary > (SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id);`,
        solutionCode: `SELECT e.name, e.dept_id, e.salary, ROUND((SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id), 2) AS dept_avg FROM employees e WHERE e.salary > (SELECT AVG(d.salary) FROM employees d WHERE d.dept_id = e.dept_id) AND EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = e.name AND o.amount >= 50.0) ORDER BY e.salary DESC;`,
        hints: [{ en: 'Add EXISTS and dept_avg projection.', vi: 'Thêm EXISTS và cột tính dept_avg.' }],
        solutionExplanation: { en: 'Filters employees above departmental mean with recorded commercial orders.', vi: 'Lọc nhân viên trên mức trung bình phòng ban có phát sinh đơn hàng thương mại.' }
      },
      {
        id: 'sql_ch_12_v2',
        title: { en: 'Academic Subject Leaders with Zero Product Returns', vi: 'Học Viên Đứng Đầu Khóa Học Chưa Có Đơn Hàng' },
        description: {
          en: 'Select s.name, s.course, s.score FROM students s WHERE s.score = (SELECT MAX(c.score) FROM students c WHERE c.course = s.course) AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name) ORDER BY s.score DESC;',
          vi: 'Chọn s.name, s.course, s.score TỪ students s CÓ s.score = (SELECT MAX(c.score) FROM students c WHERE c.course = s.course) VÀ NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name) XẾP THEO s.score DESC;'
        },
        requirements: [
          { en: 's.score = (SELECT MAX(c.score) FROM students c WHERE c.course = s.course)', vi: 's.score = (SELECT MAX(c.score) FROM students c WHERE c.course = s.course)' },
          { en: 'NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name)', vi: 'NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name)' }
        ],
        starterCode: `SELECT s.name, s.course, s.score FROM students s WHERE s.score = (SELECT MAX(c.score) FROM students c WHERE c.course = s.course);`,
        solutionCode: `SELECT s.name, s.course, s.score FROM students s WHERE s.score = (SELECT MAX(c.score) FROM students c WHERE c.course = s.course) AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_name = s.name) ORDER BY s.score DESC;`,
        hints: [{ en: 'Add NOT EXISTS clause.', vi: 'Thêm mệnh đề NOT EXISTS.' }],
        solutionExplanation: { en: 'Finds the top scoring student in each course who has never bought anything.', vi: 'Tìm học viên có điểm cao nhất từng khóa học mà chưa từng mua hàng.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_12_1',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'easy',
        question: { en: 'What defines a "Correlated Subquery"?', vi: 'Điều gì định nghĩa một "Truy Vấn Con Tương Quan" (Correlated Subquery)?' },
        options: [
          { en: 'A subquery that references one or more columns from the outer query row', vi: 'Một subquery có tham chiếu đến một hoặc nhiều cột từ dòng của truy vấn ngoài' },
          { en: 'A subquery that joins two tables with a comma', vi: 'Một subquery kết nối hai bảng bằng dấu phẩy' },
          { en: 'A subquery that runs once and stores results in a temp table', vi: 'Một subquery chạy một lần và lưu kết quả vào bảng tạm' },
          { en: 'A subquery without a WHERE clause', vi: 'Một subquery không có mệnh đề WHERE' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Correlated subqueries depend on values supplied by the outer query context during iteration.', vi: 'Truy vấn con tương quan phụ thuộc vào các giá trị do ngữ cảnh truy vấn ngoài cung cấp trong quá trình duyệt.' }
      },
      {
        id: 'sql_q_12_2',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'medium',
        question: { en: 'How does the SQL engine evaluate the EXISTS operator?', vi: 'Trình thực thi SQL đánh giá toán tử EXISTS như thế nào?' },
        options: [
          { en: 'It checks if the subquery produces at least 1 row, returning TRUE immediately (short-circuit) upon finding the first match', vi: 'Kiểm tra xem subquery có tạo ra ít nhất 1 dòng không, trả về TRUE ngay lập tức (ngắt mạch) khi tìm thấy bản ghi khớp đầu tiên' },
          { en: 'It counts all matching rows in the table', vi: 'Nó đếm toàn bộ các dòng khớp trong bảng' },
          { en: 'It loads all matching rows into memory', vi: 'Nó nạp toàn bộ các dòng khớp vào bộ nhớ' },
          { en: 'It compares strings alphabetically', vi: 'Nó so sánh chuỗi theo bảng chữ cái' }
        ],
        correctAnswers: [0],
        explanation: { en: 'EXISTS short-circuits as soon as a single row meets the inner condition.', vi: 'EXISTS ngắt mạch ngay khi có một dòng duy nhất thỏa mãn điều kiện bên trong.' }
      },
      {
        id: 'sql_q_12_3',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'hard',
        question: { en: 'Why is NOT EXISTS strictly superior to NOT IN when dealing with nullable columns?', vi: 'Tại sao NOT EXISTS vượt trội hơn hẳn NOT IN khi làm việc với các cột có thể chứa NULL?' },
        options: [
          { en: 'If the subquery in NOT IN produces even a single NULL, the entire expression evaluates to UNKNOWN and returns 0 rows; NOT EXISTS is completely unaffected by NULLs', vi: 'Nếu subquery trong NOT IN trả về dù chỉ một giá trị NULL, toàn bộ biểu thức sẽ thành UNKNOWN và trả về 0 dòng; NOT EXISTS hoàn toàn không bị ảnh hưởng bởi NULL' },
          { en: 'NOT EXISTS is faster on small tables only', vi: 'NOT EXISTS chỉ nhanh hơn trên bảng nhỏ' },
          { en: 'NOT IN is not supported in ANSI SQL', vi: 'NOT IN không được hỗ trợ trong chuẩn ANSI SQL' },
          { en: 'NOT EXISTS creates an index automatically', vi: 'NOT EXISTS tự động tạo chỉ mục Index' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Under Three-Valued Logic, NOT IN with a NULL evaluates to UNKNOWN, wiping out all valid results. NOT EXISTS only tests row presence and remains 100% reliable.', vi: 'Theo logic 3 giá trị, NOT IN có NULL sẽ ra UNKNOWN khiến kết quả bị rỗng sạch. NOT EXISTS chỉ kiểm tra sự tồn tại của dòng nên chuẩn xác 100%.' }
      },
      {
        id: 'sql_q_12_4',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'easy',
        question: { en: 'Why is "SELECT 1" commonly written inside an EXISTS subquery instead of "SELECT *"?', vi: 'Tại sao "SELECT 1" thường được viết trong subquery của EXISTS thay vì "SELECT *"?', },
        options: [
          { en: 'Because EXISTS ignores the projected column list and only checks for row presence; "SELECT 1" is standard convention for readability', vi: 'Vì EXISTS bỏ qua danh sách cột được chọn và chỉ kiểm tra sự tồn tại của dòng; "SELECT 1" là quy ước chuẩn để tăng tính rõ ràng' },
          { en: 'Because SELECT * is illegal inside EXISTS', vi: 'Vì SELECT * bị cấm trong EXISTS' },
          { en: 'Because SELECT 1 changes the return type to integer', vi: 'Vì SELECT 1 đổi kiểu trả về thành số nguyên' },
          { en: 'Because SELECT * runs 10x slower on all engines', vi: 'Vì SELECT * chạy chậm hơn gấp 10 lần trên mọi CSDL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'EXISTS cares only about whether any row is returned, so the SELECT list is ignored by query planners.', vi: 'EXISTS chỉ quan tâm có dòng nào trả về hay không nên danh sách SELECT được trình tối ưu bỏ qua.' }
      },
      {
        id: 'sql_q_12_5',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'medium',
        question: { en: 'In terms of relational algebra, an EXISTS query is classified as what type of join?', vi: 'Về mặt đại số quan hệ, một truy vấn EXISTS được phân loại là kiểu join nào?' },
        options: [
          { en: 'Semi-Join', vi: 'Semi-Join (Bán kết nối)' },
          { en: 'Anti-Join', vi: 'Anti-Join' },
          { en: 'Cross Join', vi: 'Cross Join' },
          { en: 'Full Outer Join', vi: 'Full Outer Join' }
        ],
        correctAnswers: [0],
        explanation: { en: 'EXISTS implements a Semi-Join: matching rows from the left table without duplicating them when multiple right matches exist.', vi: 'EXISTS thực thi phép Semi-Join: lấy các dòng khớp từ bảng trái mà không làm nhân đôi dòng khi có nhiều bản ghi khớp ở bảng phải.' }
      },
      {
        id: 'sql_q_12_6',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'medium',
        question: { en: 'In terms of relational algebra, a NOT EXISTS query is classified as what type of join?', vi: 'Về mặt đại số quan hệ, một truy vấn NOT EXISTS được phân loại là kiểu join nào?' },
        options: [
          { en: 'Anti-Semi-Join (Anti-Join)', vi: 'Anti-Semi-Join (Anti-Join)' },
          { en: 'Inner Join', vi: 'Inner Join' },
          { en: 'Cross Join', vi: 'Cross Join' },
          { en: 'Equi-Join', vi: 'Equi-Join' }
        ],
        correctAnswers: [0],
        explanation: { en: 'NOT EXISTS implements an Anti-Semi-Join, filtering for the non-existence of matching related records.', vi: 'NOT EXISTS thực thi phép Anti-Semi-Join, lọc các bản ghi không có quan hệ tương ứng.' }
      },
      {
        id: 'sql_q_12_7',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'hard',
        question: { en: 'How can a correlated subquery find the second highest salary in a company?', vi: 'Làm thế nào một subquery tương quan có thể tìm mức lương cao thứ hai trong công ty?' },
        options: [
          { en: 'SELECT salary FROM employees e1 WHERE 1 = (SELECT COUNT(DISTINCT salary) FROM employees e2 WHERE e2.salary > e1.salary)', vi: 'SELECT salary FROM employees e1 WHERE 1 = (SELECT COUNT(DISTINCT salary) FROM employees e2 WHERE e2.salary > e1.salary)' },
          { en: 'SELECT MAX(salary) - 1 FROM employees', vi: 'SELECT MAX(salary) - 1 FROM employees' },
          { en: 'SELECT salary FROM employees WHERE salary < 2', vi: 'SELECT salary FROM employees WHERE salary < 2' },
          { en: 'SELECT SECOND(salary) FROM employees', vi: 'SELECT SECOND(salary) FROM employees' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Counting the number of distinct salaries strictly higher than the current salary identifies the N-th rank (1 higher salary = 2nd highest).', vi: 'Đếm số lượng mức lương phân biệt cao hơn mức lương hiện tại giúp xác định thứ hạng thứ N (có 1 mức lương cao hơn = đứng thứ 2).' }
      },
      {
        id: 'sql_q_12_8',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'medium',
        question: { en: 'Can a correlated subquery be placed inside the SELECT clause to compute an inline metric per row?', vi: 'Một truy vấn con tương quan có thể đặt trong mệnh đề SELECT để tính toán chỉ số cho từng dòng không?' },
        options: [
          { en: 'Yes, as long as the correlated subquery returns a scalar (1x1) value for each outer row', vi: 'Có, miễn là subquery tương quan trả về một giá trị vô hướng (1x1) cho mỗi dòng ngoài' },
          { en: 'No, correlated subqueries are only allowed in WHERE', vi: 'Không, subquery tương quan chỉ được phép đặt trong WHERE' },
          { en: 'Only if the table has less than 10 rows', vi: 'Chỉ khi bảng có ít hơn 10 dòng' },
          { en: 'Only in MySQL', vi: 'Chỉ trong MySQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Correlated scalar subqueries in SELECT are valid and widely used for per-row benchmarks.', vi: 'Subquery tương quan vô hướng trong SELECT hoàn toàn hợp lệ và được dùng phổ biến để tính chỉ số đối chuẩn theo từng dòng.' }
      },
      {
        id: 'sql_q_12_9',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'easy',
        question: { en: 'What happens if a correlated subquery in WHERE evaluates to FALSE for a given outer row?', vi: 'Điều gì xảy ra nếu một subquery tương quan trong WHERE trả về FALSE cho một dòng ở bảng ngoài?' },
        options: [
          { en: 'That outer row is excluded from the final query result set', vi: 'Dòng ngoài đó bị loại bỏ khỏi tập kết quả truy vấn cuối cùng' },
          { en: 'The entire query aborts', vi: 'Toàn bộ truy vấn bị hủy' },
          { en: 'The subquery retries', vi: 'Subquery thử lại' },
          { en: 'The row is replaced with NULL', vi: 'Dòng đó bị thay thế bằng NULL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The WHERE clause keeps only candidate rows where the condition evaluates to TRUE.', vi: 'Mệnh đề WHERE chỉ giữ lại các dòng ứng viên có điều kiện trả về TRUE.' }
      },
      {
        id: 'sql_q_12_10',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'hard',
        question: { en: 'Why might a correlated subquery be slower than an equivalent JOIN or Window Function on massive datasets (millions of rows)?', vi: 'Tại sao subquery tương quan có thể chậm hơn một câu lệnh JOIN hoặc Window Function tương đương trên tập dữ liệu hàng triệu dòng?' },
        options: [
          { en: 'If the query optimizer fails to unnest the subquery into a join, it may execute as a nested loop with O(N * M) complexity', vi: 'Nếu trình tối ưu hóa không thể "mở lồng" (unnest) subquery thành một phép join, nó có thể phải thực thi dạng vòng lặp lồng nhau với độ phức tạp O(N * M)' },
          { en: 'Correlated subqueries disable all disk caching', vi: 'Subquery tương quan vô hiệu hóa bộ nhớ đệm ổ đĩa' },
          { en: 'They always convert integers to strings', vi: 'Chúng luôn chuyển đổi số nguyên thành chuỗi' },
          { en: 'They require two database connections', vi: 'Chúng đòi hỏi hai kết nối CSDL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Without query unnesting/decorrelation, correlated subqueries can incur repeated index seeks or scans for each row.', vi: 'Nếu không được mở lồng (decorrelation), subquery tương quan có thể phải lặp lại việc tìm kiếm chỉ mục hoặc quét bảng cho từng dòng.' }
      },
      {
        id: 'sql_q_12_11',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'easy',
        question: { en: 'What does "EXISTS (SELECT 1 FROM table WHERE 1 = 0)" evaluate to?', vi: '"EXISTS (SELECT 1 FROM table WHERE 1 = 0)" trả về giá trị gì?' },
        options: [
          { en: 'FALSE (because 1 = 0 yields 0 rows)', vi: 'FALSE (vì 1 = 0 không trả về dòng nào)' },
          { en: 'TRUE', vi: 'TRUE' },
          { en: 'NULL', vi: 'NULL' },
          { en: 'Error', vi: 'Lỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Since the subquery produces an empty set, EXISTS evaluates to FALSE.', vi: 'Vì subquery trả về tập rỗng nên EXISTS trả về FALSE.' }
      },
      {
        id: 'sql_q_12_12',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'medium',
        question: { en: 'Can a correlated subquery reference multiple enclosing outer query levels (e.g. 2 levels deep)?', vi: 'Một subquery tương quan có thể tham chiếu nhiều cấp truy vấn ngoài bao quanh nó không (ví dụ: lồng sâu 2 cấp)?' },
        options: [
          { en: 'Yes, standard SQL allows resolving identifiers from any outer ancestor scope', vi: 'Có, chuẩn SQL cho phép phân giải định danh từ bất kỳ phạm vi tổ tiên bên ngoài nào' },
          { en: 'No, only 1 level of nesting is allowed', vi: 'Không, chỉ được phép lồng tối đa 1 cấp' },
          { en: 'Only in Oracle and SQL Server', vi: 'Chỉ trong Oracle và SQL Server' },
          { en: 'Only if all tables have identical column counts', vi: 'Chỉ khi tất cả các bảng có cùng số lượng cột' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SQL identifier scoping rules permit lexical lookup through all enclosing ancestor queries.', vi: 'Quy tắc phạm vi định danh trong SQL cho phép tra cứu qua mọi truy vấn cha bao quanh.' }
      },
      {
        id: 'sql_q_12_13',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'hard',
        question: { en: 'How do you delete duplicate records keeping only the lowest ID using a correlated subquery in standard SQL?', vi: 'Làm thế nào để xóa các bản ghi trùng lặp và chỉ giữ lại bản ghi có ID nhỏ nhất bằng subquery tương quan trong chuẩn SQL?' },
        options: [
          { en: 'DELETE FROM users u1 WHERE EXISTS (SELECT 1 FROM users u2 WHERE u1.email = u2.email AND u1.id > u2.id);', vi: 'DELETE FROM users u1 WHERE EXISTS (SELECT 1 FROM users u2 WHERE u1.email = u2.email AND u1.id > u2.id);' },
          { en: 'DELETE FROM users WHERE id IN (SELECT id FROM users);', vi: 'DELETE FROM users WHERE id IN (SELECT id FROM users);' },
          { en: 'DROP TABLE users;', vi: 'DROP TABLE users;' },
          { en: 'TRUNCATE users WHERE duplicate = 1;', vi: 'TRUNCATE users WHERE duplicate = 1;' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Filtering for rows where another row with the same email has a strictly smaller ID cleanly deletes only duplicates.', vi: 'Lọc các dòng mà tồn tại một dòng khác cùng email nhưng có ID nhỏ hơn sẽ xóa chính xác các bản ghi trùng thừa.' }
      },
      {
        id: 'sql_q_12_14',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'easy',
        question: { en: 'What value does "NOT EXISTS (empty_subquery)" evaluate to?', vi: '"NOT EXISTS (subquery_rỗng)" trả về giá trị gì?' },
        options: [
          { en: 'TRUE', vi: 'TRUE' },
          { en: 'FALSE', vi: 'FALSE' },
          { en: 'NULL', vi: 'NULL' },
          { en: 'Error', vi: 'Lỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'NOT (FALSE) evaluates to TRUE.', vi: 'NOT (FALSE) trả về giá trị TRUE.' }
      },
      {
        id: 'sql_q_12_15',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'medium',
        question: { en: 'Why must table aliases be distinct when referencing the same table in a correlated subquery (e.g. employees e vs employees inner_e)?', vi: 'Tại sao các bí danh bảng bắt buộc phải khác nhau khi tham chiếu cùng một bảng trong subquery tương quan (ví dụ: employees e vs employees inner_e)?' },
        options: [
          { en: 'To allow the SQL engine to distinguish which column reference belongs to the outer row vs the inner candidate row', vi: 'Để trình thực thi SQL phân biệt cột nào thuộc về dòng ngoài và cột nào thuộc về dòng ứng viên bên trong' },
          { en: 'To encrypt table data', vi: 'Để mã hóa dữ liệu bảng' },
          { en: 'Because duplicate aliases crash the hard disk', vi: 'Vì trùng bí danh sẽ làm hỏng ổ cứng' },
          { en: 'It is optional; identical aliases work fine', vi: 'Tùy chọn; trùng bí danh vẫn chạy tốt' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Distinct aliases are necessary for lexical scoping and disambiguating outer vs inner row attributes.', vi: 'Bí danh riêng biệt là bắt buộc để phân giải phạm vi và tránh nhầm lẫn giữa thuộc tính dòng ngoài và dòng trong.' }
      },
      {
        id: 'sql_q_12_16',
        type: 'single_choice',
        topicId: 'sql_correlated_subqueries_exists',
        difficulty: 'hard',
        question: { en: 'What is "query unnesting" or "decorrelation" performed by modern SQL query planners?', vi: '"Query unnesting" hay "decorrelation" do các trình tối ưu hóa truy vấn hiện đại thực hiện là gì?' },
        options: [
          { en: 'The optimizer automatically rewrites a correlated subquery into an efficient Semi-Join or Hash Join internally to avoid row-by-row iteration', vi: 'Trình tối ưu hóa tự động chuyển đổi subquery tương quan thành một phép Semi-Join hoặc Hash Join hiệu năng cao để tránh duyệt từng dòng' },
          { en: 'Removing all brackets from SQL statements', vi: 'Xóa toàn bộ dấu ngoặc khỏi câu lệnh SQL' },
          { en: 'Converting SQL into JSON', vi: 'Chuyển đổi SQL thành JSON' },
          { en: 'Deleting nested tables from disk', vi: 'Xóa các bảng lồng nhau khỏi ổ đĩa' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Modern optimizers transform correlated subqueries into set-based joins whenever mathematically provable.', vi: 'Trình tối ưu hóa hiện đại biến đổi các subquery tương quan thành các phép join dạng tập hợp khi có thể chứng minh được mặt toán học.' }
      }
    ]
  },

  // LESSON 13: Common Table Expressions (CTEs) & Recursive CTEs
  {
    id: 'sql_lesson_13',
    moduleId: 'sql_mod_3',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 13,
    topicId: 'sql_ctes_recursive',
    title: {
      en: 'Common Table Expressions (CTEs) & Recursive CTEs',
      vi: 'Biểu Thức Bảng Chung (CTE) & CTE Đệ Quy'
    },
    summary: {
      en: 'Master the WITH clause to structure complex multi-step pipelines into readable modular CTEs, and write Recursive CTEs for hierarchical tree traversal, graph navigation, and sequence generation.',
      vi: 'Làm chủ mệnh đề WITH để cấu trúc các quy trình xử lý dữ liệu phức tạp thành các khối CTE mô-đun rõ ràng, và viết CTE đệ quy để duyệt cây phân cấp, đồ thị và sinh dãy số.'
    },
    estimatedMinutes: 24,
    learn: {
      introduction: {
        en: 'A Common Table Expression (CTE) is a named temporary result set defined using the WITH clause that exists only during the execution scope of a single query. CTEs replace messy nested subqueries with clean, top-down sequential logic.',
        vi: 'Biểu thức bảng chung (Common Table Expression - CTE) là một tập kết quả tạm thời được đặt tên định nghĩa bằng mệnh đề WITH, chỉ tồn tại trong phạm vi thực thi của một câu truy vấn duy nhất. CTE thay thế các subquery lồng nhau rối rắm bằng logic tuần tự từ trên xuống dưới vô cùng trong sáng.'
      },
      conceptExplanation: {
        en: 'Standard CTEs allow defining multiple modular steps separated by commas (WITH step1 AS (...), step2 AS (...)). A Recursive CTE is a powerful SQL construct that references its own name. It consists of: 1) Anchor Member (the base case query that seeds the recursion), 2) UNION ALL operator, and 3) Recursive Member (the query referencing the CTE itself, terminating when it returns 0 rows). Recursive CTEs are the gold standard for querying organizational charts, bill-of-materials hierarchies, and date/integer sequences.',
        vi: 'CTE tiêu chuẩn cho phép định nghĩa nhiều bước mô-đun phân tách bằng dấu phẩy (WITH buoc1 AS (...), buoc2 AS (...)). CTE đệ quy (Recursive CTE) là cấu trúc SQL mạnh mẽ có khả năng tự tham chiếu chính nó. Nó bao gồm: 1) Điểm neo Anchor Member (truy vấn cơ sở khởi tạo đệ quy), 2) Toán tử UNION ALL, và 3) Nhánh đệ quy Recursive Member (truy vấn tham chiếu lại chính CTE, dừng lại khi trả về 0 dòng). CTE đệ quy là chuẩn mực vàng để duyệt cây sơ đồ tổ chức, phân cấp sản phẩm và sinh chuỗi ngày tháng/số nguyên.'
      },
      syntax: `-- 1. Standard Modular CTEs:
WITH course_stats AS (
  SELECT course, AVG(score) AS avg_score, COUNT(*) AS student_count
  FROM students
  GROUP BY course
),
high_performing_courses AS (
  SELECT course, avg_score
  FROM course_stats
  WHERE avg_score >= 80.0
)
SELECT * FROM high_performing_courses;

-- 2. Recursive CTE (Sequence Generator / Hierarchy):
WITH RECURSIVE number_seq AS (
  -- Anchor Member:
  SELECT 1 AS num
  UNION ALL
  -- Recursive Member:
  SELECT num + 1 FROM number_seq WHERE num < 10
)
SELECT num FROM number_seq;`,
      examples: [
        {
          title: {
            en: '1. Modular Pipeline: Department Metrics & Top Earners',
            vi: '1. Quy Trình Mô-Đun: Chỉ Số Phòng Ban & Nhân Sự Lương Cao'
          },
          code: `WITH dept_averages AS (
  SELECT dept_id,
         ROUND(AVG(salary), 2) AS avg_dept_salary,
         COUNT(*) AS dept_size
  FROM employees
  GROUP BY dept_id
),
filtered_employees AS (
  SELECT e.name, e.dept_id, e.salary, d.avg_dept_salary,
         ROUND(e.salary - d.avg_dept_salary, 2) AS salary_diff
  FROM employees e
  JOIN dept_averages d ON e.dept_id = d.dept_id
  WHERE e.salary > d.avg_dept_salary
)
SELECT * FROM filtered_employees
ORDER BY salary_diff DESC;`,
          language: 'sql',
          explanation: {
            en: 'Breaks complex aggregation and delta comparisons into clean sequential stages rather than unreadable nested derived tables.',
            vi: 'Chia nhỏ phép tổng hợp phức tạp và tính độ lệch thành các bước tuần tự rõ ràng thay vì dùng các bảng phái sinh lồng nhau khó đọc.'
          }
        },
        {
          title: {
            en: '2. Recursive CTE: Generating a Dynamic 7-Day Date Series in SQLite',
            vi: '2. CTE Đệ Quy: Sinh Dãy 7 Ngày Liên Tục Tự Động Trong SQLite'
          },
          code: `WITH RECURSIVE date_series AS (
  SELECT date('2024-01-01') AS cal_date
  UNION ALL
  SELECT date(cal_date, '+1 day')
  FROM date_series
  WHERE cal_date < '2024-01-07'
)
SELECT cal_date FROM date_series;`,
          language: 'sql',
          explanation: {
            en: 'Generates a continuous sequence of 7 consecutive dates dynamically without needing a physical calendar table.',
            vi: 'Tạo một chuỗi liên tục gồm 7 ngày liên tiếp một cách tự động mà không cần phải có sẵn bảng lịch vật lý.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Creating infinite recursion by forgetting the termination condition in the recursive member',
            vi: 'Gây ra đệ quy vô tận do quên điều kiện dừng ở nhánh đệ quy'
          },
          correction: {
            en: 'The recursive member of a WITH RECURSIVE statement must include a terminating WHERE clause (e.g. WHERE level < 100). Otherwise, it will loop indefinitely until exhausting memory or hitting safety recursion limits.',
            vi: 'Nhánh đệ quy trong WITH RECURSIVE bắt buộc phải có điều kiện dừng trong WHERE (ví dụ: WHERE level < 100). Nếu không, nó sẽ lặp vô tận đến khi tràn RAM hoặc chạm trần giới hạn đệ quy an toàn.'
          },
          code: `-- CRASH / INFINITE LOOP:
WITH RECURSIVE bad_loop AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM bad_loop) SELECT * FROM bad_loop;
-- SAFE & CONTROLLED:
WITH RECURSIVE safe_loop AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM safe_loop WHERE n < 10) SELECT * FROM safe_loop;`
        },
        {
          mistake: {
            en: 'Repeating the "WITH" keyword for consecutive CTE definitions',
            vi: 'Lặp lại từ khóa "WITH" khi định nghĩa nhiều CTE liên tiếp'
          },
          correction: {
            en: 'Write "WITH" only once at the beginning. Separate consecutive CTEs with commas.',
            vi: 'Chỉ viết từ khóa "WITH" duy nhất một lần ở đầu. Phân tách các CTE liên tiếp bằng dấu phẩy.'
          },
          code: `-- ERROR: WITH cte1 AS (...) WITH cte2 AS (...) SELECT ...
-- CORRECT:
WITH cte1 AS (...), cte2 AS (...) SELECT ...`
        }
      ],
      tips: [
        {
          en: 'In PostgreSQL and SQLite 3.35+, CTEs can also be used with INSERT, UPDATE, and DELETE statements using the RETURNING clause for powerful data pipelines.',
          vi: 'Trong PostgreSQL và SQLite 3.35+, CTE có thể kết hợp với INSERT, UPDATE, DELETE cùng mệnh đề RETURNING để xây dựng pipeline dữ liệu mạnh mẽ.'
        },
        {
          en: 'In SQLite, the RECURSIVE keyword is required when writing recursive CTEs (e.g. WITH RECURSIVE cte AS ...).',
          vi: 'Trong SQLite, bắt buộc phải có từ khóa RECURSIVE khi viết CTE đệ quy (ví dụ: WITH RECURSIVE cte AS ...).'
        }
      ],
      practiceStarterCode: `-- Use a CTE to filter above-average students
WITH course_summary AS (
  SELECT course, AVG(score) AS avg_score
  FROM students
  GROUP BY course
)
SELECT s.name, s.course, s.score, ROUND(c.avg_score, 2) AS avg_score
FROM students s
JOIN course_summary c ON s.course = c.course
WHERE s.score >= c.avg_score;`,
      practice: {
        task: {
          en: 'Write a query using WITH RECURSIVE to generate integers from 1 to 5: WITH RECURSIVE seq AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM seq WHERE n < 5) SELECT n FROM seq;',
          vi: 'Viết truy vấn dùng WITH RECURSIVE để sinh dãy số nguyên từ 1 đến 5: WITH RECURSIVE seq AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM seq WHERE n < 5) SELECT n FROM seq;'
        },
        starterCode: `-- Generate numbers 1 to 5 using WITH RECURSIVE
WITH RECURSIVE seq AS (
  SELECT 1 AS n
  UNION ALL
  SELECT 
)
SELECT n FROM seq;`,
        solutionCode: `WITH RECURSIVE seq AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM seq WHERE n < 5) SELECT n FROM seq;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_13_1',
        type: 'fix_code',
        title: { en: 'Fix Duplicate WITH Keyword in Chained CTEs', vi: 'Sửa Lỗi Lặp Từ Khóa WITH Khi Nối Nhiều CTE' },
        instruction: {
          en: 'Replace the second "WITH" keyword with a comma to cleanly chain the two CTEs.',
          vi: 'Thay thế từ khóa "WITH" thứ hai bằng dấu phẩy để nối chuỗi hai CTE hợp lệ.'
        },
        starterCode: 'WITH t1 AS (SELECT 1 AS x) WITH t2 AS (SELECT 2 AS y) SELECT x, y FROM t1 CROSS JOIN t2;',
        solutionCode: 'WITH t1 AS (SELECT 1 AS x), t2 AS (SELECT 2 AS y) SELECT x, y FROM t1 CROSS JOIN t2;',
        hint: { en: 'Replace "WITH t2" with ", t2".', vi: 'Thay "WITH t2" bằng ", t2".' },
        explanation: {
          en: 'Multiple CTEs in the same query are separated by commas under a single leading WITH keyword.',
          vi: 'Nhiều CTE trong cùng một truy vấn được phân tách bằng dấu phẩy dưới một từ khóa WITH duy nhất.'
        }
      },
      {
        id: 'sql_ex_13_2',
        type: 'complete_code',
        title: { en: 'Complete Recursive CTE Number Generator Termination', vi: 'Hoàn Thiện Điều Kiện Dừng Cho CTE Đệ Quy Sinh Số' },
        instruction: {
          en: 'Complete the termination condition in the recursive member: "WHERE n < 10".',
          vi: 'Hoàn thiện điều kiện dừng ở nhánh đệ quy: "WHERE n < 10".'
        },
        starterCode: 'WITH RECURSIVE counter AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM counter WHERE n < ) SELECT n FROM counter;',
        solutionCode: 'WITH RECURSIVE counter AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM counter WHERE n < 10) SELECT n FROM counter;',
        hint: { en: 'Add "10" after "WHERE n < ".', vi: 'Thêm "10" vào sau "WHERE n < ".' },
        explanation: {
          en: 'The recursive member terminates when the WHERE condition evaluates to FALSE.',
          vi: 'Nhánh đệ quy sẽ dừng lại khi điều kiện WHERE không còn thỏa mãn.'
        }
      },
      {
        id: 'sql_ex_13_3',
        type: 'write_code',
        title: { en: 'Modular Customer Spending CTE Pipeline', vi: 'Pipeline Tính Chi Tiêu Khách Hàng Bằng CTE Mô-Đun' },
        instruction: {
          en: 'Write a query with a CTE named customer_spend calculating customer_name and SUM(amount) AS total_spent from orders GROUP BY customer_name, then query it for customer_name and total_spent WHERE total_spent >= 100.0.',
          vi: 'Viết truy vấn với CTE tên customer_spend tính customer_name và SUM(amount) AS total_spent từ orders GROUP BY customer_name, sau đó truy vấn lấy customer_name và total_spent CÓ total_spent >= 100.0.'
        },
        starterCode: '-- Write CTE pipeline for customer spending\n',
        solutionCode: 'WITH customer_spend AS (SELECT customer_name, SUM(amount) AS total_spent FROM orders GROUP BY customer_name) SELECT customer_name, total_spent FROM customer_spend WHERE total_spent >= 100.0;',
        hint: { en: 'WITH customer_spend AS (...) SELECT customer_name, total_spent FROM customer_spend WHERE total_spent >= 100.0;', vi: 'WITH customer_spend AS (...) SELECT customer_name, total_spent FROM customer_spend WHERE total_spent >= 100.0;' },
        explanation: {
          en: 'CTEs organize data transformations cleanly into readable sequential steps.',
          vi: 'CTE tổ chức các bước biến đổi dữ liệu thành các khối tuần tự rõ ràng, dễ đọc.'
        }
      },
      {
        id: 'sql_ex_13_4',
        type: 'modify_example',
        title: { en: 'Generate Even Numbers with Recursive Step', vi: 'Sinh Dãy Số Chẵn Bằng Bước Nhảy Đệ Quy' },
        instruction: {
          en: 'Modify the recursive query to generate even numbers starting from 2 up to 10 by changing "+ 1" to "+ 2" and starting from 2.',
          vi: 'Sửa truy vấn đệ quy để sinh các số chẵn bắt đầu từ 2 đến 10 bằng cách đổi "+ 1" thành "+ 2" và bắt đầu từ 2.'
        },
        starterCode: 'WITH RECURSIVE evens AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM evens WHERE n < 10) SELECT n FROM evens;',
        solutionCode: 'WITH RECURSIVE evens AS (SELECT 2 AS n UNION ALL SELECT n + 2 FROM evens WHERE n < 10) SELECT n FROM evens;',
        hint: { en: 'Change SELECT 1 to SELECT 2, and n + 1 to n + 2.', vi: 'Đổi SELECT 1 thành SELECT 2 và n + 1 thành n + 2.' },
        explanation: {
          en: 'Arithmetic step sizes in the recursive member control the iteration increment.',
          vi: 'Bước nhảy số học trong nhánh đệ quy điều khiển gia số của mỗi vòng lặp.'
        }
      },
      {
        id: 'sql_ex_13_5',
        type: 'predict_output',
        title: { en: 'Predict Output of Recursive CTE', vi: 'Dự Đoán Kết Quả Của CTE Đệ Quy' },
        instruction: {
          en: 'What numbers are output by "WITH RECURSIVE r AS (SELECT 5 AS n UNION ALL SELECT n - 1 FROM r WHERE n > 1) SELECT n FROM r;"?',
          vi: 'Những số nào được xuất ra bởi "WITH RECURSIVE r AS (SELECT 5 AS n UNION ALL SELECT n - 1 FROM r WHERE n > 1) SELECT n FROM r;"?'
        },
        starterCode: '-- Predict recursive countdown\n',
        solutionCode: 'SELECT 5 AS first_val, 1 AS last_val;',
        options: ['5, 4, 3, 2, 1 (countdown sequence of 5 rows)', '1, 2, 3, 4, 5', '5 only', 'Infinite loop'],
        correctOptionIndex: 0,
        hint: { en: 'Recursion starts at 5 and subtracts 1 down to 1.', vi: 'Đệ quy bắt đầu từ 5 và trừ đi 1 cho đến 1.' },
        explanation: {
          en: 'The anchor yields 5, and each step subtracts 1 until n reaches 1, producing [5, 4, 3, 2, 1].',
          vi: 'Điểm neo tạo số 5, mỗi bước trừ 1 đến khi n đạt 1, tạo ra dãy [5, 4, 3, 2, 1].'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_13',
      title: { en: 'Multi-Tier Student Performance & Departmental Budget Pipeline', vi: 'Pipeline Phân Tích Điểm Sinh Viên Đa Tầng & Ngân Sách Phòng Ban' },
      description: {
        en: 'Write a modular SQL query using CTEs that creates a multi-step analysis pipeline: 1) CTE "student_ranks": Select s.name, s.course, s.score, s.city, and determine a performance tier as grade_tier (\'Honor Roll\' for score >= 85, \'Standard\' for score >= 60, \'Needs Support\' otherwise). 2) CTE "city_totals": Calculate city, COUNT(*) AS student_count, ROUND(AVG(score), 2) AS avg_city_score from student_ranks GROUP BY city. 3) Main query: Join student_ranks with city_totals on city. Project sr.name, sr.course, sr.score, sr.grade_tier, ct.city, ct.avg_city_score, ct.student_count. Exclude any records where ct.student_count < 2. Order by sr.score DESC, sr.name ASC.',
        vi: 'Viết truy vấn SQL mô-đun sử dụng CTE tạo pipeline phân tích đa bước: 1) CTE "student_ranks": Chọn s.name, s.course, s.score, s.city và phân loại học lực grade_tier (\'Honor Roll\' nếu score >= 85, \'Standard\' nếu score >= 60, còn lại là \'Needs Support\'). 2) CTE "city_totals": Tính city, COUNT(*) AS student_count, ROUND(AVG(score), 2) AS avg_city_score từ student_ranks gom nhóm theo city. 3) Truy vấn chính: Join student_ranks với city_totals theo city. Lấy sr.name, sr.course, sr.score, sr.grade_tier, ct.city, ct.avg_city_score, ct.student_count. Loại bỏ các thành phố có ct.student_count < 2. Sắp xếp theo sr.score DESC, sr.name ASC.'
      },
      requirements: [
        { en: "CTE 1 student_ranks with CASE WHEN score >= 85 THEN 'Honor Roll'...", vi: "CTE 1 student_ranks với CASE WHEN score >= 85 THEN 'Honor Roll'..." },
        { en: 'CTE 2 city_totals grouping student_ranks by city', vi: 'CTE 2 city_totals gom nhóm student_ranks theo city' },
        { en: 'Main query joining CTE 1 and CTE 2 WHERE ct.student_count >= 2', vi: 'Truy vấn chính join CTE 1 và CTE 2 CÓ ct.student_count >= 2' },
        { en: 'ORDER BY sr.score DESC, sr.name ASC', vi: 'ORDER BY sr.score DESC, sr.name ASC' }
      ],
      starterCode: `-- Write your modular multi-CTE query below
WITH student_ranks AS (
  SELECT name, course, score, city,
         CASE 
           WHEN score >= 85 THEN 'Honor Roll'
           WHEN score >= 60 THEN 'Standard'
           ELSE 'Needs Support'
         END AS grade_tier
  FROM students
),
city_totals AS (
  SELECT city, COUNT(*) AS student_count, ROUND(AVG(score), 2) AS avg_city_score
  FROM student_ranks
  GROUP BY city
)
SELECT sr.name, sr.course, sr.score, sr.grade_tier, ct.city, ct.avg_city_score, ct.student_count
FROM student_ranks sr
JOIN city_totals ct ON sr.city = ct.city
WHERE ct.student_count >= 2
ORDER BY ;`,
      solutionCode: `WITH student_ranks AS (SELECT name, course, score, city, CASE WHEN score >= 85 THEN 'Honor Roll' WHEN score >= 60 THEN 'Standard' ELSE 'Needs Support' END AS grade_tier FROM students), city_totals AS (SELECT city, COUNT(*) AS student_count, ROUND(AVG(score), 2) AS avg_city_score FROM student_ranks GROUP BY city) SELECT sr.name, sr.course, sr.score, sr.grade_tier, ct.city, ct.avg_city_score, ct.student_count FROM student_ranks sr JOIN city_totals ct ON sr.city = ct.city WHERE ct.student_count >= 2 ORDER BY sr.score DESC, sr.name ASC;`,
      hints: [{ en: 'Complete with ORDER BY sr.score DESC, sr.name ASC.', vi: 'Hoàn thiện với ORDER BY sr.score DESC, sr.name ASC.' }],
      solutionExplanation: {
        en: 'Structures multiple sequential transformations into clear, self-documenting data pipelines using chained CTEs.',
        vi: 'Cấu trúc nhiều bước chuyển đổi tuần tự thành các pipeline dữ liệu rõ ràng, tự tài liệu hóa bằng chuỗi các CTE.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_13_v1',
        title: { en: 'Multi-Tier Student Performance & Departmental Budget Pipeline', vi: 'Pipeline Phân Tích Điểm Sinh Viên Đa Tầng & Ngân Sách Phòng Ban' },
        description: {
          en: 'Build 2 CTEs (student_ranks with grade_tier, city_totals with student_count and avg_city_score) and join them for cities with >= 2 students, ordered by score DESC, name ASC.',
          vi: 'Xây dựng 2 CTE (student_ranks kèm grade_tier, city_totals kèm student_count và avg_city_score) rồi join lại cho các thành phố có >= 2 học viên, xếp theo score DESC, name ASC.'
        },
        requirements: [{ en: 'ORDER BY sr.score DESC, sr.name ASC', vi: 'ORDER BY sr.score DESC, sr.name ASC' }],
        starterCode: `WITH student_ranks AS (...), city_totals AS (...) SELECT ...;`,
        solutionCode: `WITH student_ranks AS (SELECT name, course, score, city, CASE WHEN score >= 85 THEN 'Honor Roll' WHEN score >= 60 THEN 'Standard' ELSE 'Needs Support' END AS grade_tier FROM students), city_totals AS (SELECT city, COUNT(*) AS student_count, ROUND(AVG(score), 2) AS avg_city_score FROM student_ranks GROUP BY city) SELECT sr.name, sr.course, sr.score, sr.grade_tier, ct.city, ct.avg_city_score, ct.student_count FROM student_ranks sr JOIN city_totals ct ON sr.city = ct.city WHERE ct.student_count >= 2 ORDER BY sr.score DESC, sr.name ASC;`,
        hints: [{ en: 'Chain CTE 1 and CTE 2 with a comma.', vi: 'Nối CTE 1 và CTE 2 bằng dấu phẩy.' }],
        solutionExplanation: { en: 'Modular analytical pipeline with chained CTEs.', vi: 'Pipeline phân tích mô-đun với chuỗi các CTE.' }
      },
      {
        id: 'sql_ch_13_v2',
        title: { en: 'Recursive Integer Series and Multiplication Table', vi: 'Dãy Số Nguyên Đệ Quy & Bảng Cửu Chương' },
        description: {
          en: 'Write a recursive CTE named factors generating numbers 1 to 5 (num), and in the main query select num, (num * 10) AS product_10, (num * num) AS square FROM factors ORDER BY num ASC;',
          vi: 'Viết CTE đệ quy tên factors sinh các số 1 đến 5 (num), và ở truy vấn chính chọn num, (num * 10) AS product_10, (num * num) AS square TỪ factors XẾP THEO num ASC;'
        },
        requirements: [
          { en: 'WITH RECURSIVE factors AS (SELECT 1 AS num UNION ALL SELECT num + 1 FROM factors WHERE num < 5)', vi: 'WITH RECURSIVE factors AS (SELECT 1 AS num UNION ALL SELECT num + 1 FROM factors WHERE num < 5)' },
          { en: 'SELECT num, (num * 10) AS product_10, (num * num) AS square ORDER BY num ASC', vi: 'SELECT num, (num * 10) AS product_10, (num * num) AS square ORDER BY num ASC' }
        ],
        starterCode: `WITH RECURSIVE factors AS (SELECT 1 AS num UNION ALL SELECT num + 1 FROM factors WHERE num < 5) SELECT num FROM factors;`,
        solutionCode: `WITH RECURSIVE factors AS (SELECT 1 AS num UNION ALL SELECT num + 1 FROM factors WHERE num < 5) SELECT num, (num * 10) AS product_10, (num * num) AS square FROM factors ORDER BY num ASC;`,
        hints: [{ en: 'Add computed columns in the main query.', vi: 'Thêm các cột tính toán vào truy vấn chính.' }],
        solutionExplanation: { en: 'Generates arithmetic products from a recursive generator.', vi: 'Tạo các tích số học từ bộ sinh đệ quy.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_13_1',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'easy',
        question: { en: 'What does "CTE" stand for in SQL?', vi: '"CTE" viết tắt của cụm từ nào trong SQL?' },
        options: [
          { en: 'Common Table Expression', vi: 'Common Table Expression (Biểu Thức Bảng Chung)' },
          { en: 'Central Transaction Engine', vi: 'Central Transaction Engine' },
          { en: 'Cascading Table Extension', vi: 'Cascading Table Extension' },
          { en: 'Column Type Evaluation', vi: 'Column Type Evaluation' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CTE stands for Common Table Expression, introduced with the WITH keyword.', vi: 'CTE là viết tắt của Common Table Expression, bắt đầu bằng từ khóa WITH.' }
      },
      {
        id: 'sql_q_13_2',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'easy',
        question: { en: 'What is the primary readability advantage of a CTE over deeply nested subqueries in the FROM clause?', vi: 'Ưu điểm lớn nhất về tính dễ đọc của CTE so với các subquery lồng nhau trong mệnh đề FROM là gì?' },
        options: [
          { en: 'It presents data transformations in top-down sequential order rather than inside-out nesting', vi: 'Nó trình bày các bước biến đổi dữ liệu theo thứ tự tuần tự từ trên xuống dưới thay vì lồng nhau từ trong ra ngoài' },
          { en: 'It permanently saves tables to disk', vi: 'Nó lưu vĩnh viễn các bảng vào ổ đĩa' },
          { en: 'It encrypts variable names', vi: 'Nó mã hóa tên các biến' },
          { en: 'It removes the need for primary keys', vi: 'Nó loại bỏ nhu cầu cần khóa chính' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CTEs structure queries sequentially from top to bottom, greatly improving maintainability.', vi: 'CTE cấu trúc các truy vấn tuần tự từ trên xuống dưới, giúp việc bảo trì code dễ dàng hơn rất nhiều.' }
      },
      {
        id: 'sql_q_13_3',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'medium',
        question: { en: 'What are the two required core parts of a Recursive CTE?', vi: 'Hai thành phần cốt lõi bắt buộc của một CTE Đệ Quy là gì?' },
        options: [
          { en: 'An Anchor Member (base query) and a Recursive Member (self-referencing query) combined by UNION ALL', vi: 'Điểm neo Anchor Member (truy vấn cơ sở) và Nhánh đệ quy Recursive Member (truy vấn tự tham chiếu) được kết hợp bằng UNION ALL' },
          { en: 'A primary key and a foreign key', vi: 'Một khóa chính và một khóa ngoại' },
          { en: 'A WHERE clause and a HAVING clause', vi: 'Một mệnh đề WHERE và một mệnh đề HAVING' },
          { en: 'An INSERT and a DELETE statement', vi: 'Một câu lệnh INSERT và một câu lệnh DELETE' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Recursive CTEs require an anchor query to seed initial rows and a recursive query to iterate.', vi: 'CTE đệ quy bắt buộc phải có câu truy vấn neo để tạo dòng mầm ban đầu và câu truy vấn đệ quy để lặp.' }
      },
      {
        id: 'sql_q_13_4',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'easy',
        question: { en: 'How do you separate multiple CTE definitions in a single SQL statement?', vi: 'Làm thế nào để phân tách nhiều định nghĩa CTE trong cùng một câu lệnh SQL?' },
        options: [
          { en: 'Using commas between CTE definitions under a single initial WITH keyword', vi: 'Dùng dấu phẩy giữa các định nghĩa CTE dưới một từ khóa WITH duy nhất ở đầu' },
          { en: 'Writing WITH before each CTE name', vi: 'Viết từ khóa WITH trước mỗi tên CTE' },
          { en: 'Using semicolons ;', vi: 'Dùng dấu chấm phẩy ;' },
          { en: 'Using AND keywords', vi: 'Dùng từ khóa AND' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CTEs are comma-delimited after the leading WITH keyword: WITH cte1 AS (...), cte2 AS (...).', vi: 'Các CTE được phân tách bằng dấu phẩy sau từ khóa WITH đầu tiên: WITH cte1 AS (...), cte2 AS (...).' }
      },
      {
        id: 'sql_q_13_5',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'medium',
        question: { en: 'What is the scope and lifetime of a Common Table Expression?', vi: 'Phạm vi và vòng đời tồn tại của một CTE là gì?' },
        options: [
          { en: 'It exists strictly during the execution of that single SQL statement and is discarded immediately after', vi: 'Nó chỉ tồn tại duy nhất trong quá trình thực thi câu lệnh SQL đó và bị hủy ngay lập tức sau đó' },
          { en: 'It persists until the database server is rebooted', vi: 'Nó tồn tại cho đến khi máy chủ CSDL khởi động lại' },
          { en: 'It is saved forever in the schema catalog', vi: 'Nó được lưu vĩnh viễn trong danh mục lược đồ' },
          { en: 'It persists throughout the entire user session across all queries', vi: 'Nó tồn tại xuyên suốt toàn bộ phiên làm việc của người dùng qua mọi truy vấn' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CTEs are ephemeral inline constructs whose lifecycle terminates with the statement.', vi: 'CTE là cấu trúc nội tuyến tạm thời có vòng đời kết thúc ngay khi câu lệnh chạy xong.' }
      },
      {
        id: 'sql_q_13_6',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'hard',
        question: { en: 'What real-world data structures are ideal for querying with Recursive CTEs?', vi: 'Cấu trúc dữ liệu thực tế nào là lý tưởng nhất để truy vấn bằng CTE Đệ Quy?' },
        options: [
          { en: 'Hierarchical and graph structures: organizational management trees, file system directories, and bill-of-materials', vi: 'Cấu trúc phân cấp và đồ thị: cây sơ đồ quản lý tổ chức, thư mục tập tin và cấu trúc linh kiện sản phẩm (bill-of-materials)' },
          { en: 'Flat key-value pairs only', vi: 'Chỉ các cặp key-value phẳng' },
          { en: 'Encrypted passwords', vi: 'Mật khẩu đã mã hóa' },
          { en: 'Binary blob images', vi: 'Dữ liệu nhị phân hình ảnh blob' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Recursive CTEs excel at traversing tree depth and graph relations (parent-child links).', vi: 'CTE đệ quy đặc biệt xuất sắc khi duyệt độ sâu của cây và quan hệ đồ thị (liên kết cha-con).' }
      },
      {
        id: 'sql_q_13_7',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'medium',
        question: { en: 'Can a CTE reference a previously defined CTE in the same WITH block?', vi: 'Một CTE có thể tham chiếu đến một CTE đã được định nghĩa trước đó trong cùng khối WITH không?' },
        options: [
          { en: 'Yes, subsequent CTEs can freely query any earlier CTEs defined before them in the same WITH clause', vi: 'Có, các CTE phía sau có thể tự do truy vấn bất kỳ CTE nào được định nghĩa trước nó trong cùng mệnh đề WITH' },
          { en: 'No, CTEs cannot reference each other', vi: 'Không, các CTE không thể tham chiếu lẫn nhau' },
          { en: 'Only if both CTEs have identical column names', vi: 'Chỉ khi cả hai CTE có cùng tên cột' },
          { en: 'Only in PostgreSQL', vi: 'Chỉ trong PostgreSQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CTEs can be chained into pipelines: CTE2 can query CTE1, and CTE3 can query CTE2.', vi: 'Các CTE có thể ghép thành chuỗi: CTE2 có thể truy vấn CTE1 và CTE3 có thể truy vấn CTE2.' }
      },
      {
        id: 'sql_q_13_8',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'hard',
        question: { en: 'What happens if a recursive CTE lacks a proper terminating condition in its recursive member?', vi: 'Điều gì xảy ra nếu một CTE đệ quy thiếu điều kiện dừng hợp lệ ở nhánh đệ quy?' },
        options: [
          { en: 'It causes infinite recursion, leading to execution timeouts, memory exhaustion, or exceeding maximum recursion depth limits', vi: 'Gây ra đệ quy vô tận, dẫn đến quá thời gian thực thi (timeout), tràn bộ nhớ hoặc vượt quá giới hạn độ sâu đệ quy tối đa' },
          { en: 'It automatically stops at row 100 on all databases', vi: 'Nó tự động dừng ở dòng 100 trên mọi CSDL' },
          { en: 'The database drops the master table', vi: 'CSDL xóa bảng chính' },
          { en: 'It converts the query to an inner join', vi: 'Nó chuyển đổi truy vấn thành inner join' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Unbounded recursion continues indefinitely until hitting safety limits (like max_recursion in engines).', vi: 'Đệ quy không giới hạn sẽ lặp vô tận cho đến khi chạm các hạn mức an toàn của hệ quản trị CSDL.' }
      },
      {
        id: 'sql_q_13_9',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'easy',
        question: { en: 'Which keyword is required when defining a recursive CTE in SQLite and PostgreSQL?', vi: 'Từ khóa nào là bắt buộc khi định nghĩa một CTE đệ quy trong SQLite và PostgreSQL?' },
        options: [
          { en: 'WITH RECURSIVE', vi: 'WITH RECURSIVE' },
          { en: 'WITH LOOP', vi: 'WITH LOOP' },
          { en: 'WITH ITERATE', vi: 'WITH ITERATE' },
          { en: 'WITH REPEAT', vi: 'WITH REPEAT' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ANSI SQL specifies `WITH RECURSIVE` as the keyword initiating recursive CTE definitions.', vi: 'Chuẩn ANSI SQL quy định `WITH RECURSIVE` là từ khóa mở đầu cho định nghĩa CTE đệ quy.' }
      },
      {
        id: 'sql_q_13_10',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'medium',
        question: { en: 'Can a CTE be referenced multiple times in the main query (e.g. joined with itself)?', vi: 'Một CTE có thể được tham chiếu nhiều lần trong câu truy vấn chính không (ví dụ: tự join với chính nó)?' },
        options: [
          { en: 'Yes, a CTE can be referenced as many times as needed in the main query, eliminating redundant duplicate subqueries', vi: 'Có, một CTE có thể được tham chiếu bao nhiêu lần tùy ý trong câu truy vấn chính, loại bỏ các subquery lặp lại dư thừa' },
          { en: 'No, a CTE can only be queried once', vi: 'Không, một CTE chỉ được truy vấn duy nhất một lần' },
          { en: 'Only if UNION is used', vi: 'Chỉ khi có dùng UNION' },
          { en: 'Only for tables under 100 rows', vi: 'Chỉ áp dụng cho bảng dưới 100 dòng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'A major benefit of CTEs is reuse: defining an expensive query once and joining it multiple times.', vi: 'Lợi ích lớn của CTE là khả năng tái sử dụng: định nghĩa truy vấn phức tạp một lần và join nhiều lần.' }
      },
      {
        id: 'sql_q_13_11',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'hard',
        question: { en: 'In modern PostgreSQL, what does the "MATERIALIZED" keyword do when defining a CTE (e.g. WITH cte AS MATERIALIZED (...))?', vi: 'Trong PostgreSQL hiện đại, từ khóa "MATERIALIZED" làm gì khi định nghĩa một CTE (ví dụ: WITH cte AS MATERIALIZED (...))?' },
        options: [
          { en: 'It forces the database to execute the CTE independently and write intermediate results to a temporary memory buffer as an optimization fence', vi: 'Nó bắt CSDL phải thực thi CTE độc lập và ghi kết quả trung gian vào bộ đệm tạm thời như một hàng rào tối ưu hóa (optimization fence)' },
          { en: 'It writes the data to a physical disk table permanently', vi: 'Nó ghi dữ liệu vĩnh viễn vào một bảng vật lý trên đĩa' },
          { en: 'It encrypts the CTE', vi: 'Nó mã hóa CTE' },
          { en: 'It converts the CTE to a view', vi: 'Nó chuyển đổi CTE thành view' }
        ],
        correctAnswers: [0],
        explanation: { en: 'MATERIALIZED acts as an optimization barrier, preventing the query planner from inlining or pushing down predicates into the CTE.', vi: 'MATERIALIZED hoạt động như một rào cản tối ưu, ngăn không cho trình lập kế hoạch nội tuyến hóa hoặc đẩy điều kiện lọc xuống CTE.' }
      },
      {
        id: 'sql_q_13_12',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'easy',
        question: { en: 'Where does the main SELECT statement sit relative to the WITH clause?', vi: 'Câu lệnh SELECT chính nằm ở vị trí nào so với mệnh đề WITH?' },
        options: [
          { en: 'Immediately following the closing parenthesis of the last CTE definition', vi: 'Đứng ngay sau dấu ngoặc đơn đóng của định nghĩa CTE cuối cùng' },
          { en: 'Before the WITH keyword', vi: 'Đứng trước từ khóa WITH' },
          { en: 'Inside the anchor member', vi: 'Bên trong điểm neo anchor member' },
          { en: 'In a separate transaction file', vi: 'Trong một file transaction riêng biệt' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The final query executes immediately after all CTEs are defined in the WITH block.', vi: 'Truy vấn cuối cùng được thực thi ngay sau khi tất cả các CTE đã được khai báo trong khối WITH.' }
      },
      {
        id: 'sql_q_13_13',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'medium',
        question: { en: 'How do you alias projected columns in a CTE definition (e.g. WITH monthly_sales(m, total) AS ...)?', vi: 'Làm thế nào để đặt bí danh cho các cột trong định nghĩa CTE (ví dụ: WITH monthly_sales(m, total) AS ...)?' },
        options: [
          { en: 'By listing explicit column names in parentheses after the CTE name: WITH cte_name(col1, col2) AS (...)', vi: 'Bằng cách liệt kê danh sách tên cột rõ ràng trong dấu ngoặc đơn sau tên CTE: WITH ten_cte(cot1, cot2) AS (...)' },
          { en: 'Using the RENAME clause', vi: 'Dùng mệnh đề RENAME' },
          { en: 'By casting every column to string', vi: 'Bằng cách ép kiểu mọi cột sang chuỗi' },
          { en: 'Explicit column naming is not supported in CTEs', vi: 'Không hỗ trợ đặt tên cột tường minh trong CTE' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ANSI SQL supports explicit column lists after the CTE identifier: WITH cte_name(c1, c2) AS (...).', vi: 'Chuẩn ANSI SQL hỗ trợ danh sách cột rõ ràng sau tên định danh CTE: WITH ten_cte(c1, c2) AS (...).' }
      },
      {
        id: 'sql_q_13_14',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'hard',
        question: { en: 'Why is UNION ALL strictly required instead of UNION between the anchor and recursive members in most SQL database engines?', vi: 'Tại sao UNION ALL là bắt buộc thay vì UNION giữa điểm neo và nhánh đệ quy trong hầu hết các hệ quản trị CSDL?' },
        options: [
          { en: 'Because standard recursive evaluation models step-by-step queue processing; UNION would require continuous full-table deduplication passes at each recursive iteration step', vi: 'Vì mô hình đệ quy chuẩn xử lý hàng đợi theo từng bước; dùng UNION sẽ đòi hỏi phải khử trùng lặp toàn bộ tập dữ liệu ở mỗi bước đệ quy' },
          { en: 'Because UNION is deprecated in SQL:1999', vi: 'Vì UNION đã bị loại bỏ trong chuẩn SQL:1999' },
          { en: 'Because UNION deletes primary keys', vi: 'Vì UNION xóa khóa chính' },
          { en: 'Because UNION ALL only works with numbers', vi: 'Vì UNION ALL chỉ hoạt động với số' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Recursive engines append new generation rows into the working queue using UNION ALL.', vi: 'Trình thực thi đệ quy bổ sung các dòng thế hệ mới vào hàng đợi làm việc bằng UNION ALL.' }
      },
      {
        id: 'sql_q_13_15',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'easy',
        question: { en: 'Can a CTE be used inside a View definition (CREATE VIEW ... AS WITH ...)?', vi: 'Một CTE có thể được dùng bên trong định nghĩa View (CREATE VIEW ... AS WITH ...) không?' },
        options: [
          { en: 'Yes, CTEs are fully supported inside views for clean modular view architecture', vi: 'Có, CTE được hỗ trợ đầy đủ bên trong view để tạo kiến trúc view mô-đun rõ ràng' },
          { en: 'No, views cannot contain WITH clauses', vi: 'Không, view không được chứa mệnh đề WITH' },
          { en: 'Only for read-only databases', vi: 'Chỉ dùng cho CSDL chỉ đọc' },
          { en: 'Only in SQLite', vi: 'Chỉ trong SQLite' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Views can encapsulate CTE logic seamlessly.', vi: 'View có thể đóng gói logic CTE một cách hoàn hảo.' }
      },
      {
        id: 'sql_q_13_16',
        type: 'single_choice',
        topicId: 'sql_ctes_recursive',
        difficulty: 'medium',
        question: { en: 'Which SQL standard first introduced Common Table Expressions (CTEs)?', vi: 'Chuẩn SQL nào lần đầu tiên giới thiệu Biểu Thức Bảng Chung (CTE)?' },
        options: [
          { en: 'SQL:1999 (SQL3)', vi: 'SQL:1999 (SQL3)' },
          { en: 'SQL:1986', vi: 'SQL:1986' },
          { en: 'SQL:1992 (SQL2)', vi: 'SQL:1992 (SQL2)' },
          { en: 'SQL:2023', vi: 'SQL:2023' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CTEs and recursive queries were standardized in the landmark SQL:1999 specification.', vi: 'CTE và truy vấn đệ quy đã được chuẩn hóa trong bản đặc tả chuẩn mốc SQL:1999.' }
      }
    ]
  }
];
