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



// const express = require('express');
// const { PORT } = require('./config');
// const { databaseConnection } = require('./database');
// const expressApp = require('./app');

// const StartServer = async() => {
//   const app = express();

//   // Koneksi ke database
//   await databaseConnection();

//   await expressApp(app);

//   app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
//   })
//   .on('error', (err) => {
//     console.log(err);
//     process.exit();
//   });
// }

// StartServer();