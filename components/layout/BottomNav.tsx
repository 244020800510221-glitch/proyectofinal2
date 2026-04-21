'use client';

import Link from 'next/link';
import { BookOpenCheck, ClipboardList, Home, Search, UserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/buscar-libros', icon: Search, label: 'Buscar' },
  { href: '/prestamos', icon: BookOpenCheck, label: 'Préstamos' },
  { href: '/menu', icon: Home, label: 'Menú' },
  { href: '/devoluciones', icon: ClipboardList, label: 'Devoluciones' },
  { href: '/perfil', icon: UserRound, label: 'Perfil' }
];

export function BottomNav(): React.ReactElement {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-guinda/15 bg-surface dark:border-dorado/20 md:hidden">
      <ul className="grid grid-cols-5">
        {navItems.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link href={href} className={`flex flex-col items-center gap-1 py-2 text-xs ${pathname === href ? 'text-guinda dark:text-dorado' : 'text-gray-500 dark:text-gray-400'}`}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


