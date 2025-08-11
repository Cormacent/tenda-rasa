// src/models/index.ts
import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import sequelize from '../db'; // ini dari db/index.ts

const basename = path.basename(__filename);
const models: { [key: string]: any } = {};

// Load semua model file (kecuali index.ts)
fs.readdirSync(__dirname)
  .filter(file => file !== basename && (file.endsWith('.ts') || file.endsWith('.js')))
  .forEach(file => {
    const modelFunc = require(path.join(__dirname, file)).default;
    const model = modelFunc(sequelize, DataTypes);
    models[model.name] = model;
  });

// Setup relasi antar model (kalau ada method associate)
Object.keys(models).forEach((modelName) => {
  if (typeof models[modelName].associate === 'function') {
    models[modelName].associate(models);
  }
});

export { sequelize }
export default models;