import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import CestaModal from "./components/CestaModal";
import ProductCard from "./components/ProductCard";
import FormularioSolicitud from "./components/FormularioSolicitud";
import ImageModal from "./components/ImageModal";
import FilterCheckboxGroup from "./components/FilterCheckboxGroup";

import { productos, ItemPrenda } from "./data/productos";
import Footer from "./components/Footer";

const CESTA_STORAGE_KEY = "sambronaCesta";
const FILTERS_STORAGE_KEY = "sambronaActiveFilters";

type AppView = "catalogue" | "form";

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

type FilterCheckboxKeys = keyof Omit<Filters, 'busqueda'>;

const defaultFilters: Filters = {
  categoria: [],
  epoca: [],
  tipoPrenda: [],
  talla: [],
  genero: [],
  claseSocial: [],
  color: [],
  busqueda: "",
};

function getInitialState<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error al cargar ${key} de localStorage:`, error);
  }
  return defaultValue;
}

function App() {
  const [cestaItems, setCestaItems] = useState<string[]>(
    () => getInitialState(CESTA_STORAGE_KEY, [])
  );

  const [activeFilters, setActiveFilters] = useState<Filters>(
    () => getInitialState(FILTERS_STORAGE_KEY, defaultFilters)
  );

  const [isCestaOpen, setIsCestaOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>("catalogue");
  const [selectedProduct, setSelectedProduct] = useState<ItemPrenda | null>(null);

  useEffect(() => {
    localStorage.setItem(CESTA_STORAGE_KEY, JSON.stringify(cestaItems));
  }, [cestaItems]);

  useEffect(() => {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(activeFilters));
  }, [activeFilters]);

  const dynamicFilterOptions = useMemo(() => {
    const keys = (Object.keys(defaultFilters) as (keyof Filters)[]).filter(k => k !== 'busqueda') as FilterCheckboxKeys[];
    const options: any = {};

    keys.forEach((filterKey) => {
      const productsForThisFilter = productos.filter((producto) => {
        if (activeFilters.busqueda) {
          const q = activeFilters.busqueda.toLowerCase().trim();
          const matchesSearch = 
            producto.nombre.toLowerCase().includes(q) || 
            producto.itemId.toLowerCase().includes(q);
          if (!matchesSearch) return false;
        }

        return keys.every((otherKey) => {
          if (otherKey === filterKey) return true;
          const selectedVals = activeFilters[otherKey] as string[];
          if (selectedVals.length === 0) return true;
          const val = String(producto[otherKey as keyof ItemPrenda]).toLowerCase().trim();
          return selectedVals.some(v => v.toLowerCase().trim() === val);
        });
      });

      options[filterKey] = Array.from(new Set(productsForThisFilter.map(p => String(p[filterKey as keyof ItemPrenda]))))
        .filter(v => v && v !== "N/A" && v !== "undefined")
        .sort();
    });
    return options;
  }, [activeFilters]);

  const filteredProducts = useMemo(() => {
    return productos.filter((producto) => {
      if (activeFilters.busqueda) {
        const query = activeFilters.busqueda.toLowerCase().trim();
        const matchesQuery = 
          producto.nombre.toLowerCase().includes(query) || 
          producto.itemId.toLowerCase().includes(query);
        
        if (!matchesQuery) return false;
      }

      const keys = (Object.keys(defaultFilters) as (keyof Filters)[]).filter(k => k !== 'busqueda') as FilterCheckboxKeys[];
      return keys.every((key) => {
        const selectedVals = activeFilters[key] as string[];
        if (selectedVals.length === 0) return true;
        const val = String(producto[key as keyof ItemPrenda]).toLowerCase().trim();
        return selectedVals.some(v => v.toLowerCase().trim() === val);
      });
    });
  }, [activeFilters]);

  const cestaDetalles: ItemPrenda[] = productos.filter((p) => cestaItems.includes(p.itemId));

  // --- Handlers ---
  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setActiveFilters((prev) => {
      if (filterName === "busqueda") {
        return { ...prev, busqueda: value };
      }
      const current = (prev[filterName] as string[]) || [];
      if (current.includes(value)) {
        return { ...prev, [filterName]: current.filter((v) => v !== value) };
      }
      return { ...prev, [filterName]: [...current, value] };
    });
  };

  const handleClearFilters = () => setActiveFilters(defaultFilters);

  const handleGoToCatalogue = () => {
    setCurrentView("catalogue");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCesta = (itemId: string) => {
    if (!cestaItems.includes(itemId)) setCestaItems((s) => [...s, itemId]);
  };

  const handleRemoveFromCesta = (itemId: string) => {
    setCestaItems((s) => s.filter((id) => id !== itemId));
  };

  const handleClearCesta = () => {
    setCestaItems([]);
    setIsCestaOpen(false);
  };

  const handleCheckout = () => {
    if (cestaItems.length === 0) return;
    setIsCestaOpen(false);
    setCurrentView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitSolicitud = (datosUsuario: any) => {
    setCestaItems([]);
    setCurrentView("catalogue");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (producto: ItemPrenda) => setSelectedProduct(producto);
  const handleCloseImageModal = () => setSelectedProduct(null);

  const CatalogueView = (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <img 
          src="/DSC01247.jpg" 
          alt="Presentación Asociación Sambrona" 
          className="absolute inset-0 object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="flex flex-col items-center animate-fade-in-up">
            <img 
              src="/TRES EN LA RAYAblanco.png" 
              alt="Logo Tres en la Raya" 
              className="max-w-[280px] md:max-w-[450px] h-auto drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            />
            <div className="w-16 h-1 mx-auto mt-8 mb-4 bg-white/40"></div>
            <p className="text-white/90 text-xs md:text-sm font-bold uppercase tracking-[0.5em] drop-shadow-md">
              Armario Escénico
            </p>
          </div>
        </div>
        <div className="absolute -translate-x-1/2 bottom-10 left-1/2 animate-bounce">
          <div className="w-px h-12 opacity-50 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      <section id="alquiler" className="px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-8 text-4xl font-bold text-gray-900 uppercase md:text-5xl">
          Vestuario teatral con historia. <br></br>COMPARTE CON UN PROPÓSITO
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 md:text-xl">
          <strong>TRES EN LA RAYA ES UNA ASOCIACIÓN CULTURAL</strong> sin ánimo de lucro que nace en el año 2013 con el objetivo de continuar la labor iniciada y desarrollada por sus miembros dentro de <strong>AL SUROESTE Teatro </strong>compañía teatral.
        </p><br></br>
        <h3 className="mb-8 text-2xl italic text-gray-900 md:text-3xl ">¡Descubre nuestro archivo y sé parte de la escena!</h3>
      </section>

      <main id="catalogo" className="px-4 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <aside className="md:col-span-1">
            <div className="sticky space-y-4 top-28">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Filtrar</h3>
                <button onClick={handleClearFilters} className="text-sm text-red-500 hover:text-red-700">Limpiar todo</button>
              </div>

              <div className="mb-6">
                <label className="block mb-1 text-xs font-medium text-gray-500 uppercase">
                  Buscar palabras clave
                </label>
                <input
                  type="text"
                  value={activeFilters.busqueda}
                  onChange={(e) => handleFilterChange("busqueda", e.target.value)}
                  placeholder="Ej: 001, Casaca..."
                  className="w-full p-2 text-sm transition bg-transparent border-b border-gray-300 outline-none focus:border-black"
                />
              </div>

              <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
                {(Object.keys(dynamicFilterOptions) as FilterCheckboxKeys[]).map((key) => (
                  <FilterCheckboxGroup
                    key={key}
                    filterName={key}
                    options={dynamicFilterOptions[key]}
                    activeValues={activeFilters[key] as string[]}
                    onFilterChange={handleFilterChange}
                  />
                ))}

                <div className="px-3 py-2 mt-4 text-sm font-bold tracking-tighter text-gray-600 uppercase bg-white border rounded-lg shadow-sm">
                  {filteredProducts.length} artículos encontrados
                </div>
              </div>
            </div>
          </aside>

          <section className="md:col-span-3">
            <h2 className="mb-6 text-4xl italic font-bold tracking-tighter text-center uppercase">Archivo de Vestuario</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((producto) => (
                <ProductCard
                  key={producto.itemId}
                  producto={producto}
                  onAddToCesta={handleAddToCesta}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p className="py-10 text-xl italic text-center text-gray-600">No se encontraron artículos con estos criterios.</p>
            )}
          </section>
        </div>
      </main>
    </>
  );

  return (
    <div className="min-h-screen pt-20 font-sans text-gray-900 bg-gray-50">
      <Header cestaCount={cestaItems.length} onOpenCesta={() => setIsCestaOpen(true)} onGoToCatalogue={handleGoToCatalogue} />
      {currentView === "catalogue" ? CatalogueView : <FormularioSolicitud cestaItems={cestaDetalles} onBackToCatalogue={handleGoToCatalogue} onSubmit={handleSubmitSolicitud} />}

      <Footer />

      <CestaModal
        cestaItems={cestaDetalles}
        isOpen={isCestaOpen}
        onClose={() => setIsCestaOpen(false)}
        onRemove={handleRemoveFromCesta}
        onSubmit={handleCheckout}
        onClearCesta={handleClearCesta}
      />
      <ImageModal producto={selectedProduct} onClose={handleCloseImageModal} />
    </div>
  );
}

export default App;