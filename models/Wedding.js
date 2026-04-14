import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Wedding = sequelize.define(
  "Wedding",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING, 
    totalBudget: DataTypes.FLOAT,
    createdBy: DataTypes.INTEGER, 
  },
  {
    tableName: "Weddings",
    timestamps: true,
  }
);

export default Wedding;