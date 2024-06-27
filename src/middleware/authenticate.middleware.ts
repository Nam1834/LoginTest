import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";

const jwt = require("jsonwebtoken");
const SECRET_KEY: any = process.env.SECRET_KEY;

export interface UserRequest extends Request {
  user: { idUser: string };
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization");
    console.log("token,", token);
    var decoded = jwt.verify(token, SECRET_KEY);
    console.log("login user", decoded);

    (req as UserRequest).user = decoded;
    next();
  } catch (err) {
    return res.json({ message: "You not login!" });
  }
}
