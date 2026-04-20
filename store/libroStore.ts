'use client';

import { libros } from '@/lib/mockData';
import { Libro } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LibroState {
  libros: Libro[];
  libroSeleccionado: Libro | null;
  seleccionarLibro: (libro: Libro | null) => void;
  actualizarDisponibilidad: (id: string, disponibilidad: Libro['disponibilidad']) => void;
}

export const useLibroStore = create<LibroState>()(
  persist(
    (set) => ({
      libros,
      libroSeleccionado: null,
      seleccionarLibro: (libro) => set({ libroSeleccionado: libro }),
      actualizarDisponibilidad: (id, disponibilidad) =>
        set((state) => ({
          libros: state.libros.map((libro) => (libro.id === id ? { ...libro, disponibilidad } : libro)),
          libroSeleccionado:
            state.libroSeleccionado?.id === id ? { ...state.libroSeleccionado, disponibilidad } : state.libroSeleccionado
        }))
    }),
    { name: 'cecyteca-libros' }
  )
);


