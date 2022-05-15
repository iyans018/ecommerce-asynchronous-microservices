"use strict";

const http = require("http");
const { PORT } = require("./config/env");
const databaseConnection = require("./config/connection");
const app = require("./config/app");

const server = http.createServer(app);

server.listen(PORT);

server.on("listening", async() => {
  await databaseConnection();

  console.log(`Server is up and listening on port: ${PORT}`);
});