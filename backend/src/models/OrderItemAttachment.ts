import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { OrderItem } from './OrderItem.js';
import { Attachment } from './Attachment.js';

@Table({ tableName: 'order_item_attachments', timestamps: false })
export class OrderItemAttachment extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => OrderItem)
  @Column(DataType.UUID)
  declare order_item_id: string;

  @ForeignKey(() => Attachment)
  @Column(DataType.UUID)
  declare attachment_id: string;
}
