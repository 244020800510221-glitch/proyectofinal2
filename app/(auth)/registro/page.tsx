'use client';

import { AlertMessage } from '@/components/ui/AlertMessage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { emailPattern, matriculaPattern, nombrePattern, passwordPattern } from '@/lib/validations';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface RegistroForm {
  nombre: string;
  matricula: string;
  grado: string;
  grupo: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
}

export default function RegistroPage(): React.ReactElement {
  const registerUser = useAuthStore((s) => s.register);
  const router = useRouter();
  const [alert, setAlert] = useState<{ type: 'error' | 'warning' | 'success'; message: string } | null>(null);
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<RegistroForm>({ mode: 'onChange' });

  const onSubmit = (data: RegistroForm): void => {
    const result = registerUser({
      nombre: data.nombre,
      matricula: data.matricula,
      grado: data.grado.replace('°', ''),
      grupo: data.grupo,
      correo: data.correo,
      contrasena: data.contrasena
    });

    if (!result.ok) {
      setAlert({ type: 'error', message: result.error ?? 'No se pudo registrar' });
      return;
    }

    setAlert({ type: 'success', message: 'Registro exitoso' });
    router.push('/menu');
  };

  return (
    <section className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-3xl font-bold text-guinda">Registro</h1>
      <form className="grid gap-4 rounded-xl bg-crema p-5" onSubmit={handleSubmit(onSubmit, () => setAlert({ type: 'warning', message: '⚠ No fue posible continuar ya que hay campos vacíos y los datos que puso son incorrectos. Por favor verifique sus datos' }))}>
        <Input placeholder="Nombre" error={errors.nombre?.message} {...register('nombre', { required: 'solo letras / no dejar en vacío', pattern: { value: nombrePattern, message: 'solo letras / no dejar en vacío' } })} />
        <Input placeholder="Matrícula" error={errors.matricula?.message} {...register('matricula', { required: 'solo debes de poner números / no dejar vacíos', pattern: { value: matriculaPattern, message: 'su matrícula no es válida, verifique que sean numéricos' } })} />

        <div className="grid grid-cols-2 gap-3">
          <select className="rounded-lg border border-guinda/20 px-3 py-2" {...register('grado', { required: 'seleccione una opción' })}>
            <option value="">Seleccione grado</option>
            {['1°', '2°', '3°', '4°', '5°', '6°'].map((g) => <option key={g}>{g}</option>)}
          </select>
          <select className="rounded-lg border border-guinda/20 px-3 py-2" {...register('grupo', { required: 'por favor seleccione grado y grupo' })}>
            <option value="">Seleccione grupo</option>
            {['A', 'B', 'C', 'D', 'E'].map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>

        <Input placeholder="Correo electrónico" error={errors.correo?.message} {...register('correo', { required: 'correo electrónico inválido', pattern: { value: emailPattern, message: 'correo electrónico inválido' } })} />
        <Input type="password" placeholder="Contraseña" error={errors.contrasena?.message} {...register('contrasena', { required: 'por favor verifica que tenga mínimo 6 caracteres', pattern: { value: passwordPattern, message: 'por favor verifica que tenga mínimo 6 caracteres' } })} />
        <Input type="password" placeholder="Confirmar contraseña" error={errors.confirmarContrasena?.message} {...register('confirmarContrasena', { validate: (value) => value === watch('contrasena') || 'las contraseñas no coinciden' })} />

        {alert ? <AlertMessage type={alert.type} message={alert.message} /> : null}

        <Button type="submit" disabled={!isValid}>ir al menú</Button>
      </form>
    </section>
  );
}


