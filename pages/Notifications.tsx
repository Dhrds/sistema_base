
import React from 'react';
import { Notification } from '../types';

interface NotificationsPageProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications, setNotifications }) => {
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>;
      case 'error': return <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
      case 'success': return <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>;
      default: return <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-2">Stay updated with the latest activity in your system.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm"
        >
          Mark all as read
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-6 flex flex-col sm:flex-row gap-4 transition-colors hover:bg-slate-50 ${!notif.read ? 'bg-indigo-50/30' : ''}`}
                onClick={() => markAsRead(notif.id)}
              >
                <div className="shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-sm font-bold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</h3>
                    {!notif.read && <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>}
                  </div>
                  <p className="text-sm text-slate-600 mb-2 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-slate-400 font-medium">{notif.timestamp}</p>
                </div>
                <div className="flex sm:flex-col items-center justify-end gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">All caught up!</h3>
            <p className="text-slate-500 mt-1">You have no new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};
