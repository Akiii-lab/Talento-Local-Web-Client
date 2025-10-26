import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mail, MapPin, Phone, Briefcase, Building2 } from "lucide-react";
import { CompanyData } from "@/types/user/user.types";

interface CompanyProfileTabProps {
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
}

export function CompanyProfileTab({ companyData, setCompanyData }: CompanyProfileTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la Empresa</CardTitle>
        <CardDescription>Actualiza los datos públicos de tu empresa</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24 rounded-lg">
            <AvatarImage src="" />
            <AvatarFallback className="bg-purple-200 text-2xl rounded-lg">TS</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">
              <Camera className="w-4 h-4 mr-2" />
              Cambiar logo
            </Button>
            <p className="text-sm text-gray-500 mt-2">JPG, PNG o SVG (máx. 2MB)</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombreEmpresa" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Nombre de la empresa
            </Label>
            <Input
              id="nombreEmpresa"
              value={companyData.nombreEmpresa}
              onChange={(e) => setCompanyData({ ...companyData, nombreEmpresa: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              value={companyData.nit}
              onChange={(e) => setCompanyData({ ...companyData, nit: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sector" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Sector
            </Label>
            <Input
              id="sector"
              value={companyData.sector}
              onChange={(e) => setCompanyData({ ...companyData, sector: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sitioWeb">Sitio web</Label>
            <Input
              id="sitioWeb"
              value={companyData.sitioWeb}
              onChange={(e) => setCompanyData({ ...companyData, sitioWeb: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emailEmpresa" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email corporativo
            </Label>
            <Input
              id="emailEmpresa"
              type="email"
              value={companyData.email}
              onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefonoEmpresa" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Teléfono
            </Label>
            <Input
              id="telefonoEmpresa"
              value={companyData.telefono}
              onChange={(e) => setCompanyData({ ...companyData, telefono: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ubicacionEmpresa" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Ubicación
          </Label>
          <Input
            id="ubicacionEmpresa"
            value={companyData.ubicacion}
            onChange={(e) => setCompanyData({ ...companyData, ubicacion: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descripcionEmpresa">Descripción de la empresa</Label>
          <Textarea
            id="descripcionEmpresa"
            value={companyData.descripcion}
            onChange={(e) => setCompanyData({ ...companyData, descripcion: e.target.value })}
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
}
