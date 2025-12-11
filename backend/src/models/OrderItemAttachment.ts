'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { OrderItem } from './OrderItem.js';
import type { Attachment } from './Attachment.js';

export class OrderItemAttachment extends Model<
  InferAttributes<OrderItemAttachment>,
  InferCreationAttributes<OrderItemAttachment>
> {
  declare id: string;
  declare order_item_id: string;
  declare attachment_id: string;

  declare order_item?: OrderItem;
  declare attachment?: Attachment;

  static associate(models: any) {
    this.belongsTo(models.OrderItem, {
      foreignKey: 'order_item_id',
      as: 'order_item',
    });

    this.belongsTo(models.Attachment, {
      foreignKey: 'attachment_id',
      as: 'attachment',
    });
  }
}

export default function initOrderItemAttachment(
  sequelize: Sequelize
): typeof OrderItemAttachment {
  OrderItemAttachment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      order_item_id: {
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
      modelName: 'OrderItemAttachment',
      tableName: 'order_item_attachments',
      timestamps: false,
    }
  );

  return OrderItemAttachment;
}
