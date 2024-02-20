import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { getEnvironmentVariable } from "./environments/environment";
import UserRouter from "./router/UserRouter";
import ItemRouter from "./router/ItemRouter";

export class Server {
  public app: express.Application = express();

  function1(req, res, next) {
    console.log(1);
    next();
  }
  function2(req, res, next) {
    console.log(2);
    next();
  }
  function3(req, res, next) {
    console.log(3);
    next();
  }
  function4(req, res, next) {
    console.log(4);
    next();
  }

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.configurebodyParser();
    this.error404Handler();
    this.handleError();
  }

  setConfigs() {
    this.connectMongoDB();
    // this.allowcors();
    this.configurebodyParser();
  }

  connectMongoDB() {
    mongoose.connect(getEnvironmentVariable().db_url).then(() => {
      console.log("connected to mongodb");
    });
  }

  setRoutes() {
    // this.app.use(this.function1);
    // this.app.use(this.function2);
    // this.app.use(this.function3);
    // this.app.use(this.function4);

    this.app.use("/api/user", UserRouter);
    this.app.use("/api/item", ItemRouter);
  }

  configurebodyParser() {
    this.app.use(express.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }

  allowcors() {
    this.app.use(cors);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        msg: "not found",
        status_code: 404,
      });
    });
  }

  handleError() {
    this.app.use((error, req, res, next) => {
      const errorStatus = res.errorStatus || 500;
      if (error.message) {
        res.status(400).json({
          msg: error.message,
          status:400
        });
      }
      res.status(404).json({
        msg: error.message || "something went wrong, please try again",
        status_code: errorStatus,
      });
    });
  }
}
