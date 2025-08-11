// src/models/menu_booth.ts
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface MenuBoothAttributes {
  id: number;
  booth_name: string;
  menu_name: string;
  description: string;
  price: number;
  tags: string[];
  category: string;
  menu_type: string;
  spiciness_level: number;
  image_url: string;
  stock: number;
  is_available: boolean;
  estimated_minutes: number;
  is_favorite: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}

interface MenuBoothCreationAttributes extends Optional<MenuBoothAttributes, 'id'> { }

class MenuBooth extends Model<MenuBoothAttributes, MenuBoothCreationAttributes>
  implements MenuBoothAttributes {
  public id!: number;
  public booth_name!: string;
  public menu_name!: string;
  public description!: string;
  public price!: number;
  public tags!: string[];
  public category!: string;
  public menu_type!: string;
  public spiciness_level!: number;
  public image_url!: string;
  public stock!: number;
  public is_available!: boolean;
  public estimated_minutes!: number;
  public is_favorite!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: string;
  public updated_by!: string;

  static associate(models: any) {
    MenuBooth.hasMany(models.OrderItems, {
      foreignKey: 'menu_id',
      as: 'order_items', // optional: for cleaner eager loading
    });
  }
}

export default (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes): typeof MenuBooth => {
  MenuBooth.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      booth_name: { type: DataTypes.TEXT, allowNull: false },
      menu_name: { type: DataTypes.TEXT, allowNull: false },
      description: DataTypes.TEXT,
      price: { type: DataTypes.INTEGER, allowNull: false },
      tags: DataTypes.ARRAY(DataTypes.TEXT),
      category: DataTypes.TEXT,
      menu_type: DataTypes.TEXT,
      spiciness_level: DataTypes.INTEGER,
      image_url: DataTypes.TEXT,
      stock: DataTypes.INTEGER,
      is_available: DataTypes.BOOLEAN,
      estimated_minutes: DataTypes.INTEGER,
      is_favorite: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.TEXT,
      updated_by: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: 'menu_booth',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  return MenuBooth;
};