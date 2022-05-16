import http from "http";
import env from "./config/env";
import databaseConnection from "./config/connection";
import app from "./config/app";

const server = http.createServer(app);

server.listen(env.PORT);

server.on("listening", async() => {
  await databaseConnection();

  console.log(`Server is up and listening on port: ${env.PORT}`);
});