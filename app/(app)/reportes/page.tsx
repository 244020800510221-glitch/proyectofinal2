'use client';

import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/store/authStore';
import { useLibroStore } from '@/store/libroStore';
import { usePrestamoStore } from '@/store/prestamoStore';

export default function ReportesPage(): React.ReactElement {
  const libros = useLibroStore((s) => s.libros);
  const prestamos = usePrestamoStore((s) => s.prestamos);
  const usuario = useAuthStore((s) => s.usuarioActual);

  const disponibles = libros.filter((l) => l.disponibilidad === 'disponible').length;
  const prestados = libros.filter((l) => l.disponibilidad === 'prestado').length;
  const prestamosUsuario = prestamos.filter((p) => p.matricula === usuario?.matricula);
  const activosUsuario = prestamosUsuario.filter((p) => p.estado === 'activo').length;

  return (
    <section className="space-y-4 rounded-xl bg-white p-6">
      <h1 className="text-2xl font-bold text-guinda">Reportes</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg bg-crema p-4"><p className="text-sm">Total de libros</p><p className="text-2xl font-bold text-guinda">{libros.length}</p></div>
        <div className="rounded-lg bg-crema p-4"><p className="text-sm">Disponibles vs prestados</p><p className="font-semibold">{disponibles} / {prestados}</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full bg-guinda" style={{ width: `${(prestados / Math.max(1, libros.length)) * 100}%` }} /></div></div>
        <div className="rounded-lg bg-crema p-4"><p className="text-sm">Préstamos activos del usuario</p><p className="text-2xl font-bold text-guinda">{activosUsuario}</p></div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Libro</th>
              <th className="p-2">Fecha préstamo</th>
              <th className="p-2">Fecha entrega</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {prestamosUsuario.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.libroTitulo}</td>
                <td className="p-2">{p.fechaPrestamo}</td>
                <td className="p-2">{p.fechaEntrega}</td>
                <td className="p-2">
                  <Badge text={p.estado} type={p.estado === 'devuelto' ? 'success' : p.estado === 'activo' ? 'warning' : 'danger'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


