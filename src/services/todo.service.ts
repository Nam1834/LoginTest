import { CronJob } from "cron";
import transporter from "../utills/nodemailer/transporter.utill";
import User from "../model/user.model";
import toDo from "../model/todo.model";
import { Op } from "sequelize";

export async function emailNotifyCronJob() {
  const now = new Date();

  const todos = await toDo.findAll({
    where: {
      endDate: {
        [Op.gte]: now,
      },
    },
  });

  for (const todo of todos) {
    const user = await User.findOne({
      where: {
        ID: todo.idUser,
      },
    });

    if (user && user.email) {
      await transporter.sendMail({
        from: "Todo Test <maddison53@ethereal.email>",
        to: user.email,
        subject: "Task Due Notification",
        text: `Your task "${
          todo.do
        }" is due on ${todo.endDate.toLocaleDateString()}`,
      });

      console.log(`Email sent to ${user.email} for task "${todo.do}"`);
    }
  }

  console.log(now.toLocaleDateString());
  job.start();
}

const job = new CronJob(
  "* * * * *",
  emailNotifyCronJob,
  null,
  true,
  "Asia/Ho_Chi_Minh"
);
//
