"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Briefcase, MapPin, DollarSign, Clock, Users, FileText, Building2, Calendar, Loader } from "lucide-react";
import { CreateJobFormData } from "@/types/jobs/CreateJob.types";
import { useCompanyStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateJobPage() {
    const { company } = useCompanyStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CreateJobFormData>({
        title: "",
        subTitle: "",
        company: company?.name || "",
        location: "Santa Marta, Magdalena",
        contractType: "",
        schedule: "",
        modality: "",
        salary: 0,
        paymentType: "",
        categoryId: 0,
        yearsExperience: 0,
        journey: "",
        description: "",
        requeriments: "",
        benefits: "",
        availablePlaces: 1,
        status: 'activo',
        publicationDate: new Date().toISOString().split('T')[0],
        closingDate: "",
        companyId: company?.id || "",
    });

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            // Convertir datos al formato esperado por el backend
            const dataToSend = {
                title: formData.title,
                subTitle: formData.subTitle,
                description: formData.description,
                modality: formData.modality,
                salary: Number(formData.salary),
                requeriments: formData.requeriments,
                benefits: formData.benefits,
                yearsExperience: Number(formData.yearsExperience),
                location: formData.location,
                journey: formData.journey,
                schedule: formData.schedule,
                availablePlaces: Number(formData.availablePlaces),
                status: formData.status,
                contractType: formData.contractType,
                paymentType: formData.paymentType,
                publicationDate: new Date(formData.publicationDate).toISOString(),
                closingDate: new Date(formData.closingDate).toISOString(),
                companyId: formData.companyId,
                categoryId: Number(formData.categoryId),
            };
            
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ offer: dataToSend }),
            });
            if(response.status === 400) {
                toast.error("Error al crear la oferta. Posibles datos incompletos.");
                return;
            }
            if(response.ok) {
                toast.success("Oferta creada con éxito.");
                router.push("/jobs/my-jobs");
                return;
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error("Error al crear la oferta:", error);
            toast.error("Error al crear la oferta.");
        }
        finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if(!company) {
        toast("Debes iniciar sesión como empresa para crear una oferta de empleo.");
        router.push("/");
    }

    if(loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <Loader className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Crear Oferta de Empleo
                    </h1>
                    <p className="text-gray-600">
                        Completa el formulario para publicar una nueva oportunidad laboral
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                Información Básica
                            </CardTitle>
                            <CardDescription>
                                Datos principales de la oferta de empleo
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título del puesto *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Ej: Desarrollador Full Stack"
                                        value={formData.title}
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subTitle">Subtítulo (opcional)</Label>
                                    <Input
                                        id="subTitle"
                                        placeholder="Ej: React + Node.js"
                                        value={formData.subTitle}
                                        onChange={(e) => handleChange("subTitle", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company" className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        Empresa *
                                    </Label>
                                    <Input
                                        id="company"
                                        placeholder="Nombre de la empresa"
                                        value={formData.company}
                                        onChange={(e) => handleChange("company", e.target.value)}
                                        required
                                        disabled
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Ubicación *
                                    </Label>
                                    <Input
                                        id="location"
                                        placeholder="Ciudad, Departamento"
                                        value={formData.location}
                                        required
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="categoryId">Categoría *</Label>
                                <Select
                                    value={formData.categoryId.toString()}
                                    onValueChange={(value) => handleChange("categoryId", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Temporal</SelectItem>
                                        <SelectItem value="2">Medio tiempo</SelectItem>
                                        <SelectItem value="3">Tecnología</SelectItem>
                                        <SelectItem value="4">Administración</SelectItem>
                                        <SelectItem value="5">Salud</SelectItem>
                                        <SelectItem value="6">Educación</SelectItem>
                                        <SelectItem value="7">Marketing y Comunicación</SelectItem>
                                        <SelectItem value="8">Ingeniería</SelectItem>
                                        <SelectItem value="9">Ciencias Ambientales</SelectItem>
                                        <SelectItem value="10">Turismo y Hotelería</SelectItem>
                                        <SelectItem value="11">Logística y Operaciones</SelectItem>
                                        <SelectItem value="12">Arte y Cultura</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detalles del Empleo */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Detalles del Empleo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contractType">Tipo de contrato *</Label>
                                    <Select
                                        value={formData.contractType}
                                        onValueChange={(value) => handleChange("contractType", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Contrato Indefinido">Contrato Indefinido</SelectItem>
                                            <SelectItem value="Contrato Fijo">Contrato Fijo</SelectItem>
                                            <SelectItem value="Contrato de Obra o labor">Contrato de Obra o labor</SelectItem>
                                            <SelectItem value="Contrato de Aprendizaje">Contrato de Aprendizaje</SelectItem>
                                            <SelectItem value="Por Proyecto">Por Proyecto</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="schedule">Horario *</Label>
                                    <Input
                                        id="schedule"
                                        placeholder="Ej: Lunes a Viernes 8am - 5pm"
                                        value={formData.schedule}
                                        onChange={(e) => handleChange("schedule", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="modality">Modalidad *</Label>
                                    <Select
                                        value={formData.modality}
                                        onValueChange={(value) => handleChange("modality", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona la modalidad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Presencial">Presencial</SelectItem>
                                            <SelectItem value="Remoto">Remoto</SelectItem>
                                            <SelectItem value="Hibrido">Híbrido</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="journey">Jornada *</Label>
                                    <Select
                                        value={formData.journey}
                                        onValueChange={(value) => handleChange("journey", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona la jornada" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Tiempo completo">Tiempo completo</SelectItem>
                                            <SelectItem value="Medio tiempo">Medio tiempo</SelectItem>
                                            <SelectItem value="Flexible">Flexible</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="yearsExperience" className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Experiencia requerida (años) *
                                </Label>
                                <Input
                                    id="yearsExperience"
                                    type="number"
                                    placeholder="Ej: 3"
                                    min="0"
                                    value={formData.yearsExperience}
                                    onChange={(e) => handleChange("yearsExperience", e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Compensación */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5" />
                                Compensación
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="salary">Salario *</Label>
                                    <Input
                                        id="salary"
                                        type="number"
                                        placeholder="Ej: 2500000"
                                        value={formData.salary}
                                        onChange={(e) => handleChange("salary", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="paymentType">Tipo de pago *</Label>
                                    <Select
                                        value={formData.paymentType}
                                        onValueChange={(value) => handleChange("paymentType", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Frecuencia de pago" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Mensual">Mensual</SelectItem>
                                            <SelectItem value="Quincenal">Quincenal</SelectItem>
                                            <SelectItem value="Semanal">Semanal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="availablePlaces">Vacantes disponibles *</Label>
                                    <Input
                                        id="availablePlaces"
                                        type="number"
                                        placeholder="Ej: 3"
                                        min="1"
                                        value={formData.availablePlaces}
                                        onChange={(e) => handleChange("availablePlaces", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vigencia de la Convocatoria */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Vigencia de la Convocatoria
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="closingDate">Fecha de Cierre *</Label>
                                <Input
                                    id="closingDate"
                                    type="date"
                                    value={formData.closingDate}
                                    onChange={(e) => handleChange("closingDate", e.target.value)}
                                    min={formData.publicationDate}
                                    required
                                />
                                <p className="text-xs text-gray-500">Selecciona hasta cuándo estará abierta la convocatoria</p>
                            </div>

                            {formData.closingDate && (
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-semibold">Convocatoria activa por:</span> {
                                            Math.ceil(
                                                (new Date(formData.closingDate).getTime() - new Date(formData.publicationDate).getTime()) / (1000 * 60 * 60 * 24)
                                            )
                                        } días
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Descripción y Requisitos */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Descripción y Requisitos
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción del puesto *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe las responsabilidades y tareas principales del puesto..."
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    rows={5}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="requeriments">Requisitos *</Label>
                                <Textarea
                                    id="requeriments"
                                    placeholder="Lista los requisitos y habilidades necesarias para el puesto..."
                                    value={formData.requeriments}
                                    onChange={(e) => handleChange("requeriments", e.target.value)}
                                    rows={5}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="benefits">Beneficios (opcional)</Label>
                                <Textarea
                                    id="benefits"
                                    placeholder="Describe los beneficios adicionales que ofrece la empresa..."
                                    value={formData.benefits}
                                    onChange={(e) => handleChange("benefits", e.target.value)}
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Botones de acción */}
                    <div className="flex gap-4 justify-end">
                        <Button type="button" variant="outline" size="lg">
                            Cancelar
                        </Button>
                        <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
                            Publicar Oferta
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
