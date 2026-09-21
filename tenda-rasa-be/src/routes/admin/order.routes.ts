// src/routes/admin/order.routes.ts
import { Router, Response } from 'express';
import { Op } from 'sequelize';
import { Orders, OrderItems } from '../../models';
import { adminAuth, AuthenticatedRequest } from '../../middleware/adminAuth';

const router = Router();

interface QueryParams {
  status?: string;
  startDate?: string;
  endDate?: string;
  limit?: string;
  offset?: string;
}

// GET /api/admin/orders
router.get('/', adminAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { status, startDate, endDate, limit = '50', offset = '0' } = req.query as QueryParams;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      const createdAtFilter: Record<string, Date> = {};
      if (startDate) {
        createdAtFilter[Op.gt as unknown as string] = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        createdAtFilter[Op.lt as unknown as string] = end;
      }
      where.createdAt = createdAtFilter;
    }

    const orders = await Orders.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [
        {
          model: OrderItems,
          as: 'order_items',
        },
      ],
    });

    res.json({
      orders: orders.rows,
      total: orders.count,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/admin/orders/:id
router.get('/:id', adminAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const order = await Orders.findByPk(req.params.id, {
      include: [
        {
          model: OrderItems,
          as: 'order_items',
        },
      ],
    });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// PATCH /api/admin/orders/:id/status
router.patch('/:id/status', adminAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    await order.update({ status });
    res.json({ order });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

export default router;
