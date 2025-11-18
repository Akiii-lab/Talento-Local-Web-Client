import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mail, MapPin, Phone, Briefcase } from "lucide-react";
import { UserData } from "@/types/user/user.types";

interface UserProfileTabProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export function UserProfileTab({ userData, setUserData }: UserProfileTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>Actualiza tu información de perfil público</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-200 text-2xl">CG</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">
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
              value={userData.nombre}
              onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Teléfono
            </Label>
            <Input
              id="telefono"
              value={userData.telefono}
              onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ubicacion" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Ubicación
          </Label>
          <Input
            id="ubicacion"
            value={userData.ubicacion}
            onChange={(e) => setUserData({ ...userData, ubicacion: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Biografía</Label>
          <Textarea
            id="bio"
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="habilidades" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Habilidades (separadas por coma)
          </Label>
          <Textarea
            id="habilidades"
            value={userData.habilidades}
            onChange={(e) => setUserData({ ...userData, habilidades: e.target.value })}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
