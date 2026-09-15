import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const intMod02Dir = path.join(process.cwd(), 'src/data/excel/intermediate/module02');
fs.mkdirSync(intMod02Dir, { recursive: true });

function saveLesson(filename: string, varName: string, lesson: Lesson) {
  const code = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lesson, null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(path.join(intMod02Dir, filename), code, 'utf8');
  console.log(`Saved ${filename} (${lesson.id})`);
}

// =========================================================================
// LESSON 17: PivotTables, Grouping, Slicers & Timelines
// Preserved ID: excel_lesson_pivottables
// =========================================================================
export const lesson17: Lesson = {
  id: 'excel_lesson_pivottables',
  order: 17,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_pivottables',
  title: {
    en: 'PivotTables, Multi-Dimensional Summaries, Grouping, Slicers & Timelines',
    vi: 'PivotTable, Tóm Tắt Đa Chiều, Gom Nhóm, Slicers & Dòng Thời Gian Timelines'
  },
  summary: {
    en: 'Transform hundreds of thousands of raw transactional rows into executive multidimensional summaries in seconds: PivotTable field list configuration, automatic date grouping (Years/Quarters/Months), numeric binning, Show Values As percentage rollups, and interactive cross-filtering Slicers & Timelines.',
    vi: 'Biến hàng trăm nghìn dòng giao dịch thô thành báo cáo quản trị đa chiều chỉ trong vài giây: cấu hình danh sách trường PivotTable, tự động gom nhóm ngày tháng (Năm/Quý/Tháng), chia nhóm số, hiển thị giá trị dạng phần trăm Show Values As và các bộ lọc tương tác Slicers & Timelines.'
  },
  learn: {
    introduction: {
      en: 'PivotTables are the single most powerful analytical feature in Microsoft Excel. Instead of writing dozens of complex multi-criteria SUMIFS formulas, a PivotTable aggregates, sorts, groups, and pivots massive datasets dynamically through an intuitive drag-and-drop interface.',
      vi: 'PivotTable là công cụ phân tích mạnh mẽ hàng đầu trong Microsoft Excel. Thay vì phải viết hàng chục công thức SUMIFS đa điều kiện phức tạp, PivotTable tự động tổng hợp, sắp xếp, gom nhóm và xoay chiều các tập dữ liệu khổng lồ thông qua giao diện kéo thả trực quan.'
    },
    conceptExplanation: {
      en: `### 1. The Four PivotTable Drop Zones
1. **Filters**: Page-level top filters to isolate subsets of data.
2. **Columns**: Dimension fields that generate horizontal matrix column headers.
3. **Rows**: Dimension fields that generate vertical row headers.
4. **Values**: Numeric metric fields to aggregate (defaults to \`SUM\` for numbers, \`COUNT\` for text).

### 2. Temporal & Numeric Grouping
- **Date Grouping**: Right-click any date in a PivotTable -> Group -> Select **Years, Quarters, and Months**. Excel instantly creates hierarchical date rollups!
- **Numeric Binning**: Right-click a number field (e.g. Age or Order Amount) -> Group -> Set Starting, Ending, and Increment Interval (e.g. groups of $1,000).

### 3. "Show Values As" Calculations
Right-click any value cell -> **Show Values As**:
- **% of Grand Total**: Displays each cell's share of overall revenue.
- **% of Column / Row Total**: Relative contribution within specific segments.
- **% Difference From**: Compares month-over-month growth against a baseline.
- **Running Total In**: Cumulative progression across time.

### 4. Interactive Dashboard Controls
- **Slicers**: One-click visual category filter tiles.
- **Timelines**: Dedicated chronological date slider bars.
- **Report Connections**: Connect a single Slicer to multiple PivotTables across the entire workbook!`,
      vi: `### 1. Bốn Vùng Thả Trường Của PivotTable
1. **Filters**: Bộ lọc cấp cao nhất để lọc tách tập dữ liệu.
2. **Columns**: Các trường danh mục tạo nên tiêu đề cột ngang của ma trận.
3. **Rows**: Các trường danh mục tạo nên tiêu đề dòng dọc.
4. **Values**: Các trường chỉ số số học để tổng hợp (mặc định là \`SUM\` cho số, \`COUNT\` cho chữ).

### 2. Gom Nhóm Theo Thời Gian & Theo Khoảng Số
- **Gom nhóm Ngày tháng**: Nhấp chuột phải vào ô ngày bất kỳ -> Group -> Chọn **Years, Quarters, Months**. Excel sẽ tự động tạo phân cấp thời gian!
- **Chia nhóm Số (Binning)**: Nhấp chuột phải vào trường số (ví dụ Tuổi hoặc Doanh thu) -> Group -> Thiết lập điểm bắt đầu, kết thúc và bước nhảy (ví dụ từng khoảng 1.000$).

### 3. Các Phép Tính "Show Values As"
Nhấp chuột phải vào ô giá trị -> **Show Values As**:
- **% of Grand Total**: Hiển thị tỷ trọng phần trăm trên tổng số toàn bộ.
- **% of Column / Row Total**: Tỷ trọng đóng góp trong từng phân khúc.
- **% Difference From**: So sánh tăng trưởng so với mốc cơ sở (ví dụ tháng trước).
- **Running Total In**: Cộng dồn tích lũy theo thời gian.

### 4. Các Bộ Điều Khiển Bảng Điều Khiển Tương Tác
- **Slicers**: Các nút bấm lọc danh mục trực quan.
- **Timelines**: Thanh trượt niên đại chuyên dụng cho ngày tháng.
- **Report Connections**: Kết nối một nút Slicer với nhiều PivotTable cùng lúc!`
    },
    syntax: `# Recommended Practice:
1. Always base PivotTables on an official Excel Table (ListObject) so refreshing (Alt + F5) pulls in newly added rows automatically.
2. Slicer Report Connections: Right-click Slicer -> Report Connections -> Check all target PivotTables.`,
    examples: [
      {
        title: { en: 'Creating a Year-over-Year Sales Pivot Summary', vi: 'Tạo Báo Cáo Doanh Số Theo Năm Bằng PivotTable' },
        code: `Source Data: SalesTable (50,000 rows)
Rows Zone: Region, SalesRep
Columns Zone: OrderDate (Grouped by Years)
Values Zone: Revenue (Formatted as Currency)

Result: Instant cross-tabulated regional matrix comparing 2024, 2025, and 2026.`,
        description: {
          en: 'Generates an executive regional performance matrix in seconds without writing a single line of formula.',
          vi: 'Tạo ma trận hiệu suất khu vực cấp quản trị trong vài giây mà không cần viết một dòng công thức nào.'
        }
      },
      {
        title: { en: 'Connecting Slicers Across Multiple PivotTables', vi: 'Kết Nối Slicers Với Nhiều PivotTable Cùng Lúc' },
        code: `Dashboard Architecture:
- PivotTable 1: Sales by Product Category
- PivotTable 2: Sales by Region
- PivotTable 3: Top 10 Sales Representatives

Action: Insert Slicer for "Quarter" -> Report Connections -> Check PivotTable 1, 2, and 3.
Outcome: Clicking "Q3" updates all three summary tables and linked charts simultaneously!`,
        description: {
          en: 'Report Connections enable multi-chart synchronous filtering for interactive executive reporting.',
          vi: 'Tính năng Report Connections cho phép lọc đồng bộ nhiều biểu đồ phục vụ báo cáo quản trị tương tác.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Expecting a PivotTable to update automatically when source cells change without manually triggering a Refresh (Alt + F5).',
          vi: 'Kỳ vọng PivotTable tự động cập nhật khi dữ liệu nguồn thay đổi mà không nhấn nút Refresh (Alt + F5).'
        },
        correction: {
          en: 'PivotTables cache their data; always press Alt + F5 or click Data -> Refresh All to update Pivot summaries.',
          vi: 'PivotTable lưu bộ nhớ đệm; luôn nhấn Alt + F5 hoặc chọn Data -> Refresh All để cập nhật báo cáo.'
        }
      }
    ],
    tips: [
      { en: 'Refresh All Data Shortcut: Press Ctrl + Alt + F5 to instantly refresh every PivotTable and data query in the entire workbook.', vi: 'Phím tắt làm mới tất cả dữ liệu: Nhấn Ctrl + Alt + F5 để làm mới toàn bộ PivotTable và truy vấn dữ liệu trong toàn bộ file.' },
      { en: 'Disable AutoFit on Update: In PivotTable Options -> Layout & Format, uncheck "Autofit column widths on update" to keep customized column widths intact when refreshing.', vi: 'Khóa độ rộng cột khi làm mới: Trong PivotTable Options, bỏ tích "Autofit column widths on update" để giữ nguyên độ rộng cột khi Refresh.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l17_ex1',
      type: 'complete_code',
      title: { en: 'Identify Recommended Data Source for PivotTables', vi: 'Xác Định Nguồn Dữ Liệu Tốt Nhất Cho PivotTable' },
      instruction: {
        en: 'Type the recommended source reference name for creating a dynamic PivotTable based on table "TransactionsTable".',
        vi: 'Gõ tên tham chiếu nguồn được khuyến nghị để tạo PivotTable động dựa trên bảng "TransactionsTable".'
      },
      starterCode: 'Transactions',
      solutionCode: 'TransactionsTable',
      expectedOutput: 'TransactionsTable',
      hint: { en: 'Use the exact Table Name: TransactionsTable.', vi: 'Dùng chính xác Tên Bảng: TransactionsTable.' },
      explanation: { en: 'Basing PivotTables on Excel Tables ensures newly appended records are included upon refresh.', vi: 'Tạo PivotTable từ Bảng Excel đảm bảo các dòng mới thêm vào sẽ tự động được cập nhật khi refresh.' }
    },
    {
      id: 'excel_l17_ex2',
      type: 'complete_code',
      title: { en: 'Specify Refresh All Keyboard Shortcut', vi: 'Chỉ Định Phím Tắt Làm Mới Tất Cả Dữ Liệu' },
      instruction: {
        en: 'Type the standard Excel keyboard shortcut used to refresh ALL PivotTables and connections in a workbook (format: Ctrl+Alt+F5).',
        vi: 'Gõ phím tắt chuẩn của Excel dùng để làm mới TẤT CẢ các PivotTable và kết nối trong sổ làm việc (định dạng: Ctrl+Alt+F5).'
      },
      starterCode: 'Ctrl+',
      solutionCode: 'Ctrl+Alt+F5',
      expectedOutput: 'Ctrl+Alt+F5',
      hint: { en: 'Ctrl + Alt + F5.', vi: 'Ctrl + Alt + F5.' },
      explanation: { en: 'Ctrl + Alt + F5 triggers Refresh All across the entire workbook.', vi: 'Ctrl + Alt + F5 kích hoạt làm mới tất cả các nguồn trong toàn bộ file.' }
    }
  ],
  challenge: {
    id: 'excel_l17_challenge',
    title: { en: 'Configure Multi-Dimensional Regional Sales Matrix Structure', vi: 'Cấu Hình Cấu Trúc Ma Trận Doanh Số Khu Vực Đa Chiều' },
    description: {
      en: 'Specify the optimal PivotTable field placement strategy to build a cross-tabulated matrix showing total Revenue by Region (rows) and Year (columns), filtered by Department: state the drop zones.',
      vi: 'Chỉ định chiến lược sắp xếp trường PivotTable tối ưu để xây dựng ma trận doanh số Revenue theo Khu vực Region (hàng) và Năm Year (cột), được lọc theo Phòng ban Department.'
    },
    requirements: [
      { en: 'Rows: Region', vi: 'Rows: Region' },
      { en: 'Columns: Year', vi: 'Columns: Year' },
      { en: 'Values: SUM of Revenue', vi: 'Values: SUM of Revenue' },
      { en: 'Filters: Department', vi: 'Filters: Department' }
    ],
    starterCode: 'Rows: Region, Columns: Year, Values: SUM of Revenue, Filters: ',
    solutionCode: 'Rows: Region, Columns: Year, Values: SUM of Revenue, Filters: Department',
    hints: [
      { en: 'Complete with "Department".', vi: 'Hoàn thành với "Department".' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l17_q1',
      type: 'single_choice',
      question: {
        en: 'What happens to a PivotTable when underlying source data changes in the worksheet?',
        vi: 'Điều gì xảy ra với PivotTable khi dữ liệu nguồn bên dưới bị thay đổi trong trang tính?'
      },
      options: [
        { en: 'It does NOT update automatically; you must manually Refresh it (Alt + F5 or Ctrl + Alt + F5)', vi: 'Nó KHÔNG tự động cập nhật ngay; bạn phải làm mới Refresh thủ công (Alt + F5 hoặc Ctrl + Alt + F5)' },
        { en: 'It updates instantly in real time like a cell formula', vi: 'Nó cập nhật ngay lập tức theo thời gian thực như một công thức ô' },
        { en: 'It crashes the workbook', vi: 'Nó làm sập file bảng tính' },
        { en: 'It deletes the modified rows', vi: 'Nó xóa các dòng đã chỉnh sửa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PivotTables store a snapshot of data in the Pivot Cache and require a Refresh operation to reload source updates.',
        vi: 'PivotTable lưu một bản sao dữ liệu trong bộ nhớ đệm Pivot Cache và yêu cầu lệnh Refresh để tải lại dữ liệu mới.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q2',
      type: 'single_choice',
      question: {
        en: 'How can you group daily transaction dates into Months, Quarters, and Years in a PivotTable?',
        vi: 'Làm thế nào để gom nhóm các ngày giao dịch thành Tháng, Quý và Năm trong PivotTable?'
      },
      options: [
        { en: 'Right-click any date cell in the PivotTable -> Group -> Select Months, Quarters, Years', vi: 'Nhấp chuột phải vào ô ngày bất kỳ trong PivotTable -> Group -> Chọn Months, Quarters, Years' },
        { en: 'Write a custom VBA macro', vi: 'Viết một macro VBA tùy chỉnh' },
        { en: 'Add three new formula columns to the source data manually', vi: 'Thêm thủ công 3 cột công thức mới vào bảng nguồn' },
        { en: 'Sort the column ascending', vi: 'Sắp xếp cột tăng dần' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The native Group feature in PivotTables creates virtual hierarchical calendar grouping buckets automatically.',
        vi: 'Tính năng Group có sẵn trong PivotTable tự động tạo các nhóm phân cấp lịch một cách tự động.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q3',
      type: 'single_choice',
      question: {
        en: 'What feature allows a single Slicer to simultaneously filter multiple different PivotTables across a dashboard?',
        vi: 'Tính năng nào cho phép một nút Slicer duy nhất lọc đồng thời nhiều PivotTable khác nhau trên trang tổng hợp?'
      },
      options: [
        { en: 'Report Connections (Slicer Settings)', vi: 'Report Connections (Cài đặt Slicer)' },
        { en: 'Multi-Select mode', vi: 'Chế độ Multi-Select' },
        { en: 'Power Pivot Link', vi: 'Power Pivot Link' },
        { en: 'AutoFilter Sync', vi: 'AutoFilter Sync' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Right-clicking a Slicer and selecting "Report Connections" lets you connect the control to multiple PivotTables sharing the same cache.',
        vi: 'Nhấp chuột phải vào Slicer và chọn "Report Connections" cho phép bạn kết nối bộ điều khiển với nhiều PivotTable cùng nguồn.'
      },
      difficulty: 'medium',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q4',
      type: 'single_choice',
      question: {
        en: 'Which "Show Values As" calculation displays each line item as a percentage of the total category revenue?',
        vi: 'Tùy chọn "Show Values As" nào hiển thị từng mục dữ liệu dưới dạng tỷ lệ phần trăm trên tổng doanh thu danh mục?'
      },
      options: [
        { en: '% of Column Total (or % of Parent Row Total)', vi: '% of Column Total (hoặc % of Parent Row Total)' },
        { en: 'Difference From', vi: 'Difference From' },
        { en: 'Running Total', vi: 'Running Total' },
        { en: 'Rank Smallest to Largest', vi: 'Rank Smallest to Largest' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '% of Column Total computes the ratio of each cell against the column aggregate total.',
        vi: '% of Column Total tính toán tỷ lệ của từng ô so với số tổng cộng của cả cột.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q5',
      type: 'single_choice',
      question: {
        en: 'What is a PivotTable Timeline in Excel?',
        vi: 'PivotTable Timeline trong Excel là gì?'
      },
      options: [
        { en: 'A dedicated visual slider filter designed specifically for chronological date fields', vi: 'Một thanh trượt lọc trực quan chuyên dụng được thiết kế riêng cho các trường ngày tháng theo niên đại' },
        { en: 'A Gantt chart generator', vi: 'Một trình tạo biểu đồ Gantt' },
        { en: 'A history log of workbook revisions', vi: 'Một nhật ký lịch sử chỉnh sửa file' },
        { en: 'An animation tool', vi: 'Một công cụ tạo chuyển động' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Timelines provide an interactive visual control for zooming and filtering date ranges by Days, Months, Quarters, or Years.',
        vi: 'Timelines cung cấp bộ điều khiển trực quan giúp phóng to và lọc khoảng ngày tháng theo Ngày, Tháng, Quý hoặc Năm.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q6',
      type: 'single_choice',
      question: {
        en: 'What is the "Pivot Cache"?',
        vi: '"Pivot Cache" trong Excel là gì?'
      },
      options: [
        { en: 'An optimized in-memory copy of the source data created when a PivotTable is built', vi: 'Một bản sao dữ liệu nguồn được tối ưu hóa lưu trong bộ nhớ RAM khi PivotTable được tạo' },
        { en: 'A hidden worksheet where deleted rows go', vi: 'Một trang tính ẩn nơi chứa các dòng đã xóa' },
        { en: 'The browser cache', vi: 'Bộ nhớ đệm của trình duyệt' },
        { en: 'A password vault', vi: 'Một két sắt lưu mật khẩu' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Pivot Cache holds an indexed memory representation of the data, allowing blazing fast aggregation queries without constantly rescanning the worksheet.',
        vi: 'Pivot Cache lưu trữ cấu trúc dữ liệu được lập chỉ mục trong bộ nhớ, cho phép tính toán tổng hợp siêu nhanh mà không cần quét lại toàn bộ trang tính.'
      },
      difficulty: 'medium',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q7',
      type: 'true_false',
      question: {
        en: 'True or False: Double-clicking any numeric summary cell in a PivotTable creates a brand new worksheet containing the exact drill-down source records behind that number.',
        vi: 'Đúng hay Sai: Nhấp đúp chuột vào bất kỳ ô số tổng kết nào trong PivotTable sẽ tự động tạo một trang tính mới chứa chi tiết các dòng dữ liệu gốc tạo nên con số đó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Double-clicking a Pivot value cell triggers the "Show Details" drill-down feature, outputting matching rows to a new tab.',
        vi: 'Đúng. Nhấp đúp vào ô giá trị trong Pivot sẽ kích hoạt tính năng "Show Details", trích xuất toàn bộ các dòng liên quan ra một tab mới.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q8',
      type: 'single_choice',
      question: {
        en: 'Why is it best practice to build PivotTables from an official Excel Table rather than a standard range like `A1:F1000`?',
        vi: 'Tại sao việc tạo PivotTable từ một Bảng Excel (Table) lại là phương pháp tối ưu hơn so với dải ô thông thường như `A1:F1000`?'
      },
      options: [
        { en: 'New rows added to the Table are automatically included in the PivotTable range upon refreshing without modifying the data source coordinates', vi: 'Các dòng mới thêm vào Bảng sẽ tự động được bao gồm trong PivotTable khi refresh mà không cần sửa lại tọa độ nguồn dữ liệu' },
        { en: 'It makes the file 90% smaller', vi: 'Nó làm file nhỏ hơn 90%' },
        { en: 'It translates the headers into French', vi: 'Nó dịch tiêu đề sang tiếng Pháp' },
        { en: 'PivotTables do not work on normal ranges', vi: 'PivotTable không hoạt động được trên dải ô thông thường' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Excel Tables dynamically expand, so the PivotTable source range never needs manual row expansion.',
        vi: 'Bảng Excel tự động mở rộng, do đó dải nguồn của PivotTable không bao giờ cần điều chỉnh số dòng thủ công.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q9',
      type: 'single_choice',
      question: {
        en: 'How do you prevent column widths from resizing every time you refresh a PivotTable?',
        vi: 'Làm thế nào để ngăn các cột tự động co giãn kích thước mỗi khi bạn làm mới (Refresh) PivotTable?'
      },
      options: [
        { en: 'Right-click PivotTable -> PivotTable Options -> Uncheck "Autofit column widths on update"', vi: 'Nhấp chuột phải vào PivotTable -> PivotTable Options -> Bỏ chọn "Autofit column widths on update"' },
        { en: 'Lock the entire worksheet with a password', vi: 'Khóa toàn bộ trang tính bằng mật khẩu' },
        { en: 'Set columns to width 100', vi: 'Đặt độ rộng cột thành 100' },
        { en: 'Delete all blank cells', vi: 'Xóa tất cả các ô trống' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Disabling "Autofit column widths on update" prevents Excel from snapping column sizes back to default upon refresh.',
        vi: 'Bỏ chọn "Autofit column widths on update" giúp giữ nguyên độ rộng cột bạn đã căn chỉnh khi refresh.'
      },
      difficulty: 'medium',
      topicId: 'excel_pivottables'
    },
    {
      id: 'excel_l17_q10',
      type: 'single_choice',
      question: {
        en: 'What aggregation function does Excel assign by default when a text field is dragged into the Values area?',
        vi: 'Hàm tổng hợp nào được Excel gán mặc định khi kéo một trường chứa văn bản vào khu vực Values?'
      },
      options: [
        { en: 'COUNT', vi: 'COUNT' },
        { en: 'SUM', vi: 'SUM' },
        { en: 'AVERAGE', vi: 'AVERAGE' },
        { en: 'CONCATENATE', vi: 'CONCATENATE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Numeric fields default to SUM, but non-numeric/text fields automatically default to COUNT.',
        vi: 'Các trường dạng số mặc định là hàm SUM, nhưng các trường chứa chữ/văn bản sẽ tự động mặc định là hàm COUNT.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivottables'
    }
  ]
};

saveLesson('lesson17.ts', 'lesson17', lesson17);

// =========================================================================
// LESSON 18: Pivot Calculated Fields & Advanced Pivot Charts
// New ID: excel_lesson_pivot_charts
// =========================================================================
export const lesson18: Lesson = {
  id: 'excel_lesson_pivot_charts',
  order: 18,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_pivot_charts',
  title: {
    en: 'Calculated Fields, Calculated Items & Interactive Executive Pivot Charts',
    vi: 'Trường Tính Toán Calculated Fields, Calculated Items & Biểu Đồ Pivot Chart'
  },
  summary: {
    en: 'Take Pivot analytical reporting to the executive level: create custom mathematical calculations inside the Pivot engine using Calculated Fields, resolve order-of-operation aggregation nuances, build synchronized Pivot Charts, and construct polished KPI interactive dashboards.',
    vi: 'Nâng tầm báo cáo phân tích Pivot lên cấp độ quản trị: tạo các phép tính toán tùy chỉnh bên trong công cụ Pivot bằng Calculated Fields, xử lý thứ tự ưu tiên tính toán, xây dựng biểu đồ Pivot Chart đồng bộ và thiết kế bảng điều khiển KPI tương tác chuyên nghiệp.'
  },
  learn: {
    introduction: {
      en: 'Standard PivotTables can only summarize fields that already exist in the source table. Calculated Fields empower you to write custom formulas (e.g. Profit Margin = Profit / Revenue or Commission = Revenue * 0.05) directly inside the Pivot engine without bloating source worksheets with redundant calculated columns.',
      vi: 'PivotTable tiêu chuẩn chỉ có thể tổng hợp các trường đã có sẵn trong bảng nguồn. Tính năng Calculated Fields cho phép bạn viết các công thức toán học tùy chỉnh (ví dụ: Biên lợi nhuận = Lợi nhuận / Doanh thu hoặc Hoa hồng = Doanh thu * 0.05) trực tiếp bên trong bộ xử lý Pivot mà không làm phình to bảng dữ liệu gốc bằng các cột tính toán dư thừa.'
    },
    conceptExplanation: {
      en: `### 1. Calculated Fields Mechanics
- **Location**: Select PivotTable -> *PivotTable Analyze* tab -> *Fields, Items & Sets* -> **Calculated Field**.
- **Formula Syntax**: \`= Revenue * 0.10\` or \`= (Sales - Cost) / Sales\`.
- **Crucial Aggregation Rule**: Calculated Fields *always* evaluate the **SUM** of components first before performing mathematical operations.
  - \`Margin = Profit / Revenue\` becomes \`SUM(Profit) / SUM(Revenue)\` (mathematically correct weighted margin!).

### 2. Calculated Items vs Calculated Fields
- **Calculated Field**: Creates a brand new **column metric** calculated from other fields (e.g. Bonus Amount).
- **Calculated Item**: Creates a new **row/category member** inside an existing field (e.g. \`"East Coast" = "New York" + "Boston"\`).

### 3. Synchronized Pivot Charts
- Built directly on top of PivotTables.
- Automatically reflect PivotTable filtering, grouping, and Slicer clicks.
- Filter buttons directly on the chart canvas allow instant visual slicing without touching worksheet grids.

### 4. Executive Dashboard Best Practices
1. Hide redundant field buttons on Pivot Charts for a clean aesthetic.
2. Group KPI summary cards with linked Slicers.
3. Use consistent color palettes across all dashboard charts.`,
      vi: `### 1. Cơ Chế Hoạt Động Của Calculated Fields
- **Vị trí**: Chọn PivotTable -> Thẻ *PivotTable Analyze* -> *Fields, Items & Sets* -> **Calculated Field**.
- **Cú pháp công thức**: \`= Revenue * 0.10\` hoặc \`= (Sales - Cost) / Sales\`.
- **Quy tắc tổng hợp cốt lõi**: Calculated Field *luôn luôn* tính **TỔNG (SUM)** của các thành phần trước rồi mới thực hiện phép toán số học.
  - \`Margin = Profit / Revenue\` sẽ được tính là \`SUM(Profit) / SUM(Revenue)\` (biên lợi nhuận bình quân gia quyền chuẩn xác về mặt toán học!).

### 2. So Sánh Calculated Items và Calculated Fields
- **Calculated Field**: Tạo ra một **chỉ số cột số liệu** mới toanh từ các trường khác (ví dụ: Số tiền thưởng).
- **Calculated Item**: Tạo ra một **phần tử danh mục dòng** mới bên trong một trường có sẵn (ví dụ: \`"Miền Đông" = "Hà Nội" + "Hải Phòng"\`).

### 3. Biểu Đồ Pivot Chart Đồng Bộ Tương Tác
- Được xây dựng trực tiếp trên nền tảng của PivotTable.
- Tự động phản ánh các thao tác lọc, gom nhóm và nhấp chuột Slicer từ PivotTable.
- Nút lọc trực tiếp trên mặt biểu đồ cho phép lọc dữ liệu tức thì mà không cần chạm vào trang tính.

### 4. Quy Chuẩn Thiết Kế Bảng Điều Khiển Quản Trị
1. Ẩn các nút trường thừa trên Pivot Chart để tạo giao diện tinh gọn, thoáng đãng.
2. Gom nhóm các thẻ KPI tổng quan với Slicer liên kết.
3. Đồng bộ bảng màu thương hiệu trên tất cả biểu đồ.`
    },
    syntax: `# Calculated Field Formulas:
= Revenue - COGS                     (Gross Profit)
= (Revenue - COGS) / Revenue         (Gross Margin %)
= IF(Revenue > 100000, Revenue * 0.05, Revenue * 0.02) (Tiered Bonus)`,
    examples: [
      {
        title: { en: 'Creating a Dynamic Weighted Profit Margin Calculated Field', vi: 'Tạo Trường Tính Toán Biên Lợi Nhuận Bình Quân Gia Quyền' },
        code: `In Calculated Field Dialog:
Name: MarginPercent
Formula: = (Revenue - Expenses) / Revenue

Format Field as: Percentage with 1 decimal place (e.g. 24.5%)`,
        description: {
          en: 'Accurately computes weighted profit margin at every hierarchical subtotal and grand total level.',
          vi: 'Tính toán chính xác biên lợi nhuận bình quân gia quyền ở mọi cấp tổng phụ và tổng cộng toàn bộ.'
        }
      },
      {
        title: { en: 'Building an Interactive Dynamic Sales Dashboard', vi: 'Xây Dựng Bảng Điều Khiển Doanh Số Tương Tác Động' },
        code: `Components:
1. PivotTable: Sales by Product Line with Calculated Field "NetMargin"
2. Linked Pivot Chart: Clustered Column + Line combo chart
3. Slicers: Region & Sales Channel
4. Action: Connected Slicer to both chart and table via Report Connections`,
        description: {
          en: 'Delivers a responsive executive dashboard where selecting "Online Channel" updates metrics and graphs synchronously.',
          vi: 'Mang đến bảng điều khiển quản trị linh hoạt: nhấp chọn "Kênh Online" sẽ đồng bộ cập nhật cả số liệu và biểu đồ.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Attempting to use functions like COUNTIF, SUMIFS, or VLOOKUP inside a Calculated Field formula.',
          vi: 'Cố gắng sử dụng các hàm như COUNTIF, SUMIFS hoặc VLOOKUP bên trong công thức của Calculated Field.'
        },
        correction: {
          en: 'Calculated Fields only support basic arithmetic operators (+, -, *, /) and simple functions like IF(), AND(), OR(), NOT().',
          vi: 'Calculated Fields chỉ hỗ trợ các toán tử số học cơ bản (+, -, *, /) và các hàm đơn giản như IF(), AND(), OR(), NOT().'
        }
      }
    ],
    tips: [
      { en: 'Hide Pivot Chart Buttons: Select the Pivot Chart -> PivotChart Analyze tab -> click "Field Buttons" dropdown -> "Hide All" for a polished look.', vi: 'Ẩn nút trường trên biểu đồ: Chọn Pivot Chart -> Thẻ PivotChart Analyze -> bấm nút "Field Buttons" -> "Hide All" để biểu đồ chuyên nghiệp.' },
      { en: 'List Formulas Utility: Go to Fields, Items & Sets -> "List Formulas" to generate an audit sheet documenting every Calculated Field formula in the workbook!', vi: 'Xuất danh sách công thức: Chọn Fields, Items & Sets -> "List Formulas" để tự động tạo một trang tài liệu ghi lại mọi công thức Calculated Field!' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l18_ex1',
      type: 'complete_code',
      title: { en: 'Write Commission Calculated Field Formula', vi: 'Viết Công Thức Calculated Field Tính Tiền Hoa Hồng' },
      instruction: {
        en: 'Write the formula for a Calculated Field named "Commission" that pays 8% (0.08) on Revenue.',
        vi: 'Viết công thức cho trường tính toán Calculated Field có tên "Commission" trả 8% (0.08) trên Doanh thu Revenue.'
      },
      starterCode: '= Revenue * ',
      solutionCode: '= Revenue * 0.08',
      expectedOutput: '= Revenue * 0.08',
      hint: { en: '= Revenue * 0.08', vi: '= Revenue * 0.08' },
      explanation: { en: 'Calculated Fields perform arithmetic on underlying field sums.', vi: 'Calculated Fields thực hiện phép toán trên tổng của trường dữ liệu.' }
    },
    {
      id: 'excel_l18_ex2',
      type: 'complete_code',
      title: { en: 'Write Conditional Bonus Calculated Field', vi: 'Viết Công Thức Thưởng Có Điều Kiện Bằng Calculated Field' },
      instruction: {
        en: 'Write a Calculated Field formula with IF: If Revenue > 50000, award Revenue * 0.05, otherwise 0.',
        vi: 'Viết công thức Calculated Field với hàm IF: Nếu Revenue > 50000, thưởng Revenue * 0.05, ngược lại là 0.'
      },
      starterCode: '=IF(Revenue > 50000, ',
      solutionCode: '=IF(Revenue > 50000, Revenue * 0.05, 0)',
      expectedOutput: '=IF(Revenue > 50000, Revenue * 0.05, 0)',
      hint: { en: 'Pass Revenue * 0.05 for true, 0 for false.', vi: 'Truyền Revenue * 0.05 khi đúng, 0 khi sai.' },
      explanation: { en: 'IF statements are supported inside Pivot Calculated Fields.', vi: 'Câu lệnh IF được hỗ trợ bên trong Pivot Calculated Fields.' }
    }
  ],
  challenge: {
    id: 'excel_l18_challenge',
    title: { en: 'Construct Weighted Gross Margin Ratio Calculated Field', vi: 'Xây Dựng Calculated Field Tỷ Lệ Biên Lợi Nhuận Gộp' },
    description: {
      en: 'Construct the exact formula expression for a PivotTable Calculated Field named "GrossMargin" that computes profit percentage by taking Revenue minus Cost, divided by Revenue.',
      vi: 'Xây dựng biểu thức công thức chính xác cho trường Calculated Field có tên "GrossMargin" tính tỷ lệ phần trăm lợi nhuận bằng Doanh thu Revenue trừ Chi phí Cost, chia cho Doanh thu Revenue.'
    },
    requirements: [
      { en: 'Subtract Cost from Revenue in parentheses', vi: 'Lấy Revenue trừ Cost đặt trong dấu ngoặc đơn' },
      { en: 'Divide the result by Revenue', vi: 'Chia kết quả cho Revenue' }
    ],
    starterCode: '=',
    solutionCode: '=(Revenue - Cost) / Revenue',
    hints: [
      { en: '=(Revenue - Cost) / Revenue', vi: '=(Revenue - Cost) / Revenue' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l18_q1',
      type: 'single_choice',
      question: {
        en: 'How do PivotTable Calculated Fields evaluate mathematical formulas across summarized groups?',
        vi: 'Tính năng PivotTable Calculated Fields đánh giá các công thức toán học qua các nhóm tổng hợp như thế nào?'
      },
      options: [
        { en: 'It performs the operation on the SUM of each individual field (e.g. SUM(Profit) / SUM(Revenue))', vi: 'Nó thực hiện phép toán trên TỔNG (SUM) của từng trường riêng biệt (ví dụ SUM(Lợi nhuận) / SUM(Doanh thu))' },
        { en: 'It calculates row-by-row on the source table and averages them', vi: 'Nó tính từng dòng trên bảng nguồn rồi lấy trung bình cộng' },
        { en: 'It uses random sampling', vi: 'Nó lấy mẫu ngẫu nhiên' },
        { en: 'It evaluates text only', vi: 'Nó chỉ đánh giá văn bản' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Calculated Fields always sum the components first, guaranteeing mathematically weighted ratio calculations.',
        vi: 'Calculated Fields luôn tính tổng các thành phần trước, đảm bảo các tỷ lệ tính toán có trọng số chính xác.'
      },
      difficulty: 'medium',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q2',
      type: 'single_choice',
      question: {
        en: 'Which of the following functions is VALID inside a Calculated Field formula?',
        vi: 'Hàm nào sau đây là HỢP LỆ bên trong công thức của một Calculated Field?'
      },
      options: [
        { en: '`IF()`', vi: '`IF()`' },
        { en: '`VLOOKUP()`', vi: '`VLOOKUP()`' },
        { en: '`COUNTIF()`', vi: '`COUNTIF()`' },
        { en: '`SUMIFS()`', vi: '`SUMIFS()`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Calculated Fields only support basic logic (IF, AND, OR, NOT) and basic math operations; lookup and conditional aggregation functions cannot be used.',
        vi: 'Calculated Fields chỉ hỗ trợ logic cơ bản (IF, AND, OR, NOT) và các phép toán số học; các hàm tra cứu và tổng hợp có điều kiện không được hỗ trợ.'
      },
      difficulty: 'medium',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q3',
      type: 'single_choice',
      question: {
        en: 'What is the key difference between a "Calculated Field" and a "Calculated Item"?',
        vi: 'Sự khác biệt cốt lõi giữa "Calculated Field" và "Calculated Item" là gì?'
      },
      options: [
        { en: 'A Calculated Field creates a new metric column; a Calculated Item creates a new custom category row member inside an existing field', vi: 'Calculated Field tạo ra một cột chỉ số mới; Calculated Item tạo ra một hàng danh mục tùy chỉnh mới bên trong một trường có sẵn' },
        { en: 'Calculated Fields are for dates only', vi: 'Calculated Fields chỉ dùng cho ngày tháng' },
        { en: 'Calculated Items run 100x slower', vi: 'Calculated Items chạy chậm hơn 100 lần' },
        { en: 'They are identical', vi: 'Chúng hoàn toàn giống nhau' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Calculated Fields create new value metrics (columns), whereas Calculated Items create calculated categorical members within a specific row dimension.',
        vi: 'Calculated Field tạo thêm các trường chỉ số giá trị (cột), trong khi Calculated Item tạo thêm các mục danh mục tính toán bên trong một trường hàng cụ thể.'
      },
      difficulty: 'hard',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q4',
      type: 'single_choice',
      question: {
        en: 'How do you create a clear, uncluttered look for Pivot Charts intended for executive presentations?',
        vi: 'Làm thế nào để tạo giao diện trực quan tinh gọn, chuyên nghiệp cho Pivot Chart khi báo cáo cấp quản trị?'
      },
      options: [
        { en: 'PivotChart Analyze -> Field Buttons -> Hide All', vi: 'PivotChart Analyze -> Field Buttons -> Hide All' },
        { en: 'Delete the chart title', vi: 'Xóa tiêu đề biểu đồ' },
        { en: 'Make all bars gray', vi: 'Chuyển tất cả cột sang màu xám' },
        { en: 'Remove the gridlines only', vi: 'Chỉ xóa các đường lưới' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Hiding field buttons removes the grey dropdown tags from the chart surface, giving it a clean, professional aesthetic.',
        vi: 'Ẩn các nút trường sẽ gỡ bỏ các thẻ xám thả xuống trên mặt biểu đồ, mang lại giao diện tinh gọn và chuyên nghiệp.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q5',
      type: 'single_choice',
      question: {
        en: 'Which utility generates a dedicated audit worksheet documenting all Calculated Fields and formulas defined in the workbook?',
        vi: 'Công cụ nào tự động tạo một trang tính kiểm toán liệt kê tất cả các Calculated Fields và công thức đã thiết lập trong file?'
      },
      options: [
        { en: 'PivotTable Analyze -> Fields, Items & Sets -> List Formulas', vi: 'PivotTable Analyze -> Fields, Items & Sets -> List Formulas' },
        { en: 'Formulas -> Show Formulas', vi: 'Formulas -> Show Formulas' },
        { en: 'File -> Export Formulas', vi: 'File -> Export Formulas' },
        { en: 'View -> Macro Audit', vi: 'View -> Macro Audit' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'List Formulas instantly generates a new tab containing an indexed catalog of all Calculated Field formulas for auditing.',
        vi: 'List Formulas ngay lập tức tạo một tab mới chứa danh mục các công thức Calculated Field phục vụ kiểm tra đối chiếu.'
      },
      difficulty: 'hard',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q6',
      type: 'true_false',
      question: {
        en: 'True or False: Filtering a PivotTable with a Slicer automatically updates any Pivot Chart linked to that PivotTable.',
        vi: 'Đúng hay Sai: Khi lọc PivotTable bằng một nút Slicer, mọi biểu đồ Pivot Chart được liên kết với PivotTable đó sẽ tự động cập nhật theo.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Pivot Charts are dynamically bound to their source PivotTable, reflecting all filtering and slicing in real time.',
        vi: 'Đúng. Pivot Chart được liên kết động trực tiếp với PivotTable nguồn, phản ánh mọi thao tác lọc tức thì theo thời gian thực.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q7',
      type: 'single_choice',
      question: {
        en: 'What chart type is best suited for displaying total revenue on columns and profit margin percentage as a line on a secondary axis?',
        vi: 'Loại biểu đồ nào phù hợp nhất để hiển thị tổng doanh thu dạng cột và tỷ lệ biên lợi nhuận dạng đường trên trục phụ thứ hai?'
      },
      options: [
        { en: 'Combo Chart (Clustered Column + Line on Secondary Axis)', vi: 'Combo Chart (Cột nhóm Clustered Column + Đường Line trên trục phụ Secondary Axis)' },
        { en: 'Pie Chart', vi: 'Biểu đồ tròn Pie Chart' },
        { en: 'Treemap', vi: 'Biểu đồ phân nhánh Treemap' },
        { en: 'Radar Chart', vi: 'Biểu đồ Radar' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Combo charts accommodate disparate numeric scales (e.g. millions of dollars vs 15% margin) using dual axes.',
        vi: 'Biểu đồ kết hợp Combo Chart xử lý hoàn hảo hai thang đo khác biệt (hàng triệu đô la vs 15% biên lợi nhuận) bằng hai trục tọa độ.'
      },
      difficulty: 'medium',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q8',
      type: 'single_choice',
      question: {
        en: 'Can you use cell references (such as `$A$1`) inside a PivotTable Calculated Field formula?',
        vi: 'Bạn có thể sử dụng các tham chiếu ô (như `$A$1`) bên trong công thức Calculated Field của PivotTable không?'
      },
      options: [
        { en: 'No, Calculated Fields can ONLY reference field names from the dataset', vi: 'Không, Calculated Fields CHỈ có thể tham chiếu tên các trường từ tập dữ liệu' },
        { en: 'Yes, any cell coordinate can be referenced', vi: 'Có, bất kỳ tọa độ ô nào cũng tham chiếu được' },
        { en: 'Only if cell A1 is locked', vi: 'Chỉ khi ô A1 được khóa' },
        { en: 'Only in Microsoft 365', vi: 'Chỉ trong Microsoft 365' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Calculated Fields operate on the dataset schema level, so individual worksheet cell coordinates cannot be referenced.',
        vi: 'Calculated Fields hoạt động ở cấp độ cấu trúc tập dữ liệu nên không thể tham chiếu đến từng tọa độ ô trang tính đơn lẻ.'
      },
      difficulty: 'medium',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q9',
      type: 'single_choice',
      question: {
        en: 'What happens to a Calculated Field if you rename a column header in the underlying source table?',
        vi: 'Điều gì xảy ra với một Calculated Field nếu bạn đổi tên tiêu đề cột trong bảng dữ liệu nguồn bên dưới?'
      },
      options: [
        { en: 'The Calculated Field formula must be updated to reflect the new field name', vi: 'Công thức Calculated Field phải được cập nhật lại để phản ánh tên trường mới' },
        { en: 'Excel deletes the workbook', vi: 'Excel xóa bảng tính' },
        { en: 'It automatically renames itself in VBA', vi: 'Nó tự động đổi tên trong VBA' },
        { en: 'Nothing, names are ignored', vi: 'Không có gì, tên bị bỏ qua' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Renaming source headers can break Calculated Fields referencing the old header name until reconfigured.',
        vi: 'Đổi tên tiêu đề nguồn có thể làm mất kết nối công thức Calculated Field đang tham chiếu tên cũ cho đến khi cấu hình lại.'
      },
      difficulty: 'medium',
      topicId: 'excel_pivot_charts'
    },
    {
      id: 'excel_l18_q10',
      type: 'single_choice',
      question: {
        en: 'What feature allows you to filter multiple fields at once in a Pivot Chart using dynamic visual buttons?',
        vi: 'Tính năng nào cho phép bạn lọc nhiều trường cùng lúc trong Pivot Chart bằng các nút bấm trực quan động?'
      },
      options: [
        { en: 'Slicers', vi: 'Slicers' },
        { en: 'Data Bars', vi: 'Data Bars' },
        { en: 'Sparklines', vi: 'Sparklines' },
        { en: 'Goal Seek', vi: 'Goal Seek' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Slicers provide tactile, graphic interactive buttons that filter charts and tables synchronously.',
        vi: 'Slicers cung cấp các nút bấm đồ họa tương tác giúp lọc đồng bộ cả biểu đồ và bảng dữ liệu.'
      },
      difficulty: 'easy',
      topicId: 'excel_pivot_charts'
    }
  ]
};

saveLesson('lesson18.ts', 'lesson18', lesson18);

// Create Intermediate Module 02 index
const intMod02IndexCode = `import { Lesson } from '../../../../types';
import { lesson14 } from './lesson14';
import { lesson15 } from './lesson15';
import { lesson16 } from './lesson16';
import { lesson17 } from './lesson17';
import { lesson18 } from './lesson18';

export { lesson14 } from './lesson14';
export { lesson15 } from './lesson15';
export { lesson16 } from './lesson16';
export { lesson17 } from './lesson17';
export { lesson18 } from './lesson18';

export const module02Lessons: Lesson[] = [
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
];

export default module02Lessons;
`;

fs.writeFileSync(path.join(intMod02Dir, 'index.ts'), intMod02IndexCode, 'utf8');

// Create Intermediate level index
const intLevelIndexCode = `import { Lesson } from '../../../types';
import { module01Lessons } from './module01';
import { module02Lessons } from './module02';

export * from './module01';
export * from './module02';

export const intermediateLessons: Lesson[] = [
  ...module01Lessons,
  ...module02Lessons,
];

export default intermediateLessons;
`;

const intDir = path.join(process.cwd(), 'src/data/excel/intermediate');
fs.writeFileSync(path.join(intDir, 'index.ts'), intLevelIndexCode, 'utf8');
console.log('Intermediate level completed (Lessons 09-18, 10 lessons total).');
