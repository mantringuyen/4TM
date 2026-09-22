import { Book } from '../../types';

export const SQL_DEFINITIONS_BOOK: Book = {
  id: 'sql-definitions',
  slug: 'sql-definitions',
  title: 'SQL Definitions',
  subtitle: {
    en: 'Core Relational Models, Isolation Levels & Storage Mechanics',
    vi: 'Mô Hình Quan Hệ Cốt Lõi, Mức Độ Cô Lập & Cơ Chế Lưu Trữ'
  },
  bookType: 'Definitions',
  categoryId: 'sql',
  subjectId: 'data-analytics',
  author: '4TM Editorial Board',
  role: 'Database Architecture & Storage Engine Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '28 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-20',
  accentColor: 'from-cyan-600 to-blue-800',
  tags: [
    'Definitions',
    'SQL',
    'ACID',
    'MVCC',
    'Transactions',
    'Storage Engines'
  ],
  description: {
    en: 'Rigorous technical definitions, mental models, and formal mechanics for the core relational primitives, transaction isolation levels, and storage engine internals in modern SQL databases.',
    vi: 'Định nghĩa kỹ thuật chuẩn xác, mô hình tư duy trực quan và cơ chế chính thức cho các thành phần quan hệ cốt lõi, mức độ cô lập giao dịch và cơ chế storage engine trong cơ sở dữ liệu SQL hiện đại.'
  },
  prerequisites: {
    en: [
      'Basic SQL query knowledge (SELECT, INSERT, UPDATE, DELETE)',
      'Familiarity with relational tables, primary keys, and foreign keys'
    ],
    vi: [
      'Kiến thức truy vấn SQL cơ bản (SELECT, INSERT, UPDATE, DELETE)',
      'Làm quen với bảng quan hệ, khóa chính (Primary Key) và khóa ngoại (Foreign Key)'
    ]
  },
  outcomes: {
    en: [
      'Master the precise ANSI SQL definitions of all four transaction isolation levels',
      'Distinguish Dirty Reads, Non-Repeatable Reads, Phantom Reads, and Serialization Anomalies',
      'Understand the physical mechanics of Multi-Version Concurrency Control (MVCC) and Write-Ahead Logging (WAL)'
    ],
    vi: [
      'Nắm vững định nghĩa kỹ thuật ANSI SQL của toàn bộ 4 mức độ cô lập giao dịch',
      'Phân biệt rõ ràng Dirty Reads, Non-Repeatable Reads, Phantom Reads và Lỗi Tuần Tự Hóa (Serialization Anomalies)',
      'Hiểu sâu cơ chế vật lý của Đa Phiên Bản Kiểm Soát Đồng Thời (MVCC) và Nhật Ký Ghi Trước (WAL)'
    ]
  },
  chapters: [
    {
      id: 'sql-def-ch-1',
      number: 1,
      slug: 'acid-isolation-levels',
      title: {
        en: 'ACID Guarantees & Transaction Isolation Levels',
        vi: 'Bảo Đảm ACID & Các Mức Độ Cô Lập Giao Dịch'
      },
      summary: {
        en: 'Formal definitions of transaction isolation levels under ANSI SQL and the concurrency anomalies they prevent.',
        vi: 'Định nghĩa chuẩn hóa các mức độ cô lập giao dịch theo tiêu chuẩn ANSI SQL và các bất thường đồng thời mà chúng ngăn chặn.'
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'sql-def-1-1',
          title: {
            en: 'Transaction Isolation Levels (Read Committed to Serializable)',
            vi: 'Các Mức Độ Cô Lập Giao Dịch (Từ Read Committed Đến Serializable)'
          },
          definitionDetails: {
            term: {
              en: 'Transaction Isolation Level',
              vi: 'Mức Độ Cô Lập Giao Dịch (Transaction Isolation Level)'
            },
            formalDefinition: {
              en: 'The ANSI/ISO SQL standard defines four transaction isolation levels (Read Uncommitted, Read Committed, Repeatable Read, and Serializable) specified by the degree to which a transaction must be protected from data modifications made by other concurrently running transactions.',
              vi: 'Tiêu chuẩn ANSI/ISO SQL định nghĩa bốn mức độ cô lập giao dịch (Read Uncommitted, Read Committed, Repeatable Read và Serializable) được xác định dựa trên mức độ mà một giao dịch được bảo vệ khỏi các thay đổi dữ liệu do các giao dịch đồng thời khác thực hiện.'
            },
            mentalModel: {
              en: 'Think of isolation levels as privacy walls between concurrent workers in an office. At Read Committed, workers only look at filed documents. At Repeatable Read, each worker receives a frozen snapshot photocopy of the office file cabinet when their shift begins. At Serializable, the database mathematically guarantees the outcome matches having each worker enter the office strictly one at a time.',
              vi: 'Hãy hình dung các mức cô lập như những bức tường ngăn cách giữa các nhân viên làm việc cùng lúc trong văn phòng. Ở Read Committed, nhân viên chỉ xem các hồ sơ đã chính thức lưu trữ. Ở Repeatable Read, mỗi nhân viên nhận một bản sao chụp cố định của tủ hồ sơ tại thời điểm ca làm việc bắt đầu. Ở Serializable, hệ cơ sở dữ liệu cam kết kết quả đầu ra giống như việc từng nhân viên bước vào văn phòng lần lượt từng người một.'
            },
            whyItMatters: {
              en: 'Choosing an incorrect isolation level exposes applications to data corruption anomalies such as double-spending in financial transactions, negative inventory counts, or inconsistent reporting audits.',
              vi: 'Việc lựa chọn mức độ cô lập không chính xác sẽ khiến ứng dụng đối mặt với các lỗi toàn vẹn dữ liệu như trừ tiền hai lần trong giao dịch tài chính, số lượng tồn kho bị âm hoặc các báo cáo kiểm toán không nhất quán.'
            },
            minimalExample: {
              language: 'sql',
              filename: 'isolation_levels.sql',
              explanation: {
                en: 'Setting transaction isolation levels explicitly in PostgreSQL and standard ANSI SQL.',
                vi: 'Thiết lập mức độ cô lập giao dịch tường minh trong PostgreSQL và chuẩn ANSI SQL.'
              },
              code: '-- Begin transaction with explicit isolation level\nBEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n\nSELECT balance FROM user_accounts WHERE user_id = 42;\n\n-- Even if another transaction commits a balance update now,\n-- repeating this exact query in this transaction returns the identical balance.\nSELECT balance FROM user_accounts WHERE user_id = 42;\n\nCOMMIT;'
            },
            commonMisconception: {
              en: 'A common misconception is that Repeatable Read completely prevents Phantom Reads. In traditional lock-based 2PL implementations, Repeatable Read only locks existing rows read by the transaction, allowing another transaction to insert a new row matching the filter range unless range locks or MVCC snapshots are active.',
              vi: 'Một hiểu lầm phổ biến là cho rằng Repeatable Read ngăn chặn hoàn toàn hiện tượng Phantom Reads. Trong các hệ thống khóa 2PL truyền thống, Repeatable Read chỉ khóa các dòng hiện hữu được đọc, cho phép giao dịch khác chèn thêm một dòng mới thỏa mãn điều kiện lọc trừ khi có khóa phạm vi (range locks) hoặc snapshot MVCC.'
            },
            quickReference: {
              en: [
                'Read Uncommitted: Allows Dirty Reads, Non-Repeatable Reads, Phantom Reads.',
                'Read Committed: Default in PostgreSQL, SQL Server, Oracle. Prevents Dirty Reads.',
                'Repeatable Read: Default in MySQL InnoDB. Prevents Dirty Reads & Non-Repeatable Reads.',
                'Serializable: Highest isolation; prevents all concurrency anomalies using serial execution simulation.'
              ],
              vi: [
                'Read Uncommitted: Cho phép Dirty Reads, Non-Repeatable Reads, Phantom Reads.',
                'Read Committed: Mặc định trong PostgreSQL, SQL Server, Oracle. Ngăn chặn Dirty Reads.',
                'Repeatable Read: Mặc định trong MySQL InnoDB. Ngăn chặn Dirty Reads & Non-Repeatable Reads.',
                'Serializable: Mức cô lập cao nhất; ngăn chặn mọi bất thường đồng thời bằng cách mô phỏng thực thi tuần tự.'
              ]
            }
          },
          comparisonTable: {
            headers: [
              { en: 'Isolation Level', vi: 'Mức Độ Cô Lập' },
              { en: 'Dirty Read', vi: 'Đọc Dữ Liệu Rác (Dirty Read)' },
              { en: 'Non-Repeatable Read', vi: 'Đọc Không Lặp Lại' },
              { en: 'Phantom Read', vi: 'Đọc Dữ Liệu Ảo (Phantom Read)' },
              { en: 'Serialization Anomaly', vi: 'Bất Thường Tuần Tự Hóa' }
            ],
            rows: [
              {
                en: ['Read Uncommitted', 'Allowed', 'Allowed', 'Allowed', 'Allowed'],
                vi: ['Read Uncommitted', 'Có thể xảy ra', 'Có thể xảy ra', 'Có thể xảy ra', 'Có thể xảy ra']
              },
              {
                en: ['Read Committed', 'Prevented', 'Allowed', 'Allowed', 'Allowed'],
                vi: ['Read Committed', 'Được ngăn chặn', 'Có thể xảy ra', 'Có thể xảy ra', 'Có thể xảy ra']
              },
              {
                en: ['Repeatable Read', 'Prevented', 'Prevented', 'Prevented (MVCC)', 'Allowed (Write Skew)'],
                vi: ['Repeatable Read', 'Được ngăn chặn', 'Được ngăn chặn', 'Được ngăn chặn (MVCC)', 'Có thể xảy ra (Write Skew)']
              },
              {
                en: ['Serializable', 'Prevented', 'Prevented', 'Prevented', 'Prevented'],
                vi: ['Serializable', 'Được ngăn chặn', 'Được ngăn chặn', 'Được ngăn chặn', 'Được ngăn chặn']
              }
            ]
          },
          diagram: {
            title: {
              en: 'Transaction Isolation Boundary Progression',
              vi: 'Tiến Trình Cấp Độ Cách Ly Giữa Các Giao Dịch Đồng Thời'
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Read Uncommitted', vi: 'Read Uncommitted' },
                description: {
                  en: 'Zero boundary: Transactions read uncommitted memory buffers of other active transactions.',
                  vi: 'Không có ranh giới: Giao dịch đọc trực tiếp vùng nhớ đệm chưa commit của các giao dịch khác.'
                }
              },
              {
                stepNumber: 2,
                title: { en: 'Read Committed', vi: 'Read Committed' },
                description: {
                  en: 'Statement Snapshot: Each individual SQL query sees only tuples committed before that query began.',
                  vi: 'Snapshot theo câu lệnh: Mỗi truy vấn SQL đơn lẻ chỉ nhìn thấy các bộ dữ liệu đã commit trước khi câu lệnh đó bắt đầu.'
                }
              },
              {
                stepNumber: 3,
                title: { en: 'Repeatable Read', vi: 'Repeatable Read' },
                description: {
                  en: 'Transaction Snapshot: The entire transaction sees only tuples committed before the transaction began.',
                  vi: 'Snapshot theo giao dịch: Toàn bộ giao dịch chỉ nhìn thấy các bộ dữ liệu đã commit trước khi giao dịch bắt đầu.'
                }
              },
              {
                stepNumber: 4,
                title: { en: 'Serializable', vi: 'Serializable' },
                description: {
                  en: 'Dependency Tracking: Engine monitors read/write conflict graphs (SSI) to abort transactions violating serializability.',
                  vi: 'Theo dõi phụ thuộc: Engine theo dõi đồ thị xung đột đọc/ghi (SSI) để hủy bỏ các giao dịch vi phạm tính tuần tự.'
                }
              }
            ]
          }
        },
        {
          id: 'sql-def-1-2',
          title: {
            en: 'Concurrency Anomalies: Dirty Reads, Non-Repeatable Reads & Phantom Reads',
            vi: 'Bất Thường Đồng Thời: Dirty Reads, Non-Repeatable Reads & Phantom Reads'
          },
          definitionDetails: {
            term: {
              en: 'Concurrency Anomaly',
              vi: 'Bất Thường Đồng Thời (Concurrency Anomaly)'
            },
            formalDefinition: {
              en: 'A concurrency anomaly is an inconsistent or non-serializable database state occurring when multiple transactions execute concurrently and their interleaved read and write operations violate isolation expectations.',
              vi: 'Bất thường đồng thời là trạng thái cơ sở dữ liệu không nhất quán hoặc không tuần tự hóa xảy ra khi nhiều giao dịch thực thi đồng thời và các thao tác đọc ghi xen kẽ của chúng vi phạm kỳ vọng cô lập.'
            },
            mentalModel: {
              en: 'Imagine two people editing a shared spreadsheet simultaneously: Dirty Read is Person A writing a draft number and erasing it, while Person B made a financial decision based on that fleeting draft. Non-Repeatable Read is Person A reading an inventory count of 10, Person B reducing it to 5 and saving, and Person A reading it again within the same report to find it changed. Phantom Read is Person A counting 3 employees in Sales, Person B hiring a 4th employee, and Person A discovering a 4th employee suddenly appearing in subsequent range filters.',
              vi: 'Hãy hình dung hai người cùng chỉnh sửa một bảng tính dùng chung: Dirty Read là Người A gõ số nháp rồi xóa đi, trong khi Người B đã kịp đưa ra quyết định dựa trên con số nháp đó. Non-Repeatable Read là Người A đọc số lượng tồn kho là 10, Người B sửa thành 5 rồi lưu lại, và Người A đọc lại lần hai trong cùng một phiên báo cáo thấy số lượng đã thay đổi. Phantom Read là Người A đếm có 3 nhân viên phòng Sales, Người B tuyển nhân viên thứ 4, và Người A lọc lại danh sách thấy nhân viên thứ 4 đột ngột xuất hiện.'
            },
            whyItMatters: {
              en: 'Understanding the mechanics of each anomaly allows systems engineers to select the minimal safe isolation level without paying the throughput penalties of full serialization.',
              vi: 'Hiểu rõ cơ chế của từng bất thường giúp kỹ sư hệ thống lựa chọn mức độ cô lập an toàn tối thiểu mà không phải chịu tổn thất hiệu năng xử lý của cơ chế tuần tự hóa toàn phần.'
            },
            minimalExample: {
              language: 'sql',
              filename: 'concurrency_anomalies.sql',
              explanation: {
                en: 'Demonstrating Non-Repeatable Read vs Repeatable Read behavior.',
                vi: 'Minh họa hành vi Non-Repeatable Read so với Repeatable Read.'
              },
              code: '-- Transaction 1 (Read Committed):\nBEGIN;\nSELECT price FROM products WHERE id = 101; -- returns 100.00\n\n-- Transaction 2 executes concurrently:\n-- BEGIN; UPDATE products SET price = 150.00 WHERE id = 101; COMMIT;\n\n-- In Transaction 1:\nSELECT price FROM products WHERE id = 101; -- returns 150.00! (Non-Repeatable Read anomaly)\nCOMMIT;'
            },
            commonMisconception: {
              en: 'Engineers frequently confuse Non-Repeatable Read with Phantom Read. Non-Repeatable Read applies strictly to updating or deleting an existing row that was already read. Phantom Read applies strictly to inserting new rows that match a search predicate.',
              vi: 'Các kỹ sư thường nhầm lẫn giữa Non-Repeatable Read và Phantom Read. Non-Repeatable Read áp dụng chính xác cho việc cập nhật hoặc xóa một dòng hiện hữu đã được đọc trước đó. Phantom Read áp dụng chính xác cho việc chèn thêm các dòng mới thỏa mãn điều kiện tìm kiếm theo phạm vi.'
            },
            quickReference: {
              en: [
                'Dirty Read (P1): Transaction reads data written by an uncommitted transaction.',
                'Non-Repeatable Read (P2): Transaction re-reads a row and finds modified values committed by another transaction.',
                'Phantom Read (P3): Transaction re-runs a range query and discovers newly inserted rows satisfying the predicate.'
              ],
              vi: [
                'Dirty Read (P1): Giao dịch đọc dữ liệu được ghi bởi một giao dịch chưa commit.',
                'Non-Repeatable Read (P2): Giao dịch đọc lại một dòng và nhận thấy giá trị đã bị thay đổi bởi giao dịch khác đã commit.',
                'Phantom Read (P3): Giao dịch chạy lại truy vấn phạm vi và phát hiện các dòng mới được chèn thỏa mãn điều kiện lọc.'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'sql-def-ch-2',
      number: 2,
      slug: 'storage-engine-concurrency-glossary',
      title: {
        en: 'Storage Engine & Concurrency Mechanics',
        vi: 'Storage Engine & Cơ Chế Xử Lý Đồng Thời'
      },
      summary: {
        en: 'Core technical definitions for Multi-Version Concurrency Control (MVCC), tuple visibility, and Write-Ahead Logging (WAL).',
        vi: 'Định nghĩa kỹ thuật cốt lõi cho Kiểm Soát Đồng Thời Đa Phiên Bản (MVCC), khả năng hiển thị bộ dữ liệu và Nhật Ký Ghi Trước (WAL).'
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'sql-def-2-1',
          title: {
            en: 'Multi-Version Concurrency Control (MVCC) & Tuple Visibility',
            vi: 'Kiểm Soát Đồng Thời Đa Phiên Bản (MVCC) & Khả Năng Hiển Thị Tuple'
          },
          definitionDetails: {
            term: {
              en: 'Multi-Version Concurrency Control (MVCC)',
              vi: 'Đa Phiên Bản Kiểm Soát Đồng Thời (MVCC)'
            },
            formalDefinition: {
              en: 'MVCC is a database concurrency control method where write operations create a new physical version of a row rather than overwriting existing data in-place, allowing concurrent read transactions to access older consistent snapshots of data without acquiring read locks.',
              vi: 'MVCC là một phương thức kiểm soát đồng thời trong cơ sở dữ liệu, trong đó các thao tác ghi tạo ra một phiên bản vật lý mới của dòng thay vì ghi đè trực tiếp lên dữ liệu hiện có, cho phép các giao dịch đọc đồng thời truy cập các snapshot nhất quán cũ mà không cần chiếm giữ khóa đọc.'
            },
            mentalModel: {
              en: 'Think of MVCC like a Git repository for database rows. When an UPDATE occurs, the database does not erase the old commit; it writes a new commit (tuple) with a creation transaction ID (xmin) and marks the previous commit with an expiration transaction ID (xmax). Readers simply inspect the commit that matches their snapshot horizon.',
              vi: 'Hãy hình dung MVCC như một kho lưu trữ Git cho các dòng dữ liệu. Khi câu lệnh UPDATE diễn ra, cơ sở dữ liệu không xóa commit cũ; nó tạo một commit mới (tuple) mang mã ID giao dịch tạo (xmin) và đánh dấu commit trước đó bằng mã ID giao dịch kết thúc (xmax). Các giao dịch đọc chỉ đơn giản xem commit khớp với phạm vi snapshot của mình.'
            },
            whyItMatters: {
              en: 'MVCC is the foundation of high-concurrency relational databases. It guarantees that "readers never block writers, and writers never block readers". However, it introduces table bloat and requires periodic garbage collection (such as PostgreSQL VACUUM or MySQL Undo Log purging).',
              vi: 'MVCC là nền tảng của các cơ sở dữ liệu quan hệ có mức độ đồng thời cao. Nó đảm bảo rằng "người đọc không bao giờ chặn người ghi, và người ghi không bao giờ chặn người đọc". Tuy nhiên, nó dẫn đến hiện tượng phình to bảng (table bloat) và đòi hỏi cơ chế thu hồi bộ nhớ rác định kỳ (như VACUUM trong PostgreSQL hoặc Undo Log purge trong MySQL).'
            },
            minimalExample: {
              language: 'sql',
              filename: 'mvcc_tuple_inspection.sql',
              explanation: {
                en: 'Inspecting MVCC system hidden columns (xmin, xmax) in PostgreSQL.',
                vi: 'Kiểm tra các cột ẩn hệ thống của cơ chế MVCC (xmin, xmax) trong PostgreSQL.'
              },
              code: '-- Query hidden MVCC system attributes in PostgreSQL\nSELECT \n    ctid,       -- Physical page and offset location (e.g., (0,1))\n    xmin,       -- Transaction ID that created this tuple version\n    xmax,       -- Transaction ID that deleted/expired this tuple (0 if active)\n    user_id,\n    balance\nFROM user_accounts\nWHERE user_id = 42;'
            },
            commonMisconception: {
              en: 'Many developers believe an SQL UPDATE executes an in-place mutation of bytes on disk. In MVCC engines like PostgreSQL, an UPDATE physically executes an INSERT of the new row version and an atomic update of the xmax field on the old row version.',
              vi: 'Nhiều lập trình viên tin rằng câu lệnh SQL UPDATE thực hiện ghi đè trực tiếp các byte trên đĩa. Trong các engine MVCC như PostgreSQL, câu lệnh UPDATE về mặt vật lý sẽ thực thi một lệnh INSERT phiên bản dòng mới và cập nhật nguyên tử trường xmax của phiên bản dòng cũ.'
            },
            quickReference: {
              en: [
                'xmin: Transaction ID that created the tuple version.',
                'xmax: Transaction ID that deleted or updated the tuple version (0 if current).',
                'Snapshot: Set of active transaction IDs when a query or transaction begins, determining which tuples are visible.',
                'VACUUM: Reclaims dead tuple storage space once all active transaction snapshots have passed the tuple xmax.'
              ],
              vi: [
                'xmin: Mã ID giao dịch đã tạo ra phiên bản tuple này.',
                'xmax: Mã ID giao dịch đã xóa hoặc cập nhật phiên bản tuple (bằng 0 nếu đang hoạt động).',
                'Snapshot: Tập hợp các ID giao dịch đang hoạt động tại thời điểm bắt đầu, quyết định tuple nào có thể nhìn thấy.',
                'VACUUM: Thu hồi không gian lưu trữ của các tuple đã chết khi mọi snapshot giao dịch đang hoạt động đều đã vượt qua xmax của tuple.'
              ]
            }
          },
          diagram: {
            title: {
              en: 'MVCC Tuple Version Chain Lifecycle',
              vi: 'Vòng Đời Chuỗi Phiên Bản Tuple Trong MVCC'
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Initial Insert (Tuple v1)', vi: 'Chèn Ban Đầu (Tuple v1)' },
                description: {
                  en: 'Transaction 100 inserts row: xmin=100, xmax=0. Tuple v1 is visible to all transactions >= 100.',
                  vi: 'Giao dịch 100 chèn dòng: xmin=100, xmax=0. Tuple v1 hiển thị cho mọi giao dịch >= 100.'
                }
              },
              {
                stepNumber: 2,
                title: { en: 'Update Occurs (Tuple v2 Created)', vi: 'Cập Nhật Diễn Ra (Tạo Tuple v2)' },
                description: {
                  en: 'Transaction 105 updates row: Tuple v1 gets xmax=105; new Tuple v2 is written with xmin=105, xmax=0.',
                  vi: 'Giao dịch 105 cập nhật dòng: Tuple v1 được gán xmax=105; Tuple v2 mới được tạo với xmin=105, xmax=0.'
                }
              },
              {
                stepNumber: 3,
                title: { en: 'Concurrent Reader Visibility', vi: 'Khả Năng Nhìn Thấy Của Giao Dịch Đọc' },
                description: {
                  en: 'Transaction 102 with snapshot taken before 105 committed still reads Tuple v1. Transaction 106 reads Tuple v2.',
                  vi: 'Giao dịch 102 với snapshot chụp trước khi 105 commit vẫn đọc Tuple v1. Giao dịch 106 đọc Tuple v2.'
                }
              },
              {
                stepNumber: 4,
                title: { en: 'Dead Tuple Reclamation (VACUUM)', vi: 'Thu Hồi Tuple Chết (VACUUM)' },
                description: {
                  en: 'Once Transaction 102 finishes, Tuple v1 is dead to all snapshots. VACUUM reclaims its storage space.',
                  vi: 'Khi Giao dịch 102 kết thúc, Tuple v1 trở thành tuple chết với mọi snapshot. VACUUM thu hồi dung lượng này.'
                }
              }
            ]
          }
        },
        {
          id: 'sql-def-2-2',
          title: {
            en: 'Write-Ahead Logging (WAL) & Crash Recovery Durability',
            vi: 'Nhật Ký Ghi Trước (WAL) & Khả Năng Bền Vững Khi Phục Hồi Sự Cố'
          },
          definitionDetails: {
            term: {
              en: 'Write-Ahead Logging (WAL)',
              vi: 'Nhật Ký Ghi Trước (Write-Ahead Logging - WAL)'
            },
            formalDefinition: {
              en: 'Write-Ahead Logging (WAL) is a core database reliability protocol requiring that changes to data pages in volatile memory must be sequentially written and flushed to durable non-volatile log files on disk before the corresponding dirty data pages are permitted to overwrite table files on disk.',
              vi: 'Write-Ahead Logging (WAL) là giao thức đảm bảo độ tin cậy cốt lõi của cơ sở dữ liệu, yêu cầu mọi thay đổi trên các trang dữ liệu trong bộ nhớ khả biến phải được ghi tuần tự và đồng bộ xuống các tập tin nhật ký bền vững trên đĩa trước khi các trang dữ liệu bị thay đổi được phép ghi đè lên các tập tin bảng trên đĩa.'
            },
            mentalModel: {
              en: 'Think of WAL like an airline flight data recorder. The pilot does not wait to rewrite the official printed flight manual in real time while navigating a storm; they record continuous telemetry into an append-only black box. If an engine fails, investigators reconstruct the exact state by replaying the black box.',
              vi: 'Hãy hình dung WAL như hộp đen ghi dữ liệu chuyến bay. Phi công không ngồi sửa lại cuốn sách hướng dẫn bay in sẵn khi đang điều khiển máy bay qua bão; họ liên tục ghi nhận dữ liệu hành trình vào một hộp đen tuần tự. Nếu động cơ gặp sự cố, đội điều tra sẽ tái dựng lại chính xác trạng thái bằng cách phát lại dữ liệu từ hộp đen.'
            },
            whyItMatters: {
              en: 'WAL guarantees the "D" (Durability) in ACID without requiring expensive random I/O writes on every transaction commit. It enables Point-In-Time Recovery (PITR) and real-time streaming replication across database clusters.',
              vi: 'WAL đảm bảo tính bền vững "D" (Durability) trong mô hình ACID mà không đòi hỏi các thao tác ghi ngẫu nhiên (random I/O) tốn kém mỗi khi commit giao dịch. Nó cung cấp nền tảng cho việc Phục Hồi Dữ Liệu Theo Thời Điểm (PITR) và nhân bản luồng dữ liệu (streaming replication) thời gian thực.'
            },
            minimalExample: {
              language: 'sql',
              filename: 'wal_configuration.sql',
              explanation: {
                en: 'Checking PostgreSQL WAL generation rate and checkpoint configuration.',
                vi: 'Kiểm tra tốc độ sinh WAL và cấu hình checkpoint trong PostgreSQL.'
              },
              code: '-- Inspect current WAL position and checkpoint settings\nSELECT pg_current_wal_lsn();  -- Current Log Sequence Number\n\nSHOW wal_level;               -- replica, minimal, logical\nSHOW synchronous_commit;      -- on, off, local, remote_write\nSHOW checkpoint_timeout;       -- default 5min'
            },
            commonMisconception: {
              en: 'A common misconception is that a successful COMMIT statement immediately writes the modified table and index pages to disk. In reality, the database only fsyncs the small sequential WAL record. The actual table pages remain dirty in RAM buffer pool until a checkpoint occurs.',
              vi: 'Một hiểu lầm phổ biến là cho rằng lệnh COMMIT thành công sẽ ghi ngay các trang bảng và chỉ mục xuống đĩa. Trong thực tế, cơ sở dữ liệu chỉ thực hiện lệnh fsync trên bản ghi WAL tuần tự dung lượng nhỏ. Các trang dữ liệu thực tế vẫn nằm trong bộ đệm RAM (buffer pool) cho đến khi sự kiện checkpoint diễn ra.'
            },
            quickReference: {
              en: [
                'LSN (Log Sequence Number): Unique monotonic 64-bit integer identifying bytes in the WAL stream.',
                'Checkpoint: Process of flushing all dirty shared memory buffers to disk and updating control files.',
                'Redo Phase: During crash recovery, replaying committed transactions from the last checkpoint to the end of the log.',
                'Undo Phase: Rolling back transactions that were active and uncommitted at the moment of crash.'
              ],
              vi: [
                'LSN (Log Sequence Number): Số nguyên đơn điệu 64-bit định danh vị trí byte trong luồng WAL.',
                'Checkpoint: Quá trình xả toàn bộ các trang dữ liệu bị sửa đổi trong RAM xuống đĩa và cập nhật tệp điều khiển.',
                'Pha Redo: Trong quá trình phục hồi sau sự cố, chạy lại toàn bộ giao dịch đã commit từ checkpoint gần nhất đến cuối nhật ký.',
                'Pha Undo: Hoàn tác các giao dịch đang hoạt động nhưng chưa commit tại thời điểm xảy ra sự cố.'
              ]
            }
          }
        }
      ]
    }
  ]
};
