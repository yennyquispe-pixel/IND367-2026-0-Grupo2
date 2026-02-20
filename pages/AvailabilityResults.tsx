
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath, AppointmentData } from '../types';
import { SectionTitle, PrimaryButton, Header } from '../components/Shared';
import { ChevronDown, MapPin, User, Clock, Check } from 'lucide-react';

interface Props {
  appointment: AppointmentData;
  onUpdate: (data: Partial<AppointmentData>) => void;
}

// Mapeo estricto de especialistas por centro
const CENTER_SPECIALISTS: Record<string, string[]> = {
  "Hospital Nacional Edgardo Rebagliati Martins": ["Garay, P.", "Mendoza, L.", "Rojas, J."],
  "Clínica Milagros": ["Sánchez, M.", "Vargas, R.", "Castillo, K."],
  "Policlínico Pablo Bermúdez": ["Torres, F.", "Quispe, G.", "Ramírez, A."],
  "Hospital Nacional Alberto Sabogal Sologuren": ["Zegarra, B.", "Huamán, A.", "Pérez, C."],
  "Instituto Nacional Materno Perinatal (Maternidad de Lima)": ["Soto, M.", "Vega, L.", "López, D."],
  "Hospital María Auxiliadora": ["Díaz, F.", "Ruiz, G.", "García, P."],
  "Hospital San Bartolomé": ["Morales, J.", "Blanco, K.", "Flores, N."],
};

const DEFAULT_POOL = ["Especialista A", "Especialista B", "Especialista C"];

const AvailabilityResults: React.FC<Props> = ({ appointment, onUpdate }) => {
  const navigate = useNavigate();
  
  const [showTimes, setShowTimes] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);

  const getDoctorsForCenter = (center: string) => {
    return CENTER_SPECIALISTS[center] || DEFAULT_POOL;
  };

  const times = ["08:00 AM", "10:30 AM", "14:00 PM", "16:00 PM", "18:30 PM"];

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Seleccionar Fecha";
    const date = new Date(dateStr + "T00:00:00");
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleSelectTime = (time: string) => {
    const displayDate = formatDate(appointment.tentativeDate);
    onUpdate({ selectedDateTime: `${displayDate} - ${time}` });
    setShowTimes(false);
  };

  const handleSelectDoctor = (doctor: string) => {
    onUpdate({ selectedDoctor: doctor, selectedDateTime: undefined });
    setShowDoctors(false);
  };

  const currentDoctors = appointment.healthCenter ? getDoctorsForCenter(appointment.healthCenter) : [];

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-hidden">
      <Header title="Disponibilidad" showBack />
      <SectionTitle>ELIJA SU PREFERENCIA</SectionTitle>
      
      <div className="px-6 space-y-4 flex-1 pt-1 overflow-y-auto pb-4">
        {/* Sección de Establecimiento Fija (Sticky) - Ahora solo muestra la opción elegida */}
        <div className="sticky top-0 bg-white z-40 pt-2 pb-3 border-b border-transparent shadow-[0_10px_15px_-15px_rgba(0,0,0,0.1)]">
          <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-3 ml-1">Personaliza tu cita médica:</p>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
               <MapPin className="w-3.5 h-3.5 text-[#F9B2C1]" />
               <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Establecimiento Seleccionado</span>
            </div>
            <div className="relative">
               <div className="bg-pink-50/50 border border-pink-100 rounded-2xl p-3.5 flex justify-between items-center transition-all">
                  <span className="font-bold text-sm truncate pr-4 text-slate-800">
                    {appointment.healthCenter || "No seleccionado"}
                  </span>
                  {/* Se remueve el icono de flecha ya que no es un menú desplegable */}
                  <div className="bg-[#F9B2C1] rounded-full p-1 shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {/* 2. Doctor */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
               <User className="w-3.5 h-3.5 text-[#F9B2C1]" />
               <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Obstetra / Especialista</span>
            </div>
            <div className="relative">
              <div 
                className={`bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center cursor-pointer transition-all ${!appointment.healthCenter ? 'opacity-40 grayscale cursor-not-allowed' : ''} ${showDoctors ? 'ring-2 ring-[#F9B2C1] shadow-md border-transparent' : ''}`}
                onClick={() => { if(appointment.healthCenter) { setShowDoctors(!showDoctors); setShowTimes(false); } }}>
                <span className={`font-medium text-sm ${appointment.selectedDoctor ? 'text-slate-800' : 'text-slate-400'}`}>
                  {appointment.selectedDoctor || "Elegir especialista"}
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform ${showDoctors ? 'rotate-180' : ''}`} />
              </div>
              {showDoctors && (
                <div className="absolute top-full left-0 right-0 z-30 bg-white shadow-2xl border border-pink-100 rounded-2xl mt-1 max-h-40 overflow-y-auto py-1">
                  {currentDoctors.map((d) => (
                    <button key={d} onClick={() => handleSelectDoctor(d)} className="w-full text-left px-5 py-3 text-[11px] font-medium text-slate-700 hover:bg-pink-50 flex items-center justify-between border-b last:border-0 border-pink-50">
                      <span>Dr. {d}</span>
                      {appointment.selectedDoctor === d && <Check className="w-4 h-4 text-[#F9B2C1]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Horario */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
               <Clock className="w-3.5 h-3.5 text-[#F9B2C1]" />
               <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Horario disponible</span>
            </div>
            <div className="relative">
              <div 
                className={`bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center cursor-pointer transition-all ${!appointment.selectedDoctor ? 'opacity-40 grayscale cursor-not-allowed' : ''} ${showTimes ? 'ring-2 ring-[#F9B2C1] shadow-md border-transparent' : ''}`}
                onClick={() => { if(appointment.selectedDoctor) { setShowTimes(!showTimes); setShowDoctors(false); } }}>
                <div className="flex flex-col">
                  <span className="text-[9px] font-extrabold text-[#F9B2C1] uppercase tracking-tighter">{formatDate(appointment.tentativeDate)}</span>
                  <span className={`font-medium text-sm ${appointment.selectedDateTime ? 'text-slate-800' : 'text-slate-400'}`}>
                    {appointment.selectedDateTime?.split(' - ')[1] || "Elegir hora"}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform ${showTimes ? 'rotate-180' : ''}`} />
              </div>
              {showTimes && (
                <div className="absolute top-full left-0 right-0 z-20 bg-white shadow-2xl border border-pink-100 rounded-2xl mt-1 max-h-40 overflow-y-auto py-1">
                  {times.map((t) => (
                    <button key={t} onClick={() => handleSelectTime(t)} className="w-full text-left px-5 py-3 text-[11px] font-medium text-slate-700 hover:bg-pink-50 flex items-center justify-between border-b last:border-0 border-pink-50">
                      <span>{t}</span>
                      {appointment.selectedDateTime?.includes(t) && <Check className="w-4 h-4 text-[#F9B2C1]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 mt-2">
            <h4 className="text-[10px] text-[#F9B2C1] font-extrabold uppercase tracking-widest mb-2">Resumen de búsqueda:</h4>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Tipo</span>
                <span className="text-[11px] font-medium text-slate-700">{appointment.type || 'No definido'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Periodo</span>
                <span className="text-[11px] font-medium text-slate-700">{appointment.week || 'No definido'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100 shrink-0">
        <PrimaryButton 
          onClick={() => navigate(RoutePath.CONFIRMATION)}
          disabled={!appointment.selectedDateTime || !appointment.selectedDoctor || !appointment.healthCenter}
        >
          VERIFICAR Y CONFIRMAR
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AvailabilityResults;
