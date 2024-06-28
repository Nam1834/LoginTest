import { Request, Response } from "express";
import _, { values } from "lodash";
import toDo from "../model/todo.model";
import { UserRequest } from "../middleware/authenticate.middleware";
import { where } from "sequelize";
class toDoController {
  static async gettoDo(req: Request, res: Response) {}
  static async createtoDo(req: Request, res: Response) {
    try {
      const loggedinUser = (req as UserRequest).user;
      const idUser = loggedinUser.idUser;
      const data = req.body;

      data.idUser = idUser;

      const result = await toDo.create(data);

      res.json({
        message: "Success!",
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.json({ message: "An error occurred while creating the toDo" });
    }
  }
  static async updatetoDo(req: Request, res: Response) {
    try {
      const loggedinUser = (req as UserRequest).user;
      const { id } = req.params;
      const idUser = loggedinUser.idUser;
      const data = req.body;

      const toDoItem = await toDo.findOne({
        where: { ID: Number(id), idUser },
      });
      if (!toDoItem) {
        return res.json({ message: "toDo not found" });
      }

      await toDoItem.update(data);

      res.json({
        message: "Success!",
        data: toDoItem,
      });
    } catch (error) {
      console.error(error);
      return res.json({ message: "An error occurred while updating the toDo" });
    }
  }
  static async deletetoDo(req: Request, res: Response) {
    try {
      const loggedinUser = (req as UserRequest).user;
      const idUser = loggedinUser.idUser;
      const { id } = req.params;

      const toDoItem = await toDo.findOne({
        where: { ID: Number(id), idUser },
      });

      if (!toDoItem) {
        return res.status(404).json({ message: "ToDo item not found" });
      }

      await toDoItem.destroy();

      res.json({ message: "ToDo item deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the toDo" });
    }
  }
}
export default toDoController;
