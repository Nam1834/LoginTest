import { CronJob } from "cron";
import transporter from "../utills/nodemailer/transporter.utill";

export async function emailNotifyCronJob(email: string, userID: string) {
  const info = await transporter.sendMail({
    from: 'Todo Test " <maddison53@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello!",
  });
  const job = CronJob.from({
    cronTime: "* * * * * *",
    onTick: function () {
      console.log("You will see this message every second");
    },
    start: true,
    timeZone: "Asia/Ho_Chi_Minh",
  });
}
