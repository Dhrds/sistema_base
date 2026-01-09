
import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { api } from '../services/api';

interface RegisterProps {
  onLogin: (user: any) => void;
  onNavigate: (view: 'login') => void;
}

export const Register: React.FC<RegisterProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = await api.register(formData);
    onLogin(user);
    setLoading(false);
  };

  return (
    <AuthLayout title="Crie sua conta" subtitle="Comece sua jornada com o NexusOS hoje mesmo.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nome Completo</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            placeholder="João Silva"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Profissional</label>
          <input 
            type="email" 
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            placeholder="joao@empresa.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Senha</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirmar</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, confirm: e.target.value})}
            />
          </div>
        </div>

        <div className="flex items-start gap-3 py-2">
          <input type="checkbox" required className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
          <span className="text-xs text-slate-500 leading-relaxed">
            Ao se cadastrar, você concorda com nossos <button type="button" className="text-indigo-600 font-semibold underline">Termos de Serviço</button> e <button type="button" className="text-indigo-600 font-semibold underline">Privacidade</button>.
          </span>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
        >
          {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          {loading ? 'Criando Conta...' : 'Cadastrar agora'}
        </button>

        <p className="text-center text-sm text-slate-500">
          Já possui conta?{' '}
          <button 
            type="button"
            onClick={() => onNavigate('login')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Fazer login
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};
