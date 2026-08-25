'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('intents', {
      code: { type: Sequelize.STRING, primaryKey: true },
      label: { type: Sequelize.STRING, allowNull: false },
      prompt_instruction: { type: Sequelize.TEXT, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });

    await queryInterface.bulkInsert('intents', [
      {
        code: 'GREETING', label: 'Greeting', sort_order: 1,
        prompt_instruction: "Pilih intent ini jika user hanya menyapa (contoh: 'halo', 'hai', 'selamat pagi'). Respons: balas dengan sapaan ramah dan akrab, gunakan nama user.",
        created_at: new Date(), updated_at: new Date(),
      },
      {
        code: 'ORDER_STATUS', label: 'Order Status', sort_order: 2,
        prompt_instruction: 'Pilih intent ini jika user menanyakan status pesanannya. Periksa HAS_ORDER: jika false, jawab bahwa user belum memiliki pesanan aktif dan jangan berikan jawaban seolah ada pesanan. Jika true, baca status tiap order (PAID/PENDING/dll) dan beri jawaban singkat bahwa pesanan sedang diproses, jangan sebutkan status secara eksplisit karena sistem yang menangani tampilannya.',
        created_at: new Date(), updated_at: new Date(),
      },
      {
        code: 'CANCEL_ORDER', label: 'Cancel Order', sort_order: 3,
        prompt_instruction: "Pilih intent ini jika user ingin membatalkan pesanan. Sistem saat ini tidak mendukung pembatalan manual lewat chat. Jelaskan ke user: pesanan yang belum dibayar akan otomatis dibatalkan sendiri kalau tidak dibayar dalam waktu tertentu; kalau pesanan sudah dibayar dan ingin dibatalkan, arahkan untuk datang/menghubungi langsung staf booth terkait. Jangan pernah bilang 'sudah saya batalkan'.",
        created_at: new Date(), updated_at: new Date(),
      },
      {
        code: 'COMPLAINT', label: 'Complaint', sort_order: 4,
        prompt_instruction: 'Pilih intent ini jika user mengeluh (makanan salah, rasa tidak sesuai, terlalu lama, dll). Sistem tidak punya alur penanganan komplain otomatis. Tanggapi dengan empati dan minta maaf atas ketidaknyamanannya, lalu arahkan user untuk menyampaikan langsung ke staf booth tempat memesan. Jangan berjanji kompensasi/refund apapun.',
        created_at: new Date(), updated_at: new Date(),
      },
      {
        code: 'HELP', label: 'Help', sort_order: 5,
        prompt_instruction: 'Pilih intent ini jika user bertanya cara pakai aplikasi (cara pesan, cara bayar, cara scan QR, dll). Jelaskan alur singkat: pilih menu dari booth, masukkan ke keranjang, checkout, scan QR code yang muncul di chat untuk bayar, status pesanan otomatis update di sini. Sesuaikan jawaban dengan hal spesifik yang ditanyakan user.',
        created_at: new Date(), updated_at: new Date(),
      },
      {
        code: 'RECOMMENDATION', label: 'Recommendation', sort_order: 6,
        prompt_instruction: 'Pilih intent ini jika user meminta saran makanan/minuman dari daftar menu. Berikan saran menu dari daftar yang tersedia, gaya bahasa seperti penjual yang ramah. Jangan sertakan ID menu dalam teks jawaban (ID dikirim terpisah lewat field menuIds).',
        created_at: new Date(), updated_at: new Date(),
      },
      {
        code: 'EXPLANATION', label: 'Explanation', sort_order: 7,
        prompt_instruction: 'Pilih intent ini jika user ingin penjelasan tentang menu tertentu. Jelaskan menu yang ditanyakan secara singkat dan jelas. Jangan sertakan ID menu dalam teks jawaban.',
        created_at: new Date(), updated_at: new Date(),
      },
      {
        code: 'GOODBYE', label: 'Goodbye', sort_order: 8,
        prompt_instruction: 'Pilih intent ini jika user berpamitan atau mengucapkan terima kasih menutup percakapan. Balas singkat dan hangat, ucapkan terima kasih, jangan tambahkan ajakan follow-up di jawaban ini.',
        created_at: new Date(), updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('intents');
  },
};
