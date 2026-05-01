import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const WeddingMember = sequelize.define(
  "WeddingMember",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weddingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("admin", "member"),
      defaultValue: "member",
    },
  },
  {
    tableName: "WeddingMembers",
    timestamps: true,
  }
);

export default WeddingMember;