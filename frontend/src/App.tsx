import { useState, useEffect } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { ProblemPanel } from './components/ProblemPanel';
import { TestcasePanel } from './components/TestcasePanel';
import { Header } from './components/Header';
import { AssessmentHeader } from './components/AssessmentHeader';
import { AssessmentStart } from './components/AssessmentStart';
import { AssessmentResults } from './components/AssessmentResults';
import { useTheme, type Theme } from './hooks/useTheme';
import { useProblems } from './hooks/useProblems';
import { useAssessment, type AssessmentVersion } from './hooks/useAssessment';
import { useResizablePanels } from './hooks/useResizablePanels';
import type { Problem, ExecutionResult } from './types';

type Mode = 'practice' | 'assessment';

function App() {
  const { theme, setTheme } = useTheme();
  const { problems, currentProblem, setCurrentProblem } = useProblems();
  const {
    assessment,
    assessmentVersion,
    isActive: isAssessmentActive,
    startAssessment,
    submitProblem,
    setCurrentProblemIndex,
    completeAssessment,
    resetAssessment,
  } = useAssessment();
  
  const {
    leftWidth,
    centerWidth,
    rightWidth,
    containerRef,
    handleMouseDown,
  } = useResizablePanels({
    leftMinWidth: 200,
    centerMinWidth: 300,
    rightMinWidth: 200,
    initialLeftWidth: 25,
    initialCenterWidth: 50,
    initialRightWidth: 25,
  });

  const [mode, setMode] = useState<Mode>('practice');
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<'python' | 'javascript'>('python');
  const [customInput, setCustomInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'custom' | 'testcases' | 'output' | 'results'>('custom');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [submissionResults, setSubmissionResults] = useState<any>(null);

  // Assessment problems from selected version
  const assessmentProblems = assessmentVersion?.problems || [];
  const currentAssessmentProblem =
    assessment && assessmentProblems[assessment.currentProblemIndex];

  // Load saved code from localStorage
  useEffect(() => {
    const problem = mode === 'assessment' ? currentAssessmentProblem : currentProblem;
    if (!problem) return;

    const key = mode === 'assessment' 
      ? `assessment-code-${problem.id}-${language}`
      : `code-${problem.id}-${language}`;
    
    const savedCode = localStorage.getItem(key);
    if (savedCode) {
      setCode(savedCode);
    } else if (problem.starterCode) {
      setCode(problem.starterCode[language] || '');
    }
  }, [currentProblem, currentAssessmentProblem, language, mode]);

  // Save code to localStorage
  useEffect(() => {
    const problem = mode === 'assessment' ? currentAssessmentProblem : currentProblem;
    if (!code || !problem) return;

    const key = mode === 'assessment'
      ? `assessment-code-${problem.id}-${language}`
      : `code-${problem.id}-${language}`;
    
    localStorage.setItem(key, code);
  }, [code, currentProblem, currentAssessmentProblem, language, mode]);

  // Check if assessment time expired
  useEffect(() => {
    if (assessment && assessment.timeRemaining <= 0 && !assessment.completed) {
      completeAssessment();
    }
  }, [assessment, completeAssessment]);

  const handleRun = async () => {
    const problem = mode === 'assessment' ? currentAssessmentProblem : currentProblem;
    if (!problem) return;

    setIsRunning(true);
    setActiveTab('output');
    setOutput('Running...');

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          customInput: customInput || undefined,
        }),
      });

      const result = await response.json();
      setExecutionResult(result);

      let displayOutput = '';
      if (result.stderr && result.stderr.trim()) {
        displayOutput = result.stderr;
      } else if (result.stdout && result.stdout.trim()) {
        displayOutput = result.stdout;
      } else if (result.stderr) {
        displayOutput = result.stderr;
      } else if (result.stdout) {
        displayOutput = result.stdout;
      } else {
        displayOutput = 'No output produced. Check your code for errors.';
      }

      setOutput(displayOutput);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    const problem = mode === 'assessment' ? currentAssessmentProblem : currentProblem;
    if (!problem) return;

    setIsRunning(true);
    setActiveTab('results');
    setOutput('Submitting...');

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          testcases: problem.testcases,
        }),
      });

      const result = await response.json();
      setExecutionResult(result);
      setSubmissionResults(result);

      const passed = result.testResults?.filter((t: any) => t.passed).length || 0;
      const total = result.testResults?.length || 0;
      const score = total > 0 ? Math.round((passed / total) * 100) : 0;

      setOutput(`Submission complete!\nPassed: ${passed}/${total}\nScore: ${score}%`);

      // In assessment mode, save the submission
      if (mode === 'assessment' && assessment) {
        submitProblem(problem.id, result);
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    const problem = mode === 'assessment' ? currentAssessmentProblem : currentProblem;
    if (problem?.starterCode) {
      setCode(problem.starterCode[language] || '');
    } else {
      setCode('');
    }
  };

  const handleLanguageChange = (newLanguage: 'python' | 'javascript') => {
    setLanguage(newLanguage);
    const problem = mode === 'assessment' ? currentAssessmentProblem : currentProblem;
    if (!problem) return;

    const key = mode === 'assessment'
      ? `assessment-code-${problem.id}-${newLanguage}`
      : `code-${problem.id}-${newLanguage}`;
    
    const savedCode = localStorage.getItem(key);
    if (savedCode) {
      setCode(savedCode);
    } else if (problem.starterCode) {
      setCode(problem.starterCode[newLanguage] || '');
    }
  };

  const handleStartAssessment = (version: AssessmentVersion) => {
    startAssessment(version);
    setMode('assessment');
    if (version.problems.length > 0) {
      // Set the first problem from the version
      const firstProblem = version.problems[0];
      setCurrentProblem(firstProblem);
    }
  };

  const handleAssessmentProblemChange = (index: number) => {
    if (assessment) {
      setCurrentProblemIndex(index);
      setCurrentProblem(assessmentProblems[index]);
    }
  };

  const handleCompleteAssessment = () => {
    if (assessment) {
      completeAssessment();
    }
  };

  const handleModeSwitch = (newMode: Mode) => {
    if (newMode === 'practice') {
      setMode('practice');
      if (problems.length > 0 && !currentProblem) {
        setCurrentProblem(problems[0]);
      }
    } else {
      if (!assessment) {
        // Show start screen
        setMode('assessment');
      } else {
        setMode('assessment');
      }
    }
  };

  const getBackgroundClass = () => {
    if (theme.startsWith('catppuccin-')) {
      return `${theme} dark`;
    }
    return theme === 'dark' ? 'dark' : '';
  };

  // Show assessment start screen
  if (mode === 'assessment' && !assessment) {
    return (
      <div
        className={`min-h-screen ${getBackgroundClass()}`}
        style={
          theme.startsWith('catppuccin-')
            ? {
                backgroundColor: 'var(--ctp-base)',
                color: 'var(--ctp-text)',
              }
            : {}
        }
      >
        <AssessmentStart onStart={handleStartAssessment} theme={theme} />
      </div>
    );
  }

  // Show assessment results
  if (mode === 'assessment' && assessment?.completed) {
    return (
      <div
        className={`min-h-screen ${getBackgroundClass()}`}
        style={
          theme.startsWith('catppuccin-')
            ? {
                backgroundColor: 'var(--ctp-base)',
                color: 'var(--ctp-text)',
              }
            : {}
        }
      >
        <AssessmentResults
          assessment={assessment}
          problems={assessmentProblems}
          theme={theme}
          onReset={() => {
            resetAssessment();
            setMode('practice');
          }}
        />
      </div>
    );
  }

  // Show main interface (practice or assessment)
  const displayProblem = mode === 'assessment' ? currentAssessmentProblem : currentProblem;

  return (
    <div
      className={`min-h-screen ${getBackgroundClass()}`}
      style={
        theme.startsWith('catppuccin-')
          ? {
              backgroundColor: 'var(--ctp-base)',
              color: 'var(--ctp-text)',
            }
          : {}
      }
    >
      {mode === 'assessment' && assessment ? (
        <AssessmentHeader
          assessment={assessment}
          problems={assessmentProblems}
          currentProblemIndex={assessment.currentProblemIndex}
          onProblemChange={handleAssessmentProblemChange}
          theme={theme}
        />
      ) : (
        <Header
          problems={problems}
          currentProblem={currentProblem}
          onProblemChange={setCurrentProblem}
          theme={theme}
          onThemeChange={setTheme}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {/* Mode switcher */}
      <div className="flex justify-center gap-2 p-2 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <button
          onClick={() => handleModeSwitch('practice')}
          className={`px-4 py-1 rounded text-sm ${
            mode === 'practice'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Practice Mode
        </button>
        <button
          onClick={() => handleModeSwitch('assessment')}
          className={`px-4 py-1 rounded text-sm ${
            mode === 'assessment'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Assessment Mode
        </button>
        {mode === 'assessment' && assessment && (
          <button
            onClick={handleCompleteAssessment}
            className="px-4 py-1 rounded text-sm bg-red-600 text-white hover:bg-red-700"
          >
            Complete Assessment
          </button>
        )}
      </div>

      <div 
        ref={containerRef}
        className="flex h-[calc(100vh-112px)] relative"
      >
        {/* Left Panel - Problem Description */}
        <div 
          className="border-r border-gray-300 dark:border-gray-700 overflow-y-auto"
          style={{ width: `${leftWidth}%` }}
        >
          <ProblemPanel problem={displayProblem} />
        </div>

        {/* Left Resizer */}
        <div
          className="w-1 bg-gray-300 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 cursor-col-resize transition-colors relative z-10"
          onMouseDown={(e) => handleMouseDown('left', e)}
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>

        {/* Center Panel - Code Editor */}
        <div 
          className="border-r border-gray-300 dark:border-gray-700 flex flex-col"
          style={{ width: `${centerWidth}%` }}
        >
          <CodeEditor
            code={code}
            language={language}
            onChange={setCode}
            onRun={handleRun}
            onSubmit={handleSubmit}
            onReset={handleReset}
            isRunning={isRunning}
            theme={theme}
          />
        </div>

        {/* Right Resizer */}
        <div
          className="w-1 bg-gray-300 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 cursor-col-resize transition-colors relative z-10"
          onMouseDown={(e) => handleMouseDown('right', e)}
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>

        {/* Right Panel - Testcases & Output */}
        <div 
          className="overflow-y-auto"
          style={{ width: `${rightWidth}%` }}
        >
          <TestcasePanel
            problem={displayProblem}
            customInput={customInput}
            onCustomInputChange={setCustomInput}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            output={output}
            executionResult={executionResult}
            submissionResults={submissionResults}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
