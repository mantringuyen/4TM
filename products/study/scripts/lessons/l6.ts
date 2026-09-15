import { RawLessonSource } from './rawLessonType';

export const lesson6: RawLessonSource = {
  order: 6,
  id: 'html_lesson_6',
  moduleId: 'html_mod_2',
  levelId: 'basic',
  topicId: 'html_tables',
  titleEn: 'Tabular Data: Accessible HTML5 Tables & Scope Semantics',
  titleVi: 'Dữ Liệu Bảng: Cấu Trúc Table Chuẩn Trợ Năng & Ngữ Nghĩa Scope',
  summaryEn: 'Master semantic tabular markup: <table>, <caption>, <thead>, <tbody>, <tfoot>, <colgroup>, and header associations with <th scope="col|row">.',
  summaryVi: 'Làm chủ cấu trúc bảng dữ liệu: <table>, <caption>, <thead>, <tbody>, <tfoot>, <colgroup>, và liên kết tiêu đề cột/dòng với <th scope="col|row">.',
  estimatedMinutes: 15,
  introEn: 'Tables in modern HTML are reserved strictly for presenting structured, multi-dimensional relational data—never for page layout.',
  introVi: 'Trong HTML hiện đại, bảng được dùng riêng cho việc trình bày dữ liệu dạng lưới đa chiều—tuyệt đối không dùng bảng để chia cột giao diện trang web.',
  conceptEn: 'An accessible table begins with a descriptive <caption> immediately after <table>. Structure data using <thead> for column headers, <tbody> for data records, and <tfoot> for summaries/totals. Use <th> with scope="col" (column header) or scope="row" (row header) so screen readers can announce the correct header context when users navigate individual <td> cells. Use colspan and rowspan to span multiple cells.',
  conceptVi: 'Một bảng chuẩn trợ năng luôn bắt đầu bằng <caption> mô tả tiêu đề bảng ngay sau <table>. Cấu trúc bảng chia thành <thead> (tiêu đề cột), <tbody> (dữ liệu dòng), và <tfoot> (tổng kết). Sử dụng <th> kèm scope="col" (tiêu đề cột) hoặc scope="row" (tiêu đề dòng) để trình đọc màn hình đọc đúng ngữ cảnh khi di chuyển qua các ô <td>. Dùng colspan và rowspan để gộp ô.',
  syntax: '<table>\n  <caption>Financial Quarterly Summary 2026</caption>\n  <thead>\n    <tr>\n      <th scope="col">Quarter</th>\n      <th scope="col">Revenue</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Q1</th>\n      <td>$125,000</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope="row">Total</th>\n      <td>$125,000</td>\n    </tr>\n  </tfoot>\n</table>',
  ex1TitleEn: 'Accessible Employee Directory Table with Headers and Scope',
  ex1TitleVi: 'Bảng Danh Sách Nhân Viên Chuẩn Trợ Năng Với Scope',
  ex1Code: '<table style="width:100%; border-collapse:collapse; text-align:left; font-family:sans-serif;">\n  <caption style="font-weight:bold; margin-bottom:8px; caption-side:top;">Active Engineering Team Roster</caption>\n  <thead>\n    <tr style="background:#f1f5f9; border-bottom:2px solid #cbd5e1;">\n      <th scope="col" style="padding:8px;">ID</th>\n      <th scope="col" style="padding:8px;">Name</th>\n      <th scope="col" style="padding:8px;">Role</th>\n      <th scope="col" style="padding:8px;">Status</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style="border-bottom:1px solid #e2e8f0;">\n      <th scope="row" style="padding:8px;">#101</th>\n      <td style="padding:8px;">Alex Rivera</td>\n      <td style="padding:8px;">Lead Architect</td>\n      <td style="padding:8px; color:#16a34a; font-weight:600;">Active</td>\n    </tr>\n    <tr style="border-bottom:1px solid #e2e8f0;">\n      <th scope="row" style="padding:8px;">#102</th>\n      <td style="padding:8px;">Mai Nguyen</td>\n      <td style="padding:8px;">Senior Frontend</td>\n      <td style="padding:8px; color:#16a34a; font-weight:600;">Active</td>\n    </tr>\n  </tbody>\n</table>',
  ex1ExpEn: 'Includes <caption> and uses <th scope="col"> for table columns and <th scope="row"> for record IDs, ensuring complete screen reader clarity.',
  ex1ExpVi: 'Bao gồm <caption> và dùng <th scope="col"> cho cột, <th scope="row"> cho mã ID, đảm bảo trình đọc màn hình giải thích đầy đủ.',
  ex2TitleEn: 'Pricing Matrix with Colspan and Rowspan',
  ex2TitleVi: 'Bảng Giá Dịch Vụ Với Gộp Cột Colspan Và Gộp Dòng Rowspan',
  ex2Code: '<table style="border-collapse:collapse; width:100%;">\n  <caption>Hosting Plans Matrix</caption>\n  <thead>\n    <tr>\n      <th scope="col" rowspan="2">Plan</th>\n      <th scope="col" colspan="2">Specs</th>\n      <th scope="col" rowspan="2">Price</th>\n    </tr>\n    <tr>\n      <th scope="col">Storage</th>\n      <th scope="col">Bandwidth</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Starter</th>\n      <td>20 GB</td>\n      <td>Unlimited</td>\n      <td>$9/mo</td>\n    </tr>\n  </tbody>\n</table>',
  ex2ExpEn: 'Demonstrates multi-level headers using rowspan="2" for single vertical categories and colspan="2" for grouped sub-headers.',
  ex2ExpVi: 'Minh họa tiêu đề nhiều tầng bằng rowspan="2" cho danh mục dọc và colspan="2" cho nhóm tiêu đề con.',
  mistake1En: 'Using <table> for overall website page grid layouts',
  mistake1Vi: 'Sử dụng <table> để chia cột dàn trang bố cục giao diện website',
  correction1En: 'Never use tables for design layout; use CSS Flexbox or CSS Grid. Use <table> only for actual tabular data.',
  correction1Vi: 'Tuyệt đối không dùng table để chia layout; hãy dùng CSS Flexbox/Grid. Chỉ dùng <table> cho dữ liệu bảng biểu thực sự.',
  mistake2En: 'Omitting scope on <th> elements in complex multi-header tables',
  mistake2Vi: 'Quên khai báo thuộc tính scope trên thẻ <th> trong bảng có nhiều hàng/cột',
  correction2En: 'Always declare scope="col" or scope="row" to explicitly tell assistive tech which direction the header applies to.',
  correction2Vi: 'Luôn khai báo scope="col" hoặc scope="row" để chỉ rõ cho công nghệ trợ thính phạm vi áp dụng của tiêu đề.',
  tipEn: 'The <caption> element must be the very first child of the <table> element, directly preceding <thead> or <tbody>.',
  tipVi: 'Thẻ <caption> bắt buộc phải là phần tử con đầu tiên của <table>, đứng ngay trước <thead> hoặc <tbody>.',
  practiceTaskEn: 'Construct an Accessible Sales Report Table',
  practiceTaskVi: 'Xây dựng bảng báo cáo bán hàng chuẩn trợ năng',
  practiceInstEn: 'Create a <table> with a <caption>Sales Summary</caption>, a <thead> with 2 column headers (<th scope="col">Region</th>, <th scope="col">Total</th>), and a <tbody> with a row (<th scope="row">North</th>, <td>$50,000</td>).',
  practiceInstVi: 'Tạo thẻ <table> có <caption>Sales Summary</caption>, phần <thead> gồm 2 tiêu đề cột (<th scope="col">Region</th>, <th scope="col">Total</th>), và phần <tbody> với 1 dòng (<th scope="row">North</th>, <td>$50,000</td>).',
  practiceStarter: '<table>\n  \n</table>',
  practiceSolution: '<table>\n  <caption>Sales Summary</caption>\n  <thead>\n    <tr>\n      <th scope="col">Region</th>\n      <th scope="col">Total</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">North</th>\n      <td>$50,000</td>\n    </tr>\n  </tbody>\n</table>',
  practicePatterns: ['<table>', '<caption>Sales Summary</caption>', '<thead>', '<th scope="col">Region</th>', '<th scope="col">Total</th>', '<tbody>', '<th scope="row">North</th>', '<td>$50,000</td>', '</table>'],
  practiceHintEn: 'Include <caption> first, then <thead> with scope="col", and <tbody> with scope="row".',
  practiceHintVi: 'Đặt <caption> đầu tiên, tiếp theo là <thead> với scope="col", và <tbody> với scope="row".',

  exercises: [
    {
      id: 'html_ex_6_1',
      type: 'complete_code',
      titleEn: 'Add Table Summary Footer with <tfoot>',
      titleVi: 'Thêm dòng tổng kết chân bảng với <tfoot>',
      instEn: 'Add a <tfoot> containing a row with <th scope="row">Grand Total</th> and <td>$150,000</td>.',
      instVi: 'Thêm thẻ <tfoot> chứa 1 dòng gồm <th scope="row">Grand Total</th> và <td>$150,000</td>.',
      starter: '<table>\n  <thead>\n    <tr><th scope="col">Item</th><th scope="col">Cost</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Product A</td><td>$150,000</td></tr>\n  </tbody>\n</table>',
      solution: '<table>\n  <thead>\n    <tr><th scope="col">Item</th><th scope="col">Cost</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Product A</td><td>$150,000</td></tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope="row">Grand Total</th>\n      <td>$150,000</td>\n    </tr>\n  </tfoot>\n</table>',
      hintEn: 'Add <tfoot> after <tbody> with a <tr> row.',
      hintVi: 'Thêm <tfoot> sau <tbody> kèm dòng <tr>.',
      expEn: '<tfoot> summarizes columns at the bottom of the table.',
      expVi: '<tfoot> chứa thông tin tổng kết các cột ở cuối bảng.'
    },
    {
      id: 'html_ex_6_2',
      type: 'fix_code',
      titleEn: 'Fix <caption> Placement Inside Table',
      titleVi: 'Sửa vị trí đặt thẻ <caption> trong bảng',
      instEn: 'Fix the table by moving the <caption> element to become the very first child directly inside <table>.',
      instVi: 'Sửa bảng bằng cách di chuyển thẻ <caption> lên làm phần tử con đầu tiên của <table>.',
      starter: '<table>\n  <thead>\n    <tr><th>Month</th><th>Visitors</th></tr>\n  </thead>\n  <caption>Traffic Analytics</caption>\n  <tbody>\n    <tr><td>Jan</td><td>10,000</td></tr>\n  </tbody>\n</table>',
      solution: '<table>\n  <caption>Traffic Analytics</caption>\n  <thead>\n    <tr><th>Month</th><th>Visitors</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Jan</td><td>10,000</td></tr>\n  </tbody>\n</table>',
      hintEn: 'Move <caption> directly after <table> and before <thead>.',
      hintVi: 'Chuyển <caption> ngay sau <table> và trước <thead>.',
      expEn: 'W3C specification requires <caption> to be the first child element of <table>.',
      expVi: 'Chuẩn W3C yêu cầu <caption> phải là phần tử con đầu tiên của thẻ <table>.'
    },
    {
      id: 'html_ex_6_3',
      type: 'write_code',
      titleEn: 'Merge Columns with Colspan',
      titleVi: 'Gộp cột với thuộc tính colspan',
      instEn: 'Write a <tr> inside a <tbody> where the first cell spans 2 columns using <td colspan="2">Merged Cell</td>, followed by <td>Value 3</td>.',
      instVi: 'Viết 1 dòng <tr> trong <tbody> trong đó ô đầu tiên gộp 2 cột bằng <td colspan="2">Merged Cell</td>, tiếp theo là <td>Value 3</td>.',
      starter: '',
      solution: '<tr>\n  <td colspan="2">Merged Cell</td>\n  <td>Value 3</td>\n</tr>',
      hintEn: 'Use <td colspan="2"> on the first cell.',
      hintVi: 'Dùng <td colspan="2"> ở ô đầu tiên.'
      ,
      expEn: 'colspan="2" causes a cell to expand horizontally across 2 table columns.',
      expVi: 'colspan="2" làm cho ô mở rộng theo chiều ngang qua 2 cột của bảng.'
    },
    {
      id: 'html_ex_6_4',
      type: 'modify_example',
      titleEn: 'Add Column Styling with <colgroup>',
      titleVi: 'Định kiểu theo cột với <colgroup>',
      instEn: 'Add a <colgroup> containing <col style="background-color:#f8fafc;"><col style="background-color:#eff6ff;"> immediately after <caption>.',
      instVi: 'Thêm <colgroup> chứa <col style="background-color:#f8fafc;"><col style="background-color:#eff6ff;"> ngay sau <caption>.',
      starter: '<table>\n  <caption>Comparison Matrix</caption>\n  <thead>\n    <tr><th>Feature</th><th>Pro Plan</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Support</td><td>24/7</td></tr>\n  </tbody>\n</table>',
      solution: '<table>\n  <caption>Comparison Matrix</caption>\n  <colgroup>\n    <col style="background-color:#f8fafc;">\n    <col style="background-color:#eff6ff;">\n  </colgroup>\n  <thead>\n    <tr><th>Feature</th><th>Pro Plan</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Support</td><td>24/7</td></tr>\n  </tbody>\n</table>',
      hintEn: 'Insert <colgroup> with 2 <col> tags after <caption> and before <thead>.',
      hintVi: 'Chèn <colgroup> với 2 thẻ <col> sau <caption> và trước <thead>.',
      expEn: '<colgroup> allows efficient column-level styling across the entire table without adding classes to every <td>.',
      expVi: '<colgroup> cho phép định kiểu cả cột nhanh chóng mà không cần thêm class vào từng ô <td>.'
    },
    {
      id: 'html_ex_6_5',
      type: 'predict_output',
      titleEn: 'Calculate Total Cells with Rowspan and Colspan',
      titleVi: 'Tính toán tổng số ô chiếm dụng với rowspan và colspan',
      instEn: 'If a table has 4 columns and the first row has <td colspan="3">A</td>, how many additional <td> cells can fit in that row?',
      instVi: 'Nếu bảng có 4 cột và hàng đầu tiên có <td colspan="3">A</td>, thì hàng đó có thể chứa thêm bao nhiêu ô <td> đơn nữa?',
      starter: '<!-- How many remaining single cells in a 4-column row? -->\n<p>Remaining: </p>',
      solution: '<p>Remaining: 1</p>',
      hintEn: '4 total columns minus 3 spanned columns equals 1 remaining column cell.',
      hintVi: '4 cột trừ đi 3 cột đã gộp còn lại 1 ô.' ,
      expEn: 'colspan="3" occupies 3 column slots, leaving 1 slot in a 4-column table row.',
      expVi: 'colspan="3" chiếm 3 vị trí cột, chỉ còn lại đúng 1 ô trong dòng 4 cột.'
    }
  ],

  challenge: {
    id: 'html_ch_6',
    titleEn: 'Enterprise Financial Quarterly Balance Sheet Table',
    titleVi: 'Bảng cân đối tài chính quý doanh nghiệp chuẩn trợ năng',
    descEn: 'Build an enterprise financial table with caption, colgroup, multi-column headers with scope, row headers, and summary totals in tfoot.',
    descVi: 'Xây dựng bảng tài chính doanh nghiệp hoàn chỉnh có caption, colgroup, tiêu đề đa cột có scope, tiêu đề dòng và tổng kết trong tfoot.',
    requirements: [
      { en: 'Add <caption>Quarterly Financial Performance 2026</caption> as the first child', vi: 'Thêm <caption>Quarterly Financial Performance 2026</caption> làm phần tử con đầu tiên' },
      { en: 'Define <colgroup> with 3 <col> elements', vi: 'Định nghĩa <colgroup> chứa 3 thẻ <col>' },
      { en: 'Inside <thead>, use <th scope="col"> for Quarter, Revenue, and Expenses', vi: 'Trong <thead>, dùng <th scope="col"> cho Quarter, Revenue, và Expenses' },
      { en: 'In <tbody>, create Q1 and Q2 rows with <th scope="row"> for the quarter names', vi: 'Trong <tbody>, tạo 2 dòng Q1 và Q2 với <th scope="row> cho tên quý' },
      { en: 'In <tfoot>, include a row with <th scope="row">Total</th> and summarized totals', vi: 'Trong <tfoot>, tạo dòng với <th scope="row">Total</th> và các con số tổng kết' }
    ],
    starter: '<!-- Build comprehensive financial table here -->\n',
    solution: '<table>\n  <caption>Quarterly Financial Performance 2026</caption>\n  <colgroup>\n    <col>\n    <col>\n    <col>\n  </colgroup>\n  <thead>\n    <tr>\n      <th scope="col">Quarter</th>\n      <th scope="col">Revenue</th>\n      <th scope="col">Expenses</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Q1</th>\n      <td>$100,000</td>\n      <td>$60,000</td>\n    </tr>\n    <tr>\n      <th scope="row">Q2</th>\n      <td>$120,000</td>\n      <td>$70,000</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <th scope="row">Total</th>\n      <td>$220,000</td>\n      <td>$130,000</td>\n    </tr>\n  </tfoot>\n</table>',
    hints: [
      { en: 'Always put <caption> right after <table>', vi: 'Luôn đặt <caption> ngay sau thẻ <table>' },
      { en: 'Use <th scope="col"> in <thead> and <th scope="row"> in <tbody> & <tfoot>', vi: 'Dùng <th scope="col"> trong <thead> và <th scope="row"> trong <tbody> & <tfoot>' }
    ],
    expEn: 'Fully compliant semantic table with complete auditory navigation support for screen readers.',
    expVi: 'Bảng HTML5 chuẩn ngữ nghĩa hoàn chỉnh hỗ trợ điều hướng âm thanh toàn diện cho trình đọc màn hình.'
  },

  challengeVariants: [
    {
      id: 'html_ch_6_v1',
      titleEn: 'Variant 1: Academic Weekly Schedule with Rowspan',
      titleVi: 'Biến thể 1: Lịch học tuần với gộp dòng rowspan',
      descEn: 'Build a timetable where a 2-hour lecture spans across two time slots using <td rowspan="2">.',
      descVi: 'Xây dựng thời khóa biểu có môn học 2 tiếng gộp 2 khung giờ bằng <td rowspan="2">.',
      requirements: [
        { en: 'Use <caption>Weekly Class Schedule</caption>', vi: 'Dùng <caption>Weekly Class Schedule</caption>' },
        { en: 'Header columns: Time, Monday, Tuesday', vi: 'Cột tiêu đề: Time, Monday, Tuesday' },
        { en: 'Row 1 (08:00): Computer Science lecture spanning 2 rows on Monday with rowspan="2"', vi: 'Dòng 1 (08:00): Môn Khoa học máy tính gộp 2 hàng vào thứ Hai với rowspan="2"' },
        { en: 'Row 2 (09:00): Tuesday class without duplicate Monday cell', vi: 'Dòng 2 (09:00): Lớp thứ Ba mà không lặp lại ô thứ Hai' }
      ],
      starter: '<table>\n  \n</table>',
      solution: '<table>\n  <caption>Weekly Class Schedule</caption>\n  <thead>\n    <tr>\n      <th scope="col">Time</th>\n      <th scope="col">Monday</th>\n      <th scope="col">Tuesday</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">08:00</th>\n      <td rowspan="2">Computer Science</td>\n      <td>Physics</td>\n    </tr>\n    <tr>\n      <th scope="row">09:00</th>\n      <td>Math</td>\n    </tr>\n  </tbody>\n</table>',
      expEn: 'rowspan="2" on Monday in row 1 reserves that space, so row 2 only requires Time and Tuesday cells.',
      expVi: 'rowspan="2" ở ô thứ Hai dòng 1 đã chiếm chỗ, nên dòng 2 chỉ cần ô Thời gian và ô thứ Ba.'
    },
    {
      id: 'html_ch_6_v2',
      titleEn: 'Variant 2: Comparison Pricing Matrix with colgroup and span',
      titleVi: 'Biến thể 2: Bảng so sánh gói giá với colgroup và span',
      descEn: 'Build a pricing matrix that styles the feature column and the 3 package columns using <colgroup span="3">.',
      descVi: 'Xây dựng bảng so sánh giá định kiểu cột tính năng và 3 gói dịch vụ bằng <colgroup span="3">.',
      requirements: [
        { en: 'Define <colgroup><col><colgroup span="3">', vi: 'Định nghĩa <colgroup><col><colgroup span="3">' },
        { en: 'Include Basic, Pro, and Enterprise columns with scope="col"', vi: 'Bao gồm các cột Basic, Pro và Enterprise với scope="col"' }
      ],
      starter: '<table>\n  \n</table>',
      solution: '<table>\n  <caption>Hosting Plans Matrix</caption>\n  <colgroup>\n    <col>\n  </colgroup>\n  <colgroup span="3">\n  </colgroup>\n  <thead>\n    <tr>\n      <th scope="col">Feature</th>\n      <th scope="col">Basic</th>\n      <th scope="col">Pro</th>\n      <th scope="col">Enterprise</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Bandwidth</th>\n      <td>10 GB</td>\n      <td>100 GB</td>\n      <td>Unlimited</td>\n    </tr>\n  </tbody>\n</table>',
      expEn: 'Multiple <colgroup> elements group structural columns for bulk semantic styling.',
      expVi: 'Nhiều thẻ <colgroup> cho phép nhóm các cột cấu trúc lại để định kiểu hàng loạt.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_6_1',
      type: 'single_choice',
      qEn: 'Where must the <caption> element be positioned inside a <table>?',
      qVi: 'Thẻ <caption> bắt buộc phải được đặt ở vị trí nào trong thẻ <table>?',
      options: [
        { en: 'As the very first child element directly after the opening <table> tag', vi: 'Là phần tử con đầu tiên ngay sau thẻ mở <table>' },
        { en: 'Inside the <thead> tag', vi: 'Bên trong thẻ <thead>' },
        { en: 'At the bottom inside <tfoot>', vi: 'Ở dưới cùng bên trong <tfoot>' },
        { en: 'Outside the table before a <div>', vi: 'Bên ngoài bảng trước thẻ <div>' }
      ],
      ans: 0,
      expEn: 'The <caption> element must be the first child of the <table> element.',
      expVi: 'Thẻ <caption> bắt buộc phải là phần tử con đầu tiên của thẻ <table>.'
    },
    {
      id: 'html_q_6_2',
      type: 'single_choice',
      qEn: 'What is the purpose of the "scope" attribute on a <th> element?',
      qVi: 'Mục đích của thuộc tính "scope" trên thẻ <th> là gì?',
      options: [
        { en: 'It explicitly declares whether the header applies to a column (scope="col") or a row (scope="row")', vi: 'Nó tuyên bố rõ ràng tiêu đề áp dụng cho cột (scope="col") hay cho dòng (scope="row")' },
        { en: 'It sets the CSS font size of the header', vi: 'Nó thiết lập cỡ chữ CSS của tiêu đề' },
        { en: 'It makes the table sortable on click', vi: 'Nó làm cho bảng có thể sắp xếp khi nhấp chuột' },
        { en: 'It hides the cell on mobile devices', vi: 'Nó ẩn ô trên thiết bị di động' }
      ],
      ans: 0,
      expEn: 'scope tells screen readers whether a header pertains to its entire column or its row.',
      expVi: 'scope báo cho trình đọc màn hình biết tiêu đề này thuộc về cả cột hay cả dòng tương ứng.'
    },
    {
      id: 'html_q_6_3',
      type: 'single_choice',
      qEn: 'Which attribute merges a table cell horizontally across multiple columns?',
      qVi: 'Thuộc tính nào gộp một ô của bảng theo chiều ngang qua nhiều cột?',
      options: [
        { en: 'colspan', vi: 'colspan' },
        { en: 'rowspan', vi: 'rowspan' },
        { en: 'span', vi: 'span' },
        { en: 'colmerge', vi: 'colmerge' }
      ],
      ans: 0,
      expEn: 'colspan expands a cell across multiple columns horizontally.',
      expVi: 'colspan mở rộng ô theo chiều ngang qua nhiều cột.'
    },
    {
      id: 'html_q_6_4',
      type: 'single_choice',
      qEn: 'Which attribute merges a table cell vertically across multiple rows?',
      qVi: 'Thuộc tính nào gộp một ô của bảng theo chiều dọc qua nhiều hàng?',
      options: [
        { en: 'rowspan', vi: 'rowspan' },
        { en: 'colspan', vi: 'colspan' },
        { en: 'rowmerge', vi: 'rowmerge' },
        { en: 'vspan', vi: 'vspan' }
      ],
      ans: 0,
      expEn: 'rowspan expands a cell across multiple rows vertically.',
      expVi: 'rowspan mở rộng ô theo chiều dọc qua nhiều hàng.'
    },
    {
      id: 'html_q_6_5',
      type: 'single_choice',
      qEn: 'What are the three structural partition elements of an HTML5 table?',
      qVi: 'Ba phần tử phân chia cấu trúc chính của một bảng HTML5 là gì?',
      options: [
        { en: '<thead>, <tbody>, and <tfoot>', vi: '<thead>, <tbody>, và <tfoot>' },
        { en: '<top>, <middle>, and <bottom>', vi: '<top>, <middle>, và <bottom>' },
        { en: '<header>, <content>, and <footer>', vi: '<header>, <content>, và <footer>' },
        { en: '<h1>, <p>, and <hr>', vi: '<h1>, <p>, và <hr>' }
      ],
      ans: 0,
      expEn: '<thead>, <tbody>, and <tfoot> segment table rows semantically.',
      expVi: '<thead>, <tbody>, và <tfoot> phân đoạn các dòng của bảng theo chuẩn ngữ nghĩa.'
    },
    {
      id: 'html_q_6_6',
      type: 'single_choice',
      qEn: 'Can a <th> element be placed inside a <tbody>?',
      qVi: 'Một thẻ <th> có thể được đặt bên trong thẻ <tbody> không?',
      options: [
        { en: 'Yes, as a row header (<th scope="row">) identifying each individual record', vi: 'Có, đóng vai trò là tiêu đề dòng (<th scope="row">) định danh cho từng bản ghi' },
        { en: 'No, <th> is strictly forbidden inside <tbody>', vi: 'Không, <th> tuyệt đối bị cấm trong <tbody>' },
        { en: 'Only if the table has no <thead>', vi: 'Chỉ khi bảng không có <thead>' },
        { en: 'Only in HTML4', vi: 'Chỉ trong HTML4' }
      ],
      ans: 0,
      expEn: '<th scope="row"> inside <tbody> is standard best practice for row headings (e.g., student name or product code).',
      expVi: '<th scope="row"> trong <tbody> là chuẩn quốc tế cho tiêu đề dòng (như tên học sinh hoặc mã sản phẩm).'
    },
    {
      id: 'html_q_6_7',
      type: 'single_choice',
      qEn: 'What does <colgroup> and <col> accomplish in HTML tables?',
      qVi: 'Thẻ <colgroup> và <col> có vai trò gì trong bảng HTML?',
      options: [
        { en: 'Defines structural column groups and allows applying styles (like background, width) to entire columns at once', vi: 'Định nghĩa các nhóm cột cấu trúc và cho phép áp dụng CSS (như màu nền, độ rộng) cho cả cột cùng lúc' },
        { en: 'Creates an automatic SQL query in the background', vi: 'Tự động tạo câu truy vấn SQL chạy nền' },
        { en: 'Converts table cells into input fields', vi: 'Chuyển đổi các ô của bảng thành ô nhập liệu' },
        { en: 'Hides columns from mobile users', vi: 'Ẩn các cột đối với người dùng di động' }
      ],
      ans: 0,
      expEn: '<colgroup> groups columns for targeted column-level styling.',
      expVi: '<colgroup> nhóm các cột lại để định kiểu CSS cho toàn bộ cột một cách tối ưu.'
    },
    {
      id: 'html_q_6_8',
      type: 'single_choice',
      qEn: 'Why is using <table> for web page layouts considered bad practice?',
      qVi: 'Tại sao dùng <table> để dàn trang giao diện web bị coi là thói quen xấu?',
      options: [
        { en: 'It ruins accessibility for screen reader users, creates messy rigid DOM trees, and harms SEO ranking', vi: 'Nó phá hủy khả năng tiếp cận của trình đọc màn hình, tạo cây DOM cứng nhắc và làm hại điểm SEO' },
        { en: 'Tables are banned by modern web browsers', vi: 'Các trình duyệt hiện đại đã cấm hoàn toàn thẻ table' },
        { en: 'Tables can only display black and white text', vi: 'Table chỉ có thể hiển thị chữ đen trắng' },
        { en: 'Tables cannot contain links or images', vi: 'Table không thể chứa liên kết hoặc hình ảnh' }
      ],
      ans: 0,
      expEn: 'Layout tables confuse assistive technologies which expect tabular relationships between headers and cells.',
      expVi: 'Bảng dùng để chia layout làm rối loạn công nghệ trợ thính vì chúng hiểu nhầm dữ liệu đang có quan hệ dạng bảng.'
    },
    {
      id: 'html_q_6_9',
      type: 'single_choice',
      qEn: 'What CSS property ensures table borders merge together neatly without ugly double gaps?',
      qVi: 'Thuộc tính CSS nào giúp viền của bảng gộp liền vào nhau gọn gàng mà không bị khe hở viền đôi?',
      options: [
        { en: 'border-collapse: collapse;', vi: 'border-collapse: collapse;' },
        { en: 'table-layout: fixed;', vi: 'table-layout: fixed;' },
        { en: 'border-spacing: 0;', vi: 'border-spacing: 0;' },
        { en: 'border-merge: true;', vi: 'border-merge: true;' }
      ],
      ans: 0,
      expEn: 'border-collapse: collapse merges adjacent cell borders into single lines.',
      expVi: 'border-collapse: collapse gộp các đường viền ô liền kề thành 1 đường viền duy nhất.'
    },
    {
      id: 'html_q_6_10',
      type: 'single_choice',
      qEn: 'Which scope values are valid on a <th> element in HTML5?',
      qVi: 'Những giá trị scope nào là hợp lệ trên thẻ <th> trong HTML5?',
      options: [
        { en: 'col, row, colgroup, and rowgroup', vi: 'col, row, colgroup, và rowgroup' },
        { en: 'top, bottom, left, and right', vi: 'top, bottom, left, và right' },
        { en: 'header, footer, data, and meta', vi: 'header, footer, data, và meta' },
        { en: 'all, none, vertical, and horizontal', vi: 'all, none, vertical, và horizontal' }
      ],
      ans: 0,
      expEn: 'Valid scope values are "row", "col", "rowgroup", and "colgroup".',
      expVi: 'Các giá trị hợp lệ của scope là "row", "col", "rowgroup", và "colgroup".'
    },
    {
      id: 'html_q_6_11',
      type: 'single_choice',
      qEn: 'What does scope="colgroup" signify?',
      qVi: 'scope="colgroup" thể hiện điều gì?',
      options: [
        { en: 'The header cell applies to an entire group of columns spanned by that header', vi: 'Ô tiêu đề đó áp dụng cho toàn bộ một nhóm cột nằm dưới sự bao quát của nó' },
        { en: 'The column contains color groups', vi: 'Cột đó chứa các nhóm màu sắc' },
        { en: 'The table has more than 10 columns', vi: 'Bảng có nhiều hơn 10 cột' },
        { en: 'It merges all rows into a single paragraph', vi: 'Nó gộp mọi hàng thành một đoạn văn' }
      ],
      ans: 0,
      expEn: 'scope="colgroup" is used for super-headers that span multiple columns (via colspan).',
      expVi: 'scope="colgroup" được dùng cho các tiêu đề cấp cao gộp nhiều cột bên dưới (qua colspan).'
    },
    {
      id: 'html_q_6_12',
      type: 'single_choice',
      qEn: 'When printing a multi-page table, what do browsers do with <thead> and <tfoot> by default?',
      qVi: 'Khi in bảng dài nhiều trang giấy, trình duyệt thường làm gì với <thead> và <tfoot> theo mặc định?',
      options: [
        { en: 'They automatically repeat <thead> at the top and <tfoot> at the bottom of every printed page', vi: 'Tự động lặp lại <thead> ở đầu và <tfoot> ở cuối mỗi trang in' },
        { en: 'They delete all headers after page 1', vi: 'Xóa toàn bộ tiêu đề từ trang 2 trở đi' },
        { en: 'They convert the table to an image', vi: 'Chuyển đổi toàn bộ bảng thành hình ảnh' },
        { en: 'They throw a print layout error', vi: 'Báo lỗi in ấn' }
      ],
      ans: 0,
      expEn: 'Browser print engines replicate <thead> and <tfoot> across page breaks for readability.',
      expVi: 'Bộ máy in của trình duyệt tự động lặp lại <thead> và <tfoot> ở các trang bị ngắt để dễ đọc.'
    },
    {
      id: 'html_q_6_13',
      type: 'single_choice',
      qEn: 'What is the "headers" attribute on a <td> used for in complex multi-dimensional tables?',
      qVi: 'Thuộc tính "headers" trên ô <td> được dùng để làm gì trong các bảng phức tạp nhiều chiều?',
      options: [
        { en: 'Contains a space-separated list of id values of the <th> cells that provide header context for that cell', vi: 'Chứa danh sách phân tách bằng khoảng trắng các id của những thẻ <th> làm tiêu đề cho ô đó' },
        { en: 'Defines the HTTP response headers for the table', vi: 'Định nghĩa HTTP response header cho bảng' },
        { en: 'Sets the font style of the header text', vi: 'Thiết lập kiểu font chữ của tiêu đề' },
        { en: 'Counts the total number of headers in the document', vi: 'Đếm tổng số tiêu đề trong tài liệu' }
      ],
      ans: 0,
      expEn: 'The headers attribute pairs a <td> with multiple non-contiguous <th> id attributes.',
      expVi: 'Thuộc tính headers ghép nối một ô <td> với danh sách các id của thẻ <th> tương ứng.'
    },
    {
      id: 'html_q_6_14',
      type: 'single_choice',
      qEn: 'Can <tfoot> appear before <tbody> in HTML source code?',
      qVi: 'Thẻ <tfoot> có thể xuất hiện trước thẻ <tbody> trong mã nguồn HTML không?',
      options: [
        { en: 'In HTML4 it was allowed before tbody, but HTML5 requires <tfoot> to be placed AFTER <tbody> for correct DOM reading order', vi: 'Trong HTML4 từng cho phép trước tbody, nhưng HTML5 yêu cầu <tfoot> phải đặt SAU <tbody> theo đúng thứ tự đọc' },
        { en: '<tfoot> is strictly required to be placed before <thead>', vi: '<tfoot> bắt buộc phải đứng trước <thead>' },
        { en: 'HTML5 removed <tfoot> completely', vi: 'HTML5 đã loại bỏ hoàn toàn <tfoot>' },
        { en: 'Only if wrapped in a <details> element', vi: 'Chỉ khi được bọc trong thẻ <details>' }
      ],
      ans: 0,
      expEn: 'In modern HTML5, <tfoot> should follow <tbody> so visual and DOM order match.',
      expVi: 'Trong HTML5 hiện đại, <tfoot> nên được đặt sau <tbody> để thứ tự hiển thị và DOM khớp nhau.'
    },
    {
      id: 'html_q_6_15',
      type: 'single_choice',
      qEn: 'What HTML5 attribute on <table> makes it explicitly announced as data table rather than a presentation container?',
      qVi: 'Thuộc tính HTML/ARIA nào trên <table> tuyên bố rõ ràng đây là bảng dữ liệu chứ không phải khung layout?',
      options: [
        { en: 'Using native <table> with <th> and <caption> automatically conveys data role (or role="table")', vi: 'Dùng thẻ <table> chuẩn có <th> và <caption> sẽ tự động định danh vai trò bảng dữ liệu (hoặc role="table")' },
        { en: 'datatype="relational"', vi: 'datatype="relational"' },
        { en: 'grid="sql"', vi: 'grid="sql"' },
        { en: 'data-table="true"', vi: 'data-table="true"' }
      ],
      ans: 0,
      expEn: 'Standard semantic tags (<caption>, <thead>, <th>, <tbody>) give tables their inherent accessible table role.',
      expVi: 'Các thẻ chuẩn ngữ nghĩa (<caption>, <thead>, <th>, <tbody>) tự động mang lại vai trò bảng dữ liệu cho trình đọc màn hình.'
    },
    {
      id: 'html_q_6_16',
      type: 'single_choice',
      qEn: 'If a table cell has <td colspan="0"> in compliant rendering, what does it mean?',
      qVi: 'Nếu một ô bảng có <td colspan="0"> theo chuẩn W3C, điều đó có nghĩa là gì?',
      options: [
        { en: 'It instructs the cell to span all remaining columns in the current <colgroup>', vi: 'Nó chỉ thị ô đó mở rộng hết toàn bộ các cột còn lại trong <colgroup> hiện tại' },
        { en: 'It makes the cell 0 pixels wide', vi: 'Nó làm cho ô có độ rộng 0 pixel' },
        { en: 'It deletes the cell from the DOM', vi: 'Nó xóa ô đó khỏi DOM' },
        { en: 'It is a syntax error in all browsers', vi: 'Nó là lỗi cú pháp trên mọi trình duyệt' }
      ],
      ans: 0,
      expEn: 'colspan="0" tells the browser to span the cell to the last column of the column group.',
      expVi: 'colspan="0" chỉ thị trình duyệt kéo dài ô cho đến cột cuối cùng của nhóm cột.'
    }
  ]
};

console.log('Lesson 6 defined.');
