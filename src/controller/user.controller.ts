import { Request, Response } from "express";
import _ from "lodash";
import User from "../model/user.model";
import toDo from "../model/todo.model";
import { where } from "sequelize";
import { UserRequest } from "../middleware/authenticate.middleware";
const SECRET_KEY: any = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class userController {
  static async login(req: Request, res: Response) {
    try {
      const { email, passWord } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.json({ message: "User not found" });
      }
      const passWordInDB = user!.passWord;
      const idInDB = user!.ID;
      const match = await bcrypt.compare(passWord, passWordInDB);
      if (!match) {
        return res.json({ message: "Wrong password" });
      }
      const token = jwt.sign(
        {
          idUser: idInDB,
        },
        SECRET_KEY,
        { expiresIn: 60 * 60 }
      );

      let loginUser = _.omit(user.dataValues, ["passWord"]); // delete password
      res.json({
        message: "Success!",
        data: {
          token: token,
          user: loginUser,
        },
      });
    } catch {}
  }
  static async getUserToDoDetail(req: Request, res: Response) {
    const loggedinUser = (req as UserRequest).user;
    const tasks = await User.findOne({
      where: { ID: loggedinUser.idUser },
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
    const loggedinUser = (req as UserRequest).user;
    try {
      const { email, passWord } = req.body;

      const user = await User.findOne({ where: { ID: loggedinUser.idUser } });

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
    const loggedinUser = (req as UserRequest).user;
    try {
      const user = await User.findOne({ where: { ID: loggedinUser.idUser } });

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
