import { Lesson } from '../../../../types';

export const lesson13: Lesson = {
  id: 'html_lesson_13',
  moduleId: 'html_mod_4',
  levelId: 'intermediate',
  courseId: 'html',
  order: 13,
  topicId: 'html_interactive_elements',
  title: {
    en: 'Native Interactive Elements: details, summary & dialog',
    vi: 'Phần Tử Tương Tác Gốc: details, summary & dialog'
  },
  summary: {
    en: 'Master native interactive widgets with zero external JavaScript dependencies: collapsible accordion disclosure widgets with <details> and <summary>, native accessible modal popups with <dialog>, showModal() focus trapping, ::backdrop styling, and Esc key dismissal.',
    vi: 'Làm chủ các widget tương tác gốc không cần phụ thuộc thư viện JavaScript ngoài: khối đóng mở thu gọn accordion với <details> và <summary>, hộp thoại modal chuẩn trợ năng với <dialog>, bẫy tiêu điểm showModal(), định kiểu ::backdrop và đóng bằng phím Esc.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'HTML5 introduced native interactive UI primitives directly into the browser engine. Elements like <details> and <dialog> eliminate hundreds of lines of fragile JavaScript modal plugins while guaranteeing full accessibility compliance.',
      vi: 'HTML5 bổ sung các phần tử giao diện tương tác gốc trực tiếp vào nhân trình duyệt. Thẻ <details> và <dialog> loại bỏ hoàn toàn hàng trăm dòng mã plugin JavaScript dễ lỗi mà vẫn đảm bảo tuân thủ đầy đủ chuẩn trợ năng.'
    },
    conceptExplanation: {
      en: '1. **Collapsible Disclosure (`<details>` & `<summary>`)**:\n   - `<details><summary>FAQ Question</summary><p>Answer text...</p></details>`\n   - Browser manages open/closed state natively with the `open` attribute.\n   - Keyboard accessible (Enter/Space toggles) and screen reader compatible out-of-the-box.\n   - Group multiple `<details name="faq">` elements sharing a `name` attribute to create native exclusive accordions (only one opens at a time).\n\n2. **Accessible Native Modals (`<dialog>`)**:\n   - `<dialog id="modal-box">`: Native popup container.\n   - `dialog.showModal()`: Opens as a top-layer accessible modal with automatic backdrop, focus trapping inside the modal, and Esc key dismissal.\n   - `dialog.show()`: Opens as a non-modal popup (user can still click background elements).\n   - `dialog.close()`: Closes dialog.\n   - `<form method="dialog">`: Native form submission inside dialog that automatically closes the dialog and passes the clicked button value to `dialog.returnValue`.\n\n3. **Backdrop Styling (`::backdrop`)**:\n   - CSS pseudo-element `dialog::backdrop` styles the overlay behind the open modal (e.g. blur, dimming).',
      vi: '1. **Khối đóng mở thu gọn (`<details>` & `<summary>`)**:\n   - `<details><summary>Câu hỏi thường gặp</summary><p>Nội dung câu trả lời...</p></details>`\n   - Trình duyệt tự quản lý trạng thái đóng mở thông qua thuộc tính `open`.\n   - Hỗ trợ bàn phím (Enter/Space) và tương thích hoàn toàn với trình đọc màn hình mà không cần JS.\n   - Gom nhóm nhiều thẻ `<details name="faq">` cùng thuộc tính `name` để tạo accordion độc quyền gốc (mở cái này thì cái kia tự đóng).\n\n2. **Hộp thoại Modal chuẩn trợ năng (`<dialog>`)**:\n   - `<dialog id="modal-box">`: Khung popup gốc.\n   - `dialog.showModal()`: Mở modal ở tầng cao nhất (top layer), tự động bẫy tiêu điểm bàn phím, tạo lớp phủ nền và đóng khi bấm phím Esc.\n   - `dialog.show()`: Mở popup thông thường (vẫn bấm được bên ngoài).\n   - `dialog.close()`: Đóng hộp thoại.\n   - `<form method="dialog">`: Form đặc biệt bên trong dialog tự đóng dialog và trả giá trị nút bấm về `dialog.returnValue`.\n\n3. **Định kiểu lớp phủ nền (`::backdrop`)**:\n   - Phần tử giả CSS `dialog::backdrop` cho phép làm mờ, tối nền phía sau modal.'
    },
    syntax: `<!-- Native Accordion -->
<details name="pricing-faq">
  <summary>What payment methods are supported?</summary>
  <p>We accept Visa, MasterCard, PayPal, and Wire Transfer.</p>
</details>

<!-- Native Accessible Modal Dialog -->
<dialog id="confirm-modal">
  <form method="dialog">
    <h2>Confirm Account Deletion</h2>
    <p>This action is irreversible.</p>
    <menu>
      <button value="cancel">Cancel</button>
      <button value="confirm" autofocus>Confirm Delete</button>
    </menu>
  </form>
</dialog>`,
    examples: [
      {
        title: {
          en: 'Exclusive Name-Grouped Accordion System',
          vi: 'Hệ Thống Accordion Độc Quyền Dùng Thuộc Tính Name'
        },
        code: `<div class="faq-group">
  <details name="support-faq" open>
    <summary>How do I reset my password?</summary>
    <p>Click "Forgot Password" on the login screen to receive a secure reset link.</p>
  </details>
  <details name="support-faq">
    <summary>Where can I download invoices?</summary>
    <p>Navigate to Settings &gt; Billing &gt; Invoices to export PDF receipts.</p>
  </details>
</div>`,
        language: 'html',
        explanation: {
          en: 'By sharing name="support-faq", opening one details automatically collapses the other with zero JavaScript.',
          vi: 'Bằng việc dùng chung name="support-faq", mở một mục details sẽ tự động thu gọn mục kia mà không cần một dòng JavaScript nào.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Calling dialog.show() instead of dialog.showModal() for modal dialogs',
          vi: 'Gọi dialog.show() thay vì dialog.showModal() cho các hộp thoại modal'
        },
        correction: {
          en: 'dialog.show() creates a non-modal dialog that does NOT trap focus, does NOT render a ::backdrop, and does NOT close on Esc. Always use dialog.showModal() for true modals.',
          vi: 'dialog.show() chỉ tạo popup thường không bẫy tiêu điểm, không có ::backdrop và không đóng khi ấn Esc. Luôn dùng dialog.showModal() cho modal thực thụ.'
        },
        code: '// Correct: document.querySelector("dialog").showModal();'
      },
      {
        mistake: {
          en: 'Nesting interactive elements like <button> or <a> directly inside <summary>',
          vi: 'Lồng các phần tử tương tác như <button> hoặc <a> trực tiếp bên trong <summary>'
        },
        correction: {
          en: '<summary> is already an interactive button control. Nesting buttons inside it creates invalid interactive content that confuses screen readers.',
          vi: 'Thẻ <summary> bản thân nó đã là một nút bấm tương tác. Lồng thêm button hay liên kết vào trong nó sẽ phá vỡ cây trợ năng.'
        },
        code: '<!-- Correct: <summary>Plain Summary Title</summary> -->'
      }
    ],
    tips: [
      {
        en: 'You can listen to the "close" event on <dialog> to retrieve dialog.returnValue from the submitting button.',
        vi: 'Bạn có thể bắt sự kiện "close" trên thẻ <dialog> để lấy giá trị dialog.returnValue từ nút bấm vừa submit.'
      }
    ],
    practice: {
      task: {
        en: 'Implement an Accessible Native Dialog and Disclosure Accordion',
        vi: 'Triển Khai Modal Dialog Gốc Và Khối Đóng Mở Summary Chuẩn Trợ Năng'
      },
      instruction: {
        en: 'Create a <details> widget containing <summary>System Status</summary> and <p>All services operational.</p>. Below it, create a <dialog id="status-dialog"> with a <form method="dialog"><button value="ok">OK</button></form></dialog>.',
        vi: 'Tạo thẻ <details> có <summary>System Status</summary> và <p>All services operational.</p>. Phía dưới, tạo <dialog id="status-dialog"> chứa <form method="dialog"><button value="ok">OK</button></form></dialog>.'
      },
      starterCode: '<!-- Build details and dialog -->\n',
      solutionCode: `<details>
  <summary>System Status</summary>
  <p>All services operational.</p>
</details>

<dialog id="status-dialog">
  <form method="dialog">
    <p>System metrics refreshed.</p>
    <button value="ok">OK</button>
  </form>
</dialog>`,
      requiredPatterns: [
        '<details>',
        '<summary>System Status</summary>',
        '</details>',
        '<dialog id="status-dialog">',
        '<form method="dialog">',
        '<button value="ok">OK</button>',
        '</dialog>'
      ],
      hint: {
        en: 'Use <details> with <summary>, and <dialog> with <form method="dialog">.',
        vi: 'Dùng <details> kèm <summary>, và <dialog> chứa <form method="dialog">.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Build an Exclusive Grouped FAQ Section',
        vi: 'Xây Dựng Khối FAQ Nhóm Độc Quyền'
      },
      instruction: {
        en: 'Create two <details name="faq-tier"> elements with summaries "Standard Plan" and "Pro Plan". Give the first one the open attribute.',
        vi: 'Tạo 2 thẻ <details name="faq-tier"> có summary "Standard Plan" và "Pro Plan". Đặt thuộc tính open cho thẻ đầu tiên.'
      },
      starterCode: '<!-- Build exclusive faq -->\n',
      solutionCode: `<details name="faq-tier" open>
  <summary>Standard Plan</summary>
  <p>Includes basic cloud hosting and email support.</p>
</details>
<details name="faq-tier">
  <summary>Pro Plan</summary>
  <p>Includes dedicated compute, SLA guarantees, and 24/7 phone support.</p>
</details>`,
      requiredPatterns: [
        '<details name="faq-tier" open>',
        '<summary>Standard Plan</summary>',
        '<details name="faq-tier">',
        '<summary>Pro Plan</summary>'
      ],
      hint: {
        en: 'Ensure both details share name="faq-tier" and the first has the open attribute.',
        vi: 'Đảm bảo cả 2 thẻ details đều có name="faq-tier" và thẻ đầu có thuộc tính open.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_14_1',
      type: 'complete_code',
      title: {
        en: 'Add Open Attribute to Details Disclosure',
        vi: 'Thêm Thuộc Tính Open Cho Thẻ Details'
      },
      instruction: {
        en: 'Add the open attribute to the <details> element so it renders expanded by default.',
        vi: 'Thêm thuộc tính open vào thẻ <details> để nó mở rộng sẵn mặc định.'
      },
      starterCode: `<details>
  <summary>Changelog v2.4</summary>
  <p>Performance improvements and bug fixes.</p>
</details>`,
      solutionCode: `<details open>
  <summary>Changelog v2.4</summary>
  <p>Performance improvements and bug fixes.</p>
</details>`,
      hint: {
        en: 'Add the boolean open attribute to <details>.',
        vi: 'Thêm thuộc tính boolean open vào <details>.'
      },
      explanation: {
        en: 'The open attribute specifies that the details should be visible to the user on page load.',
        vi: 'Thuộc tính open chỉ định nội dung của details được mở sẵn khi tải trang.'
      }
    },
    {
      id: 'html_ex_14_2',
      type: 'fix_code',
      title: {
        en: 'Fix Modal Dialog Form Submission Method',
        vi: 'Sửa Phương Thức Form Đóng Modal Dialog'
      },
      instruction: {
        en: 'Change the form\'s method to method="dialog" so clicking the button closes the dialog without navigating.',
        vi: 'Đổi method của form thành method="dialog" để bấm nút sẽ đóng dialog mà không tải lại trang.'
      },
      starterCode: `<dialog id="pref-dialog">
  <form method="POST">
    <button value="save">Save Changes</button>
  </form>
</dialog>`,
      solutionCode: `<dialog id="pref-dialog">
  <form method="dialog">
    <button value="save">Save Changes</button>
  </form>
</dialog>`,
      hint: {
        en: 'Set method="dialog".',
        vi: 'Đặt method="dialog".'
      },
      explanation: {
        en: 'method="dialog" on a form inside a dialog automatically dismisses the dialog on submit.',
        vi: 'method="dialog" trên form bên trong dialog sẽ tự động đóng dialog khi người dùng submit.'
      }
    },
    {
      id: 'html_ex_14_3',
      type: 'write_code',
      title: {
        en: 'Write Native Modal Dialog with Cancel and Submit Buttons',
        vi: 'Tạo Modal Dialog Gốc Gồm Nút Hủy Và Nút Xác Nhận'
      },
      instruction: {
        en: 'Write a <dialog id="logout-dialog"> containing a <form method="dialog"> with <h3>Log Out?</h3> and two buttons: <button value="cancel">Cancel</button> and <button value="logout" autofocus>Log Out</button>.',
        vi: 'Viết thẻ <dialog id="logout-dialog"> chứa <form method="dialog"> có <h3>Log Out?</h3> và 2 nút: <button value="cancel">Cancel</button> và <button value="logout" autofocus>Log Out</button>.'
      },
      starterCode: '<!-- Write logout dialog -->\n',
      solutionCode: `<dialog id="logout-dialog">
  <form method="dialog">
    <h3>Log Out?</h3>
    <button value="cancel">Cancel</button>
    <button value="logout" autofocus>Log Out</button>
  </form>
</dialog>`,
      hint: {
        en: 'Use <dialog id="logout-dialog"><form method="dialog">...</form></dialog>.',
        vi: 'Dùng <dialog id="logout-dialog"><form method="dialog">...</form></dialog>.'
      },
      explanation: {
        en: 'The autofocus attribute places keyboard focus on the preferred action when the modal opens.',
        vi: 'Thuộc tính autofocus tự động đưa con trỏ bàn phím vào nút hành động ưu tiên khi modal mở.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_14',
    title: {
      en: 'Enterprise Interactive Modal and Disclosure Hub',
      vi: 'Trung Tâm Hộp Thoại Modal Và Accordion Tương Tác Doanh Nghiệp'
    },
    description: {
      en: 'Construct an interactive support portal incorporating an exclusive name-grouped FAQ accordion suite, an accessible native modal confirmation dialog with <form method="dialog">, autofocus action trigger, and structured dialog backdrop styling hooks.',
      vi: 'Xây dựng cổng hỗ trợ tương tác gồm accordion FAQ nhóm độc quyền, hộp thoại xác nhận modal gốc với form method="dialog", nút autofocus và các điểm móc định kiểu backdrop.'
    },
    requirements: [
      {
        en: 'At least two <details> elements sharing the same name attribute for exclusive grouping',
        vi: 'Ít nhất 2 thẻ <details> dùng chung thuộc tính name để tạo nhóm độc quyền'
      },
      {
        en: 'First <details> element has the open attribute',
        vi: 'Thẻ <details> đầu tiên có thuộc tính open'
      },
      {
        en: '<dialog id="enterprise-modal"> container',
        vi: 'Khung <dialog id="enterprise-modal">'
      },
      {
        en: '<form method="dialog"> inside dialog with cancel and confirm buttons',
        vi: '<form method="dialog"> bên trong dialog có nút cancel và confirm'
      },
      {
        en: 'Primary confirm button includes autofocus attribute',
        vi: 'Nút xác nhận chính có thuộc tính autofocus'
      }
    ],
    starterCode: '<!-- Build enterprise interactive hub -->\n',
    solutionCode: `<section class="support-faq">
  <h2>Frequently Asked Technical Inquiries</h2>
  
  <details name="enterprise-faq" open>
    <summary>How does multi-region replication work?</summary>
    <p>Our platform replicates data across 3 distinct geographic zones with sub-5ms sync latency.</p>
  </details>

  <details name="enterprise-faq">
    <summary>What is your enterprise SLA guarantee?</summary>
    <p>We provide 99.999% uptime with 24/7 dedicated engineering response teams.</p>
  </details>
</section>

<dialog id="enterprise-modal">
  <form method="dialog">
    <h3>Confirm Subscription Upgrade</h3>
    <p>You will be billed for Enterprise Tier privileges starting today.</p>
    <menu>
      <button value="cancel">Keep Current Plan</button>
      <button value="upgrade" autofocus>Upgrade Now</button>
    </menu>
  </form>
</dialog>`,
    hints: [
      {
        en: 'Ensure both details have name="enterprise-faq" and the modal dialog contains a form with method="dialog".',
        vi: 'Đảm bảo cả 2 thẻ details đều có name="enterprise-faq" và modal dialog chứa form có method="dialog".'
      }
    ],
    solutionExplanation: {
      en: 'Employs cutting-edge native HTML5 interactive standards for clean code, zero bundle weight, and seamless accessibility.',
      vi: 'Ứng dụng tiêu chuẩn tương tác HTML5 gốc mới nhất giúp mã sạch, dung lượng 0 byte JS và trợ năng hoàn hảo.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_14_1',
      type: 'single_choice',
      question: {
        en: 'What JavaScript method MUST you call on a <dialog> element to activate true modal behavior (focus trapping, ::backdrop, and Esc key dismissal)?',
        vi: 'Phương thức JavaScript nào BẮT BUỘC phải gọi trên phần tử <dialog> để kích hoạt hành vi modal thực thụ (bẫy tiêu điểm, ::backdrop và đóng bằng phím Esc)?'
      },
      options: [
        {
          en: 'dialog.showModal()',
          vi: 'dialog.showModal()'
        },
        {
          en: 'dialog.show()',
          vi: 'dialog.show()'
        },
        {
          en: 'dialog.open()',
          vi: 'dialog.open()'
        },
        {
          en: 'dialog.display()',
          vi: 'dialog.display()'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'showModal() opens the dialog in the browser\'s top layer with modal semantics; show() opens it as a non-modal popup.',
        vi: 'showModal() mở dialog ở tầng cao nhất (top layer) với đầy đủ tính chất modal; show() chỉ mở dạng popup thường.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'easy'
    },
    {
      id: 'html_q_14_2',
      type: 'single_choice',
      question: {
        en: 'How can you group multiple <details> elements so that opening one automatically closes any other open details in the group without JavaScript?',
        vi: 'Làm thế nào để gom nhóm nhiều phần tử <details> để khi mở một mục thì các mục khác tự đóng lại mà không cần JavaScript?'
      },
      options: [
        {
          en: 'Assign the identical name attribute to all <details> elements in that group (e.g. name="faq")',
          vi: 'Gán cùng một thuộc tính name cho tất cả các thẻ <details> trong nhóm đó (vd: name="faq")'
        },
        {
          en: 'Wrap them in an <accordion> tag',
          vi: 'Bọc chúng trong thẻ <accordion>'
        },
        {
          en: 'Give them the same class name',
          vi: 'Đặt cho chúng cùng tên class'
        },
        {
          en: 'Set group="exclusive" on the parent div',
          vi: 'Đặt group="exclusive" trên thẻ div cha'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The name attribute on <details> was standardized in HTML to provide native zero-JS exclusive accordions.',
        vi: 'Thuộc tính name trên <details> đã được chuẩn hóa trong HTML để tạo accordion độc quyền gốc mà không cần JS.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'medium'
    },
    {
      id: 'html_q_14_3',
      type: 'single_choice',
      question: {
        en: 'What happens when a user submits a <form method="dialog"> inside an open <dialog>?',
        vi: 'Điều gì xảy ra khi người dùng gửi một <form method="dialog"> bên trong một thẻ <dialog> đang mở?'
      },
      options: [
        {
          en: 'The browser closes the dialog automatically without navigating or making a network request, and stores the clicked button\'s value in dialog.returnValue',
          vi: 'Trình duyệt tự động đóng dialog mà không chuyển hướng hay gửi yêu cầu mạng, đồng thời lưu giá trị của nút vừa bấm vào dialog.returnValue'
        },
        {
          en: 'The browser reloads the entire webpage',
          vi: 'Trình duyệt tải lại toàn bộ trang web'
        },
        {
          en: 'The form data is sent as an HTTP POST request to the server',
          vi: 'Dữ liệu form được gửi dưới dạng yêu cầu HTTP POST lên máy chủ'
        },
        {
          en: 'The dialog is deleted from the DOM',
          vi: 'Thẻ dialog bị xóa khỏi cây DOM'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'method="dialog" allows closing the dialog natively and transmitting user intent via returnValue.',
        vi: 'method="dialog" cho phép đóng dialog gốc và truyền ý định người dùng qua thuộc tính returnValue.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'medium'
    },
    {
      id: 'html_q_14_4',
      type: 'single_choice',
      question: {
        en: 'Which CSS pseudo-element is used to style the darkened or blurred background overlay behind an open modal dialog?',
        vi: 'Phần tử giả CSS nào được dùng để định kiểu lớp phủ nền tối hoặc mờ phía sau một modal dialog đang mở?'
      },
      options: [
        {
          en: 'dialog::backdrop',
          vi: 'dialog::backdrop'
        },
        {
          en: 'dialog::overlay',
          vi: 'dialog::overlay'
        },
        {
          en: 'dialog::background',
          vi: 'dialog::background'
        },
        {
          en: 'dialog::shadow',
          vi: 'dialog::shadow'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '::backdrop targets the browser-generated fullscreen pseudo-element rendered directly behind top-layer dialogs.',
        vi: '::backdrop nhắm vào phần tử giả toàn màn hình do trình duyệt tự tạo ra nằm ngay phía sau dialog ở top layer.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'easy'
    },
    {
      id: 'html_q_14_5',
      type: 'single_choice',
      question: {
        en: 'Why is putting an interactive <button> or <a> tag inside a <summary> element considered invalid and harmful for accessibility?',
        vi: 'Tại sao việc đặt nút bấm <button> hoặc liên kết <a> bên trong thẻ <summary> bị coi là không hợp lệ và gây hại cho trợ năng?'
      },
      options: [
        {
          en: '<summary> already has an implicit button role. Nesting interactive elements inside other interactive elements violates accessibility standards and confuses assistive devices',
          vi: 'Thẻ <summary> vốn dĩ đã có vai trò là một nút bấm. Lồng phần tử tương tác bên trong một phần tử tương tác khác vi phạm tiêu chuẩn trợ năng và gây rối loạn cho công nghệ trợ thính'
        },
        {
          en: 'Because CSS cannot style buttons inside summary',
          vi: 'Vì CSS không thể định kiểu nút bấm trong summary'
        },
        {
          en: 'Because JavaScript will throw a syntax error on page load',
          vi: 'Vì JavaScript sẽ báo lỗi cú pháp khi tải trang'
        },
        {
          en: 'Because summary tags are only allowed to contain images',
          vi: 'Vì thẻ summary chỉ được phép chứa hình ảnh'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'W3C HTML accessibility rules forbid nesting interactive controls within other interactive controls.',
        vi: 'Quy tắc trợ năng W3C nghiêm cấm việc lồng các điều khiển tương tác bên trong các điều khiển tương tác khác.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'medium'
    },
    {
      id: 'html_q_14_6',
      type: 'single_choice',
      question: {
        en: 'What keyboard key automatically closes a modal opened via dialog.showModal()?',
        vi: 'Phím bàn phím nào sẽ tự động đóng modal được mở qua dialog.showModal()?'
      },
      options: [
        {
          en: 'Escape (Esc)',
          vi: 'Escape (Esc)'
        },
        {
          en: 'Enter',
          vi: 'Enter'
        },
        {
          en: 'Tab',
          vi: 'Tab'
        },
        {
          en: 'Backspace',
          vi: 'Backspace'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Escape key triggers the "cancel" event on <dialog> and dismisses modal dialogs natively.',
        vi: 'Phím Esc kích hoạt sự kiện "cancel" trên <dialog> và tự động đóng modal.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'easy'
    },
    {
      id: 'html_q_14_7',
      type: 'single_choice',
      question: {
        en: 'How does a browser indicate to assistive technologies whether a <details> element is currently expanded?',
        vi: 'Trình duyệt thông báo cho các công nghệ trợ thính biết phần tử <details> có đang mở rộng hay không bằng cách nào?'
      },
      options: [
        {
          en: 'It automatically exposes an expanded state in the accessibility tree matching the presence of the open attribute',
          vi: 'Nó tự động xuất trạng thái expanded trong cây trợ năng tương ứng với sự hiện diện của thuộc tính open'
        },
        {
          en: 'Developers must write JavaScript to toggle aria-expanded manually',
          vi: 'Lập trình viên phải viết JavaScript để bật tắt aria-expanded thủ công'
        },
        {
          en: 'It plays a sound when opened',
          vi: 'Nó phát ra âm thanh khi mở'
        },
        {
          en: 'It changes the document title',
          vi: 'Nó thay đổi tiêu đề tài liệu'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Native <details> handles accessibility semantics automatically without requiring custom ARIA attributes.',
        vi: 'Thẻ <details> gốc tự động xử lý ngữ nghĩa trợ năng mà không cần thêm thuộc tính ARIA thủ công.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'easy'
    },
    {
      id: 'html_q_14_8',
      type: 'single_choice',
      question: {
        en: 'What event is fired on a <dialog> element when it is closed?',
        vi: 'Sự kiện nào được kích hoạt trên phần tử <dialog> khi nó được đóng lại?'
      },
      options: [
        {
          en: 'close',
          vi: 'close'
        },
        {
          en: 'dismiss',
          vi: 'dismiss'
        },
        {
          en: 'hide',
          vi: 'hide'
        },
        {
          en: 'finish',
          vi: 'finish'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The "close" event fires on <dialog> whenever it closes via dialog.close() or <form method="dialog">.',
        vi: 'Sự kiện "close" kích hoạt trên <dialog> bất cứ khi nào nó được đóng qua dialog.close() hoặc form method="dialog".'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'easy'
    },
    {
      id: 'html_q_14_9',
      type: 'single_choice',
      question: {
        en: 'What is the function of the autofocus attribute when placed on a button inside a modal <dialog>?',
        vi: 'Chức năng của thuộc tính autofocus khi đặt trên một nút bấm bên trong modal <dialog> là gì?'
      },
      options: [
        {
          en: 'Directs initial keyboard focus to that specific element as soon as dialog.showModal() is invoked',
          vi: 'Điều hướng tiêu điểm bàn phím ban đầu vào phần tử đó ngay khi dialog.showModal() được gọi'
        },
        {
          en: 'Submits the form automatically after 3 seconds',
          vi: 'Tự động submit form sau 3 giây'
        },
        {
          en: 'Makes the button pulse with a CSS animation',
          vi: 'Làm nút bấm nhấp nháy hoạt ảnh CSS'
        },
        {
          en: 'Prevents the user from clicking any other button',
          vi: 'Ngăn người dùng bấm vào các nút khác'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'autofocus inside a modal dialog designates which control receives initial focus upon opening.',
        vi: 'autofocus bên trong modal dialog chỉ định nút điều khiển nào sẽ nhận tiêu điểm đầu tiên khi mở.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'medium'
    },
    {
      id: 'html_q_14_10',
      type: 'single_choice',
      question: {
        en: 'Can a `<dialog>` element contain regular text headings, paragraphs, and lists inside its body?',
        vi: 'Phần tử `<dialog>` có thể chứa các tiêu đề văn bản, đoạn văn và danh sách thông thường bên trong không?'
      },
      options: [
        {
          en: 'Yes; <dialog> is a standard container element that accepts any valid flow and phrasing HTML content',
          vi: 'Có; <dialog> là phần tử container tiêu chuẩn chấp nhận mọi nội dung HTML hợp lệ'
        },
        {
          en: 'No; <dialog> can only contain <form> elements',
          vi: 'Không; <dialog> chỉ được phép chứa thẻ <form>'
        },
        {
          en: 'No; only plain unformatted text strings are allowed',
          vi: 'Không; chỉ cho phép văn bản thô không định dạng'
        },
        {
          en: 'Only if wrapped in a <div>',
          vi: 'Chỉ khi được bọc trong một thẻ <div>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<dialog> accepts all standard HTML elements including forms, headings, lists, images, and tables.',
        vi: '<dialog> chấp nhận tất cả các phần tử HTML chuẩn gồm form, tiêu đề, danh sách, hình ảnh và bảng.'
      },
      topicId: 'html_interactive_elements',
      difficulty: 'easy'
    }
  ]
};

export default lesson13;
