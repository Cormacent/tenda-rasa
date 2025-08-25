import { Queue } from 'bullmq';
import { redisClient } from '../../utils/redisClient';

export const orderQueue = new Queue('order', {
  connection: redisClient,
});

orderQueue.getJobCounts().then(counts => {
  console.log(counts); // { waiting: ..., active: ..., completed: ..., failed: ... }
}).catch(err => {
  console.error('Failed to get job counts:', err);
});
