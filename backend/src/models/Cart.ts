'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Cyborg } from './Cyborg.js';
import type { CartItem } from './CartItem.js';

export class Cart extends Model<
  InferAttributes<Cart>,
  InferCreationAttributes<Cart>
> {
  declare id: string;
  declare cyborg_id: string;
  declare created_at: Date;

  declare cyborg?: Cyborg;
  declare cart_items?: CartItem[];

  static associate(models: any) {
    this.belongsTo(models.Cyborg, {
      foreignKey: 'cyborg_id',
      as: 'cyborg',
    });

    this.hasMany(models.CartItem, {
      foreignKey: 'cart_id',
      as: 'cart_items',
    });
  }
}

export default function initCart(sequelize: Sequelize): typeof Cart {
  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      cyborg_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
      tableName: 'cart',
      timestamps: false,
    }
  );

  return Cart;
}
