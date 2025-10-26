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
import { Briefcase, MapPin, DollarSign, Clock, Users, FileText, Building2 } from "lucide-react";
import { CreateJobFormData } from "@/types/jobs/CreateJob.types";

export default function CreateJobPage() {
    const [formData, setFormData] = useState<CreateJobFormData>({
        title: "",
        subtitle: "",
        company: "",
        location: "Santa Marta, Magdalena",
        type: "",
        schedule: "",
        modality: "",
        salary: "",
        payType: "",
        category: "",
        experience: "",
        jornada: "",
        description: "",
        requirements: "",
        benefits: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Datos del formulario:", formData);
        // Aquí iría la lógica para enviar los datos al backend
        alert("Oferta de empleo creada exitosamente!");
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

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
                    {/* Información Básica */}
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
                                    <Label htmlFor="subtitle">Subtítulo (opcional)</Label>
                                    <Input
                                        id="subtitle"
                                        placeholder="Ej: React + Node.js"
                                        value={formData.subtitle}
                                        onChange={(e) => handleChange("subtitle", e.target.value)}
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
                                <Label htmlFor="category">Categoría *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleChange("category", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                                        <SelectItem value="ventas">Ventas</SelectItem>
                                        <SelectItem value="admin">Administración</SelectItem>
                                        <SelectItem value="servicios">Servicios</SelectItem>
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
                                    <Label htmlFor="type">Tipo de contrato *</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(value) => handleChange("type", value)}
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
                                        placeholder="Ej: Tiempo Completo"
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
                                    <Label htmlFor="jornada">Jornada *</Label>
                                    <Select
                                        value={formData.jornada}
                                        onValueChange={(value) => handleChange("jornada", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona la jornada" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="completo">Tiempo completo</SelectItem>
                                            <SelectItem value="parcial">Medio tiempo</SelectItem>
                                            <SelectItem value="flexible">Flexible</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience" className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Experiencia requerida *
                                </Label>
                                <Select
                                    value={formData.experience}
                                    onValueChange={(value) => handleChange("experience", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Años de experiencia" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Sin experiencia</SelectItem>
                                        <SelectItem value="1">1 año</SelectItem>
                                        <SelectItem value="2">2 años</SelectItem>
                                        <SelectItem value="3">3+ años</SelectItem>
                                    </SelectContent>
                                </Select>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <Label htmlFor="payType">Tipo de pago *</Label>
                                    <Select
                                        value={formData.payType}
                                        onValueChange={(value) => handleChange("payType", value)}
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
                            </div>
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
                                <Label htmlFor="requirements">Requisitos *</Label>
                                <Textarea
                                    id="requirements"
                                    placeholder="Lista los requisitos y habilidades necesarias para el puesto..."
                                    value={formData.requirements}
                                    onChange={(e) => handleChange("requirements", e.target.value)}
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
