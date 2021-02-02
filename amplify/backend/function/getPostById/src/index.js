const { createConnection } = require("typeorm");
const config = require("./config");
const { Post } = require("./model/Post");
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
  if (event.queryStringParameters && event.queryStringParameters.id) {
    const { id } = event.queryStringParameters;

    try {
      connection = await createConnection(config);
      console.log("successfully connected to mysql server");

      const post = await connection
        .getRepository(Post)
        .createQueryBuilder("post")
        .where("post.id = :id", { id })
        .getOne();
      if (post) {
        console.log(post);
        response.statusCode = 200;
        response.body = JSON.stringify(post);
      } else {
        response.statusCode = 404;
        response.body = JSON.stringify({ messge: "post not found" });
      }
      connection.close();
    } catch (error) {
      console.log(error);
      response.statusCode = 500;
      response.body = JSON.stringify({ error });
      if (connection) {
        connection.close();
      }
    }
  } else {
    console.log("missing query parameters");
    response.body = JSON.stringify({
      error: "missing query parameters",
    });
    response.statusCode = 400;
  }
  return response;
};
