import type { Problem } from '../types';

interface HeaderProps {
  problems: Problem[];
  currentProblem: Problem | null;
  onProblemChange: (problem: Problem | null) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  language: 'python' | 'javascript';
  onLanguageChange: (lang: 'python' | 'javascript') => void;
}

export function Header({
  problems,
  currentProblem,
  onProblemChange,
  theme,
  onThemeToggle,
  language,
  onLanguageChange
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Code Assessment Platform
        </h1>
        <select
          value={currentProblem?.id || ''}
          onChange={(e) => {
            const problem = problems.find(p => p.id === parseInt(e.target.value));
            onProblemChange(problem || null);
          }}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select Problem</option>
          {problems.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLanguageChange('python')}
            className={`px-3 py-1 rounded ${
              language === 'python'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => onLanguageChange('javascript')}
            className={`px-3 py-1 rounded ${
              language === 'javascript'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            JavaScript
          </button>
        </div>
        
        <button
          onClick={onThemeToggle}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}


