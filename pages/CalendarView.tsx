
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentData, RoutePath, AppointmentType } from '../types';
import { Header, Logo } from '../components/Shared';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, Plus, ChevronLeft, History } from 'lucide-react';

interface Props {
  history: AppointmentData[];
  onViewDetails: (apt: AppointmentData) => void;
}

const CalendarView: React.FC<Props> = ({ history, onViewDetails }) => {
  const navigate = useNavigate();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(1);
  };

  const filteredAppointments = useMemo(() => {
    return history.filter(apt => {
      if (!apt.tentativeDate) return false;
      const date = new Date(apt.tentativeDate + "T00:00:00");
      return (
        date.getDate() === selectedDay &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });
  }, [history, selectedDay, currentMonth, currentYear]);

  // Obtener todas las citas de un día específico para marcar en el calendario (anteriores y futuras)
  const getAppointmentsForDay = (day: number) => {
    return history.filter(apt => {
      if (!apt.tentativeDate) return false;
      const date = new Date(apt.tentativeDate + "T00:00:00");
      return (
        date.getDate() === day &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });
  };

  const getMarkerColor = (type?: AppointmentType) => {
    switch (type) {
      case 'HIGH_RISK': return 'bg-red-500';
      case 'ULTRASOUND': return 'bg-blue-500';
      default: return 'bg-[#F9B2C1]';
    }
  };

  const getTextColorClass = (type?: AppointmentType) => {
    switch (type) {
      case 'HIGH_RISK': return 'text-red-600';
      case 'ULTRASOUND': return 'text-blue-600';
      default: return 'text-[#F9B2C1]';
    }
  };

  const handleAptClick = (apt: AppointmentData) => {
    onViewDetails(apt);
    navigate(RoutePath.DETAILS);
  };

  const calendarGrid = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarGrid.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarGrid.push(i);

  // Clasificar historial para mostrar abajo
  const upcomingAppointments = history.filter(apt => {
    if (!apt.tentativeDate) return false;
    return new Date(apt.tentativeDate + "T00:00:00") >= new Date(new Date().setHours(0,0,0,0));
  }).sort((a, b) => new Date(a.tentativeDate!).getTime() - new Date(b.tentativeDate!).getTime());

  const pastAppointments = history.filter(apt => {
    if (!apt.tentativeDate) return false;
    return new Date(apt.tentativeDate + "T00:00:00") < new Date(new Date().setHours(0,0,0,0));
  }).sort((a, b) => new Date(b.tentativeDate!).getTime() - new Date(a.tentativeDate!).getTime());

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white">
      <Header title="Mis Citas" showBack backPath={RoutePath.HOME} />
      
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Calendario con señalización de todas las citas */}
        <div className="bg-[#FDE2F3]/40 border border-pink-50 rounded-[28px] p-5 mb-5 text-center shadow-sm">
           <div className="flex items-center justify-between mb-3 px-2">
              <button onClick={handlePrevMonth} className="p-1.5 hover:bg-white/50 rounded-full transition-colors text-[#F9B2C1]">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-[#F9B2C1] font-bold text-sm uppercase tracking-widest">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button onClick={handleNextMonth} className="p-1.5 hover:bg-white/50 rounded-full transition-colors text-[#F9B2C1]">
                <ChevronRight className="w-5 h-5" />
              </button>
           </div>

           <div className="grid grid-cols-7 gap-1 text-[8px] font-extrabold text-slate-400 uppercase mb-2">
             <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
           </div>

           <div className="grid grid-cols-7 gap-1.5">
             {calendarGrid.map((day, idx) => {
               if (day === null) return <div key={`empty-${idx}`} />;
               
               const isSelected = day === selectedDay;
               const dayAppointments = getAppointmentsForDay(day);
               const hasApt = dayAppointments.length > 0;
               const primaryAptType = hasApt ? dayAppointments[0].type : undefined;
               
               return (
                 <button 
                   key={day} 
                   onClick={() => setSelectedDay(day)}
                   className={`h-7 flex flex-col items-center justify-center rounded-xl text-[11px] font-bold transition-all relative ${
                     isSelected 
                       ? 'bg-[#F9B2C1] text-white shadow-md' 
                       : hasApt 
                         ? `${getTextColorClass(primaryAptType)} hover:bg-pink-100/50` 
                         : 'text-slate-600 hover:bg-pink-100/50'
                   }`}
                 >
                   {day}
                   {/* Señalización de citas (anteriores y futuras) */}
                   {hasApt && (
                     <div className="absolute -bottom-0.5 flex gap-0.5">
                       {dayAppointments.slice(0, 3).map((apt, i) => (
                         <div 
                           key={i} 
                           className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : getMarkerColor(apt.type)}`} 
                         />
                       ))}
                     </div>
                   )}
                 </button>
               );
             })}
           </div>
        </div>

        {/* Citas del Día Seleccionado */}
        <div className="flex items-center justify-between mb-3 px-1">
          <h4 className="text-slate-800 font-bold tracking-tight uppercase text-[9px]">
            Citas: {selectedDay} de {monthNames[currentMonth]}
          </h4>
          <button 
            onClick={() => navigate(RoutePath.SCHEDULE_FORM)}
            className="bg-[#F9B2C1] text-white p-1.5 rounded-lg flex items-center justify-center shadow-md active:scale-90 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="space-y-3 mb-8">
            {filteredAppointments.map((apt, idx) => (
              <div 
                key={apt.id || idx} 
                onClick={() => handleAptClick(apt)}
                className={`bg-white border-2 border-slate-50 rounded-2xl p-4 flex gap-4 shadow-sm hover:border-pink-100 transition-all active:scale-[0.98] cursor-pointer border-l-4 ${
                  apt.type === 'HIGH_RISK' ? 'border-l-red-500' : 
                  apt.type === 'ULTRASOUND' ? 'border-l-blue-500' : 'border-l-[#F9B2C1]'
                }`}
              >
                <div className="bg-slate-50 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                  <CalendarIcon className={`w-5 h-5 ${
                    apt.type === 'HIGH_RISK' ? 'text-red-500' : 
                    apt.type === 'ULTRASOUND' ? 'text-blue-500' : 'text-[#F9B2C1]'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-slate-800 text-[13px] truncate mb-0.5">{apt.healthCenter}</h5>
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#F9B2C1]" /> {apt.selectedDateTime?.split(' - ')[1]}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#F9B2C1]" /> {apt.selectedDoctor}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 mb-8">
            <p className="text-slate-300 italic text-[10px]">Sin eventos registrados para hoy.</p>
          </div>
        )}

        {/* Historial de Citas: Anteriores y Futuras */}
        <div className="space-y-6">
           {/* Próximas Citas */}
           {upcomingAppointments.length > 0 && (
             <div>
               <h4 className="flex items-center gap-2 text-slate-800 font-extrabold text-[10px] uppercase tracking-widest mb-3">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#F9B2C1]" /> Próximas Citas
               </h4>
               <div className="space-y-3">
                 {upcomingAppointments.map((apt, idx) => (
                   <div key={idx} onClick={() => handleAptClick(apt)} className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="text-center shrink-0 w-10">
                         <p className="text-[14px] font-black text-slate-700 leading-none">{new Date(apt.tentativeDate! + "T00:00:00").getDate()}</p>
                         <p className="text-[8px] font-extrabold text-[#F9B2C1] uppercase tracking-tighter">{monthNames[new Date(apt.tentativeDate! + "T00:00:00").getMonth()].slice(0,3)}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                         <h5 className="font-bold text-slate-800 text-xs truncate">{apt.healthCenter}</h5>
                         <p className="text-[10px] text-slate-400 font-medium truncate">{apt.selectedDoctor}</p>
                      </div>
                      <div className={`w-1.5 h-6 rounded-full ${getMarkerColor(apt.type)}`}></div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Citas Anteriores */}
           {pastAppointments.length > 0 && (
             <div className="pb-8">
               <h4 className="flex items-center gap-2 text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-3">
                  <History className="w-3.5 h-3.5" /> Historial de Citas
               </h4>
               <div className="space-y-2">
                 {pastAppointments.map((apt, idx) => (
                   <div key={idx} onClick={() => handleAptClick(apt)} className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-2xl opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="text-center shrink-0 w-10">
                         <p className="text-[12px] font-bold text-slate-500 leading-none">{new Date(apt.tentativeDate! + "T00:00:00").getDate()}</p>
                         <p className="text-[8px] font-extrabold text-slate-300 uppercase">{monthNames[new Date(apt.tentativeDate! + "T00:00:00").getMonth()].slice(0,3)}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                         <h5 className="font-bold text-slate-500 text-xs truncate">{apt.healthCenter}</h5>
                         <p className="text-[10px] text-slate-400 font-medium truncate">{apt.type}</p>
                      </div>
                      <div className={`w-1 h-4 rounded-full ${getMarkerColor(apt.type)} opacity-40`}></div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-200" />
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>
      </div>

      <div className="p-4 pt-2 flex flex-col items-center opacity-20 mt-auto">
        <Logo className="w-5 h-5" />
        <span className="text-[7px] font-extrabold tracking-[0.4em] text-slate-800 uppercase">VidaMaterna</span>
      </div>
    </div>
  );
};

export default CalendarView;
