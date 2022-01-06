"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate({ Student }) {
      this.hasMany(Student, { foreignKey: "classroom_id", as: "students" });
    }
  }
  Classroom.init(
    {
      class_name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "classrooms",
      modelName: "Classroom",
    }
  );
  return Classroom;
};
