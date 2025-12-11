'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Seller } from './Seller.js';
import type { PartPerk } from './PartPerk.js';
import type { CartItemPerk } from './CartItemPerk.js';
import type { OrderItemPerk } from './OrderItemPerk.js';

export class Perk extends Model<
  InferAttributes<Perk>,
  InferCreationAttributes<Perk>
> {
  declare id: string;
  declare seller_id: string;
  declare name: string;
  declare price: number;
  declare image: string;
  declare description: string;
  declare created_at: Date;

  // associations
  declare seller?: Seller;
  declare part_perks?: PartPerk[];
  declare cart_item_perks?: CartItemPerk[];
  declare order_item_perks?: OrderItemPerk[];

  static associate(models: any) {
    this.belongsTo(models.Seller, {
      foreignKey: 'seller_id',
      as: 'seller',
    });

    this.hasMany(models.PartPerk, {
      foreignKey: 'perk_id',
      as: 'part_perks',
    });

    this.hasMany(models.CartItemPerk, {
      foreignKey: 'perk_id',
      as: 'cart_item_perks',
    });

    this.hasMany(models.OrderItemPerk, {
      foreignKey: 'perk_id',
      as: 'order_item_perks',
    });
  }
}

export default function initPerk(sequelize: Sequelize): typeof Perk {
  Perk.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      seller_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Perk',
      tableName: 'perks',
      timestamps: false,
    }
  );

  return Perk;
}
