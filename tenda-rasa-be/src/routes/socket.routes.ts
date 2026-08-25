import { Router } from 'express';
import { pushSocketMessage } from '../controllers/socket.controller';

const router = Router();

router.post('/push', pushSocketMessage);

export default router;
