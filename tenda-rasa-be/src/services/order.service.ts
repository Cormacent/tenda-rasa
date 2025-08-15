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
      where: { id: orderItems.map(i => i.menu_id) },
      transaction: t
    });

    const menuMap = new Map<number, InstanceType<typeof MenuBooth>>();
    menus.forEach((menu: MenuDTO) => menuMap.set(menu.id, menu));

    // Step 2: Buat order awal

    const order = await Orders.create(payload, { transaction: t });

    const menuUpdates: Promise<void>[] = [];
    const itemsToCreate: CreateOrderItemDto[] = [];

    for (const item of orderItems) {
      const menu = menuMap.get(item.menu_id);
      console.log("🧪 image_url length:", menu.image_url?.length);
      console.log("🧪 description length:", menu.description?.length);
      if (!menu || menu.stock < item.quantity) {
        throw new Error(`❌ Menu ID ${item.menu_id} tidak tersedia atau stok kurang`);
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
        menu_id: item.menu_id,
        quantity: item.quantity,
        price: menu.price,
        subtotal: menu.price * item.quantity,
        order_id: order.id,
        menu_name: menu.menu_name,
        menu_category: menu.category,
        menu_type: menu.menu_type,
        spiciness_level: menu.spiciness_level,
        image_url: menu.image_url,
        estimated_minutes: menu.estimated_minutes
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
      booth_id: order.booth_id,
      name: order.name,
      email: order.email,
      qrcode: qrcodeData,
      status: order.status,
      estimated_minutes: order.estimated_minutes,
      total_price: totalPrice,
      created_at: order.createdAt,
      orderItems: createdItems.map((item: ResponseOrderItemDto) => ({
        id: item.id,
        menu_id: item.menu_id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        order_id: item.order_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        menu_name: item.menu_name,
        menu_category: item.menu_category,
        menu_type: item.menu_type,
        spiciness_level: item.spiciness_level,
        image_url: item.image_url,
        estimated_minutes: item.estimated_minutes
      }))
    };

    return response;
  });
};
