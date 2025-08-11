import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// ✅ Tambahkan konfigurasi CORS di socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors());
app.use(express.json()); // cukup satu kali

// 📨 Endpoint user chat
app.post('/user-chat', (req, res) => {
  io.emit('chat-message', req.body);
  res.status(200).send({ status: 'ok' });
});

// 🤖 Endpoint push response dari asisten
app.post('/push-response', (req, res) => {
  io.emit('chat-message', req.body);
  res.status(200).send({ status: 'ok' });
});

// 🫀 Healthcheck
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'healthy' });
});

// 🟢 Start server
server.listen(3000, () => {
  console.log('Backend listening on port 3000');
});