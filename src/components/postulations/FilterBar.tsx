import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterBarProps {
  orderBy: string;
  setOrderBy: (value: string) => void;
  payType: string;
  setPayType: (value: string) => void;
  minSalary: number;
  setMinSalary: (value: number) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  workplace: string;
  setWorkplace: (value: string) => void;
  experienceFilter: number | null;
  setExperienceFilter: (value: number | null) => void;
  jornadaFilter: string;
  setJornadaFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
}

export function FilterBar({ 
  orderBy, 
  setOrderBy, 
  payType, 
  setPayType, 
  minSalary, 
  setMinSalary,
  dateFilter,
  setDateFilter,
  workplace,
  setWorkplace,
  experienceFilter,
  setExperienceFilter,
  jornadaFilter,
  setJornadaFilter,
  categoryFilter,
  setCategoryFilter
}: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-3 items-center bg-transparent p-4 rounded-lg">
      {/* Ordenar */}
      <div className="relative">
        <Select value={orderBy} onValueChange={setOrderBy}>
          <SelectTrigger className="w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recientes">Más recientes</SelectItem>
            <SelectItem value="salario">Salario mayor</SelectItem>
            <SelectItem value="empresa">Por empresa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Fecha */}
      <div className="relative">
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
            <SelectValue placeholder="Fecha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cualquiera">Cualquier fecha</SelectItem>
            <SelectItem value="urgente">Urgente</SelectItem>
            <SelectItem value="hoy">Hoy</SelectItem>
            <SelectItem value="3dias">Últimos 3 días</SelectItem>
            <SelectItem value="semana">Última semana</SelectItem>
            <SelectItem value="15dias">Últimos 15 días</SelectItem>
            <SelectItem value="mes">Último mes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categoría */}
      <div className="relative">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorías</SelectItem>
            <SelectItem value="tecnologia">Tecnología</SelectItem>
            <SelectItem value="ventas">Ventas</SelectItem>
            <SelectItem value="admin">Administración</SelectItem>
            <SelectItem value="servicios">Servicios</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lugar de trabajo */}
      <div className="relative">
        <Select value={workplace} onValueChange={setWorkplace}>
          <SelectTrigger className="w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
            <SelectValue placeholder="Lugar de trabajo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="presencial">Presencial</SelectItem>
            <SelectItem value="remoto">Remoto</SelectItem>
            <SelectItem value="hibrido">Híbrido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Experiencia */}
      <div className="relative">
        <Select 
          value={experienceFilter === null ? "cualquiera" : experienceFilter.toString()} 
          onValueChange={(v) => setExperienceFilter(v === "cualquiera" ? null : Number(v))}
        >
          <SelectTrigger className="w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
            <SelectValue placeholder="Experiencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cualquiera">Cualquier experiencia</SelectItem>
            <SelectItem value="0">Sin experiencia</SelectItem>
            <SelectItem value="1">1 año</SelectItem>
            <SelectItem value="2">2 años</SelectItem>
            <SelectItem value="3">3+ años</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Salario */}
      <div className="relative">
        <Select value={minSalary > 0 ? minSalary.toString() : "cualquiera"} onValueChange={(v) => setMinSalary(v === "cualquiera" ? 0 : Number(v))}>
          <SelectTrigger className="w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
            <SelectValue placeholder="Salario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cualquiera">Cualquier salario</SelectItem>
            <SelectItem value="1000000">Más de $1.000.000</SelectItem>
            <SelectItem value="1500000">Más de $1.500.000</SelectItem>
            <SelectItem value="2000000">Más de $2.000.000</SelectItem>
            <SelectItem value="3000000">Más de $3.000.000</SelectItem>
            <SelectItem value="4000000">Más de $4.000.000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jornada */}
      <div className="relative">
        <Select value={jornadaFilter} onValueChange={setJornadaFilter}>
          <SelectTrigger className="w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
            <SelectValue placeholder="Jornada" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cualquiera">Cualquier jornada</SelectItem>
            <SelectItem value="completo">Tiempo completo</SelectItem>
            <SelectItem value="parcial">Medio tiempo</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contrato */}
      <div className="relative">
        <Select value={payType || "todos"} onValueChange={(v) => setPayType(v === "todos" ? "" : v)}>
          <SelectTrigger className="w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
            <SelectValue placeholder="Contrato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="Mensual">Pago Mensual</SelectItem>
            <SelectItem value="Quincenal">Pago Quincenal</SelectItem>
            <SelectItem value="Semanal">Pago Semanal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
