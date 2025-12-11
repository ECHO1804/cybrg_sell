import { Sequelize } from 'sequelize-typescript';
import { Seller } from './models/Seller.js';
import { Cyborg } from './models/Cyborg.js';
import { Part } from './models/Part.js';
import { Attachment } from './models/Attachment.js';
import { Perk } from './models/Perk.js';
import { Cart } from './models/Cart.js';
import { CartItem } from './models/CartItem.js';
import { CartItemAttachment } from './models/CartItemAttachment.js';
import { CartItemPerk } from './models/CartItemPerk.js';
import { PartAttachment } from './models/PartAttachment.js';
import { PartPerk } from './models/PartPerk.js';
import { Order } from './models/Order.js';
import { OrderItem } from './models/OrderItem.js';
import { OrderItemAttachment } from './models/OrderItemAttachment.js';
import { OrderItemPerk } from './models/OrderItemPerk.js';

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
  models: [
    Seller,
    Cyborg,
    Part,
    Attachment,
    Perk,
    Cart,
    CartItem,
    CartItemAttachment,
    CartItemPerk,
    PartAttachment,
    PartPerk,
    Order,
    OrderItem,
    OrderItemAttachment,
    OrderItemPerk
  ]
});
