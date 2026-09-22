import { Book } from '../../types';

export const SQL_COMMON_ERRORS_BOOK: Book = {
  id: 'sql-common-errors',
  slug: 'sql-common-errors',
  title: 'SQL Common Errors',
  subtitle: {
    en: 'Diagnosis, Three-Valued Logic Pitfalls & Non-Sargable Query Traps',
    vi: 'Chẩn Đoán, Cạm Bẫy Logic Tam Trị & Lỗi Truy Vấn Non-Sargable'
  },
  bookType: 'Common Errors',
  categoryId: 'sql',
  subjectId: 'data-analytics',
  author: '4TM Editorial Board',
  role: 'Database Reliability & Query Optimization Group',
  level: 'Practical / Applied',
  estimatedReadTime: '26 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-20',
  accentColor: 'from-rose-600 to-amber-700',
  tags: [
    'Common Errors',
    'SQL',
    'NULL',
    'Three-Valued Logic',
    'Sargability',
    'Debugging',
    'Indexes'
  ],
  description: {
    en: 'Systematic root-cause diagnosis, minimal reproductions, and defensive engineering patterns for the most deceptive SQL bugs, including Three-Valued Logic NULL drops, the NOT IN subquery anomaly, and non-sargable full table scans.',
    vi: 'Chẩn đoán nguyên nhân gốc rễ, mã tái hiện tối giản và giải pháp kỹ thuật phòng ngừa cho các lỗi SQL tinh vi nhất, bao gồm logic tam trị loại bỏ NULL, bẫy subquery NOT IN và quét toàn bảng do biểu thức non-sargable.'
  },
  prerequisites: {
    en: [
      'Intermediate SQL query writing (JOINs, WHERE, GROUP BY, Subqueries)',
      'Basic understanding of B-Tree database indexes and query planners'
    ],
    vi: [
      'Kỹ năng viết truy vấn SQL trung cấp (JOINs, WHERE, GROUP BY, Subqueries)',
      'Hiểu biết cơ bản về chỉ mục B-Tree và bộ lập kế hoạch truy vấn (query planner)'
    ]
  },
  outcomes: {
    en: [
      'Diagnose and prevent silent row omissions caused by ANSI SQL Three-Valued Logic (3VL)',
      'Resolve the catastrophic zero-row result bug when combining NOT IN with nullable subqueries',
      'Refactor non-sargable function calls into index-friendly range predicates to avoid full table scans'
    ],
    vi: [
      'Chẩn đoán và khắc phục hiện tượng mất dòng ngầm do logic tam trị (3VL) trong chuẩn ANSI SQL',
      'Xử lý triệt để lỗi truy vấn trả về 0 dòng khi sử dụng toán tử NOT IN với tập con chứa giá trị NULL',
      'Tái cấu trúc các hàm non-sargable thành các điều kiện phạm vi thân thiện với chỉ mục để ngăn quét toàn bảng'
    ]
  },
  chapters: [
    {
      id: 'sql-err-ch-1',
      number: 1,
      slug: 'null-values-three-valued-logic',
      title: {
        en: 'NULL Values & Three-Valued Logic Pitfalls',
        vi: 'Giá Trị NULL & Cạm Bẫy Logic Tam Trị'
      },
      summary: {
        en: 'Diagnosing silent row omission and unexpected empty sets caused by SQL ANSI Three-Valued Logic.',
        vi: 'Chẩn đoán hiện tượng bỏ sót dòng ngầm và kết quả rỗng bất ngờ do logic tam trị trong ANSI SQL.'
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'sql-err-1-1',
          title: {
            en: 'Three-Valued Boolean Logic & The Silently Dropped NULL Filter Trap',
            vi: 'Logic Tam Trị & Cạm Bẫy Bộ Lọc Âm Thầm Loại Bỏ Dữ Liệu NULL'
          },
          errorDetails: {
            errorSignature: {
              en: "WHERE status != 'inactive' silently drops rows where status IS NULL",
              vi: "Mệnh đề WHERE status != 'inactive' âm thầm loại bỏ tất cả các dòng có status IS NULL"
            },
            symptoms: {
              en: [
                'Financial or activity reports undercount active users or transactions without throwing any syntax errors.',
                'Developers assume checking != "inactive" returns everything that is active, pending, or unassigned.',
                'Discrepancies appear between COUNT(*) on raw tables versus filtered dashboards.'
              ],
              vi: [
                'Báo cáo tài chính hoặc vận hành bị thiếu người dùng hoặc giao dịch mà không báo bất kỳ lỗi cú pháp nào.',
                'Lập trình viên nghĩ rằng lọc != "inactive" sẽ lấy toàn bộ bản ghi có trạng thái active, pending hoặc chưa phân loại.',
                'Xuất hiện sai lệch số liệu giữa COUNT(*) trên bảng gốc và kết quả trên màn hình dashboard đã lọc.'
              ]
            },
            minimalReproduction: {
              language: 'sql',
              filename: 'reproduce_null_drop.sql',
              explanation: {
                en: 'Executing an inequality filter on a table containing NULL values.',
                vi: 'Thực thi bộ lọc so sánh khác (!=) trên bảng có chứa giá trị NULL.'
              },
              code: 'CREATE TEMP TABLE subscriptions (\n    id INT,\n    user_name VARCHAR(50),\n    status VARCHAR(20) -- Can be "active", "inactive", or NULL (unassigned)\n);\n\nINSERT INTO subscriptions VALUES \n    (1, \'Alice\', \'active\'),\n    (2, \'Bob\', \'inactive\'),\n    (3, \'Charlie\', NULL); -- Pending onboarding\n\n-- Developer expects Alice and Charlie (2 rows):\nSELECT * FROM subscriptions WHERE status != \'inactive\';\n\n-- ACTUAL RESULT: Only Alice is returned! Charlie is silently excluded.'
            },
            whyItHappens: {
              en: 'SQL adheres strictly to ANSI Three-Valued Logic (3VL) with states TRUE, FALSE, and UNKNOWN. In SQL, NULL represents missing or undefined information, not a concrete value. Any equality or inequality comparison with NULL (e.g., NULL = "inactive" or NULL != "inactive") evaluates mathematically to UNKNOWN. Because a WHERE clause filters out any row unless the condition evaluates strictly to TRUE, rows with status IS NULL evaluate to UNKNOWN and are rejected.',
              vi: 'SQL tuân thủ nghiêm ngặt logic tam trị (Three-Valued Logic - 3VL) với ba trạng thái: TRUE, FALSE và UNKNOWN. Trong SQL, NULL đại diện cho thông tin bị thiếu hoặc chưa xác định, không phải là một giá trị cụ thể. Bất kỳ phép so sánh bằng hay khác nào với NULL (ví dụ NULL = "inactive" hoặc NULL != "inactive") đều trả về UNKNOWN. Vì mệnh đề WHERE chỉ giữ lại các dòng mà điều kiện đạt giá trị TRUE tuyệt đối, các dòng có status mang giá trị NULL sẽ bị đánh giá là UNKNOWN và bị loại bỏ.'
            },
            diagnosisSteps: {
              en: [
                'Check table DDL to see if the filtered column is nullable (lacks a NOT NULL constraint).',
                'Run SELECT COUNT(*) FROM table WHERE column IS NULL to quantify potentially omitted records.',
                'Evaluate the boolean truth table for the predicate when column is NULL.'
              ],
              vi: [
                'Kiểm tra định nghĩa DDL của bảng xem cột được lọc có cho phép NULL hay không (thiếu ràng buộc NOT NULL).',
                'Chạy SELECT COUNT(*) FROM table WHERE column IS NULL để xác định số lượng bản ghi có nguy cơ bị bỏ sót.',
                'Đánh giá bảng chân trị của biểu thức điều kiện khi cột mang giá trị NULL.'
              ]
            },
            correctFix: {
              language: 'sql',
              filename: 'fix_null_filter.sql',
              explanation: {
                en: 'Defensively accounting for NULL values using explicit checks or IS DISTINCT FROM.',
                vi: 'Xử lý phòng thủ giá trị NULL bằng cách kiểm tra tường minh hoặc dùng toán tử IS DISTINCT FROM.'
              },
              code: '-- Approach 1: Explicitly account for NULL with boolean OR\nSELECT * FROM subscriptions \nWHERE status != \'inactive\' OR status IS NULL;\n\n-- Approach 2: ANSI SQL standard IS DISTINCT FROM (PostgreSQL, SQLite)\nSELECT * FROM subscriptions \nWHERE status IS DISTINCT FROM \'inactive\';\n\n-- Approach 3: Coalesce to a neutral sentinel value\nSELECT * FROM subscriptions \nWHERE COALESCE(status, \'unknown\') != \'inactive\';'
            },
            fixExplanation: {
              en: 'Approach 1 explicitly handles the NULL edge case, ensuring the compound boolean evaluates to TRUE for unassigned rows. Approach 2 uses the ANSI SQL `IS DISTINCT FROM` operator, which treats NULL as an identifiable value for comparison purposes without yielding UNKNOWN. Approach 3 uses COALESCE to provide a safe fallback string before evaluation.',
              vi: 'Cách tiếp cận 1 xử lý tường minh trường hợp NULL, đảm bảo biểu thức logic kết hợp cho ra TRUE cho các dòng chưa phân loại. Cách tiếp cận 2 sử dụng toán tử chuẩn ANSI SQL `IS DISTINCT FROM`, toán tử này xem NULL như một giá trị định danh khi so sánh mà không trả về UNKNOWN. Cách tiếp cận 3 dùng hàm COALESCE để cung cấp giá trị mặc định an toàn trước khi so sánh.'
            },
            preventionRules: {
              en: [
                'Design database schemas with NOT NULL constraints and sensible DEFAULT values whenever possible.',
                'Always write unit tests with NULL values in test fixtures to verify inequality filters.',
                'Use IS DISTINCT FROM instead of != when querying nullable columns in PostgreSQL or modern SQL engines.'
              ],
              vi: [
                'Thiết kế schema cơ sở dữ liệu với ràng buộc NOT NULL và giá trị DEFAULT hợp lý bất cứ khi nào có thể.',
                'Luôn viết unit test với dữ liệu mẫu chứa NULL để kiểm tra các bộ lọc so sánh khác (!=).',
                'Sử dụng IS DISTINCT FROM thay vì != khi truy vấn các cột cho phép NULL trong PostgreSQL hoặc các database hiện đại.'
              ]
            }
          }
        },
        {
          id: 'sql-err-1-2',
          title: {
            en: 'The Subquery NULL Trap: Why NOT IN Returns Zero Rows',
            vi: 'Cạm Bẫy NULL Trong Subquery: Tại Sao Toán Tử NOT IN Trả Về 0 Dòng'
          },
          errorDetails: {
            errorSignature: {
              en: "SELECT * FROM orders WHERE user_id NOT IN (SELECT user_id FROM blacklisted_users) returns empty set",
              vi: "Truy vấn NOT IN trả về tập rỗng (0 dòng) khi tập kết quả của subquery chứa dù chỉ một giá trị NULL"
            },
            symptoms: {
              en: [
                'A query intended to exclude a small blacklist unexpectedly returns 0 rows across the entire database.',
                'Replacing NOT IN with IN returns expected matches, but NOT IN fails completely.',
                'The bug triggers intermittently only when a single new record with NULL is added to the subquery table.'
              ],
              vi: [
                'Truy vấn nhằm loại bỏ một danh sách đen nhỏ lại bất ngờ trả về 0 dòng trên toàn bộ cơ sở dữ liệu.',
                'Thay NOT IN bằng IN thì trả về kết quả bình thường, nhưng NOT IN lại hoàn toàn không trả về gì.',
                'Lỗi xuất hiện chập chờn chỉ khi có một bản ghi mới chứa giá trị NULL xuất hiện trong bảng con.'
              ]
            },
            minimalReproduction: {
              language: 'sql',
              filename: 'reproduce_not_in_null.sql',
              explanation: {
                en: 'Demonstrating how a single NULL inside a subquery breaks NOT IN for all rows.',
                vi: 'Minh họa cách một giá trị NULL duy nhất trong subquery làm hỏng toàn bộ kết quả của NOT IN.'
              },
              code: 'CREATE TEMP TABLE all_users (id INT, name VARCHAR(50));\nINSERT INTO all_users VALUES (1, \'Alice\'), (2, \'Bob\'), (3, \'Charlie\');\n\nCREATE TEMP TABLE blocked_ids (id INT);\nINSERT INTO blocked_ids VALUES (2), (NULL); -- Contains one NULL value!\n\n-- Expectation: Return Alice (id=1) and Charlie (id=3)\nSELECT * FROM all_users WHERE id NOT IN (SELECT id FROM blocked_ids);\n\n-- ACTUAL OUTPUT: (0 rows returned!)'
            },
            whyItHappens: {
              en: 'The SQL operator `x NOT IN (val1, val2, NULL)` is mathematically expanded by the query engine into: `x != val1 AND x != val2 AND x != NULL`. For Alice (id=1), `1 != 2` evaluates to TRUE. However, `1 != NULL` evaluates to UNKNOWN. Under 3VL boolean rules: `TRUE AND UNKNOWN` evaluates to `UNKNOWN`. Since a WHERE clause requires TRUE, the entire predicate fails for Alice and every other row in the table.',
              vi: 'Toán tử SQL `x NOT IN (val1, val2, NULL)` được engine cơ sở dữ liệu mở rộng thành biểu thức logic: `x != val1 AND x != val2 AND x != NULL`. Đối với Alice (id=1), biểu thức `1 != 2` trả về TRUE. Tuy nhiên, biểu thức `1 != NULL` lại trả về UNKNOWN. Theo quy tắc logic 3VL: `TRUE AND UNKNOWN` cho ra kết quả `UNKNOWN`. Vì mệnh đề WHERE chỉ giữ lại các dòng có kết quả TRUE, toàn bộ điều kiện bị thất bại đối với Alice và mọi dòng khác trong bảng.'
            },
            diagnosisSteps: {
              en: [
                'Check if the subquery SELECT target column allows NULL values in its schema.',
                'Run SELECT COUNT(*) FROM subquery_table WHERE column IS NULL to verify presence of NULLs.',
                'Inspect if switching from NOT IN to NOT EXISTS resolves the issue immediately.'
              ],
              vi: [
                'Kiểm tra xem cột trong câu lệnh SELECT của subquery có cho phép giá trị NULL trong schema hay không.',
                'Chạy SELECT COUNT(*) FROM subquery_table WHERE column IS NULL để xác nhận sự tồn tại của giá trị NULL.',
                'Kiểm tra xem việc chuyển từ NOT IN sang NOT EXISTS có giải quyết ngay lập tức vấn đề hay không.'
              ]
            },
            correctFix: {
              language: 'sql',
              filename: 'fix_not_in_null.sql',
              explanation: {
                en: 'Using NOT EXISTS or filtering out NULLs inside the subquery.',
                vi: 'Sử dụng toán tử NOT EXISTS hoặc loại bỏ giá trị NULL bên trong subquery.'
              },
              code: '-- Approach 1 (Industry Best Practice): Use NOT EXISTS\nSELECT u.*\nFROM all_users u\nWHERE NOT EXISTS (\n    SELECT 1 \n    FROM blocked_ids b \n    WHERE b.id = u.id\n);\n\n-- Approach 2: Guard the subquery with IS NOT NULL\nSELECT *\nFROM all_users\nWHERE id NOT IN (\n    SELECT id \n    FROM blocked_ids \n    WHERE id IS NOT NULL\n);'
            },
            fixExplanation: {
              en: 'NOT EXISTS operates on set existence rather than value equality. When `b.id = u.id` is compared, if `b.id` is NULL, the equality evaluates to UNKNOWN, which produces no match for the inner query. Thus NOT EXISTS correctly evaluates to TRUE for Alice. Furthermore, database query planners frequently optimize NOT EXISTS into an efficient Anti-Join.',
              vi: 'NOT EXISTS hoạt động dựa trên sự tồn tại của tập hợp thay vì so sánh bằng trên từng giá trị. Khi so sánh `b.id = u.id`, nếu `b.id` là NULL thì phép so sánh ra UNKNOWN, do đó không tìm thấy dòng nào thỏa mãn bên trong. Nhờ vậy NOT EXISTS đánh giá thành TRUE một cách chuẩn xác cho Alice. Ngoài ra, bộ lập kế hoạch truy vấn thường tối ưu hóa NOT EXISTS thành một phép Anti-Join có hiệu năng rất cao.'
            },
            preventionRules: {
              en: [
                'Banish NOT IN for subqueries in code reviews; establish an engineering standard to prefer NOT EXISTS.',
                'If NOT IN must be used with a subquery, strictly append WHERE column IS NOT NULL to the inner query.',
                'Ensure foreign key columns in lookup tables are defined with NOT NULL constraints.'
              ],
              vi: [
                'Loại bỏ việc dùng NOT IN cho subquery trong các buổi code review; thiết lập chuẩn kỹ thuật ưu tiên dùng NOT EXISTS.',
                'Nếu bắt buộc phải dùng NOT IN với subquery, phải thêm điều kiện WHERE column IS NOT NULL vào truy vấn con.',
                'Đảm bảo các cột khóa ngoại trong các bảng danh mục được định nghĩa với ràng buộc NOT NULL.'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'sql-err-ch-2',
      number: 2,
      slug: 'non-sargable-predicates-performance',
      title: {
        en: 'Non-Sargable Predicates & Query Performance Gotchas',
        vi: 'Vị Từ Non-Sargable & Các Lỗi Hiệu Năng Truy Vấn'
      },
      summary: {
        en: 'Diagnosing full table scans caused by function-wrapped indexed columns and implicit data type coercion.',
        vi: 'Chẩn đoán hiện tượng quét toàn bảng do bọc hàm trên cột chỉ mục và chuyển đổi kiểu dữ liệu ngầm định.'
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'sql-err-2-1',
          title: {
            en: 'Function Wrapping on Indexed Columns (Non-Sargable Predicate Trap)',
            vi: 'Bọc Hàm Trên Cột Chỉ Mục (Cạm Bẫy Vị Từ Non-Sargable)'
          },
          errorDetails: {
            errorSignature: {
              en: "Query planner executes Sequential Scan (Seq Scan) despite existing B-Tree index on filtered column",
              vi: "Bộ lập kế hoạch truy vấn thực thi Quét Tuần Tự (Seq Scan) dù đã có chỉ mục B-Tree trên cột được lọc"
            },
            symptoms: {
              en: [
                'Database CPU spikes to 100% and query latency increases from 2ms to over 5,000ms as table grows.',
                'EXPLAIN ANALYZE shows Filter: (date(created_at) = ...) with high cost and zero index lookups.',
                'Adding more indexes has zero effect on query execution speed.'
              ],
              vi: [
                'CPU cơ sở dữ liệu tăng vọt lên 100% và thời gian phản hồi truy vấn tăng từ 2ms lên hơn 5.000ms khi dữ liệu lớn dần.',
                'EXPLAIN ANALYZE hiển thị Filter: (date(created_at) = ...) với chi phí cao và không sử dụng chỉ mục.',
                'Tạo thêm chỉ mục thông thường không mang lại bất kỳ cải thiện nào về tốc độ truy vấn.'
              ]
            },
            minimalReproduction: {
              language: 'sql',
              filename: 'reproduce_non_sargable.sql',
              explanation: {
                en: 'Wrapping an indexed timestamp column in the DATE() function.',
                vi: 'Bọc cột thời gian timestamp đã có chỉ mục bên trong hàm DATE().'
              },
              code: '-- Given table with 5 million orders and an index on created_at\nCREATE INDEX idx_orders_created_at ON orders (created_at);\n\n-- SLOW NON-SARGABLE QUERY:\n-- The engine must compute DATE() for all 5,000,000 rows sequentially!\nSELECT id, amount \nFROM orders \nWHERE DATE(created_at) = \'2025-01-15\';'
            },
            whyItHappens: {
              en: 'A predicate is SARGable (Search Argument Able) if the database query engine can use an index to jump directly to the target leaf pages via binary search. Standard B-Tree indexes store raw column values sorted in order. When a column is wrapped in an arbitrary scalar function like DATE(created_at) or LOWER(email), the database cannot assume the function output preserves order. It must evaluate the function on every single row in the table, resulting in a full table scan.',
              vi: 'Một vị từ được coi là SARGable (Search Argument Able) nếu engine có thể sử dụng chỉ mục để nhảy thẳng đến các trang lá mục tiêu thông qua tìm kiếm nhị phân. Chỉ mục B-Tree tiêu chuẩn lưu trữ giá trị gốc của cột theo thứ tự sắp xếp. Khi một cột bị bọc trong một hàm vô hướng như DATE(created_at) hoặc LOWER(email), cơ sở dữ liệu không thể giả định đầu ra của hàm bảo toàn thứ tự. Nó buộc phải tính toán hàm trên từng dòng một trong bảng, dẫn đến quét toàn bộ bảng.'
            },
            diagnosisSteps: {
              en: [
                'Run EXPLAIN (ANALYZE, BUFFERS) on the slow query in staging or development.',
                'Inspect the plan for Seq Scan on table_name and look at the Filter line.',
                'Check if any function, mathematical operator (+, -), or type cast wraps the column name.'
              ],
              vi: [
                'Chạy EXPLAIN (ANALYZE, BUFFERS) trên truy vấn chậm trong môi trường kiểm thử hoặc dev.',
                'Kiểm tra kế hoạch thực thi tìm từ khóa Seq Scan và xem xét chi tiết dòng Filter.',
                'Kiểm tra xem có hàm, toán tử toán học (+, -) hoặc ép kiểu nào đang bọc quanh tên cột hay không.'
              ]
            },
            correctFix: {
              language: 'sql',
              filename: 'fix_sargable_query.sql',
              explanation: {
                en: 'Refactoring to a half-open range predicate or creating an expression index.',
                vi: 'Tái cấu trúc thành vị từ phạm vi nửa mở hoặc tạo chỉ mục dựa trên biểu thức.'
              },
              code: '-- Solution 1 (Recommended): Half-open interval [start, end)\n-- The column created_at is naked, allowing direct B-Tree index range scan\nSELECT id, amount \nFROM orders \nWHERE created_at >= \'2025-01-15 00:00:00\' \n  AND created_at <  \'2025-01-16 00:00:00\';\n\n-- Solution 2: Functional / Expression Index (when queries cannot be rewritten)\nCREATE INDEX idx_orders_date_created_at ON orders (DATE(created_at));'
            },
            fixExplanation: {
              en: 'Solution 1 leaves the indexed column completely untouched on the left side of the comparison operator. The query planner performs a logarithmic B-Tree seek to the start boundary and scans leaf nodes sequentially until reaching the end boundary. Solution 2 pre-computes and indexes the function result on write operations, allowing direct lookups when third-party query generators cannot be modified.',
              vi: 'Giải pháp 1 giữ nguyên cột có chỉ mục ở phía bên trái toán tử so sánh. Bộ lập kế hoạch truy vấn thực hiện tìm kiếm nhị phân với độ phức tạp logarit tới ranh giới bắt đầu và quét tuần tự các node lá cho đến ranh giới kết thúc. Giải pháp 2 tính toán trước và đánh chỉ mục kết quả của hàm khi ghi dữ liệu, cho phép tra cứu trực tiếp khi không thể sửa đổi mã truy vấn do bên thứ ba tạo ra.'
            },
            preventionRules: {
              en: [
                'Keep filtered columns "naked" on one side of comparison operators (e.g., col >= value - 1 instead of col + 1 >= value).',
                'Use half-open date range intervals [start, end) rather than applying string/date formatting functions.',
                'Implement continuous linter checks (like sqlfluff or query plan linters in CI) to flag non-sargable patterns.'
              ],
              vi: [
                'Giữ cho các cột có chỉ mục hoàn toàn "trần" ở một bên của toán tử so sánh (ví dụ col >= value - 1 thay vì col + 1 >= value).',
                'Sử dụng các khoảng thời gian nửa mở [start, end) thay vì áp dụng các hàm định dạng ngày tháng hay chuỗi.',
                'Thiết lập các công cụ linter tự động trong CI để phát hiện sớm các mẫu truy vấn non-sargable.'
              ]
            }
          }
        },
        {
          id: 'sql-err-2-2',
          title: {
            en: 'Implicit Type Coercion & Data Type Mismatch Disabling Indexes',
            vi: 'Chuyển Đổi Kiểu Ngầm Định & Không Khớp Kiểu Dữ Liệu Làm Vô Hiệu Chỉ Mục'
          },
          errorDetails: {
            errorSignature: {
              en: "Seq Scan on indexed VARCHAR column when queried with numeric literal",
              vi: "Thực thi quét tuần tự (Seq Scan) trên cột VARCHAR có chỉ mục khi truy vấn bằng giá trị số nguyên"
            },
            symptoms: {
              en: [
                'A single query lookup by phone number, account code, or national ID takes seconds instead of milliseconds.',
                'The index exists on the exact column, but the planner refuses to use it.',
                'EXPLAIN output reveals an unexpected CAST or function call in the Filter predicate.'
              ],
              vi: [
                'Một truy vấn tìm kiếm đơn lẻ theo số điện thoại, mã tài khoản hoặc CCCD mất vài giây thay vì vài mili-giây.',
                'Chỉ mục tồn tại chính xác trên cột đó nhưng bộ lập kế hoạch từ chối sử dụng.',
                'Kết quả EXPLAIN tiết lộ một phép CAST hoặc gọi hàm ngầm định xuất hiện trong dòng Filter.'
              ]
            },
            minimalReproduction: {
              language: 'sql',
              filename: 'reproduce_type_mismatch.sql',
              explanation: {
                en: 'Querying a string column with an unquoted numeric literal.',
                vi: 'Truy vấn cột kiểu chuỗi ký tự với giá trị số không có dấu ngoặc đơn.'
              },
              code: 'CREATE TABLE customers (\n    id SERIAL PRIMARY KEY,\n    phone_number VARCHAR(20) NOT NULL\n);\nCREATE INDEX idx_customers_phone ON customers (phone_number);\n\n-- Developer or ORM passes numeric integer literal:\n-- EXPLAIN shows: Filter: ((phone_number)::text = \'123456789\'::text) OR in MySQL: CAST(phone_number AS DOUBLE) = 123456789\nSELECT * FROM customers WHERE phone_number = 123456789;'
            },
            whyItHappens: {
              en: 'SQL type precedence rules determine how expressions with mixed data types are reconciled. In MySQL and many engines, numeric types have higher precedence than string types. When comparing VARCHAR to INTEGER, the engine converts every row in the table to a numeric float or integer before comparison: `CAST(phone_number AS DOUBLE) = 123456789`. Because the table column is being converted on every row, the B-Tree index on the raw string values cannot be traversed.',
              vi: 'Quy tắc ưu tiên kiểu dữ liệu trong SQL quyết định cách xử lý các biểu thức có kiểu dữ liệu khác nhau. Trong MySQL và nhiều engine, kiểu số có độ ưu tiên cao hơn kiểu chuỗi. Khi so sánh VARCHAR với INTEGER, engine sẽ ép kiểu từng dòng trong bảng sang dạng số trước khi so sánh: `CAST(phone_number AS DOUBLE) = 123456789`. Vì cột trong bảng bị ép kiểu trên mọi dòng, chỉ mục B-Tree trên giá trị chuỗi gốc trở nên vô dụng.'
            },
            diagnosisSteps: {
              en: [
                'Inspect the parameter types generated by your ORM or application query builder.',
                'Review the EXPLAIN ANALYZE output for type-casting functions wrapping the table column.',
                'Verify the table schema column definition against the application model property type.'
              ],
              vi: [
                'Kiểm tra kiểu tham số được sinh ra bởi ORM hoặc query builder trong ứng dụng.',
                'Xem xét kết quả EXPLAIN ANALYZE để tìm các hàm ép kiểu đang bọc quanh cột dữ liệu.',
                'Đối chiếu kiểu dữ liệu trong bảng DDL với kiểu dữ liệu của thuộc tính trong model ứng dụng.'
              ]
            },
            correctFix: {
              language: 'sql',
              filename: 'fix_type_mismatch.sql',
              explanation: {
                en: 'Passing string literals matching the exact schema type definition.',
                vi: 'Truyền giá trị chuỗi có dấu ngoặc khớp chính xác với định nghĩa kiểu dữ liệu trong schema.'
              },
              code: '-- Fix: Pass string literal with quotes\nSELECT * FROM customers WHERE phone_number = \'123456789\';\n\n-- In parameterized queries (Node.js / Python / Go):\n-- Ensure the parameter binding uses string type, not integer:\n-- cursor.execute("SELECT * FROM customers WHERE phone_number = %s", ("123456789",))'
            },
            fixExplanation: {
              en: 'Passing a string literal matches the indexed column type directly without requiring type coercion. The query planner performs an immediate B-Tree index seek with O(log N) complexity, retrieving the row in sub-millisecond time.',
              vi: 'Việc truyền giá trị chuỗi khớp trực tiếp với kiểu của cột có chỉ mục mà không cần chuyển đổi kiểu dữ liệu. Bộ lập kế hoạch truy vấn thực hiện tìm kiếm trực tiếp trên chỉ mục B-Tree với độ phức tạp O(log N), lấy bản ghi trong thời gian dưới một mili-giây.'
            },
            preventionRules: {
              en: [
                'Always store identifiers like phone numbers, ZIP codes, and bank accounts as VARCHAR, and query them with string parameters.',
                'Configure ORMs with strict schema typing to prevent passing numeric primitives to string database fields.',
                'Audit database query logs for queries with unquoted numeric values against text columns.'
              ],
              vi: [
                'Luôn lưu trữ các mã định danh như số điện thoại, mã bưu chính và tài khoản ngân hàng dưới dạng VARCHAR và truy vấn bằng chuỗi.',
                'Cấu hình ORM với định kiểu chặt chẽ để tránh việc truyền kiểu số nguyên vào các trường văn bản trong cơ sở dữ liệu.',
                'Kiểm tra log truy vấn cơ sở dữ liệu định kỳ để phát hiện các truy vấn truyền số không có ngoặc vào cột chuỗi.'
              ]
            }
          }
        }
      ]
    }
  ]
};
