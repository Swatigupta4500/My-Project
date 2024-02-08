import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariable } from "./environments/environment";
import UserRouter from "./router/UserRouter";
import ItemRouter from "./router/ItemRouter";

export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.configurebodyParser();
    this.error404Handler();
    this.handleError();
  }

  setConfigs() {
    this.connectMongoDB();
    this.configurebodyParser();
  }

  connectMongoDB() {
    mongoose.connect(getEnvironmentVariable().db_url).then(() => {
      console.log("connected to mongodb");
    });
  }

  setRoutes() {
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
      res.status(404).json({
        msg: error.message || "something went wrong, please try again",
        status_code: errorStatus,
      });
    });
  }
}
