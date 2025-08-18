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