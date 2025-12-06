import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

//import testRoutes from './routes/test.routes';
import authRoutes from './routes/auth.rotes';
import cartRoutes from './routes/cart.route';
import ordersRoutes from './routes/orders.route';
import partsRoutes from './routes/parts.route';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
//app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/parts', partsRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});