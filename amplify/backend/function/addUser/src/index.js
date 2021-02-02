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
      "Access-Control-Allow-Methods": "POST",
    },
  };
  /* when testing locally with amplify  */
  const user = event.body;
  /* switch to this before uploading */
  // const user = JSON.parse(event.body);

  let connection;
  if (user && user.firstname && user.lastname && user.email) {
    try {
      connection = await createConnection(config);
      console.log("successfully connected to mysql server");
      await connection.getRepository(User).save(user);
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
    response.body = JSON.stringify({ message: "missing query parameters" });
  }
  return response;
};
