import { Lesson } from '../../../../types';

export const lesson13: Lesson = {
  id: 'sql_lesson_13',
  moduleId: 'sql_mod_3',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 13,
  topicId: 'sql_subqueries',
  title: {
    en: 'Subqueries: Scalar, Multi-Row & Correlated',
    vi: 'Truy Vấn Con: Vô Hướng, Đa Dòng & Tương Quan'
  },
  summary: {
    en: 'Master nested SQL subqueries: scalar subqueries in projections, multi-row predicates with IN/ANY/ALL, row-by-row correlated subqueries, and EXISTS short-circuit semi-joins.',
    vi: 'Làm chủ truy vấn con lồng nhau: truy vấn con vô hướng trong SELECT, vị từ đa dòng với IN/ANY/ALL, truy vấn con tương quan từng dòng và vị từ EXISTS tối ưu semi-join.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'A subquery (or nested query) is a complete SELECT statement embedded inside another enclosing SQL statement. Subqueries allow you to express multi-step mathematical comparisons, dynamic thresholds, and existence checks directly in declarative SQL without separate programmatic passes.',
      vi: 'Một truy vấn con (subquery) là một câu lệnh SELECT hoàn chỉnh được lồng bên trong một câu lệnh SQL cha khác. Truy vấn con cho phép bạn thực hiện các phép so sánh nhiều bước, tính toán ngưỡng động và kiểm tra sự tồn tại trực tiếp trong SQL mà không cần can thiệp xử lý ngoài.'
    },
    conceptExplanation: {
      en: 'Subquery Classifications and Execution Mechanics:\n1. Scalar Subqueries: Return exactly 1 row and 1 column. Can be used anywhere a literal value is valid (e.g. SELECT clause, WHERE comparison "salary > (SELECT AVG(salary)...)").\n2. Multi-Row Subqueries: Return a single column with multiple rows. Evaluated using set membership operators: IN, NOT IN, > ANY/SOME, > ALL.\n3. Correlated Subqueries: Reference one or more columns from the outer query table. Evaluated repeatedly once for each candidate row in the outer query.\n4. EXISTS & NOT EXISTS: Correlated existence checks that short-circuit immediately upon finding the first matching row, providing superior performance over COUNT(*) > 0.\n5. Derived Tables (FROM clause): Subqueries inside FROM must always be assigned a table alias (e.g. "FROM (SELECT ...) AS dt").',
      vi: 'Phân loại và cơ chế thực thi truy vấn con:\n1. Truy vấn con vô hướng (Scalar Subqueries): Trả về chính xác 1 dòng và 1 cột. Có thể dùng ở bất kỳ nơi nào chấp nhận một giá trị đơn (mệnh đề SELECT, phép so sánh WHERE "salary > (SELECT AVG(salary)...)").\n2. Truy vấn con đa dòng (Multi-Row Subqueries): Trả về 1 cột gồm nhiều dòng. Đánh giá bằng các toán tử tập hợp: IN, NOT IN, > ANY/SOME, > ALL.\n3. Truy vấn con tương quan (Correlated Subqueries): Tham chiếu đến một hoặc nhiều cột của bảng truy vấn cha. Được thực thi lặp lại cho từng dòng ứng viên của truy vấn cha.\n4. EXISTS & NOT EXISTS: Phép kiểm tra sự tồn tại tương quan có cơ chế ngắt sớm (short-circuit) ngay khi tìm thấy dòng đầu tiên khớp, vượt trội về hiệu năng so với COUNT(*) > 0.\n5. Bảng dẫn xuất (Derived Tables trong FROM): Truy vấn con nằm trong FROM bắt buộc phải được đặt bí danh (ví dụ: "FROM (SELECT ...) AS dt").'
    },
    syntax: `-- Scalar Subquery in WHERE
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Correlated Subquery with EXISTS
SELECT d.id, d.department_name
FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e 
  WHERE e.department_id = d.id AND e.salary >= 100000
);`,
    examples: [
      {
        title: {
          en: '1. Finding Employees Earning Above Their Department Average (Correlated)',
          vi: '1. Tìm Nhân Viên Có Lương Cao Hơn Mức Trung Bình Phòng Ban (Tương Quan)'
        },
        code: `SELECT e.id, e.name, e.department_id, e.salary
FROM employees e
WHERE e.salary > (
  SELECT AVG(sub_e.salary)
  FROM employees sub_e
  WHERE sub_e.department_id = e.department_id
);`,
        language: 'sql',
        explanation: {
          en: 'The inner query calculates the average salary for the specific outer employee’s department, filtering for departmental top earners.',
          vi: 'Truy vấn con tính lương trung bình riêng cho phòng ban của nhân viên ở truy vấn cha, từ đó lọc ra những người có thu nhập vượt trội trong phòng.'
        }
      },
      {
        title: {
          en: '2. Efficient Semi-Join with EXISTS',
          vi: '2. Tối Ưu Phép Semi-Join Bằng EXISTS'
        },
        code: `SELECT c.id, c.name, c.email
FROM customers c
WHERE EXISTS (
  SELECT 1 
  FROM orders o 
  WHERE o.customer_id = c.id 
    AND o.total_amount > 500
);`,
        language: 'sql',
        explanation: {
          en: 'Returns customers who have made at least one large purchase ($500+). Stops scanning orders for customer c as soon as a single match is found.',
          vi: 'Trả về các khách hàng đã từng có ít nhất một đơn hàng giá trị cao (>500$). Dừng quét bảng orders ngay khi tìm thấy dòng khớp đầu tiên.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using NOT IN with a subquery that returns one or more NULL values.',
          vi: 'Sử dụng NOT IN với một truy vấn con có chứa ít nhất một giá trị NULL.'
        },
        correction: {
          en: 'If the subquery returns even a single NULL, "val NOT IN (...)" evaluates to UNKNOWN for all rows, returning an empty result. Always use "NOT EXISTS" or filter out NULLs ("WHERE col IS NOT NULL") in the subquery.',
          vi: 'Nếu truy vấn con trả về dù chỉ 1 giá trị NULL, biểu thức "val NOT IN (...)" sẽ cho kết quả UNKNOWN cho mọi dòng, trả về 0 bản ghi. Luôn ưu tiên dùng "NOT EXISTS" hoặc thêm điều kiện "WHERE col IS NOT NULL".'
        },
        code: `-- DANGEROUS:
-- SELECT * FROM customers WHERE id NOT IN (SELECT customer_id FROM orders);
-- SAFE:
SELECT * FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);`
      },
      {
        mistake: {
          en: 'Omitting the table alias on a derived table subquery in the FROM clause.',
          vi: 'Quên đặt bí danh cho bảng dẫn xuất (Derived Table) trong mệnh đề FROM.'
        },
        correction: {
          en: 'Standard SQL requires every derived table in the FROM clause to have an explicit alias (e.g. "FROM (SELECT ...) AS sub_table").',
          vi: 'Chuẩn SQL bắt buộc mọi bảng dẫn xuất trong mệnh đề FROM phải có một bí danh tường minh (ví dụ: "FROM (SELECT ...) AS sub_table").'
        }
      }
    ],
    tips: [
      {
        en: 'Writing "SELECT 1" inside an EXISTS subquery is idiomatic SQL—the engine only checks for row presence and ignores the projection list.',
        vi: 'Viết "SELECT 1" trong truy vấn con EXISTS là chuẩn mực trong SQL—trình tối ưu chỉ kiểm tra sự tồn tại của dòng mà không cần nạp cột.'
      },
      {
        en: 'Correlated subqueries can be rewritten as JOINs with window functions or CTEs for improved performance on large datasets.',
        vi: 'Truy vấn con tương quan thường có thể được viết lại dưới dạng JOIN hoặc Window Functions / CTE để tăng tốc độ xử lý trên dữ liệu lớn.'
      }
    ],
    practiceStarterCode: `-- Find employees who earn more than the company-wide average salary
SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`
  },
  exercisePool: [
    {
      id: 'sql_ex_sub_1',
      type: 'complete_code',
      title: {
        en: 'Scalar Subquery Comparison',
        vi: 'So Sánh Với Truy Vấn Con Vô Hướng'
      },
      instruction: {
        en: 'Select name and salary of employees whose salary is greater than the company-wide average salary.',
        vi: 'Chọn name và salary của nhân viên có mức lương cao hơn mức lương trung bình của toàn công ty.'
      },
      starterCode: `SELECT name, salary
FROM employees
WHERE salary > (SELECT ___(salary) FROM employees);`,
      solutionCode: `SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`,
      hint: {
        en: 'Use AVG(salary) in the nested scalar subquery.',
        vi: 'Dùng AVG(salary) trong truy vấn con vô hướng.'
      },
      explanation: {
        en: 'The scalar subquery computes the overall average salary once, and outer rows are compared against that single value.',
        vi: 'Truy vấn con vô hướng tính mức lương trung bình một lần và các dòng bên ngoài so sánh với giá trị đó.'
      }
    },
    {
      id: 'sql_ex_sub_2',
      type: 'complete_code',
      title: {
        en: 'Correlated Existence Check with EXISTS',
        vi: 'Kiểm Tra Tồn Tại Tương Quan Bằng EXISTS'
      },
      instruction: {
        en: 'Select departments that have at least one employee using an EXISTS subquery matching d.id = e.department_id.',
        vi: 'Chọn các phòng ban có ít nhất 1 nhân viên bằng truy vấn con EXISTS khớp d.id = e.department_id.'
      },
      starterCode: `SELECT d.id, d.name
FROM departments d
WHERE ___ (
  SELECT 1 FROM employees e WHERE e.department_id = d.id
);`,
      solutionCode: `SELECT d.id, d.name
FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e WHERE e.department_id = d.id
);`,
      hint: {
        en: 'Use the EXISTS keyword.',
        vi: 'Dùng từ khóa EXISTS.'
      },
      explanation: {
        en: 'EXISTS returns TRUE as soon as a matching employee record is discovered for department d.',
        vi: 'EXISTS trả về TRUE ngay khi tìm thấy nhân viên thuộc phòng ban d.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_subqueries',
    title: {
      en: 'Departmental Outlier Compensation & Zero-Order Customer Audit',
      vi: 'Kiểm Toán Lương Vượt Ngưỡng Phòng Ban & Khách Hàng Không Phát Sinh Đơn'
    },
    description: {
      en: 'Write a SQL query that retrieves id, name, department_id, salary from employees e where their salary is strictly greater than the average salary of their own department, AND their department_id appears in the list of active tech departments (SELECT id FROM departments WHERE is_active = 1 AND sector = \'Tech\'). Order by department_id ASC, salary DESC.',
      vi: 'Viết câu truy vấn SQL lấy id, name, department_id, salary từ bảng employees e với điều kiện mức lương của họ lớn hơn mức lương trung bình của chính phòng ban đó, VÀ department_id của họ nằm trong danh sách các phòng ban công nghệ đang hoạt động (SELECT id FROM departments WHERE is_active = 1 AND sector = \'Tech\'). Sắp xếp theo department_id ASC, salary DESC.'
    },
    requirements: [
      { en: '1. Correlated check: e.salary > (SELECT AVG(sub.salary) FROM employees sub WHERE sub.department_id = e.department_id)', vi: '1. Kiểm tra tương quan: e.salary > (SELECT AVG(sub.salary) FROM employees sub WHERE sub.department_id = e.department_id)' },
      { en: '2. Multi-row check: e.department_id IN (SELECT id FROM departments WHERE is_active = 1 AND sector = \'Tech\')', vi: '2. Kiểm tra đa dòng: e.department_id IN (SELECT id FROM departments WHERE is_active = 1 AND sector = \'Tech\')' },
      { en: '3. ORDER BY e.department_id ASC, e.salary DESC', vi: '3. Sắp xếp ORDER BY e.department_id ASC, e.salary DESC' }
    ],
    starterCode: `-- Write your dual subquery audit query
SELECT id, name, department_id, salary FROM employees e;`,
    solutionCode: `SELECT e.id, e.name, e.department_id, e.salary
FROM employees e
WHERE e.salary > (
  SELECT AVG(sub.salary)
  FROM employees sub
  WHERE sub.department_id = e.department_id
)
AND e.department_id IN (
  SELECT id
  FROM departments
  WHERE is_active = 1 AND sector = 'Tech'
)
ORDER BY e.department_id ASC, e.salary DESC;`,
    hints: [
      {
        en: 'Combine a correlated subquery for departmental average with an IN multi-row subquery for the active tech departments list.',
        vi: 'Kết hợp một truy vấn con tương quan tính trung bình phòng ban với một truy vấn con đa dòng IN lọc phòng ban công nghệ.'
      }
    ],
    solutionExplanation: {
      en: 'Combines row-by-row correlated threshold calculations with set membership multi-row filtering in a single declarative query.',
      vi: 'Kết hợp tính toán ngưỡng động tương quan từng dòng với bộ lọc tập hợp đa dòng trong một câu truy vấn chuẩn mực.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_sub_1',
      type: 'single_choice',
      question: {
        en: 'What is a scalar subquery?',
        vi: 'Truy vấn con vô hướng (Scalar Subquery) là gì?'
      },
      options: [
        { en: 'A subquery that returns exactly one row and one column (a single atomic value)', vi: 'Một truy vấn con trả về chính xác một dòng và một cột (một giá trị đơn nguyên)' },
        { en: 'A subquery that runs only on floating point numbers', vi: 'Một truy vấn con chỉ chạy trên số thực' },
        { en: 'A subquery containing at least 5 JOINs', vi: 'Một truy vấn con chứa ít nhất 5 phép JOIN' },
        { en: 'A subquery that cannot have a WHERE clause', vi: 'Một truy vấn con không thể có mệnh đề WHERE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A scalar subquery produces a 1x1 result, allowing it to substitute for any literal constant or expression.',
        vi: 'Truy vấn con vô hướng tạo ra kết quả 1x1, cho phép dùng ở mọi vị trí của hằng số hoặc biểu thức.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_sub_2',
      type: 'single_choice',
      question: {
        en: 'What is a correlated subquery?',
        vi: 'Truy vấn con tương quan (Correlated Subquery) là gì?'
      },
      options: [
        { en: 'A subquery that references one or more columns from the enclosing outer query and is evaluated for each candidate row of the outer query', vi: 'Một truy vấn con tham chiếu đến các cột của truy vấn cha bên ngoài và được đánh giá cho từng dòng ứng viên của truy vấn cha' },
        { en: 'A subquery that only runs on foreign key indexes', vi: 'Một truy vấn con chỉ chạy trên chỉ mục khóa ngoại' },
        { en: 'A subquery that executes in parallel across 10 servers', vi: 'Một truy vấn con chạy song song trên 10 máy chủ' },
        { en: 'A subquery that returns multiple tables at once', vi: 'Một truy vấn con trả về nhiều bảng cùng lúc' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Correlated subqueries depend dynamically on outer row values, executing repeatedly per candidate row.',
        vi: 'Truy vấn con tương quan phụ thuộc động vào giá trị của dòng ngoài, chạy lặp lại cho từng dòng dữ liệu.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_sub_3',
      type: 'single_choice',
      question: {
        en: 'Why is "WHERE NOT EXISTS (...)" generally safer and more reliable than "WHERE col NOT IN (SELECT col FROM ...)"?',
        vi: 'Tại sao "WHERE NOT EXISTS (...)" nhìn chung an toàn và tin cậy hơn "WHERE col NOT IN (SELECT col FROM ...)"?'
      },
      options: [
        { en: 'If the NOT IN subquery returns even a single NULL value, the entire NOT IN predicate evaluates to UNKNOWN/FALSE, returning 0 rows unexpectedly', vi: 'Nếu truy vấn con của NOT IN trả về dù chỉ 1 giá trị NULL, toàn bộ điều kiện NOT IN sẽ ra UNKNOWN/FALSE, khiến kết quả bị rỗng ngoài ý muốn' },
        { en: 'NOT EXISTS uses 90% less disk space', vi: 'NOT EXISTS dùng ít hơn 90% dung lượng ổ cứng' },
        { en: 'NOT IN is deprecated in modern SQL', vi: 'NOT IN đã bị khai tử trong SQL hiện đại' },
        { en: 'NOT EXISTS only works with integers', vi: 'NOT EXISTS chỉ hoạt động với số nguyên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Three-valued logic causes "val NOT IN (1, NULL)" to evaluate to UNKNOWN. NOT EXISTS is immune to this NULL poisoning trap.',
        vi: 'Logic tam trị khiến "val NOT IN (1, NULL)" ra kết quả UNKNOWN. Phép NOT EXISTS hoàn toàn miễn nhiễm với bẫy NULL này.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_sub_4',
      type: 'true_false',
      question: {
        en: 'In SQL standards, a subquery used in the FROM clause (Derived Table) MUST be assigned a table alias.',
        vi: 'Trong chuẩn SQL, một truy vấn con nằm trong mệnh đề FROM (Bảng dẫn xuất) BẮT BUỘC phải được đặt một bí danh bảng.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. ANSI SQL syntax requires every derived table in the FROM clause to have an alias (e.g. "FROM (SELECT ...) AS dt").',
        vi: 'Đúng. Cú pháp chuẩn ANSI SQL yêu cầu mọi bảng dẫn xuất trong FROM phải có bí danh (ví dụ: "FROM (SELECT ...) AS dt").'
      },
      topicId: 'sql_subqueries',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_sub_5',
      type: 'single_choice',
      question: {
        en: 'What does the EXISTS predicate test?',
        vi: 'Vị từ EXISTS kiểm tra điều gì?'
      },
      options: [
        { en: 'Whether the subquery returns at least one row (evaluates to TRUE on first row match and short-circuits)', vi: 'Liệu truy vấn con có trả về ít nhất một dòng hay không (đánh giá ra TRUE ngay khi gặp dòng khớp đầu tiên)' },
        { en: 'Whether a table exists in the schema catalog', vi: 'Liệu một bảng có tồn tại trong danh mục lược đồ hay không' },
        { en: 'Whether a column allows NULL values', vi: 'Liệu một cột có cho phép giá trị NULL hay không' },
        { en: 'Whether the database is connected to the internet', vi: 'Liệu CSDL có kết nối internet hay không' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'EXISTS evaluates whether the nested result set contains at least 1 record, terminating immediately upon the first match.',
        vi: 'EXISTS đánh giá xem tập kết quả lồng nhau có chứa ít nhất 1 bản ghi hay không, dừng quét ngay khi tìm thấy dòng đầu tiên.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_sub_6',
      type: 'predict_output',
      question: {
        en: 'What happens if a scalar subquery in the SELECT clause returns more than 1 row (e.g. 3 rows)?',
        vi: 'Điều gì xảy ra nếu một truy vấn con vô hướng trong mệnh đề SELECT trả về nhiều hơn 1 dòng (ví dụ: 3 dòng)?'
      },
      options: [
        { en: 'A runtime error is raised: "Scalar subquery returned more than one row"', vi: 'Báo lỗi thời gian chạy: "Scalar subquery returned more than one row"' },
        { en: 'It automatically picks the first row silently', vi: 'Tự động chọn dòng đầu tiên mà không báo gì' },
        { en: 'It concatenates all 3 values into a comma-separated string', vi: 'Nối cả 3 giá trị thành chuỗi cách nhau bằng dấu phẩy' },
        { en: 'It creates 3 duplicate copies of the outer table', vi: 'Tạo ra 3 bản sao chép của bảng ngoài' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A scalar subquery is strictly constrained to return at most 1 row; returning multiple rows violates the scalar contract.',
        vi: 'Truy vấn con vô hướng bị ràng buộc nghiêm ngặt chỉ được trả về tối đa 1 dòng; trả về nhiều dòng sẽ vi phạm giao ước vô hướng và gây lỗi.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_sub_7',
      type: 'single_choice',
      question: {
        en: 'What does the predicate "salary > ALL (SELECT salary FROM employees WHERE dept = \'Sales\')" mean?',
        vi: 'Vị từ "salary > ALL (SELECT salary FROM employees WHERE dept = \'Sales\')" có ý nghĩa gì?'
      },
      options: [
        { en: 'Salary must be strictly greater than the maximum salary in Sales', vi: 'Lương phải lớn hơn mức lương cao nhất trong phòng Sales' },
        { en: 'Salary must be greater than at least one salary in Sales', vi: 'Lương phải lớn hơn ít nhất một mức lương trong phòng Sales' },
        { en: 'Salary must be equal to the average salary in Sales', vi: 'Lương phải bằng mức lương trung bình trong phòng Sales' },
        { en: 'Salary must be less than all Sales salaries', vi: 'Lương phải nhỏ hơn tất cả mức lương phòng Sales' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '> ALL requires the value to exceed every element in the set, which is logically equivalent to exceeding the MAX value.',
        vi: '> ALL yêu cầu giá trị phải lớn hơn mọi phần tử trong tập hợp, tương đương với việc lớn hơn giá trị MAX.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_sub_8',
      type: 'single_choice',
      question: {
        en: 'What does the predicate "salary > ANY (SELECT salary FROM employees WHERE dept = \'Sales\')" mean?',
        vi: 'Vị từ "salary > ANY (SELECT salary FROM employees WHERE dept = \'Sales\')" có ý nghĩa gì?'
      },
      options: [
        { en: 'Salary must be greater than at least one employee\'s salary in Sales (i.e. greater than the MIN salary in Sales)', vi: 'Lương phải lớn hơn ít nhất một mức lương nhân viên trong phòng Sales (tức là lớn hơn mức lương MIN trong Sales)' },
        { en: 'Salary must be greater than all salaries in Sales', vi: 'Lương phải lớn hơn tất cả mức lương phòng Sales' },
        { en: 'Salary must equal the average salary in Sales', vi: 'Lương phải bằng lương trung bình phòng Sales' },
        { en: 'Salary must be NULL', vi: 'Lương phải là NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '> ANY / > SOME requires exceeding at least one value, which is equivalent to exceeding the MIN value.',
        vi: '> ANY / > SOME yêu cầu lớn hơn ít nhất một giá trị trong tập hợp, tương đương lớn hơn giá trị MIN.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_sub_9',
      type: 'true_false',
      question: {
        en: 'Subqueries can be nested inside another subquery to arbitrary depths supported by the database engine parser.',
        vi: 'Truy vấn con có thể được lồng sâu vào bên trong một truy vấn con khác theo nhiều tầng tùy thuộc vào giới hạn của bộ phân tích cú pháp CSDL.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Relational algebra allows composition of queries to multiple levels of nesting.',
        vi: 'Đúng. Đại số quan hệ cho phép lồng ghép các câu truy vấn qua nhiều tầng cấu trúc.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_sub_10',
      type: 'multiple_choice',
      question: {
        en: 'In which clauses of a SQL statement can a valid subquery appear? (Select all that apply)',
        vi: 'Những mệnh đề nào sau đây của câu lệnh SQL có thể chứa một truy vấn con hợp lệ? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'SELECT (as a scalar projection)', vi: 'SELECT (dưới dạng biểu thức vô hướng)' },
        { en: 'FROM (as a derived table)', vi: 'FROM (dưới dạng bảng dẫn xuất)' },
        { en: 'WHERE (as a filter predicate)', vi: 'WHERE (dưới dạng vị từ lọc)' },
        { en: 'HAVING (as an aggregate group condition)', vi: 'HAVING (dưới dạng điều kiện lọc nhóm tổng hợp)' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'Subqueries are universally composable and can appear in SELECT, FROM, WHERE, and HAVING clauses.',
        vi: 'Truy vấn con có tính tái cấu trúc linh hoạt và có thể xuất hiện trong SELECT, FROM, WHERE và HAVING.'
      },
      topicId: 'sql_subqueries',
      difficulty: 'easy'
    }
  ]
};

export default lesson13;
