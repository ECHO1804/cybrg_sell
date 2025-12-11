import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'cyborgs', timestamps: true })
export class Cyborg extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @Column(DataType.TEXT)
  declare email: string;

  @Column(DataType.TEXT)
  declare password: string;

  @Column(DataType.TEXT)
  declare name: string;

  @Column(DataType.DATE)
  declare created_at: Date;
}
