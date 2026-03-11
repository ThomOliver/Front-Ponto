'use client';

import { useUIStore } from '@/store/useUIStore';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="p-2 rounded-full bg-primary dark:bg-primary shadow-md hover:scale-105 transition"
    >
      {isDark ? (
        <SunIcon className="h-6 w-6 text-text dark:text-text" />
      ) : (
        <MoonIcon className="h-6 w-6 text-text dark:text-text" />
      )}
    </button>
  );
}
