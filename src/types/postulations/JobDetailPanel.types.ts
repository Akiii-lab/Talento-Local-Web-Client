export interface JobDetailPanelType {
  id: number;
  title: string;
  subtitle?: string;
  company: string;
  location: string;
  type: string;
  schedule: string;
  modality: string;
  salary?: number;
  payType?: "Mensual" | "Semanal" | "Quincenal";
  postedTime: string;
  featured: boolean;
  urgent: boolean;
  rating: number | null;
}

export interface JobDetailPanelProps {
  job: JobDetailPanelType;
}
