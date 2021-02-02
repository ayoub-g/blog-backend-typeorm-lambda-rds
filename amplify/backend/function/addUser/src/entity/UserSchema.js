const EntitySchema = require("typeorm").EntitySchema;
const User = require("../model/User").User;

module.exports = new EntitySchema({
  name: "User",
  target: User,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
    },
    lastname: {
      type: "varchar",
    },
    email: { type: "varchar", unique: true },
  },
});
