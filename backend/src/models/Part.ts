import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Seller } from './Seller.js';

@Table({ tableName: 'parts', timestamps: true })
export class Part extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Seller)
  @Column(DataType.UUID)
  declare seller_id: string;

  @Column(DataType.TEXT)
  declare name: string;

  @Column(DataType.TEXT)
  declare category: string;

  @Column(DataType.DECIMAL(10, 2))
  declare price: number;

  @Column(DataType.TEXT)
  declare image: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.DATE)
  declare created_at: Date;
}
