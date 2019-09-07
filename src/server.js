const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");
const KnexSessionStore = require("connect-session-knex")(session);
require("dotenv").config();

const restrictedMiddleware = require("./middleware/restricted");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");

const server = express();
const store = new KnexSessionStore();

server.use(helmet());
server.use(cors());

server.use(
  session({
    name: "",
    secret: process.env.SECRET || "supersecret",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false
      // secure: true
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store
  })
);
// Allows the server to parse request body as JSON
server.use(express.json());
server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/users", usersRouter);
server.use("/api/restricted", restrictedMiddleware);

server.get("/", (_req, res) => {
  res.json({
    message: "Hello, server"
  });
});

module.exports = server;
