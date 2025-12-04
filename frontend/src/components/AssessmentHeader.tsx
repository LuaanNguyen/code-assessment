import { Timer } from './Timer';
import type { Problem } from '../types';
import type { Theme } from '../hooks/useTheme';
import type { AssessmentState } from '../types';

interface AssessmentHeaderProps {
  assessment: AssessmentState;
  problems: Problem[];
  currentProblemIndex: number;
  onProblemChange: (index: number) => void;
  theme: Theme;
}

export function AssessmentHeader({
  assessment,
  problems,
  currentProblemIndex,
  onProblemChange,
  theme,
}: AssessmentHeaderProps) {
  return (
    <header
      className="h-16 border-b bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 flex items-center justify-between px-4"
      style={
        theme.startsWith('catppuccin-')
          ? {
              backgroundColor: 'var(--ctp-base)',
              borderColor: 'var(--ctp-surface0)',
            }
          : {}
      }
    >
      <div className="flex items-center gap-4">
        <h1
          className="text-xl font-bold text-gray-900 dark:text-white"
          style={theme.startsWith('catppuccin-') ? { color: 'var(--ctp-text)' } : {}}
        >
          Coding Assessment
        </h1>

        <div className="flex items-center gap-2">
            {problems.map((problem, index) => {
              const score = assessment.problemScores[index] || 0;
              const isCurrent = index === currentProblemIndex;
              const hasSubmission = assessment.problemSubmissions[problem.id] !== undefined;

              return (
                <button
                  key={problem.id}
                  onClick={() => onProblemChange(index)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : hasSubmission
                      ? score === 100
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  style={
                    theme.startsWith('catppuccin-') && isCurrent
                      ? {
                          backgroundColor: 'var(--ctp-blue)',
                          color: 'var(--ctp-base)',
                        }
                      : {}
                  }
                  title={`Q${index + 1}: ${problem.title}`}
                >
                  Q{index + 1}
                  {hasSubmission && (
                    <span className="ml-1">{score === 100 ? '✓' : '○'}</span>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Timer
          timeRemaining={assessment.timeRemaining}
          theme={theme}
        />
      </div>
    </header>
  );
}

