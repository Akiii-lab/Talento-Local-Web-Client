export interface UserData {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  ubicacion: string;
  bio: string;
  habilidades: string;
  cv?: string | null;
}

export interface CompanyData {
  id: number;
  nombre: string;
  nit: string;
  email: string;
  telefono: string;
  ubicacion: string;
  descripcion: string;
  sector: string;
  sitioWeb: string;
}

export type UserType = 'normal' | 'empresa' | null;
