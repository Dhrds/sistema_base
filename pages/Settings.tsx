
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const [toggle, setToggle] = useState({
    emails: true,
    marketing: false,
    security: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggle = (key: keyof typeof toggle) => {
    setToggle(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await api.saveSettings({ ...toggle, dark: isDarkMode });
    setIsSaving(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-24 right-8 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-in slide-in-from-right-4 duration-300 flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="font-bold text-sm">Configurações salvas no servidor!</span>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Preferências do Sistema</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Essas configurações são persistidas em seu perfil na nuvem.</p>
      </header>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Aparência</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Personalize o visual da sua interface.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Modo Escuro (Nexus Dark)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ativa o tema escuro para reduzir o cansaço visual.</p>
              </div>
              <button 
                onClick={onToggleDarkMode}
                className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Infrastructure Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Infraestrutura</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Controles avançados de comportamento do backend.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Compressão de Dados API</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Reduz o tamanho dos pacotes para acessos móveis mais rápidos.</p>
              </div>
              <button 
                onClick={() => handleToggle('marketing')}
                className={`w-12 h-6 rounded-full transition-colors relative ${toggle.marketing ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${toggle.marketing ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Nível de Logging</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Define a verbosidade dos logs de servidor.</p>
              </div>
              <select className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Produção (Info)</option>
                <option>Desenvolvimento (Debug)</option>
                <option>Crítico (Apenas Erros)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Restaurar Padrão</button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`
              px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-3
              ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700 active:scale-95 shadow-indigo-600/20'}
            `}
          >
            {isSaving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            {isSaving ? 'Salvando no Servidor...' : 'Atualizar Produção'}
          </button>
        </div>
      </div>
    </div>
  );
};
