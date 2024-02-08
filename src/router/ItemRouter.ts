import { Router } from "express";
import { ItemController } from "../controllers/itemController";
import { createValidator } from "express-joi-validation";
import { ItemValidation, userIdValidation } from "../validators/Uservalidators";
const itemController = new ItemController();
const validator = createValidator();

class ItemRouter {
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
    this.router.get("/", itemController.getAllItems);
    this.router.get("/:id", [validator.params(userIdValidation)], itemController.getItem);
  }

  postRoutes() {
    this.router.post("/createItem",[validator.body(ItemValidation)], itemController.createItem);
  }
  putRoutes() {}
  patchRoutes() {}
  deleteRoutes() {}
}

export default new ItemRouter().router;
