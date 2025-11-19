import { JobDetailPanelType } from "@/types/jobs/JobDetailPanel.types";

//TODO: esto corresponde al grupo carlos romero, etc.
export async function GET() {

    const response: JobDetailPanelType[] = [
        {
            "id": 1,
            "title": "Desarrollador Backend .NET",
            "subTitle": "Proyecto FinTech en expansión",
            "description": "Buscamos un desarrollador backend con experiencia en .NET Core, SQL Server y Azure. Formarás parte de un equipo ágil construyendo nuevas funcionalidades para una plataforma financiera.",
            "modality": "Remoto",
            "salary": 4500,
            "requeriments": "Experiencia de 2+ años en .NET Core. Conocimientos en API REST, EF Core, SQL Server y Git. Deseable experiencia en Azure DevOps.",
            "benefits": "Seguro médico, horario flexible, trabajo remoto, capacitaciones internas.",
            "yearsExperience": 2,
            "location": "Lima, Perú",
            "journey": "Tiempo completo",
            "schedule": "Lunes a viernes de 9:00 am a 6:00 pm",
            "availablePlaces": 2,
            "status": "Urgente",
            "contractType": "Indeterminado",
            "paymentType": "Mensual",
            "publicationDate": "2025-11-14T05:25:35.797",
            "closingDate": "2025-12-14T05:25:35.797",
            "companyId": 3,
            "categoryId": 1
        },
        {
            "id": 2,
            "title": "Diseñador UI/UX Senior",
            "subTitle": "Producto SaaS en crecimiento",
            "description": "Buscamos un diseñador UI/UX con experiencia en diseño de interfaces modernas, creación de prototipos y pruebas de usabilidad. Trabajarás en un entorno ágil desarrollando funcionalidades clave para una plataforma SaaS.",
            "modality": "Híbrido",
            "salary": 5200,
            "requeriments": "3+ años de experiencia como UI/UX. Dominio de Figma, Design Systems y prototipado. Conocimientos de accesibilidad y UX Research.",
            "benefits": "Sueldo competitivo, línea de carrera, capacitaciones, snacks en oficina y días libres adicionales.",
            "yearsExperience": 3,
            "location": "Bogotá, Colombia",
            "journey": "Tiempo completo",
            "schedule": "Lunes a viernes de 8:30 am a 6:00 pm",
            "availablePlaces": 1,
            "status": "Activo",
            "contractType": "Contrato a plazo fijo",
            "paymentType": "Mensual",
            "publicationDate": "2025-11-14T05:30:35.797",
            "closingDate": "2025-12-20T05:30:35.797",
            "companyId": 5,
            "categoryId": 2
        },
        {
            "id": 3,
            "title": "Diseñador UI/UX Senior",
            "subTitle": "Producto SaaS en crecimiento",
            "description": "Buscamos un diseñador UI/UX con experiencia en diseño de interfaces modernas, creación de prototipos y pruebas de usabilidad. Trabajarás en un entorno ágil desarrollando funcionalidades clave para una plataforma SaaS.",
            "modality": "Híbrido",
            "salary": 5200,
            "requeriments": "3+ años de experiencia como UI/UX. Dominio de Figma, Design Systems y prototipado. Conocimientos de accesibilidad y UX Research.",
            "benefits": "Sueldo competitivo, línea de carrera, capacitaciones, snacks en oficina y días libres adicionales.",
            "yearsExperience": 3,
            "location": "Bogotá, Colombia",
            "journey": "Tiempo completo",
            "schedule": "Lunes a viernes de 8:30 am a 6:00 pm",
            "availablePlaces": 1,
            "status": "Destacado",
            "contractType": "Contrato a plazo fijo",
            "paymentType": "Mensual",
            "publicationDate": "2025-11-14T05:30:35.797",
            "closingDate": null,
            "companyId": 5,
            "categoryId": 2
        },
        {
            "id": 4,
            "title": "Analista de Datos Junior",
            "subTitle": "Proyecto de análisis predictivo",
            "description": "Estamos en búsqueda de un Analista de Datos Junior para apoyar en el desarrollo de modelos predictivos, dashboards y reportes de negocio. Formarás parte del equipo de Business Intelligence en una empresa tecnológica en crecimiento.",
            "modality": "Remoto",
            "salary": 3500,
            "requeriments": "Conocimientos en SQL, Power BI o Tableau. Experiencia básica en Python para análisis de datos. Habilidad para interpretar datos y comunicar resultados.",
            "benefits": "Plan de salud, capacitaciones continuas, horario flexible, oportunidad de crecimiento profesional.",
            "yearsExperience": 1,
            "location": "Ciudad de México, México",
            "journey": "Tiempo completo",
            "schedule": "Lunes a viernes de 9:00 am a 6:00 pm",
            "availablePlaces": 1,
            "status": "Activo",
            "contractType": "Indeterminado",
            "paymentType": "Mensual",
            "publicationDate": "2025-11-14T05:54:55.073",
            "closingDate": null,
            "companyId": 1,
            "categoryId": 1
        }
    ]

    return new Response(JSON.stringify(response), { status: 200 });
}