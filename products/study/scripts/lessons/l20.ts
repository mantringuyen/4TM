import { RawLessonSource } from './rawLessonType';

export const lesson20: RawLessonSource = {
  order: 20,
  id: 'html_lesson_20',
  moduleId: 'html_mod_6',
  levelId: 'advanced',
  topicId: 'html_canvas_svg_pwa_capstone',
  titleEn: 'HTML5 Canvas, SVG Graphics, PWA Architecture & Course Capstone',
  titleVi: 'Đồ Họa Canvas HTML5, Tích Hợp SVG, Kiến Trúc PWA & Đồ Án Tốt Nghiệp',
  summaryEn: 'Synthesize the entire HTML5 engineering masterclass: procedural raster graphics with <canvas> and 2D context vs declarative vector mathematics with inline <svg>, accessible canvas fallbacks, Progressive Web App manifests, Service Worker registration pipelines, and production architecture best practices.',
  summaryVi: 'Tổng hợp toàn bộ tinh hoa kỹ thuật HTML5: đồ họa raster thủ tục với <canvas> và 2D context so với toán học vector khai báo bằng <svg> nội dòng, nội dung trợ năng dự phòng cho canvas, Web App Manifest cho PWA, quy trình đăng ký Service Worker và kiến trúc chuẩn sản xuất.',
  estimatedMinutes: 15,
  introEn: 'Congratulations on reaching the capstone lesson of the 4TM HTML5 curriculum! In this final masterclass, you will integrate advanced graphics rendering with progressive web app architecture to build modern web experiences.',
  introVi: 'Chúc mừng bạn đã đến với bài học đồ án tổng kết của khóa học HTML5 trên nền tảng 4TM! Trong bài học đỉnh cao này, bạn sẽ tích hợp đồ họa nâng cao cùng kiến trúc ứng dụng web lũy tiến (PWA) chuẩn công nghiệp.',
  conceptEn: 'Choose the right graphics engine: (1) Use <svg> for resolution-independent scalable icons, charts, and interactive DOM UI nodes with CSS animations and full accessibility. (2) Use <canvas width="800" height="600"> for high-performance pixel-manipulation, 60fps real-time games, physics simulations, and WebGL 3D rendering. Always provide rich accessible fallback HTML inside the <canvas> element. For PWA, link <link rel="manifest" href="/manifest.webmanifest"> and register a service worker for offline resilience.',
  conceptVi: 'Lựa chọn đúng công cụ đồ họa: (1) Dùng <svg> cho icon phóng to không vỡ hạt, biểu đồ và các nút giao diện DOM có hiệu ứng CSS và hỗ trợ trợ năng đầy đủ. (2) Dùng <canvas width="800" height="600"> cho xử lý pixel hiệu năng cao, game 60fps thời gian thực, mô phỏng vật lý và đồ họa WebGL 3D. Luôn cung cấp văn bản HTML dự phòng chuẩn trợ năng bên trong thẻ <canvas>. Với PWA, liên kết <link rel="manifest" href="/manifest.webmanifest"> và đăng ký Service Worker để chạy khi mất mạng.',
  syntax: '<!-- 1. Inline Accessible Scalable Vector Graphic (SVG) -->\n<svg viewBox="0 0 100 100" width="100" height="100" role="img" aria-labelledby="svg-title svg-desc">\n  <title id="svg-title">Growth Trajectory Chart</title>\n  <desc id="svg-desc">Green line trending upward by 45% in Q3.</desc>\n  <circle cx="50" cy="50" r="40" fill="#38bdf8" />\n</svg>\n\n<!-- 2. Hardware-Accelerated Canvas with Accessible Fallback -->\n<canvas id="game-canvas" width="800" height="500">\n  <p>Your browser does not support HTML5 Canvas. Here is a summary of the game state: Score: 1200.</p>\n</canvas>\n\n<!-- 3. Progressive Web App Manifest & Service Worker Registration -->\n<link rel="manifest" href="/manifest.webmanifest">\n<script>\n  if (\'serviceWorker\' in navigator) {\n    window.addEventListener(\'load\', () => navigator.serviceWorker.register(\'/sw.js\'));\n  }\n</script>',
  ex1TitleEn: 'Accessible Interactive Inline SVG with Title, Desc and CSS Variables',
  ex1TitleVi: 'Đồ Họa Vector SVG Nội Dòng Trợ Năng Kèm Title, Desc Và Biến CSS',
  ex1Code: '<svg\n  viewBox="0 0 200 120"\n  width="200"\n  height="120"\n  role="img"\n  aria-labelledby="chart-title chart-desc"\n  style="max-width:100%; height:auto;">\n  <title id="chart-title">Quarterly Revenue Growth</title>\n  <desc id="chart-desc">Bar chart displaying steady climb from $10k in Jan to $45k in Apr.</desc>\n  \n  <!-- Grid Lines -->\n  <line x1="20" y1="100" x2="180" y2="100" stroke="#cbd5e1" stroke-width="2" />\n  \n  <!-- Data Bars with hover interaction -->\n  <rect x="30" y="70" width="25" height="30" fill="#3b82f6" rx="4" />\n  <rect x="70" y="50" width="25" height="50" fill="#3b82f6" rx="4" />\n  <rect x="110" y="30" width="25" height="70" fill="#2563eb" rx="4" />\n  <rect x="150" y="15" width="25" height="85" fill="#1d4ed8" rx="4" />\n</svg>',
  ex1ExpEn: 'Inline SVG gives complete DOM accessibility, CSS styling, and resolution independence.',
  ex1ExpVi: 'SVG nội dòng mang lại khả năng trợ năng DOM hoàn hảo, định kiểu bằng CSS và không bao giờ bị vỡ hạt.',
  ex2TitleEn: 'Real-Time 2D Canvas with Accessible DOM Fallback Table',
  ex2TitleVi: 'Vẽ Canvas 2D Thời Gian Thực Kèm Bảng Dữ Liệu DOM Dự Phòng Trợ Năng',
  ex2Code: '<div class="canvas-container">\n  <canvas id="telemetry-chart" width="600" height="300" style="border:1px solid #cbd5e1; border-radius:8px;">\n    <!-- Accessible Fallback Table rendered for screen readers and search engines -->\n    <table>\n      <caption>System Telemetry Metrics (Last 4 Minutes)</caption>\n      <thead>\n        <tr><th>Time</th><th>CPU %</th><th>Memory %</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>12:00</td><td>32%</td><td>45%</td></tr>\n        <tr><td>12:01</td><td>48%</td><td>50%</td></tr>\n        <tr><td>12:02</td><td>40%</td><td>48%</td></tr>\n      </tbody>\n    </table>\n  </canvas>\n</div>\n\n<script>\n  const canvas = document.getElementById(\'telemetry-chart\');\n  if (canvas && canvas.getContext) {\n    const ctx = canvas.getContext(\'2d\');\n    ctx.fillStyle = \'#0f172a\';\n    ctx.fillRect(0, 0, 600, 300);\n    ctx.fillStyle = \'#38bdf8\';\n    ctx.font = \'bold 16px sans-serif\';\n    ctx.fillText(\'Live Telemetry Rendering Engine\', 20, 40);\n  }\n</script>',
  ex2ExpEn: 'Screen readers parse the accessible fallback table nested inside the <canvas> while visual users see real-time graphics.',
  ex2ExpVi: 'Trình đọc màn hình đọc bảng dữ liệu dự phòng bên trong thẻ <canvas> trong khi mắt thường nhìn thấy đồ họa động thời gian thực.',
  mistake1En: 'Setting canvas dimensions via CSS width/height instead of HTML attributes width and height',
  mistake1Vi: 'Đặt kích thước canvas bằng CSS width/height thay vì dùng thuộc tính width và height của HTML',
  correction1En: 'CSS width/height only stretches the rendered canvas surface (causing blurry distorted graphics). HTML width="800" height="600" sets the actual internal pixel drawing buffer resolution.',
  correction1Vi: 'CSS width/height chỉ co giãn bề mặt hiển thị làm vỡ mờ hình ảnh. Thuộc tính HTML width="800" height="600" mới là kích thước bộ nhớ đệm pixel vẽ thực sự.',
  mistake2En: 'Leaving <canvas> empty with no accessible fallback content between the tags',
  mistake2Vi: 'Để thẻ <canvas> rỗng không có nội dung HTML dự phòng trợ năng bên trong',
  correction2En: 'Canvas elements are completely invisible black boxes to screen readers and search engine crawlers. Always place an accessible HTML table, list, or text description inside <canvas>...</canvas>.',
  correction2Vi: 'Thẻ Canvas là một hộp đen hoàn toàn vô hình đối với trình đọc màn hình và bọ tìm kiếm. Luôn đặt bảng, danh sách hoặc mô tả HTML bên trong thẻ <canvas>.',
  tipEn: 'Pair your modern HTML5 application with a Web App Manifest (<link rel="manifest" href="/manifest.webmanifest">) and Service Worker to enable native home-screen installation and offline caching.',
  tipVi: 'Kết hợp ứng dụng HTML5 với Web App Manifest và Service Worker để cho phép cài đặt ra màn hình chính điện thoại và hoạt động khi mất mạng.',
  practiceTaskEn: 'Build an Accessible SVG Graphic with Title and Desc',
  practiceTaskVi: 'Xây dựng đồ họa SVG trợ năng kèm title và desc',
  practiceInstEn: 'Create an <svg viewBox="0 0 100 100" role="img" aria-labelledby="s-title"><title id="s-title">Success Check</title><circle cx="50" cy="50" r="40" fill="#22c55e"/></svg>.',
  practiceInstVi: 'Tạo thẻ <svg viewBox="0 0 100 100" role="img" aria-labelledby="s-title"><title id="s-title">Success Check</title><circle cx="50" cy="50" r="40" fill="#22c55e"/></svg>.',
  practiceStarter: '<svg>\n  \n</svg>',
  practiceSolution: '<svg viewBox="0 0 100 100" role="img" aria-labelledby="s-title">\n  <title id="s-title">Success Check</title>\n  <circle cx="50" cy="50" r="40" fill="#22c55e"/>\n</svg>',
  practicePatterns: ['viewBox="0 0 100 100"', 'role="img"', 'aria-labelledby="s-title"', '<title id="s-title">Success Check</title>', '<circle cx="50" cy="50" r="40" fill="#22c55e"/>'],
  practiceHintEn: 'Include viewBox, role="img", aria-labelledby, <title>, and the <circle>.',
  practiceHintVi: 'Bao gồm viewBox, role="img", aria-labelledby, <title>, và <circle>.',

  exercises: [
    {
      id: 'html_ex_20_1',
      type: 'complete_code',
      titleEn: 'Add Accessible Fallback to <canvas> Element',
      titleVi: 'Thêm nội dung dự phòng trợ năng vào phần tử canvas',
      instEn: 'Add fallback text <p>Sales in Q1 reached 50,000 units.</p> inside the <canvas> tag.',
      instVi: 'Thêm văn bản dự phòng <p>Sales in Q1 reached 50,000 units.</p> vào trong thẻ <canvas>.',
      starter: '<canvas id="sales-chart" width="400" height="200">\n</canvas>',
      solution: '<canvas id="sales-chart" width="400" height="200">\n  <p>Sales in Q1 reached 50,000 units.</p>\n</canvas>',
      hintEn: 'Place the paragraph inside the canvas open and close tags.',
      hintVi: 'Đặt đoạn văn vào giữa thẻ mở và đóng của canvas.',
      expEn: 'Text inside <canvas> is read by screen readers and presented if the browser cannot render canvas.',
      expVi: 'Chữ bên trong <canvas> được trình đọc màn hình đọc to khi người khiếm thị duyệt qua.'
    },
    {
      id: 'html_ex_20_2',
      type: 'fix_code',
      titleEn: 'Fix Blurry Canvas by Specifying HTML Pixel Buffer Dimensions',
      titleVi: 'Sửa lỗi mờ canvas bằng cách khai báo kích thước pixel trong HTML',
      instEn: 'Add width="800" height="400" attributes directly onto the <canvas> element.',
      instVi: 'Thêm thuộc tính width="800" height="400" trực tiếp lên phần tử <canvas>.',
      starter: '<canvas id="game-view"></canvas>',
      solution: '<canvas id="game-view" width="800" height="400"></canvas>',
      hintEn: 'Add width="800" and height="400" to the opening canvas tag.',
      hintVi: 'Thêm width="800" và height="400" vào thẻ mở canvas.',
      expEn: 'HTML width and height configure the intrinsic coordinate space of the 2D/WebGL drawing buffer.',
      expVi: 'width và height trên HTML thiết lập không gian tọa độ thực của bộ đệm vẽ 2D/WebGL.'
    },
    {
      id: 'html_ex_20_3',
      type: 'write_code',
      titleEn: 'Link Web App Manifest for PWA Capabilities',
      titleVi: 'Liên kết Web App Manifest cho ứng dụng PWA',
      instEn: 'Write a <link rel="manifest" href="/manifest.webmanifest"> tag.',
      instVi: 'Viết thẻ <link rel="manifest" href="/manifest.webmanifest">.',
      starter: '',
      solution: '<link rel="manifest" href="/manifest.webmanifest">',
      hintEn: 'Use rel="manifest" and href="/manifest.webmanifest".',
      hintVi: 'Dùng rel="manifest" và href="/manifest.webmanifest".',
      expEn: 'The manifest file informs the operating system of app names, theme colors, and icons for native installation.',
      expVi: 'Tệp manifest thông báo cho hệ điều hành tên ứng dụng, màu giao diện và biểu tượng để cài đặt ra màn hình chính.'
    },
    {
      id: 'html_ex_20_4',
      type: 'modify_example',
      titleEn: 'Add role="img" and Accessible Title to Inline SVG',
      titleVi: 'Thêm role="img" và tiêu đề trợ năng vào SVG nội dòng',
      instEn: 'Add role="img" and aria-labelledby="gear-icon-title" to the <svg> and insert <title id="gear-icon-title">Settings Engine</title>.',
      instVi: 'Thêm role="img" và aria-labelledby="gear-icon-title" vào <svg> và chèn thẻ <title id="gear-icon-title">Settings Engine</title>.',
      starter: '<svg viewBox="0 0 24 24" width="24" height="24">\n  <circle cx="12" cy="12" r="10" />\n</svg>',
      solution: '<svg viewBox="0 0 24 24" width="24" height="24" role="img" aria-labelledby="gear-icon-title">\n  <title id="gear-icon-title">Settings Engine</title>\n  <circle cx="12" cy="12" r="10" />\n</svg>',
      hintEn: 'Add role="img", aria-labelledby, and <title>.',
      hintVi: 'Thêm role="img", aria-labelledby, và <title>.',
      expEn: 'Inline SVGs with role="img" and title elements are fully recognized by accessibility APIs.',
      expVi: 'SVG nội dòng có role="img" và thẻ title được các API trợ năng nhận diện trọn vẹn.'
    },
    {
      id: 'html_ex_20_5',
      type: 'predict_output',
      titleEn: 'Predict Best Technology for High-Speed 60fps Real-Time Pixel Rendering',
      titleVi: 'Dự đoán công nghệ tốt nhất để dựng hình pixel 60fps tốc độ cao',
      instEn: 'Which HTML technology is built for high-performance procedural raster rendering and WebGL 3D: Canvas or SVG?',
      instVi: 'Công nghệ HTML nào được sinh ra để dựng hình raster thủ tục hiệu năng cao và WebGL 3D: Canvas hay SVG?',
      starter: '<!-- Type Canvas or SVG -->\n<p>Technology: </p>',
      solution: '<p>Technology: Canvas</p>',
      hintEn: 'Canvas manages a direct pixel bitmap context while SVG manages a DOM tree of vector nodes.',
      expEn: 'Canvas handles millions of raw pixels per second directly on the GPU without DOM tree overhead.',
      expVi: 'Canvas xử lý hàng triệu pixel mỗi giây trực tiếp trên card đồ họa GPU mà không tốn tài nguyên quản lý cây DOM.'
    }
  ],

  challenge: {
    id: 'html_ch_20',
    titleEn: 'Capstone: Production Enterprise Analytics Suite Architecture',
    titleVi: 'Đồ án tốt nghiệp: Kiến trúc hệ thống phân tích dữ liệu doanh nghiệp đỉnh cao',
    descEn: 'Build the master capstone interface combining semantic document structure, inline accessible SVG charts, 2D Canvas telemetry with accessible fallback tables, PWA manifest linking, and WAI-ARIA live regions.',
    descVi: 'Xây dựng giao diện đồ án tổng kết kết hợp cấu trúc ngữ nghĩa hoàn chỉnh, biểu đồ SVG trợ năng, telemetry bằng Canvas kèm bảng dự phòng, liên kết PWA và live region WAI-ARIA.',
    requirements: [
      { en: '<link rel="manifest" href="/manifest.webmanifest"> in <head>', vi: '<link rel="manifest" href="/manifest.webmanifest"> trong <head>' },
      { en: 'Skip Link: <a href="#analytics-main" class="skip-link">Skip to Analytics Content</a>', vi: 'Skip link trỏ tới #analytics-main' },
      { en: 'Main landmark: <main id="analytics-main" tabindex="-1">', vi: 'Thẻ main có id="analytics-main" và tabindex="-1"' },
      { en: 'Inline SVG Chart with role="img", aria-labelledby, <title>, and <desc>', vi: 'Biểu đồ SVG nội dòng có role="img", aria-labelledby, <title>, và <desc>' },
      { en: '<canvas id="gpu-chart" width="800" height="400"> containing an accessible fallback <table>', vi: '<canvas id="gpu-chart" width="800" height="400"> chứa bảng <table> dự phòng' },
      { en: '<div role="status" aria-live="polite" aria-atomic="true">All systems operational</div>', vi: 'Vùng live region role="status" thông báo trạng thái' }
    ],
    starter: '<!-- Build complete master capstone architecture here -->\n',
    solution: '<!DOCTYPE html>\n<html lang="en" dir="ltr">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Global Telemetry Analytics Suite | 4TM Enterprise</title>\n  <meta name="description" content="Mission-critical real-time telemetry, cluster health, and cloud infrastructure monitoring.">\n  <link rel="canonical" href="https://4tm.io/analytics">\n  <link rel="manifest" href="/manifest.webmanifest">\n</head>\n<body>\n  <a href="#analytics-main" class="skip-link">Skip to Analytics Content</a>\n\n  <header>\n    <nav aria-label="Suite Navigation">\n      <a href="/dashboard">Dashboard</a>\n      <a href="/clusters">Clusters</a>\n      <a href="/security">Security</a>\n    </nav>\n  </header>\n\n  <main id="analytics-main" tabindex="-1">\n    <h1>Global Telemetry Analytics Suite</h1>\n\n    <!-- Section 1: Vector SVG Metrics Chart -->\n    <section aria-labelledby="svg-sec-title">\n      <h2 id="svg-sec-title">Network Throughput (SVG)</h2>\n      <svg\n        viewBox="0 0 400 150"\n        width="400"\n        height="150"\n        role="img"\n        aria-labelledby="svg-title svg-desc">\n        <title id="svg-title">Global Ingress Traffic Trajectory</title>\n        <desc id="svg-desc">Throughput climbing steadily from 2.4 Tbps to 8.9 Tbps across all edge gateways.</desc>\n        <polyline\n          fill="none"\n          stroke="#0284c7"\n          stroke-width="3"\n          points="20,120 100,90 200,95 300,40 380,20" />\n      </svg>\n    </section>\n\n    <!-- Section 2: Hardware-Accelerated 2D Canvas with Accessible Data Table -->\n    <section aria-labelledby="canvas-sec-title">\n      <h2 id="canvas-sec-title">Real-Time Core Load (Canvas)</h2>\n      <canvas id="gpu-chart" width="800" height="400">\n        <table>\n          <caption>CPU Utilization per Node Group</caption>\n          <thead>\n            <tr><th>Cluster Node</th><th>Core Load</th><th>Temperature</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>US-East-1A</td><td>42%</td><td>54°C</td></tr>\n            <tr><td>EU-West-1B</td><td>38%</td><td>51°C</td></tr>\n            <tr><td>AP-East-1A</td><td>67%</td><td>62°C</td></tr>\n          </tbody>\n        </table>\n      </canvas>\n    </section>\n\n    <div role="status" aria-live="polite" aria-atomic="true">\n      All systems operational. Telemetry stream synchronized at 60 FPS.\n    </div>\n  </main>\n\n  <footer>\n    <p><small>&copy; 2026 4TM Technologies. All rights reserved.</small></p>\n  </footer>\n</body>\n</html>',
    hints: [
      { en: 'Ensure the <canvas> has width="800" and height="400" attributes directly in HTML', vi: 'Đảm bảo thẻ <canvas> có thuộc tính width="800" và height="400" trực tiếp trong HTML' },
      { en: 'Link SVG titles and descriptions using aria-labelledby with two IDs', vi: 'Liên kết tiêu đề và mô tả SVG bằng aria-labelledby với 2 ID tương ứng' }
    ],
    expEn: 'Flawless synthesis of modern HTML5 semantic architecture, accessible graphics, and progressive web application engineering.',
    expVi: 'Sự kết hợp hoàn hảo giữa kiến trúc ngữ nghĩa HTML5 hiện đại, đồ họa chuẩn trợ năng và công nghệ web lũy tiến PWA.'
  },

  challengeVariants: [
    {
      id: 'html_ch_20_v1',
      titleEn: 'Variant 1: Web Worker Multi-Threaded Heavy Calculation Pipeline',
      titleVi: 'Biến thể 1: Đa luồng Web Worker xử lý tính toán nặng ngầm',
      descEn: 'Build a page linking a background Web Worker script via <link rel="preload" as="worker" href="/worker.js"> with worker status announcements.',
      descVi: 'Xây dựng trang liên kết Web Worker ngầm bằng <link rel="preload" as="worker" href="/worker.js"> kèm thông báo trạng thái.',
      requirements: [
        { en: '<link rel="preload" href="/worker.js" as="worker">', vi: '<link rel="preload" href="/worker.js" as="worker">' },
        { en: '<div id="worker-status" role="status" aria-live="polite">Worker initialized</div>', vi: '<div id="worker-status" role="status" aria-live="polite">Worker initialized</div>' }
      ],
      starter: '<head>\n  \n</head>',
      solution: '<head>\n  <meta charset="utf-8">\n  <title>Worker Compute Engine</title>\n  <link rel="preload" href="/worker.js" as="worker">\n</head>\n<body>\n  <div id="worker-status" role="status" aria-live="polite">\n    Worker initialized and ready for computation.\n  </div>\n</body>',
      expEn: 'Web Workers offload heavy CPU mathematics off the main UI rendering thread to maintain a silky 60fps.',
      expVi: 'Web Worker chuyển việc tính toán CPU nặng ra khỏi luồng giao diện chính để giữ độ mượt 60fps.'
    },
    {
      id: 'html_ch_20_v2',
      titleEn: 'Variant 2: Offline Service Worker Caching Fallback Notice',
      titleVi: 'Biến thể 2: Thông báo trạng thái ngoại tuyến Offline Caching của Service Worker',
      descEn: 'Build an offline fallback interface using <noscript> and a connection status alert region.',
      descVi: 'Xây dựng giao diện ngoại tuyến dự phòng dùng <noscript> và vùng cảnh báo trạng thái mạng.',
      requirements: [
        { en: '<noscript><p>JavaScript is disabled. Browsing in static offline mode.</p></noscript>', vi: '<noscript> thông báo khi tắt JavaScript' },
        { en: '<div role="alert" aria-live="assertive" id="network-alert" hidden>You are currently offline.</div>', vi: 'Vùng alert thông báo khi mất mạng' }
      ],
      starter: '<body>\n  \n</body>',
      solution: '<body>\n  <noscript>\n    <p>JavaScript is disabled. Browsing in static offline cached mode.</p>\n  </noscript>\n  <div role="alert" aria-live="assertive" id="network-alert" hidden>\n    You are currently offline. Changes will sync when connectivity is restored.\n  </div>\n</body>',
      expEn: 'Progressive fallback design ensures content remains accessible across all connectivity conditions.',
      expVi: 'Thiết kế dự phòng lũy tiến đảm bảo người dùng luôn đọc được nội dung trong mọi điều kiện mạng.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_20_1',
      type: 'single_choice',
      qEn: 'What is the core architectural difference between <canvas> and <svg>?',
      qVi: 'Sự khác biệt cốt lõi về mặt kiến trúc giữa <canvas> và <svg> là gì?',
      options: [
        { en: 'Canvas is immediate-mode procedural raster pixel drawing with zero DOM nodes; SVG is retained-mode declarative vector XML with real DOM elements that support CSS and events', vi: 'Canvas là vẽ pixel raster trực tiếp tức thời không tạo nút DOM nào; SVG là đồ họa vector khai báo XML lưu giữ với các phần tử DOM thực thụ hỗ trợ CSS và sự kiện' },
        { en: 'SVG only works in black and white', vi: 'SVG chỉ vẽ được màu đen trắng' },
        { en: 'Canvas requires Flash Player', vi: 'Canvas yêu cầu cài Flash Player' },
        { en: 'There is zero technical difference', vi: 'Không có bất kỳ sự khác biệt kỹ thuật nào' }
      ],
      ans: 0,
      expEn: 'Canvas = pixel manipulation for games/simulations; SVG = scalable DOM vector shapes for UI/charts.',
      expVi: 'Canvas = xử lý pixel cho game/mô phỏng; SVG = đối tượng vector DOM co giãn cho UI/biểu đồ.'
    },
    {
      id: 'html_q_20_2',
      type: 'single_choice',
      qEn: 'Why should you always define canvas dimensions using HTML attributes (width="800" height="600") instead of CSS style?',
      qVi: 'Tại sao bạn luôn phải định nghĩa kích thước canvas bằng thuộc tính HTML (width="800" height="600") thay vì dùng CSS?',
      options: [
        { en: 'HTML width/height sets the actual internal pixel drawing buffer resolution, whereas CSS width/height merely stretches the bitmap image like a blurry projector', vi: 'Thuộc tính HTML width/height thiết lập độ phân giải bộ đệm vẽ pixel thực, trong khi CSS width/height chỉ phóng to kéo giãn bề mặt làm ảnh bị mờ hạt' },
        { en: 'CSS width on canvas crashes the browser', vi: 'Dùng CSS width trên canvas làm sập trình duyệt' },
        { en: 'HTML attributes make the canvas 3D automatically', vi: 'Thuộc tính HTML tự động biến canvas thành 3D' },
        { en: 'It is required by the JavaScript engine', vi: 'Bắt buộc bởi engine JavaScript' }
      ],
      ans: 0,
      expEn: 'HTML attributes configure the drawing buffer; CSS controls display layout sizing.',
      expVi: 'Thuộc tính HTML cấu hình bộ đệm pixel vẽ; CSS điều khiển kích thước khung hiển thị.'
    },
    {
      id: 'html_q_20_3',
      type: 'single_choice',
      qEn: 'How do you make an inline <svg> element accessible to screen reader assistive technologies?',
      qVi: 'Bạn làm cho phần tử <svg> nội dòng chuẩn trợ năng cho trình đọc màn hình bằng cách nào?',
      options: [
        { en: 'Add role="img", aria-labelledby="svg-title-id svg-desc-id", and include nested <title id="..."> and <desc id="..."> elements inside the SVG', vi: 'Thêm role="img", aria-labelledby="svg-title-id svg-desc-id", và đặt các phần tử <title id="..."> cùng <desc id="..."> bên trong SVG' },
        { en: 'Convert the SVG into a JPEG image', vi: 'Chuyển SVG thành ảnh JPEG' },
        { en: 'Print the SVG on paper', vi: 'In SVG ra giấy' },
        { en: 'Add alt="svg image" to the <svg> tag', vi: 'Thêm alt="svg image" vào thẻ <svg>' }
      ],
      ans: 0,
      expEn: 'role="img" with title and desc elements provides rich accessible metadata for vector graphics.',
      expVi: 'role="img" kết hợp thẻ title và desc mang lại siêu dữ liệu trợ năng hoàn chỉnh cho đồ họa vector.'
    },
    {
      id: 'html_q_20_4',
      type: 'single_choice',
      qEn: 'What is the purpose of placing fallback HTML (like a <table> or paragraph) INSIDE a <canvas> element?',
      qVi: 'Mục đích của việc đặt nội dung HTML dự phòng (như bảng <table> hoặc đoạn văn) BÊN TRONG thẻ <canvas> là gì?',
      options: [
        { en: 'Screen readers and search engine crawlers parse the internal fallback HTML to understand the chart data, since raw canvas pixels are completely inaccessible', vi: 'Trình đọc màn hình và bọ tìm kiếm sẽ đọc nội dung HTML bên trong để hiểu dữ liệu biểu đồ, vì pixel trên canvas vốn vô hình với công nghệ trợ năng' },
        { en: 'It paints the table onto the canvas automatically', vi: 'Nó tự động vẽ bảng lên canvas' },
        { en: 'It slows down canvas rendering', vi: 'Nó làm chậm tốc độ vẽ canvas' },
        { en: 'It is a deprecated feature from 1999', vi: 'Đó là tính năng cũ từ năm 1999' }
      ],
      ans: 0,
      expEn: 'Canvas fallback DOM nodes bridge the gap between high-performance graphics and accessibility compliance.',
      expVi: 'Nút DOM dự phòng trong canvas giúp dung hòa giữa hiệu năng đồ họa đỉnh cao và tiêu chuẩn trợ năng quốc tế.'
    },
    {
      id: 'html_q_20_5',
      type: 'single_choice',
      qEn: 'What is the purpose of the Web App Manifest file (<link rel="manifest" href="/manifest.webmanifest">)?',
      qVi: 'Mục đích của tệp Web App Manifest (<link rel="manifest" href="/manifest.webmanifest">) là gì?',
      options: [
        { en: 'Provides JSON metadata (app name, start_url, display mode, theme color, icons) allowing mobile and desktop operating systems to install the web app natively to the home screen', vi: 'Cung cấp siêu dữ liệu JSON (tên app, start_url, chế độ hiển thị, màu chủ đạo, icon) cho phép hệ điều hành cài đặt web app ra màn hình chính như app native' },
        { en: 'Encrypts all JavaScript files with AES-256', vi: 'Mã hóa toàn bộ file JavaScript bằng AES-256' },
        { en: 'Connects to a PostgreSQL database', vi: 'Kết nối tới cơ sở dữ liệu PostgreSQL' },
        { en: 'Translates the website into 50 languages', vi: 'Dịch website sang 50 thứ tiếng' }
      ],
      ans: 0,
      expEn: 'The manifest file is the foundation for Progressive Web App (PWA) installation.',
      expVi: 'Tệp manifest là nền tảng cốt lõi cho khả năng cài đặt ứng dụng web lũy tiến (PWA).'
    },
    {
      id: 'html_q_20_6',
      type: 'single_choice',
      qEn: 'What is a Service Worker in modern web application architecture?',
      qVi: 'Service Worker là gì trong kiến trúc ứng dụng web hiện đại?',
      options: [
        { en: 'A client-side programmable network proxy running in a background thread that intercepts fetch requests, manages offline caches, and enables push notifications', vi: 'Một máy chủ proxy mạng lập trình được chạy ở luồng ngầm trình duyệt giúp chặn bắt các request mạng, quản lý bộ nhớ đệm offline và bật thông báo đẩy' },
        { en: 'A human employee who fixes web servers', vi: 'Một nhân viên kỹ thuật sửa máy chủ' },
        { en: 'A CSS preprocessor like SASS', vi: 'Một bộ tiền xử lý CSS như SASS' },
        { en: 'A database indexing service', vi: 'Một dịch vụ đánh chỉ mục cơ sở dữ liệu' }
      ],
      ans: 0,
      expEn: 'Service workers provide complete offline caching and resilience against network drops.',
      expVi: 'Service worker mang lại khả năng lưu cache offline hoàn hảo và chống rớt mạng cho web app.'
    },
    {
      id: 'html_q_20_7',
      type: 'single_choice',
      qEn: 'What does the <noscript> element do?',
      qVi: 'Phần tử <noscript> có tác dụng gì?',
      options: [
        { en: 'Renders fallback HTML content exclusively when JavaScript is disabled in the user\'s browser or failed to load due to strict network firewalls', vi: 'Hiển thị nội dung HTML dự phòng riêng khi JavaScript bị tắt trong trình duyệt hoặc không tải được do tường lửa mạng' },
        { en: 'Disables JavaScript on the entire computer', vi: 'Tắt JavaScript trên toàn bộ máy tính' },
        { en: 'Translates JavaScript into TypeScript', vi: 'Chuyển JavaScript sang TypeScript' },
        { en: 'Deletes all scripts on page load', vi: 'Xóa toàn bộ script khi tải trang' }
      ],
      ans: 0,
      expEn: '<noscript> provides graceful progressive degradation for script-disabled environments.',
      expVi: '<noscript> cung cấp giải pháp hạ cấp mượt mà cho các môi trường không hỗ trợ script.'
    },
    {
      id: 'html_q_20_8',
      type: 'single_choice',
      qEn: 'What is the primary benefit of vector SVG graphics over raster JPEG/PNG graphics?',
      qVi: 'Lợi ích chính của đồ họa vector SVG so với ảnh raster JPEG/PNG là gì?',
      options: [
        { en: 'SVGs scale infinitely to any screen resolution without blurring or increasing file size, and their internal paths can be styled with CSS', vi: 'SVG co giãn vô hạn ở mọi độ phân giải màn hình mà không bị vỡ mờ hay tăng dung lượng file, và các đường nét có thể định kiểu bằng CSS' },
        { en: 'SVGs can only be viewed in Adobe Photoshop', vi: 'SVG chỉ xem được trong Adobe Photoshop' },
        { en: 'SVGs take up 100MB of storage', vi: 'SVG tốn 100MB dung lượng lưu trữ' },
        { en: 'SVGs play sound effects when clicked', vi: 'SVG phát âm thanh khi click' }
      ],
      ans: 0,
      expEn: 'Vector mathematics provide resolution independence and dynamic CSS theming.',
      expVi: 'Toán học vector mang lại khả năng hiển thị độc lập độ phân giải và đổi màu linh hoạt qua CSS.'
    },
    {
      id: 'html_q_20_9',
      type: 'single_choice',
      qEn: 'What does display="standalone" in a manifest.json file do when a user launches a PWA from their phone home screen?',
      qVi: 'Thuộc tính display="standalone" trong tệp manifest.json làm gì khi người dùng mở PWA từ màn hình chính điện thoại?',
      options: [
        { en: 'Opens the app in its own dedicated window without any browser address bar, back/forward buttons, or browser navigation chrome (like a native native app)', vi: 'Mở ứng dụng trong cửa sổ riêng biệt không có thanh địa chỉ trình duyệt, không có nút back/forward (trải nghiệm như app native)' },
        { en: 'Stands the phone up on the table', vi: 'Dựng điện thoại đứng trên bàn' },
        { en: 'Disables the phone touchscreen', vi: 'Tắt màn hình cảm ứng của điện thoại' },
        { en: 'Opens 10 browser tabs at once', vi: 'Mở 10 tab trình duyệt cùng lúc' }
      ],
      ans: 0,
      expEn: 'display: standalone hides browser UI controls for an immersive app experience.',
      expVi: 'display: standalone ẩn các thanh điều khiển của trình duyệt tạo trải nghiệm toàn màn hình như ứng dụng gốc.'
    },
    {
      id: 'html_q_20_10',
      type: 'single_choice',
      qEn: 'How does WebGL relate to the HTML5 <canvas> element?',
      qVi: 'WebGL có mối liên hệ như thế nào với phần tử <canvas> của HTML5?',
      options: [
        { en: 'WebGL is a 3D rendering context API accessed via canvas.getContext("webgl2") for GPU-accelerated 3D graphics and shaders', vi: 'WebGL là một API ngữ cảnh dựng hình 3D truy cập qua lệnh canvas.getContext("webgl2") để xử lý đồ họa 3D và shader bằng GPU' },
        { en: 'WebGL replaces the HTML language completely', vi: 'WebGL thay thế hoàn toàn ngôn ngữ HTML' },
        { en: 'WebGL only works on gaming consoles', vi: 'WebGL chỉ chạy trên máy chơi game' },
        { en: 'WebGL is a CSS animation plugin', vi: 'WebGL là một plugin hoạt hình CSS' }
      ],
      ans: 0,
      expEn: '<canvas> is the host DOM element for both 2D (canvas 2d) and 3D (WebGL / WebGPU) graphics.',
      expVi: '<canvas> là phần tử DOM chứa cho cả đồ họa 2D (canvas 2d) lẫn 3D (WebGL / WebGPU).'
    },
    {
      id: 'html_q_20_11',
      type: 'single_choice',
      qEn: 'What JavaScript method is used to create smooth, power-efficient 60fps animations on an HTML5 canvas?',
      qVi: 'Phương thức JavaScript nào được dùng để tạo hoạt ảnh 60fps mượt mà và tiết kiệm pin trên HTML5 canvas?',
      options: [
        { en: 'window.requestAnimationFrame(callback)', vi: 'window.requestAnimationFrame(callback)' },
        { en: 'setInterval(callback, 1)', vi: 'setInterval(callback, 1)' },
        { en: 'setTimeout(callback, 0)', vi: 'setTimeout(callback, 0)' },
        { en: 'while(true) { render(); }', vi: 'while(true) { render(); }' }
      ],
      ans: 0,
      expEn: 'requestAnimationFrame syncs rendering directly with the monitor refresh rate (vsync).',
      expVi: 'requestAnimationFrame đồng bộ hóa việc vẽ hình trực tiếp với tần số quét của màn hình (vsync).'
    },
    {
      id: 'html_q_20_12',
      type: 'single_choice',
      qEn: 'Can you animate SVG elements using standard CSS transitions and @keyframes animations?',
      qVi: 'Bạn có thể tạo hoạt ảnh cho các phần tử SVG bằng CSS transition và @keyframes thông thường không?',
      options: [
        { en: 'Yes, SVG elements are full DOM nodes whose fill, stroke, transform, and opacity properties can be animated directly in CSS', vi: 'Có, các thẻ trong SVG là các nút DOM thực thụ có fill, stroke, transform và opacity có thể tạo chuyển động trực tiếp bằng CSS' },
        { en: 'No, SVGs can only be animated with Adobe Flash', vi: 'Không, SVG chỉ chuyển động được bằng Adobe Flash' },
        { en: 'Only if converted to MP4 video first', vi: 'Chỉ khi chuyển thành video MP4 trước' },
        { en: 'Only on Apple devices', vi: 'Chỉ trên thiết bị Apple' }
      ],
      ans: 0,
      expEn: 'Inline SVG integrates seamlessly with CSS animation and hover transitions.',
      expVi: 'SVG nội dòng kết hợp hoàn hảo với hoạt ảnh CSS và hiệu ứng rê chuột.'
    },
    {
      id: 'html_q_20_13',
      type: 'single_choice',
      qEn: 'What is the purpose of the viewBox attribute on an <svg> tag (e.g. viewBox="0 0 100 100")?',
      qVi: 'Mục đích của thuộc tính viewBox trên thẻ <svg> (như viewBox="0 0 100 100") là gì?',
      options: [
        { en: 'Defines the internal coordinate system and aspect ratio bounding box, enabling the vector graphic to scale responsively to any outer width/height', vi: 'Định nghĩa hệ tọa độ nội bộ và khung tỷ lệ, cho phép đồ họa vector co giãn đáp ứng linh hoạt theo mọi width/height bên ngoài' },
        { en: 'Sets the background color to white', vi: 'Đặt màu nền thành màu trắng' },
        { en: 'Zooms in 100x into the user\'s screen', vi: 'Phóng to 100 lần vào màn hình' },
        { en: 'Hides the SVG from mobile devices', vi: 'Ẩn SVG khỏi thiết bị di động' }
      ],
      ans: 0,
      expEn: 'viewBox establishes the relative coordinate canvas space for resolution-independent vector scaling.',
      expVi: 'viewBox thiết lập không gian tọa độ tương đối giúp vector co giãn không giới hạn độ phân giải.'
    },
    {
      id: 'html_q_20_14',
      type: 'single_choice',
      qEn: 'What happens if a user visits a properly configured Progressive Web App when their device has zero internet connectivity?',
      qVi: 'Điều gì xảy ra khi người dùng truy cập một ứng dụng PWA đã cấu hình chuẩn trong điều kiện thiết bị mất hoàn toàn kết nối mạng?',
      options: [
        { en: 'The Service Worker intercepts the request and serves cached HTML, CSS, JS, and data from Cache Storage, providing an uninterrupted offline experience', vi: 'Service Worker chặn bắt yêu cầu và lấy sẵn HTML, CSS, JS và dữ liệu từ bộ nhớ Cache Storage, mang lại trải nghiệm không gián đoạn khi offline' },
        { en: 'The browser displays a generic "No Internet" dinosaur screen', vi: 'Trình duyệt hiện màn hình khủng long mất mạng thông thường' },
        { en: 'The user\'s device restarts', vi: 'Thiết bị người dùng khởi động lại' },
        { en: 'The web app is deleted from the phone', vi: 'Ứng dụng bị xóa khỏi điện thoại' }
      ],
      ans: 0,
      expEn: 'Service Worker offline caching eliminates network dependency for mission-critical applications.',
      expVi: 'Lưu cache offline bằng Service Worker loại bỏ sự phụ thuộc vào đường truyền mạng cho các ứng dụng quan trọng.'
    },
    {
      id: 'html_q_20_15',
      type: 'single_choice',
      qEn: 'Which HTML5 semantic element is recommended as the overarching parent container for charts, diagrams, or canvas graphics alongside their caption description?',
      qVi: 'Phần tử ngữ nghĩa HTML5 nào được khuyến nghị làm khung chứa bao bọc cho biểu đồ, sơ đồ hoặc canvas kèm chú thích giải thích?',
      options: [
        { en: '<figure> containing the graphic and a <figcaption>', vi: '<figure> chứa đồ họa và thẻ <figcaption>' },
        { en: '<section> with <b>', vi: '<section> với thẻ <b>' },
        { en: '<div> with <span>', vi: '<div> với thẻ <span>' },
        { en: '<aside> with <i>', vi: '<aside> với thẻ <i>' }
      ],
      ans: 0,
      expEn: '<figure> and <figcaption> provide standard self-contained visual illustration semantics in HTML5.',
      expVi: '<figure> và <figcaption> cung cấp ngữ nghĩa chuẩn mực cho các hình minh họa và chú thích trong HTML5.'
    },
    {
      id: 'html_q_20_16',
      type: 'single_choice',
      qEn: 'What is the ultimate gold standard of modern production HTML5 engineering?',
      qVi: 'Tiêu chuẩn vàng tối thượng của kỹ thuật HTML5 chuẩn sản xuất hiện đại là gì?',
      options: [
        { en: 'Semantic document architecture, accessible by default (WCAG AA), responsive across all device viewports, fast sub-second performance, and resilient offline capabilities', vi: 'Kiến trúc tài liệu chuẩn ngữ nghĩa, đạt chuẩn trợ năng mặc định (WCAG AA), hiển thị đáp ứng mọi thiết bị, tốc độ tải dưới 1 giây và hoạt động bền bỉ khi mất mạng' },
        { en: 'Using as many <div> tags as possible with inline styles', vi: 'Dùng càng nhiều thẻ <div> càng tốt kèm inline style' },
        { en: 'Writing all code in a single 10,000-line file', vi: 'Viết toàn bộ mã trong một file duy nhất dài 10,000 dòng' },
        { en: 'Requiring 50 third-party JavaScript plugins to render simple text', vi: 'Bắt buộc dùng 50 plugin JavaScript ngoài để hiển thị chữ đơn giản' }
      ],
      ans: 0,
      expEn: 'Crafting clean, accessible, resilient, and performant HTML is the foundation of world-class web engineering.',
      expVi: 'Xây dựng HTML chuẩn ngữ nghĩa, trợ năng, tốc độ cao và bền bỉ là nền móng của kỹ thuật phần mềm web đẳng cấp.'
    }
  ]
};

console.log('Lesson 20 defined.');
