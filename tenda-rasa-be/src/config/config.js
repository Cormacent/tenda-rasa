require('dotenv').config();

const baseConfig = {
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'postgres',
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

module.exports = {
  development: baseConfig,
  test: baseConfig,
  production: baseConfig,
};