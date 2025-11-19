"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/app/store/userStore";
import { JobDetailPanelType } from "@/types/jobs/JobDetailPanel.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, DollarSign, Briefcase, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
    const { user } = useUserStore();
    const [favoriteJobs, setFavoriteJobs] = useState<JobDetailPanelType[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchFavorites = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const userId = user.id;

            // Fetch all jobs
            const jobsResponse = await fetch("/api/offers");
            const allJobs: JobDetailPanelType[] = await jobsResponse.json();

            // Fetch user's favorite IDs
            const favoritesResponse = await fetch(`/api/favorites/${userId}`, {
                method: "GET",
            });
            const favoriteJobIds: number[] = await favoritesResponse.json();
            setFavoriteIds(favoriteJobIds);

            // Filter jobs to only show those the user has favorited
            const userFavoriteJobs = allJobs.filter(job =>
                favoriteJobIds.includes(job.id)
            );

            setFavoriteJobs(userFavoriteJobs);
        } catch (error) {
            console.error("Error cargando favoritos:", error);
            toast.error("Error al cargar los favoritos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const handleRemoveFavorite = (jobId: number) => {
        setFavoriteIds(favoriteIds.filter(id => id !== jobId));
        setFavoriteJobs(favoriteJobs.filter(job => job.id !== jobId));
        toast.success("Removido de favoritos");
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Mis Favoritos
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Debes iniciar sesión para ver tus favoritos
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
                        Mis Favoritos
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
                        Mis Favoritos
                    </h1>
                    <p className="text-gray-600">
                        Total de ofertas: <span className="font-semibold">{favoriteJobs.length}</span>
                    </p>
                </div>

                {favoriteJobs.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                No hay favoritos
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Aún no has agregado ninguna oferta a favoritos. ¡Comienza a explorar!
                            </p>
                            <Button
                                onClick={() => router.push("/postulations")}
                            >
                                Ver Ofertas Disponibles
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteJobs.map((job) => {
                            const postedDate = job.publicationDate ? new Date(job.publicationDate).toLocaleDateString('es-ES') : 'N/A';

                            return (
                                <Card key={job.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                                    <div className="p-4 bg-linear-to-r from-red-50 to-pink-50 border-b">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                                                <p className="text-sm text-gray-600">{job.subTitle}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFavorite(job.id)}
                                                className="shrink-0 ml-2"
                                            >
                                                <Heart
                                                    size={24}
                                                    className="fill-red-500 text-red-500 hover:opacity-80 transition-opacity"
                                                />
                                            </button>
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
                                                <Clock size={16} className="text-orange-600 shrink-0" />
                                                <span className="truncate">{job.journey}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t">
                                            <Calendar size={16} />
                                            <span>Publicado: {postedDate}</span>
                                        </div>

                                        <div className="flex gap-2 pt-4">
                                            <Link href={`/postulations?jobId=${job.id}`} className="flex-1">
                                                <Button className="w-full">
                                                    Ver Detalles
                                                </Button>
                                            </Link>
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
