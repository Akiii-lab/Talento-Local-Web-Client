import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { UserData } from "@/types/user/user.types";

interface UserAccountTabProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export function UserAccountTab({ userData, setUserData }: UserAccountTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de Cuenta</CardTitle>
        <CardDescription>Administra tu email y contraseña</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentPassword">Contraseña actual</Label>
          <Input id="currentPassword" type="password" placeholder="••••••••" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">Nueva contraseña</Label>
          <Input id="newPassword" type="password" placeholder="••••••••" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <Input id="confirmPassword" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
    </Card>
  );
}
