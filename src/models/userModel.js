const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');
const Matkul = require('./matkulModel');

const User = sequelize.define('User', {
  userid: {
    type: DataTypes.CHAR(20),
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  semester: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  praktikan: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  asisten_laboratorium: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  dosen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  kd_matkul: {
    type: DataTypes.CHAR(10),
    allowNull: true,
    references: {
      model: Matkul,
      key: 'kd_matkul',
    }
  },
}, {
  tableName: 'users',
  timestamps: false,
});


module.exports = User
