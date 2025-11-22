export interface UserData {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  ubicacion: string;
  bio: string;
  habilidades: string;
  cv?: string | null;
}

export interface CompanyData {
  id: string;
  nombre: string;
  nit: string;
  email: string;
  telefono: string;
  ubicacion: string;
  descripcion: string;
  sector: string;
  sitioWeb: string;
}

export interface UserDataSimplified {
  id: string;
  name: string;
  email: string;
  type: UserType;
}

export type UserType = 'user' | 'company' | null;
