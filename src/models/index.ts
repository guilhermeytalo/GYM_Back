import { DataTypes, Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    host:  process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
    dialect: 'postgres',
});


export const db = {
    Sequelize, 
    sequelize,
    users: require("./userModel")(sequelize, DataTypes),
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel') (sequelize, DataTypes);
