import { Request, Response } from 'express';
import * as OrderService from '../services/order.service';
import { CreateOrderDto } from '../dtos/order.dto';

export const getAllOrdersByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required in request body' });
  }

  try {
    const orders = await OrderService.getAllOrdersByEmail(email);
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this email' });
    }
    res.json(orders);
  }  catch (err: Error | any) {
    console.error('❌ Error fetching menus:', err);
    res.status(500).json({
      message: 'Error fetching menus',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      }
    });
  }
};
export const createOrder = async (req: Request, res: Response) => {
  const orderDto: CreateOrderDto = req.body;

  try {
    const order = await OrderService.createOrder(orderDto);
    res.status(201).json(order);
  } catch (err: any) {
    console.error("❌ Error creating order:", err);

    res.status(500).json({
      message: "Error creating order",
      error: err?.message || JSON.stringify(err) || "Unknown error"
    });
  }
};