import { RawLessonSource } from './rawLessonType';

export const lesson11: RawLessonSource = {
  order: 11,
  id: 'html_lesson_11',
  moduleId: 'html_mod_3',
  levelId: 'intermediate',
  topicId: 'html_form_validation',
  titleEn: 'Client-Side Form Validation & Accessible Error Announcement UX',
  titleVi: 'Kiểm Tra Biểu Mẫu Phía Client & Trải Nghiệm Báo Lỗi Chuẩn Trợ Năng',
  summaryEn: 'Master native declarative HTML5 constraint validation: required, pattern regex, min/maxlength, min/max, step, CSS pseudo-classes (:user-invalid), and accessible error messaging with aria-describedby and aria-invalid.',
  summaryVi: 'Làm chủ kiểm tra ràng buộc HTML5 gốc: required, regex pattern, min/maxlength, min/max, step, các pseudo-class CSS (:user-invalid) và liên kết thông báo lỗi chuẩn trợ năng với aria-describedby và aria-invalid.',
  estimatedMinutes: 15,
  introEn: 'Built-in browser form validation gives users instantaneous feedback before submitting to the server, protecting bandwidth while keeping accessibility front and center.',
  introVi: 'Cơ chế kiểm tra form tích hợp sẵn của trình duyệt mang lại phản hồi tức thì cho người dùng trước khi gửi lên máy chủ, tiết kiệm băng thông và tối ưu khả năng tiếp cận.',
  conceptEn: 'HTML5 constraint validation uses declarative attributes: required, pattern="[regex]", minlength/maxlength, min/max, and step. Never rely solely on color to communicate errors. Associate error messages programmatically using aria-describedby="error-id" and set aria-invalid="true" when an input fails validation. Use novalidate on <form> only when taking full control with a custom JavaScript validation workflow. Note that client-side validation is purely for user experience—server-side validation is still mandatory for security.',
  conceptVi: 'Cơ chế kiểm tra ràng buộc của HTML5 dùng các thuộc tính khai báo: required, pattern="[regex]", minlength/maxlength, min/max và step. Không bao giờ chỉ dùng màu sắc để báo lỗi. Hãy liên kết thông báo lỗi bằng thuộc tính aria-describedby="error-id" và gán aria-invalid="true" khi ô nhập bị lỗi. Dùng novalidate trên <form> khi tự xử lý giao diện lỗi bằng JavaScript. Lưu ý rằng validation ở client chỉ phục vụ UX—bắt buộc phải validate ở máy chủ để bảo mật.',
  syntax: '<div>\n  <label for="zip-code">Postal Code (5 digits)</label>\n  <input\n    type="text"\n    id="zip-code"\n    name="zip"\n    required\n    pattern="[0-9]{5}"\n    inputmode="numeric"\n    aria-describedby="zip-hint zip-error"\n    aria-invalid="false">\n  <p id="zip-hint">Format: 5 digits (e.g. 10001)</p>\n  <p id="zip-error" role="alert" style="display:none; color:#dc2626;">Please enter exactly 5 digits.</p>\n</div>',
  ex1TitleEn: 'Username with Regex Pattern, Length Bounds and Live Error Binding',
  ex1TitleVi: 'Tên Người Dùng Với Regex Pattern, Giới Hạn Độ Dài Và Báo Lỗi',
  ex1Code: '<form action="/api/profile" method="POST" style="max-width:380px;">\n  <div style="margin-bottom:16px;">\n    <label for="acc-user" style="display:block; font-weight:600; margin-bottom:4px;">Username</label>\n    <input\n      type="text"\n      id="acc-user"\n      name="username"\n      required\n      minlength="4"\n      maxlength="20"\n      pattern="[a-zA-Z0-9_]+"\n      title="4 to 20 characters: letters, numbers, or underscores only"\n      aria-describedby="user-help"\n      style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:6px;">\n    <p id="user-help" style="font-size:0.875rem; color:#64748b; margin-top:4px;">4–20 characters. Alphanumeric and underscores only.</p>\n  </div>\n  <button type="submit" style="background:#2563eb; color:#fff; padding:10px 16px; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">Save Changes</button>\n</form>',
  ex1ExpEn: 'Combines required, minlength, maxlength, pattern, title (for the native browser tooltip), and aria-describedby for clear instruction.',
  ex1ExpVi: 'Kết hợp required, minlength, maxlength, pattern, title (cho tooltip gốc của trình duyệt) và aria-describedby để hướng dẫn rõ ràng.',
  ex2TitleEn: 'Price Range Input with Numerical Step Constraints',
  ex2TitleVi: 'Ô Nhập Mức Giá Với Ràng Buộc Bước Nhảy Số Học',
  ex2Code: '<div>\n  <label for="bid-amount" style="display:block; font-weight:600; margin-bottom:4px;">Bid Amount (USD)</label>\n  <input\n    type="number"\n    id="bid-amount"\n    name="bid"\n    min="10"\n    max="5000"\n    step="0.50"\n    required\n    aria-describedby="bid-limits"\n    style="padding:8px; border:1px solid #cbd5e1; border-radius:6px;">\n  <span id="bid-limits" style="display:block; font-size:0.875rem; color:#64748b; margin-top:4px;">Min $10.00, Max $5000.00 (in $0.50 increments).</span>\n</div>',
  ex2ExpEn: 'Limits values strictly between 10 and 5000 in multiples of 50 cents.',
  ex2ExpVi: 'Giới hạn giá trị nghiêm ngặt từ 10 đến 5000 theo bội số 50 xu.',
  mistake1En: 'Relying exclusively on client-side HTML validation without server-side validation',
  mistake1Vi: 'Chỉ dựa vào kiểm tra HTML phía client mà bỏ qua kiểm tra phía máy chủ',
  correction1En: 'Client validation is easily bypassed with DevTools or curl. Always re-validate and sanitize all inputs on your backend API.',
  correction1Vi: 'Kiểm tra client rất dễ bị vượt qua bằng DevTools hoặc lệnh curl. Luôn luôn kiểm tra và làm sạch dữ liệu tại backend API.',
  mistake2En: 'Displaying error messages visually without linking them via aria-describedby',
  mistake2Vi: 'Hiển thị thông báo lỗi bằng mắt nhưng không liên kết qua aria-describedby',
  correction2En: 'Screen reader users will not hear error descriptions when focusing on the input unless connected via aria-describedby="error-element-id".',
  correction2Vi: 'Người dùng trình đọc màn hình sẽ không nghe thấy nội dung lỗi khi focus vào ô nhập trừ khi được nối qua aria-describedby="error-element-id".',
  tipEn: 'The CSS :user-invalid pseudo-class only triggers after a user interacts and leaves the field, preventing embarrassing red error borders on pristine, untouched forms.',
  tipVi: 'CSS :user-invalid chỉ kích hoạt sau khi người dùng đã tương tác và rời khỏi ô, giúp tránh hiện tượng viền đỏ báo lỗi hàng loạt khi người dùng vừa mở trang.',
  practiceTaskEn: 'Build a Validated Coupon Code Input',
  practiceTaskVi: 'Xây dựng ô nhập mã giảm giá có kiểm tra ràng buộc',
  practiceInstEn: 'Create an input with <label for="promo-code">Promo Code</label>, <input type="text" id="promo-code" name="promo" required pattern="[A-Z]{3}-[0-9]{3}" aria-describedby="promo-format">, and a helper paragraph <p id="promo-format">Format: ABC-123</p>.',
  practiceInstVi: 'Tạo ô nhập với <label for="promo-code">Promo Code</label>, <input type="text" id="promo-code" name="promo" required pattern="[A-Z]{3}-[0-9]{3}" aria-describedby="promo-format">, và đoạn văn hướng dẫn <p id="promo-format">Format: ABC-123</p>.',
  practiceStarter: '<div>\n  \n</div>',
  practiceSolution: '<div>\n  <label for="promo-code">Promo Code</label>\n  <input type="text" id="promo-code" name="promo" required pattern="[A-Z]{3}-[0-9]{3}" aria-describedby="promo-format">\n  <p id="promo-format">Format: ABC-123</p>\n</div>',
  practicePatterns: ['<label for="promo-code">Promo Code</label>', '<input', 'id="promo-code"', 'name="promo"', 'required', 'pattern="[A-Z]{3}-[0-9]{3}"', 'aria-describedby="promo-format"', '<p id="promo-format">Format: ABC-123</p>'],
  practiceHintEn: 'Set pattern="[A-Z]{3}-[0-9]{3}" and link with aria-describedby="promo-format".',
  practiceHintVi: 'Đặt pattern="[A-Z]{3}-[0-9]{3}" và liên kết bằng aria-describedby="promo-format".',

  exercises: [
    {
      id: 'html_ex_11_1',
      type: 'complete_code',
      titleEn: 'Add Minimum and Maximum Length Constraints',
      titleVi: 'Thêm ràng buộc độ dài tối thiểu và tối đa',
      instEn: 'Add minlength="8" and maxlength="32" to the password input.',
      instVi: 'Thêm minlength="8" và maxlength="32" vào ô nhập mật khẩu.',
      starter: '<div>\n  <label for="pass-field">Password</label>\n  <input type="password" id="pass-field" name="password" required>\n</div>',
      solution: '<div>\n  <label for="pass-field">Password</label>\n  <input type="password" id="pass-field" name="password" required minlength="8" maxlength="32">\n</div>',
      hintEn: 'Add minlength="8" and maxlength="32".',
      hintVi: 'Thêm minlength="8" và maxlength="32".',
      expEn: 'minlength and maxlength enforce character count limits declaratively.',
      expVi: 'minlength và maxlength thiết lập giới hạn số lượng ký tự một cách tường minh.'
    },
    {
      id: 'html_ex_11_2',
      type: 'fix_code',
      titleEn: 'Fix Accessible Error Binding with aria-describedby',
      titleVi: 'Sửa liên kết báo lỗi trợ năng bằng aria-describedby',
      instEn: 'Fix the mismatch so the input\'s aria-describedby points to the exact id of the error element ("phone-err").',
      instVi: 'Sửa lỗi không khớp để thuộc tính aria-describedby của input trỏ đúng tới id của thông báo lỗi ("phone-err").',
      starter: '<div>\n  <label for="user-tel">Phone</label>\n  <input type="tel" id="user-tel" name="phone" aria-describedby="wrong-id">\n  <p id="phone-err" role="alert">Please enter a valid phone number.</p>\n</div>',
      solution: '<div>\n  <label for="user-tel">Phone</label>\n  <input type="tel" id="user-tel" name="phone" aria-describedby="phone-err">\n  <p id="phone-err" role="alert">Please enter a valid phone number.</p>\n</div>',
      hintEn: 'Change aria-describedby to "phone-err".',
      hintVi: 'Đổi aria-describedby thành "phone-err".',
      expEn: 'aria-describedby must match the id of the descriptive error element.',
      expVi: 'aria-describedby bắt buộc phải khớp với id của phần tử thông báo lỗi.'
    },
    {
      id: 'html_ex_11_3',
      type: 'write_code',
      titleEn: 'Create Form with novalidate Attribute for Custom Validation',
      titleVi: 'Tạo form có thuộc tính novalidate để tự xử lý kiểm tra lỗi',
      instEn: 'Write a <form action="/checkout" method="POST" novalidate> containing a submit button.',
      instVi: 'Viết thẻ <form action="/checkout" method="POST" novalidate> chứa nút submit.',
      starter: '',
      solution: '<form action="/checkout" method="POST" novalidate>\n  <button type="submit">Place Order</button>\n</form>',
      hintEn: 'Add novalidate to the <form> element.',
      hintVi: 'Thêm novalidate vào thẻ <form>.',
      expEn: 'novalidate suppresses native browser bubble popups, allowing custom JavaScript error UX.',
      expVi: 'novalidate tắt bóng bóng báo lỗi mặc định của trình duyệt để chạy giao diện báo lỗi tùy biến.'
    },
    {
      id: 'html_ex_11_4',
      type: 'modify_example',
      titleEn: 'Add Regex Pattern for Hexadecimal Color Code',
      titleVi: 'Thêm regex pattern cho mã màu Hex',
      instEn: 'Add pattern="#[0-9a-fA-F]{6}" and title="6-digit hex code starting with #" to the input.',
      instVi: 'Thêm pattern="#[0-9a-fA-F]{6}" và title="6-digit hex code starting with #" vào ô nhập.',
      starter: '<label for="hex-val">Hex Color</label>\n<input type="text" id="hex-val" name="color">',
      solution: '<label for="hex-val">Hex Color</label>\n<input type="text" id="hex-val" name="color" pattern="#[0-9a-fA-F]{6}" title="6-digit hex code starting with #">',
      hintEn: 'Add pattern and title attributes to the input.',
      hintVi: 'Thêm thuộc tính pattern và title vào input.',
      expEn: 'The pattern attribute evaluates against a regular expression upon form submission.',
      expVi: 'Thuộc tính pattern đối chiếu dữ liệu với biểu thức chính quy regex khi submit form.'
    },
    {
      id: 'html_ex_11_5',
      type: 'predict_output',
      titleEn: 'Evaluate Validity of Number with Step Mismatch',
      titleVi: 'Đánh giá tính hợp lệ của số khi không khớp bước nhảy step',
      instEn: 'If an input has min="0" step="5" and the user enters "12", will it pass native HTML validation (yes/no)?',
      instVi: 'Nếu ô nhập có min="0" step="5" và người dùng nhập "12", nó có vượt qua kiểm tra HTML không (yes/no)?',
      starter: '<!-- Type yes or no -->\n<p>Valid: </p>',
      solution: '<p>Valid: no</p>',
      hintEn: '12 is not divisible by the step interval 5.',
      hintVi: '12 không chia hết cho khoảng bước nhảy 5.',
      expEn: 'Step mismatch causes validity.stepMismatch to evaluate to true, blocking form submission.',
      expVi: 'Không khớp bước nhảy làm cho stepMismatch bị lỗi và chặn việc gửi form.'
    }
  ],

  challenge: {
    id: 'html_ch_11',
    titleEn: 'Enterprise Security Password & Credit Card Validation Matrix',
    titleVi: 'Biểu mẫu xác thực bảo mật mật khẩu & thẻ tín dụng chuẩn doanh nghiệp',
    descEn: 'Build a secure checkout payment form complete with Regex patterns, length limits, assistive hints, and accessible aria error relationships.',
    descVi: 'Xây dựng biểu mẫu thanh toán bảo mật hoàn chỉnh với biểu thức chính quy Regex, giới hạn độ dài, chỉ dẫn trợ năng và liên kết lỗi aria.',
    requirements: [
      { en: 'Form with action="/api/pay" method="POST"', vi: 'Form có action="/api/pay" method="POST"' },
      { en: 'Card Number: <input type="text" id="card-num" name="card" required pattern="[0-9]{16}" inputmode="numeric" maxlength="16" aria-describedby="card-hint">', vi: 'Số thẻ: <input type="text" id="card-num" name="card" required pattern="[0-9]{16}" inputmode="numeric" maxlength="16" aria-describedby="card-hint">' },
      { en: 'Expiry Date: <input type="text" id="card-exp" name="exp" required pattern="(0[1-9]|1[0-2])\\/[0-9]{2}" placeholder="MM/YY" aria-describedby="exp-hint">', vi: 'Hạn dùng: <input type="text" id="card-exp" name="exp" required pattern="(0[1-9]|1[0-2])\\/[0-9]{2}" placeholder="MM/YY" aria-describedby="exp-hint">' },
      { en: 'CVV Security Code: <input type="password" id="card-cvv" name="cvv" required pattern="[0-9]{3,4}" maxlength="4" inputmode="numeric" aria-describedby="cvv-hint">', vi: 'Mã CVV: <input type="password" id="card-cvv" name="cvv" required pattern="[0-9]{3,4}" maxlength="4" inputmode="numeric" aria-describedby="cvv-hint">' },
      { en: 'Clear hint descriptions with corresponding matching IDs for all 3 fields', vi: 'Đoạn văn hướng dẫn rõ ràng với các id tương ứng khớp cho cả 3 trường' },
      { en: 'Submit button with <button type="submit">Authorize Payment</button>', vi: 'Nút gửi <button type="submit">Authorize Payment</button>' }
    ],
    starter: '<!-- Build secure card validation form here -->\n',
    solution: '<form action="/api/pay" method="POST">\n  <div>\n    <label for="card-num">Card Number</label>\n    <input type="text" id="card-num" name="card" required pattern="[0-9]{16}" inputmode="numeric" maxlength="16" aria-describedby="card-hint">\n    <p id="card-hint">Enter 16 digits without spaces or dashes.</p>\n  </div>\n\n  <div>\n    <label for="card-exp">Expiration Date</label>\n    <input type="text" id="card-exp" name="exp" required pattern="(0[1-9]|1[0-2])\\/[0-9]{2}" placeholder="MM/YY" aria-describedby="exp-hint">\n    <p id="exp-hint">Format: MM/YY (e.g. 08/28)</p>\n  </div>\n\n  <div>\n    <label for="card-cvv">Security Code (CVV)</label>\n    <input type="password" id="card-cvv" name="cvv" required pattern="[0-9]{3,4}" maxlength="4" inputmode="numeric" aria-describedby="cvv-hint">\n    <p id="cvv-hint">3 or 4 digits on back of card.</p>\n  </div>\n\n  <button type="submit">Authorize Payment</button>\n</form>',
    hints: [
      { en: 'Ensure all pattern regexes and aria-describedby mappings match precisely', vi: 'Đảm bảo tất cả regex pattern và ánh xạ aria-describedby đều chính xác' },
      { en: 'Use inputmode="numeric" to trigger mobile keypad optimization', vi: 'Dùng inputmode="numeric" để bật bàn phím số trên thiết bị di động' }
    ],
    expEn: 'Fully accessible, pattern-enforced payment form conforming to WCAG Level AA guidelines.',
    expVi: 'Biểu mẫu thanh toán hoàn hảo chuẩn trợ năng WCAG AA và ràng buộc Regex chặt chẽ.'
  },

  challengeVariants: [
    {
      id: 'html_ch_11_v1',
      titleEn: 'Variant 1: Enterprise Password Strength Policy Form',
      titleVi: 'Biến thể 1: Biểu mẫu chính sách độ mạnh mật khẩu doanh nghiệp',
      descEn: 'Build a new password creation form with minlength 12 and pattern requiring uppercase, lowercase, and numbers.',
      descVi: 'Xây dựng form tạo mật khẩu mới với minlength 12 và pattern bắt buộc có chữ hoa, thường và số.',
      requirements: [
        { en: 'minlength="12" maxlength="64"', vi: 'minlength="12" maxlength="64"' },
        { en: 'pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{12,}"', vi: 'pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{12,}"' },
        { en: 'aria-describedby="pwd-rules"', vi: 'aria-describedby="pwd-rules"' }
      ],
      starter: '<form action="/api/password" method="POST">\n  \n</form>',
      solution: '<form action="/api/password" method="POST">\n  <div>\n    <label for="new-pwd">New Password</label>\n    <input type="password" id="new-pwd" name="password" required minlength="12" maxlength="64" pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{12,}" aria-describedby="pwd-rules" autocomplete="new-password">\n    <ul id="pwd-rules">\n      <li>At least 12 characters</li>\n      <li>At least one uppercase and one lowercase letter</li>\n      <li>At least one numeric digit</li>\n    </ul>\n  </div>\n  <button type="submit">Update Password</button>\n</form>',
      expEn: 'Regex lookaheads enforce multi-rule password complexity natively in the browser.',
      expVi: 'Lookahead trong Regex giúp kiểm tra độ phức tạp của mật khẩu nhiều tiêu chí ngay trên trình duyệt.'
    },
    {
      id: 'html_ch_11_v2',
      titleEn: 'Variant 2: Flight Seat Quantity and Weight Constraint Form',
      titleVi: 'Biến thể 2: Ràng buộc số lượng ghế và trọng lượng hành lý',
      descEn: 'Build an airline booking constraint form with number bounds and step increments.',
      descVi: 'Xây dựng form đặt vé máy bay có giới hạn số lượng và bước nhảy trọng lượng hành lý.',
      requirements: [
        { en: 'Passengers: <input type="number" id="pax" name="passengers" min="1" max="9" value="1" required>', vi: 'Hành khách: <input type="number" id="pax" name="passengers" min="1" max="9" value="1" required>' },
        { en: 'Baggage Weight: <input type="number" id="bag" name="weight" min="0" max="32" step="0.5" value="20" required>', vi: 'Trọng lượng: <input type="number" id="bag" name="weight" min="0" max="32" step="0.5" value="20" required>' }
      ],
      starter: '<form>\n  \n</form>',
      solution: '<form action="/api/flights/book" method="POST">\n  <div>\n    <label for="pax">Passenger Count (1-9)</label>\n    <input type="number" id="pax" name="passengers" min="1" max="9" value="1" required>\n  </div>\n  <div>\n    <label for="bag">Checked Baggage Weight (kg)</label>\n    <input type="number" id="bag" name="weight" min="0" max="32" step="0.5" value="20" required aria-describedby="bag-max">\n    <p id="bag-max">Maximum 32.0 kg per passenger in 0.5 kg increments.</p>\n  </div>\n  <button type="submit">Confirm Flight</button>\n</form>',
      expEn: 'min, max, and step enforce business rules directly on the client side.',
      expVi: 'min, max và step áp dụng trực tiếp các quy tắc nghiệp vụ ngay tại phía client.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_11_1',
      type: 'single_choice',
      qEn: 'What does the "pattern" attribute on an <input> do?',
      qVi: 'Thuộc tính "pattern" trên ô <input> có tác dụng gì?',
      options: [
        { en: 'Specifies a regular expression (regex) that the input\'s value must match before the form can be submitted', vi: 'Chỉ định một biểu thức chính quy (regex) mà giá trị nhập vào bắt buộc phải khớp trước khi có thể gửi form' },
        { en: 'Applies a decorative CSS background pattern', vi: 'Áp dụng họa tiết hình nền CSS' },
        { en: 'Changes the font family to Courier', vi: 'Đổi phông chữ thành Courier' },
        { en: 'Repeats the input 5 times', vi: 'Lặp lại ô nhập 5 lần' }
      ],
      ans: 0,
      expEn: 'pattern tests the field\'s value against a compiled JavaScript regular expression.',
      expVi: 'pattern kiểm tra giá trị của trường đối chiếu với biểu thức chính quy regex.'
    },
    {
      id: 'html_q_11_2',
      type: 'single_choice',
      qEn: 'What is the role of aria-describedby="msg-id" in form accessibility?',
      qVi: 'Vai trò của aria-describedby="msg-id" trong tính trợ năng biểu mẫu là gì?',
      options: [
        { en: 'Programmatically links helper instructions or error messages to the input so screen readers read them automatically when the user focuses the field', vi: 'Liên kết hướng dẫn trợ giúp hoặc thông báo lỗi với ô nhập để trình đọc màn hình tự động đọc khi người dùng focus vào trường đó' },
        { en: 'Translates the input into Spanish', vi: 'Dịch ô nhập sang tiếng Tây Ban Nha' },
        { en: 'Converts the form to an ARIA audio file', vi: 'Chuyển form thành file âm thanh' },
        { en: 'Hides the input on tablet devices', vi: 'Ẩn ô nhập trên máy tính bảng' }
      ],
      ans: 0,
      expEn: 'aria-describedby provides accessible descriptions for assistive technology.',
      expVi: 'aria-describedby cung cấp mô tả chi tiết cho công nghệ trợ thính.'
    },
    {
      id: 'html_q_11_3',
      type: 'single_choice',
      qEn: 'When should aria-invalid="true" be added to a form input?',
      qVi: 'Khi nào nên gắn thuộc tính aria-invalid="true" vào một ô nhập trong form?',
      options: [
        { en: 'When the entered value fails validation criteria, alerting screen readers that the current input has an error', vi: 'Khi giá trị nhập vào không đạt tiêu chuẩn kiểm tra, thông báo cho trình đọc màn hình biết ô nhập đang bị lỗi' },
        { en: 'On all inputs before the user touches them', vi: 'Trên mọi ô nhập trước khi người dùng chạm vào' },
        { en: 'Only when the internet disconnects', vi: 'Chỉ khi bị mất kết nối internet' },
        { en: 'On hidden inputs only', vi: 'Chỉ trên các ô input hidden' }
      ],
      ans: 0,
      expEn: 'aria-invalid communicates the error state of the control to assistive software.',
      expVi: 'aria-invalid thông báo trạng thái lỗi của điều khiển cho các phần mềm trợ năng.'
    },
    {
      id: 'html_q_11_4',
      type: 'single_choice',
      qEn: 'What does the "novalidate" boolean attribute on a <form> do?',
      qVi: 'Thuộc tính boolean "novalidate" trên thẻ <form> có chức năng gì?',
      options: [
        { en: 'Disables the browser\'s native constraint validation popups, allowing developers to handle validation entirely via custom JavaScript and ARIA', vi: 'Tắt các bóng bóng thông báo lỗi mặc định của trình duyệt, cho phép lập trình viên tự xử lý kiểm tra lỗi bằng JavaScript và ARIA' },
        { en: 'Allows SQL injection attacks', vi: 'Cho phép tấn công SQL injection' },
        { en: 'Deletes all form inputs', vi: 'Xóa toàn bộ các ô nhập của form' },
        { en: 'Submits the form even if the server is offline', vi: 'Gửi form ngay cả khi máy chủ ngoại tuyến' }
      ],
      ans: 0,
      expEn: 'novalidate suppresses browser default validation tooltips.',
      expVi: 'novalidate chặn hiển thị bong bóng báo lỗi mặc định của trình duyệt.'
    },
    {
      id: 'html_q_11_5',
      type: 'single_choice',
      qEn: 'What is the primary difference between CSS :invalid and :user-invalid pseudo-classes?',
      qVi: 'Sự khác biệt quan trọng giữa hai pseudo-class CSS :invalid và :user-invalid là gì?',
      options: [
        { en: ':invalid matches immediately on page load (even for untouched required fields), while :user-invalid only matches AFTER the user has interacted with and left the field', vi: ':invalid khớp ngay lập tức khi vừa mở trang (ngay cả ô required chưa chạm tới), còn :user-invalid chỉ khớp SAU KHI người dùng đã tương tác và rời khỏi ô' },
        { en: ':user-invalid is only for mobile apps', vi: ':user-invalid chỉ dành cho ứng dụng di động' },
        { en: ':invalid was removed in HTML5', vi: ':invalid đã bị xóa trong HTML5' },
        { en: ':user-invalid requires a paid license', vi: ':user-invalid yêu cầu trả phí bản quyền' }
      ],
      ans: 0,
      expEn: ':user-invalid prevents premature error styling on untouched form fields.',
      expVi: ':user-invalid ngăn chặn việc hiển thị màu đỏ báo lỗi quá sớm khi người dùng chưa kịp điền.'
    },
    {
      id: 'html_q_11_6',
      type: 'single_choice',
      qEn: 'What happens if a user submits a form where an input with minlength="6" only contains 3 characters?',
      qVi: 'Điều gì xảy ra nếu người dùng gửi form trong đó ô nhập có minlength="6" nhưng mới chỉ gõ 3 ký tự?',
      options: [
        { en: 'The browser blocks form submission, focuses the field, and displays a native constraint validation message', vi: 'Trình duyệt chặn việc gửi form, tự động focus vào ô đó và hiển thị thông báo lỗi ràng buộc' },
        { en: 'The browser pads the string with spaces to reach 6 characters', vi: 'Trình duyệt tự chèn thêm dấu cách cho đủ 6 ký tự' },
        { en: 'The form submits normally without warning', vi: 'Form vẫn gửi bình thường không có cảnh báo' },
        { en: 'The page redirects to 404', vi: 'Trang chuyển hướng sang lỗi 404' }
      ],
      ans: 0,
      expEn: 'Violation of minlength triggers a tooShort validation error and blocks submission.',
      expVi: 'Vi phạm minlength gây ra lỗi tooShort và chặn submit form.'
    },
    {
      id: 'html_q_11_7',
      type: 'single_choice',
      qEn: 'Why is it dangerous to rely ONLY on client-side HTML5 validation for data security?',
      qVi: 'Tại sao việc CHỈ dựa vào kiểm tra HTML5 ở phía client lại cực kỳ nguy hiểm cho bảo mật dữ liệu?',
      options: [
        { en: 'Because any user can easily bypass client HTML validation by modifying DOM attributes in DevTools or sending raw HTTP requests via curl or Postman', vi: 'Vì bất kỳ ai cũng có thể dễ dàng vượt qua kiểm tra ở client bằng cách sửa DOM trong DevTools hoặc gửi request HTTP trực tiếp qua curl hay Postman' },
        { en: 'Because HTML5 validation only works on Fridays', vi: 'Vì kiểm tra HTML5 chỉ chạy vào thứ Sáu' },
        { en: 'Because client validation slows down the CPU', vi: 'Vì kiểm tra client làm chậm CPU' },
        { en: 'Because mobile phones don\'t support HTML', vi: 'Vì điện thoại không hỗ trợ HTML' }
      ],
      ans: 0,
      expEn: 'Never trust client input; backend validation is essential for application security.',
      expVi: 'Tuyệt đối không tin tưởng dữ liệu client; kiểm tra ở backend là bắt buộc để đảm bảo an toàn.'
    },
    {
      id: 'html_q_11_8',
      type: 'single_choice',
      qEn: 'What does the "title" attribute do when used alongside a "pattern" attribute on an <input>?',
      qVi: 'Thuộc tính "title" làm gì khi được dùng kèm với thuộc tính "pattern" trên thẻ <input>?',
      options: [
        { en: 'Its text is included in the browser\'s native validation error tooltip to explain the required format to the user', vi: 'Nội dung chữ của nó được hiển thị trong bong bóng báo lỗi của trình duyệt để giải thích cho người dùng định dạng hợp lệ' },
        { en: 'It changes the document tab title', vi: 'Nó thay đổi tiêu đề tab tài liệu' },
        { en: 'It makes the regex case-insensitive', vi: 'Nó làm cho regex không phân biệt chữ hoa thường' },
        { en: 'It encrypts the regex string', vi: 'Nó mã hóa chuỗi regex' }
      ],
      ans: 0,
      expEn: 'The title attribute text is displayed in native pattern mismatch validation bubbles.',
      expVi: 'Nội dung thuộc tính title được hiển thị trong bong bóng báo lỗi khi sai định dạng pattern.'
    },
    {
      id: 'html_q_11_9',
      type: 'single_choice',
      qEn: 'What JavaScript method can you call on an <input> element to check if it satisfies all HTML constraint validation rules?',
      qVi: 'Phương thức JavaScript nào có thể gọi trên <input> để kiểm tra xem nó có thỏa mãn toàn bộ luật ràng buộc HTML không?',
      options: [
        { en: 'inputElement.checkValidity() (or reportValidity())', vi: 'inputElement.checkValidity() (hoặc reportValidity())' },
        { en: 'inputElement.isOkay()', vi: 'inputElement.isOkay()' },
        { en: 'inputElement.validateNow()', vi: 'inputElement.validateNow()' },
        { en: 'inputElement.verifyConstraint()', vi: 'inputElement.verifyConstraint()' }
      ],
      ans: 0,
      expEn: 'checkValidity() returns a boolean indicating whether the element satisfies its constraints.',
      expVi: 'checkValidity() trả về true/false cho biết phần tử có thỏa mãn các ràng buộc hay không.'
    },
    {
      id: 'html_q_11_10',
      type: 'single_choice',
      qEn: 'What does inputElement.setCustomValidity("Custom error text") do in JavaScript?',
      qVi: 'Lệnh inputElement.setCustomValidity("Custom error text") làm gì trong JavaScript?',
      options: [
        { en: 'Marks the input as invalid with a custom error message; setting it to an empty string ("") marks the input valid again', vi: 'Đánh dấu ô nhập là không hợp lệ với thông báo lỗi tự chọn; đặt thành chuỗi rỗng ("") sẽ đánh dấu ô nhập hợp lệ trở lại' },
        { en: 'Permanently disables the input', vi: 'Vô hiệu hóa vĩnh viễn ô nhập' },
        { en: 'Submits the form immediately', vi: 'Gửi form đi ngay lập tức' },
        { en: 'Changes the input font color', vi: 'Đổi màu chữ ô nhập' }
      ],
      ans: 0,
      expEn: 'setCustomValidity controls the customError flag in the element\'s ValidityState.',
      expVi: 'setCustomValidity điều khiển cờ customError trong đối tượng ValidityState của phần tử.'
    },
    {
      id: 'html_q_11_11',
      type: 'single_choice',
      qEn: 'What ARIA role should be placed on a dynamically injected form error alert box?',
      qVi: 'Thuộc tính ARIA role nào nên đặt trên hộp thông báo lỗi form được tạo động?',
      options: [
        { en: 'role="alert" (or aria-live="assertive")', vi: 'role="alert" (hoặc aria-live="assertive")' },
        { en: 'role="banner"', vi: 'role="banner"' },
        { en: 'role="navigation"', vi: 'role="navigation"' },
        { en: 'role="complementary"', vi: 'role="complementary"' }
      ],
      ans: 0,
      expEn: 'role="alert" immediately interrupts screen readers to announce urgent error messages.',
      expVi: 'role="alert" ngắt lời trình đọc màn hình để phát ngay thông báo lỗi khẩn cấp.'
    },
    {
      id: 'html_q_11_12',
      type: 'single_choice',
      qEn: 'What does the "inputmode" attribute (e.g. inputmode="decimal") do on mobile devices?',
      qVi: 'Thuộc tính "inputmode" (như inputmode="decimal") làm gì trên thiết bị di động?',
      options: [
        { en: 'Instructs virtual on-screen keyboards to display a specific optimized layout (numbers with decimal point) without altering the input type', vi: 'Chỉ định bàn phím ảo hiển thị bố cục tối ưu tương ứng (bàn phím số có dấu chấm thập phân) mà không làm đổi type của input' },
        { en: 'Calculates math formulas automatically', vi: 'Tự động tính toán công thức toán' },
        { en: 'Translates spoken speech into numbers', vi: 'Dịch giọng nói thành số' },
        { en: 'Forces font size to 24px', vi: 'Ép cỡ chữ thành 24px' }
      ],
      ans: 0,
      expEn: 'inputmode adjusts virtual keyboard layouts without changing element validation semantics.',
      expVi: 'inputmode điều chỉnh bố cục bàn phím ảo mà không làm thay đổi ngữ nghĩa kiểm tra của phần tử.'
    },
    {
      id: 'html_q_11_13',
      type: 'single_choice',
      qEn: 'Why should error indicators never rely solely on a red border color?',
      qVi: 'Tại sao các dấu hiệu báo lỗi không bao giờ được chỉ dựa vào mỗi viền màu đỏ?',
      options: [
        { en: 'Color-blind users (e.g., protanopia) and screen readers cannot perceive color alone; explicit text descriptions and icons are required by WCAG', vi: 'Người mù màu và trình đọc màn hình không thể phân biệt nếu chỉ có màu sắc; chuẩn WCAG bắt buộc phải có văn bản mô tả rõ ràng và biểu tượng' },
        { en: 'Red is copyrighted by Adobe', vi: 'Màu đỏ đã bị Adobe đăng ký bản quyền' },
        { en: 'Red CSS styles slow down browser rendering', vi: 'Màu đỏ làm chậm tốc độ hiển thị của trình duyệt' },
        { en: 'Printers cannot print the color red', vi: 'Máy in không in được màu đỏ' }
      ],
      ans: 0,
      expEn: 'WCAG Guideline 1.4.1 mandates that color is not used as the only visual means of conveying information.',
      expVi: 'Tiêu chuẩn WCAG 1.4.1 quy định không được dùng màu sắc làm phương tiện duy nhất để truyền tải thông tin.'
    },
    {
      id: 'html_q_11_14',
      type: 'single_choice',
      qEn: 'What does the "formnovalidate" attribute on a <button type="submit"> do?',
      qVi: 'Thuộc tính "formnovalidate" trên thẻ <button type="submit"> có tác dụng gì?',
      options: [
        { en: 'Submits the form immediately bypassing all validation rules (ideal for "Save Draft" buttons)', vi: 'Gửi form đi ngay lập tức bỏ qua toàn bộ luật kiểm tra (cực kỳ lý tưởng cho nút "Lưu nháp")' },
        { en: 'Deletes the user\'s input values', vi: 'Xóa toàn bộ giá trị người dùng vừa nhập' },
        { en: 'Closes the browser tab', vi: 'Đóng tab trình duyệt' },
        { en: 'Turns off HTTPS encryption for that request', vi: 'Tắt mã hóa HTTPS cho request đó' }
      ],
      ans: 0,
      expEn: 'formnovalidate overrides form-level validation for specific submission buttons.',
      expVi: 'formnovalidate ghi đè cơ chế kiểm tra lỗi của form cho riêng nút submit đó.'
    },
    {
      id: 'html_q_11_15',
      type: 'single_choice',
      qEn: 'What happens when a form submission fails browser constraint validation?',
      qVi: 'Điều gì xảy ra khi việc gửi form không vượt qua được kiểm tra ràng buộc của trình duyệt?',
      options: [
        { en: 'The submit event is cancelled, the first invalid form control is automatically focused, and a validation bubble appears', vi: 'Sự kiện submit bị hủy, trường không hợp lệ đầu tiên tự động được focus và bóng bóng thông báo lỗi hiện lên' },
        { en: 'The browser restarts', vi: 'Trình duyệt khởi động lại' },
        { en: 'The form sends an HTTP 500 error to the server', vi: 'Form gửi lỗi HTTP 500 lên server' },
        { en: 'The page contents are replaced with a blank document', vi: 'Nội dung trang bị thay bằng tài liệu trắng' }
      ],
      ans: 0,
      expEn: 'Browsers abort submission and navigate focus to the first invalid field.',
      expVi: 'Trình duyệt hủy gửi dữ liệu và chuyển con trỏ chuột focus tới trường lỗi đầu tiên.'
    },
    {
      id: 'html_q_11_16',
      type: 'single_choice',
      qEn: 'Which ValidityState property is true when an <input type="email"> contains "not-an-email"?',
      qVi: 'Thuộc tính nào trong đối tượng ValidityState sẽ mang giá trị true khi <input type="email"> chứa chữ "not-an-email"?',
      options: [
        { en: 'typeMismatch', vi: 'typeMismatch' },
        { en: 'valueMissing', vi: 'valueMissing' },
        { en: 'rangeUnderflow', vi: 'rangeUnderflow' },
        { en: 'tooLong', vi: 'tooLong' }
      ],
      ans: 0,
      expEn: 'validity.typeMismatch is true when input syntax does not conform to the specified type (e.g. email, url).',
      expVi: 'validity.typeMismatch là true khi cú pháp nhập không đúng với kiểu được chỉ định (như email, url).'
    }
  ]
};

console.log('Lesson 11 defined.');
