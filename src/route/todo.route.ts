import express from "express";
import toDoController from "../controller/todo.controller";
import { authenticate } from "../middleware/authenticate.middleware";
const toDORoute = express.Router();

toDORoute.post("/toDo", authenticate, toDoController.createtoDo);

toDORoute.get("/toDo", authenticate, toDoController.gettoDo);

toDORoute.put("/toDo/:id", authenticate, toDoController.updatetoDo);

toDORoute.delete("/toDo/:id", authenticate, toDoController.deletetoDo);

export default toDORoute;
