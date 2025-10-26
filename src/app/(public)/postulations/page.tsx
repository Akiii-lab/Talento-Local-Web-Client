"use client";

import { useState } from "react";
import { JobCard } from "@/components/postulations/JobCard";
import { JobDetailPanel } from "@/components/postulations/JobDetailPanel";
import { FilterBar } from "@/components/postulations/FilterBar";
import { JobCardType } from "@/types/postulations/JobCard.types";

// Mock data de postulaciones
const mockPostulations: JobCardType[] = [
    {
        id: 1,
        title: "Todero",
        subtitle: "Jardinero Urgente",
        company: "Importante empresa del sector",
        location: "Santa Marta, Magdalena",
        type: "Contrato de Obra o labor",
        schedule: "Tiempo Completo",
        modality: "Presencial",
        salary: 1423500,
        payType: 'Mensual',
        postedTime: "Hace 43 minutos",
        postedDate: new Date(Date.now() - 43 * 60 * 1000), // 43 minutos atrás
        featured: true,
        urgent: false,
        rating: null,
        category: "servicios",
        experience: 0, // sin experiencia
        jornada: "completo",
        description: "Sé parte de Nuestro Equipo de trabajo en la empresa líder en Aseo y Mantenimiento, buscamos todero-jardinero en la ciudad de Santa Marta para incorporarse de forma inmediata.",
        requirements: "- Desarrollar los servicios de mantenimiento locativo como resane, enchape, pintura, plomería, según lo asignado por los superiores y jefes, con capacitación en alturas y diligenciamiento de formatos establecidos para cada actividad.\n- Mantenimiento y cuidado de jardines, parques y áreas verdes.\n- Planificación y ejecución de tareas de poda, riego, fertilización y control de malezas, limpieza y rastrillado, recortes, abonado, conservación de trabajo.",
        benefits: "Disponibilidad: Lunes a Domingo, salario $ 1.423.500 + Aux transp (200.000) + Prestaciones Sociales, Contrato Fijo"
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
        salary: 2740000,
        payType: 'Quincenal',
        postedTime: "Hace 1 hora",
        postedDate: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hora atrás
        featured: false,
        urgent: true,
        rating: 4.6,
        category: "ventas",
        experience: 1,
        jornada: "completo",
        description: "Buscamos asesor comercial con experiencia en el sector ferretero para unirse a nuestro equipo de ventas. El candidato ideal debe tener habilidades de comunicación excepcionales y conocimiento de productos de ferretería, herramientas y tornillería.",
        requirements: "- Mínimo 1 año de experiencia en ventas.\n- Conocimiento del sector ferretero y de herramientas.\n- Excelentes habilidades de comunicación y negociación.\n- Capacidad para trabajar bajo presión y alcanzar metas de ventas.\n- Bachiller completo.",
        benefits: "Salario base + comisiones por ventas. Prestaciones de ley. Ambiente laboral dinámico."
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
        salary: 1423500,
        payType: 'Semanal',
        postedTime: "Hace 4 horas",
        postedDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
        featured: false,
        urgent: false,
        rating: 4.5,
        category: "admin",
        experience: 0, // sin experiencia
        jornada: "completo",
        description: "Oportunidad de práctica profesional para estudiantes de Administración de Empresas. Aprenderás sobre gestión empresarial, procesos administrativos y trabajo en equipo en un ambiente profesional.",
        requirements: "- Ser estudiante activo de Administración de Empresas (últimos semestres).\n- Disponibilidad de tiempo completo.\n- Manejo básico de Microsoft Office.\n- Actitud proactiva y ganas de aprender.\n- No se requiere experiencia previa.",
        benefits: "Apoyo de sostenimiento según la ley. Seguridad social. Certificación de práctica. Oportunidad de vinculación laboral."
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
        salary: 4500000,
        payType: 'Mensual',
        postedTime: "Hace 2 días",
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
        featured: true,
        urgent: false,
        rating: 4.8,
        category: "tecnologia",
        experience: 3,
        jornada: "completo",
        description: "Buscamos desarrollador Full Stack con experiencia en React y Node.js para unirse a nuestro equipo de desarrollo. Trabajarás en proyectos innovadores utilizando las últimas tecnologías y metodologías ágiles.",
        requirements: "- 3+ años de experiencia en desarrollo web.\n- Dominio de React.js y Node.js.\n- Experiencia con bases de datos SQL y NoSQL.\n- Conocimiento de Git y metodologías ágiles.\n- Inglés intermedio.\n- Experiencia con TypeScript es un plus.",
        benefits: "Trabajo 100% remoto. Horario flexible. Capacitaciones continuas. Bono de rendimiento. Días de cumpleaños libres."
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
        salary: 2200000,
        payType: 'Quincenal',
        postedTime: "Hace 1 día",
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
        featured: false,
        urgent: true,
        rating: 4.3,
        category: "servicios",
        experience: 2,
        jornada: "completo",
        description: "Restaurante gourmet busca chef de cocina con experiencia en cocina internacional y local. Debes ser creativo, organizado y capaz de liderar un equipo de cocina.",
        requirements: "- Mínimo 2 años de experiencia como chef.\n- Conocimiento de cocina internacional y local.\n- Capacidad de liderazgo y trabajo en equipo.\n- Manipulación de alimentos certificada.\n- Creatividad en la preparación de platos.",
        benefits: "Propinas. Comida incluida. Prestaciones de ley. Ambiente de trabajo profesional."
    },
    {
        id: 6,
        title: "Diseñador Gráfico",
        subtitle: "Freelance",
        company: "Agencia Creativa",
        location: "Santa Marta, Magdalena",
        type: "Por Proyecto",
        schedule: "Medio Tiempo",
        modality: "Remoto",
        salary: 1800000,
        payType: 'Mensual',
        postedTime: "Hace 5 días",
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        featured: false,
        urgent: false,
        rating: 4.2,
        category: "tecnologia",
        experience: 2,
        jornada: "parcial",
        description: "Agencia creativa busca diseñador gráfico freelance para proyectos de branding, publicidad digital y diseño web. Trabajo por proyectos con flexibilidad horaria.",
        requirements: "- 2 años de experiencia en diseño gráfico.\n- Dominio de Adobe Creative Suite (Photoshop, Illustrator, InDesign).\n- Portafolio de trabajos previos.\n- Conocimientos básicos de diseño web.\n- Creatividad y atención al detalle.",
        benefits: "Trabajo remoto. Horario flexible. Pago por proyecto. Ambiente creativo y colaborativo."
    },
    {
        id: 7,
        title: "Contador Público",
        subtitle: "",
        company: "Contadores Asociados",
        location: "Santa Marta, Magdalena",
        type: "Contrato Indefinido",
        schedule: "Tiempo Completo",
        modality: "Hibrido",
        salary: 3200000,
        payType: 'Mensual',
        postedTime: "Hace 20 días",
        postedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        featured: false,
        urgent: false,
        rating: 4.7,
        category: "admin",
        experience: 3,
        jornada: "completo",
        description: "Firma contable busca contador público con experiencia para manejar la contabilidad de múltiples clientes. Modalidad híbrida con flexibilidad de trabajo remoto.",
        requirements: "- Título de Contador Público con tarjeta profesional vigente.\n- 3+ años de experiencia en contabilidad.\n- Conocimiento de normas tributarias colombianas.\n- Manejo de software contable (SIIGO, World Office).\n- Experiencia en declaraciones de renta y presentación de informes.",
        benefits: "Modalidad híbrida. Prestaciones de ley. Prima extralegal. Capacitaciones continuas en normatividad contable."
    },
    {
        id: 8,
        title: "Mesero",
        subtitle: "Experiencia no requerida",
        company: "Restaurante El Mar",
        location: "Santa Marta, Magdalena",
        type: "Contrato Fijo",
        schedule: "Horario Flexible",
        modality: "Presencial",
        salary: 1300000,
        payType: 'Quincenal',
        postedTime: "Hace 2 horas",
        postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        featured: false,
        urgent: true,
        rating: 3.9,
        category: "servicios",
        experience: 0, // sin experiencia
        jornada: "flexible",
        description: "Restaurante frente al mar busca meseros con actitud de servicio y ganas de aprender. No se requiere experiencia previa, ofrecemos capacitación.",
        requirements: "- Actitud positiva y orientación al servicio al cliente.\n- Disponibilidad de horarios flexibles (incluye fines de semana).\n- Buena presentación personal.\n- Capacidad de trabajo bajo presión.\n- No se requiere experiencia previa, se ofrece capacitación.",
        benefits: "Propinas diarias. Comida incluida. Prestaciones de ley. Ambiente de trabajo agradable frente al mar."
    }
];

