import React, { useRef, useEffect, useCallback } from 'react';
import { ItemPrenda } from '../data/productos';
const ClosetIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M12 3v18" />
    <path d="M9 11v2" />
    <path d="M15 11v2" />
    <path d="M7 21v1" />
    <path d="M17 21v1" />
  </svg>
);

interface CestaModalProps {
  cestaItems: ItemPrenda[];   
  isOpen: boolean;            
  onClose: () => void;        
  onRemove: (itemId: string) => void; 
  onSubmit: () => void;
  onClearCesta?: () => void;
}

const CestaModal: React.FC<CestaModalProps> = ({ cestaItems, isOpen, onClose, onRemove, onSubmit, onClearCesta }) => {
  if (!isOpen) {
    return null;
  }

  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleClear = () => {
      if (onClearCesta) {
          onClearCesta();
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
      <div 
        ref={modalContentRef} 
        className="flex flex-col w-full h-full max-w-md overflow-y-auto bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 p-6 bg-white border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black leading-tight text-gray-900 uppercase">
                Mi Armario
              </h2>
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                {cestaItems.length} prendas seleccionadas
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-xs font-bold text-gray-400 uppercase transition-colors hover:text-gray-900">
               Cerrar
            </button>
          </div>
        </div>

        <div className="flex-grow p-6 space-y-4">
          {cestaItems.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <ClosetIcon size={64} className="mb-4 text-gray-200" />
              <p className="italic text-gray-500">Tu armario está vacío.</p>
            </div>
          ) : (
            cestaItems.map(item => (
              <div key={item.itemId} className="flex items-center justify-between pb-4 border-b border-gray-50">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.imagenesUrl[0]} 
                    alt={item.nombre} 
                    className="flex-shrink-0 object-cover w-16 h-20 border border-gray-100 rounded-lg shadow-sm" 
                  /> 
                  <div>
                    <p className="text-sm font-bold leading-tight text-gray-900">{item.nombre}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mt-1">
                      Talla: {item.talla} • ID: {item.itemId}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.itemId)}
                  className="text-[10px] font-black uppercase text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="sticky bottom-0 p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-3">
            <button 
                onClick={onSubmit} 
                disabled={cestaItems.length === 0}
                className="flex items-center justify-center w-full gap-2 py-4 text-sm font-black tracking-widest text-white uppercase transition bg-gray-900 rounded-xl hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400"
            >
                Confirmar Selección
            </button>
            
            {onClearCesta && (
                <button 
                    onClick={handleClear} 
                    disabled={cestaItems.length === 0}
                    className="flex items-center justify-center w-full py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest transition hover:text-red-600 disabled:opacity-0"
                >
                    <ClosetIcon size={14} className="mr-2" />
                    Vaciar Armario
                </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CestaModal;