
export interface FilterBarProps {
  orderBy: string;
  setOrderBy: (value: string) => void;
  payType: string;
  setPayType: (value: string) => void;
  minSalary: number;
  setMinSalary: (value: number) => void;
}

export function FilterBar({ orderBy, setOrderBy, payType, setPayType, minSalary, setMinSalary }: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2 items-center">
      <label className="text-sm">Ordenar por:</label>
      <select value={orderBy} onChange={e => setOrderBy(e.target.value)} className="border rounded px-2 py-1 text-sm">
        <option value="recientes">Recientes</option>
        <option value="salario">Salario</option>
        <option value="empresa">Empresa</option>
      </select>

      <label className="text-sm ml-4">Tipo de pago:</label>
      <select value={payType} onChange={e => setPayType(e.target.value)} className="border rounded px-2 py-1 text-sm">
        <option value="">Todos</option>
        <option value="Mensual">Mensual</option>
        <option value="Semanal">Semanal</option>
        <option value="Quincenal">Quincenal</option>
      </select>

      <label className="text-sm ml-4">Salario mínimo:</label>
      <input type="number" value={minSalary} onChange={e => setMinSalary(Number(e.target.value))} className="border rounded px-2 py-1 text-sm w-24" min={0} />
    </div>
  );
}
