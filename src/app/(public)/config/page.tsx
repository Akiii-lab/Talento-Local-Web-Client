"use client";

import { useState } from "react";
import { useCompanyStore, useUserStore } from "@/app/store/userStore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { UserProfileTab } from "@/components/configuracion/UserProfileTab";
import { UserAccountTab } from "@/components/configuracion/UserAccountTab";
import { UserPrivacyTab } from "@/components/configuracion/UserPrivacyTab";
import { CompanyProfileTab } from "@/components/configuracion/CompanyProfileTab";
import { CompanyAccountTab } from "@/components/configuracion/CompanyAccountTab";
import { CompanyBillingTab } from "@/components/configuracion/CompanyBillingTab";
import { EmptyStateMessage } from "@/components/configuracion/EmptyStateMessage";
import { toast } from "sonner";

//TODO: fetch userdata to profile get user by id and sen userdata to tab
export default function ConfiguracionPage() {
    const { user, setUser } = useUserStore();
    const { company, setCompany } = useCompanyStore();
    const [activeTab, setActiveTab] = useState("perfil");
    const [userData, setUserData] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    const handleUserSave = () => {
        if (userData) {
            setUser(userData);
            toast("Configuración guardada exitosamente!");
        }
    };

    const handleCompanySave = () => {
        if (companyData) {
            setCompany(companyData);
            toast("Configuración guardada exitosamente!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Configuración</h1>
                    <p className="text-gray-600">Administra tu perfil y preferencias</p>
                </div>

                {/* Mostrar configuración según tipo de usuario */}
                {!user && !company && <EmptyStateMessage />}

                {/* Configuración para Usuario Normal */}
                {user && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="perfil">Perfil</TabsTrigger>
                            <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
                            <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
                        </TabsList>

                        {/* Tab Perfil */}
                        <TabsContent value="perfil" className="space-y-6">
                            {/* {userData && <UserProfileTab userData={userData} setUserData={setUserData} />} */}
                        </TabsContent>

                        {/* Tab Cuenta */}
                        <TabsContent value="cuenta" className="space-y-6">
                            {/* {userData && <UserAccountTab userData={userData} setUserData={setUserData} />} */}
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
                {company && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="perfil">Perfil Empresarial</TabsTrigger>
                            <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
                            <TabsTrigger value="facturacion">Facturación</TabsTrigger>
                        </TabsList>

                        {/* Tab Perfil Empresarial */}
                        <TabsContent value="perfil" className="space-y-6">
                            {/* {companyData && <CompanyProfileTab companyData={companyData} setCompanyData={setCompanyData} />} */}
                        </TabsContent>

                        {/* Tab Cuenta */}
                        <TabsContent value="cuenta" className="space-y-6">
                            {/* {companyData && <CompanyAccountTab companyData={companyData} setCompanyData={setCompanyData} />} */}
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
            </div>
        </div>
    );
}
