import { Lesson } from '../../../../types';

export const lesson10: Lesson = {
  "id": "js_lesson_10",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_2",
  "order": 10,
  "title": {
    "en": "Objects: Properties, Methods, Computed Keys & Destructuring",
    "vi": "Đối Tượng (Objects): Thuộc Tính, Phương Thức, Computed Keys & Destructuring"
  },
  "summary": {
    "en": "Master object literal enhancements, method shorthand, computed property names, object spread/rest, and advanced object destructuring patterns.",
    "vi": "Làm chủ cú pháp object nâng cao, viết tắt phương thức, tên thuộc tính tính toán (computed keys), object spread/rest và kỹ thuật bóc tách (destructuring) chuyên sâu."
  },
  "estimatedMinutes": 20,
  "topicId": "js_objects_destructuring",
  "learn": {
    "introduction": {
      "en": "Objects are the foundational key-value data structure in JavaScript. ES6 brought dramatic syntax improvements to object authoring: property value shorthands, concise method syntax, dynamically evaluated computed property names `[expr]`, and powerful destructuring assignments with default values and renaming.",
      "vi": "Đối tượng (Object) là cấu trúc dữ liệu key-value cốt lõi trong JavaScript. Phiên bản ES6 đã mang lại nhiều cải tiến cú pháp: viết tắt tên thuộc tính, cú pháp khai báo phương thức ngắn gọn, tên thuộc tính động (computed property names `[expr]`) và cú pháp bóc tách (destructuring) đối tượng với giá trị mặc định và đổi tên biến."
    },
    "conceptExplanation": {
      "en": "1. Object Literal Shorthands: `{ name, age }` instead of `{ name: name, age: age }`, and `greet() {}` instead of `greet: function() {}`.\n\n2. Computed Property Names: Use square brackets `[dynamicKey]: value` inside object literals to evaluate runtime variables or expressions as property names.\n\n3. Object Spread & Rest (`...`): Shallow copy or merge objects with `{ ...defaults, ...overrides }`. Gather unextracted properties using rest syntax `{ id, ...meta }`.\n\n4. Advanced Object Destructuring: Unpack nested properties, provide fallback defaults, and rename keys: `const { user: { email: userEmail = 'default@mail.com' } } = response;`.",
      "vi": "1. Viết Tắt Object Literal: `{ name, age }` thay cho `{ name: name, age: age }`, và `greet() {}` thay cho `greet: function() {}`.\n\n2. Tên Thuộc Tính Động (Computed Property Names): Dùng dấu ngoặc vuông `[dynamicKey]: value` bên trong object literal để lấy giá trị của biến hoặc biểu thức làm tên key lúc runtime.\n\n3. Object Spread & Rest (`...`): Sao chép nông hoặc gộp đối tượng với `{ ...defaults, ...overrides }`. Gom các thuộc tính còn lại bằng cú pháp rest `{ id, ...meta }`.\n\n4. Kỹ Thuật Bóc Tách (Destructuring) Nâng Cao: Trích xuất thuộc tính lồng nhau, đặt giá trị mặc định dự phòng và đổi tên biến: `const { user: { email: userEmail = 'default@mail.com' } } = response;`."
    },
    "syntax": "// 1. Computed property keys & method shorthand\nconst dynamicField = \"apiKey\";\nconst service = {\n  name: \"AuthService\",\n  [dynamicField]: \"secret_token_123\",\n  connect() {\n    return `Connecting ${this.name}...`;\n  }\n};\n\n// 2. Object spread & merging (rightmost overrides leftmost)\nconst baseConfig = { port: 3000, debug: false, env: \"dev\" };\nconst prodConfig = { ...baseConfig, debug: true, env: \"prod\" };\n\n// 3. Destructuring with renaming, defaults, and rest\nconst payload = { id: \"USR-1\", profile: { username: \"alex\" } };\nconst {\n  id: userId,\n  profile: { username, role = \"Guest\" },\n  ...extra\n} = payload;",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Immutable Redux-Style State Dispatcher",
          "vi": "Bộ Cập Nhật Trạng Thái Phong Cách Redux Bất Biến"
        },
        "description": {
          "en": "Demonstrates merging configs and stripping sensitive fields with rest/spread destructuring.",
          "vi": "Minh họa gộp cấu hình và loại bỏ các trường nhạy cảm bằng cú pháp destructuring rest/spread."
        },
        "code": "function sanitizeUserResponse(rawDbRecord) {\n  // Strip out sensitive password and hash fields using rest destructuring\n  const { password, saltHash, internalFlags, ...safeUser } = rawDbRecord;\n\n  return {\n    ...safeUser,\n    sanitizedAt: new Date().toISOString(),\n    displayName: `${safeUser.firstName} ${safeUser.lastName}`\n  };\n}\n\nconst dbRecord = {\n  id: 42,\n  firstName: \"Elena\",\n  lastName: \"Rostova\",\n  password: \"super_secret_hash\",\n  saltHash: \"abc99\",\n  internalFlags: { isBanned: false }\n};\n\nconsole.log(sanitizeUserResponse(dbRecord));"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Destructuring properties from undefined or null without a default object fallback.",
          "vi": "Bóc tách thuộc tính từ undefined hoặc null mà không có giá trị đối tượng mặc định dự phòng."
        },
        "correction": {
          "en": "Default the outer object: `const { name } = options || {};` or `function fn({ name = '' } = {})`.",
          "vi": "Đặt mặc định cho object ngoài: `const { name } = options || {};` hoặc `function fn({ name = '' } = {})`."
        }
      }
    ],
    "tips": [
      {
        "en": "Use named parameter destructuring for functions with >2 arguments: Instead of positional arguments `createButton(label, color, size, onClick, disabled)`, use `createButton({ label, color = 'blue', size = 'md', onClick, disabled = false } = {})`.",
        "vi": "Dùng tham số đối tượng destructuring cho các hàm nhận trên 2 đối số: Thay vì dùng nhiều đối số theo thứ tự dễ nhầm lẫn, hãy dùng destructuring đối tượng để gọi hàm tường minh và hỗ trợ tham số tùy chọn."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_10_1",
      "type": "complete_code",
      "title": {
        "en": "Clean Payload Sanitizer with Rest Destructuring",
        "vi": "Bộ Lọc Dữ Liệu An Toàn Bằng Rest Destructuring"
      },
      "instruction": {
        "en": "Write a function `sanitizePayload(payload, keysToRemove)` that takes an object and an array of property names, and returns a new object containing all properties except the specified ones, without modifying the input object.",
        "vi": "Viết hàm `sanitizePayload(payload, keysToRemove)` nhận một object và mảng tên các thuộc tính cần loại bỏ, trả về object mới chứa toàn bộ các trường ngoại trừ các trường bị cấm mà không sửa đổi object đầu vào."
      },
      "starterCode": "function sanitizePayload(payload, keysToRemove) {\n  // Return sanitized object\n}\n\nconst input = { a: 1, b: 2, c: 3, secret: \"xyz\", token: \"123\" };\nconsole.log(sanitizePayload(input, [\"secret\", \"token\"])); // { a: 1, b: 2, c: 3 }",
      "solutionCode": "function sanitizePayload(payload, keysToRemove) {\n  const result = {};\n  const removeSet = new Set(keysToRemove);\n  for (const key of Object.keys(payload)) {\n    if (!removeSet.has(key)) {\n      result[key] = payload[key];\n    }\n  }\n  return result;\n}",
      "hint": {
        "en": "Iterate Object.keys(payload) and copy keys that are not in keysToRemove into a fresh object.",
        "vi": "Duyệt Object.keys(payload) và sao chép các key không nằm trong keysToRemove sang đối tượng mới."
      }
    },
    {
      "id": "js_ex_10_2",
      "type": "complete_code",
      "title": {
        "en": "Dynamic Dictionary Builder with Computed Keys",
        "vi": "Tạo Bảng Tra Cứu Động Bằng Computed Property Names"
      },
      "instruction": {
        "en": "Write a function `createLookupTable(items, keyField)` that transforms an array of objects into a single lookup dictionary keyed by each item's `[keyField]` property.",
        "vi": "Viết hàm `createLookupTable(items, keyField)` chuyển đổi một mảng đối tượng thành một từ điển tra cứu có key là giá trị của thuộc tính `[keyField]` của từng phần tử."
      },
      "starterCode": "function createLookupTable(items, keyField) {\n  // Build lookup dictionary\n}\n\nconst users = [\n  { id: \"u_1\", name: \"Alice\" },\n  { id: \"u_2\", name: \"Bob\" }\n];\nconsole.log(createLookupTable(users, \"id\"));\n// { u_1: { id: \"u_1\", name: \"Alice\" }, u_2: { id: \"u_2\", name: \"Bob\" } }",
      "solutionCode": "function createLookupTable(items, keyField) {\n  return items.reduce((table, item) => {\n    const key = item[keyField];\n    if (key !== undefined) {\n      table[key] = item;\n    }\n    return table;\n  }, {});\n}",
      "hint": {
        "en": "Use reduce() with an initial empty object `{}` and assign `table[item[keyField]] = item`.",
        "vi": "Dùng reduce() với giá trị khởi tạo `{}` và gán `table[item[keyField]] = item`."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_10",
    "title": {
      "en": "Deep Object Property Flattener & Unflattener",
      "vi": "Engine Làm Phẳng & Tái Cấu Trúc Đối Tượng Lồng Nhau"
    },
    "description": {
      "en": "Create an object utility with two methods: `flatten(obj)` which converts nested objects into dot-notated flat keys (e.g. `{ a: { b: 1 } }` -> `{ 'a.b': 1 }`), and `unflatten(flatObj)` which reconstructs the original nested object hierarchy from dot-notated keys.",
      "vi": "Tạo một tiện ích đối tượng gồm hai phương thức: `flatten(obj)` chuyển đổi đối tượng lồng nhau thành các key phẳng phân cách bằng dấu chấm (ví dụ `{ a: { b: 1 } }` -> `{ 'a.b': 1 }`), và `unflatten(flatObj)` tái tạo lại cấu trúc đối tượng lồng nhau ban đầu."
    },
    "starterCode": "const ObjectTransformer = {\n  flatten(obj) {\n    // Implement flattener\n  },\n  unflatten(flatObj) {\n    // Implement unflattener\n  }\n};\n\nconst nested = { user: { profile: { name: \"Alex\" }, age: 30 } };\nconst flat = ObjectTransformer.flatten(nested);\nconsole.log(flat); // { 'user.profile.name': 'Alex', 'user.age': 30 }\nconsole.log(ObjectTransformer.unflatten(flat)); // Matches nested",
    "solutionCode": "const ObjectTransformer = {\n  flatten(obj, prefix = '') {\n    const result = {};\n    for (const key of Object.keys(obj || {})) {\n      const fullPath = prefix ? `${prefix}.${key}` : key;\n      const val = obj[key];\n      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {\n        Object.assign(result, this.flatten(val, fullPath));\n      } else {\n        result[fullPath] = val;\n      }\n    }\n    return result;\n  },\n  unflatten(flatObj) {\n    const root = {};\n    for (const pathKey of Object.keys(flatObj || {})) {\n      const keys = pathKey.split('.');\n      let current = root;\n      for (let i = 0; i < keys.length; i++) {\n        const k = keys[i];\n        if (i === keys.length - 1) {\n          current[k] = flatObj[pathKey];\n        } else {\n          current[k] = current[k] || {};\n          current = current[k];\n        }\n      }\n    }\n    return root;\n  }\n};",
    "hints": [
      {
        "en": "For flatten: recursively join prefixes with dots. For unflatten: split keys by '.' and navigate/create child objects.",
        "vi": "Với flatten: nối tiền tố bằng dấu chấm đệ quy. Với unflatten: tách key theo dấu '.' và điều hướng tạo các object con."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Deep Object Property Flattener & Unflattener according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine Làm Phẳng & Tái Cấu Trúc Đối Tượng Lồng Nhau theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_10_1",
      "type": "single_choice",
      "question": {
        "en": "What is the syntax for a Computed Property Name in an object literal?",
        "vi": "Cú pháp cho Tên Thuộc Tính Động (Computed Property Name) trong object literal là gì?"
      },
      "options": [
        {
          "en": "{ [expression]: value }",
          "vi": "{ [expression]: value }"
        },
        {
          "en": "{ (expression): value }",
          "vi": "{ (expression): value }"
        },
        {
          "en": "{ ${expression}: value }",
          "vi": "{ ${expression}: value }"
        },
        {
          "en": "{ @expression: value }",
          "vi": "{ @expression: value }"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Square brackets `[expr]` inside an object literal evaluate the enclosed expression dynamically as the property key.",
        "vi": "Dấu ngoặc vuông `[expr]` bên trong object literal đánh giá biểu thức bên trong để làm key của thuộc tính lúc chạy."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "easy"
    },
    {
      "id": "js_q_10_2",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output?\n```js\nconst key = 'role';\nconst user = { name: 'Alex', [key]: 'Admin' };\nconsole.log(user.role);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nconst key = 'role';\nconst user = { name: 'Alex', [key]: 'Admin' };\nconsole.log(user.role);\n```"
      },
      "options": [
        {
          "en": "'Admin'",
          "vi": "'Admin'"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "'role'",
          "vi": "'role'"
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
        "en": "`[key]` evaluates the variable `key` (which is `'role'`), creating property `role: 'Admin'`.",
        "vi": "`[key]` đánh giá biến `key` (có giá trị `'role'`), tạo ra thuộc tính `role: 'Admin'`."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "easy"
    },
    {
      "id": "js_q_10_3",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` print?\n```js\nconst a = { x: 1, y: 2 };\nconst b = { y: 10, z: 20 };\nconst c = { ...a, ...b };\nconsole.log(c.y);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nconst a = { x: 1, y: 2 };\nconst b = { y: 10, z: 20 };\nconst c = { ...a, ...b };\nconsole.log(c.y);\n```"
      },
      "options": [
        {
          "en": "10",
          "vi": "10"
        },
        {
          "en": "2",
          "vi": "2"
        },
        {
          "en": "[2, 10]",
          "vi": "[2, 10]"
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
        "en": "When spreading multiple objects, rightmost objects overwrite matching keys from earlier objects, so `b.y` overrides `a.y`.",
        "vi": "Khi spread nhiều object, object xuất hiện sau cùng sẽ ghi đè các key trùng nhau của object trước, nên `b.y` ghi đè `a.y`."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "easy"
    },
    {
      "id": "js_q_10_4",
      "type": "single_choice",
      "question": {
        "en": "How do you rename a variable during object destructuring?",
        "vi": "Cách đổi tên biến khi bóc tách (destructuring) thuộc tính đối tượng là gì?"
      },
      "options": [
        {
          "en": "const { originalKey: newVarName } = obj;",
          "vi": "const { originalKey: newVarName } = obj;"
        },
        {
          "en": "const { originalKey as newVarName } = obj;",
          "vi": "const { originalKey as newVarName } = obj;"
        },
        {
          "en": "const { originalKey -> newVarName } = obj;",
          "vi": "const { originalKey -> newVarName } = obj;"
        },
        {
          "en": "const { originalKey = newVarName } = obj;",
          "vi": "const { originalKey = newVarName } = obj;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`const { key: alias } = obj;` maps the value of property `key` to a new local constant named `alias`.",
        "vi": "`const { key: alias } = obj;` gán giá trị của thuộc tính `key` cho một biến cục bộ mới có tên `alias`."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "medium"
    },
    {
      "id": "js_q_10_5",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` print?\n```js\nconst user = { name: 'Elena' };\nconst { name, role = 'Standard' } = user;\nconsole.log(role);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nconst user = { name: 'Elena' };\nconst { name, role = 'Standard' } = user;\nconsole.log(role);\n```"
      },
      "options": [
        {
          "en": "'Standard'",
          "vi": "'Standard'"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "null",
          "vi": "null"
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
        "en": "Because `user.role` is `undefined`, the default fallback value `'Standard'` is assigned.",
        "vi": "Vì `user.role` là `undefined`, giá trị mặc định dự phòng `'Standard'` sẽ được gán cho biến."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "medium"
    },
    {
      "id": "js_q_10_6",
      "type": "single_choice",
      "question": {
        "en": "What happens when attempting to destructure from `null` or `undefined` (e.g. `const { a } = null;`)?",
        "vi": "Điều gì xảy ra khi cố gắng bóc tách thuộc tính từ `null` hoặc `undefined` (ví dụ `const { a } = null;`)?"
      },
      "options": [
        {
          "en": "Throws a TypeError: Cannot destructure property of null/undefined",
          "vi": "Ném lỗi TypeError: Cannot destructure property of null/undefined"
        },
        {
          "en": "Assigns `a = undefined` silently",
          "vi": "Tự động gán `a = undefined` trong im lặng"
        },
        {
          "en": "Assigns `a = null`",
          "vi": "Gán `a = null`"
        },
        {
          "en": "Creates an empty object",
          "vi": "Tạo một đối tượng rỗng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Destructuring expects an object. Attempting to unpack `null` or `undefined` triggers a fatal TypeError.",
        "vi": "Cú pháp destructuring yêu cầu một đối tượng. Cố bóc tách từ `null` hay `undefined` sẽ gây lỗi TypeError."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "medium"
    },
    {
      "id": "js_q_10_7",
      "type": "fill_blank",
      "question": {
        "en": "To collect remaining unmatched object properties during destructuring, use the _____ operator with variable name (e.g. `const { id, ...rest } = obj`).",
        "vi": "Để thu gom các thuộc tính còn lại chưa được bóc tách trong object, sử dụng toán tử _____ đi kèm tên biến (ví dụ `const { id, ...rest } = obj`)."
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
        "en": "The rest operator `...` in object destructuring gathers unextracted keys into a new object.",
        "vi": "Toán tử rest `...` trong destructuring gom các trường chưa bóc tách vào một object mới."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "rest"
      ]
    },
    {
      "id": "js_q_10_8",
      "type": "single_choice",
      "question": {
        "en": "What is the ES6 Property Value Shorthand?",
        "vi": "Quy tắc viết tắt giá trị thuộc tính (Property Value Shorthand) trong ES6 là gì?"
      },
      "options": [
        {
          "en": "When the property name matches the variable name, you can write `{ x }` instead of `{ x: x }`",
          "vi": "Khi tên thuộc tính trùng với tên biến, bạn có thể viết `{ x }` thay vì `{ x: x }`"
        },
        {
          "en": "Properties are automatically compressed to 1 byte",
          "vi": "Các thuộc tính tự động được nén lại thành 1 byte"
        },
        {
          "en": "Properties starting with _ are automatically private",
          "vi": "Thuộc tính bắt đầu bằng _ tự động trở thành private"
        },
        {
          "en": "All functions must return objects",
          "vi": "Mọi hàm đều phải trả về object"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "ES6 allows `{ x, y }` as shorthand for `{ x: x, y: y }`.",
        "vi": "ES6 cho phép viết ngắn gọn `{ x, y }` thay cho `{ x: x, y: y }` khi tên key trùng tên biến."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "hard"
    },
    {
      "id": "js_q_10_9",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output?\n```js\nconst { a, ...b } = { a: 1, x: 10, y: 20 };\nconsole.log(b);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nconst { a, ...b } = { a: 1, x: 10, y: 20 };\nconsole.log(b);\n```"
      },
      "options": [
        {
          "en": "{ x: 10, y: 20 }",
          "vi": "{ x: 10, y: 20 }"
        },
        {
          "en": "{ a: 1, x: 10, y: 20 }",
          "vi": "{ a: 1, x: 10, y: 20 }"
        },
        {
          "en": "[10, 20]",
          "vi": "[10, 20]"
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
        "en": "`a` extracts `1`, and `b` gathers the remaining properties `{ x: 10, y: 20 }` into a new object.",
        "vi": "`a` lấy giá trị `1`, và biến rest `b` gom toàn bộ các trường còn lại `{ x: 10, y: 20 }` thành một object mới."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "hard"
    },
    {
      "id": "js_q_10_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `{ ...defaults, ...options }` considered a shallow merge rather than a deep merge?",
        "vi": "Tại sao `{ ...defaults, ...options }` được coi là phép gộp nông (shallow merge) chứ không phải gộp sâu (deep merge)?"
      },
      "options": [
        {
          "en": "Nested objects in `options` completely replace nested objects in `defaults` instead of recursively merging their internal properties",
          "vi": "Các object con lồng nhau trong `options` sẽ thay thế hoàn toàn object con trong `defaults` thay vì đệ quy gộp từng thuộc tính bên trong"
        },
        {
          "en": "Spread operator can only handle numbers",
          "vi": "Toán tử spread chỉ hoạt động với số"
        },
        {
          "en": "It only works on arrays",
          "vi": "Nó chỉ chạy được trên mảng"
        },
        {
          "en": "Because it requires async execution",
          "vi": "Vì nó yêu cầu thực thi bất đồng bộ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Spread only copies top-level properties. If both objects contain `theme: { dark: true }` and `theme: { fontSize: 14 }`, the second `theme` replaces the first completely.",
        "vi": "Toán tử spread chỉ sao chép thuộc tính ở cấp 1. Nếu cả 2 cùng chứa object con `theme`, object `theme` phía sau sẽ ghi đè đứt đoạn object `theme` phía trước."
      },
      "topicId": "js_objects_destructuring",
      "difficulty": "hard"
    }
  ]
};
export default lesson10;
