import { Book } from '../../types';

export const HTML_PRACTICAL_GUIDE_BOOK: Book = {
  id: 'html-practical-guide',
  slug: 'html-practical-guide',
  title: 'Building Accessible Semantic Forms',
  subtitle: {
    en: 'Step-by-Step Practical Guide to Designing Accessible, WCAG-Compliant HTML Forms',
    vi: 'Hướng Dẫn Thực Hành Từng Bước Xây Dựng Biểu Mẫu HTML Tiếp Cận Chuẩn WCAG',
  },
  bookType: 'Practical Guides',
  categoryId: 'html',
  subjectId: 'web',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '30 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-15',
  accentColor: 'from-orange-600 to-amber-800',
  tags: ['Forms', 'Accessibility', 'WCAG', 'Guide', 'Semantic HTML'],
  description: {
    en: 'A step-by-step practical guide to crafting enterprise-grade, keyboard-navigable HTML forms compliant with WCAG 2.1 AA standards using native semantic elements, fieldset grouping, and constraint validation.',
    vi: 'Hướng dẫn thực hành từng bước xây dựng biểu mẫu HTML doanh nghiệp hỗ trợ điều hướng bàn phím, tuân thủ tiêu chuẩn WCAG 2.1 AA bằng các thẻ ngữ nghĩa native, nhóm fieldset và kiểm tra dữ liệu ràng buộc.',
  },
  prerequisites: {
    en: [
      'Basic understanding of HTML tags, input types, and attributes',
      'Familiarity with web browser developer tools and keyboard Tab navigation',
    ],
    vi: [
      'Hiểu biết cơ bản về thẻ HTML, các loại input và thuộc tính',
      'Làm quen với công cụ DevTools của trình duyệt và thao tác phím Tab',
    ],
  },
  outcomes: {
    en: [
      'Construct accessible forms with explicit <label for="..."> associations and <fieldset>/<legend> groupings',
      'Integrate native HTML5 constraint validation attributes (required, pattern, minlength) with accessible error feedback using aria-describedby',
      'Optimize media assets with art-directed <picture> elements, modern AVIF/WebP formats, and zero-shift layout attributes',
    ],
    vi: [
      'Xây dựng biểu mẫu tiếp cận với liên kết nhãn <label for="..."> tường minh và nhóm <fieldset>/<legend>',
      'Tích hợp thuộc tính xác thực ràng buộc HTML5 native (required, pattern, minlength) với thông báo lỗi qua aria-describedby',
      'Tối ưu tài nguyên hình ảnh với thẻ <picture> đa định dạng AVIF/WebP và thuộc tính chống giật trang CLS',
    ],
  },
  chapters: [
    {
      id: 'hpg-ch-1',
      number: 1,
      slug: 'explicit-labels-and-groups',
      title: {
        en: 'Accessible Form Construction & Focus Management',
        vi: 'Xây Dựng Form Tiếp Cận & Quản Lý Focus Bàn Phím',
      },
      summary: {
        en: 'Step-by-step assembly of an enterprise multi-step form: explicit label binding, fieldsets, legends, and keyboard navigation.',
        vi: 'Quy trình từng bước xây dựng form doanh nghiệp: liên kết nhãn tường minh, fieldset, legend và điều hướng bàn phím.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'hpg-1-1',
          title: {
            en: 'Step-by-Step Construction of Accessible Form Controls',
            vi: 'Quy Trình Từng Bước Thiết Kế Form Tiếp Cận Đầy Đủ',
          },
          keyIdea: {
            en: 'Every input control must have a unique programmatic accessible name via <label for="id"> and all logical groups must be bounded by <fieldset> and <legend>.',
            vi: 'Mọi ô nhập liệu phải có tên tiếp cận qua <label for="id"> và các nhóm lựa chọn logic phải được bao bọc bởi <fieldset> và <legend>.',
          },
          content: {
            en: 'In this practical guide, we construct a fully accessible corporate subscription form. We establish explicit `<label for>` associations, group payment radio choices with `<fieldset>` and `<legend>`, and link live validation error messages directly to input elements using `aria-describedby` and `aria-invalid`.',
            vi: 'Trong hướng dẫn thực hành này, chúng ta sẽ xây dựng một biểu mẫu đăng ký dịch vụ chuẩn tiếp cận. Chúng ta sẽ thiết lập liên kết `<label for>` tường minh, nhóm các lựa chọn thanh toán bằng `<fieldset>` và `<legend>`, đồng thời kết nối thông báo lỗi trực tiếp vào ô input bằng `aria-describedby` và `aria-invalid`.',
          },
          guideDetails: {
            goal: {
              en: 'Build a production-ready, WCAG 2.1 AA compliant registration form with accessible validation.',
              vi: 'Xây dựng form đăng ký chuẩn WCAG 2.1 AA sẵn sàng cho production với cơ chế kiểm tra lỗi tiếp cận.',
            },
            prerequisites: {
              en: [
                'HTML5 document template ready in your editor',
                'Basic CSS styling for visible focus indicators (:focus-visible)',
              ],
              vi: [
                'Khung tài liệu HTML5 sẵn sàng trong trình soạn thảo',
                'CSS cơ bản cho hiệu ứng focus rõ ràng (:focus-visible)',
              ],
            },
            preparation: {
              en: 'Ensure the form has a unique action URL, POST method, and appropriate autocomplete attributes for browser autofill.',
              vi: 'Đảm bảo form có action URL, method POST và các thuộc tính autocomplete phù hợp để hỗ trợ tự động điền.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Define the Form Shell with Method and Action',
                  vi: 'Khai Báo Khung Form Với Method Và Action',
                },
                instruction: {
                  en: 'Create the top-level <form> tag with method="POST" and novalidate to enable custom JavaScript error handling while preserving native constraint properties.',
                  vi: 'Tạo thẻ <form> cấp cao nhất với method="POST" và novalidate để hỗ trợ xử lý lỗi tùy biến qua JS trong khi vẫn giữ các thuộc tính ràng buộc native.',
                },
                codeBlock: {
                  language: 'html',
                  filename: 'step1_form.html',
                  code: `<form action="/api/v1/subscribe" method="POST" novalidate id="checkout-form">`,
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Create Explicit Label-to-Input Associations',
                  vi: 'Tạo Liên Kết Nhãn Label Tường Minh Với Input',
                },
                instruction: {
                  en: 'Wrap each input inside a container and attach an explicit <label> whose for attribute matches the input id.',
                  vi: 'Đóng gói mỗi ô input trong một khối và gắn thẻ <label> có thuộc tính for khớp chính xác với id của input.',
                },
                codeBlock: {
                  language: 'html',
                  filename: 'step2_input.html',
                  code: `<div class="field-wrapper">
  <label for="corporate-email">
    Corporate Email <span class="required" aria-hidden="true">*</span>
  </label>
  <input 
    type="email" 
    id="corporate-email" 
    name="email" 
    required 
    autocomplete="email"
    aria-describedby="email-hint email-error"
    aria-invalid="false"
  >
  <p id="email-hint" class="hint">Use your company domain (e.g. name@company.com)</p>
  <p id="email-error" class="error-msg" role="alert" hidden>Please enter a valid email address.</p>
</div>`,
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Group Related Options with Fieldset & Legend',
                  vi: 'Nhóm Các Lựa Chọn Liên Quan Bằng Fieldset & Legend',
                },
                instruction: {
                  en: 'Encapsulate radio button sets inside <fieldset> with a descriptive <legend> to ensure screen readers announce the group context for each radio button.',
                  vi: 'Đóng gói bộ radio button bên trong <fieldset> với tiêu đề <legend> để trình đọc màn hình đọc rõ ngữ cảnh nhóm khi người dùng chọn từng nút.',
                },
                codeBlock: {
                  language: 'html',
                  filename: 'step3_fieldset.html',
                  code: `<fieldset>
  <legend>Select Tier Plan</legend>
  
  <div class="radio-option">
    <input type="radio" id="plan-starter" name="plan" value="starter" checked>
    <label for="plan-starter">Starter Tier ($49/month)</label>
  </div>

  <div class="radio-option">
    <input type="radio" id="plan-enterprise" name="plan" value="enterprise">
    <label for="plan-enterprise">Enterprise Tier ($199/month)</label>
  </div>
</fieldset>`,
                },
              },
              {
                stepNumber: 4,
                title: {
                  en: 'Add Accessible Submit Button with Clear State',
                  vi: 'Thêm Nút Submit Chuẩn Tiếp Cận Có Trạng Thái Rõ Ràng',
                },
                instruction: {
                  en: 'Use a native <button type="submit"> rather than a generic div, providing visible focus rings and accessible loading states.',
                  vi: 'Sử dụng thẻ native <button type="submit"> thay vì div, đảm bảo viền focus rõ ràng và trạng thái loading tiếp cận.',
                },
                codeBlock: {
                  language: 'html',
                  filename: 'step4_button.html',
                  code: `<button type="submit" class="btn-primary" id="submit-btn">
  Confirm & Subscribe
</button>`,
                },
              },
            ],
            verification: {
              en: 'Press Tab through the entire form without using a mouse. Confirm each input receives visible focus, clicking a label focuses its input, and screen readers read the legend before each radio option.',
              vi: 'Dùng phím Tab duyệt qua toàn bộ form mà không dùng chuột. Xác nhận mỗi ô input đều nhận focus rõ ràng, nhấp vào label sẽ focus vào ô nhập, và trình đọc màn hình đọc tiêu đề legend trước mỗi lựa chọn radio.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Clicking the label does not focus the input cursor.',
                  vi: 'Nhấp chuột vào chữ label nhưng con trỏ không nhảy vào ô input.',
                },
                cause: {
                  en: 'Typo in the label "for" attribute or input "id" attribute causing a mismatch.',
                  vi: 'Lỗi chính tả ở thuộc tính "for" của label hoặc thuộc tính "id" của input làm chúng không khớp nhau.',
                },
                fix: {
                  en: 'Verify that label for="..." and input id="..." share the exact same case-sensitive string.',
                  vi: 'Kiểm tra lại xem label for="..." và input id="..." có chung chuỗi ký tự chính xác tuyệt đối hay không.',
                },
              },
            ],
            checklist: {
              en: [
                'Every form control has an explicit <label for="id"> pairing',
                'Radio button and checkbox groups use <fieldset> and <legend>',
                'Native validation attributes (required, type="email", pattern) are present',
                'Focus visible outline is clearly styled in CSS',
              ],
              vi: [
                'Mọi điều khiển form đều có cặp thẻ <label for="id"> tường minh',
                'Các nhóm radio button và checkbox đều sử dụng <fieldset> và <legend>',
                'Các thuộc tính xác thực native (required, type="email", pattern) đã được khai báo',
                'Viền focus visible được định dạng nổi bật và rõ ràng trong CSS',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'hpg-ch-2',
      number: 2,
      slug: 'keyboard-navigation-and-focus',
      title: {
        en: 'Responsive Images & Performance Optimization',
        vi: 'Hình Ảnh Đáp Ứng & Tối Ưu Hiệu Suất Tải Trang',
      },
      summary: {
        en: 'Step-by-step implementation of art-directed responsive images with <picture>, modern WebP/AVIF formats, and CLS layout protection.',
        vi: 'Quy trình từng bước triển khai hình ảnh đáp ứng với thẻ <picture>, định dạng WebP/AVIF và chống giật trang CLS.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'hpg-2-1',
          title: {
            en: 'Step-by-Step Implementation of Art-Directed Responsive Media',
            vi: 'Triển Khai Chỉ Đạo Nghệ Thuật Hình Ảnh Với Thẻ Picture',
          },
          keyIdea: {
            en: 'Use <picture> with <source media="..."> for art direction and format negotiation, while defining explicit width/height on the fallback <img> to eliminate CLS.',
            vi: 'Dùng thẻ <picture> kết hợp <source media="..."> để cắt cúp ảnh theo màn hình và đàm phán định dạng, đồng thời khai báo width/height trên thẻ <img> để chống giật trang.',
          },
          content: {
            en: 'In this guide, we configure a high-performance responsive hero banner. We deliver modern AVIF and WebP image formats with fallback to JPEG, specify art-directed mobile crops, and apply native lazy loading and asynchronous decoding.',
            vi: 'Trong hướng dẫn này, chúng ta sẽ thiết lập một banner hero đáp ứng hiệu năng cao. Chúng ta sẽ phân phối định dạng AVIF và WebP với fallback về JPEG, chỉ định ảnh cắt riêng cho mobile, đồng thời áp dụng lazy loading native và giải mã bất đồng bộ.',
          },
          guideDetails: {
            goal: {
              en: 'Deliver resolution-tailored, modern image assets with zero layout shift (CLS: 0).',
              vi: 'Phân phối hình ảnh độ phân giải tối ưu ở định dạng hiện đại với độ giật trang bằng 0 (CLS: 0).',
            },
            prerequisites: {
              en: [
                'Source images exported in AVIF, WebP, and JPG formats at 1x and 2x resolutions',
              ],
              vi: [
                'Hình ảnh gốc đã được xuất ở định dạng AVIF, WebP và JPG với độ phân giải 1x và 2x',
              ],
            },
            preparation: {
              en: 'Calculate the native aspect ratio (width and height) to place on the fallback <img> tag.',
              vi: 'Tính toán tỷ lệ khung hình gốc (width và height) để đặt vào thẻ <img> dự phòng.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Construct the <picture> Container',
                  vi: 'Khởi Tạo Khối Bọc Thẻ <picture>',
                },
                instruction: {
                  en: 'Wrap the responsive asset in a semantic <picture> element.',
                  vi: 'Bọc tài nguyên hình ảnh đáp ứng trong phần tử ngữ nghĩa <picture>.',
                },
                codeBlock: {
                  language: 'html',
                  filename: 'step1_picture.html',
                  code: `<picture class="hero-banner">`,
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Add Art-Directed AVIF and WebP Sources for Desktop Viewports',
                  vi: 'Thêm Nguồn AVIF & WebP Chỉ Đạo Nghệ Thuật Cho Desktop',
                },
                instruction: {
                  en: 'Provide modern format sources filtered by media="(min-width: 1024px)".',
                  vi: 'Khai báo các nguồn định dạng hiện đại có điều kiện media="(min-width: 1024px)".',
                },
                codeBlock: {
                  language: 'html',
                  filename: 'step2_sources.html',
                  code: `  <source 
    type="image/avif" 
    media="(min-width: 1024px)" 
    srcset="/img/hero-desk.avif 1x, /img/hero-desk@2x.avif 2x"
  >
  <source 
    type="image/webp" 
    media="(min-width: 1024px)" 
    srcset="/img/hero-desk.webp 1x, /img/hero-desk@2x.webp 2x"
  >`,
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Add Mobile Format Sources and the Fallback <img> Tag',
                  vi: 'Thêm Nguồn Ảnh Cho Mobile Và Thẻ <img> Dự Phòng',
                },
                instruction: {
                  en: 'Add mobile sources followed by the mandatory <img> tag with explicit width, height, alt, loading="lazy", and decoding="async".',
                  vi: 'Thêm nguồn ảnh mobile kèm thẻ <img> bắt buộc có đầy đủ width, height, alt, loading="lazy" và decoding="async".',
                },
                codeBlock: {
                  language: 'html',
                  filename: 'step3_fallback.html',
                  code: `  <source 
    type="image/avif" 
    srcset="/img/hero-mob.avif 1x, /img/hero-mob@2x.avif 2x"
  >
  <source 
    type="image/webp" 
    srcset="/img/hero-mob.webp 1x, /img/hero-mob@2x.webp 2x"
  >
  <img 
    src="/img/hero-fallback.jpg" 
    alt="Executive financial operations control center" 
    width="1600" 
    height="900" 
    loading="lazy" 
    decoding="async"
  >
</picture>`,
                },
              },
            ],
            verification: {
              en: 'Inspect Network panel in Chrome DevTools. Check that AVIF is loaded in supported browsers, bandwidth is reduced, and no layout shifts occur as the image renders.',
              vi: 'Kiểm tra tab Network trong Chrome DevTools. Xác nhận định dạng AVIF được tải trên trình duyệt hỗ trợ, tiết kiệm băng thông và trang không bị giật khi ảnh hiện lên.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'The page content jumps downwards when the image finishes loading.',
                  vi: 'Nội dung trang bị giật nhảy xuống dưới khi hình ảnh tải xong.',
                },
                cause: {
                  en: 'Missing width and height attributes on the fallback <img> tag.',
                  vi: 'Thiếu thuộc tính width và height trên thẻ <img> dự phòng.',
                },
                fix: {
                  en: 'Add explicit numeric width="1600" and height="900" attributes so the browser pre-reserves the aspect ratio box.',
                  vi: 'Khai báo rõ ràng thuộc tính số width="1600" và height="900" để trình duyệt tự giữ chỗ khung ảnh trước.',
                },
              },
            ],
            checklist: {
              en: [
                '<picture> has AVIF and WebP sources before fallback JPG',
                'Fallback <img> has descriptive alt text (or alt="" if decorative)',
                'Explicit width and height are declared to prevent CLS',
                'loading="lazy" and decoding="async" are enabled for offscreen assets',
              ],
              vi: [
                'Thẻ <picture> có nguồn AVIF và WebP đứng trước JPG dự phòng',
                'Thẻ <img> có nội dung alt mô tả rõ ràng (hoặc alt="" nếu là ảnh trang trí)',
                'Đã khai báo width và height rõ ràng để ngăn chặn giật trang CLS',
                'Đã kích hoạt loading="lazy" và decoding="async" cho các ảnh nằm ngoài màn hình đầu',
              ],
            },
          },
        },
      ],
    },
  ],
};
