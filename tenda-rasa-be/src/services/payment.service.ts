import { Op } from 'sequelize';
import models from '../models';
import { Status } from '../enumeration/status.enum';
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
    if (order.status === Status.PAID) return order;

    return await order.update({ status: Status.PAID });
};