
import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { api } from '../services/api';

interface ForgotPasswordProps {
  onNavigate: (view: 'login') => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.resetPassword(email);
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthLayout title="Verifique seu email" subtitle="Enviamos um link de recuperação para o endereço informado.">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <p className="text-slate-600 mb-8">Não recebeu o email? Verifique sua pasta de spam ou tente novamente.</p>
          <button 
            onClick={() => onNavigate('login')}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
          >
            Voltar para o login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Recuperar senha" subtitle="Informe seu email para receber as instruções de redefinição.">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            placeholder="seu@email.com"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          {loading ? 'Processando...' : 'Enviar link de recuperação'}
        </button>

        <button 
          type="button"
          onClick={() => onNavigate('login')}
          className="w-full text-sm font-bold text-slate-500 hover:text-slate-700"
        >
          Voltar para o login
        </button>
      </form>
    </AuthLayout>
  );
};
