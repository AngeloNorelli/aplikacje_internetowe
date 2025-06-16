import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("fullstack_app", "app_user", "secure_password", {
    host: "localhost",
    dialect: "mysql",
});

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};