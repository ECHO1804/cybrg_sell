'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import type { Part } from './Part.js';
import type { Perk } from './Perk.js';

export class PartPerk extends Model<
  InferAttributes<PartPerk>,
  InferCreationAttributes<PartPerk>
> {
  declare id: string;
  declare part_id: string;
  declare perk_id: string;

  declare part?: Part;
  declare perk?: Perk;

  static associate(models: any) {
    this.belongsTo(models.Part, {
      foreignKey: 'part_id',
      as: 'part',
    });

    this.belongsTo(models.Perk, {
      foreignKey: 'perk_id',
      as: 'perk',
    });
  }
}

export default function initPartPerk(sequelize: Sequelize): typeof PartPerk {
  PartPerk.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      part_id: {
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
      modelName: 'PartPerk',
      tableName: 'part_perks',
      timestamps: false,
    }
  );

  return PartPerk;
}
