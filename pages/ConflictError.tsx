
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentData, RoutePath } from '../types';
import { Header, Logo, PrimaryButton } from '../components/Shared';
import { AlertTriangle, Clock } from 'lucide-react';

interface Props {
  appointment: AppointmentData;
}

const ConflictError: React.FC<Props> = ({ appointment }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white">
      <Header title="Conflicto de Cita" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-amber-50 p-6 rounded-full mb-6 border-4 border-amber-100">
          <AlertTriangle className="w-16 h-16 text-amber-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4">¡Horario no disponible!</h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          Ya tienes programada una cita prenatal para el día y hora seleccionados:
          <br />
          <span className="font-bold text-[#F9B2C1] block mt-2 bg-pink-50 py-2 rounded-lg">
            {appointment.selectedDateTime}
          </span>
        </p>

        <div className="w-full bg-slate-50 p-4 rounded-xl mb-8 border border-slate-100 flex items-start gap-3 text-left">
          <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400">
            No es posible agendar dos citas en el mismo horario. Por favor, selecciona una fecha o un horario diferente para continuar.
          </p>
        </div>

        <PrimaryButton onClick={() => navigate(RoutePath.AVAILABILITY)}>
          CAMBIAR HORARIO
        </PrimaryButton>
        
        <button 
          onClick={() => navigate(RoutePath.HOME)}
          className="mt-6 text-slate-400 font-bold py-2 text-sm hover:text-slate-600 transition-colors"
        >
          CANCELAR Y VOLVER AL INICIO
        </button>
      </div>

      <div className="p-8 flex flex-col items-center opacity-20 mt-auto">
        <Logo className="w-8 h-8" />
        <span className="text-[8px] font-bold tracking-[0.4em] text-slate-800 uppercase">VidaMaterna</span>
      </div>
    </div>
  );
};

export default ConflictError;
