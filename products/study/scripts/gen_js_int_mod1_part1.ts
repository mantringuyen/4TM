import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/intermediate/module01');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 11 ---
const lesson11: Lesson = {
  id: "js_lesson_11",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_3",
  order: 11,
  title: {
    en: "Array Higher-Order Methods: map, filter, reduce & Modern Combinators",
    vi: "Phương Thức Mảng Bậc Cao: map, filter, reduce & Bộ Kết Hợp Hiện Đại"
  },
  summary: {
    en: "Master declarative array processing with map, filter, reduce, flatMap, find, some, every, and complex data aggregation pipelines.",
    vi: "Làm chủ xử lý mảng theo hướng khai báo với map, filter, reduce, flatMap, find, some, every và xây dựng đường ống tổng hợp dữ liệu phức tạp."
  },
  estimatedMinutes: 22,
  topicId: "js_array_higher_order",
  learn: {
    introduction: {
      en: "Higher-order array methods represent the core of idiomatic functional JavaScript. Rather than writing imperative `for` loops with manual index bookkeeping and mutable state accumulators, declarative methods allow you to express data transformations clearly, compose reusable functions, and produce immutable results.",
      vi: "Các phương thức mảng bậc cao là trọng tâm của phong cách lập trình hàm trong JavaScript. Thay vì phải viết các vòng lặp `for` mệnh lệnh với biến đếm chỉ số và biến tích lũy khả biến, các phương thức khai báo cho phép bạn diễn đạt sự biến đổi dữ liệu một cách trực quan, ghép nối các hàm tái sử dụng và sinh ra kết quả bất biến an toàn."
    },
    conceptExplanation: {
      en: "1. `.map(callback)`: Transforms every element 1-to-1 into a new array of the identical length.\n\n2. `.filter(predicate)`: Evaluates a boolean predicate on each item, returning a new array containing only elements that return truthy.\n\n3. `.reduce(reducer, initialValue)`: The ultimate accumulator combinator. Iterates over elements, reducing the array into a single accumulated result (number, object, nested map, or grouped dictionary). Always supply an explicit `initialValue` to prevent runtime crashes on empty arrays.\n\n4. Modern Combinators: `.flatMap(fn)` (maps and flattens 1 level in a single pass), `.find()` / `.findLast()`, `.findIndex()` / `.findLastIndex()`, `.some()` (returns true if at least one item matches), and `.every()` (returns true if all items match).",
      vi: "1. `.map(callback)`: Biến đổi từng phần tử theo tỷ lệ 1-1 thành một mảng mới có cùng độ dài.\n\n2. `.filter(predicate)`: Đánh giá hàm điều kiện boolean trên từng phần tử, trả về mảng mới chỉ chứa các phần tử trả về truthy.\n\n3. `.reduce(reducer, initialValue)`: Phương thức gom tích lũy tối thượng. Duyệt qua các phần tử để cô đọng mảng thành một kết quả duy nhất (số, object gom nhóm, từ điển tra cứu). Luôn cung cấp `initialValue` để tránh lỗi khi mảng rỗng.\n\n4. Các Phương Thức Hiện Đại: `.flatMap(fn)` (map và làm phẳng 1 cấp trong 1 lượt duyệt), `.find()` / `.findLast()`, `.findIndex()` / `.findLastIndex()`, `.some()` (true nếu có ít nhất 1 phần tử thỏa mãn) và `.every()` (true nếu toàn bộ thỏa mãn)."
    },
    syntax: `// 1. Chained transformation pipeline
const transactions = [
  { id: 1, category: "Food", amount: 15.5 },
  { id: 2, category: "Tech", amount: 120.0 },
  { id: 3, category: "Food", amount: 8.2 }
];

const totalFoodExpense = transactions
  .filter(tx => tx.category === "Food")
  .map(tx => tx.amount)
  .reduce((sum, amount) => sum + amount, 0);

// 2. Grouping with reduce
const groupedByCategory = transactions.reduce((acc, tx) => {
  acc[tx.category] = acc[tx.category] || [];
  acc[tx.category].push(tx);
  return acc;
}, {});

// 3. flatMap for splitting and flattening
const tags = ["frontend,react", "backend,node,express"];
const allTags = tags.flatMap(str => str.split(",")); // ["frontend", "react", "backend", "node", "express"]`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "E-Commerce Cart Summary Aggregator",
          vi: "Bộ Tổng Hợp & Phân Tích Giỏ Hàng Thương Mại Điện Tử"
        },
        description: {
          en: "Demonstrates using reduce to compute item counts, categorized sub-totals, discounts, and tax in a single pass.",
          vi: "Minh họa sử dụng reduce để tính số lượng, tổng tiền theo danh mục, giảm giá và thuế trong một lượt duyệt duy nhất."
        },
        code: `function analyzeCart(items) {
  return items.reduce((summary, item) => {
    summary.totalItems += item.qty;
    summary.subtotal += item.price * item.qty;

    summary.categoryTotals[item.category] =
      (summary.categoryTotals[item.category] || 0) + item.price * item.qty;

    if (item.isTaxable) {
      summary.taxableAmount += item.price * item.qty;
    }

    return summary;
  }, {
    totalItems: 0,
    subtotal: 0,
    taxableAmount: 0,
    categoryTotals: {}
  });
}

const cart = [
  { name: "Coffee", category: "Beverage", price: 4.5, qty: 2, isTaxable: true },
  { name: "Notebook", category: "Office", price: 12.0, qty: 1, isTaxable: false },
  { name: "Tea", category: "Beverage", price: 3.0, qty: 3, isTaxable: true }
];

console.log(analyzeCart(cart));`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Calling `.reduce()` without providing an initial value on an array that might be empty.",
          vi: "Gọi `.reduce()` mà không truyền initial value trên mảng có khả năng bị rỗng."
        },
        correction: {
          en: "Always supply the initial accumulator value as the second argument: `arr.reduce(fn, 0)` or `arr.reduce(fn, {})`.",
          vi: "Luôn truyền giá trị khởi tạo cho biến tích lũy ở đối số thứ 2: `arr.reduce(fn, 0)` hoặc `arr.reduce(fn, {})`."
        },
        explanation: {
          en: "Calling `[].reduce((a, b) => a + b)` with no initial value throws a fatal `TypeError: Reduce of empty array with no initial value`.",
          vi: "Gọi `[].reduce()` trên mảng rỗng mà thiếu initial value sẽ quăng lỗi nghiêm trọng `TypeError: Reduce of empty array with no initial value`."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Favor single-pass reduce over long filter().map().filter() chains on huge datasets",
          vi: "Ưu tiên reduce 1 lượt thay vì chuỗi filter().map().filter() dài trên tập dữ liệu lớn"
        },
        description: {
          en: "While method chaining is elegant and readable, each `.map()` and `.filter()` allocates an intermediate array in memory. On millions of records, single-pass `reduce` or a loop saves substantial GC overhead.",
          vi: "Chuỗi phương thức rất dễ đọc nhưng mỗi `.map()` hay `.filter()` đều tạo ra một mảng trung gian trong bộ nhớ. Trên dữ liệu hàng trăm nghìn dòng, reduce 1 lượt giúp tiết kiệm bộ nhớ đáng kể."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_11_1",
      title: {
        en: "Implement Group By using Array.prototype.reduce",
        vi: "Cài Đặt Hàm Group By Bằng Array.prototype.reduce"
      },
      instruction: {
        en: "Write a function `groupBy(items, keySelector)` that takes an array of items and a key selector function (e.g. `item => item.category`), and groups items into an object whose keys are the selector results and values are arrays of matching items.",
        vi: "Viết hàm `groupBy(items, keySelector)` nhận một mảng và hàm chọn key (ví dụ `item => item.category`), gom các phần tử thành object có key là kết quả của selector và value là mảng các phần tử tương ứng."
      },
      starterCode: `function groupBy(items, keySelector) {
  // Implement groupBy with reduce
}

const inventory = [
  { name: "Apple", type: "fruit" },
  { name: "Carrot", type: "vegetable" },
  { name: "Banana", type: "fruit" }
];
console.log(groupBy(inventory, item => item.type));
// { fruit: [...], vegetable: [...] }`,
      solutionCode: `function groupBy(items, keySelector) {
  return items.reduce((groups, item) => {
    const key = keySelector(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}`,
      hints: [
        {
          en: "Initialize reduce with `{}`. Extract key with `keySelector(item)`, ensure `groups[key]` is an array, and push item.",
          vi: "Khởi tạo reduce với `{}`. Lấy key bằng `keySelector(item)`, khởi tạo mảng `groups[key]` nếu chưa có và push phần tử vào."
        }
      ]
    },
    {
      id: "js_ex_11_2",
      title: {
        en: "Student Grade Statistics Engine",
        vi: "Tính Toán Thống Kê Điểm Số Học Sinh Bằng Map/Filter/Reduce"
      },
      instruction: {
        en: "Write a function `calculateClassStats(students)` that takes an array of `{ name, score }` and returns `{ average, passRate, highestScore, passingNames }`. Passing score is >= 60. Handle empty arrays gracefully.",
        vi: "Viết hàm `calculateClassStats(students)` nhận mảng `{ name, score }` và trả về `{ average, passRate, highestScore, passingNames }`. Điểm đậu là >= 60. Xử lý an toàn khi mảng rỗng."
      },
      starterCode: `function calculateClassStats(students) {
  // Compute class statistics
}

const roster = [
  { name: "Alice", score: 92 },
  { name: "Bob", score: 58 },
  { name: "Charlie", score: 85 }
];
console.log(calculateClassStats(roster));`,
      solutionCode: `function calculateClassStats(students) {
  if (!students || students.length === 0) {
    return { average: 0, passRate: 0, highestScore: 0, passingNames: [] };
  }

  const totalScore = students.reduce((sum, s) => sum + s.score, 0);
  const average = Number((totalScore / students.length).toFixed(2));
  const highestScore = Math.max(...students.map(s => s.score));

  const passing = students.filter(s => s.score >= 60);
  const passRate = Number(((passing.length / students.length) * 100).toFixed(2));
  const passingNames = passing.map(s => s.name);

  return { average, passRate, highestScore, passingNames };
}`,
      hints: [
        {
          en: "Use reduce for total, Math.max with map for highest, filter for passing, and compute passRate.",
          vi: "Dùng reduce tính tổng điểm, Math.max kết hợp map tìm điểm cao nhất, filter để lọc học sinh đậu và tính passRate."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_11",
    title: {
      en: "Declarative Query & Aggregation Pipeline Engine",
      vi: "Engine Xử Lý & Tổng Hợp Dữ Liệu Kiểu Truy Vấn Khai Báo"
    },
    description: {
      en: "Create a fluent query wrapper `query(dataset)` with chainable methods: `.where(predicate)`, `.sortBy(comparator)`, `.select(transformFn)`, `.groupBy(keyFn)`, and `.execute()` which returns the finalized dataset.",
      vi: "Tạo một wrapper truy vấn theo phong cách fluent `query(dataset)` với các phương thức có thể nối chuỗi: `.where(predicate)`, `.sortBy(comparator)`, `.select(transformFn)`, `.groupBy(keyFn)` và `.execute()` trả về dữ liệu cuối cùng."
    },
    starterCode: `function query(dataset) {
  // Implement fluent chainable query builder
}

const data = [
  { id: 1, dept: "Engineering", salary: 120000, active: true },
  { id: 2, dept: "Sales", salary: 85000, active: true },
  { id: 3, dept: "Engineering", salary: 140000, active: false },
  { id: 4, dept: "Engineering", salary: 95000, active: true }
];

const result = query(data)
  .where(emp => emp.active)
  .sortBy((a, b) => b.salary - a.salary)
  .select(emp => ({ id: emp.id, dept: emp.dept, salary: emp.salary }))
  .execute();
console.log(result);`,
    solutionCode: `function query(dataset) {
  let operations = [];

  const builder = {
    where(predicate) {
      operations.push(data => data.filter(predicate));
      return builder;
    },
    sortBy(comparator) {
      operations.push(data => data.toSorted(comparator));
      return builder;
    },
    select(transformFn) {
      operations.push(data => data.map(transformFn));
      return builder;
    },
    groupBy(keyFn) {
      operations.push(data => {
        return data.reduce((acc, item) => {
          const key = keyFn(item);
          acc[key] = acc[key] || [];
          acc[key].push(item);
          return acc;
        }, {});
      });
      return builder;
    },
    execute() {
      return operations.reduce((currentData, op) => op(currentData), [...dataset]);
    }
  };

  return builder;
}`,
    hints: [
      {
        en: "Store transformation pipeline functions in an array and apply them sequentially in execute() using reduce.",
        vi: "Lưu trữ các hàm biến đổi trong một mảng và áp dụng tuần tự trong execute() bằng reduce."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_11_1",
      type: "single_choice",
      question: {
        en: "What is guaranteed about the length of the array returned by `Array.prototype.map()`?",
        vi: "Đặc điểm nào được đảm bảo về độ dài của mảng trả về từ `Array.prototype.map()`?"
      },
      options: [
        { id: "a", text: { en: "It is always exactly equal to the length of the original input array", vi: "Nó luôn luôn bằng đúng độ dài của mảng đầu vào ban đầu" } },
        { id: "b", text: { en: "It is always shorter or equal", vi: "Nó luôn ngắn hơn hoặc bằng mảng gốc" } },
        { id: "c", text: { en: "It filters out falsy values automatically", vi: "Nó tự động loại bỏ các giá trị falsy" } },
        { id: "d", text: { en: "It is always empty if no return statement exists", vi: "Nó luôn rỗng nếu không có lệnh return" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.map()` performs a 1-to-1 projection, returning an array of identical length where each element is the return value of the callback.",
        vi: "`.map()` thực hiện phép chiếu 1-1, luôn trả về một mảng có độ dài bằng mảng gốc với mỗi phần tử là giá trị trả về của callback."
      }
    },
    {
      id: "js_q_11_2",
      type: "predict_output",
      question: {
        en: "What happens when you run `[1, 2, 3].reduce((acc, val) => acc + val)` with NO second argument?",
        vi: "Điều gì xảy ra khi bạn chạy `[1, 2, 3].reduce((acc, val) => acc + val)` mà KHÔNG truyền đối số thứ 2?"
      },
      options: [
        { id: "a", text: { en: "It uses index 0 (`1`) as initial accumulator, starts iterating at index 1 (`2`), and returns 6", vi: "Nó lấy phần tử index 0 (`1`) làm giá trị tích lũy ban đầu, bắt đầu lặp từ index 1 (`2`) và trả về 6" } },
        { id: "b", text: { en: "It throws a TypeError", vi: "Nó ném lỗi TypeError" } },
        { id: "c", text: { en: "It defaults the accumulator to undefined, producing NaN", vi: "Nó mặc định accumulator là undefined, sinh ra kết quả NaN" } },
        { id: "d", text: { en: "It returns 0", vi: "Nó trả về 0" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "If initialValue is omitted on non-empty arrays, `reduce` sets `acc = arr[0]` and starts the loop at index 1.",
        vi: "Nếu bỏ qua initialValue trên mảng không rỗng, `reduce` sẽ gán `acc = arr[0]` và bắt đầu vòng lặp từ phần tử thứ 2 (index 1)."
      }
    },
    {
      id: "js_q_11_3",
      type: "predict_output",
      question: {
        en: "What happens when you run `[].reduce((acc, val) => acc + val)` with NO second argument?",
        vi: "Điều gì xảy ra khi bạn chạy `[].reduce((acc, val) => acc + val)` mà KHÔNG truyền đối số thứ 2?"
      },
      options: [
        { id: "a", text: { en: "Throws TypeError: Reduce of empty array with no initial value", vi: "Ném lỗi TypeError: Reduce of empty array with no initial value" } },
        { id: "b", text: { en: "Returns 0", vi: "Trả về 0" } },
        { id: "c", text: { en: "Returns undefined", vi: "Trả về undefined" } },
        { id: "d", text: { en: "Returns null", vi: "Trả về null" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Calling `reduce` on an empty array without an initialValue throws a TypeError because there is no initial element to assign.",
        vi: "Gọi `reduce` trên mảng rỗng mà thiếu initialValue sẽ ném TypeError do không có phần tử nào để gán cho biến tích lũy ban đầu."
      }
    },
    {
      id: "js_q_11_4",
      type: "single_choice",
      question: {
        en: "Which method combines `map()` and `flat(1)` into a single efficient pass?",
        vi: "Phương thức nào kết hợp cả `map()` và `flat(1)` trong một lượt duyệt hiệu quả duy nhất?"
      },
      options: [
        { id: "a", text: { en: "Array.prototype.flatMap()", vi: "Array.prototype.flatMap()" } },
        { id: "b", text: { en: "Array.prototype.mapFlatten()", vi: "Array.prototype.mapFlatten()" } },
        { id: "c", text: { en: "Array.prototype.flatDeep()", vi: "Array.prototype.flatDeep()" } },
        { id: "d", text: { en: "Array.prototype.mergeMap()", vi: "Array.prototype.mergeMap()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.flatMap(fn)` maps each item and flattens the resulting sub-arrays by 1 depth level in one step.",
        vi: "`.flatMap(fn)` thực hiện map từng phần tử và làm phẳng mảng kết quả 1 cấp trong cùng một thao tác."
      }
    },
    {
      id: "js_q_11_5",
      type: "predict_output",
      question: {
        en: "What will `console.log([10, 20, 30].some(x => x > 25))` return?",
        vi: "`console.log([10, 20, 30].some(x => x > 25))` sẽ trả về kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "true", vi: "true" } },
        { id: "b", text: { en: "false", vi: "false" } },
        { id: "c", text: { en: "30", vi: "30" } },
        { id: "d", text: { en: "[30]", vi: "[30]" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.some()` returns `true` as soon as any single element satisfies the predicate (30 > 25).",
        vi: "`.some()` trả về `true` ngay khi có ít nhất một phần tử thỏa mãn điều kiện (ở đây là 30 > 25)."
      }
    },
    {
      id: "js_q_11_6",
      type: "predict_output",
      question: {
        en: "What will `console.log([10, 20, 30].every(x => x > 15))` return?",
        vi: "`console.log([10, 20, 30].every(x => x > 15))` sẽ trả về kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "false (because 10 is not > 15)", vi: "false (bởi vì 10 không > 15)" } },
        { id: "b", text: { en: "true", vi: "true" } },
        { id: "c", text: { en: "undefined", vi: "undefined" } },
        { id: "d", text: { en: "[20, 30]", vi: "[20, 30]" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.every()` checks if ALL items satisfy the condition. Because 10 <= 15, it immediately short-circuits to `false`.",
        vi: "`.every()` kiểm tra xem TẤT CẢ phần tử có thỏa mãn không. Do 10 <= 15, hàm đoản mạch và trả về `false` ngay."
      }
    },
    {
      id: "js_q_11_7",
      type: "single_choice",
      question: {
        en: "What does `[1, 2, 3].find(x => x > 1)` return?",
        vi: "`[1, 2, 3].find(x => x > 1)` trả về giá trị gì?"
      },
      options: [
        { id: "a", text: { en: "2 (the first matching element)", vi: "2 (phần tử đầu tiên thỏa mãn)" } },
        { id: "b", text: { en: "[2, 3]", vi: "[2, 3]" } },
        { id: "c", text: { en: "1 (index of 2)", vi: "1 (chỉ số của 2)" } },
        { id: "d", text: { en: "true", vi: "true" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.find()` returns the value of the FIRST element that satisfies the testing predicate, or `undefined` if none match.",
        vi: "`.find()` trả về giá trị của phần tử ĐẦU TIÊN thỏa mãn hàm kiểm tra, hoặc `undefined` nếu không tìm thấy."
      }
    },
    {
      id: "js_q_11_8",
      type: "fill_blank",
      question: {
        en: "To find the index of the last element in an array that satisfies a predicate function (ES2023), use the _____ method.",
        vi: "Để tìm chỉ số của phần tử cuối cùng trong mảng thỏa mãn hàm điều kiện (ES2023), sử dụng phương thức _____."
      },
      correctAnswer: "findLastIndex",
      explanation: {
        en: "`Array.prototype.findLastIndex()` searches backwards from the end and returns the index of the matching element.",
        vi: "`Array.prototype.findLastIndex()` duyệt ngược từ cuối mảng và trả về chỉ số của phần tử khớp điều kiện."
      }
    },
    {
      id: "js_q_11_9",
      type: "predict_output",
      question: {
        en: "What is the famous issue with `['1', '2', '3'].map(parseInt)`?",
        vi: "Vấn đề nổi tiếng khi chạy `['1', '2', '3'].map(parseInt)` là gì?"
      },
      options: [
        { id: "a", text: { en: "It returns `[1, NaN, NaN]` because `.map` passes `(element, index)` and `parseInt` treats `index` as radix", vi: "Nó trả về `[1, NaN, NaN]` vì `.map` truyền `(element, index)` và `parseInt` hiểu nhầm `index` là cơ số radix" } },
        { id: "b", text: { en: "It returns `[1, 2, 3]`", vi: "Nó trả về `[1, 2, 3]`" } },
        { id: "c", text: { en: "It throws a TypeError", vi: "Nó ném lỗi TypeError" } },
        { id: "d", text: { en: "It returns `['1', '2', '3']`", vi: "Nó trả về `['1', '2', '3']`" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`map` invokes `parseInt(str, index)`. `parseInt('1', 0)` gives 1; `parseInt('2', 1)` is NaN (radix 1 is invalid); `parseInt('3', 2)` is NaN (3 is invalid in binary radix 2). Correct: `arr.map(Number)`.",
        vi: "`map` gọi `parseInt(str, index)`. `parseInt('1', 0)` ra 1; `parseInt('2', 1)` ra NaN (cơ số 1 không hợp lệ); `parseInt('3', 2)` ra NaN. Cách chuẩn là dùng `arr.map(Number)`."
      }
    },
    {
      id: "js_q_11_10",
      type: "code_reasoning",
      question: {
        en: "Why is `arr.filter(predicate)` considered a pure function when the predicate has no side-effects?",
        vi: "Tại sao `arr.filter(predicate)` được coi là hàm thuần khiết (pure) khi predicate không gây tác dụng phụ?"
      },
      options: [
        { id: "a", text: { en: "It never modifies the original array and always produces the exact same output array for the same inputs without external state mutations", vi: "Nó không bao giờ sửa đổi mảng gốc và luôn tạo ra cùng một kết quả cho cùng một đầu vào mà không làm thay đổi trạng thái bên ngoài" } },
        { id: "b", text: { en: "It executes on a background Web Worker", vi: "Nó chạy trên một Web Worker nền" } },
        { id: "c", text: { en: "It is written in WebAssembly", vi: "Nó được viết bằng WebAssembly" } },
        { id: "d", text: { en: "It only accepts primitive values", vi: "Nó chỉ nhận các giá trị nguyên thủy" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Purity requires zero side-effects and deterministic outputs. `filter()` returns a new array without mutating inputs.",
        vi: "Tính thuần khiết yêu cầu không có tác dụng phụ và kết quả xác định. `filter()` tạo mảng mới mà không thay đổi đầu vào."
      }
    }
  ]
};

// --- LESSON 12 ---
const lesson12: Lesson = {
  id: "js_lesson_12",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_3",
  order: 12,
  title: {
    en: "Closures, Lexical Scope & Execution Contexts",
    vi: "Closures, Lexical Scope & Ngữ Cảnh Thực Thi (Execution Contexts)"
  },
  summary: {
    en: "Master how functions retain access to their outer lexical environment, call stack execution contexts, practical closure encapsulation, and memory leak prevention.",
    vi: "Làm chủ cơ chế hàm giữ quyền truy cập môi trường lexical bên ngoài (closure), ngăn xếp Call Stack, đóng gói dữ liệu và phòng ngừa rò rỉ bộ nhớ."
  },
  estimatedMinutes: 22,
  topicId: "js_closures_lexical_scope",
  learn: {
    introduction: {
      en: "A Closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, every function forms a closure upon creation. Closures allow inner functions to access variables from an outer enclosing scope even after the outer function has finished executing and returned from the Call Stack. This mechanism enables private data encapsulation, module patterns, and function factories.",
      vi: "Closure là sự kết hợp giữa một hàm và tham chiếu đến môi trường tĩnh (lexical environment) bao quanh nó. Trong JavaScript, mọi hàm đều tạo closure tại thời điểm khởi tạo. Closure cho phép hàm con bên trong vẫn truy cập được các biến của hàm cha ngay cả sau khi hàm cha đã chạy xong và thoát khỏi Call Stack. Cơ chế này là nền tảng của đóng gói dữ liệu riêng tư, module pattern và function factory."
    },
    conceptExplanation: {
      en: "1. Execution Contexts & Call Stack: When a function is invoked, the JS Engine pushes a new Execution Context onto the Call Stack. The context contains a Variable Environment and a reference to its outer Lexical Environment.\n\n2. The Closure Mechanism: When an outer function returns an inner function, any outer variables referenced by the inner function are retained on the Heap in a Lexical Scope object rather than being garbage collected.\n\n3. Practical Uses of Closures: Data privacy / encapsulation (simulating private variables before ES class private fields), Currying and partial application, and State retention in event listeners and memoization caches.\n\n4. Memory Leak Considerations: Unintentional closures (e.g. attaching event handlers that close over massive DOM nodes or large buffers without detaching) prevent the garbage collector from reclaiming memory.",
      vi: "1. Ngữ Cảnh Thực Thi & Call Stack: Khi hàm được gọi, JS Engine đẩy một Execution Context mới vào Call Stack. Ngữ cảnh này chứa môi trường biến và liên kết tham chiếu đến Lexical Environment bên ngoài.\n\n2. Cơ Chế Closure: Khi hàm cha trả về hàm con, bất kỳ biến nào của hàm cha được hàm con sử dụng sẽ được giữ lại trong bộ nhớ Heap thay vì bị trình thu gom rác xóa đi.\n\n3. Ứng Dụng Thực Tế Của Closures: Đóng gói và bảo vệ dữ liệu riêng tư (tạo private state), kỹ thuật Currying / Partial Application, và lưu trữ trạng thái trong event listener / bộ nhớ đệm memoization.\n\n4. Nguy Cơ Rò Rỉ Bộ Nhớ: Các closure vô tình giữ tham chiếu đến các DOM node lớn hoặc buffer dữ liệu mà không giải phóng sẽ khiến Garbage Collector không thể thu hồi bộ nhớ."
    },
    syntax: `// 1. Classic Counter Closure with private state
function createCounter(initialValue = 0) {
  let count = initialValue; // Private encapsulated variable!

  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    getCount() { return count; }
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.getCount());  // 11
// count is completely inaccessible from the outside!`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Bank Account with Encapsulated Private Ledger",
          vi: "Tài Khoản Ngân Hàng Với Sổ Cái Riêng Tư Bằng Closure"
        },
        description: {
          en: "Demonstrates true data encapsulation where transaction history and balance cannot be tampered with directly.",
          vi: "Minh họa tính đóng gói dữ liệu thực sự khi lịch sử giao dịch và số dư không thể bị can thiệp trực tiếp từ bên ngoài."
        },
        code: `function createBankAccount(accountHolder, initialDeposit) {
  let balance = initialDeposit;
  const history = [{ type: "OPEN", amount: initialDeposit, date: new Date().toISOString() }];

  return {
    getHolder() { return accountHolder; },
    getBalance() { return balance; },
    deposit(amount) {
      if (amount <= 0) throw new Error("Deposit amount must be positive");
      balance += amount;
      history.push({ type: "DEPOSIT", amount, date: new Date().toISOString() });
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      history.push({ type: "WITHDRAW", amount, date: new Date().toISOString() });
      return balance;
    },
    getHistory() {
      // Return a defensive shallow copy so internal history array cannot be modified
      return [...history];
    }
  };
}

const myAccount = createBankAccount("Elena", 500);
myAccount.deposit(200);
console.log(myAccount.getBalance()); // 700`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Retaining unused large objects inside closures, causing hidden memory leaks.",
          vi: "Vô tình giữ lại các đối tượng dung lượng lớn trong closure gây rò rỉ bộ nhớ ngầm."
        },
        correction: {
          en: "Set large unused variables to `null` or extract only primitive values needed inside the inner function.",
          vi: "Gán các biến lớn không còn dùng thành `null` hoặc chỉ trích xuất giá trị nguyên thủy cần thiết vào hàm con."
        },
        explanation: {
          en: "If an inner function closes over a large object or DOM element, the garbage collector cannot free that object as long as the inner function is reachable.",
          vi: "Nếu hàm con giữ tham chiếu đến một đối tượng lớn hoặc thẻ DOM, Garbage Collector sẽ không thể giải phóng vùng nhớ đó khi hàm con còn tồn tại."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use closures for state encapsulation and factory functions",
          vi: "Dùng closure để đóng gói trạng thái và xây dựng factory functions"
        },
        description: {
          en: "Closure factories create lightweight, object-oriented-like encapsulated instances without needing `class` boilerplate or dealing with `this` binding pitfalls.",
          vi: "Factory function dùng closure tạo ra các instance đóng gói dữ liệu nhẹ nhàng mà không cần cú pháp class phức tạp hay lo lắng về lỗi ngữ cảnh `this`."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_12_1",
      title: {
        en: "Build a Token Bucket Rate Limiter with Closures",
        vi: "Xây Dựng Bộ Giới Hạn Tần Suất Token Bucket Bằng Closure"
      },
      instruction: {
        en: "Write a function `createTokenBucket(capacity, refillRatePerSecond)` that uses closures to maintain `tokens` and `lastRefillTime`. It returns a method `consume(count = 1)` that refills tokens based on elapsed time (capped at capacity), deducts tokens if available and returns `true`, or returns `false` if insufficient tokens exist.",
        vi: "Viết hàm `createTokenBucket(capacity, refillRatePerSecond)` dùng closure để quản lý `tokens` và `lastRefillTime`. Trả về phương thức `consume(count = 1)` tự động nạp thêm token theo thời gian trôi qua (không vượt quá capacity), trừ token nếu đủ và trả về `true`, hoặc trả về `false` nếu không đủ."
      },
      starterCode: `function createTokenBucket(capacity, refillRatePerSecond) {
  // Implement token bucket closure
}

const bucket = createTokenBucket(5, 1);
console.log(bucket.consume(3)); // true (2 tokens left)
console.log(bucket.consume(3)); // false (insufficient)`,
      solutionCode: `function createTokenBucket(capacity, refillRatePerSecond) {
  let tokens = capacity;
  let lastRefill = Date.now();

  function refill() {
    const now = Date.now();
    const elapsedSeconds = (now - lastRefill) / 1000;
    tokens = Math.min(capacity, tokens + elapsedSeconds * refillRatePerSecond);
    lastRefill = now;
  }

  return {
    consume(count = 1) {
      refill();
      if (tokens >= count) {
        tokens -= count;
        return true;
      }
      return false;
    },
    getTokens() {
      refill();
      return tokens;
    }
  };
}`,
      hints: [
        {
          en: "Store tokens and lastRefill timestamp in closure. Before consuming, calculate elapsed time and refill tokens up to capacity.",
          vi: "Lưu tokens và timestamp lastRefill trong closure. Trước khi consume, tính thời gian trôi qua và nạp thêm token tối đa bằng capacity."
        }
      ]
    },
    {
      id: "js_ex_12_2",
      title: {
        en: "Curried Math Pipeline Function",
        vi: "Xây Dựng Hàm Tính Toán Đa Tầng Bằng Currying"
      },
      instruction: {
        en: "Write a function `curry(fn)` that converts any function taking N arguments into a curried function callable as `curried(a)(b)(c)` until all N arguments are supplied.",
        vi: "Viết hàm `curry(fn)` chuyển đổi bất kỳ hàm nào nhận N đối số thành hàm curried có thể gọi theo dạng `curried(a)(b)(c)` cho đến khi nhận đủ N đối số."
      },
      starterCode: `function curry(fn) {
  // Implement general curry utility
}

function sum3(a, b, c) { return a + b + c; }
const curriedSum = curry(sum3);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6`,
      solutionCode: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, [...args, ...nextArgs]);
      };
    }
  };
}`,
      hints: [
        {
          en: "Compare args.length with fn.length. If sufficient, execute fn; otherwise return a new function collecting more args.",
          vi: "So sánh args.length với fn.length. Nếu đã đủ đối số thì thực thi fn; ngược lại trả về hàm mới để gom tiếp đối số."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_12",
    title: {
      en: "Reactive State Store with Subscriptions",
      vi: "Kho Quản Lý Trạng Thái Phản Ứng Với Cơ Chế Đăng Ký (Subscriptions)"
    },
    description: {
      en: "Create a state factory `createStore(initialState)` using closures that returns `{ getState(), setState(updaterOrPartial), subscribe(listener) }`. `subscribe` should return an `unsubscribe()` function. When state updates, all active listeners must be notified with `(newState, prevState)`.",
      vi: "Tạo hàm factory `createStore(initialState)` sử dụng closure trả về `{ getState(), setState(updaterOrPartial), subscribe(listener) }`. Phương thức `subscribe` phải trả về hàm `unsubscribe()`. Khi state thay đổi, tất cả listener đang kích hoạt phải được gọi với `(newState, prevState)`."
    },
    starterCode: `function createStore(initialState) {
  // Implement reactive store closure
}

const store = createStore({ count: 0 });
const unsub = store.subscribe((newState, oldState) => {
  console.log(\`Count changed from \${oldState.count} to \${newState.count}\`);
});

store.setState({ count: 1 }); // logs change
unsub();
store.setState({ count: 2 }); // no log (unsubscribed)`,
    solutionCode: `function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState() {
      return state;
    },
    setState(updater) {
      const prevState = state;
      const nextState = typeof updater === 'function' ? updater(state) : { ...state, ...updater };

      if (nextState !== prevState) {
        state = nextState;
        for (const listener of listeners) {
          listener(state, prevState);
        }
      }
    },
    subscribe(listener) {
      if (typeof listener === 'function') {
        listeners.add(listener);
      }
      return function unsubscribe() {
        listeners.delete(listener);
      };
    }
  };
}`,
    hints: [
      {
        en: "Keep state and a Set of listeners in closure. In subscribe(), return an unsubscribe arrow function that deletes the listener from the Set.",
        vi: "Lưu giữ state và một Set các listener trong closure. Trong subscribe(), trả về hàm unsubscribe để xóa listener khỏi Set."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_12_1",
      type: "single_choice",
      question: {
        en: "What is a Closure in JavaScript?",
        vi: "Closure trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "A function bundled with references to its surrounding lexical environment, allowing access to outer variables even after the outer function finishes execution", vi: "Một hàm gắn liền với tham chiếu đến môi trường tĩnh (lexical environment) bao quanh nó, cho phép truy cập biến ngoài ngay cả sau khi hàm cha đã kết thúc" } },
        { id: "b", text: { en: "A way to close browser windows programmatically", vi: "Một cách để đóng cửa sổ trình duyệt bằng code" } },
        { id: "c", text: { en: "A syntax error that halts execution", vi: "Một lỗi cú pháp làm dừng chương trình" } },
        { id: "d", text: { en: "An HTML tag closing element", vi: "Một thẻ đóng phần tử trong HTML" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "A closure retains access to variables in its outer scope chain throughout its entire lifecycle.",
        vi: "Closure duy trì quyền truy cập vào các biến trong chuỗi scope cha trong suốt vòng đời của hàm đó."
      }
    },
    {
      id: "js_q_12_2",
      type: "predict_output",
      question: {
        en: "What will `console.log` output?\n```js\nfunction outer() {\n  let x = 10;\n  return function() {\n    x += 5;\n    return x;\n  };\n}\nconst fn1 = outer();\nconsole.log(fn1());\nconsole.log(fn1());\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nfunction outer() {\n  let x = 10;\n  return function() {\n    x += 5;\n    return x;\n  };\n}\nconst fn1 = outer();\nconsole.log(fn1());\nconsole.log(fn1());\n```"
      },
      options: [
        { id: "a", text: { en: "15, then 20", vi: "15, sau đó 20" } },
        { id: "b", text: { en: "15, then 15", vi: "15, sau đó 15" } },
        { id: "c", text: { en: "NaN, then NaN", vi: "NaN, sau đó NaN" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`fn1` maintains a closure over `x`. The first call increments `x` to 15, and the second call increments the same `x` to 20.",
        vi: "`fn1` duy trì một closure bao quanh biến `x`. Lần gọi đầu tăng `x` lên 15, lần gọi thứ hai tiếp tục tăng biến `x` đó lên 20."
      }
    },
    {
      id: "js_q_12_3",
      type: "predict_output",
      question: {
        en: "What will `console.log` output when creating two separate closure instances?\n```js\nfunction createMultiplier(factor) {\n  return n => n * factor;\n}\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconsole.log(double(5), triple(5));\n```",
        vi: "Đoạn mã sau sẽ in ra gì khi khởi tạo hai instance closure độc lập?\n```js\nfunction createMultiplier(factor) {\n  return n => n * factor;\n}\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconsole.log(double(5), triple(5));\n```"
      },
      options: [
        { id: "a", text: { en: "10 15", vi: "10 15" } },
        { id: "b", text: { en: "15 15", vi: "15 15" } },
        { id: "c", text: { en: "10 10", vi: "10 10" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Each invocation of `createMultiplier` creates an independent execution context and separate closure binding for `factor`.",
        vi: "Mỗi lần gọi `createMultiplier` sinh ra một execution context độc lập và một closure riêng biệt lưu giá trị `factor` tương ứng."
      }
    },
    {
      id: "js_q_12_4",
      type: "single_choice",
      question: {
        en: "Where are variables captured by active closures stored in the JavaScript engine memory model?",
        vi: "Các biến được closure tham chiếu được lưu ở đâu trong mô hình bộ nhớ của engine JavaScript?"
      },
      options: [
        { id: "a", text: { en: "On the Heap (in a heap-allocated Lexical Environment record), so they persist after the Call Stack frame pops", vi: "Trên bộ nhớ Heap (trong bản ghi Lexical Environment), giúp chúng tồn tại ngay cả sau khi frame Call Stack đã bị đẩy ra" } },
        { id: "b", text: { en: "Strictly in the CPU L1 Cache", vi: "Chỉ nằm trong CPU L1 Cache" } },
        { id: "c", text: { en: "In browser IndexedDB", vi: "Trong IndexedDB trình duyệt" } },
        { id: "d", text: { en: "In the ROM memory", vi: "Trong bộ nhớ ROM" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Because stack frames are destroyed upon function return, variables needed by surviving inner functions are allocated in the heap.",
        vi: "Vì khung stack frame bị hủy khi hàm return, các biến cần thiết cho hàm con được chuyển sang lưu trữ trên bộ nhớ Heap."
      }
    },
    {
      id: "js_q_12_5",
      type: "single_choice",
      question: {
        en: "What is Function Currying in JavaScript?",
        vi: "Kỹ thuật Function Currying trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "Translating a function with multiple arguments into a sequence of functions, each taking a single argument", vi: "Kỹ thuật chuyển đổi một hàm nhận nhiều tham số thành một chuỗi các hàm liên tiếp, mỗi hàm chỉ nhận một tham số" } },
        { id: "b", text: { en: "Encrypting function parameters with SHA-256", vi: "Mã hóa tham số hàm bằng SHA-256" } },
        { id: "c", text: { en: "Executing functions in parallel across Web Workers", vi: "Chạy các hàm song song trên nhiều Web Worker" } },
        { id: "d", text: { en: "Converting functions into strings", vi: "Chuyển đổi hàm thành chuỗi ký tự" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Currying transforms `f(a, b, c)` into callable chain `f(a)(b)(c)` using closures to accumulate arguments.",
        vi: "Currying biến đổi `f(a, b, c)` thành chuỗi gọi hàm `f(a)(b)(c)` bằng cách dùng closure để tích lũy dần các tham số."
      }
    },
    {
      id: "js_q_12_6",
      type: "predict_output",
      question: {
        en: "What will `console.log` output in the classic closure scoping test?\n```js\nconst funcs = [];\nfor (var i = 0; i < 3; i++) {\n  funcs.push(() => i);\n}\nconsole.log(funcs[0](), funcs[1](), funcs[2]());\n```",
        vi: "Đoạn mã sau sẽ in ra gì trong bài toán kiểm tra phạm vi closure kinh điển?\n```js\nconst funcs = [];\nfor (var i = 0; i < 3; i++) {\n  funcs.push(() => i);\n}\nconsole.log(funcs[0](), funcs[1](), funcs[2]());\n```"
      },
      options: [
        { id: "a", text: { en: "3 3 3", vi: "3 3 3" } },
        { id: "b", text: { en: "0 1 2", vi: "0 1 2" } },
        { id: "c", text: { en: "undefined undefined undefined", vi: "undefined undefined undefined" } },
        { id: "d", text: { en: "0 0 0", vi: "0 0 0" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Because `var i` is function-scoped, all 3 arrow functions close over the exact same `i` variable whose final value is 3.",
        vi: "Vì `var i` có phạm vi hàm, cả 3 hàm mũi tên đều cùng trỏ vào một biến `i` duy nhất có giá trị cuối cùng là 3."
      }
    },
    {
      id: "js_q_12_7",
      type: "single_choice",
      question: {
        en: "How can you fix the loop closure bug above so `funcs[0]()` returns 0, `funcs[1]()` returns 1, etc.?",
        vi: "Làm thế nào để sửa lỗi closure trong vòng lặp trên để `funcs[0]()` trả về 0, `funcs[1]()` trả về 1...?"
      },
      options: [
        { id: "a", text: { en: "Replace `var i = 0` with `let i = 0` (block scoping creates a fresh binding per iteration)", vi: "Thay `var i = 0` bằng `let i = 0` (phạm vi khối tạo một binding độc lập cho mỗi vòng lặp)" } },
        { id: "b", text: { en: "Use `const i = 0`", vi: "Dùng `const i = 0`" } },
        { id: "c", text: { en: "Call funcs.reverse()", vi: "Gọi funcs.reverse()" } },
        { id: "d", text: { en: "Use a while loop instead", vi: "Dùng vòng lặp while thay thế" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Changing `var` to `let` creates a distinct lexical environment for every iteration, capturing the unique `i` for each closure.",
        vi: "Đổi `var` sang `let` tạo một lexical environment độc lập cho mỗi bước lặp, giúp mỗi closure lưu giữ giá trị `i` riêng biệt."
      }
    },
    {
      id: "js_q_12_8",
      type: "fill_blank",
      question: {
        en: "The stack data structure used by the JavaScript engine to track active function calls and execution contexts is the _____ Stack.",
        vi: "Cấu trúc dữ liệu ngăn xếp được engine JavaScript sử dụng để theo dõi các hàm đang gọi và ngữ cảnh thực thi là _____ Stack."
      },
      correctAnswer: "Call",
      explanation: {
        en: "The Call Stack manages function invocation frames and execution contexts in LIFO order.",
        vi: "Call Stack quản lý các khung gọi hàm và ngữ cảnh thực thi theo cơ chế vào sau ra trước (LIFO)."
      }
    },
    {
      id: "js_q_12_9",
      type: "single_choice",
      question: {
        en: "How does a closure enable data encapsulation (private variables)?",
        vi: "Closure hỗ trợ đóng gói dữ liệu (tạo biến riêng tư) như thế nào?"
      },
      options: [
        { id: "a", text: { en: "Variables declared inside the outer function are inaccessible from outside code, but accessible to returned inner methods", vi: "Các biến khai báo trong hàm cha không thể truy cập từ bên ngoài, nhưng các phương thức con được trả về vẫn truy cập và chỉnh sửa được" } },
        { id: "b", text: { en: "By encrypting variable names with base64", vi: "Bằng cách mã hóa tên biến bằng base64" } },
        { id: "c", text: { en: "By running in a sandboxed iframe", vi: "Bằng cách chạy trong một iframe cô lập" } },
        { id: "d", text: { en: "By converting variables to Symbols", vi: "Bằng cách chuyển các biến thành Symbol" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Outer variables are completely hidden from the global scope, forming a secure private state accessible only via exposed closure methods.",
        vi: "Biến của hàm cha hoàn toàn ẩn khỏi scope toàn cục, tạo thành private state chỉ có thể thao tác qua các phương thức do closure cung cấp."
      }
    },
    {
      id: "js_q_12_10",
      type: "code_reasoning",
      question: {
        en: "Why can an unremoved event listener inside a single-page app cause a severe memory leak through closures?",
        vi: "Tại sao một event listener không được gỡ bỏ trong ứng dụng SPA có thể gây rò rỉ bộ nhớ nghiêm trọng thông qua closure?"
      },
      options: [
        { id: "a", text: { en: "The event listener callback retains a closure over the component's scope and DOM nodes, preventing the Garbage Collector from freeing the entire component tree", vi: "Callback của event listener giữ closure tham chiếu tới scope của component và các thẻ DOM, ngăn cản Garbage Collector giải phóng bộ nhớ của toàn bộ component đó" } },
        { id: "b", text: { en: "Event listeners crash the V8 compiler", vi: "Event listener làm sập trình biên dịch V8" } },
        { id: "c", text: { en: "Because browser limits listeners to 10", vi: "Vì trình duyệt giới hạn tối đa 10 listener" } },
        { id: "d", text: { en: "Because DOM nodes are stored in cookies", vi: "Vì các DOM node được lưu trong cookie" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "As long as the DOM or window holds a reference to the listener, the entire lexical environment captured by the closure stays alive in memory.",
        vi: "Chừng nào window hoặc DOM còn giữ listener, toàn bộ lexical environment mà closure đó tham chiếu tới sẽ không bao giờ được giải phóng khỏi bộ nhớ."
      }
    }
  ]
};

// Write Lesson 11 and 12
fs.writeFileSync(path.join(dir, 'lesson11.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson11: Lesson = ${JSON.stringify(lesson11, null, 2)};\nexport default lesson11;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson12.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson12: Lesson = ${JSON.stringify(lesson12, null, 2)};\nexport default lesson12;\n`, 'utf8');
console.log('Lessons 11 and 12 generated.');
