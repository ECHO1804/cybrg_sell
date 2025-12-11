import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Part } from './Part.js';
import { Perk } from './Perk.js';

@Table({ tableName: 'part_perks', timestamps: false })
export class PartPerk extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Part)
  @Column(DataType.UUID)
  declare part_id: string;

  @ForeignKey(() => Perk)
  @Column(DataType.UUID)
  declare perk_id: string;
}
