// src/models/orders.ts

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface OrdersAttributes {
  id: number;
  email: string;
  qrcode: string;
  status: string;
  estimatedMinutes: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

interface OrdersCreationAttributes extends Optional<OrdersAttributes, 'id'> { }

class Orders extends Model<OrdersAttributes, OrdersCreationAttributes>
  implements OrdersAttributes {
  public id!: number;
  public email!: string;
  public qrcode!: string;
  public status!: string;
  public estimatedMinutes!: number;
  public totalPrice!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public createdBy!: string;
  public updatedBy!: string;

  // ✨ Optional: tempat definisi relasi
  static associate(models: any) {
    Orders.hasMany(models.OrderItems, { foreignKey: 'order_id', as: 'orderItems' });
  }
}

export default (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes): typeof Orders => {
  Orders.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      qrcode: DataTypes.TEXT,
      status: DataTypes.STRING,
      estimatedMinutes: { type: DataTypes.INTEGER, field: 'estimated_minutes' },
      totalPrice: { type: DataTypes.DECIMAL },
      createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at', defaultValue: DataTypes.NOW },
      createdBy: { type: DataTypes.STRING, field: 'created_by' },
      updatedBy: { type: DataTypes.STRING, field: 'updated_by' }
    },
    {
      sequelize,
      tableName: 'orders',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Orders;
};