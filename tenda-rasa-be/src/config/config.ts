import 'dotenv/config';
import { Dialect } from 'sequelize';

type DBConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
};

const commonConfig: DBConfig = {
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'dev_db',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5432,
  dialect: 'postgres',
};

export default {
  development: commonConfig,
  test: commonConfig,
  production: commonConfig,
};