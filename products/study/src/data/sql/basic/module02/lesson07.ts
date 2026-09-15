import { Lesson } from '../../../../types';

export const lesson07: Lesson = {
  id: 'sql_lesson_7',
  moduleId: 'sql_mod_2',
  levelId: 'basic',
  courseId: 'sql',
  order: 7,
  topicId: 'sql_string_functions',
  title: {
    en: 'String Functions & Text Manipulation',
    vi: 'Hàm Xử Lý Chuỗi & Thao Tác Văn Bản'
  },
  summary: {
    en: 'Master scalar text transformations using UPPER, LOWER, LENGTH, SUBSTR/SUBSTRING, TRIM, string concatenation (|| and CONCAT), and REPLACE.',
    vi: 'Làm chủ chuyển đổi văn bản với UPPER, LOWER, LENGTH, SUBSTR/SUBSTRING, TRIM, toán tử nối chuỗi (|| và CONCAT) cùng hàm REPLACE.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Real-world data ingested into relational databases is frequently unstructured, inconsistent in casing, or laden with extraneous whitespace. SQL provides an extensive suite of built-in scalar string functions to normalize, cleanse, format, and parse text attributes on the fly.',
      vi: 'Dữ liệu thực tế khi nạp vào CSDL quan hệ thường chưa chuẩn hóa, lộn xộn chữ hoa chữ thường hoặc chứa khoảng trắng thừa. SQL cung cấp bộ hàm chuỗi vô hướng phong phú để chuẩn hóa, làm sạch, định dạng và trích xuất các thuộc tính văn bản trực tiếp trong câu truy vấn.'
    },
    conceptExplanation: {
      en: 'Essential SQL String Functions:\n1. Casing & Length: UPPER(str), LOWER(str), and LENGTH(str) (or LEN in T-SQL) normalize case and measure character counts.\n2. Whitespace Trimming: TRIM(str), LTRIM(str), RTRIM(str) strip leading and trailing whitespace characters.\n3. String Concatenation: ANSI SQL / SQLite / PostgreSQL uses the double pipe operator (str1 || \' \' || str2). MySQL and SQL Server support CONCAT(str1, str2, ...).\n4. Substrings & Slicing: SUBSTR(str, start_pos, length) extracts sub-segments (Note: SQL strings are 1-indexed, starting at position 1, not 0).\n5. Replacement & Searching: REPLACE(str, \'old\', \'new\') swaps matching tokens, while INSTR(str, substr) / POSITION(substr IN str) finds character offsets.',
      vi: 'Các hàm chuỗi thiết yếu trong SQL:\n1. Chuyển đổi chữ hoa/thường & Độ dài: UPPER(str), LOWER(str) và LENGTH(str) (hoặc LEN trong T-SQL) chuẩn hóa chữ hoa thường và đo độ dài chuỗi.\n2. Cắt khoảng trắng: TRIM(str), LTRIM(str), RTRIM(str) loại bỏ khoảng trắng thừa ở hai đầu, bên trái hoặc bên phải.\n3. Nối chuỗi (Concatenation): Chuẩn ANSI SQL / SQLite / PostgreSQL dùng toán tử hai gạch đứng (str1 || \' \' || str2). MySQL và SQL Server hỗ trợ hàm CONCAT(str1, str2, ...).\n4. Cắt chuỗi con (Substring): SUBSTR(str, vị_trí_bắt_đầu, độ_dài) trích xuất chuỗi con (Lưu ý: Chỉ số chuỗi trong SQL bắt đầu từ 1, không phải 0).\n5. Thay thế & Tìm kiếm: REPLACE(str, \'cũ\', \'mới\') thay thế từ khóa, còn INSTR(str, substr) / POSITION(substr IN str) tìm vị trí xuất hiện của chuỗi con.'
    },
    syntax: `SELECT UPPER(first_name) AS upper_first,
       LOWER(email) AS clean_email,
       TRIM(department) AS trimmed_dept,
       first_name || ' ' || last_name AS full_name,
       SUBSTR(phone_number, 1, 3) AS area_code,
       REPLACE(title, 'Junior', 'Associate') AS standardized_title
FROM employees;`,
    examples: [
      {
        title: {
          en: '1. Standardizing Names and Emails with Concatenation',
          vi: '1. Chuẩn Hóa Họ Tên và Email Bằng Phép Nối Chuỗi'
        },
        code: `SELECT id,
       UPPER(first_name) || ' ' || UPPER(last_name) AS formal_name,
       LOWER(TRIM(email)) AS normalized_email,
       LENGTH(first_name) AS name_char_count
FROM employees;`,
        language: 'sql',
        explanation: {
          en: 'Creates a capitalized full name using the || concatenation operator, trims whitespace, and converts email to lowercase.',
          vi: 'Tạo họ tên viết hoa hoàn chỉnh bằng toán tử nối chuỗi ||, cắt khoảng trắng thừa và chuyển email về chữ thường.'
        }
      },
      {
        title: {
          en: '2. Substring Parsing and Token Replacement',
          vi: '2. Cắt Chuỗi Con và Thay Thế Ký Tự'
        },
        code: `SELECT product_code,
       SUBSTR(product_code, 1, 3) AS category_prefix,
       REPLACE(product_code, '-', '_') AS sanitized_code
FROM products;`,
        language: 'sql',
        explanation: {
          en: 'Extracts the initial 3-character category prefix and replaces dashes with underscores.',
          vi: 'Trích xuất 3 ký tự tiền tố thể hiện danh mục và thay thế dấu gạch ngang bằng dấu gạch dưới.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Assuming string indexes start at 0 as in Python or JavaScript.',
          vi: 'Cho rằng chỉ số vị trí chuỗi bắt đầu từ 0 như trong Python hay JavaScript.'
        },
        correction: {
          en: 'In standard SQL, string positions are 1-indexed. The first character of a string is always position 1.',
          vi: 'Trong SQL chuẩn, chỉ mục chuỗi bắt đầu từ số 1. Ký tự đầu tiên của chuỗi luôn ở vị trí 1.'
        },
        code: `-- SUBSTR('Database', 1, 4) yields 'Data'
-- SUBSTR('Database', 0, 4) is non-standard and varies by dialect`
      },
      {
        mistake: {
          en: 'Concatenating with NULL producing unexpected NULL outputs.',
          vi: 'Nối chuỗi với một giá trị NULL dẫn đến toàn bộ kết quả biến thành NULL.'
        },
        correction: {
          en: 'In standard SQL, \'Hello \' || NULL yields NULL. Use COALESCE(middle_name, \'\') to prevent NULL poisoning during concatenation.',
          vi: 'Trong SQL chuẩn, \'Hello \' || NULL sẽ ra NULL. Hãy dùng COALESCE(middle_name, \'\') để thay thế NULL bằng chuỗi rỗng trước khi nối.'
        }
      }
    ],
    tips: [
      {
        en: 'The double-pipe operator || is ANSI-standard for concatenation in SQLite, PostgreSQL, and Oracle.',
        vi: 'Toán tử hai gạch đứng || là chuẩn ANSI để nối chuỗi trong SQLite, PostgreSQL và Oracle.'
      },
      {
        en: 'Scalar functions inside the WHERE clause (e.g. WHERE UPPER(name) = \'ALICE\') can invalidate standard index seeks unless an expression index is created.',
        vi: 'Dùng hàm biến đổi trong WHERE (như WHERE UPPER(name) = \'ALICE\') có thể làm vô hiệu hóa chỉ mục thông thường trừ khi có functional/expression index.'
      }
    ],
    practiceStarterCode: `-- Practice string normalization
SELECT UPPER(name) AS upper_name, LENGTH(name) AS len_name, REPLACE(department, 'Dept', 'Department') AS clean_dept FROM employees;`
  },
  exercisePool: [
    {
      id: 'sql_ex_str_1',
      type: 'complete_code',
      title: {
        en: 'Generate Formatted Full Name',
        vi: 'Tạo Họ Tên Định Dạng Đầy Đủ'
      },
      instruction: {
        en: 'Write a query to concatenate first_name, a space \' \', and last_name with alias full_name from employees.',
        vi: 'Viết câu truy vấn nối first_name, khoảng trắng \' \' và last_name với bí danh full_name từ bảng employees.'
      },
      starterCode: `SELECT first_name || ' ' ___ last_name AS full_name
FROM employees;`,
      solutionCode: `SELECT first_name || ' ' || last_name AS full_name
FROM employees;`,
      hint: {
        en: 'Use the || concatenation operator.',
        vi: 'Sử dụng toán tử nối chuỗi ||.'
      },
      explanation: {
        en: 'The || operator chains strings together in SQL.',
        vi: 'Toán tử || ghép nối các chuỗi lại với nhau trong SQL.'
      }
    },
    {
      id: 'sql_ex_str_2',
      type: 'complete_code',
      title: {
        en: 'Extract Area Code Prefix',
        vi: 'Trích Xuất Mã Vùng Tiền Tố'
      },
      instruction: {
        en: 'Extract the first 3 characters of the phone column using SUBSTR with alias area_code from customers.',
        vi: 'Trích xuất 3 ký tự đầu tiên của cột phone bằng hàm SUBSTR với bí danh area_code từ bảng customers.'
      },
      starterCode: `SELECT name, SUBSTR(phone, 1, ___) AS area_code
FROM customers;`,
      solutionCode: `SELECT name, SUBSTR(phone, 1, 3) AS area_code
FROM customers;`,
      hint: {
        en: 'The length parameter is 3.',
        vi: 'Tham số độ dài là 3.'
      },
      explanation: {
        en: 'SUBSTR(phone, 1, 3) extracts 3 characters starting from index position 1.',
        vi: 'SUBSTR(phone, 1, 3) lấy 3 ký tự bắt đầu từ vị trí thứ 1.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_string_functions',
    title: {
      en: 'Enterprise Directory Text Cleansing Pipeline',
      vi: 'Quy Trình Làm Sạch Dữ Liệu Danh Bạ Doanh Nghiệp'
    },
    description: {
      en: 'Write a SQL query that retrieves cleaned directory records from the employees table. Construct full_name as UPPER(first_name) || \' \' || UPPER(last_name), normalized_email as LOWER(TRIM(email)), domain as SUBSTR(email, INSTR(email, \'@\') + 1, 50), and department_label as REPLACE(department, \'Tech\', \'Technology\').',
      vi: 'Viết câu truy vấn SQL trích xuất danh bạ đã làm sạch từ bảng employees. Tạo full_name là UPPER(first_name) || \' \' || UPPER(last_name), normalized_email là LOWER(TRIM(email)), domain là SUBSTR(email, INSTR(email, \'@\') + 1, 50), và department_label là REPLACE(department, \'Tech\', \'Technology\').'
    },
    requirements: [
      { en: '1. UPPER(first_name) || \' \' || UPPER(last_name) AS full_name', vi: '1. UPPER(first_name) || \' \' || UPPER(last_name) AS full_name' },
      { en: '2. LOWER(TRIM(email)) AS normalized_email', vi: '2. LOWER(TRIM(email)) AS normalized_email' },
      { en: '3. REPLACE(department, \'Tech\', \'Technology\') AS department_label', vi: '3. REPLACE(department, \'Tech\', \'Technology\') AS department_label' }
    ],
    starterCode: `-- Write your text cleansing query
SELECT id FROM employees;`,
    solutionCode: `SELECT id,
       UPPER(first_name) || ' ' || UPPER(last_name) AS full_name,
       LOWER(TRIM(email)) AS normalized_email,
       REPLACE(department, 'Tech', 'Technology') AS department_label
FROM employees;`,
    hints: [
      {
        en: 'Combine UPPER, LOWER, TRIM, ||, and REPLACE in the projection list.',
        vi: 'Kết hợp các hàm UPPER, LOWER, TRIM, || và REPLACE trong danh sách các cột sau SELECT.'
      }
    ],
    solutionExplanation: {
      en: 'Demonstrates end-to-end scalar string cleansing: uppercase normalization, whitespace trimming, lowercase casting, concatenation, and substring token replacement.',
      vi: 'Minh họa quy trình làm sạch văn bản toàn diện: viết hoa chuẩn mực, cắt khoảng trắng, chuyển chữ thường, nối chuỗi và thay thế từ khóa.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_str_1',
      type: 'single_choice',
      question: {
        en: 'In standard SQL, at what index position do string characters start?',
        vi: 'Trong chuẩn SQL, chỉ số vị trí các ký tự trong chuỗi bắt đầu từ số mấy?'
      },
      options: [
        { en: '1 (1-indexed)', vi: '1 (Bắt đầu từ 1)' },
        { en: '0 (0-indexed)', vi: '0 (Bắt đầu từ 0)' },
        { en: '-1', vi: '-1' },
        { en: 'It depends on hardware bitness', vi: 'Tùy thuộc vào kiến trúc phần cứng máy tính' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In SQL standards, strings and arrays are 1-indexed. The first character is at position 1.',
        vi: 'Trong chuẩn SQL, chuỗi ký tự được đánh chỉ số từ 1. Ký tự đầu tiên nằm ở vị trí 1.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_str_2',
      type: 'predict_output',
      question: {
        en: 'What is the output of the query: SELECT SUBSTR(\'SQL_ANALYTICS\', 5, 8) AS result;',
        vi: 'Kết quả của câu truy vấn: SELECT SUBSTR(\'SQL_ANALYTICS\', 5, 8) AS result; là gì?'
      },
      options: [
        { en: '\'ANALYTIC\'', vi: '\'ANALYTIC\'' },
        { en: '\'ANALYTICS\'', vi: '\'ANALYTICS\'' },
        { en: '\'SQL_ANAL\'', vi: '\'SQL_ANAL\'' },
        { en: '\'_ANALYTI\'', vi: '\'_ANALYTI\'' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Starting at character index 5 (\'A\') and taking 8 characters produces \'ANALYTIC\'.',
        vi: 'Bắt đầu từ vị trí thứ 5 (\'A\') và lấy độ dài 8 ký tự cho ra chuỗi \'ANALYTIC\'.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_str_3',
      type: 'single_choice',
      question: {
        en: 'What is the standard ANSI SQL string concatenation operator supported in SQLite and PostgreSQL?',
        vi: 'Toán tử nối chuỗi chuẩn ANSI SQL được hỗ trợ trong SQLite và PostgreSQL là gì?'
      },
      options: [
        { en: '|| (Double pipe)', vi: '|| (Hai dấu gạch đứng)' },
        { en: '+ (Plus)', vi: '+ (Dấu cộng)' },
        { en: '& (Ampersand)', vi: '& (Dấu và)' },
        { en: '.. (Double dot)', vi: '.. (Hai dấu chấm)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The double pipe || is the ANSI standard string concatenation operator.',
        vi: 'Toán tử hai gạch đứng || là toán tử nối chuỗi theo chuẩn ANSI.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_str_4',
      type: 'predict_output',
      question: {
        en: 'What is the result of "\'Hello \' || NULL" in standard SQL?',
        vi: 'Kết quả của biểu thức "\'Hello \' || NULL" trong chuẩn SQL là gì?'
      },
      options: [
        { en: 'NULL', vi: 'NULL' },
        { en: '\'Hello \'', vi: '\'Hello \'' },
        { en: '\'Hello NULL\'', vi: '\'Hello NULL\'' },
        { en: 'Error: Type mismatch', vi: 'Lỗi: Không khớp kiểu' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In SQL, concatenating any string with NULL produces NULL (NULL poisoning). Use COALESCE(nullable_col, \'\') to prevent this.',
        vi: 'Trong SQL, nối chuỗi với NULL sẽ luôn cho kết quả là NULL. Dùng COALESCE(nullable_col, \'\') để khắc phục.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_str_5',
      type: 'single_choice',
      question: {
        en: 'Which function removes leading and trailing whitespace from a text string?',
        vi: 'Hàm nào loại bỏ khoảng trắng thừa ở cả đầu và cuối của một chuỗi văn bản?'
      },
      options: [
        { en: 'TRIM()', vi: 'TRIM()' },
        { en: 'CLEAN()', vi: 'CLEAN()' },
        { en: 'STRIP()', vi: 'STRIP()' },
        { en: 'CHOP()', vi: 'CHOP()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'TRIM(string) removes whitespace from both ends of the string.',
        vi: 'Hàm TRIM(string) loại bỏ khoảng trắng ở cả hai đầu chuỗi.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_str_6',
      type: 'predict_output',
      question: {
        en: 'What is the output of "SELECT REPLACE(\'2026-08-30\', \'-\', \'/\');"?',
        vi: 'Kết quả của lệnh "SELECT REPLACE(\'2026-08-30\', \'-\', \'/\');" là gì?'
      },
      options: [
        { en: '\'2026/08/30\'', vi: '\'2026/08/30\'' },
        { en: '\'2026-08/30\'', vi: '\'2026-08/30\'' },
        { en: '\'20260830\'', vi: '\'20260830\'' },
        { en: 'NULL', vi: 'NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'REPLACE substitutes every occurrence of the second argument with the third argument.',
        vi: 'Hàm REPLACE thay thế toàn bộ các lần xuất hiện của đối số thứ hai bằng đối số thứ ba.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_str_7',
      type: 'single_choice',
      question: {
        en: 'What function returns the number of characters in a string in standard SQL?',
        vi: 'Hàm nào trả về số lượng ký tự trong một chuỗi trong chuẩn SQL?'
      },
      options: [
        { en: 'LENGTH() (or CHAR_LENGTH())', vi: 'LENGTH() (hoặc CHAR_LENGTH())' },
        { en: 'COUNT()', vi: 'COUNT()' },
        { en: 'SIZE()', vi: 'SIZE()' },
        { en: 'CHARCOUNT()', vi: 'CHARCOUNT()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LENGTH() / CHAR_LENGTH() returns the character count of a string expression.',
        vi: 'LENGTH() / CHAR_LENGTH() trả về số lượng ký tự của một chuỗi.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_str_8',
      type: 'true_false',
      question: {
        en: 'Applying LOWER(column) inside a WHERE clause without an expression index can prevent the database optimizer from using a standard B-Tree index on that column.',
        vi: 'Áp dụng LOWER(cột) bên trong mệnh đề WHERE mà không có expression index có thể làm vô hiệu hóa chỉ mục B-Tree tiêu chuẩn trên cột đó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Wrapping indexed columns in functions breaks SARGability (Search Argument Ability), forcing full table scans.',
        vi: 'Đúng. Bọc các cột có chỉ mục vào hàm làm mất tính SARGability, buộc CSDL phải quét toàn bộ bảng.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_str_9',
      type: 'single_choice',
      question: {
        en: 'Which function in SQLite / PostgreSQL returns the 1-based position of a substring within a parent string?',
        vi: 'Hàm nào trong SQLite / PostgreSQL trả về vị trí (bắt đầu từ 1) của một chuỗi con trong chuỗi cha?'
      },
      options: [
        { en: 'INSTR(string, substring) in SQLite / POSITION(substring IN string) in Postgres', vi: 'INSTR(string, substring) trong SQLite / POSITION(substring IN string) trong Postgres' },
        { en: 'FIND_INDEX()', vi: 'FIND_INDEX()' },
        { en: 'INDEX_OF()', vi: 'INDEX_OF()' },
        { en: 'SEARCH_POS()', vi: 'SEARCH_POS()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SQLite provides INSTR(haystack, needle), while PostgreSQL and standard ANSI SQL use POSITION(needle IN haystack).',
        vi: 'SQLite dùng INSTR(haystack, needle), còn PostgreSQL và chuẩn ANSI SQL dùng POSITION(needle IN haystack).'
      },
      topicId: 'sql_string_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_str_10',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid scalar string functions supported in modern SQL dialects? (Select all that apply)',
        vi: 'Những hàm chuỗi vô hướng nào sau đây được hỗ trợ trong các hệ CSDL SQL hiện đại? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'UPPER() and LOWER()', vi: 'UPPER() và LOWER()' },
        { en: 'TRIM(), LTRIM(), and RTRIM()', vi: 'TRIM(), LTRIM() và RTRIM()' },
        { en: 'SUBSTR() / SUBSTRING()', vi: 'SUBSTR() / SUBSTRING()' },
        { en: 'REPLACE()', vi: 'REPLACE()' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All listed functions are standard scalar string functions available across major relational database systems.',
        vi: 'Tất cả các hàm trên đều là hàm chuỗi vô hướng tiêu chuẩn có mặt trên hầu hết các hệ quản trị CSDL quan hệ.'
      },
      topicId: 'sql_string_functions',
      difficulty: 'easy'
    }
  ]
};

export default lesson07;
