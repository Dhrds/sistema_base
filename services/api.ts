
import { User, Notification, AppSettings } from '../types';

// In a real app, this would be your backend URL (e.g., http://localhost:3001)
const BASE_URL = '/api';

// Simulation of network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getUser(): Promise<User> {
    await delay(800);
    // In real app: return fetch(`${BASE_URL}/user`).then(res => res.json());
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
