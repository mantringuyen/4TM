import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/intermediate/module02');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 19 ---
const lesson19: Lesson = {
  id: "js_lesson_19",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_4",
  order: 19,
  title: {
    en: "Event Handling, Bubbling, Capturing & Delegation",
    vi: "Xử Lý Sự Kiện, Bubbling, Capturing & Event Delegation"
  },
  summary: {
    en: "Master the 3 phases of DOM event propagation (Capturing, Target, Bubbling), stopPropagation vs preventDefault, passive event listeners, and scalable Event Delegation architecture.",
    vi: "Làm chủ 3 giai đoạn lan truyền sự kiện DOM (Capturing, Target, Bubbling), phân biệt stopPropagation vs preventDefault, passive listener và kiến trúc ủy quyền sự kiện (Event Delegation)."
  },
  estimatedMinutes: 22,
  topicId: "js_events_delegation",
  learn: {
    introduction: {
      en: "Events are the heartbeat of interactive web applications. When an interaction occurs (such as a click or keypress), the browser constructs an Event object and dispatches it through the DOM hierarchy in 3 distinct phases. Mastering Event Delegation allows you to attach a single event listener on a common ancestor rather than hundreds of separate listeners on dynamic children, drastically improving memory consumption and application speed.",
      vi: "Sự kiện (Events) là nhịp tim của các ứng dụng web tương tác. Khi có tương tác người dùng (như click chuột hoặc gõ phím), trình duyệt tạo một đối tượng Event và truyền nó qua cây phân cấp DOM theo 3 giai đoạn. Kỹ thuật Ủy Quyền Sự Kiện (Event Delegation) cho phép bạn gắn một listener duy nhất lên thẻ cha thay vì hàng trăm listener trên các phần tử con động, giúp tối ưu bộ nhớ và tăng tốc độ ứng dụng đáng kể."
    },
    conceptExplanation: {
      en: "1. The 3 Phases of Event Propagation:\n   - Phase 1 (Capturing Phase): Event travels downwards from `window` through ancestors towards the target node.\n   - Phase 2 (Target Phase): Event reaches the actual interacted element (`event.target`).\n   - Phase 3 (Bubbling Phase): Event bubbles upwards from the target element back up to `window`.\n\n2. `event.target` vs `event.currentTarget`:\n   - `event.target`: The deepest element that initiated the event (e.g. the specific `<span>` or `<button>` clicked).\n   - `event.currentTarget` (or `this` in standard functions): The element whose listener is currently executing.\n\n3. Event Control Methods:\n   - `event.preventDefault()`: Cancels browser default behavior (e.g. form submit page reload, link navigation).\n   - `event.stopPropagation()`: Halts propagation along the capturing/bubbling path.\n   - `event.stopImmediatePropagation()`: Stops bubbling AND blocks other listeners on the same element.\n\n4. Event Delegation Pattern: Attach listener to parent container; use `event.target.closest(selector)` to identify matching child elements dynamically.\n\n5. Modern Options: `{ capture: true }`, `{ once: true }`, and `{ passive: true }` (critical for smooth 60fps scrolling on touch/wheel events).",
      vi: "1. 3 Giai Đoạn Lan Truyền Sự Kiện (Propagation):\n   - Giai đoạn 1 (Capturing): Sự kiện đi từ `window` xuống các thẻ tổ tiên tới thẻ mục tiêu.\n   - Giai đoạn 2 (Target): Sự kiện chạm tới chính phần tử được tương tác (`event.target`).\n   - Giai đoạn 3 (Bubbling): Sự kiện nổi bọt ngược từ phần tử mục tiêu lên lại `window`.\n\n2. Phân Biệt `event.target` vs `event.currentTarget`:\n   - `event.target`: Phần tử thực tế phát sinh tương tác (thẻ `<span>` hoặc `<button>` được bấm).\n   - `event.currentTarget`: Phần tử đang gắn listener tiếp nhận và xử lý sự kiện.\n\n3. Các Hàm Kiểm Soát Sự Kiện:\n   - `event.preventDefault()`: Ngăn chặn hành vi mặc định của trình duyệt (reload trang khi submit form, chuyển trang khi click link).\n   - `event.stopPropagation()`: Ngăn chặn sự kiện lan truyền tiếp tục trên đường bubbling/capturing.\n   - `event.stopImmediatePropagation()`: Ngăn nổi bọt VÀ chặn luôn các listener khác trên cùng một thẻ.\n\n4. Kỹ Thuật Event Delegation: Gắn 1 listener duy nhất lên thẻ cha; dùng `event.target.closest(selector)` để bắt đúng thẻ con động.\n\n5. Cấu Hình Hiện Đại: `{ capture: true }`, `{ once: true }`, `{ passive: true }` (tối ưu cuộn mượt 60fps cho sự kiện touch/wheel)."
    },
    syntax: `// 1. Scalable Event Delegation with closest()
const taskList = document.querySelector("#task-list");

taskList.addEventListener("click", (event) => {
  // Find closest matching action button within clicked target
  const deleteBtn = event.target.closest(".btn-delete");
  if (deleteBtn && taskList.contains(deleteBtn)) {
    const taskId = deleteBtn.dataset.id;
    console.log(\`Deleting task \${taskId}\`);
    deleteBtn.closest(".task-item")?.remove();
  }
});

// 2. Custom Event creation and dispatching
const customEvent = new CustomEvent("cart:updated", {
  bubbles: true,
  detail: { itemCount: 5, total: 99.50 }
});
document.dispatchEvent(customEvent);`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Dynamic Data Grid Action Bar with Event Delegation",
          vi: "Thanh Tác Vụ Bảng Dữ Liệu Động Bằng Event Delegation"
        },
        description: {
          en: "Demonstrates delegating edit, delete, and toggle actions for thousands of dynamic table rows using a single centralized event listener.",
          vi: "Minh họa ủy quyền các thao tác sửa, xóa, chuyển trạng thái cho hàng ngàn dòng bảng bằng 1 listener duy nhất."
        },
        code: `function setupTableDelegation(tableElement, onAction) {
  tableElement.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("[data-action]");
    if (!actionBtn || !tableElement.contains(actionBtn)) return;

    const action = actionBtn.dataset.action;
    const row = actionBtn.closest("tr");
    const rowId = row?.dataset.rowId;

    switch (action) {
      case "delete":
        onAction({ type: "DELETE", id: rowId });
        break;
      case "edit":
        onAction({ type: "EDIT", id: rowId });
        break;
      case "toggle":
        onAction({ type: "TOGGLE", id: rowId });
        break;
    }
  });
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Checking `if (event.target.tagName === 'BUTTON')` instead of using `.closest()` in event delegation.",
          vi: "Kiểm tra `event.target.tagName === 'BUTTON'` thay vì dùng `.closest()` trong event delegation."
        },
        correction: {
          en: "Always use `event.target.closest('button')`.",
          vi: "Luôn sử dụng `event.target.closest('button')`."
        },
        explanation: {
          en: "If the button contains nested icons or spans `<button><svg>...</svg></button>`, clicking the icon makes `event.target` point to the `<svg>`, causing the `=== 'BUTTON'` check to fail.",
          vi: "Nếu button chứa icon lồng nhau `<button><svg></button>`, click vào icon sẽ khiến `event.target` là thẻ `<svg>`, làm điều kiện so sánh trực tiếp bị sai."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use { passive: true } for touch and wheel listeners",
          vi: "Dùng { passive: true } cho listener sự kiện touch và wheel"
        },
        description: {
          en: "Passive listeners notify the browser that `preventDefault()` will never be called, allowing the compositor to scroll immediately without blocking for JavaScript execution.",
          vi: "Passive listener thông báo cho trình duyệt biết không có lệnh preventDefault(), giúp cuộn trang mượt mà tức thì."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_19_1",
      title: {
        en: "Accordion Component with Event Delegation",
        vi: "Xây Dựng Accordion Đóng Mở Bằng Event Delegation"
      },
      instruction: {
        en: "Write a function `initAccordion(containerEl)` that sets up a single delegated click listener on `containerEl`. When a header with class `.accordion-header` is clicked, toggle the `.active` class on its parent `.accordion-item` and close all sibling items.",
        vi: "Viết hàm `initAccordion(containerEl)` thiết lập 1 listener click ủy quyền trên `containerEl`. Khi click vào thẻ có class `.accordion-header`, bật tắt class `.active` trên thẻ cha `.accordion-item` và đóng tất cả các item anh em khác."
      },
      starterCode: `function initAccordion(containerEl) {
  // Setup delegated accordion
}`,
      solutionCode: `function initAccordion(containerEl) {
  containerEl.addEventListener("click", (event) => {
    const header = event.target.closest(".accordion-header");
    if (!header || !containerEl.contains(header)) return;

    const currentItem = header.closest(".accordion-item");
    if (!currentItem) return;

    const isAlreadyActive = currentItem.classList.contains("active");

    // Close all siblings
    const allItems = containerEl.querySelectorAll(".accordion-item");
    allItems.forEach(item => item.classList.remove("active"));

    // Toggle current item
    if (!isAlreadyActive) {
      currentItem.classList.add("active");
    }
  });
}`,
      hints: [
        {
          en: "Use closest('.accordion-header') to detect clicks, check if already active, remove active on all items, and toggle active on current.",
          vi: "Dùng closest('.accordion-header') để bắt click, kiểm tra trạng thái hiện tại, xóa active trên các item khác và bật active cho item được chọn."
        }
      ]
    },
    {
      id: "js_ex_19_2",
      title: {
        en: "Custom Bus Event Dispatcher Bridge",
        vi: "Cầu Nối Phát & Lắng Nghe Sự Kiện Tùy Biến (CustomEvent Bridge)"
      },
      instruction: {
        en: "Write two functions: `dispatchAppEvent(eventName, payload, targetElement = document)` that creates and dispatches a bubbling `CustomEvent`, and `onAppEvent(eventName, handler, targetElement = document)` that listens for that custom event and passes `event.detail` to `handler`. Return an unsubscribe function.",
        vi: "Viết hai hàm: `dispatchAppEvent(eventName, payload, targetElement = document)` tạo và phát một `CustomEvent` có bubbling, và `onAppEvent(eventName, handler, targetElement = document)` lắng nghe sự kiện đó và truyền `event.detail` vào `handler`. Trả về hàm hủy đăng ký."
      },
      starterCode: `function dispatchAppEvent(eventName, payload, targetElement = document) {
  // Dispatch custom event
}

function onAppEvent(eventName, handler, targetElement = document) {
  // Listen for custom event and return unsubscribe
}`,
      solutionCode: `function dispatchAppEvent(eventName, payload, targetElement = document) {
  const customEvent = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail: payload
  });
  targetElement.dispatchEvent(customEvent);
}

