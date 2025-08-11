// src/models/orders.ts

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface OrdersAttributes {
  id: number;
  email: string;
  qrcode: string;
  status: string;
  estimated_minutes: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}

interface OrdersCreationAttributes extends Optional<OrdersAttributes, 'id'> { }

class Orders extends Model<OrdersAttributes, OrdersCreationAttributes>
  implements OrdersAttributes {
  public id!: number;
  public email!: string;
  public qrcode!: string;
  public status!: string;
  public estimated_minutes!: number;
  public total_price!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: string;
  public updated_by!: string;

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
      qrcode: DataTypes.STRING,
      status: DataTypes.STRING,
      estimated_minutes: DataTypes.INTEGER,
      total_price: DataTypes.DECIMAL,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.STRING,
      updated_by: DataTypes.STRING
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