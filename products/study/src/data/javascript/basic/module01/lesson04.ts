import { Lesson } from '../../../../types';

export const lesson04: Lesson = {
  "id": "js_lesson_4",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_1",
  "order": 4,
  "title": {
    "en": "Type Coercion, Equality (== vs ===) & Truthiness",
    "vi": "Ép Kiểu Tự Động, So Sánh (== vs ===) & Giá Trị Truthy/Falsy"
  },
  "summary": {
    "en": "Master implicit vs explicit type coercion, the Abstract Equality Comparison algorithm, truthy/falsy rules, and short-circuit operators.",
    "vi": "Làm chủ ép kiểu ngầm định vs tường minh, thuật toán so sánh trừu tượng, quy tắc truthy/falsy và các toán tử đoản mạch (short-circuit)."
  },
  "estimatedMinutes": 20,
  "topicId": "js_coercion_truthy",
  "learn": {
    "introduction": {
      "en": "JavaScript is a dynamically and weakly typed language, meaning the runtime automatically converts values between types when operations involve mismatched types (implicit type coercion). While coercion provides flexibility, unexpected implicit conversions are one of the most frequent sources of runtime bugs in web development. In this lesson, you will master the exact rules of explicit conversions, strict vs loose equality, and conditional truthiness.",
      "vi": "JavaScript là ngôn ngữ định kiểu động và lỏng lẻo (weakly typed), nghĩa là runtime sẽ tự động chuyển đổi kiểu dữ liệu khi các toán hạng không cùng kiểu (ép kiểu ngầm định - implicit coercion). Mặc dù linh hoạt, ép kiểu ngầm định là nguyên nhân hàng đầu gây ra các lỗi tiềm ẩn. Bài học này sẽ giúp bạn làm chủ quy tắc ép kiểu tường minh, phân biệt triệt để `==` vs `===` và quy tắc xét điều kiện truthy/falsy."
    },
    "conceptExplanation": {
      "en": "1. The 8 Falsy Values in JavaScript: When evaluated in boolean contexts, exactly 8 values coerce to `false`: `false`, `0`, `-0`, `0n` (BigInt zero), `\"\"` (empty string), `null`, `undefined`, and `NaN`. Everything else in JavaScript is TRUTHY (including `[]`, `{}`, `'0'`, and `'false'`).\n\n2. Strict Equality (`===`) vs Loose Equality (`==`): `===` checks both value AND type without coercion. `==` performs the complex Abstract Equality Comparison algorithm, attempting to coerce operands to matching primitives before comparing.\n\n3. Explicit Type Conversion: Best practice is always explicit conversion using `Number(val)`, `String(val)`, `Boolean(val)`, or `parseInt(str, 10)`.\n\n4. Logical Short-Circuit Operators: `&&` (returns first falsy operand or the last truthy), `||` (returns first truthy operand or the last falsy), and `??` (Nullish Coalescing - returns right side ONLY if left side is `null` or `undefined`, preserving `0`, `\"\"`, and `false`).",
      "vi": "1. 8 Giá Trị Falsy Trong JavaScript: Khi ép về boolean, chỉ có đúng 8 giá trị trở thành `false`: `false`, `0`, `-0`, `0n`, `\"\"` (chuỗi rỗng), `null`, `undefined`, và `NaN`. Tất cả các giá trị còn lại đều là TRUTHY (kể cả mảng rỗng `[]`, object rỗng `{}`, chuỗi `'0'`, chuỗi `'false'`).\n\n2. So Sánh Tuyệt Đối (`===`) vs So Sánh Tương Đối (`==`): `===` so sánh cả giá trị VÀ kiểu dữ liệu mà không ép kiểu. `==` thực hiện thuật toán ép kiểu tự động đầy rủi ro trước khi so sánh.\n\n3. Ép Kiểu Tường Minh: Luôn ưu tiên ép kiểu rõ ràng bằng `Number(val)`, `String(val)`, `Boolean(val)` hoặc `parseInt(str, 10)`.\n\n4. Các Toán Tử Đoản Mạch: `&&` (trả về giá trị falsy đầu tiên hoặc giá trị cuối), `||` (trả về giá trị truthy đầu tiên), và `??` (Nullish Coalescing - chỉ lấy vế phải khi vế trái là `null` hoặc `undefined`, giữ lại `0`, `\"\"` và `false`)."
    },
    "syntax": "// 1. Strict vs Loose equality\nconsole.log(0 == false);   // true (Dangerous coercion)\nconsole.log(0 === false);  // false (Correct strict check)\n\nconsole.log(\"\" == 0);      // true\nconsole.log(\"\" === 0);     // false\n\n// 2. Truthy/Falsy & Short-circuiting\nconst userCount = 0;\n// || replaces 0 because 0 is falsy!\nconst displayA = userCount || \"Default 10\"; // \"Default 10\" (Bug!)\n\n// ?? (Nullish coalescing) only triggers on null / undefined\nconst displayB = userCount ?? 10;           // 0 (Correct!)\n\n// 3. Explicit conversions\nconst rawInput = \"42.85px\";\nconst numericVal = parseFloat(rawInput);    // 42.85\nconst boolFlag = Boolean(numericVal);       // true",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Configuration Fallback with Nullish Coalescing (??) vs Logical OR (||)",
          "vi": "Xử Lý Giá Trị Mặc Định Bằng Nullish Coalescing (??) vs Logical OR (||)"
        },
        "description": {
          "en": "Demonstrates why ?? is essential when 0, empty string, or false are valid business values.",
          "vi": "Minh họa lý do tại sao ?? là cần thiết khi số 0, chuỗi rỗng hoặc false là các giá trị hợp lệ."
        },
        "code": "function buildServerConfig(customOptions = {}) {\n  return {\n    port: customOptions.port ?? 8080,\n    timeoutMs: customOptions.timeoutMs ?? 5000,\n    allowGuest: customOptions.allowGuest ?? false,\n    bannerText: customOptions.bannerText ?? \"Welcome to API\"\n  };\n}\n\n// Even with 0 timeout or false guest, nullish coalescing preserves user intent!\nconst custom = { timeoutMs: 0, allowGuest: false, bannerText: \"\" };\nconsole.log(buildServerConfig(custom));\n// { port: 8080, timeoutMs: 0, allowGuest: false, bannerText: \"\" }"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using `||` for default parameter fallbacks when `0` or `false` are valid inputs.",
          "vi": "Dùng `||` để gán giá trị mặc định khi `0` hoặc `false` là các giá trị đầu vào hợp lệ."
        },
        "correction": {
          "en": "Use the Nullish Coalescing operator `??` instead.",
          "vi": "Sử dụng toán tử Nullish Coalescing `??` thay thế."
        }
      }
    ],
    "tips": [
      {
        "en": "Always use triple equals (===) for equality comparisons: Enforce strict equality throughout your codebase to eliminate unexpected type coercion anomalies and subtle security vulnerabilities.",
        "vi": "Luôn dùng toán tử 3 dấu bằng (===) để so sánh bằng: Sử dụng so sánh nghiêm ngặt `===` và `!==` trong toàn bộ mã nguồn để loại trừ hoàn toàn các hành vi ép kiểu bất thường."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_4_1",
      "type": "complete_code",
      "title": {
        "en": "Strict Form Validator",
        "vi": "Bộ Kiểm Tra Tính Hợp Lệ Của Form Nghiêm Ngặt"
      },
      "instruction": {
        "en": "Implement a function `validateSubmission(payload)` that checks: `username` must be a non-empty string, `age` must be a valid number >= 18 (not NaN), and `agreedTerms` must strictly equal boolean `true`. Return `{ isValid: boolean, error?: string }`.",
        "vi": "Cài đặt hàm `validateSubmission(payload)` kiểm tra: `username` phải là chuỗi không rỗng, `age` phải là số hợp lệ >= 18 (không phải NaN) và `agreedTerms` phải bằng đúng boolean `true`. Trả về `{ isValid: boolean, error?: string }`."
      },
      "starterCode": "function validateSubmission(payload) {\n  // Validate strictly without coercion bugs\n}\n\nconsole.log(validateSubmission({ username: \"alex\", age: \"20\", agreedTerms: true }));",
      "solutionCode": "function validateSubmission(payload) {\n  if (!payload || typeof payload !== 'object') {\n    return { isValid: false, error: 'Invalid payload' };\n  }\n  if (typeof payload.username !== 'string' || payload.username.trim() === '') {\n    return { isValid: false, error: 'Username must be a non-empty string' };\n  }\n  const age = typeof payload.age === 'number' ? payload.age : Number(payload.age);\n  if (isNaN(age) || age < 18) {\n    return { isValid: false, error: 'Age must be at least 18' };\n  }\n  if (payload.agreedTerms !== true) {\n    return { isValid: false, error: 'Must accept terms' };\n  }\n  return { isValid: true };\n}",
      "hint": {
        "en": "Check typeof payload.username === 'string', trim it, convert age explicitly with Number(payload.age), and check payload.agreedTerms === true.",
        "vi": "Kiểm tra typeof payload.username === 'string', trim chuỗi, ép kiểu age rõ ràng bằng Number() và kiểm tra payload.agreedTerms === true."
      }
    },
    {
      "id": "js_ex_4_2",
      "type": "complete_code",
      "title": {
        "en": "Filter Non-Empty Falsy Safe List",
        "vi": "Lọc Danh Sách Giữ Lại Các Giá Trị Hợp Lệ"
      },
      "instruction": {
        "en": "Write a function `cleanRecordValues(record)` that removes properties that are strictly `null` or `undefined`, but keeps `0`, `false`, and `\"\"` intact.",
        "vi": "Viết hàm `cleanRecordValues(record)` loại bỏ các thuộc tính có giá trị là `null` hoặc `undefined`, nhưng giữ nguyên các giá trị `0`, `false` và `\"\"`."
      },
      "starterCode": "function cleanRecordValues(record) {\n  // Return new object without null or undefined properties\n}\n\nconsole.log(cleanRecordValues({ a: 0, b: null, c: false, d: undefined, e: \"valid\" }));\n// Should return: { a: 0, c: false, e: \"valid\" }",
      "solutionCode": "function cleanRecordValues(record) {\n  const result = {};\n  for (const key of Object.keys(record)) {\n    if (record[key] !== null && record[key] !== undefined) {\n      result[key] = record[key];\n    }\n  }\n  return result;\n}",
      "hint": {
        "en": "Iterate over keys and include properties only when record[key] !== null && record[key] !== undefined.",
        "vi": "Lặp qua các key và chỉ đưa vào kết quả khi record[key] !== null && record[key] !== undefined."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_4",
    "title": {
      "en": "Enterprise Query String Parser & Coercer",
      "vi": "Bộ Phân Tích & Ép Kiểu Tham Số Query String Doanh Nghiệp"
    },
    "description": {
      "en": "Create a function `parseQueryString(queryString)` that parses a URL query string (e.g. `?page=1&active=true&discount=0&tags=js,css&filter=null`) into a typed JavaScript object where numeric strings convert to Numbers, 'true'/'false' convert to Booleans, 'null' converts to null, comma lists convert to arrays, and URL encodings are decoded.",
      "vi": "Xây dựng hàm `parseQueryString(queryString)` phân tích chuỗi query (ví dụ `?page=1&active=true&discount=0&tags=js,css&filter=null`) thành đối tượng JS có kiểu dữ liệu chuẩn: chuỗi số thành Number, 'true'/'false' thành Boolean, 'null' thành null, danh sách phân cách bởi dấu phẩy thành mảng và giải mã ký tự URL."
    },
    "starterCode": "function parseQueryString(queryString) {\n  // Parse and coerce types\n}\n\nconst params = parseQueryString(\"?page=2&limit=50&active=true&score=0&tags=frontend,react&author=null\");\nconsole.log(params);",
    "solutionCode": "function parseQueryString(queryString) {\n  if (!queryString) return {};\n  const cleaned = queryString.startsWith('?') ? queryString.slice(1) : queryString;\n  if (!cleaned) return {};\n\n  const result = {};\n  const pairs = cleaned.split('&');\n\n  for (const pair of pairs) {\n    if (!pair) continue;\n    const [rawKey, rawVal] = pair.split('=');\n    const key = decodeURIComponent(rawKey);\n    const val = rawVal !== undefined ? decodeURIComponent(rawVal) : '';\n\n    if (val === 'true') {\n      result[key] = true;\n    } else if (val === 'false') {\n      result[key] = false;\n    } else if (val === 'null') {\n      result[key] = null;\n    } else if (val === 'undefined') {\n      result[key] = undefined;\n    } else if (!isNaN(Number(val)) && val.trim() !== '') {\n      result[key] = Number(val);\n    } else if (val.includes(',')) {\n      result[key] = val.split(',').map(s => s.trim());\n    } else {\n      result[key] = val;\n    }\n  }\n\n  return result;\n}",
    "hints": [
      {
        "en": "Split by '&', split each item by '=', decodeURIComponent, and check against 'true', 'false', 'null', numbers, and commas.",
        "vi": "Cắt chuỗi theo '&', sau đó cắt từng cặp theo '=', dùng decodeURIComponent và đối chiếu lần lượt với 'true', 'false', 'null', số và dấu phẩy."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Enterprise Query String Parser & Coercer according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Phân Tích & Ép Kiểu Tham Số Query String Doanh Nghiệp theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_4_1",
      "type": "single_choice",
      "question": {
        "en": "Which of the following values is TRUTHY in JavaScript?",
        "vi": "Giá trị nào sau đây là TRUTHY trong JavaScript?"
      },
      "options": [
        {
          "en": "[] (empty array)",
          "vi": "[] (mảng rỗng)"
        },
        {
          "en": "0",
          "vi": "0"
        },
        {
          "en": "\"\" (empty string)",
          "vi": "\"\" (chuỗi rỗng)"
        },
        {
          "en": "NaN",
          "vi": "NaN"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In JavaScript, all objects and arrays (even empty `[]` and `{}`) are truthy. Only the 8 falsy values evaluate to false.",
        "vi": "Trong JavaScript, mọi object và mảng (kể cả mảng rỗng `[]` và `{}`) đều là truthy. Chỉ có 8 giá trị falsy chuẩn mới mang giá trị false."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "easy"
    },
    {
      "id": "js_q_4_2",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log([] == false)` output?",
        "vi": "`console.log([] == false)` sẽ in ra kết quả gì?"
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
        "en": "Loose equality coerces `[]` to primitive `\"\"`, and `false` to `0`. Then `\"\" == 0` coerces `\"\"` to `0`, resulting in `0 == 0` which is `true`.",
        "vi": "So sánh `==` ép kiểu `[]` thành chuỗi `\"\"`, và `false` thành `0`. Tiếp tục `\"\" == 0` ép `\"\"` thành `0`, dẫn đến `0 == 0` là `true`."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "easy"
    },
    {
      "id": "js_q_4_3",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log([] === false)` output?",
        "vi": "`console.log([] === false)` sẽ in ra kết quả gì?"
      },
      "options": [
        {
          "en": "false",
          "vi": "false"
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
        "en": "Strict equality `===` does not perform coercion. An Object (Array) and a Boolean are different types, so it immediately returns `false`.",
        "vi": "So sánh nghiêm ngặt `===` không ép kiểu. Một Object (mảng) và một Boolean khác kiểu nhau nên ngay lập tức trả về `false`."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "easy"
    },
    {
      "id": "js_q_4_4",
      "type": "single_choice",
      "question": {
        "en": "What is the key difference between the `||` (logical OR) and `??` (nullish coalescing) operators?",
        "vi": "Điểm khác biệt cốt lõi giữa toán tử `||` (OR) và `??` (Nullish Coalescing) là gì?"
      },
      "options": [
        {
          "en": "`||` triggers on any falsy value (0, false, \"\"); `??` triggers ONLY on null and undefined",
          "vi": "`||` kích hoạt với bất kỳ giá trị falsy nào (0, false, \"\"); `??` CHỈ kích hoạt khi giá trị là null hoặc undefined"
        },
        {
          "en": "`??` is asynchronous while `||` is synchronous",
          "vi": "`??` là bất đồng bộ còn `||` là đồng bộ"
        },
        {
          "en": "`||` only works with numbers",
          "vi": "`||` chỉ hoạt động với số"
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
        "en": "`??` only falls back when the left operand is null or undefined, preserving 0, empty strings, and false.",
        "vi": "`??` chỉ gán giá trị dự phòng khi vế trái là null hoặc undefined, bảo tồn các giá trị 0, chuỗi rỗng và false."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "medium"
    },
    {
      "id": "js_q_4_5",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log(1 + '2' + 3)` output?",
        "vi": "`console.log(1 + '2' + 3)` sẽ in ra kết quả gì?"
      },
      "options": [
        {
          "en": "'123'",
          "vi": "'123'"
        },
        {
          "en": "6",
          "vi": "6"
        },
        {
          "en": "'33'",
          "vi": "'33'"
        },
        {
          "en": "NaN",
          "vi": "NaN"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`1 + '2'` coerces 1 to string, resulting in `'12'`. Then `'12' + 3` concatenates to `'123'`.",
        "vi": "`1 + '2'` ép số 1 thành chuỗi và nối thành `'12'`. Sau đó `'12' + 3` tiếp tục nối chuỗi thành `'123'`."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "medium"
    },
    {
      "id": "js_q_4_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log('10' - 2)` output?",
        "vi": "`console.log('10' - 2)` sẽ in ra kết quả gì?"
      },
      "options": [
        {
          "en": "8",
          "vi": "8"
        },
        {
          "en": "'8'",
          "vi": "'8'"
        },
        {
          "en": "NaN",
          "vi": "NaN"
        },
        {
          "en": "'10-2'",
          "vi": "'10-2'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Unlike `+` which supports string concatenation, the `-` subtraction operator strictly coerces both operands to Numbers, giving `10 - 2 = 8`.",
        "vi": "Khác với `+` có thể dùng để nối chuỗi, toán tử trừ `-` luôn ép cả hai toán hạng sang kiểu số, tạo ra `10 - 2 = 8`."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "medium"
    },
    {
      "id": "js_q_4_7",
      "type": "single_choice",
      "question": {
        "en": "How does `Number.isNaN(val)` differ from global `isNaN(val)`?",
        "vi": "`Number.isNaN(val)` khác với hàm toàn cục `isNaN(val)` như thế nào?"
      },
      "options": [
        {
          "en": "`Number.isNaN()` does NOT coerce the input and only returns true if the value is strictly NaN of type number",
          "vi": "`Number.isNaN()` KHÔNG ép kiểu và chỉ trả về true nếu giá trị là kiểu number và có giá trị đúng là NaN"
        },
        {
          "en": "`Number.isNaN()` is deprecated",
          "vi": "`Number.isNaN()` đã bị khai tử"
        },
        {
          "en": "Global `isNaN()` is faster in benchmarks",
          "vi": "Hàm toàn cục `isNaN()` chạy nhanh hơn"
        },
        {
          "en": "They are completely identical aliases",
          "vi": "Chúng là hai alias hoàn toàn giống nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Global `isNaN('hello')` coerces `'hello'` to `NaN` and returns `true`. `Number.isNaN('hello')` does not coerce and correctly returns `false`.",
        "vi": "Hàm toàn cục `isNaN('hello')` tự ép chuỗi sang NaN và trả về `true` (dễ gây hiểu nhầm). `Number.isNaN('hello')` kiểm tra chuẩn xác không ép kiểu và trả về `false`."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "medium"
    },
    {
      "id": "js_q_4_8",
      "type": "fill_blank",
      "question": {
        "en": "In modern JavaScript, the double-question mark operator (??) is known as the _____ coalescing operator.",
        "vi": "Trong JavaScript hiện đại, toán tử hai dấu chấm hỏi (??) được gọi là toán tử _____ coalescing."
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
        "en": "The `??` operator is formally named the Nullish Coalescing operator in ECMAScript.",
        "vi": "Toán tử `??` có tên gọi chuẩn trong đặc tả ECMAScript là Nullish Coalescing operator."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "nullish"
      ]
    },
    {
      "id": "js_q_4_9",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log(null == undefined)` evaluate to?",
        "vi": "`console.log(null == undefined)` sẽ trả về giá trị gì?"
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
        "en": "In the ECMAScript Abstract Equality algorithm, `null == undefined` is explicitly defined to evaluate to `true` (while `null === undefined` is `false`).",
        "vi": "Theo thuật toán Abstract Equality của ECMAScript, quy tắc quy định `null == undefined` luôn là `true` (trong khi `null === undefined` là `false`)."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "hard"
    },
    {
      "id": "js_q_4_10",
      "type": "single_choice",
      "question": {
        "en": "What is the result of `const val = '' && 'hello'; console.log(val);`?",
        "vi": "Kết quả của đoạn mã `const val = '' && 'hello'; console.log(val);` là gì?"
      },
      "options": [
        {
          "en": "'' (empty string)",
          "vi": "'' (chuỗi rỗng)"
        },
        {
          "en": "'hello'",
          "vi": "'hello'"
        },
        {
          "en": "false",
          "vi": "false"
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
        "en": "The `&&` operator short-circuits and returns the first falsy operand encountered (here, the empty string `''`).",
        "vi": "Toán tử `&&` thực hiện đoản mạch và trả về ngay giá trị falsy đầu tiên mà nó gặp (ở đây là chuỗi rỗng `''`)."
      },
      "topicId": "js_coercion_truthy",
      "difficulty": "hard"
    }
  ]
};
export default lesson04;
