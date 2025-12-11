'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Order } from './Order.js';
import type { Part } from './Part.js';
import type { OrderItemPerk } from './OrderItemPerk.js';
import type { OrderItemAttachment } from './OrderItemAttachment.js';

export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: string;
  declare order_id: string;
  declare part_id: string | null;
  declare subtotal: number;

  declare order?: Order;
  declare part?: Part | null;
  declare order_item_perks?: OrderItemPerk[];
  declare order_item_attachments?: OrderItemAttachment[];

  static associate(models: any) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });

    this.belongsTo(models.Part, {
      foreignKey: 'part_id',
      as: 'part',
    });

    this.hasMany(models.OrderItemPerk, {
      foreignKey: 'order_item_id',
      as: 'order_item_perks',
    });

    this.hasMany(models.OrderItemAttachment, {
      foreignKey: 'order_item_id',
      as: 'order_item_attachments',
    });
  }
}

export default function initOrderItem(
  sequelize: Sequelize
): typeof OrderItem {
  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      part_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'order_items',
      timestamps: false,
    }
  );

  return OrderItem;
}
