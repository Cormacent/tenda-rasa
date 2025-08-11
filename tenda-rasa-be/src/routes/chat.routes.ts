import express from 'express';
import { getConversation, saveMessage } from '../controllers/chat.controller';
import { checkEmailMiddleware } from '../middleware/checkEmailMiddleware';

const router = express.Router();

router.post('/get-by-email', checkEmailMiddleware, getConversation);
router.post('/', checkEmailMiddleware, saveMessage);

export default router;