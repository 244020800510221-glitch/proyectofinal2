import { ThemeProvider } from '@/components/layout/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CECYTECA',
  description: 'Sistema de gestion de biblioteca escolar para CeCyTe Baja California'
};

const themeBootstrap = `(function(){try{var s=localStorage.getItem('cecyteca-theme');var t='light';if(s){var p=JSON.parse(s);if(p&&p.state&&p.state.theme){t=p.state.theme;}}var r=document.documentElement;if(t==='dark'){r.classList.add('dark');r.style.colorScheme='dark';}else{r.classList.remove('dark');r.style.colorScheme='light';}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
