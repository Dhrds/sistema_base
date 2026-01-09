
import React, { useState } from 'react';
import { User, NavigationItem } from '../types';

interface NavbarProps {
  user: User;
  unreadCount: number;
  toggleSidebar: () => void;
  setActiveTab: (tab: NavigationItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, unreadCount, toggleSidebar, setActiveTab }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 h-16 shrink-0 z-10 sticky top-0">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        {/* Left: Search & Toggle */}
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-full max-w-md">
            <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-600"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications Trigger */}
          <button 
            onClick={() => setActiveTab('notifications')}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          <div className="w-px h-8 bg-slate-200 mx-2 hidden md:block"></div>

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <div className="hidden md:text-right">
                <p className="text-sm font-semibold text-slate-700 leading-none">{user.name}</p>
                <p className="text-xs text-slate-500 mt-1 capitalize">{user.role}</p>
              </div>
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full border border-slate-200"
              />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setProfileOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-30">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <button onClick={() => {setActiveTab('accounts'); setProfileOpen(false);}} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">My Profile</button>
                  <button onClick={() => {setActiveTab('settings'); setProfileOpen(false);}} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Settings</button>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-rose-600 font-medium hover:bg-rose-50 transition-colors">Log out</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
