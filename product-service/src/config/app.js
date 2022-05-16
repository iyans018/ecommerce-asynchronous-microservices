"use strict";

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { productRoutes } = require('../api/routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(productRoutes);

module.exports = app;