import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Cart } from './Cart.js';
import { Part } from './Part.js';

@Table({ tableName: 'cart_items', timestamps: false })
export class CartItem extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Cart)
  @Column(DataType.UUID)
  declare cart_id: string;

  @ForeignKey(() => Part)
  @Column(DataType.UUID)
  declare part_id: string | null;

  @Column(DataType.DECIMAL(10, 2))
  declare total_price: number;
}
