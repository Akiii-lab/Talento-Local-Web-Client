"use client";

import { useState, useEffect } from "react";
import { JobCard } from "@/components/postulations/JobCard";
import { JobDetailPanel } from "@/components/postulations/JobDetailPanel";
import { FilterBar } from "@/components/postulations/FilterBar";
import { JobDetailPanelType, PostuledJobs } from "@/types/jobs/JobDetailPanel.types";
import { useUserStore } from "@/app/store/userStore";


export default function PostulationsPage() {
    const { user } = useUserStore();
    const [jobs, setJobs] = useState<JobDetailPanelType[]>([]);
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

    const fetchJobs = async () => {
        try {
            const response = await fetch("/api/offers");
            const data = await response.json();
            setJobs(data);
            if (data.length > 0) {
                setSelectedJob(data[0]);
            }
        } catch (error) {
            console.error("Error cargando ofertas:", error);
        }
    };

    const fetchPostuledJobs = async () => {
        if (!user) return;
        try {
            const userId = user.id;
            console.log("Fetching postuled jobs for user:", userId);
            const response = await fetch(`/api/postulation/${userId}`, {
                method: "GET",
            });
            const data = await response.json();
            setPostuledJobs(data);
        } catch (error) {
            console.error("Error cargando postulaciones:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
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

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {filteredPostulations.map((job) => (
                            <JobCard
                                key={job.id || Math.random()}
                                job={job as JobDetailPanelType}
                                onClick={() => setSelectedJob(job)}
                                className={selectedJob && selectedJob.id === job.id ? "border-blue-500 border-2" : ""}
                            />
                        ))}
                    </div>
                    <div className="hidden lg:block sticky top-4 h-fit">
                        {/*TODO: arreglar los arrays de postuled jobs no aplica la oferta*/}
                        {selectedJob && <JobDetailPanel job={selectedJob} postuledJob={postuledJobs.find(p => p.offerId === selectedJob.id)} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