export default function PostulationsPage() {
    const [selectedJob, setSelectedJob] = useState(mockPostulations[0]);
    const [orderBy, setOrderBy] = useState("recientes");
    const [payType, setPayType] = useState("");
    const [minSalary, setMinSalary] = useState(0);
    const [dateFilter, setDateFilter] = useState("cualquiera");
    const [workplace, setWorkplace] = useState("todos");
    const [experienceFilter, setExperienceFilter] = useState<number | null>(null);
    const [jornadaFilter, setJornadaFilter] = useState("cualquiera");
    const [categoryFilter, setCategoryFilter] = useState("todas");

    // Filtrar y ordenar postulaciones
    const filteredPostulations = mockPostulations
        // Filtro de tipo de pago
        .filter(job => (payType ? job.payType === payType : true))
        // Filtro de salario mínimo
        .filter(job => job.salary >= minSalary)
        // Filtro de fecha
        .filter(job => {
            if (dateFilter === "cualquiera") return true;
            if (dateFilter === "urgente") return job.urgent;
            
            const now = Date.now();
            const diff = now - job.postedDate.getTime();
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
            if (workplace === "hibrido") return job.modality === "Hibrido";
            return true;
        })
        // Filtro de experiencia
        .filter(job => {
            if (experienceFilter === null) return true;
            return job.experience === experienceFilter;
        })
        // Filtro de jornada
        .filter(job => {
            if (jornadaFilter === "cualquiera") return true;
            return job.jornada === jornadaFilter;
        })
        // Filtro de categoría
        .filter(job => {
            if (categoryFilter === "todas") return true;
            return job.category === categoryFilter;
        })
        // Ordenar
        .sort((a, b) => {
            if (orderBy === "salario") return b.salary - a.salary;
            if (orderBy === "empresa") return a.company.localeCompare(b.company);
            return 0; // recientes: ya están mockeados en orden
        });

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Filtros superiores */}
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

                {/* Contador de ofertas */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        <strong>{filteredPostulations.length}</strong> Ofertas de empleo en Santa Marta, Magdalena
                    </p>
                </div>

                {/* Grid de postulaciones */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Lista de postulaciones */}
                    <div className="space-y-4">
                        {filteredPostulations.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onClick={() => setSelectedJob(job)}
                                className={selectedJob.id === job.id ? "border-blue-500 border-2" : ""}
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
