
export type NavigationItem = 'dashboard' | 'accounts' | 'notifications' | 'settings' | 'ai-assistant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  avatar: string;
  lastLogin: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: string;
}
