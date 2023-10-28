"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Todos",
      [
        {
          title: "Learn Docker",
          description: "Learn dockerfile and dockercompose",
          is_completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Doing Homework-Week11",
          description: "Finish Homework unit testing and deployment",
          is_completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Exercising",
          description: "Jogging and push up",
          is_completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Doing AI tasks",
          description: "create an article review report",
          is_completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Todos", null, {})
  },
}
