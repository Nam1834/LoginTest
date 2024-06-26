import toDORoute from "./todo.route";
import userRoute from "./user.route";

function apiroute(app: any) {
  app.use("/api", userRoute);
  app.use("/api", toDORoute);
}

export default apiroute;
