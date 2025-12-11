'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Seller } from './Seller.js';
import type { PartAttachment } from './PartAttachment.js';
import type { PartPerk } from './PartPerk.js';
import type { CartItem } from './CartItem.js';
import type { OrderItem } from './OrderItem.js';

export class Part extends Model<
  InferAttributes<Part>,
  InferCreationAttributes<Part>
> {
  declare id: string;
  declare seller_id: string;
  declare name: string;
  declare category: string;
  declare price: number;
  declare image: string;
  declare description: string;
  declare created_at: Date;

  declare seller?: Seller;
  declare part_attachments?: PartAttachment[];
  declare part_perks?: PartPerk[];
  declare cart_items?: CartItem[];
  declare order_items?: OrderItem[];

  static associate(models: any) {
    this.belongsTo(models.Seller, {
      foreignKey: 'seller_id',
      as: 'seller',
    });

    this.hasMany(models.PartAttachment, {
      foreignKey: 'part_id',
      as: 'part_attachments',
    });

    this.hasMany(models.PartPerk, {
      foreignKey: 'part_id',
      as: 'part_perks',
    });

    this.hasMany(models.CartItem, {
      foreignKey: 'part_id',
      as: 'cart_items',
    });

    this.hasMany(models.OrderItem, {
      foreignKey: 'part_id',
      as: 'order_items',
    });
  }
}

export default function initPart(sequelize: Sequelize): typeof Part {
  Part.init(
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
      category: {
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
      modelName: 'Part',
      tableName: 'parts',
      timestamps: false,
    }
  );

  return Part;
}
