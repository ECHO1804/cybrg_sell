import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({ 
  tableName: 'seller', 
  timestamps: false  // 👈 NO auto timestamps
})
export class Seller extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)  // 👈 ADD PASSWORD
  declare password: string;

  @Column(DataType.STRING)
  declare name: string;
}
