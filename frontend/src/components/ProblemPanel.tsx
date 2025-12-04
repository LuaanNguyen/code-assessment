import type { Problem } from '../types';

interface ProblemPanelProps {
  problem: Problem | null;
}

export function ProblemPanel({ problem }: ProblemPanelProps) {
  if (!problem) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400">
        Select a problem to get started
      </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {problem.title}
        </h2>
        {problem.difficulty && (
          <div className="mt-2">
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {problem.difficulty}
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Description
        </h3>
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {problem.description}
        </div>
      </div>

      {problem.examples && problem.examples.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Examples
          </h3>
          <div className="space-y-3">
            {problem.examples.map((example, idx) => (
              <div key={idx} className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <div className="mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Input:</span>
                  <code className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                    {example.input}
                  </code>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Output:</span>
                  <code className="ml-2 text-sm text-gray-900 dark:text-gray-100">
                    {example.output}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {problem.functionSignature && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Function Signature
          </h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <code className="text-sm text-gray-900 dark:text-gray-100">
              {problem.functionSignature}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}


