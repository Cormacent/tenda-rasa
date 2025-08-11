import { Op } from 'sequelize';
import models from '../models';
const { Orders } = models;

export const confirmPayment = async (order_id: string, email: string) => {
    const order = await Orders.findOne({
        where: {
            id: order_id,
            email: {
                [Op.iLike]: email
            }
        }
    });

    if (!order) throw new Error('❌ Order tidak ditemukan atau email salah.');
    if (order.status === 'PAID') return order;

    return await order.update({ status: 'PAID' });
};