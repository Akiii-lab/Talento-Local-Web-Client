import { JobDetailPanelType } from "./JobDetailPanel.types";

export type JobCardType = JobDetailPanelType;

export interface JobCardProps {
    job: JobDetailPanelType;
    onClick?: () => void;
    className?: string;
}
