import { Book } from '../../types';

export const HTML_COMMON_ERRORS_BOOK: Book = {
  id: 'html-common-errors',
  slug: 'html-common-errors',
  title: 'HTML Common Errors & Markup Bugs',
  subtitle: {
    en: 'Parsing Faults, Invalid Nesting, Duplicate IDs & Accessibility Anti-Patterns',
    vi: 'Lỗi Parse Trình Duyệt, Lồng Thẻ Sai Quy Tắc, Trùng Lặp ID & Sai Lầm Accessibility',
  },
  bookType: 'Common Errors',
  categoryId: 'html',
  subjectId: 'web',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '30 mins',
  chaptersCount: 2,
  publishedDate: '2025-01-25',
  accentColor: 'from-amber-600 to-red-700',
  tags: ['HTML5', 'Invalid Markup', 'Nesting Bugs', 'Accessibility Errors', 'Debugging'],
  description: {
    en: 'Systematic diagnosis and remediation guide for common HTML pitfalls: browser auto-closing parser bugs from block-inside-inline nesting, duplicate ID collisions, the div-as-button anti-pattern, and missing image alt attributes.',
    vi: 'Cẩm nang chẩn đoán và khắc phục có hệ thống cho các lỗi HTML thường gặp: lỗi trình duyệt tự động đóng thẻ khi lồng block vào inline, xung đột trùng lặp ID, sai lầm dùng thẻ div làm button và thiếu thuộc tính alt hình ảnh.',
  },
  prerequisites: {
    en: [
      'Basic familiarity with writing HTML markup and browser DevTools element inspection',
    ],
    vi: [
      'Làm quen cơ bản với việc viết mã HTML và công cụ Elements trong DevTools trình duyệt',
    ],
  },
  outcomes: {
    en: [
      'Diagnose and resolve HTML parser auto-closing errors caused by invalid block-inside-inline element nesting',
      'Eliminate duplicate ID collisions that break CSS styling, label associations, and JavaScript selectors',
      'Replace inaccessible div buttons with native accessible <button> controls supporting keyboard and screen reader APIs',
    ],
    vi: [
      'Chẩn đoán và xử lý triệt để lỗi trình duyệt tự đóng thẻ do lồng phần tử block bên trong thẻ inline',
      'Loại bỏ xung đột trùng lặp ID làm gãy định dạng CSS, liên kết nhãn label và truy vấn JavaScript',
      'Thay thế các nút div không tiếp cận bằng thẻ native <button> chuẩn hỗ trợ đầy đủ bàn phím và screen reader',
    ],
  },
  chapters: [
    {
      id: 'hce-ch-1',
      number: 1,
      slug: 'invalid-nesting-and-structure',
      title: {
        en: 'Invalid Nesting & Document Parsing Faults',
        vi: 'Lỗi Lồng Thẻ Không Hợp Lệ & Sai Sót Trình Phân Tích DOM',
      },
      summary: {
        en: 'Browser auto-closing anomalies from block-in-paragraph nesting and duplicate ID conflicts breaking accessibility and DOM traversal.',
        vi: 'Hiện tượng trình duyệt tự động đóng thẻ khi lồng block trong paragraph và xung đột trùng lặp ID làm gãy cây DOM.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'hce-1-1',
          title: {
            en: 'The Block-Inside-Inline Nesting Parser Trap',
            vi: 'Bẫy Lồng Phần Tử Block Vào Bên Trong Thẻ Paragraph (<p>)',
          },
          keyIdea: {
            en: 'HTML parsing rules mandate that encountering a block element (like <div> or <table>) inside an unclosed <p> automatically generates an implicit </p> tag, splitting your DOM hierarchy.',
            vi: 'Quy tắc phân tích cú pháp HTML quy định rằng khi gặp một thẻ block (như <div> hay <table>) bên trong một thẻ <p> chưa đóng, trình duyệt sẽ tự động chèn thẻ </p> để đóng ngắt, làm gãy cấu trúc DOM.',
          },
          content: {
            en: 'According to the HTML specification, `<p>` elements cannot contain block-level elements. When the browser\'s HTML parser encounters an opening `<div>` while inside a `<p>`, it immediately and silently injects an end tag `</p>`, inserts the `<div>` as a sibling node, and then leaves any trailing text orphaned or wraps it in another empty `<p>`. This silent error causes unexpected CSS layout collapses and breaks JavaScript DOM traversal.',
            vi: 'Theo đặc tả HTML, phần tử `<p>` không thể chứa các phần tử cấp khối (block-level). Khi trình phân tích HTML của trình duyệt gặp thẻ mở `<div>` trong khi đang nằm trong `<p>`, nó sẽ ngay lập tức tự động chèn thẻ đóng `</p>`, đưa `<div>` ra ngoài thành nút ngang hàng (sibling), và khiến phần văn bản phía sau bị bơ vơ hoặc bị bọc trong một thẻ `<p>` rỗng khác. Lỗi ngầm này khiến bố cục CSS bị vỡ và làm gãy các chuỗi truy vấn DOM trong JavaScript.',
          },
          errorDetails: {
            errorSignature: {
              en: 'DOM Structure Split / Unexpected Sibling Nodes on <p><div>...</div></p>',
              vi: 'Phân Tách Cấu Trúc DOM / Nút Con Biến Thành Nút Ngang Hàng trên <p><div>...</div></p>',
            },
            symptoms: {
              en: [
                'CSS selectors targeting p > div fail completely',
                'Spacing collapses unexpectedly between paragraphs',
                'Inspect Elements reveals three separate sibling tags instead of one parent-child hierarchy',
              ],
              vi: [
                'CSS selector dạng p > div thất bại hoàn toàn',
                'Khoảng cách lề margin bị co xẹp bất thường giữa các đoạn văn',
                'Công cụ Inspect Elements hiển thị 3 thẻ ngang hàng thay vì cấu trúc cha-con lồng nhau',
              ],
            },
            minimalReproduction: {
              language: 'html',
              filename: 'broken_nesting.html',
              code: `<!-- BROKEN: Inserting block inside paragraph -->
<p class="article-callout">
  Important announcement:
  <div class="alert-box">Server maintenance at 02:00 UTC.</div>
  Please plan accordingly.
</p>`,
            },
            whyItHappens: {
              en: 'The HTML parsing algorithm explicitly closes open paragraph elements upon encountering any block formatting tag to maintain specification compliance.',
              vi: 'Thuật toán phân tích cú pháp HTML tự động đóng các phần tử đoạn văn khi bắt gặp bất kỳ thẻ định dạng khối nào để tuân thủ đặc tả.',
            },
            diagnosisSteps: {
              en: [
                'Open Chrome/Firefox DevTools and select the Elements inspector tab',
                'Inspect the rendered DOM tree structure (not the raw page source)',
                'Observe if the <p> tag is closed before the <div> and a second <p> tag is automatically generated afterwards',
              ],
              vi: [
                'Mở DevTools trên Chrome/Firefox và chọn tab Elements inspector',
                'Kiểm tra cấu trúc cây DOM thực tế đã được render (không phải View Source thô)',
                'Quan sát xem thẻ <p> có bị tự đóng trước <div> và một thẻ <p> thứ hai tự sinh ra phía sau hay không',
              ],
            },
            correctFix: {
              language: 'html',
              filename: 'fixed_nesting.html',
              explanation: {
                en: 'Use a container <div> or <section> containing separate <p> and <div> children, or use inline <span> with CSS styling.',
                vi: 'Sử dụng thẻ chứa <div> hoặc <section> bọc các nút con <p> và <div> riêng biệt, hoặc dùng thẻ <span> nội tuyến.',
              },
              code: `<!-- CORRECT: Semantic container with distinct paragraph and alert children -->
<section class="article-callout">
  <p>Important announcement:</p>
  <div class="alert-box" role="alert">Server maintenance at 02:00 UTC.</div>
  <p>Please plan accordingly.</p>
</section>`,
            },
            fixExplanation: {
              en: 'Encapsulating the content in a semantic `<section>` allows both `<p>` paragraphs and the `<div>` alert to exist as valid, predictable block-level sibling nodes in the DOM tree.',
              vi: 'Bọc nội dung trong thẻ `<section>` ngữ nghĩa cho phép cả đoạn văn `<p>` và hộp thông báo `<div>` tồn tại hợp lệ dưới dạng các nút con ngang hàng chuẩn mực trong cây DOM.',
            },
            preventionRules: {
              en: [
                'Never place <div>, <p>, <ul>, <ol>, <table>, or <form> inside a <p> element',
                'Use an HTML linter (such as HTMLHint or ESLint with jsx-a11y) in your CI/CD build pipeline',
              ],
              vi: [
                'Không bao giờ đặt <div>, <p>, <ul>, <ol>, <table> hoặc <form> bên trong thẻ <p>',
                'Sử dụng công cụ linter (như HTMLHint hoặc ESLint) trong quy trình CI/CD',
              ],
            },
          },
        },
        {
          id: 'hce-1-2',
          title: {
            en: 'Duplicate ID Attribute Collisions',
            vi: 'Lỗi Trùng Lặp Thuộc Tính ID (Duplicate ID Collisions)',
          },
          keyIdea: {
            en: 'The id attribute must be unique across the entire document; duplicate IDs cause JavaScript document.getElementById to return only the first match and break <label for> associations.',
            vi: 'Thuộc tính id bắt buộc phải là duy nhất trên toàn bộ trang; trùng lặp ID khiến document.getElementById trong JS chỉ lấy phần tử đầu tiên và làm hỏng liên kết <label for>.',
          },
          content: {
            en: 'The HTML standard strictly mandates that the `id` attribute value must be globally unique within a document. When multiple elements share the same `id` (often caused by copy-pasting component templates or loops), `document.getElementById()` and `querySelector(\'#my-id\')` always return only the first matching DOM node, silently ignoring subsequent elements. Furthermore, clicking a `<label for="email">` on a second form will erroneously focus the first form\'s input on the page.',
            vi: 'Tiêu chuẩn HTML quy định nghiêm ngặt rằng giá trị thuộc tính `id` phải là duy nhất trên toàn bộ tài liệu. Khi nhiều phần tử dùng chung một `id` (thường do copy-paste component hoặc render vòng lặp), `document.getElementById()` và `querySelector(\'#my-id\')` luôn luôn chỉ trả về phần tử đầu tiên, bỏ qua hoàn toàn các phần tử sau. Thêm vào đó, việc nhấp chuột vào `<label for="email">` ở form thứ hai sẽ kích hoạt focus nhầm vào ô input của form đầu tiên.',
          },
          errorDetails: {
            errorSignature: {
              en: 'Duplicate ID Violation / Broken Form Associations & JavaScript Selection',
              vi: 'Xung Đột Trùng Lặp ID / Hỏng Liên Kết Form & Sai Lệch Truy Vấn JavaScript',
            },
            symptoms: {
              en: [
                'Form clicks focus the wrong input fields on the page',
                'JavaScript event handlers and document.getElementById() fail on subsequent duplicate elements',
                'WCAG accessibility automated scans fail with ID uniqueness violations',
              ],
              vi: [
                'Nhấp chuột vào nhãn label bị focus nhầm vào ô input ở vị trí khác trên trang',
                'Sự kiện JavaScript và document.getElementById() thất bại trên các phần tử trùng lặp xuất hiện phía sau',
                'Kiểm tra tự động WCAG báo lỗi vi phạm tính duy nhất của ID',
              ],
            },
            minimalReproduction: {
              language: 'html',
              filename: 'broken_duplicate_ids.html',
              code: `<!-- BROKEN: Repeated product cards sharing the same ID -->
<div class="product-card">
  <label for="quantity">Quantity:</label>
  <input type="number" id="quantity" name="quantity" value="1">
</div>

<div class="product-card">
  <label for="quantity">Quantity:</label>
  <input type="number" id="quantity" name="quantity" value="1">
</div>`,
            },
            whyItHappens: {
              en: 'Developers hardcode static id strings inside reusable template components instead of generating dynamic, scoped IDs per instance.',
              vi: 'Lập trình viên gán cứng chuỗi id tĩnh trong các component template tái sử dụng thay vì sinh mã ID động theo từng phiên bản.',
            },
            diagnosisSteps: {
              en: [
                'Run an automated accessibility validator (such as axe-core or Lighthouse)',
                'Search the HTML codebase for duplicate id="" strings across rendered output',
                'Verify that document.querySelectorAll(\'#id\') returns exactly one node',
              ],
              vi: [
                'Chạy công cụ kiểm tra tự động như axe-core hoặc Lighthouse',
                'Tìm kiếm chuỗi id="" trùng lặp trong toàn bộ mã HTML đã render',
                'Kiểm tra xem document.querySelectorAll(\'#id\') có trả về đúng 1 nút duy nhất hay không',
              ],
            },
            correctFix: {
              language: 'html',
              filename: 'fixed_scoped_ids.html',
              explanation: {
                en: 'Scope IDs dynamically per product ID or use CSS classes for non-unique styling hooks.',
                vi: 'Đặt ID động gắn liền với mã sản phẩm hoặc dùng CSS class cho các mục tiêu không cần định danh duy nhất.',
              },
              code: `<!-- CORRECT: Unique scoped IDs for each product instance -->
<div class="product-card" data-product-id="101">
  <label for="quantity-prod-101">Quantity:</label>
  <input type="number" id="quantity-prod-101" name="quantity_101" value="1">
</div>

<div class="product-card" data-product-id="102">
  <label for="quantity-prod-102">Quantity:</label>
  <input type="number" id="quantity-prod-102" name="quantity_102" value="1">
</div>`,
            },
            fixExplanation: {
              en: 'Assigning uniquely scoped identifiers (`quantity-prod-101`, `quantity-prod-102`) restores flawless label-to-input click focusing and guarantees precise JavaScript selection.',
              vi: 'Gán mã định danh duy nhất (`quantity-prod-101`, `quantity-prod-102`) khôi phục hoàn hảo tính năng focus khi nhấp label và đảm bảo truy vấn JavaScript chính xác 100%.',
            },
            preventionRules: {
              en: [
                'Never hardcode static id attributes inside loop-rendered UI components',
                'Use useId() in modern UI frameworks (React, Vue) to generate collision-free unique IDs automatically',
              ],
              vi: [
                'Không bao giờ gán cứng id tĩnh trong component render lặp lại',
                'Sử dụng hook useId() trong các UI framework hiện đại để tự sinh ID chống trùng lặp',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'hce-ch-2',
      number: 2,
      slug: 'div-button-accessibility-trap',
      title: {
        en: 'Accessibility & Semantic Misuse Anti-Patterns',
        vi: 'Sai Lầm Về Khả Năng Tiếp Cận & Lạm Dụng Thẻ Ngữ Nghĩa',
      },
      summary: {
        en: 'The div-as-button accessibility trap and missing image alt attributes breaking screen reader navigation.',
        vi: 'Bẫy lạm dụng thẻ div làm button và lỗi thiếu thuộc tính alt của hình ảnh làm hỏng trải nghiệm người dùng.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'hce-2-1',
          title: {
            en: 'The "Div as Button" Anti-Pattern',
            vi: 'Sai Lầm Lớn: Dùng Thẻ <div> Bắt Sự Kiện Click Làm Nút Bấm',
          },
          keyIdea: {
            en: 'Using <div onclick="..."> fails keyboard focus (Tab), keyboard execution (Enter/Space), and screen reader role announcements.',
            vi: 'Dùng <div onclick="..."> làm hỏng khả năng focus bằng phím Tab, không thể bấm bằng phím Enter/Space và không có thông báo role cho trình đọc màn hình.',
          },
          content: {
            en: 'Creating interactive buttons using `<div onclick="...">` or `<a href="#">` is one of the most widespread accessibility anti-patterns on the web. A generic `<div>` is completely invisible to keyboard Tab navigation, is not recognized as a button by screen readers, does not trigger on Enter or Space keypresses, and provides no native disabled state. Re-implementing these native behaviors manually with `tabindex="0"`, `role="button"`, and multiple `keydown` listeners requires dozens of lines of fragile JavaScript, whereas a native `<button>` provides all of them out of the box for free.',
            vi: 'Tạo nút bấm bằng cách gán sự kiện `<div onclick="...">` hoặc `<a href="#">` là một trong những sai lầm nghiêm trọng và phổ biến nhất về accessibility. Thẻ `<div>` hoàn toàn vô hình đối với phím Tab, không được trình đọc màn hình nhận diện là nút bấm, không phản hồi khi ấn phím Enter hay Space, và không có trạng thái disabled native. Việc cố gắng tái lập các tính năng này bằng `tabindex="0"`, `role="button"` và hàng loạt bộ lắng nghe `keydown` vừa tốn công vừa dễ gãy, trong khi thẻ native `<button>` cung cấp đầy đủ và hoàn hảo miễn phí.',
          },
          errorDetails: {
            errorSignature: {
              en: 'Inaccessible Control / Missing Button Semantics & Keyboard Listeners',
              vi: 'Nút Điều Khiển Không Tiếp Cận / Thiếu Ngữ Nghĩa Button & Phản Hồi Bàn Phím',
            },
            symptoms: {
              en: [
                'Keyboard-only users cannot focus the control using the Tab key',
                'Pressing Enter or Space while hovering does nothing',
                'Screen readers read only raw text without announcing "button"',
              ],
              vi: [
                'Người dùng bàn phím không thể dùng phím Tab để nhảy vào nút',
                'Nhấn phím Enter hoặc Space không kích hoạt được hành động',
                'Trình đọc màn hình chỉ đọc văn bản trơ trọi mà không thông báo "button"',
              ],
            },
            minimalReproduction: {
              language: 'html',
              filename: 'broken_div_button.html',
              code: `<!-- BROKEN: Fake button built with a div -->
<div class="custom-submit-btn" onclick="submitOrder()">
  Confirm & Pay $49
</div>`,
            },
            whyItHappens: {
              en: 'Developers mistakenly believe native <button> elements have difficult default browser styling and substitute simple <div> tags without realizing the massive loss of accessibility features.',
              vi: 'Lập trình viên nghĩ rằng thẻ <button> native khó bỏ định dạng mặc định nên thay bằng <div> mà không nhận ra đã làm mất toàn bộ tính năng tiếp cận.',
            },
            diagnosisSteps: {
              en: [
                'Try navigating your application using only the keyboard (Tab, Shift+Tab, Enter, Space)',
                'Observe whether the element receives a visible focus outline ring',
                'Press Space and Enter while the element is focused to verify it triggers the click action',
              ],
              vi: [
                'Thử điều hướng trang web chỉ bằng bàn phím (Tab, Shift+Tab, Enter, Space)',
                'Quan sát xem phần tử có nhận viền focus rõ ràng hay không',
                'Nhấn phím Space và Enter khi đang focus để xem có kích hoạt hành động hay không',
              ],
            },
            correctFix: {
              language: 'html',
              filename: 'fixed_native_button.html',
              explanation: {
                en: 'Use a standard <button type="button"> or <button type="submit"> with CSS styling.',
                vi: 'Sử dụng thẻ chuẩn <button type="button"> hoặc <button type="submit"> kết hợp định dạng CSS.',
              },
              code: `<!-- CORRECT: Native accessible button element -->
<button type="button" class="btn-primary" onclick="submitOrder()">
  Confirm & Pay $49
</button>`,
            },
            fixExplanation: {
              en: 'Native `<button>` elements automatically participate in the tab order, trigger click handlers on Enter and Space, communicate `role="button"` to assistive software, and support native `disabled` attributes.',
              vi: 'Thẻ `<button>` native tự động tham gia vào thứ tự tab, kích hoạt sự kiện khi ấn Enter và Space, thông báo `role="button"` tới phần mềm hỗ trợ và tương thích thuộc tính `disabled` native.',
            },
            preventionRules: {
              en: [
                'Always use <button> for page actions and <a> for URL navigations',
                'Never attach onclick handlers to non-interactive tags (div, span, p, section) without full ARIA keyboard parity',
              ],
              vi: [
                'Luôn dùng <button> cho các hành động trên trang và <a> cho chuyển trang URL',
                'Không bao giờ gắn sự kiện onclick vào thẻ không tương tác (div, span, p, section) nếu không có đủ hỗ trợ bàn phím ARIA',
              ],
            },
          },
        },
      ],
    },
  ],
};
