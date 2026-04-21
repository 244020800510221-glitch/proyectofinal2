'use client';

import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CerrarSesionPage(): React.ReactElement {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => router.push('/login'), 3000);
    return () => clearTimeout(timer);
  }, [logout, router]);

  return (
    <section className="mx-auto mt-20 max-w-md rounded-xl border border-guinda/10 bg-surface p-6 text-center shadow dark:border-dorado/15">
      <div className="mb-4 flex justify-end">
        <ThemeToggle />
      </div>
      <LogOut className="mx-auto h-10 w-10 text-guinda" />
      <h1 className="mt-3 text-2xl font-bold text-guinda">Cerrar sesión</h1>
      <p className="mt-2 text-sm">Gracias por usar nuestra página. Por favor vuelva pronto</p>
      <Button className="mt-5" onClick={() => router.push('/login')}>Volver al inicio</Button>
    </section>
  );
}


