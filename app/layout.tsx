import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CECYTECA',
  description: 'Sistema de gestión de biblioteca escolar para CeCyTe Baja California'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}


