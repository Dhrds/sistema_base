
import React from 'react';
import { User } from '../types';

interface AccountsProps {
  user: User;
}

export const Accounts: React.FC<AccountsProps> = ({ user }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Account Profile</h1>
        <p className="text-slate-500 mt-2">Manage your personal information and login credentials.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
            <div className="relative inline-block mb-6">
              <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-indigo-50 mx-auto" />
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-500 mb-6">{user.role.toUpperCase()}</p>
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">Verified</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">Premium User</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Details</h3>
            <ul className="space-y-4">
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Member since</span>
                <span className="text-slate-800 font-medium">Dec 2022</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Last Active</span>
                <span className="text-slate-800 font-medium">10 mins ago</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-800 font-medium">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Forms */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input type="text" defaultValue={user.name} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input type="email" defaultValue={user.email} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Brazil</option>
                  <option>United Kingdom</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                Save Changes
              </button>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 border-l-4 border-l-rose-500">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Danger Zone</h2>
            <p className="text-slate-500 text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-6 py-3 border-2 border-rose-100 text-rose-600 font-bold rounded-xl hover:bg-rose-50 transition-all">
              Delete Account
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
