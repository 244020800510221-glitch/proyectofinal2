'use client';

import Link from 'next/link';
import { BookOpen, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function Navbar(): React.ReactElement {
  const usuario = useAuthStore((s) => s.usuarioActual);

  return (
    <header className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-guinda" />
        <div>
          <p className="text-lg font-bold text-guinda">CECYTECA</p>
          <p className="text-xs text-dorado">Cada página impulsa tu futuro en CECYTECA</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-guinda md:block">{usuario?.nombre}</span>
        <Link href="/cerrar-sesion" className="rounded-md p-2 text-guinda hover:bg-guinda/10" aria-label="Cerrar sesión">
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}


