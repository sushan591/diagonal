require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        migrationStorageTableName: "_sequelize_meta",
        seederStorage: "sequelize",
        seederStorageTableName: "_sequelize_data",
    },
};