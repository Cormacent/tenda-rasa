import { Op } from 'sequelize';
import models, { sequelize } from '../models'; // Pastikan import sequelize
import { Status } from '../enumeration/status.enum';
import { ResponseOrderDto } from '../dtos/order.dto';

const { Orders, OrderItems } = models; 

export const confirmPayment = async (
  orderId: string,
  email: string
): Promise<ResponseOrderDto> => {
  const result = await sequelize.transaction(async (t) => {
    const order = await Orders.findOne({
      where: {
        id: orderId,
        email: { [Op.iLike]: email },
      },
      transaction: t,
      lock: t.LOCK.UPDATE,  
    });

    if (!order) {
      throw new Error('❌ Order tidak ditemukan atau email salah.');
    }

    await order.reload({
      include: [{ model: OrderItems, as: 'orderItems' }],
      transaction: t, 
    });

    const { status } = order;

    if (status === Status.PAID) {
      return { ...order.toJSON(), status: Status.ALREADY_PAID };
    }

    if ([Status.COMPLETED, Status.CANCELLED].includes(status)) {
      return order.toJSON();
    }

    await order.update({ status: Status.PAID }, { transaction: t });

    return order.toJSON();
  });

  return result;
};