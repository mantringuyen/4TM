import { Lesson } from '../../../../types';

export const lesson17: Lesson = {
  id: 'pbi_lesson_17',
  moduleId: 'pbi_mod_6',
  levelId: 'advanced',
  courseId: 'powerbi',
  order: 17,
  topicId: 'pbi_performance_optimization',
  title: {
    en: 'Performance Optimization: Performance Analyzer, VertiPaq Metrics & DAX Query Plan Tuning',
    vi: 'Tối Ưu Hiệu Năng: Performance Analyzer, Chỉ Số VertiPaq & Tinh Chỉnh DAX Query Plan'
  },
  summary: {
    en: 'Diagnose visual bottlenecks with Performance Analyzer, analyze column cardinality and memory in DAX Studio, and tune storage vs formula engine queries.',
    vi: 'Chẩn đoán điểm nghẽn biểu đồ bằng Performance Analyzer, phân tích độ phân biệt (cardinality) và bộ nhớ trong DAX Studio, tối ưu hóa Storage vs Formula Engine.'
  },
  estimatedMinutes: 16,
  learn: {
    introduction: {
      en: 'Enterprise Power BI reports must render smoothly under 1-2 seconds. Slow reports are rarely caused by hardware limitations; they are caused by high column cardinality, unoptimized DAX measures, row-by-row iteration, and inefficient relationships. By mastering Performance Analyzer and VertiPaq columnar mechanics, you can slash report rendering times and memory footprints by over 80%.',
      vi: 'Các báo cáo Power BI cấp doanh nghiệp phải phản hồi mượt mà dưới 1-2 giây. Báo cáo chạy chậm hiếm khi do phần cứng yếu mà chủ yếu xuất phát từ độ phân biệt cột quá cao (High Cardinality), công thức DAX chưa tối ưu, lặp từng dòng (row iteration) và cấu trúc quan hệ chưa chuẩn. Bằng cách làm chủ công cụ Performance Analyzer và cơ chế nén cột VertiPaq, bạn có thể cắt giảm thời gian tải và dung lượng RAM hơn 80%.'
    },
    conceptExplanation: {
      en: 'Performance Optimization Architecture:\n1. The 3 Report Bottlenecks in Performance Analyzer:\n   - DAX Query: Time spent by the Tabular Engine calculating measures.\n   - Visual Display: Time spent by the browser/applet rendering HTML/SVG DOM.\n   - Other: Wait time in visual queue / network overhead.\n2. Formula Engine (FE) vs Storage Engine (SE):\n   - Storage Engine (SE / VertiPaq): Multithreaded, in-memory columnar engine executing lightning-fast scans and simple aggregations (xmSQL).\n   - Formula Engine (FE): Single-threaded CPU execution layer for complex logic. High FE % indicates DAX optimization needed.\n3. Column Cardinality & Compression:\n   - VertiPaq compresses columns based on unique values (Cardinality). Splitting DateTime (e.g. 2024-05-10 14:32:15) into separate Date and Time columns reduces cardinality by 99%.\n4. Avoid Calculated Columns in Fact Tables: Use measures or push columns back to Power Query/SQL.',
      vi: 'Kiến trúc tối ưu hóa hiệu năng:\n1. Ba điểm nghẽn trong Performance Analyzer:\n   - DAX Query: Thời gian bộ máy Tabular tính toán công thức.\n   - Visual Display: Thời gian trình duyệt vẽ các phần tử đồ họa HTML/SVG.\n   - Other: Thời gian chờ trong hàng đợi kết nối / mạng.\n2. Formula Engine (FE) so với Storage Engine (SE):\n   - Storage Engine (SE / VertiPaq): Đa luồng, quét cột trong bộ nhớ siêu tốc và tính toán các phép tổng hợp cơ bản (xmSQL).\n   - Formula Engine (FE): Đơn luồng xử lý các logic phức tạp. Tỷ lệ % FE cao cảnh báo công thức DAX cần được tối ưu.\n3. Độ phân biệt cột (Cardinality) & Nén dữ liệu:\n   - VertiPaq nén dữ liệu dựa trên số lượng giá trị duy nhất (Cardinality). Tách cột DateTime (như 2024-05-10 14:32:15) thành 2 cột Date và Time riêng biệt giúp giảm 99% cardinality.\n4. Tránh tạo Calculated Column trên bảng Fact: Hãy chuyển sang dùng Measure hoặc xử lý sớm từ Power Query/SQL.'
    },
    syntax: '// High Cardinality DateTime Optimization in Power Query (M):\n= Table.AddColumn(Source, "OrderDate", each DateTime.Date([OrderDateTime]), type date)\n= Table.AddColumn(Source, "OrderTime", each DateTime.Time([OrderDateTime]), type time)\n\n// Replacing slow row-by-row iteration with vectorized engine filter:\n// Slow Anti-Pattern:\nSlowMargin = SUMX(Fact_Sales, Fact_Sales[Revenue] - Fact_Sales[Cost])\n// Optimized Pattern:\nFastMargin = SUM(Fact_Sales[Revenue]) - SUM(Fact_Sales[Cost])',
    examples: [
      {
        title: {
          en: 'Optimizing Slow Measure with Vectorized Aggregations',
          vi: 'Tối Ưu Hóa Measure Chậm Bằng Phép Tổng Hợp Vector Hóa'
        },
        code: `// Sub-optimal: Forces single-threaded row-by-row math across millions of rows
Suboptimal Margin = 
SUMX(Fact_Sales, Fact_Sales[Revenue] - Fact_Sales[Cost])

// Optimized: Executes 2 parallel multi-threaded Storage Engine xmSQL scans
Optimized Margin = 
SUM(Fact_Sales[Revenue]) - SUM(Fact_Sales[Cost])`,
        language: 'dax',
        explanation: {
          en: 'SUM(Revenue) - SUM(Cost) utilizes VertiPaq columnar indexes directly in the Storage Engine, executing up to 100x faster than SUMX row-by-row subtraction.',
          vi: 'SUM(Revenue) - SUM(Cost) tận dụng chỉ mục cột VertiPaq trực tiếp trong Storage Engine, nhanh hơn gấp 100 lần so với phép trừ từng dòng của SUMX.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Keeping high-cardinality GUID or surrogate ID columns in Fact tables when they are never used in visuals or relationships.',
          vi: 'Giữ lại các cột mã GUID hoặc ID ngẫu nhiên trong bảng Fact hàng chục triệu dòng dù không dùng đến trong biểu đồ hay quan hệ.'
        },
        correction: {
          en: 'Delete unused ID columns in Power Query. High cardinality unique text columns consume up to 80% of total model RAM.',
          vi: 'Xóa ngay các cột ID thừa trong Power Query. Các cột chuỗi có độ phân biệt cao chiếm tới 80% tổng dung lượng RAM của mô hình.'
        }
      },
      {
        mistake: {
          en: 'Placing 40 distinct visuals and slicers on a single report page.',
          vi: 'Đặt 40 biểu đồ và thanh trượt (slicers) dày đặc trên cùng một trang báo cáo.'
        },
        correction: {
          en: 'Each visual fires 1-3 independent DAX queries. Keep visuals per page between 6 to 12 for optimal responsiveness.',
          vi: 'Mỗi biểu đồ kích hoạt từ 1-3 câu truy vấn DAX độc lập. Hãy duy trì từ 6 đến 12 visual trên mỗi trang để đảm bảo tốc độ phản hồi.'
        }
      }
    ],
    tips: [
      {
        en: 'Use DAX Studio to extract "VertiPaq Analyzer Metrics" to instantly identify which tables and columns consume the most RAM.',
        vi: 'Sử dụng DAX Studio để trích xuất chỉ số "VertiPaq Analyzer Metrics", phát hiện ngay các bảng và cột đang ngốn nhiều RAM nhất.'
      },
      {
        en: 'Whenever possible, reduce the Formula Engine (FE) time to under 20% of total query duration by pushing work to the Storage Engine (SE).',
        vi: 'Bất cứ khi nào có thể, hãy tối ưu để thời gian Formula Engine (FE) dưới 20% tổng thời gian truy vấn bằng cách đẩy tải cho Storage Engine (SE).'
      }
    ],
    practiceStarterCode: `// Optimized DAX Margin calculation
Profit Margin = SUM(Fact_Sales[Revenue]) - SUM(Fact_Sales[Cost])`
  },
  exercisePool: [
    {
      id: 'pbi_ex_17_1',
      type: 'predict_output',
      title: {
        en: 'Analyze Performance Analyzer Metric Output',
        vi: 'Phân Tích Kết Quả Đo Lường Của Performance Analyzer'
      },
      instruction: {
        en: 'In Power BI Desktop Performance Analyzer, what does a visual showing 1800ms "DAX Query" and 40ms "Visual Display" signify?',
        vi: 'Trong Performance Analyzer, một biểu đồ có thời gian 1800ms cho "DAX Query" và 40ms cho "Visual Display" cho thấy điều gì?'
      },
      starterCode: '// Identify bottleneck',
      solutionCode: 'The bottleneck is the DAX formula or data model structure (requires DAX optimization or VertiPaq tuning)',
      options: [
        'The bottleneck is the DAX formula or data model structure (requires DAX optimization or VertiPaq tuning)',
        'The monitor screen is too slow',
        'The internet router needs a reboot',
        'The visual colors are too bright'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'A high DAX query time (1800ms) indicates that the underlying data model or DAX measure calculation is the performance bottleneck.',
        vi: 'Thời gian DAX query cao (1800ms) chứng minh rằng công thức DAX hoặc mô hình dữ liệu chính là điểm nghẽn cần tối ưu.'
      }
    },
    {
      id: 'pbi_ex_17_2',
      type: 'fix_code',
      title: {
        en: 'Optimize Row-by-Row Iterator to Vectorized Measure',
        vi: 'Tối Ưu Hóa Phép Lặp Dòng Thành Measure Vector Hóa'
      },
      instruction: {
        en: 'Refactor the slow SUMX expression into two fast vectorized SUM operations.',
        vi: 'Tái cấu trúc biểu thức SUMX chậm thành 2 phép toán SUM vector hóa siêu tốc.'
      },
      starterCode: 'Gross Margin = SUMX(Fact_Sales, Fact_Sales[GrossRevenue] - Fact_Sales[GrossCost])',
      solutionCode: 'Gross Margin = SUM(Fact_Sales[GrossRevenue]) - SUM(Fact_Sales[GrossCost])',
      hint: {
        en: 'SUM(Fact_Sales[GrossRevenue]) - SUM(Fact_Sales[GrossCost])',
        vi: 'SUM(Fact_Sales[GrossRevenue]) - SUM(Fact_Sales[GrossCost])'
      },
      explanation: {
        en: 'SUM(Revenue) - SUM(Cost) runs in the multi-threaded Storage Engine, avoiding single-threaded row-by-row iteration.',
        vi: 'SUM(Revenue) - SUM(Cost) chạy trên Storage Engine đa luồng, tránh việc lặp đơn luồng từng dòng một.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_17',
    title: {
      en: 'Architect Ultra-High Performance DAX Architecture',
      vi: 'Thiết Kế Hệ Thống Measure DAX Hiệu Năng Cao'
    },
    description: {
      en: 'Implement three performance-optimized DAX measures: Vectorized Margin, Storage Engine Margin %, and Safe Pre-aggregated Ratio.',
      vi: 'Viết ba measure DAX tối ưu hóa hiệu năng: Biên lợi nhuận vector hóa, Tỷ suất biên lợi nhuận SE và Tỷ lệ tổng hợp an toàn.'
    },
    requirements: [
      { en: '1. Total Revenue = SUM(Fact_Sales[Revenue])', vi: '1. Total Revenue = SUM(Fact_Sales[Revenue])' },
      { en: '2. Total Cost = SUM(Fact_Sales[Cost])', vi: '2. Total Cost = SUM(Fact_Sales[Cost])' },
      { en: '3. Total Margin = [Total Revenue] - [Total Cost]', vi: '3. Total Margin = [Total Revenue] - [Total Cost]' },
      { en: '4. Margin % = DIVIDE([Total Margin], [Total Revenue], 0)', vi: '4. Margin % = DIVIDE([Total Margin], [Total Revenue], 0)' }
    ],
    starterCode: `Total Revenue = SUM(Fact_Sales[Revenue])
Total Cost = SUM(Fact_Sales[Cost])
Total Margin = [Total Revenue] - [Total Cost]
Margin % = DIVIDE([Total Margin], [Total Revenue], 0)`,
    solutionCode: `Total Revenue = SUM(Fact_Sales[Revenue])
Total Cost = SUM(Fact_Sales[Cost])
Total Margin = [Total Revenue] - [Total Cost]
Margin % = DIVIDE([Total Margin], [Total Revenue], 0)`,
    hints: [
      {
        en: 'Building atomic measures that reuse base aggregations maximizes Storage Engine cache hits.',
        vi: 'Xây dựng các measure cơ sở nguyên tử giúp tối đa hóa khả năng tái sử dụng bộ nhớ đệm Cache của Storage Engine.'
      }
    ],
    solutionExplanation: {
      en: 'This decoupled, vectorized measure architecture ensures instant dashboard response times even over 100-million-row datasets.',
      vi: 'Kiến trúc measure vector hóa này đảm bảo thời gian phản hồi tức thì ngay cả trên các bộ dữ liệu hàng trăm triệu dòng.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_17_1',
      type: 'single_choice',
      question: {
        en: 'What tool built directly into Power BI Desktop allows you to record and inspect exact rendering and DAX query execution times for every visual on a page?',
        vi: 'Công cụ nào tích hợp sẵn trong Power BI Desktop cho phép bạn ghi lại và kiểm tra chính xác thời gian vẽ và thời gian chạy câu truy vấn DAX của từng visual trên trang?'
      },
      options: [
        { en: 'Performance Analyzer (View tab)', vi: 'Performance Analyzer (Thẻ View)' },
        { en: 'Themes Gallery', vi: 'Themes Gallery' },
        { en: 'Bookmarks Pane', vi: 'Bookmarks Pane' },
        { en: 'Selection Pane', vi: 'Selection Pane' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Performance Analyzer records DAX Query, Visual Display, and Other wait times for all visual elements.',
        vi: 'Performance Analyzer ghi lại thời gian chạy DAX Query, vẽ Visual Display và thời gian chờ Other của tất cả các visual.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_17_2',
      type: 'single_choice',
      question: {
        en: 'What is the key difference between the Storage Engine (SE / VertiPaq) and the Formula Engine (FE)?',
        vi: 'Sự khác biệt cốt lõi giữa Storage Engine (SE / VertiPaq) và Formula Engine (FE) là gì?'
      },
      options: [
        {
          en: 'Storage Engine is multi-threaded, highly compressed, and fast; Formula Engine is single-threaded and handles complex procedural DAX logic',
          vi: 'Storage Engine hoạt động đa luồng, nén dữ liệu cao và siêu tốc; Formula Engine xử lý đơn luồng các logic DAX thủ tục phức tạp'
        },
        {
          en: 'Storage Engine only works on Mac computers',
          vi: 'Storage Engine chỉ hoạt động trên máy Mac'
        },
        {
          en: 'Formula Engine stores all data on floppy disks',
          vi: 'Formula Engine lưu toàn bộ dữ liệu trên đĩa mềm'
        },
        {
          en: 'There is no difference; they are identical processes',
          vi: 'Không có điểm khác biệt; hai tiến trình giống hệt nhau'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'High performance DAX pushes as much computation as possible to the multi-threaded Storage Engine (xmSQL), minimizing single-threaded FE bottlenecks.',
        vi: 'DAX hiệu năng cao luôn đẩy tối đa các phép toán xuống Storage Engine đa luồng (xmSQL), giảm thiểu gánh nặng cho Formula Engine đơn luồng.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_17_3',
      type: 'single_choice',
      question: {
        en: 'Why does splitting a DateTime column (e.g. 2024-05-12 15:42:19) into separate Date and Time columns significantly reduce data model size?',
        vi: 'Vì sao việc tách cột DateTime (như 2024-05-12 15:42:19) thành 2 cột Date và Time riêng biệt lại giúp giảm mạnh dung lượng mô hình dữ liệu?'
      },
      options: [
        {
          en: 'It drastically reduces column Cardinality (number of unique values), allowing VertiPaq to achieve massive dictionary compression',
          vi: 'Nó giảm mạnh độ phân biệt Cardinality (số giá trị duy nhất), giúp VertiPaq nén từ điển dữ liệu ở mức tối đa'
        },
        {
          en: 'It deletes half of the rows in the database',
          vi: 'Nó xóa một nửa số dòng trong cơ sở dữ liệu'
        },
        {
          en: 'Date columns do not consume any RAM in Power BI',
          vi: 'Cột Date không tốn bất kỳ dung lượng RAM nào trong Power BI'
        },
        {
          en: 'Time columns are automatically hidden from memory',
          vi: 'Cột Time tự động được ẩn khỏi bộ nhớ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A combined DateTime column has millions of unique timestamps. Splitting it yields ~365 dates per year and ~86,400 seconds, drastically lowering dictionary memory.',
        vi: 'Cột DateTime gộp có hàng triệu giá trị duy nhất. Tách riêng giúp giảm xuống chỉ còn ~365 ngày/năm và ~86,400 giây/ngày, tiết kiệm khổng lồ bộ nhớ RAM.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_17_4',
      type: 'true_false',
      question: {
        en: 'Calculated Columns in large Fact tables are calculated during data refresh and stored in RAM, whereas Measures are calculated on-the-fly at query time.',
        vi: 'Calculated Column trong bảng Fact lớn được tính toán khi làm mới dữ liệu và lưu cố định trong RAM, trong khi Measure được tính toán động tại thời điểm truy vấn.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Calculated columns consume permanent RAM storage in the model, whereas measures take zero storage until queried.',
        vi: 'Đúng. Calculated column tiêu tốn RAM vĩnh viễn trong mô hình, trong khi measure không tốn bộ nhớ lưu trữ cho tới khi được truy vấn.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_17_5',
      type: 'single_choice',
      question: {
        en: 'Which third-party open-source tool is universally recognized for profiling DAX queries, server timings, and VertiPaq analyzer metrics?',
        vi: 'Công cụ mã nguồn mở của bên thứ ba nào được công nhận rộng rãi nhất để phân tích chi tiết DAX queries, Server Timings và VertiPaq metrics?'
      },
      options: [
        { en: 'DAX Studio', vi: 'DAX Studio' },
        { en: 'Notepad++', vi: 'Notepad++' },
        { en: 'Adobe Photoshop', vi: 'Adobe Photoshop' },
        { en: 'VLC Player', vi: 'VLC Player' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DAX Studio (by SQLBI) is the premier tool for analyzing query plans, server timings, and VertiPaq memory structures.',
        vi: 'DAX Studio (phát triển bởi SQLBI) là công cụ hàng đầu để phân tích Query Plan, Server Timings và cấu trúc bộ nhớ VertiPaq.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_17_6',
      type: 'predict_output',
      question: {
        en: 'Why is SUM(Fact_Sales[Revenue]) - SUM(Fact_Sales[Cost]) faster than SUMX(Fact_Sales, Fact_Sales[Revenue] - Fact_Sales[Cost])?',
        vi: 'Vì sao phép toán SUM(Fact_Sales[Revenue]) - SUM(Fact_Sales[Cost]) lại nhanh hơn SUMX(Fact_Sales, Fact_Sales[Revenue] - Fact_Sales[Cost])?'
      },
      options: [
        {
          en: 'It leverages parallel multi-threaded Storage Engine scans rather than a single-threaded row-by-row iteration in the Formula Engine',
          vi: 'Nó tận dụng tính năng quét song song đa luồng của Storage Engine thay vì phải lặp đơn luồng từng dòng một trong Formula Engine'
        },
        {
          en: 'SUM automatically rounds all numbers to integers',
          vi: 'Hàm SUM tự động làm tròn tất cả các số thành số nguyên'
        },
        {
          en: 'SUMX deletes the column cache',
          vi: 'Hàm SUMX xóa bộ nhớ đệm của cột'
        },
        {
          en: 'There is zero performance difference',
          vi: 'Không có bất kỳ sự khác biệt nào về hiệu năng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Direct SUM aggregations execute natively in the VertiPaq Storage Engine without calling the single-threaded Formula Engine per row.',
        vi: 'Các phép tổng hợp SUM trực tiếp được thực thi ngay trong Storage Engine VertiPaq mà không phải gọi Formula Engine đơn luồng cho từng dòng.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_17_7',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following actions are proven best practices to optimize Power BI report speed? (Select all that apply)',
        vi: 'Những hành động nào sau đây là thực hành chuẩn đã được chứng minh giúp tăng tốc báo cáo Power BI? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Remove unused columns and high-cardinality keys from fact tables', vi: 'Xóa các cột không sử dụng và các khóa có độ phân biệt cao khỏi bảng fact'
        },
        { en: 'Split DateTime columns into separate Date and Time columns', vi: 'Tách cột DateTime thành 2 cột Date và Time riêng biệt' },
        { en: 'Limit the number of visuals per report page to a focused set (6-12)', vi: 'Giới hạn số lượng visual trên một trang báo cáo ở mức hợp lý (6-12)' },
        { en: 'Create 20 bi-directional many-to-many relationships', vi: 'Tạo 20 mối quan hệ nhiều-nhiều 2 chiều' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Removing unused columns, reducing cardinality, and limiting visuals directly boost speed. Many-to-many bidirectional relationships degrade performance.',
        vi: 'Xóa cột thừa, giảm cardinality và tinh gọn số visual giúp tăng tốc rõ rệt. Quan hệ 2 chiều nhiều-nhiều gây chậm báo cáo.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_17_8',
      type: 'true_false',
      question: {
        en: 'Bi-directional cross-filtering on relationships can cause query ambiguity, unexpected filter propagation, and severe performance penalties.',
        vi: 'Lọc chéo 2 chiều (Bi-directional cross-filtering) trên các mối quan hệ có thể gây nhập nhằng truy vấn, lan truyền bộ lọc ngoài ý muốn và suy giảm hiệu năng nghiêm trọng.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Bi-directional relationships force complex relationship graph resolution at query time and should be avoided or replaced with CROSSFILTER/TREATAS.',
        vi: 'Đúng. Quan hệ 2 chiều bắt bộ máy phải giải quyết đồ thị quan hệ phức tạp khi truy vấn; nên tránh dùng hoặc thay bằng CROSSFILTER/TREATAS.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_17_9',
      type: 'single_choice',
      question: {
        en: 'What feature in Power BI allows caching pre-aggregated data at higher dimension grains to instantly answer high-level queries while keeping DirectQuery detail?',
        vi: 'Tính năng nào trong Power BI cho phép lưu đệm dữ liệu tổng hợp sẵn ở mức tổng quan để trả lời tức thì truy vấn cấp cao trong khi vẫn giữ chi tiết DirectQuery?'
      },
      options: [
        { en: 'User-Defined Aggregations (Aggs)', vi: 'User-Defined Aggregations (Aggs - Tổng hợp do người dùng định nghĩa)' },
        { en: 'Bookmarks Navigation', vi: 'Bookmarks Navigation' },
        { en: 'Custom Tooltips', vi: 'Custom Tooltips' },
        { en: 'Mobile Layout Mode', vi: 'Mobile Layout Mode' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'User-Defined Aggregations route high-level queries to fast in-memory Import tables while passing fine-grained drillthrough queries to DirectQuery.',
        vi: 'User-Defined Aggregations điều hướng các truy vấn tổng quan tới bảng Import siêu tốc trong RAM và chỉ gửi truy vấn chi tiết về DirectQuery.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_17_10',
      type: 'single_choice',
      question: {
        en: 'What is xmSQL in Power BI engine terminology?',
        vi: 'Thuật ngữ xmSQL trong kiến trúc bộ máy Power BI có nghĩa là gì?'
      },
      options: [
        {
          en: 'The internal, highly optimized columnar query language used by the VertiPaq Storage Engine to scan and aggregate memory data',
          vi: 'Ngôn ngữ truy vấn dạng cột nội bộ được VertiPaq Storage Engine dùng để quét và tổng hợp dữ liệu siêu tốc trong bộ nhớ'
        },
        {
          en: 'An XML file saved on OneDrive',
          vi: 'Một tệp XML lưu trên OneDrive'
        },
        {
          en: 'A web scraping protocol',
          vi: 'Một giao thức cào dữ liệu web'
        },
        {
          en: 'A Microsoft Office macro language',
          vi: 'Một ngôn ngữ macro của Microsoft Office'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'xmSQL is the low-level query language generated by the Tabular engine and executed natively by the VertiPaq Storage Engine.',
        vi: 'xmSQL là ngôn ngữ truy vấn cấp thấp do bộ máy Tabular sinh ra và được VertiPaq Storage Engine thực thi trực tiếp.'
      },
      topicId: 'pbi_performance_optimization',
      difficulty: 'hard'
    }
  ]
};

export default lesson17;
