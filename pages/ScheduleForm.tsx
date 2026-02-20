
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, X, ChevronRight, AlertCircle } from 'lucide-react';
import { AppointmentData, RoutePath, AppointmentType, PUBLIC_HEALTH_CENTERS } from '../types';
import { Header, PrimaryButton } from '../components/Shared';

interface Props {
  appointment: AppointmentData;
  onUpdate: (data: Partial<AppointmentData>) => void;
}

// Lista aproximada de feriados en Perú para validación
const PERU_HOLIDAYS = [
  "01-01", // Año Nuevo
  "05-01", // Día del Trabajo
  "06-07", // Día de la Bandera
  "06-29", // San Pedro y San Pablo
  "07-28", // Independencia
  "07-29", // Independencia
  "08-06", // Batalla de Junín
  "08-30", // Santa Rosa de Lima
  "10-08", // Combate de Angamos
  "11-01", // Todos los Santos
  "12-08", // Inmaculada Concepción
  "12-09", // Batalla de Ayacucho
  "12-25", // Navidad
];

const ScheduleForm: React.FC<Props> = ({ appointment, onUpdate }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(appointment.healthCenter || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dateError, setDateError] = useState("");
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTypeSelect = (type: AppointmentType) => {
    onUpdate({ type });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onUpdate({ healthCenter: value });

    if (value.length > 1) {
      const filtered = PUBLIC_HEALTH_CENTERS.filter(center =>
        center.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (center: string) => {
    setSearchTerm(center);
    onUpdate({ healthCenter: center });
    setShowSuggestions(false);
  };

  const validateDate = (dateStr: string) => {
    if (!dateStr) return true;
    const date = new Date(dateStr + "T00:00:00");
    const day = date.getDay(); // 0: Sunday, 6: Saturday
    
    // Validar fin de semana
    if (day === 0 || day === 6) {
      setDateError("No atendemos los fines de semana (sábados o domingos).");
      return false;
    }

    // Validar feriados
    const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (PERU_HOLIDAYS.includes(monthDay)) {
      setDateError("La fecha seleccionada es un día feriado.");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (validateDate(val)) {
      onUpdate({ tentativeDate: val });
    } else {
      onUpdate({ tentativeDate: "" });
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-hidden">
      <Header title="Registro de Cita" showBack />
      
      <div className="p-6 space-y-3.5 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <label className="block text-slate-400 font-extrabold text-[10px] uppercase tracking-widest ml-1">Semana de embarazo</label>
          <div className="relative">
            <select 
              className="w-full bg-slate-50 border border-slate-100 text-slate-800 py-3 px-5 rounded-2xl outline-none appearance-none font-medium shadow-sm text-sm focus:ring-2 focus:ring-[#F9B2C1]/30 transition-all"
              value={appointment.week || ""}
              onChange={(e) => onUpdate({ week: e.target.value })}
            >
              <option value="" disabled>Selecciona tu semana actual</option>
              {Array.from({ length: 40 }, (_, i) => (
                <option key={i + 1} value={`${i + 1} semanas`}>Semana {i + 1}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-slate-400 font-extrabold text-[10px] uppercase tracking-widest ml-1">Tipo de cita médica</label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'REGULAR', title: 'Control Regular', desc: 'Seguimiento prenatal estándar' },
              { id: 'HIGH_RISK', title: 'Alto Riesgo', desc: 'Atención especializada' },
              { id: 'ULTRASOUND', title: 'Ecografía', desc: 'Examen de ultrasonido' }
            ].map((type) => (
              <div 
                key={type.id}
                onClick={() => handleTypeSelect(type.id as AppointmentType)}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                  appointment.type === type.id ? 'border-[#F9B2C1] bg-pink-50 shadow-sm' : 'border-slate-50 bg-slate-50 hover:border-pink-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${appointment.type === type.id ? 'border-[#F9B2C1] bg-white' : 'border-slate-300 bg-white'}`}>
                     {appointment.type === type.id && <div className="w-2.5 h-2.5 bg-[#F9B2C1] rounded-full"></div>}
                  </div>
                  <div>
                    <h4 className={`text-slate-800 text-xs ${appointment.type === type.id ? 'font-bold' : 'font-medium'}`}>{type.title}</h4>
                    <p className="text-slate-400 text-[9px] font-medium">{type.desc}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-colors ${appointment.type === type.id ? 'text-[#F9B2C1]' : 'text-slate-200'}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1 relative" ref={suggestionRef}>
          <label className="block text-slate-400 font-extrabold text-[10px] uppercase tracking-widest ml-1">Centro de Salud / Hospital</label>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F9B2C1]" />
            <input 
              type="text"
              placeholder="Buscar hospital..."
              className="w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-12 rounded-2xl text-slate-800 placeholder-slate-300 outline-none focus:ring-2 focus:ring-[#F9B2C1]/30 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
            />
            {searchTerm && (
              <button onClick={() => { setSearchTerm(""); onUpdate({ healthCenter: "" }); }} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 p-1">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-pink-100 rounded-2xl shadow-2xl max-h-40 overflow-y-auto py-1">
              {suggestions.map((center, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(center)}
                  className="w-full text-left px-5 py-3 text-[11px] text-slate-700 hover:bg-pink-50 border-b last:border-0 border-pink-50 flex items-center gap-3 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#F9B2C1] opacity-50" />
                  <span className="font-medium">{center}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-slate-400 font-extrabold text-[10px] uppercase tracking-widest ml-1">Fecha de preferencia</label>
          <div className="relative">
            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F9B2C1]" />
            <input 
              type="date"
              className={`w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#F9B2C1]/30 transition-all text-sm font-medium ${appointment.tentativeDate ? 'text-slate-800' : 'text-slate-300'}`}
              value={appointment.tentativeDate || ""}
              onChange={handleDateChange}
            />
          </div>
          {dateError && (
            <div className="flex items-center gap-2 mt-1 px-2 text-red-500 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5" />
              <p className="text-[10px] font-bold">{dateError}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100 shrink-0">
        <PrimaryButton 
          onClick={() => navigate(RoutePath.AVAILABILITY)}
          disabled={!appointment.type || !appointment.tentativeDate || !appointment.healthCenter}
        >
          BUSCAR HORARIOS DISPONIBLES
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ScheduleForm;
