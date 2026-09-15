import { LessonDef } from './htmlLessonDefs';

export const basicLessonsPart1Defs: LessonDef[] = [
  // Lesson 1: HTML5 Document Structure & Skeleton
  {
    order: 1,
    id: 'html_lesson_1',
    moduleId: 'html_mod_1',
    levelId: 'basic',
    topicId: 'html_structure',
    titleEn: 'HTML5 Document Structure, DOCTYPE & Page Skeleton',
    titleVi: 'Cấu Trúc Tài Liệu HTML5, Khai Báo DOCTYPE & Khung Trang',
    summaryEn: 'Master standard HTML5 document anatomy: <!DOCTYPE html>, <html> with lang, <head> metadata with viewport and charset, and the visible <body> skeleton.',
    summaryVi: 'Làm chủ cấu trúc giải phẫu tài liệu HTML5: <!DOCTYPE html>, <html> kèm lang, siêu dữ liệu <head> với viewport, charset và khung hiển thị <body>.',
    introEn: 'HTML (HyperText Markup Language) is the standard foundational markup language for documents designed to be displayed in a web browser. HTML5 establishes a clean, streamlined document structure that ensures cross-browser compatibility and accessible rendering.',
    introVi: 'HTML (HyperText Markup Language) là ngôn ngữ đánh dấu tiêu chuẩn để xây dựng trang web. HTML5 mang đến cấu trúc tài liệu gọn gàng, tương thích cao trên mọi trình duyệt và tối ưu cho các công nghệ trợ năng.',
    conceptEn: 'Every compliant HTML5 document starts with <!DOCTYPE html> to trigger standard standards-compliant rendering mode (avoiding Quirks Mode). The root <html> element requires a valid lang attribute (e.g. lang="en" or lang="vi") for screen readers and search engines. Inside <head>, you define essential metadata: <meta charset="UTF-8"> for Unicode character encoding, <meta name="viewport" content="width=device-width, initial-scale=1.0"> for responsive mobile rendering, and a descriptive <title>. The <body> contains all visible web content.',
    conceptVi: 'Mọi tài liệu HTML5 chuẩn đều bắt đầu bằng <!DOCTYPE html> để kích hoạt chế độ dựng chuẩn của trình duyệt (tránh Quirks Mode). Thẻ gốc <html> cần có thuộc tính lang (như lang="vi" hoặc lang="en") để hỗ trợ trình đọc màn hình và SEO. Thẻ <head> chứa siêu dữ liệu: <meta charset="UTF-8"> cho bảng mã ký tự, thẻ viewport cho giao diện responsive trên di động và tiêu đề <title>. Thẻ <body> chứa toàn bộ nội dung nhìn thấy trên trang.',
    syntax: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document Title</title>\n</head>\n<body>\n  <h1>Main Heading</h1>\n  <p>Page content goes here.</p>\n</body>\n</html>',
    example1TitleEn: 'Standard HTML5 Starter Skeleton',
    example1TitleVi: 'Khung Tài Liệu HTML5 Tiêu Chuẩn',
    example1Code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>4TM Web Academy</title>\n</head>\n<body>\n  <h1>Welcome to Web Engineering</h1>\n  <p>Building semantic and accessible applications.</p>\n</body>\n</html>',
    example1ExpEn: 'Complete valid HTML5 document containing all mandatory structural tags, character encoding, and viewport configuration.',
    example1ExpVi: 'Tài liệu HTML5 hoàn chỉnh bao gồm đầy đủ các thẻ cấu trúc bắt buộc, bảng mã ký tự và cấu hình viewport.',
    example2TitleEn: 'Localized Bilingual Document with Meta Description',
    example2TitleVi: 'Tài Liệu Đa Ngữ Kèm Thẻ Mô Tả Meta',
    example2Code: '<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Học lập trình HTML5 chuẩn công nghiệp tại 4TM">\n  <title>Học HTML5 Chuyên Nghiệp - 4TM</title>\n</head>\n<body>\n  <h1>Lập Trình Web Hiện Đại</h1>\n  <p>Nền tảng vững chắc cho mọi lập trình viên web.</p>\n</body>\n</html>',
    example2ExpEn: 'Demonstrates Vietnamese localization with lang="vi" and a meta description tag for search engine indexing.',
    example2ExpVi: 'Minh họa tài liệu tiếng Việt với lang="vi" cùng thẻ mô tả meta description hỗ trợ máy tìm kiếm.',
    mistake1En: 'Omitting <!DOCTYPE html> or placing tags before it',
    mistake1Vi: 'Bỏ sót <!DOCTYPE html> hoặc đặt các thẻ khác phía trước',
    correction1En: 'Always place <!DOCTYPE html> on the very first line of the document to prevent Quirks Mode rendering.',
    correction1Vi: 'Luôn đặt <!DOCTYPE html> ở dòng đầu tiên của tài liệu để ngăn trình duyệt chuyển sang chế độ Quirks Mode.',
    practiceTaskEn: 'Construct a Valid HTML5 Skeleton',
    practiceTaskVi: 'Xây dựng khung tài liệu HTML5 chuẩn',
    practiceInstEn: 'Complete the HTML5 document skeleton with <!DOCTYPE html>, <html lang="en">, a <head> containing <meta charset="UTF-8"> and <title>My Portfolio</title>, and a <body> with <h1>Developer Portfolio</h1>.',
    practiceInstVi: 'Hoàn thiện khung tài liệu HTML5 với <!DOCTYPE html>, <html lang="en">, thẻ <head> chứa <meta charset="UTF-8"> và <title>My Portfolio</title>, cùng thẻ <body> chứa <h1>Developer Portfolio</h1>.',
    practiceStarter: '<html lang="en">\n<head>\n  <title>My Portfolio</title>\n</head>\n<body>\n  <p>Content</p>\n</body>\n</html>',
    practiceSolution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Portfolio</title>\n</head>\n<body>\n  <h1>Developer Portfolio</h1>\n</body>\n</html>',
    practiceHintEn: 'Add <!DOCTYPE html> at the top and include <meta charset="UTF-8"> in <head>.',
    practiceHintVi: 'Thêm <!DOCTYPE html> ở đầu và đặt <meta charset="UTF-8"> trong <head>.',
    
    ex1: {
      titleEn: 'Add Mandatory HTML5 DOCTYPE & Encoding',
      titleVi: 'Thêm Khai Báo DOCTYPE & Bảng Mã Ký Tự',
      instEn: 'Add <!DOCTYPE html> at line 1 and <meta charset="UTF-8"> inside the <head> element.',
      instVi: 'Thêm <!DOCTYPE html> ở dòng 1 và <meta charset="UTF-8"> bên trong thẻ <head>.',
      starter: '<html lang="en">\n<head>\n  <title>4TM App</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
      solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>4TM App</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
      hintEn: 'Place <!DOCTYPE html> before <html> and <meta charset="UTF-8"> in <head>.',
      hintVi: 'Đặt <!DOCTYPE html> trước <html> và <meta charset="UTF-8"> trong <head>.',
      expEn: 'DOCTYPE triggers standards mode and UTF-8 supports global character sets.',
      expVi: 'DOCTYPE kích hoạt chế độ dựng chuẩn và UTF-8 hiển thị đầy đủ ký tự quốc tế.'
    },
    ex2: {
      titleEn: 'Fix Misplaced Head Elements in Body',
      titleVi: 'Sửa Lỗi Đặt Thẻ Head Sai Vị Trí',
      instEn: 'Move the <title> and <meta> tags inside the <head> container, and ensure <h1> is inside <body>.',
      instVi: 'Di chuyển thẻ <title> và <meta> vào trong <head>, đảm bảo <h1> nằm trong <body>.',
      starter: '<!DOCTYPE html>\n<html lang="en">\n<body>\n  <title>My Web Page</title>\n  <meta charset="UTF-8">\n  <h1>Correct Layout</h1>\n</body>\n</html>',
      solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Web Page</title>\n</head>\n<body>\n  <h1>Correct Layout</h1>\n</body>\n</html>',
      hintEn: 'Wrap <meta> and <title> in <head> and keep <h1> in <body>.',
      hintVi: 'Bọc <meta> và <title> trong <head> và giữ <h1> trong <body>.',
      expEn: 'Head tags describe document metadata while body tags contain visible content.',
      expVi: 'Thẻ head chứa cấu hình tài liệu, trong khi thẻ body chứa nội dung người dùng thấy.'
    },
    ex3: {
      titleEn: 'Build Vietnamese Localized HTML Document',
      titleVi: 'Viết Tài Liệu HTML Tiếng Việt Hoàn Chỉnh',
      instEn: 'Write a full HTML document with <!DOCTYPE html>, <html lang="vi">, <head> with <meta charset="UTF-8"> and <title>Trang Chủ 4TM</title>, and <body> containing <h1>Xin Chào Thế Giới</h1>.',
      instVi: 'Viết tài liệu HTML hoàn chỉnh với <!DOCTYPE html>, <html lang="vi">, <head> có <meta charset="UTF-8"> và <title>Trang Chủ 4TM</title>, và <body> chứa <h1>Xin Chào Thế Giới</h1>.',
      starter: '<!-- Write your complete HTML5 document here -->\n',
      solution: '<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <title>Trang Chủ 4TM</title>\n</head>\n<body>\n  <h1>Xin Chào Thế Giới</h1>\n</body>\n</html>',
      hintEn: 'Declare <!DOCTYPE html>, <html lang="vi">, <head> with charset/title, and <body>.',
      hintVi: 'Khai báo <!DOCTYPE html>, <html lang="vi">, <head> với charset/title và <body>.',
      expEn: 'Proper lang="vi" and UTF-8 encoding allow web engines to process Vietnamese text flawlessly.',
      expVi: 'Khai báo lang="vi" và UTF-8 giúp máy tìm kiếm và trình đọc xử lý tiếng Việt chính xác.'
    },
    ex4: {
      titleEn: 'Add Mobile Viewport Configuration',
      titleVi: 'Thêm Thẻ Cấu Hình Mobile Viewport',
      instEn: 'Add the mobile viewport meta tag <meta name="viewport" content="width=device-width, initial-scale=1.0"> into the <head>.',
      instVi: 'Thêm thẻ meta viewport <meta name="viewport" content="width=device-width, initial-scale=1.0"> vào trong <head>.',
      starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Responsive Site</title>\n</head>\n<body>\n  <h1>Mobile First</h1>\n</body>\n</html>',
      solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Responsive Site</title>\n</head>\n<body>\n  <h1>Mobile First</h1>\n</body>\n</html>',
      hintEn: 'Insert <meta name="viewport" content="width=device-width, initial-scale=1.0"> in <head>.',
      hintVi: 'Chèn <meta name="viewport" content="width=device-width, initial-scale=1.0"> vào <head>.',
      expEn: 'The viewport tag ensures the page scales correctly to device physical screen widths.',
      expVi: 'Thẻ viewport đảm bảo trang web co giãn đúng theo kích thước thiết bị.'
    },
    ex5: {
      titleEn: 'Verify Valid HTML Headings and Paragraphs',
      titleVi: 'Kiểm Tra Tiêu Đề Và Đoạn Văn Trong HTML',
      instEn: 'Ensure the document contains an <h1> tag with "Web Architecture" and a <p> tag with "Built with HTML5 standards." inside <body>.',
      instVi: 'Đảm bảo tài liệu chứa thẻ <h1> với "Web Architecture" và thẻ <p> với "Built with HTML5 standards." bên trong <body>.',
      starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Architecture</title>\n</head>\n<body>\n  <!-- Add h1 and p elements here -->\n</body>\n</html>',
      solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Architecture</title>\n</head>\n<body>\n  <h1>Web Architecture</h1>\n  <p>Built with HTML5 standards.</p>\n</body>\n</html>',
      hintEn: 'Add <h1>Web Architecture</h1> and <p>Built with HTML5 standards.</p>.',
      hintVi: 'Thêm <h1>Web Architecture</h1> và <p>Built with HTML5 standards.</p>.',
      expEn: '<h1> is the primary page headline, and <p> represents body text paragraphs.',
      expVi: '<h1> là tiêu đề chính và <p> biểu diễn đoạn văn bản.'
    },

    ch: {
      titleEn: 'Production Ready HTML5 Document Skeleton',
      titleVi: 'Khung Tài Liệu HTML5 Tiêu Chuẩn Sản Xuất',
      descEn: 'Build a production-compliant HTML5 web document featuring DOCTYPE, language declaration, charset, viewport meta, SEO description, title, and a body with main title and description paragraph.',
      descVi: 'Xây dựng tài liệu HTML5 chuẩn doanh nghiệp gồm khai báo DOCTYPE, ngôn ngữ, charset, meta viewport, meta description SEO, tiêu đề title và thân trang có tiêu đề h1 cùng đoạn mô tả.',
      starter: '<!-- Build your complete HTML5 production skeleton below -->\n',
      solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Production-ready web development curriculum">\n  <title>4TM Enterprise Web</title>\n</head>\n<body>\n  <h1>Enterprise Web Development</h1>\n  <p>High performance, accessible, and semantic web engineering.</p>\n</body>\n</html>',
      expEn: 'This document conforms to modern W3C standards with proper document structure, mobile viewport responsiveness, and SEO tags.',
      expVi: 'Tài liệu tuân thủ đầy đủ chuẩn W3C với cấu trúc hoàn chỉnh, hỗ trợ hiển thị di động và tối ưu máy tìm kiếm.'
    },
    chV1: {
      titleEn: 'Variant 1: Developer Portfolio Document Skeleton',
      titleVi: 'Biến Thể 1: Khung Trang Portfolio Lập Trình Viên',
      descEn: 'Create a full HTML5 document skeleton for a developer portfolio with title "Alex Rivera - Frontend Engineer" and <h1>Alex Rivera</h1> in <body>.',
      descVi: 'Tạo khung tài liệu HTML5 hoàn chỉnh cho trang portfolio với title "Alex Rivera - Frontend Engineer" và <h1>Alex Rivera</h1> trong <body>.',
      starter: '<!-- Build the portfolio document skeleton -->\n',
      solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Alex Rivera - Frontend Engineer</title>\n</head>\n<body>\n  <h1>Alex Rivera</h1>\n  <p>Frontend engineer specializing in semantic web and accessibility.</p>\n</body>\n</html>',
      expEn: 'Creates a clean, accessible portfolio shell ready for content expansion.',
      expVi: 'Tạo khung trang portfolio gọn gàng, chuẩn trợ năng sẵn sàng phát triển nội dung.'
    },
    chV2: {
      titleEn: 'Variant 2: Vietnamese Tech News Skeleton',
      titleVi: 'Biến Thể 2: Khung Trang Tin Tức Công Nghệ',
      descEn: 'Create a full HTML5 document for a Vietnamese tech portal with <html lang="vi">, <title>Tin Tức Công Nghệ 4TM</title>, and <h1>Cổng Thông Tin Công Nghệ</h1>.',
      descVi: 'Tạo tài liệu HTML5 hoàn chỉnh cho cổng tin tức công nghệ với <html lang="vi">, <title>Tin Tức Công Nghệ 4TM</title> và <h1>Cổng Thông Tin Công Nghệ</h1>.',
      starter: '<!-- Build the Vietnamese news portal skeleton -->\n',
      solution: '<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Tin Tức Công Nghệ 4TM</title>\n</head>\n<body>\n  <h1>Cổng Thông Tin Công Nghệ</h1>\n  <p>Cập nhật tin tức công nghệ mới nhất trong ngày.</p>\n</body>\n</html>',
      expEn: 'Bilingual document configured for Vietnamese language indexing and speech synthesis.',
      expVi: 'Tài liệu được cấu hình tối ưu cho lập chỉ mục tiếng Việt và hỗ trợ tổng hợp giọng đọc.'
    },

    quizzes: [
      {
        qEn: 'What is the purpose of the <!DOCTYPE html> declaration at the very top of an HTML file?',
        qVi: 'Mục đích của khai báo <!DOCTYPE html> ở dòng đầu tiên của tệp HTML là gì?',
        options: [
          { en: 'Tells the browser to render the page in standard HTML5 mode and prevents Quirks Mode', vi: 'Báo cho trình duyệt dựng trang theo chuẩn HTML5 hiện đại và ngăn Quirks Mode' },
          { en: 'Imports the default CSS stylesheet from W3C servers', vi: 'Tải tệp định kiểu CSS mặc định từ máy chủ W3C' },
          { en: 'Enables JavaScript runtime execution in the browser', vi: 'Bật môi trường thực thi JavaScript trong trình duyệt' },
          { en: 'Encodes the file into binary format for faster transport', vi: 'Mã hóa tệp sang dạng nhị phân để truyền tải nhanh hơn' }
        ],
        ans: 0,
        expEn: '<!DOCTYPE html> is a required document type declaration that ensures modern standards compliance.',
        expVi: '<!DOCTYPE html> là khai báo kiểu tài liệu bắt buộc giúp kích hoạt chế độ dựng chuẩn W3C.'
      },
      {
        qEn: 'Why is the lang attribute on the <html> element critical for accessibility?',
        qVi: 'Tại sao thuộc tính lang trên thẻ <html> lại quan trọng đối với khả năng tiếp cận (accessibility)?',
        options: [
          { en: 'It informs screen readers which voice synthesizer and pronunciation rules to use', vi: 'Nó báo cho trình đọc màn hình biết cần dùng bộ phát âm và quy tắc đọc ngôn ngữ nào' },
          { en: 'It automatically translates the page into the user browser language', vi: 'Nó tự động dịch toàn bộ trang sang ngôn ngữ của trình duyệt người dùng' },
          { en: 'It specifies the font family downloaded from Google Fonts', vi: 'Nó xác định bộ font chữ cần tải về từ Google Fonts' },
          { en: 'It encrypts form submissions based on regional standards', vi: 'Nó mã hóa dữ liệu biểu mẫu theo tiêu chuẩn từng khu vực' }
        ],
        ans: 0,
        expEn: 'The lang attribute tells assistive technology and search engines the natural language of the document content.',
        expVi: 'Thuộc tính lang giúp công nghệ trợ năng và máy tìm kiếm nhận diện ngôn ngữ tự nhiên của nội dung.'
      },
      {
        qEn: 'What does <meta name="viewport" content="width=device-width, initial-scale=1.0"> accomplish?',
        qVi: 'Thẻ <meta name="viewport" content="width=device-width, initial-scale=1.0"> có tác dụng gì?',
        options: [
          { en: 'Sets viewport width to match physical device width and prevents 1:1 mobile downscaling', vi: 'Thiết lập chiều rộng viewport bằng chiều rộng vật lý của thiết bị và chống thu nhỏ giao diện' },
          { en: 'Enables dark mode theme automatically on mobile devices', vi: 'Tự động kích hoạt giao diện nền tối trên thiết bị di động' },
          { en: 'Restricts users from zooming into image assets', vi: 'Ngăn không cho người dùng phóng to hình ảnh' },
          { en: 'Forces desktop landscape orientation on mobile phones', vi: 'Bắt buộc màn hình điện thoại xoay ngang kiểu máy tính' }
        ],
        ans: 0,
        expEn: 'The viewport meta tag instructs mobile browsers to render content matching the device screen width rather than assuming a 980px desktop view.',
        expVi: 'Thẻ meta viewport yêu cầu trình duyệt di động hiển thị theo đúng kích thước màn hình thiết bị.'
      },
      {
        qEn: 'Where should <meta charset="UTF-8"> be placed inside an HTML document?',
        qVi: 'Thẻ <meta charset="UTF-8"> nên được đặt ở vị trí nào trong tài liệu HTML?',
        options: [
          { en: 'As one of the very first children of the <head> element', vi: 'Là một trong những thẻ con đầu tiên bên trong thẻ <head>' },
          { en: 'At the bottom of the <body> element', vi: 'Ở cuối cùng của thẻ <body>' },
          { en: 'Outside the <html> tag after DOCTYPE', vi: 'Bên ngoài thẻ <html> phía sau DOCTYPE' },
          { en: 'Inside a <footer> element', vi: 'Bên trong thẻ <footer>' }
        ],
        ans: 0,
        expEn: 'Placing charset at the beginning of <head> ensures the browser decodes all subsequent characters including page title correctly.',
        expVi: 'Đặt charset ở đầu <head> giúp trình duyệt giải mã chính xác tất cả ký tự tiếp theo kể cả tiêu đề trang.'
      },
      {
        qEn: 'Which element contains the actual visible content displayed inside the browser viewport?',
        qVi: 'Thẻ nào chứa toàn bộ nội dung hiển thị trực tiếp cho người dùng trong khung nhìn trình duyệt?',
        options: [
          { en: '<body>', vi: '<body>' },
          { en: '<head>', vi: '<head>' },
          { en: '<title>', vi: '<title>' },
          { en: '<meta>', vi: '<meta>' }
        ],
        ans: 0,
        expEn: '<body> holds all renderable DOM elements, whereas <head> holds document metadata and links.',
        expVi: '<body> chứa toàn bộ phần tử DOM hiển thị, trong khi <head> chứa siêu dữ liệu và liên kết tệp.'
      },
      {
        qEn: 'What is the role of the <title> tag in the <head>?',
        qVi: 'Vai trò của thẻ <title> trong <head> là gì?',
        options: [
          { en: 'Defines the tab title in browser UI, search engine SERP snippet title, and bookmark name', vi: 'Xác định tên tab trên trình duyệt, tiêu đề kết quả tìm kiếm Google và tên bookmark' },
          { en: 'Renders the top large headline on the web page body', vi: 'Hiển thị tiêu đề lớn nhất ở đầu trang web' },
          { en: 'Configures the domain name registration on DNS', vi: 'Cấu hình đăng ký tên miền trên máy chủ DNS' },
          { en: 'Sets the tooltip text when hovering over links', vi: 'Tạo văn bản gợi ý khi rê chuột qua các liên kết' }
        ],
        ans: 0,
        expEn: '<title> sets the browser window/tab text and primary search engine listing headline.',
        expVi: '<title> đặt tên tab trình duyệt và tiêu đề hiển thị trên kết quả tìm kiếm của Google.'
      },
      {
        qEn: 'Is HTML case-sensitive for element tag names in HTML5?',
        qVi: 'Trong chuẩn HTML5, tên thẻ phần tử có phân biệt chữ hoa chữ thường không?',
        options: [
          { en: 'HTML5 is case-insensitive, but lowercase tags (e.g. <div>) are the strict industry best practice', vi: 'HTML5 không phân biệt hoa thường, nhưng viết thường (như <div>) là chuẩn bắt buộc trong thực tế' },
          { en: 'HTML5 requires all tags to be written in UPPERCASE', vi: 'HTML5 bắt buộc tất cả thẻ phải viết HOA' },
          { en: 'Tags are case-sensitive only inside the <head> element', vi: 'Thẻ chỉ phân biệt hoa thường khi nằm trong <head>' },
          { en: 'Uppercase is required for semantic elements like <MAIN>', vi: 'Chữ hoa là bắt buộc đối với thẻ ngữ nghĩa như <MAIN>' }
        ],
        ans: 0,
        expEn: 'HTML5 parses <DIV>, <div>, and <Div> identically, but lowercase is the universal standard for consistency and XHTML/XML compatibility.',
        expVi: 'HTML5 xử lý hoa thường như nhau, nhưng quy ước viết thường là chuẩn quốc tế để duy trì tính nhất quán.'
      },
      {
        qEn: 'Which tag is an empty (void) self-closing element in HTML5?',
        qVi: 'Thẻ nào sau đây là thẻ rỗng (void element) tự đóng trong HTML5?',
        options: [
          { en: '<meta>', vi: '<meta>' },
          { en: '<title>', vi: '<title>' },
          { en: '<p>', vi: '<p>' },
          { en: '<h1>', vi: '<h1>' }
        ],
        ans: 0,
        expEn: '<meta>, <img>, <br>, <hr>, and <input> are void elements and cannot have closing tags or child nodes.',
        expVi: '<meta>, <img>, <br>, <hr> và <input> là các void element không có thẻ đóng và không chứa thẻ con.'
      },
      {
        qEn: 'What happens if <!DOCTYPE html> is missing from an HTML document?',
        qVi: 'Điều gì xảy ra nếu tài liệu HTML thiếu khai báo <!DOCTYPE html>?',
        options: [
          { en: 'The browser renders in Quirks Mode, potentially breaking layout and box sizing behavior', vi: 'Trình duyệt chuyển sang chế độ Quirks Mode, dễ làm vỡ bố cục và sai lệch box model' },
          { en: 'The browser refuses to load any images or text', vi: 'Trình duyệt từ chối tải tất cả hình ảnh và văn bản' },
          { en: 'The server returns a 500 Internal Server Error', vi: 'Máy chủ phản hồi mã lỗi 500 Internal Server Error' },
          { en: 'JavaScript files are blocked by the firewall', vi: 'Tệp JavaScript bị chặn bởi tường lửa' }
        ],
        ans: 0,
        expEn: 'Without a doctype, browsers emulate bugs in 1990s legacy browsers via Quirks Mode.',
        expVi: 'Nếu thiếu doctype, trình duyệt sẽ mô phỏng lại các lỗi của trình duyệt thập niên 1990 qua chế độ Quirks Mode.'
      },
      {
        qEn: 'Which HTML comment syntax is valid and ignored by the browser renderer?',
        qVi: 'Cú pháp ghi chú (comment) nào sau đây là chuẩn và được trình duyệt bỏ qua không hiển thị?',
        options: [
          { en: '<!-- This is a comment -->', vi: '<!-- This is a comment -->' },
          { en: '// This is a comment', vi: '// This is a comment' },
          { en: '/* This is a comment */', vi: '/* This is a comment */' },
          { en: '# This is a comment', vi: '# This is a comment' }
        ],
        ans: 0,
        expEn: 'HTML comments use <!-- and --> delimiters.',
        expVi: 'Ghi chú trong HTML bắt đầu bằng <!-- và kết thúc bằng -->.'
      },
      {
        qEn: 'What is the correct attribute to specify character encoding in HTML5?',
        qVi: 'Thuộc tính chuẩn để chỉ định bảng mã ký tự trong HTML5 là gì?',
        options: [
          { en: '<meta charset="UTF-8">', vi: '<meta charset="UTF-8">' },
          { en: '<meta encoding="UTF-8">', vi: '<meta encoding="UTF-8">' },
          { en: '<html charset="UTF-8">', vi: '<html charset="UTF-8">' },
          { en: '<charset value="UTF-8">', vi: '<charset value="UTF-8">' }
        ],
        ans: 0,
        expEn: 'HTML5 simplified the older verbose http-equiv syntax to concise <meta charset="UTF-8">.',
        expVi: 'HTML5 rút gọn cú pháp dài dòng cũ thành thẻ ngắn gọn <meta charset="UTF-8">.'
      },
      {
        qEn: 'What is the root container of an HTML document hierarchy called in the DOM?',
        qVi: 'Thẻ gốc bao bọc toàn bộ cây phân cấp của tài liệu HTML trong DOM tên là gì?',
        options: [
          { en: '<html>', vi: '<html>' },
          { en: '<root>', vi: '<root>' },
          { en: '<document>', vi: '<document>' },
          { en: '<main>', vi: '<main>' }
        ],
        ans: 0,
        expEn: '<html> wraps all head and body content and is the top-level element of any HTML document.',
        expVi: 'Thẻ <html> bao bọc toàn bộ nội dung head và body, là phần tử cấp cao nhất của tài liệu HTML.'
      },
      {
        qEn: 'Which meta tag provides a short summary displayed under search engine results?',
        qVi: 'Thẻ meta nào cung cấp đoạn tóm tắt ngắn hiển thị bên dưới tiêu đề trên Google Tìm kiếm?',
        options: [
          { en: '<meta name="description" content="...">', vi: '<meta name="description" content="...">' },
          { en: '<meta name="summary" content="...">', vi: '<meta name="summary" content="...">' },
          { en: '<meta name="keywords" content="...">', vi: '<meta name="keywords" content="...">' },
          { en: '<meta name="snippet" content="...">', vi: '<meta name="snippet" content="...">' }
        ],
        ans: 0,
        expEn: 'meta name="description" gives search engines the summary snippet for search result listings.',
        expVi: 'meta name="description" cung cấp đoạn trích mô tả cho các công cụ tìm kiếm hiển thị kết quả.'
      },
      {
        qEn: 'Can multiple <head> elements exist inside a single valid HTML document?',
        qVi: 'Có thể có nhiều thẻ <head> bên trong một tài liệu HTML hợp lệ không?',
        options: [
          { en: 'No, an HTML document can only contain exactly one <head> element', vi: 'Không, một tài liệu HTML chỉ được phép có duy nhất một thẻ <head>' },
          { en: 'Yes, one for metadata and one for script tags', vi: 'Có, một cho siêu dữ liệu và một cho thẻ script' },
          { en: 'Yes, if one is placed inside the <body>', vi: 'Có, nếu đặt một thẻ bên trong <body>' },
          { en: 'Yes, in responsive multi-column layouts', vi: 'Có, trong bố cục nhiều cột responsive' }
        ],
        ans: 0,
        expEn: 'W3C HTML specification requires exactly one <head> directly inside <html>.',
        expVi: 'Quy chuẩn W3C quy định chỉ có duy nhất một thẻ <head> là con trực tiếp của <html>.'
      },
      {
        qEn: 'Why is standard indentation and formatting recommended in HTML source code?',
        qVi: 'Tại sao nên thụt lề và định dạng chuẩn trong mã nguồn HTML?',
        options: [
          { en: 'Improves maintainability, readability, and clarifies parent-child DOM nesting', vi: 'Tăng tính dễ đọc, dễ bảo trì và làm rõ quan hệ cha-con lồng nhau trong cây DOM' },
          { en: 'Indentation is strictly required by the HTML5 parser like Python', vi: 'Thụt lề là bắt buộc như ngôn ngữ Python nếu không sẽ báo lỗi' },
          { en: 'Reduces the memory usage of the browser parser', vi: 'Giúp tiết kiệm bộ nhớ RAM khi trình duyệt đọc mã' },
          { en: 'Automatically minifies the file during transmission', vi: 'Tự động nén dung lượng tệp khi truyền tải qua mạng' }
        ],
        ans: 0,
        expEn: 'Whitespace is collapsed by HTML engines, but structured indentation is essential for engineering team collaboration.',
        expVi: 'Khoảng trắng được trình duyệt gom nhóm lại, nhưng thụt dòng chuẩn là tối quan trọng cho làm việc nhóm.'
      },
      {
        qEn: 'What is the standard file extension for HTML documents served over the web?',
        qVi: 'Đuôi tệp (phần mở rộng) tiêu chuẩn cho các tài liệu HTML trên web là gì?',
        options: [
          { en: '.html or .htm', vi: '.html hoặc .htm' },
          { en: '.web', vi: '.web' },
          { en: '.markup', vi: '.markup' },
          { en: '.dom', vi: '.dom' }
        ],
        ans: 0,
        expEn: '.html is the universal file extension served with text/html MIME type.',
        expVi: '.html là phần mở rộng phổ biến nhất tương ứng với kiểu MIME text/html.'
      }
    ]
  },

  // Lesson 2: Text Hierarchy, Headings, Paragraphs & Formatting
  {
    order: 2,
    id: 'html_lesson_2',
    moduleId: 'html_mod_1',
    levelId: 'basic',
    topicId: 'html_text',
    titleEn: 'Text Hierarchy: Headings (h1-h6), Paragraphs & Semantic Text Formatting',
    titleVi: 'Phân Cấp Văn Bản: Tiêu Đề (h1-h6), Đoạn Văn & Định Dạng Ngữ Nghĩa',
    summaryEn: 'Learn proper heading hierarchy (h1 through h6), paragraph semantics (<p>), line breaks (<br>), thematic breaks (<hr>), and semantic text formatting (<strong>, <em>, <mark>, <small>, <code>, <kbd>, <sub>, <sup>).',
    summaryVi: 'Học phân cấp tiêu đề chuẩn (h1 đến h6), ngữ nghĩa đoạn văn (<p>), ngắt dòng (<br>), vạch ngăn (<hr>) và định dạng văn bản ngữ nghĩa (<strong>, <em>, <mark>, <small>, <code>, <kbd>, <sub>, <sup>).',
    introEn: 'Text is the core communicative medium of the World Wide Web. Structuring text with meaningful headings and semantic formatting ensures both human readers and search engines can effortlessly parse your content.',
    introVi: 'Văn bản là phương tiện truyền tải thông tin cốt lõi của Web. Việc tổ chức văn bản với các tiêu đề phân cấp và định dạng ngữ nghĩa giúp người đọc và máy tìm kiếm dễ dàng tiếp nhận nội dung.',
    conceptEn: 'Heading levels range from <h1> (highest importance, page topic) to <h6> (lowest importance). Never skip heading levels (e.g. from <h1> directly to <h3>). For text emphasis, use <strong> (serious importance/urgency) and <em> (stress emphasis) rather than visual-only tags like <b> and <i>. Use <code> for inline code snippets, <kbd> for keyboard inputs, <mark> for highlighted search terms, <small> for copyright disclaimers, and <sub>/<sup> for chemical formulas and math exponents.',
    conceptVi: 'Thứ bậc tiêu đề từ <h1> (quan trọng nhất, chủ đề trang) đến <h6> (chi tiết nhất). Không nên nhảy cóc thứ bậc tiêu đề (từ <h1> nhảy xuống <h3>). Để nhấn mạnh ngữ nghĩa, dùng <strong> (mức độ quan trọng cao) và <em> (nhấn giọng) thay vì thẻ thuần hình ảnh <b> và <i>. Dùng <code> cho mã nguồn ngắn, <kbd> cho phím bấm, <mark> cho bôi sáng từ khóa, <small> cho điều khoản nhỏ và <sub>/<sup> cho công thức hóa học, số mũ.',
    syntax: '<h1>Primary Page Headline</h1>\n<section>\n  <h2>Section Heading</h2>\n  <p>Standard paragraph with <strong>bold importance</strong> and <em>italic stress</em>.</p>\n  <p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save or run <code>npm run build</code>.</p>\n  <hr>\n  <small>&copy; 2026 4TM Academy</small>\n</section>',
    example1TitleEn: 'Semantic Tech Article with Formatting',
    example1TitleVi: 'Bài Viết Kỹ Thuật Với Định Dạng Ngữ Nghĩa',
    example1Code: '<article>\n  <h1>JavaScript Runtime Fundamentals</h1>\n  <p>The JavaScript engine executes code on a <strong>single thread</strong> using the <em>event loop</em> model.</p>\n  <h2>Common Commands</h2>\n  <p>To start development, execute <code>npm run dev</code> in your terminal.</p>\n  <p>Shortcuts: Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to terminate.</p>\n  <p>Water formula is H<sub>2</sub>O and area is calculated as r<sup>2</sup>.</p>\n</article>',
    example1ExpEn: 'Combines headings hierarchy, strong/em semantic emphasis, code/kbd technical tags, and sub/sup notations.',
    example1ExpVi: 'Kết hợp tiêu đề phân cấp, thẻ nhấn mạnh strong/em, thẻ kỹ thuật code/kbd và chỉ số trên/dưới sub/sup.',
    example2TitleEn: 'Editorial Note with Highlighting and Disclaimers',
    example2TitleVi: 'Ghi Chú Biên Tập Với Bôi Sáng & Điều Khoản Phụ',
    example2Code: '<section>\n  <h2>System Security Notice</h2>\n  <p>Always verify the <mark>SSL Certificate</mark> before entering sensitive credentials.</p>\n  <hr>\n  <p><small>Disclaimer: 4TM will never ask for your private encryption keys.</small></p>\n</section>',
    example2ExpEn: 'Demonstrates <mark> for relevance highlighting and <small> for legal/security disclaimers.',
    example2ExpVi: 'Minh họa dùng <mark> để làm nổi bật từ khóa quan trọng và <small> cho phần cảnh báo bản quyền.',
    mistake1En: 'Using <h1> purely to make text look larger on the screen',
    mistake1Vi: 'Dùng thẻ <h1> chỉ để làm chữ to hơn trên màn hình',
    correction1En: 'Use CSS font-size for visual presentation; reserve <h1> for the single structural title of the page.',
    correction1Vi: 'Hãy dùng thuộc tính CSS font-size để chỉnh kích thước; giữ <h1> cho tiêu đề cấu trúc duy nhất của trang.',
    practiceTaskEn: 'Format a Software Release Note',
    practiceTaskVi: 'Định dạng thông báo phiên bản phần mềm',
    practiceInstEn: 'Create a structure with <h1>Release v2.0</h1>, <h2>Key Highlights</h2>, a paragraph with <strong>Zero-downtime</strong> and <em>fast compilation</em>, and a command <code>npm install 4tm-core</code>.',
    practiceInstVi: 'Tạo cấu trúc với <h1>Release v2.0</h1>, <h2>Key Highlights</h2>, đoạn văn có <strong>Zero-downtime</strong> và <em>fast compilation</em>, cùng lệnh <code>npm install 4tm-core</code>.',
    practiceStarter: '<h1>Release v2.0</h1>\n<!-- Add h2, paragraph with formatting, and code element -->',
    practiceSolution: '<h1>Release v2.0</h1>\n<h2>Key Highlights</h2>\n<p>Enjoy <strong>Zero-downtime</strong> deploys and <em>fast compilation</em>.</p>\n<p>Run <code>npm install 4tm-core</code> to update.</p>',
    practiceHintEn: 'Include <h2>Key Highlights</h2>, <strong>, <em>, and <code>npm install 4tm-core</code>.',
    practiceHintVi: 'Bao gồm <h2>Key Highlights</h2>, <strong>, <em> và <code>npm install 4tm-core</code>.',

    ex1: {
      titleEn: 'Create Sequential Headings Hierarchy',
      titleVi: 'Tạo Thứ Bậc Tiêu Đề Tuần Tự',
      instEn: 'Add an <h1> title "Cloud Infrastructure", followed by an <h2> "Serverless Architecture", and an <h3> "Edge Functions".',
      instVi: 'Thêm tiêu đề <h1> "Cloud Infrastructure", theo sau là <h2> "Serverless Architecture" và <h3> "Edge Functions".',
      starter: '<!-- Add h1, h2, and h3 elements -->\n',
      solution: '<h1>Cloud Infrastructure</h1>\n<h2>Serverless Architecture</h2>\n<h3>Edge Functions</h3>',
      hintEn: 'Use <h1>, <h2>, and <h3> in sequential descending order.',
      hintVi: 'Sử dụng lần lượt các thẻ <h1>, <h2> và <h3> theo thứ tự tuần tự.',
      expEn: 'Sequential heading hierarchies ensure accessible page navigation.',
      expVi: 'Thứ bậc tiêu đề tuần tự giúp các công nghệ đọc hỗ trợ định hướng nội dung.'
    },
    ex2: {
      titleEn: 'Apply Strong and Emphasized Text',
      titleVi: 'Áp Dụng Nhấn Mạnh Strong Và Emphasize',
      instEn: 'Wrap the word "Critical" in <strong> and the word "immediately" in <em> inside the paragraph.',
      instVi: 'Bọc từ "Critical" trong <strong> và từ "immediately" trong <em> bên trong đoạn văn.',
      starter: '<p>Critical: Please update your dependencies immediately.</p>',
      solution: '<p><strong>Critical</strong>: Please update your dependencies <em>immediately</em>.</p>',
      hintEn: 'Use <strong>Critical</strong> and <em>immediately</em>.',
      hintVi: 'Dùng <strong>Critical</strong> và <em>immediately</em>.',
      expEn: '<strong> conveys semantic importance, while <em> adds stress emphasis.',
      expVi: '<strong> mang ý nghĩa quan trọng cao, còn <em> dùng để nhấn giọng.'
    },
    ex3: {
      titleEn: 'Format Keyboard Shortcuts and Code Snippets',
      titleVi: 'Định Dạng Phím Tắt Và Đoạn Mã Nguồn',
      instEn: 'Wrap "git commit" in <code> and "Enter" in <kbd>.',
      instVi: 'Bọc "git commit" trong <code> và "Enter" trong <kbd>.',
      starter: '<p>Type git commit and press Enter to complete.</p>',
      solution: '<p>Type <code>git commit</code> and press <kbd>Enter</kbd> to complete.</p>',
      hintEn: 'Use <code>git commit</code> and <kbd>Enter</kbd>.',
      hintVi: 'Dùng <code>git commit</code> và <kbd>Enter</kbd>.',
      expEn: '<code> represents computer code, and <kbd> represents user keyboard input.',
      expVi: '<code> biểu diễn mã máy tính, còn <kbd> biểu thị phím bấm của người dùng.'
    },
    ex4: {
      titleEn: 'Render Chemical Formulas and Mathematical Exponents',
      titleVi: 'Biểu Diễn Công Thức Hóa Học Và Số Mũ Toán Học',
      instEn: 'Render Carbon Dioxide as CO<sub>2</sub> and Einstein equation as E = mc<sup>2</sup>.',
      instVi: 'Hiển thị khí CO2 là CO<sub>2</sub> và phương trình Einstein là E = mc<sup>2</sup>.',
      starter: '<p>Carbon dioxide: CO2</p>\n<p>Energy formula: E = mc2</p>',
      solution: '<p>Carbon dioxide: CO<sub>2</sub></p>\n<p>Energy formula: E = mc<sup>2</sup></p>',
      hintEn: 'Use <sub>2</sub> for subscript and <sup>2</sup> for superscript.',
      hintVi: 'Dùng <sub>2</sub> cho chỉ số dưới và <sup>2</sup> cho số mũ trên.',
      expEn: '<sub> creates subscript and <sup> creates superscript with mathematical precision.',
      expVi: '<sub> tạo chỉ số chân dưới và <sup> tạo số mũ trên đúng quy chuẩn.'
    },
    ex5: {
      titleEn: 'Add Thematic Break and Small Print',
      titleVi: 'Thêm Vạch Phân Cách Và Điều Khoản Nhỏ',
      instEn: 'Add an <hr> thematic break below the article and a <small> tag containing "&copy; 2026 4TM Inc.".',
      instVi: 'Thêm vạch phân cách <hr> bên dưới bài viết và thẻ <small> chứa "&copy; 2026 4TM Inc.".',
      starter: '<article>\n  <h2>Terms of Service</h2>\n  <p>By using this service, you agree to our policies.</p>\n</article>\n<!-- Add hr and small here -->',
      solution: '<article>\n  <h2>Terms of Service</h2>\n  <p>By using this service, you agree to our policies.</p>\n</article>\n<hr>\n<small>&copy; 2026 4TM Inc.</small>',
      hintEn: 'Add <hr> and <small>&copy; 2026 4TM Inc.</small>.',
      hintVi: 'Thêm <hr> và <small>&copy; 2026 4TM Inc.</small>.',
      expEn: '<hr> represents a semantic topic shift and <small> represents fine print or disclaimers.',
      expVi: '<hr> biểu thị sự chuyển đổi chủ đề và <small> biểu thị điều khoản nhỏ.'
    },

    ch: {
      titleEn: 'Technical Documentation Article Layout',
      titleVi: 'Bố Cục Bài Viết Tài Liệu Kỹ Thuật',
      descEn: 'Build a comprehensive technical article featuring an <h1> title, an <h2> section with paragraphs, <strong>, <em>, <code> snippets, a <kbd> shortcut tip, a <mark> highlighted note, and a <small> copyright notice separated by <hr>.',
      descVi: 'Xây dựng bài viết kỹ thuật toàn diện gồm tiêu đề <h1>, phần <h2> có các đoạn văn, nhấn mạnh <strong>, <em>, đoạn mã <code>, phím tắt <kbd>, ghi chú bôi sáng <mark> và bản quyền <small> ngăn cách bởi <hr>.',
      starter: '<!-- Build the complete technical article below -->\n',
      solution: '<article>\n  <h1>Modern Web APIs & Asynchronous Patterns</h1>\n  <section>\n    <h2>The Fetch API</h2>\n    <p>The <strong>Fetch API</strong> provides an <em>asynchronous</em> interface for fetching resources across the network.</p>\n    <p>Invoke <code>fetch(\'/api/data\')</code> to return a Promise.</p>\n    <p>Shortcut: Press <kbd>F12</kbd> to inspect network requests in DevTools.</p>\n    <p><mark>Important:</mark> Always handle network rejection errors with catch blocks.</p>\n  </section>\n  <hr>\n  <footer>\n    <small>&copy; 2026 4TM Engineering. All rights reserved.</small>\n  </footer>\n</article>',
      expEn: 'This article demonstrates rich semantic text formatting and complete typographic hierarchy.',
      expVi: 'Bài viết minh họa đầy đủ kỹ thuật định dạng văn bản ngữ nghĩa và phân cấp kiểu chữ chuẩn.'
    },
    chV1: {
      titleEn: 'Variant 1: Scientific Journal Paper Excerpt',
      titleVi: 'Biến Thể 1: Đoạn Trích Bài Báo Khoa Học',
      descEn: 'Create a scientific excerpt with <h1>Quantum Chemistry</h1>, <h2>Molecular Formula</h2>, chemical formula H<sub>2</sub>SO<sub>4</sub>, equation E = hv<sup>2</sup>, and <small>Peer reviewed</small>.',
      descVi: 'Tạo đoạn trích khoa học với <h1>Quantum Chemistry</h1>, <h2>Molecular Formula</h2>, công thức hóa học H<sub>2</sub>SO<sub>4</sub>, phương trình E = hv<sup>2</sup> và <small>Peer reviewed</small>.',
      starter: '<!-- Build scientific excerpt layout -->\n',
      solution: '<article>\n  <h1>Quantum Chemistry</h1>\n  <section>\n    <h2>Molecular Formula</h2>\n    <p>Sulfuric acid is denoted as H<sub>2</sub>SO<sub>4</sub> in standard chemistry.</p>\n    <p>Frequency energy is described by E = hv<sup>2</sup>.</p>\n  </section>\n  <hr>\n  <small>Peer reviewed article &copy; 2026 Science Lab</small>\n</article>',
      expEn: 'Accurately displays chemical subscripts and mathematical superscripts.',
      expVi: 'Hiển thị chính xác các chỉ số hóa học và số mũ toán học.'
    },
    chV2: {
      titleEn: 'Variant 2: Command Line CLI Quickstart Guide',
      titleVi: 'Biến Thể 2: Hướng Dẫn Nhanh Dòng Lệnh CLI',
      descEn: 'Create a CLI guide with <h1>Git Command Guide</h1>, <h2>Staging Changes</h2>, <code>git add .</code>, shortcut <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>, and a <mark>Caution</mark> badge.',
      descVi: 'Tạo hướng dẫn CLI với <h1>Git Command Guide</h1>, <h2>Staging Changes</h2>, <code>git add .</code>, phím tắt <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> và nhãn <mark>Caution</mark>.',
      starter: '<!-- Build CLI quickstart guide -->\n',
      solution: '<article>\n  <h1>Git Command Guide</h1>\n  <section>\n    <h2>Staging Changes</h2>\n    <p>Execute <code>git add .</code> to stage all modified files.</p>\n    <p>Open command palette via <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>.</p>\n    <p><mark>Caution:</mark> Never commit unencrypted secrets.</p>\n  </section>\n</article>',
      expEn: 'Effective technical documentation utilizing code, kbd, and mark tags.',
      expVi: 'Tài liệu kỹ thuật rõ ràng sử dụng các thẻ code, kbd và mark.'
    },

    quizzes: [
      {
        qEn: 'How many <h1> heading elements should generally exist per individual web page?',
        qVi: 'Thông thường nên có bao nhiêu thẻ tiêu đề <h1> trên một trang web duy nhất?',
        options: [
          { en: 'Exactly one primary <h1> describing the main subject of the page', vi: 'Duy nhất một thẻ <h1> chính mô tả chủ đề của trang' },
          { en: 'One <h1> per paragraph', vi: 'Mỗi đoạn văn một thẻ <h1>' },
          { en: 'As many as needed to make text look big', vi: 'Bao nhiêu cũng được miễn là chữ to' },
          { en: 'None, <h1> is deprecated in HTML5', vi: 'Không có, <h1> đã bị loại bỏ trong HTML5' }
        ],
        ans: 0,
        expEn: 'A single <h1> establishes the document core topic for accessibility outlines and search engine indexing.',
        expVi: 'Một thẻ <h1> duy nhất xác định chủ đề trọng tâm của trang cho cấu trúc trợ năng và SEO.'
      },
      {
        qEn: 'What is the semantic difference between <strong> and <b> in HTML5?',
        qVi: 'Sự khác biệt về mặt ngữ nghĩa giữa thẻ <strong> và <b> trong HTML5 là gì?',
        options: [
          { en: '<strong> indicates strong importance/urgency for screen readers, while <b> is purely visual bold styling without semantic weight', vi: '<strong> thể hiện mức độ quan trọng/khẩn cấp cho trình đọc màn hình, còn <b> chỉ in đậm trực quan không mang nghĩa' },
          { en: '<b> is modern HTML5 while <strong> is obsolete', vi: '<b> là chuẩn HTML5 mới còn <strong> đã lỗi thời' },
          { en: '<strong> is only used for numerical values', vi: '<strong> chỉ dùng cho các giá trị số' },
          { en: '<b> renders red color while <strong> renders black', vi: '<b> hiển thị màu đỏ còn <strong> hiển thị màu đen' }
        ],
        ans: 0,
        expEn: '<strong> represents high semantic importance, whereas <b> is purely typographic presentation.',
        expVi: '<strong> biểu thị tầm quan trọng ngữ nghĩa, trong khi <b> thuần túy là định dạng hiển thị.'
      },
      {
        qEn: 'What is the semantic purpose of the <em> element?',
        qVi: 'Mục đích ngữ nghĩa của thẻ <em> là gì?',
        options: [
          { en: 'Represents stress emphasis that alters the spoken tone and verbal meaning of a sentence', vi: 'Biểu thị nhấn mạnh ngữ điệu (stress emphasis) làm thay đổi giọng đọc và sắc thái câu' },
          { en: 'Creates an email hyperlink automatically', vi: 'Tự động tạo liên kết gửi email' },
          { en: 'Embeds an external multimedia player', vi: 'Nhúng trình phát đa phương tiện bên ngoài' },
          { en: 'Calculates the root em typography unit', vi: 'Tính toán đơn vị kiểu chữ em' }
        ],
        ans: 0,
        expEn: '<em> alters screen reader verbal inflection to stress a specific word.',
        expVi: '<em> làm thay đổi ngữ điệu đọc của phần mềm trợ thính để nhấn mạnh từ ngữ.'
      },
      {
        qEn: 'Which HTML element is specifically designed for inline code snippets like function names or variables?',
        qVi: 'Thẻ HTML nào được thiết kế riêng để hiển thị các đoạn mã nguồn ngắn như tên hàm hoặc biến?',
        options: [
          { en: '<code>', vi: '<code>' },
          { en: '<script>', vi: '<script>' },
          { en: '<syntax>', vi: '<syntax>' },
          { en: '<program>', vi: '<program>' }
        ],
        ans: 0,
        expEn: '<code> semantically marks computer code fragments inside running text.',
        expVi: '<code> đánh dấu các đoạn mã máy tính lồng trong văn bản.'
      },
      {
        qEn: 'Which HTML element represents user keyboard input, keystrokes, or voice commands?',
        qVi: 'Thẻ HTML nào đại diện cho phím bấm bàn phím, tổ hợp phím hoặc lệnh thoại từ người dùng?',
        options: [
          { en: '<kbd>', vi: '<kbd>' },
          { en: '<key>', vi: '<key>' },
          { en: '<button>', vi: '<button>' },
          { en: '<input>', vi: '<input>' }
        ],
        ans: 0,
        expEn: '<kbd> represents user keyboard input such as <kbd>Ctrl</kbd> + <kbd>C</kbd>.',
        expVi: '<kbd> biểu thị phím bấm của người dùng như <kbd>Ctrl</kbd> + <kbd>C</kbd>.'
      },
      {
        qEn: 'What is the correct HTML element for highlighted or referenced text (e.g. search keyword match)?',
        qVi: 'Thẻ HTML nào dùng để làm nổi bật hoặc đánh dấu từ khóa tìm kiếm trong văn bản?',
        options: [
          { en: '<mark>', vi: '<mark>' },
          { en: '<highlight>', vi: '<highlight>' },
          { en: '<yellow>', vi: '<yellow>' },
          { en: '<glow>', vi: '<glow>' }
        ],
        ans: 0,
        expEn: '<mark> indicates text highlighted for relevance or reference in another context.',
        expVi: '<mark> làm nổi bật văn bản do có sự liên quan hoặc khớp từ khóa tìm kiếm.'
      },
      {
        qEn: 'What does the <hr> element represent in HTML5?',
        qVi: 'Thẻ <hr> đại diện cho điều gì trong chuẩn HTML5?',
        options: [
          { en: 'A thematic break or topic transition between paragraphs of a section', vi: 'Một vạch phân cách chuyển đổi chủ đề ngữ nghĩa giữa các đoạn văn trong một phần' },
          { en: 'A hard reboot of the browser window', vi: 'Khởi động lại cửa sổ trình duyệt' },
          { en: 'An hourly timestamp log', vi: 'Ghi nhật ký mốc thời gian theo giờ' },
          { en: 'A high-resolution image banner', vi: 'Hình ảnh biểu ngữ độ phân giải cao' }
        ],
        ans: 0,
        expEn: 'In HTML5, <hr> is a semantic thematic break between paragraph-level topics.',
        expVi: 'Trong HTML5, <hr> là điểm ngắt chuyển tiếp chủ đề giữa các đoạn văn.'
      },
      {
        qEn: 'Which element is used for chemical formulas like CO₂ where the number 2 is positioned below baseline?',
        qVi: 'Thẻ nào dùng cho công thức hóa học như CO₂ với số 2 nằm thấp hơn dòng chữ?',
        options: [
          { en: '<sub>', vi: '<sub>' },
          { en: '<sup>', vi: '<sup>' },
          { en: '<down>', vi: '<down>' },
          { en: '<foot>', vi: '<foot>' }
        ],
        ans: 0,
        expEn: '<sub> produces subscript characters positioned below normal text baseline.',
        expVi: '<sub> tạo ký tự chỉ số chân nằm phía dưới đường cơ sở văn bản.'
      },
      {
        qEn: 'Which element is used for mathematical exponents like x² where the number 2 is positioned above baseline?',
        qVi: 'Thẻ nào dùng cho số mũ toán học như x² với số 2 nằm cao hơn dòng chữ?',
        options: [
          { en: '<sup>', vi: '<sup>' },
          { en: '<sub>', vi: '<sub>' },
          { en: '<top>', vi: '<top>' },
          { en: '<power>', vi: '<power>' }
        ],
        ans: 0,
        expEn: '<sup> produces superscript characters positioned above normal text baseline.',
        expVi: '<sup> tạo ký tự số mũ nằm phía trên đường cơ sở văn bản.'
      },
      {
        qEn: 'What is the semantic purpose of the <small> element in modern HTML5?',
        qVi: 'Mục đích ngữ nghĩa của thẻ <small> trong chuẩn HTML5 hiện đại là gì?',
        options: [
          { en: 'Side comments, copyright notices, and legal disclaimers (fine print)', vi: 'Ghi chú phụ, thông báo bản quyền và các điều khoản pháp lý nhỏ' },
          { en: 'Only to reduce font size to 10px in CSS', vi: 'Chỉ để giảm cỡ chữ xuống 10px trong CSS' },
          { en: 'Renders text on mobile watches only', vi: 'Chỉ hiển thị trên màn hình đồng hồ thông minh' },
          { en: 'Compresses payload size of the text node', vi: 'Nén dung lượng truyền tải của chuỗi ký tự' }
        ],
        ans: 0,
        expEn: '<small> represents small print, legal conditions, and copyright declarations.',
        expVi: '<small> đại diện cho văn bản điều khoản pháp lý và thông báo bản quyền.'
      },
      {
        qEn: 'Why should you avoid skipping heading levels (e.g. jumping from <h1> directly to <h4>)?',
        qVi: 'Tại sao không nên nhảy cóc thứ bậc tiêu đề (ví dụ từ <h1> nhảy thẳng xuống <h4>)?',
        options: [
          { en: 'It breaks document outline navigation for screen reader users and impairs SEO indexing', vi: 'Nó làm vỡ cấu trúc mục lục trang cho người dùng trình đọc màn hình và giảm điểm SEO' },
          { en: 'The browser parser will throw a fatal JavaScript runtime error', vi: 'Trình duyệt sẽ báo lỗi JavaScript nghiêm trọng' },
          { en: 'The text will fail to render entirely', vi: 'Văn bản sẽ không thể hiển thị trên màn hình' },
          { en: 'It triggers Quirks Mode in the layout engine', vi: 'Nó kích hoạt chế độ Quirks Mode trong trình duyệt' }
        ],
        ans: 0,
        expEn: 'Headings create an accessible hierarchical document tree that assistive technologies rely on for jumping through sections.',
        expVi: 'Tiêu đề tạo nên cây mục lục phân cấp giúp công nghệ trợ thính điều hướng qua các phần.'
      },
      {
        qEn: 'What does the <br> tag do, and when should it be used?',
        qVi: 'Thẻ <br> có tác dụng gì và nên được sử dụng trong trường hợp nào?',
        options: [
          { en: 'Produces a line break within text (e.g. poems, physical addresses); should NOT be used to create empty spacing margins', vi: 'Tạo ngắt dòng trong văn bản (như thơ, địa chỉ nhà); KHÔNG nên dùng để tạo khoảng cách lề' },
          { en: 'Creates a full page break before printing', vi: 'Tạo ngắt trang trước khi in' },
          { en: 'Renders a solid black horizontal line', vi: 'Vẽ một đường kẻ ngang màu đen' },
          { en: 'Clears floated layout containers', vi: 'Xóa các phần tử float bố cục' }
        ],
        ans: 0,
        expEn: '<br> inserts a line break only where the division of lines is significant (like addresses or poetry).',
        expVi: '<br> chỉ dùng để ngắt dòng ở những nơi việc xuống dòng mang ý nghĩa thực sự như địa chỉ hoặc thơ.'
      },
      {
        qEn: 'Which HTML element represents preformatted text preserving exact spaces and line breaks?',
        qVi: 'Thẻ HTML nào dùng để hiển thị văn bản giữ nguyên chính xác từng khoảng trắng và ngắt dòng?',
        options: [
          { en: '<pre>', vi: '<pre>' },
          { en: '<code>', vi: '<code>' },
          { en: '<raw>', vi: '<raw>' },
          { en: '<space>', vi: '<space>' }
        ],
        ans: 0,
        expEn: '<pre> preserves whitespace, tab stops, and newline characters exactly as authored.',
        expVi: '<pre> giữ nguyên toàn bộ khoảng trắng, tab và dấu xuống dòng như trong mã nguồn.'
      },
      {
        qEn: 'What is the semantic difference between <i> and <em>?',
        qVi: 'Sự khác biệt ngữ nghĩa giữa thẻ <i> và <em> là gì?',
        options: [
          { en: '<em> conveys stress emphasis affecting tone of voice; <i> represents text in an alternate voice or mood (e.g. taxonomic names, foreign terms) without extra emphasis', vi: '<em> nhấn mạnh ngữ điệu giọng đọc; <i> đại diện cho thuật ngữ chuyên ngành, tiếng nước ngoài hoặc tâm trạng khác mà không thêm nhấn mạnh' },
          { en: '<i> is italic and <em> is underline', vi: '<i> là in nghiêng còn <em> là gạch chân' },
          { en: '<i> is for icons only and <em> is for text', vi: '<i> chỉ dùng cho icon còn <em> dùng cho chữ' },
          { en: 'They are 100% identical in every specification', vi: 'Chúng hoàn toàn giống nhau 100%' }
        ],
        ans: 0,
        expEn: '<em> implies verbal stress emphasis, whereas <i> marks alternate voice or taxonomic terms.',
        expVi: '<em> mang ý nhấn giọng, còn <i> dùng cho tên khoa học hoặc từ mượn tiếng nước ngoài.'
      },
      {
        qEn: 'Which element is used to indicate text that has been inserted into a document during edits?',
        qVi: 'Thẻ nào dùng để biểu thị đoạn văn bản mới được chèn thêm vào tài liệu khi chỉnh sửa?',
        options: [
          { en: '<ins>', vi: '<ins>' },
          { en: '<add>', vi: '<add>' },
          { en: '<new>', vi: '<new>' },
          { en: '<plus>', vi: '<plus>' }
        ],
        ans: 0,
        expEn: '<ins> represents inserted text and <del> represents deleted text for change tracking.',
        expVi: '<ins> biểu diễn phần văn bản được thêm vào và <del> biểu diễn phần bị xóa khi theo dõi thay đổi.'
      },
      {
        qEn: 'Which element is used to mark text that has been deleted or strikethrough for revision history?',
        qVi: 'Thẻ nào dùng để biểu thị đoạn văn bản đã bị gạch bỏ (xóa) trong lịch sử chỉnh sửa tài liệu?',
        options: [
          { en: '<del>', vi: '<del>' },
          { en: '<strike>', vi: '<strike>' },
          { en: '<remove>', vi: '<remove>' },
          { en: '<cut>', vi: '<cut>' }
        ],
        ans: 0,
        expEn: '<del> represents removed or deleted content in revision workflows.',
        expVi: '<del> đại diện cho nội dung đã bị lược bỏ trong quá trình sửa đổi tài liệu.'
      }
    ]
  }
];
