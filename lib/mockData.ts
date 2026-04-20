import { Libro, Prestamo, Usuario } from '@/types';

export const usuarios: Usuario[] = [
  { id: '1', nombre: 'Rodriguez Lozano Brittany Denisse', matricula: '234020800594', grupo: 'D', grado: '4', correo: '23402080059473@cecytebc.edu.mx', contrasena: 'Brittany1', prestamosActivos: 1, limitePrestamos: 3 },
  { id: '2', nombre: 'Mendoza Silva Catia Guadalupe', matricula: '244020800510221', grupo: 'D', grado: '4', correo: '244020800510221@cecytebc.edu.mx', contrasena: 'Catia123', prestamosActivos: 0, limitePrestamos: 3 },
  { id: '3', nombre: 'Padilla Cabrera Shirleth', matricula: '244020800510367', grupo: 'D', grado: '4', correo: '244020800510367@cecytebc.edu.mx', contrasena: 'Shirleth1', prestamosActivos: 2, limitePrestamos: 3 }
];

export const libros: Libro[] = [
  { id: 'l1', titulo: 'Matematicas IV', autor: 'Baldor', editorial: 'Patria', genero: 'Matematicas', numeroPaginas: 380, disponibilidad: 'disponible', anio: 2022 },
  { id: 'l2', titulo: 'Quimica Organica', autor: 'Chang', editorial: 'McGraw-Hill', genero: 'Quimica', numeroPaginas: 420, disponibilidad: 'prestado', anio: 2021 },
  { id: 'l3', titulo: 'Biologia General', autor: 'Campbell', editorial: 'Pearson', genero: 'Biologia', numeroPaginas: 510, disponibilidad: 'disponible', anio: 2020 },
  { id: 'l4', titulo: 'Historia de Mexico', autor: 'Meyer', editorial: 'Trillas', genero: 'Historia', numeroPaginas: 295, disponibilidad: 'disponible', anio: 2019 },
  { id: 'l5', titulo: 'Literatura Universal', autor: 'Pimentel', editorial: 'Santillana', genero: 'Literatura', numeroPaginas: 340, disponibilidad: 'prestado', anio: 2023 },
  { id: 'l6', titulo: 'Fisica I', autor: 'Serway', editorial: 'Cengage', genero: 'Fisica', numeroPaginas: 460, disponibilidad: 'disponible', anio: 2024 },
  { id: 'l7', titulo: 'Ingles Intermedio', autor: 'Murphy', editorial: 'Cambridge', genero: 'Idiomas', numeroPaginas: 210, disponibilidad: 'disponible', anio: 2022 },
  { id: 'l8', titulo: 'Calculo Diferencial', autor: 'Stewart', editorial: 'Cengage', genero: 'Matematicas', numeroPaginas: 390, disponibilidad: 'no_disponible', anio: 2018 },
  { id: 'l9', titulo: 'Ecologia y Medio Ambiente', autor: 'Odum', editorial: 'Oxford', genero: 'Biologia', numeroPaginas: 260, disponibilidad: 'disponible', anio: 2021 },
  { id: 'l10', titulo: 'Taller de Lectura y Redaccion', autor: 'Cassany', editorial: 'SM', genero: 'Literatura', numeroPaginas: 230, disponibilidad: 'disponible', anio: 2020 },
  { id: 'l11', titulo: 'Geometria Analitica', autor: 'Lehmann', editorial: 'Limusa', genero: 'Matematicas', numeroPaginas: 300, disponibilidad: 'prestado', anio: 2017 },
  { id: 'l12', titulo: 'Introduccion a la Programacion', autor: 'Deitel', editorial: 'Pearson', genero: 'Tecnologia', numeroPaginas: 430, disponibilidad: 'disponible', anio: 2024 }
];

export const prestamosIniciales: Prestamo[] = [
  { id: 'p1', libroId: 'l2', libroTitulo: 'Quimica Organica', usuarioNombre: 'Rodriguez Lozano Brittany Denisse', matricula: '234020800594', gradoGrupo: '4D', fechaPrestamo: '10/01/2026', fechaEntrega: '25/01/2026', estado: 'activo' },
  { id: 'p2', libroId: 'l5', libroTitulo: 'Literatura Universal', usuarioNombre: 'Padilla Cabrera Shirleth', matricula: '244020800510367', gradoGrupo: '4D', fechaPrestamo: '05/02/2026', fechaEntrega: '20/02/2026', estado: 'devuelto' },
  { id: 'p3', libroId: 'l11', libroTitulo: 'Geometria Analitica', usuarioNombre: 'Padilla Cabrera Shirleth', matricula: '244020800510367', gradoGrupo: '4D', fechaPrestamo: '01/03/2026', fechaEntrega: '16/03/2026', estado: 'vencido' },
  { id: 'p4', libroId: 'l4', libroTitulo: 'Historia de Mexico', usuarioNombre: 'Mendoza Silva Catia Guadalupe', matricula: '244020800510221', gradoGrupo: '4D', fechaPrestamo: '12/04/2026', fechaEntrega: '27/04/2026', estado: 'activo' }
];