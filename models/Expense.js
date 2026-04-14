import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Expense = sequelize.define(
  "Expense",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    category: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Expenses",
    timestamps: true,
  },
);

export default Expense;
