'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('order_items', 'menu_name', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('order_items', 'menu_category', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('order_items', 'menu_type', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('order_items', 'spiciness_level', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('order_items', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('order_items', 'estimated_minutes', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('order_items', 'menu_name');
    await queryInterface.removeColumn('order_items', 'menu_category');
    await queryInterface.removeColumn('order_items', 'menu_type');
    await queryInterface.removeColumn('order_items', 'spiciness_level');
    await queryInterface.removeColumn('order_items', 'image_url');
    await queryInterface.removeColumn('order_items', 'estimated_minutes');
  }
};