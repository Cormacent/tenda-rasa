import app from './app';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load .env dulu

const PORT = process.env.BE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});