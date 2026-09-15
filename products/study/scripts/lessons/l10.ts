import { RawLessonSource } from './rawLessonType';

export const lesson10: RawLessonSource = {
  order: 10,
  id: 'html_lesson_10',
  moduleId: 'html_mod_3',
  levelId: 'intermediate',
  topicId: 'html_advanced_inputs',
  titleEn: 'Advanced Input Controls: select, datalist, textarea, range, date/time & fieldset/legend',
  titleVi: 'Điều Khiển Nhập Liệu Nâng Cao: select, datalist, textarea, range, date/time & fieldset/legend',
  summaryEn: 'Master advanced HTML5 form controls: dropdown <select> with <optgroup>, autocomplete <datalist>, multi-line <textarea>, specialized sliders (<input type="range">), date/time pickers, and grouped <fieldset> with <legend>.',
  summaryVi: 'Làm chủ các điều khiển biểu mẫu nâng cao: danh sách chọn <select> có <optgroup>, gợi ý tự động <datalist>, nhập văn bản nhiều dòng <textarea>, thanh trượt <input type="range">, bộ chọn ngày giờ và nhóm khung <fieldset> kèm <legend>.',
  estimatedMinutes: 15,
  introEn: 'Modern HTML5 provides rich, native input widgets that eliminate the need for heavy external JavaScript picker libraries, delivering fluid native experiences across mobile and desktop.',
  introVi: 'HTML5 hiện đại cung cấp các widget nhập liệu gốc phong phú, giúp loại bỏ sự phụ thuộc vào các thư viện JavaScript cồng kềnh, mang lại trải nghiệm gốc mượt mà trên cả di động và máy tính.',
  conceptEn: 'Group related fields semantically using <fieldset> with a descriptive <legend>. Use <select> with <option> (and <optgroup> for categorized subheadings) for discrete dropdown choices. Use <datalist id="..."> paired with <input list="..."> to offer typeahead autocomplete suggestions while still allowing freeform user input. Use <textarea> for multi-line commentary. Leverage specialized input types: date, time, datetime-local, color, and range.',
  conceptVi: 'Nhóm các trường có liên quan bằng <fieldset> kèm tiêu đề <legend>. Dùng <select> với <option> (và <optgroup> cho phân nhóm) cho danh sách chọn sẵn. Dùng <datalist id="..."> ghép với <input list="..."> để cung cấp gợi ý tự động mà vẫn cho phép người dùng nhập tự do. Dùng <textarea> cho văn bản nhiều dòng. Tận dụng các kiểu input chuyên dụng: date, time, datetime-local, color và range.',
  syntax: '<fieldset>\n  <legend>Appointment Details</legend>\n  <label for="app-date">Date</label>\n  <input type="date" id="app-date" name="date" min="2026-01-01">\n  \n  <label for="app-service">Service</label>\n  <select id="app-service" name="service">\n    <optgroup label="Consulting">\n      <option value="arch">Architecture Review</option>\n    </optgroup>\n  </select>\n</fieldset>',
  ex1TitleEn: 'Categorized Dropdown with <optgroup> and Multi-Line <textarea>',
  ex1TitleVi: 'Menu Thả Xuống Phân Nhóm Với <optgroup> Và Khối <textarea>',
  ex1Code: '<form action="/feedback" method="POST" style="max-width:400px; display:flex; flex-direction:column; gap:16px;">\n  <div>\n    <label for="dept-select" style="display:block; font-weight:600; margin-bottom:4px;">Target Department</label>\n    <select id="dept-select" name="department" required style="width:100%; padding:8px; border-radius:6px; border:1px solid #cbd5e1;">\n      <option value="">-- Choose a department --</option>\n      <optgroup label="Technical Engineering">\n        <option value="frontend">Frontend Platform</option>\n        <option value="cloud">Cloud Infrastructure</option>\n      </optgroup>\n      <optgroup label="Customer Success">\n        <option value="billing">Billing & Subscriptions</option>\n        <option value="support">Technical Support</option>\n      </optgroup>\n    </select>\n  </div>\n  <div>\n    <label for="feedback-msg" style="display:block; font-weight:600; margin-bottom:4px;">Detailed Message</label>\n    <textarea id="feedback-msg" name="message" rows="4" cols="50" placeholder="Please describe your experience in detail..." required style="width:100%; padding:8px; border-radius:6px; border:1px solid #cbd5e1;"></textarea>\n  </div>\n  <button type="submit" style="background:#2563eb; color:#fff; padding:10px; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">Submit Feedback</button>\n</form>',
  ex1ExpEn: 'Shows structured option hierarchy via <optgroup> and configured multi-line text input with rows and cols.',
  ex1ExpVi: 'Minh họa phân nhóm tùy chọn qua <optgroup> và cấu hình ô nhập văn bản nhiều dòng với rows và cols.',
  ex2TitleEn: 'Typeahead Autocomplete with <datalist> and Dynamic Slider <input type="range">',
  ex2TitleVi: 'Gợi Ý Tự Động Với <datalist> Và Thanh Trượt <input type="range">',
  ex2Code: '<div>\n  <label for="city-input" style="display:block; font-weight:600; margin-bottom:4px;">Choose Destination City:</label>\n  <input type="text" id="city-input" name="destination" list="city-suggestions" placeholder="Type or select..." style="padding:8px; border:1px solid #cbd5e1; border-radius:6px; width:260px;">\n  <datalist id="city-suggestions">\n    <option value="Hanoi">\n    <option value="Ho Chi Minh City">\n    <option value="Da Nang">\n    <option value="Tokyo">\n    <option value="Singapore">\n  </datalist>\n\n  <div style="margin-top:16px;">\n    <label for="price-range" style="display:block; font-weight:600; margin-bottom:4px;">Budget Filter ($50 - $1000):</label>\n    <input type="range" id="price-range" name="budget" min="50" max="1000" step="50" value="500" style="width:260px;">\n  </div>\n</div>',
  ex2ExpEn: '<datalist> suggests predefined options while allowing arbitrary typed text. type="range" renders a slider.',
  ex2ExpVi: '<datalist> gợi ý các tùy chọn có sẵn mà vẫn cho phép gõ tự do. type="range" hiển thị thanh trượt chọn số.',
  mistake1En: 'Trying to set a value on <textarea> using the value="..." attribute',
  mistake1Vi: 'Cố gắng đặt giá trị cho thẻ <textarea> bằng thuộc tính value="..."',
  correction1En: '<textarea> does not use a value attribute; place its initial text content between its opening <textarea> and closing </textarea> tags.',
  correction1Vi: '<textarea> không dùng thuộc tính value; hãy đặt văn bản khởi tạo nằm giữa thẻ mở <textarea> và thẻ đóng </textarea>.',
  mistake2En: 'Mismatched list and id attributes when connecting an <input> to a <datalist>',
  mistake2Vi: 'Đặt sai thuộc tính list và id khi nối thẻ <input> với <datalist>',
  correction2En: 'The input\'s list="..." attribute MUST match the datalist\'s id="..." attribute exactly.',
  correction2Vi: 'Thuộc tính list="..." của input BẮT BUỘC phải khớp chính xác với id="..." của thẻ datalist.',
  tipEn: '<fieldset> disabled attribute automatically disables every form control nested inside it simultaneously, perfect for multi-step checkout wizard stages.',
  tipVi: 'Thuộc tính disabled trên thẻ <fieldset> sẽ tự động vô hiệu hóa toàn bộ các ô nhập nằm bên trong nó, cực kỳ tiện cho form chia nhiều bước.',
  practiceTaskEn: 'Build a Grouped Booking Fieldset',
  practiceTaskVi: 'Xây dựng nhóm trường đặt phòng chuẩn fieldset',
  practiceInstEn: 'Create a <fieldset> with <legend>Hotel Booking</legend>, containing a date picker (<label for="chk-in">Check-in</label>, <input type="date" id="chk-in" name="checkin">) and a dropdown (<label for="rm-type">Room</label>, <select id="rm-type" name="room"><option value="std">Standard</option><option value="dlx">Deluxe</option></select>).',
  practiceInstVi: 'Tạo thẻ <fieldset> có <legend>Hotel Booking</legend>, chứa bộ chọn ngày (<label for="chk-in">Check-in</label>, <input type="date" id="chk-in" name="checkin">) cùng menu chọn (<label for="rm-type">Room</label>, <select id="rm-type" name="room"><option value="std">Standard</option><option value="dlx">Deluxe</option></select>).',
  practiceStarter: '<form>\n  \n</form>',
  practiceSolution: '<form>\n  <fieldset>\n    <legend>Hotel Booking</legend>\n    <div>\n      <label for="chk-in">Check-in</label>\n      <input type="date" id="chk-in" name="checkin">\n    </div>\n    <div>\n      <label for="rm-type">Room</label>\n      <select id="rm-type" name="room">\n        <option value="std">Standard</option>\n        <option value="dlx">Deluxe</option>\n      </select>\n    </div>\n  </fieldset>\n</form>',
  practicePatterns: ['<fieldset>', '<legend>Hotel Booking</legend>', 'for="chk-in"', 'type="date"', 'id="chk-in"', 'for="rm-type"', '<select id="rm-type"', '<option value="std">Standard</option>', '<option value="dlx">Deluxe</option>', '</select>', '</fieldset>'],
  practiceHintEn: 'Wrap the date and select fields inside <fieldset><legend>...</legend>...</fieldset>.',
  practiceHintVi: 'Bao bọc trường ngày và select bên trong <fieldset><legend>...</legend>...</fieldset>.',

  exercises: [
    {
      id: 'html_ex_10_1',
      type: 'complete_code',
      titleEn: 'Connect Input to Datalist Autocomplete',
      titleVi: 'Kết nối thẻ input với datalist để gợi ý tự động',
      instEn: 'Add list="browsers" to the <input> and define <datalist id="browsers"> with 2 options (Chrome, Firefox).',
      instVi: 'Thêm list="browsers" vào <input> và định nghĩa <datalist id="browsers"> với 2 lựa chọn (Chrome, Firefox).',
      starter: '<div>\n  <label for="browser-choice">Preferred Browser</label>\n  <input type="text" id="browser-choice" name="browser">\n</div>',
      solution: '<div>\n  <label for="browser-choice">Preferred Browser</label>\n  <input type="text" id="browser-choice" name="browser" list="browsers">\n  <datalist id="browsers">\n    <option value="Chrome">\n    <option value="Firefox">\n  </datalist>\n</div>',
      hintEn: 'Add list="browsers" to input and <datalist id="browsers"> with <option value="...">.',
      hintVi: 'Thêm list="browsers" vào input và tạo <datalist id="browsers"> chứa <option value="...">.',
      expEn: '<datalist> provides a dropdown list of preset autocomplete suggestions.',
      expVi: '<datalist> hiển thị danh sách các đề xuất tự động điền sẵn có.'
    },
    {
      id: 'html_ex_10_2',
      type: 'fix_code',
      titleEn: 'Fix Default Text in <textarea>',
      titleVi: 'Sửa lỗi gán văn bản mặc định trong <textarea>',
      instEn: 'Fix the <textarea> by moving "Initial notes here." out of the invalid value attribute and placing it between the tags.',
      instVi: 'Sửa thẻ <textarea> bằng cách chuyển "Initial notes here." ra khỏi thuộc tính value không hợp lệ và đặt vào giữa 2 thẻ mở/đóng.',
      starter: '<label for="notes">Notes</label>\n<textarea id="notes" name="notes" value="Initial notes here."></textarea>',
      solution: '<label for="notes">Notes</label>\n<textarea id="notes" name="notes">Initial notes here.</textarea>',
      hintEn: 'Remove value attribute and place the text between <textarea> and </textarea>.',
      hintVi: 'Xóa thuộc tính value và đặt văn bản vào giữa <textarea> và </textarea>.',
      expEn: '<textarea> accepts initial content as child text nodes, not as a value attribute.',
      expVi: '<textarea> nhận văn bản khởi tạo dưới dạng text node bên trong thẻ, không dùng thuộc tính value.'
    },
    {
      id: 'html_ex_10_3',
      type: 'write_code',
      titleEn: 'Create Color Picker and Range Slider',
      titleVi: 'Tạo bộ chọn màu và thanh trượt khoảng giá trị',
      instEn: 'Write two labeled inputs: a color picker (<label for="theme-col">Theme Color</label>, <input type="color" id="theme-col" name="theme_color" value="#2563eb">) and a volume slider (<label for="vol-lvl">Volume</label>, <input type="range" id="vol-lvl" name="volume" min="0" max="100" value="75">).',
      instVi: 'Viết 2 ô nhập có label: bộ chọn màu (<label for="theme-col">Theme Color</label>, <input type="color" id="theme-col" name="theme_color" value="#2563eb">) và thanh trượt âm lượng (<label for="vol-lvl">Volume</label>, <input type="range" id="vol-lvl" name="volume" min="0" max="100" value="75">).',
      starter: '',
      solution: '<div>\n  <label for="theme-col">Theme Color</label>\n  <input type="color" id="theme-col" name="theme_color" value="#2563eb">\n</div>\n<div>\n  <label for="vol-lvl">Volume</label>\n  <input type="range" id="vol-lvl" name="volume" min="0" max="100" value="75">\n</div>',
      hintEn: 'Use type="color" and type="range" with min, max, value.',
      hintVi: 'Dùng type="color" và type="range" kèm min, max, value.',
      expEn: 'Native HTML5 color and range pickers provide accessible graphical controls without JavaScript.',
      expVi: 'Bộ chọn màu và thanh trượt HTML5 gốc cung cấp giao diện trực quan chuẩn trợ năng mà không cần JS.'
    },
    {
      id: 'html_ex_10_4',
      type: 'modify_example',
      titleEn: 'Add Optgroups to Organize Flight Classes',
      titleVi: 'Thêm optgroups phân loại các hạng vé máy bay',
      instEn: 'Wrap Economy and Premium Economy inside <optgroup label="Standard Cabins"> and Business and First inside <optgroup label="Luxury Cabins">.',
      instVi: 'Bọc Economy và Premium Economy trong <optgroup label="Standard Cabins"> và Business và First trong <optgroup label="Luxury Cabins">.',
      starter: '<select name="cabin">\n  <option value="eco">Economy</option>\n  <option value="p-eco">Premium Economy</option>\n  <option value="biz">Business</option>\n  <option value="first">First</option>\n</select>',
      solution: '<select name="cabin">\n  <optgroup label="Standard Cabins">\n    <option value="eco">Economy</option>\n    <option value="p-eco">Premium Economy</option>\n  </optgroup>\n  <optgroup label="Luxury Cabins">\n    <option value="biz">Business</option>\n    <option value="first">First</option>\n  </optgroup>\n</select>',
      hintEn: 'Wrap option tags inside corresponding <optgroup label="..."> blocks.',
      hintVi: 'Bọc các thẻ option bên trong các khối <optgroup label="..."> tương ứng.',
      expEn: '<optgroup> creates unselectable bold category headings within a select menu.',
      expVi: '<optgroup> tạo ra các tiêu đề phân loại in đậm không thể chọn bên trong thẻ select.'
    },
    {
      id: 'html_ex_10_5',
      type: 'predict_output',
      titleEn: 'Analyze Multiple Selection on <select>',
      titleVi: 'Phân tích tùy chọn chọn nhiều trên <select>',
      instEn: 'Which boolean attribute on a <select> element allows users to select multiple options simultaneously using Ctrl/Cmd-click?',
      instVi: 'Thuộc tính boolean nào trên thẻ <select> cho phép người dùng chọn cùng lúc nhiều lựa chọn bằng phím Ctrl/Cmd?',
      starter: '<!-- Attribute name: -->\n<p>Attribute: </p>',
      solution: '<p>Attribute: multiple</p>',
      hintEn: 'The multiple attribute turns a dropdown into a multi-select box.',
      hintVi: 'Thuộc tính multiple chuyển menu thả xuống thành hộp chọn nhiều mục.',
      expEn: 'The multiple attribute enables multi-selection in <select> controls.',
      expVi: 'Thuộc tính multiple bật chế độ chọn nhiều mục trong phần tử <select>.'
    }
  ],

  challenge: {
    id: 'html_ch_10',
    titleEn: 'Enterprise Conference Speaker Submission Form',
    titleVi: 'Biểu mẫu nộp hồ sơ diễn giả hội thảo doanh nghiệp',
    descEn: 'Build a comprehensive submission form using fieldsets, legends, datalists, date/time inputs, and categorized select controls.',
    descVi: 'Xây dựng biểu mẫu nộp hồ sơ toàn diện sử dụng fieldsets, legends, datalists, ô chọn ngày giờ và menu select phân loại.',
    requirements: [
      { en: 'First <fieldset> with <legend>Speaker Information</legend> containing Name and Bio (<textarea id="spk-bio" name="bio" rows="5" required>)', vi: 'Fieldset 1 có <legend>Speaker Information</legend> chứa Name và Bio (<textarea id="spk-bio" name="bio" rows="5" required>)' },
      { en: 'Second <fieldset> with <legend>Session Proposal</legend> containing Title, Preferred Date (<input type="date" id="sess-date" name="session_date">), and Track (<select> with <optgroup label="Frontend"> and <optgroup label="Cloud">)', vi: 'Fieldset 2 có <legend>Session Proposal</legend> chứa Title, Ngày dự kiến (<input type="date" id="sess-date" name="session_date">), và Track (<select> với 2 optgroup)' },
      { en: 'Location input with <datalist id="venue-cities"> containing Hanoi, Da Nang, Ho Chi Minh City', vi: 'Trường địa điểm kèm <datalist id="venue-cities"> chứa Hanoi, Da Nang, Ho Chi Minh City' },
      { en: 'Submit button <button type="submit">Submit Proposal</button>', vi: 'Nút gửi <button type="submit">Submit Proposal</button>' }
    ],
    starter: '<!-- Build complete conference speaker form here -->\n',
    solution: '<form action="/api/proposals" method="POST">\n  <fieldset>\n    <legend>Speaker Information</legend>\n    <div>\n      <label for="spk-name">Full Name</label>\n      <input type="text" id="spk-name" name="name" required>\n    </div>\n    <div>\n      <label for="spk-bio">Biography</label>\n      <textarea id="spk-bio" name="bio" rows="5" required></textarea>\n    </div>\n  </fieldset>\n\n  <fieldset>\n    <legend>Session Proposal</legend>\n    <div>\n      <label for="sess-title">Session Title</label>\n      <input type="text" id="sess-title" name="title" required>\n    </div>\n    <div>\n      <label for="sess-date">Preferred Date</label>\n      <input type="date" id="sess-date" name="session_date">\n    </div>\n    <div>\n      <label for="sess-city">Target City</label>\n      <input type="text" id="sess-city" name="city" list="venue-cities">\n      <datalist id="venue-cities">\n        <option value="Hanoi">\n        <option value="Da Nang">\n        <option value="Ho Chi Minh City">\n      </datalist>\n    </div>\n    <div>\n      <label for="sess-track">Technical Track</label>\n      <select id="sess-track" name="track" required>\n        <option value="">Select track...</option>\n        <optgroup label="Frontend">\n          <option value="react">React & Web Standards</option>\n          <option value="css">Modern CSS & Architecture</option>\n        </optgroup>\n        <optgroup label="Cloud">\n          <option value="k8s">Kubernetes & DevOps</option>\n          <option value="serverless">Serverless & Edge</option>\n        </optgroup>\n      </select>\n    </div>\n  </fieldset>\n\n  <button type="submit">Submit Proposal</button>\n</form>',
    hints: [
      { en: 'Organize inputs logically across the two <fieldset> sections', vi: 'Tổ chức các ô nhập hợp lý qua 2 khối <fieldset>' },
      { en: 'Ensure the datalist id matches the input list attribute', vi: 'Đảm bảo id của datalist khớp với thuộc tính list của input' }
    ],
    expEn: 'Production-ready enterprise multi-section form utilizing advanced semantic form architecture.',
    expVi: 'Biểu mẫu doanh nghiệp phân đoạn hoàn chỉnh sử dụng cấu trúc form ngữ nghĩa nâng cao.'
  },

  challengeVariants: [
    {
      id: 'html_ch_10_v1',
      titleEn: 'Variant 1: Medical Telehealth Appointment Scheduler',
      titleVi: 'Biến thể 1: Đặt lịch khám bệnh từ xa',
      descEn: 'Build a scheduler with date/time pickers, doctor specialty optgroups, and symptoms textarea.',
      descVi: 'Xây dựng form đặt lịch có chọn ngày/giờ, optgroups chuyên khoa bác sĩ và ô textarea triệu chứng.',
      requirements: [
        { en: '<input type="datetime-local" id="apt-time" name="appointment_time" required>', vi: '<input type="datetime-local" id="apt-time" name="appointment_time" required>' },
        { en: '<select id="specialty" name="specialty"><optgroup label="General"><optgroup label="Specialist">', vi: '<select id="specialty" name="specialty"><optgroup label="General"><optgroup label="Specialist">' },
        { en: '<textarea id="symptoms" name="symptoms" rows="4">', vi: '<textarea id="symptoms" name="symptoms" rows="4">' }
      ],
      starter: '<form action="/api/telehealth" method="POST">\n  \n</form>',
      solution: '<form action="/api/telehealth" method="POST">\n  <fieldset>\n    <legend>Telehealth Consultation</legend>\n    <div>\n      <label for="apt-time">Preferred Date & Time</label>\n      <input type="datetime-local" id="apt-time" name="appointment_time" required>\n    </div>\n    <div>\n      <label for="specialty">Medical Specialty</label>\n      <select id="specialty" name="specialty" required>\n        <optgroup label="General Medicine">\n          <option value="gp">General Practitioner</option>\n          <option value="peds">Pediatrics</option>\n        </optgroup>\n        <optgroup label="Specialists">\n          <option value="cardio">Cardiology</option>\n          <option value="derma">Dermatology</option>\n        </optgroup>\n      </select>\n    </div>\n    <div>\n      <label for="symptoms">Describe Symptoms</label>\n      <textarea id="symptoms" name="symptoms" rows="4" required></textarea>\n    </div>\n    <button type="submit">Confirm Appointment</button>\n  </fieldset>\n</form>',
      expEn: 'datetime-local provides native localized calendar and clock pickers.',
      expVi: 'datetime-local cung cấp bộ chọn lịch và đồng hồ theo giờ địa phương chuẩn gốc.'
    },
    {
      id: 'html_ch_10_v2',
      titleEn: 'Variant 2: Audio Mixing Studio Console Controls',
      titleVi: 'Biến thể 2: Bảng điều khiển phòng thu âm thanh',
      descEn: 'Build an audio channel strip form using range sliders with min, max, step, and value attributes.',
      descVi: 'Xây dựng form điều chỉnh kênh âm thanh dùng thanh trượt range với min, max, step và value.',
      requirements: [
        { en: 'Gain: <input type="range" id="gain-ctrl" name="gain" min="0" max="100" step="1" value="80">', vi: 'Gain: <input type="range" id="gain-ctrl" name="gain" min="0" max="100" step="1" value="80">' },
        { en: 'Pan: <input type="range" id="pan-ctrl" name="pan" min="-50" max="50" step="5" value="0">', vi: 'Pan: <input type="range" id="pan-ctrl" name="pan" min="-50" max="50" step="5" value="0">' },
        { en: 'Channel Color: <input type="color" id="chan-color" name="color" value="#ff5500">', vi: 'Channel Color: <input type="color" id="chan-color" name="color" value="#ff5500">' }
      ],
      starter: '<form>\n  \n</form>',
      solution: '<form>\n  <fieldset>\n    <legend>Track Channel Strip</legend>\n    <div>\n      <label for="gain-ctrl">Gain Level (0-100)</label>\n      <input type="range" id="gain-ctrl" name="gain" min="0" max="100" step="1" value="80">\n    </div>\n    <div>\n      <label for="pan-ctrl">Stereo Pan (-50 to +50)</label>\n      <input type="range" id="pan-ctrl" name="pan" min="-50" max="50" step="5" value="0">\n    </div>\n    <div>\n      <label for="chan-color">Track Color Tag</label>\n      <input type="color" id="chan-color" name="color" value="#ff5500">\n    </div>\n  </fieldset>\n</form>',
      expEn: 'Precise step configurations and color pickers enable hardware-style web dashboards.',
      expVi: 'Cấu hình bước nhảy step chính xác và bộ chọn màu giúp tạo bảng điều khiển tương tác chuẩn chuyên nghiệp.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_10_1',
      type: 'single_choice',
      qEn: 'What is the purpose of <fieldset> and <legend> in form design?',
      qVi: 'Mục đích của <fieldset> và <legend> trong thiết kế biểu mẫu là gì?',
      options: [
        { en: 'To group logically related form controls together and provide an accessible group caption (<legend>) for screen readers', vi: 'Để nhóm các ô điều khiển có liên quan với nhau về mặt logic và cung cấp tiêu đề nhóm (<legend>) cho trình đọc màn hình' },
        { en: 'To convert forms into SQL queries', vi: 'Để chuyển đổi form thành câu lệnh SQL' },
        { en: 'To make all inputs bold by default', vi: 'Để làm cho mọi chữ trong ô nhập in đậm' },
        { en: 'To hide all inputs on mobile screens', vi: 'Để ẩn mọi ô nhập trên điện thoại' }
      ],
      ans: 0,
      expEn: '<fieldset> groups controls semantically; <legend> announces the context for all enclosed inputs.',
      expVi: '<fieldset> nhóm các ô điều khiển theo ngữ nghĩa; <legend> thông báo ngữ cảnh của cả nhóm cho người dùng khiếm thị.'
    },
    {
      id: 'html_q_10_2',
      type: 'single_choice',
      qEn: 'How does <datalist> differ from a standard <select> dropdown?',
      qVi: '<datalist> khác với menu thả xuống <select> thông thường ở điểm nào?',
      options: [
        { en: '<datalist> allows users to type ANY custom freeform value while offering optional suggestions, whereas <select> restricts users strictly to predefined options', vi: '<datalist> cho phép người dùng gõ BẤT KỲ giá trị tự do nào kèm gợi ý có sẵn, còn <select> bắt buộc người dùng chỉ được chọn trong danh sách cố định' },
        { en: '<datalist> can only display numbers', vi: '<datalist> chỉ hiển thị được số' },
        { en: '<select> requires JavaScript to work', vi: '<select> cần JavaScript mới chạy được' },
        { en: '<datalist> is deprecated in HTML5', vi: '<datalist> đã bị xóa trong HTML5' }
      ],
      ans: 0,
      expEn: '<datalist> provides non-restrictive autocomplete suggestions for text inputs.',
      expVi: '<datalist> cung cấp gợi ý tự động điền mà không bó buộc người dùng vào danh sách cố định.'
    },
    {
      id: 'html_q_10_3',
      type: 'single_choice',
      qEn: 'What happens if a user selects an option in <select> that has no "value" attribute (e.g. <option>Vietnam</option>)?',
      qVi: 'Điều gì xảy ra nếu người dùng chọn 1 option trong <select> không có thuộc tính "value" (ví dụ <option>Vietnam</option>)?',
      options: [
        { en: 'The browser submits the visible text content of the option ("Vietnam") as the submitted value', vi: 'Trình duyệt sẽ gửi chính văn bản hiển thị ("Vietnam") làm giá trị gửi đi' },
        { en: 'An empty string is submitted', vi: 'Gửi chuỗi rỗng' },
        { en: 'A form error is thrown and submission aborts', vi: 'Báo lỗi form và hủy việc gửi' },
        { en: 'The server crashes', vi: 'Làm sập máy chủ' }
      ],
      ans: 0,
      expEn: 'If value is omitted, the text content of the <option> is used as the submission value.',
      expVi: 'Nếu không có thuộc tính value, nội dung chữ bên trong <option> sẽ được dùng làm giá trị gửi đi.'
    },
    {
      id: 'html_q_10_4',
      type: 'single_choice',
      qEn: 'What does the <optgroup label="..."> element do inside a <select>?',
      qVi: 'Thẻ <optgroup label="..."> làm gì bên trong phần tử <select>?',
      options: [
        { en: 'Creates an unclickable, bold section header to organize related <option> elements into categorized submenus', vi: 'Tạo một tiêu đề phân nhóm in đậm không thể chọn để sắp xếp các <option> theo từng thể loại' },
        { en: 'Selects all child options simultaneously', vi: 'Chọn tất cả các option con cùng một lúc' },
        { en: 'Hides all options inside it until clicked', vi: 'Ẩn tất cả các option bên trong cho tới khi bấm vào' },
        { en: 'Changes the background color of the dropdown', vi: 'Đổi màu nền của menu chọn' }
      ],
      ans: 0,
      expEn: '<optgroup> groups related options under a non-selectable categorical label.',
      expVi: '<optgroup> gom nhóm các tùy chọn lại dưới một nhãn phân loại không thể click chọn.'
    },
    {
      id: 'html_q_10_5',
      type: 'single_choice',
      qEn: 'What is the default visual resize behavior of a <textarea> in desktop browsers?',
      qVi: 'Hành vi co giãn kích thước mặc định của <textarea> trên trình duyệt máy tính là gì?',
      options: [
        { en: 'Users can freely resize it both horizontally and vertically using a drag handle in the bottom-right corner', vi: 'Người dùng có thể tự do kéo co giãn cả chiều ngang và chiều dọc bằng nút kéo ở góc dưới bên phải' },
        { en: 'It is strictly locked and cannot be resized', vi: 'Nó bị khóa cứng và không thể co giãn' },
        { en: 'It resizes automatically based on font size only', vi: 'Nó chỉ tự co giãn theo cỡ chữ' },
        { en: 'It opens full screen when clicked', vi: 'Nó mở toàn màn hình khi nhấp vào' }
      ],
      ans: 0,
      expEn: 'Modern browsers provide a bidirectional drag resize handle on <textarea> by default (controllable via CSS resize: vertical/none).',
      expVi: 'Trình duyệt mặc định cung cấp nút kéo co giãn hai chiều trên <textarea> (có thể điều khiển qua CSS resize: vertical/none).'
    },
    {
      id: 'html_q_10_6',
      type: 'single_choice',
      qEn: 'Which input type provides a native date picker without time selection?',
      qVi: 'Kiểu input nào cung cấp bộ chọn ngày tháng (không kèm giờ)?',
      options: [
        { en: 'type="date"', vi: 'type="date"' },
        { en: 'type="datetime"', vi: 'type="datetime"' },
        { en: 'type="calendar"', vi: 'type="calendar"' },
        { en: 'type="day"', vi: 'type="day"' }
      ],
      ans: 0,
      expEn: 'type="date" allows year, month, and day selection in format YYYY-MM-DD.',
      expVi: 'type="date" cho phép chọn năm, tháng, ngày theo định dạng chuẩn YYYY-MM-DD.'
    },
    {
      id: 'html_q_10_7',
      type: 'single_choice',
      qEn: 'Which input type provides a combined date and time picker in local user timezone without UTC offset?',
      qVi: 'Kiểu input nào cung cấp bộ chọn cả ngày và giờ theo múi giờ địa phương của người dùng?',
      options: [
        { en: 'type="datetime-local"', vi: 'type="datetime-local"' },
        { en: 'type="datetime"', vi: 'type="datetime"' },
        { en: 'type="timestamp"', vi: 'type="timestamp"' },
        { en: 'type="date-time"', vi: 'type="date-time"' }
      ],
      ans: 0,
      expEn: 'type="datetime-local" is the standard HTML5 control for local date and time input.',
      expVi: 'type="datetime-local" là điều khiển chuẩn HTML5 để chọn ngày và giờ địa phương.'
    },
    {
      id: 'html_q_10_8',
      type: 'single_choice',
      qEn: 'What attributes control the minimum, maximum, increment step, and default position of an <input type="range"> slider?',
      qVi: 'Những thuộc tính nào quản lý giá trị tối thiểu, tối đa, bước nhảy và vị trí mặc định của thanh trượt <input type="range">?',
      options: [
        { en: 'min, max, step, and value', vi: 'min, max, step, và value' },
        { en: 'start, end, jump, and current', vi: 'start, end, jump, và current' },
        { en: 'low, high, interval, and default', vi: 'low, high, interval, và default' },
        { en: 'floor, ceiling, delta, and pos', vi: 'floor, ceiling, delta, và pos' }
      ],
      ans: 0,
      expEn: 'min, max, step, and value define the numerical boundaries and step intervals of ranges.',
      expVi: 'min, max, step, và value xác định giới hạn số học và khoảng bước nhảy của thanh trượt.'
    },
    {
      id: 'html_q_10_9',
      type: 'single_choice',
      qEn: 'What input type opens the operating system\'s native color wheel/swatch palette?',
      qVi: 'Kiểu input nào mở bảng màu/bánh xe màu sắc của hệ điều hành?',
      options: [
        { en: 'type="color"', vi: 'type="color"' },
        { en: 'type="palette"', vi: 'type="palette"' },
        { en: 'type="rgb"', vi: 'type="rgb"' },
        { en: 'type="hex"', vi: 'type="hex"' }
      ],
      ans: 0,
      expEn: 'type="color" provides a color picker interface returning a 7-character hexadecimal string (e.g. #ff0000).',
      expVi: 'type="color" mở hộp chọn màu và trả về chuỗi mã màu hex 7 ký tự (như #ff0000).'
    },
    {
      id: 'html_q_10_10',
      type: 'single_choice',
      qEn: 'What does the "selected" attribute do on an <option> tag in <select>?',
      qVi: 'Thuộc tính "selected" trên thẻ <option> trong <select> có tác dụng gì?',
      options: [
        { en: 'Pre-selects that option as the default active choice on initial page load', vi: 'Chọn sẵn tùy chọn đó làm lựa chọn mặc định khi trang vừa tải xong' },
        { en: 'Disables the option so no one can select it', vi: 'Vô hiệu hóa tùy chọn khiến không ai chọn được' },
        { en: 'Deletes the option from the list', vi: 'Xóa tùy chọn khỏi danh sách' },
        { en: 'Makes the option blink with CSS animation', vi: 'Làm cho tùy chọn nhấp nháy' }
      ],
      ans: 0,
      expEn: 'selected defines the default choice in a <select> menu.',
      expVi: 'selected định nghĩa mục được chọn mặc định trong menu <select>.'
    },
    {
      id: 'html_q_10_11',
      type: 'single_choice',
      qEn: 'How can you prevent a user from selecting a placeholder prompt like "-- Choose an option --" in a required <select>?',
      qVi: 'Làm thế nào để ngăn người dùng chọn lại mục gợi ý như "-- Chọn một mục --" trong thẻ <select required>?',
      options: [
        { en: 'Add value="" and disabled selected to that option: <option value="" disabled selected>-- Choose an option --</option>', vi: 'Thêm value="" và disabled selected vào option đó: <option value="" disabled selected>-- Chọn một mục --</option>' },
        { en: 'Delete the option tag', vi: 'Xóa thẻ option đi' },
        { en: 'Set hidden="all" on the select', vi: 'Đặt hidden="all" trên thẻ select' },
        { en: 'Use JavaScript to block mouse movements', vi: 'Dùng JavaScript chặn di chuột' }
      ],
      ans: 0,
      expEn: '<option value="" disabled selected> acts as an unselectable placeholder prompt that fails required validation until changed.',
      expVi: '<option value="" disabled selected> đóng vai trò là gợi ý mẫu không thể chọn lại và bắt buộc người dùng phải chọn mục khác.'
    },
    {
      id: 'html_q_10_12',
      type: 'single_choice',
      qEn: 'What does the "rows" and "cols" attributes specify on a <textarea>?',
      qVi: 'Các thuộc tính "rows" và "cols" chỉ định điều gì trên thẻ <textarea>?',
      options: [
        { en: 'The visible vertical height in lines (rows) and horizontal width in average character widths (cols)', vi: 'Chiều cao hiển thị tính bằng số dòng (rows) và chiều rộng tính bằng số ký tự trung bình (cols)' },
        { en: 'The database row and column IDs in SQL', vi: 'Mã dòng và cột trong cơ sở dữ liệu SQL' },
        { en: 'The maximum allowed words in the essay', vi: 'Số từ tối đa cho phép trong bài văn' },
        { en: 'The margin and padding in pixels', vi: 'Khoảng cách viền và lề tính bằng pixel' }
      ],
      ans: 0,
      expEn: 'rows sets visible lines of text; cols sets the visible width in character units.',
      expVi: 'rows thiết lập số dòng hiển thị; cols thiết lập chiều rộng hiển thị theo số ký tự.'
    },
    {
      id: 'html_q_10_13',
      type: 'single_choice',
      qEn: 'What is the format of the value submitted by <input type="time">?',
      qVi: 'Định dạng của giá trị được gửi bởi <input type="time"> là gì?',
      options: [
        { en: '24-hour time string in "HH:MM" format (e.g. "14:30")', vi: 'Chuỗi thời gian 24 giờ theo định dạng "HH:MM" (như "14:30")' },
        { en: '12-hour AM/PM string with spaces (e.g. "02:30 PM")', vi: 'Chuỗi 12 giờ AM/PM có khoảng trắng (như "02:30 PM")' },
        { en: 'Unix timestamp milliseconds', vi: 'Mili-giây theo Unix timestamp' },
        { en: 'Number of seconds since midnight', vi: 'Số giây tính từ nửa đêm' }
      ],
      ans: 0,
      expEn: 'type="time" serializes to military 24-hour HH:MM strings.',
      expVi: 'type="time" chuẩn hóa dữ liệu gửi đi dưới dạng chuỗi 24 giờ HH:MM.'
    },
    {
      id: 'html_q_10_14',
      type: 'single_choice',
      qEn: 'What happens if a browser does not support a newer input type like type="color" or type="date"?',
      qVi: 'Điều gì xảy ra nếu trình duyệt cũ không hỗ trợ kiểu input mới như type="color" hay type="date"?',
      options: [
        { en: 'It gracefully falls back to a standard <input type="text"> text box', vi: 'Nó tự động hạ cấp xuống thành ô nhập văn bản thông thường <input type="text">' },
        { en: 'The page crashes with a fatal error', vi: 'Trang web bị treo với lỗi nghiêm trọng' },
        { en: 'The input element is deleted from the page', vi: 'Ô nhập bị xóa khỏi trang web' },
        { en: 'The entire form is disabled', vi: 'Toàn bộ form bị vô hiệu hóa' }
      ],
      ans: 0,
      expEn: 'HTML5 specifies that unrecognized input types gracefully degrade to standard text inputs.',
      expVi: 'HTML5 quy định rằng mọi kiểu input không được nhận diện sẽ tự động chuyển thành ô nhập text.'
    },
    {
      id: 'html_q_10_15',
      type: 'single_choice',
      qEn: 'Can an <input type="file"> accept only specific file extensions (such as .pdf and .docx)?',
      qVi: 'Thẻ <input type="file"> có thể giới hạn chỉ nhận một số đuôi tệp cụ thể (như .pdf và .docx) không?',
      options: [
        { en: 'Yes, using the accept attribute: accept=".pdf,.docx"', vi: 'Có, dùng thuộc tính accept: accept=".pdf,.docx"' },
        { en: 'No, all file inputs must accept all file types', vi: 'Không, ô chọn tệp luôn phải nhận mọi loại tệp' },
        { en: 'Only if running on macOS', vi: 'Chỉ khi chạy trên hệ điều hành macOS' },
        { en: 'Only with server-side PHP scripts', vi: 'Chỉ khi có mã PHP ở máy chủ' }
      ],
      ans: 0,
      expEn: 'The accept attribute filters allowed MIME types or file extensions in the file chooser dialog.',
      expVi: 'Thuộc tính accept lọc các loại MIME hoặc đuôi tệp được phép chọn trong hộp thoại tệp tin.'
    },
    {
      id: 'html_q_10_16',
      type: 'single_choice',
      qEn: 'What attribute allows selecting multiple files at once in an <input type="file">?',
      qVi: 'Thuộc tính nào cho phép người dùng chọn cùng lúc nhiều tệp trong <input type="file">?',
      options: [
        { en: 'multiple', vi: 'multiple' },
        { en: 'multiselect', vi: 'multiselect' },
        { en: 'batch="true"', vi: 'batch="true"' },
        { en: 'allow-many', vi: 'allow-many' }
      ],
      ans: 0,
      expEn: 'The multiple boolean attribute allows users to upload multiple files in a single file picker.',
      expVi: 'Thuộc tính boolean multiple cho phép người dùng tải lên nhiều tệp cùng lúc.'
    }
  ]
};

console.log('Lesson 10 defined.');
