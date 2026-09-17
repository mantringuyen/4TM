import { Game } from '../types';

export const GAMES: Game[] = [
  {
    id: 'binary-search',
    slug: 'binary-search-runner',
    title: 'Binary Search Runner',
    genre: {
      en: 'Algorithm & Logarithmic Deduction',
      vi: 'Thuật Toán & Suy Luận Logarit',
    },
    category: 'algorithms',
    difficulty: 'Casual',
    badge: 'O(log N)',
    accentColor: 'from-cyan-500 to-blue-700',
    rating: 4.9,
    playEstimate: '2-5 mins',
    description: {
      en: 'A fast-paced interactive number elimination duel. Given a search space of 1 to 1000, leverage binary search logic to locate the secret target in at most 10 logarithmic steps.',
      vi: 'Trò chơi đấu trí loại trừ không gian tìm kiếm. Trong khoảng từ 1 đến 1000, áp dụng thuật toán tìm kiếm nhị phân để bắt trúng số bí mật trong tối đa 10 bước logarit.',
    },
    objective: {
      en: 'Find the target number in fewer than 10 steps using optimal midpoint decisions.',
      vi: 'Tìm thấy số mục tiêu với ít hơn 10 bước bằng cách chọn điểm giữa tối ưu.',
    },
    controls: {
      en: ['Click Low/High suggestions', 'Keyboard Enter to submit custom guess', 'Reset for a new duel'],
      vi: ['Nhấn gợi ý Thấp/Cao', 'Nhấn Enter để đoán số tùy chọn', 'Chơi lại để bắt đầu lượt mới'],
    },
    techTags: ['Divide & Conquer', 'Binary Search', 'Log2 Math'],
  },
  {
    id: 'syntax-memory',
    slug: 'syntax-memory-matrix',
    title: 'Memory Matrix: Data Structures',
    genre: {
      en: 'Pattern Recognition & Memory',
      vi: 'Trí Nhớ & Ghép Đôi Cấu Trúc Dữ Liệu',
    },
    category: 'memory',
    difficulty: 'Casual',
    badge: 'O(1) Match',
    accentColor: 'from-purple-500 to-pink-700',
    rating: 4.8,
    playEstimate: '3-6 mins',
    description: {
      en: 'Flip cards and match core Computer Science data structures with their fundamental behavioral traits and algorithmic time bounds (e.g., LIFO <-> Stack, FIFO <-> Queue, O(1) <-> Hash Map).',
      vi: 'Lật thẻ bài và ghép đôi các cấu trúc dữ liệu kinh điển với đặc tính cốt lõi của chúng (LIFO <-> Stack, FIFO <-> Queue, O(1) <-> Hash Map, V & E <-> Graph).',
    },
    objective: {
      en: 'Uncover all matching data structure pairs with the lowest move count.',
      vi: 'Lật mở tất cả các cặp cấu trúc dữ liệu với số lượt lật ít nhất.',
    },
    controls: {
      en: ['Click any card to flip', 'Match identical pairs', 'Timer tracks your speed score'],
      vi: ['Nhấn vào thẻ để lật', 'Ghép đúng cặp tương ứng', 'Đồng hồ đếm thời gian tính điểm'],
    },
    techTags: ['Data Structures', 'Time Complexity', 'Card Flip Engine'],
  },
  {
    id: 'sorting-visualizer',
    slug: 'sorting-algorithm-visualizer',
    title: 'Sorting Arena: Visualizer & Challenge',
    genre: {
      en: 'Algorithm Mechanics & Speed Duel',
      vi: 'Đua Thuật Toán Sắp Xếp & Trực Quan Hóa',
    },
    category: 'visualizer',
    difficulty: 'Intermediate',
    badge: 'O(N log N)',
    accentColor: 'from-amber-500 to-orange-700',
    rating: 4.9,
    playEstimate: '5-10 mins',
    description: {
      en: 'Visualize and inspect the mechanics of classic sorting algorithms (Bubble Sort, Selection Sort, Quick Sort, Merge Sort). Scramble the array, adjust the speed slider, or manually step through comparisons and swaps.',
      vi: 'Mô phỏng trực quan cơ chế hoạt động của các thuật toán sắp xếp kinh điển (Bubble Sort, Selection Sort, Quick Sort, Merge Sort). Trộn mảng, tùy chỉnh tốc độ và quan sát từng bước so sánh.',
    },
    objective: {
      en: 'Compare time complexities and observe algorithmic partition boundaries in action.',
      vi: 'So sánh độ phức tạp thời gian và quan sát trực tiếp các ranh giới phân hoạch.',
    },
    controls: {
      en: ['Select algorithm', 'Shuffle array', 'Play / Pause visualizer', 'Speed slider control'],
      vi: ['Chọn thuật toán', 'Trộn ngẫu nhiên', 'Chạy / Tạm dừng mô phỏng', 'Thanh kéo tốc độ'],
    },
    techTags: ['Sorting', 'Array Manipulation', 'CSS Transitions'],
  },
  {
    id: 'regex-door',
    slug: 'regex-door-breaker',
    title: 'Regex Gatekeeper',
    genre: {
      en: 'Syntax & Pattern Matching Challenge',
      vi: 'Thử Thách Giải Mã Cửa Bằng Regex',
    },
    category: 'syntax',
    difficulty: 'Master',
    badge: 'Finite Automata',
    accentColor: 'from-rose-600 to-red-800',
    rating: 4.7,
    playEstimate: '5-15 mins',
    description: {
      en: 'Unlock cybernetic vault doors by crafting concise regular expressions that match all authorized access keys while strictly rejecting corrupted or intruder packets.',
      vi: 'Mở khóa cánh cửa bảo mật bằng cách viết biểu thức chính quy (Regex) chuẩn xác để khớp toàn bộ khóa hợp lệ và chặn đứng các chuỗi độc hại.',
    },
    objective: {
      en: 'Pass each room by writing a regular expression that satisfies 100% of test cases.',
      vi: 'Vượt qua từng phòng bằng cách nhập regex thỏa mãn 100% các ca kiểm thử.',
    },
    controls: {
      en: ['Input regex pattern', 'View live test strings match status', 'Click Unlock Gate'],
      vi: ['Nhập chuỗi regex', 'Xem trực tiếp trạng thái khớp mẫu', 'Nhấn Mở Cửa'],
    },
    techTags: ['Regular Expressions', 'Pattern Recognition', 'Validation Matrix'],
  },
];
