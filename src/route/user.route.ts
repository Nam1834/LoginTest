import express from "express";
import userController from "../controller/user.controller";
import { authenticate } from "../middleware/authenticate.middleware";
const userRoute = express.Router();

userRoute.post("/user", userController.createUser);

userRoute.post("/user/login", userController.login);

userRoute.get("/user/toDo", authenticate, userController.getUserToDoDetail);

userRoute.put("/user/", authenticate, userController.updateUser);

userRoute.delete("/user/", authenticate, userController.deleteUser);

export default userRoute;
