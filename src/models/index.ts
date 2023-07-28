import { DataTypes, Sequelize } from 'sequelize';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

export const sequelize = new Sequelize({
  host: DB_HOST,
  username: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT as string),
  dialect: 'postgres',
});

export const db = {
  Sequelize,
  sequelize,
  users: require('./userModel')(sequelize, DataTypes),
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);
