import express from "express";
import toDoController from "../controller/todo.controller";
const toDORoute = express.Router();

toDORoute.post("/toDo", toDoController.createtoDo);

toDORoute.get("/toDo", toDoController.gettoDo);

toDORoute.put("/toDo/:id", toDoController.updatetoDo);

toDORoute.delete("/toDo/:id", toDoController.deletetoDo);

export default toDORoute;
