
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath, AppointmentData } from '../types';
import { SectionTitle, InfoCard, PrimaryButton, Logo, Header } from '../components/Shared';
import { CheckCircle2, MapPin, Calendar } from 'lucide-react';

interface Props {
  appointment: AppointmentData;
  onAddToCalendar: () => void;
}

const Success: React.FC<Props> = ({ appointment, onAddToCalendar }) => {
  const navigate = useNavigate();

  const handleAddToCalendar = () => {
    onAddToCalendar();
    navigate(RoutePath.CALENDAR);
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-hidden">
      <Header title="VidaMaterna" />
      <SectionTitle>CITA CONFIRMADA</SectionTitle>

      <div className="flex-1 flex flex-col items-center p-6 py-1 overflow-hidden">
        <div className="bg-[#F9B2C1] p-2 rounded-full mb-2 mt-1 shadow-md shadow-pink-100 shrink-0">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-sm font-bold text-slate-800 text-center mb-3 px-4 shrink-0 leading-tight">
          ¡Todo listo! Tu cita ha sido programada
        </h2>

        <div className="w-full space-y-1 mb-3">
          <InfoCard label="Fecha y Hora" value={appointment.selectedDateTime || ""} />
          <InfoCard label="Obstetra" value={appointment.selectedDoctor || ""} />
          <InfoCard label="Ubicación" value={appointment.healthCenter || ""} />
        </div>

        <button 
          onClick={() => navigate(RoutePath.MAP)}
          className="w-full flex items-center justify-center gap-2 border-2 border-[#F9B2C1] text-[#F9B2C1] font-bold py-2.5 px-6 rounded-xl mb-3 active:scale-95 transition-all text-[11px] shrink-0"
        >
           <MapPin className="w-3.5 h-3.5" />
           <span>ABRIR MAPA DE UBICACIÓN</span>
        </button>

        <div className="w-full space-y-2">
          <PrimaryButton onClick={handleAddToCalendar} className="flex items-center justify-center gap-2 text-xs py-3.5">
            <Calendar className="w-4 h-4" />
            AÑADIR A MI CALENDARIO
          </PrimaryButton>
          <button 
            onClick={() => navigate(RoutePath.HOME)}
            className="w-full text-slate-400 font-bold py-1 text-[8px] tracking-[0.2em] uppercase"
          >
            VOLVER AL INICIO
          </button>
        </div>

        <div className="mt-auto text-center text-slate-400 font-medium italic space-y-0.5 shrink-0">
          <p className="text-[9px]">“Recuerda llegar 15 min antes”</p>
          <p className="text-[9px]">“Trae tu DNI y carnet de control”</p>
        </div>

        <div className="mt-auto flex flex-col items-center pt-2 pb-2 opacity-30 shrink-0">
          <Logo className="w-5 h-5" />
          <span className="text-[#F9B2C1] font-bold text-[6px] tracking-[0.4em]">VidaMaterna</span>
        </div>
      </div>
    </div>
  );
};

export default Success;
