// src/routes/admin/intent.routes.ts
import { Router, Response } from 'express';
import { Intent } from '../../models';
import { adminAuth, AuthenticatedRequest } from '../../middleware/adminAuth';

const router = Router();

// GET /api/admin/intents
router.get('/', adminAuth, async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const intents = await Intent.findAll({
      order: [['sortOrder', 'ASC']],
    });
    res.json({ intents });
  } catch (error) {
    console.error('Get intents error:', error);
    res.status(500).json({ error: 'Failed to fetch intents' });
  }
});

// PUT /api/admin/intents/:code
router.put('/:code', adminAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const intent = await Intent.findByPk(req.params.code);
    if (!intent) {
      res.status(404).json({ error: 'Intent not found' });
      return;
    }

    const { label, promptInstruction, isActive, sortOrder } = req.body;

    await intent.update({
      ...(label !== undefined && { label }),
      ...(promptInstruction !== undefined && { promptInstruction }),
      ...(isActive !== undefined && { isActive }),
      ...(sortOrder !== undefined && { sortOrder }),
    });

    res.json({ intent });
  } catch (error) {
    console.error('Update intent error:', error);
    res.status(500).json({ error: 'Failed to update intent' });
  }
});

// POST /api/admin/intents
router.post('/', adminAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { code, label, promptInstruction, isActive, sortOrder } = req.body;

    if (!code || !label || !promptInstruction) {
      res.status(400).json({ error: 'code, label, and promptInstruction are required' });
      return;
    }

    const existingIntent = await Intent.findByPk(code);
    if (existingIntent) {
      res.status(409).json({ error: 'Intent with this code already exists' });
      return;
    }

    const intent = await Intent.create({
      code,
      label,
      promptInstruction,
      isActive: isActive ?? true,
      sortOrder: sortOrder ?? 0,
    });

    res.status(201).json({ intent });
  } catch (error) {
    console.error('Create intent error:', error);
    res.status(500).json({ error: 'Failed to create intent' });
  }
});

// DELETE /api/admin/intents/:code
router.delete('/:code', adminAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const intent = await Intent.findByPk(req.params.code);
    if (!intent) {
      res.status(404).json({ error: 'Intent not found' });
      return;
    }

    await intent.destroy();
    res.json({ message: 'Intent deleted successfully' });
  } catch (error) {
    console.error('Delete intent error:', error);
    res.status(500).json({ error: 'Failed to delete intent' });
  }
});

export default router;
