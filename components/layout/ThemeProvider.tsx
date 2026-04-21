'use client';

import { useThemeStore } from '@/store/themeStore';
import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  return <>{children}</>;
}
