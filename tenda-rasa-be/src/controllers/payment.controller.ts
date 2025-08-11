import { Request, Response } from 'express';
import { confirmPayment } from '../services/payment.service';

export const handlePayment = async (req: Request, res: Response) => {
  const { order_id, email } = req.params;

  try {
    const order = await confirmPayment(order_id, email);

    if (!order) {
      return res.status(404).json({
        message: '❌ Order tidak ditemukan atau email tidak cocok.'
      });
    }

    return res.status(200).json({
      message: order.status === 'PAID'
        ? '✅ Order sudah dibayar sebelumnya.'
        : '✅ Status pembayaran berhasil diperbarui.',
      order_id: order.id,
      status: order.status
    });

  } catch (error: any) {
    console.error('[Payment Error]', error);

    return res.status(500).json({
      message: '❌ Terjadi kesalahan saat memproses pembayaran.',
      error: error?.message || 'Unknown error'
    });
  }
};