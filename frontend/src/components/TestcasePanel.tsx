import type { Problem, ExecutionResult } from '../types';

interface TestcasePanelProps {
  problem: Problem | null;
  customInput: string;
  onCustomInputChange: (input: string) => void;
  activeTab: 'custom' | 'testcases' | 'output' | 'results';
  onTabChange: (tab: 'custom' | 'testcases' | 'output' | 'results') => void;
  output: string;
  executionResult: ExecutionResult | null;
  submissionResults: any;
  isRunning: boolean;
}

export function TestcasePanel({
  problem,
  customInput,
  onCustomInputChange,
  activeTab,
  onTabChange,
  output,
  executionResult,
  submissionResults,
  isRunning
}: TestcasePanelProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => onTabChange('custom')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'custom'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Custom Input
        </button>
        <button
          onClick={() => onTabChange('testcases')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'testcases'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Testcases
        </button>
        <button
          onClick={() => onTabChange('output')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'output'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Output
        </button>
        <button
          onClick={() => onTabChange('results')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'results'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Results
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'custom' && (
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Custom Input
            </label>
            <textarea
              value={customInput}
              onChange={(e) => onCustomInputChange(e.target.value)}
              placeholder="Enter custom input here..."
              className="w-full h-32 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        )}

        {activeTab === 'testcases' && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Testcases
            </h3>
            {problem?.testcases ? (
              <div className="space-y-3">
                {problem.testcases.map((testcase) => (
                  <div
                    key={testcase.id}
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded"
                  >
                    <div className="mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Testcase {testcase.id}:
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Input:</span>
                        <code className="ml-2 text-gray-900 dark:text-gray-100">
                          {testcase.input}
                        </code>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Expected:</span>
                        <code className="ml-2 text-gray-900 dark:text-gray-100">
                          {testcase.expected}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No testcases available</p>
            )}
          </div>
        )}

        {activeTab === 'output' && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Output
            </h3>
            {isRunning ? (
              <div className="text-gray-500 dark:text-gray-400">Running...</div>
            ) : (
              <div className={`bg-gray-900 p-3 rounded font-mono text-sm whitespace-pre-wrap min-h-[100px] ${
                executionResult?.stderr && executionResult.stderr.trim() 
                  ? 'text-red-400' 
                  : 'text-green-400'
              }`}>
                {output || 'No output yet'}
              </div>
            )}
            {executionResult && (
              <div className="mt-3 space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Execution time: {executionResult.executionTime}ms
                </div>
                {executionResult.stderr && executionResult.stderr.trim() && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    Execution failed with errors
                  </div>
                )}
                {!executionResult.stderr && executionResult.passed === false && (
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">
                    Execution completed but may have issues
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'results' && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Submission Results
            </h3>
            {isRunning ? (
              <div className="text-gray-500 dark:text-gray-400">Submitting...</div>
            ) : submissionResults ? (
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <div className="mb-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Status:
                    </span>
                    <span
                      className={`ml-2 ${
                        submissionResults.passed
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {submissionResults.passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                  {submissionResults.testResults && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Testcases:
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {submissionResults.testResults.filter((t: any) => t.passed).length} / {submissionResults.testResults.length} passed
                      </span>
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Execution time: {submissionResults.executionTime}ms
                  </div>
                </div>

                {submissionResults.testResults && (
                  <div className="space-y-2">
                    {submissionResults.testResults.map((result: any) => (
                      <div
                        key={result.id}
                        className={`p-3 rounded border ${
                          result.passed
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                            : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Testcase {result.id}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              result.passed
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {result.passed ? '✓ Passed' : '✗ Failed'}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Input:</span>
                            <code className="ml-2 text-gray-900 dark:text-gray-100">
                              {result.input}
                            </code>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Expected:</span>
                            <code className="ml-2 text-gray-900 dark:text-gray-100">
                              {result.expected}
                            </code>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Actual:</span>
                            <code className="ml-2 text-gray-900 dark:text-gray-100">
                              {result.actual}
                            </code>
                          </div>
                          {result.stderr && (
                            <div className="mt-1 text-red-600 dark:text-red-400">
                              <span className="text-gray-600 dark:text-gray-400">Error:</span>
                              <code className="ml-2">{result.stderr}</code>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">
                Submit your code to see results
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

