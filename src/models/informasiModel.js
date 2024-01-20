const { DataTypes } = require('sequelize')
const sequelize = require('../config/connect')
const User = require('./userModel')

const Informasi = sequelize.define('Informasi', {
  kd_informasi: {
    type: DataTypes.CHAR(5),
    primaryKey: true,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  judul_informasi: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  deskripsi_informasi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tautan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  usersid: {
    type: DataTypes.CHAR(20),
    allowNull: true,
    references: {
      model: User,
      key: 'userid',
    },
  },
}, {
  tableName: 'informasi',
  timestamps: false,
});

module.exports = Informasi;
