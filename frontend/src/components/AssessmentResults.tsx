import type { AssessmentState, Problem } from '../types';
import type { Theme } from '../hooks/useTheme';

interface AssessmentResultsProps {
  assessment: AssessmentState;
  problems: Problem[];
  theme: Theme;
  onReset: () => void;
}

export function AssessmentResults({
  assessment,
  problems,
  theme,
  onReset,
}: AssessmentResultsProps) {
  const totalScore = Math.round(
    assessment.problemScores.reduce((sum, score) => sum + score, 0) /
      assessment.problemScores.length
  );

  const endTime = assessment.endTime || Date.now();
  const timeSpent = endTime - assessment.startTime;
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div
        className="max-w-3xl w-full p-8 rounded-lg shadow-lg"
        style={
          theme.startsWith('catppuccin-')
            ? {
                backgroundColor: 'var(--ctp-surface0)',
                color: 'var(--ctp-text)',
              }
            : {
                backgroundColor: 'white',
              }
        }
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Assessment Complete</h1>

        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-2">{totalScore}</div>
            <div className="text-xl text-gray-600 dark:text-gray-400">Total Score</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded bg-gray-100 dark:bg-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">Time Spent</div>
              <div className="text-xl font-semibold">{formatTime(timeSpent)}</div>
            </div>
            <div className="p-4 rounded bg-gray-100 dark:bg-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">Problems Completed</div>
              <div className="text-xl font-semibold">
                {assessment.problemScores.filter((s) => s > 0).length} / 4
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Problem Scores</h2>
          <div className="space-y-3">
            {problems.map((problem, index) => {
              const score = assessment.problemScores[index] || 0;
              const passed = score === 100;
              return (
                <div
                  key={problem.id}
                  className="p-4 rounded border flex items-center justify-between"
                  style={
                    theme.startsWith('catppuccin-')
                      ? {
                          backgroundColor: 'var(--ctp-surface1)',
                          borderColor: 'var(--ctp-surface2)',
                        }
                      : {}
                  }
                >
                  <div>
                    <div className="font-semibold">{problem.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Q{index + 1} {problem.difficulty && `(${problem.difficulty})`}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`px-4 py-2 rounded font-semibold ${
                        passed
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {score}%
                    </div>
                    {passed && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

