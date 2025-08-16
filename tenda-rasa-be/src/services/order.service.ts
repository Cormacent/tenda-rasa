import { CreateOrderDto, ResponseOrderDto } from '../dtos/order.dto';
import { CreateOrderItemDto, ResponseOrderItemDto } from '../dtos/orderItem.dto';

import models, { sequelize } from '../models';
const { Orders, OrderItems, MenuBooth } = models;
import { Transaction, } from 'sequelize';
import QRCode from 'qrcode';
import { MenuDTO } from '../dtos/menu.dto';

export const getAllOrdersByEmail = async (email: string) => {
  return await Orders.findAll({
    where: { email },
    include: [
      {
        model: OrderItems,
        as: 'orderItems'
      }
    ]
  });
};

export const createOrder = async (payload: CreateOrderDto): Promise<ResponseOrderDto> => {
  return await sequelize.transaction(async (t: Transaction) => {
    const { orderItems, email } = payload;

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
        menuCategory: menu.category,
        menuType: menu.menu_type,
        spicinessLevel: menu.spicinessLevel,
        imageUrl: menu.image_url,
        estimatedMinutes: menu.estimatedMinutes,
        remarks: item.remarks
      });
    }

    await Promise.all(menuUpdates);

    const createdItems = await OrderItems.bulkCreate(itemsToCreate, {
      transaction: t,
      returning: true
    });

    const totalPrice = createdItems.reduce((sum: number, item: ResponseOrderItemDto) => sum + item.subtotal, 0);
    await order.update({ total_price: totalPrice }, { transaction: t });

    const PORT = process.env.BE_PORT || 3000;
    const paymentUrl = `http://localhost:${PORT}/v1/payment/${order.id}/${email}`;
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
      orderItems: createdItems
    };

    return response;
  });
};
