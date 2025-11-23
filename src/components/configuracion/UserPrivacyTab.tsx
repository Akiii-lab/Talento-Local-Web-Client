import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ComingSoonDialog } from "../ComingSoonDialog";

export function UserPrivacyTab() {
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Privacidad</CardTitle>
          <CardDescription>Controla quién puede ver tu información</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Perfil público</h4>
              <p className="text-sm text-gray-500">Permite que otros usuarios vean tu perfil</p>
            </div>
            <Button onClick={() => setComingSoon(true)} variant="outline">Desactivado</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notificaciones por email</h4>
              <p className="text-sm text-gray-500">Recibe actualizaciones sobre ofertas</p>
            </div>
            <Button onClick={() => setComingSoon(true)} variant="outline">Desactivado</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Mostrar teléfono</h4>
              <p className="text-sm text-gray-500">Visible para empresas</p>
            </div>
            <Button onClick={() => setComingSoon(true)} variant="outline">Activado</Button>
          </div>
        </CardContent>
      </Card>

      <ComingSoonDialog isOpen={comingSoon} onClose={() => setComingSoon(false)} />
    </>
  );
}
