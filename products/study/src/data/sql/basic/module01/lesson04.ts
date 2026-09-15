import { Lesson } from '../../../../types';

export const lesson04: Lesson = {
  id: 'sql_lesson_4',
  moduleId: 'sql_mod_1',
  levelId: 'basic',
  courseId: 'sql',
  order: 4,
  topicId: 'sql_pattern_matching',
  title: {
    en: 'Pattern Matching: LIKE, ILIKE, IN & BETWEEN',
    vi: 'Tìm Kiếm Theo Mẫu: LIKE, ILIKE, IN & BETWEEN'
  },
  summary: {
    en: 'Master wildcard string pattern matching using LIKE (% and _), case-insensitive matching (ILIKE / LOWER), discrete membership checking with IN, and continuous interval filtering with BETWEEN.',
    vi: 'Làm chủ tìm kiếm chuỗi ký tự đại diện với LIKE (% và _), tìm kiếm không phân biệt hoa thường (ILIKE / LOWER), kiểm tra tập phần tử với IN và lọc khoảng giá trị với BETWEEN.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Real-world data queries often require searching for text fragments, checking discrete membership sets, or filtering numerical and date ranges. SQL provides powerful operators: LIKE for pattern wildcards, IN for discrete sets, and BETWEEN for inclusive ranges.',
      vi: 'Các truy vấn thực tế thường đòi hỏi tìm kiếm các đoạn văn bản mẫu, kiểm tra sự tồn tại trong danh sách hoặc lọc các khoảng ngày tháng/số liệu. SQL cung cấp các toán tử mạnh mẽ: LIKE cho tìm kiếm mẫu đại diện, IN cho tập hợp rời rạc và BETWEEN cho khoảng giá trị liên tục.'
    },
    conceptExplanation: {
      en: 'Pattern Matching & Set Filtering Tools:\n1. LIKE Wildcards:\n   - % matches zero, one, or multiple characters (e.g. \'Tech%\' matches \'Tech\', \'Technology\').\n   - _ matches exactly ONE single character (e.g. \'D_n\' matches \'Dan\', \'Don\').\n2. Case Sensitivity:\n   - Standard ANSI SQL LIKE is case-sensitive in PostgreSQL and case-insensitive in SQLite/MySQL by default. In Postgres, use ILIKE for case-insensitive matching, or wrap columns in LOWER(col).\n3. IN & NOT IN: Tests if a column value exists within a comma-separated list of literals (e.g. status IN (\'Active\', \'Pending\')).\n4. BETWEEN low AND high: Evaluates whether a value falls within a range inclusively (equivalent to col >= low AND col <= high).',
      vi: 'Các công cụ tìm kiếm mẫu và lọc tập hợp:\n1. Ký tự đại diện LIKE:\n   - % khớp với 0, 1 hoặc nhiều ký tự bất kỳ (ví dụ: \'Tech%\' khớp với \'Tech\', \'Technology\').\n   - _ khớp với ĐÚNG 1 ký tự đơn lẻ (ví dụ: \'D_n\' khớp với \'Dan\', \'Don\').\n2. Phân biệt hoa thường:\n   - Chuẩn ANSI SQL LIKE phân biệt hoa thường trong Postgres và không phân biệt trong SQLite/MySQL mặc định. Trong Postgres dùng ILIKE hoặc bọc hàm LOWER(col).\n3. IN & NOT IN: Kiểm tra xem giá trị cột có thuộc danh sách liệt kê hay không (ví dụ: status IN (\'Active\', \'Pending\')).\n4. BETWEEN min AND max: Lọc giá trị nằm trong khoảng bao gồm cả 2 đầu mút (tương đương col >= min AND col <= max).'
    },
    syntax: `SELECT column1, column2
FROM table_name
WHERE column_name LIKE 'prefix%suffix'
  AND category IN ('Hardware', 'Software', 'Cloud')
  AND price BETWEEN 100 AND 500;`,
    examples: [
      {
        title: {
          en: '1. Wildcard Matching and Discrete Set Filtering',
          vi: '1. Khớp Ký Tự Đại Diện và Lọc Tập Phần Tử'
        },
        code: `SELECT name, email, department, salary
FROM employees
WHERE email LIKE '%@techcorp.com'
  AND department IN ('Engineering', 'Data', 'Security');`,
        language: 'sql',
        explanation: {
          en: 'Finds staff whose email ends with @techcorp.com and who belong to the specified high-tech departments.',
          vi: 'Tìm nhân viên có email kết thúc bằng @techcorp.com và thuộc các phòng ban công nghệ được chỉ định.'
        }
      },
      {
        title: {
          en: '2. Date and Numeric Filtering with BETWEEN',
          vi: '2. Lọc Ngày Tháng và Số Liệu Bằng BETWEEN'
        },
        code: `SELECT id, product_name, price, stock_quantity
FROM products
WHERE price BETWEEN 25.00 AND 150.00
  AND product_name LIKE '_00%';`,
  language: 'sql',
  explanation: {
    en: 'Retrieves products priced between $25 and $150 whose product names have any single character followed by 00.',
    vi: 'Lấy sản phẩm có giá từ 25$ đến 150$ với tên sản phẩm có ký tự thứ hai và thứ ba là 00.'
  }
}
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using = with wildcards like WHERE name = \'J%\'.',
          vi: 'Dùng dấu = với ký tự đại diện như WHERE name = \'J%\'.'
        },
        correction: {
          en: 'The = operator performs literal exact matching; it does not treat % as a wildcard. You must use the LIKE operator.',
          vi: 'Toán tử = chỉ so sánh chuỗi chính xác tuyệt đối; nó coi % là ký tự thường chứ không phải ký tự đại diện. Bắt buộc phải dùng LIKE.'
        }
      },
      {
        mistake: {
          en: 'Reversing the order of arguments in BETWEEN (e.g. BETWEEN 100 AND 20).',
          vi: 'Đảo ngược thứ tự số trong BETWEEN (ví dụ: BETWEEN 100 AND 20).'
        },
        correction: {
          en: 'BETWEEN requires the lower bound first, followed by AND, then the upper bound (BETWEEN 20 AND 100). Reversing it returns 0 rows.',
          vi: 'BETWEEN yêu cầu giá trị nhỏ đứng trước và giá trị lớn đứng sau (BETWEEN 20 AND 100). Viết ngược sẽ luôn trả về 0 dòng.'
        }
      }
    ],
    tips: [
      {
        en: 'Leading wildcards (e.g. LIKE \'%search\') prevent B-Tree indexes from being used, triggering full table scans. Prefer prefix searches (LIKE \'search%\') when performance is critical.',
        vi: 'Ký tự đại diện ở đầu chuỗi (ví dụ: LIKE \'%search\') khiến CSDL không thể dùng chỉ mục B-Tree, dẫn đến quét toàn bảng (full table scan). Hãy ưu tiên tìm kiếm tiền tố (LIKE \'search%\').'
      },
      {
        en: 'To escape literal % or _ characters inside LIKE patterns, use the ESCAPE keyword (e.g. LIKE \'100\\%\' ESCAPE \'\\\').',
        vi: 'Để tìm kiếm chính xác ký tự % hoặc _ trong chuỗi, sử dụng từ khóa ESCAPE (ví dụ: LIKE \'100\\%\' ESCAPE \'\\\').'
      }
    ],
    practiceStarterCode: `-- Find all employees with email ending in '@company.com' and salary between 60000 and 90000
SELECT name, email, salary FROM employees WHERE email LIKE '%@company.com' AND salary BETWEEN 60000 AND 90000;`
  },
  exercisePool: [
    {
      id: 'sql_ex_pattern_1',
      type: 'complete_code',
      title: {
        en: 'Filter by Email Domain and Department',
        vi: 'Lọc Theo Tên Miền Email và Phòng Ban'
      },
      instruction: {
        en: 'Write a query to select name, email, and department for employees whose email ends with \'%@gmail.com\' and department is either \'Sales\' or \'Marketing\'.',
        vi: 'Viết câu truy vấn lấy name, email và department cho nhân viên có email kết thúc bằng \'%@gmail.com\' và phòng ban là \'Sales\' hoặc \'Marketing\'.'
      },
      starterCode: `SELECT name, email, department
FROM employees
WHERE email LIKE '%@gmail.com'
  AND department ___ ('Sales', 'Marketing');`,
      solutionCode: `SELECT name, email, department
FROM employees
WHERE email LIKE '%@gmail.com'
  AND department IN ('Sales', 'Marketing');`,
      hint: {
        en: 'Use the IN operator for the department list.',
        vi: 'Dùng toán tử IN cho danh sách các phòng ban.'
      },
      explanation: {
        en: 'The IN operator checks if a column value matches any item in the provided list.',
        vi: 'Toán tử IN kiểm tra xem giá trị của cột có thuộc danh sách liệt kê hay không.'
      }
    },
    {
      id: 'sql_ex_pattern_2',
      type: 'complete_code',
      title: {
        en: 'Range Filter with BETWEEN',
        vi: 'Lọc Khoảng Với BETWEEN'
      },
      instruction: {
        en: 'Select name and salary from employees where salary is between 50000 and 80000 inclusive.',
        vi: 'Chọn name và salary từ bảng employees có mức lương trong khoảng từ 50000 đến 80000 bao gồm cả hai mốc.'
      },
      starterCode: `SELECT name, salary
FROM employees
WHERE salary ___ 50000 AND 80000;`,
      solutionCode: `SELECT name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 80000;`,
      hint: {
        en: 'Fill in the BETWEEN keyword.',
        vi: 'Điền từ khóa BETWEEN.'
      },
      explanation: {
        en: 'BETWEEN val1 AND val2 filters values within an inclusive range.',
        vi: 'BETWEEN val1 AND val2 lọc các giá trị trong khoảng đóng bao gồm cả 2 đầu mút.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_pattern_matching',
    title: {
      en: 'Enterprise Identity & Salary Band Scanner',
      vi: 'Truy Vấn Danh Tính & Thang Bậc Lương Doanh Nghiệp'
    },
    description: {
      en: 'Write a SQL query that retrieves id, name, email, department, and salary from the employees table. Filter for employees whose name starts with \'D\' or \'M\', whose department is in (\'Engineering\', \'Design\', \'Marketing\'), and whose salary is in the range between 55000 and 95000 inclusive.',
      vi: 'Viết câu truy vấn SQL lấy id, name, email, department và salary từ bảng employees. Lọc các nhân viên có tên bắt đầu bằng chữ \'D\' hoặc \'M\', phòng ban thuộc (\'Engineering\', \'Design\', \'Marketing\'), và mức lương nằm trong khoảng từ 55000 đến 95000.'
    },
    requirements: [
      { en: '1. Match (name LIKE \'D%\' OR name LIKE \'M%\')', vi: '1. Khớp (name LIKE \'D%\' OR name LIKE \'M%\')' },
      { en: '2. Enforce department IN (\'Engineering\', \'Design\', \'Marketing\')', vi: '2. Yêu cầu department IN (\'Engineering\', \'Design\', \'Marketing\')' },
      { en: '3. Enforce salary BETWEEN 55000 AND 95000', vi: '3. Yêu cầu salary BETWEEN 55000 AND 95000' }
    ],
    starterCode: `-- Write your comprehensive pattern and set filter query
SELECT id, name, email, department, salary FROM employees;`,
    solutionCode: `SELECT id, name, email, department, salary
FROM employees
WHERE (name LIKE 'D%' OR name LIKE 'M%')
  AND department IN ('Engineering', 'Design', 'Marketing')
  AND salary BETWEEN 55000 AND 95000;`,
    hints: [
      {
        en: 'Combine (name LIKE \'D%\' OR name LIKE \'M%\') with the IN and BETWEEN clauses using AND.',
        vi: 'Kết hợp (name LIKE \'D%\' OR name LIKE \'M%\') với các mệnh đề IN và BETWEEN bằng từ khóa AND.'
      }
    ],
    solutionExplanation: {
      en: 'This query combines prefix pattern matching with parentheses, set membership testing with IN, and boundary range filtering with BETWEEN.',
      vi: 'Câu truy vấn này kết hợp khớp tiền tố với dấu ngoặc đơn, kiểm tra tập hợp với IN và lọc biên với BETWEEN.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_pat_1',
      type: 'single_choice',
      question: {
        en: 'What does the % wildcard represent in a SQL LIKE pattern?',
        vi: 'Ký tự đại diện % đại diện cho điều gì trong mẫu tìm kiếm LIKE của SQL?'
      },
      options: [
        { en: 'Zero, one, or multiple arbitrary characters', vi: 'Không, một hoặc nhiều ký tự bất kỳ' },
        { en: 'Exactly one single character', vi: 'Đúng duy nhất một ký tự' },
        { en: 'Only numeric digits', vi: 'Chỉ các chữ số' },
        { en: 'A percentage arithmetic calculation', vi: 'Một phép tính phần trăm' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '% matches any sequence of zero or more characters.',
        vi: '% khớp với bất kỳ chuỗi nào gồm 0, 1 hoặc nhiều ký tự.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_pat_2',
      type: 'single_choice',
      question: {
        en: 'What does the underscore (_) wildcard represent in a SQL LIKE pattern?',
        vi: 'Ký tự gạch dưới (_) đại diện cho điều gì trong mẫu tìm kiếm LIKE của SQL?'
      },
      options: [
        { en: 'Exactly one single character', vi: 'Đúng duy nhất một ký tự' },
        { en: 'Zero or more characters', vi: 'Không hoặc nhiều ký tự' },
        { en: 'Space characters only', vi: 'Chỉ các ký tự khoảng trắng' },
        { en: 'Underscore literal symbol', vi: 'Ký hiệu gạch dưới hằng số' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The underscore _ wildcard represents exactly one single character at that position.',
        vi: 'Ký tự gạch dưới _ đại diện cho chính xác 1 ký tự đơn lẻ tại vị trí đó.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_pat_3',
      type: 'predict_output',
      question: {
        en: 'Which of the following values will match the pattern LIKE \'_a%t\'?',
        vi: 'Giá trị nào sau đây sẽ khớp với mẫu LIKE \'_a%t\'?'
      },
      options: [
        { en: '\'cat\' and \'fast\'', vi: '\'cat\' và \'fast\'' },
        { en: '\'act\'', vi: '\'act\'' },
        { en: '\'artifact\'', vi: '\'artifact\'' },
        { en: '\'at\'', vi: '\'at\'' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '\'_a%t\' requires at least one char before \'a\', followed by any characters, ending in \'t\'. \'cat\' (c-a-t) and \'fast\' (f-a-s-t) both match.',
        vi: '\'_a%t\' yêu cầu đúng 1 ký tự đứng trước \'a\', theo sau là các ký tự tùy ý và kết thúc bằng \'t\'. Cả \'cat\' và \'fast\' đều khớp.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_pat_4',
      type: 'true_false',
      question: {
        en: 'The BETWEEN operator in SQL is inclusive of both boundary values (e.g. BETWEEN 10 AND 20 includes 10 and 20).',
        vi: 'Toán tử BETWEEN trong SQL bao gồm cả 2 giá trị biên (ví dụ: BETWEEN 10 AND 20 bao gồm cả 10 và 20).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. In SQL, x BETWEEN a AND b is defined as x >= a AND x <= b.',
        vi: 'Đúng. Trong SQL, x BETWEEN a AND b được định nghĩa tương đương với x >= a AND x <= b.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_pat_5',
      type: 'single_choice',
      question: {
        en: 'Which SQL dialect natively features the ILIKE operator for case-insensitive pattern matching?',
        vi: 'Hệ quản trị CSDL nào cung cấp sẵn toán tử ILIKE để tìm kiếm mẫu không phân biệt chữ hoa chữ thường?'
      },
      options: [
        { en: 'PostgreSQL', vi: 'PostgreSQL' },
        { en: 'SQLite', vi: 'SQLite' },
        { en: 'Microsoft SQL Server', vi: 'Microsoft SQL Server' },
        { en: 'Oracle Database', vi: 'Oracle Database' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PostgreSQL has the built-in ILIKE operator for case-insensitive regex/wildcard matching.',
        vi: 'PostgreSQL cung cấp toán tử tích hợp sẵn ILIKE để so khớp mẫu không phân biệt hoa thường.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_pat_6',
      type: 'single_choice',
      question: {
        en: 'How can you perform case-insensitive pattern matching portably across all SQL dialects?',
        vi: 'Làm thế nào để tìm kiếm mẫu không phân biệt chữ hoa thường một cách tương thích trên mọi hệ CSDL SQL?'
      },
      options: [
        { en: 'WHERE LOWER(column_name) LIKE LOWER(\'pattern%\')', vi: 'WHERE LOWER(column_name) LIKE LOWER(\'pattern%\')' },
        { en: 'WHERE column_name IGNORE_CASE \'pattern%\'', vi: 'WHERE column_name IGNORE_CASE \'pattern%\'' },
        { en: 'WHERE column_name == \'pattern%\'', vi: 'WHERE column_name == \'pattern%\'' },
        { en: 'WHERE column_name ~* \'pattern%\'', vi: 'WHERE column_name ~* \'pattern%\'' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Wrapping both the column and the pattern in LOWER() (or UPPER()) is portable across all ANSI SQL engines.',
        vi: 'Bọc cả tên cột lẫn chuỗi mẫu bằng hàm LOWER() (hoặc UPPER()) là cách tiếp cận tương thích trên mọi hệ CSDL ANSI SQL.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_pat_7',
      type: 'single_choice',
      question: {
        en: 'What is the danger of writing: WHERE column_name NOT IN (1, 2, NULL)?',
        vi: 'Nguy cơ tiềm ẩn khi viết: WHERE column_name NOT IN (1, 2, NULL) là gì?'
      },
      options: [
        { en: 'Because comparing against NULL yields UNKNOWN, the entire NOT IN expression evaluates to UNKNOWN for all rows, returning 0 rows', vi: 'Vì so sánh với NULL trả về UNKNOWN, toàn bộ biểu thức NOT IN sẽ ra UNKNOWN cho mọi dòng, dẫn đến việc trả về 0 dòng kết quả' },
        { en: 'The database deletes the NULL rows', vi: 'CSDL xóa các dòng chứa NULL' },
        { en: 'It converts numbers 1 and 2 to NULL', vi: 'Nó chuyển các số 1 và 2 thành NULL' },
        { en: 'It causes an immediate memory overflow', vi: 'Nó gây tràn bộ nhớ RAM ngay lập tức' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In SQL three-valued logic, x NOT IN (..., NULL) evaluates to UNKNOWN whenever x is not in the set, discarding all rows.',
        vi: 'Trong logic tam trị của SQL, x NOT IN (..., NULL) luôn đánh giá ra UNKNOWN cho mọi dòng không khớp, khiến 100% bản ghi bị loại bỏ.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_pat_8',
      type: 'true_false',
      question: {
        en: 'The expression "WHERE id IN (10, 20, 30)" is functionally equivalent to "WHERE id = 10 OR id = 20 OR id = 30".',
        vi: 'Biểu thức "WHERE id IN (10, 20, 30)" tương đương hoàn toàn về mặt logic với "WHERE id = 10 OR id = 20 OR id = 30".'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. IN (list) is shorthand syntax for a chain of OR equality comparisons.',
        vi: 'Đúng. Toán tử IN (danh sách) là cú pháp rút gọn cho chuỗi so sánh bằng nối tiếp bởi OR.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_pat_9',
      type: 'single_choice',
      question: {
        en: 'Why do leading wildcards like WHERE name LIKE \'%son\' cause query performance degradation?',
        vi: 'Tại sao việc đặt ký tự đại diện ở đầu như WHERE name LIKE \'%son\' lại làm suy giảm hiệu năng truy vấn?'
      },
      options: [
        { en: 'The B-Tree index is sorted left-to-right from the prefix; a leading % makes index seek impossible, forcing a full table scan', vi: 'Chỉ mục B-Tree được sắp xếp từ trái qua phải theo tiền tố; việc đặt % ở đầu khiến CSDL không thể tìm nhanh qua chỉ mục mà phải quét toàn bộ bảng' },
        { en: 'The query engine deletes the index permanently', vi: 'Bộ máy truy vấn tự động xóa luôn chỉ mục' },
        { en: 'LIKE is not supported by hardware CPUs', vi: 'LIKE không được vi xử lý phần cứng hỗ trợ' },
        { en: 'It limits the table to 10 rows maximum', vi: 'Nó giới hạn bảng chỉ còn tối đa 10 dòng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Standard B-Tree indexes require known prefixes to perform index seeks. Leading wildcards prevent index lookups.',
        vi: 'Chỉ mục B-Tree tiêu chuẩn yêu cầu biết trước tiền tố để tìm kiếm nhanh. Ký tự đại diện ở đầu buộc CSDL phải quét toàn bộ bảng.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_pat_10',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid wildcard pattern operations in SQL? (Select all that apply)',
        vi: 'Những phép toán mẫu ký tự đại diện nào sau đây là hợp lệ trong SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'LIKE \'A%\' (Starts with A)', vi: 'LIKE \'A%\' (Bắt đầu bằng chữ A)' },
        { en: 'LIKE \'%Z\' (Ends with Z)', vi: 'LIKE \'%Z\' (Kết thúc bằng chữ Z)' },
        { en: 'LIKE \'%data%\' (Contains \'data\')', vi: 'LIKE \'%data%\' (Chứa từ \'data\')' },
        { en: 'LIKE \'___-\' (Exactly 3 characters followed by a hyphen)', vi: 'LIKE \'___-\' (Đúng 3 ký tự theo sau bởi dấu gạch nối)' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All four options are standard, valid SQL pattern combinations using % and _ wildcards.',
        vi: 'Cả bốn tùy chọn đều là các cách kết hợp ký tự đại diện % và _ hoàn toàn hợp lệ trong SQL.'
      },
      topicId: 'sql_pattern_matching',
      difficulty: 'medium'
    }
  ]
};

export default lesson04;
