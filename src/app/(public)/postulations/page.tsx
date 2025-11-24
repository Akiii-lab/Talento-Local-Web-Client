"use client";

import { useState, useEffect } from "react";
import { JobCard } from "@/components/postulations/JobCard";
import { JobDetailPanel } from "@/components/postulations/JobDetailPanel";
import { FilterBar } from "@/components/postulations/FilterBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { JobDetailPanelType, PostuledJobs } from "@/types/jobs/JobDetailPanel.types";
import { useCompanyStore, useUserStore } from "@/app/store/userStore";
import { toast } from "sonner";


export default function PostulationsPage() {
    const { user } = useUserStore();
    const { company } = useCompanyStore();
    const [jobs, setJobs] = useState<JobDetailPanelType[]>([]);
    const [loading, setLoading] = useState(true);
    const [postuledJobs, setPostuledJobs] = useState<PostuledJobs[]>([]);
    const [selectedJob, setSelectedJob] = useState<JobDetailPanelType | null>(null);
    const [orderBy, setOrderBy] = useState("recientes");
    const [payType, setPayType] = useState("");
    const [minSalary, setMinSalary] = useState(0);
    const [dateFilter, setDateFilter] = useState("cualquiera");
    const [workplace, setWorkplace] = useState("todos");
    const [experienceFilter, setExperienceFilter] = useState<number | null>(null);
    const [jornadaFilter, setJornadaFilter] = useState("cualquiera");
    const [categoryFilter, setCategoryFilter] = useState("todas");
    const [currentPage, setCurrentPage] = useState(1);
    const JOBS_PER_PAGE = 3;

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const userid = user ? user.id : company ? company.id : null;
            const response = await fetch("/api/offers", {
                method: "POST",
                body: JSON.stringify({ userid }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (!data.ok) {
                throw new Error();
            }
            const jobsArray = Array.isArray(data.offers) ? data.offers : [];
            setJobs(jobsArray);
            if (jobsArray.length > 0) {
                setSelectedJob(jobsArray[0]);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchPostuledJobs = async () => {
        if (!user) return;
        try {
            const userId = user.id;
            const response = await fetch(`/api/postulation/${userId}`, {
                method: "GET",
            });
            console.log("Response status fetching postuled jobs:", response.status);
            const data = await response.json();
            setPostuledJobs(data.postulations || []);
            if (!response.ok) {
                throw new Error();
            }
        } catch (error) {
            console.error("Error fetching postuled jobs:", error);
            toast.error("Error cargando postulaciones. Es posible que sus postulaciones no se muestren correctamente.");
        }
    };

    const handlefavorite = async (jobId: number) => {

    }

    useEffect(() => {
        fetchJobs();
        if (user) {
            fetchPostuledJobs();
        }
    }, [user]);

    // Filtrar y ordenar postulaciones
    const filteredPostulations = jobs
        // Filtro de tipo de pago
        .filter(job => (payType ? job.paymentType === payType : true))
        // Filtro de salario mínimo
        .filter(job => job.salary >= minSalary)
        // Filtro de fecha
        .filter(job => {
            if (dateFilter === "cualquiera") return true;

            const publicationDate = job.publicationDate;
            if (!publicationDate) return true;

            const now = Date.now();
            const jobDate = new Date(publicationDate).getTime();
            const diff = now - jobDate;
            const hours = diff / (1000 * 60 * 60);
            const days = diff / (1000 * 60 * 60 * 24);

            if (dateFilter === "hoy") return hours <= 24;
            if (dateFilter === "3dias") return days <= 3;
            if (dateFilter === "semana") return days <= 7;
            if (dateFilter === "15dias") return days <= 15;
            if (dateFilter === "mes") return days <= 30;

            return true;
        })
        // Filtro de lugar de trabajo (modalidad)
        .filter(job => {
            if (workplace === "todos") return true;
            if (workplace === "presencial") return job.modality === "Presencial";
            if (workplace === "remoto") return job.modality === "Remoto";
            if (workplace === "híbrido") return job.modality === "Híbrido";
            return true;
        })
        // Filtro de experiencia
        .filter(job => {
            if (experienceFilter === null) return true;
            return job.yearsExperience === experienceFilter;
        })
        // Filtro de jornada
        .filter(job => {
            if (jornadaFilter === "cualquiera") return true;
            return job.journey === jornadaFilter;
        })
        // Filtro de categoría
        .filter(job => {
            if (categoryFilter === "todas") return true;
            return job.categoryId.toString() === categoryFilter;
        })
        // Ordenar
        .sort((a, b) => {
            if (orderBy === "salario") return b.salary - a.salary;
            if (orderBy === "recientes") {
                return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
            }
            return 0;
        });

    const totalPages = Math.ceil(filteredPostulations.length / JOBS_PER_PAGE);
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    const paginatedJobs = filteredPostulations.slice(startIndex, startIndex + JOBS_PER_PAGE);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto flex flex-col">
                <FilterBar
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    payType={payType}
                    setPayType={setPayType}
                    minSalary={minSalary}
                    setMinSalary={setMinSalary}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    workplace={workplace}
                    setWorkplace={setWorkplace}
                    experienceFilter={experienceFilter}
                    setExperienceFilter={setExperienceFilter}
                    jornadaFilter={jornadaFilter}
                    setJornadaFilter={setJornadaFilter}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                />
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        <strong>{filteredPostulations.length}</strong> Ofertas de empleo en Santa Marta, Magdalena
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                    <div className="space-y-4">
                        {loading ? (
                            <>
                                <div className="bg-white rounded-lg p-4 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                                <div className="bg-white rounded-lg p-4 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                                <div className="bg-white rounded-lg p-4 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </>
                        ) : (
                            paginatedJobs.map((job) => (
                                <JobCard
                                    key={job.id || Math.random()}
                                    job={job as JobDetailPanelType}
                                    onClick={() => setSelectedJob(job)}
                                    className={selectedJob && selectedJob.id === job.id ? "border-blue-500 border-2" : ""}
                                />
                            ))
                        )}
                    </div>
                    <div className="hidden lg:block sticky top-4 h-fit">
                        {loading ? (
                            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-8 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                    <Skeleton className="h-12 w-12 rounded" />
                                </div>
                                <Skeleton className="h-4 w-full" />
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-1/3" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                                <div className="space-y-3 border-t pt-4">
                                    <Skeleton className="h-6 w-1/3" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                                <div className="space-y-3 border-t pt-4">
                                    <Skeleton className="h-6 w-1/3" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 w-10" />
                                </div>
                            </div>
                        ) : (
                            <>
                                {selectedJob && <JobDetailPanel 
                                job={selectedJob} 
                                postuledJob={postuledJobs.find(p => p.offerId === selectedJob.id)} 
                                handlefavorite={handlefavorite}
                                />
                                }
                                <div className="flex gap-2 justify-center mt-4">
                                    <Button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        variant="outline"
                                        className="hover:cursor-pointer"
                                    >
                                        Anterior
                                    </Button>
                                    <span className="flex items-center px-4 text-sm text-gray-600">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <Button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        variant="outline"
                                        className="hover:cursor-pointer"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
