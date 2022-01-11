"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      classroom_id: {
        type: DataTypes.INTEGER,
      },
      student_name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a First Name" },
          notEmpty: { msg: "First Name must not be empty" },
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("students");
  },
};
