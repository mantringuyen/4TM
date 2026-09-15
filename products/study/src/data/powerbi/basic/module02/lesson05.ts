import { Lesson } from '../../../../types';

export const lesson05: Lesson = {
  id: 'pbi_lesson_5',
  moduleId: 'pbi_mod_2',
  levelId: 'basic',
  courseId: 'powerbi',
  order: 5,
  topicId: 'core_visualizations',
  title: {
    en: 'Core Visualizations: Charts, Cards, Tables, Matrix & KPI',
    vi: 'Trực Quan Hóa Cốt Lõi: Biểu Đồ, Thẻ Chỉ Số, Bảng Dữ Liệu, Ma Trận & KPI'
  },
  summary: {
    en: 'Select and format essential visual components: Bar/Column charts, Line trends, Cards, Matrix grids, and conditional formatting.',
    vi: 'Lựa chọn và định dạng các biểu đồ chuẩn: Biểu đồ cột/thanh, xu hướng đường, thẻ Card, ma trận Matrix và định dạng có điều kiện.'
  },
  estimatedMinutes: 14,
  learn: {
    introduction: {
      en: 'Visual design in Power BI bridges analytical data models with human decision-making. Choosing the appropriate visual type ensures clear cognitive communication: Bar charts compare discrete categories, Line charts display continuous time-series trends, Card visuals highlight high-impact executive KPIs, and Matrix tables display multi-dimensional cross-tabulated breakdowns.',
      vi: 'Thiết kế trực quan trong Power BI là cầu nối giữa mô hình dữ liệu phân tích với các quyết định kinh doanh. Lựa chọn đúng loại biểu đồ giúp truyền tải thông tin mạch lạc: Biểu đồ thanh so sánh các danh mục rời rạc, biểu đồ đường thể hiện xu hướng theo thời gian, thẻ Card làm nổi bật chỉ số KPI điều hành, và bảng Matrix hiển thị phân rã đa chiều.'
    },
    conceptExplanation: {
      en: 'Core visual archetypes and best practices:\n1. Card & New Card: Prominently display scalar single-value measures (e.g. Total Revenue, YoY Growth).\n2. Clustered vs Stacked Bar Charts: Use horizontal bars for long category names; avoid stacking more than 3 series.\n3. Line & Area Charts: Best for chronological continuous timelines (Days, Months, Years).\n4. Table vs Matrix: Tables display flat lists; Matrix visuals provide hierarchical row and column groupings with automatic subtotals.\n5. Conditional Formatting: Use Background Color, Font Color, Data Bars, and Icons based on dynamic DAX rules to highlight outliers instantly.',
      vi: 'Các biểu đồ cốt lõi và thực hành chuẩn:\n1. Thẻ Card & New Card: Hiển thị nổi bật các chỉ số đơn lẻ quan trọng (ví dụ: Tổng doanh thu, Tăng trưởng cùng kỳ).\n2. Biểu đồ Cột/Thanh: Dùng thanh ngang khi tên danh mục dài; tránh xếp chồng (stacked) quá 3 nhóm.\n3. Biểu đồ Đường (Line): Tối ưu nhất cho chuỗi thời gian liên tục (Ngày, Tháng, Năm).\n4. Bảng Table so với Ma trận Matrix: Table hiển thị danh sách phẳng; Matrix cho phép phân nhóm phân cấp theo dòng và cột kèm tổng phụ tự động.\n5. Định dạng có điều kiện (Conditional Formatting): Dùng màu nền, màu chữ, thanh dữ liệu (Data Bars) và Icons theo quy tắc DAX để làm nổi bật số liệu.'
    },
    syntax: '// Executive KPI Measures for Visual Display:\nTotal Revenue = SUM(Fact_Sales[Revenue])\nTotal Profit = SUM(Fact_Sales[Profit])\nProfit Margin = DIVIDE([Total Profit], [Total Revenue], 0)',
    examples: [
      {
        title: {
          en: 'Configuring Matrix Visuals with Conditional Formatting',
          vi: 'Cấu Hình Bảng Matrix Với Định Dạng Có Điều Kiện'
        },
        code: `// DAX Rule for Conditional Color:
Margin Color KPI = 
SWITCH(
    TRUE(),
    [Profit Margin] >= 0.30, "#22c55e", // Green
    [Profit Margin] >= 0.15, "#f59e0b", // Yellow/Amber
    "#ef4444"                          // Red Alert
)`,
        language: 'dax',
        explanation: {
          en: 'A DAX measure can output hexadecimal color codes used directly in the conditional formatting rules of a visual.',
          vi: 'Một measure DAX có thể trả về mã màu Hex được dùng trực tiếp trong quy tắc định dạng có điều kiện của biểu đồ.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using 3D charts or Pie/Donut charts with more than 5 slices.',
          vi: 'Dùng biểu đồ 3D hoặc biểu đồ tròn/bánh donut có nhiều hơn 5 lát cắt.'
        },
        correction: {
          en: 'Replace complex pie charts with horizontal bar charts sorted in descending order for clear visual comparison.',
          vi: 'Thay thế biểu đồ tròn phức tạp bằng biểu đồ thanh ngang sắp xếp giảm dần để dễ so sánh bằng mắt.'
        }
      },
      {
        mistake: {
          en: 'Overloading a single report page with 15+ small competing visuals.',
          vi: 'Nhồi nhét hơn 15 biểu đồ nhỏ chen chúc trên một trang báo cáo.'
        },
        correction: {
          en: 'Limit each dashboard page to 4–6 core visuals with ample whitespace and clear visual hierarchy.',
          vi: 'Giới hạn mỗi trang báo cáo từ 4 đến 6 biểu đồ trọng tâm với khoảng cách thoáng đãng và phân cấp rõ ràng.'
        }
      }
    ],
    tips: [
      {
        en: 'Always format measures with proper number formatting (e.g. Currency $#,##0, Percentage 0.0%, Integer #,##0) in the Measure Tools ribbon so they appear formatted across all visuals automatically.',
        vi: 'Luôn định dạng measure (như Tiền tệ $#,##0, Tỷ lệ phần trăm 0.0%, Số nguyên #,##0) trong thẻ Measure Tools để hiển thị chuẩn trên mọi biểu đồ.'
      },
      {
        en: 'Use the Matrix "Stepped layout" toggle to control how child hierarchy rows are indented.',
        vi: 'Bật/tắt tùy chọn "Stepped layout" trong Matrix để tùy chỉnh cách thụt đầu dòng các cấp phân cấp con.'
      }
    ],
    practiceStarterCode: `// DAX KPI Measure for visual display
Profit Margin = DIVIDE(SUM(Fact_Sales[Profit]), SUM(Fact_Sales[Revenue]), 0)`
  },
  exercisePool: [
    {
      id: 'pbi_ex_5_1',
      type: 'predict_output',
      title: {
        en: 'Select the Optimal Visual Type for Trends',
        vi: 'Chọn Loại Biểu Đồ Tối Ưu Cho Xu Hướng'
      },
      instruction: {
        en: 'Which visual is best suited for tracking Monthly Revenue over a 3-year timeline?',
        vi: 'Biểu đồ nào phù hợp nhất để theo dõi Doanh thu theo tháng qua chu kỳ 3 năm?'
      },
      starterCode: '// Choose visual type',
      solutionCode: 'Line Chart',
      options: ['Line Chart', 'Pie Chart (36 slices)', 'Card Visual', 'Funnel Chart'],
      correctOptionIndex: 0,
      explanation: {
        en: 'Line charts are specifically designed to communicate continuous chronological movement and trends over time.',
        vi: 'Biểu đồ đường được thiết kế chuyên biệt để truyền tải xu hướng và biến động liên tục theo trục thời gian.'
      }
    },
    {
      id: 'pbi_ex_5_2',
      type: 'modify_example',
      title: {
        en: 'Format Profit Margin for Visual Presentation',
        vi: 'Định Dạng Measure Profit Margin'
      },
      instruction: {
        en: 'Write the Profit Margin formula using DIVIDE on Profit and Revenue.',
        vi: 'Viết công thức Profit Margin dùng hàm DIVIDE trên Profit và Revenue.'
      },
      starterCode: 'Profit Margin = DIVIDE(SUM(Fact_Sales[Profit]), SUM(Fact_Sales[Revenue]), 0)',
      solutionCode: 'Profit Margin = DIVIDE(SUM(Fact_Sales[Profit]), SUM(Fact_Sales[Revenue]), 0)',
      hint: {
        en: 'Profit Margin = DIVIDE(SUM(Fact_Sales[Profit]), SUM(Fact_Sales[Revenue]), 0)',
        vi: 'Profit Margin = DIVIDE(SUM(Fact_Sales[Profit]), SUM(Fact_Sales[Revenue]), 0)'
      },
      explanation: {
        en: 'DIVIDE safely calculates the ratio avoiding division by zero errors on cards and charts.',
        vi: 'Hàm DIVIDE tính toán tỷ số an toàn, tránh lỗi chia cho 0 trên các thẻ chỉ số và biểu đồ.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_5',
    title: {
      en: 'Design the Executive KPI Visual Suite',
      vi: 'Xây Dựng Bộ Chỉ Số Trực Quan Cho Lãnh Đạo'
    },
    description: {
      en: 'Declare the core executive measures needed to populate an executive dashboard header with KPI cards and matrix breakdowns.',
      vi: 'Khai báo các measure cốt lõi cần thiết để hiển thị trên thẻ KPI tổng quan và bảng Matrix phân tích.'
    },
    requirements: [
      { en: '1. Total Revenue: SUM(Fact_Sales[Revenue])', vi: '1. Total Revenue: SUM(Fact_Sales[Revenue])' },
      { en: '2. Total Cost: SUM(Fact_Sales[Cost])', vi: '2. Total Cost: SUM(Fact_Sales[Cost])' },
      { en: '3. Total Profit: [Total Revenue] - [Total Cost]', vi: '3. Total Profit: [Total Revenue] - [Total Cost]' },
      { en: '4. Profit Margin: DIVIDE([Total Profit], [Total Revenue], 0)', vi: '4. Profit Margin: DIVIDE([Total Profit], [Total Revenue], 0)' }
    ],
    starterCode: `Total Revenue = SUM(Fact_Sales[Revenue])
Total Cost = SUM(Fact_Sales[Cost])
Total Profit = [Total Revenue] - [Total Cost]
Profit Margin = DIVIDE([Total Profit], [Total Revenue], 0)`,
    solutionCode: `Total Revenue = SUM(Fact_Sales[Revenue])
Total Cost = SUM(Fact_Sales[Cost])
Total Profit = [Total Revenue] - [Total Cost]
Profit Margin = DIVIDE([Total Profit], [Total Revenue], 0)`,
    hints: [
      {
        en: 'Notice how measures reference other measures cleanly using [MeasureName] without repeating verbose SUM formulas.',
        vi: 'Chú ý cách các measure tham chiếu lẫn nhau bằng [TênMeasure] mà không cần lặp lại công thức SUM dài dòng.'
      }
    ],
    solutionExplanation: {
      en: 'This modular suite of DAX measures powers KPI cards, bar charts, and matrix visual breakdowns simultaneously.',
      vi: 'Bộ measure có cấu trúc module này cấp dữ liệu đồng thời cho thẻ KPI, biểu đồ cột và bảng ma trận chi tiết.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_5_1',
      type: 'single_choice',
      question: {
        en: 'Which visual in Power BI is best suited to display a single, large executive scalar metric (such as Total Sales = $12.4M)?',
        vi: 'Biểu đồ nào trong Power BI phù hợp nhất để hiển thị một chỉ số đơn lẻ nổi bật (như Tổng Doanh Thu = $12.4M)?'
      },
      options: [
        { en: 'Card Visual (or New Card Visual)', vi: 'Thẻ Card (hoặc New Card Visual)' },
        { en: 'Treemap Visual', vi: 'Treemap Visual' },
        { en: 'Scatter Plot', vi: 'Scatter Plot' },
        { en: 'Ribbon Chart', vi: 'Ribbon Chart' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Card visuals display a single scalar metric prominently, making them ideal for executive dashboard headers and key performance indicators.',
        vi: 'Thẻ Card hiển thị nổi bật một giá trị đơn lẻ, rất lý tưởng để làm thẻ KPI đầu trang trên báo cáo điều hành.'
      },
      topicId: 'core_visualizations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_5_2',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference between a Table visual and a Matrix visual in Power BI?',
        vi: 'Điểm khác biệt cốt lõi giữa biểu đồ Bảng (Table) và Ma trận (Matrix) trong Power BI là gì?'
      },
      options: [
        {
          en: 'Table displays a flat 2D list of columns; Matrix supports two-dimensional cross-tabulation with row/column hierarchies and expandable subtotals',
          vi: 'Table hiển thị danh sách cột phẳng 2 chiều; Matrix hỗ trợ phân tích ma trận 2 chiều với phân cấp dòng/cột và mở rộng tổng phụ'
        },
        {
          en: 'Table cannot display numbers; Matrix can only display text',
          vi: 'Table không hiển thị được số; Matrix chỉ hiển thị được chữ'
        },
        {
          en: 'Matrix visuals are only visible in dark mode',
          vi: 'Matrix chỉ xem được trong chế độ tối (dark mode)'
        },
        {
          en: 'There is no difference; they are exact duplicates',
          vi: 'Không có điểm khác biệt; hai biểu đồ giống hệt nhau'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Matrix visuals behave like Excel PivotTables, enabling multi-level row and column hierarchies with drillable subtotals.',
        vi: 'Matrix hoạt động tương tự PivotTable trong Excel, cho phép phân cấp nhiều tầng theo dòng và cột kèm khả năng mở rộng xem chi tiết.'
      },
      topicId: 'core_visualizations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_5_3',
      type: 'single_choice',
      question: {
        en: 'When category labels are long (e.g., full university department names or detailed product titles), which chart orientation is recommended for maximum readability?',
        vi: 'Khi nhãn danh mục có độ dài lớn (như tên phòng ban hoặc tên sản phẩm dài), hướng biểu đồ nào được khuyến nghị để dễ đọc nhất?'
      },
      options: [
        { en: 'Clustered Bar Chart (Horizontal)', vi: 'Biểu đồ thanh ngang (Clustered Bar Chart - Horizontal)' },
        { en: 'Clustered Column Chart (Vertical)', vi: 'Biểu đồ cột dọc (Clustered Column Chart - Vertical)' },
        { en: 'Pie Chart', vi: 'Biểu đồ tròn (Pie Chart)' },
        { en: 'Gauge Chart', vi: 'Biểu đồ đo (Gauge Chart)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Horizontal bar charts provide natural horizontal reading space for long text labels without awkward truncation or diagonal rotation.',
        vi: 'Biểu đồ thanh ngang cung cấp không gian tự nhiên theo chiều ngang giúp hiển thị trọn vẹn nhãn chữ dài mà không bị cắt cụt hay phải xoay nghiêng chữ.'
      },
      topicId: 'core_visualizations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_5_4',
      type: 'true_false',
      question: {
        en: 'Using Conditional Formatting on Matrix cells (like Data Bars or Color Scales) helps users spot outliers and performance thresholds at a glance.',
        vi: 'Sử dụng Conditional Formatting trên các ô Matrix (như Data Bars hoặc dải màu) giúp người xem nhận biết ngay các điểm đột biến và ngưỡng hiệu quả.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Conditional formatting draws immediate visual attention to high and low values across dense numerical grids.',
        vi: 'Đúng. Định dạng có điều kiện hướng sự chú ý thị giác tức thì vào các giá trị cao nhất và thấp nhất trong bảng số liệu.'
      },
      topicId: 'core_visualizations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_5_5',
      type: 'single_choice',
      question: {
        en: 'Where is the optimal place to set the display format (such as Currency $, Percentage %, or Decimal places) for a DAX measure so it applies everywhere consistently?',
        vi: 'Nơi tối ưu nhất để thiết lập định dạng hiển thị (như Tiền tệ $, Phần trăm %, hoặc số chữ số thập phân) cho một measure DAX để áp dụng đồng bộ mọi nơi là gì?'
      },
      options: [
        { en: 'In the Measure Tools ribbon under Formatting when selecting the measure', vi: 'Trong thẻ Measure Tools ở mục Formatting khi chọn measure đó' },
        { en: 'Individually in every single visual format pane one by one', vi: 'Chỉnh thủ công trong từng biểu đồ một' },
        { en: 'In the Windows Control Panel Regional Settings', vi: 'Trong Control Panel của hệ điều hành Windows' },
        { en: 'Inside a SQL stored procedure', vi: 'Bên trong stored procedure SQL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Formatting the measure model metadata in Measure Tools ensures every current and future visual automatically inherits the exact formatting.',
        vi: 'Định dạng metadata của measure trong Measure Tools đảm bảo tất cả các biểu đồ hiện tại và tương lai đều tự động hiển thị đúng định dạng.'
      },
      topicId: 'core_visualizations',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_5_6',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following conditional formatting styles are available for Matrix and Table visuals in Power BI? (Select all that apply)',
        vi: 'Những kiểu định dạng có điều kiện nào sau đây được hỗ trợ trong biểu đồ Matrix và Table của Power BI? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Background Color', vi: 'Màu nền ô (Background Color)' },
        { en: 'Font Color', vi: 'Màu chữ (Font Color)' },
        { en: 'Data Bars', vi: 'Thanh dữ liệu (Data Bars)' },
        { en: 'Icons (KPI Indicators)', vi: 'Biểu tượng chỉ báo (Icons)' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'Background Color, Font Color, Data Bars, and Icons are all standard conditional formatting styles in Power BI tables and matrices.',
        vi: 'Background Color, Font Color, Data Bars và Icons đều là các kiểu định dạng có điều kiện tiêu chuẩn trong Power BI.'
      },
      topicId: 'core_visualizations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_5_7',
      type: 'true_false',
      question: {
        en: 'A Pie Chart displaying 25 narrow slices is considered a best practice visual for enterprise dashboard design.',
        vi: 'Một biểu đồ tròn (Pie Chart) hiển thị 25 lát cắt hẹp được coi là biểu đồ chuẩn mực trong thiết kế báo cáo quản trị doanh nghiệp.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Pie charts become unreadable with more than 5 slices. A horizontal bar chart or treemap is far superior for many categories.',
        vi: 'Sai. Biểu đồ tròn rất khó đọc khi có quá 5 lát cắt. Biểu đồ thanh ngang hoặc treemap trực quan hơn nhiều khi có nhiều nhóm.'
      },
      topicId: 'core_visualizations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_5_8',
      type: 'single_choice',
      question: {
        en: 'What visual type displays hierarchical part-to-whole data using nested rectangles sized by a measure value?',
        vi: 'Loại biểu đồ nào hiển thị cấu trúc phân cấp tỷ trọng từng phần trên tổng thể bằng các khối hình chữ nhật lồng nhau có kích thước tỷ lệ theo số liệu?'
      },
      options: [
        { en: 'Treemap', vi: 'Treemap' },
        { en: 'Gauge Chart', vi: 'Gauge Chart' },
        { en: 'Card Visual', vi: 'Card Visual' },
        { en: 'Waterfall Chart', vi: 'Waterfall Chart' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Treemaps display hierarchical data as a set of nested rectangles proportional to quantitative measure values.',
        vi: 'Treemap hiển thị dữ liệu phân cấp dưới dạng tập hợp các khối chữ nhật có diện tích tỷ lệ thuận với giá trị đo lường.'
      },
      topicId: 'core_visualizations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_5_9',
      type: 'single_choice',
      question: {
        en: 'Which chart type is ideal for visualizing the sequential cumulative effect of positive and negative contributions leading to a final total (e.g. Revenue -> Costs -> Taxes -> Net Income)?',
        vi: 'Loại biểu đồ nào lý tưởng để minh họa sự đóng góp tăng/giảm tuần tự dẫn tới kết quả cuối cùng (ví dụ: Doanh thu -> Chi phí -> Thuế -> Lợi nhuận ròng)?'
      },
      options: [
        { en: 'Waterfall Chart (Bridge Chart)', vi: 'Biểu đồ thác nước (Waterfall Chart)' },
        { en: 'Donut Chart', vi: 'Biểu đồ bánh Donut' },
        { en: 'Scatter Plot', vi: 'Scatter Plot' },
        { en: 'Line Chart', vi: 'Line Chart' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Waterfall charts effectively show how an initial value is affected by intermediate positive or negative contributions to arrive at a final value.',
        vi: 'Biểu đồ thác nước (Waterfall) minh họa trực quan sự biến động tăng giảm từng bước từ giá trị ban đầu đến giá trị chốt cuối cùng.'
      },
      topicId: 'core_visualizations',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_5_10',
      type: 'predict_output',
      question: {
        en: 'When you place Dim_Calendar[Year] on the Matrix Rows and Dim_Products[Category] on the Matrix Columns with [Total Revenue] in Values, what does the Matrix render?',
        vi: 'Khi bạn đặt Dim_Calendar[Year] vào Rows của Matrix và Dim_Products[Category] vào Columns với [Total Revenue] ở mục Values, Matrix sẽ hiển thị gì?'
      },
      options: [
        {
          en: 'A two-way grid showing Total Revenue cross-tabulated by Year and Category with row/column totals',
          vi: 'Một bảng ma trận 2 chiều hiển thị Doanh thu theo từng Năm và từng Danh mục kèm tổng dòng và tổng cột'
        },
        {
          en: 'A blank canvas with an error',
          vi: 'Trang trắng báo lỗi'
        },
        {
          en: 'A pie chart with 4 slices',
          vi: 'Một biểu đồ tròn 4 phần'
        },
        {
          en: 'A single card with grand total only',
          vi: 'Một thẻ card đơn lẻ chỉ có tổng chung'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Matrix dynamically evaluates [Total Revenue] for every intersection of Year and Category, creating a clean cross-tabulation table.',
        vi: 'Matrix tính toán động measure [Total Revenue] cho từng giao điểm của Năm và Danh mục, tạo thành bảng ma trận đối soát chuẩn.'
      },
      topicId: 'core_visualizations',
      difficulty: 'medium'
    }
  ]
};

export default lesson05;
