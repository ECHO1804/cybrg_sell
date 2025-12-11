import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Cyborg } from './Cyborg.js';
import { Seller } from './Seller.js';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Cyborg)
  @Column(DataType.UUID)
  declare cyborg_id: string;

  @ForeignKey(() => Seller)
  @Column(DataType.UUID)
  declare seller_id: string;

  @Column(DataType.DECIMAL(10, 2))
  declare total_price: number;

  @Column(DataType.TEXT)
  declare status: string;

  @Column(DataType.DATE)
  declare created_at: Date;
}
