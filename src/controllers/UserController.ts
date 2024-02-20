import User from "../models/User";
import { getEnvironmentVariable } from "../environments/environment";
import { Utils } from "./../utils/Utils";
import { NodeMailer } from "../utils/Nodemailer";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";

export class UserController {
  /**
   * user signup
   */
  async signUp(req, res, next) {
    try {
      const {
        name,
        email,
        phone,
        password,
        type,
        status,
        created_at,
        updated_at,
      } = req.body;
      const verification_token = Utils.generateVerificationToken();
      const existUser = await User.findOne({ email: req.body.email });
      if (existUser) {
        //res.status(400).send({ status: false, message: "user already exists" });
        throw new Error("This user already exists");
      } else {
        const data = {
          name: name,
          email: email,
          verification_token,
          verification_token_time: Date.now() + 5 * 60 * 1000,
          phone: phone,
          password: Utils.createHash(password),
          type: type,
          status: status,
        };
        const user = await new User(data).save();

        const payload = {
          user_id: user._id,  
          email: user.email,
        };
        const token=Utils.jwtoken(payload);
        res.json({
          token:token,
          user:user
      })

        await NodeMailer.sendMail({
          to: [user.email],
          subject: "test",
          html: `<h1>your otp is ${verification_token}</h1>`,
        }); //send email to user for verification
        
        console.log(user);
      }
    } catch (error) {
      next(error); //calls handlerror function
    }
  }


  async verify(req, res, next) {
    const email = req.body.email;
    const verification_token = req.body.verification_token;
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          email_verified: true,
        },
        {
          new: true,
        }
      );
      if (user) {
        res.send(user);
      } else {
        throw new Error("email verification token is failed");
      }
    } catch (e) {
      next(e);
    }
  }

  async resendVerificationEmail(req, res, next) {
    const email = req.query.email;
    const verification_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        }
      ).lean();
      if (user) {
        await NodeMailer.sendMail({
          to: [user.email],
          subject: "Resend email verification",
          html: `<h1>your otp is ${verification_token}</h1>`,
        });

        res.json({ success: true });
      } else {
        throw new Error("user doesn't exists");
      }
    } catch (e) {
      next(e);
    }
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
          password: Utils.createHash(password),
        }).lean();
        if (user) {
          const token=Utils.jwtoken(user);
          res.json({
            token:token,
            user:user,
            status: true, 
            message: "Success"
        })
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
        const user = await User.findById(req.params.id)
          .select("-password")
          .lean();
        res.send({ status: true, message: "Success", data: user });
      } catch (error) {
        console.log(error.message);
        next(error);
      }
    }
  
}
