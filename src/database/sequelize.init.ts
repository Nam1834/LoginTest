import sequelize from "./sequelize.config";

export async function sequelizeInit() {
    await sequelize.sync({ force: false });
}