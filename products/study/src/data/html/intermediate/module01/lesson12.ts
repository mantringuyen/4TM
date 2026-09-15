import { Lesson } from '../../../../types';

export const lesson12: Lesson = {
  id: 'html_lesson_12',
  moduleId: 'html_mod_3',
  levelId: 'intermediate',
  courseId: 'html',
  order: 12,
  topicId: 'html_form_validation',
  title: {
    en: 'Native Form Validation: required, pattern, min/max & Constraint Validation API',
    vi: 'Kiểm Tra Biểu Mẫu Gốc: required, pattern, min/max & Constraint Validation API'
  },
  summary: {
    en: 'Master declarative HTML5 constraint validation: required, pattern regex, minlength/maxlength, min/max, step, CSS pseudo-classes (:valid, :invalid, :user-invalid), accessible error association via aria-describedby and aria-invalid, and scripting with the Constraint Validation API (setCustomValidity).',
    vi: 'Làm chủ kiểm tra ràng buộc HTML5 gốc: required, regex pattern, minlength/maxlength, min/max, step, các lớp giả CSS (:valid, :invalid, :user-invalid), liên kết thông báo lỗi chuẩn trợ năng qua aria-describedby và aria-invalid, cùng lập trình Constraint Validation API.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'HTML5 brought declarative, native input validation into the browser engine. Built-in validation gives users instantaneous feedback, prevents unnecessary server roundtrips, and delivers accessible error notifications out of the box.',
      vi: 'HTML5 tích hợp cơ chế kiểm tra dữ liệu biểu mẫu khai báo trực tiếp vào nhân trình duyệt. Điều này mang lại phản hồi tức thì cho người dùng, giảm thiểu các yêu cầu mạng không cần thiết và thông báo lỗi chuẩn trợ năng.'
    },
    conceptExplanation: {
      en: '1. **Declarative Validation Attributes**:\n   - `required`: Field must not be empty.\n   - `pattern="[A-Za-z0-9]{6,}"`: JavaScript regular expression pattern matching.\n   - `minlength` & `maxlength`: String length constraints.\n   - `min`, `max`, `step`: Numeric, date, and range bounds.\n\n2. **CSS Validation Pseudo-Classes**:\n   - `:valid` & `:invalid`: Immediate validation status.\n   - `:user-invalid`: Modern pseudo-class that matches invalid state ONLY after the user has interacted with the input (avoiding premature red borders before typing).\n\n3. **Accessible Error Messaging**:\n   - Link error messages to inputs using `aria-describedby="error-id"`.\n   - Toggle `aria-invalid="true"` when a field fails validation so screen readers vocalize the failure.\n\n4. **Constraint Validation API**:\n   - `input.checkValidity()`: Returns boolean validation state.\n   - `input.setCustomValidity("Custom error text")`: Sets a localized error message or clears it with empty string `""`.\n   - `<form novalidate>`: Disables default browser popup bubbles while keeping the JavaScript validation API active.',
      vi: '1. **Các thuộc tính kiểm tra khai báo**:\n   - `required`: Không được để trống.\n   - `pattern="[A-Za-z0-9]{6,}"`: Khớp với biểu thức chính quy (Regex).\n   - `minlength` & `maxlength`: Ràng buộc độ dài chuỗi ký tự.\n   - `min`, `max`, `step`: Giới hạn giá trị số, ngày tháng và bước nhảy.\n\n2. **Lớp giả CSS kiểm tra dữ liệu**:\n   - `:valid` & `:invalid`: Trạng thái kiểm tra tức thời.\n   - `:user-invalid`: Chỉ kích hoạt trạng thái lỗi SAU KHI người dùng đã tương tác (tránh viền đỏ trước khi kịp gõ chữ).\n\n3. **Thông báo lỗi chuẩn trợ năng**:\n   - Liên kết thông báo lỗi với ô nhập bằng `aria-describedby="error-id"`.\n   - Bật `aria-invalid="true"` khi dữ liệu không hợp lệ để trình đọc màn hình cảnh báo người dùng.\n\n4. **Constraint Validation API**:\n   - `input.checkValidity()`: Trả về boolean trạng thái hợp lệ.\n   - `input.setCustomValidity("Nội dung lỗi")`: Thiết lập câu thông báo lỗi tùy biến (hoặc truyền chuỗi rỗng `""` để xóa lỗi).\n   - `<form novalidate>`: Tắt bong bóng cảnh báo mặc định của trình duyệt để tự vẽ giao diện lỗi tùy biến.'
    },
    syntax: `<form action="/checkout" method="POST" novalidate>
  <div>
    <label for="zipcode">Postal Code (5 digits)</label>
    <input type="text" id="zipcode" name="zip" required pattern="[0-9]{5}" aria-describedby="zip-hint zip-error" aria-invalid="false">
    <p id="zip-hint" class="hint">Format: 12345</p>
    <p id="zip-error" class="error-msg" hidden>Please enter a valid 5-digit postal code.</p>
  </div>
  <button type="submit">Submit</button>
</form>`,
    examples: [
      {
        title: {
          en: 'Accessible Password Policy Validation',
          vi: 'Kiểm Tra Quy Tắc Mật Khẩu Chuẩn Trợ Năng'
        },
        code: `<div>
  <label for="user-password">Create Password</label>
  <input type="password" 
         id="user-password" 
         name="password" 
         required 
         minlength="8" 
         pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}" 
         aria-describedby="pwd-requirements" 
         autocomplete="new-password">
  <small id="pwd-requirements">Must be at least 8 characters and include at least one uppercase letter and one number.</small>
</div>`,
        language: 'html',
        explanation: {
          en: 'Combines required, minlength, and regex pattern with aria-describedby guidance for assistive devices.',
          vi: 'Kết hợp required, minlength và regex pattern với hướng dẫn aria-describedby cho thiết bị trợ năng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Relying exclusively on client-side HTML5 validation for application security',
          vi: 'Chỉ dựa vào kiểm tra HTML5 ở trình duyệt để bảo mật ứng dụng'
        },
        correction: {
          en: 'Client-side validation is purely for user experience (UX). Attackers can bypass browser checks easily. Always enforce strict server-side validation.',
          vi: 'Kiểm tra phía client chỉ phục vụ trải nghiệm người dùng. Hacker có thể dễ dàng vượt qua kiểm tra của trình duyệt. Luôn luôn kiểm tra nghiêm ngặt trên máy chủ.'
        },
        code: '<!-- Security rule: Always validate on the backend server -->'
      },
      {
        mistake: {
          en: 'Leaving setCustomValidity("error") active even after the user corrects their input',
          vi: 'Quên không xóa thông báo setCustomValidity("error") khi người dùng đã sửa đúng dữ liệu'
        },
        correction: {
          en: 'Any non-empty string in setCustomValidity marks the input as permanently invalid. You must pass setCustomValidity("") once valid.',
          vi: 'Bất kỳ chuỗi ký tự nào khác rỗng trong setCustomValidity đều khiến ô nhập bị coi là lỗi vĩnh viễn. Phải truyền setCustomValidity("") khi hợp lệ.'
        },
        code: '// input.setCustomValidity(""); // Clears custom error'
      }
    ],
    tips: [
      {
        en: 'Use the :user-invalid CSS pseudo-class instead of :invalid to ensure form inputs do not flash red upon initial page render.',
        vi: 'Dùng pseudo-class CSS :user-invalid thay cho :invalid để các ô nhập không bị đỏ lòm ngay khi vừa mở trang.'
      }
    ],
    practice: {
      task: {
        en: 'Implement an Accessible Validated Input with Regex Pattern',
        vi: 'Triển Khai Ô Nhập Dữ Liệu Có Kiểm Tra Regex Chuẩn Trợ Năng'
      },
      instruction: {
        en: 'Create an input with label for="phone", id="phone", name="phone", type="tel", required, pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}", and aria-describedby="phone-hint". Add the <p id="phone-hint"> helper text.',
        vi: 'Tạo ô nhập có label for="phone", id="phone", name="phone", type="tel", required, pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" và aria-describedby="phone-hint". Thêm đoạn văn bản <p id="phone-hint">Format: 123-456-7890</p>.'
      },
      starterCode: '<!-- Build validated phone input -->\n',
      solutionCode: `<label for="phone">Phone Number</label>
<input type="tel" id="phone" name="phone" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" aria-describedby="phone-hint">
<p id="phone-hint">Format: 123-456-7890</p>`,
      requiredPatterns: [
        '<label for="phone">Phone Number</label>',
        '<input type="tel" id="phone" name="phone" required',
        'pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"',
        'aria-describedby="phone-hint"',
        '<p id="phone-hint">Format: 123-456-7890</p>'
      ],
      hint: {
        en: 'Match the label for to the input id, and the aria-describedby to the paragraph id.',
        vi: 'Khớp label for với input id và aria-describedby với id của thẻ paragraph.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Build a Complete Validated Checkout Form with Novalidate',
        vi: 'Xây Dựng Biểu Mẫu Thanh Toán Có Kiểm Tra Ràng Buộc'
      },
      instruction: {
        en: 'Construct a <form action="/pay" method="POST" novalidate> with an amount input (min="5", max="1000", step="0.01", type="number", required) and a submit button.',
        vi: 'Xây dựng <form action="/pay" method="POST" novalidate> gồm ô nhập số tiền (min="5", max="1000", step="0.01", type="number", required) và nút submit.'
      },
      starterCode: '<!-- Build validated form -->\n',
      solutionCode: `<form action="/pay" method="POST" novalidate>
  <div>
    <label for="donation">Donation Amount ($)</label>
    <input type="number" id="donation" name="amount" min="5" max="1000" step="0.01" required>
  </div>
  <button type="submit">Donate Now</button>
</form>`,
      requiredPatterns: [
        '<form action="/pay" method="POST" novalidate>',
        '<label for="donation">',
        '<input type="number" id="donation" name="amount"',
        'min="5"',
        'max="1000"',
        'step="0.01"',
        'required',
        '<button type="submit">'
      ],
      hint: {
        en: 'Declare type="number", min="5", max="1000", and step="0.01" on the input.',
        vi: 'Khai báo type="number", min="5", max="1000" và step="0.01" trên ô input.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_11_1',
      type: 'complete_code',
      title: {
        en: 'Add Minlength and Pattern Validation',
        vi: 'Thêm Ràng Buộc Minlength Và Pattern'
      },
      instruction: {
        en: 'Add required, minlength="3", and pattern="[A-Za-z]+" to the username input.',
        vi: 'Thêm required, minlength="3" và pattern="[A-Za-z]+" vào ô input username.'
      },
      starterCode: '<input type="text" id="username" name="username">',
      solutionCode: '<input type="text" id="username" name="username" required minlength="3" pattern="[A-Za-z]+">',
      hint: {
        en: 'Insert required, minlength="3", and pattern="[A-Za-z]+".',
        vi: 'Thêm required, minlength="3" và pattern="[A-Za-z]+".'
      },
      explanation: {
        en: 'Restricts the input to letters only with a minimum length of 3 characters.',
        vi: 'Giới hạn ô nhập chỉ chứa chữ cái và tối thiểu 3 ký tự.'
      }
    },
    {
      id: 'html_ex_11_2',
      type: 'fix_code',
      title: {
        en: 'Fix Broken aria-describedby Association',
        vi: 'Sửa Lỗi Liên Kết aria-describedby'
      },
      instruction: {
        en: 'Fix the input\'s aria-describedby attribute so it matches the id="error-tax" of the error paragraph.',
        vi: 'Sửa thuộc tính aria-describedby của input để khớp với id="error-tax" của đoạn thông báo lỗi.'
      },
      starterCode: `<input type="text" id="tax-id" name="tax_id" aria-describedby="wrong-id" aria-invalid="true">
<p id="error-tax">Tax ID must be 9 digits.</p>`,
      solutionCode: `<input type="text" id="tax-id" name="tax_id" aria-describedby="error-tax" aria-invalid="true">
<p id="error-tax">Tax ID must be 9 digits.</p>`,
      hint: {
        en: 'Set aria-describedby="error-tax".',
        vi: 'Đặt aria-describedby="error-tax".'
      },
      explanation: {
        en: 'Screen readers read the target element referenced by aria-describedby when the user focuses the field.',
        vi: 'Trình đọc màn hình sẽ đọc nội dung phần tử được trỏ tới bởi aria-describedby khi người dùng focus vào trường.'
      }
    },
    {
      id: 'html_ex_11_3',
      type: 'write_code',
      title: {
        en: 'Write Number Input with Decimal Step Constraints',
        vi: 'Tạo Ô Nhập Số Với Ràng Buộc Bước Nhảy Thập Phân'
      },
      instruction: {
        en: 'Write an <input type="number" id="price" name="price" min="0.01" max="9999.99" step="0.01" required>.',
        vi: 'Viết thẻ <input type="number" id="price" name="price" min="0.01" max="9999.99" step="0.01" required>.'
      },
      starterCode: '<!-- Write constrained number input -->\n',
      solutionCode: '<input type="number" id="price" name="price" min="0.01" max="9999.99" step="0.01" required>',
      hint: {
        en: 'Use type="number", min="0.01", max="9999.99", step="0.01", and required.',
        vi: 'Dùng type="number", min="0.01", max="9999.99", step="0.01" và required.'
      },
      explanation: {
        en: 'Forces two-decimal precision suitable for currency transactions.',
        vi: 'Bắt buộc độ chính xác 2 chữ số thập phân phù hợp cho giao dịch tiền tệ.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_11',
    title: {
      en: 'High-Integrity Validated Financial Onboarding Form',
      vi: 'Biểu Mẫu Nhập Liệu Tài Chính Ràng Buộc Nghiêm Ngặt'
    },
    description: {
      en: 'Construct a complete accessible form with client-side constraint validation rules including mandatory email, alphanumeric license code regex pattern, range bounds with step, aria-describedby instruction links, and aria-invalid flags.',
      vi: 'Xây dựng biểu mẫu hoàn chỉnh có kiểm tra ràng buộc gồm email bắt buộc, mã bản quyền chữ số regex, giới hạn số có step, liên kết hướng dẫn aria-describedby và cờ aria-invalid.'
    },
    requirements: [
      {
        en: '<form action="/verify" method="POST" novalidate>',
        vi: 'Thẻ <form action="/verify" method="POST" novalidate>'
      },
      {
        en: 'License key input with pattern="[A-Z0-9]{4}-[A-Z0-9]{4}" and aria-describedby hint',
        vi: 'Ô nhập mã bản quyền có pattern="[A-Z0-9]{4}-[A-Z0-9]{4}" và gợi ý aria-describedby'
      },
      {
        en: 'Seat count number input with min="1", max="100", step="1", and required',
        vi: 'Ô nhập số lượng ghế có min="1", max="100", step="1" và required'
      },
      {
        en: 'Email input with required and autocomplete="email"',
        vi: 'Ô nhập email có required và autocomplete="email"'
      },
      {
        en: 'Accessible error containers linked via aria-describedby',
        vi: 'Khung báo lỗi trợ năng liên kết qua aria-describedby'
      }
    ],
    starterCode: '<!-- Build enterprise validation form -->\n',
    solutionCode: `<form action="/verify" method="POST" novalidate>
  <div>
    <label for="work-email">Billing Email</label>
    <input type="email" id="work-email" name="email" required autocomplete="email" aria-describedby="email-hint">
    <p id="email-hint">Invoice will be delivered here.</p>
  </div>

  <div>
    <label for="license-key">Product License Key</label>
    <input type="text" id="license-key" name="license" required pattern="[A-Z0-9]{4}-[A-Z0-9]{4}" aria-describedby="license-hint" aria-invalid="false">
    <p id="license-hint">Format: ABCD-1234 (Uppercase and numbers only)</p>
  </div>

  <div>
    <label for="seats">Team Seats</label>
    <input type="number" id="seats" name="seats" min="1" max="100" step="1" value="5" required>
  </div>

  <button type="submit">Verify & Activate</button>
</form>`,
    hints: [
      {
        en: 'Ensure all inputs have proper type, id, name, and validation attributes matching requirements.',
        vi: 'Đảm bảo tất cả các input đều có type, id, name và thuộc tính kiểm tra dữ liệu phù hợp.'
      }
    ],
    solutionExplanation: {
      en: 'Creates a rock-solid declarative form architecture ready for accessible client-side and server-side processing.',
      vi: 'Tạo nên cấu trúc biểu mẫu khai báo vững chắc sẵn sàng cho xử lý dữ liệu tiếp cận ở cả client và server.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_11_1',
      type: 'single_choice',
      question: {
        en: 'Why is client-side HTML5 form validation NOT sufficient on its own for web security?',
        vi: 'Tại sao việc kiểm tra form HTML5 ở phía client KHÔNG đủ để đảm bảo an toàn bảo mật web?'
      },
      options: [
        {
          en: 'Client-side validation can be easily bypassed by disabling JavaScript or crafting raw HTTP POST requests via curl/Postman, so server-side validation is strictly required',
          vi: 'Kiểm tra phía client có thể dễ dàng bị qua mặt bằng cách tắt JavaScript hoặc gửi thẳng yêu cầu HTTP POST qua curl/Postman, do đó bắt buộc phải kiểm tra lại trên máy chủ'
        },
        {
          en: 'Because HTML5 validation only runs on Android devices',
          vi: 'Vì kiểm tra HTML5 chỉ chạy trên thiết bị Android'
        },
        {
          en: 'Because regular expressions cannot parse numbers',
          vi: 'Vì biểu thức chính quy không thể phân tích số'
        },
        {
          en: 'Because browsers charge a licensing fee for validation',
          vi: 'Vì các trình duyệt tính phí bản quyền cho tính năng kiểm tra form'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Client validation is strictly a UX convenience; the server must validate all incoming data independently.',
        vi: 'Kiểm tra ở client chỉ nhằm mang lại UX tốt; máy chủ luôn phải kiểm tra độc lập mọi dữ liệu nhận được.'
      },
      topicId: 'html_form_validation',
      difficulty: 'easy'
    },
    {
      id: 'html_q_11_2',
      type: 'single_choice',
      question: {
        en: 'What does the novalidate attribute do when placed on a <form> element?',
        vi: 'Thuộc tính novalidate có tác dụng gì khi đặt trên thẻ <form>?'
      },
      options: [
        {
          en: 'Suppresses the browser\'s native popup validation bubbles, allowing developers to implement custom JavaScript validation UI while still utilizing the Constraint Validation API',
          vi: 'Tắt các bong bóng cảnh báo lỗi mặc định của trình duyệt, cho phép lập trình viên tự hiển thị giao diện báo lỗi tùy biến bằng JavaScript với Constraint Validation API'
        },
        {
          en: 'Deletes all form inputs when clicked',
          vi: 'Xóa toàn bộ các ô nhập khi nhấp chuột'
        },
        {
          en: 'Disables HTTPS encryption for the form',
          vi: 'Tắt mã hóa HTTPS của form'
        },
        {
          en: 'Converts the form to read-only mode',
          vi: 'Chuyển form sang chế độ chỉ đọc'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'novalidate prevents browser default validation bubbles from rendering upon submit.',
        vi: 'novalidate ngăn trình duyệt hiển thị các bong bóng thông báo lỗi mặc định khi bấm submit.'
      },
      topicId: 'html_form_validation',
      difficulty: 'medium'
    },
    {
      id: 'html_q_11_3',
      type: 'single_choice',
      question: {
        en: 'Why is the CSS pseudo-class :user-invalid preferred over :invalid in modern web design?',
        vi: 'Tại sao pseudo-class CSS :user-invalid được ưa chuộng hơn :invalid trong thiết kế web hiện đại?'
      },
      options: [
        {
          en: ':user-invalid only matches after the user has actually interacted with and left the input, preventing empty required fields from turning red before the user even starts typing',
          vi: ':user-invalid chỉ kích hoạt sau khi người dùng đã thực sự tương tác và rời khỏi ô nhập, tránh làm ô bắt buộc bị viền đỏ ngay khi vừa mở trang'
        },
        {
          en: ':user-invalid is 10x faster to render',
          vi: ':user-invalid hiển thị nhanh gấp 10 lần'
        },
        {
          en: ':user-invalid works without HTML5',
          vi: ':user-invalid hoạt động mà không cần HTML5'
        },
        {
          en: ':user-invalid automatically fixes typos in passwords',
          vi: ':user-invalid tự động sửa lỗi chính tả trong mật khẩu'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: ':user-invalid prevents aggressive "eager" error states on pristine, untouched forms.',
        vi: ':user-invalid ngăn chặn tình trạng báo lỗi hấp tấp trên các trường nhập liệu mà người dùng chưa kịp chạm vào.'
      },
      topicId: 'html_form_validation',
      difficulty: 'medium'
    },
    {
      id: 'html_q_11_4',
      type: 'single_choice',
      question: {
        en: 'What method of the Constraint Validation API allows you to set a custom localized error message on an input element in JavaScript?',
        vi: 'Phương thức nào trong Constraint Validation API cho phép bạn đặt câu thông báo lỗi tùy biến theo ngôn ngữ trên thẻ input bằng JavaScript?'
      },
      options: [
        {
          en: 'input.setCustomValidity("Error message")',
          vi: 'input.setCustomValidity("Nội dung thông báo lỗi")'
        },
        {
          en: 'input.setErrorMessage("Error message")',
          vi: 'input.setErrorMessage("Nội dung thông báo lỗi")'
        },
        {
          en: 'input.showValidation("Error message")',
          vi: 'input.showValidation("Nội dung thông báo lỗi")'
        },
        {
          en: 'input.invalidate("Error message")',
          vi: 'input.invalidate("Nội dung thông báo lỗi")'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'setCustomValidity() sets the validation message. Passing an empty string "" marks the field as valid.',
        vi: 'setCustomValidity() đặt thông báo lỗi. Truyền chuỗi rỗng "" để đánh dấu ô nhập là hợp lệ.'
      },
      topicId: 'html_form_validation',
      difficulty: 'medium'
    },
    {
      id: 'html_q_11_5',
      type: 'single_choice',
      question: {
        en: 'How should you programmatically notify screen reader users when a form field has failed validation?',
        vi: 'Bạn nên thông báo cho người dùng trình đọc màn hình bằng cách nào khi một ô nhập bị lỗi dữ liệu?'
      },
      options: [
        {
          en: 'Set aria-invalid="true" on the input and associate the visible error text using aria-describedby="error-id"',
          vi: 'Đặt aria-invalid="true" trên ô input và liên kết văn bản lỗi nhìn thấy được bằng aria-describedby="error-id"'
        },
        {
          en: 'Play a loud beep sound via the Web Audio API',
          vi: 'Phát tiếng bíp lớn qua Web Audio API'
        },
        {
          en: 'Change the CSS border color to red',
          vi: 'Đổi màu viền CSS sang màu đỏ'
        },
        {
          en: 'Clear the value of the input',
          vi: 'Xóa trắng giá trị của ô input'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'aria-invalid="true" informs assistive tools of invalid state, and aria-describedby reads the error explanation.',
        vi: 'aria-invalid="true" báo cho công cụ trợ thính biết ô nhập bị lỗi, và aria-describedby đọc to nội dung giải thích lỗi.'
      },
      topicId: 'html_form_validation',
      difficulty: 'easy'
    },
    {
      id: 'html_q_11_6',
      type: 'single_choice',
      question: {
        en: 'What regular expression attribute on an <input> enforces specific alphanumeric pattern rules?',
        vi: 'Thuộc tính biểu thức chính quy nào trên thẻ <input> dùng để áp đặt quy tắc mẫu ký tự chữ và số?'
      },
      options: [
        {
          en: 'pattern',
          vi: 'pattern'
        },
        {
          en: 'regex',
          vi: 'regex'
        },
        {
          en: 'match',
          vi: 'match'
        },
        {
          en: 'rule',
          vi: 'rule'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The pattern attribute accepts a regular expression compiled against the input value.',
        vi: 'Thuộc tính pattern nhận vào một biểu thức chính quy để đối chiếu với giá trị người dùng nhập.'
      },
      topicId: 'html_form_validation',
      difficulty: 'easy'
    },
    {
      id: 'html_q_11_7',
      type: 'single_choice',
      question: {
        en: 'What does the step="0.01" attribute enforce on an <input type="number">?',
        vi: 'Thuộc tính step="0.01" áp đặt điều gì trên thẻ <input type="number">?'
      },
      options: [
        {
          en: 'Restricts valid inputs to numbers with up to two decimal places (e.g. currency amounts like 12.50)',
          vi: 'Giới hạn giá trị hợp lệ là số có tối đa 2 chữ số thập phân (vd: số tiền 12.50)'
        },
        {
          en: 'Increases the input value by 100 on every keystroke',
          vi: 'Tăng giá trị thêm 100 sau mỗi lần gõ phím'
        },
        {
          en: 'Delays form submission by 0.01 seconds',
          vi: 'Trì hoãn submit form 0.01 giây'
        },
        {
          en: 'Sets the font size to 0.01rem',
          vi: 'Đặt kích cỡ chữ thành 0.01rem'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'step defines the valid numerical granularity increments.',
        vi: 'step định nghĩa bước nhảy giá trị số học hợp lệ.'
      },
      topicId: 'html_form_validation',
      difficulty: 'easy'
    },
    {
      id: 'html_q_11_8',
      type: 'single_choice',
      question: {
        en: 'What happens if you call input.setCustomValidity("") with an empty string?',
        vi: 'Điều gì xảy ra khi bạn gọi input.setCustomValidity("") với một chuỗi rỗng?'
      },
      options: [
        {
          en: 'The custom error is cleared, and the input returns to a valid state (assuming all standard HTML constraints pass)',
          vi: 'Lỗi tùy biến bị xóa bỏ và ô nhập trở lại trạng thái hợp lệ (với điều kiện các ràng buộc HTML chuẩn đều thỏa mãn)'
        },
        {
          en: 'The input is removed from the DOM',
          vi: 'Ô nhập bị xóa khỏi cây DOM'
        },
        {
          en: 'An error message stating "empty" is displayed',
          vi: 'Hiển thị câu thông báo lỗi mang chữ "empty"'
        },
        {
          en: 'The form submits immediately',
          vi: 'Biểu mẫu được submit ngay lập tức'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Passing an empty string to setCustomValidity resets the custom error flag.',
        vi: 'Truyền chuỗi rỗng vào setCustomValidity sẽ xóa cờ lỗi tùy biến.'
      },
      topicId: 'html_form_validation',
      difficulty: 'medium'
    },
    {
      id: 'html_q_11_9',
      type: 'single_choice',
      question: {
        en: 'Which boolean property on an input element in JavaScript indicates whether it currently satisfies all constraint validation checks?',
        vi: 'Thuộc tính boolean nào trên phần tử input trong JavaScript cho biết liệu nó có đang thỏa mãn tất cả các kiểm tra ràng buộc không?'
      },
      options: [
        {
          en: 'input.validity.valid',
          vi: 'input.validity.valid'
        },
        {
          en: 'input.isCorrect',
          vi: 'input.isCorrect'
        },
        {
          en: 'input.passed',
          vi: 'input.passed'
        },
        {
          en: 'input.check',
          vi: 'input.check'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'input.validity.valid is true when all constraint criteria (patternMismatch, valueMissing, rangeUnderflow, etc.) evaluate to false.',
        vi: 'input.validity.valid mang giá trị true khi tất cả các tiêu chí lỗi đều không xảy ra.'
      },
      topicId: 'html_form_validation',
      difficulty: 'medium'
    },
    {
      id: 'html_q_11_10',
      type: 'single_choice',
      question: {
        en: 'What attribute prevents the user from modifying the value of an input while still submitting that value with the form?',
        vi: 'Thuộc tính nào ngăn người dùng sửa giá trị trong ô nhập nhưng vẫn gửi giá trị đó lên máy chủ khi submit form?'
      },
      options: [
        {
          en: 'readonly',
          vi: 'readonly'
        },
        {
          en: 'disabled',
          vi: 'disabled'
        },
        {
          en: 'hidden',
          vi: 'hidden'
        },
        {
          en: 'inert',
          vi: 'inert'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'readonly fields cannot be edited but ARE submitted. In contrast, disabled fields are omitted from form payloads.',
        vi: 'Trường readonly không thể sửa nhưng VẪN ĐƯỢC gửi đi khi submit form. Ngược lại, trường disabled bị loại bỏ khỏi dữ liệu gửi đi.'
      },
      topicId: 'html_form_validation',
      difficulty: 'easy'
    }
  ]
};

export default lesson12;
