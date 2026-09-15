import { Lesson } from '../../../../types';

export const lesson09: Lesson = {
  "id": "js_lesson_9",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_2",
  "order": 9,
  "title": {
    "en": "Arrays: Creation, Indexing & Mutating vs Non-Mutating Methods",
    "vi": "Mảng: Khởi Tạo, Chỉ Số & Phương Thức Biến Đổi vs Bất Biến"
  },
  "summary": {
    "en": "Master array creation, indexing, length manipulation, mutating methods (push, pop, shift, unshift, splice), and modern immutable methods (toSpliced, toReversed, toSorted).",
    "vi": "Làm chủ khởi tạo mảng, thao tác chỉ số, thuộc tính length, các phương thức làm thay đổi mảng (splice, push) và các phương thức bất biến hiện đại (toSpliced, toReversed, toSorted)."
  },
  "estimatedMinutes": 20,
  "topicId": "js_arrays_fundamentals",
  "learn": {
    "introduction": {
      "en": "Arrays in JavaScript are ordered, integer-indexed collections of values backed by dynamic heap allocation. Because JavaScript arrays are objects, they can grow dynamically and hold heterogeneous types. Understanding the critical distinction between mutating methods (which alter the existing array in place) and non-mutating methods (which return a fresh copy) is vital for writing predictable state logic in modern UI frameworks.",
      "vi": "Mảng trong JavaScript là tập hợp các phần tử có thứ tự, đánh chỉ số nguyên và được cấp phát động trên bộ nhớ Heap. Do mảng thực chất là một đối tượng, chúng có thể tự động co giãn kích thước và chứa nhiều kiểu dữ liệu khác nhau. Hiểu rõ sự khác biệt giữa phương thức làm biến đổi mảng gốc (mutating) và phương thức trả về mảng mới (non-mutating/immutable) là chìa khóa để quản lý trạng thái an toàn trong các framework hiện đại."
    },
    "conceptExplanation": {
      "en": "1. Array Creation & Length Quirks: Literal `[1, 2, 3]`, `new Array(size)` (creates sparse empty slots), and `Array.from({ length: 5 }, (_, i) => i)`. Setting `arr.length = 0` clears the array instantly; decreasing length truncates trailing elements.\n\n2. Classical Mutating Methods: `.push()` / `.pop()` (O(1) add/remove at end), `.unshift()` / `.shift()` (O(N) add/remove at beginning), `.splice(start, deleteCount, ...items)` (in-place deletion and insertion), `.reverse()`, `.sort()`.\n\n3. Modern Immutable Methods (ES2023): `.toSpliced()`, `.toReversed()`, `.toSorted()`, and `.with(index, value)`. These perform classical array transformations without mutating the original array.\n\n4. Access & Search: `.at(index)` (supports negative indexing like `.at(-1)` for the last item), `.indexOf()`, `.includes()`, `.concat()`, `.slice(start, end)`.",
      "vi": "1. Khởi Tạo Mảng & Đặc Tính Length: Cú pháp mảng `[1, 2, 3]`, `new Array(size)` (tạo các ô nhớ rỗng sparse slots), và `Array.from({ length: 5 }, (_, i) => i)`. Gán `arr.length = 0` sẽ xóa sạch mảng ngay lập tức; giảm `length` sẽ cắt bỏ các phần tử phía sau.\n\n2. Các Phương Thức Gây Biến Đổi (Mutating): `.push()` / `.pop()` (thêm/xóa cuối O(1)), `.unshift()` / `.shift()` (thêm/xóa đầu O(N)), `.splice(start, deleteCount, ...items)` (thêm/xóa trực tiếp trên mảng gốc), `.reverse()`, `.sort()`.\n\n3. Các Phương Thức Bất Biến Hiện Đại (ES2023): `.toSpliced()`, `.toReversed()`, `.toSorted()` và `.with(index, value)`. Các hàm này thực hiện biến đổi và trả về bản sao mảng mới mà không làm thay đổi mảng ban đầu.\n\n4. Truy Cập & Tìm Kiếm: `.at(index)` (hỗ trợ chỉ số âm như `.at(-1)` lấy phần tử cuối), `.indexOf()`, `.includes()`, `.concat()`, `.slice()`."
    },
    "syntax": "// 1. Safe negative indexing with .at()\nconst queue = [\"Task A\", \"Task B\", \"Task C\"];\nconsole.log(queue.at(-1)); // \"Task C\"\n\n// 2. Classical mutating splice vs modern immutable toSpliced\nconst scores = [100, 85, 90];\n// Mutating:\n// scores.splice(1, 1); // Mutates scores to [100, 90]\n\n// Non-mutating (ES2023):\nconst updatedScores = scores.toSpliced(1, 1, 95);\nconsole.log(\"Original:\", scores);        // [100, 85, 90] (Preserved!)\nconsole.log(\"Updated:\", updatedScores);  // [100, 95, 90]\n\n// 3. Array.from factory\nconst matrixRow = Array.from({ length: 4 }, (_, index) => index * 2); // [0, 2, 4, 6]",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Immutable Todo List State Manager",
          "vi": "Bộ Quản Lý Trạng Thái Danh Sách Todo Bất Biến"
        },
        "description": {
          "en": "Demonstrates updating, inserting, and deleting items immutably using modern array methods.",
          "vi": "Minh họa thao tác cập nhật, chèn và xóa phần tử một cách bất biến bằng các phương thức mảng hiện đại."
        },
        "code": "function todoReducer(todos, action) {\n  switch (action.type) {\n    case \"ADD\":\n      return [...todos, action.payload];\n    case \"TOGGLE\": {\n      const idx = todos.findIndex(t => t.id === action.id);\n      if (idx === -1) return todos;\n      return todos.with(idx, { ...todos[idx], completed: !todos[idx].completed });\n    }\n    case \"REMOVE\":\n      return todos.filter(t => t.id !== action.id);\n    case \"REORDER\":\n      return todos.toReversed();\n    default:\n      return todos;\n  }\n}\n\nconst initialTodos = [\n  { id: 1, text: \"Write Unit Tests\", completed: false },\n  { id: 2, text: \"Review PR\", completed: true }\n];\nconst updated = todoReducer(initialTodos, { type: \"TOGGLE\", id: 1 });\nconsole.log(updated[0].completed); // true\nconsole.log(initialTodos[0].completed); // false (Unmutated!)"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Assuming `arr.sort()` sorts numbers numerically by default.",
          "vi": "Nghĩ rằng `arr.sort()` mặc định sắp xếp các con số theo thứ tự số học."
        },
        "correction": {
          "en": "Always supply a comparator function: `arr.sort((a, b) => a - b)`.",
          "vi": "Luôn truyền hàm so sánh: `arr.sort((a, b) => a - b)`."
        }
      }
    ],
    "tips": [
      {
        "en": "Prefer toSorted / toReversed / toSpliced for pure state management: These methods eliminate defensive copying (`[...arr].sort()`) and prevent state corruption in React and Redux architectures.",
        "vi": "Ưu tiên dùng toSorted / toReversed / toSpliced trong quản lý state: Các phương thức này giúp loại bỏ bước sao chép phòng thủ `[...arr].sort()` và ngăn ngừa đột biến state trong ứng dụng React / Redux."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_9_1",
      "type": "complete_code",
      "title": {
        "en": "Safe Queue Rotation with Immutable Methods",
        "vi": "Xoay Vòng Hàng Đợi An Toàn Bằng Phương Thức Bất Biến"
      },
      "instruction": {
        "en": "Write a function `rotateQueue(queue, steps)` that rotates array elements to the right by `steps` positions without mutating the input queue array. Use modulo to handle steps greater than array length.",
        "vi": "Viết hàm `rotateQueue(queue, steps)` xoay các phần tử trong mảng sang phải `steps` vị trí mà không làm thay đổi mảng đầu vào. Dùng phép chia lấy dư modulo để xử lý khi steps lớn hơn độ dài mảng."
      },
      "starterCode": "function rotateQueue(queue, steps) {\n  // Return rotated array without mutating queue\n}\n\nconst players = [\"A\", \"B\", \"C\", \"D\", \"E\"];\nconsole.log(rotateQueue(players, 2)); // [\"D\", \"E\", \"A\", \"B\", \"C\"]\nconsole.log(players); // [\"A\", \"B\", \"C\", \"D\", \"E\"]",
      "solutionCode": "function rotateQueue(queue, steps) {\n  if (!queue || queue.length === 0) return [];\n  const k = steps % queue.length;\n  if (k === 0) return [...queue];\n  return [...queue.slice(-k), ...queue.slice(0, queue.length - k)];\n}",
      "hint": {
        "en": "Calculate k = steps % queue.length and concatenate queue.slice(-k) with queue.slice(0, queue.length - k).",
        "vi": "Tính k = steps % queue.length và nối mảng queue.slice(-k) với queue.slice(0, queue.length - k)."
      }
    },
    {
      "id": "js_ex_9_2",
      "type": "complete_code",
      "title": {
        "en": "Ranked Leaderboard Sorter",
        "vi": "Sắp Xếp Bảng Xếp Hạng Điểm Số Không Đột Biến"
      },
      "instruction": {
        "en": "Write a function `getTopPlayers(players, limit)` that sorts player objects in descending order of `score` (and ascending by `name` if scores tie) and returns the top `limit` players without mutating the original `players` array.",
        "vi": "Viết hàm `getTopPlayers(players, limit)` sắp xếp danh sách người chơi giảm dần theo `score` (và tăng dần theo `name` nếu bằng điểm) và trả về `limit` người chơi dẫn đầu mà không làm thay đổi mảng `players` gốc."
      },
      "starterCode": "function getTopPlayers(players, limit) {\n  // Return top players\n}\n\nconst list = [\n  { name: \"Alice\", score: 85 },\n  { name: \"Bob\", score: 95 },\n  { name: \"Charlie\", score: 85 }\n];\nconsole.log(getTopPlayers(list, 2));",
      "solutionCode": "function getTopPlayers(players, limit) {\n  return players\n    .toSorted((a, b) => {\n      if (b.score !== a.score) {\n        return b.score - a.score;\n      }\n      return a.name.localeCompare(b.name);\n    })\n    .slice(0, limit);\n}",
      "hint": {
        "en": "Use .toSorted() with a comparator comparing b.score - a.score and a.name.localeCompare(b.name), then .slice(0, limit).",
        "vi": "Dùng .toSorted() với hàm so sánh b.score - a.score và a.name.localeCompare(b.name), sau đó gọi .slice(0, limit)."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_9",
    "title": {
      "en": "Undo / Redo History Stack Engine",
      "vi": "Engine Ngăn Xếp Lịch Sử Undo / Redo"
    },
    "description": {
      "en": "Build a function `createHistoryStack(initialState, maxHistory = 20)` that returns an object with methods: `getPresent()`, `pushState(newState)` (pushes new state, clears redo stack, truncates if exceeding maxHistory), `undo()` (steps back one state), `redo()` (steps forward one state), `canUndo()`, and `canRedo()`.",
      "vi": "Xây dựng hàm `createHistoryStack(initialState, maxHistory = 20)` trả về đối tượng có các phương thức: `getPresent()`, `pushState(newState)` (thêm state mới, xóa redo stack, giới hạn tối đa maxHistory), `undo()` (quay lại 1 bước), `redo()` (tiến tới 1 bước), `canUndo()` và `canRedo()`."
    },
    "starterCode": "function createHistoryStack(initialState, maxHistory = 20) {\n  // Implement undo/redo stack\n}\n\nconst editor = createHistoryStack(\"Version 1\");\neditor.pushState(\"Version 2\");\neditor.pushState(\"Version 3\");\nconsole.log(editor.undo()); // \"Version 2\"\nconsole.log(editor.redo()); // \"Version 3\"",
    "solutionCode": "function createHistoryStack(initialState, maxHistory = 20) {\n  let past = [];\n  let present = initialState;\n  let future = [];\n\n  return {\n    getPresent() {\n      return present;\n    },\n    pushState(newState) {\n      past = [...past, present];\n      if (past.length > maxHistory) {\n        past = past.slice(past.length - maxHistory);\n      }\n      present = newState;\n      future = [];\n      return present;\n    },\n    undo() {\n      if (past.length === 0) return present;\n      const previous = past[past.length - 1];\n      past = past.slice(0, -1);\n      future = [present, ...future];\n      present = previous;\n      return present;\n    },\n    redo() {\n      if (future.length === 0) return present;\n      const next = future[0];\n      future = future.slice(1);\n      past = [...past, present];\n      present = next;\n      return present;\n    },\n    canUndo() {\n      return past.length > 0;\n    },\n    canRedo() {\n      return future.length > 0;\n    }\n  };\n}",
    "hints": [
      {
        "en": "Maintain past array, present value, and future array. Reset future on pushState, and pop/push states on undo/redo.",
        "vi": "Duy trì mảng past, giá trị present và mảng future. Reset future khi pushState, và dịch chuyển phần tử khi undo/redo."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Undo / Redo History Stack Engine according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine Ngăn Xếp Lịch Sử Undo / Redo theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_9_1",
      "type": "single_choice",
      "question": {
        "en": "Which method returns the element at a specified index and supports negative indices to count backwards from the end?",
        "vi": "Phương thức nào trả về phần tử tại vị trí chỉ định và hỗ trợ chỉ số âm để đếm ngược từ cuối mảng?"
      },
      "options": [
        {
          "en": "arr.at(index)",
          "vi": "arr.at(index)"
        },
        {
          "en": "arr.get(index)",
          "vi": "arr.get(index)"
        },
        {
          "en": "arr.item(index)",
          "vi": "arr.item(index)"
        },
        {
          "en": "arr.index(index)",
          "vi": "arr.index(index)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Array.prototype.at()` allows concise relative indexing, such as `arr.at(-1)` for the last element.",
        "vi": "`Array.prototype.at()` cho phép lập chỉ số tương đối ngắn gọn, ví dụ `arr.at(-1)` để lấy phần tử cuối cùng."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_9_2",
      "type": "predict_output",
      "question": {
        "en": "What will `[10, 2, 5].sort()` return by default in JavaScript?",
        "vi": "`[10, 2, 5].sort()` mặc định trả về kết quả gì trong JavaScript?"
      },
      "options": [
        {
          "en": "[10, 2, 5]",
          "vi": "[10, 2, 5]"
        },
        {
          "en": "[2, 5, 10]",
          "vi": "[2, 5, 10]"
        },
        {
          "en": "[10, 5, 2]",
          "vi": "[10, 5, 2]"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Default `.sort()` converts elements to strings. In lexicographical order, `'10'` comes before `'2'` and `'5'`.",
        "vi": "Mặc định `.sort()` ép kiểu sang chuỗi. Theo thứ tự từ điển, chuỗi `'10'` đứng trước `'2'` và `'5'`."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_9_3",
      "type": "single_choice",
      "question": {
        "en": "What is the key difference between `.splice()` and `.toSpliced()`?",
        "vi": "Điểm khác biệt then chốt giữa `.splice()` và `.toSpliced()` là gì?"
      },
      "options": [
        {
          "en": "`.splice()` mutates the original array in place; `.toSpliced()` returns a new modified array copy without mutating the original",
          "vi": "`.splice()` làm biến đổi trực tiếp mảng gốc; `.toSpliced()` trả về bản sao mảng mới mà không thay đổi mảng ban đầu"
        },
        {
          "en": "`.toSpliced()` only works with strings",
          "vi": "`.toSpliced()` chỉ hoạt động với chuỗi"
        },
        {
          "en": "`.splice()` is asynchronous",
          "vi": "`.splice()` là phương thức bất đồng bộ"
        },
        {
          "en": "There is no difference",
          "vi": "Không có sự khác biệt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.toSpliced()` is the immutable ES2023 version of `.splice()`, returning a fresh array.",
        "vi": "`.toSpliced()` là phiên bản bất biến được bổ sung trong ES2023 của `.splice()`, luôn trả về một mảng mới."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_9_4",
      "type": "predict_output",
      "question": {
        "en": "What happens when you set `arr.length = 0` on an array `arr = [1, 2, 3, 4]`?",
        "vi": "Điều gì xảy ra khi bạn gán `arr.length = 0` cho một mảng `arr = [1, 2, 3, 4]`?"
      },
      "options": [
        {
          "en": "The array is emptied in place and becomes `[]`",
          "vi": "Mảng bị xóa sạch trực tiếp và trở thành `[]`"
        },
        {
          "en": "Throws a TypeError: length is read-only",
          "vi": "Ném lỗi TypeError: length is read-only"
        },
        {
          "en": "The array remains unchanged",
          "vi": "Mảng giữ nguyên không thay đổi"
        },
        {
          "en": "The array becomes `[0]`",
          "vi": "Mảng trở thành `[0]`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `length` property of a JavaScript Array is writable. Truncating `length = 0` deletes all existing elements in place.",
        "vi": "Thuộc tính `length` của mảng có thể ghi được. Gán `length = 0` sẽ xóa sạch toàn bộ các phần tử trên mảng đó."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_9_5",
      "type": "single_choice",
      "question": {
        "en": "Which method replaces an element at a given index and returns a brand-new copy of the array (ES2023)?",
        "vi": "Phương thức nào thay thế phần tử tại chỉ số cho trước và trả về bản sao mảng mới hoàn toàn (ES2023)?"
      },
      "options": [
        {
          "en": "arr.with(index, value)",
          "vi": "arr.with(index, value)"
        },
        {
          "en": "arr.set(index, value)",
          "vi": "arr.set(index, value)"
        },
        {
          "en": "arr.replace(index, value)",
          "vi": "arr.replace(index, value)"
        },
        {
          "en": "arr.put(index, value)",
          "vi": "arr.put(index, value)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Array.prototype.with(index, value)` produces a shallow copy of the array with the element at `index` replaced by `value`.",
        "vi": "`Array.prototype.with(index, value)` tạo ra một bản sao nông của mảng với phần tử tại `index` được thay bằng `value`."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_9_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` print?\n```js\nconst numbers = [1, 2, 3];\nnumbers.push(4);\nconst first = numbers.shift();\nconsole.log(numbers, first);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nconst numbers = [1, 2, 3];\nnumbers.push(4);\nconst first = numbers.shift();\nconsole.log(numbers, first);\n```"
      },
      "options": [
        {
          "en": "[2, 3, 4], 1",
          "vi": "[2, 3, 4], 1"
        },
        {
          "en": "[1, 2, 3], 4",
          "vi": "[1, 2, 3], 4"
        },
        {
          "en": "[1, 2, 3, 4], undefined",
          "vi": "[1, 2, 3, 4], undefined"
        },
        {
          "en": "[2, 3], 1",
          "vi": "[2, 3], 1"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`push(4)` makes array `[1, 2, 3, 4]`. `shift()` removes and returns the first element `1`, leaving `[2, 3, 4]`.",
        "vi": "`push(4)` tạo mảng `[1, 2, 3, 4]`. `shift()` xóa và trả về phần tử đầu tiên `1`, để lại mảng `[2, 3, 4]`."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_9_7",
      "type": "single_choice",
      "question": {
        "en": "How can you create a pre-filled array of 5 zeros without a loop in modern JavaScript?",
        "vi": "Cách nào tạo một mảng gồm 5 số 0 mà không dùng vòng lặp trong JS hiện đại?"
      },
      "options": [
        {
          "en": "new Array(5).fill(0)",
          "vi": "new Array(5).fill(0)"
        },
        {
          "en": "Array.zeros(5)",
          "vi": "Array.zeros(5)"
        },
        {
          "en": "[0 * 5]",
          "vi": "[0 * 5]"
        },
        {
          "en": "Array.create(0, 5)",
          "vi": "Array.create(0, 5)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`new Array(5).fill(0)` or `Array.from({ length: 5 }, () => 0)` creates and populates the 5-element array.",
        "vi": "`new Array(5).fill(0)` hoặc `Array.from({ length: 5 }, () => 0)` khởi tạo và điền 5 phần tử số 0."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_9_8",
      "type": "fill_blank",
      "question": {
        "en": "To create a shallow copy of an array section without modifying the original, call arr._____().",
        "vi": "Để tạo một bản sao nông của một phần mảng mà không làm thay đổi mảng gốc, bạn gọi arr._____()."
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
        "en": "`arr.slice()` extracts a portion of an array and returns it as a new array.",
        "vi": "`arr.slice()` trích xuất một phần của mảng và trả về dưới dạng mảng mới."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "slice"
      ]
    },
    {
      "id": "js_q_9_9",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log(Array.isArray({ length: 2, 0: 'a', 1: 'b' }))` print?",
        "vi": "`console.log(Array.isArray({ length: 2, 0: 'a', 1: 'b' }))` sẽ in ra gì?"
      },
      "options": [
        {
          "en": "false (it is an array-like object, not an actual Array instance)",
          "vi": "false (đây là đối tượng dạng mảng chứ không phải instance của Array)"
        },
        {
          "en": "true",
          "vi": "true"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Array.isArray` only returns true for genuine Array instances whose internal prototype chain descends from `Array.prototype`.",
        "vi": "`Array.isArray` chỉ trả về true cho các instance mảng đích thực có prototype kế thừa từ `Array.prototype`."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "hard"
    },
    {
      "id": "js_q_9_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `arr.unshift()` significantly slower than `arr.push()` on large arrays (e.g. 100,000 items)?",
        "vi": "Tại sao `arr.unshift()` lại chậm hơn đáng kể so với `arr.push()` trên mảng kích thước lớn (ví dụ 100,000 phần tử)?"
      },
      "options": [
        {
          "en": "`unshift()` requires re-indexing and shifting all N existing elements in memory to higher slots (O(N)), whereas `push()` appends to the end in O(1)",
          "vi": "`unshift()` phải đánh lại chỉ số và dịch chuyển toàn bộ N phần tử trong bộ nhớ sang ô tiếp theo (O(N)), trong khi `push()` thêm vào cuối là O(1)"
        },
        {
          "en": "`unshift()` converts the entire array to strings",
          "vi": "`unshift()` chuyển toàn bộ mảng sang chuỗi"
        },
        {
          "en": "`push()` uses hardware acceleration",
          "vi": "`push()` dùng tăng tốc phần cứng"
        },
        {
          "en": "`unshift()` is deprecated in V8 engine",
          "vi": "`unshift()` bị coi là lỗi thời trong V8"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Inserting at index 0 shifts every existing element, causing an O(N) memory copy operation.",
        "vi": "Chèn vào vị trí index 0 buộc phải dịch chuyển mọi phần tử hiện có, dẫn đến độ phức tạp thời gian O(N)."
      },
      "topicId": "js_arrays_fundamentals",
      "difficulty": "hard"
    }
  ]
};
export default lesson09;
