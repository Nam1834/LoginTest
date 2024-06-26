import { Request, Response } from "express";
import _ from "lodash";
import toDo from "../model/todo.model";
class toDoController {
  static async gettoDo(req: Request, res: Response) {}
  static async createtoDo(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("bugss", data);

      const result = await toDo.create(data);

      res.json({
        message: "Success!",
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.json({ message: "An error occurred while creating the user" });
    }
  }
  static async updatetoDo(req: Request, res: Response) {}
  static async deletetoDo(req: Request, res: Response) {}
}
export default toDoController;
