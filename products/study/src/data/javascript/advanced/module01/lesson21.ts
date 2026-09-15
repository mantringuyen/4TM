import { Lesson } from '../../../../types';

export const lesson21: Lesson = {
  "id": "js_lesson_21",
  "courseId": "javascript",
  "levelId": "advanced",
  "moduleId": "js_mod_5",
  "order": 21,
  "title": {
    "en": "Iterators, Iterables, Generators & Async Iteration",
    "vi": "Iterators, Iterables, Generators & Vòng Lặp Bất Đồng Bộ (Async Iteration)"
  },
  "summary": {
    "en": "Master the iteration protocols (`[Symbol.iterator]`, `.next()`), generator functions (`function*`, `yield`, `yield*`), stateful lazy streams, and asynchronous iterators (`for await...of`).",
    "vi": "Làm chủ các giao thức lặp (`[Symbol.iterator]`, `.next()`), hàm Generator (`function*`, `yield`, `yield*`), luồng dữ liệu lười (lazy stream) và vòng lặp bất đồng bộ (`for await...of`)."
  },
  "estimatedMinutes": 24,
  "topicId": "js_generators_iterators",
  "learn": {
    "introduction": {
      "en": "The ECMAScript Iteration Protocols establish a standardized, language-wide mechanism for consuming sequence data lazily. Generators (`function*`) elevate this capability by allowing functions to yield control back to the caller while preserving execution state on the heap, enabling custom lazy infinite streams, state machines, and asynchronous pull pipelines with `for await...of`.",
      "vi": "Giao Thức Lặp (Iteration Protocols) của ECMAScript thiết lập chuẩn mực chung cho việc duyệt và xử lý chuỗi dữ liệu lười (lazy evaluation). Hàm Generator (`function*`) đưa khả năng này lên tầm cao mới bằng việc cho phép hàm tạm dừng và nhường quyền điều khiển cho bên ngoài qua `yield` trong khi vẫn bảo toàn trạng thái thực thi trong bộ nhớ Heap, mở ra khả năng tạo luồng vô hạn, máy trạng thái (state machine) và đường ống xử lý bất đồng bộ với `for await...of`."
    },
    "conceptExplanation": {
      "en": "1. The Iterable Protocol: An object is iterable if it defines a method at `[Symbol.iterator]()` that returns an Iterator object.\n\n2. The Iterator Protocol: An object with a `.next()` method returning `{ value: any, done: boolean }`.\n\n3. Generator Functions (`function*`): Calling a generator does NOT execute its body immediately; it returns a Generator Iterator object. When `.next(value)` is called, the generator resumes until it hits `yield expr`, which returns `expr` as `value` and pauses.\n\n4. `yield*` Delegation: Delegates iteration to another iterable or nested generator.\n\n5. Async Iterators & `for await...of`: Objects implementing `[Symbol.asyncIterator]()` return Promises of `{ value, done }`, enabling streaming pagination and socket consuming.",
      "vi": "1. Giao Thức Iterable: Một đối tượng là iterable nếu nó định nghĩa phương thức tại `[Symbol.iterator]()` trả về một Iterator.\n\n2. Giao Thức Iterator: Một đối tượng có phương thức `.next()` trả về `{ value: any, done: boolean }`.\n\n3. Hàm Generator (`function*`): Gọi generator KHÔNG chạy code ngay mà trả về đối tượng Generator Iterator. Khi gọi `.next(value)`, hàm chạy tiếp cho đến khi gặp `yield expr`, trả về `expr` và tạm dừng.\n\n4. Ủy Quyền `yield*`: Ủy quyền duyệt cho một iterable khác hoặc generator con lồng nhau.\n\n5. Async Iterator & `for await...of`: Đối tượng cài đặt `[Symbol.asyncIterator]()` trả về Promise của `{ value, done }`, cho phép duyệt luồng phân trang mạng hoặc đọc socket liên tục."
    },
    "syntax": "// 1. Custom Iterable Object with [Symbol.iterator]\nconst range = {\n  from: 1,\n  to: 3,\n  [Symbol.iterator]() {\n    let current = this.from;\n    const last = this.to;\n    return {\n      next() {\n        if (current <= last) {\n          return { value: current++, done: false };\n        }\n        return { value: undefined, done: true };\n      }\n    };\n  }\n};\nconsole.log([...range]); // [1, 2, 3]\n\n// 2. Infinite Lazy Generator Stream\nfunction* idGenerator(prefix = \"ID\") {\n  let count = 1;\n  while (true) {\n    yield `${prefix}_${count++}`;\n  }\n}\nconst gen = idGenerator(\"USR\");\nconsole.log(gen.next().value); // \"USR_1\"\nconsole.log(gen.next().value); // \"USR_2\"",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Async Paginated API Stream Consumer with for await...of",
          "vi": "Đọc Luồng Phân Trang Bất Đồng Bộ Với for await...of"
        },
        "description": {
          "en": "Demonstrates an async generator yielding pages of API records one-by-one until the dataset is exhausted.",
          "vi": "Minh họa generator bất đồng bộ tải từng trang dữ liệu từ API cho đến khi hết bản ghi."
        },
        "code": "async function* fetchPaginatedRecords(endpoint, pageSize = 20) {\n  let page = 1;\n  let hasMore = true;\n\n  while (hasMore) {\n    const res = await fetch(`${endpoint}?page=${page}&limit=${pageSize}`);\n    const data = await res.json();\n\n    for (const record of data.items) {\n      yield record;\n    }\n\n    hasMore = data.hasMore;\n    page++;\n  }\n}\n\n// Consuming with for await...of\nasync function processStream() {\n  for await (const record of fetchPaginatedRecords(\"/api/orders\")) {\n    console.log(\"Processing order:\", record.id);\n  }\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using standard `for...of` instead of `for await...of` on an async iterable.",
          "vi": "Dùng `for...of` thông thường thay vì `for await...of` trên một async iterable."
        },
        "correction": {
          "en": "Use `for await (const item of asyncIterable)`.",
          "vi": "Sử dụng `for await (const item of asyncIterable)`."
        }
      }
    ],
    "tips": [
      {
        "en": "Use generators for lazy data pipelines to reduce memory footprint: Instead of allocating an array of 1,000,000 transformed records in RAM, yield elements one-by-one as required by consumers.",
        "vi": "Dùng generator để xử lý dữ liệu lười nhằm tối ưu bộ nhớ RAM: Thay vì tạo mảng chứa 1,000,000 bản ghi trong RAM, dùng generator để sinh từng phần tử khi cần giúp tiết kiệm bộ nhớ."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_21_1",
      "type": "complete_code",
      "title": {
        "en": "Fibonacci Lazy Infinite Sequence Generator",
        "vi": "Tạo Dãy Số Fibonacci Vô Hạn Bằng Generator Lười"
      },
      "instruction": {
        "en": "Write a generator function `fibonacci()` that yields the Fibonacci sequence infinitely (0, 1, 1, 2, 3, 5, 8...). Write a helper `take(iterable, count)` that collects the first `count` elements into an array.",
        "vi": "Viết hàm generator `fibonacci()` sinh dãy số Fibonacci vô hạn (0, 1, 1, 2, 3, 5, 8...). Viết hàm tiện ích `take(iterable, count)` lấy `count` phần tử đầu tiên thành một mảng."
      },
      "starterCode": "function* fibonacci() {\n  // Implement fibonacci generator\n}\n\nfunction take(iterable, count) {\n  // Collect first count elements\n}\n\nconsole.log(take(fibonacci(), 7)); // [0, 1, 1, 2, 3, 5, 8]",
      "solutionCode": "function* fibonacci() {\n  let [prev, curr] = [0, 1];\n  while (true) {\n    yield prev;\n    [prev, curr] = [curr, prev + curr];\n  }\n}\n\nfunction take(iterable, count) {\n  const result = [];\n  let i = 0;\n  for (const item of iterable) {\n    if (i >= count) break;\n    result.push(item);\n    i++;\n  }\n  return result;\n}",
      "hint": {
        "en": "In fibonacci: yield prev, then update [prev, curr] = [curr, prev + curr]. In take: use for...of with a counter.",
        "vi": "Trong fibonacci: yield prev, rồi cập nhật [prev, curr] = [curr, prev + curr]. Trong take: dùng for...of với biến đếm."
      }
    },
    {
      "id": "js_ex_21_2",
      "type": "complete_code",
      "title": {
        "en": "Tree Depth-First Traversal Generator",
        "vi": "Duyệt Cây Theo Chiều Sâu (DFS) Bằng Generator & yield*"
      },
      "instruction": {
        "en": "Write a generator function `traverseTree(node)` that yields each node's `value` in a nested tree structure `{ value, children: [] }` in depth-first preorder using `yield*` delegation.",
        "vi": "Viết hàm generator `traverseTree(node)` sinh giá trị `value` của từng node trong cây lồng nhau `{ value, children: [] }` theo thứ tự duyệt tiền thứ tự DFS bằng cú pháp `yield*`."
      },
      "starterCode": "function* traverseTree(node) {\n  // Traverse tree using yield*\n}\n\nconst tree = {\n  value: \"root\",\n  children: [\n    { value: \"child1\", children: [{ value: \"leaf1\", children: [] }] },\n    { value: \"child2\", children: [] }\n  ]\n};\nconsole.log([...traverseTree(tree)]); // ['root', 'child1', 'leaf1', 'child2']",
      "solutionCode": "function* traverseTree(node) {\n  if (!node) return;\n  yield node.value;\n  if (node.children && Array.isArray(node.children)) {\n    for (const child of node.children) {\n      yield* traverseTree(child);\n    }\n  }\n}",
      "hint": {
        "en": "Yield node.value, then loop through node.children calling `yield* traverseTree(child)`.",
        "vi": "Yield node.value, sau đó lặp qua node.children gọi `yield* traverseTree(child)`."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_21",
    "title": {
      "en": "Async Pipeline Operator Combinator Engine",
      "vi": "Engine Ghép Nối Đường Ống Dữ Liệu Bất Đồng Bộ (Async Generator Pipe)"
    },
    "description": {
      "en": "Build an async pipeline helper `asyncPipe(sourceAsyncIterable, ...transformGenerators)` that chains multiple async generator transformations (like map, filter, take) together seamlessly without buffering intermediate items in memory.",
      "vi": "Xây dựng tiện ích `asyncPipe(sourceAsyncIterable, ...transformGenerators)` kết hợp nhiều hàm biến đổi async generator (như map, filter, take) với nhau mượt mà mà không cần lưu tạm dữ liệu vào bộ nhớ đệm."
    },
    "starterCode": "function asyncPipe(source, ...transforms) {\n  // Chain async generators\n}",
    "solutionCode": "function asyncPipe(source, ...transforms) {\n  return transforms.reduce((currentStream, transform) => {\n    return transform(currentStream);\n  }, source);\n}",
    "hints": [
      {
        "en": "Use Array.prototype.reduce passing the current async iterable into each transform generator function.",
        "vi": "Dùng Array.prototype.reduce truyền luồng async iterable hiện tại qua từng hàm biến đổi transform generator."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Async Pipeline Operator Combinator Engine according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine Ghép Nối Đường Ống Dữ Liệu Bất Đồng Bộ (Async Generator Pipe) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_21_1",
      "type": "single_choice",
      "question": {
        "en": "What well-known Symbol must an object implement to be consumable by `for...of` loops and spread syntax `[...obj]`?",
        "vi": "Đối tượng phải cài đặt Well-known Symbol nào để có thể duyệt qua bằng vòng lặp `for...of` và cú pháp spread `[...obj]`?"
      },
      "options": [
        {
          "en": "Symbol.iterator",
          "vi": "Symbol.iterator"
        },
        {
          "en": "Symbol.iterable",
          "vi": "Symbol.iterable"
        },
        {
          "en": "Symbol.loop",
          "vi": "Symbol.loop"
        },
        {
          "en": "Symbol.for",
          "vi": "Symbol.for"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`[Symbol.iterator]` is the standard ECMAScript method that returns an iterator for an object.",
        "vi": "`[Symbol.iterator]` là phương thức chuẩn của ECMAScript trả về iterator của đối tượng."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "easy"
    },
    {
      "id": "js_q_21_2",
      "type": "predict_output",
      "question": {
        "en": "What is returned when you invoke a generator function like `function* gen() { yield 1; }` directly via `const g = gen()`?",
        "vi": "Giá trị nhận được khi gọi trực tiếp một hàm generator `const g = gen()` là gì?"
      },
      "options": [
        {
          "en": "A Generator object (conforming to both Iterable and Iterator protocols), without running the function body yet",
          "vi": "Một đối tượng Generator (tuân theo cả hai giao thức Iterable và Iterator), mà chưa chạy mã trong thân hàm"
        },
        {
          "en": "1 (the first yielded value)",
          "vi": "1 (giá trị yield đầu tiên)"
        },
        {
          "en": "A Promise resolving to 1",
          "vi": "Một Promise resolve giá trị 1"
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
        "en": "Calling a generator function returns a suspended Generator object; execution only starts upon calling `.next()`.",
        "vi": "Gọi hàm generator trả về một đối tượng Generator đang tạm dừng; code chỉ bắt đầu chạy khi gọi `.next()`."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "easy"
    },
    {
      "id": "js_q_21_3",
      "type": "single_choice",
      "question": {
        "en": "What does the `yield*` operator do inside a generator?",
        "vi": "Toán tử `yield*` có tác dụng gì bên trong một generator?"
      },
      "options": [
        {
          "en": "Delegates iteration to another iterable or nested generator, yielding all its elements sequentially",
          "vi": "Ủy quyền duyệt cho một iterable khác hoặc generator con lồng nhau, sinh tuần tự toàn bộ phần tử của nó"
        },
        {
          "en": "Multiplies the yielded value by itself",
          "vi": "Nhân đôi giá trị yield với chính nó"
        },
        {
          "en": "Terminates the generator immediately",
          "vi": "Dừng generator ngay lập tức"
        },
        {
          "en": "Converts the generator into a Web Worker",
          "vi": "Chuyển generator thành Web Worker"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`yield* iterable` yields every value from the target iterable before resuming current generator execution.",
        "vi": "`yield* iterable` sinh lần lượt tất cả giá trị từ iterable mục tiêu trước khi chạy tiếp generator hiện tại."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "easy"
    },
    {
      "id": "js_q_21_4",
      "type": "predict_output",
      "question": {
        "en": "What is the return structure of every call to `iterator.next()`?",
        "vi": "Cấu trúc dữ liệu trả về của mỗi lần gọi `iterator.next()` là gì?"
      },
      "options": [
        {
          "en": "{ value: any, done: boolean }",
          "vi": "{ value: any, done: boolean }"
        },
        {
          "en": "[value, done]",
          "vi": "[value, done]"
        },
        {
          "en": "value only",
          "vi": "Chỉ trả về value"
        },
        {
          "en": "Promise<value>",
          "vi": "Promise<value>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The Iterator Protocol mandates an object with `value` (current item) and `done` (boolean flag).",
        "vi": "Giao thức Iterator quy định đối tượng trả về phải có trường `value` (giá trị hiện tại) và `done` (cờ boolean hoàn thành)."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "medium"
    },
    {
      "id": "js_q_21_5",
      "type": "single_choice",
      "question": {
        "en": "Which loop syntax is used to consume asynchronous iterables (`[Symbol.asyncIterator]`)?",
        "vi": "Cú pháp vòng lặp nào được sử dụng để duyệt các đối tượng async iterable (`[Symbol.asyncIterator]`)?"
      },
      "options": [
        {
          "en": "for await (const item of asyncIterable)",
          "vi": "for await (const item of asyncIterable)"
        },
        {
          "en": "async for (const item in asyncIterable)",
          "vi": "async for (const item in asyncIterable)"
        },
        {
          "en": "for (const await item of asyncIterable)",
          "vi": "for (const await item of asyncIterable)"
        },
        {
          "en": "while (await asyncIterable.hasNext())",
          "vi": "while (await asyncIterable.hasNext())"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`for await...of` asynchronously waits for each Promise yielded by an async iterator.",
        "vi": "`for await...of` tự động await từng Promise do async iterator trả về."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "medium"
    },
    {
      "id": "js_q_21_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output?\n```js\nfunction* demo() {\n  const x = yield 10;\n  yield x * 2;\n}\nconst g = demo();\nconsole.log(g.next().value);\nconsole.log(g.next(5).value);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nfunction* demo() {\n  const x = yield 10;\n  yield x * 2;\n}\nconst g = demo();\nconsole.log(g.next().value);\nconsole.log(g.next(5).value);\n```"
      },
      "options": [
        {
          "en": "10, then 10",
          "vi": "10, sau đó 10"
        },
        {
          "en": "10, then 20",
          "vi": "10, sau đó 20"
        },
        {
          "en": "10, then NaN",
          "vi": "10, sau đó NaN"
        },
        {
          "en": "5, then 10",
          "vi": "5, sau đó 10"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "First `.next()` yields 10 and pauses at `yield 10`. Second `.next(5)` resumes and sends `5` as the result of the `yield` expression, so `x = 5` and `x * 2 = 10`.",
        "vi": "Lần gọi `.next()` đầu tiên yield 10 và tạm dừng. Lần gọi `.next(5)` thứ hai truyền `5` làm giá trị trả về của biểu thức yield, nên `x = 5` và `x * 2 = 10`."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "medium"
    },
    {
      "id": "js_q_21_7",
      "type": "fill_blank",
      "question": {
        "en": "To declare a Generator function in JavaScript, append an asterisk after the function keyword: _____ * myGen() { ... }.",
        "vi": "Để khai báo một hàm Generator trong JavaScript, thêm dấu sao sau từ khóa function: _____ * myGen() { ... }."
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
        "en": "`function* name() {}` defines a generator function.",
        "vi": "`function* name() {}` định nghĩa một hàm generator."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "function"
      ]
    },
    {
      "id": "js_q_21_8",
      "type": "single_choice",
      "question": {
        "en": "What happens when you call `generator.return(value)` on an active generator?",
        "vi": "Điều gì xảy ra khi bạn gọi `generator.return(value)` trên một generator đang hoạt động?"
      },
      "options": [
        {
          "en": "It forces the generator to immediately terminate and return `{ value, done: true }`",
          "vi": "Nó ép generator dừng thực thi ngay lập tức và trả về `{ value, done: true }`"
        },
        {
          "en": "It restarts the generator from the beginning",
          "vi": "Nó khởi động lại generator từ đầu"
        },
        {
          "en": "It throws an uncatchable exception",
          "vi": "Nó ném ngoại lệ không thể bắt được"
        },
        {
          "en": "It pauses for 1000ms",
          "vi": "Nó tạm dừng trong 1000ms"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.return()` immediately closes the iterator and triggers any enclosing `finally` blocks in the generator.",
        "vi": "`.return()` đóng iterator ngay lập tức và kích hoạt các khối `finally` bên trong generator."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "hard"
    },
    {
      "id": "js_q_21_9",
      "type": "predict_output",
      "question": {
        "en": "Can a generator yield an infinite number of values without running out of memory?",
        "vi": "Một generator có thể yield vô hạn giá trị mà không bị tràn bộ nhớ không?"
      },
      "options": [
        {
          "en": "Yes, because values are computed on-demand (lazy evaluation) only when `.next()` is explicitly called",
          "vi": "Có, vì các giá trị chỉ được tính toán theo yêu cầu (lazy evaluation) mỗi khi hàm `.next()` được gọi chủ động"
        },
        {
          "en": "No, all infinite values are pre-allocated in RAM on startup",
          "vi": "Không, toàn bộ giá trị vô hạn bị nạp sẵn vào RAM lúc bắt đầu"
        },
        {
          "en": "Only if running on a 64-bit OS",
          "vi": "Chỉ khi chạy trên hệ điều hành 64-bit"
        },
        {
          "en": "No, generators are capped at 10,000 yields",
          "vi": "Không, generator bị giới hạn tối đa 10,000 lần yield"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Generators pull one value at a time on demand, creating infinite sequences with O(1) memory overhead.",
        "vi": "Generator chỉ sinh từng giá trị khi có yêu cầu, cho phép tạo chuỗi vô hạn với dung lượng bộ nhớ O(1)."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "hard"
    },
    {
      "id": "js_q_21_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `yield*` essential when writing recursive generator functions (like tree traversal)?",
        "vi": "Tại sao `yield*` là thiết yếu khi viết các hàm generator đệ quy (như duyệt cây)?"
      },
      "options": [
        {
          "en": "Without `yield*`, calling the recursive generator simply yields the Generator Iterator object itself rather than the individual unpacked values",
          "vi": "Nếu không có `yield*`, việc gọi đệ quy chỉ yield ra chính đối tượng Generator Iterator con chứ không mở gói từng phần tử bên trong nó"
        },
        {
          "en": "Recursive generators crash without `yield*`",
          "vi": "Generator đệ quy bị crash nếu thiếu `yield*`"
        },
        {
          "en": "`yield*` optimizes CPU threading",
          "vi": "`yield*` tối ưu luồng CPU"
        },
        {
          "en": "`yield*` is required by HTML5 parsers",
          "vi": "`yield*` là yêu cầu của trình phân tích HTML5"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`yield* subGen()` flattens and delegates iteration to the child generator.",
        "vi": "`yield* subGen()` làm phẳng và chuyển tiếp toàn bộ luồng yield của generator con ra ngoài."
      },
      "topicId": "js_generators_iterators",
      "difficulty": "hard"
    }
  ]
};
export default lesson21;
