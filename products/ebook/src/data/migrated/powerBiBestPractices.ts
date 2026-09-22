import { Book } from '../../types';

export const POWERBI_BEST_PRACTICES_BOOK: Book = {
  id: 'powerbi-best-practices',
  slug: 'powerbi-best-practices',
  title: 'Power BI Optimization & DAX Best Practices',
  subtitle: {
    en: 'Centralized Measure Tables, Display Folders & DAX Studio Performance Tuning',
    vi: 'Bảng Measure Tập Trung, Display Folders & Tối Ưu Hiệu Năng Bằng DAX Studio',
  },
  bookType: 'Best Practices',
  categoryId: 'powerbi',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '30 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-01',
  accentColor: 'from-amber-600 to-yellow-900',
  tags: ['DAX Studio', 'Optimization', 'Best Practices', 'Tabular Editor', 'Power BI'],
  description: {
    en: 'Enterprise-grade engineering standards for Power BI models: structuring centralized measure tables with hierarchical Display Folders, and diagnosing Formula Engine (FE) vs Storage Engine (SE) bottlenecks using DAX Studio.',
    vi: 'Quy chuẩn kỹ thuật doanh nghiệp cho các mô hình Power BI: tổ chức bảng measure tập trung với cấu trúc Display Folder phân cấp, và phân tích nút thắt cổ chai Formula Engine (FE) vs Storage Engine (SE) bằng DAX Studio.',
  },
  prerequisites: {
    en: [
      'Experience authoring complex multi-table Power BI models and DAX measures',
      'Basic familiarity with external development tools (DAX Studio, Tabular Editor)',
    ],
    vi: [
      'Kinh nghiệm xây dựng mô hình Power BI nhiều bảng và viết các measure DAX phức tạp',
      'Làm quen cơ bản với các công cụ phát triển bên ngoài (DAX Studio, Tabular Editor)',
    ],
  },
  outcomes: {
    en: [
      'Establish clean, maintainable measure architectures using dedicated `_AllMeasures` containers and Display Folders',
      'Profile query execution plans in DAX Studio, maximizing Storage Engine (SE) multi-threaded scans while minimizing single-threaded Formula Engine (FE) overhead',
      'Implement defensive measure authoring patterns with VAR caches and safe division operators',
    ],
    vi: [
      'Xây dựng kiến trúc quản lý measure chuyên nghiệp bằng bảng chứa `_AllMeasures` và Display Folder phân cấp',
      'Phân tích kế hoạch thực thi câu truy vấn trong DAX Studio, tối đa hóa quét đa luồng của Storage Engine (SE) và giảm tải cho Formula Engine (FE) đơn luồng',
      'Triển khai các mẫu viết measure phòng thủ với biến đệm VAR và hàm chia an toàn DIVIDE()',
    ],
  },
  chapters: [
    {
      id: 'pbp-pbi-ch-1',
      number: 1,
      slug: 'measure-organization-display-folders',
      title: {
        en: 'Centralized Measure Architecture & Metadata Management',
        vi: 'Kiến Trúc Measure Tập Trung & Quản Lý Metadata',
      },
      summary: {
        en: 'Dedicated measure tables (`_AllMeasures`), hierarchical Display Folders, and hiding underlying Fact columns to prevent accidental implicit measures.',
        vi: 'Bảng chứa measure chuyên biệt (`_AllMeasures`), thư mục Display Folder phân cấp và ẩn các cột Fact thô để ngăn tạo measure ngầm định.',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'pbp-pbi-1-1',
          title: {
            en: '1. Centralized Measure Tables (`_AllMeasures`) & Display Folder Taxonomies',
            vi: '1. Bảng Measure Tập Trung (`_AllMeasures`) & Cấu Trúc Display Folder',
          },
          keyIdea: {
            en: 'Never scatter DAX measures across raw Fact or Dimension tables. Consolidate all calculations in dedicated measure tables prefixed with `_` and organize with hierarchical Display Folders.',
            vi: 'Không bao giờ để rải rác các measure DAX trong các bảng Fact hoặc Dimension thô. Hãy gom toàn bộ tính toán vào các bảng measure chuyên biệt có tiền tố `_` và tổ chức bằng Display Folder phân cấp.',
          },
          content: {
            en: 'In large enterprise models with hundreds of measures, scattering DAX formulas across raw transactional tables makes navigation difficult for report builders and invites errors. The industry standard pattern is to create dedicated, disconnected calculation tables (e.g. `_SalesMeasures`, `_FinancialMeasures`, or `_AllMeasures`). Once all dummy columns are deleted or hidden, Power BI elevates the table to the very top of the Fields pane with a distinct calculator icon.\n\nFurthermore, grouping measures into logical Display Folders (e.g., `01 Core KPIs\\Revenue`, `02 Time Intelligence\\YoY`) provides a clean, self-documenting taxonomy for enterprise self-service analytics.',
            vi: 'Trong các mô hình doanh nghiệp lớn với hàng trăm measure, việc để rải rác công thức DAX trong các bảng giao dịch thô gây khó khăn lớn cho người làm báo cáo và dễ phát sinh lỗi nhầm lẫn. Chuẩn mực ngành là tạo các bảng tính toán chuyên biệt, không liên kết (như `_SalesMeasures`, `_FinancialMeasures` hoặc `_AllMeasures`). Khi xóa hoặc ẩn toàn bộ các cột thô trong bảng này, Power BI sẽ tự động đưa bảng lên đầu danh sách Fields với biểu tượng máy tính đặc trưng.\n\nNgoài ra, việc gom nhóm các measure vào các thư mục hiển thị (Display Folders) theo cấp bậc (ví dụ: `01 Core KPIs\\Revenue`, `02 Time Intelligence\\YoY`) mang lại cấu trúc rõ ràng, tự tài liệu hóa cho người dùng tự phục vụ phân tích.',
          },
          practiceDetails: {
            context: {
              en: 'Enterprise tabular models supporting multi-developer collaboration and self-service report creation.',
              vi: 'Mô hình dữ liệu bảng quy mô doanh nghiệp phục vụ nhiều lập trình viên cùng cộng tác và người dùng tự tạo báo cáo.',
            },
            recommendedPractice: {
              en: 'Create isolated measure tables prefixed with an underscore (e.g. `_AllMeasures`), organize measures into numbered 2-level Display Folders, and hide all numeric columns in Fact tables to enforce explicit measure usage.',
              vi: 'Tạo các bảng measure riêng biệt có dấu gạch dưới ở đầu (như `_AllMeasures`), sắp xếp measure vào Display Folder phân cấp có đánh số, và ẩn toàn bộ các cột số trong bảng Fact để bắt buộc dùng explicit measure.',
            },
            whyItMatters: {
              en: 'Prevents report creators from accidentally dragging raw numeric columns into visual cards (creating unmaintainable implicit measures), speeds up onboarding, and standardizes business logic across the enterprise.',
              vi: 'Ngăn ngừa người dựng báo cáo vô tình kéo cột số thô vào thẻ visual (sinh ra các implicit measure không thể bảo trì), rút ngắn thời gian làm quen và chuẩn hóa logic số liệu kinh doanh trên toàn doanh nghiệp.',
            },
            goodExample: {
              language: 'dax',
              filename: 'clean_measure_organization.dax',
              explanation: {
                en: 'Clean, explicit measure with standardized naming, descriptive folder hierarchy, and internal documentation comments.',
                vi: 'Measure tường minh chuẩn mực với quy ước đặt tên rõ ràng, đường dẫn thư mục phân cấp và chú thích chi tiết.',
              },
              code: `// Placed in Table: '_AllMeasures'
// Display Folder: '01 Core KPIs\\Revenue'
// Description: 'Total net revenue after subtracting invoice line discounts'
Total Net Revenue = 
VAR RawRevenue = SUM(FactSales[SalesAmount])
VAR LineDiscounts = SUM(FactSales[DiscountAmount])
RETURN 
RawRevenue - LineDiscounts`,
            },
            riskyExample: {
              language: 'dax',
              filename: 'scattered_implicit_measures.dax',
              explanation: {
                en: 'Scattering measures directly inside FactSales and letting users aggregate raw columns implicitly.',
                vi: 'Để measure rải rác trong bảng FactSales và để người dùng tự kéo cột số thô tính tổng ngầm.',
              },
              code: `// Anti-pattern: Leaving FactSales[SalesAmount] visible and letting visuals do 'Sum of SalesAmount'
// Measure authoring scattered across 15 different tables without folders:
FactSales[m1] = SUM(FactSales[SalesAmount])
DimCustomer[m2] = COUNTROWS(DimCustomer)
FactReturns[m3] = SUM(FactReturns[Amount])`,
            },
            tradeOffs: {
              en: [
                'Initial Setup: Takes 10 minutes to create and configure measure tables and display folders',
                'Table Switching: Measures are isolated in their own folder rather than physically adjacent to the raw source columns',
              ],
              vi: [
                'Thiết Lập Ban Đầu: Tốn khoảng 10 phút tạo và cấu hình bảng measure cùng các thư mục hiển thị',
                'Chuyển Bảng: Các measure nằm tách biệt trong bảng riêng thay vì nằm ngay sát các cột nguồn thô',
              ],
            },
            exceptions: {
              en: [
                'Small single-table prototype models with fewer than 5 simple measures',
              ],
              vi: [
                'Mô hình thử nghiệm (prototype) 1 bảng đơn giản với ít hơn 5 measure cơ bản',
              ],
            },
            checklist: {
              en: [
                'Create a blank table named `_AllMeasures` via Enter Data',
                'Move all DAX measures to `_AllMeasures` and delete the default blank Column1',
                'Organize measures into numbered Display Folders (e.g., `01 Revenue`, `02 Margin`, `03 Time Intelligence`)',
                'Hide all foreign keys and raw numeric metric columns in Fact tables',
              ],
              vi: [
                'Tạo một bảng rỗng tên là `_AllMeasures` bằng tính năng Enter Data',
                'Chuyển toàn bộ các DAX measure vào `_AllMeasures` và xóa cột trống Column1 mặc định',
                'Sắp xếp các measure vào Display Folder có đánh số (ví dụ `01 Revenue`, `02 Margin`, `03 Time Intelligence`)',
                'Ẩn toàn bộ các cột khóa ngoại và cột số đo lường thô trong các bảng Fact',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'pbp-pbi-ch-2',
      number: 2,
      slug: 'dax-studio-performance-tuning',
      title: {
        en: 'Query Performance Tuning: Formula Engine vs Storage Engine',
        vi: 'Tối Ưu Hiệu Năng Truy Vấn: Formula Engine vs Storage Engine',
      },
      summary: {
        en: 'Benchmarking visual queries in DAX Studio, profiling SE vs FE CPU time, and refactoring iterative bottlenecks.',
        vi: 'Đo lường truy vấn visual trong DAX Studio, phân tích thời gian CPU của SE vs FE và tối ưu các nút thắt hàm lặp.',
      },
      readTimeMinutes: 16,
      sections: [
        {
          id: 'pbp-pbi-2-1',
          title: {
            en: '1. Optimizing DAX for Storage Engine (SE) Acceleration over Formula Engine (FE)',
            vi: '1. Tối Ưu DAX Đẩy Tải Cho Storage Engine (SE) Thay Vì Formula Engine (FE)',
          },
          keyIdea: {
            en: 'The Storage Engine (SE) is multi-threaded and blazingly fast in RAM; the Formula Engine (FE) is single-threaded and executes complex logic line-by-line. High-performance DAX pushes maximal aggregation work down to the SE.',
            vi: 'Storage Engine (SE) chạy đa luồng và cực nhanh trong RAM; Formula Engine (FE) chạy đơn luồng và xử lý logic phức tạp từng dòng. DAX hiệu năng cao luôn đẩy tối đa công việc tính tổng xuống cho SE.',
          },
          content: {
            en: 'When a visual sends a query to the tabular model, execution is split across two engines:\n\n1. **Storage Engine (SE / VertiPaq)**: Scans columnar memory, applies basic filters, and aggregates matching rows. SE is written in native C++, runs multi-threaded across all available CPU cores, and utilizes hardware SIMD vector instructions.\n2. **Formula Engine (FE)**: Coordinates query requests, evaluates complex procedural logic (like `SWITCH`, non-linear math, or custom string formatting), and joins disparate SE query results. FE is **single-threaded**.\n\nWhen a DAX measure executes slowly, DAX Studio Server Timings reveal the root cause: if FE accounts for > 50% of total query duration, the measure is suffering from "Formula Engine overhead". Refactoring DAX expressions to eliminate callback loops pushes computations into native VertiPaq SE scans, frequently achieving 10x–100x performance gains.',
            vi: 'Khi một visual gửi yêu cầu truy vấn đến mô hình bảng, quá trình thực thi được phân chia giữa hai engine:\n\n1. **Storage Engine (SE / VertiPaq)**: Quét bộ nhớ cột, áp dụng các bộ lọc cơ bản và tính tổng các dòng phù hợp. SE được viết bằng C++ thuần, chạy đa luồng trên tất cả các nhân CPU có sẵn và tận dụng tập lệnh vector SIMD của phần cứng.\n2. **Formula Engine (FE)**: Điều phối các yêu cầu truy vấn, xử lý các logic tuần tự phức tạp (như `SWITCH`, toán học phi tuyến hoặc định dạng chuỗi tùy chỉnh) và ghép nối kết quả từ các câu truy vấn SE. FE chỉ chạy **đơn luồng**.\n\nKhi một measure DAX chạy chậm, tính năng Server Timings trong DAX Studio sẽ chỉ rõ nguyên nhân: nếu FE chiếm > 50% tổng thời gian truy vấn, measure đang bị nghẽn do quá tải Formula Engine. Tối ưu lại công thức DAX để loại bỏ các vòng lặp gọi hàm ngược (callback loop) sẽ đẩy toàn bộ phép tính xuống các lượt quét VertiPaq SE bản địa, thường giúp tăng tốc từ 10x đến 100x.',
          },
          practiceDetails: {
            context: {
              en: 'Production dashboards with complex matrix visuals, high concurrent user loads, or massive transaction datasets (> 10M rows).',
              vi: 'Dashboard trên môi trường sản xuất với các bảng Matrix phức tạp, nhiều người truy cập đồng thời hoặc tập dữ liệu giao dịch lớn (> 10 triệu dòng).',
            },
            recommendedPractice: {
              en: 'Capture slow visual queries using Performance Analyzer, paste into DAX Studio Server Timings, and refactor iterator expressions (SUMX, FILTER) to allow the Storage Engine to resolve aggregations natively without invoking FE callbacks.',
              vi: 'Bắt câu truy vấn visual chậm bằng Performance Analyzer, dán vào DAX Studio Server Timings và tối ưu lại các biểu thức hàm lặp (SUMX, FILTER) để Storage Engine tự tổng hợp trực tiếp mà không phải gọi ngược lên FE.',
            },
            whyItMatters: {
              en: 'A dashboard where visuals render in 150ms delivers seamless executive adoption, whereas dashboards taking 5+ seconds suffer user abandonment and overload premium capacity CPU limits.',
              vi: 'Một dashboard có visual tải dưới 150ms mang lại trải nghiệm mượt mà cho ban lãnh đạo, trong khi báo cáo mất hơn 5 giây sẽ khiến người dùng chán nản và làm quá tải CPU của dung lượng Power BI Premium.',
            },
            goodExample: {
              language: 'dax',
              filename: 'se_optimized_measure.dax',
              explanation: {
                en: 'Refactored measure pushing simple boolean filter predicates directly to Storage Engine (SE) xmSQL scans.',
                vi: 'Measure được tối ưu đẩy các điều kiện lọc boolean trực tiếp xuống các lượt quét xmSQL của Storage Engine (SE).',
              },
              code: `// Highly optimized for Storage Engine:
// Simple column predicates translate directly to fast multi-threaded VertiPaq SE scans
High Value Sales = 
CALCULATE(
    SUM(FactSales[SalesAmount]),
    FactSales[SalesAmount] > 1000,
    DimProduct[Category] = "Audio"
)`,
            },
            riskyExample: {
              language: 'dax',
              filename: 'fe_heavy_callback_measure.dax',
              explanation: {
                en: 'Iterating with complex row-level FILTER and procedural evaluation forcing thousands of single-threaded FE callbacks.',
                vi: 'Dùng hàm lặp FILTER cấp dòng với biểu thức phức tạp ép sinh ra hàng nghìn lượt gọi callback đơn luồng lên FE.',
              },
              code: `// Anti-pattern: Forces FE callbacks on every row in FactSales
High Value Sales_Slow = 
SUMX(
    FILTER(
        FactSales,
        FactSales[SalesAmount] > 1000 
            && RELATED(DimProduct[Category]) = "Audio"
    ),
    FactSales[SalesAmount]
)`,
            },
            tradeOffs: {
              en: [
                'Profiling Effort: Requires installing DAX Studio and capturing server timing traces',
                'Expression Simplicity: Some complex non-linear business rules require breaking calculations into separate staging columns or data prep steps',
              ],
              vi: [
                'Công Sức Đo Đạc: Cần cài đặt DAX Studio và chạy đo đạc Server Timings',
                'Độ Phức Tạp Công Thức: Một số logic nghiệp vụ phi tuyến tính phức tạp cần phải tách sang các cột xử lý trước trong Power Query',
              ],
            },
            exceptions: {
              en: [
                'Small lookup tables (< 1,000 rows) where FE execution overhead is negligible (< 5ms)',
              ],
              vi: [
                'Các bảng tra cứu nhỏ (< 1.000 dòng) nơi thời gian xử lý của FE không đáng kể (< 5ms)',
              ],
            },
            checklist: {
              en: [
                'Open Performance Analyzer in Power BI Desktop and copy the slow visual query',
                'Connect DAX Studio to the running Desktop model and enable Server Timings',
                'Verify that Storage Engine (SE) duration accounts for at least 80% of total query time',
                'Eliminate `FILTER(Table, ...)` when simple column filter arguments in `CALCULATE` suffice',
                'Ensure SE cache hit ratio is maximized across repeated visual slice interactions',
              ],
              vi: [
                'Mở Performance Analyzer trong Power BI Desktop và copy câu truy vấn của visual bị chậm',
                'Mở DAX Studio kết nối vào model Desktop đang mở và bật tính năng Server Timings',
                'Xác nhận thời gian chạy của Storage Engine (SE) chiếm tối thiểu 80% tổng thời gian truy vấn',
                'Loại bỏ `FILTER(Table, ...)` khi chỉ cần truyền điều kiện lọc cột đơn giản trong `CALCULATE`',
                'Đảm bảo tỷ lệ SE cache hit được tối đa hóa khi người dùng tương tác liên tục trên visual',
              ],
            },
          },
        },
      ],
    },
  ],
};
