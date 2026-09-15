import { Lesson } from '../../../../types';

export const lesson05: Lesson = {
  "id": "js_lesson_5",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_1",
  "order": 5,
  "title": {
    "en": "Strings, Template Literals & Modern String Manipulation",
    "vi": "Chuỗi Ký Tự, Template Literals & Xử Lý Chuỗi Hiện Đại"
  },
  "summary": {
    "en": "Master string slicing, pattern searching (includes, startsWith), replacement with replaceAll, template literal interpolation, and tagged templates.",
    "vi": "Làm chủ trích xuất chuỗi (slice), tìm kiếm mẫu (includes, startsWith), thay thế chuỗi với replaceAll, chèn biểu thức template literals và hàm gắn thẻ tagged templates."
  },
  "estimatedMinutes": 20,
  "topicId": "js_strings_templates",
  "learn": {
    "introduction": {
      "en": "Strings represent text data in JavaScript and are indexed as UTF-16 code units. ES6 revolutionized string manipulation with Template Literals (backtick syntax `` ` ``), introducing expressive multi-line formatting, embedded expression interpolation `${...}`, and advanced Tagged Template functions. Combined with modern string search and transformation methods, JavaScript offers powerful text-processing capabilities.",
      "vi": "Chuỗi đại diện cho dữ liệu văn bản trong JavaScript và được lập chỉ mục theo đơn vị mã UTF-16. Phiên bản ES6 đã mang lại bước nhảy vọt với Template Literals (sử dụng ký tự backtick `` ` ``), hỗ trợ định dạng chuỗi nhiều dòng, nhúng biểu thức trực tiếp `${...}` và hàm xử lý gắn thẻ Tagged Templates. Kết hợp với các phương thức tìm kiếm và biến đổi chuỗi hiện đại, JavaScript cung cấp khả năng xử lý văn bản mạnh mẽ."
    },
    "conceptExplanation": {
      "en": "1. String Inspection & Search Methods: `.includes(sub)`, `.startsWith(prefix)`, `.endsWith(suffix)`, `.indexOf(sub)`, `.lastIndexOf(sub)`. Modern methods return direct booleans without cumbersome `>= 0` checks.\n\n2. Extraction & Transformation: `.slice(start, end)` (preferred over legacy `substring` and deprecated `substr`), `.trim()`, `.trimStart()`, `.trimEnd()`, `.toUpperCase()`, `.toLowerCase()`, `.repeat(count)`, `.padStart(length, pad)`, `.padEnd(length, pad)`.\n\n3. Replacement: `.replace(pattern, replacer)` replaces only the first match when given a string. `.replaceAll(pattern, replacer)` replaces all occurrences without requiring complex global regex `/g`.\n\n4. Template Literals & Tagged Templates: Backtick strings support string interpolation `${expression}` and preserve literal newlines. Tagged template functions `tag`Hello ${name}`` receive raw string chunks and evaluated arguments, enabling HTML sanitization, SQL query builders, and styled-components.",
      "vi": "1. Các phương thức kiểm tra & tìm kiếm: `.includes(sub)`, `.startsWith(prefix)`, `.endsWith(suffix)`, `.indexOf(sub)`. Các phương thức hiện đại trả về boolean trực tiếp mà không cần so sánh `>= 0` như trước.\n\n2. Trích xuất & Biến đổi chuỗi: `.slice(start, end)` (tốt nhất, thay thế hoàn toàn `substr` đã lỗi thời), `.trim()`, `.trimStart()`, `.trimEnd()`, `.toUpperCase()`, `.toLowerCase()`, `.padStart(length, pad)` (thêm ký tự đầu để đủ độ dài), `.padEnd()`.\n\n3. Thay thế chuỗi: `.replace()` chỉ thay thế vị trí xuất hiện đầu tiên khi truyền chuỗi. `.replaceAll()` thay thế toàn bộ các vị trí trùng khớp mà không bắt buộc dùng biểu thức chính quy `/g`.\n\n4. Template Literals & Tagged Templates: Chuỗi backtick hỗ trợ nhúng biểu thức `${}` và giữ nguyên định dạng xuống dòng. Tagged Templates `tag`Hello ${name}`` cho phép hàm chặn chuỗi để xử lý lọc mã độc (sanitize HTML), tạo câu truy vấn SQL an toàn hoặc styled-components."
    },
    "syntax": "// 1. Template literals & multiline formatting\nconst user = { name: \"Elena\", score: 98.5 };\nconst message = `Student: ${user.name}\nGrade: ${user.score >= 90 ? \"A+\" : \"B\"}\nStatus: ${user.score.toFixed(1)}%`;\n\n// 2. Modern string methods\nconst raw = \"  api/v2/products/459  \";\nconst clean = raw.trim();\nconsole.log(clean.startsWith(\"api/\")); // true\nconsole.log(clean.endsWith(\"/459\"));   // true\n\nconst receiptId = String(42).padStart(6, \"0\"); // \"000042\"\n\n// 3. Tagged template function example (HTML sanitizer)\nfunction sanitize(strings, ...values) {\n  return strings.reduce((acc, str, i) => {\n    const val = values[i] !== undefined ? String(values[i]).replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\") : \"\";\n    return acc + str + val;\n  }, \"\");\n}\nconst userInput = \"<script>alert('hack')</script>\";\nconsole.log(sanitize`<div>Hello ${userInput}</div>`);",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Secure SQL / HTML Query Builder with Tagged Templates",
          "vi": "Xây Dựng Query Builder An Toàn Với Tagged Template"
        },
        "description": {
          "en": "Demonstrates how tagged template literals prevent injection vulnerabilities by parameterizing interpolated values.",
          "vi": "Minh họa cách tagged template literals ngăn chặn lỗi injection bằng cách tham số hóa giá trị được chèn."
        },
        "code": "function sql(strings, ...params) {\n  const values = [];\n  const text = strings.reduce((query, chunk, i) => {\n    if (i < params.length) {\n      values.push(params[i]);\n      return query + chunk + `$${values.length}`;\n    }\n    return query + chunk;\n  }, \"\");\n\n  return { text, values };\n}\n\nconst role = \"admin\";\nconst minScore = 80;\nconst query = sql`SELECT id, username FROM users WHERE role = ${role} AND score >= ${minScore}`;\nconsole.log(query);\n// { text: 'SELECT id, username FROM users WHERE role = $1 AND score >= $2', values: ['admin', 80] }"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Expecting `.replace('a', 'b')` with a string argument to replace all occurrences of 'a'.",
          "vi": "Nghĩ rằng `.replace('a', 'b')` khi truyền chuỗi sẽ thay thế toàn bộ ký tự 'a' trong chuỗi."
        },
        "correction": {
          "en": "Use `.replaceAll('a', 'b')` or regex with global flag `/.replace(/a/g, 'b')`.",
          "vi": "Sử dụng `.replaceAll('a', 'b')` hoặc regex với cờ toàn cục `/.replace(/a/g, 'b')`."
        }
      }
    ],
    "tips": [
      {
        "en": "Prefer .slice() over substring() and deprecated substr(): `.slice()` supports negative indices to count backwards from the end of the string and behaves consistently with `Array.prototype.slice()`.",
        "vi": "Ưu tiên dùng .slice() thay vì substring() và substr() đã lỗi thời: `.slice()` hỗ trợ chỉ số âm để đếm ngược từ cuối chuỗi và hoạt động đồng nhất với `Array.prototype.slice()`."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_5_1",
      "type": "complete_code",
      "title": {
        "en": "Generate URL Slug from Title",
        "vi": "Tạo URL Slug Chuẩn Hóa Từ Tiêu Đề Bài Viết"
      },
      "instruction": {
        "en": "Write a function `generateSlug(title)` that trims whitespace, converts to lowercase, replaces all spaces and special punctuation with hyphens, removes duplicate hyphens, and trims hyphens from start and end.",
        "vi": "Viết hàm `generateSlug(title)` cắt khoảng trắng thừa, chuyển thành chữ thường, thay thế khoảng trắng và dấu câu thành dấu gạch nối, loại bỏ gạch nối liên tiếp và cắt gạch nối ở 2 đầu."
      },
      "starterCode": "function generateSlug(title) {\n  // Return clean URL slug\n}\n\nconsole.log(generateSlug(\"  Mastering Modern JavaScript (ES6+ & Beyond)!  \"));\n// \"mastering-modern-javascript-es6-beyond\"",
      "solutionCode": "function generateSlug(title) {\n  return title\n    .trim()\n    .toLowerCase()\n    .replace(/[^a-z0-9]+/g, '-')\n    .replace(/^-+|-+$/g, '');\n}",
      "hint": {
        "en": "Use trim().toLowerCase(), replace non-alphanumeric with '-', and strip leading/trailing hyphens.",
        "vi": "Dùng trim().toLowerCase(), thay thế các ký tự không phải chữ số thành '-' và loại bỏ gạch nối ở đầu/cuối."
      }
    },
    {
      "id": "js_ex_5_2",
      "type": "complete_code",
      "title": {
        "en": "Mask Sensitive Payment Card Number",
        "vi": "Mã Hóa Che Giấu Số Thẻ Thanh Toán Nhạy Cảm"
      },
      "instruction": {
        "en": "Write a function `maskCardNumber(cardNumber)` that takes a string of digits, removes all spaces/dashes, and masks all but the last 4 digits with asterisks `*` (e.g. `4532 8912 3456 7890` -> `************7890`). Return `'Invalid'` if fewer than 12 digits.",
        "vi": "Viết hàm `maskCardNumber(cardNumber)` nhận chuỗi số thẻ, xóa khoảng trắng/dấu gạch ngang, và che tất cả trừ 4 số cuối bằng dấu `*` (ví dụ `4532 8912 3456 7890` -> `************7890`). Trả về `'Invalid'` nếu ít hơn 12 chữ số."
      },
      "starterCode": "function maskCardNumber(cardNumber) {\n  // Mask digits except last 4\n}\n\nconsole.log(maskCardNumber(\"4532-8912-3456-7890\"));",
      "solutionCode": "function maskCardNumber(cardNumber) {\n  const cleanDigits = String(cardNumber).replaceAll('-', '').replaceAll(' ', '');\n  if (cleanDigits.length < 12) return 'Invalid';\n  const lastFour = cleanDigits.slice(-4);\n  return lastFour.padStart(cleanDigits.length, '*');\n}",
      "hint": {
        "en": "Clean dashes with replaceAll, extract last 4 digits with slice(-4), and padStart with '*'.",
        "vi": "Làm sạch dấu gạch với replaceAll, trích 4 số cuối bằng slice(-4) và dùng padStart với ký tự '*'."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_5",
    "title": {
      "en": "Template Engine with Conditional Directives",
      "vi": "Engine Xử Lý Mẫu Template Với Biểu Thức Điều Kiện"
    },
    "description": {
      "en": "Implement a micro template engine function `renderTemplate(templateStr, data)` that replaces `{{key}}` tokens with matching properties from `data`, and resolves simple `{{#if key}}...{{/if}}` conditional blocks.",
      "vi": "Cài đặt hàm engine render template `renderTemplate(templateStr, data)` thay thế các placeholder `{{key}}` bằng giá trị từ `data`, đồng thời xử lý các khối điều kiện đơn giản `{{#if key}}...{{/if}}`."
    },
    "starterCode": "function renderTemplate(templateStr, data) {\n  // Implement template parser\n}\n\nconst tpl = \"Hello {{name}}!{{#if isVip}} You are a VIP member with {{points}} pts.{{/if}}\";\nconsole.log(renderTemplate(tpl, { name: \"Elena\", isVip: true, points: 1500 }));\n// \"Hello Elena! You are a VIP member with 1500 pts.\"",
    "solutionCode": "function renderTemplate(templateStr, data) {\n  let result = templateStr;\n\n  // Process {{#if key}}content{{/if}}\n  const ifRegex = /\\{\\{#if\\s+([a-zA-Z0-9_]+)\\}\\}([\\s\\S]*?)\\{\\{\\/if\\}\\}/g;\n  result = result.replace(ifRegex, (match, conditionKey, content) => {\n    return Boolean(data[conditionKey]) ? content : '';\n  });\n\n  // Process {{key}} replacements\n  const varRegex = /\\{\\{([a-zA-Z0-9_]+)\\}\\}/g;\n  result = result.replace(varRegex, (match, key) => {\n    return data[key] !== undefined ? String(data[key]) : '';\n  });\n\n  return result;\n}",
    "hints": [
      {
        "en": "Use regex to evaluate if-blocks first, and then replace {{key}} tokens with values from data.",
        "vi": "Dùng regex để xử lý các khối if trước, sau đó thay thế các token {{key}} bằng dữ liệu tương ứng."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Template Engine with Conditional Directives according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine Xử Lý Mẫu Template Với Biểu Thức Điều Kiện theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_5_1",
      "type": "single_choice",
      "question": {
        "en": "Which quotation character enables ES6 template literals with multi-line strings and expression interpolation?",
        "vi": "Ký tự dấu ngoặc kép/đơn nào kích hoạt tính năng Template Literals trong ES6?"
      },
      "options": [
        {
          "en": "Backtick ( ` )",
          "vi": "Dấu phẩy ngược Backtick ( ` )"
        },
        {
          "en": "Single quote ( ' )",
          "vi": "Dấu nháy đơn ( ' )"
        },
        {
          "en": "Double quote ( \" )",
          "vi": "Dấu nháy kép ( \" )"
        },
        {
          "en": "Tilde ( ~ )",
          "vi": "Dấu ngã ( ~ )"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Template literals are enclosed by the backtick character `` ` ``.",
        "vi": "Template literals được bao quanh bởi ký tự backtick `` ` ``."
      },
      "topicId": "js_strings_templates",
      "difficulty": "easy"
    },
    {
      "id": "js_q_5_2",
      "type": "predict_output",
      "question": {
        "en": "What will `'banana'.replace('a', 'o')` return?",
        "vi": "`'banana'.replace('a', 'o')` sẽ trả về kết quả gì?"
      },
      "options": [
        {
          "en": "'bonana'",
          "vi": "'bonana'"
        },
        {
          "en": "'bonono'",
          "vi": "'bonono'"
        },
        {
          "en": "'banana'",
          "vi": "'banana'"
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
        "en": "When given a string as the search argument, `replace()` replaces only the FIRST matching occurrence.",
        "vi": "Khi đối số tìm kiếm là chuỗi, `replace()` chỉ thay thế duy nhất vị trí trùng khớp đầu tiên."
      },
      "topicId": "js_strings_templates",
      "difficulty": "easy"
    },
    {
      "id": "js_q_5_3",
      "type": "single_choice",
      "question": {
        "en": "Which method replaces ALL occurrences of a substring across the entire string without requiring a regex?",
        "vi": "Phương thức nào thay thế TẤT CẢ các lần xuất hiện của chuỗi con mà không cần dùng regex?"
      },
      "options": [
        {
          "en": "replaceAll()",
          "vi": "replaceAll()"
        },
        {
          "en": "replaceEvery()",
          "vi": "replaceEvery()"
        },
        {
          "en": "replaceGlobal()",
          "vi": "replaceGlobal()"
        },
        {
          "en": "swapAll()",
          "vi": "swapAll()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`String.prototype.replaceAll()` was introduced in ES2021 to replace all substring matches cleanly.",
        "vi": "`String.prototype.replaceAll()` được bổ sung trong ES2021 để thay thế toàn bộ chuỗi con một cách rõ ràng."
      },
      "topicId": "js_strings_templates",
      "difficulty": "easy"
    },
    {
      "id": "js_q_5_4",
      "type": "predict_output",
      "question": {
        "en": "What will `'JavaScript'.slice(-6)` return?",
        "vi": "`'JavaScript'.slice(-6)` sẽ trả về kết quả gì?"
      },
      "options": [
        {
          "en": "'Script'",
          "vi": "'Script'"
        },
        {
          "en": "'JavaSc'",
          "vi": "'JavaSc'"
        },
        {
          "en": "''",
          "vi": "''"
        },
        {
          "en": "'avaScr'",
          "vi": "'avaScr'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "A negative index in `.slice()` offsets backwards from the end. Length is 10, so `-6` starts at index 4 ('S') through the end ('Script').",
        "vi": "Chỉ số âm trong `.slice()` đếm ngược từ cuối chuỗi. Độ dài là 10 nên `-6` bắt đầu từ index 4 ('S') đến hết chuỗi ('Script')."
      },
      "topicId": "js_strings_templates",
      "difficulty": "medium"
    },
    {
      "id": "js_q_5_5",
      "type": "predict_output",
      "question": {
        "en": "What is the output of `'5'.padStart(4, '0')`?",
        "vi": "Kết quả của `'5'.padStart(4, '0')` là gì?"
      },
      "options": [
        {
          "en": "'0005'",
          "vi": "'0005'"
        },
        {
          "en": "'5000'",
          "vi": "'5000'"
        },
        {
          "en": "'005'",
          "vi": "'005'"
        },
        {
          "en": "'5.000'",
          "vi": "'5.000'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`padStart(4, '0')` pads the beginning of the string with `'0'` until the total target length reaches 4.",
        "vi": "`padStart(4, '0')` thêm ký tự `'0'` vào đầu chuỗi cho đến khi đạt tổng độ dài là 4."
      },
      "topicId": "js_strings_templates",
      "difficulty": "medium"
    },
    {
      "id": "js_q_5_6",
      "type": "single_choice",
      "question": {
        "en": "What is a Tagged Template Literal in JavaScript?",
        "vi": "Tagged Template Literal trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "A function call where template string fragments and interpolated values are passed as arguments for custom parsing",
          "vi": "Một lời gọi hàm mà các đoạn chuỗi tĩnh và giá trị nội suy được truyền làm đối số để tùy biến xử lý"
        },
        {
          "en": "A CSS-only selector syntax",
          "vi": "Cú pháp bộ chọn chỉ có trong CSS"
        },
        {
          "en": "An HTML5 meta tag",
          "vi": "Thẻ meta trong HTML5"
        },
        {
          "en": "A JSON serialization flag",
          "vi": "Một cờ tuần tự hóa JSON"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Tagged templates allow functions to parse template literals (e.g. `tag`string ${val}``), widely used in GraphQL, styled-components, and SQL builders.",
        "vi": "Tagged templates cho phép hàm can thiệp xử lý các phần tử trong template literal, được ứng dụng rộng rãi trong GraphQL, styled-components và SQL builder."
      },
      "topicId": "js_strings_templates",
      "difficulty": "medium"
    },
    {
      "id": "js_q_5_7",
      "type": "predict_output",
      "question": {
        "en": "What does `'   hello world   '.trim()` return?",
        "vi": "`'   hello world   '.trim()` sẽ trả về kết quả gì?"
      },
      "options": [
        {
          "en": "'hello world'",
          "vi": "'hello world'"
        },
        {
          "en": "'helloworld'",
          "vi": "'helloworld'"
        },
        {
          "en": "'   hello world'",
          "vi": "'   hello world'"
        },
        {
          "en": "'hello world   '",
          "vi": "'hello world   '"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`trim()` removes leading and trailing whitespace characters, preserving inner whitespace.",
        "vi": "`trim()` loại bỏ khoảng trắng ở cả hai đầu chuỗi, giữ nguyên khoảng trắng ở giữa."
      },
      "topicId": "js_strings_templates",
      "difficulty": "medium"
    },
    {
      "id": "js_q_5_8",
      "type": "fill_blank",
      "question": {
        "en": "To verify whether a string contains a specific substring in modern JavaScript, you call str._____('searchString').",
        "vi": "Để kiểm tra xem một chuỗi có chứa chuỗi con hay không trong JS hiện đại, bạn gọi str._____('searchString')."
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
        "en": "`str.includes()` returns a boolean indicating whether the search string exists within the calling string.",
        "vi": "`str.includes()` trả về giá trị boolean biểu thị chuỗi con có xuất hiện hay không."
      },
      "topicId": "js_strings_templates",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "includes"
      ]
    },
    {
      "id": "js_q_5_9",
      "type": "single_choice",
      "question": {
        "en": "What happens if you embed an object inside a standard template literal like ``User: ${{ name: 'Alex' }}``?",
        "vi": "Điều gì xảy ra khi nhúng trực tiếp một đối tượng vào template literal như ``User: ${{ name: 'Alex' }}``?"
      },
      "options": [
        {
          "en": "It prints 'User: [object Object]'",
          "vi": "Nó in ra 'User: [object Object]'"
        },
        {
          "en": "It prints 'User: {\"name\":\"Alex\"}'",
          "vi": "Nó in ra 'User: {\"name\":\"Alex\"}'"
        },
        {
          "en": "It throws a TypeError",
          "vi": "Nó ném ngoại lệ TypeError"
        },
        {
          "en": "It prints 'User: undefined'",
          "vi": "Nó in ra 'User: undefined'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Expressions in template literals are coerced to strings via `.toString()`. Default Object toString returns `'[object Object]'`.",
        "vi": "Các biểu thức trong template literal được ép sang chuỗi bằng `.toString()`. Mặc định Object.toString trả về `'[object Object]'` (muốn in JSON cần dùng JSON.stringify)."
      },
      "topicId": "js_strings_templates",
      "difficulty": "hard"
    },
    {
      "id": "js_q_5_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `String.raw`C:\\Development\\new_project`` useful in JavaScript?",
        "vi": "Tại sao `String.raw`C:\\Development\\new_project`` lại hữu ích trong JavaScript?"
      },
      "options": [
        {
          "en": "It treats escape sequences like \\n and \\t as raw literal characters without interpreting them",
          "vi": "Nó giữ nguyên các ký tự escape như \\n và \\t dưới dạng chuỗi thô mà không thông dịch chúng"
        },
        {
          "en": "It translates strings to base64",
          "vi": "Nó chuyển chuỗi sang định dạng base64"
        },
        {
          "en": "It verifies file path existence on disk",
          "vi": "Nó kiểm tra đường dẫn file có tồn tại trên đĩa không"
        },
        {
          "en": "It compresses string size",
          "vi": "Nó nén dung lượng chuỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`String.raw` is a built-in tagged template that obtains raw string content, preventing backslashes from being treated as escape characters (ideal for regex patterns and file paths).",
        "vi": "`String.raw` là tagged template tích hợp sẵn giúp lấy nội dung chuỗi thô, ngăn việc biến dấu gạch chéo ngược thành ký tự escape (rất tiện cho đường dẫn file và regex)."
      },
      "topicId": "js_strings_templates",
      "difficulty": "hard"
    }
  ]
};
export default lesson05;
