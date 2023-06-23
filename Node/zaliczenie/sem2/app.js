require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./api/routes");
const UserModel = require("./models/UserModel");
const uri = process.env.CONNECTION_STRING;
const saveApiCallToLogs = require("./logs");

const args = process.argv.slice(1);
const isInDebugMode = args[1] === "debug";

const logger = (req, res, next) => {
  if (isInDebugMode) {
    const date = new Date();
    const method = req.method;
    const url = req.url;
    const data = { date: date, method: method, url: url };
    saveApiCallToLogs(JSON.stringify(data));
  }
  next();
};

mongoose.set("setDefaultsOnInsert", false);

mongoose
  .connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    console.log(`DB running on ${uri}`)
  )
  .then(async () => {
    const admin1 = new UserModel({
      email: "admin1@abc.pl",
      password: "haslo1",
    });
    const admin2 = new UserModel({
      email: "admin2@abc.pl",
      password: "haslo2",
    });
    const admin3 = new UserModel({
      email: "admin3@abc.pl",
      password: "haslo3",
    });
    const users = await UserModel.find();
    if (users.length === 0) {
      UserModel.create(admin1, admin2, admin3);
    }
    const app = express();
    app.use(express.json());
    app.use(logger);
    app.use("/api", routes);

    app.listen(process.env.PORT, () => console.log("server started"));
  });
