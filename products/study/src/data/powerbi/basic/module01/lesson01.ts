import { Lesson } from '../../../../types';

export const lesson01: Lesson = {
  id: 'pbi_lesson_1',
  moduleId: 'pbi_mod_1',
  levelId: 'basic',
  courseId: 'powerbi',
  order: 1,
  topicId: 'pbi_desktop_ecosystem',
  title: {
    en: 'Power BI Desktop Ecosystem, Architecture & Report View',
    vi: 'Hệ Sinh Thái Power BI Desktop, Kiến Trúc & Giao Diện Báo Cáo'
  },
  summary: {
    en: 'Explore the Power BI Desktop tripartite engine (Power Query, VertiPaq, Report View), panes, and core canvas layout.',
    vi: 'Khám phá kiến trúc 3 trụ cột của Power BI (Power Query, VertiPaq, Report View), các thanh điều khiển và giao diện thiết kế.'
  },
  estimatedMinutes: 12,
  learn: {
    introduction: {
      en: 'Microsoft Power BI is an enterprise business intelligence platform combining data preparation, in-memory analytical modeling, and interactive visualization. Power BI Desktop comprises three primary views: Report View (visual canvas), Table View (raw columnar data preview), and Model View (relationship diagram). Under the hood, data is compressed by the VertiPaq columnar in-memory database engine.',
      vi: 'Microsoft Power BI là nền tảng phân tích kinh doanh (Business Intelligence) hàng đầu kết hợp tiền xử lý dữ liệu, mô hình hóa phân tích trong bộ nhớ RAM và trực quan hóa tương tác. Power BI Desktop gồm 3 khung nhìn chính: Report View (trang canvas vẽ biểu đồ), Table View (xem bảng dữ liệu dạng cột), và Model View (sơ đồ quan hệ thực thể). Phía dưới nền tảng, dữ liệu được nén bởi bộ máy VertiPaq lưu trữ dạng cột trong bộ nhớ.'
    },
    conceptExplanation: {
      en: 'The core workflow follows a strict sequential pipeline: 1) Extract & Transform in Power Query (M Language), 2) Model & Calculate in Power BI Desktop (DAX + VertiPaq Engine), and 3) Visualize & Distribute via Power BI Service in the cloud. Understanding the three primary panes in Report View (Fields / Data pane, Visualizations pane, and Filters pane) is essential for efficient report development.',
      vi: 'Quy trình cốt lõi tuân theo một chu trình tuần tự: 1) Trích xuất & Chuyển đổi dữ liệu trong Power Query (ngôn ngữ M), 2) Xây dựng mô hình & Viết công thức trong Power BI Desktop (DAX + bộ máy VertiPaq), và 3) Trực quan hóa & Phân phối lên dịch vụ đám mây Power BI Service. Nắm vững 3 thanh công cụ chính trong Report View (Data pane, Visualizations pane, và Filters pane) là nền tảng thiết yếu để xây dựng báo cáo.'
    },
    syntax: '// Power BI Desktop Architecture:\n// 1. Power Query ETL Engine (M Formula Language)\n// 2. VertiPaq In-Memory Columnar Database (Tabular Model)\n// 3. DAX Engine (Data Analysis Expressions for Calculations)\n// 4. Report Canvas (HTML5 / D3 / Custom Visuals Rendering Engine)',
    examples: [
      {
        title: {
          en: 'Power BI Architecture Pipeline',
          vi: 'Chu Trình Kiến Trúc Power BI'
        },
        code: `// Stage 1: Power Query ETL (M Language)
// Raw CSV/SQL Data -> Cleaned & Typed Tables

// Stage 2: VertiPaq Data Modeling
// Tables linked via 1-to-Many (1:*) Relationships

// Stage 3: DAX Calculations
Total Revenue = SUM(Sales[Revenue])
Profit Margin = DIVIDE(SUM(Sales[Profit]), [Total Revenue], 0)

// Stage 4: Visual Canvas Rendering
// Interactive KPI Cards, Bar Charts, Matrix Grids`,
        language: 'dax',
        explanation: {
          en: 'Data flows from raw external sources through Power Query M transformations into the VertiPaq in-memory engine, where DAX measures compute dynamic values rendered onto visual canvas elements.',
          vi: 'Dữ liệu chảy từ nguồn thô qua các bước chuyển đổi Power Query M vào bộ máy VertiPaq trong RAM, nơi các measure DAX tính toán số liệu động hiển thị lên các biểu đồ trên canvas.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Confusing Power Query (ETL/Data Preparation) with DAX (Analytical Calculations).',
          vi: 'Nhầm lẫn giữa vai trò của Power Query (ETL/Làm sạch dữ liệu) và DAX (Tính toán phân tích).'
        },
        correction: {
          en: 'Perform heavy data shaping, unpivoting, merging, and type casting in Power Query; write business metrics, dynamic ratios, and time-intelligence aggregations in DAX.',
          vi: 'Thực hiện làm sạch dữ liệu, xoay bảng (unpivot), gộp bảng và chuẩn hóa kiểu dữ liệu trong Power Query; viết chỉ số kinh doanh, tỷ lệ động và phân tích thời gian bằng DAX.'
        }
      },
      {
        mistake: {
          en: 'Treating Power BI like Microsoft Excel cell-by-cell spreadsheets.',
          vi: 'Tiếp cận Power BI như một bảng tính ô rời rạc kiểu Excel.'
        },
        correction: {
          en: 'Power BI operates on structured tabular datasets, columnar data structures, and relational models rather than individual coordinate cell references like A1 or B2.',
          vi: 'Power BI xử lý trên các bảng dữ liệu có cấu trúc, lưu trữ theo cột và mô hình quan hệ, thay vì tham chiếu từng tọa độ ô riêng lẻ như A1 hay B2.'
        }
      }
    ],
    tips: [
      {
        en: 'Use the Performance Analyzer pane in Power BI Desktop to inspect the execution time of visual queries, DAX formulas, and display rendering.',
        vi: 'Sử dụng khung Performance Analyzer trong Power BI Desktop để đo lường thời gian thực thi của truy vấn trực quan, công thức DAX và thời gian vẽ biểu đồ.'
      },
      {
        en: 'Collapse unused panes to maximize canvas real estate when building multi-page dashboard layouts.',
        vi: 'Thu gọn các bảng điều khiển chưa dùng để mở rộng không gian thiết kế khi xây dựng bố cục báo cáo đa trang.'
      }
    ],
    practiceStarterCode: `// Define a foundational DAX measure for total revenue
Total Revenue = SUM(Sales[Revenue])`
  },
  exercisePool: [
    {
      id: 'pbi_ex_1_1',
      type: 'predict_output',
      title: {
        en: 'Identify the Three Core Views in Power BI Desktop',
        vi: 'Nhận Diện Ba Khung Nhìn Cốt Lõi Trong Power BI Desktop'
      },
      instruction: {
        en: 'Which view in Power BI Desktop is dedicated to building charts, cards, and interactive dashboard visuals?',
        vi: 'Khung nhìn nào trong Power BI Desktop dùng riêng để xây dựng biểu đồ, thẻ chỉ số và trực quan hóa báo cáo tương tác?'
      },
      starterCode: '// Choose the correct Power BI Desktop primary view',
      solutionCode: 'Report View',
      options: ['Report View', 'Table View', 'Model View', 'DAX Query View'],
      correctOptionIndex: 0,
      explanation: {
        en: 'Report View is the primary visual design canvas where users drag and drop charts, tables, slicers, and KPI cards.',
        vi: 'Report View là không gian thiết kế chính nơi người dùng kéo thả các biểu đồ, bảng dữ liệu, slicer và thẻ chỉ số KPI.'
      }
    },
    {
      id: 'pbi_ex_1_2',
      type: 'modify_example',
      title: {
        en: 'Write Total Sales Measure in DAX',
        vi: 'Viết Đo Lường Total Sales Trong DAX'
      },
      instruction: {
        en: 'Write a basic DAX measure named Total Sales calculating the sum of the Sales[Revenue] column.',
        vi: 'Viết một measure DAX cơ bản có tên Total Sales tính tổng giá trị cột Sales[Revenue].'
      },
      starterCode: 'Total Sales = SUM(Sales[Revenue])',
      solutionCode: 'Total Sales = SUM(Sales[Revenue])',
      hint: {
        en: 'Use the syntax: MeasureName = SUM(TableName[ColumnName])',
        vi: 'Sử dụng cú pháp: TênMeasure = SUM(TênBảng[TênCột])'
      },
      explanation: {
        en: 'SUM(Sales[Revenue]) iterates through the column within the active filter context to return aggregate total sales.',
        vi: 'SUM(Sales[Revenue]) tính tổng toàn bộ các dòng của cột trong ngữ cảnh bộ lọc đang áp dụng.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_1',
    title: {
      en: 'Architect the Enterprise Power BI Pipeline',
      vi: 'Xây Dựng Khung Quy Trình Power BI Chuẩn Doanh Nghiệp'
    },
    description: {
      en: 'Declare the standard 4-stage Power BI architecture pipeline from data ingestion to end-user report interaction.',
      vi: 'Khai báo chu trình 4 giai đoạn chuẩn trong kiến trúc Power BI từ nạp dữ liệu đến tương tác báo cáo.'
    },
    requirements: [
      { en: '1. Power Query ETL (Data Ingestion & Cleaning)', vi: '1. Power Query ETL (Nạp và làm sạch dữ liệu)' },
      { en: '2. VertiPaq Data Modeling (Star Schema & Relationships)', vi: '2. Mô hình hóa VertiPaq (Star Schema & Quan hệ bảng)' },
      { en: '3. DAX Analytical Engine (Calculated Measures)', vi: '3. Bộ máy phân tích DAX (Các thước đo Measure)' },
      { en: '4. Report Canvas Visuals (Interactive Dashboards)', vi: '4. Giao diện báo cáo Canvas (Dashboard tương tác)' }
    ],
    starterCode: `// Step 1: Power Query ETL
// Step 2: VertiPaq Data Model
// Step 3: DAX Calculations
Total Revenue = SUM(Sales[Revenue])
// Step 4: Report Visuals Canvas`,
    solutionCode: `// Step 1: Power Query ETL
// Step 2: VertiPaq Data Model
// Step 3: DAX Calculations
Total Revenue = SUM(Sales[Revenue])
// Step 4: Report Visuals Canvas`,
    hints: [
      {
        en: 'Remember: Power Query handles ETL, VertiPaq stores compressed tables in RAM, and DAX computes dynamic measures on the visual canvas.',
        vi: 'Ghi nhớ: Power Query xử lý ETL, VertiPaq nén lưu trữ dữ liệu trong RAM, và DAX tính toán các measure động trên biểu đồ.'
      }
    ],
    solutionExplanation: {
      en: 'Understanding the 4-stage architectural separation ensures high performance, clean relational schemas, and responsive dashboards.',
      vi: 'Hiểu rõ sự phân tách 4 tầng kiến trúc đảm bảo mô hình hoạt động tốc độ cao, cấu trúc quan hệ chuẩn mực và báo cáo mượt mà.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_1_1',
      type: 'single_choice',
      question: {
        en: 'What is the internal in-memory columnar database engine that powers data storage and compression in Power BI Desktop?',
        vi: 'Bộ máy cơ sở dữ liệu lưu trữ theo cột trong bộ nhớ RAM chịu trách nhiệm nén và truy vấn dữ liệu trong Power BI Desktop là gì?'
      },
      options: [
        { en: 'VertiPaq Engine', vi: 'VertiPaq Engine' },
        { en: 'Microsoft Access Jet Engine', vi: 'Microsoft Access Jet Engine' },
        { en: 'SQLite Driver', vi: 'SQLite Driver' },
        { en: 'Excel Calculation Grid', vi: 'Excel Calculation Grid' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The VertiPaq in-memory columnar engine compresses data heavily using dictionary encoding, run-length encoding, and bit-packing to achieve fast analytical query performance.',
        vi: 'Bộ máy VertiPaq lưu trữ dữ liệu dạng cột trong RAM với các kỹ thuật nén từ điển, run-length encoding và bit-packing giúp tăng tốc truy vấn phân tích vượt trội.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_1_2',
      type: 'single_choice',
      question: {
        en: 'Which view in Power BI Desktop is used to establish and manage relationships between different tables (such as 1-to-many cardinality)?',
        vi: 'Khung nhìn nào trong Power BI Desktop được dùng để thiết lập và quản lý các mối quan hệ giữa các bảng (như quan hệ 1-Nhiều)?'
      },
      options: [
        { en: 'Model View', vi: 'Model View (Khung nhìn Mô hình)' },
        { en: 'Report View', vi: 'Report View (Khung nhìn Báo cáo)' },
        { en: 'Table View', vi: 'Table View (Khung nhìn Bảng)' },
        { en: 'Format Pane', vi: 'Format Pane (Bảng Định dạng)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Model View provides a visual diagram canvas where developers drag keys between tables to define cardinality, cross-filter direction, and active status.',
        vi: 'Model View cung cấp sơ đồ quan hệ trực quan giúp người phát triển kéo thả khóa giữa các bảng để xác định cardinality, chiều lọc và trạng thái kích hoạt.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_1_3',
      type: 'single_choice',
      question: {
        en: 'What language is used under the hood in Power Query for data transformation and ETL operations?',
        vi: 'Ngôn ngữ nào được sử dụng bên dưới Power Query để thực hiện các thao tác chuyển đổi và làm sạch dữ liệu (ETL)?'
      },
      options: [
        { en: 'M (Power Query Formula Language)', vi: 'M (Ngôn ngữ công thức Power Query)' },
        { en: 'DAX (Data Analysis Expressions)', vi: 'DAX (Data Analysis Expressions)' },
        { en: 'VBA (Visual Basic for Applications)', vi: 'VBA' },
        { en: 'JavaScript ES6', vi: 'JavaScript ES6' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Power Query runs on the M formula language, a functional, case-sensitive language designed specifically for data mashup and transformation.',
        vi: 'Power Query hoạt động dựa trên ngôn ngữ hàm M, một ngôn ngữ phân biệt chữ hoa chữ thường được thiết kế chuyên biệt cho việc trích xuất và biến đổi dữ liệu.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_1_4',
      type: 'true_false',
      question: {
        en: 'In Power BI, DAX measures store their calculated values directly on the hard drive inside the .pbix file for every single row.',
        vi: 'Trong Power BI, các measure DAX lưu giá trị tính toán trực tiếp vào ổ đĩa trong tệp .pbix cho từng dòng dữ liệu.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. DAX measures are dynamic formulas computed at query time based on the active visual filter context and do not consume physical disk storage per row.',
        vi: 'Sai. Measure DAX là công thức tính toán động tại thời điểm truy vấn dựa trên ngữ cảnh bộ lọc của biểu đồ và không chiếm dung lượng lưu trữ trên đĩa theo từng dòng.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_1_5',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are primary panes available in the Power BI Desktop Report View? (Select all that apply)',
        vi: 'Những bảng điều khiển nào sau đây là các bảng chính trong giao diện Report View của Power BI Desktop? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Data / Fields Pane', vi: 'Khung Dữ liệu / Trường (Data Pane)' },
        { en: 'Visualizations Pane', vi: 'Khung Trực quan hóa (Visualizations Pane)' },
        { en: 'Filters Pane', vi: 'Khung Bộ lọc (Filters Pane)' },
        { en: 'Excel VBA Macro Editor', vi: 'Trình soạn thảo Excel VBA' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Data pane, Visualizations pane, and Filters pane are the standard working panes in Report View.',
        vi: 'Khung Data, khung Visualizations và khung Filters là 3 bảng điều khiển cơ bản trong Report View.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_1_6',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference in purpose between Power Query (M) and DAX?',
        vi: 'Điểm khác biệt cốt lõi về mục đích sử dụng giữa Power Query (M) và DAX là gì?'
      },
      options: [
        {
          en: 'Power Query is for data ingestion, cleaning, and transformation (ETL); DAX is for analytical calculations and dynamic business metrics on the data model',
          vi: 'Power Query dùng để nạp, làm sạch và chuyển đổi dữ liệu (ETL); DAX dùng để tính toán phân tích và tạo các chỉ số đo lường động trên mô hình dữ liệu'
        },
        {
          en: 'Power Query is only for drawing charts; DAX is for connecting to databases',
          vi: 'Power Query chỉ dùng vẽ biểu đồ; DAX dùng kết nối cơ sở dữ liệu'
        },
        {
          en: 'Power Query and DAX are exact synonyms that perform identical tasks',
          vi: 'Power Query và DAX là hai thuật ngữ hoàn toàn đồng nghĩa'
        },
        {
          en: 'DAX is evaluated in Excel, while Power Query runs in Python only',
          vi: 'DAX chạy trong Excel, còn Power Query chỉ chạy bằng Python'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Power Query handles upstream ETL transformations during data load, while DAX evaluates calculations dynamically across the VertiPaq tabular model during user interaction.',
        vi: 'Power Query xử lý làm sạch dữ liệu trong quá trình nạp (ETL), còn DAX tính toán các chỉ số kinh doanh động trên mô hình dữ liệu VertiPaq khi người dùng tương tác.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_1_7',
      type: 'true_false',
      question: {
        en: 'Power BI Desktop is a free authoring tool used locally on Windows PCs to build data models and reports before publishing them to the cloud.',
        vi: 'Power BI Desktop là công cụ thiết kế miễn phí cài đặt cục bộ trên máy tính Windows để xây dựng mô hình dữ liệu và báo cáo trước khi xuất bản lên đám mây.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Power BI Desktop is freely downloadable for Windows to develop and test models, which can then be published to Power BI Service.',
        vi: 'Đúng. Power BI Desktop là ứng dụng miễn phí trên Windows dùng để phát triển báo cáo trước khi publish lên Power BI Service.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_1_8',
      type: 'single_choice',
      question: {
        en: 'Which file extension is used for standard Power BI Desktop workbook files containing data model, queries, and reports?',
        vi: 'Đuôi tệp chuẩn của tệp dự án Power BI Desktop chứa mô hình dữ liệu, truy vấn và các trang báo cáo là gì?'
      },
      options: [
        { en: '.pbix', vi: '.pbix' },
        { en: '.xlsx', vi: '.xlsx' },
        { en: '.pbit', vi: '.pbit' },
        { en: '.dax', vi: '.dax' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '.pbix is the standard file format for Power BI Desktop files, while .pbit is used for Power BI Templates (without imported data).',
        vi: '.pbix là định dạng tệp chuẩn của Power BI Desktop, còn .pbit là tệp mẫu template (không chứa dữ liệu nạp sẵn).'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_1_9',
      type: 'predict_output',
      question: {
        en: 'What does the DAX definition "Total Units = SUM(Sales[Quantity])" create in a Power BI dataset?',
        vi: 'Định nghĩa DAX "Total Units = SUM(Sales[Quantity])" tạo ra đối tượng nào trong tập dữ liệu Power BI?'
      },
      options: [
        {
          en: 'A dynamic explicit measure that aggregates the Quantity column based on the visual filter context',
          vi: 'Một measure tường minh động tính tổng cột Quantity theo ngữ cảnh bộ lọc của biểu đồ'
        },
        {
          en: 'A physical column containing redundant repeated values on disk',
          vi: 'Một cột vật lý lưu giá trị lặp lại trên đĩa cứng'
        },
        {
          en: 'A new table named Total Units with a single cell',
          vi: 'Một bảng mới tên Total Units có đúng một ô'
        },
        {
          en: 'A Power Query M step in the Applied Steps list',
          vi: 'Một bước biến đổi M trong danh sách Applied Steps'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The formula creates an explicit DAX measure that aggregates the sum of quantities dynamically depending on the active visual filters.',
        vi: 'Công thức tạo một explicit measure trong DAX tự động tính tổng số lượng dựa trên bộ lọc đang áp dụng của từng biểu đồ.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_1_10',
      type: 'single_choice',
      question: {
        en: 'Which built-in tool in Power BI Desktop enables report creators to record and analyze visual loading times and DAX query latency?',
        vi: 'Công cụ tích hợp sẵn nào trong Power BI Desktop cho phép người tạo báo cáo ghi lại và phân tích thời gian tải biểu đồ cùng độ trễ truy vấn DAX?'
      },
      options: [
        { en: 'Performance Analyzer', vi: 'Performance Analyzer (Trình phân tích hiệu năng)' },
        { en: 'Task Manager', vi: 'Task Manager' },
        { en: 'SQL Profiler Lite', vi: 'SQL Profiler Lite' },
        { en: 'DAX Spellchecker', vi: 'DAX Spellchecker' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Performance Analyzer pane logs the exact milliseconds required for DAX queries, visual display rendering, and other background tasks for every visual on the page.',
        vi: 'Khung Performance Analyzer đo lường chi tiết từng mili-giây cho truy vấn DAX, hiển thị trực quan và các tác vụ nền cho mọi biểu đồ trên trang.'
      },
      topicId: 'pbi_desktop_ecosystem',
      difficulty: 'medium'
    }
  ]
};

export default lesson01;
