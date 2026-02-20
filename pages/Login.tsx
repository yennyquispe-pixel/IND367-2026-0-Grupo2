
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types';
import { PrimaryButton, Logo } from '../components/Shared';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const COVER_IMAGE_URL = "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=1000&auto=format&fit=crop";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate(RoutePath.HOME);
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn bg-white p-6 overflow-hidden">
      {/* Identidad Visual - Compactada */}
      <div className="flex flex-col items-center mt-1 mb-1 shrink-0">
        <Logo className="w-20 h-20" showText />
        <p className="text-[8px] text-slate-400 mt-0 font-bold uppercase tracking-[0.3em]">Control Prenatal Digital</p>
      </div>

      {/* Imagen de Portada - Tamaño ajustado para evitar scroll */}
      <div className="flex justify-center items-center py-2 mb-2 shrink-0">
        <div className="relative w-full max-w-[160px] aspect-square">
          <div className="absolute inset-0 bg-pink-100 rounded-full blur-3xl opacity-40 scale-110"></div>
          <img 
            src={COVER_IMAGE_URL} 
            alt="Mujer embarazada - Portada VidaMaterna" 
            className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg z-10"
          />
          <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg z-20 border border-pink-50">
            <div className="w-5 h-5 flex items-center justify-center bg-[#F9B2C1] rounded-full">
              <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-4 shrink-0">
        <h2 className="text-slate-700 uppercase tracking-[0.15em] text-[9px] font-black">
          Accede a tu seguimiento prenatal
        </h2>
        <div className="h-0.5 w-8 bg-[#F9B2C1] mx-auto mt-1 rounded-full opacity-60"></div>
      </div>

      <form onSubmit={handleLogin} className="space-y-3 flex-1 flex flex-col justify-center">
        <div className="space-y-1">
          <label className="block text-slate-400 font-bold text-[8px] ml-1 uppercase tracking-wider">Correo electrónico</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
            <input 
              type="email"
              required
              placeholder="tu-correo@ejemplo.com"
              className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-10 pr-4 rounded-xl text-slate-700 placeholder-slate-300 outline-none focus:ring-2 focus:ring-[#F9B2C1]/30 transition-all text-xs font-medium"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-slate-400 font-bold text-[8px] ml-1 uppercase tracking-wider">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
            <input 
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-100 py-2.5 pl-10 pr-11 rounded-xl text-slate-700 placeholder-slate-300 outline-none focus:ring-2 focus:ring-[#F9B2C1]/30 transition-all text-xs font-medium"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 p-1 hover:text-[#F9B2C1] transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <div className="flex justify-end">
            <button type="button" className="text-[9px] text-[#F9B2C1] font-bold hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <div className="pt-1">
          <PrimaryButton onClick={() => {}} className="py-3 text-xs">
            INICIAR SESIÓN
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-auto pt-4 text-center shrink-0">
        <p className="text-[10px] text-slate-400">
          ¿Nueva en VidaMaterna? {' '}
          <button className="text-[#F9B2C1] font-bold hover:underline">
            Crea tu cuenta aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
