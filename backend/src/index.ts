import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db.js'; 

dotenv.config();

import authRoutes from './routes/auth.routes.js';
import partsRoutes from './routes/parts.route.js';
import cartRoutes from './routes/cart.route.js';
import ordersRoutes from './routes/orders.route.js';
import fileRoutes from './routes/file.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import errorHandler from './middleware/errorHandler.middleware.js';

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

// ADD DATABASE CONNECTION
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully!');
    
    // Optional: Sync models (be careful in production!)
    // await sequelize.sync({ alter: true });
    
    app.listen(PORT, () => {
      console.log(` Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(' Unable to connect to database:', error);
    process.exit(1);
  }
}

startServer();