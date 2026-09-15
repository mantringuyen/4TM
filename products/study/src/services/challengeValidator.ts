import { ChallengeSpec, CodeExecutionResult, LocalizedString } from '../types';
import { executeCode } from './codeRunner';

/**
 * Strips comments and whitespace from code based on language
 */
export function stripCommentsAndWhitespace(code: string, language: string): string {
  if (!code) return '';
  let cleaned = code;
  const lang = (language || '').toLowerCase().trim();

  if (lang === 'python' || lang === 'py') {
    // Remove Python comments # and docstrings
    cleaned = cleaned.replace(/'''[\s\S]*?'''|"""[\s\S]*?"""/g, '');
    cleaned = cleaned.replace(/#.*$/gm, '');
  } else if (lang === 'sql' || lang === 'sqlite') {
    // Remove SQL comments -- and /* */
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    cleaned = cleaned.replace(/--.*$/gm, '');
  } else if (lang === 'html' || lang === 'html5') {
    // Remove HTML comments <!-- -->
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  } else if (lang === 'css' || lang === 'css3') {
    // Remove CSS comments /* */
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  } else {
    // JS / Default
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    cleaned = cleaned.replace(/\/\/.*$/gm, '');
  }

  return cleaned.trim();
}

export interface ChallengeValidationResult {
  isValid: boolean;
  message: LocalizedString;
  expectedOutput?: string;
  actualOutput?: string;
}

/**
 * Normalizes text output for fair and accurate comparison
 */
function normalizeOutput(output: string): string {
  if (!output) return '';
  return output
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
}

/**
 * Validates whether the user's submitted solution satisfies the challenge requirements.
 * Will NEVER mark a challenge as completed on empty code, blank output, or failed tests.
 */
export async function validateChallengeSolution(
  userCode: string,
  userResult: CodeExecutionResult,
  challenge: ChallengeSpec,
  language: string
): Promise<ChallengeValidationResult> {
  // 1. Check for empty or comments-only code
  const strippedUserCode = stripCommentsAndWhitespace(userCode, language);
  if (!strippedUserCode) {
    return {
      isValid: false,
      message: {
        en: 'Please write your solution before running the code.',
        vi: 'Vui lòng viết lời giải trước khi chạy code.',
      },
    };
  }

  // 2. Check if code is unmodified starter template (when starter is distinct from solution)
  const strippedStarter = stripCommentsAndWhitespace(challenge.starterCode || '', language);
  const strippedSolution = stripCommentsAndWhitespace(challenge.solutionCode || '', language);
  if (strippedStarter && strippedUserCode === strippedStarter && strippedStarter !== strippedSolution) {
    return {
      isValid: false,
      message: {
        en: 'Please write your solution before running the code.',
        vi: 'Vui lòng viết lời giải trước khi chạy code.',
      },
    };
  }

  // 3. Check for runtime execution errors
  if (!userResult.isSuccess || userResult.error) {
    return {
      isValid: false,
      message: {
        en: 'Execution error. Please resolve the issue and try again.',
        vi: 'Mã gặp lỗi khi thực thi. Vui lòng sửa lỗi và thử lại.',
      },
      actualOutput: userResult.error || userResult.output,
    };
  }

  // 4. Check for "[Code executed with no output]" when challenge expects output
  const normalizedUserOutput = normalizeOutput(userResult.output);
  const isNoOutput = !normalizedUserOutput || 
    normalizedUserOutput === '[Code executed with no output]' || 
    normalizedUserOutput === '[Code executed with no console output]';

  // 5. Execute canonical solution code to get the expected output
  let expectedOutput = '';
  try {
    const solutionResult = await executeCode(challenge.solutionCode, language);
    if (solutionResult.isSuccess) {
      expectedOutput = normalizeOutput(solutionResult.output);
    }
  } catch (err) {
    console.warn('Failed executing canonical solution code:', err);
  }

  // If canonical solution produces output, but user code produces no output
  if (expectedOutput && expectedOutput !== '[Code executed with no output]' && isNoOutput) {
    return {
      isValid: false,
      message: {
        en: 'Code executed with no output. Please ensure your code calculates and outputs the required result.',
        vi: 'Mã đã chạy nhưng không có dữ liệu đầu ra. Vui lòng đảm bảo mã tính toán và in kết quả theo yêu cầu.',
      },
      expectedOutput,
      actualOutput: userResult.output,
    };
  }

  // 6. Compare actual output with expected output
  if (expectedOutput && expectedOutput !== '[Code executed with no output]') {
    // Exact or normalized match
    if (normalizedUserOutput === expectedOutput) {
      return {
        isValid: true,
        message: {
          en: 'Challenge Passed! Your solution matches the expected output perfectly.',
          vi: 'Vượt qua thử thách! Lời giải của bạn khớp hoàn hảo với kết quả yêu cầu.',
        },
        expectedOutput,
        actualOutput: normalizedUserOutput,
      };
    }

    // Check if user output contains expected output (e.g. formatted with extra label)
    if (normalizedUserOutput.includes(expectedOutput)) {
      return {
        isValid: true,
        message: {
          en: 'Challenge Passed! All requirements satisfied.',
          vi: 'Vượt qua thử thách! Tất cả yêu cầu đã được đáp ứng.',
        },
        expectedOutput,
        actualOutput: normalizedUserOutput,
      };
    }

    // Numeric tolerance / substring match for numbers
    const cleanNumbers = (str: string) => (str.match(/\d+(\.\d+)?/g) || []).join(' ');
    const expectedNums = cleanNumbers(expectedOutput);
    const userNums = cleanNumbers(normalizedUserOutput);
    if (expectedNums && expectedNums === userNums) {
      return {
        isValid: true,
        message: {
          en: 'Challenge Passed! Numerical output matches expected values.',
          vi: 'Vượt qua thử thách! Giá trị số đầu ra khớp với yêu cầu đề bài.',
        },
        expectedOutput,
        actualOutput: normalizedUserOutput,
      };
    }

    // Output mismatch
    return {
      isValid: false,
      message: {
        en: 'Output does not match the expected result. Check your logic and calculations.',
        vi: 'Kết quả đầu ra chưa khớp với đáp án yêu cầu. Vui lòng kiểm tra lại logic và phép tính.',
      },
      expectedOutput,
      actualOutput: normalizedUserOutput,
    };
  }

  // 7. For HTML / CSS / Markup validation where output is rendered preview
  if (language === 'html' || language === 'css') {
    // Check if user wrote meaningful markup
    if (strippedUserCode.length >= 15) {
      return {
        isValid: true,
        message: {
          en: 'Challenge Passed! Markup rendered successfully.',
          vi: 'Vượt qua thử thách! Cấu trúc giao diện đã hiển thị thành công.',
        },
        actualOutput: userResult.output,
      };
    }
  }

  // 8. Default fallback when execution succeeded with meaningful non-empty output
  if (!isNoOutput && userResult.isSuccess) {
    return {
      isValid: true,
      message: {
        en: 'Challenge Passed! Code executed successfully.',
        vi: 'Vượt qua thử thách! Mã nguồn đã thực thi thành công.',
      },
      actualOutput: normalizedUserOutput,
    };
  }

  return {
    isValid: false,
    message: {
      en: 'Please write your solution before running the code.',
      vi: 'Vui lòng viết lời giải trước khi chạy code.',
    },
  };
}
