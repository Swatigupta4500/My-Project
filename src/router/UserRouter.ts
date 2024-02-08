import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { createValidator } from "express-joi-validation";
import { userIdValidation, userLoginValidation, userSignUpValidation } from "../validators/Uservalidators";
const userController = new UserController();
const validator = createValidator();

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.putRoutes();
    this.patchRoutes();
    this.deleteRoutes();
    this.postRoutes();
  }

  getRoutes() {
    this.router.get("/", userController.getAllUsers);
    this.router.get("/:id", [validator.params(userIdValidation)], userController.getUser);
  }

  postRoutes() {
    this.router.post("/login",[validator.body(userLoginValidation)], userController.login);
    this.router.post("/signUp",[validator.body(userSignUpValidation)],userController.signUp);
  }
  putRoutes() {}
  patchRoutes() {}
  deleteRoutes() {}
}

export default new UserRouter().router;
