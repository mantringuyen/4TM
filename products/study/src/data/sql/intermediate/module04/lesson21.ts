import { Lesson } from '../../../../types';

export const lesson21: Lesson = {
  id: 'sql_lesson_21',
  moduleId: 'sql_mod_4',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 21,
  topicId: 'sql_transactions_acid',
  title: {
    en: 'Transactions & ACID Properties: COMMIT, ROLLBACK & SAVEPOINT',
    vi: 'Giao Dịch (Transaction) & Thuộc Tính ACID: COMMIT, ROLLBACK & SAVEPOINT'
  },
  summary: {
    en: 'Master relational transactions and the ACID guarantee: orchestrating all-or-nothing workflows with BEGIN TRANSACTION, finalizing state with COMMIT, reverting changes with ROLLBACK, and granular checkpoints with SAVEPOINT.',
    vi: 'Làm chủ giao dịch quan hệ và bảo chứng ACID: điều phối quy trình "tất cả hoặc không gì cả" với BEGIN TRANSACTION, chốt dữ liệu bằng COMMIT, hoàn tác bằng ROLLBACK và điểm khôi phục cục bộ bằng SAVEPOINT.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'In mission-critical systems like financial banking and e-commerce checkouts, business operations require executing multiple SQL statements as a single, indivisible logical unit of work. Relational transactions guarantee that either every single operation succeeds completely, or the database is rolled back cleanly to its exact prior state.',
      vi: 'Trong các hệ thống quan trọng như ngân hàng tài chính và thanh toán thương mại điện tử, các nghiệp vụ đòi hỏi phải thực thi nhiều câu lệnh SQL như một đơn vị công việc logic duy nhất, không thể tách rời. Giao dịch quan hệ đảm bảo rằng toàn bộ các thao tác hoặc là thành công trọn vẹn, hoặc là CSDL được hoàn tác sạch sẽ về trạng thái ban đầu.'
    },
    conceptExplanation: {
      en: 'The ACID Guarantee & Transaction Mechanics:\n1. ACID Pillars:\n   - Atomicity: "All or nothing." If any step fails, the entire transaction is aborted and rolled back.\n   - Consistency: Database transitions strictly from one valid state to another, enforcing all schema constraints.\n   - Isolation: Concurrent transactions execute without interfering with one another.\n   - Durability: Once committed, updates persist permanently even through sudden power outages or system crashes (enforced via Write-Ahead Logging / WAL).\n2. Transaction Control Commands:\n   - BEGIN TRANSACTION (or START TRANSACTION): Marks the start of an atomic block.\n   - COMMIT: Persists all pending DML mutations permanently to disk.\n   - ROLLBACK: Aborts the active transaction and undoes all uncommitted changes.\n   - SAVEPOINT name / ROLLBACK TO SAVEPOINT name: Creates intermediate rollback checkpoints without canceling the entire transaction.',
      vi: 'Bảo chứng ACID & Cơ chế giao dịch:\n1. 4 Trụ cột ACID:\n   - Atomicity (Tính nguyên tử): "Tất cả hoặc không có gì". Nếu bất kỳ bước nào thất bại, toàn bộ giao dịch sẽ bị hủy và hoàn tác.\n   - Consistency (Tính nhất quán): CSDL chuyển đổi từ một trạng thái hợp lệ sang một trạng thái hợp lệ khác, bảo đảm mọi ràng buộc.\n   - Isolation (Tính độc lập): Các giao dịch chạy đồng thời không can thiệp hay làm sai lệch dữ liệu của nhau.\n   - Durability (Tính bền vững): Khi đã COMMIT, dữ liệu được lưu vĩnh viễn ngay cả khi mất điện đột ngột hay sập máy chủ (nhờ Write-Ahead Logging / WAL).\n2. Các lệnh điều khiển giao dịch:\n   - BEGIN TRANSACTION (hoặc START TRANSACTION): Đánh dấu bắt đầu khối lệnh nguyên tử.\n   - COMMIT: Ghi nhận vĩnh viễn mọi thay đổi DML đang chờ xuống đĩa.\n   - ROLLBACK: Hủy bỏ giao dịch đang chạy và hoàn tác mọi thay đổi chưa commit.\n   - SAVEPOINT tên / ROLLBACK TO SAVEPOINT tên: Tạo các điểm kiểm soát trung gian để hoàn tác cục bộ mà không hủy toàn bộ giao dịch.'
    },
    syntax: `BEGIN TRANSACTION;

-- Step 1: Debit sender
UPDATE accounts
SET balance = balance - 250.00
WHERE account_id = 1001 AND balance >= 250.00;

-- Step 2: Set savepoint before optional logging
SAVEPOINT post_debit;

-- Step 3: Credit recipient
UPDATE accounts
SET balance = balance + 250.00
WHERE account_id = 2002;

-- Finalize all mutations permanently
COMMIT;`,
    examples: [
      {
        title: {
          en: '1. Resilient Bank Transfer with Partial Savepoint Recovery',
          vi: '1. Chuyển Khoản Ngân Hàng Linh Hoạt Với Điểm Khôi Phục Savepoint'
        },
        code: `BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

SAVEPOINT transfer_complete;

-- Attempt bonus reward (optional)
INSERT INTO audit_bonus (user_id, bonus) VALUES (2, 50);

-- If bonus fails, revert only the bonus step:
-- ROLLBACK TO SAVEPOINT transfer_complete;

COMMIT;`,
        language: 'sql',
        explanation: {
          en: 'Ensures account balances are balanced atomically while allowing non-essential sub-tasks to be rolled back independently.',
          vi: 'Đảm bảo số dư tài khoản được cân đối nguyên tử trong khi cho phép các tác vụ phụ có thể hoàn tác độc lập.'
        }
      },
      {
        title: {
          en: '2. Transaction Abort on Business Logic Invariant Failure',
          vi: '2. Hủy Giao Dịch Khi Vi Phạm Quy Tắc Nghiệp Vụ'
        },
        code: `BEGIN TRANSACTION;

DELETE FROM cart_items WHERE session_id = 'sess_abc';
-- Simulating payment gateway rejection:
ROLLBACK;`,
        language: 'sql',
        explanation: {
          en: 'Rollback restores the deleted cart items instantly as if the deletion never occurred.',
          vi: 'Lệnh ROLLBACK khôi phục các mặt hàng trong giỏ ngay lập tức như thể việc xóa chưa từng diễn ra.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Leaving transactions open indefinitely in application code without a COMMIT or ROLLBACK.',
          vi: 'Để mở giao dịch vô thời hạn trong mã nguồn ứng dụng mà không COMMIT hoặc ROLLBACK.'
        },
        correction: {
          en: 'Long-running open transactions hold exclusive locks on table rows and bloat WAL logs, blocking other users and causing connection pool exhaustion. Always commit or rollback promptly in a try/finally block.',
          vi: 'Giao dịch mở lâu giữ khóa độc quyền trên các dòng và làm phình log WAL, chặn người dùng khác và làm cạn kiệt connection pool. Hãy luôn commit hoặc rollback kịp thời trong khối try/finally.'
        }
      },
      {
        mistake: {
          en: 'Assuming DDL statements like CREATE TABLE or ALTER TABLE can always be rolled back.',
          vi: 'Nghĩ rằng các lệnh DDL như CREATE TABLE hoặc ALTER TABLE luôn có thể rollback được trên mọi CSDL.'
        },
        correction: {
          en: 'While PostgreSQL and SQLite support transactional DDL, MySQL and Oracle automatically and implicitly trigger an unpreventable COMMIT before and after every DDL command.',
          vi: 'Trong khi PostgreSQL và SQLite hỗ trợ DDL trong giao dịch, MySQL và Oracle tự động commit ngầm không thể ngăn cản trước và sau mỗi lệnh DDL.'
        }
      }
    ],
    tips: [
      {
        en: 'Write-Ahead Logging (WAL) ensures durability by recording changes to an append-only log on disk before dirtying cache pages.',
        vi: 'Write-Ahead Logging (WAL) đảm bảo tính bền vững bằng cách ghi nhận thay đổi vào nhật ký tuần tự trên đĩa trước khi sửa trang nhớ.'
      },
      {
        en: 'In SQLite, write transactions acquire exclusive database locks; keep transactions minimal to maintain high concurrent read throughput.',
        vi: 'Trong SQLite, giao dịch ghi chiếm khóa độc quyền CSDL; hãy giữ giao dịch ngắn nhất có thể để duy trì hiệu năng đọc cao.'
      }
    ],
    practiceStarterCode: `-- Practice safe transaction
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
ROLLBACK;`
  },
  exercisePool: [
    {
      id: 'sql_ex_tx_1',
      type: 'complete_code',
      title: {
        en: 'Begin and Commit Atomic Transaction',
        vi: 'Bắt Đầu và Chốt Giao Dịch Nguyên Tử'
      },
      instruction: {
        en: 'Wrap the balance update in a transaction starting with BEGIN TRANSACTION and finishing with COMMIT.',
        vi: 'Bọc thao tác cập nhật số dư trong một giao dịch bắt đầu bằng BEGIN TRANSACTION và kết thúc bằng COMMIT.'
      },
      starterCode: `___ TRANSACTION;
UPDATE accounts SET balance = balance + 50 WHERE id = 10;
___;`,
      solutionCode: `BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 50 WHERE id = 10;
COMMIT;`,
      hint: {
        en: 'Use BEGIN and COMMIT.',
        vi: 'Dùng BEGIN và COMMIT.'
      },
      explanation: {
        en: 'BEGIN TRANSACTION opens the atomic boundary and COMMIT makes the mutation permanent.',
        vi: 'BEGIN TRANSACTION mở ra ranh giới nguyên tử và COMMIT ghi nhận vĩnh viễn thay đổi.'
      }
    },
    {
      id: 'sql_ex_tx_2',
      type: 'complete_code',
      title: {
        en: 'Abort Transaction with Rollback',
        vi: 'Hủy Giao Dịch Bằng Rollback'
      },
      instruction: {
        en: 'Roll back the pending transaction to discard the deletion.',
        vi: 'Hoàn tác giao dịch đang chờ để hủy bỏ thao tác xóa.'
      },
      starterCode: `BEGIN TRANSACTION;
DELETE FROM logs WHERE id = 999;
___;`,
      solutionCode: `BEGIN TRANSACTION;
DELETE FROM logs WHERE id = 999;
ROLLBACK;`,
      hint: {
        en: 'Use ROLLBACK.',
        vi: 'Dùng ROLLBACK.'
      },
      explanation: {
        en: 'ROLLBACK discards all uncommitted modifications made during the active transaction.',
        vi: 'ROLLBACK hủy bỏ toàn bộ các sửa đổi chưa commit trong giao dịch hiện tại.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_transactions_acid',
    title: {
      en: 'Multi-Leg Inventory Deduction & Order Creation Transaction Workflow',
      vi: 'Quy Trình Giao Dịch Khấu Trừ Tồn Kho Đa Điểm & Tạo Đơn Hàng'
    },
    description: {
      en: 'Write a complete transaction script that models a reliable e-commerce purchase: 1. Start the transaction with BEGIN TRANSACTION. 2. Deduct 2 units of stock from inventory WHERE product_id = 101 AND stock_count >= 2. 3. Set a SAVEPOINT named stock_reserved. 4. Insert an order record into orders (id, customer_id, product_id, quantity, status) VALUES (5001, 88, 101, 2, \'Processing\'). 5. Commit the transaction permanently with COMMIT.',
      vi: 'Viết một script giao dịch hoàn chỉnh mô phỏng thanh toán đơn hàng thương mại điện tử: 1. Bắt đầu giao dịch với BEGIN TRANSACTION. 2. Trừ 2 sản phẩm tồn kho từ bảng inventory WHERE product_id = 101 AND stock_count >= 2. 3. Tạo một SAVEPOINT có tên stock_reserved. 4. Chèn một đơn hàng vào orders (id, customer_id, product_id, quantity, status) VALUES (5001, 88, 101, 2, \'Processing\'). 5. Chốt vĩnh viễn giao dịch bằng COMMIT.'
    },
    requirements: [
      { en: '1. BEGIN TRANSACTION;', vi: '1. BEGIN TRANSACTION;' },
      { en: '2. UPDATE inventory SET stock_count = stock_count - 2 WHERE product_id = 101 AND stock_count >= 2;', vi: '2. UPDATE inventory SET stock_count = stock_count - 2 WHERE product_id = 101 AND stock_count >= 2;' },
      { en: '3. SAVEPOINT stock_reserved;', vi: '3. SAVEPOINT stock_reserved;' },
      { en: '4. INSERT INTO orders (id, customer_id, product_id, quantity, status) VALUES (5001, 88, 101, 2, \'Processing\');', vi: '4. INSERT INTO orders (id, customer_id, product_id, quantity, status) VALUES (5001, 88, 101, 2, \'Processing\');' },
      { en: '5. COMMIT;', vi: '5. COMMIT;' }
    ],
    starterCode: `-- Write your e-commerce transaction script
BEGIN TRANSACTION;
UPDATE inventory SET stock_count = stock_count - 2 WHERE product_id = 101;
COMMIT;`,
    solutionCode: `BEGIN TRANSACTION;

UPDATE inventory
SET stock_count = stock_count - 2
WHERE product_id = 101 AND stock_count >= 2;

SAVEPOINT stock_reserved;

INSERT INTO orders (id, customer_id, product_id, quantity, status)
VALUES (5001, 88, 101, 2, 'Processing');

COMMIT;`,
    hints: [
      {
        en: 'Follow the 5 distinct operations sequentially, ending with COMMIT.',
        vi: 'Thực hiện tuần tự 5 thao tác riêng biệt, kết thúc bằng lệnh COMMIT.'
      }
    ],
    solutionExplanation: {
      en: 'Coordinates stock reservation, checkpoint isolation, and order creation in a single atomic transaction.',
      vi: 'Điều phối giữ chỗ tồn kho, điểm kiểm soát an toàn và tạo đơn hàng trong một giao dịch nguyên tử duy nhất.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_tx_1',
      type: 'single_choice',
      question: {
        en: 'What does the acronym ACID stand for in database systems?',
        vi: 'Từ viết tắt ACID đại diện cho 4 đặc tính nào trong hệ thống CSDL?'
      },
      options: [
        { en: 'Atomicity, Consistency, Isolation, Durability', vi: 'Atomicity (Tính nguyên tử), Consistency (Tính nhất quán), Isolation (Tính độc lập), Durability (Tính bền vững)' },
        { en: 'Action, Calculation, Index, Deletion', vi: 'Action, Calculation, Index, Deletion' },
        { en: 'Access, Control, Interface, Data', vi: 'Access, Control, Interface, Data' },
        { en: 'Array, Cursor, Iteration, Division', vi: 'Array, Cursor, Iteration, Division' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ACID defines the four fundamental reliability pillars of relational database transactions.',
        vi: 'ACID định nghĩa 4 trụ cột tin cậy nền tảng của các giao dịch CSDL quan hệ.'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_tx_2',
      type: 'single_choice',
      question: {
        en: 'What does "Atomicity" guarantee in a database transaction?',
        vi: '"Tính nguyên tử" (Atomicity) đảm bảo điều gì trong một giao dịch CSDL?'
      },
      options: [
        { en: 'All operations inside the transaction complete successfully as a single unit, or if any error occurs, all changes are completely rolled back ("All or Nothing")', vi: 'Tất cả các thao tác bên trong giao dịch hoàn thành trọn vẹn như một khối duy nhất, hoặc nếu có bất kỳ lỗi nào, mọi thay đổi sẽ được hoàn tác sạch sẽ ("Tất cả hoặc không gì cả")' },
        { en: 'Data is split into tiny atomic sub-particles', vi: 'Dữ liệu được chia nhỏ thành các hạt nguyên tử' },
        { en: 'Only one user can connect to the database', vi: 'Chỉ có 1 người dùng được kết nối vào CSDL' },
        { en: 'Transactions run 10x faster', vi: 'Giao dịch chạy nhanh hơn 10 lần' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Atomicity ensures that partial, incomplete transaction states are never left behind.',
        vi: 'Tính nguyên tử đảm bảo không bao giờ để lại trạng thái dữ liệu dở dang, chắp vá.'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_tx_3',
      type: 'single_choice',
      question: {
        en: 'What does the COMMIT command do?',
        vi: 'Lệnh COMMIT thực hiện hành động gì?'
      },
      options: [
        { en: 'Permanently saves all pending modifications made during the transaction to the database', vi: 'Ghi nhận và lưu vĩnh viễn tất cả các sửa đổi trong giao dịch vào CSDL' },
        { en: 'Cancels the changes and discards them', vi: 'Hủy bỏ và vứt bỏ các thay đổi' },
        { en: 'Creates a temporary backup in memory', vi: 'Tạo một bản sao lưu tạm thời trong bộ nhớ' },
        { en: 'Locks the database forever', vi: 'Khóa CSDL vĩnh viễn' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'COMMIT finalizes all DML operations, making them visible to all other transactions.',
        vi: 'COMMIT chốt các thao tác DML và cho phép các giao dịch khác nhìn thấy dữ liệu mới.'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_tx_4',
      type: 'single_choice',
      question: {
        en: 'What does the ROLLBACK command do?',
        vi: 'Lệnh ROLLBACK thực hiện hành động gì?'
      },
      options: [
        { en: 'Aborts the transaction and reverts all uncommitted changes back to the state before the transaction began', vi: 'Hủy bỏ giao dịch và hoàn tác toàn bộ các thay đổi chưa commit về trạng thái trước khi giao dịch bắt đầu' },
        { en: 'Saves half the data to disk', vi: 'Lưu một nửa dữ liệu ra đĩa' },
        { en: 'Restarts the operating system', vi: 'Khởi động lại hệ điều hành' },
        { en: 'Deletes all tables in the schema', vi: 'Xóa toàn bộ các bảng trong lược đồ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ROLLBACK unwinds all mutations made within the open transaction boundary.',
        vi: 'ROLLBACK tháo gỡ toàn bộ các thay đổi phát sinh bên trong phạm vi giao dịch đang mở.'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_tx_5',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of a SAVEPOINT within a transaction?',
        vi: 'Mục đích của SAVEPOINT bên trong một giao dịch là gì?'
      },
      options: [
        { en: 'To create an intermediate checkpoint within a transaction, allowing partial rollbacks (ROLLBACK TO SAVEPOINT) without aborting the entire transaction', vi: 'Để tạo một điểm kiểm soát trung gian, cho phép hoàn tác một phần (ROLLBACK TO SAVEPOINT) mà không làm hủy toàn bộ giao dịch' },
        { en: 'To save the query to a text file', vi: 'Để lưu câu truy vấn vào file văn bản' },
        { en: 'To stop CPU usage', vi: 'Để tạm dừng sử dụng CPU' },
        { en: 'To send an email notification', vi: 'Để gửi email thông báo' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Savepoints allow nested, granular error recovery workflows inside a broader transaction.',
        vi: 'Savepoint cho phép phục hồi lỗi cục bộ linh hoạt bên trong một giao dịch lớn.'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_tx_6',
      type: 'single_choice',
      question: {
        en: 'How does the "Durability" property survive sudden power loss or operating system crashes?',
        vi: 'Đặc tính "Tính bền vững" (Durability) chống chịu việc mất điện đột ngột hoặc sập hệ điều hành như thế nào?'
      },
      options: [
        { en: 'By writing committed changes synchronously to a non-volatile Write-Ahead Log (WAL) on disk before acknowledging success', vi: 'Bằng cách ghi đồng bộ các thay đổi đã commit vào nhật ký Write-Ahead Log (WAL) trên đĩa trước khi trả về kết quả thành công' },
        { en: 'By keeping all data only in volatile RAM', vi: 'Bằng cách lưu toàn bộ dữ liệu trong RAM' },
        { en: 'By uploading to social media', vi: 'Bằng cách tải lên mạng xã hội' },
        { en: 'By duplicating tables 100 times', vi: 'Bằng cách nhân bản bảng 100 lần' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'WAL records are flushed to persistent disk storage, enabling full crash recovery upon restart.',
        vi: 'Nhật ký WAL được ghi xả xuống ổ đĩa bền vững, cho phép CSDL tự phục hồi khi khởi động lại.'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_tx_7',
      type: 'true_false',
      question: {
        en: 'In MySQL and Oracle, executing a DDL command (like ALTER TABLE or DROP TABLE) triggers an automatic implicit COMMIT.',
        vi: 'Trong MySQL và Oracle, việc thực thi một lệnh DDL (như ALTER TABLE hoặc DROP TABLE) sẽ kích hoạt một lệnh COMMIT tự động ngầm định.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. In MySQL/Oracle, DDL commands implicitly commit open transactions, unlike PostgreSQL/SQLite which support transactional DDL.',
        vi: 'Đúng. Trong MySQL/Oracle, lệnh DDL tự động commit ngầm các giao dịch đang mở, khác với PostgreSQL/SQLite hỗ trợ DDL trong giao dịch.'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_tx_8',
      type: 'single_choice',
      question: {
        en: 'Why are long-running transactions considered dangerous in production databases?',
        vi: 'Tại sao các giao dịch chạy dài (long-running transactions) bị xem là nguy hiểm trong các CSDL production?'
      },
      options: [
        { en: 'They hold locks on rows/tables, blocking concurrent transactions, causing deadlocks, and preventing WAL/undo log truncation', vi: 'Chúng giữ khóa trên các dòng/bảng, chặn các giao dịch đồng thời khác, gây tắc nghẽn (deadlock) và làm phình nhật ký WAL/undo log' },
        { en: 'They consume all network bandwidth', vi: 'Chúng ngốn toàn bộ băng thông mạng' },
        { en: 'They change the database collation', vi: 'Chúng làm thay đổi bảng mã ký tự của CSDL' },
        { en: 'They delete stored procedures', vi: 'Chúng xóa các thủ tục lưu trữ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Open transactions hold locking resources and prevent garbage collection of old row versions (MVCC bloat).',
        vi: 'Giao dịch mở chiếm dụng tài nguyên khóa và ngăn cản dọn dẹp các phiên bản dữ liệu cũ (MVCC bloat).'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_tx_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following commands are used for transaction control in SQL? (Select all that apply)',
        vi: 'Những câu lệnh nào sau đây được dùng để điều khiển giao dịch trong SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'BEGIN TRANSACTION (or START TRANSACTION)', vi: 'BEGIN TRANSACTION (hoặc START TRANSACTION)' },
        { en: 'COMMIT', vi: 'COMMIT' },
        { en: 'ROLLBACK', vi: 'ROLLBACK' },
        { en: 'SAVEPOINT', vi: 'SAVEPOINT' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'BEGIN, COMMIT, ROLLBACK, and SAVEPOINT constitute the TCL (Transaction Control Language) commands.',
        vi: 'BEGIN, COMMIT, ROLLBACK và SAVEPOINT hợp thành nhóm lệnh điều khiển giao dịch (TCL).'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_tx_10',
      type: 'single_choice',
      question: {
        en: 'What happens to intermediate SAVEPOINTs when a transaction is finalized with a COMMIT?',
        vi: 'Điều gì xảy ra với các điểm SAVEPOINT trung gian khi một giao dịch được kết thúc bằng lệnh COMMIT?'
      },
      options: [
        { en: 'All changes up to the final COMMIT are made permanent, and all savepoints are automatically dissolved and released', vi: 'Tất cả các thay đổi cho đến lệnh COMMIT cuối cùng đều được ghi nhận vĩnh viễn, và mọi savepoint sẽ tự động được giải phóng' },
        { en: 'The database rolls back to the first savepoint', vi: 'CSDL tự động rollback về savepoint đầu tiên' },
        { en: 'The savepoints are saved as separate tables', vi: 'Các savepoint được lưu thành các bảng riêng biệt' },
        { en: 'The server reboots', vi: 'Máy chủ khởi động lại' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'COMMIT finalizes the entire transaction, rendering internal savepoints no longer needed.',
        vi: 'Lệnh COMMIT chốt toàn bộ giao dịch và tự động giải phóng các điểm savepoint nội bộ.'
      },
      topicId: 'sql_transactions_acid',
      difficulty: 'medium'
    }
  ]
};

export default lesson21;
