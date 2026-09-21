// src/routes/admin/menu.routes.ts
import { Router, Response } from 'express';
import multer from 'multer';
import { MenuBooth } from '../../models';
import { adminAuth, AuthenticatedRequest } from '../../middleware/adminAuth';
import { uploadImage, deleteImage } from '../../services/cloudinary';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Helper to parse tags from string or array
const parseTags = (tags: unknown): string[] => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string' && tags) return tags.split(',').map(t => t.trim()).filter(Boolean);
  return [];
};

// GET /api/admin/menus
router.get('/', adminAuth, async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const menus = await MenuBooth.findAll({
      order: [['id', 'DESC']],
    });
    res.json({ menus });
  } catch (error) {
    console.error('Get menus error:', error);
    res.status(500).json({ error: 'Failed to fetch menus' });
  }
});

// GET /api/admin/menus/:id
router.get('/:id', adminAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const menu = await MenuBooth.findByPk(req.params.id);
    if (!menu) {
      res.status(404).json({ error: 'Menu not found' });
      return;
    }
    res.json({ menu });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// POST /api/admin/menus
router.post('/', adminAuth, upload.single('image'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const {
      menuName,
      description,
      price,
      category,
      menuType,
      spicinessLevel,
      stock,
      estimatedMinutes,
      tags,
      boothName,
      imageUrl,
    } = req.body;

    if (!menuName || !price) {
      res.status(400).json({ error: 'menuName and price are required' });
      return;
    }

    // Priority: uploaded file > provided URL > empty
    let finalImageUrl = '';
    if (req.file) {
      const result = await uploadImage(req.file);
      finalImageUrl = result.secure_url;
    } else if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
      finalImageUrl = imageUrl.trim();
    }

    const menu = await MenuBooth.create({
      menuName,
      description: description || '',
      price: parseInt(price, 10) || 0,
      category: category || '',
      menuType: menuType || '',
      spicinessLevel: parseInt(spicinessLevel, 10) || 0,
      stock: parseInt(stock, 10) || 0,
      estimatedMinutes: parseInt(estimatedMinutes, 10) || 15,
      tags: parseTags(tags),
      boothName: boothName || 'Tenda Rasa',
      imageUrl: finalImageUrl,
      isAvailable: true,
      isFavorite: false,
      createdBy: req.admin?.email || 'admin',
      updatedBy: req.admin?.email || 'admin',
    });

    res.status(201).json({ menu });
  } catch (error) {
    console.error('Create menu error:', error);
    res.status(500).json({ error: 'Failed to create menu' });
  }
});

// PUT /api/admin/menus/:id
router.put('/:id', adminAuth, upload.single('image'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const menu = await MenuBooth.findByPk(req.params.id);
    if (!menu) {
      res.status(404).json({ error: 'Menu not found' });
      return;
    }

    const {
      menuName,
      description,
      price,
      category,
      menuType,
      spicinessLevel,
      stock,
      estimatedMinutes,
      tags,
      boothName,
      isAvailable,
      isFavorite,
      imageUrl,
      removeImage,
    } = req.body;

    const updateData: Record<string, unknown> = {
      updatedBy: req.admin?.email || 'admin',
    };

    if (menuName !== undefined) updateData.menuName = menuName;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseInt(price, 10);
    if (category !== undefined) updateData.category = category;
    if (menuType !== undefined) updateData.menuType = menuType;
    if (spicinessLevel !== undefined) updateData.spicinessLevel = parseInt(spicinessLevel, 10);
    if (stock !== undefined) updateData.stock = parseInt(stock, 10);
    if (estimatedMinutes !== undefined) updateData.estimatedMinutes = parseInt(estimatedMinutes, 10);
    if (tags !== undefined) updateData.tags = parseTags(tags);
    if (boothName !== undefined) updateData.boothName = boothName;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable === 'true' || isAvailable === true;
    if (isFavorite !== undefined) updateData.isFavorite = isFavorite === 'true' || isFavorite === true;

    // Handle image: upload file > URL > remove > keep existing
    if (req.file) {
      // Upload new file to Cloudinary
      if (menu.imageUrl) {
        try {
          const publicId = menu.imageUrl.split('/').pop()?.split('.')[0];
          if (publicId && !menu.imageUrl.includes('cloudinary.com')) {
            await deleteImage(`tenda-rasa/menus/${publicId}`).catch(() => {});
          }
        } catch {
          // Ignore delete error for external URLs
        }
      }
      const result = await uploadImage(req.file);
      updateData.imageUrl = result.secure_url;
    } else if (removeImage === 'true') {
      // Remove existing image
      updateData.imageUrl = '';
    } else if (imageUrl !== undefined && typeof imageUrl === 'string') {
      // Use provided URL (can be empty to clear)
      updateData.imageUrl = imageUrl.trim();
    }

    await menu.update(updateData);

    res.json({ menu });
  } catch (error) {
    console.error('Update menu error:', error);
    res.status(500).json({ error: 'Failed to update menu' });
  }
});

// DELETE /api/admin/menus/:id
router.delete('/:id', adminAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const menu = await MenuBooth.findByPk(req.params.id);
    if (!menu) {
      res.status(404).json({ error: 'Menu not found' });
      return;
    }

    // Delete image from Cloudinary only if it's a Cloudinary URL
    if (menu.imageUrl && menu.imageUrl.includes('cloudinary.com')) {
      try {
        const publicId = menu.imageUrl.split('/').pop()?.split('.')[0];
        if (publicId) {
          await deleteImage(`tenda-rasa/menus/${publicId}`);
        }
      } catch {
        // Ignore delete error
      }
    }

    await menu.destroy();
    res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Delete menu error:', error);
    res.status(500).json({ error: 'Failed to delete menu' });
  }
});

export default router;
