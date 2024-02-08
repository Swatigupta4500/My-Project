import User from "../models/User";
import { createHmac } from "crypto";
import { getEnvironmentVariable } from "../environments/environment";
import * as mongoose from "mongoose";


export class UserController {

 /**
   * user signup
   */ 

  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const existUser = await User.findOne({ email: email });
      const user = new User({
        name: name,
        email: email,
        password: UserController.createHash(password),
      });

      if (existUser) {
        res.status(400).send({ status: false, message: "user already exists" });
      } else {
        user
          .save()
          .then((user) => res.send(user))
          .catch((e) => next(e)); //calls handlerror function
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }


  /**
   * To encrypt the password
   * @param str - password string
   */
  static createHash(str: string) {
    const hash = createHmac(
      "sha256",
      getEnvironmentVariable().SECRET_KEY || "SECRET_KEY"
    )
      .update(str)
      .digest("hex");
    return hash;
  }


  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email,
        password: UserController.createHash(password),
      }).lean();
      if (user) {
        res.send({ status: true, message: "Success" });
      } else {
        res.status(400).send({ status: false, message: "Invalid Request" });
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
/**
 * To get the list of users
 * @param req 
 * @param res 
 * @param next 
 */
  async getAllUsers(req, res, next) {
    try {
      const user = await User.find().select("-password").lean();
      res.send({ status: true, message: "Success", data: user });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  /**
 * To get the list of users
 * @param req 
 * @param res 
 * @param next 
 */
  async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id).select("-password").lean();
      res.send({ status: true, message: "Success", data: user });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}
