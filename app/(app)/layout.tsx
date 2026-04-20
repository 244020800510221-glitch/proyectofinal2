'use client';

import { BottomNav } from '@/components/layout/BottomNav';
import { Navbar } from '@/components/layout/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  const usuario = useAuthStore((s) => s.usuarioActual);
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      router.replace('/login');
    }
  }, [usuario, router]);

  return (
    <div className="mx-auto min-h-screen max-w-6xl p-4 pb-20 md:pb-6">
      <Navbar />
      <main className="mt-4">{children}</main>
      <BottomNav />
    </div>
  );
}


