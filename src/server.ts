import 'dotenv/config'
import sequelize from './database/sequelize.config'
import { sequelizeInit } from './database/sequelize.init';
import apiroute from './route/index.route';

import express from "express";
const app = express()

//middleware
app.use(express.json());

sequelizeInit();
apiroute(app);
app.get('/test', async function (req:any, res:any) {
    try {
        await sequelize.authenticate();
        console.log('hi');
        res.json({
            message: "Connection has been established successfully."
        })
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})


app.listen(3000)