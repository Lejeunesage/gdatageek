'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: true,  
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true       
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false  
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user'  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') 
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
