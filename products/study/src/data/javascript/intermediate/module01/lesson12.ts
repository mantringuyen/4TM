import { Lesson } from '../../../../types';

export const lesson12: Lesson = {
  "id": "js_lesson_12",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_3",
  "order": 12,
  "title": {
    "en": "Closures, Lexical Scope & Execution Contexts",
    "vi": "Closures, Lexical Scope & Ngữ Cảnh Thực Thi (Execution Contexts)"
  },
  "summary": {
    "en": "Master how functions retain access to their outer lexical environment, call stack execution contexts, practical closure encapsulation, and memory leak prevention.",
    "vi": "Làm chủ cơ chế hàm giữ quyền truy cập môi trường lexical bên ngoài (closure), ngăn xếp Call Stack, đóng gói dữ liệu và phòng ngừa rò rỉ bộ nhớ."
  },
  "estimatedMinutes": 22,
  "topicId": "js_closures_lexical_scope",
  "learn": {
    "introduction": {
      "en": "A Closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, every function forms a closure upon creation. Closures allow inner functions to access variables from an outer enclosing scope even after the outer function has finished executing and returned from the Call Stack. This mechanism enables private data encapsulation, module patterns, and function factories.",
      "vi": "Closure là sự kết hợp giữa một hàm và tham chiếu đến môi trường tĩnh (lexical environment) bao quanh nó. Trong JavaScript, mọi hàm đều tạo closure tại thời điểm khởi tạo. Closure cho phép hàm con bên trong vẫn truy cập được các biến của hàm cha ngay cả sau khi hàm cha đã chạy xong và thoát khỏi Call Stack. Cơ chế này là nền tảng của đóng gói dữ liệu riêng tư, module pattern và function factory."
    },
    "conceptExplanation": {
      "en": "1. Execution Contexts & Call Stack: When a function is invoked, the JS Engine pushes a new Execution Context onto the Call Stack. The context contains a Variable Environment and a reference to its outer Lexical Environment.\n\n2. The Closure Mechanism: When an outer function returns an inner function, any outer variables referenced by the inner function are retained on the Heap in a Lexical Scope object rather than being garbage collected.\n\n3. Practical Uses of Closures: Data privacy / encapsulation (simulating private variables before ES class private fields), Currying and partial application, and State retention in event listeners and memoization caches.\n\n4. Memory Leak Considerations: Unintentional closures (e.g. attaching event handlers that close over massive DOM nodes or large buffers without detaching) prevent the garbage collector from reclaiming memory.",
      "vi": "1. Ngữ Cảnh Thực Thi & Call Stack: Khi hàm được gọi, JS Engine đẩy một Execution Context mới vào Call Stack. Ngữ cảnh này chứa môi trường biến và liên kết tham chiếu đến Lexical Environment bên ngoài.\n\n2. Cơ Chế Closure: Khi hàm cha trả về hàm con, bất kỳ biến nào của hàm cha được hàm con sử dụng sẽ được giữ lại trong bộ nhớ Heap thay vì bị trình thu gom rác xóa đi.\n\n3. Ứng Dụng Thực Tế Của Closures: Đóng gói và bảo vệ dữ liệu riêng tư (tạo private state), kỹ thuật Currying / Partial Application, và lưu trữ trạng thái trong event listener / bộ nhớ đệm memoization.\n\n4. Nguy Cơ Rò Rỉ Bộ Nhớ: Các closure vô tình giữ tham chiếu đến các DOM node lớn hoặc buffer dữ liệu mà không giải phóng sẽ khiến Garbage Collector không thể thu hồi bộ nhớ."
    },
    "syntax": "// 1. Classic Counter Closure with private state\nfunction createCounter(initialValue = 0) {\n  let count = initialValue; // Private encapsulated variable!\n\n  return {\n    increment() { count++; return count; },\n    decrement() { count--; return count; },\n    getCount() { return count; }\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment()); // 11\nconsole.log(counter.getCount());  // 11\n// count is completely inaccessible from the outside!",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Bank Account with Encapsulated Private Ledger",
          "vi": "Tài Khoản Ngân Hàng Với Sổ Cái Riêng Tư Bằng Closure"
        },
        "description": {
          "en": "Demonstrates true data encapsulation where transaction history and balance cannot be tampered with directly.",
          "vi": "Minh họa tính đóng gói dữ liệu thực sự khi lịch sử giao dịch và số dư không thể bị can thiệp trực tiếp từ bên ngoài."
        },
        "code": "function createBankAccount(accountHolder, initialDeposit) {\n  let balance = initialDeposit;\n  const history = [{ type: \"OPEN\", amount: initialDeposit, date: new Date().toISOString() }];\n\n  return {\n    getHolder() { return accountHolder; },\n    getBalance() { return balance; },\n    deposit(amount) {\n      if (amount <= 0) throw new Error(\"Deposit amount must be positive\");\n      balance += amount;\n      history.push({ type: \"DEPOSIT\", amount, date: new Date().toISOString() });\n      return balance;\n    },\n    withdraw(amount) {\n      if (amount > balance) throw new Error(\"Insufficient funds\");\n      balance -= amount;\n      history.push({ type: \"WITHDRAW\", amount, date: new Date().toISOString() });\n      return balance;\n    },\n    getHistory() {\n      // Return a defensive shallow copy so internal history array cannot be modified\n      return [...history];\n    }\n  };\n}\n\nconst myAccount = createBankAccount(\"Elena\", 500);\nmyAccount.deposit(200);\nconsole.log(myAccount.getBalance()); // 700"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Retaining unused large objects inside closures, causing hidden memory leaks.",
          "vi": "Vô tình giữ lại các đối tượng dung lượng lớn trong closure gây rò rỉ bộ nhớ ngầm."
        },
        "correction": {
          "en": "Set large unused variables to `null` or extract only primitive values needed inside the inner function.",
          "vi": "Gán các biến lớn không còn dùng thành `null` hoặc chỉ trích xuất giá trị nguyên thủy cần thiết vào hàm con."
        }
      }
    ],
    "tips": [
      {
        "en": "Use closures for state encapsulation and factory functions: Closure factories create lightweight, object-oriented-like encapsulated instances without needing `class` boilerplate or dealing with `this` binding pitfalls.",
        "vi": "Dùng closure để đóng gói trạng thái và xây dựng factory functions: Factory function dùng closure tạo ra các instance đóng gói dữ liệu nhẹ nhàng mà không cần cú pháp class phức tạp hay lo lắng về lỗi ngữ cảnh `this`."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_12_1",
      "type": "complete_code",
      "title": {
        "en": "Build a Token Bucket Rate Limiter with Closures",
        "vi": "Xây Dựng Bộ Giới Hạn Tần Suất Token Bucket Bằng Closure"
      },
      "instruction": {
        "en": "Write a function `createTokenBucket(capacity, refillRatePerSecond)` that uses closures to maintain `tokens` and `lastRefillTime`. It returns a method `consume(count = 1)` that refills tokens based on elapsed time (capped at capacity), deducts tokens if available and returns `true`, or returns `false` if insufficient tokens exist.",
        "vi": "Viết hàm `createTokenBucket(capacity, refillRatePerSecond)` dùng closure để quản lý `tokens` và `lastRefillTime`. Trả về phương thức `consume(count = 1)` tự động nạp thêm token theo thời gian trôi qua (không vượt quá capacity), trừ token nếu đủ và trả về `true`, hoặc trả về `false` nếu không đủ."
      },
      "starterCode": "function createTokenBucket(capacity, refillRatePerSecond) {\n  // Implement token bucket closure\n}\n\nconst bucket = createTokenBucket(5, 1);\nconsole.log(bucket.consume(3)); // true (2 tokens left)\nconsole.log(bucket.consume(3)); // false (insufficient)",
      "solutionCode": "function createTokenBucket(capacity, refillRatePerSecond) {\n  let tokens = capacity;\n  let lastRefill = Date.now();\n\n  function refill() {\n    const now = Date.now();\n    const elapsedSeconds = (now - lastRefill) / 1000;\n    tokens = Math.min(capacity, tokens + elapsedSeconds * refillRatePerSecond);\n    lastRefill = now;\n  }\n\n  return {\n    consume(count = 1) {\n      refill();\n      if (tokens >= count) {\n        tokens -= count;\n        return true;\n      }\n      return false;\n    },\n    getTokens() {\n      refill();\n      return tokens;\n    }\n  };\n}",
      "hint": {
        "en": "Store tokens and lastRefill timestamp in closure. Before consuming, calculate elapsed time and refill tokens up to capacity.",
        "vi": "Lưu tokens và timestamp lastRefill trong closure. Trước khi consume, tính thời gian trôi qua và nạp thêm token tối đa bằng capacity."
      }
    },
    {
      "id": "js_ex_12_2",
      "type": "complete_code",
      "title": {
        "en": "Curried Math Pipeline Function",
        "vi": "Xây Dựng Hàm Tính Toán Đa Tầng Bằng Currying"
      },
      "instruction": {
        "en": "Write a function `curry(fn)` that converts any function taking N arguments into a curried function callable as `curried(a)(b)(c)` until all N arguments are supplied.",
        "vi": "Viết hàm `curry(fn)` chuyển đổi bất kỳ hàm nào nhận N đối số thành hàm curried có thể gọi theo dạng `curried(a)(b)(c)` cho đến khi nhận đủ N đối số."
      },
      "starterCode": "function curry(fn) {\n  // Implement general curry utility\n}\n\nfunction sum3(a, b, c) { return a + b + c; }\nconst curriedSum = curry(sum3);\nconsole.log(curriedSum(1)(2)(3)); // 6\nconsole.log(curriedSum(1, 2)(3)); // 6",
      "solutionCode": "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...nextArgs) {\n        return curried.apply(this, [...args, ...nextArgs]);\n      };\n    }\n  };\n}",
      "hint": {
        "en": "Compare args.length with fn.length. If sufficient, execute fn; otherwise return a new function collecting more args.",
        "vi": "So sánh args.length với fn.length. Nếu đã đủ đối số thì thực thi fn; ngược lại trả về hàm mới để gom tiếp đối số."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_12",
    "title": {
      "en": "Reactive State Store with Subscriptions",
      "vi": "Kho Quản Lý Trạng Thái Phản Ứng Với Cơ Chế Đăng Ký (Subscriptions)"
    },
    "description": {
      "en": "Create a state factory `createStore(initialState)` using closures that returns `{ getState(), setState(updaterOrPartial), subscribe(listener) }`. `subscribe` should return an `unsubscribe()` function. When state updates, all active listeners must be notified with `(newState, prevState)`.",
      "vi": "Tạo hàm factory `createStore(initialState)` sử dụng closure trả về `{ getState(), setState(updaterOrPartial), subscribe(listener) }`. Phương thức `subscribe` phải trả về hàm `unsubscribe()`. Khi state thay đổi, tất cả listener đang kích hoạt phải được gọi với `(newState, prevState)`."
    },
    "starterCode": "function createStore(initialState) {\n  // Implement reactive store closure\n}\n\nconst store = createStore({ count: 0 });\nconst unsub = store.subscribe((newState, oldState) => {\n  console.log(`Count changed from ${oldState.count} to ${newState.count}`);\n});\n\nstore.setState({ count: 1 }); // logs change\nunsub();\nstore.setState({ count: 2 }); // no log (unsubscribed)",
    "solutionCode": "function createStore(initialState) {\n  let state = initialState;\n  const listeners = new Set();\n\n  return {\n    getState() {\n      return state;\n    },\n    setState(updater) {\n      const prevState = state;\n      const nextState = typeof updater === 'function' ? updater(state) : { ...state, ...updater };\n\n      if (nextState !== prevState) {\n        state = nextState;\n        for (const listener of listeners) {\n          listener(state, prevState);\n        }\n      }\n    },\n    subscribe(listener) {\n      if (typeof listener === 'function') {\n        listeners.add(listener);\n      }\n      return function unsubscribe() {\n        listeners.delete(listener);\n      };\n    }\n  };\n}",
    "hints": [
      {
        "en": "Keep state and a Set of listeners in closure. In subscribe(), return an unsubscribe arrow function that deletes the listener from the Set.",
        "vi": "Lưu giữ state và một Set các listener trong closure. Trong subscribe(), trả về hàm unsubscribe để xóa listener khỏi Set."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Reactive State Store with Subscriptions according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Kho Quản Lý Trạng Thái Phản Ứng Với Cơ Chế Đăng Ký (Subscriptions) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_12_1",
      "type": "single_choice",
      "question": {
        "en": "What is a Closure in JavaScript?",
        "vi": "Closure trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "A function bundled with references to its surrounding lexical environment, allowing access to outer variables even after the outer function finishes execution",
          "vi": "Một hàm gắn liền với tham chiếu đến môi trường tĩnh (lexical environment) bao quanh nó, cho phép truy cập biến ngoài ngay cả sau khi hàm cha đã kết thúc"
        },
        {
          "en": "A way to close browser windows programmatically",
          "vi": "Một cách để đóng cửa sổ trình duyệt bằng code"
        },
        {
          "en": "A syntax error that halts execution",
          "vi": "Một lỗi cú pháp làm dừng chương trình"
        },
        {
          "en": "An HTML tag closing element",
          "vi": "Một thẻ đóng phần tử trong HTML"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "A closure retains access to variables in its outer scope chain throughout its entire lifecycle.",
        "vi": "Closure duy trì quyền truy cập vào các biến trong chuỗi scope cha trong suốt vòng đời của hàm đó."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "easy"
    },
    {
      "id": "js_q_12_2",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output?\n```js\nfunction outer() {\n  let x = 10;\n  return function() {\n    x += 5;\n    return x;\n  };\n}\nconst fn1 = outer();\nconsole.log(fn1());\nconsole.log(fn1());\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nfunction outer() {\n  let x = 10;\n  return function() {\n    x += 5;\n    return x;\n  };\n}\nconst fn1 = outer();\nconsole.log(fn1());\nconsole.log(fn1());\n```"
      },
      "options": [
        {
          "en": "15, then 20",
          "vi": "15, sau đó 20"
        },
        {
          "en": "15, then 15",
          "vi": "15, sau đó 15"
        },
        {
          "en": "NaN, then NaN",
          "vi": "NaN, sau đó NaN"
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
        "en": "`fn1` maintains a closure over `x`. The first call increments `x` to 15, and the second call increments the same `x` to 20.",
        "vi": "`fn1` duy trì một closure bao quanh biến `x`. Lần gọi đầu tăng `x` lên 15, lần gọi thứ hai tiếp tục tăng biến `x` đó lên 20."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "easy"
    },
    {
      "id": "js_q_12_3",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output when creating two separate closure instances?\n```js\nfunction createMultiplier(factor) {\n  return n => n * factor;\n}\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconsole.log(double(5), triple(5));\n```",
        "vi": "Đoạn mã sau sẽ in ra gì khi khởi tạo hai instance closure độc lập?\n```js\nfunction createMultiplier(factor) {\n  return n => n * factor;\n}\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconsole.log(double(5), triple(5));\n```"
      },
      "options": [
        {
          "en": "10 15",
          "vi": "10 15"
        },
        {
          "en": "15 15",
          "vi": "15 15"
        },
        {
          "en": "10 10",
          "vi": "10 10"
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
        "en": "Each invocation of `createMultiplier` creates an independent execution context and separate closure binding for `factor`.",
        "vi": "Mỗi lần gọi `createMultiplier` sinh ra một execution context độc lập và một closure riêng biệt lưu giá trị `factor` tương ứng."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "easy"
    },
    {
      "id": "js_q_12_4",
      "type": "single_choice",
      "question": {
        "en": "Where are variables captured by active closures stored in the JavaScript engine memory model?",
        "vi": "Các biến được closure tham chiếu được lưu ở đâu trong mô hình bộ nhớ của engine JavaScript?"
      },
      "options": [
        {
          "en": "On the Heap (in a heap-allocated Lexical Environment record), so they persist after the Call Stack frame pops",
          "vi": "Trên bộ nhớ Heap (trong bản ghi Lexical Environment), giúp chúng tồn tại ngay cả sau khi frame Call Stack đã bị đẩy ra"
        },
        {
          "en": "Strictly in the CPU L1 Cache",
          "vi": "Chỉ nằm trong CPU L1 Cache"
        },
        {
          "en": "In browser IndexedDB",
          "vi": "Trong IndexedDB trình duyệt"
        },
        {
          "en": "In the ROM memory",
          "vi": "Trong bộ nhớ ROM"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because stack frames are destroyed upon function return, variables needed by surviving inner functions are allocated in the heap.",
        "vi": "Vì khung stack frame bị hủy khi hàm return, các biến cần thiết cho hàm con được chuyển sang lưu trữ trên bộ nhớ Heap."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "medium"
    },
    {
      "id": "js_q_12_5",
      "type": "single_choice",
      "question": {
        "en": "What is Function Currying in JavaScript?",
        "vi": "Kỹ thuật Function Currying trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "Translating a function with multiple arguments into a sequence of functions, each taking a single argument",
          "vi": "Kỹ thuật chuyển đổi một hàm nhận nhiều tham số thành một chuỗi các hàm liên tiếp, mỗi hàm chỉ nhận một tham số"
        },
        {
          "en": "Encrypting function parameters with SHA-256",
          "vi": "Mã hóa tham số hàm bằng SHA-256"
        },
        {
          "en": "Executing functions in parallel across Web Workers",
          "vi": "Chạy các hàm song song trên nhiều Web Worker"
        },
        {
          "en": "Converting functions into strings",
          "vi": "Chuyển đổi hàm thành chuỗi ký tự"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Currying transforms `f(a, b, c)` into callable chain `f(a)(b)(c)` using closures to accumulate arguments.",
        "vi": "Currying biến đổi `f(a, b, c)` thành chuỗi gọi hàm `f(a)(b)(c)` bằng cách dùng closure để tích lũy dần các tham số."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "medium"
    },
    {
      "id": "js_q_12_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output in the classic closure scoping test?\n```js\nconst funcs = [];\nfor (var i = 0; i < 3; i++) {\n  funcs.push(() => i);\n}\nconsole.log(funcs[0](), funcs[1](), funcs[2]());\n```",
        "vi": "Đoạn mã sau sẽ in ra gì trong bài toán kiểm tra phạm vi closure kinh điển?\n```js\nconst funcs = [];\nfor (var i = 0; i < 3; i++) {\n  funcs.push(() => i);\n}\nconsole.log(funcs[0](), funcs[1](), funcs[2]());\n```"
      },
      "options": [
        {
          "en": "3 3 3",
          "vi": "3 3 3"
        },
        {
          "en": "0 1 2",
          "vi": "0 1 2"
        },
        {
          "en": "undefined undefined undefined",
          "vi": "undefined undefined undefined"
        },
        {
          "en": "0 0 0",
          "vi": "0 0 0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because `var i` is function-scoped, all 3 arrow functions close over the exact same `i` variable whose final value is 3.",
        "vi": "Vì `var i` có phạm vi hàm, cả 3 hàm mũi tên đều cùng trỏ vào một biến `i` duy nhất có giá trị cuối cùng là 3."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "medium"
    },
    {
      "id": "js_q_12_7",
      "type": "single_choice",
      "question": {
        "en": "How can you fix the loop closure bug above so `funcs[0]()` returns 0, `funcs[1]()` returns 1, etc.?",
        "vi": "Làm thế nào để sửa lỗi closure trong vòng lặp trên để `funcs[0]()` trả về 0, `funcs[1]()` trả về 1...?"
      },
      "options": [
        {
          "en": "Replace `var i = 0` with `let i = 0` (block scoping creates a fresh binding per iteration)",
          "vi": "Thay `var i = 0` bằng `let i = 0` (phạm vi khối tạo một binding độc lập cho mỗi vòng lặp)"
        },
        {
          "en": "Use `const i = 0`",
          "vi": "Dùng `const i = 0`"
        },
        {
          "en": "Call funcs.reverse()",
          "vi": "Gọi funcs.reverse()"
        },
        {
          "en": "Use a while loop instead",
          "vi": "Dùng vòng lặp while thay thế"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Changing `var` to `let` creates a distinct lexical environment for every iteration, capturing the unique `i` for each closure.",
        "vi": "Đổi `var` sang `let` tạo một lexical environment độc lập cho mỗi bước lặp, giúp mỗi closure lưu giữ giá trị `i` riêng biệt."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "medium"
    },
    {
      "id": "js_q_12_8",
      "type": "fill_blank",
      "question": {
        "en": "The stack data structure used by the JavaScript engine to track active function calls and execution contexts is the _____ Stack.",
        "vi": "Cấu trúc dữ liệu ngăn xếp được engine JavaScript sử dụng để theo dõi các hàm đang gọi và ngữ cảnh thực thi là _____ Stack."
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
        "en": "The Call Stack manages function invocation frames and execution contexts in LIFO order.",
        "vi": "Call Stack quản lý các khung gọi hàm và ngữ cảnh thực thi theo cơ chế vào sau ra trước (LIFO)."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "call"
      ]
    },
    {
      "id": "js_q_12_9",
      "type": "single_choice",
      "question": {
        "en": "How does a closure enable data encapsulation (private variables)?",
        "vi": "Closure hỗ trợ đóng gói dữ liệu (tạo biến riêng tư) như thế nào?"
      },
      "options": [
        {
          "en": "Variables declared inside the outer function are inaccessible from outside code, but accessible to returned inner methods",
          "vi": "Các biến khai báo trong hàm cha không thể truy cập từ bên ngoài, nhưng các phương thức con được trả về vẫn truy cập và chỉnh sửa được"
        },
        {
          "en": "By encrypting variable names with base64",
          "vi": "Bằng cách mã hóa tên biến bằng base64"
        },
        {
          "en": "By running in a sandboxed iframe",
          "vi": "Bằng cách chạy trong một iframe cô lập"
        },
        {
          "en": "By converting variables to Symbols",
          "vi": "Bằng cách chuyển các biến thành Symbol"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Outer variables are completely hidden from the global scope, forming a secure private state accessible only via exposed closure methods.",
        "vi": "Biến của hàm cha hoàn toàn ẩn khỏi scope toàn cục, tạo thành private state chỉ có thể thao tác qua các phương thức do closure cung cấp."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "hard"
    },
    {
      "id": "js_q_12_10",
      "type": "single_choice",
      "question": {
        "en": "Why can an unremoved event listener inside a single-page app cause a severe memory leak through closures?",
        "vi": "Tại sao một event listener không được gỡ bỏ trong ứng dụng SPA có thể gây rò rỉ bộ nhớ nghiêm trọng thông qua closure?"
      },
      "options": [
        {
          "en": "The event listener callback retains a closure over the component's scope and DOM nodes, preventing the Garbage Collector from freeing the entire component tree",
          "vi": "Callback của event listener giữ closure tham chiếu tới scope của component và các thẻ DOM, ngăn cản Garbage Collector giải phóng bộ nhớ của toàn bộ component đó"
        },
        {
          "en": "Event listeners crash the V8 compiler",
          "vi": "Event listener làm sập trình biên dịch V8"
        },
        {
          "en": "Because browser limits listeners to 10",
          "vi": "Vì trình duyệt giới hạn tối đa 10 listener"
        },
        {
          "en": "Because DOM nodes are stored in cookies",
          "vi": "Vì các DOM node được lưu trong cookie"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "As long as the DOM or window holds a reference to the listener, the entire lexical environment captured by the closure stays alive in memory.",
        "vi": "Chừng nào window hoặc DOM còn giữ listener, toàn bộ lexical environment mà closure đó tham chiếu tới sẽ không bao giờ được giải phóng khỏi bộ nhớ."
      },
      "topicId": "js_closures_lexical_scope",
      "difficulty": "hard"
    }
  ]
};
export default lesson12;
