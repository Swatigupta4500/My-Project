import { Environment } from "./environment";

export const ProdEnvironment: Environment = {
  db_url: "mongodb://localhost:27017/swiggy",
  SECRET_KEY: "KEEP_THE_SECRET",
};
