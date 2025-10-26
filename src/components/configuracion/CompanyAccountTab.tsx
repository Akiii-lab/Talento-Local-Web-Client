import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyData } from "@/types/user/user.types";

interface CompanyAccountTabProps {
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
}

export function CompanyAccountTab({ companyData, setCompanyData }: CompanyAccountTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de Cuenta</CardTitle>
        <CardDescription>Administra tu email y contraseña corporativa</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emailCuenta">Email de la cuenta</Label>
          <Input
            id="emailCuenta"
            type="email"
            value={companyData.email}
            onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentPasswordEmpresa">Contraseña actual</Label>
          <Input id="currentPasswordEmpresa" type="password" placeholder="••••••••" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPasswordEmpresa">Nueva contraseña</Label>
          <Input id="newPasswordEmpresa" type="password" placeholder="••••••••" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPasswordEmpresa">Confirmar contraseña</Label>
          <Input id="confirmPasswordEmpresa" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
    </Card>
  );
}
