export interface JobDetailPanelType {
    id: number;
    title: string;
    subtitle?: string;
    company: string;
    location: string;
    type: string;
    schedule: string;
    modality: "Presencial" | "Remoto" | "Hibrido";
    salary: number;
    payType: "Mensual" | "Semanal" | "Quincenal";
    postedTime: string;
    postedDate: Date;
    featured: boolean;
    urgent: boolean;
    rating: number | null;
    category: "tecnologia" | "ventas" | "admin" | "servicios";
    experience: number; // años de experiencia requeridos (0 = sin experiencia)
    jornada: "completo" | "parcial" | "flexible";
    description: string;
    requirements: string;
    benefits?: string;
}

export interface JobDetailPanelProps {
    job: JobDetailPanelType;
}
