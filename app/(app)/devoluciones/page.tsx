'use client';

import { SalidaButton } from '@/components/layout/SalidaButton';
import { AlertMessage } from '@/components/ui/AlertMessage';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useLibroStore } from '@/store/libroStore';
import { usePrestamoStore } from '@/store/prestamoStore';
import { Devolucion } from '@/types';
import { BookMarked } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

interface DevolucionForm {
  prestamoId: string;
  estadoLibro: 'bueno' | 'regular' | 'danado' | '';
}

export default function DevolucionesPage(): React.ReactElement {
  const router = useRouter();
  const usuario = useAuthStore((s) => s.usuarioActual);
  const updateUsuario = useAuthStore((s) => s.updateUsuario);
  const prestamos = usePrestamoStore((s) => s.prestamos);
  const devolverPrestamo = usePrestamoStore((s) => s.devolverPrestamo);
  const actualizarDisponibilidad = useLibroStore((s) => s.actualizarDisponibilidad);
  const [alert, setAlert] = useState<{ type: 'error' | 'success' | 'warning'; message: string } | null>(null);

  const activos = useMemo(() => prestamos.filter((p) => p.matricula === usuario?.matricula && p.estado === 'activo'), [prestamos, usuario?.matricula]);
  const { register, handleSubmit, watch } = useForm<DevolucionForm>();

  const onSubmit = (data: DevolucionForm): void => {
    if (!data.prestamoId || !data.estadoLibro || !usuario) {
      setAlert({ type: 'warning', message: '⚠ Revise correctamente los campos y corríjalos' });
      return;
    }
    const prestamo = activos.find((p) => p.id === data.prestamoId);
    if (!prestamo) {
      setAlert({ type: 'error', message: '⚠ Revise correctamente los campos y corríjalos' });
      return;
    }

    const devolucion: Devolucion = {
      id: crypto.randomUUID(),
      libroId: prestamo.libroId,
      libroTitulo: prestamo.libroTitulo,
      nombre: usuario.nombre,
      matricula: usuario.matricula,
      gradoGrupo: `${usuario.grado}${usuario.grupo}`,
      fechaDevolucion: new Date().toLocaleDateString('es-MX'),
      estadoLibro: data.estadoLibro
    };

    devolverPrestamo(prestamo.id, devolucion);
    actualizarDisponibilidad(prestamo.libroId, 'disponible');
    updateUsuario({ ...usuario, prestamosActivos: Math.max(0, usuario.prestamosActivos - 1) });
    setAlert({ type: 'success', message: 'Libro devuelto correctamente' });
  };

  return (
    <section className="space-y-4 rounded-xl border border-guinda/10 bg-surface p-6 dark:border-dorado/15">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-guinda"><BookMarked className="h-6 w-6" /> Devoluciones</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <select className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" {...register('prestamoId')}>
          <option value="">Libro</option>
          {activos.map((p) => <option key={p.id} value={p.id}>{p.libroTitulo}</option>)}
        </select>
        <input readOnly value={`Nombre: ${usuario?.nombre ?? ''}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
        <input readOnly value={`Matrícula: ${usuario?.matricula ?? ''}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
        <input readOnly value={`Grado y Grupo: ${usuario ? `${usuario.grado}${usuario.grupo}` : ''}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
        <input readOnly value={`Fecha de devolución: ${new Date().toLocaleDateString('es-MX')}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
        <select className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" {...register('estadoLibro')}>
          <option value="">Estado del libro</option>
          <option value="bueno">Bueno</option>
          <option value="regular">Regular</option>
          <option value="danado">Dañado</option>
        </select>
        <Button type="submit">Devolver libro</Button>
      </form>
      {alert ? <AlertMessage type={alert.type} message={alert.message} /> : null}
      {watch('prestamoId') ? <AlertMessage type="success" message="Campos listos para devolución" /> : null}

      <div className="flex flex-wrap gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={() => router.push('/menu')}>ir al menú</Button>
        <SalidaButton />
      </div>
    </section>
  );
}