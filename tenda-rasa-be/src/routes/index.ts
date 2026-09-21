// routes/index.ts
import express from 'express';
import orderRoutes from './order.routes';
import menuRoutes from './menu.routes';
import chatRoutes from './chat.routes';
import paymentRoutes from './payment.router';
import socketRoutes from './socket.routes';
import adminAuthRoutes from './admin/auth.routes';
import adminMenuRoutes from './admin/menu.routes';
import adminIntentRoutes from './admin/intent.routes';
import adminOrderRoutes from './admin/order.routes';

const router = express.Router();

router.use('/orders', orderRoutes);
router.use('/menus', menuRoutes);
router.use('/chats', chatRoutes);
router.use('/payment', paymentRoutes);
router.use('/socket', socketRoutes);
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/menus', adminMenuRoutes);
router.use('/admin/intents', adminIntentRoutes);
router.use('/admin/orders', adminOrderRoutes);

export default router;