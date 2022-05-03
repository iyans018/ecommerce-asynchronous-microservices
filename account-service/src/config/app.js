"use strict";

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { accountRoutes } = require('../api/routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(accountRoutes);

module.exports = app;