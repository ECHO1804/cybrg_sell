import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Part } from './Part.js';
import { Attachment } from './Attachment.js';

@Table({ tableName: 'part_attachments', timestamps: false })
export class PartAttachment extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Part)
  @Column(DataType.UUID)
  declare part_id: string;

  @ForeignKey(() => Attachment)
  @Column(DataType.UUID)
  declare attachment_id: string;
}
