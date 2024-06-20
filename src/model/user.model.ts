import sequelize from "../database/sequelize.config";
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
//const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare ID: string; 
  declare userName: string;
  declare passWord: string;
}
User.init(
  {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
  },
    userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    passWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  },
  {
    hooks: {
      beforeCreate: (record: any, options: any) => {
        const myPlaintextPassword = record.dataValues.passWord;      
        const saltRounds = 10;
        const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
        record.dataValues.passWord = hash       
      },
      beforeUpdate: (record: any, options: any) => {
        const myPlaintextPassword = record.dataValues.passWord; 
        const saltRounds = 10;
        const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
        record.dataValues.passWord = hash
      },
    },
    freezeTableName: true,
    sequelize
  },
);

export default User;