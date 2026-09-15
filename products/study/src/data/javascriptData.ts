import { Course } from '../types';
import { module01Lessons as basicMod01Lessons } from './javascript/basic/module01';
import { module02Lessons as basicMod02Lessons } from './javascript/basic/module02';
import { module01Lessons as intMod01Lessons } from './javascript/intermediate/module01';
import { module02Lessons as intMod02Lessons } from './javascript/intermediate/module02';
import { module01Lessons as advMod01Lessons } from './javascript/advanced/module01';
import { module02Lessons as advMod02Lessons } from './javascript/advanced/module02';

export const javascriptCourse: Course = {
  id: 'javascript',
  title: { en: 'Modern JavaScript (ES6+ & Beyond)', vi: 'JavaScript Hiện Đại (ES6+ & Toàn Diện)' },
  tagline: { 
    en: 'Master modern JavaScript: closures, async/await, DOM engine, Event Loop, prototype chain, and enterprise architecture', 
    vi: 'Làm chủ JavaScript hiện đại: closures, async/await, xử lý DOM, Event Loop, kế thừa prototype và kiến trúc bất đồng bộ' 
  },
  description: {
    en: 'A comprehensive, production-grade JavaScript curriculum: from fundamentals (let/const, arrow functions, destructuring, higher-order array methods, Map/Set) to intermediate DOM events, Web APIs, and async/await, up to advanced Event Loop microtasks, closures, Proxy/Reflect, Web Workers, and V8 engine JIT internals.',
    vi: 'Chương trình đào tạo JavaScript chuẩn doanh nghiệp toàn diện: từ nền tảng (let/const, hàm mũi tên, destructuring, hàm mảng map/filter/reduce, Map/Set) đến xử lý sự kiện DOM, Web APIs và async/await, tiến tới chuyên sâu Event Loop microtasks, Closures, Proxy/Reflect, Web Workers và kiến trúc V8 engine JIT.'
  },
  iconName: 'Code',
  color: 'from-amber-400 via-yellow-500 to-amber-600',
  accentBg: 'bg-yellow-500/15 border-yellow-500/35 text-yellow-400',
  levels: {
    basic: {
      id: 'basic',
      courseId: 'javascript',
      order: 1,
      title: { en: 'JS Fundamentals, Types, Functions & Arrays', vi: 'JavaScript Cơ Bản: Kiểu Dữ Liệu, Hàm & Mảng' },
      description: { 
        en: 'Variables (let, const), data types, type coercion, operators, control flow, arrow functions, rest/spread parameters, and modern array methods (map, filter, reduce).', 
        vi: 'Khai báo biến (let, const), kiểu dữ liệu, ép kiểu, toán tử, cấu trúc rẽ nhánh, hàm mũi tên, tham số rest/spread và các phương thức mảng hiện đại.' 
      },
      modules: [
        {
          id: 'js_mod_1',
          levelId: 'basic',
          courseId: 'javascript',
          order: 1,
          title: { en: 'Module 01: Core Syntax, Variables & Types (Lessons 1–5)', vi: 'Chương 01: Cú Pháp Cốt Lõi, Biến & Kiểu Dữ Liệu (Bài 1–5)' },
          description: { 
            en: 'JavaScript runtime execution, block scope with let/const, primitive vs reference types, coercion & equality, and string manipulation.', 
            vi: 'Cơ chế thực thi JavaScript, phạm vi khối let/const, kiểu tham trị vs tham chiếu, ép kiểu & so sánh, cùng xử lý chuỗi ký tự.' 
          },
          lessons: basicMod01Lessons
        },
        {
          id: 'js_mod_2',
          levelId: 'basic',
          courseId: 'javascript',
          order: 2,
          title: { en: 'Module 02: Control Flow, Functions, Arrays & Objects (Lessons 6–10)', vi: 'Chương 02: Cấu Trúc Điều Khiển, Hàm, Mảng & Đối Tượng (Bài 6–10)' },
          description: { 
            en: 'Conditionals and loops, first-class functions & arrow functions, array manipulation, and object properties/destructuring.', 
            vi: 'Cấu trúc điều kiện và vòng lặp, hàm bậc nhất & hàm mũi tên, thao tác mảng và thuộc tính/phân rã đối tượng.' 
          },
          lessons: basicMod02Lessons
        }
      ]
    },
    intermediate: {
      id: 'intermediate',
      courseId: 'javascript',
      order: 2,
      title: { en: 'DOM Engine, Events, Async Architecture & Web APIs', vi: 'DOM Engine, Sự Kiện, Kiến Trúc Bất Đồng Bộ & Web APIs' },
      description: { 
        en: 'Higher-order methods, lexical closures, execution contexts, Event Loop microtasks, Promises/async-await, prototypes, and browser DOM APIs.', 
        vi: 'Phương thức bậc cao, closures, ngữ cảnh thực thi, Event Loop microtasks, Promises/async-await, kế thừa prototype và Web APIs trình duyệt.' 
      },
      modules: [
        {
          id: 'js_mod_3',
          levelId: 'intermediate',
          courseId: 'javascript',
          order: 3,
          title: { en: 'Module 03: Functional JS, Closures, Scope & Event Loop (Lessons 11–14)', vi: 'Chương 03: JS Hàm, Closures, Phạm Vi & Event Loop (Bài 11–14)' },
          description: { 
            en: 'Array combinators (map, filter, reduce), closures and lexical scope, `this` binding (call, apply, bind), and asynchronous Event Loop microtask queues.', 
            vi: 'Xử lý mảng nâng cao (map, filter, reduce), closures và phạm vi từ vựng, ràng buộc `this` (call, apply, bind) và hàng đợi microtask của Event Loop.' 
          },
          lessons: intMod01Lessons
        },
        {
          id: 'js_mod_4',
          levelId: 'intermediate',
          courseId: 'javascript',
          order: 4,
          title: { en: 'Module 04: Async Patterns, OOP, DOM & Web APIs (Lessons 15–20)', vi: 'Chương 04: Bất Đồng Bộ, Hướng Đối Tượng, DOM & Web APIs (Bài 15–20)' },
          description: { 
            en: 'Promises and async/await combinators, prototypes and ES6 classes, high-performance DOM manipulation, event delegation, and Fetch API with Web Storage.', 
            vi: 'Tổ hợp Promise và async/await, kế thừa prototype và ES6 classes, thao tác DOM hiệu năng cao, ủy quyền sự kiện và Fetch API với Web Storage.' 
          },
          lessons: intMod02Lessons
        }
      ]
    },
    advanced: {
      id: 'advanced',
      courseId: 'javascript',
      order: 3,
      title: { en: 'Runtime Internals, Metaprogramming & Architecture', vi: 'Kiến Trúc Runtime, Siêu Lập Trình & Tối Ưu Hóa' },
      description: { 
        en: 'Iterators, generators, Symbols, Proxy & Reflect, memory management, ES Modules, multithreaded Web Workers, modern ES features, and V8 JIT engine internals.', 
        vi: 'Iterators, generators, Symbols, Proxy & Reflect, quản lý bộ nhớ, ES Modules, Web Workers đa luồng, tính năng ES mới và kiến trúc V8 JIT engine.' 
      },
      modules: [
        {
          id: 'js_mod_5',
          levelId: 'advanced',
          courseId: 'javascript',
          order: 5,
          title: { en: 'Module 05: Iterators, Generators, Metaprogramming & Memory (Lessons 21–24)', vi: 'Chương 05: Iterators, Generators, Siêu Lập Trình & Bộ Nhớ (Bài 21–24)' },
          description: { 
            en: 'Custom iterators & async generators, Symbols metaprogramming hooks, Proxy & Reflect reactivity systems, and WeakMap/WeakSet garbage collection mechanics.', 
            vi: 'Iterators tùy chỉnh & generators bất đồng bộ, siêu lập trình với Symbols, hệ thống phản ứng Proxy & Reflect, cùng cơ chế dọn rác WeakMap/WeakSet.' 
          },
          lessons: advMod01Lessons
        },
        {
          id: 'js_mod_6',
          levelId: 'advanced',
          courseId: 'javascript',
          order: 6,
          title: { en: 'Module 06: Modules, Concurrency, Modern Syntax & Engine Internals (Lessons 25–28)', vi: 'Chương 06: Modules, Đa Luồng, Cú Pháp Mới & Kiến Trúc Engine (Bài 25–28)' },
          description: { 
            en: 'ESM vs CJS module resolution & Import Maps, Web Workers multithreading with SharedArrayBuffer, ES2020–ES2024 language ergonomics, and V8 JIT TurboFan compilation internals.', 
            vi: 'Cơ chế module ESM vs CJS & Import Maps, đa luồng Web Workers với SharedArrayBuffer, các tính năng ngôn ngữ ES2020–ES2024 và kiến trúc biên dịch V8 JIT TurboFan.' 
          },
          lessons: advMod02Lessons
        }
      ]
    }
  }
};

export default javascriptCourse;
