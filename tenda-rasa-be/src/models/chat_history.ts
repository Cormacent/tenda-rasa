// src/models/chat_history.ts
import { Sequelize, DataTypes, Model } from 'sequelize';

class ChatHistory extends Model {
  // Optionally: kamu bisa tambah interface & typing di sini
}

export default (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes): typeof ChatHistory => {
  ChatHistory.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      email: DataTypes.TEXT,
      name: DataTypes.TEXT,
      message: DataTypes.JSONB,
      role: DataTypes.TEXT,
      timestamp: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'chat_history',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  return ChatHistory;
};