import { Router } from 'express';
import { handlePayment } from '../controllers/payment.controller';

const router = Router();

// POST, bukan GET: endpoint ini mengubah status order, jadi tidak boleh idempotent-safe
// (link preview bot / prefetch browser bisa tidak sengaja memicu pembayaran kalau pakai GET)
router.post('/:orderId/:email', handlePayment);

export default router;