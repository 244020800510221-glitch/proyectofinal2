'use client';

import { SalidaButton } from '@/components/layout/SalidaButton';
import { AlertMessage } from '@/components/ui/AlertMessage';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useAuthStore } from '@/store/authStore';
import { useLibroStore } from '@/store/libroStore';
import { useReservaStore } from '@/store/reservaStore';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const fieldClass =
  'rounded-lg border border-guinda/20 bg-surface px-3 py-2 text-texto dark:border-dorado/25';

interface SearchForm {
  titulo: string;
  autor: string;
  categoria: string;
  anio: string;
  libroId: string;
  soloDisponibles: boolean;
}

export default function BuscarLibrosPage(): React.ReactElement {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [msgReserva, setMsgReserva] = useState<string | null>(null);
  const usuario = useAuthStore((s) => s.usuarioActual);
  const libros = useLibroStore((s) => s.libros);
  const seleccionarLibro = useLibroStore((s) => s.seleccionarLibro);
  const agregarReserva = useReservaStore((s) => s.agregarReserva);
  const posicionDeUsuario = useReservaStore((s) => s.posicionDeUsuario);
  const { register, watch } = useForm<SearchForm>({
    defaultValues: { titulo: '', autor: '', categoria: '', anio: '', libroId: '', soloDisponibles: false }
  });
  const values = watch();

  const resultados = useMemo(
    () =>
      libros.filter(
        (l) =>
          l.titulo.toLowerCase().includes(values.titulo.toLowerCase()) &&
          (values.autor ? l.autor === values.autor : true) &&
          (values.categoria ? l.genero === values.categoria : true) &&
          (values.anio ? String(l.anio) === values.anio : true) &&
          (values.soloDisponibles ? l.disponibilidad === 'disponible' : true)
      ),
    [libros, values]
  );

  const hasFilters = Boolean(values.titulo || values.autor || values.categoria || values.anio || values.soloDisponibles);

  const libroSeleccionado = resultados.find((l) => l.id === values.libroId);
  const miPosicionEnCola =
    libroSeleccionado && usuario ? posicionDeUsuario(libroSeleccionado.id, usuario.matricula) : null;

  const reservarLugar = (): void => {
    setMsgReserva(null);
    if (!usuario || !libroSeleccionado) {
      setMsgReserva('Inicia sesión y elige un libro para reservar.');
      return;
    }
    if (libroSeleccionado.disponibilidad !== 'prestado') {
      setMsgReserva('La reserva solo aplica cuando el libro está prestado.');
      return;
    }
    const r = agregarReserva({
      libroId: libroSeleccionado.id,
      libroTitulo: libroSeleccionado.titulo,
      usuarioId: usuario.id,
      matricula: usuario.matricula,
      nombre: usuario.nombre
    });
    if (r.ok) {
      setMsgReserva(`Te agregamos a la lista de espera. Tu lugar: ${r.posicion}.`);
    } else {
      setMsgReserva(r.mensaje);
    }
  };

  const irAPrestamos = (): void => {
    const selected = resultados.find((l) => l.id === values.libroId);
    if (selected && selected.disponibilidad === 'disponible') {
      seleccionarLibro(selected);
      router.push('/prestamos');
    }
  };

  return (
    <section className="space-y-4 rounded-xl border border-guinda/10 bg-surface p-6 dark:border-dorado/15">
      <h1 className="text-2xl font-bold text-guinda dark:text-dorado">Buscar libros</h1>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-guinda/70 dark:text-dorado/70" />
        <input
          className={`w-full py-2 pl-9 pr-3 ${fieldClass}`}
          placeholder="ingrese el título del libro"
          {...register('titulo')}
        />
      </div>
      <p className="font-semibold text-texto">filtros:</p>
      <div className="grid gap-3 md:grid-cols-3">
        <select className={fieldClass} {...register('autor')}>
          <option value="">autor ▽</option>
          {[...new Set(libros.map((l) => l.autor))].map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <select className={fieldClass} {...register('categoria')}>
          <option value="">categoría ▽</option>
          {[...new Set(libros.map((l) => l.genero))].map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <select className={fieldClass} {...register('anio')}>
          <option value="">año ▽</option>
          {[...new Set(libros.map((l) => String(l.anio)))].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-texto">
        <input type="checkbox" className="h-4 w-4 rounded border-guinda text-guinda focus:ring-guinda dark:border-dorado dark:text-dorado" {...register('soloDisponibles')} />
        Solo mostrar libros disponibles
      </label>

      {hasFilters && resultados.length === 0 ? <AlertMessage type="warning" message="⚠ No se encontró el libro deseado" /> : null}

      {resultados.length > 0 ? (
        <select className={`w-full ${fieldClass}`} {...register('libroId')}>
          <option value="">Seleccione el libro deseado ▽</option>
          {resultados.map((libro) => (
            <option key={libro.id} value={libro.id}>
              {libro.titulo} {libro.disponibilidad === 'prestado' ? '(prestado)' : libro.disponibilidad === 'no_disponible' ? '(no disponible)' : ''}
            </option>
          ))}
        </select>
      ) : null}

      {libroSeleccionado ? (
        <div className="rounded-lg border border-dorado/40 bg-crema p-3 text-sm dark:border-dorado/30">
          <p>
            <span className="font-semibold text-guinda dark:text-dorado">Estado:</span>{' '}
            {libroSeleccionado.disponibilidad === 'disponible'
              ? 'Disponible para préstamo'
              : libroSeleccionado.disponibilidad === 'prestado'
                ? 'Prestado — puedes unirte a la lista de espera'
                : 'No disponible en biblioteca'}
          </p>
          {libroSeleccionado.disponibilidad === 'prestado' && miPosicionEnCola ? (
            <p className="mt-1 text-exito">Ya estás en la lista de espera (lugar {miPosicionEnCola}).</p>
          ) : null}
        </div>
      ) : null}

      {msgReserva ? (
        <AlertMessage
          type={msgReserva.startsWith('Te agregamos') ? 'success' : msgReserva.startsWith('Ya estás') ? 'warning' : 'error'}
          message={msgReserva}
        />
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => router.refresh()}>
          buscar otra vez
        </Button>
        {resultados.length > 0 && libroSeleccionado?.disponibilidad === 'disponible' ? (
          <Button onClick={irAPrestamos}>ir a préstamos</Button>
        ) : null}
        {libroSeleccionado?.disponibilidad === 'prestado' && !miPosicionEnCola ? (
          <Button variant="secondary" onClick={reservarLugar}>
            Reservar (lista de espera)
          </Button>
        ) : null}
        <Button variant="ghost" onClick={() => setShowModal(true)}>
          regresar
        </Button>
        <SalidaButton />
      </div>

      <Modal open={showModal} title="¿Quiere terminar su proceso?" onConfirm={() => router.push('/menu')} onCancel={() => setShowModal(false)}>
        <AlertMessage type="warning" message="⚠ si regresas se podría perder tu información" />
      </Modal>
    </section>
  );
}