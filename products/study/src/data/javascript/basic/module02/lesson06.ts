import { Lesson } from '../../../../types';

export const lesson06: Lesson = {
  "id": "js_lesson_6",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_2",
  "order": 6,
  "title": {
    "en": "Control Flow: Conditionals, Ternary Operators & Switch Statements",
    "vi": "Điều Khiển Luồng: Câu Lệnh Điều Kiện, Toán Tử 3 Ngôi & Switch"
  },
  "summary": {
    "en": "Master clean conditional logic, guard clauses (early returns), ternary operators, and multi-branch switch statements with fall-through control.",
    "vi": "Làm chủ logic điều kiện rõ ràng, guard clauses (trả về sớm), toán tử 3 ngôi và câu lệnh switch nhiều nhánh với kiểm soát fall-through."
  },
  "estimatedMinutes": 20,
  "topicId": "js_control_flow",
  "learn": {
    "introduction": {
      "en": "Control flow structures dictate the execution path of a JavaScript program based on runtime conditions. Writing clean conditional logic using modern patterns like guard clauses, ternary expressions, and exhaustive switch statements improves readability, reduces cognitive nesting depth, and minimizes bug surface area.",
      "vi": "Các cấu trúc điều khiển luồng xác định thứ tự thực thi của chương trình JavaScript dựa trên các điều kiện lúc chạy. Viết logic điều kiện rõ ràng bằng các mẫu hiện đại như guard clauses, toán tử 3 ngôi và switch toàn diện giúp code dễ đọc, giảm độ lồng nhau phức tạp và hạn chế lỗi phát sinh."
    },
    "conceptExplanation": {
      "en": "1. `if`, `else if`, `else` & Guard Clauses: Instead of deeply nested if-blocks (pyramid of doom), use guard clauses at the beginning of functions to handle error states or boundary conditions early and return immediately.\n\n2. Ternary Operator (`condition ? exprIfTrue : exprIfFalse`): Ideal for inline assignments and concise binary value selections. Avoid chaining more than two ternaries together, as it harms readability.\n\n3. `switch` Statement: Evaluates an expression and compares it against multiple `case` clauses using STRICT equality (`===`). Always include `break` (or `return`) to avoid accidental fall-through, and provide a `default` case for unhandled conditions.\n\n4. Logical Pattern Matching: Modern JavaScript developers often combine object lookups or Map structures as cleaner alternatives to sprawling 20-branch switch statements.",
      "vi": "1. `if`, `else if`, `else` & Guard Clauses: Thay vì lồng nhiều khối if vào nhau (kim tự tháp mã), hãy đặt guard clauses ở đầu hàm để kiểm tra lỗi hoặc điều kiện biên và `return` ngay lập tức.\n\n2. Toán Tử 3 Ngôi (`condition ? trueVal : falseVal`): Rất thích hợp để gán giá trị trực tiếp hoặc biểu thức nhị phân ngắn gọn. Tránh lồng quá 2 toán tử 3 ngôi vì sẽ gây khó đọc.\n\n3. Câu Lệnh `switch`: So sánh một biểu thức với nhiều mệnh đề `case` bằng phép so sánh NGHIÊM NGẶT (`===`). Luôn nhớ đặt `break` (hoặc `return`) để tránh trôi lệnh (fall-through) ngoài ý muốn và luôn có nhánh `default`.\n\n4. Tra Cứu Đối Tượng (Object Lookup Table): Lập trình viên JS hiện đại thường dùng Object hoặc Map để thay thế các khối switch quá dài (trên 10 case) nhằm tăng tính mở rộng."
    },
    "syntax": "// 1. Guard clause pattern (clean & flat)\nfunction processPayment(user, amount) {\n  if (!user || !user.isActive) return { success: false, reason: \"Inactive user\" };\n  if (amount <= 0) return { success: false, reason: \"Invalid amount\" };\n  if (user.balance < amount) return { success: false, reason: \"Insufficient balance\" };\n\n  user.balance -= amount;\n  return { success: true, newBalance: user.balance };\n}\n\n// 2. Ternary assignment\nconst discount = user.isVip ? 0.20 : 0.05;\n\n// 3. Switch with strict equality\nfunction getHttpStatusDescription(code) {\n  switch (code) {\n    case 200: return \"OK\";\n    case 201: return \"Created\";\n    case 400: return \"Bad Request\";\n    case 401: return \"Unauthorized\";\n    case 404: return \"Not Found\";\n    case 500: return \"Internal Server Error\";\n    default: return \"Unknown Status Code\";\n  }\n}",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Role-Based Access Control Dispatcher",
          "vi": "Bộ Điều Phối Quyền Truy Cập Theo Vai Trò Người Dùng"
        },
        "description": {
          "en": "Demonstrates clean branching with guard clauses and lookup-based permission resolution.",
          "vi": "Minh họa phân nhánh rõ ràng với guard clauses và bảng tra cứu phân quyền."
        },
        "code": "function authorizeAction(user, action) {\n  if (!user) return { allowed: false, message: \"Unauthenticated\" };\n  if (user.isSuspended) return { allowed: false, message: \"Account suspended\" };\n\n  const permissionMatrix = {\n    admin: [\"read\", \"write\", \"delete\", \"publish\"],\n    editor: [\"read\", \"write\", \"publish\"],\n    viewer: [\"read\"]\n  };\n\n  const userPermissions = permissionMatrix[user.role] || [];\n  const hasAccess = userPermissions.includes(action);\n\n  return {\n    allowed: hasAccess,\n    message: hasAccess ? \"Access granted\" : \"Insufficient permissions\"\n  };\n}\n\nconsole.log(authorizeAction({ role: \"editor\", isSuspended: false }, \"publish\"));\n// { allowed: true, message: 'Access granted' }"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Omitting the `break` keyword in a switch case unintentionally.",
          "vi": "Quên từ khóa `break` trong mệnh đề switch case ngoài ý muốn."
        },
        "correction": {
          "en": "Ensure each case terminates with `break` or `return` unless intentional fall-through is required.",
          "vi": "Đảm bảo mọi case đều kết thúc bằng `break` hoặc `return` trừ khi bạn chủ ý muốn thực thi liên tiếp các case."
        }
      }
    ],
    "tips": [
      {
        "en": "Flatten nested logic with Early Returns: Handle failure and edge conditions first at the top of the function to keep the primary success path un-indented and easy to follow.",
        "vi": "Làm phẳng mã lồng nhau bằng Early Returns (trả về sớm): Xử lý các điều kiện lỗi và trường hợp biên trước ở đầu hàm, giúp luồng xử lý chính không bị thụt lề quá sâu."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_6_1",
      "type": "complete_code",
      "title": {
        "en": "Refactor Nested If-Else to Guard Clauses",
        "vi": "Tái Cấu Trúc Khối If Lồng Nhau Thành Guard Clauses"
      },
      "instruction": {
        "en": "Refactor `calculateDiscount(cart)`: return 0 if cart is null or empty, 0.25 if total > 200 and hasCoupon is true, 0.15 if total > 200, 0.10 if hasCoupon is true, or 0.05 otherwise, without nesting if inside if.",
        "vi": "Tái cấu trúc `calculateDiscount(cart)`: trả về 0 nếu giỏ hàng rỗng hoặc null, 0.25 nếu tổng > 200 và có coupon, 0.15 nếu tổng > 200, 0.10 nếu có coupon, và 0.05 trong các trường hợp còn lại mà không lồng if."
      },
      "starterCode": "function calculateDiscount(cart) {\n  // Use early returns\n}\n\nconsole.log(calculateDiscount({ total: 250, hasCoupon: true })); // 0.25",
      "solutionCode": "function calculateDiscount(cart) {\n  if (!cart || !cart.total || cart.total <= 0) return 0;\n  if (cart.total > 200 && cart.hasCoupon) return 0.25;\n  if (cart.total > 200) return 0.15;\n  if (cart.hasCoupon) return 0.10;\n  return 0.05;\n}",
      "hint": {
        "en": "Check invalid cart at the top, then evaluate the highest discount conditions in descending order with early returns.",
        "vi": "Kiểm tra giỏ hàng không hợp lệ ở đầu, sau đó xét các điều kiện giảm giá cao nhất theo thứ tự giảm dần với return sớm."
      }
    },
    {
      "id": "js_ex_6_2",
      "type": "complete_code",
      "title": {
        "en": "Dynamic Shipping Rate Calculator",
        "vi": "Bộ Tính Phí Vận Chuyển Theo Phân Loại Vùng"
      },
      "instruction": {
        "en": "Write a function `calculateShipping(zone, weightKg)` using a `switch` statement: 'local' is $5 flat, 'domestic' is $10 + $2 per kg over 1kg, 'international' is $30 + $8 per kg, and any unknown zone throws an Error('Invalid zone').",
        "vi": "Viết hàm `calculateShipping(zone, weightKg)` dùng `switch`: 'local' là $5 cố định, 'domestic' là $10 + $2/kg vượt quá 1kg, 'international' là $30 + $8/kg, và khu vực không hợp lệ ném Error('Invalid zone')."
      },
      "starterCode": "function calculateShipping(zone, weightKg) {\n  // Implement switch\n}\n\nconsole.log(calculateShipping(\"domestic\", 3.5)); // 10 + 2.5*2 = 15",
      "solutionCode": "function calculateShipping(zone, weightKg) {\n  switch (zone) {\n    case 'local':\n      return 5;\n    case 'domestic':\n      return weightKg > 1 ? 10 + (weightKg - 1) * 2 : 10;\n    case 'international':\n      return 30 + weightKg * 8;\n    default:\n      throw new Error('Invalid zone');\n  }\n}",
      "hint": {
        "en": "Switch on zone, calculate weight formula in each case, and throw Error in the default branch.",
        "vi": "Switch theo zone, tính toán theo công thức khối lượng ở từng case và throw Error trong nhánh default."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_6",
    "title": {
      "en": "Multi-Tier Pricing & Tax Decision Engine",
      "vi": "Engine Định Giá Bán Lẻ & Phân Bổ Thuế Đa Tầng"
    },
    "description": {
      "en": "Create a function `calculateOrderSummary(order)` that processes customer orders: applies tiered volume discounts (0% for <5 items, 10% for 5-9 items, 20% for >=10 items), checks customer tier (VIP gets an extra 5% off subtotal), resolves state tax rate via region code ('CA': 8.5%, 'NY': 8.0%, 'TX': 6.25%, others: 5%), and returns `{ subtotal, discount, netAmount, tax, finalTotal }` rounded to 2 decimal places.",
      "vi": "Xây dựng hàm `calculateOrderSummary(order)` xử lý đơn hàng: áp dụng giảm giá theo số lượng (0% nếu <5 món, 10% nếu 5-9 món, 20% nếu >=10 món), kiểm tra hạng thành viên (VIP giảm thêm 5% trên subtotal), tính thuế theo mã vùng ('CA': 8.5%, 'NY': 8.0%, 'TX': 6.25%, vùng khác: 5%) và trả về `{ subtotal, discount, netAmount, tax, finalTotal }` làm tròn 2 chữ số thập phân."
    },
    "starterCode": "function calculateOrderSummary(order) {\n  // Implement order pricing engine\n}\n\nconst summary = calculateOrderSummary({\n  items: [{ price: 50, qty: 6 }],\n  isVip: true,\n  state: \"CA\"\n});\nconsole.log(summary);",
    "solutionCode": "function calculateOrderSummary(order) {\n  if (!order || !Array.isArray(order.items) || order.items.length === 0) {\n    return { subtotal: 0, discount: 0, netAmount: 0, tax: 0, finalTotal: 0 };\n  }\n\n  let totalQty = 0;\n  let subtotal = 0;\n\n  for (let i = 0; i < order.items.length; i++) {\n    const item = order.items[i];\n    const qty = item.qty || 1;\n    totalQty += qty;\n    subtotal += item.price * qty;\n  }\n\n  let discountRate = 0;\n  if (totalQty >= 10) {\n    discountRate = 0.20;\n  } else if (totalQty >= 5) {\n    discountRate = 0.10;\n  }\n\n  if (order.isVip) {\n    discountRate += 0.05;\n  }\n\n  const discount = subtotal * discountRate;\n  const netAmount = subtotal - discount;\n\n  let taxRate = 0.05;\n  switch (order.state) {\n    case 'CA': taxRate = 0.085; break;\n    case 'NY': taxRate = 0.080; break;\n    case 'TX': taxRate = 0.0625; break;\n    default: taxRate = 0.05; break;\n  }\n\n  const tax = netAmount * taxRate;\n  const finalTotal = netAmount + tax;\n\n  return {\n    subtotal: Number(subtotal.toFixed(2)),\n    discount: Number(discount.toFixed(2)),\n    netAmount: Number(netAmount.toFixed(2)),\n    tax: Number(tax.toFixed(2)),\n    finalTotal: Number(finalTotal.toFixed(2))\n  };\n}",
    "hints": [
      {
        "en": "Compute total items and raw subtotal first, calculate combined discount percentage, resolve tax with switch, and round with Number(val.toFixed(2)).",
        "vi": "Tính tổng số lượng và subtotal trước, cộng dồn phần trăm giảm giá, tính thuế qua switch và làm tròn bằng Number(val.toFixed(2))."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Multi-Tier Pricing & Tax Decision Engine according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine Định Giá Bán Lẻ & Phân Bổ Thuế Đa Tầng theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_6_1",
      "type": "single_choice",
      "question": {
        "en": "What type of equality comparison does a JavaScript `switch` statement use to match `case` clauses?",
        "vi": "Câu lệnh `switch` trong JavaScript sử dụng kiểu so sánh nào để đối chiếu các mệnh đề `case`?"
      },
      "options": [
        {
          "en": "Strict equality (===)",
          "vi": "So sánh nghiêm ngặt (===)"
        },
        {
          "en": "Loose equality (==)",
          "vi": "So sánh tương đối (==)"
        },
        {
          "en": "Object.is() equivalence",
          "vi": "So sánh tương đương Object.is()"
        },
        {
          "en": "Regex pattern matching",
          "vi": "Khớp mẫu Regular Expression"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`switch` performs strict comparison `===` between the test expression and case values without type coercion.",
        "vi": "`switch` thực hiện phép so sánh nghiêm ngặt `===` giữa biểu thức và các giá trị case, không tự động ép kiểu."
      },
      "topicId": "js_control_flow",
      "difficulty": "easy"
    },
    {
      "id": "js_q_6_2",
      "type": "predict_output",
      "question": {
        "en": "What will the following switch log?\n```js\nconst val = '5';\nswitch (val) {\n  case 5: console.log('Number'); break;\n  case '5': console.log('String'); break;\n  default: console.log('Other');\n}\n```",
        "vi": "Đoạn mã switch sau sẽ in ra gì?\n```js\nconst val = '5';\nswitch (val) {\n  case 5: console.log('Number'); break;\n  case '5': console.log('String'); break;\n  default: console.log('Other');\n}\n```"
      },
      "options": [
        {
          "en": "'String'",
          "vi": "'String'"
        },
        {
          "en": "'Number'",
          "vi": "'Number'"
        },
        {
          "en": "'Other'",
          "vi": "'Other'"
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
        "en": "Because `switch` uses `===`, `'5' === 5` is false, but `'5' === '5'` is true.",
        "vi": "Do `switch` dùng `===`, `'5' === 5` là false, và `'5' === '5'` là true nên nhánh case '5' được thực thi."
      },
      "topicId": "js_control_flow",
      "difficulty": "easy"
    },
    {
      "id": "js_q_6_3",
      "type": "single_choice",
      "question": {
        "en": "What is the primary architectural purpose of using 'Guard Clauses' in functions?",
        "vi": "Mục đích kiến trúc chính của việc dùng 'Guard Clauses' trong hàm là gì?"
      },
      "options": [
        {
          "en": "To handle error/edge cases first with early returns, flattening indentation and clarifying happy paths",
          "vi": "Xử lý lỗi và trường hợp biên ở đầu hàm bằng return sớm, làm phẳng mã và làm nổi bật luồng thực thi chính"
        },
        {
          "en": "To encrypt incoming function arguments",
          "vi": "Để mã hóa các tham số đầu vào của hàm"
        },
        {
          "en": "To convert synchronous functions into Promises",
          "vi": "Để chuyển đổi hàm đồng bộ thành Promise"
        },
        {
          "en": "To prevent memory garbage collection",
          "vi": "Để ngăn cản trình thu gom rác bộ nhớ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Guard clauses eliminate deeply nested if-else blocks by returning immediately when invalid conditions are met.",
        "vi": "Guard clauses loại bỏ hoàn toàn các khối if-else lồng nhau phức tạp bằng cách trả về sớm ngay khi gặp điều kiện không hợp lệ."
      },
      "topicId": "js_control_flow",
      "difficulty": "easy"
    },
    {
      "id": "js_q_6_4",
      "type": "predict_output",
      "question": {
        "en": "What will this code log due to switch fall-through?\n```js\nlet result = '';\nconst code = 1;\nswitch (code) {\n  case 1: result += 'A';\n  case 2: result += 'B';\n  default: result += 'C';\n}\nconsole.log(result);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì do hiện tượng switch fall-through?\n```js\nlet result = '';\nconst code = 1;\nswitch (code) {\n  case 1: result += 'A';\n  case 2: result += 'B';\n  default: result += 'C';\n}\nconsole.log(result);\n```"
      },
      "options": [
        {
          "en": "'ABC'",
          "vi": "'ABC'"
        },
        {
          "en": "'A'",
          "vi": "'A'"
        },
        {
          "en": "'AB'",
          "vi": "'AB'"
        },
        {
          "en": "'C'",
          "vi": "'C'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because there are no `break` statements, execution enters `case 1`, then falls through into `case 2` and `default`, producing `'ABC'`.",
        "vi": "Vì không có từ khóa `break`, luồng chạy khớp `case 1` và sau đó trôi liên tiếp qua `case 2` và `default`, tạo ra chuỗi `'ABC'`."
      },
      "topicId": "js_control_flow",
      "difficulty": "medium"
    },
    {
      "id": "js_q_6_5",
      "type": "single_choice",
      "question": {
        "en": "Which syntax represents a valid conditional (ternary) operator in JavaScript?",
        "vi": "Cú pháp nào thể hiện đúng toán tử điều kiện (3 ngôi) trong JavaScript?"
      },
      "options": [
        {
          "en": "condition ? exprIfTrue : exprIfFalse",
          "vi": "condition ? exprIfTrue : exprIfFalse"
        },
        {
          "en": "condition -> exprIfTrue | exprIfFalse",
          "vi": "condition -> exprIfTrue | exprIfFalse"
        },
        {
          "en": "if (condition) exprIfTrue else exprIfFalse",
          "vi": "if (condition) exprIfTrue else exprIfFalse"
        },
        {
          "en": "condition ?? exprIfTrue :: exprIfFalse",
          "vi": "condition ?? exprIfTrue :: exprIfFalse"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The conditional operator takes three operands: condition followed by `?`, then truthy expression, `:`, and falsy expression.",
        "vi": "Toán tử điều kiện gồm 3 toán hạng: điều kiện theo sau là `?`, biểu thức khi đúng, dấu `:` và biểu thức khi sai."
      },
      "topicId": "js_control_flow",
      "difficulty": "medium"
    },
    {
      "id": "js_q_6_6",
      "type": "predict_output",
      "question": {
        "en": "What is the value of `status` in this code?\n```js\nconst score = 85;\nconst status = score >= 90 ? 'High' : score >= 70 ? 'Pass' : 'Fail';\nconsole.log(status);\n```",
        "vi": "Giá trị của `status` trong đoạn mã sau là gì?\n```js\nconst score = 85;\nconst status = score >= 90 ? 'High' : score >= 70 ? 'Pass' : 'Fail';\nconsole.log(status);\n```"
      },
      "options": [
        {
          "en": "'Pass'",
          "vi": "'Pass'"
        },
        {
          "en": "'High'",
          "vi": "'High'"
        },
        {
          "en": "'Fail'",
          "vi": "'Fail'"
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
        "en": "85 is not >= 90, so the second branch evaluates: 85 >= 70 is true, resulting in `'Pass'`.",
        "vi": "85 không >= 90 nên nhánh thứ 2 được đánh giá: 85 >= 70 là true nên trả về `'Pass'`."
      },
      "topicId": "js_control_flow",
      "difficulty": "medium"
    },
    {
      "id": "js_q_6_7",
      "type": "fill_blank",
      "question": {
        "en": "In a switch statement, the fallback clause executed when no other case matches is the _____ clause.",
        "vi": "Trong câu lệnh switch, mệnh đề dự phòng được thực thi khi không có case nào khớp là mệnh đề _____."
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
        "en": "The `default` clause catches any unmatched input expressions in a switch block.",
        "vi": "Mệnh đề `default` bắt tất cả các trường hợp giá trị không khớp với bất kỳ case nào trong switch."
      },
      "topicId": "js_control_flow",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "default"
      ]
    },
    {
      "id": "js_q_6_8",
      "type": "single_choice",
      "question": {
        "en": "Why is an Object or Map lookup table often preferred over a 20-case switch statement?",
        "vi": "Tại sao bảng tra cứu Object hoặc Map thường được ưa chuộng hơn câu lệnh switch có 20 case?"
      },
      "options": [
        {
          "en": "It provides cleaner O(1) key lookup, is dynamically extensible, and separates data from logic",
          "vi": "Nó cho phép tra cứu key O(1) sạch sẽ, có thể mở rộng động và tách rời dữ liệu khỏi logic thực thi"
        },
        {
          "en": "Switch statements are completely banned in strict mode",
          "vi": "Switch bị cấm hoàn toàn trong strict mode"
        },
        {
          "en": "Objects consume less CPU registers than switch",
          "vi": "Object tiêu tốn ít thanh ghi CPU hơn switch"
        },
        {
          "en": "Map automatically caches output in local storage",
          "vi": "Map tự động lưu kết quả vào local storage"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Lookup dictionaries are declarative, easier to test, configure dynamically, and eliminate fall-through bug risks.",
        "vi": "Bảng tra cứu mang tính khai báo, dễ viết test, có thể cấu hình động và loại bỏ nguy cơ lỗi do quên break."
      },
      "topicId": "js_control_flow",
      "difficulty": "hard"
    },
    {
      "id": "js_q_6_9",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log(false ? 'yes' : true ? 'maybe' : 'no')` print?",
        "vi": "`console.log(false ? 'yes' : true ? 'maybe' : 'no')` sẽ in ra gì?"
      },
      "options": [
        {
          "en": "'maybe'",
          "vi": "'maybe'"
        },
        {
          "en": "'yes'",
          "vi": "'yes'"
        },
        {
          "en": "'no'",
          "vi": "'no'"
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
        "en": "First condition is false, so it evaluates the right branch `true ? 'maybe' : 'no'`, yielding `'maybe'`.",
        "vi": "Điều kiện đầu là false nên chuyển sang vế phải `true ? 'maybe' : 'no'`, kết quả là `'maybe'`."
      },
      "topicId": "js_control_flow",
      "difficulty": "hard"
    },
    {
      "id": "js_q_6_10",
      "type": "single_choice",
      "question": {
        "en": "What is an anti-pattern when using the ternary operator?",
        "vi": "Cách sử dụng nào là phản mẫu (anti-pattern) khi dùng toán tử 3 ngôi?"
      },
      "options": [
        {
          "en": "Using ternary expressions solely for side-effects instead of returning a value (e.g. `isValid ? doA() : doB()`)",
          "vi": "Dùng toán tử 3 ngôi chỉ để gọi hàm gây tác dụng phụ thay vì gán giá trị (ví dụ `isValid ? doA() : doB()`)"
        },
        {
          "en": "Using ternary for string interpolation inside template literals",
          "vi": "Dùng 3 ngôi để nội suy chuỗi trong template literals"
        },
        {
          "en": "Assigning ternary results to const variables",
          "vi": "Gán kết quả 3 ngôi cho biến const"
        },
        {
          "en": "Returning ternary results from arrow functions",
          "vi": "Trả về kết quả 3 ngôi từ hàm mũi tên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Ternary operators are expressions meant to produce a value. For side effects and procedures, an `if / else` statement is clearer and more idiomatic.",
        "vi": "Toán tử 3 ngôi là biểu thức sinh ra giá trị. Đối với các thao tác gây tác dụng phụ, câu lệnh `if / else` rõ ràng và chuẩn mực hơn."
      },
      "topicId": "js_control_flow",
      "difficulty": "hard"
    }
  ]
};
export default lesson06;
