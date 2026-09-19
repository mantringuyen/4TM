import { Game } from '../types';

export const GAMES: Game[] = [
  {
    id: 'block-puzzle',
    slug: 'block-puzzle',
    title: {
      en: 'Block Puzzle — 4TM',
      vi: 'Xếp Gạch — 4TM',
    },
    genre: {
      en: 'Spatial Grid Puzzle & Strategy',
      vi: 'Xếp Hình Lưới & Chiến Thuật Tối Ưu',
    },
    category: 'puzzle',
    difficulty: 'Casual',
    status: 'in-development',
    badge: '8x8 Grid',
    accentColor: 'from-amber-500 to-rose-600',
    rating: 4.9,
    playEstimate: '3-8 mins',
    description: {
      en: 'Place geometric block shapes onto the 8x8 grid, clear full rows and columns, and maximize your score in this addictive spatial puzzle game.',
      vi: 'Đặt các khối gạch hình học vào lưới 8x8, xóa sạch các hàng và cột đầy để đạt điểm số tối đa trong trò chơi xếp hình chiến thuật lôi cuốn.',
    },
    objective: {
      en: 'Clear horizontal rows and vertical columns by placing shapes without running out of grid space.',
      vi: 'Xóa sạch các hàng ngang và cột dọc bằng cách sắp xếp khối gạch khéo léo trước khi hết không gian trống.',
    },
    controls: {
      en: ['Click or drag shapes onto the 8x8 grid', 'Clear lines to earn combo bonus points', 'Plan ahead to prevent grid overflow'],
      vi: ['Kéo thả hoặc nhấn chọn để đặt khối gạch vào lưới 8x8', 'Xóa hàng/cột để tích điểm thưởng combo', 'Tính toán chiến thuật để không bị nghẽn bàn chơi'],
    },
    techTags: ['Grid Engine', 'Spatial Logic', 'Score Combos'],
    platforms: {
      web: true,
      appStoreUrl: '#',
      googlePlayUrl: '#',
    },
  },
  {
    id: 'binary-search',
    slug: 'binary-search-runner',
    title: {
      en: 'Binary Search Runner — 4TM',
      vi: 'Chạy Đấu Thuật Toán Nhị Phân — 4TM',
    },
    genre: {
      en: 'Algorithm & Logarithmic Deduction',
      vi: 'Thuật Toán & Suy Luận Logarit',
    },
    category: 'algorithms',
    difficulty: 'Casual',
    status: 'in-development',
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
    platforms: {
      web: true,
    },
  },
  {
    id: 'syntax-memory',
    slug: 'syntax-memory-matrix',
    title: {
      en: 'Memory Matrix: Data Structures — 4TM',
      vi: 'Trí Nhớ Cấu Trúc Dữ Liệu — 4TM',
    },
    genre: {
      en: 'Pattern Recognition & Memory',
      vi: 'Trí Nhớ & Ghép Đôi Cấu Trúc Dữ Liệu',
    },
    category: 'memory',
    difficulty: 'Casual',
    status: 'in-development',
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
    platforms: {
      web: true,
    },
  },
  {
    id: 'sorting-visualizer',
    slug: 'sorting-algorithm-visualizer',
    title: {
      en: 'Sorting Arena: Visualizer & Challenge — 4TM',
      vi: 'Sắp Xếp Mảng Trực Quan — 4TM',
    },
    genre: {
      en: 'Algorithm Mechanics & Speed Duel',
      vi: 'Đua Thuật Toán Sắp Xếp & Trực Quan Hóa',
    },
    category: 'visualizer',
    difficulty: 'Intermediate',
    status: 'in-development',
    badge: 'O(N log N)',
    accentColor: 'from-amber-500 to-orange-700',
    rating: 4.9,
    playEstimate: '5-10 mins',
    description: {
      en: 'Visualize and inspect the mechanics of classic sorting algorithms (Bubble Sort, Selection Sort, Quick Sort, Merge Sort). Scramble the array, adjust the speed slider, or manually step through comparisons.',
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
    platforms: {
      web: true,
    },
  },
  {
    id: 'regex-door',
    slug: 'regex-door-breaker',
    title: {
      en: 'Regex Gatekeeper — 4TM',
      vi: 'Giải Mã Cửa Regex — 4TM',
    },
    genre: {
      en: 'Syntax & Pattern Matching Challenge',
      vi: 'Thử Thách Giải Mã Cửa Bằng Regex',
    },
    category: 'syntax',
    difficulty: 'Master',
    status: 'in-development',
    badge: 'Automata',
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
    platforms: {
      web: true,
    },
  },
  {
    id: 'graph-pathfinder',
    slug: 'graph-pathfinder',
    title: {
      en: 'Graph Pathfinder — 4TM',
      vi: 'Dẫn Đường Đồ Thị — 4TM',
    },
    genre: {
      en: 'Pathfinding & Shortest Distance',
      vi: 'Tìm Đường Đi Ngắn Nhất Trên Đồ Thị',
    },
    category: 'algorithms',
    difficulty: 'Intermediate',
    status: 'planned',
    badge: 'Dijkstra / A*',
    accentColor: 'from-emerald-500 to-teal-700',
    rating: 4.8,
    playEstimate: '5-12 mins',
    description: {
      en: 'Explore graph pathfinding algorithms such as Dijkstra and A* to guide autonomous probes through obstacle-dense navigational matrices.',
      vi: 'Khám phá các thuật toán tìm đường trên đồ thị như Dijkstra và A* để dẫn đường cho robot qua các chướng ngại vật phức tạp.',
    },
    objective: {
      en: 'Navigate from start to target node while minimizing total edge weights and avoiding obstacles.',
      vi: 'Tìm tuyến đường từ điểm xuất phát đến mục tiêu với chi phí trọng số thấp nhất.',
    },
    controls: {
      en: ['Place start & goal nodes', 'Add weight obstacles', 'Step through path execution'],
      vi: ['Đặt điểm đầu & điểm cuối', 'Vẽ chướng ngại vật', 'Từng bước chạy thuật toán'],
    },
    techTags: ['Graph Theory', 'Dijkstra', 'A* Search'],
    platforms: {
      web: true,
      appStoreUrl: '#',
      googlePlayUrl: '#',
    },
  },

  /* -------------------------------------------------------------------------
   * INTERNAL / TEST / PROTOTYPE / ARCHIVED / TEMPORARY GAMES
   * These games exist in the underlying repository data source but MUST be
   * programmatically filtered out from the public website catalog according to:
   * status === 'in-development' || status === 'planned'
   * ------------------------------------------------------------------------- */
  {
    id: 'internal-godot-debug',
    slug: 'internal-godot-debug',
    title: 'Internal Godot Engine Debugger',
    genre: { en: 'Internal Debug', vi: 'Thử Nghiệm Nội Bộ' },
    category: 'visualizer',
    difficulty: 'Master',
    status: 'internal',
    badge: 'DEV ONLY',
    accentColor: 'from-slate-700 to-slate-900',
    rating: 0,
    playEstimate: 'Internal',
    description: {
      en: 'Internal development workspace component. Should never be rendered on public catalog.',
      vi: 'Cấu phần thử nghiệm nội bộ. Không bao giờ hiển thị trên công cộng.',
    },
    objective: { en: 'Debug', vi: 'Debug' },
    controls: { en: ['Internal'], vi: ['Internal'] },
    techTags: ['Godot', 'Debug'],
  },
  {
    id: 'prototype-physics',
    slug: 'prototype-physics',
    title: 'Prototype Physics Lab',
    genre: { en: 'Experimental Physics', vi: 'Thử Nghiệm Vật Lý' },
    category: 'visualizer',
    difficulty: 'Intermediate',
    status: 'prototype',
    badge: 'PROTOTYPE',
    accentColor: 'from-indigo-600 to-violet-900',
    rating: 0,
    playEstimate: 'Trial',
    description: {
      en: 'Raw canvas physics prototype. Should be excluded from public catalog.',
      vi: 'Mẫu thử nghiệm vật lý canvas. Phải bị loại khỏi danh mục công cộng.',
    },
    objective: { en: 'Prototype', vi: 'Prototype' },
    controls: { en: ['Test'], vi: ['Test'] },
    techTags: ['Physics', 'Prototype'],
  },
  {
    id: 'temporary-test-suite',
    slug: 'temporary-test-suite',
    title: 'Temporary Test Rig',
    genre: { en: 'QA Testing', vi: 'Kiểm Thử' },
    category: 'syntax',
    difficulty: 'Casual',
    status: 'temporary',
    badge: 'TEMP',
    accentColor: 'from-gray-600 to-zinc-900',
    rating: 0,
    playEstimate: '1 min',
    description: {
      en: 'Temporary test fixture for QA pipelines. Must be excluded.',
      vi: 'Fixtures kiểm thử tạm thời. Phải bị loại bỏ.',
    },
    objective: { en: 'QA', vi: 'QA' },
    controls: { en: ['None'], vi: ['None'] },
    techTags: ['QA', 'Temporary'],
  },
  {
    id: 'archived-legacy-runner',
    slug: 'archived-legacy-runner',
    title: 'Archived Legacy Canvas Game',
    genre: { en: 'Legacy', vi: 'Cũ' },
    category: 'algorithms',
    difficulty: 'Casual',
    status: 'archived',
    badge: 'ARCHIVED',
    accentColor: 'from-stone-600 to-neutral-900',
    rating: 0,
    playEstimate: 'Deprecated',
    description: {
      en: 'Archived legacy implementation.',
      vi: 'Phiên bản cũ đã lưu trữ.',
    },
    objective: { en: 'Archived', vi: 'Archived' },
    controls: { en: ['None'], vi: ['None'] },
    techTags: ['Legacy', 'Archived'],
  },
];
