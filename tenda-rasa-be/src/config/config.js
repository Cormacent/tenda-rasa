require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || null,
    database: process.env.POSTGRES_DB || 'tenda_rasa_dev',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.PG_PORT || 5433, // <== tambahin ini
    dialect: 'postgres'
  },
  // ... test & production tambahin juga ya
};