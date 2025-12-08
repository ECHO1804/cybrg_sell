import { Sequelize } from 'sequelize-typescript';
import { Seller } from './models/Seller.js';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 5432,
  username: 'postgres.lyferdvxrqzzeuhpslly',
  password: 'tutrU0-wudxez-gepnox',
  database: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  },
  models: [Seller]  // 👈 ADD THIS LINE
});
