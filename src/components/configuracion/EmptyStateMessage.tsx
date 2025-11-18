import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyStateMessage() {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Selecciona un tipo de cuenta</h3>
        <p className="text-gray-500">
          Por favor selecciona si eres un usuario o una empresa para comenzar a configurar tu perfil
        </p>
      </CardContent>
    </Card>
  );
}
