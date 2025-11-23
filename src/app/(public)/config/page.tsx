"use client";

import { useState } from "react";
import { useCompanyStore, useUserStore } from "@/app/store/userStore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, Save } from "lucide-react";
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
    const [userData, setUserData] = useState(user ? user : null);
    const [companyData, setCompanyData] = useState(company ? company : null);
    const [loading, setLoading] = useState(false);

    const handleUserSave = async () => {
        try {
            setLoading(true);
            const updateduser = await fetch(`/api/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userData?.id,
                    name: userData?.name,
                    email: userData?.email,
                    address: userData?.address,
                    type: userData?.type,
                }),
            });
            const updateduserJson = await updateduser.json();
            if (updateduser.ok) {
                setUser(updateduserJson.user);
                toast.success("Perfil actualizado conxito.");
            } else {
                toast.error("Error al actualizar el perfil.");
            }
        } catch (error) {
            toast.error("Error al actualizar el perfil.");
        } finally {
            setLoading(false);
        }
    };

    const handleCompanySave = async() => {
        try {
            setLoading(true);
            const updateduser = await fetch(`/api/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: companyData?.id,
                    name: companyData?.name,
                    email: companyData?.email,
                    address: companyData?.address,
                    type: companyData?.type,
                }),
            });
            const updateduserJson = await updateduser.json();
            if (updateduser.ok) {
                setCompany(updateduserJson.user);
                toast.success("Perfil actualizado conxito.");
            } else {
                toast.error("Error al actualizar el perfil.");
            }
        } catch (error) {
            toast.error("Error al actualizar el perfil.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <Loader className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Configuración</h1>
                    <p className="text-gray-600">Administra tu perfil y preferencias</p>
                </div>
                {!user && !company && <EmptyStateMessage />}
                {user && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="perfil">Perfil</TabsTrigger>
                            <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
                            <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
                        </TabsList>

                        <TabsContent value="perfil" className="space-y-6">
                            {userData && <UserProfileTab userData={userData} setUserData={setUserData} />}
                        </TabsContent>

                        <TabsContent value="cuenta" className="space-y-6">
                            {userData && <UserAccountTab userData={userData} setUserData={setUserData} />}
                        </TabsContent>

                        <TabsContent value="privacidad" className="space-y-6">
                            <UserPrivacyTab />
                        </TabsContent>

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

                        <TabsContent value="perfil" className="space-y-6">
                            {/* {companyData && <CompanyProfileTab companyData={companyData} setCompanyData={setCompanyData} />} */}
                        </TabsContent>

                        <TabsContent value="cuenta" className="space-y-6">
                            {/* {companyData && <CompanyAccountTab companyData={companyData} setCompanyData={setCompanyData} />} */}
                        </TabsContent>

                        <TabsContent value="facturacion" className="space-y-6">
                            <CompanyBillingTab />
                        </TabsContent>

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
