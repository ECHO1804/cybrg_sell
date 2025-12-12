'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Cart } from './Cart.js';
import type { Part } from './Part.js';
import type { CartItemPerk } from './CartItemPerk.js';
import type { CartItemAttachment } from './CartItemAttachment.js';

export class CartItem extends Model<
  InferAttributes<CartItem>,
  InferCreationAttributes<CartItem>
> {
  declare id: string;
  declare cart_id: string;
  declare part_id: string | null;
  declare total_price: number;

  declare cart?: Cart;
  declare part?: Part | null;
  declare cart_item_perks?: CartItemPerk[];
  declare cart_item_attachments?: CartItemAttachment[];

  static associate(models: any) {
    this.belongsTo(models.Cart, {
      foreignKey: 'cart_id',
      as: 'cart',
    });

    this.belongsTo(models.Part, {
      foreignKey: 'part_id',
      as: 'part',
    });

    this.hasMany(models.CartItemPerk, {
      foreignKey: 'cart_item_id',
      as: 'cart_item_perks',
    });

    this.hasMany(models.CartItemAttachment, {
      foreignKey: 'cart_item_id',
      as: 'cart_item_attachments',
    });
  }
}

export default function initCartItem(sequelize: Sequelize): typeof CartItem {
  CartItem.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      cart_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      part_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CartItem',
      tableName: 'cart_items',
      timestamps: false,
    }
  );

  return CartItem;
}
