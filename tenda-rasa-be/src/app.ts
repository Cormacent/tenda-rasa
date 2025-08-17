import express from 'express';
import http from 'http';
import cors from 'cors';
import sequelize from './db';
import v1Routes from './routes';
import { errorHandler } from './middleware/errorHandlers';
import { setupSocketIO } from './socket/socketServer';

const app = express();
const server = http.createServer(app);

// 🧱 Middleware
app.use(express.json());
app.use(cors());

// 📡 Request Logger
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// 📦 API Routes
app.use('/api/v1', v1Routes);

// 🚨 Global Error Handler (should be after routes)
app.use(errorHandler);

// 🧨 DB Connection Init
const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    // Optional: Sync models (disable in production!)
    // await sequelize.sync({ alter: true });

    // 🚀 Start Socket IO Server
    setupSocketIO(server);

    // 🟢 Start HTTP Server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ DB Connection Failed:', err);
    process.exit(1); // Exit safely if DB fails
  }
};

init();

// 🧹 Graceful Shutdown (optional)
process.on('SIGINT', () => {
  console.log('🛑 Server shutting down...');
  server.close(() => {
    console.log('✅ HTTP server closed');
    sequelize.close().then(() => {
      console.log('✅ DB connection closed');
      process.exit(0);
    });
  });
});

export default app;