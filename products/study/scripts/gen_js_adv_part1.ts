import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/advanced/module01');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 21 ---
const lesson21: Lesson = {
  id: "js_lesson_21",
  courseId: "javascript",
  levelId: "advanced",
  moduleId: "js_mod_5",
  order: 21,
  title: {
    en: "Iterators, Iterables, Generators & Async Iteration",
    vi: "Iterators, Iterables, Generators & Vòng Lặp Bất Đồng Bộ (Async Iteration)"
  },
  summary: {
    en: "Master the iteration protocols (`[Symbol.iterator]`, `.next()`), generator functions (`function*`, `yield`, `yield*`), stateful lazy streams, and asynchronous iterators (`for await...of`).",
    vi: "Làm chủ các giao thức lặp (`[Symbol.iterator]`, `.next()`), hàm Generator (`function*`, `yield`, `yield*`), luồng dữ liệu lười (lazy stream) và vòng lặp bất đồng bộ (`for await...of`)."
  },
  estimatedMinutes: 24,
  topicId: "js_generators_iterators",
  learn: {
    introduction: {
      en: "The ECMAScript Iteration Protocols establish a standardized, language-wide mechanism for consuming sequence data lazily. Generators (`function*`) elevate this capability by allowing functions to yield control back to the caller while preserving execution state on the heap, enabling custom lazy infinite streams, state machines, and asynchronous pull pipelines with `for await...of`.",
      vi: "Giao Thức Lặp (Iteration Protocols) của ECMAScript thiết lập chuẩn mực chung cho việc duyệt và xử lý chuỗi dữ liệu lười (lazy evaluation). Hàm Generator (`function*`) đưa khả năng này lên tầm cao mới bằng việc cho phép hàm tạm dừng và nhường quyền điều khiển cho bên ngoài qua `yield` trong khi vẫn bảo toàn trạng thái thực thi trong bộ nhớ Heap, mở ra khả năng tạo luồng vô hạn, máy trạng thái (state machine) và đường ống xử lý bất đồng bộ với `for await...of`."
    },
    conceptExplanation: {
      en: "1. The Iterable Protocol: An object is iterable if it defines a method at `[Symbol.iterator]()` that returns an Iterator object.\n\n2. The Iterator Protocol: An object with a `.next()` method returning `{ value: any, done: boolean }`.\n\n3. Generator Functions (`function*`): Calling a generator does NOT execute its body immediately; it returns a Generator Iterator object. When `.next(value)` is called, the generator resumes until it hits `yield expr`, which returns `expr` as `value` and pauses.\n\n4. `yield*` Delegation: Delegates iteration to another iterable or nested generator.\n\n5. Async Iterators & `for await...of`: Objects implementing `[Symbol.asyncIterator]()` return Promises of `{ value, done }`, enabling streaming pagination and socket consuming.",
      vi: "1. Giao Thức Iterable: Một đối tượng là iterable nếu nó định nghĩa phương thức tại `[Symbol.iterator]()` trả về một Iterator.\n\n2. Giao Thức Iterator: Một đối tượng có phương thức `.next()` trả về `{ value: any, done: boolean }`.\n\n3. Hàm Generator (`function*`): Gọi generator KHÔNG chạy code ngay mà trả về đối tượng Generator Iterator. Khi gọi `.next(value)`, hàm chạy tiếp cho đến khi gặp `yield expr`, trả về `expr` và tạm dừng.\n\n4. Ủy Quyền `yield*`: Ủy quyền duyệt cho một iterable khác hoặc generator con lồng nhau.\n\n5. Async Iterator & `for await...of`: Đối tượng cài đặt `[Symbol.asyncIterator]()` trả về Promise của `{ value, done }`, cho phép duyệt luồng phân trang mạng hoặc đọc socket liên tục."
    },
    syntax: `// 1. Custom Iterable Object with [Symbol.iterator]
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};
console.log([...range]); // [1, 2, 3]

// 2. Infinite Lazy Generator Stream
function* idGenerator(prefix = "ID") {
  let count = 1;
  while (true) {
    yield \`\${prefix}_\${count++}\`;
  }
}
const gen = idGenerator("USR");
console.log(gen.next().value); // "USR_1"
console.log(gen.next().value); // "USR_2"`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Async Paginated API Stream Consumer with for await...of",
          vi: "Đọc Luồng Phân Trang Bất Đồng Bộ Với for await...of"
        },
        description: {
          en: "Demonstrates an async generator yielding pages of API records one-by-one until the dataset is exhausted.",
          vi: "Minh họa generator bất đồng bộ tải từng trang dữ liệu từ API cho đến khi hết bản ghi."
        },
        code: `async function* fetchPaginatedRecords(endpoint, pageSize = 20) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(\`\${endpoint}?page=\${page}&limit=\${pageSize}\`);
    const data = await res.json();

    for (const record of data.items) {
      yield record;
    }

    hasMore = data.hasMore;
    page++;
  }
}

// Consuming with for await...of
async function processStream() {
  for await (const record of fetchPaginatedRecords("/api/orders")) {
    console.log("Processing order:", record.id);
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using standard `for...of` instead of `for await...of` on an async iterable.",
          vi: "Dùng `for...of` thông thường thay vì `for await...of` trên một async iterable."
        },
        correction: {
          en: "Use `for await (const item of asyncIterable)`.",
          vi: "Sử dụng `for await (const item of asyncIterable)`."
        },
        explanation: {
          en: "Standard `for...of` does not await the Promises returned by async iterators, resulting in a TypeError (Symbol.iterator is not defined).",
          vi: "Vòng lặp `for...of` thường không thể tự động await các Promise của async iterator, gây ra lỗi TypeError."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use generators for lazy data pipelines to reduce memory footprint",
          vi: "Dùng generator để xử lý dữ liệu lười nhằm tối ưu bộ nhớ RAM"
        },
        description: {
          en: "Instead of allocating an array of 1,000,000 transformed records in RAM, yield elements one-by-one as required by consumers.",
          vi: "Thay vì tạo mảng chứa 1,000,000 bản ghi trong RAM, dùng generator để sinh từng phần tử khi cần giúp tiết kiệm bộ nhớ."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_21_1",
      title: {
        en: "Fibonacci Lazy Infinite Sequence Generator",
        vi: "Tạo Dãy Số Fibonacci Vô Hạn Bằng Generator Lười"
      },
      instruction: {
        en: "Write a generator function `fibonacci()` that yields the Fibonacci sequence infinitely (0, 1, 1, 2, 3, 5, 8...). Write a helper `take(iterable, count)` that collects the first `count` elements into an array.",
        vi: "Viết hàm generator `fibonacci()` sinh dãy số Fibonacci vô hạn (0, 1, 1, 2, 3, 5, 8...). Viết hàm tiện ích `take(iterable, count)` lấy `count` phần tử đầu tiên thành một mảng."
      },
      starterCode: `function* fibonacci() {
  // Implement fibonacci generator
}

function take(iterable, count) {
  // Collect first count elements
}

console.log(take(fibonacci(), 7)); // [0, 1, 1, 2, 3, 5, 8]`,
      solutionCode: `function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield prev;
    [prev, curr] = [curr, prev + curr];
  }
}

function take(iterable, count) {
  const result = [];
  let i = 0;
  for (const item of iterable) {
    if (i >= count) break;
    result.push(item);
    i++;
  }
  return result;
}`,
      hints: [
        {
          en: "In fibonacci: yield prev, then update [prev, curr] = [curr, prev + curr]. In take: use for...of with a counter.",
          vi: "Trong fibonacci: yield prev, rồi cập nhật [prev, curr] = [curr, prev + curr]. Trong take: dùng for...of với biến đếm."
        }
      ]
    },
    {
      id: "js_ex_21_2",
      title: {
        en: "Tree Depth-First Traversal Generator",
        vi: "Duyệt Cây Theo Chiều Sâu (DFS) Bằng Generator & yield*"
      },
      instruction: {
        en: "Write a generator function `traverseTree(node)` that yields each node's `value` in a nested tree structure `{ value, children: [] }` in depth-first preorder using `yield*` delegation.",
        vi: "Viết hàm generator `traverseTree(node)` sinh giá trị `value` của từng node trong cây lồng nhau `{ value, children: [] }` theo thứ tự duyệt tiền thứ tự DFS bằng cú pháp `yield*`."
      },
      starterCode: `function* traverseTree(node) {
  // Traverse tree using yield*
}

const tree = {
  value: "root",
  children: [
    { value: "child1", children: [{ value: "leaf1", children: [] }] },
    { value: "child2", children: [] }
  ]
};
console.log([...traverseTree(tree)]); // ['root', 'child1', 'leaf1', 'child2']`,
      solutionCode: `function* traverseTree(node) {
  if (!node) return;
  yield node.value;
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      yield* traverseTree(child);
    }
  }
}`,
      hints: [
        {
          en: "Yield node.value, then loop through node.children calling `yield* traverseTree(child)`.",
          vi: "Yield node.value, sau đó lặp qua node.children gọi `yield* traverseTree(child)`."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_21",
    title: {
      en: "Async Pipeline Operator Combinator Engine",
      vi: "Engine Ghép Nối Đường Ống Dữ Liệu Bất Đồng Bộ (Async Generator Pipe)"
    },
    description: {
      en: "Build an async pipeline helper `asyncPipe(sourceAsyncIterable, ...transformGenerators)` that chains multiple async generator transformations (like map, filter, take) together seamlessly without buffering intermediate items in memory.",
      vi: "Xây dựng tiện ích `asyncPipe(sourceAsyncIterable, ...transformGenerators)` kết hợp nhiều hàm biến đổi async generator (như map, filter, take) với nhau mượt mà mà không cần lưu tạm dữ liệu vào bộ nhớ đệm."
    },
    starterCode: `function asyncPipe(source, ...transforms) {
  // Chain async generators
}`,
    solutionCode: `function asyncPipe(source, ...transforms) {
  return transforms.reduce((currentStream, transform) => {
    return transform(currentStream);
  }, source);
}`,
    hints: [
      {
        en: "Use Array.prototype.reduce passing the current async iterable into each transform generator function.",
        vi: "Dùng Array.prototype.reduce truyền luồng async iterable hiện tại qua từng hàm biến đổi transform generator."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_21_1",
      type: "single_choice",
      question: {
        en: "What well-known Symbol must an object implement to be consumable by `for...of` loops and spread syntax `[...obj]`?",
        vi: "Đối tượng phải cài đặt Well-known Symbol nào để có thể duyệt qua bằng vòng lặp `for...of` và cú pháp spread `[...obj]`?"
      },
      options: [
        { id: "a", text: { en: "Symbol.iterator", vi: "Symbol.iterator" } },
        { id: "b", text: { en: "Symbol.iterable", vi: "Symbol.iterable" } },
        { id: "c", text: { en: "Symbol.loop", vi: "Symbol.loop" } },
        { id: "d", text: { en: "Symbol.for", vi: "Symbol.for" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`[Symbol.iterator]` is the standard ECMAScript method that returns an iterator for an object.",
        vi: "`[Symbol.iterator]` là phương thức chuẩn của ECMAScript trả về iterator của đối tượng."
      }
    },
    {
      id: "js_q_21_2",
      type: "predict_output",
      question: {
        en: "What is returned when you invoke a generator function like `function* gen() { yield 1; }` directly via `const g = gen()`?",
        vi: "Giá trị nhận được khi gọi trực tiếp một hàm generator `const g = gen()` là gì?"
      },
      options: [
        { id: "a", text: { en: "A Generator object (conforming to both Iterable and Iterator protocols), without running the function body yet", vi: "Một đối tượng Generator (tuân theo cả hai giao thức Iterable và Iterator), mà chưa chạy mã trong thân hàm" } },
        { id: "b", text: { en: "1 (the first yielded value)", vi: "1 (giá trị yield đầu tiên)" } },
        { id: "c", text: { en: "A Promise resolving to 1", vi: "Một Promise resolve giá trị 1" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Calling a generator function returns a suspended Generator object; execution only starts upon calling `.next()`.",
        vi: "Gọi hàm generator trả về một đối tượng Generator đang tạm dừng; code chỉ bắt đầu chạy khi gọi `.next()`."
      }
    },
    {
      id: "js_q_21_3",
      type: "single_choice",
      question: {
        en: "What does the `yield*` operator do inside a generator?",
        vi: "Toán tử `yield*` có tác dụng gì bên trong một generator?"
      },
      options: [
        { id: "a", text: { en: "Delegates iteration to another iterable or nested generator, yielding all its elements sequentially", vi: "Ủy quyền duyệt cho một iterable khác hoặc generator con lồng nhau, sinh tuần tự toàn bộ phần tử của nó" } },
        { id: "b", text: { en: "Multiplies the yielded value by itself", vi: "Nhân đôi giá trị yield với chính nó" } },
        { id: "c", text: { en: "Terminates the generator immediately", vi: "Dừng generator ngay lập tức" } },
        { id: "d", text: { en: "Converts the generator into a Web Worker", vi: "Chuyển generator thành Web Worker" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`yield* iterable` yields every value from the target iterable before resuming current generator execution.",
        vi: "`yield* iterable` sinh lần lượt tất cả giá trị từ iterable mục tiêu trước khi chạy tiếp generator hiện tại."
      }
    },
    {
      id: "js_q_21_4",
      type: "predict_output",
      question: {
        en: "What is the return structure of every call to `iterator.next()`?",
        vi: "Cấu trúc dữ liệu trả về của mỗi lần gọi `iterator.next()` là gì?"
      },
      options: [
        { id: "a", text: { en: "{ value: any, done: boolean }", vi: "{ value: any, done: boolean }" } },
        { id: "b", text: { en: "[value, done]", vi: "[value, done]" } },
        { id: "c", text: { en: "value only", vi: "Chỉ trả về value" } },
        { id: "d", text: { en: "Promise<value>", vi: "Promise<value>" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The Iterator Protocol mandates an object with `value` (current item) and `done` (boolean flag).",
        vi: "Giao thức Iterator quy định đối tượng trả về phải có trường `value` (giá trị hiện tại) và `done` (cờ boolean hoàn thành)."
      }
    },
    {
      id: "js_q_21_5",
      type: "single_choice",
      question: {
        en: "Which loop syntax is used to consume asynchronous iterables (`[Symbol.asyncIterator]`)?",
        vi: "Cú pháp vòng lặp nào được sử dụng để duyệt các đối tượng async iterable (`[Symbol.asyncIterator]`)?"
      },
      options: [
        { id: "a", text: { en: "for await (const item of asyncIterable)", vi: "for await (const item of asyncIterable)" } },
        { id: "b", text: { en: "async for (const item in asyncIterable)", vi: "async for (const item in asyncIterable)" } },
        { id: "c", text: { en: "for (const await item of asyncIterable)", vi: "for (const await item of asyncIterable)" } },
        { id: "d", text: { en: "while (await asyncIterable.hasNext())", vi: "while (await asyncIterable.hasNext())" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`for await...of` asynchronously waits for each Promise yielded by an async iterator.",
        vi: "`for await...of` tự động await từng Promise do async iterator trả về."
      }
    },
    {
      id: "js_q_21_6",
      type: "predict_output",
      question: {
        en: "What will `console.log` output?\n```js\nfunction* demo() {\n  const x = yield 10;\n  yield x * 2;\n}\nconst g = demo();\nconsole.log(g.next().value);\nconsole.log(g.next(5).value);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nfunction* demo() {\n  const x = yield 10;\n  yield x * 2;\n}\nconst g = demo();\nconsole.log(g.next().value);\nconsole.log(g.next(5).value);\n```"
      },
      options: [
        { id: "a", text: { en: "10, then 10", vi: "10, sau đó 10" } },
        { id: "b", text: { en: "10, then 20", vi: "10, sau đó 20" } },
        { id: "c", text: { en: "10, then NaN", vi: "10, sau đó NaN" } },
        { id: "d", text: { en: "5, then 10", vi: "5, sau đó 10" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "First `.next()` yields 10 and pauses at `yield 10`. Second `.next(5)` resumes and sends `5` as the result of the `yield` expression, so `x = 5` and `x * 2 = 10`.",
        vi: "Lần gọi `.next()` đầu tiên yield 10 và tạm dừng. Lần gọi `.next(5)` thứ hai truyền `5` làm giá trị trả về của biểu thức yield, nên `x = 5` và `x * 2 = 10`."
      }
    },
    {
      id: "js_q_21_7",
      type: "fill_blank",
      question: {
        en: "To declare a Generator function in JavaScript, append an asterisk after the function keyword: _____ * myGen() { ... }.",
        vi: "Để khai báo một hàm Generator trong JavaScript, thêm dấu sao sau từ khóa function: _____ * myGen() { ... }."
      },
      correctAnswer: "function",
      explanation: {
        en: "`function* name() {}` defines a generator function.",
        vi: "`function* name() {}` định nghĩa một hàm generator."
      }
    },
    {
      id: "js_q_21_8",
      type: "single_choice",
      question: {
        en: "What happens when you call `generator.return(value)` on an active generator?",
        vi: "Điều gì xảy ra khi bạn gọi `generator.return(value)` trên một generator đang hoạt động?"
      },
      options: [
        { id: "a", text: { en: "It forces the generator to immediately terminate and return `{ value, done: true }`", vi: "Nó ép generator dừng thực thi ngay lập tức và trả về `{ value, done: true }`" } },
        { id: "b", text: { en: "It restarts the generator from the beginning", vi: "Nó khởi động lại generator từ đầu" } },
        { id: "c", text: { en: "It throws an uncatchable exception", vi: "Nó ném ngoại lệ không thể bắt được" } },
        { id: "d", text: { en: "It pauses for 1000ms", vi: "Nó tạm dừng trong 1000ms" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.return()` immediately closes the iterator and triggers any enclosing `finally` blocks in the generator.",
        vi: "`.return()` đóng iterator ngay lập tức và kích hoạt các khối `finally` bên trong generator."
      }
    },
    {
      id: "js_q_21_9",
      type: "predict_output",
      question: {
        en: "Can a generator yield an infinite number of values without running out of memory?",
        vi: "Một generator có thể yield vô hạn giá trị mà không bị tràn bộ nhớ không?"
      },
      options: [
        { id: "a", text: { en: "Yes, because values are computed on-demand (lazy evaluation) only when `.next()` is explicitly called", vi: "Có, vì các giá trị chỉ được tính toán theo yêu cầu (lazy evaluation) mỗi khi hàm `.next()` được gọi chủ động" } },
        { id: "b", text: { en: "No, all infinite values are pre-allocated in RAM on startup", vi: "Không, toàn bộ giá trị vô hạn bị nạp sẵn vào RAM lúc bắt đầu" } },
        { id: "c", text: { en: "Only if running on a 64-bit OS", vi: "Chỉ khi chạy trên hệ điều hành 64-bit" } },
        { id: "d", text: { en: "No, generators are capped at 10,000 yields", vi: "Không, generator bị giới hạn tối đa 10,000 lần yield" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Generators pull one value at a time on demand, creating infinite sequences with O(1) memory overhead.",
        vi: "Generator chỉ sinh từng giá trị khi có yêu cầu, cho phép tạo chuỗi vô hạn với dung lượng bộ nhớ O(1)."
      }
    },
    {
      id: "js_q_21_10",
      type: "code_reasoning",
      question: {
        en: "Why is `yield*` essential when writing recursive generator functions (like tree traversal)?",
        vi: "Tại sao `yield*` là thiết yếu khi viết các hàm generator đệ quy (như duyệt cây)?"
      },
      options: [
        { id: "a", text: { en: "Without `yield*`, calling the recursive generator simply yields the Generator Iterator object itself rather than the individual unpacked values", vi: "Nếu không có `yield*`, việc gọi đệ quy chỉ yield ra chính đối tượng Generator Iterator con chứ không mở gói từng phần tử bên trong nó" } },
        { id: "b", text: { en: "Recursive generators crash without `yield*`", vi: "Generator đệ quy bị crash nếu thiếu `yield*`" } },
        { id: "c", text: { en: "`yield*` optimizes CPU threading", vi: "`yield*` tối ưu luồng CPU" } },
        { id: "d", text: { en: "`yield*` is required by HTML5 parsers", vi: "`yield*` là yêu cầu của trình phân tích HTML5" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`yield* subGen()` flattens and delegates iteration to the child generator.",
        vi: "`yield* subGen()` làm phẳng và chuyển tiếp toàn bộ luồng yield của generator con ra ngoài."
      }
    }
  ]
};

// --- LESSON 22 ---
const lesson22: Lesson = {
  id: "js_lesson_22",
  courseId: "javascript",
  levelId: "advanced",
  moduleId: "js_mod_5",
  order: 22,
  title: {
    en: "Symbols, Well-Known Symbols & Meta-Programming Hooks",
    vi: "Symbols, Well-Known Symbols & Các Điểm Móc Siêu Lập Trình (Meta-Programming Hooks)"
  },
  summary: {
    en: "Master ES6 Symbol primitives, global registry (`Symbol.for`, `Symbol.keyFor`), well-known symbols (`Symbol.toPrimitive`, `Symbol.toStringTag`, `Symbol.hasInstance`, `Symbol.species`), and private branding.",
    vi: "Làm chủ kiểu dữ liệu nguyên thủy Symbol, registry toàn cục (`Symbol.for`), các well-known symbol tùy biến hành vi ngôn ngữ (`Symbol.toPrimitive`, `Symbol.toStringTag`, `Symbol.hasInstance`) và kỹ thuật private branding."
  },
  estimatedMinutes: 22,
  topicId: "js_symbols_metaprogramming",
  learn: {
    introduction: {
      en: "Symbols are unique, immutable primitive values introduced in ES6 primarily to serve as guaranteed unique object property keys. Beyond preventing property collision in third-party libraries, JavaScript exposes 'Well-Known Symbols'—internal engine extension points that allow developers to customize core language behaviors such as type coercion (`Symbol.toPrimitive`), string tagging (`Symbol.toStringTag`), and instance verification (`Symbol.hasInstance`).",
      vi: "Symbol là kiểu dữ liệu nguyên thủy bất biến và duy nhất được bổ sung trong ES6 để làm key thuộc tính object mà không bao giờ bị trùng lặp. Ngoài việc chống xung đột tên thuộc tính trong các thư viện, JavaScript còn cung cấp các 'Well-Known Symbols'—các điểm móc can thiệp nội bộ cho phép lập trình viên tùy biến sâu hành vi cốt lõi của ngôn ngữ như ép kiểu (`Symbol.toPrimitive`), định dạng chuỗi (`Symbol.toStringTag`) và kiểm tra instance (`Symbol.hasInstance`)."
    },
    conceptExplanation: {
      en: "1. Symbol Uniqueness: Every `Symbol('desc')` creates a globally unique identity. `Symbol('a') !== Symbol('a')`.\n\n2. Global Symbol Registry: `Symbol.for(key)` retrieves or creates a shared symbol across iframes and service workers. `Symbol.keyFor(sym)` retrieves its registry key.\n\n3. Property Visibility: Symbol keys are non-enumerable in `for...in` and `Object.keys()`. They can be accessed via `Object.getOwnPropertySymbols(obj)` or `Reflect.ownKeys(obj)`.\n\n4. Essential Well-Known Symbols:\n   - `Symbol.toPrimitive(hint)`: Customizes how an object converts to 'number', 'string', or 'default'.\n   - `Symbol.toStringTag`: Customizes `Object.prototype.toString.call(obj)` to return `[object CustomTag]`.\n   - `Symbol.hasInstance`: Customizes `obj instanceof Constructor` logic.\n   - `Symbol.species`: Specifies the constructor used to create derived objects in methods like `.map()`.",
      vi: "1. Tính Duy Nhất Của Symbol: Mỗi lần gọi `Symbol('desc')` đều tạo một định danh duy nhất toàn cầu. `Symbol('a') !== Symbol('a')`.\n\n2. Global Symbol Registry: `Symbol.for(key)` tìm hoặc tạo một symbol dùng chung xuyên suốt các iframe và service worker. `Symbol.keyFor(sym)` lấy lại key đăng ký.\n\n3. Tính Ẩn Của Thuộc Tính Symbol: Key symbol không xuất hiện trong `for...in` hay `Object.keys()`. Có thể đọc qua `Object.getOwnPropertySymbols(obj)` hoặc `Reflect.ownKeys(obj)`.\n\n4. Các Well-Known Symbols Thiết Yếu:\n   - `Symbol.toPrimitive(hint)`: Tùy biến cách đối tượng tự ép kiểu sang 'number', 'string', hoặc 'default'.\n   - `Symbol.toStringTag`: Tùy biến kết quả của `Object.prototype.toString.call(obj)` thành `[object CustomTag]`.\n   - `Symbol.hasInstance`: Tùy biến logic kiểm tra của toán tử `obj instanceof Constructor`.\n   - `Symbol.species`: Chỉ định constructor dùng để tạo đối tượng phái sinh trong các hàm như `.map()`."
    },
    syntax: `// 1. Symbol.toPrimitive hook for explicit type coercion
const money = {
  amount: 250,
  currency: "USD",
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.amount;
    if (hint === "string") return \`\${this.amount} \${this.currency}\`;
    return this.amount; // default
  }
};

console.log(+money);        // 250 (hint: 'number')
console.log(\`Total: \${money}\`); // "Total: 250 USD" (hint: 'string')
console.log(money + 50);    // 300 (hint: 'default')

// 2. Custom Symbol.toStringTag
class Vector {
  get [Symbol.toStringTag]() { return "Vector3D"; }
}
console.log(Object.prototype.toString.call(new Vector())); // "[object Vector3D]"`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Custom Instance Validator with Symbol.hasInstance",
          vi: "Tùy Biến Toán Tử instanceof Bằng Symbol.hasInstance"
        },
        description: {
          en: "Demonstrates overriding instanceof behavior to validate structural duck-typing rather than prototype chain inheritance.",
          vi: "Minh họa ghi đè toán tử instanceof để kiểm tra cấu trúc (Duck Typing) thay vì kế thừa prototype chain thông thường."
        },
        code: `class IntegerOnly {
  static [Symbol.hasInstance](instance) {
    return typeof instance === "number" && Number.isInteger(instance);
  }
}

console.log(42 instanceof IntegerOnly);    // true
console.log(3.14 instanceof IntegerOnly);  // false
console.log("42" instanceof IntegerOnly);  // false`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Trying to instantiate a symbol with the `new` keyword (`new Symbol()`).",
          vi: "Cố gắng khởi tạo symbol bằng từ khóa `new` (`new Symbol()`)."
        },
        correction: {
          en: "Call `Symbol(description)` directly as a primitive factory function.",
          vi: "Gọi trực tiếp `Symbol(description)` như một hàm tạo giá trị nguyên thủy."
        },
        explanation: {
          en: "Symbols are primitives, not objects. Invoking `new Symbol()` throws a `TypeError: Symbol is not a constructor`.",
          vi: "Symbol là kiểu dữ liệu nguyên thủy. Gọi `new Symbol()` sẽ ném lỗi `TypeError: Symbol is not a constructor`."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use Symbol.for() when sharing symbols across micro-frontends or iframes",
          vi: "Dùng Symbol.for() khi cần chia sẻ symbol giữa các iframe hoặc micro-frontend"
        },
        description: {
          en: "`Symbol.for('app.state')` accesses the cross-realm global runtime symbol registry, ensuring exact reference equality across separate global window contexts.",
          vi: "`Symbol.for('app.state')` truy cập vào registry toàn cục, đảm bảo tính đồng nhất tham chiếu xuyên suốt các iframe và realm khác nhau."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_22_1",
      title: {
        en: "Implement Temperature with Symbol.toPrimitive",
        vi: "Cài Đặt Đối Tượng Temperature Với Symbol.toPrimitive"
      },
      instruction: {
        en: "Create a class `Temperature(celsius)` that implements `[Symbol.toPrimitive](hint)`. When coerced to 'number' or 'default', return the numeric celsius value. When coerced to 'string', return `\"${celsius}°C\"`.",
        vi: "Tạo class `Temperature(celsius)` cài đặt phương thức `[Symbol.toPrimitive](hint)`. Khi ép kiểu sang 'number' hoặc 'default', trả về giá trị số celsius. Khi ép kiểu sang 'string', trả về `\"${celsius}°C\"`."
      },
      starterCode: `class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  // Implement Symbol.toPrimitive
}

const t = new Temperature(25);
console.log(+t); // 25
console.log(\`It is \${t}\`); // "It is 25°C"
console.log(t + 5); // 30`,
      solutionCode: `class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return \`\${this.celsius}°C\`;
    }
    return this.celsius;
  }
}`,
      hints: [
        {
          en: "Check `if (hint === 'string') return `${this.celsius}°C``, otherwise return `this.celsius`.",
          vi: "Kiểm tra `if (hint === 'string') return `${this.celsius}°C``, ngược lại trả về `this.celsius`."
        }
      ]
    },
    {
      id: "js_ex_22_2",
      title: {
        en: "Custom Duck-Typing Interface Validator with Symbol.hasInstance",
        vi: "Kiểm Tra Giao Diện Duck-Typing Bằng Symbol.hasInstance"
      },
      instruction: {
        en: "Write a factory function `createInterface(...requiredMethodNames)` that returns an object with a custom `[Symbol.hasInstance](instance)` checking if `instance` has all specified method names as functions.",
        vi: "Viết hàm factory `createInterface(...requiredMethodNames)` trả về đối tượng có cài đặt `[Symbol.hasInstance](instance)` kiểm tra xem `instance` có đầy đủ các phương thức được yêu cầu hay không."
      },
      starterCode: `function createInterface(...requiredMethods) {
  // Return interface checker with Symbol.hasInstance
}

const Serializable = createInterface("serialize", "deserialize");
const validObj = { serialize() {}, deserialize() {} };
const invalidObj = { serialize() {} };

console.log(validObj instanceof Serializable);   // true
console.log(invalidObj instanceof Serializable); // false`,
      solutionCode: `function createInterface(...requiredMethods) {
  return {
    [Symbol.hasInstance](instance) {
      if (!instance || (typeof instance !== 'object' && typeof instance !== 'function')) {
        return false;
      }
      return requiredMethods.every(method => typeof instance[method] === 'function');
    }
  };
}`,
      hints: [
        {
          en: "Use requiredMethods.every() checking `typeof instance[method] === 'function'`.",
          vi: "Dùng requiredMethods.every() kiểm tra `typeof instance[method] === 'function'`."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_22",
    title: {
      en: "Private Brand Weak Metadata Store via Symbols",
      vi: "Kho Lưu Trữ Siêu Dữ Liệu Riêng Tư Bằng Symbol Branding"
    },
    description: {
      en: "Implement a metadata branding system `createBrand(brandName)` that returns `{ tag(obj, data)`, `read(obj)`, `has(obj)` } using a secret unexported Symbol key to store hidden metadata on objects without appearing in `Object.keys()` or JSON output.",
      vi: "Cài đặt hệ thống đóng dấu siêu dữ liệu `createBrand(brandName)` trả về `{ tag(obj, data)`, `read(obj)`, `has(obj)` } sử dụng key Symbol bí mật để lưu metadata ẩn trên đối tượng mà không hiển thị trong `Object.keys()` hay đầu ra JSON."
    },
    starterCode: `function createBrand(brandName) {
  // Implement symbol branding store
}

const SecureBrand = createBrand("SECURE_TOKEN");
const user = { name: "Elena" };
SecureBrand.tag(user, { role: "SUPERADMIN", expires: 999999 });

console.log(SecureBrand.has(user)); // true
console.log(SecureBrand.read(user).role); // "SUPERADMIN"
console.log(JSON.stringify(user)); // '{"name":"Elena"}' (Metadata is hidden!)`,
    solutionCode: `function createBrand(brandName) {
  const brandKey = Symbol(brandName);

  return {
    tag(obj, data) {
      if (!obj || typeof obj !== 'object') throw new TypeError("Target must be an object");
      Object.defineProperty(obj, brandKey, {
        value: Object.freeze({ ...data }),
        writable: false,
        enumerable: false,
        configurable: false
      });
      return obj;
    },
    read(obj) {
      if (!obj || typeof obj !== 'object') return null;
      return obj[brandKey] || null;
    },
    has(obj) {
      if (!obj || typeof obj !== 'object') return false;
      return brandKey in obj;
    }
  };
}`,
    hints: [
      {
        en: "Use an unexported `const brandKey = Symbol(brandName)` and assign via `Object.defineProperty` with enumerable: false.",
        vi: "Dùng một `const brandKey = Symbol(brandName)` không export và gán bằng `Object.defineProperty` với enumerable: false."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_22_1",
      type: "single_choice",
      question: {
        en: "What is the return value of `Symbol('id') === Symbol('id')`?",
        vi: "Kết quả của phép so sánh `Symbol('id') === Symbol('id')` là gì?"
      },
      options: [
        { id: "a", text: { en: "false (every Symbol call produces a completely unique identity)", vi: "false (mỗi lần gọi Symbol đều tạo ra một định danh hoàn toàn duy nhất)" } },
        { id: "b", text: { en: "true", vi: "true" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Symbols are guaranteed unique; the description string passed to `Symbol()` is purely for debugging.",
        vi: "Symbol được đảm bảo luôn duy nhất; chuỗi mô tả truyền vào `Symbol()` chỉ nhằm mục đích gỡ lỗi."
      }
    },
    {
      id: "js_q_22_2",
      type: "predict_output",
      question: {
        en: "How do you access the global shared symbol registry across different realms/iframes?",
        vi: "Làm thế nào để truy cập vào registry symbol chia sẻ toàn cục giữa các iframe hoặc realm khác nhau?"
      },
      options: [
        { id: "a", text: { en: "Symbol.for(key)", vi: "Symbol.for(key)" } },
        { id: "b", text: { en: "Symbol.global(key)", vi: "Symbol.global(key)" } },
        { id: "c", text: { en: "Symbol.shared(key)", vi: "Symbol.shared(key)" } },
        { id: "d", text: { en: "Symbol.registry(key)", vi: "Symbol.registry(key)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Symbol.for(key)` searches the global runtime registry and returns the existing symbol or creates a new shared one.",
        vi: "`Symbol.for(key)` tìm trong registry toàn cục và trả về symbol đang có hoặc tạo symbol chia sẻ mới."
      }
    },
    {
      id: "js_q_22_3",
      type: "single_choice",
      question: {
        en: "Which Well-Known Symbol customizes the result of `Object.prototype.toString.call(obj)`?",
        vi: "Well-Known Symbol nào dùng để tùy biến chuỗi trả về của `Object.prototype.toString.call(obj)`?"
      },
      options: [
        { id: "a", text: { en: "Symbol.toStringTag", vi: "Symbol.toStringTag" } },
        { id: "b", text: { en: "Symbol.toPrimitive", vi: "Symbol.toPrimitive" } },
        { id: "c", text: { en: "Symbol.asString", vi: "Symbol.asString" } },
        { id: "d", text: { en: "Symbol.inspect", vi: "Symbol.inspect" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Symbol.toStringTag` defines the tag string returned inside `[object <Tag>]`.",
        vi: "`Symbol.toStringTag` định nghĩa tên thẻ hiển thị bên trong `[object <Tag>]`."
      }
    },
    {
      id: "js_q_22_4",
      type: "predict_output",
      question: {
        en: "Do Symbol-keyed properties appear in `Object.keys(obj)` or `JSON.stringify(obj)`?",
        vi: "Các thuộc tính có key là Symbol có xuất hiện trong `Object.keys(obj)` hay `JSON.stringify(obj)` không?"
      },
      options: [
        { id: "a", text: { en: "No, they are completely ignored by Object.keys() and JSON.stringify()", vi: "Không, chúng hoàn toàn bị bỏ qua trong Object.keys() và JSON.stringify()" } },
        { id: "b", text: { en: "Yes, always", vi: "Có, luôn xuất hiện" } },
        { id: "c", text: { en: "Only if stringify replacer is null", vi: "Chỉ khi hàm replacer của stringify là null" } },
        { id: "d", text: { en: "Throws a TypeError", vi: "Ném lỗi TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Symbol properties are non-enumerable to standard reflection tools, making them ideal for hidden metadata.",
        vi: "Thuộc tính symbol ẩn với các công cụ duyệt thông thường, rất lý tưởng để lưu metadata ẩn."
      }
    },
    {
      id: "js_q_22_5",
      type: "single_choice",
      question: {
        en: "How can you retrieve all Symbol keys defined directly on an object?",
        vi: "Cách lấy toàn bộ danh sách key Symbol định nghĩa trực tiếp trên một đối tượng là gì?"
      },
      options: [
        { id: "a", text: { en: "Object.getOwnPropertySymbols(obj) or Reflect.ownKeys(obj)", vi: "Object.getOwnPropertySymbols(obj) hoặc Reflect.ownKeys(obj)" } },
        { id: "b", text: { en: "Object.keys(obj)", vi: "Object.keys(obj)" } },
        { id: "c", text: { en: "Object.values(obj)", vi: "Object.values(obj)" } },
        { id: "d", text: { en: "for...in loop", vi: "Vòng lặp for...in" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Object.getOwnPropertySymbols(obj)` returns an array of all Symbol property keys on the object.",
        vi: "`Object.getOwnPropertySymbols(obj)` trả về mảng chứa tất cả các key Symbol trên đối tượng."
      }
    },
    {
      id: "js_q_22_6",
      type: "predict_output",
      question: {
        en: "What are the 3 possible values of the `hint` parameter passed into `[Symbol.toPrimitive](hint)`?",
        vi: "3 giá trị có thể có của tham số `hint` truyền vào phương thức `[Symbol.toPrimitive](hint)` là gì?"
      },
      options: [
        { id: "a", text: { en: "'number', 'string', 'default'", vi: "'number', 'string', 'default'" } },
        { id: "b", text: { en: "'int', 'float', 'text'", vi: "'int', 'float', 'text'" } },
        { id: "c", text: { en: "'boolean', 'object', 'null'", vi: "'boolean', 'object', 'null'" } },
        { id: "d", text: { en: "'strict', 'loose', 'coerced'", vi: "'strict', 'loose', 'coerced'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The JS engine passes `'number'` (math ops), `'string'` (template literals), or `'default'` (+ operator with strings/numbers).",
        vi: "JS engine truyền `'number'` (phép toán số), `'string'` (chuỗi mẫu), hoặc `'default'` (toán tử + giữa chuỗi/số)."
      }
    },
    {
      id: "js_q_22_7",
      type: "fill_blank",
      question: {
        en: "To customize the behavior of the `instanceof` operator on a class, define the static method [Symbol._____](instance) { ... }.",
        vi: "Để tùy biến hành vi của toán tử `instanceof` trên một class, định nghĩa phương thức static [Symbol._____](instance) { ... }."
      },
      correctAnswer: "hasInstance",
      explanation: {
        en: "`Function.prototype[Symbol.hasInstance]` determines if a constructor recognizes an object as its instance.",
        vi: "`[Symbol.hasInstance]` quyết định xem một constructor có công nhận đối tượng là instance của nó không."
      }
    },
    {
      id: "js_q_22_8",
      type: "single_choice",
      question: {
        en: "What does `Symbol.keyFor(sym)` return?",
        vi: "`Symbol.keyFor(sym)` trả về giá trị gì?"
      },
      options: [
        { id: "a", text: { en: "The string key of a symbol registered in the global symbol registry, or undefined if not in the global registry", vi: "Chuỗi key của symbol đăng ký trong global registry, hoặc undefined nếu không nằm trong global registry" } },
        { id: "b", text: { en: "The memory address of the symbol", vi: "Địa chỉ bộ nhớ của symbol" } },
        { id: "c", text: { en: "The description passed to local Symbol()", vi: "Chuỗi mô tả truyền vào hàm Symbol() cục bộ" } },
        { id: "d", text: { en: "A random UUID", vi: "Một mã UUID ngẫu nhiên" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Symbol.keyFor` looks up the key in the global registry created via `Symbol.for()`.",
        vi: "`Symbol.keyFor` tra cứu key trong global registry được tạo qua `Symbol.for()`."
      }
    },
    {
      id: "js_q_22_9",
      type: "predict_output",
      question: {
        en: "What will `typeof Symbol()` return?",
        vi: "`typeof Symbol()` trả về kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "'symbol'", vi: "'symbol'" } },
        { id: "b", text: { en: "'object'", vi: "'object'" } },
        { id: "c", text: { en: "'function'", vi: "'function'" } },
        { id: "d", text: { en: "'string'", vi: "'string'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Symbol is a distinct primitive data type with `typeof === 'symbol'`.",
        vi: "Symbol là kiểu dữ liệu nguyên thủy riêng biệt có kết quả `typeof === 'symbol'`."
      }
    },
    {
      id: "js_q_22_10",
      type: "code_reasoning",
      question: {
        en: "Why is `Symbol.species` used in built-in collection classes like Array or Promise?",
        vi: "Tại sao `Symbol.species` được sử dụng trong các class tập hợp tích hợp sẵn như Array hay Promise?"
      },
      options: [
        { id: "a", text: { en: "It specifies which constructor function is used when derived methods (like `.map()` or `.filter()`) create new instance copies", vi: "Nó chỉ định hàm constructor nào sẽ được sử dụng khi các phương thức phái sinh (như `.map()` hoặc `.filter()`) tạo ra instance bản sao mới" } },
        { id: "b", text: { en: "It detects browser vendor species", vi: "Nó phát hiện trình duyệt thuộc loại nào" } },
        { id: "c", text: { en: "It optimizes garbage collection speeds", vi: "Nó tối ưu tốc độ dọn rác" } },
        { id: "d", text: { en: "It encrypts array contents", vi: "Nó mã hóa nội dung mảng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`[Symbol.species]` allows a subclass of `Array` to return standard `Array` instances from `.map()` instead of custom subclass instances.",
        vi: "`[Symbol.species]` cho phép class con kế thừa từ `Array` có thể trả về instance `Array` chuẩn từ `.map()` thay vì instance của class con."
      }
    }
  ]
};

// Write Lesson 21 and 22
fs.writeFileSync(path.join(dir, 'lesson21.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson21: Lesson = ${JSON.stringify(lesson21, null, 2)};\nexport default lesson21;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson22.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson22: Lesson = ${JSON.stringify(lesson22, null, 2)};\nexport default lesson22;\n`, 'utf8');
console.log('Lessons 21 and 22 generated.');
