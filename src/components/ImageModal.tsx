import React, { useState } from 'react';
import { ItemPrenda } from '../data/productos'; 

interface ImageModalProps {
  producto: ItemPrenda | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ producto, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!producto) {
      if (currentImageIndex !== 0) setCurrentImageIndex(0);
      return null; 
  }

  const totalImages = producto.imagenesUrl.length;

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };


  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
  
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="relative flex-shrink-0 w-full h-64 md:w-2/3 md:h-auto">
          <img 
            src={producto.imagenesUrl[currentImageIndex]} 
            alt={`${producto.nombre} - Vista ${currentImageIndex + 1}`}
            className="object-contain w-full h-full" 
          />
          
          {totalImages > 1 && (
            <>
              <button onClick={goToPrev} className="absolute left-0 p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-r-lg top-1/2 hover:bg-opacity-75">
                {'<'}
              </button>
              <button onClick={goToNext} className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-l-lg top-1/2 hover:bg-opacity-75">
                {'>'}
              </button>
            </>
          )}
        </div>

        <div className="w-full p-4 overflow-y-auto md:w-1/3">
          <h2 className="mb-1 text-2xl font-bold">{producto.nombre}</h2>
          <p className="mb-4 text-sm text-gray-600 uppercase">
            {producto.categoria} | Nº {producto.productoId}
          </p>
          
          <h3 className="pb-1 mt-4 mb-2 text-lg font-semibold border-b">Ficha Técnica</h3>
          <ul className="space-y-2 text-sm">
            <li><span className="font-semibold">ID de Stock:</span> {producto.itemId}</li>
            <li><span className="font-semibold">Talla:</span> {producto.talla}</li>
            <li><span className="font-semibold">Época:</span> {producto.epoca}</li>
            <li><span className="font-semibold">Tipo:</span> {producto.tipoPrenda}</li>
            <li><span className="font-semibold">Género:</span> {producto.genero}</li>
            <li><span className="font-semibold">Clase Social:</span> {producto.claseSocial}</li>
            <li><span className="font-semibold">Color:</span> {producto.color}</li>
            <li><span className="font-semibold">Tejido:</span> {producto.tejido}</li>
          </ul>

          <ul className="space-y-2 text-sm">
            <li><span className="font-semibold">Medidas:</span> {producto.medidas}</li>
            <li><span className="font-semibold">Obra Original:</span> {producto.obra}</li>
          </ul>

          {producto.observaciones && (
              <div className="p-3 mt-4 text-xs bg-gray-100 border border-gray-200 rounded">
                <span className="font-semibold">Observaciones:</span> {producto.observaciones}
              </div>
          )}

          <p className="mt-4 text-xs text-gray-500">Vista {currentImageIndex + 1} de {totalImages}</p>

          <button onClick={onClose} className="w-full py-2 mt-4 text-white transition duration-300 bg-gray-900 rounded hover:bg-gray-700">
            Cerrar Ficha
          </button>
        </div>

        <button onClick={onClose} className="absolute p-1 text-2xl leading-none text-gray-700 top-2 right-2 hover:text-black">
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;