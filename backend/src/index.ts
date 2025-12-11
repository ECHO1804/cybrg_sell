import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.routes';
import partsRoutes from './routes/parts.route';
import cartRoutes from './routes/cart.route';
import ordersRoutes from './routes/orders.route';
import fileRoutes from './routes/file.routes';
import sellerRoutes from './routes/seller.routes';
import errorHandler from './middleware/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/parts', partsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/sellers', sellerRoutes);

// Error handler 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));