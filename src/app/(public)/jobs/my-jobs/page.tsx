"use client";

import { useState, useEffect } from "react";
import { useCompanyStore } from "@/app/store/userStore";
import { JobDetailPanelType } from "@/types/jobs/JobDetailPanel.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Briefcase, Calendar, Clock, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { JobMetricsDialog } from "@/components/jobs/JobMetricsDialog";
import { ComingSoonDialog } from "@/components/ComingSoonDialog";

export default function MyJobsPage() {
    const { company } = useCompanyStore();
    const [jobs, setJobs] = useState<JobDetailPanelType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobDetailPanelType | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const router = useRouter();
    
    const itemsPerPage = 9;
    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = jobs.slice(startIndex, endIndex);

    const fetchCompanyJobs = async () => {
        if (!company) return;
        try {
            setLoading(true);
            const companyId = company.id;

            const jobsResponse = await fetch(`/api/jobs/${companyId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if(!jobsResponse.ok) {
                throw new Error("Error al obtener las convocatorias");
            }

            const data = await jobsResponse.json();
            const allJobs: JobDetailPanelType[] = data.jobs;
            setJobs(allJobs);
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentJobs.map((job) => {
                                const postedDate = job.publicationDate ? new Date(job.publicationDate).toLocaleDateString('es-ES') : 'N/A';
                                const closingDate = job.closingDate ? new Date(job.closingDate).toLocaleDateString('es-ES') : 'Sin fecha límite';
                            return (
                                <Card key={job.id} className="hover:shadow-lg transition-shadow overflow-hidden">
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
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {job.description}
                                        </p>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MapPin size={16} className="text-blue-600 shrink-0" />
                                                <span className="truncate">{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <DollarSign size={16} className="text-green-600 shrink-0" />
                                                <span className="truncate">${job.salary.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Briefcase size={16} className="text-purple-600 shrink-0" />
                                                <span className="truncate">{job.modality}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Eye size={16} className="text-orange-600 shrink-0" />
                                                <span className="truncate">{job.availablePlaces} vacante(s)</span>
                                            </div>
                                        </div>
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
                                        <div className="flex gap-2 pt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleOpenMetrics(job)}
                                                className="flex-1 hover:cursor-pointer"
                                            >
                                                <Eye size={16} className="mr-2" />
                                                Ver
                                            </Button>
                                            <Button variant="outline" className="flex-1 hover:cursor-pointer" size="sm" onClick={() => setShowComingSoon(true)}>
                                                <Edit size={16} className="mr-2" />
                                                Editar
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="flex-1 text-red-600 hover:cursor-pointer hover:bg-red-50 hover:text-red-700"
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

                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="hover:cursor-pointer"
                                >
                                    <ChevronLeft size={16} className="mr-2" />
                                    Anterior
                                </Button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className="w-10 hover:cursor-pointer"
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="hover:cursor-pointer"
                                >
                                    Siguiente
                                    <ChevronRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <JobMetricsDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                job={selectedJob}
            />

            <ComingSoonDialog
                isOpen={showComingSoon}
                onClose={() => setShowComingSoon(false)}
            />
        </div>
    );
}
