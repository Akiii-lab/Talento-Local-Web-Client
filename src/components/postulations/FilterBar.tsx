import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

export function FilterBar() {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Button variant="outline" size="sm" className="gap-2">
        Ordenar <FilterIcon size={16} />
      </Button>
      <Button variant="outline" size="sm">
        Distancia
      </Button>
      <Button variant="outline" size="sm">
        Fecha
      </Button>
      <Button variant="outline" size="sm">
        Categoría
      </Button>
      <Button variant="outline" size="sm">
        Lugar de trabajo
      </Button>
      <Button variant="outline" size="sm">
        Experiencia
      </Button>
      <Button variant="outline" size="sm">
        Salario
      </Button>
      <Button variant="outline" size="sm">
        Jornada
      </Button>
      <Button variant="outline" size="sm">
        Contrato
      </Button>
      <Button variant="outline" size="sm">
        Discapacidad
      </Button>
    </div>
  );
}
