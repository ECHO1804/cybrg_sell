import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import partsRoutes from './routes/parts.route';
import cartRoutes from './routes/cart.route';
import ordersRoutes from './routes/orders.route';
import fileRoutes from './routes/file.routes';
import sellerRoutes from './routes/seller.routes';
import errorHandler from './middleware/errorHandler.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parts', partsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/sellers', sellerRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CYBORGMANIA API is running' });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`CYBORGMANIA Backend running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
});