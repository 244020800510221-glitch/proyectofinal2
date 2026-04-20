'use client';

import { AlertMessage } from '@/components/ui/AlertMessage';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useLibroStore } from '@/store/libroStore';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

interface SearchForm {
  titulo: string;
  autor: string;
  categoria: string;
  anio: string;
  libroId: string;
}

export default function BuscarLibrosPage(): React.ReactElement {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const libros = useLibroStore((s) => s.libros);
  const seleccionarLibro = useLibroStore((s) => s.seleccionarLibro);
  const { register, watch } = useForm<SearchForm>({ defaultValues: { titulo: '', autor: '', categoria: '', anio: '', libroId: '' } });
  const values = watch();

  const resultados = useMemo(
    () =>
      libros.filter(
        (l) =>
          l.titulo.toLowerCase().includes(values.titulo.toLowerCase()) &&
          (values.autor ? l.autor === values.autor : true) &&
          (values.categoria ? l.genero === values.categoria : true) &&
          (values.anio ? String(l.anio) === values.anio : true)
      ),
    [libros, values]
  );

  const hasFilters = Boolean(values.titulo || values.autor || values.categoria || values.anio);

  return (
    <section className="space-y-4 rounded-xl bg-white p-6">
      <h1 className="text-2xl font-bold text-guinda">Buscar libros</h1>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-guinda/70" />
        <input className="w-full rounded-lg border border-guinda/20 py-2 pl-9 pr-3" placeholder="ingrese el título del libro" {...register('titulo')} />
      </div>
      <p className="font-semibold">filtros:</p>
      <div className="grid gap-3 md:grid-cols-3">
        <select className="rounded-lg border border-guinda/20 px-3 py-2" {...register('autor')}><option value="">autor ▽</option>{[...new Set(libros.map((l) => l.autor))].map((a) => <option key={a}>{a}</option>)}</select>
        <select className="rounded-lg border border-guinda/20 px-3 py-2" {...register('categoria')}><option value="">categoría ▽</option>{[...new Set(libros.map((l) => l.genero))].map((g) => <option key={g}>{g}</option>)}</select>
        <select className="rounded-lg border border-guinda/20 px-3 py-2" {...register('anio')}><option value="">año ▽</option>{[...new Set(libros.map((l) => String(l.anio)))].map((y) => <option key={y}>{y}</option>)}</select>
      </div>

      {hasFilters && resultados.length === 0 ? <AlertMessage type="warning" message="⚠ No se encontró el libro deseado" /> : null}

      {resultados.length > 0 ? (
        <select className="w-full rounded-lg border border-guinda/20 px-3 py-2" {...register('libroId')}>
          <option value="">Seleccione el libro deseado ▽</option>
          {resultados.map((libro) => <option key={libro.id} value={libro.id}>{libro.titulo}</option>)}
        </select>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => router.refresh()}>buscar otra vez</Button>
        {resultados.length > 0 ? <Button onClick={() => { const selected = resultados.find((l) => l.id === values.libroId); if (selected) { seleccionarLibro(selected); router.push('/prestamos'); } }}>ir a préstamos</Button> : null}
        <Button variant="ghost" onClick={() => setShowModal(true)}>regresar</Button>
      </div>

      <Modal open={showModal} title="¿Quiere terminar su proceso?" onConfirm={() => router.push('/menu')} onCancel={() => setShowModal(false)}>
        <AlertMessage type="warning" message="⚠ si regresas se podría perder tu información" />
      </Modal>
    </section>
  );
}