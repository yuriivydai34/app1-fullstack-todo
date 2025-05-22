import { Model, Table, Column, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "todos",
})
export default class Todo extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "text"
  })
  text?: string;

  @Column({
    type: DataType.STRING(255),
    field: "status",
    defaultValue: "undone"
  })
  status?: string;
}
