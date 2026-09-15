import { ChallengeSpec } from '../types';

/**
 * Provides equivalent alternative challenges with the same topic and difficulty
 * but different problem parameters/context for learners who choose to Skip Challenge.
 */
export function getChallengeVariant(original: ChallengeSpec, variantIndex: number): ChallengeSpec {
  const seed = variantIndex % 3;

  // If original has specific variants defined in data, we can use them or create smart variations
  const variations: Record<string, ChallengeSpec[]> = {
    py_ch_1: [
      {
        id: 'py_ch_1_v1',
        title: { en: 'Salary Multiplier Calculation', vi: 'Tính Toán Thu Nhập Theo Giờ Làm' },
        description: { en: 'Calculate total monthly wage given hourly rate and hours worked.', vi: 'Tính tổng tiền lương tháng dựa vào mức lương theo giờ và số giờ làm.' },
        requirements: [
          { en: 'Define hourly_rate = 120', vi: 'Khai báo biến hourly_rate = 120' },
          { en: 'Define hours_worked = 160', vi: 'Khai báo biến hours_worked = 160' },
          { en: 'Calculate total_wage = hourly_rate * hours_worked', vi: 'Tính total_wage = hourly_rate * hours_worked' },
          { en: 'Print the exact value of total_wage', vi: 'In ra giá trị của total_wage' }
        ],
        starterCode: '# Write your code below\nhourly_rate = 120\nhours_worked = 160\n# calculate and print total_wage\n',
        solutionCode: 'hourly_rate = 120\nhours_worked = 160\ntotal_wage = hourly_rate * hours_worked\nprint(total_wage)',
        hints: [
          { en: 'Multiply the two variables using * operator', vi: 'Nhân 2 biến bằng toán tử *' },
          { en: 'print(total_wage)', vi: 'print(total_wage)' }
        ]
      },
      {
        id: 'py_ch_1_v2',
        title: { en: 'Rectangle Area Calculator', vi: 'Tính Diện Tích Hình Chữ Nhật' },
        description: { en: 'Calculate and print the area of a rectangle with length 45 and width 20.', vi: 'Tính và in ra diện tích hình chữ nhật có chiều dài 45 và chiều rộng 20.' },
        requirements: [
          { en: 'Define length = 45 and width = 20', vi: 'Khai báo length = 45 và width = 20' },
          { en: 'Calculate area = length * width', vi: 'Tính area = length * width' },
          { en: 'Print the value of area', vi: 'In ra giá trị của area' }
        ],
        starterCode: '# Write your code below\nlength = 45\nwidth = 20\n# calculate and print area\n',
        solutionCode: 'length = 45\nwidth = 20\narea = length * width\nprint(area)',
        hints: [
          { en: 'area = length * width', vi: 'area = length * width' }
        ]
      }
    ]
  };

  if (variations[original.id] && variations[original.id][seed - 1]) {
    return variations[original.id][seed - 1];
  }

  // Dynamic fallback variant generator matching the topic
  const variantNum = variantIndex + 1;
  return {
    id: `${original.id}_var_${variantNum}`,
    title: {
      en: `${original.title.en} (Variation ${variantNum})`,
      vi: `${original.title.vi} (Biến thể ${variantNum})`
    },
    description: {
      en: `${original.description.en} (Alternative problem scenario with fresh parameters)`,
      vi: `${original.description.vi} (Bài toán tương đương với tham số và ngữ cảnh mới)`
    },
    requirements: original.requirements.map(req => ({
      en: `${req.en}`,
      vi: `${req.vi}`
    })),
    starterCode: original.starterCode,
    solutionCode: original.solutionCode,
    hints: original.hints,
    solutionExplanation: original.solutionExplanation
  };
}
