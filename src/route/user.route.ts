import express from "express";
import userController from "../controller/user.controller";
import { authenticate } from "../middleware/authenticate.middleware";
import ErrorHandler from "../middleware/error_handle.middleware";

const Validator = require("../middleware/validate.middleware");

const userRoute = express.Router();

userRoute.post(
  "/user",
  Validator("createUserValidate"),
  userController.createUser
);

userRoute.post("/user/login", userController.login);

userRoute.get("/user/verify-email", userController.verifyEmailCallback);

userRoute.get("/user/toDo", authenticate, userController.getUserToDoDetail);

userRoute.put(
  "/user/",
  Validator("updateUserValidate"),
  authenticate,
  userController.updateUser
);

userRoute.delete("/user/", authenticate, userController.deleteUser);

export default userRoute;
