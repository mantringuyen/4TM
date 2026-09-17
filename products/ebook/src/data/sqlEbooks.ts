import { Book } from '../types';

export const SQL_EBOOKS: Book[] = [
  // 1. SQL Handbook
  {
    id: 'sql-handbook',
    slug: 'sql-handbook',
    title: 'SQL Handbook',
    subtitle: {
      en: 'Relational Model, Standard Query Language & Execution Engines',
      vi: 'Mô Hình Quan Hệ, Ngôn Ngữ Truy Vấn Chuẩn & Engine Thực Thi',
    },
    bookType: 'Handbook',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '40 mins',
    chaptersCount: 3,
    publishedDate: '2025-02-10',
    accentColor: 'from-blue-600 to-indigo-800',
    tags: ['SQL', 'Relational Model', 'PostgreSQL', 'DBMS'],
    description: {
      en: 'Comprehensive reference handbook covering relational algebra, DDL/DML standards, JOIN mechanics, and subquery execution.',
      vi: 'Cẩm nang tra cứu toàn diện về đại số quan hệ, chuẩn DDL/DML, cơ chế JOIN và thực thi subquery trong cơ sở dữ liệu quan hệ.',
    },
    prerequisites: {
      en: ['Basic database concepts'],
      vi: ['Khái niệm cơ sở dữ liệu cơ bản'],
    },
    outcomes: {
      en: ['Understand relational schema constraints', 'Master INNER, LEFT, RIGHT, and FULL OUTER JOINs'],
      vi: ['Nắm vững các ràng buộc schema quan hệ', 'Làm chủ các phép JOIN: INNER, LEFT, RIGHT, FULL OUTER'],
    },
    chapters: [
      {
        id: 'sql-hb-ch-1',
        number: 1,
        slug: 'relational-model-and-ddl',
        title: {
          en: 'Relational Model & DDL Schema Definitions',
          vi: 'Mô Hình Quan Hệ & Định Nghĩa Schema Với DDL',
        },
        summary: {
          en: 'CREATE TABLE constraints, Foreign Keys, Primary Keys, and Normalization.',
          vi: 'Ràng buộc CREATE TABLE, Khóa ngoại, Khóa chính và Chuẩn hóa dữ liệu.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'sql-hb-1-1',
            title: {
              en: 'Primary Keys, Foreign Keys & Referential Integrity',
              vi: 'Khóa Chính, Khóa Ngoại & Tính Toàn Vẹn Tham Chiếu',
            },
            content: {
              en: 'Primary keys uniquely identify rows, while foreign keys establish relationships and enforce referential integrity across tables with CASCADE or RESTRICT rules.',
              vi: 'Khóa chính định danh duy nhất từng dòng, trong khi khóa ngoại thiết lập liên kết và đảm bảo tính toàn vẹn tham chiếu giữa các bảng với quy tắc CASCADE hoặc RESTRICT.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'schema.sql',
              code: `CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    total_amount NUMERIC(10, 2) NOT NULL
);`,
            },
          },
        ],
      },
      {
        id: 'sql-hb-ch-2',
        number: 2,
        slug: 'sql-join-mechanics',
        title: {
          en: 'Mastering SQL JOIN Types & Set Algebra',
          vi: 'Làm Chủ Các Phép JOIN & Đại Số Tập Hợp',
        },
        summary: {
          en: 'Nested loop joins, hash joins, merge joins, and Cartesian products.',
          vi: 'Nested loop join, hash join, merge join và tích Cartesian.',
        },
        readTimeMinutes: 14,
        sections: [
          {
            id: 'sql-hb-2-1',
            title: {
              en: 'Hash Join vs Nested Loop Execution',
              vi: 'Hash Join vs Nested Loop Trong Query Engine',
            },
            content: {
              en: 'Query planners choose Hash Joins for large unsorted datasets by building an in-memory hash table of the inner relation, whereas Nested Loop Joins are chosen for small indexed lookups.',
              vi: 'Bộ tối ưu hóa truy vấn chọn Hash Join cho tập dữ liệu lớn bằng cách tạo bảng băm trong bộ nhớ, trong khi Nested Loop Join dùng cho bảng nhỏ có chỉ mục.',
            },
          },
        ],
      },
      {
        id: 'sql-hb-ch-3',
        number: 3,
        slug: 'aggregations-group-by',
        title: {
          en: 'Aggregations, GROUP BY & HAVING Filters',
          vi: 'Gom Nhóm Aggregation, GROUP BY & Bộ Lọc HAVING',
        },
        summary: {
          en: 'SUM, COUNT, AVG, FILTER clause, and GROUP BY execution semantics.',
          vi: 'Hàm SUM, COUNT, AVG, mệnh đề FILTER và ngữ nghĩa thực thi GROUP BY.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'sql-hb-3-1',
            title: {
              en: 'HAVING vs WHERE Logical Processing Order',
              vi: 'Thứ Tự Xử Lý Logic Của HAVING vs WHERE',
            },
            content: {
              en: '`WHERE` filters individual rows BEFORE aggregation occurs, whereas `HAVING` filters aggregated group records AFTER `GROUP BY` is evaluated.',
              vi: 'Mệnh đề `WHERE` lọc từng dòng riêng biệt TRƯỚC khi gom nhóm, còn `HAVING` lọc kết quả gom nhóm SAU khi thực hiện `GROUP BY`.',
            },
          },
        ],
      },
    ],
  },

  // 2. SQL Definitions
  {
    id: 'sql-definitions',
    slug: 'sql-definitions',
    title: 'SQL Definitions',
    subtitle: {
      en: 'Database Terminology, Glossary & ACID Isolation Definitions',
      vi: 'Thuật Ngữ Cơ Sở Dữ Liệu, Cấp Độ Cô Lập ACID & Tra Cứu Khái Niệm',
    },
    bookType: 'Definitions',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-sky-500 to-blue-700',
    tags: ['Definitions', 'ACID', 'Transactions', 'Glossary'],
    description: {
      en: 'Concise reference definitions for database internals: ACID guarantees, Isolation Levels, B-Trees, WAL, and Write Amplification.',
      vi: 'Từ điển định nghĩa gọn gàng các thuật ngữ cơ sở dữ liệu: Tính chất ACID, Cấp độ cô lập, B-Tree, WAL và Phóng đại ghi (Write Amplification).',
    },
    prerequisites: {
      en: ['Basic SQL query knowledge'],
      vi: ['Kiến thức truy vấn SQL cơ bản'],
    },
    outcomes: {
      en: ['Understand database transaction behavior under concurrency'],
      vi: ['Hiểu rõ hành vi giao dịch cơ sở dữ liệu khi có truy cập đồng thời'],
    },
    chapters: [
      {
        id: 'sql-def-ch-1',
        number: 1,
        slug: 'acid-and-transactions',
        title: {
          en: 'ACID Guarantees & Transaction Isolation Levels',
          vi: 'Các Tính Chất ACID & Cấp Độ Cô Lập Giao Dịch',
        },
        summary: {
          en: 'Atomicity, Consistency, Isolation, Durability, Dirty Reads, and Phantom Reads.',
          vi: 'Atomicity, Consistency, Isolation, Durability, Dirty Read và Phantom Read.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'sql-def-1-1',
            title: {
              en: 'Isolation Levels: Read Committed to Serializable',
              vi: 'Cấp Độ Cô Lập: Từ Read Committed Đến Serializable',
            },
            content: {
              en: 'Read Committed prevents Dirty Reads. Repeatable Read prevents Non-Repeatable Reads. Serializable provides strict linearizability against Phantom Reads.',
              vi: 'Read Committed ngăn chặn Dirty Read. Repeatable Read ngăn Non-Repeatable Read. Serializable cung cấp tính tuần tự hóa tuyệt đối chống Phantom Read.',
            },
          },
        ],
      },
      {
        id: 'sql-def-ch-2',
        number: 2,
        slug: 'indexing-definitions',
        title: {
          en: 'Storage Engine & Indexing Glossary',
          vi: 'Từ Điển Storage Engine & Đánh Chỉ Mục Index',
        },
        summary: {
          en: 'B-Tree Index, BRIN Index, WAL (Write-Ahead Logging), and MVCC.',
          vi: 'Chỉ mục B-Tree, BRIN Index, WAL (Write-Ahead Log) và MVCC.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'sql-def-2-1',
            title: {
              en: 'MVCC (Multi-Version Concurrency Control)',
              vi: 'MVCC (Multi-Version Concurrency Control)',
            },
            content: {
              en: 'MVCC allows readers not to block writers and writers not to block readers by keeping historical row versions (xmin/xmax) in the table page file.',
              vi: 'MVCC cho phép tác vụ đọc không chặn tác vụ ghi và ngược lại bằng cách duy trì các phiên bản dòng lịch sử (xmin/xmax) trong file dữ liệu.',
            },
          },
        ],
      },
    ],
  },

  // 3. SQL Query Patterns
  {
    id: 'sql-query-patterns',
    slug: 'sql-query-patterns',
    title: 'SQL Query Patterns & Formulas',
    subtitle: {
      en: 'CTE Recurrence, Window Functions & Advanced Query Recipes',
      vi: 'Mẫu Truy Vấn SQL Nâng Cao, Window Functions & Cú Pháp CTE Đệ Quy',
    },
    bookType: 'Patterns / Recipes',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '35 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-indigo-600 to-blue-900',
    tags: ['Window Functions', 'CTE', 'Recursive Queries', 'Patterns'],
    description: {
      en: 'Reusable SQL query patterns: Common Table Expressions (CTEs), Recursive tree traversal, Window Functions (ROW_NUMBER, LAG, LEAD), and Pivoting.',
      vi: 'Bộ công thức và mẫu truy vấn SQL tái sử dụng: CTE đệ quy duyệt cây, Window Functions (ROW_NUMBER, LAG, LEAD) và xoay chiều bảng (Pivoting).',
    },
    prerequisites: {
      en: ['Solid understanding of SELECT, JOIN, and GROUP BY'],
      vi: ['Nắm chắc cú pháp SELECT, JOIN và GROUP BY'],
    },
    outcomes: {
      en: ['Calculate running totals and moving averages with OVER()', 'Traverse hierarchical parent-child trees using RECURSIVE CTEs'],
      vi: ['Tính tổng lũy tiến và trung bình động với mệnh đề OVER()', 'Duyệt cấu trúc cây phân cấp cha-con bằng RECURSIVE CTE'],
    },
    chapters: [
      {
        id: 'sqp-ch-1',
        number: 1,
        slug: 'window-function-patterns',
        title: {
          en: 'Analytics Patterns with Window Functions',
          vi: 'Mẫu Phân Tích Dữ Liệu Với Window Functions',
        },
        summary: {
          en: 'ROW_NUMBER(), DENSE_RANK(), LAG(), LEAD(), and running sums with PARTITION BY.',
          vi: 'ROW_NUMBER(), DENSE_RANK(), LAG(), LEAD() và tính tổng tích lũy với PARTITION BY.',
        },
        readTimeMinutes: 18,
        sections: [
          {
            id: 'sqp-1-1',
            title: {
              en: 'Running Totals & Moving Averages',
              vi: 'Tính Tổng Tích Lũy & Trung Bình Động qua OVER()',
            },
            content: {
              en: 'Window functions compute aggregate results across a frame of related rows without collapsing the underlying result set like GROUP BY does.',
              vi: 'Window functions tính toán các giá trị tổng hợp trên khung các dòng liên quan mà không làm gộp dòng như GROUP BY.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'running_total.sql',
              code: `SELECT 
    order_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY user_id 
        ORDER BY order_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_spend
FROM orders;`,
            },
          },
        ],
      },
      {
        id: 'sqp-ch-2',
        number: 2,
        slug: 'recursive-cte-patterns',
        title: {
          en: 'Recursive CTEs for Hierarchical Graphs',
          vi: 'CTE Đệ Quy Duyệt Cấu Trúc Cây Phân Cấp',
        },
        summary: {
          en: 'Query org charts, category trees, and bill of materials (BOM).',
          vi: 'Truy vấn sơ đồ tổ chức, cây danh mục sản phẩm và cấu trúc linh kiện.',
        },
        readTimeMinutes: 17,
        sections: [
          {
            id: 'sqp-2-1',
            title: {
              en: 'WITH RECURSIVE Tree Traversal',
              vi: 'Duyệt Cây Với Mệnh Đề WITH RECURSIVE',
            },
            content: {
              en: 'A recursive CTE combines an Anchor Member with a Recursive Member using UNION ALL to iterate until no new rows are returned.',
              vi: 'CTE đệ quy kết hợp điểm tựa Anchor Member và phần đệ quy Recursive Member bằng UNION ALL để lặp đến khi không có dòng mới.',
            },
          },
        ],
      },
    ],
  },

  // 4. SQL Common Errors
  {
    id: 'sql-common-errors',
    slug: 'sql-common-errors',
    title: 'SQL Common Errors & Gotchas',
    subtitle: {
      en: 'Performance Bottlenecks, N+1 Queries & NULL Value Pitfalls',
      vi: 'Điểm Nghẽn Hiệu Năng, Lỗi N+1 Query & Cạm Bẫy Giá Trị NULL',
    },
    bookType: 'Common Errors',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-01-22',
    accentColor: 'from-amber-500 to-red-700',
    tags: ['NULL Pitfalls', 'N+1 Problem', 'Debugging', 'Indexing Bugs'],
    description: {
      en: 'Deconstruct frequent SQL traps: NULL comparison bugs, non-sargable functions destroying index scans, and ORM N+1 query proliferation.',
      vi: 'Mổ xẻ các bẫy SQL phổ biến: lỗi so sánh giá trị NULL, hàm non-sargable làm hỏng index scan và hiện tượng bùng nổ query N+1 từ ORM.',
    },
    prerequisites: {
      en: ['SQL query writing experience'],
      vi: ['Đã có kinh nghiệm viết truy vấn SQL'],
    },
    outcomes: {
      en: ['Avoid non-sargable WHERE predicates', 'Detect and eliminate ORM N+1 query loops'],
      vi: ['Bỏ biểu thức non-sargable trong mệnh đề WHERE', 'Phát hiện và triệt tiêu vòng lặp truy vấn N+1 từ ORM'],
    },
    chapters: [
      {
        id: 'sce-ch-1',
        number: 1,
        slug: 'null-logic-three-valued-boolean',
        title: {
          en: 'NULL Values & Three-Valued Logic Pitfalls',
          vi: 'Giá Trị NULL & Cạm Bẫy Logic 3 Trạng Thái',
        },
        summary: {
          en: 'Why WHERE col != 5 filters out NULLs and IN (1, NULL) behaves unexpectedly.',
          vi: 'Tại sao WHERE col != 5 loại bỏ cả dòng NULL và IN (1, NULL) gây lỗi bất ngờ.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sce-1-1',
            title: {
              en: 'Three-Valued Boolean Logic (TRUE, FALSE, UNKNOWN)',
              vi: 'Logic Bool 3 Trạng Thái (TRUE, FALSE, UNKNOWN)',
            },
            content: {
              en: 'In SQL, any comparison against NULL produces UNKNOWN, which evaluates as FALSE in WHERE clauses. For example, `2 IN (1, NULL)` yields UNKNOWN, so the row is filtered out. Crucially, `NOT IN (1, NULL)` also evaluates to UNKNOWN (since `NOT UNKNOWN` remains UNKNOWN), which unexpectedly eliminates ALL rows from the result set. To avoid this NULL trap, use `NOT EXISTS` with a correlated subquery, or filter out NULLs explicitly with `IS NOT NULL`.',
              vi: 'Trong SQL, bất kỳ phép so sánh nào với NULL đều cho ra UNKNOWN, bị tính là FALSE trong mệnh đề WHERE. Ví dụ, `2 IN (1, NULL)` cho ra UNKNOWN nên dòng dữ liệu bị loại bỏ. Đặc biệt, `NOT IN (1, NULL)` cũng trả về UNKNOWN (vì `NOT UNKNOWN` vẫn là UNKNOWN), làm biến mất TOÀN BỘ các dòng kết quả một cách bất ngờ. Để tránh bẫy NULL này, hãy dùng `NOT EXISTS` với truy vấn con tương quan, hoặc lọc bỏ NULL bằng `IS NOT NULL`.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'null_trap.sql',
              code: `-- BUG: Returns ZERO rows if comparison set contains NULL!
SELECT * FROM products WHERE category_id NOT IN (1, 2, NULL);

-- CORRECT Option 1: Explicit IS NOT NULL handling
SELECT * FROM products WHERE discount != 10 OR discount IS NULL;

-- CORRECT Option 2: Use NOT EXISTS (Safe against NULLs)
SELECT * FROM products p WHERE NOT EXISTS (SELECT 1 FROM categories c WHERE c.id = p.category_id);`,
            },
          },
        ],
      },
      {
        id: 'sce-ch-2',
        number: 2,
        slug: 'non-sargable-queries-n1-problem',
        title: {
          en: 'Non-Sargable Predicates & ORM N+1 Queries',
          vi: 'Biểu Thức Non-Sargable & Vấn Đề N+1 Truy Vấn',
        },
        summary: {
          en: 'How wrapping indexed columns in functions forces expensive full table scans.',
          vi: 'Cách bọc cột có index trong hàm ép engine quét toàn bộ bảng (Sequential Scan).',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sce-2-1',
            title: {
              en: 'Fixing Non-Sargable Functions',
              vi: 'Sửa Lỗi Biểu Thức Non-Sargable',
            },
            content: {
              en: 'When a column is inside a function like `WHERE DATE(created_at) = \'2025-01-01\'`, the database engine cannot use B-Tree indexes on `created_at`. Rewrite as range queries.',
              vi: 'Khi bọc cột trong hàm như `WHERE DATE(created_at) = \'2025-01-01\'`, database không dùng được index. Hãy viết lại thành truy vấn khoảng ngày.',
            },
          },
        ],
      },
    ],
  },

  // 5. SQL Best Practices
  {
    id: 'sql-best-practices',
    slug: 'sql-best-practices',
    title: 'SQL Best Practices & Indexing',
    subtitle: {
      en: 'B-Tree Index Tuning, Execution Plan Analysis & Schema Design',
      vi: 'Tối Ưu Chỉ Mục B-Tree, Phân Tích Execution Plan & Thiết Kế Schema',
    },
    bookType: 'Best Practices',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-05',
    accentColor: 'from-blue-700 to-indigo-900',
    tags: ['EXPLAIN ANALYZE', 'Indexing', 'Optimization', 'Best Practices'],
    description: {
      en: 'Production database optimization guidelines: reading EXPLAIN ANALYZE, composite indexing strategies, partial indexes, and Connection Pooling.',
      vi: 'Quy chuẩn tối ưu cơ sở dữ liệu sản xuất: đọc EXPLAIN ANALYZE, chiến lược index hợp phần (Composite Index), Partial Index và Connection Pooling.',
    },
    prerequisites: {
      en: ['Database administration or backend querying experience'],
      vi: ['Kinh nghiệm quản trị hoặc viết truy vấn backend'],
    },
    outcomes: {
      en: ['Interpret PostgreSQL EXPLAIN ANALYZE cost trees', 'Design covering composite indexes for complex multi-column queries'],
      vi: ['Đọc hiểu cây chi phí EXPLAIN ANALYZE của PostgreSQL', 'Thiết kế Composite Index bao phủ cho truy vấn nhiều cột'],
    },
    chapters: [
      {
        id: 'sbp-ch-1',
        number: 1,
        slug: 'explain-analyze-interpretation',
        title: {
          en: 'Reading EXPLAIN ANALYZE Execution Plans',
          vi: 'Đọc Hiểu Kế Hoạch Thực Thi EXPLAIN ANALYZE',
        },
        summary: {
          en: 'Cost metrics, actual time, loops, rows estimation, and node types.',
          vi: 'Chỉ số cost, thời gian thực tế, số vòng lặp, dự đoán số dòng và các loại node.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sbp-1-1',
            title: {
              en: 'Index Scan vs Index Only Scan vs Seq Scan',
              vi: 'Index Scan vs Index Only Scan vs Sequential Scan',
            },
            content: {
              en: 'An `Index Only Scan` avoids heap reads altogether by fetching all requested SELECT columns directly from the B-Tree leaf pages.',
              vi: 'Phép `Index Only Scan` không cần đọc file heap bảng vì tất cả cột SELECT yêu cầu đều nằm ngay trên lá của cây B-Tree.',
            },
          },
        ],
      },
      {
        id: 'sbp-ch-2',
        number: 2,
        slug: 'composite-and-partial-indexing',
        title: {
          en: 'Composite & Partial Indexing Strategies',
          vi: 'Chiến Lược Index Hợp Phần & Partial Index',
        },
        summary: {
          en: 'Leftmost prefix rule for composite indexes and indexing filtered subsets.',
          vi: 'Quy tắc tiền tố bên trái cho Composite Index và chỉ đánh chỉ mục tập con dữ liệu.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sbp-2-1',
            title: {
              en: 'The Leftmost Prefix Rule',
              vi: 'Quy Tắc Tiền Tố Bên Trái Trong Composite Index',
            },
            content: {
              en: 'A multi-column index on `(tenant_id, status, created_at)` can serve queries filtering on `tenant_id` alone, or `tenant_id + status`, but NOT `status` alone.',
              vi: 'Index đa cột trên `(tenant_id, status, created_at)` hỗ trợ tốt truy vấn lọc `tenant_id`, hoặc `tenant_id + status`, nhưng KHÔNG hỗ trợ lọc chỉ `status`.',
            },
          },
        ],
      },
    ],
  },

  // 6. SQL Practical Guides
  {
    id: 'sql-practical-guides',
    slug: 'sql-practical-guides',
    title: 'Relational Database Design Guide',
    subtitle: {
      en: 'Step-by-Step Guide to Data Modeling, Normalization & Migrations',
      vi: 'Hướng Dẫn Thực Hành Mô Hình Hóa Dữ Liệu, Chuẩn Hóa & Migrations',
    },
    bookType: 'Practical Guides',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '35 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-18',
    accentColor: 'from-sky-600 to-indigo-800',
    tags: ['Data Modeling', 'Normalization', 'Migrations', 'Guide'],
    description: {
      en: 'A practical, step-by-step guide to modeling relational domain schemas, achieving 3NF, and executing safe database migrations in production.',
      vi: 'Hướng dẫn thực hành từng bước mô hình hóa schema hệ thống quan hệ, đưa về dạng chuẩn 3NF và thực thi migration an toàn trên môi trường sản xuất.',
    },
    prerequisites: {
      en: ['Basic knowledge of SQL table creation'],
      vi: ['Hiểu biết cơ bản về khởi tạo bảng SQL'],
    },
    outcomes: {
      en: ['Normalize unorganized data to Third Normal Form (3NF)', 'Write zero-downtime database migration scripts'],
      vi: ['Chuẩn hóa dữ liệu thô về Dạng Chuẩn Ba (3NF)', 'Viết kịch bản migration cơ sở dữ liệu zero-downtime'],
    },
    chapters: [
      {
        id: 'spg-ch-1',
        number: 1,
        slug: 'normalization-1nf-2nf-3nf',
        title: {
          en: 'Schema Normalization (1NF to 3NF)',
          vi: 'Chuẩn Hóa Schema Dữ Liệu (Từ 1NF Đến 3NF)',
        },
        summary: {
          en: 'Eliminate duplicate columns, partial dependencies, and transitive dependencies.',
          vi: 'Loại bỏ lặp cột, phụ thuộc một phần và phụ thuộc bắc cầu.',
        },
        readTimeMinutes: 18,
        sections: [
          {
            id: 'spg-1-1',
            title: {
              en: '3NF Rule: Dependent strictly on the Key, Whole Key, Nothing but the Key',
              vi: 'Quy Tắc 3NF: Phụ Thuộc Trực Tiếp Vào Khóa Chính',
            },
            content: {
              en: 'Ensure every non-key attribute depends solely on the primary key, eliminating transitive redundancy.',
              vi: 'Đảm bảo mọi thuộc tính không phải khóa đều phụ thuộc trực tiếp vào khóa chính, loại bỏ sự dư thừa bắc cầu.',
            },
          },
        ],
      },
      {
        id: 'spg-ch-2',
        number: 2,
        slug: 'zero-downtime-migrations',
        title: {
          en: 'Zero-Downtime Database Migrations',
          vi: 'Kỹ Thuật Migration Không Gây Gián Đoạn (Zero-Downtime)',
        },
        summary: {
          en: 'Expand-and-contract pattern for altering columns and adding constraints safely.',
          vi: 'Mẫu Expand-and-contract để sửa đổi cột và thêm constraint an toàn.',
        },
        readTimeMinutes: 17,
        sections: [
          {
            id: 'spg-2-1',
            title: {
              en: 'The Expand-and-Contract Migration Blueprint',
              vi: 'Quy Trình Expand-and-Contract Khi Migration Schema',
            },
            content: {
              en: 'Step 1: Add new column (expand). Step 2: Dual-write from app code. Step 3: Backfill historic rows. Step 4: Switch reads to new column. Step 5: Remove old column (contract).',
              vi: 'Bước 1: Thêm cột mới. Bước 2: Ghi song song từ ứng dụng. Bước 3: Đồng bộ dữ liệu cũ. Bước 4: Chuyển app đọc cột mới. Bước 5: Xóa cột cũ.',
            },
          },
        ],
      },
    ],
  },
];
