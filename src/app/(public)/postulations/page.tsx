"use client";

import { useState } from "react";
import { JobCard } from "@/components/postulations/JobCard";
import { JobDetailPanel } from "@/components/postulations/JobDetailPanel";
import { FilterBar } from "@/components/postulations/FilterBar";

// Mock data de postulaciones
const mockPostulations = [
    {
        id: 1,
        title: "Todero",
        subtitle: "Jardinero Urgente",
        company: "Importante empresa del sector",
        location: "Santa Marta, Magdalena",
        type: "Contrato de Obra o labor",
        schedule: "Tiempo Completo",
        modality: "Presencial",
        salary: "$ 1.423.500,00 (Mensual)",
        postedTime: "Hace 43 minutos",
        featured: true,
        urgent: false,
        rating: null
    },
    {
        id: 2,
        title: "Asesor Comercial - Sector Ferretero, Herramientas y tornillos",
        subtitle: "",
        company: "Manpower Group Colombia",
        location: "Santa Marta, Magdalena",
        type: "Contrato Fijo",
        schedule: "Tiempo Completo",
        modality: "Presencial",
        salary: "$ 2.740.000,00 (Mensual)",
        postedTime: "Hace 1 hora",
        featured: false,
        urgent: true,
        rating: 4.6
    },
    {
        id: 3,
        title: "Practicante de Administracion de empresas",
        subtitle: "",
        company: "envía",
        location: "Santa Marta, Magdalena",
        type: "Contrato de Aprendizaje",
        schedule: "Tiempo Completo",
        modality: "Presencial",
        salary: "$ 1.423.500,00 (Mensual)",
        postedTime: "Hace 4 horas",
        featured: false,
        urgent: false,
        rating: 4.5
    },
    {
        id: 4,
        title: "Desarrollador Full Stack",
        subtitle: "React + Node.js",
        company: "Tech Solutions SAS",
        location: "Santa Marta, Magdalena",
        type: "Contrato Indefinido",
        schedule: "Tiempo Completo",
        modality: "Remoto",
        salary: "$ 4.500.000,00 (Mensual)",
        postedTime: "Hace 2 días",
        featured: true,
        urgent: false,
        rating: 4.8
    },
    {
        id: 5,
        title: "Chef de Cocina",
        subtitle: "",
        company: "Restaurante Gourmet",
        location: "Santa Marta, Magdalena",
        type: "Contrato Fijo",
        schedule: "Tiempo Completo",
        modality: "Presencial",
        salary: "$ 2.200.000,00 (Mensual)",
        postedTime: "Hace 1 día",
        featured: false,
        urgent: true,
        rating: 4.3
    }
];

export default function PostulationsPage() {
    const [selectedJob, setSelectedJob] = useState(mockPostulations[0]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Filtros superiores */}
                <FilterBar />

                {/* Contador de ofertas */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        <strong>{mockPostulations.length}</strong> Ofertas de empleo en Santa Marta, Magdalena
                    </p>
                </div>

                {/* Grid de postulaciones */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Lista de postulaciones */}
                    <div className="space-y-4">
                        {mockPostulations.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onClick={() => setSelectedJob(job)}
                            />
                        ))}
                    </div>

                    {/* Panel de detalles */}
                    <div className="hidden lg:block sticky top-4 h-fit">
                        <JobDetailPanel job={selectedJob} />
                    </div>
                </div>
            </div>
        </div>
    );
}
