
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
    const conflict = history.find(item => item.selectedDateTime === appointment.selectedDateTime);
    if (conflict) {
      navigate(RoutePath.CONFLICT);
    } else {
      navigate(RoutePath.SUCCESS);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-hidden">
      <Header title="Confirmación de cita" showBack />
      <SectionTitle>AGENDANDO</SectionTitle>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-1">
          <div className="mb-3 rounded-2xl overflow-hidden shadow-sm shrink-0">
             <img 
              src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=800&auto=format&fit=crop" 
              alt="Ilustración de cuidado" 
              className="w-full h-28 object-cover"
             />
          </div>

          <h3 className="text-slate-700 font-bold mb-2 text-xs">Por favor, revisa los detalles de tu cita</h3>

          <div className="space-y-1.5 mb-4">
            <InfoCard label="Fecha y Hora" value={appointment.selectedDateTime || ""} />
            <InfoCard label="Centro de salud" value={appointment.healthCenter || ""} />
            <InfoCard label="Tipo de cita" value={appointment.type === 'REGULAR' ? 'Control prenatal' : appointment.type || 'Control prenatal'} />
            <InfoCard label="Obstetra a cargo" value={appointment.selectedDoctor || ""} />
          </div>

          {/* Nueva sección de reseñas */}
          <div className="mb-6">
            <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 px-1">Reseñas de otras pacientes</h4>
            <div className="space-y-2">
              {[
                { id: 1, patient: "María G.", comment: "Excelente atención, muy paciente y explica todo con detalle.", rating: 5 },
                { id: 2, patient: "Lucía R.", comment: "Me sentí muy cómoda durante la consulta. Muy profesional.", rating: 5 },
                { id: 3, patient: "Ana P.", comment: "Puntual y amable. Resolvió todas mis dudas sobre el embarazo.", rating: 4 },
              ].map((review) => (
                <div key={review.id} className="bg-pink-50/50 p-3 rounded-xl border border-pink-100/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-600">{review.patient}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-2.5 h-2.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 space-y-2 pb-4 pt-2 border-t border-gray-50 bg-white">
          <PrimaryButton onClick={handleConfirm} className="py-3.5">
            CONFIRMAR CITA
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate(RoutePath.SCHEDULE_FORM)} className="py-3.5">
            REGRESAR Y CAMBIAR DATOS
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default ReviewConfirmation;
