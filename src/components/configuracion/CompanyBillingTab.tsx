import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CompanyBillingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de Facturación</CardTitle>
        <CardDescription>Administra tus planes y métodos de pago</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900">Plan Actual: Premium</h4>
          <p className="text-sm text-blue-700 mt-1">Publicaciones ilimitadas</p>
          <Button variant="outline" size="sm" className="mt-3">
            Cambiar Plan
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Método de pago</Label>
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">•••• •••• •••• 4532</p>
              <p className="text-sm text-gray-500">Vence 12/2025</p>
            </div>
            <Button variant="outline" size="sm">Editar</Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Historial de facturas</Label>
          <div className="border rounded-lg divide-y">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Octubre 2025</p>
                <p className="text-sm text-gray-500">$150.000 COP</p>
              </div>
              <Button variant="ghost" size="sm">Descargar</Button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Septiembre 2025</p>
                <p className="text-sm text-gray-500">$150.000 COP</p>
              </div>
              <Button variant="ghost" size="sm">Descargar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
