import { Lesson } from '../../../../types';

export const lesson09: Lesson = {
  id: 'html_lesson_9',
  moduleId: 'html_mod_3',
  levelId: 'intermediate',
  courseId: 'html',
  order: 9,
  topicId: 'html_tables',
  title: {
    en: 'Semantic Tables: caption, thead, tbody, th, scope & Complex Tables',
    vi: 'Bảng Dữ Liệu Ngữ Nghĩa: caption, thead, tbody, th, scope & Bảng Phức Tạp'
  },
  summary: {
    en: 'Master semantic tabular markup: <table>, <caption>, <thead>, <tbody>, <tfoot>, <colgroup>, <col>, cell spanning with colspan and rowspan, and programmatic header associations with <th scope="col|row"> and id/headers attributes for screen reader accessibility.',
    vi: 'Làm chủ cấu trúc bảng dữ liệu ngữ nghĩa: <table>, <caption>, <thead>, <tbody>, <tfoot>, <colgroup>, <col>, gộp ô với colspan và rowspan, cùng kỹ thuật liên kết tiêu đề với <th scope="col|row"> và id/headers chuẩn trợ năng.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Tables in modern web engineering are strictly reserved for multidimensional relational data (spreadsheets, financial statements, schedules)—never for page layout. Constructing accessible tables ensures screen reader users can understand complex data relationships cell by cell.',
      vi: 'Bảng trong kỹ nghệ web hiện đại chỉ dùng cho dữ liệu quan hệ đa chiều (bảng tính, báo cáo tài chính, lịch trình)—tuyệt đối không dùng để chia layout trang. Xây dựng bảng chuẩn trợ năng giúp người dùng trình đọc màn hình dễ dàng nắm bắt dữ liệu từng ô.'
    },
    conceptExplanation: {
      en: '1. **Table Anatomy**:\n   - `<table>`: Root container.\n   - `<caption>`: Accessible programmatic title describing the table content. MUST be placed immediately after opening `<table>`.\n   - `<thead>`: Column header rows.\n   - `<tbody>`: Data rows.\n   - `<tfoot>`: Summary or aggregate rows (totals, averages).\n\n2. **Header Associations (`<th scope="...">`)**:\n   - `scope="col"`: Declares a header for all cells in that column.\n   - `scope="row"`: Declares a header for all cells in that row.\n   - Screen readers vocalize these header names whenever the user moves focus into a corresponding data cell (`<td>`).\n\n3. **Spanning Cells**:\n   - `colspan="N"`: Merges a cell across N columns.\n   - `rowspan="N"`: Merges a cell across N rows.\n\n4. **Column Styling & Performance**:\n   - `<colgroup>` and `<col span="2" class="...">` allow styling entire columns without repeating classes across thousands of `<td>` cells.\n\n5. **Complex Multi-Level Tables**:\n   - For deeply nested multi-level tables, use `id` on each `<th>` and `headers="header1 header2"` on `<td>` cells to establish explicit programmatic relationships.',
      vi: '1. **Giải phẫu cấu trúc bảng**:\n   - `<table>`: Khung bao bọc gốc.\n   - `<caption>`: Tiêu đề mô tả bảng cho trợ năng. BẮT BUỘC đặt ngay sau thẻ mở `<table>`.\n   - `<thead>`: Hàng chứa tiêu đề cột.\n   - `<tbody>`: Các hàng chứa dữ liệu.\n   - `<tfoot>`: Hàng tổng kết hoặc thống kê (tổng cộng, trung bình).\n\n2. **Liên kết tiêu đề (`<th scope="...">`)**:\n   - `scope="col"`: Tiêu đề cho toàn bộ cột tương ứng.\n   - `scope="row"`: Tiêu đề cho toàn bộ hàng tương ứng.\n   - Trình đọc màn hình sẽ đọc tên tiêu đề này mỗi khi người dùng di chuyển vào ô dữ liệu (`<td>`).\n\n3. **Gộp ô**:\n   - `colspan="N"`: Gộp ô qua N cột.\n   - `rowspan="N"`: Gộp ô qua N hàng.\n\n4. **Định kiểu cột (`<colgroup>`)**:\n   - `<colgroup>` và `<col>` cho phép định kiểu cả cột mà không cần lặp lại class trên hàng nghìn ô `<td>`.\n\n5. **Bảng phức tạp đa cấp**:\n   - Với bảng có nhiều tầng tiêu đề lồng nhau, dùng `id` trên `<th>` và `headers="id1 id2"` trên `<td>` để thiết lập quan hệ dữ liệu rõ ràng.'
    },
    syntax: `<table>
  <caption>Quarterly Revenue Summary (USD in Millions)</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North America</th>
      <td>$12.4M</td>
      <td>$14.8M</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$12.4M</td>
      <td>$14.8M</td>
    </tr>
  </tfoot>
</table>`,
    examples: [
      {
        title: {
          en: 'Complex Accessible Financial Table with Spans',
          vi: 'Bảng Tài Chính Phức Tạp Chuẩn Trợ Năng Với Gộp Ô'
        },
        code: `<table>
  <caption>Q3 Cloud Services Billing Breakdown</caption>
  <colgroup>
    <col class="col-service">
    <col span="2" class="col-metrics">
    <col class="col-cost">
  </colgroup>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Service Name</th>
      <th scope="colgroup" colspan="2">Resource Usage</th>
      <th scope="col" rowspan="2">Monthly Cost</th>
    </tr>
    <tr>
      <th scope="col">CPU Hours</th>
      <th scope="col">Storage (GB)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Compute Engine</th>
      <td>1,420 hrs</td>
      <td>500 GB</td>
      <td>$184.20</td>
    </tr>
    <tr>
      <th scope="row">Cloud SQL</th>
      <td>720 hrs</td>
      <td>250 GB</td>
      <td>$95.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="3">Total Accrued</th>
      <td>$279.20</td>
    </tr>
  </tfoot>
</table>`,
        language: 'html',
        explanation: {
          en: 'Demonstrates colgroup, colspan, rowspan, scope="colgroup", and scope="row" for multi-tiered financial reports.',
          vi: 'Minh họa colgroup, colspan, rowspan, scope="colgroup" và scope="row" cho báo cáo tài chính nhiều tầng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using <table> purely for visual page grid layouts',
          vi: 'Dùng thẻ <table> để chia cột giao diện trang web'
        },
        correction: {
          en: 'Never use tables for layout. Use CSS Grid and Flexbox for design, and reserve <table> strictly for tabular relational datasets.',
          vi: 'Tuyệt đối không dùng table để chia layout. Dùng CSS Grid và Flexbox cho giao diện và chỉ dùng <table> cho dữ liệu dạng bảng quan hệ.'
        },
        code: '<!-- Correct: Use CSS Grid for layout, <table> for data tables -->'
      },
      {
        mistake: {
          en: 'Omitting scope attributes on <th> elements',
          vi: 'Không khai báo thuộc tính scope trên thẻ <th>'
        },
        correction: {
          en: 'Always include scope="col" or scope="row" so screen readers can disambiguate row vs column header relationships.',
          vi: 'Luôn thêm scope="col" hoặc scope="row" để trình đọc màn hình phân biệt rõ tiêu đề hàng và cột.'
        },
        code: '<!-- Correct: <th scope="col">Email</th> -->'
      }
    ],
    tips: [
      {
        en: 'The <caption> element must always be the first child inside <table> to ensure screen readers announce the table context immediately.',
        vi: 'Thẻ <caption> luôn phải là phần tử con đầu tiên trong <table> để trình đọc màn hình thông báo tên bảng trước khi đọc dữ liệu.'
      }
    ],
    practice: {
      task: {
        en: 'Build an Accessible Tabular Report',
        vi: 'Xây Dựng Bảng Dữ Liệu Chuẩn Trợ Năng'
      },
      instruction: {
        en: 'Create a semantic <table> with a <caption> "Server Performance Metrics", a <thead> containing <th scope="col">Host</th> and <th scope="col">Uptime</th>, a <tbody> with a row containing <th scope="row">Web-01</th> and <td>99.98%</td>, and a <tfoot> with a summary total.',
        vi: 'Tạo thẻ <table> có <caption> "Server Performance Metrics", <thead> chứa <th scope="col">Host</th> và <th scope="col">Uptime</th>, <tbody> chứa hàng có <th scope="row">Web-01</th> và <td>99.98%</td>, và <tfoot> tổng kết.'
      },
      starterCode: '<!-- Build table here -->\n',
      solutionCode: `<table>
  <caption>Server Performance Metrics</caption>
  <thead>
    <tr>
      <th scope="col">Host</th>
      <th scope="col">Uptime</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Web-01</th>
      <td>99.98%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Average</th>
      <td>99.98%</td>
    </tr>
  </tfoot>
</table>`,
      requiredPatterns: [
        '<table>',
        '<caption>Server Performance Metrics</caption>',
        '<thead>',
        '<th scope="col">Host</th>',
        '<th scope="col">Uptime</th>',
        '<tbody>',
        '<th scope="row">Web-01</th>',
        '<tfoot>',
        '</table>'
      ],
      hint: {
        en: 'Follow the order: caption, thead, tbody, tfoot. Ensure all th tags have scope attributes.',
        vi: 'Tuân thủ thứ tự: caption, thead, tbody, tfoot. Đảm bảo tất cả thẻ th đều có thuộc tính scope.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Implement a Multi-Column Spanned Schedule Table',
        vi: 'Triển Khai Bảng Lịch Trình Có Gộp Nhiều Cột'
      },
      instruction: {
        en: 'Construct a <table> with a caption, a <thead> with 3 column headers ("Time", "Room A", "Room B"), and a <tbody> row where a keynote spans both rooms with colspan="2".',
        vi: 'Tạo <table> có caption, <thead> gồm 3 cột ("Time", "Room A", "Room B") và hàng <tbody> có bài phát biểu gộp cả 2 phòng với colspan="2".'
      },
      starterCode: '<!-- Build spanned schedule table -->\n',
      solutionCode: `<table>
  <caption>Conference Session Schedule</caption>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Room A</th>
      <th scope="col">Room B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">09:00 - 10:30</th>
      <td colspan="2">Keynote Address: Future of Web Semantics</td>
    </tr>
  </tbody>
</table>`,
      requiredPatterns: [
        '<table>',
        '<caption>Conference Session Schedule</caption>',
        '<th scope="col">Time</th>',
        '<th scope="row">09:00 - 10:30</th>',
        '<td colspan="2">'
      ],
      hint: {
        en: 'Use <td colspan="2"> to span across both room columns.',
        vi: 'Dùng <td colspan="2"> để gộp cả 2 cột phòng.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_6_1',
      type: 'complete_code',
      title: {
        en: 'Add Missing Caption and Scope Attributes',
        vi: 'Thêm Caption Và Thuộc Tính Scope Còn Thiếu'
      },
      instruction: {
        en: 'Add <caption>Monthly Budget</caption> immediately after <table>, and add scope="col" to both <th> elements.',
        vi: 'Thêm <caption>Monthly Budget</caption> ngay sau <table> và thêm scope="col" vào cả hai thẻ <th>.'
      },
      starterCode: `<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Amount</th>
    </tr>
  </thead>
</table>`,
      solutionCode: `<table>
  <caption>Monthly Budget</caption>
  <thead>
    <tr>
      <th scope="col">Category</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
</table>`,
      hint: {
        en: 'Place <caption> as the first child of <table> and use scope="col" on column headers.',
        vi: 'Đặt <caption> làm con đầu tiên của <table> và dùng scope="col" cho tiêu đề cột.'
      },
      explanation: {
        en: 'Caption provides context and scope="col" assists screen reader data traversal.',
        vi: 'Caption cung cấp ngữ cảnh và scope="col" hỗ trợ trình đọc màn hình duyệt dữ liệu.'
      }
    },
    {
      id: 'html_ex_6_2',
      type: 'fix_code',
      title: {
        en: 'Fix Incorrect Table Tag Nesting Order',
        vi: 'Sửa Thứ Tự Lồng Thẻ Bảng Chưa Đúng'
      },
      instruction: {
        en: 'Fix the table structure so <thead> appears before <tbody>.',
        vi: 'Sửa cấu trúc bảng để <thead> xuất hiện trước <tbody>.'
      },
      starterCode: `<table>
  <tbody>
    <tr><td>Data 1</td></tr>
  </tbody>
  <thead>
    <tr><th scope="col">Header 1</th></tr>
  </thead>
</table>`,
      solutionCode: `<table>
  <thead>
    <tr><th scope="col">Header 1</th></tr>
  </thead>
  <tbody>
    <tr><td>Data 1</td></tr>
  </tbody>
</table>`,
      hint: {
        en: 'Reorder so <thead> comes before <tbody>.',
        vi: 'Sắp xếp lại để <thead> đứng trước <tbody>.'
      },
      explanation: {
        en: 'The standard semantic order is <caption>, <thead>, <tbody>, and <tfoot>.',
        vi: 'Thứ tự ngữ nghĩa chuẩn là <caption>, <thead>, <tbody> và <tfoot>.'
      }
    },
    {
      id: 'html_ex_6_3',
      type: 'write_code',
      title: {
        en: 'Write Two-Row Spanned Cell in Table',
        vi: 'Tạo Ô Gộp Hai Hàng Trong Bảng'
      },
      instruction: {
        en: 'Write a table row with a row header <th scope="row" rowspan="2">Hosting Plan</th> and <td>Standard $10</td>.',
        vi: 'Viết một hàng bảng có tiêu đề hàng <th scope="row" rowspan="2">Hosting Plan</th> và <td>Standard $10</td>.'
      },
      starterCode: '<!-- Write tr with rowspan th -->\n',
      solutionCode: `<tr>
  <th scope="row" rowspan="2">Hosting Plan</th>
  <td>Standard $10</td>
</tr>`,
      hint: {
        en: 'Use <th scope="row" rowspan="2">Hosting Plan</th> inside a <tr>.',
        vi: 'Dùng <th scope="row" rowspan="2">Hosting Plan</th> bên trong <tr>.'
      },
      explanation: {
        en: 'rowspan="2" merges the cell across two vertical rows.',
        vi: 'rowspan="2" gộp ô dọc theo 2 hàng.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_6',
    title: {
      en: 'Multi-Dimensional Global Financial Ledger',
      vi: 'Bảng Kế Toán Tài Chính Đa Chiều Toàn Cầu'
    },
    description: {
      en: 'Construct a complex multi-dimensional financial statement table with colgroup styling tags, nested column groupings, multi-row spans, scope mappings, and an aggregate summary footer.',
      vi: 'Xây dựng bảng báo cáo tài chính đa chiều phức tạp gồm colgroup, phân nhóm cột lồng nhau, gộp hàng, ánh xạ scope và chân bảng tổng kết.'
    },
    requirements: [
      {
        en: '<table> with descriptive <caption>',
        vi: 'Thẻ <table> có <caption> mô tả'
      },
      {
        en: '<colgroup> defining column widths and styling classes',
        vi: '<colgroup> định nghĩa độ rộng và class'
      },
      {
        en: '<thead> with 2 header rows demonstrating colspan and rowspan',
        vi: '<thead> có 2 hàng tiêu đề thể hiện colspan và rowspan'
      },
      {
        en: 'All headers have explicit scope="col", scope="row", or scope="colgroup"',
        vi: 'Tất cả header có scope="col", scope="row" hoặc scope="colgroup"'
      },
      {
        en: '<tbody> with data rows and <tfoot> with total calculations',
        vi: '<tbody> chứa các hàng dữ liệu và <tfoot> chứa tổng kết'
      }
    ],
    starterCode: '<!-- Build multi-dimensional financial table -->\n',
    solutionCode: `<table class="financial-statement">
  <caption>FY2026 Global Segment Revenue & Operating Margin (in Millions USD)</caption>
  <colgroup>
    <col class="col-segment">
    <col span="2" class="col-metrics">
    <col class="col-margin">
  </colgroup>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Operating Segment</th>
      <th scope="colgroup" colspan="2">Revenue Stream</th>
      <th scope="col" rowspan="2">Operating Margin</th>
    </tr>
    <tr>
      <th scope="col">Subscription</th>
      <th scope="col">Enterprise License</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Cloud Infrastructure</th>
      <td>$4,120M</td>
      <td>$1,850M</td>
      <td>32.4%</td>
    </tr>
    <tr>
      <th scope="row">Developer Tooling</th>
      <td>$1,240M</td>
      <td>$620M</td>
      <td>28.1%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total Consolidated</th>
      <td>$5,360M</td>
      <td>$2,470M</td>
      <td>31.2%</td>
    </tr>
  </tfoot>
</table>`,
    hints: [
      {
        en: 'Ensure <caption> is first, followed by <colgroup>, <thead>, <tbody>, and <tfoot>.',
        vi: 'Đảm bảo <caption> đứng đầu, theo sau bởi <colgroup>, <thead>, <tbody> và <tfoot>.'
      }
    ],
    solutionExplanation: {
      en: 'Implements WCAG compliant tabular data architecture capable of screen reader column and row header announcements.',
      vi: 'Triển khai cấu trúc bảng tuân thủ WCAG cho phép trình đọc màn hình phát âm tiêu đề hàng và cột chính xác.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_6_1',
      type: 'single_choice',
      question: {
        en: 'What is the mandatory placement for the <caption> element in an HTML5 table?',
        vi: 'Vị trí bắt buộc của thẻ <caption> trong bảng HTML5 là ở đâu?'
      },
      options: [
        {
          en: 'Immediately after the opening <table> tag, before <thead> or <tbody>',
          vi: 'Ngay sau thẻ mở <table>, trước thẻ <thead> hoặc <tbody>'
        },
        {
          en: 'Inside the first <th> cell of <thead>',
          vi: 'Bên trong ô <th> đầu tiên của <thead>'
        },
        {
          en: 'At the very end of <tfoot>',
          vi: 'Ở vị trí cuối cùng của <tfoot>'
        },
        {
          en: 'In an external CSS file',
          vi: 'Trong tệp CSS bên ngoài'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'W3C HTML standards mandate that <caption> must be the very first child of <table>.',
        vi: 'Tiêu chuẩn W3C HTML quy định <caption> phải luôn là phần tử con đầu tiên của <table>.'
      },
      topicId: 'html_tables',
      difficulty: 'easy'
    },
    {
      id: 'html_q_6_2',
      type: 'single_choice',
      question: {
        en: 'What does <th scope="row"> indicate to assistive technologies?',
        vi: '<th scope="row"> thông báo điều gì cho các công nghệ trợ thính?'
      },
      options: [
        {
          en: 'This header cell provides the title and context for all subsequent data cells in the same horizontal row',
          vi: 'Ô tiêu đề này cung cấp tên gọi và ngữ cảnh cho toàn bộ các ô dữ liệu trong cùng hàng ngang đó'
        },
        {
          en: 'The entire row should be highlighted in yellow',
          vi: 'Toàn bộ hàng sẽ được tô vàng'
        },
        {
          en: 'The row is read-only and cannot be submitted in forms',
          vi: 'Hàng này là chỉ đọc và không thể gửi trong form'
        },
        {
          en: 'The row should be sorted alphabetically',
          vi: 'Hàng này phải được sắp xếp theo bảng chữ cái'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'scope="row" associates the header with all cells in the corresponding row.',
        vi: 'scope="row" liên kết tiêu đề với tất cả các ô trong cùng hàng đó.'
      },
      topicId: 'html_tables',
      difficulty: 'easy'
    },
    {
      id: 'html_q_6_3',
      type: 'single_choice',
      question: {
        en: 'What attribute allows a table cell to span across multiple columns horizontally?',
        vi: 'Thuộc tính nào cho phép một ô bảng gộp qua nhiều cột theo chiều ngang?'
      },
      options: [
        {
          en: 'colspan',
          vi: 'colspan'
        },
        {
          en: 'rowspan',
          vi: 'rowspan'
        },
        {
          en: 'span',
          vi: 'span'
        },
        {
          en: 'col-width',
          vi: 'col-width'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'colspan="N" merges the cell horizontally across N columns.',
        vi: 'colspan="N" gộp ô theo chiều ngang qua N cột.'
      },
      topicId: 'html_tables',
      difficulty: 'easy'
    },
    {
      id: 'html_q_6_4',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the <colgroup> and <col> elements?',
        vi: 'Mục đích của các phần tử <colgroup> và <col> là gì?'
      },
      options: [
        {
          en: 'Defines structural column groups to apply column-level CSS styling and widths without repeating classes on every individual <td> cell',
          vi: 'Định nghĩa các nhóm cột để áp dụng định kiểu CSS và độ rộng cho cả cột mà không cần lặp lại class trên từng ô <td>'
        },
        {
          en: 'Generates automatic bar charts from table data',
          vi: 'Tự động tạo biểu đồ cột từ dữ liệu bảng'
        },
        {
          en: 'Translates table headers into multiple languages',
          vi: 'Dịch tiêu đề bảng sang nhiều ngôn ngữ'
        },
        {
          en: 'Calculates the mathematical sum of all numeric columns',
          vi: 'Tính tổng giá trị các cột số'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<colgroup> allows formatting entire columns efficiently.',
        vi: '<colgroup> cho phép định dạng và căn chỉnh toàn bộ các cột một cách tối ưu.'
      },
      topicId: 'html_tables',
      difficulty: 'medium'
    },
    {
      id: 'html_q_6_5',
      type: 'single_choice',
      question: {
        en: 'Why should developers NEVER use <table> elements for page layout?',
        vi: 'Tại sao lập trình viên TUYỆT ĐỐI KHÔNG nên dùng thẻ <table> để chia bố cục giao diện trang web?'
      },
      options: [
        {
          en: 'It destroys accessibility by confusing screen readers, breaks responsive mobile styling, and harms SEO ranking',
          vi: 'Nó phá vỡ khả năng tiếp cận của trình đọc màn hình, làm hỏng giao diện đáp ứng trên di động và ảnh hưởng xấu đến SEO'
        },
        {
          en: 'Because tables cannot display images or text',
          vi: 'Vì bảng không thể hiển thị hình ảnh hay văn bản'
        },
        {
          en: 'Because tables are blocked by ad blockers',
          vi: 'Vì bảng bị các trình chặn quảng cáo vô hiệu hóa'
        },
        {
          en: 'Because CSS cannot style table borders',
          vi: 'Vì CSS không thể đổi màu viền bảng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Tables are strictly for relational data. Layouts should always use CSS Flexbox and CSS Grid.',
        vi: 'Bảng chỉ dùng cho dữ liệu quan hệ. Bố cục giao diện phải dùng CSS Flexbox và Grid.'
      },
      topicId: 'html_tables',
      difficulty: 'easy'
    },
    {
      id: 'html_q_6_6',
      type: 'single_choice',
      question: {
        en: 'Which element is used to group the summary or aggregate footer rows of a table?',
        vi: 'Thẻ nào được dùng để nhóm các hàng tổng kết hoặc thống kê ở chân bảng?'
      },
      options: [
        {
          en: '<tfoot>',
          vi: '<tfoot>'
        },
        {
          en: '<footer>',
          vi: '<footer>'
        },
        {
          en: '<bottom>',
          vi: '<bottom>'
        },
        {
          en: '<summary>',
          vi: '<summary>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<tfoot> encapsulates table summary rows. <footer> is a page-level structural landmark.',
        vi: '<tfoot> dùng cho hàng chân bảng. Thẻ <footer> là vùng mốc cấp trang.'
      },
      topicId: 'html_tables',
      difficulty: 'easy'
    },
    {
      id: 'html_q_6_7',
      type: 'single_choice',
      question: {
        en: 'How do you explicitly associate a data cell with multiple complex headers in advanced multi-tiered tables?',
        vi: 'Làm thế nào để liên kết tường minh một ô dữ liệu với nhiều tiêu đề phân cấp phức tạp trong bảng?'
      },
      options: [
        {
          en: 'Give each <th> an id attribute and assign a space-separated list of those IDs to the headers attribute on the <td> cell',
          vi: 'Gán thuộc tính id cho mỗi thẻ <th> và liệt kê các id đó cách nhau bằng dấu cách trong thuộc tính headers của thẻ <td>'
        },
        {
          en: 'Use the for attribute on <td> matching the class of <th>',
          vi: 'Dùng thuộc tính for trên <td> khớp với class của <th>'
        },
        {
          en: 'Wrap each cell in a <label> element',
          vi: 'Bọc mỗi ô trong một thẻ <label>'
        },
        {
          en: 'Use data-header="name" on the <tr> row',
          vi: 'Dùng data-header="name" trên thẻ <tr>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The headers attribute on <td> lists the IDs of all applicable <th> header cells.',
        vi: 'Thuộc tính headers trên <td> chứa danh sách các id của những thẻ <th> tiêu đề liên quan.'
      },
      topicId: 'html_tables',
      difficulty: 'hard'
    },
    {
      id: 'html_q_6_8',
      type: 'single_choice',
      question: {
        en: 'What is the default text alignment and font weight applied by browsers to <th> elements?',
        vi: 'Định dạng canh lề và độ đậm chữ mặc định mà trình duyệt áp dụng cho thẻ <th> là gì?'
      },
      options: [
        {
          en: 'Centered text (text-align: center) and bold font weight (font-weight: bold)',
          vi: 'Căn giữa (text-align: center) và in đậm (font-weight: bold)'
        },
        {
          en: 'Left-aligned text and normal font weight',
          vi: 'Căn trái và chữ bình thường'
        },
        {
          en: 'Right-aligned text and italic font style',
          vi: 'Căn phải và chữ in nghiêng'
        },
        {
          en: 'Justified text with underline',
          vi: 'Căn đều hai bên và có gạch chân'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'User agent default stylesheets render <th> as bold and centered.',
        vi: 'Style mặc định của trình duyệt hiển thị <th> là in đậm và căn giữa.'
      },
      topicId: 'html_tables',
      difficulty: 'easy'
    },
    {
      id: 'html_q_6_9',
      type: 'single_choice',
      question: {
        en: 'What attribute allows a table cell to span multiple vertical rows?',
        vi: 'Thuộc tính nào cho phép một ô bảng gộp qua nhiều hàng theo chiều dọc?'
      },
      options: [
        {
          en: 'rowspan',
          vi: 'rowspan'
        },
        {
          en: 'colspan',
          vi: 'colspan'
        },
        {
          en: 'row-merge',
          vi: 'row-merge'
        },
        {
          en: 'vertical-span',
          vi: 'vertical-span'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'rowspan="N" merges the cell vertically across N rows.',
        vi: 'rowspan="N" gộp ô theo chiều dọc qua N hàng.'
      },
      topicId: 'html_tables',
      difficulty: 'easy'
    },
    {
      id: 'html_q_6_10',
      type: 'single_choice',
      question: {
        en: 'What value should scope have when a header cell spans across a group of columns?',
        vi: 'Thuộc tính scope nên có giá trị gì khi một ô tiêu đề gộp qua một nhóm nhiều cột?'
      },
      options: [
        {
          en: 'scope="colgroup"',
          vi: 'scope="colgroup"'
        },
        {
          en: 'scope="all"',
          vi: 'scope="all"'
        },
        {
          en: 'scope="cols"',
          vi: 'scope="cols"'
        },
        {
          en: 'scope="group"',
          vi: 'scope="group"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'scope="colgroup" indicates that the header cell spans and describes a column group.',
        vi: 'scope="colgroup" biểu thị rằng ô tiêu đề này bao trùm và mô tả cho một nhóm cột.'
      },
      topicId: 'html_tables',
      difficulty: 'medium'
    }
  ]
};

export default lesson09;
