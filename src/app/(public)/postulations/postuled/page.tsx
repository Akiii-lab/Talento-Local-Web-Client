"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/app/store/userStore";
import { JobDetailPanelType, PostuledJobs } from "@/types/jobs/JobDetailPanel.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Briefcase, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PostuledPage() {
    const { user } = useUserStore();
    const [postedJobs, setPostedJobs] = useState<JobDetailPanelType[]>([]);
    const [postuledData, setPostuledData] = useState<PostuledJobs[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchPostuledJobs = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const userId = user.id;
            const jobsResponse = await fetch("/api/offers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const allJobsResponse = await jobsResponse.json();
            const allJobs: JobDetailPanelType[] = allJobsResponse.offers;
            const postulesResponse = await fetch(`/api/postulation/${userId}`, {
                method: "GET",
            });
            const postulesData = await postulesResponse.json();
            const postules: PostuledJobs[] = postulesData.postulations;
            setPostuledData(postules);
            const userPostedJobs = allJobs.filter(job =>
                postules.some(postule => Number(postule.offerId) === job.id)
            );
            setPostedJobs(userPostedJobs);

        } catch (error) {
            console.error("Error cargando postulaciones:", error);
            toast.error("Error al cargar las postulaciones");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchPostuledJobs();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Mis Postulaciones
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Debes iniciar sesión para ver tus postulaciones
                    </p>
                    <Link href="/auth/login">
                        <Button>Iniciar Sesión</Button>
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
                        Mis Postulaciones
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Mis Postulaciones
                    </h1>
                    <p className="text-gray-600">
                        Total de ofertas: <span className="font-semibold">{postedJobs.length}</span>
                    </p>
                </div>
                {postedJobs.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                No hay postulaciones
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Aún no te has postulado a ninguna oferta. ¡Explora las oportunidades disponibles!
                            </p>
                            <Button
                                onClick={() => router.push("/postulations")}
                            >Ver Ofertas Disponibles</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {postedJobs.map((job) => {
                            const postulation = postuledData.find(p => p.offerId === job.id);
                            const postedDate = job.publicationDate ? new Date(job.publicationDate).toLocaleDateString('es-ES') : 'N/A';
                            return (
                                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg">{job.title}</CardTitle>
                                                <CardDescription>{job.subTitle}</CardDescription>
                                            </div>
                                            <Badge variant={postulation?.applyed ? "default" : "secondary"}>
                                                {postulation?.applyed ? "Postulado" : "Pendiente"}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4 h-full">
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
                                                <Clock size={16} className="text-orange-600 shrink-0" />
                                                <span className="truncate">{job.journey}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t">
                                            <Calendar size={16} />
                                            <span>Publicado: {postedDate}</span>
                                        </div>
                                        <div className="flex gap-2 pt-4 justify-end">
                                            <Button variant="outline" className="w-full">
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
