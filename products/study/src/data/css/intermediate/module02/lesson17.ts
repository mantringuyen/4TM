import { Lesson } from '../../../../types';

export const lesson17: Lesson = {
  "id": "css_lesson_17",
  "moduleId": "css_mod_4",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 17,
  "topicId": "css_transforms",
  "title": {
    "en": "2D and 3D Transforms & Perspective",
    "vi": "Biến Đổi Không Gian 2D, 3D & Hiệu Ứng Phối Cảnh Perspective"
  },
  "summary": {
    "en": "Master translate(), rotate(), scale(), skew(), individual transform properties, transform-origin, perspective, and 3D card flips.",
    "vi": "Làm chủ translate(), rotate(), scale(), skew(), các thuộc tính transform độc lập mới, transform-origin, perspective và hiệu ứng lật thẻ 3D."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS Transforms allow elements to be translated, rotated, scaled, and skewed in 2D and 3D coordinate space without disturbing surrounding document flow. Executed entirely on the GPU, transforms deliver unmatched rendering performance.",
      "vi": "CSS Transforms cho phép dịch chuyển, xoay, phóng to thu nhỏ và kéo nghiêng phần tử trong không gian 2D và 3D mà không làm xáo trộn luồng bố cục xung quanh. Được thực thi trực tiếp trên GPU, transform mang lại hiệu năng render tối đa."
    },
    "conceptExplanation": {
      "en": "The `transform` property supports functions like `translate(x, y)`, `translateX()`, `translateY()`, `scale(factor)`, `rotate(deg)`, and `skew(deg)`. Modern CSS also supports **Individual Transform Properties** (`translate: 10px 20px;`, `rotate: 45deg;`, `scale: 1.1;`) preventing property collisions during animations. In 3D space, `perspective` defines the distance between the viewer and the z-plane, `transform-style: preserve-3d` allows child 3D elements to retain their depth, and `backface-visibility: hidden` hides the rear face of rotating cards.",
      "vi": "Thuộc tính `transform` hỗ trợ các hàm `translate(x, y)`, `translateX()`, `translateY()`, `scale(hệ-số)`, `rotate(độ)`, và `skew(độ)`. CSS hiện đại bổ sung các **Thuộc Tính Transform Độc Lập** (`translate: 10px 20px;`, `rotate: 45deg;`, `scale: 1.1;`) giúp việc tạo animation không bị ghi đè lẫn nhau. Trong không gian 3D, `perspective` xác định khoảng cách phối cảnh mắt nhìn, `transform-style: preserve-3d` giữ nguyên không gian chiều sâu cho các thẻ con, và `backface-visibility: hidden` ẩn mặt sau khi lật thẻ."
    },
    "syntax": "/* Modern Independent Transform Properties */\n.interactive-icon {\n  scale: 1;\n  rotate: 0deg;\n  transition: scale 200ms ease, rotate 200ms ease;\n}\n\n.interactive-icon:hover {\n  scale: 1.15;\n  rotate: 15deg;\n}\n\n/* 3D Perspective Card Container */\n.perspective-scene {\n  perspective: 1000px;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "3D Flipping Business Card",
          "vi": "Hiệu Ứng Lật Danh Thiếp 3D Đỉnh Cao"
        },
        "description": {
          "en": "Flips card 180 degrees around Y-axis revealing the backside.",
          "vi": "Lật thẻ 180 độ quanh trục Y để lộ mặt sau danh thiếp sống động."
        },
        "code": ".flip-card {\n  perspective: 1000px;\n}\n\n.flip-inner {\n  transform-style: preserve-3d;\n  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.flip-card:hover .flip-inner {\n  transform: rotateY(180deg);\n}\n\n.flip-front,\n.flip-back {\n  backface-visibility: hidden;\n}\n\n.flip-back {\n  transform: rotateY(180deg);\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Overwriting earlier transform functions when applying hover effects (e.g. hover setting rotate(15deg) accidentally wiping out an existing translateY(-50%)).",
          "vi": "Ghi đè mất các hàm transform trước đó khi hover (ví dụ đặt rotate(15deg) làm mất luôn translateY(-50%) căn giữa)."
        },
        "correction": {
          "en": "Use modern independent transform properties (translate, rotate, scale) or re-declare the full transform chain.",
          "vi": "Dùng các thuộc tính transform độc lập mới (translate, rotate, scale) hoặc viết lại đầy đủ chuỗi hàm."
        }
      }
    ],
    "tips": [
      {
        "en": "Use transform-origin to change the pivot point of rotations and scales (e.g. transform-origin: top left).",
        "vi": "Dùng transform-origin để đổi tâm điểm xoay hoặc phóng to của phần tử (ví dụ transform-origin: top left)."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_17_1",
      "type": "complete_code",
      "title": {
        "en": "Apply 2D Translate and Scale",
        "vi": "Áp Dụng Dịch Chuyển Translate và Phóng To Scale"
      },
      "instruction": {
        "en": "Add transform: translateY(-8px) scale(1.02) to .card-lift:hover.",
        "vi": "Thêm transform: translateY(-8px) scale(1.02) cho .card-lift:hover."
      },
      "starterCode": ".card-lift:hover {\n  /* Apply transform */\n}",
      "solutionCode": ".card-lift:hover {\n  transform: translateY(-8px) scale(1.02);\n}",
      "hint": {
        "en": "Use transform: translateY(-8px) scale(1.02);",
        "vi": "Dùng transform: translateY(-8px) scale(1.02);"
      },
      "explanation": {
        "en": "Combining translate and scale creates an elevated floating card effect.",
        "vi": "Kết hợp translate và scale tạo hiệu ứng thẻ nổi bồng bềnh lên không trung."
      }
    },
    {
      "id": "css_ex_17_2",
      "type": "fix_code",
      "title": {
        "en": "Enable 3D Perspective Preservation",
        "vi": "Kích Hoạt Bảo Lưu Không Gian 3D"
      },
      "instruction": {
        "en": "Add transform-style: preserve-3d to .flip-card-inner.",
        "vi": "Thêm transform-style: preserve-3d vào .flip-card-inner."
      },
      "starterCode": ".flip-card-inner {\n  transition: transform 500ms;\n}",
      "solutionCode": ".flip-card-inner {\n  transform-style: preserve-3d;\n  transition: transform 500ms;\n}",
      "hint": {
        "en": "Add transform-style: preserve-3d;",
        "vi": "Thêm transform-style: preserve-3d;"
      },
      "explanation": {
        "en": "preserve-3d ensures nested children exist in 3D coordinate space.",
        "vi": "preserve-3d đảm bảo các phần tử con được duy trì trong không gian tọa độ 3D thực."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_17",
    "title": {
      "en": "Build a 3D Tilt Badge Component",
      "vi": "Xây Dựng Huy Hiệu Nghiêng 3D Perspective"
    },
    "description": {
      "en": "Style .badge-stage with perspective: 800px. Style .badge-3d with transform: rotateX(10deg) rotateY(-15deg), transform-origin: center, and transition: transform 300ms ease. On .badge-3d:hover, set transform: rotateX(0deg) rotateY(0deg) scale(1.1).",
      "vi": "Tạo kiểu cho .badge-stage với perspective: 800px. Tạo kiểu cho .badge-3d với transform: rotateX(10deg) rotateY(-15deg), transform-origin: center và transition: transform 300ms ease. Khi :hover, set transform: rotateX(0deg) rotateY(0deg) scale(1.1)."
    },
    "requirements": [
      {
        "en": "perspective: 800px",
        "vi": "perspective: 800px"
      },
      {
        "en": "rotateX(10deg) rotateY(-15deg)",
        "vi": "rotateX(10deg) rotateY(-15deg)"
      },
      {
        "en": "transform-origin: center",
        "vi": "transform-origin: center"
      },
      {
        "en": "rotateX(0deg) rotateY(0deg) scale(1.1)",
        "vi": "rotateX(0deg) rotateY(0deg) scale(1.1)"
      }
    ],
    "starterCode": ".badge-stage {\n}\n\n.badge-3d {\n}\n\n.badge-3d:hover {\n}",
    "solutionCode": ".badge-stage {\n  perspective: 800px;\n}\n\n.badge-3d {\n  transform: rotateX(10deg) rotateY(-15deg);\n  transform-origin: center;\n  transition: transform 300ms ease;\n}\n\n.badge-3d:hover {\n  transform: rotateX(0deg) rotateY(0deg) scale(1.1);\n}",
    "hints": [
      {
        "en": "Set perspective on the container and 3D rotate transforms on the child badge.",
        "vi": "Đặt perspective trên khung cha và transform rotate 3D trên huy hiệu con."
      }
    ],
    "solutionExplanation": {
      "en": "Perspective provides real visual depth that reacts dynamically to hover interactions.",
      "vi": "Perspective tạo chiều sâu thực tế sống động khi tương tác rê chuột."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_17_1",
      "type": "single_choice",
      "question": {
        "en": "How does applying `transform: translate(20px, 30px);` affect surrounding document flow?",
        "vi": "Việc áp dụng `transform: translate(20px, 30px);` ảnh hưởng như thế nào đến luồng bố cục của các phần tử xung quanh?"
      },
      "options": [
        {
          "en": "It does NOT affect surrounding flow; adjacent elements remain in their original positions",
          "vi": "Nó HOÀN TOÀN KHÔNG làm xáo trộn luồng bố cục; các phần tử xung quanh vẫn đứng nguyên vị trí ban đầu"
        },
        {
          "en": "It pushes all neighboring elements down by 30px",
          "vi": "Nó đẩy tất cả phần tử bên cạnh dịch xuống 30px"
        },
        {
          "en": "It removes the element from the DOM",
          "vi": "Nó xóa phần tử khỏi cây DOM"
        },
        {
          "en": "It causes an immediate reflow repaint",
          "vi": "Nó gây ra tính toán lại bố cục toàn trang"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CSS Transforms alter visual presentation purely on the compositor without impacting surrounding layout geometry.",
        "vi": "CSS Transform chỉ thay đổi vị trí thị giác trên GPU mà không làm dịch chuyển các phần tử xung quanh."
      },
      "topicId": "css_transforms",
      "difficulty": "easy"
    },
    {
      "id": "css_q_17_2",
      "type": "single_choice",
      "question": {
        "en": "What does the `perspective` property define in 3D CSS?",
        "vi": "Thuộc tính `perspective` xác định điều gì trong không gian 3D CSS?"
      },
      "options": [
        {
          "en": "The distance between the viewer's eye and the z=0 plane, governing the intensity of 3D depth perception",
          "vi": "Khoảng cách từ mắt người xem tới mặt phẳng z=0, quyết định độ sâu chân thực của hiệu ứng 3D"
        },
        {
          "en": "The transparency level of 3D objects",
          "vi": "Độ trong suốt của vật thể 3D"
        },
        {
          "en": "The color of the 3D lighting shadow",
          "vi": "Màu của ánh sáng bóng đổ 3D"
        },
        {
          "en": "The animation speed of 3D objects",
          "vi": "Tốc độ xoay của vật thể 3D"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Lower perspective values (e.g. 400px) create dramatic, extreme 3D foreshortening; higher values (e.g. 1200px) create subtle, gentle depth.",
        "vi": "Giá trị perspective càng nhỏ (như 400px) thì hiệu ứng 3D càng gắt; giá trị lớn (như 1200px) tạo chiều sâu nhẹ nhàng tự nhiên."
      },
      "topicId": "css_transforms",
      "difficulty": "medium"
    },
    {
      "id": "css_q_17_3",
      "type": "single_choice",
      "question": {
        "en": "What does `backface-visibility: hidden;` accomplish in 3D card flips?",
        "vi": "`backface-visibility: hidden;` có tác dụng gì trong hiệu ứng lật thẻ 3D?"
      },
      "options": [
        {
          "en": "Hides the element when it is rotated to face away from the user",
          "vi": "Ẩn phần tử đi khi nó bị xoay quay lưng lại với mắt người xem"
        },
        {
          "en": "Removes the background image",
          "vi": "Xóa hình nền"
        },
        {
          "en": "Hides the card border",
          "vi": "Ẩn viền của thẻ"
        },
        {
          "en": "Disables mouse clicking on the back",
          "vi": "Tắt click chuột ở mặt sau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "When backface-visibility is hidden, the rear side of the layer is transparent when rotated 180 degrees.",
        "vi": "Khi đặt backface-visibility: hidden, mặt sau của thẻ sẽ trong suốt tàng hình khi bị xoay 180 độ."
      },
      "topicId": "css_transforms",
      "difficulty": "easy"
    },
    {
      "id": "css_q_17_4",
      "type": "true_false",
      "question": {
        "en": "True or False: Modern CSS allows declaring `rotate: 45deg;` directly as an independent property without using the `transform` shorthand.",
        "vi": "Đúng hay Sai: CSS hiện đại cho phép khai báo trực tiếp `rotate: 45deg;` như một thuộc tính độc lập mà không cần qua cú pháp `transform: rotate(45deg)`."
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
        "en": "Modern browsers natively support independent `translate`, `rotate`, and `scale` properties.",
        "vi": "Các trình duyệt hiện đại hỗ trợ đầy đủ các thuộc tính độc lập `translate`, `rotate` và `scale`."
      },
      "topicId": "css_transforms",
      "difficulty": "easy"
    },
    {
      "id": "css_q_17_5",
      "type": "single_choice",
      "question": {
        "en": "What is the default value of `transform-origin` on all HTML elements?",
        "vi": "Giá trị mặc định của `transform-origin` trên tất cả các phần tử HTML là gì?"
      },
      "options": [
        {
          "en": "50% 50% (or `center center`)",
          "vi": "50% 50% (hoặc `center center` - chính giữa tâm phần tử)"
        },
        {
          "en": "0 0 (top-left corner)",
          "vi": "0 0 (góc trên bên trái)"
        },
        {
          "en": "100% 100% (bottom-right corner)",
          "vi": "100% 100% (góc dưới bên phải)"
        },
        {
          "en": "0 50%",
          "vi": "0 50%"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "By default, elements rotate and scale from their exact geometric center (50% 50% 0).",
        "vi": "Mặc định mọi phần tử xoay và phóng to từ chính giữa tâm hình học của nó (50% 50% 0)."
      },
      "topicId": "css_transforms",
      "difficulty": "easy"
    },
    {
      "id": "css_q_17_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To preserve 3D perspective depth across nested children inside a rotated parent, declare transform-style: preserve-________",
        "vi": "Điền vào chỗ trống: Để bảo lưu không gian 3D cho các thẻ con bên trong thẻ cha bị xoay, khai báo transform-style: preserve-________"
      },
      "fillBlankAnswers": [
        "3d",
        "3D"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "transform-style: preserve-3d retains child 3D planes.",
        "vi": "transform-style: preserve-3d duy trì không gian 3 chiều cho các thẻ con."
      },
      "topicId": "css_transforms",
      "difficulty": "medium"
    },
    {
      "id": "css_q_17_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which functions are valid 2D/3D transform functions in CSS? (Select all that apply)",
        "vi": "Những hàm nào sau đây là hàm transform 2D/3D hợp lệ trong CSS? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "translate3d(x, y, z)",
          "vi": "translate3d(x, y, z)"
        },
        {
          "en": "rotateY(angle)",
          "vi": "rotateY(angle)"
        },
        {
          "en": "scale(x, y)",
          "vi": "scale(x, y)"
        },
        {
          "en": "morph(shape)",
          "vi": "morph(shape)"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "translate3d, rotateY, and scale are standard transform functions. morph() is not a CSS transform function.",
        "vi": "translate3d, rotateY và scale là hàm transform chuẩn. morph() không tồn tại trong CSS transform."
      },
      "topicId": "css_transforms",
      "difficulty": "easy"
    },
    {
      "id": "css_q_17_8",
      "type": "single_choice",
      "question": {
        "en": "How do you horizontally and vertically center an absolutely positioned element with unknown dimensions using transforms?",
        "vi": "Làm thế nào để căn giữa tuyệt đối một phần tử absolute có kích thước chưa biết trước bằng transform?"
      },
      "options": [
        {
          "en": "top: 50%; left: 50%; transform: translate(-50%, -50%);",
          "vi": "top: 50%; left: 50%; transform: translate(-50%, -50%);"
        },
        {
          "en": "margin: auto 50%;",
          "vi": "margin: auto 50%;"
        },
        {
          "en": "center: true; transform: center();",
          "vi": "center: true; transform: center();"
        },
        {
          "en": "top: calc(50% - 100px);",
          "vi": "top: calc(50% - 100px);"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "top/left: 50% positions the top-left corner at the center; `translate(-50%, -50%)` shifts the element back by half its own width and height.",
        "vi": "top/left: 50% đưa góc trên-trái vào giữa; `translate(-50%, -50%)` kéo ngược lại 50% kích thước của chính phần tử để tâm trùng khớp."
      },
      "topicId": "css_transforms",
      "difficulty": "medium"
    },
    {
      "id": "css_q_17_9",
      "type": "true_false",
      "question": {
        "en": "True or False: Any element with a CSS `transform` applied creates a new containing block for absolutely positioned descendants and a new Stacking Context.",
        "vi": "Đúng hay Sai: Bất kỳ phần tử nào có áp dụng `transform` đều tự động trở thành một containing block mới cho các con absolute và tạo một Stacking Context mới."
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
        "en": "According to CSS specs, any transform other than `none` establishes a new local coordinate system, containing block, and stacking context.",
        "vi": "Theo đặc tả CSS, mọi giá trị transform khác `none` đều tạo ra hệ tọa độ mới, containing block mới và stacking context mới."
      },
      "topicId": "css_transforms",
      "difficulty": "hard"
    },
    {
      "id": "css_q_17_10",
      "type": "single_choice",
      "question": {
        "en": "What does `transform: skewX(15deg);` do to an element?",
        "vi": "`transform: skewX(15deg);` tác động như thế nào lên phần tử?"
      },
      "options": [
        {
          "en": "Distorts the element along the X-axis by shearing it by 15 degrees",
          "vi": "Kéo xiên/nghiêng méo phần tử dọc theo trục X một góc 15 độ (tạo hình bình hành)"
        },
        {
          "en": "Rotates the element 15 degrees clockwise",
          "vi": "Xoay phần tử 15 độ theo chiều kim đồng hồ"
        },
        {
          "en": "Scales the element width by 15%",
          "vi": "Tăng chiều rộng 15%"
        },
        {
          "en": "Adds a 15px border radius",
          "vi": "Bo góc 15px"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`skewX` slants the vertical edges of an element along the horizontal axis.",
        "vi": "`skewX` kéo nghiêng các cạnh thẳng đứng dọc theo trục hoành tạo hiệu ứng chữ hoặc khung nghiêng phong cách thể thao."
      },
      "topicId": "css_transforms",
      "difficulty": "easy"
    }
  ]
};
