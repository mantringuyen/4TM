import { Book } from '../../types';

export const CSS_PRACTICAL_GUIDE_BOOK: Book = {
  id: 'css-practical-guide',
  slug: 'css-practical-guide',
  title: 'Responsive Layouts with Flexbox & Grid',
  subtitle: {
    en: 'Step-by-Step Practical Guide to Building Mobile-First Responsive UIs',
    vi: 'Hướng Dẫn Thực Hành Từng Bước Thiết Kế Giao Diện Đáp Ứng Mobile-First',
  },
  bookType: 'Practical Guides',
  categoryId: 'css',
  subjectId: 'web',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-15',
  accentColor: 'from-blue-600 to-cyan-800',
  tags: ['Responsive', 'Grid', 'Flexbox', 'Mobile-First', 'Guide'],
  description: {
    en: 'A step-by-step practical guide to building fully fluid, responsive layouts using Mobile-First CSS Media Queries, CSS Grid auto-fit, and minmax().',
    vi: 'Hướng dẫn thực hành từng bước thiết kế bố cục đáp ứng mượt mà với tư duy Mobile-First, CSS Grid auto-fit và hàm minmax().',
  },
  prerequisites: {
    en: [
      'Basic CSS selectors, box model properties, and document layout concepts',
    ],
    vi: [
      'Kỹ năng sử dụng CSS selector, thuộc tính box model và kiến thức bố cục trang web cơ bản',
    ],
  },
  outcomes: {
    en: [
      'Implement structured mobile-first responsive media query architectures using progressive min-width breakpoints',
      'Build zero-media-query dynamic card grids leveraging repeat(auto-fit, minmax(280px, 1fr)) and CSS Grid gap',
      'Diagnose and eliminate responsive layout overflows across varying device viewports',
    ],
    vi: [
      'Hiện thực kiến trúc media query đáp ứng chuẩn mobile-first sử dụng các điểm ngắt min-width tăng dần',
      'Xây dựng lưới thẻ card co giãn tự động không cần media query với repeat(auto-fit, minmax(280px, 1fr))',
      'Chẩn đoán và khắc phục triệt để hiện tượng vỡ khung bố cục trên các kích thước màn hình thiết bị',
    ],
  },
  chapters: [
    {
      id: 'cpg-ch-1',
      number: 1,
      slug: 'mobile-first-media-queries',
      title: {
        en: 'Mobile-First Media Query Architecture',
        vi: 'Kiến Trúc Media Query Theo Phương Pháp Mobile-First',
      },
      summary: {
        en: 'Using min-width breakpoints to scale layouts progressively from mobile to desktop without destructive overrides.',
        vi: 'Sử dụng điểm ngắt min-width để mở rộng bố cục từ mobile lên desktop một cách lũy tiến không bị ghi đè phức tạp.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'cpg-1-1',
          title: {
            en: 'Why min-width overrides max-width',
            vi: 'Tại Sao min-width Vượt Trội Hơn max-width',
          },
          keyIdea: {
            en: 'Mobile-first styling establishes base styles for narrow viewports first, using progressive min-width queries to introduce columns and complex layout layers as screen width increases.',
            vi: 'Thiết kế Mobile-First định nghĩa style cơ sở cho màn hình hẹp trước tiên, sau đó dùng các media query min-width tăng dần để bổ sung cột và bố cục phức tạp khi màn hình mở rộng.',
          },
          content: {
            en: 'A mobile-first workflow starts with default styling targeted at small screens (single-column flows, full-width touch targets, streamlined spacing). Instead of writing desktop rules and fighting them with `max-width` overrides, developers apply `min-width` queries progressively. This eliminates CSS specificity inflation, minimizes regression bugs, and ensures optimal loading performance on mobile devices.',
            vi: 'Quy trình Mobile-First bắt đầu với định dạng mặc định dành cho màn hình nhỏ (luồng hiển thị 1 cột, nút bấm tràn viền dễ chạm, khoảng cách tinh gọn). Thay vì viết giao diện desktop cồng kềnh rồi chắp vá bằng các truy vấn `max-width`, lập trình viên áp dụng các điểm ngắt `min-width` tăng dần. Phương pháp này triệt tiêu tình trạng xung đột độ ưu tiên CSS, hạn chế tối đa lỗi hồi quy và tối ưu tốc độ tải trên thiết bị di động.',
          },
          guideDetails: {
            goal: {
              en: 'Structure an enduring, scalable multi-tier responsive layout with standard mobile-first breakpoint tokens.',
              vi: 'Thiết lập bố cục đáp ứng đa tầng có khả năng mở rộng với các token điểm ngắt mobile-first tiêu chuẩn.',
            },
            prerequisites: {
              en: [
                'HTML document containing viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
                'Understanding of CSS class selectors and display block/flex/grid',
              ],
              vi: [
                'Thẻ meta viewport đã khai báo trong HTML: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
                'Hiểu biết về CSS class selector và các kiểu display block/flex/grid',
              ],
            },
            preparation: {
              en: 'Define standard breakpoint tokens (Tablet: 768px, Desktop: 1024px, Wide: 1280px) and establish universal box-sizing: border-box.',
              vi: 'Xác định các token điểm ngắt chuẩn (Tablet: 768px, Desktop: 1024px, Wide: 1280px) và thiết lập thuộc tính box-sizing: border-box toàn cục.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Set Default Mobile Layout (No Media Queries)',
                  vi: 'Thiết Lập Bố Cục Mobile Mặc Định (Không Cần Media Query)',
                },
                instruction: {
                  en: 'Write natural, single-column block layout rules with 100% width and fluid padding as the foundational stylesheet base.',
                  vi: 'Viết các quy tắc bố cục dạng khối 1 cột tự nhiên với chiều rộng 100% và padding co giãn làm nền tảng stylesheet cơ sở.',
                },
                codeBlock: {
                  language: 'css',
                  filename: 'base_mobile.css',
                  code: `/* Base Mobile (0px - 767px) */
.page-container {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.content-sidebar-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}`,
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Layer Tablet Enhancements (min-width: 768px)',
                  vi: 'Bổ Sung Bố Cục Tablet (min-width: 768px)',
                },
                instruction: {
                  en: 'Introduce two-column layouts and increased padding once the viewport reaches tablet resolution.',
                  vi: 'Mở rộng thành bố cục hai cột và gia tăng khoảng cách đệm khi khung nhìn đạt độ phân giải tablet.',
                },
                codeBlock: {
                  language: 'css',
                  filename: 'tablet_enhancement.css',
                  code: `/* Tablet Breakpoint (768px and up) */
@media (min-width: 768px) {
  .page-container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
}`,
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Scale to Desktop Multi-Column (min-width: 1024px)',
                  vi: 'Nâng Cấp Giao Diện Desktop Đa Cột (min-width: 1024px)',
                },
                instruction: {
                  en: 'Switch sidebar to row orientation and constrain maximum page width with auto margins.',
                  vi: 'Chuyển thanh bên sidebar sang bố cục ngang và giới hạn chiều rộng tối đa với căn lề tự động.',
                },
                codeBlock: {
                  language: 'css',
                  filename: 'desktop_layout.css',
                  code: `/* Desktop Breakpoint (1024px and up) */
@media (min-width: 1024px) {
  .page-container {
    max-width: 1200px;
    padding: 3rem 2rem;
  }

  .content-sidebar-layout {
    flex-direction: row;
  }

  .main-content {
    flex: 1 1 70%;
  }

  .sidebar {
    flex: 0 0 30%;
  }
}`,
                },
              },
            ],
            verification: {
              en: 'Resize DevTools viewport from 320px to 1440px to confirm that styles smoothly layer additively without jumping or rule cancellation.',
              vi: 'Co giãn khung nhìn DevTools từ 320px lên 1440px để xác nhận các quy tắc CSS được xếp chồng tăng dần mượt mà không bị giật hay ghi đè lộn xộn.',
            },
            checklist: {
              en: [
                'All media queries utilize min-width rather than max-width',
                'Zero layout CSS is duplicated between mobile base and media query blocks',
                'Container boundaries enforce explicit max-width and margin: 0 auto on wide displays',
              ],
              vi: [
                'Tất cả media query đều sử dụng min-width thay vì max-width',
                'Không có mã CSS bố cục nào bị lặp lại giữa mobile cơ sở và các khối media query',
                'Khung chứa áp dụng giới hạn max-width và margin: 0 auto rõ ràng trên màn hình lớn',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'cpg-ch-2',
      number: 2,
      slug: 'css-grid-auto-fit-minmax',
      title: {
        en: 'Fluid Grids with auto-fit & minmax()',
        vi: 'Lưới Đáp Ứng Tự Động Với auto-fit & minmax()',
      },
      summary: {
        en: 'Creating zero-media-query card grids with repeat(auto-fit, minmax(280px, 1fr)).',
        vi: 'Tạo lưới card đáp ứng tự động không cần media query bằng repeat(auto-fit, minmax(280px, 1fr)).',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'cpg-2-1',
          title: {
            en: 'The Magic Grid Formula',
            vi: 'Công Thức Tạo Lưới Tự Động Tối Ưu',
          },
          keyIdea: {
            en: 'The combination of CSS Grid repeat(auto-fit, minmax(min_card_width, 1fr)) dynamically computes column counts based on container space without requiring a single media query.',
            vi: 'Sự kết hợp giữa CSS Grid repeat(auto-fit, minmax(min_card_width, 1fr)) tự động tính toán số cột dựa trên không gian khung chứa mà không cần dùng bất kỳ media query nào.',
          },
          content: {
            en: 'Traditional responsive grids required cumbersome media queries for 1, 2, 3, and 4 columns. CSS Grid revolutionizes responsive design with the `repeat(auto-fit, minmax(280px, 1fr))` pattern: whenever the parent container has room for another 280px card plus gap, a new column is automatically created. When space is constrained, columns wrap and stretch to fill remaining room evenly with fractional unit `1fr`.',
            vi: 'Hệ thống lưới responsive truyền thống đòi hỏi viết hàng loạt media query cồng kềnh cho 1, 2, 3 và 4 cột. CSS Grid tạo nên bước đột phá với công thức `repeat(auto-fit, minmax(280px, 1fr))`: bất cứ khi nào khung chứa cha có đủ chỗ cho một thẻ 280px cùng khoảng cách gap, một cột mới sẽ tự động sinh ra. Khi không gian thu hẹp, các cột sẽ tự rớt dòng và giãn đều chiếm trọn bề ngang nhờ đơn vị phân số `1fr`.',
          },
          guideDetails: {
            goal: {
              en: 'Construct a self-responsive catalog card grid that adapts dynamically to any container width without breakpoint media queries.',
              vi: 'Xây dựng lưới thẻ danh mục tự co giãn đáp ứng linh hoạt trong mọi khung chứa mà không cần viết media query theo breakpoint.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Declare CSS Grid Container',
                  vi: 'Khai Báo Container CSS Grid',
                },
                instruction: {
                  en: 'Set display to grid and apply gap property to handle multi-directional spacing cleanly.',
                  vi: 'Gán display: grid và áp dụng thuộc tính gap để quản lý khoảng cách đa chiều gọn gàng.',
                },
                codeBlock: {
                  language: 'css',
                  filename: 'grid_container.css',
                  code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
}`,
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Style Uniform Responsive Cards',
                  vi: 'Định Dạng Thẻ Card Đồng Đều',
                },
                instruction: {
                  en: 'Apply flex column layout inside cards to ensure uniform heights and push action buttons to the bottom.',
                  vi: 'Áp dụng bố cục flexbox dọc bên trong thẻ card để đảm bảo chiều cao đồng nhất và đẩy nút bấm xuống đáy thẻ.',
                },
                codeBlock: {
                  language: 'css',
                  filename: 'card_item.css',
                  code: `.card-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  background-color: var(--surface-bg, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 0.5rem;
}`,
                },
              },
            ],
            verification: {
              en: 'Place the grid inside containers of varying widths (e.g., in a main section vs in a narrow sidebar) to verify that cards wrap and scale perfectly without container query adjustments.',
              vi: 'Đặt lưới trong các khung chứa có độ rộng khác nhau (ví dụ: khu vực chính và thanh sidebar hẹp) để kiểm tra thẻ tự rớt dòng và giãn đều chuẩn xác.',
            },
            checklist: {
              en: [
                'Grid uses auto-fit to collapse empty column tracks and expand active cards',
                'Minimum card width (280px) is tested against narrow 320px mobile screens without overflow',
                'Gap property handles gutters without negative margin compensations',
              ],
              vi: [
                'Lưới sử dụng auto-fit để thu gọn các cột rỗng và kéo giãn các thẻ đang hoạt động',
                'Chiều rộng tối thiểu (280px) kiểm thử an toàn trên màn hình mobile hẹp 320px không bị tràn viền',
                'Thuộc tính gap xử lý khoảng cách giữa các phần tử mà không cần thủ thuật margin âm',
              ],
            },
          },
        },
      ],
    },
  ],
};
