import { Lesson } from '../../../../types';

export const lesson20: Lesson = {
  id: 'html_lesson_20',
  moduleId: 'html_mod_6',
  levelId: 'advanced',
  courseId: 'html',
  order: 20,
  topicId: 'html_web_platform_apis',
  title: {
    en: 'Web Storage, Drag and Drop & Web Workers in HTML5',
    vi: 'Web Storage, Kéo Thả Drag & Drop và Web Workers Trong HTML5'
  },
  summary: {
    en: 'Master foundational modern HTML5 browser capabilities: client-side storage mechanisms (localStorage, sessionStorage, StorageEvent synchronization), declarative and scripted Drag and Drop API (draggable="true", dragstart, dragover, drop, dataTransfer MIME payloads), and multi-threaded background processing with Web Workers (postMessage, onmessage, off-main-thread computation).',
    vi: 'Làm chủ các tính năng trình duyệt HTML5 hiện đại: cơ chế lưu trữ client-side (localStorage, sessionStorage, đồng bộ StorageEvent), API Kéo Thả Drag & Drop khai báo và lập trình (draggable="true", dragstart, dragover, drop, truyền tải dataTransfer), cùng xử lý đa luồng nền với Web Workers.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'HTML5 transformed browsers from static document viewers into full-fledged application runtimes. Native client storage, interactive drag-and-drop mechanics, and true background multi-threading allow web applications to deliver desktop-grade performance and interactivity.',
      vi: 'HTML5 đã biến trình duyệt từ công cụ xem tài liệu tĩnh thành môi trường thực thi ứng dụng hoàn chỉnh. Lưu trữ client gốc, cơ chế kéo thả tương tác và xử lý đa luồng chạy nền cho phép web đạt hiệu năng và độ mượt mà tương đương phần mềm máy tính.'
    },
    conceptExplanation: {
      en: '1. **Web Storage API (`localStorage` vs `sessionStorage`)**:\n   - `localStorage.setItem(key, value)`: Persists across browser sessions until explicitly wiped.\n   - `sessionStorage.setItem(key, value)`: Scoped strictly to the lifetime of the browser tab.\n   - Synchronous, 5MB string-based key-value store. Always serialize JSON with `JSON.stringify()`.\n   - Listen to `window.addEventListener("storage", (e) => ...)` for real-time cross-tab synchronization.\n\n2. **HTML5 Drag and Drop API**:\n   - Set `draggable="true"` on the source element.\n   - `dragstart`: Set payload using `event.dataTransfer.setData("text/plain", data)` and `event.dataTransfer.effectAllowed = "move"`.\n   - `dragover`: MUST call `event.preventDefault()` on drop target to allow dropping!\n   - `drop`: Read data via `event.dataTransfer.getData("text/plain")`.\n\n3. **Web Workers (Multi-Threading)**:\n   - Offload heavy CPU calculations (sorting 1M items, crypto hashing, image processing) off the main UI thread.\n   - `const worker = new Worker("worker.js");`\n   - Send messages with `worker.postMessage(data)` and receive with `worker.onmessage = (e) => ...`.\n   - Workers have no access to the DOM or `window`, but have access to `fetch`, `IndexedDB`, and `self`.',
      vi: '1. **Web Storage API (`localStorage` vs `sessionStorage`)**:\n   - `localStorage.setItem(key, value)`: Lưu trữ vĩnh viễn qua các phiên duyệt web cho đến khi bị xóa.\n   - `sessionStorage.setItem(key, value)`: Chỉ tồn tại trong vòng đời của tab trình duyệt hiện tại.\n   - Lưu trữ dạng khóa-giá trị chuỗi 5MB đồng bộ. Luôn chuyển đổi đối tượng qua `JSON.stringify()`.\n   - Bắt sự kiện `window.addEventListener("storage", (e) => ...)` để đồng bộ tức thì giữa các tab.\n\n2. **HTML5 Drag and Drop API**:\n   - Đặt `draggable="true"` trên phần tử nguồn kéo.\n   - `dragstart`: Gán dữ liệu bằng `event.dataTransfer.setData("text/plain", data)` và `event.dataTransfer.effectAllowed = "move"`.\n   - `dragover`: BẮT BUỘC gọi `event.preventDefault()` trên vùng đích để cho phép thả!\n   - `drop`: Đọc dữ liệu qua `event.dataTransfer.getData("text/plain")`.\n\n3. **Web Workers (Xử Lý Đa Luồng)**:\n   - Đẩy các tính toán nặng (sắp xếp 1 triệu bản ghi, mã hóa, xử lý ảnh) ra khỏi luồng giao diện chính (main thread).\n   - `const worker = new Worker("worker.js");`\n   - Gửi dữ liệu qua `worker.postMessage(data)` và nhận kết quả qua `worker.onmessage = (e) => ...`.\n   - Web Worker không thể truy cập trực tiếp DOM hoặc `window`, nhưng có thể dùng `fetch`, `IndexedDB` và `self`.'
    },
    syntax: `<!-- Drag and Drop HTML Markup -->
<div id="drag-item" draggable="true" class="card">
  Draggable Task Card
</div>

<div id="drop-zone" class="drop-target">
  Drop Tasks Here
</div>

<script>
  const item = document.getElementById('drag-item');
  const zone = document.getElementById('drop-zone');

  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });

  zone.addEventListener('dragover', (e) => {
    e.preventDefault(); // MANDATORY to allow drop
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    zone.appendChild(document.getElementById(id));
  });
</script>`,
    examples: [
      {
        title: {
          en: 'Cross-Tab State Synchronization with Storage Event',
          vi: 'Đồng Bộ Trạng Thái Giữa Các Tab Với Sự Kiện Storage'
        },
        code: `// Save user theme choice
localStorage.setItem('user_theme', 'dark');

// In other open tabs:
window.addEventListener('storage', (event) => {
  if (event.key === 'user_theme') {
    document.documentElement.setAttribute('data-theme', event.newValue);
  }
});`,
        language: 'javascript',
        explanation: {
          en: 'Storage events fire on all OTHER tabs on the same origin when localStorage changes.',
          vi: 'Sự kiện storage tự động kích hoạt trên tất cả các tab KHÁC cùng nguồn khi localStorage thay đổi.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Forgetting to call event.preventDefault() inside the dragover event handler',
          vi: 'Quên không gọi event.preventDefault() trong hàm xử lý sự kiện dragover'
        },
        correction: {
          en: 'Browsers by default forbid dropping elements onto HTML elements. Calling event.preventDefault() on dragover explicitly signals that the element is a valid drop target.',
          vi: 'Mặc định trình duyệt cấm thả phần tử vào các thẻ HTML khác. Gọi event.preventDefault() trong dragover là bắt buộc để biến phần tử thành vùng thả hợp lệ.'
        },
        code: '// Mandatory: zone.addEventListener("dragover", (e) => e.preventDefault());'
      },
      {
        mistake: {
          en: 'Storing un-stringified JavaScript objects directly in localStorage',
          vi: 'Lưu trực tiếp đối tượng JavaScript chưa chuyển sang chuỗi vào localStorage'
        },
        correction: {
          en: 'localStorage only stores strings. Storing an object directly converts it to the string "[object Object]". Always use JSON.stringify() and JSON.parse().',
          vi: 'localStorage chỉ lưu chuỗi. Lưu đối tượng trực tiếp sẽ biến nó thành chuỗi "[object Object]". Luôn dùng JSON.stringify() và JSON.parse().'
        },
        code: '// Correct: localStorage.setItem("user", JSON.stringify({ name: "Alice" }));'
      }
    ],
    tips: [
      {
        en: 'Use Web Workers whenever computationally heavy algorithms take longer than 16ms, ensuring your UI maintains a butter-smooth 60fps refresh rate.',
        vi: 'Dùng Web Worker bất cứ khi nào thuật toán tính toán mất hơn 16ms để giao diện không bị giật lag và luôn duy trì 60fps mượt mà.'
      }
    ],
    practice: {
      task: {
        en: 'Construct a Draggable Item and Drop Target Container',
        vi: 'Xây Dựng Khối Kéo Thả Draggable Và Vùng Đích Thả Drop Zone'
      },
      instruction: {
        en: 'Create a <div id="card-1" draggable="true" class="task-card"><p>Sprint Task</p></div> followed by a <div id="kanban-done" class="drop-column"><h3>Done</h3></div>.',
        vi: 'Tạo thẻ <div id="card-1" draggable="true" class="task-card"><p>Sprint Task</p></div> theo sau là <div id="kanban-done" class="drop-column"><h3>Done</h3></div>.'
      },
      starterCode: '<!-- Build drag and drop elements -->\n',
      solutionCode: `<div id="card-1" draggable="true" class="task-card">
  <p>Sprint Task</p>
</div>

<div id="kanban-done" class="drop-column">
  <h3>Done</h3>
</div>`,
      requiredPatterns: [
        '<div id="card-1" draggable="true"',
        '<div id="kanban-done"',
        'class="drop-column">'
      ],
      hint: {
        en: 'Declare draggable="true" on the draggable element.',
        vi: 'Khai báo draggable="true" trên phần tử có thể kéo.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Implement Persistent Preferences Storage Script',
        vi: 'Triển Khai Đoạn Mã Lưu Trữ Cấu Hình Tùy Chọn'
      },
      instruction: {
        en: 'Write a <script> block saving a JSON stringified user settings object { theme: "dark", fontSize: 16 } to localStorage key "app_settings".',
        vi: 'Viết thẻ <script> lưu đối tượng JSON chuỗi hóa { theme: "dark", fontSize: 16 } vào khóa "app_settings" trong localStorage.'
      },
      starterCode: '<!-- Write storage script -->\n',
      solutionCode: `<script>
  const settings = { theme: 'dark', fontSize: 16 };
  localStorage.setItem('app_settings', JSON.stringify(settings));
</script>`,
      requiredPatterns: [
        'localStorage.setItem(',
        'JSON.stringify(',
        '\'app_settings\''
      ],
      hint: {
        en: 'Use JSON.stringify and localStorage.setItem.',
        vi: 'Dùng JSON.stringify và localStorage.setItem.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_18_1',
      type: 'complete_code',
      title: {
        en: 'Enable Native Element Draggability',
        vi: 'Bật Khả Năng Kéo Thả Gốc Cho Phần Tử'
      },
      instruction: {
        en: 'Add the draggable="true" attribute to make the article draggable.',
        vi: 'Thêm thuộc tính draggable="true" để bài viết có thể kéo được.'
      },
      starterCode: '<article id="doc-card" class="card">\n  <h4>Project Specs</h4>\n</article>',
      solutionCode: '<article id="doc-card" draggable="true" class="card">\n  <h4>Project Specs</h4>\n</article>',
      hint: {
        en: 'Add draggable="true" to <article>.',
        vi: 'Thêm draggable="true" vào <article>.'
      },
      explanation: {
        en: 'draggable="true" enables native drag gesture handling for the element.',
        vi: 'draggable="true" kích hoạt xử lý cử chỉ kéo gốc của trình duyệt cho phần tử.'
      }
    },
    {
      id: 'html_ex_18_2',
      type: 'fix_code',
      title: {
        en: 'Fix Dragover Target Dropping Handler',
        vi: 'Sửa Hàm Xử Lý Cho Phép Thả Phần Tử Dragover'
      },
      instruction: {
        en: 'Add event.preventDefault() inside the dragover listener so the element permits dropping.',
        vi: 'Thêm event.preventDefault() vào trong sự kiện dragover để cho phép thả.'
      },
      starterCode: `dropZone.addEventListener('dragover', (event) => {
  // Missing drop permission
});`,
      solutionCode: `dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
});`,
      hint: {
        en: 'Call event.preventDefault(); inside the handler.',
        vi: 'Gọi event.preventDefault(); bên trong hàm xử lý.'
      },
      explanation: {
        en: 'preventDefault() during dragover signals to the browser that dropping is explicitly permitted.',
        vi: 'preventDefault() trong sự kiện dragover báo cho trình duyệt biết thao tác thả được chấp thuận.'
      }
    },
    {
      id: 'html_ex_18_3',
      type: 'write_code',
      title: {
        en: 'Write Web Worker Initialization Script',
        vi: 'Tạo Khởi Tạo Web Worker Chạy Nền'
      },
      instruction: {
        en: 'Write JavaScript creating const worker = new Worker("calc.worker.js"); and calling worker.postMessage({ start: 1, end: 1000000 });.',
        vi: 'Viết JavaScript tạo const worker = new Worker("calc.worker.js"); và gọi worker.postMessage({ start: 1, end: 1000000 });.'
      },
      starterCode: '<!-- Write worker initialization -->\n',
      solutionCode: `<script>
  const worker = new Worker('calc.worker.js');
  worker.postMessage({ start: 1, end: 1000000 });
</script>`,
      hint: {
        en: 'Instantiate new Worker and invoke postMessage.',
        vi: 'Khởi tạo new Worker và gọi hàm postMessage.'
      },
      explanation: {
        en: 'Spawns an isolated background thread that communicates via message passing.',
        vi: 'Khởi chạy một luồng chạy nền độc lập giao tiếp qua cơ chế truyền thông điệp.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_18',
    title: {
      en: 'Enterprise Kanban Workflow Board with Multi-Threaded Processing',
      vi: 'Bảng Quy Trình Kanban Doanh Nghiệp Kèm Xử Lý Đa Luồng'
    },
    description: {
      en: 'Construct a complete enterprise workflow board markup featuring draggable task items, semantic drop container targets, local storage preference persistence hooks, and background Web Worker data synthesis pipelines.',
      vi: 'Xây dựng bảng quy trình doanh nghiệp hoàn chỉnh gồm các thẻ task kéo được, vùng chứa thả theo ngữ nghĩa, lưu cấu hình tùy chọn và kết nối xử lý nền Web Worker.'
    },
    requirements: [
      {
        en: 'Multiple draggable elements with draggable="true" and unique IDs',
        vi: 'Nhiều phần tử kéo được có draggable="true" và ID duy nhất'
      },
      {
        en: 'Semantic drop target containers with distinct IDs and class markers',
        vi: 'Các vùng thả đích ngữ nghĩa có ID và class riêng biệt'
      },
      {
        en: 'LocalStorage state synchronization script',
        vi: 'Mã script đồng bộ trạng thái LocalStorage'
      },
      {
        en: 'Accessible text describing drag and drop keyboard alternative controls',
        vi: 'Văn bản trợ năng mô tả phím tắt thay thế cho thao tác kéo thả'
      }
    ],
    starterCode: '<!-- Build enterprise kanban workflow board -->\n',
    solutionCode: `<div class="kanban-board">
  <section class="column" id="col-todo">
    <h2>To Do</h2>
    <div class="task-list" id="list-todo">
      <article id="task-101" draggable="true" class="task-card" tabindex="0" aria-grabbed="false">
        <h4>Implement OAuth SSO Flow</h4>
        <p>Integrate Google and GitHub identity providers.</p>
      </article>
      <article id="task-102" draggable="true" class="task-card" tabindex="0" aria-grabbed="false">
        <h4>Database Index Optimization</h4>
        <p>Analyze query execution plans for slow queries.</p>
      </article>
    </div>
  </section>

  <section class="column" id="col-done">
    <h2>Completed</h2>
    <div class="task-list drop-zone" id="list-done" aria-dropeffect="move">
      <!-- Target Drop Zone -->
    </div>
  </section>
</div>

<script>
  // Save active board layout to localStorage
  localStorage.setItem('kanban_last_active_col', 'col-done');
</script>`,
    hints: [
      {
        en: 'Ensure all draggable cards have draggable="true" and unique IDs.',
        vi: 'Đảm bảo tất cả thẻ bài kéo được đều có draggable="true" và ID duy nhất.'
      }
    ],
    solutionExplanation: {
      en: 'Combines native HTML5 drag-and-drop primitives with persistent client storage and accessible keyboard navigation markup.',
      vi: 'Kết hợp các phần tử kéo thả HTML5 gốc với lưu trữ client bền vững và đánh dấu điều hướng bàn phím trợ năng.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_18_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference between localStorage and sessionStorage in HTML5?',
        vi: 'Điểm khác biệt cốt lõi giữa localStorage và sessionStorage trong HTML5 là gì?'
      },
      options: [
        {
          en: 'localStorage persists data permanently across browser restarts until explicitly cleared, whereas sessionStorage clears data automatically when the browser tab is closed',
          vi: 'localStorage lưu dữ liệu vĩnh viễn qua các lần mở lại trình duyệt cho đến khi chủ động xóa, trong khi sessionStorage tự động xóa sạch khi đóng tab trình duyệt'
        },
        {
          en: 'sessionStorage is encrypted with SSL, localStorage is plain text',
          vi: 'sessionStorage được mã hóa SSL, còn localStorage là văn bản thô'
        },
        {
          en: 'localStorage only holds up to 10 bytes',
          vi: 'localStorage chỉ chứa được tối đa 10 byte'
        },
        {
          en: 'sessionStorage is stored on the backend cloud server',
          vi: 'sessionStorage được lưu trên máy chủ đám mây'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'localStorage has indefinite lifetime; sessionStorage is bound strictly to the top-level tab session.',
        vi: 'localStorage có vòng đời vô hạn; sessionStorage gắn liền chặt chẽ với phiên của tab trình duyệt.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'easy'
    },
    {
      id: 'html_q_18_2',
      type: 'single_choice',
      question: {
        en: 'Why is it mandatory to call event.preventDefault() inside a dragover event listener to enable dropping?',
        vi: 'Tại sao bắt buộc phải gọi event.preventDefault() bên trong hàm lắng nghe sự kiện dragover để cho phép thả?'
      },
      options: [
        {
          en: 'The browser\'s default action for dragover is to disallow dropping on HTML elements; preventDefault() cancels this restriction and signals a valid drop zone',
          vi: 'Hành động mặc định của trình duyệt với sự kiện dragover là cấm thả vào các thẻ HTML; preventDefault() hủy bỏ hạn chế này và báo hiệu đây là vùng thả hợp lệ'
        },
        {
          en: 'To prevent the mouse cursor from disappearing',
          vi: 'Để ngăn con trỏ chuột không bị biến mất'
        },
        {
          en: 'To clear browser cookies',
          vi: 'Để xóa cookie trình duyệt'
        },
        {
          en: 'To reload the stylesheet',
          vi: 'Để nạp lại bảng kiểu'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Calling event.preventDefault() on dragover overrides the browser default rejection of dropped items.',
        vi: 'Gọi event.preventDefault() trong dragover ghi đè hành vi từ chối thả mặc định của trình duyệt.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'medium'
    },
    {
      id: 'html_q_18_3',
      type: 'single_choice',
      question: {
        en: 'Can a Web Worker directly manipulate HTML DOM elements like document.getElementById()?',
        vi: 'Web Worker có thể trực tiếp thao tác các phần tử DOM HTML như document.getElementById() không?'
      },
      options: [
        {
          en: 'No; Web Workers run in a separate global thread context (self) with zero direct access to the DOM or window object, communicating exclusively via postMessage',
          vi: 'Không; Web Worker chạy trong một luồng toàn cục riêng biệt (self) không có quyền truy cập trực tiếp vào DOM hay đối tượng window, giao tiếp duy nhất qua postMessage'
        },
        {
          en: 'Yes; Web Workers have full synchronous DOM access',
          vi: 'Có; Web Worker có toàn quyền truy cập DOM đồng bộ'
        },
        {
          en: 'Only in Firefox and Chrome',
          vi: 'Chỉ hỗ trợ trên Firefox và Chrome'
        },
        {
          en: 'Only if the Worker is written in TypeScript',
          vi: 'Chỉ khi Worker được viết bằng TypeScript'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Web Workers run in a thread-safe context isolated from the DOM to avoid race conditions.',
        vi: 'Web Worker chạy trong ngữ cảnh an toàn luồng độc lập với DOM để tránh xung đột dữ liệu race conditions.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'easy'
    },
    {
      id: 'html_q_18_4',
      type: 'single_choice',
      question: {
        en: 'What event is triggered on other open windows/tabs of the same origin when localStorage is modified?',
        vi: 'Sự kiện nào được kích hoạt trên các cửa sổ/tab khác cùng nguồn khi localStorage bị chỉnh sửa?'
      },
      options: [
        {
          en: 'window.addEventListener("storage", ...)',
          vi: 'window.addEventListener("storage", ...)'
        },
        {
          en: 'window.addEventListener("change", ...)',
          vi: 'window.addEventListener("change", ...)'
        },
        {
          en: 'document.addEventListener("update", ...)',
          vi: 'document.addEventListener("update", ...)'
        },
        {
          en: 'localStorage.onupdate = ...',
          vi: 'localStorage.onupdate = ...'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The storage event fires across other tabs on the same origin whenever storage data changes.',
        vi: 'Sự kiện storage kích hoạt trên các tab khác cùng nguồn bất cứ khi nào dữ liệu bộ nhớ thay đổi.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'medium'
    },
    {
      id: 'html_q_18_5',
      type: 'single_choice',
      question: {
        en: 'What attribute makes a standard HTML element natively draggable by the user?',
        vi: 'Thuộc tính nào làm cho một phần tử HTML tiêu chuẩn có thể kéo được theo cử chỉ của người dùng?'
      },
      options: [
        {
          en: 'draggable="true"',
          vi: 'draggable="true"'
        },
        {
          en: 'movable="true"',
          vi: 'movable="true"'
        },
        {
          en: 'drag="enabled"',
          vi: 'drag="enabled"'
        },
        {
          en: 'droppable="true"',
          vi: 'droppable="true"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'draggable="true" enables native drag operation gestures.',
        vi: 'draggable="true" kích hoạt cử chỉ kéo phần tử gốc của trình duyệt.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'easy'
    },
    {
      id: 'html_q_18_6',
      type: 'single_choice',
      question: {
        en: 'What method of the dataTransfer object is used in dragstart to attach payload data to the drag operation?',
        vi: 'Phương thức nào của đối tượng dataTransfer được dùng trong sự kiện dragstart để đính kèm dữ liệu vào thao tác kéo?'
      },
      options: [
        {
          en: 'event.dataTransfer.setData("mime/type", data)',
          vi: 'event.dataTransfer.setData("mime/type", data)'
        },
        {
          en: 'event.dataTransfer.attachPayload(data)',
          vi: 'event.dataTransfer.attachPayload(data)'
        },
        {
          en: 'event.dataTransfer.write(data)',
          vi: 'event.dataTransfer.write(data)'
        },
        {
          en: 'event.dataTransfer.push(data)',
          vi: 'event.dataTransfer.push(data)'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'setData(format, data) stores transfer payload data indexed by MIME type.',
        vi: 'setData(format, data) lưu trữ dữ liệu truyền tải theo định dạng MIME.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'medium'
    },
    {
      id: 'html_q_18_7',
      type: 'single_choice',
      question: {
        en: 'What data format does localStorage natively support storing?',
        vi: 'localStorage hỗ trợ lưu trữ định dạng dữ liệu gốc nào?'
      },
      options: [
        {
          en: 'Strings (DOMString) only',
          vi: 'Chỉ các chuỗi ký tự (DOMString)'
        },
        {
          en: 'Binary Blobs and ArrayBuffers directly',
          vi: 'Các đối tượng nhị phân Blob và ArrayBuffer trực tiếp'
        },
        {
          en: 'Raw JavaScript Functions',
          vi: 'Các hàm JavaScript thô'
        },
        {
          en: 'SQL table rows',
          vi: 'Các hàng bảng SQL'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'localStorage only stores strings; complex objects must be serialized with JSON.stringify().',
        vi: 'localStorage chỉ lưu chuỗi; các đối tượng phức tạp bắt buộc phải chuỗi hóa qua JSON.stringify().'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'easy'
    },
    {
      id: 'html_q_18_8',
      type: 'single_choice',
      question: {
        en: 'How do you terminate a running Web Worker from the main thread immediately?',
        vi: 'Làm thế nào để hủy ngay lập tức một Web Worker đang chạy từ luồng chính?'
      },
      options: [
        {
          en: 'worker.terminate()',
          vi: 'worker.terminate()'
        },
        {
          en: 'worker.stop()',
          vi: 'worker.stop()'
        },
        {
          en: 'worker.close()',
          vi: 'worker.close()'
        },
        {
          en: 'worker.kill()',
          vi: 'worker.kill()'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'worker.terminate() immediately halts the worker thread without waiting for code completion.',
        vi: 'worker.terminate() dừng ngay lập tức luồng worker mà không cần chờ tác vụ hoàn thành.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'easy'
    },
    {
      id: 'html_q_18_9',
      type: 'single_choice',
      question: {
        en: 'What is the standard storage quota limit for localStorage in modern desktop browsers per origin?',
        vi: 'Hạn mức dung lượng lưu trữ chuẩn cho localStorage trên các trình duyệt máy tính hiện đại trên mỗi nguồn là bao nhiêu?'
      },
      options: [
        {
          en: 'Approximately 5 MB to 10 MB per origin',
          vi: 'Khoảng 5 MB đến 10 MB trên mỗi nguồn (origin)'
        },
        {
          en: '500 GB',
          vi: '500 GB'
        },
        {
          en: '50 KB',
          vi: '50 KB'
        },
        {
          en: 'Unlimited',
          vi: 'Không giới hạn'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'localStorage provides roughly 5MB of synchronous key-value storage per origin.',
        vi: 'localStorage cung cấp khoảng 5MB dung lượng lưu trữ khóa-giá trị đồng bộ trên mỗi nguồn.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'easy'
    },
    {
      id: 'html_q_18_10',
      type: 'single_choice',
      question: {
        en: 'What is the primary architectural purpose of offloading calculations to a Web Worker?',
        vi: 'Mục đích kiến trúc then chốt của việc chuyển tính toán sang Web Worker là gì?'
      },
      options: [
        {
          en: 'Prevents CPU-intensive tasks from freezing the browser UI main thread, keeping user interactions and animations silky smooth at 60fps',
          vi: 'Ngăn các tác vụ ngốn CPU làm đóng băng luồng giao diện chính, giữ cho tương tác người dùng và hoạt ảnh luôn mượt mà ở 60fps'
        },
        {
          en: 'To bypass HTTPS certificates',
          vi: 'Để bỏ qua chứng chỉ HTTPS'
        },
        {
          en: 'To increase the internet connection speed by 2x',
          vi: 'Để tăng tốc độ đường truyền internet lên gấp 2 lần'
        },
        {
          en: 'To compress images on disk',
          vi: 'Để nén ảnh trên ổ cứng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Web Workers prevent long-running JavaScript execution from blocking the event loop and UI responsiveness.',
        vi: 'Web Worker ngăn các đoạn mã chạy lâu làm tắc nghẽn event loop và giảm độ phản hồi của giao diện.'
      },
      topicId: 'html_web_platform_apis',
      difficulty: 'easy'
    }
  ]
};

export default lesson20;
