'use client';

import { AlertMessage } from '@/components/ui/AlertMessage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { emailPattern, passwordPattern } from '@/lib/validations';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { BookOpen, Eye, EyeOff, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface LoginForm {
  correo: string;
  contrasena: string;
}

export default function LoginPage(): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success' | 'warning'; message: string } | null>(null);
  const [wrongPassword, setWrongPassword] = useState(false);
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = (values: LoginForm): void => {
    if (!values.correo || !values.contrasena) {
      setAlert({ type: 'warning', message: '⚠ algo salió mal. Por favor llena los campos' });
      return;
    }
    const result = login(values.correo, values.contrasena);
    if (!result.ok) {
      if (result.error === 'contrasena') {
        setWrongPassword(true);
        setAlert({ type: 'error', message: '! ¡contraseña incorrecta!' });
      }
      return;
    }
    setAlert({ type: 'success', message: 'registro exitoso' });
    setTimeout(() => router.push('/menu'), 900);
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center bg-surface p-6">
      <div className="mb-4 flex justify-end">
        <ThemeToggle />
      </div>
      <div className="mb-8 text-center">
        <BookOpen className="mx-auto h-14 w-14 text-guinda" />
        <h1 className="text-4xl font-black text-guinda">CECYTECA</h1>
        <p className="mt-2 text-lg font-semibold">Iniciar sesión</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Correo electrónico</span>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-guinda/70" />
            <Input
              className="pl-9"
              placeholder="correo@cecytebc.edu.mx"
              error={errors.correo?.message}
              {...register('correo', {
                required: 'formato de correo incorrecto',
                pattern: { value: emailPattern, message: '! formato de correo incorrecto' },
                validate: (value) => !value.includes(' ') || '! formato de correo incorrecto'
              })}
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Contraseña</span>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="******"
              error={errors.contrasena?.message}
              {...register('contrasena', {
                required: 'Contraseña requerida',
                pattern: { value: passwordPattern, message: 'Debe tener letra y número (mínimo 6)' }
              })}
            />
            <button type="button" className="absolute right-3 top-2 text-guinda" onClick={() => setShowPassword((s) => !s)}>
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </label>

        {alert ? <AlertMessage type={alert.type} message={alert.message} /> : null}

        <Button type="submit" className="w-full">{wrongPassword ? 'cambiar contraseña' : 'Ingresar'}</Button>
        <div className="text-center text-sm">
          <Link href="/registro" className="text-dorado">¿Olvidaste tu contraseña?</Link>
        </div>
      </form>

      <p className="mt-8 text-center text-sm">
        ¿No tienes cuenta? <Link href="/registro" className="text-guinda underline">Regístrate</Link>
      </p>
    </section>
  );
}


