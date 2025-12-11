import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Order } from './Order.js';
import { Part } from './Part.js';

@Table({ tableName: 'order_items', timestamps: false })
export class OrderItem extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  declare order_id: string;

  @ForeignKey(() => Part)
  @Column(DataType.UUID)
  declare part_id: string | null;

  @Column(DataType.DECIMAL(10, 2))
  declare subtotal: number;
}
