import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dbConfig from '../config/config';

dotenv.config(); // 🟢 Load .env sebelum akses config

const env = process.env.NODE_ENV ?? 'development';

if (!['development', 'test', 'production'].includes(env)) {
  throw new Error(`❌ Invalid NODE_ENV: ${env}`);
}

const config = dbConfig[env as 'development' | 'test' | 'production'];

if (!config || !config.database || !config.username || !config.dialect) {
  throw new Error(`🚨 Missing DB config for NODE_ENV: ${env}`);
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
});
console.log(`🔌 Connecting to DB ${config.database} at ${config.host}:${config.port}`);
export default sequelize;