function onAppEvent(eventName, handler, targetElement = document) {
  const listener = (event) => {
    handler(event.detail, event);
  };
  targetElement.addEventListener(eventName, listener);

  return () => {
    targetElement.removeEventListener(eventName, listener);
  };
}`,
      hints: [
        {
          en: "Create `new CustomEvent(eventName, { bubbles: true, detail: payload })` and call targetElement.dispatchEvent. In onAppEvent, return removeEventListener.",
          vi: "Tạo `new CustomEvent` với detail là payload và gọi dispatchEvent. Trong onAppEvent, trả về hàm removeEventListener."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_19",
    title: {
      en: "Declarative Router / Navigation Interceptor with Delegation",
      vi: "Bộ Đánh Chặn Điều Hướng SPA Khai Báo Bằng Event Delegation"
    },
    description: {
      en: "Build a single-page app router link interceptor `interceptInternalLinks(onNavigate)` that attaches a single click listener on `document.body`. It intercepts clicks on internal `<a href=\"/path\">` links (preventing page refresh), ignores external URLs, downloads, modified clicks (Ctrl/Cmd/Shift), and target=\"_blank\", invoking `onNavigate(pathname)`.",
      vi: "Xây dựng bộ đánh chặn liên kết SPA `interceptInternalLinks(onNavigate)` gắn 1 listener click trên `document.body`. Tự động chặn các link nội bộ `<a href=\"/path\">` (ngăn tải lại trang), bỏ qua URL ngoài, link download, click có giữ phím bổ trợ (Ctrl/Cmd/Shift) và target=\"_blank\", rồi gọi `onNavigate(pathname)`."
    },
    starterCode: `function interceptInternalLinks(onNavigate) {
  // Intercept internal SPA anchor clicks
}`,
    solutionCode: `function interceptInternalLinks(onNavigate) {
  const clickHandler = (event) => {
    // Ignore modified clicks (Ctrl, Cmd, Shift, Alt) or right clicks
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    const anchor = event.target.closest("a");
    if (!anchor || !anchor.href) return;

    // Ignore downloads or target="_blank"
    if (anchor.hasAttribute("download") || anchor.target === "_blank") {
      return;
    }

    // Compare origins
    const currentOrigin = window.location.origin;
    if (anchor.origin !== currentOrigin) {
      return; // External link
    }

    // Intercept internal route
    event.preventDefault();
    const pathname = anchor.pathname + anchor.search + anchor.hash;
    onNavigate(pathname);
  };

  document.body.addEventListener("click", clickHandler);

  return () => {
    document.body.removeEventListener("click", clickHandler);
  };
}`,
    hints: [
      {
        en: "Check event.target.closest('a'), verify origin === window.location.origin, verify no modifiers, call event.preventDefault() and invoke onNavigate.",
        vi: "Kiểm tra event.target.closest('a'), kiểm tra origin nội bộ, kiểm tra phím bổ trợ, gọi event.preventDefault() và gọi onNavigate."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_19_1",
      type: "single_choice",
      question: {
        en: "What is Event Delegation in JavaScript?",
        vi: "Kỹ thuật Ủy Quyền Sự Kiện (Event Delegation) trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "Attaching a single event listener to a parent container to manage events from all current and future child elements via event bubbling", vi: "Gắn một listener duy nhất lên phần tử cha để quản lý sự kiện từ tất cả phần tử con hiện tại và tương lai thông qua cơ chế nổi bọt (bubbling)" } },
        { id: "b", text: { en: "Sending events over a WebSocket connection", vi: "Gửi sự kiện qua kết nối WebSocket" } },
        { id: "c", text: { en: "Delegating JavaScript calculations to a Web Worker", vi: "Giao việc tính toán JavaScript cho Web Worker" } },
        { id: "d", text: { en: "Converting DOM events into CSS animations", vi: "Chuyển đổi sự kiện DOM thành CSS animation" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Event delegation leverages bubbling to handle interactions on dynamically added children with minimal memory overhead.",
        vi: "Event delegation tận dụng cơ chế nổi bọt để xử lý tương tác trên các thẻ con sinh động với chi phí bộ nhớ tối thiểu."
      }
    },
    {
      id: "js_q_19_2",
      type: "predict_output",
      question: {
        en: "What is the difference between `event.target` and `event.currentTarget`?",
        vi: "Điểm khác biệt giữa `event.target` và `event.currentTarget` là gì?"
      },
      options: [
        { id: "a", text: { en: "`event.target` is the actual element that was clicked/triggered; `event.currentTarget` is the element that owns the active event listener", vi: "`event.target` là phần tử thực sự được click/kích hoạt; `event.currentTarget` là phần tử đang gắn và xử lý event listener" } },
        { id: "b", text: { en: "They are always identical in every situation", vi: "Chúng luôn giống hệt nhau trong mọi trường hợp" } },
        { id: "c", text: { en: "`event.target` only exists for keyboard events", vi: "`event.target` chỉ tồn tại cho sự kiện bàn phím" } },
        { id: "d", text: { en: "`event.currentTarget` is deprecated", vi: "`event.currentTarget` đã bị xóa bỏ" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "In delegated listeners, `event.target` points to the child target, while `event.currentTarget` is the listening parent container.",
        vi: "Trong event delegation, `event.target` trỏ vào thẻ con phát sinh sự kiện, còn `event.currentTarget` là thẻ cha chứa listener."
      }
    },
    {
      id: "js_q_19_3",
      type: "single_choice",
      question: {
        en: "What does `event.preventDefault()` do?",
        vi: "`event.preventDefault()` có tác dụng gì?"
      },
      options: [
        { id: "a", text: { en: "Prevents the default browser action associated with the event (such as navigating a link or submitting a form)", vi: "Ngăn chặn hành vi mặc định của trình duyệt đi kèm sự kiện (như chuyển trang khi click link hoặc reload khi submit form)" } },
        { id: "b", text: { en: "Stops the event from bubbling to parent elements", vi: "Ngăn sự kiện nổi bọt lên các phần tử cha" } },
        { id: "c", text: { en: "Deletes the element from the DOM", vi: "Xóa phần tử khỏi cây DOM" } },
        { id: "d", text: { en: "Freezes the browser thread", vi: "Đóng băng luồng xử lý của trình duyệt" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`preventDefault()` suppresses default UA behaviors without halting event bubbling.",
        vi: "`preventDefault()` triệt tiêu hành vi mặc định của trình duyệt mà không làm dừng quá trình nổi bọt của sự kiện."
      }
    },
    {
      id: "js_q_19_4",
      type: "predict_output",
      question: {
        en: "What does `event.stopPropagation()` do?",
        vi: "`event.stopPropagation()` có tác dụng gì?"
      },
      options: [
        { id: "a", text: { en: "Prevents the event from bubbling up or capturing down to other DOM ancestors/descendants", vi: "Ngăn không cho sự kiện tiếp tục nổi bọt lên trên hoặc lan truyền xuống dưới các thẻ khác trong DOM" } },
        { id: "b", text: { en: "Cancels form validation errors", vi: "Hủy bỏ các lỗi validate form" } },
        { id: "c", text: { en: "Refreshes the webpage", vi: "Tải lại trang web" } },
        { id: "d", text: { en: "Hides all CSS animations", vi: "Ẩn tất cả CSS animation" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`stopPropagation()` stops the event from traversing further along the propagation chain.",
        vi: "`stopPropagation()` dừng việc lan truyền sự kiện trên chuỗi bubbling/capturing."
      }
    },
    {
      id: "js_q_19_5",
      type: "single_choice",
      question: {
        en: "How do you register an event listener that executes during the Capturing phase rather than the Bubbling phase?",
        vi: "Cách đăng ký một event listener để nó thực thi trong giai đoạn Capturing thay vì Bubbling là gì?"
      },
      options: [
        { id: "a", text: { en: "el.addEventListener('click', handler, { capture: true }) or el.addEventListener('click', handler, true)", vi: "el.addEventListener('click', handler, { capture: true }) hoặc el.addEventListener('click', handler, true)" } },
        { id: "b", text: { en: "el.addCaptureListener('click', handler)", vi: "el.addCaptureListener('click', handler)" } },
        { id: "c", text: { en: "el.oncaptureclick = handler", vi: "el.oncaptureclick = handler" } },
        { id: "d", text: { en: "el.addEventListener('capture:click', handler)", vi: "el.addEventListener('capture:click', handler)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Passing `true` or `{ capture: true }` as the 3rd argument tells the browser to trigger the listener in the downwards capturing phase.",
        vi: "Truyền `true` hoặc `{ capture: true }` ở tham số thứ 3 để yêu cầu trình duyệt kích hoạt listener ngay trong giai đoạn capturing."
      }
    },
    {
      id: "js_q_19_6",
      type: "predict_output",
      question: {
        en: "What does the option `{ once: true }` in `addEventListener` do?",
        vi: "Tùy chọn `{ once: true }` trong `addEventListener` có ý nghĩa gì?"
      },
      options: [
        { id: "a", text: { en: "Invokes the listener at most once and automatically removes the listener immediately after invocation", vi: "Kích hoạt listener tối đa một lần và tự động gỡ bỏ listener ngay sau khi chạy" } },
        { id: "b", text: { en: "Prevents multiple clicks within 1 second", vi: "Ngăn chặn click nhiều lần trong 1 giây" } },
        { id: "c", text: { en: "Restricts the event to the first tab only", vi: "Giới hạn sự kiện chỉ chạy trên tab đầu tiên" } },
        { id: "d", text: { en: "Disables bubbling permanently", vi: "Tắt vĩnh viễn cơ chế nổi bọt" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`{ once: true }` auto-removes the event listener after the first trigger, eliminating manual `removeEventListener` cleanup.",
        vi: "`{ once: true }` tự động dọn dẹp và hủy listener sau lần kích hoạt đầu tiên."
      }
    },
    {
      id: "js_q_19_7",
      type: "fill_blank",
      question: {
        en: "To pass custom metadata payload when creating a new CustomEvent, assign it to the _____ property inside the event initialization options.",
        vi: "Để truyền dữ liệu payload tùy biến khi tạo CustomEvent mới, gán dữ liệu vào thuộc tính _____ bên trong object cấu hình."
      },
      correctAnswer: "detail",
      explanation: {
        en: "CustomEvent data is passed via the `detail` property: `new CustomEvent('name', { detail: data })`.",
        vi: "Dữ liệu sự kiện tùy biến được truyền qua thuộc tính `detail`: `new CustomEvent('name', { detail: data })`."
      }
    },
    {
      id: "js_q_19_8",
      type: "single_choice",
      question: {
        en: "Why should you pass `{ passive: true }` when listening to `wheel` or `touchstart` events on scroll containers?",
        vi: "Tại sao nên truyền `{ passive: true }` khi lắng nghe sự kiện `wheel` hoặc `touchstart` trên khung cuộn?"
      },
      options: [
        { id: "a", text: { en: "It tells the browser the listener won't call `preventDefault()`, allowing buttery smooth 60fps hardware-accelerated scrolling without waiting for JS", vi: "Nó báo cho trình duyệt biết listener sẽ không gọi `preventDefault()`, giúp cuộn trang mượt mà 60fps bằng phần cứng mà không phải chờ JS thực thi" } },
        { id: "b", text: { en: "It prevents mouse battery drain", vi: "Nó tiết kiệm pin chuột" } },
        { id: "c", text: { en: "It encrypts touch coordinates", vi: "Nó mã hóa tọa độ chạm" } },
        { id: "d", text: { en: "It increases scroll speed by 500%", vi: "Nó tăng tốc độ cuộn lên 500%" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Passive event listeners prevent scrolling latency by decoupling scrolling gestures from JS thread execution.",
        vi: "Passive event listener tách rời thao tác cuộn khỏi luồng thực thi JS, loại bỏ hoàn toàn hiện tượng giật lag khi cuộn."
      }
    },
    {
      id: "js_q_19_9",
      type: "predict_output",
      question: {
        en: "Why is `event.target.closest(selector)` the golden standard for delegated click handlers?",
        vi: "Tại sao `event.target.closest(selector)` là tiêu chuẩn vàng cho các hàm xử lý click ủy quyền?"
      },
      options: [
        { id: "a", text: { en: "It traverses up the DOM from the clicked element to find the nearest matching ancestor (handling clicks on nested child icons/spans)", vi: "Nó duyệt ngược từ phần tử được click lên trên để tìm thẻ cha gần nhất khớp điều kiện (xử lý tốt khi click trúng icon/span con lồng bên trong)" } },
        { id: "b", text: { en: "It converts HTML to JSON", vi: "Nó chuyển đổi HTML thành JSON" } },
        { id: "c", text: { en: "It prevents all network errors", vi: "Nó ngăn chặn mọi lỗi mạng" } },
        { id: "d", text: { en: "It only works with SVG elements", vi: "Nó chỉ chạy với thẻ SVG" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.closest()` handles cases where users click on inner child elements (like icons or text spans) inside interactive buttons.",
        vi: "`.closest()` xử lý hoàn hảo trường hợp người dùng click vào thẻ con bên trong (như icon SVG hay thẻ span)."
      }
    },
    {
      id: "js_q_19_10",
      type: "code_reasoning",
      question: {
        en: "What is the consequence of failing to remove event listeners attached to the global `window` object when a dynamic component unmounts?",
        vi: "Hậu quả của việc quên không gỡ bỏ event listener gắn trên `window` khi một component động bị hủy là gì?"
      },
      options: [
        { id: "a", text: { en: "The detached component cannot be garbage collected because the global window object retains a live reference to the closure, leading to memory leaks and ghost handlers", vi: "Component đã hủy không thể được Garbage Collector giải phóng vì đối tượng toàn cục window vẫn giữ tham chiếu tới closure, gây rò rỉ bộ nhớ và lỗi thực thi ngầm" } },
        { id: "b", text: { en: "The browser immediately crashes with Error 404", vi: "Trình duyệt lập tức crash với lỗi 404" } },
        { id: "c", text: { en: "Window title changes to Error", vi: "Tiêu đề cửa sổ bị đổi thành Error" } },
        { id: "d", text: { en: "All network traffic is blocked", vi: "Toàn bộ lưu lượng mạng bị chặn" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Global listeners keep the captured lexical closure alive, causing memory bloat and zombie callbacks.",
        vi: "Listener toàn cục giữ cho closure sống mãi, gây phình bộ nhớ RAM và chạy các hàm callback ma ngoài ý muốn."
      }
    }
  ]
};

// --- LESSON 20 ---
const lesson20: Lesson = {
  id: "js_lesson_20",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_4",
  order: 20,
  title: {
    en: "Fetch API, HTTP Headers, JSON & Client-Side Web Storage",
    vi: "Fetch API, HTTP Headers, Xử Lý JSON & Lưu Trữ Client Web Storage"
  },
  summary: {
    en: "Master HTTP networking with Fetch API (Request/Response, Headers, AbortController, status codes), JSON serialization, and client-side persistence (localStorage, sessionStorage, quota handling).",
    vi: "Làm chủ giao tiếp mạng HTTP bằng Fetch API (Request/Response, Headers, AbortController, mã trạng thái), chuyển đổi JSON và lưu trữ dữ liệu phía client (localStorage, sessionStorage, xử lý dung lượng quota)."
  },
  estimatedMinutes: 24,
  topicId: "js_fetch_storage",
  learn: {
    introduction: {
      en: "Connecting client-side web apps to backend REST/GraphQL services and persisting offline state are fundamental development requirements. The modern Fetch API provides a Promise-based interface for making HTTP requests with full control over headers, caching, and abort signals. Combined with Web Storage APIs (localStorage and sessionStorage), applications can maintain authenticated sessions and offline user data.",
      vi: "Kết nối ứng dụng client với các dịch vụ backend REST/GraphQL và lưu trữ trạng thái offline là yêu cầu cốt lõi trong phát triển web. Fetch API cung cấp giao diện chuẩn dựa trên Promise để gửi request HTTP với toàn quyền kiểm soát headers, cache và tín hiệu hủy (abort signal). Kết hợp với Web Storage (localStorage và sessionStorage), ứng dụng có thể duy trì phiên đăng nhập và dữ liệu người dùng offline."
    },
    conceptExplanation: {
      en: "1. The Fetch Protocol & The 2-Step Promise: `const response = await fetch(url, options)`. First Promise resolves the HTTP response headers. The second step parses the body: `const data = await response.json()` (or `.text()`, `.blob()`, `.formData()`).\n\n2. The Fetch Error Catch Gotcha: Fetch does NOT reject on HTTP error status codes (like 404 or 500)! It only rejects on actual network failures or CORS blocks. You MUST check `if (!response.ok)`.\n\n3. AbortController & Request Cancellation: Cancel pending requests or set timeouts using `const controller = new AbortController(); fetch(url, { signal: controller.signal })` and `controller.abort()`.\n\n4. Web Storage Comparison:\n   - `localStorage`: Persists data across browser tabs and restarts with no expiration (~5MB per origin).\n   - `sessionStorage`: Scoped to a single browser tab; cleared when the tab closes.\n   - Storage items must be strings: use `JSON.stringify()` on save and `JSON.parse()` on retrieval with try/catch fallback.",
      vi: "1. Giao Thức Fetch & Promise 2 Bước: `const response = await fetch(url, options)`. Promise bước 1 resolve khi nhận được Header phản hồi. Bước 2 phân tích nội dung body: `const data = await response.json()` (hoặc `.text()`, `.blob()`).\n\n2. Bẫy Bắt Lỗi Của Fetch: Fetch KHÔNG TỰ REJECT khi gặp các mã lỗi HTTP như 404 hay 500! Nó chỉ reject khi mất mạng hoàn toàn hoặc bị chặn CORS. Bạn BẮT BUỘC phải tự kiểm tra `if (!response.ok)`.\n\n3. Hủy Request Bằng AbortController: Hủy request đang chờ hoặc cài đặt timeout bằng `const controller = new AbortController(); fetch(url, { signal: controller.signal })` và `controller.abort()`.\n\n4. So Sánh Web Storage:\n   - `localStorage`: Lưu trữ dữ liệu vĩnh viễn qua các tab và lần khởi động lại trình duyệt (~5MB mỗi origin).\n   - `sessionStorage`: Giới hạn trong 1 tab duy nhất; tự động xóa khi tab bị đóng.\n   - Dữ liệu lưu trong Storage bắt buộc là chuỗi: luôn dùng `JSON.stringify()` khi lưu và `JSON.parse()` khi đọc kèm khối try/catch phòng ngừa lỗi cú pháp."
    },
    syntax: `// 1. Robust API client wrapper with AbortSignal timeout
async function apiPost(endpoint, bodyData, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyData),
      signal: controller.signal
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || \`HTTP error \${res.status}\`);
    }

    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

// 2. Safe Typed LocalStorage Helper
const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage quota exceeded", e);
    }
  }
};`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Persistent Authenticated HTTP Client Service",
          vi: "Dịch Vụ HTTP Client Có Xác Thực & Lưu Trữ Token Tự Động"
        },
        description: {
          en: "Demonstrates an API client that automatically attaches bearer auth tokens from localStorage and refreshes cached state.",
          vi: "Minh họa API client tự động gắn bearer token từ localStorage và cập nhật trạng thái lưu trữ."
        },
        code: `class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getAuthToken() {
    return localStorage.getItem("auth_token");
  }

  async request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");

    const token = this.getAuthToken();
    if (token) {
      headers.set("Authorization", \`Bearer \${token}\`);
    }

    const response = await fetch(\`\${this.baseUrl}\${path}\`, {
      ...options,
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("auth_token");
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      }
      throw new Error(\`Request failed with status \${response.status}\`);
    }

    return response.json();
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Assuming `fetch()` rejects inside `.catch()` on HTTP 404 or 500 status codes.",
          vi: "Nghĩ rằng `fetch()` sẽ tự động nhảy vào `.catch()` khi gặp mã lỗi HTTP 404 hoặc 500."
        },
        correction: {
          en: "Always inspect `if (!response.ok)` (`response.ok` is true only for status 200-299) and manually throw an Error.",
          vi: "Luôn kiểm tra `if (!response.ok)` (`response.ok` chỉ là true với status 200-299) và chủ động ném Error."
        },
        explanation: {
          en: "Fetch treats any HTTP response received from a server as a successful Promise resolution, even if the status is 404 or 500.",
          vi: "Fetch coi bất kỳ phản hồi HTTP nào nhận được từ server là một Promise thành công, kể cả khi mã lỗi là 404 hay 500."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Wrap JSON.parse() and Storage operations in try/catch",
          vi: "Luôn bọc JSON.parse() và thao tác Storage trong khối try/catch"
        },
        description: {
          en: "Corrupted localStorage data, private browsing restrictions, or quota limits (`QuotaExceededError`) will throw exceptions if not caught.",
          vi: "Dữ liệu storage bị lỗi, chế độ ẩn danh hoặc vượt quá dung lượng cho phép sẽ ném ngoại lệ làm sập app nếu không được try/catch."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_20_1",
      title: {
        en: "Resilient Fetch with Exponential Backoff Retry",
        vi: "Gửi Request Tự Động Thử Lại (Retry) Với Giãn Cách Số Mũ"
      },
      instruction: {
        en: "Write a function `fetchWithRetry(url, options = {}, maxRetries = 3, baseDelayMs = 200)` that attempts to fetch a URL. If the request fails (network error or `!response.ok`), retry up to `maxRetries` times with exponential delay `baseDelayMs * 2 ** attempt`. Return the parsed JSON response.",
        vi: "Viết hàm `fetchWithRetry(url, options = {}, maxRetries = 3, baseDelayMs = 200)` gửi fetch tới URL. Nếu thất bại (lỗi mạng hoặc `!response.ok`), thử lại tối đa `maxRetries` lần với độ trễ tăng theo số mũ `baseDelayMs * 2 ** attempt`. Trả về kết quả JSON đã parse."
      },
      starterCode: `async function fetchWithRetry(url, options = {}, maxRetries = 3, baseDelayMs = 200) {
  // Implement fetch with exponential retry
}`,
      solutionCode: `async function fetchWithRetry(url, options = {}, maxRetries = 3, baseDelayMs = 200) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(\`HTTP error \${res.status}\`);
      }
      return await res.json();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}`,
      hints: [
        {
          en: "Loop up to maxRetries. Check `res.ok`, and if failed wait with `await new Promise(r => setTimeout(r, delay))` before looping.",
          vi: "Lặp tối đa maxRetries lần. Kiểm tra `res.ok`, nếu lỗi thì chờ với `await new Promise(r => setTimeout(r, delay))` trước khi thử lại."
        }
      ]
    },
    {
      id: "js_ex_20_2",
      title: {
        en: "Expiring LocalStorage Cache Engine",
        vi: "Bộ Nhớ Cache LocalStorage Có Thời Gian Hết Hạn (TTL)"
      },
      instruction: {
        en: "Create an object `ExpiringStorage` with methods: `set(key, value, ttlSeconds)` (stores item with expiration timestamp), `get(key)` (returns value, or returns `null` and deletes key if expired), and `clear()`.",
        vi: "Tạo đối tượng `ExpiringStorage` có các phương thức: `set(key, value, ttlSeconds)` (lưu giá trị kèm timestamp hết hạn), `get(key)` (trả về giá trị, hoặc trả về `null` và tự xóa key nếu đã hết hạn) và `clear()`."
      },
      starterCode: `const ExpiringStorage = {
  set(key, value, ttlSeconds) {},
  get(key) {},
  clear() {}
};`,
      solutionCode: `const ExpiringStorage = {
  set(key, value, ttlSeconds) {
    try {
      const item = {
        value,
        expiry: Date.now() + ttlSeconds * 1000
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.error("Failed to write to storage", err);
    }
  },
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const item = JSON.parse(raw);
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (err) {
      return null;
    }
  },
  clear() {
    localStorage.clear();
  }
};`,
      hints: [
        {
          en: "In set(), save `{ value, expiry: Date.now() + ttlSeconds * 1000 }`. In get(), check `Date.now() > item.expiry`.",
          vi: "Trong set(), lưu `{ value, expiry: Date.now() + ttlSeconds * 1000 }`. Trong get(), kiểm tra `Date.now() > item.expiry`."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_20",
    title: {
      en: "Offline-First Sync Queue Service",
      vi: "Hàng Đợi Đồng Bộ Dữ Liệu Ngoại Tuyến (Offline-First Sync Queue)"
    },
    description: {
      en: "Build an offline sync manager `createOfflineSyncQueue(storageKey, apiHandler)` that persists pending mutation requests to `localStorage` when offline. When `syncAll()` is called, it processes pending items sequentially, removes successful ones from storage, and emits status callbacks.",
      vi: "Xây dựng bộ quản lý đồng bộ offline `createOfflineSyncQueue(storageKey, apiHandler)` tự động lưu các request thay đổi dữ liệu vào `localStorage` khi mất mạng. Khi gọi `syncAll()`, hàm xử lý tuần tự các item đang chờ, xóa item thành công khỏi storage và phát các callback trạng thái."
    },
    starterCode: `function createOfflineSyncQueue(storageKey, apiHandler) {
  // Implement offline-first sync manager
}`,
    solutionCode: `function createOfflineSyncQueue(storageKey, apiHandler) {
  function getQueue() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  }

  function saveQueue(queue) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(queue));
    } catch (e) {
      console.error("Storage save failed", e);
    }
  }

  return {
    enqueue(action) {
      const queue = getQueue();
      const item = { id: \`item_\${Date.now()}_\${Math.random().toString(36).slice(2, 7)}\`, action, timestamp: Date.now() };
      queue.push(item);
      saveQueue(queue);
      return item.id;
    },
    getPendingCount() {
      return getQueue().length;
    },
    async syncAll() {
      const queue = getQueue();
      const remaining = [];
      const results = [];

      for (const item of queue) {
        try {
          const res = await apiHandler(item.action);
          results.push({ id: item.id, success: true, result: res });
        } catch (err) {
          results.push({ id: item.id, success: false, error: err.message });
          remaining.push(item);
        }
      }

      saveQueue(remaining);
      return { completed: results.filter(r => r.success).length, failed: remaining.length, details: results };
    }
  };
}`,
    hints: [
      {
        en: "Maintain array of pending items in localStorage. In syncAll(), iterate sequentially and update queue with only items that failed.",
        vi: "Duy trì mảng các item chờ trong localStorage. Trong syncAll(), duyệt tuần tự và cập nhật lại queue chỉ chứa các item bị lỗi."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_20_1",
      type: "single_choice",
      question: {
        en: "When does the Promise returned by `fetch()` reject?",
        vi: "Khi nào thì Promise trả về từ hàm `fetch()` bị reject?"
      },
      options: [
        { id: "a", text: { en: "Only on network failure, DNS errors, or CORS security blocks (NOT on HTTP 404 or 500 responses)", vi: "Chỉ khi xảy ra lỗi mạng hoàn toàn, lỗi DNS, hoặc bị chặn bảo mật CORS (KHÔNG tự reject khi nhận HTTP 404 hay 500)" } },
        { id: "b", text: { en: "Whenever an HTTP 404 or 500 error is returned", vi: "Bất cứ khi nào nhận được mã lỗi HTTP 404 hoặc 500" } },
        { id: "c", text: { en: "Whenever the response payload is not JSON", vi: "Bất cứ khi nào dữ liệu trả về không phải định dạng JSON" } },
        { id: "d", text: { en: "Fetch never rejects", vi: "Fetch không bao giờ reject" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "An HTTP error (such as 404 or 500) is still a valid HTTP response from the server, so fetch fulfills successfully with `response.ok === false`.",
        vi: "Mã lỗi HTTP (như 404 hay 500) vẫn là phản hồi hợp lệ từ máy chủ, nên fetch resolve thành công với `response.ok === false`."
      }
    },
    {
      id: "js_q_20_2",
      type: "predict_output",
      question: {
        en: "What is `response.ok` in the Fetch API?",
        vi: "`response.ok` trong Fetch API có giá trị gì?"
      },
      options: [
        { id: "a", text: { en: "A boolean that is `true` if `response.status` is between 200 and 299 inclusive", vi: "Một biến boolean có giá trị `true` nếu `response.status` nằm trong khoảng 200 đến 299" } },
        { id: "b", text: { en: "A string containing 'OK'", vi: "Một chuỗi ký tự chứa chữ 'OK'" } },
        { id: "c", text: { en: "The HTTP status code integer (e.g. 200)", vi: "Một số nguyên biểu thị mã trạng thái HTTP (ví dụ 200)" } },
        { id: "d", text: { en: "A Promise resolving to response body", vi: "Một Promise resolve nội dung body" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`response.ok` is shorthand for `response.status >= 200 && response.status <= 299`.",
        vi: "`response.ok` là cách viết tắt của điều kiện `response.status >= 200 && response.status <= 299`."
      }
    },
    {
      id: "js_q_20_3",
      type: "single_choice",
      question: {
        en: "How do you cancel an in-flight `fetch()` request or enforce a request timeout?",
        vi: "Làm thế nào để hủy một request `fetch()` đang gửi hoặc thiết lập timeout hủy yêu cầu?"
      },
      options: [
        { id: "a", text: { en: "Pass an `AbortSignal` from an `AbortController` instance into `fetch(url, { signal })`", vi: "Truyền một `AbortSignal` từ đối tượng `AbortController` vào `fetch(url, { signal })`" } },
        { id: "b", text: { en: "Call fetch.stop()", vi: "Gọi fetch.stop()" } },
        { id: "c", text: { en: "Set window.stop = true", vi: "Gán window.stop = true" } },
        { id: "d", text: { en: "Delete the response object", vi: "Xóa đối tượng response" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`AbortController` provides the standard signal interface for aborting DOM requests and fetches.",
        vi: "`AbortController` cung cấp cơ chế chuẩn để hủy các request DOM và fetch bất đồng bộ."
      }
    },
    {
      id: "js_q_20_4",
      type: "predict_output",
      question: {
        en: "What is the primary difference between `localStorage` and `sessionStorage`?",
        vi: "Điểm khác biệt chính giữa `localStorage` và `sessionStorage` là gì?"
      },
      options: [
        { id: "a", text: { en: "`localStorage` persists indefinitely across sessions and tabs; `sessionStorage` is cleared as soon as the browser tab is closed", vi: "`localStorage` tồn tại vĩnh viễn qua nhiều phiên và các tab; `sessionStorage` bị xóa sạch ngay khi tab trình duyệt bị đóng" } },
        { id: "b", text: { en: "`sessionStorage` can store up to 50GB", vi: "`sessionStorage` có thể lưu tới 50GB" } },
        { id: "c", text: { en: "`localStorage` is only available in Node.js", vi: "`localStorage` chỉ có trong Node.js" } },
        { id: "d", text: { en: "`sessionStorage` sends data to the server on every request", vi: "`sessionStorage` gửi dữ liệu lên server trong mọi request" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`localStorage` persists until explicitly cleared, while `sessionStorage` is tied strictly to the browser tab lifecycle.",
        vi: "`localStorage` tồn tại vĩnh viễn cho đến khi bị xóa chủ động, còn `sessionStorage` gắn liền với vòng đời của tab trình duyệt."
      }
    },
    {
      id: "js_q_20_5",
      type: "single_choice",
      question: {
        en: "What data types can be stored directly inside `localStorage`?",
        vi: "Kiểu dữ liệu nào có thể được lưu trữ trực tiếp bên trong `localStorage`?"
      },
      options: [
        { id: "a", text: { en: "Strings only (objects and arrays must be serialized with `JSON.stringify()`)", vi: "Chỉ lưu được chuỗi ký tự (objects và arrays bắt buộc phải chuyển sang chuỗi bằng `JSON.stringify()`)" } },
        { id: "b", text: { en: "Functions and Classes", vi: "Hàm và Class" } },
        { id: "c", text: { en: "Symbols and BigInts directly", vi: "Symbol và BigInt trực tiếp" } },
        { id: "d", text: { en: "Binary streams only", vi: "Chỉ lưu luồng nhị phân" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Web Storage keys and values are always UTF-16 strings. Non-string inputs are automatically coerced to `[object Object]` if not stringified.",
        vi: "Key và Value của Web Storage luôn là chuỗi ký tự. Nếu không stringify, các object sẽ bị ép kiểu thành chuỗi vô nghĩa `[object Object]`."
      }
    },
    {
      id: "js_q_20_6",
      type: "predict_output",
      question: {
        en: "What happens if you store an object directly `localStorage.setItem('user', { name: 'Elena' })` without `JSON.stringify()`?",
        vi: "Điều gì xảy ra nếu bạn lưu object trực tiếp `localStorage.setItem('user', { name: 'Elena' })` mà không dùng `JSON.stringify()`?"
      },
      options: [
        { id: "a", text: { en: "It coerces the object to string `'[object Object]'`, losing all internal data", vi: "Nó tự ép kiểu object thành chuỗi `'[object Object]'`, làm mất sạch dữ liệu bên trong" } },
        { id: "b", text: { en: "It automatically saves valid JSON", vi: "Nó tự động lưu định dạng JSON hợp lệ" } },
        { id: "c", text: { en: "Throws a TypeError", vi: "Ném lỗi TypeError" } },
        { id: "d", text: { en: "Deletes the storage database", vi: "Xóa toàn bộ database storage" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`localStorage.setItem` calls `.toString()` on values, turning plain objects into `'[object Object]'`.",
        vi: "`localStorage.setItem` tự gọi hàm `.toString()` trên giá trị truyền vào, biến plain object thành `'[object Object]'`."
      }
    },
    {
      id: "js_q_20_7",
      type: "fill_blank",
      question: {
        en: "To read and parse the JSON payload body from a fetch response, call await response._____ ().",
        vi: "Để đọc và phân tích dữ liệu body JSON từ một fetch response, gọi lệnh await response._____ ()."
      },
      correctAnswer: "json",
      explanation: {
        en: "`response.json()` reads the response stream to completion and parses it as JSON.",
        vi: "`response.json()` đọc hoàn tất luồng phản hồi và phân tích cú pháp thành đối tượng JSON."
      }
    },
    {
      id: "js_q_20_8",
      type: "single_choice",
      question: {
        en: "What is the typical storage quota limit for `localStorage` per origin in modern desktop browsers?",
        vi: "Dung lượng lưu trữ tối đa thông thường của `localStorage` trên mỗi origin trong trình duyệt desktop hiện đại là bao nhiêu?"
      },
      options: [
        { id: "a", text: { en: "Approximately 5MB - 10MB per origin", vi: "Khoảng 5MB - 10MB cho mỗi origin" } },
        { id: "b", text: { en: "Unlimited (limited only by hard drive)", vi: "Không giới hạn (chỉ phụ thuộc ổ cứng)" } },
        { id: "c", text: { en: "Exact 64KB", vi: "Đúng 64KB" } },
        { id: "d", text: { en: "500MB", vi: "500MB" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Standard browser quota is ~5MB per origin. Exceeding this limit throws a `QuotaExceededError`.",
        vi: "Hạn mức tiêu chuẩn của trình duyệt là ~5MB mỗi origin. Vượt quá dung lượng sẽ ném lỗi `QuotaExceededError`."
      }
    },
    {
      id: "js_q_20_9",
      type: "predict_output",
      question: {
        en: "How do you specify a custom HTTP request header when sending a `fetch()` request?",
        vi: "Cách chỉ định custom HTTP Header khi gửi request `fetch()` là gì?"
      },
      options: [
        { id: "a", text: { en: "Pass a headers object inside options: `fetch(url, { headers: { 'Authorization': 'Bearer ...' } })`", vi: "Truyền object headers trong options: `fetch(url, { headers: { 'Authorization': 'Bearer ...' } })`" } },
        { id: "b", text: { en: "Include headers in the URL query parameters", vi: "Đưa header vào query parameter trên URL" } },
        { id: "c", text: { en: "Set document.cookie = 'header'", vi: "Gán document.cookie = 'header'" } },
        { id: "d", text: { en: "Custom headers are forbidden by HTML5", vi: "HTML5 cấm dùng custom header" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The `headers` property accepts a plain object or a `Headers` instance.",
        vi: "Thuộc tính `headers` nhận một object thông thường hoặc một instance của đối tượng `Headers`."
      }
    },
    {
      id: "js_q_20_10",
      type: "code_reasoning",
      question: {
        en: "Why is `localStorage` NOT suitable for storing sensitive authentication tokens (like high-privilege JWTs) in production applications?",
        vi: "Tại sao `localStorage` KHÔNG an toàn để lưu trữ token xác thực nhạy cảm (như JWT đặc quyền cao) trong ứng dụng production?"
      },
      options: [
        { id: "a", text: { en: "`localStorage` is accessible to any JavaScript running on the origin, making stored tokens vulnerable to theft via Cross-Site Scripting (XSS) attacks; `HttpOnly` cookies are more secure", vi: "`localStorage` có thể bị đọc bởi bất kỳ mã JavaScript nào chạy trên cùng origin, khiến token dễ bị đánh cắp qua tấn công XSS; cookie `HttpOnly` an toàn hơn nhiều" } },
        { id: "b", text: { en: "`localStorage` is deleted every 5 minutes", vi: "`localStorage` bị xóa mỗi 5 phút" } },
        { id: "c", text: { en: "`localStorage` only works on localhost", vi: "`localStorage` chỉ hoạt động trên localhost" } },
        { id: "d", text: { en: "`localStorage` cannot store alphanumeric characters", vi: "`localStorage` không lưu được chữ cái" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Any XSS vulnerability exposes `localStorage` contents. `HttpOnly; Secure; SameSite=Strict` cookies prevent client JS access.",
        vi: "Bất kỳ lỗ hổng XSS nào cũng có thể đọc sạch `localStorage`. Cookie `HttpOnly; Secure` ngăn chặn JS client truy cập, an toàn hơn nhiều."
      }
    }
  ]
};

// Write Lesson 19 and 20
fs.writeFileSync(path.join(dir, 'lesson19.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson19: Lesson = ${JSON.stringify(lesson19, null, 2)};\nexport default lesson19;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson20.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson20: Lesson = ${JSON.stringify(lesson20, null, 2)};\nexport default lesson20;\n`, 'utf8');
console.log('Lessons 19 and 20 generated.');
