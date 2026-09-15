import { Course } from '../types';
import { module01Lessons as basicMod01Lessons } from './css/basic/module01';
import { module02Lessons as basicMod02Lessons } from './css/basic/module02';
import { module01Lessons as intMod01Lessons } from './css/intermediate/module01';
import { module02Lessons as intMod02Lessons } from './css/intermediate/module02';
import { module01Lessons as advMod01Lessons } from './css/advanced/module01';
import { module02Lessons as advMod02Lessons } from './css/advanced/module02';

export const cssCourse: Course = {
  id: 'css',
  title: { en: 'Modern CSS & Responsive Design', vi: 'CSS Hiện Đại & Thiết Kế Đáp Ứng' },
  tagline: { 
    en: 'Craft beautiful responsive layouts with Flexbox, CSS Grid, custom properties, animations, and container queries', 
    vi: 'Làm chủ Flexbox, CSS Grid, biến tùy chỉnh, hiệu ứng animation và Container Queries hiện đại' 
  },
  description: {
    en: 'Comprehensive modern CSS curriculum: from the fundamental Box Model, specificity, and Flexbox to multi-dimensional CSS Grid layouts, fluid typography with clamp(), keyframe animations, Cascade Layers (@layer), and modern Container Queries.',
    vi: 'Chương trình học CSS hiện đại toàn diện: từ mô hình hộp Box Model, độ ưu tiên Specificity và Flexbox đến dàn trang đa chiều CSS Grid, chữ co giãn với clamp(), hiệu ứng keyframes, phân tầng Cascade Layers (@layer) và Container Queries.'
  },
  iconName: 'Palette',
  color: 'from-blue-500 via-blue-600 to-cyan-700',
  accentBg: 'bg-blue-500/15 border-blue-500/35 text-blue-400',
  levels: {
    basic: {
      id: 'basic',
      courseId: 'css',
      order: 1,
      title: { en: 'CSS Fundamentals, Box Model & Typography', vi: 'CSS Cơ Bản, Mô Hình Hộp & Typography' },
      description: { 
        en: 'Syntax, the Cascade & Specificity, Selectors, Pseudo-classes, CSS Units, Box Model, Colors & Modern Color Spaces, Web Typography, and Element Flow.', 
        vi: 'Cú pháp, Cascade & Specificity, Bộ chọn, Pseudo-classes, Đơn vị CSS, Mô hình hộp Box Model, Hệ màu hiện đại, Typography và Luồng phần tử.' 
      },
      modules: [
        {
          id: 'css_mod_1',
          levelId: 'basic',
          courseId: 'css',
          order: 1,
          title: { en: 'Module 01: CSS Syntax, Selectors & The Cascade (Lessons 1–4)', vi: 'Chương 01: Cú Pháp CSS, Bộ Chọn & Cơ Chế Cascade (Bài 1–4)' },
          description: { 
            en: 'Understand CSS syntax, inclusion methods, specificity calculation, pseudo-classes, pseudo-elements, and modern responsive units.', 
            vi: 'Nắm vững cú pháp CSS, phương pháp nhúng, tính toán specificity, pseudo-classes, pseudo-elements và các hệ đơn vị hiện đại.' 
          },
          lessons: basicMod01Lessons
        },
        {
          id: 'css_mod_2',
          levelId: 'basic',
          courseId: 'css',
          order: 2,
          title: { en: 'Module 02: Box Model, Colors, Typography & Flow (Lessons 5–8)', vi: 'Chương 02: Mô Hình Hộp, Màu Sắc, Chữ & Luồng Hiển Thị (Bài 5–8)' },
          description: { 
            en: 'Master margin collapse, border-box sizing, oklch/color spaces, web typography, and element positioning (relative, absolute, fixed, sticky).', 
            vi: 'Làm chủ margin collapse, border-box, không gian màu oklch, web typography và định vị phần tử (relative, absolute, fixed, sticky).' 
          },
          lessons: basicMod02Lessons
        }
      ]
    },
    intermediate: {
      id: 'intermediate',
      courseId: 'css',
      order: 2,
      title: { en: 'Flexbox, CSS Grid, Responsive Design & Motion', vi: 'Flexbox, CSS Grid, Thiết Kế Đáp Ứng & Hoạt Họa' },
      description: { 
        en: '1D & 2D layout systems with Flexbox and CSS Grid, mobile-first media queries, custom properties, transitions, transforms, and @keyframes animations.', 
        vi: 'Hệ thống bố cục 1D & 2D với Flexbox và CSS Grid, media queries mobile-first, biến CSS, transitions, transforms và hoạt họa @keyframes.' 
      },
      modules: [
        {
          id: 'css_mod_3',
          levelId: 'intermediate',
          courseId: 'css',
          order: 3,
          title: { en: 'Module 03: Flexbox, CSS Grid & Layout Architecture (Lessons 9–13)', vi: 'Chương 03: Flexbox, CSS Grid & Kiến Trúc Bố Cục (Bài 9–13)' },
          description: { 
            en: 'Deep dive into Flexbox axes/alignment, multi-track CSS Grid, fractional units, template areas, and Flexbox vs Grid architectural choices.', 
            vi: 'Nghiên cứu chuyên sâu trục/căn chỉnh Flexbox, lưới đa chiều CSS Grid, đơn vị phân số fr, template areas và lựa chọn kiến trúc Flexbox vs Grid.' 
          },
          lessons: intMod01Lessons
        },
        {
          id: 'css_mod_4',
          levelId: 'intermediate',
          courseId: 'css',
          order: 4,
          title: { en: 'Module 04: Responsive Design, Theming & Motion (Lessons 14–18)', vi: 'Chương 04: Thiết Kế Đáp Ứng, Đổi Giao Diện & Chuyển Động (Bài 14–18)' },
          description: { 
            en: 'Mobile-first range media queries, CSS custom properties & dark mode theming, smooth transitions, 2D/3D transforms, and GPU-optimized keyframe animations.', 
            vi: 'Media query khoảng mobile-first, biến CSS & đổi theme tối/sáng, transitions mượt mà, transforms 2D/3D và hoạt họa keyframes tối ưu GPU.' 
          },
          lessons: intMod02Lessons
        }
      ]
    },
    advanced: {
      id: 'advanced',
      courseId: 'css',
      order: 3,
      title: { en: 'Modern CSS Architecture & Next-Gen Capabilities', vi: 'Kiến Trúc CSS Hiện Đại & Năng Lực Tân Tiến' },
      description: { 
        en: 'Math functions with clamp(), relational selectors (:is, :where, :has), Container Queries (@container), Cascade Layers (@layer), Subgrid, and Scroll-Driven Animations.', 
        vi: 'Hàm toán học clamp(), bộ chọn quan hệ (:is, :where, :has), Container Queries (@container), Cascade Layers (@layer), Subgrid và Scroll-Driven Animations.' 
      },
      modules: [
        {
          id: 'css_mod_5',
          levelId: 'advanced',
          courseId: 'css',
          order: 5,
          title: { en: 'Module 05: Modern Math, Relational Selectors & Container Queries (Lessons 19–21)', vi: 'Chương 05: Hàm Toán Học, Bộ Chọn Quan Hệ & Container Queries (Bài 19–21)' },
          description: { 
            en: 'Master fluid math functions (calc, min, max, clamp), :has() and modern relational pseudo-classes, and component-driven container queries (@container).', 
            vi: 'Làm chủ hàm toán học co giãn (calc, min, max, clamp), bộ chọn cha :has() cùng pseudo-classes hiện đại, và container queries theo component (@container).' 
          },
          lessons: advMod01Lessons
        },
        {
          id: 'css_mod_6',
          levelId: 'advanced',
          courseId: 'css',
          order: 6,
          title: { en: 'Module 06: Enterprise Architecture, Cascade Layers & Next-Gen Effects (Lessons 22–24)', vi: 'Chương 06: Kiến Trúc Doanh Nghiệp, Phân Tầng Cascade Layers & Hiệu Ứng Mới (Bài 22–24)' },
          description: { 
            en: 'Master enterprise cascade layers (@layer), multi-track subgrid layout alignment, backdrop filters, blend modes, and modern scroll-driven animations.', 
            vi: 'Làm chủ phân tầng cascade layers (@layer) cho doanh nghiệp, căn chỉnh subgrid đa trục, hiệu ứng lọc backdrop, blend modes và hoạt họa cuộn scroll-driven animations.' 
          },
          lessons: advMod02Lessons
        }
      ]
    }
  }
};
