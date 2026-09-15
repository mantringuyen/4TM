import { Lesson } from '../../../../types';

export const lesson24: Lesson = {
  id: 'sql_lesson_24',
  moduleId: 'sql_mod_5',
  levelId: 'advanced',
  courseId: 'sql',
  order: 24,
  topicId: 'sql_window_offset_frames',
  title: {
    en: 'Value & Offset Window Functions: LAG, LEAD & Window Frames',
    vi: 'Hàm Cửa Sổ Giá Trị & Độ Lệch: LAG, LEAD & Khung Cửa Sổ (Window Frames)'
  },
  summary: {
    en: 'Master time-series analytics and moving calculations in SQL: period-over-period growth with LAG and LEAD, boundary tracking with FIRST_VALUE, and cumulative rolling metrics using ROWS BETWEEN window frames.',
    vi: 'Làm chủ phân tích chuỗi thời gian và tính toán động trong SQL: tăng trưởng theo kỳ với LAG và LEAD, theo dõi giá trị biên với FIRST_VALUE và các chỉ số tích lũy/trung bình trượt bằng khung cửa sổ ROWS BETWEEN.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'In business analytics and financial modeling, time-series calculations—such as Month-over-Month (MoM) revenue growth, customer retention intervals, and 7-day rolling moving averages—are essential. SQL value window functions (LAG, LEAD, FIRST_VALUE) and explicit window frame definitions (ROWS BETWEEN) empower you to compute these sophisticated metrics directly in database queries without complex self-joins.',
      vi: 'Trong phân tích kinh doanh và mô hình hóa tài chính, các phép tính chuỗi thời gian—như tăng trưởng doanh thu theo tháng (MoM), khoảng thời gian quay lại của khách hàng và trung bình trượt 7 ngày—là thiết yếu. Các hàm cửa sổ giá trị trong SQL (LAG, LEAD, FIRST_VALUE) cùng định nghĩa khung cửa sổ tường minh (ROWS BETWEEN) giúp bạn tính toán các chỉ số phức tạp này trực tiếp mà không cần self-join phức tạp.'
    },
    conceptExplanation: {
      en: 'Value Functions & Window Frame Mechanics:\n1. Offset Value Functions:\n   - LAG(col, offset, default): Accesses data from N rows prior to the current row in the partition (e.g. previous month revenue).\n   - LEAD(col, offset, default): Accesses data from N rows ahead of the current row.\n2. Boundary Functions:\n   - FIRST_VALUE(col): Returns the first value in the window frame.\n   - LAST_VALUE(col): Returns the last value in the current window frame.\n3. Explicit Window Frames (ROWS / RANGE BETWEEN):\n   - Default frame: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (cumulative running totals).\n   - Moving Average Frame: "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW" (7-day rolling window).\n   - Center Window: "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING".',
      vi: 'Cơ chế các hàm giá trị & Khung cửa sổ (Window Frames):\n1. Các hàm giá trị độ lệch (Offset Functions):\n   - LAG(cột, khoảng_lệch, mặc_định): Truy cập dữ liệu của N dòng đứng trước dòng hiện tại trong phân vùng (như doanh thu tháng trước).\n   - LEAD(cột, khoảng_lệch, mặc_định): Truy cập dữ liệu của N dòng đứng sau dòng hiện tại.\n2. Các hàm biên (Boundary Functions):\n   - FIRST_VALUE(cột): Trả về giá trị đầu tiên trong khung cửa sổ.\n   - LAST_VALUE(cột): Trả về giá trị cuối cùng trong khung cửa sổ hiện tại.\n3. Khung cửa sổ tường minh (ROWS / RANGE BETWEEN):\n   - Khung mặc định: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (tính tổng tích lũy cộng dồn).\n   - Khung trung bình trượt (Moving Average): "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW" (cửa sổ trượt 7 ngày).\n   - Khung đối xứng: "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING".'
    },
    syntax: `-- Month-over-Month Revenue Growth with LAG
SELECT sale_month, revenue,
       LAG(revenue, 1, 0.0) OVER (ORDER BY sale_month ASC) AS prev_month_revenue,
       ROUND((revenue - LAG(revenue, 1) OVER (ORDER BY sale_month ASC)) * 100.0 / 
             NULLIF(LAG(revenue, 1) OVER (ORDER BY sale_month ASC), 0), 2) AS mom_growth_pct
FROM monthly_sales;

-- 3-Month Moving Average with ROWS BETWEEN
SELECT sale_month, revenue,
       ROUND(AVG(revenue) OVER (
         ORDER BY sale_month ASC
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ), 2) AS rolling_3mo_avg_revenue
FROM monthly_sales;`,
    examples: [
      {
        title: {
          en: '1. Cumulative Running Total & 7-Day Rolling Revenue Pipeline',
          vi: '1. Tổng Cộng Dồn Tích Lũy & Doanh Thu Trung Bình Trượt 7 Ngày'
        },
        code: `SELECT order_date,
       daily_revenue,
       SUM(daily_revenue) OVER (
         ORDER BY order_date ASC
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS cumulative_revenue_to_date,
       ROUND(AVG(daily_revenue) OVER (
         ORDER BY order_date ASC
         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ), 2) AS rolling_7day_avg
FROM daily_sales_metrics
ORDER BY order_date ASC;`,
        language: 'sql',
        explanation: {
          en: 'Computes cumulative year-to-date sales alongside a smoothed 7-day trailing moving average in a single SQL execution pass.',
          vi: 'Tính doanh thu lũy kế từ đầu năm đến nay song song với đường trung bình trượt 7 ngày chỉ trong một lượt quét SQL duy nhất.'
        }
      },
      {
        title: {
          en: '2. User Inactivity Interval Detection with LEAD',
          vi: '2. Phát Hiện Khoảng Thời Gian Không Hoạt Động Của Người Dùng Bằng LEAD'
        },
        code: `SELECT user_id,
       login_time,
       LEAD(login_time, 1) OVER (
         PARTITION BY user_id ORDER BY login_time ASC
       ) AS next_login_time
FROM user_logins;`,
        language: 'sql',
        explanation: {
          en: 'Compares each login event with the user\'s next immediate session to measure time-between-sessions and drop-off rates.',
          vi: 'So sánh từng phiên đăng nhập với phiên tiếp theo của cùng người dùng để đo lường khoảng cách giữa các lần sử dụng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using LAST_VALUE with the default window frame (UNBOUNDED PRECEDING AND CURRENT ROW).',
          vi: 'Dùng hàm LAST_VALUE với khung cửa sổ mặc định (UNBOUNDED PRECEDING AND CURRENT ROW).'
        },
        correction: {
          en: 'With the default window frame, the "last value" in the current frame is simply the CURRENT ROW value! To find the true partition-wide last value, you must specify "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING".',
          vi: 'Với khung mặc định, "giá trị cuối cùng" trong khung hiện tại chỉ là chính DÒNG HIỆN TẠI! Để lấy giá trị cuối cùng thực sự của cả phân vùng, bạn bắt buộc phải khai báo "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING".'
        }
      },
      {
        mistake: {
          en: 'Omitting the default fallback value in LAG/LEAD when dividing for percentage growth.',
          vi: 'Quên xử lý trường hợp NULL ở dòng đầu tiên của LAG/LEAD khi chia tính tỷ lệ phần trăm.'
        },
        correction: {
          en: 'The very first row in a LAG partition has no previous row, producing NULL. Wrap denominators with NULLIF(LAG(...), 0) to avoid division by zero or unexpected null propagation.',
          vi: 'Dòng đầu tiên trong phân vùng của LAG không có dòng trước nên ra NULL. Hãy bọc mẫu số bằng NULLIF(LAG(...), 0) để tránh lỗi chia.'
        }
      }
    ],
    tips: [
      {
        en: 'LAG and LEAD accept a 3rd parameter as the default fallback value: LAG(revenue, 1, 0.0) returns 0.0 instead of NULL for the first row.',
        vi: 'LAG và LEAD chấp nhận tham số thứ 3 làm giá trị mặc định: LAG(revenue, 1, 0.0) trả về 0.0 thay vì NULL cho dòng đầu tiên.'
      },
      {
        en: 'ROWS treats physical row offsets literally (e.g. 2 rows before), whereas RANGE evaluates logical value offsets on timestamps or numerical ranges.',
        vi: 'ROWS xử lý khoảng cách vật lý theo số dòng (như 2 dòng trước), trong khi RANGE đánh giá khoảng cách logic theo giá trị số hoặc thời gian.'
      }
    ],
    practiceStarterCode: `-- Practice LAG for previous month comparison
SELECT month, sales, LAG(sales, 1) OVER (ORDER BY month ASC) AS prev_sales FROM monthly_sales;`
  },
  exercisePool: [
    {
      id: 'sql_ex_offset_1',
      type: 'complete_code',
      title: {
        en: 'Retrieve Previous Month Revenue with LAG',
        vi: 'Lấy Doanh Thu Tháng Trước Bằng LAG'
      },
      instruction: {
        en: 'Use LAG to project the previous month revenue for each month ordered by sale_month ASC.',
        vi: 'Dùng LAG để lấy doanh thu của tháng trước cho từng tháng sắp xếp theo sale_month ASC.'
      },
      starterCode: `SELECT sale_month, revenue,
       ___(revenue, 1) OVER (ORDER BY sale_month ASC) AS prev_revenue
FROM monthly_sales;`,
      solutionCode: `SELECT sale_month, revenue,
       LAG(revenue, 1) OVER (ORDER BY sale_month ASC) AS prev_revenue
FROM monthly_sales;`,
      hint: {
        en: 'Use LAG(revenue, 1).',
        vi: 'Dùng LAG(revenue, 1).'
      },
      explanation: {
        en: 'LAG(revenue, 1) looks back 1 row in the ordered sequence.',
        vi: 'LAG(revenue, 1) nhìn lại 1 dòng trước trong chuỗi đã sắp xếp.'
      }
    },
    {
      id: 'sql_ex_offset_2',
      type: 'complete_code',
      title: {
        en: 'Calculate Running Cumulative Total with Window Frames',
        vi: 'Tính Tổng Tích Lũy Cộng Dồn Bằng Khung Cửa Sổ'
      },
      instruction: {
        en: 'Complete the SUM window frame using ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.',
        vi: 'Hoàn thiện khung cửa sổ SUM dùng ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.'
      },
      starterCode: `SELECT txn_date, amount,
       SUM(amount) OVER (
         ORDER BY txn_date ASC
         ROWS BETWEEN ___ PRECEDING AND CURRENT ROW
       ) AS running_total
FROM transactions;`,
      solutionCode: `SELECT txn_date, amount,
       SUM(amount) OVER (
         ORDER BY txn_date ASC
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM transactions;`,
      hint: {
        en: 'Fill UNBOUNDED.',
        vi: 'Điền UNBOUNDED.'
      },
      explanation: {
        en: 'UNBOUNDED PRECEDING includes all rows from the beginning of the partition up to the current row.',
        vi: 'UNBOUNDED PRECEDING bao gồm toàn bộ các dòng từ đầu phân vùng cho đến dòng hiện tại.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_window_offset_frames',
    title: {
      en: 'Financial Month-over-Month Analytics & 3-Month Rolling Average Matrix',
      vi: 'Ma Trận Tăng Trưởng Tài Chính Tháng-Trên-Tháng & Trung Bình Trượt 3 Tháng'
    },
    description: {
      en: 'Write an analytical SQL query that processes the financial_metrics table (columns: metric_year, metric_month, revenue). In the projection, output metric_year, metric_month, revenue, prev_revenue as LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC), mom_growth_pct as ROUND((revenue - LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC)) * 100.0 / NULLIF(LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC), 0), 2), and rolling_3mo_avg as ROUND(AVG(revenue) OVER (ORDER BY metric_year ASC, metric_month ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2). Order by metric_year ASC, metric_month ASC.',
      vi: 'Viết câu truy vấn SQL phân tích xử lý bảng financial_metrics (các cột: metric_year, metric_month, revenue). Lấy metric_year, metric_month, revenue, prev_revenue bằng LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC), mom_growth_pct bằng ROUND((revenue - LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC)) * 100.0 / NULLIF(LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC), 0), 2), và rolling_3mo_avg bằng ROUND(AVG(revenue) OVER (ORDER BY metric_year ASC, metric_month ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2). Sắp xếp theo metric_year ASC, metric_month ASC.'
    },
    requirements: [
      { en: '1. LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC)', vi: '1. LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC)' },
      { en: '2. Safe MoM growth calculation with NULLIF', vi: '2. Tính tỷ lệ tăng trưởng MoM an toàn với NULLIF' },
      { en: '3. 3-month rolling average with ROWS BETWEEN 2 PRECEDING AND CURRENT ROW', vi: '3. Trung bình trượt 3 tháng với ROWS BETWEEN 2 PRECEDING AND CURRENT ROW' },
      { en: '4. ORDER BY metric_year ASC, metric_month ASC', vi: '4. Sắp xếp ORDER BY metric_year ASC, metric_month ASC' }
    ],
    starterCode: `-- Write your comprehensive time-series financial query
SELECT metric_year, metric_month, revenue FROM financial_metrics;`,
    solutionCode: `SELECT metric_year,
       metric_month,
       revenue,
       LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC) AS prev_revenue,
       ROUND((revenue - LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC)) * 100.0 / 
             NULLIF(LAG(revenue, 1) OVER (ORDER BY metric_year ASC, metric_month ASC), 0), 2) AS mom_growth_pct,
       ROUND(AVG(revenue) OVER (
         ORDER BY metric_year ASC, metric_month ASC
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ), 2) AS rolling_3mo_avg
FROM financial_metrics
ORDER BY metric_year ASC, metric_month ASC;`,
    hints: [
      {
        en: 'Combine LAG for previous period comparison with an explicit 3-row window frame (2 PRECEDING AND CURRENT ROW) for the rolling average.',
        vi: 'Kết hợp hàm LAG để so sánh kỳ trước với khung cửa sổ 3 dòng (2 PRECEDING AND CURRENT ROW) cho trung bình trượt.'
      }
    ],
    solutionExplanation: {
      en: 'Executes sophisticated time-series delta comparisons and trailing moving averages in a single expressive query.',
      vi: 'Thực thi các phép so sánh chênh lệch chuỗi thời gian và tính trung bình trượt đa kỳ chỉ trong một câu truy vấn duy nhất.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_off_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference between the LAG() and LEAD() window functions?',
        vi: 'Sự khác biệt căn bản giữa hai hàm cửa sổ LAG() và LEAD() là gì?'
      },
      options: [
        { en: 'LAG() accesses data from previous rows (looking back), while LEAD() accesses data from subsequent rows (looking forward)', vi: 'LAG() truy cập dữ liệu từ các dòng đứng trước (nhìn về quá khứ), trong khi LEAD() truy cập dữ liệu từ các dòng đứng sau (nhìn về tương lai)' },
        { en: 'LAG() only works on numbers; LEAD() only works on text', vi: 'LAG() chỉ chạy trên số; LEAD() chỉ chạy trên chữ' },
        { en: 'LEAD() permanently alters table order', vi: 'LEAD() thay đổi vĩnh viễn thứ tự bảng' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LAG looks backward by offset N rows, and LEAD looks forward by offset N rows.',
        vi: 'LAG nhìn lùi lại N dòng phía trước và LEAD nhìn tiến tới N dòng phía sau.'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_off_2',
      type: 'single_choice',
      question: {
        en: 'What does the optional third parameter in LAG(col, offset, default_value) do?',
        vi: 'Tham số thứ ba tùy chọn trong hàm LAG(cột, khoảng_lệch, giá_trị_mặc_định) có tác dụng gì?'
      },
      options: [
        { en: 'It supplies a fallback default value (such as 0) when the offset falls outside the partition boundary (e.g. for the very first row), preventing NULL', vi: 'Nó cung cấp một giá trị mặc định (như 0) khi độ lệch vượt ra ngoài ranh giới phân vùng (như dòng đầu tiên), tránh bị ra NULL' },
        { en: 'It limits the query execution time', vi: 'Nó giới hạn thời gian thực thi truy vấn' },
        { en: 'It encrypts the column', vi: 'Nó mã hóa cột' },
        { en: 'It converts integers to decimals', vi: 'Nó chuyển số nguyên thành số thập phân' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The default parameter replaces NULL when an offset crosses beyond partition boundaries.',
        vi: 'Tham số mặc định thay thế giá trị NULL khi độ lệch vượt quá giới hạn phân vùng.'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_off_3',
      type: 'single_choice',
      question: {
        en: 'Why does "LAST_VALUE(salary) OVER (ORDER BY salary ASC)" unexpectedly return the current row\'s salary instead of the maximum salary?',
        vi: 'Tại sao câu lệnh "LAST_VALUE(salary) OVER (ORDER BY salary ASC)" lại trả về chính lương của dòng hiện tại thay vì mức lương cao nhất?'
      },
      options: [
        { en: 'Because the default window frame is "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW", making the current row the last row evaluated in the frame', vi: 'Vì khung cửa sổ mặc định là "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW", khiến dòng hiện tại chính là dòng cuối cùng trong khung được xét' },
        { en: 'Because LAST_VALUE is deprecated in SQL', vi: 'Vì LAST_VALUE đã bị khai tử trong SQL' },
        { en: 'Because salary is an integer', vi: 'Vì salary là số nguyên' },
        { en: 'Because ORDER BY is not allowed with LAST_VALUE', vi: 'Vì ORDER BY không được phép dùng với LAST_VALUE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'To make LAST_VALUE evaluate the true end of the partition, explicitly specify "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING".',
        vi: 'Để LAST_VALUE lấy đúng giá trị cuối của toàn bộ phân vùng, bắt buộc phải khai báo "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING".'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_off_4',
      type: 'single_choice',
      question: {
        en: 'Which window frame clause specifies a 7-day trailing moving calculation (the current row and the 6 prior rows)?',
        vi: 'Mệnh đề khung cửa sổ nào chỉ định phép tính trung bình trượt 7 ngày (gồm dòng hiện tại và 6 dòng trước đó)?'
      },
      options: [
        { en: 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW', vi: 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW' },
        { en: 'ROWS BETWEEN 7 PRECEDING AND 1 FOLLOWING', vi: 'ROWS BETWEEN 7 PRECEDING AND 1 FOLLOWING' },
        { en: 'RANGE 7 DAYS', vi: 'RANGE 7 DAYS' },
        { en: 'ROWS 7', vi: 'ROWS 7' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '6 PRECEDING plus the CURRENT ROW encompasses exactly 7 physical rows.',
        vi: '6 PRECEDING cộng với CURRENT ROW tạo thành chính xác khung 7 dòng vật lý.'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_off_5',
      type: 'true_false',
      question: {
        en: 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW computes a cumulative running total across the partition.',
        vi: 'Mệnh đề ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW tính toán tổng cộng dồn lũy kế trên toàn bộ phân vùng.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. It sums from the very first row of the partition up through the active row.',
        vi: 'Đúng. Nó cộng dồn từ dòng đầu tiên của phân vùng cho đến dòng đang xét.'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_off_6',
      type: 'single_choice',
      question: {
        en: 'What does FIRST_VALUE(col) OVER (PARTITION BY dept ORDER BY salary DESC) return?',
        vi: 'Hàm FIRST_VALUE(col) OVER (PARTITION BY dept ORDER BY salary DESC) trả về giá trị gì?'
      },
      options: [
        { en: 'The value of col from the highest paid employee in that specific department for every row in that department', vi: 'Giá trị của col từ nhân viên có lương cao nhất trong phòng ban đó cho mọi dòng thuộc phòng ban đó' },
        { en: 'The average salary in the department', vi: 'Mức lương trung bình của phòng ban' },
        { en: 'The lowest salary in the company', vi: 'Mức lương thấp nhất công ty' },
        { en: 'The first letter of the department name', vi: 'Chữ cái đầu tiên của tên phòng ban' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'FIRST_VALUE projects the initial window value across all rows in the partition.',
        vi: 'FIRST_VALUE lấy giá trị đầu tiên của cửa sổ và gán vào tất cả các dòng trong phân vùng.'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_off_7',
      type: 'predict_output',
      question: {
        en: 'Revenues: Jan=100, Feb=150. What is the result of LAG(revenue, 1) for Jan and Feb respectively?',
        vi: 'Doanh thu: Tháng 1=100, Tháng 2=150. Kết quả của hàm LAG(revenue, 1) cho Tháng 1 và Tháng 2 lần lượt là gì?'
      },
      options: [
        { en: 'Jan: NULL, Feb: 100', vi: 'Tháng 1: NULL, Tháng 2: 100' },
        { en: 'Jan: 100, Feb: 150', vi: 'Tháng 1: 100, Tháng 2: 150' },
        { en: 'Jan: 150, Feb: NULL', vi: 'Tháng 1: 150, Tháng 2: NULL' },
        { en: 'Jan: 0, Feb: 150', vi: 'Tháng 1: 0, Tháng 2: 150' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Jan has no prior row so LAG returns NULL. Feb looks back 1 row and sees Jan\'s value (100).',
        vi: 'Tháng 1 không có dòng trước nên ra NULL. Tháng 2 nhìn lại 1 dòng và thấy giá trị của Tháng 1 (100).'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_off_8',
      type: 'true_false',
      question: {
        en: 'The ROWS frame unit counts physical row offsets, whereas the RANGE frame unit evaluates logical value offsets based on the ORDER BY column.',
        vi: 'Đơn vị khung ROWS đếm khoảng cách theo số dòng vật lý, trong khi đơn vị RANGE đánh giá khoảng cách theo giá trị logic của cột ORDER BY.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. ROWS is positional/physical; RANGE is logical/value-based.',
        vi: 'Đúng. ROWS tính theo vị trí vật lý; RANGE tính theo giá trị logic.'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_off_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid window value and offset functions in standard SQL? (Select all that apply)',
        vi: 'Những hàm nào sau đây là hàm cửa sổ giá trị và độ lệch hợp lệ trong chuẩn SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'LAG()', vi: 'LAG()' },
        { en: 'LEAD()', vi: 'LEAD()' },
        { en: 'FIRST_VALUE()', vi: 'FIRST_VALUE()' },
        { en: 'NTH_VALUE()', vi: 'NTH_VALUE()' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'LAG, LEAD, FIRST_VALUE, LAST_VALUE, and NTH_VALUE are standard ANSI SQL value window functions.',
        vi: 'LAG, LEAD, FIRST_VALUE, LAST_VALUE và NTH_VALUE đều là các hàm cửa sổ giá trị chuẩn ANSI SQL.'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_off_10',
      type: 'single_choice',
      question: {
        en: 'What window frame specification encompasses all rows from the beginning of the partition to the very end of the partition?',
        vi: 'Khai báo khung cửa sổ nào bao quát toàn bộ các dòng từ đầu phân vùng cho đến tận cuối phân vùng?'
      },
      options: [
        { en: 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING', vi: 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING' },
        { en: 'ROWS ALL', vi: 'ROWS ALL' },
        { en: 'FRAME 0 TO MAX', vi: 'FRAME 0 TO MAX' },
        { en: 'ROWS FULL', vi: 'ROWS FULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'UNBOUNDED PRECEDING to UNBOUNDED FOLLOWING defines the entire breadth of the partition.',
        vi: 'UNBOUNDED PRECEDING đến UNBOUNDED FOLLOWING định nghĩa toàn bộ phạm vi của phân vùng.'
      },
      topicId: 'sql_window_offset_frames',
      difficulty: 'medium'
    }
  ]
};

export default lesson24;
