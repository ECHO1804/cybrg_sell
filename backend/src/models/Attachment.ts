'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Seller } from './Seller.js';

export class Attachment extends Model<
  InferAttributes<Attachment>,
  InferCreationAttributes<Attachment>
> {
  declare id: string;
  declare seller_id: string;
  declare name: string;
  declare price: number;
  declare image: string;
  declare description: string;
  declare created_at: Date;

  declare seller?: Seller;

  static associate(models: any) {
    this.belongsTo(models.Seller, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
  }
}

export default function initAttachment(
  sequelize: Sequelize
): typeof Attachment {
  Attachment.init(
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
      modelName: 'Attachment',
      tableName: 'attachments',
      timestamps: false,
    }
  );

  return Attachment;
}
