import { Op } from 'sequelize';
import models from '../models';
import { Status } from '../enumeration/status.enum';
import { ResponseOrderDto } from '../dtos/order.dto';

const { Orders } = models;

export const confirmPayment = async (
  orderId: string,
  email: string
): Promise<ResponseOrderDto> => {
  const order = await Orders.findOne({
    where: {
      id: orderId,
      email: { [Op.iLike]: email },
    },
  });

  if (!order) {
    throw new Error('❌ Order tidak ditemukan atau email salah.');
  }

  const { status } = order;

  if (status === Status.PAID) {
    return { ...order.toJSON(), status: Status.ALREADY_PAID };
  }

  if ([Status.COMPLETED, Status.CANCELLED].includes(status)) {
    return order;
  }

  const updated = await order.update({ status: Status.PAID });
  return updated;
};