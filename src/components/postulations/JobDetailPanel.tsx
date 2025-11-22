"use client";

import { useCompanyStore, useUserStore } from "@/app/store/userStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JobDetailPanelProps } from "@/types/jobs/JobDetailPanel.types";
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
import { toast } from "sonner";
import { useState, useEffect } from "react";

export function JobDetailPanel({ job, postuledJob }: JobDetailPanelProps) {
  const { user } = useUserStore();
  const { company } = useCompanyStore();
  const [isApplied, setIsApplied] = useState(postuledJob?.applyed || false);

  useEffect(() => {
    setIsApplied(postuledJob?.applyed || false);
  }, [postuledJob?.applyed]);

  const handleApply = async() => {
    if(!user || company) {
      toast("Debes iniciar sesión como usuario para postularte a un empleo.");
      return;
    }
    if(postuledJob) {
      postuledJob.applyed = true;
      postuledJob.statusId = "Pendiente";
      setIsApplied(true);
      toast("¡Postulación enviada correctamente!");
    }
  }

  useEffect(() => {
    console.log(postuledJob)
  }, [postuledJob]);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
          {job.subTitle && (
            <p className="text-lg font-semibold text-gray-700 mb-2">
              {job.subTitle}
            </p>
          )}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPinIcon size={16} />
            <span>{job.location}</span>
          </div>
        </div>
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
          <BuildingIcon size={32} className="text-gray-400" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleApply}
          disabled={isApplied}
          className={`flex-1 ${isApplied ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isApplied ? "Ya estás postulado" : "Aplicar"}
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

      <div className="space-y-6 mt-3">
        <div className="flex items-center gap-2 text-sm">
          <BriefcaseIcon size={18} className="text-gray-500" />
          <span>{job.contractType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon size={18} className="text-gray-500" />
          <span>{job.journey}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon size={18} className="text-gray-500" />
          <span>{job.modality}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-700">
          <span className="font-semibold">{`$ ${job.salary.toLocaleString('es-CO')}`}</span>
          <span className="text-xs text-gray-500">{job.paymentType}</span>
        </div>
      </div>

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
            {job.requeriments}
          </p>
        </div>

        <div>
          <p className="font-semibold text-sm mb-2">Beneficios:</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {job.benefits}
          </p>
        </div>
      </div>
    </Card>
  );
}
