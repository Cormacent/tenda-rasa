import { Router } from 'express';
import { handlePayment } from '../controllers/payment.controller';

const router = Router();

// Endpoint untuk simulasi pembayaran via link
router.get('/:orderId/:email', handlePayment);

export default router;