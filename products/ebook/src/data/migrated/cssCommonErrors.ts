import { Book } from '../../types';

export const CSS_COMMON_ERRORS_BOOK: Book = {
  id: 'css-common-errors',
  slug: 'css-common-errors',
  title: 'CSS Common Errors & Layout Pitfalls',
  subtitle: {
    en: 'Z-Index Wars, Collapsing Margins & Overflow Clipping Gotchas',
    vi: 'Cuộc Chiến Z-Index, Gộp Lề Margin & Lỗi Tràn Khung Overflow',
  },
  bookType: 'Common Errors',
  categoryId: 'css',
  subjectId: 'web',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-01-22',
  accentColor: 'from-amber-500 to-rose-800',
  tags: ['Z-Index', 'Margin Collapse', 'Debugging', 'Overflow Bugs'],
  description: {
    en: 'Debugging classic CSS nightmares: z-index not working due to stacking context isolation, vertical margin collapsing, and unexpected horizontal scrollbars.',
    vi: 'Sửa các sự cố CSS kinh điển: z-index không hoạt động do bị ngắt Stacking Context, gộp margin dọc và thanh cuộn ngang xuất hiện ngoài ý muốn.',
  },
  prerequisites: {
    en: [
      'Basic CSS layout knowledge, positioning rules, and browser DevTools inspection',
    ],
    vi: [
      'Hiểu biết bố cục CSS cơ bản, quy tắc định vị position và công cụ DevTools',
    ],
  },
  outcomes: {
    en: [
      'Fix z-index layering issues by diagnosing parent stacking contexts and isolation boundaries',
      'Eliminate unwanted horizontal page scrollbar leaks caused by 100vw calculations and missing border-box resets',
      'Prevent unintended margin collapse between adjacent blocks and parent-child boundaries',
    ],
    vi: [
      'Sửa triệt để lỗi z-index bằng cách chẩn đoán Stacking Context cha và ranh giới cô lập',
      'Loại bỏ thanh cuộn ngang tràn trang do tính sai đơn vị 100vw và thiếu reset border-box',
      'Ngăn ngừa hiện tượng gộp lề margin ngoài ý muốn giữa các khối liền kề và quan hệ cha-con',
    ],
  },
  chapters: [
    {
      id: 'cce-ch-1',
      number: 1,
      slug: 'z-index-and-stacking-traps',
      title: {
        en: 'Z-Index Failure & Stacking Context Isolation',
        vi: 'Lỗi Z-Index Không Có Tác Dụng & Cô Lập Context',
      },
      summary: {
        en: 'Why z-index: 9999 fails when a parent element creates a lower stacking context.',
        vi: 'Tại sao z-index: 9999 vẫn bị đè khi element cha thuộc stacking context thấp hơn.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'cce-1-1',
          title: {
            en: 'Parent Stacking Context Hierarchy',
            vi: 'Thứ Tự Stacking Context Của Element Cha',
          },
          keyIdea: {
            en: 'Child element z-index values are evaluated strictly inside their parent’s stacking context. No child z-index can escape its parent container’s layer.',
            vi: 'Giá trị z-index của phần tử con chỉ có tác dụng trong lòng Stacking Context cha. Phần tử con không thể đè lên lớp ngoài nếu cha bị đè.',
          },
          content: {
            en: 'A frequent CSS defect occurs when a developer assigns `z-index: 99999` to a dropdown menu or modal tooltip, yet it is still obscured behind a sibling element with `z-index: 2`. This occurs because `z-index` does not operate in a global flat plane; it operates inside local Stacking Contexts created by parent elements (via `position: relative` with `z-index`, `opacity < 1`, `transform`, or `filter`). The child is locked into its parent\'s stacking level.',
            vi: 'Một lỗi thường gặp trong CSS là khi lập trình viên gán `z-index: 99999` cho menu dropdown hay tooltip modal nhưng nó vẫn bị che lấp bởi một phần tử khác chỉ có `z-index: 2`. Hiện tượng này xảy ra vì `z-index` không hoạt động trên một mặt phẳng toàn cục phẳng; nó hoạt động trong các Stacking Context cục bộ do phần tử cha tạo ra (qua `position: relative` có `z-index`, `opacity < 1`, `transform` hoặc `filter`). Phần tử con bị khóa hoàn toàn trong cấp độ xếp chồng của cha nó.',
          },
          errorDetails: {
            errorSignature: {
              en: 'Stacking Context Trap / Child z-index Ineffective Outside Parent Boundary',
              vi: 'Bẫy Stacking Context / z-index Phần Tử Con Bị Vô Hiệu Ngoài Khung Cha',
            },
            symptoms: {
              en: [
                'Dropdown menus or tooltips render beneath sibling sidebars or cards despite having z-index: 9999',
                'Increasing z-index values to arbitrarily high numbers produces zero visual change',
                'Positioned children cannot layer on top of preceding elements on the page',
              ],
              vi: [
                'Menu dropdown hoặc tooltip bị hiển thị chìm dưới sidebar hoặc card bên cạnh dù đã đặt z-index: 9999',
                'Tăng giá trị z-index lên các số cực lớn không mang lại bất kỳ thay đổi nào',
                'Phần tử con định vị không thể xếp đè lên các phần tử xuất hiện phía trước trên trang',
              ],
            },
            minimalReproduction: {
              language: 'html',
              filename: 'broken_zindex.html',
              code: `<!-- BROKEN: Parent header creates a lower stacking context (z-index: 1) -->
<header class="navbar" style="position: relative; z-index: 1; opacity: 0.99;">
  <div class="dropdown-menu" style="position: absolute; z-index: 99999;">
    <!-- Obscured by hero banner! -->
    User Profile Menu
  </div>
</header>

<main class="hero-banner" style="position: relative; z-index: 2;">
  <h1>Welcome to the Platform</h1>
</main>`,
            },
            whyItHappens: {
              en: 'The parent <header> has opacity: 0.99 and z-index: 1, creating a local stacking context at level 1. The sibling <main> is at stacking level 2, so the entire header hierarchy (including its z-index: 99999 child) is painted below <main>.',
              vi: 'Thẻ cha <header> có opacity: 0.99 và z-index: 1, tạo nên một stacking context cục bộ ở cấp độ 1. Thẻ ngang hàng <main> ở cấp độ 2, do đó toàn bộ cây thẻ header (bao gồm con có z-index: 99999) đều bị vẽ bên dưới <main>.',
            },
            diagnosisSteps: {
              en: [
                'Open Chrome DevTools and inspect the parent container of the obscured element',
                'Check if parent has position + z-index, opacity, transform, filter, or will-change properties',
                'Compare the stacking level of the parent against the overlapping sibling element',
              ],
              vi: [
                'Mở Chrome DevTools và kiểm tra phần tử cha của đối tượng đang bị che lấp',
                'Xem phần tử cha có thuộc tính position + z-index, opacity, transform, filter hay will-change không',
                'So sánh cấp độ stacking context của cha với phần tử nằm đè lên nó',
              ],
            },
            correctFix: {
              language: 'html',
              filename: 'fixed_stacking_context.html',
              explanation: {
                en: 'Elevate the parent container\'s z-index or use isolation: isolate / React Portals for top-level overlays.',
                vi: 'Nâng giá trị z-index của phần tử cha hoặc dùng isolation: isolate / React Portal cho các lớp overlay.',
              },
              code: `<!-- CORRECT: Ensure the parent header holds a higher stacking level than page content -->
<header class="navbar" style="position: relative; z-index: 10;">
  <div class="dropdown-menu" style="position: absolute; z-index: 20;">
    User Profile Menu
  </div>
</header>

<main class="hero-banner" style="position: relative; z-index: 1;">
  <h1>Welcome to the Platform</h1>
</main>`,
            },
            fixExplanation: {
              en: 'By establishing `<header>` with `z-index: 10` higher than `<main>` (`z-index: 1`), all child elements inside `<header>` are painted above `<main>` on the screen.',
              vi: 'Bằng cách thiết lập `<header>` có `z-index: 10` cao hơn `<main>` (`z-index: 1`), tất cả các phần tử con bên trong `<header>` sẽ luôn được vẽ đè lên trên `<main>`.',
            },
            preventionRules: {
              en: [
                'Establish a systematic z-index token scale (--z-dropdown: 100, --z-sticky: 200, --z-modal: 500)',
                'Render global modals and floating tooltips at document root using DOM portals',
              ],
              vi: [
                'Xây dựng hệ thống token z-index có thứ bậc rõ ràng (--z-dropdown: 100, --z-sticky: 200, --z-modal: 500)',
                'Render modal toàn cục và tooltip nổi ở cấp cao nhất của tài liệu bằng DOM portal',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'cce-ch-2',
      number: 2,
      slug: 'unexpected-overflow-scrollbars',
      title: {
        en: 'Horizontal Scrollbar Leaks (vw Units & Padding)',
        vi: 'Rò Rỉ Thanh Cuộn Ngang (Đơn Vị vw & Padding)',
      },
      summary: {
        en: 'Why width: 100vw creates horizontal scrollbars and how to fix with box-sizing.',
        vi: 'Tại sao width: 100vw gây ra thanh cuộn ngang và cách khắc phục.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'cce-2-1',
          title: {
            en: '100vw Scrollbar Width Bug',
            vi: 'Lỗi 100vw Tính Cả Độ Rộng Thanh Cuộn',
          },
          keyIdea: {
            en: '100vw represents the total viewport width including the vertical scrollbar gutter, causing width: 100vw containers to exceed the document client area and trigger an accidental horizontal scrollbar.',
            vi: '100vw đại diện cho toàn bộ chiều rộng khung nhìn bao gồm cả rãnh thanh cuộn dọc, khiến phần tử có width: 100vw vượt quá diện tích hiển thị và làm xuất hiện thanh cuộn ngang ngoài ý muốn.',
          },
          content: {
            en: 'When a web page has enough content to display a vertical browser scrollbar (typically 15–17px wide on desktop OS), the viewport width unit `100vw` includes that scrollbar width in its calculation, whereas `100%` width measures only the viewport\'s client area excluding the scrollbar. Setting a container to `width: 100vw` invariably results in a horizontal scrollbar leak equal to the exact width of the vertical scrollbar.',
            vi: 'Khi trang web có đủ nội dung để xuất hiện thanh cuộn dọc (thường rộng 15–17px trên desktop OS), đơn vị `100vw` tính luôn cả độ rộng thanh cuộn đó vào kích thước của nó, trong khi `width: 100%` chỉ tính phần diện tích khả dụng không gồm thanh cuộn. Việc đặt phần tử có `width: 100vw` luôn dẫn đến hiện tượng tràn lề ngang đúng bằng độ dày của thanh cuộn dọc.',
          },
          errorDetails: {
            errorSignature: {
              en: 'Horizontal Overflow Leak / 100vw Exceeds Document Client Width',
              vi: 'Rò Rỉ Tràn Ngang / 100vw Vượt Quá Bề Rộng Khả Dụng Của Tài Liệu',
            },
            symptoms: {
              en: [
                'An unwanted horizontal scrollbar appears on desktop browsers when vertical scrolling is present',
                'Page body shifts slightly horizontally during user interactions',
                'Mobile browsers display awkward horizontal panning room on touch swipe',
              ],
              vi: [
                'Thanh cuộn ngang không mong muốn xuất hiện trên desktop khi trang có thanh cuộn dọc',
                'Toàn bộ trang bị dịch chuyển nhẹ theo chiều ngang khi người dùng cuộn',
                'Trình duyệt mobile xuất hiện khoảng trống trượt ngang khi vuốt chạm',
              ],
            },
            minimalReproduction: {
              language: 'css',
              filename: 'broken_viewport_width.css',
              code: `/* BROKEN: 100vw counts vertical scrollbar width */
.full-bleed-banner {
  width: 100vw;
  background-color: #1e293b;
  padding: 2rem;
  /* Results in horizontal overflow on desktop with vertical scrollbar! */
}`,
            },
            whyItHappens: {
              en: 'The CSS viewport percentage unit 100vw is calculated relative to the initial containing block which includes classic desktop overlay/gutter scrollbars.',
              vi: 'Đơn vị phần trăm khung nhìn 100vw trong CSS được tính dựa trên khối chứa ban đầu bao gồm cả rãnh thanh cuộn của trình duyệt desktop.',
            },
            diagnosisSteps: {
              en: [
                'In DevTools Console, run: document.querySelectorAll("*").forEach(el => { if (el.offsetWidth > document.documentElement.offsetWidth) console.log(el); })',
                'Locate elements using 100vw or fixed widths without max-width: 100%',
                'Check if html and body elements have overflow-x: hidden masks disguising the layout bug',
              ],
              vi: [
                'Trong DevTools Console, chạy: document.querySelectorAll("*").forEach(el => { if (el.offsetWidth > document.documentElement.offsetWidth) console.log(el); })',
                'Tìm các phần tử đang dùng 100vw hoặc width cố định thiếu max-width: 100%',
                'Kiểm tra xem có dùng overflow-x: hidden trên html/body để che giấu lỗi hay không',
              ],
            },
            correctFix: {
              language: 'css',
              filename: 'fixed_viewport_width.css',
              explanation: {
                en: 'Use width: 100% or modern max(100%, 100vw) / margin-breakout techniques with box-sizing: border-box.',
                vi: 'Sử dụng width: 100% hoặc kỹ thuật căn lề full-bleed kết hợp box-sizing: border-box toàn cục.',
              },
              code: `/* CORRECT: Universal border-box reset and width: 100% */
*, *::before, *::after {
  box-sizing: border-box;
}

.full-bleed-banner {
  width: 100%;
  max-width: 100%;
  background-color: #1e293b;
  padding: 2rem;
}`,
            },
            fixExplanation: {
              en: 'Using `width: 100%` constrains the element precisely to the available document client width, completely eliminating horizontal overflow.',
              vi: 'Sử dụng `width: 100%` giới hạn kích thước phần tử chuẩn xác trong không gian hiển thị của tài liệu, loại bỏ hoàn toàn lỗi tràn ngang.',
            },
            preventionRules: {
              en: [
                'Apply *, *::before, *::after { box-sizing: border-box; } at the top of every CSS project',
                'Never use 100vw for standard full-width elements; reserve vw units strictly for fluid typography calculations',
              ],
              vi: [
                'Luôn đặt reset *, *::before, *::after { box-sizing: border-box; } ở đầu mọi dự án CSS',
                'Không dùng 100vw cho phần tử dàn trang 100% bề ngang; chỉ dùng đơn vị vw cho tính toán cỡ chữ co giãn',
              ],
            },
          },
        },
      ],
    },
  ],
};
