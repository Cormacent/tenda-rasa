import { Redis } from 'ioredis';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379', 10), // ✅ fix type
  maxRetriesPerRequest: null, // ✅ wajib untuk BullMQ
  enableReadyCheck: false,
  reconnectOnError: err => {
    const targetErrors = ['READONLY', 'ETIMEDOUT'];
    return targetErrors.some(e => err.message.includes(e));
  },
});