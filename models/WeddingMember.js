import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const WeddingMember = sequelize.define(
  "WeddingMember",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    weddingId: DataTypes.INTEGER,
    role: DataTypes.ENUM("admin", "member"),
  },
  {
    tableName: "WeddingMembers",
    timestamps: true,
  }
);

export default WeddingMember;