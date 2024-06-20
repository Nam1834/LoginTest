import express from "express";
import userController from "../controller/user.controller";
const userRoute = express.Router();

userRoute.post('/user', userController.createUser);

userRoute.get('/user', userController.getUser);

userRoute.put('/user/:id', userController.updateUser);

userRoute.delete('/user/:id', userController.deleteUser);

export default userRoute;
