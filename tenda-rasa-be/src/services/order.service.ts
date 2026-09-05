import { CreateOrderDto, ResponseOrderDto } from '../dtos/order.dto';
import { CreateOrderItemDto, ResponseOrderItemDto } from '../dtos/orderItem.dto';

import models, { sequelize } from '../models';
const { Orders, OrderItems, MenuBooth } = models;
import { Transaction, } from 'sequelize';
import QRCode from 'qrcode';
import { MenuDTO } from '../dtos/menu.dto';
import { Op } from 'sequelize'
import { normalizeSequelizeData } from '../utils/sequelizeNormalizer';
import { Status } from '../enumeration/status.enum';



export const getAllOrdersByEmail = async (email: string): Promise<ResponseOrderDto[]> => {
  const orders = await Orders.findAll({
    where: { email },
    include: [
      {
        model: OrderItems,
        as: 'orderItems',
      },
    ],
    order: [['createdAt', 'DESC']], // ⬅️ ini yang bikin urutan dari terbaru
  });

  return orders.map((order: any) => normalizeSequelizeData(order.get({ plain: true })));
};
export const getAllActiveOrdersByEmail = async (
  email: string
): Promise<ResponseOrderDto[]> => {
  const orders = await Orders.findAll({
    where: {
      email,
      status: {
        [Op.in]: [Status.PAID, Status.COMPLETED],
      },
    },
    include: [
      {
        model: OrderItems,
        as: 'orderItems',
      },
    ],
    order: [['createdAt', 'DESC']], // ⬅️ ini yang bikin urutan dari terbaru
  });

  return orders.map((order: any) =>
    normalizeSequelizeData(order.get({ plain: true }))
  );
};


export const getActiveOrdersByEmail = async (email: string): Promise<ResponseOrderDto[]> => {
  const orders = await Orders.findAll({
    where: {
      email,
      status: {
        [Op.in]: [Status.PAID, Status.PENDING],
      },
    },
    include: [
      {
        model: OrderItems,
        as: 'orderItems',
      },
    ],
  });

  return orders ?? [];
};

export const getOrderById = async (id: number): Promise<ResponseOrderDto> => {
  const order = await Orders.findByPk(id, {
    include: [
      {
        model: OrderItems,
        as: 'orderItems',
      },
    ],
  });

  if (!order) {
    throw new Error(`Order with ID ${id} not found`);
  }

  return order;
};


export const updateOrder = async (id: number, updates: Partial<CreateOrderDto>): Promise<ResponseOrderDto> => {
  const order = await Orders.findByPk(id);
  if (!order) throw new Error('Order not found');

  await order.update(updates);

  const orderWithItems = await Orders.findByPk(id, {
    include: [
      {
        model: OrderItems,
        as: 'orderItems'
      }
    ]
  });

  return orderWithItems as ResponseOrderDto;
};
export const cancelPendingOrder = async (id: number): Promise<ResponseOrderDto | null> => {
  return await sequelize.transaction(async (t: Transaction) => {
    const order = await Orders.findByPk(id, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!order || order.status !== Status.PENDING) {
      return null;
    }

    await order.update({ status: Status.CANCELLED }, { transaction: t });

    const orderWithItems = await Orders.findByPk(id, {
      include: [{ model: OrderItems, as: 'orderItems' }],
      transaction: t,
    });

    return orderWithItems as ResponseOrderDto;
  });
};

export async function getOrderByIds(orderIds: number[]): Promise<ResponseOrderDto[]> {
  if (!orderIds || orderIds.length === 0) return []

  const orders = await Orders.findAll({
    where: {
      id: {
        [Op.in]: orderIds
      }
    }
  })

  return orders
}


export const createOrder = async (payload: CreateOrderDto): Promise<ResponseOrderDto> => {
  return await sequelize.transaction(async (t: Transaction) => {
    const { orderItems, email, name } = payload;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      throw new Error('Order items are required');
    }

    // Step 1: Validasi semua menu dulu
    const menus = await MenuBooth.findAll({
      where: { id: orderItems.map(i => i.menuId) },
      transaction: t
    });

    const menuMap = new Map<number, InstanceType<typeof MenuBooth>>();
    menus.forEach((menu: MenuDTO) => menuMap.set(menu.id, menu));

    // Step 2: Buat order awal

    const order = await Orders.create(payload, { transaction: t });

    const menuUpdates: Promise<void>[] = [];
    const itemsToCreate: CreateOrderItemDto[] = [];

    for (const item of orderItems) {
      const menu = menuMap.get(item.menuId);
      if (!menu || menu.stock < item.quantity) {
        throw new Error(`❌ Menu ID ${item.menuId} tidak tersedia atau stok kurang`);
      }

      const newStock = menu.stock - item.quantity;
      menuUpdates.push(
        menu.update(
          {
            stock: newStock,
            is_available: newStock <= 0
          },
          { transaction: t }
        )
      );

      itemsToCreate.push({
        menuId: item.menuId,
        quantity: item.quantity,
        price: menu.price,
        subtotal: menu.price * item.quantity,
        orderId: order.id,
        menuName: menu.menuName,
        boothName: menu.boothName,
        menuCategory: menu.category,
        menuType: menu.menuType,
        spicinessLevel: menu.spicinessLevel,
        imageUrl: menu.imageUrl,
        estimatedMinutes: menu.estimatedMinutes,
        remarks: item.remarks ?? undefined
      });
    }

    await Promise.all(menuUpdates);

    const createdItems = await OrderItems.bulkCreate(itemsToCreate, {
      transaction: t,
      returning: true
    });

    const totalPrice = createdItems.reduce((sum: number, item: ResponseOrderItemDto) => sum + item.subtotal, 0);
    await order.update({ total_price: totalPrice }, { transaction: t });

    const VUE_URL = process.env.VUE_URL || 'http://localhost:5173';
    const paymentUrl = `${VUE_URL}/payment-gateway/${order.id}/${email}/${name}`;
    const qrcodeData = await QRCode.toDataURL(paymentUrl);

    await order.update({ qrcode: qrcodeData }, { transaction: t });

    // Step 3: Response lengkap
    const response: ResponseOrderDto = {
      id: order.id,
      boothId: order.boothId,
      name: order.name,
      email: order.email,
      qrcode: qrcodeData,
      status: order.status,
      estimatedMinutes: order.estimatedMinutes,
      totalPrice: totalPrice,
      createdAt: order.createdAt,
      orderItems: createdItems,
      updatedAt: order.updatedAt,
      createdBy: order.createdBy,
      updatedBy: order.updatedBy
    };

    return response;
  });
};
