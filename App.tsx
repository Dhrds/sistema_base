
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Accounts } from './pages/Accounts';
import { NotificationsPage } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { AIAssistant } from './pages/AIAssistant';
import { NavigationItem, User, Notification } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationItem>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Initial Data Load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [userData, notifData] = await Promise.all([
          api.getUser(),
          api.getNotifications()
        ]);
        setUser(userData);
        setNotifications(notifData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Initializing NexusOS...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (!user) return null;
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'accounts': return <Accounts user={user} />;
      case 'notifications': 
        return <NotificationsPage notifications={notifications} setNotifications={setNotifications} />;
      case 'settings': return <Settings />;
      case 'ai-assistant': return <AIAssistant />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {user && (
          <Navbar 
            user={user} 
            unreadCount={unreadCount} 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            setActiveTab={setActiveTab}
          />
        )}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
