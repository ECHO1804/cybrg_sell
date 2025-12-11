'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { OrderItem } from './OrderItem.js';
import type { Perk } from './Perk.js';

export class OrderItemPerk extends Model<
  InferAttributes<OrderItemPerk>,
  InferCreationAttributes<OrderItemPerk>
> {
  declare id: string;
  declare order_item_id: string;
  declare perk_id: string;

  declare order_item?: OrderItem;
  declare perk?: Perk;

  static associate(models: any) {
    this.belongsTo(models.OrderItem, {
      foreignKey: 'order_item_id',
      as: 'order_item',
    });

    this.belongsTo(models.Perk, {
      foreignKey: 'perk_id',
      as: 'perk',
    });
  }
}

export default function initOrderItemPerk(
  sequelize: Sequelize
): typeof OrderItemPerk {
  OrderItemPerk.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      order_item_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      perk_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderItemPerk',
      tableName: 'order_item_perks',
      timestamps: false,
    }
  );

  return OrderItemPerk;
}
