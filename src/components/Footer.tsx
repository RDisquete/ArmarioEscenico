import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * Componente Footer minimalista y simétrico.
 * Estructura: [Logo + Nombre] --- [Logo Institucional Central] --- [Botón Web]
 */
const Footer = () => {
  return (
    <footer className="py-12 mt-20 bg-white border-t border-gray-100">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* BLOQUE IZQUIERDO: Identidad y Logo Sambrona */}
          <div className="flex items-center flex-1 gap-5">
            <img 
              src="/TRES EN LA RAYA.png" 
              alt="Asociación Sambrona" 
              className="w-auto h-8 transition-all grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div className="w-px h-4 bg-gray-200"></div>
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-gray-900 italic">
              Tres en la Raya
            </span>
          </div>

          {/* BLOQUE CENTRAL: Logo Diputación (Protagonista) */}
          <div className="flex justify-center flex-1">
            <img 
              src="/Diputacion.png" 
              alt="Diputación de Badajoz" 
              className="w-auto h-20 transition-all duration-500 hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Logo_de_la_Diputaci%C3%B3n_de_Badajoz.svg/1200px-Logo_de_la_Diputaci%C3%B3n_de_Badajoz.svg.png";
              }}
            />
          </div>

          {/* BLOQUE DERECHO: Botón Web Principal */}
          <div className="flex justify-end flex-1">
            <a 
              href="https://www.asociacionsambrona.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-2.5 border border-gray-900 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Web Principal
              <ExternalLink size={12} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;