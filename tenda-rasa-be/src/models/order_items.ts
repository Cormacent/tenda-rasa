import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface OrderItemAttributes {
  id: number;
  order_id: number;
  menu_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  menu_name: string;
  menu_category?: string;
  menu_type?: string;
  spiciness_level?: number;
  image_url?: string;
  estimated_minutes?: number;
  created_at: Date;
  updated_at: Date;
}

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, 'id' | 'subtotal' | 'menu_category' | 'menu_type' | 'spiciness_level' | 'image_url' | 'estimated_minutes'> {}

class OrderItems extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes {
  public id!: number;
  public order_id!: number;
  public menu_id!: number;
  public quantity!: number;
  public price!: number;
  public subtotal!: number;
  public menu_name!: string;
  public menu_category?: string;
  public menu_type?: string;
  public spiciness_level?: number;
  public image_url?: string;
  public estimated_minutes?: number;
  public created_at!: Date;
  public updated_at!: Date;

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
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      menu_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      menu_category: DataTypes.STRING,
      menu_type: DataTypes.STRING,
      spiciness_level: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      estimated_minutes: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
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