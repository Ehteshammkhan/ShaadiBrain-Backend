import sequelize from "../config/db.js";

import User from "./User.js";
import Wedding from "./Wedding.js";
import Event from "./Event.js";
import Expense from "./Expense.js";
import Task from "./Task.js";
import WeddingMember from "./WeddingMember.js";

import "./associations.js";

export {
  sequelize,
  User,
  Wedding,
  Event,
  Expense,
  Task,
  WeddingMember,
};