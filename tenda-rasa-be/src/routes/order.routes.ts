import express from 'express';
import { getAllOrdersByEmail, createOrder, getOrderById } from '../controllers/order.controller';

const router = express.Router();

router.get('/:id', getOrderById);
router.post('/get-by-email', getAllOrdersByEmail);
router.post('/create-order', createOrder);

export default router;