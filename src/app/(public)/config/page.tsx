"use client";

import { useState } from "react";
import { useUserStore } from "@/app/store/userStore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { UserData, CompanyData } from "@/types/user/user.types";
import { UserTypeSelector } from "@/components/configuracion/UserTypeSelector";
import { EmptyStateMessage } from "@/components/configuracion/EmptyStateMessage";
import { UserProfileTab } from "@/components/configuracion/UserProfileTab";
import { UserAccountTab } from "@/components/configuracion/UserAccountTab";
import { UserPrivacyTab } from "@/components/configuracion/UserPrivacyTab";
import { CompanyProfileTab } from "@/components/configuracion/CompanyProfileTab";
import { CompanyAccountTab } from "@/components/configuracion/CompanyAccountTab";
import { CompanyBillingTab } from "@/components/configuracion/CompanyBillingTab";

export default function ConfiguracionPage() {
    const { userType, setUserType } = useUserStore();
    const [activeTab, setActiveTab] = useState("perfil");

    // Estado para usuario normal
    const [userData, setUserData] = useState({
        nombre: "Cristian Garcia",
        email: "cristian.garcia@example.com",
        telefono: "+57 300 123 4567",
        ubicacion: "Santa Marta, Magdalena",
        bio: "Desarrollador Full Stack con experiencia en React y Node.js",
        habilidades: "JavaScript, React, Node.js, TypeScript",
    });

    // Estado para empresa
    const [companyData, setCompanyData] = useState({
        nombreEmpresa: "Tech Solutions SAS",
        nit: "900.123.456-7",
        email: "contacto@techsolutions.com",
        telefono: "+57 300 987 6543",
        ubicacion: "Santa Marta, Magdalena",
        descripcion: "Empresa de desarrollo de software especializada en soluciones web y móviles",
        sector: "Tecnología",
        sitioWeb: "https://techsolutions.com",
    });

    const handleUserSave = () => {
        console.log("Guardando datos de usuario:", userData);
        alert("Configuración guardada exitosamente!");
    };

    const handleCompanySave = () => {
        console.log("Guardando datos de empresa:", companyData);
        alert("Configuración guardada exitosamente!");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Configuración</h1>
                    <p className="text-gray-600">Administra tu perfil y preferencias</p>
                </div>

                {/* Selector de tipo de usuario - solo si no tiene userType definido */}
                {!userType && <UserTypeSelector userType={userType} setUserType={setUserType} />}

                {/* Configuración para Usuario Normal */}
                {userType === 'normal' && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="perfil">Perfil</TabsTrigger>
                            <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
                            <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
                        </TabsList>

                        {/* Tab Perfil */}
                        <TabsContent value="perfil" className="space-y-6">
                            <UserProfileTab userData={userData} setUserData={setUserData} />
                        </TabsContent>

                        {/* Tab Cuenta */}
                        <TabsContent value="cuenta" className="space-y-6">
                            <UserAccountTab userData={userData} setUserData={setUserData} />
                        </TabsContent>

                        {/* Tab Privacidad */}
                        <TabsContent value="privacidad" className="space-y-6">
                            <UserPrivacyTab />
                        </TabsContent>

                        {/* Botón guardar para usuario */}
                        <div className="flex justify-end">
                            <Button onClick={handleUserSave} size="lg">
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Cambios
                            </Button>
                        </div>
                    </Tabs>
                )}

                {/* Configuración para Empresa */}
                {userType === 'empresa' && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="perfil">Perfil Empresarial</TabsTrigger>
                            <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
                            <TabsTrigger value="facturacion">Facturación</TabsTrigger>
                        </TabsList>

                        {/* Tab Perfil Empresarial */}
                        <TabsContent value="perfil" className="space-y-6">
                            <CompanyProfileTab companyData={companyData} setCompanyData={setCompanyData} />
                        </TabsContent>

                        {/* Tab Cuenta */}
                        <TabsContent value="cuenta" className="space-y-6">
                            <CompanyAccountTab companyData={companyData} setCompanyData={setCompanyData} />
                        </TabsContent>

                        {/* Tab Facturación */}
                        <TabsContent value="facturacion" className="space-y-6">
                            <CompanyBillingTab />
                        </TabsContent>

                        {/* Botón guardar para empresa */}
                        <div className="flex justify-end">
                            <Button onClick={handleCompanySave} size="lg">
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Cambios
                            </Button>
                        </div>
                    </Tabs>
                )}

                {/* Mensaje si no hay tipo seleccionado */}
                {!userType && <EmptyStateMessage />}
            </div>
        </div>
    );
}
