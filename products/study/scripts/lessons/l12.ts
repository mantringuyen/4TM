import { RawLessonSource } from './rawLessonType';

export const lesson12: RawLessonSource = {
  order: 12,
  id: 'html_lesson_12',
  moduleId: 'html_mod_4',
  levelId: 'intermediate',
  topicId: 'html_audio_video',
  titleEn: 'Native Audio & Video: <audio>, <video>, <source> & Accessible <track> Subtitles',
  titleVi: 'Âm Thanh & Video Gốc: <audio>, <video>, <source> & Phụ Đề Trợ Năng <track>',
  summaryEn: 'Master native multimedia playback: <audio> and <video> elements, multi-format fallback with <source>, essential UX attributes (controls, autoplay, muted, playsinline, poster), and accessible captions via <track kind="subtitles|captions" src="subtitles.vtt">.',
  summaryVi: 'Làm chủ phát đa phương tiện gốc: thẻ <audio> và <video>, cơ chế dự phòng đa định dạng với <source>, các thuộc tính UX thiết yếu (controls, autoplay, muted, playsinline, poster) và phụ đề chuẩn trợ năng qua <track kind="subtitles|captions" src="subtitles.vtt">.',
  estimatedMinutes: 15,
  introEn: 'HTML5 introduced native media capabilities that render third-party audio/video player plugins obsolete, providing hardware-accelerated playback with deep accessibility support.',
  introVi: 'HTML5 mang đến các tính năng đa phương tiện gốc giúp loại bỏ hoàn toàn các plugin bên thứ 3 cồng kềnh, hỗ trợ tăng tốc phần cứng mượt mà và khả năng tiếp cận vượt trội.',
  conceptEn: 'Use <video controls poster="cover.jpg" preload="metadata"> with child <source> elements (e.g. video/mp4, video/webm) so browsers automatically select their preferred codec. To comply with modern browser autoplay policies, autoplay MUST always be paired with muted. For accessibility (WCAG AA), include at least one <track> element with WebVTT (.vtt) captions or subtitles.',
  conceptVi: 'Dùng <video controls poster="cover.jpg" preload="metadata"> kèm các thẻ con <source> (ví dụ video/mp4, video/webm) để trình duyệt tự chọn codec tối ưu nhất. Để tuân thủ chính sách tự động phát của trình duyệt, autoplay BẮT BUỘC phải đi kèm với muted. Để bảo đảm tính trợ năng (WCAG AA), bắt buộc phải có ít nhất một thẻ <track> chứa tệp phụ đề WebVTT (.vtt).',
  syntax: '<video controls poster="/images/poster.jpg" preload="metadata" width="800">\n  <source src="/media/clip.webm" type="video/webm">\n  <source src="/media/clip.mp4" type="video/mp4">\n  <track kind="captions" src="/media/captions-en.vtt" srclang="en" label="English Captions" default>\n  <p>Your browser does not support HTML5 video. <a href="/media/clip.mp4">Download video</a>.</p>\n</video>',
  ex1TitleEn: 'Accessible Video Player with Multi-Format WebM/MP4 and Dual Subtitles',
  ex1TitleVi: 'Trình Phát Video Chuẩn Trợ Năng Đa Định Dạng WebM/MP4 Và Phụ Đề Kép',
  ex1Code: '<video controls width="640" height="360" poster="/assets/hero-poster.jpg" preload="metadata" style="border-radius:8px; width:100%; max-width:640px;">\n  <source src="/media/masterclass.webm" type="video/webm">\n  <source src="/media/masterclass.mp4" type="video/mp4">\n  <track kind="subtitles" src="/media/subs-en.vtt" srclang="en" label="English" default>\n  <track kind="subtitles" src="/media/subs-vi.vtt" srclang="vi" label="Tiếng Việt">\n  <p>Your browser cannot play this video. <a href="/media/masterclass.mp4">Download video file</a>.</p>\n</video>',
  ex1ExpEn: 'Provides modern WebM and legacy MP4 fallback, multiple subtitle tracks, and accessible fallback download links.',
  ex1ExpVi: 'Cung cấp codec WebM hiện đại và MP4 dự phòng, nhiều luồng phụ đề song ngữ và link tải xuống dự phòng.',
  ex2TitleEn: 'Audio Player with Fallback Sources',
  ex2TitleVi: 'Trình Phát Âm Thanh Kèm Các Định Dạng Dự Phòng',
  ex2Code: '<audio controls preload="metadata" style="width:100%; max-width:400px;">\n  <source src="/audio/podcast-ep1.ogg" type="audio/ogg">\n  <source src="/audio/podcast-ep1.mp3" type="audio/mpeg">\n  <p>Your browser does not support native audio playback. <a href="/audio/podcast-ep1.mp3">Download MP3</a>.</p>\n</audio>',
  ex2ExpEn: 'Plays OGG or MP3 audio streams with native browser media transport controls.',
  ex2ExpVi: 'Phát luồng âm thanh OGG hoặc MP3 với thanh điều khiển phát nhạc tích hợp sẵn của trình duyệt.',
  mistake1En: 'Using autoplay without the muted attribute on a video element',
  mistake1Vi: 'Dùng thuộc tính autoplay mà quên thêm muted trên thẻ video',
  correction1En: 'Modern browsers will strictly block unmuted video autoplay to protect user sanity. Always include muted alongside autoplay.',
  correction1Vi: 'Trình duyệt hiện đại sẽ chặn tự động phát video có tiếng để bảo vệ người dùng. Luôn thêm muted đi kèm autoplay.',
  mistake2En: 'Omitting the <track> subtitle tag on educational/commercial video content',
  mistake2Vi: 'Bỏ qua thẻ phụ đề <track> trên các video giáo dục/thương mại',
  correction2En: 'Deaf and hard-of-hearing users cannot consume audio content without synchronized captions, violating WCAG Level AA compliance.',
  correction2Vi: 'Người khiếm thính không thể tiếp thu thông tin nếu thiếu phụ đề đồng bộ, vi phạm tiêu chuẩn tiếp cận WCAG AA.',
  tipEn: 'The playsinline attribute is essential for iOS Safari to allow video playback directly inline within the webpage layout rather than automatically forcing fullscreen mode.',
  tipVi: 'Thuộc tính playsinline là bắt buộc trên Safari iOS để video phát trực tiếp trong bố cục trang web thay vì tự ý phóng to toàn màn hình.',
  practiceTaskEn: 'Build a Fully Accessible Video Container',
  practiceTaskVi: 'Xây dựng khung phát video hoàn chỉnh chuẩn trợ năng',
  practiceInstEn: 'Create a <video controls width="600" poster="/thumb.jpg"> containing a WebM source (<source src="/clip.webm" type="video/webm">), an MP4 source (<source src="/clip.mp4" type="video/mp4">), and an English captions track (<track kind="captions" src="/subs.vtt" srclang="en" label="English" default>).',
  practiceInstVi: 'Tạo thẻ <video controls width="600" poster="/thumb.jpg"> chứa source WebM (<source src="/clip.webm" type="video/webm">), source MP4 (<source src="/clip.mp4" type="video/mp4">), và track phụ đề tiếng Anh (<track kind="captions" src="/subs.vtt" srclang="en" label="English" default>).',
  practiceStarter: '<video>\n  \n</video>',
  practiceSolution: '<video controls width="600" poster="/thumb.jpg">\n  <source src="/clip.webm" type="video/webm">\n  <source src="/clip.mp4" type="video/mp4">\n  <track kind="captions" src="/subs.vtt" srclang="en" label="English" default>\n</video>',
  practicePatterns: ['<video controls', 'width="600"', 'poster="/thumb.jpg"', '<source src="/clip.webm" type="video/webm">', '<source src="/clip.mp4" type="video/mp4">', '<track kind="captions" src="/subs.vtt" srclang="en" label="English" default>', '</video>'],
  practiceHintEn: 'Include controls, poster, both <source> tags, and the <track> tag with default.',
  practiceHintVi: 'Bao gồm controls, poster, cả 2 thẻ <source>, và thẻ <track> có default.',

  exercises: [
    {
      id: 'html_ex_12_1',
      type: 'complete_code',
      titleEn: 'Add Controls and Preload to Audio Element',
      titleVi: 'Thêm controls và preload vào thẻ audio',
      instEn: 'Add controls and preload="metadata" to the <audio> element.',
      instVi: 'Thêm controls và preload="metadata" vào thẻ <audio>.',
      starter: '<audio src="/sounds/bell.mp3">\n</audio>',
      solution: '<audio src="/sounds/bell.mp3" controls preload="metadata">\n</audio>',
      hintEn: 'Add controls and preload="metadata" attributes.',
      hintVi: 'Thêm các thuộc tính controls và preload="metadata".',
      expEn: 'controls exposes play/pause buttons, and preload="metadata" fetches duration and track info without downloading the entire audio stream.',
      expVi: 'controls hiển thị nút play/pause và preload="metadata" nạp thông tin thời lượng mà không tải toàn bộ file âm thanh.'
    },
    {
      id: 'html_ex_12_2',
      type: 'fix_code',
      titleEn: 'Fix Video Autoplay Policy Compliance',
      titleVi: 'Sửa lỗi vi phạm chính sách tự động phát video',
      instEn: 'Fix the background video element by adding muted and playsinline attributes so autoplay succeeds on all browsers and mobile devices.',
      instVi: 'Sửa thẻ video nền bằng cách thêm thuộc tính muted và playsinline để tự động phát thành công trên mọi trình duyệt và di động.',
      starter: '<video autoplay loop src="/video/ambient-bg.mp4"></video>',
      solution: '<video autoplay loop muted playsinline src="/video/ambient-bg.mp4"></video>',
      hintEn: 'Add muted and playsinline attributes.',
      hintVi: 'Thêm các thuộc tính muted và playsinline.',
      expEn: 'Browsers reject unmuted autoplay; playsinline prevents iOS from forcing fullscreen.',
      expVi: 'Trình duyệt chặn autoplay có tiếng; playsinline ngăn iOS tự ý nhảy toàn màn hình.'
    },
    {
      id: 'html_ex_12_3',
      type: 'write_code',
      titleEn: 'Create Subtitle Track Element',
      titleVi: 'Tạo phần tử track phụ đề',
      instEn: 'Write a <track> element with kind="subtitles", src="/tracks/vi.vtt", srclang="vi", and label="Tiếng Việt".',
      instVi: 'Viết thẻ <track> có kind="subtitles", src="/tracks/vi.vtt", srclang="vi", và label="Tiếng Việt".',
      starter: '',
      solution: '<track kind="subtitles" src="/tracks/vi.vtt" srclang="vi" label="Tiếng Việt">',
      hintEn: 'Include kind, src, srclang, and label attributes.',
      hintVi: 'Bao gồm các thuộc tính kind, src, srclang, và label.',
      expEn: 'The track element provides timed text captions formatted in WebVTT syntax.',
      expVi: 'Thẻ track cung cấp phụ đề văn bản khớp thời gian theo định dạng chuẩn WebVTT.'
    },
    {
      id: 'html_ex_12_4',
      type: 'modify_example',
      titleEn: 'Add Video Poster Image',
      titleVi: 'Thêm ảnh bìa poster cho video',
      instEn: 'Add poster="/images/course-cover.webp" to the <video> element.',
      instVi: 'Thêm poster="/images/course-cover.webp" vào thẻ <video>.',
      starter: '<video controls width="720">\n  <source src="/media/lesson.mp4" type="video/mp4">\n</video>',
      solution: '<video controls width="720" poster="/images/course-cover.webp">\n  <source src="/media/lesson.mp4" type="video/mp4">\n</video>',
      hintEn: 'Add the poster attribute to the <video> tag.',
      hintVi: 'Thêm thuộc tính poster vào thẻ <video>.',
      expEn: 'The poster attribute displays an image thumbnail while the video is downloading or until playback begins.',
      expVi: 'Thuộc tính poster hiển thị hình ảnh thu nhỏ đại diện trước khi người dùng bấm xem video.'
    },
    {
      id: 'html_ex_12_5',
      type: 'predict_output',
      titleEn: 'Predict Default Value of preload Attribute',
      titleVi: 'Dự đoán giá trị mặc định của thuộc tính preload',
      instEn: 'What is the default value of the "preload" attribute on media elements in most modern browsers (auto/metadata/none)?',
      instVi: 'Giá trị mặc định của thuộc tính "preload" trên phần tử media ở hầu hết trình duyệt là gì (auto/metadata/none)?',
      starter: '<!-- Type auto, metadata, or none -->\n<p>Preload default: </p>',
      solution: '<p>Preload default: auto</p>',
      hintEn: 'Browsers typically default preload to auto unless on data saver mode.',
      hintVi: 'Trình duyệt thường mặc định preload là auto trừ khi bật chế độ tiết kiệm dữ liệu.',
      expEn: 'preload defaults to auto (or metadata on cellular data connections).',
      expVi: 'preload mặc định là auto (hoặc metadata khi dùng mạng 4G/5G tiết kiệm dữ liệu).'
    }
  ],

  challenge: {
    id: 'html_ch_12',
    titleEn: 'Broadcast Production Multimedia Showcase Section',
    titleVi: 'Khu vực trình phát đa phương tiện truyền hình chuẩn phát sóng',
    descEn: 'Build a production multimedia landing section featuring an accessible video documentary with multiple subtitle tracks and a standalone audio podcast player.',
    descVi: 'Xây dựng khu vực trình phát đa phương tiện chuyên nghiệp gồm phim tài liệu video có phụ đề song ngữ và trình phát podcast âm thanh.',
    requirements: [
      { en: '<section> with <h2>Featured Multimedia</h2>', vi: '<section> có <h2>Featured Multimedia</h2>' },
      { en: '<video controls width="800" height="450" poster="/img/doc-cover.jpg" preload="metadata">', vi: '<video controls width="800" height="450" poster="/img/doc-cover.jpg" preload="metadata">' },
      { en: 'WebM (<source src="/video/doc.webm" type="video/webm">) and MP4 (<source src="/video/doc.mp4" type="video/mp4">) sources', vi: '2 nguồn video WebM và MP4' },
      { en: 'English captions (<track kind="captions" src="/subs/en.vtt" srclang="en" label="English Captions" default>) and Vietnamese subtitles (<track kind="subtitles" src="/subs/vi.vtt" srclang="vi" label="Tiếng Việt">)', vi: 'Track phụ đề tiếng Anh (default) và tiếng Việt' },
      { en: '<audio controls preload="none"> with MP3 (<source src="/audio/podcast.mp3" type="audio/mpeg">) and OGG (<source src="/audio/podcast.ogg" type="audio/ogg">)', vi: '<audio controls preload="none"> có MP3 và OGG' }
    ],
    starter: '<!-- Build multimedia showcase section here -->\n',
    solution: '<section>\n  <h2>Featured Multimedia</h2>\n  <div class="video-wrapper">\n    <video controls width="800" height="450" poster="/img/doc-cover.jpg" preload="metadata">\n      <source src="/video/doc.webm" type="video/webm">\n      <source src="/video/doc.mp4" type="video/mp4">\n      <track kind="captions" src="/subs/en.vtt" srclang="en" label="English Captions" default>\n      <track kind="subtitles" src="/subs/vi.vtt" srclang="vi" label="Tiếng Việt">\n      <p>Your browser does not support HTML5 video. <a href="/video/doc.mp4">Download documentary video</a>.</p>\n    </video>\n  </div>\n  <div class="audio-wrapper">\n    <h3>Behind the Scenes Podcast</h3>\n    <audio controls preload="none">\n      <source src="/audio/podcast.mp3" type="audio/mpeg">\n      <source src="/audio/podcast.ogg" type="audio/ogg">\n      <p>Your browser does not support native audio. <a href="/audio/podcast.mp3">Download MP3</a>.</p>\n    </audio>\n  </div>\n</section>',
    hints: [
      { en: 'Ensure all MIME types (video/webm, video/mp4, audio/mpeg, audio/ogg) are accurately specified', vi: 'Đảm bảo tất cả các MIME type đều được ghi chính xác' },
      { en: 'Mark the primary track with the boolean "default" attribute', vi: 'Đánh dấu track phụ đề chính bằng thuộc tính boolean "default"' }
    ],
    expEn: 'Complete media streaming architecture with responsive dimensions and bilingual accessibility captioning.',
    expVi: 'Kiến trúc phát trực tuyến đa phương tiện hoàn chỉnh với kích thước đáp ứng và phụ đề song ngữ.'
  },

  challengeVariants: [
    {
      id: 'html_ch_12_v1',
      titleEn: 'Variant 1: Ambient Background Video Hero Banner',
      titleVi: 'Biến thể 1: Banner video nền không tiếng tự động lặp',
      descEn: 'Build a background hero banner with muted, autoplay, loop, and playsinline attributes for silent video looping.',
      descVi: 'Xây dựng banner đầu trang có video nền không tiếng tự động phát, lặp lại và phát trong trang.',
      requirements: [
        { en: '<video autoplay loop muted playsinline poster="/bg-poster.jpg">', vi: '<video autoplay loop muted playsinline poster="/bg-poster.jpg">' },
        { en: 'Overlay heading <h1>Next Generation Cloud Infrastructure</h1> inside the banner container', vi: 'Tiêu đề nổi <h1>Next Generation Cloud Infrastructure</h1> bên trong khung banner' }
      ],
      starter: '<header class="hero-video-banner">\n  \n</header>',
      solution: '<header class="hero-video-banner">\n  <video autoplay loop muted playsinline poster="/bg-poster.jpg">\n    <source src="/bg-waves.webm" type="video/webm">\n    <source src="/bg-waves.mp4" type="video/mp4">\n  </video>\n  <div class="hero-content">\n    <h1>Next Generation Cloud Infrastructure</h1>\n  </div>\n</header>',
      expEn: 'Combines autoplay, loop, muted, and playsinline for zero-interaction ambient background video effects.',
      expVi: 'Kết hợp autoplay, loop, muted và playsinline để tạo hiệu ứng video nền tự động không gây phiền.'
    },
    {
      id: 'html_ch_12_v2',
      titleEn: 'Variant 2: Audio Book Chapter Player with Chapters Track',
      titleVi: 'Biến thể 2: Trình phát sách nói kèm track phân chia chương',
      descEn: 'Build an audiobook player featuring chapter markers using <track kind="chapters">.',
      descVi: 'Xây dựng trình phát sách nói có đánh dấu phân chia chương bằng thẻ <track kind="chapters">.',
      requirements: [
        { en: '<audio controls preload="metadata">', vi: '<audio controls preload="metadata">' },
        { en: '<track kind="chapters" src="/book/chapters.vtt" srclang="en" label="Book Chapters">', vi: '<track kind="chapters" src="/book/chapters.vtt" srclang="en" label="Book Chapters">' }
      ],
      starter: '<div class="audiobook-player">\n  \n</div>',
      solution: '<div class="audiobook-player">\n  <h3>Chapter 1: The Foundations</h3>\n  <audio controls preload="metadata">\n    <source src="/book/ch1.mp3" type="audio/mpeg">\n    <track kind="chapters" src="/book/chapters.vtt" srclang="en" label="Book Chapters">\n  </audio>\n</div>',
      expEn: 'kind="chapters" enables media players to expose navigational chapter jumps.',
      expVi: 'kind="chapters" cho phép trình phát hiển thị danh sách nhảy nhanh qua từng chương.'
    }
  ],

  quizzes: [
    {
      id: 'html_q_12_1',
      type: 'single_choice',
      qEn: 'Why is the "controls" attribute important on <audio> and <video> elements?',
      qVi: 'Tại sao thuộc tính "controls" lại quan trọng trên các phần tử <audio> và <video>?',
      options: [
        { en: 'It instructs the browser to render native playback controls (Play/Pause, Volume, Timeline scrubber, Fullscreen)', vi: 'Nó ra lệnh cho trình duyệt hiển thị thanh điều khiển phát gốc (Play/Pause, Âm lượng, Tua thời gian, Toàn màn hình)' },
        { en: 'It connects the video to a PlayStation controller', vi: 'Nó kết nối video với tay cầm PlayStation' },
        { en: 'It translates the video into 10 languages', vi: 'Nó dịch video sang 10 thứ tiếng' },
        { en: 'It compresses the video file by 90%', vi: 'Nó nén dung lượng video 90%' }
      ],
      ans: 0,
      expEn: 'Without controls, the media element renders with no user interface (unless custom UI is built in JS).',
      expVi: 'Nếu thiếu controls, video/audio sẽ không hiển thị bất kỳ nút bấm nào cho người dùng điều khiển.'
    },
    {
      id: 'html_q_12_2',
      type: 'single_choice',
      qEn: 'Why do modern web browsers block videos with "autoplay" unless "muted" is also specified?',
      qVi: 'Tại sao trình duyệt web hiện đại chặn video có "autoplay" trừ khi có thêm thuộc tính "muted"?',
      options: [
        { en: 'To protect users from loud, annoying, unwanted sound blasting upon page load (Autoplay Policy compliance)', vi: 'Để bảo vệ người dùng khỏi âm thanh ồn ào, bất ngờ phát ra khi vừa mở trang (Tuân thủ chính sách Autoplay Policy)' },
        { en: 'Because sound cards cannot process HTML5 audio', vi: 'Vì card âm thanh không xử lý được HTML5' },
        { en: 'Because video with sound requires a paid browser subscription', vi: 'Vì video có tiếng yêu cầu trả phí trình duyệt' },
        { en: 'To prevent computer screens from overheating', vi: 'Để ngăn màn hình máy tính bị quá nhiệt' }
      ],
      ans: 0,
      expEn: 'Browser autoplay policies require media to be muted before automatic playback is permitted.',
      expVi: 'Chính sách autoplay của trình duyệt bắt buộc âm thanh phải tắt tiếng (muted) mới cho phép tự động phát.'
    },
    {
      id: 'html_q_12_3',
      type: 'single_choice',
      qEn: 'What is the format of subtitle files used with the HTML5 <track> element?',
      qVi: 'Định dạng của tệp phụ đề dùng cho thẻ <track> trong HTML5 là gì?',
      options: [
        { en: 'WebVTT (.vtt) format starting with WEBVTT header', vi: 'Định dạng WebVTT (.vtt) bắt đầu bằng dòng tiêu đề WEBVTT' },
        { en: 'Microsoft Word .doc format', vi: 'Định dạng Microsoft Word .doc' },
        { en: 'Adobe Photoshop .psd format', vi: 'Định dạng Adobe Photoshop .psd' },
        { en: 'ZIP compressed archive', vi: 'Tệp nén ZIP' }
      ],
      ans: 0,
      expEn: 'WebVTT (Web Video Text Tracks) is the standard format for HTML5 timed captions and subtitles.',
      expVi: 'WebVTT (Web Video Text Tracks) là định dạng chuẩn cho phụ đề và chú thích văn bản trong HTML5.'
    },
    {
      id: 'html_q_12_4',
      type: 'single_choice',
      qEn: 'What does the "playsinline" attribute on a <video> element achieve on mobile Safari (iOS)?',
      qVi: 'Thuộc tính "playsinline" trên thẻ <video> mang lại tác dụng gì trên trình duyệt Safari di động (iOS)?',
      options: [
        { en: 'Plays the video inline inside the webpage layout instead of automatically forcing it into full-screen video player mode', vi: 'Phát video ngay trong bố cục trang web thay vì tự ý ép mở toàn màn hình' },
        { en: 'Plays the video 2x faster', vi: 'Phát video nhanh gấp 2 lần' },
        { en: 'Turns on high dynamic range (HDR)', vi: 'Bật chế độ HDR' },
        { en: 'Downloads the video to the camera roll', vi: 'Tải video về thư viện ảnh' }
      ],
      ans: 0,
      expEn: 'playsinline is critical for inline video integration on iOS devices.',
      expVi: 'playsinline rất quan trọng để nhúng video mượt mà trong giao diện trên iOS.'
    },
    {
      id: 'html_q_12_5',
      type: 'single_choice',
      qEn: 'How does a browser decide which <source> to play inside a <video> or <audio> container?',
      qVi: 'Trình duyệt quyết định phát thẻ <source> nào bên trong thẻ <video> hoặc <audio> theo cách nào?',
      options: [
        { en: 'It evaluates the sources in top-to-bottom order and selects the very first format and codec that it natively supports', vi: 'Nó duyệt các thẻ source từ trên xuống dưới và chọn định dạng/codec đầu tiên mà nó hỗ trợ' },
        { en: 'It downloads all of them and blends them together', vi: 'Nó tải tất cả về rồi ghép lại' },
        { en: 'It selects the smallest file size randomly', vi: 'Nó chọn ngẫu nhiên file có dung lượng nhỏ nhất' },
        { en: 'It asks the user to pick via a dialog box', vi: 'Nó hiện bảng hỏi người dùng chọn' }
      ],
      ans: 0,
      expEn: 'Browsers test sources sequentially and play the first compatible MIME type and codec.',
      expVi: 'Trình duyệt kiểm tra tuần tự và phát định dạng tương thích đầu tiên tìm thấy.'
    },
    {
      id: 'html_q_12_6',
      type: 'single_choice',
      qEn: 'What does the "poster" attribute do on a <video> element?',
      qVi: 'Thuộc tính "poster" trên thẻ <video> có tác dụng gì?',
      options: [
        { en: 'Specifies an image URL to display as a cover preview before the video is played or while downloading', vi: 'Chỉ định đường dẫn ảnh hiển thị làm ảnh bìa xem trước khi video chưa phát hoặc đang tải' },
        { en: 'Prints the video as a physical poster', vi: 'In video thành tấm áp phích' },
        { en: 'Adds a watermark logo over the video', vi: 'Chèn logo mờ lên góc video' },
        { en: 'Rotates the video 90 degrees', vi: 'Xoay video 90 độ' }
      ],
      ans: 0,
      expEn: 'The poster attribute sets the thumbnail preview image for the video.',
      expVi: 'Thuộc tính poster thiết lập hình ảnh đại diện thumbnail cho video.'
    },
    {
      id: 'html_q_12_7',
      type: 'single_choice',
      qEn: 'What does preload="none" indicate to the browser on a media tag?',
      qVi: 'preload="none" chỉ thị điều gì cho trình duyệt trên thẻ media?',
      options: [
        { en: 'Do not preload any audio/video data or metadata until the user explicitly clicks the play button, saving user mobile bandwidth', vi: 'Không tải trước bất kỳ dữ liệu hay metadata nào cho tới khi người dùng chủ động bấm Play, giúp tiết kiệm băng thông di động' },
        { en: 'Disable audio output entirely', vi: 'Tắt toàn bộ âm thanh' },
        { en: 'Delete the media file from the web server', vi: 'Xóa tệp media khỏi máy chủ' },
        { en: 'Loop the video indefinitely', vi: 'Lặp lại video vô tận' }
      ],
      ans: 0,
      expEn: 'preload="none" prevents unneeded background downloads of media assets.',
      expVi: 'preload="none" ngăn tải ngầm các file đa phương tiện khi chưa có yêu cầu từ người dùng.'
    },
    {
      id: 'html_q_12_8',
      type: 'single_choice',
      qEn: 'What is the difference between kind="subtitles" and kind="captions" on a <track> element?',
      qVi: 'Sự khác biệt giữa kind="subtitles" và kind="captions" trên thẻ <track> là gì?',
      options: [
        { en: 'Subtitles translate dialogue for viewers who can hear, while captions include dialogue PLUS sound effects and speaker IDs for deaf and hard-of-hearing viewers', vi: 'Subtitles chỉ dịch lời thoại cho người nghe được, còn Captions bao gồm cả lời thoại KÈM hiệu ứng âm thanh và tên người nói cho người khiếm thính' },
        { en: 'Captions are in English only; subtitles are in French only', vi: 'Captions chỉ có tiếng Anh; subtitles chỉ có tiếng Pháp' },
        { en: 'Subtitles are shown at the top, captions at the bottom', vi: 'Subtitles hiện ở trên cùng, captions hiện ở dưới cùng' },
        { en: 'Captions require CSS styling', vi: 'Captions bắt buộc phải có CSS' }
      ],
      ans: 0,
      expEn: 'Captions include non-speech audio cues (e.g. "[Applause]", "[Laughter]") for accessibility.',
      expVi: 'Captions bao gồm cả các tín hiệu âm thanh phi ngôn ngữ (như "[Tiếng vỗ tay]", "[Cười lớn]") phục vụ trợ thính.'
    },
    {
      id: 'html_q_12_9',
      type: 'single_choice',
      qEn: 'What boolean attribute on <video> causes playback to continuously restart from the beginning when it reaches the end?',
      qVi: 'Thuộc tính boolean nào trên thẻ <video> làm cho video tự động phát lại từ đầu khi kết thúc?',
      options: [
        { en: 'loop', vi: 'loop' },
        { en: 'repeat', vi: 'repeat' },
        { en: 'replay', vi: 'replay' },
        { en: 'cycle', vi: 'cycle' }
      ],
      ans: 0,
      expEn: 'The loop attribute seamlessly restarts media playback upon reaching the end.',
      expVi: 'Thuộc tính loop tự động phát lại bài hát/video mượt mà khi phát hết.'
    },
    {
      id: 'html_q_12_10',
      type: 'single_choice',
      qEn: 'What is the correct MIME type attribute for an MP4 video file inside <source>?',
      qVi: 'MIME type chuẩn cho tệp video MP4 bên trong thẻ <source> là gì?',
      options: [
        { en: 'type="video/mp4"', vi: 'type="video/mp4"' },
        { en: 'type="video/mpeg4"', vi: 'type="video/mpeg4"' },
        { en: 'type="media/mp4"', vi: 'type="media/mp4"' },
        { en: 'type="stream/mp4"', vi: 'type="stream/mp4"' }
      ],
      ans: 0,
      expEn: 'video/mp4 is the IANA standard MIME type for MP4 containers.',
      expVi: 'video/mp4 là loại MIME tiêu chuẩn IANA cho định dạng MP4.'
    },
    {
      id: 'html_q_12_11',
      type: 'single_choice',
      qEn: 'What does the "default" attribute on a <track> element do?',
      qVi: 'Thuộc tính "default" trên thẻ <track> có ý nghĩa gì?',
      options: [
        { en: 'Enables that specific subtitle/caption track automatically on playback unless the user chooses another one', vi: 'Tự động kích hoạt luồng phụ đề/chú thích đó khi bắt đầu phát trừ khi người dùng chọn thứ tiếng khác' },
        { en: 'Locks the track so it cannot be toggled off', vi: 'Khóa track phụ đề không cho tắt' },
        { en: 'Translates the subtitles into binary code', vi: 'Dịch phụ đề thành mã nhị phân' },
        { en: 'Renders the subtitles in comic sans font', vi: 'Hiển thị phụ đề bằng phông chữ Comic Sans' }
      ],
      ans: 0,
      expEn: 'default enables that track by default unless user preferences dictate otherwise.',
      expVi: 'default bật track phụ đề đó theo mặc định khi xem.'
    },
    {
      id: 'html_q_12_12',
      type: 'single_choice',
      qEn: 'Why is WebM video format widely favored for modern web streaming alongside MP4?',
      qVi: 'Tại sao định dạng WebM lại được ưa chuộng cho truyền phát web hiện đại bên cạnh MP4?',
      options: [
        { en: 'WebM is an open, royalty-free container offering superior VP9/AV1 video compression and smaller bandwidth consumption', vi: 'WebM là định dạng mở, miễn phí bản quyền với thuật toán nén VP9/AV1 tiên tiến giúp giảm dung lượng băng thông' },
        { en: 'WebM only works on Windows 95', vi: 'WebM chỉ chạy trên Windows 95' },
        { en: 'WebM does not require electricity', vi: 'WebM không cần dùng điện' },
        { en: 'WebM is created by Apple', vi: 'WebM do Apple tạo ra' }
      ],
      ans: 0,
      expEn: 'WebM provides royalty-free next-generation compression optimized for HTML5 streaming.',
      expVi: 'WebM cung cấp giải pháp nén hiện đại không bản quyền tối ưu cho phát trực tuyến trên web.'
    },
    {
      id: 'html_q_12_13',
      type: 'single_choice',
      qEn: 'What happens if a user visits a webpage containing an HTML5 <video> with no supported codec in their browser?',
      qVi: 'Điều gì xảy ra nếu người dùng truy cập trang có <video> nhưng trình duyệt không hỗ trợ bất kỳ codec nào có sẵn?',
      options: [
        { en: 'The browser displays the fallback HTML markup placed between the opening <video> and closing </video> tags', vi: 'Trình duyệt sẽ hiển thị nội dung HTML dự phòng đặt giữa 2 thẻ mở <video> và đóng </video>' },
        { en: 'The browser screen goes completely black', vi: 'Màn hình trình duyệt chuyển sang màu đen' },
        { en: 'The browser downloads Chrome automatically', vi: 'Trình duyệt tự tải Google Chrome về máy' },
        { en: 'The computer sound card beeps 3 times', vi: 'Card âm thanh kêu bíp 3 lần' }
      ],
      ans: 0,
      expEn: 'Fallback content inside <video> is rendered if none of the sources can be played.',
      expVi: 'Nội dung dự phòng bên trong thẻ <video> sẽ hiển thị nếu không có source nào phát được.'
    },
    {
      id: 'html_q_12_14',
      type: 'single_choice',
      qEn: 'Which attribute on <track> declares the two-letter language code of the subtitle file (e.g., "en", "vi")?',
      qVi: 'Thuộc tính nào trên thẻ <track> khai báo mã ngôn ngữ hai chữ cái của tệp phụ đề (như "en", "vi")?',
      options: [
        { en: 'srclang', vi: 'srclang' },
        { en: 'langcode', vi: 'langcode' },
        { en: 'tracklang', vi: 'tracklang' },
        { en: 'locale', vi: 'locale' }
      ],
      ans: 0,
      expEn: 'srclang specifies the language of the timed text data.',
      expVi: 'srclang xác định mã ngôn ngữ của dữ liệu phụ đề.'
    },
    {
      id: 'html_q_12_15',
      type: 'single_choice',
      qEn: 'Can JavaScript dynamically control video playback speed (e.g., 1.5x, 2.0x)?',
      qVi: 'JavaScript có thể điều khiển tốc độ phát video linh hoạt (như 1.5x, 2.0x) được không?',
      options: [
        { en: 'Yes, via the videoElement.playbackRate property (e.g. video.playbackRate = 1.5;)', vi: 'Có, thông qua thuộc tính videoElement.playbackRate (như video.playbackRate = 1.5;)' },
        { en: 'No, playback speed is fixed at 1.0x forever', vi: 'Không, tốc độ phát luôn cố định ở 1.0x' },
        { en: 'Only if using an external flash player', vi: 'Chỉ khi dùng flash player bên ngoài' },
        { en: 'Only on desktop computers', vi: 'Chỉ trên máy tính bàn' }
      ],
      ans: 0,
      expEn: 'HTMLMediaElement.playbackRate controls the rate at which media is played.',
      expVi: 'HTMLMediaElement.playbackRate điều chỉnh tốc độ phát âm thanh và hình ảnh.'
    },
    {
      id: 'html_q_12_16',
      type: 'single_choice',
      qEn: 'What does the "crossorigin" attribute do on a <video> or <track> element?',
      qVi: 'Thuộc tính "crossorigin" có chức năng gì trên thẻ <video> hoặc <track>?',
      options: [
        { en: 'Configures Cross-Origin Resource Sharing (CORS) credentials when fetching media or subtitle files hosted on a different domain/CDN', vi: 'Cấu hình quyền CORS khi tải tệp media hoặc phụ đề lưu trữ trên một tên miền/CDN khác' },
        { en: 'Encrypts the video with DRM', vi: 'Mã hóa video bằng DRM' },
        { en: 'Splits the video into 4 quadrants', vi: 'Chia video thành 4 phần' },
        { en: 'Uploads the video to Google Drive', vi: 'Tải video lên Google Drive' }
      ],
      ans: 0,
      expEn: 'crossorigin is required when loading cross-origin WebVTT tracks to avoid CORS security blocks.',
      expVi: 'crossorigin là bắt buộc khi tải tệp phụ đề WebVTT từ domain khác để tránh bị chặn CORS.'
    }
  ]
};

console.log('Lesson 12 defined.');
