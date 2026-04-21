'use client';

import { SalidaButton } from '@/components/layout/SalidaButton';
import { AlertMessage } from '@/components/ui/AlertMessage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface BuscarUsuarioForm {
  nombre: string;
  correo: string;
  matricula: string;
}

export default function PerfilPage(): React.ReactElement {
  const router = useRouter();
  const usuario = useAuthStore((s) => s.usuarioActual);
  const usuarios = useAuthStore((s) => s.usuarios);
  const [alert, setAlert] = useState<{ type: 'error' | 'success' | 'warning'; message: string } | null>({ type: 'success', message: 'Datos procesados correctamente' });
  const { register, handleSubmit, formState: { errors } } = useForm<BuscarUsuarioForm>();

  const onSubmit = (values: BuscarUsuarioForm): void => {
    const found = usuarios.find((u) => u.nombre.toLowerCase().includes(values.nombre.toLowerCase()) || u.correo.toLowerCase() === values.correo.toLowerCase() || u.matricula === values.matricula);
    if (!found) {
      setAlert({ type: 'warning', message: '⚠ El usuario no fue encontrado. Por favor verifique sus datos' });
      return;
    }
    setAlert({ type: 'success', message: 'Datos procesados correctamente' });
  };

  return (
    <section className="space-y-5 rounded-xl border border-guinda/10 bg-surface p-6 dark:border-dorado/15">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-guinda"><UserRound className="h-6 w-6" /> Perfil</h1>

      <div className="rounded-xl bg-crema p-4">
        <h2 className="mb-2 font-semibold">Datos</h2>
        <div className="grid gap-2">
          <Input readOnly value={usuario?.nombre ?? ''} />
          <Input readOnly value={usuario?.correo ?? ''} />
          <Input readOnly value={usuario?.matricula ?? ''} />
        </div>
      </div>

      <form className="grid gap-3 rounded-xl border border-guinda/20 p-4" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold">Buscar usuario</h3>
        <Input placeholder="Nombre" error={errors.nombre?.message} {...register('nombre')} />
        <Input placeholder="Correo" error={errors.correo?.message} {...register('correo')} />
        <Input placeholder="Matrícula" error={errors.matricula?.message} {...register('matricula')} />
        <Button type="submit">Buscar</Button>
      </form>

      {alert ? <AlertMessage type={alert.type} message={alert.message} /> : null}

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="ghost" onClick={() => router.push('/menu')}>ir al menú</Button>
        <SalidaButton />
      </div>
    </section>
  );
}


