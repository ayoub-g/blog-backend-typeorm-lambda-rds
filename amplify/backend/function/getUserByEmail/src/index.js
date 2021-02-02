const { createConnection } = require("typeorm");
const config = require("./config");
const { User } = require("./model/User");

exports.handler = async (event) => {
  let response = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "GET",
    },
  };
  let connection;
  // get a signle exercise
  if (event.queryStringParameters && event.queryStringParameters.email) {
    const { email } = event.queryStringParameters;
    try {
      connection = await createConnection(config);
      console.log("successfully connected to mysql server");

      const user = await connection
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();
      if (user) {
        response.statusCode = 200;
        response.body = JSON.stringify(user);
      } else {
        response.statusCode = 404;
        response.body = JSON.stringify({ messge: "post not found" });
      }
      connection.close();
    } catch (error) {
      console.log(error);
      const message = error.message ? error.message : "server error";
      response.body = JSON.stringify({ message });
      response.statusCode = 500;
      if (connection) {
        connection.close();
      }
    }
  } else {
    response.statusCode = 400;
    console.log("message: missing query parameters");
    response.body = JSON.stringify({ message: "missing query parameters" });
  }

  return response;
};
