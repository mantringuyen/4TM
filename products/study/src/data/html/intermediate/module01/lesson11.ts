import { Lesson } from '../../../../types';

export const lesson11: Lesson = {
  id: 'html_lesson_11',
  moduleId: 'html_mod_3',
  levelId: 'intermediate',
  courseId: 'html',
  order: 11,
  topicId: 'html_advanced_inputs',
  title: {
    en: 'Advanced Form Controls: select, datalist, textarea, progress & meter',
    vi: 'Điều Khiển Biểu Mẫu Nâng Cao: select, datalist, textarea, progress & meter'
  },
  summary: {
    en: 'Master advanced native HTML5 input controls: categorized dropdown <select> with <optgroup>, predictive autocomplete with <datalist>, multi-line <textarea>, range sliders (<input type="range">), date/time/color pickers, progress meters (<progress>), and scalar gauge indicators (<meter>).',
    vi: 'Làm chủ các điều khiển biểu mẫu nâng cao: danh sách chọn <select> có phân nhóm <optgroup>, tự động gợi ý <datalist>, nhập văn bản nhiều dòng <textarea>, thanh trượt <input type="range">, bộ chọn ngày giờ màu sắc, thanh tiến độ <progress> và thước đo định lượng <meter>.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Modern HTML5 delivers rich, native input widgets and indicators that eliminate the need for heavy external JavaScript UI plugins, ensuring fluid keyboard traversal and cross-device accessibility.',
      vi: 'HTML5 hiện đại cung cấp các widget nhập liệu và chỉ báo phong phú, giúp loại bỏ các plugin giao diện JavaScript cồng kềnh, mang lại khả năng duyệt phím mượt mà và tương thích tốt trên mọi thiết bị.'
    },
    conceptExplanation: {
      en: '1. **Categorized Dropdowns (`<select>` & `<optgroup>`)**:\n   - `<select name="role">` with `<option value="admin">Administrator</option>`.\n   - Group options logically with `<optgroup label="Engineering">`.\n\n2. **Predictive Typeahead (`<datalist>`)**:\n   - Pair an `<input list="browsers">` with `<datalist id="browsers"><option value="Chrome">...</datalist>`.\n   - Offers autocomplete suggestions while still allowing users to type custom freeform values.\n\n3. **Multi-line Text (`<textarea>`)**:\n   - `<textarea name="bio" rows="4" cols="50">`: Use `rows` and `cols` for baseline sizing; adjust with CSS.\n\n4. **Range & Pickers**:\n   - `<input type="range" min="0" max="100" step="5">`: Smooth tactile slider.\n   - Specialized types: `date`, `time`, `datetime-local`, `color`.\n\n5. **Indicators: `<progress>` vs `<meter>`**:\n   - `<progress value="75" max="100">`: Task completion percentage (e.g. upload progress).\n   - `<meter value="85" min="0" max="100" low="30" high="80" optimum="50">`: Scalar measurement in a known range (e.g. disk space, battery level).',
      vi: '1. **Danh sách chọn phân nhóm (`<select>` & `<optgroup>`)**:\n   - `<select name="role">` chứa các `<option value="admin">Quản trị viên</option>`.\n   - Gom nhóm lựa chọn với `<optgroup label="Kỹ thuật">`.\n\n2. **Gợi ý tự động (`<datalist>`)**:\n   - Kết hợp `<input list="browsers">` với `<datalist id="browsers"><option value="Chrome">...</datalist>`.\n   - Cung cấp gợi ý khi gõ mà vẫn cho phép người dùng nhập giá trị tự do bất kỳ.\n\n3. **Văn bản nhiều dòng (`<textarea>`)**:\n   - `<textarea name="bio" rows="4" cols="50">`: Khai báo số hàng `rows` và cột `cols` cơ bản; điều chỉnh thêm bằng CSS.\n\n4. **Thanh trượt & Bộ chọn**:\n   - `<input type="range" min="0" max="100" step="5">`: Thanh trượt điều chỉnh mức độ.\n   - Các loại chuyên dụng: `date`, `time`, `datetime-local`, `color`.\n\n5. **Thanh chỉ báo: `<progress>` vs `<meter>`**:\n   - `<progress value="75" max="100">`: Tiến độ hoàn thành công việc (vd: tiến độ tải tệp).\n   - `<meter value="85" min="0" max="100" low="30" high="80" optimum="50">`: Đo lường giá trị trong một thang đo xác định (vd: dung lượng ổ đĩa, pin).'
    },
    syntax: `<!-- Datalist Autocomplete -->
<label for="country-choice">Select Country</label>
<input list="countries" id="country-choice" name="country">
<datalist id="countries">
  <option value="Vietnam">
  <option value="United States">
  <option value="Japan">
</datalist>

<!-- Indicators -->
<label for="disk">Disk Usage:</label>
<meter id="disk" value="82" min="0" max="100" low="30" high="80" optimum="20">82%</meter>`,
    examples: [
      {
        title: {
          en: 'Categorized Select Dropdown with Optgroups',
          vi: 'Danh Sách Chọn Phân Nhóm Với Optgroup'
        },
        code: `<label for="tech-stack">Select Primary Technology</label>
<select id="tech-stack" name="technology">
  <optgroup label="Frontend Frameworks">
    <option value="react">React</option>
    <option value="vue">Vue</option>
  </optgroup>
  <optgroup label="Backend Engines">
    <option value="node">Node.js</option>
    <option value="go">Go</option>
  </optgroup>
</select>`,
        language: 'html',
        explanation: {
          en: 'Demonstrates optgroup for clean semantic categorization of select dropdown items.',
          vi: 'Minh họa cách dùng optgroup để phân loại gọn gàng các mục trong danh sách chọn select.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Confusing <progress> with <meter>',
          vi: 'Nhầm lẫn giữa thẻ <progress> và thẻ <meter>'
        },
        correction: {
          en: 'Use <progress> for progression towards task completion (e.g., file upload progress). Use <meter> for a static scalar measurement within a known range (e.g., disk usage, CPU temp).',
          vi: 'Dùng <progress> cho tiến độ hoàn thành một tác vụ (vd: tải tệp lên). Dùng <meter> cho giá trị đo lường trong thang đo tĩnh (vd: dung lượng ổ đĩa, nhiệt độ CPU).'
        },
        code: '<!-- Correct: <progress value="50" max="100">50%</progress> vs <meter value="7" min="0" max="10">7/10</meter> -->'
      },
      {
        mistake: {
          en: 'Placing placeholder text inside <textarea> tags instead of the placeholder attribute',
          vi: 'Đặt văn bản gợi ý làm nội dung giữa cặp thẻ <textarea>...</textarea> thay vì dùng thuộc tính placeholder'
        },
        correction: {
          en: 'Any text placed between <textarea> tags becomes the actual pre-filled value submitted by the user. Use placeholder="Hint text" instead.',
          vi: 'Văn bản nằm giữa cặp thẻ <textarea> sẽ bị coi là giá trị người dùng nhập và được gửi đi. Hãy dùng thuộc tính placeholder="Gợi ý".'
        },
        code: '<!-- Correct: <textarea id="desc" name="desc" placeholder="Enter comments..."></textarea> -->'
      }
    ],
    tips: [
      {
        en: 'Always include fallback text inside <progress> and <meter> elements (e.g. <meter value="80" max="100">80%</meter>) for older browsers and screen readers.',
        vi: 'Luôn kèm theo văn bản dự phòng bên trong thẻ <progress> và <meter> (vd: <meter value="80" max="100">80%</meter>) cho trình duyệt cũ và trình đọc màn hình.'
      }
    ],
    practice: {
      task: {
        en: 'Implement an Autocomplete Datalist and Metric Meter',
        vi: 'Triển Khai Gợi Ý Datalist Và Thước Đo Meter'
      },
      instruction: {
        en: 'Create a text input with list="cities-list" paired with a <datalist id="cities-list"> containing options for "Tokyo", "London", and "New York". Below it, add a <meter id="cpu" min="0" max="100" value="65">65%</meter>.',
        vi: 'Tạo ô input text có list="cities-list" liên kết với <datalist id="cities-list"> chứa các option "Tokyo", "London" và "New York". Phía dưới, thêm <meter id="cpu" min="0" max="100" value="65">65%</meter>.'
      },
      starterCode: '<!-- Build datalist and meter -->\n',
      solutionCode: `<label for="city-input">Choose Destination City</label>
<input type="text" id="city-input" list="cities-list" name="city">
<datalist id="cities-list">
  <option value="Tokyo">
  <option value="London">
  <option value="New York">
</datalist>

<label for="cpu">System Load</label>
<meter id="cpu" min="0" max="100" value="65">65%</meter>`,
      requiredPatterns: [
        'list="cities-list"',
        '<datalist id="cities-list">',
        '<option value="Tokyo">',
        '<meter id="cpu"',
        'min="0"',
        'max="100"',
        'value="65">'
      ],
      hint: {
        en: 'Match the input\'s list attribute to the datalist\'s id attribute.',
        vi: 'Khớp thuộc tính list của input với id của datalist.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Build a Multi-Tier Category Selector with Textarea Feedback',
        vi: 'Xây Dựng Bộ Chọn Danh Mục Phân Nhóm Kèm Ô Đóng Góp Ý Kiến Textarea'
      },
      instruction: {
        en: 'Create a <select id="dept" name="department"> with two <optgroup> elements ("Engineering" and "Design"), and a <textarea id="feedback" name="feedback" rows="4" placeholder="Your feedback..."></textarea>.',
        vi: 'Tạo <select id="dept" name="department"> có 2 thẻ <optgroup> ("Engineering" và "Design"), cùng một thẻ <textarea id="feedback" name="feedback" rows="4" placeholder="Your feedback..."></textarea>.'
      },
      starterCode: '<!-- Build categorized select with textarea -->\n',
      solutionCode: `<div>
  <label for="dept">Select Department</label>
  <select id="dept" name="department">
    <optgroup label="Engineering">
      <option value="frontend">Frontend Architecture</option>
      <option value="cloud">Cloud Infrastructure</option>
    </optgroup>
    <optgroup label="Design">
      <option value="ui">UI/UX Systems</option>
      <option value="brand">Brand Strategy</option>
    </optgroup>
  </select>
</div>

<div>
  <label for="feedback">Detailed Assessment</label>
  <textarea id="feedback" name="feedback" rows="4" placeholder="Your feedback..."></textarea>
</div>`,
      requiredPatterns: [
        '<select id="dept" name="department">',
        '<optgroup label="Engineering">',
        '<optgroup label="Design">',
        '<textarea id="feedback" name="feedback" rows="4"'
      ],
      hint: {
        en: 'Wrap option tags inside optgroups and pair with a textarea.',
        vi: 'Bọc các thẻ option trong optgroup và ghép nối với textarea.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_10_1',
      type: 'complete_code',
      title: {
        en: 'Connect Datalist to Text Input',
        vi: 'Liên Kết Datalist Với Ô Nhập Văn Bản'
      },
      instruction: {
        en: 'Add list="frameworks" to the input element so it links to the datalist.',
        vi: 'Thêm list="frameworks" vào thẻ input để liên kết với datalist.'
      },
      starterCode: `<input type="text" id="fw" name="framework">
<datalist id="frameworks">
  <option value="React">
  <option value="Vue">
</datalist>`,
      solutionCode: `<input type="text" id="fw" name="framework" list="frameworks">
<datalist id="frameworks">
  <option value="React">
  <option value="Vue">
</datalist>`,
      hint: {
        en: 'Add list="frameworks" to the input.',
        vi: 'Thêm list="frameworks" vào thẻ input.'
      },
      explanation: {
        en: 'The list attribute ties the input to the datalist recommendations.',
        vi: 'Thuộc tính list kết nối ô nhập với danh sách gợi ý trong datalist.'
      }
    },
    {
      id: 'html_ex_10_2',
      type: 'fix_code',
      title: {
        en: 'Fix Incorrect Pre-filled Textarea Value',
        vi: 'Sửa Lỗi Gán Giá Trị Gợi Ý Cho Textarea'
      },
      instruction: {
        en: 'Change the text inside the <textarea> tags to use a placeholder="Write notes here..." attribute instead so the textarea starts empty.',
        vi: 'Đổi văn bản nằm trong thẻ <textarea> thành thuộc tính placeholder="Write notes here..." để ô textarea khởi đầu rỗng.'
      },
      starterCode: '<textarea id="notes" name="notes">Write notes here...</textarea>',
      solutionCode: '<textarea id="notes" name="notes" placeholder="Write notes here..."></textarea>',
      hint: {
        en: 'Empty the inner content of <textarea></textarea> and add placeholder="Write notes here...".',
        vi: 'Làm rỗng nội dung giữa <textarea></textarea> và thêm placeholder="Write notes here...".'
      },
      explanation: {
        en: 'Inner text becomes user submitted value; placeholder provides temporary ghost hints.',
        vi: 'Văn bản bên trong thẻ sẽ trở thành dữ liệu gửi đi; placeholder chỉ là chữ gợi ý mờ.'
      }
    },
    {
      id: 'html_ex_10_3',
      type: 'write_code',
      title: {
        en: 'Write Upload Progress Indicator',
        vi: 'Tạo Thanh Tiến Độ Tải Tệp Lên'
      },
      instruction: {
        en: 'Write a <progress id="upload-bar" max="100" value="45">45%</progress> element.',
        vi: 'Viết phần tử <progress id="upload-bar" max="100" value="45">45%</progress>.'
      },
      starterCode: '<!-- Write progress bar -->\n',
      solutionCode: '<progress id="upload-bar" max="100" value="45">45%</progress>',
      hint: {
        en: 'Use <progress id="upload-bar" max="100" value="45">45%</progress>.',
        vi: 'Dùng cú pháp <progress id="upload-bar" max="100" value="45">45%</progress>.'
      },
      explanation: {
        en: '<progress> tracks dynamic task progression with fallback text for accessibility.',
        vi: '<progress> theo dõi tiến độ công việc kèm văn bản dự phòng cho trợ năng.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_10',
    title: {
      en: 'Advanced Multi-Metric Dashboard Configuration Panel',
      vi: 'Bảng Điều Khiển Cấu Hình Hệ Thống Đa Chỉ Số Nâng Cao'
    },
    description: {
      en: 'Construct a rich interactive configuration dashboard panel featuring an autocomplete datalist currency selector, a categorized cloud tier select dropdown, a range slider sensitivity controller, a real-time disk storage gauge meter, and a backup progress indicator.',
      vi: 'Xây dựng bảng điều khiển cấu hình tương tác phong phú gồm bộ chọn tiền tệ datalist, danh sách phân nhóm optgroup, thanh trượt range, thước đo dung lượng meter và thanh tiến độ backup progress.'
    },
    requirements: [
      {
        en: '<input list="currency-list"> paired with <datalist id="currency-list">',
        vi: '<input list="currency-list"> liên kết với <datalist id="currency-list">'
      },
      {
        en: '<select> with at least two <optgroup> categories',
        vi: '<select> có ít nhất 2 nhóm phân loại <optgroup>'
      },
      {
        en: '<input type="range" min="0" max="100" step="5">',
        vi: '<input type="range" min="0" max="100" step="5">'
      },
      {
        en: '<meter> displaying resource usage with min, max, and value',
        vi: '<meter> hiển thị dung lượng sử dụng có min, max và value'
      },
      {
        en: '<progress> displaying task completion status with fallback text',
        vi: '<progress> hiển thị trạng thái hoàn thành kèm chữ dự phòng'
      }
    ],
    starterCode: '<!-- Build advanced configuration panel -->\n',
    solutionCode: `<form action="/api/settings" method="POST">
  <fieldset>
    <legend>Regional & Currency Preferences</legend>
    <div>
      <label for="currency-input">Billing Currency</label>
      <input type="text" id="currency-input" name="currency" list="currencies">
      <datalist id="currencies">
        <option value="USD - US Dollar">
        <option value="EUR - Euro">
        <option value="VND - Vietnamese Dong">
      </datalist>
    </div>

    <div>
      <label for="cluster-tier">Compute Cluster Tier</label>
      <select id="cluster-tier" name="tier">
        <optgroup label="Shared Resources">
          <option value="basic">Standard Micro (1 vCPU, 2GB RAM)</option>
          <option value="general">General Compute (4 vCPU, 16GB RAM)</option>
        </optgroup>
        <optgroup label="Dedicated High-Performance">
          <option value="memory">High Memory (16 vCPU, 128GB RAM)</option>
          <option value="accelerated">GPU Accelerated (NVIDIA H100)</option>
        </optgroup>
      </select>
    </div>
  </fieldset>

  <fieldset>
    <legend>System Telemetry & Metrics</legend>
    <div>
      <label for="alert-threshold">Alert Sensitivity Threshold</label>
      <input type="range" id="alert-threshold" name="sensitivity" min="0" max="100" step="5" value="75">
    </div>

    <div>
      <label for="storage-meter">NVMe Storage Occupancy</label>
      <meter id="storage-meter" min="0" max="500" value="380" low="150" high="400" optimum="100">380 GB / 500 GB</meter>
    </div>

    <div>
      <label for="backup-progress">Nightly Backup Synchronization</label>
      <progress id="backup-progress" max="100" value="88">88%</progress>
    </div>
  </fieldset>

  <button type="submit">Save Dashboard Preferences</button>
</form>`,
    hints: [
      {
        en: 'Ensure all inputs and widgets are enclosed within appropriate fieldsets with matching labels.',
        vi: 'Đảm bảo tất cả các input và widget được đặt trong fieldset tương ứng kèm nhãn label đầy đủ.'
      }
    ],
    solutionExplanation: {
      en: 'Combines the full suite of HTML5 advanced input widgets and indicators into a cohesive, accessible administrative interface.',
      vi: 'Kết hợp toàn bộ các widget nhập liệu và chỉ báo nâng cao của HTML5 vào một giao diện quản trị tiếp cận chuẩn mực.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_10_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference between a <select> dropdown and an <input list="..."> with a <datalist>?',
        vi: 'Điểm khác biệt cốt lõi giữa danh sách chọn <select> và ô nhập <input list="..."> kèm <datalist> là gì?'
      },
      options: [
        {
          en: '<select> restricts the user strictly to the predefined options, whereas <datalist> provides predictive autocomplete suggestions while still allowing freeform user input',
          vi: '<select> giới hạn người dùng chỉ được chọn các mục định sẵn, trong khi <datalist> cung cấp gợi ý tự động nhưng vẫn cho phép nhập giá trị tùy do bất kỳ'
        },
        {
          en: '<datalist> only works with numeric values',
          vi: '<datalist> chỉ hoạt động với giá trị số'
        },
        {
          en: '<select> requires JavaScript to render',
          vi: '<select> bắt buộc phải có JavaScript mới hiển thị được'
        },
        {
          en: '<datalist> is deprecated in HTML5',
          vi: '<datalist> đã bị khai tử trong HTML5'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<datalist> enhances an input with suggestions without locking input to only those values.',
        vi: '<datalist> bổ sung gợi ý cho ô nhập mà không ép người dùng chỉ được chọn các giá trị đó.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_10_2',
      type: 'single_choice',
      question: {
        en: 'When should you use the <meter> element instead of the <progress> element?',
        vi: 'Khi nào bạn nên dùng phần tử <meter> thay vì phần tử <progress>?'
      },
      options: [
        {
          en: 'When measuring a scalar quantity or gauge value within a known fixed range (e.g. disk usage, thermometer temperature, exam grade)',
          vi: 'Khi đo lường một đại lượng vô hướng hoặc giá trị đo đạc trong một thang đo cố định (vd: dung lượng ổ đĩa, nhiệt độ kế, điểm thi)'
        },
        {
          en: 'When showing file download progression over time',
          vi: 'Khi hiển thị tiến trình tải tệp theo thời gian'
        },
        {
          en: 'When playing an MP3 audio file',
          vi: 'Khi phát tệp âm thanh MP3'
        },
        {
          en: 'When creating an interactive calendar',
          vi: 'Khi tạo lịch tương tác'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<meter> represents static gauge measurements within known bounds; <progress> represents dynamic task progression.',
        vi: '<meter> đại diện cho thước đo trong thang đo xác định; <progress> đại diện cho tiến trình hoàn thành tác vụ.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'medium'
    },
    {
      id: 'html_q_10_3',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the <optgroup> element inside a <select>?',
        vi: 'Mục đích của thẻ <optgroup> bên trong <select> là gì?'
      },
      options: [
        {
          en: 'Creates a non-selectable categorical section header that groups related <option> items together',
          vi: 'Tạo tiêu đề danh mục không thể bấm chọn để gom nhóm các thẻ <option> có liên quan lại với nhau'
        },
        {
          en: 'Allows selecting multiple options simultaneously',
          vi: 'Cho phép chọn nhiều mục cùng lúc'
        },
        {
          en: 'Converts the dropdown into radio buttons',
          vi: 'Chuyển danh sách chọn thành các nút radio'
        },
        {
          en: 'Sorts options alphabetically in reverse',
          vi: 'Sắp xếp các option theo thứ tự ngược bảng chữ cái'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<optgroup label="..."> groups options visually and programmatically for accessibility.',
        vi: '<optgroup label="..."> phân nhóm các option về mặt thị giác và cấu trúc trợ năng.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_10_4',
      type: 'single_choice',
      question: {
        en: 'How do you set a default initial value for a multi-line <textarea> element?',
        vi: 'Làm thế nào để đặt giá trị ban đầu mặc định cho thẻ <textarea>?'
      },
      options: [
        {
          en: 'Place the text directly between the opening <textarea> and closing </textarea> tags',
          vi: 'Đặt văn bản trực tiếp giữa thẻ mở <textarea> và thẻ đóng </textarea>'
        },
        {
          en: 'Use the value="Initial text" attribute',
          vi: 'Dùng thuộc tính value="Initial text"'
        },
        {
          en: 'Use the default="Initial text" attribute',
          vi: 'Dùng thuộc tính default="Initial text"'
        },
        {
          en: 'Use the data-val="Initial text" attribute',
          vi: 'Dùng thuộc tính data-val="Initial text"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Unlike <input>, <textarea> does not support a value attribute; initial text is placed inside the element body.',
        vi: 'Khác với <input>, <textarea> không dùng thuộc tính value; văn bản mặc định được đặt ngay trong thân thẻ.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_10_5',
      type: 'single_choice',
      question: {
        en: 'What does the step attribute control on an <input type="range"> slider?',
        vi: 'Thuộc tính step kiểm soát điều gì trên thanh trượt <input type="range">?'
      },
      options: [
        {
          en: 'The incremental granularity and snapping step between the min and max bounds',
          vi: 'Khoảng cách bước nhảy gia tăng giữa giá trị min và max khi kéo trượt'
        },
        {
          en: 'The animation speed of the slider thumb in seconds',
          vi: 'Tốc độ hoạt ảnh của con trượt tính bằng giây'
        },
        {
          en: 'The width of the slider track in pixels',
          vi: 'Độ rộng của rãnh trượt tính bằng pixel'
        },
        {
          en: 'The number of mouse clicks required to focus the slider',
          vi: 'Số lần nhấp chuột cần thiết để focus thanh trượt'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'step sets the interval size for valid slider thumb values.',
        vi: 'step thiết lập kích thước bước nhảy cho các giá trị hợp lệ khi kéo thanh trượt.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_10_6',
      type: 'single_choice',
      question: {
        en: 'What input type is designed to let users visually pick a hexadecimal color (#RRGGBB)?',
        vi: 'Loại input nào được thiết kế để người dùng chọn màu sắc dạng mã hex (#RRGGBB)?'
      },
      options: [
        {
          en: 'type="color"',
          vi: 'type="color"'
        },
        {
          en: 'type="hex"',
          vi: 'type="hex"'
        },
        {
          en: 'type="palette"',
          vi: 'type="palette"'
        },
        {
          en: 'type="rgb"',
          vi: 'type="rgb"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<input type="color"> launches the native operating system color picker dialog.',
        vi: '<input type="color"> kích hoạt hộp thoại chọn màu gốc của hệ điều hành.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_10_7',
      type: 'single_choice',
      question: {
        en: 'Why is fallback text placed inside <progress> and <meter> elements (e.g. <progress value="50" max="100">50%</progress>)?',
        vi: 'Tại sao nên đặt văn bản dự phòng bên trong thẻ <progress> và <meter> (vd: <progress value="50" max="100">50%</progress>)?'
      },
      options: [
        {
          en: 'To provide a readable text representation for legacy browsers that do not support the elements, and to enhance accessibility',
          vi: 'Để hiển thị văn bản cho các trình duyệt cũ không hỗ trợ thẻ và tăng cường khả năng tiếp cận trợ năng'
        },
        {
          en: 'To translate the gauge into binary code',
          vi: 'Để dịch thước đo sang mã nhị phân'
        },
        {
          en: 'To trigger JavaScript alert dialogs',
          vi: 'Để kích hoạt hộp thoại alert JavaScript'
        },
        {
          en: 'It is required to change the bar color in CSS',
          vi: 'Bắt buộc phải có để đổi màu thanh tiến độ trong CSS'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Inner text acts as fallback content when the element cannot be rendered natively.',
        vi: 'Văn bản bên trong đóng vai trò là nội dung dự phòng khi trình duyệt không thể hiển thị thẻ gốc.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'easy'
    },
    {
      id: 'html_q_10_8',
      type: 'single_choice',
      question: {
        en: 'What HTML5 input type provides both a date picker and a time picker without timezone offsets?',
        vi: 'Loại input HTML5 nào cung cấp cả bộ chọn ngày và bộ chọn giờ mà không kèm múi giờ?'
      },
      options: [
        {
          en: 'type="datetime-local"',
          vi: 'type="datetime-local"'
        },
        {
          en: 'type="date-time"',
          vi: 'type="date-time"'
        },
        {
          en: 'type="timestamp"',
          vi: 'type="timestamp"'
        },
        {
          en: 'type="clock"',
          vi: 'type="clock"'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'type="datetime-local" lets users pick date and time without timezone adjustment.',
        vi: 'type="datetime-local" cho phép người dùng chọn cả ngày và giờ theo múi giờ địa phương.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'medium'
    },
    {
      id: 'html_q_10_9',
      type: 'single_choice',
      question: {
        en: 'What happens to a <progress> element if the value attribute is omitted?',
        vi: 'Điều gì xảy ra với thẻ <progress> nếu bỏ qua thuộc tính value?'
      },
      options: [
        {
          en: 'It renders in an indeterminate state (e.g. an animated bouncing bar indicating ongoing activity of unknown duration)',
          vi: 'Nó hiển thị ở trạng thái vô định (thanh chuyển động lặp lại báo hiệu tiến trình đang chạy mà chưa rõ thời lượng)'
        },
        {
          en: 'The element disappears completely',
          vi: 'Phần tử biến mất hoàn toàn'
        },
        {
          en: 'The value defaults to 100%',
          vi: 'Giá trị tự động mặc định là 100%'
        },
        {
          en: 'An error is thrown in browser console',
          vi: 'Báo lỗi trong console trình duyệt'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A <progress> with no value attribute represents an indeterminate loading state.',
        vi: 'Thẻ <progress> không có thuộc tính value đại diện cho trạng thái đang tải không xác định thời lượng.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'medium'
    },
    {
      id: 'html_q_10_10',
      type: 'single_choice',
      question: {
        en: 'How do you allow a user to select multiple options from a <select> dropdown?',
        vi: 'Làm thế nào để cho phép người dùng chọn nhiều mục từ một danh sách chọn <select>?'
      },
      options: [
        {
          en: 'Add the multiple boolean attribute to the <select> element',
          vi: 'Thêm thuộc tính boolean multiple vào thẻ <select>'
        },
        {
          en: 'Add multi="true" to each option',
          vi: 'Thêm multi="true" vào từng option'
        },
        {
          en: 'Wrap the select in a <multi> tag',
          vi: 'Bọc thẻ select trong thẻ <multi>'
        },
        {
          en: 'Use <select type="checkbox">',
          vi: 'Dùng cú pháp <select type="checkbox">'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The multiple attribute turns the dropdown into a scrollable multi-selection list.',
        vi: 'Thuộc tính multiple biến danh sách chọn thành danh sách cho phép chọn nhiều mục cùng lúc.'
      },
      topicId: 'html_advanced_inputs',
      difficulty: 'easy'
    }
  ]
};

export default lesson11;
