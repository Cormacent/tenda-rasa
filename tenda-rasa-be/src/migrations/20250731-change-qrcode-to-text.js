'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('orders', 'qrcode', {
      type: Sequelize.TEXT,
      allowNull: true // Sesuaikan dengan kebutuhanmu
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('orders', 'qrcode', {
      type: Sequelize.STRING(255),
      allowNull: true
    });
  }
};