'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Cart } from './Cart.js';
import type { Order } from './Order.js';

export class Cyborg extends Model<
  InferAttributes<Cyborg>,
  InferCreationAttributes<Cyborg>
> {
  declare id: string;
  declare email: string;
  declare password: string;
  declare name: string;
  declare created_at: Date;

  declare carts?: Cart[];
  declare orders?: Order[];

  static associate(models: any) {
    this.hasMany(models.Cart, {
      foreignKey: 'cyborg_id',
      as: 'carts',
    });

    this.hasMany(models.Order, {
      foreignKey: 'cyborg_id',
      as: 'orders',
    });
  }
}

export default function initCyborg(sequelize: Sequelize): typeof Cyborg {
  Cyborg.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Cyborg',
      tableName: 'cyborgs',
      timestamps: false,
    }
  );

  return Cyborg;
}
