import { CourseId, LevelId, LocalizedString } from '../types';
import { getCourseById, getLevelById, getCourseSyllabusStats } from './coursesData';

export type LearningPathId = 'programming' | 'web-dev' | 'data-analytics';

export interface LearningPathStep {
  stepNumber: number;
  courseId: CourseId;
  levelId: LevelId;
  title: LocalizedString;
  description: LocalizedString;
  keySkills: {
    en: string[];
    vi: string[];
  };
}

export interface LearningPath {
  id: LearningPathId;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  targetRole: LocalizedString;
  estimatedHours: number;
  difficulty: LocalizedString;
  badge: LocalizedString;
  accentColor: string;
  gradient: string;
  steps: LearningPathStep[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'programming',
    title: {
      en: 'Programming',
      vi: 'Lập Trình (Python)',
    },
    subtitle: {
      en: 'Master computational thinking, algorithmic problem-solving, and practical Python skills.',
      vi: 'Làm chủ tư duy máy tính, giải quyết bài toán thuật toán và kỹ năng Python thực chiến.',
    },
    description: {
      en: 'Build programming, problem-solving, automation, and practical Python skills.',
      vi: 'Xây dựng kỹ năng lập trình, giải quyết bài toán thuật toán, tự động hóa và kỹ năng Python thực chiến.',
    },
    targetRole: {
      en: 'Software Engineer / Backend Developer',
      vi: 'Kỹ Sư Phần Mềm / Lập Trình Viên Backend',
    },
    estimatedHours: 42,
    difficulty: {
      en: 'Beginner to Advanced',
      vi: 'Cơ bản đến Nâng cao',
    },
    badge: {
      en: 'Core Foundation',
      vi: 'Nền Tảng Cốt Lõi',
    },
    accentColor: '#3B82F6',
    gradient: 'from-blue-600 via-blue-500 to-cyan-500',
    steps: [
      {
        stepNumber: 1,
        courseId: 'python',
        levelId: 'basic',
        title: {
          en: 'Python 1: Foundations & Core Logic',
          vi: 'Python 1: Nền Tảng & Tư Duy Lập Trình',
        },
        description: {
          en: 'Master variables, conditionals, loops, basic collections, and functional decomposition.',
          vi: 'Làm chủ biến, điều kiện rẽ nhánh, vòng lặp lặp lại, danh sách và chia nhỏ bài toán bằng hàm.',
        },
        keySkills: {
          en: ['Variables & Dynamic Typing', 'Conditionals & Logical Flow', 'Loops & Iterations', 'Functions & Scope'],
          vi: ['Biến & Kiểu dữ liệu', 'Điều kiện & Luồng logic', 'Vòng lặp & Lặp lại', 'Hàm & Phạm vi biến'],
        },
      },
      {
        stepNumber: 2,
        courseId: 'python',
        levelId: 'intermediate',
        title: {
          en: 'Python 2: Data Structures & File I/O',
          vi: 'Python 2: Cấu Trúc Dữ Liệu & Xử Lý Tệp',
        },
        description: {
          en: 'Harness hash maps, sets, list comprehensions, lambda expressions, and robust exception handling.',
          vi: 'Khai thác từ điển (hash maps), tập hợp (sets), list comprehension, hàm ẩn danh và xử lý ngoại lệ an toàn.',
        },
        keySkills: {
          en: ['Dictionaries & Sets', 'Comprehensions & Lambdas', 'File I/O & Streams', 'Exception Handling'],
          vi: ['Từ điển & Tập hợp', 'Comprehensions & Lambdas', 'Đọc/Ghi Tệp Tin', 'Bắt & Xử lý Ngoại Lệ'],
        },
      },
      {
        stepNumber: 3,
        courseId: 'python',
        levelId: 'advanced',
        title: {
          en: 'Python 3: OOP, Metaprogramming & Architecture',
          vi: 'Python 3: Hướng Đối Tượng & Thiết Kế Phần Mềm',
        },
        description: {
          en: 'Build modular enterprise architectures with OOP classes, inheritance, decorators, and memory-efficient generators.',
          vi: 'Xây dựng kiến trúc module với OOP, kế thừa, đa hình, decorators và generators tối ưu bộ nhớ.',
        },
        keySkills: {
          en: ['Class OOP & Polymorphism', 'Decorators & Closures', 'Generators & Iterators', 'Banking Capstone System'],
          vi: ['Lập trình Hướng Đối Tượng', 'Decorators & Closures', 'Generators Tiết Kiệm Bộ Nhớ', 'Dự Án Hệ Thống Ngân Hàng'],
        },
      },
    ],
  },
  {
    id: 'web-dev',
    title: {
      en: 'Frontend Web Development',
      vi: 'Phát Triển Giao Diện Web (Frontend)',
    },
    subtitle: {
      en: 'Build responsive, accessible, interactive web interfaces using standard modern web technologies.',
      vi: 'Xây dựng giao diện web phản hồi nhanh, chuẩn tiếp cận và tương tác cao với công nghệ web hiện đại.',
    },
    description: {
      en: 'Build websites from structure to responsive design and interactive browser applications.',
      vi: 'Xây dựng website từ cấu trúc semantic, giao diện responsive đến ứng dụng tương tác trên trình duyệt.',
    },
    targetRole: {
      en: 'Frontend Developer / UI Engineer',
      vi: 'Lập Trình Viên Frontend / Kỹ Sư UI',
    },
    estimatedHours: 36,
    difficulty: {
      en: 'Beginner to Intermediate',
      vi: 'Cơ bản đến Trung cấp',
    },
    badge: {
      en: 'Web Standard',
      vi: 'Tiêu Chuẩn Web',
    },
    accentColor: '#F59E0B',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    steps: [
      {
        stepNumber: 1,
        courseId: 'html',
        levelId: 'basic',
        title: {
          en: 'HTML: Semantic Web Architecture',
          vi: 'HTML: Cấu Trúc Web Ngữ Nghĩa',
        },
        description: {
          en: 'Construct meaningful document trees with semantic tags, form inputs, validation, and accessibility basics.',
          vi: 'Xây dựng cây tài liệu web chuẩn với thẻ ngữ nghĩa Semantic HTML5, form nhập liệu, xác thực và chuẩn tiếp cận.',
        },
        keySkills: {
          en: ['Semantic HTML5 Tags', 'Accessible Form Controls', 'Document Hierarchy', 'SEO & Metadata'],
          vi: ['Thẻ Ngữ Nghĩa HTML5', 'Biểu Mẫu Nhập Liệu', 'Cấu Trúc Cây DOM', 'SEO & Thẻ Metadata'],
        },
      },
      {
        stepNumber: 2,
        courseId: 'css',
        levelId: 'basic',
        title: {
          en: 'CSS: Box Model & Responsive Layouts',
          vi: 'CSS: Mô Hình Hộp & Giao Diện Thích Ứng',
        },
        description: {
          en: 'Master styling fundamentals, the CSS Box Model, Flexbox alignment, and responsive fluid design.',
          vi: 'Làm chủ nền tảng định kiểu, mô hình hộp (Box Model), căn chỉnh linh hoạt Flexbox và thiết kế responsive.',
        },
        keySkills: {
          en: ['CSS Box Model', 'Flexbox 1D Layouts', 'Responsive Breakpoints', 'Color Contrast & Typography'],
          vi: ['Mô Hình Hộp Box Model', 'Bố Cục Flexbox', 'Điểm Ngắt Responsive', 'Độ Tương Phản & Kiểu Chữ'],
        },
      },
      {
        stepNumber: 3,
        courseId: 'javascript',
        levelId: 'basic',
        title: {
          en: 'JavaScript: Modern ES6+ & Dynamic Logic',
          vi: 'JavaScript: ES6+ Hiện Đại & Xử Lý Tương Tác',
        },
        description: {
          en: 'Program interactive client-side logic using let/const, arrow functions, array transformations, and event loops.',
          vi: 'Lập trình tương tác phía client với let/const, hàm mũi tên, phương thức mảng map/filter/reduce và xử lý sự kiện.',
        },
        keySkills: {
          en: ['ES6+ Modern Syntax', 'Arrow Functions & Scope', 'Array map/filter/reduce', 'DOM Event Handling'],
          vi: ['Cú Pháp Hiện Đại ES6+', 'Hàm Mũi Tên & Scope', 'Biến Đổi Mảng Dữ Liệu', 'Xử Lý Sự Kiện DOM'],
        },
      },
    ],
  },
  {
    id: 'data-analytics',
    title: {
      en: 'Data Analytics & Business Intelligence',
      vi: 'Phân Tích Dữ Liệu & Business Intelligence',
    },
    subtitle: {
      en: 'From spreadsheet modeling to relational databases and executive Power BI dashboards.',
      vi: 'Từ lập mô hình bảng tính đến cơ sở dữ liệu quan hệ và bảng điều khiển Power BI.',
    },
    description: {
      en: 'Build practical data-analysis and business-intelligence skills from spreadsheet fundamentals to databases and BI.',
      vi: 'Xây dựng kỹ năng phân tích dữ liệu và Business Intelligence thực tế từ nền tảng bảng tính Excel đến cơ sở dữ liệu và BI.',
    },
    targetRole: {
      en: 'Data Analyst / BI Developer / Business Analyst',
      vi: 'Chuyên Viên Phân Tích Dữ Liệu / Kỹ Sư BI / Business Analyst',
    },
    estimatedHours: 68,
    difficulty: {
      en: 'Beginner to Advanced',
      vi: 'Cơ bản đến Nâng cao',
    },
    badge: {
      en: 'High Demand',
      vi: 'Nhu Cầu Cao',
    },
    accentColor: '#10B981',
    gradient: 'from-emerald-600 via-teal-600 to-blue-600',
    steps: [
      {
        stepNumber: 1,
        courseId: 'excel',
        levelId: 'basic',
        title: {
          en: 'Excel 1: Spreadsheets & Statistical Functions',
          vi: 'Excel 1: Bảng Tính & Các Hàm Thống Kê',
        },
        description: {
          en: 'Master workbook coordinates, relative/absolute references ($A$1), and statistical aggregations (SUM, AVERAGE, MIN, MAX, COUNT).',
          vi: 'Làm chủ tọa độ bảng tính, tham chiếu tương đối/tuyệt đối ($A$1) và các hàm tổng hợp thống kê cơ bản.',
        },
        keySkills: {
          en: ['Grid Anatomy & A1 Notation', 'Absolute ($) Locking', 'SUM, AVERAGE, MIN, MAX', 'COUNTA & Numeric Typing'],
          vi: ['Cấu Trúc Tọa Độ Ô A1', 'Khóa Tuyệt Đối ($)', 'SUM, AVERAGE, MIN, MAX', 'Hàm COUNTA & Kiểu Dữ Liệu'],
        },
      },
      {
        stepNumber: 2,
        courseId: 'excel',
        levelId: 'intermediate',
        title: {
          en: 'Excel 2: Logic, Lookups & Clean Data',
          vi: 'Excel 2: Hàm Logic, Tra Cứu & Làm Sạch',
        },
        description: {
          en: 'Implement conditional branching (IF/IFS), two-way lookups (XLOOKUP, INDEX/MATCH), SUMIFS, and text pipelines (TRIM, TEXTJOIN).',
          vi: 'Xây dựng cây quyết định (IF/IFS), tra cứu liên bảng (XLOOKUP, INDEX/MATCH), tổng hợp đa điều kiện SUMIFS và làm sạch chuỗi.',
        },
        keySkills: {
          en: ['Nested IF & Modern IFS', 'Two-Way XLOOKUP & Fallbacks', 'Multi-Criteria SUMIFS & COUNTIFS', 'Data Cleaning with TRIM & TEXTJOIN'],
          vi: ['Hàm IF & IFS Hiện Đại', 'Tra Cứu XLOOKUP 2 Chiều', 'Hàm Đa Điều Kiện SUMIFS/COUNTIFS', 'Làm Sạch Dữ Liệu TRIM & TEXTJOIN'],
        },
      },
      {
        stepNumber: 3,
        courseId: 'sql',
        levelId: 'basic',
        title: {
          en: 'SQL 1: Relational Querying & Aggregations',
          vi: 'SQL 1: Truy Vấn Quan Hệ & Tổng Hợp Dữ Liệu',
        },
        description: {
          en: 'Query relational tables using SELECT, WHERE filtering, ORDER BY, GROUP BY, and aggregate functions.',
          vi: 'Truy vấn bảng quan hệ với SELECT, lọc điều kiện WHERE, sắp xếp ORDER BY, gom nhóm GROUP BY và các hàm tổng hợp.',
        },
        keySkills: {
          en: ['SELECT & Column Filtering', 'WHERE Logical Predicates', 'GROUP BY & Aggregations', 'HAVING Conditions'],
          vi: ['Truy Vấn SELECT', 'Lọc Điều Kiện WHERE', 'Gom Nhóm GROUP BY', 'Điều Kiện Lọc HAVING'],
        },
      },
      {
        stepNumber: 4,
        courseId: 'sql',
        levelId: 'intermediate',
        title: {
          en: 'SQL 2: Multi-Table JOINs & Subqueries',
          vi: 'SQL 2: Kết Nối Đa Bảng (JOIN) & Truy Vấn Con',
        },
        description: {
          en: 'Combine relational schemas with INNER/LEFT JOIN, write nested subqueries, CASE WHEN statements, and CTEs.',
          vi: 'Kết nối lược đồ quan hệ với INNER/LEFT JOIN, viết truy vấn lồng Subquery, điều kiện CASE WHEN và bảng tạm CTE.',
        },
        keySkills: {
          en: ['INNER & LEFT JOINs', 'Subqueries & IN/EXISTS', 'Conditional CASE WHEN', 'Schema Normalization'],
          vi: ['Kết Nối INNER / LEFT JOIN', 'Truy Vấn Lồng Subquery', 'Phân Nhánh CASE WHEN', 'Chuẩn Hóa Dữ Liệu'],
        },
      },
      {
        stepNumber: 5,
        courseId: 'powerbi',
        levelId: 'basic',
        title: {
          en: 'Power BI 1: Workspace & Power Query ETL',
          vi: 'Power BI 1: Giao Diện & Tiền Xử Lý Dữ Liệu ETL',
        },
        description: {
          en: 'Master Report/Data/Model views, clean and transform messy datasets in Power Query, and write basic DAX aggregations.',
          vi: 'Làm chủ các chế độ Report/Data/Model, làm sạch và chuyển đổi dữ liệu với Power Query, cùng các hàm DAX cơ bản.',
        },
        keySkills: {
          en: ['Power BI Views Architecture', 'Power Query ETL Cleaning', 'Calculated Columns vs Measures', 'Basic DAX: SUM, DIVIDE'],
          vi: ['Kiến Trúc Giao Diện Power BI', 'Xử Lý ETL Power Query', 'Cột Tính Toán & Measures', 'Hàm DAX: SUM, DIVIDE'],
        },
      },
      {
        stepNumber: 6,
        courseId: 'powerbi',
        levelId: 'intermediate',
        title: {
          en: 'Power BI 2: Star Schema & DAX Context Transition',
          vi: 'Power BI 2: Mô Hình Star Schema & Hàm CALCULATE',
        },
        description: {
          en: 'Design 1:* Star Schemas, master CALCULATE filter context transitions, and build Time Intelligence metrics.',
          vi: 'Thiết kế mô hình Star Schema 1:*, làm chủ biến đổi ngữ cảnh lọc với CALCULATE và tính toán thời gian Time Intelligence.',
        },
        keySkills: {
          en: ['Star Schema (Fact & Dim)', 'CALCULATE Filter Modification', 'Time Intelligence: TOTALYTD', 'Row Iterators: SUMX'],
          vi: ['Mô Hình Star Schema', 'Chuyển Đổi Lọc CALCULATE', 'Chỉ Số Thời Gian TOTALYTD', 'Bộ Lặp Dòng SUMX'],
        },
      },
      {
        stepNumber: 7,
        courseId: 'powerbi',
        levelId: 'advanced',
        title: {
          en: 'Power BI 3: Executive Dashboards & KPI Reports',
          vi: 'Power BI 3: Bảng Điều Khiển Điều Hành & Báo Cáo KPI',
        },
        description: {
          en: 'Architect professional executive BI reports, matrix hierarchies, drill-through interactions, and KPI scorecards.',
          vi: 'Thiết kế báo cáo BI cấp điều hành, phân cấp ma trận, tương tác drill-through chi tiết và bảng điểm KPI doanh nghiệp.',
        },
        keySkills: {
          en: ['Executive Layout & Contrast', 'Matrix Visuals & Slicers', 'Drill-Through Interactions', 'Full Enterprise Sales Report'],
          vi: ['Bố Cục Báo Cáo Chuyên Nghiệp', 'Bảng Ma Trận & Bộ Lọc', 'Tương Tác Drill-Through', 'Báo Cáo Doanh Thu Doanh Nghiệp'],
        },
      },
    ],
  },
];

