export interface JobDetailPanelType {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    modality: "Presencial" | "Remoto" | "Híbrido";
    salary: number;
    requeriments: string;
    benefits: string;
    yearsExperience: number;
    location: string;
    journey: string;
    schedule: string;
    availablePlaces: number;
    status: string;
    contractType: string;
    paymentType: "Mensual" | "Semanal" | "Quincenal";
    publicationDate: string;
    closingDate: string | null;
    companyId: number;
    categoryId: number;
}

export interface JobDetailPanelProps {
    job: JobDetailPanelType;
    postuledJob? : PostuledJobs;
    handlefavorite: (jobId: number) => void;
}

export interface PostuledJobs {
    userId: number;
    offerId: number;
    applyed: boolean;
    statusId: StatusPostulationType;
}

export type StatusPostulationType = 'Pendiente' | 'En revisión' | 'Aceptada' | 'Rechazada';