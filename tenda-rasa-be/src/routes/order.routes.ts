import express from 'express';
import { getAllActiveOrdersByEmail, createOrder, getOrderById } from '../controllers/order.controller';

const router = express.Router();

router.get('/:id', getOrderById);
router.post('/get-by-email', getAllActiveOrdersByEmail);
router.post('/create-order', createOrder);

export default router;