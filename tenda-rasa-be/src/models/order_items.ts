import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface OrderItemAttributes {
  id: number;
  orderId: number;
  menuId: number;
  quantity: number;
  price: number;
  subtotal: number;
  menuName: string;
  menuCategory?: string;
  menuType?: string;
  spicinessLevel?: number;
  imageUrl?: string;
  estimatedMinutes?: number;
  createdAt: Date;
  updatedAt: Date;
  remarks?: string; // Optional, used for order items
}

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, 'id' | 'subtotal' | 'menuCategory' | 'menuType' | 'spicinessLevel' | 'imageUrl' | 'estimatedMinutes'> { }

class OrderItems extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes {
  public id!: number;
  public orderId!: number;
  public menuId!: number;
  public quantity!: number;
  public price!: number;
  public subtotal!: number;
  public menuName!: string;
  public menuCategory?: string;
  public menuType?: string;
  public spicinessLevel?: number;
  public imageUrl?: string;
  public estimatedMinutes?: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public remarks?: string | undefined;

  static associate(models: any) {
    OrderItems.belongsTo(models.Orders, {
      foreignKey: 'order_id',
      as: 'order'
    });

    OrderItems.belongsTo(models.MenuBooth, {
      foreignKey: 'menu_id',
      as: 'menu'
    });
  }
}

export default (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes): typeof OrderItems => {
  OrderItems.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'order_id'
      },
      menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'menu_id'
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      menuName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'menu_name'
      },
      menuCategory: { type: DataTypes.STRING, field: 'menu_category' },
      menuType: { type: DataTypes.STRING, field: 'menu_type' },
      spicinessLevel: { type: DataTypes.INTEGER, field: 'spiciness_level' },
      imageUrl: { type: DataTypes.STRING, field: 'image_url' },
      estimatedMinutes: { type: DataTypes.INTEGER, field: 'estimated_minutes' },
      createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at', defaultValue: DataTypes.NOW },
      remarks: DataTypes.STRING // Optional, used for order items
    },
    {
      sequelize,
      tableName: 'order_items',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  return OrderItems;
};