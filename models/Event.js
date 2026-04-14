import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    weddingId: DataTypes.INTEGER,
  },
  {
    tableName: "Events",
    timestamps: true,
  }
);

export default Event;