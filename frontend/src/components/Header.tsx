import type { Problem } from '../types';
import type { Theme } from '../hooks/useTheme';

interface HeaderProps {
  problems: Problem[];
  currentProblem: Problem | null;
  onProblemChange: (problem: Problem | null) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  language: 'python' | 'javascript';
  onLanguageChange: (lang: 'python' | 'javascript') => void;
}

export function Header({
  problems,
  currentProblem,
  onProblemChange,
  theme,
  onThemeChange,
  language,
  onLanguageChange
}: HeaderProps) {
  const getHeaderStyles = () => {
    if (theme.startsWith('catppuccin-')) {
      return {
        backgroundColor: 'var(--ctp-base)',
        borderColor: 'var(--ctp-surface0)',
        color: 'var(--ctp-text)'
      };
    }
    return {};
  };

  return (
    <header 
      className={`h-16 border-b bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 flex items-center justify-between px-4`}
      style={getHeaderStyles()}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white" style={theme.startsWith('catppuccin-') ? { color: 'var(--ctp-text)' } : {}}>
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
        
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value as Theme)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          style={theme.startsWith('catppuccin-') ? {
            backgroundColor: 'var(--ctp-surface0)',
            borderColor: 'var(--ctp-surface1)',
            color: 'var(--ctp-text)'
          } : {}}
          aria-label="Select theme"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="catppuccin-latte">Catppuccin Latte</option>
          <option value="catppuccin-frappe">Catppuccin Frappé</option>
          <option value="catppuccin-macchiato">Catppuccin Macchiato</option>
          <option value="catppuccin-mocha">Catppuccin Mocha</option>
        </select>
      </div>
    </header>
  );
}


