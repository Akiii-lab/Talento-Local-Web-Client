export interface CreateJobFormData {
    title: string;
    subTitle: string;
    company: string;
    description: string;
    modality: "Presencial" | "Remoto" | "Hibrido" | "";
    salary: number;
    requeriments: string;
    benefits: string;
    yearsExperience: number;
    location: string;
    journey: "completo" | "parcial" | "flexible" | "";
    schedule: string;
    availablePlaces: number;
    status: 'activo' | 'inactivo' | '';
    contractType: string;
    paymentType: "Mensual" | "Semanal" | "Quincenal" | "";
    publicationDate: string;
    closingDate: string;
    companyId: string;
    categoryId: number;
}

export type categories = "tecnologia" | "ventas" | "admin" | "servicios" | "";