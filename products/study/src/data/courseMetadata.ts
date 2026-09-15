import { CourseId, LocalizedString } from '../types';

export interface CourseDetailMetadata {
  learningObjectives: LocalizedString[];
  whatYouWillLearn: LocalizedString[];
  prerequisites: LocalizedString[];
  targetAudience: LocalizedString[];
  keyHighlights: LocalizedString[];
}

export const courseDetailMetadataMap: Record<CourseId, CourseDetailMetadata> = {
  python: {
    learningObjectives: [
      {
        en: 'Master core programming fundamentals, variable assignments, and in-memory dynamic typing.',
        vi: 'Làm chủ nền tảng lập trình cốt lõi, khai báo biến và định kiểu dữ liệu động trong bộ nhớ.',
      },
      {
        en: 'Write resilient conditional logic, iterations with while/for loops, and custom reusable functions.',
        vi: 'Xây dựng tư duy logic điều kiện, vòng lặp while/for và các hàm tái sử dụng linh hoạt.',
      },
      {
        en: 'Manipulate high-performance Python data structures including Lists, Dictionaries, Tuples, and Sets.',
        vi: 'Thao tác cấu trúc dữ liệu mạnh mẽ gồm Danh sách (List), Từ điển (Dictionary), Tuple và Set.',
      },
      {
        en: 'Apply Object-Oriented Programming (OOP) paradigms with classes, instances, encapsulation, and inheritance.',
        vi: 'Áp dụng lập trình hướng đối tượng (OOP) với class, đối tượng, tính đóng gói và kế thừa.',
      },
      {
        en: 'Implement robust defensive programming with try-except-finally error handling and file I/O operations.',
        vi: 'Triển khai kỹ thuật xử lý ngoại lệ try-except-finally và đọc ghi tệp an toàn.',
      },
    ],
    whatYouWillLearn: [
      {
        en: 'Variables, primitive data types (int, float, str, bool), and formatted string outputs',
        vi: 'Biến, kiểu dữ liệu nguyên thủy (int, float, str, bool) và định dạng chuỗi xuất f-string',
      },
      {
        en: 'Control structures: if, elif, else branches, comparison operators, and logical chaining',
        vi: 'Cấu trúc điều khiển: if, elif, else, toán tử so sánh và kết hợp điều kiện logic',
      },
      {
        en: 'Loop iteration patterns: for-in, while loops, range() generators, break, and continue',
        vi: 'Vòng lặp: for-in, while, hàm sinh range(), lệnh ngắt break và bỏ qua continue',
      },
      {
        en: 'Modular functions, default parameter values, *args, **kwargs, and return statements',
        vi: 'Hàm mô-đun, giá trị tham số mặc định, *args, **kwargs và giá trị trả về return',
      },
      {
        en: 'Collection operations: List slicing, Dictionary key lookups, Set unions/intersections',
        vi: 'Thao tác tập hợp: Cắt lát List, tra cứu khóa Dictionary, phép hợp/giao trên Set',
      },
      {
        en: 'OOP Classes, constructor __init__, methods, attributes, and inheritance hierarchies',
        vi: 'Lớp OOP, hàm khởi tạo __init__, phương thức, thuộc tính và cấu trúc kế thừa',
      },
    ],
    prerequisites: [
      {
        en: 'No prior coding experience needed. Starts from complete zero.',
        vi: 'Không yêu cầu kinh nghiệm lập trình từ trước. Bắt đầu từ số 0.',
      },
      {
        en: 'A standard web browser with WebAssembly capabilities (Chrome, Edge, Firefox, Safari).',
        vi: 'Trình duyệt web hiện đại hỗ trợ WebAssembly (Chrome, Edge, Firefox, Safari).',
      },
    ],
    targetAudience: [
      {
        en: 'Complete beginners seeking a friendly, highly readable entry into software engineering.',
        vi: 'Người mới bắt đầu muốn tiếp cận lập trình với ngôn ngữ trong sáng, dễ đọc và phổ biến.',
      },
      {
        en: 'Aspiring data analysts, backend developers, and automation scripting practitioners.',
        vi: 'Học viên định hướng phân tích dữ liệu, lập trình backend và tự động hóa quy trình.',
      },
    ],
    keyHighlights: [
      {
        en: 'Pure in-browser Pyodide WASM runtime — zero installation required.',
        vi: 'Môi trường thực thi Pyodide WASM trực tiếp trong trình duyệt — không cần cài đặt.',
      },
      {
        en: '5-Stage mastery progression with hands-on challenges and quizzes.',
        vi: 'Quy trình học 5 bước tương tác với bài tập code thực chiến và trắc nghiệm.',
      },
    ],
  },

  excel: {
    learningObjectives: [
      {
        en: 'Master grid coordinates, data type precision, and absolute/mixed cell referencing ($A$1, $A1, A$1).',
        vi: 'Làm chủ tọa độ bảng tính, độ chính xác kiểu dữ liệu và khóa tham chiếu ô tuyệt đối/hỗn hợp ($A$1, $A1, A$1).',
      },
      {
        en: 'Write statistical aggregations, multi-condition decision trees (IF, IFS, AND, OR), and multi-criteria SUMIFS.',
        vi: 'Viết các phép tính thống kê, cây quyết định phân nhánh đa điều kiện (IF, IFS, AND, OR) và tổng hợp SUMIFS.',
      },
      {
        en: 'Master modern relational lookups using two-way XLOOKUP, fallback handling, and legacy INDEX/MATCH.',
        vi: 'Làm chủ tra cứu dữ liệu liên bảng hiện đại với XLOOKUP 2 chiều, xử lý giá trị thiếu và INDEX/MATCH.',
      },
      {
        en: 'Harness dynamic array formula spill engines with FILTER, UNIQUE, SORT, and dynamic multi-criteria pipelines.',
        vi: 'Khai thác cơ chế mảng động tràn dữ liệu (spill) với FILTER, UNIQUE, SORT và đường ống xử lý nhiều tiêu chí.',
      },
      {
        en: 'Build corporate financial valuation models (NPV, IRR, PMT) and design executive PivotTable summary dashboards.',
        vi: 'Xây dựng mô hình thẩm định tài chính đầu tư (NPV, IRR, PMT) và thiết kế báo cáo quản trị tổng hợp PivotTable.',
      },
    ],
    whatYouWillLearn: [
      {
        en: 'Workbook coordinates, relative/absolute cell referencing, and the mathematical formula evaluation lifecycle',
        vi: 'Tọa độ bảng tính, tham chiếu tương đối/tuyệt đối và chu trình đánh giá công thức toán học',
      },
      {
        en: 'Statistical functions: SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, and COUNTBLANK handling',
        vi: 'Các hàm thống kê: SUM, AVERAGE, MIN, MAX, COUNT, COUNTA và xử lý ô trống COUNTBLANK',
      },
      {
        en: 'Logical decision trees with IF, IFS, AND, OR, and IFERROR graceful fallback mechanisms',
        vi: 'Cây quyết định logic với IF, IFS, AND, OR cùng cơ chế bắt lỗi an toàn IFERROR',
      },
      {
        en: 'Relational data linking with XLOOKUP (exact/wildcard/2-way) and classic INDEX/MATCH combinations',
        vi: 'Liên kết dữ liệu liên bảng với XLOOKUP (chính xác/ký tự đại diện/2 chiều) và bộ đôi INDEX/MATCH',
      },
      {
        en: 'Dynamic Array formulas: FILTER, UNIQUE, SORT, and multi-condition dynamic array manipulation',
        vi: 'Công thức mảng động: FILTER, UNIQUE, SORT và xử lý mảng động nhiều điều kiện',
      },
      {
        en: 'Capital budgeting & Financial valuation: NPV, IRR, PMT loan schedules, and executive PivotTable dashboards',
        vi: 'Thẩm định đầu tư & Tài chính: NPV, IRR, lịch trả nợ PMT và dashboard quản trị PivotTable',
      },
    ],
    prerequisites: [
      {
        en: 'No previous spreadsheet experience required. Begins from fundamental grid navigation.',
        vi: 'Không yêu cầu kinh nghiệm bảng tính trước đó. Bắt đầu từ thao tác ô cơ bản nhất.',
      },
      {
        en: 'A standard web browser (Chrome, Edge, Firefox, Safari) with modern JavaScript enabled.',
        vi: 'Trình duyệt web tiêu chuẩn (Chrome, Edge, Firefox, Safari) bật JavaScript hiện đại.',
      },
    ],
    targetAudience: [
      {
        en: 'Business analysts, data analysts, accountants, and finance professionals seeking spreadsheet mastery.',
        vi: 'Chuyên viên phân tích kinh doanh, chuyên viên dữ liệu, kế toán và tài chính muốn làm chủ bảng tính.',
      },
      {
        en: 'Learners seeking a practical, formula-driven bridge to relational databases (SQL) and Business Intelligence (Power BI).',
        vi: 'Học viên cần bước đệm thực chiến, dựa trên công thức để tiến lên cơ sở dữ liệu (SQL) và Business Intelligence (Power BI).',
      },
    ],
    keyHighlights: [
      {
        en: 'Interactive in-browser spreadsheet engine with instant formula evaluation and syntax feedback.',
        vi: 'Môi trường thực thi công thức bảng tính trực tiếp trong trình duyệt với phản hồi cú pháp tức thì.',
      },
      {
        en: 'Coherent 4TM methodology: Learn → Practice → Exercises → Real-World Challenge → Quiz → Project.',
        vi: 'Quy trình học chuẩn 4TM: Lý Thuyết → Thực Hành → Bài Tập → Thử Thách → Trắc Nghiệm → Dự Án.',
      },
    ],
  },

  sql: {
    learningObjectives: [
      {
        en: 'Understand relational database architecture, tables, primary keys, and foreign key relationships.',
        vi: 'Hiểu kiến trúc cơ sở dữ liệu quan hệ, bảng, khóa chính và quan hệ khóa ngoại.',
      },
      {
        en: 'Write performant SELECT queries to filter, sort, transform, and aggregate enterprise datasets.',
        vi: 'Viết câu lệnh SELECT hiệu năng cao để lọc, sắp xếp, biến đổi và tổng hợp dữ liệu doanh nghiệp.',
      },
      {
        en: 'Connect disparate data tables with INNER JOIN, LEFT JOIN, and subquery compositions.',
        vi: 'Kết nối nhiều bảng dữ liệu với INNER JOIN, LEFT JOIN và truy vấn lồng subquery.',
      },
      {
        en: 'Define schemas using DDL commands (CREATE, ALTER, DROP) and manage records with DML (INSERT, UPDATE, DELETE).',
        vi: 'Định nghĩa lược đồ với lệnh DDL (CREATE, ALTER, DROP) và quản lý dữ liệu với DML (INSERT, UPDATE, DELETE).',
      },
    ],
    whatYouWillLearn: [
      {
        en: 'SELECT projection, column aliasing with AS, and DISTINCT record de-duplication',
        vi: 'Truy vấn SELECT, đặt tên bí danh AS và lọc dữ liệu trùng lặp DISTINCT',
      },
      {
        en: 'WHERE filtering with operators (=, !=, <, >, LIKE, IN, BETWEEN, AND, OR, NOT)',
        vi: 'Mệnh đề WHERE với các toán tử (=, !=, <, >, LIKE, IN, BETWEEN, AND, OR, NOT)',
      },
      {
        en: 'ORDER BY multi-column sorting (ASC, DESC) and LIMIT/OFFSET pagination',
        vi: 'Sắp xếp nhiều cột ORDER BY (ASC, DESC) và phân trang dữ liệu LIMIT/OFFSET',
      },
      {
        en: 'Aggregate metrics: COUNT, SUM, AVG, MIN, MAX combined with GROUP BY and HAVING filters',
        vi: 'Các hàm tổng hợp: COUNT, SUM, AVG, MIN, MAX kết hợp gom nhóm GROUP BY và lọc HAVING',
      },
      {
        en: 'Relational table joins: INNER JOIN, LEFT OUTER JOIN, and multi-table entity joins',
        vi: 'Liên kết bảng quan hệ: INNER JOIN, LEFT OUTER JOIN và kết nối đa thực thể',
      },
      {
        en: 'Table creation with constraints (NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, DEFAULT)',
        vi: 'Tạo bảng với các ràng buộc (NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, DEFAULT)',
      },
    ],
    prerequisites: [
      {
        en: 'Basic computer literacy and understanding of spreadsheet tables is helpful.',
        vi: 'Hiểu biết cơ bản về máy tính và bảng tính (như Excel) là một lợi thế.',
      },
    ],
    targetAudience: [
      {
        en: 'Aspiring backend developers, data analysts, business intelligence specialists, and database administrators.',
        vi: 'Lập trình viên backend, chuyên viên phân tích dữ liệu, BI và quản trị cơ sở dữ liệu.',
      },
    ],
    keyHighlights: [
      {
        en: 'Live in-browser SQLite WASM engine pre-loaded with realistic student and order tables.',
        vi: 'Động cơ SQLite WASM chạy trực tiếp với dữ liệu mẫu phong phú về sinh viên và đơn hàng.',
      },
    ],
  },

  html: {
    learningObjectives: [
      {
        en: 'Construct clean, semantic, and modern HTML5 document hierarchies.',
        vi: 'Xây dựng cấu trúc tài liệu HTML5 chuẩn ngữ nghĩa, rõ ràng và hiện đại.',
      },
      {
        en: 'Implement fully accessible user forms with built-in client-side validation constraints.',
        vi: 'Triển khai biểu mẫu form chuẩn trợ năng với các ràng buộc kiểm tra hợp lệ phía client.',
      },
      {
        en: 'Embed rich multimedia (images, audio, video) and configure SEO metadata.',
        vi: 'Nhúng đa phương tiện phong phú (hình ảnh, âm thanh, video) và cấu hình thẻ SEO metadata.',
      },
    ],
    whatYouWillLearn: [
      {
        en: 'Document structure: <!DOCTYPE html>, <html>, <head>, <meta charset="utf-8">, and <body>',
        vi: 'Cấu trúc tài liệu: <!DOCTYPE html>, <html>, <head>, <meta charset="utf-8"> và <body>',
      },
      {
        en: 'Semantic landmarks: <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>',
        vi: 'Thẻ bố cục ngữ nghĩa: <header>, <nav>, <main>, <article>, <section>, <aside> và <footer>',
      },
      {
        en: 'Headings hierarchy (h1-h6), paragraphs, links (<a>), lists (<ul>, <ol>, <li>), and blockquotes',
        vi: 'Cấu trúc tiêu đề (h1-h6), đoạn văn, liên kết (<a>), danh sách (<ul>, <ol>, <li>) và trích dẫn',
      },
      {
        en: 'Form components: <input> types (text, email, password, number), <select>, <textarea>, and <button>',
        vi: 'Thành phần biểu mẫu: các loại <input>, <select>, <textarea> và nút bấm <button>',
      },
      {
        en: 'Accessibility fundamentals with ARIA roles, alt text attributes, and label-input associations',
        vi: 'Nền tảng trợ năng với thuộc tính ARIA, văn bản thay thế alt và liên kết thẻ label với input',
      },
    ],
    prerequisites: [
      {
        en: 'None. Perfect starting point for anyone entering web development.',
        vi: 'Không có. Điểm khởi đầu hoàn hảo cho bất kỳ ai muốn bước vào thế giới web.',
      },
    ],
    targetAudience: [
      {
        en: 'Anyone wanting to build web pages, web applications, and interactive digital interfaces.',
        vi: 'Bất kỳ ai muốn xây dựng trang web, ứng dụng web và giao diện số tương tác.',
      },
    ],
    keyHighlights: [
      {
        en: 'Instant split-screen live preview with DOM tree inspection.',
        vi: 'Khung xem trước trực tiếp thời gian thực với phân tích cây DOM.',
      },
    ],
  },

  css: {
    learningObjectives: [
      {
        en: 'Master CSS cascade inheritance, specificity rules, and the complete Box Model.',
        vi: 'Làm chủ cơ chế xếp tầng Cascade, độ ưu tiên Specificity và mô hình hộp Box Model toàn diện.',
      },
      {
        en: 'Build flexible one-dimensional and two-dimensional layouts using Flexbox and CSS Grid.',
        vi: 'Xây dựng bố cục 1 chiều và 2 chiều linh hoạt với Flexbox và CSS Grid.',
      },
      {
        en: 'Design fully responsive interfaces across mobile, tablet, and ultra-wide displays.',
        vi: 'Thiết kế giao diện thích ứng mượt mà trên di động, máy tính bảng và màn hình lớn.',
      },
    ],
    whatYouWillLearn: [
      {
        en: 'Selectors (class, ID, element, attribute, pseudo-classes like :hover, :focus, :nth-child)',
        vi: 'Bộ chọn (class, ID, phần tử, thuộc tính, pseudo-class như :hover, :focus, :nth-child)',
      },
      {
        en: 'The Box Model: width, height, padding, border, margin, and box-sizing: border-box calculations',
        vi: 'Mô hình hộp: width, height, padding, border, margin và tính toán box-sizing: border-box',
      },
      {
        en: 'Flexbox layout engine: justify-content, align-items, flex-direction, flex-wrap, and flex-grow',
        vi: 'Công cụ bố cục Flexbox: justify-content, align-items, flex-direction, flex-wrap và flex-grow',
      },
      {
        en: 'CSS Grid layouts: grid-template-columns, repeat(), minmax(), gap, and grid areas',
        vi: 'Dàn trang CSS Grid: grid-template-columns, repeat(), minmax(), gap và khu vực grid',
      },
      {
        en: 'CSS Custom Properties (Variables) and fluid responsive typography with clamp() and rem units',
        vi: 'Biến tùy chỉnh CSS Custom Properties và cỡ chữ responsive mượt mà với clamp() và rem',
      },
    ],
    prerequisites: [
      {
        en: 'Basic HTML knowledge (headings, paragraphs, tags) is recommended.',
        vi: 'Khuyến nghị có hiểu biết cơ bản về HTML (thẻ tiêu đề, đoạn văn, cấu trúc trang).',
      },
    ],
    targetAudience: [
      {
        en: 'Frontend developers, UI/UX designers, and developers aiming to write elegant visual styling.',
        vi: 'Lập trình viên Frontend, thiết kế UI/UX và các kỹ sư muốn làm chủ kỹ năng styling chuyên nghiệp.',
      },
    ],
    keyHighlights: [
      {
        en: 'Real-time CSS sandbox with instant visual feedback and theme compatibility.',
        vi: 'Môi trường CSS sandbox phản hồi giao diện tức thì và tương thích chế độ sáng/tối.',
      },
    ],
  },

  javascript: {
    learningObjectives: [
      {
        en: 'Master core JavaScript programming, variables (let/const), scope, and type coercion.',
        vi: 'Làm chủ ngôn ngữ JavaScript cốt lõi, biến (let/const), phạm vi biến và ép kiểu dữ liệu.',
      },
      {
        en: 'Interact with the browser DOM, listen to user input events, and manipulate HTML/CSS dynamically.',
        vi: 'Tương tác với DOM trình duyệt, bắt sự kiện người dùng và điều khiển HTML/CSS động.',
      },
      {
        en: 'Utilize modern ES6+ features: Arrow functions, Destructuring, Template Literals, and Modules.',
        vi: 'Khai thác tối đa tính năng ES6+: Arrow functions, Destructuring, Template Literals và Modules.',
      },
      {
        en: 'Write asynchronous JavaScript using Promises, async/await, and the Fetch API.',
        vi: 'Viết mã bất đồng bộ chuẩn mực với Promise, async/await và Fetch API.',
      },
    ],
    whatYouWillLearn: [
      {
        en: 'Variables, primitive vs reference types, operators, and strict equality (=== vs ==)',
        vi: 'Khai báo biến, kiểu nguyên thủy vs tham chiếu, toán tử và so sánh nghiêm ngặt (=== vs ==)',
      },
      {
        en: 'Higher-order array methods: map(), filter(), reduce(), find(), and immutable array operations',
        vi: 'Phương thức mảng bậc cao: map(), filter(), reduce(), find() và xử lý mảng bất biến',
      },
      {
        en: 'DOM manipulation: document.querySelector, textContent, classList, and addEventListener',
        vi: 'Thao tác DOM: document.querySelector, textContent, classList và addEventListener',
      },
      {
        en: 'ES6+ Destructuring, Rest/Spread operators, Object methods, and modern closures',
        vi: 'Destructuring ES6+, toán tử Rest/Spread, phương thức Object và hàm bao đóng Closure',
      },
      {
        en: 'Asynchronous workflows: Promises, async/await, error handling, and JSON parsing',
        vi: 'Luồng bất đồng bộ: Promise, async/await, xử lý lỗi try/catch và chuyển đổi JSON',
      },
    ],
    prerequisites: [
      {
        en: 'Basic HTML and CSS understanding is recommended.',
        vi: 'Khuyến nghị đã nắm cơ bản về HTML và CSS.',
      },
    ],
    targetAudience: [
      {
        en: 'Aspiring web developers, full-stack engineers, and software engineering students.',
        vi: 'Lập trình viên web, kỹ sư full-stack và sinh viên ngành công nghệ thông tin.',
      },
    ],
    keyHighlights: [
      {
        en: 'Isolated browser JavaScript VM sandbox with console log capture and real DOM execution.',
        vi: 'Máy ảo JavaScript sandbox cách ly với bắt nhật ký console log và thực thi DOM chân thực.',
      },
    ],
  },

  powerbi: {
    learningObjectives: [
      {
        en: 'Master Microsoft Power BI Desktop ecosystem, report canvas navigation, and VertiPaq tabular engine.',
        vi: 'Làm chủ hệ sinh thái Power BI Desktop, điều hướng khung vẽ báo cáo và kiến trúc VertiPaq dạng cột.',
      },
      {
        en: 'Perform end-to-end data cleansing, transformation, and ETL pipelines using Power Query (M).',
        vi: 'Thực hiện quy trình làm sạch, chuyển đổi và xử lý dữ liệu ETL hoàn chỉnh với Power Query (M).',
      },
      {
        en: 'Architect resilient Star Schema data models with 1-to-many relationships and single-direction filter propagation.',
        vi: 'Thiết kế mô hình dữ liệu Star Schema chuẩn với quan hệ 1-Nhiều và kiểm soát luồng lọc dữ liệu.',
      },
      {
        en: 'Formulate dynamic DAX measures, aggregations, context transition via CALCULATE, and Time Intelligence.',
        vi: 'Viết công thức đo lường DAX động, chuyển đổi ngữ cảnh bộ lọc qua CALCULATE và phân tích thời gian YTD.',
      },
      {
        en: 'Design executive dashboards with interactive slicers, KPI cards, visual hierarchy, and capstone reporting.',
        vi: 'Thiết kế dashboard quản trị điều hành với slicer tương tác, thẻ KPI, phân cấp thị giác và đồ án thực tế.',
      },
    ],
    whatYouWillLearn: [
      {
        en: 'Connecting to varied data sources (Excel, CSV, Web tables) and VertiPaq compression mechanics',
        vi: 'Kết nối đa dạng nguồn dữ liệu (Excel, CSV, Web) và cơ chế nén VertiPaq trong bộ nhớ',
      },
      {
        en: 'Power Query M ETL: Promoting headers, type casting, merging queries, unpivoting columns',
        vi: 'ETL với Power Query M: Đưa dòng thành tiêu đề, chuẩn hóa kiểu dữ liệu, ghép bảng và unpivot cột',
      },
      {
        en: 'Star Schema fundamentals: Fact vs Dimension tables, primary/foreign keys, cardinality (1:*)',
        vi: 'Mô hình Star Schema: Bảng Fact vs Dimension, khóa chính/ngoại và quan hệ 1-Nhiều',
      },
      {
        en: 'Essential DAX functions: SUM, AVERAGE, MIN, MAX, COUNTROWS, DISTINCTCOUNT, DIVIDE safe division',
        vi: 'Hàm DAX cốt lõi: SUM, AVERAGE, MIN, MAX, COUNTROWS, DISTINCTCOUNT và hàm chia an toàn DIVIDE',
      },
      {
        en: 'Mastering CALCULATE, ALL(), ALLEXCEPT(), filter modifiers, and iterator functions (SUMX, AVERAGEX)',
        vi: 'Làm chủ CALCULATE, xóa bỏ bộ lọc ALL(), điều kiện lọc và nhóm hàm vòng lặp SUMX, AVERAGEX',
      },
      {
        en: 'Executive reporting: KPI Cards, Clustered Bar/Column charts, Slicers, Matrix tables, and Drill-through',
        vi: 'Báo cáo điều hành: Thẻ KPI, biểu đồ cột/thanh, Slicer tương tác, bảng ma trận và Drill-through',
      },
    ],
    prerequisites: [
      {
        en: 'Basic familiarity with tabular data (e.g. Excel tables or spreadsheets). No coding experience required.',
        vi: 'Hiểu biết cơ bản về dữ liệu bảng (như bảng tính Excel). Không yêu cầu kinh nghiệm lập trình từ trước.',
      },
    ],
    targetAudience: [
      {
        en: 'Data analysts, business analysts, finance professionals, operations managers, and aspiring BI developers.',
        vi: 'Chuyên viên phân tích dữ liệu, Business Analyst, chuyên viên tài chính và những ai muốn làm chủ BI.',
      },
    ],
    keyHighlights: [
      {
        en: 'Interactive browser-based Power BI Practice Workspace with live DAX engine, multi-view report studio, and instant feedback.',
        vi: 'Không gian thực hành Power BI tương tác trên trình duyệt với bộ máy tính DAX trực tiếp và phản hồi tức thì.',
      },
    ],
  },
};

export const getCourseMetadata = (courseId: CourseId): CourseDetailMetadata => {
  return courseDetailMetadataMap[courseId] || courseDetailMetadataMap.python;
};
