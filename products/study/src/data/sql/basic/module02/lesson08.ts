import { Lesson } from '../../../../types';

export const lesson08: Lesson = {
  id: 'sql_lesson_8',
  moduleId: 'sql_mod_2',
  levelId: 'basic',
  courseId: 'sql',
  order: 8,
  topicId: 'sql_datetime_functions',
  title: {
    en: 'Date & Time Functions and Date Arithmetic',
    vi: 'Hàm Ngày Tháng & Phép Toán Thời Gian'
  },
  summary: {
    en: 'Master temporal data types (DATE, TIMESTAMP), fetching current system time, formatting dates with STRFTIME / EXTRACT, and performing date intervals and arithmetic.',
    vi: 'Làm chủ các kiểu dữ liệu thời gian (DATE, TIMESTAMP), lấy thời gian hệ thống hiện tại, định dạng ngày tháng bằng STRFTIME / EXTRACT và tính toán khoảng thời gian.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Almost all enterprise relational datasets track temporal events—order dates, user signups, transaction timestamps, and expiration deadlines. SQL provides specialized temporal types and arithmetic functions to calculate durations, extract calendar parts, and filter time ranges accurately.',
      vi: 'Hầu hết các tập dữ liệu doanh nghiệp đều theo dõi các sự kiện thời gian—ngày đặt hàng, thời điểm đăng ký, mốc thời gian giao dịch và hạn chót. SQL cung cấp các kiểu dữ liệu thời gian chuyên dụng và bộ hàm tính toán để xác định khoảng thời gian, trích xuất các thành phần lịch và lọc khoảng thời gian chính xác.'
    },
    conceptExplanation: {
      en: 'Core Temporal Principles in SQL:\n1. Temporal Types: DATE (YYYY-MM-DD), TIME (HH:MM:SS), DATETIME / TIMESTAMP (YYYY-MM-DD HH:MM:SS with optional time zone).\n2. Current Timestamp: ANSI SQL provides CURRENT_DATE and CURRENT_TIMESTAMP (or NOW() in PostgreSQL/MySQL, datetime(\'now\') in SQLite).\n3. Component Extraction: Use EXTRACT(YEAR FROM date_col) in ANSI/Postgres, or strftime(\'%Y\', date_col) in SQLite to isolate year, month, day, hour, or day of week.\n4. Date Arithmetic:\n   - SQLite: date(col, \'+7 days\'), date(col, \'-1 month\'), julianday(end) - julianday(start).\n   - Postgres: col + INTERVAL \'7 days\', AGE(end, start).\n   - MySQL: DATE_ADD(col, INTERVAL 7 DAY), DATEDIFF(end, start).',
      vi: 'Các nguyên lý thời gian cốt lõi trong SQL:\n1. Kiểu dữ liệu thời gian: DATE (YYYY-MM-DD), TIME (HH:MM:SS), DATETIME / TIMESTAMP (YYYY-MM-DD HH:MM:SS có thể kèm múi giờ).\n2. Thời gian hiện tại: Chuẩn ANSI SQL cung cấp CURRENT_DATE và CURRENT_TIMESTAMP (hoặc NOW() trong PostgreSQL/MySQL, datetime(\'now\') trong SQLite).\n3. Trích xuất thành phần: Dùng EXTRACT(YEAR FROM date_col) trong ANSI/Postgres hoặc strftime(\'%Y\', date_col) trong SQLite để tách riêng năm, tháng, ngày, giờ hoặc thứ trong tuần.\n4. Phép toán thời gian:\n   - SQLite: date(col, \'+7 days\'), date(col, \'-1 month\'), julianday(end) - julianday(start).\n   - Postgres: col + INTERVAL \'7 days\', AGE(end, start).\n   - MySQL: DATE_ADD(col, INTERVAL 7 DAY), DATEDIFF(end, start).'
    },
    syntax: `SELECT CURRENT_DATE AS today,
       CURRENT_TIMESTAMP AS now_ts,
       strftime('%Y', hire_date) AS hire_year,
       date(hire_date, '+30 days') AS probation_end
FROM employees;`,
    examples: [
      {
        title: {
          en: '1. Extracting Year, Month & Day Segments',
          vi: '1. Trích Xuất Các Thành Phần Năm, Tháng & Ngày'
        },
        code: `SELECT order_id,
       order_date,
       strftime('%Y', order_date) AS order_year,
       strftime('%m', order_date) AS order_month,
       strftime('%d', order_date) AS order_day
FROM orders;`,
        language: 'sql',
        explanation: {
          en: 'Extracts formatted calendar components from ISO-8601 date strings in SQLite.',
          vi: 'Trích xuất các thành phần ngày tháng theo chuẩn ISO-8601 trong SQLite.'
        }
      },
      {
        title: {
          en: '2. Calculating Tenure and Relative Durations',
          vi: '2. Tính Toán Thâm Niên và Thời Lượng Tương Đối'
        },
        code: `SELECT name,
       hire_date,
       date(hire_date, '+1 year') AS first_anniversary,
       CAST(julianday('now') - julianday(hire_date) AS INTEGER) AS days_employed
FROM employees;`,
        language: 'sql',
        explanation: {
          en: 'Adds 1 year to hire date to calculate the first anniversary and computes total days employed using Julian day differences.',
          vi: 'Cộng 1 năm vào ngày tuyển dụng để tính ngày kỷ niệm 1 năm và tính số ngày làm việc dựa trên chênh lệch ngày Julian.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Storing dates as unstructured localized strings (e.g. "08/30/2026" or "30-Aug-2026").',
          vi: 'Lưu trữ ngày tháng dưới dạng chuỗi địa phương không chuẩn hóa (ví dụ: "08/30/2026" hoặc "30-Aug-2026").'
        },
        correction: {
          en: 'Always store dates in ISO-8601 format (\'YYYY-MM-DD\' or \'YYYY-MM-DD HH:MM:SS\'). This ensures correct lexicographical ordering, index range scans, and compatibility with date functions.',
          vi: 'Luôn lưu trữ ngày tháng theo chuẩn ISO-8601 (\'YYYY-MM-DD\' hoặc \'YYYY-MM-DD HH:MM:SS\'). Điều này đảm bảo sắp xếp đúng thứ tự, quét chỉ mục nhanh và tương thích với mọi hàm thời gian.'
        }
      },
      {
        mistake: {
          en: 'Directly subtracting date strings like "order_date - hire_date" expecting integer days.',
          vi: 'Trừ trực tiếp hai chuỗi ngày tháng như "order_date - hire_date" và mong đợi ra số ngày.'
        },
        correction: {
          en: 'In SQL, subtracting raw date strings treats them as strings or numbers, producing nonsense. Use date difference functions (julianday() in SQLite, DATEDIFF() in MySQL, or - on DATE types in Postgres).',
          vi: 'Trong SQL, trừ trực tiếp chuỗi ngày sẽ bị ép kiểu sai lệch. Hãy dùng các hàm chuyên dụng (julianday() trong SQLite, DATEDIFF() trong MySQL hoặc toán tử trừ trên kiểu DATE trong Postgres).'
        }
      }
    ],
    tips: [
      {
        en: 'In SQLite, the STRFTIME format specifiers are: %Y (4-digit year), %m (month 01-12), %d (day 01-31), %H (hour 00-23), %M (minute 00-59), %S (seconds 00-59).',
        vi: 'Trong SQLite, các định dạng STRFTIME gồm: %Y (năm 4 chữ số), %m (tháng 01-12), %d (ngày 01-31), %H (giờ 00-23), %M (phút 00-59), %S (giây 00-59).'
      },
      {
        en: 'Temporal filters should compare against ISO strings (e.g. WHERE order_date >= \'2026-01-01\') to utilize B-Tree date indexes efficiently.',
        vi: 'Điều kiện lọc thời gian nên so sánh với chuỗi chuẩn ISO (ví dụ: WHERE order_date >= \'2026-01-01\') để tận dụng chỉ mục B-Tree hiệu quả.'
      }
    ],
    practiceStarterCode: `-- Query employees hired in or after 2024 and calculate their 90-day probation end date
SELECT name, hire_date, date(hire_date, '+90 days') AS probation_end FROM employees WHERE hire_date >= '2024-01-01';`
  },
  exercisePool: [
    {
      id: 'sql_ex_date_1',
      type: 'complete_code',
      title: {
        en: 'Extract Year of Registration',
        vi: 'Trích Xuất Năm Đăng Ký'
      },
      instruction: {
        en: 'Extract the 4-digit year from created_at using strftime(\'%Y\', created_at) with alias signup_year from users.',
        vi: 'Trích xuất năm 4 chữ số từ created_at bằng hàm strftime(\'%Y\', created_at) với bí danh signup_year từ bảng users.'
      },
      starterCode: `SELECT username, strftime('___', created_at) AS signup_year
FROM users;`,
      solutionCode: `SELECT username, strftime('%Y', created_at) AS signup_year
FROM users;`,
      hint: {
        en: 'Use %Y for a 4-digit year.',
        vi: 'Dùng %Y cho năm 4 chữ số.'
      },
      explanation: {
        en: 'strftime(\'%Y\', col) parses ISO dates and returns the 4-digit year string.',
        vi: 'strftime(\'%Y\', col) phân tích chuỗi ngày ISO và trả về năm 4 chữ số.'
      }
    },
    {
      id: 'sql_ex_date_2',
      type: 'complete_code',
      title: {
        en: 'Compute 30-Day Expiration Date',
        vi: 'Tính Ngày Hết Hạn Sau 30 Ngày'
      },
      instruction: {
        en: 'Calculate the expiration date 30 days after start_date using date(start_date, \'+30 days\') as expires_at.',
        vi: 'Tính ngày hết hạn sau 30 ngày kể từ start_date bằng date(start_date, \'+30 days\') với bí danh expires_at.'
      },
      starterCode: `SELECT subscription_id, date(start_date, '___') AS expires_at
FROM subscriptions;`,
      solutionCode: `SELECT subscription_id, date(start_date, '+30 days') AS expires_at
FROM subscriptions;`,
      hint: {
        en: 'Use \'+30 days\'.',
        vi: 'Dùng \'+30 days\'.'
      },
      explanation: {
        en: 'The SQLite date() modifier \'+30 days\' increments the date by 30 calendar days.',
        vi: 'Modifier \'+30 days\' trong hàm date() của SQLite cộng thêm 30 ngày theo lịch.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_datetime_functions',
    title: {
      en: 'Employee Anniversary & Milestone Audit',
      vi: 'Kiểm Tra Cột Mốc Kỷ Niệm & Thâm Niên Nhân Sự'
    },
    description: {
      en: 'Write a SQL query that retrieves id, name, hire_date from employees. Include hire_year formatted as strftime(\'%Y\', hire_date), five_year_anniversary computed as date(hire_date, \'+5 years\'), and filter for employees who were hired between \'2020-01-01\' and \'2025-12-31\'. Order the results by hire_date ASC.',
      vi: 'Viết câu truy vấn SQL lấy id, name, hire_date từ bảng employees. Bổ sung hire_year bằng strftime(\'%Y\', hire_date), kỷ niệm 5 năm five_year_anniversary bằng date(hire_date, \'+5 years\'), và lọc các nhân viên được tuyển dụng trong khoảng \'2020-01-01\' đến \'2025-12-31\'. Sắp xếp kết quả theo hire_date ASC.'
    },
    requirements: [
      { en: '1. strftime(\'%Y\', hire_date) AS hire_year', vi: '1. strftime(\'%Y\', hire_date) AS hire_year' },
      { en: '2. date(hire_date, \'+5 years\') AS five_year_anniversary', vi: '2. date(hire_date, \'+5 years\') AS five_year_anniversary' },
      { en: '3. Filter hire_date BETWEEN \'2020-01-01\' AND \'2025-12-31\'', vi: '3. Lọc hire_date BETWEEN \'2020-01-01\' AND \'2025-12-31\'' },
      { en: '4. ORDER BY hire_date ASC', vi: '4. Sắp xếp ORDER BY hire_date ASC' }
    ],
    starterCode: `-- Write your date milestone query
SELECT id, name, hire_date FROM employees;`,
    solutionCode: `SELECT id,
       name,
       hire_date,
       strftime('%Y', hire_date) AS hire_year,
       date(hire_date, '+5 years') AS five_year_anniversary
FROM employees
WHERE hire_date BETWEEN '2020-01-01' AND '2025-12-31'
ORDER BY hire_date ASC;`,
    hints: [
      {
        en: 'Use strftime for year formatting and date(hire_date, \'+5 years\') for the anniversary calculation.',
        vi: 'Dùng strftime để lấy năm và date(hire_date, \'+5 years\') để tính cột mốc 5 năm.'
      }
    ],
    solutionExplanation: {
      en: 'Applies real-world date extraction, interval arithmetic, boundary range filtering, and chronological ordering.',
      vi: 'Áp dụng trích xuất ngày tháng thực tế, tính toán khoảng thời gian, lọc khoảng biên và sắp xếp theo trình tự thời gian.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_date_1',
      type: 'single_choice',
      question: {
        en: 'What is the universally accepted ISO-8601 standard format for storing dates in SQL databases?',
        vi: 'Định dạng chuẩn ISO-8601 được chấp nhận toàn cầu để lưu trữ ngày tháng trong CSDL SQL là gì?'
      },
      options: [
        { en: 'YYYY-MM-DD (e.g. 2026-08-30)', vi: 'YYYY-MM-DD (ví dụ: 2026-08-30)' },
        { en: 'DD/MM/YYYY', vi: 'DD/MM/YYYY' },
        { en: 'MM-DD-YYYY', vi: 'MM-DD-YYYY' },
        { en: 'MONTH DD, YYYY', vi: 'MONTH DD, YYYY' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ISO-8601 format (YYYY-MM-DD) sorts lexicographically and avoids ambiguous regional day/month conflicts.',
        vi: 'Chuẩn ISO-8601 (YYYY-MM-DD) cho phép sắp xếp theo bảng chữ cái chính xác và loại bỏ sự nhầm lẫn giữa ngày và tháng theo khu vực.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_date_2',
      type: 'single_choice',
      question: {
        en: 'What standard SQL keyword returns the current system date without time?',
        vi: 'Từ khóa chuẩn SQL nào trả về ngày hệ thống hiện tại mà không kèm giờ?'
      },
      options: [
        { en: 'CURRENT_DATE', vi: 'CURRENT_DATE' },
        { en: 'TODAY()', vi: 'TODAY()' },
        { en: 'SYS_DATE()', vi: 'SYS_DATE()' },
        { en: 'GETDATE_ONLY()', vi: 'GETDATE_ONLY()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CURRENT_DATE is the ANSI SQL standard keyword for obtaining today\'s date.',
        vi: 'CURRENT_DATE là từ khóa chuẩn ANSI SQL để lấy ngày hôm nay.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_date_3',
      type: 'predict_output',
      question: {
        en: 'In SQLite, what does "SELECT strftime(\'%m\', \'2026-08-30\');" return?',
        vi: 'Trong SQLite, câu lệnh "SELECT strftime(\'%m\', \'2026-08-30\');" trả về kết quả gì?'
      },
      options: [
        { en: '\'08\'', vi: '\'08\'' },
        { en: '\'8\'', vi: '\'8\'' },
        { en: '\'August\'', vi: '\'August\'' },
        { en: '\'30\'', vi: '\'30\'' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The %m specifier returns the zero-padded 2-digit month string (\'08\').',
        vi: 'Định dạng %m trả về chuỗi 2 chữ số của tháng có đệm số 0 ở đầu (\'08\').'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_date_4',
      type: 'true_false',
      question: {
        en: 'In PostgreSQL and ANSI standard SQL, you can extract the year using EXTRACT(YEAR FROM order_date).',
        vi: 'Trong PostgreSQL và chuẩn ANSI SQL, bạn có thể trích xuất năm bằng cú pháp EXTRACT(YEAR FROM order_date).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. EXTRACT(field FROM source) is the ANSI standard function for temporal part extraction.',
        vi: 'Đúng. EXTRACT(field FROM source) là hàm chuẩn ANSI để trích xuất các thành phần thời gian.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_date_5',
      type: 'single_choice',
      question: {
        en: 'How do you add 7 days to a date column in SQLite?',
        vi: 'Làm thế nào để cộng thêm 7 ngày vào một cột ngày trong SQLite?'
      },
      options: [
        { en: 'date(col, \'+7 days\')', vi: 'date(col, \'+7 days\')' },
        { en: 'col + 7', vi: 'col + 7' },
        { en: 'DATE_ADD(col, 7)', vi: 'DATE_ADD(col, 7)' },
        { en: 'ADD_DAYS(col, 7)', vi: 'ADD_DAYS(col, 7)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SQLite\'s date() function takes modifier strings like \'+7 days\', \'+1 month\', \'+1 year\'.',
        vi: 'Hàm date() của SQLite nhận các chuỗi modifier như \'+7 days\', \'+1 month\', \'+1 year\'.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_date_6',
      type: 'single_choice',
      question: {
        en: 'What function in MySQL is used to add intervals to dates (e.g. add 3 months)?',
        vi: 'Hàm nào trong MySQL được dùng để cộng khoảng thời gian vào ngày (ví dụ: cộng 3 tháng)?'
      },
      options: [
        { en: 'DATE_ADD(date, INTERVAL 3 MONTH)', vi: 'DATE_ADD(date, INTERVAL 3 MONTH)' },
        { en: 'PLUS_MONTHS(date, 3)', vi: 'PLUS_MONTHS(date, 3)' },
        { en: 'date + 3m', vi: 'date + 3m' },
        { en: 'ADD_INTERVAL(date, 3)', vi: 'ADD_INTERVAL(date, 3)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MySQL uses DATE_ADD(date, INTERVAL value UNIT) for date arithmetic.',
        vi: 'MySQL sử dụng cú pháp DATE_ADD(date, INTERVAL value UNIT) cho các phép toán ngày tháng.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_date_7',
      type: 'predict_output',
      question: {
        en: 'In SQLite, what does julianday(\'2026-01-11\') - julianday(\'2026-01-01\') evaluate to?',
        vi: 'Trong SQLite, phép tính julianday(\'2026-01-11\') - julianday(\'2026-01-01\') cho kết quả là gì?'
      },
      options: [
        { en: '10.0', vi: '10.0' },
        { en: '11.0', vi: '11.0' },
        { en: '1.0', vi: '1.0' },
        { en: 'NULL', vi: 'NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'julianday() converts dates to fractional days since the start of the Julian epoch. Subtracting them yields the elapsed days (10.0).',
        vi: 'julianday() chuyển ngày thành số ngày thực theo kỷ nguyên Julian. Trừ hai giá trị cho ra khoảng cách 10.0 ngày.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_date_8',
      type: 'true_false',
      question: {
        en: 'TIMESTAMP WITH TIME ZONE (TIMESTAMPTZ) stores the UTC equivalent moment in time and converts it to the client session timezone on display.',
        vi: 'Kiểu dữ liệu TIMESTAMP WITH TIME ZONE (TIMESTAMPTZ) lưu trữ mốc thời gian chuẩn UTC và tự động chuyển đổi sang múi giờ của phiên làm việc khi hiển thị.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. In PostgreSQL and modern databases, TIMESTAMPTZ normalizes timestamps to UTC for universal global consistency.',
        vi: 'Đúng. Trong PostgreSQL và các CSDL hiện đại, TIMESTAMPTZ quy đổi thời gian về chuẩn UTC để đảm bảo tính nhất quán toàn cầu.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_date_9',
      type: 'single_choice',
      question: {
        en: 'Why is it better to write "WHERE created_at >= \'2026-01-01\' AND created_at < \'2027-01-01\'" instead of "WHERE strftime(\'%Y\', created_at) = \'2026\'"?',
        vi: 'Tại sao nên viết "WHERE created_at >= \'2026-01-01\' AND created_at < \'2027-01-01\'" thay vì "WHERE strftime(\'%Y\', created_at) = \'2026\'"?'
      },
      options: [
        { en: 'The range query preserves SARGability and allows the database engine to perform an index seek on created_at, whereas strftime() forces a full table scan', vi: 'Truy vấn dạng khoảng giữ được tính SARGability và cho phép CSDL tìm kiếm nhanh qua chỉ mục trên created_at, trong khi strftime() buộc CSDL phải quét toàn bộ bảng' },
        { en: 'strftime() is forbidden in WHERE clauses', vi: 'Hàm strftime() bị cấm sử dụng trong mệnh đề WHERE' },
        { en: 'The range query runs on GPU instead of CPU', vi: 'Truy vấn dạng khoảng chạy trên GPU thay vì CPU' },
        { en: 'There is no difference in performance', vi: 'Không có bất kỳ sự khác biệt nào về hiệu năng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Wrapping the column in a function prevents index range seeks. Direct range comparisons are fully SARGable.',
        vi: 'Bọc cột vào hàm làm vô hiệu hóa khả năng tìm kiếm theo khoảng của chỉ mục. So sánh khoảng trực tiếp là chuẩn SARGable tối ưu nhất.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_date_10',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid temporal modifiers supported by SQLite’s date() and datetime() functions? (Select all that apply)',
        vi: 'Những modifier thời gian nào sau đây được hỗ trợ hợp lệ bởi các hàm date() và datetime() trong SQLite? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: '\'+1 day\' and \'-7 days\'', vi: '\'+1 day\' và \'-7 days\'' },
        { en: '\'+1 month\' and \'-3 months\'', vi: '\'+1 month\' và \'-3 months\'' },
        { en: '\'+5 years\'', vi: '\'+5 years\'' },
        { en: '\'start of month\' and \'start of year\'', vi: '\'start of month\' và \'start of year\'' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'SQLite supports days, months, years, hours, minutes, seconds increments, as well as start-of-period anchors.',
        vi: 'SQLite hỗ trợ đầy đủ các bước nhảy ngày, tháng, năm, giờ, phút, giây cũng như các mốc neo đầu kỳ.'
      },
      topicId: 'sql_datetime_functions',
      difficulty: 'medium'
    }
  ]
};

export default lesson08;
