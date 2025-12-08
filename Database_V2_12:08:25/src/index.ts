import { sequelize } from './db.js';
import { Seller } from './models/Seller.js';

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ DATABASE CONNECTED');
    
    // Test seller table
    const sellers = await Seller.findAll();
    console.log('✅ SELLERS:', sellers.length);
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

testConnection();
