
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side: Illustration & Branding */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-600 p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-8 shadow-lg">
              <span className="text-indigo-600 font-bold text-2xl">N</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">A plataforma definitiva para seu negócio.</h1>
            <p className="text-indigo-100 text-lg">Gerencie sua infraestrutura com a inteligência do NexusOS.</p>
          </div>

          <div className="relative z-10 mt-auto">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-500 flex items-center justify-center text-xs font-bold">+2k</div>
            </div>
            <p className="text-sm text-indigo-100">Junte-se a mais de 2.000 empresas que confiam no NexusOS.</p>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
            <p className="text-slate-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
