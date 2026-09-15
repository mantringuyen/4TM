import { RawLessonSource } from './rawLessonType';

export const lesson13: RawLessonSource = {
  order: 13,
  id: 'html_lesson_13',
  moduleId: 'html_mod_4',
  levelId: 'intermediate',
  topicId: 'html_responsive_images',
  titleEn: 'Responsive Images: <picture>, srcset, sizes & Modern WebP/AVIF Formats',
  titleVi: 'Hình Ảnh Đáp Ứng: <picture>, srcset, sizes & Định Dạng WebP/AVIF Hiện Đại',
  summaryEn: 'Master modern responsive image delivery: resolution switching with srcset & sizes, art direction and format negotiation using <picture> and <source type/media>, loading="lazy", decoding="async", and Cumulative Layout Shift prevention.',
  summaryVi: 'Làm chủ phân phối hình ảnh đáp ứng hiện đại: chuyển đổi độ phân giải với srcset & sizes, điều hướng nghệ thuật và chuyển đổi định dạng bằng <picture> và <source type/media>, loading="lazy", decoding="async" và chống vỡ giao diện (CLS).',
  estimatedMinutes: 15,
  introEn: 'High-resolution smartphone displays, laptops, and ultra-wide monitors require intelligent image delivery so mobile users don\'t waste bandwidth downloading bloated 4K images.',
  introVi: 'Sự đa dạng của màn hình điện thoại thông minh, laptop và màn hình siêu rộng đòi hỏi cơ chế phân phối ảnh thông minh để người dùng di động không bị lãng phí băng thông tải ảnh 4K quá nặng.',
  conceptEn: 'There are two responsive image strategies: (1) Resolution Switching: Use <img srcset="photo-400.jpg 400w, photo-800.jpg 800w" sizes="(max-width: 600px) 100vw, 50vw" alt="..."> to let the browser download the exact optimal image for the screen DPI and viewport width. (2) Art Direction / Format Negotiation: Use <picture> with <source type="image/avif"> and <source media="(min-width: 768px)"> to serve next-gen formats (AVIF/WebP) with fallback JPEG/PNG and different crop ratios for mobile vs desktop.',
  conceptVi: 'Có hai chiến lược hình ảnh đáp ứng: (1) Chuyển đổi độ phân giải: Dùng <img srcset="photo-400.jpg 400w, photo-800.jpg 800w" sizes="(max-width: 600px) 100vw, 50vw" alt="..."> để trình duyệt tự tải kích thước tối ưu theo DPI và bề rộng màn hình. (2) Điều hướng nghệ thuật & Định dạng: Dùng <picture> với <source type="image/avif"> và <source media="(min-width: 768px)"> để phục vụ định dạng nén thế hệ mới (AVIF/WebP) kèm dự phòng JPEG/PNG và ảnh cắt theo tỉ lệ riêng cho di động/máy tính.',
  syntax: '<picture>\n  <source type="image/avif" srcset="/img/hero-large.avif 1200w, /img/hero-small.avif 600w" sizes="(max-width: 768px) 100vw, 1200px">\n  <source type="image/webp" srcset="/img/hero-large.webp 1200w, /img/hero-small.webp 600w" sizes="(max-width: 768px) 100vw, 1200px">\n  <img src="/img/hero-fallback.jpg" width="1200" height="675" alt="Modern Architecture Office Building" loading="lazy" decoding="async">\n</picture>',
  ex1TitleEn: 'Next-Gen Format Negotiation with AVIF, WebP and Fallback JPEG',
  ex1TitleVi: 'Chuyển Đổi Định Dạng Ảnh Thế Hệ Mới AVIF, WebP Kèm JPEG Dự Phòng',
  ex1Code: '<picture>\n  <source type="image/avif" srcset="/assets/product-hero.avif">\n  <source type="image/webp" srcset="/assets/product-hero.webp">\n  <img\n    src="/assets/product-hero.jpg"\n    alt="Ergonomic Wireless Mechanical Keyboard with RGB Lighting"\n    width="800"\n    height="500"\n    loading="lazy"\n    decoding="async"\n    style="width:100%; height:auto; border-radius:8px;">\n</picture>',
  ex1ExpEn: 'Serves AVIF to modern browsers, WebP to intermediate browsers, and standard JPEG as a universal fallback.',
  ex1ExpVi: 'Phục vụ định dạng AVIF cho trình duyệt đời mới, WebP cho trình duyệt trung gian và JPEG làm dự phòng phổ quát.',
  ex2TitleEn: 'Art Direction Switching Between Mobile Square Crop and Desktop Banner',
  ex2TitleVi: 'Điều Hướng Nghệ Thuật Đổi Ảnh Vuông Trên Di Động Và Banner Trên Máy Tính',
  ex2Code: '<picture>\n  <!-- Desktop landscape crop -->\n  <source media="(min-width: 768px)" srcset="/img/banner-landscape.webp">\n  <!-- Mobile square focus crop -->\n  <source media="(max-width: 767px)" srcset="/img/banner-square.webp">\n  <img\n    src="/img/banner-fallback.jpg"\n    alt="Annual Developer Summit 2026 Keynote Stage"\n    width="1200"\n    height="400"\n    loading="lazy"\n    decoding="async"\n    style="width:100%; height:auto; object-fit:cover;">\n</picture>',
  ex2ExpEn: 'Uses media queries inside <source> to present completely different photographic compositions across screen sizes.',
  ex2ExpVi: 'Dùng media query trong <source> để hiển thị bố cục ảnh khác nhau hoàn toàn tùy theo kích thước màn hình.',
  mistake1En: 'Omitting the <img> tag inside a <picture> element',
  mistake1Vi: 'Quên đặt thẻ <img> bên trong phần tử <picture>',
  correction1En: '<picture> is purely a wrapper; without an internal <img> tag, nothing will ever be rendered on screen.',
  correction1Vi: '<picture> chỉ là vỏ bọc logic; nếu thiếu thẻ <img> bên trong thì trình duyệt sẽ không hiển thị gì ra màn hình.',
  mistake2En: 'Using loading="lazy" on the above-the-fold Largest Contentful Paint (LCP) hero image',
  mistake2Vi: 'Dùng loading="lazy" cho ảnh Hero đầu trang (LCP) nằm ngay trong màn hình đầu tiên',
  correction2En: 'Lazy loading the primary hero image delays LCP by waiting for layout calculation before triggering the image network request. Hero images should be loaded eagerly (fetchpriority="high").',
  correction2Vi: 'Lazy load ảnh Hero đầu trang sẽ làm chậm chỉ số LCP do phải đợi tính layout xong mới gửi request tải ảnh. Ảnh Hero nên tải ngay lập tức (fetchpriority="high").',
  tipEn: 'Always specify explicit width and height attributes (or CSS aspect-ratio) on <img> tags to reserve aspect-ratio layout space and achieve a perfect 0 Cumulative Layout Shift (CLS) score.',
  tipVi: 'Luôn khai báo rõ thuộc tính width và height (hoặc CSS aspect-ratio) trên thẻ <img> để giữ sẵn không gian hiển thị, giúp đạt điểm tuyệt đối 0 cho chỉ số CLS.',
  practiceTaskEn: 'Build a Responsive Product Picture Element',
  practiceTaskVi: 'Xây dựng phần tử picture ảnh sản phẩm đáp ứng',
  practiceInstEn: 'Create a <picture> containing an AVIF source (<source type="image/avif" srcset="/prod.avif">), a WebP source (<source type="image/webp" srcset="/prod.webp">), and a fallback <img> (<img src="/prod.jpg" alt="Smart Watch Series 9" width="600" height="400" loading="lazy" decoding="async">).',
  practiceInstVi: 'Tạo thẻ <picture> chứa source AVIF (<source type="image/avif" srcset="/prod.avif">), source WebP (<source type="image/webp" srcset="/prod.webp">), và thẻ <img> dự phòng (<img src="/prod.jpg" alt="Smart Watch Series 9" width="600" height="400" loading="lazy" decoding="async">).',
  practiceStarter: '<picture>\n  \n</picture>',
  practiceSolution: '<picture>\n  <source type="image/avif" srcset="/prod.avif">\n  <source type="image/webp" srcset="/prod.webp">\n  <img src="/prod.jpg" alt="Smart Watch Series 9" width="600" height="400" loading="lazy" decoding="async">\n</picture>',
  practicePatterns: ['<picture>', '<source type="image/avif" srcset="/prod.avif">', '<source type="image/webp" srcset="/prod.webp">', '<img src="/prod.jpg"', 'alt="Smart Watch Series 9"', 'width="600"', 'height="400"', 'loading="lazy"', 'decoding="async"', '</picture>'],
  practiceHintEn: 'Include AVIF source, WebP source, and the fallback <img> with width/height/loading/decoding.',
  practiceHintVi: 'Bao gồm source AVIF, WebP, và thẻ <img> dự phòng có width/height/loading/decoding.',

  exercises: [
    {
      id: 'html_ex_13_1',
      type: 'complete_code',
      titleEn: 'Add Resolution Density Descriptors with srcset',
      titleVi: 'Thêm bộ mô tả mật độ điểm ảnh với srcset',
      instEn: 'Add srcset="/logo.png 1x, /logo@2x.png 2x" to the logo <img>.',
      instVi: 'Thêm srcset="/logo.png 1x, /logo@2x.png 2x" vào thẻ <img> của logo.',
      starter: '<img src="/logo.png" alt="Company Logo" width="150" height="50">',
      solution: '<img src="/logo.png" srcset="/logo.png 1x, /logo@2x.png 2x" alt="Company Logo" width="150" height="50">',
      hintEn: 'Add srcset with 1x and 2x pixel density descriptors.',
      hintVi: 'Thêm srcset với các bộ mô tả mật độ 1x và 2x.',
      expEn: 'Pixel density descriptors (1x, 2x) deliver crisp sharp graphics to high-DPI Retina screens.',
      expVi: 'Mô tả mật độ 1x, 2x mang lại hình ảnh sắc nét cho màn hình độ phân giải cao Retina.'
    },
    {
      id: 'html_ex_13_2',
      type: 'fix_code',
      titleEn: 'Fix Missing Fallback Image inside <picture>',
      titleVi: 'Sửa lỗi thiếu thẻ img dự phòng trong thẻ <picture>',
      instEn: 'Fix the <picture> container by adding the required fallback <img> with src="/img/art.jpg" and alt="Modern Art Gallery".',
      instVi: 'Sửa thẻ <picture> bằng cách thêm thẻ <img> dự phòng bắt buộc với src="/img/art.jpg" và alt="Modern Art Gallery".',
      starter: '<picture>\n  <source type="image/webp" srcset="/img/art.webp">\n</picture>',
      solution: '<picture>\n  <source type="image/webp" srcset="/img/art.webp">\n  <img src="/img/art.jpg" alt="Modern Art Gallery">\n</picture>',
      hintEn: 'Add <img src="/img/art.jpg" alt="Modern Art Gallery"> inside <picture>.',
      hintVi: 'Thêm <img src="/img/art.jpg" alt="Modern Art Gallery"> vào trong thẻ <picture>.',
      expEn: 'Without an <img> element, browsers will not display any graphic from a <picture>.',
      expVi: 'Nếu thiếu phần tử <img>, trình duyệt sẽ không hiển thị bất kỳ hình ảnh nào từ thẻ <picture>.'
    },
    {
      id: 'html_ex_13_3',
      type: 'write_code',
      titleEn: 'Create Resolution Switching Image with Width Descriptors',
      titleVi: 'Tạo ảnh chuyển đổi độ phân giải với bộ mô tả chiều rộng w',
      instEn: 'Write an <img> with srcset="/pic-400.jpg 400w, /pic-800.jpg 800w", sizes="(max-width: 600px) 100vw, 50vw", src="/pic-800.jpg", and alt="Scenic Mountain Sunset".',
      instVi: 'Viết thẻ <img> có srcset="/pic-400.jpg 400w, /pic-800.jpg 800w", sizes="(max-width: 600px) 100vw, 50vw", src="/pic-800.jpg", và alt="Scenic Mountain Sunset".',
      starter: '',
      solution: '<img src="/pic-800.jpg" srcset="/pic-400.jpg 400w, /pic-800.jpg 800w" sizes="(max-width: 600px) 100vw, 50vw" alt="Scenic Mountain Sunset">',
      hintEn: 'Combine src, srcset with w descriptors, sizes, and alt.',
      hintVi: 'Kết hợp src, srcset có bộ mô tả w, sizes, và alt.',
      expEn: 'Width descriptors (400w) inform the browser of physical asset sizes so it calculates the best fit.',
      expVi: 'Bộ mô tả chiều rộng (400w) cung cấp kích thước thực để trình duyệt tự tính toán và chọn ảnh tối ưu nhất.'
    },
    {
      id: 'html_ex_13_4',
      type: 'modify_example',
      titleEn: 'Add decoding="async" and loading="lazy"',
      titleVi: 'Thêm decoding="async" và loading="lazy"',
      instEn: 'Add loading="lazy" and decoding="async" to the photo <img>.',
      instVi: 'Thêm loading="lazy" và decoding="async" vào thẻ <img>.',
      starter: '<img src="/gallery/photo5.webp" alt="City Skyline" width="800" height="600">',
      solution: '<img src="/gallery/photo5.webp" alt="City Skyline" width="800" height="600" loading="lazy" decoding="async">',
      hintEn: 'Add loading="lazy" and decoding="async" attributes.',
      hintVi: 'Thêm các thuộc tính loading="lazy" và decoding="async".',
      expEn: 'decoding="async" allows the browser to decode image data off the main UI rendering thread.',
      expVi: 'decoding="async" cho phép trình duyệt giải mã hình ảnh ngoài luồng xử lý giao diện chính (main thread).'
    },
    {
      id: 'html_ex_13_5',
      type: 'predict_output',
      titleEn: 'Predict Image Format Priority Order in <picture>',
      titleVi: 'Dự đoán thứ tự ưu tiên định dạng ảnh trong <picture>',
      instEn: 'If a browser supports AVIF, and the <picture> has <source type="image/avif"> listed before <source type="image/webp">, which format will be loaded (avif/webp)?',
      instVi: 'Nếu trình duyệt hỗ trợ AVIF và thẻ <picture> đặt <source type="image/avif"> trước <source type="image/webp">, định dạng nào sẽ được tải (avif/webp)?',
      starter: '<!-- Type avif or webp -->\n<p>Loaded format: </p>',
      solution: '<p>Loaded format: avif</p>',
      hintEn: 'Browsers evaluate <source> tags sequentially and pick the first matching type.',
      hintVi: 'Trình duyệt duyệt các thẻ <source> theo thứ tự từ trên xuống và chọn định dạng khớp đầu tiên.'
    }
  ],

  challenge: {
    id: 'html_ch_13',
    titleEn: 'Enterprise E-Commerce Responsive Product Hero Architecture',
    titleVi: 'Kiến trúc hình ảnh sản phẩm đáp ứng thương mại điện tử chuyên nghiệp',
    descEn: 'Build a production-grade responsive picture component with next-gen AVIF/WebP formats, art-directed mobile crops, and layout stability attributes.',
    descVi: 'Xây dựng phần tử picture đáp ứng chuẩn sản xuất với định dạng hiện đại AVIF/WebP, điều hướng cắt ảnh di động và chống vỡ giao diện.',
    requirements: [
      { en: 'Art direction for mobile: <source media="(max-width: 640px)" type="image/avif" srcset="/img/phone-sq.avif"> and WebP variant', vi: 'Cắt ảnh vuông cho di động màn nhỏ dưới 640px với AVIF và WebP' },
      { en: 'Desktop landscape sources for AVIF and WebP', vi: 'Nguồn ảnh ngang cho máy tính với AVIF và WebP' },
      { en: 'Fallback <img> with width="1200", height="800", alt, loading="lazy", decoding="async"', vi: 'Thẻ <img> dự phòng có width="1200", height="800", alt, loading="lazy", decoding="async"' },
      { en: 'Wrap within an accessible <figure> with a descriptive <figcaption>', vi: 'Bọc trong thẻ <figure> kèm <figcaption> mô tả' }
    ],
    starter: '<!-- Build enterprise responsive product hero here -->\n',
    solution: '<figure class="product-gallery">\n  <picture>\n    <!-- Mobile Small Crops -->\n    <source media="(max-width: 640px)" type="image/avif" srcset="/img/phone-sq.avif">\n    <source media="(max-width: 640px)" type="image/webp" srcset="/img/phone-sq.webp">\n    <!-- Desktop Landscape Sources -->\n    <source type="image/avif" srcset="/img/phone-wide.avif">\n    <source type="image/webp" srcset="/img/phone-wide.webp">\n    <!-- Fallback Universal Image -->\n    <img\n      src="/img/phone-fallback.jpg"\n      alt="Flagship Smartphone in Titanium Silver Finish with Triple Lens Camera"\n      width="1200"\n      height="800"\n      loading="lazy"\n      decoding="async">\n  </picture>\n  <figcaption>Flagship Pro Series — Studio Photography showcasing titanium alloy craftsmanship.</figcaption>\n</figure>',
    hints: [
      { en: 'Place media query mobile sources BEFORE generic desktop sources in <picture>', vi: 'Đặt các source có media query cho mobile LÊN TRƯỚC source desktop chung trong <picture>' },
      { en: 'Always include width and height on the fallback <img> to maintain aspect ratio', vi: 'Luôn khai báo width và height trên thẻ <img> dự phòng để giữ tỷ lệ khung hình' }
    ],
    expEn: 'State-of-the-art responsive image pipeline combining modern codecs, art direction, and Core Web Vitals optimization.',
    expVi: 'Quy trình xử lý hình ảnh đáp ứng hiện đại bậc nhất kết hợp codec mới, điều hướng bố cục và tối ưu chỉ số Core Web Vitals.'
  },

  challengeVariants: [
    {
      id: 'html_ch_13_v1',
      titleEn: 'Variant 1: Retina 1x/2x/3x Density Hero Icon Set',
      titleVi: 'Biến thể 1: Bộ icon mật độ điểm ảnh 1x/2x/3x cho màn hình Retina',
      descEn: 'Build an icon picture using pixel density descriptors for standard, 2x Retina, and 3x OLED mobile screens.',
      descVi: 'Xây dựng thẻ picture icon dùng bộ mô tả mật độ điểm ảnh cho màn hình thường, 2x Retina và 3x OLED.',
      requirements: [
        { en: 'srcset="/icon.png 1x, /icon@2x.png 2x, /icon@3x.png 3x"', vi: 'srcset="/icon.png 1x, /icon@2x.png 2x, /icon@3x.png 3x"' },
        { en: 'width="64" height="64" alt="Cloud Synchronization Active"', vi: 'width="64" height="64" alt="Cloud Synchronization Active"' }
      ],
      starter: '<div class="icon-box">\n  \n</div>',
      solution: '<div class="icon-box">\n  <img\n    src="/icon.png"\n    srcset="/icon.png 1x, /icon@2x.png 2x, /icon@3x.png 3x"\n    alt="Cloud Synchronization Active"\n    width="64"\n    height="64"\n    decoding="async">\n</div>',
      expEn: 'Pixel density descriptors ensure pixel-perfect rendering across high-DPI displays.',
      expVi: 'Mô tả mật độ điểm ảnh đảm bảo hiển thị sắc nét từng pixel trên mọi màn hình mật độ cao.'
    },
    {
      id: 'html_ch_13_v2',
      titleEn: 'Variant 2: Dark Mode Theme-Adaptive Image via Media Queries',
      titleVi: 'Biến thể 2: Hình ảnh thích ứng theo giao diện Sáng / Tối (Dark Mode)',
      descEn: 'Build a <picture> that serves a dark-themed diagram when the user prefers dark mode and light diagram in light mode.',
      descVi: 'Xây dựng thẻ <picture> hiển thị sơ đồ nền tối khi người dùng bật Dark Mode và sơ đồ nền sáng khi ở Light Mode.',
      requirements: [
        { en: '<source media="(prefers-color-scheme: dark)" srcset="/diagram-dark.svg">', vi: '<source media="(prefers-color-scheme: dark)" srcset="/diagram-dark.svg">' },
        { en: 'Fallback <img src="/diagram-light.svg" alt="System Architecture Topology Diagram">', vi: 'Dự phòng <img src="/diagram-light.svg" alt="System Architecture Topology Diagram">' }
      ],
      starter: '<div class="diagram-wrapper">\n  \n</div>',
      solution: '<div class="diagram-wrapper">\n  <picture>\n    <source media="(prefers-color-scheme: dark)" srcset="/diagram-dark.svg">\n    <img\n      src="/diagram-light.svg"\n      alt="System Architecture Topology Diagram"\n      width="900"\n      height="500"\n      loading="lazy"\n      decoding="async">\n  </picture>\n</div>',
      expEn: 'prefers-color-scheme inside picture sources allows automatic zero-JS theme-swapping for illustrations.',
      expVi: 'prefers-color-scheme trong thẻ picture cho phép tự động đổi ảnh theo chế độ sáng tối mà không cần một dòng JS nào.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_13_1',
      type: 'single_choice',
      qEn: 'What is the primary role of the <picture> element in HTML5?',
      qVi: 'Vai trò chính của phần tử <picture> trong HTML5 là gì?',
      options: [
        { en: 'To provide a wrapper containing multiple <source> elements for art direction (media queries) and next-gen format negotiation (AVIF/WebP) with an <img> fallback', vi: 'Cung cấp vỏ bọc chứa nhiều thẻ <source> phục vụ điều hướng bố cục (media queries) và đổi định dạng thế hệ mới (AVIF/WebP) kèm <img> dự phòng' },
        { en: 'To apply Instagram filters using HTML', vi: 'Áp dụng bộ lọc ảnh Instagram bằng HTML' },
        { en: 'To take screenshots of the user\'s screen', vi: 'Chụp ảnh màn hình của người dùng' },
        { en: 'To draw 3D animations with a paintbrush', vi: 'Vẽ hoạt hình 3D bằng cọ vẽ' }
      ],
      ans: 0,
      expEn: '<picture> gives developers declarative control over image sources based on media queries and MIME types.',
      expVi: '<picture> cho phép lập trình viên điều khiển nguồn ảnh theo media query và định dạng MIME.'
    },
    {
      id: 'html_q_13_2',
      type: 'single_choice',
      qEn: 'What do the "w" descriptors in a srcset attribute (e.g. srcset="img-400.jpg 400w, img-800.jpg 800w") represent?',
      qVi: 'Bộ mô tả "w" trong thuộc tính srcset (như srcset="img-400.jpg 400w, img-800.jpg 800w") đại diện cho điều gì?',
      options: [
        { en: 'The intrinsic physical width in pixels of the actual source image file', vi: 'Chiều rộng thực tế tính bằng pixel của chính tệp tin ảnh gốc' },
        { en: 'The weight of the image in kilograms', vi: 'Trọng lượng của ảnh tính bằng kilogram' },
        { en: 'The width of the user\'s monitor in centimeters', vi: 'Chiều rộng màn hình người dùng tính bằng centimet' },
        { en: 'The time to download in weeks', vi: 'Thời gian tải tính bằng tuần' }
      ],
      ans: 0,
      expEn: 'Width descriptors (w) tell the browser the real pixel width of each available image candidate.',
      expVi: 'Bộ mô tả chiều rộng (w) thông báo cho trình duyệt bề rộng pixel thực của từng file ảnh có sẵn.'
    },
    {
      id: 'html_q_13_3',
      type: 'single_choice',
      qEn: 'What is the purpose of the "sizes" attribute when paired with a "srcset" containing width descriptors?',
      qVi: 'Mục đích của thuộc tính "sizes" khi kết hợp với "srcset" có bộ mô tả chiều rộng là gì?',
      options: [
        { en: 'Tells the browser how wide the image will be rendered on the page before CSS is downloaded, so it can select the optimal image file immediately', vi: 'Báo cho trình duyệt biết bức ảnh sẽ chiếm bao nhiêu diện tích hiển thị trên trang trước khi tải xong CSS, để tải ngay file ảnh tối ưu nhất' },
        { en: 'Sets the font size of the caption', vi: 'Đặt cỡ chữ cho phần chú thích ảnh' },
        { en: 'Forces the image to be 100MB in size', vi: 'Ép kích thước file ảnh thành 100MB' },
        { en: 'Calculates the user\'s shoe size', vi: 'Tính cỡ giày của người dùng' }
      ],
      ans: 0,
      expEn: 'The sizes attribute provides the browser with layout width hints during pre-parse scanning.',
      expVi: 'Thuộc tính sizes cung cấp thông tin kích thước bố cục cho trình duyệt ngay trong giai đoạn phân tích sớm.'
    },
    {
      id: 'html_q_13_4',
      type: 'single_choice',
      qEn: 'Why are AVIF and WebP image formats superior to traditional JPEG and PNG for web delivery?',
      qVi: 'Tại sao các định dạng ảnh AVIF và WebP lại vượt trội hơn JPEG và PNG truyền thống khi truyền phát trên web?',
      options: [
        { en: 'They provide significantly higher visual quality at 30% to 50%+ smaller file sizes, drastically speeding up page load times', vi: 'Chúng mang lại chất lượng hình ảnh cao hơn đáng kể với dung lượng file nhỏ hơn từ 30% đến trên 50%, giúp tăng tốc tải trang vượt trội' },
        { en: 'They only display in black and white', vi: 'Chúng chỉ hiển thị được màu đen trắng' },
        { en: 'They require zero RAM to display', vi: 'Chúng không tốn bất kỳ dung lượng RAM nào' },
        { en: 'They play music when clicked', vi: 'Chúng tự phát nhạc khi bấm vào' }
      ],
      ans: 0,
      expEn: 'Next-gen formats AVIF and WebP utilize state-of-the-art compression algorithms.',
      expVi: 'Các định dạng thế hệ mới AVIF và WebP ứng dụng các thuật toán nén ảnh tiên tiến nhất hiện nay.'
    },
    {
      id: 'html_q_13_5',
      type: 'single_choice',
      qEn: 'What does loading="lazy" do on an <img> element?',
      qVi: 'Thuộc tính loading="lazy" làm gì trên phần tử <img>?',
      options: [
        { en: 'Instructs the browser to defer downloading the image until it is near the user\'s visible viewport area', vi: 'Chỉ thị cho trình duyệt hoãn tải hình ảnh cho đến khi nó cuộn tới gần vùng nhìn thấy của người dùng' },
        { en: 'Slows down the download speed to 56kbps', vi: 'Làm chậm tốc độ tải xuống còn 56kbps' },
        { en: 'Blurs the image permanently', vi: 'Làm mờ ảnh vĩnh viễn' },
        { en: 'Shows the image only on weekends', vi: 'Chỉ hiển thị ảnh vào cuối tuần' }
      ],
      ans: 0,
      expEn: 'loading="lazy" prevents off-screen images from wasting mobile data and network bandwidth.',
      expVi: 'loading="lazy" ngăn các hình ảnh nằm ngoài màn hình làm tốn dữ liệu di động và băng thông mạng.'
    },
    {
      id: 'html_q_13_6',
      type: 'single_choice',
      qEn: 'Why should you NEVER put loading="lazy" on your main above-the-fold hero header image?',
      qVi: 'Tại sao bạn TUYỆT ĐỐI KHÔNG NÊN đặt loading="lazy" trên hình ảnh Hero chính ở đầu trang?',
      options: [
        { en: 'It delays the browser from downloading the hero image immediately, causing a severe penalty to your Largest Contentful Paint (LCP) performance metric', vi: 'Nó làm trình duyệt trì hoãn việc tải ảnh Hero ngay lập tức, gây sụt giảm nghiêm trọng điểm số hiệu năng Largest Contentful Paint (LCP)' },
        { en: 'It deletes the hero section', vi: 'Nó xóa mất phần hero' },
        { en: 'It causes the text to turn upside down', vi: 'Nó làm chữ bị lộn ngược' },
        { en: 'It crashes the web server', vi: 'Nó làm sập máy chủ web' }
      ],
      ans: 0,
      expEn: 'LCP elements should be loaded with priority (fetchpriority="high"), not delayed with lazy loading.',
      expVi: 'Phần tử LCP cần được tải ưu tiên sớm (fetchpriority="high"), không được làm trễ bằng lazy load.'
    },
    {
      id: 'html_q_13_7',
      type: 'single_choice',
      qEn: 'What does decoding="async" do on an <img> tag?',
      qVi: 'Thuộc tính decoding="async" có tác dụng gì trên thẻ <img>?',
      options: [
        { en: 'Allows the browser to decode compressed image bytes asynchronously on a background worker thread, preventing main-thread UI stutter/jank during scrolling', vi: 'Cho phép trình duyệt giải mã dữ liệu ảnh nén bất đồng bộ ở luồng ngầm, ngăn chặn hiện tượng giật lag giao diện khi cuộn trang' },
        { en: 'Decrypts password-protected images', vi: 'Giải mã các bức ảnh có mật khẩu' },
        { en: 'Translates foreign text inside the photo', vi: 'Dịch chữ nước ngoài có trong ảnh' },
        { en: 'Changes the photo from PNG to SVG', vi: 'Chuyển ảnh từ PNG thành SVG' }
      ],
      ans: 0,
      expEn: 'decoding="async" keeps the browser\'s main thread free for fluid user interactions.',
      expVi: 'decoding="async" giải phóng luồng chính của trình duyệt giúp các thao tác cuộn vuốt mượt mà.'
    },
    {
      id: 'html_q_13_8',
      type: 'single_choice',
      qEn: 'Why is it critical to always include explicit width and height attributes on <img> tags?',
      qVi: 'Tại sao việc luôn khai báo thuộc tính width và height trên thẻ <img> lại cực kỳ quan trọng?',
      options: [
        { en: 'The browser calculates the aspect ratio before loading the image file, reserving the exact layout space and eliminating Cumulative Layout Shift (CLS)', vi: 'Trình duyệt tính được tỷ lệ khung hình trước khi tải xong tệp ảnh, giữ sẵn đúng chỗ trống và loại bỏ hiện tượng nhảy giật giao diện (CLS)' },
        { en: 'Without width/height, images cannot display on iPhones', vi: 'Nếu không có width/height thì ảnh không hiển thị được trên iPhone' },
        { en: 'It makes images load 10x faster from CDN', vi: 'Nó làm ảnh tải nhanh gấp 10 lần từ CDN' },
        { en: 'It is required to change image brightness in CSS', vi: 'Bắt buộc để chỉnh độ sáng trong CSS' }
      ],
      ans: 0,
      expEn: 'Explicit dimensions establish the intrinsic aspect ratio early, preventing sudden layout shifts.',
      expVi: 'Kích thước rõ ràng giúp định hình tỷ lệ khung hình sớm, ngăn chặn nội dung bị nhảy giật khi đang đọc.'
    },
    {
      id: 'html_q_13_9',
      type: 'single_choice',
      qEn: 'What does "Art Direction" mean in the context of responsive web design?',
      qVi: '"Điều Hướng Nghệ Thuật" (Art Direction) có ý nghĩa gì trong thiết kế web đáp ứng?',
      options: [
        { en: 'Serving completely different crops, zoom levels, or compositions of an image tailored specifically for different screen orientations and viewport sizes', vi: 'Phục vụ các góc cắt ảnh, mức độ thu phóng hoặc bố cục hình ảnh khác nhau hoàn toàn phù hợp riêng cho từng kích cỡ và hướng xoay màn hình' },
        { en: 'Hiring a human artist to paint web pages live', vi: 'Thuê họa sĩ vẽ trực tiếp lên trang web' },
        { en: 'Applying CSS box-shadow around all pictures', vi: 'Thêm hiệu ứng đổ bóng cho mọi hình ảnh' },
        { en: 'Converting all pictures into vector SVG paths', vi: 'Chuyển mọi ảnh thành vector SVG' }
      ],
      ans: 0,
      expEn: 'Art direction tailors the visual presentation and framing of an image to the device form factor.',
      expVi: 'Điều hướng nghệ thuật tối ưu góc nhìn và khung hình của bức ảnh cho từng loại thiết bị.'
    },
    {
      id: 'html_q_13_10',
      type: 'single_choice',
      qEn: 'What is the correct syntax for a <source> tag that only applies to screens wider than 1024px in a <picture>?',
      qVi: 'Cú pháp chuẩn cho thẻ <source> chỉ áp dụng cho màn hình rộng hơn 1024px trong <picture> là gì?',
      options: [
        { en: '<source media="(min-width: 1024px)" srcset="/img-large.webp">', vi: '<source media="(min-width: 1024px)" srcset="/img-large.webp">' },
        { en: '<source screen="1024px" src="/img-large.webp">', vi: '<source screen="1024px" src="/img-large.webp">' },
        { en: '<source if-desktop="/img-large.webp">', vi: '<source if-desktop="/img-large.webp">' },
        { en: '<source condition="width > 1024" url="/img-large.webp">', vi: '<source condition="width > 1024" url="/img-large.webp">' }
      ],
      ans: 0,
      expEn: 'The media attribute on <source> accepts standard CSS media queries.',
      expVi: 'Thuộc tính media trên thẻ <source> nhận các biểu thức media query chuẩn của CSS.'
    },
    {
      id: 'html_q_13_11',
      type: 'single_choice',
      qEn: 'Can SVG images be used inside <img> and <picture> elements?',
      qVi: 'Hình ảnh định dạng vector SVG có thể dùng bên trong thẻ <img> và <picture> không?',
      options: [
        { en: 'Yes, SVG is a first-class vector format supported in src, srcset, and source elements with infinite scalability', vi: 'Có, SVG là định dạng vector hàng đầu được hỗ trợ đầy đủ trong src, srcset và source với khả năng phóng to thu nhỏ không vỡ hạt' },
        { en: 'No, SVG only works in Adobe Illustrator', vi: 'Không, SVG chỉ chạy được trong Adobe Illustrator' },
        { en: 'Only if converted to JPEG first', vi: 'Chỉ khi chuyển đổi sang JPEG trước' },
        { en: 'Only on Linux operating systems', vi: 'Chỉ trên hệ điều hành Linux' }
      ],
      ans: 0,
      expEn: 'SVGs scale losslessly to any resolution without increasing file size.',
      expVi: 'Ảnh SVG co giãn không mất chất lượng ở mọi độ phân giải mà không làm tăng dung lượng file.'
    },
    {
      id: 'html_q_13_12',
      type: 'single_choice',
      qEn: 'What does fetchpriority="high" on an <img> tag do?',
      qVi: 'Thuộc tính fetchpriority="high" trên thẻ <img> có tác dụng gì?',
      options: [
        { en: 'Signals the browser network scheduler to download that critical image with the highest possible network priority (ideal for LCP hero images)', vi: 'Báo hiệu cho trình quản lý mạng của trình duyệt ưu tiên tải bức ảnh quan trọng đó ở mức ưu tiên cao nhất (rất lý tưởng cho ảnh LCP đầu trang)' },
        { en: 'Downloads the image over 5G only', vi: 'Chỉ tải ảnh qua sóng 5G' },
        { en: 'Forces the image to open in a new browser window', vi: 'Ép bức ảnh mở trong cửa sổ mới' },
        { en: 'Increases the image resolution with AI', vi: 'Dùng AI tăng độ phân giải của ảnh' }
      ],
      ans: 0,
      expEn: 'fetchpriority="high" optimizes asset download scheduling for vital above-the-fold content.',
      expVi: 'fetchpriority="high" tối ưu hóa lịch tải tài nguyên cho nội dung quan trọng nằm ngay trong tầm mắt đầu tiên.'
    },
    {
      id: 'html_q_13_13',
      type: 'single_choice',
      qEn: 'What happens if a browser does not understand <picture> or <source>?',
      qVi: 'Điều gì xảy ra nếu một trình duyệt cũ không hiểu thẻ <picture> hoặc <source>?',
      options: [
        { en: 'It ignores the unfamiliar tags and smoothly renders the standard <img> tag nested inside', vi: 'Nó sẽ bỏ qua các thẻ không nhận diện được và hiển thị bình thường thẻ <img> dự phòng bên trong' },
        { en: 'The page crashes with a syntax error', vi: 'Trang bị dừng lại với lỗi cú pháp' },
        { en: 'The user is prompted to buy a new computer', vi: 'Hiện thông báo yêu cầu người dùng mua máy mới' },
        { en: 'The webpage background turns red', vi: 'Màu nền trang web chuyển sang màu đỏ' }
      ],
      ans: 0,
      expEn: 'HTML is designed for backwards-compatibility; unknown tags are ignored and child elements render.',
      expVi: 'HTML được thiết kế tương thích ngược; các thẻ lạ bị bỏ qua và phần tử con bên trong vẫn hiển thị.'
    },
    {
      id: 'html_q_13_14',
      type: 'single_choice',
      qEn: 'What does the "type" attribute on <source> (e.g. type="image/avif") tell the browser?',
      qVi: 'Thuộc tính "type" trên thẻ <source> (như type="image/avif") thông báo điều gì cho trình duyệt?',
      options: [
        { en: 'The MIME type of the candidate image so the browser can immediately skip it if the format is unsupported, without wasting a network request', vi: 'Loại MIME của file ảnh đề xuất để trình duyệt bỏ qua ngay nếu không hỗ trợ định dạng này mà không tốn một request mạng nào' },
        { en: 'The CSS filter applied to the image', vi: 'Bộ lọc CSS áp dụng lên ảnh' },
        { en: 'The camera model used to take the photo', vi: 'Mẫu máy ảnh đã dùng để chụp' },
        { en: 'The copyright license status', vi: 'Tình trạng bản quyền của ảnh' }
      ],
      ans: 0,
      expEn: 'type allows format negotiation without exploratory network requests.',
      expVi: 'type cho phép chuyển đổi định dạng mà không cần gửi request thử nghiệm tốn mạng.'
    },
    {
      id: 'html_q_13_15',
      type: 'single_choice',
      qEn: 'In sizes="(max-width: 600px) 100vw, 50vw", what does "100vw" mean?',
      qVi: 'Trong biểu thức sizes="(max-width: 600px) 100vw, 50vw", "100vw" có nghĩa là gì?',
      options: [
        { en: 'On viewports up to 600px wide, the image will occupy 100% of the viewport width', vi: 'Trên màn hình rộng tối đa 600px, bức ảnh sẽ chiếm toàn bộ 100% bề rộng màn hình hiển thị' },
        { en: 'The image has a width of 100 vector watts', vi: 'Bức ảnh có công suất 100 watt vector' },
        { en: 'The image will download 100 times', vi: 'Bức ảnh sẽ tải 100 lần' },
        { en: 'The image zoom level is 100%', vi: 'Mức thu phóng ảnh là 100%' }
      ],
      ans: 0,
      expEn: 'vw represents viewport width percentage units.',
      expVi: 'vw là đơn vị tỷ lệ phần trăm theo bề rộng khung nhìn viewport.'
    },
    {
      id: 'html_q_13_16',
      type: 'single_choice',
      qEn: 'Which CSS property is commonly paired with responsive images to preserve aspect ratio and prevent distortion?',
      qVi: 'Thuộc tính CSS nào thường được kết hợp với ảnh đáp ứng để giữ tỷ lệ khung hình và chống méo ảnh?',
      options: [
        { en: 'object-fit: cover (or contain) and height: auto', vi: 'object-fit: cover (hoặc contain) và height: auto' },
        { en: 'image-distort: false', vi: 'image-distort: false' },
        { en: 'aspect-lock: 100%', vi: 'aspect-lock: 100%' },
        { en: 'scale-mode: native', vi: 'scale-mode: native' }
      ],
      ans: 0,
      expEn: 'object-fit: cover ensures images fill their box nicely without distortion.',
      expVi: 'object-fit: cover đảm bảo ảnh phủ đầy khung chứa một cách tự nhiên mà không bị méo tỷ lệ.'
    }
  ]
};

console.log('Lesson 13 defined.');
