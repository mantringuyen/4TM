import { RawLessonSource } from './rawLessonType';

// LESSON 4: Media, Images, Picture & Figure
export const lesson4: RawLessonSource = {
  order: 4,
  id: 'html_lesson_4',
  moduleId: 'html_mod_1',
  levelId: 'basic',
  topicId: 'html_media_basic',
  titleEn: 'Visual Media: Images (<img>), Figures (<figure>), Captions & Responsive Formats',
  titleVi: 'Đa Phương Tiện Trực Quan: Thẻ Hình Ảnh (<img>), Khung Ảnh (<figure>), Chú Thích & Định Dạng Đáp Ứng',
  summaryEn: 'Master accessible web graphics with <img>, alt text strategies, loading="lazy" performance, intrinsic dimensions (width/height), <figure> & <figcaption> bundling, and <picture> art direction.',
  summaryVi: 'Làm chủ hình ảnh web chuẩn trợ năng với <img>, chiến lược văn bản alt, tối ưu hiệu năng loading="lazy", kích thước gốc (width/height), đóng gói <figure> & <figcaption> và kỹ thuật art direction với <picture>.',
  estimatedMinutes: 15,
  introEn: 'Visual assets elevate user engagement and communicate complex concepts instantly. Implementing images properly requires balancing visual quality, screen reader accessibility, and modern performance optimizations.',
  introVi: 'Hình ảnh trực quan nâng cao trải nghiệm người dùng và truyền tải thông điệp nhanh chóng. Triển khai hình ảnh chuẩn đòi hỏi cân bằng giữa chất lượng đồ họa, khả năng tiếp cận và tối ưu hiệu năng tải trang.',
  conceptEn: 'The <img> element is a self-closing void tag requiring src and alt attributes. The alt attribute is mandatory for accessibility: provide concise descriptions for informative images, or an empty alt="" for purely decorative graphics. Always declare width and height attributes (intrinsic aspect ratio) to eliminate Cumulative Layout Shift (CLS). Use loading="lazy" on below-the-fold images to defer network fetching. For semantic editorial images with captions, wrap them in <figure> with a child <figcaption>. Use <picture> with <source media/srcset> for art direction and next-gen formats (AVIF, WebP).',
  conceptVi: 'Thẻ <img> là thẻ rỗng tự đóng bắt buộc có thuộc tính src và alt. Thuộc tính alt là bắt buộc cho trợ năng: mô tả nội dung ảnh hoặc để rỗng alt="" nếu ảnh thuần trang trí. Luôn khai báo width và height để chống giật layout (CLS). Dùng loading="lazy" cho ảnh phía dưới trang để hoãn tải. Dùng <figure> và <figcaption> khi cần đóng gói hình ảnh kèm dòng chú thích ngữ nghĩa. Dùng <picture> cùng <source> để đổi ảnh theo kích thước màn hình hoặc phân phối định dạng AVIF/WebP.',
  syntax: '<figure>\n  <picture>\n    <source media="(min-width: 768px)" srcset="/img/hero-large.avif" type="image/avif">\n    <img src="/img/hero.jpg" alt="Team collaborating on software architecture" width="800" height="450" loading="lazy">\n  </picture>\n  <figcaption>Figure 1: Architectural brainstorming session at 4TM HQ.</figcaption>\n</figure>',
  ex1TitleEn: 'Accessible Image with Intrinsic Dimensions & Lazy Loading',
  ex1TitleVi: 'Hình Ảnh Chuẩn Trợ Năng Kèm Tối Ưu Tải Chậm',
  ex1Code: '<section>\n  <h2>Developer Workstation Setup</h2>\n  <figure>\n    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600" \n         alt="MacBook Pro displaying clean code editor on wooden desk" \n         width="600" height="400" \n         loading="lazy">\n    <figcaption>Modern workspace optimized for developer productivity.</figcaption>\n  </figure>\n</section>',
  ex1ExpEn: 'Features descriptive alt text, explicit width/height to prevent layout shifts, loading="lazy", and semantic <figure> container.',
  ex1ExpVi: 'Bao gồm mô tả alt rõ ràng, kích thước width/height chống vỡ layout, tải chậm lazy và thẻ figure ngữ nghĩa.',
  ex2TitleEn: 'Responsive Art Direction with Picture Tag',
  ex2TitleVi: 'Chuyển Đổi Ảnh Theo Màn Hình Với Thẻ Picture',
  ex2Code: '<picture>\n  <source media="(min-width: 1024px)" srcset="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200">\n  <source media="(min-width: 640px)" srcset="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800">\n  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400" alt="Software engineering squad planning sprint" width="1200" height="600">\n</picture>',
  ex2ExpEn: 'Delivers optimized resolutions tailored to desktop, tablet, and mobile displays automatically.',
  ex2ExpVi: 'Tự động phân phối độ phân giải tối ưu cho màn hình máy tính, máy tính bảng và điện thoại.',
  mistake1En: 'Leaving out the alt attribute or using redundant text like alt="image of a photo"',
  mistake1Vi: 'Bỏ sót thuộc tính alt hoặc viết văn bản thừa như alt="hình ảnh chụp một bức ảnh"',
  correction1En: 'Provide a functional description of the content without saying "image of", or use alt="" if purely decorative.',
  correction1Vi: 'Mô tả ngắn gọn nội dung thực tế của ảnh, không cần dùng từ "hình ảnh của", hoặc để alt="" nếu chỉ là hoa văn trang trí.',
  mistake2En: 'Omitting width and height on <img> elements',
  mistake2Vi: 'Không khai báo width và height trên thẻ <img>',
  correction2En: 'Always declare width and height attributes so the browser reserves layout space before download, preventing jarring CLS layout jumps.',
  correction2Vi: 'Luôn khai báo width và height để trình duyệt giữ sẵn khoảng trống trước khi tải ảnh, tránh lỗi giật màn hình CLS.',
  tipEn: 'Setting decoding="async" allows the browser to decode image raster data off the main thread, keeping scroll animations butter-smooth.',
  tipVi: 'Thuộc tính decoding="async" cho phép giải mã hình ảnh trên luồng riêng, giúp cuộn trang mượt mà không bị khựng.',
  practiceTaskEn: 'Embed an Accessible Semantic Figure',
  practiceTaskVi: 'Nhúng hình ảnh ngữ nghĩa chuẩn trợ năng',
  practiceInstEn: 'Create a <figure> containing an <img> with src="server.jpg", alt="Cloud server rack in datacenter", width="800", height="500", loading="lazy", and a <figcaption> "Figure 1: High-availability enterprise datacenter."',
  practiceInstVi: 'Tạo thẻ <figure> chứa <img> có src="server.jpg", alt="Cloud server rack in datacenter", width="800", height="500", loading="lazy" và <figcaption> "Figure 1: High-availability enterprise datacenter."',
  practiceStarter: '<!-- Build figure with img and figcaption -->\n',
  practiceSolution: '<figure>\n  <img src="server.jpg" alt="Cloud server rack in datacenter" width="800" height="500" loading="lazy">\n  <figcaption>Figure 1: High-availability enterprise datacenter.</figcaption>\n</figure>',
  practicePatterns: ['<figure>', '<img', 'src="server.jpg"', 'alt="Cloud server rack in datacenter"', 'width="800"', 'height="500"', 'loading="lazy"', '<figcaption>Figure 1: High-availability enterprise datacenter.</figcaption>', '</figure>'],
  practiceHintEn: 'Wrap <img> inside <figure> alongside <figcaption>.',
  practiceHintVi: 'Bọc <img> bên trong <figure> cùng với <figcaption>.',

  exercises: [
    {
      id: 'html_ex_4_1',
      type: 'complete_code',
      titleEn: 'Add Alt Text and Dimensions to Image',
      titleVi: 'Thêm Văn Bản Alt Và Kích Thước Cho Ảnh',
      instEn: 'Add alt="Modern laptop setup", width="600", and height="400" to the <img> element.',
      instVi: 'Thêm alt="Modern laptop setup", width="600" và height="400" vào thẻ <img>.',
      starter: '<img src="/images/setup.jpg">',
      solution: '<img src="/images/setup.jpg" alt="Modern laptop setup" width="600" height="400">',
      hintEn: 'Add alt="Modern laptop setup" width="600" height="400".',
      hintVi: 'Thêm alt="Modern laptop setup" width="600" height="400".',
      expEn: 'Alt text satisfies accessibility requirements while dimensions prevent layout shifts.',
      expVi: 'Văn bản alt đáp ứng chuẩn trợ năng và kích thước ngăn ngừa vỡ bố cục khi tải.'
    },
    {
      id: 'html_ex_4_2',
      type: 'fix_code',
      titleEn: 'Fix Non-Semantic Div Image Captioning',
      titleVi: 'Sửa Lỗi Chú Thích Ảnh Không Chuẩn Ngữ Nghĩa',
      instEn: 'Refactor the generic <div> wrappers into semantic <figure> and <figcaption> elements.',
      instVi: 'Chuyển đổi thẻ <div> bao bọc thành thẻ ngữ nghĩa <figure> và <figcaption>.',
      starter: '<div class="image-box">\n  <img src="chart.png" alt="Revenue growth chart">\n  <div class="caption">Q4 2026 Financial Results</div>\n</div>',
      solution: '<figure class="image-box">\n  <img src="chart.png" alt="Revenue growth chart">\n  <figcaption class="caption">Q4 2026 Financial Results</figcaption>\n</figure>',
      hintEn: 'Replace outer <div> with <figure> and caption <div> with <figcaption>.',
      hintVi: 'Thay <div> ngoài bằng <figure> và <div> chú thích bằng <figcaption>.',
      expEn: '<figure> and <figcaption> provide programmatic linkage between media and description.',
      expVi: '<figure> và <figcaption> liên kết ngữ nghĩa trực tiếp giữa hình ảnh và phần chú thích.'
    },
    {
      id: 'html_ex_4_3',
      type: 'write_code',
      titleEn: 'Implement Lazy Loaded Product Gallery Image',
      titleVi: 'Tạo Ảnh Thư Viện Sản Phẩm Tải Chậm',
      instEn: 'Write an <img> tag with src="keyboard.jpg", alt="Wireless mechanical keyboard with RGB backlighting", width="500", height="350", and loading="lazy".',
      instVi: 'Viết thẻ <img> có src="keyboard.jpg", alt="Wireless mechanical keyboard with RGB backlighting", width="500", height="350" và loading="lazy".',
      starter: '<!-- Add product image here -->\n',
      solution: '<img src="keyboard.jpg" alt="Wireless mechanical keyboard with RGB backlighting" width="500" height="350" loading="lazy">',
      hintEn: 'Include src, alt, width, height, and loading="lazy".',
      hintVi: 'Khai báo đầy đủ src, alt, width, height và loading="lazy".',
      expEn: 'loading="lazy" defers image downloading until user scrolls near the viewport.',
      expVi: 'loading="lazy" hoãn tải ảnh cho đến khi người dùng cuộn đến gần màn hình.'
    },
    {
      id: 'html_ex_4_4',
      type: 'modify_example',
      titleEn: 'Build Responsive Picture with Breakpoints',
      titleVi: 'Xây Dựng Thẻ Picture Đáp Ứng Theo Breakpoint',
      instEn: 'Add a <source> inside <picture> with media="(min-width: 768px)" and srcset="desktop.jpg".',
      instVi: 'Thêm thẻ <source> trong <picture> có media="(min-width: 768px)" và srcset="desktop.jpg".',
      starter: '<picture>\n  <!-- Add source element here -->\n  <img src="mobile.jpg" alt="Scenic mountain valley" width="800" height="400">\n</picture>',
      solution: '<picture>\n  <source media="(min-width: 768px)" srcset="desktop.jpg">\n  <img src="mobile.jpg" alt="Scenic mountain valley" width="800" height="400">\n</picture>',
      hintEn: '<source media="(min-width: 768px)" srcset="desktop.jpg">',
      hintVi: '<source media="(min-width: 768px)" srcset="desktop.jpg">',
      expEn: '<picture> conditionally switches image sources based on CSS media queries.',
      expVi: '<picture> tự động đổi ảnh tùy theo điều kiện kích thước màn hình media query.'
    },
    {
      id: 'html_ex_4_5',
      type: 'predict_output',
      titleEn: 'Mark Decorative Image for Screen Readers',
      titleVi: 'Đánh Dấu Ảnh Trang Trí Cho Trình Đọc Màn Hình',
      instEn: 'Configure the decorative background divider image with an empty alt="" and aria-hidden="true" so assistive tech skips it.',
      instVi: 'Cấu hình ảnh hoa văn trang trí với alt="" và aria-hidden="true" để trình đọc màn hình bỏ qua.',
      starter: '<img src="/assets/decorative-wave.svg" width="1200" height="40">',
      solution: '<img src="/assets/decorative-wave.svg" alt="" aria-hidden="true" width="1200" height="40">',
      hintEn: 'Add alt="" and aria-hidden="true".',
      hintVi: 'Thêm alt="" và aria-hidden="true".',
      expEn: 'An empty alt="" explicitly flags decorative artwork to be ignored by screen readers.',
      expVi: 'Thuộc tính alt="" báo hiệu ảnh chỉ mang tính trang trí giúp người dùng khiếm thị không bị phân tâm.'
    }
  ],

  challenge: {
    id: 'html_ch_4',
    titleEn: 'Accessible Multimedia Exhibition Showcase',
    titleVi: 'Khung Trưng Bày Đa Phương Tiện Chuẩn Trợ Năng',
    descEn: 'Construct a rich exhibition section containing an <h1>, an introductory paragraph, and two semantic <figure> components: one with a responsive <picture> element (serving mobile/desktop sources) and <figcaption>, and another with a high-performance lazy loaded image with complete dimensions and descriptive alt text.',
    descVi: 'Xây dựng phần trưng bày đa phương tiện gồm <h1>, đoạn văn giới thiệu và 2 thành phần <figure> ngữ nghĩa: một hình ảnh dùng <picture> đáp ứng (đổi ảnh theo màn hình) kèm <figcaption>, và một hình ảnh hiệu năng cao tải chậm lazy với đầy đủ kích thước và alt chi tiết.',
    requirements: [
      { en: '<section> container with <h1> and descriptive <p>', vi: 'Khối <section> có <h1> và đoạn văn <p>' },
      { en: 'First <figure> containing <picture> with <source media="..."> and fallback <img>', vi: '<figure> thứ nhất chứa <picture> có <source media="..."> và <img> dự phòng' },
      { en: '<figcaption> inside first figure detailing the artwork', vi: '<figcaption> trong figure thứ nhất mô tả tác phẩm' },
      { en: 'Second <figure> with <img> having width, height, loading="lazy", and descriptive alt', vi: '<figure> thứ hai có <img> đầy đủ width, height, loading="lazy" và alt' }
    ],
    starter: '<!-- Build exhibition showcase below -->\n',
    solution: '<section>\n  <h1>Digital Art Exhibition 2026</h1>\n  <p>Exploring the intersection of generative geometry and interactive code.</p>\n  \n  <figure>\n    <picture>\n      <source media="(min-width: 1024px)" srcset="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200">\n      <source media="(min-width: 600px)" srcset="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800">\n      <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400" alt="Vibrant generative colorful art piece" width="1200" height="800">\n    </picture>\n    <figcaption>Figure 1: Neural Algorithmic Composition #42 in 8K resolution.</figcaption>\n  </figure>\n\n  <figure>\n    <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600" alt="Modern art gallery visitor observing digital display" width="600" height="400" loading="lazy">\n    <figcaption>Figure 2: Gallery visitor interacting with live real-time canvas installation.</figcaption>\n  </figure>\n</section>',
    hints: [
      { en: 'Use <figure>, <picture>, <source>, <img>, and <figcaption> with proper nesting.', vi: 'Sử dụng <figure>, <picture>, <source>, <img> và <figcaption> lồng nhau đúng quy chuẩn.' }
    ],
    expEn: 'Combines modern responsive image art direction, performance loading attributes, and accessible semantic figure markup.',
    expVi: 'Kết hợp kỹ thuật art direction hình ảnh đáp ứng, tối ưu hiệu năng tải chậm và cấu trúc thẻ figure trợ năng.'
  },

  challengeVariants: [
    {
      id: 'html_ch_4_v1',
      titleEn: 'Variant 1: E-Commerce Product Spotlight Gallery',
      titleVi: 'Biến Thể 1: Bộ Sưu Tập Giới Thiệu Sản Phẩm Bán Lẻ',
      descEn: 'Build product gallery with <h1>Pro Hardware</h1>, a <figure> wrapping <picture> with AVIF source and fallback JPG, and <figcaption> with price $299.',
      descVi: 'Tạo thư viện sản phẩm với <h1>Pro Hardware</h1>, thẻ <figure> bao bọc <picture> có nguồn ảnh AVIF và JPG dự phòng, cùng <figcaption> ghi giá $299.',
      requirements: [
        { en: '<h1>Pro Hardware</h1>', vi: '<h1>Pro Hardware</h1>' },
        { en: '<figure> with <picture> element', vi: '<figure> với thẻ <picture>' },
        { en: '<source srcset="prod.avif" type="image/avif">', vi: '<source srcset="prod.avif" type="image/avif">' },
        { en: '<img> with alt, width, height', vi: '<img> có alt, width, height' },
        { en: '<figcaption> containing price details', vi: '<figcaption> chứa thông tin giá bán' }
      ],
      starter: '<!-- Build product spotlight -->\n',
      solution: '<section>\n  <h1>Pro Hardware</h1>\n  <figure>\n    <picture>\n      <source srcset="prod.avif" type="image/avif">\n      <img src="prod.jpg" alt="Pro developer mechanical keyboard anodized aluminum" width="800" height="500" loading="lazy">\n    </picture>\n    <figcaption>4TM Pro Edition Keyboard &mdash; $299 with custom hot-swap switches.</figcaption>\n  </figure>\n</section>',
      expEn: 'Modern e-commerce product presentation with next-gen image format delivery.',
      expVi: 'Trình bày sản phẩm hiện đại với định dạng ảnh thế hệ mới AVIF.'
    },
    {
      id: 'html_ch_4_v2',
      titleEn: 'Variant 2: Scientific Microscopic Photography Journal',
      titleVi: 'Biến Thể 2: Tạp Chí Nhiếp Ảnh Kính Hiển Vi Khoa Học',
      descEn: 'Create scientific journal layout with <h1>Cellular Biology</h1>, 2 <figure> elements for Plant Cell and Animal Cell with <figcaption> magnification 10,000x.',
      descVi: 'Tạo bố cục tạp chí khoa học với <h1>Cellular Biology</h1>, 2 thẻ <figure> cho Tế bào thực vật và Tế bào động vật kèm <figcaption> độ phóng đại 10,000x.',
      requirements: [
        { en: '<h1>Cellular Biology</h1>', vi: '<h1>Cellular Biology</h1>' },
        { en: 'Two <figure> elements with descriptive <img> tags', vi: 'Hai thẻ <figure> có <img> mô tả chi tiết' },
        { en: 'Explicit width and height on both images', vi: 'Khai báo rõ width và height cho cả 2 ảnh' },
        { en: '<figcaption> in both figures specifying magnification', vi: '<figcaption> ở cả 2 figure ghi rõ độ phóng đại' }
      ],
      starter: '<!-- Build scientific journal layout -->\n',
      solution: '<article>\n  <h1>Cellular Biology</h1>\n  <figure>\n    <img src="plant_cell.jpg" alt="High magnification electron micrograph of chloroplast structures" width="600" height="400" loading="lazy">\n    <figcaption>Figure 1: Chloroplast membrane under 10,000x electron microscopy.</figcaption>\n  </figure>\n  <figure>\n    <img src="animal_cell.jpg" alt="Mitochondria cristae observed in mammalian tissue" width="600" height="400" loading="lazy">\n    <figcaption>Figure 2: Mitochondria cristae detail at 15,000x magnification.</figcaption>\n  </figure>\n</article>',
      expEn: 'Academic scientific layout featuring detailed figures and microscope captions.',
      expVi: 'Bố cục bài báo khoa học chuẩn xác với hình ảnh kính hiển vi và chú thích chi tiết.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_4_1',
      type: 'single_choice',
      qEn: 'Why is the alt attribute required on every <img> element according to W3C standards?',
      qVi: 'Tại sao thuộc tính alt là bắt buộc trên mọi thẻ <img> theo tiêu chuẩn W3C?',
      options: [
        { en: 'Provides essential textual description for screen readers and displays when the image fails to load', vi: 'Cung cấp văn bản mô tả cho trình đọc màn hình và hiển thị thay thế khi ảnh bị lỗi tải' },
        { en: 'Sets the font family of the caption text', vi: 'Đặt kiểu font chữ cho dòng chú thích' },
        { en: 'Increases the resolution of the raster file', vi: 'Tăng độ phân giải cho tệp ảnh' },
        { en: 'Prevents users from saving the image locally', vi: 'Ngăn không cho người dùng tải ảnh về máy' }
      ],
      ans: 0,
      expEn: 'alt text is the primary bridge allowing visually impaired users to perceive graphical content.',
      expVi: 'alt text là cầu nối quan trọng giúp người dùng khiếm thị tiếp nhận được thông tin từ hình ảnh.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_4_2',
      type: 'single_choice',
      qEn: 'How should you treat purely decorative images that convey no informational value (e.g. background swirl)?',
      qVi: 'Bạn nên xử lý thế nào đối với các hình ảnh thuần trang trí không mang thông điệp (như hoa văn nền)?',
      options: [
        { en: 'Provide an empty alt="" attribute so assistive tech intentionally skips it', vi: 'Khai báo thuộc tính rỗng alt="" để công nghệ trợ năng tự động bỏ qua' },
        { en: 'Delete the <img> tag and only use Canvas', vi: 'Xóa thẻ <img> và chỉ dùng Canvas' },
        { en: 'Write alt="decorative image do not read"', vi: 'Viết alt="decorative image do not read"' },
        { en: 'Omit the alt attribute entirely', vi: 'Bỏ hoàn toàn thuộc tính alt' }
      ],
      ans: 0,
      expEn: 'alt="" marks the graphic as decorative, preventing screen readers from reading out file names.',
      expVi: 'alt="" đánh dấu ảnh mang tính trang trí, ngăn trình đọc màn hình đọc to tên tệp vô nghĩa.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_4_3',
      type: 'single_choice',
      qEn: 'What is the performance advantage of explicitly providing width and height attributes on <img> tags?',
      qVi: 'Lợi ích về hiệu năng của việc khai báo rõ thuộc tính width và height trên thẻ <img> là gì?',
      options: [
        { en: 'Allows the browser to calculate intrinsic aspect ratio and allocate layout space immediately, preventing Cumulative Layout Shift (CLS)', vi: 'Giúp trình duyệt tính tỷ lệ khung hình và giữ sẵn không gian hiển thị, chống giật layout (CLS)' },
        { en: 'Compresses image byte size on the CDN server', vi: 'Nén giảm dung lượng ảnh trên máy chủ CDN' },
        { en: 'Converts JPG images to SVG vector format in memory', vi: 'Chuyển ảnh JPG sang vector SVG trong bộ nhớ' },
        { en: 'Increases download speed over HTTP/2', vi: 'Tăng tốc độ tải qua giao thức HTTP/2' }
      ],
      ans: 0,
      expEn: 'Explicit dimensions prevent layout reflows and shifts when images finish loading asynchronously.',
      expVi: 'Kích thước rõ ràng giúp trình duyệt không phải tính toán lại bố cục khi ảnh tải xong.',
      difficulty: 'easy'
    },
    {
      id: 'html_q_4_4',
      type: 'single_choice',
      qEn: 'What does loading="lazy" do on an <img> or <iframe> element?',
      qVi: 'Thuộc tính loading="lazy" có tác dụng gì trên thẻ <img> hoặc <iframe>?',
      options: [
        { en: 'Defers resource loading until the element is near the user visible viewport, saving initial page bandwidth', vi: 'Hoãn tải tài nguyên cho đến khi phần tử đến gần màn hình người dùng, tiết kiệm băng thông ban đầu' },
        { en: 'Renders the image in black and white first', vi: 'Hiển thị ảnh đen trắng trước' },
        { en: 'Loads the image with lower quality permanently', vi: 'Luôn tải ảnh ở chất lượng thấp vĩnh viễn' },
        { en: 'Forces image caching in IndexedDB database', vi: 'Bắt buộc lưu cache ảnh vào cơ sở dữ liệu IndexedDB' }
      ],
      ans: 0,
      expEn: 'Native lazy loading defers offscreen asset requests to improve Core Web Vitals LCP and FCP metrics.',
      expVi: 'Tải chậm gốc giúp hoãn tải ảnh ngoài màn hình để cải thiện chỉ số tốc độ tải trang.'
    },
    {
      id: 'html_q_4_5',
      type: 'single_choice',
      qEn: 'Which semantic elements pair together to bundle an illustration or diagram with its explanatory caption?',
      qVi: 'Cặp thẻ ngữ nghĩa nào kết hợp với nhau để đóng gói hình ảnh minh họa cùng dòng chú thích giải thích?',
      options: [
        { en: '<figure> and <figcaption>', vi: '<figure> và <figcaption>' },
        { en: '<image> and <caption>', vi: '<image> và <caption>' },
        { en: '<media> and <desc>', vi: '<media> và <desc>' },
        { en: '<picture> and <legend>', vi: '<picture> và <legend>' }
      ],
      ans: 0,
      expEn: '<figure> semantically groups self-contained content with its optional <figcaption>.',
      expVi: '<figure> gom nhóm nội dung đa phương tiện độc lập cùng thẻ chú thích <figcaption>.'
    },
    {
      id: 'html_q_4_6',
      type: 'single_choice',
      qEn: 'Where can <figcaption> be placed inside a <figure> container?',
      qVi: 'Thẻ <figcaption> có thể được đặt ở vị trí nào bên trong khối <figure>?',
      options: [
        { en: 'As the very first child OR the very last child of the <figure>', vi: 'Là phần tử con đầu tiên HOẶC con cuối cùng của thẻ <figure>' },
        { en: 'Anywhere outside the <figure>', vi: 'Bất cứ vị trí nào bên ngoài <figure>' },
        { en: 'Only directly inside the <img> element', vi: 'Chỉ được nằm bên trong thẻ <img>' },
        { en: 'Only inside the <head> element', vi: 'Chỉ được nằm trong thẻ <head>' }
      ],
      ans: 0,
      expEn: 'W3C specification allows <figcaption> as either the first or last child of <figure>.',
      expVi: 'Quy chuẩn W3C cho phép đặt <figcaption> ở đầu hoặc ở cuối khối <figure>.'
    },
    {
      id: 'html_q_4_7',
      type: 'single_choice',
      qEn: 'What is the primary role of the <picture> element in HTML5?',
      qVi: 'Vai trò chính của thẻ <picture> trong HTML5 là gì?',
      options: [
        { en: 'Enables art direction and next-gen format negotiation (AVIF/WebP) across different device viewports', vi: 'Cho phép kỹ thuật art direction và tự động phân phối định dạng ảnh mới (AVIF/WebP) theo kích thước thiết bị' },
        { en: 'Applies CSS filters like blur and grayscale natively', vi: 'Tự động áp dụng bộ lọc CSS làm mờ và đen trắng' },
        { en: 'Replaces JavaScript video playback libraries', vi: 'Thay thế các thư viện video của JavaScript' },
        { en: 'Generates animated GIF images in real time', vi: 'Tự động tạo ảnh động GIF theo thời gian thực' }
      ],
      ans: 0,
      expEn: '<picture> wraps <source> tags allowing browsers to pick optimal images by media query or format support.',
      expVi: '<picture> chứa các thẻ <source> giúp trình duyệt chọn ảnh tối ưu nhất theo màn hình và định dạng.'
    },
    {
      id: 'html_q_4_8',
      type: 'single_choice',
      qEn: 'Why must an <img> tag always be included inside a <picture> element?',
      qVi: 'Tại sao luôn phải có một thẻ <img> nằm bên trong phần tử <picture>?',
      options: [
        { en: 'The <img> element provides the actual DOM rendering box and fallback for older browsers', vi: 'Thẻ <img> tạo khung hiển thị thực tế trong DOM và làm ảnh dự phòng cho trình duyệt cũ' },
        { en: 'Without <img>, the CSS engine will throw an exception', vi: 'Nếu không có <img>, bộ máy CSS sẽ báo lỗi' },
        { en: 'The <img> tag downloads the audio soundtrack', vi: 'Thẻ <img> tải âm thanh kèm theo' },
        { en: 'It is required to trigger WebAssembly scripts', vi: 'Bắt buộc để kích hoạt mã WebAssembly' }
      ],
      ans: 0,
      expEn: '<picture> is a wrapper; the inner <img> is what actually gets rendered to the screen.',
      expVi: '<picture> chỉ là vỏ bọc; thẻ <img> bên trong mới là phần tử thực sự hiển thị trên màn hình.'
    },
    {
      id: 'html_q_4_9',
      type: 'single_choice',
      qEn: 'What attribute on <source> defines which screen sizes the image candidate applies to?',
      qVi: 'Thuộc tính nào trên thẻ <source> xác định khoảng kích thước màn hình mà ảnh đó áp dụng?',
      options: [
        { en: 'media="(min-width: 768px)"', vi: 'media="(min-width: 768px)"' },
        { en: 'screen="768px"', vi: 'screen="768px"' },
        { en: 'query="desktop"', vi: 'query="desktop"' },
        { en: 'viewport="768"', vi: 'viewport="768"' }
      ],
      ans: 0,
      expEn: 'The media attribute accepts standard CSS media queries like (min-width: 768px).',
      expVi: 'Thuộc tính media nhận các biểu thức CSS media query như (min-width: 768px).'
    },
    {
      id: 'html_q_4_10',
      type: 'single_choice',
      qEn: 'Which modern image format delivers the highest compression efficiency and quality for photographic web assets?',
      qVi: 'Định dạng hình ảnh hiện đại nào mang lại hiệu quả nén cao nhất và chất lượng tốt nhất cho web?',
      options: [
        { en: 'AVIF (AV1 Image File Format)', vi: 'AVIF (AV1 Image File Format)' },
        { en: 'BMP (Bitmap)', vi: 'BMP (Bitmap)' },
        { en: 'GIF (Graphics Interchange Format)', vi: 'GIF (Graphics Interchange Format)' },
        { en: 'TIFF', vi: 'TIFF' }
      ],
      ans: 0,
      expEn: 'AVIF provides up to 50% smaller file sizes compared to standard JPEG with superior visual fidelity.',
      expVi: 'AVIF giảm tới 50% dung lượng tệp so với JPEG chuẩn mà vẫn giữ được độ sắc nét vượt trội.'
    },
    {
      id: 'html_q_4_11',
      type: 'single_choice',
      qEn: 'What does decoding="async" accomplish on an image?',
      qVi: 'Thuộc tính decoding="async" mang lại tác dụng gì cho hình ảnh?',
      options: [
        { en: 'Decodes the image asynchronously off the main execution thread, reducing UI frame drops', vi: 'Giải mã hình ảnh bất đồng bộ trên luồng riêng, chống khựng khung hình giao diện' },
        { en: 'Encrypts the image pixels with AES-256', vi: 'Mã hóa điểm ảnh bằng thuật toán AES-256' },
        { en: 'Converts color space to Adobe RGB', vi: 'Chuyển không gian màu sang Adobe RGB' },
        { en: 'Downloads the image over WebSockets', vi: 'Tải ảnh qua giao thức WebSocket' }
      ],
      ans: 0,
      expEn: 'decoding="async" allows other page content to render without waiting for image decompression.',
      expVi: 'decoding="async" cho phép nội dung trang hiển thị mà không bị gián đoạn do giải nén ảnh.'
    },
    {
      id: 'html_q_4_12',
      type: 'single_choice',
      qEn: 'What does the srcset attribute on an <img> element allow developers to do?',
      qVi: 'Thuộc tính srcset trên thẻ <img> cho phép lập trình viên làm điều gì?',
      options: [
        { en: 'Supply multiple image URLs along with pixel density descriptors (1x, 2x) or width descriptors (400w, 800w)', vi: 'Cung cấp nhiều nguồn ảnh kèm theo mật độ điểm ảnh (1x, 2x) hoặc độ rộng màn hình (400w, 800w)' },
        { en: 'Import a JavaScript image slider plugin', vi: 'Tải plugin trình chiếu ảnh JavaScript' },
        { en: 'Define CSS animations for image fading', vi: 'Định nghĩa hiệu ứng mờ dần trong CSS' },
        { en: 'Set image transparency opacity values', vi: 'Thiết lập độ trong suốt cho hình ảnh' }
      ],
      ans: 0,
      expEn: 'srcset enables responsive images where browsers choose the best asset based on screen DPI and viewport width.',
      expVi: 'srcset giúp trình duyệt tự chọn ảnh phù hợp nhất dựa trên mật độ điểm ảnh DPI và kích thước màn hình.'
    },
    {
      id: 'html_q_4_13',
      type: 'single_choice',
      qEn: 'When should loading="eager" be used on an image?',
      qVi: 'Khi nào nên sử dụng thuộc tính loading="eager" cho một hình ảnh?',
      options: [
        { en: 'For above-the-fold hero images that represent the Largest Contentful Paint (LCP) priority', vi: 'Cho các hình ảnh biểu ngữ chính trên đầu trang (hero banner) đại diện cho chỉ số LCP' },
        { en: 'For footer icons at the very bottom of the page', vi: 'Cho các biểu tượng ở tận chân trang' },
        { en: 'Only for transparent SVG vector logos', vi: 'Chỉ dùng cho logo vector SVG' },
        { en: 'Never, lazy loading is mandatory everywhere', vi: 'Không bao giờ, tải chậm là bắt buộc ở mọi nơi' }
      ],
      ans: 0,
      expEn: 'The primary hero image should load immediately without lazy delay to optimize LCP speed.',
      expVi: 'Ảnh biểu ngữ chính trên đầu trang cần tải ngay lập tức không hoãn để tối ưu tốc độ LCP.'
    },
    {
      id: 'html_q_4_14',
      type: 'single_choice',
      qEn: 'Which format is best for logos, geometric icons, and crisp vector illustrations at any zoom level?',
      qVi: 'Định dạng nào là tốt nhất cho logo, biểu tượng hình học và đồ họa vector sắc nét ở mọi mức thu phóng?',
      options: [
        { en: 'SVG (Scalable Vector Graphics)', vi: 'SVG (Scalable Vector Graphics)' },
        { en: 'PNG-8', vi: 'PNG-8' },
        { en: 'JPEG', vi: 'JPEG' },
        { en: 'BMP', vi: 'BMP' }
      ],
      ans: 0,
      expEn: 'SVG uses XML mathematical vectors, ensuring infinitely crisp rendering at microscopic file sizes.',
      expVi: 'SVG dùng các phương trình vector toán học, hiển thị sắc nét vô tận với dung lượng siêu nhẹ.'
    },
    {
      id: 'html_q_4_15',
      type: 'single_choice',
      qEn: 'What happens if an <img> has a broken src URL and no alt attribute?',
      qVi: 'Điều gì xảy ra nếu thẻ <img> bị lỗi đường dẫn src và không có thuộc tính alt?',
      options: [
        { en: 'The browser shows an empty broken-icon box and screen readers announce the raw file path, creating a poor user experience', vi: 'Trình duyệt hiện biểu tượng ảnh vỡ trống và trình đọc màn hình đọc to đường dẫn tệp gây khó chịu' },
        { en: 'The browser crashes immediately', vi: 'Trình duyệt bị treo lập tức' },
        { en: 'A fallback image from Google is automatically downloaded', vi: 'Tự động tải ảnh dự phòng từ Google' },
        { en: 'The entire page background turns red', vi: 'Toàn bộ trang web biến thành màu đỏ' }
      ],
      ans: 0,
      expEn: 'Without alt text, broken images leave unsightly gaps and assistive technologies resort to reading raw filenames.',
      expVi: 'Nếu thiếu alt, ảnh lỗi sẽ để lại khoảng trống khó coi và công nghệ trợ thính sẽ đọc cả chuỗi đường dẫn tệp.'
    },
    {
      id: 'html_q_4_16',
      type: 'single_choice',
      qEn: 'Can a <figure> contain elements other than images (such as code blocks, poems, or audio clips)?',
      qVi: 'Thẻ <figure> có thể chứa các phần tử khác ngoài hình ảnh (như khối code, đoạn thơ, âm thanh) không?',
      options: [
        { en: 'Yes, <figure> is a generic container for any self-contained reference material with a caption', vi: 'Có, <figure> là thẻ chứa tổng quát cho bất kỳ tài liệu tham khảo độc lập nào có kèm chú thích' },
        { en: 'No, <figure> is strictly prohibited from holding anything except <img>', vi: 'Không, <figure> tuyệt đối chỉ được chứa thẻ <img>' },
        { en: 'Only if wrapped in a <table> element', vi: 'Chỉ khi nằm bên trong thẻ <table>' },
        { en: 'Only in XML XHTML documents', vi: 'Chỉ trong tài liệu XML XHTML' }
      ],
      ans: 0,
      expEn: '<figure> can encapsulate code listings, diagrams, quotes, charts, and media players.',
      expVi: '<figure> có thể đóng gói đoạn mã nguồn, sơ đồ, trích dẫn, biểu đồ và trình phát media.'
    }
  ]
};
