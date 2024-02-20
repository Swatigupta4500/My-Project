import { Environment } from "./environment";

export const DevdEnvironment: Environment = {
  db_url: "mongodb://localhost:27017/swiggy",
  SECRET_KEY: "KEEP_THE_SECRET",
  SECRET_KEY_JWT: "KEEP_THE_SECRET_DEV",
  Sendgrid_api_key:
    "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",
    gmail_auth:{
      user:"shruti4500@gmail.com",
      Pass:'string'
  }

};
