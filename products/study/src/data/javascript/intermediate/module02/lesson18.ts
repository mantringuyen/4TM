import { Lesson } from '../../../../types';

export const lesson18: Lesson = {
  "id": "js_lesson_18",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_4",
  "order": 18,
  "title": {
    "en": "DOM Manipulation, Traversal & High-Performance Rendering",
    "vi": "Thao Tác DOM, Điều Hướng & Kết Xuất Hiệu Năng Cao"
  },
  "summary": {
    "en": "Master DOM queries, node creation, subtree traversal, classList/dataset APIs, DocumentFragment batching, and eliminating layout thrashing / reflows.",
    "vi": "Làm chủ truy vấn DOM, tạo thẻ động, duyệt cây phân cấp, API classList/dataset, tối ưu gom cụm bằng DocumentFragment và phòng chống giật lag layout reflow."
  },
  "estimatedMinutes": 22,
  "topicId": "js_dom_manipulation",
  "learn": {
    "introduction": {
      "en": "The Document Object Model (DOM) is an object-oriented structural representation of an HTML document. JavaScript communicates with the browser layout engine through the DOM API to dynamically query elements, insert nodes, alter CSS styling, and handle user interactions. Writing performant DOM code requires understanding the expensive costs of browser reflows and repaints.",
      "vi": "Document Object Model (DOM) là mô hình hướng đối tượng đại diện cho tài liệu HTML. JavaScript giao tiếp với engine giao diện của trình duyệt thông qua DOM API để tìm kiếm phần tử, chèn thẻ động, thay đổi style CSS và xử lý tương tác. Viết mã DOM hiệu năng cao đòi hỏi hiểu rõ chi phí đắt đỏ của các quá trình Reflow (tính toán lại bố cục) và Repaint (vẽ lại điểm ảnh)."
    },
    "conceptExplanation": {
      "en": "1. Modern Querying: `document.querySelector(selector)` (returns first match or null) and `document.querySelectorAll(selector)` (returns static NodeList, compatible with `.forEach()`).\n\n2. Creating & Inserting Elements: `document.createElement(tagName)`, `element.append(...nodesOrStrings)`, `element.prepend()`, `element.before()`, `element.after()`, and `element.remove()`.\n\n3. High-Performance Batching with `DocumentFragment`: An in-memory lightweight node container. Appending 1,000 items to a Fragment and mounting the Fragment into the DOM triggers ONLY 1 reflow instead of 1,000!\n\n4. Class & Data Manipulation: `element.classList.add()`, `.remove()`, `.toggle()`, `.contains()`, and custom data attributes via `element.dataset.myKey`.\n\n5. Layout Thrashing Prevention: Reading geometric properties (`offsetWidth`, `getBoundingClientRect()`) immediately after writing styles (`element.style.width = ...`) forces synchronous layout calculations.",
      "vi": "1. Truy Vấn Hiện Đại: `document.querySelector(selector)` (trả về phần tử đầu tiên hoặc null) và `document.querySelectorAll(selector)` (trả về NodeList tĩnh, hỗ trợ `.forEach()`).\n\n2. Tạo & Chèn Thẻ Động: `document.createElement(tagName)`, `element.append()`, `element.prepend()`, `element.before()`, `element.after()` và `element.remove()`.\n\n3. Gom Cụm Hiệu Năng Cao Bằng `DocumentFragment`: Vùng chứa node ảo trong bộ nhớ. Chèn 1,000 thẻ vào Fragment rồi mới gắn Fragment vào DOM chỉ gây ra ĐÚNG 1 lần Reflow thay vì 1,000 lần!\n\n4. Thao Tác Class & Data: `element.classList.add()`, `.remove()`, `.toggle()`, `.contains()` và thuộc tính dữ liệu qua `element.dataset.myKey`.\n\n5. Chống Giật Lag Layout Thrashing: Đọc kích thước hình học (`offsetWidth`, `getBoundingClientRect()`) ngay sau khi vừa gán style sẽ ép trình duyệt phải tính toán lại bố cục đồng bộ cực kỳ tốn tài nguyên."
    },
    "syntax": "// 1. Efficient batched insertion with DocumentFragment\nconst userList = document.querySelector(\"#user-list\");\nconst fragment = document.createDocumentFragment();\n\nconst users = [\"Alex\", \"Elena\", \"Marcus\", \"Jessica\"];\nusers.forEach(name => {\n  const li = document.createElement(\"li\");\n  li.className = \"user-item flex items-center p-2\";\n  li.dataset.userId = name.toLowerCase();\n  li.textContent = name;\n  fragment.appendChild(li); // No DOM reflow yet!\n});\n\nuserList.appendChild(fragment); // Triggers exactly ONE layout reflow!\n\n// 2. ClassList toggling with boolean force\nconst modal = document.querySelector(\".modal\");\nmodal.classList.toggle(\"hidden\", false); // Forces modal to show",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Dynamic Virtual List Component Renderer",
          "vi": "Bộ Render Danh Sách Dữ Liệu Động Hiệu Năng Cao"
        },
        "description": {
          "en": "Demonstrates building, updating, and clearing a dynamic data table using modern DOM methods and DocumentFragment.",
          "vi": "Minh họa khởi tạo, cập nhật và dọn sạch bảng dữ liệu động bằng các phương thức DOM hiện đại và DocumentFragment."
        },
        "code": "function renderProductTable(container, products) {\n  // Clear container cleanly\n  container.replaceChildren();\n\n  const fragment = document.createDocumentFragment();\n\n  products.forEach(prod => {\n    const row = document.createElement(\"tr\");\n    row.dataset.productId = prod.id;\n\n    const nameCell = document.createElement(\"td\");\n    nameCell.textContent = prod.name;\n\n    const priceCell = document.createElement(\"td\");\n    priceCell.textContent = `$${prod.price.toFixed(2)}`;\n\n    const statusCell = document.createElement(\"td\");\n    const badge = document.createElement(\"span\");\n    badge.textContent = prod.inStock ? \"In Stock\" : \"Out of Stock\";\n    badge.className = prod.inStock ? \"badge-success\" : \"badge-danger\";\n    statusCell.appendChild(badge);\n\n    row.append(nameCell, priceCell, statusCell);\n    fragment.appendChild(row);\n  });\n\n  container.appendChild(fragment);\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Setting `innerHTML` in a loop (e.g. `container.innerHTML += '<div>' + item + '</div>'`).",
          "vi": "Nối chuỗi `innerHTML` trong vòng lặp (ví dụ `container.innerHTML += '<div>' + item + '</div>'`)."
        },
        "correction": {
          "en": "Use `DocumentFragment` with `createElement`, or construct the full HTML string first and assign `innerHTML` once outside the loop.",
          "vi": "Dùng `DocumentFragment` với `createElement`, hoặc ghép chuỗi HTML hoàn chỉnh rồi mới gán `innerHTML` một lần duy nhất ngoài vòng lặp."
        }
      }
    ],
    "tips": [
      {
        "en": "Use textContent instead of innerHTML when rendering untrusted text: `textContent` safely escapes script tags and special characters, preventing Cross-Site Scripting (XSS) vulnerabilities.",
        "vi": "Dùng textContent thay vì innerHTML khi render nội dung văn bản của người dùng: `textContent` tự động escape các thẻ độc hại, ngăn chặn hoàn toàn lỗ hổng bảo mật tấn công Cross-Site Scripting (XSS)."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_18_1",
      "type": "complete_code",
      "title": {
        "en": "Dynamic Breadcrumb Builder",
        "vi": "Tạo Thanh Điều Hướng Breadcrumb Động Bằng DOM API"
      },
      "instruction": {
        "en": "Write a function `buildBreadcrumbs(crumbs)` that takes an array of `{ label, href }` and returns a `<nav>` element containing an `<ol>` list with `<li>` links. The last item must be a `<span>` with `aria-current=\"page\"` instead of a link.",
        "vi": "Viết hàm `buildBreadcrumbs(crumbs)` nhận mảng `{ label, href }` và trả về thẻ `<nav>` chứa danh sách `<ol>` với các thẻ `<li>` liên kết. Phần tử cuối cùng phải là thẻ `<span>` có `aria-current=\"page\"` thay vì liên kết `<a>`."
      },
      "starterCode": "function buildBreadcrumbs(crumbs) {\n  // Construct DOM breadcrumbs\n}\n\nconst items = [\n  { label: \"Home\", href: \"/\" },\n  { label: \"Products\", href: \"/products\" },\n  { label: \"Keyboards\", href: \"/products/keyboards\" }\n];\nconst nav = buildBreadcrumbs(items);\nconsole.log(nav.outerHTML);",
      "solutionCode": "function buildBreadcrumbs(crumbs) {\n  const nav = document.createElement(\"nav\");\n  nav.setAttribute(\"aria-label\", \"Breadcrumb\");\n\n  const ol = document.createElement(\"ol\");\n  ol.className = \"breadcrumb-list\";\n\n  crumbs.forEach((crumb, index) => {\n    const li = document.createElement(\"li\");\n    const isLast = index === crumbs.length - 1;\n\n    if (isLast) {\n      const span = document.createElement(\"span\");\n      span.textContent = crumb.label;\n      span.setAttribute(\"aria-current\", \"page\");\n      li.appendChild(span);\n    } else {\n      const a = document.createElement(\"a\");\n      a.href = crumb.href;\n      a.textContent = crumb.label;\n      li.appendChild(a);\n    }\n\n    ol.appendChild(li);\n  });\n\n  nav.appendChild(ol);\n  return nav;\n}",
      "hint": {
        "en": "Iterate with index. Check `index === crumbs.length - 1` to create span with aria-current or anchor link.",
        "vi": "Duyệt qua chỉ số index. Kiểm tra `index === crumbs.length - 1` để tạo span với aria-current hoặc thẻ a."
      }
    },
    {
      "id": "js_ex_18_2",
      "type": "complete_code",
      "title": {
        "en": "DOM Tree Deep Search by Attribute",
        "vi": "Tìm Kiếm Node Sâu Trong Cây DOM Theo Thuộc Tính"
      },
      "instruction": {
        "en": "Write a function `findNodesByDataAttr(rootNode, attrName, attrValue)` that recursively traverses child nodes of `rootNode` and returns an array of all element nodes having `element.dataset[attrName] === attrValue`.",
        "vi": "Viết hàm `findNodesByDataAttr(rootNode, attrName, attrValue)` duyệt đệ quy cây con của `rootNode` và trả về mảng tất cả các element node có `element.dataset[attrName] === attrValue`."
      },
      "starterCode": "function findNodesByDataAttr(rootNode, attrName, attrValue) {\n  // Recursively find matching nodes\n}",
      "solutionCode": "function findNodesByDataAttr(rootNode, attrName, attrValue) {\n  const matches = [];\n\n  function traverse(node) {\n    if (!node || node.nodeType !== 1) return; // Only element nodes\n\n    if (node.dataset && node.dataset[attrName] === attrValue) {\n      matches.push(node);\n    }\n\n    for (const child of node.children) {\n      traverse(child);\n    }\n  }\n\n  traverse(rootNode);\n  return matches;\n}",
      "hint": {
        "en": "Check node.nodeType === 1 and compare node.dataset[attrName], then recurse on node.children.",
        "vi": "Kiểm tra node.nodeType === 1 và so sánh node.dataset[attrName], sau đó đệ quy trên node.children."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_18",
    "title": {
      "en": "Lightweight Declarative Virtual DOM / Hyperscript Builder",
      "vi": "Bộ Tạo Cây DOM Khai Báo Phong Cách Hyperscript (Mini JSX Engine)"
    },
    "description": {
      "en": "Build a hyperscript DOM factory function `h(tag, props, ...children)` that creates real DOM nodes. `props` can contain attributes, classes (`class` or `className`), dataset properties (`dataset`), and event listeners (keys starting with `on`, e.g. `onClick`). Children can be nested elements or strings/numbers.",
      "vi": "Xây dựng hàm tạo DOM khai báo `h(tag, props, ...children)` tạo ra các DOM node thực tế. `props` có thể chứa thuộc tính, class, dataset và event listener (key bắt đầu bằng `on`, ví dụ `onClick`). Children có thể là các element lồng nhau hoặc chuỗi/số."
    },
    "starterCode": "function h(tag, props, ...children) {\n  // Implement hyperscript DOM generator\n}\n\nconst vdom = h(\"div\", { className: \"card\", dataset: { role: \"admin\" } },\n  h(\"h2\", null, \"Title\"),\n  h(\"button\", { onClick: () => console.log(\"Clicked\") }, \"Save\")\n);\nconsole.log(vdom.outerHTML);",
    "solutionCode": "function h(tag, props, ...children) {\n  const el = document.createElement(tag);\n\n  if (props) {\n    for (const [key, value] of Object.entries(props)) {\n      if (key.startsWith(\"on\") && typeof value === \"function\") {\n        const eventName = key.slice(2).toLowerCase();\n        el.addEventListener(eventName, value);\n      } else if (key === \"className\" || key === \"class\") {\n        el.className = value;\n      } else if (key === \"dataset\" && typeof value === \"object\") {\n        Object.assign(el.dataset, value);\n      } else if (key === \"style\" && typeof value === \"object\") {\n        Object.assign(el.style, value);\n      } else if (value !== null && value !== undefined) {\n        el.setAttribute(key, value);\n      }\n    }\n  }\n\n  children.flat().forEach(child => {\n    if (child === null || child === undefined) return;\n    if (typeof child === \"string\" || typeof child === \"number\") {\n      el.appendChild(document.createTextNode(String(child)));\n    } else if (child instanceof Node) {\n      el.appendChild(child);\n    }\n  });\n\n  return el;\n}",
    "hints": [
      {
        "en": "Create element with document.createElement(tag). Process event handlers starting with 'on', apply className/dataset, and append text or element children.",
        "vi": "Tạo thẻ với document.createElement(tag). Xử lý event handler bắt đầu bằng 'on', gán className/dataset và nối text node hoặc element con."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Lightweight Declarative Virtual DOM / Hyperscript Builder according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Tạo Cây DOM Khai Báo Phong Cách Hyperscript (Mini JSX Engine) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_18_1",
      "type": "single_choice",
      "question": {
        "en": "What is the key performance benefit of using a `DocumentFragment` when adding multiple DOM nodes?",
        "vi": "Lợi ích hiệu năng then chốt khi sử dụng `DocumentFragment` để thêm nhiều DOM node là gì?"
      },
      "options": [
        {
          "en": "It exists purely in memory; appending it to the real DOM triggers only a single layout reflow and repaint",
          "vi": "Nó chỉ tồn tại trong bộ nhớ; khi gắn vào DOM thật chỉ kích hoạt đúng 1 lần Reflow và Repaint"
        },
        {
          "en": "It compresses the HTML file size",
          "vi": "Nó nén dung lượng file HTML"
        },
        {
          "en": "It automatically translates text to English",
          "vi": "Nó tự động dịch văn bản sang tiếng Anh"
        },
        {
          "en": "It bypasses JavaScript single-threading",
          "vi": "Nó chạy bỏ qua mô hình đơn luồng của JavaScript"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "A DocumentFragment acts as an off-screen node buffer, minimizing expensive DOM rendering reflows.",
        "vi": "DocumentFragment đóng vai trò như bộ đệm node ngoài màn hình, giảm thiểu các đợt reflow đắt đỏ."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "easy"
    },
    {
      "id": "js_q_18_2",
      "type": "predict_output",
      "question": {
        "en": "What does `document.querySelectorAll()` return?",
        "vi": "`document.querySelectorAll()` trả về kiểu dữ liệu gì?"
      },
      "options": [
        {
          "en": "A static (non-live) NodeList containing all matched elements",
          "vi": "Một NodeList tĩnh (không tự cập nhật) chứa toàn bộ phần tử khớp điều kiện"
        },
        {
          "en": "A standard JavaScript Array",
          "vi": "Một mảng Array tiêu chuẩn của JavaScript"
        },
        {
          "en": "A live HTMLCollection",
          "vi": "Một HTMLCollection động tự cập nhật"
        },
        {
          "en": "The first matched element or null",
          "vi": "Phần tử đầu tiên khớp hoặc null"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`querySelectorAll()` returns a static NodeList representing a snapshot of elements matching the CSS selector at query time.",
        "vi": "`querySelectorAll()` trả về một NodeList tĩnh đại diện cho ảnh chụp các phần tử khớp CSS selector tại thời điểm truy vấn."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "easy"
    },
    {
      "id": "js_q_18_3",
      "type": "single_choice",
      "question": {
        "en": "Why is `element.textContent` preferred over `element.innerHTML` for user-supplied string data?",
        "vi": "Tại sao `element.textContent` an toàn hơn `element.innerHTML` khi hiển thị dữ liệu do người dùng nhập?"
      },
      "options": [
        {
          "en": "`textContent` treats all input as plain text without parsing HTML tags, preventing XSS attacks",
          "vi": "`textContent` xử lý toàn bộ dữ liệu như văn bản thô không phân tích thẻ HTML, ngăn chặn tấn công XSS"
        },
        {
          "en": "`innerHTML` is deprecated in HTML5",
          "vi": "`innerHTML` đã bị xóa bỏ trong HTML5"
        },
        {
          "en": "`textContent` converts text to uppercase",
          "vi": "`textContent` tự động viết hoa văn bản"
        },
        {
          "en": "`textContent` only accepts numbers",
          "vi": "`textContent` chỉ nhận số"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`textContent` avoids parsing input as HTML markup, mitigating injection vulnerabilities.",
        "vi": "`textContent` không phân tích chuỗi thành mã HTML, giúp loại bỏ nguy cơ bị tấn công chèn mã độc."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "easy"
    },
    {
      "id": "js_q_18_4",
      "type": "predict_output",
      "question": {
        "en": "How do you access the custom HTML attribute `data-user-role=\"admin\"` in JavaScript?",
        "vi": "Cách truy cập thuộc tính tùy biến `data-user-role=\"admin\"` trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "element.dataset.userRole",
          "vi": "element.dataset.userRole"
        },
        {
          "en": "element.dataset['user-role']",
          "vi": "element.dataset['user-role']"
        },
        {
          "en": "element.dataUserRole",
          "vi": "element.dataUserRole"
        },
        {
          "en": "element.role",
          "vi": "element.role"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The HTML dataset API maps kebab-case attributes `data-user-role` to camelCase properties `dataset.userRole`.",
        "vi": "Dataset API tự động chuyển đổi thuộc tính dạng kebab-case `data-user-role` thành camelCase `dataset.userRole`."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "medium"
    },
    {
      "id": "js_q_18_5",
      "type": "single_choice",
      "question": {
        "en": "What is 'Layout Thrashing' in web performance?",
        "vi": "'Layout Thrashing' trong tối ưu hiệu năng web là hiện tượng gì?"
      },
      "options": [
        {
          "en": "Rapidly interleaving DOM style writes and layout property reads, forcing repeated synchronous reflows",
          "vi": "Việc đọc kích thước layout và ghi style xen kẽ liên tục, ép trình duyệt phải tính toán reflow đồng bộ nhiều lần"
        },
        {
          "en": "A CSS animation that runs at 120 FPS",
          "vi": "Một animation CSS chạy ở 120 FPS"
        },
        {
          "en": "A server crash caused by heavy traffic",
          "vi": "Server bị sập do lưu lượng truy cập cao"
        },
        {
          "en": "Using Tailwind with Bootstrap together",
          "vi": "Sử dụng đồng thời Tailwind và Bootstrap"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Alternating writes (`el.style.width = '10px'`) and reads (`el.offsetWidth`) forces synchronous layout thrashing.",
        "vi": "Xen kẽ lệnh ghi style và đọc kích thước ép trình duyệt phải tính toán lại layout liên tục, gây tụt khung hình nghiêm trọng."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "medium"
    },
    {
      "id": "js_q_18_6",
      "type": "predict_output",
      "question": {
        "en": "What does `element.classList.toggle('active', isOpened)` do when `isOpened` is a boolean?",
        "vi": "Phương thức `element.classList.toggle('active', isOpened)` thực hiện điều gì khi `isOpened` là biến boolean?"
      },
      "options": [
        {
          "en": "If `isOpened` is true, adds the 'active' class; if false, removes the 'active' class",
          "vi": "Nếu `isOpened` là true, thêm class 'active'; nếu false, xóa class 'active'"
        },
        {
          "en": "Always deletes the class regardless of boolean",
          "vi": "Luôn xóa class bất kể giá trị boolean"
        },
        {
          "en": "Throws a TypeError",
          "vi": "Ném lỗi TypeError"
        },
        {
          "en": "Toggles the class twice",
          "vi": "Bật tắt class 2 lần"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The second parameter of `classList.toggle` acts as a force flag: `true` adds, `false` removes.",
        "vi": "Tham số thứ hai của `classList.toggle` đóng vai trò là cờ ép buộc: `true` sẽ thêm, `false` sẽ xóa."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "medium"
    },
    {
      "id": "js_q_18_7",
      "type": "fill_blank",
      "question": {
        "en": "To instantly empty all child nodes of a parent element in modern browsers, call parentElement._____ ().",
        "vi": "Để xóa sạch toàn bộ các node con của một phần tử cha trong trình duyệt hiện đại, gọi parentElement._____ ()."
      },
      "options": [
        {
          "en": "Option A",
          "vi": "Đáp án A"
        },
        {
          "en": "Option B",
          "vi": "Đáp án B"
        },
        {
          "en": "Option C",
          "vi": "Đáp án C"
        },
        {
          "en": "Option D",
          "vi": "Đáp án D"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`parentElement.replaceChildren()` with no arguments cleanly empties all children without innerHTML overhead.",
        "vi": "`parentElement.replaceChildren()` khi không truyền tham số sẽ xóa sạch toàn bộ node con một cách tối ưu."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "replacechildren"
      ]
    },
    {
      "id": "js_q_18_8",
      "type": "single_choice",
      "question": {
        "en": "What is the difference between `element.remove()` and `parentElement.removeChild(child)`?",
        "vi": "Điểm khác biệt giữa `element.remove()` và `parentElement.removeChild(child)` là gì?"
      },
      "options": [
        {
          "en": "`element.remove()` directly deletes the element without needing a reference to its parent node",
          "vi": "`element.remove()` xóa trực tiếp phần tử mà không cần phải truy vết tới thẻ cha"
        },
        {
          "en": "`removeChild()` is asynchronous",
          "vi": "`removeChild()` là bất đồng bộ"
        },
        {
          "en": "`element.remove()` only works on input tags",
          "vi": "`element.remove()` chỉ hoạt động trên thẻ input"
        },
        {
          "en": "There is no difference in syntax",
          "vi": "Không có sự khác biệt về cú pháp"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`element.remove()` is the modern convenient DOM method that removes the node directly from its tree.",
        "vi": "`element.remove()` là phương thức hiện đại cho phép tự gỡ bỏ node khỏi cây DOM một cách thuận tiện."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "hard"
    },
    {
      "id": "js_q_18_9",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log(document.getElementById('missing'))` return if no such element exists?",
        "vi": "`document.getElementById('missing')` sẽ trả về giá trị gì nếu không tìm thấy phần tử?"
      },
      "options": [
        {
          "en": "null",
          "vi": "null"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
        },
        {
          "en": "An empty HTMLCollection",
          "vi": "Một HTMLCollection rỗng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`getElementById` and `querySelector` return `null` when no element matches the query.",
        "vi": "`getElementById` và `querySelector` luôn trả về `null` khi không tìm thấy phần tử khớp."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "hard"
    },
    {
      "id": "js_q_18_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `element.append('Hello ', node)` more versatile than `element.appendChild(node)`?",
        "vi": "Tại sao `element.append('Hello ', node)` lại linh hoạt hơn `element.appendChild(node)`?"
      },
      "options": [
        {
          "en": "`append()` accepts multiple arguments and can insert plain strings directly as text nodes, whereas `appendChild()` accepts only 1 Node object",
          "vi": "`append()` nhận nhiều đối số và có thể chèn chuỗi văn bản trực tiếp thành text node, trong khi `appendChild()` chỉ nhận đúng 1 Node object"
        },
        {
          "en": "`append()` runs in WebAssembly",
          "vi": "`append()` chạy trong WebAssembly"
        },
        {
          "en": "`appendChild()` deletes the CSS stylesheet",
          "vi": "`appendChild()` xóa file CSS"
        },
        {
          "en": "`append()` is deprecated",
          "vi": "`append()` đã bị lỗi thời"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The modern `append()` API supports variadic arguments and automatic DOMString-to-TextNode conversion.",
        "vi": "API hiện đại `append()` hỗ trợ truyền nhiều tham số và tự động chuyển đổi chuỗi thành TextNode."
      },
      "topicId": "js_dom_manipulation",
      "difficulty": "hard"
    }
  ]
};
export default lesson18;
