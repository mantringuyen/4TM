import { Lesson } from '../../../../types';

export const lesson04: Lesson = {
  id: 'pbi_lesson_4',
  moduleId: 'pbi_mod_2',
  levelId: 'basic',
  courseId: 'powerbi',
  order: 4,
  topicId: 'star_schema_relationships',
  title: {
    en: 'Relationships: Cardinality, Cross-Filter Direction & Model Design',
    vi: 'Mối Quan Hệ: Tính Tương Quan (Cardinality), Chiều Lọc & Thiết Kế Mô Hình'
  },
  summary: {
    en: 'Configure 1-to-Many cardinality, manage single vs bidirectional cross-filtering, and eliminate circular relationship paths.',
    vi: 'Cấu hình tính tương quan 1-Nhiều (1:*), quản lý chiều lọc Single/Both và loại bỏ các đường dẫn quan hệ vòng lặp.'
  },
  estimatedMinutes: 14,
  learn: {
    introduction: {
      en: 'Relationships in Power BI define how filter context propagates across tables during visual evaluation. The gold standard cardinality is One-to-Many (1:*), linking a unique primary key in a Dimension table to multiple foreign key instances in a Fact table. Proper relationship configuration ensures accurate calculations and high-speed VertiPaq query performance.',
      vi: 'Mối quan hệ trong Power BI xác định cách thức ngữ cảnh bộ lọc truyền giữa các bảng khi vẽ biểu đồ. Tỷ lệ tương quan chuẩn vàng là Một-Nhiều (1:*), liên kết khóa chính duy nhất của bảng Dimension với nhiều dòng khóa ngoại trong bảng Fact. Cấu hình quan hệ đúng đắn đảm bảo tính toán chính xác và hiệu năng tối ưu.'
    },
    conceptExplanation: {
      en: 'Key relationship concepts in Power BI:\n1. Cardinality Types: One-to-Many (1:*), Many-to-One (*:1), One-to-One (1:1), and Many-to-Many (*:*).\n2. Cross-Filter Direction: "Single" allows filters to flow only from the 1-side (Dimension) to the *-side (Fact). "Both" (Bidirectional) allows filters to travel in both directions, but introduces performance costs and ambiguity.\n3. Active vs Inactive Relationships: Only ONE active relationship can exist between two tables at a time. Secondary relationships remain inactive and are activated selectively in DAX using USERELATIONSHIP().',
      vi: 'Các khái niệm quan hệ cốt lõi trong Power BI:\n1. Các kiểu Cardinality: Một-Nhiều (1:*), Nhiều-Một (*:1), Một-Một (1:1), và Nhiều-Nhiều (*:*).\n2. Chiều lọc chéo (Cross-Filter Direction): "Single" chỉ cho phép bộ lọc di chuyển từ phía 1 (Dimension) sang phía Nhiều (Fact). "Both" (Hai chiều) cho phép lọc ngược lại nhưng dễ gây chậm truy vấn và xung đột vòng lặp.\n3. Quan hệ Active và Inactive: Chỉ duy nhất 1 mối quan hệ Active được hoạt động cùng lúc giữa 2 bảng. Các mối quan hệ phụ sẽ ở trạng thái Inactive (nét đứt) và được kích hoạt động trong DAX bằng hàm USERELATIONSHIP().'
    },
    syntax: '// Referencing Dimension values via active relationship:\nRELATED(Dim_Products[UnitCost])\n\n// Counting matching Fact rows from a Dimension:\nCOUNTROWS(RELATEDTABLE(Fact_Sales))',
    examples: [
      {
        title: {
          en: 'Lookup Dimension Attributes using RELATED()',
          vi: 'Tra Cứu Thuộc Tính Dimension Bằng Hàm RELATED()'
        },
        code: `// In Fact_Sales calculated column or row context:
Line Cost = Fact_Sales[Quantity] * RELATED(Dim_Products[UnitCost])

// Total Orders per Customer in Dim_Customers:
Order Count = COUNTROWS(RELATEDTABLE(Fact_Sales))`,
        language: 'dax',
        explanation: {
          en: 'RELATED follows the active many-to-one relationship to retrieve scalar values from the 1-side dimension table.',
          vi: 'Hàm RELATED lần theo quan hệ nhiều-một đang hoạt động để lấy giá trị đơn lẻ từ bảng dimension phía 1.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Enabling "Both" (Bidirectional) cross-filtering on all relationships by default.',
          vi: 'Bật chế độ lọc hai chiều "Both" trên tất cả các mối quan hệ theo thói quen.'
        },
        correction: {
          en: 'Keep relationships set to "Single" direction. Use DAX functions like CROSSFILTER() or CALCULATE() with bridge tables when specific reverse filtering is required.',
          vi: 'Luôn giữ chiều lọc là "Single". Chỉ dùng hàm CROSSFILTER() trong DAX khi có nhu cầu nghiệp vụ cụ thể cần lọc ngược.'
        }
      },
      {
        mistake: {
          en: 'Creating Many-to-Many (*:*) relationships directly between two Fact tables.',
          vi: 'Tạo quan hệ Nhiều-Nhiều (*:*) trực tiếp giữa hai bảng Fact.'
        },
        correction: {
          en: 'Introduce a shared Dimension table (e.g. Dim_Customers or Dim_Products) to connect both Fact tables cleanly via two 1:* relationships.',
          vi: 'Đưa vào một bảng Dimension dùng chung (như Dim_Customers) để kết nối hai bảng Fact qua 2 mối quan hệ 1:* chuẩn mực.'
        }
      }
    ],
    tips: [
      {
        en: 'In Model View, organize tables with Dimensions positioned at the top and Fact tables at the bottom so the filter flow moves downwards visually.',
        vi: 'Trong Model View, hãy sắp xếp các bảng Dimension ở hàng trên và bảng Fact ở hàng dưới để trực quan hóa luồng lọc chảy từ trên xuống.'
      },
      {
        en: 'Use solid lines for active relationships and dashed lines for inactive relationships in Model View.',
        vi: 'Đường nét liền đại diện cho quan hệ Active, đường nét đứt đại diện cho quan hệ Inactive trong sơ đồ Model View.'
      }
    ],
    practiceStarterCode: `// Calculated column referencing related dimension attribute
Line Cost = Fact_Sales[Quantity] * RELATED(Dim_Products[UnitCost])`
  },
  exercisePool: [
    {
      id: 'pbi_ex_4_1',
      type: 'predict_output',
      title: {
        en: 'Determine the Optimal Filter Direction',
        vi: 'Xác Định Chiều Lọc Chuẩn Trong Star Schema'
      },
      instruction: {
        en: 'In a Star Schema, what is the best practice filter direction from Dim_Customers (1) to Fact_Sales (*)?',
        vi: 'Trong Star Schema, chiều lọc tốt nhất từ Dim_Customers (1) sang Fact_Sales (*) là gì?'
      },
      starterCode: '// Choose filter direction',
      solutionCode: 'Single (from 1 to Many)',
      options: ['Single (Dimension filters Fact)', 'Both (Bidirectional)', 'None', 'Fact filters Dimension'],
      correctOptionIndex: 0,
      explanation: {
        en: 'Single filter direction from the 1-side dimension to the many-side fact table ensures optimal query performance and prevents circular filter paths.',
        vi: 'Chiều lọc Single từ bảng 1 (Dimension) sang bảng Nhiều (Fact) tối ưu tốc độ truy vấn và tránh lỗi đường dẫn lọc vòng lặp.'
      }
    },
    {
      id: 'pbi_ex_4_2',
      type: 'write_code',
      title: {
        en: 'Lookup Unit Cost using RELATED',
        vi: 'Tra Cứu Giá Vốn Bằng RELATED'
      },
      instruction: {
        en: 'Write a calculated column expression in Fact_Sales to calculate Line Cost by multiplying Quantity by the related UnitCost from Dim_Products.',
        vi: 'Viết biểu thức cột tính toán trong Fact_Sales để tính Line Cost bằng cách nhân Quantity với UnitCost tra cứu từ Dim_Products.'
      },
      starterCode: 'Line Cost = Fact_Sales[Quantity] * RELATED(___)',
      solutionCode: 'Line Cost = Fact_Sales[Quantity] * RELATED(Dim_Products[UnitCost])',
      hint: {
        en: 'RELATED(Dim_Products[UnitCost])',
        vi: 'RELATED(Dim_Products[UnitCost])'
      },
      explanation: {
        en: 'RELATED retrieves the corresponding UnitCost for each product from the dimension table.',
        vi: 'Hàm RELATED lấy giá trị UnitCost tương ứng của từng sản phẩm từ bảng dimension.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_4',
    title: {
      en: 'Architect Relational Model with Active and Inactive Keys',
      vi: 'Thiết Lập Mô Hình Quan Hệ Với Khóa Active Và Inactive'
    },
    description: {
      en: 'Configure a relationship model where Fact_Sales links to Dim_Calendar via OrderDate (Active) and ShipDate (Inactive).',
      vi: 'Cấu hình mô hình quan hệ nơi Fact_Sales liên kết với Dim_Calendar qua OrderDate (Active) và ShipDate (Inactive).'
    },
    requirements: [
      { en: '1. Primary relationship: Dim_Calendar[Date] (1) -> Fact_Sales[OrderDate] (*) [Active]', vi: '1. Quan hệ chính: Dim_Calendar[Date] (1) -> Fact_Sales[OrderDate] (*) [Active]' },
      { en: '2. Secondary relationship: Dim_Calendar[Date] (1) -> Fact_Sales[ShipDate] (*) [Inactive]', vi: '2. Quan hệ phụ: Dim_Calendar[Date] (1) -> Fact_Sales[ShipDate] (*) [Inactive]' },
      { en: '3. Total Sales Measure: SUM(Fact_Sales[Revenue])', vi: '3. Measure Total Sales: SUM(Fact_Sales[Revenue])' }
    ],
    starterCode: `// Active Relationship: OrderDate
// Inactive Relationship: ShipDate
Total Sales = SUM(Fact_Sales[Revenue])`,
    solutionCode: `// Active Relationship: OrderDate
// Inactive Relationship: ShipDate
Total Sales = SUM(Fact_Sales[Revenue])`,
    hints: [
      {
        en: 'By default, all visual slicers on Date will filter by OrderDate via the single active relationship.',
        vi: 'Mặc định, mọi slicer trên cột Date sẽ tự động lọc theo OrderDate qua mối quan hệ Active duy nhất.'
      }
    ],
    solutionExplanation: {
      en: 'Setting secondary date relationships as Inactive keeps the data model unambiguous, while allowing DAX measures to activate them via USERELATIONSHIP.',
      vi: 'Thiết lập các quan hệ ngày phụ ở trạng thái Inactive giúp mô hình không bị xung đột, đồng thời cho phép measure DAX kích hoạt khi cần bằng USERELATIONSHIP.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_4_1',
      type: 'single_choice',
      question: {
        en: 'Which DAX function is used in a Fact table row context to fetch a corresponding scalar value from a 1-side Dimension table?',
        vi: 'Hàm DAX nào được dùng trong ngữ cảnh dòng của bảng Fact để lấy một giá trị đơn lẻ tương ứng từ bảng Dimension phía 1?'
      },
      options: [
        { en: 'RELATED()', vi: 'RELATED()' },
        { en: 'LOOKUP()', vi: 'LOOKUP()' },
        { en: 'VLOOKUP()', vi: 'VLOOKUP()' },
        { en: 'FETCH()', vi: 'FETCH()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RELATED() traverses an active many-to-one relationship to return matching column values from the dimension table.',
        vi: 'Hàm RELATED() đi theo quan hệ nhiều-một đang hoạt động để lấy giá trị cột tương ứng từ bảng dimension.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_4_2',
      type: 'single_choice',
      question: {
        en: 'What is the most standard, performant, and recommended relationship cardinality between Dimension and Fact tables?',
        vi: 'Kiểu quan hệ (cardinality) chuẩn mực, tối ưu hiệu năng và được khuyến nghị nhất giữa bảng Dimension và Fact là gì?'
      },
      options: [
        { en: 'One-to-Many (1:*)', vi: 'Một - Nhiều (1:*)' },
        { en: 'Many-to-Many (*:*)', vi: 'Nhiều - Nhiều (*:*)' },
        { en: 'One-to-One (1:1)', vi: 'Một - Một (1:1)' },
        { en: 'Zero-to-Many (0:*)', vi: 'Không - Nhiều (0:*)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A 1:* (One-to-Many) relationship from Dimension primary key to Fact foreign key is the backbone of efficient Star Schema modeling.',
        vi: 'Quan hệ 1:* (Một - Nhiều) từ khóa chính bảng Dimension sang khóa ngoại bảng Fact là cấu trúc nền tảng tối ưu trong Star Schema.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_4_3',
      type: 'single_choice',
      question: {
        en: 'What is the recommended Cross Filter Direction between a Dimension table and a Fact table in a Star Schema?',
        vi: 'Chiều lọc chéo (Cross Filter Direction) được khuyến nghị giữa bảng Dimension và Fact trong Star Schema là gì?'
      },
      options: [
        { en: 'Single (Dimension filters Fact)', vi: 'Single (Bảng Dimension lọc Bảng Fact)' },
        { en: 'Both (Bidirectional)', vi: 'Both (Lọc hai chiều)' },
        { en: 'Fact filters Dimension only', vi: 'Chỉ Bảng Fact lọc Bảng Dimension' },
        { en: 'None (Inactive by default)', vi: 'None (Tắt lọc)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Single direction filtering ensures predictable filter flow from dimensions to facts and optimizes VertiPaq query engine performance.',
        vi: 'Chiều lọc Single đảm bảo luồng lọc di chuyển nhất quán từ Dimension sang Fact và tối ưu hóa hiệu năng của VertiPaq.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_4_4',
      type: 'true_false',
      question: {
        en: 'Setting all relationships to "Both" (Bidirectional) cross-filtering by default is recommended for optimal data model performance.',
        vi: 'Thiết lập tất cả quan hệ sang chế độ lọc hai chiều "Both" theo mặc định là cách làm được khuyến nghị để tối ưu hiệu năng mô hình.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Bidirectional filtering can introduce circular relationship paths, unexpected calculations, and significant performance overhead.',
        vi: 'Sai. Lọc hai chiều (Bidirectional) có thể tạo ra các vòng lặp quan hệ mơ hồ, làm sai lệch kết quả và giảm hiệu năng đáng kể.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_4_5',
      type: 'single_choice',
      question: {
        en: 'How many ACTIVE relationships can simultaneously exist between any two specific tables in a Power BI data model?',
        vi: 'Có thể tồn tại tối đa bao nhiêu mối quan hệ ACTIVE (đang hoạt động) đồng thời giữa 2 bảng cụ thể trong mô hình Power BI?'
      },
      options: [
        { en: 'Exactly 1', vi: 'Chính xác 1' },
        { en: 'Up to 5', vi: 'Tối đa 5' },
        { en: 'Unlimited', vi: 'Không giới hạn' },
        { en: 'Zero', vi: 'Không có quan hệ nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Power BI allows only ONE active relationship between any two tables at any given time to avoid ambiguous filter paths.',
        vi: 'Power BI chỉ cho phép duy nhất 1 mối quan hệ Active giữa 2 bảng tại một thời điểm để tránh xung đột đường dẫn bộ lọc.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_4_6',
      type: 'single_choice',
      question: {
        en: 'Which DAX function is used inside a CALCULATE statement to temporarily activate an INACTIVE relationship for a specific measure?',
        vi: 'Hàm DAX nào được dùng bên trong lệnh CALCULATE để kích hoạt tạm thời một quan hệ INACTIVE (nét đứt) cho một measure cụ thể?'
      },
      options: [
        { en: 'USERELATIONSHIP()', vi: 'USERELATIONSHIP()' },
        { en: 'ACTIVATE_LINK()', vi: 'ACTIVATE_LINK()' },
        { en: 'ENABLE_RELATION()', vi: 'ENABLE_RELATION()' },
        { en: 'SWITCH_KEY()', vi: 'SWITCH_KEY()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'USERELATIONSHIP(Fact[ForeignKey], Dim[PrimaryKey]) activates an inactive relationship during the evaluation of the CALCULATE expression.',
        vi: 'USERELATIONSHIP(Fact[ForeignKey], Dim[PrimaryKey]) kích hoạt quan hệ phụ trong suốt quá trình tính toán của biểu thức CALCULATE.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_4_7',
      type: 'single_choice',
      question: {
        en: 'Which DAX function is used in a Dimension table to return a table of related rows from a connected Fact table (e.g. to count customer orders)?',
        vi: 'Hàm DAX nào được dùng trong bảng Dimension để trả về một bảng gồm tất cả các dòng liên quan từ bảng Fact (ví dụ: để đếm đơn hàng của khách)?'
      },
      options: [
        { en: 'RELATEDTABLE()', vi: 'RELATEDTABLE()' },
        { en: 'GET_FACTS()', vi: 'GET_FACTS()' },
        { en: 'JOIN_ROWS()', vi: 'JOIN_ROWS()' },
        { en: 'PULL_TABLE()', vi: 'PULL_TABLE()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RELATEDTABLE(FactTable) returns all rows from the many-side table that match the current row context of the 1-side table.',
        vi: 'RELATEDTABLE(FactTable) trả về toàn bộ các dòng từ bảng phía nhiều khớp với ngữ cảnh dòng hiện tại của bảng phía một.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_4_8',
      type: 'true_false',
      question: {
        en: 'The RELATED() function in DAX can retrieve values from another table even if there is NO relationship defined between the two tables.',
        vi: 'Hàm RELATED() trong DAX có thể lấy giá trị từ bảng khác ngay cả khi KHÔNG CÓ mối quan hệ nào được thiết lập giữa 2 bảng.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. RELATED() strictly requires an existing, active relationship from the many-side to the one-side table.',
        vi: 'Sai. Hàm RELATED() bắt buộc phải có một quan hệ đang hoạt động từ bảng nhiều sang bảng một.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_4_9',
      type: 'predict_output',
      question: {
        en: 'In a model with an active 1:* relationship from Dim_Products[ProductID] to Fact_Sales[ProductID], what does Line Cost = Fact_Sales[Quantity] * RELATED(Dim_Products[UnitCost]) compute?',
        vi: 'Trong mô hình có quan hệ 1:* từ Dim_Products[ProductID] sang Fact_Sales[ProductID], công thức Line Cost = Fact_Sales[Quantity] * RELATED(Dim_Products[UnitCost]) tính giá trị gì?'
      },
      options: [
        {
          en: 'Multiplies transaction quantity by the product unit cost retrieved via the active table relationship',
          vi: 'Nhân số lượng đơn hàng với đơn giá vốn sản phẩm được tra cứu qua mối quan hệ bảng'
        },
        {
          en: 'Causes a compilation error because RELATED cannot be used with arithmetic multiplication',
          vi: 'Gây lỗi biên dịch vì hàm RELATED không thể dùng cùng phép nhân số học'
        },
        {
          en: 'Calculates the sum of all product unit costs across all records',
          vi: 'Tính tổng đơn giá vốn của toàn bộ danh mục sản phẩm'
        },
        {
          en: 'Overwrites the Products table with the Sales quantity',
          vi: 'Ghi đè bảng Products bằng số lượng trong bảng Sales'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RELATED looks up the specific product unit cost for each sale row and multiplies it by the quantity ordered.',
        vi: 'Hàm RELATED tra cứu đơn giá vốn của từng sản phẩm tương ứng cho từng dòng bán hàng rồi nhân với số lượng đặt mua.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_4_10',
      type: 'single_choice',
      question: {
        en: 'Why is it considered a best practice to hide foreign key columns in Fact tables from the Report View?',
        vi: 'Vì sao ẩn các cột khóa ngoại trong bảng Fact khỏi Report View được coi là một thực hành chuẩn (best practice)?'
      },
      options: [
        {
          en: 'To encourage report builders to slice and filter data exclusively using Dimension tables',
          vi: 'Để hướng dẫn người làm báo cáo lọc và phân loại dữ liệu độc quyền qua các bảng Dimension'
        },
        {
          en: 'Because foreign key columns cannot be queried by DAX formulas if visible',
          vi: 'Vì các cột khóa ngoại không thể được truy vấn bởi DAX nếu hiển thị'
        },
        {
          en: 'To reduce the physical storage footprint on hard drives',
          vi: 'Để giảm dung lượng lưu trữ trên đĩa cứng'
        },
        {
          en: 'Because Fact tables cannot support numeric keys',
          vi: 'Vì bảng Fact không hỗ trợ khóa dạng số'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Hiding foreign keys in Fact tables prevents accidental aggregation of IDs and ensures users filter via clean Dimension attributes.',
        vi: 'Ẩn khóa ngoại trong bảng Fact tránh việc vô tình cộng tổng các mã ID và đảm bảo người dùng lọc qua các trường Dimension chuẩn.'
      },
      topicId: 'star_schema_relationships',
      difficulty: 'medium'
    }
  ]
};

export default lesson04;
