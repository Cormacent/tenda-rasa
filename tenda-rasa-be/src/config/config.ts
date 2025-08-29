import 'dotenv/config';
import { Dialect } from 'sequelize';

type DBConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  pool?: {
    max: number;
    min: number;
    idle: number;
    acquire: number;
  };
};

const commonConfig: DBConfig = {
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'dev_db',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5432,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 1,
    idle: 10000,
    acquire: 30000,
  },
};

export default {
  development: commonConfig,
  test: commonConfig,
  production: commonConfig,
};