import { Book } from '../../types';

export const JAVASCRIPT_DEFINITIONS_BOOK: Book = {
  id: 'javascript-definitions',
  slug: 'javascript-definitions',
  title: 'JavaScript Definitions & Engine Terms',
  subtitle: {
    en: 'Precise Runtime Definitions, Mental Models & Language Specifications',
    vi: 'Định Nghĩa Chuẩn Runtime, Mô Hình Tư Duy & Đặc Tả Ngôn Ngữ JavaScript',
  },
  bookType: 'Definitions',
  categoryId: 'javascript',
  subjectId: 'programming',
  author: '4TM Technical Board',
  role: 'Core Language & Web Architecture Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '28 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-12',
  accentColor: 'from-amber-600 to-yellow-800',
  tags: ['Definitions', 'JavaScript', 'Closures', 'TDZ', 'Prototypes', 'this', 'Engine'],
  description: {
    en: 'Authoritative, specification-grounded definitions for JavaScript runtime mechanics: Closures, Lexical Environments, Temporal Dead Zone (TDZ), Prototype Chains, and the 4 Rules of "this" binding.',
    vi: 'Cẩm nang định nghĩa chuẩn xác theo đặc tả ECMAScript về cơ chế runtime: Closure, Môi trường Lexical, Vùng chết thời gian (TDZ), Chuỗi Prototype và 4 quy tắc binding từ khóa "this".',
  },
  prerequisites: {
    en: [
      'Basic familiarity with JavaScript syntax and functional execution',
      'Experience authoring object literals and asynchronous callbacks',
    ],
    vi: [
      'Quen thuộc căn bản với cú pháp JavaScript và thực thi hàm',
      'Kinh nghiệm viết object literals và hàm callback bất đồng bộ',
    ],
  },
  outcomes: {
    en: [
      'Construct accurate mental models for closures and lexical environment records',
      'Explain the Temporal Dead Zone (TDZ) and distinction between initialization and declaration',
      'Trace prototype property lookups through [[Prototype]] chains with precision',
      'Determine the binding of the "this" keyword at any call site without ambiguity',
    ],
    vi: [
      'Xây dựng mô hình tư duy chính xác về closure và bản ghi môi trường từ vựng (lexical environment)',
      'Giải thích tường tận vùng chết thời gian (TDZ) và sự khác biệt giữa khởi tạo và khai báo',
      'Truy vết tra cứu thuộc tính xuyên suốt chuỗi [[Prototype]] với độ chính xác cao',
      'Xác định chuẩn xác giá trị của từ khóa "this" tại mọi vị trí gọi hàm (call site)',
    ],
  },
  chapters: [
    // Chapter 1: Execution Context, Lexical Scope & Variable Lifecycles
    {
      id: 'js-def-ch-1',
      number: 1,
      slug: 'scope-closures-tdz-definitions',
      title: {
        en: 'Lexical Environments, Closures & Variable Lifecycles',
        vi: 'Môi Trường Lexical, Closures & Vòng Đời Biến',
      },
      summary: {
        en: 'Formal definitions and mental models for Lexical Scope, Closure memory retention, Hoisting, and the Temporal Dead Zone.',
        vi: 'Định nghĩa chuẩn và mô hình tư duy về Lexical Scope, cơ chế giữ bộ nhớ của Closure, Hoisting và Vùng chết thời gian (TDZ).',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'js-def-1-1',
          title: {
            en: 'Closure & Lexical Environment',
            vi: 'Định Nghĩa Closure & Môi Trường Lexical',
          },
          definitionDetails: {
            term: {
              en: 'Closure',
              vi: 'Closure (Bao Đóng)',
            },
            formalDefinition: {
              en: 'A closure is the combination of a function object and a reference to its enclosing Lexical Environment Record (ECMA-262 §9.1.1). When an outer function execution context pops off the call stack, variables referenced by an inner function remain preserved on the managed heap rather than being deallocated.',
              vi: 'Closure là sự kết hợp giữa một đối tượng hàm và tham chiếu đến Bản ghi Môi trường Từ vựng (Lexical Environment Record) bao quanh nó (ECMA-262 §9.1.1). Khi ngữ cảnh thực thi của hàm cha được lấy ra khỏi Call Stack, các biến được hàm con tham chiếu vẫn được lưu giữ trên Heap thay vì bị giải phóng bộ nhớ.',
            },
            mentalModel: {
              en: 'Think of a closure as a backpack attached to a function. When a function is created inside another function, it packs all variables in its surrounding lexical scope into this backpack. Wherever the function travels—passed to another module, set on a timer, or returned—it carries that backpack with live references to those original variables.',
              vi: 'Hãy hình dung closure như chiếc ba lô gắn liền với một hàm. Khi một hàm được sinh ra bên trong hàm khác, nó đóng gói tất cả các biến ở phạm vi xung quanh vào chiếc ba lô này. Bất kể hàm đó được truyền đi đâu—sang module khác, vào bộ hẹn giờ hay được trả về—nó luôn mang theo chiếc ba lô chứa tham chiếu sống đến các biến ban đầu.',
            },
            whyItMatters: {
              en: 'Closures are the foundational mechanism enabling data privacy, factory functions, currying, memoization, event listeners, and React hooks (e.g. useState and useEffect).',
              vi: 'Closure là cơ chế nền tảng tạo nên tính đóng gói dữ liệu riêng tư (data privacy), factory functions, currying, memoization, event listeners và các hook trong React (như useState và useEffect).',
            },
            commonMisconception: {
              en: 'A common misconception is that closures create static copies or snapshots of variables at the moment of creation. In reality, closures retain live references to the actual variable bindings in the Environment Record; mutating a variable updates the closure state in real time.',
              vi: 'Một hiểu lầm phổ biến là cho rằng closure sao chép giá trị tĩnh của biến tại thời điểm hàm được tạo. Thực tế, closure giữ tham chiếu sống đến chính biến đó trong Environment Record; khi biến bị thay đổi, closure phản ánh giá trị mới ngay lập tức.',
            },
            quickReference: {
              en: [
                'Lexical Scope: Determined author-time by physical code placement, not runtime call location.',
                'Heap Allocation: Variables captured in closures migrate from stack frames to the managed heap.',
                'Garbage Collection: Captured variables are retained until all referencing closures become unreachable.',
                'Encapsulation: Enables private state variables accessible only through returned privileged methods.',
              ],
              vi: [
                'Lexical Scope: Được xác định tại thời điểm viết code dựa vào vị trí vật lý, không phụ thuộc nơi gọi hàm.',
                'Cấp phát Heap: Các biến được closure thu nạp sẽ được chuyển từ stack frame sang vùng nhớ heap.',
                'Thu gom rác (GC): Biến thu nạp chỉ được giải phóng khi toàn bộ các closure tham chiếu không còn tới được.',
                'Đóng gói (Encapsulation): Cho phép tạo trạng thái riêng tư chỉ truy cập được qua các hàm đặc quyền được trả về.',
              ],
            },
            minimalExample: {
              language: 'javascript',
              filename: 'closure_state_retention.js',
              explanation: {
                en: 'Demonstrates private variable encapsulation and live reference mutation across multiple privileged methods.',
                vi: 'Minh họa đóng gói biến riêng tư và biến đổi tham chiếu sống qua các phương thức được trả về.',
              },
              code: `function createSecureCounter(initialCount = 0) {
  // Private variable held in heap lexical environment
  let count = initialCount;

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    get value() {
      return count;
    }
  };
}

const counter = createSecureCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.value);       // 12
// count is completely inaccessible from global scope!`,
            },
          },
          comparisonTable: {
            headers: [
              { en: 'Concept', vi: 'Khái Niệm' },
              { en: 'Scope Origin', vi: 'Nguồn Gốc Scope' },
              { en: 'Memory Lifetime', vi: 'Vòng Đời Bộ Nhớ' },
              { en: 'Primary Use Case', vi: 'Ứng Dụng Chính' },
            ],
            rows: [
              {
                en: ['Block Scope (let/const)', 'Nearest enclosing curly braces {}', 'Deallocated when block completes', 'Local loop counters, temporary logic'],
                vi: ['Block Scope (let/const)', 'Cặp dấu ngoặc nhọn gần nhất {}', 'Giải phóng khi khối lệnh kết thúc', 'Biến lặp cục bộ, tính toán tạm'],
              },
              {
                en: ['Closure Scope', 'Enclosing function environment record', 'Retained on heap while inner function lives', 'Private state, hooks, factory patterns'],
                vi: ['Closure Scope', 'Bản ghi môi trường của hàm bao ngoài', 'Lưu trên heap chừng nào hàm con còn sống', 'Trạng thái riêng tư, React hooks, factory'],
              },
              {
                en: ['Global Scope', 'Root execution context (window/globalThis)', 'Persists for entire process duration', 'Application-wide singletons, config'],
                vi: ['Global Scope', 'Ngữ cảnh thực thi gốc (window/globalThis)', 'Tồn tại suốt vòng đời tiến trình', 'Singleton ứng dụng, cấu hình hệ thống'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Closure Heap Retention Mechanics',
              vi: 'Cơ Chế Lưu Giữ Biến Trên Heap Của Closure',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Function Invocation', vi: 'Khởi Tạo Hàm Cha' },
                description: {
                  en: 'Outer function executes; its execution context pushes to Call Stack and initializes local variables.',
                  vi: 'Hàm cha chạy; ngữ cảnh thực thi được đưa vào Call Stack và khởi tạo các biến cục bộ.',
                },
              },
              {
                number: 2,
                label: { en: 'Inner Function Returned', vi: 'Trả Về Hàm Con' },
                description: {
                  en: 'Outer context pops off Call Stack, but its Environment Record is retained on heap because inner function holds a reference.',
                  vi: 'Ngữ cảnh hàm cha kết thúc trên Call Stack, nhưng Environment Record được giữ lại trên heap vì hàm con có tham chiếu.',
                },
              },
              {
                number: 3,
                label: { en: 'Independent Execution', vi: 'Thực Thi Độc Lập' },
                description: {
                  en: 'Inner function executes anywhere in code, reading and mutating the retained heap variables seamlessly.',
                  vi: 'Hàm con được gọi ở bất kỳ đâu, đọc và thay đổi các biến trên heap một cách mượt mà.',
                },
              },
            ],
          },
        },
        {
          id: 'js-def-1-2',
          title: {
            en: 'Temporal Dead Zone (TDZ) & Variable Hoisting',
            vi: 'Định Nghĩa Temporal Dead Zone (TDZ) & Hoisting',
          },
          definitionDetails: {
            term: {
              en: 'Temporal Dead Zone (TDZ)',
              vi: 'Vùng Chết Thời Gian (Temporal Dead Zone - TDZ)',
            },
            formalDefinition: {
              en: 'The Temporal Dead Zone (TDZ) is the temporal region between the entry of a block scope (where a `let`, `const`, or `class` identifier is declared/bound in the Environment Record) and the physical statement where it is explicitly initialized. Evaluating or reading an identifier while in its TDZ throws a runtime `ReferenceError`.',
              vi: 'Temporal Dead Zone (TDZ) là khoảng thời gian từ thời điểm bắt đầu đi vào một khối block scope (nơi định danh `let`, `const` hoặc `class` được đăng ký trong Environment Record) cho đến khi câu lệnh khởi tạo giá trị cho nó được thực thi. Mọi thao tác đọc biến khi đang nằm trong TDZ đều lập tức ném ra lỗi runtime `ReferenceError`.',
            },
            mentalModel: {
              en: 'Imagine reserving a hotel room (the variable is declared and known to the engine), but the room keys have not yet been minted (initialization has not happened). If you attempt to enter the room before receiving the key, security immediately stops you (ReferenceError: Cannot access variable before initialization).',
              vi: 'Hãy hình dung việc bạn đã đặt trước phòng khách sạn (biến đã được khai báo và engine đã biết tên), nhưng chìa khóa phòng vẫn chưa được cấp (chưa đến dòng gán giá trị khởi tạo). Nếu bạn cố tình bước vào phòng trước khi có chìa khóa, lễ tân sẽ chặn lại ngay lập tức (ReferenceError: Cannot access variable before initialization).',
            },
            whyItMatters: {
              en: 'TDZ eliminates insidious silent bugs where undefined values were unpredictably read before initialization under legacy `var` declarations, ensuring predictable program state.',
              vi: 'TDZ triệt tiêu các lỗi âm thầm nguy hiểm khi các giá trị vô tình nhận `undefined` trước khi khởi tạo dưới cú pháp `var` cũ, đảm bảo tính tất định của chương trình.',
            },
            commonMisconception: {
              en: 'A ubiquitous myth is that `let` and `const` variables are "not hoisted". They ARE hoisted in the sense that the engine scans the block and binds the identifier at block entry. The critical difference is that `var` is hoisted AND initialized to `undefined`, whereas `let`/`const` are hoisted into an uninitialized TDZ state.',
              vi: 'Một hiểu lầm rất phổ biến là cho rằng `let` và `const` "không bị hoist". Thực tế chúng CÓ bị hoist: engine quét khối lệnh và đăng ký tên biến ngay khi vào block. Điểm khác biệt mấu chốt là `var` được hoist VÀ tự gán `undefined`, còn `let`/`const` được hoist vào trạng thái chưa khởi tạo (TDZ).',
            },
            quickReference: {
              en: [
                'var: Hoisted to function scope and initialized to undefined.',
                'let / const: Hoisted to block scope, remains in TDZ until initialization line is evaluated.',
                'typeof Trap: typeof on an undeclared variable returns "undefined", but typeof on a TDZ variable throws ReferenceError.',
                'Best Practice: Always declare variables at the top of their enclosing scope.',
              ],
              vi: [
                'var: Được hoist lên phạm vi hàm và tự động khởi tạo giá trị undefined.',
                'let / const: Được hoist lên phạm vi block, nằm trong TDZ cho đến khi dòng khởi tạo chạy qua.',
                'Bẫy typeof: Toán tử typeof trên biến chưa khai báo trả về "undefined", nhưng trên biến đang trong TDZ sẽ ném ReferenceError.',
                'Quy chuẩn tốt nhất: Luôn khai báo biến ở đầu phạm vi sử dụng của chúng.',
              ],
            },
            minimalExample: {
              language: 'javascript',
              filename: 'tdz_behavior.js',
              explanation: {
                en: 'Proves hoisting occurs for let/const by showing an outer variable is shadowed by an inner TDZ variable.',
                vi: 'Chứng minh let/const có bị hoist bằng cách cho thấy biến ngoài bị che khuất bởi biến trong đang nằm trong TDZ.',
              },
              code: `const theme = 'dark';

function configureUI() {
  // If 'let theme' were NOT hoisted, this would log 'dark'.
  // But because it IS hoisted, 'theme' is bound to this block in the TDZ!
  try {
    console.log(theme); // Throws ReferenceError!
  } catch (err) {
    console.error(err.name + ': ' + err.message);
    // "ReferenceError: Cannot access 'theme' before initialization"
  }

  let theme = 'light'; // TDZ ends here!
  console.log(theme);  // 'light'
}

configureUI();`,
            },
          },
        },
      ],
    },

    // Chapter 2: Prototype Mechanics, Object Identity & Context Binding
    {
      id: 'js-def-ch-2',
      number: 2,
      slug: 'prototypes-and-this-keyword',
      title: {
        en: 'Prototype Chain & The 4 Rules of "this" Binding',
        vi: 'Chuỗi Prototype & 4 Quy Tắc Binding Của "this"',
      },
      summary: {
        en: 'Definitive specifications for object prototype delegation, [[Prototype]] vs .prototype, and the 4 deterministic invocation rules of the "this" keyword.',
        vi: 'Đặc tả chuẩn mực về ủy quyền prototype, phân biệt [[Prototype]] với .prototype và 4 quy tắc xác định giá trị của từ khóa "this".',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'js-def-2-1',
          title: {
            en: 'The Prototype Chain: [[Prototype]] vs .prototype',
            vi: 'Định Nghĩa Chuỗi Prototype: [[Prototype]] vs .prototype',
          },
          definitionDetails: {
            term: {
              en: 'Prototype Chain',
              vi: 'Chuỗi Kế Thừa Prototype (Prototype Chain)',
            },
            formalDefinition: {
              en: 'In JavaScript, every object possesses an internal hidden slot named `[[Prototype]]` (accessible via `Object.getPrototypeOf()`) which points either to another object or to `null`. When a property is queried on an object and not found directly on the instance, the engine recursively traverses this chain until the property is found or `null` is reached (ECMA-262 §10.1).',
              vi: 'Trong JavaScript, mọi object đều sở hữu một ô nhớ nội bộ ẩn mang tên `[[Prototype]]` (truy cập qua `Object.getPrototypeOf()`) trỏ đến một object khác hoặc `null`. Khi một thuộc tính được tìm kiếm trên object mà không có trên chính nó, engine sẽ duyệt ngược lên chuỗi này cho đến khi tìm thấy hoặc chạm tới `null` (ECMA-262 §10.1).',
            },
            mentalModel: {
              en: 'Think of prototype inheritance not as class-based DNA cloning, but as delegation. If an employee does not know how to solve a problem, they delegate the question to their supervisor (their prototype). If the supervisor does not know, they ask their director, continuing upward until reaching the CEO (Object.prototype). If the CEO does not know, the answer is undefined.',
              vi: 'Hãy hình dung kế thừa prototype không phải là nhân bản sao chép class, mà là cơ chế ủy quyền (delegation). Nếu một nhân viên không biết cách xử lý công việc, họ hỏi người quản lý trực tiếp (prototype của họ). Nếu quản lý không biết, họ hỏi lên giám đốc, tiếp tục đi lên cho đến tổng giám đốc (Object.prototype). Nếu tổng giám đốc cũng không biết, câu trả lời là undefined.',
            },
            whyItMatters: {
              en: 'Understanding prototypes explains how all built-in methods (such as `Array.prototype.map` or `Object.prototype.hasOwnProperty`) are shared efficiently across millions of instances without memory duplication.',
              vi: 'Hiểu rõ prototype giúp giải thích cách các phương thức có sẵn (như `Array.prototype.map` hay `Object.prototype.hasOwnProperty`) được dùng chung giữa hàng triệu instance mà không tốn bộ nhớ nhân bản hàm.',
            },
            commonMisconception: {
              en: 'Confusing `fn.prototype` with `obj.[[Prototype]]`. `Function.prototype` is ONLY a property on constructor functions used to set the `[[Prototype]]` of objects created via `new Function()`. Instances themselves do not have a `.prototype` property; they possess the internal `[[Prototype]]` link.',
              vi: 'Nhầm lẫn giữa `fn.prototype` và `obj.[[Prototype]]`. `Function.prototype` CHỈ là thuộc tính trên hàm khởi tạo để gán làm `[[Prototype]]` cho các đối tượng sinh ra từ `new Function()`. Bản thân các instance không có thuộc tính `.prototype`; chúng chỉ sở hữu liên kết nội bộ `[[Prototype]]`.',
            },
            quickReference: {
              en: [
                'Object.getPrototypeOf(obj): The standard, safe method to inspect [[Prototype]].',
                '__proto__: Legacy accessor property; avoid in modern production code.',
                'Property Shadowing: Defining a property on the instance prevents lookups to the prototype.',
                'End of Chain: Object.prototype.[[Prototype]] === null.',
              ],
              vi: [
                'Object.getPrototypeOf(obj): Phương thức chuẩn và an toàn nhất để kiểm tra [[Prototype]].',
                '__proto__: Thuộc tính accessor cũ; tránh sử dụng trong mã nguồn production hiện đại.',
                'Che khuất thuộc tính (Shadowing): Gán thuộc tính trên instance sẽ chặn việc tra cứu lên prototype.',
                'Điểm kết thúc: Object.prototype.[[Prototype]] === null.',
              ],
            },
            minimalExample: {
              language: 'javascript',
              filename: 'prototype_delegation.js',
              explanation: {
                en: 'Demonstrates prototype delegation using Object.create and property shadowing.',
                vi: 'Minh họa cơ chế ủy quyền prototype bằng Object.create và hiện tượng che khuất thuộc tính.',
              },
              code: `const devicePrototype = {
  powerOn() {
    this.powered = true;
    return \`\${this.name} powered on.\`;
  }
};

// Create instance linked via [[Prototype]]
const sensor = Object.create(devicePrototype);
sensor.name = 'IoT Temperature Sensor';

// Method is delegated up the prototype chain!
console.log(sensor.powerOn()); // "IoT Temperature Sensor powered on."
console.log(Object.getPrototypeOf(sensor) === devicePrototype); // true`,
            },
          },
        },
        {
          id: 'js-def-2-2',
          title: {
            en: 'The 4 Rules of "this" Binding',
            vi: '4 Quy Tắc Binding Của Từ Khóa "this"',
          },
          definitionDetails: {
            term: {
              en: '"this" Keyword Binding',
              vi: 'Quy Tắc Xác Định "this" (this Binding)',
            },
            formalDefinition: {
              en: 'The `this` keyword is a runtime binding established at function invocation time based exclusively on how and where the function is called (the call site). It is resolved through four priority rules: 1. New Binding, 2. Explicit Binding (`call`, `apply`, `bind`), 3. Implicit Binding (context object), and 4. Default Binding (global object or `undefined` in strict mode). Arrow functions do not bind `this`; they adopt `this` lexically from their enclosing scope.',
              vi: 'Từ khóa `this` là một binding lúc runtime được xác định tại thời điểm gọi hàm dựa hoàn toàn vào cách thức và vị trí gọi hàm (call site). Nó được giải quyết qua 4 quy tắc theo thứ tự ưu tiên: 1. New Binding, 2. Explicit Binding (`call`, `apply`, `bind`), 3. Implicit Binding (object chứa hàm), và 4. Default Binding (global object hoặc `undefined` trong strict mode). Arrow function không tự tạo `this` mà nhận `this` theo môi trường từ vựng (lexical this).',
            },
            mentalModel: {
              en: 'Ask four questions in order at the call site:\n1. Was the function called with `new`? -> `this` is the newly constructed object.\n2. Was it called with `call`, `apply`, or hard `bind`? -> `this` is the explicitly passed object.\n3. Was it called as a method on a context object (`user.speak()`)? -> `this` is that context object (`user`).\n4. None of the above? -> `this` is `undefined` (in strict mode) or the global object.',
              vi: 'Hãy tự đặt 4 câu hỏi theo thứ tự ưu tiên tại vị trí gọi hàm:\n1. Hàm có được gọi với từ khóa `new` không? -> `this` là object mới được tạo.\n2. Hàm có được gọi với `call`, `apply`, hoặc `bind` không? -> `this` là object được truyền vào tường minh.\n3. Hàm có được gọi qua object sở hữu (`user.speak()`) không? -> `this` chính là object sở hữu (`user`).\n4. Không thỏa mãn các điều trên? -> `this` là `undefined` (trong strict mode) hoặc global object.',
            },
            whyItMatters: {
              en: 'A massive percentage of frontend UI bugs (e.g. lost context in event callbacks or timer functions) occur when developers separate an object method from its parent object, dropping from Implicit Binding to Default Binding.',
              vi: 'Một tỷ lệ lớn các lỗi UI trong frontend (như mất context trong hàm callback sự kiện hay setTimeout) xảy ra khi lập trình viên tách phương thức ra khỏi object gốc, khiến binding bị rơi từ Implicit xuống Default Binding.',
            },
            commonMisconception: {
              en: 'Believing that `this` refers to the function itself or its lexical scope. In traditional functions, `this` has zero relationship with lexical scope; it depends entirely on the caller at runtime.',
              vi: 'Hiểu lầm rằng `this` trỏ đến chính hàm đó hoặc trỏ đến scope nơi hàm được viết. Với hàm truyền thống, `this` hoàn toàn không liên quan đến lexical scope mà phụ thuộc 100% vào vị trí gọi hàm lúc chạy.',
            },
            quickReference: {
              en: [
                'Rule 1 (Highest): new Foo() -> this is new instance.',
                'Rule 2: foo.call(obj) / foo.apply(obj) / foo.bind(obj) -> this is obj.',
                'Rule 3: obj.foo() -> this is obj.',
                'Rule 4 (Lowest): standalone foo() -> this is undefined in strict mode.',
                'Arrow Functions: Inherit this from outer scope; ignore call/apply/bind overrides.',
              ],
              vi: [
                'Quy tắc 1 (Ưu tiên nhất): new Foo() -> this là instance mới.',
                'Quy tắc 2: foo.call(obj) / foo.apply(obj) / foo.bind(obj) -> this là obj.',
                'Quy tắc 3: obj.foo() -> this là obj.',
                'Quy tắc 4 (Thấp nhất): gọi độc lập foo() -> this là undefined trong strict mode.',
                'Arrow Function: Kế thừa this từ scope bao quanh; bỏ qua mọi can thiệp của call/apply/bind.',
              ],
            },
            minimalExample: {
              language: 'javascript',
              filename: 'this_rules.js',
              explanation: {
                en: 'Demonstrates Implicit Binding loss and its resolution via hard binding or arrow functions.',
                vi: 'Minh họa hiện tượng mất Implicit Binding và cách khắc phục bằng hard binding hoặc arrow function.',
              },
              code: `'use strict';

const account = {
  owner: 'Alice',
  getBalance() {
    return \`Owner: \${this.owner}\`;
  }
};

// 1. Implicit Binding
console.log(account.getBalance()); // "Owner: Alice"

// 2. Implicit Binding LOSS (Callback extraction)
const detachedFn = account.getBalance;
try {
  detachedFn(); // In strict mode, throws TypeError: Cannot read property 'owner' of undefined!
} catch (e) {
  console.error(e.message);
}

// 3. Explicit Hard Binding Fix
const boundFn = account.getBalance.bind(account);
console.log(boundFn()); // "Owner: Alice"`,
            },
          },
        },
      ],
    },
  ],
};
