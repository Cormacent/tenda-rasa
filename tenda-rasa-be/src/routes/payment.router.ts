import { Router } from 'express';
import { handlePayment } from '../controllers/payment.controller';

const router = Router();

// Endpoint untuk simulasi pembayaran via link
router.get('/:order_id/:email', handlePayment);

export default router;