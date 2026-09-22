import { Book } from '../../types';

export const SQL_BEST_PRACTICES_BOOK: Book = {
  id: 'sql-best-practices',
  slug: 'sql-best-practices',
  title: 'SQL Best Practices',
  subtitle: {
    en: 'Indexing Architecture, Plan Execution & Professional Query Design',
    vi: 'Kiến Trúc Đánh Chỉ Mục, Thực Thi Kế Hoạch & Thiết Kế Truy Vấn Chuyên Nghiệp'
  },
  bookType: 'Best Practices',
  categoryId: 'sql',
  subjectId: 'data-analytics',
  author: '4TM Editorial Board',
  role: 'Database Performance & Infrastructure Group',
  level: 'Professional / Team Standards',
  estimatedReadTime: '28 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-20',
  accentColor: 'from-indigo-600 to-sky-700',
  tags: [
    'Best Practices',
    'SQL',
    'Performance',
    'Indexing',
    'EXPLAIN ANALYZE',
    'Query Optimization'
  ],
  description: {
    en: 'Professional architectural standards and trade-off analyses for database index design, execution plan profiling with EXPLAIN ANALYZE, covering index strategies, and partial indexing.',
    vi: 'Tiêu chuẩn kiến trúc chuyên nghiệp và phân tích đánh đổi cho thiết kế chỉ mục cơ sở dữ liệu, phân tích kế hoạch thực thi với EXPLAIN ANALYZE, chiến lược covering index và chỉ mục một phần.'
  },
  prerequisites: {
    en: [
      'Experience authoring production SQL queries',
      'Familiarity with database tables, indexes, and query execution plans'
    ],
    vi: [
      'Kinh nghiệm viết truy vấn SQL trong môi trường production',
      'Làm quen với cấu trúc bảng, chỉ mục và kế hoạch thực thi truy vấn (execution plan)'
    ]
  },
  outcomes: {
    en: [
      'Design covering indexes to enable ultra-fast Index Only Scans that eliminate heap fetches',
      'Master the Leftmost Prefix Rule and the Equality-Sort-Range (ESR) composite indexing standard',
      'Deploy partial indexes to reduce index size by over 90% on skewed status columns and queues'
    ],
    vi: [
      'Thiết kế covering index để đạt tốc độ Index Only Scan cực nhanh và loại bỏ hoàn toàn việc đọc heap',
      'Nắm vững quy tắc tiền tố ngoài cùng bên trái và chuẩn thiết kế chỉ mục kết hợp Equality-Sort-Range (ESR)',
      'Ứng dụng chỉ mục một phần (partial index) để giảm hơn 90% dung lượng chỉ mục trên các cột trạng thái lệch'
    ]
  },
  chapters: [
    {
      id: 'sql-bp-ch-1',
      number: 1,
      slug: 'query-optimization-explain-analyze',
      title: {
        en: 'Query Optimization & EXPLAIN ANALYZE Interpretation',
        vi: 'Tối Ưu Hóa Truy Vấn & Đọc Kế Hoạch EXPLAIN ANALYZE'
      },
      summary: {
        en: 'Architectural principles for selecting the optimal scan strategy and profiling buffer cache hit ratios.',
        vi: 'Nguyên lý kiến trúc để lựa chọn chiến lược quét tối ưu và đánh giá tỷ lệ trúng bộ đệm RAM (buffer cache).'
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'sql-bp-1-1',
          title: {
            en: 'Evaluating Index Scan vs Index Only Scan vs Sequential Scan',
            vi: 'Đánh Giá Index Scan vs Index Only Scan vs Sequential Scan'
          },
          practiceDetails: {
            context: {
              en: 'Designing indexes for high-throughput OLTP APIs and reporting workloads where disk I/O latency determines p99 response times.',
              vi: 'Thiết kế chỉ mục cho các API OLTP tải cao và hệ thống báo cáo nơi độ trễ đọc ghi đĩa (I/O) quyết định thời gian phản hồi p99.'
            },
            recommendedPractice: {
              en: 'Structure composite B-Tree indexes to serve queries via Index Only Scans by appending required projection columns using the INCLUDE clause (covering index), while understanding when a Sequential Scan is legitimately the fastest access path.',
              vi: 'Cấu trúc chỉ mục B-Tree kết hợp để phục vụ truy vấn thông qua cơ chế Index Only Scan bằng cách thêm các cột hiển thị thông qua mệnh đề INCLUDE (covering index), đồng thời nhận biết khi nào Sequential Scan thực sự là lựa chọn tối ưu nhất.'
            },
            whyItMatters: {
              en: 'A standard Index Scan finds row pointers in the index but must perform random I/O heap fetches for every matching tuple to read non-indexed columns. An Index Only Scan satisfies the entire query directly from the index in memory, completely eliminating table heap accesses.',
              vi: 'Một phép Index Scan tiêu chuẩn tìm con trỏ dòng trong chỉ mục nhưng vẫn phải thực hiện các thao tác đọc ngẫu nhiên (random I/O) trên heap để lấy các cột chưa có trong chỉ mục. Ngược lại, Index Only Scan đáp ứng toàn bộ truy vấn trực tiếp từ chỉ mục trong RAM, loại bỏ hoàn toàn việc đọc bảng dữ liệu.'
            },
            goodExample: {
              language: 'sql',
              filename: 'covering_index_best_practice.sql',
              explanation: {
                en: 'Using an INCLUDE clause to create a covering index for fast index-only lookup.',
                vi: 'Sử dụng mệnh đề INCLUDE để tạo covering index giúp tra cứu chỉ mục thuần túy.'
              },
              code: '-- Create a covering index: filters by tenant_id & email, includes display fields\nCREATE INDEX idx_users_lookup \nON users (tenant_id, email) \nINCLUDE (id, full_name, created_at);\n\n-- This query requires ZERO table heap reads! It is satisfied 100% from index.\nSELECT id, full_name, created_at \nFROM users \nWHERE tenant_id = 10 \n  AND email = \'sarah@example.com\';'
            },
            riskyExample: {
              language: 'sql',
              filename: 'inefficient_index_scan.sql',
              explanation: {
                en: 'SELECT * forcing massive random I/O heap page lookups for every index match.',
                vi: 'Câu lệnh SELECT * ép cơ sở dữ liệu phải đọc ngẫu nhiên các trang heap cho từng kết quả chỉ mục.'
              },
              code: '-- Single-column index only\nCREATE INDEX idx_users_email ON users (email);\n\n-- ANTI-PATTERN: SELECT * forces database to fetch 10,000 heap pages\n-- even though index found the matching keys instantly!\nSELECT * \nFROM users \nWHERE email LIKE \'%@enterprise.com\';'
            },
            tradeOffs: {
              en: [
                'Write Amplification: Every additional column in an index or INCLUDE clause increases write overhead during INSERT and UPDATE operations.',
                'Index Bloat: Covering indexes consume additional RAM buffer pool space that could otherwise cache primary keys.',
                'Visibility Map Dependency: Index Only Scans in PostgreSQL still inspect heap pages if the table has not been vacuumed recently to confirm MVCC visibility.'
              ],
              vi: [
                'Gia Tăng Chi Phí Ghi (Write Amplification): Thêm cột vào chỉ mục hoặc INCLUDE làm tăng độ trễ khi INSERT và UPDATE.',
                'Phình To Chỉ Mục: Covering index chiếm thêm không gian bộ nhớ đệm RAM (buffer pool).',
                'Phụ Thuộc Visibility Map: Trong PostgreSQL, Index Only Scan vẫn phải đọc heap nếu bảng chưa được VACUUM gần đây để kiểm tra tính hiển thị MVCC.'
              ]
            },
            exceptions: {
              en: [
                'Small tables (< 1,000 rows): A Sequential Scan in sequential memory blocks is faster than jumping through B-Tree pointers.',
                'Low-selectivity queries: If a query returns > 20% of the entire table, the planner correctly chooses a Sequential Scan over random index lookups.'
              ],
              vi: [
                'Bảng nhỏ (< 1.000 dòng): Quét tuần tự các khối bộ nhớ liên tục sẽ nhanh hơn việc nhảy qua các con trỏ cây B-Tree.',
                'Truy vấn có độ chọn lọc thấp: Nếu truy vấn trả về hơn 20% toàn bộ bảng, bộ lập kế hoạch sẽ chủ động chọn Sequential Scan thay vì đọc ngẫu nhiên.'
              ]
            },
            checklist: {
              en: [
                'Verify EXPLAIN plan indicates "Index Only Scan" with 0 heap fetches.',
                'Ensure SELECT projection lists only strictly necessary columns; banish wildcard SELECT *.',
                'Run VACUUM ANALYZE regularly to keep the database Visibility Map completely clean.'
              ],
              vi: [
                'Kiểm tra kế hoạch EXPLAIN xác nhận hiển thị "Index Only Scan" với 0 lượt đọc heap.',
                'Đảm bảo danh sách cột trong SELECT chỉ chứa các trường thực sự cần thiết; loại bỏ hoàn toàn SELECT *.',
                'Chạy VACUUM ANALYZE định kỳ để đảm bảo bản đồ hiển thị (Visibility Map) luôn cập nhật.'
              ]
            }
          }
        },
        {
          id: 'sql-bp-1-2',
          title: {
            en: 'EXPLAIN ANALYZE Cost Estimation & Buffer Cache Health',
            vi: 'Đánh Giá Chi Phí EXPLAIN ANALYZE & Sức Khỏe Bộ Đệm RAM'
          },
          practiceDetails: {
            context: {
              en: 'Profiling slow queries in staging and production to uncover database I/O bottlenecks and misleading optimizer cost estimates.',
              vi: 'Phân tích các truy vấn chậm trong staging và production để phát hiện điểm nghẽn I/O và sự sai lệch trong ước tính chi phí.'
            },
            recommendedPractice: {
              en: 'Always run EXPLAIN with both ANALYZE and BUFFERS enabled. Focus on the discrepancy between estimated rows and actual rows, and measure the ratio of shared hit buffers (RAM) versus shared read buffers (physical disk I/O).',
              vi: 'Luôn chạy lệnh EXPLAIN với cả hai tùy chọn ANALYZE và BUFFERS được bật. Tập trung vào sự chênh lệch giữa số dòng ước tính và số dòng thực tế, đồng thời đo tỷ lệ buffer hit (RAM) so với buffer read (đĩa vật lý).'
            },
            whyItMatters: {
              en: 'Plain EXPLAIN without ANALYZE displays theoretical mathematical estimates made by the optimizer. It can completely miss physical disk bottlenecks, lock waiting times, and skewed statistics that cause catastrophic query plans.',
              vi: 'Lệnh EXPLAIN thông thường không có ANALYZE chỉ hiển thị ước tính toán học lý thuyết của bộ tối ưu hóa. Nó có thể bỏ sót hoàn toàn các điểm nghẽn đĩa vật lý, thời gian chờ khóa và số liệu thống kê bị lệch dẫn đến chọn nhầm kế hoạch thực thi.'
            },
            goodExample: {
              language: 'sql',
              filename: 'explain_analyze_buffers.sql',
              explanation: {
                en: 'Executing EXPLAIN with ANALYZE and BUFFERS to inspect true runtime metrics.',
                vi: 'Thực thi EXPLAIN với tùy chọn ANALYZE và BUFFERS để xem các chỉ số thực thi thực tế.'
              },
              code: '-- Run full execution profiling\nEXPLAIN (ANALYZE, BUFFERS, VERBOSE, TIMING)\nSELECT o.id, c.name, o.total\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nWHERE o.created_at >= \'2025-01-01\'\nORDER BY o.total DESC\nLIMIT 20;\n\n-- Inspect: \n-- 1. Buffers: shared hit=450 read=0 (100% in RAM!)\n-- 2. rows=20 (actual rows=20) -> Perfect cardinality alignment'
            },
            riskyExample: {
              language: 'sql',
              filename: 'misleading_plain_explain.sql',
              explanation: {
                en: 'Relying exclusively on theoretical Cost numbers without measuring real memory/disk metrics.',
                vi: 'Chỉ dựa vào các con số Cost lý thuyết mà không đo đạc chỉ số thực tế trên bộ nhớ/đĩa.'
              },
              code: '-- INSUFFICIENT: Only displays estimated cost units\n-- Does NOT execute query or reveal real I/O, cache misses, or actual loop counts\nEXPLAIN \nSELECT * FROM orders WHERE status = \'pending\';'
            },
            tradeOffs: {
              en: [
                'Real Execution: EXPLAIN ANALYZE actually executes the query. Running it on massive queries in production consumes significant CPU and RAM.',
                'Data Modification Caution: EXPLAIN ANALYZE on UPDATE or DELETE will alter data. Always wrap DML profiling in a BEGIN ... ROLLBACK transaction block.'
              ],
              vi: [
                'Thực Thi Thực Tế: EXPLAIN ANALYZE thực sự chạy câu lệnh. Việc chạy trên truy vấn lớn ở production sẽ tốn đáng kể tài nguyên CPU và RAM.',
                'Cẩn Trọng Với Lệnh Ghi: EXPLAIN ANALYZE trên lệnh UPDATE hoặc DELETE sẽ thay đổi dữ liệu thật. Phải luôn bọc trong khối giao dịch BEGIN ... ROLLBACK.'
              ]
            },
            exceptions: {
              en: [
                'Production write queries: Use plain EXPLAIN on production DML statements unless executed within an isolated staging replica.'
              ],
              vi: [
                'Truy vấn ghi trên production: Chỉ dùng EXPLAIN thông thường trên production trừ khi được thực hiện trên bản sao (replica) độc lập.'
              ]
            },
            checklist: {
              en: [
                'Buffer Cache Hit Ratio exceeds 99% (shared hit vs shared read).',
                'Estimated rows match actual rows within an order of magnitude; otherwise trigger ANALYZE table_name.',
                'Planning time is negligible compared to execution time.'
              ],
              vi: [
                'Tỷ lệ trúng bộ đệm (Buffer Cache Hit Ratio) đạt trên 99% (shared hit so với shared read).',
                'Số dòng ước tính khớp với số dòng thực tế trong cùng bậc độ lớn; nếu lệch phải chạy lại ANALYZE tên_bảng.',
                'Thời gian lập kế hoạch (planning time) chiếm tỷ lệ không đáng kể so với thời gian thực thi.'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'sql-bp-ch-2',
      number: 2,
      slug: 'composite-partial-indexing-architecture',
      title: {
        en: 'Composite & Partial Indexing Architecture',
        vi: 'Kiến Trúc Chỉ Mục Kết Hợp & Chỉ Mục Một Phần'
      },
      summary: {
        en: 'Architectural standards for column ordering in composite indexes and targeting skewed data with partial indexes.',
        vi: 'Tiêu chuẩn kiến trúc cho thứ tự cột trong chỉ mục kết hợp và tối ưu hóa dữ liệu bị lệch bằng chỉ mục một phần.'
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'sql-bp-2-1',
          title: {
            en: 'The Leftmost Prefix Rule & Equality-First, Range-Second Ordering',
            vi: 'Quy Tắc Tiền Tố Ngoài Cùng Bên Trái & Thứ Tự Equality-First, Range-Second'
          },
          practiceDetails: {
            context: {
              en: 'Designing multi-column composite B-Tree indexes for complex filtering, sorting, and pagination queries.',
              vi: 'Thiết kế chỉ mục B-Tree kết hợp nhiều cột cho các truy vấn có bộ lọc phức tạp, sắp xếp thứ tự và phân trang.'
            },
            recommendedPractice: {
              en: 'Follow the ESR (Equality, Sort, Range) rule: place columns filtered by exact equality (=) first, columns used in ORDER BY second, and columns filtered by inequality ranges (<, >, BETWEEN) last.',
              vi: 'Tuân thủ nghiêm ngặt quy tắc ESR (Equality, Sort, Range): đặt các cột lọc so sánh bằng (=) lên đầu, các cột dùng trong ORDER BY ở vị trí thứ hai, và các cột lọc theo phạm vi (<, >, BETWEEN) ở vị trí cuối cùng.'
            },
            whyItMatters: {
              en: 'A B-Tree sorts keys hierarchically. As soon as the database planner matches an inequality range (e.g., created_at > \'2025-01-01\'), it can no longer use subsequent columns in the composite index for index seeking, degrading further filters into in-memory row filtering.',
              vi: 'Cây B-Tree sắp xếp các khóa theo thứ tự phân cấp. Ngay khi bộ lập kế hoạch gặp một điều kiện phạm vi (ví dụ created_at > \'2025-01-01\'), nó không thể sử dụng các cột phía sau trong chỉ mục kết hợp để tìm kiếm nhị phân nữa, buộc phải chuyển sang duyệt và lọc từng dòng trong bộ nhớ.'
            },
            goodExample: {
              language: 'sql',
              filename: 'esr_index_ordering.sql',
              explanation: {
                en: 'Placing equality column first, sort column second, and range condition third.',
                vi: 'Đặt cột so sánh bằng lên đầu, cột sắp xếp thứ hai và điều kiện phạm vi ở vị trí thứ ba.'
              },
              code: '-- Query: WHERE tenant_id = 5 AND status = \'paid\' AND amount > 100 ORDER BY created_at\n-- Optimal ESR Composite Index:\nCREATE INDEX idx_orders_esr \nON orders (tenant_id, status, created_at, amount);\n\n-- Direct B-Tree seek down to tenant_id=5 and status=\'paid\',\n-- index order satisfies ORDER BY created_at with zero sorting cost!'
            },
            riskyExample: {
              language: 'sql',
              filename: 'broken_index_ordering.sql',
              explanation: {
                en: 'Placing the range column first in the index, breaking downstream column seeking.',
                vi: 'Đặt cột phạm vi lên đầu chỉ mục, làm vô hiệu hóa khả năng tìm kiếm của các cột phía sau.'
              },
              code: '-- ANTI-PATTERN: Range column placed first\nCREATE INDEX idx_orders_bad \nON orders (created_at, tenant_id, status);\n\n-- When created_at is filtered by range, the index CANNOT jump directly \n-- to tenant_id or status! It must scan every entry across the date range.'
            },
            tradeOffs: {
              en: [
                'Order Specificity: An index on (A, B, C) can support queries filtering on (A), (A, B), or (A, B, C), but CANNOT support queries filtering only on (B) or (C) without A.',
                'Index Count: Serving diverse filter combinations often requires creating multiple composite indexes with varied column orders.'
              ],
              vi: [
                'Độ Đặc Thù Về Thứ Tự: Chỉ mục trên (A, B, C) có thể phục vụ truy vấn lọc (A), (A, B) hoặc (A, B, C), nhưng KHÔNG THỂ phục vụ truy vấn chỉ lọc trên (B) hoặc (C) mà thiếu (A).',
                'Số Lượng Chỉ Mục: Phục vụ nhiều tổ hợp lọc khác nhau thường đòi hỏi phải tạo nhiều chỉ mục kết hợp với thứ tự cột khác nhau.'
              ]
            },
            exceptions: {
              en: [
                'Skip Scans: Modern databases (like MySQL 8.0 or Oracle) can occasionally perform index skip scans over low-cardinality leading columns, but explicit ordering remains significantly faster.'
              ],
              vi: [
                'Skip Scans: Một số cơ sở dữ liệu hiện đại có thể nhảy qua các cột đầu có độ đa dạng thấp (low cardinality), nhưng thiết kế đúng thứ tự tường minh vẫn nhanh hơn đáng kể.'
              ]
            },
            checklist: {
              en: [
                'Place exact equality columns (=) before range columns (<, >).',
                'Verify that query ORDER BY matches the index column direction (ASC/DESC).',
                'Confirm the leftmost prefix matches the primary filter predicate in your application.'
              ],
              vi: [
                'Đặt các cột so sánh bằng (=) trước các cột so sánh phạm vi (<, >).',
                'Kiểm tra chiều sắp xếp ORDER BY khớp với chiều của chỉ mục (ASC/DESC).',
                'Xác nhận tiền tố ngoài cùng bên trái khớp với điều kiện lọc chính trong ứng dụng.'
              ]
            }
          }
        },
        {
          id: 'sql-bp-2-2',
          title: {
            en: 'Partial Indexes for Highly Skewed Status Flags & Soft Deletes',
            vi: 'Chỉ Mục Một Phần (Partial Index) Cho Cột Trạng Thái Lệch & Soft Delete'
          },
          practiceDetails: {
            context: {
              en: 'Managing large-scale transactional tables where status distributions are heavily skewed (e.g., 99% of tasks are completed, 1% are pending/failed).',
              vi: 'Quản lý các bảng giao dịch quy mô lớn nơi phân bố trạng thái bị lệch nghiêm trọng (ví dụ 99% tác vụ đã hoàn thành, chỉ 1% ở trạng thái pending hoặc lỗi).'
            },
            recommendedPractice: {
              en: 'Deploy partial indexes with a WHERE filter clause to index only the active or exceptional rows that applications actually query, completely omitting historical archived data from the index tree.',
              vi: 'Triển khai chỉ mục một phần (partial index) với mệnh đề lọc WHERE để chỉ đánh chỉ mục các dòng đang hoạt động hoặc ngoại lệ mà ứng dụng thực sự tìm kiếm, bỏ qua hoàn toàn dữ liệu lịch sử đã lưu trữ.'
            },
            whyItMatters: {
              en: 'A partial index reduces index footprint by up to 95–99%, allows the entire index tree to fit permanently into RAM buffer cache, and eliminates write amplification on completed records.',
              vi: 'Chỉ mục một phần giúp giảm dung lượng chỉ mục từ 95–99%, cho phép toàn bộ cây chỉ mục nằm vừa vặn trong bộ nhớ đệm RAM và loại bỏ hoàn toàn chi phí ghi chỉ mục khi hoàn thành tác vụ.'
            },
            goodExample: {
              language: 'sql',
              filename: 'partial_index_best_practice.sql',
              explanation: {
                en: 'Indexing only uncompleted task queue items and active records.',
                vi: 'Chỉ đánh chỉ mục cho các tác vụ chưa hoàn thành trong hàng đợi và các bản ghi hoạt động.'
              },
              code: '-- In a table with 50,000,000 processed jobs and 5,000 pending jobs:\n-- This partial index contains ONLY 5,000 rows (size: ~128KB instead of 2GB!)\nCREATE INDEX idx_jobs_pending \nON queue_jobs (priority DESC, created_at ASC) \nWHERE status = \'pending\';\n\n-- Worker polling query uses this lightning-fast partial index:\nSELECT id, payload \nFROM queue_jobs \nWHERE status = \'pending\' \nORDER BY priority DESC, created_at ASC \nLIMIT 10;'
            },
            riskyExample: {
              language: 'sql',
              filename: 'bloated_full_index.sql',
              explanation: {
                en: 'Building a full index across 50 million historical rows to serve queries that only care about pending items.',
                vi: 'Tạo chỉ mục đầy đủ trên 50 triệu dòng lịch sử chỉ để phục vụ các truy vấn tìm kiếm bản ghi đang chờ xử lý.'
              },
              code: '-- ANTI-PATTERN: Indexes all 50 million completed rows wastefully\nCREATE INDEX idx_jobs_full ON queue_jobs (status, priority DESC, created_at ASC);'
            },
            tradeOffs: {
              en: [
                'Query Specificity: The query WHERE clause must match the partial index predicate exactly; otherwise, the planner cannot use the index.',
                'Parameter Limitations: In prepared statements, dynamic parameter values (e.g., WHERE status = $1) cannot utilize a static partial index defined with WHERE status = \'pending\'.'
              ],
              vi: [
                'Độ Đặc Thù Truy Vấn: Mệnh đề WHERE của truy vấn phải khớp chính xác với điều kiện của chỉ mục một phần; nếu không, bộ lập kế hoạch sẽ không thể dùng chỉ mục.',
                'Hạn Chế Về Tham Số: Trong prepared statement, các tham số động (như WHERE status = $1) không thể sử dụng chỉ mục một phần tĩnh được định nghĩa với WHERE status = \'pending\'.'
              ]
            },
            exceptions: {
              en: [
                'Uniform distributions: When status values are evenly distributed (e.g., 25% each across 4 states), a standard composite index is more appropriate.'
              ],
              vi: [
                'Phân bố đồng đều: Khi các giá trị trạng thái phân bố đều (ví dụ 25% cho mỗi trạng thái trong 4 trạng thái), một chỉ mục kết hợp thông thường sẽ phù hợp hơn.'
              ]
            },
            checklist: {
              en: [
                'Identify columns where > 90% of rows contain dead/inactive status values.',
                'Verify that partial index condition matches production polling queries verbatim.',
                'Measure index disk size savings using pg_relation_size.'
              ],
              vi: [
                'Xác định các cột có hơn 90% số dòng mang giá trị trạng thái đã đóng hoặc không hoạt động.',
                'Đảm bảo điều kiện của chỉ mục một phần khớp nguyên văn với câu lệnh truy vấn trong code ứng dụng.',
                'Đo đạc dung lượng đĩa tiết kiệm được bằng hàm pg_relation_size.'
              ]
            }
          }
        }
      ]
    }
  ]
};
