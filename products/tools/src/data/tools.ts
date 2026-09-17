import { ToolItem } from '../types';

export const TOOLS: ToolItem[] = [
  {
    id: 'base64',
    slug: 'base64-encoder-decoder',
    name: 'Base64 & URL Encoder / Decoder',
    tagline: {
      en: 'Real-time UTF-8 string, Base64, and URI component transformations',
      vi: 'Chuyển đổi chuỗi UTF-8, Base64 và URI component thời gian thực',
    },
    category: 'encoding',
    icon: 'Binary',
    badge: 'Realtime',
    accentColor: 'from-blue-600 to-indigo-700',
    description: {
      en: 'Encode and decode plain text into Base64 or URL-encoded safe strings with instantaneous live updates and character length statistics.',
      vi: 'Mã hóa và giải mã văn bản thuần sang định dạng Base64 hoặc URL-encoded với cập nhật tức thì và thống kê độ dài ký tự.',
    },
    keywords: ['base64', 'urlencode', 'decode', 'uri', 'utf8'],
  },
  {
    id: 'json',
    slug: 'json-formatter-validator',
    name: 'JSON Formatter & Validator',
    tagline: {
      en: 'Prettify, minify, validate, and inspect JSON payloads',
      vi: 'Làm đẹp, nén gọn, kiểm tra cú pháp và phân tích chuỗi JSON',
    },
    category: 'formatters',
    icon: 'FileJson',
    badge: 'Validator',
    accentColor: 'from-emerald-500 to-teal-700',
    description: {
      en: 'Format messy JSON with custom indentation, minify for production payload size, and pinpoint syntax errors with exact row/column warnings.',
      vi: 'Định dạng JSON với số khoảng trắng thụt lề tùy chọn, nén dung lượng và phát hiện lỗi cú pháp kèm thông báo chi tiết.',
    },
    keywords: ['json', 'pretty', 'format', 'minify', 'lint', 'validate'],
  },
  {
    id: 'hasher',
    slug: 'crypto-hash-generator',
    name: 'Cryptographic Hash Generator',
    tagline: {
      en: 'Compute SHA-256, SHA-512, SHA-1, and MD5 digests in Web Crypto',
      vi: 'Tính toán mã băm SHA-256, SHA-512, SHA-1 bằng Web Crypto API',
    },
    category: 'crypto',
    icon: 'ShieldCheck',
    badge: 'WebCrypto',
    accentColor: 'from-amber-500 to-orange-700',
    description: {
      en: 'Securely compute multi-algorithm cryptographic digests client-side without sending text or secrets across the network.',
      vi: 'Tính toán mã băm an toàn hoàn toàn trên trình duyệt người dùng bằng chuẩn Web Crypto API mà không truyền dữ liệu ra mạng.',
    },
    keywords: ['sha256', 'sha512', 'hash', 'crypto', 'digest', 'md5'],
  },
  {
    id: 'jwt',
    slug: 'jwt-inspector-debugger',
    name: 'JWT Debugger & Inspector',
    tagline: {
      en: 'Client-side JWT Header, Payload, Claims, and Expiry Decoder',
      vi: 'Giải mã Header, Payload, Claims và Hạn dùng của JWT trên trình duyệt',
    },
    category: 'network',
    icon: 'KeyRound',
    badge: 'Security',
    accentColor: 'from-purple-500 to-pink-600',
    description: {
      en: 'Inspect and debug JSON Web Tokens without exposing them to third-party endpoints. Parses iat, exp, sub, and custom claims instantly.',
      vi: 'Phân tích và kiểm tra token JWT mà không gửi dữ liệu đến máy chủ thứ ba. Tự động chuyển đổi các timestamp iat, exp thành ngày giờ dễ đọc.',
    },
    keywords: ['jwt', 'token', 'auth', 'claims', 'bearer', 'decode'],
  },
  {
    id: 'uuid',
    slug: 'uuid-v4-generator',
    name: 'Cryptographic UUID v4 Generator',
    tagline: {
      en: 'Bulk generate RFC 4122 compliant UUID v4 identifiers',
      vi: 'Tạo mã định danh duy nhất UUID v4 chuẩn RFC 4122 hàng loạt',
    },
    category: 'generators',
    icon: 'Fingerprint',
    badge: 'RFC 4122',
    accentColor: 'from-cyan-500 to-blue-600',
    description: {
      en: 'Generate bulk cryptographically strong UUIDs using crypto.randomUUID(). Customize uppercase, lowercase, and hyphens.',
      vi: 'Tạo hàng loạt mã định danh UUID v4 ngẫu nhiên bảo mật với crypto.randomUUID(), tùy chọn chữ hoa, chữ thường và gạch nối.',
    },
    keywords: ['uuid', 'guid', 'v4', 'random', 'generator', 'id'],
  },
  {
    id: 'timestamp',
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    tagline: {
      en: 'Convert Epoch seconds/milliseconds to ISO-8601 and UTC',
      vi: 'Chuyển đổi Epoch giây/mili-giây sang ISO-8601, UTC và giờ địa phương',
    },
    category: 'formatters',
    icon: 'Clock',
    badge: 'Epoch Time',
    accentColor: 'from-rose-500 to-red-700',
    description: {
      en: 'Convert Unix epoch timestamps to human-readable formats (UTC, Local, Relative Time) or generate timestamps from datetime pickers.',
      vi: 'Chuyển đổi dấu thời gian Unix sang định dạng ngày giờ dễ đọc (UTC, Địa phương, Thời gian tương đối) và ngược lại.',
    },
    keywords: ['timestamp', 'epoch', 'unix', 'time', 'iso8601', 'date'],
  },
];
