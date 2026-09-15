import { Lesson } from '../../../../types';

export const lesson14: Lesson = {
  id: 'pbi_lesson_14',
  moduleId: 'pbi_mod_5',
  levelId: 'advanced',
  courseId: 'powerbi',
  order: 14,
  topicId: 'semi_additive_measures',
  title: {
    en: 'Semi-Additive Measures, Account Intelligence & Snapshots',
    vi: 'Thước Đo Bán Cộng (Semi-Additive), Kế Toán Tài Chính & Dữ Liệu Điểm Thời Gian (Snapshots)'
  },
  summary: {
    en: 'Model non-additive and semi-additive balances: Closing inventory, bank balances, exchange rates using LASTDATE, CLOSINGBALANCEMONTH, and LASTNONBLANK.',
    vi: 'Mô hình hóa các số dư không thể cộng dồn theo thời gian: Tồn kho cuối kỳ, số dư tài khoản ngân hàng, tỷ giá dùng LASTDATE, CLOSINGBALANCEMONTH và LASTNONBLANK.'
  },
  estimatedMinutes: 16,
  learn: {
    introduction: {
      en: 'While standard transactional measures (like Revenue or Quantity Sold) are fully additive across all dimensions, financial account balances, inventory stock levels, and headcount numbers are "Semi-Additive". They can be added across products or stores, but NEVER summed across time. Aggregating bank balances across 30 days yields meaningless inflated numbers; instead, you must calculate the ending balance on the last active date of the period.',
      vi: 'Trong khi các chỉ số giao dịch thông thường (như Doanh thu, Số lượng bán) có tính chất cộng dồn hoàn toàn trên mọi chiều phân tích, thì số dư tài khoản ngân hàng, tồn kho kho bãi và định biên nhân sự lại là các chỉ số "Bán cộng" (Semi-Additive). Chúng có thể cộng tổng theo sản phẩm hoặc chi nhánh, nhưng TUYỆT ĐỐI KHÔNG được cộng dồn theo thời gian. Cộng số dư tài khoản qua 30 ngày sẽ tạo ra con số sai lệch vô nghĩa; thay vào đó, bạn phải lấy số dư tại ngày cuối cùng của kỳ phân tích.'
    },
    conceptExplanation: {
      en: 'Core Semi-Additive Modeling Techniques:\n1. Non-Additive vs Semi-Additive:\n   - Fully Additive: Sales Amount (Sums across Customers, Products, and Dates).\n   - Semi-Additive: Inventory Stock (Sums across Products/Warehouses, but takes closing snapshot across Dates).\n   - Non-Additive: Unit Price, Exchange Rate, Ratios (Never summed).\n2. Opening and Closing Balances:\n   - CLOSINGBALANCEMONTH([Measure], Dim_Calendar[Date]): Computes the closing balance on the month-end date.\n   - CLOSINGBALANCEYEAR([Measure], Dim_Calendar[Date]): Computes year-end closing balance.\n3. Handling Weekends and Missing Days (LASTNONBLANK):\n   - When stock snapshots are not recorded on weekends/holidays, LASTDATE may return blank. Use LASTNONBLANK(Dim_Calendar[Date], [StockMeasure]) to locate the most recent valid observation.',
      vi: 'Kỹ thuật mô hình hóa Semi-Additive cốt lõi:\n1. Phân loại tính chất cộng:\n   - Fully Additive: Doanh thu (Cộng dồn tự do theo Khách hàng, Sản phẩm và Thời gian).\n   - Semi-Additive: Tồn kho (Cộng được theo Sản phẩm/Kho hàng, nhưng phải lấy số dư thời điểm cuối theo Thời gian).\n   - Non-Additive: Đơn giá, Tỷ giá, Tỷ lệ phần trăm (Không được cộng tổng).\n2. Số dư đầu kỳ và cuối kỳ:\n   - CLOSINGBALANCEMONTH([Measure], Dim_Calendar[Date]): Lấy số dư tại ngày cuối cùng của tháng.\n   - CLOSINGBALANCEYEAR([Measure], Dim_Calendar[Date]): Lấy số dư tại ngày kết thúc năm tài chính.\n3. Xử lý ngày nghỉ và ngày không phát sinh dữ liệu (LASTNONBLANK):\n   - Khi không có dữ liệu chốt kho vào cuối tuần, LASTDATE có thể trả về trống. Hãy dùng LASTNONBLANK(Dim_Calendar[Date], [Measure]) để tìm ngày gần nhất có dữ liệu thực tế.'
    },
    syntax: '// 1. Basic Closing Inventory Stock:\nClosing Stock = \nCALCULATE(\n    SUM(Fact_Inventory[UnitsOnHand]),\n    LASTDATE(Dim_Calendar[Date])\n)\n\n// 2. Robust Closing Balance with LASTNONBLANKVALUE:\nClosing Bank Balance = \nCALCULATE(\n    SUM(Fact_AccountBalances[BalanceAmount]),\n    LASTNONBLANK(Dim_Calendar[Date], CALCULATE(COUNTROWS(Fact_AccountBalances)))\n)',
    examples: [
      {
        title: {
          en: 'Handling Non-Contiguous Inventory Snapshots with LASTNONBLANK',
          vi: 'Xử Lý Snapshot Tồn Kho Không Liên Tục Bằng LASTNONBLANK'
        },
        code: `// Ending Inventory Stock taking the latest recorded non-blank day:
Ending Inventory = 
VAR LastRecordDate = 
    CALCULATETABLE(
        LASTNONBLANK(
            Dim_Calendar[Date],
            CALCULATE(COUNTROWS(Fact_Inventory))
        )
    )
RETURN
    CALCULATE(
        SUM(Fact_Inventory[StockCount]),
        LastRecordDate
    )`,
        language: 'dax',
        explanation: {
          en: 'LASTNONBLANK scans backwards to find the last date containing inventory records, preventing nulls on weekends.',
          vi: 'LASTNONBLANK quét ngược thời gian để tìm ngày gần nhất có dữ liệu kiểm kê tồn kho, tránh bị trả về kết quả rỗng vào các ngày nghỉ cuối tuần.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Writing SUM(Fact_Inventory[UnitsOnHand]) on a monthly report and presenting the sum of all 30 days as total inventory.',
          vi: 'Viết SUM(Fact_Inventory[UnitsOnHand]) trên báo cáo tháng và hiển thị tổng cộng của cả 30 ngày làm tồn kho tháng.'
        },
        correction: {
          en: 'Always use LASTDATE, CLOSINGBALANCEMONTH, or LASTNONBLANK to report the point-in-time ending stock level.',
          vi: 'Luôn dùng LASTDATE, CLOSINGBALANCEMONTH hoặc LASTNONBLANK để báo cáo lượng tồn kho tại thời điểm chốt kỳ.'
        }
      },
      {
        mistake: {
          en: 'Using CLOSINGBALANCEMONTH without passing a marked contiguous Date table.',
          vi: 'Dùng hàm CLOSINGBALANCEMONTH mà không truyền vào bảng Date chuẩn đã được đánh dấu.'
        },
        correction: {
          en: 'All CLOSINGBALANCE* functions depend on an official contiguous Date table to resolve month-end and year-end boundaries.',
          vi: 'Mọi hàm CLOSINGBALANCE* đều dựa trên bảng Date chuẩn để xác định chính xác ngày kết thúc tháng và kết thúc năm.'
        }
      }
    ],
    tips: [
      {
        en: 'For opening balance calculations, use OPENINGBALANCEMONTH() or calculate the closing balance of the previous period using DATEADD(Dim_Calendar[Date], -1, MONTH).',
        vi: 'Đối với số dư đầu kỳ, dùng hàm OPENINGBALANCEMONTH() hoặc tính số dư cuối kỳ của tháng trước bằng DATEADD(Dim_Calendar[Date], -1, MONTH).'
      },
      {
        en: 'Distinguish Periodic Snapshot fact tables (daily closing balances) from Accumulating Snapshot fact tables (milestone dates across a fulfillment pipeline).',
        vi: 'Phân biệt rõ bảng Fact Snapshot định kỳ (chốt số dư cuối ngày) với Fact Snapshot tích lũy (theo dõi các mốc ngày trong quy trình xử lý đơn).'
      }
    ],
    practiceStarterCode: `// DAX Semi-Additive Ending Stock measure
Ending Inventory = CALCULATE(SUM(Fact_Inventory[UnitsOnHand]), LASTDATE(Dim_Calendar[Date]))`
  },
  exercisePool: [
    {
      id: 'pbi_ex_14_1',
      type: 'predict_output',
      title: {
        en: 'Classify Additive Nature of Inventory Metric',
        vi: 'Phân Loại Tính Chất Cộng Của Chỉ Số Tồn Kho'
      },
      instruction: {
        en: 'Is Warehouse Inventory Units a Fully Additive, Semi-Additive, or Non-Additive metric?',
        vi: 'Số lượng tồn kho trong kho bãi là chỉ số Fully Additive, Semi-Additive hay Non-Additive?'
      },
      starterCode: '// Choose metric classification',
      solutionCode: 'Semi-Additive (sums across warehouses and products, but takes snapshot across time)',
      options: [
        'Semi-Additive (sums across warehouses and products, but takes snapshot across time)',
        'Fully Additive (sums across all dimensions including time)',
        'Non-Additive (cannot be summed across any dimension)',
        'Qualitative Text only'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'Inventory can be aggregated across physical locations and product lines, but must evaluate point-in-time snapshots across time periods.',
        vi: 'Tồn kho có thể cộng tổng theo kho hàng và dòng sản phẩm, nhưng bắt buộc phải lấy giá trị thời điểm (snapshot) theo trục thời gian.'
      }
    },
    {
      id: 'pbi_ex_14_2',
      type: 'complete_code',
      title: {
        en: 'Write Closing Month Balance Measure',
        vi: 'Viết Measure Tính Số Dư Cuối Tháng'
      },
      instruction: {
        en: 'Complete the closing balance measure using CLOSINGBALANCEMONTH on Total Stock and Dim_Calendar[Date].',
        vi: 'Hoàn thiện measure số dư cuối tháng dùng CLOSINGBALANCEMONTH trên Total Stock và Dim_Calendar[Date].'
      },
      starterCode: 'Ending Stock Month = CLOSINGBALANCEMONTH([Total Stock], ___)',
      solutionCode: 'Ending Stock Month = CLOSINGBALANCEMONTH([Total Stock], Dim_Calendar[Date])',
      hint: {
        en: 'Dim_Calendar[Date]',
        vi: 'Dim_Calendar[Date]'
      },
      explanation: {
        en: 'CLOSINGBALANCEMONTH evaluates [Total Stock] on the last day of each month based on the calendar table.',
        vi: 'CLOSINGBALANCEMONTH tính toán [Total Stock] vào ngày cuối cùng của từng tháng dựa trên bảng lịch.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_14',
    title: {
      en: 'Architect the Complete Financial Account Balance Model',
      vi: 'Thiết Kế Mô Hình Số Dư Tài Khoản Kế Toán Hoàn Chỉnh'
    },
    description: {
      en: 'Write three DAX financial measures: Raw Balance Base, Month Ending Balance (CLOSINGBALANCEMONTH), and Year Ending Balance (CLOSINGBALANCEYEAR).',
      vi: 'Xây dựng 3 measure tài chính DAX: Số dư thô cơ sở, Số dư cuối tháng (CLOSINGBALANCEMONTH) và Số dư cuối năm (CLOSINGBALANCEYEAR).'
    },
    requirements: [
      { en: '1. Total Balance = SUM(Fact_Balances[Amount])', vi: '1. Total Balance = SUM(Fact_Balances[Amount])' },
      { en: '2. Closing Balance Month = CLOSINGBALANCEMONTH([Total Balance], Dim_Calendar[Date])', vi: '2. Closing Balance Month = CLOSINGBALANCEMONTH([Total Balance], Dim_Calendar[Date])' },
      { en: '3. Closing Balance Year = CLOSINGBALANCEYEAR([Total Balance], Dim_Calendar[Date])', vi: '3. Closing Balance Year = CLOSINGBALANCEYEAR([Total Balance], Dim_Calendar[Date])' }
    ],
    starterCode: `Total Balance = SUM(Fact_Balances[Amount])
Closing Balance Month = CLOSINGBALANCEMONTH([Total Balance], Dim_Calendar[Date])
Closing Balance Year = CLOSINGBALANCEYEAR([Total Balance], Dim_Calendar[Date])`,
    solutionCode: `Total Balance = SUM(Fact_Balances[Amount])
Closing Balance Month = CLOSINGBALANCEMONTH([Total Balance], Dim_Calendar[Date])
Closing Balance Year = CLOSINGBALANCEYEAR([Total Balance], Dim_Calendar[Date])`,
    hints: [
      {
        en: 'CLOSINGBALANCE functions encapsulate CALCULATE and end-of-period date filters automatically.',
        vi: 'Các hàm CLOSINGBALANCE tự động bao bọc CALCULATE và bộ lọc ngày cuối kỳ tương ứng.'
      }
    ],
    solutionExplanation: {
      en: 'This financial modeling architecture provides accurate balance sheets and inventory valuations without distorted multi-day summations.',
      vi: 'Kiến trúc mô hình tài chính này đảm bảo bảng cân đối kế toán và định giá tồn kho chính xác mà không bị sai lệch do cộng dồn nhiều ngày.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_14_1',
      type: 'single_choice',
      question: {
        en: 'What characterizes a "Semi-Additive" measure in business intelligence?',
        vi: 'Đặc điểm nhận diện của một chỉ số "Bán cộng" (Semi-Additive) trong Business Intelligence là gì?'
      },
      options: [
        {
          en: 'It can be summed across certain dimensions (like Products or Locations), but cannot be summed across the Time dimension',
          vi: 'Có thể cộng dồn theo một số chiều (như Sản phẩm hoặc Địa điểm), nhưng không thể cộng dồn theo chiều Thời gian'
        },
        {
          en: 'It is a number that is divided by 2 before display',
          vi: 'Là số luôn bị chia đôi trước khi hiển thị'
        },
        {
          en: 'It can only store negative numbers',
          vi: 'Chỉ có thể lưu số âm'
        },
        {
          en: 'It is a measure written in Python rather than DAX',
          vi: 'Là measure viết bằng Python thay vì DAX'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Semi-additive measures (bank accounts, inventory, headcount) are additive across entities but represent point-in-time snapshots over time.',
        vi: 'Chỉ số bán cộng (tài khoản ngân hàng, tồn kho, định biên nhân sự) cộng được theo thực thể nhưng đại diện cho trạng thái thời điểm theo thời gian.'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_14_2',
      type: 'single_choice',
      question: {
        en: 'Which DAX function calculates the value of a measure on the very last day of the currently filtered month?',
        vi: 'Hàm DAX nào tính giá trị của một measure vào đúng ngày cuối cùng của tháng đang được lọc?'
      },
      options: [
        { en: 'CLOSINGBALANCEMONTH()', vi: 'CLOSINGBALANCEMONTH()' },
        { en: 'MONTH_SUM()', vi: 'MONTH_SUM()' },
        { en: 'END_RECORD()', vi: 'END_RECORD()' },
        { en: 'SNAPSHOT_AGG()', vi: 'SNAPSHOT_AGG()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CLOSINGBALANCEMONTH(Expression, DateColumn, [Filter]) evaluates the expression on the month-end calendar date.',
        vi: 'CLOSINGBALANCEMONTH(Expression, DateColumn, [Filter]) tính toán biểu thức vào ngày kết thúc tháng theo bảng lịch.'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_14_3',
      type: 'single_choice',
      question: {
        en: 'When inventory snapshots are recorded only on business days and Sunday is the last day of the month, what function helps retrieve the last available business day?',
        vi: 'Khi dữ liệu tồn kho chỉ ghi nhận vào ngày làm việc và Chủ Nhật là ngày cuối tháng, hàm nào giúp lấy ngày làm việc gần nhất có dữ liệu?'
      },
      options: [
        { en: 'LASTNONBLANK() or LASTNONBLANKVALUE()', vi: 'LASTNONBLANK() hoặc LASTNONBLANKVALUE()' },
        { en: 'RANDOM()', vi: 'RANDOM()' },
        { en: 'SKIP_WEEKENDS()', vi: 'SKIP_WEEKENDS()' },
        { en: 'TRUNCATE()', vi: 'TRUNCATE()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LASTNONBLANK scans backwards in the calendar to find the latest date where the test expression is not blank.',
        vi: 'LASTNONBLANK quét lùi theo lịch để tìm ngày muộn nhất mà biểu thức kiểm tra không bị rỗng (blank).'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_14_4',
      type: 'true_false',
      question: {
        en: 'Summing daily bank balances across all 31 days in January gives the correct total cash balance for January.',
        vi: 'Cộng dồn số dư ngân hàng hàng ngày qua tất cả 31 ngày trong Tháng 1 sẽ cho ra tổng số dư tiền mặt chính xác của Tháng 1.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Bank balances are semi-additive point-in-time snapshots; summing daily balances produces a 31x inflated meaningless number.',
        vi: 'Sai. Số dư ngân hàng là chỉ số bán cộng theo thời điểm; cộng dồn 31 ngày sẽ thổi phồng con số lên gấp 31 lần và hoàn toàn vô nghĩa.'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_14_5',
      type: 'predict_output',
      question: {
        en: 'What does the DAX measure: Ending Headcount = CALCULATE(COUNTROWS(Dim_Employees), LASTDATE(Dim_Calendar[Date])) evaluate?',
        vi: 'Measure DAX: Ending Headcount = CALCULATE(COUNTROWS(Dim_Employees), LASTDATE(Dim_Calendar[Date])) tính ra giá trị gì?'
      },
      options: [
        {
          en: 'The number of active employees on the last date of the selected time period',
          vi: 'Số lượng nhân viên đang hoạt động tại ngày cuối cùng của khoảng thời gian được chọn'
        },
        {
          en: 'The sum of all employee salaries',
          vi: 'Tổng lương của tất cả nhân viên'
        },
        {
          en: 'The number of employees hired 10 years ago',
          vi: 'Số nhân viên được tuyển cách đây 10 năm'
        },
        {
          en: 'Zero for all dates',
          vi: 'Bằng 0 cho mọi ngày'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LASTDATE filters the employee count evaluation to the exact final day of the period.',
        vi: 'LASTDATE giới hạn phép đếm nhân viên chính xác vào ngày cuối cùng của kỳ phân tích.'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_14_6',
      type: 'single_choice',
      question: {
        en: 'What is the difference between a Periodic Snapshot fact table and an Accumulating Snapshot fact table?',
        vi: 'Điểm khác biệt giữa bảng Fact Snapshot định kỳ và Fact Snapshot tích lũy là gì?'
      },
      options: [
        {
          en: 'Periodic snapshots record point-in-time status at regular intervals (daily/monthly); Accumulating snapshots record multiple milestone dates across a lifecycle workflow',
          vi: 'Periodic snapshot ghi lại trạng thái định kỳ đều đặn (hàng ngày/tháng); Accumulating snapshot ghi nhận nhiều mốc ngày hoàn thành trong quy trình vòng đời'
        },
        {
          en: 'Periodic snapshots cannot use relationships; Accumulating snapshots have no columns',
          vi: 'Periodic snapshot không dùng quan hệ; Accumulating snapshot không có cột'
        },
        {
          en: 'There is no difference; both terms mean the exact same thing',
          vi: 'Không có điểm khác biệt; hai thuật ngữ giống hệt nhau'
        },
        {
          en: 'Periodic snapshots are only supported in MySQL',
          vi: 'Periodic snapshot chỉ hỗ trợ trong MySQL'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Periodic snapshots capture regular interval balances (e.g. daily bank balance); accumulating snapshots track milestone stages (e.g. order placed -> packed -> shipped -> delivered).',
        vi: 'Periodic snapshot chốt số dư theo chu kỳ (như số dư cuối ngày); accumulating snapshot theo dõi các mốc quy trình (như đặt hàng -> đóng gói -> xuất kho -> giao hàng).'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_14_7',
      type: 'true_false',
      question: {
        en: 'OPENINGBALANCEMONTH([Measure], Dim_Calendar[Date]) calculates the opening balance on the first calendar day of the month.',
        vi: 'Hàm OPENINGBALANCEMONTH([Measure], Dim_Calendar[Date]) tính số dư đầu kỳ vào ngày đầu tiên của tháng.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. OPENINGBALANCEMONTH evaluates the measure at the start-of-month date boundary.',
        vi: 'Đúng. OPENINGBALANCEMONTH tính toán giá trị measure tại mốc ngày đầu tiên của tháng.'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_14_8',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following business metrics are examples of Semi-Additive measures? (Select all that apply)',
        vi: 'Những chỉ số kinh doanh nào sau đây là ví dụ điển hình của thước đo Bán cộng (Semi-Additive)? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Warehouse Inventory On Hand', vi: 'Số lượng tồn kho trong kho bãi' },
        { en: 'Bank Account Balance', vi: 'Số dư tài khoản ngân hàng' },
        { en: 'Active Company Headcount', vi: 'Định biên nhân sự đang làm việc' },
        { en: 'Total Sales Revenue ($)', vi: 'Tổng doanh thu bán hàng ($)' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Inventory, Bank Balances, and Headcount are semi-additive. Total Sales Revenue is fully additive across all dimensions.',
        vi: 'Tồn kho, Số dư ngân hàng và Định biên nhân sự là semi-additive. Doanh thu bán hàng là fully additive.'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_14_9',
      type: 'single_choice',
      question: {
        en: 'Which DAX function returns a single-row table containing the latest date in the current filter context?',
        vi: 'Hàm DAX nào trả về một bảng gồm đúng 1 dòng chứa ngày muộn nhất trong ngữ cảnh bộ lọc hiện tại?'
      },
      options: [
        { en: 'LASTDATE()', vi: 'LASTDATE()' },
        { en: 'ENDDATE()', vi: 'ENDDATE()' },
        { en: 'LATEST_DAY()', vi: 'LATEST_DAY()' },
        { en: 'MAX_CALENDAR()', vi: 'MAX_CALENDAR()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LASTDATE(DateColumn) returns a single-column, single-row table containing the maximum date in context, making it directly usable as a CALCULATE filter.',
        vi: 'LASTDATE(DateColumn) trả về bảng 1 cột 1 dòng chứa ngày lớn nhất trong ngữ cảnh, có thể dùng trực tiếp làm bộ lọc trong CALCULATE.'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_14_10',
      type: 'predict_output',
      question: {
        en: 'What does CLOSINGBALANCEYEAR([Total Stock], Dim_Calendar[Date], "03-31") compute?',
        vi: 'Hàm CLOSINGBALANCEYEAR([Total Stock], Dim_Calendar[Date], "03-31") tính giá trị gì?'
      },
      options: [
        {
          en: 'Calculates the ending stock balance on March 31st for a fiscal year ending on March 31st',
          vi: 'Tính số dư tồn kho cuối kỳ vào ngày 31 tháng 3 cho năm tài chính kết thúc vào ngày 31/3'
        },
        {
          en: 'Calculates stock on December 31st',
          vi: 'Tính tồn kho vào ngày 31 tháng 12'
        },
        {
          en: 'Deletes all inventory records on March 31st',
          vi: 'Xóa toàn bộ bản ghi tồn kho vào ngày 31/3'
        },
        {
          en: 'Returns the average stock across 31 days',
          vi: 'Trả về tồn kho trung bình qua 31 ngày'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The "03-31" argument designates March 31st as the custom fiscal year end boundary.',
        vi: 'Tham số "03-31" chỉ định ngày 31 tháng 3 là ngày kết thúc năm tài chính tùy biến.'
      },
      topicId: 'semi_additive_measures',
      difficulty: 'medium'
    }
  ]
};

export default lesson14;
