import { Queue } from 'bullmq';
import { redisClient } from '../../utils/redisClient'
export const orderQueue = new Queue('order', {
  connection: redisClient,
});
