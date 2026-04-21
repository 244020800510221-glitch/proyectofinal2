'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { BookOpen, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function Navbar(): React.ReactElement {
  const usuario = useAuthStore((s) => s.usuarioActual);

  return (
    <header className="flex items-center justify-between rounded-xl border border-guinda/10 bg-surface px-4 py-3 shadow-sm dark:border-dorado/15">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-guinda" />
        <div>
          <p className="text-lg font-bold text-guinda">CECYTECA</p>
          <p className="text-xs text-dorado dark:text-dorado/90">Cada página impulsa tu futuro en CECYTECA</p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <ThemeToggle />
        <span className="hidden max-w-[200px] truncate text-sm text-guinda dark:text-texto md:block">{usuario?.nombre}</span>
        <Link href="/cerrar-sesion" className="rounded-md p-2 text-guinda hover:bg-guinda/10 dark:text-dorado" aria-label="Cerrar sesión">
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}


