import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Cyborg } from './Cyborg.js';

@Table({ tableName: 'cart', timestamps: true })
export class Cart extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Cyborg)
  @Column(DataType.UUID)
  declare cyborg_id: string;

  @Column(DataType.DATE)
  declare created_at: Date;
}
