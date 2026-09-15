import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/basic/module02');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 09 ---
const lesson09: Lesson = {
  id: "js_lesson_9",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_2",
  order: 9,
  title: {
    en: "Arrays: Creation, Indexing & Mutating vs Non-Mutating Methods",
    vi: "Mảng: Khởi Tạo, Chỉ Số & Phương Thức Biến Đổi vs Bất Biến"
  },
  summary: {
    en: "Master array creation, indexing, length manipulation, mutating methods (push, pop, shift, unshift, splice), and modern immutable methods (toSpliced, toReversed, toSorted).",
    vi: "Làm chủ khởi tạo mảng, thao tác chỉ số, thuộc tính length, các phương thức làm thay đổi mảng (splice, push) và các phương thức bất biến hiện đại (toSpliced, toReversed, toSorted)."
  },
  estimatedMinutes: 20,
  topicId: "js_arrays_fundamentals",
  learn: {
    introduction: {
      en: "Arrays in JavaScript are ordered, integer-indexed collections of values backed by dynamic heap allocation. Because JavaScript arrays are objects, they can grow dynamically and hold heterogeneous types. Understanding the critical distinction between mutating methods (which alter the existing array in place) and non-mutating methods (which return a fresh copy) is vital for writing predictable state logic in modern UI frameworks.",
      vi: "Mảng trong JavaScript là tập hợp các phần tử có thứ tự, đánh chỉ số nguyên và được cấp phát động trên bộ nhớ Heap. Do mảng thực chất là một đối tượng, chúng có thể tự động co giãn kích thước và chứa nhiều kiểu dữ liệu khác nhau. Hiểu rõ sự khác biệt giữa phương thức làm biến đổi mảng gốc (mutating) và phương thức trả về mảng mới (non-mutating/immutable) là chìa khóa để quản lý trạng thái an toàn trong các framework hiện đại."
    },
    conceptExplanation: {
      en: "1. Array Creation & Length Quirks: Literal `[1, 2, 3]`, `new Array(size)` (creates sparse empty slots), and `Array.from({ length: 5 }, (_, i) => i)`. Setting `arr.length = 0` clears the array instantly; decreasing length truncates trailing elements.\n\n2. Classical Mutating Methods: `.push()` / `.pop()` (O(1) add/remove at end), `.unshift()` / `.shift()` (O(N) add/remove at beginning), `.splice(start, deleteCount, ...items)` (in-place deletion and insertion), `.reverse()`, `.sort()`.\n\n3. Modern Immutable Methods (ES2023): `.toSpliced()`, `.toReversed()`, `.toSorted()`, and `.with(index, value)`. These perform classical array transformations without mutating the original array.\n\n4. Access & Search: `.at(index)` (supports negative indexing like `.at(-1)` for the last item), `.indexOf()`, `.includes()`, `.concat()`, `.slice(start, end)`.",
      vi: "1. Khởi Tạo Mảng & Đặc Tính Length: Cú pháp mảng `[1, 2, 3]`, `new Array(size)` (tạo các ô nhớ rỗng sparse slots), và `Array.from({ length: 5 }, (_, i) => i)`. Gán `arr.length = 0` sẽ xóa sạch mảng ngay lập tức; giảm `length` sẽ cắt bỏ các phần tử phía sau.\n\n2. Các Phương Thức Gây Biến Đổi (Mutating): `.push()` / `.pop()` (thêm/xóa cuối O(1)), `.unshift()` / `.shift()` (thêm/xóa đầu O(N)), `.splice(start, deleteCount, ...items)` (thêm/xóa trực tiếp trên mảng gốc), `.reverse()`, `.sort()`.\n\n3. Các Phương Thức Bất Biến Hiện Đại (ES2023): `.toSpliced()`, `.toReversed()`, `.toSorted()` và `.with(index, value)`. Các hàm này thực hiện biến đổi và trả về bản sao mảng mới mà không làm thay đổi mảng ban đầu.\n\n4. Truy Cập & Tìm Kiếm: `.at(index)` (hỗ trợ chỉ số âm như `.at(-1)` lấy phần tử cuối), `.indexOf()`, `.includes()`, `.concat()`, `.slice()`."
    },
    syntax: `// 1. Safe negative indexing with .at()
const queue = ["Task A", "Task B", "Task C"];
console.log(queue.at(-1)); // "Task C"

// 2. Classical mutating splice vs modern immutable toSpliced
const scores = [100, 85, 90];
// Mutating:
// scores.splice(1, 1); // Mutates scores to [100, 90]

// Non-mutating (ES2023):
const updatedScores = scores.toSpliced(1, 1, 95);
console.log("Original:", scores);        // [100, 85, 90] (Preserved!)
console.log("Updated:", updatedScores);  // [100, 95, 90]

// 3. Array.from factory
const matrixRow = Array.from({ length: 4 }, (_, index) => index * 2); // [0, 2, 4, 6]`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Immutable Todo List State Manager",
          vi: "Bộ Quản Lý Trạng Thái Danh Sách Todo Bất Biến"
        },
        description: {
          en: "Demonstrates updating, inserting, and deleting items immutably using modern array methods.",
          vi: "Minh họa thao tác cập nhật, chèn và xóa phần tử một cách bất biến bằng các phương thức mảng hiện đại."
        },
        code: `function todoReducer(todos, action) {
  switch (action.type) {
    case "ADD":
      return [...todos, action.payload];
    case "TOGGLE": {
      const idx = todos.findIndex(t => t.id === action.id);
      if (idx === -1) return todos;
      return todos.with(idx, { ...todos[idx], completed: !todos[idx].completed });
    }
    case "REMOVE":
      return todos.filter(t => t.id !== action.id);
    case "REORDER":
      return todos.toReversed();
    default:
      return todos;
  }
}

const initialTodos = [
  { id: 1, text: "Write Unit Tests", completed: false },
  { id: 2, text: "Review PR", completed: true }
];
const updated = todoReducer(initialTodos, { type: "TOGGLE", id: 1 });
console.log(updated[0].completed); // true
console.log(initialTodos[0].completed); // false (Unmutated!)`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Assuming `arr.sort()` sorts numbers numerically by default.",
          vi: "Nghĩ rằng `arr.sort()` mặc định sắp xếp các con số theo thứ tự số học."
        },
        correction: {
          en: "Always supply a comparator function: `arr.sort((a, b) => a - b)`.",
          vi: "Luôn truyền hàm so sánh: `arr.sort((a, b) => a - b)`."
        },
        explanation: {
          en: "Default `sort()` converts elements to strings and compares UTF-16 code units, causing `[10, 2, 5].sort()` to incorrectly return `[10, 2, 5]` because `'10' < '2'`.",
          vi: "Mặc định `sort()` ép các phần tử sang chuỗi rồi so sánh mã UTF-16, dẫn tới `[10, 2, 5].sort()` trả về `[10, 2, 5]` do ký tự `'1'` đứng trước `'2'`."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Prefer toSorted / toReversed / toSpliced for pure state management",
          vi: "Ưu tiên dùng toSorted / toReversed / toSpliced trong quản lý state"
        },
        description: {
          en: "These methods eliminate defensive copying (`[...arr].sort()`) and prevent state corruption in React and Redux architectures.",
          vi: "Các phương thức này giúp loại bỏ bước sao chép phòng thủ `[...arr].sort()` và ngăn ngừa đột biến state trong ứng dụng React / Redux."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_9_1",
      title: {
        en: "Safe Queue Rotation with Immutable Methods",
        vi: "Xoay Vòng Hàng Đợi An Toàn Bằng Phương Thức Bất Biến"
      },
      instruction: {
        en: "Write a function `rotateQueue(queue, steps)` that rotates array elements to the right by `steps` positions without mutating the input queue array. Use modulo to handle steps greater than array length.",
        vi: "Viết hàm `rotateQueue(queue, steps)` xoay các phần tử trong mảng sang phải `steps` vị trí mà không làm thay đổi mảng đầu vào. Dùng phép chia lấy dư modulo để xử lý khi steps lớn hơn độ dài mảng."
      },
      starterCode: `function rotateQueue(queue, steps) {
  // Return rotated array without mutating queue
}

const players = ["A", "B", "C", "D", "E"];
console.log(rotateQueue(players, 2)); // ["D", "E", "A", "B", "C"]
console.log(players); // ["A", "B", "C", "D", "E"]`,
      solutionCode: `function rotateQueue(queue, steps) {
  if (!queue || queue.length === 0) return [];
  const k = steps % queue.length;
  if (k === 0) return [...queue];
  return [...queue.slice(-k), ...queue.slice(0, queue.length - k)];
}`,
      hints: [
        {
          en: "Calculate k = steps % queue.length and concatenate queue.slice(-k) with queue.slice(0, queue.length - k).",
          vi: "Tính k = steps % queue.length và nối mảng queue.slice(-k) với queue.slice(0, queue.length - k)."
        }
      ]
    },
    {
      id: "js_ex_9_2",
      title: {
        en: "Ranked Leaderboard Sorter",
        vi: "Sắp Xếp Bảng Xếp Hạng Điểm Số Không Đột Biến"
      },
      instruction: {
        en: "Write a function `getTopPlayers(players, limit)` that sorts player objects in descending order of `score` (and ascending by `name` if scores tie) and returns the top `limit` players without mutating the original `players` array.",
        vi: "Viết hàm `getTopPlayers(players, limit)` sắp xếp danh sách người chơi giảm dần theo `score` (và tăng dần theo `name` nếu bằng điểm) và trả về `limit` người chơi dẫn đầu mà không làm thay đổi mảng `players` gốc."
      },
      starterCode: `function getTopPlayers(players, limit) {
  // Return top players
}

const list = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 95 },
  { name: "Charlie", score: 85 }
];
console.log(getTopPlayers(list, 2));`,
      solutionCode: `function getTopPlayers(players, limit) {
  return players
    .toSorted((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}`,
      hints: [
        {
          en: "Use .toSorted() with a comparator comparing b.score - a.score and a.name.localeCompare(b.name), then .slice(0, limit).",
          vi: "Dùng .toSorted() với hàm so sánh b.score - a.score và a.name.localeCompare(b.name), sau đó gọi .slice(0, limit)."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_9",
    title: {
      en: "Undo / Redo History Stack Engine",
      vi: "Engine Ngăn Xếp Lịch Sử Undo / Redo"
    },
    description: {
      en: "Build a function `createHistoryStack(initialState, maxHistory = 20)` that returns an object with methods: `getPresent()`, `pushState(newState)` (pushes new state, clears redo stack, truncates if exceeding maxHistory), `undo()` (steps back one state), `redo()` (steps forward one state), `canUndo()`, and `canRedo()`.",
      vi: "Xây dựng hàm `createHistoryStack(initialState, maxHistory = 20)` trả về đối tượng có các phương thức: `getPresent()`, `pushState(newState)` (thêm state mới, xóa redo stack, giới hạn tối đa maxHistory), `undo()` (quay lại 1 bước), `redo()` (tiến tới 1 bước), `canUndo()` và `canRedo()`."
    },
    starterCode: `function createHistoryStack(initialState, maxHistory = 20) {
  // Implement undo/redo stack
}

const editor = createHistoryStack("Version 1");
editor.pushState("Version 2");
editor.pushState("Version 3");
console.log(editor.undo()); // "Version 2"
console.log(editor.redo()); // "Version 3"`,
    solutionCode: `function createHistoryStack(initialState, maxHistory = 20) {
  let past = [];
  let present = initialState;
  let future = [];

  return {
    getPresent() {
      return present;
    },
    pushState(newState) {
      past = [...past, present];
      if (past.length > maxHistory) {
        past = past.slice(past.length - maxHistory);
      }
      present = newState;
      future = [];
      return present;
    },
    undo() {
      if (past.length === 0) return present;
      const previous = past[past.length - 1];
      past = past.slice(0, -1);
      future = [present, ...future];
      present = previous;
      return present;
    },
    redo() {
      if (future.length === 0) return present;
      const next = future[0];
      future = future.slice(1);
      past = [...past, present];
      present = next;
      return present;
    },
    canUndo() {
      return past.length > 0;
    },
    canRedo() {
      return future.length > 0;
    }
  };
}`,
    hints: [
      {
        en: "Maintain past array, present value, and future array. Reset future on pushState, and pop/push states on undo/redo.",
        vi: "Duy trì mảng past, giá trị present và mảng future. Reset future khi pushState, và dịch chuyển phần tử khi undo/redo."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_9_1",
      type: "single_choice",
      question: {
        en: "Which method returns the element at a specified index and supports negative indices to count backwards from the end?",
        vi: "Phương thức nào trả về phần tử tại vị trí chỉ định và hỗ trợ chỉ số âm để đếm ngược từ cuối mảng?"
      },
      options: [
        { id: "a", text: { en: "arr.at(index)", vi: "arr.at(index)" } },
        { id: "b", text: { en: "arr.get(index)", vi: "arr.get(index)" } },
        { id: "c", text: { en: "arr.item(index)", vi: "arr.item(index)" } },
        { id: "d", text: { en: "arr.index(index)", vi: "arr.index(index)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Array.prototype.at()` allows concise relative indexing, such as `arr.at(-1)` for the last element.",
        vi: "`Array.prototype.at()` cho phép lập chỉ số tương đối ngắn gọn, ví dụ `arr.at(-1)` để lấy phần tử cuối cùng."
      }
    },
    {
      id: "js_q_9_2",
      type: "predict_output",
      question: {
        en: "What will `[10, 2, 5].sort()` return by default in JavaScript?",
        vi: "`[10, 2, 5].sort()` mặc định trả về kết quả gì trong JavaScript?"
      },
      options: [
        { id: "a", text: { en: "[10, 2, 5]", vi: "[10, 2, 5]" } },
        { id: "b", text: { en: "[2, 5, 10]", vi: "[2, 5, 10]" } },
        { id: "c", text: { en: "[10, 5, 2]", vi: "[10, 5, 2]" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Default `.sort()` converts elements to strings. In lexicographical order, `'10'` comes before `'2'` and `'5'`.",
        vi: "Mặc định `.sort()` ép kiểu sang chuỗi. Theo thứ tự từ điển, chuỗi `'10'` đứng trước `'2'` và `'5'`."
      }
    },
    {
      id: "js_q_9_3",
      type: "single_choice",
      question: {
        en: "What is the key difference between `.splice()` and `.toSpliced()`?",
        vi: "Điểm khác biệt then chốt giữa `.splice()` và `.toSpliced()` là gì?"
      },
      options: [
        { id: "a", text: { en: "`.splice()` mutates the original array in place; `.toSpliced()` returns a new modified array copy without mutating the original", vi: "`.splice()` làm biến đổi trực tiếp mảng gốc; `.toSpliced()` trả về bản sao mảng mới mà không thay đổi mảng ban đầu" } },
        { id: "b", text: { en: "`.toSpliced()` only works with strings", vi: "`.toSpliced()` chỉ hoạt động với chuỗi" } },
        { id: "c", text: { en: "`.splice()` is asynchronous", vi: "`.splice()` là phương thức bất đồng bộ" } },
        { id: "d", text: { en: "There is no difference", vi: "Không có sự khác biệt" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.toSpliced()` is the immutable ES2023 version of `.splice()`, returning a fresh array.",
        vi: "`.toSpliced()` là phiên bản bất biến được bổ sung trong ES2023 của `.splice()`, luôn trả về một mảng mới."
      }
    },
    {
      id: "js_q_9_4",
      type: "predict_output",
      question: {
        en: "What happens when you set `arr.length = 0` on an array `arr = [1, 2, 3, 4]`?",
        vi: "Điều gì xảy ra khi bạn gán `arr.length = 0` cho một mảng `arr = [1, 2, 3, 4]`?"
      },
      options: [
        { id: "a", text: { en: "The array is emptied in place and becomes `[]`", vi: "Mảng bị xóa sạch trực tiếp và trở thành `[]`" } },
        { id: "b", text: { en: "Throws a TypeError: length is read-only", vi: "Ném lỗi TypeError: length is read-only" } },
        { id: "c", text: { en: "The array remains unchanged", vi: "Mảng giữ nguyên không thay đổi" } },
        { id: "d", text: { en: "The array becomes `[0]`", vi: "Mảng trở thành `[0]`" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The `length` property of a JavaScript Array is writable. Truncating `length = 0` deletes all existing elements in place.",
        vi: "Thuộc tính `length` của mảng có thể ghi được. Gán `length = 0` sẽ xóa sạch toàn bộ các phần tử trên mảng đó."
      }
    },
    {
      id: "js_q_9_5",
      type: "single_choice",
      question: {
        en: "Which method replaces an element at a given index and returns a brand-new copy of the array (ES2023)?",
        vi: "Phương thức nào thay thế phần tử tại chỉ số cho trước và trả về bản sao mảng mới hoàn toàn (ES2023)?"
      },
      options: [
        { id: "a", text: { en: "arr.with(index, value)", vi: "arr.with(index, value)" } },
        { id: "b", text: { en: "arr.set(index, value)", vi: "arr.set(index, value)" } },
        { id: "c", text: { en: "arr.replace(index, value)", vi: "arr.replace(index, value)" } },
        { id: "d", text: { en: "arr.put(index, value)", vi: "arr.put(index, value)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Array.prototype.with(index, value)` produces a shallow copy of the array with the element at `index` replaced by `value`.",
        vi: "`Array.prototype.with(index, value)` tạo ra một bản sao nông của mảng với phần tử tại `index` được thay bằng `value`."
      }
    },
    {
      id: "js_q_9_6",
      type: "predict_output",
      question: {
        en: "What will `console.log` print?\n```js\nconst numbers = [1, 2, 3];\nnumbers.push(4);\nconst first = numbers.shift();\nconsole.log(numbers, first);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nconst numbers = [1, 2, 3];\nnumbers.push(4);\nconst first = numbers.shift();\nconsole.log(numbers, first);\n```"
      },
      options: [
        { id: "a", text: { en: "[2, 3, 4], 1", vi: "[2, 3, 4], 1" } },
        { id: "b", text: { en: "[1, 2, 3], 4", vi: "[1, 2, 3], 4" } },
        { id: "c", text: { en: "[1, 2, 3, 4], undefined", vi: "[1, 2, 3, 4], undefined" } },
        { id: "d", text: { en: "[2, 3], 1", vi: "[2, 3], 1" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`push(4)` makes array `[1, 2, 3, 4]`. `shift()` removes and returns the first element `1`, leaving `[2, 3, 4]`.",
        vi: "`push(4)` tạo mảng `[1, 2, 3, 4]`. `shift()` xóa và trả về phần tử đầu tiên `1`, để lại mảng `[2, 3, 4]`."
      }
    },
    {
      id: "js_q_9_7",
      type: "single_choice",
      question: {
        en: "How can you create a pre-filled array of 5 zeros without a loop in modern JavaScript?",
        vi: "Cách nào tạo một mảng gồm 5 số 0 mà không dùng vòng lặp trong JS hiện đại?"
      },
      options: [
        { id: "a", text: { en: "new Array(5).fill(0)", vi: "new Array(5).fill(0)" } },
        { id: "b", text: { en: "Array.zeros(5)", vi: "Array.zeros(5)" } },
        { id: "c", text: { en: "[0 * 5]", vi: "[0 * 5]" } },
        { id: "d", text: { en: "Array.create(0, 5)", vi: "Array.create(0, 5)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`new Array(5).fill(0)` or `Array.from({ length: 5 }, () => 0)` creates and populates the 5-element array.",
        vi: "`new Array(5).fill(0)` hoặc `Array.from({ length: 5 }, () => 0)` khởi tạo và điền 5 phần tử số 0."
      }
    },
    {
      id: "js_q_9_8",
      type: "fill_blank",
      question: {
        en: "To create a shallow copy of an array section without modifying the original, call arr._____().",
        vi: "Để tạo một bản sao nông của một phần mảng mà không làm thay đổi mảng gốc, bạn gọi arr._____()."
      },
      correctAnswer: "slice",
      explanation: {
        en: "`arr.slice()` extracts a portion of an array and returns it as a new array.",
        vi: "`arr.slice()` trích xuất một phần của mảng và trả về dưới dạng mảng mới."
      }
    },
    {
      id: "js_q_9_9",
      type: "predict_output",
      question: {
        en: "What will `console.log(Array.isArray({ length: 2, 0: 'a', 1: 'b' }))` print?",
        vi: "`console.log(Array.isArray({ length: 2, 0: 'a', 1: 'b' }))` sẽ in ra gì?"
      },
      options: [
        { id: "a", text: { en: "false (it is an array-like object, not an actual Array instance)", vi: "false (đây là đối tượng dạng mảng chứ không phải instance của Array)" } },
        { id: "b", text: { en: "true", vi: "true" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Array.isArray` only returns true for genuine Array instances whose internal prototype chain descends from `Array.prototype`.",
        vi: "`Array.isArray` chỉ trả về true cho các instance mảng đích thực có prototype kế thừa từ `Array.prototype`."
      }
    },
    {
      id: "js_q_9_10",
      type: "code_reasoning",
      question: {
        en: "Why is `arr.unshift()` significantly slower than `arr.push()` on large arrays (e.g. 100,000 items)?",
        vi: "Tại sao `arr.unshift()` lại chậm hơn đáng kể so với `arr.push()` trên mảng kích thước lớn (ví dụ 100,000 phần tử)?"
      },
      options: [
        { id: "a", text: { en: "`unshift()` requires re-indexing and shifting all N existing elements in memory to higher slots (O(N)), whereas `push()` appends to the end in O(1)", vi: "`unshift()` phải đánh lại chỉ số và dịch chuyển toàn bộ N phần tử trong bộ nhớ sang ô tiếp theo (O(N)), trong khi `push()` thêm vào cuối là O(1)" } },
        { id: "b", text: { en: "`unshift()` converts the entire array to strings", vi: "`unshift()` chuyển toàn bộ mảng sang chuỗi" } },
        { id: "c", text: { en: "`push()` uses hardware acceleration", vi: "`push()` dùng tăng tốc phần cứng" } },
        { id: "d", text: { en: "`unshift()` is deprecated in V8 engine", vi: "`unshift()` bị coi là lỗi thời trong V8" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Inserting at index 0 shifts every existing element, causing an O(N) memory copy operation.",
        vi: "Chèn vào vị trí index 0 buộc phải dịch chuyển mọi phần tử hiện có, dẫn đến độ phức tạp thời gian O(N)."
      }
    }
  ]
};

// --- LESSON 10 ---
const lesson10: Lesson = {
  id: "js_lesson_10",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_2",
  order: 10,
  title: {
    en: "Objects: Properties, Methods, Computed Keys & Destructuring",
    vi: "Đối Tượng (Objects): Thuộc Tính, Phương Thức, Computed Keys & Destructuring"
  },
  summary: {
    en: "Master object literal enhancements, method shorthand, computed property names, object spread/rest, and advanced object destructuring patterns.",
    vi: "Làm chủ cú pháp object nâng cao, viết tắt phương thức, tên thuộc tính tính toán (computed keys), object spread/rest và kỹ thuật bóc tách (destructuring) chuyên sâu."
  },
  estimatedMinutes: 20,
  topicId: "js_objects_destructuring",
  learn: {
    introduction: {
      en: "Objects are the foundational key-value data structure in JavaScript. ES6 brought dramatic syntax improvements to object authoring: property value shorthands, concise method syntax, dynamically evaluated computed property names `[expr]`, and powerful destructuring assignments with default values and renaming.",
      vi: "Đối tượng (Object) là cấu trúc dữ liệu key-value cốt lõi trong JavaScript. Phiên bản ES6 đã mang lại nhiều cải tiến cú pháp: viết tắt tên thuộc tính, cú pháp khai báo phương thức ngắn gọn, tên thuộc tính động (computed property names `[expr]`) và cú pháp bóc tách (destructuring) đối tượng với giá trị mặc định và đổi tên biến."
    },
    conceptExplanation: {
      en: "1. Object Literal Shorthands: `{ name, age }` instead of `{ name: name, age: age }`, and `greet() {}` instead of `greet: function() {}`.\n\n2. Computed Property Names: Use square brackets `[dynamicKey]: value` inside object literals to evaluate runtime variables or expressions as property names.\n\n3. Object Spread & Rest (`...`): Shallow copy or merge objects with `{ ...defaults, ...overrides }`. Gather unextracted properties using rest syntax `{ id, ...meta }`.\n\n4. Advanced Object Destructuring: Unpack nested properties, provide fallback defaults, and rename keys: `const { user: { email: userEmail = 'default@mail.com' } } = response;`.",
      vi: "1. Viết Tắt Object Literal: `{ name, age }` thay cho `{ name: name, age: age }`, và `greet() {}` thay cho `greet: function() {}`.\n\n2. Tên Thuộc Tính Động (Computed Property Names): Dùng dấu ngoặc vuông `[dynamicKey]: value` bên trong object literal để lấy giá trị của biến hoặc biểu thức làm tên key lúc runtime.\n\n3. Object Spread & Rest (`...`): Sao chép nông hoặc gộp đối tượng với `{ ...defaults, ...overrides }`. Gom các thuộc tính còn lại bằng cú pháp rest `{ id, ...meta }`.\n\n4. Kỹ Thuật Bóc Tách (Destructuring) Nâng Cao: Trích xuất thuộc tính lồng nhau, đặt giá trị mặc định dự phòng và đổi tên biến: `const { user: { email: userEmail = 'default@mail.com' } } = response;`."
    },
    syntax: `// 1. Computed property keys & method shorthand
const dynamicField = "apiKey";
const service = {
  name: "AuthService",
  [dynamicField]: "secret_token_123",
  connect() {
    return \`Connecting \${this.name}...\`;
  }
};

// 2. Object spread & merging (rightmost overrides leftmost)
const baseConfig = { port: 3000, debug: false, env: "dev" };
const prodConfig = { ...baseConfig, debug: true, env: "prod" };

// 3. Destructuring with renaming, defaults, and rest
const payload = { id: "USR-1", profile: { username: "alex" } };
const {
  id: userId,
  profile: { username, role = "Guest" },
  ...extra
} = payload;`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Immutable Redux-Style State Dispatcher",
          vi: "Bộ Cập Nhật Trạng Thái Phong Cách Redux Bất Biến"
        },
        description: {
          en: "Demonstrates merging configs and stripping sensitive fields with rest/spread destructuring.",
          vi: "Minh họa gộp cấu hình và loại bỏ các trường nhạy cảm bằng cú pháp destructuring rest/spread."
        },
        code: `function sanitizeUserResponse(rawDbRecord) {
  // Strip out sensitive password and hash fields using rest destructuring
  const { password, saltHash, internalFlags, ...safeUser } = rawDbRecord;

  return {
    ...safeUser,
    sanitizedAt: new Date().toISOString(),
    displayName: \`\${safeUser.firstName} \${safeUser.lastName}\`
  };
}

const dbRecord = {
  id: 42,
  firstName: "Elena",
  lastName: "Rostova",
  password: "super_secret_hash",
  saltHash: "abc99",
  internalFlags: { isBanned: false }
};

console.log(sanitizeUserResponse(dbRecord));`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Destructuring properties from undefined or null without a default object fallback.",
          vi: "Bóc tách thuộc tính từ undefined hoặc null mà không có giá trị đối tượng mặc định dự phòng."
        },
        correction: {
          en: "Default the outer object: `const { name } = options || {};` or `function fn({ name = '' } = {})`.",
          vi: "Đặt mặc định cho object ngoài: `const { name } = options || {};` hoặc `function fn({ name = '' } = {})`."
        },
        explanation: {
          en: "Destructuring `null` or `undefined` throws an immediate `TypeError: Cannot destructure property of undefined`.",
          vi: "Bóc tách từ `null` hoặc `undefined` sẽ gây lỗi sập chương trình ngay lập tức: `TypeError: Cannot destructure property of undefined`."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use named parameter destructuring for functions with >2 arguments",
          vi: "Dùng tham số đối tượng destructuring cho các hàm nhận trên 2 đối số"
        },
        description: {
          en: "Instead of positional arguments `createButton(label, color, size, onClick, disabled)`, use `createButton({ label, color = 'blue', size = 'md', onClick, disabled = false } = {})`.",
          vi: "Thay vì dùng nhiều đối số theo thứ tự dễ nhầm lẫn, hãy dùng destructuring đối tượng để gọi hàm tường minh và hỗ trợ tham số tùy chọn."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_10_1",
      title: {
        en: "Clean Payload Sanitizer with Rest Destructuring",
        vi: "Bộ Lọc Dữ Liệu An Toàn Bằng Rest Destructuring"
      },
      instruction: {
        en: "Write a function `sanitizePayload(payload, keysToRemove)` that takes an object and an array of property names, and returns a new object containing all properties except the specified ones, without modifying the input object.",
        vi: "Viết hàm `sanitizePayload(payload, keysToRemove)` nhận một object và mảng tên các thuộc tính cần loại bỏ, trả về object mới chứa toàn bộ các trường ngoại trừ các trường bị cấm mà không sửa đổi object đầu vào."
      },
      starterCode: `function sanitizePayload(payload, keysToRemove) {
  // Return sanitized object
}

const input = { a: 1, b: 2, c: 3, secret: "xyz", token: "123" };
console.log(sanitizePayload(input, ["secret", "token"])); // { a: 1, b: 2, c: 3 }`,
      solutionCode: `function sanitizePayload(payload, keysToRemove) {
  const result = {};
  const removeSet = new Set(keysToRemove);
  for (const key of Object.keys(payload)) {
    if (!removeSet.has(key)) {
      result[key] = payload[key];
    }
  }
  return result;
}`,
      hints: [
        {
          en: "Iterate Object.keys(payload) and copy keys that are not in keysToRemove into a fresh object.",
          vi: "Duyệt Object.keys(payload) và sao chép các key không nằm trong keysToRemove sang đối tượng mới."
        }
      ]
    },
    {
      id: "js_ex_10_2",
      title: {
        en: "Dynamic Dictionary Builder with Computed Keys",
        vi: "Tạo Bảng Tra Cứu Động Bằng Computed Property Names"
      },
      instruction: {
        en: "Write a function `createLookupTable(items, keyField)` that transforms an array of objects into a single lookup dictionary keyed by each item's `[keyField]` property.",
        vi: "Viết hàm `createLookupTable(items, keyField)` chuyển đổi một mảng đối tượng thành một từ điển tra cứu có key là giá trị của thuộc tính `[keyField]` của từng phần tử."
      },
      starterCode: `function createLookupTable(items, keyField) {
  // Build lookup dictionary
}

const users = [
  { id: "u_1", name: "Alice" },
  { id: "u_2", name: "Bob" }
];
console.log(createLookupTable(users, "id"));
// { u_1: { id: "u_1", name: "Alice" }, u_2: { id: "u_2", name: "Bob" } }`,
      solutionCode: `function createLookupTable(items, keyField) {
  return items.reduce((table, item) => {
    const key = item[keyField];
    if (key !== undefined) {
      table[key] = item;
    }
    return table;
  }, {});
}`,
      hints: [
        {
          en: "Use reduce() with an initial empty object `{}` and assign `table[item[keyField]] = item`.",
          vi: "Dùng reduce() với giá trị khởi tạo `{}` và gán `table[item[keyField]] = item`."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_10",
    title: {
      en: "Deep Object Property Flattener & Unflattener",
      vi: "Engine Làm Phẳng & Tái Cấu Trúc Đối Tượng Lồng Nhau"
    },
    description: {
      en: "Create an object utility with two methods: `flatten(obj)` which converts nested objects into dot-notated flat keys (e.g. `{ a: { b: 1 } }` -> `{ 'a.b': 1 }`), and `unflatten(flatObj)` which reconstructs the original nested object hierarchy from dot-notated keys.",
      vi: "Tạo một tiện ích đối tượng gồm hai phương thức: `flatten(obj)` chuyển đổi đối tượng lồng nhau thành các key phẳng phân cách bằng dấu chấm (ví dụ `{ a: { b: 1 } }` -> `{ 'a.b': 1 }`), và `unflatten(flatObj)` tái tạo lại cấu trúc đối tượng lồng nhau ban đầu."
    },
    starterCode: `const ObjectTransformer = {
  flatten(obj) {
    // Implement flattener
  },
  unflatten(flatObj) {
    // Implement unflattener
  }
};

const nested = { user: { profile: { name: "Alex" }, age: 30 } };
const flat = ObjectTransformer.flatten(nested);
console.log(flat); // { 'user.profile.name': 'Alex', 'user.age': 30 }
console.log(ObjectTransformer.unflatten(flat)); // Matches nested`,
    solutionCode: `const ObjectTransformer = {
  flatten(obj, prefix = '') {
    const result = {};
    for (const key of Object.keys(obj || {})) {
      const fullPath = prefix ? \`\${prefix}.\${key}\` : key;
      const val = obj[key];
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        Object.assign(result, this.flatten(val, fullPath));
      } else {
        result[fullPath] = val;
      }
    }
    return result;
  },
  unflatten(flatObj) {
    const root = {};
    for (const pathKey of Object.keys(flatObj || {})) {
      const keys = pathKey.split('.');
      let current = root;
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
          current[k] = flatObj[pathKey];
        } else {
          current[k] = current[k] || {};
          current = current[k];
        }
      }
    }
    return root;
  }
};`,
    hints: [
      {
        en: "For flatten: recursively join prefixes with dots. For unflatten: split keys by '.' and navigate/create child objects.",
        vi: "Với flatten: nối tiền tố bằng dấu chấm đệ quy. Với unflatten: tách key theo dấu '.' và điều hướng tạo các object con."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_10_1",
      type: "single_choice",
      question: {
        en: "What is the syntax for a Computed Property Name in an object literal?",
        vi: "Cú pháp cho Tên Thuộc Tính Động (Computed Property Name) trong object literal là gì?"
      },
      options: [
        { id: "a", text: { en: "{ [expression]: value }", vi: "{ [expression]: value }" } },
        { id: "b", text: { en: "{ (expression): value }", vi: "{ (expression): value }" } },
        { id: "c", text: { en: "{ ${expression}: value }", vi: "{ ${expression}: value }" } },
        { id: "d", text: { en: "{ @expression: value }", vi: "{ @expression: value }" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Square brackets `[expr]` inside an object literal evaluate the enclosed expression dynamically as the property key.",
        vi: "Dấu ngoặc vuông `[expr]` bên trong object literal đánh giá biểu thức bên trong để làm key của thuộc tính lúc chạy."
      }
    },
    {
      id: "js_q_10_2",
      type: "predict_output",
      question: {
        en: "What will `console.log` output?\n```js\nconst key = 'role';\nconst user = { name: 'Alex', [key]: 'Admin' };\nconsole.log(user.role);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nconst key = 'role';\nconst user = { name: 'Alex', [key]: 'Admin' };\nconsole.log(user.role);\n```"
      },
      options: [
        { id: "a", text: { en: "'Admin'", vi: "'Admin'" } },
        { id: "b", text: { en: "undefined", vi: "undefined" } },
        { id: "c", text: { en: "'role'", vi: "'role'" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`[key]` evaluates the variable `key` (which is `'role'`), creating property `role: 'Admin'`.",
        vi: "`[key]` đánh giá biến `key` (có giá trị `'role'`), tạo ra thuộc tính `role: 'Admin'`."
      }
    },
    {
      id: "js_q_10_3",
      type: "predict_output",
      question: {
        en: "What will `console.log` print?\n```js\nconst a = { x: 1, y: 2 };\nconst b = { y: 10, z: 20 };\nconst c = { ...a, ...b };\nconsole.log(c.y);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nconst a = { x: 1, y: 2 };\nconst b = { y: 10, z: 20 };\nconst c = { ...a, ...b };\nconsole.log(c.y);\n```"
      },
      options: [
        { id: "a", text: { en: "10", vi: "10" } },
        { id: "b", text: { en: "2", vi: "2" } },
        { id: "c", text: { en: "[2, 10]", vi: "[2, 10]" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "When spreading multiple objects, rightmost objects overwrite matching keys from earlier objects, so `b.y` overrides `a.y`.",
        vi: "Khi spread nhiều object, object xuất hiện sau cùng sẽ ghi đè các key trùng nhau của object trước, nên `b.y` ghi đè `a.y`."
      }
    },
    {
      id: "js_q_10_4",
      type: "single_choice",
      question: {
        en: "How do you rename a variable during object destructuring?",
        vi: "Cách đổi tên biến khi bóc tách (destructuring) thuộc tính đối tượng là gì?"
      },
      options: [
        { id: "a", text: { en: "const { originalKey: newVarName } = obj;", vi: "const { originalKey: newVarName } = obj;" } },
        { id: "b", text: { en: "const { originalKey as newVarName } = obj;", vi: "const { originalKey as newVarName } = obj;" } },
        { id: "c", text: { en: "const { originalKey -> newVarName } = obj;", vi: "const { originalKey -> newVarName } = obj;" } },
        { id: "d", text: { en: "const { originalKey = newVarName } = obj;", vi: "const { originalKey = newVarName } = obj;" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`const { key: alias } = obj;` maps the value of property `key` to a new local constant named `alias`.",
        vi: "`const { key: alias } = obj;` gán giá trị của thuộc tính `key` cho một biến cục bộ mới có tên `alias`."
      }
    },
    {
      id: "js_q_10_5",
      type: "predict_output",
      question: {
        en: "What will `console.log` print?\n```js\nconst user = { name: 'Elena' };\nconst { name, role = 'Standard' } = user;\nconsole.log(role);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nconst user = { name: 'Elena' };\nconst { name, role = 'Standard' } = user;\nconsole.log(role);\n```"
      },
      options: [
        { id: "a", text: { en: "'Standard'", vi: "'Standard'" } },
        { id: "b", text: { en: "undefined", vi: "undefined" } },
        { id: "c", text: { en: "null", vi: "null" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Because `user.role` is `undefined`, the default fallback value `'Standard'` is assigned.",
        vi: "Vì `user.role` là `undefined`, giá trị mặc định dự phòng `'Standard'` sẽ được gán cho biến."
      }
    },
    {
      id: "js_q_10_6",
      type: "single_choice",
      question: {
        en: "What happens when attempting to destructure from `null` or `undefined` (e.g. `const { a } = null;`)?",
        vi: "Điều gì xảy ra khi cố gắng bóc tách thuộc tính từ `null` hoặc `undefined` (ví dụ `const { a } = null;`)?"
      },
      options: [
        { id: "a", text: { en: "Throws a TypeError: Cannot destructure property of null/undefined", vi: "Ném lỗi TypeError: Cannot destructure property of null/undefined" } },
        { id: "b", text: { en: "Assigns `a = undefined` silently", vi: "Tự động gán `a = undefined` trong im lặng" } },
        { id: "c", text: { en: "Assigns `a = null`", vi: "Gán `a = null`" } },
        { id: "d", text: { en: "Creates an empty object", vi: "Tạo một đối tượng rỗng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Destructuring expects an object. Attempting to unpack `null` or `undefined` triggers a fatal TypeError.",
        vi: "Cú pháp destructuring yêu cầu một đối tượng. Cố bóc tách từ `null` hay `undefined` sẽ gây lỗi TypeError."
      }
    },
    {
      id: "js_q_10_7",
      type: "fill_blank",
      question: {
        en: "To collect remaining unmatched object properties during destructuring, use the _____ operator with variable name (e.g. `const { id, ...rest } = obj`).",
        vi: "Để thu gom các thuộc tính còn lại chưa được bóc tách trong object, sử dụng toán tử _____ đi kèm tên biến (ví dụ `const { id, ...rest } = obj`)."
      },
      correctAnswer: "rest",
      explanation: {
        en: "The rest operator `...` in object destructuring gathers unextracted keys into a new object.",
        vi: "Toán tử rest `...` trong destructuring gom các trường chưa bóc tách vào một object mới."
      }
    },
    {
      id: "js_q_10_8",
      type: "single_choice",
      question: {
        en: "What is the ES6 Property Value Shorthand?",
        vi: "Quy tắc viết tắt giá trị thuộc tính (Property Value Shorthand) trong ES6 là gì?"
      },
      options: [
        { id: "a", text: { en: "When the property name matches the variable name, you can write `{ x }` instead of `{ x: x }`", vi: "Khi tên thuộc tính trùng với tên biến, bạn có thể viết `{ x }` thay vì `{ x: x }`" } },
        { id: "b", text: { en: "Properties are automatically compressed to 1 byte", vi: "Các thuộc tính tự động được nén lại thành 1 byte" } },
        { id: "c", text: { en: "Properties starting with _ are automatically private", vi: "Thuộc tính bắt đầu bằng _ tự động trở thành private" } },
        { id: "d", text: { en: "All functions must return objects", vi: "Mọi hàm đều phải trả về object" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "ES6 allows `{ x, y }` as shorthand for `{ x: x, y: y }`.",
        vi: "ES6 cho phép viết ngắn gọn `{ x, y }` thay cho `{ x: x, y: y }` khi tên key trùng tên biến."
      }
    },
    {
      id: "js_q_10_9",
      type: "predict_output",
      question: {
        en: "What will `console.log` output?\n```js\nconst { a, ...b } = { a: 1, x: 10, y: 20 };\nconsole.log(b);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nconst { a, ...b } = { a: 1, x: 10, y: 20 };\nconsole.log(b);\n```"
      },
      options: [
        { id: "a", text: { en: "{ x: 10, y: 20 }", vi: "{ x: 10, y: 20 }" } },
        { id: "b", text: { en: "{ a: 1, x: 10, y: 20 }", vi: "{ a: 1, x: 10, y: 20 }" } },
        { id: "c", text: { en: "[10, 20]", vi: "[10, 20]" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`a` extracts `1`, and `b` gathers the remaining properties `{ x: 10, y: 20 }` into a new object.",
        vi: "`a` lấy giá trị `1`, và biến rest `b` gom toàn bộ các trường còn lại `{ x: 10, y: 20 }` thành một object mới."
      }
    },
    {
      id: "js_q_10_10",
      type: "code_reasoning",
      question: {
        en: "Why is `{ ...defaults, ...options }` considered a shallow merge rather than a deep merge?",
        vi: "Tại sao `{ ...defaults, ...options }` được coi là phép gộp nông (shallow merge) chứ không phải gộp sâu (deep merge)?"
      },
      options: [
        { id: "a", text: { en: "Nested objects in `options` completely replace nested objects in `defaults` instead of recursively merging their internal properties", vi: "Các object con lồng nhau trong `options` sẽ thay thế hoàn toàn object con trong `defaults` thay vì đệ quy gộp từng thuộc tính bên trong" } },
        { id: "b", text: { en: "Spread operator can only handle numbers", vi: "Toán tử spread chỉ hoạt động với số" } },
        { id: "c", text: { en: "It only works on arrays", vi: "Nó chỉ chạy được trên mảng" } },
        { id: "d", text: { en: "Because it requires async execution", vi: "Vì nó yêu cầu thực thi bất đồng bộ" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Spread only copies top-level properties. If both objects contain `theme: { dark: true }` and `theme: { fontSize: 14 }`, the second `theme` replaces the first completely.",
        vi: "Toán tử spread chỉ sao chép thuộc tính ở cấp 1. Nếu cả 2 cùng chứa object con `theme`, object `theme` phía sau sẽ ghi đè đứt đoạn object `theme` phía trước."
      }
    }
  ]
};

// Write Lessons 09 and 10
fs.writeFileSync(path.join(dir, 'lesson09.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson09: Lesson = ${JSON.stringify(lesson09, null, 2)};\nexport default lesson09;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson10.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson10: Lesson = ${JSON.stringify(lesson10, null, 2)};\nexport default lesson10;\n`, 'utf8');
console.log('Lessons 09 and 10 generated.');
