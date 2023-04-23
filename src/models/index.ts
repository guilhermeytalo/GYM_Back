import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(`postgres://postgres:123456@localhost:5432/discover`, {dialect: "postgres"});

sequelize.authenticate().then(() => {
    console.log(`Database connected to discovery`);
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

db.users = require("./userModel")(sequelize, DataTypes);

module.exports = db;