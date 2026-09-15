import { Course } from '../types';
import { module01Lessons as basicMod01Lessons } from './powerbi/basic/module01';
import { module02Lessons as basicMod02Lessons } from './powerbi/basic/module02';
import { module01Lessons as intMod01Lessons } from './powerbi/intermediate/module01';
import { module02Lessons as intMod02Lessons } from './powerbi/intermediate/module02';
import { module01Lessons as advMod01Lessons } from './powerbi/advanced/module01';
import { module02Lessons as advMod02Lessons } from './powerbi/advanced/module02';

export const powerBiCourse: Course = {
  id: 'powerbi',
  title: {
    en: 'Microsoft Power BI & DAX Analytics',
    vi: 'Microsoft Power BI & Phân Tích DAX'
  },
  tagline: {
    en: 'Transform raw data into interactive business intelligence dashboards and master DAX modeling',
    vi: 'Chuyển hóa dữ liệu thô thành báo cáo kinh doanh thông minh và làm chủ mô hình hóa DAX'
  },
  description: {
    en: 'Comprehensive Microsoft Power BI curriculum covering Power Query ETL, Star Schema dimensional modeling, evaluation contexts, CALCULATE, Time Intelligence, semi-additive snapshots, dynamic RLS security, VertiPaq performance tuning, and enterprise cloud governance.',
    vi: 'Chương trình Microsoft Power BI toàn diện từ Power Query ETL, mô hình hóa Star Schema, ngữ cảnh đánh giá, CALCULATE, Time Intelligence, số dư bán cộng, bảo mật RLS động, tối ưu hóa VertiPaq và quy trình triển khai doanh nghiệp trên Power BI Service.'
  },
  iconName: 'BarChart3',
  color: 'from-amber-400 via-amber-500 to-yellow-600',
  accentBg: 'bg-[#F2C811]/15 border-[#F2C811]/35 text-amber-500 dark:text-amber-400',
  levels: {
    basic: {
      id: 'basic',
      courseId: 'powerbi',
      title: {
        en: 'Power BI Fundamentals, ETL & Visual Reports',
        vi: 'Power BI Cơ Bản, ETL & Thiết Kế Báo Cáo'
      },
      description: {
        en: 'Ecosystem architecture, Power Query data profiling, Star Schema dimensional modeling, relationship cardinality, core visuals, and interactive report dynamics.',
        vi: 'Kiến trúc hệ sinh thái, làm sạch dữ liệu bằng Power Query, mô hình dữ liệu Star Schema, cấu hình quan hệ, các biểu đồ chuẩn và tương tác báo cáo linh hoạt.'
      },
      order: 1,
      modules: [
        {
          id: 'pbi_mod_1',
          levelId: 'basic',
          courseId: 'powerbi',
          order: 1,
          title: {
            en: 'Module 01: Data Ingestion & Dimensional Modeling (Lessons 1–3)',
            vi: 'Chương 01: Thu Thập Dữ Liệu & Mô Hình Hóa Dữ Liệu Chiều (Bài 1–3)'
          },
          description: {
            en: 'Master the Power BI Desktop ecosystem, Power Query transformations, and Star Schema design principles.',
            vi: 'Nắm vững hệ sinh thái Power BI Desktop, chuyển đổi dữ liệu Power Query và nguyên lý thiết kế Star Schema.'
          },
          lessons: basicMod01Lessons
        },
        {
          id: 'pbi_mod_2',
          levelId: 'basic',
          courseId: 'powerbi',
          order: 2,
          title: {
            en: 'Module 02: Relationships & Core Visualizations (Lessons 4–6)',
            vi: 'Chương 02: Mối Quan Hệ & Trực Quan Hóa Cốt Lõi (Bài 4–6)'
          },
          description: {
            en: 'Establish relationship cardinalities, configure cross-filter directions, design rich visuals, and build interactive drillthrough reports.',
            vi: 'Thiết lập bản số quan hệ, cấu hình chiều lọc, thiết kế biểu đồ chuyên nghiệp và xây dựng tương tác drillthrough.'
          },
          lessons: basicMod02Lessons
        }
      ]
    },
    intermediate: {
      id: 'intermediate',
      courseId: 'powerbi',
      title: {
        en: 'DAX Modeling, Evaluation Contexts & Time Intelligence',
        vi: 'Mô Hình Hóa DAX, Ngữ Cảnh Đánh Giá & Phân Tích Thời Gian'
      },
      description: {
        en: 'Calculated columns vs measures, iterator functions (X-functions), row and filter contexts, context transition, CALCULATE filter modifiers, Date tables, and Time Intelligence.',
        vi: 'Phân biệt Calculated Column vs Measure, hàm lặp X-functions, ngữ cảnh dòng và ngữ cảnh lọc, chuyển đổi ngữ cảnh, CALCULATE, bảng Ngày chuẩn và phân tích Thời gian.'
      },
      order: 2,
      modules: [
        {
          id: 'pbi_mod_3',
          levelId: 'intermediate',
          courseId: 'powerbi',
          order: 3,
          title: {
            en: 'Module 03: DAX Foundations & Evaluation Context (Lessons 7–10)',
            vi: 'Chương 03: Nền Tảng DAX & Ngữ Cảnh Đánh Giá (Bài 7–10)'
          },
          description: {
            en: 'Master DAX syntax, aggregations vs iterators, row/filter contexts, context transitions, and CALCULATE with filter modifiers.',
            vi: 'Làm chủ cú pháp DAX, hàm tổng hợp vs hàm lặp, ngữ cảnh dòng/lọc, chuyển đổi ngữ cảnh và hàm CALCULATE kèm các hàm biến đổi bộ lọc.'
          },
          lessons: intMod01Lessons
        },
        {
          id: 'pbi_mod_4',
          levelId: 'intermediate',
          courseId: 'powerbi',
          order: 4,
          title: {
            en: 'Module 04: Advanced Relationships & Time Intelligence (Lessons 11–13)',
            vi: 'Chương 04: Quan Hệ Nâng Cao & Phân Tích Thời Gian (Bài 11–13)'
          },
          description: {
            en: 'Traverse relationships with RELATED/RELATEDTABLE, design contiguous Date tables, and evaluate YTD/MTD/YoY growth.',
            vi: 'Duyệt quan hệ với RELATED/RELATEDTABLE, tạo bảng Ngày chuẩn và tính toán tăng trưởng YTD, MTD, YoY.'
          },
          lessons: intMod02Lessons
        }
      ]
    },
    advanced: {
      id: 'advanced',
      courseId: 'powerbi',
      title: {
        en: 'Enterprise DAX, Security & Architecture',
        vi: 'DAX Nâng Cao Doanh Nghiệp, Bảo Mật & Quản Trị'
      },
      description: {
        en: 'Semi-additive account balances, advanced table functions, TREATAS virtual relationships, dynamic Row-Level Security (RLS), VertiPaq optimization, and Deployment Pipelines.',
        vi: 'Số dư bán cộng, hàm bảng nâng cao, quan hệ ảo TREATAS, bảo mật cấp dòng RLS động, tối ưu hóa VertiPaq và quy trình triển khai Deployment Pipelines.'
      },
      order: 3,
      modules: [
        {
          id: 'pbi_mod_5',
          levelId: 'advanced',
          courseId: 'powerbi',
          order: 5,
          title: {
            en: 'Module 05: Semi-Additive Measures & Virtual Relationships (Lessons 14–15)',
            vi: 'Chương 05: Số Dư Bán Cộng & Quan Hệ Ảo (Bài 14–15)'
          },
          description: {
            en: 'Semi-additive snapshots, account balance intelligence, and virtual relationships with TREATAS, SUMMARIZE, ADDCOLUMNS, and GENERATE.',
            vi: 'Xử lý số dư bán cộng, số dư tài khoản định kỳ và mô hình hóa quan hệ ảo bằng TREATAS, SUMMARIZE, ADDCOLUMNS và GENERATE.'
          },
          lessons: advMod01Lessons
        },
        {
          id: 'pbi_mod_6',
          levelId: 'advanced',
          courseId: 'powerbi',
          order: 6,
          title: {
            en: 'Module 06: Row-Level Security, Performance Tuning & Governance (Lessons 16–18)',
            vi: 'Chương 06: Bảo Mật Cấp Dòng, Tối Ưu Hiệu Năng & Quản Trị (Bài 16–18)'
          },
          description: {
            en: 'Dynamic Row-Level Security with USERPRINCIPALNAME, VertiPaq memory optimization, Performance Analyzer query plan tuning, and Power BI Service Deployment Pipelines.',
            vi: 'Bảo mật RLS động với USERPRINCIPALNAME, tối ưu hóa bộ nhớ VertiPaq, chẩn đoán kế hoạch truy vấn với Performance Analyzer và quy trình triển khai Deployment Pipelines.'
          },
          lessons: advMod02Lessons
        }
      ]
    }
  }
};

export default powerBiCourse;
