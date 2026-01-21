import React from 'react';

interface Filters {
    categoria: string[];
    epoca: string[];
    tipoPrenda: string[];
    talla: string[];
    genero: string[];
    claseSocial: string[];
    color: string[];
    busqueda: string; 
}

interface FilterDropdownProps {
  filterName: keyof Filters;
  options?: string[]; 
  activeValues: any;
  onFilterChange: (filterName: keyof Filters, value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    filterName,
    options = [],
    activeValues,
    onFilterChange
}) => {

  const labelMap: Record<keyof Filters, string> = {
    categoria: 'Categoría',
    epoca: 'Época',
    tipoPrenda: 'Tipo de Prenda',
    talla: 'Talla',
    genero: 'Género',
    claseSocial: 'Clase Social',
    color: 'Color',
    busqueda: 'Buscar palabra clave o ID',
  };

  if (filterName === 'busqueda') {
    return (
      <div className="relative pt-4 mt-4 border-t border-gray-100">
        <label className="block mb-1 text-xs font-bold text-gray-900 uppercase">
          {labelMap[filterName]}
        </label>
        <div className="relative">
          <input
            type="text"
            value={activeValues as string}
            onChange={(e) => onFilterChange('busqueda', e.target.value)}
            placeholder="Ej: Siglo XVIII, 001, Rojo..."
            className="w-full p-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black outline-none transition"
          />
          {activeValues && (
            <button 
              onClick={() => onFilterChange('busqueda', '')}
              className="absolute right-2 top-2.5 text-gray-400 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <label className="block mb-1 text-xs font-medium text-gray-700 uppercase">
        {labelMap[filterName]}
      </label>

      <select
        multiple
        value={activeValues as string[]}
        onChange={(e) => {
          const selections = Array.from(e.target.selectedOptions).map(o => o.value);
          const last = selections[selections.length - 1];
          onFilterChange(filterName, last);
        }}
        className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md outline-none focus:border-black"
      >
        {options.sort().map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <p className="mt-1 text-[11px] text-gray-500 italic">
        {(activeValues as string[]).length === 0 
          ? 'Sin filtros' 
          : (activeValues as string[]).length + ' seleccionados'}
      </p>
    </div>
  );
};

export default FilterDropdown;