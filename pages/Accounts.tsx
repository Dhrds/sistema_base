
import React from 'react';
import { User } from '../types';

interface AccountsProps {
  user: User;
}

export const Accounts: React.FC<AccountsProps> = ({ user }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Meu Perfil</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Gerencie suas informações pessoais e credenciais de acesso.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 text-center transition-colors">
            <div className="relative inline-block mb-6">
              <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-indigo-50 dark:border-slate-800 mx-auto" />
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{user.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium capitalize">{user.role}</p>
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-100 dark:border-emerald-800">Verificado</span>
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                user.role === 'admin' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-700'
              }`}>
                {user.role === 'admin' ? 'Acesso Total' : 'Acesso Padrão'}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 transition-colors">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Detalhes da Conta</h3>
            <ul className="space-y-4">
              <li className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Membro desde</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">Dez 2022</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Último Acesso</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">10 min atrás</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Localização</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">São Paulo, BR</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Forms */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 transition-colors">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome Completo</label>
                <input type="text" defaultValue={user.name} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all dark:text-slate-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input type="email" defaultValue={user.email} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all dark:text-slate-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Telefone</label>
                <input type="tel" placeholder="+55 (11) 99999-9999" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all dark:text-slate-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">País</label>
                <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all dark:text-slate-200">
                  <option>Brasil</option>
                  <option>Estados Unidos</option>
                  <option>Canadá</option>
                  <option>Portugal</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                Salvar Alterações
              </button>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 border-l-4 border-l-rose-500 transition-colors">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Zona de Perigo</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Uma vez que você deletar sua conta, não há volta. Por favor, tenha certeza.</p>
            <button className="px-6 py-3 border-2 border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 font-bold rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all">
              Excluir minha conta
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
