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
      "Access-Control-Allow-Methods": "POST",
    },
  };
  /* when testing locally with amplify  */
  const comment = event.body;
  /* switch to this before uploading */
  // const comment = JSON.parse(event.body);
  let connection;
  if (
    comment &&
    comment.content &&
    comment.date &&
    comment.user &&
    comment.post
  ) {
    try {
      connection = await createConnection(config);
      console.log("successfully connected to mysql server");

      await connection.getRepository(Comment).save(comment);
      response.statusCode = 200;
      response.body = JSON.stringify({ message: "SUCCESS" });
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
    response.body = JSON.stringify({ message: "mising query parameters" });
  }

  return response;
};
