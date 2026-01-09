
import React, { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { api } from '../services/api';

interface LoginProps {
  onLogin: (user: any) => void;
  onNavigate: (view: 'register' | 'forgot-password') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await api.login(email, password);
      onLogin(user);
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Bem-vindo de volta" subtitle="Acesse sua conta para continuar gerenciando seus projetos.">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium animate-in shake duration-300">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            placeholder="exemplo@email.com"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700">Senha</label>
            <button 
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Esqueceu a senha?
            </button>
          </div>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          {loading ? 'Entrando...' : 'Acessar Conta'}
        </button>

        <p className="text-center text-sm text-slate-500">
          Não tem uma conta?{' '}
          <button 
            type="button"
            onClick={() => onNavigate('register')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Cadastre-se agora
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};
