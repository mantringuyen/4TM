import { Lesson } from '../../../../types';

export const lesson06: Lesson = {
  id: 'sql_lesson_6',
  moduleId: 'sql_mod_1',
  levelId: 'basic',
  courseId: 'sql',
  order: 6,
  topicId: 'sql_order_limit',
  title: {
    en: 'ORDER BY, LIMIT & OFFSET',
    vi: 'Sắp Xếp & Phân Trang: ORDER BY, LIMIT & OFFSET'
  },
  summary: {
    en: 'Master multi-column deterministic sorting with ASC and DESC, handling NULL ordering positions, and paginating data safely using LIMIT and OFFSET.',
    vi: 'Làm chủ sắp xếp dữ liệu đa cột với ASC và DESC, kiểm soát vị trí giá trị NULL và phân trang an toàn bằng LIMIT và OFFSET.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'In relational database theory, tables represent unordered mathematical sets. Without an explicit ORDER BY clause, the database engine returns records in arbitrary physical or heap order. ORDER BY guarantees a deterministic, reproducible sequence for your applications and pagination workflows.',
      vi: 'Trong lý thuyết cơ sở dữ liệu quan hệ, các bảng là tập hợp toán học không có thứ tự cố định. Nếu không có mệnh đề ORDER BY rõ ràng, CSDL sẽ trả về các bản ghi theo thứ tự vật lý ngẫu nhiên. Mệnh đề ORDER BY đảm bảo kết quả trả về có tính xác định và nhất quán cho các ứng dụng và chức năng phân trang.'
    },
    conceptExplanation: {
      en: 'Sorting and Pagination Architecture:\n1. Multi-Column Sorting: Specify ORDER BY col1 [ASC|DESC], col2 [ASC|DESC]. Sorting evaluates from left to right.\n2. Deterministic Tie-Breakers: If multiple rows have equal values for primary sorting columns, always append a unique column (like primary key id) to ensure deterministic ordering.\n3. NULL Ordering: In ANSI SQL, use NULLS FIRST or NULLS LAST. (In SQLite/MySQL, NULLs default to the lowest value in ASC order).\n4. LIMIT & OFFSET: LIMIT n restricts output to n records. OFFSET m skips the first m records before returning rows.',
      vi: 'Kiến trúc sắp xếp và phân trang:\n1. Sắp xếp đa cột: Sử dụng ORDER BY col1 [ASC|DESC], col2 [ASC|DESC]. Thứ tự đánh giá ưu tiên từ trái sang phải.\n2. Khóa phụ nhất quán (Tie-Breaker): Khi nhiều hàng có cùng giá trị sắp xếp, hãy luôn bổ sung thêm cột định danh duy nhất (như khóa chính id) để đảm bảo kết quả phân trang không bị nhảy vị trí.\n3. Vị trí của NULL: Trong chuẩn ANSI SQL, dùng NULLS FIRST hoặc NULLS LAST (trong SQLite/MySQL, NULL mặc định là giá trị nhỏ nhất khi xếp ASC).\n4. LIMIT & OFFSET: LIMIT n giới hạn lấy ra n dòng. OFFSET m bỏ qua m dòng đầu tiên trước khi lấy kết quả.'
    },
    syntax: `SELECT column1, column2
FROM table_name
ORDER BY column1 DESC, column2 ASC
LIMIT page_size OFFSET page_offset;`,
    examples: [
      {
        title: {
          en: '1. Multi-Level Sort with Tie-Breaker',
          vi: '1. Sắp Xếp Nhiều Cấp Với Khóa Phụ Tie-Breaker'
        },
        code: `SELECT id, name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, id ASC;`,
        language: 'sql',
        explanation: {
          en: 'Sorts by department alphabetically, then highest salary within each department, using id as a final tie-breaker.',
          vi: 'Sắp xếp phòng ban theo bảng chữ cái, sau đó ưu tiên lương cao nhất trong từng phòng ban và dùng id làm khóa phụ nếu lương bằng nhau.'
        }
      },
      {
        title: {
          en: '2. Paginating Top Earners (Page 2, 5 per page)',
          vi: '2. Phân Trang Top Nhân Viên Lương Cao (Trang 2, 5 dòng/trang)'
        },
        code: `SELECT id, name, salary
FROM employees
ORDER BY salary DESC, id ASC
LIMIT 5 OFFSET 5;`,
        language: 'sql',
        explanation: {
          en: 'Retrieves ranks 6 through 10 of top earners by skipping the first 5 records (OFFSET 5) and returning the next 5 (LIMIT 5).',
          vi: 'Lấy các nhân viên xếp hạng từ 6 đến 10 bằng cách bỏ qua 5 bản ghi đầu tiên (OFFSET 5) và lấy 5 bản ghi tiếp theo (LIMIT 5).'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Paginating with LIMIT and OFFSET without an ORDER BY clause.',
          vi: 'Phân trang bằng LIMIT và OFFSET nhưng không có mệnh đề ORDER BY.'
        },
        correction: {
          en: 'Without ORDER BY, the row order is non-deterministic. Consecutive page requests can return duplicate rows or skip rows entirely.',
          vi: 'Nếu không có ORDER BY, thứ tự bản ghi là ngẫu nhiên. Việc chuyển trang có thể làm lặp lại các dòng đã xem hoặc bỏ sót dữ liệu.'
        }
      },
      {
        mistake: {
          en: 'Relying on deep OFFSET for massive datasets (e.g. OFFSET 1000000).',
          vi: 'Lạm dụng OFFSET lớn cho tập dữ liệu hàng triệu dòng (ví dụ: OFFSET 1000000).'
        },
        correction: {
          en: 'High OFFSET values force the database engine to scan and discard millions of rows. For large-scale data, prefer keyset pagination (WHERE id > last_seen_id ORDER BY id LIMIT n).',
          vi: 'OFFSET lớn buộc CSDL phải đọc và loại bỏ hàng triệu dòng trong bộ nhớ. Với dữ liệu lớn, hãy dùng phân trang dựa trên khóa (Keyset Pagination).'
        }
      }
    ],
    tips: [
      {
        en: 'In SQL logical order of execution, ORDER BY is evaluated AFTER the SELECT clause, which means you CAN order by column aliases defined in SELECT.',
        vi: 'Trong thứ tự thực thi logic của SQL, ORDER BY chạy SAU mệnh đề SELECT, do đó bạn HOÀN TOÀN CÓ THỂ sắp xếp theo bí danh cột vừa đặt trong SELECT.'
      },
      {
        en: 'Ascending (ASC) is the default sort direction if omitted.',
        vi: 'Thứ tự tăng dần (ASC) là mặc định nếu bạn không ghi rõ từ khóa.'
      }
    ],
    practiceStarterCode: `-- Fetch the top 3 highest-earning employees in Engineering
SELECT name, department, salary FROM employees WHERE department = 'Engineering' ORDER BY salary DESC LIMIT 3;`
  },
  exercisePool: [
    {
      id: 'sql_ex_ord_1',
      type: 'complete_code',
      title: {
        en: 'Sort by Salary Descending',
        vi: 'Sắp Xếp Lương Giảm Dần'
      },
      instruction: {
        en: 'Write a query to retrieve all employees ordered by salary from highest to lowest.',
        vi: 'Viết câu truy vấn lấy tất cả nhân viên sắp xếp theo mức lương từ cao nhất đến thấp nhất.'
      },
      starterCode: `SELECT name, department, salary
FROM employees
ORDER BY salary ___;`,
      solutionCode: `SELECT name, department, salary
FROM employees
ORDER BY salary DESC;`,
      hint: {
        en: 'Use the DESC keyword after the column name.',
        vi: 'Dùng từ khóa DESC sau tên cột.'
      },
      explanation: {
        en: 'DESC sorts records in descending order (highest to lowest).',
        vi: 'DESC sắp xếp bản ghi theo thứ tự giảm dần (từ cao xuống thấp).'
      }
    },
    {
      id: 'sql_ex_ord_2',
      type: 'complete_code',
      title: {
        en: 'Paginate Results with LIMIT and OFFSET',
        vi: 'Phân Trang Dữ Liệu Với LIMIT và OFFSET'
      },
      instruction: {
        en: 'Select name and salary ordered by id ascending, returning 3 rows starting from row 4 (skip first 3 rows).',
        vi: 'Chọn name và salary sắp xếp theo id tăng dần, lấy 3 dòng bắt đầu từ dòng thứ 4 (bỏ qua 3 dòng đầu).'
      },
      starterCode: `SELECT name, salary
FROM employees
ORDER BY id ASC
LIMIT 3 ___ 3;`,
      solutionCode: `SELECT name, salary
FROM employees
ORDER BY id ASC
LIMIT 3 OFFSET 3;`,
      hint: {
        en: 'Use the OFFSET keyword to skip rows.',
        vi: 'Dùng từ khóa OFFSET để bỏ qua các dòng đầu.'
      },
      explanation: {
        en: 'LIMIT 3 OFFSET 3 skips the first 3 rows and returns the next 3 rows.',
        vi: 'LIMIT 3 OFFSET 3 bỏ qua 3 dòng đầu và lấy tiếp 3 dòng kế tiếp.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_order_limit',
    title: {
      en: 'Executive Compensation Leaderboard Page',
      vi: 'Bảng Xếp Hạng Lương Lãnh Đạo Theo Trang'
    },
    description: {
      en: 'Write a SQL query that retrieves id, name, department, and salary from the employees table. Sort by department in ascending order (A-Z), then by salary in descending order (highest first), with id ascending as the deterministic tie-breaker. Return only 5 records starting from offset 10 (representing page 3 of 5-item pages).',
      vi: 'Viết câu truy vấn SQL lấy id, name, department và salary từ bảng employees. Sắp xếp theo department tăng dần (A-Z), sau đó theo salary giảm dần (cao nhất trước), và dùng id tăng dần làm tie-breaker. Chỉ lấy 5 bản ghi bắt đầu từ vị trí offset 10 (tương ứng trang 3 trong phân trang 5 bản ghi/trang).'
    },
    requirements: [
      { en: '1. ORDER BY department ASC, salary DESC, id ASC', vi: '1. Sắp xếp ORDER BY department ASC, salary DESC, id ASC' },
      { en: '2. Restrict to LIMIT 5', vi: '2. Giới hạn LIMIT 5' },
      { en: '3. Skip 10 rows using OFFSET 10', vi: '3. Bỏ qua 10 dòng bằng OFFSET 10' }
    ],
    starterCode: `-- Write your multi-tier sorted pagination query
SELECT id, name, department, salary FROM employees;`,
    solutionCode: `SELECT id, name, department, salary
FROM employees
ORDER BY department ASC, salary DESC, id ASC
LIMIT 5 OFFSET 10;`,
    hints: [
      {
        en: 'Append ORDER BY department ASC, salary DESC, id ASC LIMIT 5 OFFSET 10 to your query.',
        vi: 'Thêm ORDER BY department ASC, salary DESC, id ASC LIMIT 5 OFFSET 10 vào cuối câu truy vấn.'
      }
    ],
    solutionExplanation: {
      en: 'Multi-column sorting ensures clear business groupings while deterministic tie-breaking prevents duplicate rows across paginated views.',
      vi: 'Sắp xếp đa cột giúp phân nhóm nghiệp vụ rõ ràng và khóa phụ tie-breaker giúp kết quả phân trang luôn ổn định tuyệt đối.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_ord_1',
      type: 'single_choice',
      question: {
        en: 'What is the default sort direction in SQL if neither ASC nor DESC is specified?',
        vi: 'Chiều sắp xếp mặc định trong SQL là gì nếu không chỉ định rõ ASC hay DESC?'
      },
      options: [
        { en: 'ASC (Ascending / Low to High)', vi: 'ASC (Tăng dần / Từ thấp đến cao)' },
        { en: 'DESC (Descending / High to Low)', vi: 'DESC (Giảm dần / Từ cao xuống thấp)' },
        { en: 'Random order', vi: 'Thứ tự ngẫu nhiên' },
        { en: 'Heap insertion order', vi: 'Thứ tự chèn vật lý' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'By ANSI SQL standard, ascending (ASC) is the default sort direction.',
        vi: 'Theo chuẩn ANSI SQL, sắp xếp tăng dần (ASC) là chiều mặc định.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ord_2',
      type: 'true_false',
      question: {
        en: 'You can reference column aliases defined in the SELECT clause inside the ORDER BY clause.',
        vi: 'Bạn có thể sử dụng bí danh cột được đặt trong mệnh đề SELECT ở bên trong mệnh đề ORDER BY.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. In SQL query processing, ORDER BY is evaluated AFTER SELECT, so aliases are available.',
        vi: 'Đúng. Trong tiến trình xử lý truy vấn SQL, ORDER BY chạy SAU SELECT, do đó các bí danh cột hoàn toàn khả dụng.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ord_3',
      type: 'predict_output',
      question: {
        en: 'How many rows are returned by "SELECT * FROM employees ORDER BY id LIMIT 5 OFFSET 10;" on a table with 12 total rows?',
        vi: 'Có bao nhiêu dòng được trả về bởi câu lệnh "SELECT * FROM employees ORDER BY id LIMIT 5 OFFSET 10;" trên một bảng có tổng cộng 12 dòng?'
      },
      options: [
        { en: '2 rows', vi: '2 dòng' },
        { en: '5 rows', vi: '5 dòng' },
        { en: '10 rows', vi: '10 dòng' },
        { en: '0 rows', vi: '0 dòng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Skipping the first 10 rows (OFFSET 10) leaves only rows 11 and 12 (2 rows total), which is fewer than the requested LIMIT 5.',
        vi: 'Bỏ qua 10 dòng đầu (OFFSET 10) chỉ còn lại dòng 11 và 12 (tổng cộng 2 dòng), ít hơn con số yêu cầu của LIMIT 5.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_ord_4',
      type: 'single_choice',
      question: {
        en: 'Why is it critical to include a deterministic tie-breaker (like primary key id) in paginated queries?',
        vi: 'Tại sao việc bổ sung khóa phụ nhất quán (như id khóa chính) lại cực kỳ quan trọng trong các câu truy vấn phân trang?'
      },
      options: [
        { en: 'Without a unique tie-breaker, rows with identical sort values can shift positions between page requests, causing missing or duplicate records', vi: 'Nếu không có khóa phụ duy nhất, các dòng có cùng giá trị sắp xếp có thể bị đảo vị trí ngẫu nhiên giữa các lần chuyển trang, gây lặp hoặc mất bản ghi' },
        { en: 'Because SQL throws a fatal error if only one column is sorted', vi: 'Vì SQL báo lỗi nghiêm trọng nếu chỉ sắp xếp theo 1 cột' },
        { en: 'It automatically encrypts the result set', vi: 'Nó tự động mã hóa tập kết quả' },
        { en: 'It reduces table disk space', vi: 'Nó làm giảm dung lượng bảng trên ổ đĩa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Non-deterministic sorting allows the database engine to return identical-value rows in unpredictable order between calls, breaking pagination.',
        vi: 'Sắp xếp không có tính xác định khiến CSDL có thể trả về các hàng có cùng giá trị theo thứ tự ngẫu nhiên giữa các trang, làm hỏng chức năng phân trang.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_ord_5',
      type: 'single_choice',
      question: {
        en: 'In Microsoft SQL Server (T-SQL), what syntax is used instead of LIMIT n OFFSET m?',
        vi: 'Trong Microsoft SQL Server (T-SQL), cú pháp chuẩn nào được sử dụng thay thế cho LIMIT n OFFSET m?'
      },
      options: [
        { en: 'OFFSET m ROWS FETCH NEXT n ROWS ONLY', vi: 'OFFSET m ROWS FETCH NEXT n ROWS ONLY' },
        { en: 'LIMIT n SKIP m', vi: 'LIMIT n SKIP m' },
        { en: 'PAGE m SIZE n', vi: 'PAGE m SIZE n' },
        { en: 'SLICE m TO n', vi: 'SLICE m TO n' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ANSI SQL and T-SQL support "OFFSET m ROWS FETCH NEXT n ROWS ONLY" for standardized pagination.',
        vi: 'Chuẩn ANSI SQL và T-SQL hỗ trợ cú pháp "OFFSET m ROWS FETCH NEXT n ROWS ONLY" để phân trang tiêu chuẩn.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_ord_6',
      type: 'single_choice',
      question: {
        en: 'What is the major performance drawback of using high OFFSET values (e.g. OFFSET 500000) on large tables?',
        vi: 'Nhược điểm hiệu năng lớn nhất của việc sử dụng OFFSET rất lớn (ví dụ: OFFSET 500000) trên bảng dữ liệu lớn là gì?'
      },
      options: [
        { en: 'The database must scan, sort, and discard all 500,000 preceding rows before returning the requested page', vi: 'CSDL phải đọc, sắp xếp và loại bỏ toàn bộ 500.000 dòng đứng trước rồi mới trả về trang được yêu cầu' },
        { en: 'The database deletes the first 500,000 rows permanently', vi: 'CSDL xóa vĩnh viễn 500.000 dòng đầu tiên' },
        { en: 'It limits the network bandwidth to 10 kbps', vi: 'Nó giới hạn băng thông mạng xuống 10 kbps' },
        { en: 'It causes database tables to lose primary key indexes', vi: 'Nó làm bảng bị mất chỉ mục khóa chính' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'OFFSET still requires reading and discarding all skipped rows from disk/index, leading to O(N) performance degradation for deep pages.',
        vi: 'OFFSET vẫn buộc CSDL phải đọc và bỏ qua toàn bộ các dòng trước đó, dẫn đến hiệu năng giảm tuyến tính O(N) khi lật các trang sâu.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_ord_7',
      type: 'true_false',
      question: {
        en: 'In SQLite, NULL values are treated as the lowest possible values when sorted in ascending (ASC) order.',
        vi: 'Trong SQLite, các giá trị NULL được coi là giá trị nhỏ nhất khi sắp xếp theo thứ tự tăng dần (ASC).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. In SQLite and MySQL, NULLs sort first under ASC, whereas in PostgreSQL NULLs default to NULLS LAST unless specified.',
        vi: 'Đúng. Trong SQLite và MySQL, NULL đứng đầu khi xếp ASC, còn trong PostgreSQL NULL mặc định đứng cuối trừ khi có chỉ định khác.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_ord_8',
      type: 'single_choice',
      question: {
        en: 'Which query retrieves the 2nd highest salary from an employees table?',
        vi: 'Câu truy vấn nào lấy mức lương cao thứ 2 từ bảng employees?'
      },
      options: [
        { en: 'SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;', vi: 'SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;' },
        { en: 'SELECT salary FROM employees ORDER BY salary ASC LIMIT 2;', vi: 'SELECT salary FROM employees ORDER BY salary ASC LIMIT 2;' },
        { en: 'SELECT TOP 2 salary FROM employees ORDER BY salary ASC;', vi: 'SELECT TOP 2 salary FROM employees ORDER BY salary ASC;' },
        { en: 'SELECT salary FROM employees WHERE salary = 2;', vi: 'SELECT salary FROM employees WHERE salary = 2;' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SELECT DISTINCT salary ORDER BY salary DESC LIMIT 1 OFFSET 1 sorts distinct salaries from highest to lowest, skips the highest (offset 1), and takes the next 1.',
        vi: 'Sắp xếp lương giảm dần DISTINCT, bỏ qua mức cao nhất (OFFSET 1) và lấy mức tiếp theo (LIMIT 1) cho ra mức lương cao thứ 2.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_ord_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid ORDER BY clauses in ANSI SQL? (Select all that apply)',
        vi: 'Những mệnh đề ORDER BY nào sau đây là hợp lệ trong ANSI SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'ORDER BY salary DESC, name ASC', vi: 'ORDER BY salary DESC, name ASC' },
        { en: 'ORDER BY department', vi: 'ORDER BY department' },
        { en: 'ORDER BY 1, 2', vi: 'ORDER BY 1, 2' },
        { en: 'ORDER BY score DESC NULLS LAST', vi: 'ORDER BY score DESC NULLS LAST' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All four are valid: multi-column, default ASC, ordinal column position (1, 2), and explicit NULL ordering specification.',
        vi: 'Cả bốn cách đều hợp lệ: đa cột, mặc định ASC, chỉ số cột theo vị trí (1, 2) và chỉ định vị trí NULL rõ ràng.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_ord_10',
      type: 'single_choice',
      question: {
        en: 'What is "Keyset Pagination" (Cursor-based Pagination) preferred over OFFSET pagination for large datasets?',
        vi: 'Tại sao "Keyset Pagination" (Phân trang theo con trỏ) lại được ưa chuộng hơn phân trang OFFSET cho các tập dữ liệu lớn?'
      },
      options: [
        { en: 'It uses an index seek (e.g. WHERE id > last_seen_id ORDER BY id LIMIT n) to fetch the next page in O(1) constant time without scanning skipped rows', vi: 'Nó sử dụng tìm kiếm theo chỉ mục (như WHERE id > last_seen_id ORDER BY id LIMIT n) để lấy trang kế tiếp trong thời gian hằng số O(1) mà không phải quét các dòng đã qua' },
        { en: 'It prevents users from using search engines', vi: 'Nó ngăn người dùng tìm kiếm trên Google' },
        { en: 'It requires zero disk memory', vi: 'Nó không tiêu tốn dung lượng ổ cứng' },
        { en: 'It works without any relational database', vi: 'Nó hoạt động mà không cần CSDL quan hệ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Keyset pagination jumps directly to the target record using index seeks, avoiding the expensive scanning of preceding rows.',
        vi: 'Phân trang Keyset nhảy trực tiếp đến bản ghi mục tiêu qua chỉ mục, tránh việc phải quét và loại bỏ các dòng trước đó.'
      },
      topicId: 'sql_order_limit',
      difficulty: 'hard'
    }
  ]
};

export default lesson06;
