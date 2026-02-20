
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentData, RoutePath } from '../types';
import { Header, PrimaryButton } from '../components/Shared';
import { MapPin, Navigation, Phone, Info } from 'lucide-react';

interface Props {
  appointment: AppointmentData;
}

const MapLocation: React.FC<Props> = ({ appointment }) => {
  const navigate = useNavigate();

  // URL de mapa estático de ejemplo basada en el centro seleccionado
  const mapCenter = appointment.healthCenter || "Lima, Peru";
  const encodedLocation = encodeURIComponent(mapCenter);

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-hidden">
      <Header title="Ubicación" showBack />
      
      {/* Mapa interactivo simulado con Iframe */}
      <div className="relative h-[45%] w-full bg-slate-100 shrink-0">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_ACTUAL_KEY&q=${encodedLocation}&zoom=15`}
          allowFullScreen
          className="grayscale-[20%] contrast-[1.1]"
        ></iframe>
        
        {/* Fallback visual si el iframe no carga o para estética de la App */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F9B2C1] p-3 rounded-full shadow-2xl animate-pulse">
           <MapPin className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="flex-1 p-6 -mt-8 bg-white rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative z-10 overflow-y-auto">
        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8"></div>
        
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-extrabold text-slate-800 leading-tight mb-2">{appointment.healthCenter || "Establecimiento"}</h2>
            <div className="flex items-center gap-1.5 text-slate-400">
               <MapPin className="w-3.5 h-3.5" />
               <p className="text-xs font-medium">Av. Principal 450, Centro de Ciudad</p>
            </div>
          </div>
          <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-100 shrink-0">
            <Navigation className="w-6 h-6 text-[#F9B2C1]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#FDE2F3]/40 p-4 rounded-2xl flex flex-col gap-1.5 border border-pink-50">
            <Phone className="w-5 h-5 text-slate-600 mb-1" />
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Contacto</span>
            <span className="text-xs font-bold text-slate-700">(01) 444-1234</span>
          </div>
          <div className="bg-[#FDE2F3]/40 p-4 rounded-2xl flex flex-col gap-1.5 border border-pink-50">
            <Info className="w-5 h-5 text-slate-600 mb-1" />
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Horario</span>
            <span className="text-xs font-bold text-slate-700">Abierto 24h</span>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl mb-8 border border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-extrabold text-slate-700 uppercase tracking-tighter mr-1">Cómo llegar:</span> 
            Al ingresar, dirígete al pabellón de Obstetricia. El consultorio del Dr. {appointment.selectedDoctor?.split(',')[0] || "especialista"} está en el segundo nivel.
          </p>
        </div>

        <PrimaryButton onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')} className="flex items-center justify-center gap-3">
          <Navigation className="w-5 h-5" />
          ESTABLECER RUTA
        </PrimaryButton>
        
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default MapLocation;
