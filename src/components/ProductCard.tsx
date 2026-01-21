import React from 'react';
import { ItemPrenda } from '../data/productos'; 

interface ProductCardProps {
  producto: ItemPrenda;
  onAddToCesta: (itemId: string) => void; 
  onViewDetails: (producto: ItemPrenda) => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ producto, onAddToCesta, onViewDetails }) => {
  return (
    <div className="transition duration-200 bg-white border border-gray-200 cursor-pointer group hover:border-gray-800">
   
      <div 
        className="aspect-[3/4] overflow-hidden" 
        onClick={() => onViewDetails(producto)} 
      > 
        <img 
          className="object-cover w-full h-full transition duration-300 group-hover:opacity-80" 
          src={producto.imagenesUrl[0]} 
          alt={producto.nombre} 
        />
      </div>
      
      <div className="p-4 pt-3">
        <button 
            onClick={() => onAddToCesta(producto.itemId)}
            className="w-full py-2 mt-3 text-sm font-semibold text-white uppercase transition duration-300 bg-gray-900 hover:bg-gray-700"
        >
            Añadir al armario
        </button>
      </div>
    </div>
  );
};

export default ProductCard;