import React from 'react';
import ProductCard from './ProductCard';
import FilterCheckboxGroup from './FilterCheckboxGroup';
import { ItemPrenda } from '../data/productos';

interface CatalogoViewProps {
  filteredProducts: ItemPrenda[];
  dynamicFilterOptions: any;
  activeFilters: any;
  handleFilterChange: (filterName: any, value: string) => void;
  handleClearFilters: () => void;
  handleAddToCesta: (itemId: string) => void;
  handleViewDetails: (producto: ItemPrenda) => void;
}

const CatalogoView: React.FC<CatalogoViewProps> = ({
  filteredProducts,
  dynamicFilterOptions,
  activeFilters,
  handleFilterChange,
  handleClearFilters,
  handleAddToCesta,
  handleViewDetails
}) => {
  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <img 
          src="/DSC01247.jpg" 
          alt="Presentación" 
          className="absolute inset-0 object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <img src="/TRES EN LA RAYAblanco.png" alt="Logo" className="max-w-[280px] md:max-w-[450px] h-auto" />
          <div className="w-16 h-1 mx-auto mt-8 mb-4 bg-white/40"></div>
          <p className="text-white/90 text-xs md:text-sm font-bold uppercase tracking-[0.5em]">Armario Escénico</p>
        </div>
      </section>

      <main id="catalogo" className="px-4 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <aside className="md:col-span-1">
            <div className="sticky space-y-4 top-28">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filtrar</h3>
                <button onClick={handleClearFilters} className="text-sm text-red-500">Limpiar</button>
              </div>
              {Object.keys(dynamicFilterOptions).map((key) => (
                <FilterCheckboxGroup
                  key={key}
                  filterName={key as any}
                  options={dynamicFilterOptions[key]}
                  activeValues={activeFilters[key]}
                  onFilterChange={handleFilterChange}
                />
              ))}
            </div>
          </aside>
          <section className="md:col-span-3">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.itemId} producto={p} onAddToCesta={handleAddToCesta} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default CatalogoView;