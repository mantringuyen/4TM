import { Lesson } from '../../../../types';

export const lesson06: Lesson = {
  "id": "css_lesson_6",
  "moduleId": "css_mod_2",
  "levelId": "basic",
  "courseId": "css",
  "order": 6,
  "topicId": "css_colors",
  "title": {
    "en": "Colors, Backgrounds & Modern Color Spaces",
    "vi": "Màu Sắc, Hình Nền & Không Gian Màu Hiện Đại"
  },
  "summary": {
    "en": "Master HEX, RGB, HSL, modern OKLCH color spaces, linear/radial gradients, and background sizing modes.",
    "vi": "Làm chủ HEX, RGB, HSL, không gian màu hiện đại OKLCH, dải chuyển màu linear/radial gradients và các chế độ hình nền."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS supports traditional RGB/HEX/HSL color models and modern wide-gamut perceptually uniform color spaces like `oklch()`. Gradients and background layering provide rich visual depth.",
      "vi": "CSS hỗ trợ các hệ màu truyền thống RGB/HEX/HSL cùng không gian màu dải rộng đồng đều cảm nhận hiện đại như `oklch()`. Gradient và đa tầng hình nền mang lại chiều sâu giao diện sống động."
    },
    "conceptExplanation": {
      "en": "Hexadecimal (`#38bdf8`), RGB (`rgb(56 189 248 / 0.8)`), and HSL (`hsl(199 95% 74%)`) are standard color formats. Modern CSS Color 4 introduces `oklch(L C H / A)` (Lightness, Chroma, Hue, Alpha), which ensures consistent perceived brightness across hues without muddy gradient transitions. Background properties include `background-color`, `background-image: linear-gradient(135deg, ...)` or `radial-gradient()`, `background-size: cover | contain`, `background-position: center`, and `background-repeat: no-repeat`.",
      "vi": "Hệ Hex (`#38bdf8`), RGB (`rgb(56 189 248 / 0.8)`), và HSL (`hsl(199 95% 74%)`) là các định dạng phổ biến. Chuẩn CSS Color 4 mang tới `oklch(L C H / A)` (Độ sáng, Độ bão hòa Chroma, Tông màu Hue, Độ trong suốt), giúp độ sáng hiển thị đồng đều khi đổi màu và tạo gradient chuyển màu siêu mượt không bị xỉn. Các thuộc tính hình nền gồm `background-color`, `linear-gradient()`, `radial-gradient()`, `background-size: cover | contain`, và `background-position`."
    },
    "syntax": "/* Modern OKLCH color with alpha */\n.badge {\n  color: oklch(0.95 0.05 240);\n  background-color: oklch(0.35 0.15 240 / 0.8);\n}\n\n/* High-contrast gradient hero */\n.hero-banner {\n  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Layered Gradient with Full Cover Background Image",
          "vi": "Hình Nền Đa Tầng Kết Hợp Gradient Phủ và Cover"
        },
        "description": {
          "en": "Darkens a hero background image using a semi-transparent linear gradient overlay.",
          "vi": "Làm tối ảnh nền hero bằng lớp phủ linear gradient bán trong suốt để chữ luôn rõ nét."
        },
        "code": ".hero-card {\n  background-image:\n    linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)),\n    url('/assets/hero.webp');\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  color: #ffffff;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using background-image without providing a fallback background-color, causing unreadable text while images load.",
          "vi": "Dùng background-image mà không đặt màu nền dự phòng background-color, khiến chữ bị chìm khi ảnh đang tải."
        },
        "correction": {
          "en": "Always supply a solid background-color matching the dominant image tone beneath background-image.",
          "vi": "Luôn đặt một background-color cùng tông màu chủ đạo phía dưới background-image."
        }
      }
    ],
    "tips": [
      {
        "en": "Use oklch() for dynamic UI theming because changing the hue angle (H) preserves perceived brightness and accessibility contrast.",
        "vi": "Dùng oklch() khi làm hệ thống đổi màu giao diện vì khi xoay góc Hue, độ sáng và độ tương phản mắt nhìn luôn được giữ nguyên vẹn."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_6_1",
      "type": "complete_code",
      "title": {
        "en": "Create a 2-Stop Linear Gradient",
        "vi": "Tạo Dải Màu Linear Gradient 2 Điểm Dừng"
      },
      "instruction": {
        "en": "Apply a linear-gradient from #1e293b to #0f172a at a 135deg angle to .gradient-bg.",
        "vi": "Áp dụng linear-gradient từ #1e293b sang #0f172a với góc 135deg cho .gradient-bg."
      },
      "starterCode": ".gradient-bg {\n  /* Add background gradient */\n}",
      "solutionCode": ".gradient-bg {\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n}",
      "hint": {
        "en": "Use background: linear-gradient(135deg, #1e293b, #0f172a);",
        "vi": "Dùng background: linear-gradient(135deg, #1e293b, #0f172a);"
      },
      "explanation": {
        "en": "linear-gradient takes an angle and color stops to create smooth transitions.",
        "vi": "linear-gradient nhận góc xoay và các điểm dừng màu để tạo hiệu ứng chuyển sắc mềm mại."
      }
    },
    {
      "id": "css_ex_6_2",
      "type": "fix_code",
      "title": {
        "en": "Set Background Cover and Center",
        "vi": "Đặt Hình Nền Phủ Kín Cover và Căn Giữa"
      },
      "instruction": {
        "en": "Add background-size: cover, background-position: center, and background-repeat: no-repeat to .card-media.",
        "vi": "Thêm background-size: cover, background-position: center và background-repeat: no-repeat cho .card-media."
      },
      "starterCode": ".card-media {\n  background-image: url('photo.jpg');\n}",
      "solutionCode": ".card-media {\n  background-image: url('photo.jpg');\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}",
      "hint": {
        "en": "Add background-size: cover; background-position: center; background-repeat: no-repeat;",
        "vi": "Thêm background-size: cover; background-position: center; background-repeat: no-repeat;"
      },
      "explanation": {
        "en": "cover ensures the image fills the container completely without distortion.",
        "vi": "cover đảm bảo hình nền lấp đầy toàn bộ khung chứa mà không bị méo tỷ lệ."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_6",
    "title": {
      "en": "Build a Modern Frosted Card Backdrop",
      "vi": "Xây Dựng Khối Thẻ Nền Kính Hiện Đại"
    },
    "description": {
      "en": "Style .glass-banner with background: rgba(30, 41, 59, 0.8), border: 1px solid rgba(255, 255, 255, 0.1), color: #f8fafc, and padding: 24px.",
      "vi": "Tạo kiểu cho .glass-banner với background: rgba(30, 41, 59, 0.8), border: 1px solid rgba(255, 255, 255, 0.1), color: #f8fafc và padding: 24px."
    },
    "requirements": [
      {
        "en": "background: rgba(30, 41, 59, 0.8)",
        "vi": "background: rgba(30, 41, 59, 0.8)"
      },
      {
        "en": "border: 1px solid rgba(255, 255, 255, 0.1)",
        "vi": "border: 1px solid rgba(255, 255, 255, 0.1)"
      },
      {
        "en": "color: #f8fafc",
        "vi": "color: #f8fafc"
      },
      {
        "en": "padding: 24px",
        "vi": "padding: 24px"
      }
    ],
    "starterCode": ".glass-banner {\n  /* Add translucent color declarations */\n}",
    "solutionCode": ".glass-banner {\n  background: rgba(30, 41, 59, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: #f8fafc;\n  padding: 24px;\n}",
    "hints": [
      {
        "en": "Declare background, border, color, and padding using rgba colors.",
        "vi": "Khai báo background, border, color và padding sử dụng hệ màu rgba."
      }
    ],
    "solutionExplanation": {
      "en": "Alpha transparency in RGBA creates clean layered interfaces with strong accessibility contrast.",
      "vi": "Độ trong suốt Alpha trong RGBA tạo chiều sâu đa lớp sắc nét và giữ độ tương phản tiếp cận cao."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_6_1",
      "type": "single_choice",
      "question": {
        "en": "What do the parameters in `oklch(L C H)` represent?",
        "vi": "Các tham số trong `oklch(L C H)` đại diện cho những giá trị nào?"
      },
      "options": [
        {
          "en": "Lightness, Chroma, Hue",
          "vi": "Lightness (Độ sáng), Chroma (Độ bão hòa sắc độ), Hue (Tông màu)"
        },
        {
          "en": "Layer, Color, Height",
          "vi": "Layer, Color, Height"
        },
        {
          "en": "Level, Contrast, Highlight",
          "vi": "Level, Contrast, Highlight"
        },
        {
          "en": "Luminance, Cyan, Hex",
          "vi": "Luminance, Cyan, Hex"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "OKLCH uses Lightness (perceived brightness 0-1), Chroma (saturation/purity), and Hue (color wheel angle 0-360).",
        "vi": "OKLCH dùng Lightness (độ sáng mắt nhìn 0-1), Chroma (độ đậm sắc), và Hue (góc bánh xe màu 0-360)."
      },
      "topicId": "css_colors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_6_2",
      "type": "single_choice",
      "question": {
        "en": "What does `background-size: cover;` do to an image?",
        "vi": "`background-size: cover;` xử lý hình nền như thế nào?"
      },
      "options": [
        {
          "en": "Scales image proportionally to completely cover the container, cropping overflow if necessary",
          "vi": "Co giãn ảnh theo đúng tỷ lệ để phủ kín toàn bộ khung chứa, cắt bớt phần thừa nếu cần"
        },
        {
          "en": "Distorts image width and height to force exact fit",
          "vi": "Kéo méo tỷ lệ ảnh để ép vừa khít kích thước"
        },
        {
          "en": "Tiles the image repeatedly across the background",
          "vi": "Lặp lại ảnh nhiều lần tạo hoa văn nền"
        },
        {
          "en": "Shrinks the image so the entire picture is visible without cropping",
          "vi": "Thu nhỏ ảnh để hiển thị trọn vẹn toàn bộ bức ảnh không bị cắt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`cover` guarantees the entire container area is filled while preserving image aspect ratio.",
        "vi": "`cover` đảm bảo khung chứa luôn được lấp đầy 100% trong khi vẫn giữ nguyên tỷ lệ khung hình của ảnh."
      },
      "topicId": "css_colors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_6_3",
      "type": "single_choice",
      "question": {
        "en": "What is the keyword `currentcolor` in CSS?",
        "vi": "Từ khóa `currentcolor` trong CSS có ý nghĩa gì?"
      },
      "options": [
        {
          "en": "A variable that evaluates to the computed value of the element's current text `color` property",
          "vi": "Một biến mang giá trị được tính toán của thuộc tính `color` (màu chữ) hiện tại của phần tử"
        },
        {
          "en": "The browser default background color",
          "vi": "Màu nền mặc định của trình duyệt"
        },
        {
          "en": "A random color generated at runtime",
          "vi": "Màu ngẫu nhiên sinh ra khi chạy"
        },
        {
          "en": "A shortcut for pure white (#fff)",
          "vi": "Lối tắt cho màu trắng tinh (#fff)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`currentcolor` inherits and reuses the current `color` value (e.g. for borders or SVG icons).",
        "vi": "`currentcolor` kế thừa và tái sử dụng giá trị `color` hiện tại (ví dụ cho viền border hoặc icon SVG)."
      },
      "topicId": "css_colors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_6_4",
      "type": "true_false",
      "question": {
        "en": "True or False: CSS linear gradients are treated by the browser as images (`<image>`) rather than solid colors.",
        "vi": "Đúng hay Sai: CSS linear gradient được trình duyệt xem là một dạng hình ảnh (`<image>`) thay vì một màu đơn sắc thuần túy."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False",
          "vi": "Sai"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Gradients are data type <image> in CSS, so they are applied via `background-image` or `background`.",
        "vi": "Gradient thuộc kiểu dữ liệu <image> trong CSS, do đó được gán thông qua `background-image` hoặc `background`."
      },
      "topicId": "css_colors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_6_5",
      "type": "single_choice",
      "question": {
        "en": "What does the `color-mix()` function in modern CSS do?",
        "vi": "Hàm `color-mix()` trong CSS hiện đại dùng để làm gì?"
      },
      "options": [
        {
          "en": "Blends two colors together in a specified color space (e.g. in oklab, color1 70%, color2 30%)",
          "vi": "Trộn hai màu với nhau theo tỷ lệ trong một không gian màu xác định (ví dụ in oklab, color1 70%, color2 30%)"
        },
        {
          "en": "Changes screen brightness automatically",
          "vi": "Tự động đổi độ sáng màn hình"
        },
        {
          "en": "Converts text to an image",
          "vi": "Chuyển văn bản thành hình ảnh"
        },
        {
          "en": "Extracts colors from user camera",
          "vi": "Trích xuất màu từ camera người dùng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`color-mix(in oklab, var(--primary) 80%, black)` produces smooth tinting and shading directly in CSS.",
        "vi": "`color-mix(in oklab, var(--primary) 80%, black)` tạo ra các sắc độ màu sáng/tối linh hoạt trực tiếp bằng CSS."
      },
      "topicId": "css_colors",
      "difficulty": "hard"
    },
    {
      "id": "css_q_6_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The 8-digit HEX code #00000080 represents black with approximately 50% ________",
        "vi": "Điền vào chỗ trống: Mã HEX 8 ký tự #00000080 đại diện cho màu đen với khoảng 50% độ trong suốt (________)"
      },
      "fillBlankAnswers": [
        "opacity",
        "alpha"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The last two hex digits (80 = 128/255 ≈ 50%) control the alpha / opacity channel.",
        "vi": "Hai ký tự hex cuối cùng (80 = 128/255 ≈ 50%) điều khiển kênh alpha / độ trong suốt."
      },
      "topicId": "css_colors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_6_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which values are valid for the `background-repeat` property? (Select all that apply)",
        "vi": "Những giá trị nào sau đây là hợp lệ cho thuộc tính `background-repeat`? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "no-repeat",
          "vi": "no-repeat"
        },
        {
          "en": "repeat-x",
          "vi": "repeat-x"
        },
        {
          "en": "space",
          "vi": "space"
        },
        {
          "en": "expand",
          "vi": "expand"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "no-repeat, repeat-x, repeat-y, repeat, space, and round are valid values for background-repeat.",
        "vi": "no-repeat, repeat-x, repeat-y, repeat, space và round là các giá trị hợp lệ của background-repeat."
      },
      "topicId": "css_colors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_6_8",
      "type": "single_choice",
      "question": {
        "en": "How do you specify multiple layered backgrounds on a single element?",
        "vi": "Làm thế nào để áp dụng nhiều lớp hình nền chồng lên nhau trên cùng một phần tử?"
      },
      "options": [
        {
          "en": "Separate multiple background declarations with commas (first declared is top layer)",
          "vi": "Ngăn cách các lớp hình nền bằng dấu phẩy (lớp khai báo đầu tiên nằm trên cùng)"
        },
        {
          "en": "Write multiple background-image properties one after another",
          "vi": "Viết nhiều dòng thuộc tính background-image liên tiếp"
        },
        {
          "en": "Use background-layer: 1, 2, 3",
          "vi": "Dùng background-layer: 1, 2, 3"
        },
        {
          "en": "Layered backgrounds are not supported in CSS",
          "vi": "CSS không hỗ trợ nhiều lớp nền"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Comma-separated background values stack in z-order: the first layer sits on top, subsequent layers render underneath.",
        "vi": "Các giá trị nền cách nhau bởi dấu phẩy sẽ xếp lớp theo thứ tự: lớp viết trước nằm trên, lớp viết sau nằm dưới."
      },
      "topicId": "css_colors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_6_9",
      "type": "true_false",
      "question": {
        "en": "True or False: `background-attachment: fixed;` causes the background image to remain fixed relative to the viewport while content scrolls.",
        "vi": "Đúng hay Sai: `background-attachment: fixed;` làm hình nền đứng yên cố định theo màn hình khi nội dung cuộn (hiệu ứng parallax)."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False",
          "vi": "Sai"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "background-attachment: fixed locks the background position relative to the browser viewport.",
        "vi": "background-attachment: fixed khóa vị trí hình nền cố định theo khung nhìn màn hình trình duyệt."
      },
      "topicId": "css_colors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_6_10",
      "type": "single_choice",
      "question": {
        "en": "What advantage does `oklch()` have over `hsl()` when generating UI color palettes?",
        "vi": "Ưu điểm vượt trội của `oklch()` so với `hsl()` khi tạo bảng màu giao diện là gì?"
      },
      "options": [
        {
          "en": "Uniform perceptual lightness: yellow and blue at 70% lightness actually look equally bright to the human eye",
          "vi": "Độ sáng mắt nhìn đồng đều: màu vàng và xanh ở mức sáng 70% thực sự sáng tương đương nhau đối với mắt người"
        },
        {
          "en": "It reduces file download size by 90%",
          "vi": "Nó giảm 90% dung lượng tải file"
        },
        {
          "en": "It automatically creates HTML buttons",
          "vi": "Nó tự động tạo nút bấm HTML"
        },
        {
          "en": "It only uses 3 bytes of memory",
          "vi": "Nó chỉ tốn 3 byte bộ nhớ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "OKLCH is perceptually uniform, solving HSL's flaw where yellow appears dramatically brighter than blue at the same lightness value.",
        "vi": "OKLCH đồng đều về thị giác, khắc phục nhược điểm của HSL khi màu vàng bị quá chói còn màu xanh lại quá tối ở cùng giá trị lightness."
      },
      "topicId": "css_colors",
      "difficulty": "hard"
    }
  ]
};
