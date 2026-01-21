import React from 'react';

const ClosetIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <circle cx="10" cy="12" r="0.5" fill="currentColor" />
    <circle cx="14" cy="12" r="0.5" fill="currentColor" />
  </svg>
);

interface HeaderProps {
  cestaCount: number;        
  onOpenCesta: () => void;   
  onGoToCatalogue: () => void; 
}

const Header: React.FC<HeaderProps> = ({ cestaCount, onOpenCesta, onGoToCatalogue }) => {
  
  const externalWebUrl = "https://asociacionsambrona.com/"; 

  return (
    <header className="fixed top-0 left-0 z-40 w-full py-4 bg-white border-b border-gray-200 shadow-md">
      <div className="flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
     
        <a 
          href={externalWebUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-2xl font-black tracking-widest text-gray-900 uppercase transition duration-200 hover:opacity-75"
        >
          <img 
            src="/TRES EN LA RAYA.png" 
            alt="/TRES EN LA RAYA" 
            className="w-auto h-12" 
          />
          <span className="sr-only">Armario Escénico</span>
        </a>
       
        <nav className="flex items-center space-x-8">
            <ul className="flex space-x-6 text-sm font-medium uppercase">
                <li>
                    <button 
                        onClick={onGoToCatalogue} 
                        className="font-bold tracking-tight transition duration-150 hover:text-gray-500"
                    >
                        ARMARIO
                    </button>
                </li>
            </ul>

            <div 
                className="relative p-2 transition duration-150 rounded-full cursor-pointer hover:bg-gray-100 group"
                onClick={onOpenCesta}
                aria-label="Ver armario"
            >
                <ClosetIcon 
                  size={24} 
                  className="text-gray-900 transition-colors group-hover:text-indigo-600" 
                />

                {cestaCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-600 border-2 rounded-full border-white animate-in zoom-in">
                        {cestaCount}
                    </span>
                )}
            </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

export const App = () => (
  <div className="min-h-screen pt-20 bg-gray-50">
    <Header 
      cestaCount={3} 
      onOpenCesta={() => console.log("Abrir Armario")} 
      onGoToCatalogue={() => console.log("Ir al catálogo")} 
    />
    <div className="p-10 text-center text-gray-400">
      <p>Visualización del Header con el icono de armario.</p>
    </div>
  </div>
);