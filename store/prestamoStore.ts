'use client';

import { prestamosIniciales } from '@/lib/mockData';
import { Devolucion, Prestamo } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PrestamoState {
  prestamos: Prestamo[];
  devoluciones: Devolucion[];
  agregarPrestamo: (prestamo: Prestamo) => void;
  devolverPrestamo: (id: string, devolucion: Devolucion) => void;
}

export const usePrestamoStore = create<PrestamoState>()(
  persist(
    (set) => ({
      prestamos: prestamosIniciales,
      devoluciones: [],
      agregarPrestamo: (prestamo) => set((state) => ({ prestamos: [...state.prestamos, prestamo] })),
      devolverPrestamo: (id, devolucion) =>
        set((state) => ({
          prestamos: state.prestamos.map((p) => (p.id === id ? { ...p, estado: 'devuelto' } : p)),
          devoluciones: [...state.devoluciones, devolucion]
        }))
    }),
    { name: 'cecyteca-prestamos' }
  )
);


