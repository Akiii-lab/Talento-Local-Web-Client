export interface JobDetailPanelType {
    id: number;
    title: string;
    subtitle?: string;
    company: string;
    location: string; // siempre sera "santa marta, magdalena"
    type: string;
    schedule: string; //horario
    modality: "Presencial" | "Remoto" | "Hibrido";
    salary: number;
    payType: "Mensual" | "Semanal" | "Quincenal";
    postedTime: string;
    postedDate: Date;
    featured: boolean; // se pone en true a traves de algoritmos default false
    urgent: boolean; 
    rating: number | null; // se obtiene del perfil de la empresa
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
