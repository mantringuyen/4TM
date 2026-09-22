import { Book } from '../../types';

export const POWERBI_HANDBOOK_BOOK: Book = {
  id: 'powerbi-handbook',
  slug: 'powerbi-handbook',
  title: 'Power BI Handbook',
  subtitle: {
    en: 'VertiPaq Columnar Storage, DAX Context Evaluation & Star Schema Engineering',
    vi: 'Trình Lưu Trữ Cột VertiPaq, Đánh Giá Ngữ Cảnh DAX & Kiến Trúc Star Schema',
  },
  bookType: 'Handbook',
  categoryId: 'powerbi',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Comprehensive',
  estimatedReadTime: '45 mins',
  chaptersCount: 3,
  publishedDate: '2025-02-10',
  accentColor: 'from-amber-500 to-yellow-700',
  tags: ['Power BI', 'DAX', 'Star Schema', 'VertiPaq', 'Business Intelligence', 'Handbook'],
  description: {
    en: 'Authoritative engineering reference for Power BI: the VertiPaq in-memory columnar engine, Star Schema dimensional modeling, DAX dual evaluation contexts (Row Context vs Filter Context), context transition, and Row-Level Security (RLS).',
    vi: 'Cẩm nang kỹ thuật chuẩn xác về Power BI: cơ chế nén bộ nhớ VertiPaq, mô hình hóa dữ liệu chiều Star Schema, hai ngữ cảnh tính toán trong DAX (Row Context vs Filter Context), chuyển đổi ngữ cảnh và bảo mật Row-Level Security (RLS).',
  },
  prerequisites: {
    en: [
      'Relational database querying and tabular data fundamentals',
      'Basic familiarity with Power BI Desktop and business KPI concepts',
    ],
    vi: [
      'Nền tảng truy vấn cơ sở dữ liệu quan hệ và cấu trúc dữ liệu bảng',
      'Làm quen cơ bản với Power BI Desktop và các khái niệm KPI doanh nghiệp',
    ],
  },
  outcomes: {
    en: [
      'Architect low-cardinality Star Schemas optimized for VertiPaq dictionary and run-length encoding',
      'Master DAX evaluation contexts, filter propagation across 1-to-many relationships, and CALCULATE context transition',
      'Implement enterprise-grade Dynamic Row-Level Security (RLS) with USERPRINCIPALNAME() and security bridge tables',
    ],
    vi: [
      'Thiết kế mô hình Star Schema có cardinality thấp tối ưu cho mã hóa từ điển và RLE của VertiPaq',
      'Làm chủ các ngữ cảnh tính toán DAX, lan truyền bộ lọc qua quan hệ 1-nhiều và chuyển đổi ngữ cảnh bằng CALCULATE',
      'Triển khai hệ thống phân quyền dữ liệu động (Dynamic RLS) quy mô doanh nghiệp với USERPRINCIPALNAME() và bảng cầu nối',
    ],
  },
  parts: [
    {
      partNumber: 1,
      romanNumeral: 'I',
      title: {
        en: 'Storage Engine Architecture & Dimensional Modeling',
        vi: 'Kiến Trúc Storage Engine & Mô Hình Hóa Dữ Liệu Chiều',
      },
      description: {
        en: 'VertiPaq in-memory columnar compression, dictionary encoding, and Star Schema vs Snowflake vs Flat table tradeoffs.',
        vi: 'Cơ chế nén bộ nhớ cột VertiPaq, mã hóa từ điển và bài toán đánh đổi giữa Star Schema, Snowflake và bảng phẳng.',
      },
    },
    {
      partNumber: 2,
      romanNumeral: 'II',
      title: {
        en: 'DAX Evaluation Mechanics & Context Transitions',
        vi: 'Cơ Chế Tính Toán DAX & Chuyển Đổi Ngữ Cảnh',
      },
      description: {
        en: 'The dual context engine: Initial Filter Context, Row Context iterators, and CALCULATE context transition mechanics.',
        vi: 'Động cơ ngữ cảnh kép: Filter Context ban đầu, iterator trong Row Context và cơ chế chuyển đổi ngữ cảnh của CALCULATE.',
      },
    },
    {
      partNumber: 3,
      romanNumeral: 'III',
      title: {
        en: 'Enterprise Security & Governance',
        vi: 'Bảo Mật Dữ Liệu & Quản Trị Doanh Nghiệp',
      },
      description: {
        en: 'Static vs Dynamic Row-Level Security, security matrix tables, and unidirectional filter propagation guarantees.',
        vi: 'Bảo mật phân dòng tĩnh vs động, bảng ma trận phân quyền và các đảm bảo lan truyền bộ lọc đơn hướng.',
      },
    },
  ],
  chapters: [
    {
      id: 'pbi-hb-ch-1',
      number: 1,
      slug: 'vertipaq-engine-and-star-schema',
      title: {
        en: 'VertiPaq Columnar Storage & Star Schema Modeling',
        vi: 'Trình Lưu Trữ Cột VertiPaq & Mô Hình Star Schema',
      },
      summary: {
        en: 'Columnar memory allocation, 3-tier compression algorithms (Value, Dictionary, RLE), Fact vs Dimension cardinality, and Star Schema optimization.',
        vi: 'Phân bổ bộ nhớ theo cột, 3 thuật toán nén (Value, Dictionary, RLE), độ biến thiên Fact vs Dimension và tối ưu hóa Star Schema.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'pbi-hb-1-1',
          title: {
            en: 'Columnar Storage, Compression Algorithms & Star Schema Optimization',
            vi: 'Lưu Trữ Cột, Thuật Toán Nén & Tối Ưu Hóa Star Schema',
          },
          keyIdea: {
            en: 'VertiPaq compresses columns independently using dictionary and run-length encoding. Star Schemas minimize unique column cardinality, maximizing compression ratios and vector scan speeds.',
            vi: 'VertiPaq nén từng cột độc lập bằng mã hóa từ điển và run-length. Mô hình Star Schema giảm thiểu cardinality của từng cột, tối đa hóa tỷ lệ nén và tốc độ quét vector.',
          },
          content: {
            en: 'The VertiPaq engine is an in-memory, columnar relational engine designed for high-speed analytical aggregation. Unlike row-oriented OLTP databases that read entire tuples from disk, VertiPaq reads only the specific columns referenced in a DAX expression. VertiPaq applies three primary compression algorithms:\n\n1. **Value Encoding**: Applied to numeric columns with bounded ranges (e.g. subtracting the minimum value and storing offsets in fewer bits).\n2. **Dictionary (Hash) Encoding**: Unique string and numeric values are mapped to an integer dictionary index (0, 1, 2, ...), drastically reducing row payload size.\n3. **Run-Length Encoding (RLE)**: Identical contiguous dictionary IDs are compressed into a single count-value pair (e.g. 50,000 contiguous rows of country code `VN` are stored as `(50000, 1)`).\n\nStar Schema is the architectural foundation of Power BI. By segregating high-volume numerical events into narrow Fact tables (e.g., `FactSales`) and descriptive textual attributes into wide, low-cardinality Dimension tables (e.g., `DimCustomer`, `DimProduct`, `DimDate`), the engine achieves 10x–50x compression ratios compared to single flat denormalized tables.',
            vi: 'Engine VertiPaq là trình lưu trữ quan hệ dạng cột chạy hoàn toàn trong bộ nhớ RAM, được tối ưu hóa cho các phép tính tổng hợp phân tích tốc độ cao. Khác với các CSDL OLTP dòng đọc toàn bộ bản ghi từ ổ đĩa, VertiPaq chỉ nạp đúng các cột được sử dụng trong biểu thức DAX. VertiPaq áp dụng ba thuật toán nén chính:\n\n1. **Value Encoding (Mã hóa giá trị)**: Áp dụng cho các cột số có khoảng giá trị hữu hạn (trừ đi giá trị nhỏ nhất và lưu khoảng chênh lệch bằng ít bit hơn).\n2. **Dictionary / Hash Encoding (Mã hóa từ điển)**: Các chuỗi ký tự và giá trị số duy nhất được ánh xạ sang chỉ mục số nguyên (0, 1, 2, ...), giúp giảm kích thước bản ghi đáng kể.\n3. **Run-Length Encoding - RLE (Mã hóa độ dài chạy)**: Các chỉ mục từ điển liên tiếp giống nhau được nén lại thành cặp (số lần lặp, giá trị) — ví dụ 50.000 dòng liên tiếp mang mã `VN` chỉ cần lưu `(50000, 1)`.\n\nStar Schema là nền tảng kiến trúc cốt lõi của Power BI. Bằng cách tách các sự kiện giao dịch số lượng lớn vào bảng Fact hẹp (`FactSales`) và các thuộc tính mô tả vào bảng Dimension rộng có cardinality thấp (`DimCustomer`, `DimProduct`, `DimDate`), engine đạt được tỷ lệ nén từ 10x đến 50x so với một bảng phẳng bị phi chuẩn hóa.',
          },
          codeBlock: {
            language: 'dax',
            filename: 'star_schema_relationships.dax',
            explanation: {
              en: 'Demonstrates a standard dimensional measure leveraging 1-to-many relationship filter propagation without scanning unnecessary columns.',
              vi: 'Minh họa một measure chiều tiêu chuẩn tận dụng lan truyền bộ lọc 1-nhiều mà không cần quét các cột không liên quan.',
            },
            code: `// High-performance measure evaluated across 1-to-many relationship
Total Net Revenue = 
SUMX(
    FactSales,
    FactSales[Quantity] * FactSales[UnitPrice] * (1 - FactSales[DiscountPct])
)`,
          },
          comparisonTable: {
            headers: {
              en: ['Architecture', 'Fact / Dim Structure', 'VertiPaq Compression', 'Filter Propagation', 'Maintenance Cost'],
              vi: ['Kiến Trúc', 'Cấu Trúc Fact / Dim', 'Nén VertiPaq', 'Lan Truyền Filter', 'Chi Phí Bảo Trì'],
            },
            rows: [
              {
                en: ['Star Schema', '1 Fact surrounded by 1-depth Dimensions', 'Optimal (highest RLE & dictionary efficiency)', 'Deterministic 1-to-many single-direction', 'Low — Industry standard best practice'],
                vi: ['Star Schema', '1 Fact được bao quanh bởi các Dim bậc 1', 'Tối ưu (hiệu quả RLE & từ điển cao nhất)', 'Rõ ràng, 1-nhiều đơn hướng chuẩn xác', 'Thấp — Chuẩn mực thực hành tốt nhất'],
              },
              {
                en: ['Snowflake Schema', 'Dimensions normalized into sub-dimensions', 'Moderate (additional relationship overhead)', 'Multi-hop chain traversal degrades performance', 'High — Complex relationship maintenance'],
                vi: ['Snowflake Schema', 'Dimension chuẩn hóa thành nhiều bảng con', 'Trung bình (tốn chi phí quản lý quan hệ)', 'Lan truyền qua nhiều chặng làm chậm truy vấn', 'Cao — Phức tạp khi bảo trì quan hệ'],
              },
              {
                en: ['Flat Denormalized Table', 'Single monolithic wide table', 'Poor (exploding dictionary size & repeated strings)', 'No relationships; all attributes in one table', 'Severe — Fragile updates & high memory footprint'],
                vi: ['Bảng Phẳng Phi Chuẩn Hóa', 'Một bảng duy nhất gom tất cả cột', 'Kém (bùng nổ kích thước từ điển & chuỗi lặp)', 'Không có quan hệ; toàn bộ nằm trong 1 bảng', 'Rất cao — Dễ lỗi khi cập nhật & tốn RAM'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'VertiPaq 3-Tier Columnar Compression Pipeline',
              vi: 'Quy Trình 3 Bước Nén Cột Dữ Liệu VertiPaq',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Raw Column Extraction',
                  vi: 'Trích Xuất Cột Dữ Liệu Thô',
                },
                description: {
                  en: 'Columns are isolated from input records into vertical, contiguous physical memory segments.',
                  vi: 'Các cột được tách độc lập từ các bản ghi đầu vào thành các đoạn bộ nhớ vật lý liên tục.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Dictionary & Value Encoding',
                  vi: 'Mã Hóa Từ Điển & Mã Hóa Giá Trị',
                },
                description: {
                  en: 'Distinct string/integer tokens are mapped to small integer surrogate indexes (0, 1, 2, ...).',
                  vi: 'Các giá trị chuỗi/số nguyên phân biệt được ánh xạ sang các chỉ mục số nguyên ngắn gọn.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Run-Length Encoding (RLE)',
                  vi: 'Nén Độ Dài Chạy (RLE)',
                },
                description: {
                  en: 'Contiguous runs of identical index values are collapsed into (count, value) descriptors.',
                  vi: 'Các đoạn giá trị chỉ mục giống nhau liên tiếp được gom thành các cặp (số lượng, giá trị).',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Importing high-cardinality GUIDs or precise timestamps into VertiPaq tables',
                vi: 'Import cột GUID hoặc trường ngày giờ có độ chính xác mili-giây vào bảng VertiPaq',
              },
              why: {
                en: 'High cardinality prevents dictionary compression and renders Run-Length Encoding completely ineffective.',
                vi: 'Cardinality quá cao làm từ điển phình to và triệt tiêu hoàn toàn hiệu quả nén của RLE.',
              },
              solution: {
                en: 'Split datetime columns into separate Date and Time keys, and eliminate unreferenced GUID primary keys in Power Query.',
                vi: 'Tách cột datetime thành 2 cột Date và Time riêng biệt, loại bỏ các khóa GUID không dùng đến trong Power Query.',
              },
            },
          ],
          bestPractices: {
            en: [
              'Design models strictly around Star Schema with 1-to-many, single-direction relationships',
              'Keep foreign keys as integers rather than strings to maximize dictionary scan speeds',
              'Hide raw Fact table numeric columns and expose calculation logic exclusively via explicit DAX measures',
            ],
            vi: [
              'Luôn thiết kế mô hình theo dạng Star Schema với quan hệ 1-nhiều và hướng lọc đơn hướng',
              'Giữ các cột khóa ngoại ở kiểu số nguyên thay vì chuỗi để tối đa hóa tốc độ quét từ điển',
              'Ẩn các cột số thô trong bảng Fact và chỉ cung cấp kết quả tính toán thông qua các DAX measure tường minh',
            ],
          },
          practicalScenario: {
            title: {
              en: 'Optimizing a 20-Million-Row Retail Sales Model',
              vi: 'Tối Ưu Hóa Mô Hình Bán Lẻ 20 Triệu Dòng',
            },
            description: {
              en: 'A retail client loaded a single flat CSV containing 20M sales records with customer names, product descriptions, and store addresses, consuming 4.2 GB RAM. By normalizing into a Star Schema (1 Fact + 3 Dimensions) and splitting datetime stamps into discrete Date and Hour keys, model footprint dropped to 310 MB with 8x faster visual response times.',
              vi: 'Một doanh nghiệp bán lẻ nạp file CSV phẳng 20 triệu dòng chứa tên khách hàng, mô tả sản phẩm và địa chỉ cửa hàng, ngốn hết 4.2 GB RAM. Sau khi chuẩn hóa thành Star Schema (1 Fact + 3 Dimensions) và tách ngày giờ thành cột Date và Hour riêng, dung lượng model giảm xuống còn 310 MB và tốc độ tải báo cáo nhanh hơn 8 lần.',
            },
          },
          keyTakeaways: {
            en: [
              'VertiPaq columnar storage achieves maximum performance when column cardinality is minimized',
              'Star Schema provides the optimal topology for 1-to-many relationship filter propagation',
              'Never leave flat denormalized tables in production Power BI models',
            ],
            vi: [
              'Trình lưu trữ cột VertiPaq đạt hiệu năng cao nhất khi cardinality của các cột được giảm thiểu',
              'Star Schema cung cấp cấu trúc tối ưu cho sự lan truyền bộ lọc qua quan hệ 1-nhiều',
              'Không bao giờ để các bảng phẳng phi chuẩn hóa trong các mô hình Power BI sản xuất',
            ],
          },
        },
      ],
    },
    {
      id: 'pbi-hb-ch-2',
      number: 2,
      slug: 'dax-evaluation-contexts',
      title: {
        en: 'DAX Evaluation Contexts: Filter Context, Row Context & Context Transition',
        vi: 'Ngữ Cảnh Tính Toán DAX: Filter Context, Row Context & Context Transition',
      },
      summary: {
        en: 'Initial Filter Context construction, Row Context iteration (SUMX, FILTER), context transition mechanics with CALCULATE, and filter propagation.',
        vi: 'Cấu trúc Filter Context ban đầu, lặp trong Row Context (SUMX, FILTER), cơ chế chuyển đổi ngữ cảnh bằng CALCULATE và lan truyền bộ lọc.',
      },
      readTimeMinutes: 16,
      sections: [
        {
          id: 'pbi-hb-2-1',
          title: {
            en: 'The Dual Context Engine: Filter Context, Row Context & Context Transition',
            vi: 'Động Cơ Ngữ Cảnh Kép: Filter Context, Row Context & Chuyển Đổi Ngữ Cảnh',
          },
          keyIdea: {
            en: 'Filter Context defines which table rows are visible to an evaluation. Row Context knows which single row is being iterated. CALCULATE() converts active Row Context into an equivalent Filter Context.',
            vi: 'Filter Context xác định những dòng dữ liệu nào được phép hiển thị. Row Context biết con trỏ đang đứng ở dòng nào. CALCULATE() chuyển đổi Row Context hiện tại thành Filter Context tương đương.',
          },
          content: {
            en: 'Every DAX formula evaluates inside a specific execution context consisting of two independent environments:\n\n1. **Filter Context**: The active set of filters applied by report slicers, matrix row/column headers, visual-level filters, and page filters. Filter Context propagates automatically across relationships from the "one" side to the "many" side (e.g. filtering `DimProduct[Category] = "Bikes"` filters the rows visible in `FactSales`).\n2. **Row Context**: Created by calculated columns and iteration functions (e.g. `SUMX`, `AVERAGEX`, `FILTER`). Row Context identifies the "current row" during iteration. Crucially, **Row Context does NOT propagate across relationships**.\n\n3. **Context Transition**: When `CALCULATE()` (or `CALCULATETABLE()`) is invoked inside an existing Row Context, the engine takes all column values in the current iterated row and converts them into an equivalent Filter Context. This transformation enables row-level values to filter the entire data model.',
            vi: 'Mọi công thức DAX đều được tính toán trong một ngữ cảnh thực thi cụ thể bao gồm hai môi trường độc lập:\n\n1. **Filter Context (Ngữ cảnh bộ lọc)**: Tập hợp các bộ lọc đang hoạt động được áp dụng bởi slicer, tiêu đề dòng/cột của Matrix, bộ lọc visual và bộ lọc trang. Filter Context tự động lan truyền qua các mối quan hệ từ phía "một" (1) sang phía "nhiều" (*) (ví dụ: lọc `DimProduct[Category] = "Bikes"` sẽ lọc các dòng hiển thị trong `FactSales`).\n2. **Row Context (Ngữ cảnh dòng)**: Được tạo ra trong calculated column và các hàm lặp iterator (như `SUMX`, `AVERAGEX`, `FILTER`). Row Context xác định "dòng hiện tại" khi duyệt. Cần lưu ý: **Row Context KHÔNG tự lan truyền qua các mối quan hệ**.\n\n3. **Context Transition (Chuyển đổi ngữ cảnh)**: Khi hàm `CALCULATE()` (hoặc `CALCULATETABLE()`) được gọi bên trong một Row Context đang chạy, engine sẽ lấy toàn bộ giá trị các cột của dòng hiện tại và chuyển chúng thành một Filter Context tương đương. Quá trình này giúp giá trị của dòng hiện tại có thể lọc toàn bộ dữ liệu trên model.',
          },
          codeBlock: {
            language: 'dax',
            filename: 'context_transition_demo.dax',
            explanation: {
              en: 'Contrasting a plain calculated column against context transition triggered by invoking a measure or wrapping in CALCULATE().',
              vi: 'So sánh giữa calculated column thông thường với chuyển đổi ngữ cảnh được kích hoạt khi gọi measure hoặc bọc CALCULATE().',
            },
            code: `// 1. Base Measure
Total Sales = SUM(FactSales[SalesAmount])

// 2. Calculated Column in DimCustomer WITHOUT CALCULATE:
// Returns total sales for the ENTIRE table (no context transition)
CustomerSales_NoTransition = SUM(FactSales[SalesAmount])

// 3. Calculated Column in DimCustomer WITH CALCULATE (or Measure reference):
// Triggers Context Transition: Current CustomerID filters FactSales
CustomerSales_WithTransition = CALCULATE(SUM(FactSales[SalesAmount]))
// Equivalent to calling the measure directly:
CustomerSales_MeasureRef = [Total Sales]`,
          },
          comparisonTable: {
            headers: {
              en: ['Context Type', 'Creation Mechanism', 'Filter Propagation', 'Primary Role', 'Memory Impact'],
              vi: ['Loại Ngữ Cảnh', 'Cơ Chế Khởi Tạo', 'Lan Truyền Bộ Lọc', 'Vai Trò Chính', 'Tác Động Bộ Nhớ'],
            },
            rows: [
              {
                en: ['Filter Context', 'Visuals, Slicers, Page Filters, CALCULATE', 'Propagates across 1-to-many relationships', 'Determines which dataset slice is aggregated', 'Query-time in-memory filter mask'],
                vi: ['Filter Context', 'Visual, Slicer, Bộ lọc trang, CALCULATE', 'Lan truyền qua quan hệ 1-nhiều', 'Xác định lát cắt dữ liệu nào được tính tổng', 'Mặt nạ lọc bộ nhớ tạm thời lúc query'],
              },
              {
                en: ['Row Context', 'Calculated Columns, Iterators (SUMX, FILTER)', 'DOES NOT propagate across relationships', 'Knows current row coordinates during loop', 'Stored in RAM for calculated columns; transient for iterators'],
                vi: ['Row Context', 'Calculated Column, Hàm lặp (SUMX, FILTER)', 'KHÔNG lan truyền qua các quan hệ', 'Biết tọa độ dòng hiện tại khi lặp', 'Lưu trên RAM với calculated column; tạm thời với iterator'],
              },
              {
                en: ['Context Transition', 'Calling CALCULATE() inside a Row Context', 'Converts row attributes into Filter Context', 'Enables row values to filter foreign Fact tables', 'Executes a filter context injection per iteration'],
                vi: ['Context Transition', 'Gọi CALCULATE() bên trong một Row Context', 'Biến các thuộc tính dòng thành Filter Context', 'Cho phép giá trị dòng lọc bảng Fact liên kết', 'Kích hoạt bơm filter context trên từng vòng lặp'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Context Transition Lifecycle Flow',
              vi: 'Sơ Đồ Vòng Đời Chuyển Đổi Ngữ Cảnh (Context Transition)',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Active Row Context',
                  vi: 'Row Context Đang Hoạt Động',
                },
                description: {
                  en: 'Iterator (e.g. SUMX) or Calculated Column evaluates at row N with specific column values.',
                  vi: 'Hàm lặp (như SUMX) hoặc Calculated Column duyệt tới dòng N với các giá trị cột cụ thể.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'CALCULATE() Interception',
                  vi: 'CALCULATE() Can Thiệp',
                },
                description: {
                  en: 'CALCULATE wraps evaluation, identifying all column values of row N as candidate filter arguments.',
                  vi: 'Hàm CALCULATE bao bọc biểu thức, chuyển toàn bộ giá trị cột của dòng N thành các điều kiện lọc.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Filter Context Injection',
                  vi: 'Bơm Vào Filter Context',
                },
                description: {
                  en: 'An exact filter predicate for row N is injected into the active Filter Context and propagates to Fact tables.',
                  vi: 'Điều kiện lọc chính xác cho dòng N được bơm vào Filter Context và lan truyền xuống bảng Fact.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Assuming a Measure reference inside SUMX operates in pure Row Context without transition',
                vi: 'Nghĩ rằng gọi Measure bên trong SUMX chỉ chạy ở Row Context thuần túy mà không chuyển ngữ cảnh',
              },
              why: {
                en: 'Every measure reference has an invisible implicit CALCULATE() wrapped around it, triggering Context Transition on every single loop iteration.',
                vi: 'Mọi lệnh gọi Measure đều được tự động bọc ngầm định bằng CALCULATE(), kích hoạt Context Transition trên từng vòng lặp.',
              },
              solution: {
                en: 'Be aware of performance overhead: calculate base measures outside loops or understand the exact filter context injected.',
                vi: 'Lưu ý chi phí hiệu năng: tính toán các biến trung gian bên ngoài vòng lặp hoặc hiểu rõ điều kiện lọc được bơm vào.',
              },
            },
          ],
          bestPractices: {
            en: [
              'Use explicit CALCULATE() modifiers (REMOVEFILTERS, KEEPFILTERS) to control filter overrides intentionally',
              'Use DIVIDE(num, den) instead of `/` operator to eliminate zero-division runtime errors',
              'Store complex intermediate expressions in VAR variables to guarantee single evaluation',
            ],
            vi: [
              'Sử dụng các modifier tường minh của CALCULATE (REMOVEFILTERS, KEEPFILTERS) để kiểm soát việc ghi đè bộ lọc',
              'Dùng hàm DIVIDE(tử, mẫu) thay vì toán tử `/` để triệt tiêu lỗi chia cho 0',
              'Lưu kết quả các biểu thức trung gian phức tạp vào biến VAR để đảm bảo chỉ tính toán một lần',
            ],
          },
          practicalScenario: {
            title: {
              en: 'Calculating Percent of Total Sales Across Product Categories',
              vi: 'Tính Tỷ Trọng % Doanh Thu Trên Từng Danh Mục Sản Phẩm',
            },
            description: {
              en: 'To calculate a category\'s contribution to total company sales, author a measure with `VAR CurrentCategorySales = [Total Sales]` and `VAR AllSales = CALCULATE([Total Sales], REMOVEFILTERS(DimProduct))`. The `REMOVEFILTERS` modifier selectively strips category filters while preserving date slicers.',
              vi: 'Để tính tỷ trọng đóng góp của từng ngành hàng vào tổng doanh thu toàn công ty, viết measure với `VAR CurrentCategorySales = [Total Sales]` và `VAR AllSales = CALCULATE([Total Sales], REMOVEFILTERS(DimProduct))`. Modifier `REMOVEFILTERS` sẽ xóa bỏ bộ lọc trên bảng sản phẩm nhưng vẫn giữ nguyên bộ lọc ngày tháng của slicer.',
            },
          },
          keyTakeaways: {
            en: [
              'Filter Context dictates what rows are visible; Row Context dictates which row is being iterated',
              'CALCULATE is the single gateway to modifying Filter Context and executing Context Transition',
              'Referencing any measure implicitly triggers Context Transition inside iteration loops',
            ],
            vi: [
              'Filter Context quyết định dòng nào được thấy; Row Context quyết định dòng nào đang được duyệt',
              'CALCULATE là cánh cổng duy nhất để biến đổi Filter Context và thực thi Context Transition',
              'Gọi bất kỳ measure nào bên trong vòng lặp đều kích hoạt ngầm định Context Transition',
            ],
          },
        },
      ],
    },
    {
      id: 'pbi-hb-ch-3',
      number: 3,
      slug: 'row-level-security-rls',
      title: {
        en: 'Row-Level Security (RLS) Implementation & Security Filters',
        vi: 'Triển Khai Phân Quyền Row-Level Security (RLS) & Bộ Lọc Bảo Mật',
      },
      summary: {
        en: 'Static vs Dynamic RLS architecture, USERPRINCIPALNAME() resolution, security matrix bridge tables, and unidirectional filter propagation guarantees.',
        vi: 'Kiến trúc RLS Tĩnh vs Động, giải mã danh tính USERPRINCIPALNAME(), bảng cầu nối ma trận bảo mật và các đảm bảo lan truyền bộ lọc đơn hướng.',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'pbi-3-1',
          title: {
            en: 'Static vs Dynamic RLS with USERPRINCIPALNAME() & Security Matrices',
            vi: 'RLS Tĩnh vs RLS Động Với USERPRINCIPALNAME() & Ma Trận Phân Quyền',
          },
          keyIdea: {
            en: 'Dynamic RLS filters data models according to the authenticated user\'s email using USERPRINCIPALNAME(). Filter propagation flows downstream from the security bridge table to restrict Fact table rows.',
            vi: 'RLS Động lọc dữ liệu mô hình dựa theo email của người dùng đăng nhập bằng hàm USERPRINCIPALNAME(). Bộ lọc bảo mật truyền từ bảng cầu nối xuống để giới hạn các dòng dữ liệu trong bảng Fact.',
          },
          content: {
            en: 'Row-Level Security (RLS) restricts data access for given users at the model level, ensuring that viewers only see data pertinent to their role:\n\n1. **Static RLS**: Security roles are hardcoded with static DAX filter rules (e.g. `[Region] = "North America"`). Members are assigned manually in Power BI Service. While simple, static RLS becomes unmaintainable when managing hundreds of stores or territory managers.\n2. **Dynamic RLS**: A single unified security role evaluates `USERPRINCIPALNAME()` (or `USERNAME()`) dynamically at query time against a security mapping table.\n3. **Security Matrix Architecture**: A dedicated `SecurityBridge` table maps `UserPrincipalName` to authorized entity keys (e.g., `StoreKey` or `DepartmentKey`). By setting a 1-to-many relationship from `SecurityBridge` to the Dimension or Fact table, filters automatically cascade to all visual calculations without manual role proliferation.',
            vi: 'Row-Level Security (RLS) giới hạn quyền truy cập dữ liệu cho từng người dùng ở cấp độ mô hình, đảm bảo người xem chỉ thấy các số liệu thuộc phạm vi phụ trách:\n\n1. **Static RLS (RLS Tĩnh)**: Các vai trò bảo mật được viết cứng với điều kiện DAX tĩnh (ví dụ: `[Region] = "North America"`). Thành viên được gán thủ công trên Power BI Service. Phương pháp này đơn giản nhưng nhanh chóng quá tải khi cần quản lý hàng trăm chi nhánh hoặc quản lý khu vực.\n2. **Dynamic RLS (RLS Động)**: Chỉ cần tạo một vai trò bảo mật duy nhất, sử dụng hàm `USERPRINCIPALNAME()` (hoặc `USERNAME()`) để đối soát email người dùng đăng nhập với bảng phân quyền tại thời điểm chạy query.\n3. **Kiến Trúc Bảng Ma Trận Bảo Mật (Security Matrix)**: Một bảng `SecurityBridge` chuyên dụng ánh xạ giữa `UserEmail` và các khóa đối tượng được phép xem (`StoreKey` hoặc `DepartmentKey`). Thiết lập quan hệ 1-nhiều từ `SecurityBridge` đến bảng Dimension hoặc Fact sẽ giúp bộ lọc tự động áp dụng cho mọi visual mà không cần tạo thêm vai trò mới.',
          },
          codeBlock: {
            language: 'dax',
            filename: 'dynamic_rls_filter.dax',
            explanation: {
              en: 'Demonstrates a dynamic RLS filter expression applied on a SecurityBridge table in Power BI Desktop Manage Roles.',
              vi: 'Minh họa biểu thức lọc RLS động áp dụng trên bảng SecurityBridge trong phần Manage Roles của Power BI Desktop.',
            },
            code: `// DAX filter expression configured on [SecurityUserAccess] table:
[UserEmail] = USERPRINCIPALNAME()

// Optional hierarchical manager access pattern:
// User can see their own store OR all stores if marked as Executive
[UserEmail] = USERPRINCIPALNAME() 
    || LOOKUPVALUE(UserRoles[IsExecutive], UserRoles[UserEmail], USERPRINCIPALNAME()) = TRUE()`,
          },
          comparisonTable: {
            headers: {
              en: ['Security Model', 'Configuration Location', 'Scalability', 'Maintenance Effort', 'Best Suited For'],
              vi: ['Mô Hình Bảo Mật', 'Nơi Cấu Hình', 'Khả Năng Mở Rộng', 'Công Sức Bảo Trì', 'Phù Hợp Nhất Cho'],
            },
            rows: [
              {
                en: ['Static RLS', 'Hardcoded roles in Desktop + Cloud assignment', 'Low (1 role per branch/region)', 'High (constant role re-assignment)', 'Simple 2-3 regional division splits'],
                vi: ['Static RLS', 'Viết cứng vai trò trên Desktop + gán trên Cloud', 'Thấp (mỗi chi nhánh 1 vai trò)', 'Cao (phải gán lại thành viên liên tục)', 'Chia 2-3 vùng địa lý đơn giản'],
              },
              {
                en: ['Dynamic Direct RLS', 'USERPRINCIPALNAME() matching DimUser table', 'High (unlimited users via database sync)', 'Low (maintained via source database)', 'Users with 1-to-1 department ownership'],
                vi: ['Dynamic Direct RLS', 'USERPRINCIPALNAME() khớp trực tiếp bảng DimUser', 'Cao (không giới hạn người dùng)', 'Thấp (tự động đồng bộ từ CSDL nguồn)', 'Mỗi người dùng quản lý 1 phòng ban'],
              },
              {
                en: ['Dynamic Matrix RLS', 'Bridge table connecting Users to multiple Keys', 'Enterprise (complex M-to-N security hierarchies)', 'Minimal (metadata-driven permissions)', 'Enterprise matrix management & delegation'],
                vi: ['Dynamic Matrix RLS', 'Bảng cầu nối liên kết người dùng với nhiều khóa', 'Doanh nghiệp (phân quyền đa cấp N-N phức tạp)', 'Rất thấp (quản lý qua bảng metadata)', 'Mô hình phân quyền ma trận doanh nghiệp'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Dynamic RLS Filter Cascade Flow',
              vi: 'Quy Trình Lan Truyền Bộ Lọc Dynamic RLS',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Identity Resolution',
                  vi: 'Xác Thực Danh Tính',
                },
                description: {
                  en: 'Power BI Service resolves the viewing user\'s token to their email via USERPRINCIPALNAME().',
                  vi: 'Power BI Service giải mã token người dùng thành email thông qua hàm USERPRINCIPALNAME().',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Security Table Filter',
                  vi: 'Lọc Bảng Phân Quyền',
                },
                description: {
                  en: 'SecurityBridge table is filtered to rows where [UserEmail] matches the authenticated identity.',
                  vi: 'Bảng SecurityBridge được lọc để chỉ giữ lại các dòng có [UserEmail] trùng với danh tính đã xác thực.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Downstream Fact Restriction',
                  vi: 'Thu Hẹp Dữ Liệu Bảng Fact',
                },
                description: {
                  en: '1-to-many relationship cascades allowed StoreKey values into FactSales, masking unauthorized rows.',
                  vi: 'Quan hệ 1-nhiều lan truyền danh sách StoreKey hợp lệ sang FactSales, ẩn đi toàn bộ các dòng không được phép.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Enabling Bi-Directional filtering on RLS relationships without testing unintended security leaks',
                vi: 'Bật lọc hai chiều (Bi-Directional) trên quan hệ RLS mà không kiểm tra nguy cơ rò rỉ bảo mật',
              },
              why: {
                en: 'Bi-directional relationships can allow security filters to propagate backward through other tables, causing circular paths or unexpected data exclusion.',
                vi: 'Lọc hai chiều có thể khiến bộ lọc bảo mật truyền ngược qua các bảng khác, gây vòng lặp hoặc loại bỏ nhầm dữ liệu.',
              },
              solution: {
                en: 'Keep RLS relationships strictly Single direction, or test thoroughly with the "View as Role" feature in Desktop.',
                vi: 'Giữ các quan hệ RLS ở chế độ Single đơn hướng, hoặc kiểm thử kỹ càng bằng tính năng "View as Role" trong Desktop.',
              },
            },
          ],
          bestPractices: {
            en: [
              'Always test security roles using "View as Role" with specific test emails before publishing',
              'Keep the SecurityBridge table lean with only UserEmail and TargetKey columns',
              'Apply security filters at the Dimension level rather than the Fact level whenever possible to leverage smaller row counts',
            ],
            vi: [
              'Luôn kiểm thử vai trò bảo mật bằng tính năng "View as Role" với các email mẫu trước khi xuất bản',
              'Giữ bảng SecurityBridge gọn nhẹ chỉ chứa cột UserEmail và TargetKey',
              'Áp dụng bộ lọc bảo mật ở cấp Dimension thay vì cấp Fact để tối ưu trên số lượng dòng nhỏ hơn',
            ],
          },
          practicalScenario: {
            title: {
              en: 'Multi-Region Sales Manager Dashboard Access',
              vi: 'Phân Quyền Báo Cáo Cho Quản Lý Bán Hàng Đa Vùng',
            },
            description: {
              en: 'A regional director oversees 3 specific territories out of 50. By maintaining a `UserTerritory` table mapping `director@company.com` to Territory IDs `[101, 102, 105]`, the single dynamic role `[UserEmail] = USERPRINCIPALNAME()` ensures the director sees only their 3 territories across all dashboard pages automatically.',
              vi: 'Một giám đốc khu vực phụ trách 3 vùng bán hàng trong tổng số 50 vùng. Bằng cách duy trì bảng `UserTerritory` ánh xạ `director@company.com` với các mã Territory `[101, 102, 105]`, vai trò động duy nhất `[UserEmail] = USERPRINCIPALNAME()` đảm bảo vị giám đốc này chỉ thấy đúng 3 vùng phụ trách trên toàn bộ báo cáo.',
            },
          },
          keyTakeaways: {
            en: [
              'Dynamic RLS drastically reduces maintenance by replacing hundreds of static roles with a single metadata table',
              'USERPRINCIPALNAME() is evaluated securely in Power BI Service upon user authentication',
              'Always verify RLS filter propagation using Desktop "View as Role"',
            ],
            vi: [
              'Dynamic RLS giảm thiểu công sức bảo trì bằng cách thay thế hàng trăm vai trò tĩnh bằng một bảng metadata duy nhất',
              'USERPRINCIPALNAME() được đánh giá an toàn trên Power BI Service ngay khi người dùng đăng nhập',
              'Luôn xác thực hướng lan truyền của bộ lọc RLS bằng tính năng "View as Role" trong Desktop',
            ],
          },
        },
      ],
    },
  ],
  glossary: [
    {
      term: 'VertiPaq Engine',
      definition: {
        en: 'The in-memory columnar storage engine powering Power BI, Analysis Services, and Excel Power Pivot.',
        vi: 'Trình lưu trữ dữ liệu dạng cột trong bộ nhớ RAM của Power BI, Analysis Services và Excel Power Pivot.',
      },
    },
    {
      term: 'Filter Context',
      definition: {
        en: 'The set of active filters applied to the data model by slicers, visuals, pages, and CALCULATE modifiers.',
        vi: 'Tập hợp các bộ lọc đang hoạt động áp dụng lên mô hình dữ liệu bởi slicer, visual, trang và hàm CALCULATE.',
      },
    },
    {
      term: 'Row Context',
      definition: {
        en: 'The concept of the "current row" during calculated column evaluation or iterative function execution (SUMX).',
        vi: 'Khái niệm "dòng hiện tại" khi tính toán calculated column hoặc khi chạy các hàm lặp như SUMX.',
      },
    },
    {
      term: 'Context Transition',
      definition: {
        en: 'The transformation of an active Row Context into an equivalent Filter Context, triggered by CALCULATE().',
        vi: 'Cơ chế biến đổi Row Context hiện tại thành Filter Context tương đương, được kích hoạt bởi hàm CALCULATE().',
      },
    },
    {
      term: 'Star Schema',
      definition: {
        en: 'A dimensional modeling topology where a central Fact table connects directly to surrounding Dimension tables.',
        vi: 'Cấu trúc mô hình dữ liệu chiều gồm một bảng Fact trung tâm liên kết trực tiếp với các bảng Dimension bao quanh.',
      },
    },
    {
      term: 'Cardinality',
      definition: {
        en: 'The number of distinct, unique values contained in a specific database or table column.',
        vi: 'Số lượng giá trị phân biệt duy nhất có trong một cột cụ thể của bảng dữ liệu.',
      },
    },
    {
      term: 'Run-Length Encoding (RLE)',
      definition: {
        en: 'A lossless compression technique that stores repeated consecutive values as a single value-count pair.',
        vi: 'Kỹ thuật nén không mất dữ liệu lưu trữ các chuỗi giá trị trùng lặp liên tiếp thành cặp (giá trị, số lần lặp).',
      },
    },
    {
      term: 'Row-Level Security (RLS)',
      definition: {
        en: 'A security mechanism restricting data rows based on user role assignments and identity credentials.',
        vi: 'Cơ chế bảo mật giới hạn các dòng dữ liệu được xem dựa trên vai trò và danh tính người dùng.',
      },
    },
  ],
  furtherReading: [
    {
      title: 'The Definitive Guide to DAX (2nd Edition)',
      author: 'Marco Russo & Alberto Ferrari',
      year: 2020,
      description: {
        en: 'The definitive architectural reference covering the VertiPaq engine, DAX contexts, and performance tuning.',
        vi: 'Tài liệu kiến trúc toàn diện và chuyên sâu nhất về engine VertiPaq, các ngữ cảnh DAX và tối ưu hiệu năng.',
      },
    },
    {
      title: 'Star Schema The Complete Reference',
      author: 'Christopher Adamson',
      year: 2010,
      description: {
        en: 'Foundational guide to dimensional modeling, Fact tables, Dimension types, and surrogate key design.',
        vi: 'Cẩm nang nền tảng về mô hình hóa chiều, thiết kế bảng Fact, các loại Dimension và khóa thay thế (surrogate key).',
      },
    },
    {
      title: 'Power BI Enterprise Architecture & Governance Whitepaper',
      author: 'Microsoft Power BI Engineering Team',
      year: 2023,
      description: {
        en: 'Official Microsoft guide on large-scale dataset management, Tabular Editor integration, and RLS best practices.',
        vi: 'Tài liệu kỹ thuật chính thức của Microsoft về quản lý dataset quy mô lớn, tích hợp Tabular Editor và chuẩn RLS.',
      },
    },
    {
      title: 'DAX Patterns (2nd Edition)',
      author: 'Alberto Ferrari & Marco Russo',
      year: 2021,
      description: {
        en: 'Standard catalog of production-tested DAX calculation recipes for Time Intelligence and statistical analytics.',
        vi: 'Tuyển tập các công thức DAX mẫu đã qua kiểm nghiệm thực tế cho Time Intelligence và phân tích thống kê.',
      },
    },
  ],
};
