
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath, AppointmentData } from '../types';
import { SectionTitle, InfoCard, PrimaryButton, Logo, Header } from '../components/Shared';
import { CheckCircle2, MapPin, Calendar, ClipboardList, Info } from 'lucide-react';

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

  const getRequirements = () => {
    switch (appointment.type) {
      case 'HIGH_RISK':
        return [
          "Traer resultados recientes de laboratorio.",
          "Avisar si presentas dolor intenso o sangrado.",
          "Evitar desplazamientos largos antes de la cita."
        ];
      case 'ULTRASOUND':
        return [
          "Tomar agua 30 minutos antes para una mejor visualización.",
          "Traer ecografías anteriores si las tienes.",
          "Evitar cremas en el abdomen el día previo."
        ];
      case 'REGULAR':
      default:
        return [
          "Llevar carnet de control prenatal.",
          "Registrar últimos síntomas importantes.",
          "Llegar 10 minutos antes."
        ];
    }
  };

  const requirements = getRequirements();

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-hidden">
      <Header title="Cita Confirmada" />
      <SectionTitle>FINALIZADO</SectionTitle>

      <div className="flex-1 flex flex-col items-center p-6 py-1 overflow-y-auto">
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
          className="w-full flex items-center justify-center gap-2 border-2 border-[#F9B2C1] text-[#F9B2C1] font-bold py-2.5 px-6 rounded-xl mb-4 active:scale-95 transition-all text-[11px] shrink-0"
        >
           <MapPin className="w-3.5 h-3.5" />
           <span>ABRIR MAPA DE UBICACIÓN</span>
        </button>

        {/* Nueva sección de requisitos */}
        <div className="w-full mb-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList className="w-4 h-4 text-[#F9B2C1]" />
            <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Requisitos para tu cita</h3>
          </div>
          <ul className="space-y-2.5">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <div className="mt-1 shrink-0">
                  <Info className="w-3 h-3 text-[#F9B2C1]" />
                </div>
                <span className="text-[11px] text-slate-500 leading-tight">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full space-y-2 mb-4">
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

        <div className="mt-auto flex flex-col items-center pt-2 pb-2 opacity-30 shrink-0">
          <Logo className="w-5 h-5" />
          <span className="text-[#F9B2C1] font-bold text-[6px] tracking-[0.4em]">VidaMaterna</span>
        </div>
      </div>
    </div>
  );
};

export default Success;
