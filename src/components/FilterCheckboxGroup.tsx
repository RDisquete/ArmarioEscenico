import React, { useState } from "react";

interface Filters {
  categoria: string[];
  epoca: string[];
  tipoPrenda: string[];
  talla: string[];
  genero: string[];
  claseSocial: string[];
  color: string[];
}

interface Props {
  filterName: keyof Filters;
  options: string[];
  activeValues: string[];
  onFilterChange: (filterName: keyof Filters, value: string) => void;
}

const labelMap: Record<keyof Filters, string> = {
  categoria: "Categoría",
  epoca: "Época",
  tipoPrenda: "Tipo de Prenda",
  talla: "Talla",
  genero: "Género",
  claseSocial: "Clase Social",
  color: "Color",
};
const FilterApple: React.FC<Props> = ({ filterName, options, activeValues, onFilterChange }) => {
  const label = labelMap[filterName];
  const [open, setOpen] = useState(false);
  const hasActiveFilters = activeValues.length > 0;

  return (
    <div className="p-3 border border-gray-100 bg-white/60 backdrop-blur-sm rounded-xl">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full py-2"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-800">{label}</span>
        
        <div className="flex items-center gap-2">
            {hasActiveFilters && (
                <span className="px-2 text-xs font-semibold text-white bg-black rounded-full">
                    {activeValues.length}
                </span>
            )}
            <svg className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </button>

      <div className={`mt-2 transition-all duration-300 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
        <div className="pr-1 space-y-2 overflow-y-auto max-h-40"> 
          {options.sort().map(opt => {
            const checked = activeValues.includes(opt);
            return (
              <label key={opt} className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onFilterChange(filterName, opt)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition ${checked ? "bg-black border-black" : "bg-white border-gray-300"}`}>
                  {checked && (
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-gray-800">{opt}</span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            {activeValues.length === 0 
                ? "Sin filtros activos" 
                : `${activeValues.length} elemento(s) seleccionado(s)}`}
          </p>
          <button
            onClick={() => activeValues.forEach(v => onFilterChange(filterName, v))}
            className="text-xs font-medium text-red-600 transition hover:text-red-700 disabled:text-gray-400 disabled:hover:text-gray-400"
            disabled={!hasActiveFilters}
          >
            Limpiar {label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterApple;