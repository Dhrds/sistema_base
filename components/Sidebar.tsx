
import React from 'react';
import { NavigationItem, User } from '../types';

interface SidebarProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userRole?: User['role'];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen, userRole = 'user' }) => {
  const menuItems: { id: NavigationItem; label: string; icon: string; minRole: User['role'] }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', minRole: 'user' },
    { id: 'accounts', label: 'Accounts', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', minRole: 'user' },
    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', minRole: 'user' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', minRole: 'manager' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', minRole: 'admin' },
  ];

  const roleWeights = {
    'user': 1,
    'manager': 2,
    'admin': 3
  };

  const filteredItems = menuItems.filter(item => roleWeights[userRole] >= roleWeights[item.minRole]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
        flex flex-col
      `}>
        {/* Brand */}
        <div className={`p-6 flex items-center gap-3 ${!isOpen && 'lg:justify-center'}`}>
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="font-bold text-white">N</span>
          </div>
          {isOpen && <span className="text-xl font-bold tracking-tight">NexusOS</span>}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-2 py-4">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all
                ${activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                ${!isOpen && 'lg:justify-center lg:px-0'}
              `}
            >
              <svg 
                className={`w-6 h-6 shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer info */}
        {isOpen && (
          <div className="p-4 border-t border-slate-800">
            <div className="bg-slate-800/50 p-4 rounded-xl">
              <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Role</p>
              <p className="text-sm text-indigo-400 font-bold capitalize mb-3">{userRole}</p>
              <p className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider">System Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-200">Operational</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
