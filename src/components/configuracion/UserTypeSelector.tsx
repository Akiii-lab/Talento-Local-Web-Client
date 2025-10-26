import { Button } from "@/components/ui/button";
import { Building2, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserType } from "@/types/user/user.types";

interface UserTypeSelectorProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export function UserTypeSelector({ userType, setUserType }: UserTypeSelectorProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Tipo de Cuenta</CardTitle>
        <CardDescription>Selecciona el tipo de cuenta que deseas configurar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button
            variant={userType === 'normal' ? 'default' : 'outline'}
            onClick={() => setUserType('normal')}
            className="flex-1"
          >
            <User className="w-4 h-4 mr-2" />
            Usuario
          </Button>
          <Button
            variant={userType === 'empresa' ? 'default' : 'outline'}
            onClick={() => setUserType('empresa')}
            className="flex-1"
          >
            <Building2 className="w-4 h-4 mr-2" />
            Empresa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
