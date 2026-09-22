import { Book } from '../../types';

export const CSS_DEFINITIONS_BOOK: Book = {
  id: 'css-definitions',
  slug: 'css-definitions',
  title: 'CSS Definitions & Box Model Glossary',
  subtitle: {
    en: 'Cascade Layers, Specificity Vector, Block Formatting Contexts & Stacking Model Glossary',
    vi: 'Tầng Cascade (@layer), Vectơ Specificity, Block Formatting Context & Bối Cảnh Xếp Lớp',
  },
  bookType: 'Definitions',
  categoryId: 'css',
  subjectId: 'web',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-12',
  accentColor: 'from-sky-500 to-indigo-700',
  tags: ['Definitions', 'BFC', 'Stacking Context', 'Glossary', 'Cascade Layers', 'CSS3'],
  description: {
    en: 'Precision definitions and mental models for CSS core systems: Cascade Layers (@layer), 3-tuple Specificity vectors, Block Formatting Contexts (BFC), Stacking Contexts, and Margin Collapsing.',
    vi: 'Định nghĩa chuẩn xác và mô hình tư duy cho các hệ thống CSS cốt lõi: Tầng Cascade (@layer), Vectơ Specificity bộ 3 số, Bối cảnh định dạng khối (BFC), Bối cảnh xếp lớp Stacking Context và Hiện tượng gộp lề margin.',
  },
  prerequisites: {
    en: [
      'Basic familiarity with CSS selectors and property-value declarations',
    ],
    vi: [
      'Làm quen cơ bản với CSS selector và các khai báo thuộc tính-giá trị',
    ],
  },
  outcomes: {
    en: [
      'Calculate exact (A, B, C) specificity scores across complex modern selector chains',
      'Architect maintainable stylesheets with Cascade Layers (@layer) to eliminate !important specificity wars',
      'Trigger clean Block Formatting Contexts (BFC) and isolate Stacking Context hierarchies with zero visual side-effects',
    ],
    vi: [
      'Tính toán chính xác điểm specificity (A, B, C) trên các chuỗi selector hiện đại phức tạp',
      'Xây dựng kiến trúc CSS dễ bảo trì với Cascade Layers (@layer) nhằm loại bỏ cuộc chiến !important',
      'Kích hoạt BFC chuẩn mực và cô lập phân cấp Stacking Context mà không gây tác dụng phụ thị giác',
    ],
  },
  chapters: [
    {
      id: 'css-def-ch-1',
      number: 1,
      slug: 'formatting-contexts-bfc',
      title: {
        en: 'Cascade Mechanics, Specificity & Selectors',
        vi: 'Cơ Chế Cascade, Specificity & Selector',
      },
      summary: {
        en: 'Formal definitions for Specificity (A, B, C), Cascade Layers (@layer), and Pseudo-classes vs Pseudo-elements.',
        vi: 'Định nghĩa chuẩn cho Specificity (A, B, C), Tầng Cascade (@layer) và Pseudo-class vs Pseudo-element.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'css-def-1-1',
          title: {
            en: 'CSS Specificity Vector (A, B, C)',
            vi: 'Vectơ Độ Ưu Tiên Specificity (A, B, C)',
          },
          keyIdea: {
            en: 'Specificity is a 3-part weight vector (IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements) compared position-by-position from left to right; 1 ID always outweighs 1,000 classes.',
            vi: 'Specificity là vectơ trọng số 3 thành phần (ID, Class/Thuộc tính/Pseudo-class, Thẻ/Pseudo-element) được so sánh từng vị trí từ trái qua phải; 1 ID luôn luôn thắng 1.000 class.',
          },
          content: {
            en: 'CSS Specificity is the weight algorithm browsers use to determine which property value applies when multiple selector rules match an element. In modern CSS specifications, specificity is computed as a 3-tuple `(A, B, C)`: **A** is the number of ID selectors, **B** is the number of Class selectors, Attribute selectors (`[type="text"]`), and Pseudo-classes (`:hover`, `:first-child`), and **C** is the number of Type/Element selectors (`div`, `p`) and Pseudo-elements (`::before`, `::after`). Inline `style="..."` declarations override all selector tuples. Specificity is compared strictly left-to-right: a selector with `(1, 0, 0)` always beats `(0, 50, 50)`.',
            vi: 'Specificity trong CSS là thuật toán trọng số mà trình duyệt sử dụng để xác định giá trị thuộc tính nào được áp dụng khi nhiều quy tắc selector cùng khớp một phần tử. Trong các đặc tả CSS hiện đại, specificity được tính dưới dạng bộ 3 số `(A, B, C)`: **A** là số lượng ID selector, **B** là số lượng Class selector, Attribute selector (`[type="text"]`) và Pseudo-class (`:hover`, `:first-child`), còn **C** là số lượng Type/Element selector (`div`, `p`) và Pseudo-element (`::before`, `::after`). Thuộc tính viết trực tiếp `style="..."` có quyền ghi đè toàn bộ selector bên ngoài. So sánh specificity diễn ra nghiêm ngặt từ trái qua phải: một selector có điểm `(1, 0, 0)` luôn luôn chiến thắng `(0, 50, 50)`.',
          },
          definitionDetails: {
            term: {
              en: 'Specificity Vector (A, B, C)',
              vi: 'Vectơ Độ Ưu Tiên Specificity (A, B, C)',
            },
            formalDefinition: {
              en: 'A 3-tuple weight (A, B, C) calculated from the count of ID, class/attribute/pseudo-class, and element/pseudo-element components in a selector, compared lexicographically.',
              vi: 'Bộ 3 trọng số (A, B, C) tính từ số lượng ID, class/thuộc tính/pseudo-class và element/pseudo-element trong một selector, được so sánh theo thứ tự từ điển.',
            },
            mentalModel: {
              en: 'Think of Specificity as Gold (A), Silver (B), and Bronze (C) medals. One Gold medal (ID) beats any number of Silver medals (Classes).',
              vi: 'Hãy coi Specificity như huy chương Vàng (A), Bạc (B) và Đồng (C). Một huy chương Vàng (ID) luôn xếp trên bất kỳ số lượng huy chương Bạc nào (Classes).',
            },
            whyItMatters: {
              en: 'Understanding specificity prevents developers from reaching for `!important` as an anti-pattern escape hatch to fix styling conflicts.',
              vi: 'Hiểu rõ specificity giúp lập trình viên không phải lạm dụng cờ `!important` như một giải pháp chống chế khi gặp xung đột style.',
            },
            commonMisconception: {
              en: 'Believing 11 classes will "overflow" and beat 1 ID selector. Specificity values are compared by column position and never roll over mathematically.',
              vi: 'Nghĩ rằng 11 class cộng dồn lại sẽ "tràn" điểm và thắng 1 ID selector. Các cột điểm specificity được so sánh độc lập từng vị trí và không bao giờ cộng dồn sang cột bên cạnh.',
            },
            quickReference: {
              en: [
                'ID Selector (#nav) = (1, 0, 0)',
                'Class / Attribute / Pseudo-class (.btn, [type], :hover) = (0, 1, 0)',
                'Element / Pseudo-element (div, ::after) = (0, 0, 1)',
                ':where() = (0, 0, 0) (Always zero specificity)',
                ':is() = Specificity of its highest argument',
              ],
              vi: [
                'ID Selector (#nav) = (1, 0, 0)',
                'Class / Thuộc tính / Pseudo-class (.btn, [type], :hover) = (0, 1, 0)',
                'Thẻ / Pseudo-element (div, ::after) = (0, 0, 1)',
                ':where() = (0, 0, 0) (Luôn triệt tiêu về 0)',
                ':is() = Lấy điểm của selector con có specificity cao nhất',
              ],
            },
            minimalExample: {
              language: 'css',
              filename: 'specificity_comparison.css',
              explanation: {
                en: 'Illustrating specificity scoring between IDs, classes, and elements.',
                vi: 'Minh họa cách chấm điểm specificity giữa ID, class và thẻ.',
              },
              code: `/* Score: (1, 0, 0) - WINS */
#user-profile-avatar { width: 64px; }

/* Score: (0, 3, 1) - LOSES to the ID above */
aside.sidebar .card-avatar.primary-img { width: 48px; }

/* Score: (0, 0, 0) - Always zero specificity */
:where(header, footer) a { color: inherit; }`,
            },
          },
        },
        {
          id: 'html-def-1-2',
          title: {
            en: 'Cascade Layer (@layer)',
            vi: 'Tầng Xếp Chồng Trong CSS (@layer)',
          },
          keyIdea: {
            en: '@layer establishes an explicit priority hierarchy where rules in later layers override earlier layers regardless of internal selector specificity.',
            vi: '@layer thiết lập thứ bậc ưu tiên rõ ràng, nơi quy tắc ở layer khai báo sau sẽ ghi đè layer trước bất kể độ specificity bên trong.',
          },
          content: {
            en: 'A **Cascade Layer** declared via `@layer` allows authors to structure their stylesheets into explicit priority tiers (such as `reset`, `framework`, `components`, `utilities`). Styles in later layers override styles in earlier layers, and un-layered styles always win over layered styles. Within a single layer, normal specificity rules apply, but specificity cannot leak across layer boundaries to defeat a higher-priority layer. For `!important` declarations, the layer precedence is completely inverted, guaranteeing that lower layers can enforce critical reset defaults.',
            vi: '**Cascade Layer** được khai báo thông qua từ khóa `@layer`, cho phép lập trình viên phân chia stylesheet thành các tầng ưu tiên rõ ràng (như `reset`, `framework`, `components`, `utilities`). Các quy tắc trong layer khai báo sau sẽ ghi đè quy tắc trong layer trước, và các style nằm ngoài layer luôn luôn thắng các style trong layer. Trong phạm vi một layer, quy tắc specificity thông thường vẫn áp dụng, nhưng điểm specificity không thể "tràn" qua ranh giới layer để đánh bại một layer có độ ưu tiên cao hơn. Đối với các khai báo có `!important`, thứ tự ưu tiên giữa các layer bị đảo ngược hoàn toàn, đảm bảo tầng reset bên dưới có thể cưỡng chế các giá trị mặc định tối quan trọng.',
          },
          definitionDetails: {
            term: {
              en: 'Cascade Layer (@layer)',
              vi: 'Tầng Xếp Chồng (@layer)',
            },
            formalDefinition: {
              en: 'An architectural CSS mechanism grouping declarations into ordered priority buckets where layer ordering precedes selector specificity during cascade resolution.',
              vi: 'Cơ chế kiến trúc CSS nhóm các khai báo vào các thùng ưu tiên có thứ tự, trong đó thứ tự layer được đánh giá trước độ specificity của selector trong quá trình cascade.',
            },
            mentalModel: {
              en: 'Layers are transparent acetate sheets stacked on an overhead projector. The top sheet (later layer) covers the bottom sheet (earlier layer) completely.',
              vi: 'Các layer giống như các tấm kính trong suốt xếp chồng lên máy chiếu. Tấm kính nằm trên cùng (layer sau) sẽ che phủ hoàn toàn tấm kính nằm dưới (layer trước).',
            },
            whyItMatters: {
              en: 'Enables importing heavy CSS frameworks (like Bootstrap or Tailwind) without having their high-specificity selectors accidentally override your simple custom utility classes.',
              vi: 'Cho phép nhúng các framework CSS lớn mà không lo selector phức tạp của chúng ghi đè mất các class tùy biến đơn giản của bạn.',
            },
            commonMisconception: {
              en: 'Thinking an ID selector inside `@layer base` can override a simple class inside `@layer utilities`. Layer order is evaluated BEFORE specificity; the utility layer wins every time.',
              vi: 'Nghĩ rằng 1 ID selector trong `@layer base` có thể ghi đè class đơn giản trong `@layer utilities`. Thứ tự layer được xét TRƯỚC specificity; layer utility luôn luôn thắng.',
            },
            quickReference: {
              en: [
                'Syntax: @layer reset, base, components, utilities;',
                'Layer Priority: utilities > components > base > reset',
                'Un-layered styles: Always override layered styles',
                '!important rule: Inverts layer priority (reset !important wins)',
              ],
              vi: [
                'Cú pháp: @layer reset, base, components, utilities;',
                'Độ ưu tiên: utilities > components > base > reset',
                'Style ngoài layer: Luôn luôn thắng style nằm trong layer',
                'Quy tắc !important: Đảo ngược thứ tự layer (reset !important sẽ thắng)',
              ],
            },
            minimalExample: {
              language: 'css',
              filename: 'cascade_layers.css',
              explanation: {
                en: 'Low-specificity utility overriding high-specificity base selector due to layer ordering.',
                vi: 'Class utility có specificity thấp ghi đè selector phức tạp nhờ thứ tự layer.',
              },
              code: `@layer framework, overrides;

@layer framework {
  /* High specificity (1, 1, 0) */
  #main-sidebar .nav-item { color: #64748b; }
}

@layer overrides {
  /* Low specificity (0, 1, 0) - WINS because overrides > framework */
  .text-white { color: #ffffff; }
}`,
            },
          },
        },
      ],
    },
    {
      id: 'css-def-ch-2',
      number: 2,
      slug: 'stacking-context-z-index',
      title: {
        en: 'Formatting Contexts & Stacking Model Glossary',
        vi: 'Bối Cảnh Định Dạng & Bối Cảnh Xếp Lớp (Stacking Model)',
      },
      summary: {
        en: 'Formal definitions for Block Formatting Contexts (BFC), Stacking Contexts, and Margin Collapsing.',
        vi: 'Định nghĩa chuẩn cho Block Formatting Context (BFC), Stacking Context và Hiện Tượng Gộp Lề (Margin Collapsing).',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'css-def-2-1',
          title: {
            en: 'Block Formatting Context (BFC)',
            vi: 'Bối Cảnh Định Dạng Khối (Block Formatting Context - BFC)',
          },
          keyIdea: {
            en: 'A BFC creates an isolated layout boundary that contains internal floats, prevents external float intrusion, and stops vertical margin collapsing across container boundaries.',
            vi: 'Một BFC tạo ra một ranh giới bố cục độc lập bao bọc các phần tử float bên trong, chống bị float bên ngoài tràn vào và ngăn chặn gộp lề margin qua ranh giới khung chứa.',
          },
          content: {
            en: 'A **Block Formatting Context (BFC)** is an isolated visual layout region in the CSS formatting model. Inside a BFC, child block boxes are positioned vertically one after another. Crucially, a BFC establishes an impenetrable boundary: margins of child elements cannot collapse with parent margins outside the BFC, and the container automatically expands its height to contain internal floated elements without requiring legacy clearfix hacks. Modern CSS establishes a BFC cleanly via `display: flow-root`.',
            vi: '**Block Formatting Context (BFC)** là một khu vực bố cục thị giác độc lập trong mô hình định dạng CSS. Bên trong BFC, các hộp khối con được xếp dọc nối tiếp nhau. Quan trọng nhất, BFC thiết lập một ranh giới cách ly vững chắc: lề margin của phần tử con bên trong không thể gộp với lề margin của cha ở ngoài BFC, và khối chứa sẽ tự động giãn chiều cao để ôm trọn các phần tử float bên trong mà không cần mẹo clearfix cũ. Trong CSS hiện đại, cách chuẩn nhất để tạo BFC là sử dụng `display: flow-root`.',
          },
          definitionDetails: {
            term: {
              en: 'Block Formatting Context (BFC)',
              vi: 'Bối Cảnh Định Dạng Khối (BFC)',
            },
            formalDefinition: {
              en: 'An independent mini-layout environment in which block boxes are laid out, margin collapsing is isolated to the boundary, and floated children are fully encompassed.',
              vi: 'Một môi trường bố cục độc lập nơi các hộp khối được sắp xếp, việc gộp lề margin được cô lập trong ranh giới và các phần tử con float được bao bọc hoàn toàn.',
            },
            mentalModel: {
              en: 'A BFC is a soundproof, sealed container. Whatever happens inside (floats, margins) cannot leak out or affect elements on the outside.',
              vi: 'BFC giống như một căn phòng cách âm kín mít. Bất cứ điều gì xảy ra bên trong (float, margin) đều không thể lọt ra ngoài hay ảnh hưởng tới các phần tử bên ngoài.',
            },
            whyItMatters: {
              en: 'Eliminates container height collapse bugs when using floats and prevents unexpected layout jumping from collapsing child margins.',
              vi: 'Loại bỏ hoàn toàn lỗi xẹp chiều cao khung chứa khi dùng float và ngăn ngừa nhảy giao diện bất ngờ do con bị gộp lề margin ra ngoài cha.',
            },
            commonMisconception: {
              en: 'Using `overflow: hidden` as the only way to create a BFC. `overflow: hidden` creates a BFC but accidentally clips dropdown menus and box-shadows. Modern standard is `display: flow-root`.',
              vi: 'Nghĩ rằng `overflow: hidden` là cách duy nhất tạo BFC. `overflow: hidden` tạo được BFC nhưng lại vô tình cắt cụt dropdown menu và bóng shadow. Chuẩn hiện đại là `display: flow-root`.',
            },
            quickReference: {
              en: [
                'Best modern trigger: display: flow-root;',
                'Other triggers: display: flex / grid, position: absolute / fixed, overflow: hidden / auto',
                'Key Benefit 1: Contains internal floats without clearfix',
                'Key Benefit 2: Stops margin collapsing with parent/siblings',
              ],
              vi: [
                'Cách tạo tốt nhất hiện đại: display: flow-root;',
                'Các cách khác: display: flex / grid, position: absolute / fixed, overflow: hidden / auto',
                'Lợi ích 1: Tự ôm trọn phần tử float mà không cần clearfix',
                'Lợi ích 2: Chặn đứng hiện tượng gộp lề margin ra ngoài',
              ],
            },
            minimalExample: {
              language: 'css',
              filename: 'bfc_flow_root.css',
              explanation: {
                en: 'Creating a BFC with display: flow-root to contain floats and isolate margins.',
                vi: 'Tạo BFC bằng display: flow-root để ôm float và cô lập margin.',
              },
              code: `/* Clean modern BFC creation */
.article-card {
  display: flow-root; /* Creates BFC: contains float & stops margin leak */
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
}

.article-card img.avatar {
  float: left;
  margin-right: 16px;
}`,
            },
          },
        },
        {
          id: 'css-def-2-2',
          title: {
            en: 'Stacking Context & z-index Isolation',
            vi: 'Bối Cảnh Xếp Lớp (Stacking Context) & Cô Lập z-index',
          },
          keyIdea: {
            en: 'A Stacking Context forms an isolated 3D layering hierarchy; child elements cannot escape their parent stacking context to display above external elements with a higher parent z-index.',
            vi: 'Stacking Context tạo thành một phân cấp xếp lớp 3D độc lập; phần tử con không thể thoát ra khỏi stacking context của cha để hiển thị đè lên phần tử ngoài có cha ưu tiên hơn.',
          },
          content: {
            en: 'A **Stacking Context** is a 3-dimensional conceptualization of HTML elements along an imaginary Z-axis facing the user. Once an element establishes a stacking context (via `position: relative/absolute` with `z-index`, `position: fixed`, `opacity < 1`, `transform`, `filter`, or `isolation: isolate`), all its descendants are rendered within its local sub-tree. Even if a child element has `z-index: 999999`, it will still render behind an external sibling element whose parent stacking context is ranked higher.',
            vi: '**Stacking Context** là sự phân lớp 3 chiều của các phần tử HTML dọc theo trục Z hướng về phía người nhìn. Một khi phần tử thiết lập stacking context (thông qua `position: relative/absolute` kèm `z-index`, `position: fixed`, `opacity < 1`, `transform`, `filter` hoặc `isolation: isolate`), toàn bộ phần tử con của nó sẽ được render trong cây phân cấp cục bộ đó. Cho dù phần tử con có khai báo `z-index: 999999`, nó vẫn sẽ chìm dưới một phần tử bên ngoài nếu như stacking context của cha nó xếp sau cha của phần tử kia.',
          },
          definitionDetails: {
            term: {
              en: 'Stacking Context',
              vi: 'Bối Cảnh Xếp Lớp (Stacking Context)',
            },
            formalDefinition: {
              en: 'A three-dimensional rendering coordinate space formed by specific CSS properties that encapsulates and isolates all internal descendant z-index layers.',
              vi: 'Không gian tọa độ dựng hình 3 chiều được tạo bởi các thuộc tính CSS đặc thù, đóng gói và cô lập toàn bộ các lớp z-index của các phần tử con bên trong.',
            },
            mentalModel: {
              en: 'Stacking contexts are stacked folders. A document inside Folder 1 can never be placed physically above Folder 2 if Folder 2 is stacked on top of Folder 1.',
              vi: 'Stacking context giống như các tập hồ sơ xếp chồng lên nhau. Một tờ giấy nằm trong Tập hồ sơ 1 không bao giờ có thể đặt đè lên Tập hồ sơ 2 nếu Tập hồ sơ 2 đang đè lên Tập hồ sơ 1.',
            },
            whyItMatters: {
              en: 'Explains why increasing `z-index: 99999` fails to bring a dropdown or modal to the front when trapped inside a lower stacking context.',
              vi: 'Giải thích nguyên nhân tại sao tăng `z-index: 99999` vẫn không thể đưa dropdown hay modal nổi lên trên khi bị kẹt trong một stacking context thấp hơn.',
            },
            commonMisconception: {
              en: 'Assuming `z-index` works on all elements. `z-index` is completely ignored on static elements (`position: static`) unless they are direct flex or grid items.',
              vi: 'Nghĩ rằng `z-index` hoạt động trên mọi phần tử. `z-index` bị bỏ qua hoàn toàn trên phần tử mặc định (`position: static`) trừ khi chúng là con trực tiếp của Flexbox hoặc Grid.',
            },
            quickReference: {
              en: [
                'Triggers: position + z-index, position: fixed, opacity < 1, transform, filter, isolation: isolate',
                'Best explicit isolation: isolation: isolate;',
                'Child limit: Child cannot escape parent stacking layer',
              ],
              vi: [
                'Tác nhân kích hoạt: position + z-index, position: fixed, opacity < 1, transform, filter, isolation: isolate',
                'Cách cô lập tường minh tốt nhất: isolation: isolate;',
                'Giới hạn con: Phần tử con không thể thoát khỏi lớp xếp của cha',
              ],
            },
            minimalExample: {
              language: 'css',
              filename: 'stacking_isolation.css',
              explanation: {
                en: 'Isolating stacking contexts with isolation: isolate.',
                vi: 'Cô lập stacking context bằng thuộc tính isolation: isolate.',
              },
              code: `/* Establish clean, intentional stacking context */
.modal-wrapper {
  position: fixed;
  inset: 0;
  isolation: isolate; /* Pure stacking context creator without side-effects */
  z-index: 1000;
}

.modal-content {
  z-index: 1; /* Evaluated only within .modal-wrapper scope */
}`,
            },
          },
        },
      ],
    },
  ],
};
