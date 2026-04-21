export interface Usuario {
  id: string;
  nombre: string;
  matricula: string;
  grupo: string;
  grado: string;
  correo: string;
  contrasena: string;
  prestamosActivos: number;
  limitePrestamos: number;
}

export interface Libro {
  id: string;
  titulo: string;
  autor: string;
  editorial: string;
  genero: string;
  numeroPaginas: number;
  disponibilidad: 'disponible' | 'prestado' | 'no_disponible';
  anio: number;
}

export interface Prestamo {
  id: string;
  libroId: string;
  libroTitulo: string;
  usuarioNombre: string;
  matricula: string;
  gradoGrupo: string;
  fechaPrestamo: string;
  fechaEntrega: string;
  estado: 'activo' | 'devuelto' | 'vencido';
}

export interface Devolucion {
  id: string;
  libroId: string;
  libroTitulo: string;
  nombre: string;
  matricula: string;
  gradoGrupo: string;
  fechaDevolucion: string;
  estadoLibro: 'bueno' | 'regular' | 'danado';
}

/** Lista de espera simulada cuando el libro está prestado */
export interface ReservaEnCola {
  id: string;
  libroId: string;
  libroTitulo: string;
  usuarioId: string;
  matricula: string;
  nombre: string;
  fechaReserva: string;
  posicion: number;
}