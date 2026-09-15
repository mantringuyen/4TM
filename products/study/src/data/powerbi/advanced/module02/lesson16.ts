import { Lesson } from '../../../../types';

export const lesson16: Lesson = {
  id: 'pbi_lesson_16',
  moduleId: 'pbi_mod_6',
  levelId: 'advanced',
  courseId: 'powerbi',
  order: 16,
  topicId: 'pbi_rls_security',
  title: {
    en: 'Row-Level Security (RLS): Static vs Dynamic RLS & USERPRINCIPALNAME',
    vi: 'Bảo Mật Cấp Dòng (Row-Level Security): RLS Tĩnh vs Động & USERPRINCIPALNAME'
  },
  summary: {
    en: 'Implement Static and Dynamic Row-Level Security (RLS) using USERPRINCIPALNAME, security mapping tables, and test with "View as Roles".',
    vi: 'Triển khai bảo mật cấp dòng tĩnh và động bằng hàm USERPRINCIPALNAME, bảng phân quyền người dùng và kiểm thử bằng tính năng "View as Roles".'
  },
  estimatedMinutes: 16,
  learn: {
    introduction: {
      en: 'Row-Level Security (RLS) restricts data access at the row level for specified report consumers. Instead of building separate duplicate reports for each department or regional manager, you build a single unified report and define DAX filter expressions within security roles. When a manager opens the dashboard, Power BI automatically filters the data so they only see the records they are authorized to view.',
      vi: 'Bảo mật cấp dòng (Row-Level Security - RLS) giới hạn quyền truy cập dữ liệu ở mức từng dòng cho từng nhóm người xem. Thay vì phải tạo hàng chục báo cáo trùng lặp cho từng phòng ban hay giám đốc chi nhánh, bạn chỉ cần xây dựng một báo cáo duy nhất và định nghĩa các điều kiện lọc DAX bên trong các vai trò bảo mật (Security Roles). Khi người dùng mở báo cáo, Power BI tự động lọc dữ liệu để họ chỉ nhìn thấy các dòng mà họ được phép xem.'
    },
    conceptExplanation: {
      en: 'Static RLS vs Dynamic RLS Architecture:\n1. Static RLS:\n   - Explicit hardcoded rules created for fixed groups (e.g. Role "US_East": Dim_Geography[Region] = "US East").\n   - Requires manual role assignment in Power BI Service for each region.\n2. Dynamic RLS:\n   - A single role utilizing USERPRINCIPALNAME() or USERNAME() combined with a Security Access Mapping Table.\n   - Filter DAX predicate on Security Table: Dim_UserAccess[Email] = USERPRINCIPALNAME()\n   - Filter propagates through relationships to Fact_Sales automatically.\n3. Testing RLS in Desktop:\n   - Modeling tab -> "View as" -> Select Role and enter test email.',
      vi: 'Kiến trúc RLS Tĩnh so với RLS Động:\n1. RLS Tĩnh (Static RLS):\n   - Các quy tắc cứng cố định cho từng nhóm (ví dụ Role "MienBac": Dim_Geography[Region] = "Miền Bắc").\n   - Phải gán quyền thủ công cho từng người dùng vào vai trò tương ứng trên Power BI Service.\n2. RLS Động (Dynamic RLS):\n   - Chỉ cần 1 vai trò duy nhất kết hợp hàm USERPRINCIPALNAME() hoặc USERNAME() với một Bảng phân quyền (Security Table).\n   - Điều kiện DAX trên Bảng phân quyền: Dim_UserAccess[Email] = USERPRINCIPALNAME()\n   - Bộ lọc tự động lan truyền qua các mối quan hệ sang bảng Fact_Sales.\n3. Kiểm thử RLS trên Power BI Desktop:\n   - Thẻ Modeling -> "View as" -> Chọn Role và nhập email cần test thử.'
    },
    syntax: '// 1. Static RLS Filter Expression on Dim_Geography:\n[Region] = "Europe"\n\n// 2. Dynamic RLS Filter Expression on Dim_SecurityAccess:\nDim_SecurityAccess[UserEmail] = USERPRINCIPALNAME()\n\n// 3. Dynamic RLS handling Organizational Hierarchy with PATHCONTAINS:\nPATHCONTAINS(Dim_Employees[OrgPath], LOOKUPVALUE(Dim_Employees[EmployeeID], Dim_Employees[Email], USERPRINCIPALNAME()))',
    examples: [
      {
        title: {
          en: 'Dynamic Security Mapping Table Pattern',
          vi: 'Mô Hình Bảng Phân Quyền Động Bằng USERPRINCIPALNAME'
        },
        code: `// DAX filter applied in "Manage Roles" on Dim_UserTerritory table:
Dim_UserTerritory[ManagerEmail] = USERPRINCIPALNAME()

// Dim_UserTerritory filters Dim_Territory (1:N), which in turn filters Fact_Sales.
// When john.doe@company.com logs in, Power BI automatically restricts the model to his territories.`,
        language: 'dax',
        explanation: {
          en: 'USERPRINCIPALNAME returns the user\'s corporate Azure AD email login, dynamically applying security filters.',
          vi: 'USERPRINCIPALNAME trả về email đăng nhập Azure AD của người dùng, tự động lọc dữ liệu tương ứng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Creating 50 separate static roles for 50 sales territories instead of one dynamic RLS model.',
          vi: 'Tạo 50 vai trò tĩnh riêng biệt cho 50 khu vực kinh doanh thay vì áp dụng một mô hình RLS động duy nhất.'
        },
        correction: {
          en: 'Static roles become unmanageable at scale. Create a single dynamic role linked to an employee-territory mapping table.',
          vi: 'Các vai trò tĩnh sẽ trở thành cơn ác mộng bảo trì khi quy mô lớn. Hãy tạo một vai trò động duy nhất kết nối với bảng phân quyền người dùng - khu vực.'
        }
      },
      {
        mistake: {
          en: 'Applying RLS directly on the huge Fact_Sales table instead of the smaller Dimension table.',
          vi: 'Áp dụng điều kiện lọc RLS trực tiếp trên bảng Fact_Sales hàng triệu dòng thay vì trên bảng Dimension.'
        },
        correction: {
          en: 'Apply RLS filters on Dimension tables (e.g. Dim_Territory or Dim_Security) and let star schema relationships filter the fact table efficiently.',
          vi: 'Áp dụng bộ lọc RLS trên các bảng Dimension (như Dim_Territory hoặc Dim_Security) và để mối quan hệ mô hình Star Schema lọc bảng Fact một cách tối ưu.'
        }
      }
    ],
    tips: [
      {
        en: 'Workspace Admins, Members, and Contributors bypass RLS; only users with "Viewer" role permissions have RLS enforced.',
        vi: 'Các tài khoản Admin, Member và Contributor trong Workspace sẽ bỏ qua RLS; RLS chỉ có hiệu lực với người dùng có vai trò "Viewer".'
      },
      {
        en: 'Use the "Apply security filter in both directions" checkbox on relationships with extreme caution, as it can cause performance degradation.',
        vi: 'Hết sức cẩn trọng khi tích chọn "Apply security filter in both directions" trên mối quan hệ vì có thể làm suy giảm hiệu năng truy vấn.'
      }
    ],
    practiceStarterCode: `// DAX Dynamic RLS Filter rule
Dim_UserSecurity[UserEmail] = USERPRINCIPALNAME()`
  },
  exercisePool: [
    {
      id: 'pbi_ex_16_1',
      type: 'predict_output',
      title: {
        en: 'Identify USERPRINCIPALNAME Return Value',
        vi: 'Xác Định Giá Trị Trả Về Của USERPRINCIPALNAME'
      },
      instruction: {
        en: 'What does USERPRINCIPALNAME() return when a cloud user accesses a report in Power BI Service?',
        vi: 'Hàm USERPRINCIPALNAME() trả về giá trị gì khi người dùng truy cập báo cáo trên Power BI Service?'
      },
      starterCode: '// Choose returned user identifier',
      solutionCode: 'The user corporate Azure Active Directory email address (e.g. alex@enterprise.com)',
      options: [
        'The user corporate Azure Active Directory email address (e.g. alex@enterprise.com)',
        'The user IP address',
        'The computer MAC address',
        'A random GUID'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'USERPRINCIPALNAME returns the corporate UPN/email of the authenticated user in Power BI Service.',
        vi: 'USERPRINCIPALNAME trả về địa chỉ email/UPN của người dùng đã được xác thực trong Power BI Service.'
      }
    },
    {
      id: 'pbi_ex_16_2',
      type: 'complete_code',
      title: {
        en: 'Write Dynamic RLS Filter Rule',
        vi: 'Viết Quy Tắc Lọc RLS Động'
      },
      instruction: {
        en: 'Complete the DAX filter expression to match the UserEmail column against the authenticated user.',
        vi: 'Hoàn thiện biểu thức lọc DAX để so khớp cột UserEmail với người dùng đã xác thực.'
      },
      starterCode: 'Dim_UserAccess[Email] = ___()',
      solutionCode: 'Dim_UserAccess[Email] = USERPRINCIPALNAME()',
      hint: {
        en: 'USERPRINCIPALNAME',
        vi: 'USERPRINCIPALNAME'
      },
      explanation: {
        en: 'Dim_UserAccess[Email] = USERPRINCIPALNAME() filters the security mapping table dynamically.',
        vi: 'Dim_UserAccess[Email] = USERPRINCIPALNAME() tự động lọc bảng phân quyền theo người dùng hiện tại.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_16',
    title: {
      en: 'Architect Enterprise Dynamic RLS with Hierarchy Support',
      vi: 'Thiết Kế Hệ Thống RLS Động Doanh Nghiệp Kèm Cấu Trúc Phân Cấp'
    },
    description: {
      en: 'Define the dynamic RLS architecture: Dynamic user filter rule with USERPRINCIPALNAME, and organizational hierarchy filter using PATHCONTAINS.',
      vi: 'Thiết kế kiến trúc RLS động: Quy tắc lọc theo email người dùng bằng USERPRINCIPALNAME và quy tắc phân cấp tổ chức bằng PATHCONTAINS.'
    },
    requirements: [
      { en: '1. Standard Dynamic RLS rule: Dim_UserAccess[UserEmail] = USERPRINCIPALNAME()', vi: '1. Quy tắc RLS động chuẩn: Dim_UserAccess[UserEmail] = USERPRINCIPALNAME()' },
      { en: '2. Hierarchy RLS rule: PATHCONTAINS(Dim_Employees[OrgPath], LOOKUPVALUE(Dim_Employees[EmployeeID], Dim_Employees[Email], USERPRINCIPALNAME()))', vi: '2. Quy tắc RLS phân cấp: PATHCONTAINS(Dim_Employees[OrgPath], LOOKUPVALUE(Dim_Employees[EmployeeID], Dim_Employees[Email], USERPRINCIPALNAME()))' }
    ],
    starterCode: `// Rule 1: Dynamic User Access Filter
Dim_UserAccess[UserEmail] = USERPRINCIPALNAME()

// Rule 2: Dynamic Manager Hierarchy Filter
PATHCONTAINS(Dim_Employees[OrgPath], LOOKUPVALUE(Dim_Employees[EmployeeID], Dim_Employees[Email], USERPRINCIPALNAME()))`,
    solutionCode: `// Rule 1: Dynamic User Access Filter
Dim_UserAccess[UserEmail] = USERPRINCIPALNAME()

// Rule 2: Dynamic Manager Hierarchy Filter
PATHCONTAINS(Dim_Employees[OrgPath], LOOKUPVALUE(Dim_Employees[EmployeeID], Dim_Employees[Email], USERPRINCIPALNAME()))`,
    hints: [
      {
        en: 'PATHCONTAINS allows managers to view not only their direct records, but all records belonging to their subordinate reporting tree.',
        vi: 'PATHCONTAINS cho phép cấp quản lý không chỉ xem dữ liệu của mình mà xem được toàn bộ dữ liệu của các cấp dưới trực thuộc.'
      }
    ],
    solutionExplanation: {
      en: 'Dynamic RLS with organizational hierarchies provides scalable, zero-maintenance data governance across thousands of corporate users.',
      vi: 'RLS động kết hợp cấu trúc phân cấp mang lại khả năng quản trị dữ liệu quy mô lớn, không tốn công bảo trì cho hàng ngàn người dùng.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_16_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary benefit of Row-Level Security (RLS) in Power BI?',
        vi: 'Lợi ích lớn nhất của việc triển khai Row-Level Security (RLS) trong Power BI là gì?'
      },
      options: [
        {
          en: 'It secures data at the row level so different users viewing the same report only see the specific rows they are authorized to access',
          vi: 'Bảo mật dữ liệu ở cấp từng dòng để những người dùng khác nhau khi cùng xem một báo cáo chỉ thấy đúng các dòng họ được phân quyền'
        },
        {
          en: 'It encrypts hard drives on local laptops',
          vi: 'Nó mã hóa ổ cứng máy tính cá nhân'
        },
        {
          en: 'It makes reports load 100x faster by deleting images',
          vi: 'Nó tăng tốc báo cáo gấp 100 lần bằng cách xóa ảnh'
        },
        {
          en: 'It replaces all SQL databases with Excel',
          vi: 'Nó thay thế toàn bộ cơ sở dữ liệu SQL bằng Excel'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RLS enables single-report architectures where data visibility is controlled by user identity and role filters.',
        vi: 'RLS cho phép xây dựng một báo cáo duy nhất mà vẫn kiểm soát được phạm vi dữ liệu theo danh tính và vai trò của từng người dùng.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_16_2',
      type: 'single_choice',
      question: {
        en: 'What does the DAX function USERPRINCIPALNAME() return when executed in Power BI Service?',
        vi: 'Hàm DAX USERPRINCIPALNAME() trả về giá trị gì khi thực thi trên Power BI Service?'
      },
      options: [
        {
          en: 'The user login username/email in the format of username@domain.com',
          vi: 'Email đăng nhập của người dùng dưới dạng username@domain.com'
        },
        {
          en: 'The computer hardware serial number',
          vi: 'Số serial phần cứng máy tính'
        },
        {
          en: 'The name of the Power BI workspace',
          vi: 'Tên của Workspace Power BI'
        },
        {
          en: 'A random 4-digit PIN code',
          vi: 'Mã PIN ngẫu nhiên gồm 4 chữ số'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'USERPRINCIPALNAME() returns the user principal name (Azure AD email) of the authenticated user.',
        vi: 'USERPRINCIPALNAME() trả về địa chỉ email Azure AD của người dùng đã đăng nhập và xác thực.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_16_3',
      type: 'single_choice',
      question: {
        en: 'Which workspace permission level is subject to Row-Level Security (RLS) enforcement?',
        vi: 'Cấp độ phân quyền Workspace nào bắt buộc phải tuân thủ và bị kiểm soát bởi Row-Level Security (RLS)?'
      },
      options: [
        { en: 'Viewer role only (or users accessing via Power BI App / Shared Link)', vi: 'Chỉ vai trò Viewer (hoặc người dùng xem qua App / Link chia sẻ)' },
        { en: 'Admin role', vi: 'Vai trò Admin' },
        { en: 'Member role', vi: 'Vai trò Member' },
        { en: 'Contributor role', vi: 'Vai trò Contributor' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Workspace Admins, Members, and Contributors have edit permissions and bypass RLS. Only Viewers have RLS enforced.',
        vi: 'Admin, Member và Contributor có quyền chỉnh sửa nên được miễn trừ RLS. Chỉ người dùng ở vai trò Viewer mới bị áp dụng RLS.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_16_4',
      type: 'true_false',
      question: {
        en: 'You can test Row-Level Security roles directly inside Power BI Desktop using the "View as" feature in the Modeling tab.',
        vi: 'Bạn có thể kiểm thử các vai trò bảo mật RLS trực tiếp trong Power BI Desktop bằng tính năng "View as" trong thẻ Modeling.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. "View as" allows report authors to simulate roles and specific user email addresses safely in Desktop.',
        vi: 'Đúng. "View as" cho phép người thiết kế báo cáo giả lập các vai trò và email người dùng thực tế ngay trên Desktop.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_16_5',
      type: 'single_choice',
      question: {
        en: 'What is the main architectural advantage of Dynamic RLS over Static RLS?',
        vi: 'Ưu thế kiến trúc vượt trội của Dynamic RLS so với Static RLS là gì?'
      },
      options: [
        {
          en: 'Dynamic RLS uses a single security role driven by a mapping table and USERPRINCIPALNAME(), scaling to thousands of users without manual role management',
          vi: 'Dynamic RLS chỉ cần 1 vai trò duy nhất dựa trên bảng phân quyền và USERPRINCIPALNAME(), mở rộng cho hàng ngàn người dùng mà không cần cấu hình thủ công'
        },
        {
          en: 'Dynamic RLS makes charts look more colorful',
          vi: 'Dynamic RLS làm biểu đồ có nhiều màu sắc hơn'
        },
        {
          en: 'Dynamic RLS eliminates the need for DAX measures',
          vi: 'Dynamic RLS loại bỏ nhu cầu viết measure DAX'
        },
        {
          en: 'Static RLS is no longer supported by Microsoft',
          vi: 'Static RLS không còn được Microsoft hỗ trợ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Dynamic RLS scales effortlessly because user permissions are managed in data tables rather than individual role definitions in Power BI.',
        vi: 'Dynamic RLS mở rộng linh hoạt vì quyền người dùng được quản lý trong bảng dữ liệu thay vì phải tạo hàng loạt role thủ công trong Power BI.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_16_6',
      type: 'predict_output',
      question: {
        en: 'If a user with email "sarah@company.com" is NOT present in the Dim_UserSecurity mapping table and Dynamic RLS is active, what will Sarah see when opening the report?',
        vi: 'Nếu người dùng có email "sarah@company.com" KHÔNG tồn tại trong bảng phân quyền Dim_UserSecurity khi RLS Động đang bật, Sarah sẽ thấy gì khi mở báo cáo?'
      },
      options: [
        {
          en: 'Empty/blank visuals with zero data rows (strict secure default)',
          vi: 'Các biểu đồ trống rỗng hoàn toàn không có dữ liệu nào (mặc định bảo mật nghiêm ngặt)'
        },
        {
          en: 'All company data without restrictions',
          vi: 'Toàn bộ dữ liệu công ty không bị giới hạn'
        },
        {
          en: 'A blue screen crash',
          vi: 'Màn hình xanh lỗi'
        },
        {
          en: 'Data of the CEO',
          vi: 'Dữ liệu của Tổng Giám Đốc'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'When a user has no matching rows in the security mapping table, the filter yields an empty table, protecting sensitive data by displaying blank visuals.',
        vi: 'Khi người dùng không có bản ghi nào khớp trong bảng phân quyền, bộ lọc sẽ trả về bảng rỗng, bảo vệ an toàn dữ liệu.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_16_7',
      type: 'multiple_choice',
      question: {
        en: 'Which DAX functions are frequently used when building dynamic organizational hierarchy RLS? (Select all that apply)',
        vi: 'Những hàm DAX nào thường được sử dụng khi xây dựng RLS phân cấp tổ chức động? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'PATH()', vi: 'PATH()' },
        { en: 'PATHCONTAINS()', vi: 'PATHCONTAINS()' },
        { en: 'USERPRINCIPALNAME()', vi: 'USERPRINCIPALNAME()' },
        { en: 'LOOKUPVALUE()', vi: 'LOOKUPVALUE()' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'PATH creates employee hierarchies, PATHCONTAINS checks management lineage, and USERPRINCIPALNAME identifies the viewer.',
        vi: 'PATH tạo chuỗi phân cấp nhân viên, PATHCONTAINS kiểm tra cấp quản lý và USERPRINCIPALNAME xác định danh tính người xem.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_16_8',
      type: 'true_false',
      question: {
        en: 'RLS filters applied on a Dimension table automatically flow downstream across active 1-to-many relationships to filter the connected Fact tables.',
        vi: 'Bộ lọc RLS áp dụng trên bảng Dimension sẽ tự động truyền xuôi theo mối quan hệ 1-Nhiều đang hoạt động để lọc các bảng Fact liên quan.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Relational filter propagation naturally cascades RLS constraints from 1-side dimension tables to many-side fact tables.',
        vi: 'Đúng. Cơ chế truyền bộ lọc quan hệ tự động lan tỏa điều kiện RLS từ bảng dimension phía 1 sang bảng fact phía nhiều.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_16_9',
      type: 'single_choice',
      question: {
        en: 'Where do you map Azure AD Security Groups or individual user emails to Power BI RLS roles after publishing to the Power BI Service?',
        vi: 'Bạn gán nhóm bảo mật Azure AD hoặc email người dùng vào các vai trò RLS ở đâu sau khi xuất bản lên Power BI Service?'
      },
      options: [
        {
          en: 'Dataset / Semantic Model Settings -> "Security" tab',
          vi: 'Cài đặt Dataset / Semantic Model -> Thẻ "Security"'
        },
        {
          en: 'Windows Control Panel',
          vi: 'Control Panel của Windows'
        },
        {
          en: 'SQL Server Management Studio',
          vi: 'SQL Server Management Studio'
        },
        {
          en: 'Power BI Desktop Help menu',
          vi: 'Menu Help trong Power BI Desktop'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In Power BI Service, navigate to the Semantic Model options, choose "Security", and add users/groups to the defined roles.',
        vi: 'Trên Power BI Service, vào tùy chọn của Semantic Model, chọn mục "Security" và thêm người dùng/nhóm vào các vai trò đã tạo.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_16_10',
      type: 'single_choice',
      question: {
        en: 'What feature allows restricting data visibility at the column level (e.g. hiding Salary or Cost columns from certain users)?',
        vi: 'Tính năng nào cho phép giới hạn quyền xem dữ liệu ở cấp độ từng cột (như ẩn cột Lương hoặc Chi phí đối với một số người dùng)?'
      },
      options: [
        {
          en: 'Object-Level Security (OLS)',
          vi: 'Object-Level Security (OLS - Bảo mật cấp đối tượng)'
        },
        {
          en: 'Row-Level Security (RLS)',
          vi: 'Row-Level Security (RLS)'
        },
        {
          en: 'Column Hide Slicer',
          vi: 'Column Hide Slicer'
        },
        {
          en: 'Power Query Color Mode',
          vi: 'Power Query Color Mode'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Object-Level Security (OLS) secures entire tables or sensitive columns from unauthorized users and applications.',
        vi: 'Object-Level Security (OLS) bảo mật toàn bộ bảng hoặc các cột nhạy cảm khỏi người dùng không được phân quyền.'
      },
      topicId: 'pbi_rls_security',
      difficulty: 'medium'
    }
  ]
};

export default lesson16;
