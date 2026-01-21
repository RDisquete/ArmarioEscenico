import React, { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { ItemPrenda } from '../data/productos';

interface DatosUsuario {
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
}

interface FormularioProps {
  cestaItems: ItemPrenda[]; 
  onBackToCatalogue: () => void;
  onSubmit: (datos: DatosUsuario) => void;
}

const FormularioSolicitud: React.FC<FormularioProps> = ({ cestaItems, onBackToCatalogue, onSubmit }) => {
  
  const formId = (import.meta as any).env.VITE_FORMSPREE_ID;
  const [state, handleSubmitFormspree] = useForm(formId || "");
  
  const [mostrarExitoPersistente, setMostrarExitoPersistente] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setMostrarExitoPersistente(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const timer = setTimeout(() => {
        onSubmit({
          nombre: '',
          direccion: '',
          telefono: '',
          correo: ''
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded, onSubmit]);

  const resumenCestaTexto = cestaItems
    .map((item, index) => (
      `${index + 1}. PRENDA: ${item.nombre}\n` +
      `   ID/REF: ${item.itemId}\n` +
      `   TALLA: ${item.talla}\n` +
      `-----------------------`
    ))
    .join('\n\n');

  if (state.succeeded || mostrarExitoPersistente) {
    return (
      <div className="max-w-4xl px-4 py-32 mx-auto text-center animate-pulse">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-green-100 rounded-full">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="mb-4 text-4xl italic font-black text-gray-900 uppercase">¡Solicitud Enviada!</h2>
        <p className="max-w-lg mx-auto mb-8 text-xl text-gray-600">
          Hemos recibido tu selección correctamente. Nos pondremos en contacto contigo pronto para hablar sobre el alquiler. 
        </p>
        <p className="text-sm tracking-widest text-gray-400 uppercase animate-bounce">
          Cerrando confirmación en unos segundos...
        </p>
        <button 
          onClick={onBackToCatalogue} 
          className="px-10 py-4 mt-8 font-bold tracking-widest text-white uppercase transition bg-gray-900 shadow-xl hover:bg-black"
        >
          Volver al Catálogo Ahora
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[80vh]">
      <button 
        onClick={onBackToCatalogue} 
        className="flex items-center mb-8 text-sm font-medium text-gray-600 uppercase transition hover:text-gray-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al Catálogo
      </button>

      <h2 className="mb-10 text-5xl italic font-black leading-tight tracking-tighter text-gray-900 uppercase">
        Confirmar Solicitud
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          
          {!formId && (
            <div className="p-4 mb-4 text-sm italic font-bold text-red-700 border-l-4 border-red-500 bg-red-50">
              Error técnico: VITE_FORMSPREE_ID no configurado en el archivo .env.
            </div>
          )}

          <form onSubmit={handleSubmitFormspree} className="p-8 space-y-6 bg-white border border-gray-200 shadow-md">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 uppercase">Datos de Contacto</h3>
            
            <textarea 
              name="lista_articulos" 
              value={resumenCestaTexto} 
              readOnly 
              className="hidden" 
            />
            <input type="hidden" name="_subject" value={`Reserva de Vestuario: ${cestaItems.length} prendas`} />

            <div className="space-y-4">
              <input 
                type="text" 
                name="nombre_completo" 
                placeholder="Nombre y Apellidos" 
                required 
                className="w-full p-3 text-lg transition bg-transparent border-b border-gray-300 outline-none focus:border-black"
              />
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <input 
                    id="email"
                    type="email" 
                    name="email" 
                    placeholder="Correo Electrónico" 
                    required 
                    className="w-full p-3 text-lg transition bg-transparent border-b border-gray-300 outline-none focus:border-black"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-sm text-red-500" />
                </div>

                <input 
                  type="tel" 
                  name="telefono" 
                  placeholder="Teléfono" 
                  required 
                  className="w-full p-3 text-lg transition bg-transparent border-b border-gray-300 outline-none focus:border-black"
                />
              </div>

              <textarea 
                name="mensaje_proyecto" 
                placeholder="Cuéntanos más sobre tu proyecto..." 
                className="w-full p-3 text-lg transition border-b border-gray-300 outline-none focus:border-black min-h-[120px] bg-transparent"
              />
            </div>
            
            <p className="pt-4 text-sm italic leading-relaxed text-gray-500">
                *Al enviar esta solicitud aceptas que nos pondremos en contacto contigo para gestionar el préstamo del vestuario.
            </p>

            <button 
              type="submit" 
              disabled={state.submitting || !formId || cestaItems.length === 0}
              className="w-full py-5 mt-8 text-xl font-black tracking-wider text-white uppercase transition bg-gray-900 shadow-xl hover:bg-black disabled:bg-gray-300"
            >
              {state.submitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </form>
        </div>

        <div className="sticky p-6 border border-gray-200 shadow-sm bg-gray-50 md:col-span-1 top-20 h-fit">
          <h3 className="pb-2 mb-4 text-xl font-bold uppercase border-b border-gray-900">
            Vestuario ({cestaItems.length})
          </h3>
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {cestaItems.map((item, index) => (
              <div key={`${item.itemId}-${index}`} className="flex items-start pb-3 space-x-3 border-b border-gray-100 last:border-0">
                <img 
                  src={item.imagenesUrl[0]} 
                  alt={item.nombre} 
                  className="flex-shrink-0 object-cover w-12 h-12 border border-gray-200 rounded-sm grayscale" 
                />
                <div>
                  <p className="text-[10px] font-bold uppercase leading-tight text-gray-900">{item.nombre}</p>
                  <p className="mt-1 text-[10px] font-bold text-gray-400 uppercase">Ref: {item.itemId} | Talla: {item.talla}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioSolicitud;