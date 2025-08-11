// routes/index.ts
import express from 'express';
import orderRoutes from './order.routes';
import menuRoutes from './menu.routes';
import chatRoutes from './chat.routes';
import paymentRoutes from './payment.router';

const router = express.Router();

router.use('/orders', orderRoutes);
router.use('/menus', menuRoutes);
router.use('/chats', chatRoutes);
router.use('/payment', paymentRoutes);

export default router;