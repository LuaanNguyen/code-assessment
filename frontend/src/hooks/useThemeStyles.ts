import type { Theme } from './useTheme';

export function useThemeStyles(theme: Theme) {
  const isCatppuccin = theme.startsWith('catppuccin-');

  const getStyles = (type: 'bg' | 'text' | 'border' | 'surface' = 'bg') => {
    if (!isCatppuccin) return {};
    
    switch (type) {
      case 'bg':
        return { backgroundColor: 'var(--ctp-base)' };
      case 'text':
        return { color: 'var(--ctp-text)' };
      case 'border':
        return { borderColor: 'var(--ctp-surface0)' };
      case 'surface':
        return { backgroundColor: 'var(--ctp-surface0)' };
      default:
        return {};
    }
  };

  const getSurfaceStyles = (level: 0 | 1 | 2 = 0) => {
    if (!isCatppuccin) return {};
    const varName = `--ctp-surface${level}`;
    return { backgroundColor: `var(${varName})` };
  };

  const getTextStyles = (level: 'text' | 'subtext1' | 'subtext0' = 'text') => {
    if (!isCatppuccin) return {};
    const varName = `--ctp-${level}`;
    return { color: `var(${varName})` };
  };

  const getAccentColor = (color: 'blue' | 'green' | 'red' | 'yellow' | 'mauve' = 'blue') => {
    if (!isCatppuccin) return {};
    return { color: `var(--ctp-${color})` };
  };

  return {
    isCatppuccin,
    getStyles,
    getSurfaceStyles,
    getTextStyles,
    getAccentColor,
  };
}

