import type { Theme } from '../hooks/useTheme';

interface AssessmentStartProps {
  onStart: () => void;
  theme: Theme;
}

export function AssessmentStart({ onStart, theme }: AssessmentStartProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div
        className="max-w-2xl w-full p-8 rounded-lg shadow-lg"
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
        <h1 className="text-3xl font-bold mb-6 text-center">Coding Assessment</h1>
        
        <div className="space-y-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>You will have 70 minutes to complete 4 coding problems</li>
              <li>Problem difficulties: Q1 (Easy), Q2 (Easy-Medium), Q3 (Medium), Q4 (Medium-Hard)</li>
              <li>There are no breaks - the timer runs continuously</li>
              <li>The timer does not stop even if your connection flickers</li>
              <li>Each problem has multiple testcases that must pass</li>
              <li>You can switch between problems at any time</li>
              <li>Your progress is automatically saved</li>
              <li>Once you submit a problem, you can still modify your solution</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Scoring</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Each problem is worth 100 points</li>
              <li>Points are awarded based on testcases passed</li>
              <li>Your final score is the average of all problem scores</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onStart}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
            style={
              theme.startsWith('catppuccin-')
                ? {
                    backgroundColor: 'var(--ctp-blue)',
                    color: 'var(--ctp-base)',
                  }
                : {}
            }
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

