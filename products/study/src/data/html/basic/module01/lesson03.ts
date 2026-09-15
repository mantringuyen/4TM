import { Lesson } from '../../../../types';

export const lesson03: Lesson = {
  id: 'html_lesson_3',
  moduleId: 'html_mod_1',
  levelId: 'basic',
  courseId: 'html',
  order: 3,
  topicId: 'html_text_semantics',
  title: {
    en: 'Text Semantics: strong, em, code, mark, time, abbr, kbd & data',
    vi: 'Ngữ Nghĩa Văn Bản: strong, em, code, mark, time, abbr, kbd & data'
  },
  summary: {
    en: 'Master semantic inline formatting: distinction between visual tags and semantic elements, date/time machine-readability (<time datetime>), abbreviations (<abbr title>), technical notations (<code>, <kbd>, <samp>, <var>), highlights (<mark>), and machine data values (<data value>).',
    vi: 'Làm chủ định dạng ngữ nghĩa nội dòng: phân biệt thẻ giao diện và thẻ ngữ nghĩa, đánh dấu thời gian cho máy đọc (<time datetime>), từ viết tắt (<abbr title>), ký hiệu kỹ thuật (<code>, <kbd>, <samp>, <var>), đánh dấu nổi bật (<mark>) và giá trị dữ liệu (<data value>).'
  },
  estimatedMinutes: 18,
  learn: {
    introduction: {
      en: 'HTML is not merely a visual layout canvas; it conveys deep semantic meaning to search engines, screen readers, automated scrapers, and accessibility tools. Using rich inline semantic tags ensures your text is universally understandable by both humans and algorithms.',
      vi: 'HTML không đơn thuần là khung vẽ giao diện; nó truyền tải ý nghĩa ngữ nghĩa sâu sắc tới các công cụ tìm kiếm, trình đọc màn hình và công cụ trợ năng. Sử dụng đúng các thẻ ngữ nghĩa nội dòng giúp văn bản được hiểu chính xác bởi cả con người và máy móc.'
    },
    conceptExplanation: {
      en: 'Modern HTML provides specialized inline semantic tags:\n\n1. **Importance & Stress**: Use `<strong>` for content of strong importance or urgency (rendered bold, announced with inflection by screen readers) and `<em>` for stress emphasis that changes sentence meaning. Avoid purely presentational `<b>` and `<i>` unless stylistic formatting without implied importance is explicitly intended.\n2. **Machine-Readable Time**: `<time datetime="2026-08-30T10:00:00Z">August 30, 2026</time>` allows calendar engines and search crawlers to index precise dates and durations (`datetime="PT2H30M"`).\n3. **Abbreviations & Tooltips**: `<abbr title="HyperText Markup Language">HTML</abbr>` provides the expanded definition for screen readers and cursor hover.\n4. **Technical Notations**: `<code>` for inline snippets, `<kbd>` for user keyboard input (e.g. `<kbd>Ctrl</kbd> + <kbd>C</kbd>`), `<samp>` for computer program output, and `<var>` for mathematical variables.\n5. **Editorial Context**: `<mark>` for relevant query highlights, `<del>` and `<ins>` with `datetime` for editorial changes, `<s>` for obsolete/strikethrough info, and `<data value="1999">` for linking human text to machine codes (e.g. SKU numbers or IDs).',
      vi: 'HTML hiện đại cung cấp các thẻ ngữ nghĩa nội dòng chuyên biệt:\n\n1. **Tầm quan trọng & Nhấn mạnh**: Sử dụng `<strong>` cho nội dung quan trọng/khẩn cấp (trình đọc màn hình sẽ nhấn giọng) và `<em>` cho nhấn mạnh sắc thái câu. Hạn chế dùng `<b>` và `<i>` trừ khi chỉ cần định dạng thẩm mỹ đơn thuần.\n2. **Thời gian máy đọc được**: `<time datetime="2026-08-30T10:00:00Z">30 tháng 8, 2026</time>` giúp máy tìm kiếm và ứng dụng lịch nhận diện chính xác thời gian hoặc khoảng thời lượng (`datetime="PT2H30M"`).\n3. **Từ viết tắt**: `<abbr title="HyperText Markup Language">HTML</abbr>` cung cấp giải nghĩa đầy đủ cho trình đọc và người dùng khi rê chuột.\n4. **Ký hiệu kỹ thuật**: `<code>` cho mã nguồn ngắn, `<kbd>` cho phím bấm (vd: `<kbd>Ctrl</kbd> + <kbd>C</kbd>`), `<samp>` cho kết quả máy in ra, và `<var>` cho biến số toán học.\n5. **Ngữ cảnh biên tập**: `<mark>` cho từ khóa tìm kiếm nổi bật, `<del>` và `<ins>` cho nội dung xóa/bổ sung, `<s>` cho thông tin hết hiệu lực, và `<data value="1999">` để liên kết văn bản với mã máy.'
    },
    syntax: `<p>The meeting starts at <time datetime="2026-09-01T09:00">9:00 AM</time>.</p>
<p>Press <kbd>Cmd</kbd> + <kbd>K</kbd> to open search.</p>
<p>We strictly comply with <abbr title="World Wide Web Consortium">W3C</abbr> standards.</p>
<p>Product SKU: <data value="PROD-9812">Organic Green Tea</data></p>`,
    examples: [
      {
        title: {
          en: 'Comprehensive Semantic Editorial Article',
          vi: 'Đoạn Văn Biên Tập Đầy Đủ Ngữ Nghĩa'
        },
        code: `<article>
  <h2>Release Notes: <abbr title="Application Programming Interface">API</abbr> v2.4</h2>
  <p>Published on <time datetime="2026-08-15">August 15, 2026</time> by Engineering Team.</p>
  <p><strong>Warning:</strong> The legacy authentication endpoint is <del datetime="2026-08-15">deprecated</del> <ins datetime="2026-08-15">fully removed</ins>.</p>
  <p>To generate an access token, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> in your terminal.</p>
  <p>The server will return <samp>HTTP 201 Created</samp> with a unique token.</p>
  <p>Search results matched for <mark>OAuth 2.1</mark> specification.</p>
</article>`,
        language: 'html',
        explanation: {
          en: 'Demonstrates time, abbr, strong, del, ins, kbd, samp, and mark in a cohesive real-world release note.',
          vi: 'Minh họa cách kết hợp thẻ time, abbr, strong, del, ins, kbd, samp và mark trong thông báo cập nhật thực tế.'
        }
      },
      {
        title: {
          en: 'E-commerce Product Metadata with Data & Scientific Formula',
          vi: 'Siêu Dữ Liệu Sản Phẩm Thương Mại Điện Tử & Công Thức Hóa Học'
        },
        code: `<section class="product-specs">
  <h3>Product Information</h3>
  <p>Item: <data value="SKU-88231">Premium Roasted Espresso</data></p>
  <p>Net Weight: <data value="500">500 grams</data></p>
  <p>Formula contains pure caffeine: C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.</p>
  <p>Store at temperatures below <data value="25">25&deg;C</data> in a dry place.</p>
</section>`,
        language: 'html',
        explanation: {
          en: 'Uses <data> to attach machine-parsable values to human text and <sub> for chemical formulas.',
          vi: 'Sử dụng thẻ <data> để gắn giá trị máy đọc cho văn bản và thẻ <sub> cho công thức phân tử.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using <b> and <i> purely for visual styling without semantic intent',
          vi: 'Lạm dụng <b> và <i> chỉ để tạo kiểu in đậm/nghiêng mà không có ý nghĩa ngữ nghĩa'
        },
        correction: {
          en: 'Use <strong> when conveying high importance or urgency, and <em> for semantic stress emphasis. Use CSS font-weight and font-style for purely aesthetic typography.',
          vi: 'Dùng <strong> khi muốn thể hiện tầm quan trọng cao, và <em> khi nhấn mạnh sắc thái giọng đọc. Dùng CSS cho mục đích trang trí thuần túy.'
        },
        code: '<!-- Correct: <strong>High Security Alert</strong> -->'
      },
      {
        mistake: {
          en: 'Omitting the datetime attribute on <time> elements',
          vi: 'Không khai báo thuộc tính datetime trên thẻ <time>'
        },
        correction: {
          en: 'Always include a standardized ISO 8601 string in the datetime attribute (e.g. datetime="2026-10-25T14:30:00Z") so scrapers and bots can parse the exact timestamp regardless of human locale formatting.',
          vi: 'Luôn khai báo thuộc tính datetime theo chuẩn ISO 8601 để các công cụ tự động phân tích chính xác mốc thời gian.'
        },
        code: '<!-- Correct: <time datetime="2026-10-25">October 25</time> -->'
      }
    ],
    tips: [
      {
        en: 'Combine <kbd> elements to represent multi-key keyboard shortcuts cleanly: <kbd><kbd>Ctrl</kbd> + <kbd>S</kbd></kbd>.',
        vi: 'Lồng các thẻ <kbd> để biểu diễn tổ hợp phím rõ ràng: <kbd><kbd>Ctrl</kbd> + <kbd>S</kbd></kbd>.'
      }
    ],
    practice: {
      task: {
        en: 'Implement Rich Inline Semantic Text Elements',
        vi: 'Triển Khai Các Thẻ Định Dạng Ngữ Nghĩa Nội Dòng'
      },
      instruction: {
        en: 'Construct a semantic paragraph containing: an abbreviation <abbr title="Cascading Style Sheets">CSS</abbr>, a formatted date with <time datetime="2026-12-01">December 1, 2026</time>, a keyboard shortcut with <kbd>Ctrl</kbd>, and a highlighted query term with <mark>grid layout</mark>.',
        vi: 'Xây dựng một đoạn văn chứa: từ viết tắt <abbr title="Cascading Style Sheets">CSS</abbr>, mốc thời gian <time datetime="2026-12-01">December 1, 2026</time>, phím tắt <kbd>Ctrl</kbd> và từ khóa nổi bật <mark>grid layout</mark>.'
      },
      starterCode: '<p>\n  Learn CSS before December 1, 2026. Press Ctrl to inspect grid layout.\n</p>',
      solutionCode: '<p>\n  Learn <abbr title="Cascading Style Sheets">CSS</abbr> before <time datetime="2026-12-01">December 1, 2026</time>. Press <kbd>Ctrl</kbd> to inspect <mark>grid layout</mark>.\n</p>',
      requiredPatterns: [
        '<abbr title="Cascading Style Sheets">CSS</abbr>',
        '<time datetime="2026-12-01">',
        '<kbd>Ctrl</kbd>',
        '<mark>grid layout</mark>'
      ],
      hint: {
        en: 'Wrap each term in its respective semantic tag: abbr with title, time with datetime, kbd, and mark.',
        vi: 'Bọc từng cụm từ trong thẻ tương ứng: abbr kèm title, time kèm datetime, kbd và mark.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Build an Accessible Event Notice with Semantic Text Tags',
        vi: 'Xây Dựng Thông Báo Sự Kiện Chuẩn Ngữ Nghĩa'
      },
      instruction: {
        en: 'Create a semantic announcement with an urgent warning <strong>Important:</strong>, an event date <time datetime="2026-11-20T18:00">Nov 20 at 6 PM</time>, and an abbreviation <abbr title="User Interface">UI</abbr>.',
        vi: 'Tạo thông báo gồm cảnh báo quan trọng <strong>Important:</strong>, ngày diễn ra <time datetime="2026-11-20T18:00">Nov 20 at 6 PM</time> và từ viết tắt <abbr title="User Interface">UI</abbr>.'
      },
      starterCode: '<section>\n  <p>Important: Workshop on Nov 20 at 6 PM about modern UI.</p>\n</section>',
      solutionCode: '<section>\n  <p><strong>Important:</strong> Workshop on <time datetime="2026-11-20T18:00">Nov 20 at 6 PM</time> about modern <abbr title="User Interface">UI</abbr>.</p>\n</section>',
      requiredPatterns: [
        '<strong>Important:</strong>',
        '<time datetime="2026-11-20T18:00">',
        '<abbr title="User Interface">UI</abbr>'
      ],
      hint: {
        en: 'Use strong for important note, time with datetime attribute, and abbr with title.',
        vi: 'Dùng strong cho ghi chú quan trọng, time có thuộc tính datetime và abbr kèm title.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_21_1',
      type: 'complete_code',
      title: {
        en: 'Add Machine-Readable Date & Time Elements',
        vi: 'Thêm Thẻ Thời Gian Máy Đọc Được'
      },
      instruction: {
        en: 'Wrap the date "October 31, 2026" with a <time> tag containing datetime="2026-10-31".',
        vi: 'Bọc chuỗi ngày "October 31, 2026" bằng thẻ <time> có thuộc tính datetime="2026-10-31".'
      },
      starterCode: '<p>The submission deadline is October 31, 2026 at midnight.</p>',
      solutionCode: '<p>The submission deadline is <time datetime="2026-10-31">October 31, 2026</time> at midnight.</p>',
      hint: {
        en: 'Use <time datetime="2026-10-31">October 31, 2026</time>.',
        vi: 'Dùng <time datetime="2026-10-31">October 31, 2026</time>.'
      },
      explanation: {
        en: 'The datetime attribute provides search engines and calendar apps with an unambiguous ISO timestamp.',
        vi: 'Thuộc tính datetime cung cấp mốc thời gian chuẩn ISO cho các công cụ tìm kiếm và ứng dụng lịch.'
      }
    },
    {
      id: 'html_ex_21_2',
      type: 'fix_code',
      title: {
        en: 'Fix Inaccessible Abbreviations and Keyboard Shortcuts',
        vi: 'Sửa Lỗi Thẻ Từ Viết Tắt Và Phím Tắt'
      },
      instruction: {
        en: 'Replace the generic span for "NASA" with an <abbr title="National Aeronautics and Space Administration"> tag, and wrap the shortcut "Ctrl+P" in <kbd> tags.',
        vi: 'Thay thế thẻ span chung của "NASA" bằng thẻ <abbr title="National Aeronautics and Space Administration">, và bọc phím tắt "Ctrl+P" trong thẻ <kbd>.'
      },
      starterCode: '<p>Press <span>Ctrl+P</span> to print the <span>NASA</span> press release.</p>',
      solutionCode: '<p>Press <kbd>Ctrl+P</kbd> to print the <abbr title="National Aeronautics and Space Administration">NASA</abbr> press release.</p>',
      hint: {
        en: 'Use <kbd>Ctrl+P</kbd> and <abbr title="...">NASA</abbr>.',
        vi: 'Dùng <kbd>Ctrl+P</kbd> và <abbr title="...">NASA</abbr>.'
      },
      explanation: {
        en: '<abbr> and <kbd> communicate specialized semantics to screen readers and assistive devices.',
        vi: '<abbr> và <kbd> truyền tải đúng bản chất từ viết tắt và phím bấm cho trình đọc màn hình.'
      }
    },
    {
      id: 'html_ex_21_3',
      type: 'write_code',
      title: {
        en: 'Construct Editorial Article with Revision Del and Ins',
        vi: 'Tạo Đoạn Văn Biên Tập Với Thẻ del Và ins'
      },
      instruction: {
        en: 'Write a paragraph showing an edited price: old price "$50" wrapped in <del>, new price "$35" wrapped in <ins>, and an urgent notice <strong>Sale ends today!</strong>.',
        vi: 'Viết đoạn văn hiển thị giá đã sửa: giá cũ "$50" trong thẻ <del>, giá mới "$35" trong thẻ <ins> và thông báo <strong>Sale ends today!</strong>.'
      },
      starterCode: '<!-- Write paragraph with del, ins, and strong -->\n',
      solutionCode: '<p>Special offer: was <del>$50</del>, now <ins>$35</ins>. <strong>Sale ends today!</strong></p>',
      hint: {
        en: 'Include <del>$50</del>, <ins>$35</ins>, and <strong>Sale ends today!</strong> in a <p>.',
        vi: 'Đặt <del>$50</del>, <ins>$35</ins> và <strong>Sale ends today!</strong> trong thẻ <p>.'
      },
      explanation: {
        en: '<del> and <ins> indicate removed and inserted text respectively, supporting editorial tracking.',
        vi: '<del> và <ins> biểu thị nội dung bị xóa và nội dung được thêm vào trong văn bản.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_21',
    title: {
      en: 'Technical Documentation Semantic Text Layout',
      vi: 'Bố Cục Văn Bản Kỹ Thuật Đạt Chuẩn Ngữ Nghĩa'
    },
    description: {
      en: 'Build a comprehensive semantic technical documentation card featuring abbreviation expansions, exact machine-readable timestamps, code snippets, keyboard shortcuts, sample terminal outputs, and product data values.',
      vi: 'Xây dựng thẻ tài liệu kỹ thuật chuẩn ngữ nghĩa gồm từ viết tắt mở rộng, thời gian chuẩn máy đọc, đoạn mã nội dòng, phím tắt thao tác, kết quả terminal và giá trị dữ liệu sản phẩm.'
    },
    requirements: [
      {
        en: '<article> wrapper with an <h2> heading',
        vi: 'Khung <article> bọc ngoài kèm tiêu đề <h2>'
      },
      {
        en: '<time datetime="2026-08-30T14:00"> timestamp of the update',
        vi: 'Mốc thời gian cập nhật <time datetime="2026-08-30T14:00">'
      },
      {
        en: '<abbr title="JavaScript Object Notation">JSON</abbr> definition',
        vi: 'Giải nghĩa từ viết tắt <abbr title="JavaScript Object Notation">JSON</abbr>'
      },
      {
        en: 'Inline code element <code>fetch(\'/api/data\')</code>',
        vi: 'Đoạn mã nội dòng <code>fetch(\'/api/data\')</code>'
      },
      {
        en: 'Keyboard instruction with <kbd>Enter</kbd>',
        vi: 'Chỉ dẫn phím bấm với <kbd>Enter</kbd>'
      },
      {
        en: 'Computer output with <samp>Success: 200 OK</samp>',
        vi: 'Kết quả máy tính in ra với <samp>Success: 200 OK</samp>'
      }
    ],
    starterCode: '<!-- Build your semantic documentation card below -->\n',
    solutionCode: `<article class="docs-card">
  <h2>API Gateway Quickstart</h2>
  <p>Last updated: <time datetime="2026-08-30T14:00">August 30, 2026 at 2:00 PM</time></p>
  <p>Our server returns payload responses in <abbr title="JavaScript Object Notation">JSON</abbr> format.</p>
  <p>Execute <code>fetch('/api/data')</code> and press <kbd>Enter</kbd> in your debug console.</p>
  <p>Expected output: <samp>Success: 200 OK</samp></p>
</article>`,
    hints: [
      {
        en: 'Ensure all required tags (<article>, <time>, <abbr>, <code>, <kbd>, <samp>) are properly opened and closed.',
        vi: 'Đảm bảo mở và đóng đầy đủ các thẻ (<article>, <time>, <abbr>, <code>, <kbd>, <samp>).'
      }
    ],
    solutionExplanation: {
      en: 'Every piece of technical information is marked up using its precise W3C HTML5 semantic element.',
      vi: 'Mỗi phần thông tin kỹ thuật được đánh dấu bằng chính xác thẻ ngữ nghĩa HTML5 theo chuẩn W3C.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_21_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference between <strong> and <b> in HTML5?',
        vi: 'Điểm khác biệt cốt lõi giữa <strong> và <b> trong HTML5 là gì?'
      },
      options: [
        {
          en: '<strong> conveys strong semantic importance and urgency, while <b> is purely stylistic bold text',
          vi: '<strong> truyền tải ý nghĩa quan trọng/khẩn cấp, còn <b> chỉ đơn thuần là chữ in đậm trang trí'
        },
        {
          en: '<b> is rendered in color, whereas <strong> is black and white',
          vi: '<b> hiển thị có màu, còn <strong> là đen trắng'
        },
        {
          en: '<strong> is only allowed inside <head>',
          vi: '<strong> chỉ được phép đặt trong <head>'
        },
        {
          en: 'There is no difference; they are completely identical in every way',
          vi: 'Không có sự khác biệt; cả hai hoàn toàn giống hệt nhau'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<strong> conveys semantic seriousness or importance and is vocalized by screen readers, whereas <b> draws visual attention without semantic weight.',
        vi: '<strong> mang ý nghĩa nhấn mạnh tầm quan trọng và được trình đọc màn hình phát âm với ngữ điệu đặc biệt, trong khi <b> chỉ làm đậm nét thị giác.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_21_2',
      type: 'single_choice',
      question: {
        en: 'Why is the datetime attribute necessary on a <time> element?',
        vi: 'Tại sao thuộc tính datetime lại cần thiết trên thẻ <time>?'
      },
      options: [
        {
          en: 'It provides a standardized, machine-readable ISO 8601 format regardless of how the date is presented to human readers',
          vi: 'Nó cung cấp định dạng chuẩn ISO 8601 cho máy đọc bất kể ngày tháng hiển thị thế nào cho con người'
        },
        {
          en: 'It styles the time element with a clock icon automatically',
          vi: 'Nó tự động thêm biểu tượng đồng hồ bên cạnh văn bản'
        },
        {
          en: 'It syncs the browser clock with the server clock',
          vi: 'Nó đồng bộ đồng hồ trình duyệt với máy chủ'
        },
        {
          en: 'It prevents the text from being translated',
          vi: 'Nó ngăn văn bản không bị dịch tự động'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Human dates like "Next Friday" or "30/08/2026" are ambiguous; datetime="2026-09-04" is universally machine-parsable.',
        vi: 'Cách viết ngày cho người đọc dễ gây nhầm lẫn; datetime="2026-09-04" giúp mọi máy móc và thuật toán phân tích chính xác tuyệt đối.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_21_3',
      type: 'single_choice',
      question: {
        en: 'Which HTML5 element represents user keyboard input, voice commands, or key combinations?',
        vi: 'Thẻ HTML5 nào đại diện cho thao tác bàn phím, khẩu lệnh hoặc tổ hợp phím của người dùng?'
      },
      options: [
        {
          en: '<kbd>',
          vi: '<kbd>'
        },
        {
          en: '<code>',
          vi: '<code>'
        },
        {
          en: '<key>',
          vi: '<key>'
        },
        {
          en: '<samp>',
          vi: '<samp>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<kbd> denotes user input such as keyboard keystrokes or terminal key combinations.',
        vi: '<kbd> biểu thị thao tác nhập liệu của người dùng như bấm phím hoặc gõ lệnh.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_21_4',
      type: 'single_choice',
      question: {
        en: 'What is the semantic purpose of the <samp> element?',
        vi: 'Mục đích ngữ nghĩa của thẻ <samp> là gì?'
      },
      options: [
        {
          en: 'Represents sample output from a computer program, script, or system',
          vi: 'Đại diện cho kết quả đầu ra mẫu từ một chương trình máy tính hoặc hệ thống'
        },
        {
          en: 'Displays statistical sampling datasets',
          vi: 'Hiển thị tập dữ liệu mẫu thống kê'
        },
        {
          en: 'Creates a musical audio sample player',
          vi: 'Tạo trình phát mẫu âm thanh âm nhạc'
        },
        {
          en: 'Embeds a small iframe snippet',
          vi: 'Nhúng một đoạn mã iframe thu nhỏ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<samp> (Sample Output) marks inline text generated by a computer system or software program.',
        vi: '<samp> dùng để đánh dấu văn bản được sinh ra từ máy tính hoặc chương trình phần mềm.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_21_5',
      type: 'single_choice',
      question: {
        en: 'How should the <abbr> element be used to provide an accessible expansion for an acronym?',
        vi: 'Thẻ <abbr> nên được dùng như thế nào để cung cấp giải nghĩa dễ tiếp cận cho từ viết tắt?'
      },
      options: [
        {
          en: 'By adding a descriptive title attribute: <abbr title="World Wide Web">WWW</abbr>',
          vi: 'Bằng cách thêm thuộc tính title mô tả: <abbr title="World Wide Web">WWW</abbr>'
        },
        {
          en: 'By adding an alt attribute: <abbr alt="World Wide Web">WWW</abbr>',
          vi: 'Bằng cách thêm thuộc tính alt: <abbr alt="World Wide Web">WWW</abbr>'
        },
        {
          en: 'By wrapping the abbreviation in <abbr value="World Wide Web">WWW</abbr>',
          vi: 'Bằng cách bọc trong <abbr value="World Wide Web">WWW</abbr>'
        },
        {
          en: 'By nesting a <tooltip> tag inside <abbr>',
          vi: 'Bằng cách lồng thẻ <tooltip> bên trong <abbr>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The title attribute on <abbr> holds the full expansion of the abbreviation for tooltips and screen readers.',
        vi: 'Thuộc tính title trên thẻ <abbr> chứa phần giải nghĩa đầy đủ của từ viết tắt.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_21_6',
      type: 'single_choice',
      question: {
        en: 'What is the role of the <mark> element in modern HTML?',
        vi: 'Vai trò của thẻ <mark> trong HTML hiện đại là gì?'
      },
      options: [
        {
          en: 'Highlights text that has particular relevance to the user context, such as search term matches',
          vi: 'Làm nổi bật văn bản có mức độ liên quan đặc biệt tới ngữ cảnh người dùng, như kết quả tìm kiếm'
        },
        {
          en: 'Creates a permanent yellow watermark across the web page',
          vi: 'Tạo hình mờ màu vàng cố định trên trang web'
        },
        {
          en: 'Marks an item as completed in a checklist',
          vi: 'Đánh dấu mục đã hoàn thành trong danh sách việc cần làm'
        },
        {
          en: 'Draws a border around a paragraph',
          vi: 'Vẽ khung viền xung quanh đoạn văn'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<mark> indicates text that is highlighted or marked due to its relevance in another context (e.g. search keywords).',
        vi: '<mark> dùng để làm nổi bật văn bản do có liên quan trực tiếp đến ngữ cảnh tìm kiếm hoặc tham chiếu.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_21_7',
      type: 'single_choice',
      question: {
        en: 'Which pair of elements denotes editorial revisions (content deleted and newly inserted)?',
        vi: 'Cặp thẻ nào thể hiện sự chỉnh sửa biên tập (nội dung bị xóa và nội dung mới được thêm vào)?'
      },
      options: [
        {
          en: '<del> and <ins>',
          vi: '<del> và <ins>'
        },
        {
          en: '<remove> and <add>',
          vi: '<remove> và <add>'
        },
        {
          en: '<s> and <u>',
          vi: '<s> và <u>'
        },
        {
          en: '<strike> and <insert>',
          vi: '<strike> và <insert>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<del> represents text that has been removed from a document, while <ins> represents inserted text.',
        vi: '<del> biểu diễn nội dung bị xóa khỏi tài liệu, trong khi <ins> biểu diễn nội dung được thêm vào.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_21_8',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the <data> element in HTML5?',
        vi: 'Mục đích của thẻ <data> trong HTML5 là gì?'
      },
      options: [
        {
          en: 'Links human-readable content with a machine-readable value attribute',
          vi: 'Liên kết nội dung người đọc với thuộc tính value máy đọc được'
        },
        {
          en: 'Connects directly to an SQL database',
          vi: 'Kết nối trực tiếp tới cơ sở dữ liệu SQL'
        },
        {
          en: 'Stores encrypted passwords in local storage',
          vi: 'Lưu mật khẩu mã hóa trong local storage'
        },
        {
          en: 'Loads external JSON files synchronously',
          vi: 'Tải các tệp JSON từ bên ngoài một cách đồng bộ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<data value="..."> links text content (like a product name) with machine-readable identifiers or values.',
        vi: '<data value="..."> gắn mã định danh hoặc giá trị cho máy xử lý vào nội dung hiển thị cho người dùng.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_21_9',
      type: 'single_choice',
      question: {
        en: 'Which element is semantically appropriate for mathematical variables or formula coefficients?',
        vi: 'Thẻ nào phù hợp về mặt ngữ nghĩa cho các biến số toán học hoặc hệ số công thức?'
      },
      options: [
        {
          en: '<var>',
          vi: '<var>'
        },
        {
          en: '<math>',
          vi: '<math>'
        },
        {
          en: '<code>',
          vi: '<code>'
        },
        {
          en: '<i>',
          vi: '<i>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<var> represents a variable in a mathematical expression or programming context.',
        vi: '<var> đại diện cho một biến số trong biểu thức toán học hoặc ngữ cảnh lập trình.'
      },
      topicId: 'html_text_semantics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_21_10',
      type: 'single_choice',
      question: {
        en: 'How should chemical formulas such as H2O and mathematical exponents like x2 be marked up?',
        vi: 'Các công thức hóa học như H2O và số mũ toán học như x2 nên được đánh dấu như thế nào?'
      },
      options: [
        {
          en: 'H<sub>2</sub>O for subscript and x<sup>2</sup> for superscript',
          vi: 'H<sub>2</sub>O cho chỉ số dưới và x<sup>2</sup> cho chỉ số trên'
        },
        {
          en: 'H<down>2</down>O and x<up>2</up>',
          vi: 'H<down>2</down>O và x<up>2</up>'
        },
        {
          en: 'H<bottom>2</bottom>O and x<top>2</top>',
          vi: 'H<bottom>2</bottom>O và x<top>2</top>'
        },
        {
          en: 'H<small>2</small>O and x<big>2</big>',
          vi: 'H<small>2</small>O và x<big>2</big>'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '<sub> produces subscript text (chemical indices) and <sup> produces superscript text (exponents/footnotes).',
        vi: '<sub> tạo chỉ số dưới (chỉ số hóa học) và <sup> tạo chỉ số trên (số mũ/chú thích chân trang).'
      },
      topicId: 'html_text_semantics',
      difficulty: 'easy'
    }
  ]
};

export default lesson03;
