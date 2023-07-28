import {DataTypes, Sequelize} from 'sequelize';

interface UserProps {
  userName: string;
  email: string;
  password: string;
}

module.exports = (sequelize: Sequelize) => {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {timestamps: true, tableName: 'users'}
  );
};
