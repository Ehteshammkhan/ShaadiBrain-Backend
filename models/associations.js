import User from "./User.js";
import Wedding from "./Wedding.js";
import WeddingMember from "./WeddingMember.js";
import Event from "./Event.js";
import Expense from "./Expense.js";
import Task from "./Task.js";

// 🔹 Wedding ↔ Users (Many-to-Many)
Wedding.belongsToMany(User, {
  through: WeddingMember,
  foreignKey: "weddingId",
});

User.belongsToMany(Wedding, {
  through: WeddingMember,
  foreignKey: "userId",
});

// 🔹 Wedding → Events
Wedding.hasMany(Event, { foreignKey: "weddingId" });
Event.belongsTo(Wedding, { foreignKey: "weddingId" });

// 🔹 Event → Expenses
Event.hasMany(Expense, { foreignKey: "eventId" });
Expense.belongsTo(Event, { foreignKey: "eventId" });

// 🔥 FIXED HERE (IMPORTANT)
// User → Expenses (who added expense)
User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });

// 🔹 Event → Tasks
Event.hasMany(Task, { foreignKey: "eventId" });
Task.belongsTo(Event, { foreignKey: "eventId" });

// 🔹 User → Tasks (assigned person)
User.hasMany(Task, { foreignKey: "assignedTo" });
Task.belongsTo(User, { foreignKey: "assignedTo" });