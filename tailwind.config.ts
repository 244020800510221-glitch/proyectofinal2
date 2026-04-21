import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        guinda: '#7B1C2E',
        dorado: '#C9A84C',
        crema: 'var(--color-crema)',
        fondo: 'var(--color-fondo)',
        surface: 'var(--color-surface)',
        texto: 'var(--color-texto)',
        exito: '#16A34A',
        error: '#DC2626',
        advertencia: '#D97706'
      }
    }
  },
  plugins: []
};

export default config;
