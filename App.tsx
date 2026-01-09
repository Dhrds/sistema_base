
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Accounts } from './pages/Accounts';
import { NotificationsPage } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { AIAssistant } from './pages/AIAssistant';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { NavigationItem, User, Notification } from './types';
import { api } from './services/api';

type AuthView = 'login' | 'register' | 'forgot-password';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [activeTab, setActiveTab] = useState<NavigationItem>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Initial Load (Simulation of session check)
  useEffect(() => {
    const checkSession = async () => {
      // For this template, we always start at login unless it's a real app with localStorage/cookies
      setLoading(false);
    };
    checkSession();
  }, []);

  // Fetch data after login
  useEffect(() => {
    if (isAuthenticated && user) {
      const loadData = async () => {
        const notifData = await api.getNotifications();
        setNotifications(notifData);
      };
      loadData();
    }
  }, [isAuthenticated, user]);

  // Sidebar responsive handling
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setAuthView('login');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Iniciando NexusOS...</p>
        </div>
      </div>
    );
  }

  // Auth Screens
  if (!isAuthenticated) {
    switch (authView) {
      case 'register':
        return <Register onLogin={handleLoginSuccess} onNavigate={() => setAuthView('login')} />;
      case 'forgot-password':
        return <ForgotPassword onNavigate={() => setAuthView('login')} />;
      default:
        return <Login onLogin={handleLoginSuccess} onNavigate={setAuthView} />;
    }
  }

  // Dashboard / App Content
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
            unreadCount={notifications.filter(n => !n.read).length} 
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
