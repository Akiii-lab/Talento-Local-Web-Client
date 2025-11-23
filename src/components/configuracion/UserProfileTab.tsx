import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mail } from "lucide-react";
import { UserDataSimplified } from "@/types/user/user.types";
import { useState } from "react";
import { ComingSoonDialog } from "../ComingSoonDialog";

interface UserProfileTabProps {
  userData: UserDataSimplified;
  setUserData: (data: UserDataSimplified) => void;
}

export function UserProfileTab({ userData, setUserData }: UserProfileTabProps) {
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>Actualiza tu información de perfil público</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-200 text-2xl">{userData.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <Button className="hover:cursor-pointer" variant="outline" size="sm" onClick={() => setComingSoon(true)}>
                <Camera className="w-4 h-4 mr-2" />
                Cambiar foto
              </Button>
              <p className="text-sm text-gray-500 mt-2">JPG, PNG o GIF (máx. 2MB)</p>
            </div>
          </div>

          {/* Formulario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                value={userData.name || ""}
                disabled
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={userData.email || ""}
                readOnly
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={userData.address || ""}
              disabled
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              placeholder="Tu dirección"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Tipo de cuenta:</span> {userData.type === "applicant" ? "Postulante" : "Empresa"}
            </p>
            <p className="text-xs text-gray-500 mt-2">El tipo de cuenta no puede ser modificado. Para cambiar de tipo, crea una nueva cuenta.</p>
          </div>
        </CardContent>
      </Card>

      <ComingSoonDialog isOpen={comingSoon} onClose={() => setComingSoon(false)} />
    </>
  );
}
