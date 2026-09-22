import { Book } from '../types';
import {
  BUILDING_AN_EXECUTIVE_POWER_BI_REPORT_BOOK,
  POWER_BI_AND_DAX_PATTERNS_RECIPES_BOOK,
} from './migrated';

export const POWERBI_EBOOKS: Book[] = [
  // 1. Power BI Handbook
  {
    id: 'powerbi-handbook',
    slug: 'powerbi-handbook',
    title: 'Power BI Handbook',
    subtitle: {
      en: 'VertiPaq Engine, DAX Analytics & Star Schema Modeling',
      vi: 'Trình Lưu Trữ VertiPaq, Ngôn Ngữ DAX & Mô Hình Dữ Liệu Star Schema',
    },
    bookType: 'Handbook',
    categoryId: 'powerbi',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '35 mins',
    chaptersCount: 3,
    publishedDate: '2025-02-10',
    accentColor: 'from-amber-500 to-yellow-700',
    tags: ['Power BI', 'DAX', 'Star Schema', 'VertiPaq', 'Business Intelligence'],
    description: {
      en: 'Comprehensive reference manual for Power BI: the VertiPaq columnar engine, Star Schema modeling, DAX measures vs calculated columns, and RLS security.',
      vi: 'Cẩm nang tra cứu Power BI toàn diện: engine nén VertiPaq, mô hình hóa Star Schema, phân biệt DAX Measure vs Calculated Column và phân quyền RLS.',
    },
    prerequisites: {
      en: ['Data analysis or relational database fundamentals'],
      vi: ['Nền tảng phân tích dữ liệu hoặc cơ sở dữ liệu quan hệ'],
    },
    outcomes: {
      en: ['Design efficient Star Schemas with Fact and Dimension tables', 'Understand DAX evaluation contexts (Row Context vs Filter Context)'],
      vi: ['Thiết kế mô hình Star Schema tối ưu với các bảng Fact và Dimension', 'Nắm vững hai ngữ cảnh tính toán trong DAX (Row Context & Filter Context)'],
    },
    chapters: [
      {
        id: 'pbi-hb-ch-1',
        number: 1,
        slug: 'vertipaq-engine-and-star-schema',
        title: {
          en: 'VertiPaq Engine & Star Schema Data Modeling',
          vi: 'Trình Nén VertiPaq & Mô Hình Dữ Liệu Star Schema',
        },
        summary: {
          en: 'Columnar storage, dictionary encoding, run-length encoding, Fact vs Dimension tables.',
          vi: 'Lưu trữ theo cột, mã hóa tự điển, mã hóa độ dài chạy, bảng Fact vs Dimension.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pbi-hb-1-1',
            title: {
              en: 'Why VertiPaq Loves Star Schema (And Hates Flat Tables)',
              vi: 'Tại Sao Engine VertiPaq Tối Ưu Tốt Nhất Với Star Schema',
            },
            content: {
              en: 'VertiPaq compresses columnar data by encoding unique values into small dictionaries. Star Schemas minimize cardinality and maximize compression ratios.',
              vi: 'VertiPaq nén dữ liệu theo cột bằng cách mã hóa các giá trị duy nhất vào từ điển. Mô hình Star Schema giảm thiểu cardinality và tối đa hóa tỷ lệ nén.',
            },
          },
        ],
      },
      {
        id: 'pbi-hb-ch-2',
        number: 2,
        slug: 'dax-evaluation-contexts',
        title: {
          en: 'DAX Evaluation Contexts: Row Context vs Filter Context',
          vi: 'Ngữ Cảnh Tính DAX: Row Context vs Filter Context',
        },
        summary: {
          en: 'How CALCULATE modifies Filter Context and context transition mechanics.',
          vi: 'Cách hàm CALCULATE biến đổi Filter Context và cơ chế chuyển đổi ngữ cảnh.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pbi-hb-2-1',
            title: {
              en: 'CALCULATE() and Context Transition',
              vi: 'Hàm CALCULATE() & Cơ Chế Chuyển Đổi Context Transition',
            },
            content: {
              en: '`CALCULATE()` is the only DAX function capable of creating or overriding Filter Context. It automatically converts current Row Context into equivalent Filter Context.',
              vi: '`CALCULATE()` là hàm DAX duy nhất có thể tạo hoặc thay đổi Filter Context. Nó tự động chuyển đổi Row Context hiện tại thành Filter Context tương đương.',
            },
            codeBlock: {
              language: 'dax',
              filename: 'measures.dax',
              code: `Total Sales YTD = 
CALCULATE(
    SUM(Sales[Amount]),
    DATESYTD('Calendar'[Date])
)`,
            },
          },
        ],
      },
      {
        id: 'pbi-hb-ch-3',
        number: 3,
        slug: 'row-level-security-rls',
        title: {
          en: 'Row-Level Security (RLS) Implementation',
          vi: 'Phân Quyền Dữ Liệu Theo Dòng (Row-Level Security - RLS)',
        },
        summary: {
          en: 'Static vs Dynamic RLS using USERPRINCIPALNAME() and security roles.',
          vi: 'RLS Tĩnh vs RLS Động bằng hàm USERPRINCIPALNAME() và phân vai bảo mật.',
        },
        readTimeMinutes: 11,
        sections: [
          {
            id: 'pbi-3-1',
            title: {
              en: 'Dynamic RLS with USERPRINCIPALNAME()',
              vi: 'Cấu Hình RLS Động Bằng Hàm USERPRINCIPALNAME()',
            },
            content: {
              en: 'Filter the User table using `[Email] = USERPRINCIPALNAME()` so logged-in users only see rows where they are authorized in the security matrix.',
              vi: 'Lọc bảng User bằng `[Email] = USERPRINCIPALNAME()` để người dùng đăng nhập chỉ thấy các dòng họ có quyền xem.',
            },
          },
        ],
      },
    ],
  },

  // 2. Power BI Definitions
  {
    id: 'powerbi-definitions',
    slug: 'powerbi-definitions',
    title: 'Power BI & DAX Definitions Glossary',
    subtitle: {
      en: 'DAX Terminology, Cardinality & Modeling Glossary',
      vi: 'Thuật Ngữ DAX, Độ Biến Thiên Cardinality & Tra Cứu Khái Niệm Power BI',
    },
    bookType: 'Definitions',
    categoryId: 'powerbi',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '20 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-amber-600 to-yellow-800',
    tags: ['Definitions', 'DAX', 'Cardinality', 'Glossary'],
    description: {
      en: 'Clear definitions for Power BI concepts: Cardinality, Measure vs Calculated Column, Filter Propagation, Context Transition, and Time Intelligence.',
      vi: 'Từ điển định nghĩa các khái niệm Power BI: Cardinality, Measure vs Calculated Column, Sự lan truyền Filter, Context Transition và Time Intelligence.',
    },
    prerequisites: {
      en: ['Basic Power BI Desktop familiarity'],
      vi: ['Làm quen Power BI Desktop cơ bản'],
    },
    outcomes: {
      en: ['Understand why measures consume zero RAM at rest compared to calculated columns'],
      vi: ['Hiểu lý do Measure không tốn dung lượng RAM khi nghỉ so với Calculated Column'],
    },
    chapters: [
      {
        id: 'pbi-def-ch-1',
        number: 1,
        slug: 'cardinality-and-storage-terms',
        title: {
          en: 'Cardinality & Storage Model Terms',
          vi: 'Khái Niệm Cardinality & Mô Hình Lưu Trữ',
        },
        summary: {
          en: 'High vs Low Cardinality impact on memory and Dual vs DirectQuery modes.',
          vi: 'Tác động của Cardinality đến RAM và chế độ Dual vs DirectQuery.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'pbi-def-1-1',
            title: {
              en: 'Column Cardinality Definition',
              vi: 'Định Nghĩa Độ Biến Thiên Cardinality Của Cột',
            },
            content: {
              en: 'Cardinality represents the count of unique values in a column. High cardinality columns (e.g. Timestamps or GUIDs) consume massive RAM in VertiPaq.',
              vi: 'Cardinality biểu thị số lượng giá trị duy nhất trong một cột. Cột có Cardinality cao (như Timestamp hay GUID) tốn rất nhiều dung lượng RAM.',
            },
          },
        ],
      },
      {
        id: 'pbi-def-ch-2',
        number: 2,
        slug: 'dax-measures-vs-calculated-columns',
        title: {
          en: 'Measures vs Calculated Columns vs Tables',
          vi: 'Phân Biệt Measure vs Calculated Column vs Calculated Table',
        },
        summary: {
          en: 'Query-time evaluation vs Model storage evaluation.',
          vi: 'Tính toán lúc chạy query vs Tính toán lưu trữ trong bộ nhớ.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'pbi-def-2-1',
            title: {
              en: 'Why Measures Always Win',
              vi: 'Tại Sao Luôn Ưu Tiên Dùng Measure Thay Cho Calculated Column',
            },
            content: {
              en: 'Calculated Columns are calculated during data refresh and stored permanently on disk/RAM. Measures are dynamically evaluated on-the-fly in response to user visuals.',
              vi: 'Calculated Column tính toán khi refresh và lưu cứng trên RAM. Measure chỉ tính toán động tức thời theo các thao tác tương tác của người dùng.',
            },
          },
        ],
      },
    ],
  },

  // 3. Power BI Common Errors
  {
    id: 'powerbi-common-errors',
    slug: 'powerbi-common-errors',
    title: 'Power BI Common Errors & DAX Pitfalls',
    subtitle: {
      en: 'Circular Dependency, Incorrect Aggregates & Bi-Directional Filter Bugs',
      vi: 'Lỗi Circular Dependency, Tính Lỗi Tổng & Lọc Hai Chiều Bi-Directional',
    },
    bookType: 'Common Errors',
    categoryId: 'powerbi',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-01-22',
    accentColor: 'from-amber-600 to-rose-800',
    tags: ['DAX Errors', 'Bi-Directional', 'Debugging', 'Common Errors'],
    description: {
      en: 'Deconstructing common Power BI errors: A circular dependency was detected, incorrect total rows in Matrix visuals, and performance degradation from bi-directional cross-filtering.',
      vi: 'Khắc phục các lỗi Power BI thường gặp: Lỗi phụ thuộc vòng (Circular Dependency), hàng tổng Total bị sai trong Matrix và chậm hệ thống do lọc hai chiều.',
    },
    prerequisites: {
      en: ['DAX query editing skills'],
      vi: ['Kỹ năng viết công thức DAX cơ bản'],
    },
    outcomes: {
      en: ['Fix A circular dependency was detected errors in calculated columns', 'Solve wrong total row values in Matrix visuals using HASONEVALUE()'],
      vi: ['Sửa lỗi Circular dependency trong calculated column', 'Khắc phục lỗi tính sai dòng Total trong bảng Matrix bằng hàm HASONEVALUE()'],
    },
    chapters: [
      {
        id: 'pce-pbi-ch-1',
        number: 1,
        slug: 'circular-dependencies-and-totals',
        title: {
          en: 'Circular Dependencies & Matrix Total Fixes',
          vi: 'Lỗi Phụ Thuộc Vòng & Sửa Hàng Tổng Total Trong Matrix',
        },
        summary: {
          en: 'Context transition inside calculated columns causing circular loops and SUMX matrix fixes.',
          vi: 'Context transition trong calculated column gây phụ thuộc vòng và cách sửa bằng SUMX.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pce-pbi-1-1',
            title: {
              en: 'Fixing Matrix Total Rows with SUMX()',
              vi: 'Khắc Phục Dòng Total Trong Matrix Bằng Hàm Iterate SUMX()',
            },
            content: {
              en: 'Matrix Total rows evaluate measures over the entire unfiltered model context. Wrap logic inside `SUMX(Values(Table[Key]), [Measure])` to force correct row-by-row iteration.',
              vi: 'Dòng Total trong Matrix tính toán Measure trên toàn bộ context tổng. Bọc logic bằng `SUMX(Values(Table[Key]), [Measure])` để ép tính lặp lại chính xác từng dòng.',
            },
          },
        ],
      },
      {
        id: 'pce-pbi-ch-2',
        number: 2,
        slug: 'bi-directional-filtering-pitfalls',
        title: {
          en: 'Bi-Directional Cross-Filtering Performance Traps',
          vi: 'Cạm Bẫy Hiệu Năng Từ Lọc Hai Chiều (Bi-Directional)',
        },
        summary: {
          en: 'Why setting cross-filter direction to Both causes ambiguity and slow reports.',
          vi: 'Tại sao bật lọc hai chiều Both lại gây mơ hồ quan hệ và làm chậm báo cáo.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'pce-pbi-2-1',
            title: {
              en: 'Replacing Both Cross-Filter with CROSSFILTER() DAX',
              vi: 'Thay Thế Lọc Hai Chiều Cứng Bằng Hàm DAX CROSSFILTER()',
            },
            content: {
              en: 'Keep relationships strictly Single direction in the data model, activating bi-directional filtering dynamically only when needed using `CROSSFILTER(..., BOTH)`.',
              vi: 'Giữ mối quan hệ Lọc một chiều Single trong data model, chỉ kích hoạt lọc 2 chiều ngắn hạn khi cần bằng hàm `CROSSFILTER(..., BOTH)`.',
            },
          },
        ],
      },
    ],
  },

  // 4. Power BI Best Practices
  {
    id: 'powerbi-best-practices',
    slug: 'powerbi-best-practices',
    title: 'Power BI Optimization & DAX Best Practices',
    subtitle: {
      en: 'TABULAR EDITOR, DAX Studio Tuning & Measure Organization',
      vi: 'Tối Ưu Với TABULAR EDITOR, DAX Studio & Tổ Chức Measure Chuẩn',
    },
    bookType: 'Best Practices',
    categoryId: 'powerbi',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-01',
    accentColor: 'from-amber-600 to-yellow-900',
    tags: ['DAX Studio', 'Optimization', 'Best Practices', 'Tabular Editor'],
    description: {
      en: 'Enterprise guidelines for Power BI models: organizing measures in dummy tables, analyzing execution queries with DAX Studio, and enforcing Star Schemas.',
      vi: 'Quy chuẩn Power BI quy mô doanh nghiệp: quản lý measure tập trung trong bảng giả, phân tích query bằng DAX Studio và tuân thủ Star Schema.',
    },
    prerequisites: {
      en: ['Power BI report building experience'],
      vi: ['Kinh nghiệm dựng báo cáo Power BI'],
    },
    outcomes: {
      en: ['Analyze formula engine vs storage engine execution time in DAX Studio', 'Organize measures into dedicated Measure Tables'],
      vi: ['Phân tích thời gian Formula Engine vs Storage Engine trong DAX Studio', 'Tổ chức Measure tập trung vào các bảng chứa Measure chuyên biệt'],
    },
    chapters: [
      {
        id: 'pbp-pbi-ch-1',
        number: 1,
        slug: 'measure-organization-display-folders',
        title: {
          en: 'Measure Tables & Display Folders',
          vi: 'Quản Lý Measure Trong Bảng Chuyên Biệt & Display Folders',
        },
        summary: {
          en: 'Creating _AllMeasures dummy tables and organizing with Display Folders.',
          vi: 'Tạo bảng giả _AllMeasures và gom nhóm bằng thư mục hiển thị Display Folders.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pbp-pbi-1-1',
            title: {
              en: 'Creating a Centralized _AllMeasures Table',
              vi: 'Tạo Bảng Tập Trung _AllMeasures',
            },
            content: {
              en: 'Never scatter DAX measures across raw Fact tables. Create an empty table `_AllMeasures` and move all measures there for clean maintenance.',
              vi: 'Không để rải rác Measure trong các bảng Fact. Hãy tạo một bảng rỗng `_AllMeasures` và chuyển tất cả Measure về đó.',
            },
          },
        ],
      },
      {
        id: 'pbp-pbi-ch-2',
        number: 2,
        slug: 'dax-studio-performance-tuning',
        title: {
          en: 'Performance Tuning with DAX Studio',
          vi: 'Tối Ưu Hiệu Năng Truy Vấn Bằng DAX Studio',
        },
        summary: {
          en: 'Benchmarking FE (Formula Engine) vs SE (Storage Engine) Query Duration.',
          vi: 'Đo đạc thời gian xử lý giữa Formula Engine (FE) và Storage Engine (SE).',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'pbp-pbi-2-1',
            title: {
              en: 'Minimizing Formula Engine Overheard',
              vi: 'Tối Giảm Tải Cho Formula Engine (FE)',
            },
            content: {
              en: 'Storage Engine (SE) is multi-threaded and extremely fast. Formula Engine (FE) is single-threaded. Rewrite DAX formulas to push heavy lifting to SE.',
              vi: 'Storage Engine (SE) chạy đa luồng cực nhanh. Formula Engine (FE) chỉ chạy đơn luồng. Hãy viết DAX sao cho đẩy tối đa công việc cho SE.',
            },
          },
        ],
      },
    ],
  },

  // 5. Building an Executive Power BI Report (NEW)
  {
    id: 'building-an-executive-power-bi-report',
    slug: 'building-an-executive-power-bi-report',
    title: 'Building an Executive Power BI Report',
    subtitle: {
      en: 'End-to-End Guide to Star Schema, DAX KPIs, Executive Layouts & Validation',
      vi: 'Hướng Dẫn Dựng Báo Cáo Quản Trị Từ Mô Hình Star Schema, DAX KPI Đến Layout UX',
    },
    bookType: 'Practical Guides',
    categoryId: 'powerbi',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '40 mins',
    chaptersCount: 4,
    publishedDate: '2025-02-18',
    accentColor: 'from-amber-500 to-yellow-800',
    tags: ['Power BI', 'Executive Report', 'Star Schema', 'DAX KPIs', 'Practical Guide'],
    description: {
      en: 'A focused, step-by-step practical guide to constructing professional executive Power BI reports: Power Query transformation, Star Schema modeling, core KPI measure design, executive UX layout, and validation.',
      vi: 'Hướng dẫn thực hành từng bước dựng báo cáo Power BI cho cấp quản trị: biến đổi dữ liệu Power Query, mô hình Star Schema, thiết kế chỉ số DAX KPI, bố cục UX báo cáo và kiểm thử.',
    },
    prerequisites: {
      en: ['Basic understanding of Power BI Desktop and relational data concepts'],
      vi: ['Hiểu biết cơ bản về Power BI Desktop và khái niệm dữ liệu quan hệ'],
    },
    outcomes: {
      en: [
        'Transform raw business tables into a clean Star Schema in Power Query',
        'Design reusable DAX KPI measures for executive decision-making',
        'Apply high-density executive UX layouts with accessible visual hierarchy',
      ],
      vi: [
        'Chuyển đổi bảng dữ liệu thô thành mô hình Star Schema sạch trong Power Query',
        'Thiết kế các chỉ số DAX KPI dùng lại được phục vụ quyết định quản trị',
        'Áp dụng bố cục UX báo cáo quản trị với phân cấp thị giác trực quan',
      ],
    },
    chapters: [
      {
        id: 'pbi-exec-ch-1',
        number: 1,
        slug: 'data-preparation-and-model-design',
        title: {
          en: 'Data Preparation & Model Design',
          vi: 'Chuẩn Bị Dữ Liệu & Thiết Kế Mô Hình',
        },
        summary: {
          en: 'Importing data, Power Query cleaning, Fact vs Dimension tables, Star Schema, avoiding flat table complexity.',
          vi: 'Nạp dữ liệu, làm sạch trong Power Query, Bảng dữ liệu thực tế (Fact table) vs Bảng chiều (Dimension table), Star Schema, tránh phức tạp hóa flat table.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'pbi-exec-1-1',
            title: {
              en: '1. Building a Clean Star Schema in Power Query',
              vi: '1. Xây Dựng Mô Hình Star Schema Sạch Trong Power Query',
            },
            content: {
              en: 'Import raw transactional spreadsheets into Power Query. Separate transaction records into Fact tables (e.g. FactSales) and lookup attributes into Dimension tables (e.g. DimCustomer, DimProduct, DimDate). Connect dimensions with 1-to-many single-direction relationships to minimize model complexity.',
              vi: 'Nạp các bảng giao dịch thô vào Power Query. Tách các dòng giao dịch thành Bảng dữ liệu thực tế (Fact table) như FactSales, và tách các thuộc tính tra cứu thành Bảng chiều (Dimension table) như DimCustomer, DimProduct, DimDate. Nối các dimension với quan hệ 1-nhiều 1 chiều.',
            },
            codeBlock: {
              language: 'm',
              filename: 'PowerQuery_Cleaning.m',
              code: `let
    Source = Excel.Workbook(File.Contents("C:\\Data\\Sales2025.xlsx"), null, true),
    Sales_Sheet = Source{[Item="Sales",Kind="Sheet"]}[Data],
    #"Promoted Headers" = Table.PromoteHeaders(Sales_Sheet, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"OrderDate", type date}, {"SalesAmount", Currency.Type}})
in
    #"Changed Type"`,
            },
            keyTakeaways: {
              en: [
                'Always prefer Star Schema over single flat tables',
                'Set relationship filter directions strictly to Single',
              ],
              vi: [
                'Luôn ưu tiên Star Schema thay vì dùng 1 bảng phẳng duy nhất',
                'Thiết lập hướng lọc của quan hệ nghiêm ngặt ở chế độ Single',
              ],
            },
          },
        ],
      },
      {
        id: 'pbi-exec-ch-2',
        number: 2,
        slug: 'dax-measures-and-kpi-design',
        title: {
          en: 'DAX Measures & KPI Design',
          vi: 'Thiết Kế Chỉ Số DAX Measures & KPI',
        },
        summary: {
          en: 'Measures vs calculated columns, core KPI measures with CALCULATE, time-based KPIs, reusable measure naming conventions.',
          vi: 'Phân biệt Measure vs Calculated column, viết chỉ số KPI cốt lõi với CALCULATE, KPI theo thời gian, quy chuẩn đặt tên.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'pbi-exec-2-1',
            title: {
              en: '1. Authoring Core Business KPIs with CALCULATE()',
              vi: '1. Viết Các Chỉ Số KPI Doanh Nghiệp Với CALCULATE()',
            },
            content: {
              en: 'Avoid calculated columns for aggregation. Author reusable measures in an _AllMeasures table. Calculate Total Revenue, YTD Sales, and Year-over-Year Growth using CALCULATE and Date intelligence functions.',
              vi: 'Tránh dùng calculated column để tính tổng. Viết các Measure dùng lại được trong bảng _AllMeasures. Tính Tổng doanh thu, Doanh thu YTD và Tăng trưởng so với cùng kỳ bằng CALCULATE.',
            },
            codeBlock: {
              language: 'dax',
              filename: 'kpi_measures.dax',
              code: `Total Revenue = SUM(FactSales[SalesAmount])

Sales YTD = CALCULATE([Total Revenue], DATESYTD(DimDate[Date]))

Sales YoY Growth % = 
VAR CurrentYTD = [Sales YTD]
VAR PriorYTD = CALCULATE([Sales YTD], SAMEPERIODLASTYEAR(DimDate[Date]))
RETURN DIVIDE(CurrentYTD - PriorYTD, PriorYTD)`,
            },
            keyTakeaways: {
              en: [
                'Use DIVIDE() to safely prevent division by zero errors',
                'Never reference raw columns inside visual cards; always wrap in explicit measures',
              ],
              vi: [
                'Dùng hàm DIVIDE() để phòng chống lỗi chia cho 0',
                'Không kéo trực tiếp cột thô vào thẻ KPI card; luôn bọc bằng Measure',
              ],
            },
          },
        ],
      },
      {
        id: 'pbi-exec-ch-3',
        number: 3,
        slug: 'report-design-and-executive-ux',
        title: {
          en: 'Report Design & Executive UX',
          vi: 'Thiết Kế Báo Cáo & Trải Nghiệm UX Quản Trị',
        },
        summary: {
          en: 'Page structure, KPI card positioning, chart selection, slicers, reducing visual noise, information density, accessibility.',
          vi: 'Cấu trúc trang báo cáo, vị trí thẻ KPI, lựa chọn biểu đồ, bộ lọc slicer, giảm nhiễu thị giác, mật độ thông tin và accessibility.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'pbi-exec-3-1',
            title: {
              en: '1. High-Density Executive Layout & Visual Hierarchy',
              vi: '1. Bố Cục Báo Cáo Quản Trị Mật Độ Cao & Phân Cấp Thị Giác',
            },
            content: {
              en: 'Position high-level summary KPI cards at the top left (focal entry point). Use simple line charts for trends and horizontal bar charts for categorical breakdown. Limit color palettes to 2 muted brand shades plus 1 accent alert color.',
              vi: 'Đặt các thẻ KPI tổng quan ở vị trí trên cùng bên trái (điểm nhìn đầu tiên). Dùng biểu đồ đường cho xu hướng và biểu đồ cột ngang cho phân hạng. Giới hạn bảng màu ở 2 tông trung tính và 1 màu điểm nhấn cảnh báo.',
            },
            keyTakeaways: {
              en: [
                'Limit maximum 4-5 core visuals per dashboard page',
                'Maintain alignment grids and uniform 8px margins between visual cards',
              ],
              vi: [
                'Giới hạn tối đa 4-5 visual cốt lõi trên một trang báo cáo',
                'Giữ lưới căn chỉnh thẳng hàng và khoảng cách 8px đồng nhất giữa các visual',
              ],
            },
          },
        ],
      },
      {
        id: 'pbi-exec-ch-4',
        number: 4,
        slug: 'validation-performance-and-publishing',
        title: {
          en: 'Validation, Performance & Publishing',
          vi: 'Kiểm Thử Số Liệu, Hiệu Năng & Xuất Bản Báo Cáo',
        },
        summary: {
          en: 'Validating numbers against source data, DAX performance checks, refresh schedules, RLS awareness, maintaining reports.',
          vi: 'Đối soát số liệu với nguồn, kiểm tra hiệu năng DAX, lịch refresh, phân quyền RLS và bảo trì báo cáo.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'pbi-exec-4-1',
            title: {
              en: '1. Number Reconciliation & Performance Verification',
              vi: '1. Đối Soát Số Liệu & Kiểm Tra Hiệu Năng Báo Cáo',
            },
            content: {
              en: 'Compare measure totals against source ERP/database control queries. Test Performance Analyzer inside Power BI Desktop to ensure all visual rendering completes under 1000ms before publishing to Power BI Service.',
              vi: 'Đối soát tổng tiền của Measure với câu truy vấn gốc trong ERP/database. Mở Performance Analyzer trong Power BI Desktop để đảm bảo mọi visual render dưới 1000ms trước khi xuất bản lên Power BI Service.',
            },
            keyTakeaways: {
              en: [
                'Verify measure values against raw database control queries',
                'Check visual rendering speed with Performance Analyzer before publishing',
              ],
              vi: [
                'Đối soát giá trị Measure với truy vấn kiểm tra trong CSDL gốc',
                'Dùng Performance Analyzer kiểm tra tốc độ render visual trước khi xuất bản',
              ],
            },
          },
        ],
      },
    ],
  },

  // 6. Power BI & DAX Patterns / Recipes (NEW)
  {
    id: 'power-bi-and-dax-patterns-recipes',
    slug: 'power-bi-and-dax-patterns-recipes',
    title: 'Power BI & DAX Patterns / Recipes',
    subtitle: {
      en: 'Reusable Code Formulas for Time Intelligence, Context Modification, Ranking & Dynamic KPIs',
      vi: 'Bộ Công Thức DAX Dùng Lại Cho Time Intelligence, Biến Đổi Context, Xếp Hạng & KPI Động',
    },
    bookType: 'Patterns / Recipes',
    categoryId: 'powerbi',
    subjectId: 'analytics',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '35 mins',
    chaptersCount: 4,
    publishedDate: '2025-02-18',
    accentColor: 'from-yellow-500 to-amber-700',
    tags: ['DAX Recipes', 'Time Intelligence', 'RANKX', 'Context Transition', 'Power BI'],
    description: {
      en: 'A collection of production-ready, reusable DAX patterns: Time Intelligence (YTD, MTD, YoY), Filter & Context manipulation (CALCULATE, ALL, REMOVEFILTERS), Ranking (RANKX, Top N), and dynamic KPI measures.',
      vi: 'Tập hợp các công thức DAX mẫu dùng lại được trong thực tế: Time Intelligence (YTD, MTD, YoY), Biến đổi ngữ cảnh bộ lọc (Filter Context), Xếp hạng (RANKX, Top N) và KPI động.',
    },
    prerequisites: {
      en: ['Experience writing basic DAX measures in Power BI'],
      vi: ['Kinh nghiệm viết các hàm DAX cơ bản trong Power BI'],
    },
    outcomes: {
      en: [
        'Apply robust Time Intelligence DAX patterns across custom date tables',
        'Master ALL, REMOVEFILTERS, and ALLEXCEPT for percentage-of-total calculations',
        'Build dynamic Top N ranking measures with RANKX and error-free ties',
      ],
      vi: [
        'Áp dụng các mẫu DAX Time Intelligence chuẩn trên Bảng ngày tháng tùy chỉnh',
        'Làm chủ ALL, REMOVEFILTERS và ALLEXCEPT để tính tỷ trọng % tổng',
        'Xây dựng công thức xếp hạng Top N động bằng RANKX không bị trùng hạng',
      ],
    },
    chapters: [
      {
        id: 'pbi-pat-ch-1',
        number: 1,
        slug: 'time-intelligence-patterns',
        title: {
          en: 'Time Intelligence Patterns',
          vi: 'Mẫu Công Thức Time Intelligence',
        },
        summary: {
          en: 'Year-to-Date (YTD), Month-to-Date (MTD), Year-over-Year (YoY), rolling period calculations, date table rules.',
          vi: 'Công thức YTD, MTD, YoY, tính toán kỳ trượt rolling period và quy tắc bảng Date.',
        },
        readTimeMinutes: 9,
        sections: [
          {
            id: 'pbi-pat-1-1',
            title: {
              en: '1. Reusable YTD, YoY, and Rolling 12-Month Patterns',
              vi: '1. Bộ Công Thức YTD, YoY Và Rolling 12 Tháng Dùng Lại',
            },
            content: {
              en: 'Time Intelligence functions require a dedicated contiguous Date table marked as Date Table. Combine DATESYTD, SAMEPERIODLASTYEAR, and DATESINPERIOD for flexible time series analytics.',
              vi: 'Các hàm Time Intelligence yêu cầu một Bảng ngày tháng (Date table) liên tục được đánh dấu Mark as Date Table. Kết hợp DATESYTD, SAMEPERIODLASTYEAR và DATESINPERIOD cho phân tích chuỗi thời gian.',
            },
            codeBlock: {
              language: 'dax',
              filename: 'time_intelligence.dax',
              code: `Sales YTD = CALCULATE([Total Sales], DATESYTD(DimDate[Date]))

Sales YoY % = 
VAR CurrentSales = [Total Sales]
VAR PriorSales = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date]))
RETURN DIVIDE(CurrentSales - PriorSales, PriorSales)

Rolling 12M Sales = 
CALCULATE(
    [Total Sales],
    DATESINPERIOD(DimDate[Date], MAX(DimDate[Date]), -12, MONTH)
)`,
            },
            keyTakeaways: {
              en: [
                'Always mark DimDate as Date Table in Power BI Desktop',
                'Ensure DimDate has no missing dates or gaps in the timeline',
              ],
              vi: [
                'Luôn đánh dấu bảng DimDate là Mark as Date Table trong Power BI',
                'Đảm bảo DimDate không bị khuyết thiếu bất kỳ ngày nào trong dải thời gian',
              ],
            },
          },
        ],
      },
      {
        id: 'pbi-pat-ch-2',
        number: 2,
        slug: 'filter-and-context-patterns',
        title: {
          en: 'Filter & Context Modification Patterns',
          vi: 'Mẫu Công Thức Biến Đổi Context & Bộ Lọc',
        },
        summary: {
          en: 'CALCULATE, FILTER, REMOVEFILTERS, ALL, ALLEXCEPT, context transition, controlling filter propagation.',
          vi: 'Hàm CALCULATE, FILTER, REMOVEFILTERS, ALL, ALLEXCEPT, context transition, kiểm soát lan truyền filter.',
        },
        readTimeMinutes: 9,
        sections: [
          {
            id: 'pbi-pat-2-1',
            title: {
              en: '1. Percentage of Total Pattern with REMOVEFILTERS()',
              vi: '1. Mẫu Tính Tỷ Trọng % Tổng Bằng Hàm REMOVEFILTERS()',
            },
            content: {
              en: 'To compute a category\'s percentage contribution to the grand total, clear row filters on the dimension table using `REMOVEFILTERS(DimProduct)` inside `CALCULATE`. Note that `REMOVEFILTERS()` operates exclusively as a filter modifier inside `CALCULATE()`. While `ALL()` can function both as a filter modifier and a table expression returning rows (e.g. inside `SUMX` or `FILTER`), `REMOVEFILTERS()` cannot return a table and should not be treated as a universal replacement for `ALL()`.',
              vi: 'Để tính tỷ trọng % đóng góp của một danh mục vào tổng số, xóa ngữ cảnh bộ lọc trên Bảng chiều (Dimension table) bằng `REMOVEFILTERS(DimProduct)` trong `CALCULATE`. Lưu ý rằng `REMOVEFILTERS()` hoạt động thuần túy như một modifier xóa bộ lọc trong `CALCULATE()`. Trong khi `ALL()` vừa làm modifier vừa là một biểu thức bảng trả về danh sách dòng (dùng trong `SUMX` hay `FILTER`), `REMOVEFILTERS()` không thể trả về bảng và không phải là sự thay thế vạn năng cho `ALL()`.',
            },
            codeBlock: {
              language: 'dax',
              filename: 'percentage_total.dax',
              code: `Pct of Grand Total = 
VAR CurrentCategorySales = [Total Sales]
VAR GrandTotalSales = CALCULATE([Total Sales], REMOVEFILTERS(DimProduct))
RETURN DIVIDE(CurrentCategorySales, GrandTotalSales)`,
            },
            keyTakeaways: {
              en: [
                'Prefer REMOVEFILTERS() over ALL() inside CALCULATE() for explicit filter clearing intention',
                'Remember ALL() is still required when you need a table expression (e.g., inside SUMX or FILTER)',
                'Use ALLEXCEPT() when preserving specific slicer dimensions',
              ],
              vi: [
                'Ưu tiên dùng REMOVEFILTERS() thay cho ALL() trong CALCULATE() để thể hiện rõ ý định xóa bộ lọc',
                'Ghi nhớ ALL() vẫn bắt buộc khi cần một biểu thức bảng (ví dụ: trong SUMX hoặc FILTER)',
                'Dùng ALLEXCEPT() khi muốn giữ lại bộ lọc của một số chiều cụ thể',
              ],
            },
          },
        ],
      },
      {
        id: 'pbi-pat-ch-3',
        number: 3,
        slug: 'ranking-and-comparison-patterns',
        title: {
          en: 'Ranking & Comparison Patterns',
          vi: 'Mẫu Công Thức Xếp Hạng & So Sánh',
        },
        summary: {
          en: 'RANKX, Top N filtering, percentage of total, contribution analysis, category comparisons.',
          vi: 'Xếp hạng với RANKX, lọc Top N, tính tỷ trọng đóng góp, so sánh giữa các danh mục.',
        },
        readTimeMinutes: 9,
        sections: [
          {
            id: 'pbi-pat-3-1',
            title: {
              en: '1. Dynamic Product Ranking with RANKX() & ALLSELECTED()',
              vi: '1. Mẫu Xếp Hạng Sản Phẩm Động Bằng RANKX() & ALLSELECTED()',
            },
            content: {
              en: 'Rank products dynamically according to active report filters using `RANKX(ALLSELECTED(DimProduct[ProductName]), [Total Sales], , DESC, Dense)`. Combine with HASONEVALUE to suppress artificial rank calculations on subtotal rows.',
              vi: 'Xếp hạng sản phẩm động theo các bộ lọc đang chọn bằng `RANKX(ALLSELECTED(DimProduct[ProductName]), [Total Sales], , DESC, Dense)`. Kết hợp HASONEVALUE để ẩn hàng tổng.',
            },
            codeBlock: {
              language: 'dax',
              filename: 'rankx.dax',
              code: `Product Rank = 
IF(
    HASONEVALUE(DimProduct[ProductName]),
    RANKX(
        ALLSELECTED(DimProduct[ProductName]),
        [Total Sales],
        ,
        DESC,
        Dense
    )
)`,
            },
            keyTakeaways: {
              en: [
                'Use ALLSELECTED() inside RANKX to respect user visual slicers',
                'Wrap inside IF(HASONEVALUE(...)) to prevent meaningless ranks on total rows',
              ],
              vi: [
                'Dùng ALLSELECTED() trong RANKX để tuân thủ bộ lọc slicer của người dùng',
                'Bọc trong IF(HASONEVALUE(...)) để tránh hiển thị hạng giả trên dòng Total',
              ],
            },
          },
        ],
      },
      {
        id: 'pbi-pat-ch-4',
        number: 4,
        slug: 'kpi-and-conditional-patterns',
        title: {
          en: 'KPI & Conditional Formatting Patterns',
          vi: 'Mẫu Công Thức KPI & Định Dạng Điều Kiện Động',
        },
        summary: {
          en: 'Dynamic KPI measures, variance calculations, target vs actual, conditional status flags, dynamic titles.',
          vi: 'Measure KPI động, tính chênh lệch variance, thực tế vs mục tiêu, cờ trạng thái điều kiện, tiêu đề động.',
        },
        readTimeMinutes: 9,
        sections: [
          {
            id: 'pbi-pat-4-1',
            title: {
              en: '1. Target Variance & Dynamic Status Icon Patterns',
              vi: '1. Mẫu Tính Chênh Lệch Mục Tiêu & Cờ Cảnh Báo Trạng Thái',
            },
            content: {
              en: 'Calculate variance = Actual - Target. Return conditional Unicode status indicators (e.g., "🟢", "🟡", "🔴") or hex color strings for dynamic visual conditional formatting.',
              vi: 'Tính chênh lệch = Thực tế - Mục tiêu. Trả về biểu tượng trạng thái Unicode (như "🟢", "🟡", "🔴") hoặc chuỗi mã màu hex để định dạng màu sắc biểu đồ động.',
            },
            codeBlock: {
              language: 'dax',
              filename: 'kpi_status.dax',
              code: `Sales Target Variance = [Total Sales] - [Sales Target]

KPI Status Flag = 
VAR PctAchievement = DIVIDE([Total Sales], [Sales Target])
RETURN 
SWITCH(
    TRUE(),
    PctAchievement >= 1.0, "🟢 Exceeded",
    PctAchievement >= 0.85, "🟡 On Track",
    "🔴 Off Track"
)`,
            },
            keyTakeaways: {
              en: [
                'Use SWITCH(TRUE(), ...) for clean readable conditional branching in DAX',
                'Return hex color codes to drive visual element formatting dynamically',
              ],
              vi: [
                'Dùng SWITCH(TRUE(), ...) để rẽ nhánh điều kiện rõ ràng trong DAX',
                'Trả về mã màu hex để điều khiển màu sắc của biểu đồ một cách linh hoạt',
              ],
            },
          },
        ],
      },
    ],
  },
];
