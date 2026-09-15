import { Lesson } from '../../../../types';

export const lesson16: Lesson = {
  id: 'html_lesson_16',
  moduleId: 'html_mod_4',
  levelId: 'intermediate',
  courseId: 'html',
  order: 16,
  topicId: 'html_canvas_graphics',
  title: {
    en: 'Canvas: 2D Context, Drawing Primitives & Practical Use Cases',
    vi: 'Canvas: Ngữ Cảnh 2D, Hình Học Cơ Bản & Ứng Dụng Thực Tiễn'
  },
  summary: {
    en: 'Master HTML5 bitmapped dynamic graphics: <canvas> coordinate systems, direct rendering with getContext("2d"), drawing primitives (rectangles, paths, arcs, bezier curves), text rendering (fillText, strokeText), high-DPI Retina display scaling with devicePixelRatio, performance optimization with requestAnimationFrame, and accessible fallback content.',
    vi: 'Làm chủ đồ họa bitmap động trong HTML5: hệ tọa độ <canvas>, kết xuất trực tiếp bằng getContext("2d"), vẽ hình học cơ bản (chữ nhật, đường dẫn path, cung tròn arc, đường cong bezier), vẽ chữ (fillText, strokeText), xử lý hiển thị sắc nét trên màn hình Retina độ phân giải cao với devicePixelRatio, tối ưu hiệu năng cùng requestAnimationFrame và nội dung dự phòng trợ năng.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'The HTML5 <canvas> element provides a high-performance, scriptable bitmap surface for real-time procedural animations, game rendering, interactive image manipulation, and intensive chart visualizations directly within the browser.',
      vi: 'Phần tử HTML5 <canvas> cung cấp bề mặt vẽ bitmap hiệu năng cao có thể lập trình được, phục vụ cho hoạt ảnh thời gian thực, lập trình game, xử lý hình ảnh tương tác và biểu đồ chuyên sâu trực tiếp trên trình duyệt.'
    },
    conceptExplanation: {
      en: '1. **Canvas Element & Dimensions**:\n   - `<canvas id="viewport" width="800" height="600"><p>Fallback text</p></canvas>`\n   - CRITICAL: Always set `width` and `height` as HTML element attributes (internal drawing buffer), NOT purely via CSS styles (which causes image stretching and blurriness).\n\n2. **2D Rendering Context Initialization**:\n   - `const ctx = canvas.getContext("2d");`\n   - Context coordinates start at top-left `(0, 0)` with X extending right and Y extending down.\n\n3. **Core Drawing Primitives**:\n   - Rectangles: `ctx.fillRect(x, y, w, h)`, `ctx.strokeRect(x, y, w, h)`, `ctx.clearRect(x, y, w, h)`.\n   - Paths: `ctx.beginPath()`, `ctx.moveTo(x, y)`, `ctx.lineTo(x, y)`, `ctx.arc(x, y, radius, startAngle, endAngle)`, `ctx.closePath()`, `ctx.stroke()`, `ctx.fill()`.\n   - Text: `ctx.font = "16px sans-serif"`, `ctx.fillText("Text", x, y)`.\n\n4. **High-DPI / Retina Resolution Calibration**:\n   - Scale the canvas drawing buffer by `window.devicePixelRatio` and scale the context using `ctx.scale(dpr, dpr)` to ensure crisp text on 4K and mobile Retina displays.\n\n5. **Canvas vs SVG Decision Guide**:\n   - Use **SVG** for resolution-independent icons, responsive UI diagrams, and interactive documents with DOM nodes.\n   - Use **Canvas** for high-frequency dynamic rendering (thousands of moving particles, pixel manipulation, games, 60fps animations).',
      vi: '1. **Phần tử Canvas & Kích thước**:\n   - `<canvas id="viewport" width="800" height="600"><p>Chữ dự phòng</p></canvas>`\n   - QUAN TRỌNG: Luôn khai báo `width` và `height` dưới dạng thuộc tính HTML (bộ đệm vẽ pixel), KHÔNG chỉ đặt qua CSS (sẽ làm ảnh bị giãn mờ).\n\n2. **Khởi tạo Ngữ cảnh Kết xuất 2D**:\n   - `const ctx = canvas.getContext("2d");`\n   - Tọa độ gốc `(0, 0)` bắt đầu từ góc trên bên trái; trục X hướng sang phải, trục Y hướng xuống dưới.\n\n3. **Các phép vẽ cơ bản**:\n   - Hình chữ nhật: `ctx.fillRect(x, y, w, h)`, `ctx.strokeRect(x, y, w, h)`, `ctx.clearRect(x, y, w, h)`.\n   - Đường dẫn (Paths): `ctx.beginPath()`, `ctx.moveTo(x, y)`, `ctx.lineTo(x, y)`, `ctx.arc(...)`, `ctx.stroke()`, `ctx.fill()`.\n   - Chữ viết: `ctx.font = "16px sans-serif"`, `ctx.fillText("Nội dung", x, y)`.\n\n4. **Xử lý Màn hình Retina Độ Phân Giải Cao**:\n   - Nhân kích thước bộ đệm vẽ với `window.devicePixelRatio` và gọi `ctx.scale(dpr, dpr)` để đảm bảo hình vẽ sắc nét không bị nhòe trên màn hình Retina.\n\n5. **Khi nào dùng Canvas vs SVG**:\n   - Dùng **SVG** cho biểu tượng vector co giãn, sơ đồ UI đáp ứng và các phần tử cần tương tác DOM.\n   - Dùng **Canvas** cho đồ họa tần số cao (hàng ngàn hạt chuyển động, chỉnh sửa pixel ảnh, game 60fps).'
    },
    syntax: `<canvas id="game-stage" width="600" height="400">
  <p>Interactive chart displaying monthly active users. Your browser does not support HTML5 Canvas.</p>
</canvas>

<script>
  const canvas = document.getElementById('game-stage');
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 600, 400);

  // Draw circle
  ctx.beginPath();
  ctx.arc(300, 200, 50, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();
</script>`,
    examples: [
      {
        title: {
          en: 'Drawing an Accessible Circular Data Arc on Canvas',
          vi: 'Vẽ Cung Tròn Dữ Liệu Chuẩn Trợ Năng Trên Canvas'
        },
        code: `<canvas id="gauge" width="200" height="200" role="img" aria-label="System CPU load at 75%">
  <p>Current CPU Load: 75%</p>
</canvas>
<script>
  const c = document.getElementById('gauge');
  const ctx = c.getContext('2d');
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(100, 100, 80, -Math.PI / 2, Math.PI);
  ctx.stroke();
</script>`,
        language: 'html',
        explanation: {
          en: 'Draws a stroke circle arc while providing role="img" and inner fallback text for screen readers.',
          vi: 'Vẽ cung viền tròn đồng thời cung cấp role="img" và văn bản fallback bên trong cho trình đọc màn hình.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Setting canvas dimensions only using CSS (e.g. style="width: 400px; height: 300px")',
          vi: 'Chỉ đặt kích thước canvas bằng CSS (vd: style="width: 400px; height: 300px")'
        },
        correction: {
          en: 'CSS width/height scales the default 300x150 drawing buffer like an image, resulting in pixelated, blurry graphics. Set width="..." and height="..." as HTML attributes directly on <canvas>.',
          vi: 'CSS width/height chỉ phóng to bộ đệm 300x150 mặc định như một bức ảnh, làm hình vẽ bị mờ vỡ hạt. Phải đặt thuộc tính width="..." và height="..." trực tiếp trên thẻ <canvas>.'
        },
        code: '<!-- Correct: <canvas width="800" height="600"></canvas> -->'
      },
      {
        mistake: {
          en: 'Omitting ctx.beginPath() before drawing independent path segments',
          vi: 'Quên không gọi ctx.beginPath() trước khi vẽ các đoạn đường dẫn mới'
        },
        correction: {
          en: 'Without beginPath(), all previously drawn lines remain in the active path buffer and will be redrawn and recolored whenever stroke() or fill() is called.',
          vi: 'Nếu không gọi beginPath(), các đường vẽ trước đó vẫn còn trong bộ nhớ đệm và sẽ bị vẽ đè đổi màu lại mỗi khi gọi stroke() hoặc fill().'
        },
        code: '// Correct: ctx.beginPath(); ctx.moveTo(...); ctx.stroke();'
      }
    ],
    tips: [
      {
        en: 'Always include meaningful accessible fallback markup inside the <canvas> element so non-visual users or unsupported browsers can access the underlying data.',
        vi: 'Luôn cung cấp nội dung dự phòng có ý nghĩa bên trong thẻ <canvas> để người dùng khiếm thị hoặc trình duyệt không hỗ trợ vẫn tiếp cận được dữ liệu.'
      }
    ],
    practice: {
      task: {
        en: 'Construct an Accessible Canvas with Fallback Text',
        vi: 'Xây Dựng Thẻ Canvas Chuẩn Trợ Năng Kèm Chữ Dự Phòng'
      },
      instruction: {
        en: 'Create a <canvas id="chart-canvas" width="500" height="300" role="img" aria-label="Monthly Sales Chart"><p>Monthly sales breakdown: $45,000 total.</p></canvas>.',
        vi: 'Tạo thẻ <canvas id="chart-canvas" width="500" height="300" role="img" aria-label="Monthly Sales Chart"><p>Monthly sales breakdown: $45,000 total.</p></canvas>.'
      },
      starterCode: '<!-- Build accessible canvas -->\n',
      solutionCode: `<canvas id="chart-canvas" width="500" height="300" role="img" aria-label="Monthly Sales Chart">
  <p>Monthly sales breakdown: $45,000 total.</p>
</canvas>`,
      requiredPatterns: [
        '<canvas id="chart-canvas"',
        'width="500"',
        'height="300"',
        'role="img"',
        'aria-label="Monthly Sales Chart"',
        '<p>Monthly sales breakdown: $45,000 total.</p>',
        '</canvas>'
      ],
      hint: {
        en: 'Set width, height, role, and aria-label attributes on the canvas.',
        vi: 'Khai báo các thuộc tính width, height, role và aria-label trên thẻ canvas.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Implement a Canvas Script Rendering Pipeline',
        vi: 'Triển Khai Đoạn Mã Vẽ Lên Bề Mặt Canvas'
      },
      instruction: {
        en: 'Create a <canvas id="stage" width="400" height="200"></canvas> followed by a <script> block getting the "2d" context and calling fillRect(10, 10, 100, 50).',
        vi: 'Tạo thẻ <canvas id="stage" width="400" height="200"></canvas> theo sau là thẻ <script> lấy ngữ cảnh "2d" và gọi fillRect(10, 10, 100, 50).'
      },
      starterCode: '<!-- Build canvas with script -->\n',
      solutionCode: `<canvas id="stage" width="400" height="200">
  <p>Interactive rendering stage</p>
</canvas>
<script>
  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(10, 10, 100, 50);
</script>`,
      requiredPatterns: [
        '<canvas id="stage" width="400" height="200">',
        'getContext(\'2d\')',
        'fillRect(10, 10, 100, 50)'
      ],
      hint: {
        en: 'Obtain the 2d context and call fillRect with coordinates.',
        vi: 'Lấy ngữ cảnh 2d và gọi hàm fillRect kèm tọa độ.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_20_1',
      type: 'complete_code',
      title: {
        en: 'Add Explicit HTML Dimensions to Canvas',
        vi: 'Thêm Kích Thước Thuộc Tính HTML Cho Canvas'
      },
      instruction: {
        en: 'Add width="600" and height="400" attributes directly to the <canvas> tag to set its internal drawing buffer.',
        vi: 'Thêm thuộc tính width="600" và height="400" trực tiếp vào thẻ <canvas> để thiết lập bộ đệm vẽ.'
      },
      starterCode: '<canvas id="viewport"><p>Fallback content</p></canvas>',
      solutionCode: '<canvas id="viewport" width="600" height="400"><p>Fallback content</p></canvas>',
      hint: {
        en: 'Add width="600" and height="400" attributes.',
        vi: 'Thêm thuộc tính width="600" và height="400".'
      },
      explanation: {
        en: 'Setting width and height attributes prevents blurry canvas scaling artifacts.',
        vi: 'Đặt thuộc tính width và height ngăn ngừa hiện tượng vỡ nét nhòe hình trên canvas.'
      }
    },
    {
      id: 'html_ex_20_2',
      type: 'fix_code',
      title: {
        en: 'Fix Missing beginPath Call in Drawing Script',
        vi: 'Sửa Lỗi Thiếu beginPath Trong Mã Vẽ Canvas'
      },
      instruction: {
        en: 'Add ctx.beginPath(); before drawing the second circle so the previous path is not re-stroked.',
        vi: 'Thêm ctx.beginPath(); trước khi vẽ hình tròn thứ hai để đường vẽ trước không bị vẽ đè lại.'
      },
      starterCode: `ctx.arc(50, 50, 20, 0, Math.PI * 2);
ctx.stroke();
ctx.arc(150, 50, 20, 0, Math.PI * 2);
ctx.stroke();`,
      solutionCode: `ctx.beginPath();
ctx.arc(50, 50, 20, 0, Math.PI * 2);
ctx.stroke();
ctx.beginPath();
ctx.arc(150, 50, 20, 0, Math.PI * 2);
ctx.stroke();`,
      hint: {
        en: 'Insert ctx.beginPath(); before creating new paths.',
        vi: 'Chèn ctx.beginPath(); trước khi tạo các đường vẽ mới.'
      },
      explanation: {
        en: 'beginPath() resets the path list, allowing clean independent shape rendering.',
        vi: 'beginPath() xóa danh sách đường vẽ cũ, cho phép vẽ các hình học độc lập rõ ràng.'
      }
    },
    {
      id: 'html_ex_20_3',
      type: 'write_code',
      title: {
        en: 'Write Fallback Paragraph Inside Canvas Element',
        vi: 'Tạo Đoạn Văn Bản Dự Phòng Bên Trong Thẻ Canvas'
      },
      instruction: {
        en: 'Write a <canvas id="radar" width="300" height="300"><p>Live Radar Telemetry</p></canvas>.',
        vi: 'Viết thẻ <canvas id="radar" width="300" height="300"><p>Live Radar Telemetry</p></canvas>.'
      },
      starterCode: '<!-- Write canvas with fallback -->\n',
      solutionCode: `<canvas id="radar" width="300" height="300">
  <p>Live Radar Telemetry</p>
</canvas>`,
      hint: {
        en: 'Use <canvas id="radar" width="300" height="300"><p>Live Radar Telemetry</p></canvas>.',
        vi: 'Dùng cú pháp <canvas id="radar" width="300" height="300"><p>Live Radar Telemetry</p></canvas>.'
      },
      explanation: {
        en: 'Fallback content renders only when the browser does not support canvas execution.',
        vi: 'Nội dung fallback chỉ hiển thị khi trình duyệt không hỗ trợ chạy canvas.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_20',
    title: {
      en: 'High-Performance Procedural Canvas Animation Stage',
      vi: 'Sân Khấu Hoạt Ảnh Canvas Thủ Tục Hiệu Năng Cao'
    },
    description: {
      en: 'Construct an accessible, responsive HTML5 canvas container equipped with high-DPI scaling configuration markup, semantic assistive labeling, comprehensive fallback data representations, and 2D context initialization scaffolding.',
      vi: 'Xây dựng khung canvas HTML5 chuẩn trợ năng có cấu hình độ phân giải cao, nhãn ngữ nghĩa, dữ liệu dự phòng chi tiết và khung khởi tạo ngữ cảnh 2D.'
    },
    requirements: [
      {
        en: '<canvas id="telemetry-stage" width="800" height="450" role="img" aria-label="...">',
        vi: '<canvas id="telemetry-stage" width="800" height="450" role="img" aria-label="...">'
      },
      {
        en: 'Accessible fallback structured table or list inside the canvas element',
        vi: 'Bảng dữ liệu hoặc danh sách dự phòng có cấu trúc bên trong thẻ canvas'
      },
      {
        en: 'JavaScript snippet obtaining 2D context with getContext("2d")',
        vi: 'Đoạn mã JavaScript lấy ngữ cảnh 2D với getContext("2d")'
      },
      {
        en: 'Drawing routine rendering background rect and geometric shapes',
        vi: 'Quy trình vẽ nền hình chữ nhật và các hình học cơ bản'
      }
    ],
    starterCode: '<!-- Build high-performance canvas stage -->\n',
    solutionCode: `<canvas id="telemetry-stage" width="800" height="450" role="img" aria-label="Real-time Network Node Topology Graph">
  <p>Your browser does not support HTML5 Canvas. Here is the node topology summary:</p>
  <ul>
    <li>Node Alpha: Active (Latency 12ms)</li>
    <li>Node Beta: Active (Latency 18ms)</li>
    <li>Node Gamma: Active (Latency 24ms)</li>
  </ul>
</canvas>

<script>
  const canvas = document.getElementById('telemetry-stage');
  const ctx = canvas.getContext('2d');

  // Fill dark background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw central node circle
  ctx.beginPath();
  ctx.arc(400, 225, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#0284c7';
  ctx.stroke();

  // Draw node label
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.fillText('Central Cluster', 400, 275);
</script>`,
    hints: [
      {
        en: 'Ensure width and height attributes are placed on the canvas tag and context is initialized via getContext("2d").',
        vi: 'Đảm bảo thuộc tính width và height được đặt trên thẻ canvas và ngữ cảnh được khởi tạo qua getContext("2d").'
      }
    ],
    solutionExplanation: {
      en: 'Combines full accessibility fallback guarantees with high-throughput 2D canvas drawing.',
      vi: 'Kết hợp bảo đảm khả năng tiếp cận trợ năng với hiệu năng vẽ đồ họa 2D canvas tốc độ cao.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_20_1',
      type: 'single_choice',
      question: {
        en: 'What happens if you set the size of an HTML5 `<canvas>` ONLY in CSS (e.g. style="width: 800px; height: 600px") without setting width and height attributes?',
        vi: 'Điều gì xảy ra nếu bạn CHỈ đặt kích thước của thẻ HTML5 `<canvas>` bằng CSS mà không khai báo thuộc tính width và height trên thẻ?'
      },
      options: [
        {
          en: 'The canvas retains its default 300x150 pixel drawing buffer and stretches the raster image to 800x600, causing blurry and pixelated graphics',
          vi: 'Canvas vẫn giữ bộ đệm vẽ 300x150 pixel mặc định và kéo giãn bức ảnh raster đó lên 800x600, khiến đồ họa bị mờ vỡ hạt'
        },
        {
          en: 'The browser throws a Fatal Canvas Exception',
          vi: 'Trình duyệt ném ra ngoại lệ nghiêm trọng Fatal Canvas Exception'
        },
        {
          en: 'The canvas becomes completely transparent and unclickable',
          vi: 'Canvas bị biến thành trong suốt hoàn toàn và không bấm được'
        },
        {
          en: 'The CSS overrides the drawing buffer automatically with zero blurriness',
          vi: 'CSS tự động ghi đè bộ đệm vẽ mà không bị nhòe hình'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Canvas attributes determine internal pixel resolution; CSS only sets display scale.',
        vi: 'Thuộc tính trên thẻ canvas quyết định độ phân giải pixel nội bộ; CSS chỉ điều khiển kích thước phóng to thu nhỏ bên ngoài.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_20_2',
      type: 'single_choice',
      question: {
        en: 'When should you choose HTML5 Canvas over SVG for web graphics?',
        vi: 'Khi nào bạn nên chọn HTML5 Canvas thay vì SVG cho đồ họa web?'
      },
      options: [
        {
          en: 'For high-frequency dynamic rendering with thousands of objects (e.g. 60fps games, particle physics simulations, pixel photo filters)',
          vi: 'Khi cần kết xuất động tần số cao với hàng ngàn đối tượng chuyển động (vd: game 60fps, mô phỏng vật lý hạt, bộ lọc điểm ảnh)'
        },
        {
          en: 'When creating responsive vector logos and user interface icons',
          vi: 'Khi tạo logo vector đáp ứng và biểu tượng giao diện'
        },
        {
          en: 'When individual graphic elements need DOM click event listeners and CSS hover effects',
          vi: 'Khi từng phần tử hình ảnh cần bắt sự kiện click DOM và hiệu ứng hover CSS'
        },
        {
          en: 'When printing vector documents on paper',
          vi: 'Khi in ấn tài liệu vector ra giấy'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Canvas executes immediate-mode rendering best suited for heavy procedural computations and fast frame rates.',
        vi: 'Canvas thực thi cơ chế vẽ chế độ tức thời (immediate-mode), tối ưu nhất cho tính toán thủ tục nặng và tốc độ khung hình cao.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_20_3',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of placing fallback markup (like <p> or <table>) inside the `<canvas>...</canvas>` tags?',
        vi: 'Mục đích của việc đặt nội dung dự phòng (như <p> hoặc <table>) bên trong thẻ `<canvas>...</canvas>` là gì?'
      },
      options: [
        {
          en: 'It is exposed to screen readers and displayed on legacy browsers that do not support the canvas element',
          vi: 'Nó được cung cấp cho trình đọc màn hình và hiển thị trên các trình duyệt cũ không hỗ trợ canvas'
        },
        {
          en: 'It acts as CSS watermarks underneath the drawn graphics',
          vi: 'Nó đóng vai trò là watermark CSS nằm dưới hình vẽ'
        },
        {
          en: 'It saves drawing commands to local storage',
          vi: 'Nó lưu các lệnh vẽ vào local storage'
        },
        {
          en: 'It is compiled into WebAssembly bytecode',
          vi: 'Nó được biên dịch thành mã bytecode WebAssembly'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Canvas inner DOM content provides accessibility and degradation fallbacks.',
        vi: 'Nội dung DOM bên trong canvas cung cấp giải pháp trợ năng và thoái lui an toàn.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_20_4',
      type: 'single_choice',
      question: {
        en: 'How do you obtain the 2D rendering interface for a canvas element in JavaScript?',
        vi: 'Làm thế nào để lấy giao diện kết xuất 2D của một phần tử canvas trong JavaScript?'
      },
      options: [
        {
          en: 'const ctx = canvas.getContext("2d");',
          vi: 'const ctx = canvas.getContext("2d");'
        },
        {
          en: 'const ctx = canvas.create2D();',
          vi: 'const ctx = canvas.create2D();'
        },
        {
          en: 'const ctx = canvas.render2D();',
          vi: 'const ctx = canvas.render2D();'
        },
        {
          en: 'const ctx = canvas.getEngine("2d");',
          vi: 'const ctx = canvas.getEngine("2d");'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'getContext("2d") returns the CanvasRenderingContext2D object.',
        vi: 'getContext("2d") trả về đối tượng CanvasRenderingContext2D.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_20_5',
      type: 'single_choice',
      question: {
        en: 'Where is coordinate (0, 0) located in the HTML5 Canvas 2D coordinate system?',
        vi: 'Tọa độ (0, 0) nằm ở vị trí nào trong hệ tọa độ 2D của HTML5 Canvas?'
      },
      options: [
        {
          en: 'Top-left corner',
          vi: 'Góc trên cùng bên trái'
        },
        {
          en: 'Bottom-left corner',
          vi: 'Góc dưới cùng bên trái'
        },
        {
          en: 'Exact center',
          vi: 'Chính giữa trung tâm'
        },
        {
          en: 'Top-right corner',
          vi: 'Góc trên cùng bên phải'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Screen and canvas coordinates place the origin (0, 0) at top-left, with positive Y extending downwards.',
        vi: 'Hệ tọa độ màn hình và canvas đặt gốc (0, 0) ở góc trên bên trái, trục Y dương hướng xuống dưới.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_20_6',
      type: 'single_choice',
      question: {
        en: 'Why is window.requestAnimationFrame preferred over setInterval for driving canvas animation loops?',
        vi: 'Tại sao window.requestAnimationFrame được ưa chuộng hơn setInterval để chạy vòng lặp hoạt ảnh canvas?'
      },
      options: [
        {
          en: 'It synchronizes animation frames with the browser refresh rate (usually 60Hz/120Hz) and automatically pauses when the browser tab is in the background to save battery',
          vi: 'Nó đồng bộ khung hình với tần số quét của màn hình (thường là 60Hz/120Hz) và tự động tạm dừng khi tab trình duyệt bị ẩn để tiết kiệm pin'
        },
        {
          en: 'It uses 100% CPU on all cores',
          vi: 'Nó tận dụng 100% CPU trên tất cả các nhân'
        },
        {
          en: 'It bypasses the GPU completely',
          vi: 'Nó bỏ qua GPU hoàn toàn'
        },
        {
          en: 'It converts canvas to MP4 video automatically',
          vi: 'Nó tự động chuyển canvas thành video MP4'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'requestAnimationFrame delivers smooth, battery-efficient animation loops matched to screen refresh cycles.',
        vi: 'requestAnimationFrame mang lại vòng lặp hoạt ảnh mượt mà, tiết kiệm pin và đồng bộ với chu kỳ quét của màn hình.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'medium'
    },
    {
      id: 'html_q_20_7',
      type: 'single_choice',
      question: {
        en: 'Which method clears all pixels inside a rectangular region on a 2D canvas back to transparent black?',
        vi: 'Phương thức nào xóa toàn bộ pixel trong một vùng chữ nhật trên canvas 2D trở về trạng thái trong suốt?'
      },
      options: [
        {
          en: 'ctx.clearRect(x, y, width, height)',
          vi: 'ctx.clearRect(x, y, width, height)'
        },
        {
          en: 'ctx.removeRect(x, y, width, height)',
          vi: 'ctx.removeRect(x, y, width, height)'
        },
        {
          en: 'ctx.delete(x, y, width, height)',
          vi: 'ctx.delete(x, y, width, height)'
        },
        {
          en: 'ctx.reset()',
          vi: 'ctx.reset()'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'clearRect() sets all pixels in the rectangle to transparent transparent (rgba(0,0,0,0)).',
        vi: 'clearRect() đặt tất cả các điểm ảnh trong hình chữ nhật về màu trong suốt (rgba(0,0,0,0)).'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_20_8',
      type: 'single_choice',
      question: {
        en: 'How do you render filled text onto a 2D canvas surface?',
        vi: 'Làm thế nào để vẽ chữ có màu lấp đầy lên bề mặt canvas 2D?'
      },
      options: [
        {
          en: 'ctx.fillText("Hello World", x, y)',
          vi: 'ctx.fillText("Hello World", x, y)'
        },
        {
          en: 'ctx.drawText("Hello World", x, y)',
          vi: 'ctx.drawText("Hello World", x, y)'
        },
        {
          en: 'ctx.write("Hello World", x, y)',
          vi: 'ctx.write("Hello World", x, y)'
        },
        {
          en: 'ctx.print("Hello World", x, y)',
          vi: 'ctx.print("Hello World", x, y)'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'fillText(text, x, y) draws solid characters using the active fillStyle and font.',
        vi: 'fillText(text, x, y) vẽ các ký tự đặc bằng cách sử dụng fillStyle và font hiện tại.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_20_9',
      type: 'single_choice',
      question: {
        en: 'What mathematical constant is used when drawing a full 360-degree circle with ctx.arc(x, y, radius, 0, ...)?',
        vi: 'Hằng số toán học nào được dùng khi vẽ một hình tròn 360 độ hoàn chỉnh với ctx.arc(x, y, radius, 0, ...)?'
      },
      options: [
        {
          en: 'Math.PI * 2 (2π radians)',
          vi: 'Math.PI * 2 (2π radian)'
        },
        {
          en: '360 degrees',
          vi: '360 độ'
        },
        {
          en: 'Math.PI',
          vi: 'Math.PI'
        },
        {
          en: 'Math.E * 100',
          vi: 'Math.E * 100'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Angles in canvas arc methods are measured in radians, where a full circle is 2 * PI radians (approx 6.283).',
        vi: 'Góc trong phương thức arc của canvas được tính bằng radian, trong đó một vòng tròn hoàn chỉnh là 2 * PI radian.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'easy'
    },
    {
      id: 'html_q_20_10',
      type: 'single_choice',
      question: {
        en: 'How do you prevent blurriness when drawing on a Canvas on High-DPI / Retina displays?',
        vi: 'Làm thế nào để tránh bị mờ khi vẽ trên Canvas ở các màn hình Retina / High-DPI độ phân giải cao?'
      },
      options: [
        {
          en: 'Multiply the canvas internal width/height attributes by window.devicePixelRatio and scale the context drawing operations with ctx.scale(dpr, dpr)',
          vi: 'Nhân các thuộc tính width/height nội bộ của canvas với window.devicePixelRatio và co tỉ lệ các phép vẽ ngữ cảnh bằng ctx.scale(dpr, dpr)'
        },
        {
          en: 'Use image-rendering: pixelated in CSS',
          vi: 'Dùng image-rendering: pixelated trong CSS'
        },
        {
          en: 'Set canvas.quality = "ultra-hd"',
          vi: 'Đặt canvas.quality = "ultra-hd"'
        },
        {
          en: 'Convert all shapes to JPEG format',
          vi: 'Chuyển tất cả các hình sang định dạng JPEG'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Scaling the backing store resolution to match the physical device pixel ratio ensures sharp 1:1 pixel rendering.',
        vi: 'Phóng to độ phân giải bộ đệm vẽ khớp với tỉ lệ pixel thiết bị vật lý đảm bảo hiển thị sắc nét 1:1.'
      },
      topicId: 'html_canvas_graphics',
      difficulty: 'hard'
    }
  ]
};

export default lesson16;
