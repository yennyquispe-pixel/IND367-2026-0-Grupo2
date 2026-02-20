
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Logo: React.FC<{ className?: string; showText?: boolean; textColor?: string; textSizeClass?: string }> = ({ 
  className = "w-12 h-12", 
  showText = false,
  textColor = "#F9B2C1",
  textSizeClass = "text-2xl"
}) => (
  <div className="flex flex-col items-center justify-center">
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path 
          d="M50 85C50 85 15 65 15 35C15 20 30 15 40 25L50 35L60 25C70 15 85 20 85 35C85 65 50 85 50 85Z" 
          stroke="#F9B2C1" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <circle cx="50" cy="35" r="8" stroke="#F9B2C1" strokeWidth="6" />
        <path d="M42 65L47 38H53L58 65H42Z" fill="white" stroke="#F9B2C1" strokeWidth="6" strokeLinejoin="round" />
      </svg>
    </div>
    {showText && (
      <span className={`${textSizeClass} font-bold tracking-tighter mt-1 text-center`} style={{ color: textColor, fontFamily: 'Montserrat, sans-serif' }}>
        VidaMaterna
      </span>
    )}
  </div>
);

export const Header: React.FC<{ title: string; showBack?: boolean; backPath?: string }> = ({ title, showBack, backPath }) => {
  const navigate = useNavigate();
  const displayTitle = (title.toLowerCase().replace(/\s/g, '') === 'vidamaterna') ? "VidaMaterna" : title;
  
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shrink-0">
      {showBack ? (
        <button onClick={() => backPath ? navigate(backPath) : navigate(-1)} className="p-1 -ml-1 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      ) : (
        <div className="w-8" />
      )}
      <h1 className="text-lg font-bold text-slate-800 tracking-tight">{displayTitle}</h1>
      <div className="w-12 flex justify-end">
        <Logo className="w-6 h-6" showText textSizeClass="text-[6px]" />
      </div>
    </div>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-[#F9B2C1] py-2.5 text-center mb-6 shrink-0">
    <h2 className="text-white font-bold tracking-[0.15em] uppercase text-[11px]">{children}</h2>
  </div>
);

export const PrimaryButton: React.FC<{ 
  onClick: () => void; 
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, className = "", disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full bg-[#F9B2C1] text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-100 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm tracking-wide ${className}`}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<{ 
  onClick: () => void; 
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full bg-white border-2 border-[#F9B2C1] text-[#F9B2C1] font-bold py-4 rounded-2xl active:scale-[0.98] transition-all text-sm tracking-wide ${className}`}
  >
    {children}
  </button>
);

export const InfoCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-slate-50 px-4 py-3 rounded-2xl mb-3 flex flex-col shadow-sm border border-slate-100">
    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{label}</span>
    <span className="text-slate-800 font-normal text-sm">{value}</span>
  </div>
);

export const SplashScreen: React.FC = () => (
  <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center animate-fadeIn">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-pink-100 rounded-full blur-3xl opacity-50 scale-150"></div>
      <Logo className="w-32 h-32 relative animate-pulse" showText textSizeClass="text-3xl" />
    </div>
    <div className="mt-8 flex items-center gap-1.5">
      <div className="w-2 h-2 bg-[#F9B2C1] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-[#F9B2C1] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-[#F9B2C1] rounded-full animate-bounce"></div>
    </div>
    <p className="mt-4 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Cargando aplicación...</p>
  </div>
);
