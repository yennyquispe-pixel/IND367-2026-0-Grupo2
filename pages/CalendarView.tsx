
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentData, RoutePath } from '../types';
import { Header, Logo } from '../components/Shared';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, Plus, ChevronLeft } from 'lucide-react';

interface Props {
  history: AppointmentData[];
  onViewDetails: (apt: AppointmentData) => void;
}

const CalendarView: React.FC<Props> = ({ history, onViewDetails }) => {
  const navigate = useNavigate();
  
  // Estado para la fecha que se está visualizando en el calendario
  const [viewDate, setViewDate] = useState(new Date()); // Por defecto hoy
  // Estado para el día seleccionado específicamente
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  // Calcular días del mes y el primer día de la semana
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(1); // Reset al día 1 al cambiar de mes
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

  const hasAptOnDay = (day: number) => {
    return history.some(apt => {
      if (!apt.tentativeDate) return false;
      const date = new Date(apt.tentativeDate + "T00:00:00");
      return (
        date.getDate() === day &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });
  };

  const handleAptClick = (apt: AppointmentData) => {
    onViewDetails(apt);
    navigate(RoutePath.DETAILS);
  };

  // Generar los "huecos" del calendario (días vacíos antes del día 1)
  const calendarGrid = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarGrid.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarGrid.push(i);
  }

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white">
      <Header title="Mis Citas" showBack backPath={RoutePath.HOME} />
      
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Interactive Calendar Header */}
        <div className="bg-[#FDE2F3] rounded-[24px] p-6 mb-8 text-center shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-pink-100 rounded-full transition-colors text-[#F9B2C1]">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h3 className="text-[#F9B2C1] font-bold text-lg">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button onClick={handleNextMonth} className="p-2 hover:bg-pink-100 rounded-full transition-colors text-[#F9B2C1]">
                <ChevronRight className="w-6 h-6" />
              </button>
           </div>

           <div className="grid grid-cols-7 gap-2 text-[10px] font-bold text-slate-400 uppercase mb-4">
             <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
           </div>

           <div className="grid grid-cols-7 gap-2">
             {calendarGrid.map((day, idx) => {
               if (day === null) return <div key={`empty-${idx}`} />;
               
               const isSelected = day === selectedDay;
               const hasApt = hasAptOnDay(day);
               
               return (
                 <button 
                   key={day} 
                   onClick={() => setSelectedDay(day)}
                   className={`h-8 flex flex-col items-center justify-center rounded-full text-xs font-bold transition-all relative ${
                     isSelected ? 'bg-[#F9B2C1] text-white shadow-md' : 'text-slate-600 hover:bg-pink-50'
                   }`}
                 >
                   {day}
                   {hasApt && !isSelected && (
                     <div className="absolute bottom-1 w-1 h-1 bg-[#F9B2C1] rounded-full"></div>
                   )}
                 </button>
               );
             })}
           </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h4 className="text-slate-800 font-bold tracking-tight uppercase text-[10px]">
            Citas del {selectedDay} de {monthNames[currentMonth]}
          </h4>
          <button 
            onClick={() => navigate(RoutePath.SCHEDULE_FORM)}
            className="text-[#F9B2C1] flex items-center gap-1 text-[10px] font-bold"
          >
            <Plus className="w-3 h-3" /> AGENDAR
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {filteredAppointments.length > 0 ? filteredAppointments.map((apt, idx) => (
            <div 
              key={apt.id || idx} 
              onClick={() => handleAptClick(apt)}
              className="bg-white border-2 border-slate-50 rounded-2xl p-4 flex gap-4 shadow-sm hover:border-pink-100 transition-all active:scale-[0.98] cursor-pointer border-l-4 border-l-[#F9B2C1]"
            >
              <div className="bg-pink-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <CalendarIcon className="w-6 h-6 text-[#F9B2C1]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                   <h5 className="font-bold text-slate-800 text-sm truncate">{apt.healthCenter}</h5>
                   <span className="bg-[#FDE2F3] text-[#F9B2C1] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                     {apt.type === 'REGULAR' ? 'Control' : apt.type}
                   </span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px] font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.selectedDateTime?.split(' - ')[1]}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-slate-500 text-[10px]">
                  <MapPin className="w-3 h-3" /> Dr. {apt.selectedDoctor}
                </div>
              </div>
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-slate-200" />
              </div>
            </div>
          )) : (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
              <p className="text-slate-300 italic text-xs">No hay citas para esta fecha.</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 mt-8">
          <h4 className="text-slate-400 font-bold tracking-tight uppercase text-[10px]">Otras citas en el historial</h4>
        </div>
        
        <div className="space-y-3">
          {history.filter(apt => {
             if (!apt.tentativeDate) return false;
             const d = new Date(apt.tentativeDate + "T00:00:00");
             // Mostrar algunas citas que NO sean la seleccionada actualmente
             return d.getDate() !== selectedDay || d.getMonth() !== currentMonth || d.getFullYear() !== currentYear;
          }).slice(0, 3).map((apt, idx) => (
            <div 
              key={`hist-${idx}`} 
              onClick={() => handleAptClick(apt)}
              className="bg-slate-50 rounded-xl p-3 flex gap-3 border border-slate-100 active:bg-pink-50 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-100">
                <CalendarIcon className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-600 truncate">{apt.healthCenter}</p>
                <p className="text-[10px] text-slate-400">{apt.selectedDateTime}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 self-center" />
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto flex flex-col items-center opacity-40">
        <Logo className="w-8 h-8" />
        <span className="text-[#F9B2C1] font-bold text-[8px] tracking-[0.4em]">VidaMaterna</span>
      </div>
    </div>
  );
};

export default CalendarView;
