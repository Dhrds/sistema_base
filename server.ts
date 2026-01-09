
/**
 * BACKEND TEMPLATE (Node.js + TypeScript + Express)
 * Copy this file to your backend project.
 */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { User, Notification, AppSettings } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database State
let mockUser: User = {
  id: '1',
  name: 'Alex Rivera',
  email: 'alex.rivera@nexus-os.com',
  role: 'admin',
  avatar: 'https://picsum.photos/seed/alex/200',
  lastLogin: new Date().toISOString()
};

let notifications: Notification[] = [
  { id: 'n1', title: 'System Update', message: 'The system will undergo maintenance at 2 AM UTC.', type: 'warning', timestamp: '2 hours ago', read: false },
  { id: 'n2', title: 'New Login', message: 'A new login was detected from a Chrome browser.', type: 'info', timestamp: '5 hours ago', read: true }
];

// Routes
app.get('/api/user', (req: Request, res: Response) => {
  res.json(mockUser);
});

app.get('/api/notifications', (req: Request, res: Response) => {
  res.json(notifications);
});

app.post('/api/notifications/read-all', (req: Request, res: Response) => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  res.status(200).json({ success: true });
});

app.post('/api/settings', (req: Request, res: Response) => {
  const newSettings = req.body;
  // Here you would save to DB
  console.log('Settings updated:', newSettings);
  res.json({ message: 'Settings saved successfully', settings: newSettings });
});

app.get('/api/stats', (req: Request, res: Response) => {
  res.json({
    totalUsers: 12482,
    activeSessions: 1204,
    revenue: 45210,
    responseTime: '124ms'
  });
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// For demonstration purposes in the UI environment, we won't call app.listen()
// But in a real node environment:
// app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

export default app;
