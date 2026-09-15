import { Lesson } from '../../../../types';

export const lesson19: Lesson = {
  "id": "js_lesson_19",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_4",
  "order": 19,
  "title": {
    "en": "Event Handling, Bubbling, Capturing & Delegation",
    "vi": "Xử Lý Sự Kiện, Bubbling, Capturing & Event Delegation"
  },
  "summary": {
    "en": "Master the 3 phases of DOM event propagation (Capturing, Target, Bubbling), stopPropagation vs preventDefault, passive event listeners, and scalable Event Delegation architecture.",
    "vi": "Làm chủ 3 giai đoạn lan truyền sự kiện DOM (Capturing, Target, Bubbling), phân biệt stopPropagation vs preventDefault, passive listener và kiến trúc ủy quyền sự kiện (Event Delegation)."
  },
  "estimatedMinutes": 22,
  "topicId": "js_events_delegation",
  "learn": {
    "introduction": {
      "en": "Events are the heartbeat of interactive web applications. When an interaction occurs (such as a click or keypress), the browser constructs an Event object and dispatches it through the DOM hierarchy in 3 distinct phases. Mastering Event Delegation allows you to attach a single event listener on a common ancestor rather than hundreds of separate listeners on dynamic children, drastically improving memory consumption and application speed.",
      "vi": "Sự kiện (Events) là nhịp tim của các ứng dụng web tương tác. Khi có tương tác người dùng (như click chuột hoặc gõ phím), trình duyệt tạo một đối tượng Event và truyền nó qua cây phân cấp DOM theo 3 giai đoạn. Kỹ thuật Ủy Quyền Sự Kiện (Event Delegation) cho phép bạn gắn một listener duy nhất lên thẻ cha thay vì hàng trăm listener trên các phần tử con động, giúp tối ưu bộ nhớ và tăng tốc độ ứng dụng đáng kể."
    },
    "conceptExplanation": {
      "en": "1. The 3 Phases of Event Propagation:\n   - Phase 1 (Capturing Phase): Event travels downwards from `window` through ancestors towards the target node.\n   - Phase 2 (Target Phase): Event reaches the actual interacted element (`event.target`).\n   - Phase 3 (Bubbling Phase): Event bubbles upwards from the target element back up to `window`.\n\n2. `event.target` vs `event.currentTarget`:\n   - `event.target`: The deepest element that initiated the event (e.g. the specific `<span>` or `<button>` clicked).\n   - `event.currentTarget` (or `this` in standard functions): The element whose listener is currently executing.\n\n3. Event Control Methods:\n   - `event.preventDefault()`: Cancels browser default behavior (e.g. form submit page reload, link navigation).\n   - `event.stopPropagation()`: Halts propagation along the capturing/bubbling path.\n   - `event.stopImmediatePropagation()`: Stops bubbling AND blocks other listeners on the same element.\n\n4. Event Delegation Pattern: Attach listener to parent container; use `event.target.closest(selector)` to identify matching child elements dynamically.\n\n5. Modern Options: `{ capture: true }`, `{ once: true }`, and `{ passive: true }` (critical for smooth 60fps scrolling on touch/wheel events).",
      "vi": "1. 3 Giai Đoạn Lan Truyền Sự Kiện (Propagation):\n   - Giai đoạn 1 (Capturing): Sự kiện đi từ `window` xuống các thẻ tổ tiên tới thẻ mục tiêu.\n   - Giai đoạn 2 (Target): Sự kiện chạm tới chính phần tử được tương tác (`event.target`).\n   - Giai đoạn 3 (Bubbling): Sự kiện nổi bọt ngược từ phần tử mục tiêu lên lại `window`.\n\n2. Phân Biệt `event.target` vs `event.currentTarget`:\n   - `event.target`: Phần tử thực tế phát sinh tương tác (thẻ `<span>` hoặc `<button>` được bấm).\n   - `event.currentTarget`: Phần tử đang gắn listener tiếp nhận và xử lý sự kiện.\n\n3. Các Hàm Kiểm Soát Sự Kiện:\n   - `event.preventDefault()`: Ngăn chặn hành vi mặc định của trình duyệt (reload trang khi submit form, chuyển trang khi click link).\n   - `event.stopPropagation()`: Ngăn chặn sự kiện lan truyền tiếp tục trên đường bubbling/capturing.\n   - `event.stopImmediatePropagation()`: Ngăn nổi bọt VÀ chặn luôn các listener khác trên cùng một thẻ.\n\n4. Kỹ Thuật Event Delegation: Gắn 1 listener duy nhất lên thẻ cha; dùng `event.target.closest(selector)` để bắt đúng thẻ con động.\n\n5. Cấu Hình Hiện Đại: `{ capture: true }`, `{ once: true }`, `{ passive: true }` (tối ưu cuộn mượt 60fps cho sự kiện touch/wheel)."
    },
    "syntax": "// 1. Scalable Event Delegation with closest()\nconst taskList = document.querySelector(\"#task-list\");\n\ntaskList.addEventListener(\"click\", (event) => {\n  // Find closest matching action button within clicked target\n  const deleteBtn = event.target.closest(\".btn-delete\");\n  if (deleteBtn && taskList.contains(deleteBtn)) {\n    const taskId = deleteBtn.dataset.id;\n    console.log(`Deleting task ${taskId}`);\n    deleteBtn.closest(\".task-item\")?.remove();\n  }\n});\n\n// 2. Custom Event creation and dispatching\nconst customEvent = new CustomEvent(\"cart:updated\", {\n  bubbles: true,\n  detail: { itemCount: 5, total: 99.50 }\n});\ndocument.dispatchEvent(customEvent);",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Dynamic Data Grid Action Bar with Event Delegation",
          "vi": "Thanh Tác Vụ Bảng Dữ Liệu Động Bằng Event Delegation"
        },
        "description": {
          "en": "Demonstrates delegating edit, delete, and toggle actions for thousands of dynamic table rows using a single centralized event listener.",
          "vi": "Minh họa ủy quyền các thao tác sửa, xóa, chuyển trạng thái cho hàng ngàn dòng bảng bằng 1 listener duy nhất."
        },
        "code": "function setupTableDelegation(tableElement, onAction) {\n  tableElement.addEventListener(\"click\", (event) => {\n    const actionBtn = event.target.closest(\"[data-action]\");\n    if (!actionBtn || !tableElement.contains(actionBtn)) return;\n\n    const action = actionBtn.dataset.action;\n    const row = actionBtn.closest(\"tr\");\n    const rowId = row?.dataset.rowId;\n\n    switch (action) {\n      case \"delete\":\n        onAction({ type: \"DELETE\", id: rowId });\n        break;\n      case \"edit\":\n        onAction({ type: \"EDIT\", id: rowId });\n        break;\n      case \"toggle\":\n        onAction({ type: \"TOGGLE\", id: rowId });\n        break;\n    }\n  });\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Checking `if (event.target.tagName === 'BUTTON')` instead of using `.closest()` in event delegation.",
          "vi": "Kiểm tra `event.target.tagName === 'BUTTON'` thay vì dùng `.closest()` trong event delegation."
        },
        "correction": {
          "en": "Always use `event.target.closest('button')`.",
          "vi": "Luôn sử dụng `event.target.closest('button')`."
        }
      }
    ],
    "tips": [
      {
        "en": "Use { passive: true } for touch and wheel listeners: Passive listeners notify the browser that `preventDefault()` will never be called, allowing the compositor to scroll immediately without blocking for JavaScript execution.",
        "vi": "Dùng { passive: true } cho listener sự kiện touch và wheel: Passive listener thông báo cho trình duyệt biết không có lệnh preventDefault(), giúp cuộn trang mượt mà tức thì."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_19_1",
      "type": "complete_code",
      "title": {
        "en": "Accordion Component with Event Delegation",
        "vi": "Xây Dựng Accordion Đóng Mở Bằng Event Delegation"
      },
      "instruction": {
        "en": "Write a function `initAccordion(containerEl)` that sets up a single delegated click listener on `containerEl`. When a header with class `.accordion-header` is clicked, toggle the `.active` class on its parent `.accordion-item` and close all sibling items.",
        "vi": "Viết hàm `initAccordion(containerEl)` thiết lập 1 listener click ủy quyền trên `containerEl`. Khi click vào thẻ có class `.accordion-header`, bật tắt class `.active` trên thẻ cha `.accordion-item` và đóng tất cả các item anh em khác."
      },
      "starterCode": "function initAccordion(containerEl) {\n  // Setup delegated accordion\n}",
      "solutionCode": "function initAccordion(containerEl) {\n  containerEl.addEventListener(\"click\", (event) => {\n    const header = event.target.closest(\".accordion-header\");\n    if (!header || !containerEl.contains(header)) return;\n\n    const currentItem = header.closest(\".accordion-item\");\n    if (!currentItem) return;\n\n    const isAlreadyActive = currentItem.classList.contains(\"active\");\n\n    // Close all siblings\n    const allItems = containerEl.querySelectorAll(\".accordion-item\");\n    allItems.forEach(item => item.classList.remove(\"active\"));\n\n    // Toggle current item\n    if (!isAlreadyActive) {\n      currentItem.classList.add(\"active\");\n    }\n  });\n}",
      "hint": {
        "en": "Use closest('.accordion-header') to detect clicks, check if already active, remove active on all items, and toggle active on current.",
        "vi": "Dùng closest('.accordion-header') để bắt click, kiểm tra trạng thái hiện tại, xóa active trên các item khác và bật active cho item được chọn."
      }
    },
    {
      "id": "js_ex_19_2",
      "type": "complete_code",
      "title": {
        "en": "Custom Bus Event Dispatcher Bridge",
        "vi": "Cầu Nối Phát & Lắng Nghe Sự Kiện Tùy Biến (CustomEvent Bridge)"
      },
      "instruction": {
        "en": "Write two functions: `dispatchAppEvent(eventName, payload, targetElement = document)` that creates and dispatches a bubbling `CustomEvent`, and `onAppEvent(eventName, handler, targetElement = document)` that listens for that custom event and passes `event.detail` to `handler`. Return an unsubscribe function.",
        "vi": "Viết hai hàm: `dispatchAppEvent(eventName, payload, targetElement = document)` tạo và phát một `CustomEvent` có bubbling, và `onAppEvent(eventName, handler, targetElement = document)` lắng nghe sự kiện đó và truyền `event.detail` vào `handler`. Trả về hàm hủy đăng ký."
      },
      "starterCode": "function dispatchAppEvent(eventName, payload, targetElement = document) {\n  // Dispatch custom event\n}\n\nfunction onAppEvent(eventName, handler, targetElement = document) {\n  // Listen for custom event and return unsubscribe\n}",
      "solutionCode": "function dispatchAppEvent(eventName, payload, targetElement = document) {\n  const customEvent = new CustomEvent(eventName, {\n    bubbles: true,\n    cancelable: true,\n    detail: payload\n  });\n  targetElement.dispatchEvent(customEvent);\n}\n\nfunction onAppEvent(eventName, handler, targetElement = document) {\n  const listener = (event) => {\n    handler(event.detail, event);\n  };\n  targetElement.addEventListener(eventName, listener);\n\n  return () => {\n    targetElement.removeEventListener(eventName, listener);\n  };\n}",
      "hint": {
        "en": "Create `new CustomEvent(eventName, { bubbles: true, detail: payload })` and call targetElement.dispatchEvent. In onAppEvent, return removeEventListener.",
        "vi": "Tạo `new CustomEvent` với detail là payload và gọi dispatchEvent. Trong onAppEvent, trả về hàm removeEventListener."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_19",
    "title": {
      "en": "Declarative Router / Navigation Interceptor with Delegation",
      "vi": "Bộ Đánh Chặn Điều Hướng SPA Khai Báo Bằng Event Delegation"
    },
    "description": {
      "en": "Build a single-page app router link interceptor `interceptInternalLinks(onNavigate)` that attaches a single click listener on `document.body`. It intercepts clicks on internal `<a href=\"/path\">` links (preventing page refresh), ignores external URLs, downloads, modified clicks (Ctrl/Cmd/Shift), and target=\"_blank\", invoking `onNavigate(pathname)`.",
      "vi": "Xây dựng bộ đánh chặn liên kết SPA `interceptInternalLinks(onNavigate)` gắn 1 listener click trên `document.body`. Tự động chặn các link nội bộ `<a href=\"/path\">` (ngăn tải lại trang), bỏ qua URL ngoài, link download, click có giữ phím bổ trợ (Ctrl/Cmd/Shift) và target=\"_blank\", rồi gọi `onNavigate(pathname)`."
    },
    "starterCode": "function interceptInternalLinks(onNavigate) {\n  // Intercept internal SPA anchor clicks\n}",
    "solutionCode": "function interceptInternalLinks(onNavigate) {\n  const clickHandler = (event) => {\n    // Ignore modified clicks (Ctrl, Cmd, Shift, Alt) or right clicks\n    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {\n      return;\n    }\n\n    const anchor = event.target.closest(\"a\");\n    if (!anchor || !anchor.href) return;\n\n    // Ignore downloads or target=\"_blank\"\n    if (anchor.hasAttribute(\"download\") || anchor.target === \"_blank\") {\n      return;\n    }\n\n    // Compare origins\n    const currentOrigin = window.location.origin;\n    if (anchor.origin !== currentOrigin) {\n      return; // External link\n    }\n\n    // Intercept internal route\n    event.preventDefault();\n    const pathname = anchor.pathname + anchor.search + anchor.hash;\n    onNavigate(pathname);\n  };\n\n  document.body.addEventListener(\"click\", clickHandler);\n\n  return () => {\n    document.body.removeEventListener(\"click\", clickHandler);\n  };\n}",
    "hints": [
      {
        "en": "Check event.target.closest('a'), verify origin === window.location.origin, verify no modifiers, call event.preventDefault() and invoke onNavigate.",
        "vi": "Kiểm tra event.target.closest('a'), kiểm tra origin nội bộ, kiểm tra phím bổ trợ, gọi event.preventDefault() và gọi onNavigate."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Declarative Router / Navigation Interceptor with Delegation according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Đánh Chặn Điều Hướng SPA Khai Báo Bằng Event Delegation theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_19_1",
      "type": "single_choice",
      "question": {
        "en": "What is Event Delegation in JavaScript?",
        "vi": "Kỹ thuật Ủy Quyền Sự Kiện (Event Delegation) trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "Attaching a single event listener to a parent container to manage events from all current and future child elements via event bubbling",
          "vi": "Gắn một listener duy nhất lên phần tử cha để quản lý sự kiện từ tất cả phần tử con hiện tại và tương lai thông qua cơ chế nổi bọt (bubbling)"
        },
        {
          "en": "Sending events over a WebSocket connection",
          "vi": "Gửi sự kiện qua kết nối WebSocket"
        },
        {
          "en": "Delegating JavaScript calculations to a Web Worker",
          "vi": "Giao việc tính toán JavaScript cho Web Worker"
        },
        {
          "en": "Converting DOM events into CSS animations",
          "vi": "Chuyển đổi sự kiện DOM thành CSS animation"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Event delegation leverages bubbling to handle interactions on dynamically added children with minimal memory overhead.",
        "vi": "Event delegation tận dụng cơ chế nổi bọt để xử lý tương tác trên các thẻ con sinh động với chi phí bộ nhớ tối thiểu."
      },
      "topicId": "js_events_delegation",
      "difficulty": "easy"
    },
    {
      "id": "js_q_19_2",
      "type": "predict_output",
      "question": {
        "en": "What is the difference between `event.target` and `event.currentTarget`?",
        "vi": "Điểm khác biệt giữa `event.target` và `event.currentTarget` là gì?"
      },
      "options": [
        {
          "en": "`event.target` is the actual element that was clicked/triggered; `event.currentTarget` is the element that owns the active event listener",
          "vi": "`event.target` là phần tử thực sự được click/kích hoạt; `event.currentTarget` là phần tử đang gắn và xử lý event listener"
        },
        {
          "en": "They are always identical in every situation",
          "vi": "Chúng luôn giống hệt nhau trong mọi trường hợp"
        },
        {
          "en": "`event.target` only exists for keyboard events",
          "vi": "`event.target` chỉ tồn tại cho sự kiện bàn phím"
        },
        {
          "en": "`event.currentTarget` is deprecated",
          "vi": "`event.currentTarget` đã bị xóa bỏ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In delegated listeners, `event.target` points to the child target, while `event.currentTarget` is the listening parent container.",
        "vi": "Trong event delegation, `event.target` trỏ vào thẻ con phát sinh sự kiện, còn `event.currentTarget` là thẻ cha chứa listener."
      },
      "topicId": "js_events_delegation",
      "difficulty": "easy"
    },
    {
      "id": "js_q_19_3",
      "type": "single_choice",
      "question": {
        "en": "What does `event.preventDefault()` do?",
        "vi": "`event.preventDefault()` có tác dụng gì?"
      },
      "options": [
        {
          "en": "Prevents the default browser action associated with the event (such as navigating a link or submitting a form)",
          "vi": "Ngăn chặn hành vi mặc định của trình duyệt đi kèm sự kiện (như chuyển trang khi click link hoặc reload khi submit form)"
        },
        {
          "en": "Stops the event from bubbling to parent elements",
          "vi": "Ngăn sự kiện nổi bọt lên các phần tử cha"
        },
        {
          "en": "Deletes the element from the DOM",
          "vi": "Xóa phần tử khỏi cây DOM"
        },
        {
          "en": "Freezes the browser thread",
          "vi": "Đóng băng luồng xử lý của trình duyệt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`preventDefault()` suppresses default UA behaviors without halting event bubbling.",
        "vi": "`preventDefault()` triệt tiêu hành vi mặc định của trình duyệt mà không làm dừng quá trình nổi bọt của sự kiện."
      },
      "topicId": "js_events_delegation",
      "difficulty": "easy"
    },
    {
      "id": "js_q_19_4",
      "type": "predict_output",
      "question": {
        "en": "What does `event.stopPropagation()` do?",
        "vi": "`event.stopPropagation()` có tác dụng gì?"
      },
      "options": [
        {
          "en": "Prevents the event from bubbling up or capturing down to other DOM ancestors/descendants",
          "vi": "Ngăn không cho sự kiện tiếp tục nổi bọt lên trên hoặc lan truyền xuống dưới các thẻ khác trong DOM"
        },
        {
          "en": "Cancels form validation errors",
          "vi": "Hủy bỏ các lỗi validate form"
        },
        {
          "en": "Refreshes the webpage",
          "vi": "Tải lại trang web"
        },
        {
          "en": "Hides all CSS animations",
          "vi": "Ẩn tất cả CSS animation"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`stopPropagation()` stops the event from traversing further along the propagation chain.",
        "vi": "`stopPropagation()` dừng việc lan truyền sự kiện trên chuỗi bubbling/capturing."
      },
      "topicId": "js_events_delegation",
      "difficulty": "medium"
    },
    {
      "id": "js_q_19_5",
      "type": "single_choice",
      "question": {
        "en": "How do you register an event listener that executes during the Capturing phase rather than the Bubbling phase?",
        "vi": "Cách đăng ký một event listener để nó thực thi trong giai đoạn Capturing thay vì Bubbling là gì?"
      },
      "options": [
        {
          "en": "el.addEventListener('click', handler, { capture: true }) or el.addEventListener('click', handler, true)",
          "vi": "el.addEventListener('click', handler, { capture: true }) hoặc el.addEventListener('click', handler, true)"
        },
        {
          "en": "el.addCaptureListener('click', handler)",
          "vi": "el.addCaptureListener('click', handler)"
        },
        {
          "en": "el.oncaptureclick = handler",
          "vi": "el.oncaptureclick = handler"
        },
        {
          "en": "el.addEventListener('capture:click', handler)",
          "vi": "el.addEventListener('capture:click', handler)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Passing `true` or `{ capture: true }` as the 3rd argument tells the browser to trigger the listener in the downwards capturing phase.",
        "vi": "Truyền `true` hoặc `{ capture: true }` ở tham số thứ 3 để yêu cầu trình duyệt kích hoạt listener ngay trong giai đoạn capturing."
      },
      "topicId": "js_events_delegation",
      "difficulty": "medium"
    },
    {
      "id": "js_q_19_6",
      "type": "predict_output",
      "question": {
        "en": "What does the option `{ once: true }` in `addEventListener` do?",
        "vi": "Tùy chọn `{ once: true }` trong `addEventListener` có ý nghĩa gì?"
      },
      "options": [
        {
          "en": "Invokes the listener at most once and automatically removes the listener immediately after invocation",
          "vi": "Kích hoạt listener tối đa một lần và tự động gỡ bỏ listener ngay sau khi chạy"
        },
        {
          "en": "Prevents multiple clicks within 1 second",
          "vi": "Ngăn chặn click nhiều lần trong 1 giây"
        },
        {
          "en": "Restricts the event to the first tab only",
          "vi": "Giới hạn sự kiện chỉ chạy trên tab đầu tiên"
        },
        {
          "en": "Disables bubbling permanently",
          "vi": "Tắt vĩnh viễn cơ chế nổi bọt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`{ once: true }` auto-removes the event listener after the first trigger, eliminating manual `removeEventListener` cleanup.",
        "vi": "`{ once: true }` tự động dọn dẹp và hủy listener sau lần kích hoạt đầu tiên."
      },
      "topicId": "js_events_delegation",
      "difficulty": "medium"
    },
    {
      "id": "js_q_19_7",
      "type": "fill_blank",
      "question": {
        "en": "To pass custom metadata payload when creating a new CustomEvent, assign it to the _____ property inside the event initialization options.",
        "vi": "Để truyền dữ liệu payload tùy biến khi tạo CustomEvent mới, gán dữ liệu vào thuộc tính _____ bên trong object cấu hình."
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
        "en": "CustomEvent data is passed via the `detail` property: `new CustomEvent('name', { detail: data })`.",
        "vi": "Dữ liệu sự kiện tùy biến được truyền qua thuộc tính `detail`: `new CustomEvent('name', { detail: data })`."
      },
      "topicId": "js_events_delegation",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "detail"
      ]
    },
    {
      "id": "js_q_19_8",
      "type": "single_choice",
      "question": {
        "en": "Why should you pass `{ passive: true }` when listening to `wheel` or `touchstart` events on scroll containers?",
        "vi": "Tại sao nên truyền `{ passive: true }` khi lắng nghe sự kiện `wheel` hoặc `touchstart` trên khung cuộn?"
      },
      "options": [
        {
          "en": "It tells the browser the listener won't call `preventDefault()`, allowing buttery smooth 60fps hardware-accelerated scrolling without waiting for JS",
          "vi": "Nó báo cho trình duyệt biết listener sẽ không gọi `preventDefault()`, giúp cuộn trang mượt mà 60fps bằng phần cứng mà không phải chờ JS thực thi"
        },
        {
          "en": "It prevents mouse battery drain",
          "vi": "Nó tiết kiệm pin chuột"
        },
        {
          "en": "It encrypts touch coordinates",
          "vi": "Nó mã hóa tọa độ chạm"
        },
        {
          "en": "It increases scroll speed by 500%",
          "vi": "Nó tăng tốc độ cuộn lên 500%"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Passive event listeners prevent scrolling latency by decoupling scrolling gestures from JS thread execution.",
        "vi": "Passive event listener tách rời thao tác cuộn khỏi luồng thực thi JS, loại bỏ hoàn toàn hiện tượng giật lag khi cuộn."
      },
      "topicId": "js_events_delegation",
      "difficulty": "hard"
    },
    {
      "id": "js_q_19_9",
      "type": "predict_output",
      "question": {
        "en": "Why is `event.target.closest(selector)` the golden standard for delegated click handlers?",
        "vi": "Tại sao `event.target.closest(selector)` là tiêu chuẩn vàng cho các hàm xử lý click ủy quyền?"
      },
      "options": [
        {
          "en": "It traverses up the DOM from the clicked element to find the nearest matching ancestor (handling clicks on nested child icons/spans)",
          "vi": "Nó duyệt ngược từ phần tử được click lên trên để tìm thẻ cha gần nhất khớp điều kiện (xử lý tốt khi click trúng icon/span con lồng bên trong)"
        },
        {
          "en": "It converts HTML to JSON",
          "vi": "Nó chuyển đổi HTML thành JSON"
        },
        {
          "en": "It prevents all network errors",
          "vi": "Nó ngăn chặn mọi lỗi mạng"
        },
        {
          "en": "It only works with SVG elements",
          "vi": "Nó chỉ chạy với thẻ SVG"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.closest()` handles cases where users click on inner child elements (like icons or text spans) inside interactive buttons.",
        "vi": "`.closest()` xử lý hoàn hảo trường hợp người dùng click vào thẻ con bên trong (như icon SVG hay thẻ span)."
      },
      "topicId": "js_events_delegation",
      "difficulty": "hard"
    },
    {
      "id": "js_q_19_10",
      "type": "single_choice",
      "question": {
        "en": "What is the consequence of failing to remove event listeners attached to the global `window` object when a dynamic component unmounts?",
        "vi": "Hậu quả của việc quên không gỡ bỏ event listener gắn trên `window` khi một component động bị hủy là gì?"
      },
      "options": [
        {
          "en": "The detached component cannot be garbage collected because the global window object retains a live reference to the closure, leading to memory leaks and ghost handlers",
          "vi": "Component đã hủy không thể được Garbage Collector giải phóng vì đối tượng toàn cục window vẫn giữ tham chiếu tới closure, gây rò rỉ bộ nhớ và lỗi thực thi ngầm"
        },
        {
          "en": "The browser immediately crashes with Error 404",
          "vi": "Trình duyệt lập tức crash với lỗi 404"
        },
        {
          "en": "Window title changes to Error",
          "vi": "Tiêu đề cửa sổ bị đổi thành Error"
        },
        {
          "en": "All network traffic is blocked",
          "vi": "Toàn bộ lưu lượng mạng bị chặn"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Global listeners keep the captured lexical closure alive, causing memory bloat and zombie callbacks.",
        "vi": "Listener toàn cục giữ cho closure sống mãi, gây phình bộ nhớ RAM và chạy các hàm callback ma ngoài ý muốn."
      },
      "topicId": "js_events_delegation",
      "difficulty": "hard"
    }
  ]
};
export default lesson19;
