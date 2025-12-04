import { useState, useEffect } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { ProblemPanel } from './components/ProblemPanel';
import { TestcasePanel } from './components/TestcasePanel';
import { Header } from './components/Header';
import { useTheme, type Theme } from './hooks/useTheme';
import { useProblems } from './hooks/useProblems';
import type { Problem, ExecutionResult } from './types';

function App() {
  const { theme, setTheme } = useTheme();
  const { problems, currentProblem, setCurrentProblem } = useProblems();
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<'python' | 'javascript'>('python');
  const [customInput, setCustomInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'custom' | 'testcases' | 'output' | 'results'>('custom');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [submissionResults, setSubmissionResults] = useState<any>(null);

  // Load saved code from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem(`code-${currentProblem?.id}-${language}`);
    if (savedCode) {
      setCode(savedCode);
    } else if (currentProblem?.starterCode) {
      setCode(currentProblem.starterCode[language] || '');
    }
  }, [currentProblem, language]);

  // Save code to localStorage
  useEffect(() => {
    if (code && currentProblem) {
      localStorage.setItem(`code-${currentProblem.id}-${language}`, code);
    }
  }, [code, currentProblem, language]);

  const handleRun = async () => {
    if (!currentProblem) return;

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
          customInput: customInput || undefined
        })
      });

      const result = await response.json();
      setExecutionResult(result);
      
      // Combine stdout and stderr for display, prioritizing stderr for errors
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
    if (!currentProblem) return;

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
          testcases: currentProblem.testcases
        })
      });

      const result = await response.json();
      setExecutionResult(result);
      setSubmissionResults(result);

      // Calculate score
      const passed = result.testResults?.filter((t: any) => t.passed).length || 0;
      const total = result.testResults?.length || 0;
      const score = total > 0 ? Math.round((passed / total) * 100) : 0;

      setOutput(`Submission complete!\nPassed: ${passed}/${total}\nScore: ${score}%`);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (currentProblem?.starterCode) {
      setCode(currentProblem.starterCode[language] || '');
    } else {
      setCode('');
    }
  };

  const handleLanguageChange = (newLanguage: 'python' | 'javascript') => {
    setLanguage(newLanguage);
    const savedCode = localStorage.getItem(`code-${currentProblem?.id}-${newLanguage}`);
    if (savedCode) {
      setCode(savedCode);
    } else if (currentProblem?.starterCode) {
      setCode(currentProblem.starterCode[newLanguage] || '');
    }
  };

  const getBackgroundClass = () => {
    if (theme.startsWith('catppuccin-')) {
      return `${theme} dark`;
    }
    return theme === 'dark' ? 'dark' : '';
  };

  return (
    <div 
      className={`min-h-screen ${getBackgroundClass()}`}
      style={theme.startsWith('catppuccin-') ? { 
        backgroundColor: 'var(--ctp-base)',
        color: 'var(--ctp-text)'
      } : {}}
    >
      <Header 
        problems={problems}
        currentProblem={currentProblem}
        onProblemChange={setCurrentProblem}
        theme={theme}
        onThemeChange={setTheme}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/4 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
          <ProblemPanel problem={currentProblem} />
        </div>

        {/* Center Panel - Code Editor */}
        <div className="w-2/4 border-r border-gray-300 dark:border-gray-700 flex flex-col">
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

        {/* Right Panel - Testcases & Output */}
        <div className="w-1/4 overflow-y-auto">
          <TestcasePanel
            problem={currentProblem}
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

