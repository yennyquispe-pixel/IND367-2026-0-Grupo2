
export type AppointmentType = 'REGULAR' | 'HIGH_RISK' | 'ULTRASOUND';

export interface AppointmentData {
  id?: string;
  week?: string;
  type?: AppointmentType;
  healthCenter?: string;
  tentativeDate?: string;
  selectedDateTime?: string;
  selectedDoctor?: string;
  // Campos para el registro médico
  notes?: string;
  weight?: string;
  bloodPressure?: string;
  fetalHeartRate?: string;
}

export enum RoutePath {
  LOGIN = '/',
  HOME = '/inicio',
  SCHEDULE_FORM = '/agendar',
  AVAILABILITY = '/disponibilidad',
  CONFIRMATION = '/confirmacion',
  SUCCESS = '/exito',
  MAP = '/mapa',
  CALENDAR = '/calendario',
  CONFLICT = '/conflicto',
  DETAILS = '/detalles'
}

export const PUBLIC_HEALTH_CENTERS = [
  "Hospital Nacional Arzobispo Loayza",
  "Instituto Nacional Materno Perinatal (Maternidad de Lima)",
  "Hospital Nacional Edgardo Rebagliati Martins",
  "Hospital Nacional Guillermo Almenara Irigoyen",
  "Hospital Nacional Alberto Sabogal Sologuren",
  "Hospital María Auxiliadora",
  "Hospital San Bartolomé",
  "Hospital de Emergencias José Casimiro Ulloa",
  "Hospital Nacional Dos de Mayo",
  "Hospital Hipólito Unanue",
  "Hospital Sergio Bernales (Collique)",
  "Policlínico Pablo Bermúdez",
  "Centro de Salud Jesús María",
  "Centro de Salud Surco",
  "Hospital de la Solidaridad - Comas",
  "Hospital de la Solidaridad - Villa El Salvador"
];
