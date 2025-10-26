import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

interface JobDetailPanelProps {
  job: {
    id: number;
    title: string;
    subtitle?: string;
    company: string;
    location: string;
    type: string;
    schedule: string;
    modality: string;
    salary?: string;
    postedTime: string;
    featured: boolean;
    urgent: boolean;
    rating: number | null;
  };
}

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
      </div>

      {/* Descripción */}
      <div className="space-y-4">
        <p className="text-sm text-gray-700">
          Sé parte de Nuestro Equipo de trabajo en la empresa líder en Aseo y
          Mantenimiento, buscamos todero-jardinero en la ciudad de Santa Marta
          para incorporarse de forma inmediata
        </p>

        <div>
          <p className="font-semibold text-sm mb-2">
            Entre tus responsabilidades diarias se incluyen:
          </p>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>
              Desarrollar los servicios de mantenimiento locativo como resane,
              enchape, pintura, plomería, según lo asignado por los superiores
              y jefes, con capacitación en alturas y diligenciamiento de
              formatos establecidos para cada actividad
            </li>
            <li>Mantenimiento y cuidado de jardines, parques y áreas verdes.</li>
          </ol>
          <p className="text-sm text-gray-700 mt-2">
            Serás responsable de la planificación y ejecución de tareas de
            poda, riego, fertilización y control de malezas, limpieza y
            rastrillado, recortes, abonado, conservación de trabajo.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-700">
            <strong>Disponibilidad:</strong> Lunes a Domingo, salario $
            1.423.500 + Aux transp (200.000) + Prestaciones Sociales,
          </p>
          <p className="text-sm text-gray-700">Contrato Fijo</p>
        </div>
      </div>
    </Card>
  );
}
