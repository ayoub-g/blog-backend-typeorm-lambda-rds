const EntitySchema = require("typeorm").EntitySchema;
const Post = require("../model/Post").Post;

module.exports = new EntitySchema({
  name: "Post",
  target: Post,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    date: { type: "date" },
    content: {
      type: "text",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinTable: false,
      joinColumn: true,
      cascade: false,
      nullable: false,
    },
  },
});
