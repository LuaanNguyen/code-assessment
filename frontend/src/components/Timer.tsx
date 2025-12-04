import { useEffect } from 'react';
import type { Theme } from '../hooks/useTheme';

interface TimerProps {
  timeRemaining: number;
  theme: Theme;
  onTimeExpired?: () => void;
}

export function Timer({ timeRemaining, theme, onTimeExpired }: TimerProps) {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 10 * 60 * 1000; // Less than 10 minutes
  const isExpired = timeRemaining <= 0;

  useEffect(() => {
    if (isExpired && onTimeExpired) {
      onTimeExpired();
    }
  }, [isExpired, onTimeExpired]);

  return (
    <div
      className={`px-4 py-2 rounded font-mono font-bold ${
        isExpired
          ? 'bg-red-600 text-white'
          : isLowTime
          ? 'bg-yellow-500 text-white'
          : 'bg-blue-600 text-white'
      }`}
      style={
        theme.startsWith('catppuccin-')
          ? {
              backgroundColor: isExpired
                ? 'var(--ctp-red)'
                : isLowTime
                ? 'var(--ctp-yellow)'
                : 'var(--ctp-blue)',
              color: 'var(--ctp-base)',
            }
          : {}
      }
    >
      {isExpired ? 'Time Expired' : formatTime(timeRemaining)}
    </div>
  );
}

