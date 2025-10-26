export interface JobCardType {
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
    featured: boolean; // destacado se hace a traves de algoritmo default false
    urgent: boolean; // la empresa solicita si es urgente o no
    rating: number | null; // viene del perfil de la empresa
    category: "tecnologia" | "ventas" | "admin" | "servicios";
    experience: number; // años de experiencia requeridos (0 = sin experiencia)
    jornada: "completo" | "parcial" | "flexible";
    description: string;
    requirements: string;
    benefits?: string;
}

export interface JobCardProps {
    job: JobCardType;
    onClick?: () => void;
    className?: string;
}
