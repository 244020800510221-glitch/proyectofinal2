'use client';

import { ReservaEnCola } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReservaState {
  reservas: ReservaEnCola[];
  agregarReserva: (params: {
    libroId: string;
    libroTitulo: string;
    usuarioId: string;
    matricula: string;
    nombre: string;
  }) => { ok: true; posicion: number } | { ok: false; mensaje: string };
  colaPorLibro: (libroId: string) => ReservaEnCola[];
  posicionDeUsuario: (libroId: string, matricula: string) => number | null;
}

export const useReservaStore = create<ReservaState>()(
  persist(
    (set, get) => ({
      reservas: [],
      colaPorLibro: (libroId) =>
        get()
          .reservas.filter((r) => r.libroId === libroId)
          .sort((a, b) => a.posicion - b.posicion),
      posicionDeUsuario: (libroId, matricula) => {
        const r = get().reservas.find((x) => x.libroId === libroId && x.matricula === matricula);
        return r ? r.posicion : null;
      },
      agregarReserva: ({ libroId, libroTitulo, usuarioId, matricula, nombre }) => {
        const existente = get().reservas.some((r) => r.libroId === libroId && r.matricula === matricula);
        if (existente) {
          return { ok: false, mensaje: 'Ya estás en la lista de espera de este libro.' };
        }
        const enCola = get().reservas.filter((r) => r.libroId === libroId);
        const posicion = enCola.length + 1;
        const nueva: ReservaEnCola = {
          id: crypto.randomUUID(),
          libroId,
          libroTitulo,
          usuarioId,
          matricula,
          nombre,
          fechaReserva: new Date().toISOString().slice(0, 10),
          posicion
        };
        set((state) => ({ reservas: [...state.reservas, nueva] }));
        return { ok: true, posicion };
      }
    }),
    { name: 'cecyteca-reservas' }
  )
);
