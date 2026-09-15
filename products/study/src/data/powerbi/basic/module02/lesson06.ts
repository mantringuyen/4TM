import { Lesson } from '../../../../types';

export const lesson06: Lesson = {
  id: 'pbi_lesson_6',
  moduleId: 'pbi_mod_2',
  levelId: 'basic',
  courseId: 'powerbi',
  order: 6,
  topicId: 'interactive_reporting_features',
  title: {
    en: 'Interactive Reports: Slicers, Filters, Tooltips, Drill-Down & Hierarchies',
    vi: 'Báo Cáo Tương Tác: Slicers, Bộ Lọc, Tooltips, Drill-Down & Phân Cấp'
  },
  summary: {
    en: 'Empower end-users with interactive date/category slicers, report filter scopes, report page tooltips, and drill-down hierarchies.',
    vi: 'Trao quyền tương tác cho người dùng với slicer ngày/danh mục, các phạm vi bộ lọc, tooltip trang báo cáo và drill-down phân cấp.'
  },
  estimatedMinutes: 14,
  learn: {
    introduction: {
      en: 'Interactivity transforms static reports into dynamic investigative tools. Power BI provides multiple layers of interaction: On-canvas Slicers for direct filtering, the Filters Pane (visual, page, and all-pages filter scopes), visual Drill-Down and Drill-Up across declared hierarchies (e.g. Year -> Quarter -> Month), and custom Report Page Tooltips that pop up micro-charts on hover.',
      vi: 'Tính tương tác biến báo cáo tĩnh thành công cụ phân tích khám phá mạnh mẽ. Power BI cung cấp nhiều tầng tương tác: Slicer trực tiếp trên canvas, Khung Filters (bộ lọc cấp biểu đồ, cấp trang và toàn bộ các trang), tính năng Drill-Down/Drill-Up theo cây phân cấp (như Năm -> Quý -> Tháng), và Tooltip trang báo cáo tùy biến hiển thị biểu đồ thu nhỏ khi rê chuột.'
    },
    conceptExplanation: {
      en: 'Key interactive report components:\n1. Slicers: On-canvas filter controls (Dropdown, Tile, Hierarchy Slicer, Date Range Slider).\n2. Filter Scopes: 1) Filters on this visual, 2) Filters on this page, and 3) Filters on all pages.\n3. Edit Interactions: Configure whether clicking a visual item Filters, Highlights, or Ignores other visuals on the canvas.\n4. Hierarchies: Group related columns (Country -> State -> City) into a single hierarchy object enabling seamless Drill-Down.\n5. Report Page Tooltips: Design a dedicated small canvas page (e.g. 320x240) configured as a Tooltip to render rich contextual breakdowns on mouse hover.',
      vi: 'Các thành phần tương tác trọng tâm:\n1. Slicers: Bộ lọc trên trang (dạng Danh sách thả xuống, Ô nút Tile, Phân cấp, Thanh trượt ngày).\n2. Phạm vi bộ lọc (Filter Scopes): 1) Lọc trên biểu đồ này, 2) Lọc trên trang này, và 3) Lọc trên toàn bộ các trang.\n3. Edit Interactions (Chỉnh sửa tương tác): Kiểm soát việc bấm vào biểu đồ sẽ Lọc (Filter), Làm nổi bật (Highlight), hay Bỏ qua (None) các biểu đồ khác.\n4. Phân cấp (Hierarchies): Gom nhóm các cột liên quan (Quốc gia -> Tỉnh thành -> Quận huyện) vào 1 cây phân cấp cho phép Drill-Down mượt mà.\n5. Tooltip trang báo cáo: Thiết kế trang canvas nhỏ riêng (như 320x240) đóng vai trò làm Tooltip hiển thị biểu đồ phân tích chi tiết khi rê chuột.'
    },
    syntax: '// Creating a clean Hierarchy in Model View:\n// Location Hierarchy: Dim_Geography[Country] -> Dim_Geography[State] -> Dim_Geography[City]\n// Date Hierarchy: Dim_Calendar[Year] -> Dim_Calendar[Quarter] -> Dim_Calendar[Month] -> Dim_Calendar[Day]',
    examples: [
      {
        title: {
          en: 'Configuring Edit Interactions and Drill-Through',
          vi: 'Cấu Hình Tương Tác Giữa Các Biểu Đồ & Drill-Through'
        },
        code: `// Drill-Through Filter Target:
// Place Dim_Customers[CustomerID] in the "Drill-through fields" bucket of a Customer Profile page.
// Users can right-click any Customer name in a summary table -> Drill-through -> Customer Profile.`,
        language: 'dax',
        explanation: {
          en: 'Drill-through pages automatically filter to the specific entity selected in the originating visual.',
          vi: 'Trang Drill-through tự động lọc chính xác theo đối tượng được chọn từ biểu đồ xuất phát.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Placing 10 unorganized individual slicers taking up 40% of the canvas height.',
          vi: 'Đặt 10 slicer rời rạc chiếm tới 40% diện tích màn hình thiết kế.'
        },
        correction: {
          en: 'Use dropdown slicers, hierarchy slicers, or a collapsible bookmark-based filter pane to preserve visual space.',
          vi: 'Sử dụng slicer dạng danh sách thả xuống (dropdown), slicer phân cấp hoặc thanh lọc ẩn hiện bằng bookmark để tiết kiệm diện tích.'
        }
      },
      {
        mistake: {
          en: 'Leaving cross-highlighting enabled when cross-filtering is desired on dense bar charts.',
          vi: 'Để mặc định chế độ Highlight gây mờ nhạt khó đọc thay vì chuyển sang chế độ Filter rõ ràng.'
        },
        correction: {
          en: 'Use the Format > Edit Interactions ribbon to switch cross-visual behavior from "Highlight" to "Filter".',
          vi: 'Vào Format > Edit Interactions để chuyển hành vi tương tác từ "Highlight" sang "Filter".'
        }
      }
    ],
    tips: [
      {
        en: 'Create a custom Date hierarchy (Year > Quarter > Month) to allow executives to effortlessly drill down from annual targets to monthly execution.',
        vi: 'Tạo phân cấp thời gian (Năm > Quý > Tháng) để ban giám đốc dễ dàng drill-down từ mục tiêu năm xuống tiến độ từng tháng.'
      },
      {
        en: 'Lock objects on the canvas (View > Lock objects) once layout is finalized to prevent accidental dragging.',
        vi: 'Khóa các đối tượng trên trang (View > Lock objects) sau khi hoàn thiện bố cục để tránh bị kéo lệch vị trí.'
      }
    ],
    practiceStarterCode: `// DAX measure responding to interactive page slicers
Filtered Sales = SUM(Fact_Sales[Revenue])`
  },
  exercisePool: [
    {
      id: 'pbi_ex_6_1',
      type: 'predict_output',
      title: {
        en: 'Identify Filter Scope Behavior',
        vi: 'Nhận Diện Phạm Vi Áp Dụng Của Bộ Lọc'
      },
      instruction: {
        en: 'If a filter on Dim_Calendar[Year] = 2024 is added to the "Filters on all pages" bucket, which pages will be restricted?',
        vi: 'Nếu bộ lọc Dim_Calendar[Year] = 2024 được đặt vào mục "Filters on all pages", những trang nào sẽ bị lọc?'
      },
      starterCode: '// Choose affected pages',
      solutionCode: 'Every page in the entire report',
      options: ['Every page in the entire report', 'Only the currently active page', 'Only the selected visual', 'No pages'],
      correctOptionIndex: 0,
      explanation: {
        en: '"Filters on all pages" applies the filter condition universally across every report canvas tab in the .pbix file.',
        vi: '"Filters on all pages" áp dụng điều kiện lọc đồng bộ trên toàn bộ tất cả các trang báo cáo trong tệp.'
      }
    },
    {
      id: 'pbi_ex_6_2',
      type: 'modify_example',
      title: {
        en: 'Write Metric for Interactive Drill-Down',
        vi: 'Viết Đo Lường Cho Drill-Down Tương Tác'
      },
      instruction: {
        en: 'Write a DAX measure named Total Quantity to calculate SUM(Fact_Sales[Quantity]).',
        vi: 'Viết measure DAX tên Total Quantity để tính SUM(Fact_Sales[Quantity]).'
      },
      starterCode: 'Total Quantity = SUM(Fact_Sales[Quantity])',
      solutionCode: 'Total Quantity = SUM(Fact_Sales[Quantity])',
      hint: {
        en: 'Total Quantity = SUM(Fact_Sales[Quantity])',
        vi: 'Total Quantity = SUM(Fact_Sales[Quantity])'
      },
      explanation: {
        en: 'The measure dynamically aggregates quantities as users drill down through Year, Quarter, and Month.',
        vi: 'Measure tính toán động số lượng khi người dùng drill-down qua các cấp Năm, Quý và Tháng.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_6',
    title: {
      en: 'Configure Interactive Navigation & Hierarchy Suite',
      vi: 'Cấu Hình Hệ Thống Điều Hướng & Phân Cấp Tương Tác'
    },
    description: {
      en: 'Declare the interactive measures and hierarchy structure for an interactive Sales Analytics report page.',
      vi: 'Khai báo các measure và cấu trúc phân cấp tương tác cho trang phân tích bán hàng.'
    },
    requirements: [
      { en: '1. Date Hierarchy: Year -> Quarter -> Month -> Day', vi: '1. Phân cấp Ngày: Năm -> Quý -> Tháng -> Ngày' },
      { en: '2. Product Hierarchy: Category -> SubCategory -> ProductName', vi: '2. Phân cấp Sản phẩm: Nhóm -> Phân nhánh -> Tên sản phẩm' },
      { en: '3. Total Orders Measure: DISTINCTCOUNT(Fact_Sales[OrderID])', vi: '3. Measure Total Orders: DISTINCTCOUNT(Fact_Sales[OrderID])' },
      { en: '4. Total Revenue Measure: SUM(Fact_Sales[Revenue])', vi: '4. Measure Total Revenue: SUM(Fact_Sales[Revenue])' }
    ],
    starterCode: `// Product Hierarchy: Category -> SubCategory -> ProductName
// Date Hierarchy: Year -> Quarter -> Month -> Day
Total Orders = DISTINCTCOUNT(Fact_Sales[OrderID])
Total Revenue = SUM(Fact_Sales[Revenue])`,
    solutionCode: `// Product Hierarchy: Category -> SubCategory -> ProductName
// Date Hierarchy: Year -> Quarter -> Month -> Day
Total Orders = DISTINCTCOUNT(Fact_Sales[OrderID])
Total Revenue = SUM(Fact_Sales[Revenue])`,
    hints: [
      {
        en: 'DISTINCTCOUNT returns the exact number of unique order transactions in the filtered context.',
        vi: 'DISTINCTCOUNT trả về chính xác số lượng mã đơn hàng duy nhất trong ngữ cảnh lọc.'
      }
    ],
    solutionExplanation: {
      en: 'Hierarchies combined with distinct order count and revenue measures provide an intuitive executive drill-down experience.',
      vi: 'Cây phân cấp kết hợp với số lượng đơn và doanh thu mang lại trải nghiệm drill-down trực quan cho người dùng.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_6_1',
      type: 'single_choice',
      question: {
        en: 'Which filter scope in Power BI restricts data exclusively for the currently active canvas page without affecting other pages?',
        vi: 'Phạm vi bộ lọc nào trong Power BI giới hạn dữ liệu riêng cho trang báo cáo đang mở mà không ảnh hưởng tới các trang khác?'
      },
      options: [
        { en: 'Filters on this page', vi: 'Filters on this page (Bộ lọc trên trang này)' },
        { en: 'Filters on all pages', vi: 'Filters on all pages' },
        { en: 'Filters on this visual', vi: 'Filters on this visual' },
        { en: 'Database Admin Lock', vi: 'Database Admin Lock' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '"Filters on this page" applies filter criteria to every visual located on the current report page only.',
        vi: '"Filters on this page" áp dụng điều kiện lọc cho tất cả các biểu đồ nằm trên trang hiện tại.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_6_2',
      type: 'single_choice',
      question: {
        en: 'What feature allows report creators to design a custom miniature report page that displays contextual charts when hovering over a data point?',
        vi: 'Tính năng nào cho phép thiết kế một trang báo cáo thu nhỏ tùy biến hiển thị biểu đồ chi tiết khi rê chuột vào một điểm dữ liệu?'
      },
      options: [
        { en: 'Report Page Tooltips', vi: 'Report Page Tooltips (Tooltip trang báo cáo)' },
        { en: 'Windows Screen Magnifier', vi: 'Windows Screen Magnifier' },
        { en: 'DirectQuery Cache', vi: 'DirectQuery Cache' },
        { en: 'Custom JSON Palette', vi: 'Custom JSON Palette' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Report page tooltips display a specialized, miniature report canvas upon hovering over visual elements, passing the current filter context automatically.',
        vi: 'Report page tooltips hiển thị một trang canvas thu nhỏ khi rê chuột vào biểu đồ và tự động truyền ngữ cảnh bộ lọc tương ứng.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_6_3',
      type: 'single_choice',
      question: {
        en: 'Where do you configure whether clicking a bar in a chart "Filters" vs "Highlights" other visuals on the canvas?',
        vi: 'Bạn cấu hình việc bấm vào một cột biểu đồ sẽ "Lọc (Filter)" hay "Làm nổi bật (Highlight)" các biểu đồ khác ở đâu?'
      },
      options: [
        { en: 'Format ribbon > Edit Interactions', vi: 'Thẻ Format > Edit Interactions (Chỉnh sửa tương tác)' },
        { en: 'Power Query Advanced Editor', vi: 'Power Query Advanced Editor' },
        { en: 'Windows Registry', vi: 'Windows Registry' },
        { en: 'DAX Query View', vi: 'DAX Query View' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Format > Edit Interactions reveals control icons above each visual to choose between Filter, Highlight, or None.',
        vi: 'Format > Edit Interactions làm xuất hiện các biểu tượng phía trên mỗi biểu đồ để chọn giữa Filter, Highlight hoặc None.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_6_4',
      type: 'true_false',
      question: {
        en: 'Creating a Column Hierarchy (e.g. Category > Subcategory > Product) allows users to drill down levels directly within the chart visual.',
        vi: 'Tạo phân cấp cột (như Category > Subcategory > Product) cho phép người dùng drill-down từng cấp trực tiếp trên biểu đồ.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Hierarchies enable the drill-down icon controls (Drill Down, Expand All Down One Level, Drill Up) on charts and matrices.',
        vi: 'Đúng. Phân cấp kích hoạt các nút điều khiển drill-down (khoan sâu chi tiết, mở rộng cấp tiếp theo, quay lại cấp trên) trên biểu đồ.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_6_5',
      type: 'single_choice',
      question: {
        en: 'Which DAX function counts the number of distinct (unique) order IDs in the current filter context?',
        vi: 'Hàm DAX nào đếm số lượng mã đơn hàng duy nhất (không trùng lặp) trong ngữ cảnh bộ lọc hiện tại?'
      },
      options: [
        { en: 'DISTINCTCOUNT()', vi: 'DISTINCTCOUNT()' },
        { en: 'COUNTUNIQUE()', vi: 'COUNTUNIQUE()' },
        { en: 'UNIQUEROWS()', vi: 'UNIQUEROWS()' },
        { en: 'TOTALDISTINCT()', vi: 'TOTALDISTINCT()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DISTINCTCOUNT(ColumnName) counts the unique non-blank values in a column.',
        vi: 'DISTINCTCOUNT(TênCột) đếm số lượng các giá trị duy nhất khác rỗng trong cột.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_6_6',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are supported interactive Slicer styles in Power BI? (Select all that apply)',
        vi: 'Những kiểu giao diện Slicer tương tác nào sau đây được hỗ trợ trong Power BI? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Vertical List', vi: 'Danh sách dọc (Vertical List)' },
        { en: 'Dropdown List', vi: 'Danh sách thả xuống (Dropdown)' },
        { en: 'Tile (Button style)', vi: 'Ô nút bấm (Tile)' },
        { en: 'Between (Date range slider)', vi: 'Thanh trượt khoảng ngày (Between)' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'Vertical list, Dropdown, Tile, and Between date sliders are all built-in slicer formats.',
        vi: 'Vertical list, Dropdown, Tile và Between date sliders đều là các định dạng slicer có sẵn.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_6_7',
      type: 'true_false',
      question: {
        en: 'The "Sync Slicers" pane allows a single slicer selection on Page 1 to automatically synchronize and filter visuals on Page 2 and Page 3.',
        vi: 'Khung "Sync Slicers" cho phép một lựa chọn slicer trên Trang 1 tự động đồng bộ và lọc các biểu đồ trên Trang 2 và Trang 3.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Sync Slicers enables cross-page state synchronization for seamless multi-page report navigation.',
        vi: 'Đúng. Sync Slicers cho phép đồng bộ trạng thái lọc xuyên suốt nhiều trang báo cáo mượt mà.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_6_8',
      type: 'single_choice',
      question: {
        en: 'What happens when a user clicks the "Expand all down one level in the hierarchy" button on a Matrix visual?',
        vi: 'Điều gì xảy ra khi người dùng bấm nút "Mở rộng tất cả xuống một cấp trong phân cấp" trên biểu đồ Matrix?'
      },
      options: [
        {
          en: 'It shows the next hierarchy level indented under each parent item simultaneously (e.g. Year 2024 -> Q1, Q2, Q3, Q4)',
          vi: 'Nó hiển thị cấp phân cấp tiếp theo lồng dưới từng mục cha đồng thời (ví dụ: Năm 2024 -> Q1, Q2, Q3, Q4)'
        },
        {
          en: 'It deletes the parent hierarchy level from the model',
          vi: 'Nó xóa cấp phân cấp cha khỏi mô hình'
        },
        {
          en: 'It exports the data directly to a CSV file',
          vi: 'Nó xuất dữ liệu trực tiếp ra tệp CSV'
        },
        {
          en: 'It shuts down Power BI Desktop',
          vi: 'Nó tắt ứng dụng Power BI Desktop'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Expand all displays the child level while preserving the parent grouping context.',
        vi: 'Expand all mở rộng hiển thị các cấp con mà vẫn duy trì ngữ cảnh phân nhóm của cấp cha.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_6_9',
      type: 'predict_output',
      question: {
        en: 'If a slicer on Dim_Geography[Country] is selected for "Vietnam", what values will appear in a dependent slicer for Dim_Geography[City] if cross-filtering is active?',
        vi: 'Nếu một slicer chọn Dim_Geography[Country] là "Vietnam", những giá trị nào sẽ xuất hiện trên slicer phụ thuộc Dim_Geography[City] khi đang bật lọc chéo?'
      },
      options: [
        {
          en: 'Only cities located within Vietnam (e.g. Hanoi, Ho Chi Minh City, Da Nang)',
          vi: 'Chỉ các thành phố nằm trong Việt Nam (như Hà Nội, TP. Hồ Chí Minh, Đà Nẵng)'
        },
        {
          en: 'All cities in the world from all countries',
          vi: 'Tất cả các thành phố trên toàn thế giới'
        },
        {
          en: 'An empty error message',
          vi: 'Thông báo lỗi trống'
        },
        {
          en: 'Only product names',
          vi: 'Chỉ có tên sản phẩm'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Slicers built from the same dimension table automatically cross-filter each other, displaying only relevant matching attributes.',
        vi: 'Các slicer tạo từ cùng một bảng dimension tự động lọc chéo lẫn nhau và chỉ hiển thị các giá trị phù hợp.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_6_10',
      type: 'single_choice',
      question: {
        en: 'How can you prevent a specific visual (e.g. an informational title card or logo) from being affected when a user makes selections on a page slicer?',
        vi: 'Làm thế nào để một biểu đồ cụ thể (như thẻ tiêu đề hoặc logo) không bị ảnh hưởng khi người dùng chọn trên slicer?'
      },
      options: [
        { en: 'Select the slicer -> Format > Edit Interactions -> Click "None" icon on the title card', vi: 'Chọn slicer -> Thẻ Format > Edit Interactions -> Chọn biểu tượng "None" trên biểu đồ tiêu đề' },
        { en: 'Delete the slicer', vi: 'Xóa slicer' },
        { en: 'Hide the report page', vi: 'Ẩn trang báo cáo' },
        { en: 'Disable your internet connection', vi: 'Ngắt kết nối mạng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Setting the interaction mode to "None" detaches the target visual from receiving filter context from the selected slicer.',
        vi: 'Đặt chế độ tương tác thành "None" giúp tách biểu đồ đích không bị ảnh hưởng bởi bộ lọc của slicer được chọn.'
      },
      topicId: 'interactive_reporting_features',
      difficulty: 'medium'
    }
  ]
};

export default lesson06;
