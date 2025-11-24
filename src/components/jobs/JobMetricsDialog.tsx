"use client";

import { JobDetailPanelType } from "@/types/jobs/JobDetailPanel.types";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ComingSoonDialog } from "../ComingSoonDialog";

interface JobMetricsDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    job: JobDetailPanelType | null;
}

export function JobMetricsDialog({ isOpen, onOpenChange, job }: JobMetricsDialogProps) {
    const [showComingSoon, setShowComingSoon] = useState(false);
    if (!job) return null;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                        <DialogDescription>{job.subTitle}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <p className="text-sm text-gray-600 mb-1">Total de Postulaciones</p>
                                <p className="text-3xl font-bold text-blue-600">--</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <p className="text-sm text-gray-600 mb-1">Vacantes Disponibles</p>
                                <p className="text-3xl font-bold text-green-600">{job.availablePlaces}</p>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                <p className="text-sm text-gray-600 mb-1">En Revisión</p>
                                <p className="text-3xl font-bold text-yellow-600">--</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                <p className="text-sm text-gray-600 mb-1">Aceptados</p>
                                <p className="text-3xl font-bold text-purple-600">--</p>
                            </div>
                        </div>

                        <div className="space-y-3 border-t pt-4">
                            <h3 className="font-semibold text-gray-900">Información de la Oferta</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-600">Ubicación</p>
                                    <p className="font-medium">{job.location}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Salario</p>
                                    <p className="font-medium">${job.salary.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Modalidad</p>
                                    <p className="font-medium">{job.modality}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Jornada</p>
                                    <p className="font-medium">{job.journey}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Cerrar
                            </Button>
                            <Button>
                                <Edit size={16} className="mr-2"
                                    onClick={() => setShowComingSoon(true)}
                                />
                                Editar Oferta
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            
            <ComingSoonDialog
                isOpen={showComingSoon}
                onClose={() => setShowComingSoon(false)}
            />
        </>
    );
}
