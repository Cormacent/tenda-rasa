import express from 'express';
import { errorHandler } from './middleware/errorHandlers';
import sequelize from './db';
import v1Routes from './routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// 📦 API Routes
app.use((req, res, next) => {
    console.log(`📡 ${req.method} ${req.url}`);
    next();
});

app.use('/api/v1', v1Routes);

// 🚨 Global Error Handler
app.use(errorHandler);

// 🧨 DB Connection Init
const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to PostgreSQL');

        // Optional: Sync models (disable in production!)
        // await sequelize.sync({ alter: true });

    } catch (err) {
        console.error('❌ DB Connection Failed:', err);
        process.exit(1); // Exit safely if DB fails
    }
};

init();

export default app;