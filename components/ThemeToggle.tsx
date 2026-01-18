
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-2xl glass border border-white/20 dark:border-slate-800 shadow-xl transition-all active:scale-90"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon className="text-slate-600" size={24} />
      ) : (
        <Sun className="text-amber-400" size={24} />
      )}
    </button>
  );
};

export default ThemeToggle;
