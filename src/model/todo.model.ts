import sequelize from "../database/sequelize.config";
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import User from "./user.model";
//const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");

class toDo extends Model<InferAttributes<toDo>, InferCreationAttributes<toDo>> {
  declare ID: number;
  declare idUser: string;
  declare do: string;
  declare startDate: Date;
  declare endDate: Date;
}
toDo.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    do: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    sequelize,
  }
);

//toDo.belongsTo(User, { foreignKey: "idUser" });

export default toDo;
