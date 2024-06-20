import { Sequelize, DataType, DataTypes } from "sequelize";
//const { Sequelize } = require('sequelize');
const DATABASE_URL : any = process.env.DATABASE_URL;

const sequelize : any = new Sequelize(DATABASE_URL, {})

const fs = require('fs')
const path  = require('path')
const basename = path.basename(__filename)

const model_path = path.join(__dirname, '..', 'model')
console.log(model_path);

fs
  .readdirSync(model_path)
  .filter((file : any )=> {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    sequelize[model.name] = model;
  });

Object.keys(sequelize).forEach(modelName => {
  if (sequelize[modelName].associate) {
    sequelize[modelName].associate(sequelize);
  }
});

sequelize.sequelize = sequelize;
sequelize.Sequelize = Sequelize;
console.log('::', basename);


export default sequelize;