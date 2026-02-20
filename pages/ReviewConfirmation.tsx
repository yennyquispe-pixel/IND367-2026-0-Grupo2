
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath, AppointmentData } from '../types';
import { Header, SectionTitle, PrimaryButton, SecondaryButton, InfoCard } from '../components/Shared';

interface Props {
  appointment: AppointmentData;
  history: AppointmentData[];
}

const ReviewConfirmation: React.FC<Props> = ({ appointment, history }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Check for conflict: same date AND same time
    const conflict = history.find(item => item.selectedDateTime === appointment.selectedDateTime);
    
    if (conflict) {
      navigate(RoutePath.CONFLICT);
    } else {
      navigate(RoutePath.SUCCESS);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <Header title="VidaMaterna" showBack />
      <SectionTitle>CONFIRMACIÓN DE CITA</SectionTitle>

      <div className="flex-1 flex flex-col p-6">
        <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
           <img 
            src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop" 
            alt="Ilustración de cuidado" 
            className="w-full h-40 object-cover"
           />
        </div>

        <h3 className="text-slate-700 font-bold mb-4">Por favor, revisa los detalles de tu cita</h3>

        <div className="space-y-1">
          <InfoCard label="Fecha y Hora" value={appointment.selectedDateTime || ""} />
          <InfoCard label="Centro de salud" value={appointment.healthCenter || ""} />
          <InfoCard label="Tipo de cita" value={appointment.type === 'REGULAR' ? 'Control prenatal' : appointment.type || 'Control prenatal'} />
          <InfoCard label="Obstetra a cargo" value={appointment.selectedDoctor || ""} />
        </div>

        <div className="mt-auto space-y-4 pt-6">
          <PrimaryButton onClick={handleConfirm}>
            CONFIRMAR CITA
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate(RoutePath.SCHEDULE_FORM)}>
            REGRESAR Y CAMBIAR DATOS
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ReviewConfirmation;
