"use client";

import { useState, useEffect } from "react";
import { useCompanyStore } from "@/app/store/userStore";
import { JobDetailPanelType } from "@/types/jobs/JobDetailPanel.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Briefcase, Calendar, Clock, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { JobMetricsDialog } from "@/components/jobs/JobMetricsDialog";

export default function MyJobsPage() {
    const { company } = useCompanyStore();
    const [jobs, setJobs] = useState<JobDetailPanelType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobDetailPanelType | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    const fetchCompanyJobs = async () => {
        if (!company) return;
        try {
            setLoading(true);
            const companyId = company.id;

            // Fetch all jobs
            const jobsResponse = await fetch("/api/offers");
            const allJobs: JobDetailPanelType[] = await jobsResponse.json();

            // Filter jobs to only show those posted by this company
            const companyJobs = allJobs.filter(job => job.companyId === companyId);

            setJobs(companyJobs);
        } catch (error) {
            console.error("Error cargando convocatorias:", error);
            toast.error("Error al cargar las convocatorias");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (company) {
            fetchCompanyJobs();
        }
    }, [company]);

    const handleDeleteJob = (jobId: number) => {
        setJobs(jobs.filter(job => job.id !== jobId));
        toast.success("Convocatoria eliminada");
    };

    const handleOpenMetrics = (job: JobDetailPanelType) => {
        setSelectedJob(job);
        setIsDialogOpen(true);
    };

    if (!company) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Mis Convocatorias
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Debes ser una empresa para ver tus convocatorias
                    </p>
                    <Link href="/">
                        <Button>Volver al Inicio</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Mis Convocatorias
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Mis Convocatorias
                        </h1>
                        <p className="text-gray-600">
                            Total de ofertas: <span className="font-semibold">{jobs.length}</span>
                        </p>
                    </div>
                    <Link href="/jobs/create">
                        <Button size="lg">
                            + Nueva Convocatoria
                        </Button>
                    </Link>
                </div>

                {/* Empty State */}
                {jobs.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                No hay convocatorias
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Aún no has creado ninguna convocatoria. ¡Comienza a publicar!
                            </p>
                            <Link href="/jobs/create">
                                <Button>
                                    Crear Nueva Convocatoria
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => {
                            const postedDate = job.publicationDate ? new Date(job.publicationDate).toLocaleDateString('es-ES') : 'N/A';
                            const closingDate = job.closingDate ? new Date(job.closingDate).toLocaleDateString('es-ES') : 'Sin fecha límite';

                            return (
                                <Card key={job.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                                    {/* Header con estado */}
                                    <div className={`p-4 border-b ${job.status === "Urgente" ? "bg-red-50" : "bg-blue-50"}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                                                <p className="text-sm text-gray-600">{job.subTitle}</p>
                                            </div>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded ${job.status === "Urgente" ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800"}`}>
                                                {job.status}
                                            </span>
                                        </div>
                                    </div>

                                    <CardContent className="p-4 space-y-4">
                                        {/* Descripción */}
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {job.description}
                                        </p>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            {/* Ubicación */}
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MapPin size={16} className="text-blue-600 shrink-0" />
                                                <span className="truncate">{job.location}</span>
                                            </div>

                                            {/* Salario */}
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <DollarSign size={16} className="text-green-600 shrink-0" />
                                                <span className="truncate">${job.salary.toLocaleString()}</span>
                                            </div>

                                            {/* Modalidad */}
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Briefcase size={16} className="text-purple-600 shrink-0" />
                                                <span className="truncate">{job.modality}</span>
                                            </div>

                                            {/* Vacantes */}
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Eye size={16} className="text-orange-600 shrink-0" />
                                                <span className="truncate">{job.availablePlaces} vacante(s)</span>
                                            </div>
                                        </div>

                                        {/* Fechas */}
                                        <div className="space-y-2 pt-2 border-t">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar size={16} />
                                                <span>Publicado: {postedDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Clock size={16} />
                                                <span>Cierra: {closingDate}</span>
                                            </div>
                                        </div>

                                        {/* Botones de acción */}
                                        <div className="flex gap-2 pt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenMetrics(job)}
                                                className="flex-1"
                                            >
                                                <Eye size={16} className="mr-2" />
                                                Ver
                                            </Button>
                                            <Button variant="outline" className="flex-1" size="sm">
                                                <Edit size={16} className="mr-2" />
                                                Editar
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                size="sm"
                                                onClick={() => handleDeleteJob(job.id)}
                                            >
                                                <Trash2 size={16} className="mr-2" />
                                                Eliminar
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Dialog de Métricas */}
            <JobMetricsDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                job={selectedJob}
            />
        </div>
    );
}
