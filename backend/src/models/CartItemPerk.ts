import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { CartItem } from './CartItem.js';
import { Perk } from './Perk.js';

@Table({ tableName: 'cart_item_perks', timestamps: false })
export class CartItemPerk extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => CartItem)
  @Column(DataType.UUID)
  declare cart_item_id: string;

  @ForeignKey(() => Perk)
  @Column(DataType.UUID)
  declare perk_id: string;
}
