import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define(
  "Task",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.ENUM("pending", "in_progress", "completed"),
    deadline: DataTypes.DATE,
    assignedTo: DataTypes.INTEGER, // userId
    eventId: DataTypes.INTEGER,
  },
  {
    tableName: "Tasks",
    timestamps: true,
  }
);

export default Task;