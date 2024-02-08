import Item from "../models/item";

export class ItemController {
  async createItem(req, res, next) {
    try {
      const item = new Item(req.body);
      item
        .save()
        .then((item) => res.send(item))
        .catch((e) => next(e)); //calls handlerror function
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
  async getAllItems(req, res, next) {
    try {
      const items = await Item.find().lean();
      res.send({ status: true, message: "Success", data: items });
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
  async getItem(req, res, next) {
    try {
      const item = await Item.findById(req.params.id)
        .lean();
      res.send({ status: true, message: "Success", data: item });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
}
