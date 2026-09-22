import { Book } from '../../types';

export const SQL_PRACTICAL_GUIDES_BOOK: Book = {
  id: 'sql-practical-guides',
  slug: 'sql-practical-guides',
  title: 'Relational Database Design & Engineering Guide',
  subtitle: {
    en: 'Step-by-Step Practical Blueprint for Production Normalization & Zero-Downtime Migrations',
    vi: 'Hướng Dẫn Kỹ Thuật Từng Bước Về Chuẩn Hóa Schema & Migration Không Gián Đoạn',
  },
  bookType: 'Practical Guides',
  categoryId: 'sql',
  subjectId: 'storage',
  author: '4TM Technical Board',
  role: 'Core Database Engineering Group',
  level: 'Practical / Applied',
  estimatedReadTime: '35 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-18',
  accentColor: 'from-cyan-600 to-blue-800',
  tags: ['SQL', 'Database Design', 'Normalization', 'Migrations', 'Zero-Downtime', 'Production'],
  description: {
    en: 'Production-tested practical engineering guides for transforming unnormalized schemas to 3NF and executing zero-downtime database migrations with Expand-and-Contract.',
    vi: 'Cẩm nang hướng dẫn kỹ thuật thực chiến giúp chuyển đổi schema phi chuẩn sang 3NF và triển khai migration cơ sở dữ liệu zero-downtime với mô hình Expand-and-Contract.',
  },
  prerequisites: {
    en: [
      'Understanding of relational tables, primary keys, and foreign keys',
      'Familiarity with DDL operations (CREATE TABLE, ALTER TABLE, CREATE INDEX)',
    ],
    vi: [
      'Hiểu biết về bảng quan hệ, khóa chính và khóa ngoại',
      'Quen thuộc với các lệnh DDL (CREATE TABLE, ALTER TABLE, CREATE INDEX)',
    ],
  },
  outcomes: {
    en: [
      'Decompose denormalized schemas through 1NF, 2NF, and 3NF systematically',
      'Execute multi-stage zero-downtime column migrations without table lockouts',
      'Validate foreign key constraints and verify database integrity under live traffic',
    ],
    vi: [
      'Phân tách schema phi chuẩn qua 1NF, 2NF và 3NF một cách bài bản',
      'Triển khai migration cột zero-downtime đa giai đoạn không làm khóa bảng',
      'Kiểm chứng ràng buộc khóa ngoại và bảo toàn dữ liệu dưới tải thực tế',
    ],
  },
  chapters: [
    // Chapter 1: Schema Normalization (1NF to 3NF)
    {
      id: 'spg-ch-1',
      number: 1,
      slug: 'schema-normalization-1nf-to-3nf',
      title: {
        en: 'Step-by-Step Schema Normalization (1NF to 3NF)',
        vi: 'Quy Trình Chuẩn Hóa Schema Từng Bước (1NF Đến 3NF)',
      },
      summary: {
        en: 'A practical, executable procedure for eliminating data redundancy and update anomalies through First, Second, and Third Normal Forms.',
        vi: 'Quy trình thực hành chi tiết giúp triệt tiêu dư thừa dữ liệu và dị thường cập nhật qua dạng chuẩn 1, 2 và 3.',
      },
      readTimeMinutes: 16,
      sections: [
        {
          id: 'spg-1-1',
          title: {
            en: 'Transforming Denormalized Datasets to 3NF',
            vi: 'Chuyển Đổi Dữ Liệu Phi Chuẩn Sang Chuẩn 3NF',
          },
          keyIdea: {
            en: 'Systematic normalization eliminates update, insert, and delete anomalies by ensuring every non-key attribute depends solely and directly on the primary key.',
            vi: 'Chuẩn hóa bài bản triệt tiêu các dị thường cập nhật, chèn và xóa dữ liệu bằng cách bảo đảm mọi thuộc tính ngoài khóa phụ thuộc trực tiếp và duy nhất vào khóa chính.',
          },
          content: {
            en: 'In transactional systems (OLTP), denormalized structures cause data redundancy and severe integrity anomalies. Normalization decomposes relations into standardized forms: First Normal Form (1NF) mandates atomic attributes with no repeating arrays or comma-delimited strings; Second Normal Form (2NF) eliminates partial functional dependencies on composite candidate keys; and Third Normal Form (3NF) eliminates transitive functional dependencies where a non-key column determines another non-key column.',
            vi: 'Trong các hệ thống giao dịch (OLTP), cấu trúc phi chuẩn hóa gây dư thừa dữ liệu và các dị thường toàn vẹn nghiêm trọng. Chuẩn hóa phân rã các quan hệ thành các dạng chuẩn: Chuẩn 1 (1NF) bắt buộc thuộc tính nguyên tử không chứa mảng hay chuỗi ngăn cách dấu phẩy; Chuẩn 2 (2NF) triệt tiêu phụ thuộc hàm một phần vào khóa chính phức hợp; và Chuẩn 3 (3NF) triệt tiêu phụ thuộc hàm bắc cầu khi một cột ngoài khóa lại xác định cột ngoài khóa khác.',
          },
          guideDetails: {
            goal: {
              en: 'Decompose a unnormalized e-commerce spreadsheet or flat table into clean, constraint-backed 3NF relational tables.',
              vi: 'Phân tách bảng dữ liệu phẳng hoặc file excel thương mại điện tử thành các bảng quan hệ chuẩn 3NF có ràng buộc chặt chẽ.',
            },
            prerequisites: {
              en: [
                'Administrative or schema-write privileges in a relational database (PostgreSQL/MySQL)',
                'A flat table containing denormalized customer, order, and product attributes',
              ],
              vi: [
                'Quyền quản trị hoặc chỉnh sửa schema trên CSDL quan hệ (PostgreSQL/MySQL)',
                'Bảng dữ liệu phẳng chứa thuộc tính khách hàng, đơn hàng và sản phẩm bị trộn lẫn',
              ],
            },
            preparation: {
              en: 'Identify functional dependencies across columns: determine natural primary keys, composite candidates, and transitive relationships.',
              vi: 'Xác định các phụ thuộc hàm giữa các cột: tìm khóa chính tự nhiên, khóa phức hợp ứng viên và các mối quan hệ bắc cầu.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Enforce 1NF: Atomic Column Values & Unique Row Keys',
                  vi: 'Áp Dụng 1NF: Đảm Bảo Giá Trị Nguyên Tử & Khóa Duy Nhất',
                },
                instruction: {
                  en: 'Split multi-valued columns (such as comma-separated product lists) into discrete individual rows and establish a candidate key.',
                  vi: 'Tách các cột đa trị (như chuỗi sản phẩm cách nhau bằng dấu phẩy) thành các dòng độc lập và thiết lập khóa ứng viên.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'step1_1nf.sql',
                  code: `-- BEFORE (Unnormalized with non-atomic items):
-- order_id | customer_email | items
-- 101      | a@test.com     | "SKU-1:2, SKU-2:1"

-- STEP 1: Unnest items into individual rows with primary key (order_id, item_sku)
CREATE TABLE unnested_order_lines (
    order_id INT NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    item_sku VARCHAR(64) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price_cents INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_unnested_order_lines PRIMARY KEY (order_id, item_sku)
);`,
                },
                expectedOutput: {
                  en: 'Table created with atomic attributes and a valid composite primary key.',
                  vi: 'Bảng được tạo với các thuộc tính nguyên tử và khóa chính phức hợp hợp lệ.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Enforce 2NF: Eliminate Partial Functional Dependencies',
                  vi: 'Áp Dụng 2NF: Loại Bỏ Phụ Thuộc Hàm Một Phần',
                },
                instruction: {
                  en: 'Extract attributes that depend on only part of the composite primary key (e.g. product_name depends solely on item_sku, not order_id) into an autonomous catalog table.',
                  vi: 'Tách các thuộc tính chỉ phụ thuộc vào một phần của khóa phức (ví dụ product_name chỉ phụ thuộc item_sku chứ không phụ thuộc order_id) ra bảng danh mục riêng.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'step2_2nf.sql',
                  code: `-- Extract Products table (item_sku determines product_name)
CREATE TABLE products (
    sku VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    base_price_cents INT NOT NULL
);

-- Refactor order lines to reference products via foreign key
CREATE TABLE order_items (
    order_id INT NOT NULL,
    product_sku VARCHAR(64) NOT NULL REFERENCES products(sku),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price_cents INT NOT NULL,
    CONSTRAINT pk_order_items PRIMARY KEY (order_id, product_sku)
);`,
                },
                expectedOutput: {
                  en: 'Products decoupled from order lines; no partial key dependencies remain.',
                  vi: 'Sản phẩm được tách khỏi dòng đơn hàng; không còn phụ thuộc một phần vào khóa.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Enforce 3NF: Eliminate Transitive Dependencies',
                  vi: 'Áp Dụng 3NF: Loại Bỏ Phụ Thuộc Hàm Bắc Cầu',
                },
                instruction: {
                  en: 'Identify non-key attributes that determine other non-key attributes (e.g. customer_email determines customer_name and shipping_address) and extract them into independent entities.',
                  vi: 'Xác định các cột ngoài khóa xác định cột ngoài khóa khác (ví dụ customer_email xác định tên và địa chỉ giao hàng) và tách thành thực thể độc lập.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'step3_3nf.sql',
                  code: `-- Extract Customers relation
CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Extract Orders relation with foreign key pointer to customer
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    placed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) NOT NULL DEFAULT 'pending'
);

-- Link order_items to orders
ALTER TABLE order_items 
ADD CONSTRAINT fk_order_items_order 
FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;`,
                },
                expectedOutput: {
                  en: 'Complete 3NF schema structure with customers, orders, products, and order_items.',
                  vi: 'Cấu trúc schema 3NF hoàn chỉnh với bảng customers, orders, products và order_items.',
                },
              },
              {
                stepNumber: 4,
                title: {
                  en: 'Migrate & Validate Data with Integrity Assertions',
                  vi: 'Chuyển Đổi & Kiểm Tra Dữ Liệu Bằng Các Khẳng Định Toàn Vẹn',
                },
                instruction: {
                  en: 'Populate normalized tables from raw data using INSERT INTO ... SELECT DISTINCT and verify total counts match.',
                  vi: 'Đổ dữ liệu vào các bảng chuẩn hóa bằng lệnh INSERT INTO ... SELECT DISTINCT và so khớp số lượng bản ghi.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'step4_verify_data.sql',
                  code: `-- Verify zero orphaned records and matching order amounts
SELECT 
    (SELECT COUNT(*) FROM orders) AS total_orders,
    (SELECT COUNT(*) FROM customers) AS total_customers,
    (SELECT COUNT(*) FROM products) AS total_products,
    (SELECT COUNT(*) FROM order_items) AS total_order_items;`,
                },
                expectedOutput: {
                  en: 'Exact counts returned with zero constraint violation errors.',
                  vi: 'Trả về số lượng chính xác và không có lỗi vi phạm ràng buộc.',
                },
              },
            ],
            verification: {
              en: 'Execute queries joining customers, orders, and order_items to confirm identical aggregate financial totals compared with the unnormalized source dataset.',
              vi: 'Chạy các câu lệnh nối giữa customers, orders và order_items để xác nhận tổng doanh thu khớp 100% với dữ liệu nguồn ban đầu.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Foreign key insertion fails with Key (customer_id)=(X) is not present in table "customers"',
                  vi: 'Lỗi chèn khóa ngoại: Key (customer_id)=(X) is not present in table "customers"',
                },
                cause: {
                  en: 'The child order lines were backfilled before all distinct customers were committed into the parent table.',
                  vi: 'Các dòng đơn hàng được chèn trước khi toàn bộ khách hàng được ghi vào bảng cha.',
                },
                fix: {
                  en: 'Always backfill parent entities first (customers, products) before inserting child relation records (orders, order_items).',
                  vi: 'Luôn nạp dữ liệu bảng cha trước (customers, products) rồi mới chèn vào các bảng con (orders, order_items).',
                },
              },
              {
                symptom: {
                  en: 'Duplicate key value violates unique constraint "uq_customers_email"',
                  vi: 'Lỗi trùng khóa: Duplicate key value violates unique constraint "uq_customers_email"',
                },
                cause: {
                  en: 'The unnormalized dataset contains email casing discrepancies (e.g. "User@test.com" vs "user@test.com").',
                  vi: 'Dữ liệu gốc có sự sai lệch chữ hoa/thường trong email (vd "User@test.com" và "user@test.com").',
                },
                fix: {
                  en: 'Sanitize strings using `LOWER(TRIM(email))` before executing the deduplicated INSERT INTO customers.',
                  vi: 'Làm sạch chuỗi bằng `LOWER(TRIM(email))` trước khi thực hiện câu lệnh chèn lọc trùng vào bảng customers.',
                },
              },
            ],
            checklist: {
              en: [
                'Every column holds scalar, atomic values without arrays or delimiter strings (1NF).',
                'All non-key attributes depend fully on the complete primary key (2NF).',
                'No non-key attribute determines another non-key attribute (3NF).',
                'All foreign keys are explicitly indexed to prevent full scans during cascade operations.',
              ],
              vi: [
                'Mọi cột đều chứa giá trị vô hướng nguyên tử, không có mảng hoặc chuỗi phân tách (1NF).',
                'Tất cả các thuộc tính ngoài khóa đều phụ thuộc toàn phần vào toàn bộ khóa chính (2NF).',
                'Không có thuộc tính ngoài khóa nào xác định một thuộc tính ngoài khóa khác (3NF).',
                'Mọi khóa ngoại đều được đánh chỉ mục rõ ràng để tránh quét toàn bảng khi cascade.',
              ],
            },
          },
          comparisonTable: {
            headers: [
              { en: 'Normal Form', vi: 'Dạng Chuẩn' },
              { en: 'Core Requirement', vi: 'Yêu Cầu Cốt Lõi' },
              { en: 'Anomaly Prevented', vi: 'Dị Thường Được Triệt Tiêu' },
              { en: 'Practical Design Rule', vi: 'Quy Tắc Thiết Kế Thực Tiễn' },
            ],
            rows: [
              {
                en: ['1NF (First Normal Form)', 'Atomic scalar values, unique row identifier', 'Repeated groups, variable array parsing bugs', 'Never store comma-separated lists in VARCHAR'],
                vi: ['1NF (Chuẩn 1)', 'Giá trị nguyên tử, định danh dòng duy nhất', 'Nhóm lặp lại, lỗi phân tích chuỗi mảng', 'Tuyệt đối không lưu danh sách ngăn cách dấu phẩy trong VARCHAR'],
              },
              {
                en: ['2NF (Second Normal Form)', 'In 1NF + No partial key dependencies', 'Redundant data across composite key subsets', 'Extract catalog data out of multi-key intersection tables'],
                vi: ['2NF (Chuẩn 2)', 'Đạt 1NF + Không phụ thuộc một phần vào khóa', 'Dư thừa dữ liệu trên tập con của khóa phức', 'Tách dữ liệu danh mục ra khỏi bảng trung gian nhiều khóa'],
              },
              {
                en: ['3NF (Third Normal Form)', 'In 2NF + No transitive dependencies', 'Update anomalies when determinant attributes change', 'Non-key columns must depend strictly on the Primary Key'],
                vi: ['3NF (Chuẩn 3)', 'Đạt 2NF + Không phụ thuộc bắc cầu', 'Dị thường cập nhật khi thuộc tính quyết định thay đổi', 'Các cột ngoài khóa chỉ được phép phụ thuộc vào Khóa Chính'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Relational Normalization Pipeline (1NF -> 2NF -> 3NF)',
              vi: 'Tiến Trình Chuẩn Hóa Quan Hệ (1NF -> 2NF -> 3NF)',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Unnest to 1NF', vi: 'Nguyên Tử Hóa 1NF' },
                description: {
                  en: 'Flatten repeated multi-values into discrete rows and assign a primary key.',
                  vi: 'Tách các giá trị lặp trong chuỗi thành từng dòng riêng và gán khóa chính.',
                },
              },
              {
                number: 2,
                label: { en: 'Isolate Partial Keys (2NF)', vi: 'Tách Khóa Một Phần 2NF' },
                description: {
                  en: 'Extract attributes dependent on a single part of composite keys into independent tables.',
                  vi: 'Tách các thuộc tính chỉ phụ thuộc một phần khóa phức ra bảng độc lập.',
                },
              },
              {
                number: 3,
                label: { en: 'Remove Transitive Keys (3NF)', vi: 'Triệt Tiêu Bắc Cầu 3NF' },
                description: {
                  en: 'Ensure non-key fields depend directly on the primary key, eliminating side-table anomalies.',
                  vi: 'Đảm bảo trường ngoài khóa chỉ phụ thuộc trực tiếp vào khóa chính.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Premature denormalization in OLTP databases before confirming performance bottlenecks',
                vi: 'Phi chuẩn hóa vội vã trong CSDL OLTP khi chưa xác thực điểm nghẽn hiệu năng',
              },
              why: {
                en: 'Duplicating customer_name into orders tables leads to silent stale data when customers update their profile names.',
                vi: 'Nhân bản customer_name vào bảng orders dẫn đến dữ liệu bị cũ khi khách hàng đổi tên.',
              },
              solution: {
                en: 'Default strictly to 3NF for transactional stores; only store point-in-time financial snapshots (such as historical price_at_purchase) with explicit semantics.',
                vi: 'Luôn giữ chuẩn 3NF cho hệ thống giao dịch; chỉ lưu giá trị ảnh chụp (như price_at_purchase) với ngữ nghĩa nghiệp vụ rõ ràng.',
              },
              codeIncorrect: `INSERT INTO orders (id, customer_id, customer_name) VALUES (1, 10, 'Alice');`,
              codeCorrect: `SELECT o.id, c.name AS customer_name 
FROM orders o JOIN customers c ON c.id = o.customer_id;`,
            },
          ],
          bestPractices: {
            en: [
              'Design transactional schemas in 3NF by default and benchmark with realistic concurrency before denormalizing.',
              'Use BIGINT GENERATED ALWAYS AS IDENTITY for surrogate primary keys.',
              'Enforce ON DELETE RESTRICT on financial tables to prevent accidental deletion cascades.',
            ],
            vi: [
              'Luôn thiết kế schema giao dịch ở chuẩn 3NF theo mặc định và đo kiểm trước khi phi chuẩn hóa.',
              'Sử dụng BIGINT GENERATED ALWAYS AS IDENTITY làm khóa chính surrogate.',
              'Thiết lập ON DELETE RESTRICT trên các bảng tài chính để ngăn xóa nhầm hàng loạt.',
            ],
          },
          practicalScenario: {
            en: 'A logistics platform stored vendor contact information inside warehouse inventory rows. When a vendor changed their phone number, 45,000 inventory items required updates. A server timeout caused the query to abort halfway, leaving half the inventory with invalid vendor contacts. Decomposing vendors into an independent 3NF table eliminated update anomalies permanently.',
            vi: 'Nền tảng vận tải lưu thông tin liên hệ nhà cung cấp bên trong dòng kho hàng. Khi nhà cung cấp đổi số điện thoại, 45.000 mặt hàng phải cập nhật đồng loạt. Một sự cố mạng khiến lệnh bị ngắt giữa chừng, làm một nửa số hàng giữ số điện thoại sai. Phân tách nhà cung cấp thành bảng chuẩn 3NF độc lập đã loại bỏ vĩnh viễn sự cố này.',
          },
          keyTakeaways: {
            en: [
              '1NF mandates scalar atomic values; 2NF removes partial key dependencies.',
              '3NF ensures non-key columns depend solely on the primary key.',
              'Normalization eliminates insert, update, and delete anomalies in transactional databases.',
            ],
            vi: [
              '1NF bắt buộc giá trị vô hướng nguyên tử; 2NF triệt tiêu phụ thuộc một phần.',
              '3NF đảm bảo các cột ngoài khóa chỉ phụ thuộc duy nhất vào khóa chính.',
              'Chuẩn hóa triệt tiêu hoàn toàn các dị thường chèn, sửa và xóa trong CSDL giao dịch.',
            ],
          },
        },
      ],
    },

    // Chapter 2: Zero-Downtime Database Migrations
    {
      id: 'spg-ch-2',
      number: 2,
      slug: 'zero-downtime-migrations',
      title: {
        en: 'Zero-Downtime Database Migrations (Expand-and-Contract)',
        vi: 'Kỹ Thuật Migration Cơ Sở Dữ Liệu Không Gián Đoạn (Zero-Downtime)',
      },
      summary: {
        en: 'Step-by-step production blueprint for executing schema changes, non-blocking indexing, and column deprecation with zero service interruption.',
        vi: 'Quy trình thực chiến giúp thực thi thay đổi schema, tạo index không khóa bảng và xóa cột cũ mà không làm gián đoạn dịch vụ.',
      },
      readTimeMinutes: 19,
      sections: [
        {
          id: 'spg-2-1',
          title: {
            en: 'The 5-Stage Expand-and-Contract Migration Blueprint',
            vi: 'Quy Trình 5 Giai Đoạn Của Expand-and-Contract Migration',
          },
          keyIdea: {
            en: 'Zero-downtime database migrations decouple schema expansion from code deployment, ensuring backward and forward compatibility throughout every release phase.',
            vi: 'Migration zero-downtime tách rời việc mở rộng schema khỏi việc triển khai code, đảm bảo tính tương thích xuôi và ngược xuyên suốt mọi giai đoạn phát hành.',
          },
          content: {
            en: 'Executing destructive DDL migrations—such as altering column types, renaming columns, or adding NOT NULL constraints without defaults—in active production environments acquires ACCESS EXCLUSIVE table locks that block all concurrent queries, resulting in service downtime. The Expand-and-Contract pattern guarantees zero downtime by decoupling schema alterations into discrete, backward-compatible phases: 1. Expand (add new column without blocking constraints); 2. Dual-Write (application code writes to both paths); 3. Backfill (background worker syncs legacy rows in rate-limited chunks); 4. Switch Reads (application code reads from new column); and 5. Contract (safely remove legacy columns and triggers).',
            vi: 'Việc thực thi các câu lệnh DDL có tính phá hủy—như đổi kiểu dữ liệu cột, đổi tên cột hay thêm NOT NULL không có default—trên môi trường production sẽ kích hoạt khóa ACCESS EXCLUSIVE làm treo toàn bộ truy vấn đồng thời, gây gián đoạn hệ thống. Mẫu thiết kế Expand-and-Contract đảm bảo zero downtime bằng cách tách rời thay đổi schema thành các pha tương thích ngược: 1. Expand (thêm cột mới không ràng buộc khóa); 2. Dual-Write (code ứng dụng ghi song song cả hai đường); 3. Backfill (tiến trình nền đồng bộ dữ liệu cũ theo từng lô); 4. Switch Reads (code ứng dụng chuyển sang đọc cột mới); và 5. Contract (xóa an toàn cột cũ và trigger).',
          },
          guideDetails: {
            goal: {
              en: 'Migrate a production column from 32-bit INT to 64-bit BIGINT on a table with 20 million rows under continuous read/write traffic with zero downtime.',
              vi: 'Chuyển đổi kiểu dữ liệu cột từ INT 32-bit sang BIGINT 64-bit trên bảng 20 triệu dòng dưới tải đọc/ghi liên tục mà không gây gián đoạn hệ thống.',
            },
            prerequisites: {
              en: [
                'PostgreSQL 12+ or equivalent modern relational database engine',
                'Application deployment pipeline supporting phased code releases',
                'Asynchronous background job runner or batch script runner',
              ],
              vi: [
                'PostgreSQL 12+ hoặc CSDL quan hệ hiện đại tương đương',
                'Hệ thống CI/CD hỗ trợ triển khai code theo từng giai đoạn độc lập',
                'Tiến trình chạy nền (worker) hoặc script chạy theo lô kiểm soát được tốc độ',
              ],
            },
            preparation: {
              en: 'Verify disk space for temporary index creation and establish baseline write latency metrics prior to commencing migration.',
              vi: 'Kiểm tra dung lượng đĩa trống để tạo index tạm và đo lường độ trễ ghi cơ sở trước khi bắt đầu tiến trình migration.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Phase 1 (Expand): Add New Column & Concurrent Index',
                  vi: 'Pha 1 (Mở Rộng): Thêm Cột Mới & Tạo Index Concurrently',
                },
                instruction: {
                  en: 'Add the new column as nullable without locks, then create the required index using CONCURRENTLY.',
                  vi: 'Thêm cột mới cho phép NULL không gây khóa bảng, sau đó tạo index bằng từ khóa CONCURRENTLY.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'phase1_expand.sql',
                  code: `-- Instant metadata alteration (Sub-millisecond lock)
ALTER TABLE payments 
ADD COLUMN amount_cents_v2 BIGINT;

-- Non-blocking index creation (Traffic continues unimpeded!)
CREATE INDEX CONCURRENTLY idx_payments_amount_v2 
ON payments (amount_cents_v2);`,
                },
                expectedOutput: {
                  en: 'Column added and index built in background without blocking concurrent writes.',
                  vi: 'Cột mới được thêm và index được tạo ngầm trong nền mà không chặn các giao dịch ghi.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Phase 2 (Dual-Write): Deploy Application Code Writing Both Columns',
                  vi: 'Pha 2 (Ghi Song Song): Triển Khai Code Ghi Đồng Thời Hai Cột',
                },
                instruction: {
                  en: 'Deploy application update so every INSERT and UPDATE writes identical values to both amount_cents and amount_cents_v2, while continuing to read from amount_cents.',
                  vi: 'Triển khai bản cập nhật ứng dụng để mọi lệnh INSERT và UPDATE đều ghi giá trị vào cả amount_cents và amount_cents_v2, trong khi vẫn đọc từ amount_cents.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'phase2_dual_write_trigger_or_app.sql',
                  code: `-- Application ORM or Query writes to both columns:
INSERT INTO payments (id, amount_cents, amount_cents_v2, status)
VALUES (DEFAULT, 1500, 1500, 'completed');

-- Optional database trigger fallback if multi-service dual-write is required:
CREATE OR REPLACE FUNCTION sync_payments_v2()
RETURNS TRIGGER AS $$
BEGIN
    NEW.amount_cents_v2 := NEW.amount_cents;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payments_dual_write
BEFORE INSERT OR UPDATE OF amount_cents ON payments
FOR EACH ROW EXECUTE FUNCTION sync_payments_v2();`,
                },
                expectedOutput: {
                  en: 'All newly inserted and updated rows automatically populate both columns.',
                  vi: 'Mọi bản ghi mới chèn hoặc cập nhật đều tự động lưu giá trị trên cả hai cột.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Phase 3 (Backfill): Synchronize Historical Rows in Batches',
                  vi: 'Pha 3 (Đồng Bộ Dữ Liệu Cũ): Chạy Backfill Theo Từng Lô Nhỏ',
                },
                instruction: {
                  en: 'Run an asynchronous background script updating un-migrated rows in rate-limited batches with sleep pauses to yield locks and IOPS.',
                  vi: 'Chạy script nền cập nhật các dòng chưa chuyển đổi theo từng mẻ nhỏ có khoảng nghỉ ngắn để giải phóng khóa và tài nguyên đĩa.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'phase3_batched_backfill.sql',
                  code: `DO $$
DECLARE
    batch_size INT := 5000;
    rows_updated INT;
BEGIN
    LOOP
        UPDATE payments
        SET amount_cents_v2 = amount_cents::BIGINT
        WHERE id IN (
            SELECT id FROM payments 
            WHERE amount_cents_v2 IS NULL 
            LIMIT batch_size
        );
        GET DIAGNOSTICS rows_updated = ROW_COUNT;
        EXIT WHEN rows_updated = 0;
        PERFORM pg_sleep(0.05); -- Sleep 50ms to yield locks and IOPS
    END LOOP;
END $$;`,
                },
                expectedOutput: {
                  en: 'Historical rows backfilled to amount_cents_v2 with zero lock contention.',
                  vi: 'Dữ liệu lịch sử được đồng bộ sang amount_cents_v2 mà không làm nghẽn khóa.',
                },
              },
              {
                stepNumber: 4,
                title: {
                  en: 'Phase 4 (Validation & Switch): Enforce NOT NULL & Switch Reads',
                  vi: 'Pha 4 (Xác Thực & Chuyển Đọc): Thêm NOT NULL An Toàn & Đổi Nguồn Đọc',
                },
                instruction: {
                  en: 'Add check constraint with NOT VALID, validate it in the background, then deploy application code to read exclusively from amount_cents_v2.',
                  vi: 'Thêm constraint dạng NOT VALID, kiểm tra hợp lệ ngầm trong nền, sau đó deploy code ứng dụng chuyển sang đọc từ amount_cents_v2.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'phase4_validation_and_switch.sql',
                  code: `-- Step 4a: Add NOT VALID constraint (Instant, no full table scan!)
ALTER TABLE payments 
ADD CONSTRAINT chk_amount_v2_not_null 
CHECK (amount_cents_v2 IS NOT NULL) NOT VALID;

-- Step 4b: Validate constraint in background without exclusive locks
ALTER TABLE payments 
VALIDATE CONSTRAINT chk_amount_v2_not_null;

-- Application code deployed to read strictly from amount_cents_v2!`,
                },
                expectedOutput: {
                  en: 'Constraint validated; application reading seamlessly from new column.',
                  vi: 'Ràng buộc đã được kiểm chứng; ứng dụng đọc ổn định từ cột mới.',
                },
              },
              {
                stepNumber: 5,
                title: {
                  en: 'Phase 5 (Contract): Remove Legacy Columns & Triggers',
                  vi: 'Pha 5 (Thu Gọn): Xóa Bỏ Cột Cũ & Dọn Dẹp Triggers',
                },
                instruction: {
                  en: 'After 48 hours of verification, drop dual-write application logic, drop trigger, and drop legacy amount_cents column.',
                  vi: 'Sau 48 giờ vận hành ổn định, gỡ bỏ code dual-write trong ứng dụng, xóa trigger và xóa cột cũ amount_cents.',
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'phase5_contract.sql',
                  code: `-- Drop dual-write trigger if used
DROP TRIGGER IF EXISTS trg_payments_dual_write ON payments;
DROP FUNCTION IF EXISTS sync_payments_v2();

-- Drop legacy column safely (Metadata-only alteration)
ALTER TABLE payments DROP COLUMN amount_cents;`,
                },
                expectedOutput: {
                  en: 'Migration finalized; schema clean and 100% updated with zero downtime.',
                  vi: 'Hoàn tất migration; schema sạch sẽ và đã nâng cấp hoàn toàn không có downtime.',
                },
              },
            ],
            verification: {
              en: 'Verify that `SELECT COUNT(*) FROM payments WHERE amount_cents_v2 IS NULL;` returns 0, and confirm application logs display zero database lock timeout exceptions.',
              vi: 'Kiểm tra `SELECT COUNT(*) FROM payments WHERE amount_cents_v2 IS NULL;` trả về 0, và xác nhận log ứng dụng không xuất hiện bất kỳ lỗi timeout do khóa bảng.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Backfill UPDATE batch deadlocks with active web application checkout transactions',
                  vi: 'Lệnh UPDATE trong batch backfill bị deadlock với giao dịch thanh toán của ứng dụng',
                },
                cause: {
                  en: 'Batch size is too large (e.g. 50,000 rows) or locks rows in random order while web queries lock rows sequentially.',
                  vi: 'Kích thước lô quá lớn (vd 50.000 dòng) hoặc cập nhật dòng ngẫu nhiên trong khi ứng dụng khóa dòng tuần tự.',
                },
                fix: {
                  en: 'Reduce batch size to 1,000–5,000 rows and order subquery selection strictly by primary key (`ORDER BY id LIMIT 2000`).',
                  vi: 'Giảm kích thước lô xuống 1.000–5.000 dòng và sắp xếp truy vấn chọn lọc chặt chẽ theo khóa chính (`ORDER BY id LIMIT 2000`).',
                },
              },
              {
                symptom: {
                  en: 'CREATE INDEX CONCURRENTLY fails with "duplicate key value violates unique constraint" or remains INVALID',
                  vi: 'CREATE INDEX CONCURRENTLY thất bại với lỗi trùng khóa hoặc rơi vào trạng thái INVALID',
                },
                cause: {
                  en: 'A concurrent transaction committed duplicate data or the background build worker experienced a connection timeout.',
                  vi: 'Một giao dịch đồng thời chèn dữ liệu trùng hoặc tiến trình tạo index bị ngắt kết nối giữa chừng.',
                },
                fix: {
                  en: 'Drop the invalid index via `DROP INDEX CONCURRENTLY idx_name;` and retry after resolving conflicting duplicate entries.',
                  vi: 'Xóa index hỏng bằng `DROP INDEX CONCURRENTLY idx_name;` và thử lại sau khi đã xử lý các bản ghi trùng lặp.',
                },
              },
            ],
            checklist: {
              en: [
                'New column created as nullable without blocking defaults.',
                'Indexes created using CREATE INDEX CONCURRENTLY.',
                'Application dual-writes deployed and verified before commencing backfill.',
                'Historical backfill executed in rate-limited batches with sleep pauses.',
                'Constraints added with NOT VALID then validated in separate background statement.',
                'Legacy column dropped only after code read paths have completely switched.',
              ],
              vi: [
                'Cột mới được tạo cho phép NULL và không có giá trị mặc định gây khóa bảng.',
                'Chỉ mục được tạo bằng lệnh CREATE INDEX CONCURRENTLY.',
                'Code ứng dụng ghi song song đã được deploy và kiểm tra trước khi backfill.',
                'Tiến trình đồng bộ lịch sử chạy theo từng mẻ nhỏ có khoảng nghỉ có kiểm soát.',
                'Ràng buộc được thêm bằng NOT VALID sau đó mới kiểm tra bằng câu lệnh riêng.',
                'Cột cũ chỉ được xóa sau khi code đọc dữ liệu đã chuyển đổi hoàn toàn.',
              ],
            },
          },
          comparisonTable: {
            headers: [
              { en: 'Phase', vi: 'Giai Đoạn' },
              { en: 'Database Action', vi: 'Thao Tác Cơ Sở Dữ Liệu' },
              { en: 'Application Action', vi: 'Thao Tác Ứng Dụng' },
              { en: 'Locking Overhead', vi: 'Mức Độ Khóa (Lock)' },
            ],
            rows: [
              {
                en: ['Phase 1: Expand', 'Add new nullable column or table', 'Unchanged (runs current stable version)', 'Sub-millisecond metadata lock'],
                vi: ['Pha 1: Expand', 'Thêm cột hoặc bảng mới có thể nhận NULL', 'Không đổi (chạy code ổn định hiện tại)', 'Lock metadata dưới 1 mili-giây'],
              },
              {
                en: ['Phase 2: Dual-Write', 'Active schema with both columns', 'Deploy app writing to Col 1 and Col 2', 'Zero locking overhead beyond standard writes'],
                vi: ['Pha 2: Dual-Write', 'Schema hoạt động với cả hai cột', 'Deploy code ghi đồng thời vào Cột 1 và Cột 2', 'Không phát sinh lock ngoài giao dịch ghi thường'],
              },
              {
                en: ['Phase 3: Backfill', 'Batch updates legacy rows in chunks', 'App continues reading Col 1, writing both', 'Short row locks on 5,000-row batch chunks'],
                vi: ['Pha 3: Backfill', 'Cập nhật dữ liệu cũ theo từng mẻ nhỏ', 'App tiếp tục đọc Cột 1, ghi song song cả hai', 'Lock dòng ngắn trên từng mẻ 5.000 bản ghi'],
              },
              {
                en: ['Phase 4: Read Switch', 'Validate constraints concurrently', 'Deploy app reading exclusively from Col 2', 'Zero lock impact'],
                vi: ['Pha 4: Đổi Nguồn Đọc', 'Kiểm tra ràng buộc độc lập không chặn bảng', 'Deploy code chuyển sang đọc hoàn toàn từ Cột 2', 'Hoàn toàn không có lock'],
              },
              {
                en: ['Phase 5: Contract', 'Drop legacy column and cleanup', 'App removes dual-write fallback code', 'Sub-millisecond metadata lock'],
                vi: ['Pha 5: Contract', 'Xóa cột cũ và dọn dẹp', 'Xóa bỏ code dự phòng dual-write trong ứng dụng', 'Lock metadata dưới 1 mili-giây'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Five-Stage Expand-and-Contract Migration Flow',
              vi: 'Quy Trình 5 Giai Đoạn Của Expand-and-Contract Migration',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Expand Schema', vi: 'Mở Rộng Schema' },
                description: {
                  en: 'Create new column or table without heavy constraints or lockouts.',
                  vi: 'Tạo cột hoặc bảng mới không ràng buộc nặng nề, cho phép NULL.',
                },
              },
              {
                number: 2,
                label: { en: 'Dual-Write Deploy', vi: 'Deploy Ghi Song Song' },
                description: {
                  en: 'Application writes incoming traffic to both old and new columns.',
                  vi: 'Ứng dụng ghi dữ liệu mới phát sinh vào cả cột cũ và cột mới.',
                },
              },
              {
                number: 3,
                label: { en: 'Batched Backfill', vi: 'Đồng Bộ Dữ Liệu Cũ' },
                description: {
                  en: 'Background worker synchronizes historical legacy records in small batches.',
                  vi: 'Tiến trình nền đồng bộ các bản ghi lịch sử cũ theo từng lô nhỏ.',
                },
              },
              {
                number: 4,
                label: { en: 'Read Switch & Validation', vi: 'Chuyển Đọc & Xác Thực' },
                description: {
                  en: 'Application switches read queries to new column; constraints validated.',
                  vi: 'Ứng dụng chuyển sang đọc cột mới; các ràng buộc được kiểm tra hợp lệ.',
                },
              },
              {
                number: 5,
                label: { en: 'Contract & Cleanup', vi: 'Thu Gọn & Dọn Dẹp' },
                description: {
                  en: 'Drop legacy column safely after stability verification.',
                  vi: 'Xóa bỏ cột cũ an toàn sau khi hệ thống đã vận hành ổn định.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Executing `CREATE INDEX` without CONCURRENTLY on tables with millions of rows',
                vi: 'Chạy lệnh `CREATE INDEX` thiếu từ khóa CONCURRENTLY trên bảng hàng triệu dòng',
              },
              why: {
                en: 'A standard CREATE INDEX acquires a SHARE lock on the entire table, blocking all concurrent INSERT, UPDATE, and DELETE queries for tens of minutes.',
                vi: 'Lệnh CREATE INDEX thông thường kích hoạt khóa SHARE trên toàn bảng, chặn đứng toàn bộ lệnh ghi trong suốt thời gian tạo chỉ mục.',
              },
              solution: {
                en: 'Always execute `CREATE INDEX CONCURRENTLY` in production environments.',
                vi: 'Luôn sử dụng `CREATE INDEX CONCURRENTLY` trên môi trường production.',
              },
              codeIncorrect: `CREATE INDEX idx_payments_amount ON payments (amount_cents); -- LOCKS THE ENTIRE TABLE!`,
              codeCorrect: `CREATE INDEX CONCURRENTLY idx_payments_amount ON payments (amount_cents); -- NON-BLOCKING!`,
            },
          ],
          bestPractices: {
            en: [
              'Always use CREATE INDEX CONCURRENTLY and DROP INDEX CONCURRENTLY in production.',
              'Add constraints with NOT VALID, followed by separate background VALIDATE CONSTRAINT calls.',
              'Rate-limit historical backfills with short sleep pauses to yield database IOPS and row locks.',
            ],
            vi: [
              'Luôn dùng CREATE INDEX CONCURRENTLY và DROP INDEX CONCURRENTLY trên production.',
              'Thêm ràng buộc với NOT VALID, sau đó mới gọi VALIDATE CONSTRAINT riêng trong nền.',
              'Kiểm soát tốc độ backfill dữ liệu cũ kèm khoảng nghỉ ngắn để nhả khóa và tài nguyên đĩa.',
            ],
          },
          practicalScenario: {
            en: 'A payment processor processing 800 transactions per second needed to convert their transaction ID from 32-bit INT to 64-bit BIGINT as they approached the 2.1 billion ceiling. A direct ALTER TABLE would have locked payments for 50 minutes, aborting checkouts and causing massive revenue loss. Using the 5-phase Expand-and-Contract blueprint, all 2 billion rows were migrated across 5 days with zero customer downtime.',
            vi: 'Cổng thanh toán xử lý 800 giao dịch/giây cần chuyển transaction ID từ INT 32-bit sang BIGINT 64-bit khi sắp chạm trần 2,1 tỷ giao dịch. Câu lệnh ALTER TABLE trực tiếp sẽ khóa cứng bảng thanh toán trong 50 phút, làm hỏng các lượt mua hàng và gây tổn thất doanh thu nặng nề. Sử dụng quy trình Expand-and-Contract 5 pha, 2 tỷ dòng được chuyển đổi trong 5 ngày với 0 giây thời gian chết.',
          },
          keyTakeaways: {
            en: [
              'Expand-and-contract decouples database schema alterations from application code deploys.',
              'Never execute blocking DDL requiring ACCESS EXCLUSIVE locks under active production traffic.',
              'Always index concurrently and backfill historical data in rate-limited batches.',
            ],
            vi: [
              'Expand-and-contract tách rời việc thay đổi schema cơ sở dữ liệu khỏi việc deploy code ứng dụng.',
              'Tuyệt đối không chạy lệnh DDL kích hoạt khóa ACCESS EXCLUSIVE trong giờ cao điểm.',
              'Luôn tạo index ở chế độ CONCURRENTLY và đồng bộ dữ liệu cũ theo từng lô có kiểm soát tốc độ.',
            ],
          },
        },
      ],
    },
  ],
};
