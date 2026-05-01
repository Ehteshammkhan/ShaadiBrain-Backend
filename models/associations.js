import User from "./User.js";
import Wedding from "./Wedding.js";
import WeddingMember from "./WeddingMember.js";
import Event from "./Event.js";
import Expense from "./Expense.js";
import Task from "./Task.js";

Wedding.belongsToMany(User, {
  through: WeddingMember,
  foreignKey: "weddingId",
});

User.belongsToMany(Wedding, {
  through: WeddingMember,
  foreignKey: "userId",
});

WeddingMember.belongsTo(User, {
  foreignKey: "userId",
  as: "User",
});

User.hasMany(WeddingMember, {
  foreignKey: "userId",
});

WeddingMember.belongsTo(Wedding, {
  foreignKey: "weddingId",
});

Wedding.hasMany(WeddingMember, {
  foreignKey: "weddingId",
});

Wedding.hasMany(Event, { foreignKey: "weddingId" });
Event.belongsTo(Wedding, { foreignKey: "weddingId" });

Event.hasMany(Expense, { foreignKey: "eventId" });
Expense.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });

Event.hasMany(Task, { foreignKey: "eventId" });
Task.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(Task, { foreignKey: "assignedTo" });
Task.belongsTo(User, { foreignKey: "assignedTo" });