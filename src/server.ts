import "dotenv/config";
import sequelize from "./database/sequelize.config";
import { sequelizeInit } from "./database/sequelize.init";
import apiroute from "./route/index.route";

import express from "express";
import { emailNotifyCronJob } from "./services/todo.service";
import { now } from "lodash";
import ErrorHandler from "./middleware/error_handle.middleware";
import cors from "cors";

const app = express();

app.use(express.json());

sequelizeInit();

app.use(cors());

apiroute(app);

emailNotifyCronJob();

app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
