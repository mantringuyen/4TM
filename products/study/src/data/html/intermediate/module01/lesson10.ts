import { Lesson } from '../../../../types';

export const lesson10: Lesson = {
  id: 'html_lesson_10',
  moduleId: 'html_mod_3',
  levelId: 'intermediate',
  courseId: 'html',
  order: 10,
  topicId: 'html_forms_basics',
  title: {
    en: 'Forms: form, label, input, fieldset & legend',
    vi: 'Biểu Mẫu: form, label, input, fieldset & legend'
  },
  summary: {
    en: 'Master core accessible form architecture: <form action/method>, explicit programmatic pairing with <label for="id">, foundational input types (text, email, password, number, checkbox, radio), and thematic grouping with <fieldset> and <legend>.',
    vi: 'Làm chủ kiến trúc biểu mẫu chuẩn trợ năng: <form action/method>, kỹ thuật liên kết tường minh <label for="id">, các loại input cơ bản (text, email, password, number, checkbox, radio) và nhóm trường ngữ nghĩa bằng <fieldset> và <legend>.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'HTML forms are the primary interactive communication bridge between users and web applications. Constructing accessible, properly labeled forms ensures that all users, including those using screen readers and keyboards, can seamlessly submit data.',
      vi: 'Biểu mẫu HTML là cầu nối tương tác chính giữa người dùng và ứng dụng web. Xây dựng form chuẩn trợ năng và gán nhãn đúng cách đảm bảo mọi người dùng, kể cả người dùng bàn phím và trình đọc màn hình, đều có thể gửi dữ liệu thuận tiện.'
    },
    conceptExplanation: {
      en: '1. **`<form>` Element**:\n   - `action="/submit-endpoint"`: Destination URL for processing data.\n   - `method="POST|GET"`: HTTP verb. Use POST for sensitive or state-changing payloads; GET for searchable queries.\n\n2. **Explicit Label Association**:\n   - ALWAYS pair `<label for="email-input">` with `<input id="email-input" name="email">`. Never rely on placeholder as a substitute for a visible label.\n   - Clicking the label focuses or toggles the input element, increasing click target size on touchscreens.\n\n3. **Grouping with `<fieldset>` & `<legend>`**:\n   - Group related radio buttons or checkboxes (e.g. shipping address, payment method) inside `<fieldset>`. The `<legend>` provides an accessible group header vocalized before each option.\n\n4. **Form Controls**:\n   - `<button type="submit">`: Submits the form.\n   - `<button type="button">`: Custom action handled via JavaScript.\n   - `<button type="reset">`: Clears inputs (use with caution).',
      vi: '1. **Thẻ `<form>`**:\n   - `action="/submit-endpoint"`: URL máy chủ tiếp nhận dữ liệu.\n   - `method="POST|GET"`: Phương thức HTTP. Dùng POST cho dữ liệu nhạy cảm hoặc thay đổi trạng thái; GET cho tìm kiếm.\n\n2. **Liên kết nhãn tường minh (`<label for="...">`)**:\n   - LUÔN LUÔN liên kết `<label for="email-input">` với `<input id="email-input" name="email">`. Không bao giờ dùng placeholder để thay thế nhãn hiển thị.\n   - Nhấp vào nhãn sẽ tự động focus vào ô nhập hoặc tích chọn ô, mở rộng vùng bấm trên màn hình cảm ứng.\n\n3. **Phân nhóm bằng `<fieldset>` & `<legend>`**:\n   - Nhóm các nút radio hoặc checkbox liên quan (vd: địa chỉ giao hàng, phương thức thanh toán) trong `<fieldset>`. Thẻ `<legend>` là tiêu đề nhóm được trình đọc màn hình phát âm trước mỗi lựa chọn.\n\n4. **Nút bấm điều khiển**:\n   - `<button type="submit">`: Gửi biểu mẫu.\n   - `<button type="button">`: Nút chức năng tùy biến xử lý bằng JavaScript.\n   - `<button type="reset">`: Xóa trắng biểu mẫu.'
    },
    syntax: `<form action="/api/account" method="POST">
  <fieldset>
    <legend>Account Credentials</legend>
    <div>
      <label for="user-email">Work Email</label>
      <input type="email" id="user-email" name="email" required autocomplete="email">
    </div>
    <div>
      <label for="user-pass">Password</label>
      <input type="password" id="user-pass" name="password" required autocomplete="new-password">
    </div>
  </fieldset>
  <button type="submit">Create Account</button>
</form>`,
    examples: [
      {
        title: {
          en: 'Accessible Radio Button Group inside Fieldset',
          vi: 'Nhóm Nút Radio Chuẩn Trợ Năng Trong Fieldset'
        },
        code: `<fieldset>
  <legend>Preferred Notification Method</legend>
  <div>
    <input type="radio" id="notify-email" name="notify_pref" value="email" checked>
    <label for="notify-email">Email Notification</label>
  </div>
  <div>
    <input type="radio" id="notify-sms" name="notify_pref" value="sms">
    <label for="notify-sms">SMS Text Message</label>
  </div>
</fieldset>`,
        language: 'html',
        explanation: {
          en: 'All radio inputs share the same name attribute, ensuring mutual exclusivity, while fieldset and legend provide accessible context.',
          vi: 'Các nút radio dùng chung thuộc tính name để chỉ chọn được một mục, trong khi fieldset và legend cung cấp ngữ cảnh cho trình đọc màn hình.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using placeholder attribute as a substitute for a <label>',
          vi: 'Dùng thuộc tính placeholder để thay thế hoàn toàn cho thẻ <label>'
        },
        correction: {
          en: 'Placeholders disappear when typing, have low contrast, and are not reliably announced by screen readers. Always provide a visible <label for="id">.',
          vi: 'Placeholder biến mất khi người dùng gõ chữ, độ tương phản kém và không được đọc rõ ràng trên trình đọc màn hình. Luôn luôn có <label for="id">.'
        },
        code: '<!-- Correct: <label for="fn">First Name</label><input id="fn" name="first_name"> -->'
      },
      {
        mistake: {
          en: 'Omitting the name attribute on form inputs',
          vi: 'Quên không khai báo thuộc tính name trên các thẻ input'
        },
        correction: {
          en: 'Inputs without a name attribute are ignored during form submission and will not be sent to the server.',
          vi: 'Thẻ input không có thuộc tính name sẽ bị bỏ qua và không được gửi lên máy chủ khi submit form.'
        },
        code: '<!-- Correct: <input type="text" id="username" name="username"> -->'
      }
    ],
    tips: [
      {
        en: 'Always include the autocomplete attribute (e.g. autocomplete="email", "current-password", "tel") to assist browser password managers and autofill engines.',
        vi: 'Luôn khai báo thuộc tính autocomplete (vd: autocomplete="email", "current-password") để hỗ trợ trình quản lý mật khẩu tự động điền.'
      }
    ],
    practice: {
      task: {
        en: 'Build an Accessible Registration Form',
        vi: 'Xây Dựng Biểu Mẫu Đăng Ký Chuẩn Trợ Năng'
      },
      instruction: {
        en: 'Create a <form action="/register" method="POST"> with a <fieldset> titled <legend>User Profile</legend>, containing an explicit <label for="fullname">Full Name</label> paired with <input type="text" id="fullname" name="fullname" required>, and a submit button.',
        vi: 'Tạo thẻ <form action="/register" method="POST"> gồm <fieldset> có <legend>User Profile</legend>, chứa <label for="fullname">Full Name</label> liên kết với <input type="text" id="fullname" name="fullname" required>, và nút submit.'
      },
      starterCode: '<!-- Build registration form -->\n',
      solutionCode: `<form action="/register" method="POST">
  <fieldset>
    <legend>User Profile</legend>
    <label for="fullname">Full Name</label>
    <input type="text" id="fullname" name="fullname" required>
  </fieldset>
  <button type="submit">Register</button>
</form>`,
      requiredPatterns: [
        '<form action="/register" method="POST">',
        '<fieldset>',
        '<legend>User Profile</legend>',
        '<label for="fullname">Full Name</label>',
        '<input type="text" id="fullname" name="fullname" required>',
        '<button type="submit">Register</button>',
        '</form>'
      ],
      hint: {
        en: 'Ensure label for matches input id exactly, and place legend as the first child of fieldset.',
        vi: 'Đảm bảo label for khớp chính xác với input id và đặt legend là con đầu tiên trong fieldset.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Implement a Radio Group with Fieldset and Legend',
        vi: 'Triển Khai Nhóm Radio Với Fieldset Và Legend'
      },
      instruction: {
        en: 'Create a <fieldset> with <legend>Billing Cycle</legend> and two radio options (monthly and annual) with shared name="billing_cycle".',
        vi: 'Tạo thẻ <fieldset> có <legend>Billing Cycle</legend> và 2 lựa chọn radio (monthly và annual) dùng chung name="billing_cycle".'
      },
      starterCode: '<!-- Build radio fieldset -->\n',
      solutionCode: `<fieldset>
  <legend>Billing Cycle</legend>
  <div>
    <input type="radio" id="cycle-month" name="billing_cycle" value="monthly" checked>
    <label for="cycle-month">Monthly ($15/mo)</label>
  </div>
  <div>
    <input type="radio" id="cycle-year" name="billing_cycle" value="annual">
    <label for="cycle-year">Annual ($144/yr - Save 20%)</label>
  </div>
</fieldset>`,
      requiredPatterns: [
        '<fieldset>',
        '<legend>Billing Cycle</legend>',
        'name="billing_cycle"',
        'type="radio"',
        '</fieldset>'
      ],
      hint: {
        en: 'Both radio buttons must share the same name attribute value.',
        vi: 'Cả hai nút radio phải có cùng giá trị thuộc tính name.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_9_1',
      type: 'complete_code',
      title: {
        en: 'Associate Label with Input Field',
        vi: 'Liên Kết Thẻ Label Với Ô Input'
      },
      instruction: {
        en: 'Add the for="user-age" attribute to the <label> and id="user-age" to the <input> element.',
        vi: 'Thêm thuộc tính for="user-age" vào <label> và id="user-age" vào thẻ <input>.'
      },
      starterCode: `<label>Your Age</label>
<input type="number" name="age">`,
      solutionCode: `<label for="user-age">Your Age</label>
<input type="number" id="user-age" name="age">`,
      hint: {
        en: 'Match the label\'s for attribute to the input\'s id attribute.',
        vi: 'Gán giá trị for của label trùng khớp với id của input.'
      },
      explanation: {
        en: 'Explicit label association ensures screen readers read the field name and clicking the text focuses the input.',
        vi: 'Liên kết nhãn tường minh giúp trình đọc màn hình phát âm tên trường và bấm vào chữ sẽ focus vào ô nhập.'
      }
    },
    {
      id: 'html_ex_9_2',
      type: 'fix_code',
      title: {
        en: 'Fix Radio Button Independence Bug',
        vi: 'Sửa Lỗi Nút Radio Bị Chọn Độc Lập'
      },
      instruction: {
        en: 'Fix the two radio buttons so selecting one automatically unselects the other by giving them the same name="subscription_tier" attribute.',
        vi: 'Sửa 2 nút radio để khi chọn nút này sẽ tự bỏ chọn nút kia bằng cách cho chúng cùng thuộc tính name="subscription_tier".'
      },
      starterCode: `<input type="radio" id="tier-free" name="free_plan" value="free">
<label for="tier-free">Free</label>
<input type="radio" id="tier-pro" name="pro_plan" value="pro">
<label for="tier-pro">Pro</label>`,
      solutionCode: `<input type="radio" id="tier-free" name="subscription_tier" value="free">
<label for="tier-free">Free</label>
<input type="radio" id="tier-pro" name="subscription_tier" value="pro">
<label for="tier-pro">Pro</label>`,
      hint: {
        en: 'Change both name attributes to "subscription_tier".',
        vi: 'Đổi cả hai thuộc tính name thành "subscription_tier".'
      },
      explanation: {
        en: 'Radio buttons in the same mutually-exclusive group must share identical name attributes.',
        vi: 'Các nút radio trong cùng một nhóm loại trừ lẫn nhau phải dùng chung thuộc tính name.'
      }
    },
    {
      id: 'html_ex_9_3',
      type: 'write_code',
      title: {
        en: 'Write Secure Password Form Field',
        vi: 'Tạo Trường Nhập Mật Khẩu An Toàn'
      },
      instruction: {
        en: 'Write a <label for="pwd">Password</label> paired with <input type="password" id="pwd" name="password" required autocomplete="current-password">.',
        vi: 'Viết <label for="pwd">Password</label> liên kết với <input type="password" id="pwd" name="password" required autocomplete="current-password">.'
      },
      starterCode: '<!-- Write password field -->\n',
      solutionCode: `<label for="pwd">Password</label>
<input type="password" id="pwd" name="password" required autocomplete="current-password">`,
      hint: {
        en: 'Use for="pwd", id="pwd", type="password", and autocomplete="current-password".',
        vi: 'Dùng for="pwd", id="pwd", type="password" và autocomplete="current-password".'
      },
      explanation: {
        en: 'Masks typed characters and supports browser password autocompletion.',
        vi: 'Ẩn ký tự khi gõ và hỗ trợ trình duyệt tự động điền mật khẩu.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_9',
    title: {
      en: 'Enterprise Multi-Section Onboarding Form',
      vi: 'Biểu Mẫu Nhập Liệu Khởi Tạo Doanh Nghiệp Đa Khối'
    },
    description: {
      en: 'Construct a complete accessible multi-fieldset onboarding form including account credentials, organization contact details, subscription radio selection, terms acceptance checkbox, and semantic submit button.',
      vi: 'Xây dựng biểu mẫu khởi tạo doanh nghiệp hoàn chỉnh gồm nhiều fieldset: thông tin tài khoản, thông tin liên hệ tổ chức, gói đăng ký radio, checkbox chấp thuận điều khoản và nút submit.'
    },
    requirements: [
      {
        en: '<form action="/api/onboarding" method="POST">',
        vi: 'Thẻ <form action="/api/onboarding" method="POST">'
      },
      {
        en: 'First <fieldset> with <legend>Account Security</legend> containing email and password inputs with explicit labels',
        vi: 'Fieldset thứ nhất có <legend>Account Security</legend> chứa email và password có nhãn tường minh'
      },
      {
        en: 'Second <fieldset> with <legend>Plan Tier</legend> containing radio buttons with shared name',
        vi: 'Fieldset thứ hai có <legend>Plan Tier</legend> chứa các nút radio dùng chung name'
      },
      {
        en: 'Checkbox for Terms of Service with matching label',
        vi: 'Checkbox đồng ý Điều khoản dịch vụ có nhãn tương ứng'
      },
      {
        en: '<button type="submit"> with accessible label text',
        vi: 'Nút <button type="submit"> có chữ hiển thị rõ ràng'
      }
    ],
    starterCode: '<!-- Build enterprise onboarding form -->\n',
    solutionCode: `<form action="/api/onboarding" method="POST">
  <fieldset>
    <legend>Account Security</legend>
    <div>
      <label for="work-email">Work Email</label>
      <input type="email" id="work-email" name="email" required autocomplete="email">
    </div>
    <div>
      <label for="account-pass">Master Password</label>
      <input type="password" id="account-pass" name="password" required autocomplete="new-password">
    </div>
  </fieldset>

  <fieldset>
    <legend>Organization Tier</legend>
    <div>
      <input type="radio" id="plan-startup" name="plan" value="startup" checked>
      <label for="plan-startup">Startup ($49/mo)</label>
    </div>
    <div>
      <input type="radio" id="plan-enterprise" name="plan" value="enterprise">
      <label for="plan-enterprise">Enterprise ($299/mo)</label>
    </div>
  </fieldset>

  <div>
    <input type="checkbox" id="terms-agree" name="terms" required>
    <label for="terms-agree">I accept the Master Services Agreement</label>
  </div>

  <button type="submit">Complete Setup</button>
</form>`,
    hints: [
      {
        en: 'Ensure all inputs have unique IDs matching their corresponding label for attributes.',
        vi: 'Đảm bảo mọi input đều có ID duy nhất khớp với thuộc tính for của label tương ứng.'
      }
    ],
    solutionExplanation: {
      en: 'Creates a fully accessible, keyboard-traversable, and screen reader-compliant form architecture.',
      vi: 'Tạo nên cấu trúc biểu mẫu chuẩn mực tiếp cận toàn diện cho người dùng bàn phím và trình đọc màn hình.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_9_1',
      type: 'single_choice',
      question: {
        en: 'Why is connecting <label for="id"> with <input id="id"> critical for accessibility and usability?',
        vi: 'Tại sao việc liên kết <label for="id"> với <input id="id"> lại tối quan trọng cho trợ năng và trải nghiệm người dùng?'
      },
      options: [
        {
          en: 'It programmatically binds the descriptive name to the input for screen readers and allows clicking the text label to focus or toggle the input',
          vi: 'Nó gắn kết tên mô tả vào ô nhập cho trình đọc màn hình và cho phép nhấp vào văn bản nhãn để focus hoặc tích chọn ô nhập'
        },
        {
          en: 'It encrypts form data during transmission',
          vi: 'Nó mã hóa dữ liệu form khi truyền tải'
        },
        {
          en: 'It forces the browser to save inputs in local storage',
          vi: 'Nó ép trình duyệt lưu dữ liệu vào local storage'
        },
        {
          en: 'It changes the font color of the input text',
          vi: 'Nó đổi màu chữ của ô nhập'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Explicit label association establishes an accessible name and enlarges the hit area for touch/mouse users.',
        vi: 'Liên kết nhãn tường minh tạo tên trợ năng và mở rộng diện tích bấm cho người dùng chuột và cảm ứng.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_9_2',
      type: 'single_choice',
      question: {
        en: 'What is the role of <fieldset> and <legend> in HTML forms?',
        vi: 'Vai trò của thẻ <fieldset> và <legend> trong biểu mẫu HTML là gì?'
      },
      options: [
        {
          en: '<fieldset> groups conceptually related form controls, and <legend> provides an accessible caption announced for the group',
          vi: '<fieldset> nhóm các trường nhập liệu có liên quan ngữ nghĩa và <legend> là tiêu đề chú thích được trình đọc màn hình xướng lên'
        },
        {
          en: 'They apply 3D drop shadow borders in CSS',
          vi: 'Chúng áp dụng viền bóng mờ 3D trong CSS'
        },
        {
          en: 'They disable JavaScript execution inside the form',
          vi: 'Chúng vô hiệu hóa mã JavaScript bên trong form'
        },
        {
          en: 'They convert the form into a multi-page wizard automatically',
          vi: 'Chúng tự động chuyển form thành nhiều trang wizard'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<fieldset> and <legend> provide vital contextual grouping for screen reader users.',
        vi: '<fieldset> và <legend> mang lại khả năng gom nhóm ngữ cảnh thiết yếu cho người dùng trình đọc màn hình.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_9_3',
      type: 'single_choice',
      question: {
        en: 'What occurs if an <input> tag is submitted inside a form without a name attribute?',
        vi: 'Điều gì xảy ra nếu một thẻ <input> được gửi đi trong form mà không có thuộc tính name?'
      },
      options: [
        {
          en: 'The input value is completely omitted from the submitted HTTP request payload',
          vi: 'Giá trị của ô nhập đó sẽ bị bỏ qua hoàn toàn và không được gửi lên máy chủ trong gói tin HTTP'
        },
        {
          en: 'The form submission crashes the user\'s browser',
          vi: 'Thao tác submit form làm treo trình duyệt người dùng'
        },
        {
          en: 'The browser auto-generates a random name attribute',
          vi: 'Trình duyệt tự động sinh ra một thuộc tính name ngẫu nhiên'
        },
        {
          en: 'The input is converted to a submit button',
          vi: 'Ô nhập đó bị biến thành nút submit'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Only controls with a name attribute are recognized as submittable elements in HTML form data encoding.',
        vi: 'Chỉ các thẻ có thuộc tính name mới được đưa vào dữ liệu đóng gói gửi lên máy chủ khi submit form.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_9_4',
      type: 'single_choice',
      question: {
        en: 'Why is placeholder alone considered an anti-pattern for accessible form design?',
        vi: 'Tại sao việc chỉ dùng placeholder mà không có label bị coi là một anti-pattern trong thiết kế biểu mẫu trợ năng?'
      },
      options: [
        {
          en: 'Placeholder text vanishes once typing starts, typically fails WCAG color contrast standards, and is not announced reliably as the field label',
          vi: 'Văn bản placeholder biến mất ngay khi gõ, thường không đạt độ tương phản màu WCAG và không được xướng lên đáng tin cậy làm tên trường'
        },
        {
          en: 'Placeholders increase server CPU usage',
          vi: 'Placeholder làm tăng mức sử dụng CPU của máy chủ'
        },
        {
          en: 'Placeholders only support numbers',
          vi: 'Placeholder chỉ hỗ trợ ký tự số'
        },
        {
          en: 'Placeholders are blocked by firewall rules',
          vi: 'Placeholder bị chặn bởi tường lửa'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Placeholders are supplementary hints, never a replacement for persistent, high-contrast <label> elements.',
        vi: 'Placeholder chỉ là gợi ý tạm thời, không bao giờ có thể thay thế cho thẻ <label> cố định có độ tương phản cao.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_9_5',
      type: 'single_choice',
      question: {
        en: 'When should a form use method="POST" instead of method="GET"?',
        vi: 'Khi nào biểu mẫu nên dùng method="POST" thay vì method="GET"?'
      },
      options: [
        {
          en: 'When transmitting sensitive credentials, large file uploads, or modifying server state (database inserts, updates, deletes)',
          vi: 'Khi truyền thông tin nhạy cảm, tải tệp lớn hoặc thay đổi trạng thái máy chủ (thêm, sửa, xóa dữ liệu)'
        },
        {
          en: 'When searching a public catalog where the URL should be bookmarkable',
          vi: 'Khi tìm kiếm danh mục công khai mà URL cần được lưu bookmark'
        },
        {
          en: 'Only on mobile devices',
          vi: 'Chỉ khi dùng trên thiết bị di động'
        },
        {
          en: 'When JavaScript is disabled',
          vi: 'Khi JavaScript bị tắt'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'POST places data inside the HTTP request body rather than exposing it in the URL query string.',
        vi: 'POST đóng gói dữ liệu trong phần thân (body) của yêu cầu HTTP thay vì để lộ trên chuỗi URL.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_9_6',
      type: 'single_choice',
      question: {
        en: 'How do you ensure a group of radio buttons allows only one single selection at a time?',
        vi: 'Làm thế nào để đảm bảo một nhóm nút radio chỉ cho phép chọn duy nhất một mục tại một thời điểm?'
      },
      options: [
        {
          en: 'Assign the identical name attribute value to all radio <input> elements in that group',
          vi: 'Gán cùng một giá trị thuộc tính name cho tất cả các thẻ <input type="radio"> trong nhóm đó'
        },
        {
          en: 'Give them the same id attribute',
          vi: 'Đặt cho chúng cùng thuộc tính id'
        },
        {
          en: 'Wrap each in a different <form> tag',
          vi: 'Bọc mỗi nút trong một thẻ <form> riêng'
        },
        {
          en: 'Add unique="true" to the fieldset',
          vi: 'Thêm unique="true" vào thẻ fieldset'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Shared name values define mutual exclusion across radio buttons.',
        vi: 'Giá trị name dùng chung tạo nên tính loại trừ lẫn nhau giữa các nút radio.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_9_7',
      type: 'single_choice',
      question: {
        en: 'What is the default type of a <button> element placed inside a <form> if type is omitted?',
        vi: 'Giá trị type mặc định của thẻ <button> nằm trong thẻ <form> nếu không khai báo type là gì?'
      },
      options: [
        {
          en: 'type="submit"',
          vi: 'type="submit"'
        },
        {
          en: 'type="button"',
          vi: 'type="button"'
        },
        {
          en: 'type="reset"',
          vi: 'type="reset"'
        },
        {
          en: 'type="menu"',
          vi: 'type="menu"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Inside a form, a button without a type defaults to submit, causing unintended form submissions if clicked.',
        vi: 'Trong form, nút bấm không khai báo type sẽ mặc định là submit, dễ dẫn đến việc gửi form ngoài ý muốn khi nhấp.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_9_8',
      type: 'single_choice',
      question: {
        en: 'What is the benefit of using autocomplete="new-password" on registration password fields?',
        vi: 'Lợi ích của việc dùng autocomplete="new-password" trên trường nhập mật khẩu đăng ký là gì?'
      },
      options: [
        {
          en: 'Instructs browser password managers to suggest and generate a strong unique password rather than filling an existing saved password',
          vi: 'Chỉ dẫn trình quản lý mật khẩu đề xuất và tạo một mật khẩu mạnh mới thay vì tự điền mật khẩu cũ đã lưu'
        },
        {
          en: 'Hashes the password with SHA-256 on the client',
          vi: 'Băm mật khẩu bằng SHA-256 trên máy client'
        },
        {
          en: 'Prevents the user from copying the text',
          vi: 'Ngăn người dùng sao chép văn bản'
        },
        {
          en: 'Sends the password via SMS',
          vi: 'Gửi mật khẩu qua tin nhắn SMS'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'autocomplete="new-password" signals password generators to activate.',
        vi: 'autocomplete="new-password" báo hiệu cho trình tạo mật khẩu tự động kích hoạt.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_9_9',
      type: 'single_choice',
      question: {
        en: 'Which HTML5 input type provides built-in email format checking and activates the @ symbol on mobile keyboards?',
        vi: 'Loại input HTML5 nào cung cấp sẵn kiểm tra định dạng email và tự động bật phím @ trên bàn phím di động?'
      },
      options: [
        {
          en: 'type="email"',
          vi: 'type="email"'
        },
        {
          en: 'type="text"',
          vi: 'type="text"'
        },
        {
          en: 'type="mail"',
          vi: 'type="mail"'
        },
        {
          en: 'type="address"',
          vi: 'type="address"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'type="email" configures mobile keyboards and invokes built-in email syntax validation.',
        vi: 'type="email" tối ưu bàn phím di động và kích hoạt cơ chế kiểm tra cú pháp email tích hợp.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_9_10',
      type: 'single_choice',
      question: {
        en: 'Can a single form contain multiple submit buttons that send data to different server endpoints?',
        vi: 'Một biểu mẫu có thể chứa nhiều nút submit gửi dữ liệu đến các endpoint máy chủ khác nhau không?'
      },
      options: [
        {
          en: 'Yes; buttons can use the formaction and formmethod attributes to override the parent <form> action and method',
          vi: 'Có; các nút submit có thể dùng thuộc tính formaction và formmethod để ghi đè action và method của thẻ <form> cha'
        },
        {
          en: 'No; HTML forms strictly permit only one single action endpoint',
          vi: 'Không; biểu mẫu HTML chỉ cho phép gửi đến một endpoint duy nhất'
        },
        {
          en: 'Only when using AJAX with WebSockets',
          vi: 'Chỉ khi dùng AJAX với WebSockets'
        },
        {
          en: 'Only in XML forms',
          vi: 'Chỉ trong biểu mẫu XML'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'formaction, formmethod, and formtarget attributes on submit buttons override the parent form settings.',
        vi: 'Thuộc tính formaction và formmethod trên nút submit cho phép ghi đè cấu hình của form cha.'
      },
      topicId: 'html_forms_basics',
      difficulty: 'medium'
    }
  ]
};

export default lesson10;
