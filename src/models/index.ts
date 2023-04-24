import { DataTypes, Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    host: 'db',
    username: 'postgres',
    database: 'gym',
    password: '123456',
    port: 5432,
    dialect: 'postgres',
});

sequelize.authenticate().then((res: any) => {
    console.log(`Database connected to discovery ${res}`);
}).catch((err) => {
    console.log(err);
});

export const db = {
    Sequelize, 
    sequelize,
    users: require("./userModel")(sequelize, DataTypes),
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel') (sequelize, DataTypes);
