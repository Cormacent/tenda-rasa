import { Sequelize, Model, Optional } from 'sequelize';
interface ChatHistoryAttributes {
  id: number;
  email: string;
  name: string;
  message: any; // JSONB
  role: string;
  timestamp: Date;
  intent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ChatHistoryCreationAttributes extends Optional<ChatHistoryAttributes, 'id'> { }

class ChatHistory
  extends Model<ChatHistoryAttributes, ChatHistoryCreationAttributes>
  implements ChatHistoryAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public message!: any;
  public role!: string;
  public timestamp!: Date;
  public intent?: string;

  // Optional: define associations here
  static associate(models: any) {
    // Example: ChatHistory.belongsTo(models.User, { foreignKey: 'email' });
  }
}

export default (
  sequelize: Sequelize,
  DataTypes: typeof import('sequelize').DataTypes
): typeof ChatHistory => {
  ChatHistory.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

      email: { type: DataTypes.TEXT, allowNull: false },
      name: { type: DataTypes.TEXT },
      message: { type: DataTypes.JSONB },
      role: { type: DataTypes.TEXT },
      timestamp: { type: DataTypes.DATE },

      intent: { type: DataTypes.TEXT },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at' }
    },
    {
      sequelize,
      tableName: 'chat_history',
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  );

  return ChatHistory;
};