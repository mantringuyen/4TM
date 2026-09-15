import { RawLessonSource } from './rawLessonType';

export const lesson9: RawLessonSource = {
  order: 9,
  id: 'html_lesson_9',
  moduleId: 'html_mod_3',
  levelId: 'intermediate',
  topicId: 'html_forms_basics',
  titleEn: 'Form Fundamentals: <form>, Explicit <label>, Standard Inputs & Action/Method',
  titleVi: 'Nền Tảng Biểu Mẫu: <form>, Thẻ <label> Tường Minh, Ô Nhập Liệu & Action/Method',
  summaryEn: 'Master core form construction: <form action method>, explicit <label for="id"> pairing, essential input types (text, email, password, number, checkbox, radio), and submit buttons.',
  summaryVi: 'Làm chủ cấu trúc form cốt lõi: <form action method>, ghép nối <label for="id"> tường minh, các kiểu input cơ bản (text, email, password, number, checkbox, radio) và nút gửi submit.',
  estimatedMinutes: 15,
  introEn: 'Forms are the primary interactive communication channel between users and web applications, enabling user authentication, search queries, payment checkout, and content submission.',
  introVi: 'Biểu mẫu (Forms) là kênh giao tiếp tương tác cốt lõi giữa người dùng và ứng dụng web, phục vụ đăng nhập, tìm kiếm, thanh toán và gửi dữ liệu lên máy chủ.',
  conceptEn: 'A form is established with <form action="/api/endpoint" method="POST|GET">. Every interactive input MUST be paired with an explicit <label for="input-id"> element—this provides accessible names for screen readers and expands the clickable hit target. Group related radio buttons under the exact same "name" attribute so only one can be selected at a time.',
  conceptVi: 'Form được khai báo bằng <form action="/api/endpoint" method="POST|GET">. Mọi ô nhập liệu BẮT BUỘC phải ghép đôi với một thẻ <label for="input-id"> tường minh—giúp trình đọc màn hình đọc tên trường và mở rộng diện tích bấm cho người dùng. Gom nhóm các nút radio bằng cùng một thuộc tính "name" để người dùng chỉ chọn được 1 lựa chọn duy nhất tại một thời điểm.',
  syntax: '<form action="/submit" method="POST">\n  <div>\n    <label for="user-email">Email Address</label>\n    <input type="email" id="user-email" name="email" required autocomplete="email">\n  </div>\n  <button type="submit">Log In</button>\n</form>',
  ex1TitleEn: 'Accessible Login Form with Explicit Labels and Autocomplete',
  ex1TitleVi: 'Biểu Mẫu Đăng Nhập Chuẩn Trợ Năng Với Label Và Autocomplete',
  ex1Code: '<form action="/api/login" method="POST" style="max-width:360px; display:flex; flex-direction:column; gap:16px;">\n  <div>\n    <label for="login-email" style="display:block; font-weight:600; margin-bottom:4px;">Email</label>\n    <input type="email" id="login-email" name="email" required autocomplete="email" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:6px;">\n  </div>\n  <div>\n    <label for="login-pass" style="display:block; font-weight:600; margin-bottom:4px;">Password</label>\n    <input type="password" id="login-pass" name="password" required autocomplete="current-password" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:6px;">\n  </div>\n  <button type="submit" style="background:#2563eb; color:#fff; padding:10px; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">Sign In</button>\n</form>',
  ex1ExpEn: 'Demonstrates for/id associations, required constraint, autocomplete tokens, and semantic submit button.',
  ex1ExpVi: 'Minh họa liên kết for/id, ràng buộc required, gợi ý tự động autocomplete và nút gửi dữ liệu chuẩn submit.',
  ex2TitleEn: 'Radio Group and Checkbox with Shared Names',
  ex2TitleVi: 'Nhóm Nút Radio Và Hộp Chọn Checkbox Dùng Chung Tên',
  ex2Code: '<div>\n  <p style="font-weight:600; margin-bottom:8px;">Select Subscription Plan:</p>\n  <div>\n    <input type="radio" id="plan-monthly" name="subscription_plan" value="monthly" checked>\n    <label for="plan-monthly">Monthly ($15/mo)</label>\n  </div>\n  <div>\n    <input type="radio" id="plan-annual" name="subscription_plan" value="annual">\n    <label for="plan-annual">Annual ($120/yr - Save 33%)</label>\n  </div>\n  <div style="margin-top:12px;">\n    <input type="checkbox" id="terms-agree" name="agree_terms" required>\n    <label for="terms-agree">I agree to the Terms of Service</label>\n  </div>\n</div>',
  ex2ExpEn: 'Radio inputs with the same name allow mutually exclusive single selection; clicking the label text activates the control.',
  ex2ExpVi: 'Các nút radio có cùng thuộc tính name cho phép chọn 1 trong nhiều; nhấp vào chữ label sẽ kích hoạt ô chọn.',
  mistake1En: 'Using placeholder text as a substitute for a visible <label>',
  mistake1Vi: 'Dùng văn bản placeholder thay thế cho thẻ <label> hiển thị',
  correction1En: 'Placeholders vanish when the user starts typing and have poor color contrast. Always provide a permanent, visible <label>.',
  correction1Vi: 'Placeholder biến mất khi người dùng gõ phím và có độ tương phản kém. Luôn luôn dùng thẻ <label> cố định nhìn thấy được.',
  mistake2En: 'Failing to give radio buttons in the same question the exact same "name" attribute',
  mistake2Vi: 'Đặt tên thuộc tính "name" khác nhau cho các nút radio trong cùng một câu hỏi',
  correction2En: 'Radio buttons only operate as a mutually exclusive single-choice set when they share identical name values.',
  correction2Vi: 'Các nút radio chỉ hoạt động loại trừ lẫn nhau (chọn 1) khi chúng có cùng giá trị thuộc tính name.',
  tipEn: 'Setting type="button" on non-submitting buttons is crucial inside a form; otherwise, browsers default any button to type="submit" and trigger unexpected form submission on click.',
  tipVi: 'Đặt type="button" cho các nút phụ bên trong form là rất quan trọng; nếu không, trình duyệt mặc định mọi button là type="submit" và tự động gửi form.',
  practiceTaskEn: 'Construct an Accessible Registration Form',
  practiceTaskVi: 'Xây dựng biểu mẫu đăng ký chuẩn trợ năng',
  practiceInstEn: 'Create a <form action="/register" method="POST"> containing an input for username (<label for="reg-user">Username</label> and <input type="text" id="reg-user" name="username" required>) and a submit button <button type="submit">Register</button>.',
  practiceInstVi: 'Tạo thẻ <form action="/register" method="POST"> chứa ô nhập username (<label for="reg-user">Username</label> và <input type="text" id="reg-user" name="username" required>) cùng nút <button type="submit">Register</button>.',
  practiceStarter: '<form>\n  \n</form>',
  practiceSolution: '<form action="/register" method="POST">\n  <div>\n    <label for="reg-user">Username</label>\n    <input type="text" id="reg-user" name="username" required>\n  </div>\n  <button type="submit">Register</button>\n</form>',
  practicePatterns: ['<form', 'action="/register"', 'method="POST"', 'for="reg-user"', 'id="reg-user"', 'name="username"', 'required', '<button type="submit">Register</button>', '</form>'],
  practiceHintEn: 'Pair <label for="reg-user"> with <input id="reg-user" name="username" required>.',
  practiceHintVi: 'Ghép đôi <label for="reg-user"> với <input id="reg-user" name="username" required>.',

  exercises: [
    {
      id: 'html_ex_9_1',
      type: 'complete_code',
      titleEn: 'Connect Label to Number Input with for/id',
      titleVi: 'Kết nối thẻ label với ô nhập số bằng for/id',
      instEn: 'Add for="item-qty" to the <label> and id="item-qty" to the <input type="number">.',
      instVi: 'Thêm for="item-qty" vào <label> và id="item-qty" vào <input type="number">.',
      starter: '<div>\n  <label>Quantity</label>\n  <input type="number" name="quantity" min="1" max="100">\n</div>',
      solution: '<div>\n  <label for="item-qty">Quantity</label>\n  <input type="number" id="item-qty" name="quantity" min="1" max="100">\n</div>',
      hintEn: 'Add for="item-qty" and id="item-qty".',
      hintVi: 'Thêm for="item-qty" và id="item-qty".',
      expEn: 'Explicit for/id linkage provides programmatic accessibility association.',
      expVi: 'Liên kết for/id tạo mối quan hệ tiếp cận chuẩn cho các thiết bị trợ thính.'
    },
    {
      id: 'html_ex_9_2',
      type: 'fix_code',
      titleEn: 'Fix Radio Buttons Selection Mutex',
      titleVi: 'Sửa lỗi chọn nhiều nút radio cùng lúc',
      instEn: 'Fix the radio inputs by giving them the exact same name="payment_method".',
      instVi: 'Sửa các ô chọn radio bằng cách gán cùng một thuộc tính name="payment_method".',
      starter: '<div>\n  <input type="radio" id="pay-card" name="pay1" value="card">\n  <label for="pay-card">Card</label>\n  <input type="radio" id="pay-paypal" name="pay2" value="paypal">\n  <label for="pay-paypal">PayPal</label>\n</div>',
      solution: '<div>\n  <input type="radio" id="pay-card" name="payment_method" value="card">\n  <label for="pay-card">Card</label>\n  <input type="radio" id="pay-paypal" name="payment_method" value="paypal">\n  <label for="pay-paypal">PayPal</label>\n</div>',
      hintEn: 'Change both name attributes to "payment_method".',
      hintVi: 'Đổi cả hai thuộc tính name thành "payment_method".',
      expEn: 'Radio buttons must share the same name attribute to form a mutually exclusive group.',
      expVi: 'Nút radio bắt buộc phải dùng chung thuộc tính name để tạo thành 1 nhóm chọn 1.'
    },
    {
      id: 'html_ex_9_3',
      type: 'write_code',
      titleEn: 'Create Search Form with GET Method',
      titleVi: 'Tạo form tìm kiếm với phương thức GET',
      instEn: 'Write a <form action="/search" method="GET"> containing <label for="search-box">Search</label>, <input type="search" id="search-box" name="q" required>, and a submit button.',
      instVi: 'Viết thẻ <form action="/search" method="GET"> chứa <label for="search-box">Search</label>, <input type="search" id="search-box" name="q" required>, cùng nút gửi submit.',
      starter: '',
      solution: '<form action="/search" method="GET">\n  <label for="search-box">Search</label>\n  <input type="search" id="search-box" name="q" required>\n  <button type="submit">Search</button>\n</form>',
      hintEn: 'Use method="GET" and type="search" for queries.',
      hintVi: 'Dùng method="GET" và type="search" cho form tìm kiếm.',
      expEn: 'Search operations are idempotent and should use HTTP GET so queries can be bookmarked and shared.',
      expVi: 'Tìm kiếm dữ liệu nên dùng HTTP GET để người dùng có thể lưu bookmark hoặc chia sẻ link URL.'
    },
    {
      id: 'html_ex_9_4',
      type: 'modify_example',
      titleEn: 'Prevent Unintended Form Submission on Secondary Button',
      titleVi: 'Ngăn nút phụ tự động kích hoạt gửi form',
      instEn: 'Add type="button" to the Cancel button so it does not submit the form when clicked.',
      instVi: 'Thêm type="button" vào nút Cancel để nút này không gửi dữ liệu form khi người dùng nhấn.',
      starter: '<form action="/save" method="POST">\n  <input type="text" name="name">\n  <button>Cancel</button>\n  <button type="submit">Save</button>\n</form>',
      solution: '<form action="/save" method="POST">\n  <input type="text" name="name">\n  <button type="button">Cancel</button>\n  <button type="submit">Save</button>\n</form>',
      hintEn: 'Set type="button" on the Cancel <button>.',
      hintVi: 'Gán type="button" cho nút Cancel <button>.',
      expEn: 'Buttons without an explicit type default to type="submit" inside a form.',
      expVi: 'Thẻ button thiếu thuộc tính type sẽ tự động mặc định là type="submit" trong form.'
    },
    {
      id: 'html_ex_9_5',
      type: 'predict_output',
      titleEn: 'Predict URL Encoded Query for Form GET',
      titleVi: 'Dự đoán chuỗi URL query khi gửi form GET',
      instEn: 'If a form has method="GET", action="/find", and <input name="city" value="tokyo">, what will the submitted URL path look like?',
      instVi: 'Nếu form có method="GET", action="/find", và <input name="city" value="tokyo">, đường dẫn URL sau khi gửi sẽ có dạng gì?',
      starter: '<!-- Predict submitted URL -->\n<p>URL: </p>',
      solution: '<p>URL: /find?city=tokyo</p>',
      hintEn: 'GET appends ?name=value query parameters to the action URL.',
      hintVi: 'GET nối các tham số ?name=value vào sau URL action.',
      expEn: 'HTTP GET serializes form inputs into URL search query string parameters.',
      expVi: 'HTTP GET chuyển đổi các input thành chuỗi tham số query trên đường dẫn URL.'
    }
  ],

  challenge: {
    id: 'html_ch_9',
    titleEn: 'Complete Accessible User Onboarding Form',
    titleVi: 'Biểu mẫu tiếp nhận người dùng mới hoàn chỉnh chuẩn trợ năng',
    descEn: 'Build a production-grade signup form with accessible label associations, email/password validation types, and a terms agreement checkbox.',
    descVi: 'Xây dựng biểu mẫu đăng ký người dùng chuẩn chuyên nghiệp có liên kết label trợ năng, kiểu email/password và hộp kiểm đồng ý điều khoản.',
    requirements: [
      { en: 'Form with action="/api/signup" and method="POST"', vi: 'Form có action="/api/signup" và method="POST"' },
      { en: 'Full Name field: <label for="user-name">, <input type="text" id="user-name" name="fullname" required autocomplete="name">', vi: 'Trường Họ tên: <label for="user-name">, <input type="text" id="user-name" name="fullname" required autocomplete="name">' },
      { en: 'Email field: <label for="user-email">, <input type="email" id="user-email" name="email" required autocomplete="email">', vi: 'Trường Email: <label for="user-email">, <input type="email" id="user-email" name="email" required autocomplete="email">' },
      { en: 'Password field: <label for="user-password">, <input type="password" id="user-password" name="password" required autocomplete="new-password">', vi: 'Trường Mật khẩu: <label for="user-password">, <input type="password" id="user-password" name="password" required autocomplete="new-password">' },
      { en: 'Terms Checkbox: <input type="checkbox" id="user-terms" name="terms" required> with <label for="user-terms">', vi: 'Hộp kiểm điều khoản: <input type="checkbox" id="user-terms" name="terms" required> với <label for="user-terms">' },
      { en: 'Submit button with <button type="submit">Create Account</button>', vi: 'Nút gửi với <button type="submit">Create Account</button>' }
    ],
    starter: '<!-- Build complete registration form here -->\n',
    solution: '<form action="/api/signup" method="POST">\n  <div>\n    <label for="user-name">Full Name</label>\n    <input type="text" id="user-name" name="fullname" required autocomplete="name">\n  </div>\n  <div>\n    <label for="user-email">Email Address</label>\n    <input type="email" id="user-email" name="email" required autocomplete="email">\n  </div>\n  <div>\n    <label for="user-password">Password</label>\n    <input type="password" id="user-password" name="password" required autocomplete="new-password">\n  </div>\n  <div>\n    <input type="checkbox" id="user-terms" name="terms" required>\n    <label for="user-terms">I agree to the Terms & Conditions</label>\n  </div>\n  <button type="submit">Create Account</button>\n</form>',
    hints: [
      { en: 'Verify that every <label for="..."> strictly matches its corresponding input id', vi: 'Kiểm tra kỹ mọi <label for="..."> khớp chính xác với id của input tương ứng' },
      { en: 'Use autocomplete tokens to help password managers and browser autofill', vi: 'Dùng thuộc tính autocomplete để hỗ trợ các trình quản lý mật khẩu' }
    ],
    expEn: 'Exemplifies industry-standard accessible form construction with full autocomplete and validation attributes.',
    expVi: 'Mô hình hóa biểu mẫu chuẩn công nghiệp đảm bảo khả năng tiếp cận và tự động điền tối đa.'
  },

  challengeVariants: [
    {
      id: 'html_ch_9_v1',
      titleEn: 'Variant 1: Two-Factor Authentication OTP Form',
      titleVi: 'Biến thể 1: Biểu mẫu xác thực 2 bước 2FA mã OTP',
      descEn: 'Build a one-time passcode form with inputmode="numeric" and autocomplete="one-time-code".',
      descVi: 'Xây dựng form nhập mã xác thực OTP với inputmode="numeric" và autocomplete="one-time-code".',
      requirements: [
        { en: 'action="/api/verify-2fa" method="POST"', vi: 'action="/api/verify-2fa" method="POST"' },
        { en: '<input type="text" id="otp-code" name="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required>', vi: '<input type="text" id="otp-code" name="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required>' }
      ],
      starter: '<form>\n  \n</form>',
      solution: '<form action="/api/verify-2fa" method="POST">\n  <div>\n    <label for="otp-code">Enter 6-Digit Security Code</label>\n    <input type="text" id="otp-code" name="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required pattern="[0-9]{6}">\n  </div>\n  <button type="submit">Verify Code</button>\n</form>',
      expEn: 'inputmode="numeric" pops up the number pad on mobile keyboards for seamless SMS OTP entry.',
      expVi: 'inputmode="numeric" tự động mở bàn phím số trên điện thoại giúp người dùng nhập mã OTP thuận tiện.'
    },
    {
      id: 'html_ch_9_v2',
      titleEn: 'Variant 2: Shipping Preference Radio Selector',
      titleVi: 'Biến thể 2: Bộ chọn hình thức vận chuyển bằng radio',
      descEn: 'Build a checkout shipping selector with 3 radio options (Standard, Express, Overnight) sharing name="shipping_method".',
      descVi: 'Xây dựng bộ chọn hình thức giao hàng với 3 tùy chọn radio (Tiêu chuẩn, Nhanh, Hỏa tốc) dùng chung name="shipping_method".',
      requirements: [
        { en: '3 radio buttons with shared name="shipping_method"', vi: '3 nút radio có chung name="shipping_method"' },
        { en: 'Pre-check the Standard option with "checked"', vi: 'Chọn sẵn tùy chọn Standard bằng thuộc tính "checked"' }
      ],
      starter: '<form action="/checkout/shipping" method="POST">\n  \n</form>',
      solution: '<form action="/checkout/shipping" method="POST">\n  <p>Select Shipping Speed:</p>\n  <div>\n    <input type="radio" id="ship-std" name="shipping_method" value="standard" checked>\n    <label for="ship-std">Standard Ground ($5.00)</label>\n  </div>\n  <div>\n    <input type="radio" id="ship-exp" name="shipping_method" value="express">\n    <label for="ship-exp">Express 2-Day ($15.00)</label>\n  </div>\n  <div>\n    <input type="radio" id="ship-over" name="shipping_method" value="overnight">\n    <label for="ship-over">Overnight Priority ($30.00)</label>\n  </div>\n  <button type="submit">Continue to Payment</button>\n</form>',
      expEn: 'Shared name groups the radios, and checked sets the sensible default option.',
      expVi: 'Thuộc tính name chung nhóm các radio lại và checked tạo tùy chọn mặc định hợp lý.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_9_1',
      type: 'single_choice',
      qEn: 'How do you explicitly bind a <label> to an <input> element?',
      qVi: 'Bạn liên kết tường minh thẻ <label> với thẻ <input> bằng cách nào?',
      options: [
        { en: 'Set the label\'s "for" attribute to match the input\'s "id" attribute exactly', vi: 'Đặt thuộc tính "for" của label khớp chính xác với thuộc tính "id" của input' },
        { en: 'Set the label\'s "name" attribute to match the input\'s "name" attribute', vi: 'Đặt thuộc tính "name" của label khớp với thuộc tính "name" của input' },
        { en: 'Give them the same CSS class', vi: 'Gán cho chúng cùng một CSS class' },
        { en: 'Place them inside the same paragraph tag without attributes', vi: 'Đặt chúng trong cùng một thẻ <p> mà không cần thuộc tính' }
      ],
      ans: 0,
      expEn: 'The for attribute of <label> pairs with the id of the target form control.',
      expVi: 'Thuộc tính for của <label> ghép nối với id của ô điều khiển form tương ứng.'
    },
    {
      id: 'html_q_9_2',
      type: 'single_choice',
      qEn: 'What is the crucial user experience benefit of clicking on an explicit <label>?',
      qVi: 'Lợi ích trải nghiệm người dùng quan trọng khi người dùng nhấn vào chữ của thẻ <label> là gì?',
      options: [
        { en: 'Clicking the label automatically focuses the text field or toggles the checkbox/radio button, enlarging the touch target', vi: 'Nhấp vào label sẽ tự động focus vào ô nhập hoặc bật/tắt checkbox/radio, giúp mở rộng vùng bấm' },
        { en: 'It clears the input value immediately', vi: 'Nó xóa ngay giá trị trong ô nhập' },
        { en: 'It submits the entire form immediately', vi: 'Nó gửi ngay form đi' },
        { en: 'It downloads the page as a PDF', vi: 'Nó tải trang về dạng PDF' }
      ],
      ans: 0,
      expEn: 'Labels expand the interactive hit target for small checkboxes and mobile touch interfaces.',
      expVi: 'Thẻ label mở rộng diện tích chạm cho các ô checkbox nhỏ trên màn hình cảm ứng di động.'
    },
    {
      id: 'html_q_9_3',
      type: 'single_choice',
      qEn: 'What is the default HTTP method if <form> is created without a "method" attribute?',
      qVi: 'Phương thức HTTP mặc định nếu thẻ <form> không khai báo thuộc tính "method" là gì?',
      options: [
        { en: 'GET', vi: 'GET' },
        { en: 'POST', vi: 'POST' },
        { en: 'PUT', vi: 'PUT' },
        { en: 'DELETE', vi: 'DELETE' }
      ],
      ans: 0,
      expEn: 'HTML forms default to method="GET" if left unspecified.',
      expVi: 'Form trong HTML tự động mặc định là method="GET" nếu không được khai báo.'
    },
    {
      id: 'html_q_9_4',
      type: 'single_choice',
      qEn: 'When sending sensitive data (such as passwords, credit card numbers, or large files), which method MUST you use?',
      qVi: 'Khi gửi dữ liệu nhạy cảm (như mật khẩu, số thẻ ngân hàng hoặc file tải lên), bạn BẮT BUỘC phải dùng phương thức nào?',
      options: [
        { en: 'POST, because it sends data in the HTTP request body instead of exposing it in the URL query string', vi: 'POST, vì nó truyền dữ liệu trong phần thân (body) của HTTP request thay vì để lộ trên thanh địa chỉ URL' },
        { en: 'GET, because it encrypts the URL automatically', vi: 'GET, vì nó tự mã hóa URL' },
        { en: 'HEAD', vi: 'HEAD' },
        { en: 'OPTIONS', vi: 'OPTIONS' }
      ],
      ans: 0,
      expEn: 'POST transmits payloads in the request body, preventing secrets from appearing in server access logs and browser history.',
      expVi: 'POST truyền dữ liệu trong body, tránh lộ mật khẩu trong lịch sử duyệt web và log máy chủ.'
    },
    {
      id: 'html_q_9_5',
      type: 'single_choice',
      qEn: 'What attribute specifies the server endpoint URL where form data is sent upon submission?',
      qVi: 'Thuộc tính nào chỉ định địa chỉ URL máy chủ nơi dữ liệu form sẽ được gửi đến khi submit?',
      options: [
        { en: 'action', vi: 'action' },
        { en: 'src', vi: 'src' },
        { en: 'href', vi: 'href' },
        { en: 'target-url', vi: 'target-url' }
      ],
      ans: 0,
      expEn: 'The action attribute defines the submission endpoint URL.',
      expVi: 'Thuộc tính action xác định URL máy chủ tiếp nhận dữ liệu form.'
    },
    {
      id: 'html_q_9_6',
      type: 'single_choice',
      qEn: 'What happens when a user presses Enter inside an <input type="text"> in a form with a single text field?',
      qVi: 'Điều gì xảy ra khi người dùng nhấn phím Enter trong ô <input type="text"> của một form chỉ có 1 ô nhập?',
      options: [
        { en: 'The browser automatically submits the form (implicit submission)', vi: 'Trình duyệt tự động gửi form đi (cơ chế implicit submission)' },
        { en: 'A newline character is added to the text', vi: 'Thêm một dấu xuống dòng vào văn bản' },
        { en: 'The input field is erased', vi: 'Ô nhập liệu bị xóa trắng' },
        { en: 'The browser window refreshes without sending data', vi: 'Trình duyệt tải lại trang mà không gửi dữ liệu' }
      ],
      ans: 0,
      expEn: 'Browsers perform implicit form submission when Enter is pressed in text fields.',
      expVi: 'Trình duyệt thực hiện gửi form tự động (implicit submission) khi nhấn Enter trong ô text.'
    },
    {
      id: 'html_q_9_7',
      type: 'single_choice',
      qEn: 'What is the default type of a <button> element located inside a <form> if no type is explicitly specified?',
      qVi: 'Kiểu (type) mặc định của thẻ <button> nằm trong <form> nếu không ghi rõ thuộc tính type là gì?',
      options: [
        { en: 'type="submit"', vi: 'type="submit"' },
        { en: 'type="button"', vi: 'type="button"' },
        { en: 'type="reset"', vi: 'type="reset"' },
        { en: 'type="menu"', vi: 'type="menu"' }
      ],
      ans: 0,
      expEn: 'Buttons inside forms default to type="submit" unless overridden with type="button".',
      expVi: 'Thẻ button trong form tự động có type="submit" trừ khi được đổi thành type="button".'
    },
    {
      id: 'html_q_9_8',
      type: 'single_choice',
      qEn: 'Why is <input type="email"> preferred over <input type="text"> for email addresses?',
      qVi: 'Tại sao <input type="email"> tốt hơn <input type="text"> khi dùng cho địa chỉ email?',
      options: [
        { en: 'It shows an email-optimized keyboard on mobile (with @ and .com) and provides built-in email syntax validation', vi: 'Nó hiển thị bàn phím tối ưu cho email trên di động (có sẵn @ và .com) và tự động kiểm tra cú pháp email' },
        { en: 'It automatically sends an email to the user when typed', vi: 'Nó tự động gửi email cho người dùng khi vừa gõ xong' },
        { en: 'It encrypts the text with AES-256', vi: 'Nó mã hóa văn bản bằng chuẩn AES-256' },
        { en: 'It connects to Gmail automatically', vi: 'Nó tự kết nối tới tài khoản Gmail' }
      ],
      ans: 0,
      expEn: 'type="email" triggers mobile keyboard adaptation and native regex validation.',
      expVi: 'type="email" kích hoạt bàn phím di động thông minh và cơ chế kiểm tra định dạng email của trình duyệt.'
    },
    {
      id: 'html_q_9_9',
      type: 'single_choice',
      qEn: 'What does the "required" boolean attribute do on an input element?',
      qVi: 'Thuộc tính boolean "required" trên ô input có tác dụng gì?',
      options: [
        { en: 'Prevents form submission and shows a browser validation tooltip if the field is empty', vi: 'Ngăn việc gửi form và hiển thị cảnh báo nếu trường nhập liệu bị bỏ trống' },
        { en: 'Locks the field so the user cannot edit it', vi: 'Khóa trường đó lại không cho người dùng chỉnh sửa' },
        { en: 'Pre-fills the input with sample data', vi: 'Tự động điền dữ liệu mẫu vào ô nhập' },
        { en: 'Changes the text color to red', vi: 'Đổi màu chữ thành màu đỏ' }
      ],
      ans: 0,
      expEn: 'required mandates user input before the form can be submitted.',
      expVi: 'required bắt buộc người dùng phải điền thông tin trước khi có thể gửi form.'
    },
    {
      id: 'html_q_9_10',
      type: 'single_choice',
      qEn: 'What does the "autocomplete" attribute (e.g. autocomplete="current-password") enable?',
      qVi: 'Thuộc tính "autocomplete" (như autocomplete="current-password") mang lại điều gì?',
      options: [
        { en: 'Helps password managers and browsers safely autofill credentials and personal data', vi: 'Hỗ trợ các trình quản lý mật khẩu và trình duyệt tự động điền thông tin tài khoản an toàn' },
        { en: 'Generates random passwords in JavaScript', vi: 'Tự tạo mật khẩu ngẫu nhiên trong JavaScript' },
        { en: 'Deletes browser cookies on submit', vi: 'Xóa cookie trình duyệt khi submit' },
        { en: 'Prevents hackers from viewing the page', vi: 'Ngăn hacker xem trang' }
      ],
      ans: 0,
      expEn: 'autocomplete tokens communicate field semantics directly to browser autofill engines.',
      expVi: 'autocomplete cung cấp chuẩn định danh cho bộ máy tự động điền của trình duyệt.'
    },
    {
      id: 'html_q_9_11',
      type: 'single_choice',
      qEn: 'Which input type hides typed characters with dots/asterisks for security?',
      qVi: 'Kiểu input nào che giấu các ký tự được gõ bằng dấu chấm/sao để bảo mật?',
      options: [
        { en: 'type="password"', vi: 'type="password"' },
        { en: 'type="hidden"', vi: 'type="hidden"' },
        { en: 'type="secret"', vi: 'type="secret"' },
        { en: 'type="mask"', vi: 'type="mask"' }
      ],
      ans: 0,
      expEn: 'type="password" masks characters on screen to prevent shoulder surfing.',
      expVi: 'type="password" ẩn các ký tự trên màn hình để chống nhìn trộm mật khẩu.'
    },
    {
      id: 'html_q_9_12',
      type: 'single_choice',
      qEn: 'What is <input type="hidden"> used for in web development?',
      qVi: 'Ô <input type="hidden"> được dùng để làm gì trong phát triển web?',
      options: [
        { en: 'To submit programmatic data (like CSRF tokens, user IDs, or session state) that users don\'t need to see or edit', vi: 'Để gửi các dữ liệu ngầm (như mã token chống CSRF, ID người dùng, trạng thái session) mà người dùng không cần thấy hay sửa' },
        { en: 'To hide broken CSS styles', vi: 'Để giấu các đoạn CSS bị lỗi' },
        { en: 'To track user GPS location invisibly', vi: 'Để theo dõi vị trí GPS ngầm' },
        { en: 'To disable the submit button', vi: 'Để tắt nút gửi submit' }
      ],
      ans: 0,
      expEn: 'type="hidden" stores and sends data with the form without rendering on screen.',
      expVi: 'type="hidden" lưu trữ và gửi dữ liệu đi kèm form mà không hiển thị ra giao diện.'
    },
    {
      id: 'html_q_9_13',
      type: 'single_choice',
      qEn: 'What is the difference between <input type="checkbox"> and <input type="radio">?',
      qVi: 'Sự khác biệt giữa <input type="checkbox"> và <input type="radio"> là gì?',
      options: [
        { en: 'Checkboxes permit selecting multiple independent options (or zero), whereas grouped radio buttons permit selecting exactly one option from a set', vi: 'Checkbox cho phép chọn nhiều mục độc lập (hoặc không chọn mục nào), còn nhóm nút radio chỉ cho phép chọn đúng 1 mục duy nhất trong nhóm' },
        { en: 'Checkboxes are for numbers, radios are for text', vi: 'Checkbox dành cho số, radio dành cho chữ' },
        { en: 'Radios are deprecated in HTML5', vi: 'Radio đã bị loại bỏ trong HTML5' },
        { en: 'Checkboxes only work with JavaScript', vi: 'Checkbox chỉ hoạt động khi có JavaScript' }
      ],
      ans: 0,
      expEn: 'Checkboxes are multi-select; grouped radio buttons are single-select.',
      expVi: 'Checkbox dùng cho chọn nhiều; radio dùng cho chọn 1 duy nhất trong nhóm.'
    },
    {
      id: 'html_q_9_14',
      type: 'single_choice',
      qEn: 'What happens to unchecked checkbox inputs when a form is submitted?',
      qVi: 'Điều gì xảy ra với các ô checkbox không được tích chọn khi gửi form đi?',
      options: [
        { en: 'They are completely excluded from the submitted form data (not sent to server)', vi: 'Chúng hoàn toàn không được gửi lên máy chủ (bị bỏ qua trong dữ liệu submit)' },
        { en: 'They send value="false"', vi: 'Chúng gửi giá trị value="false"' },
        { en: 'They send value="0"', vi: 'Chúng gửi giá trị value="0"' },
        { en: 'They cause a validation error', vi: 'Chúng gây lỗi kiểm tra form' }
      ],
      ans: 0,
      expEn: 'Unchecked checkboxes are considered "unsuccessful" controls and omitted from POST/GET payloads.',
      expVi: 'Checkbox chưa tích không được coi là dữ liệu hợp lệ gửi đi nên bị bỏ qua trong payload.'
    },
    {
      id: 'html_q_9_15',
      type: 'single_choice',
      qEn: 'Can an <input> element have both a <label> and a placeholder attribute?',
      qVi: 'Một ô <input> có thể có cả thẻ <label> lẫn thuộc tính placeholder không?',
      options: [
        { en: 'Yes, the <label> provides the permanent accessible name, while placeholder provides a brief formatting hint (e.g. "e.g. user@domain.com")', vi: 'Có, <label> cung cấp tên mô tả cố định cho trợ năng, còn placeholder đóng vai trò là gợi ý định dạng mẫu (như "vd: user@domain.com")' },
        { en: 'No, having both throws an HTML validator error', vi: 'Không, dùng cả hai sẽ bị báo lỗi chuẩn HTML' },
        { en: 'Only on password fields', vi: 'Chỉ trên trường mật khẩu' },
        { en: 'Only if the label is hidden with CSS', vi: 'Chỉ khi label bị ẩn bằng CSS' }
      ],
      ans: 0,
      expEn: 'Pairing visible labels with supplementary formatting hint placeholders is standard practice.',
      expVi: 'Kết hợp label cố định kèm placeholder làm gợi ý ví dụ mẫu là chuẩn thực hành tốt nhất.'
    },
    {
      id: 'html_q_9_16',
      type: 'single_choice',
      qEn: 'What attribute allows sending binary files (like image uploads) in a POST form?',
      qVi: 'Thuộc tính nào trên thẻ <form> cho phép gửi tệp tin nhị phân (như ảnh tải lên) trong form POST?',
      options: [
        { en: 'enctype="multipart/form-data"', vi: 'enctype="multipart/form-data"' },
        { en: 'file-mode="binary"', vi: 'file-mode="binary"' },
        { en: 'encoding="blob"', vi: 'encoding="blob"' },
        { en: 'upload="true"', vi: 'upload="true"' }
      ],
      ans: 0,
      expEn: 'enctype="multipart/form-data" is required whenever uploading files via <input type="file">.',
      expVi: 'enctype="multipart/form-data" là bắt buộc khi người dùng tải tệp qua <input type="file">.'
    }
  ]
};

console.log('Lesson 9 defined.');
