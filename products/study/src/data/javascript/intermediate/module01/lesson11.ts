import { Lesson } from '../../../../types';

export const lesson11: Lesson = {
  "id": "js_lesson_11",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_3",
  "order": 11,
  "title": {
    "en": "Array Higher-Order Methods: map, filter, reduce & Modern Combinators",
    "vi": "Phương Thức Mảng Bậc Cao: map, filter, reduce & Bộ Kết Hợp Hiện Đại"
  },
  "summary": {
    "en": "Master declarative array processing with map, filter, reduce, flatMap, find, some, every, and complex data aggregation pipelines.",
    "vi": "Làm chủ xử lý mảng theo hướng khai báo với map, filter, reduce, flatMap, find, some, every và xây dựng đường ống tổng hợp dữ liệu phức tạp."
  },
  "estimatedMinutes": 22,
  "topicId": "js_array_higher_order",
  "learn": {
    "introduction": {
      "en": "Higher-order array methods represent the core of idiomatic functional JavaScript. Rather than writing imperative `for` loops with manual index bookkeeping and mutable state accumulators, declarative methods allow you to express data transformations clearly, compose reusable functions, and produce immutable results.",
      "vi": "Các phương thức mảng bậc cao là trọng tâm của phong cách lập trình hàm trong JavaScript. Thay vì phải viết các vòng lặp `for` mệnh lệnh với biến đếm chỉ số và biến tích lũy khả biến, các phương thức khai báo cho phép bạn diễn đạt sự biến đổi dữ liệu một cách trực quan, ghép nối các hàm tái sử dụng và sinh ra kết quả bất biến an toàn."
    },
    "conceptExplanation": {
      "en": "1. `.map(callback)`: Transforms every element 1-to-1 into a new array of the identical length.\n\n2. `.filter(predicate)`: Evaluates a boolean predicate on each item, returning a new array containing only elements that return truthy.\n\n3. `.reduce(reducer, initialValue)`: The ultimate accumulator combinator. Iterates over elements, reducing the array into a single accumulated result (number, object, nested map, or grouped dictionary). Always supply an explicit `initialValue` to prevent runtime crashes on empty arrays.\n\n4. Modern Combinators: `.flatMap(fn)` (maps and flattens 1 level in a single pass), `.find()` / `.findLast()`, `.findIndex()` / `.findLastIndex()`, `.some()` (returns true if at least one item matches), and `.every()` (returns true if all items match).",
      "vi": "1. `.map(callback)`: Biến đổi từng phần tử theo tỷ lệ 1-1 thành một mảng mới có cùng độ dài.\n\n2. `.filter(predicate)`: Đánh giá hàm điều kiện boolean trên từng phần tử, trả về mảng mới chỉ chứa các phần tử trả về truthy.\n\n3. `.reduce(reducer, initialValue)`: Phương thức gom tích lũy tối thượng. Duyệt qua các phần tử để cô đọng mảng thành một kết quả duy nhất (số, object gom nhóm, từ điển tra cứu). Luôn cung cấp `initialValue` để tránh lỗi khi mảng rỗng.\n\n4. Các Phương Thức Hiện Đại: `.flatMap(fn)` (map và làm phẳng 1 cấp trong 1 lượt duyệt), `.find()` / `.findLast()`, `.findIndex()` / `.findLastIndex()`, `.some()` (true nếu có ít nhất 1 phần tử thỏa mãn) và `.every()` (true nếu toàn bộ thỏa mãn)."
    },
    "syntax": "// 1. Chained transformation pipeline\nconst transactions = [\n  { id: 1, category: \"Food\", amount: 15.5 },\n  { id: 2, category: \"Tech\", amount: 120.0 },\n  { id: 3, category: \"Food\", amount: 8.2 }\n];\n\nconst totalFoodExpense = transactions\n  .filter(tx => tx.category === \"Food\")\n  .map(tx => tx.amount)\n  .reduce((sum, amount) => sum + amount, 0);\n\n// 2. Grouping with reduce\nconst groupedByCategory = transactions.reduce((acc, tx) => {\n  acc[tx.category] = acc[tx.category] || [];\n  acc[tx.category].push(tx);\n  return acc;\n}, {});\n\n// 3. flatMap for splitting and flattening\nconst tags = [\"frontend,react\", \"backend,node,express\"];\nconst allTags = tags.flatMap(str => str.split(\",\")); // [\"frontend\", \"react\", \"backend\", \"node\", \"express\"]",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "E-Commerce Cart Summary Aggregator",
          "vi": "Bộ Tổng Hợp & Phân Tích Giỏ Hàng Thương Mại Điện Tử"
        },
        "description": {
          "en": "Demonstrates using reduce to compute item counts, categorized sub-totals, discounts, and tax in a single pass.",
          "vi": "Minh họa sử dụng reduce để tính số lượng, tổng tiền theo danh mục, giảm giá và thuế trong một lượt duyệt duy nhất."
        },
        "code": "function analyzeCart(items) {\n  return items.reduce((summary, item) => {\n    summary.totalItems += item.qty;\n    summary.subtotal += item.price * item.qty;\n\n    summary.categoryTotals[item.category] =\n      (summary.categoryTotals[item.category] || 0) + item.price * item.qty;\n\n    if (item.isTaxable) {\n      summary.taxableAmount += item.price * item.qty;\n    }\n\n    return summary;\n  }, {\n    totalItems: 0,\n    subtotal: 0,\n    taxableAmount: 0,\n    categoryTotals: {}\n  });\n}\n\nconst cart = [\n  { name: \"Coffee\", category: \"Beverage\", price: 4.5, qty: 2, isTaxable: true },\n  { name: \"Notebook\", category: \"Office\", price: 12.0, qty: 1, isTaxable: false },\n  { name: \"Tea\", category: \"Beverage\", price: 3.0, qty: 3, isTaxable: true }\n];\n\nconsole.log(analyzeCart(cart));"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Calling `.reduce()` without providing an initial value on an array that might be empty.",
          "vi": "Gọi `.reduce()` mà không truyền initial value trên mảng có khả năng bị rỗng."
        },
        "correction": {
          "en": "Always supply the initial accumulator value as the second argument: `arr.reduce(fn, 0)` or `arr.reduce(fn, {})`.",
          "vi": "Luôn truyền giá trị khởi tạo cho biến tích lũy ở đối số thứ 2: `arr.reduce(fn, 0)` hoặc `arr.reduce(fn, {})`."
        }
      }
    ],
    "tips": [
      {
        "en": "Favor single-pass reduce over long filter().map().filter() chains on huge datasets: While method chaining is elegant and readable, each `.map()` and `.filter()` allocates an intermediate array in memory. On millions of records, single-pass `reduce` or a loop saves substantial GC overhead.",
        "vi": "Ưu tiên reduce 1 lượt thay vì chuỗi filter().map().filter() dài trên tập dữ liệu lớn: Chuỗi phương thức rất dễ đọc nhưng mỗi `.map()` hay `.filter()` đều tạo ra một mảng trung gian trong bộ nhớ. Trên dữ liệu hàng trăm nghìn dòng, reduce 1 lượt giúp tiết kiệm bộ nhớ đáng kể."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_11_1",
      "type": "complete_code",
      "title": {
        "en": "Implement Group By using Array.prototype.reduce",
        "vi": "Cài Đặt Hàm Group By Bằng Array.prototype.reduce"
      },
      "instruction": {
        "en": "Write a function `groupBy(items, keySelector)` that takes an array of items and a key selector function (e.g. `item => item.category`), and groups items into an object whose keys are the selector results and values are arrays of matching items.",
        "vi": "Viết hàm `groupBy(items, keySelector)` nhận một mảng và hàm chọn key (ví dụ `item => item.category`), gom các phần tử thành object có key là kết quả của selector và value là mảng các phần tử tương ứng."
      },
      "starterCode": "function groupBy(items, keySelector) {\n  // Implement groupBy with reduce\n}\n\nconst inventory = [\n  { name: \"Apple\", type: \"fruit\" },\n  { name: \"Carrot\", type: \"vegetable\" },\n  { name: \"Banana\", type: \"fruit\" }\n];\nconsole.log(groupBy(inventory, item => item.type));\n// { fruit: [...], vegetable: [...] }",
      "solutionCode": "function groupBy(items, keySelector) {\n  return items.reduce((groups, item) => {\n    const key = keySelector(item);\n    if (!groups[key]) {\n      groups[key] = [];\n    }\n    groups[key].push(item);\n    return groups;\n  }, {});\n}",
      "hint": {
        "en": "Initialize reduce with `{}`. Extract key with `keySelector(item)`, ensure `groups[key]` is an array, and push item.",
        "vi": "Khởi tạo reduce với `{}`. Lấy key bằng `keySelector(item)`, khởi tạo mảng `groups[key]` nếu chưa có và push phần tử vào."
      }
    },
    {
      "id": "js_ex_11_2",
      "type": "complete_code",
      "title": {
        "en": "Student Grade Statistics Engine",
        "vi": "Tính Toán Thống Kê Điểm Số Học Sinh Bằng Map/Filter/Reduce"
      },
      "instruction": {
        "en": "Write a function `calculateClassStats(students)` that takes an array of `{ name, score }` and returns `{ average, passRate, highestScore, passingNames }`. Passing score is >= 60. Handle empty arrays gracefully.",
        "vi": "Viết hàm `calculateClassStats(students)` nhận mảng `{ name, score }` và trả về `{ average, passRate, highestScore, passingNames }`. Điểm đậu là >= 60. Xử lý an toàn khi mảng rỗng."
      },
      "starterCode": "function calculateClassStats(students) {\n  // Compute class statistics\n}\n\nconst roster = [\n  { name: \"Alice\", score: 92 },\n  { name: \"Bob\", score: 58 },\n  { name: \"Charlie\", score: 85 }\n];\nconsole.log(calculateClassStats(roster));",
      "solutionCode": "function calculateClassStats(students) {\n  if (!students || students.length === 0) {\n    return { average: 0, passRate: 0, highestScore: 0, passingNames: [] };\n  }\n\n  const totalScore = students.reduce((sum, s) => sum + s.score, 0);\n  const average = Number((totalScore / students.length).toFixed(2));\n  const highestScore = Math.max(...students.map(s => s.score));\n\n  const passing = students.filter(s => s.score >= 60);\n  const passRate = Number(((passing.length / students.length) * 100).toFixed(2));\n  const passingNames = passing.map(s => s.name);\n\n  return { average, passRate, highestScore, passingNames };\n}",
      "hint": {
        "en": "Use reduce for total, Math.max with map for highest, filter for passing, and compute passRate.",
        "vi": "Dùng reduce tính tổng điểm, Math.max kết hợp map tìm điểm cao nhất, filter để lọc học sinh đậu và tính passRate."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_11",
    "title": {
      "en": "Declarative Query & Aggregation Pipeline Engine",
      "vi": "Engine Xử Lý & Tổng Hợp Dữ Liệu Kiểu Truy Vấn Khai Báo"
    },
    "description": {
      "en": "Create a fluent query wrapper `query(dataset)` with chainable methods: `.where(predicate)`, `.sortBy(comparator)`, `.select(transformFn)`, `.groupBy(keyFn)`, and `.execute()` which returns the finalized dataset.",
      "vi": "Tạo một wrapper truy vấn theo phong cách fluent `query(dataset)` với các phương thức có thể nối chuỗi: `.where(predicate)`, `.sortBy(comparator)`, `.select(transformFn)`, `.groupBy(keyFn)` và `.execute()` trả về dữ liệu cuối cùng."
    },
    "starterCode": "function query(dataset) {\n  // Implement fluent chainable query builder\n}\n\nconst data = [\n  { id: 1, dept: \"Engineering\", salary: 120000, active: true },\n  { id: 2, dept: \"Sales\", salary: 85000, active: true },\n  { id: 3, dept: \"Engineering\", salary: 140000, active: false },\n  { id: 4, dept: \"Engineering\", salary: 95000, active: true }\n];\n\nconst result = query(data)\n  .where(emp => emp.active)\n  .sortBy((a, b) => b.salary - a.salary)\n  .select(emp => ({ id: emp.id, dept: emp.dept, salary: emp.salary }))\n  .execute();\nconsole.log(result);",
    "solutionCode": "function query(dataset) {\n  let operations = [];\n\n  const builder = {\n    where(predicate) {\n      operations.push(data => data.filter(predicate));\n      return builder;\n    },\n    sortBy(comparator) {\n      operations.push(data => data.toSorted(comparator));\n      return builder;\n    },\n    select(transformFn) {\n      operations.push(data => data.map(transformFn));\n      return builder;\n    },\n    groupBy(keyFn) {\n      operations.push(data => {\n        return data.reduce((acc, item) => {\n          const key = keyFn(item);\n          acc[key] = acc[key] || [];\n          acc[key].push(item);\n          return acc;\n        }, {});\n      });\n      return builder;\n    },\n    execute() {\n      return operations.reduce((currentData, op) => op(currentData), [...dataset]);\n    }\n  };\n\n  return builder;\n}",
    "hints": [
      {
        "en": "Store transformation pipeline functions in an array and apply them sequentially in execute() using reduce.",
        "vi": "Lưu trữ các hàm biến đổi trong một mảng và áp dụng tuần tự trong execute() bằng reduce."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Declarative Query & Aggregation Pipeline Engine according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine Xử Lý & Tổng Hợp Dữ Liệu Kiểu Truy Vấn Khai Báo theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_11_1",
      "type": "single_choice",
      "question": {
        "en": "What is guaranteed about the length of the array returned by `Array.prototype.map()`?",
        "vi": "Đặc điểm nào được đảm bảo về độ dài của mảng trả về từ `Array.prototype.map()`?"
      },
      "options": [
        {
          "en": "It is always exactly equal to the length of the original input array",
          "vi": "Nó luôn luôn bằng đúng độ dài của mảng đầu vào ban đầu"
        },
        {
          "en": "It is always shorter or equal",
          "vi": "Nó luôn ngắn hơn hoặc bằng mảng gốc"
        },
        {
          "en": "It filters out falsy values automatically",
          "vi": "Nó tự động loại bỏ các giá trị falsy"
        },
        {
          "en": "It is always empty if no return statement exists",
          "vi": "Nó luôn rỗng nếu không có lệnh return"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.map()` performs a 1-to-1 projection, returning an array of identical length where each element is the return value of the callback.",
        "vi": "`.map()` thực hiện phép chiếu 1-1, luôn trả về một mảng có độ dài bằng mảng gốc với mỗi phần tử là giá trị trả về của callback."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "easy"
    },
    {
      "id": "js_q_11_2",
      "type": "predict_output",
      "question": {
        "en": "What happens when you run `[1, 2, 3].reduce((acc, val) => acc + val)` with NO second argument?",
        "vi": "Điều gì xảy ra khi bạn chạy `[1, 2, 3].reduce((acc, val) => acc + val)` mà KHÔNG truyền đối số thứ 2?"
      },
      "options": [
        {
          "en": "It uses index 0 (`1`) as initial accumulator, starts iterating at index 1 (`2`), and returns 6",
          "vi": "Nó lấy phần tử index 0 (`1`) làm giá trị tích lũy ban đầu, bắt đầu lặp từ index 1 (`2`) và trả về 6"
        },
        {
          "en": "It throws a TypeError",
          "vi": "Nó ném lỗi TypeError"
        },
        {
          "en": "It defaults the accumulator to undefined, producing NaN",
          "vi": "Nó mặc định accumulator là undefined, sinh ra kết quả NaN"
        },
        {
          "en": "It returns 0",
          "vi": "Nó trả về 0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "If initialValue is omitted on non-empty arrays, `reduce` sets `acc = arr[0]` and starts the loop at index 1.",
        "vi": "Nếu bỏ qua initialValue trên mảng không rỗng, `reduce` sẽ gán `acc = arr[0]` và bắt đầu vòng lặp từ phần tử thứ 2 (index 1)."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "easy"
    },
    {
      "id": "js_q_11_3",
      "type": "predict_output",
      "question": {
        "en": "What happens when you run `[].reduce((acc, val) => acc + val)` with NO second argument?",
        "vi": "Điều gì xảy ra khi bạn chạy `[].reduce((acc, val) => acc + val)` mà KHÔNG truyền đối số thứ 2?"
      },
      "options": [
        {
          "en": "Throws TypeError: Reduce of empty array with no initial value",
          "vi": "Ném lỗi TypeError: Reduce of empty array with no initial value"
        },
        {
          "en": "Returns 0",
          "vi": "Trả về 0"
        },
        {
          "en": "Returns undefined",
          "vi": "Trả về undefined"
        },
        {
          "en": "Returns null",
          "vi": "Trả về null"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Calling `reduce` on an empty array without an initialValue throws a TypeError because there is no initial element to assign.",
        "vi": "Gọi `reduce` trên mảng rỗng mà thiếu initialValue sẽ ném TypeError do không có phần tử nào để gán cho biến tích lũy ban đầu."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "easy"
    },
    {
      "id": "js_q_11_4",
      "type": "single_choice",
      "question": {
        "en": "Which method combines `map()` and `flat(1)` into a single efficient pass?",
        "vi": "Phương thức nào kết hợp cả `map()` và `flat(1)` trong một lượt duyệt hiệu quả duy nhất?"
      },
      "options": [
        {
          "en": "Array.prototype.flatMap()",
          "vi": "Array.prototype.flatMap()"
        },
        {
          "en": "Array.prototype.mapFlatten()",
          "vi": "Array.prototype.mapFlatten()"
        },
        {
          "en": "Array.prototype.flatDeep()",
          "vi": "Array.prototype.flatDeep()"
        },
        {
          "en": "Array.prototype.mergeMap()",
          "vi": "Array.prototype.mergeMap()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.flatMap(fn)` maps each item and flattens the resulting sub-arrays by 1 depth level in one step.",
        "vi": "`.flatMap(fn)` thực hiện map từng phần tử và làm phẳng mảng kết quả 1 cấp trong cùng một thao tác."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "medium"
    },
    {
      "id": "js_q_11_5",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log([10, 20, 30].some(x => x > 25))` return?",
        "vi": "`console.log([10, 20, 30].some(x => x > 25))` sẽ trả về kết quả gì?"
      },
      "options": [
        {
          "en": "true",
          "vi": "true"
        },
        {
          "en": "false",
          "vi": "false"
        },
        {
          "en": "30",
          "vi": "30"
        },
        {
          "en": "[30]",
          "vi": "[30]"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.some()` returns `true` as soon as any single element satisfies the predicate (30 > 25).",
        "vi": "`.some()` trả về `true` ngay khi có ít nhất một phần tử thỏa mãn điều kiện (ở đây là 30 > 25)."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "medium"
    },
    {
      "id": "js_q_11_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log([10, 20, 30].every(x => x > 15))` return?",
        "vi": "`console.log([10, 20, 30].every(x => x > 15))` sẽ trả về kết quả gì?"
      },
      "options": [
        {
          "en": "false (because 10 is not > 15)",
          "vi": "false (bởi vì 10 không > 15)"
        },
        {
          "en": "true",
          "vi": "true"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "[20, 30]",
          "vi": "[20, 30]"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.every()` checks if ALL items satisfy the condition. Because 10 <= 15, it immediately short-circuits to `false`.",
        "vi": "`.every()` kiểm tra xem TẤT CẢ phần tử có thỏa mãn không. Do 10 <= 15, hàm đoản mạch và trả về `false` ngay."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "medium"
    },
    {
      "id": "js_q_11_7",
      "type": "single_choice",
      "question": {
        "en": "What does `[1, 2, 3].find(x => x > 1)` return?",
        "vi": "`[1, 2, 3].find(x => x > 1)` trả về giá trị gì?"
      },
      "options": [
        {
          "en": "2 (the first matching element)",
          "vi": "2 (phần tử đầu tiên thỏa mãn)"
        },
        {
          "en": "[2, 3]",
          "vi": "[2, 3]"
        },
        {
          "en": "1 (index of 2)",
          "vi": "1 (chỉ số của 2)"
        },
        {
          "en": "true",
          "vi": "true"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.find()` returns the value of the FIRST element that satisfies the testing predicate, or `undefined` if none match.",
        "vi": "`.find()` trả về giá trị của phần tử ĐẦU TIÊN thỏa mãn hàm kiểm tra, hoặc `undefined` nếu không tìm thấy."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "medium"
    },
    {
      "id": "js_q_11_8",
      "type": "fill_blank",
      "question": {
        "en": "To find the index of the last element in an array that satisfies a predicate function (ES2023), use the _____ method.",
        "vi": "Để tìm chỉ số của phần tử cuối cùng trong mảng thỏa mãn hàm điều kiện (ES2023), sử dụng phương thức _____."
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
        "en": "`Array.prototype.findLastIndex()` searches backwards from the end and returns the index of the matching element.",
        "vi": "`Array.prototype.findLastIndex()` duyệt ngược từ cuối mảng và trả về chỉ số của phần tử khớp điều kiện."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "findlastindex"
      ]
    },
    {
      "id": "js_q_11_9",
      "type": "predict_output",
      "question": {
        "en": "What is the famous issue with `['1', '2', '3'].map(parseInt)`?",
        "vi": "Vấn đề nổi tiếng khi chạy `['1', '2', '3'].map(parseInt)` là gì?"
      },
      "options": [
        {
          "en": "It returns `[1, NaN, NaN]` because `.map` passes `(element, index)` and `parseInt` treats `index` as radix",
          "vi": "Nó trả về `[1, NaN, NaN]` vì `.map` truyền `(element, index)` và `parseInt` hiểu nhầm `index` là cơ số radix"
        },
        {
          "en": "It returns `[1, 2, 3]`",
          "vi": "Nó trả về `[1, 2, 3]`"
        },
        {
          "en": "It throws a TypeError",
          "vi": "Nó ném lỗi TypeError"
        },
        {
          "en": "It returns `['1', '2', '3']`",
          "vi": "Nó trả về `['1', '2', '3']`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`map` invokes `parseInt(str, index)`. `parseInt('1', 0)` gives 1; `parseInt('2', 1)` is NaN (radix 1 is invalid); `parseInt('3', 2)` is NaN (3 is invalid in binary radix 2). Correct: `arr.map(Number)`.",
        "vi": "`map` gọi `parseInt(str, index)`. `parseInt('1', 0)` ra 1; `parseInt('2', 1)` ra NaN (cơ số 1 không hợp lệ); `parseInt('3', 2)` ra NaN. Cách chuẩn là dùng `arr.map(Number)`."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "hard"
    },
    {
      "id": "js_q_11_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `arr.filter(predicate)` considered a pure function when the predicate has no side-effects?",
        "vi": "Tại sao `arr.filter(predicate)` được coi là hàm thuần khiết (pure) khi predicate không gây tác dụng phụ?"
      },
      "options": [
        {
          "en": "It never modifies the original array and always produces the exact same output array for the same inputs without external state mutations",
          "vi": "Nó không bao giờ sửa đổi mảng gốc và luôn tạo ra cùng một kết quả cho cùng một đầu vào mà không làm thay đổi trạng thái bên ngoài"
        },
        {
          "en": "It executes on a background Web Worker",
          "vi": "Nó chạy trên một Web Worker nền"
        },
        {
          "en": "It is written in WebAssembly",
          "vi": "Nó được viết bằng WebAssembly"
        },
        {
          "en": "It only accepts primitive values",
          "vi": "Nó chỉ nhận các giá trị nguyên thủy"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Purity requires zero side-effects and deterministic outputs. `filter()` returns a new array without mutating inputs.",
        "vi": "Tính thuần khiết yêu cầu không có tác dụng phụ và kết quả xác định. `filter()` tạo mảng mới mà không thay đổi đầu vào."
      },
      "topicId": "js_array_higher_order",
      "difficulty": "hard"
    }
  ]
};
export default lesson11;
