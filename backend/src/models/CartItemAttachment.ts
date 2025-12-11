'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { CartItem } from './CartItem.js';
import type { Attachment } from './Attachment.js';

export class CartItemAttachment extends Model<
  InferAttributes<CartItemAttachment>,
  InferCreationAttributes<CartItemAttachment>
> {
  declare id: string;
  declare cart_item_id: string;
  declare attachment_id: string;

  declare cart_item?: CartItem;
  declare attachment?: Attachment;

  static associate(models: any) {
    this.belongsTo(models.CartItem, {
      foreignKey: 'cart_item_id',
      as: 'cart_item',
    });

    this.belongsTo(models.Attachment, {
      foreignKey: 'attachment_id',
      as: 'attachment',
    });
  }
}

export default function initCartItemAttachment(
  sequelize: Sequelize
): typeof CartItemAttachment {
  CartItemAttachment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      cart_item_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      attachment_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CartItemAttachment',
      tableName: 'cart_item_attachments',
      timestamps: false,
    }
  );

  return CartItemAttachment;
}
