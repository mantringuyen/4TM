import { Lesson } from '../../../../types';

export const lesson11: Lesson = {
  id: 'sql_lesson_11',
  moduleId: 'sql_mod_2',
  levelId: 'basic',
  courseId: 'sql',
  order: 11,
  topicId: 'sql_inner_left_joins',
  title: {
    en: 'INNER JOIN & LEFT JOIN',
    vi: 'Kết Nối Bảng: INNER JOIN & LEFT JOIN'
  },
  summary: {
    en: 'Master relational table combinations using INNER JOIN for matching records and LEFT OUTER JOIN for retaining unmatched master records, with table aliasing and anti-join filtering.',
    vi: 'Làm chủ kết nối bảng quan hệ với INNER JOIN cho các bản ghi trùng khớp và LEFT OUTER JOIN để giữ lại dữ liệu bảng chính, kết hợp đặt bí danh bảng và kỹ thuật anti-join.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'In relational database normalization, data is divided across specialized tables linked by primary and foreign keys. Joins reassemble these relational pieces dynamically at query execution time without storing redundant data.',
      vi: 'Trong chuẩn hóa CSDL quan hệ, dữ liệu được phân tách vào các bảng chuyên biệt liên kết qua khóa chính và khóa ngoại. Các phép JOIN tái kết nối những mảnh ghép quan hệ này một cách linh hoạt tại thời điểm truy vấn mà không làm dư thừa dữ liệu.'
    },
    conceptExplanation: {
      en: 'Relational Join Mechanics:\n1. INNER JOIN: Returns only rows where there is a match in BOTH tables according to the ON predicate. Unmatched rows from either table are discarded.\n2. LEFT JOIN (LEFT OUTER JOIN): Returns ALL rows from the left table. If a matching row exists in the right table, its values are joined; otherwise, NULL fills the right-table columns.\n3. Table Aliases: Use short, descriptive aliases (e.g. "employees e JOIN departments d ON e.department_id = d.id") for readability and unambiguous column scoping.\n4. Anti-Join Pattern: To find records in the left table that have NO match in the right table, use "LEFT JOIN ... WHERE right_table.id IS NULL".',
      vi: 'Cơ chế hoạt động của các phép JOIN:\n1. INNER JOIN: Chỉ trả về các dòng có dữ liệu khớp ở CẢ HAI bảng dựa theo điều kiện ON. Các dòng không khớp ở bất kỳ bảng nào đều bị loại bỏ.\n2. LEFT JOIN (LEFT OUTER JOIN): Trả về TẤT CẢ các dòng từ bảng bên trái. Nếu có bản ghi khớp ở bảng bên phải, dữ liệu sẽ được kết hợp; nếu không, các cột của bảng bên phải sẽ nhận giá trị NULL.\n3. Bí danh bảng (Table Aliases): Sử dụng các bí danh ngắn gọn (ví dụ: "employees e JOIN departments d ON e.department_id = d.id") để tăng tính dễ đọc và phân biệt rõ ràng các cột trùng tên.\n4. Kỹ thuật Anti-Join: Để tìm các bản ghi ở bảng trái KHÔNG CÓ liên kết nào ở bảng phải, dùng cấu trúc "LEFT JOIN ... WHERE right_table.id IS NULL".'
    },
    syntax: `SELECT e.id, 
       e.name, 
       d.department_name, 
       d.location
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- LEFT JOIN with Anti-Join check
SELECT c.id, c.customer_name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;`,
    examples: [
      {
        title: {
          en: '1. INNER JOIN: Employees and Departments',
          vi: '1. INNER JOIN: Nhân Viên và Phòng Ban'
        },
        code: `SELECT e.id AS emp_id,
       e.name AS employee_name,
       e.salary,
       d.department_name,
       d.budget
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
ORDER BY d.department_name ASC, e.salary DESC;`,
        language: 'sql',
        explanation: {
          en: 'Retrieves employee details paired with their official department name and budget, omitting unassigned employees.',
          vi: 'Lấy thông tin nhân viên kết hợp với tên phòng ban và ngân sách chính thức, tự động bỏ qua nhân viên chưa được xếp phòng ban.'
        }
      },
      {
        title: {
          en: '2. LEFT JOIN: Audit Customers Without Orders',
          vi: '2. LEFT JOIN: Kiểm Tra Khách Hàng Chưa Từng Đặt Hàng'
        },
        code: `SELECT c.id AS customer_id,
       c.name AS customer_name,
       c.email,
       o.id AS order_id
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;`,
        language: 'sql',
        explanation: {
          en: 'Uses a LEFT JOIN anti-join to detect newly signed-up customers who have not yet placed any orders.',
          vi: 'Dùng LEFT JOIN theo mẫu anti-join để phát hiện các khách hàng mới đăng ký nhưng chưa thực hiện đơn hàng nào.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Placing a WHERE filter on the right table of a LEFT JOIN, inadvertently converting it into an INNER JOIN.',
          vi: 'Đặt điều kiện lọc WHERE trên bảng bên phải của một phép LEFT JOIN, vô tình biến nó thành INNER JOIN.'
        },
        correction: {
          en: 'Writing "WHERE d.status = \'Active\'" eliminates all NULL rows produced for unmatched left records. To preserve unmatched left records, place right-table conditions inside the ON clause instead ("ON e.department_id = d.id AND d.status = \'Active\'").',
          vi: 'Viết "WHERE d.status = \'Active\'" sẽ loại bỏ tất cả các dòng NULL của bảng trái không khớp. Để giữ lại bảng trái, hãy chuyển điều kiện vào mệnh đề ON ("ON e.department_id = d.id AND d.status = \'Active\'").'
        }
      },
      {
        mistake: {
          en: 'Omitting table qualification on shared column names (Ambiguous column error).',
          vi: 'Không ghi rõ tên bảng hoặc bí danh cho các cột trùng tên giữa hai bảng (Lỗi Ambiguous column).'
        },
        correction: {
          en: 'If both tables contain an "id" or "name" column, writing "SELECT id" causes a syntax error. Always qualify shared columns with aliases (e.g. e.id, d.id).',
          vi: 'Nếu cả hai bảng đều có cột "id" hoặc "name", viết "SELECT id" sẽ bị lỗi. Luôn chỉ định rõ nguồn gốc bằng bí danh (ví dụ: e.id, d.id).'
        }
      }
    ],
    tips: [
      {
        en: 'The ON clause defines how tables match rows, while the WHERE clause filters rows after the join relationship is formed.',
        vi: 'Mệnh đề ON xác định cách thức so khớp các dòng giữa các bảng, còn mệnh đề WHERE lọc dữ liệu sau khi quan hệ join đã được thiết lập.'
      },
      {
        en: 'Foreign key columns should always be indexed in production databases to ensure join lookups run in O(log N) rather than full table scans.',
        vi: 'Các cột khóa ngoại luôn nên được đánh chỉ mục trong môi trường thực tế để các phép tìm kiếm JOIN chạy trong O(log N) thay vì quét toàn bộ bảng.'
      }
    ],
    practiceStarterCode: `-- Join employees with their departments
SELECT e.name, d.department_name, e.salary FROM employees e INNER JOIN departments d ON e.department_id = d.id;`
  },
  exercisePool: [
    {
      id: 'sql_ex_jn_1',
      type: 'complete_code',
      title: {
        en: 'Connect Orders with Customers',
        vi: 'Liên Kết Đơn Hàng Với Khách Hàng'
      },
      instruction: {
        en: 'Write an INNER JOIN query between orders (o) and customers (c) matching on c.id = o.customer_id.',
        vi: 'Viết câu truy vấn INNER JOIN giữa bảng orders (o) và customers (c) khớp trên điều kiện c.id = o.customer_id.'
      },
      starterCode: `SELECT o.id AS order_id, c.name AS customer_name, o.amount
FROM orders o
___ JOIN customers c ON o.customer_id = c.id;`,
      solutionCode: `SELECT o.id AS order_id, c.name AS customer_name, o.amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;`,
      hint: {
        en: 'Use INNER JOIN.',
        vi: 'Dùng INNER JOIN.'
      },
      explanation: {
        en: 'INNER JOIN combines rows where the customer_id exists in both tables.',
        vi: 'INNER JOIN kết hợp các dòng có customer_id trùng khớp tồn tại ở cả 2 bảng.'
      }
    },
    {
      id: 'sql_ex_jn_2',
      type: 'complete_code',
      title: {
        en: 'Detect Employees Without Assigned Projects',
        vi: 'Tìm Nhân Viên Chưa Được Giao Dự Án'
      },
      instruction: {
        en: 'Use a LEFT JOIN between employees (e) and employee_projects (ep) to find employees where ep.project_id IS NULL.',
        vi: 'Dùng LEFT JOIN giữa employees (e) và employee_projects (ep) để tìm nhân viên có ep.project_id IS NULL.'
      },
      starterCode: `SELECT e.id, e.name
FROM employees e
LEFT JOIN employee_projects ep ON e.id = ep.employee_id
WHERE ep.project_id ___ NULL;`,
      solutionCode: `SELECT e.id, e.name
FROM employees e
LEFT JOIN employee_projects ep ON e.id = ep.employee_id
WHERE ep.project_id IS NULL;`,
      hint: {
        en: 'Use IS NULL in the WHERE clause.',
        vi: 'Dùng IS NULL trong mệnh đề WHERE.'
      },
      explanation: {
        en: 'Checking "WHERE ep.project_id IS NULL" filters for employees with zero project allocations.',
        vi: 'Kiểm tra "WHERE ep.project_id IS NULL" lọc ra những nhân viên chưa có bất kỳ dự án nào.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_inner_left_joins',
    title: {
      en: 'Departmental Headcount and Compensation Allocation Report',
      vi: 'Báo Cáo Phân Bổ Nhân Sự & Quỹ Lương Theo Phòng Ban'
    },
    description: {
      en: 'Write a SQL query that retrieves d.id AS department_id, d.name AS department_name, COUNT(e.id) AS total_employees, and COALESCE(SUM(e.salary), 0) AS total_payroll. Use a LEFT JOIN from departments (d) to employees (e) on d.id = e.department_id so departments with zero staff are still included. Group by d.id and d.name, and order by total_payroll DESC, d.id ASC.',
      vi: 'Viết câu truy vấn SQL lấy d.id AS department_id, d.name AS department_name, COUNT(e.id) AS total_employees và COALESCE(SUM(e.salary), 0) AS total_payroll. Sử dụng LEFT JOIN từ departments (d) sang employees (e) theo điều kiện d.id = e.department_id để giữ lại cả các phòng ban chưa có nhân viên nào. Gom nhóm theo d.id và d.name, và sắp xếp theo total_payroll DESC, d.id ASC.'
    },
    requirements: [
      { en: '1. FROM departments d LEFT JOIN employees e ON d.id = e.department_id', vi: '1. FROM departments d LEFT JOIN employees e ON d.id = e.department_id' },
      { en: '2. COUNT(e.id) AS total_employees (do not use COUNT(*))', vi: '2. COUNT(e.id) AS total_employees (không dùng COUNT(*))' },
      { en: '3. COALESCE(SUM(e.salary), 0) AS total_payroll', vi: '3. COALESCE(SUM(e.salary), 0) AS total_payroll' },
      { en: '4. GROUP BY d.id, d.name ORDER BY total_payroll DESC, d.id ASC', vi: '4. GROUP BY d.id, d.name ORDER BY total_payroll DESC, d.id ASC' }
    ],
    starterCode: `-- Write your comprehensive departmental LEFT JOIN summary
SELECT d.id, d.name FROM departments d;`,
    solutionCode: `SELECT d.id AS department_id,
       d.name AS department_name,
       COUNT(e.id) AS total_employees,
       COALESCE(SUM(e.salary), 0) AS total_payroll
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name
ORDER BY total_payroll DESC, d.id ASC;`,
    hints: [
      {
        en: 'COUNT(e.id) correctly returns 0 for departments with no employees, whereas COUNT(*) would incorrectly return 1 because of the NULL row.',
        vi: 'COUNT(e.id) sẽ trả về 0 một cách chính xác cho phòng ban không có nhân viên, trong khi COUNT(*) sẽ đếm nhầm thành 1 do dòng chứa NULL.'
      }
    ],
    solutionExplanation: {
      en: 'Highlights the crucial difference between COUNT(*) and COUNT(col) on LEFT JOINs, alongside COALESCE null suppression and deterministic sorting.',
      vi: 'Nhấn mạnh sự khác biệt sống còn giữa COUNT(*) và COUNT(cột) trong LEFT JOIN, kết hợp xử lý NULL bằng COALESCE và sắp xếp nhất quán.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_jn_1',
      type: 'single_choice',
      question: {
        en: 'What rows does an INNER JOIN return?',
        vi: 'Phép INNER JOIN trả về những dòng nào?'
      },
      options: [
        { en: 'Only rows where there is a matching value in both tables based on the join condition', vi: 'Chỉ các dòng có giá trị trùng khớp ở cả hai bảng dựa trên điều kiện join' },
        { en: 'All rows from the left table and matching rows from the right table', vi: 'Tất cả các dòng từ bảng bên trái và các dòng khớp từ bảng bên phải' },
        { en: 'All rows from both tables combined without conditions', vi: 'Tất cả các dòng từ cả hai bảng kết hợp không cần điều kiện' },
        { en: 'Only rows where the right table has NULLs', vi: 'Chỉ các dòng mà bảng bên phải có giá trị NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'INNER JOIN returns the intersection of matching records across both tables.',
        vi: 'INNER JOIN trả về tập giao các bản ghi trùng khớp giữa hai bảng.'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_jn_2',
      type: 'single_choice',
      question: {
        en: 'If a row in the left table has no matching record in the right table during a LEFT JOIN, what values appear for the right table’s columns in the result set?',
        vi: 'Nếu một dòng ở bảng bên trái không có bản ghi khớp ở bảng bên phải trong phép LEFT JOIN, các cột của bảng bên phải sẽ mang giá trị gì trong kết quả?'
      },
      options: [
        { en: 'NULL', vi: 'NULL' },
        { en: '0 or empty string', vi: 'Số 0 hoặc chuỗi rỗng' },
        { en: 'The row is omitted completely', vi: 'Dòng đó bị loại bỏ hoàn toàn' },
        { en: 'An error is raised', vi: 'Báo lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LEFT JOIN preserves the left row and fills all right-table columns with NULL.',
        vi: 'LEFT JOIN giữ lại dòng bảng trái và điền giá trị NULL cho toàn bộ các cột thuộc bảng phải.'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_jn_3',
      type: 'single_choice',
      question: {
        en: 'When aggregating on a LEFT JOIN to count items (e.g. departments to employees), why must you use COUNT(e.id) instead of COUNT(*)?',
        vi: 'Khi tổng hợp trên kết quả LEFT JOIN để đếm phần tử (ví dụ: phòng ban sang nhân viên), tại sao phải dùng COUNT(e.id) thay vì COUNT(*)?'
      },
      options: [
        { en: 'COUNT(*) counts the single NULL row representing unmatched departments yielding 1, while COUNT(e.id) ignores NULL and correctly yields 0', vi: 'COUNT(*) đếm cả dòng NULL của phòng ban không có nhân viên và cho ra 1, trong khi COUNT(e.id) bỏ qua NULL và trả về 0 chính xác' },
        { en: 'COUNT(*) is illegal with LEFT JOIN', vi: 'COUNT(*) không được phép dùng với LEFT JOIN' },
        { en: 'COUNT(e.id) runs on GPU', vi: 'COUNT(e.id) chạy trên GPU' },
        { en: 'There is no difference in the outcome', vi: 'Kết quả hoàn toàn giống nhau' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'For empty left-joined groups, COUNT(*) counts the placeholder row (giving 1), while COUNT(e.id) counts non-null IDs (giving 0).',
        vi: 'Với các nhóm rỗng trong LEFT JOIN, COUNT(*) đếm dòng giữ chỗ NULL (ra 1), còn COUNT(e.id) đếm ID khác null (ra 0 đúng thực tế).'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_jn_4',
      type: 'true_false',
      question: {
        en: 'The query "SELECT * FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.status = \'Shipped\';" behaves identically to an INNER JOIN.',
        vi: 'Câu truy vấn "SELECT * FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.status = \'Shipped\';" hoạt động tương đương với một phép INNER JOIN.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. The WHERE filter evaluates "NULL = \'Shipped\'" as UNKNOWN for customers without orders, discarding them and eliminating the outer join effect.',
        vi: 'Đúng. Mệnh đề WHERE đánh giá "NULL = \'Shipped\'" ra UNKNOWN cho khách hàng không có đơn, loại bỏ họ và biến câu truy vấn thành INNER JOIN.'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_jn_5',
      type: 'single_choice',
      question: {
        en: 'What is the "Anti-Join" design pattern in SQL used for?',
        vi: 'Mẫu thiết kế "Anti-Join" trong SQL được sử dụng để làm gì?'
      },
      options: [
        { en: 'Finding rows in one table that have NO corresponding record in another table (using LEFT JOIN ... WHERE right.id IS NULL)', vi: 'Tìm các dòng trong một bảng KHÔNG CÓ bản ghi tương ứng trong bảng khác (bằng cách dùng LEFT JOIN ... WHERE right.id IS NULL)' },
        { en: 'Joining two tables in reverse alphabetical order', vi: 'Kết nối hai bảng theo thứ tự bảng chữ cái đảo ngược' },
        { en: 'Deleting all foreign keys from a table', vi: 'Xóa toàn bộ khóa ngoại khỏi bảng' },
        { en: 'Encrypting joined columns', vi: 'Mã hóa các cột được join' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'An Anti-Join filters for non-existence by pairing LEFT JOIN with a "WHERE right.id IS NULL" check.',
        vi: 'Anti-Join tìm sự không tồn tại của dữ liệu bằng cách kết hợp LEFT JOIN với điều kiện "WHERE right.id IS NULL".'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_jn_6',
      type: 'predict_output',
      question: {
        en: 'Table A has 3 rows (IDs: 1, 2, 3). Table B has 2 rows (IDs: 1, 2). What is the total row count of "SELECT * FROM A LEFT JOIN B ON A.id = B.id;"?',
        vi: 'Bảng A có 3 dòng (ID: 1, 2, 3). Bảng B có 2 dòng (ID: 1, 2). Tổng số dòng của "SELECT * FROM A LEFT JOIN B ON A.id = B.id;" là bao nhiêu?'
      },
      options: [
        { en: '3 rows', vi: '3 dòng' },
        { en: '2 rows', vi: '2 dòng' },
        { en: '5 rows', vi: '5 dòng' },
        { en: '6 rows', vi: '6 dòng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'All 3 rows of table A are returned: IDs 1 and 2 match table B, and ID 3 is returned with NULLs for table B columns.',
        vi: 'Toàn bộ 3 dòng của bảng A được trả về: ID 1 và 2 khớp với B, còn ID 3 trả về với các cột của B mang giá trị NULL.'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_jn_7',
      type: 'true_false',
      question: {
        en: 'Table aliases (e.g. "employees e") can be used throughout the SELECT, WHERE, and ON clauses of that query.',
        vi: 'Bí danh bảng (ví dụ: "employees e") có thể được sử dụng xuyên suốt trong các mệnh đề SELECT, WHERE và ON của truy vấn đó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Once an alias is assigned in the FROM/JOIN clause, it is available across the entire query scope.',
        vi: 'Đúng. Khi bí danh đã được khai báo trong FROM/JOIN, nó có thể được dùng ở mọi vị trí trong câu truy vấn.'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_jn_8',
      type: 'single_choice',
      question: {
        en: 'What happens if you omit the ON clause when joining two tables without specifying a condition (e.g. "FROM table1 JOIN table2")?',
        vi: 'Điều gì xảy ra nếu bạn bỏ qua mệnh đề ON khi join hai bảng mà không có điều kiện nào (ví dụ: "FROM table1 JOIN table2")?'
      },
      options: [
        { en: 'It produces a Cartesian Product (CROSS JOIN), pairing every row of table1 with every row of table2 (N x M rows)', vi: 'Nó tạo ra tích Descartes (CROSS JOIN), ghép từng dòng của table1 với mọi dòng của table2 (N x M dòng)' },
        { en: 'It automatically matches by primary key', vi: 'Nó tự động khớp theo khóa chính' },
        { en: 'It returns an empty table', vi: 'Nó trả về bảng rỗng' },
        { en: 'It deletes all rows in table2', vi: 'Nó xóa toàn bộ dòng trong table2' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Joining without an ON clause generates an unqualified Cartesian product multiplying the row counts.',
        vi: 'Join mà không có ON sẽ tạo ra tích Descartes kết hợp toàn bộ số dòng của hai bảng với nhau.'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_jn_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following statements about INNER JOIN and LEFT JOIN are TRUE? (Select all that apply)',
        vi: 'Những phát biểu nào sau đây về INNER JOIN và LEFT JOIN là ĐÚNG? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'INNER JOIN discards unmatched rows from both tables', vi: 'INNER JOIN loại bỏ các dòng không khớp từ cả hai bảng' },
        { en: 'LEFT JOIN guarantees that every row from the left table appears in the output at least once', vi: 'LEFT JOIN đảm bảo mọi dòng từ bảng bên trái đều xuất hiện trong kết quả ít nhất một lần' },
        { en: 'LEFT JOIN is also known as LEFT OUTER JOIN', vi: 'LEFT JOIN còn được gọi là LEFT OUTER JOIN' },
        { en: 'INNER JOIN is always slower than FULL OUTER JOIN', vi: 'INNER JOIN luôn chậm hơn FULL OUTER JOIN' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Statements 1, 2, and 3 are standard relational join definitions. Statement 4 is false (INNER JOIN is generally the fastest join type).',
        vi: 'Phát biểu 1, 2 và 3 là định nghĩa chuẩn về join. Phát biểu 4 sai vì INNER JOIN thường là loại join nhanh nhất.'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_jn_10',
      type: 'single_choice',
      question: {
        en: 'If Table A has 5 rows and Table B has 4 rows, what is the maximum number of rows an INNER JOIN on non-unique columns could return?',
        vi: 'Nếu Bảng A có 5 dòng và Bảng B có 4 dòng, số lượng dòng tối đa mà phép INNER JOIN trên các cột không duy nhất có thể trả về là bao nhiêu?'
      },
      options: [
        { en: '20 rows (5 x 4, if all rows match identical values)', vi: '20 dòng (5 x 4, nếu tất cả các dòng đều mang giá trị giống hệt nhau)' },
        { en: '5 rows', vi: '5 dòng' },
        { en: '4 rows', vi: '4 dòng' },
        { en: '9 rows', vi: '9 dòng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'If every row in table A matches every row in table B (many-to-many match on identical non-unique values), the join produces 5 x 4 = 20 rows.',
        vi: 'Nếu mọi dòng của bảng A đều khớp với mọi dòng của bảng B (khớp quan hệ nhiều-nhiều trên giá trị trùng lặp), kết quả sẽ là 5 x 4 = 20 dòng.'
      },
      topicId: 'sql_inner_left_joins',
      difficulty: 'hard'
    }
  ]
};

export default lesson11;
