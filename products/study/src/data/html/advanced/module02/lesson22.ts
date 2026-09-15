import { Lesson } from '../../../../types';

export const lesson22: Lesson = {
  id: 'html_lesson_22',
  moduleId: 'html_mod_6',
  levelId: 'advanced',
  courseId: 'html',
  order: 22,
  topicId: 'html_web_components_specs',
  title: {
    en: 'Web Components: Custom Elements, Shadow DOM, Templates & Slots',
    vi: 'Web Components: Custom Elements, Shadow DOM, Thẻ Template & Slots'
  },
  summary: {
    en: 'Master the suite of standards that power framework-agnostic native UI widgets: Custom Elements API (customElements.define, Autonomous vs Customized Built-in elements), the <template> tag for inert markup stamping, Shadow DOM (attachShadow({ mode: "open" }), encapsulation, scoped CSS, :host, ::slotted()), and content projection with named and default <slot> elements.',
    vi: 'Làm chủ bộ tiêu chuẩn xây dựng widget UI gốc độc lập framework: API Custom Elements (customElements.define, Autonomous vs Customized Built-in), thẻ <template> chứa markup trơ, Shadow DOM (attachShadow, đóng gói bao bọc, CSS phạm vi cô lập, :host, ::slotted) và phân phối nội dung với phần tử <slot> có tên và mặc định.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Web Components provide a web-standard component model natively supported by all major browsers. They enable you to author completely encapsulated, reusable, framework-independent HTML widgets with isolated styling and scoped behavior.',
      vi: 'Web Components cung cấp mô hình thành phần theo chuẩn web được hỗ trợ trực tiếp bởi tất cả các trình duyệt lớn. Chúng cho phép bạn xây dựng các widget HTML độc lập framework, tái sử dụng cao, có phạm vi đóng gói style và hành vi hoàn toàn biệt lập.'
    },
    conceptExplanation: {
      en: '1. **The Web Components Triad**:\n   - **Custom Elements**: Extends `HTMLElement` via `customElements.define("my-element", MyClass)`. Element names MUST contain a hyphen (`-`) to prevent collisions with future HTML tags.\n   - **HTML Templates (`<template>`)**: Holds inert HTML fragments not rendered until cloned with `template.content.cloneNode(true)`.\n   - **Shadow DOM**: Creates an isolated DOM subtree attached to the custom element (`this.attachShadow({ mode: "open" })`). Styles inside Shadow DOM never leak out, and global CSS never leaks in.\n\n2. **Content Projection with `<slot>`**:\n   - Named slots: `<slot name="icon"></slot>` pairs with `<span slot="icon">★</span>`.\n   - Default slots: Catch-all for unslotted child content.\n\n3. **Shadow DOM Styling Rules**:\n   - `:host`: Styles the custom element itself.\n   - `:host([disabled])`: Conditional styling when attribute is present.\n   - `::slotted(selector)`: Styles slotted light DOM elements inside the shadow root.',
      vi: '1. **Bộ 3 Trụ Cột Web Components**:\n   - **Custom Elements**: Mở rộng từ `HTMLElement` qua `customElements.define("my-element", MyClass)`. Tên thẻ BẮT BUỘC phải có dấu gạch nối (`-`) để không trùng với thẻ HTML tương lai.\n   - **HTML Templates (`<template>`)**: Chứa đoạn markup trơ không render cho đến khi được nhân bản bằng `template.content.cloneNode(true)`.\n   - **Shadow DOM**: Tạo cây DOM biệt lập gắn vào phần tử (`this.attachShadow({ mode: "open" })`). CSS trong Shadow DOM không bao giờ rò rỉ ra ngoài và CSS toàn cục không ảnh hưởng vào trong.\n\n2. **Phân Phối Nội Dung Với `<slot>`**:\n   - Named slots: `<slot name="icon"></slot>` ghép với `<span slot="icon">★</span>`.\n   - Default slots: Nhận toàn bộ nội dung con còn lại.\n\n3. **Quy Tắc Đặt Style Trong Shadow DOM**:\n   - `:host`: Tạo kiểu cho chính phần tử tùy chỉnh.\n   - `:host([disabled])`: Style có điều kiện khi có thuộc tính.\n   - `::slotted(selector)`: Tạo kiểu cho các phần tử light DOM được chèn vào slot.'
    },
    syntax: `<template id="user-badge-tpl">
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 9999px;
      background: #f1f5f9;
      font-family: system-ui, sans-serif;
    }
    .avatar { margin-right: 8px; }
  </style>
  <span class="avatar"><slot name="avatar">👤</slot></span>
  <span class="name"><slot>Anonymous User</slot></span>
</template>

<script>
  class UserBadge extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const tpl = document.getElementById('user-badge-tpl');
      shadow.appendChild(tpl.content.cloneNode(true));
    }
  }
  customElements.define('user-badge', UserBadge);
</script>

<!-- Usage -->
<user-badge>
  <span slot="avatar">🚀</span>
  Ada Lovelace
</user-badge>`,
    examples: [
      {
        title: {
          en: 'Custom Element Definition with Shadow DOM Encapsulation',
          vi: 'Định Nghĩa Custom Element Với Đóng Gói Shadow DOM'
        },
        code: `class MetricCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        :host { display: block; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
        h3 { margin: 0 0 8px; color: #64748b; font-size: 12px; text-transform: uppercase; }
      </style>
      <h3><slot name="title">Metric</slot></h3>
      <div class="val"><slot>0.00</slot></div>
    \`;
  }
}
customElements.define('metric-card', MetricCard);`,
        language: 'javascript',
        explanation: {
          en: 'Attaches an open shadow root to completely insulate card styling and encapsulate named slots.',
          vi: 'Gắn một shadow root mở để cô lập hoàn toàn style của thẻ và đóng gói các slot có tên.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Defining a custom element name without a hyphen (e.g. customElements.define("badge", ...))',
          vi: 'Định nghĩa tên custom element không có dấu gạch nối (vd: customElements.define("badge", ...))'
        },
        correction: {
          en: 'The HTML specification requires all custom elements to contain at least one hyphen (e.g. "ui-badge" or "user-avatar") to guarantee forward compatibility with future native HTML tags.',
          vi: 'Chuẩn HTML bắt buộc mọi custom element phải chứa ít nhất một dấu gạch nối (vd: "ui-badge" hoặc "user-avatar") để không xung đột với các thẻ HTML tương lai.'
        },
        code: '// Correct: customElements.define("status-badge", StatusBadge);'
      },
      {
        mistake: {
          en: 'Querying shadow DOM elements with document.querySelector()',
          vi: 'Tìm kiếm phần tử trong shadow DOM bằng document.querySelector()'
        },
        correction: {
          en: 'Shadow DOM subtrees are encapsulated from the global document tree. Use this.shadowRoot.querySelector() inside the component class.',
          vi: 'Cây Shadow DOM được đóng gói biệt lập với cây document toàn cục. Hãy dùng this.shadowRoot.querySelector() bên trong lớp thành phần.'
        },
        code: '// Correct: const btn = this.shadowRoot.querySelector("#my-btn");'
      }
    ],
    tips: [
      {
        en: 'Use Shadow DOM when distributing reusable UI components across different frameworks (React, Vue, Svelte, Angular) to guarantee 100% style isolation without CSS namespace conflicts.',
        vi: 'Sử dụng Shadow DOM khi chia sẻ các thành phần UI dùng chung giữa nhiều framework khác nhau để đảm bảo cô lập 100% style mà không sợ đè CSS.'
      }
    ],
    practice: {
      task: {
        en: 'Construct an HTML Template with Named Slot Projection',
        vi: 'Xây Dựng Thẻ Template HTML Kèm Chiếu Slot Có Tên'
      },
      instruction: {
        en: 'Create a <template id="card-template"><div class="card"><header><slot name="header">Default Title</slot></header><main><slot>Default body text</slot></main></div></template>.',
        vi: 'Tạo thẻ <template id="card-template"><div class="card"><header><slot name="header">Default Title</slot></header><main><slot>Default body text</slot></main></div></template>.'
      },
      starterCode: '<!-- Build HTML template with slots -->\n',
      solutionCode: `<template id="card-template">
  <div class="card">
    <header>
      <slot name="header">Default Title</slot>
    </header>
    <main>
      <slot>Default body text</slot>
    </main>
  </div>
</template>`,
      requiredPatterns: [
        '<template id="card-template">',
        '<slot name="header">Default Title</slot>',
        '<slot>Default body text</slot>',
        '</template>'
      ],
      hint: {
        en: 'Create a template containing named slot "header" and default slot.',
        vi: 'Tạo thẻ template chứa slot có tên "header" và slot mặc định.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Define and Register a Native Custom Element Class',
        vi: 'Định Nghĩa Và Đăng Ký Lớp Custom Element Chuẩn Gốc'
      },
      instruction: {
        en: 'Write a script class NotificationBanner extends HTMLElement attaching an open shadowRoot and registering customElements.define("notification-banner", NotificationBanner).',
        vi: 'Viết thẻ script chứa class NotificationBanner extends HTMLElement gắn shadowRoot open và đăng ký customElements.define("notification-banner", NotificationBanner).'
      },
      starterCode: '<!-- Register custom element -->\n',
      solutionCode: `<script>
  class NotificationBanner extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = \`<p class="alert"><slot>Alert notification</slot></p>\`;
    }
  }
  customElements.define('notification-banner', NotificationBanner);
</script>`,
      requiredPatterns: [
        'class NotificationBanner extends HTMLElement',
        'attachShadow({ mode: \'open\' })',
        'customElements.define(\'notification-banner\', NotificationBanner)'
      ],
      hint: {
        en: 'Extend HTMLElement, attach shadow root, and call customElements.define with a hyphenated tag name.',
        vi: 'Kế thừa HTMLElement, gắn shadow root và gọi customElements.define với tên thẻ có dấu gạch nối.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_22_1',
      type: 'complete_code',
      title: {
        en: 'Declare Named Slot Inside Template',
        vi: 'Khai Báo Slot Có Tên Bên Trong Template'
      },
      instruction: {
        en: 'Add a <slot name="badge">New</slot> element inside the template header.',
        vi: 'Thêm phần tử <slot name="badge">New</slot> vào trong phần header của template.'
      },
      starterCode: '<template id="item-tpl">\n  <header>\n    <!-- Insert named slot here -->\n  </header>\n</template>',
      solutionCode: '<template id="item-tpl">\n  <header>\n    <slot name="badge">New</slot>\n  </header>\n</template>',
      hint: {
        en: 'Use <slot name="badge">New</slot>.',
        vi: 'Dùng <slot name="badge">New</slot>.'
      },
      explanation: {
        en: 'Named slots allow light DOM consumers to project specific elements into defined shadow DOM locations.',
        vi: 'Named slot cho phép người dùng chèn các phần tử cụ thể vào đúng vị trí định sẵn trong shadow DOM.'
      }
    },
    {
      id: 'html_ex_22_2',
      type: 'fix_code',
      title: {
        en: 'Fix Invalid Custom Element Name Missing Hyphen',
        vi: 'Sửa Lỗi Tên Custom Element Hợp Lệ Bị Thiếu Dấu Gạch Nối'
      },
      instruction: {
        en: 'Fix the customElements.define registration so the custom tag name contains a valid hyphen ("app-avatar" instead of "avatar").',
        vi: 'Sửa lệnh customElements.define để tên thẻ tùy chỉnh chứa dấu gạch nối hợp lệ ("app-avatar" thay vì "avatar").'
      },
      starterCode: 'customElements.define(\'avatar\', AppAvatar);',
      solutionCode: 'customElements.define(\'app-avatar\', AppAvatar);',
      hint: {
        en: 'Change "avatar" to "app-avatar".',
        vi: 'Đổi "avatar" thành "app-avatar".'
      },
      explanation: {
        en: 'All Custom Element tag names must contain at least one hyphen (ASCII dash) per the HTML specification.',
        vi: 'Tất cả tên thẻ Custom Element bắt buộc phải chứa ít nhất một dấu gạch nối theo quy chuẩn HTML.'
      }
    },
    {
      id: 'html_ex_22_3',
      type: 'write_code',
      title: {
        en: 'Instantiate and Consume Custom Web Component Tag',
        vi: 'Khởi Tạo Và Sử Dụng Thẻ Web Component Tùy Chỉnh'
      },
      instruction: {
        en: 'Write an instance of <status-chip status="online"><span slot="label">System Active</span></status-chip>.',
        vi: 'Viết một phần tử <status-chip status="online"><span slot="label">System Active</span></status-chip>.'
      },
      starterCode: '<!-- Write custom element instance -->\n',
      solutionCode: `<status-chip status="online">
  <span slot="label">System Active</span>
</status-chip>`,
      hint: {
        en: 'Use <status-chip> with slot="label".',
        vi: 'Dùng <status-chip> với slot="label".'
      },
      explanation: {
        en: 'Consuming custom elements matches native HTML element usage, projecting children into slots.',
        vi: 'Sử dụng custom element hoàn toàn tương tự thẻ HTML gốc, chiếu các phần tử con vào slot.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_22',
    title: {
      en: 'Enterprise Design System Custom Web Component Library',
      vi: 'Thư Viện Web Component Chuẩn Hệ Thống Thiết Kế Doanh Nghiệp'
    },
    description: {
      en: 'Architect a production-grade Web Component design system widget featuring inert <template> declaration, encapsulated open Shadow DOM root attachment, scoped CSS with :host selectors, named slot content projection, and declarative custom element registration.',
      vi: 'Xây dựng widget Web Component chuẩn hệ thống thiết kế gồm khai báo <template> trơ, gắn Shadow DOM đóng gói, CSS phạm vi với :host, chiếu nội dung qua slot có tên và đăng ký custom element.'
    },
    requirements: [
      {
        en: '<template id="profile-card-tpl"> with scoped <style> utilizing :host and ::slotted()',
        vi: '<template id="profile-card-tpl"> với <style> phạm vi sử dụng :host và ::slotted()'
      },
      {
        en: 'Named slots for avatar and title with accessible fallback values',
        vi: 'Các slot có tên cho avatar và title kèm giá trị dự phòng trợ năng'
      },
      {
        en: 'JavaScript class extending HTMLElement with attachShadow({ mode: "open" }) and template cloning',
        vi: 'Lớp JavaScript kế thừa HTMLElement với attachShadow({ mode: "open" }) và nhân bản template'
      },
      {
        en: 'customElements.define("profile-card", ProfileCard) registration and valid usage markup',
        vi: 'Đăng ký customElements.define("profile-card", ProfileCard) và đánh dấu sử dụng thẻ hợp lệ'
      }
    ],
    starterCode: '<!-- Build enterprise web component -->\n',
    solutionCode: `<template id="profile-card-tpl">
  <style>
    :host {
      display: block;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      font-family: system-ui, -apple-system, sans-serif;
    }
    :host([highlighted]) {
      border-color: #3b82f6;
      background: #eff6ff;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    ::slotted(img[slot="avatar"]) {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
    .body {
      color: #475569;
      line-height: 1.5;
    }
  </style>

  <div class="card-container">
    <div class="header">
      <slot name="avatar">
        <div style="width:48px; height:48px; background:#cbd5e1; border-radius:50%;"></div>
      </slot>
      <div class="meta">
        <h3><slot name="name">Anonymous Team Member</slot></h3>
        <p><slot name="role">Contributor</slot></p>
      </div>
    </div>
    <div class="body">
      <slot>No additional bio provided.</slot>
    </div>
  </div>
</template>

<script>
  class ProfileCard extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const tpl = document.getElementById('profile-card-tpl');
      if (tpl) {
        shadow.appendChild(tpl.content.cloneNode(true));
      }
    }
  }

  if (!customElements.get('profile-card')) {
    customElements.define('profile-card', ProfileCard);
  }
</script>

<!-- Component Usage -->
<profile-card highlighted>
  <img slot="avatar" src="/assets/avatar.jpg" alt="Grace Hopper">
  <span slot="name">Grace Hopper</span>
  <span slot="role">Chief Computer Scientist</span>
  <p>Pioneer of computer programming standards and compiler design.</p>
</profile-card>`,
    hints: [
      {
        en: 'Ensure custom element tag name contains a hyphen and shadow root is attached with mode "open".',
        vi: 'Đảm bảo tên thẻ custom element có dấu gạch nối và shadow root được gắn với mode "open".'
      }
    ],
    solutionExplanation: {
      en: 'Delivers a completely framework-independent, 100% style-isolated, fully accessible design system widget using web standards.',
      vi: 'Cung cấp widget UI độc lập framework, cô lập 100% style và chuẩn trợ năng bằng các tiêu chuẩn web gốc.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_22_1',
      type: 'single_choice',
      question: {
        en: 'Why does the HTML Web Components specification mandate that all Custom Element tag names MUST contain at least one hyphen (e.g. <user-card> instead of <card>)?',
        vi: 'Tại sao quy chuẩn HTML Web Components bắt buộc mọi tên thẻ Custom Element PHẢI chứa ít nhất một dấu gạch nối (vd: <user-card> thay vì <card>)?'
      },
      options: [
        {
          en: 'To guarantee namespace separation between user-defined tags and all current or future native HTML element tags introduced by the W3C/WHATWG',
          vi: 'Để đảm bảo phân tách không gian tên giữa thẻ do người dùng tự tạo và tất cả các thẻ HTML gốc hiện tại hoặc trong tương lai do W3C/WHATWG ban hành'
        },
        {
          en: 'Because hyphens make CSS selector parsing 2x faster',
          vi: 'Vì dấu gạch nối giúp phân tích bộ chọn CSS nhanh hơn gấp 2 lần'
        },
        {
          en: 'To comply with XML DTD syntax validation',
          vi: 'Để tuân thủ cú pháp XML DTD'
        },
        {
          en: 'Because hyphens automatically convert tags to uppercase',
          vi: 'Vì dấu gạch nối tự động chuyển thẻ thành chữ in hoa'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The hyphen guarantees that custom element names never conflict with future HTML standards.',
        vi: 'Dấu gạch nối đảm bảo tên custom element không bao giờ xung đột với các thẻ chuẩn HTML tương lai.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_22_2',
      type: 'single_choice',
      question: {
        en: 'What is the primary purpose of the HTML `<template>` element?',
        vi: 'Mục đích cốt lõi của thẻ HTML `<template>` là gì?'
      },
      options: [
        {
          en: 'To hold inert HTML fragments that are parsed by the browser but NOT rendered or executed until cloned via JavaScript (e.g. tpl.content.cloneNode(true))',
          vi: 'Để chứa các đoạn HTML trơ được trình duyệt phân tích cú pháp nhưng KHÔNG render hoặc thực thi cho đến khi được nhân bản qua JavaScript'
        },
        {
          en: 'To define MySQL database schemas in HTML',
          vi: 'Để định nghĩa cấu trúc bảng MySQL trong HTML'
        },
        {
          en: 'To automatically translate web pages into multiple languages',
          vi: 'Để tự động dịch trang web sang nhiều ngôn ngữ'
        },
        {
          en: 'To load CSS frameworks asynchronously',
          vi: 'Để nạp các CSS framework bất đồng bộ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Templates provide dormant DOM subtrees ready for programmatic instantiation.',
        vi: 'Template cung cấp cây DOM ở trạng thái ngủ sẵn sàng để nhân bản bằng mã script.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_22_3',
      type: 'single_choice',
      question: {
        en: 'How does Shadow DOM achieve complete CSS encapsulation for web components?',
        vi: 'Shadow DOM đạt được sự đóng gói bao bọc CSS hoàn toàn cho web component như thế nào?'
      },
      options: [
        {
          en: 'Styles declared inside a Shadow Root are strictly scoped to the shadow tree—they never leak out into the main document, and outer page styles (except inherited properties) do not penetrate inward',
          vi: 'Các style khai báo trong Shadow Root chỉ có phạm vi bên trong cây shadow—chúng không bao giờ rò rỉ ra tài liệu chính và style bên ngoài không lọt vào trong'
        },
        {
          en: 'It encrypts all CSS rules using SHA-256',
          vi: 'Nó mã hóa toàn bộ quy tắc CSS bằng SHA-256'
        },
        {
          en: 'It converts all styles to inline style="..." attributes automatically',
          vi: 'Nó tự động chuyển mọi style thành thuộc tính inline style="..."'
        },
        {
          en: 'It requires CSS to be compiled with Webpack',
          vi: 'Nó yêu cầu CSS phải được biên dịch qua Webpack'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Shadow DOM creates boundary barriers preventing CSS selector collision and leakage.',
        vi: 'Shadow DOM tạo ranh giới ngăn ngừa hoàn toàn sự xung đột và rò rỉ bộ chọn CSS.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_22_4',
      type: 'single_choice',
      question: {
        en: 'Which CSS pseudo-class selector is used inside Shadow DOM styles to target the custom element host tag itself?',
        vi: 'Bộ chọn giả (pseudo-class) CSS nào được dùng bên trong Shadow DOM để định kiểu cho chính thẻ host của custom element?'
      },
      options: [
        {
          en: ':host',
          vi: ':host'
        },
        {
          en: ':root',
          vi: ':root'
        },
        {
          en: ':parent',
          vi: ':parent'
        },
        {
          en: '::self',
          vi: '::self'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: ':host matches the shadow host element from within shadow root stylesheets.',
        vi: ':host chọn chính phần tử shadow host từ bên trong bảng kiểu shadow root.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_22_5',
      type: 'single_choice',
      question: {
        en: 'How do you project specific light-DOM markup into a named slot inside a Shadow DOM template?',
        vi: 'Làm thế nào để đưa phần tử con từ light-DOM vào đúng một named slot bên trong template Shadow DOM?'
      },
      options: [
        {
          en: 'Assign slot="slot_name" attribute to the child element (e.g. <span slot="avatar">...</span>)',
          vi: 'Gán thuộc tính slot="slot_name" vào phần tử con (vd: <span slot="avatar">...</span>)'
        },
        {
          en: 'Use id="slot_name" on the child element',
          vi: 'Dùng id="slot_name" trên phần tử con'
        },
        {
          en: 'Pass it via window.location.hash',
          vi: 'Truyền qua window.location.hash'
        },
        {
          en: 'Set data-target="slot_name"',
          vi: 'Đặt data-target="slot_name"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The slot attribute on light DOM nodes directs them to the corresponding <slot name="..."> target.',
        vi: 'Thuộc tính slot trên node light DOM điều hướng chúng tới đúng phần tử <slot name="..."> tương ứng.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_22_6',
      type: 'single_choice',
      question: {
        en: 'What is the difference between attachShadow({ mode: "open" }) and attachShadow({ mode: "closed" })?',
        vi: 'Điểm khác biệt giữa attachShadow({ mode: "open" }) và attachShadow({ mode: "closed" }) là gì?'
      },
      options: [
        {
          en: 'In "open" mode, element.shadowRoot is accessible from outer JavaScript; in "closed" mode, element.shadowRoot returns null, preventing external inspection',
          vi: 'Ở chế độ "open", element.shadowRoot có thể truy cập được từ JS bên ngoài; ở chế độ "closed", element.shadowRoot trả về null, ngăn chặn việc can thiệp từ ngoài'
        },
        {
          en: '"open" mode is public domain, "closed" mode requires a paid license',
          vi: '"open" là mã nguồn mở, còn "closed" đòi hỏi bản quyền trả phí'
        },
        {
          en: '"closed" mode disables all CSS styling',
          vi: '"closed" vô hiệu hóa mọi định kiểu CSS'
        },
        {
          en: '"open" mode only works on mobile devices',
          vi: '"open" chỉ hoạt động trên thiết bị di động'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Open mode exposes element.shadowRoot; closed mode encapsulates it completely (almost all production web components use open mode).',
        vi: 'Chế độ open cho phép đọc element.shadowRoot; chế độ closed giấu kín hoàn toàn (hầu hết các web component đều dùng open).'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'medium'
    },
    {
      id: 'html_q_22_7',
      type: 'single_choice',
      question: {
        en: 'Which CSS pseudo-element selector styles light-DOM nodes distributed into a `<slot>` from inside Shadow DOM?',
        vi: 'Bộ chọn phần tử giả (pseudo-element) CSS nào định kiểu cho các node light-DOM được đưa vào `<slot>` từ bên trong Shadow DOM?'
      },
      options: [
        {
          en: '::slotted(selector)',
          vi: '::slotted(selector)'
        },
        {
          en: '::projected(selector)',
          vi: '::projected(selector)'
        },
        {
          en: '::inserted(selector)',
          vi: '::inserted(selector)'
        },
        {
          en: '::child(selector)',
          vi: '::child(selector)'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '::slotted() targets elements passed into a slot projection from within shadow styles.',
        vi: '::slotted() nhắm mục tiêu vào các phần tử được chèn vào slot từ bên trong bảng kiểu shadow.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'medium'
    },
    {
      id: 'html_q_22_8',
      type: 'single_choice',
      question: {
        en: 'Which lifecycle callback method is invoked on a Custom Element whenever it is inserted into the document DOM tree?',
        vi: 'Phương thức vòng đời (lifecycle callback) nào được gọi trên Custom Element mỗi khi nó được chèn vào cây DOM của tài liệu?'
      },
      options: [
        {
          en: 'connectedCallback()',
          vi: 'connectedCallback()'
        },
        {
          en: 'componentDidMount()',
          vi: 'componentDidMount()'
        },
        {
          en: 'onInsert()',
          vi: 'onInsert()'
        },
        {
          en: 'attached()',
          vi: 'attached()'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'connectedCallback() is the native Custom Element lifecycle hook executed when connected to the DOM.',
        vi: 'connectedCallback() là hook vòng đời gốc của Custom Element được gọi khi gắn vào DOM.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_22_9',
      type: 'single_choice',
      question: {
        en: 'What happens if a custom element tag contains children, but its Shadow DOM template has NO `<slot>` elements?',
        vi: 'Điều gì xảy ra nếu thẻ custom element chứa các phần tử con, nhưng template Shadow DOM của nó KHÔNG có bất kỳ thẻ `<slot>` nào?'
      },
      options: [
        {
          en: 'The child elements remain in the light DOM tree but are NOT rendered on the screen because there is no slot outlet to project them',
          vi: 'Các phần tử con vẫn tồn tại trong cây light DOM nhưng KHÔNG được hiển thị lên màn hình vì không có cổng slot để đưa ra'
        },
        {
          en: 'The browser throws a DOMSyntaxError and crashes',
          vi: 'Trình duyệt ném ra lỗi DOMSyntaxError và dừng hoạt động'
        },
        {
          en: 'The child elements are deleted permanently from memory',
          vi: 'Các phần tử con bị xóa vĩnh viễn khỏi bộ nhớ'
        },
        {
          en: 'The children are rendered at the bottom of the body tag',
          vi: 'Các phần tử con bị đẩy xuống đáy thẻ body'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Without a <slot>, light DOM children are ignored by the shadow tree rendering engine.',
        vi: 'Nếu không có <slot>, các node con trong light DOM sẽ không được bộ máy render shadow tree vẽ ra màn hình.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'medium'
    },
    {
      id: 'html_q_22_10',
      type: 'single_choice',
      question: {
        en: 'What static getter must be declared on a Custom Element class to observe attribute changes via attributeChangedCallback()?',
        vi: 'Hàm getter tĩnh (static getter) nào bắt buộc phải khai báo trên lớp Custom Element để theo dõi thay đổi thuộc tính qua attributeChangedCallback()?'
      },
      options: [
        {
          en: 'static get observedAttributes() { return ["attr1", "attr2"]; }',
          vi: 'static get observedAttributes() { return ["attr1", "attr2"]; }'
        },
        {
          en: 'static get watchList() { return ["attr1", "attr2"]; }',
          vi: 'static get watchList() { return ["attr1", "attr2"]; }'
        },
        {
          en: 'static get props() { return ["attr1", "attr2"]; }',
          vi: 'static get props() { return ["attr1", "attr2"]; }'
        },
        {
          en: 'static get listen() { return ["attr1", "attr2"]; }',
          vi: 'static get listen() { return ["attr1", "attr2"]; }'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'observedAttributes returns an array of attribute names to monitor for changes.',
        vi: 'observedAttributes trả về mảng danh sách tên các thuộc tính cần theo dõi thay đổi.'
      },
      topicId: 'html_web_components_specs',
      difficulty: 'medium'
    }
  ]
};

export default lesson22;
