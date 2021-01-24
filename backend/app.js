const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 3002;

const app = express();

app.use(bodyParser.json());
app.use(cors());

require('./routes')(app); // API routes are defined here

app.set("port", port); // set port

const server = http.createServer(app);
server.listen(port, () => console.log(`This server is running at port no: ${port}`));

module.exports = app;