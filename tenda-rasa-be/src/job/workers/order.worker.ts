import { Worker } from 'bullmq';
import { redisClient } from '../../utils/redisClient';
import { getOrderById, updateOrder } from '../../services/order.service';
import { Status } from '../../enumeration/status.enum';
import { getClientByEmail } from '../../socket/socketServer';
import { OrderStatus } from '../../enumeration/order.enum';
import { ResponseOrderDto } from '../../dtos/order.dto';
import { ChatType } from '../../enumeration/chatType.enum';
export const orderWorker = new Worker('order', async job => {
    if (job.name === OrderStatus.EXPIRED_PAYMENT) {
        await orderPaymentExpired(job);
    } else if (job.name === OrderStatus.ON_PROGRESS) {
        await orderCompleted(job);
    }
}, {
    connection: redisClient
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
const orderPaymentExpired = async (job: any) => {
    const { orderId } = job.data;
    const order = await getOrderById(orderId);

    if (!order) {
        console.warn(`[${OrderStatus.EXPIRED_PAYMENT}] Order ${orderId} not found.`);
        return;
    }

    const { status, id, email } = order;

    if ([Status.PAID, Status.COMPLETED].includes(status)) {
        console.log(`[${OrderStatus.EXPIRED_PAYMENT}] Order ${orderId} already paid.`);
        return;
    }

    if (status === Status.CANCELLED) {
        console.log(`[${OrderStatus.EXPIRED_PAYMENT}] Order ${orderId} cancelled.`);
        return;
    }

    if (status !== Status.PENDING) {
        console.log(`[${OrderStatus.EXPIRED_PAYMENT}] Order ${orderId} has unexpected status: ${status}`);
        return;
    }

    const orderUpdated = await updateOrder(id, { status: Status.CANCELLED });
    pushSocketMessage(email, orderUpdated);
    console.log(`[${OrderStatus.EXPIRED_PAYMENT}] Order ${orderId} expired and cancelled.`);
};
const orderCompleted = async (job: any) => {
    const { orderId } = job.data;
    const order = await getOrderById(orderId);
    if (!order) {
        console.warn(`[${OrderStatus.ON_PROGRESS}] Order ${orderId} not found.`);
        return;
    }

    if (order.status === Status.COMPLETED) {
        console.log(`[${OrderStatus.ON_PROGRESS}] Order ${orderId} already completed.`);
        return;
    }

    const orderUpdated = await updateOrder(order.id, { status: Status.COMPLETED });
    pushSocketMessage(order.email, orderUpdated);
};

const pushSocketMessage = (email: string, order: ResponseOrderDto) => {
    const socket = getClientByEmail(email);
    if (socket) {
        socket.emit('message', {
            type: ChatType.ORDER_STATUS_UPDATED,
            payload: { order }
        });
    }
};
