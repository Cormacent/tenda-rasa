import express from 'express';
import { getConversation, } from '../controllers/chat.controller';
import { checkEmailMiddleware } from '../middleware/checkEmailMiddleware';

const router = express.Router();

router.post('/get-by-email', checkEmailMiddleware, getConversation);

export default router;