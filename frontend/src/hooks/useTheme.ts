import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'catppuccin-mocha' | 'catppuccin-macchiato' | 'catppuccin-frappe' | 'catppuccin-latte';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'catppuccin-mocha', 'catppuccin-macchiato', 'catppuccin-frappe', 'catppuccin-latte');
    
    // Add appropriate class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme.startsWith('catppuccin-')) {
      document.documentElement.classList.add(theme);
      // Catppuccin themes are dark except latte
      if (theme !== 'catppuccin-latte') {
        document.documentElement.classList.add('dark');
      }
    }
  }, [theme]);

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return { theme, setTheme: setThemeValue };
}


