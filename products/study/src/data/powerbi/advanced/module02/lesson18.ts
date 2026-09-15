import { Lesson } from '../../../../types';

export const lesson18: Lesson = {
  id: 'pbi_lesson_18',
  moduleId: 'pbi_mod_6',
  levelId: 'advanced',
  courseId: 'powerbi',
  order: 18,
  topicId: 'pbi_service_governance',
  title: {
    en: 'Power BI Service, Deployment Pipelines & Enterprise Governance',
    vi: 'Dịch Vụ Power BI Service, Quy Trình Triển Khai (Pipelines) & Quản Trị Doanh Nghiệp'
  },
  summary: {
    en: 'Master enterprise deployment pipelines (Dev, Test, Prod), configure On-Premises Data Gateways, schedule refreshes, and distribute Power BI Apps.',
    vi: 'Làm chủ quy trình triển khai doanh nghiệp (Dev, Test, Prod), cấu hình On-Premises Gateway, lập lịch làm mới dữ liệu và phân phối Power BI Apps.'
  },
  estimatedMinutes: 16,
  learn: {
    introduction: {
      en: 'Building an outstanding Power BI report is only half the journey. Enterprise business intelligence requires robust deployment workflows, automated data refreshes, secure credential management via On-Premises Data Gateways, and governed distribution through Power BI Apps. Modern enterprise teams use Deployment Pipelines (Development -> Test -> Production) to deliver zero-downtime analytics updates.',
      vi: 'Xây dựng một báo cáo Power BI hoàn hảo mới chỉ là một nửa chặng đường. Hệ thống BI cấp doanh nghiệp đòi hỏi quy trình triển khai chặt chẽ, tự động làm mới dữ liệu, bảo mật chứng thực qua On-Premises Data Gateway và đóng gói phân phối chuẩn hóa qua Power BI Apps. Các đội ngũ doanh nghiệp hiện đại sử dụng Deployment Pipelines (Dev -> Test -> Prod) để phát hành báo cáo liên tục mà không gián đoạn người dùng.'
    },
    conceptExplanation: {
      en: 'Enterprise Power BI Cloud Architecture:\n1. Workspaces vs Power BI Apps:\n   - Workspaces: Collaborative staging environments where developers build and test datasets/reports.\n   - Power BI Apps: The official, read-only, branded packaging distributed to thousands of business end-users.\n2. 3-Stage Deployment Pipelines:\n   - Development Workspace: Active authoring, data modeling, and experimental features.\n   - Test Workspace: User Acceptance Testing (UAT) and data validation against staging databases.\n   - Production Workspace: Certified, SLA-backed golden datasets and executive dashboards.\n3. On-Premises Data Gateway:\n   - Secure agent bridging on-premises SQL/Oracle/SAP databases and the Azure Power BI cloud.\n   - Standard Mode (Enterprise) supports multiple users and scheduled refresh; Personal Mode is single-user.\n4. Scheduled Refresh & Incremental Refresh:\n   - Pro license: Up to 8 refreshes/day; Premium/Fabric: Up to 48 refreshes/day.\n   - Incremental Refresh: Only reloads the last X days of new/modified data while archiving historical partitions.',
      vi: 'Kiến trúc Power BI Doanh nghiệp trên Đám mây:\n1. Workspace so với Power BI Apps:\n   - Workspaces: Môi trường cộng tác kỹ thuật nơi các developer xây dựng và thử nghiệm mô hình/báo cáo.\n   - Power BI Apps: Bản đóng gói chính thức, chỉ đọc (read-only), giao diện chuyên nghiệp để phân phối rộng rãi cho hàng ngàn người dùng cuối.\n2. Quy trình triển khai 3 giai đoạn (Deployment Pipelines):\n   - Development Workspace: Phát triển tính năng mới, thử nghiệm mô hình.\n   - Test Workspace: Kiểm thử chấp nhận người dùng (UAT) và đối soát dữ liệu với môi trường Staging.\n   - Production Workspace: Báo cáo và Semantic Model chuẩn hóa chính thức phục vụ ban lãnh đạo.\n3. On-Premises Data Gateway:\n   - Cầu nối bảo mật giữa cơ sở dữ liệu nội bộ (SQL/Oracle/SAP On-Premises) với đám mây Power BI Azure.\n   - Standard Mode (Enterprise) hỗ trợ nhiều người dùng và lập lịch tự động; Personal Mode chỉ dùng cho 1 người.\n4. Lập lịch làm mới (Scheduled Refresh) & Làm mới tăng dần (Incremental Refresh):\n   - Bản quyền Pro: Tối đa 8 lần/ngày; Premium/Fabric: Tối đa 48 lần/ngày.\n   - Incremental Refresh: Chỉ tải lại dữ liệu mới/sửa đổi của X ngày gần nhất và lưu trữ đóng băng dữ liệu lịch sử.'
    },
    syntax: '// Incremental Refresh M Parameters in Power Query:\nRangeStart = #datetime(2024, 1, 1, 0, 0, 0) meta [IsParameterQuery=true, Type="DateTime", IsParameterQueryRequired=true]\nRangeEnd   = #datetime(2024, 5, 1, 0, 0, 0) meta [IsParameterQuery=true, Type="DateTime", IsParameterQueryRequired=true]\n\n// Applying range filter in Fact table step:\n= Table.SelectRows(Source, each [TransactionDate] >= RangeStart and [TransactionDate] < RangeEnd)',
    examples: [
      {
        title: {
          en: 'Configuring Enterprise Incremental Refresh Policy',
          vi: 'Cấu Hình Chính Sách Làm Mới Tăng Dần (Incremental Refresh)'
        },
        code: `// In Power BI Desktop:
// 1. Declare RangeStart and RangeEnd (DateTime parameters)
// 2. Filter Fact_Sales[OrderDateTime] between RangeStart and RangeEnd
// 3. Right-click Fact_Sales -> "Incremental Refresh"
// 4. Archive data starting: 5 Years
// 5. Only refresh data starting: 7 Days
// Result: Instead of reloading 50M rows daily, Power BI only refreshes ~10,000 rows.`,
        language: 'dax',
        explanation: {
          en: 'Incremental refresh partitions historical partitions in VertiPaq, reducing refresh times from hours to seconds.',
          vi: 'Làm mới tăng dần phân vùng dữ liệu lịch sử trong VertiPaq, rút ngắn thời gian làm mới từ hàng giờ xuống vài giây.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Sharing direct Workspace access to all business consumers instead of publishing a Power BI App.',
          vi: 'Thêm người dùng xem báo cáo trực tiếp vào Workspace thay vì xuất bản Power BI App.'
        },
        correction: {
          en: 'Workspaces are development environments. Always distribute finalized content via a Power BI App to prevent accidental edits.',
          vi: 'Workspace là môi trường làm việc kỹ thuật. Luôn đóng gói và phân phối qua Power BI App để bảo vệ báo cáo khỏi bị chỉnh sửa nhầm.'
        }
      },
      {
        mistake: {
          en: 'Attempting to configure Incremental Refresh without using the exact case-sensitive parameter names "RangeStart" and "RangeEnd".',
          vi: 'Cố gắng cấu hình Incremental Refresh nhưng đặt sai tên tham số phân biệt hoa thường "RangeStart" và "RangeEnd".'
        },
        correction: {
          en: 'The Power BI service strictly requires exact names: RangeStart and RangeEnd with DateTime type to manage partitions.',
          vi: 'Power BI Service bắt buộc tên tham số phải chính xác 100%: RangeStart và RangeEnd có kiểu DateTime để quản lý các phân vùng.'
        }
      }
    ],
    tips: [
      {
        en: 'Use "Deployment Rules" inside Deployment Pipelines to automatically repoint database connection strings from Development SQL to Production SQL upon promotion.',
        vi: 'Sử dụng "Deployment Rules" trong Deployment Pipelines để tự động chuyển hướng chuỗi kết nối từ cơ sở dữ liệu Dev sang Prod khi thăng cấp báo cáo.'
      },
      {
        en: 'Decouple your architecture into a Golden Dataset (.pbix containing only Power Query + DAX model) and thin Report files (.pbix connected via live connection).',
        vi: 'Tách bạch kiến trúc thành Golden Dataset (tệp .pbix chỉ chứa ETL + mô hình DAX) và các tệp Báo cáo mỏng (kết nối Live Connection).'
      }
    ],
    practiceStarterCode: `// Incremental Refresh DateTime parameters pattern
RangeStart = #datetime(2024, 1, 1, 0, 0, 0)
RangeEnd = #datetime(2024, 12, 31, 23, 59, 59)`
  },
  exercisePool: [
    {
      id: 'pbi_ex_18_1',
      type: 'predict_output',
      title: {
        en: 'Identify Role of Power BI App',
        vi: 'Xác Định Vai Trò Của Power BI App'
      },
      instruction: {
        en: 'What is the recommended method to distribute completed reports to hundreds of business viewers across an enterprise?',
        vi: 'Phương thức chuẩn được khuyến nghị để phân phối các báo cáo hoàn thiện tới hàng trăm người xem trong doanh nghiệp là gì?'
      },
      starterCode: '// Choose distribution method',
      solutionCode: 'Publish and distribute a packaged Power BI App with customized audience navigation',
      options: [
        'Publish and distribute a packaged Power BI App with customized audience navigation',
        'Email the raw 2GB .pbix file as an attachment to everyone',
        'Add all 500 users as Workspace Admins',
        'Take screenshots and paste them into PowerPoint daily'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'Power BI Apps provide a secure, governed, read-only distribution channel tailored for business consumers.',
        vi: 'Power BI Apps mang lại kênh phân phối an toàn, chuẩn hóa, chỉ đọc và có cấu trúc điều hướng chuyên nghiệp cho người dùng doanh nghiệp.'
      }
    },
    {
      id: 'pbi_ex_18_2',
      type: 'complete_code',
      title: {
        en: 'Identify Incremental Refresh Parameter Names',
        vi: 'Xác Định Tên Tham Số Làm Mới Tăng Dần'
      },
      instruction: {
        en: 'What exact parameter name pairs are mandatory for Power BI Incremental Refresh?',
        vi: 'Cặp tên tham số chính xác nào là bắt buộc để Power BI kích hoạt Incremental Refresh?'
      },
      starterCode: 'Parameters: RangeStart and ___',
      solutionCode: 'Parameters: RangeStart and RangeEnd',
      hint: {
        en: 'RangeEnd',
        vi: 'RangeEnd'
      },
      explanation: {
        en: 'RangeStart and RangeEnd are the case-sensitive DateTime parameters required by the Power BI service.',
        vi: 'RangeStart và RangeEnd là hai tham số kiểu DateTime phân biệt hoa thường bắt buộc của Power BI Service.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_18',
    title: {
      en: 'Architect Enterprise End-to-End Governance Lifecycle',
      vi: 'Thiết Kế Vòng Đời Quản Trị & Triển Khai Toàn Diện Doanh Nghiệp'
    },
    description: {
      en: 'Define the four pillars of enterprise BI deployment: Decoupled Golden Dataset architecture, 3-stage Deployment Pipeline, Gateway Security, and App Distribution.',
      vi: 'Xác lập 4 trụ cột triển khai BI doanh nghiệp: Kiến trúc Golden Dataset tách rời, Pipeline 3 giai đoạn, Bảo mật Gateway và Phân phối qua App.'
    },
    requirements: [
      { en: '1. Golden Dataset: Single source of truth containing Power Query ETL, Star Schema, and DAX measures', vi: '1. Golden Dataset: Nguồn chân lý duy nhất chứa Power Query ETL, Star Schema và DAX measures' },
      { en: '2. Thin Reports: Live connection to Golden Dataset with visual design only', vi: '2. Thin Reports: Kết nối Live Connection tới Golden Dataset chỉ phục vụ thiết kế giao diện' },
      { en: '3. Deployment Pipeline: Dev -> Test (UAT) -> Production with automated parameter rules', vi: '3. Deployment Pipeline: Dev -> Test (UAT) -> Production kèm quy tắc tham số tự động' },
      { en: '4. Power BI App: Packaged, role-governed audience distribution', vi: '4. Power BI App: Đóng gói phân phối phân quyền theo đối tượng người xem' }
    ],
    starterCode: `// Enterprise BI Architecture Blueprint:
// Pillar 1: Golden Semantic Model (Hub)
// Pillar 2: Thin Reports (Spokes) via Live Connection
// Pillar 3: Deployment Pipelines (Dev -> Test -> Prod)
// Pillar 4: Enterprise On-Premises Gateway + Power BI App Package`,
    solutionCode: `// Enterprise BI Architecture Blueprint:
// Pillar 1: Golden Semantic Model (Hub)
// Pillar 2: Thin Reports (Spokes) via Live Connection
// Pillar 3: Deployment Pipelines (Dev -> Test -> Prod)
// Pillar 4: Enterprise On-Premises Gateway + Power BI App Package`,
    hints: [
      {
        en: 'Separating semantic modeling from report visualization allows multiple teams to build reports simultaneously without dataset lockouts.',
        vi: 'Tách biệt mô hình dữ liệu khỏi giao diện báo cáo cho phép nhiều đội ngũ cùng phát triển mà không bị xung đột khóa tệp.'
      }
    ],
    solutionExplanation: {
      en: 'This decoupled architecture represents the pinnacle of modern Microsoft Fabric & Power BI enterprise best practices.',
      vi: 'Kiến trúc tách rời này đại diện cho chuẩn mực cao nhất của hệ sinh thái Microsoft Fabric & Power BI doanh nghiệp hiện đại.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_18_1',
      type: 'single_choice',
      question: {
        en: 'What are the 3 standard stages in a Power BI Deployment Pipeline?',
        vi: '3 giai đoạn chuẩn trong một quy trình Power BI Deployment Pipeline là gì?'
      },
      options: [
        { en: 'Development, Test, and Production', vi: 'Development (Phát triển), Test (Kiểm thử), và Production (Sản xuất)' },
        { en: 'Bronze, Silver, and Gold', vi: 'Bronze, Silver, và Gold' },
        { en: 'Draft, Review, and Archive', vi: 'Draft, Review, và Archive' },
        { en: 'Local, USB, and Cloud', vi: 'Local, USB, và Cloud' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Power BI Deployment Pipelines guide content through Development -> Test -> Production stages with automated diff comparison.',
        vi: 'Power BI Deployment Pipelines quản lý vòng đời báo cáo qua 3 giai đoạn Dev -> Test -> Prod kèm tính năng so sánh sai khác tự động.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_18_2',
      type: 'single_choice',
      question: {
        en: 'What software must be installed on a company server to allow Power BI Service in the cloud to refresh data from an internal on-premises SQL Server?',
        vi: 'Phần mềm nào bắt buộc phải cài đặt trên máy chủ công ty để Power BI Service trên đám mây có thể tự động làm mới dữ liệu từ máy chủ SQL Server nội bộ?'
      },
      options: [
        { en: 'On-Premises Data Gateway (Standard / Enterprise Mode)', vi: 'On-Premises Data Gateway (Bản Standard / Enterprise Mode)' },
        { en: 'Google Chrome Extension', vi: 'Tiện ích mở rộng Google Chrome' },
        { en: 'VLC Media Player', vi: 'Trình phát VLC Media Player' },
        { en: 'Microsoft Paint', vi: 'Microsoft Paint' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The On-Premises Data Gateway acts as a secure reverse-proxy bridge transferring data between local data sources and the cloud.',
        vi: 'On-Premises Data Gateway đóng vai trò là cầu nối proxy an toàn truyền dữ liệu giữa các nguồn nội bộ và đám mây.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_18_3',
      type: 'single_choice',
      question: {
        en: 'What is the maximum number of daily scheduled refreshes allowed for a semantic model hosted on a Power BI Pro workspace?',
        vi: 'Số lần làm mới dữ liệu tự động (Scheduled Refresh) tối đa mỗi ngày cho một Semantic Model trên Workspace bản quyền Power BI Pro là bao nhiêu?'
      },
      options: [
        { en: '8 times per day', vi: '8 lần mỗi ngày' },
        { en: '48 times per day', vi: '48 lần mỗi ngày' },
        { en: '1 time per day', vi: '1 lần mỗi ngày' },
        { en: 'Unlimited every second', vi: 'Không giới hạn mỗi giây' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Power BI Pro supports up to 8 scheduled daily refreshes. Premium Capacity / Fabric supports up to 48 scheduled refreshes per day.',
        vi: 'Bản quyền Power BI Pro hỗ trợ tối đa 8 lần làm mới mỗi ngày. Bản quyền Premium/Fabric hỗ trợ tối đa 48 lần mỗi ngày.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_18_4',
      type: 'true_false',
      question: {
        en: 'Incremental Refresh can only be configured if your Power Query table contains the exact parameters named "RangeStart" and "RangeEnd" with DateTime type.',
        vi: 'Incremental Refresh chỉ có thể được kích hoạt nếu bảng Power Query chứa chính xác 2 tham số mang tên "RangeStart" và "RangeEnd" kiểu DateTime.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. The Power BI engine relies specifically on RangeStart and RangeEnd to manage historical data partitioning.',
        vi: 'Đúng. Bộ máy Power BI dựa trực tiếp vào RangeStart và RangeEnd để quản lý phân vùng dữ liệu lịch sử.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_18_5',
      type: 'single_choice',
      question: {
        en: 'What is a "Thin Report" in Power BI architectural design?',
        vi: '"Thin Report" (Báo cáo mỏng) trong thiết kế kiến trúc Power BI là gì?'
      },
      options: [
        {
          en: 'A report file (.pbix) that contains only visuals and connect via Live Connection to an existing centralized Golden Dataset in the Service',
          vi: 'Một tệp báo cáo (.pbix) chỉ chứa giao diện biểu đồ và kết nối Live Connection tới một Golden Dataset tập trung trên Service'
        },
        {
          en: 'A report with only 1 page and 1 chart',
          vi: 'Một báo cáo chỉ có 1 trang và 1 biểu đồ'
        },
        {
          en: 'A report printed on thin paper',
          vi: 'Một báo cáo in trên giấy mỏng'
        },
        {
          en: 'A report designed exclusively for smart watches',
          vi: 'Một báo cáo chỉ dành riêng cho đồng hồ thông minh'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Thin reports decouple visualization from data modeling, allowing multiple report authors to build dashboards against a single governed dataset.',
        vi: 'Thin report tách biệt thiết kế biểu đồ khỏi mô hình dữ liệu, cho phép nhiều người cùng thiết kế báo cáo trên một nguồn dữ liệu duy nhất.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_18_6',
      type: 'single_choice',
      question: {
        en: 'What feature allows creating multiple targeted navigation views for different departments (e.g. Sales view vs Finance view) within a single Power BI App?',
        vi: 'Tính năng nào cho phép tạo nhiều chế độ xem điều hướng riêng biệt cho từng phòng ban (như chế độ xem Sales vs Finance) bên trong một Power BI App duy nhất?'
      },
      options: [
        { en: 'Multiple App Audiences', vi: 'Multiple App Audiences (Nhiều phân khúc khán giả)' },
        { en: 'Screen Splitter', vi: 'Screen Splitter' },
        { en: 'Color Themes', vi: 'Color Themes' },
        { en: 'Zoom Sliders', vi: 'Zoom Sliders' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Multiple Audiences in Power BI Apps allow defining distinct sub-navigation views and assigning them to specific Azure AD user groups.',
        vi: 'Tính năng Multiple Audiences trong Power BI App cho phép cấu hình các luồng điều hướng khác nhau cho từng nhóm người dùng Azure AD.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_18_7',
      type: 'true_false',
      question: {
        en: 'DirectQuery mode sends raw DAX-translated SQL queries directly to the source database at report view time, without importing data into memory.',
        vi: 'Chế độ DirectQuery gửi các câu lệnh SQL dịch từ DAX trực tiếp về cơ sở dữ liệu gốc tại thời điểm người dùng xem báo cáo mà không nhập dữ liệu vào RAM.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. DirectQuery does not import data into memory, querying the underlying database dynamically on every visual interaction.',
        vi: 'Đúng. DirectQuery không nạp dữ liệu vào RAM mà truy vấn trực tiếp cơ sở dữ liệu gốc mỗi khi người dùng tương tác.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_18_8',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are distinct Workspace permission roles in the Power BI Service? (Select all that apply)',
        vi: 'Những vai trò phân quyền Workspace nào sau đây tồn tại trên Power BI Service? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Admin', vi: 'Admin' },
        { en: 'Member', vi: 'Member' },
        { en: 'Contributor', vi: 'Contributor' },
        { en: 'Viewer', vi: 'Viewer' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'The 4 standard Power BI workspace roles are Admin, Member, Contributor, and Viewer.',
        vi: '4 vai trò Workspace chuẩn trong Power BI là Admin, Member, Contributor và Viewer.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_18_9',
      type: 'single_choice',
      question: {
        en: 'What feature in Deployment Pipelines allows automatically swapping database connection parameters (e.g. Server = "sql-dev" to Server = "sql-prod") during promotion?',
        vi: 'Tính năng nào trong Deployment Pipelines cho phép tự động tráo đổi tham số kết nối cơ sở dữ liệu (như Server = "sql-dev" thành Server = "sql-prod") khi thăng cấp?'
      },
      options: [
        { en: 'Deployment Rules (Parameter Rules & Data Source Rules)', vi: 'Deployment Rules (Quy tắc tham số & Quy tắc nguồn dữ liệu)' },
        { en: 'Password Reset', vi: 'Password Reset' },
        { en: 'Excel Switcher', vi: 'Excel Switcher' },
        { en: 'DAX Replacer', vi: 'DAX Replacer' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Deployment Rules automatically change parameters and data source connections when moving items between Dev, Test, and Production.',
        vi: 'Deployment Rules tự động đổi tham số và chuỗi kết nối nguồn khi chuyển báo cáo giữa Dev, Test và Production.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_18_10',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of Semantic Model Certification in Power BI enterprise governance?',
        vi: 'Mục đích của việc Chứng nhận Semantic Model (Certification) trong quản trị Power BI doanh nghiệp là gì?'
      },
      options: [
        {
          en: 'It flags a dataset as an official, vetted, authoritative single source of truth for the entire organization',
          vi: 'Đánh dấu dataset là nguồn chân lý chính thức, đã được kiểm duyệt và đáng tin cậy cho toàn bộ tổ chức'
        },
        {
          en: 'It converts the report into a PDF certificate with a gold seal',
          vi: 'Chuyển báo cáo thành chứng chỉ PDF có tem vàng'
        },
        {
          en: 'It gives the author a bonus salary',
          vi: 'Thưởng thêm lương cho tác giả'
        },
        {
          en: 'It locks the dataset so it can never be refreshed again',
          vi: 'Khóa dataset để không bao giờ làm mới lại được'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Endorsement levels (Promoted and Certified) signal to report builders that a semantic model is an enterprise-approved data source.',
        vi: 'Các cấp độ xác thực (Promoted và Certified) thông báo cho người làm báo cáo biết dataset này là nguồn dữ liệu chuẩn được công ty phê duyệt.'
      },
      topicId: 'pbi_service_governance',
      difficulty: 'medium'
    }
  ]
};

export default lesson18;
