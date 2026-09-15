import { Lesson } from '../../../../types';

export const lesson05: Lesson = {
  id: 'sql_lesson_5',
  moduleId: 'sql_mod_1',
  levelId: 'basic',
  courseId: 'sql',
  order: 5,
  topicId: 'sql_null_logic',
  title: {
    en: 'Three-Valued Logic & NULL: IS NULL / IS NOT NULL',
    vi: 'Logic Tam Trị & NULL: IS NULL / IS NOT NULL'
  },
  summary: {
    en: 'Master SQL Three-Valued Logic (TRUE, FALSE, UNKNOWN), IS NULL / IS NOT NULL predicate testing, NULL arithmetic propagation, and avoiding the NOT IN NULL pitfall.',
    vi: 'Làm chủ Logic Tam Trị trong SQL (TRUE, FALSE, UNKNOWN), kiểm tra điều kiện IS NULL / IS NOT NULL, sự lan truyền của NULL trong phép toán và tránh bẫy NOT IN chứa NULL.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'In relational databases, NULL represents missing, unrecorded, or inapplicable data. Unlike languages where null is a specific object or falsy value, SQL implements Edgar F. Codd’s Three-Valued Logic (3VL), where truth values can be TRUE, FALSE, or UNKNOWN.',
      vi: 'Trong CSDL quan hệ, NULL biểu thị dữ liệu bị thiếu, chưa được ghi nhận hoặc không áp dụng. Khác với các ngôn ngữ lập trình nơi null là đối tượng hoặc giá trị mang tính phủ định, SQL áp dụng Logic Tam Trị (3VL) của Edgar F. Codd với ba trạng thái: TRUE, FALSE và UNKNOWN.'
    },
    conceptExplanation: {
      en: 'Core Rules of Three-Valued Logic & NULL:\n1. Unknown Equality: You cannot test equality with "= NULL" or "!= NULL" because comparing an unknown value to anything yields UNKNOWN. You MUST use IS NULL or IS NOT NULL.\n2. Arithmetic Propagation: Any standard arithmetic operation with NULL produces NULL (e.g. 100 + NULL = NULL, 50 * NULL = NULL).\n3. WHERE Acceptance: The WHERE clause only accepts rows where the condition evaluates strictly to TRUE. Both FALSE and UNKNOWN rows are excluded.\n4. Logical Connectives with UNKNOWN:\n   - TRUE AND UNKNOWN = UNKNOWN\n   - FALSE AND UNKNOWN = FALSE\n   - TRUE OR UNKNOWN = TRUE\n   - NOT UNKNOWN = UNKNOWN',
      vi: 'Các quy tắc cốt lõi của Logic Tam Trị & NULL:\n1. Phép so sánh chưa biết: Không thể so sánh bằng "= NULL" hoặc "!= NULL" vì so sánh với một giá trị chưa biết sẽ luôn ra UNKNOWN. Bạn BẮT BUỘC phải dùng IS NULL hoặc IS NOT NULL.\n2. Sự lan truyền trong tính toán: Mọi phép toán số học với NULL đều cho kết quả là NULL (ví dụ: 100 + NULL = NULL, 50 * NULL = NULL).\n3. Cơ chế lọc của WHERE: Mệnh đề WHERE chỉ chấp nhận những dòng có kết quả tuyệt đối là TRUE. Các dòng ra FALSE và UNKNOWN đều bị loại bỏ.\n4. Bảng chân trị với UNKNOWN:\n   - TRUE AND UNKNOWN = UNKNOWN\n   - FALSE AND UNKNOWN = FALSE\n   - TRUE OR UNKNOWN = TRUE\n   - NOT UNKNOWN = UNKNOWN'
    },
    syntax: `SELECT column1, column2
FROM table_name
WHERE column_name IS NULL
   OR other_column IS NOT NULL;`,
    examples: [
      {
        title: {
          en: '1. Checking for Missing Data with IS NULL',
          vi: '1. Kiểm Tra Dữ Liệu Còn Thiếu Với IS NULL'
        },
        code: `SELECT id, name, department, phone_number
FROM employees
WHERE phone_number IS NULL;`,
        language: 'sql',
        explanation: {
          en: 'Retrieves all employees who have not registered a phone number in the system.',
          vi: 'Lấy tất cả nhân viên chưa đăng ký số điện thoại trong hệ thống.'
        }
      },
      {
        title: {
          en: '2. Filtering Active Records with IS NOT NULL',
          vi: '2. Lọc Các Bản Ghi Hợp Lệ Với IS NOT NULL'
        },
        code: `SELECT id, name, department, termination_date
FROM employees
WHERE termination_date IS NULL
  AND email IS NOT NULL;`,
        language: 'sql',
        explanation: {
          en: 'Finds currently active employees (no termination date) who possess a valid verified email address.',
          vi: 'Tìm các nhân viên đang làm việc (chưa có ngày nghỉ việc) và đã có địa chỉ email hợp lệ.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Writing WHERE column = NULL instead of WHERE column IS NULL.',
          vi: 'Viết WHERE column = NULL thay vì WHERE column IS NULL.'
        },
        correction: {
          en: 'In SQL, "= NULL" evaluates to UNKNOWN for every single row, causing the query to return zero results. Always use IS NULL.',
          vi: 'Trong SQL, "= NULL" đánh giá ra UNKNOWN cho mọi bản ghi, khiến câu truy vấn trả về 0 kết quả. Luôn luôn dùng IS NULL.'
        },
        code: `-- INCORRECT:
-- SELECT * FROM employees WHERE email = NULL;
-- CORRECT:
SELECT * FROM employees WHERE email IS NULL;`
      },
      {
        mistake: {
          en: 'Assuming NULL = NULL is TRUE.',
          vi: 'Nghĩ rằng phép so sánh NULL = NULL sẽ trả về TRUE.'
        },
        correction: {
          en: 'Two NULL values represent two unknown quantities; they are not equal to each other. NULL = NULL evaluates to UNKNOWN.',
          vi: 'Hai giá trị NULL đại diện cho hai đại lượng chưa biết; chúng không thể bằng nhau. NULL = NULL đánh giá ra UNKNOWN.'
        }
      }
    ],
    tips: [
      {
        en: 'Aggregate functions like SUM(), AVG(), MIN(), MAX(), and COUNT(column) ignore NULL values automatically. Only COUNT(*) counts all rows including NULLs.',
        vi: 'Các hàm tổng hợp như SUM(), AVG(), MIN(), MAX() và COUNT(tên_cột) tự động bỏ qua các giá trị NULL. Chỉ có COUNT(*) mới đếm tất cả các hàng bao gồm cả NULL.'
      },
      {
        en: 'In SQL:2023 and PostgreSQL/SQLite, the expression "column IS DISTINCT FROM value" safely treats NULL as a comparable value.',
        vi: 'Trong chuẩn SQL:2023 cũng như PostgreSQL/SQLite, biểu thức "column IS DISTINCT FROM value" xem NULL như một giá trị có thể so sánh an toàn.'
      }
    ],
    practiceStarterCode: `-- Find all employees with missing commission_rate but active status
SELECT id, name, department FROM employees WHERE commission_pct IS NULL;`
  },
  exercisePool: [
    {
      id: 'sql_ex_null_1',
      type: 'fix_code',
      title: {
        en: 'Fix Equality Comparison with NULL',
        vi: 'Sửa Lỗi So Sánh Bằng Với NULL'
      },
      instruction: {
        en: 'Fix the query to retrieve employees who do not have an assigned manager (manager_id is NULL).',
        vi: 'Sửa câu truy vấn để lấy các nhân viên chưa có quản lý trực tiếp (manager_id là NULL).'
      },
      starterCode: `SELECT name, department
FROM employees
WHERE manager_id = NULL;`,
      solutionCode: `SELECT name, department
FROM employees
WHERE manager_id IS NULL;`,
      hint: {
        en: 'Replace = NULL with IS NULL.',
        vi: 'Thay = NULL bằng IS NULL.'
      },
      explanation: {
        en: 'In SQL, missing values must be checked using the IS NULL predicate, never with the equality = operator.',
        vi: 'Trong SQL, dữ liệu còn thiếu bắt buộc phải kiểm tra bằng vị từ IS NULL, không được dùng toán tử so sánh bằng =.'
      }
    },
    {
      id: 'sql_ex_null_2',
      type: 'complete_code',
      title: {
        en: 'Filter Verified Email Records',
        vi: 'Lọc Bản Ghi Đã Có Email'
      },
      instruction: {
        en: 'Select all columns for employees who have an email recorded (email is not null).',
        vi: 'Chọn tất cả các cột cho các nhân viên đã có thông tin email (email không rỗng).'
      },
      starterCode: `SELECT id, name, email
FROM employees
WHERE email ___ NULL;`,
      solutionCode: `SELECT id, name, email
FROM employees
WHERE email IS NOT NULL;`,
      hint: {
        en: 'Use IS NOT NULL.',
        vi: 'Sử dụng IS NOT NULL.'
      },
      explanation: {
        en: 'IS NOT NULL returns TRUE only for rows where the column contains a non-null value.',
        vi: 'IS NOT NULL chỉ trả về TRUE cho các dòng mà cột có chứa giá trị thực sự.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_null_logic',
    title: {
      en: 'Audit Unassigned and Incomplete Staff Profiles',
      vi: 'Kiểm Tra Hồ Sơ Nhân Sự Chưa Đầy Đủ'
    },
    description: {
      en: 'Write a SQL query that retrieves id, name, department, manager_id, and phone_number from the employees table. Select employees who either have no assigned manager (manager_id IS NULL) OR have no phone number (phone_number IS NULL), but ensure their department IS NOT NULL.',
      vi: 'Viết câu truy vấn SQL lấy id, name, department, manager_id và phone_number từ bảng employees. Lọc những nhân viên chưa có quản lý (manager_id IS NULL) HOẶC chưa có số điện thoại (phone_number IS NULL), nhưng đảm bảo rằng department của họ KHÔNG ĐƯỢC NULL.'
    },
    requirements: [
      { en: '1. Group (manager_id IS NULL OR phone_number IS NULL) with parentheses', vi: '1. Nhóm (manager_id IS NULL OR phone_number IS NULL) trong ngoặc đơn' },
      { en: '2. Enforce department IS NOT NULL with AND', vi: '2. Yêu cầu department IS NOT NULL kết hợp bằng AND' },
      { en: '3. Select id, name, department, manager_id, phone_number', vi: '3. Chọn các cột id, name, department, manager_id, phone_number' }
    ],
    starterCode: `-- Write your incomplete profile audit query
SELECT id, name, department, manager_id, phone_number FROM employees;`,
    solutionCode: `SELECT id, name, department, manager_id, phone_number
FROM employees
WHERE (manager_id IS NULL OR phone_number IS NULL)
  AND department IS NOT NULL;`,
    hints: [
      {
        en: 'Wrap the two IS NULL checks in parentheses and join with AND department IS NOT NULL.',
        vi: 'Bọc hai điều kiện IS NULL trong ngoặc đơn và nối với AND department IS NOT NULL.'
      }
    ],
    solutionExplanation: {
      en: 'Parenthesizing the missing profile attributes isolates the OR logic before applying the department validity requirement.',
      vi: 'Đặt ngoặc đơn cho các thuộc tính bị thiếu giúp tách biệt logic OR trước khi áp dụng điều kiện hợp lệ của phòng ban.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_null_1',
      type: 'single_choice',
      question: {
        en: 'What are the three truth values in SQL Three-Valued Logic (3VL)?',
        vi: 'Ba giá trị chân lý trong Logic Tam Trị (3VL) của SQL là gì?'
      },
      options: [
        { en: 'TRUE, FALSE, and UNKNOWN', vi: 'TRUE, FALSE và UNKNOWN' },
        { en: 'TRUE, FALSE, and NULL', vi: 'TRUE, FALSE và NULL' },
        { en: 'POSITIVE, NEGATIVE, and ZERO', vi: 'POSITIVE, NEGATIVE và ZERO' },
        { en: 'YES, NO, and MAYBE', vi: 'YES, NO và MAYBE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SQL logic consists of TRUE, FALSE, and UNKNOWN (which is the boolean result of operations involving NULL).',
        vi: 'Logic SQL gồm 3 giá trị: TRUE, FALSE và UNKNOWN (kết quả boolean của các phép tính chứa NULL).'
      },
      topicId: 'sql_null_logic',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_null_2',
      type: 'predict_output',
      question: {
        en: 'What does the SQL expression "NULL = NULL" evaluate to?',
        vi: 'Biểu thức SQL "NULL = NULL" sẽ cho kết quả là gì?'
      },
      options: [
        { en: 'UNKNOWN (not TRUE)', vi: 'UNKNOWN (không phải TRUE)' },
        { en: 'TRUE', vi: 'TRUE' },
        { en: 'FALSE', vi: 'FALSE' },
        { en: 'Error: Cannot compare', vi: 'Lỗi: Không thể so sánh' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because NULL represents unknown data, comparing two unknowns produces UNKNOWN.',
        vi: 'Vì NULL đại diện cho dữ liệu chưa biết, so sánh hai đại lượng chưa biết sẽ trả về UNKNOWN.'
      },
      topicId: 'sql_null_logic',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_null_3',
      type: 'single_choice',
      question: {
        en: 'What is the mathematical result of the expression "100 + NULL"?',
        vi: 'Kết quả của phép tính toán học "100 + NULL" trong SQL là gì?'
      },
      options: [
        { en: 'NULL', vi: 'NULL' },
        { en: '100', vi: '100' },
        { en: '0', vi: '0' },
        { en: 'Error', vi: 'Lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Any arithmetic operation involving NULL propagates to NULL.',
        vi: 'Mọi phép toán số học kết hợp với NULL đều cho kết quả là NULL.'
      },
      topicId: 'sql_null_logic',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_null_4',
      type: 'true_false',
      question: {
        en: 'To find rows where a column contains a missing value, you must write "WHERE column IS NULL" instead of "WHERE column = NULL".',
        vi: 'Để tìm các dòng mà một cột có giá trị bị thiếu, bạn bắt buộc phải viết "WHERE column IS NULL" thay vì "WHERE column = NULL".'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. IS NULL is the dedicated SQL predicate for testing missing values.',
        vi: 'Đúng. IS NULL là vị từ chuẩn mực trong SQL để kiểm tra dữ liệu bị thiếu.'
      },
      topicId: 'sql_null_logic',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_null_5',
      type: 'predict_output',
      question: {
        en: 'What is the boolean result of "TRUE OR UNKNOWN"?',
        vi: 'Kết quả boolean của biểu thức "TRUE OR UNKNOWN" là gì?'
      },
      options: [
        { en: 'TRUE', vi: 'TRUE' },
        { en: 'UNKNOWN', vi: 'UNKNOWN' },
        { en: 'FALSE', vi: 'FALSE' },
        { en: 'NULL', vi: 'NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In OR logic, if one operand is TRUE, the entire expression is TRUE regardless of the unknown operand.',
        vi: 'Trong logic OR, chỉ cần 1 vế là TRUE thì toàn bộ biểu thức chắc chắn là TRUE bất kể vế còn lại là gì.'
      },
      topicId: 'sql_null_logic',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_null_6',
      type: 'predict_output',
      question: {
        en: 'What is the boolean result of "FALSE AND UNKNOWN"?',
        vi: 'Kết quả boolean của biểu thức "FALSE AND UNKNOWN" là gì?'
      },
      options: [
        { en: 'FALSE', vi: 'FALSE' },
        { en: 'UNKNOWN', vi: 'UNKNOWN' },
        { en: 'TRUE', vi: 'TRUE' },
        { en: 'NULL', vi: 'NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In AND logic, if one operand is FALSE, the whole condition is FALSE regardless of the second operand.',
        vi: 'Trong logic AND, nếu 1 vế đã là FALSE thì toàn bộ biểu thức chắc chắn là FALSE.'
      },
      topicId: 'sql_null_logic',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_null_7',
      type: 'single_choice',
      question: {
        en: 'How does the COUNT(column_name) aggregate function handle NULL values?',
        vi: 'Hàm tổng hợp COUNT(tên_cột) xử lý các giá trị NULL như thế nào?'
      },
      options: [
        { en: 'It ignores NULL values and counts only rows where the column is NOT NULL', vi: 'Nó tự động bỏ qua các giá trị NULL và chỉ đếm những dòng có giá trị NOT NULL' },
        { en: 'It includes NULL values in the count', vi: 'Nó đếm cả các giá trị NULL' },
        { en: 'It throws a runtime error', vi: 'Nó báo lỗi thời gian chạy' },
        { en: 'It stops counting after the first NULL', vi: 'Nó dừng đếm ngay khi gặp NULL đầu tiên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'COUNT(column_name) counts only non-null values. In contrast, COUNT(*) counts all rows regardless of nullability.',
        vi: 'COUNT(tên_cột) chỉ đếm các giá trị không null. Ngược lại, COUNT(*) đếm toàn bộ số dòng bất kể có null hay không.'
      },
      topicId: 'sql_null_logic',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_null_8',
      type: 'true_false',
      question: {
        en: 'The expression "NOT (UNKNOWN)" evaluates to UNKNOWN.',
        vi: 'Biểu thức "NOT (UNKNOWN)" có kết quả là UNKNOWN.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Negating an unknown truth value remains unknown.',
        vi: 'Đúng. Phủ định của một giá trị chưa biết vẫn là chưa biết (UNKNOWN).'
      },
      topicId: 'sql_null_logic',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_null_9',
      type: 'single_choice',
      question: {
        en: 'What does the standard SQL operator "IS DISTINCT FROM" do when comparing two NULLs?',
        vi: 'Toán tử chuẩn SQL "IS DISTINCT FROM" xử lý như thế nào khi so sánh hai giá trị NULL?'
      },
      options: [
        { en: 'It evaluates to FALSE because both are NULL (they are not distinct)', vi: 'Nó trả về FALSE vì cả hai đều là NULL (chúng không phân biệt)' },
        { en: 'It evaluates to UNKNOWN', vi: 'Nó trả về UNKNOWN' },
        { en: 'It evaluates to TRUE', vi: 'Nó trả về TRUE' },
        { en: 'It throws a syntax error', vi: 'Nó báo lỗi cú pháp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'IS DISTINCT FROM is a null-safe inequality check. "NULL IS DISTINCT FROM NULL" evaluates to FALSE.',
        vi: 'IS DISTINCT FROM là phép kiểm tra khác nhau an toàn với NULL. "NULL IS DISTINCT FROM NULL" cho kết quả là FALSE.'
      },
      topicId: 'sql_null_logic',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_null_10',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following statements about NULL in SQL are TRUE? (Select all that apply)',
        vi: 'Những nhận định nào sau đây về NULL trong SQL là ĐÚNG? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'NULL is not equal to 0 or an empty string \'\'', vi: 'NULL không bằng số 0 hay chuỗi rỗng \'\'' },
        { en: 'WHERE predicates reject rows evaluating to UNKNOWN', vi: 'Mệnh đề WHERE loại bỏ các dòng có kết quả là UNKNOWN' },
        { en: 'IS NULL and IS NOT NULL are the standard ways to check for null values', vi: 'IS NULL và IS NOT NULL là cách chuẩn mực để kiểm tra giá trị null' },
        { en: 'NULL values are always ignored by COUNT(*)', vi: 'Giá trị NULL luôn bị COUNT(*) bỏ qua' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Statements 1, 2, and 3 are correct. Statement 4 is false because COUNT(*) counts all rows regardless of nulls.',
        vi: 'Các phát biểu 1, 2 và 3 đều đúng. Phát biểu 4 sai vì COUNT(*) đếm mọi dòng trong bảng.'
      },
      topicId: 'sql_null_logic',
      difficulty: 'hard'
    }
  ]
};

export default lesson05;
