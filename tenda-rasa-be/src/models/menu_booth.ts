// src/models/menu_booth.ts
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface MenuBoothAttributes {
  id: number;
  boothName: string;
  menuName: string;
  description: string;
  price: number;
  tags: string[];
  category: string;
  menuType: string;
  spicinessLevel: number;
  imageUrl: string;
  stock: number;
  isAvailable: boolean;
  estimatedMinutes: number;
  isFavorite: boolean;
  createdBy: string;
  updatedBy: string;
}

interface MenuBoothCreationAttributes extends Optional<MenuBoothAttributes, 'id'> {}

class MenuBooth
  extends Model<MenuBoothAttributes, MenuBoothCreationAttributes>
  implements MenuBoothAttributes {
  public id!: number;
  public boothName!: string;
  public menuName!: string;
  public description!: string;
  public price!: number;
  public tags!: string[];
  public category!: string;
  public menuType!: string;
  public spicinessLevel!: number;
  public imageUrl!: string;
  public stock!: number;
  public isAvailable!: boolean;
  public estimatedMinutes!: number;
  public isFavorite!: boolean;
  public createdBy!: string;
  public updatedBy!: string;

  static associate(models: any) {
    MenuBooth.hasMany(models.OrderItems, {
      foreignKey: 'menu_id',
      as: 'order_items'
    });
  }
}

export default (
  sequelize: Sequelize,
  DataTypes: typeof import('sequelize').DataTypes
): typeof MenuBooth => {
  MenuBooth.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

      boothName: { type: DataTypes.TEXT, allowNull: false, field: 'booth_name' },
      menuName: { type: DataTypes.TEXT, allowNull: false, field: 'menu_name' },
      description: { type: DataTypes.TEXT },

      price: { type: DataTypes.INTEGER, allowNull: false },
      tags: { type: DataTypes.ARRAY(DataTypes.TEXT) },

      category: { type: DataTypes.TEXT },
      menuType: { type: DataTypes.TEXT, field: 'menu_type' },
      spicinessLevel: { type: DataTypes.INTEGER, field: 'spiciness_level' },
      imageUrl: { type: DataTypes.TEXT, field: 'image_url' },
      stock: { type: DataTypes.INTEGER },

      isAvailable: { type: DataTypes.BOOLEAN, field: 'is_available' },
      estimatedMinutes: { type: DataTypes.INTEGER, field: 'estimated_minutes' },
      isFavorite: { type: DataTypes.BOOLEAN, field: 'is_favorite' },

      createdBy: { type: DataTypes.TEXT, field: 'created_by' },
      updatedBy: { type: DataTypes.TEXT, field: 'updated_by' }
    },
    {
      sequelize,
      tableName: 'menu_booth',
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  );

  return MenuBooth;
};