export interface LearningPathStats {
  totalSteps: number;
  completedSteps: number;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export const getLearningPathStats = (
  path: LearningPath,
  userLessonProgress: Record<string, any> = {}
): LearningPathStats => {
  let totalLessons = 0;
  let completedLessons = 0;
  let completedSteps = 0;

  path.steps.forEach(step => {
    const level = getLevelById(step.courseId, step.levelId);
    if (!level) return;

    let stepLessons = 0;
    let stepCompleted = 0;

    level.modules.forEach(mod => {
      mod.lessons.forEach(l => {
        stepLessons++;
        totalLessons++;
        if (userLessonProgress[l.id]?.isCompleted) {
          stepCompleted++;
          completedLessons++;
        }
      });
    });

    if (stepLessons > 0 && stepCompleted === stepLessons) {
      completedSteps++;
    }
  });

  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  let status: 'not_started' | 'in_progress' | 'completed' = 'not_started';
  if (progressPercent === 100) {
    status = 'completed';
  } else if (progressPercent > 0 || completedLessons > 0) {
    status = 'in_progress';
  }

  return {
    totalSteps: path.steps.length,
    completedSteps,
    totalLessons,
    completedLessons,
    progressPercent,
    status,
  };
};

export const isStepUnlocked = (
  path: LearningPath,
  stepIndex: number,
  userLessonProgress: Record<string, any> = {},
  userRole: string = 'student'
): boolean => {
  if (userRole === 'admin') return true;
  if (stepIndex === 0) return true;

  // Previous step must be completed
  const prevStep = path.steps[stepIndex - 1];
  if (!prevStep) return true;

  const prevLevel = getLevelById(prevStep.courseId, prevStep.levelId);
  if (!prevLevel) return true;

  const lessonIds: string[] = [];
  prevLevel.modules.forEach(m => m.lessons.forEach(l => lessonIds.push(l.id)));

  if (lessonIds.length === 0) return true;
  return lessonIds.every(id => userLessonProgress[id]?.isCompleted);
};
