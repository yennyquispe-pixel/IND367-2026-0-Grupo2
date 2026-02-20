
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentData, RoutePath } from '../types';
import { Header, PrimaryButton } from '../components/Shared';
import { FileText, Download, User, Activity, Heart, Scale, ClipboardList, MapPin, Calendar } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Props {
  appointment: AppointmentData | null;
}

const AppointmentDetails: React.FC<Props> = ({ appointment }) => {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    if (!appointment) return;

    try {
      const doc = new jsPDF();
      const margin = 20;
      let y = 20;

      // Header
      doc.setFillColor(249, 178, 193); // #F9B2C1
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('VidaMaterna', margin, 27);
      
      doc.setFontSize(10);
      doc.text('INFORME DE CONTROL PRENATAL', 140, 25);
      
      y = 55;
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(16);
      doc.text('Detalles de la Cita', margin, y);
      
      y += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Centro de Salud: ${appointment.healthCenter}`, margin, y);
      y += 7;
      doc.text(`Tipo de Cita: ${appointment.type}`, margin, y);
      y += 7;
      doc.text(`Semana de Gestación: ${appointment.week}`, margin, y);
      y += 7;
      doc.text(`Especialista: ${appointment.selectedDoctor}`, margin, y);
      y += 7;
      doc.text(`Fecha y Hora: ${appointment.selectedDateTime}`, margin, y);
      
      y += 15;
      doc.setFont('helvetica', 'bold');
      doc.text('SIGNOS VITALES', margin, y);
      doc.setDrawColor(249, 178, 193);
      doc.line(margin, y + 2, 190, y + 2);
      
      y += 12;
      doc.setFont('helvetica', 'normal');
      doc.text(`Peso: ${appointment.weight || '---'}`, margin, y);
      y += 7;
      doc.text(`Presión Arterial: ${appointment.bloodPressure || '---'}`, margin, y);
      y += 7;
      doc.text(`Frecuencia Cardíaca Fetal: ${appointment.fetalHeartRate || '---'}`, margin, y);
      
      y += 15;
      doc.setFont('helvetica', 'bold');
      doc.text('OBSERVACIONES MÉDICAS', margin, y);
      doc.line(margin, y + 2, 190, y + 2);
      
      y += 12;
      doc.setFont('helvetica', 'italic');
      const splitNotes = doc.splitTextToSize(appointment.notes || "No hay observaciones detalladas registradas para esta cita.", 170);
      doc.text(splitNotes, margin, y);
      
      y += (splitNotes.length * 7) + 15;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Este documento es un registro digital de su control prenatal generado por la aplicación VidaMaterna.', margin, y);
      doc.text('Por favor, presente este informe en su próxima consulta si es necesario.', margin, y + 5);

      doc.save(`Informe_Cita_${appointment.tentativeDate || 'Cita'}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor intente de nuevo.");
    }
  };

  if (!appointment) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8 text-center bg-white">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ClipboardList className="w-10 h-10 text-slate-200" />
        </div>
        <p className="text-slate-400 font-bold text-sm mb-6">No se ha seleccionado ninguna cita.</p>
        <button 
          onClick={() => navigate(RoutePath.CALENDAR)}
          className="text-[#F9B2C1] font-extrabold text-xs uppercase tracking-widest border-b-2 border-[#F9B2C1] pb-1"
        >
          Volver al calendario
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white overflow-hidden">
      <Header title="Registro de Cita" showBack />
      
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-12">
        {/* Resumen Superior Estilizado */}
        <div className="bg-gradient-to-br from-pink-50 via-white to-white p-6 rounded-[32px] mb-8 border border-pink-100 shadow-sm">
           <div className="flex items-center gap-5 mb-6">
              <div className="bg-white p-4 rounded-3xl shadow-md border border-pink-50">
                 <FileText className="w-8 h-8 text-[#F9B2C1]" />
              </div>
              <div className="flex-1">
                 <h2 className="text-xl font-extrabold text-slate-800 leading-tight mb-1">{appointment.healthCenter}</h2>
                 <div className="flex items-center gap-2">
                    <span className="bg-[#F9B2C1] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {appointment.type}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      {appointment.week}
                    </span>
                 </div>
              </div>
           </div>
           
           <div className="space-y-3 bg-white/40 p-4 rounded-2xl border border-white">
              <div className="flex items-center gap-3">
                 <User className="w-4 h-4 text-[#F9B2C1] shrink-0" />
                 <span className="text-xs font-bold text-slate-700"><span className="text-slate-400 uppercase text-[9px] mr-1">Obstetra:</span> {appointment.selectedDoctor}</span>
              </div>
              <div className="flex items-center gap-3">
                 <Calendar className="w-4 h-4 text-[#F9B2C1] shrink-0" />
                 <span className="text-xs font-bold text-slate-700"><span className="text-slate-400 uppercase text-[9px] mr-1">Fecha:</span> {appointment.selectedDateTime}</span>
              </div>
           </div>
        </div>

        {/* Registro Médico (Signos Vitales) */}
        <div className="mb-10">
           <h3 className="text-slate-800 font-extrabold text-[10px] uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#F9B2C1]" /> Signos Vitales
           </h3>
           <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Peso', val: appointment.weight, icon: Scale },
                { label: 'Presión', val: appointment.bloodPressure, icon: Activity },
                { label: 'FCF (Fetal)', val: appointment.fetalHeartRate, icon: Heart }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                   <item.icon className={`w-5 h-5 ${item.label.includes('FCF') ? 'text-[#F9B2C1]' : 'text-slate-300'} mb-2`} />
                   <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-tighter mb-1">{item.label}</span>
                   <span className="text-sm font-extrabold text-slate-800">{item.val || '---'}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Notas Médicas */}
        <div className="mb-10">
           <h3 className="text-slate-800 font-extrabold text-[10px] uppercase tracking-[0.2em] mb-4">Observaciones del Especialista</h3>
           <div className="bg-[#FDE2F3]/20 p-6 rounded-[24px] border-l-4 border-[#F9B2C1] text-slate-600 text-sm leading-relaxed font-medium italic shadow-inner">
              “{appointment.notes || "El registro detallado de las observaciones médicas para esta cita estará disponible una vez que el especialista finalice la carga de datos en el sistema central."}”
           </div>
        </div>

        {/* Acciones */}
        <div className="space-y-4 pt-4">
           <PrimaryButton 
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-3"
           >
              <Download className="w-5 h-5" />
              DESCARGAR INFORME COMPLETO
           </PrimaryButton>
           
           <button 
            onClick={() => navigate(RoutePath.CALENDAR)}
            className="w-full text-slate-400 font-extrabold py-3 text-[10px] tracking-[0.3em] uppercase hover:text-[#F9B2C1] transition-colors"
          >
              VOLVER A MIS CITAS
           </button>
        </div>
      </div>

      <div className="mt-auto p-6 flex flex-col items-center opacity-30 shrink-0">
        <div className="w-10 h-1 bg-slate-100 rounded-full mb-4"></div>
        <span className="text-[9px] font-extrabold tracking-[0.4em] text-slate-800 uppercase">VidaMaterna</span>
      </div>
    </div>
  );
};

export default AppointmentDetails;
