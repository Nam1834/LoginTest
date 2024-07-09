import toDo from "../model/todo.model";
import User from "../model/user.model";
import sequelize from "./sequelize.config";

export async function sequelizeInit() {
  await User.sync({ force: false });
  toDo.sync({ force: false });
}
