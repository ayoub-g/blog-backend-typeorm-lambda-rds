const { createConnection } = require("typeorm");
const config = require("./config");
const { Comment } = require("./model/Comment");

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
  if (event.queryStringParameters && event.queryStringParameters.id) {
    const { id } = event.queryStringParameters;

    try {
      connection = await createConnection(config);

      console.log("successfully connected to mysql Server");
      const comments = await connection
        .getRepository(Comment)
        .createQueryBuilder("comment")
        .where("comment.post = :postId", { postId: id })
        .select([
          "comment.id as id",
          "comment.content as content",
          "comment.date as date",
          "comment.responseToCommentId",
          "comment.userId as userId",
          "comment.postId as postId",
        ])
        .orderBy("date", "DESC")
        .getRawMany();
      if (comments) {
        console.log(comments);
        response.statusCode = 200;
        response.body = JSON.stringify(comments);
      } else {
        response.statusCode = 404;
        response.body = JSON.stringify({
          messge: "no comments found for this post",
        });
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
