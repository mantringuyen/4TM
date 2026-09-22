import { Book } from '../../types';

export const POWERBI_DEFINITIONS_BOOK: Book = {
  id: 'powerbi-definitions',
  slug: 'powerbi-definitions',
  title: 'Power BI & DAX Definitions Glossary',
  subtitle: {
    en: 'Cardinality, Storage Modes, Context Transitions & DAX Object Model Terminology',
    vi: 'Thuật Ngữ Cardinality, Chế Độ Lưu Trữ, Chuyển Đổi Ngữ Cảnh & Mô Hình Đối Tượng DAX',
  },
  bookType: 'Definitions',
  categoryId: 'powerbi',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-12',
  accentColor: 'from-amber-600 to-yellow-800',
  tags: ['Definitions', 'DAX', 'Cardinality', 'Glossary', 'Power BI'],
  description: {
    en: 'Precision definitions and mental models for core Power BI and DAX concepts: Column Cardinality, Import vs DirectQuery vs Dual storage modes, Explicit Measures vs Calculated Columns, and Context Transition.',
    vi: 'Định nghĩa chuẩn xác và mô hình tư duy cho các khái niệm Power BI & DAX cốt lõi: Độ biến thiên Cardinality, chế độ lưu trữ Import vs DirectQuery vs Dual, phân biệt Measure vs Calculated Column và Context Transition.',
  },
  prerequisites: {
    en: [
      'Basic familiarity with Power BI Desktop modeling and report creation',
    ],
    vi: [
      'Làm quen cơ bản với việc dựng mô hình và tạo báo cáo trên Power BI Desktop',
    ],
  },
  outcomes: {
    en: [
      'Understand how column cardinality directly governs VertiPaq compression ratios and RAM allocation',
      'Distinguish between query-time in-memory measures and table-refresh calculated columns',
      'Diagnose and predict context transition behavior when calling measures inside iterators',
    ],
    vi: [
      'Hiểu rõ cách cardinality của cột trực tiếp quyết định tỷ lệ nén VertiPaq và dung lượng RAM',
      'Phân biệt rõ bản chất giữa Measure tính động lúc query và Calculated Column lưu cứng khi refresh',
      'Chẩn đoán và dự đoán chính xác hành vi chuyển đổi ngữ cảnh khi gọi measure trong vòng lặp',
    ],
  },
  chapters: [
    {
      id: 'pbi-def-ch-1',
      number: 1,
      slug: 'cardinality-and-storage-terms',
      title: {
        en: 'Column Cardinality & Storage Mode Terminology',
        vi: 'Thuật Ngữ Cardinality & Chế Độ Lưu Trữ Mô Hình',
      },
      summary: {
        en: 'Formal definitions for Column Cardinality and VertiPaq storage modes (Import, DirectQuery, Dual Composite).',
        vi: 'Định nghĩa chuẩn cho Cardinality của cột và các chế độ lưu trữ VertiPaq (Import, DirectQuery, Dual Composite).',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'pbi-def-1-1',
          title: {
            en: 'Column Cardinality',
            vi: 'Độ Biến Thiên Cardinality Của Cột',
          },
          keyIdea: {
            en: 'Column cardinality is the count of distinct values in a column, acting as the primary determinant of dictionary size and VertiPaq RAM consumption.',
            vi: 'Cardinality là số lượng giá trị phân biệt trong một cột, yếu tố trực tiếp quyết định độ lớn từ điển và mức tiêu thụ RAM của engine VertiPaq.',
          },
          content: {
            en: 'Column Cardinality refers to the total number of unique values contained within a specific table column in the data model. In columnar in-memory architectures like VertiPaq, every unique value requires an entry in the column\'s hash dictionary. Low cardinality columns (e.g. `Gender`, `Status`, `Year`) compress exceptionally well, whereas high cardinality columns (e.g. `TransactionID`, `TimestampWithMilliseconds`, `GUID`) create enormous dictionaries that impair query performance and inflate RAM usage.',
            vi: 'Column Cardinality (Độ biến thiên của cột) là tổng số lượng các giá trị duy nhất (không trùng lặp) có trong một cột dữ liệu của mô hình. Trong kiến trúc lưu trữ theo cột trong RAM như VertiPaq, mỗi giá trị duy nhất bắt buộc phải lưu một mục trong từ điển băm (hash dictionary). Các cột có cardinality thấp (như `Gender`, `Status`, `Year`) nén cực kỳ tốt, trong khi các cột có cardinality cao (như `TransactionID`, `TimestampMiliGiay`, `GUID`) tạo ra các từ điển khổng lồ làm phình RAM và chậm tốc độ truy vấn.',
          },
          definitionDetails: {
            term: {
              en: 'Column Cardinality',
              vi: 'Độ Biến Thiên Cột (Column Cardinality)',
            },
            formalDefinition: {
              en: 'The mathematical count of unique, non-duplicate discrete elements present within a given attribute column of a tabular data model.',
              vi: 'Số lượng phần tử phân biệt, không trùng lặp xuất hiện trong một cột thuộc tính của mô hình dữ liệu bảng.',
            },
            mentalModel: {
              en: 'Think of cardinality as the thickness of a dictionary: a dictionary with 4 words takes a sliver of paper, while a dictionary with 10,000,000 unique UUIDs requires an entire warehouse of pages.',
              vi: 'Hãy hình dung cardinality như độ dày của cuốn từ điển: một cuốn từ điển chỉ có 4 từ thì chỉ tốn vài dòng giấy, còn một cuốn từ điển chứa 10.000.000 mã UUID duy nhất sẽ đòi hỏi cả một kho sách.',
            },
            whyItMatters: {
              en: 'High cardinality is the #1 cause of bloated PBIX file sizes, slow visual load times, and memory exhaustion errors in Power BI Service.',
              vi: 'Cardinality cao là nguyên nhân số 1 khiến file PBIX bị phình to dung lượng, visual tải chậm và phát sinh lỗi cạn kiệt bộ nhớ trên Power BI Service.',
            },
            commonMisconception: {
              en: 'Assuming row count is the main factor in model size. A table with 100M rows and 5 distinct column values can be smaller than a table with 100K rows and 100K unique GUID strings.',
              vi: 'Lầm tưởng rằng số lượng dòng là yếu tố chính quyết định dung lượng. Một bảng 100 triệu dòng nhưng chỉ có 5 giá trị duy nhất có thể nhẹ hơn nhiều so với bảng 100 nghìn dòng chứa 100 nghìn chuỗi GUID duy nhất.',
            },
            quickReference: {
              en: [
                'Low Cardinality: 1–1,000 distinct values (Ideal for Dim tables and slicing)',
                'Medium Cardinality: 1,000–50,000 distinct values (Manageable in Fact tables)',
                'High Cardinality: > 100,000 distinct values (Avoid unless absolutely required for primary keys)',
              ],
              vi: [
                'Cardinality Thấp: 1–1.000 giá trị duy nhất (Rất tốt cho bảng Dimension và slicer)',
                'Cardinality Vừa: 1.000–50.000 giá trị duy nhất (Có thể chấp nhận trong bảng Fact)',
                'Cardinality Cao: > 100.000 giá trị duy nhất (Nên tránh trừ khi bắt buộc làm khóa chính)',
              ],
            },
            minimalExample: {
              language: 'dax',
              filename: 'cardinality_check.dax',
              explanation: {
                en: 'DAX expression to check the distinct cardinality count of a column at runtime.',
                vi: 'Công thức DAX đo đếm số lượng giá trị duy nhất của một cột tại thời điểm thực thi.',
              },
              code: `// Distinct count DAX measure to audit column cardinality
Unique Product Count = DISTINCTCOUNT(DimProduct[ProductKey])`,
            },
          },
        },
        {
          id: 'pbi-def-1-2',
          title: {
            en: 'Storage Modes: Import, DirectQuery & Dual (Composite)',
            vi: 'Các Chế Độ Lưu Trữ: Import, DirectQuery & Dual',
          },
          keyIdea: {
            en: 'Storage modes determine whether dataset tables are cached in RAM via VertiPaq (Import), queried live against source databases (DirectQuery), or intelligently routed dynamically (Dual).',
            vi: 'Chế độ lưu trữ quyết định bảng dữ liệu được nén trong RAM qua VertiPaq (Import), truy vấn trực tiếp vào CSDL nguồn (DirectQuery) hay định tuyến động thông minh (Dual).',
          },
          content: {
            en: 'Power BI models support three primary table storage modes:\n\n1. **Import Mode**: Data is ingested, compressed into VertiPaq columnar memory, and cached in RAM. Offers the fastest DAX performance and full formula capabilities, but requires scheduled data refreshes and is bounded by capacity RAM limits.\n2. **DirectQuery Mode**: Data remains in the underlying SQL database or data warehouse. Visual interactions translate DAX into native SQL queries on-the-fly. Eliminates data transfer caps, but incurs network latency and restricts certain complex DAX functions.\n3. **Dual Mode**: A hybrid composite mode where tables are cached in memory for fast local joins with Import tables, but can also satisfy DirectQuery queries via direct SQL joins without crossing the VertiPaq/DirectQuery boundary.',
            vi: 'Mô hình Power BI hỗ trợ ba chế độ lưu trữ bảng chính:\n\n1. **Import Mode (Chế độ Nạp)**: Dữ liệu được nạp, nén vào bộ nhớ cột VertiPaq và lưu trên RAM. Đem lại hiệu năng DAX nhanh nhất và hỗ trợ toàn bộ hàm, nhưng cần đặt lịch refresh và bị giới hạn bởi dung lượng RAM của dung lượng bản quyền.\n2. **DirectQuery Mode (Chế độ Truy Vấn Trực Tiếp)**: Dữ liệu nằm nguyên trong cơ sở dữ liệu SQL hoặc Data Warehouse. Tương tác của người dùng sẽ dịch DAX thành câu SQL tương ứng gửi xuống CSDL. Không bị giới hạn dung lượng tải về nhưng chịu độ trễ mạng và bị giới hạn một số hàm DAX phức tạp.\n3. **Dual Mode (Chế độ Kép)**: Chế độ lai ghép cho phép bảng vừa được cache trong RAM để join cực nhanh với bảng Import, vừa có thể tham gia join trực tiếp câu lệnh SQL khi truy vấn cùng các bảng DirectQuery.',
          },
          definitionDetails: {
            term: {
              en: 'Table Storage Mode',
              vi: 'Chế Độ Lưu Trữ Bảng (Table Storage Mode)',
            },
            formalDefinition: {
              en: 'The architectural property of a Power BI tabular model table defining whether its physical data partitions reside in the in-memory VertiPaq engine, an external relational data source, or dynamically toggle between both.',
              vi: 'Thuộc tính kiến trúc của một bảng trong mô hình Power BI xác định xem các phân vùng dữ liệu vật lý nằm trong bộ nhớ RAM VertiPaq, nằm tại CSDL bên ngoài hay linh hoạt chuyển đổi giữa cả hai.',
            },
            mentalModel: {
              en: 'Import is downloading the book onto your e-reader for instant offline reading. DirectQuery is calling the librarian on the phone for every page. Dual is having both a downloaded pocket index and a librarian connection.',
              vi: 'Import giống như tải toàn bộ sách về máy đọc để mở đọc tức thì. DirectQuery giống như gọi điện cho thủ thư hỏi từng trang mỗi khi cần. Dual giống như vừa có sẵn mục lục tóm tắt trong túi vừa có đường dây nóng với thủ thư.',
            },
            whyItMatters: {
              en: 'Choosing the correct storage mode balances real-time freshness requirements against interactive dashboard render latency and server load.',
              vi: 'Lựa chọn đúng chế độ lưu trữ giúp cân bằng giữa yêu cầu dữ liệu thời gian thực với tốc độ phản hồi của dashboard và tải của máy chủ.',
            },
            commonMisconception: {
              en: 'Assuming DirectQuery is always faster because the source SQL database has high CPU power. DirectQuery visual interactions must wait for network roundtrips and SQL compilation.',
              vi: 'Nghĩ rằng DirectQuery luôn nhanh hơn vì máy chủ SQL nguồn rất mạnh. DirectQuery bắt buộc phải chờ độ trễ mạng và thời gian biên dịch câu lệnh SQL.',
            },
            quickReference: {
              en: [
                'Import: Best performance, full DAX capability, offline caching in RAM',
                'DirectQuery: Real-time freshness, huge data sizes, restricted DAX set',
                'Dual: Shared dimensions in composite models preventing cross-engine bottlenecks',
              ],
              vi: [
                'Import: Hiệu năng cao nhất, hỗ trợ toàn bộ DAX, lưu trữ cache trong RAM',
                'DirectQuery: Dữ liệu thời gian thực, dung lượng lớn, bị giới hạn một số hàm DAX',
                'Dual: Bảng chiều chia sẻ trong mô hình kết hợp tránh thắt cổ chai giữa 2 engine',
              ],
            },
            minimalExample: {
              language: 'dax',
              filename: 'storage_mode_query.dax',
              explanation: {
                en: 'An aggregate DAX measure evaluated seamlessly regardless of storage mode.',
                vi: 'Một measure tính tổng DAX hoạt động thống nhất trên các chế độ lưu trữ.',
              },
              code: `// Evaluates in-memory in Import, or converts to SELECT SUM(...) in DirectQuery
Total Volume = SUM(FactTransactions[Volume])`,
            },
          },
        },
      ],
    },
    {
      id: 'pbi-def-ch-2',
      number: 2,
      slug: 'dax-measures-vs-calculated-columns',
      title: {
        en: 'Measures, Calculated Columns & Evaluation Mechanics',
        vi: 'Thuật Ngữ Measure, Calculated Column & Cơ Chế Đánh Giá',
      },
      summary: {
        en: 'Definitive distinctions between Explicit Measures and Calculated Columns, plus the formal mechanics of Context Transition.',
        vi: 'Phân biệt rạch ròi giữa Measure tường minh và Calculated Column, cùng cơ chế chuyển đổi ngữ cảnh Context Transition.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'pbi-def-2-1',
          title: {
            en: 'Explicit Measure vs Calculated Column',
            vi: 'Phân Biệt Measure Tường Minh vs Calculated Column',
          },
          keyIdea: {
            en: 'Calculated columns are evaluated during data refresh and consume permanent RAM; explicit measures are dynamic formulas evaluated on-the-fly inside the active visual Filter Context consuming zero RAM at rest.',
            vi: 'Calculated column được tính toán khi nạp dữ liệu và chiếm RAM vĩnh viễn; explicit measure là công thức động chỉ tính tức thời trong Filter Context của visual và không tốn RAM khi nghỉ.',
          },
          content: {
            en: 'A **Calculated Column** is evaluated row-by-row during data refresh and persisted directly into the VertiPaq table partition as an additional physical column. It increases the RAM footprint and lengthens data refresh times. In contrast, an **Explicit Measure** is an on-demand DAX formula evaluated at query-time based on the current visual coordinates (slicers, rows, columns). Measures consume zero storage at rest and adapt dynamically to user interactivity.',
            vi: '**Calculated Column (Cột Tính Toán)** được tính toán theo từng dòng trong quá trình refresh dữ liệu và được lưu cứng vào phân vùng bảng VertiPaq như một cột vật lý thông thường. Nó làm tăng dung lượng RAM và kéo dài thời gian refresh. Ngược lại, **Explicit Measure (Chỉ Số Tường Minh)** là công thức DAX tính toán tức thời theo yêu cầu tại thời điểm truy vấn, dựa trên tọa độ của visual hiện tại (slicer, hàng, cột). Measure hoàn toàn không tốn dung lượng lưu trữ khi nghỉ và phản hồi động theo thao tác của người dùng.',
          },
          definitionDetails: {
            term: {
              en: 'Explicit Measure',
              vi: 'Chỉ Số Đo Tường Minh (Explicit Measure)',
            },
            formalDefinition: {
              en: 'A dynamic DAX analytical calculation evaluated at query execution time over a subset of rows defined by the active Filter Context.',
              vi: 'Công thức tính toán phân tích DAX động được đánh giá tại thời điểm truy vấn trên tập hợp con các dòng dữ liệu do Filter Context hiện tại quyết định.',
            },
            mentalModel: {
              en: 'A Calculated Column is baking a cake and storing it in the freezer (uses permanent storage). An Explicit Measure is a recipe card that bakes a fresh single slice instantly only when someone places an order.',
              vi: 'Calculated Column giống như nướng sẵn cả chiếc bánh rồi cất vào tủ đông (tốn chỗ lưu trữ vĩnh viễn). Explicit Measure là tờ công thức nấu ăn, chỉ vào bếp làm đúng một phần ăn tươi ngon ngay khi có khách gọi món.',
            },
            whyItMatters: {
              en: 'Relying on calculated columns for aggregations wastes gigabytes of server RAM and creates rigid, non-interactive reporting models.',
              vi: 'Lạm dụng calculated column cho các phép tính tổng hợp sẽ gây lãng phí hàng gigabyte RAM máy chủ và tạo ra các mô hình báo cáo cứng nhắc, không thể tương tác linh hoạt.',
            },
            commonMisconception: {
              en: 'Believing that calculated columns are faster than measures because they are pre-calculated. Aggregating a calculated column still requires a measure calculation at visual render time.',
              vi: 'Nghĩ rằng calculated column luôn chạy nhanh hơn measure vì đã tính sẵn. Việc tính tổng trên một calculated column thực tế vẫn đòi hỏi chạy một phép tính measure khi render visual.',
            },
            quickReference: {
              en: [
                'Calculated Column: Computed at refresh, stored in RAM, evaluated in Row Context, used for Slicers/Rows',
                'Explicit Measure: Computed at query time, zero storage in RAM, evaluated in Filter Context, used for Values/KPIs',
              ],
              vi: [
                'Calculated Column: Tính lúc refresh, lưu cứng trên RAM, chạy trong Row Context, dùng làm Slicer/Dòng phân nhóm',
                'Explicit Measure: Tính lúc query, không tốn RAM khi nghỉ, chạy trong Filter Context, dùng làm Giá trị/KPI',
              ],
            },
            minimalExample: {
              language: 'dax',
              filename: 'measure_vs_column.dax',
              explanation: {
                en: 'Illustrating the clean syntax difference between an explicit measure and a calculated column.',
                vi: 'Minh họa sự khác biệt cú pháp rõ ràng giữa explicit measure và calculated column.',
              },
              code: `// Explicit Measure (Recommended for all analytical aggregations)
Total Profit = SUM(FactSales[ProfitAmount])

// Calculated Column (Only when needed as a categorical slicer attribute)
ProfitTier = IF(FactSales[ProfitAmount] > 100, "High Margin", "Standard")`,
            },
          },
        },
        {
          id: 'pbi-def-2-2',
          title: {
            en: 'Context Transition',
            vi: 'Chuyển Đổi Ngữ Cảnh (Context Transition)',
          },
          keyIdea: {
            en: 'Context Transition is the automatic mechanism where invoking CALCULATE() inside an existing Row Context converts the current row\'s values into an equivalent Filter Context predicate.',
            vi: 'Context Transition là cơ chế tự động trong đó việc gọi CALCULATE() bên trong một Row Context sẽ chuyển đổi toàn bộ giá trị của dòng hiện tại thành điều kiện lọc Filter Context tương đương.',
          },
          content: {
            en: 'Context Transition is one of the foundational mechanisms of the DAX calculation engine. When an iteration function (like `SUMX` or `FILTER`) or a calculated column iterates through a table in a **Row Context**, the engine knows the values of the current row but cannot filter related tables. Invoking `CALCULATE()` forces the engine to translate the current row\'s primary key and attribute values into an exact filter predicate, applying it to the active **Filter Context** and propagating it across model relationships.',
            vi: 'Context Transition (Chuyển đổi ngữ cảnh) là một trong những cơ chế nền tảng của engine DAX. Khi một hàm lặp (như `SUMX` hoặc `FILTER`) hoặc một calculated column duyệt qua từng dòng của bảng trong **Row Context**, engine biết các giá trị của dòng hiện tại nhưng không thể lọc các bảng liên kết. Lệnh gọi hàm `CALCULATE()` ép engine chuyển đổi toàn bộ giá trị của dòng hiện tại thành một điều kiện lọc chính xác, áp dụng vào **Filter Context** đang chạy và lan truyền qua các mối quan hệ của mô hình.',
          },
          definitionDetails: {
            term: {
              en: 'Context Transition',
              vi: 'Chuyển Đổi Ngữ Cảnh (Context Transition)',
            },
            formalDefinition: {
              en: 'The internal DAX engine transformation triggered by CALCULATE or CALCULATETABLE that converts all active row contexts into equivalent filter context constraints.',
              vi: 'Quá trình chuyển đổi nội bộ của engine DAX được kích hoạt bởi CALCULATE hoặc CALCULATETABLE nhằm biến đổi toàn bộ row context đang hoạt động thành các ràng buộc filter context tương đương.',
            },
            mentalModel: {
              en: 'Imagine holding a single student\'s ID badge (Row Context). Context Transition is putting that ID badge into the school scanner so the entire campus security system (Filter Context) locks down only that student\'s records.',
              vi: 'Hãy tưởng tượng bạn đang cầm thẻ học sinh của một em (Row Context). Context Transition là việc quẹt chiếc thẻ đó vào máy quét để toàn bộ hệ thống trường học (Filter Context) lọc ra đúng hồ sơ điểm số của riêng em học sinh đó.',
            },
            whyItMatters: {
              en: 'Context Transition allows calculating related metrics across tables without writing manual lookup formulas, but can cause severe performance degradation or circular dependencies if triggered unintentionally inside massive loops.',
              vi: 'Context Transition cho phép tính toán các chỉ số liên kết giữa các bảng mà không cần viết hàm tra cứu thủ công, nhưng có thể gây chậm hiệu năng hoặc lỗi phụ thuộc vòng nếu bị kích hoạt ngoài ý muốn trong vòng lặp lớn.',
            },
            commonMisconception: {
              en: 'Assuming that referencing a measure name like `[Total Sales]` inside a calculated column does not use CALCULATE. In DAX, every measure reference is implicitly wrapped in `CALCULATE([Total Sales])`.',
              vi: 'Nghĩ rằng việc gọi tên measure như `[Total Sales]` trong calculated column không dùng CALCULATE. Trong DAX, mọi lệnh gọi measure đều được tự động bọc ngầm bằng `CALCULATE([Total Sales])`.',
            },
            quickReference: {
              en: [
                'Triggered by: CALCULATE(), CALCULATETABLE(), or calling any Measure inside a Row Context',
                'Mechanism: Takes all column values in current row -> transforms into Filter Context',
                'Cost: High CPU cost if executed over millions of iterations in large calculated tables',
              ],
              vi: [
                'Kích hoạt bởi: CALCULATE(), CALCULATETABLE(), hoặc gọi bất kỳ Measure nào trong Row Context',
                'Cơ chế: Lấy mọi giá trị cột của dòng hiện tại -> chuyển thành điều kiện lọc trong Filter Context',
                'Chi phí: Tốn CPU nếu chạy trên hàng triệu vòng lặp trong các bảng tính lớn',
              ],
            },
            minimalExample: {
              language: 'dax',
              filename: 'context_transition.dax',
              explanation: {
                en: 'Demonstrating context transition inside a calculated column on DimCustomer.',
                vi: 'Minh họa chuyển đổi ngữ cảnh trong một calculated column trên bảng DimCustomer.',
              },
              code: `// Calculated column in DimCustomer:
// CALCULATE converts CustomerKey of current row into a Filter Context on FactSales
TotalCustomerSpend = CALCULATE(SUM(FactSales[SalesAmount]))`,
            },
          },
        },
      ],
    },
  ],
};
