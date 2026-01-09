
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const StatCard: React.FC<{ title: string; value: string; trend: string; positive?: boolean; icon: React.ReactNode; loading?: boolean }> = ({ title, value, trend, positive, icon, loading }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
    {loading ? (
      <div className="animate-pulse space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
          <div className="w-12 h-6 bg-slate-100 rounded-full"></div>
        </div>
        <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
        <div className="w-3/4 h-8 bg-slate-100 rounded"></div>
      </div>
    ) : (
      <>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {trend}
          </span>
        </div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </>
    )}
  </div>
);

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStats().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Insights</h1>
        <p className="text-slate-500 mt-2">Real-time data synchronized with backend services.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          loading={loading}
          title="Total Users" value={stats?.totalUsers} trend="+12.5%" positive 
          icon={<svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatCard 
          loading={loading}
          title="Active Sessions" value={stats?.activeSessions} trend="+5.2%" positive 
          icon={<svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        />
        <StatCard 
          loading={loading}
          title="Monthly Revenue" value={stats?.revenue} trend="-2.4%" positive={false} 
          icon={<svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" /></svg>}
        />
        <StatCard 
          loading={loading}
          title="API Latency" value={stats?.responseTime} trend="Stable" positive 
          icon={<svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">API Gateway Logs</h2>
            <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">Live Feed</span>
          </div>
          <div className="divide-y divide-slate-100">
            {loading ? [1,2,3].map(i => (
              <div key={i} className="p-6 animate-pulse flex gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-1/4 h-3 bg-slate-100 rounded"></div>
                  <div className="w-3/4 h-3 bg-slate-100 rounded"></div>
                </div>
              </div>
            )) : [1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 font-mono">POST /api/v1/auth/refresh</p>
                  <p className="text-xs text-slate-500 truncate">Status: 200 OK | Duration: 45ms</p>
                </div>
                <div className="text-xs text-slate-400 font-medium">Just now</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
             <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 relative z-10">Nexus Cloud</h2>
          <p className="text-slate-400 text-sm mb-8 relative z-10 leading-relaxed">Sua infraestrutura gerenciada com inteligência artificial e deploy contínuo.</p>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
              <span className="text-xs font-medium text-slate-300">Auto-scaling ativo</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
              <span className="text-xs font-medium text-slate-300">Backups diários</span>
            </div>
          </div>
          <button className="mt-12 w-full py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
            Configurar Cluster
          </button>
        </div>
      </div>
    </div>
  );
};
