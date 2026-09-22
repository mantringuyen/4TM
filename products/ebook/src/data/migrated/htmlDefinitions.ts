import { Book } from '../../types';

export const HTML_DEFINITIONS_BOOK: Book = {
  id: 'html-definitions',
  slug: 'html-definitions',
  title: 'HTML Definitions & DOM Concepts',
  subtitle: {
    en: 'Element vs Tag, Attribute vs Property, Semantic Landmarks & ARIA Definitions',
    vi: 'Phần Tử vs Thẻ, Thuộc Tính vs Thuộc Tính DOM, Landmark Ngữ Nghĩa & Định Nghĩa ARIA',
  },
  bookType: 'Definitions',
  categoryId: 'html',
  subjectId: 'web',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-12',
  accentColor: 'from-amber-500 to-orange-700',
  tags: ['Definitions', 'DOM', 'A11y', 'Glossary', 'HTML5'],
  description: {
    en: 'Precision definitions and mental models for core HTML and Web DOM concepts: Element vs Tag, Attribute vs Property, Semantic Elements vs Generic Containers, Void Elements, and ARIA Roles.',
    vi: 'Định nghĩa chuẩn xác và mô hình tư duy cho các khái niệm HTML & DOM cốt lõi: Phần tử vs Thẻ, Thuộc tính HTML vs Thuộc tính DOM, Thẻ ngữ nghĩa vs Khối Div chung, Thẻ rỗng và Vai trò ARIA.',
  },
  prerequisites: {
    en: [
      'Basic familiarity with writing HTML code and web browser inspection tools',
    ],
    vi: [
      'Làm quen cơ bản với việc viết mã HTML và công cụ kiểm tra (Inspect) của trình duyệt',
    ],
  },
  outcomes: {
    en: [
      'Distinguish precisely between serialized HTML source code and in-memory DOM tree properties',
      'Select appropriate native semantic elements over generic div/span containers and unneeded ARIA roles',
      'Correctly identify void self-closing elements and construct valid accessible names',
    ],
    vi: [
      'Phân biệt chính xác giữa mã nguồn HTML tuần tự hóa và thuộc tính cây DOM trong bộ nhớ',
      'Lựa chọn đúng thẻ ngữ nghĩa native thay vì lạm dụng khối div/span và các thuộc tính ARIA không cần thiết',
      'Nhận biết chính xác các phần tử rỗng tự đóng và xây dựng tên tiếp cận (accessible name) hợp lệ',
    ],
  },
  chapters: [
    {
      id: 'html-def-ch-1',
      number: 1,
      slug: 'dom-tree-and-elements',
      title: {
        en: 'Syntax Foundations & DOM Tree Elements',
        vi: 'Nền Tảng Cú Pháp & Các Phần Tử Cây DOM',
      },
      summary: {
        en: 'Formal definitions for HTML Element vs Tag, HTML Attribute vs DOM Property, Semantic Elements, and Void Elements.',
        vi: 'Định nghĩa chuẩn cho Phần Tử vs Thẻ HTML, Thuộc Tính HTML vs Thuộc Tính DOM, Thẻ Ngữ Nghĩa và Thẻ Rỗng.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'html-def-1-1',
          title: {
            en: 'HTML Element vs HTML Tag',
            vi: 'Phần Tử HTML (Element) vs Thẻ HTML (Tag)',
          },
          keyIdea: {
            en: 'A tag is the syntactic bracket notation (<p> or </p>), whereas an element is the complete conceptual entity including the opening tag, attributes, inner content, and closing tag.',
            vi: 'Thẻ (tag) là cú pháp trong dấu ngoặc nhọn (<p> hoặc </p>), trong khi phần tử (element) là thực thể hoàn chỉnh gồm thẻ mở, thuộc tính, nội dung bên trong và thẻ đóng.',
          },
          content: {
            en: 'In HTML syntax, a **Tag** is the physical markup delimiter composed of opening and closing angle brackets (e.g. `<a>` and `</a>`). An **Element** is the complete structural unit comprising the opening tag, any associated attributes, all nested child nodes or text content, and the matching closing tag. When parsed by the browser, every element is instantiated as an `HTMLElement` node in the DOM tree.',
            vi: 'Trong cú pháp HTML, **Thẻ (Tag)** là ký hiệu đánh dấu vật lý bao gồm cặp dấu ngoặc nhọn mở và đóng (ví dụ `<a>` và `</a>`). **Phần Tử (Element)** là một đơn vị cấu trúc hoàn chỉnh bao gồm thẻ mở, các thuộc tính đi kèm, toàn bộ nội dung văn bản hoặc nút con lồng bên trong và thẻ đóng tương ứng. Khi được trình duyệt phân tích, mỗi phần tử sẽ được khởi tạo thành một nút đối tượng `HTMLElement` trên cây DOM.',
          },
          definitionDetails: {
            term: {
              en: 'HTML Element',
              vi: 'Phần Tử HTML (Element)',
            },
            formalDefinition: {
              en: 'A component of an HTML document defined by an opening tag, optional attributes, descendant nodes, and an ending tag, representing a discrete node in the Document Object Model.',
              vi: 'Một thành phần của tài liệu HTML được định nghĩa bởi thẻ mở, các thuộc tính tùy chọn, các nút con và thẻ đóng, đại diện cho một nút riêng biệt trong Cây Đối tượng Tài liệu DOM.',
            },
            mentalModel: {
              en: 'A tag is like a pair of bookends. The element is the bookends AND all the books sitting between them.',
              vi: 'Thẻ giống như hai chiếc chặn sách ở hai đầu. Phần tử là toàn bộ cấu trúc gồm hai chiếc chặn sách VÀ tất cả những cuốn sách nằm ở giữa.',
            },
            whyItMatters: {
              en: 'Clear distinction prevents confusion when querying the DOM in JavaScript: element nodes have live properties and methods that raw source tags do not possess.',
              vi: 'Phân biệt rõ ràng giúp tránh nhầm lẫn khi thao tác DOM bằng JavaScript: các nút element có thuộc tính và phương thức động trong bộ nhớ mà thẻ trong mã nguồn không có.',
            },
            commonMisconception: {
              en: 'Using the words "tag" and "element" interchangeably when manipulating the DOM. In JavaScript, you select Elements (`document.querySelector`), never "tags".',
              vi: 'Dùng lẫn lộn từ "thẻ" và "element" khi lập trình JavaScript. Trong JS, bạn truy xuất Element (`document.querySelector`), không bao giờ truy xuất "thẻ".',
            },
            quickReference: {
              en: [
                'Opening Tag: <p class="intro">',
                'Closing Tag: </p>',
                'Complete Element: <p class="intro">Hello World</p>',
                'DOM Node: Instance of HTMLParagraphElement',
              ],
              vi: [
                'Thẻ mở: <p class="intro">',
                'Thẻ đóng: </p>',
                'Phần tử hoàn chỉnh: <p class="intro">Hello World</p>',
                'Nút DOM: Đối tượng thể hiện của HTMLParagraphElement',
              ],
            },
            minimalExample: {
              language: 'html',
              filename: 'element_vs_tag.html',
              explanation: {
                en: 'Illustrating tags vs complete element composition.',
                vi: 'Minh họa sự khác nhau giữa thẻ và phần tử hoàn chỉnh.',
              },
              code: `<!-- Opening Tag: <button type="submit"> -->
<!-- Inner Content: "Confirm Payment" -->
<!-- Closing Tag: </button> -->
<!-- The Entire Line Below is the Button Element: -->
<button type="submit">Confirm Payment</button>`,
            },
          },
        },
        {
          id: 'html-def-1-2',
          title: {
            en: 'HTML Attribute vs DOM Property',
            vi: 'Thuộc Tính HTML (Attribute) vs Thuộc Tính DOM (Property)',
          },
          keyIdea: {
            en: 'HTML attributes are initial static values serialized in markup; DOM properties are live, mutable variables residing in the browser memory object.',
            vi: 'Thuộc tính HTML (Attribute) là giá trị tĩnh ban đầu được ghi trong mã HTML; Thuộc tính DOM (Property) là các biến động trong bộ nhớ đối tượng của trình duyệt.',
          },
          content: {
            en: 'An **HTML Attribute** is an initial configuration value written inside an element\'s opening tag in the raw markup (e.g. `value="John"`). A **DOM Property** is a live property on the JavaScript `HTMLElement` object in memory (e.g. `inputElement.value`). When a user types into an input field, the DOM property updates in real-time, but the original HTML attribute remains unchanged unless explicitly modified via `setAttribute()`.',
            vi: '**Thuộc Tính HTML (Attribute)** là giá trị cấu hình khởi tạo được viết bên trong thẻ mở trong mã nguồn thô (ví dụ `value="John"`). **Thuộc Tính DOM (Property)** là một biến sống nằm trên đối tượng JavaScript `HTMLElement` trong bộ nhớ RAM (ví dụ `inputElement.value`). Khi người dùng gõ phím vào ô nhập liệu, thuộc tính DOM sẽ thay đổi tức thì, nhưng thuộc tính HTML ban đầu vẫn giữ nguyên trừ khi được gọi hàm `setAttribute()` rõ ràng.',
          },
          definitionDetails: {
            term: {
              en: 'HTML Attribute vs DOM Property',
              vi: 'Thuộc Tính HTML vs Thuộc Tính DOM',
            },
            formalDefinition: {
              en: 'An attribute is a key-value pair declared in HTML source defining initial node state; a property is a dynamic member of a DOM node object reflecting current runtime state.',
              vi: 'Attribute là cặp khóa-giá trị khai báo trong mã nguồn HTML xác định trạng thái ban đầu; Property là thành viên động của đối tượng nút DOM phản ánh trạng thái thực thi hiện tại.',
            },
            mentalModel: {
              en: 'An attribute is the printed birth certificate. A property is the person\'s current legal name and age today.',
              vi: 'Attribute giống như tờ giấy khai sinh ban đầu. Property là tên gọi và tuổi tác thực tế hiện tại của người đó trong đời thực.',
            },
            whyItMatters: {
              en: 'Reading `getAttribute("value")` instead of `.value` in JavaScript forms leads to bugs where user-entered changes are completely missed.',
              vi: 'Đọc nhầm `getAttribute("value")` thay vì `.value` trong JavaScript sẽ gây ra lỗi nghiêm trọng: không thể lấy được giá trị mới nhất mà người dùng vừa nhập.',
            },
            commonMisconception: {
              en: 'Assuming `setAttribute("checked", "false")` unchecks a checkbox. Any string value (even "false") makes the HTML boolean attribute present and therefore truthy.',
              vi: 'Nghĩ rằng `setAttribute("checked", "false")` sẽ bỏ chọn checkbox. Bất kỳ chuỗi nào (kể cả "false") cũng làm cho thuộc tính boolean tồn tại và trở thành TRUE.',
            },
            quickReference: {
              en: [
                'HTML Attribute: element.getAttribute("name"), reflects markup default',
                'DOM Property: element.name, reflects current live state',
                'Boolean Sync: element.checked = true modifies live state directly',
              ],
              vi: [
                'Thuộc tính HTML: element.getAttribute("name"), phản ánh giá trị mặc định trong mã',
                'Thuộc tính DOM: element.name, phản ánh trạng thái động hiện tại',
                'Đồng bộ Boolean: element.checked = true trực tiếp thay đổi trạng thái chọn',
              ],
            },
            minimalExample: {
              language: 'javascript',
              filename: 'attr_vs_prop.js',
              explanation: {
                en: 'Demonstrating how user interaction mutates DOM properties while attributes remain frozen.',
                vi: 'Chứng minh cách thao tác của người dùng làm thay đổi Property trong khi Attribute vẫn giữ nguyên.',
              },
              code: `const input = document.querySelector('input'); // <input value="Default">

// User types "New Value" into the browser input field
console.log(input.value); // "New Value" (Live DOM Property)
console.log(input.getAttribute('value')); // "Default" (Static HTML Attribute)`,
            },
          },
        },
      ],
    },
    {
      id: 'html-def-ch-2',
      number: 2,
      slug: 'accessibility-aria-definitions',
      title: {
        en: 'Accessibility, ARIA & Landmark Definitions',
        vi: 'Khái Niệm Accessibility, Tiêu Chuẩn ARIA & Landmark',
      },
      summary: {
        en: 'Formal definitions for Semantic Elements vs Generic Containers, Void Elements, and ARIA Roles and Attributes.',
        vi: 'Định nghĩa chuẩn cho Thẻ Ngữ Nghĩa vs Khối Div Chung, Thẻ Rỗng (Void) và Tiêu Chuẩn ARIA.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'html-def-2-1',
          title: {
            en: 'Semantic Landmark Elements vs Generic Containers',
            vi: 'Phần Tử Mốc Ngữ Nghĩa (Landmark) vs Khối Chứa Chung (div/span)',
          },
          keyIdea: {
            en: 'Semantic landmarks (<main>, <nav>, <header>, <aside>, <footer>) communicate document hierarchy to accessibility APIs; generic <div> and <span> containers possess zero semantic meaning.',
            vi: 'Các landmark ngữ nghĩa (<main>, <nav>, <header>, <aside>, <footer>) truyền đạt cấu trúc tài liệu tới API accessibility; các khối <div> và <span> không chứa bất kỳ ý nghĩa ngữ nghĩa nào.',
          },
          content: {
            en: 'A **Semantic Landmark Element** is a specialized HTML5 tag that automatically maps to a standard WAI-ARIA landmark role in the browser\'s Accessibility Tree (e.g., `<main>` maps to `role="main"`, `<nav>` to `role="navigation"`). This allows screen reader users to jump directly between major sections of a page using keyboard shortcuts. In contrast, **Generic Containers** (`<div>` for block flow and `<span>` for inline flow) are non-semantic styling wrappers that convey no structural context or interactive affordance.',
            vi: '**Phần Tử Mốc Ngữ Nghĩa (Semantic Landmark Element)** là thẻ HTML5 chuyên biệt tự động ánh xạ tới một vai trò mốc chuẩn WAI-ARIA trong Cây Tiếp Cận của trình duyệt (ví dụ `<main>` ánh xạ thành `role="main"`, `<nav>` thành `role="navigation"`). Điều này cho phép người dùng trình đọc màn hình nhảy nhanh giữa các khu vực chính của trang bằng phím tắt. Ngược lại, **Khối Chứa Chung (Generic Container)** (`<div>` cho dòng khối và `<span>` cho dòng nội tuyến) là các thẻ bọc định dạng không mang ngữ nghĩa, không truyền đạt bất kỳ thông tin cấu trúc hay khả năng tương tác nào.',
          },
          definitionDetails: {
            term: {
              en: 'Semantic Landmark Element',
              vi: 'Phần Tử Mốc Ngữ Nghĩa (Semantic Landmark)',
            },
            formalDefinition: {
              en: 'An HTML5 element that programmatically establishes a navigational landmark in the Accessibility Tree, designating distinct architectural zones of a web document.',
              vi: 'Một phần tử HTML5 thiết lập mốc điều hướng trên Cây Tiếp Cận, phân định các khu vực kiến trúc riêng biệt của một tài liệu web.',
            },
            mentalModel: {
              en: 'Semantic landmarks are clearly labeled airport signs (Terminal, Baggage Claim, Gate). A <div> is an unlabeled blank wooden door.',
              vi: 'Landmark ngữ nghĩa giống như các biển chỉ dẫn rõ ràng ở sân bay (Nhà ga, Nơi lấy hành lý, Cửa ra máy bay). Thẻ <div> là một cánh cửa gỗ trơn không hề có biển tên.',
            },
            whyItMatters: {
              en: 'Visually impaired users rely on landmark navigation to bypass repetitive menus and access primary document content in seconds.',
              vi: 'Người dùng khiếm thị phụ thuộc vào mốc landmark để bỏ qua các thanh menu lặp lại và đi thẳng vào nội dung chính chỉ trong vài giây.',
            },
            commonMisconception: {
              en: 'Adding `role="main"` to `<main>`. Modern browsers automatically synthesize the appropriate ARIA role from native HTML5 elements; duplicating roles is redundant.',
              vi: 'Thêm `role="main"` vào thẻ `<main>`. Trình duyệt hiện đại tự động tạo role ARIA tương ứng từ thẻ HTML5 native; việc viết thêm role là dư thừa.',
            },
            quickReference: {
              en: [
                '<header> = Banner landmark',
                '<nav> = Navigation landmark',
                '<main> = Primary central content (Exactly one per document)',
                '<aside> = Complementary landmark (Sidebars, related links)',
                '<footer> = Contentinfo landmark',
              ],
              vi: [
                '<header> = Landmark biểu ngữ (Banner)',
                '<nav> = Landmark điều hướng (Navigation)',
                '<main> = Nội dung chính (Duy nhất 1 thẻ mỗi trang)',
                '<aside> = Landmark bổ trợ (Thanh bên, liên kết liên quan)',
                '<footer> = Landmark thông tin chân trang (Contentinfo)',
              ],
            },
            minimalExample: {
              language: 'html',
              filename: 'semantic_landmarks.html',
              explanation: {
                en: 'Semantic landmark architecture replacing div soup.',
                vi: 'Kiến trúc landmark ngữ nghĩa thay thế "div soup".',
              },
              code: `<!-- Accessible Landmark Architecture -->
<header>
  <nav aria-label="Primary Navigation">...</nav>
</header>
<main id="content">
  <article>
    <h1>Technical Publication</h1>
    <p>Body narrative...</p>
  </article>
</main>
<aside aria-label="Related Topics">...</aside>
<footer>...</footer>`,
            },
          },
        },
        {
          id: 'html-def-2-2',
          title: {
            en: 'Void Element (Self-Closing)',
            vi: 'Phần Tử Rỗng (Void Element)',
          },
          keyIdea: {
            en: 'Void elements have no closing tags and cannot hold child elements or text nodes; placing a closing tag or inner content produces invalid HTML syntax.',
            vi: 'Phần tử rỗng không có thẻ đóng và không thể chứa thẻ con hay văn bản; việc viết thẻ đóng hoặc nhét nội dung vào trong là sai cú pháp HTML.',
          },
          content: {
            en: 'A **Void Element** is an HTML element whose content model is completely empty. In the HTML5 specification, void elements are forbidden from having an end tag. Standard void elements include `<area>`, `<base>`, `<br>`, `<col>`, `<embed>`, `<hr>`, `<img>`, `<input>`, `<link>`, `<meta>`, `<source>`, `<track>`, and `<wbr>`. While XML/XHTML required a trailing slash (e.g. `<img />`), in standard HTML5 the trailing slash is optional and has zero syntactic meaning on void elements.',
            vi: '**Phần Tử Rỗng (Void Element)** là phần tử HTML có mô hình nội dung hoàn toàn rỗng. Trong đặc tả HTML5, các phần tử rỗng bị cấm có thẻ đóng. Danh sách các phần tử rỗng tiêu chuẩn gồm `<area>`, `<base>`, `<br>`, `<col>`, `<embed>`, `<hr>`, `<img>`, `<input>`, `<link>`, `<meta>`, `<source>`, `<track>` và `<wbr>`. Trong khi chuẩn XML/XHTML yêu cầu dấu gạch chéo cuối thẻ (ví dụ `<img />`), trong HTML5 tiêu chuẩn dấu gạch chéo này là tùy chọn và không có ý nghĩa cú pháp trên các thẻ void.',
          },
          definitionDetails: {
            term: {
              en: 'Void Element',
              vi: 'Phần Tử Rỗng (Void Element)',
            },
            formalDefinition: {
              en: 'An element in the HTML specification whose content model is empty and which MUST NOT possess an end tag or contain any child text or element nodes.',
              vi: 'Một phần tử trong đặc tả HTML có mô hình nội dung rỗng, KHÔNG ĐƯỢC PHÉP có thẻ đóng và không được chứa bất kỳ nút văn bản hay nút con nào.',
            },
            mentalModel: {
              en: 'A standard element is an open cardboard box where you place items. A void element is a solid brick—you can attach labels (attributes) to its surface, but you cannot open it.',
              vi: 'Một phần tử thông thường giống như chiếc hộp carton mở để bạn xếp đồ vào trong. Phần tử rỗng giống như viên gạch đặc—bạn có thể dán nhãn (thuộc tính) lên bề mặt nhưng không thể mở nó ra.',
            },
            whyItMatters: {
              en: 'Attempting to put text inside an `<input>` tag (e.g. `<input>Click me</input>`) causes the browser parser to eject the text outside the input, breaking UI rendering.',
              vi: 'Cố tình nhét chữ vào trong thẻ `<input>` (ví dụ `<input>Nhấn vào đây</input>`) sẽ khiến trình duyệt đẩy chữ ra ngoài ô input, gây vỡ giao diện.',
            },
            commonMisconception: {
              en: 'Thinking `<button>` or `<textarea>` are void elements. Both `<button>` and `<textarea>` are regular container elements and require explicit closing tags (`</button>`, `</textarea>`).',
              vi: 'Nghĩ rằng `<button>` hoặc `<textarea>` là phần tử rỗng. Cả `<button>` và `<textarea>` đều là phần tử thông thường và bắt buộc phải có thẻ đóng (`</button>`, `</textarea>`).',
            },
            quickReference: {
              en: [
                'HTML5 Void Elements: <input>, <img>, <br>, <hr>, <meta>, <link>, <source>',
                'Syntax: <img> or <img /> (Both valid, trailing slash ignored)',
                'Invalid Syntax: <input>Label</input> or <br></br>',
              ],
              vi: [
                'Thẻ Void HTML5: <input>, <img>, <br>, <hr>, <meta>, <link>, <source>',
                'Cú pháp: <img> hoặc <img /> (Đều hợp lệ, dấu gạch chéo bị bỏ qua)',
                'Cú pháp sai: <input>Nhãn</input> hoặc <br></br>',
              ],
            },
            minimalExample: {
              language: 'html',
              filename: 'void_elements.html',
              explanation: {
                en: 'Correct usage of void elements with attributes vs regular container elements.',
                vi: 'Sử dụng đúng phần tử rỗng có thuộc tính so với phần tử chứa nội dung thông thường.',
              },
              code: `<!-- Correct Void Elements (No Closing Tag Needed) -->
<meta charset="UTF-8">
<img src="/avatar.webp" alt="User avatar" width="48" height="48">
<input type="text" id="username" name="username">

<!-- Regular Container Elements (Require Closing Tag) -->
<button type="submit">Submit Form</button>
<textarea id="bio" name="bio"></textarea>`,
            },
          },
        },
      ],
    },
  ],
};
