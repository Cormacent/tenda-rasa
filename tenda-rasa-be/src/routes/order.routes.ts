import express from 'express';
import { getAllOrdersByEmail, createOrder } from '../controllers/order.controller';

const router = express.Router();

router.post('/get-by-email', getAllOrdersByEmail);
router.post('/create-order', createOrder);

export default router;