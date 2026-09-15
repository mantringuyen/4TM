import { Lesson } from '../../../../types';

export const lesson14: Lesson = {
  id: 'sql_lesson_14',
  moduleId: 'sql_mod_3',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 14,
  topicId: 'sql_ctes_recursive',
  title: {
    en: 'Common Table Expressions (CTEs) & Recursive CTEs',
    vi: 'Biểu Thức Bảng Phổ Biến (CTE) & CTE Đệ Quy'
  },
  summary: {
    en: 'Master modular SQL using WITH clauses for readable Common Table Expressions (CTEs), multi-CTE pipelines, and WITH RECURSIVE for hierarchical trees and graph traversal.',
    vi: 'Làm chủ SQL module hóa bằng mệnh đề WITH cho các biểu thức bảng phổ biến (CTE), chuỗi xử lý đa CTE và WITH RECURSIVE để duyệt cây phân cấp và đồ thị.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'As SQL queries grow complex, nested derived tables become deeply indented and hard to read. Common Table Expressions (CTEs) define named temporary result sets using the WITH keyword, dramatically improving readability, modularity, and enabling recursive traversal of hierarchical data structures.',
      vi: 'Khi các câu truy vấn SQL trở nên phức tạp, các bảng dẫn xuất lồng nhau sâu sẽ rất khó đọc và bảo trì. Biểu thức bảng phổ biến (CTE) định nghĩa các tập kết quả tạm thời có tên bằng từ khóa WITH, giúp code sáng sủa, module hóa và cho phép đệ quy duyệt cấu trúc dữ liệu dạng cây phân cấp.'
    },
    conceptExplanation: {
      en: 'CTE Architecture & Recursive Mechanics:\n1. Standard CTE: Declared with "WITH cte_name AS (SELECT ...)" before the main statement. Can be referenced multiple times within the outer query.\n2. Chained CTEs: Comma-separated definitions ("WITH cte1 AS (...), cte2 AS (...)") where later CTEs can reference earlier CTEs.\n3. Recursive CTE Structure:\n   - Anchor Member: Initial query returning base records (e.g. root manager or starting seed 1).\n   - UNION ALL: Glues the anchor to the recursive step.\n   - Recursive Member: Query referencing the CTE itself, evaluating children/next states until the join or termination condition produces 0 rows.\n4. Hierarchical Traversal: Perfect for reporting lines (CEO down to interns), folder directory trees, and bill of materials (BOM).',
      vi: 'Kiến trúc CTE & Cơ chế đệ quy:\n1. CTE tiêu chuẩn: Khai báo bằng "WITH cte_name AS (SELECT ...)" trước câu lệnh chính. Có thể được tái sử dụng nhiều lần trong truy vấn.\n2. Chuỗi CTE (Chained CTEs): Khai báo phân tách bằng dấu phẩy ("WITH cte1 AS (...), cte2 AS (...)"), các CTE sau có thể tham chiếu trực tiếp đến các CTE trước.\n3. Cấu trúc CTE đệ quy (Recursive CTE):\n   - Anchor Member (Nhánh neo): Câu truy vấn khởi tạo trả về các bản ghi gốc (như CEO hoặc giá trị bắt đầu 1).\n   - UNION ALL: Kết nối nhánh neo với bước đệ quy.\n   - Recursive Member (Nhánh đệ quy): Truy vấn tham chiếu lại chính CTE đó để duyệt các cấp con cho đến khi điều kiện dừng không còn dòng nào.\n4. Duyệt cây phân cấp: Ứng dụng hoàn hảo cho cây sơ đồ tổ chức (từ Tổng giám đốc tới nhân viên), cây thư mục và cấu trúc định mức linh kiện sản phẩm (BOM).'
    },
    syntax: `-- Standard Multi-CTE Pipeline
WITH DepartmentSummary AS (
  SELECT department_id, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department_id
),
HighSalaryDepts AS (
  SELECT department_id FROM DepartmentSummary WHERE avg_salary > 75000
)
SELECT e.id, e.name, e.salary
FROM employees e
JOIN HighSalaryDepts h ON e.department_id = h.department_id;

-- Recursive CTE for Hierarchy / Numbers
WITH RECURSIVE OrgChart AS (
  -- Anchor: Find the CEO (no manager)
  SELECT id, name, manager_id, 1 AS level, CAST(name AS TEXT) AS path
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive Member: Join subordinates
  SELECT e.id, e.name, e.manager_id, o.level + 1, o.path || ' -> ' || e.name
  FROM employees e
  JOIN OrgChart o ON e.manager_id = o.id
)
SELECT * FROM OrgChart ORDER BY level, id;`,
    examples: [
      {
        title: {
          en: '1. Modular Multi-Step Reporting with Chained CTEs',
          vi: '1. Báo Cáo Phân Tầng Nhiều Bước Với Chuỗi CTE'
        },
        code: `WITH RegionalSales AS (
  SELECT region, SUM(amount) AS total_revenue
  FROM sales
  GROUP BY region
),
AverageRegionalSales AS (
  SELECT AVG(total_revenue) AS benchmark_avg
  FROM RegionalSales
)
SELECT r.region, 
       r.total_revenue,
       ROUND(r.total_revenue - a.benchmark_avg, 2) AS variance_from_benchmark
FROM RegionalSales r
CROSS JOIN AverageRegionalSales a
ORDER BY variance_from_benchmark DESC;`,
        language: 'sql',
        explanation: {
          en: 'Deconstructs regional variance analysis into clean, self-documenting modular transformations.',
          vi: 'Tách nhỏ bài toán phân tích phương sai doanh thu vùng thành các bước chuyển đổi module hóa trong sáng.'
        }
      },
      {
        title: {
          en: '2. Recursive Sequence Generation (1 to 10)',
          vi: '2. Sinh Dãy Số Đệ Quy (Từ 1 Đến 10)'
        },
        code: `WITH RECURSIVE NumberSeries AS (
  SELECT 1 AS num
  UNION ALL
  SELECT num + 1 FROM NumberSeries WHERE num < 10
)
SELECT num, num * num AS square, num * 10 AS factor_ten
FROM NumberSeries;`,
        language: 'sql',
        explanation: {
          en: 'Generates a table of numbers dynamically without relying on static mock rows or external table dependencies.',
          vi: 'Tạo động một bảng dãy số mà không phụ thuộc vào dữ liệu có sẵn hay bảng phụ trợ.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Omitting the termination condition in a recursive CTE, resulting in an infinite loop.',
          vi: 'Quên điều kiện dừng trong CTE đệ quy, dẫn đến vòng lặp vô tận làm treo CSDL.'
        },
        correction: {
          en: 'Always include a boundary filter (e.g. "WHERE num < 100" or "WHERE level < 20") or ensure cycle detection so recursion terminates safely.',
          vi: 'Luôn luôn đặt điều kiện chặn biên (ví dụ: "WHERE num < 100" hoặc "WHERE level < 20") để quá trình đệ quy kết thúc an toàn.'
        }
      },
      {
        mistake: {
          en: 'Using multiple WITH keywords for chained CTEs.',
          vi: 'Dùng nhiều từ khóa WITH khi khai báo chuỗi các CTE liên tiếp.'
        },
        correction: {
          en: 'The WITH keyword is written only ONCE at the start. Subsequent CTEs are separated by commas (e.g. "WITH cte1 AS (...), cte2 AS (...)").',
          vi: 'Từ khóa WITH chỉ được viết DUY NHẤT một lần ở đầu. Các CTE tiếp theo được phân tách bằng dấu phẩy ("WITH cte1 AS (...), cte2 AS (...)").'
        }
      }
    ],
    tips: [
      {
        en: 'In SQLite and PostgreSQL, recursive CTEs require the "WITH RECURSIVE" keyword syntax, whereas SQL Server uses standard "WITH".',
        vi: 'Trong SQLite và PostgreSQL, CTE đệ quy bắt buộc dùng cú pháp "WITH RECURSIVE", trong khi SQL Server dùng từ khóa "WITH" thông thường.'
      },
      {
        en: 'CTEs can also be used before INSERT, UPDATE, and DELETE statements to prepare data pipelines before applying mutations.',
        vi: 'CTE cũng có thể được đặt trước các lệnh INSERT, UPDATE và DELETE để chuẩn bị trước tập dữ liệu thay đổi.'
      }
    ],
    practiceStarterCode: `-- Practice CTE pipeline
WITH HighEarners AS (
  SELECT id, name, department_id, salary FROM employees WHERE salary >= 70000
)
SELECT * FROM HighEarners ORDER BY salary DESC;`
  },
  exercisePool: [
    {
      id: 'sql_ex_cte_1',
      type: 'complete_code',
      title: {
        en: 'Modular Department Salary Benchmark CTE',
        vi: 'CTE Chuẩn Hóa Ngưỡng Lương Phòng Ban'
      },
      instruction: {
        en: 'Write a CTE named DeptAvg that calculates department_id and average salary (avg_sal), then join it with employees on department_id.',
        vi: 'Viết một CTE có tên DeptAvg tính department_id và lương trung bình (avg_sal), sau đó join với employees theo department_id.'
      },
      starterCode: `___ DeptAvg AS (
  SELECT department_id, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department_id
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e
JOIN DeptAvg d ON e.department_id = d.department_id;`,
      solutionCode: `WITH DeptAvg AS (
  SELECT department_id, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department_id
)
SELECT e.name, e.salary, d.avg_sal
FROM employees e
JOIN DeptAvg d ON e.department_id = d.department_id;`,
      hint: {
        en: 'Start with the WITH keyword.',
        vi: 'Bắt đầu bằng từ khóa WITH.'
      },
      explanation: {
        en: 'The WITH clause defines the temporary named CTE DeptAvg.',
        vi: 'Mệnh đề WITH định nghĩa bảng tạm thời có tên DeptAvg.'
      }
    },
    {
      id: 'sql_ex_cte_2',
      type: 'complete_code',
      title: {
        en: 'Recursive Sequence Generator',
        vi: 'Sinh Dãy Số Đệ Quy'
      },
      instruction: {
        en: 'Complete the recursive CTE to generate numbers from 1 to 5.',
        vi: 'Hoàn thiện CTE đệ quy để sinh dãy số từ 1 đến 5.'
      },
      starterCode: `WITH RECURSIVE Countdown AS (
  SELECT 1 AS val
  UNION ALL
  SELECT val + 1 FROM Countdown WHERE val < ___
)
SELECT val FROM Countdown;`,
      solutionCode: `WITH RECURSIVE Countdown AS (
  SELECT 1 AS val
  UNION ALL
  SELECT val + 1 FROM Countdown WHERE val < 5
)
SELECT val FROM Countdown;`,
      hint: {
        en: 'The boundary condition is val < 5.',
        vi: 'Điều kiện biên là val < 5.'
      },
      explanation: {
        en: 'The recursive member runs while val < 5, producing integers 1 through 5.',
        vi: 'Nhánh đệ quy tiếp tục chạy khi val < 5, sinh ra các số từ 1 đến 5.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_ctes_recursive',
    title: {
      en: 'Hierarchical Organizational Chart Depth & Path Builder',
      vi: 'Xây Dựng Cây Sơ Đồ Tổ Chức & Cấp Bậc Phân Cấp Đệ Quy'
    },
    description: {
      en: 'Write a recursive SQL query using WITH RECURSIVE OrgHierarchy AS (...) to compute the full management reporting chain. The anchor query must select root leaders (manager_id IS NULL) with level = 1 and hierarchy_path = name. The recursive member must join employees e ON e.manager_id = h.id, incrementing level = h.level + 1 and concatenating hierarchy_path = h.hierarchy_path || \' -> \' || e.name. In the final SELECT, project id, name, manager_id, level, hierarchy_path ordered by level ASC, id ASC.',
      vi: 'Viết câu truy vấn SQL đệ quy dùng WITH RECURSIVE OrgHierarchy AS (...) để tính toán toàn bộ chuỗi báo cáo quản lý nhân sự. Nhánh neo phải chọn các lãnh đạo cao nhất (manager_id IS NULL) với level = 1 và hierarchy_path = name. Nhánh đệ quy phải join employees e ON e.manager_id = h.id, tăng level = h.level + 1 và nối chuỗi hierarchy_path = h.hierarchy_path || \' -> \' || e.name. Trong SELECT cuối cùng, lấy id, name, manager_id, level, hierarchy_path sắp xếp theo level ASC, id ASC.'
    },
    requirements: [
      { en: '1. Anchor: SELECT id, name, manager_id, 1 AS level, name AS hierarchy_path WHERE manager_id IS NULL', vi: '1. Anchor: SELECT id, name, manager_id, 1 AS level, name AS hierarchy_path WHERE manager_id IS NULL' },
      { en: '2. Recursive: SELECT e.id, e.name, e.manager_id, h.level + 1, h.hierarchy_path || \' -> \' || e.name JOIN OrgHierarchy h ON e.manager_id = h.id', vi: '2. Recursive: SELECT e.id, e.name, e.manager_id, h.level + 1, h.hierarchy_path || \' -> \' || e.name JOIN OrgHierarchy h ON e.manager_id = h.id' },
      { en: '3. ORDER BY level ASC, id ASC', vi: '3. Sắp xếp ORDER BY level ASC, id ASC' }
    ],
    starterCode: `-- Write your recursive org hierarchy query
WITH RECURSIVE OrgHierarchy AS (
  SELECT id, name, manager_id, 1 AS level, name AS hierarchy_path FROM employees WHERE manager_id IS NULL
)
SELECT * FROM OrgHierarchy;`,
    solutionCode: `WITH RECURSIVE OrgHierarchy AS (
  SELECT id, name, manager_id, 1 AS level, CAST(name AS TEXT) AS hierarchy_path
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  SELECT e.id, e.name, e.manager_id, h.level + 1, CAST(h.hierarchy_path || ' -> ' || e.name AS TEXT)
  FROM employees e
  JOIN OrgHierarchy h ON e.manager_id = h.id
)
SELECT id, name, manager_id, level, hierarchy_path
FROM OrgHierarchy
ORDER BY level ASC, id ASC;`,
    hints: [
      {
        en: 'Cast hierarchy_path to TEXT to ensure matching types across the UNION ALL branches in SQLite/PostgreSQL.',
        vi: 'Ép kiểu hierarchy_path sang TEXT để đảm bảo đồng nhất kiểu dữ liệu giữa hai nhánh UNION ALL trong SQLite/PostgreSQL.'
      }
    ],
    solutionExplanation: {
      en: 'Traverses hierarchical trees from the root down to individual team contributors while computing depth levels and breadcrumb paths.',
      vi: 'Duyệt cây phân cấp từ gốc xuống từng nhân viên, đồng thời tính toán chính xác cấp độ sâu và đường dẫn chuỗi quản lý.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_cte_1',
      type: 'single_choice',
      question: {
        en: 'What keyword is used to introduce a Common Table Expression (CTE) in SQL?',
        vi: 'Từ khóa nào được sử dụng để bắt đầu một Biểu Thức Bảng Phổ Biến (CTE) trong SQL?'
      },
      options: [
        { en: 'WITH', vi: 'WITH' },
        { en: 'TEMP TABLE', vi: 'TEMP TABLE' },
        { en: 'LET', vi: 'LET' },
        { en: 'DEFINE', vi: 'DEFINE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The WITH clause is the ANSI standard keyword for defining Common Table Expressions.',
        vi: 'Mệnh đề WITH là từ khóa chuẩn ANSI để định nghĩa các Biểu Thức Bảng Phổ Biến.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_cte_2',
      type: 'single_choice',
      question: {
        en: 'What are the two essential component queries that make up a recursive CTE?',
        vi: 'Hai thành phần câu truy vấn thiết yếu tạo nên một CTE đệ quy là gì?'
      },
      options: [
        { en: 'The Anchor Member and the Recursive Member (connected by UNION ALL)', vi: 'Nhánh neo (Anchor Member) và Nhánh đệ quy (Recursive Member), kết nối bằng UNION ALL' },
        { en: 'The INSERT member and the DELETE member', vi: 'Nhánh INSERT và nhánh DELETE' },
        { en: 'The GROUP BY member and the HAVING member', vi: 'Nhánh GROUP BY và nhánh HAVING' },
        { en: 'The Primary key and Foreign key', vi: 'Khóa chính và khóa ngoại' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A recursive CTE requires an anchor query for base initialization and a recursive member for repeated step evaluations.',
        vi: 'Một CTE đệ quy bắt buộc phải có nhánh neo để khởi tạo dữ liệu ban đầu và nhánh đệ quy để thực thi lặp qua các cấp.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_cte_3',
      type: 'true_false',
      question: {
        en: 'A single query can define multiple CTEs separated by commas under a single WITH statement.',
        vi: 'Một câu truy vấn có thể định nghĩa nhiều CTE phân tách nhau bằng dấu phẩy chỉ dưới một từ khóa WITH duy nhất.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Multiple CTEs are chained together using commas: "WITH cte1 AS (...), cte2 AS (...)".',
        vi: 'Đúng. Nhiều CTE có thể được nối chuỗi với nhau bằng dấu phẩy: "WITH cte1 AS (...), cte2 AS (...)".'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_cte_4',
      type: 'single_choice',
      question: {
        en: 'What is a major advantage of CTEs over deeply nested derived tables in the FROM clause?',
        vi: 'Ưu điểm lớn nhất của CTE so với các bảng dẫn xuất lồng nhau sâu trong mệnh đề FROM là gì?'
      },
      options: [
        { en: 'Linear, top-to-bottom code readability, ease of maintenance, and the ability to reference the same CTE multiple times in the query', vi: 'Tính dễ đọc theo luồng từ trên xuống dưới, dễ bảo trì và khả năng tái sử dụng cùng một CTE nhiều lần trong truy vấn' },
        { en: 'CTEs permanently save tables to the hard drive', vi: 'CTE lưu vĩnh viễn bảng vào ổ đĩa' },
        { en: 'CTEs disable table locking entirely', vi: 'CTE tắt hoàn toàn cơ chế khóa bảng' },
        { en: 'CTEs bypass all database security rules', vi: 'CTE bỏ qua mọi quy tắc bảo mật của CSDL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CTEs transform pyramid-shaped nested queries into clean, linear pipelines of self-contained named steps.',
        vi: 'CTE biến các câu truy vấn lồng nhau hình kim tự tháp thành chuỗi xử lý tuyến tính, rõ ràng từng bước.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_cte_5',
      type: 'predict_output',
      question: {
        en: 'What is the output of: WITH RECURSIVE r AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM r WHERE n < 3) SELECT SUM(n) FROM r;?',
        vi: 'Kết quả của câu truy vấn: WITH RECURSIVE r AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM r WHERE n < 3) SELECT SUM(n) FROM r; là gì?'
      },
      options: [
        { en: '6 (1 + 2 + 3)', vi: '6 (1 + 2 + 3)' },
        { en: '3', vi: '3' },
        { en: '1', vi: '1' },
        { en: 'Infinite loop error', vi: 'Lỗi lặp vô tận' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The recursive CTE generates rows with values 1, 2, and 3. The SUM(n) is 1 + 2 + 3 = 6.',
        vi: 'CTE đệ quy sinh ra các dòng có giá trị 1, 2 và 3. Tổng SUM(n) là 1 + 2 + 3 = 6.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_cte_6',
      type: 'single_choice',
      question: {
        en: 'How do database engines like SQL Server protect against runaway recursive CTE infinite loops?',
        vi: 'Các hệ quản trị CSDL như SQL Server bảo vệ hệ thống khỏi các vòng lặp CTE đệ quy vô tận bằng cách nào?'
      },
      options: [
        { en: 'By enforcing a default MAXRECURSION limit (typically 100 iterations) that aborts the query if exceeded', vi: 'Bằng cách áp dụng giới hạn MAXRECURSION mặc định (thường là 100 lần lặp) và tự ngắt truy vấn nếu vượt quá' },
        { en: 'By deleting the entire database schema', vi: 'Bằng cách xóa toàn bộ lược đồ CSDL' },
        { en: 'By rebooting the physical server', vi: 'Bằng cách khởi động lại máy chủ vật lý' },
        { en: 'By converting recursive queries to flat Excel sheets', vi: 'Bằng cách chuyển truy vấn đệ quy thành file Excel' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Databases implement safety recursion caps (such as OPTION (MAXRECURSION 100)) to prevent catastrophic CPU/memory exhaustion.',
        vi: 'CSDL thiết lập mức giới hạn đệ quy an toàn (như MAXRECURSION) để ngăn chặn việc cạn kiệt RAM/CPU do lặp vô tận.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_cte_7',
      type: 'true_false',
      question: {
        en: 'In PostgreSQL 12+, CTEs are automatically inlined by the optimizer unless explicitly marked with the MATERIALIZED keyword.',
        vi: 'Trong PostgreSQL 12+, các CTE được trình tối ưu tự động inline (gộp trực tiếp) trừ khi được chỉ định rõ bằng từ khóa MATERIALIZED.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Modern PostgreSQL inlines non-recursive CTEs into the outer query plan for optimal execution performance.',
        vi: 'Đúng. PostgreSQL hiện đại tự động inline các CTE không đệ quy vào kế hoạch thực thi để đạt hiệu năng tối ưu nhất.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_cte_8',
      type: 'single_choice',
      question: {
        en: 'Which real-world data structure is best queried using a recursive CTE?',
        vi: 'Cấu trúc dữ liệu thực tế nào phù hợp nhất để truy vấn bằng CTE đệ quy?'
      },
      options: [
        { en: 'Hierarchical data (e.g. employee-manager trees, category-subcategory trees, bill-of-materials)', vi: 'Dữ liệu phân cấp (ví dụ: cây nhân viên - quản lý, cây danh mục - danh mục con, định mức linh kiện sản xuất)' },
        { en: 'Unordered flat text files', vi: 'File văn bản phẳng không có thứ tự' },
        { en: 'A table with only 1 integer column and 1 row', vi: 'Bảng chỉ có 1 cột số nguyên và 1 dòng' },
        { en: 'Encrypted passwords', vi: 'Mật khẩu đã mã hóa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Recursive CTEs are the relational standard for traversing self-referencing hierarchical trees and graph edges.',
        vi: 'CTE đệ quy là chuẩn mực trong CSDL quan hệ để duyệt các cây phân cấp tự tham chiếu và các cạnh đồ thị.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_cte_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following statements about CTEs are TRUE? (Select all that apply)',
        vi: 'Những nhận định nào sau đây về CTE là ĐÚNG? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'A CTE exists only for the duration of the single query in which it is defined', vi: 'Một CTE chỉ tồn tại trong suốt thời gian thực thi của câu truy vấn chứa nó' },
        { en: 'A later CTE in a chained WITH block can reference earlier CTEs defined above it', vi: 'Một CTE đứng sau trong khối WITH có thể tham chiếu đến các CTE đứng trước nó' },
        { en: 'CTEs can be used prior to UPDATE, DELETE, and INSERT statements', vi: 'CTE có thể được đặt trước các lệnh UPDATE, DELETE và INSERT' },
        { en: 'CTEs permanently take up disk space after the query finishes', vi: 'CTE chiếm dụng dung lượng ổ cứng vĩnh viễn sau khi truy vấn kết thúc' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Statements 1, 2, and 3 are correct. Statement 4 is false because CTEs are ephemeral and do not persist on disk.',
        vi: 'Các phát biểu 1, 2 và 3 đều đúng. Phát biểu 4 sai vì CTE chỉ là bảng tạm trong bộ nhớ và tự giải phóng khi xong lệnh.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_cte_10',
      type: 'single_choice',
      question: {
        en: 'Why does a recursive member in a recursive CTE use UNION ALL instead of UNION?',
        vi: 'Tại sao nhánh đệ quy trong một CTE đệ quy thường sử dụng UNION ALL thay vì UNION?'
      },
      options: [
        { en: 'UNION ALL avoids the severe performance penalty of sorting and deduplicating rows on every recursion step', vi: 'UNION ALL tránh được chi phí hiệu năng nặng nề của việc sắp xếp và khử trùng lặp dữ liệu ở mỗi bước lặp đệ quy' },
        { en: 'UNION is forbidden by the SQL compiler inside recursive CTEs', vi: 'UNION bị trình biên dịch SQL cấm dùng trong CTE đệ quy' },
        { en: 'UNION ALL converts strings to numbers', vi: 'UNION ALL chuyển đổi chuỗi thành số' },
        { en: 'UNION always causes a stack overflow', vi: 'UNION luôn gây lỗi tràn ngăn xếp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'UNION ALL simply appends newly generated iteration rows directly, making recursion significantly faster.',
        vi: 'UNION ALL chỉ việc ghép nối trực tiếp các dòng mới sinh ra ở mỗi vòng lặp, giúp quá trình đệ quy nhanh hơn vượt bậc.'
      },
      topicId: 'sql_ctes_recursive',
      difficulty: 'hard'
    }
  ]
};

export default lesson14;
