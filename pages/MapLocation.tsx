
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentData, RoutePath } from '../types';
import { Header, PrimaryButton } from '../components/Shared';
import { MapPin, Navigation, Phone, Info, Globe } from 'lucide-react';

interface Props {
  appointment: AppointmentData;
}

const MapLocation: React.FC<Props> = ({ appointment }) => {
  const navigate = useNavigate();
  const mapCenter = appointment.healthCenter || "Establecimiento de Salud";
  
  // Una imagen de mapa referencial con un estilo de ciudad detallada
  const NEW_MAP_URL = "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-hidden">
      <Header title="Ubicación" showBack />
      
      {/* Imagen del Mapa elevada */}
      <div className="relative h-[42%] w-full bg-slate-900 shrink-0">
        <img 
          src={NEW_MAP_URL} 
          alt="Mapa de ubicación referencial" 
          className="w-full h-full object-cover opacity-90 contrast-[1.05]"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
        
        {/* Marcador central estilizado */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
           <div className="bg-[#F9B2C1] p-4 rounded-full shadow-[0_0_30px_rgba(249,178,193,0.6)] animate-pulse mb-2">
              <MapPin className="w-8 h-8 text-white" />
           </div>
           <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg">
              <span className="text-[9px] font-bold text-slate-800 uppercase tracking-[0.15em]">Sede Destino</span>
           </div>
        </div>

        <div className="absolute bottom-6 left-6 flex items-center gap-3">
           <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
              <Globe className="w-4 h-4 text-white" />
           </div>
           <div className="flex flex-col">
              <span className="text-[8px] text-pink-100/80 font-bold uppercase tracking-widest">Red de Salud VidaMaterna</span>
           </div>
        </div>
      </div>

      {/* Panel de Información elevado con margen negativo */}
      <div className="flex-1 p-6 -mt-12 bg-white rounded-t-[36px] shadow-[0_-15px_40px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden flex flex-col">
        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-5 shrink-0"></div>
        
        <div className="flex justify-between items-start mb-4 shrink-0">
          <div className="flex-1 pr-4">
            <h2 className="text-xl font-extrabold text-slate-800 leading-tight mb-1 truncate">{mapCenter}</h2>
            <div className="flex items-center gap-1.5 text-slate-400">
               <MapPin className="w-3.5 h-3.5 text-[#F9B2C1]" />
               <p className="text-[10px] font-medium">Sede Central - Atención Prenatal</p>
            </div>
          </div>
          <div className="bg-pink-50 p-3.5 rounded-2xl shadow-sm border border-pink-100 shrink-0">
            <Navigation className="w-6 h-6 text-[#F9B2C1]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
          <div className="bg-[#FDE2F3]/30 p-3 rounded-2xl flex flex-col gap-1 border border-pink-50">
            <Phone className="w-4 h-4 text-[#F9B2C1] mb-1" />
            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Contacto</span>
            <span className="text-[11px] font-bold text-slate-700">Central Telefónica</span>
          </div>
          <div className="bg-[#FDE2F3]/30 p-3 rounded-2xl flex flex-col gap-1 border border-pink-50">
            <Info className="w-4 h-4 text-[#F9B2C1] mb-1" />
            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Ubicación</span>
            <span className="text-[11px] font-bold text-slate-700">Piso 2 - Ala Norte</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100 shrink-0">
          <p className="text-[11px] text-slate-500 leading-snug">
            <span className="font-extrabold text-[#F9B2C1] uppercase tracking-tighter mr-1 italic">Cómo llegar:</span> 
            <span className="italic">Ingresa por el pabellón de consultorios externos y sigue las líneas guía de color rosado hasta el área de Obstetricia.</span>
          </p>
        </div>

        <div className="mt-auto pb-2">
          <PrimaryButton onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapCenter)}`, '_blank')} className="flex items-center justify-center gap-2 py-3.5">
            <Navigation className="w-4 h-4" />
            INICIAR NAVEGACIÓN
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default MapLocation;
