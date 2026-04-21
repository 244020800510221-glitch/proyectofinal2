'use client';

import { SalidaButton } from '@/components/layout/SalidaButton';
import { AlertMessage } from '@/components/ui/AlertMessage';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useLibroStore } from '@/store/libroStore';
import { usePrestamoStore } from '@/store/prestamoStore';
import { Prestamo } from '@/types';
import { addDays, formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PrestamosPage(): React.ReactElement {
  const router = useRouter();
  const usuario = useAuthStore((s) => s.usuarioActual);
  const updateUsuario = useAuthStore((s) => s.updateUsuario);
  const libro = useLibroStore((s) => s.libroSeleccionado);
  const actualizarDisponibilidad = useLibroStore((s) => s.actualizarDisponibilidad);
  const agregarPrestamo = usePrestamoStore((s) => s.agregarPrestamo);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'warning'; text: string } | null>(null);

  const fechaPrestamo = formatDate(new Date());
  const fechaEntrega = formatDate(addDays(new Date(), 15));

  const requestLoan = (): void => {
    if (!usuario || !libro) {
      setMessage({ type: 'error', text: '⚠ algo salió mal. Por favor regresa más tarde' });
      return;
    }
    if (usuario.prestamosActivos >= 3) {
      setMessage({ type: 'warning', text: 'Lo sentimos, no tiene permitido préstamos. Ya alcanzó el límite' });
      return;
    }
    if (libro.disponibilidad !== 'disponible') {
      setMessage({ type: 'warning', text: 'Este libro no está disponible para préstamo' });
      return;
    }

    const nuevoPrestamo: Prestamo = {
      id: crypto.randomUUID(),
      libroId: libro.id,
      libroTitulo: libro.titulo,
      usuarioNombre: usuario.nombre,
      matricula: usuario.matricula,
      gradoGrupo: `${usuario.grado}${usuario.grupo}`,
      fechaPrestamo,
      fechaEntrega,
      estado: 'activo'
    };

    agregarPrestamo(nuevoPrestamo);
    actualizarDisponibilidad(libro.id, 'prestado');
    updateUsuario({ ...usuario, prestamosActivos: usuario.prestamosActivos + 1 });
    setMessage({ type: 'success', text: 'Préstamo realizado con éxito' });
  };

  return (
    <section className="space-y-4 rounded-xl border border-guinda/10 bg-surface p-6 dark:border-dorado/15">
      <h1 className="text-2xl font-bold text-guinda">Préstamos</h1>
      <h2 className="text-lg font-semibold">Historial</h2>

      {libro ? (
        <div className="rounded-lg border border-guinda/20 bg-crema p-4">
          <p className="font-semibold text-guinda">{libro.titulo}</p>
          <p>Autor: {libro.autor}</p>
          <p>Editorial: {libro.editorial}</p>
          <p>Género: {libro.genero}</p>
          <p>Número de páginas: {libro.numeroPaginas}</p>
          <div className="mt-2">
            <Badge text={libro.disponibilidad} type={libro.disponibilidad === 'disponible' ? 'success' : libro.disponibilidad === 'prestado' ? 'danger' : 'neutral'} />
          </div>
        </div>
      ) : (
        <AlertMessage type="warning" message="⚠ algo salió mal. Por favor regresa más tarde" />
      )}

      <div className="grid gap-2 md:grid-cols-2">
        <input readOnly value={`Fecha de préstamo: ${fechaPrestamo}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
        <input readOnly value={`Fecha de entrega: ${fechaEntrega}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
        <input readOnly value={`Nombre: ${usuario?.nombre ?? ''}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
        <input readOnly value={`Matrícula: ${usuario?.matricula ?? ''}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
        <input readOnly value={`Grado y Grupo: ${usuario ? `${usuario.grado}${usuario.grupo}` : ''}`} className="rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25" />
      </div>

      {message ? <AlertMessage type={message.type} message={message.text} /> : null}

      <div className="flex flex-wrap gap-2">
        <Button onClick={requestLoan}>solicitar libro</Button>
        <Button variant="ghost" onClick={() => router.push('/menu')}>ir al menú</Button>
        <SalidaButton />
        {!libro ? <Button variant="secondary">verificar</Button> : null}
      </div>
    </section>
  );
}


