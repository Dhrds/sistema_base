
import React, { useState } from 'react';
import { api } from '../services/api';

export const Settings: React.FC = () => {
  const [toggle, setToggle] = useState({
    emails: true,
    marketing: false,
    security: true,
    dark: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggle = (key: keyof typeof toggle) => {
    setToggle(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await api.saveSettings(toggle);
    setIsSaving(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-24 right-8 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="font-bold text-sm">Configurações salvas no servidor!</span>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">System Preferences</h1>
        <p className="text-slate-500 mt-2">These settings are persisted in your cloud profile.</p>
      </header>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Infrastructure</h2>
            <p className="text-sm text-slate-500 mt-1">Advanced backend behavior controls.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">API Data Compression</p>
                <p className="text-xs text-slate-500">Reduce payload size for faster mobile access.</p>
              </div>
              <button 
                onClick={() => handleToggle('marketing')}
                className={`w-12 h-6 rounded-full transition-colors relative ${toggle.marketing ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${toggle.marketing ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Logging Level</p>
                <p className="text-xs text-slate-500">Select the verbosity of backend logs.</p>
              </div>
              <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium">
                <option>Production (Info)</option>
                <option>Development (Debug)</option>
                <option>Critical Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-all">Reset Default</button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`
              px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-3
              ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700 active:scale-95 shadow-indigo-600/20'}
            `}
          >
            {isSaving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            {isSaving ? 'Saving to Backend...' : 'Update Production'}
          </button>
        </div>
      </div>
    </div>
  );
};
