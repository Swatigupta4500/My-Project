import { createHmac } from "crypto";
import { getEnvironmentVariable } from "../environments/environment";
import * as jwt from 'jsonwebtoken';

export class Utils {
  
  public MAX_TOKEN_TIME= (5*60*1000);
    static generateVerificationToken(digit: number = 6) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < digit; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    return parseInt(otp);
  }

   /**
   * To encrypt the password
   * @param str - password string
   */
   static createHash(str: string) {
    const hash = createHmac("sha256",getEnvironmentVariable().SECRET_KEY || "SECRET_KEY")
      .update(str)
      .digest("hex");
    return hash;
  }


 //jwt token
  static jwtoken(payload){
    const token=jwt.sign(payload, getEnvironmentVariable().SECRET_KEY_JWT, {
      expiresIn: "120s",
    });
  }
}

