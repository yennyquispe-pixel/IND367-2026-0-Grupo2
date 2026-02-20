
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppointmentData, RoutePath, PUBLIC_HEALTH_CENTERS } from './types';
import Login from './pages/Login';
import Home from './pages/Home';
import ScheduleForm from './pages/ScheduleForm';
import AvailabilityResults from './pages/AvailabilityResults';
import ReviewConfirmation from './pages/ReviewConfirmation';
import Success from './pages/Success';
import MapLocation from './pages/MapLocation';
import CalendarView from './pages/CalendarView';
import ConflictError from './pages/ConflictError';
import AppointmentDetails from './pages/AppointmentDetails';
import { SplashScreen } from './components/Shared';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentData>({});
  const [viewingAppointment, setViewingAppointment] = useState<AppointmentData | null>(null);
  
  useEffect(() => {
    // Simular carga inicial de la aplicación
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const [history, setHistory] = useState<AppointmentData[]>([
    {
      id: 'pre-1',
      week: '5 semanas',
      type: 'REGULAR',
      healthCenter: PUBLIC_HEALTH_CENTERS[2],
      selectedDateTime: '10 de Diciembre - 09:00 AM',
      selectedDoctor: 'Mendoza, L.',
      tentativeDate: '2024-12-10',
      bloodPressure: '110/70',
      weight: '62.5 kg',
      fetalHeartRate: '145 lpm',
      notes: 'Paciente presenta buen progreso. Se recomienda continuar con suplementos de ácido fólico y mantener dieta balanceada.'
    },
    {
      id: 'pre-2',
      week: '8 semanas',
      type: 'ULTRASOUND',
      healthCenter: PUBLIC_HEALTH_CENTERS[1],
      selectedDateTime: '25 de Enero - 16:00 PM',
      selectedDoctor: 'Sánchez, M.',
      tentativeDate: '2025-01-25',
      bloodPressure: '120/80',
      weight: '64.2 kg',
      fetalHeartRate: '152 lpm',
      notes: 'Ecografía morfológica inicial. El embrión presenta medidas acordes a la edad gestacional. Actividad cardíaca presente y normal.'
    }
  ]);

  const updateAppointment = (data: Partial<AppointmentData>) => {
    setAppointment(prev => ({ ...prev, ...data }));
  };

  const resetAppointment = () => {
    setAppointment({});
  };

  const addToHistory = () => {
    if (appointment.selectedDateTime) {
      const newApt = { ...appointment, id: Date.now().toString() };
      setHistory(prev => [newApt, ...prev]);
    }
  };

  const handleViewAppointment = (apt: AppointmentData) => {
    setViewingAppointment(apt);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <HashRouter>
      <div className="h-screen w-full max-w-md mx-auto bg-white shadow-xl flex flex-col overflow-hidden relative border-x border-gray-100">
        <Routes>
          {!isLoggedIn ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path={RoutePath.LOGIN} element={<Navigate to={RoutePath.HOME} replace />} />
              <Route path={RoutePath.HOME} element={<Home onNewAppointment={resetAppointment} />} />
              <Route 
                path={RoutePath.SCHEDULE_FORM} 
                element={<ScheduleForm appointment={appointment} onUpdate={updateAppointment} />} 
              />
              <Route 
                path={RoutePath.AVAILABILITY} 
                element={<AvailabilityResults appointment={appointment} onUpdate={updateAppointment} />} 
              />
              <Route 
                path={RoutePath.CONFIRMATION} 
                element={<ReviewConfirmation appointment={appointment} history={history} />} 
              />
              <Route 
                path={RoutePath.SUCCESS} 
                element={<Success appointment={appointment} onAddToCalendar={addToHistory} />} 
              />
              <Route 
                path={RoutePath.MAP} 
                element={<MapLocation appointment={appointment} />} 
              />
              <Route 
                path={RoutePath.CALENDAR} 
                element={<CalendarView history={history} onViewDetails={handleViewAppointment} />} 
              />
              <Route 
                path={RoutePath.CONFLICT} 
                element={<ConflictError appointment={appointment} />} 
              />
              <Route 
                path={RoutePath.DETAILS} 
                element={<AppointmentDetails appointment={viewingAppointment} />} 
              />
            </>
          )}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
