const config = {
  type: "mysql",
  host: "xxxx.xxxx.xxxx.rds.amazonaws.com",
  port: 3306,
  username: "username",
  password: "password",
  database: "blog",
  synchronize: true,
  logging: false,
  entities: [
    require("./entity/CommentSchema"),
    require("./entity/UserSchema"),
    require("./entity/PostSchema"),
  ],
};
module.exports = config;
