import { Lesson } from '../../../../types';

export const lesson03: Lesson = {
  "id": "js_lesson_3",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_1",
  "order": 3,
  "title": {
    "en": "Data Types: Primitives vs Reference Objects",
    "vi": "Kiểu Dữ Liệu: Giá Trị Nguyên Thủy vs Đối Tượng Tham Chiếu"
  },
  "summary": {
    "en": "Deep dive into the 7 primitive types, Object references, memory stack vs heap allocation, and typeof edge cases.",
    "vi": "Nghiên cứu chuyên sâu 7 kiểu nguyên thủy, tham chiếu Object, mô hình bộ nhớ Stack vs Heap và các ngoại lệ của toán tử typeof."
  },
  "estimatedMinutes": 20,
  "topicId": "js_data_types",
  "learn": {
    "introduction": {
      "en": "JavaScript values are divided into two fundamental categories: Primitives and Reference Objects. Primitives are immutable and copied by value directly on the call stack. Reference types (Objects, Arrays, Functions, Dates) are mutable and stored in the heap, with variables holding pointers to their heap memory address. Mastering this distinction is crucial to preventing unintended side-effects and bugs.",
      "vi": "Các giá trị trong JavaScript được chia thành 2 nhóm căn bản: Kiểu nguyên thủy (Primitives) và Đối tượng tham chiếu (Reference Objects). Kiểu nguyên thủy là bất biến (immutable) và được sao chép theo giá trị trên Call Stack. Kiểu tham chiếu (Objects, Arrays, Functions) là khả biến (mutable), được lưu trên Heap và biến chỉ giữ con trỏ địa chỉ bộ nhớ. Hiểu rõ sự khác biệt này giúp bạn tránh các lỗi biến đổi dữ liệu ngoài ý muốn."
    },
    "conceptExplanation": {
      "en": "1. The 7 Primitive Types: `string`, `number` (IEEE 754 64-bit float), `bigint` (arbitrary precision integers), `boolean` (`true`/`false`), `undefined` (unassigned variable default), `null` (intentional absence of value), and `symbol` (unique immutable identifier).\n\n2. Reference Types: `Object`, `Array`, `Function`, `Map`, `Set`, `Date`, `RegExp`. When passing or assigning an object, you pass a reference to the existing heap structure, not a separate clone.\n\n3. `typeof` Operator & Its Quirks: `typeof 'text'` -> `'string'`, `typeof 42` -> `'number'`, `typeof true` -> `'boolean'`, `typeof undefined` -> `'undefined'`, `typeof Symbol()` -> `'symbol'`, `typeof 10n` -> `'bigint'`, `typeof {}` -> `'object'`, `typeof []` -> `'object'`, `typeof function(){}` -> `'function'`. Historical bug: `typeof null` returns `'object'`.\n\n4. Shallow vs Deep Copying: Shallow copies (`{ ...obj }`, `Object.assign()`, `[...arr]`) duplicate top-level keys but nested objects still share memory references. Deep copies (`structuredClone(obj)`) duplicate entire nested object graphs safely.",
      "vi": "1. 7 Kiểu Dữ Liệu Nguyên Thủy: `string`, `number` (số thực 64-bit chuẩn IEEE 754), `bigint` (số nguyên lớn vô hạn), `boolean` (`true`/`false`), `undefined` (biến chưa được gán), `null` (chủ đích không có giá trị), và `symbol` (định danh duy nhất bất biến).\n\n2. Kiểu Dữ Liệu Tham Chiếu: `Object`, `Array`, `Function`, `Map`, `Set`, `Date`. Khi gán hoặc truyền object vào hàm, bạn đang truyền con trỏ tham chiếu đến vùng nhớ Heap chứ không phải tạo bản sao mới.\n\n3. Toán tử `typeof` & Các trường hợp đặc biệt: `typeof null` trả về `'object'` (lỗi lịch sử từ bản JS đầu tiên), `typeof []` là `'object'`, và `typeof function(){}` trả về `'function'`.\n\n4. Sao chép Nông (Shallow) vs Sâu (Deep): Sao chép nông (`{ ...obj }`, `[...arr]`) chỉ sao chép thuộc tính cấp 1, các object lồng nhau vẫn dùng chung tham chiếu. Sao chép sâu (`structuredClone(obj)`) sao chép toàn bộ cây đối tượng độc lập."
    },
    "syntax": "// 1. Primitive copy by value\nlet x = 42;\nlet y = x;\ny = 100;\nconsole.log(x); // 42 (Unchanged)\n\n// 2. Reference copy by memory pointer\nconst userA = { name: \"Alice\", role: \"Dev\" };\nconst userB = userA;\nuserB.role = \"Lead\";\nconsole.log(userA.role); // \"Lead\" (Mutated!)\n\n// 3. Deep cloning with modern structuredClone API\nconst original = { id: 1, profile: { bio: \"Coder\" } };\nconst deepClone = structuredClone(original);\ndeepClone.profile.bio = \"Architect\";\nconsole.log(original.profile.bio); // \"Coder\" (Preserved!)",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Differentiating Primitives, Shallow Copies and Deep Copies",
          "vi": "Phân Biệt Kiểu Nguyên Thủy, Shallow Copy và Deep Copy"
        },
        "description": {
          "en": "Demonstrates how object mutations propagate through shared references versus deep isolated clones.",
          "vi": "Minh họa cách thay đổi dữ liệu lan truyền qua tham chiếu dùng chung so với bản sao sâu độc lập."
        },
        "code": "const state = {\n  version: 1,\n  metadata: { author: \"System\", tags: [\"core\", \"security\"] }\n};\n\n// Shallow copy with spread\nconst shallowCopy = { ...state };\nshallowCopy.version = 2; // Independent primitive\nshallowCopy.metadata.author = \"Admin\"; // Mutates shared state.metadata!\n\nconsole.log(\"Original author:\", state.metadata.author); // \"Admin\"\n\n// Deep copy with structuredClone\nconst independentClone = structuredClone(state);\nindependentClone.metadata.author = \"Root\";\nconsole.log(\"Original author after deep clone:\", state.metadata.author); // Still \"Admin\""
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using `typeof val === 'null'` to check for null values.",
          "vi": "Dùng `typeof val === 'null'` để kiểm tra giá trị null."
        },
        "correction": {
          "en": "Use strict equality `val === null`.",
          "vi": "Sử dụng so sánh nghiêm ngặt `val === null`."
        }
      }
    ],
    "tips": [
      {
        "en": "Use structuredClone() for deep object duplication: Avoid `JSON.parse(JSON.stringify(obj))` for deep copies because it loses Dates, RegExps, Maps, Sets, and undefined values. Modern `structuredClone()` handles them reliably.",
        "vi": "Dùng structuredClone() để sao chép sâu các cấu trúc đối tượng phức tạp: Tránh dùng `JSON.parse(JSON.stringify(obj))` vì nó làm mất Date, Map, Set, RegExp và undefined. Hàm chuẩn `structuredClone()` xử lý chính xác và tối ưu."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_3_1",
      "type": "complete_code",
      "title": {
        "en": "Accurate Type Inspector Function",
        "vi": "Xây Dựng Hàm Kiểm Tra Kiểu Dữ Liệu Chính Xác"
      },
      "instruction": {
        "en": "Implement a function `getExactType(value)` that returns exact type strings: 'null', 'array', 'object', 'date', 'regexp', 'number', 'string', 'boolean', 'undefined', 'bigint', 'symbol', or 'function'.",
        "vi": "Cài đặt hàm `getExactType(value)` trả về chuỗi tên kiểu chính xác: 'null', 'array', 'object', 'date', 'regexp', 'number', 'string', 'boolean', 'undefined', 'bigint', 'symbol' hoặc 'function'."
      },
      "starterCode": "function getExactType(value) {\n  // Your code here\n}\n\nconsole.log(getExactType(null)); // 'null'\nconsole.log(getExactType([1, 2])); // 'array'",
      "solutionCode": "function getExactType(value) {\n  if (value === null) return 'null';\n  if (Array.isArray(value)) return 'array';\n  if (value instanceof Date) return 'date';\n  if (value instanceof RegExp) return 'regexp';\n  return typeof value;\n}",
      "hint": {
        "en": "Check value === null first, Array.isArray(value), then instance checks, before falling back to typeof.",
        "vi": "Kiểm tra value === null trước, sau đó dùng Array.isArray(value), instanceof và cuối cùng là typeof."
      }
    },
    {
      "id": "js_ex_3_2",
      "type": "complete_code",
      "title": {
        "en": "Safe State Updater (Immutability)",
        "vi": "Hàm Cập Nhật Trạng Thái An Toàn Bất Biến"
      },
      "instruction": {
        "en": "Write a function `updateUserProfile(user, newSkills)` that takes a user object with a nested `skills` array, and returns a new user object with `newSkills` appended without mutating the input user object.",
        "vi": "Viết hàm `updateUserProfile(user, newSkills)` nhận vào user có mảng lồng `skills`, trả về một user mới đã được thêm `newSkills` mà không làm thay đổi user truyền vào."
      },
      "starterCode": "function updateUserProfile(user, newSkills) {\n  // Return fresh object without mutating input\n}\n\nconst current = { id: 10, skills: [\"JS\", \"CSS\"] };\nconst next = updateUserProfile(current, [\"Node\"]);\nconsole.log(current.skills); // Should still be [\"JS\", \"CSS\"]",
      "solutionCode": "function updateUserProfile(user, newSkills) {\n  return {\n    ...user,\n    skills: [...user.skills, ...newSkills]\n  };\n}",
      "hint": {
        "en": "Spread the outer user object and create a fresh skills array with [...user.skills, ...newSkills].",
        "vi": "Spread đối tượng user ngoài và tạo mảng skills mới với [...user.skills, ...newSkills]."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_3",
    "title": {
      "en": "Deep Object Difference Engine",
      "vi": "Engine So Sánh & Tìm Điểm Khác Biệt Giữa 2 Đối Tượng"
    },
    "description": {
      "en": "Build a function `findObjectDiff(objA, objB)` that recursively compares two objects and returns an object detailing changed properties with `{ oldValue, newValue }`. Ignore matching keys.",
      "vi": "Xây dựng hàm `findObjectDiff(objA, objB)` so sánh đệ quy 2 đối tượng và trả về một đối tượng chứa các thuộc tính bị thay đổi `{ oldValue, newValue }`. Bỏ qua các trường có giá trị bằng nhau."
    },
    "starterCode": "function findObjectDiff(objA, objB) {\n  // Implement recursive object diff\n}\n\nconst oldConfig = { theme: \"light\", env: { debug: false, port: 3000 } };\nconst newConfig = { theme: \"dark\", env: { debug: true, port: 3000 } };\nconsole.log(findObjectDiff(oldConfig, newConfig));\n// { theme: { oldValue: 'light', newValue: 'dark' }, 'env.debug': { oldValue: false, newValue: true } }",
    "solutionCode": "function findObjectDiff(objA, objB, prefix = '') {\n  const diffs = {};\n  const allKeys = new Set([...Object.keys(objA || {}), ...Object.keys(objB || {})]);\n\n  allKeys.forEach(key => {\n    const fullPath = prefix ? `${prefix}.${key}` : key;\n    const valA = objA ? objA[key] : undefined;\n    const valB = objB ? objB[key] : undefined;\n\n    if (valA !== valB) {\n      if (\n        typeof valA === 'object' && valA !== null &&\n        typeof valB === 'object' && valB !== null &&\n        !Array.isArray(valA) && !Array.isArray(valB)\n      ) {\n        Object.assign(diffs, findObjectDiff(valA, valB, fullPath));\n      } else {\n        diffs[fullPath] = { oldValue: valA, newValue: valB };\n      }\n    }\n  });\n\n  return diffs;\n}",
    "hints": [
      {
        "en": "Use recursive traversal for nested plain objects and record differences at the dotted key path.",
        "vi": "Duyệt đệ quy với các object lồng nhau và lưu lại các thay đổi theo đường dẫn key phân tách bằng dấu chấm."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Deep Object Difference Engine according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine So Sánh & Tìm Điểm Khác Biệt Giữa 2 Đối Tượng theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_3_1",
      "type": "single_choice",
      "question": {
        "en": "Which of the following is NOT a JavaScript primitive data type?",
        "vi": "Kiểu dữ liệu nào sau đây KHÔNG phải là kiểu nguyên thủy (primitive) trong JavaScript?"
      },
      "options": [
        {
          "en": "Symbol",
          "vi": "Symbol"
        },
        {
          "en": "BigInt",
          "vi": "BigInt"
        },
        {
          "en": "Array",
          "vi": "Array"
        },
        {
          "en": "Undefined",
          "vi": "Undefined"
        }
      ],
      "correctAnswers": [
        2
      ],
      "explanation": {
        "en": "Array is a specialized Object subtype (reference type). The 7 primitives are string, number, bigint, boolean, undefined, symbol, and null.",
        "vi": "Array là một dạng đối tượng tham chiếu đặc biệt. 7 kiểu nguyên thủy gồm string, number, bigint, boolean, undefined, symbol và null."
      },
      "topicId": "js_data_types",
      "difficulty": "easy"
    },
    {
      "id": "js_q_3_2",
      "type": "predict_output",
      "question": {
        "en": "What is the return value of `typeof null` in standard JavaScript?",
        "vi": "Giá trị trả về của `typeof null` trong JavaScript chuẩn là gì?"
      },
      "options": [
        {
          "en": "'null'",
          "vi": "'null'"
        },
        {
          "en": "'object'",
          "vi": "'object'"
        },
        {
          "en": "'undefined'",
          "vi": "'undefined'"
        },
        {
          "en": "'primitive'",
          "vi": "'primitive'"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "Due to a historical legacy bug in JS type tag bit representation, `typeof null` evaluates to `'object'`.",
        "vi": "Do lỗi biểu diễn bit phân loại kiểu từ phiên bản JS đầu tiên, `typeof null` luôn trả về `'object'`."
      },
      "topicId": "js_data_types",
      "difficulty": "easy"
    },
    {
      "id": "js_q_3_3",
      "type": "predict_output",
      "question": {
        "en": "What is the output of the following code?\n```js\nconst arr1 = [1, 2, 3];\nconst arr2 = arr1;\narr2.push(4);\nconsole.log(arr1.length);\n```",
        "vi": "Kết quả in ra của đoạn mã sau là gì?\n```js\nconst arr1 = [1, 2, 3];\nconst arr2 = arr1;\narr2.push(4);\nconsole.log(arr1.length);\n```"
      },
      "options": [
        {
          "en": "3",
          "vi": "3"
        },
        {
          "en": "4",
          "vi": "4"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "`arr1` and `arr2` point to the exact same array in heap memory, so mutating via `arr2` affects `arr1`.",
        "vi": "`arr1` và `arr2` cùng trỏ đến một mảng duy nhất trong heap memory, do đó thao tác push trên `arr2` làm thay đổi độ dài của `arr1`."
      },
      "topicId": "js_data_types",
      "difficulty": "easy"
    },
    {
      "id": "js_q_3_4",
      "type": "single_choice",
      "question": {
        "en": "How are BigInt values created in modern JavaScript?",
        "vi": "Giá trị BigInt được tạo ra như thế nào trong JavaScript hiện đại?"
      },
      "options": [
        {
          "en": "Appending an 'n' suffix (e.g. 9007199254740991n) or calling BigInt()",
          "vi": "Thêm hậu tố 'n' (ví dụ 9007199254740991n) hoặc gọi hàm BigInt()"
        },
        {
          "en": "Using new Number.Big()",
          "vi": "Dùng new Number.Big()"
        },
        {
          "en": "Using the int64 keyword",
          "vi": "Dùng từ khóa int64"
        },
        {
          "en": "Importing from 'math/bigint'",
          "vi": "Import từ thư viện 'math/bigint'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "BigInt literals use the `n` suffix (e.g., `12345678901234567890n`) or the `BigInt(val)` function.",
        "vi": "BigInt được định nghĩa bằng hậu tố `n` (ví dụ `12345678901234567890n`) hoặc gọi hàm `BigInt(val)`."
      },
      "topicId": "js_data_types",
      "difficulty": "medium"
    },
    {
      "id": "js_q_3_5",
      "type": "single_choice",
      "question": {
        "en": "What is the primary benefit of the Symbol primitive type?",
        "vi": "Lợi ích chính của kiểu dữ liệu nguyên thủy Symbol là gì?"
      },
      "options": [
        {
          "en": "Creating guaranteed unique, non-colliding object property keys",
          "vi": "Tạo các key thuộc tính đối tượng duy nhất, đảm bảo không bao giờ bị xung đột tên"
        },
        {
          "en": "Compressing memory footprint by 50%",
          "vi": "Nén dung lượng bộ nhớ xuống 50%"
        },
        {
          "en": "Enabling multi-threaded concurrency",
          "vi": "Bật khả năng đa luồng đồng thời"
        },
        {
          "en": "Encrypting string values",
          "vi": "Mã hóa các giá trị chuỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Every `Symbol()` call generates an immutable, guaranteed unique token suitable for private/internal object keys.",
        "vi": "Mỗi lời gọi `Symbol()` sinh ra một token duy nhất không trùng lặp, rất thích hợp làm key ẩn/nội bộ cho object."
      },
      "topicId": "js_data_types",
      "difficulty": "medium"
    },
    {
      "id": "js_q_3_6",
      "type": "predict_output",
      "question": {
        "en": "What will `Symbol('id') === Symbol('id')` evaluate to?",
        "vi": "`Symbol('id') === Symbol('id')` sẽ trả về giá trị gì?"
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
        1
      ],
      "explanation": {
        "en": "Symbols are always distinct and unique, even if created with identical description strings.",
        "vi": "Các Symbol luôn luôn độc nhất, ngay cả khi được tạo với chuỗi mô tả hoàn toàn giống nhau."
      },
      "topicId": "js_data_types",
      "difficulty": "medium"
    },
    {
      "id": "js_q_3_7",
      "type": "single_choice",
      "question": {
        "en": "What native JavaScript function performs a standard deep copy of an object graph?",
        "vi": "Hàm tích hợp sẵn nào trong JavaScript chuẩn thực hiện sao chép sâu (deep copy) một cây đối tượng?"
      },
      "options": [
        {
          "en": "structuredClone()",
          "vi": "structuredClone()"
        },
        {
          "en": "Object.clone()",
          "vi": "Object.clone()"
        },
        {
          "en": "Array.deep()",
          "vi": "Array.deep()"
        },
        {
          "en": "Reflect.duplicate()",
          "vi": "Reflect.duplicate()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`structuredClone()` is the modern standard Web API and Node.js function for deep cloning serializable JavaScript data structures.",
        "vi": "`structuredClone()` là hàm chuẩn hiện đại trong Web API và Node.js để sao chép sâu các cấu trúc dữ liệu JavaScript."
      },
      "topicId": "js_data_types",
      "difficulty": "medium"
    },
    {
      "id": "js_q_3_8",
      "type": "fill_blank",
      "question": {
        "en": "To reliably determine if a value is an Array in JavaScript, you call Array._____().",
        "vi": "Để kiểm tra một giá trị có phải là Mảng hay không một cách đáng tin cậy, bạn gọi Array._____()."
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
        "en": "Array.isArray(val) reliably checks across iframe boundaries, whereas `instanceof Array` can fail across execution contexts.",
        "vi": "Array.isArray(val) kiểm tra chính xác mảng ngay cả giữa các iframe khác nhau, trong khi `instanceof Array` có thể thất bại khi khác context."
      },
      "topicId": "js_data_types",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "isarray"
      ]
    },
    {
      "id": "js_q_3_9",
      "type": "single_choice",
      "question": {
        "en": "Where are primitive values vs object instances typically allocated in the JavaScript engine memory model?",
        "vi": "Các giá trị nguyên thủy vs đối tượng thường được cấp phát ở đâu trong mô hình bộ nhớ của engine JavaScript?"
      },
      "options": [
        {
          "en": "Primitives on the Call Stack; Objects in the Heap",
          "vi": "Giá trị nguyên thủy trên Call Stack; Đối tượng trên Heap"
        },
        {
          "en": "Primitives in the Heap; Objects in the Stack",
          "vi": "Giá trị nguyên thủy trên Heap; Đối tượng trên Stack"
        },
        {
          "en": "Both exclusively on the CPU Registers",
          "vi": "Cả hai chỉ lưu trên CPU Registers"
        },
        {
          "en": "In browser LocalStorage",
          "vi": "Trong LocalStorage trình duyệt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Fixed-size primitive values are stored directly on the execution stack frame; dynamic-size objects are allocated in the heap with pointers on the stack.",
        "vi": "Các giá trị nguyên thủy kích thước cố định được lưu trực tiếp trên Stack; các đối tượng có kích thước động được cấp phát trên Heap và trỏ qua con trỏ trên Stack."
      },
      "topicId": "js_data_types",
      "difficulty": "hard"
    },
    {
      "id": "js_q_3_10",
      "type": "single_choice",
      "question": {
        "en": "Why does `let s = 'hello'; s[0] = 'H'; console.log(s);` still log 'hello'?",
        "vi": "Tại sao `let s = 'hello'; s[0] = 'H'; console.log(s);` vẫn in ra 'hello'?"
      },
      "options": [
        {
          "en": "Strings in JavaScript are immutable primitives; index mutations fail silently (or throw in strict mode)",
          "vi": "Chuỗi trong JavaScript là kiểu nguyên thủy bất biến; phép gán theo chỉ số bị bỏ qua trong im lặng (hoặc báo lỗi trong strict mode)"
        },
        {
          "en": "Strings must be converted to Buffer first",
          "vi": "Chuỗi phải chuyển thành Buffer trước"
        },
        {
          "en": "Because let prevents variable reassignment",
          "vi": "Vì let ngăn gán lại giá trị"
        },
        {
          "en": "Unicode characters cannot be capitalized",
          "vi": "Ký tự Unicode không thể viết hoa"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "All primitives including strings are completely immutable in JavaScript. Individual characters cannot be overwritten by index assignment.",
        "vi": "Mọi giá trị nguyên thủy bao gồm chuỗi đều là bất biến. Bạn không thể thay đổi từng ký tự bên trong chuỗi thông qua phép gán chỉ số."
      },
      "topicId": "js_data_types",
      "difficulty": "hard"
    }
  ]
};
export default lesson03;
