import { Book } from '../../types';

export const JAVASCRIPT_PATTERNS_BOOK: Book = {
  id: 'javascript-patterns',
  slug: 'javascript-patterns',
  title: 'JavaScript Design Patterns & Recipes',
  subtitle: {
    en: 'Module Pattern, Factory, Pub/Sub & Debounce/Throttle Recipes',
    vi: 'Module Pattern, Factory, Mẫu Pub/Sub & Công Thức Debounce/Throttle',
  },
  bookType: 'Patterns / Recipes',
  categoryId: 'javascript',
  subjectId: 'programming',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Intermediate',
  estimatedReadTime: '30 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-18',
  accentColor: 'from-amber-600 to-amber-900',
  tags: ['Patterns', 'Debounce', 'Throttle', 'PubSub', 'Recipes'],
  description: {
    en: 'A collection of essential JavaScript design patterns and formulas: Debounce, Throttle, Publisher/Subscriber Event Emitter, Singleton, and Factory functions.',
    vi: 'Bộ công thức và mẫu thiết kế JavaScript hữu ích: Debounce, Throttle, Hệ thống sự kiện Pub/Sub, Singleton và Factory functions.',
  },
  prerequisites: {
    en: [
      'Understanding of closures, higher-order functions, and event callback execution in JavaScript',
    ],
    vi: [
      'Hiểu biết về closure, hàm bậc cao (higher-order functions) và cơ chế thực thi callback sự kiện trong JavaScript',
    ],
  },
  outcomes: {
    en: [
      'Implement custom lightweight debounce and throttle helper utilities from scratch without third-party dependencies',
      'Construct memory-safe Publisher/Subscriber (EventEmitter) message buses with dynamic listener registration and cleanup',
      'Optimize high-frequency UI events (search inputs, infinite scrolling, window resizing) for 60fps responsiveness',
    ],
    vi: [
      'Tự xây dựng các hàm tiện ích Debounce và Throttle siêu nhẹ từ đầu mà không cần thư viện ngoài',
      'Thiết lập kênh truyền tin Publisher/Subscriber (EventEmitter) an toàn bộ nhớ với cơ chế đăng ký và hủy lắng nghe linh hoạt',
      'Tối ưu hóa các sự kiện giao diện tần suất cao (ô tìm kiếm, cuộn vô tận, thay đổi kích thước cửa sổ) đạt chuẩn 60fps mượt mà',
    ],
  },
  chapters: [
    {
      id: 'jpat-ch-1',
      number: 1,
      slug: 'debounce-and-throttle-recipes',
      title: {
        en: 'Debounce & Throttle Helper Recipes',
        vi: 'Công Thức Viết Hàm Debounce & Throttle',
      },
      summary: {
        en: 'Rate-limiting high-frequency DOM events (scroll, resize, search input) to prevent CPU bottlenecks.',
        vi: 'Tiết chế tần suất sự kiện DOM dồn dập (scroll, resize, gõ ô tìm kiếm) để tránh nghẽn CPU.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'jpat-1-1',
          title: {
            en: 'Custom Debounce Implementation',
            vi: 'Tự Viết Hàm Debounce Nhẹ Nhàng',
          },
          keyIdea: {
            en: 'Debounce delays function invocation until a specified silent pause has elapsed since the last trigger, ideal for autocomplete search queries and auto-save triggers.',
            vi: 'Debounce hoãn việc gọi hàm cho đến khi hết khoảng thời gian im lặng chỉ định kể từ lần kích hoạt cuối cùng, lý tưởng cho tính năng gợi ý tìm kiếm và tự động lưu dữ liệu.',
          },
          content: {
            en: 'When users type into a search input or resize a browser window, hundreds of events fire per second. Executing an expensive API call or DOM recalculation on every keystroke causes interface stutter and server load spikes. A Debounce higher-order function wraps the target callback, resetting an internal timer upon each trigger and executing only after the user stops typing for `delayMs` milliseconds.',
            vi: 'Khi người dùng gõ phím vào ô tìm kiếm hoặc thay đổi kích thước cửa sổ trình duyệt, hàng trăm sự kiện được kích hoạt mỗi giây. Việc thực thi gọi API tốn kém hoặc tính toán lại DOM trên mỗi phím bấm sẽ gây giật lag giao diện và quá tải máy chủ. Hàm bậc cao Debounce bọc lấy callback mục tiêu, tự động reset bộ đếm thời gian sau mỗi lần kích hoạt và chỉ thực thi khi người dùng ngừng thao tác trong khoảng thời gian `delayMs`.',
          },
          patternDetails: {
            problem: {
              en: 'High-frequency user inputs (typing in search bars, live form validation) trigger excessive network requests and UI re-renders on every keystroke.',
              vi: 'Thao tác người dùng tần suất cao (gõ phím vào thanh tìm kiếm, kiểm tra form trực tiếp) kích hoạt quá nhiều yêu cầu mạng và re-render giao diện liên tục.',
            },
            context: {
              en: 'Client-side web applications connecting input fields to asynchronous search APIs or layout re-computation engines.',
              vi: 'Ứng dụng web phía client kết nối ô nhập liệu với các API tìm kiếm bất đồng bộ hoặc bộ tính toán lại bố cục giao diện.',
            },
            solutionOverview: {
              en: 'Use a closure to encapsulate a timer reference, clearing the previous timeout on each new trigger and establishing a fresh timer for delayed execution.',
              vi: 'Sử dụng closure để đóng gói tham chiếu bộ đếm thời gian, xóa timeout trước đó sau mỗi lần kích hoạt mới và tạo timer mới để thực thi trì hoãn.',
            },
            architectureDiagram: {
              title: {
                en: 'Debounce Execution Timeline',
                vi: 'Dòng Thời Gian Thực Thi Của Debounce',
              },
              steps: [
                {
                  stepNumber: 1,
                  title: { en: 'Event Triggered', vi: 'Sự Kiện Kích Hoạt' },
                  description: {
                    en: 'User presses a key; existing timer is cleared and a new setTimeout is started.',
                    vi: 'Người dùng nhấn một phím; timer cũ bị hủy và một setTimeout mới được khởi động.',
                  },
                },
                {
                  stepNumber: 2,
                  title: { en: 'Burst of Rapid Events', vi: 'Chuỗi Sự Kiện Dồn Dập' },
                  description: {
                    en: 'Subsequent keystrokes continually reset the timer before it can expire.',
                    vi: 'Các phím bấm tiếp theo liên tục reset timer trước khi nó kịp kích hoạt.',
                  },
                },
                {
                  stepNumber: 3,
                  title: { en: 'Silent Period & Execution', vi: 'Hết Khoảng Chờ & Thực Thi' },
                  description: {
                    en: 'User pauses typing; timer completes delayMs and invokes the target function exactly once.',
                    vi: 'Người dùng dừng gõ; timer chạy hết thời gian delayMs và gọi hàm mục tiêu đúng 1 lần duy nhất.',
                  },
                },
              ],
            },
            implementation: {
              language: 'javascript',
              filename: 'debounce.js',
              explanation: {
                en: 'Clean, dependency-free debounce implementation preserving this context and arguments.',
                vi: 'Hàm debounce thuần túy không phụ thuộc thư viện ngoài, giữ nguyên ngữ cảnh this và tham số.',
              },
              code: `/**
 * Creates a debounced function that delays invoking fn until after delayMs
 * milliseconds have elapsed since the last time the debounced function was invoked.
 */
export function debounce(fn, delayMs = 300) {
  let timerId = null;

  function debounced(...args) {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(this, args);
      timerId = null;
    }, delayMs);
  }

  debounced.cancel = function () {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
}`,
            },
            tradeOffs: {
              en: [
                'Inherent latency: The user must pause for delayMs before the action takes place.',
              ],
              vi: [
                'Độ trễ phản hồi: Người dùng phải dừng thao tác trong khoảng delayMs trước khi hành động diễn ra.',
              ],
            },
            gotchas: {
              en: [
                'In React functional components, creating a debounce function directly in the render body creates a new instance on every render; wrap in useMemo or useCallback with empty dependencies.',
              ],
              vi: [
                'Trong React functional component, khai báo hàm debounce trực tiếp trong hàm render sẽ tạo instance mới mỗi lần re-render; cần bọc trong useMemo hoặc useCallback.',
              ],
            },
            whenNotToUse: {
              en: [
                'When real-time intermediate feedback is mandatory during active user motion (use Throttle instead for continuous scroll tracking).',
              ],
              vi: [
                'Khi cần phản hồi liên tục ngay trong quá trình chuyển động của người dùng (hãy dùng Throttle thay thế để theo dõi cuộn trang mượt mà).',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'jpat-ch-2',
      number: 2,
      slug: 'pub-sub-event-emitter',
      title: {
        en: 'Publisher/Subscriber (Pub/Sub) Pattern',
        vi: 'Mẫu Thiết Kế Publisher/Subscriber (Pub/Sub)',
      },
      summary: {
        en: 'Decoupling component communication with a custom EventEmitter in-memory bus.',
        vi: 'Tách biệt giao tiếp giữa các component bằng kênh EventEmitter tự chế trong bộ nhớ.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'jpat-2-1',
          title: {
            en: 'Building an In-Memory Event Bus',
            vi: 'Xây Dựng Kênh Event Bus Trong Bộ Nhớ',
          },
          keyIdea: {
            en: 'The Publisher/Subscriber pattern establishes an indirect messaging broker where publishers emit named events without knowing who the subscribers are, completely decoupling modular subsystems.',
            vi: 'Mẫu thiết kế Publisher/Subscriber tạo ra kênh môi giới truyền tin gián tiếp nơi bên phát (publisher) bắn các sự kiện có tên mà không cần biết ai là bên nhận (subscriber), giúp tách biệt hoàn toàn các module trong hệ thống.',
          },
          content: {
            en: 'Direct parent-to-child or peer-to-peer coupling across disparate application modules creates tightly bound spaghetti code. An in-memory EventEmitter provides a centralized hub with `on(eventName, handler)`, `off(eventName, handler)`, `once(eventName, handler)`, and `emit(eventName, data)` methods. Subscribers listen to relevant domain topics, and publishers broadcast payloads without retaining direct references to listening components.',
            vi: 'Việc ghép nối trực tiếp giữa các component cha-con hoặc ngang hàng giữa các module khác nhau sẽ tạo nên mã nguồn chằng chịt và khó bảo trì. Một EventEmitter trong bộ nhớ cung cấp trạm trung chuyển tập trung với các phương thức `on(eventName, handler)`, `off(eventName, handler)`, `once(eventName, handler)` và `emit(eventName, data)`. Bên nhận đăng ký lắng nghe các chủ đề nghiệp vụ cần thiết, còn bên phát gửi dữ liệu mà không cần giữ bất kỳ tham chiếu trực tiếp nào tới các component nhận.',
          },
          patternDetails: {
            problem: {
              en: 'Distant UI modules need to communicate state changes (e.g., cart updates affecting header badges and analytics trackers) without prop drilling or hard dependencies.',
              vi: 'Các module UI cách xa nhau cần thông báo thay đổi trạng thái (như cập nhật giỏ hàng ảnh hưởng đến badge trên header và hệ thống analytics) mà không muốn truyền prop nhiều tầng hay phụ thuộc cứng.',
            },
            context: {
              en: 'Modular JavaScript web applications with independent widget lifecycles.',
              vi: 'Ứng dụng web JavaScript dạng module hóa với vòng đời component độc lập.',
            },
            solutionOverview: {
              en: 'Create an EventEmitter class managing a dictionary of event names mapped to arrays of callback subscriber functions.',
              vi: 'Tạo class EventEmitter quản lý một từ điển ánh xạ tên sự kiện tới danh sách các hàm callback đã đăng ký.',
            },
            implementation: {
              language: 'javascript',
              filename: 'eventEmitter.js',
              explanation: {
                en: 'Robust EventEmitter implementation with on, off, once, and emit capabilities.',
                vi: 'Hiện thực class EventEmitter hoàn chỉnh với đầy đủ on, off, once và emit.',
              },
              code: `export class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
    // Return unsubscribe cleanup function
    return () => this.off(event, listener);
  }

  off(event, listener) {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.events.delete(event);
      }
    }
  }

  once(event, listener) {
    const unsubscribe = this.on(event, (...args) => {
      unsubscribe();
      listener.apply(this, args);
    });
    return unsubscribe;
  }

  emit(event, ...args) {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(...args);
        } catch (err) {
          console.error(\`Error in event listener for "\${event}":\`, err);
        }
      });
    }
  }
}`,
            },
            tradeOffs: {
              en: [
                'Indirect control flow: Tracing which handlers execute upon an emit event requires inspecting subscriptions rather than reading static call chains.',
              ],
              vi: [
                'Luồng điều khiển gián tiếp: Việc theo dõi các hàm xử lý nào được gọi khi bắn sự kiện đòi hỏi kiểm tra các vị trí đăng ký thay vì đọc luồng gọi hàm tĩnh.',
              ],
            },
            gotchas: {
              en: [
                'Memory leaks: If components subscribe with on() during mount and forget to call off() or the unsubscribe function during unmount, callback references will prevent garbage collection.',
              ],
              vi: [
                'Rò rỉ bộ nhớ: Nếu component đăng ký on() khi mount mà quên gọi off() hoặc hàm unsubscribe khi unmount, tham chiếu callback sẽ ngăn Garbage Collector dọn dẹp bộ nhớ.',
              ],
            },
            whenNotToUse: {
              en: [
                'For simple parent-to-child communication where native props or callbacks are sufficient.',
              ],
              vi: [
                'Cho giao tiếp cha-con đơn giản nơi việc truyền props hoặc callback trực tiếp là đủ đáp ứng.',
              ],
            },
          },
        },
      ],
    },
  ],
};
