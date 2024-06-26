import { Request, Response } from "express";
import _ from "lodash";
import User from "../model/user.model";
import toDo from "../model/todo.model";
class userController {
  static async getUser(req: Request, res: Response) {}
  static async login(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, passWord } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.json({ message: "User not found" });
      }
      const passWordInDB = user!.passWord;
      if (passWord !== passWordInDB) {
        return res.json({ message: "Wrong password" });
      }
    } catch {}
  }
  static async getUserToDoDetail(req: Request, res: Response) {
    const { id } = req.params;
    const tasks = await User.findOne({
      where: { ID: id },
      include: [
        {
          model: toDo,
          as: "toDo",
        },
      ],
    });

    res.json({
      message: "Success!",
      data: tasks,
    });
  }
  static async getUserById(req: Request, res: Response) {}
  static async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const { email } = data;

      const existingUser = await User.findOne({ where: { email } });
      const existingUserList = await User.findAll({
        order: [["ID", "DESC"]],
      });
      console.log("lít", existingUserList);
      let IDHighest;
      if (existingUserList.length == 0) {
        IDHighest = 1;
      } else {
        IDHighest = existingUserList[0].ID;
        IDHighest = Number(IDHighest.slice(2)) + 1;
      }
      data.ID = "US" + IDHighest.toString();
      if (existingUser) {
        return res.json({ message: "Username already exists" });
      }

      const result = await User.create(data);

      res.json({
        message: "Success!",
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.json({ message: "An error occurred while creating the user" });
    }
  }
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, passWord } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.json({ message: "User not found" });
      }

      user.email = email || user.email;
      user.passWord = passWord || user.passWord;

      await user.save();

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.json({ message: "An error occurred while updating the user" });
    }
  }
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.json({ message: "User not found" });
      }

      await user.destroy();

      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.json({ message: "An error occurred while deleting the user" });
    }
  }
}
export default userController;
