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
      "Access-Control-Allow-Methods": "DELETE",
    },
  };

  let connection;
  if (event.queryStringParameters && event.queryStringParameters.id) {
    const { id } = event.queryStringParameters;

    try {
      connection = await createConnection(config);

      await connection
        .getRepository(Comment)
        .createQueryBuilder()
        .delete()
        .from(Comment)
        .where("id = :id", { id })
        .execute();
      response.statusCode = 200;
      response.body = JSON.stringify({ message: "comment deleted" });
      if (connection) {
        connection.close();
      }
    } catch (error) {
      console.log(error);
      const message = error.message ? error.message : "server error";
      response.body = JSON.stringify({ message });
      response.statusCode = 500;
      connection.close();
    }
  } else {
    response.statusCode = 400;
    console.log("message: missing query parameters");
    response.body = JSON.stringify({ message: "mising query parameters" });
  }
  
  return response;
};
