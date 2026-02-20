
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath, AppointmentData } from '../types';
import { SectionTitle, InfoCard, PrimaryButton, Logo, Header } from '../components/Shared';
import { CheckCircle2, ChevronRight, MapPin, Calendar } from 'lucide-react';

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
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-y-auto">
      <Header title="VidaMaterna" />
      <SectionTitle>CITA CONFIRMADA</SectionTitle>

      <div className="flex-1 flex flex-col items-center p-6 pt-0">
        <div className="bg-[#F9B2C1] p-3 rounded-full mb-4 mt-2 shadow-lg shadow-pink-100">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-lg font-bold text-slate-800 text-center mb-6 px-4">
          ¡Todo listo! Tu cita ha sido programada
        </h2>

        <div className="w-full space-y-2 mb-6">
          <InfoCard label="Fecha y Hora" value={appointment.selectedDateTime || ""} />
          <InfoCard label="Obstetra" value={appointment.selectedDoctor || ""} />
          <InfoCard label="Ubicación" value={appointment.healthCenter || ""} />
        </div>

        <button 
          onClick={() => navigate(RoutePath.MAP)}
          className="w-full flex items-center justify-center gap-3 border-2 border-[#F9B2C1] text-[#F9B2C1] font-bold py-2.5 px-6 rounded-xl mb-4 active:scale-95 transition-all text-xs"
        >
           <MapPin className="w-4 h-4" />
           ABRIR MAPA DE UBICACIÓN
           <ChevronRight className="w-4 h-4 ml-auto opacity-40" />
        </button>

        <div className="w-full space-y-3">
          <PrimaryButton onClick={handleAddToCalendar} className="flex items-center justify-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            AÑADIR A MI CALENDARIO
          </PrimaryButton>
          <button 
            onClick={() => navigate(RoutePath.HOME)}
            className="w-full text-slate-400 font-bold py-2 text-[10px] tracking-[0.2em] uppercase"
          >
            VOLVER AL INICIO
          </button>
        </div>

        <div className="mt-6 text-center text-slate-400 font-medium italic space-y-0.5">
          <p className="text-[10px]">“Recuerda llegar 15 min antes”</p>
          <p className="text-[10px]">“Trae tu DNI y carnet de control”</p>
        </div>

        <div className="mt-auto flex flex-col items-center pt-6 pb-2 opacity-30">
          <Logo className="w-6 h-6" />
          <span className="text-[#F9B2C1] font-bold text-[7px] tracking-[0.4em]">VidaMaterna</span>
        </div>
      </div>
    </div>
  );
};

export default Success;
