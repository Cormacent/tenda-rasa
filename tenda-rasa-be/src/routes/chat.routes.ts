import express from 'express';
import { getConversation, getConversationById, } from '../controllers/chat.controller';
import { checkEmailMiddleware } from '../middleware/checkEmailMiddleware';

const router = express.Router();

router.post('/get-by-email', checkEmailMiddleware, getConversation);
router.post('/get-by-id', checkEmailMiddleware, getConversationById);

export default router;