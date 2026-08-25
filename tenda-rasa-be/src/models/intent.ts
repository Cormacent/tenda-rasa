import { Sequelize, Model, Optional } from 'sequelize';

interface IntentAttributes {
  code: string;
  label: string;
  promptInstruction: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IntentCreationAttributes extends Optional<IntentAttributes, 'isActive' | 'sortOrder'> { }

class Intent
  extends Model<IntentAttributes, IntentCreationAttributes>
  implements IntentAttributes {
  public code!: string;
  public label!: string;
  public promptInstruction!: string;
  public isActive!: boolean;
  public sortOrder!: number;

  static associate(_models: any) { }
}

export default (
  sequelize: Sequelize,
  DataTypes: typeof import('sequelize').DataTypes
): typeof Intent => {
  Intent.init(
    {
      code: { type: DataTypes.STRING, primaryKey: true },
      label: { type: DataTypes.STRING, allowNull: false },
      promptInstruction: { type: DataTypes.TEXT, allowNull: false, field: 'prompt_instruction' },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
      sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order' },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at' },
    },
    {
      sequelize,
      tableName: 'intents',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Intent;
};
