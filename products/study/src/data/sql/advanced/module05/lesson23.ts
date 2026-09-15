import { Lesson } from '../../../../types';

export const lesson23: Lesson = {
  id: 'sql_lesson_23',
  moduleId: 'sql_mod_5',
  levelId: 'advanced',
  courseId: 'sql',
  order: 23,
  topicId: 'sql_window_ranking',
  title: {
    en: 'Window Functions: ROW_NUMBER, RANK, DENSE_RANK & NTILE',
    vi: 'Hàm Cửa Sổ (Window Functions): ROW_NUMBER, RANK, DENSE_RANK & NTILE'
  },
  summary: {
    en: 'Master SQL analytical ranking window functions: computing partitioned ranks without collapsing row identities using OVER (PARTITION BY ... ORDER BY ...), ROW_NUMBER, RANK with gaps, continuous DENSE_RANK, and percentile bucket distribution with NTILE.',
    vi: 'Làm chủ các hàm cửa sổ xếp hạng trong SQL: tính toán thứ hạng phân vùng mà không làm mất chi tiết từng dòng bằng OVER (PARTITION BY ... ORDER BY ...), ROW_NUMBER, RANK có khoảng cách, DENSE_RANK liên tục và chia nhóm phân vị bằng NTILE.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Standard GROUP BY queries collapse multiple rows into a single aggregate summary, losing row-level granularity. Window functions perform sophisticated analytical calculations across a set of table rows related to the current row while preserving every individual record in the output projection.',
      vi: 'Các câu truy vấn GROUP BY thông thường sẽ gộp nhiều dòng thành một bản ghi tổng hợp duy nhất, làm mất đi chi tiết của từng dòng. Hàm cửa sổ (Window Functions) thực hiện các phép tính phân tích phức tạp trên một tập các dòng liên quan đến dòng hiện tại mà vẫn bảo toàn đầy đủ từng bản ghi riêng biệt trong kết quả.'
    },
    conceptExplanation: {
      en: 'The OVER() Clause & Ranking Function Dynamics:\n1. The OVER() Clause Structure:\n   - PARTITION BY column: Divides the dataset into independent calculation windows (similar to grouping without collapsing).\n   - ORDER BY column: Orders rows within each partition to determine ranking sequence.\n2. Ranking Function Distinctions:\n   - ROW_NUMBER(): Assigns a unique, consecutive integer (1, 2, 3, 4...) to each row, breaking ties arbitrarily.\n   - RANK(): Assigns identical rank numbers to tie values, but skips subsequent rank numbers (e.g. 1, 2, 2, 4).\n   - DENSE_RANK(): Assigns identical rank numbers to tie values without skipping subsequent ranks (e.g. 1, 2, 2, 3).\n   - NTILE(n): Distributes partitioned rows into n equal statistical buckets or quantiles (e.g. NTILE(4) for quartiles).\n3. The Top-N Per Group Pattern: Wrapping a window rank inside a CTE or derived table to filter "WHERE rank_val <= N".',
      vi: 'Mệnh đề OVER() & Các hàm xếp hạng phân tích:\n1. Cấu trúc mệnh đề OVER():\n   - PARTITION BY cột: Phân chia tập dữ liệu thành các cửa sổ tính toán độc lập (tương tự như nhóm nhưng không gộp dòng).\n   - ORDER BY cột: Sắp xếp các dòng bên trong từng phân vùng để xác định thứ tự xếp hạng.\n2. Phân biệt các hàm xếp hạng:\n   - ROW_NUMBER(): Gán một số nguyên tăng dần liên tục duy nhất (1, 2, 3, 4...) cho từng dòng, phân xử ngẫu nhiên khi bằng điểm.\n   - RANK(): Gán cùng số thứ hạng cho các giá trị bằng nhau, nhưng nhảy cóc thứ hạng phía sau (ví dụ: 1, 2, 2, 4).\n   - DENSE_RANK(): Gán cùng số thứ hạng cho các giá trị bằng nhau nhưng không nhảy cóc thứ hạng (ví dụ: 1, 2, 2, 3).\n   - NTILE(n): Chia các dòng trong phân vùng thành n nhóm phân vị có số lượng bằng nhau (ví dụ: NTILE(4) cho tứ phân vị).\n3. Mẫu Top-N cho từng nhóm: Bọc hàm xếp hạng cửa sổ bên trong CTE hoặc bảng dẫn xuất để lọc "WHERE rank_val <= N".'
    },
    syntax: `SELECT name, department_id, salary,
       ROW_NUMBER() OVER(PARTITION BY department_id ORDER BY salary DESC) AS row_num,
       RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) AS rank_with_gaps,
       DENSE_RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) AS dense_rank_no_gaps,
       NTILE(4) OVER(ORDER BY salary DESC) AS salary_quartile
FROM employees;`,
    examples: [
      {
        title: {
          en: '1. Top-2 Highest Paid Employees Per Department (Top-N Pattern)',
          vi: '1. Tìm Top 2 Nhân Viên Lương Cao Nhất Từng Phòng Ban (Mẫu Top-N)'
        },
        code: `WITH RankedStaff AS (
  SELECT id,
         name,
         department_id,
         salary,
         DENSE_RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) AS dept_salary_rank
  FROM employees
)
SELECT id, name, department_id, salary, dept_salary_rank
FROM RankedStaff
WHERE dept_salary_rank <= 2
ORDER BY department_id ASC, dept_salary_rank ASC;`,
        language: 'sql',
        explanation: {
          en: 'Uses DENSE_RANK inside a CTE to isolate the top two salary tiers per department without missing tied top earners.',
          vi: 'Dùng DENSE_RANK trong CTE để lọc 2 mức lương cao nhất từng phòng ban mà không bỏ sót những người đồng hạng.'
        }
      },
      {
        title: {
          en: '2. Customer Cohort Segmentation with NTILE(10) Deciles',
          vi: '2. Phân Khúc Khách Hàng Thành 10 Nhóm Phân Vị (Deciles) Bằng NTILE(10)'
        },
        code: `SELECT customer_id,
       total_spend,
       NTILE(10) OVER(ORDER BY total_spend DESC) AS spend_decile
FROM customer_spending;`,
        language: 'sql',
        explanation: {
          en: 'Divides the customer base into 10 equal tiers, where decile 1 represents top 10% highest spenders (VIPs).',
          vi: 'Chia tệp khách hàng thành 10 nhóm đều nhau, trong đó decile 1 là nhóm 10% khách hàng chi tiêu nhiều nhất (VIP).'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Attempting to filter by a window function directly in the WHERE clause (e.g. "WHERE ROW_NUMBER() OVER(...) <= 3").',
          vi: 'Cố tình lọc trực tiếp hàm cửa sổ trong mệnh đề WHERE (ví dụ: "WHERE ROW_NUMBER() OVER(...) <= 3").'
        },
        correction: {
          en: 'In SQL execution order, WHERE is evaluated before window functions. You MUST compute the window rank in a CTE or subquery first, and then filter in the outer WHERE clause.',
          vi: 'Theo thứ tự thực thi của SQL, WHERE chạy trước Window Functions. Bạn BẮT BUỘC phải tính thứ hạng trong CTE/subquery trước rồi mới lọc ở WHERE bên ngoài.'
        }
      },
      {
        mistake: {
          en: 'Confusing RANK() and DENSE_RANK() when ties must be counted continuously.',
          vi: 'Nhầm lẫn giữa RANK() và DENSE_RANK() khi cần đếm thứ bậc liên tục có giá trị trùng.'
        },
        correction: {
          en: 'If two runners tie for 1st place, RANK() gives: 1, 1, 3. DENSE_RANK() gives: 1, 1, 2. Choose DENSE_RANK when gaps in rank numbers would break business tiers.',
          vi: 'Nếu hai người đồng hạng 1, RANK() sẽ cho: 1, 1, 3. Còn DENSE_RANK() sẽ cho: 1, 1, 2. Hãy dùng DENSE_RANK khi không muốn bị nhảy cóc thứ hạng.'
        }
      }
    ],
    tips: [
      {
        en: 'Leaving the PARTITION BY clause empty (e.g. OVER(ORDER BY salary DESC)) treats the entire table as a single grand window.',
        vi: 'Bỏ trống mệnh đề PARTITION BY (ví dụ: OVER(ORDER BY salary DESC)) sẽ xem toàn bộ bảng là một cửa sổ tính toán duy nhất.'
      },
      {
        en: 'Window functions can be combined with window aliases in SQL-2008 standard: "WINDOW w AS (PARTITION BY dept ORDER BY salary DESC)".',
        vi: 'Hàm cửa sổ có thể tái sử dụng định nghĩa cửa sổ bằng bí danh: "WINDOW w AS (PARTITION BY dept ORDER BY salary DESC)".'
      }
    ],
    practiceStarterCode: `-- Practice ROW_NUMBER ranking
SELECT name, department_id, salary,
       ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
FROM employees;`
  },
  exercisePool: [
    {
      id: 'sql_ex_win_1',
      type: 'complete_code',
      title: {
        en: 'Compute Departmental Salary Rank with DENSE_RANK',
        vi: 'Tính Thứ Hạng Lương Phòng Ban Bằng DENSE_RANK'
      },
      instruction: {
        en: 'Assign a dense rank to employees ordered by salary DESC partitioned by department_id.',
        vi: 'Gán thứ hạng dense rank cho nhân viên sắp xếp theo salary DESC phân vùng theo department_id.'
      },
      starterCode: `SELECT name, department_id, salary,
       ___() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;`,
      solutionCode: `SELECT name, department_id, salary,
       DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;`,
      hint: {
        en: 'Use DENSE_RANK.',
        vi: 'Dùng DENSE_RANK.'
      },
      explanation: {
        en: 'DENSE_RANK() assigns consecutive rank values per department without gaps on ties.',
        vi: 'DENSE_RANK() gán thứ tự liên tục cho từng phòng ban mà không nhảy cóc khi trùng điểm.'
      }
    },
    {
      id: 'sql_ex_win_2',
      type: 'complete_code',
      title: {
        en: 'Segment Customers into Quartiles with NTILE',
        vi: 'Phân Khúc Khách Hàng Thành 4 Nhóm Tứ Phân Vị Với NTILE'
      },
      instruction: {
        en: 'Divide all customers into 4 equal quartiles based on total_spend descending.',
        vi: 'Chia tất cả khách hàng thành 4 nhóm tứ phân vị dựa trên total_spend giảm dần.'
      },
      starterCode: `SELECT customer_id, total_spend,
       NTILE(___) OVER (ORDER BY total_spend DESC) AS quartile
FROM customer_spending;`,
      solutionCode: `SELECT customer_id, total_spend,
       NTILE(4) OVER (ORDER BY total_spend DESC) AS quartile
FROM customer_spending;`,
      hint: {
        en: 'Pass 4 into NTILE.',
        vi: 'Truyền số 4 vào NTILE.'
      },
      explanation: {
        en: 'NTILE(4) evenly buckets the ordered rows into quartiles 1 through 4.',
        vi: 'NTILE(4) chia đều các dòng đã sắp xếp vào 4 nhóm tứ phân vị từ 1 đến 4.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_window_ranking',
    title: {
      en: 'Multi-Department Top-3 Earner Leaderboard Pipeline',
      vi: 'Đường Ống Bảng Xếp Hạng Top 3 Thu Nhập Theo Từng Phòng Ban'
    },
    description: {
      en: 'Write a modular SQL query using a Common Table Expression named RankedEmployees. In the CTE, select id, name, department_id, salary, and compute salary_rank as DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC), and row_id as ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC, id ASC). In the main query, select id, name, department_id, salary, salary_rank from RankedEmployees WHERE salary_rank <= 3 ORDER BY department_id ASC, salary_rank ASC, id ASC.',
      vi: 'Viết câu truy vấn SQL module hóa bằng CTE có tên RankedEmployees. Trong CTE, lấy id, name, department_id, salary, và tính salary_rank bằng DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC), cùng row_id bằng ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC, id ASC). Trong truy vấn chính, lấy id, name, department_id, salary, salary_rank từ RankedEmployees WHERE salary_rank <= 3 ORDER BY department_id ASC, salary_rank ASC, id ASC.'
    },
    requirements: [
      { en: '1. CTE RankedEmployees with DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)', vi: '1. CTE RankedEmployees với DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)' },
      { en: '2. Filter WHERE salary_rank <= 3 in outer query', vi: '2. Lọc WHERE salary_rank <= 3 ở câu truy vấn ngoài' },
      { en: '3. ORDER BY department_id ASC, salary_rank ASC, id ASC', vi: '3. Sắp xếp ORDER BY department_id ASC, salary_rank ASC, id ASC' }
    ],
    starterCode: `-- Write your Top-3 Leaderboard CTE
WITH RankedEmployees AS (
  SELECT id, name, department_id, salary FROM employees
)
SELECT * FROM RankedEmployees;`,
    solutionCode: `WITH RankedEmployees AS (
  SELECT id,
         name,
         department_id,
         salary,
         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank,
         ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC, id ASC) AS row_id
  FROM employees
)
SELECT id, name, department_id, salary, salary_rank
FROM RankedEmployees
WHERE salary_rank <= 3
ORDER BY department_id ASC, salary_rank ASC, id ASC;`,
    hints: [
      {
        en: 'Define DENSE_RANK in the CTE and apply the filter WHERE salary_rank <= 3 in the outer SELECT block.',
        vi: 'Định nghĩa DENSE_RANK trong CTE và áp dụng bộ lọc WHERE salary_rank <= 3 ở khối SELECT bên ngoài.'
      }
    ],
    solutionExplanation: {
      en: 'Combines window ranking and CTE encapsulation to filter top-N departmental tiers cleanly and efficiently.',
      vi: 'Kết hợp xếp hạng cửa sổ và đóng gói CTE để lọc các tầng top-N theo phòng ban một cách tối ưu và trong sáng.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_win_1',
      type: 'single_choice',
      question: {
        en: 'What is the fundamental difference between a Window Function and a GROUP BY aggregation?',
        vi: 'Sự khác biệt căn bản giữa Hàm Cửa Sổ (Window Function) và phép tổng hợp GROUP BY là gì?'
      },
      options: [
        { en: 'Window functions perform calculations across a partition of rows while preserving individual row identities in the output, whereas GROUP BY collapses rows into a single summary row', vi: 'Hàm cửa sổ tính toán trên một phân vùng dòng trong khi vẫn giữ nguyên chi tiết từng dòng ở kết quả, còn GROUP BY gộp các dòng thành một dòng tổng hợp duy nhất' },
        { en: 'Window functions only work in Microsoft Windows', vi: 'Hàm cửa sổ chỉ hoạt động trên hệ điều hành Microsoft Windows' },
        { en: 'GROUP BY cannot sum numbers', vi: 'GROUP BY không thể tính tổng các số' },
        { en: 'Window functions delete rows', vi: 'Hàm cửa sổ xóa bớt các dòng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Window functions retain full row-level granularity while computing group-level analytics.',
        vi: 'Hàm cửa sổ giữ trọn vẹn chi tiết từng dòng trong khi vẫn tính toán được các chỉ số ở cấp độ nhóm.'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_win_2',
      type: 'predict_output',
      question: {
        en: 'Three employees have salaries: 1000, 1000, 800. What ranks does RANK() produce when ordered by salary DESC?',
        vi: 'Ba nhân viên có mức lương: 1000, 1000, 800. Hàm RANK() sẽ sinh ra các thứ hạng nào khi sắp xếp theo salary DESC?'
      },
      options: [
        { en: '1, 1, 3 (skips rank 2 due to the tie)', vi: '1, 1, 3 (nhảy cóc qua hạng 2 do có 2 người bằng điểm)' },
        { en: '1, 1, 2', vi: '1, 1, 2' },
        { en: '1, 2, 3', vi: '1, 2, 3' },
        { en: '1, 2, 2', vi: '1, 2, 2' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RANK() assigns duplicate ranks for ties and skips numbers equal to the tie count (1, 1, 3).',
        vi: 'RANK() gán cùng thứ hạng khi bằng nhau và nhảy cóc số thứ hạng tương ứng (1, 1, 3).'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_win_3',
      type: 'predict_output',
      question: {
        en: 'Three employees have salaries: 1000, 1000, 800. What ranks does DENSE_RANK() produce when ordered by salary DESC?',
        vi: 'Ba nhân viên có mức lương: 1000, 1000, 800. Hàm DENSE_RANK() sẽ sinh ra các thứ hạng nào khi sắp xếp theo salary DESC?'
      },
      options: [
        { en: '1, 1, 2 (no gap after the tie)', vi: '1, 1, 2 (không có khoảng trống nhảy cóc sau khi trùng)' },
        { en: '1, 1, 3', vi: '1, 1, 3' },
        { en: '1, 2, 3', vi: '1, 2, 3' },
        { en: '2, 2, 1', vi: '2, 2, 1' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DENSE_RANK() assigns identical ranks to ties but increments continuously without gaps (1, 1, 2).',
        vi: 'DENSE_RANK() gán cùng thứ tự khi trùng và tăng liên tục không nhảy cóc (1, 1, 2).'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_win_4',
      type: 'single_choice',
      question: {
        en: 'What does ROW_NUMBER() produce for tied values in the ORDER BY clause?',
        vi: 'Hàm ROW_NUMBER() sẽ trả về giá trị gì cho các dòng có giá trị bằng nhau trong mệnh đề ORDER BY?'
      },
      options: [
        { en: 'Strictly unique, sequential integers (e.g. 1, 2, 3...) regardless of duplicate values', vi: 'Các số nguyên duy nhất tăng dần liên tục (ví dụ: 1, 2, 3...) bất kể giá trị có trùng nhau' },
        { en: 'Duplicate numbers (1, 1, 1)', vi: 'Các số trùng nhau (1, 1, 1)' },
        { en: 'NULL values', vi: 'Giá trị NULL' },
        { en: 'An error message', vi: 'Một thông báo lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ROW_NUMBER() always assigns strict consecutive sequential numbers 1, 2, 3... to every row.',
        vi: 'ROW_NUMBER() luôn luôn gán số thứ tự liên tục duy nhất 1, 2, 3... cho mọi dòng.'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_win_5',
      type: 'single_choice',
      question: {
        en: 'Why can you NOT write "WHERE ROW_NUMBER() OVER(...) <= 5" directly in the WHERE clause of the same query?',
        vi: 'Tại sao bạn KHÔNG THỂ viết "WHERE ROW_NUMBER() OVER(...) <= 5" trực tiếp trong mệnh đề WHERE của cùng câu truy vấn đó?'
      },
      options: [
        { en: 'In SQL execution phase order, WHERE filters rows before window functions are calculated in the projection phase', vi: 'Theo thứ tự các pha thực thi SQL, WHERE lọc dòng trước khi các hàm cửa sổ được tính toán ở pha chiếu kết quả' },
        { en: 'ROW_NUMBER is a reserved keyword in WHERE', vi: 'ROW_NUMBER là từ khóa bị cấm trong WHERE' },
        { en: 'The database runs out of memory', vi: 'CSDL bị tràn bộ nhớ' },
        { en: 'WHERE only accepts numbers', vi: 'WHERE chỉ chấp nhận số' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because WHERE precedes window calculation in the logical SQL lifecycle, window ranks must be wrapped in a CTE/subquery to be filtered.',
        vi: 'Vì mệnh đề WHERE chạy trước pha tính toán cửa sổ nên thứ hạng cửa sổ phải được bọc trong CTE/subquery mới lọc được.'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_win_6',
      type: 'single_choice',
      question: {
        en: 'What does the NTILE(n) window function do?',
        vi: 'Hàm cửa sổ NTILE(n) thực hiện chức năng gì?'
      },
      options: [
        { en: 'Divides the ordered rows in a partition into n as-equal-as-possible statistical buckets (quantiles)', vi: 'Chia các dòng đã sắp xếp trong một phân vùng thành n nhóm có số lượng bằng nhau nhất có thể (các phân vị)' },
        { en: 'Multiplies each row by n', vi: 'Nhân mỗi dòng với n' },
        { en: 'Deletes n rows', vi: 'Xóa n dòng' },
        { en: 'Returns the nth row only', vi: 'Chỉ trả về dòng thứ n' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'NTILE partitions rows into n ranked quantile buckets (e.g. NTILE(4) for quartiles, NTILE(100) for percentiles).',
        vi: 'NTILE chia các dòng thành n nhóm phân vị (như NTILE(4) cho 4 nhóm tứ phân vị, NTILE(100) cho bách phân vị).'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_win_7',
      type: 'true_false',
      question: {
        en: 'If you omit PARTITION BY inside OVER(), the entire result set is treated as a single undivided partition.',
        vi: 'Nếu bạn bỏ qua PARTITION BY bên trong OVER(), toàn bộ tập kết quả sẽ được xem là một phân vùng duy nhất.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Omitting PARTITION BY applies the window function globally across all rows.',
        vi: 'Đúng. Bỏ qua PARTITION BY sẽ áp dụng hàm cửa sổ trên quy mô toàn cục cho tất cả các dòng.'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_win_8',
      type: 'single_choice',
      question: {
        en: 'Which window ranking function should you choose if you need to guarantee deterministic pagination without gaps or duplicates?',
        vi: 'Bạn nên chọn hàm xếp hạng cửa sổ nào nếu cần phân trang xác định mà không có số trùng hay nhảy cóc?'
      },
      options: [
        { en: 'ROW_NUMBER()', vi: 'ROW_NUMBER()' },
        { en: 'RANK()', vi: 'RANK()' },
        { en: 'DENSE_RANK()', vi: 'DENSE_RANK()' },
        { en: 'NTILE()', vi: 'NTILE()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ROW_NUMBER() generates unambiguous unique 1..N continuous sequence keys ideal for pagination.',
        vi: 'ROW_NUMBER() sinh ra chuỗi số liên tục duy nhất 1..N lý tưởng cho việc phân trang dữ liệu.'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_win_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid SQL window ranking functions? (Select all that apply)',
        vi: 'Những hàm nào sau đây là hàm cửa sổ xếp hạng hợp lệ trong SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'ROW_NUMBER()', vi: 'ROW_NUMBER()' },
        { en: 'RANK()', vi: 'RANK()' },
        { en: 'DENSE_RANK()', vi: 'DENSE_RANK()' },
        { en: 'NTILE()', vi: 'NTILE()' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All four are standard ANSI SQL analytical ranking window functions.',
        vi: 'Cả 4 hàm trên đều là các hàm xếp hạng phân tích chuẩn ANSI SQL.'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_win_10',
      type: 'single_choice',
      question: {
        en: 'In an OVER() clause, what is the role of PARTITION BY?',
        vi: 'Trong mệnh đề OVER(), vai trò của PARTITION BY là gì?'
      },
      options: [
        { en: 'It breaks the dataset into logical calculation boundaries where the ranking or aggregate calculation resets for each distinct partition value', vi: 'Nó chia nhỏ tập dữ liệu thành các ranh giới tính toán logic mà ở đó thứ hạng hoặc phép tổng hợp sẽ được tính lại từ đầu cho từng giá trị phân vùng' },
        { en: 'It splits the physical hard drive into multiple partitions', vi: 'Nó phân chia ổ cứng vật lý thành nhiều phân vùng' },
        { en: 'It deletes rows that do not match the partition', vi: 'Nó xóa các dòng không khớp với phân vùng' },
        { en: 'It renames table columns', vi: 'Nó đổi tên các cột của bảng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PARTITION BY defines sub-cohort boundaries where window calculations restart independently.',
        vi: 'PARTITION BY thiết lập ranh giới các nhóm con để hàm cửa sổ bắt đầu tính toán lại độc lập.'
      },
      topicId: 'sql_window_ranking',
      difficulty: 'easy'
    }
  ]
};

export default lesson23;
