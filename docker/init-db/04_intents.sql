CREATE TABLE IF NOT EXISTS intents (
  code TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  prompt_instruction TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO intents (code, label, prompt_instruction, sort_order, created_at, updated_at) VALUES
('GREETING', 'Greeting', 'Pilih intent ini jika user hanya menyapa (contoh: ''halo'', ''hai'', ''selamat pagi''). Respons: balas dengan sapaan ramah dan akrab, gunakan nama user.', 1, NOW(), NOW()),
('ORDER_STATUS', 'Order Status', 'Pilih intent ini jika user menanyakan status pesanannya. Periksa HAS_ORDER: jika false, jawab bahwa user belum memiliki pesanan aktif dan jangan berikan jawaban seolah ada pesanan. Jika true, baca status tiap order (PAID/PENDING/dll) dan beri jawaban singkat bahwa pesanan sedang diproses, jangan sebutkan status secara eksplisit karena sistem yang menangani tampilannya.', 2, NOW(), NOW()),
('CANCEL_ORDER', 'Cancel Order', 'Pilih intent ini jika user ingin membatalkan pesanan. Sistem saat ini tidak mendukung pembatalan manual lewat chat. Jelaskan ke user: pesanan yang belum dibayar akan otomatis dibatalkan sendiri kalau tidak dibayar dalam waktu tertentu; kalau pesanan sudah dibayar dan ingin dibatalkan, arahkan untuk datang/menghubungi langsung staf booth terkait. Jangan pernah bilang ''sudah saya batalkan''.', 3, NOW(), NOW()),
('COMPLAINT', 'Complaint', 'Pilih intent ini jika user mengeluh (makanan salah, rasa tidak sesuai, terlalu lama, dll). Sistem tidak punya alur penanganan komplain otomatis. Tanggapi dengan empati dan minta maaf atas ketidaknyamanannya, lalu arahkan user untuk menyampaikan langsung ke staf booth tempat memesan. Jangan berjanji kompensasi/refund apapun.', 4, NOW(), NOW()),
('HELP', 'Help', 'Pilih intent ini jika user bertanya cara pakai aplikasi (cara pesan, cara bayar, cara scan QR, dll). Jelaskan alur singkat: pilih menu dari booth, masukkan ke keranjang, checkout, scan QR code yang muncul di chat untuk bayar, status pesanan otomatis update di sini. Sesuaikan jawaban dengan hal spesifik yang ditanyakan user.', 5, NOW(), NOW()),
('RECOMMENDATION', 'Recommendation', 'Pilih intent ini jika user meminta saran makanan/minuman dari daftar menu. Berikan saran menu dari daftar yang tersedia, gaya bahasa seperti penjual yang ramah. Jangan sertakan ID menu dalam teks jawaban (ID dikirim terpisah lewat field menuIds).', 6, NOW(), NOW()),
('EXPLANATION', 'Explanation', 'Pilih intent ini jika user ingin penjelasan tentang menu tertentu. Jelaskan menu yang ditanyakan secara singkat dan jelas. Jangan sertakan ID menu dalam teks jawaban.', 7, NOW(), NOW()),
('GOODBYE', 'Goodbye', 'Pilih intent ini jika user berpamitan atau mengucapkan terima kasih menutup percakapan. Balas singkat dan hangat, ucapkan terima kasih, jangan tambahkan ajakan follow-up di jawaban ini.', 8, NOW(), NOW()),
('CART_SUMMARY', 'Cart Summary', 'Intent internal untuk menampilkan ringkasan keranjang belanja. Sistem menampilkan daftar item yang sudah ditambahkan beserta total harga. Trigger otomatis ketika user menambahkan item ke keranjang.', 9, NOW(), NOW()),
('CONFIRM_CHECKOUT', 'Confirm Checkout', 'Pilih intent ini jika user sudah siap checkout dan ingin melanjutkan ke pembayaran (contoh: ''ya'', ''iya'', ''checkout'', '' lanjut'', ''bayar'', ''ya dong'', ''silakan''). Respons: pastikan field chat berisi sapaan semangatcheckout tanpa perlu minta konfirmasi lagi.', 10, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;
