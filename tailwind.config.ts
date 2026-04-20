import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        guinda: '#7B1C2E',
        dorado: '#C9A84C',
        crema: '#F5F0E8',
        fondo: '#F9F6F1',
        texto: '#1A1A1A',
        exito: '#16A34A',
        error: '#DC2626',
        advertencia: '#D97706'
      }
    }
  },
  plugins: []
};

export default config;


