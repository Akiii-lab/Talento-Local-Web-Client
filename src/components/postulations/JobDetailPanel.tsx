import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JobDetailPanelProps } from "@/types/postulations/JobDetailPanel.types";
import {
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon,
  BuildingIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  MoreVerticalIcon,
} from "lucide-react";

export function JobDetailPanel({ job }: JobDetailPanelProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
          {job.subtitle && (
            <p className="text-lg font-semibold text-gray-700 mb-2">
              {job.subtitle}
            </p>
          )}
          <p className="text-sm text-gray-600 mb-1">{job.company}</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPinIcon size={16} />
            <span>{job.location}</span>
          </div>
        </div>
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
          <BuildingIcon size={32} className="text-gray-400" />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2 mb-6">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          Aplicar
        </Button>
        <Button variant="outline" size="icon">
          <HeartIcon size={20} />
        </Button>
        <Button variant="outline" size="icon">
          <ShareIcon size={20} />
        </Button>
        <Button variant="outline" size="icon">
          <EyeIcon size={20} />
        </Button>
        <Button variant="outline" size="icon">
          <MoreVerticalIcon size={20} />
        </Button>
      </div>

      {/* Detalles del empleo */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <BriefcaseIcon size={18} className="text-gray-500" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon size={18} className="text-gray-500" />
          <span>{job.schedule}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon size={18} className="text-gray-500" />
          <span>{job.modality}</span>
        </div>
        {job.salary && (
          <div className="flex items-center gap-2 text-sm text-green-700">
            <span className="font-semibold">{`$ ${job.salary.toLocaleString('es-CO')}`}</span>
            <span className="text-xs text-gray-500">{job.payType ?? 'Mensual'}</span>
          </div>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-sm mb-2">Descripción del puesto:</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {job.description}
          </p>
        </div>

        <div>
          <p className="font-semibold text-sm mb-2">Requisitos:</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {job.requirements}
          </p>
        </div>

        {job.benefits && (
          <div>
            <p className="font-semibold text-sm mb-2">Beneficios:</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {job.benefits}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
