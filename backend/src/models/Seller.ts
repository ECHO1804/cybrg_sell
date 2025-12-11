'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

// 1. Model class with typed attributes
export class Seller extends Model<
  InferAttributes<Seller>,
  InferCreationAttributes<Seller>
> {
  declare id: string;
  declare email: string;
  declare password: string;
  declare name: string;
  declare created_at: Date;

  // 2. Relationships
  static associate(models: any) {
    // Example: Seller has many Products
    this.hasMany(models.Product, {
      foreignKey: 'seller_id',
      as: 'products',
    });
  }
}

// 3. Default export: init function
export default function initSeller(sequelize: Sequelize): typeof Seller {
  Seller.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Seller',
      tableName: 'seller',
      timestamps: false,
    }
  );

  return Seller;
}
