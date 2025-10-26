export interface CreateJobFormData {
    title: string;
    subtitle: string;
    company: string;
    location: string;
    type: string;
    schedule: string;
    modality: "Presencial" | "Remoto" | "Hibrido" | "";
    salary: string;
    payType: "Mensual" | "Semanal" | "Quincenal" | "";
    category: "tecnologia" | "ventas" | "admin" | "servicios" | "";
    experience: string;
    jornada: "completo" | "parcial" | "flexible" | "";
    description: string;
    requirements: string;
    benefits: string;
}
