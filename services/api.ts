
import { User, Notification, AppSettings } from '../types';

const BASE_URL = '/api';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async login(email: string, password: string): Promise<User> {
    await delay(1200);
    // Simulating validation
    if (email.includes('error')) throw new Error("Credenciais inválidas");
    
    // Role simulation based on email
    let role: 'admin' | 'user' | 'manager' = 'user';
    if (email.startsWith('admin')) role = 'admin';
    else if (email.startsWith('manager')) role = 'manager';

    return {
      id: '1',
      name: role.charAt(0).toUpperCase() + role.slice(1) + ' Account',
      email: email,
      role: role,
      avatar: `https://picsum.photos/seed/${role}/200`,
      lastLogin: new Date().toISOString()
    };
  },

  async register(data: any): Promise<User> {
    await delay(1500);
    return {
      id: '2',
      name: data.name,
      email: data.email,
      role: 'user',
      avatar: `https://picsum.photos/seed/${data.name}/200`,
      lastLogin: new Date().toISOString()
    };
  },

  async resetPassword(email: string): Promise<boolean> {
    await delay(1000);
    return true;
  },

  async getUser(): Promise<User> {
    await delay(800);
    return {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex.rivera@nexus-os.com',
      role: 'admin',
      avatar: 'https://picsum.photos/seed/alex/200',
      lastLogin: '2023-10-27 10:45 AM'
    };
  },

  async getNotifications(): Promise<Notification[]> {
    await delay(600);
    return [
      { id: 'n1', title: 'System Update', message: 'Maintenance scheduled.', type: 'warning', timestamp: '2h ago', read: false },
      { id: 'n2', title: 'New Login', message: 'Secure your account.', type: 'info', timestamp: '5h ago', read: true }
    ];
  },

  async getStats() {
    await delay(400);
    return {
      totalUsers: "12,482",
      activeSessions: "1,204",
      revenue: "$45,210",
      responseTime: "124ms"
    };
  },

  async saveSettings(settings: any) {
    await delay(1000);
    return { success: true };
  }
};
