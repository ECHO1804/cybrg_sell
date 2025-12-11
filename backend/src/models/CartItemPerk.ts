'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { CartItem } from './CartItem.js';
import type { Perk } from './Perk.js';

export class CartItemPerk extends Model<
  InferAttributes<CartItemPerk>,
  InferCreationAttributes<CartItemPerk>
> {
  declare id: string;
  declare cart_item_id: string;
  declare perk_id: string;

  declare cart_item?: CartItem;
  declare perk?: Perk;

  static associate(models: any) {
    this.belongsTo(models.CartItem, {
      foreignKey: 'cart_item_id',
      as: 'cart_item',
    });

    this.belongsTo(models.Perk, {
      foreignKey: 'perk_id',
      as: 'perk',
    });
  }
}

export default function initCartItemPerk(
  sequelize: Sequelize
): typeof CartItemPerk {
  CartItemPerk.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      cart_item_id: {
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
      modelName: 'CartItemPerk',
      tableName: 'cart_item_perks',
      timestamps: false,
    }
  );

  return CartItemPerk;
}
