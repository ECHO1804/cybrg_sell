'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Cyborg } from './Cyborg.js';
import type { Seller } from './Seller.js';
import type { OrderItem } from './OrderItem.js';

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: string;
  declare cyborg_id: string;
  declare seller_id: string;
  declare total_price: number;
  declare status: string;
  declare created_at: Date;

  declare cyborg?: Cyborg;
  declare seller?: Seller;
  declare order_items?: OrderItem[];

  static associate(models: any) {
    this.belongsTo(models.Cyborg, {
      foreignKey: 'cyborg_id',
      as: 'cyborg',
    });

    this.belongsTo(models.Seller, {
      foreignKey: 'seller_id',
      as: 'seller',
    });

    this.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'order_items',
    });
  }
}

export default function initOrder(sequelize: Sequelize): typeof Order {
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      cyborg_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: false,
    }
  );

  return Order;
}
