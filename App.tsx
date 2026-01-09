
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
  
  // Dark mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('nexus_theme') === 'dark';
  });

  // Effect to handle dark mode class on root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nexus_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nexus_theme', 'light');
    }
  }, [isDarkMode]);

  // Initial Load
  useEffect(() => {
    const checkSession = async () => {
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Iniciando NexusOS...</p>
        </div>
      </div>
    );
  }

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

  // Permission Checks
  const hasAccess = (tab: NavigationItem): boolean => {
    if (!user) return false;
    const role = user.role;
    const roleWeights = { user: 1, manager: 2, admin: 3 };
    const tabPermissions: Record<NavigationItem, number> = {
      dashboard: 1,
      accounts: 1,
      notifications: 1,
      'ai-assistant': 2,
      settings: 3
    };
    return roleWeights[role] >= tabPermissions[tab];
  };

  const renderContent = () => {
    if (!user) return null;
    
    // Redirect if trying to access restricted content
    if (!hasAccess(activeTab)) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Acesso Negado</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">Você não tem permissão de {user.role} para acessar esta funcionalidade. Entre em contato com um administrador.</p>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="mt-8 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
          >
            Voltar para o Início
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'accounts': return <Accounts user={user} />;
      case 'notifications': 
        return <NotificationsPage notifications={notifications} setNotifications={setNotifications} />;
      case 'settings': 
        return <Settings isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
      case 'ai-assistant': return <AIAssistant />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        userRole={user?.role}
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
