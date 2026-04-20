'use client';

import { usuarios } from '@/lib/mockData';
import { Usuario } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  usuarios: Usuario[];
  usuarioActual: Usuario | null;
  login: (correo: string, contrasena: string) => { ok: boolean; error?: string };
  register: (usuario: Omit<Usuario, 'id' | 'prestamosActivos' | 'limitePrestamos'>) => { ok: boolean; error?: string };
  logout: () => void;
  updateUsuario: (usuario: Usuario) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      usuarios,
      usuarioActual: null,
      login: (correo, contrasena) => {
        const found = get().usuarios.find((u) => u.correo.toLowerCase() === correo.toLowerCase());
        if (!found) return { ok: false, error: 'correo' };
        if (found.contrasena !== contrasena) return { ok: false, error: 'contrasena' };
        set({ usuarioActual: found });
        return { ok: true };
      },
      register: (usuario) => {
        const exists = get().usuarios.some((u) => u.correo.toLowerCase() === usuario.correo.toLowerCase());
        if (exists) return { ok: false, error: 'El correo ya está registrado' };
        const nuevo: Usuario = {
          ...usuario,
          id: crypto.randomUUID(),
          prestamosActivos: 0,
          limitePrestamos: 3
        };
        set((state) => ({ usuarios: [...state.usuarios, nuevo], usuarioActual: nuevo }));
        return { ok: true };
      },
      logout: () => set({ usuarioActual: null }),
      updateUsuario: (usuario) =>
        set((state) => ({
          usuarioActual: state.usuarioActual?.id === usuario.id ? usuario : state.usuarioActual,
          usuarios: state.usuarios.map((u) => (u.id === usuario.id ? usuario : u))
        }))
    }),
    { name: 'cecyteca-auth' }
  )
);


