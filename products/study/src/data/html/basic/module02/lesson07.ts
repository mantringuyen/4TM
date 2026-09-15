import { Lesson } from '../../../../types';

export const lesson07: Lesson = {
  id: 'html_lesson_7',
  moduleId: 'html_mod_2',
  levelId: 'basic',
  courseId: 'html',
  order: 7,
  topicId: 'html_audio_video',
  title: {
    en: 'Audio, Video, Track, Captions & Native Media Controls',
    vi: 'Âm Thanh, Video, Track, Phụ Đề & Điều Khiển Đa Phương Tiện'
  },
  summary: {
    en: 'Master native multimedia playback: <audio> and <video> elements, multi-codec fallback with <source>, essential UX attributes (controls, autoplay, muted, playsinline, poster, preload), accessible captions and subtitles via WebVTT <track>, and modern browser autoplay compliance.',
    vi: 'Làm chủ phát đa phương tiện gốc: thẻ <audio> và <video>, cơ chế dự phòng đa định dạng codec với <source>, các thuộc tính UX thiết yếu (controls, autoplay, muted, playsinline, poster, preload), phụ đề trợ năng WebVTT qua thẻ <track> và tuân thủ chính sách tự động phát của trình duyệt.'
  },
  estimatedMinutes: 18,
  learn: {
    introduction: {
      en: 'HTML5 introduced native media capabilities that completely eliminated third-party browser plugins, delivering hardware-accelerated, power-efficient, and accessible multimedia playback directly in the browser engine.',
      vi: 'HTML5 mang đến các tính năng đa phương tiện gốc giúp loại bỏ hoàn toàn các plugin bên thứ 3 cồng kềnh, hỗ trợ tăng tốc phần cứng, tiết kiệm pin và đảm bảo khả năng tiếp cận vượt trội ngay trong trình duyệt.'
    },
    conceptExplanation: {
      en: '1. **Audio & Video Elements**:\n   - `<audio controls>` and `<video controls>` render native browser player interfaces.\n   - Always provide multiple `<source>` children (e.g. `type="video/mp4"`, `type="video/webm"`, `type="audio/mpeg"`, `type="audio/ogg"`) so browsers pick their preferred hardware codec.\n\n2. **Essential Video UX Attributes**:\n   - `poster="/cover.jpg"`: Displays a placeholder image while the video downloads or before play is pressed.\n   - `preload="metadata"`: Fetches only duration and dimensions to save bandwidth (options: `none`, `metadata`, `auto`).\n   - `playsinline`: Prevents mobile devices (especially iOS Safari) from forcing full-screen playback.\n\n3. **Modern Autoplay Policy**:\n   - Modern browsers block unmuted sound. For videos to autoplay reliably, you MUST combine `autoplay` with `muted` (and `playsinline` on mobile).\n\n4. **Accessibility (<track> & WebVTT)**:\n   - Provide timed text captions, subtitles, and audio descriptions using `<track kind="subtitles|captions" src="subs.vtt" srclang="en" label="English" default>`. WebVTT (.vtt) files provide timestamps and text chunks.',
      vi: '1. **Thẻ Audio & Video**:\n   - `<audio controls>` và `<video controls>` hiển thị giao diện phát đa phương tiện gốc của trình duyệt.\n   - Luôn cung cấp nhiều thẻ `<source>` con (vd: `video/mp4`, `video/webm`, `audio/mpeg`) để trình duyệt chọn codec phần cứng tối ưu nhất.\n\n2. **Các thuộc tính Video thiết yếu**:\n   - `poster="/cover.jpg"`: Hiển thị ảnh bìa trong khi chờ tải hoặc trước khi người dùng bấm phát.\n   - `preload="metadata"`: Chỉ tải thời lượng và kích thước để tiết kiệm băng thông (tùy chọn: `none`, `metadata`, `auto`).\n   - `playsinline`: Ngăn thiết bị di động (đặc biệt là iOS Safari) tự động phóng to toàn màn hình.\n\n3. **Chính sách tự động phát (Autoplay Policy)**:\n   - Trình duyệt hiện đại chặn âm thanh tự phát gây phiền toái. Để video tự chạy, BẮT BUỘC phải đi kèm `autoplay` với `muted` (và `playsinline` trên di động).\n\n4. **Trợ năng (<track> & WebVTT)**:\n   - Cung cấp phụ đề và mô tả âm thanh bằng thẻ `<track kind="subtitles|captions" src="subs.vtt" srclang="vi" label="Tiếng Việt" default>`. Tệp WebVTT (.vtt) chứa mốc thời gian và đoạn chữ hiển thị.'
    },
    syntax: `<video controls poster="/media/poster.jpg" preload="metadata" width="800" height="450">
  <source src="/media/keynote.webm" type="video/webm">
  <source src="/media/keynote.mp4" type="video/mp4">
  <track kind="captions" src="/media/captions-en.vtt" srclang="en" label="English Captions" default>
  <p>Your browser does not support HTML5 video. <a href="/media/keynote.mp4">Download MP4</a>.</p>
</video>`,
    examples: [
      {
        title: {
          en: 'Accessible Background Hero Video with Audio Alternative',
          vi: 'Video Nền Banner Tự Phát An Toàn Kèm Dự Phòng Âm Thanh'
        },
        code: `<div class="hero-video-container">
  <video autoplay muted loop playsinline width="1920" height="1080" poster="/media/city-still.jpg">
    <source src="/media/city-loop.mp4" type="video/mp4">
  </video>
</div>`,
        language: 'html',
        explanation: {
          en: 'Applies autoplay, muted, loop, and playsinline for a clean, non-intrusive background video that complies with browser autoplay policies.',
          vi: 'Áp dụng autoplay, muted, loop và playsinline cho video nền chạy êm ái, tuân thủ đúng chính sách của trình duyệt.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Adding autoplay without the muted attribute',
          vi: 'Thêm thuộc tính autoplay mà quên không có muted'
        },
        correction: {
          en: 'Browsers automatically block unmuted video playback on page load. Always include muted whenever autoplay is specified.',
          vi: 'Trình duyệt sẽ chặn phát video có tiếng khi vừa vào trang. Luôn thêm thuộc tính muted khi dùng autoplay.'
        },
        code: '<!-- Correct: <video autoplay muted playsinline> -->'
      },
      {
        mistake: {
          en: 'Omitting fallback text or download link inside <video> and <audio>',
          vi: 'Không viết nội dung dự phòng bên trong thẻ <video> và <audio>'
        },
        correction: {
          en: 'Place a fallback message with a direct download link inside the container for legacy or constrained environments.',
          vi: 'Đặt thông báo kèm liên kết tải tệp bên trong thẻ để hỗ trợ các trình duyệt cũ hoặc thiết bị hạn chế.'
        },
        code: '<!-- Correct: <video>...<p>Download <a href="video.mp4">video</a></p></video> -->'
      }
    ],
    tips: [
      {
        en: 'WebVTT files must be served with the HTTP header "Content-Type: text/vtt", otherwise browsers will reject the track subtitles.',
        vi: 'Tệp WebVTT phải được máy chủ trả về với header "Content-Type: text/vtt", nếu không trình duyệt sẽ từ chối tải phụ đề.'
      }
    ],
    practice: {
      task: {
        en: 'Implement an Accessible Native Video Player with Captions',
        vi: 'Triển Khai Trình Phát Video Gốc Có Phụ Đề Trợ Năng'
      },
      instruction: {
        en: 'Construct a <video> element with controls, width="640", height="360", poster="/thumb.jpg", two sources ("video.webm" type="video/webm" and "video.mp4" type="video/mp4"), and an English captions track from "captions.vtt" with default.',
        vi: 'Tạo thẻ <video> có controls, width="640", height="360", poster="/thumb.jpg", 2 nguồn ("video.webm" type="video/webm" và "video.mp4" type="video/mp4"), và 1 track phụ đề tiếng Anh từ "captions.vtt" có default.'
      },
      starterCode: '<!-- Build video with sources and track -->\n',
      solutionCode: `<video controls width="640" height="360" poster="/thumb.jpg">
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English" default>
</video>`,
      requiredPatterns: [
        '<video controls',
        'width="640"',
        'height="360"',
        'poster="/thumb.jpg"',
        '<source src="video.webm" type="video/webm">',
        '<source src="video.mp4" type="video/mp4">',
        '<track kind="captions" src="captions.vtt" srclang="en" label="English" default>',
        '</video>'
      ],
      hint: {
        en: 'Place both <source> tags and the <track> tag inside the <video> element.',
        vi: 'Đặt cả hai thẻ <source> và thẻ <track> bên trong phần tử <video>.'
      }
    },
    consolidationPractice: {
      task: {
        en: 'Build a Semantic Podcast Audio Player',
        vi: 'Xây Dựng Trình Phát Podcast Audio Ngữ Nghĩa'
      },
      instruction: {
        en: 'Create a semantic <figure> containing an <h2> title, an <audio controls preload="metadata"> with MP3 ("episode1.mp3" type="audio/mpeg") and OGG ("episode1.ogg" type="audio/ogg") sources, and a <figcaption> describing the podcast episode.',
        vi: 'Tạo thẻ <figure> chứa tiêu đề <h2>, thẻ <audio controls preload="metadata"> có nguồn MP3 và OGG, và <figcaption> mô tả tập podcast.'
      },
      starterCode: '<!-- Build audio figure -->\n',
      solutionCode: `<figure>
  <h2>Episode 42: Modern Web Architecture</h2>
  <audio controls preload="metadata">
    <source src="episode1.mp3" type="audio/mpeg">
    <source src="episode1.ogg" type="audio/ogg">
    <p>Your browser does not support audio playback.</p>
  </audio>
  <figcaption>Recorded live on August 30, 2026.</figcaption>
</figure>`,
      requiredPatterns: [
        '<figure>',
        '<audio controls preload="metadata">',
        '<source src="episode1.mp3" type="audio/mpeg">',
        '<source src="episode1.ogg" type="audio/ogg">',
        '<figcaption>',
        '</figure>'
      ],
      hint: {
        en: 'Wrap the audio element and figcaption inside a figure.',
        vi: 'Bọc thẻ audio và figcaption trong một thẻ figure.'
      }
    }
  },
  exercisePool: [
    {
      id: 'html_ex_12_1',
      type: 'complete_code',
      title: {
        en: 'Add Accessible Captions Track to Video',
        vi: 'Thêm Thẻ Phụ Đề Trợ Năng Cho Video'
      },
      instruction: {
        en: 'Add a <track> element with kind="subtitles", src="/subs/es.vtt", srclang="es", and label="Spanish" to the video element.',
        vi: 'Thêm thẻ <track> có kind="subtitles", src="/subs/es.vtt", srclang="es" và label="Spanish" vào thẻ video.'
      },
      starterCode: `<video controls width="640" height="360">
  <source src="/movie.mp4" type="video/mp4">
  <!-- Add track here -->
</video>`,
      solutionCode: `<video controls width="640" height="360">
  <source src="/movie.mp4" type="video/mp4">
  <track kind="subtitles" src="/subs/es.vtt" srclang="es" label="Spanish">
</video>`,
      hint: {
        en: 'Use <track kind="subtitles" src="/subs/es.vtt" srclang="es" label="Spanish">.',
        vi: 'Dùng cú pháp <track kind="subtitles" src="/subs/es.vtt" srclang="es" label="Spanish">.'
      },
      explanation: {
        en: 'The <track> element supplies synchronized text subtitles for accessibility and multilingual audiences.',
        vi: 'Thẻ <track> cung cấp phụ đề đồng bộ thời gian phục vụ trợ năng và người xem đa ngôn ngữ.'
      }
    },
    {
      id: 'html_ex_12_2',
      type: 'fix_code',
      title: {
        en: 'Fix Blocked Autoplay Video Configuration',
        vi: 'Sửa Lỗi Cấu Hình Video Tự Phát Bị Chặn'
      },
      instruction: {
        en: 'Fix the autoplay video so modern browsers permit it to run silently on load by adding muted and playsinline attributes.',
        vi: 'Sửa video autoplay để trình duyệt cho phép tự chạy bằng cách thêm thuộc tính muted và playsinline.'
      },
      starterCode: '<video autoplay loop width="800" height="450">\n  <source src="ambient.mp4" type="video/mp4">\n</video>',
      solutionCode: '<video autoplay muted playsinline loop width="800" height="450">\n  <source src="ambient.mp4" type="video/mp4">\n</video>',
      hint: {
        en: 'Include both muted and playsinline on the video tag.',
        vi: 'Thêm cả muted và playsinline vào thẻ video.'
      },
      explanation: {
        en: 'Browsers reject autoplay unless audio is muted.',
        vi: 'Trình duyệt sẽ từ chối autoplay trừ khi âm thanh được tắt bằng thuộc tính muted.'
      }
    },
    {
      id: 'html_ex_12_3',
      type: 'write_code',
      title: {
        en: 'Write Audio Element with Multi-Codec Sources',
        vi: 'Tạo Thẻ Audio Đa Định Dạng Nguồn'
      },
      instruction: {
        en: 'Write an <audio controls preload="none"> element with an MP3 source ("track.mp3" type="audio/mpeg") and an OGG source ("track.ogg" type="audio/ogg").',
        vi: 'Viết thẻ <audio controls preload="none"> gồm nguồn MP3 ("track.mp3" type="audio/mpeg") và nguồn OGG ("track.ogg" type="audio/ogg").'
      },
      starterCode: '<!-- Write audio player -->\n',
      solutionCode: `<audio controls preload="none">
  <source src="track.mp3" type="audio/mpeg">
  <source src="track.ogg" type="audio/ogg">
</audio>`,
      hint: {
        en: 'Use <audio controls preload="none"> with child <source> tags.',
        vi: 'Dùng <audio controls preload="none"> với các thẻ <source> con.'
      },
      explanation: {
        en: 'Multi-source declarations allow the browser to choose the first format it supports.',
        vi: 'Khai báo đa nguồn giúp trình duyệt tự chọn định dạng đầu tiên mà nó hỗ trợ.'
      }
    }
  ],
  challenge: {
    id: 'html_ch_12',
    title: {
      en: 'Enterprise Video Broadcasting Suite',
      vi: 'Hệ Thống Phát Video Trực Tuyến Chuẩn Doanh Nghiệp'
    },
    description: {
      en: 'Build a production-grade accessible video player component with multi-codec WebM/MP4 sources, dual-language subtitle tracks (English and Vietnamese), poster image placeholder, metadata preloading, and responsive intrinsic dimensions.',
      vi: 'Xây dựng thành phần trình phát video chuẩn sản xuất gồm đa nguồn WebM/MP4, phụ đề song ngữ (Anh và Việt), ảnh bìa poster, tối ưu preload metadata và kích thước đáp ứng.'
    },
    requirements: [
      {
        en: '<video controls poster="/media/poster.jpg" preload="metadata" width="1280" height="720">',
        vi: 'Thẻ <video controls poster="/media/poster.jpg" preload="metadata" width="1280" height="720">'
      },
      {
        en: 'WebM source with type="video/webm"',
        vi: 'Thẻ source WebM có type="video/webm"'
      },
      {
        en: 'MP4 source with type="video/mp4"',
        vi: 'Thẻ source MP4 có type="video/mp4"'
      },
      {
        en: 'English track with kind="captions" and default',
        vi: 'Thẻ track tiếng Anh kind="captions" có default'
      },
      {
        en: 'Vietnamese track with kind="subtitles" srclang="vi"',
        vi: 'Thẻ track tiếng Việt kind="subtitles" srclang="vi"'
      }
    ],
    starterCode: '<!-- Build enterprise video player -->\n',
    solutionCode: `<video controls poster="/media/poster.jpg" preload="metadata" width="1280" height="720">
  <source src="/media/conference.webm" type="video/webm">
  <source src="/media/conference.mp4" type="video/mp4">
  <track kind="captions" src="/media/caps-en.vtt" srclang="en" label="English (Auto)" default>
  <track kind="subtitles" src="/media/subs-vi.vtt" srclang="vi" label="Tiếng Việt">
  <p>Your browser does not support HTML5 video. Please <a href="/media/conference.mp4">download the recording</a>.</p>
</video>`,
    hints: [
      {
        en: 'Ensure both <source> tags appear first, followed by the two <track> elements inside <video>.',
        vi: 'Đảm bảo hai thẻ <source> xuất hiện trước, theo sau là hai thẻ <track> bên trong <video>.'
      }
    ],
    solutionExplanation: {
      en: 'Provides high-definition accessible streaming with international captioning support and resilient fallback.',
      vi: 'Cung cấp trải nghiệm xem video độ nét cao chuẩn trợ năng quốc tế và cơ chế dự phòng an toàn.'
    },
    variants: []
  },
  quizQuestionPool: [
    {
      id: 'html_q_12_1',
      type: 'single_choice',
      question: {
        en: 'Why do modern web browsers automatically block videos with the autoplay attribute?',
        vi: 'Tại sao các trình duyệt web hiện đại tự động chặn video có thuộc tính autoplay?'
      },
      options: [
        {
          en: 'To prevent unsolicited loud audio playback and preserve mobile bandwidth, unless the video is explicitly muted',
          vi: 'Để ngăn âm thanh phát bất ngờ gây khó chịu và tiết kiệm băng thông di động, trừ khi video được tắt tiếng bằng muted'
        },
        {
          en: 'Because HTML5 video is deprecated in favor of Flash',
          vi: 'Vì video HTML5 đã lỗi thời so với Flash'
        },
        {
          en: 'Because autoplay violates TLS security certificates',
          vi: 'Vì autoplay vi phạm chứng chỉ bảo mật TLS'
        },
        {
          en: 'Because JavaScript is required to play any video',
          vi: 'Vì bắt buộc phải có JavaScript mới phát được video'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Browser autoplay policies require user interaction or the muted attribute before allowing media to play automatically.',
        vi: 'Chính sách autoplay yêu cầu phải có tương tác của người dùng hoặc gắn thuộc tính muted thì video mới được tự chạy.'
      },
      topicId: 'html_audio_video',
      difficulty: 'easy'
    },
    {
      id: 'html_q_12_2',
      type: 'single_choice',
      question: {
        en: 'What standard file format is used by the <track> element to deliver closed captions and subtitles?',
        vi: 'Định dạng tệp tiêu chuẩn nào được thẻ <track> sử dụng để cung cấp phụ đề và chú thích?'
      },
      options: [
        {
          en: 'WebVTT (.vtt)',
          vi: 'WebVTT (.vtt)'
        },
        {
          en: 'SubRip (.srt)',
          vi: 'SubRip (.srt)'
        },
        {
          en: 'JSON (.json)',
          vi: 'JSON (.json)'
        },
        {
          en: 'XML (.xml)',
          vi: 'XML (.xml)'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'WebVTT (Web Video Text Tracks) is the W3C standard format for HTML5 media text tracks.',
        vi: 'WebVTT (Web Video Text Tracks) là định dạng chuẩn W3C dành cho các luồng văn bản phụ đề trong HTML5.'
      },
      topicId: 'html_audio_video',
      difficulty: 'easy'
    },
    {
      id: 'html_q_12_3',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the playsinline attribute on a <video> element?',
        vi: 'Mục đích của thuộc tính playsinline trên thẻ <video> là gì?'
      },
      options: [
        {
          en: 'Instructs mobile browsers (like Safari on iOS) to play the video inline within the web page rather than forcing native fullscreen playback',
          vi: 'Chỉ dẫn trình duyệt di động (như Safari iOS) phát video trực tiếp trong trang thay vì ép mở toàn màn hình'
        },
        {
          en: 'Plays the video in 4K resolution',
          vi: 'Phát video ở độ phân giải 4K'
        },
        {
          en: 'Loops the video indefinitely',
          vi: 'Lặp lại video vô hạn'
        },
        {
          en: 'Disables user pause controls',
          vi: 'Vô hiệu hóa nút tạm dừng của người dùng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'playsinline keeps the video embedded within document flow on mobile viewports.',
        vi: 'playsinline giữ video phát ngay trong dòng giao diện tài liệu trên các thiết bị di động.'
      },
      topicId: 'html_audio_video',
      difficulty: 'medium'
    },
    {
      id: 'html_q_12_4',
      type: 'single_choice',
      question: {
        en: 'What does preload="metadata" specify on an <audio> or <video> element?',
        vi: 'Giá trị preload="metadata" chỉ định điều gì trên thẻ <audio> hoặc <video>?'
      },
      options: [
        {
          en: 'Only loads metadata such as video duration, intrinsic dimensions, and track lists without buffering the full media stream',
          vi: 'Chỉ tải siêu dữ liệu như thời lượng, kích thước và danh sách track mà không tải toàn bộ luồng video/audio'
        },
        {
          en: 'Downloads the entire video file into browser cache immediately',
          vi: 'Tải ngay lập tức toàn bộ tệp video vào bộ nhớ đệm trình duyệt'
        },
        {
          en: 'Prevents the video from downloading anything at all',
          vi: 'Ngăn hoàn toàn việc tải dữ liệu'
        },
        {
          en: 'Loads all comments associated with the video',
          vi: 'Tải tất cả bình luận liên quan đến video'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'preload="metadata" balances quick UI responsiveness with optimal bandwidth savings.',
        vi: 'preload="metadata" giúp giao diện phản hồi nhanh thông tin bài hát/video mà vẫn tiết kiệm băng thông tối đa.'
      },
      topicId: 'html_audio_video',
      difficulty: 'medium'
    },
    {
      id: 'html_q_12_5',
      type: 'single_choice',
      question: {
        en: 'What is the function of the poster attribute on a <video> element?',
        vi: 'Chức năng của thuộc tính poster trên thẻ <video> là gì?'
      },
      options: [
        {
          en: 'Specifies an image URL to display as a cover frame while the video is downloading or until the user clicks play',
          vi: 'Chỉ định URL hình ảnh hiển thị làm ảnh bìa trong khi video đang tải hoặc trước khi người dùng bấm phát'
        },
        {
          en: 'Prints the video as a wall poster',
          vi: 'In video thành áp phích treo tường'
        },
        {
          en: 'Watermarks the company logo onto the video frames',
          vi: 'Đóng dấu logo chìm lên khung hình video'
        },
        {
          en: 'Sends analytics telemetry to the server',
          vi: 'Gửi dữ liệu thống kê lên máy chủ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The poster attribute provides a polished preview image before media playback begins.',
        vi: 'Thuộc tính poster cung cấp hình ảnh xem trước bắt mắt trước khi bắt đầu phát video.'
      },
      topicId: 'html_audio_video',
      difficulty: 'easy'
    },
    {
      id: 'html_q_12_6',
      type: 'single_choice',
      question: {
        en: 'Why is it best practice to provide multiple <source> elements inside <video>?',
        vi: 'Tại sao nên cung cấp nhiều thẻ <source> bên trong <video>?'
      },
      options: [
        {
          en: 'Different browsers and operating systems support different audio/video codecs (e.g. WebM VP9/AV1 vs MP4 H.264/H.265)',
          vi: 'Các trình duyệt và hệ điều hành khác nhau hỗ trợ các codec video khác nhau (vd: WebM VP9/AV1 so với MP4 H.264/H.265)'
        },
        {
          en: 'It merges all files into a 3D surround sound experience',
          vi: 'Nó trộn tất cả các tệp thành âm thanh vòm 3D'
        },
        {
          en: 'It prevents the video from ever buffering',
          vi: 'Nó ngăn không cho video bị giật'
        },
        {
          en: 'It is required to display the play/pause button',
          vi: 'Nó bắt buộc phải có để hiển thị nút phát/tạm dừng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Browsers iterate through <source> children top-to-bottom and play the first compatible codec format.',
        vi: 'Trình duyệt quét các thẻ <source> từ trên xuống dưới và phát định dạng đầu tiên tương thích với phần cứng.'
      },
      topicId: 'html_audio_video',
      difficulty: 'easy'
    },
    {
      id: 'html_q_12_7',
      type: 'single_choice',
      question: {
        en: 'Which kind attribute value for <track> is intended for hard-of-hearing users and includes audio sound effects descriptions?',
        vi: 'Giá trị kind nào của thẻ <track> dành cho người khiếm thính và bao gồm cả mô tả hiệu ứng âm thanh (tiếng động, nhạc)?'
      },
      options: [
        {
          en: 'captions',
          vi: 'captions'
        },
        {
          en: 'subtitles',
          vi: 'subtitles'
        },
        {
          en: 'chapters',
          vi: 'chapters'
        },
        {
          en: 'descriptions',
          vi: 'descriptions'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Captions transcribe dialogue PLUS sound effects ([applause], [thunder]) for deaf/hard-of-hearing users, whereas subtitles translate dialogue only.',
        vi: 'Captions ghi lại lời thoại KÈM THEO hiệu ứng âm thanh cho người khiếm thính, trong khi subtitles chỉ dịch lời thoại.'
      },
      topicId: 'html_audio_video',
      difficulty: 'medium'
    },
    {
      id: 'html_q_12_8',
      type: 'single_choice',
      question: {
        en: 'What occurs if you omit the controls attribute on a <video> element?',
        vi: 'Điều gì xảy ra nếu bạn không khai báo thuộc tính controls trên thẻ <video>?'
      },
      options: [
        {
          en: 'The browser does not display the native play, pause, volume, and timeline controls to the user',
          vi: 'Trình duyệt sẽ không hiển thị các nút điều khiển gốc như phát, tạm dừng, âm lượng và thanh thời gian'
        },
        {
          en: 'The video fails to load completely',
          vi: 'Video bị lỗi không thể tải'
        },
        {
          en: 'The video is deleted from the server',
          vi: 'Video bị xóa khỏi máy chủ'
        },
        {
          en: 'The video becomes a static GIF',
          vi: 'Video biến thành ảnh GIF tĩnh'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Without controls, users cannot interact with the video unless custom JavaScript controls are implemented.',
        vi: 'Nếu không có controls, người dùng không thể bấm phát/dừng trừ khi lập trình viên tự tạo nút điều khiển bằng JavaScript.'
      },
      topicId: 'html_audio_video',
      difficulty: 'easy'
    },
    {
      id: 'html_q_12_9',
      type: 'single_choice',
      question: {
        en: 'Which boolean attribute causes an audio or video track to restart from the beginning automatically upon finishing?',
        vi: 'Thuộc tính boolean nào khiến bài hát hoặc video tự động phát lại từ đầu khi kết thúc?'
      },
      options: [
        {
          en: 'loop',
          vi: 'loop'
        },
        {
          en: 'repeat',
          vi: 'repeat'
        },
        {
          en: 'restart',
          vi: 'restart'
        },
        {
          en: 'cycle',
          vi: 'cycle'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The loop attribute restarts playback continuously.',
        vi: 'Thuộc tính loop giúp phát lặp lại liên tục.'
      },
      topicId: 'html_audio_video',
      difficulty: 'easy'
    },
    {
      id: 'html_q_12_10',
      type: 'single_choice',
      question: {
        en: 'How should fallback content for legacy browsers be placed in a <video> element?',
        vi: 'Nội dung dự phòng cho trình duyệt cũ nên được đặt ở đâu trong thẻ <video>?'
      },
      options: [
        {
          en: 'As regular HTML markup placed after the last <source> and <track> elements, inside the <video> tag',
          vi: 'Dưới dạng mã HTML thông thường đặt sau thẻ <source> và <track> cuối cùng, nằm trong thẻ <video>'
        },
        {
          en: 'Inside a <noscript> tag outside the <body>',
          vi: 'Trong thẻ <noscript> ngoài <body>'
        },
        {
          en: 'In an HTTP response header',
          vi: 'Trong header phản hồi HTTP'
        },
        {
          en: 'Inside an alt attribute on the video tag',
          vi: 'Trong thuộc tính alt trên thẻ video'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Browsers that do not understand <video> ignore the tag and render its internal fallback HTML.',
        vi: 'Trình duyệt không hỗ trợ thẻ <video> sẽ bỏ qua thẻ và hiển thị phần mã HTML dự phòng bên trong.'
      },
      topicId: 'html_audio_video',
      difficulty: 'easy'
    }
  ]
};

export default lesson07;
