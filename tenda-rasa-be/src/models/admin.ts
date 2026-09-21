// src/models/admin.ts
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface AdminAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (
  sequelize: Sequelize,
  DataTypes: typeof import('sequelize').DataTypes
): typeof Admin => {
  Admin.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: 'admins',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Admin;
};
