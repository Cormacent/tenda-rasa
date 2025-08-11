import { Request, Response, NextFunction } from 'express';

export const checkEmailMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email || req.query.email || req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Tambahan validasi format jika perlu
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next();
};