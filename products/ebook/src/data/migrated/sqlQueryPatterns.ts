import { Book } from '../../types';

export const SQL_QUERY_PATTERNS_BOOK: Book = {
  id: 'sql-query-patterns',
  slug: 'sql-query-patterns',
  title: 'SQL Query Patterns & Formulas',
  subtitle: {
    en: 'Window Functions, Recursive CTEs & Advanced Analytical Recipes',
    vi: 'Window Functions, CTE Đệ Quy & Các Mẫu Truy Vấn Phân Tích Nâng Cao'
  },
  bookType: 'Patterns / Recipes',
  categoryId: 'sql',
  subjectId: 'data-analytics',
  author: '4TM Editorial Board',
  role: 'Data Engineering & Analytics Architecture Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '28 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-20',
  accentColor: 'from-violet-600 to-indigo-800',
  tags: [
    'Patterns',
    'Recipes',
    'SQL',
    'Window Functions',
    'Recursive CTE',
    'Analytics',
    'Hierarchies'
  ],
  description: {
    en: 'Production-tested SQL query patterns and reusable analytical recipes for running totals, moving averages, Top-N per group deduplication, and recursive CTE graph traversals with cycle detection.',
    vi: 'Các mẫu truy vấn SQL đã được kiểm chứng thực tế và công thức phân tích có thể tái sử dụng cho tính tổng dồn, trung bình trượt, lấy Top-N theo nhóm và duyệt cấu trúc cây đệ quy có kiểm soát vòng lặp.'
  },
  prerequisites: {
    en: [
      'Strong proficiency with standard SQL syntax and JOIN operations',
      'Understanding of Common Table Expressions (WITH clauses) and aggregation (GROUP BY)'
    ],
    vi: [
      'Thành thạo cú pháp SQL tiêu chuẩn và các phép toán JOIN',
      'Hiểu biết về Common Table Expression (mệnh đề WITH) và gom nhóm dữ liệu (GROUP BY)'
    ]
  },
  outcomes: {
    en: [
      'Master explicit sliding window frames (ROWS vs RANGE) for cumulative and moving aggregates',
      'Solve Top-N per category problems cleanly using ROW_NUMBER(), DENSE_RANK(), and CTEs',
      'Author robust, cycle-safe recursive CTE queries to traverse organizational hierarchies and graphs'
    ],
    vi: [
      'Làm chủ cú pháp khung cửa sổ trượt (ROWS vs RANGE) cho các phép tính lũy kế và trung bình động',
      'Giải quyết triệt để bài toán lấy Top-N theo danh mục bằng ROW_NUMBER(), DENSE_RANK() và CTE',
      'Xây dựng các truy vấn CTE đệ quy an toàn, chống lặp vô tận khi duyệt cây phân cấp và đồ thị'
    ]
  },
  chapters: [
    {
      id: 'sql-qp-ch-1',
      number: 1,
      slug: 'analytics-patterns-window-functions',
      title: {
        en: 'Analytics Patterns with Window Functions',
        vi: 'Các Mẫu Phân Tích Dữ Liệu Với Window Functions'
      },
      summary: {
        en: 'High-performance analytical recipes using SQL window functions, partition clauses, and explicit frame specifications.',
        vi: 'Các công thức phân tích hiệu năng cao sử dụng window functions trong SQL, phân vùng dữ liệu và định nghĩa khung trượt.'
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'sql-qp-1-1',
          title: {
            en: 'Running Totals, Moving Averages & Sliding Framing Clauses',
            vi: 'Tính Tổng Dồn, Trung Bình Trượt & Khung Cửa Sổ Trượt (Framing Clauses)'
          },
          patternDetails: {
            problem: {
              en: 'Calculating cumulative financial revenue over time and rolling moving averages across sliding time frames without writing expensive self-joins or client-side loops.',
              vi: 'Tính toán doanh thu tài chính lũy kế theo thời gian và trung bình trượt trên các khung thời gian di động mà không cần dùng phép self-join tốn kém hay vòng lặp xử lý ở tầng ứng dụng.'
            },
            context: {
              en: 'Financial analytics, sales dashboards, and sensor telemetry time-series streams requiring real-time window calculations over millions of chronological events.',
              vi: 'Báo cáo tài chính, bảng điều khiển doanh số và dữ liệu cảm biến thời gian thực đòi hỏi tính toán cửa sổ dữ liệu tức thì trên hàng triệu sự kiện theo dòng thời gian.'
            },
            solutionOverview: {
              en: 'Use ANSI SQL window functions with PARTITION BY to segment data buckets, ORDER BY to establish sequence, and an explicit ROWS BETWEEN framing clause to bound the calculation window.',
              vi: 'Sử dụng window functions chuẩn ANSI SQL kết hợp với PARTITION BY để phân chia các khối dữ liệu, ORDER BY để thiết lập thứ tự thời gian và mệnh đề ROWS BETWEEN tường minh để giới hạn phạm vi tính toán.'
            },
            architectureDiagram: {
              title: {
                en: 'Sliding Window Evaluation Over Partitioned Stream',
                vi: 'Cơ Chế Đánh Giá Khung Cửa Sổ Trượt Trên Luồng Dữ Liệu Đã Phân Vùng'
              },
              steps: [
                {
                  stepNumber: 1,
                  title: { en: 'Partitioning Stream', vi: 'Phân Vùng Luồng Dữ Liệu' },
                  description: {
                    en: 'Engine divides dataset into isolated logical partitions based on department_id.',
                    vi: 'Engine phân chia tập dữ liệu thành các phân vùng logic riêng biệt dựa trên department_id.'
                  }
                },
                {
                  stepNumber: 2,
                  title: { en: 'Chronological Sort', vi: 'Sắp Xếp Theo Thời Gian' },
                  description: {
                    en: 'Rows within each partition are sorted by transaction_date in ascending order.',
                    vi: 'Các dòng trong từng phân vùng được sắp xếp tăng dần theo trường transaction_date.'
                  }
                },
                {
                  stepNumber: 3,
                  title: { en: 'Sliding Frame Application', vi: 'Áp Dụng Khung Cửa Sổ Trượt' },
                  description: {
                    en: 'For each row, engine aggregates across [CURRENT ROW - 2 PRECEDING] to compute rolling average.',
                    vi: 'Với mỗi dòng, engine tổng hợp các giá trị từ [CURRENT ROW - 2 PRECEDING] để tính trung bình trượt.'
                  }
                }
              ]
            },
            implementation: {
              language: 'sql',
              filename: 'running_totals_moving_avg.sql',
              explanation: {
                en: 'Computing running totals and a 7-day rolling moving average partitioned by department.',
                vi: 'Tính tổng lũy kế và trung bình trượt 7 ngày được phân vùng theo từng phòng ban.'
              },
              code: 'SELECT \n    department_id,\n    transaction_date,\n    revenue,\n    -- 1. Cumulative Running Total from partition start to current row:\n    SUM(revenue) OVER (\n        PARTITION BY department_id \n        ORDER BY transaction_date\n        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n    ) AS running_total,\n    \n    -- 2. 7-Day Rolling Moving Average (Current row + 6 preceding rows):\n    AVG(revenue) OVER (\n        PARTITION BY department_id \n        ORDER BY transaction_date\n        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n    ) AS moving_avg_7d\nFROM daily_sales\nORDER BY department_id, transaction_date;'
            },
            explanation: {
              en: 'The SUM() and AVG() aggregates execute within the window defined by the OVER clause. `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` ensures that every row evaluates all past records up to itself. `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` creates an exact 7-row moving window without requiring self-joins.',
              vi: 'Các hàm tổng hợp SUM() và AVG() được thực thi bên trong phạm vi cửa sổ được định nghĩa bởi mệnh đề OVER. Cụm từ `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` đảm bảo mỗi dòng sẽ tính toán toàn bộ các bản ghi trước đó cho tới dòng hiện tại. Cụm từ `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` tạo ra một khung cửa sổ di động chính xác 7 dòng mà không cần dùng đến self-join.'
            },
            variations: [
              {
                name: { en: 'RANGE Framing by Calendar Days', vi: 'Khung RANGE Theo Khoảng Ngày Thực Tế' },
                description: {
                  en: 'Using RANGE with intervals in PostgreSQL to handle missing weekend dates: RANGE BETWEEN INTERVAL \'7 days\' PRECEDING AND CURRENT ROW.',
                  vi: 'Sử dụng RANGE kết hợp khoảng thời gian trong PostgreSQL để tự động xử lý ngày cuối tuần bị thiếu: RANGE BETWEEN INTERVAL \'7 days\' PRECEDING AND CURRENT ROW.'
                }
              }
            ],
            tradeOffs: {
              en: [
                'Memory Overhead: Window functions require sorting the entire partition in database memory (work_mem).',
                'Streaming Advantage: Evaluated in a single sequential pass over the sorted data, achieving O(N log N) total complexity.'
              ],
              vi: [
                'Chi Phí Bộ Nhớ: Window functions yêu cầu sắp xếp toàn bộ phân vùng trong vùng nhớ RAM của database (work_mem).',
                'Ưu Thế Duyệt Luồng: Được tính toán chỉ trong một lần duyệt tuần tự trên dữ liệu đã sắp xếp, đạt độ phức tạp O(N log N).'
              ]
            },
            gotchas: {
              en: [
                'Default Framing Trap: Omitting the ROWS clause defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. If multiple rows share identical dates, the default RANGE treats them as a single peer group and sums them together simultaneously!'
              ],
              vi: [
                'Cạm Bẫy Khung Mặc Định: Bỏ qua mệnh đề ROWS sẽ tự động lấy mặc định là `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Nếu nhiều dòng có cùng ngày, RANGE mặc định sẽ xem chúng là một nhóm đồng cấp và cộng gộp toàn bộ cùng lúc!'
              ]
            },
            whenNotToUse: {
              en: [
                'Simple totals across the entire table where a standard GROUP BY aggregate suffices.',
                'Data sets lacking a deterministic sequential ordering column (timestamp, auto-incrementing ID).'
              ],
              vi: [
                'Tính tổng đơn giản trên toàn bảng khi câu lệnh GROUP BY thông thường đã đáp ứng đủ.',
                'Tập dữ liệu không có cột xác định thứ tự tuần tự (như timestamp hoặc ID tự tăng).'
              ]
            },
            relatedPatterns: {
              en: ['Lead/Lag Time Series Shift', 'First Value and Last Value Windowing'],
              vi: ['Dịch Chuyển Chuỗi Thời Gian Bằng Lead/Lag', 'Lấy Giá Trị Đầu/Cuối Bằng First_Value và Last_Value']
            }
          }
        },
        {
          id: 'sql-qp-1-2',
          title: {
            en: 'Top-N per Group & Deduplication with ROW_NUMBER() vs DENSE_RANK()',
            vi: 'Lấy Top-N Theo Nhóm & Khử Trùng Bằng ROW_NUMBER() vs DENSE_RANK()'
          },
          patternDetails: {
            problem: {
              en: 'Extracting the top 3 highest-spending transactions per customer, or picking the latest status event per sensor without running slow correlated subqueries.',
              vi: 'Trích xuất 3 giao dịch có giá trị cao nhất cho từng khách hàng, hoặc lấy sự kiện trạng thái mới nhất cho mỗi cảm biến mà không cần dùng subquery tương quan chậm chạp.'
            },
            context: {
              en: 'E-commerce dashboards, fraud detection pipelines, and sensor telemetry ingestion where each entity requires its localized leaderboard or deduplicated latest state.',
              vi: 'Bảng điều khiển thương mại điện tử, hệ thống phát hiện gian lận và luồng nạp dữ liệu IoT nơi mỗi đối tượng cần bảng xếp hạng riêng hoặc trạng thái mới nhất đã khử trùng.'
            },
            solutionOverview: {
              en: 'Generate deterministic rank numbers using ROW_NUMBER() or DENSE_RANK() inside a Common Table Expression (CTE), then filter on the rank value in the outer query.',
              vi: 'Tạo số thứ tự xếp hạng xác định bằng ROW_NUMBER() hoặc DENSE_RANK() bên trong một Common Table Expression (CTE), sau đó lọc theo số thứ tự này ở câu lệnh truy vấn bên ngoài.'
            },
            implementation: {
              language: 'sql',
              filename: 'top_n_per_group.sql',
              explanation: {
                en: 'Selecting the top 3 largest transactions for every customer with tie-handling.',
                vi: 'Lấy 3 giao dịch lớn nhất của mỗi khách hàng có xử lý trường hợp bằng điểm.'
              },
              code: 'WITH ranked_transactions AS (\n    SELECT \n        customer_id,\n        transaction_id,\n        amount,\n        transaction_time,\n        -- Assign sequential unique integer 1, 2, 3... per customer:\n        ROW_NUMBER() OVER (\n            PARTITION BY customer_id \n            ORDER BY amount DESC, transaction_time DESC\n        ) AS rank_seq\n    FROM transactions\n)\nSELECT \n    customer_id,\n    transaction_id,\n    amount,\n    transaction_time\nFROM ranked_transactions\nWHERE rank_seq <= 3\nORDER BY customer_id, rank_seq;'
            },
            explanation: {
              en: 'Window functions cannot be evaluated directly inside a WHERE clause because filtering occurs before window calculation in the SQL logical query processing pipeline. The CTE materializes the calculated ranks, allowing the outer query to filter `rank_seq <= 3` cleanly.',
              vi: 'Không thể đánh giá window functions trực tiếp bên trong mệnh đề WHERE vì việc lọc dữ liệu diễn ra trước bước tính toán window trong luồng xử lý truy vấn logic của SQL. CTE sẽ tạo bảng tạm chứa các giá trị xếp hạng đã tính, cho phép truy vấn bên ngoài lọc `rank_seq <= 3` một cách rõ ràng.'
            },
            variations: [
              {
                name: { en: 'PostgreSQL DISTINCT ON Fast Path', vi: 'Cú Pháp DISTINCT ON Siêu Tốc Trong PostgreSQL' },
                description: {
                  en: 'For Top-1 queries, PostgreSQL supports `SELECT DISTINCT ON (customer_id) ... ORDER BY customer_id, amount DESC` which executes in a single pass without a CTE wrapper.',
                  vi: 'Với các truy vấn chỉ lấy Top-1, PostgreSQL hỗ trợ `SELECT DISTINCT ON (customer_id) ... ORDER BY customer_id, amount DESC` giúp thực thi nhanh chỉ trong 1 lần quét mà không cần bọc CTE.'
                }
              }
            ],
            tradeOffs: {
              en: [
                'ROW_NUMBER vs DENSE_RANK: ROW_NUMBER guarantees an exact count (always <= 3 rows), but arbitrarily breaks ties unless secondary sort keys are specified. DENSE_RANK preserves ties (returning 4 rows if 3rd and 4th place tie).'
              ],
              vi: [
                'So Sánh ROW_NUMBER vs DENSE_RANK: ROW_NUMBER đảm bảo số lượng kết quả tuyệt đối (luôn <= 3 dòng) nhưng sẽ tự chọn bản ghi nếu bằng điểm trừ khi có khóa phụ. DENSE_RANK giữ lại tất cả các bản ghi bằng điểm (có thể trả về 4 dòng nếu vị trí 3 và 4 bằng nhau).'
              ]
            },
            gotchas: {
              en: [
                'Attempting to filter `WHERE ROW_NUMBER() OVER (...) <= 3` in the same query block throws a SQL syntax error: "window functions are not allowed in WHERE".'
              ],
              vi: [
                'Cố gắng lọc `WHERE ROW_NUMBER() OVER (...) <= 3` trong cùng một khối truy vấn sẽ gây ra lỗi cú pháp SQL: "window functions are not allowed in WHERE".'
              ]
            },
            whenNotToUse: {
              en: [
                'When searching for a single globally maximum row across the entire table (use ORDER BY amount DESC LIMIT 1 instead).'
              ],
              vi: [
                'Khi chỉ cần tìm 1 dòng có giá trị lớn nhất trên phạm vi toàn bảng (nên dùng ORDER BY amount DESC LIMIT 1).'
              ]
            },
            relatedPatterns: {
              en: ['Deduplicating Staging Tables on Ingestion', 'Lateral Join Top-N Optimization'],
              vi: ['Khử Trùng Bảng Tạm Khi Nạp Dữ Liệu', 'Tối Ưu Hóa Top-N Bằng Lateral Join']
            }
          }
        }
      ]
    },
    {
      id: 'sql-qp-ch-2',
      number: 2,
      slug: 'recursive-ctes-hierarchical-graphs',
      title: {
        en: 'Recursive CTEs for Hierarchical Graphs',
        vi: 'CTE Đệ Quy Cho Cấu Trúc Cây & Đồ Thị'
      },
      summary: {
        en: 'Production recipes for traversing organizational charts, threaded comments, and graph structures with cycle detection.',
        vi: 'Các mẫu truy vấn thực tế để duyệt sơ đồ tổ chức, bình luận phân cấp và cấu trúc đồ thị có kiểm soát vòng lặp.'
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'sql-qp-2-1',
          title: {
            en: 'Hierarchical Tree & Organization Chart Traversal',
            vi: 'Duyệt Cấu Trúc Cây Phân Cấp & Sơ Đồ Tổ Chức Bằng CTE Đệ Quy'
          },
          patternDetails: {
            problem: {
              en: 'Querying an arbitrary-depth parent-child adjacency hierarchy (e.g., manager-employee organizational charts, nested product categories) without knowing maximum tree depth in advance.',
              vi: 'Truy vấn cấu trúc phân cấp cha-con có độ sâu tùy ý (như sơ đồ quản lý-nhân viên, danh mục sản phẩm lồng nhau) mà không cần biết trước độ sâu tối đa của cây.'
            },
            context: {
              en: 'Enterprise ERP systems, access-control RBAC role inheritance trees, and web discussion forums requiring complete tree path construction and indentation levels.',
              vi: 'Hệ thống ERP doanh nghiệp, cây kế thừa quyền hạn RBAC và diễn đàn thảo luận đòi hỏi xây dựng đường dẫn cây hoàn chỉnh và tính toán cấp bậc thụt lề.'
            },
            solutionOverview: {
              en: 'Author a `WITH RECURSIVE` Common Table Expression composed of an Anchor Member (the root nodes) and a Recursive Member (children joined to parent working table) linked by UNION ALL.',
              vi: 'Xây dựng một Common Table Expression `WITH RECURSIVE` gồm hai phần: Phần Gốc (Anchor Member - các node gốc) và Phần Đệ Quy (Recursive Member - kết nối node con với node cha) được liên kết bằng UNION ALL.'
            },
            architectureDiagram: {
              title: {
                en: 'Recursive CTE Evaluation Pipeline',
                vi: 'Tiến Trình Đánh Giá Của CTE Đệ Quy'
              },
              steps: [
                {
                  stepNumber: 1,
                  title: { en: 'Anchor Query Evaluation', vi: 'Đánh Giá Truy Vấn Gốc' },
                  description: {
                    en: 'Engine executes non-recursive query (WHERE manager_id IS NULL) and populates Working Table.',
                    vi: 'Engine thực thi truy vấn gốc (WHERE manager_id IS NULL) và nạp dữ liệu vào Working Table.'
                  }
                },
                {
                  stepNumber: 2,
                  title: { en: 'Recursive Step Iteration', vi: 'Lặp Bước Đệ Quy' },
                  description: {
                    en: 'Engine joins base table with Working Table to find children of current level, incrementing depth.',
                    vi: 'Engine kết nối bảng gốc với Working Table để tìm con của cấp hiện tại và tăng biến depth.'
                  }
                },
                {
                  stepNumber: 3,
                  title: { en: 'Termination & Final Union', vi: 'Kết Thúc & Hợp Kết Quả' },
                  description: {
                    en: 'Loop terminates automatically when Recursive Step produces zero rows. Results are returned.',
                    vi: 'Vòng lặp tự động dừng khi bước đệ quy trả về 0 dòng. Toàn bộ kết quả được gom lại và trả về.'
                  }
                }
              ]
            },
            implementation: {
              language: 'sql',
              filename: 'recursive_org_chart.sql',
              explanation: {
                en: 'Traversing an employee organization chart with depth levels and materialized path string.',
                vi: 'Duyệt sơ đồ tổ chức nhân viên kèm theo cấp bậc độ sâu và chuỗi đường dẫn trực quan.'
              },
              code: 'WITH RECURSIVE org_tree AS (\n    -- 1. ANCHOR MEMBER: Find CEO / Top-Level Management\n    SELECT \n        employee_id,\n        name,\n        manager_id,\n        1 AS depth_level,\n        name::TEXT AS path_string\n    FROM employees\n    WHERE manager_id IS NULL\n    \n    UNION ALL\n    \n    -- 2. RECURSIVE MEMBER: Join children to previous level\n    SELECT \n        e.employee_id,\n        e.name,\n        e.manager_id,\n        ot.depth_level + 1,\n        ot.path_string || \' -> \' || e.name\n    FROM employees e\n    JOIN org_tree ot ON e.manager_id = ot.employee_id\n)\nSELECT \n    depth_level,\n    REPEAT(\'  \', depth_level - 1) || name AS organizational_hierarchy,\n    path_string\nFROM org_tree\nORDER BY path_string;'
            },
            explanation: {
              en: 'The recursive CTE begins by finding root employees with NULL managers (depth 1). On each iteration, the database matches employees whose manager_id equals an employee_id discovered in the previous round, appending names to path_string. When no further subordinates exist, the recursion cleanly stops.',
              vi: 'CTE đệ quy bắt đầu bằng việc tìm các nhân viên cấp cao nhất có manager là NULL (cấp 1). Ở mỗi vòng lặp tiếp theo, cơ sở dữ liệu tìm những nhân viên có manager_id trùng với employee_id tìm được ở vòng trước, đồng thời nối tên vào chuỗi path_string. Khi không còn cấp dưới nào, quá trình đệ quy tự động kết thúc.'
            },
            variations: [
              {
                name: { en: 'Depth-First vs Breadth-First Sort', vi: 'Sắp Xếp Theo Chiều Sâu (DFS) vs Chiều Rộng (BFS)' },
                description: {
                  en: 'Ordering by path_string produces Depth-First Search (DFS); ordering by depth_level produces Breadth-First Search (BFS).',
                  vi: 'Sắp xếp theo path_string tạo ra thứ tự duyệt theo chiều sâu (DFS); sắp xếp theo depth_level tạo thứ tự duyệt theo chiều rộng (BFS).'
                }
              }
            ],
            tradeOffs: {
              en: [
                'Flexibility vs Storage: Adjacency list with recursive CTE requires zero denormalization on writes, but requires runtime recursion on reads.',
                'Closure Table Alternative: For static trees with millions of reads and rare writes, a pre-computed Closure Table is faster.'
              ],
              vi: [
                'Linh Hoạt vs Lưu Trữ: Mô hình danh sách kề với CTE đệ quy không cần phi chuẩn hóa khi ghi, nhưng cần tính toán đệ quy khi đọc.',
                'Giải Pháp Closure Table: Với các cây ít thay đổi nhưng có hàng triệu lượt đọc, bảng Closure Table tính sẵn sẽ có tốc độ đọc cao hơn.'
              ]
            },
            gotchas: {
              en: [
                'Always use UNION ALL instead of UNION in recursive CTEs. Plain UNION incurs expensive duplicate elimination on every recursion round, destroying performance.'
              ],
              vi: [
                'Luôn sử dụng UNION ALL thay vì UNION trong CTE đệ quy. Lệnh UNION thông thường sẽ thực hiện khử trùng lặp rất tốn kém ở mỗi vòng đệ quy, làm sụt giảm nghiêm trọng hiệu năng.'
              ]
            },
            whenNotToUse: {
              en: [
                'Fixed 2-level parent-child relationships where a standard single INNER JOIN or LEFT JOIN is simpler and faster.'
              ],
              vi: [
                'Mối quan hệ cha-con cố định chỉ có 2 cấp, nơi một câu lệnh INNER JOIN hoặc LEFT JOIN thông thường sẽ đơn giản và nhanh hơn nhiều.'
              ]
            },
            relatedPatterns: {
              en: ['Nested Sets Hierarchy Model', 'Closure Table Pattern'],
              vi: ['Mô Hình Phân Cấp Tập Lồng Nhau (Nested Sets)', 'Mẫu Bảng Đóng (Closure Table)']
            }
          }
        },
        {
          id: 'sql-qp-2-2',
          title: {
            en: 'Cycle Detection in Recursive Graph Traversal',
            vi: 'Phát Hiện Vòng Lặp Vô Hạn (Cycle Detection) Khi Duyệt Đồ Thị Đệ Quy'
          },
          patternDetails: {
            problem: {
              en: 'Preventing server memory crashes and infinite query execution loops when recursive queries traverse graphs containing cyclic dependencies (e.g., A -> B -> C -> A).',
              vi: 'Ngăn chặn sự cố tràn bộ nhớ máy chủ và vòng lặp truy vấn vô tận khi CTE đệ quy duyệt qua các đồ thị có chứa liên kết vòng (ví dụ: A -> B -> C -> A).'
            },
            context: {
              en: 'Bill of Materials (BOM) manufacturing assemblies, financial debt transfer networks, and peer-to-peer dependency graphs where corrupt or circular references can occur.',
              vi: 'Hệ thống quản lý định mức nguyên vật liệu (BOM), mạng lưới luân chuyển công nợ tài chính và đồ thị phụ thuộc module nơi có thể xuất hiện tham chiếu vòng.'
            },
            solutionOverview: {
              en: 'Maintain an array of visited node identifiers in the recursive state, checking whether the current node already exists in the ancestor path (`id = ANY(visited_path)`) before recursing, or utilizing the standard ANSI SQL CYCLE clause.',
              vi: 'Lưu trữ một mảng chứa các mã định danh node đã duyệt trong trạng thái đệ quy, kiểm tra xem node hiện tại đã từng xuất hiện trong đường dẫn tổ tiên hay chưa (`id = ANY(visited_path)`) trước khi tiếp tục, hoặc dùng mệnh đề CYCLE chuẩn ANSI SQL.'
            },
            implementation: {
              language: 'sql',
              filename: 'cycle_detection_cte.sql',
              explanation: {
                en: 'Robust cycle detection using PostgreSQL array tracking and boolean is_cycle flags.',
                vi: 'Kỹ thuật phát hiện vòng lặp bằng mảng tracking và cờ boolean is_cycle trong PostgreSQL.'
              },
              code: 'WITH RECURSIVE graph_traversal AS (\n    -- 1. ANCHOR: Start at designated origin node\n    SELECT \n        node_id,\n        target_id,\n        ARRAY[node_id] AS visited_path,\n        FALSE AS is_cycle\n    FROM graph_edges\n    WHERE node_id = \'A\'\n    \n    UNION ALL\n    \n    -- 2. RECURSIVE STEP: Check if target_id is already in visited_path\n    SELECT \n        e.node_id,\n        e.target_id,\n        gt.visited_path || e.node_id,\n        e.node_id = ANY(gt.visited_path) AS is_cycle\n    FROM graph_edges e\n    JOIN graph_traversal gt ON e.node_id = gt.target_id\n    WHERE NOT gt.is_cycle -- STOP immediately when a loop is detected!\n)\nSELECT \n    node_id,\n    target_id,\n    visited_path,\n    is_cycle\nFROM graph_traversal;'
            },
            explanation: {
              en: 'The array `visited_path` accumulates node keys along the journey. The boolean check `e.node_id = ANY(gt.visited_path)` flags when an edge circles back onto a previously visited ancestor. The filter `WHERE NOT gt.is_cycle` immediately cuts off that specific recursive branch, preventing runaway loops.',
              vi: 'Mảng `visited_path` ghi nhận các khóa node dọc theo hành trình duyệt. Biểu thức kiểm tra `e.node_id = ANY(gt.visited_path)` sẽ bật cờ cảnh báo khi một cạnh quay ngược lại node tổ tiên đã đi qua. Điều kiện `WHERE NOT gt.is_cycle` sẽ lập tức chặn nhánh đệ quy đó, ngăn chặn hoàn toàn vòng lặp vô tận.'
            },
            variations: [
              {
                name: { en: 'ANSI SQL:2011 CYCLE Clause', vi: 'Mệnh Đề CYCLE Chuẩn ANSI SQL:2011' },
                description: {
                  en: 'PostgreSQL 14+ supports the native syntax: `CYCLE node_id SET is_cycle USING path` which automatically implements this tracking under the hood.',
                  vi: 'PostgreSQL 14+ hỗ trợ cú pháp chính thức: `CYCLE node_id SET is_cycle USING path` giúp engine tự động quản lý việc phát hiện vòng lặp bên dưới.'
                }
              }
            ],
            tradeOffs: {
              en: [
                'Array Allocation Cost: Appending node keys to an array on every recursive step incurs slight memory overhead, but provides 100% protection against infinite loops.'
              ],
              vi: [
                'Chi Phí Cấp Phát Mảng: Việc nối thêm khóa node vào mảng ở mỗi bước đệ quy tốn thêm một chút bộ nhớ, nhưng đem lại sự an toàn 100% trước nguy cơ treo cơ sở dữ liệu.'
              ]
            },
            gotchas: {
              en: [
                'Undirected graphs will treat simple bidirectional edges (A <-> B) as a cycle immediately unless direction or edge IDs are tracked.'
              ],
              vi: [
                'Đồ thị vô hướng sẽ coi cạnh hai chiều (A <-> B) là một chu trình lặp ngay lập tức trừ khi có cơ chế phân biệt chiều hoặc theo dõi ID cạnh.'
              ]
            },
            whenNotToUse: {
              en: [
                'Strictly validated Directed Acyclic Graphs (DAGs) where cyclic references are mathematically impossible due to database trigger constraints at write time.'
              ],
              vi: [
                'Đồ thị có hướng không có chu trình (DAG) đã được đảm bảo tính toàn vẹn bằng ràng buộc trigger từ thời điểm ghi dữ liệu.'
              ]
            },
            relatedPatterns: {
              en: ['Shortest Path Breadth-First Graph Traversal', 'Transitive Closure Generation'],
              vi: ['Tìm Đường Đi Ngắn Nhất Bằng Duyệt Đồ Thị BFS', 'Sinh Bao Đóng Bắc Cầu (Transitive Closure)']
            }
          }
        }
      ]
    }
  ]
};
