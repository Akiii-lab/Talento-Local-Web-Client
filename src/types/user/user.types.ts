export interface UserData {
  nombre: string;
  email: string;
  telefono: string;
  ubicacion: string;
  bio: string;
  habilidades: string;
}

export interface CompanyData {
  nombreEmpresa: string;
  nit: string;
  email: string;
  telefono: string;
  ubicacion: string;
  descripcion: string;
  sector: string;
  sitioWeb: string;
}

export type UserType = 'normal' | 'empresa' | null;
