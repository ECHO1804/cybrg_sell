import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { OrderItem } from './OrderItem.js';
import { Perk } from './Perk.js';

@Table({ tableName: 'order_item_perks', timestamps: false })
export class OrderItemPerk extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => OrderItem)
  @Column(DataType.UUID)
  declare order_item_id: string;

  @ForeignKey(() => Perk)
  @Column(DataType.UUID)
  declare perk_id: string;
}
