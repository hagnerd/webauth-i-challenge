const express = require("express");
const registerRouter = require("./routes/register");

const server = express();

// Allows the server to parse request body as JSON
server.use(express.json());
server.use("/api/register", registerRouter);

server.get("/", (_req, res) => {
  res.json({
    message: "Hello, server"
  });
});

module.exports = server;
