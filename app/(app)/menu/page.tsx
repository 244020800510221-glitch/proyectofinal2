import { SalidaButton } from '@/components/layout/SalidaButton';
import Link from 'next/link';
import { BookOpenCheck, ClipboardCheck, Search, UserRound, BarChart3 } from 'lucide-react';

const options = [
  { href: '/buscar-libros', icon: Search, label: 'Buscar libros' },
  { href: '/prestamos', icon: BookOpenCheck, label: 'Préstamos' },
  { href: '/devoluciones', icon: ClipboardCheck, label: 'Devoluciones' },
  { href: '/perfil', icon: UserRound, label: 'Usuario' },
  { href: '/reportes', icon: BarChart3, label: 'Reportes' }
];

export default function MenuPage(): React.ReactElement {
  return (
    <section className="rounded-xl bg-white p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-guinda">Menú</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {options.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="rounded-xl border border-guinda/20 p-4 text-center transition hover:bg-guinda hover:text-white">
            <Icon className="mx-auto h-10 w-10" />
            <p className="mt-2 text-sm font-semibold">{label}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <SalidaButton />
      </div>
    </section>
  );
}


