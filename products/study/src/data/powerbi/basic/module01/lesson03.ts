import { Lesson } from '../../../../types';

export const lesson03: Lesson = {
  id: 'pbi_lesson_3',
  moduleId: 'pbi_mod_1',
  levelId: 'basic',
  courseId: 'powerbi',
  order: 3,
  topicId: 'star_schema_fundamentals',
  title: {
    en: 'Data Modeling Fundamentals: Fact Tables, Dimension Tables & Star Schema',
    vi: 'Nền Tảng Mô Hình Hóa Dữ Liệu: Bảng Fact, Bảng Dimension & Star Schema'
  },
  summary: {
    en: 'Distinguish quantitative Fact tables from descriptive Dimension tables and structure clean, scalable Star Schemas.',
    vi: 'Phân biệt bảng Fact định lượng và bảng Dimension mô tả, xây dựng kiến trúc Star Schema mở rộng và tối ưu.'
  },
  estimatedMinutes: 14,
  learn: {
    introduction: {
      en: 'Dimensional modeling, formalized by Ralph Kimball, is the cornerstone of high-performance Power BI reporting. A Star Schema places a central Fact table (storing numeric measurements and foreign keys) in the center, surrounded by radiating Dimension tables (storing context like Customers, Products, Stores, and Dates). Star Schemas are faster, simpler, and less error-prone than single flat tables or complex Snowflake schemas.',
      vi: 'Mô hình hóa chiều dữ liệu (Dimensional Modeling) theo phương pháp Ralph Kimball là nền tảng của các hệ thống Power BI hiệu năng cao. Mô hình Star Schema đặt một bảng Fact trung tâm (lưu trữ các số liệu đo lường định lượng và khóa ngoại) ở giữa, bao quanh bởi các bảng Dimension vệ tinh (chứa ngữ cảnh như Khách hàng, Sản phẩm, Chi nhánh và Thời gian). Star Schema xử lý nhanh hơn, đơn giản hơn và ít lỗi hơn so với việc gộp chung vào 1 bảng phẳng khổng lồ hay mô hình Snowflake phức tạp.'
    },
    conceptExplanation: {
      en: 'Key principles of Star Schema modeling:\n1. Fact Tables: Contain high-volume numeric transactional data (Revenue, Cost, Quantity Sold) and foreign keys linking to dimensions. They represent business events.\n2. Dimension Tables: Contain unique primary keys and rich descriptive attributes used to filter, slice, dice, and group facts (e.g. Customer Name, Product Category, Region).\n3. Grain: The lowest level of detail represented in the Fact table (e.g. one row per line item in a sales order).\n4. Surrogate Keys vs Natural Keys: Clean integer surrogate keys provide optimal VertiPaq compression compared to long alphanumeric natural codes.',
      vi: 'Các nguyên lý cốt lõi của mô hình Star Schema:\n1. Bảng Fact: Chứa dữ liệu giao dịch định lượng khối lượng lớn (Doanh thu, Chi phí, Số lượng) và các khóa ngoại liên kết tới bảng dimension. Đại diện cho các sự kiện kinh doanh.\n2. Bảng Dimension: Chứa khóa chính duy nhất và các thuộc tính mô tả chi tiết dùng để lọc, phân loại, cắt lát và gom nhóm số liệu (như Tên khách hàng, Danh mục sản phẩm, Khu vực).\n3. Độ chi tiết (Grain): Mức độ chi tiết thấp nhất của từng dòng trong bảng Fact (ví dụ: mỗi dòng là một chi tiết sản phẩm trong đơn hàng).\n4. Khóa thay thế (Surrogate Key) so với Khóa tự nhiên: Khóa số nguyên đại diện giúp VertiPaq nén tối ưu hơn nhiều so với chuỗi văn bản dài.'
    },
    syntax: '// Star Schema Relational Layout:\n// Dim_Customers[CustomerID] (1) ---> (*) Fact_Sales[CustomerID]\n// Dim_Products[ProductID]   (1) ---> (*) Fact_Sales[ProductID]\n// Dim_Calendar[Date]        (1) ---> (*) Fact_Sales[OrderDate]',
    examples: [
      {
        title: {
          en: 'Star Schema Architecture in Tabular Modeling',
          vi: 'Cấu Trúc Mô Hình Star Schema Trong Power BI'
        },
        code: `// Fact Table: Fact_Sales
// Columns: OrderID, CustomerKey, ProductKey, OrderDate, Quantity, Revenue, UnitCost

// Dimension 1: Dim_Customers
// Columns: CustomerKey (PK), CustomerName, Segment, City, Country

// Dimension 2: Dim_Products
// Columns: ProductKey (PK), ProductName, Category, SubCategory, ListPrice

// Dimension 3: Dim_Calendar
// Columns: Date (PK), Year, Quarter, MonthName, MonthYear, DayOfWeek`,
        language: 'dax',
        explanation: {
          en: 'Dimensions connect to the Fact table via 1-to-Many relationships. When a user filters on Dim_Customers[City] = "Hanoi", the filter automatically propagates down to filter Fact_Sales rows.',
          vi: 'Các bảng Dimension kết nối với bảng Fact qua quan hệ 1-Nhiều. Khi người dùng lọc Dim_Customers[City] = "Hanoi", bộ lọc tự động truyền xuống để lọc các dòng trong Fact_Sales.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Merging all tables into one massive flat table with 50+ columns containing repetitive customer and product text.',
          vi: 'Gộp tất cả dữ liệu vào 1 bảng phẳng duy nhất có hơn 50 cột chứa văn bản tên khách hàng và sản phẩm lặp đi lặp lại.'
        },
        correction: {
          en: 'Separate descriptive entity attributes into dedicated Dimension tables. This drastically reduces model memory footprint and eliminates DAX calculation ambiguity.',
          vi: 'Tách các thuộc tính thực thể vào các bảng Dimension riêng biệt. Điều này giảm mạnh dung lượng RAM và loại bỏ sự mơ hồ trong tính toán DAX.'
        }
      },
      {
        mistake: {
          en: 'Over-normalizing into deep Snowflake hierarchies (Category -> Subcategory -> Product -> Sales) with multiple chained relationships.',
          vi: 'Chuẩn hóa quá mức thành mô hình Snowflake nhiều tầng (Nhóm -> Phân nhánh -> Sản phẩm -> Bán hàng) tạo thành chuỗi quan hệ nối tiếp.'
        },
        correction: {
          en: 'Collapse/denormalize dimension hierarchies into a single Dimension table (e.g. combine Category and SubCategory directly into Dim_Products).',
          vi: 'Làm phẳng các tầng phân cấp trực tiếp vào 1 bảng Dimension duy nhất (ví dụ: gộp Category và SubCategory vào Dim_Products).'
        }
      }
    ],
    tips: [
      {
        en: 'Hide all foreign key columns in your Fact table (like CustomerKey, ProductKey) so report authors are forced to use the rich descriptive columns in the Dimension tables.',
        vi: 'Ẩn tất cả các cột khóa ngoại trong bảng Fact (như CustomerKey, ProductKey) để người làm báo cáo luôn dùng các trường thuộc tính chuẩn từ bảng Dimension.'
      },
      {
        en: 'Ensure every dimension table contains a single unique row per entity instance with no duplicates in its Primary Key column.',
        vi: 'Đảm bảo mỗi bảng dimension chỉ chứa đúng một dòng duy nhất cho mỗi thực thể, không bị trùng lặp ở cột Khóa chính.'
      }
    ],
    practiceStarterCode: `// DAX measure evaluated across a Star Schema model
Total Revenue = SUM(Fact_Sales[Revenue])`
  },
  exercisePool: [
    {
      id: 'pbi_ex_3_1',
      type: 'predict_output',
      title: {
        en: 'Classify Table Type in Star Schema',
        vi: 'Phân Loại Kiểu Bảng Trong Star Schema'
      },
      instruction: {
        en: 'In an e-commerce model, which table is the Fact table: Dim_Customer, Dim_Product, Fact_Orders, or Dim_Date?',
        vi: 'Trong mô hình thương mại điện tử, bảng nào là bảng Fact: Dim_Customer, Dim_Product, Fact_Orders hay Dim_Date?'
      },
      starterCode: '// Identify the Fact table',
      solutionCode: 'Fact_Orders',
      options: ['Fact_Orders', 'Dim_Customer', 'Dim_Product', 'Dim_Date'],
      correctOptionIndex: 0,
      explanation: {
        en: 'Fact_Orders contains transactional quantitative business measurements (Order Quantity, Total Amount, Discount) and foreign keys.',
        vi: 'Fact_Orders chứa các chỉ số đo lường định lượng của giao dịch (Số lượng, Doanh số, Chiết khấu) và các khóa ngoại liên kết.'
      }
    },
    {
      id: 'pbi_ex_3_2',
      type: 'complete_code',
      title: {
        en: 'Define Total Profit Measure on Fact Table',
        vi: 'Định Nghĩa Measure Total Profit Trên Bảng Fact'
      },
      instruction: {
        en: 'Complete the DAX formula to sum the Profit column in Fact_Sales.',
        vi: 'Hoàn thiện công thức DAX để tính tổng cột Profit trong bảng Fact_Sales.'
      },
      starterCode: 'Total Profit = SUM(Fact_Sales[___])',
      solutionCode: 'Total Profit = SUM(Fact_Sales[Profit])',
      hint: {
        en: 'Fill in the column name: Profit',
        vi: 'Điền tên cột: Profit'
      },
      explanation: {
        en: 'SUM aggregates the quantitative Profit column from the central Fact table.',
        vi: 'SUM tổng hợp cột Profit định lượng từ bảng Fact trung tâm.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_3',
    title: {
      en: 'Architect an Optimal Star Schema Model',
      vi: 'Thiết Kế Mô Hình Star Schema Tối Ưu'
    },
    description: {
      en: 'Structure a complete Star Schema specification linking 3 Dimension tables to a central Fact_Sales table.',
      vi: 'Thiết kế đặc tả mô hình Star Schema hoàn chỉnh kết nối 3 bảng Dimension vào bảng Fact_Sales trung tâm.'
    },
    requirements: [
      { en: '1. Fact table: Fact_Sales (OrderKey, CustomerKey, ProductKey, DateKey, Revenue, Profit)', vi: '1. Bảng Fact: Fact_Sales (OrderKey, CustomerKey, ProductKey, DateKey, Revenue, Profit)' },
      { en: '2. Dimension 1: Dim_Customers (CustomerKey PK, CustomerName, Region)', vi: '2. Bảng Dimension 1: Dim_Customers (CustomerKey PK, CustomerName, Region)' },
      { en: '3. Dimension 2: Dim_Products (ProductKey PK, ProductName, Category)', vi: '3. Bảng Dimension 2: Dim_Products (ProductKey PK, ProductName, Category)' },
      { en: '4. Dimension 3: Dim_Calendar (DateKey PK, FullDate, Year, MonthName)', vi: '4. Bảng Dimension 3: Dim_Calendar (DateKey PK, FullDate, Year, MonthName)' }
    ],
    starterCode: `// Define Star Schema Architecture
// 1. Fact_Sales (Foreign Keys: CustomerKey, ProductKey, DateKey)
// 2. Dim_Customers (Primary Key: CustomerKey)
// 3. Dim_Products (Primary Key: ProductKey)
// 4. Dim_Calendar (Primary Key: DateKey)
Total Revenue = SUM(Fact_Sales[Revenue])`,
    solutionCode: `// Define Star Schema Architecture
// 1. Fact_Sales (Foreign Keys: CustomerKey, ProductKey, DateKey)
// 2. Dim_Customers (Primary Key: CustomerKey)
// 3. Dim_Products (Primary Key: ProductKey)
// 4. Dim_Calendar (Primary Key: DateKey)
Total Revenue = SUM(Fact_Sales[Revenue])`,
    hints: [
      {
        en: 'Each Dimension table has a unique Primary Key (1-side) that connects to the Fact table Foreign Key (*-side).',
        vi: 'Mỗi bảng Dimension có một Khóa chính duy nhất (phía 1) kết nối tới Khóa ngoại trong bảng Fact (phía Nhiều).'
      }
    ],
    solutionExplanation: {
      en: 'The Star Schema structure delivers blazing fast VertiPaq query speeds and ensures filter propagation behaves predictably.',
      vi: 'Cấu trúc Star Schema mang lại tốc độ truy vấn vượt trội trong VertiPaq và đảm bảo luồng lọc di chuyển nhất quán.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_3_1',
      type: 'single_choice',
      question: {
        en: 'In dimensional data modeling, what is the primary characteristic of a Fact table?',
        vi: 'Trong mô hình hóa dữ liệu chiều, đặc điểm cốt lõi nhất của một bảng Fact là gì?'
      },
      options: [
        {
          en: 'It stores numeric quantitative measurements, metrics, and foreign keys representing business transactions or events',
          vi: 'Lưu trữ các số liệu đo lường định lượng, chỉ số và các khóa ngoại đại diện cho các giao dịch hoặc sự kiện kinh doanh'
        },
        {
          en: 'It only stores text descriptions of products and customers',
          vi: 'Chỉ lưu trữ mô tả văn bản của sản phẩm và khách hàng'
        },
        {
          en: 'It must always contain fewer than 10 rows of data',
          vi: 'Bắt buộc phải chứa ít hơn 10 dòng dữ liệu'
        },
        {
          en: 'It contains the visual themes and color palettes of the report',
          vi: 'Chứa chủ đề giao diện và bảng màu của báo cáo'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Fact tables contain numerical measurements (Sales Amount, Cost, Quantity) and foreign keys connecting them to surrounding dimensions.',
        vi: 'Bảng Fact chứa các số liệu định lượng (Doanh thu, Chi phí, Số lượng) và các khóa ngoại kết nối với các bảng dimension xung quanh.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_3_2',
      type: 'single_choice',
      question: {
        en: 'What is the primary role of a Dimension table in a Power BI data model?',
        vi: 'Vai trò chính của một bảng Dimension trong mô hình dữ liệu Power BI là gì?'
      },
      options: [
        {
          en: 'To provide descriptive contextual attributes used to filter, slice, dice, and group quantitative metrics',
          vi: 'Cung cấp các thuộc tính mô tả ngữ cảnh dùng để lọc, phân loại, cắt lát và gom nhóm các chỉ số định lượng'
        },
        {
          en: 'To execute background SQL stored procedures',
          vi: 'Thực thi các stored procedure SQL ngầm'
        },
        {
          en: 'To compress the hard disk firmware',
          vi: 'Nén firmware ổ cứng'
        },
        {
          en: 'To store audio and video files for report tooltips',
          vi: 'Lưu trữ tệp âm thanh và video cho tooltip'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Dimension tables store master descriptive attributes (Customer Name, Category, Region, Date) that give context to facts.',
        vi: 'Bảng Dimension lưu các thuộc tính mô tả định danh (Tên khách hàng, Danh mục, Vùng miền, Ngày) giúp cung cấp ngữ cảnh cho bảng fact.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_3_3',
      type: 'single_choice',
      question: {
        en: 'What architectural structure describes a central Fact table connected directly to independent Dimension tables resembling a star?',
        vi: 'Cấu trúc kiến trúc nào mô tả một bảng Fact trung tâm kết nối trực tiếp tới các bảng Dimension độc lập xung quanh tạo thành hình ngôi sao?'
      },
      options: [
        { en: 'Star Schema', vi: 'Star Schema (Mô hình Ngôi sao)' },
        { en: 'Network Mesh', vi: 'Network Mesh' },
        { en: 'Circular Ring', vi: 'Circular Ring' },
        { en: 'Flat Spreadsheet', vi: 'Flat Spreadsheet' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Star Schema is the classic dimensional structure where dimension tables connect directly to a central fact table.',
        vi: 'Star Schema là cấu trúc mô hình hóa chuẩn mực nơi các bảng dimension kết nối trực tiếp vào một bảng fact trung tâm.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_3_4',
      type: 'single_choice',
      question: {
        en: 'What is the term used to describe the lowest level of detail recorded in a Fact table (e.g. order header level vs order line item level)?',
        vi: 'Thuật ngữ nào dùng để chỉ mức độ chi tiết thấp nhất được ghi nhận trong một bảng Fact (ví dụ: cấp đơn hàng tổng thể so với cấp chi tiết từng sản phẩm)?'
      },
      options: [
        { en: 'Grain (Granularity)', vi: 'Grain (Độ chi tiết / Granularity)' },
        { en: 'Cardinality Matrix', vi: 'Cardinality Matrix' },
        { en: 'Index Seed', vi: 'Index Seed' },
        { en: 'Cluster Factor', vi: 'Cluster Factor' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The "Grain" defines exactly what a single row in the Fact table represents.',
        vi: 'Thuật ngữ "Grain" xác định chính xác một dòng đơn lẻ trong bảng Fact đại diện cho đối tượng/giao dịch gì.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_3_5',
      type: 'true_false',
      question: {
        en: 'A Snowflake schema is always faster and more performant in Power BI VertiPaq engine than a Star Schema.',
        vi: 'Mô hình Snowflake luôn xử lý nhanh hơn và đạt hiệu năng cao hơn mô hình Star Schema trong bộ máy VertiPaq của Power BI.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Star Schema is faster and more optimal in VertiPaq because it minimizes relationship traversal and simplifies DAX evaluation context.',
        vi: 'Sai. Star Schema tối ưu và chạy nhanh hơn trong VertiPaq vì giảm thiểu số bước đi qua quan hệ và đơn giản hóa ngữ cảnh tính toán DAX.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_3_6',
      type: 'single_choice',
      question: {
        en: 'Why is an integer Surrogate Key (e.g., 101, 102) preferred over a long alphanumeric Natural Key (e.g., "PROD-US-WEST-2024-9988-XYZ") in Power BI relationships?',
        vi: 'Vì sao Khóa thay thế dạng số nguyên (Surrogate Key) được ưu tiên hơn Khóa tự nhiên dạng văn bản dài trong các mối quan hệ Power BI?'
      },
      options: [
        {
          en: 'Integers compress significantly better in the VertiPaq engine, consuming less RAM and accelerating relationship joins',
          vi: 'Số nguyên được nén tối ưu hơn nhiều trong VertiPaq, tiết kiệm dung lượng RAM và tăng tốc độ ghép nối quan hệ'
        },
        {
          en: 'Power BI does not support text columns at all',
          vi: 'Power BI hoàn toàn không hỗ trợ cột văn bản'
        },
        {
          en: 'Integers automatically convert all charts into 3D',
          vi: 'Số nguyên tự động chuyển biểu đồ thành 3D'
        },
        {
          en: 'Natural keys can only be viewed by administrators',
          vi: 'Khóa tự nhiên chỉ người quản trị mới xem được'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Integer surrogate keys optimize dictionary encoding and bit-packing compression inside the VertiPaq columnar memory.',
        vi: 'Khóa thay thế số nguyên tối ưu hóa mã hóa từ điển và nén bit-packing trong bộ nhớ cột VertiPaq.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_3_7',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are typical Dimension tables in an enterprise sales data model? (Select all that apply)',
        vi: 'Những bảng nào sau đây là các bảng Dimension điển hình trong mô hình phân tích bán hàng doanh nghiệp? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Dim_Customers', vi: 'Dim_Customers (Bảng Khách hàng)' },
        { en: 'Dim_Products', vi: 'Dim_Products (Bảng Sản phẩm)' },
        { en: 'Dim_Date (Calendar)', vi: 'Dim_Date (Bảng Ngày/Lịch)' },
        { en: 'Fact_Sales_Transactions', vi: 'Fact_Sales_Transactions' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Dim_Customers, Dim_Products, and Dim_Date contain descriptive entity attributes, whereas Fact_Sales_Transactions is a Fact table.',
        vi: 'Dim_Customers, Dim_Products và Dim_Date lưu thông tin mô tả nên là bảng Dimension, còn Fact_Sales_Transactions là bảng Fact.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_3_8',
      type: 'true_false',
      question: {
        en: 'In a Star Schema, Dimension table primary keys must be strictly unique with no duplicate rows.',
        vi: 'Trong mô hình Star Schema, các khóa chính của bảng Dimension bắt buộc phải là duy nhất và không được phép có dòng trùng lặp.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. The "1-side" of a 1-to-many relationship requires guaranteed unique values in the dimension key column.',
        vi: 'Đúng. Phía "1" trong mối quan hệ 1-Nhiều bắt buộc cột khóa bảng dimension phải có các giá trị duy nhất tuyệt đối.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_3_9',
      type: 'single_choice',
      question: {
        en: 'What happens when a single flat wide table containing 10 million rows and repeated customer addresses is normalized into a Star Schema?',
        vi: 'Điều gì xảy ra khi một bảng phẳng 10 triệu dòng chứa thông tin địa chỉ khách hàng lặp đi lặp lại được chuẩn hóa thành mô hình Star Schema?'
      },
      options: [
        {
          en: 'Dataset file size and memory footprint decrease drastically due to eliminating redundant text repetitions',
          vi: 'Dung lượng tệp và bộ nhớ RAM giảm đáng kể do loại bỏ văn bản địa chỉ lặp lại dư thừa'
        },
        {
          en: 'The dataset size increases by 500%',
          vi: 'Dung lượng tập dữ liệu tăng thêm 500%'
        },
        {
          en: 'All DAX measures stop working permanently',
          vi: 'Tất cả các measure DAX ngừng hoạt động vĩnh viễn'
        },
        {
          en: 'Power BI automatically deletes the fact records',
          vi: 'Power BI tự động xóa các bản ghi trong fact'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Extracting repeated strings into a compact Dimension table saves massive columnar memory in the VertiPaq engine.',
        vi: 'Tách các chuỗi ký tự lặp lại sang bảng Dimension gọn nhẹ giúp tiết kiệm dung lượng bộ nhớ khổng lồ trong VertiPaq.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_3_10',
      type: 'predict_output',
      question: {
        en: 'In a Star Schema with Dim_Products linked to Fact_Sales, what occurs when a visual slicer selects Category = "Electronics"?',
        vi: 'Trong Star Schema với Dim_Products kết nối tới Fact_Sales, điều gì xảy ra khi người dùng chọn trên slicer Category = "Electronics"?'
      },
      options: [
        {
          en: 'The filter filters Dim_Products and propagates down the active 1:* relationship to filter Fact_Sales to only Electronics orders',
          vi: 'Bộ lọc lọc bảng Dim_Products và truyền dọc theo mối quan hệ 1:* để lọc Fact_Sales chỉ còn các đơn hàng thuộc nhóm Electronics'
        },
        {
          en: 'It deletes all non-electronics products from the hard drive',
          vi: 'Nó xóa vĩnh viễn các sản phẩm khác khỏi ổ đĩa'
        },
        {
          en: 'It reverses the relationship direction to Many-to-Many',
          vi: 'Nó đảo ngược chiều quan hệ thành Nhiều-Nhiều'
        },
        {
          en: 'It disables all other charts on the canvas',
          vi: 'Nó vô hiệu hóa tất cả các biểu đồ khác trên canvas'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Filter context flows naturally from the 1-side dimension table to the many-side fact table along active relationships.',
        vi: 'Ngữ cảnh bộ lọc di chuyển tự nhiên từ bảng dimension phía 1 sang bảng fact phía nhiều dọc theo mối quan hệ đang hoạt động.'
      },
      topicId: 'star_schema_fundamentals',
      difficulty: 'medium'
    }
  ]
};

export default lesson03;
