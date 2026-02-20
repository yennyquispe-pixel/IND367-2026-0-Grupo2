
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types';
import { PrimaryButton, SecondaryButton, Logo } from '../components/Shared';

interface Props {
  onNewAppointment?: () => void;
}

const Home: React.FC<Props> = ({ onNewAppointment }) => {
  const navigate = useNavigate();

  const handleNewAppointment = () => {
    if (onNewAppointment) onNewAppointment();
    navigate(RoutePath.SCHEDULE_FORM);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full animate-fadeIn overflow-hidden">
      {/* Header con Logo SVG y nombre debajo */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <Logo className="w-28 h-28" showText />
      </div>

      <h2 className="text-slate-400 font-extrabold mb-8 uppercase tracking-[0.3em] text-[10px] bg-slate-50 px-3 py-1 rounded-full">Gestión de Citas</h2>

      <div className="relative mb-10">
        <div className="absolute inset-0 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10 scale-125"></div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop" 
            alt="Cuidado prenatal profesional" 
            className="w-52 h-52 rounded-full object-cover border-[10px] border-white shadow-2xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-full shadow-xl">
            <Logo className="w-8 h-8" />
          </div>
        </div>
      </div>

      <p className="text-slate-500 text-center text-sm leading-relaxed mb-10 px-4 font-medium max-w-xs">
        Tu bienestar y el de tu bebé son nuestra prioridad. <span className="text-slate-800 font-bold">Gestiona tus controles</span> con especialistas de confianza.
      </p>

      <div className="w-full space-y-4 max-w-sm">
        <PrimaryButton onClick={handleNewAppointment}>
          AGENDAR NUEVA CITA
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate(RoutePath.CALENDAR)}>
          VER MIS CITAS PROGRAMADAS
        </SecondaryButton>
      </div>
    </div>
  );
};

export default Home;
