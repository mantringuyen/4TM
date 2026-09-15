import { Lesson } from '../../../../types';

export const lesson03: Lesson = {
  id: 'sql_lesson_3',
  moduleId: 'sql_mod_1',
  levelId: 'basic',
  courseId: 'sql',
  order: 3,
  topicId: 'sql_where_operators',
  title: {
    en: 'WHERE: Comparison and Logical Operators',
    vi: 'Mệnh Đề WHERE: Toán Tử So Sánh & Toán Tử Logic'
  },
  summary: {
    en: 'Master row-level filtering with comparison operators, logical AND/OR/NOT evaluation order, and enforcing precedence with parentheses.',
    vi: 'Làm chủ lọc bản ghi với các toán tử so sánh, thứ tự đánh giá logic AND/OR/NOT và kiểm soát độ ưu tiên bằng dấu ngoặc đơn.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'The WHERE clause evaluates a boolean predicate for every individual row processed from the source table. Only rows where the predicate resolves strictly to TRUE are passed forward to downstream operations like GROUP BY or SELECT.',
      vi: 'Mệnh đề WHERE đánh giá biểu thức điều kiện boolean trên từng dòng riêng lẻ từ bảng nguồn. Chỉ những dòng mà điều kiện có kết quả là TRUE mới được chuyển tiếp tới các bước xử lý tiếp theo như GROUP BY hoặc SELECT.'
    },
    conceptExplanation: {
      en: 'Core Filtering Mechanics:\n1. Comparison Operators: =, != (or <>), <, <=, >, >= compare column values against literals or other columns.\n2. Logical Operators:\n   - AND: Both conditions must evaluate to TRUE.\n   - OR: At least one condition must evaluate to TRUE.\n   - NOT: Inverts the boolean truth value.\n3. Operator Precedence: NOT has highest precedence, followed by AND, and finally OR. Parentheses () MUST be used when mixing AND and OR to avoid dangerous logic bugs.',
      vi: 'Các cơ chế lọc dữ liệu cốt lõi:\n1. Toán tử so sánh: =, != (hoặc <>), <, <=, >, >= so sánh giá trị của cột với hằng số hoặc cột khác.\n2. Toán tử logic:\n   - AND: Cả hai điều kiện đều phải đạt TRUE.\n   - OR: Ít nhất một trong các điều kiện đạt TRUE.\n   - NOT: Đảo ngược giá trị logic.\n3. Độ ưu tiên toán tử: NOT ưu tiên cao nhất, tiếp theo là AND, cuối cùng là OR. BẮT BUỘC dùng dấu ngoặc đơn () khi kết hợp AND và OR để tránh sai lệch logic nghiệp vụ.'
    },
    syntax: `SELECT column1, column2
FROM table_name
WHERE (condition1 AND condition2)
   OR NOT (condition3);`,
    examples: [
      {
        title: {
          en: '1. Combining AND & OR with Explicit Parentheses',
          vi: '1. Kết Hợp AND & OR Với Dấu Ngoặc Đơn Rõ Ràng'
        },
        code: `SELECT name, department, salary, performance_score
FROM employees
WHERE (department = 'Engineering' OR department = 'Product')
  AND salary >= 70000;`,
        language: 'sql',
        explanation: {
          en: 'Finds staff in either Engineering or Product who simultaneously earn at least $70,000.',
          vi: 'Tìm nhân viên thuộc phòng Kỹ thuật hoặc Sản phẩm có mức lương từ 70.000$ trở lên.'
        }
      },
      {
        title: {
          en: '2. Negation Filtering with NOT',
          vi: '2. Lọc Phủ Định Với Toán Tử NOT'
        },
        code: `SELECT name, department, status
FROM employees
WHERE NOT (status = 'Terminated' OR status = 'OnLeave');`,
        language: 'sql',
        explanation: {
          en: 'Filters out any employees whose status is either Terminated or OnLeave.',
          vi: 'Lọc bỏ tất cả nhân viên có trạng thái Đã nghỉ việc hoặc Đang tạm nghỉ.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Omitting parentheses when combining AND with OR.',
          vi: 'Bỏ quên dấu ngoặc đơn khi kết hợp cả AND lẫn OR trong cùng một mệnh đề WHERE.'
        },
        correction: {
          en: 'Because AND takes precedence over OR, "dept = \'Sales\' OR dept = \'IT\' AND salary > 5000" means "dept = \'Sales\' OR (dept = \'IT\' AND salary > 5000)". Use explicit parentheses.',
          vi: 'Vì AND có độ ưu tiên cao hơn OR, câu lệnh sẽ tự hiểu là "dept = \'Sales\' OR (dept = \'IT\' AND salary > 5000)". Hãy luôn dùng ngoặc đơn rõ ràng.'
        },
        code: `-- INCORRECT LOGIC:
-- WHERE department = 'Engineering' OR department = 'Design' AND salary > 80000
-- CORRECT LOGIC:
WHERE (department = 'Engineering' OR department = 'Design') AND salary > 80000`
      },
      {
        mistake: {
          en: 'Using = for multiple values instead of OR.',
          vi: 'Dùng dấu = với nhiều giá trị cùng lúc thay vì tách ra bằng OR.'
        },
        correction: {
          en: 'In SQL, you cannot write "WHERE dept = \'Sales\' OR \'Marketing\'". You must write "WHERE dept = \'Sales\' OR dept = \'Marketing\'".',
          vi: 'Trong SQL, không thể viết "WHERE dept = \'Sales\' OR \'Marketing\'". Bạn phải viết rõ "WHERE dept = \'Sales\' OR dept = \'Marketing\'".'
        }
      }
    ],
    tips: [
      {
        en: 'Both != and <> represent the inequality operator in standard SQL; <> is the strictly compliant ANSI standard.',
        vi: 'Cả != và <> đều biểu diễn toán tử không bằng (khác) trong SQL; <> là cú pháp chuẩn ANSI nghiêm ngặt.'
      },
      {
        en: 'Rows evaluate to TRUE to be returned. If a condition evaluates to FALSE or UNKNOWN, it is discarded by WHERE.',
        vi: 'Chỉ những hàng đánh giá ra TRUE mới được trả về. Nếu điều kiện ra FALSE hoặc UNKNOWN, dòng đó sẽ bị WHERE loại bỏ.'
      }
    ],
    practiceStarterCode: `-- Filter employees with salary between 50000 and 100000 in Engineering
SELECT name, department, salary FROM employees WHERE department = 'Engineering' AND salary >= 50000 AND salary <= 100000;`
  },
  exercisePool: [
    {
      id: 'sql_ex_where_1',
      type: 'fix_code',
      title: {
        en: 'Enforce Operator Precedence',
        vi: 'Khắc Phục Độ Ưu Tiên Toán Tử'
      },
      instruction: {
        en: 'Fix the query using parentheses so that employees in either \'IT\' or \'Finance\' who have a salary greater than 60000 are selected.',
        vi: 'Sửa câu truy vấn bằng cách thêm ngoặc đơn để lấy các nhân viên thuộc \'IT\' hoặc \'Finance\' có mức lương lớn hơn 60000.'
      },
      starterCode: `SELECT name, department, salary
FROM employees
WHERE department = 'IT' OR department = 'Finance' AND salary > 60000;`,
      solutionCode: `SELECT name, department, salary
FROM employees
WHERE (department = 'IT' OR department = 'Finance') AND salary > 60000;`,
      hint: {
        en: 'Wrap the OR condition inside parentheses.',
        vi: 'Bọc điều kiện OR bên trong cặp dấu ngoặc đơn.'
      },
      explanation: {
        en: 'Parentheses force the OR expression to evaluate first before the AND condition.',
        vi: 'Dấu ngoặc đơn bắt buộc điều kiện OR được đánh giá trước điều kiện AND.'
      }
    },
    {
      id: 'sql_ex_where_2',
      type: 'complete_code',
      title: {
        en: 'Filter Inactive Staff',
        vi: 'Lọc Nhân Viên Ngừng Hoạt Động'
      },
      instruction: {
        en: 'Select name, department, and status for employees whose status is NOT equal to \'Active\'.',
        vi: 'Chọn name, department và status cho các nhân viên có status KHÔNG BẰNG \'Active\'.'
      },
      starterCode: `SELECT name, department, status
FROM employees
WHERE status ___ 'Active';`,
      solutionCode: `SELECT name, department, status
FROM employees
WHERE status != 'Active';`,
      hint: {
        en: 'Use != or <> as the inequality operator.',
        vi: 'Sử dụng != hoặc <> làm toán tử so sánh khác.'
      },
      explanation: {
        en: 'The != or <> operator filters for rows where the status differs from Active.',
        vi: 'Toán tử != hoặc <> lọc các hàng có giá trị status khác với Active.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_where_ops',
    title: {
      en: 'Targeted High-Earner Department Audit',
      vi: 'Kiểm Tra Nhân Sự Thu Nhập Cao Theo Phòng Ban'
    },
    description: {
      en: 'Write a SQL query that retrieves name, department, salary, and role from the employees table for employees who work in either \'Engineering\' or \'Analytics\', earn a salary strictly greater than 75000, and do NOT have the role of \'Intern\'.',
      vi: 'Viết câu truy vấn SQL lấy các cột name, department, salary và role từ bảng employees cho những nhân viên làm việc tại \'Engineering\' hoặc \'Analytics\', có mức lương lớn hơn 75000, và KHÔNG mang vai trò \'Intern\'.'
    },
    requirements: [
      { en: '1. Filter department = \'Engineering\' OR department = \'Analytics\' using parentheses', vi: '1. Lọc phòng ban \'Engineering\' hoặc \'Analytics\' có dùng ngoặc đơn' },
      { en: '2. Enforce salary > 75000', vi: '2. Yêu cầu salary > 75000' },
      { en: '3. Enforce role != \'Intern\' (or NOT role = \'Intern\')', vi: '3. Yêu cầu role != \'Intern\'' }
    ],
    starterCode: `-- Write your high-earner department query
SELECT name, department, salary, role FROM employees;`,
    solutionCode: `SELECT name, department, salary, role
FROM employees
WHERE (department = 'Engineering' OR department = 'Analytics')
  AND salary > 75000
  AND role != 'Intern';`,
    hints: [
      {
        en: 'Combine (department = \'Engineering\' OR department = \'Analytics\') AND salary > 75000 AND role != \'Intern\'.',
        vi: 'Kết hợp (department = \'Engineering\' OR department = \'Analytics\') AND salary > 75000 AND role != \'Intern\'.'
      }
    ],
    solutionExplanation: {
      en: 'Parenthesizing the department alternatives ensures that the salary and role conditions apply universally to both departments.',
      vi: 'Đóng ngoặc cho các phòng ban đảm bảo rằng điều kiện về mức lương và vai trò được áp dụng đồng thời cho cả hai phòng ban.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_where_1',
      type: 'single_choice',
      question: {
        en: 'What is the default evaluation precedence among SQL logical operators without parentheses?',
        vi: 'Thứ tự ưu tiên mặc định giữa các toán tử logic trong SQL khi không có dấu ngoặc đơn là gì?'
      },
      options: [
        { en: 'NOT -> AND -> OR', vi: 'NOT -> AND -> OR' },
        { en: 'OR -> AND -> NOT', vi: 'OR -> AND -> NOT' },
        { en: 'AND -> OR -> NOT', vi: 'AND -> OR -> NOT' },
        { en: 'Left to right strictly without priority', vi: 'Từ trái qua phải và không có ưu tiên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In SQL logical evaluation, NOT is evaluated first, then AND, and lastly OR.',
        vi: 'Trong đánh giá logic của SQL, toán tử NOT được ưu tiên cao nhất, tiếp theo là AND, và cuối cùng là OR.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_where_2',
      type: 'single_choice',
      question: {
        en: 'Which of the following is ANSI-standard for the "NOT EQUAL TO" comparison operator?',
        vi: 'Ký hiệu nào sau đây là chuẩn ANSI cho toán tử so sánh "KHÔNG BẰNG" (khác)?'
      },
      options: [
        { en: '<>', vi: '<>' },
        { en: '!==', vi: '!==' },
        { en: 'NOT =', vi: 'NOT =' },
        { en: '><', vi: '><' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<> is the official ANSI standard SQL inequality operator, though almost all modern engines also support !=.',
        vi: '<> là toán tử so sánh khác chính thức theo chuẩn ANSI SQL, mặc dù hầu hết các hệ quản trị hiện nay đều hỗ trợ thêm !=.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_where_3',
      type: 'predict_output',
      question: {
        en: 'How will the condition "WHERE A OR B AND C" be parsed by SQL?',
        vi: 'Biểu thức điều kiện "WHERE A OR B AND C" sẽ được SQL phân tích như thế nào?'
      },
      options: [
        { en: 'WHERE A OR (B AND C)', vi: 'WHERE A OR (B AND C)' },
        { en: 'WHERE (A OR B) AND C', vi: 'WHERE (A OR B) AND C' },
        { en: 'WHERE (A AND B) OR C', vi: 'WHERE (A AND B) OR C' },
        { en: 'Syntax Error', vi: 'Lỗi cú pháp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because AND has higher precedence than OR, SQL automatically groups B AND C together.',
        vi: 'Vì AND có độ ưu tiên cao hơn OR, SQL sẽ tự động nhóm B AND C lại trước.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_where_4',
      type: 'true_false',
      question: {
        en: 'The WHERE clause can filter on aggregate functions like COUNT() or AVG() directly.',
        vi: 'Mệnh đề WHERE có thể lọc trực tiếp trên các hàm tổng hợp như COUNT() hoặc AVG().'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. The WHERE clause filters individual rows before aggregation occurs. To filter aggregated results, you must use the HAVING clause.',
        vi: 'Sai. Mệnh đề WHERE lọc từng dòng trước khi việc tổng hợp dữ liệu diễn ra. Để lọc trên kết quả tổng hợp, bạn phải dùng mệnh đề HAVING.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_where_5',
      type: 'single_choice',
      question: {
        en: 'What result is produced if a row evaluates to UNKNOWN in the WHERE clause?',
        vi: 'Kết quả sẽ ra sao nếu một dòng được đánh giá là UNKNOWN trong mệnh đề WHERE?'
      },
      options: [
        { en: 'The row is discarded and excluded from the result set', vi: 'Dòng đó bị loại bỏ và không được đưa vào kết quả' },
        { en: 'The database halts with a fatal runtime error', vi: 'CSDL dừng hoạt động với lỗi nghiêm trọng' },
        { en: 'The row is automatically converted to NULL and included', vi: 'Dòng đó tự động chuyển thành NULL và được giữ lại' },
        { en: 'The database prompts the user for manual confirmation', vi: 'CSDL yêu cầu người dùng xác nhận thủ công' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The WHERE clause requires predicates to evaluate strictly to TRUE. Any row evaluating to FALSE or UNKNOWN is discarded.',
        vi: 'Mệnh đề WHERE yêu cầu điều kiện phải đúng tuyệt đối (TRUE). Bất kỳ dòng nào cho kết quả FALSE hoặc UNKNOWN đều bị loại.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_where_6',
      type: 'single_choice',
      question: {
        en: 'Which query correctly finds employees who do NOT work in the \'Sales\' department?',
        vi: 'Câu truy vấn nào tìm đúng các nhân viên KHÔNG làm việc tại phòng \'Sales\'?'
      },
      options: [
        { en: 'SELECT * FROM employees WHERE department <> \'Sales\';', vi: 'SELECT * FROM employees WHERE department <> \'Sales\';' },
        { en: 'SELECT * FROM employees WHERE department NOT \'Sales\';', vi: 'SELECT * FROM employees WHERE department NOT \'Sales\';' },
        { en: 'SELECT * FROM employees WHERE NOT department = = \'Sales\';', vi: 'SELECT * FROM employees WHERE NOT department = = \'Sales\';' },
        { en: 'SELECT * FROM employees WHERE department IS NOT \'Sales\';', vi: 'SELECT * FROM employees WHERE department IS NOT \'Sales\';' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<> (or !=) correctly checks for inequality against string literals.',
        vi: '<> (hoặc !=) kiểm tra sự khác nhau giữa cột và chuỗi hằng số một cách chính xác.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_where_7',
      type: 'true_false',
      question: {
        en: 'Writing "WHERE salary >= 50000 AND salary <= 100000" includes both 50000 and 100000 in the result.',
        vi: 'Viết "WHERE salary >= 50000 AND salary <= 100000" bao gồm cả hai mốc giá trị 50000 và 100000 trong kết quả.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. The >= and <= operators are inclusive.',
        vi: 'Đúng. Các toán tử >= và <= bao gồm cả 2 mốc giá trị đầu cuối.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_where_8',
      type: 'single_choice',
      question: {
        en: 'How do you check if a boolean flag column is_active is true in SQL?',
        vi: 'Làm thế nào để kiểm tra cột cờ boolean is_active có giá trị true trong SQL?'
      },
      options: [
        { en: 'WHERE is_active = 1 (or WHERE is_active = TRUE in Postgres/MySQL)', vi: 'WHERE is_active = 1 (hoặc WHERE is_active = TRUE trong Postgres/MySQL)' },
        { en: 'WHERE is_active IS 1', vi: 'WHERE is_active IS 1' },
        { en: 'WHERE is_active EQUALS TRUE', vi: 'WHERE is_active EQUALS TRUE' },
        { en: 'WHERE is_active -> TRUE', vi: 'WHERE is_active -> TRUE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In SQLite, booleans are represented as integer 1 and 0. In ANSI SQL / Postgres, boolean TRUE/FALSE is standard with =.',
        vi: 'Trong SQLite, boolean biểu diễn bằng 1 và 0. Trong ANSI SQL / Postgres, giá trị boolean TRUE/FALSE dùng với toán tử =.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_where_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following expressions are functionally equivalent to NOT (A AND B)? (De Morgan’s Laws)',
        vi: 'Biểu thức nào sau đây tương đương về mặt logic với NOT (A AND B)? (Định luật De Morgan)'
      },
      options: [
        { en: '(NOT A) OR (NOT B)', vi: '(NOT A) OR (NOT B)' },
        { en: 'NOT A AND NOT B', vi: 'NOT A AND NOT B' },
        { en: 'A OR B', vi: 'A OR B' },
        { en: 'NOT (A OR B)', vi: 'NOT (A OR B)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'According to De Morgan’s Laws, NOT (A AND B) is logically equivalent to (NOT A) OR (NOT B).',
        vi: 'Theo định luật De Morgan trong logic học, NOT (A AND B) tương đương với (NOT A) OR (NOT B).'
      },
      topicId: 'sql_where_operators',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_where_10',
      type: 'single_choice',
      question: {
        en: 'What is the performance implication of placing non-selective conditions first in an AND chain in modern query optimizers?',
        vi: 'Ảnh hưởng hiệu năng của việc xếp các điều kiện ít chọn lọc lên trước trong chuỗi AND đối với các bộ tối ưu truy vấn hiện đại là gì?'
      },
      options: [
        { en: 'Modern cost-based optimizers (CBO) reorder commutative AND predicates automatically based on table statistics and index availability', vi: 'Bộ tối ưu hóa dựa trên chi phí (CBO) hiện đại sẽ tự động sắp xếp lại các điều kiện AND dựa trên thống kê dữ liệu và chỉ mục sẵn có' },
        { en: 'The database crashes immediately', vi: 'CSDL bị sập ngay lập tức' },
        { en: 'The query is rejected with error 404', vi: 'Truy vấn bị từ chối với lỗi 404' },
        { en: 'It forces a full database restart', vi: 'Nó bắt buộc toàn bộ CSDL phải khởi động lại' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Modern RDBMS query planners use table statistics to evaluate the most selective conditions and index lookups first, regardless of lexical written order in WHERE.',
        vi: 'Các bộ tối ưu truy vấn RDBMS hiện đại sử dụng số liệu thống kê để ưu tiên lọc các điều kiện có độ chọn lọc cao nhất và tận dụng chỉ mục trước, bất kể thứ tự bạn viết trong WHERE.'
      },
      topicId: 'sql_where_operators',
      difficulty: 'hard'
    }
  ]
};

export default lesson03;
