'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Part } from './Part.js';
import type { Attachment } from './Attachment.js';

export class PartAttachment extends Model<
  InferAttributes<PartAttachment>,
  InferCreationAttributes<PartAttachment>
> {
  declare id: string;
  declare part_id: string;
  declare attachment_id: string;

  declare part?: Part;
  declare attachment?: Attachment;

  static associate(models: any) {
    this.belongsTo(models.Part, {
      foreignKey: 'part_id',
      as: 'part',
    });

    this.belongsTo(models.Attachment, {
      foreignKey: 'attachment_id',
      as: 'attachment',
    });
  }
}

export default function initPartAttachment(
  sequelize: Sequelize
): typeof PartAttachment {
  PartAttachment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      part_id: {
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
      modelName: 'PartAttachment',
      tableName: 'part_attachments',
      timestamps: false,
    }
  );

  return PartAttachment;
}
