import { Redis } from 'ioredis';

const useTLS = process.env.REDIS_TLS === 'true';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  username: process.env.REDIS_USERNAME || undefined,
  password: process.env.REDIS_PASSWORD || undefined,
  ...(useTLS ? { tls: {} } : {}),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  reconnectOnError: err => {
    const targetErrors = ['READONLY', 'ETIMEDOUT'];
    return targetErrors.some(e => err.message.includes(e));
  },
});