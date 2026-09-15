import { Lesson } from '../../../../types';

export const lesson13: Lesson = {
  id: 'pbi_lesson_13',
  moduleId: 'pbi_mod_4',
  levelId: 'intermediate',
  courseId: 'powerbi',
  order: 13,
  topicId: 'dax_time_intelligence',
  title: {
    en: 'Time Intelligence: YTD, MTD, QTD, DATEADD & SAMEPERIODLASTYEAR',
    vi: 'Phân Tích Thời Gian (Time Intelligence): YTD, MTD, QTD, DATEADD & SAMEPERIODLASTYEAR'
  },
  summary: {
    en: 'Calculate Year-to-Date (YTD), Month-to-Date (MTD), Year-over-Year (YoY) growth, and historical shifts using DATEADD and SAMEPERIODLASTYEAR.',
    vi: 'Tính toán lũy kế đầu năm đến nay (YTD), đầu tháng (MTD), tăng trưởng cùng kỳ năm trước (YoY) và dịch chuyển kỳ bằng DATEADD và SAMEPERIODLASTYEAR.'
  },
  estimatedMinutes: 16,
  learn: {
    introduction: {
      en: 'Time Intelligence functions allow you to manipulate time filter contexts to calculate cumulative totals (Year-to-Date, Quarter-to-Date, Month-to-Date), compare current performance against historical periods (Year-over-Year, Month-over-Month), and compute rolling moving averages. All time intelligence functions require a marked, contiguous Date table.',
      vi: 'Các hàm Phân tích Thời gian (Time Intelligence) cho phép bạn điều khiển ngữ cảnh bộ lọc ngày để tính toán tổng lũy kế (Đầu năm đến nay - YTD, Đầu quý - QTD, Đầu tháng - MTD), so sánh hiệu quả hiện tại với các kỳ quá khứ (Cùng kỳ năm trước - YoY, Tháng trước - MoM), và tính trung bình trượt. Mọi hàm time intelligence đều bắt buộc phải hoạt động trên một bảng Ngày liên tục đã được đánh dấu.'
    },
    conceptExplanation: {
      en: 'Core Time Intelligence Functions & Patterns:\n1. Cumulative Aggregations:\n   - TOTALYTD([Measure], Dim_Calendar[Date]): Cumulative total from Jan 1st up to current date.\n   - TOTALQTD, TOTALMTD: Cumulative totals for quarter and month.\n2. Prior Period Comparisons:\n   - SAMEPERIODLASTYEAR(Dim_Calendar[Date]): Shifts current date filter exactly one year back.\n   - DATEADD(Dim_Calendar[Date], -1, MONTH / YEAR / QUARTER): Shifts dates backwards or forwards by N units.\n3. Year-over-Year (YoY) Growth Pattern:\n   - Sales YoY Growth $ = [Total Sales] - [Sales Prior Year]\n   - Sales YoY Growth % = DIVIDE([Sales YoY Growth $], [Sales Prior Year], 0)',
      vi: 'Các hàm và mẫu hình Time Intelligence cốt lõi:\n1. Tính lũy kế cộng dồn (Cumulative):\n   - TOTALYTD([Measure], Dim_Calendar[Date]): Lũy kế từ ngày 1/1 đến ngày hiện tại.\n   - TOTALQTD, TOTALMTD: Lũy kế theo quý và theo tháng.\n2. So sánh với kỳ trước (Prior Period):\n   - SAMEPERIODLASTYEAR(Dim_Calendar[Date]): Dịch chuyển tập ngày hiện tại lùi đúng 1 năm trước.\n   - DATEADD(Dim_Calendar[Date], -1, MONTH / YEAR / QUARTER): Dịch chuyển ngày tiến hoặc lùi N đơn vị (Tháng/Năm/Quý).\n3. Mẫu tính tăng trưởng cùng kỳ (YoY Growth):\n   - Doanh thu Tăng trưởng YoY $ = [Total Sales] - [Sales Prior Year]\n   - Tỷ lệ Tăng trưởng YoY % = DIVIDE([Doanh thu Tăng trưởng YoY $], [Sales Prior Year], 0)'
    },
    syntax: '// 1. Year-to-Date Calculation:\nSales YTD = TOTALYTD([Total Sales], Dim_Calendar[Date])\n\n// 2. Prior Year Sales:\nSales SPLY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dim_Calendar[Date]))\n\n// 3. Year-over-Year % Growth:\nSales YoY % = \nVAR CurrentSales = [Total Sales]\nVAR PriorSales = [Sales SPLY]\nVAR Difference = CurrentSales - PriorSales\nRETURN\n    DIVIDE(Difference, PriorSales, 0)',
    examples: [
      {
        title: {
          en: 'Year-over-Year Analysis with DATEADD and SAMEPERIODLASTYEAR',
          vi: 'Phân Tích Tăng Trưởng Cùng Kỳ Với DATEADD & SAMEPERIODLASTYEAR'
        },
        code: `// Previous Month Sales using DATEADD:
Sales Previous Month = 
CALCULATE(
    [Total Sales],
    DATEADD(Dim_Calendar[Date], -1, MONTH)
)

// Month-over-Month Growth %:
Sales MoM Growth % = 
VAR CurrentMonth = [Total Sales]
VAR PrevMonth = [Sales Previous Month]
RETURN
    DIVIDE(CurrentMonth - PrevMonth, PrevMonth, 0)`,
        language: 'dax',
        explanation: {
          en: 'DATEADD shifts the active date selection by minus one month, allowing month-over-month percentage growth calculations.',
          vi: 'DATEADD lùi tập ngày đang chọn đi 1 tháng, cho phép tính toán tỷ lệ tăng trưởng phần trăm theo từng tháng liên tiếp.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Passing Fact_Sales[OrderDate] instead of Dim_Calendar[Date] into Time Intelligence functions.',
          vi: 'Truyền cột Fact_Sales[OrderDate] thay vì Dim_Calendar[Date] vào các hàm Time Intelligence.'
        },
        correction: {
          en: 'Always pass the primary Date column from your dedicated Dim_Calendar dimension table into Time Intelligence functions to ensure contiguous date ranges.',
          vi: 'Luôn truyền cột Date chính từ bảng Dim_Calendar chuyên dụng vào các hàm Time Intelligence để đảm bảo tính liên tục của chuỗi ngày.'
        }
      },
      {
        mistake: {
          en: 'Not using DIVIDE when calculating percentage growth, resulting in #ERROR on new product launches with zero prior-year sales.',
          vi: 'Không dùng hàm DIVIDE khi tính tỷ lệ tăng trưởng %, gây lỗi hiển thị khi sản phẩm mới ra mắt chưa có doanh số năm trước.'
        },
        correction: {
          en: 'Wrap growth calculations in DIVIDE(Difference, PriorSales, 0) to return clean blanks or 0 when prior sales are missing.',
          vi: 'Luôn bọc công thức trong DIVIDE(ChênhLệch, DoanhSốKỳTrước, 0) để trả về 0 hoặc khoảng trống an toàn khi kỳ trước chưa có dữ liệu.'
        }
      }
    ],
    tips: [
      {
        en: 'Use DATESINPERIOD() to create dynamic rolling calculations such as "Rolling 12 Months Revenue" or "Rolling 30 Days Average".',
        vi: 'Dùng hàm DATESINPERIOD() để tạo các phép tính trượt linh hoạt như "Doanh thu 12 tháng gần nhất" hoặc "Trung bình trượt 30 ngày".'
      },
      {
        en: 'Always organize time intelligence measures into dedicated display folders (e.g. "YTD Metrics", "YoY Comparisons") in Model View.',
        vi: 'Luôn tổ chức các measure thời gian vào các thư mục hiển thị (Display Folders như "YTD Metrics", "YoY Comparisons") trong Model View.'
      }
    ],
    practiceStarterCode: `// DAX Time Intelligence measure for YTD Sales
Sales YTD = TOTALYTD(SUM(Fact_Sales[Revenue]), Dim_Calendar[Date])`
  },
  exercisePool: [
    {
      id: 'pbi_ex_13_1',
      type: 'predict_output',
      title: {
        en: 'SAMEPERIODLASTYEAR Context Shift',
        vi: 'Dịch Chuyển Ngữ Cảnh Của SAMEPERIODLASTYEAR'
      },
      instruction: {
        en: 'If the active visual filter context is March 2024, what date range does SAMEPERIODLASTYEAR(Dim_Calendar[Date]) return?',
        vi: 'Nếu bộ lọc đang chọn là Tháng 3 Năm 2024, hàm SAMEPERIODLASTYEAR(Dim_Calendar[Date]) sẽ trả về khoảng ngày nào?'
      },
      starterCode: '// Choose date range',
      solutionCode: 'March 1, 2023 to March 31, 2023',
      options: [
        'March 1, 2023 to March 31, 2023',
        'January 1, 2024 to March 31, 2024',
        'February 1, 2024 to February 28, 2024',
        'December 1, 2023 to December 31, 2023'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'SAMEPERIODLASTYEAR shifts the current date selection exactly one full year into the past (March 2024 -> March 2023).',
        vi: 'SAMEPERIODLASTYEAR dịch chuyển tập ngày đang được lọc lùi đúng 1 năm về quá khứ (Tháng 3/2024 -> Tháng 3/2023).'
      }
    },
    {
      id: 'pbi_ex_13_2',
      type: 'complete_code',
      title: {
        en: 'Write YoY Sales Growth Measure',
        vi: 'Viết Measure Tăng Trưởng Doanh Thu YoY'
      },
      instruction: {
        en: 'Complete the YoY Growth % formula using DIVIDE on the difference between [Total Sales] and [Sales SPLY].',
        vi: 'Hoàn thiện công thức YoY Growth % dùng hàm DIVIDE trên độ chênh lệch giữa [Total Sales] và [Sales SPLY].'
      },
      starterCode: 'YoY Growth % = DIVIDE([Total Sales] - [Sales SPLY], ___, 0)',
      solutionCode: 'YoY Growth % = DIVIDE([Total Sales] - [Sales SPLY], [Sales SPLY], 0)',
      hint: {
        en: '[Sales SPLY]',
        vi: '[Sales SPLY]'
      },
      explanation: {
        en: 'YoY % is calculated by dividing (Current Sales - Prior Sales) by Prior Sales ([Sales SPLY]).',
        vi: 'Tỷ lệ % YoY được tính bằng (Doanh số hiện tại - Doanh số cùng kỳ) chia cho Doanh số cùng kỳ ([Sales SPLY]).'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_13',
    title: {
      en: 'Implement Complete Time Intelligence Measure Suite',
      vi: 'Xây Dựng Toàn Diện Bộ Chỉ Số Phân Tích Thời Gian'
    },
    description: {
      en: 'Write the executive Time Intelligence DAX suite: Total Sales, Sales YTD, Sales Prior Year, and Sales YoY Growth %.',
      vi: 'Viết bộ measure DAX phân tích thời gian cho ban giám đốc: Total Sales, Sales YTD, Sales Prior Year và Sales YoY Growth %.'
    },
    requirements: [
      { en: '1. Total Sales = SUM(Fact_Sales[Revenue])', vi: '1. Total Sales = SUM(Fact_Sales[Revenue])' },
      { en: '2. Sales YTD = TOTALYTD([Total Sales], Dim_Calendar[Date])', vi: '2. Sales YTD = TOTALYTD([Total Sales], Dim_Calendar[Date])' },
      { en: '3. Sales SPLY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dim_Calendar[Date]))', vi: '3. Sales SPLY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dim_Calendar[Date]))' },
      { en: '4. Sales YoY Growth % = DIVIDE([Total Sales] - [Sales SPLY], [Sales SPLY], 0)', vi: '4. Sales YoY Growth % = DIVIDE([Total Sales] - [Sales SPLY], [Sales SPLY], 0)' }
    ],
    starterCode: `Total Sales = SUM(Fact_Sales[Revenue])
Sales YTD = TOTALYTD([Total Sales], Dim_Calendar[Date])
Sales SPLY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dim_Calendar[Date]))
Sales YoY Growth % = DIVIDE([Total Sales] - [Sales SPLY], [Sales SPLY], 0)`,
    solutionCode: `Total Sales = SUM(Fact_Sales[Revenue])
Sales YTD = TOTALYTD([Total Sales], Dim_Calendar[Date])
Sales SPLY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dim_Calendar[Date]))
Sales YoY Growth % = DIVIDE([Total Sales] - [Sales SPLY], [Sales SPLY], 0)`,
    hints: [
      {
        en: 'Time intelligence functions cleanly build upon the base [Total Sales] measure.',
        vi: 'Các hàm phân tích thời gian được xây dựng một cách thanh thoát trên measure cơ sở [Total Sales].'
      }
    ],
    solutionExplanation: {
      en: 'This time intelligence suite enables executive trend charts, monthly KPI comparisons, and cumulative year-to-date tracking.',
      vi: 'Bộ chỉ số thời gian này giúp tạo biểu đồ xu hướng điều hành, so sánh KPI theo tháng và theo dõi tiến độ lũy kế năm.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_13_1',
      type: 'single_choice',
      question: {
        en: 'Which DAX function calculates the cumulative total of a measure from January 1st of the current year up to the current date?',
        vi: 'Hàm DAX nào tính tổng lũy kế của một measure từ ngày 1 tháng 1 của năm hiện tại đến ngày đang chọn?'
      },
      options: [
        { en: 'TOTALYTD()', vi: 'TOTALYTD()' },
        { en: 'TOTALMTD()', vi: 'TOTALMTD()' },
        { en: 'CUMULATE_YEAR()', vi: 'CUMULATE_YEAR()' },
        { en: 'SUM_ANNUAL()', vi: 'SUM_ANNUAL()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'TOTALYTD(Expression, DateColumn, [Filter], [YearEndDate]) evaluates the cumulative year-to-date total.',
        vi: 'TOTALYTD(Expression, DateColumn, [Filter], [YearEndDate]) tính toán tổng lũy kế từ đầu năm đến ngày hiện tại.'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_13_2',
      type: 'single_choice',
      question: {
        en: 'Which function shifts the active date selection exactly one year into the past to compare current performance against last year?',
        vi: 'Hàm nào dịch chuyển tập ngày đang lọc lùi đúng 1 năm về trước để so sánh hiệu quả hiện tại với năm trước?'
      },
      options: [
        { en: 'SAMEPERIODLASTYEAR()', vi: 'SAMEPERIODLASTYEAR()' },
        { en: 'PREVIOUSDAY()', vi: 'PREVIOUSDAY()' },
        { en: 'LASTYEAR()', vi: 'LASTYEAR()' },
        { en: 'PAST_MONTH()', vi: 'PAST_MONTH()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SAMEPERIODLASTYEAR(DateColumn) returns a table of dates shifted one year back, commonly used inside CALCULATE.',
        vi: 'SAMEPERIODLASTYEAR(DateColumn) trả về một bảng gồm các ngày bị lùi 1 năm, thường dùng làm tham số lọc trong CALCULATE.'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_13_3',
      type: 'single_choice',
      question: {
        en: 'What function can shift dates by an arbitrary number of intervals (e.g. -3 MONTH, +1 YEAR, -2 QUARTER)?',
        vi: 'Hàm nào có thể dịch chuyển ngày theo một khoảng thời gian tùy ý (như -3 THÁNG, +1 NĂM, -2 QUÝ)?'
      },
      options: [
        { en: 'DATEADD()', vi: 'DATEADD()' },
        { en: 'SHIFTDATE()', vi: 'SHIFTDATE()' },
        { en: 'TIMEOFFSET()', vi: 'TIMEOFFSET()' },
        { en: 'INTERVAL_ADD()', vi: 'INTERVAL_ADD()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DATEADD(DateColumn, NumberOfIntervals, Interval) shifts dates by DAY, MONTH, QUARTER, or YEAR.',
        vi: 'DATEADD(DateColumn, NumberOfIntervals, Interval) dịch chuyển ngày theo các đơn vị DAY, MONTH, QUARTER hoặc YEAR.'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_13_4',
      type: 'true_false',
      question: {
        en: 'Time intelligence functions can be used reliably without a dedicated, unbroken Date dimension table.',
        vi: 'Các hàm Time Intelligence có thể hoạt động ổn định và tin cậy mà không cần một bảng chiều Ngày liên tục chuyên dụng.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Time Intelligence functions strictly require a contiguous Date table without missing calendar days.',
        vi: 'Sai. Các hàm Time Intelligence bắt buộc phải có một bảng Ngày liên tục không được khuyết thiếu bất kỳ ngày nào.'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_13_5',
      type: 'predict_output',
      question: {
        en: 'If [Total Sales] is $120,000 and [Sales SPLY] is $100,000, what does DIVIDE([Total Sales] - [Sales SPLY], [Sales SPLY], 0) return?',
        vi: 'Nếu [Total Sales] là $120,000 và [Sales SPLY] là $100,000, công thức DIVIDE([Total Sales] - [Sales SPLY], [Sales SPLY], 0) trả về kết quả gì?'
      },
      options: [
        { en: '0.20 (or 20.0%)', vi: '0.20 (tức 20.0%)' },
        { en: '1.20', vi: '1.20' },
        { en: '$20,000', vi: '$20,000' },
        { en: '0.83', vi: '0.83' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '($120,000 - $100,000) / $100,000 = $20,000 / $100,000 = 0.20 (+20% YoY growth).',
        vi: '($120,000 - $100,000) / $100,000 = $20,000 / $100,000 = 0.20 (tăng trưởng cùng kỳ +20%).'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_13_6',
      type: 'single_choice',
      question: {
        en: 'Which DAX function calculates a dynamic rolling total over the previous N periods (e.g. rolling last 12 months)?',
        vi: 'Hàm DAX nào tính tổng trượt linh hoạt trong N khoảng thời gian gần nhất (như trượt 12 tháng gần đây)?'
      },
      options: [
        { en: 'DATESINPERIOD()', vi: 'DATESINPERIOD()' },
        { en: 'ROLLING_SUM()', vi: 'ROLLING_SUM()' },
        { en: 'MOVING_WINDOW()', vi: 'MOVING_WINDOW()' },
        { en: 'DATE_ACCUMULATE()', vi: 'DATE_ACCUMULATE()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DATESINPERIOD(DateColumn, StartDate, NumberOfIntervals, Interval) returns a table of dates for rolling periods (e.g. -12 MONTH).',
        vi: 'DATESINPERIOD(DateColumn, StartDate, NumberOfIntervals, Interval) trả về bảng các ngày trong khoảng thời gian trượt (ví dụ: -12 MONTH).'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_13_7',
      type: 'single_choice',
      question: {
        en: 'How can you compute Quarter-to-Date sales in DAX?',
        vi: 'Làm thế nào để tính doanh thu lũy kế từ đầu quý đến nay (QTD) trong DAX?'
      },
      options: [
        { en: 'TOTALQTD([Total Sales], Dim_Calendar[Date])', vi: 'TOTALQTD([Total Sales], Dim_Calendar[Date])' },
        { en: 'TOTALMTD([Total Sales], 3)', vi: 'TOTALMTD([Total Sales], 3)' },
        { en: 'SUM_QUARTER(Fact_Sales[Revenue])', vi: 'SUM_QUARTER(Fact_Sales[Revenue])' },
        { en: 'DIVIDE([Total Sales], 4)', vi: 'DIVIDE([Total Sales], 4)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'TOTALQTD evaluates the cumulative metric from the first day of the active quarter up to the current date.',
        vi: 'TOTALQTD tính toán chỉ số lũy kế từ ngày đầu tiên của quý đang chọn cho đến ngày hiện tại.'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_13_8',
      type: 'true_false',
      question: {
        en: 'TOTALYTD([Total Sales], Dim_Calendar[Date], "06-30") calculates Year-to-Date sales for a Fiscal Year ending on June 30th.',
        vi: 'TOTALYTD([Total Sales], Dim_Calendar[Date], "06-30") tính doanh thu YTD cho một Năm Tài Chính kết thúc vào ngày 30 tháng 6.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. The optional YearEndDate parameter allows configuring non-standard fiscal calendars in TOTALYTD.',
        vi: 'Đúng. Tham số tùy chọn YearEndDate cho phép thiết lập năm tài chính kết thúc vào ngày bất kỳ trong TOTALYTD.'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_13_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid Time Intelligence functions in DAX? (Select all that apply)',
        vi: 'Những hàm nào sau đây là các hàm Time Intelligence hợp lệ trong DAX? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'TOTALYTD', vi: 'TOTALYTD' },
        { en: 'SAMEPERIODLASTYEAR', vi: 'SAMEPERIODLASTYEAR' },
        { en: 'DATEADD', vi: 'DATEADD' },
        { en: 'PARALLELPERIOD', vi: 'PARALLELPERIOD' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'TOTALYTD, SAMEPERIODLASTYEAR, DATEADD, and PARALLELPERIOD are all built-in DAX Time Intelligence functions.',
        vi: 'TOTALYTD, SAMEPERIODLASTYEAR, DATEADD và PARALLELPERIOD đều là các hàm Time Intelligence có sẵn trong DAX.'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_13_10',
      type: 'predict_output',
      question: {
        en: 'What does CALCULATE([Total Sales], DATEADD(Dim_Calendar[Date], -1, MONTH)) evaluate when viewed in a monthly visual row for May 2024?',
        vi: 'Biểu thức CALCULATE([Total Sales], DATEADD(Dim_Calendar[Date], -1, MONTH)) tính ra giá trị gì khi xem ở dòng Tháng 5/2024 trong biểu đồ?'
      },
      options: [
        {
          en: 'The Total Sales for the previous month: April 2024',
          vi: 'Tổng doanh số của tháng trước đó: Tháng 4/2024'
        },
        {
          en: 'The Total Sales for May 2023',
          vi: 'Tổng doanh số của Tháng 5/2023'
        },
        {
          en: 'The average sales of the year',
          vi: 'Doanh số trung bình của cả năm'
        },
        {
          en: 'A blank zero',
          vi: 'Giá trị 0 trống'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DATEADD with -1 MONTH shifts the filter context from May 2024 back by one month to April 2024.',
        vi: 'DATEADD với tham số -1 MONTH dịch chuyển ngữ cảnh lọc từ Tháng 5/2024 lùi 1 tháng về Tháng 4/2024.'
      },
      topicId: 'dax_time_intelligence',
      difficulty: 'easy'
    }
  ]
};

export default lesson13;
