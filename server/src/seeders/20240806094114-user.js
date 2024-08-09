'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Khánh Đỗ',
      email: 'admin@gmail.com',
      password: 'admin',
      date: new Date("09/15/2002"),
      gender: 'Male',
      phone: '123-456-7890',
      address: '123 Main St',
      identification: 'ID123456',
      image: null,
      image1st: null,
      image2nd: null,
      role: "admin",
      position: 'Developer',
      score: 100,
      rank: 'A',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
