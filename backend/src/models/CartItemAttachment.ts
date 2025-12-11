import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { CartItem } from './CartItem.js';
import { Attachment } from './Attachment.js';

@Table({ tableName: 'cart_item_attachments', timestamps: false })
export class CartItemAttachment extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => CartItem)
  @Column(DataType.UUID)
  declare cart_item_id: string;

  @ForeignKey(() => Attachment)
  @Column(DataType.UUID)
  declare attachment_id: string;
}
