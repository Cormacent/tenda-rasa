import { Worker } from 'bullmq';
import { redisClient } from '../../utils/redisClient';
import { getOrderById, updateOrder } from '../../services/order.service';
import { Status } from '../../enumeration/status.enum';

export const orderWorker = new Worker('order', async job => {
    if (job.name === 'expire-order') {
        const { orderId } = job.data;
        const order = await getOrderById(orderId)
        if (order.status != Status.PAID) {
            await updateOrder(order.id, { status: Status.CANCELLED })
        }
        console.log(`Order ${orderId} expired.`);
    }
}, {
    connection: redisClient,
});


orderWorker.on('completed', job => {
    if (!job) return;
    console.log(`✅ Job ${job.id} completed and should be auto-removed.`);
});

orderWorker.on('failed', (job, err) => {
    if (!job) {
        console.error(`❌ Job failed but job is undefined:`, err);
        return;
    }
    console.error(`❌ Job ${job.id} failed:`, err);
});

orderWorker.on('active', job => {
    if (!job) return;
    console.log(`🚀 Job ${job.id} is now active.`);
});

console.log('🎯 Order worker is running and listening for jobs...');